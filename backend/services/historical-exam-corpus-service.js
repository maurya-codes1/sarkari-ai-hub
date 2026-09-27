// backend/services/historical-exam-corpus-service.js
// Historical Exam Corpus Manager
// Tracks authentic multi-year paper depth, manages historical vs current eligible views,
// handles outdated vs current syllabus retention, and enforces honest source completeness.

const { getDb } = require('../db/database');

class HistoricalExamCorpusService {
  constructor() {
    this.CORPUS_STATUSES = {
      EXTENDED_HISTORICAL_CORPUS: 'EXTENDED_HISTORICAL_CORPUS', // 10+ authentic years
      PARTIAL_HISTORICAL_CORPUS: 'PARTIAL_HISTORICAL_CORPUS',   // 3-9 authentic years
      LIMITED_CORPUS: 'LIMITED_CORPUS',                         // 1-2 authentic years
      SOURCE_PENDING: 'SOURCE_PENDING',                         // 0 authentic years
      SOURCE_UNAVAILABLE: 'SOURCE_UNAVAILABLE'
    };

    this.SOURCE_COMPLETENESS = {
      COMPLETE_VERIFIED: 'COMPLETE_VERIFIED', // All declared shifts & sets verified
      PARTIAL: 'PARTIAL',                     // Some shifts verified, others pending
      LIMITED: 'LIMITED',                     // Single shift or sample paper
      SOURCE_UNAVAILABLE: 'SOURCE_UNAVAILABLE'
    };

    this.READINESS_STATES = {
      FULL_EXAM_READY: 'FULL_EXAM_READY',
      FULL_EXAM_BLOCKED: 'FULL_EXAM_BLOCKED',
      PRACTICE_READY: 'PRACTICE_READY',
      SOURCE_DISCOVERY: 'SOURCE_DISCOVERY',
      HISTORICAL_CORPUS_PARTIAL: 'HISTORICAL_CORPUS_PARTIAL',
      HISTORICAL_CORPUS_READY: 'HISTORICAL_CORPUS_READY',
      NEEDS_REVIEW: 'NEEDS_REVIEW'
    };
  }

  /**
   * Registers or updates an exam's historical corpus record based on authentic paper inventory
   */
  syncExamCorpus(examId, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const exam = db.prepare('SELECT exam_id, name, organization_id FROM exams WHERE exam_id = ?').get(examId);
    if (!exam) throw new Error(`Exam '${examId}' not found.`);

    // Query distinct authentic years from questions and question_papers
    const paperYears = db.prepare(`
      SELECT DISTINCT academic_year 
      FROM question_papers 
      WHERE exam_id = ? AND verification_status = 'VERIFIED'
      ORDER BY academic_year ASC
    `).all(examId).map(r => parseInt(r.academic_year, 10)).filter(y => !isNaN(y));

    const qYears = db.prepare(`
      SELECT DISTINCT historical_year 
      FROM questions 
      WHERE (exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
        AND historical_year IS NOT NULL
      ORDER BY historical_year ASC
    `).all(`%${examId}%`, examId).map(r => parseInt(r.historical_year, 10)).filter(y => !isNaN(y));

    const allYears = Array.from(new Set([...paperYears, ...qYears])).sort((a, b) => a - b);

    const papersCount = db.prepare(`
      SELECT COUNT(*) as c FROM question_papers WHERE exam_id = ?
    `).get(examId).c;

    // Question aggregations
    const qStats = db.prepare(`
      SELECT 
        COUNT(*) as total_historical,
        SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified_count,
        SUM(CASE WHEN current_eligibility = 1 THEN 1 ELSE 0 END) as current_eligible,
        SUM(CASE WHEN full_exam_eligible = 1 THEN 1 ELSE 0 END) as full_exam_eligible,
        SUM(CASE WHEN is_rare_relevant = 1 THEN 1 ELSE 0 END) as rare_relevant,
        SUM(CASE WHEN syllabus_status = 'OUTDATED' THEN 1 ELSE 0 END) as outdated_count
      FROM questions
      WHERE exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?)
    `).get(`%${examId}%`, examId);

    const historicalDepthYears = allYears.length;
    const earliestYear = allYears.length > 0 ? allYears[0] : null;
    const latestYear = allYears.length > 0 ? allYears[allYears.length - 1] : null;

    // Determine honest corpus status
    let corpusStatus = this.CORPUS_STATUSES.SOURCE_PENDING;
    if (historicalDepthYears >= 10) corpusStatus = this.CORPUS_STATUSES.EXTENDED_HISTORICAL_CORPUS;
    else if (historicalDepthYears >= 3) corpusStatus = this.CORPUS_STATUSES.PARTIAL_HISTORICAL_CORPUS;
    else if (historicalDepthYears >= 1) corpusStatus = this.CORPUS_STATUSES.LIMITED_CORPUS;

    // Source completeness
    let completeness = this.SOURCE_COMPLETENESS.LIMITED;
    if (historicalDepthYears >= 3 && (qStats.verified_count || 0) >= 100) completeness = this.SOURCE_COMPLETENESS.COMPLETE_VERIFIED;
    else if (historicalDepthYears >= 1 && (qStats.verified_count || 0) > 0) completeness = this.SOURCE_COMPLETENESS.PARTIAL;

    // Determine readiness
    let readiness = this.READINESS_STATES.FULL_EXAM_BLOCKED;
    const bp = db.prepare('SELECT total_questions FROM exam_blueprints WHERE exam_version_id LIKE ? LIMIT 1').get(`%${examId}%`);
    const reqQuestions = bp ? bp.total_questions : 100;

    if ((qStats.full_exam_eligible || 0) >= reqQuestions) {
      readiness = this.READINESS_STATES.FULL_EXAM_READY;
    } else if ((qStats.current_eligible || 0) > 0 || (qStats.total_historical || 0) > 0) {
      readiness = this.READINESS_STATES.PRACTICE_READY;
    }

    const corpusId = `corpus-${examId}`;
    const org = db.prepare('SELECT name FROM organizations WHERE organization_id = ?').get(exam.organization_id);
    const authorityName = org ? org.name : 'Official Examination Authority';

    db.prepare(`
      INSERT INTO exam_historical_corpus (
        corpus_id, exam_id, authority_name, historical_depth_years,
        earliest_verified_year, latest_verified_year, verified_years_json,
        partial_years_json, missing_years_json, total_papers_count,
        total_historical_questions, verified_questions_count, current_eligible_count,
        full_exam_eligible_count, rare_relevant_count, outdated_count,
        corpus_status, source_completeness_status, readiness_state,
        last_synced_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, '[]', '[]', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      ON CONFLICT(exam_id) DO UPDATE SET
        authority_name = excluded.authority_name,
        historical_depth_years = excluded.historical_depth_years,
        earliest_verified_year = excluded.earliest_verified_year,
        latest_verified_year = excluded.latest_verified_year,
        verified_years_json = excluded.verified_years_json,
        total_papers_count = excluded.total_papers_count,
        total_historical_questions = excluded.total_historical_questions,
        verified_questions_count = excluded.verified_questions_count,
        current_eligible_count = excluded.current_eligible_count,
        full_exam_eligible_count = excluded.full_exam_eligible_count,
        rare_relevant_count = excluded.rare_relevant_count,
        outdated_count = excluded.outdated_count,
        corpus_status = excluded.corpus_status,
        source_completeness_status = excluded.source_completeness_status,
        readiness_state = excluded.readiness_state,
        last_synced_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    `).run(
      corpusId,
      examId,
      authorityName,
      historicalDepthYears,
      earliestYear,
      latestYear,
      JSON.stringify(allYears),
      papersCount,
      qStats.total_historical || 0,
      qStats.verified_count || 0,
      qStats.current_eligible || 0,
      qStats.full_exam_eligible || 0,
      qStats.rare_relevant || 0,
      qStats.outdated_count || 0,
      corpusStatus,
      completeness,
      readiness
    );

    return this.getExamCorpus(examId, db);
  }

  /**
   * Retrieves full corpus record with year-by-year and paper-by-paper inventory
   */
  getExamCorpus(examId, db = getDb()) {
    if (!db) return null;

    const corpus = db.prepare(`
      SELECT c.*, e.name as exam_name, e.short_name as exam_code
      FROM exam_historical_corpus c
      JOIN exams e ON c.exam_id = e.exam_id
      WHERE c.exam_id = ?
    `).get(examId);

    if (!corpus) return null;

    // Papers breakdown
    const papers = db.prepare(`
      SELECT 
        paper_id, academic_year, shift, set_code, language_code,
        total_questions_expected, total_questions_extracted,
        completeness_status, verification_status
      FROM question_papers
      WHERE exam_id = ?
      ORDER BY academic_year DESC, shift ASC
    `).all(examId);

    // Year-wise question counts
    const yearsBreakdown = db.prepare(`
      SELECT 
        COALESCE(historical_year, official_year) as year,
        COUNT(*) as total_questions,
        SUM(CASE WHEN is_verified = 1 THEN 1 ELSE 0 END) as verified_questions,
        SUM(CASE WHEN current_eligibility = 1 THEN 1 ELSE 0 END) as current_eligible,
        SUM(CASE WHEN full_exam_eligible = 1 THEN 1 ELSE 0 END) as full_exam_eligible,
        SUM(CASE WHEN is_rare_relevant = 1 THEN 1 ELSE 0 END) as rare_relevant,
        SUM(CASE WHEN syllabus_status = 'OUTDATED' THEN 1 ELSE 0 END) as outdated
      FROM questions
      WHERE exam_version_id LIKE ? OR paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?)
      GROUP BY year
      ORDER BY year DESC
    `).all(`%${examId}%`, examId);

    return {
      ...corpus,
      verifiedYears: JSON.parse(corpus.verified_years_json || '[]'),
      partialYears: JSON.parse(corpus.partial_years_json || '[]'),
      missingYears: JSON.parse(corpus.missing_years_json || '[]'),
      papers,
      yearsBreakdown
    };
  }

  /**
   * Lists all exam corpora across the platform
   */
  getAllCorpora(db = getDb()) {
    if (!db) return [];

    const rows = db.prepare(`
      SELECT c.*, e.name as exam_name, e.short_name as exam_code
      FROM exam_historical_corpus c
      JOIN exams e ON c.exam_id = e.exam_id
      ORDER BY c.total_historical_questions DESC, c.historical_depth_years DESC
    `).all();

    return rows.map(r => ({
      ...r,
      verifiedYears: JSON.parse(r.verified_years_json || '[]'),
      partialYears: JSON.parse(r.partial_years_json || '[]'),
      missingYears: JSON.parse(r.missing_years_json || '[]')
    }));
  }

  /**
   * Classifies a question's syllabus status and current eligibility
   */
  classifyQuestionSyllabusRelevance(questionId, status, notes = '', db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const validStatuses = ['CURRENT', 'OUTDATED', 'UNCERTAIN', 'UNMAPPED'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid syllabus status '${status}'. Must be one of: ${validStatuses.join(', ')}`);
    }

    const currentEligibility = (status === 'CURRENT' || status === 'UNCERTAIN') ? 1 : 0;
    const fullExamEligible = status === 'CURRENT' ? 1 : 0; // Outdated is NEVER full exam eligible

    db.prepare(`
      UPDATE questions
      SET syllabus_status = ?,
          current_eligibility = ?,
          full_exam_eligible = CASE WHEN ? = 0 THEN 0 ELSE full_exam_eligible END,
          validation_notes = CASE 
            WHEN length(?) > 0 THEN ? 
            ELSE validation_notes 
          END,
          updated_at = CURRENT_TIMESTAMP
      WHERE question_id = ?
    `).run(status, currentEligibility, fullExamEligible, notes, notes, questionId);

    return {
      questionId,
      syllabusStatus: status,
      currentEligibility,
      fullExamEligible
    };
  }
}

module.exports = new HistoricalExamCorpusService();

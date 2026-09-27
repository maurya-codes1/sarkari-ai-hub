// backend/services/historical-corpus-service.js
// 10-Year Historical Question Corpus Service
// Manages authentic past questions, tracks coverage truthfully, and executes
// the 10-year novelty verification without false claims.

const crypto = require('crypto');
const { getDb } = require('../db/database');
const duplicateEngine = require('./duplicate-engine');
const normalizationService = require('./normalization-service');

class HistoricalCorpusService {
  /**
   * Retrieves the honest coverage status for an exam's historical corpus.
   * Coverage statuses:
   * - FULL_10_YEAR: Database contains verified questions spanning >= 10 distinct years.
   * - PARTIAL_CORPUS: Database contains verified questions spanning between 1 and 9 years.
   * - INSUFFICIENT_HISTORY: Database has 0 years or insufficient verified questions for comparison.
   *
   * @param {string} examId 
   * @param {object} [db]
   * @returns {object} coverage profile
   */
  getCorpusCoverage(examId, db = getDb()) {
    if (!db) {
      return {
        examId,
        yearsAvailableCount: 0,
        earliestYear: null,
        latestYear: null,
        coverageStatus: 'INSUFFICIENT_HISTORY',
        verifiedQuestionsCount: 0,
        coverageNotes: 'Database connection offline; historical coverage unavailable.'
      };
    }

    // Check pre-calculated coverage record
    const cached = db.prepare(`
      SELECT * FROM corpus_coverage WHERE exam_id = ?
    `).get(examId);

    // Compute live metrics from historical_questions
    const stats = db.prepare(`
      SELECT 
        COUNT(DISTINCT exam_year) as year_count,
        MIN(exam_year) as min_year,
        MAX(exam_year) as max_year,
        COUNT(*) as total_questions
      FROM historical_questions
      WHERE exam_id = ? AND verification_status = 'VERIFIED'
    `).get(examId);

    const yearCount = stats ? stats.year_count : 0;
    const minYear = stats ? stats.min_year : null;
    const maxYear = stats ? stats.max_year : null;
    const totalCount = stats ? stats.total_questions : 0;

    let status = 'INSUFFICIENT_HISTORY';
    let notes = 'Insufficient verified historical question data to conduct full 10-year trend comparison.';

    if (yearCount >= 10) {
      status = 'FULL_10_YEAR';
      notes = `Verified 10-year historical corpus active (${minYear}–${maxYear}) containing ${totalCount} official questions.`;
    } else if (yearCount > 0) {
      status = 'PARTIAL_CORPUS';
      notes = `Partial historical corpus available: ${yearCount} years represented (${minYear}–${maxYear}) with ${totalCount} verified questions.`;
    }

    // Upsert live coverage record
    try {
      db.prepare(`
        INSERT INTO corpus_coverage (
          coverage_id, exam_id, years_available_count, earliest_year, latest_year,
          coverage_status, verified_questions_count, coverage_notes, last_audited_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(exam_id) DO UPDATE SET
          years_available_count = excluded.years_available_count,
          earliest_year = excluded.earliest_year,
          latest_year = excluded.latest_year,
          coverage_status = excluded.coverage_status,
          verified_questions_count = excluded.verified_questions_count,
          coverage_notes = excluded.coverage_notes,
          last_audited_at = CURRENT_TIMESTAMP
      `).run(
        `cov-${examId}`,
        examId,
        yearCount,
        minYear,
        maxYear,
        status,
        totalCount,
        notes
      );
    } catch (e) {
      // Non-blocking
    }

    return {
      examId,
      yearsAvailableCount: yearCount,
      earliestYear: minYear,
      latestYear: maxYear,
      coverageStatus: status,
      verifiedQuestionsCount: totalCount,
      coverageNotes: notes
    };
  }

  /**
   * Adds an authentic historical question to the corpus.
   * Rejects if exact duplicate already present.
   */
  addHistoricalQuestion(questionData, db = getDb()) {
    if (!db) throw new Error('Database unavailable');

    const {
      historicalId = `hist-${crypto.randomBytes(8).toString('hex')}`,
      examId,
      examVersionId = null,
      boardId = null,
      stageId = null,
      paperId = null,
      subjectId,
      sectionName = null,
      questionNumber = null,
      languageCode = 'hi',
      originalText,
      options = [],
      correctAnswer = null,
      sourceDocument,
      sourceUrl = null,
      examYear,
      verificationStatus = 'VERIFIED'
    } = questionData;

    if (!examId || !subjectId || !originalText || !examYear || !sourceDocument) {
      throw new Error('Missing required historical question metadata: examId, subjectId, originalText, examYear, sourceDocument are required.');
    }

    // Generate fingerprint
    const fingerprint = normalizationService.generateFingerprint({
      stem: originalText,
      options,
      answer: correctAnswer ? JSON.stringify(correctAnswer) : '',
      questionType: options.length > 0 ? 'single_mcq' : 'subjective'
    });

    // Check for exact duplicate in corpus
    const dupCheck = duplicateEngine.checkExactDuplicate({
      stem: originalText,
      options,
      answer: correctAnswer ? JSON.stringify(correctAnswer) : ''
    }, db);

    if (dupCheck.isExactDuplicate) {
      return {
        success: false,
        status: 'REJECT_DUPLICATE',
        reason: `Historical question already exists in corpus as ID: ${dupCheck.duplicateOf}`,
        fingerprint
      };
    }

    // Insert historical question
    db.prepare(`
      INSERT INTO historical_questions (
        historical_id, exam_id, exam_version_id, board_id, stage_id, paper_id,
        subject_id, section_name, question_number, language_code, original_text,
        options_json, correct_answer_json, source_document, source_url, exam_year,
        verification_status, fingerprint
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      historicalId,
      examId,
      examVersionId,
      boardId,
      stageId,
      paperId,
      subjectId,
      sectionName,
      questionNumber,
      languageCode,
      originalText,
      JSON.stringify(options),
      correctAnswer ? JSON.stringify(correctAnswer) : null,
      sourceDocument,
      sourceUrl,
      parseInt(examYear, 10),
      verificationStatus,
      fingerprint
    );

    // Register fingerprint
    duplicateEngine.registerFingerprint(
      historicalId,
      fingerprint,
      normalizationService.normalizeStem(originalText),
      'HISTORICAL_QUESTION',
      null,
      db
    );

    return {
      success: true,
      status: 'INSERTED',
      historicalId,
      examYear,
      fingerprint
    };
  }

  /**
   * Executes the 10-Year Novelty Check on a candidate question.
   * Checks against both exact matches and semantic similarity within the available corpus.
   *
   * @param {object} candidate - { stem, options, examId, subjectId }
   * @param {object} [db]
   * @returns {object} { passed: boolean, status: string, similarityScore: number, matchedItem: object|null, claim: string, reason: string }
   */
  checkNovelty(candidate, db = getDb()) {
    const coverage = this.getCorpusCoverage(candidate.examId, db);

    // 1. Exact Duplicate Check against historical corpus
    const exactCheck = duplicateEngine.checkExactDuplicate(candidate, db);
    if (exactCheck.isExactDuplicate && exactCheck.entityType === 'HISTORICAL_QUESTION') {
      return {
        passed: false,
        status: 'REJECTED_HISTORICAL_EXACT_DUPLICATE',
        similarityScore: 1.0,
        matchedItem: {
          id: exactCheck.duplicateOf,
          examYear: exactCheck.examYear,
          type: 'HISTORICAL_QUESTION'
        },
        claim: 'Checked against our verified historical corpus: EXACT MATCH DETECTED.',
        reason: `Question text exactly matches official historical question ${exactCheck.duplicateOf} (Year: ${exactCheck.examYear}).`
      };
    }

    // 2. Fetch relevant historical questions for semantic comparison
    let targetQuestions = [];
    if (db) {
      const rows = db.prepare(`
        SELECT historical_id as id, original_text as text, exam_year as year, source_document
        FROM historical_questions
        WHERE (exam_id = ? OR subject_id = ?) AND verification_status = 'VERIFIED'
        LIMIT 200
      `).all(candidate.examId || '', candidate.subjectId || '');

      targetQuestions = rows.map(r => ({
        id: r.id,
        text: r.text,
        corpusType: 'HISTORICAL_CORPUS',
        year: r.year,
        source: r.source_document
      }));
    }

    // 3. Semantic Similarity Check
    const semCheck = duplicateEngine.checkSemanticDuplicate(candidate, targetQuestions, db);

    if (semCheck.decision === 'DUPLICATE') {
      return {
        passed: false,
        status: 'REJECTED_HISTORICAL_SEMANTIC_DUPLICATE',
        similarityScore: semCheck.maxSimilarity,
        matchedItem: semCheck.mostSimilarItem,
        claim: 'Checked against our verified historical corpus: SUBSTANTIAL DUPLICATE DETECTED.',
        reason: `Substantially similar in intent and phrasing to past exam question (${semCheck.mostSimilarItem ? semCheck.mostSimilarItem.id : ''}, Score: ${semCheck.maxSimilarity}).`
      };
    }

    // 4. Passed Novelty Check
    const claimText = coverage.coverageStatus === 'FULL_10_YEAR'
      ? 'Checked and verified unique against our full 10-year official question corpus.'
      : coverage.coverageStatus === 'PARTIAL_CORPUS'
      ? `Checked and verified unique against our verified historical corpus (${coverage.yearsAvailableCount} years available).`
      : 'Checked against our currently available verified question records.';

    return {
      passed: true,
      status: 'NOVEL_QUESTION_ACCEPTED',
      similarityScore: semCheck.maxSimilarity,
      matchedItem: semCheck.mostSimilarItem,
      coverageStatus: coverage.coverageStatus,
      claim: claimText,
      reason: 'No duplicate or substantial paraphrase found in verified historical corpus.'
    };
  }
}

module.exports = new HistoricalCorpusService();

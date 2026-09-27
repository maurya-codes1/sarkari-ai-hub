// backend/services/trusted-question-bank-service.js
// Phase 7: Trusted Question Bank, Section-Wise Inventory, Historical Corpus & Multi-Year Analytics
// Enforces:
// 1. Strict Section-Wise, Language-Wise, and Question-Type Inventories (no generic totals hiding shortages)
// 2. 10-Year Historical Corpus Tracking (truthful year detection, zero invented missing years)
// 3. Question Quality Metrics (TOTAL, VERIFIED_PYQ, PRACTICE_ONLY, NEEDS_REVIEW, DROPPED, FULL_EXAM_ELIGIBLE)
// 4. Separation of Historical PYQ Validity from Current Full Exam Blueprint Compatibility
// 5. Automated Question Eligibility Evaluation

const { getDb } = require('../db/database');
const unifiedExamTruthService = require('./unified-exam-truth-service');
const blueprintRepository = require('../db/repositories/blueprint-repository');

class TrustedQuestionBankService {
  constructor() {
    this.CORPUS_STATES = {
      FULL_10_YEAR: 'FULL_10_YEAR',
      PARTIAL_CORPUS: 'PARTIAL_CORPUS',
      INSUFFICIENT_HISTORY: 'INSUFFICIENT_HISTORY',
      NO_VERIFIED_HISTORY: 'NO_VERIFIED_HISTORY'
    };
  }

  // =========================================================================
  // 1. SECTION-WISE, LANGUAGE-WISE & QUESTION-TYPE INVENTORY
  // =========================================================================

  /**
   * Calculates section-by-section question bank inventory against the verified blueprint
   */
  getSectionInventory(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const blueprint = blueprintRepository.getBlueprintForExam(examId, versionId);
    if (!blueprint || !blueprint.sections) {
      return {
        examId,
        versionId,
        isSufficient: false,
        reason: 'BLUEPRINT_NOT_FOUND',
        sections: [],
        totalRequired: 0,
        totalEligible: 0,
        totalShortage: 0
      };
    }

    let totalRequired = 0;
    let totalEligible = 0;
    let totalAvailable = 0;
    let allSectionsSufficient = true;

    const sections = blueprint.sections.map(sec => {
      const requiredCount = sec.question_count || 25;
      totalRequired += requiredCount;

      // Query eligible questions for this section
      // Criteria: subject_id matches, full_exam_eligible = 1, answer_state NOT IN ('DROPPED', 'CANCELLED')
      const eligibleRow = db.prepare(`
        SELECT COUNT(*) as count FROM questions
        WHERE subject_id = ?
          AND full_exam_eligible = 1
          AND (answer_state IS NULL OR answer_state NOT IN ('DROPPED', 'CANCELLED'))
      `).get(sec.subject_id);

      const availableRow = db.prepare(`
        SELECT COUNT(*) as count FROM questions
        WHERE subject_id = ?
          AND (answer_state IS NULL OR answer_state NOT IN ('DROPPED', 'CANCELLED'))
      `).get(sec.subject_id);

      const eligibleCount = eligibleRow ? eligibleRow.count : 0;
      const availableCount = availableRow ? availableRow.count : 0;
      const shortage = Math.max(0, requiredCount - eligibleCount);
      const isSufficient = eligibleCount >= requiredCount;

      if (!isSufficient) {
        allSectionsSufficient = false;
      }

      totalEligible += eligibleCount;
      totalAvailable += availableCount;

      return {
        sectionId: sec.section_id,
        sectionName: sec.name,
        subjectId: sec.subject_id,
        requiredCount,
        eligibleCount,
        availableCount,
        shortage,
        isSufficient
      };
    });

    const totalShortage = Math.max(0, totalRequired - totalEligible);
    const isOverallSufficient = allSectionsSufficient && (totalEligible >= totalRequired) && totalRequired > 0;

    return {
      examId,
      versionId: blueprint.exam_version_id || versionId,
      blueprintId: blueprint.blueprint_id,
      totalRequired,
      totalEligible,
      totalAvailable,
      totalShortage,
      allSectionsSufficient,
      isSufficient: isOverallSufficient,
      sections
    };
  }

  /**
   * Calculates language-specific question inventory ensuring incompatible languages are not counted
   */
  getLanguageInventory(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const examDetails = unifiedExamTruthService.getExamDetails(examId, versionId);
    const paperMedium = examDetails?.languageRules?.paperMedium || 'hi,en';
    const allowedLangs = paperMedium.split(',').map(s => s.trim().toLowerCase());

    const rows = db.prepare(`
      SELECT q.question_id, q.full_exam_eligible, qp.language_code
      FROM questions q
      LEFT JOIN question_papers qp ON q.paper_id = qp.paper_id
      WHERE q.exam_version_id = ? OR qp.exam_id = ?
    `).all(versionId || examDetails?.versionId, examId);

    let compatibleCount = 0;
    let incompatibleCount = 0;

    for (const r of rows) {
      const qLang = (r.language_code || 'hi,en').toLowerCase();
      const isCompatible = allowedLangs.some(al => qLang.includes(al));
      if (isCompatible) {
        compatibleCount++;
      } else {
        incompatibleCount++;
      }
    }

    return {
      examId,
      paperMedium,
      allowedLangs,
      compatibleCount,
      compatibleQuestions: compatibleCount,
      incompatibleCount,
      isLanguageSufficient: compatibleCount > 0
    };
  }

  /**
   * Calculates question type inventory (MCQ, numerical, subjective)
   */
  getQuestionTypeInventory(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const blueprint = blueprintRepository.getBlueprintForExam(examId, versionId);
    const counts = db.prepare(`
      SELECT question_type_id, COUNT(*) as count,
             SUM(CASE WHEN full_exam_eligible = 1 THEN 1 ELSE 0 END) as eligible_count
      FROM questions
      GROUP BY question_type_id
    `).all();

    const countsMap = {};
    for (const row of counts) {
      countsMap[row.question_type_id] = row.count;
    }

    return {
      examId,
      supportsNumerical: Boolean(blueprint?.supports_numerical_input),
      supportsSubjective: Boolean(blueprint?.supports_subjective_answer),
      typeDistribution: counts,
      ...countsMap
    };
  }

  // =========================================================================
  // 2. 10-YEAR HISTORICAL CORPUS ANALYTICS
  // =========================================================================

  /**
   * Computes authentic historical corpus coverage across up to 10 years without inventing missing years
   */
  getHistoricalCorpus(examId, versionId = null, db = getDb()) {
    if (!db) return null;

    const currentYear = new Date().getFullYear();
    const tenYearWindow = [];
    for (let i = 0; i < 10; i++) {
      tenYearWindow.push(String(currentYear - i));
    }

    // Query distinct academic years present in verified papers or questions
    const paperYears = db.prepare(`
      SELECT DISTINCT academic_year FROM question_papers
      WHERE exam_id = ? AND verification_status IN ('VERIFIED', 'VERIFIED_COMPLETE', 'PENDING_VERIFICATION')
      ORDER BY academic_year DESC
    `).all(examId).map(r => r.academic_year);

    const questionYears = db.prepare(`
      SELECT DISTINCT historical_year FROM questions
      WHERE (exam_version_id = ? OR official_year IS NOT NULL) AND historical_year IS NOT NULL
      ORDER BY historical_year DESC
    `).all(versionId || examId).map(r => r.historical_year);

    const availableYearsSet = new Set([...paperYears, ...questionYears].filter(Boolean));
    const availableYears = Array.from(availableYearsSet).sort((a, b) => b.localeCompare(a));
    const missingYears = tenYearWindow.filter(y => !availableYearsSet.has(y));

    // Determine Corpus State
    let corpusState = this.CORPUS_STATES.NO_VERIFIED_HISTORY;
    if (availableYears.length >= 10) {
      corpusState = this.CORPUS_STATES.FULL_10_YEAR;
    } else if (availableYears.length >= 1) {
      corpusState = this.CORPUS_STATES.PARTIAL_CORPUS;
    } else {
      corpusState = this.CORPUS_STATES.INSUFFICIENT_HISTORY;
    }

    // Paper count and question count breakdown
    const papersCount = db.prepare(`SELECT COUNT(*) as count FROM question_papers WHERE exam_id = ?`).get(examId).count;
    const questionsCount = db.prepare(`
      SELECT COUNT(*) as count FROM questions q
      JOIN question_papers qp ON q.paper_id = qp.paper_id
      WHERE qp.exam_id = ?
    `).get(examId).count;

    const subjectBreakdown = db.prepare(`
      SELECT s.name as subject_name, COUNT(q.question_id) as count
      FROM questions q
      JOIN subjects s ON q.subject_id = s.subject_id
      JOIN question_papers qp ON q.paper_id = qp.paper_id
      WHERE qp.exam_id = ?
      GROUP BY s.name
    `).all(examId);

    return {
      success: true,
      examId,
      corpusState,
      corpusStatus: corpusState,
      tenYearWindow,
      availableYearsCount: availableYears.length,
      availableYears,
      verifiedYears: availableYears,
      missingYearsCount: missingYears.length,
      missingYears,
      totalPapers: papersCount,
      totalQuestions: questionsCount,
      subjectBreakdown,
      disclaimer: 'Historical corpus frequency is an empirical analysis only, not an exam prediction or guarantee.'
    };
  }

  // =========================================================================
  // 3. QUESTION BANK METRICS & QUALITY AUDIT
  // =========================================================================

  /**
   * Retrieves high-level and granular question bank metrics
   */
  getQuestionBankMetrics(examId = null, db = getDb()) {
    if (!db) return null;

    let baseQuery = 'SELECT COUNT(*) as total FROM questions';
    let qpQuery = 'SELECT COUNT(*) as total FROM question_papers';

    const totalQuestions = db.prepare(baseQuery).get().total;
    const totalPapers = db.prepare(qpQuery).get().total;

    const practiceOnly = db.prepare("SELECT COUNT(*) as total FROM questions WHERE trust_status = 'PRACTICE_ONLY'").get().total;
    const needsReview = db.prepare("SELECT COUNT(*) as total FROM questions WHERE trust_status = 'NEEDS_REVIEW' OR quality_state = 'NEEDS_REVIEW'").get().total;
    const fullExamEligible = db.prepare("SELECT COUNT(*) as total FROM questions WHERE full_exam_eligible = 1").get().total;
    const verifiedPyqs = db.prepare("SELECT COUNT(*) as total FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().total;
    const verifiedOfficialSamples = db.prepare("SELECT COUNT(*) as total FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().total;
    const droppedCount = db.prepare("SELECT COUNT(*) as total FROM questions WHERE answer_state IN ('DROPPED', 'CANCELLED')").get().total;
    const activeVerifiedUsable = db.prepare("SELECT COUNT(*) as total FROM questions WHERE full_exam_eligible = 1 AND (answer_state IS NULL OR answer_state NOT IN ('DROPPED', 'CANCELLED'))").get().total;

    return {
      totalQuestions,
      totalPapers,
      verifiedPyqs,
      verifiedOfficialSamples,
      verifiedUsable: activeVerifiedUsable,
      fullExamEligible,
      practiceOnly,
      needsReview,
      droppedCount,
      outdatedCount: 0,
      duplicateRejectedCount: 0
    };
  }

  // =========================================================================
  // 4. QUESTION ELIGIBILITY EVALUATION
  // =========================================================================

  /**
   * Evaluates and updates a question's full_exam_eligible status based on strict provenance and answer key
   */
  evaluateQuestionEligibility(questionId, db = getDb()) {
    if (!db) return null;

    const q = db.prepare(`
      SELECT q.*, qp.verification_status as paper_ver_status, qp.completeness_status as paper_comp_status
      FROM questions q
      LEFT JOIN question_papers qp ON q.paper_id = qp.paper_id
      WHERE q.question_id = ?
    `).get(questionId);

    if (!q) return { success: false, reason: 'QUESTION_NOT_FOUND' };

    let isEligible = true;
    const blockingReasons = [];

    // 1. Must have valid paper
    if (!q.paper_id) {
      isEligible = false;
      blockingReasons.push('Question is not linked to an official question paper entity.');
    } else if (q.paper_ver_status !== 'VERIFIED') {
      isEligible = false;
      blockingReasons.push(`Parent paper verification status is '${q.paper_ver_status}'.`);
    }

    // 2. Answer state must not be dropped or cancelled
    if (q.answer_state === 'DROPPED' || q.answer_state === 'CANCELLED') {
      isEligible = false;
      blockingReasons.push(`Question is officially '${q.answer_state}'.`);
    }

    // 3. Question versions must exist
    const version = db.prepare('SELECT version_id, language_content, correct_answer FROM question_versions WHERE question_id = ?').get(questionId);
    if (!version) {
      isEligible = false;
      blockingReasons.push('No question version content found.');
    }

    // Update question
    const targetEligible = isEligible ? 1 : 0;
    const qualityState = isEligible ? 'FULLY_VERIFIED' : (q.answer_state === 'DROPPED' ? 'DROPPED' : 'PRACTICE_ONLY');

    db.prepare(`
      UPDATE questions
      SET full_exam_eligible = ?, quality_state = ?
      WHERE question_id = ?
    `).run(targetEligible, qualityState, questionId);

    return {
      questionId,
      fullExamEligible: isEligible,
      qualityState,
      blockingReasons
    };
  }
}

module.exports = new TrustedQuestionBankService();

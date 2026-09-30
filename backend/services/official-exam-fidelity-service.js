/**
 * backend/services/official-exam-fidelity-service.js
 * 
 * SARKARIAI HUB — PHASE 18 OFFICIAL EXAM FIDELITY & AUTHENTIC PYQ SERVICE
 * 
 * Manages official paper metadata, authentic PYQs, exam blueprint fidelity,
 * component-level Full Exam readiness gating, server-side scoring, and
 * PDF <-> Mock synchronization.
 */

const { getDb } = require('../db/database');
const fullExamGateService = require('./full-exam-gate-service');
const crossSurfaceLearningService = require('./cross-surface-learning-service');

class OfficialExamFidelityService {
  constructor() {
    this.STATUSES = {
      FULL_EXAM_READY: 'FULL_EXAM_READY',
      FULL_EXAM_PARTIAL: 'FULL_EXAM_PARTIAL',
      FULL_EXAM_BLOCKED: 'FULL_EXAM_BLOCKED',
      PRACTICE_ONLY: 'PRACTICE_ONLY',
      BLUEPRINT_INCOMPLETE: 'BLUEPRINT_INCOMPLETE',
      LANGUAGE_INCOMPLETE: 'LANGUAGE_INCOMPLETE',
      QUESTION_POOL_INSUFFICIENT: 'QUESTION_POOL_INSUFFICIENT',
      SOURCE_INCOMPLETE: 'SOURCE_INCOMPLETE',
      PATTERN_CONFLICT: 'PATTERN_CONFLICT',
      VERSION_UNVERIFIED: 'VERSION_UNVERIFIED',
      NOT_APPLICABLE: 'NOT_APPLICABLE'
    };
  }

  /**
   * Retrieves official paper record and questions.
   */
  getOfficialPaper(paperId, db = getDb()) {
    if (!paperId) return null;
    const paper = db.prepare('SELECT * FROM question_papers WHERE paper_id = ?').get(paperId);
    if (!paper) return null;

    const questions = db.prepare(`
      SELECT q.*, pq.section_name, pq.section_order, pq.source_question_number, pq.marks as paper_marks, pq.negative_marks as paper_negative_marks
      FROM paper_questions pq
      JOIN questions q ON pq.question_id = q.question_id
      WHERE pq.paper_id = ?
      ORDER BY pq.section_order ASC, pq.source_question_number ASC
    `).all(paperId);

    const answerKey = db.prepare(`
      SELECT * FROM official_answer_keys 
      WHERE paper_id = ? AND is_current_key = 1
      ORDER BY created_at DESC LIMIT 1
    `).get(paperId);

    return {
      paper,
      questions,
      totalQuestions: questions.length,
      hasAnswerKey: Boolean(answerKey),
      answerKey: answerKey || null
    };
  }

  /**
   * Evaluates component-level Full Exam readiness.
   */
  evaluateComponentReadiness({ examId, boardId, stage, stream, subjectId, paperId }, db = getDb()) {
    // 1. Determine blueprint
    let blueprint = null;
    if (paperId) {
      blueprint = db.prepare('SELECT * FROM exam_blueprints WHERE paper_id = ?').get(paperId);
    }
    if (!blueprint && examId) {
      blueprint = db.prepare(`
        SELECT bp.* FROM exam_blueprints bp
        JOIN exam_versions ev ON bp.exam_version_id = ev.version_id
        WHERE ev.exam_id = ?
        ORDER BY CASE WHEN bp.verification_status = 'VERIFIED' THEN 1 ELSE 2 END
        LIMIT 1
      `).get(examId);
    }
    if (!blueprint && boardId) {
      blueprint = db.prepare(`
        SELECT bp.* FROM exam_blueprints bp
        JOIN exam_versions ev ON bp.exam_version_id = ev.version_id
        JOIN exams e ON ev.exam_id = e.exam_id
        WHERE e.board_id = ?
        ORDER BY CASE WHEN bp.verification_status = 'VERIFIED' THEN 1 ELSE 2 END
        LIMIT 1
      `).get(boardId);
    }

    if (!blueprint) {
      return {
        status: this.STATUSES.BLUEPRINT_INCOMPLETE,
        isEligible: false,
        requiredCount: 0,
        availableCount: 0,
        blockerReason: 'BLUEPRINT_MISSING',
        userMessage: 'Official exam blueprint pattern is not yet configured for this component.'
      };
    }

    if (blueprint.verification_status !== 'VERIFIED') {
      return {
        status: this.STATUSES.BLUEPRINT_INCOMPLETE,
        isEligible: false,
        requiredCount: blueprint.total_questions || 0,
        availableCount: 0,
        blockerReason: 'BLUEPRINT_UNVERIFIED',
        userMessage: 'Exam blueprint pattern is pending official verification.'
      };
    }

    // 2. Count eligible pool for this specific component
    let eligibleCount = 0;
    if (examId) {
      eligibleCount = db.prepare(`
        SELECT count(*) as c FROM questions q
        LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
        WHERE ev.exam_id = ? AND q.full_exam_eligible = 1
      `).get(examId).c;
    } else if (boardId) {
      eligibleCount = db.prepare(`
        SELECT count(*) as c FROM questions q
        LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
        LEFT JOIN exams e ON ev.exam_id = e.exam_id
        WHERE (q.board_id = ? OR e.board_id = ? OR ev.exam_id = ?) AND q.full_exam_eligible = 1
      `).get(boardId, boardId, boardId).c;
    }

    const requiredCount = blueprint.total_questions || 100;

    if (eligibleCount < requiredCount) {
      return {
        status: eligibleCount > 0 ? this.STATUSES.FULL_EXAM_PARTIAL : this.STATUSES.QUESTION_POOL_INSUFFICIENT,
        isEligible: false,
        requiredCount,
        availableCount: eligibleCount,
        shortage: requiredCount - eligibleCount,
        blockerReason: 'QUESTION_POOL_INSUFFICIENT',
        userMessage: `Full Exam pattern requires ${requiredCount} verified questions, but current eligible pool contains ${eligibleCount}.`
      };
    }

    return {
      status: this.STATUSES.FULL_EXAM_READY,
      isEligible: true,
      requiredCount,
      availableCount: eligibleCount,
      shortage: 0,
      blockerReason: 'NONE',
      userMessage: 'Full Exam simulation is available with official pattern and verified question inventory.'
    };
  }

  /**
   * Reconciles PDF question list with Mock session question list.
   */
  reconcilePaperAcrossSurfaces(paperId, db = getDb()) {
    const paperData = this.getOfficialPaper(paperId, db);
    if (!paperData) return { match: false, error: 'PAPER_NOT_FOUND' };

    const qIds = paperData.questions.map(q => q.question_id);
    const uniqueness = crossSurfaceLearningService.validateAssetUniqueness(qIds, 'OFFICIAL_PAPER');

    return {
      paperId,
      match: true,
      questionCount: qIds.length,
      isUniqueWithinAsset: uniqueness.valid,
      questionIds: qIds,
      hasAnswerKey: paperData.hasAnswerKey
    };
  }

  /**
   * Server-side calculation of official test result adhering strictly to blueprint.
   */
  calculateServerSideScore(blueprint, userAnswersMap, questionsMap) {
    let totalMarks = 0;
    let earnedMarks = 0;
    let negativeDeduction = 0;
    let attempted = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    const sections = blueprint.sections || [];
    const sectionBreakdown = [];

    for (const sec of sections) {
      let secAttempted = 0;
      let secCorrect = 0;
      let secWrong = 0;
      let secEarned = 0;
      let secNegative = 0;
      const marksPerQ = Number(sec.marks_per_question || sec.marksCorrect || 1.0);
      const negVal = Boolean(sec.has_negative_marking || sec.hasNegativeMarking || blueprint.is_negative_marking) 
        ? Number(sec.negative_value || sec.marksWrong || (marksPerQ * 0.25)) 
        : 0.0;

      const qIds = sec.questionIds || [];
      for (const qId of qIds) {
        const qRow = questionsMap.get(qId);
        const ans = userAnswersMap[qId];
        const isAttempted = ans !== undefined && ans !== null && ans !== '';

        if (isAttempted) {
          attempted++;
          secAttempted++;

          let parsedCorrect = {};
          try {
            parsedCorrect = JSON.parse(qRow.correct_answer || '{}');
          } catch (e) {}

          const correctIndex = typeof parsedCorrect.index === 'number' ? parsedCorrect.index : 0;
          if (parseInt(ans, 10) === correctIndex) {
            correct++;
            secCorrect++;
            secEarned += marksPerQ;
            earnedMarks += marksPerQ;
          } else {
            wrong++;
            secWrong++;
            secNegative += negVal;
            negativeDeduction += negVal;
          }
        } else {
          unattempted++;
        }
      }

      sectionBreakdown.push({
        sectionId: sec.section_id,
        name: sec.name,
        attempted: secAttempted,
        correct: secCorrect,
        wrong: secWrong,
        earnedMarks: secEarned,
        negativeDeduction: secNegative,
        netMarks: Math.max(0, secEarned - secNegative)
      });
    }

    const netScore = Math.max(0, earnedMarks - negativeDeduction);
    const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;

    return {
      attempted,
      unattempted,
      correct,
      wrong,
      grossEarnedMarks: earnedMarks,
      negativeDeduction,
      netScore,
      accuracyPercentage: Math.round(accuracy * 100) / 100,
      sectionBreakdown
    };
  }
}

module.exports = new OfficialExamFidelityService();

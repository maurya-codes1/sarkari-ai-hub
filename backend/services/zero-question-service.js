// backend/services/zero-question-service.js
// Explicit Zero-Question & Insufficient-Question Safety Engine
// Enforces zero-duplicate rules, prevents false full exam starts, guards against division-by-zero
// in scoring calculations, and logs audit events to zero_question_audit_logs.

const crypto = require('crypto');
const { getDb } = require('../db/database');

class ZeroQuestionService {
  constructor() {
    this.REASONS = {
      NO_VERIFIED_QUESTIONS: 'NO_VERIFIED_QUESTIONS',
      QUESTION_BANK_INSUFFICIENT: 'QUESTION_BANK_INSUFFICIENT',
      PATTERN_PENDING_VERIFICATION: 'PATTERN_PENDING_VERIFICATION',
      LANGUAGE_MISMATCH: 'LANGUAGE_MISMATCH',
      SUBJECT_MAPPING_MISSING: 'SUBJECT_MAPPING_MISSING',
      NO_QUESTIONS_AVAILABLE: 'NO_QUESTIONS_AVAILABLE'
    };
  }

  /**
   * Logs a zero-question or shortage event into zero_question_audit_logs.
   */
  logZeroQuestionEvent(params, db = getDb()) {
    if (!db) return null;
    try {
      const logId = `zlog-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
      db.prepare(`
        INSERT INTO zero_question_audit_logs (
          log_id, exam_id, exam_version_id, paper_id, subject_id, section_id,
          requested_count, eligible_count, language_code, blueprint_status,
          reason, user_mode, fallback_action, details_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        logId,
        params.examId || 'general',
        params.examVersionId || null,
        params.paperId || null,
        params.subjectId || null,
        params.sectionId || null,
        params.requestedCount || 0,
        params.eligibleCount || 0,
        params.languageCode || 'hi',
        params.blueprintStatus || 'NEEDS_REVIEW',
        params.reason,
        params.userMode || 'FULL_EXAM_MOCK',
        params.fallbackAction,
        params.details ? JSON.stringify(params.details) : null
      );
      return logId;
    } catch (err) {
      console.warn('[ZeroQuestionService] Logging warning:', err.message);
      return null;
    }
  }

  /**
   * Evaluates question inventory eligibility for a Full Exam Mock section.
   *
   * @param {object} params
   * @param {string} [params.examId]
   * @param {string} [params.sectionId]
   * @param {string} [params.subjectId]
   * @param {number} [params.requiredCount]
   * @param {number} [params.eligibleCount]
   * @param {Array<object>} [params.verifiedPool]
   * @param {boolean} [params.isBlueprintVerified]
   * @param {object} [db]
   * @returns {object} { canStart: boolean, isAvailable: boolean, status: string, reason: string|null, message: string }
   */
  evaluateFullExamSection(params, db = getDb()) {
    const verified = params.verifiedPool || [];
    const examId = params.examId || 'general';
    const sectionId = params.sectionId || null;
    const subjectId = params.subjectId || null;
    const requiredCount = params.requiredCount || 0;
    const eligibleCount = params.eligibleCount !== undefined ? params.eligibleCount : verified.length;
    const isBlueprintVerified = params.isBlueprintVerified !== undefined ? params.isBlueprintVerified : true;

    // 1. If blueprint is unverified, disallow Full Exam simulation claiming official pattern
    if (!isBlueprintVerified) {
      const reason = this.REASONS.PATTERN_PENDING_VERIFICATION;
      this.logZeroQuestionEvent({
        examId,
        sectionId,
        subjectId,
        requestedCount: requiredCount,
        eligibleCount,
        reason,
        userMode: 'FULL_EXAM_MOCK',
        fallbackAction: 'FULL_EXAM_UNAVAILABLE',
        blueprintStatus: 'NEEDS_REVIEW'
      }, db);

      return {
        canStart: false,
        isAvailable: false,
        status: 'FULL_EXAM_UNAVAILABLE',
        reason,
        message: 'Mock Test Not Available: Exam blueprint pattern is pending official verification.'
      };
    }

    // 2. Zero eligible questions in section
    if (eligibleCount === 0) {
      const reason = this.REASONS.NO_VERIFIED_QUESTIONS;
      this.logZeroQuestionEvent({
        examId,
        sectionId,
        subjectId,
        requestedCount: requiredCount,
        eligibleCount: 0,
        reason,
        userMode: 'FULL_EXAM_MOCK',
        fallbackAction: 'FULL_EXAM_UNAVAILABLE',
        blueprintStatus: 'VERIFIED'
      }, db);

      return {
        canStart: false,
        isAvailable: false,
        status: 'FULL_EXAM_UNAVAILABLE',
        reason,
        message: `Mock Test Not Available: Verified questions are currently unavailable for section '${sectionId || subjectId}'.`
      };
    }

    // 3. Insufficient questions in section (e.g. required 50, but only 32 eligible)
    if (eligibleCount < requiredCount) {
      const reason = this.REASONS.QUESTION_BANK_INSUFFICIENT;
      this.logZeroQuestionEvent({
        examId,
        sectionId,
        subjectId,
        requestedCount: requiredCount,
        eligibleCount,
        reason,
        userMode: 'FULL_EXAM_MOCK',
        fallbackAction: 'FULL_EXAM_UNAVAILABLE',
        blueprintStatus: 'VERIFIED',
        details: { required: requiredCount, available: eligibleCount }
      }, db);

      return {
        canStart: false,
        isAvailable: false,
        status: 'FULL_EXAM_UNAVAILABLE',
        reason,
        message: `Mock Test Not Available: Official pattern requires ${requiredCount} questions, but only ${eligibleCount} unique verified questions exist. Question bank expansion required.`
      };
    }

    return {
      canStart: true,
      isAvailable: true,
      status: 'AVAILABLE',
      reason: null,
      message: 'Verified questions fully available for section.'
    };
  }

  /**
   * Evaluates inventory for Practice Mode.
   * Never duplicates questions to fill count.
   *
   * @param {object} params
   * @param {string} [params.examId]
   * @param {string} [params.subjectId]
   * @param {number} [params.requestedCount]
   * @param {Array<object>} [params.availableQuestions]
   * @param {Array<object>} [params.eligiblePool]
   * @param {object} [db]
   * @returns {object} { canStart: boolean, isAvailable: boolean, count: number, shortage: number, questions: Array, deliveredQuestions: Array, status: string, message: string }
   */
  evaluatePracticeInventory(params, db = getDb()) {
    const examId = params.examId || 'general';
    const subjectId = params.subjectId || null;
    const requestedCount = params.requestedCount || 30;
    const availableQuestions = params.availableQuestions || params.eligiblePool || [];
    const availableCount = availableQuestions.length;

    // 1. Zero questions available
    if (availableCount === 0) {
      this.logZeroQuestionEvent({
        examId,
        subjectId,
        requestedCount,
        eligibleCount: 0,
        reason: this.REASONS.NO_QUESTIONS_AVAILABLE,
        userMode: 'PRACTICE',
        fallbackAction: 'NO_QUESTIONS_AVAILABLE'
      }, db);

      return {
        canStart: false,
        isAvailable: false,
        count: 0,
        shortage: requestedCount,
        questions: [],
        deliveredQuestions: [],
        status: 'NO_ELIGIBLE_QUESTIONS',
        reason: this.REASONS.NO_QUESTIONS_AVAILABLE,
        message: 'No questions are currently available for this selection. Please choose another topic or subject.'
      };
    }

    // 2. Insufficient questions available: Return available unique count without repetition
    if (availableCount < requestedCount) {
      this.logZeroQuestionEvent({
        examId,
        subjectId,
        requestedCount,
        eligibleCount: availableCount,
        reason: this.REASONS.QUESTION_BANK_INSUFFICIENT,
        userMode: 'PRACTICE',
        fallbackAction: 'OFFER_REDUCED_PRACTICE',
        details: { requested: requestedCount, available: availableCount }
      }, db);

      return {
        canStart: true,
        isAvailable: true,
        count: availableCount,
        shortage: requestedCount - availableCount,
        questions: availableQuestions, // Strictly unique, no duplication
        deliveredQuestions: availableQuestions,
        status: 'REDUCED_PRACTICE_SET',
        reason: this.REASONS.QUESTION_BANK_INSUFFICIENT,
        message: `Only ${availableCount} verified/eligible questions are currently available (requested ${requestedCount}). Practice set adjusted to available inventory without repetition.`
      };
    }

    // 3. Sufficient inventory
    const delivered = availableQuestions.slice(0, requestedCount);
    return {
      canStart: true,
      isAvailable: true,
      count: delivered.length,
      shortage: 0,
      questions: delivered,
      deliveredQuestions: delivered,
      status: 'AVAILABLE',
      reason: null,
      message: 'Practice questions successfully selected.'
    };
  }

  /**
   * Safe Score Calculation Guard.
   * Guarantees zero-denominator protection: never produces NaN, Infinity, undefined %, or negative zero.
   *
   * @param {object} scoreParams
   * @returns {object} sanitized score breakdown
   */
  calculateSafeScore(scoreParams = {}) {
    const totalQuestions = scoreParams.totalQuestions || 0;
    const maxPossibleMarks = scoreParams.maxPossibleMarks !== undefined 
      ? scoreParams.maxPossibleMarks 
      : (scoreParams.totalPossibleMarks || scoreParams.totalMarks || 0);
    const netScore = scoreParams.netScore !== undefined 
      ? scoreParams.netScore 
      : (scoreParams.rawMarks || scoreParams.marksObtained || 0);
    const attemptedCount = scoreParams.attemptedCount || scoreParams.questionsAttempted || 0;
    const correctCount = scoreParams.correctCount || 0;
    const incorrectCount = scoreParams.incorrectCount || 0;
    const unattemptedCount = scoreParams.unattemptedCount || 0;

    // If zero questions or max marks is 0, score is UNAVAILABLE or NOT_STARTED
    if (totalQuestions === 0 || maxPossibleMarks <= 0) {
      return {
        status: 'NOT_STARTED',
        totalQuestions: 0,
        maxPossibleMarks: 0,
        totalMarks: 0,
        netScore: 0,
        marksObtained: 0,
        percentage: 0.0,
        accuracy: 0.0,
        attemptedCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        unattemptedCount: 0,
        formattedScore: '0.00 / 0.00 (N/A)'
      };
    }

    // Clean percentage calculation
    let percentage = (netScore / maxPossibleMarks) * 100;
    if (isNaN(percentage) || !isFinite(percentage)) percentage = 0.0;
    percentage = Math.round(percentage * 100) / 100;
    // Avoid -0.00
    if (Object.is(percentage, -0)) percentage = 0.0;

    // Clean accuracy calculation (based on attempted)
    let accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0.0;
    if (isNaN(accuracy) || !isFinite(accuracy)) accuracy = 0.0;
    accuracy = Math.round(accuracy * 100) / 100;
    if (Object.is(accuracy, -0)) accuracy = 0.0;

    let cleanNetScore = Math.round(netScore * 100) / 100;
    if (Object.is(cleanNetScore, -0)) cleanNetScore = 0.0;

    return {
      status: 'COMPLETED',
      totalQuestions,
      maxPossibleMarks: Math.round(maxPossibleMarks * 100) / 100,
      totalMarks: Math.round(maxPossibleMarks * 100) / 100,
      netScore: cleanNetScore,
      marksObtained: cleanNetScore,
      percentage,
      accuracy,
      attemptedCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      formattedScore: `${cleanNetScore.toFixed(2)} / ${maxPossibleMarks.toFixed(2)} (${percentage.toFixed(2)}%)`
    };
  }
}

module.exports = new ZeroQuestionService();

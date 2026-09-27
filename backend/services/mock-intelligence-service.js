// backend/services/mock-intelligence-service.js
// Phase 13 Mock Performance Intelligence Service
// Post-mock diagnostics, negative marking impact, section breakdown, private targeted recommendations.

const { getDb } = require('../db/database');
const weaknessDetectionService = require('./weakness-detection-service');

class MockIntelligenceService {
  /**
   * Process completed mock test and generate diagnostic intelligence record
   */
  processMockResult(mockData, db = getDb()) {
    const {
      userId,
      examId,
      paperId = null,
      sessionId = null,
      totalScore = 0,
      maxPossibleScore = 100,
      attemptedCount = 0,
      skippedCount = 0,
      incorrectCount = 0,
      correctCount = 0,
      sectionPerformance = [],
      negativeMarkingDeduction = 0,
      timeUtilizationSeconds = 0,
      questionAttempts = [] // array of { questionId, subjectId, chapterId, topicId, isCorrect, isSkipped, timeSpentSeconds, selectedOption }
    } = mockData;

    if (!userId || !examId) {
      throw new Error('userId and examId are mandatory for mock performance processing');
    }

    const accuracyPct = attemptedCount > 0
      ? Math.round((correctCount / attemptedCount) * 1000) / 10
      : 0.0;

    // 1. Generate targeted recommendations based on diagnostics
    const recommendations = this._generateRecommendations({
      totalScore,
      maxPossibleScore,
      accuracyPct,
      attemptedCount,
      incorrectCount,
      negativeMarkingDeduction,
      sectionPerformance
    });

    // 2. Persist mock performance record
    const mockRecordId = `mock-rec-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    db.prepare(`
      INSERT INTO mock_performance_records (
        mock_record_id, user_id, exam_id, paper_id, session_id,
        total_score, max_possible_score, accuracy_pct, attempted_count,
        skipped_count, incorrect_count, section_performance_json,
        negative_marking_deduction, time_utilization_seconds,
        recommendations_json, completed_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      mockRecordId, userId, examId, paperId, sessionId,
      totalScore, maxPossibleScore, accuracyPct, attemptedCount,
      skippedCount, incorrectCount, JSON.stringify(sectionPerformance),
      negativeMarkingDeduction, timeUtilizationSeconds,
      JSON.stringify(recommendations)
    );

    // 3. Record individual question attempts in candidate_question_attempts
    if (Array.isArray(questionAttempts) && questionAttempts.length > 0) {
      for (const qa of questionAttempts) {
        weaknessDetectionService.recordAttempt({
          userId,
          questionId: qa.questionId,
          examId,
          subjectId: qa.subjectId,
          chapterId: qa.chapterId,
          topicId: qa.topicId,
          practiceMode: 'MOCK_TEST',
          selectedOption: qa.selectedOption,
          isCorrect: qa.isCorrect ? 1 : 0,
          isSkipped: qa.isSkipped ? 1 : 0,
          timeSpentSeconds: qa.timeSpentSeconds || 0,
          confidenceLevel: qa.confidenceLevel || 'MEDIUM'
        }, db);
      }
    }

    return {
      mockRecordId,
      userId,
      examId,
      totalScore,
      maxPossibleScore,
      scorePercentage: Math.round((totalScore / maxPossibleScore) * 1000) / 10,
      accuracyPct,
      attemptedCount,
      incorrectCount,
      skippedCount,
      negativeMarkingDeduction,
      timeUtilizationSeconds,
      sectionPerformance,
      recommendations,
      privacyNotice: 'Your mock analytics and recommendations are strictly private and accessible only to your account.'
    };
  }

  /**
   * Generates actionable pedagogical recommendations from mock diagnostics
   */
  _generateRecommendations(metrics) {
    const {
      accuracyPct,
      attemptedCount,
      incorrectCount,
      negativeMarkingDeduction,
      sectionPerformance = []
    } = metrics;

    const recs = {
      overallSummary: '',
      negativeMarkingImpact: '',
      weakSections: [],
      nextSuggestedPracticeMode: 'MIXED_ADAPTIVE',
      actionSteps: []
    };

    // Accuracy evaluation
    if (accuracyPct >= 80.0) {
      recs.overallSummary = 'Outstanding accuracy! Focus on speed optimization and rare-concept retention.';
      recs.nextSuggestedPracticeMode = 'SPEED_PRACTICE';
    } else if (accuracyPct >= 65.0) {
      recs.overallSummary = 'Good baseline performance. Targeted error revision will lift your score into the safe qualifying zone.';
      recs.nextSuggestedPracticeMode = 'ERROR_REVISION';
    } else {
      recs.overallSummary = 'Conceptual consolidation needed. Reinforce foundational topics before attempting the next full mock.';
      recs.nextSuggestedPracticeMode = 'WEAK_TOPIC_DRILL';
    }

    // Negative marking deduction impact
    if (negativeMarkingDeduction > 0) {
      recs.negativeMarkingImpact = `You lost ${negativeMarkingDeduction} marks to negative penalty across ${incorrectCount} incorrect answers. In competitive exams, avoiding low-confidence guesses can immediately preserve your rank.`;
      recs.actionSteps.push(`Review the ${incorrectCount} incorrect questions in Error Revision mode.`);
    } else {
      recs.negativeMarkingImpact = 'Zero penalty marks lost to negative marking. Clean attempt discipline maintained.';
    }

    // Identify weak sections
    for (const sec of sectionPerformance) {
      const secAcc = sec.accuracyPct !== undefined ? sec.accuracyPct : (sec.attempted > 0 ? (sec.correct / sec.attempted) * 100 : 0);
      if (secAcc < 55.0) {
        recs.weakSections.push({
          sectionName: sec.sectionName || sec.subjectId,
          accuracy: Math.round(secAcc * 10) / 10,
          recommendation: `Schedule targeted chapter drills in ${sec.sectionName || sec.subjectId}.`
        });
        recs.actionSteps.push(`Focus 30 minutes of daily study on ${sec.sectionName || sec.subjectId}.`);
      }
    }

    if (recs.actionSteps.length === 0) {
      recs.actionSteps.push('Take an adaptive mixed practice set to maintain recall across all exam sections.');
    }

    return recs;
  }

  /**
   * Get candidate mock history with trend analysis
   */
  getMockHistory(userId, examId, db = getDb()) {
    const records = db.prepare(`
      SELECT * FROM mock_performance_records
      WHERE user_id = ? AND exam_id = ?
      ORDER BY completed_at ASC
    `).all(userId, examId);

    const history = records.map(r => ({
      mockRecordId: r.mock_record_id,
      totalScore: r.total_score,
      maxPossibleScore: r.max_possible_score,
      accuracyPct: r.accuracy_pct,
      attemptedCount: r.attempted_count,
      incorrectCount: r.incorrect_count,
      negativeMarkingDeduction: r.negative_marking_deduction,
      timeUtilizationSeconds: r.time_utilization_seconds,
      sectionPerformance: JSON.parse(r.section_performance_json || '[]'),
      recommendations: JSON.parse(r.recommendations_json || '{}'),
      completedAt: r.completed_at
    }));

    return {
      userId,
      examId,
      totalMocksTaken: history.length,
      history,
      scoreTrend: history.map(h => ({ date: h.completedAt, score: h.totalScore, accuracy: h.accuracyPct }))
    };
  }
}

module.exports = new MockIntelligenceService();

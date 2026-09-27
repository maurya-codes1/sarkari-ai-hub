// backend/services/candidate-profile-service.js
// Phase 13 Candidate Preparation Profile Engine & Honest Analytics Service
// Privacy-by-design: Complete user data isolation with honest, verifiable denominators.

const { getDb } = require('../db/database');
const weaknessDetectionService = require('./weakness-detection-service');

class CandidateProfileService {
  /**
   * Retrieve candidate preparation profile with privacy isolation and honest metrics.
   */
  getProfile(userId, examId, db = getDb()) {
    if (!userId || !examId) {
      throw new Error('userId and examId are required to retrieve candidate profile');
    }

    // 1. Fetch profile record
    let profile = db.prepare(`
      SELECT * FROM candidate_preparation_profiles
      WHERE user_id = ? AND exam_id = ?
    `).get(userId, examId);

    // If profile doesn't exist, create an initial one
    if (!profile) {
      const profileId = `prof-${userId}-${examId}`;
      db.prepare(`
        INSERT INTO candidate_preparation_profiles (
          profile_id, user_id, exam_id, study_streak_days, total_attempted,
          total_correct, total_incorrect, total_skipped, total_time_seconds,
          accuracy_rate, overall_preparation_pct, created_at, updated_at
        ) VALUES (?, ?, ?, 1, 0, 0, 0, 0, 0, 0.0, 0.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).run(profileId, userId, examId);

      profile = db.prepare('SELECT * FROM candidate_preparation_profiles WHERE profile_id = ?').get(profileId);
    }

    // 2. Fetch honest denominators from verified question bank
    const honestMetrics = this.getHonestDenominators(userId, examId, db);

    // 3. Subject & Chapter Mastery
    const hierarchicalAnalysis = weaknessDetectionService.getHierarchicalAnalysis(userId, examId, db);

    // 4. Spaced Revision Backlog (Leitner 5-box intervals)
    const revisionSummary = this._getRevisionSummary(userId, examId, db);

    // 5. Recent Mock Performance
    const recentMocks = db.prepare(`
      SELECT mock_record_id, total_score, max_possible_score, accuracy_pct,
             attempted_count, incorrect_count, skipped_count,
             negative_marking_deduction, completed_at
      FROM mock_performance_records
      WHERE user_id = ? AND exam_id = ?
      ORDER BY completed_at DESC
      LIMIT 5
    `).all(userId, examId);

    // 6. Active Weak & Strong Concepts
    let weakConcepts = [];
    let strongConcepts = [];
    try {
      weakConcepts = JSON.parse(profile.weak_concepts_json || '[]');
      strongConcepts = JSON.parse(profile.strong_concepts_json || '[]');
    } catch (e) {}

    return {
      userId,
      examId,
      profileId: profile.profile_id,
      studyStreakDays: profile.study_streak_days || 1,
      totalAttempted: profile.total_attempted || 0,
      totalCorrect: profile.total_correct || 0,
      totalIncorrect: profile.total_incorrect || 0,
      totalSkipped: profile.total_skipped || 0,
      totalTimeSeconds: profile.total_time_seconds || 0,
      accuracyRate: profile.accuracy_rate || 0.0,
      overallPreparationPct: honestMetrics.overallPreparationPct,
      honestDenominators: honestMetrics,
      weakConcepts,
      strongConcepts,
      revisionSummary,
      recentMocks,
      subjectsProgress: hierarchicalAnalysis.subjects,
      integrityDisclaimer: 'Preparation progress is calculated strictly against available verified syllabus and authentic questions. SarkariAI Hub does not guarantee exam qualification or selection.'
    };
  }

  /**
   * Calculates strictly honest preparation denominators.
   * Never displays misleading 100% preparation if only partial content is covered.
   */
  getHonestDenominators(userId, examId, db = getDb()) {
    // A. Available eligible PYQs vs Candidate completed PYQs
    const totalPyqsRow = db.prepare(`
      SELECT COUNT(DISTINCT q.question_id) as total_pyqs
      FROM questions q
      WHERE q.provenance = 'OFFICIAL_PYQ'
        AND (q.exam_version_id LIKE ? OR q.paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
    `).get(`%${examId}%`, examId);

    const totalAvailablePyqs = totalPyqsRow ? totalPyqsRow.total_pyqs : 0;

    const completedPyqsRow = db.prepare(`
      SELECT COUNT(DISTINCT a.question_id) as completed_pyqs
      FROM candidate_question_attempts a
      JOIN questions q ON a.question_id = q.question_id
      WHERE a.user_id = ? AND a.exam_id = ? AND q.provenance = 'OFFICIAL_PYQ'
    `).get(userId, examId);

    const completedPyqs = completedPyqsRow ? completedPyqsRow.completed_pyqs : 0;
    const pyqCoveragePct = totalAvailablePyqs > 0 
      ? Math.round((completedPyqs / totalAvailablePyqs) * 1000) / 10 
      : 0.0;

    // B. Total Verified Questions Available for Exam vs Attempted
    const totalQuestionsRow = db.prepare(`
      SELECT COUNT(DISTINCT q.question_id) as total_questions
      FROM questions q
      WHERE q.current_eligibility = 1
        AND (q.exam_version_id LIKE ? OR q.paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
    `).get(`%${examId}%`, examId);

    const totalAvailableQuestions = totalQuestionsRow ? totalQuestionsRow.total_questions : 0;

    const candidateUniqueAttemptedRow = db.prepare(`
      SELECT COUNT(DISTINCT question_id) as unique_attempted
      FROM candidate_question_attempts
      WHERE user_id = ? AND exam_id = ?
    `).get(userId, examId);

    const uniqueQuestionsAttempted = candidateUniqueAttemptedRow ? candidateUniqueAttemptedRow.unique_attempted : 0;
    const bankCoveragePct = totalAvailableQuestions > 0
      ? Math.round((uniqueQuestionsAttempted / totalAvailableQuestions) * 1000) / 10
      : 0.0;

    // C. Candidate Overall Accuracy
    const candidateAccuracyRow = db.prepare(`
      SELECT 
        COUNT(*) as total_attempts,
        SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) as correct_attempts
      FROM candidate_question_attempts
      WHERE user_id = ? AND exam_id = ?
    `).get(userId, examId);

    const totalAttempts = candidateAccuracyRow ? candidateAccuracyRow.total_attempts : 0;
    const correctAttempts = candidateAccuracyRow ? candidateAccuracyRow.correct_attempts : 0;
    const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 1000) / 10 : 0.0;

    // D. Realistic Overall Preparation % (Weighted: 40% PYQ coverage, 30% Question bank coverage, 30% Accuracy)
    const overallPreparationPct = Math.round(
      (pyqCoveragePct * 0.40 + bankCoveragePct * 0.30 + accuracyPct * 0.30) * 10
    ) / 10;

    return {
      pyqCoverage: {
        completed: completedPyqs,
        available: totalAvailablePyqs,
        percentage: pyqCoveragePct,
        ratioLabel: `${completedPyqs} / ${totalAvailablePyqs} Verified PYQs`
      },
      bankCoverage: {
        attempted: uniqueQuestionsAttempted,
        available: totalAvailableQuestions,
        percentage: bankCoveragePct,
        ratioLabel: `${uniqueQuestionsAttempted} / ${totalAvailableQuestions} Eligible Questions`
      },
      overallAccuracy: {
        correct: correctAttempts,
        total: totalAttempts,
        percentage: accuracyPct
      },
      overallPreparationPct
    };
  }

  /**
   * Spaced revision breakdown across Leitner 5-box intervals
   */
  _getRevisionSummary(userId, examId, db) {
    const cards = db.prepare(`
      SELECT repetition_level, revision_status, next_review_due
      FROM user_spaced_revisions
      WHERE user_id = ? AND exam_id = ?
    `).all(userId, examId);

    const boxDistribution = { box1: 0, box2: 0, box3: 0, box4: 0, box5_mastered: 0 };
    let dueToday = 0;
    let overdue = 0;
    let upcoming = 0;
    let mastered = 0;
    let failedRelearning = 0;

    const now = new Date();

    cards.forEach(c => {
      const level = Math.min(5, Math.max(1, c.repetition_level || 1));
      if (level === 5) {
        boxDistribution.box5_mastered++;
        mastered++;
      } else {
        boxDistribution[`box${level}`]++;
      }

      if (c.revision_status === 'MASTERED') {
        // already counted
      } else if (c.revision_status === 'FAILED' || (c.mistake_count > 2 && level === 1)) {
        failedRelearning++;
      }

      if (c.next_review_due) {
        const dueDate = new Date(c.next_review_due);
        const diffHours = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (diffHours < -24) {
          overdue++;
        } else if (diffHours <= 24) {
          dueToday++;
        } else {
          upcoming++;
        }
      }
    });

    return {
      totalCards: cards.length,
      dueToday,
      overdue,
      upcoming,
      mastered,
      failedRelearning,
      boxDistribution
    };
  }

  /**
   * Update candidate exam preparation target
   */
  updateTarget(userId, examId, updateData, db = getDb()) {
    const { targetDate, targetDailyHours = 3.0 } = updateData;

    db.prepare(`
      UPDATE candidate_preparation_profiles
      SET target_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ? AND exam_id = ?
    `).run(targetDate || null, userId, examId);

    // Also sync with user_preparation_plans if exists
    db.prepare(`
      UPDATE user_preparation_plans
      SET target_exam_date = ?, daily_study_hours = ?, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ? AND exam_id = ? AND status = 'ACTIVE'
    `).run(targetDate || null, targetDailyHours, userId, examId);

    return {
      userId,
      examId,
      targetDate,
      targetDailyHours,
      status: 'UPDATED'
    };
  }
}

module.exports = new CandidateProfileService();

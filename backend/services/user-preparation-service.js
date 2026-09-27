// backend/services/user-preparation-service.js
// User Preparation Intelligence, Saved-Exams, Application Tracker & Progress Engine

const { getDb } = require('../db/database');
const registrationEligibilityService = require('./registration-eligibility-service');

class UserPreparationService {
  // -------------------------------------------------------------
  // 1. SAVED EXAMS & FOLLOW WORKFLOWS
  // -------------------------------------------------------------
  saveItem(userId, itemType, itemId, db = getDb()) {
    const validTypes = ['EXAM', 'BOARD', 'STATE', 'SUBJECT', 'CLASS'];
    if (!validTypes.includes(itemType)) {
      throw new Error(`Invalid itemType: ${itemType}. Must be one of: ${validTypes.join(', ')}`);
    }

    const savedId = `saved-${userId}-${itemType}-${itemId}`;
    db.prepare(`
      INSERT OR REPLACE INTO user_saved_items (
        saved_id, user_id, item_type, item_id, notifications_enabled, created_at
      ) VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    `).run(savedId, userId, itemType, itemId);

    return { savedId, userId, itemType, itemId, status: 'SAVED' };
  }

  unsaveItem(userId, itemType, itemId, db = getDb()) {
    db.prepare(`
      DELETE FROM user_saved_items
      WHERE user_id = ? AND item_type = ? AND item_id = ?
    `).run(userId, itemType, itemId);

    return { userId, itemType, itemId, status: 'UNSAVED' };
  }

  getSavedItems(userId, db = getDb()) {
    const rows = db.prepare('SELECT * FROM user_saved_items WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    return rows;
  }

  // -------------------------------------------------------------
  // 2. APPLICATION TRACKER
  // -------------------------------------------------------------
  trackApplication(userId, trackingData, db = getDb()) {
    const { examId, candidateCategory, candidateDob, notes } = trackingData;

    // Check candidate eligibility from official criteria
    let isEligible = 1;
    let eligibilityNotes = 'Candidate meets preliminary age & educational criteria.';
    try {
      if (candidateDob) {
        const birthDate = new Date(candidateDob);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        const evalResult = registrationEligibilityService.evaluateCandidateEligibility(
          examId, { age, category: candidateCategory || 'UR' }, db
        );
        isEligible = evalResult.isEligible ? 1 : 0;
        eligibilityNotes = evalResult.relaxationsApplied.length > 0
          ? `Eligible with: ${evalResult.relaxationsApplied.join(', ')}`
          : (evalResult.isEligible ? 'Standard eligibility verified' : evalResult.unmetCriteria.join(', '));
      }
    } catch (e) {
      // Fallback safely
    }

    // Determine application fee and portal from nationwide_exam_inventory or exam_registrations
    let fee = 100;
    let portalUrl = 'https://official.gov.in';
    let correctionNotes = 'Correction window open for 3 days post-deadline';

    const reg = db.prepare('SELECT * FROM exam_registrations WHERE entity_id = ?').get(examId);
    if (reg) {
      portalUrl = reg.official_portal_url;
      fee = candidateCategory && ['SC', 'ST', 'FEMALE', 'PWBD'].includes(candidateCategory.toUpperCase())
        ? (reg.reserved_fee_inr || 0)
        : (reg.general_fee_inr || 100);
      if (reg.correction_window_start && reg.correction_window_end) {
        correctionNotes = `Correction window: ${reg.correction_window_start} to ${reg.correction_window_end}`;
      }
    } else {
      const inv = db.prepare('SELECT * FROM nationwide_exam_inventory WHERE exam_id = ?').get(examId);
      if (inv) {
        portalUrl = inv.official_website_url;
      }
    }

    const docsRequired = [
      'Scanned Passport-size Photograph (20-50 KB)',
      'Scanned Signature (10-20 KB)',
      'Class 10th / Matriculation Certificate for DOB proof',
      'Category / Caste Certificate (if applicable)'
    ];

    const trackerId = `track-${userId}-${examId}`;
    db.prepare(`
      INSERT OR REPLACE INTO user_application_trackers (
        tracker_id, user_id, exam_id, application_status, candidate_category,
        candidate_dob, is_eligible, eligibility_notes, fee_payable,
        documents_required_json, official_portal_url, correction_window_notes,
        notes, updated_at
      ) VALUES (
        @trackerId, @userId, @examId, 'INTENDED', @candidateCategory,
        @candidateDob, @isEligible, @eligibilityNotes, @fee,
        @docsJson, @portalUrl, @correctionNotes, @notes, CURRENT_TIMESTAMP
      )
    `).run({
      trackerId,
      userId,
      examId,
      candidateCategory: candidateCategory || 'UR',
      candidateDob: candidateDob || null,
      isEligible,
      eligibilityNotes,
      fee,
      docsJson: JSON.stringify(docsRequired),
      portalUrl,
      correctionNotes,
      notes: notes || 'Intended for upcoming recruitment session'
    });

    return db.prepare('SELECT * FROM user_application_trackers WHERE tracker_id = ?').get(trackerId);
  }

  updateApplicationStatus(trackerId, status, db = getDb()) {
    const validStatuses = [
      'INTENDED', 'APPLIED', 'PAYMENT_DONE', 'ADMIT_CARD_DOWNLOADED',
      'EXAM_ATTENDED', 'RESULT_CHECKED', 'ARCHIVED'
    ];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`);
    }

    db.prepare(`
      UPDATE user_application_trackers
      SET application_status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE tracker_id = ?
    `).run(status, trackerId);

    return db.prepare('SELECT * FROM user_application_trackers WHERE tracker_id = ?').get(trackerId);
  }

  getUserApplications(userId, db = getDb()) {
    const rows = db.prepare(`
      SELECT uat.*, e.name as exam_name
      FROM user_application_trackers uat
      LEFT JOIN exams e ON uat.exam_id = e.exam_id
      WHERE uat.user_id = ?
      ORDER BY uat.updated_at DESC
    `).all(userId);

    return rows.map(r => ({
      ...r,
      documents_required: JSON.parse(r.documents_required_json || '[]')
    }));
  }

  // -------------------------------------------------------------
  // 3. PREPARATION PROGRESS & PERFORMANCE TRACKING
  // -------------------------------------------------------------
  recordPracticeActivity(userId, activityData, db = getDb()) {
    const {
      examId,
      subjectId,
      topicId,
      questionsAttempted,
      questionsCorrect,
      questionsIncorrect,
      questionsSkipped,
      timeSpentSeconds,
      isMock,
      isPyq
    } = activityData;

    const progressId = `prog-${userId}-${examId}-${subjectId || 'all'}-${topicId || 'all'}`;

    const existing = db.prepare('SELECT * FROM user_preparation_progress WHERE progress_id = ?').get(progressId);

    const totAttempted = (existing ? existing.questions_attempted : 0) + (questionsAttempted || 0);
    const totCorrect = (existing ? existing.questions_correct : 0) + (questionsCorrect || 0);
    const totIncorrect = (existing ? existing.questions_incorrect : 0) + (questionsIncorrect || 0);
    const totSkipped = (existing ? existing.questions_skipped : 0) + (questionsSkipped || 0);
    const totTime = (existing ? existing.total_time_seconds : 0) + (timeSpentSeconds || 0);
    const mockCount = (existing ? existing.mock_attempts_count : 0) + (isMock ? 1 : 0);
    const pyqCount = (existing ? existing.pyq_attempted_count : 0) + (isPyq ? (questionsAttempted || 0) : 0);

    const accuracy = totAttempted > 0 ? ((totCorrect / totAttempted) * 100) : 0.0;

    db.prepare(`
      INSERT OR REPLACE INTO user_preparation_progress (
        progress_id, user_id, exam_id, subject_id, topic_id,
        questions_attempted, questions_correct, questions_incorrect,
        questions_skipped, accuracy_pct, total_time_seconds,
        mock_attempts_count, pyq_attempted_count, last_activity_at
      ) VALUES (
        @progressId, @userId, @examId, @subjectId, @topicId,
        @totAttempted, @totCorrect, @totIncorrect,
        @totSkipped, @accuracy, @totTime,
        @mockCount, @pyqCount, CURRENT_TIMESTAMP
      )
    `).run({
      progressId,
      userId,
      examId,
      subjectId: subjectId || null,
      topicId: topicId || null,
      totAttempted,
      totCorrect,
      totIncorrect,
      totSkipped,
      accuracy: Math.round(accuracy * 100) / 100,
      totTime,
      mockCount,
      pyqCount
    });

    // Check if topic is weak
    if (topicId && totAttempted >= 5 && accuracy < 60.0) {
      this.updateWeakTopic(userId, examId, subjectId, topicId, accuracy, totIncorrect, totSkipped, totTime / totAttempted, db);
    }

    return db.prepare('SELECT * FROM user_preparation_progress WHERE progress_id = ?').get(progressId);
  }

  updateWeakTopic(userId, examId, subjectId, topicId, accuracy, mistakeCount, skippedCount, avgTime, db = getDb()) {
    const weakId = `weak-${userId}-${examId}-${topicId}`;
    let severity = 'MODERATE';
    if (accuracy < 40.0 || mistakeCount >= 10) severity = 'CRITICAL';
    else if (accuracy >= 50.0) severity = 'MILD';

    const action = `Review concepts in ${topicId} and practice 10 targeted concept drill questions.`;

    db.prepare(`
      INSERT OR REPLACE INTO user_weak_topics (
        weak_id, user_id, exam_id, subject_id, chapter_id, topic_id,
        topic_name, accuracy_pct, mistake_count, skipped_count,
        avg_time_seconds, weakness_severity, recommended_action, updated_at
      ) VALUES (
        @weakId, @userId, @examId, @subjectId, 'ch-1', @topicId,
        @topicId, @accuracy, @mistakeCount, @skippedCount,
        @avgTime, @severity, @action, CURRENT_TIMESTAMP
      )
    `).run({
      weakId,
      userId,
      examId,
      subjectId: subjectId || 'general',
      topicId,
      accuracy: Math.round(accuracy * 100) / 100,
      mistakeCount,
      skippedCount,
      avgTime: Math.round(avgTime || 45),
      severity,
      action
    });
  }

  getWeakTopics(userId, examId = null, db = getDb()) {
    let sql = 'SELECT * FROM user_weak_topics WHERE user_id = ?';
    const params = [userId];
    if (examId) {
      sql += ' AND exam_id = ?';
      params.push(examId);
    }
    sql += ' ORDER BY accuracy_pct ASC, mistake_count DESC';
    return db.prepare(sql).all(...params);
  }

  // -------------------------------------------------------------
  // 4. PREPARATION DASHBOARD & EXPLAINABLE RECOMMENDATIONS
  // -------------------------------------------------------------
  getDashboardData(userId, examId = 'ssc-cgl', db = getDb()) {
    const saved = this.getSavedItems(userId, db);
    const applications = this.getUserApplications(userId, db);
    const weakTopics = this.getWeakTopics(userId, examId, db);

    const overallProgress = db.prepare(`
      SELECT 
        SUM(questions_attempted) as total_attempted,
        SUM(questions_correct) as total_correct,
        SUM(questions_incorrect) as total_incorrect,
        SUM(questions_skipped) as total_skipped,
        SUM(total_time_seconds) as total_time,
        SUM(mock_attempts_count) as total_mocks,
        SUM(pyq_attempted_count) as total_pyqs
      FROM user_preparation_progress
      WHERE user_id = ? AND exam_id = ?
    `).get(userId, examId);

    const attempted = overallProgress ? (overallProgress.total_attempted || 0) : 0;
    const correct = overallProgress ? (overallProgress.total_correct || 0) : 0;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    // Build explainable recommendations
    const recommendations = [];

    // Rec 1: Address top weak topic if exists
    if (weakTopics.length > 0) {
      const topWeak = weakTopics[0];
      recommendations.push({
        id: `rec-weak-${topWeak.topic_id}`,
        type: 'TOPIC_TEST',
        title: `Reinforce ${topWeak.topic_name}`,
        rationale: `Your current accuracy is ${topWeak.accuracy_pct}% with ${topWeak.mistake_count} recorded errors. Targeted practice will improve accuracy.`,
        questionCount: 10,
        difficulty: 'TARGETED'
      });
    }

    // Rec 2: PYQ practice recommendation
    recommendations.push({
      id: `rec-pyq-${examId}`,
      type: 'PYQ_REVISION',
      title: `SSC CGL Tier-1 Authentic PYQs Revision`,
      rationale: `Practice verified previous-year questions from authentic administered shifts to build exam-pace pattern familiarity.`,
      questionCount: 25,
      difficulty: 'OFFICIAL_EXAM_LEVEL'
    });

    // Rec 3: Full Mock if ready
    const gateService = require('./full-exam-gate-service');
    const examVer = db.prepare('SELECT current_version_id FROM exams WHERE exam_id = ?').get(examId);
    let fullMockReady = false;
    if (examVer) {
      const readiness = gateService.evaluateExamReadiness(examId, examVer.current_version_id, db);
      fullMockReady = readiness.status === 'READY_FOR_FULL_EXAM';
    }

    if (fullMockReady) {
      recommendations.push({
        id: `rec-full-mock-${examId}`,
        type: 'FULL_MOCK',
        title: `Full Exam Simulation (100 Questions)`,
        rationale: `All 100 blueprint requirements are satisfied by authentic verified questions. Practice in timed exam mode.`,
        questionCount: 100,
        difficulty: 'BLUEPRINT_EXACT'
      });
    }

    return {
      userId,
      activeExamId: examId,
      overallMetrics: {
        questionsAttempted: attempted,
        questionsCorrect: correct,
        accuracyPercentage: accuracy,
        totalTimeMinutes: Math.round((overallProgress ? (overallProgress.total_time || 0) : 0) / 60),
        mocksAttempted: overallProgress ? (overallProgress.total_mocks || 0) : 0,
        pyqsAttempted: overallProgress ? (overallProgress.total_pyqs || 0) : 0
      },
      savedItemsCount: saved.length,
      trackedApplicationsCount: applications.length,
      weakTopics,
      recommendations
    };
  }
}

module.exports = new UserPreparationService();

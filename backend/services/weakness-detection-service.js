// backend/services/weakness-detection-service.js
// Phase 13 Weakness Detection Engine: Subject -> Chapter -> Topic Analysis with Recovery Tracking
// Treats weakness as an actionable preparation signal, not a permanent label.

const { getDb } = require('../db/database');

class WeaknessDetectionService {
  /**
   * Record a single question attempt and trigger real-time weakness/recovery recalculation.
   */
  recordAttempt(attemptData, db = getDb()) {
    const {
      userId,
      questionId,
      examId,
      subjectId,
      chapterId,
      topicId,
      practiceMode = 'MIXED_ADAPTIVE',
      selectedOption = null,
      isCorrect = 0,
      isSkipped = 0,
      timeSpentSeconds = 0,
      confidenceLevel = 'MEDIUM'
    } = attemptData;

    if (!userId || !questionId || !examId) {
      throw new Error('userId, questionId, and examId are required to record attempt');
    }

    // Resolve question details if topic/subject not provided
    let finalSubjectId = subjectId;
    let finalChapterId = chapterId;
    let finalTopicId = topicId;

    if (!finalSubjectId || !finalTopicId) {
      const q = db.prepare('SELECT subject_id, chapter_id, topic_id FROM questions WHERE question_id = ?').get(questionId);
      if (q) {
        finalSubjectId = finalSubjectId || q.subject_id;
        finalChapterId = finalChapterId || q.chapter_id;
        finalTopicId = finalTopicId || q.topic_id;
      }
    }

    const attemptId = `att-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    
    // Insert attempt record
    db.prepare(`
      INSERT INTO candidate_question_attempts (
        attempt_id, user_id, question_id, exam_id, subject_id, chapter_id, topic_id,
        practice_mode, selected_option, is_correct, is_skipped, time_spent_seconds,
        confidence_level, attempted_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      attemptId, userId, questionId, examId, finalSubjectId, finalChapterId, finalTopicId,
      practiceMode, selectedOption, isCorrect ? 1 : 0, isSkipped ? 1 : 0,
      timeSpentSeconds, confidenceLevel
    );

    // Recalculate topic metrics & recovery for this topic
    if (finalTopicId) {
      this.evaluateTopicStatus(userId, examId, finalSubjectId, finalChapterId, finalTopicId, db);
    }

    // Update candidate preparation profile
    this.updateProfileSummary(userId, examId, isCorrect, isSkipped, timeSpentSeconds, db);

    return {
      attemptId,
      userId,
      questionId,
      examId,
      isCorrect: !!isCorrect,
      isSkipped: !!isSkipped,
      timeSpentSeconds
    };
  }

  /**
   * Evaluate a topic's weakness or recovery status based on attempt history.
   */
  evaluateTopicStatus(userId, examId, subjectId, chapterId, topicId, db = getDb()) {
    const attempts = db.prepare(`
      SELECT is_correct, is_skipped, time_spent_seconds, confidence_level, attempted_at
      FROM candidate_question_attempts
      WHERE user_id = ? AND exam_id = ? AND topic_id = ?
      ORDER BY attempted_at DESC
    `).all(userId, examId, topicId);

    if (attempts.length === 0) return null;

    const totalAttempts = attempts.length;
    const correctCount = attempts.filter(a => a.is_correct === 1).length;
    const incorrectCount = attempts.filter(a => a.is_correct === 0 && a.is_skipped === 0).length;
    const skippedCount = attempts.filter(a => a.is_skipped === 1).length;
    const totalTime = attempts.reduce((acc, a) => acc + (a.time_spent_seconds || 0), 0);
    const avgTime = Math.round(totalTime / totalAttempts);
    const overallAccuracy = Math.round((correctCount / totalAttempts) * 1000) / 10;

    // Recent 5 attempts for recovery signal
    const recentAttempts = attempts.slice(0, 5);
    const recentCorrect = recentAttempts.filter(a => a.is_correct === 1).length;
    const recentAccuracy = Math.round((recentCorrect / recentAttempts.length) * 1000) / 10;

    // Determine status
    let severity = 'MILD';
    let status = 'NEUTRAL';
    let recommendedAction = `Continue balanced practice in ${topicId}.`;

    if (totalAttempts >= 3) {
      if (overallAccuracy < 45.0) {
        severity = 'CRITICAL';
        status = 'WEAK';
        recommendedAction = `Targeted conceptual review needed for ${topicId}. Practice 10 untimed foundational questions.`;
      } else if (overallAccuracy < 65.0) {
        severity = 'MODERATE';
        status = 'WEAK';
        recommendedAction = `Focus on error analysis in ${topicId}. Solve 5 topic drill questions.`;
      } else if (overallAccuracy >= 80.0) {
        // Check if previously weak and now recovered
        const existingWeak = db.prepare('SELECT * FROM user_weak_topics WHERE user_id = ? AND exam_id = ? AND topic_id = ?').get(userId, examId, topicId);
        if (existingWeak && (existingWeak.weakness_severity === 'CRITICAL' || existingWeak.weakness_severity === 'MODERATE')) {
          status = 'RECOVERED';
          severity = 'RECOVERED';
          recommendedAction = `Topic mastered after targeted practice! Schedule periodic revision in Leitner Box 4.`;
        } else {
          status = 'STRONG';
          severity = 'STRONG';
          recommendedAction = `Solid grasp of ${topicId}. Maintain retention via spaced revision.`;
        }
      } else {
        severity = 'MILD';
        status = 'PROGRESSING';
      }

      // Check recovery in progress
      if (status === 'WEAK' && recentAttempts.length >= 3 && recentAccuracy >= 75.0) {
        status = 'RECOVERING';
        severity = 'RECOVERING';
        recommendedAction = `Improving trend detected! Keep up current practice to solidify mastery.`;
      }
    }

    const weakId = `weak-${userId}-${examId}-${topicId}`;
    db.prepare(`
      INSERT OR REPLACE INTO user_weak_topics (
        weak_id, user_id, exam_id, subject_id, chapter_id, topic_id,
        topic_name, accuracy_pct, mistake_count, skipped_count,
        avg_time_seconds, weakness_severity, recommended_action, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      weakId, userId, examId, subjectId || 'general', chapterId || 'ch-1', topicId,
      topicId, overallAccuracy, incorrectCount, skippedCount, avgTime, severity, recommendedAction
    );

    return {
      topicId,
      totalAttempts,
      overallAccuracy,
      recentAccuracy,
      severity,
      status,
      recommendedAction
    };
  }

  /**
   * Update candidate preparation profile aggregated numbers
   */
  updateProfileSummary(userId, examId, isCorrect, isSkipped, timeSpentSeconds, db = getDb()) {
    const existing = db.prepare('SELECT * FROM candidate_preparation_profiles WHERE user_id = ? AND exam_id = ?').get(userId, examId);

    const attempted = (existing ? existing.total_attempted : 0) + 1;
    const correct = (existing ? existing.total_correct : 0) + (isCorrect ? 1 : 0);
    const incorrect = (existing ? existing.total_incorrect : 0) + (!isCorrect && !isSkipped ? 1 : 0);
    const skipped = (existing ? existing.total_skipped : 0) + (isSkipped ? 1 : 0);
    const timeSpent = (existing ? existing.total_time_seconds : 0) + (timeSpentSeconds || 0);
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 1000) / 10 : 0.0;

    // Weak & strong concepts
    const weakTopics = db.prepare(`
      SELECT topic_id, weakness_severity, accuracy_pct
      FROM user_weak_topics
      WHERE user_id = ? AND exam_id = ? AND weakness_severity IN ('CRITICAL', 'MODERATE', 'WEAK')
    `).all(userId, examId);

    const strongTopics = db.prepare(`
      SELECT topic_id, accuracy_pct
      FROM user_weak_topics
      WHERE user_id = ? AND exam_id = ? AND weakness_severity IN ('STRONG', 'RECOVERED')
    `).all(userId, examId);

    // Spaced revision due count
    const dueCount = db.prepare(`
      SELECT COUNT(*) as cnt FROM user_spaced_revisions
      WHERE user_id = ? AND exam_id = ? AND (next_review_due <= CURRENT_TIMESTAMP OR revision_status = 'DUE')
    `).get(userId, examId)?.cnt || 0;

    // Study streak: calculate streak
    let streak = existing ? (existing.study_streak_days || 1) : 1;

    // Preparation progress percentage: weighted calculation based on attempted syllabus and accuracy
    const prepPct = Math.min(100.0, Math.round(((attempted / 100) * 0.5 + (accuracy * 0.5)) * 10) / 10);

    const profileId = existing ? existing.profile_id : `prof-${userId}-${examId}`;

    db.prepare(`
      INSERT OR REPLACE INTO candidate_preparation_profiles (
        profile_id, user_id, exam_id, study_streak_days, total_attempted,
        total_correct, total_incorrect, total_skipped, total_time_seconds,
        accuracy_rate, overall_preparation_pct, weak_concepts_json,
        strong_concepts_json, revision_due_items_count, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      profileId, userId, examId, streak, attempted,
      correct, incorrect, skipped, timeSpent,
      accuracy, prepPct, JSON.stringify(weakTopics.map(w => w.topic_id)),
      JSON.stringify(strongTopics.map(s => s.topic_id)), dueCount
    );
  }

  /**
   * Get full hierarchical Subject -> Chapter -> Topic weakness breakdown for candidate
   */
  getHierarchicalAnalysis(userId, examId, db = getDb()) {
    const attempts = db.prepare(`
      SELECT subject_id, chapter_id, topic_id, is_correct, is_skipped, time_spent_seconds, confidence_level, attempted_at
      FROM candidate_question_attempts
      WHERE user_id = ? AND exam_id = ?
      ORDER BY attempted_at DESC
    `).all(userId, examId);

    const subjectMap = {};

    attempts.forEach(att => {
      const subId = att.subject_id || 'general';
      const chapId = att.chapter_id || 'ch-general';
      const topId = att.topic_id || 'topic-general';

      if (!subjectMap[subId]) {
        subjectMap[subId] = {
          subject_id: subId,
          total_attempts: 0,
          correct: 0,
          incorrect: 0,
          skipped: 0,
          total_time: 0,
          chapters: {}
        };
      }
      subjectMap[subId].total_attempts++;
      if (att.is_correct) subjectMap[subId].correct++;
      else if (att.is_skipped) subjectMap[subId].skipped++;
      else subjectMap[subId].incorrect++;
      subjectMap[subId].total_time += (att.time_spent_seconds || 0);

      const subObj = subjectMap[subId];
      if (!subObj.chapters[chapId]) {
        subObj.chapters[chapId] = {
          chapter_id: chapId,
          total_attempts: 0,
          correct: 0,
          incorrect: 0,
          skipped: 0,
          total_time: 0,
          topics: {}
        };
      }
      subObj.chapters[chapId].total_attempts++;
      if (att.is_correct) subObj.chapters[chapId].correct++;
      else if (att.is_skipped) subObj.chapters[chapId].skipped++;
      else subObj.chapters[chapId].incorrect++;
      subObj.chapters[chapId].total_time += (att.time_spent_seconds || 0);

      const chapObj = subObj.chapters[chapId];
      if (!chapObj.topics[topId]) {
        chapObj.topics[topId] = {
          topic_id: topId,
          total_attempts: 0,
          correct: 0,
          incorrect: 0,
          skipped: 0,
          total_time: 0,
          recent_attempts: []
        };
      }
      chapObj.topics[topId].total_attempts++;
      if (att.is_correct) chapObj.topics[topId].correct++;
      else if (att.is_skipped) chapObj.topics[topId].skipped++;
      else chapObj.topics[topId].incorrect++;
      chapObj.topics[topId].total_time += (att.time_spent_seconds || 0);
      if (chapObj.topics[topId].recent_attempts.length < 5) {
        chapObj.topics[topId].recent_attempts.push(att.is_correct);
      }
    });

    // Transform map to clean structured array with weakness & recovery statuses
    const structuredSubjects = Object.values(subjectMap).map(sub => {
      const subAccuracy = sub.total_attempts > 0 ? Math.round((sub.correct / sub.total_attempts) * 1000) / 10 : 0.0;
      const chaptersList = Object.values(sub.chapters).map(chap => {
        const chapAccuracy = chap.total_attempts > 0 ? Math.round((chap.correct / chap.total_attempts) * 1000) / 10 : 0.0;
        const topicsList = Object.values(chap.topics).map(top => {
          const topAccuracy = top.total_attempts > 0 ? Math.round((top.correct / top.total_attempts) * 1000) / 10 : 0.0;
          const recentAcc = top.recent_attempts.length > 0 
            ? Math.round((top.recent_attempts.filter(c => c === 1).length / top.recent_attempts.length) * 1000) / 10
            : topAccuracy;

          let status = 'NEUTRAL';
          let severity = 'LOW';
          if (top.total_attempts >= 3) {
            if (topAccuracy < 45.0) { status = 'CRITICAL_WEAKNESS'; severity = 'CRITICAL'; }
            else if (topAccuracy < 65.0) { status = 'MODERATE_WEAKNESS'; severity = 'MODERATE'; }
            else if (topAccuracy >= 80.0) { status = 'STRONG'; severity = 'STRONG'; }
            if (status.includes('WEAK') && recentAcc >= 75.0) {
              status = 'RECOVERING';
              severity = 'RECOVERING';
            }
          }

          return {
            topic_id: top.topic_id,
            attempts: top.total_attempts,
            correct: top.correct,
            incorrect: top.incorrect,
            skipped: top.skipped,
            accuracy_pct: topAccuracy,
            recent_accuracy_pct: recentAcc,
            avg_time_seconds: top.total_attempts > 0 ? Math.round(top.total_time / top.total_attempts) : 0,
            status,
            severity,
            recovery_signal: recentAcc > topAccuracy ? 'IMPROVING' : (recentAcc < topAccuracy ? 'DECLINING' : 'STABLE')
          };
        });

        return {
          chapter_id: chap.chapter_id,
          attempts: chap.total_attempts,
          accuracy_pct: chapAccuracy,
          topics: topicsList
        };
      });

      return {
        subject_id: sub.subject_id,
        attempts: sub.total_attempts,
        accuracy_pct: subAccuracy,
        chapters: chaptersList
      };
    });

    return {
      userId,
      examId,
      total_attempts: attempts.length,
      subjects: structuredSubjects
    };
  }

  /**
   * Get list of currently active weak topics for targeted practice
   */
  getActiveWeakTopics(userId, examId, db = getDb()) {
    return db.prepare(`
      SELECT weak_id, topic_id, subject_id, accuracy_pct, mistake_count, avg_time_seconds, weakness_severity, recommended_action
      FROM user_weak_topics
      WHERE user_id = ? AND exam_id = ? AND weakness_severity IN ('CRITICAL', 'MODERATE', 'WEAK', 'RECOVERING')
      ORDER BY 
        CASE weakness_severity 
          WHEN 'CRITICAL' THEN 1 
          WHEN 'MODERATE' THEN 2 
          WHEN 'WEAK' THEN 3 
          WHEN 'RECOVERING' THEN 4 
          ELSE 5 
        END,
        accuracy_pct ASC
    `).all(userId, examId);
  }
}

module.exports = new WeaknessDetectionService();

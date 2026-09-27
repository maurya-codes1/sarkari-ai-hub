// backend/services/spaced-revision-service.js
// Phase 12: Spaced Repetition Scheduling Engine (Leitner 5-Box Interval System)
// Implements scientifically grounded spaced retrieval intervals: 1d, 3d, 7d, 14d, 30d.

const { getDb } = require('../db/database');

class SpacedRevisionService {
  constructor() {
    // Intervals in milliseconds
    this.BOX_INTERVALS = {
      1: 1 * 24 * 60 * 60 * 1000,   // 1 day
      2: 3 * 24 * 60 * 60 * 1000,   // 3 days
      3: 7 * 24 * 60 * 60 * 1000,   // 7 days
      4: 14 * 24 * 60 * 60 * 1000,  // 14 days
      5: 30 * 24 * 60 * 60 * 1000   // 30 days
    };

    this.STATUSES = {
      ACTIVE: 'ACTIVE',
      DUE: 'DUE',
      MASTERED: 'MASTERED'
    };
  }

  /**
   * Records a user answer attempt on a question and recalibrates repetition level and due date.
   *
   * @param {object} params
   * @param {string} params.userId
   * @param {string} params.questionId
   * @param {string} [params.examId]
   * @param {string} [params.subjectId]
   * @param {string} [params.topicId]
   * @param {boolean} params.isCorrect
   * @param {object} [db]
   * @returns {object} updated revision card
   */
  recordAttempt(params, db = getDb()) {
    if (!db) throw new Error('Database connection required');
    const { userId, questionId, examId = 'general', subjectId = null, topicId = null, isCorrect } = params;

    if (!userId || !questionId) {
      throw new Error('userId and questionId are required to record spaced revision attempt');
    }

    const now = new Date();
    const existing = db.prepare(`
      SELECT * FROM user_spaced_revisions 
      WHERE user_id = ? AND question_id = ?
    `).get(userId, questionId);

    let repetitionLevel = 1;
    let consecutiveCorrect = 0;
    let mistakeCount = 0;
    let revisionStatus = this.STATUSES.ACTIVE;

    if (existing) {
      mistakeCount = existing.mistake_count;
      if (isCorrect) {
        consecutiveCorrect = existing.consecutive_correct + 1;
        repetitionLevel = Math.min(5, existing.repetition_level + 1);
        if (repetitionLevel === 5 && consecutiveCorrect >= 3) {
          revisionStatus = this.STATUSES.MASTERED;
        } else {
          revisionStatus = this.STATUSES.ACTIVE;
        }
      } else {
        consecutiveCorrect = 0;
        repetitionLevel = 1; // Immediate reset to Level 1 on mistake
        mistakeCount += 1;
        revisionStatus = this.STATUSES.DUE;
      }

      const nextIntervalMs = this.BOX_INTERVALS[repetitionLevel];
      const nextReviewDue = new Date(now.getTime() + nextIntervalMs).toISOString();

      db.prepare(`
        UPDATE user_spaced_revisions
        SET repetition_level = ?,
            last_attempt_at = CURRENT_TIMESTAMP,
            next_review_due = ?,
            mistake_count = ?,
            consecutive_correct = ?,
            revision_status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE revision_id = ?
      `).run(
        repetitionLevel,
        nextReviewDue,
        mistakeCount,
        consecutiveCorrect,
        revisionStatus,
        existing.revision_id
      );

      return {
        revisionId: existing.revision_id,
        userId,
        questionId,
        examId: existing.exam_id,
        repetitionLevel,
        nextReviewDue,
        mistakeCount,
        consecutiveCorrect,
        revisionStatus
      };
    } else {
      // First attempt for this question
      if (isCorrect) {
        repetitionLevel = 2;
        consecutiveCorrect = 1;
        mistakeCount = 0;
      } else {
        repetitionLevel = 1;
        consecutiveCorrect = 0;
        mistakeCount = 1;
        revisionStatus = this.STATUSES.DUE;
      }

      const nextIntervalMs = this.BOX_INTERVALS[repetitionLevel];
      const nextReviewDue = new Date(now.getTime() + nextIntervalMs).toISOString();
      const revisionId = `rev-${userId}-${questionId}-${Date.now()}`;

      // Resolve subjectId and topicId from questions table if not provided
      let resolvedSubjectId = subjectId;
      let resolvedTopicId = topicId;
      if (!resolvedSubjectId || !resolvedTopicId) {
        const qRow = db.prepare('SELECT subject_id, topic_id FROM questions WHERE question_id = ?').get(questionId);
        if (qRow) {
          resolvedSubjectId = resolvedSubjectId || qRow.subject_id;
          resolvedTopicId = resolvedTopicId || qRow.topic_id;
        }
      }

      db.prepare(`
        INSERT INTO user_spaced_revisions (
          revision_id, user_id, question_id, exam_id, subject_id,
          topic_id, repetition_level, last_attempt_at, next_review_due,
          mistake_count, consecutive_correct, revision_status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).run(
        revisionId,
        userId,
        questionId,
        examId,
        resolvedSubjectId,
        resolvedTopicId,
        repetitionLevel,
        nextReviewDue,
        mistakeCount,
        consecutiveCorrect,
        revisionStatus
      );

      return {
        revisionId,
        userId,
        questionId,
        examId,
        subjectId: resolvedSubjectId,
        topicId: resolvedTopicId,
        repetitionLevel,
        nextReviewDue,
        mistakeCount,
        consecutiveCorrect,
        revisionStatus
      };
    }
  }

  /**
   * Retrieves due flashcards/questions for a user.
   *
   * @param {string} userId
   * @param {string} [examId]
   * @param {number} [limit]
   * @param {object} [db]
   * @returns {Array<object>} list of due questions with full question data
   */
  getDueCards(userId, examId = null, limit = 20, db = getDb()) {
    if (!db) return [];

    let query = `
      SELECT r.*, q.provenance, q.question_tier, sub.name as subject_name,
             qv.language_content, qv.correct_answer
      FROM user_spaced_revisions r
      JOIN questions q ON r.question_id = q.question_id
      LEFT JOIN question_versions qv ON q.question_id = qv.question_id AND qv.version_number = 1
      LEFT JOIN subjects sub ON r.subject_id = sub.subject_id
      WHERE r.user_id = ? AND r.next_review_due <= CURRENT_TIMESTAMP
    `;
    const params = [userId];

    if (examId) {
      query += ' AND r.exam_id = ?';
      params.push(examId);
    }

    query += ' ORDER BY r.repetition_level ASC, r.next_review_due ASC LIMIT ?';
    params.push(limit);

    const rows = db.prepare(query).all(...params);

    return rows.map(r => {
      let langContent = {};
      try {
        langContent = JSON.parse(r.language_content || '{}');
      } catch (e) {}

      let parsedAns = {};
      try {
        parsedAns = JSON.parse(r.correct_answer || '{}');
      } catch (e) {}

      const en = langContent.en || {};
      const hi = langContent.hi || {};

      return {
        revisionId: r.revision_id,
        questionId: r.question_id,
        examId: r.exam_id,
        subjectName: r.subject_name || 'General',
        repetitionLevel: r.repetition_level,
        consecutiveCorrect: r.consecutive_correct,
        mistakeCount: r.mistake_count,
        nextReviewDue: r.next_review_due,
        revisionStatus: r.revision_status,
        questionText: en.q || hi.q || 'Question content',
        options: en.options || hi.options || [],
        correctAnswer: parsedAns.value || parsedAns.key || en.ans || hi.ans || null,
        explanation: en.exp || hi.exp || null,
        provenance: r.provenance,
        questionTier: r.question_tier
      };
    });
  }

  /**
   * Calculates retention metrics and box distribution for user.
   */
  getUserRetentionMetrics(userId, examId = null, db = getDb()) {
    if (!db) return null;

    let filterSql = 'WHERE user_id = ?';
    const params = [userId];
    if (examId) {
      filterSql += ' AND exam_id = ?';
      params.push(examId);
    }

    const levelCounts = db.prepare(`
      SELECT repetition_level, COUNT(*) as cnt
      FROM user_spaced_revisions
      ${filterSql}
      GROUP BY repetition_level
    `).all(...params);

    const levelDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalCards = 0;
    levelCounts.forEach(b => {
      levelDistribution[b.repetition_level] = b.cnt;
      totalCards += b.cnt;
    });

    const dueCountRow = db.prepare(`
      SELECT COUNT(*) as cnt
      FROM user_spaced_revisions
      ${filterSql} AND next_review_due <= CURRENT_TIMESTAMP
    `).get(...params);

    const masteredRow = db.prepare(`
      SELECT COUNT(*) as cnt
      FROM user_spaced_revisions
      ${filterSql} AND revision_status = 'MASTERED'
    `).get(...params);

    return {
      userId,
      examId,
      totalCards,
      dueCards: dueCountRow ? dueCountRow.cnt : 0,
      masteredCards: masteredRow ? masteredRow.cnt : 0,
      levelDistribution,
      masteryRate: totalCards > 0 && masteredRow ? Math.round((masteredRow.cnt / totalCards) * 100) : 0
    };
  }
}

module.exports = new SpacedRevisionService();

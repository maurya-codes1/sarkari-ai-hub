// backend/db/repositories/mock-session-repository.js
// Modular repository for Mock Test Sessions and Scorecard Persistence.

const { getDb, checkDbAvailable } = require('../database');

class MockSessionRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDb();
  }

  isAvailable() {
    return checkDbAvailable();
  }

  createSession(session) {
    if (!this.isAvailable()) return null;

    const stmt = this.db.prepare(`
      INSERT INTO mock_sessions (
        session_id, exam_id, exam_version_id, blueprint_id, test_mode,
        language_config, duration_minutes, total_questions, questions_to_attempt,
        marking_rules, sections_json, question_ids_json, user_answers_json,
        review_flags_json, snapshot_id, status, started_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'IN_PROGRESS', CURRENT_TIMESTAMP)
    `);

    stmt.run(
      session.sessionId,
      session.examId,
      session.examVersionId || null,
      session.blueprintId || null,
      session.testMode || 'FULL_EXAM',
      JSON.stringify(session.languageConfig || { primary: 'hi', secondary: 'en' }),
      session.durationMinutes,
      session.totalQuestions,
      session.questionsToAttempt,
      JSON.stringify(session.markingRules || {}),
      JSON.stringify(session.sections || []),
      JSON.stringify(session.questionIds || []),
      JSON.stringify(session.userAnswers || {}),
      JSON.stringify(session.reviewFlags || []),
      session.snapshotId || session.snapshot_id || null
    );

    return this.getSessionById(session.sessionId);
  }

  getSessionById(sessionId) {
    if (!this.isAvailable()) return null;
    const row = this.db.prepare('SELECT * FROM mock_sessions WHERE session_id = ?').get(sessionId);
    if (!row) return null;

    try {
      row.language_config = JSON.parse(row.language_config || '{}');
      row.marking_rules = JSON.parse(row.marking_rules || '{}');
      row.sections_json = JSON.parse(row.sections_json || '[]');
      row.question_ids_json = JSON.parse(row.question_ids_json || '[]');
      row.user_answers_json = JSON.parse(row.user_answers_json || '{}');
      row.review_flags_json = JSON.parse(row.review_flags_json || '[]');
      row.score_details = row.score_details ? JSON.parse(row.score_details) : null;
    } catch (e) {
      console.warn('[MockSessionRepo] JSON parse error on session row', e.message);
    }
    return row;
  }

  updateSessionProgress(sessionId, userAnswers, reviewFlags, timeSpentSeconds = 0) {
    if (!this.isAvailable()) return false;
    const stmt = this.db.prepare(`
      UPDATE mock_sessions 
      SET user_answers_json = ?, review_flags_json = ?, time_spent_seconds = ?
      WHERE session_id = ? AND status = 'IN_PROGRESS'
    `);
    const res = stmt.run(
      JSON.stringify(userAnswers || {}),
      JSON.stringify(reviewFlags || []),
      timeSpentSeconds,
      sessionId
    );
    return res.changes > 0;
  }

  completeSession(sessionId, scoreDetails, status = 'SUBMITTED', timeSpentSeconds = 0) {
    if (!this.isAvailable()) return false;
    const stmt = this.db.prepare(`
      UPDATE mock_sessions
      SET status = ?, score_details = ?, submitted_at = CURRENT_TIMESTAMP, time_spent_seconds = ?
      WHERE session_id = ?
    `);
    const res = stmt.run(
      status,
      JSON.stringify(scoreDetails),
      timeSpentSeconds,
      sessionId
    );
    return res.changes > 0;
  }
}

module.exports = new MockSessionRepository();

// backend/db/repositories/question-repository.js
// Modular repository for Questions, Versions, and Subjects.

const { getDb, checkDbAvailable } = require('../database');

class QuestionRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDb();
  }

  isAvailable() {
    return checkDbAvailable();
  }

  getQuestionsBySubject(subjectId, limit = 50, offset = 0) {
    if (!this.isAvailable()) return null;
    const stmt = this.db.prepare(`
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE q.subject_id = ?
      ORDER BY q.question_id ASC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(subjectId, limit, offset);
  }

  getRandomQuestions(subjectId = null, limit = 30) {
    if (!this.isAvailable()) return null;
    let query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
    `;
    const params = [];
    if (subjectId && subjectId !== 'all') {
      query += ` WHERE q.subject_id = ?`;
      params.push(subjectId);
    }
    query += ` ORDER BY RANDOM() LIMIT ?`;
    params.push(limit);

    return this.db.prepare(query).all(...params);
  }

  getQuestionsForSection(subjectId, count = 25, excludeIds = [], questionTypes = null) {
    if (!this.isAvailable()) return [];

    let query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE 1=1
    `;
    const params = [];

    if (subjectId && subjectId !== 'all') {
      query += ` AND q.subject_id = ?`;
      params.push(subjectId);
    }

    if (Array.isArray(excludeIds) && excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => '?').join(',');
      query += ` AND q.question_id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }

    if (Array.isArray(questionTypes) && questionTypes.length > 0) {
      const placeholders = questionTypes.map(() => '?').join(',');
      query += ` AND q.question_type_id IN (${placeholders})`;
      params.push(...questionTypes);
    }

    query += ` ORDER BY RANDOM() LIMIT ?`;
    params.push(count);

    return this.db.prepare(query).all(...params);
  }

  getPracticeQuestions({ subjectId = null, subjectIds = null, difficulty = null, count = 30, excludeIds = [] }) {
    if (!this.isAvailable()) return [];

    let query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE 1=1
    `;
    const params = [];

    if (Array.isArray(subjectIds) && subjectIds.length > 0) {
      const placeholders = subjectIds.map(() => '?').join(',');
      query += ` AND q.subject_id IN (${placeholders})`;
      params.push(...subjectIds);
    } else if (subjectId && subjectId !== 'all') {
      query += ` AND q.subject_id = ?`;
      params.push(subjectId);
    }

    if (difficulty && difficulty !== 'MIXED') {
      query += ` AND UPPER(q.difficulty) = ?`;
      params.push(difficulty.toUpperCase());
    }

    if (Array.isArray(excludeIds) && excludeIds.length > 0) {
      const placeholders = excludeIds.map(() => '?').join(',');
      query += ` AND q.question_id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }

    query += ` ORDER BY RANDOM() LIMIT ?`;
    params.push(count);

    let rows = this.db.prepare(query).all(...params);

    // If specific difficulty filter yielded no questions, fallback to available difficulty for subject
    if (rows.length === 0 && difficulty && difficulty !== 'MIXED') {
      return this.getPracticeQuestions({ subjectId, subjectIds, difficulty: 'MIXED', count, excludeIds });
    }

    return rows;
  }

  getQuestionsByIds(questionIds = []) {
    if (!this.isAvailable() || !Array.isArray(questionIds) || questionIds.length === 0) return [];
    const placeholders = questionIds.map(() => '?').join(',');
    const query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE q.question_id IN (${placeholders})
    `;
    return this.db.prepare(query).all(...questionIds);
  }

  getQuestionsByProvenance(provenance = 'AI_PRACTICE', limit = 20) {
    if (!this.isAvailable()) return [];
    const query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE q.provenance = ? OR q.source_type = ?
      ORDER BY RANDOM() LIMIT ?
    `;
    return this.db.prepare(query).all(provenance, provenance, limit);
  }

  getAllSubjects() {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM subjects WHERE active = 1 ORDER BY name ASC').all();
  }

  getTotalCount() {
    if (!this.isAvailable()) return 0;
    return this.db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  }
}

module.exports = new QuestionRepository();

// backend/db/repositories/exam-repository.js
// Modular repository for Exams, Boards, and Organizations.

const { getDb, checkDbAvailable } = require('../database');

class ExamRepository {
  constructor(db = null) {
    this._db = db;
  }

  get db() {
    return this._db || getDb();
  }

  isAvailable() {
    return checkDbAvailable();
  }

  getAllExams() {
    if (!this.isAvailable()) return null;
    const stmt = this.db.prepare(`
      SELECT e.*, o.name as conducting_body_name, o.state_or_ut, b.board_type
      FROM exams e
      LEFT JOIN organizations o ON e.organization_id = o.organization_id
      LEFT JOIN boards b ON e.board_id = b.board_id
      WHERE e.active = 1
      ORDER BY e.name ASC
    `);
    return stmt.all();
  }

  getExamById(examId) {
    if (!this.isAvailable()) return null;
    const stmt = this.db.prepare(`
      SELECT e.*, o.name as conducting_body_name, o.state_or_ut, b.board_type
      FROM exams e
      LEFT JOIN organizations o ON e.organization_id = o.organization_id
      LEFT JOIN boards b ON e.board_id = b.board_id
      WHERE e.exam_id = ?
    `);
    return stmt.get(examId) || null;
  }

  getBoards() {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM boards WHERE active = 1 ORDER BY name ASC').all();
  }

  getOrganizations() {
    if (!this.isAvailable()) return null;
    return this.db.prepare('SELECT * FROM organizations WHERE active = 1 ORDER BY name ASC').all();
  }
}

module.exports = new ExamRepository();

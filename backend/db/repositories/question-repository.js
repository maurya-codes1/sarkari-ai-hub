// backend/db/repositories/question-repository.js
// Modular repository for Questions, Versions, and Subjects.

const { getDb, checkDbAvailable } = require('../database');
const { normalizeSubjectId } = require('../../utils/subject-utils');

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
    const normSub = normalizeSubjectId(subjectId);
    const stmt = this.db.prepare(`
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE q.subject_id = ?
      ORDER BY q.question_id ASC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(normSub, limit, offset);
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
      params.push(normalizeSubjectId(subjectId));
    }
    query += ` ORDER BY RANDOM() LIMIT ?`;
    params.push(limit);

    return this.db.prepare(query).all(...params);
  }

  getQuestionsForSection(subjectId, count = 25, excludeIds = [], questionTypes = null, onlyFullExamEligible = false) {
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
      params.push(normalizeSubjectId(subjectId));
    }

    if (onlyFullExamEligible) {
      query += ` AND q.full_exam_eligible = 1`;
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

  getPracticeQuestions({ subjectId = null, subjectIds = null, boardId = null, stage = null, difficulty = null, count = 30, excludeIds = [], examId = null }) {
    if (!this.isAvailable()) return [];

    const BOARD_MAP = {
      'cbse': 'cbse-board', 'icse': 'icse-cisce', 'upmsp': 'upmsp-board',
      'bseb': 'bseb-bihar', 'maharashtra': 'maharashtra-board', 'rbse': 'rbse-rajasthan',
      'mpbse': 'mpbse-board', 'wb': 'wbbse-wb', 'tn': 'tndge-tamilnadu',
      'karnataka': 'kseab-karnataka', 'gujarat': 'gseb-gujarat', 'haryana': 'bseh-haryana',
      'jac': 'jac-jharkhand', 'pseb': 'pseb-punjab', 'nios': 'nios-board',
      'cgbse': 'cgbse-chhattisgarh', 'bseodisha': 'chse-bse-odisha', 'ubse': 'ubse-uttarakhand',
      'seba': 'seba-ahsec-assam', 'bsetelangana': 'tsbie-bieap', 'hpbose': 'hpbose-board',
      'jkbose': 'jkbose-board', 'kerala': 'kerala-board', 'gbshse': 'gbshse-board',
      'bsem': 'bsem-board', 'mbose': 'mbose-board', 'mbse': 'mbse-board',
      'nbse': 'nbse-board', 'tbse': 'tbse-board', 'bseap': 'bseap-board', 'bsetg': 'bsetg-board'
    };

    const resolvedBoard = boardId ? (BOARD_MAP[boardId] || boardId) : null;
    const isTargetingBoard = Boolean(resolvedBoard || (examId && (String(examId).includes('board') || String(examId).includes('class'))));

    let resolvedStage = stage;
    if (!resolvedStage && examId && isTargetingBoard) {
      const e = String(examId).toLowerCase();
      if (e.includes('12')) resolvedStage = 'Class 12';
      else if (e.includes('10')) resolvedStage = 'Class 10';
      else if (e.includes('11')) resolvedStage = 'Class 11';
      else if (e.includes('9')) resolvedStage = 'Class 9';
    }
    if (resolvedStage) {
      const s = String(resolvedStage).toLowerCase();
      if (s.includes('12')) resolvedStage = 'Class 12';
      else if (s.includes('10')) resolvedStage = 'Class 10';
      else if (s.includes('11')) resolvedStage = 'Class 11';
      else if (s.includes('9')) resolvedStage = 'Class 9';
    }

    let query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE 1=1
        AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
        AND q.question_type_id NOT IN ('short_answer', 'long_answer', 'case_study', 'subjective')
    `;
    const params = [];

    if (resolvedBoard) {
      query += ` AND q.board_id = ?`;
      params.push(resolvedBoard);
    } else if (isTargetingBoard) {
      // General board context (e.g. examId = 'board-12th-science')
      query += ` AND (q.board_id IS NOT NULL AND q.board_id != '')`;
    } else {
      // Competitive exam context (SSC, RRB, UPSC, State Police, etc.):
      // STRICT ISOLATION: School board questions must NEVER appear in competitive exams!
      query += ` AND (q.board_id IS NULL OR q.board_id = '')`;
      query += ` AND (q.stage IS NULL OR q.stage = '' OR q.stage NOT LIKE 'Class%')`;
    }

    if (resolvedStage) {
      query += ` AND q.stage = ?`;
      params.push(resolvedStage);
    }

    if (Array.isArray(subjectIds) && subjectIds.length > 0) {
      const normIds = subjectIds.map(s => normalizeSubjectId(s)).filter(Boolean);
      const placeholders = normIds.map(() => '?').join(',');
      query += ` AND q.subject_id IN (${placeholders})`;
      params.push(...normIds);
    } else if (subjectId && subjectId !== 'all') {
      const normSub = normalizeSubjectId(subjectId);
      if (resolvedStage === 'Class 12' && normSub === 'subj-math') {
        query += ` AND q.subject_id IN ('subj-math', 'subj-math12')`;
      } else {
        query += ` AND q.subject_id = ?`;
        params.push(normSub);
      }
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

    if (examId && !resolvedBoard) {
      query += ` ORDER BY (CASE WHEN q.paper_id LIKE ? OR q.question_id LIKE ? THEN 0 ELSE 1 END), RANDOM() LIMIT ?`;
      params.push(`%${examId}%`, `%${examId}%`, count);
    } else {
      query += ` ORDER BY RANDOM() LIMIT ?`;
      params.push(count);
    }

    let rows = this.db.prepare(query).all(...params);

    // If specific difficulty filter yielded no questions, fallback to available difficulty
    if (rows.length === 0 && difficulty && difficulty !== 'MIXED') {
      return this.getPracticeQuestions({ subjectId, subjectIds, boardId, stage: resolvedStage, difficulty: 'MIXED', count, excludeIds, examId });
    }

    // If board filter yielded no rows for this specific subject, fall back to general subject questions while PRESERVING stage
    if (rows.length === 0 && resolvedBoard) {
      const stageRows = this.getPracticeQuestions({ subjectId, subjectIds, boardId: resolvedBoard, stage: null, difficulty, count, excludeIds, examId });
      if (stageRows && stageRows.length > 0) return stageRows;
    }

    // If stage filter or examId yielded no rows for this specific subject (e.g. GK requested under a board exam), fall back to general subject pool
    if (rows.length === 0 && isTargetingBoard) {
      const genRows = this.getPracticeQuestions({ subjectId, subjectIds, boardId: null, stage: null, difficulty, count, excludeIds, examId: null });
      if (genRows && genRows.length > 0) return genRows;
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

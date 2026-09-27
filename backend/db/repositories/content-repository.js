// backend/db/repositories/content-repository.js
// Content Intelligence Data Access Repository
// Provides unified querying for questions, versions, historical corpus, and generation jobs.

const { getDb } = require('../database');

class ContentRepository {
  /**
   * Retrieves questions with pagination and metadata filters.
   *
   * @param {object} filters - { subjectId, chapterId, questionTypeId, difficulty, provenance, isVerified, limit, offset }
   * @param {object} [db]
   * @returns {object} { total: number, questions: Array<object> }
   */
  getQuestions(filters = {}, db = getDb()) {
    if (!db) return { total: 0, questions: [] };

    let countQuery = `SELECT COUNT(*) as total FROM questions q WHERE 1=1`;
    let query = `
      SELECT 
        q.question_id, q.exam_version_id, q.subject_id, q.chapter_id, q.topic_id,
        q.question_type_id, q.difficulty, q.marks, q.source_type, q.official_year,
        q.is_verified, q.current_version, q.fingerprint, q.provenance,
        q.difficulty_type, q.relevance_priority, q.is_published, q.created_at,
        s.name as subject_name,
        qv.language_content, qv.correct_answer
      FROM questions q
      LEFT JOIN subjects s ON q.subject_id = s.subject_id
      LEFT JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
      WHERE 1=1
    `;
    const params = [];

    if (filters.subjectId) {
      countQuery += ` AND q.subject_id = ?`;
      query += ` AND q.subject_id = ?`;
      params.push(filters.subjectId);
    }
    if (filters.chapterId) {
      countQuery += ` AND q.chapter_id = ?`;
      query += ` AND q.chapter_id = ?`;
      params.push(filters.chapterId);
    }
    if (filters.difficulty) {
      countQuery += ` AND q.difficulty = ?`;
      query += ` AND q.difficulty = ?`;
      params.push(filters.difficulty.toUpperCase());
    }
    if (filters.provenance) {
      countQuery += ` AND q.provenance = ?`;
      query += ` AND q.provenance = ?`;
      params.push(filters.provenance);
    }
    if (filters.questionTier || filters.tier) {
      const tierVal = filters.questionTier || filters.tier;
      countQuery += ` AND q.question_tier = ?`;
      query += ` AND q.question_tier = ?`;
      params.push(tierVal);
    }
    if (filters.category || filters.filterType) {
      const cat = (filters.category || filters.filterType).toUpperCase();
      if (cat === 'PYQ') {
        countQuery += ` AND q.provenance = 'OFFICIAL_PYQ'`;
        query += ` AND q.provenance = 'OFFICIAL_PYQ'`;
      } else if (cat === 'OFFICIAL') {
        countQuery += ` AND (q.provenance IN ('OFFICIAL_PYQ', 'OFFICIAL_SAMPLE') OR q.source_type IN ('OFFICIAL_PYQ', 'OFFICIAL_DOCUMENT'))`;
        query += ` AND (q.provenance IN ('OFFICIAL_PYQ', 'OFFICIAL_SAMPLE') OR q.source_type IN ('OFFICIAL_PYQ', 'OFFICIAL_DOCUMENT'))`;
      } else if (cat === 'PRACTICE') {
        countQuery += ` AND q.practice_eligible = 1`;
        query += ` AND q.practice_eligible = 1`;
      } else if (cat === 'AI_PRACTICE') {
        countQuery += ` AND q.provenance = 'AI_PRACTICE'`;
        query += ` AND q.provenance = 'AI_PRACTICE'`;
      } else if (cat === 'HISTORICAL') {
        countQuery += ` AND q.historical_year IS NOT NULL`;
        query += ` AND q.historical_year IS NOT NULL`;
      }
    }
    if (filters.fullExamEligible !== undefined) {
      const elVal = filters.fullExamEligible ? 1 : 0;
      countQuery += ` AND q.full_exam_eligible = ?`;
      query += ` AND q.full_exam_eligible = ?`;
      params.push(elVal);
    }
    if (filters.questionTypeId) {
      countQuery += ` AND q.question_type_id = ?`;
      query += ` AND q.question_type_id = ?`;
      params.push(filters.questionTypeId);
    }
    if (filters.relevancePriority) {
      countQuery += ` AND q.relevance_priority = ?`;
      query += ` AND q.relevance_priority = ?`;
      params.push(filters.relevancePriority);
    }

    const countRow = db.prepare(countQuery).get(...params);
    const total = countRow ? countRow.total : 0;

    const limit = Math.min(parseInt(filters.limit, 10) || 50, 100);
    const offset = parseInt(filters.offset, 10) || 0;
    query += ` ORDER BY q.created_at DESC LIMIT ? OFFSET ?`;
    const fullParams = [...params, limit, offset];

    const rows = db.prepare(query).all(...fullParams);
    const questions = rows.map(r => {
      let parsedLang = {};
      let parsedAns = null;
      try {
        parsedLang = typeof r.language_content === 'string' ? JSON.parse(r.language_content) : (r.language_content || {});
      } catch (e) {}
      try {
        parsedAns = typeof r.correct_answer === 'string' ? JSON.parse(r.correct_answer) : r.correct_answer;
      } catch (e) {}

      return {
        questionId: r.question_id,
        examVersionId: r.exam_version_id,
        subjectId: r.subject_id,
        subjectName: r.subject_name,
        chapterId: r.chapter_id,
        topicId: r.topic_id,
        questionTypeId: r.question_type_id,
        difficulty: r.difficulty,
        difficultyType: r.difficulty_type,
        marks: r.marks,
        provenance: r.provenance || r.source_type,
        relevancePriority: r.relevance_priority,
        officialYear: r.official_year,
        isVerified: Boolean(r.is_verified),
        currentVersion: r.current_version,
        fingerprint: r.fingerprint,
        content: parsedLang,
        correctAnswer: parsedAns,
        trustStatus: r.trust_status,
        fullExamEligible: Boolean(r.full_exam_eligible),
        practiceEligible: Boolean(r.practice_eligible),
        validationNotes: r.validation_notes,
        passageGroupId: r.passage_group_id,
        createdAt: r.created_at
      };
    });

    return { total, limit, offset, questions };
  }

  /**
   * Retrieves single question by ID with current version details.
   */
  getQuestionById(questionId, db = getDb()) {
    if (!db) return null;

    const r = db.prepare(`
      SELECT 
        q.*, s.name as subject_name,
        qv.language_content, qv.correct_answer, qv.correction_reason, qv.created_at as version_created_at
      FROM questions q
      LEFT JOIN subjects s ON q.subject_id = s.subject_id
      LEFT JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
      WHERE q.question_id = ?
    `).get(questionId);

    if (!r) return null;

    let parsedLang = {};
    let parsedAns = null;
    try {
      parsedLang = typeof r.language_content === 'string' ? JSON.parse(r.language_content) : (r.language_content || {});
    } catch (e) {}
    try {
      parsedAns = typeof r.correct_answer === 'string' ? JSON.parse(r.correct_answer) : r.correct_answer;
    } catch (e) {}

    return {
      questionId: r.question_id,
      examVersionId: r.exam_version_id,
      subjectId: r.subject_id,
      subjectName: r.subject_name,
      chapterId: r.chapter_id,
      topicId: r.topic_id,
      questionTypeId: r.question_type_id,
      difficulty: r.difficulty,
      difficultyType: r.difficulty_type,
      marks: r.marks,
      provenance: r.provenance || r.source_type,
      relevancePriority: r.relevance_priority,
      officialYear: r.official_year,
      isVerified: Boolean(r.is_verified),
      currentVersion: r.current_version,
      fingerprint: r.fingerprint,
      content: parsedLang,
      correctAnswer: parsedAns,
      trustStatus: r.trust_status,
      fullExamEligible: Boolean(r.full_exam_eligible),
      practiceEligible: Boolean(r.practice_eligible),
      validationNotes: r.validation_notes,
      passageGroupId: r.passage_group_id,
      versionDetails: {
        versionNumber: r.current_version,
        correctionReason: r.correction_reason,
        versionCreatedAt: r.version_created_at
      },
      createdAt: r.created_at
    };
  }

  /**
   * Retrieves historical questions with optional filters.
   */
  getHistoricalQuestions(filters = {}, db = getDb()) {
    if (!db) return [];

    let query = `
      SELECT h.*, s.name as subject_name
      FROM historical_questions h
      LEFT JOIN subjects s ON h.subject_id = s.subject_id
      WHERE 1=1
    `;
    const params = [];

    if (filters.examId) {
      query += ` AND h.exam_id = ?`;
      params.push(filters.examId);
    }
    if (filters.subjectId) {
      query += ` AND h.subject_id = ?`;
      params.push(filters.subjectId);
    }
    if (filters.examYear) {
      query += ` AND h.exam_year = ?`;
      params.push(parseInt(filters.examYear, 10));
    }

    query += ` ORDER BY h.exam_year DESC, h.question_number ASC LIMIT 100`;

    const rows = db.prepare(query).all(...params);
    return rows.map(r => ({
      ...r,
      options: r.options_json ? JSON.parse(r.options_json) : [],
      correctAnswer: r.correct_answer_json ? JSON.parse(r.correct_answer_json) : null
    }));
  }
}

module.exports = new ContentRepository();

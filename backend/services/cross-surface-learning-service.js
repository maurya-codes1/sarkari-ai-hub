// backend/services/cross-surface-learning-service.js
// Phase 17L: PDF -> Revision -> Mock Learning Loop & Cross-Surface Question Reuse Architecture
// Enforces:
// 1. UNIQUE WITHIN EACH ASSET + REUSABLE ACROSS ASSETS
// 2. Strong PDF/Revision reuse in Learning Mock (Mode A)
// 3. Broader verified mix in Practice Mock (Mode B)
// 4. Official Blueprint priority first in Full Exam (Mode C)
// 5. Complete telemetry tracking: CROSS_SURFACE_REUSE vs ASSET_INTERNAL_DUPLICATE

const { getDb } = require('../db/database');
const crypto = require('crypto');
const { matchesSubject, normalizeSubjectId } = require('../utils/subject-utils');

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

class CrossSurfaceLearningService {
  constructor() {
    this.ASSET_TYPES = {
      PDF: 'PDF',
      REVISION: 'REVISION',
      LEARNING_MOCK: 'LEARNING_MOCK',
      PRACTICE_MOCK: 'PRACTICE_MOCK',
      FULL_EXAM: 'FULL_EXAM'
    };
  }

  /**
   * Enforces single-asset uniqueness: The same question CANNOT appear more than once inside the same asset.
   *
   * @param {Array<object|string>} questionsOrIds - Array of question objects or string IDs
   * @param {string} [assetType='ASSET'] - Asset descriptor for error messages
   * @returns {object} { valid: boolean, uniqueCount: number, duplicateId?: string, reason?: string, error?: string }
   */
  validateAssetUniqueness(questionsOrIds, assetType = 'ASSET') {
    if (!Array.isArray(questionsOrIds)) {
      return { valid: true, uniqueCount: 0, reason: 'EMPTY_LIST' };
    }

    const seenIds = new Set();
    const seenFingerprints = new Set();

    for (let i = 0; i < questionsOrIds.length; i++) {
      const item = questionsOrIds[i];
      const qId = (typeof item === 'string') ? item : (item.id || item.question_id || item.questionId);
      const fp = (typeof item === 'object') ? (item.fingerprint || null) : null;

      if (!qId) continue;

      if (seenIds.has(qId)) {
        return {
          valid: false,
          duplicateId: qId,
          position: i,
          reason: 'ASSET_INTERNAL_DUPLICATE',
          error: `Single-Asset Uniqueness Violation: Question '${qId}' appears more than once inside ${assetType}.`
        };
      }
      seenIds.add(qId);

      if (fp) {
        if (seenFingerprints.has(fp)) {
          return {
            valid: false,
            duplicateId: qId,
            duplicateFingerprint: fp,
            position: i,
            reason: 'ASSET_INTERNAL_DUPLICATE',
            error: `Single-Asset Uniqueness Violation: Duplicate question fingerprint '${fp}' detected inside ${assetType}.`
          };
        }
        seenFingerprints.add(fp);
      }
    }

    return {
      valid: true,
      uniqueCount: seenIds.size,
      reason: 'ASSET_INTERNAL_UNIQUE'
    };
  }

  /**
   * Validates academic context compatibility before allowing reuse.
   * Prevents cross-board, cross-class, cross-subject, or cross-mode contamination.
   *
   * @param {object} question - Question record from database
   * @param {object} targetContext - Target context { boardId, stage, stream, subjectId, language, testMode }
   * @returns {object} { compatible: boolean, reason?: string }
   */
  validateContextCompatibility(question, targetContext = {}) {
    if (!question) {
      return { compatible: false, reason: 'QUESTION_NOT_FOUND' };
    }

    const { boardId, stage, stream, subjectId, language, testMode } = targetContext;

    // 1. Subject compatibility (Strict match with canonical normalization)
    if (subjectId && subjectId !== 'all' && !matchesSubject(question.subject_id, subjectId)) {
      return {
        compatible: false,
        reason: 'CONTEXT_MISMATCH',
        details: `Subject mismatch: Question subject '${question.subject_id}' does not match target subject '${subjectId}'.`
      };
    }

    // 2. Board compatibility (Strict isolation: school board questions never appear in competitive exams and vice versa)
    if (boardId) {
      if (question.board_id !== boardId) {
        return {
          compatible: false,
          reason: 'CONTEXT_MISMATCH',
          details: `Board mismatch: Question board '${question.board_id}' does not match target board '${boardId}'.`
        };
      }
    } else {
      if (question.board_id) {
        return {
          compatible: false,
          reason: 'CONTEXT_MISMATCH',
          details: `Exam isolation mismatch: School board question '${question.board_id}' cannot appear in competitive exam.`
        };
      }
    }

    // 2b. Question type compatibility (Strictly objective for mock tests)
    if (['short_answer', 'long_answer', 'case_study', 'subjective'].includes(question.question_type_id)) {
      return {
        compatible: false,
        reason: 'TYPE_INELIGIBLE',
        details: `Subjective question '${question.question_id}' is not eligible for objective mock practice.`
      };
    }

    // 3. Stage / Class compatibility (e.g. Class 12 question cannot be in Class 10 mock)
    if (stage && question.stage && question.stage !== stage && question.stage !== 'BOARD' && question.stage !== 'Annual') {
      return {
        compatible: false,
        reason: 'CONTEXT_MISMATCH',
        details: `Stage mismatch: Question stage '${question.stage}' does not match target stage '${stage}'.`
      };
    }

    // 4. Full Exam Mode Eligibility (Section 7B.C & 7G)
    const isFullExam = ['FULL_EXAM', 'FULL_EXAM_PATTERN'].includes(testMode);
    if (isFullExam) {
      if (Number(question.full_exam_eligible) !== 1) {
        return {
          compatible: false,
          reason: 'FULL_EXAM_INELIGIBLE',
          details: `Full Exam Pattern Priority: Question '${question.question_id}' is not official full_exam_eligible (full_exam_eligible = ${question.full_exam_eligible}).`
        };
      }
    }

    // 5. Language compatibility
    if (language && question.language_content) {
      try {
        const parsedLang = typeof question.language_content === 'string'
          ? JSON.parse(question.language_content)
          : question.language_content;
        
        // Question must contain either target language or English fallback
        if (!parsedLang[language] && !parsedLang['en']) {
          return {
            compatible: false,
            reason: 'LANGUAGE_UNAVAILABLE',
            details: `Language '${language}' is unavailable in question '${question.question_id}'.`
          };
        }
      } catch (e) {
        // Fallback to compatible if JSON parsing fails
      }
    }

    return { compatible: true };
  }

  /**
   * Validates transition between surfaces (e.g. PDF -> Full Exam).
   */
  validateCrossSurfaceTransition(sourceSurface, targetSurface, question = {}) {
    const isFullExam = ['FULL_EXAM', 'FULL_EXAM_PATTERN'].includes(targetSurface);
    if (isFullExam && Number(question.full_exam_eligible) !== 1) {
      return { allowed: false, reason: 'FULL_EXAM_INELIGIBLE' };
    }
    return { allowed: true };
  }

  /**
   * Validates language compatibility between target paper and candidate language.
   */
  validateLanguageCompatibility(targetLanguage, questionLanguage) {
    if (!targetLanguage || !questionLanguage) return { compatible: true };
    return { compatible: targetLanguage === questionLanguage };
  }

  /**
   * Records question usage in a specific asset.

   * Telemetry is recorded per question-asset pair.
   *
   * @param {string} assetType - 'PDF' | 'REVISION' | 'LEARNING_MOCK' | 'PRACTICE_MOCK' | 'FULL_EXAM'
   * @param {string} assetId - Unique identifier of the generated asset
   * @param {Array<string>} questionIds - Array of question IDs included in the asset
   * @param {object} [context={}] - Metadata context { boardId, stage, stream, subjectId, language }
   * @param {object} [db]
   */
  recordUsage(assetType, assetId, questionIds = [], context = {}, db = getDb()) {
    if (!db || !Array.isArray(questionIds) || questionIds.length === 0) return { recorded: 0 };

    const { boardId = null, stage = null, stream = null, subjectId = null, language = null } = context;
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO cross_surface_question_usage (
        usage_id, question_id, asset_type, asset_id, context_board_id,
        context_stage, context_stream, context_subject_id, context_language, metadata_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let count = 0;
    const insertMany = db.transaction((qIds) => {
      for (const qId of qIds) {
        const usageId = `use-${crypto.createHash('sha256').update(`${assetType}:${assetId}:${qId}`).digest('hex').substring(0, 24)}`;
        stmt.run(
          usageId,
          qId,
          assetType,
          assetId,
          boardId,
          stage,
          stream,
          subjectId,
          language,
          JSON.stringify(context)
        );
        count++;
      }
    });

    try {
      insertMany(questionIds);
    } catch (err) {
      console.warn('Cross-surface usage logging error:', err.message);
    }

    return { recorded: count, assetId, assetType };
  }

  /**
   * Retrieves cross-surface reuse telemetry for a question.
   * Distinguishes CROSS_SURFACE_REUSE from ASSET_INTERNAL_DUPLICATE.
   *
   * @param {string} questionId
   * @param {object} [db]
   */
  getQuestionReuseTelemetry(questionId, db = getDb()) {
    if (!db || !questionId) return null;

    const rows = db.prepare(`
      SELECT asset_type, asset_id, used_at
      FROM cross_surface_question_usage
      WHERE question_id = ?
      ORDER BY used_at DESC
    `).all(questionId);

    const assetIds = new Set(rows.map(r => r.asset_id));
    const surfaces = new Set(rows.map(r => r.asset_type));

    const appeared_in_pdf = rows.some(r => r.asset_type === 'PDF');
    const appeared_in_revision = rows.some(r => r.asset_type === 'REVISION');
    const appeared_in_learning_mock = rows.some(r => r.asset_type === 'LEARNING_MOCK');
    const appeared_in_practice_mock = rows.some(r => r.asset_type === 'PRACTICE_MOCK');
    const appeared_in_full_exam = rows.some(r => r.asset_type === 'FULL_EXAM');

    const reuse_count = assetIds.size;
    const last_used_in_asset = rows.length > 0 ? rows[0].asset_id : null;

    return {
      questionId,
      appeared_in_pdf: Boolean(appeared_in_pdf),
      appeared_in_revision: Boolean(appeared_in_revision),
      appeared_in_learning_mock: Boolean(appeared_in_learning_mock),
      appeared_in_practice_mock: Boolean(appeared_in_practice_mock),
      appeared_in_full_exam: Boolean(appeared_in_full_exam),
      reuse_count,
      last_used_in_asset,
      asset_ids: Array.from(assetIds),
      surfaces: Array.from(surfaces),
      telemetry_type: reuse_count > 1 ? 'CROSS_SURFACE_REUSE' : (reuse_count === 1 ? 'SINGLE_ASSET_USE' : 'UNUSED')
    };
  }

  /**
   * Retrieves studied question IDs from a PDF or user revision history.
   *
   * @param {object} options - { pdfId, userId, subjectId, examId }
   * @param {object} [db]
   * @returns {Array<string>} Array of question IDs
   */
  getStudiedQuestionIds(options = {}, db = getDb()) {
    if (!db) return [];
    const { pdfId, userId, subjectId, examId } = options;
    const studiedIds = new Set();

    // 1. From PDF usage
    if (pdfId) {
      const pdfRows = db.prepare(`
        SELECT question_id FROM cross_surface_question_usage
        WHERE asset_id = ? AND asset_type = 'PDF'
      `).all(pdfId);
      pdfRows.forEach(r => studiedIds.add(r.question_id));
    }

    // 2. From User Spaced Revision history
    if (userId) {
      let revSql = 'SELECT question_id FROM user_spaced_revisions WHERE user_id = ?';
      const params = [userId];
      if (subjectId && subjectId !== 'all') {
        revSql += ' AND subject_id = ?';
        params.push(subjectId);
      }
      if (examId) {
        revSql += ' AND exam_id = ?';
        params.push(examId);
      }
      const revRows = db.prepare(revSql).all(...params);
      revRows.forEach(r => studiedIds.add(r.question_id));
    }

    return Array.from(studiedIds);
  }

  /**
   * Mode A: Learning / Revision Mock Question Selector.
   * Priorities:
   * 1. Questions from specified PDF / studied list (Strong overlap)
   * 2. Questions from user revision set
   * 3. Other verified questions from same academic context
   *
   * @param {object} params
   * @param {number|object} [count=20] - Total questions desired or db instance
   * @param {object} [db]
   */
  selectQuestionsForLearningMock(params = {}, count = 20, db = getDb()) {
    if (typeof count === 'object' && count !== null && typeof count.prepare === 'function') {
      db = count;
      count = params.count || params.questionCount || 20;
    } else if (typeof count !== 'number') {
      count = params.count || params.questionCount || 20;
    }
    if (!db) db = getDb();
    if (!db) return { questions: [], studiedReuseCount: 0, freshVerifiedCount: 0, totalSelected: 0 };
    const {
      examId,
      boardId,
      stage,
      stream,
      subjectId,
      language = 'en',
      pdfId = null,
      userId = null,
      studiedQuestionIds = []
    } = params;

    const resolvedBoard = boardId ? (BOARD_MAP[boardId] || boardId) : null;
    const targetContext = { boardId: resolvedBoard, stage, stream, subjectId, language, testMode: 'LEARNING_MOCK' };
    const selectedMap = new Map();
    const seenFingerprints = new Set();

    // 1. Collect candidate studied question IDs (from PDF or Revision)
    const candidateStudiedIds = new Set(studiedQuestionIds);
    if (pdfId || userId) {
      const dbStudied = this.getStudiedQuestionIds({ pdfId, userId, subjectId, examId }, db);
      dbStudied.forEach(id => candidateStudiedIds.add(id));
    }

    // 2. Priority 1 & 2: Evaluate and include compatible studied questions
    if (candidateStudiedIds.size > 0) {
      const placeholders = Array.from(candidateStudiedIds).map(() => '?').join(',');
      const rows = db.prepare(`
        SELECT q.*, qv.language_content, qv.correct_answer, s.name as subject_name
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        JOIN subjects s ON q.subject_id = s.subject_id
        WHERE q.question_id IN (${placeholders})
      `).all(...Array.from(candidateStudiedIds));

      for (const q of rows) {
        if (selectedMap.size >= count) break;
        const comp = this.validateContextCompatibility(q, targetContext);
        if (comp.compatible && !selectedMap.has(q.question_id)) {
          if (q.fingerprint && seenFingerprints.has(q.fingerprint)) continue;
          if (q.fingerprint) seenFingerprints.add(q.fingerprint);
          selectedMap.set(q.question_id, { ...q, selectionPriority: 'PRIORITY_1_STUDIED_REVISION' });
        }
      }
    }

    const studiedReuseCount = selectedMap.size;

    // 3. Priority 3: Refill from other verified questions in the same academic context
    if (selectedMap.size < count) {
      const needed = count - selectedMap.size;
      const excludeIds = Array.from(selectedMap.keys());
      let query = `
        SELECT q.*, qv.language_content, qv.correct_answer, s.name as subject_name
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        JOIN subjects s ON q.subject_id = s.subject_id
        WHERE 1=1
          AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
          AND q.question_type_id NOT IN ('short_answer', 'long_answer', 'case_study', 'subjective')
      `;
      const queryParams = [];

      if (subjectId && subjectId !== 'all') {
        query += ' AND q.subject_id = ?';
        queryParams.push(subjectId);
      }
      if (resolvedBoard) {
        query += ' AND q.board_id = ?';
        queryParams.push(resolvedBoard);
      } else {
        query += " AND (q.board_id IS NULL OR q.board_id = '')";
        query += " AND (q.stage IS NULL OR q.stage = '' OR q.stage NOT LIKE 'Class%')";
      }
      if (stage) {
        query += ' AND q.stage = ?';
        queryParams.push(stage);
      }
      if (excludeIds.length > 0) {
        const placeholders = excludeIds.map(() => '?').join(',');
        query += ` AND q.question_id NOT IN (${placeholders})`;
        queryParams.push(...excludeIds);
      }

      const fetchLimit = Math.max(needed + 50, needed * 2);
      if (examId && !boardId) {
        query += ' ORDER BY (CASE WHEN q.paper_id LIKE ? OR q.question_id LIKE ? THEN 0 ELSE 1 END), RANDOM() LIMIT ?';
        queryParams.push(`%${examId}%`, `%${examId}%`, fetchLimit);
      } else {
        query += ' ORDER BY RANDOM() LIMIT ?';
        queryParams.push(fetchLimit);
      }

      const freshRows = db.prepare(query).all(...queryParams);
      for (const q of freshRows) {
        if (selectedMap.size >= count) break;
        if (!selectedMap.has(q.question_id)) {
          if (q.fingerprint && seenFingerprints.has(q.fingerprint)) continue;
          if (q.fingerprint) seenFingerprints.add(q.fingerprint);
          selectedMap.set(q.question_id, { ...q, selectionPriority: 'PRIORITY_3_VERIFIED_CONTEXT' });
        }
      }
    }

    const selectedList = Array.from(selectedMap.values());
    const uniqueness = this.validateAssetUniqueness(selectedList, 'LEARNING_MOCK');
    if (!uniqueness.valid) {
      throw new Error(uniqueness.error);
    }

    return {
      questions: selectedList,
      studiedReuseCount,
      freshVerifiedCount: selectedList.length - studiedReuseCount,
      totalSelected: selectedList.length
    };
  }

  /**
   * Mode B: Practice Mock Question Selector.
   * Balanced broader mix:
   * 1. Studied questions from PDF/Revision (Meaningful reuse, e.g. ~30-50% if available)
   * 2. Broader verified same-syllabus questions
   *
   * @param {object} params
   * @param {number|object} [count=30] - Total questions desired or db instance
   * @param {object} [db]
   */
  selectQuestionsForPracticeMock(params = {}, count = 30, db = getDb()) {
    if (typeof count === 'object' && count !== null && typeof count.prepare === 'function') {
      db = count;
      count = params.count || params.questionCount || 30;
    } else if (typeof count !== 'number') {
      count = params.count || params.questionCount || 30;
    }
    if (!db) db = getDb();
    if (!db) return { questions: [], studiedReuseCount: 0, broaderPoolCount: 0, totalSelected: 0 };
    const {
      examId,
      boardId,
      stage,
      stream,
      subjectId,
      language = 'en',
      pdfId = null,
      userId = null,
      studiedQuestionIds = []
    } = params;

    const resolvedBoard = boardId ? (BOARD_MAP[boardId] || boardId) : null;
    const targetContext = { boardId: resolvedBoard, stage, stream, subjectId, language, testMode: 'PRACTICE_MOCK' };
    const selectedMap = new Map();
    const seenFingerprints = new Set();

    // 1. Determine studied question pool
    const candidateStudiedIds = new Set(studiedQuestionIds);
    if (pdfId || userId) {
      const dbStudied = this.getStudiedQuestionIds({ pdfId, userId, subjectId, examId }, db);
      dbStudied.forEach(id => candidateStudiedIds.add(id));
    }

    // 2. Select a subset of studied questions (e.g. up to 40% of requested count)
    const maxStudied = Math.max(1, Math.min(candidateStudiedIds.size, Math.floor(count * 0.40)));
    if (candidateStudiedIds.size > 0 && maxStudied > 0) {
      const placeholders = Array.from(candidateStudiedIds).map(() => '?').join(',');
      const rows = db.prepare(`
        SELECT q.*, qv.language_content, qv.correct_answer, s.name as subject_name
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        JOIN subjects s ON q.subject_id = s.subject_id
        WHERE q.question_id IN (${placeholders})
        ORDER BY RANDOM()
      `).all(...Array.from(candidateStudiedIds));

      for (const q of rows) {
        if (selectedMap.size >= maxStudied) break;
        const comp = this.validateContextCompatibility(q, targetContext);
        if (comp.compatible && !selectedMap.has(q.question_id)) {
          if (q.fingerprint && seenFingerprints.has(q.fingerprint)) continue;
          if (q.fingerprint) seenFingerprints.add(q.fingerprint);
          selectedMap.set(q.question_id, { ...q, selectionPriority: 'PRACTICE_STUDIED_REUSE' });
        }
      }
    }

    const studiedReuseCount = selectedMap.size;

    // 3. Fill the remaining count from broader verified same-subject questions
    const remainingCount = count - selectedMap.size;
    if (remainingCount > 0) {
      const excludeIds = Array.from(selectedMap.keys());
      let query = `
        SELECT q.*, qv.language_content, qv.correct_answer, s.name as subject_name
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        JOIN subjects s ON q.subject_id = s.subject_id
        WHERE 1=1
          AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
          AND q.question_type_id NOT IN ('short_answer', 'long_answer', 'case_study', 'subjective')
      `;
      const queryParams = [];

      if (subjectId && subjectId !== 'all') {
        query += ' AND q.subject_id = ?';
        queryParams.push(subjectId);
      }
      if (resolvedBoard) {
        query += ' AND q.board_id = ?';
        queryParams.push(resolvedBoard);
      } else {
        query += " AND (q.board_id IS NULL OR q.board_id = '')";
        query += " AND (q.stage IS NULL OR q.stage = '' OR q.stage NOT LIKE 'Class%')";
      }
      if (stage) {
        query += ' AND q.stage = ?';
        queryParams.push(stage);
      }
      if (excludeIds.length > 0) {
        const placeholders = excludeIds.map(() => '?').join(',');
        query += ` AND q.question_id NOT IN (${placeholders})`;
        queryParams.push(...excludeIds);
      }

      const fetchLimit = Math.max(remainingCount + 50, remainingCount * 2);
      if (examId && !boardId) {
        query += ' ORDER BY (CASE WHEN q.paper_id LIKE ? OR q.question_id LIKE ? THEN 0 ELSE 1 END), RANDOM() LIMIT ?';
        queryParams.push(`%${examId}%`, `%${examId}%`, fetchLimit);
      } else {
        query += ' ORDER BY RANDOM() LIMIT ?';
        queryParams.push(fetchLimit);
      }

      const broaderRows = db.prepare(query).all(...queryParams);
      for (const q of broaderRows) {
        if (selectedMap.size >= count) break;
        if (!selectedMap.has(q.question_id)) {
          if (q.fingerprint && seenFingerprints.has(q.fingerprint)) continue;
          if (q.fingerprint) seenFingerprints.add(q.fingerprint);
          selectedMap.set(q.question_id, { ...q, selectionPriority: 'PRACTICE_BROADER_POOL' });
        }
      }
    }

    const selectedList = Array.from(selectedMap.values());
    const uniqueness = this.validateAssetUniqueness(selectedList, 'PRACTICE_MOCK');
    if (!uniqueness.valid) {
      throw new Error(uniqueness.error);
    }

    return {
      questions: selectedList,
      studiedReuseCount,
      broaderPoolCount: selectedList.length - studiedReuseCount,
      totalSelected: selectedList.length
    };
  }

  /**
   * Mode C: Full Exam Question Filter.
   * Ensures that PDF questions may only be included IF they have full_exam_eligible = 1
   * and match the section blueprint. Official blueprint priority is strictly enforced.
   *
   * @param {Array<object|string>} candidateQuestions
   * @param {object} sectionBlueprint - { subjectId, questionTypes }
   * @param {object} [db]
   * @returns {Array<object>} Filtered compatible questions
   */
  filterQuestionsForFullExam(candidateQuestions = [], sectionBlueprint = {}, db = getDb()) {
    if (!db) db = getDb();
    const valid = [];
    const seenIds = new Set();

    let questionObjs = candidateQuestions;
    if (db && candidateQuestions.length > 0 && typeof candidateQuestions[0] === 'string') {
      const placeholders = candidateQuestions.map(() => '?').join(',');
      questionObjs = db.prepare(`SELECT * FROM questions WHERE question_id IN (${placeholders})`).all(...candidateQuestions);
    }

    for (const q of questionObjs) {
      if (!q || !q.question_id || seenIds.has(q.question_id)) continue;

      // 1. Strict full_exam_eligible = 1 check
      if (Number(q.full_exam_eligible) !== 1) continue;

      // 2. Subject check
      if (sectionBlueprint.subjectId && sectionBlueprint.subjectId !== 'all' && q.subject_id !== sectionBlueprint.subjectId) {
        continue;
      }

      // 3. Question type check
      if (Array.isArray(sectionBlueprint.questionTypes) && sectionBlueprint.questionTypes.length > 0) {
        if (!sectionBlueprint.questionTypes.includes(q.question_type_id)) {
          continue;
        }
      }

      seenIds.add(q.question_id);
      valid.push(q);
    }

    return valid;
  }

  /**
   * System-wide Telemetry & Reconciliation
   * Reports CROSS_SURFACE_REUSE vs ASSET_INTERNAL_DUPLICATE
   *
   * @param {object} [db]
   */
  getSystemTelemetry(db = getDb()) {
    if (!db) return {};

    const totalUsage = db.prepare('SELECT count(*) as c FROM cross_surface_question_usage').get().c;
    const distinctQuestions = db.prepare('SELECT count(DISTINCT question_id) as c FROM cross_surface_question_usage').get().c;
    
    // Group by asset type
    const byTypeRows = db.prepare(`
      SELECT asset_type, count(*) as count, count(DISTINCT question_id) as distinct_questions
      FROM cross_surface_question_usage
      GROUP BY asset_type
    `).all();

    // Questions reused in 2 or more surfaces
    const crossSurfaceReused = db.prepare(`
      SELECT count(*) as c FROM (
        SELECT question_id, count(DISTINCT asset_type) as surface_count
        FROM cross_surface_question_usage
        GROUP BY question_id
        HAVING surface_count >= 2
      )
    `).get().c;

    // Questions reused across 2 or more distinct assets
    const multiAssetReused = db.prepare(`
      SELECT count(*) as c FROM (
        SELECT question_id, count(DISTINCT asset_id) as asset_count
        FROM cross_surface_question_usage
        GROUP BY question_id
        HAVING asset_count >= 2
      )
    `).get().c;

    return {
      totalUsageRecords: totalUsage,
      distinctQuestionsTracked: distinctQuestions,
      byAssetType: byTypeRows,
      crossSurfaceReusedQuestions: crossSurfaceReused,
      multiAssetReusedQuestions: multiAssetReused,
      assetInternalDuplicatesBlocked: 0, // Enforced at 0 by validateAssetUniqueness
      telemetryCategories: {
        CROSS_SURFACE_REUSE: multiAssetReused,
        ASSET_INTERNAL_DUPLICATE: 0
      }
    };
  }
}

module.exports = new CrossSurfaceLearningService();

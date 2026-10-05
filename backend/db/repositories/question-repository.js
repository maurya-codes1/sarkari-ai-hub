// backend/db/repositories/question-repository.js
// Modular repository for Questions, Versions, and Subjects.

const { getDb, checkDbAvailable } = require('../database');
const { normalizeSubjectId } = require('../../utils/subject-utils');

const CANONICAL_BOARD_MAP = {
  'cbse': 'cbse-board', 'icse': 'cbse-board', 'upmsp': 'upmsp-uttar-pradesh', 'up': 'upmsp-uttar-pradesh',
  'bseb': 'bseb-bihar', 'bihar': 'bseb-bihar', 'maharashtra': 'msbshse-maharashtra', 'msbshse': 'msbshse-maharashtra',
  'rbse': 'rbse-rajasthan', 'rajasthan': 'rbse-rajasthan', 'mpbse': 'mpbse-madhya-pradesh', 'mp': 'mpbse-madhya-pradesh',
  'wb': 'wbbse-wbchse-west-bengal', 'wbbse': 'wbbse-wbchse-west-bengal', 'wbchse': 'wbbse-wbchse-west-bengal',
  'tn': 'tamil-nadu-dge', 'tndge': 'tamil-nadu-dge', 'tamilnadu': 'tamil-nadu-dge',
  'karnataka': 'karnataka-kseab-pue', 'kseab': 'karnataka-kseab-pue',
  'gujarat': 'gseb-gujarat', 'gseb': 'gseb-gujarat',
  'haryana': 'hbse-haryana', 'hbse': 'hbse-haryana', 'bseh': 'hbse-haryana',
  'jac': 'jac-jharkhand', 'jharkhand': 'jac-jharkhand',
  'pseb': 'pseb-punjab', 'punjab': 'pseb-punjab',
  'nios': 'nios-board',
  'cgbse': 'cgbse-chhattisgarh', 'chhattisgarh': 'cgbse-chhattisgarh',
  'bseodisha': 'odisha-bse-chse', 'odisha': 'odisha-bse-chse', 'chse': 'odisha-bse-chse',
  'ubse': 'ubse-uttarakhand', 'uttarakhand': 'ubse-uttarakhand',
  'seba': 'asseb-assam', 'ahsec': 'asseb-assam', 'asseb': 'asseb-assam', 'assam': 'asseb-assam',
  'bsetelangana': 'telangana-bsetg-tsbie', 'bsetg': 'telangana-bsetg-tsbie', 'tsbie': 'telangana-bsetg-tsbie', 'telangana': 'telangana-bsetg-tsbie',
  'bseap': 'andhra-pradesh-bse-bieap', 'bieap': 'andhra-pradesh-bse-bieap', 'ap': 'andhra-pradesh-bse-bieap', 'andhra': 'andhra-pradesh-bse-bieap',
  'hpbose': 'hpbose-himachal-pradesh', 'himachal': 'hpbose-himachal-pradesh',
  'jkbose': 'jkbose-jammu-kashmir', 'jk': 'jkbose-jammu-kashmir',
  'kerala': 'kerala-general-scert-dhse', 'dhse': 'kerala-general-scert-dhse',
  'gbshse': 'gbshse-goa', 'goa': 'gbshse-goa',
  'bsem': 'manipur-bsem-cohsem', 'cohsem': 'manipur-bsem-cohsem', 'manipur': 'manipur-bsem-cohsem',
  'mbose': 'mbose-meghalaya', 'meghalaya': 'mbose-meghalaya',
  'mbse': 'mbse-mizoram', 'mizoram': 'mbse-mizoram',
  'nbse': 'nbse-nagaland', 'nagaland': 'nbse-nagaland',
  'tbse': 'tbse-tripura', 'tripura': 'tbse-tripura',
  'sbosse': 'sbosse-sikkim', 'sikkim': 'sbosse-sikkim',
  'apsbe': 'apsbe-arunachal-pradesh', 'arunachal': 'apsbe-arunachal-pradesh'
};

const ANTI_PLACEHOLDER_SQL = `
  AND (
    v.language_content NOT LIKE '%Conceptual Distractor%'
    AND v.language_content NOT LIKE '%Analytical Alternative%'
    AND v.language_content NOT LIKE '%Applied Variant%'
    AND v.language_content NOT LIKE '%Verified Answer%'
    AND v.language_content NOT LIKE '%Distractor Statement%'
    AND v.language_content NOT LIKE '%Authoritative Answer%'
    AND v.language_content NOT LIKE '%Contextual Alternative%'
    AND v.language_content NOT LIKE '%Conceptual Variant%'
    AND v.language_content NOT LIKE '%प्रमाणिक उत्तर%'
    AND v.language_content NOT LIKE '%प्रामाणिकम् उत्तरम्%'
    AND v.language_content NOT LIKE '%ब्लूप्रिंट के अनुसार सही विकल्प चुनिए%'
    AND v.language_content NOT LIKE '%प्राथमिक एवं प्रामाणिक तथ्य%'
    AND v.language_content NOT LIKE '%द्वितीयक गौण संदर्भ%'
    AND v.language_content NOT LIKE '%व्याकरणसम्मतं रूपम्%'
    AND v.language_content NOT LIKE '%Syllabus 2026-27, choose the correct option%'
    AND v.language_content NOT LIKE '%Primary statutory principle%'
    AND v.language_content NOT LIKE '%Secondary verified academic formulation%'
    AND v.language_content NOT LIKE '%Tertiary analytical model%'
    AND v.language_content NOT LIKE '%Conclusive theoretical deduction%'
    AND v.language_content NOT LIKE '%Option A for %'
    AND v.language_content NOT LIKE '%Option A: Option A%'
    AND v.language_content NOT LIKE '%व्याकरण सम्मत नियमों के विपरीत%'
    AND v.language_content NOT LIKE '%মূল তাত্ত্বিক ও বাস্তবিক তাৎপর্য%'
    AND v.language_content NOT LIKE '%গঠনমূলক নিয়মাবলী%'
    AND v.language_content NOT LIKE '%ঐতিহাসিক পটভূমি এবং ত্রিপুরা%'
    AND v.language_content NOT LIKE '%প্রাসঙ্গিক প্রামাণ্য সিদ্ধান্ত%'
    AND v.language_content NOT LIKE '%বাচিমুং ক:%'
    AND v.language_content NOT LIKE '%முதலாவது அடிப்படை விதி%'
    AND v.language_content NOT LIKE '%இரண்டாவது நிரூபிக்கப்பட்ட உண்மை%'
  )
`;

function buildSubjectFilter(subjectId, resolvedStage, isTargetingBoard = false) {
  const normSub = normalizeSubjectId(subjectId);
  const cleanSub = normSub.replace(/^subj-/, '').toLowerCase();

  // If not targeting a board and no school stage specified: enforce strict subject isolation
  if (!isTargetingBoard && !resolvedStage) {
    return {
      clause: ` AND q.subject_id = ?`,
      params: [normSub]
    };
  }

  if (cleanSub === 'science') {
    return {
      clause: ` AND (q.subject_id LIKE '%science%' OR q.subject_id LIKE '%physics%' OR q.subject_id LIKE '%chemistry%' OR q.subject_id LIKE '%biology%')`,
      params: []
    };
  }
  if (cleanSub === 'math' || cleanSub === 'mathematics') {
    if (resolvedStage === 'Class 12') {
      return {
        clause: ` AND (q.subject_id LIKE '%math%' OR q.subject_id = 'subj-math12')`,
        params: []
      };
    }
    return {
      clause: ` AND q.subject_id LIKE '%math%'`,
      params: []
    };
  }
  if (cleanSub === 'social' || cleanSub === 'sst') {
    return {
      clause: ` AND (q.subject_id LIKE '%social%' OR q.subject_id LIKE '%history%' OR q.subject_id LIKE '%geography%' OR q.subject_id LIKE '%civics%' OR q.subject_id LIKE '%economics%')`,
      params: []
    };
  }
  if (cleanSub === 'biology' || cleanSub === 'bio') {
    return {
      clause: ` AND (q.subject_id LIKE '%biology%' OR q.subject_id LIKE '%botany%' OR q.subject_id LIKE '%zoology%' OR q.subject_id LIKE '%bio%')`,
      params: []
    };
  }
  if (cleanSub === 'business' || cleanSub === 'bst') {
    return {
      clause: ` AND (q.subject_id LIKE '%business%' OR q.subject_id LIKE '%commerce%' OR q.subject_id LIKE '%bst%')`,
      params: []
    };
  }
  if (cleanSub === 'polity' || cleanSub === 'civics') {
    return {
      clause: ` AND (q.subject_id LIKE '%polity%' OR q.subject_id LIKE '%civics%' OR q.subject_id LIKE '%political%')`,
      params: []
    };
  }
  return {
    clause: ` AND (q.subject_id = ? OR q.subject_id LIKE ?)`,
    params: [normSub, `%${cleanSub}%`]
  };
}

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
        AND q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
        ${ANTI_PLACEHOLDER_SQL}
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
      WHERE q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
        ${ANTI_PLACEHOLDER_SQL}
    `;
    const params = [];

    if (subjectId && subjectId !== 'all') {
      const subFilter = buildSubjectFilter(subjectId, null);
      query += subFilter.clause;
      params.push(...subFilter.params);
    }
    query += ` ORDER BY RANDOM() LIMIT ?`;
    params.push(limit);

    return this.db.prepare(query).all(...params);
  }

  getQuestionsForSection(subjectId, count = 25, excludeIds = [], questionTypes = null, onlyFullExamEligible = false, examId = null, boardId = null, stage = null) {
    if (!this.isAvailable()) return [];

    const cleanBoard = (boardId || '').toLowerCase().trim().replace(/-board$/, '');
    const resolvedBoard = boardId ? (CANONICAL_BOARD_MAP[boardId] || CANONICAL_BOARD_MAP[cleanBoard] || boardId) : null;
    const isTargetingBoard = Boolean(resolvedBoard || (examId && (String(examId).includes('board') || String(examId).includes('class'))));

    let query = `
      SELECT q.*, v.language_content, v.correct_answer, s.name as subject_name
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE 1=1
        AND q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
        ${ANTI_PLACEHOLDER_SQL}
    `;
    const params = [];

    if (subjectId && subjectId !== 'all') {
      const subFilter = buildSubjectFilter(subjectId, stage);
      query += subFilter.clause;
      params.push(...subFilter.params);
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
    } else {
      query += ` AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')`;
      query += ` AND q.question_type_id NOT IN ('short_answer', 'long_answer', 'case_study', 'subjective')`;
    }

    if (resolvedBoard) {
      query += ` AND q.board_id = ?`;
      params.push(resolvedBoard);
    } else if (isTargetingBoard) {
      query += ` AND (q.board_id IS NOT NULL AND q.board_id != '')`;
    } else {
      // Competitive exam context: STRICT ISOLATION from school boards and class-specific questions
      query += ` AND (q.board_id IS NULL OR q.board_id = '')`;
      query += ` AND (q.stage IS NULL OR q.stage = '' OR q.stage NOT LIKE 'Class%')`;
    }

    if (stage && stage !== 'ANY') {
      if (String(stage).includes('12')) {
        query += ` AND (q.stage = 'Class 12' OR q.stage LIKE 'Class 12%')`;
      } else if (String(stage).includes('10')) {
        query += ` AND (q.stage = 'Class 10' OR q.stage LIKE 'Class 10%')`;
      } else {
        query += ` AND q.stage = ?`;
        params.push(stage);
      }
    }

    if (examId && !resolvedBoard) {
      query += ` ORDER BY (CASE WHEN q.paper_id LIKE ? OR q.question_id LIKE ? THEN 0 ELSE 1 END), RANDOM() LIMIT ?`;
      params.push(`%${examId}%`, `%${examId}%`, count);
    } else {
      query += ` ORDER BY RANDOM() LIMIT ?`;
      params.push(count);
    }

    return this.db.prepare(query).all(...params);
  }

  getPracticeQuestions({ subjectId = null, subjectIds = null, boardId = null, stage = null, difficulty = null, count = 30, excludeIds = [], examId = null, _depth = 0 }) {
    if (!this.isAvailable()) return [];

    const cleanBoard = (boardId || '').toLowerCase().trim().replace(/-board$/, '');
    const resolvedBoard = boardId ? (CANONICAL_BOARD_MAP[boardId] || CANONICAL_BOARD_MAP[cleanBoard] || boardId) : null;
    const isTargetingBoard = Boolean(resolvedBoard || (examId && (String(examId).includes('board') || String(examId).includes('class'))));

    let resolvedStage = stage;
    if (stage === 'ANY') {
      resolvedStage = null;
    } else if (!resolvedStage && examId && isTargetingBoard) {
      const e = String(examId).toLowerCase();
      if (e.includes('12')) resolvedStage = 'Class 12';
      else if (e.includes('10')) resolvedStage = 'Class 10';
      else if (e.includes('11')) resolvedStage = 'Class 11';
      else if (e.includes('9')) resolvedStage = 'Class 9';
    }
    if (resolvedStage && stage !== 'ANY') {
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
        AND q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
        AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
        AND q.question_type_id NOT IN ('short_answer', 'long_answer', 'case_study', 'subjective')
        ${ANTI_PLACEHOLDER_SQL}
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

    if (resolvedStage && stage !== 'ANY') {
      if (resolvedStage.includes('12')) {
        query += ` AND (q.stage = ? OR q.stage LIKE ?)`;
        params.push(resolvedStage, 'Class 12%');
      } else if (resolvedStage.includes('10')) {
        query += ` AND (q.stage = ? OR q.stage LIKE ?)`;
        params.push(resolvedStage, 'Class 10%');
      } else {
        query += ` AND q.stage = ?`;
        params.push(resolvedStage);
      }
    }

    if (Array.isArray(subjectIds) && subjectIds.length > 0) {
      const normIds = Array.from(new Set(subjectIds.flatMap(s => [s, normalizeSubjectId(s)]).filter(Boolean)));
      const placeholders = normIds.map(() => '?').join(',');
      query += ` AND q.subject_id IN (${placeholders})`;
      params.push(...normIds);
    } else if (subjectId && subjectId !== 'all') {
      const subFilter = buildSubjectFilter(subjectId, resolvedStage);
      query += subFilter.clause;
      params.push(...subFilter.params);
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

    // Controlled fallback with recursion guards (_depth <= 1)
    if (_depth === 0) {
      // 1. If specific difficulty filter yielded no questions, fallback to available difficulty
      if (rows.length === 0 && difficulty && difficulty !== 'MIXED') {
        const diffRows = this.getPracticeQuestions({ subjectId, subjectIds, boardId, stage: resolvedStage, difficulty: 'MIXED', count, excludeIds, examId, _depth: 1 });
        if (diffRows && diffRows.length > 0) return diffRows;
      }

      // 2. If board filter yielded no rows for this specific subject and stage, try broader stage on SAME board
      if (rows.length === 0 && resolvedBoard && stage !== 'ANY') {
        const stageRows = this.getPracticeQuestions({ subjectId, subjectIds, boardId: resolvedBoard, stage: 'ANY', difficulty, count, excludeIds, examId, _depth: 1 });
        if (stageRows && stageRows.length > 0) return stageRows;
      }

      // 3. If no specific board was specified (generic examId like 'board-12th-science') and subject yielded no rows (e.g. GK), fall back to general subject pool
      if (rows.length === 0 && !resolvedBoard && isTargetingBoard) {
        const genRows = this.getPracticeQuestions({ subjectId, subjectIds, boardId: null, stage: null, difficulty, count, excludeIds, examId: null, _depth: 1 });
        if (genRows && genRows.length > 0) return genRows;
      }
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
        AND q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
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
      WHERE (q.provenance = ? OR q.source_type = ?)
        AND q.is_published = 1
        AND (q.quality_state IS NULL OR q.quality_state != 'SYNTHETIC_QUARANTINE')
        AND q.trust_status != 'QUARANTINED'
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
    return this.db.prepare("SELECT COUNT(*) as c FROM questions WHERE is_published = 1 AND (quality_state IS NULL OR quality_state != 'SYNTHETIC_QUARANTINE') AND trust_status != 'QUARANTINED'").get().c;
  }
}

module.exports = new QuestionRepository();

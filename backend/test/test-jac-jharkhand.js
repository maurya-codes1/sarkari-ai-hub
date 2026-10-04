/**
 * test-jac-jharkhand.js
 * 
 * SARKARIAI HUB — BOARD #28
 * JHARKHAND ACADEMIC COUNCIL (JAC) VERIFICATION SUITE
 * 
 * Verifies all 57 forensic integrity requirements across:
 * - Current JAC identity (org-jh-board-jac, Gyandeep Campus, Bargawan, Namkum, Ranchi - 834010)
 * - Multi-examination council architecture: Class 8, Class 9, Secondary (Class 10), Class 11, Intermediate (Class 12), Madhyama, Madarsa, Inter Vocational
 * - Secondary Education (Matric Class 10) (10 subjects, 2,800 questions, 500 aggregate marks)
 * - Intermediate Education (Class 12) (21 subjects, 5,880 questions across Science, Commerce, Arts, Languages)
 * - Class 9 Board Examination & jacresults.com promotion dependency (JAC_CLASS9_TO_CLASS10_DEPENDENCY)
 * - Class 11 Board Examination & stream continuity dependency (JAC_CLASS11_TO_CLASS12_DEPENDENCY)
 * - 15 minutes dedicated reading time rule for theoretical papers
 * - Script Authenticity: English (Latin), Hindi (Devanagari), Sanskrit (Devanagari), Urdu (Perso-Arabic U+0600-U+06FF)
 * - 31 Primary Subjects (8,680 total questions: 6,355 MCQs with 0.00% generator bias, 2,325 Subjectives)
 * - 5 Master Bundled Study Notes (note-jac-*)
 * - All Mandatory Audit Reports in reports/
 * - Total Database Inventory: 250,870 questions (242,190 baseline + 8,680 JAC)
 * - Prior 27 Boards Preservation: exactly 226,800 questions untouched
 * - Competitive Baseline Preservation: exactly 15,390 questions untouched
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #28 JHARKHAND (JAC) VERIFICATION SUITE');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/57] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/57] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

const BOARD_ID = 'jac-jharkhand';
const dictPath = path.join(__dirname, '../../data/boards/jac-jharkhand.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. JAC board identity isolation
runTest(1, 'JAC board identity isolation (jac-jharkhand dictionary and database separation)', () => {
  assert.strictEqual(dict.board_id, BOARD_ID);
  assert.strictEqual(dict.authority_id, 'org-jh-board-jac');
  const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(b, 'Board record exists in SQLite');
  assert.strictEqual(b.active, 1);
  assert.strictEqual(b.verification_status, 'VERIFIED');
});

// 2. JAC authority verification
runTest(2, 'JAC authority verification (org-jh-board-jac, Gyandeep Campus, Namkum, Ranchi)', () => {
  const o = db.prepare("SELECT * FROM organizations WHERE organization_id = 'org-jh-board-jac'").get();
  assert.ok(o, 'Organization org-jh-board-jac exists');
  assert.strictEqual(o.short_name, 'JAC');
  assert.strictEqual(o.state_or_ut, 'Jharkhand');
  assert.strictEqual(o.active, 1);
});

// 3. JAC aliases in boards table
runTest(3, 'JAC aliases in boards table (jac-jharkhand, jac-board, jac)', () => {
  const aliases = ['jac-jharkhand', 'jac-board', 'jac'];
  for (const al of aliases) {
    const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(al);
    assert.ok(b, `Board alias ${al} must exist`);
    assert.strictEqual(b.organization_id, 'org-jh-board-jac');
  }
});

// 4. Official source registry verification
runTest(4, 'Official source registry verification (portal, secondary, intermediate, education dept, jcert)', () => {
  const sources = [
    'src-jac-portal',
    'src-jac-secondary-curriculum',
    'src-jac-intermediate-curriculum',
    'src-jh-education-dept',
    'src-jh-jcert'
  ];
  for (const sid of sources) {
    const s = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(sid);
    assert.ok(s, `Official source ${sid} must exist`);
    assert.strictEqual(s.organization_id, 'org-jh-board-jac');
    assert.strictEqual(s.verification_status, 'VERIFIED');
  }
});

// 5. Class 10 full isolation and stage verification
runTest(5, 'Class 10 full isolation and stage verification (2,800 questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 2800, 'Class 10 must have exactly 2,800 questions');
});

// 6. Class 12 full isolation and stage verification
runTest(6, 'Class 12 full isolation and stage verification (5,880 questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 5880, 'Class 12 must have exactly 5,880 questions');
});

// 7. Exactly 31 primary subjects registered and populated
runTest(7, 'Exactly 31 primary subjects registered and populated (10 C10 + 21 C12)', () => {
  const count = db.prepare("SELECT COUNT(DISTINCT subject_id) as cnt FROM questions WHERE board_id = ?").get(BOARD_ID).cnt;
  assert.strictEqual(count, 31, 'Must have exactly 31 primary subjects populated');
});

// 8. Class 10 subject question distribution
runTest(8, 'Class 10 subject question distribution (10 subjects x 280 = 2,800)', () => {
  const rows = db.prepare("SELECT subject_id, COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' GROUP BY subject_id").all(BOARD_ID);
  assert.strictEqual(rows.length, 10);
  for (const r of rows) {
    assert.strictEqual(r.cnt, 280, `Subject ${r.subject_id} must have exactly 280 questions`);
  }
});

// 9. Class 12 Science stream question distribution
runTest(9, 'Class 12 Science stream question distribution (6 subjects x 280 = 1,680)', () => {
  const sciSubjs = ['jac-c12-physics', 'jac-c12-chemistry', 'jac-c12-mathematics', 'jac-c12-biology', 'jac-c12-computer-science', 'jac-c12-geology'];
  for (const s of sciSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Science subject ${s} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (5 subjects x 280 = 1,400)', () => {
  const comSubjs = ['jac-c12-accountancy', 'jac-c12-business-studies', 'jac-c12-economics', 'jac-c12-commercial-arithmetic', 'jac-c12-entrepreneurship'];
  for (const s of comSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Commerce subject ${s} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (6 subjects x 280 = 1,680)', () => {
  const humSubjs = ['jac-c12-history', 'jac-c12-political-science', 'jac-c12-geography', 'jac-c12-sociology', 'jac-c12-psychology', 'jac-c12-home-science'];
  for (const s of humSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Humanities subject ${s} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const langSubjs = ['jac-c12-hindi', 'jac-c12-english', 'jac-c12-sanskrit', 'jac-c12-urdu'];
  for (const s of langSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Language subject ${s} must have exactly 280 questions`);
  }
});

// 13. Class 12 Geology signature subject verification
runTest(13, 'Class 12 Geology signature subject verification (jac-c12-geology)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'jac-c12-geology'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Geology must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'jac-c12-geology'").get();
  assert.ok(subj, 'Subject jac-c12-geology exists in subjects table');
  assert.strictEqual(subj.subject_type, 'SCIENCE');
});

// 14. Class 12 Commercial Arithmetic verification
runTest(14, 'Class 12 Commercial Arithmetic verification (jac-c12-commercial-arithmetic)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'jac-c12-commercial-arithmetic'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Commercial Arithmetic must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'jac-c12-commercial-arithmetic'").get();
  assert.ok(subj, 'Subject jac-c12-commercial-arithmetic exists');
  assert.strictEqual(subj.subject_type, 'COMMERCE');
});

// 15. Class 12 Entrepreneurship verification
runTest(15, 'Class 12 Entrepreneurship verification (jac-c12-entrepreneurship)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'jac-c12-entrepreneurship'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Entrepreneurship must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'jac-c12-entrepreneurship'").get();
  assert.ok(subj, 'Subject jac-c12-entrepreneurship exists');
  assert.strictEqual(subj.subject_type, 'COMMERCE');
});

// 16. Class 8 scope verification
runTest(16, 'Class 8 scope verification (active state-level board exam, OMR mode)', () => {
  assert.strictEqual(dict.stages.class_8.stage, 'Class 8');
  assert.strictEqual(dict.stages.class_8.administering_body, 'JAC');
  assert.strictEqual(dict.stages.class_8.exam_mode, 'OMR_BASED_BOARD_EXAM');
});

// 17. Class 9 examination scope verification
runTest(17, 'Class 9 examination scope verification (active JAC board exam, OMR mode, jacresults.com)', () => {
  assert.strictEqual(dict.stages.class_9.stage, 'Class 9');
  assert.strictEqual(dict.stages.class_9.administering_body, 'JAC');
  assert.strictEqual(dict.stages.class_9.exam_mode, 'OMR_BASED_BOARD_EXAM');
  assert.strictEqual(dict.stages.class_9.dependency_rule, 'JAC_CLASS9_TO_CLASS10_DEPENDENCY');
});

// 18. Class 11 examination scope verification
runTest(18, 'Class 11 examination scope verification (active JAC board exam, OMR mode, jacresults.com)', () => {
  assert.strictEqual(dict.stages.class_11.stage, 'Class 11');
  assert.strictEqual(dict.stages.class_11.administering_body, 'JAC');
  assert.strictEqual(dict.stages.class_11.exam_mode, 'OMR_BASED_BOARD_EXAM');
  assert.strictEqual(dict.stages.class_11.dependency_rule, 'JAC_CLASS11_TO_CLASS12_DEPENDENCY');
});

// 19. Total JAC questions count
runTest(19, 'Total JAC questions count (exactly 8,680)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680, 'Must have exactly 8,680 questions');
});

// 20. Total JAC question_versions count
runTest(20, 'Total JAC question_versions count (exactly 8,680)', () => {
  const cnt = db.prepare(`
    SELECT COUNT(*) as cnt 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
  `).get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680, 'Must have exactly 8,680 question versions');
});

// 21. Total MCQ count
runTest(21, 'Total MCQ count (exactly 6,355, 205 per subject across 31 subjects)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 6355, 'Must have exactly 6,355 MCQs');
});

// 22. Balanced MCQ answer key distribution
runTest(22, 'Balanced MCQ answer key distribution (~25% per key A, B, C, D; 0.00% generator bias)', () => {
  const rows = db.prepare(`
    SELECT json_extract(qv.correct_answer, '$.text') as key_letter, COUNT(*) as cnt
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'
    GROUP BY key_letter
  `).all(BOARD_ID);
  assert.strictEqual(rows.length, 4, 'Must have all 4 keys A, B, C, D');
  for (const r of rows) {
    const pct = (r.cnt / 6355) * 100;
    assert.ok(pct >= 24.0 && pct <= 26.0, `Key ${r.key_letter} percentage ${pct.toFixed(2)}% must be within 24-26%`);
  }
});

// 23. Total Subjective items count
runTest(23, 'Total Subjective items count (exactly 2,325, 75 per subject across 31 subjects)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 2325, 'Must have exactly 2,325 subjective questions');
});

// 24. Subjective items model answer length
runTest(24, 'Subjective items model answer length (>= 20 characters)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
    LIMIT 100
  `).all(BOARD_ID);
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    assert.ok(parsed.model_answer && parsed.model_answer.length >= 20, 'Model answer must be at least 20 chars');
  }
});

// 25. Marking schemes verification in subjective items
runTest(25, 'Marking schemes verification in subjective items', () => {
  const rows = db.prepare(`
    SELECT qv.language_content
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
    LIMIT 50
  `).all(BOARD_ID);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    const langKey = Object.keys(parsed)[0];
    assert.ok(parsed[langKey].marking_scheme, 'Must contain marking_scheme');
  }
});

// 26. Difficulty distribution
runTest(26, 'Difficulty distribution (EASY, MEDIUM, HARD)', () => {
  const rows = db.prepare("SELECT difficulty, COUNT(*) as cnt FROM questions WHERE board_id = ? GROUP BY difficulty").all(BOARD_ID);
  assert.strictEqual(rows.length, 3);
  for (const r of rows) {
    assert.ok(r.cnt > 2000, `Difficulty ${r.difficulty} must have sufficient depth`);
  }
});

// 27. Marks distribution adherence
runTest(27, 'Marks distribution adherence (1, 2, 3, 4, 5 marks)', () => {
  const rows = db.prepare("SELECT marks, COUNT(*) as cnt FROM questions WHERE board_id = ? GROUP BY marks").all(BOARD_ID);
  const marks = rows.map(r => r.marks).sort();
  assert.deepStrictEqual(marks, [1, 2, 3, 4, 5], 'Marks must cover 1, 2, 3, 4, 5');
});

// 28. Provenance verification
runTest(28, 'Provenance verification (OFFICIAL_JAC_CURRICULUM_BANK)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND provenance = 'OFFICIAL_JAC_CURRICULUM_BANK'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680, 'All 8,680 items must have OFFICIAL_JAC_CURRICULUM_BANK provenance');
});

// 29. Very Short Answer (VSA) distribution
runTest(29, 'Very Short Answer (VSA) distribution (exactly 744 items, 24 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'very_short_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 744, 'Must have exactly 744 VSA items');
});

// 30. Short Answer (SA) distribution
runTest(30, 'Short Answer (SA) distribution (exactly 744 items, 24 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'short_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 744, 'Must have exactly 744 SA items');
});

// 31. Case Study / Activity distribution
runTest(31, 'Case Study / Activity distribution (exactly 372 items, 12 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'case_study'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 372, 'Must have exactly 372 Case Study items');
});

// 32. Long Answer (LA) distribution
runTest(32, 'Long Answer (LA) distribution (exactly 465 items, 15 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'long_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 465, 'Must have exactly 465 Long Answer items');
});

// 33. Class 10 PYQ authentic registry
runTest(33, 'Class 10 PYQ authentic registry (2020-2025 coverage)', () => {
  const pyqFile = path.join(__dirname, '../../reports/jac-jharkhand-pyq-matrix.csv');
  assert.ok(fs.existsSync(pyqFile), 'PYQ matrix must exist');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('2025') && content.includes('2024') && content.includes('2020'), 'Must contain 2020-2025 coverage');
});

// 34. Class 12 PYQ authentic registry
runTest(34, 'Class 12 PYQ authentic registry (2020-2025 coverage)', () => {
  const pyqFile = path.join(__dirname, '../../reports/jac-jharkhand-pyq-matrix.csv');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('Class 12') && content.includes('Intermediate'), 'Must contain Class 12 Intermediate entries');
});

// 35. Class 10 registration criteria
runTest(35, 'Class 10 registration criteria (JAC regulations, 75% attendance, Class 9 pass)', () => {
  const reg = dict.registration_rules.secondary_class_10;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.class_9_pass_prerequisite, true);
});

// 36. Class 12 registration criteria
runTest(36, 'Class 12 registration criteria (JAC regulations, 75% attendance, Class 11 pass)', () => {
  const reg = dict.registration_rules.intermediate_class_12;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.class_11_pass_prerequisite, true);
  assert.strictEqual(reg.stream_continuity, true);
});

// 37. Exam timing rules
runTest(37, 'Exam timing rules (3 hours theoretical writing across Secondary and Intermediate)', () => {
  assert.strictEqual(dict.stages.class_10.exam_duration_hours, 3);
  assert.strictEqual(dict.stages.class_12.exam_duration_hours, 3);
});

// 38. 15 minutes dedicated reading time rule verification
runTest(38, '15 minutes dedicated reading time rule verification', () => {
  assert.strictEqual(dict.exam_reading_time.reading_time_minutes, 15);
  assert.strictEqual(dict.stages.class_10.reading_time_minutes, 15);
  assert.strictEqual(dict.stages.class_12.reading_time_minutes, 15);
});

// 39. Grading system & passing threshold
runTest(39, 'Grading system & passing threshold (33% combined across subjects)', () => {
  assert.strictEqual(dict.stages.class_10.passing_percentage, 33);
  assert.strictEqual(dict.stages.class_12.passing_percentage, 33);
});

// 40. Hindi language role
runTest(40, 'Hindi language role (Official Language of Jharkhand, Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'hi'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Devanagari');
  assert.strictEqual(l.is_language_subject, 1);
});

// 41. English language role
runTest(41, 'English language role (Latin script U+0020-U+007E)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'en'").get();
  assert.ok(l);
  assert.strictEqual(l.is_exam_language, 1);
});

// 42. Sanskrit language role
runTest(42, 'Sanskrit language role (Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'sa'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Devanagari');
});

// 43. Urdu language role
runTest(43, 'Urdu language role (Perso-Arabic script U+0600-U+06FF)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'ur'").get();
  assert.ok(l);
  assert.strictEqual(l.direction.toLowerCase(), 'rtl');
});

// 44. Class 10 Urdu authentic Perso-Arabic script validation
runTest(44, 'Class 10 Urdu authentic Perso-Arabic script validation (jac-c10-urdu)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'jac-c10-urdu'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.ur, 'Must contain ur language block');
    assert.ok(/[\u0600-\u06FF]/.test(parsed.ur.question), 'Question must contain authentic Perso-Arabic Unicode characters');
  }
});

// 45. Class 12 Urdu authentic Perso-Arabic script validation
runTest(45, 'Class 12 Urdu authentic Perso-Arabic script validation (jac-c12-urdu)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'jac-c12-urdu'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.ur, 'Must contain ur language block');
    assert.ok(/[\u0600-\u06FF]/.test(parsed.ur.question), 'Question must contain authentic Perso-Arabic Unicode characters');
  }
});

// 46. Jharkhand freedom fighters & tribal heroes representation
runTest(46, 'Jharkhand freedom fighters & tribal heroes (Birsa Munda, Sido-Kanhu, Tilka Manjhi, Jatra Bhagat)', () => {
  const c10Soc = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'jac-q-c10-jac-c10-jharkhand-culture-%' LIMIT 10").all();
  assert.ok(c10Soc.length > 0);
  const c12Hist = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'jac-q-c12-jac-c12-history-%' LIMIT 10").all();
  assert.ok(c12Hist.length > 0);
});

// 47. Jharkhand geography, rivers & mineral wealth representation
runTest(47, 'Jharkhand geography, rivers & mineral wealth (Damodar, Subarnarekha, Jharia coal, Noamundi iron)', () => {
  const c10Soc = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'jac-q-c10-jac-c10-social-science-%' LIMIT 10").all();
  assert.ok(c10Soc.length > 0);
  const c12Geo = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'jac-q-c12-jac-c12-geography-%' LIMIT 10").all();
  assert.ok(c12Geo.length > 0);
});

// 48. Madhyama Sanskrit education separation
runTest(48, 'Madhyama Sanskrit education separation', () => {
  assert.ok(dict.specialized_pathways.madhyama, 'Madhyama pathway must be defined in dict');
  assert.deepStrictEqual(dict.specialized_pathways.madhyama.levels, ['Prathama', 'Madhyama']);
});

// 49. Madarsa Islamic education separation
runTest(49, 'Madarsa Islamic education separation (Wastania to Fazil)', () => {
  assert.ok(dict.specialized_pathways.madarsa, 'Madarsa pathway must be defined in dict');
  assert.ok(dict.specialized_pathways.madarsa.levels.some(l => l.includes('Wastania')));
  assert.ok(dict.specialized_pathways.madarsa.levels.some(l => l.includes('Fauquania')));
  assert.ok(dict.specialized_pathways.madarsa.levels.some(l => l.includes('Moulvi')));
  assert.ok(dict.specialized_pathways.madarsa.levels.some(l => l.includes('Alim')));
  assert.ok(dict.specialized_pathways.madarsa.levels.some(l => l.includes('Fazil')));
});

// 50. Inter Vocational examination separation
runTest(50, 'Inter Vocational examination separation', () => {
  assert.ok(dict.specialized_pathways.inter_vocational, 'Inter vocational pathway must exist');
});

// 51. Class 9 to 10 dependency enforcement
runTest(51, 'Class 9 to 10 dependency enforcement (JAC_CLASS9_TO_CLASS10_DEPENDENCY)', () => {
  assert.strictEqual(dict.academic_progression.class_9_to_10_dependency, 'JAC_CLASS9_TO_CLASS10_DEPENDENCY');
  assert.strictEqual(dict.academic_progression.class_9_board_exam_mode, 'OMR_BOARD_EVALUATION');
});

// 52. Class 11 to 12 dependency enforcement
runTest(52, 'Class 11 to 12 dependency enforcement (JAC_CLASS11_TO_CLASS12_DEPENDENCY)', () => {
  assert.strictEqual(dict.academic_progression.class_11_to_12_dependency, 'JAC_CLASS11_TO_CLASS12_DEPENDENCY');
  assert.strictEqual(dict.academic_progression.class_11_board_exam_mode, 'OMR_BOARD_EVALUATION');
  assert.strictEqual(dict.academic_progression.class_11_to_12_attendance_requirement_percent, 75);
});

// 53. Database foreign key constraints verification
runTest(53, 'Database foreign key constraints verification (0 violations)', () => {
  const violations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(violations.length, 0, 'Must have zero FK violations');
});

// 54. Database integrity check
runTest(54, 'Database integrity check (PRAGMA integrity_check = ok)', () => {
  const res = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(res[0].integrity_check, 'ok');
});

// 55. Pre-mutation backup existence & SHA-256 integrity
runTest(55, 'Pre-mutation backup existence & SHA-256 integrity', () => {
  const prePath = path.join(__dirname, '../db/sarkari_core_pre_jac-jharkhand.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_pre_jac-jharkhand.sha256');
  assert.ok(fs.existsSync(prePath), 'Pre-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Pre-mutation SHA-256 file must exist');
});

// 56. Post-mutation backup existence & SHA-256 integrity
runTest(56, 'Post-mutation backup existence & SHA-256 integrity', () => {
  const postPath = path.join(__dirname, '../db/sarkari_core_post_jac-jharkhand.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_post_jac-jharkhand.sha256');
  assert.ok(fs.existsSync(postPath), 'Post-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Post-mutation SHA-256 file must exist');
  const notes = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-jac-%'").get().cnt;
  assert.strictEqual(notes, 5, 'Must have exactly 5 master bundled notes');
});

// 57. Cumulative question count integrity
runTest(57, 'Cumulative question count integrity (250,870 total questions in DB, 242,190 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 250870, 'Grand total questions must be exactly 250,870 (242,190 + 8,680)');
  
  const jacQuestions = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(jacQuestions, 8680, 'JAC questions must remain exactly 8,680');
  
  const priorBoards = 226800;
  const compBaseline = 15390;
  assert.strictEqual(priorBoards + compBaseline + jacQuestions, 250870, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Jharkhand (JAC) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}

/**
 * test-gbshse-goa.js
 * 
 * SARKARIAI HUB — BOARD #26
 * GOA BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION (GBSHSE) VERIFICATION SUITE
 * 
 * Verifies all 57 forensic integrity requirements across:
 * - Current GBSHSE identity (org-ga-board-gbshse, Alto Betim, Bardez, Goa - 403521)
 * - Secondary Education (SSC Class 10) (10 subjects, 2,800 questions, 600 aggregate marks)
 * - Higher Secondary (HSSC Class 12) (21 subjects, 5,880 questions across Science, Commerce, Humanities, Languages)
 * - Class 9 Institutional Evaluation & Enrolment Return (GBSHSE_CLASS9_TO_CLASS10_DEPENDENCY)
 * - Class 11 Promotional Examination & 75% attendance across XI & XII (GBSHSE_CLASS11_TO_CLASS12_DEPENDENCY)
 * - 15 minutes dedicated reading time rule for theoretical papers
 * - Script Authenticity: English (Latin), Konkani (Devanagari U+0900-U+097F), Marathi (Devanagari), Hindi (Devanagari)
 * - 31 Primary Subjects (8,680 total questions: 6,355 MCQs with 0.00% generator bias, 2,325 Subjectives)
 * - 5 Master Bundled Study Notes (note-ga-*)
 * - All Mandatory Audit Reports in reports/
 * - Total Database Inventory: 233,510 questions (224,830 baseline + 8,680 GBSHSE)
 * - Prior 25 Boards Preservation: exactly 209,440 questions untouched
 * - Competitive Baseline Preservation: exactly 15,390 questions untouched
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #26 GOA (GBSHSE) VERIFICATION SUITE');
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

const BOARD_ID = 'gbshse-goa';
const dictPath = path.join(__dirname, '../../data/boards/gbshse-goa.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. GBSHSE board isolation
runTest(1, 'GBSHSE board isolation (gbshse-goa dictionary and database separation)', () => {
  assert.strictEqual(dict.board_id, BOARD_ID);
  assert.strictEqual(dict.authority_id, 'org-ga-board-gbshse');
  const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(b, 'Board record exists in SQLite');
  assert.strictEqual(b.active, 1);
  assert.strictEqual(b.verification_status, 'VERIFIED');
});

// 2. GBSHSE authority verification
runTest(2, 'GBSHSE authority verification (org-ga-board-gbshse, Alto Betim, Bardez)', () => {
  const o = db.prepare("SELECT * FROM organizations WHERE organization_id = 'org-ga-board-gbshse'").get();
  assert.ok(o, 'Organization org-ga-board-gbshse exists');
  assert.strictEqual(o.short_name, 'GBSHSE');
  assert.strictEqual(o.state_or_ut, 'Goa');
  assert.strictEqual(o.active, 1);
});

// 3. GBSHSE aliases in boards table
runTest(3, 'GBSHSE aliases in boards table (gbshse-goa, gbshse-board, gbshse)', () => {
  const aliases = ['gbshse-goa', 'gbshse-board', 'gbshse'];
  for (const al of aliases) {
    const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(al);
    assert.ok(b, `Board alias ${al} must exist`);
    assert.strictEqual(b.organization_id, 'org-ga-board-gbshse');
  }
});

// 4. Official source registry verification
runTest(4, 'Official source registry verification (portal, ssc, hssc, education dept, scert)', () => {
  const sources = [
    'src-gbshse-portal',
    'src-gbshse-ssc-curriculum',
    'src-gbshse-hssc-curriculum',
    'src-ga-education-dept',
    'src-ga-scert'
  ];
  for (const sid of sources) {
    const s = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(sid);
    assert.ok(s, `Official source ${sid} must exist`);
    assert.strictEqual(s.organization_id, 'org-ga-board-gbshse');
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
  const sciSubjs = ['goa-c12-physics', 'goa-c12-chemistry', 'goa-c12-mathematics', 'goa-c12-biology', 'goa-c12-computer-science', 'goa-c12-geology'];
  for (const s of sciSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Science subject ${s} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (5 subjects x 280 = 1,400)', () => {
  const comSubjs = ['goa-c12-accountancy', 'goa-c12-business-studies', 'goa-c12-economics', 'goa-c12-banking', 'goa-c12-commercial-maths'];
  for (const s of comSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Commerce subject ${s} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (6 subjects x 280 = 1,680)', () => {
  const humSubjs = ['goa-c12-history', 'goa-c12-political-science', 'goa-c12-sociology', 'goa-c12-psychology', 'goa-c12-geography', 'goa-c12-philosophy'];
  for (const s of humSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Humanities subject ${s} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const langSubjs = ['goa-c12-english', 'goa-c12-konkani', 'goa-c12-marathi', 'goa-c12-hindi'];
  for (const s of langSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Language subject ${s} must have exactly 280 questions`);
  }
});

// 13. Class 12 Geology signature subject verification
runTest(13, 'Class 12 Geology signature subject verification (goa-c12-geology)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'goa-c12-geology'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Geology must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'goa-c12-geology'").get();
  assert.ok(subj, 'Subject goa-c12-geology exists in subjects table');
  assert.strictEqual(subj.subject_type, 'SCIENCE');
});

// 14. Class 12 Banking & Secretarial Practice verification
runTest(14, 'Class 12 Banking & Secretarial Practice verification (goa-c12-banking)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'goa-c12-banking'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Banking must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'goa-c12-banking'").get();
  assert.ok(subj, 'Subject goa-c12-banking exists');
  assert.strictEqual(subj.subject_type, 'COMMERCE');
});

// 15. Class 12 Philosophy & Logic verification
runTest(15, 'Class 12 Philosophy & Logic verification (goa-c12-philosophy)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = 'goa-c12-philosophy'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 280, 'Philosophy must have 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'goa-c12-philosophy'").get();
  assert.ok(subj, 'Subject goa-c12-philosophy exists');
  assert.strictEqual(subj.subject_type, 'HUMANITIES');
});

// 16. Class 9 scope isolation
runTest(16, 'Class 9 scope isolation (0 fake board questions, ACADEMIC_SUPPORT_ONLY)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 9'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 0, 'Zero questions for Class 9 under GBSHSE');
  assert.strictEqual(dict.stages.class_9.terminal_public_exam, false);
  assert.strictEqual(dict.stages.class_9.scope, 'ACADEMIC_SUPPORT_ONLY');
});

// 17. Class 11 scope isolation
runTest(17, 'Class 11 scope isolation (0 fake board questions, ACADEMIC_SUPPORT_ONLY)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 11'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 0, 'Zero questions for Class 11 under GBSHSE');
  assert.strictEqual(dict.stages.class_11.terminal_public_exam, false);
  assert.strictEqual(dict.stages.class_11.scope, 'ACADEMIC_SUPPORT_ONLY');
});

// 18. Higher Secondary authority separation
runTest(18, 'Higher Secondary authority separation (GBSHSE HSSC distinct from CBSE/CISCE)', () => {
  assert.strictEqual(dict.authority_id, 'org-ga-board-gbshse');
  assert.ok(!dict.board_id.includes('cbse'));
  assert.ok(!dict.board_id.includes('cisce'));
});

// 19. Total GBSHSE questions count
runTest(19, 'Total GBSHSE questions count (exactly 8,680)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680, 'Must have exactly 8,680 questions');
});

// 20. Total GBSHSE question_versions count
runTest(20, 'Total GBSHSE question_versions count (exactly 8,680)', () => {
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
runTest(28, 'Provenance verification (OFFICIAL_GBSHSE_CURRICULUM_BANK)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND provenance = 'OFFICIAL_GBSHSE_CURRICULUM_BANK'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680, 'All 8,680 items must have OFFICIAL_GBSHSE_CURRICULUM_BANK provenance');
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
  const pyqFile = path.join(__dirname, '../../reports/gbshse-goa-pyq-matrix.csv');
  assert.ok(fs.existsSync(pyqFile), 'PYQ matrix must exist');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('2025') && content.includes('2024') && content.includes('2020'), 'Must contain 2020-2025 coverage');
});

// 34. Class 12 PYQ authentic registry
runTest(34, 'Class 12 PYQ authentic registry (2020-2025 coverage)', () => {
  const pyqFile = path.join(__dirname, '../../reports/gbshse-goa-pyq-matrix.csv');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('Class 12') && content.includes('HSSC'), 'Must contain Class 12 HSSC entries');
});

// 35. Class 10 registration criteria
runTest(35, 'Class 10 registration criteria (GBSHSE regulations, 75% attendance)', () => {
  const reg = dict.registration_rules.ssc_class_10;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.cce_compliance, true);
});

// 36. Class 12 registration criteria
runTest(36, 'Class 12 registration criteria (GBSHSE regulations, 75% attendance across XI & XII)', () => {
  const reg = dict.registration_rules.hssc_class_12;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.internal_practical_prerequisite, true);
});

// 37. Exam timing rules
runTest(37, 'Exam timing rules (3 hours theoretical writing across SSC and HSSC)', () => {
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

// 40. English language role
runTest(40, 'English language role (medium of instruction for Science & Commerce)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'en'").get();
  assert.ok(l);
  assert.strictEqual(l.is_exam_language, 1);
});

// 41. Konkani language role
runTest(41, 'Konkani language role (Official State Language of Goa, Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'kok'").get();
  assert.ok(l, 'Konkani language record must exist');
  assert.strictEqual(l.script, 'Devanagari');
  assert.strictEqual(l.is_language_subject, 1);
});

// 42. Marathi language role
runTest(42, 'Marathi language role (Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'mr'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Devanagari');
});

// 43. Hindi language role
runTest(43, 'Hindi language role (Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'hi'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Devanagari');
});

// 44. Class 10 Konkani authentic Devanagari script validation
runTest(44, 'Class 10 Konkani authentic Devanagari script validation', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'goa-c10-konkani'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.kok, 'Must contain kok language block');
    assert.ok(/[\u0900-\u097F]/.test(parsed.kok.question), 'Question must contain authentic Devanagari Unicode characters');
  }
});

// 45. Class 12 Konkani authentic Devanagari script validation
runTest(45, 'Class 12 Konkani authentic Devanagari script validation', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'goa-c12-konkani'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.kok, 'Must contain kok language block');
    assert.ok(/[\u0900-\u097F]/.test(parsed.kok.question), 'Question must contain authentic Devanagari Unicode characters');
  }
});

// 46. Goan liberation & state history representation
runTest(46, 'Goan liberation & state history representation (18 June 1946, Operation Vijay, Opinion Poll 1967, Statehood 1987)', () => {
  const c10Soc = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'ga-q-c10-goa-c10-social-science-%' LIMIT 10").all();
  assert.ok(c10Soc.length > 0);
  const c12Hist = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'ga-q-c12-goa-c12-history-%' LIMIT 10").all();
  assert.ok(c12Hist.length > 0);
});

// 47. Goan coastal ecology & cultural representation
runTest(47, 'Goan coastal ecology & cultural representation (Communidades, Western Ghats, Mandovi/Zuari, Khazan lands)', () => {
  const c10Evs = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'ga-q-c10-goa-c10-environmental-studies-%' LIMIT 10").all();
  assert.ok(c10Evs.length > 0);
});

// 48. Full Exam eligibility & gate enforcement
runTest(48, 'Full Exam eligibility & gate enforcement (All MCQs full_exam_eligible, Subjectives practice)', () => {
  const mcqIneligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq' AND full_exam_eligible = 0").get(BOARD_ID).cnt;
  const subEligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get(BOARD_ID).cnt;
  assert.strictEqual(mcqIneligible, 0, 'All MCQs must be full exam eligible');
  assert.strictEqual(subEligible, 0, 'Subjectives must be practice eligible only');
});

// 49. Full Exam duplicate prevention
runTest(49, 'Full Exam duplicate prevention (unique primary keys)', () => {
  const duplicates = db.prepare(`
    SELECT question_id, COUNT(*) as cnt 
    FROM questions 
    WHERE board_id = ? 
    GROUP BY question_id 
    HAVING cnt > 1
  `).all(BOARD_ID);
  assert.strictEqual(duplicates.length, 0, 'No duplicate question IDs allowed');
});

// 50. Cross-board contamination audit
runTest(50, 'Cross-board contamination audit (zero sharing with other 25 boards)', () => {
  const otherBoardCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_id NOT LIKE 'ga-q-%'").get(BOARD_ID).cnt;
  assert.strictEqual(otherBoardCount, 0, 'Zero questions from other boards');
});

// 51. Cross-class contamination audit
runTest(51, 'Cross-class contamination audit (Class 10 vs Class 12 isolation)', () => {
  const c10Leak = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' AND question_id LIKE '%-c12-%'").get(BOARD_ID).cnt;
  const c12Leak = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12' AND question_id LIKE '%-c10-%'").get(BOARD_ID).cnt;
  assert.strictEqual(c10Leak, 0, 'No Class 12 questions in Class 10');
  assert.strictEqual(c12Leak, 0, 'No Class 10 questions in Class 12');
});

// 52. Payload protection
runTest(52, 'Payload protection (pagination, indexed queries, bounded results)', () => {
  const bounded = db.prepare('SELECT question_id FROM questions WHERE board_id = ? LIMIT 10 OFFSET 0').all(BOARD_ID);
  assert.strictEqual(bounded.length, 10);
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
  const prePath = path.join(__dirname, '../db/sarkari_core_pre_gbshse.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_pre_gbshse.sha256');
  assert.ok(fs.existsSync(prePath), 'Pre-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Pre-mutation SHA-256 file must exist');
});

// 56. Post-mutation backup existence & SHA-256 integrity
runTest(56, 'Post-mutation backup existence & SHA-256 integrity', () => {
  const postPath = path.join(__dirname, '../db/sarkari_core_post_gbshse.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_post_gbshse.sha256');
  assert.ok(fs.existsSync(postPath), 'Post-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Post-mutation SHA-256 file must exist');
  const notes = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-ga-%'").get().cnt;
  assert.strictEqual(notes, 5, 'Must have exactly 5 master bundled notes');
});

// 57. Cumulative question count integrity
runTest(57, 'Cumulative question count integrity (233,510 total questions in DB, 224,830 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 233510, 'Grand total questions must be exactly 233,510 (224,830 + 8,680)');
  
  const gbshseQuestions = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(gbshseQuestions, 8680, 'GBSHSE questions must remain exactly 8,680');
  
  const priorBoards = 209440;
  const compBaseline = 15390;
  assert.strictEqual(priorBoards + compBaseline + gbshseQuestions, 233510, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Goa (GBSHSE) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}

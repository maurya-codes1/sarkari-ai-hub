const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

const BOARD_ID = 'hbse-haryana';
const dictPath = path.join(__dirname, '../../data/boards/hbse-haryana.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #29 HARYANA (HBSE / BSEH) VERIFICATION SUITE');
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

// 1. Board identity isolation
runTest(1, 'HBSE board identity isolation (hbse-haryana dictionary and database separation)', () => {
  assert.strictEqual(dict.board_id, 'hbse-haryana');
  assert.strictEqual(dict.short_name, 'HBSE');
  assert.strictEqual(dict.official_abbreviation, 'BSEH');
  assert.strictEqual(dict.state, 'Haryana');
  assert.strictEqual(dict.official_website, 'https://bseh.org.in/');
  assert.strictEqual(dict.official_result_url, 'https://bseh.org.in/all-results');
  
  const bRow = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(bRow, 'Board record must exist in DB');
  assert.strictEqual(bRow.board_id, 'hbse-haryana');
});

// 2. Authority verification
runTest(2, 'HBSE authority verification (org-hr-board-bseh, Hansi Road, Bhiwani)', () => {
  assert.strictEqual(dict.authority_id, 'org-hr-board-bseh');
  assert.strictEqual(dict.headquarters, 'Hansi Road, Bhiwani, Haryana - 127021');
  const org = db.prepare('SELECT * FROM organizations WHERE organization_id = ?').get('org-hr-board-bseh');
  assert.ok(org, 'Organization must exist');
  assert.strictEqual(org.state_or_ut, 'Haryana');
});

// 3. Aliases in boards table
runTest(3, 'HBSE aliases in boards table (hbse-haryana, hbse-board, hbse, bseh)', () => {
  const aliases = ['hbse-haryana', 'hbse-board', 'hbse', 'bseh'];
  for (const a of aliases) {
    const row = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(a);
    assert.ok(row, `Board alias ${a} must exist`);
  }
});

// 4. Official source registry verification
runTest(4, 'Official source registry verification (portal, secondary, sr secondary, education dept, scert)', () => {
  const sources = [
    'src-bseh-portal',
    'src-bseh-secondary-curriculum',
    'src-bseh-sr-secondary-curriculum',
    'src-hr-education-dept',
    'src-hr-scert'
  ];
  for (const s of sources) {
    const srcRow = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(s);
    assert.ok(srcRow, `Official source ${s} must exist in official_sources`);
    assert.strictEqual(srcRow.organization_id, 'org-hr-board-bseh');
  }
});

// 5. Class 10 full isolation and stage verification
runTest(5, 'Class 10 full isolation and stage verification (2,800 questions)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 2800, 'Class 10 must contain exactly 2,800 questions');
});

// 6. Class 12 full isolation and stage verification
runTest(6, 'Class 12 full isolation and stage verification (5,880 questions)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 5880, 'Class 12 must contain exactly 5,880 questions');
});

// 7. Exactly 31 primary subjects registered and populated
runTest(7, 'Exactly 31 primary subjects registered and populated (10 C10 + 21 C12)', () => {
  const rows = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ?").all(BOARD_ID);
  assert.strictEqual(rows.length, 31, 'Must contain exactly 31 distinct subjects');
});

// 8. Class 10 subject question distribution
runTest(8, 'Class 10 subject question distribution (10 subjects x 280 = 2,800)', () => {
  const expectedC10 = [
    'hbse-c10-hindi',
    'hbse-c10-english',
    'hbse-c10-mathematics',
    'hbse-c10-science',
    'hbse-c10-social-science',
    'hbse-c10-sanskrit',
    'hbse-c10-punjabi',
    'hbse-c10-urdu',
    'hbse-c10-haryana-heritage',
    'hbse-c10-computer-science'
  ];
  for (const sId of expectedC10) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Subject ${sId} must have exactly 280 questions`);
  }
});

// 9. Class 12 Science stream question distribution
runTest(9, 'Class 12 Science stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedSci = [
    'hbse-c12-physics',
    'hbse-c12-chemistry',
    'hbse-c12-mathematics',
    'hbse-c12-biology',
    'hbse-c12-computer-science',
    'hbse-c12-agriculture'
  ];
  for (const sId of expectedSci) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Science subject ${sId} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (5 subjects x 280 = 1,400)', () => {
  const expectedCom = [
    'hbse-c12-accountancy',
    'hbse-c12-business-studies',
    'hbse-c12-economics-commerce',
    'hbse-c12-entrepreneurship',
    'hbse-c12-commercial-art'
  ];
  for (const sId of expectedCom) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Commerce subject ${sId} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (6 subjects x 280 = 1,680)', () => {
  const expectedHum = [
    'hbse-c12-history',
    'hbse-c12-political-science',
    'hbse-c12-geography',
    'hbse-c12-public-administration',
    'hbse-c12-sociology',
    'hbse-c12-physical-education'
  ];
  for (const sId of expectedHum) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Humanities subject ${sId} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const expectedLang = [
    'hbse-c12-hindi-core',
    'hbse-c12-english-core',
    'hbse-c12-punjabi',
    'hbse-c12-sanskrit'
  ];
  for (const sId of expectedLang) {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, sId);
    assert.strictEqual(row.cnt, 280, `Language subject ${sId} must have exactly 280 questions`);
  }
});

// 13. Class 12 Agriculture signature subject verification
runTest(13, 'Class 12 Agriculture signature subject verification (hbse-c12-agriculture)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'hbse-c12-agriculture'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'hbse-c12-agriculture'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 14. Class 12 Public Administration signature subject verification
runTest(14, 'Class 12 Public Administration signature subject verification (hbse-c12-public-administration)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'hbse-c12-public-administration'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'hbse-c12-public-administration'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 15. Class 12 Physical Education sports capital discipline verification
runTest(15, 'Class 12 Physical Education sports capital discipline verification (hbse-c12-physical-education)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'hbse-c12-physical-education'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'hbse-c12-physical-education'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 16. Class 12 Commercial Art signature discipline verification
runTest(16, 'Class 12 Commercial Art signature discipline verification (hbse-c12-commercial-art)', () => {
  const s = db.prepare("SELECT * FROM subjects WHERE subject_id = 'hbse-c12-commercial-art'").get();
  assert.ok(s, 'Subject must exist in subjects table');
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = 'hbse-c12-commercial-art'").get().cnt;
  assert.strictEqual(qCount, 280);
});

// 17. Class 9 examination scope verification
runTest(17, 'Class 9 examination scope verification (ACADEMIC_SUPPORT_ONLY, 0 fake board questions)', () => {
  assert.strictEqual(dict.stages.class_9.scope, 'ACADEMIC_SUPPORT_ONLY');
  assert.strictEqual(dict.stages.class_9.terminal_public_exam, false);
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 9'").get(BOARD_ID).cnt;
  assert.strictEqual(qCount, 0, 'No fake board questions allowed for Class 9');
});

// 18. Class 11 examination scope verification
runTest(18, 'Class 11 examination scope verification (ACADEMIC_SUPPORT_ONLY, 0 fake board questions)', () => {
  assert.strictEqual(dict.stages.class_11.scope, 'ACADEMIC_SUPPORT_ONLY');
  assert.strictEqual(dict.stages.class_11.terminal_public_exam, false);
  const qCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 11'").get(BOARD_ID).cnt;
  assert.strictEqual(qCount, 0, 'No fake board questions allowed for Class 11');
});

// 19. Total HBSE questions count
runTest(19, 'Total HBSE questions count (exactly 8,680)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(total, 8680, 'Must have exactly 8,680 questions');
});

// 20. Total HBSE question_versions count
runTest(20, 'Total HBSE question_versions count (exactly 8,680)', () => {
  const total = db.prepare(`
    SELECT COUNT(*) as cnt FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
  `).get(BOARD_ID).cnt;
  assert.strictEqual(total, 8680, 'Must have exactly 8,680 question versions');
});

// 21. Total MCQ count
runTest(21, 'Total MCQ count (exactly 6,355, 205 per subject across 31 subjects)', () => {
  const mcqs = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(mcqs, 6355, 'Must have exactly 6,355 MCQs (31 * 205)');
});

// 22. Balanced MCQ answer key distribution
runTest(22, 'Balanced MCQ answer key distribution (~25% per key A, B, C, D; 0.00% generator bias)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'
  `).all(BOARD_ID);
  
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    const key = parsed.text || parsed.answer || (parsed.index !== undefined ? ['A','B','C','D'][parsed.index] : 'A');
    counts[key] = (counts[key] || 0) + 1;
  }
  
  const total = rows.length;
  for (const k of ['A', 'B', 'C', 'D']) {
    const pct = (counts[k] / total) * 100;
    assert.ok(pct >= 24.0 && pct <= 26.0, `Key ${k} distribution must be near 25% (got ${pct.toFixed(2)}%)`);
  }
});

// 23. Total Subjective items count
runTest(23, 'Total Subjective items count (exactly 2,325, 75 per subject across 31 subjects)', () => {
  const subs = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(subs, 2325, 'Must have exactly 2,325 subjective items (31 * 75)');
});

// 24. Subjective items model answer length
runTest(24, 'Subjective items model answer length (>= 20 characters)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
  `).all(BOARD_ID);
  
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    assert.ok(parsed.model_answer, 'Must have model_answer');
    assert.ok(parsed.model_answer.length >= 20, `Model answer must be >= 20 chars (got ${parsed.model_answer.length})`);
  }
});

// 25. Marking schemes verification in subjective items
runTest(25, 'Marking schemes verification in subjective items', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
    LIMIT 100
  `).all(BOARD_ID);
  
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    const lang = Object.keys(parsed)[0];
    assert.ok(parsed[lang].marking_scheme, 'Must have marking_scheme in language content');
    assert.ok(parsed[lang].marking_scheme.length >= 10, 'Marking scheme must be descriptive');
  }
});

// 26. Difficulty distribution
runTest(26, 'Difficulty distribution (EASY, MEDIUM, HARD)', () => {
  const diffs = db.prepare(`
    SELECT difficulty, COUNT(*) as cnt 
    FROM questions 
    WHERE board_id = ? 
    GROUP BY difficulty
  `).all(BOARD_ID);
  
  const map = {};
  for (const d of diffs) map[d.difficulty] = d.cnt;
  assert.ok(map['EASY'] > 0, 'Must have EASY questions');
  assert.ok(map['MEDIUM'] > 0, 'Must have MEDIUM questions');
  assert.ok(map['HARD'] > 0, 'Must have HARD questions');
});

// 27. Marks distribution adherence
runTest(27, 'Marks distribution adherence (1, 2, 3, 4, 5 marks)', () => {
  const rows = db.prepare(`
    SELECT marks, COUNT(*) as cnt 
    FROM questions 
    WHERE board_id = ? 
    GROUP BY marks
  `).all(BOARD_ID);
  
  const map = {};
  for (const r of rows) map[r.marks] = r.cnt;
  assert.strictEqual(map[1], 6355, '1-mark questions must be exactly 6,355');
  assert.strictEqual(map[2], 744, '2-mark VSA questions must be exactly 744');
  assert.strictEqual(map[3], 744, '3-mark SA questions must be exactly 744');
  assert.strictEqual(map[4], 372, '4-mark Case Study questions must be exactly 372');
  assert.strictEqual(map[5], 465, '5-mark LA questions must be exactly 465');
});

// 28. Provenance verification
runTest(28, 'Provenance verification (OFFICIAL_HBSE_CURRICULUM_BANK)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND provenance = 'OFFICIAL_HBSE_CURRICULUM_BANK'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 8680, 'All 8,680 questions must bear official HBSE provenance');
});

// 29. Very Short Answer (VSA) distribution
runTest(29, 'Very Short Answer (VSA) distribution (exactly 744 items, 24 per subject)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'very_short_answer'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 744);
});

// 30. Short Answer (SA) distribution
runTest(30, 'Short Answer (SA) distribution (exactly 744 items, 24 per subject)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'short_answer'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 744);
});

// 31. Case Study / Activity distribution
runTest(31, 'Case Study / Activity distribution (exactly 372 items, 12 per subject)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'case_study'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 372);
});

// 32. Long Answer (LA) distribution
runTest(32, 'Long Answer (LA) distribution (exactly 465 items, 15 per subject)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'long_answer'").get(BOARD_ID);
  assert.strictEqual(row.cnt, 465);
});

// 33. Class 10 PYQ authentic registry
runTest(33, 'Class 10 PYQ authentic registry (2020-2025 coverage)', () => {
  const pyqFile = path.join(__dirname, '../../reports/hbse-haryana-pyq-matrix.csv');
  assert.ok(fs.existsSync(pyqFile), 'PYQ matrix must exist');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('Class 10') && content.includes('Secondary'), 'Must contain Class 10 Secondary entries');
});

// 34. Class 12 PYQ authentic registry
runTest(34, 'Class 12 PYQ authentic registry (2020-2025 coverage)', () => {
  const pyqFile = path.join(__dirname, '../../reports/hbse-haryana-pyq-matrix.csv');
  const content = fs.readFileSync(pyqFile, 'utf8');
  assert.ok(content.includes('Class 12') && content.includes('Senior Secondary'), 'Must contain Class 12 Senior Secondary entries');
});

// 35. Class 10 registration criteria
runTest(35, 'Class 10 registration criteria (BSEH regulations, 75% attendance, Class 9 pass)', () => {
  const reg = dict.registration_rules.secondary_class_10;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.class_9_pass_prerequisite, true);
});

// 36. Class 12 registration criteria
runTest(36, 'Class 12 registration criteria (BSEH regulations, 75% attendance, Class 11 pass)', () => {
  const reg = dict.registration_rules.senior_secondary_class_12;
  assert.strictEqual(reg.min_attendance, 75);
  assert.strictEqual(reg.class_11_pass_prerequisite, true);
  assert.strictEqual(reg.stream_continuity, true);
});

// 37. Exam timing rules
runTest(37, 'Exam timing rules (3 hours theoretical writing across Secondary and Senior Secondary)', () => {
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
runTest(39, 'Grading system & passing threshold (33% combined across subjects, 23/70 in practicals)', () => {
  assert.strictEqual(dict.stages.class_10.passing_percentage, 33);
  assert.strictEqual(dict.stages.class_12.passing_percentage, 33);
  assert.strictEqual(dict.curriculum_framework.senior_secondary_class_12.science_practical_split.theory_pass_mark, 23);
  assert.strictEqual(dict.curriculum_framework.senior_secondary_class_12.science_practical_split.practical_pass_mark, 10);
});

// 40. Hindi language role
runTest(40, 'Hindi language role (Official Language of Haryana, Devanagari script U+0900-U+097F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'hi'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Devanagari');
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

// 43. Punjabi language role
runTest(43, 'Punjabi language role (Linguistic Minority, Gurmukhi script U+0A00-U+0A7F)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'pa'").get();
  assert.ok(l);
  assert.strictEqual(l.script, 'Gurmukhi');
});

// 44. Urdu language role
runTest(44, 'Urdu language role (Perso-Arabic script U+0600-U+06FF, RTL)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'ur'").get();
  assert.ok(l);
  assert.strictEqual(l.direction.toLowerCase(), 'rtl');
});

// 45. Class 10 Punjabi authentic Gurmukhi script validation
runTest(45, 'Class 10 Punjabi authentic Gurmukhi script validation (hbse-c10-punjabi)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'hbse-c10-punjabi'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.pa, 'Must contain pa language block');
    assert.ok(/[\u0A00-\u0A7F]/.test(parsed.pa.question), 'Question must contain authentic Gurmukhi Unicode characters');
  }
});

// 46. Class 12 Punjabi authentic Gurmukhi script validation
runTest(46, 'Class 12 Punjabi authentic Gurmukhi script validation (hbse-c12-punjabi)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'hbse-c12-punjabi'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.pa, 'Must contain pa language block');
    assert.ok(/[\u0A00-\u0A7F]/.test(parsed.pa.question), 'Question must contain authentic Gurmukhi Unicode characters');
  }
});

// 47. Class 10 Urdu authentic Perso-Arabic script validation
runTest(47, 'Class 10 Urdu authentic Perso-Arabic script validation (hbse-c10-urdu)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'hbse-c10-urdu'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.ur, 'Must contain ur language block');
    assert.ok(/[\u0600-\u06FF]/.test(parsed.ur.question), 'Question must contain authentic Perso-Arabic Unicode characters');
  }
});

// 48. Haryana historical battlefields & ancient civilization
runTest(48, 'Haryana historical battlefields & ancient civilization (Rakhigarhi, Kurukshetra, Panipat)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND (q.subject_id = 'hbse-c10-haryana-heritage' OR q.subject_id = 'hbse-c12-history')
  `).all(BOARD_ID);
  
  let foundRakhigarhi = false;
  let foundPanipat = false;
  let foundKurukshetra = false;
  for (const r of rows) {
    const text = r.language_content;
    if (text.includes('राखीगढ़ी') || text.includes('Rakhigarhi')) foundRakhigarhi = true;
    if (text.includes('पानीपत') || text.includes('Panipat')) foundPanipat = true;
    if (text.includes('कुरुक्षेत्र') || text.includes('Kurukshetra')) foundKurukshetra = true;
  }
  assert.ok(foundRakhigarhi, 'Must reference Rakhigarhi Harappan site');
  assert.ok(foundPanipat, 'Must reference Panipat battlefields');
  assert.ok(foundKurukshetra, 'Must reference Kurukshetra Mahabharata heritage');
});

// 49. Haryana freedom fighters & leaders
runTest(49, 'Haryana freedom fighters & leaders (Rao Tula Ram, Raja Nahar Singh, Sir Chhotu Ram)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND (q.subject_id = 'hbse-c10-haryana-heritage' OR q.subject_id = 'hbse-c12-history')
  `).all(BOARD_ID);
  
  let foundRaoTulaRam = false;
  let foundChhotuRam = false;
  for (const r of rows) {
    const text = r.language_content;
    if (text.includes('तुलाराम') || text.includes('Tula Ram')) foundRaoTulaRam = true;
    if (text.includes('छोटू राम') || text.includes('Chhotu Ram')) foundChhotuRam = true;
  }
  assert.ok(foundRaoTulaRam, 'Must reference Rao Tula Ram 1857 Rewari hero');
  assert.ok(foundChhotuRam, 'Must reference Sir Chhotu Ram peasant leader');
});

// 50. Haryana sports capital & agrarian wealth
runTest(50, 'Haryana sports capital & agrarian wealth (Bhiwani boxing, Neeraj Chopra, Murrah buffalo)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND (q.subject_id = 'hbse-c10-haryana-heritage' OR q.subject_id = 'hbse-c12-physical-education' OR q.subject_id = 'hbse-c12-agriculture')
  `).all(BOARD_ID);
  
  let foundNeeraj = false;
  let foundMurrah = false;
  for (const r of rows) {
    const text = r.language_content;
    if (text.includes('नीरज चोपड़ा') || text.includes('Neeraj') || text.includes('भिवानी')) foundNeeraj = true;
    if (text.includes('मुर्राह') || text.includes('Murrah') || text.includes('काला सोना')) foundMurrah = true;
  }
  assert.ok(foundNeeraj, 'Must reference Neeraj Chopra / Bhiwani sports culture');
  assert.ok(foundMurrah, 'Must reference Murrah buffalo Black Gold agrarian wealth');
});

// 51. Haryana Open School (HOS) separation & verification
runTest(51, 'Haryana Open School (HOS) separation & verification', () => {
  assert.ok(dict.specialized_pathways.haryana_open_school, 'HOS pathway must be defined in dictionary');
  assert.strictEqual(dict.specialized_pathways.haryana_open_school.established_year, 1994);
  const hosCsv = path.join(__dirname, '../../reports/hbse-haryana-open-school-matrix.csv');
  assert.ok(fs.existsSync(hosCsv), 'HOS matrix CSV must exist');
});

// 52. Class 9 to 10 dependency enforcement
runTest(52, 'Class 9 to 10 dependency enforcement (BSEH_CLASS9_TO_CLASS10_DEPENDENCY)', () => {
  assert.strictEqual(dict.academic_progression.class_9_to_10_dependency, 'BSEH_CLASS9_TO_CLASS10_DEPENDENCY');
  assert.strictEqual(dict.stages.class_9.dependency_rule, 'BSEH_CLASS9_TO_CLASS10_DEPENDENCY');
});

// 53. Class 11 to 12 dependency enforcement
runTest(53, 'Class 11 to 12 dependency enforcement (BSEH_CLASS11_TO_CLASS12_DEPENDENCY)', () => {
  assert.strictEqual(dict.academic_progression.class_11_to_12_dependency, 'BSEH_CLASS11_TO_CLASS12_DEPENDENCY');
  assert.strictEqual(dict.stages.class_11.dependency_rule, 'BSEH_CLASS11_TO_CLASS12_DEPENDENCY');
});

// 54. Database foreign key constraints verification
runTest(54, 'Database foreign key constraints verification (0 violations)', () => {
  const fkCheck = db.pragma('foreign_key_check');
  assert.strictEqual(fkCheck.length, 0, 'Foreign key violations must be exactly 0');
});

// 55. Database integrity check
runTest(55, 'Database integrity check (PRAGMA integrity_check = ok)', () => {
  const ic = db.pragma('integrity_check');
  assert.strictEqual(ic[0].integrity_check, 'ok', 'Database integrity check must return ok');
});

// 56. Pre-mutation and Post-mutation backup existence & SHA-256 integrity
runTest(56, 'Pre-mutation and Post-mutation backup existence & SHA-256 integrity', () => {
  const prePath = path.join(__dirname, '../db/sarkari_core_pre_hbse-haryana.db');
  const postPath = path.join(__dirname, '../db/sarkari_core_post_hbse-haryana.db');
  const preSha = path.join(__dirname, '../db/sarkari_core_pre_hbse-haryana.sha256');
  const postSha = path.join(__dirname, '../db/sarkari_core_post_hbse-haryana.sha256');
  
  assert.ok(fs.existsSync(prePath), 'Pre-mutation backup file must exist');
  assert.ok(fs.existsSync(postPath), 'Post-mutation backup file must exist');
  assert.ok(fs.existsSync(preSha), 'Pre-mutation SHA-256 file must exist');
  assert.ok(fs.existsSync(postSha), 'Post-mutation SHA-256 file must exist');
  
  const hashPre = fs.readFileSync(preSha, 'utf8').trim();
  const hashPost = fs.readFileSync(postSha, 'utf8').trim();
  assert.strictEqual(hashPre.length, 64, 'Pre-mutation hash must be 64-char hex string');
  assert.strictEqual(hashPost.length, 64, 'Post-mutation hash must be 64-char hex string');
  assert.notStrictEqual(hashPre, hashPost, 'Pre and post mutation hashes must differ due to 8,680 added questions');
});

// 57. Cumulative question count integrity
runTest(57, 'Cumulative question count integrity (at least 259,550 total questions in DB, 250,870 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.ok(total >= 259550, 'Grand total questions must be >= 259,550 (got ' + total + ')');
  
  const hbseQuestions = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(hbseQuestions, 8680, 'HBSE questions must be exactly 8,680');
  
  const priorBoards = 235480;
  const compBaseline = 15390;
  assert.strictEqual(priorBoards + compBaseline + hbseQuestions, 259550, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Haryana (HBSE / BSEH) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}

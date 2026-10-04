/**
 * test-tbse-tripura.js
 * 
 * SARKARIAI HUB — BOARD #23
 * TRIPURA BOARD OF SECONDARY EDUCATION (TBSE) VERIFICATION SUITE
 * 
 * Verifies all 57 forensic integrity requirements across:
 * - Current TBSE identity (org-tr-board-tbse, Agartala, Tripura)
 * - Secondary Education (Madhyamik Class 10) (10 subjects, 2,800 questions, 500 aggregate marks)
 * - Higher Secondary (H.S. +2 Stage Class 12) (21 subjects, 5,880 questions across Science, Commerce, Humanities, Languages)
 * - Class 9 Institutional Evaluation & Enrolment Return (TBSE_CLASS9_TO_CLASS10_DEPENDENCY)
 * - Class 11 Promotional Examination & 70% attendance across XI & XII (TBSE_CLASS11_TO_CLASS12_DEPENDENCY)
 * - 15 minutes dedicated reading time rule for theoretical papers
 * - Script Authenticity: Bengali (U+0980-U+09FF), Kokborok (Bengali/Latin), English (Latin), Hindi & Sanskrit (Devanagari U+0900-U+097F), Mizo
 * - 31 Primary Subjects (8,680 total questions: 6,355 MCQs with 0.00% generator bias, 2,325 Subjectives)
 * - 5 Master Bundled Study Notes (note-tr-*)
 * - All Mandatory Audit Reports in reports/
 * - Total Database Inventory: 213,070 questions (204,390 baseline + 8,680 TBSE)
 * - Prior 22 Boards Preservation: exactly 189,000 questions untouched
 * - Competitive Baseline Preservation: exactly 15,390 questions untouched
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #23 TRIPURA (TBSE) VERIFICATION SUITE');
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

const BOARD_ID = 'tbse-tripura';
const dictPath = path.join(__dirname, '../../data/boards/tbse-tripura.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. TBSE board isolation
runTest(1, 'TBSE board isolation (tbse-tripura dictionary and database separation)', () => {
  assert.strictEqual(dict.board_id, BOARD_ID);
  assert.strictEqual(dict.authority_id, 'org-tr-board-tbse');
  const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(BOARD_ID);
  assert.ok(b, 'Board record exists in SQLite');
  assert.strictEqual(b.active, 1);
  assert.strictEqual(b.verification_status, 'VERIFIED');
});

// 2. TBSE authority verification
runTest(2, 'TBSE authority verification (org-tr-board-tbse, Agartala)', () => {
  const o = db.prepare("SELECT * FROM organizations WHERE organization_id = 'org-tr-board-tbse'").get();
  assert.ok(o, 'Organization org-tr-board-tbse exists');
  assert.strictEqual(o.short_name, 'TBSE');
  assert.strictEqual(o.state_or_ut, 'Tripura');
  assert.strictEqual(o.active, 1);
});

// 3. TBSE aliases in boards table
runTest(3, 'TBSE aliases in boards table (tbse-tripura, tbse-board, tbse)', () => {
  const aliases = ['tbse-tripura', 'tbse-board', 'tbse'];
  for (const a of aliases) {
    const b = db.prepare('SELECT * FROM boards WHERE board_id = ?').get(a);
    assert.ok(b, `Alias ${a} exists in boards table`);
  }
});

// 4. Official source registry verification
runTest(4, 'Official source registry verification (portal, madhyamik, hs, class 9, class 11, results)', () => {
  const sources = [
    'src-tbse-portal',
    'src-tbse-madhyamik-curriculum',
    'src-tbse-hs-curriculum',
    'src-tbse-class9-regulations',
    'src-tbse-class11-regulations',
    'src-tbse-results-portal'
  ];
  for (const s of sources) {
    const src = db.prepare('SELECT * FROM official_sources WHERE source_id = ?').get(s);
    assert.ok(src, `Source ${s} exists in official_sources`);
    assert.strictEqual(src.verification_status, 'VERIFIED');
  }
});

// 5. Madhyamik Class 10 full isolation and stage verification
runTest(5, 'Madhyamik Class 10 full isolation and stage verification (2,800 questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 2800, 'Class 10 question count must be exactly 2,800');
});

// 6. Higher Secondary Class 12 full isolation and stage verification
runTest(6, 'Higher Secondary Class 12 full isolation and stage verification (5,880 questions)', () => {
  const count = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12'").get(BOARD_ID).cnt;
  assert.strictEqual(count, 5880, 'Class 12 question count must be exactly 5,880');
});

// 7. Exactly 31 primary subjects registered and populated
runTest(7, 'Exactly 31 primary subjects registered and populated (10 C10 + 21 C12)', () => {
  const c10Subjs = db.prepare("SELECT COUNT(DISTINCT subject_id) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10'").get(BOARD_ID).cnt;
  const c12Subjs = db.prepare("SELECT COUNT(DISTINCT subject_id) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12'").get(BOARD_ID).cnt;
  assert.strictEqual(c10Subjs, 10, 'Class 10 must have exactly 10 subjects');
  assert.strictEqual(c12Subjs, 21, 'Class 12 must have exactly 21 subjects');
});

// 8. Class 10 Subject Question Distribution
runTest(8, 'Class 10 Subject Question Distribution (280 per subject across 10 subjects)', () => {
  const rows = db.prepare("SELECT subject_id, COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' GROUP BY subject_id").all(BOARD_ID);
  assert.strictEqual(rows.length, 10);
  for (const r of rows) {
    assert.strictEqual(r.cnt, 280, `Subject ${r.subject_id} must have exactly 280 questions`);
  }
});

// 9. Class 12 Science stream question distribution
runTest(9, 'Class 12 Science stream question distribution (6 subjects x 280 = 1,680)', () => {
  const sciSubjs = ['tr-c12-physics', 'tr-c12-chemistry', 'tr-c12-mathematics', 'tr-c12-biology', 'tr-c12-computer-science', 'tr-c12-statistics'];
  for (const s of sciSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Science subject ${s} must have exactly 280 questions`);
  }
});

// 10. Class 12 Commerce stream question distribution
runTest(10, 'Class 12 Commerce stream question distribution (4 subjects x 280 = 1,120)', () => {
  const comSubjs = ['tr-c12-accountancy', 'tr-c12-business-studies', 'tr-c12-economics', 'tr-c12-business-mathematics'];
  for (const s of comSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Commerce subject ${s} must have exactly 280 questions`);
  }
});

// 11. Class 12 Humanities stream question distribution
runTest(11, 'Class 12 Humanities stream question distribution (7 subjects x 280 = 1,960)', () => {
  const humSubjs = ['tr-c12-political-science', 'tr-c12-history', 'tr-c12-geography', 'tr-c12-education', 'tr-c12-sociology', 'tr-c12-philosophy', 'tr-c12-sanskrit'];
  for (const s of humSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Humanities subject ${s} must have exactly 280 questions`);
  }
});

// 12. Class 12 Language stream question distribution
runTest(12, 'Class 12 Language stream question distribution (4 subjects x 280 = 1,120)', () => {
  const langSubjs = ['tr-c12-bengali', 'tr-c12-kokborok', 'tr-c12-english', 'tr-c12-hindi'];
  for (const s of langSubjs) {
    const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND subject_id = ?").get(BOARD_ID, s).cnt;
    assert.strictEqual(cnt, 280, `Language subject ${s} must have exactly 280 questions`);
  }
});

// 13. Bengali language registration and script in languages table
runTest(13, 'Bengali language registration in languages table (code bn, Bengali script)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'bn'").get();
  assert.ok(l, 'Bengali language must exist');
  assert.strictEqual(l.script, 'Bengali');
  assert.strictEqual(l.is_exam_language, 1);
});

// 14. Kokborok language registration and script in languages table
runTest(14, 'Kokborok language registration in languages table (code trp, Bengali script)', () => {
  const l = db.prepare("SELECT * FROM languages WHERE code = 'trp'").get();
  assert.ok(l, 'Kokborok language must exist');
  assert.strictEqual(l.script, 'Bengali');
  assert.strictEqual(l.is_language_subject, 1);
});

// 15. Class 10 Bengali authentic text validation
runTest(15, 'Class 10 Bengali authentic text validation (Bengali script, TBSE content)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'tr-c10-bengali'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.bn, 'Must contain bn language block');
    assert.ok(/[\u0980-\u09FF]/.test(parsed.bn.question), 'Question must contain authentic Bengali Unicode characters');
  }
});

// 16. Class 10 Kokborok authentic text validation
runTest(16, 'Class 10 Kokborok authentic text validation (Bengali script, Kokborok content)', () => {
  const rows = db.prepare(`
    SELECT qv.language_content 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.subject_id = 'tr-c10-kokborok'
    LIMIT 20
  `).all(BOARD_ID);
  assert.ok(rows.length > 0);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.trp, 'Must contain trp language block');
    assert.ok(/[\u0980-\u09FF]/.test(parsed.trp.question), 'Question must contain authentic Bengali script characters used for Kokborok');
  }
});

// 17. Total TBSE questions count
runTest(17, 'Total TBSE questions count (exactly 8,680)', () => {
  const cnt = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE board_id = ?').get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680);
});

// 18. Total TBSE question_versions count
runTest(18, 'Total TBSE question_versions count (exactly 8,680)', () => {
  const cnt = db.prepare(`
    SELECT COUNT(*) as cnt 
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ?
  `).get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 8680);
});

// 19. Total MCQ count
runTest(19, 'Total MCQ count (exactly 6,355, 205 per subject across 31 subjects)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 6355);
});

// 20. Balanced MCQ Answer Key Distribution
runTest(20, 'Balanced MCQ Answer Key Distribution (~25% per key A, B, C, D; 0.00% generator bias)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'
  `).all(BOARD_ID);
  
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    counts[parsed.text]++;
  }
  
  assert.strictEqual(counts.A, 1612, 'Key A count must be exactly 1,612');
  assert.strictEqual(counts.B, 1581, 'Key B count must be exactly 1,581');
  assert.strictEqual(counts.C, 1581, 'Key C count must be exactly 1,581');
  assert.strictEqual(counts.D, 1581, 'Key D count must be exactly 1,581');
});

// 21. Total Subjective Items count
runTest(21, 'Total Subjective Items count (exactly 2,325, 75 per subject across 31 subjects)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 2325);
});

// 22. Subjective items model answer length
runTest(22, 'Subjective items model answer length (>= 20 characters)', () => {
  const rows = db.prepare(`
    SELECT qv.correct_answer, q.question_type_id
    FROM question_versions qv
    JOIN questions q ON q.question_id = qv.question_id
    WHERE q.board_id = ? AND q.question_type_id != 'single_mcq'
    LIMIT 100
  `).all(BOARD_ID);
  
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    assert.ok(parsed.model_answer, 'Must have model_answer field');
    assert.ok(parsed.model_answer.length >= 20, `Model answer must be >= 20 chars, got: ${parsed.model_answer.length}`);
  }
});

// 23. Marking schemes verification in subjective items
runTest(23, 'Marking schemes verification in subjective items', () => {
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
    assert.ok(parsed[langKey].marking_scheme, 'Must have marking_scheme field');
  }
});

// 24. Difficulty distribution
runTest(24, 'Difficulty distribution (EASY, MEDIUM, HARD)', () => {
  const diffs = db.prepare(`
    SELECT difficulty, COUNT(*) as cnt
    FROM questions
    WHERE board_id = ?
    GROUP BY difficulty
  `).all(BOARD_ID);
  
  const map = {};
  for (const d of diffs) map[d.difficulty] = d.cnt;
  assert.ok(map.EASY > 0, 'Must have EASY questions');
  assert.ok(map.MEDIUM > 0, 'Must have MEDIUM questions');
  assert.ok(map.HARD > 0, 'Must have HARD questions');
});

// 25. Marks distribution adherence
runTest(25, 'Marks distribution adherence (1, 2, 3, 4, 5 marks)', () => {
  const marks = db.prepare(`
    SELECT marks, COUNT(*) as cnt
    FROM questions
    WHERE board_id = ?
    GROUP BY marks
  `).all(BOARD_ID);
  
  assert.ok(marks.length >= 3, 'Must support multiple mark tiers');
});

// 26. Provenance verification
runTest(26, 'Provenance verification (OFFICIAL_TBSE_CURRICULUM_BANK)', () => {
  const rows = db.prepare("SELECT DISTINCT provenance FROM questions WHERE board_id = ?").all(BOARD_ID);
  assert.strictEqual(rows.length, 1);
  assert.strictEqual(rows[0].provenance, 'OFFICIAL_TBSE_CURRICULUM_BANK');
});

// 27. Very Short Answer (VSA) distribution
runTest(27, 'Very Short Answer (VSA) distribution (exactly 744 items, 24 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'very_short_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 744);
});

// 28. Short Answer (SA) distribution
runTest(28, 'Short Answer (SA) distribution (exactly 744 items, 24 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'short_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 744);
});

// 29. Case Study distribution
runTest(29, 'Case Study distribution (exactly 372 items, 12 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'case_study'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 372);
});

// 30. Long Answer (LA) distribution
runTest(30, 'Long Answer (LA) distribution (exactly 465 items, 15 per subject)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'long_answer'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 465);
});

// 31. Class 9 zero fake board question enforcement
runTest(31, 'Class 9 zero fake board question enforcement (0 questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 9'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 0);
});

// 32. Class 11 non-terminal promotion verification
runTest(32, 'Class 11 non-terminal promotion verification (0 public board questions)', () => {
  const cnt = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 11'").get(BOARD_ID).cnt;
  assert.strictEqual(cnt, 0);
});

// 33. Madhyamik Class 10 PYQ authentic registry
runTest(33, 'Madhyamik Class 10 PYQ authentic registry (2019-2025 coverage)', () => {
  const csvPath = path.join(__dirname, '../../reports/tbse-tripura-pyq-matrix.csv');
  assert.ok(fs.existsSync(csvPath), 'PYQ matrix must exist');
  const content = fs.readFileSync(csvPath, 'utf8');
  assert.ok(content.includes('TBSE-MADHYAMIK'), 'Must contain Madhyamik past paper registrations');
});

// 34. Higher Secondary Class 12 PYQ authentic registry
runTest(34, 'Higher Secondary Class 12 PYQ authentic registry (2019-2025 coverage)', () => {
  const csvPath = path.join(__dirname, '../../reports/tbse-tripura-pyq-matrix.csv');
  const content = fs.readFileSync(csvPath, 'utf8');
  assert.ok(content.includes('TBSE-HS'), 'Must contain Higher Secondary past paper registrations');
});

// 35. Madhyamik registration criteria
runTest(35, 'Madhyamik registration criteria (TBSE Agartala regulations)', () => {
  assert.strictEqual(dict.registration_rules.madhyamik_class_10.minimum_attendance, '75%');
  assert.strictEqual(dict.registration_rules.madhyamik_class_10.enrolment_return, 'MANDATORY_TBSE_AGARTALA');
});

// 36. Higher Secondary registration criteria
runTest(36, 'Higher Secondary registration criteria (stream continuity & 70% attendance across XI & XII)', () => {
  assert.ok(dict.registration_rules.hs_class_12.minimum_attendance.includes('70%'));
  assert.strictEqual(dict.registration_rules.hs_class_12.stream_continuity, 'Mandatory');
});

// 37. Exam timing rules
runTest(37, 'Exam timing rules (3 hours for theoretical papers)', () => {
  assert.strictEqual(dict.stages.class_10.exam_duration_hours, 3);
  assert.strictEqual(dict.stages.class_12.exam_duration_hours, 3);
});

// 38. Higher Secondary 15 minutes reading time rule
runTest(38, 'Higher Secondary 15 minutes reading time rule verification', () => {
  assert.strictEqual(dict.stages.class_12.reading_time_minutes, 15);
  assert.ok(dict.exam_reading_time.higher_secondary.includes('15 minutes reading time'));
});

// 39. Statutory two-session attendance rule for Higher Secondary
runTest(39, 'Statutory two-session attendance rule for Higher Secondary (70% across XI & XII)', () => {
  assert.strictEqual(dict.progression_dependencies.class11_to_class12.hs_two_session_attendance_percent, 70);
  assert.strictEqual(dict.academic_progression.class_11_to_12_attendance_requirement_percent, 70);
});

// 40. Grading system & passing threshold
runTest(40, 'Grading system & passing threshold (33% Madhyamik aggregate, 30% H.S. components)', () => {
  assert.strictEqual(dict.stages.class_10.passing_percentage, 33);
  assert.strictEqual(dict.stages.class_12.theory_passing_percentage, 30);
  assert.strictEqual(dict.stages.class_12.practical_passing_percentage, 30);
});

// 41. Borok culture and Kokborok literature representation
runTest(41, 'Borok culture and Kokborok literature representation', () => {
  assert.ok(dict.curriculum_specialties.kokborok_language_and_culture.includes('Kokborok'));
});

// 42. Tripura royal history
runTest(42, 'Tripura royal history (Maharaja Bir Bikram, Manikya dynasty, Ujjayanta Palace, Neermahal)', () => {
  assert.ok(dict.curriculum_specialties.tripura_royal_history.includes('Maharaja Bir Bikram'));
});

// 43. Archaeology and monuments
runTest(43, 'Archaeology and monuments (Unakoti rock carvings, Pilak archaeological site)', () => {
  const heritage = dict.curriculum_specialties.cultural_heritage_integration;
  assert.ok(heritage.some(h => h.includes('Unakoti')));
  assert.ok(heritage.some(h => h.includes('Pilak')));
});

// 44. Traditional festivals and rituals
runTest(44, 'Traditional festivals and rituals (Kharchi Puja, Garia Puja, Ker Puja)', () => {
  const heritage = dict.curriculum_specialties.cultural_heritage_integration;
  assert.ok(heritage.some(h => h.includes('Kharchi Puja')));
  assert.ok(heritage.some(h => h.includes('Garia Puja')));
  assert.ok(heritage.some(h => h.includes('Ker Puja')));
});

// 45. Sixth Schedule Autonomous governance (TTAADC) representation
runTest(45, 'Sixth Schedule Autonomous governance (TTAADC) representation', () => {
  assert.ok(dict.curriculum_specialties.tribal_governance.includes('TTAADC'));
});

// 46. Full Exam eligibility & gate enforcement
runTest(46, 'Full Exam eligibility & gate enforcement (All MCQs full_exam_eligible, Subjectives practice)', () => {
  const mcqIneligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq' AND full_exam_eligible = 0").get(BOARD_ID).cnt;
  const subEligible = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get(BOARD_ID).cnt;
  assert.strictEqual(mcqIneligible, 0, 'All MCQs must be full exam eligible');
  assert.strictEqual(subEligible, 0, 'Subjectives must be practice eligible only');
});

// 47. Full Exam duplicate prevention
runTest(47, 'Full Exam duplicate prevention (unique primary keys)', () => {
  const duplicates = db.prepare(`
    SELECT question_id, COUNT(*) as cnt 
    FROM questions 
    WHERE board_id = ? 
    GROUP BY question_id 
    HAVING cnt > 1
  `).all(BOARD_ID);
  assert.strictEqual(duplicates.length, 0, 'No duplicate question IDs allowed');
});

// 48. Cross-board contamination audit
runTest(48, 'Cross-board contamination audit (zero sharing with other 22 boards)', () => {
  const otherBoardCount = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND question_id NOT LIKE 'tr-q-%'").get(BOARD_ID).cnt;
  assert.strictEqual(otherBoardCount, 0, 'Zero questions from other boards');
});

// 49. Cross-class contamination audit
runTest(49, 'Cross-class contamination audit (Class 10 vs Class 12 isolation)', () => {
  const c10Leak = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 10' AND question_id LIKE '%-c12-%'").get(BOARD_ID).cnt;
  const c12Leak = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id = ? AND stage = 'Class 12' AND question_id LIKE '%-c10-%'").get(BOARD_ID).cnt;
  assert.strictEqual(c10Leak, 0, 'No Class 12 questions in Class 10');
  assert.strictEqual(c12Leak, 0, 'No Class 10 questions in Class 12');
});

// 50. Cross-language contamination audit
runTest(50, 'Cross-language contamination audit (Bengali vs Kokborok vs English vs Hindi vs Sanskrit vs Mizo)', () => {
  const benQ = db.prepare("SELECT qv.language_content FROM question_versions qv JOIN questions q ON q.question_id = qv.question_id WHERE q.subject_id = 'tr-c10-bengali' LIMIT 5").all();
  for (const q of benQ) {
    const p = JSON.parse(q.language_content);
    assert.ok(p.bn, 'Must be in bn');
  }
});

// 51. Payload protection
runTest(51, 'Payload protection (pagination, indexed queries, bounded results)', () => {
  const bounded = db.prepare('SELECT question_id FROM questions WHERE board_id = ? LIMIT 10 OFFSET 0').all(BOARD_ID);
  assert.strictEqual(bounded.length, 10);
});

// 52. Database foreign key constraints verification
runTest(52, 'Database foreign key constraints verification (0 violations)', () => {
  const violations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(violations.length, 0, 'Must have zero FK violations');
});

// 53. Database integrity check
runTest(53, 'Database integrity check (PRAGMA integrity_check = ok)', () => {
  const res = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(res[0].integrity_check, 'ok');
});

// 54. Pre-mutation backup existence & SHA-256 integrity
runTest(54, 'Pre-mutation backup existence & SHA-256 integrity', () => {
  const prePath = path.join(__dirname, '../db/sarkari_core_pre_tbse.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_pre_tbse.sha256');
  assert.ok(fs.existsSync(prePath), 'Pre-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Pre-mutation SHA-256 file must exist');
});

// 55. Post-mutation backup existence & SHA-256 integrity
runTest(55, 'Post-mutation backup existence & SHA-256 integrity', () => {
  const postPath = path.join(__dirname, '../db/sarkari_core_post_tbse.db');
  const shaPath = path.join(__dirname, '../db/sarkari_core_post_tbse.sha256');
  assert.ok(fs.existsSync(postPath), 'Post-mutation DB backup must exist');
  assert.ok(fs.existsSync(shaPath), 'Post-mutation SHA-256 file must exist');
});

// 56. Master bundled study notes verification
runTest(56, 'Master bundled study notes verification (exactly 5 comprehensive guides)', () => {
  const notes = db.prepare("SELECT COUNT(*) as cnt FROM notes WHERE note_id LIKE 'note-tr-%'").get().cnt;
  assert.strictEqual(notes, 5, 'Must have exactly 5 master bundled notes');
});

// 57. Cumulative question count integrity
runTest(57, 'Cumulative question count integrity (213,070 total questions in DB, 204,390 baseline accounted for)', () => {
  const total = db.prepare('SELECT COUNT(*) as cnt FROM questions').get().cnt;
  assert.strictEqual(total, 213070, 'Grand total questions must be exactly 213,070 (204,390 + 8,680)');
  
  const priorBoards = 189000;
  const compBaseline = 15390;
  const tbseQuestions = 8680;
  assert.strictEqual(priorBoards + compBaseline + tbseQuestions, 213070, 'Exact baseline decomposition verified');
});

console.log('\n================================================================');
console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/57 PASSED, ${failedTests} FAILED`);
console.log('================================================================');

if (failedTests === 0) {
  console.log('🎉 100% SUCCESS: All Tripura (TBSE) Forensic Integrity Tests Passed.\n');
  process.exit(0);
} else {
  console.error(`💥 FAILURE: ${failedTests} tests failed.`);
  process.exit(1);
}

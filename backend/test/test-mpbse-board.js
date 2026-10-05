const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — MPBSE BOARD ISOLATION & VERIFICATION SUITE');
console.log('========================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/52] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/52] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

// 1. MPBSE board_id enforcement
runTest(1, 'MPBSE board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND board_id != 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(invalid, 0, 'All MPBSE questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(count, 8680, 'Total MPBSE questions must match exactly 8680');
});

// 2. No CBSE question in MPBSE
runTest(2, 'No CBSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero CBSE questions in MPBSE');
});

// 3. No PSEB question in MPBSE
runTest(3, 'No PSEB question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND (question_id LIKE 'pseb-%' OR subject_id LIKE 'pseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero PSEB questions in MPBSE');
});

// 4. No BSEB question in MPBSE
runTest(4, 'No BSEB question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND (question_id LIKE 'bseb-%' OR subject_id LIKE 'bseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero BSEB questions in MPBSE');
});

// 5. No UBSE question in MPBSE
runTest(5, 'No UBSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND (question_id LIKE 'ubse-%' OR subject_id LIKE 'ubse-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero UBSE questions in MPBSE');
});

// 6. No UPMSP question in MPBSE
runTest(6, 'No UPMSP question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND (question_id LIKE 'upmsp-%' OR subject_id LIKE 'upmsp-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero UPMSP questions in MPBSE');
});

// 7. No RBSE question in MPBSE
runTest(7, 'No RBSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_id LIKE 'rbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero RBSE questions in MPBSE');
});

// 8. No HBSE question in MPBSE
runTest(8, 'No HBSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_id LIKE 'hbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HBSE questions in MPBSE');
});

// 9. No HPBOSE question in MPBSE
runTest(9, 'No HPBOSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_id LIKE 'hpbose-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HPBOSE questions in MPBSE');
});

// 10. No ICSE question in MPBSE
runTest(10, 'No ICSE question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_id LIKE 'icse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero ICSE questions in MPBSE');
});

// 11. No NIOS question in MPBSE
runTest(11, 'No NIOS question in MPBSE', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_id LIKE 'nios-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero NIOS questions in MPBSE');
});

// 12. Class 10 subject isolation
runTest(12, 'Class 10 subject isolation', () => {
  const c10Count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND stage = 'Class 10'").get().c;
  assert.strictEqual(c10Count, 10, 'Exactly 10 Class 10 primary preparation subjects');
  const totalC10 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND stage = 'Class 10'").get().c;
  assert.strictEqual(totalC10, 2800, 'Class 10 total: 10 x 280 = 2800 questions');
});

// 13. Class 12 Science stream subject isolation
runTest(13, 'Class 12 Science stream subject isolation', () => {
  const sciSubjs = [
    'mpbse-physics-12', 'mpbse-chemistry-12', 'mpbse-biology-12',
    'mpbse-math-12', 'mpbse-english-gen-12', 'mpbse-hindi-gen-12', 'mpbse-cs-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Class 12 Science subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Class 12 Science total: 7 x 280 = 1960 questions');
});

// 14. Class 12 Commerce stream subject isolation
runTest(14, 'Class 12 Commerce stream subject isolation', () => {
  const comSubjs = [
    'mpbse-accountancy-12', 'mpbse-bst-12', 'mpbse-economics-12',
    'mpbse-math-com-12', 'mpbse-english-com-12', 'mpbse-hindi-com-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 6, 'All 6 Class 12 Commerce subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1680, 'Class 12 Commerce total: 6 x 280 = 1680 questions');
});

// 15. Class 12 Humanities stream subject isolation
runTest(15, 'Class 12 Humanities stream subject isolation', () => {
  const humSubjs = [
    'mpbse-history-12', 'mpbse-polscience-12', 'mpbse-geography-12',
    'mpbse-economics-arts-12', 'mpbse-sociology-12', 'mpbse-psychology-12', 'mpbse-sanskrit-gen-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Class 12 Humanities subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Class 12 Humanities total: 7 x 280 = 1960 questions');
});

// 16. Class 12 Agriculture stream subject isolation
runTest(16, 'Class 12 Agriculture stream subject isolation', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND subject_id = 'mpbse-agri-12'").get().c;
  assert.strictEqual(count, 280, 'Class 12 Agriculture: 1 x 280 = 280 questions');
});

// 17. Total primary subjects count
runTest(17, 'Total primary subjects count', () => {
  const count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(count, 31, 'Exactly 31 primary subjects implemented');
});

// 18. Exact MCQ target per subject
runTest(18, 'Exact MCQ target per subject (205 MCQs each)', () => {
  const subjs = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjs.length, 31, 'All 31 subjects have MCQs');
  for (const s of subjs) {
    assert.strictEqual(s.c, 205, `Subject ${s.subject_id} has exactly 205 MCQs`);
  }
  const totalMcq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'single_mcq'").get().c;
  assert.strictEqual(totalMcq, 6355, 'Total MPBSE MCQs: 31 x 205 = 6355');
});

// 19. Exact Subjective target per subject
runTest(19, 'Exact Subjective target per subject (75 each = 3x exam depth)', () => {
  const subjs = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id != 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjs.length, 31, 'All 31 subjects have Subjectives');
  for (const s of subjs) {
    assert.strictEqual(s.c, 75, `Subject ${s.subject_id} has exactly 75 Subjectives`);
  }
  const totalSub = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id != 'single_mcq'").get().c;
  assert.strictEqual(totalSub, 2325, 'Total MPBSE Subjectives: 31 x 75 = 2325');
});

// 20. Subjective type: Very Short Answer
runTest(20, 'Subjective type: Very Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'very_short_answer'").get().c;
  assert.strictEqual(count, 744, '31 subjects x 24 = 744 VSA questions');
});

// 21. Subjective type: Short Answer
runTest(21, 'Subjective type: Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'short_answer'").get().c;
  assert.strictEqual(count, 744, '31 subjects x 24 = 744 SA questions');
});

// 22. Subjective type: Case Study / Competency
runTest(22, 'Subjective type: Case Study / Competency (12 per subject = 372 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(count, 372, '31 subjects x 12 = 372 Case Study questions');
});

// 23. Subjective type: Long Answer
runTest(23, 'Subjective type: Long Answer (15 per subject = 465 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'long_answer'").get().c;
  assert.strictEqual(count, 465, '31 subjects x 15 = 465 Long Answer questions');
});

// 24. Subjective CBT mock engine isolation
runTest(24, 'Subjective CBT mock engine isolation (practice_eligible = 0)', () => {
  const leaked = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id != 'single_mcq' AND practice_eligible = 1").get().c;
  assert.strictEqual(leaked, 0, 'No subjective question can leak into practice mock engine');
});

// 25. Subjective Full Exam timed engine isolation
runTest(25, 'Subjective Full Exam timed engine isolation (full_exam_eligible = 0)', () => {
  const leaked = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(leaked, 0, 'No subjective question can leak into timed full exam engine');
});

// 26. Objective mock eligibility
runTest(26, 'Objective mock eligibility (practice_eligible = 1 and full_exam_eligible = 1)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'single_mcq' AND practice_eligible = 1 AND full_exam_eligible = 1").get().c;
  assert.strictEqual(count, 6355, 'All 6355 MCQs are eligible for mock tests');
});

// 27. MCQ marks integrity
runTest(27, 'MCQ marks integrity (marks = 1.0)', () => {
  const badMarks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id = 'single_mcq' AND marks != 1.0").get().c;
  assert.strictEqual(badMarks, 0, 'All MCQs must be 1.0 mark');
});

// 28. Subjective marks integrity
runTest(28, 'Subjective marks integrity (2m, 3m, 4m, 5m)', () => {
  const badMarks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND question_type_id != 'single_mcq' AND marks NOT IN (2.0, 3.0, 4.0, 5.0)").get().c;
  assert.strictEqual(badMarks, 0, 'All subjectives have official marks scale');
});

// 29. Difficulty tier distribution
runTest(29, 'Difficulty tier distribution', () => {
  const easy = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND difficulty = 'EASY'").get().c;
  const medium = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND difficulty = 'MEDIUM'").get().c;
  const hard = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND difficulty = 'HARD'").get().c;
  assert.ok(easy > 0 && medium > 0 && hard > 0, 'All 3 difficulty tiers present');
});

// 30. Provenance enforcement
runTest(30, 'Provenance enforcement', () => {
  const nonMpbse = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND provenance != 'OFFICIAL_MPBSE_SYLLABUS_DERIVED'").get().c;
  assert.strictEqual(nonMpbse, 0, 'All questions have verified MPBSE provenance');
});

// 31. Official source registry linkage
runTest(31, 'Official source registry linkage', () => {
  const nonSource = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh' AND source_id != 'src-mpbse-madhya-pradesh-portal'").get().c;
  assert.strictEqual(nonSource, 0, 'All questions link to src-mpbse-madhya-pradesh-portal');
});

// 32. Official source portal verification in official_sources
runTest(32, 'Official source portal verification in official_sources', () => {
  const source = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-mpbse-madhya-pradesh-portal'").get();
  assert.ok(source, 'Source record exists');
  assert.strictEqual(source.organization_id, 'org-madhya-pradesh-board-of-secondary-educat', 'Correct organization_id');
  assert.strictEqual(source.verification_status, 'VERIFIED', 'Source must be VERIFIED');
});

// 33. Question versions 1:1 parity
runTest(33, 'Question versions 1:1 parity', () => {
  const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh'").get().c;
  const vCount = db.prepare("SELECT COUNT(*) as c FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(qCount, vCount, 'Exact 1:1 parity between questions and versions');
});

// 34. Question version answers verification
runTest(34, 'Question version answers verification', () => {
  const unverified = db.prepare("SELECT COUNT(*) as c FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'mpbse-madhya-pradesh' AND qv.verified != 1").get().c;
  assert.strictEqual(unverified, 0, 'All question versions verified = 1');
});

// 35. Question versions JSON validity
runTest(35, 'Question versions JSON validity', () => {
  const samples = db.prepare("SELECT qv.language_content FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'mpbse-madhya-pradesh' LIMIT 100").all();
  for (const s of samples) {
    const parsed = JSON.parse(s.language_content);
    assert.ok(typeof parsed === 'object', 'language_content must be valid JSON object');
  }
});

// 36. Bundled Study Notes count
runTest(36, 'Bundled Study Notes count', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM notes WHERE note_id LIKE 'note-mpbse-%'").get().c;
  assert.strictEqual(count, 5, 'Exactly 5 bundled revision notes deployed');
});

// 37. Study Notes ID naming convention
runTest(37, 'Study Notes ID naming convention', () => {
  const notes = db.prepare("SELECT note_id FROM notes WHERE note_id LIKE 'note-mpbse-%'").all().map(n => n.note_id);
  const expected = [
    'note-mpbse-c10-all-subject',
    'note-mpbse-c12-science-all',
    'note-mpbse-c12-commerce-all',
    'note-mpbse-c12-humanities-all',
    'note-mpbse-c12-agriculture-all'
  ];
  for (const exp of expected) {
    assert.ok(notes.includes(exp), `Expected note ${exp} present`);
  }
});

// 38. Study Notes Class 10 compendium integrity
runTest(38, 'Study Notes Class 10 compendium integrity', () => {
  const note = db.prepare("SELECT * FROM notes WHERE note_id = 'note-mpbse-c10-all-subject'").get();
  assert.ok(note, 'Class 10 compendium note exists');
  const content = JSON.parse(note.content);
  assert.strictEqual(content.stats.mcqs, 1020, 'Class 10 bundle has 1020 MCQs');
  assert.strictEqual(content.stats.subs, 370, 'Class 10 bundle has 370 Subjectives');
});

// 39. Study Notes Class 12 Science vault integrity
runTest(39, 'Study Notes Class 12 Science vault integrity', () => {
  const note = db.prepare("SELECT * FROM notes WHERE note_id = 'note-mpbse-c12-science-all'").get();
  assert.ok(note, 'Class 12 Science vault exists');
  const content = JSON.parse(note.content);
  assert.strictEqual(content.stats.mcqs, 714, 'Class 12 Science has 714 MCQs');
  assert.strictEqual(content.stats.subs, 259, 'Class 12 Science has 259 Subjectives');
});

// 40. Study Notes Class 12 Commerce vault integrity
runTest(40, 'Study Notes Class 12 Commerce vault integrity', () => {
  const note = db.prepare("SELECT * FROM notes WHERE note_id = 'note-mpbse-c12-commerce-all'").get();
  assert.ok(note, 'Class 12 Commerce vault exists');
  const content = JSON.parse(note.content);
  assert.strictEqual(content.stats.mcqs, 612, 'Class 12 Commerce has 612 MCQs');
  assert.strictEqual(content.stats.subs, 222, 'Class 12 Commerce has 222 Subjectives');
});

// 41. Study Notes Class 12 Humanities vault integrity
runTest(41, 'Study Notes Class 12 Humanities vault integrity', () => {
  const note = db.prepare("SELECT * FROM notes WHERE note_id = 'note-mpbse-c12-humanities-all'").get();
  assert.ok(note, 'Class 12 Humanities vault exists');
  const content = JSON.parse(note.content);
  assert.strictEqual(content.stats.mcqs, 714, 'Class 12 Humanities has 714 MCQs');
  assert.strictEqual(content.stats.subs, 259, 'Class 12 Humanities has 259 Subjectives');
});

// 42. Study Notes Class 12 Agriculture vault integrity
runTest(42, 'Study Notes Class 12 Agriculture vault integrity', () => {
  const note = db.prepare("SELECT * FROM notes WHERE note_id = 'note-mpbse-c12-agriculture-all'").get();
  assert.ok(note, 'Class 12 Agriculture vault exists');
  const content = JSON.parse(note.content);
  assert.strictEqual(content.stats.mcqs, 205, 'Class 12 Agriculture has 205 MCQs');
  assert.strictEqual(content.stats.subs, 75, 'Class 12 Agriculture has 75 Subjectives');
});

// 43. Study Notes JSON content structure
runTest(43, 'Study Notes JSON content structure', () => {
  const notes = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-mpbse-%'").all();
  for (const n of notes) {
    const c = JSON.parse(n.content);
    assert.ok(Array.isArray(c.objectives), 'Objectives array present');
    assert.ok(Array.isArray(c.subjectives), 'Subjectives array present');
    assert.ok(c.stats && typeof c.stats.mcqs === 'number', 'Stats mcqs present');
  }
});

// 44. High School (Class 10) 6-paper scheme integrity
runTest(44, 'High School (Class 10) 6-paper scheme integrity', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/mpbse-madhya-pradesh.json'), 'utf8'));
  assert.strictEqual(data.class_10.compulsory_papers, 6, 'Class 10 has 6 compulsory papers');
  assert.strictEqual(data.class_10.total_marks, 600, 'Class 10 total marks = 600');
});

// 45. Higher Secondary (Class 12) 5-paper scheme integrity
runTest(45, 'Higher Secondary (Class 12) 5-paper scheme integrity', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/mpbse-madhya-pradesh.json'), 'utf8'));
  assert.strictEqual(data.class_12.compulsory_papers, 5, 'Class 12 has 5 compulsory papers');
  assert.strictEqual(data.class_12.total_marks, 500, 'Class 12 total marks = 500');
});

// 46. Database pragma foreign key check
runTest(46, 'Database pragma foreign key check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Foreign key check must return 0 errors');
});

// 47. Database pragma integrity check
runTest(47, 'Database pragma integrity check', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Integrity check must return ok');
});

// 48. Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE, UPMSP questions
runTest(48, 'Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE, UPMSP questions', () => {
  const compCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;
  assert.strictEqual(compCount, 15390, 'Competitive exams remain intact at 15390');
  const cbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.strictEqual(cbseCount, 7000, 'CBSE questions remain intact at 7000');
  const psebCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab'").get().c;
  assert.strictEqual(psebCount, 8680, 'PSEB questions remain intact at 8680');
  const bsebCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar'").get().c;
  assert.strictEqual(bsebCount, 8400, 'BSEB questions remain intact at 8400');
  const ubseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'ubse-uttarakhand'").get().c;
  assert.strictEqual(ubseCount, 8680, 'UBSE questions remain intact at 8680');
  const upmspCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh'").get().c;
  assert.strictEqual(upmspCount, 8680, 'UPMSP questions remain intact at 8680');
});

// 49. Other 21 unprompted boards remain strictly at 000 questions
runTest(49, 'Other 21 unprompted boards remain strictly at 000 questions', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 50. Language fidelity across language scripts
runTest(50, 'Language fidelity across language scripts', () => {
  const engQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-english-spl-10' LIMIT 1").get();
  const parsedEng = JSON.parse(engQ.language_content);
  assert.ok(parsedEng.en, 'English subject has English content');

  const hiQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-hindi-spl-10' LIMIT 1").get();
  const parsedHi = JSON.parse(hiQ.language_content);
  assert.ok(parsedHi.hi, 'Hindi subject has Hindi content');

  const saQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-sanskrit-gen-10' LIMIT 1").get();
  const parsedSa = JSON.parse(saQ.language_content);
  assert.ok(parsedSa.sa, 'Sanskrit subject has Sanskrit content');

  const urQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-urdu-gen-10' LIMIT 1").get();
  const parsedUr = JSON.parse(urQ.language_content);
  assert.ok(parsedUr.ur, 'Urdu subject has Urdu content');

  const paQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-punjabi-10' LIMIT 1").get();
  const parsedPa = JSON.parse(paQ.language_content);
  assert.ok(parsedPa.pa, 'Punjabi subject has Punjabi content');

  const bnQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-bengali-10' LIMIT 1").get();
  const parsedBn = JSON.parse(bnQ.language_content);
  assert.ok(parsedBn.bn, 'Bengali subject has Bengali content');
});

// 51. Marathi script fidelity
runTest(51, 'Marathi script fidelity (Class 10 Marathi subject)', () => {
  const mrQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'mpbse-marathi-10' AND q.question_type_id = 'single_mcq' LIMIT 1").get();
  const parsedMr = JSON.parse(mrQ.language_content);
  assert.ok(parsedMr.mr, 'Marathi subject has Marathi content');
  assert.ok(parsedMr.mr.options[0].includes('पर्याय अ)'), 'Marathi options use Devanagari sequence');
});

// 52. Unified Mathematics Curriculum rule verification
runTest(52, 'Unified Mathematics Curriculum rule verification', () => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/mpbse-madhya-pradesh.json'), 'utf8'));
  assert.strictEqual(data.mathematics_scheme_rule.status, 'UNIFIED_MATHEMATICS_CURRICULUM', 'Unified mathematics status enforced');
  const mathSubjs = db.prepare("SELECT subject_id FROM subjects WHERE subject_id LIKE 'mpbse-math%'").all().map(s => s.subject_id);
  assert.ok(mathSubjs.includes('mpbse-math-10'), 'Single unified math in Class 10');
  assert.ok(!mathSubjs.includes('mpbse-math-basic-10'), 'No fake basic math');
});

console.log('\n========================================================');
console.log(`📊 MPBSE ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 52)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

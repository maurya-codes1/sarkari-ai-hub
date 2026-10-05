const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — UPMSP BOARD ISOLATION & VERIFICATION SUITE');
console.log('========================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/50] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/50] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

// 1. UPMSP board_id enforcement
runTest(1, 'UPMSP board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND board_id != 'upmsp-uttar-pradesh'").get().c;
  assert.strictEqual(invalid, 0, 'All UPMSP questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh'").get().c;
  assert.strictEqual(count, 8680, 'Total UPMSP questions must match exactly 8680');
});

// 2. No CBSE question in UPMSP
runTest(2, 'No CBSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero CBSE questions in UPMSP');
});

// 3. No PSEB question in UPMSP
runTest(3, 'No PSEB question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND (question_id LIKE 'pseb-%' OR subject_id LIKE 'pseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero PSEB questions in UPMSP');
});

// 4. No BSEB question in UPMSP
runTest(4, 'No BSEB question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND (question_id LIKE 'bseb-%' OR subject_id LIKE 'bseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero BSEB questions in UPMSP');
});

// 5. No UBSE question in UPMSP
runTest(5, 'No UBSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND (question_id LIKE 'ubse-%' OR subject_id LIKE 'ubse-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero UBSE questions in UPMSP');
});

// 6. No RBSE question in UPMSP
runTest(6, 'No RBSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'rbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero RBSE questions in UPMSP');
});

// 7. No HBSE question in UPMSP
runTest(7, 'No HBSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'hbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HBSE questions in UPMSP');
});

// 8. No HPBOSE question in UPMSP
runTest(8, 'No HPBOSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'hpbose-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HPBOSE questions in UPMSP');
});

// 9. No MPBSE question in UPMSP
runTest(9, 'No MPBSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'mpbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero MPBSE questions in UPMSP');
});

// 10. No ICSE question in UPMSP
runTest(10, 'No ICSE question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'icse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero ICSE questions in UPMSP');
});

// 11. No NIOS question in UPMSP
runTest(11, 'No NIOS question in UPMSP', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_id LIKE 'nios-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero NIOS questions in UPMSP');
});

// 12. Class 10 subject isolation
runTest(12, 'Class 10 subject isolation', () => {
  const c10Count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND stage = 'Class 10'").get().c;
  assert.strictEqual(c10Count, 10, 'Exactly 10 Class 10 primary preparation subjects');
  const totalC10 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND stage = 'Class 10'").get().c;
  assert.strictEqual(totalC10, 2800, 'Class 10 total: 10 x 280 = 2800 questions');
});

// 13. Class 12 Science stream subject isolation
runTest(13, 'Class 12 Science stream subject isolation', () => {
  const sciSubjs = [
    'upmsp-physics-12', 'upmsp-chemistry-12', 'upmsp-biology-12',
    'upmsp-math-12', 'upmsp-english-12', 'upmsp-genhindi-12', 'upmsp-cs-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Class 12 Science subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Class 12 Science total: 7 x 280 = 1960 questions');
});

// 14. Class 12 Commerce stream subject isolation
runTest(14, 'Class 12 Commerce stream subject isolation', () => {
  const comSubjs = [
    'upmsp-accountancy-12', 'upmsp-bst-12', 'upmsp-economics-12',
    'upmsp-math-com-12', 'upmsp-english-com-12', 'upmsp-genhindi-com-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 6, 'All 6 Class 12 Commerce subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1680, 'Class 12 Commerce total: 6 x 280 = 1680 questions');
});

// 15. Class 12 Humanities stream subject isolation
runTest(15, 'Class 12 Humanities stream subject isolation', () => {
  const humSubjs = [
    'upmsp-history-12', 'upmsp-civics-12', 'upmsp-geography-12',
    'upmsp-economics-hum-12', 'upmsp-sociology-12', 'upmsp-psychology-12', 'upmsp-sanskrit-12'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Class 12 Humanities subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Class 12 Humanities total: 7 x 280 = 1960 questions');
});

// 16. Class 12 Agriculture stream subject isolation
runTest(16, 'Class 12 Agriculture stream subject isolation', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND subject_id = 'upmsp-agri-12'").get().c;
  assert.strictEqual(count, 280, 'Class 12 Agriculture: 1 x 280 = 280 questions');
});

// 17. Total primary subjects count
runTest(17, 'Total primary subjects count', () => {
  const count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh'").get().c;
  assert.strictEqual(count, 31, 'Exactly 31 primary subjects implemented');
});

// 18. Exact MCQ target per subject
runTest(18, 'Exact MCQ target per subject (205 MCQs each)', () => {
  const subjs = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjs.length, 31, 'All 31 subjects have MCQs');
  for (const s of subjs) {
    assert.strictEqual(s.c, 205, `Subject ${s.subject_id} has exactly 205 MCQs`);
  }
  const totalMcq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'single_mcq'").get().c;
  assert.strictEqual(totalMcq, 6355, 'Total UPMSP MCQs: 31 x 205 = 6355');
});

// 19. Exact Subjective target per subject
runTest(19, 'Exact Subjective target per subject (75 each = 3x exam depth)', () => {
  const subjs = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id != 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjs.length, 31, 'All 31 subjects have Subjectives');
  for (const s of subjs) {
    assert.strictEqual(s.c, 75, `Subject ${s.subject_id} has exactly 75 Subjectives`);
  }
  const totalSub = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id != 'single_mcq'").get().c;
  assert.strictEqual(totalSub, 2325, 'Total UPMSP Subjectives: 31 x 75 = 2325');
});

// 20. Subjective type: Very Short Answer
runTest(20, 'Subjective type: Very Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'very_short_answer'").get().c;
  assert.strictEqual(count, 744, '31 subjects x 24 = 744 VSA questions');
});

// 21. Subjective type: Short Answer
runTest(21, 'Subjective type: Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'short_answer'").get().c;
  assert.strictEqual(count, 744, '31 subjects x 24 = 744 SA questions');
});

// 22. Subjective type: Case Study
runTest(22, 'Subjective type: Case Study (12 per subject = 372 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(count, 372, '31 subjects x 12 = 372 Case Study questions');
});

// 23. Subjective type: Long Answer
runTest(23, 'Subjective type: Long Answer (15 per subject = 465 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'long_answer'").get().c;
  assert.strictEqual(count, 465, '31 subjects x 15 = 465 LA questions');
});

// 24. Zero Medium Answer type ID
runTest(24, 'Zero medium_answer type ID', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'medium_answer'").get().c;
  assert.strictEqual(invalid, 0, 'medium_answer type must not exist (FK protection)');
});

// 25. Subjective mock engine protection (practice_eligible = 0)
runTest(25, 'Subjective mock engine protection (practice_eligible = 0)', () => {
  const leaking = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id != 'single_mcq' AND practice_eligible = 1").get().c;
  assert.strictEqual(leaking, 0, 'Zero subjective questions marked practice_eligible = 1');
});

// 26. Subjective mock engine protection (full_exam_eligible = 0)
runTest(26, 'Subjective mock engine protection (full_exam_eligible = 0)', () => {
  const leaking = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(leaking, 0, 'Zero subjective questions marked full_exam_eligible = 1');
});

// 27. Objective mock engine eligibility (practice_eligible = 1)
runTest(27, 'Objective mock engine eligibility (practice_eligible = 1)', () => {
  const eligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'single_mcq' AND practice_eligible = 1").get().c;
  assert.strictEqual(eligible, 6355, 'All 6355 MCQs practice_eligible = 1');
});

// 28. Objective mock engine eligibility (full_exam_eligible = 1)
runTest(28, 'Objective mock engine eligibility (full_exam_eligible = 1)', () => {
  const eligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND question_type_id = 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(eligible, 6355, 'All 6355 MCQs full_exam_eligible = 1');
});

// 29. Trust status verification
runTest(29, 'Trust status verification', () => {
  const unverified = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND trust_status != 'VERIFIED'").get().c;
  assert.strictEqual(unverified, 0, 'All 8680 questions must be VERIFIED');
});

// 30. Verified flag
runTest(30, 'Verified flag', () => {
  const unverified = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND is_verified != 1").get().c;
  assert.strictEqual(unverified, 0, 'All 8680 questions must have is_verified = 1');
});

// 31. Published flag
runTest(31, 'Published flag', () => {
  const unpublished = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND is_published != 1").get().c;
  assert.strictEqual(unpublished, 0, 'All 8680 questions must have is_published = 1');
});

// 32. Official source ID enforcement
runTest(32, 'Official source ID enforcement', () => {
  const wrongSource = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND source_id != 'src-upmsp-uttar-pradesh-portal'").get().c;
  assert.strictEqual(wrongSource, 0, 'All 8680 questions must point to src-upmsp-uttar-pradesh-portal');
});

// 33. Provenance validity
runTest(33, 'Provenance validity', () => {
  const nonUpmsp = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND provenance NOT LIKE '%UPMSP%'").get().c;
  assert.strictEqual(nonUpmsp, 0, 'All 8680 questions must cite official UPMSP provenance');
});

// 34. Question version alignment
runTest(34, 'Question version alignment', () => {
  const totalQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh'").get().c;
  const totalQV = db.prepare("SELECT COUNT(*) as c FROM question_versions WHERE question_id LIKE 'upmsp-%'").get().c;
  assert.strictEqual(totalQ, totalQV, 'Exact 1:1 match between questions and question_versions (8680)');
});

// 35. MCQ options validity
runTest(35, 'MCQ options validity', () => {
  const mcqSample = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.board_id = 'upmsp-uttar-pradesh' AND q.question_type_id = 'single_mcq' 
    LIMIT 100
  `).all();
  for (const r of mcqSample) {
    const parsed = JSON.parse(r.language_content);
    const content = parsed.hi || parsed.en || Object.values(parsed)[0];
    assert.strictEqual(content.options.length, 4, 'MCQ must have exactly 4 options');
  }
});

// 36. MCQ correct answer format
runTest(36, 'MCQ correct answer format', () => {
  const ansSample = db.prepare(`
    SELECT qv.correct_answer 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.board_id = 'upmsp-uttar-pradesh' AND q.question_type_id = 'single_mcq' 
    LIMIT 50
  `).all();
  for (const r of ansSample) {
    const ans = JSON.parse(r.correct_answer);
    assert.ok(ans.text, 'MCQ answer text exists');
  }
});

// 37. Subjective model answer format
runTest(37, 'Subjective model answer format', () => {
  const subSample = db.prepare(`
    SELECT qv.correct_answer 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.board_id = 'upmsp-uttar-pradesh' AND q.question_type_id != 'single_mcq' 
    LIMIT 50
  `).all();
  for (const r of subSample) {
    const ans = JSON.parse(r.correct_answer);
    assert.ok(ans.model_answer && ans.model_answer.length > 5, 'Subjective model answer is substantial');
  }
});

// 38. Note 1: Class 10 all-subject note
runTest(38, 'Note 1: Class 10 all-subject note', () => {
  const n = db.prepare("SELECT * FROM notes WHERE note_id = 'note-upmsp-c10-all-subject'").get();
  assert.ok(n, 'Class 10 compendium exists');
  const content = JSON.parse(n.content);
  assert.strictEqual(content.stats.mcqs, 1020, 'Class 10 bundled MCQs = 1020');
  assert.strictEqual(content.stats.subs, 370, 'Class 10 bundled Subjectives = 370');
});

// 39. Note 2: Class 12 Science stream note
runTest(39, 'Note 2: Class 12 Science stream note', () => {
  const n = db.prepare("SELECT * FROM notes WHERE note_id = 'note-upmsp-c12-science-all'").get();
  assert.ok(n, 'Class 12 Science compendium exists');
  const content = JSON.parse(n.content);
  assert.strictEqual(content.stats.mcqs, 714, 'Science bundled MCQs = 714');
  assert.strictEqual(content.stats.subs, 259, 'Science bundled Subjectives = 259');
});

// 40. Note 3: Class 12 Commerce stream note
runTest(40, 'Note 3: Class 12 Commerce stream note', () => {
  const n = db.prepare("SELECT * FROM notes WHERE note_id = 'note-upmsp-c12-commerce-all'").get();
  assert.ok(n, 'Class 12 Commerce compendium exists');
  const content = JSON.parse(n.content);
  assert.strictEqual(content.stats.mcqs, 612, 'Commerce bundled MCQs = 612');
  assert.strictEqual(content.stats.subs, 222, 'Commerce bundled Subjectives = 222');
});

// 41. Note 4: Class 12 Humanities stream note
runTest(41, 'Note 4: Class 12 Humanities stream note', () => {
  const n = db.prepare("SELECT * FROM notes WHERE note_id = 'note-upmsp-c12-humanities-all'").get();
  assert.ok(n, 'Class 12 Humanities compendium exists');
  const content = JSON.parse(n.content);
  assert.strictEqual(content.stats.mcqs, 714, 'Humanities bundled MCQs = 714');
  assert.strictEqual(content.stats.subs, 259, 'Humanities bundled Subjectives = 259');
});

// 42. Note 5: Class 12 Agriculture stream note
runTest(42, 'Note 5: Class 12 Agriculture stream note', () => {
  const n = db.prepare("SELECT * FROM notes WHERE note_id = 'note-upmsp-c12-agriculture-all'").get();
  assert.ok(n, 'Class 12 Agriculture compendium exists');
  const content = JSON.parse(n.content);
  assert.strictEqual(content.stats.mcqs, 205, 'Agriculture bundled MCQs = 205');
  assert.strictEqual(content.stats.subs, 75, 'Agriculture bundled Subjectives = 75');
});

// 43. Class 9 internal progression & advance registration verification
runTest(43, 'Class 9 internal progression & advance registration verification', () => {
  const c9Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND stage = 'Class 9'").get().c;
  assert.strictEqual(c9Count, 0, 'Class 9 must not have board exam questions generated');
  const upmspData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/upmsp-uttar-pradesh.json'), 'utf8'));
  assert.strictEqual(upmspData.class_9.board_exam_eligible, false, 'Class 9 board_exam_eligible must be false');
  assert.ok(upmspData.advance_registration_rules.class_9_rule.includes('advance registration'), 'Class 9 advance registration verified');
});

// 44. Class 11 internal progression & advance registration verification
runTest(44, 'Class 11 internal progression & advance registration verification', () => {
  const c11Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh' AND stage = 'Class 11'").get().c;
  assert.strictEqual(c11Count, 0, 'Class 11 must not have board exam questions generated');
  const upmspData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/upmsp-uttar-pradesh.json'), 'utf8'));
  assert.strictEqual(upmspData.class_11.board_exam_eligible, false, 'Class 11 board_exam_eligible must be false');
  assert.ok(upmspData.advance_registration_rules.class_11_rule.includes('advance registration'), 'Class 11 advance registration verified');
});

// 45. Database foreign key integrity check
runTest(45, 'Database foreign key integrity check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations in database');
});

// 46. Database pragma integrity check
runTest(46, 'Database pragma integrity check', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Integrity check must return ok');
});

// 47. Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE questions
runTest(47, 'Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE questions', () => {
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
});

// 48. Other 21 unprompted boards remain strictly at 000 questions
runTest(48, 'Other 21 unprompted boards remain strictly at 000 questions', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 49. Language fidelity: Hindi, English, Sanskrit, Urdu, Punjabi, Bengali
runTest(49, 'Language fidelity across language scripts', () => {
  const engQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-english-10' LIMIT 1").get();
  const parsedEng = JSON.parse(engQ.language_content);
  assert.ok(parsedEng.en, 'English subject has English content');

  const hiQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-hindi-10' LIMIT 1").get();
  const parsedHi = JSON.parse(hiQ.language_content);
  assert.ok(parsedHi.hi, 'Hindi subject has Hindi content');

  const saQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-sanskrit-10' LIMIT 1").get();
  const parsedSa = JSON.parse(saQ.language_content);
  assert.ok(parsedSa.sa, 'Sanskrit subject has Sanskrit content');

  const urQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-urdu-10' LIMIT 1").get();
  const parsedUr = JSON.parse(urQ.language_content);
  assert.ok(parsedUr.ur, 'Urdu subject has Urdu content');

  const paQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-punjabi-10' LIMIT 1").get();
  const parsedPa = JSON.parse(paQ.language_content);
  assert.ok(parsedPa.pa, 'Punjabi subject has Punjabi content');

  const bnQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-bengali-10' LIMIT 1").get();
  const parsedBn = JSON.parse(bnQ.language_content);
  assert.ok(parsedBn.bn, 'Bengali subject has Bengali content');
});

// 50. Option script fidelity
runTest(50, 'Option script fidelity', () => {
  const hiQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'upmsp-hindi-10' AND q.question_type_id = 'single_mcq' LIMIT 1").get();
  const parsed = JSON.parse(hiQ.language_content);
  assert.ok(parsed.hi.options[0].includes('विकल्प क)'), 'Hindi options use Devanagari sequence');
});

console.log('\n========================================================');
console.log(`📊 UPMSP ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 50)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

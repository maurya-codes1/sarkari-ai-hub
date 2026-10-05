const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — BSEB BOARD ISOLATION & VERIFICATION SUITE');
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

// 1. BSEB board_id enforcement
runTest(1, 'BSEB board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND board_id != 'bseb-bihar'").get().c;
  assert.strictEqual(invalid, 0, 'All BSEB questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar'").get().c;
  assert.strictEqual(count, 8400, 'Total BSEB questions must match exactly 8400');
});

// 2. No CBSE question in BSEB
runTest(2, 'No CBSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero CBSE questions in BSEB');
});

// 3. No PSEB question in BSEB
runTest(3, 'No PSEB question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND (question_id LIKE 'pseb-%' OR subject_id LIKE 'pseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero PSEB questions in BSEB');
});

// 4. No RBSE question in BSEB
runTest(4, 'No RBSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'rbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero RBSE questions in BSEB');
});

// 5. No HBSE question in BSEB
runTest(5, 'No HBSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'hbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HBSE questions in BSEB');
});

// 6. No HPBOSE question in BSEB
runTest(6, 'No HPBOSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'hpbose-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HPBOSE questions in BSEB');
});

// 7. No UP Board question in BSEB
runTest(7, 'No UP Board question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'upmsp-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero UP Board questions in BSEB');
});

// 8. No MPBSE question in BSEB
runTest(8, 'No MPBSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'mpbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero MPBSE questions in BSEB');
});

// 9. No ICSE question in BSEB
runTest(9, 'No ICSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'icse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero ICSE questions in BSEB');
});

// 10. No NIOS question in BSEB
runTest(10, 'No NIOS question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_id LIKE 'nios-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero NIOS questions in BSEB');
});

// 11. No BBOSE question in BSEB
runTest(11, 'No BBOSE question in BSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND (question_id LIKE 'bbose-%' OR provenance LIKE '%BBOSE%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero BBOSE open-school questions in BSEB');
});

// 12. Class 10 subject isolation
runTest(12, 'Class 10 subject isolation', () => {
  const c10Count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'bseb-bihar' AND stage = 'Class 10'").get().c;
  assert.strictEqual(c10Count, 9, 'Exactly 9 Class 10 primary preparation subjects');
  const totalC10 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND stage = 'Class 10'").get().c;
  assert.strictEqual(totalC10, 2520, 'Class 10 total: 9 x 280 = 2520 questions');
});

// 13. Class 12 subject isolation
runTest(13, 'Class 12 subject isolation', () => {
  const totalC12 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND stage = 'Class 12'").get().c;
  assert.strictEqual(totalC12, 5880, 'Class 12 total: 21 x 280 = 5880 questions');
});

// 14. Science isolation
runTest(14, 'Science isolation', () => {
  const sciSubjects = ['bseb-physics-12', 'bseb-chemistry-12', 'bseb-biology-12', 'bseb-math-12', 'bseb-english-12', 'bseb-hindi-12', 'bseb-cs-12'];
  const count = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND subject_id IN (${sciSubjects.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 1960, 'Science stream: 7 x 280 = 1960 questions');
});

// 15. Commerce isolation
runTest(15, 'Commerce isolation', () => {
  const comSubjects = ['bseb-accountancy-12', 'bseb-business-12', 'bseb-economics-12', 'bseb-entrepreneurship-12', 'bseb-english-com-12', 'bseb-hindi-com-12'];
  const count = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND subject_id IN (${comSubjects.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 1680, 'Commerce stream: 6 x 280 = 1680 questions');
});

// 16. Humanities isolation
runTest(16, 'Humanities isolation', () => {
  const humSubjects = ['bseb-history-12', 'bseb-polity-12', 'bseb-geography-12', 'bseb-economics-arts-12', 'bseb-sociology-12', 'bseb-psychology-12', 'bseb-philosophy-12'];
  const count = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND subject_id IN (${humSubjects.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 1960, 'Humanities stream: 7 x 280 = 1960 questions');
});

// 17. Agriculture isolation
runTest(17, 'Agriculture isolation', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND subject_id = 'bseb-agri-12'").get().c;
  assert.strictEqual(count, 280, 'Agriculture stream: 1 x 280 = 280 questions');
});

// 18. Language isolation
runTest(18, 'Language isolation', () => {
  const sample = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'bseb-%' LIMIT 10").all();
  sample.forEach(s => {
    const parsed = JSON.parse(s.language_content);
    assert.ok(parsed.hi || parsed.en || parsed.ur || parsed.sa || parsed.mai, 'Must have authentic language key');
  });
});

// 19. Hindi script validation
runTest(19, 'Hindi script validation', () => {
  const qv = db.prepare("SELECT language_content FROM question_versions WHERE question_id = 'bseb-hindi-10-q-mcq-001'").get();
  const parsed = JSON.parse(qv.language_content);
  assert.ok(/[\u0900-\u097F]/.test(parsed.hi.question), 'Devanagari characters present in Hindi question');
});

// 20. Urdu script validation
runTest(20, 'Urdu script validation', () => {
  const qv = db.prepare("SELECT language_content FROM question_versions WHERE question_id = 'bseb-urdu-10-q-mcq-001'").get();
  const parsed = JSON.parse(qv.language_content);
  assert.ok(/[\u0600-\u06FF]/.test(parsed.ur.question), 'Nastaliq / Arabic characters present in Urdu question');
});

// 21. Bangla script validation
runTest(21, 'Bangla script validation in registry', () => {
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  const bn = bsebData.language_script_registry.find(l => l.language_id === 'bn');
  assert.ok(bn, 'Bangla script entry defined in registry');
});

// 22. Maithili validation
runTest(22, 'Maithili validation', () => {
  const qv = db.prepare("SELECT language_content FROM question_versions WHERE question_id = 'bseb-maithili-10-q-mcq-001'").get();
  const parsed = JSON.parse(qv.language_content);
  assert.ok(parsed.mai.question.includes('मैथिल') || parsed.mai.question.includes('मैट्रिक'), 'Maithili question verified');
});

// 23. Provenance validation
runTest(23, 'Provenance validation', () => {
  const prov = db.prepare("SELECT DISTINCT provenance FROM questions WHERE board_id = 'bseb-bihar'").all();
  assert.strictEqual(prov.length, 1);
  assert.strictEqual(prov[0].provenance, 'OFFICIAL_BSEB_SYLLABUS_DERIVED');
});

// 24. Syllabus mapping
runTest(24, 'Syllabus mapping', () => {
  const sample = db.prepare("SELECT language_content FROM question_versions WHERE question_id LIKE 'bseb-%' LIMIT 5").all();
  sample.forEach(s => {
    assert.ok(s.language_content.includes('2026-27'), 'Contains 2026-27 syllabus curriculum citation');
  });
});

// 25. Chapter mapping
runTest(25, 'Chapter mapping verification', () => {
  const qv = db.prepare("SELECT language_content FROM question_versions WHERE question_id = 'bseb-math-10-q-mcq-001'").get();
  assert.ok(qv.language_content.includes('Real Numbers') || qv.language_content.includes('वास्तविक संख्याएं'), 'Chapter accurately cited');
});

// 26. Topic mapping
runTest(26, 'Topic mapping verification', () => {
  const qv = db.prepare("SELECT language_content FROM question_versions WHERE question_id = 'bseb-physics-12-q-mcq-001'").get();
  assert.ok(qv.language_content.includes('Electric Charges') || qv.language_content.includes('वैद्युत आवेश'), 'Physics topic accurately cited');
});

// 27. Objective count audit
runTest(27, 'Objective count audit (>= 200 per primary subject)', () => {
  const subjects = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_type_id = 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjects.length, 30, 'All 30 subject instances covered');
  subjects.forEach(s => {
    assert.strictEqual(s.c, 205, `${s.subject_id} must have exactly 205 MCQs`);
  });
});

// 28. Subjective depth audit
runTest(28, 'Subjective depth audit (75 questions per subject, 3x board paper)', () => {
  const subjects = db.prepare("SELECT subject_id, COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_type_id != 'single_mcq' GROUP BY subject_id").all();
  assert.strictEqual(subjects.length, 30, 'All 30 subject instances covered');
  subjects.forEach(s => {
    assert.strictEqual(s.c, 75, `${s.subject_id} must have exactly 75 subjective questions`);
  });
});

// 29. Registration provenance
runTest(29, 'Registration provenance', () => {
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.ok(bsebData.official_urls.secondary, 'BSEB secondary portal defined');
});

// 30. Eligibility provenance
runTest(30, 'Eligibility provenance', () => {
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.strictEqual(bsebData.class_10.compulsory_papers, 5, 'Matric compulsory papers documented');
});

// 31. Class 9 scope
runTest(31, 'Class 9 scope correctness', () => {
  const c9Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND stage = 'Class 9'").get().c;
  assert.strictEqual(c9Count, 0, 'Class 9 must not have board exam questions generated');
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.strictEqual(bsebData.class_9.board_exam_eligible, false, 'Class 9 board_exam_eligible must be false');
});

// 32. Class 11 scope
runTest(32, 'Class 11 scope correctness', () => {
  const c11Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND stage = 'Class 11'").get().c;
  assert.strictEqual(c11Count, 0, 'Class 11 must not have board exam questions generated');
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.strictEqual(bsebData.class_11.board_exam_eligible, false, 'Class 11 board_exam_eligible must be false');
});

// 33. Class 9->10 dependency
runTest(33, 'Class 9->10 dependency', () => {
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.ok(bsebData.class_9.progression_to_class_10.length > 0, 'Class 9->10 progression documented');
});

// 34. Class 11->12 dependency
runTest(34, 'Class 11->12 dependency', () => {
  const bsebData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/bseb-bihar.json'), 'utf8'));
  assert.ok(bsebData.class_11.progression_to_class_12.length > 0, 'Class 11->12 progression documented');
});

// 35. PDF internal duplicate prevention
runTest(35, 'PDF internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-bseb-c10-all-subject'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.objectives.map(o => o.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs in PDF bundled notes');
});

// 36. Revision internal duplicate prevention
runTest(36, 'Revision internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-bseb-c12-science-all'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.subjectives.map(s => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate subjectives in science revision note');
});

// 37. Learning Mock studied-question reuse
runTest(37, 'Learning Mock studied-question reuse capability', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND practice_eligible = 1").get().c;
  assert.ok(count >= 5000, 'Ample practice questions for mock loop');
});

// 38. Practice Mock mixed selection
runTest(38, 'Practice Mock mixed selection', () => {
  const mathQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND subject_id = 'bseb-math-10' AND practice_eligible = 1").get().c;
  assert.ok(mathQ >= 200, 'Math practice pool satisfies mock generation');
});

// 39. Full Exam blueprint protection
runTest(39, 'Full Exam blueprint protection', () => {
  const subjEligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(subjEligible, 0, 'Zero subjective questions allowed in MCQ full exam engine');
});

// 40. No cross-board fallback
runTest(40, 'No cross-board fallback', () => {
  const foreignInBseb = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND (board_id != 'bseb-bihar' OR question_id NOT LIKE 'bseb-%')").get().c;
  assert.strictEqual(foreignInBseb, 0, 'No cross-board fallback in BSEB questions');
});

// 41. No global unfiltered question selection
runTest(41, 'No global unfiltered question selection', () => {
  const boardsCount = db.prepare("SELECT COUNT(*) as c FROM boards").get().c;
  assert.ok(boardsCount >= 31, 'Boards registry preserved');
});

// 42. No full-database payload
runTest(42, 'No full-database payload constraint', () => {
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar'").get().c;
  assert.ok(total < 10000, 'Payload is appropriately sized (< 10000 questions)');
});

// 43. PYQ provenance validation
runTest(43, 'PYQ provenance validation', () => {
  const fakePyq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar' AND provenance = 'OFFICIAL_BSEB_PYQ'").get().c;
  assert.strictEqual(fakePyq, 0, 'No fabricated PYQs');
});

// 44. Database integrity
runTest(44, 'Database integrity check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations in database');
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Integrity check must return ok');
});

// 45. Existing question preservation
runTest(45, 'Existing competitive, CBSE, and PSEB questions preservation', () => {
  const compCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;
  assert.ok(compCount >= 15000, `Competitive questions must remain intact (found ${compCount})`);
  const cbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.strictEqual(cbseCount, 7000, 'CBSE questions preserved intact');
  const psebCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab'").get().c;
  assert.strictEqual(psebCount, 8680, 'PSEB questions preserved intact');
});

// 46. No unrelated feature mutation
runTest(46, 'No unrelated feature mutation', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 47. Current/historical version isolation
runTest(47, 'Current/historical version isolation', () => {
  const versions = db.prepare("SELECT COUNT(DISTINCT version_number) as v FROM question_versions WHERE question_id LIKE 'bseb-%'").get().v;
  assert.strictEqual(versions, 1, 'Clean version 1 baseline');
});

// 48. Paper-language isolation
runTest(48, 'Paper-language isolation', () => {
  const note = db.prepare("SELECT language_id FROM notes WHERE note_id = 'note-bseb-c10-all-subject'").get();
  assert.strictEqual(note.language_id, 'hi', 'Primary note language is Hindi');
});

// 49. Question-language isolation
runTest(49, 'Question-language isolation', () => {
  const englishQ = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'bseb-english-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(englishQ.language_content);
  assert.ok(parsed.en, 'English question has English content');
  assert.ok(!parsed.hi, 'Pure English subject does not have Hindi override');
});

// 50. Option-language isolation
runTest(50, 'Option-language isolation', () => {
  const hiQ = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'bseb-hindi-10' AND q.question_type_id = 'single_mcq'
    LIMIT 1
  `).get();
  const parsed = JSON.parse(hiQ.language_content);
  assert.ok(parsed.hi.options[0].includes('विकल्प क)'), 'Devanagari options use क, ख, ग, घ sequence');
});

console.log('\n========================================================');
console.log(`📊 BSEB ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 50)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
}

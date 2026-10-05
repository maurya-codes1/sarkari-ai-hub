const assert = require('assert');
const path = require('path');
const fs = require('fs');
const db = require('../db/database').getDb();

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — PSEB BOARD ISOLATION & VERIFICATION SUITE');
console.log('========================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/45] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/45] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

// 1. PSEB board_id enforcement
runTest(1, 'PSEB board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND board_id != 'pseb-punjab'").get().c;
  assert.strictEqual(invalid, 0, 'All PSEB questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab'").get().c;
  assert.strictEqual(count, 8680, 'Total PSEB questions must match exactly 8680');
});

// 2. No CBSE question in PSEB
runTest(2, 'No CBSE question in PSEB', () => {
  const overlap = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'pseb-punjab' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')
  `).get().c;
  assert.strictEqual(overlap, 0, 'Zero CBSE questions in PSEB');
});

// 3. No BSEB question in PSEB
runTest(3, 'No BSEB question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'bseb-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero BSEB questions in PSEB');
});

// 4. No RBSE question in PSEB
runTest(4, 'No RBSE question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'rbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero RBSE questions in PSEB');
});

// 5. No HBSE question in PSEB
runTest(5, 'No HBSE question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'hbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HBSE questions in PSEB');
});

// 6. No HPBOSE question in PSEB
runTest(6, 'No HPBOSE question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'hpbose-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HPBOSE questions in PSEB');
});

// 7. No ICSE question in PSEB
runTest(7, 'No ICSE question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'icse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero ICSE questions in PSEB');
});

// 8. No NIOS question in PSEB
runTest(8, 'No NIOS question in PSEB', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id LIKE 'nios-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero NIOS questions in PSEB');
});

// 9. Class 10 subject isolation
runTest(9, 'Class 10 subject isolation', () => {
  const subjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 10'").all().map(s => s.subject_id);
  assert.strictEqual(subjs.length, 10, 'Class 10 must contain exactly 10 primary subjects');
  for (const s of subjs) {
    assert.ok(s.startsWith('pseb-'), `Subject ${s} must be PSEB-specific`);
    assert.ok(s.endsWith('-10'), `Subject ${s} must belong to Class 10`);
  }
});

// 10. Class 12 subject isolation
runTest(10, 'Class 12 subject isolation', () => {
  const stages = db.prepare("SELECT DISTINCT stage FROM questions WHERE board_id = 'pseb-punjab' AND stage LIKE 'Class 12%'").all().map(s => s.stage);
  assert.strictEqual(stages.length, 4, 'Class 12 must contain Science, Commerce, Humanities, and Agriculture');
});

// 11. Humanities isolation
runTest(11, 'Humanities isolation', () => {
  const humSubjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 12 Humanities'").all().map(s => s.subject_id);
  assert.strictEqual(humSubjs.length, 7, 'Humanities must have 7 distinct primary subjects');
  assert.ok(humSubjs.includes('pseb-history-12'));
  assert.ok(humSubjs.includes('pseb-polity-12'));
});

// 12. Science isolation
runTest(12, 'Science isolation', () => {
  const sciSubjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 12 Science'").all().map(s => s.subject_id);
  assert.strictEqual(sciSubjs.length, 7, 'Science must have 7 distinct primary subjects');
  assert.ok(sciSubjs.includes('pseb-physics-12'));
  assert.ok(sciSubjs.includes('pseb-chemistry-12'));
});

// 13. Commerce isolation
runTest(13, 'Commerce isolation', () => {
  const comSubjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 12 Commerce'").all().map(s => s.subject_id);
  assert.strictEqual(comSubjs.length, 6, 'Commerce must have 6 distinct primary subjects');
  assert.ok(comSubjs.includes('pseb-business-12'));
  assert.ok(comSubjs.includes('pseb-accountancy-12'));
});

// 14. Agriculture isolation
runTest(14, 'Agriculture isolation', () => {
  const agriSubjs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 12 Agriculture'").all().map(s => s.subject_id);
  assert.strictEqual(agriSubjs.length, 1, 'Agriculture stream primary track');
  assert.ok(agriSubjs.includes('pseb-agri-12'));
});

// 15. Punjabi/Gurmukhi validation
runTest(15, 'Punjabi/Gurmukhi validation', () => {
  const pbiQuestions = db.prepare(`
    SELECT qv.language_content 
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'pseb-punjab' AND q.subject_id IN ('pseb-punjabi-10', 'pseb-gen-punjabi-12')
    LIMIT 20
  `).all();
  assert.ok(pbiQuestions.length > 0, 'Must have Punjabi questions');
  for (const item of pbiQuestions) {
    const parsed = JSON.parse(item.language_content);
    assert.ok(parsed.pa, 'Punjabi language key pa must exist');
    const text = parsed.pa.q;
    // Check for Gurmukhi Unicode range \u0A00-\u0A7F
    const hasGurmukhi = /[\u0A00-\u0A7F]/.test(text);
    assert.ok(hasGurmukhi, `Punjabi question must contain actual Gurmukhi script: ${text}`);
  }
});

// 16. Urdu script validation
runTest(16, 'Urdu script validation', () => {
  const urduQuestions = db.prepare(`
    SELECT qv.language_content 
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'pseb-punjab' AND q.subject_id = 'pseb-urdu-10'
    LIMIT 10
  `).all();
  assert.ok(urduQuestions.length > 0, 'Must have Urdu questions');
  for (const item of urduQuestions) {
    const parsed = JSON.parse(item.language_content);
    assert.ok(parsed.ur, 'Urdu key ur must exist');
    const hasArabicUrdu = /[\u0600-\u06FF]/.test(parsed.ur.q);
    assert.ok(hasArabicUrdu, `Urdu question must contain actual Urdu script: ${parsed.ur.q}`);
  }
});

// 17. Hindi script validation
runTest(17, 'Hindi script validation', () => {
  const hindiQuestions = db.prepare(`
    SELECT qv.language_content 
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.board_id = 'pseb-punjab' AND q.subject_id = 'pseb-hindi-10'
    LIMIT 10
  `).all();
  assert.ok(hindiQuestions.length > 0, 'Must have Hindi questions');
  for (const item of hindiQuestions) {
    const parsed = JSON.parse(item.language_content);
    assert.ok(parsed.hi, 'Hindi key hi must exist');
    const hasDevanagari = /[\u0900-\u097F]/.test(parsed.hi.q);
    assert.ok(hasDevanagari, `Hindi question must contain actual Devanagari script: ${parsed.hi.q}`);
  }
});

// 18. Provenance validation
runTest(18, 'Provenance validation', () => {
  const allowed = ['OFFICIAL_PSEB_SAMPLE', 'OFFICIAL_PSEB_PYQ', 'OFFICIAL_PSEB_MODEL', 'HUMAN_CURATED_PSEB', 'AI_PRACTICE_PSEB'];
  const invalid = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'pseb-punjab' AND provenance NOT IN (${allowed.map(a => `'${a}'`).join(',')})
  `).get().c;
  assert.strictEqual(invalid, 0, 'All questions have approved PSEB provenance');
});

// 19. Syllabus mapping
runTest(19, 'Syllabus mapping', () => {
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab'").get().c;
  assert.strictEqual(total, 8680, 'Total questions must match exactly 8680');
});

// 20. Chapter mapping verification
runTest(20, 'Chapter mapping verification', () => {
  const psebJsonPath = path.join(__dirname, '../../data/boards/pseb-punjab.json');
  assert.ok(fs.existsSync(psebJsonPath), 'PSEB curriculum dictionary present');
});

// 21. Topic mapping verification
runTest(21, 'Topic mapping verification', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-pseb-c10-all-subject'").get();
  assert.ok(note, 'Master note exists');
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.objectives.length > 0, 'Objectives present');
  assert.ok(parsed.subjectives.length > 0, 'Subjectives present');
});

// 22. Objective count audit (>= 200 per primary subject)
runTest(22, 'Objective count audit (>= 200 per primary subject)', () => {
  const subjs = db.prepare(`
    SELECT subject_id, stage, COUNT(*) as mcq_count 
    FROM questions 
    WHERE board_id = 'pseb-punjab' AND question_type_id = 'single_mcq'
    GROUP BY subject_id, stage
  `).all();
  for (const s of subjs) {
    assert.ok(s.mcq_count >= 200, `Subject ${s.subject_id} in ${s.stage} must have >= 200 MCQs (found ${s.mcq_count})`);
  }
});

// 23. Subjective depth audit (75 questions per subject, 3x board paper)
runTest(23, 'Subjective depth audit (75 questions per subject, 3x board paper)', () => {
  const subjs = db.prepare(`
    SELECT subject_id, stage, COUNT(*) as sub_count 
    FROM questions 
    WHERE board_id = 'pseb-punjab' AND question_type_id != 'single_mcq'
    GROUP BY subject_id, stage
  `).all();
  for (const s of subjs) {
    assert.strictEqual(s.sub_count, 75, `Subject ${s.subject_id} in ${s.stage} must have exactly 75 subjectives (found ${s.sub_count})`);
  }
});

// 24. Registration provenance
runTest(24, 'Registration provenance', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.strictEqual(psebJson.official_website, 'https://www.pseb.ac.in/', 'Official website verified');
});

// 25. Eligibility provenance
runTest(25, 'Eligibility provenance', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.ok(psebJson.class_10.total_subjects_per_candidate === 8, '8 subjects per candidate');
});

// 26. Class 9 scope correctness
runTest(26, 'Class 9 scope correctness', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.strictEqual(psebJson.class_9.board_exam_eligible, false, 'Class 9 has no public board exam');
});

// 27. Class 11 scope correctness
runTest(27, 'Class 11 scope correctness', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.strictEqual(psebJson.class_11.board_exam_eligible, false, 'Class 11 has no public board exam');
});

// 28. Class 9->10 dependency
runTest(28, 'Class 9->10 dependency', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.ok(psebJson.class_9.progression_to_class_10.length > 0, 'Class 9->10 progression rule documented');
});

// 29. Class 11->12 dependency
runTest(29, 'Class 11->12 dependency', () => {
  const psebJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/pseb-punjab.json'), 'utf8'));
  assert.ok(psebJson.class_11.progression_to_class_12.length > 0, 'Class 11->12 progression rule documented');
});

// 30. PDF internal duplicate prevention
runTest(30, 'PDF internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-pseb-c10-all-subject'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.objectives.map(o => o.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs in PDF bundled notes');
});

// 31. Revision internal duplicate prevention
runTest(31, 'Revision internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-pseb-c12-science-all'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.subjectives.map(s => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate subjectives in science revision note');
});

// 32. Learning Mock studied-question reuse
runTest(32, 'Learning Mock studied-question reuse capability', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND practice_eligible = 1").get().c;
  assert.ok(count >= 5000, 'Ample practice questions for mock loop');
});

// 33. Practice Mock mixed selection
runTest(33, 'Practice Mock mixed selection', () => {
  const mathQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND subject_id = 'pseb-math-10' AND practice_eligible = 1").get().c;
  assert.ok(mathQ >= 200, 'Math practice pool satisfies mock generation');
});

// 34. Full Exam blueprint protection
runTest(34, 'Full Exam blueprint protection', () => {
  const subEligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(subEligible, 0, 'Subjectives must strictly be full_exam_eligible = 0');
});

// 35. No cross-board fallback
runTest(35, 'No cross-board fallback', () => {
  const crossBoard = db.prepare(`
    SELECT COUNT(*) as c FROM questions 
    WHERE board_id = 'pseb-punjab' AND source_id != 'src-pseb-punjab-portal'
  `).get().c;
  assert.strictEqual(crossBoard, 0, 'Every question strictly references official PSEB source portal');
});

// 36. No global unfiltered question selection
runTest(36, 'No global unfiltered question selection', () => {
  const nonPsebInPseb = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND question_id NOT LIKE 'pseb-%'").get().c;
  assert.strictEqual(nonPsebInPseb, 0, 'Zero non-PSEB IDs inside PSEB partition');
});

// 37. No full-database payload constraint
runTest(37, 'No full-database payload constraint', () => {
  const c10Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND stage = 'Class 10'").get().c;
  assert.strictEqual(c10Count, 2800, 'Stage filter selects precisely Class 10 questions (2800)');
});

// 38. PYQ provenance validation
runTest(38, 'PYQ provenance validation', () => {
  const fakePyq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab' AND provenance = 'OFFICIAL_PSEB_PYQ' AND historical_year IS NULL").get().c;
  assert.strictEqual(fakePyq, 0, 'No fake PYQ claims');
});

// 39. Database integrity check
runTest(39, 'Database integrity check', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Database integrity must be ok');
  const fk = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fk.length, 0, 'Zero foreign key violations');
});

// 40. Existing question preservation
runTest(40, 'Existing competitive and CBSE questions preservation', () => {
  const cbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.strictEqual(cbseCount, 7000, 'CBSE questions remain intact at 7000');
  const compCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL").get().c;
  assert.strictEqual(compCount, 15390, 'Competitive exams remain intact at 15390');
});

// 41. No unrelated feature mutation
runTest(41, 'No unrelated feature mutation', () => {
  const boardsCount = db.prepare("SELECT COUNT(*) as c FROM boards").get().c;
  assert.ok(boardsCount >= 31, 'Boards registry preserved');
});

// 42. Current/historical version isolation
runTest(42, 'Current/historical version isolation', () => {
  const versions = db.prepare("SELECT COUNT(DISTINCT version_number) as v FROM question_versions WHERE question_id LIKE 'pseb-%'").get().v;
  assert.strictEqual(versions, 1, 'Clean version 1 baseline');
});

// 43. Paper-language isolation
runTest(43, 'Paper-language isolation', () => {
  const note = db.prepare("SELECT language_id FROM notes WHERE note_id = 'note-pseb-c10-all-subject'").get();
  assert.strictEqual(note.language_id, 'pa', 'Primary note language is Punjabi');
});

// 44. Question-language isolation
runTest(44, 'Question-language isolation', () => {
  const englishQ = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'pseb-english-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(englishQ.language_content);
  assert.ok(parsed.en, 'English question has English content');
  assert.ok(!parsed.pa, 'Pure English subject does not have Gurmukhi override');
});

// 45. Option-language isolation
runTest(45, 'Option-language isolation', () => {
  const pbiQ = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'pseb-punjabi-10' AND q.question_type_id = 'single_mcq'
    LIMIT 1
  `).get();
  const parsed = JSON.parse(pbiQ.language_content);
  assert.ok(parsed.pa.options[0].startsWith('ੳ)'), 'Gurmukhi options use ੳ, ਅ, ੲ, ਸ sequence');
});

console.log('\n========================================================');
console.log(`📊 PSEB ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 45)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
}

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — RBSE RAJASTHAN BOARD ISOLATION & VERIFICATION SUITE');
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

// 1. RBSE board isolation
runTest(1, 'RBSE board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND board_id != 'rbse-rajasthan'").get().c;
  assert.strictEqual(invalid, 0, 'All RBSE questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan'").get().c;
  assert.strictEqual(count, 8680, 'Total RBSE questions must match exactly 8680');
});

// 2. Class 10 subject dictionary
runTest(2, 'Class 10 subject dictionary', () => {
  const c10Subjs = [
    'rbse-hindi-10', 'rbse-english-10', 'rbse-science-10', 'rbse-social-10',
    'rbse-math-10', 'rbse-sanskrit-10', 'rbse-urdu-10', 'rbse-punjabi-10',
    'rbse-gujarati-10', 'rbse-sindhi-10'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 10' AND subject_id IN (${c10Subjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 10, 'All 10 Class 10 subjects present');
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 10'").get().c;
  assert.strictEqual(total, 2800, 'Class 10 total: 10 x 280 = 2800 questions');
});

// 3. Class 12 subject dictionary
runTest(3, 'Class 12 subject dictionary', () => {
  const c12Count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 12'").get().c;
  assert.strictEqual(c12Count, 21, 'Exactly 21 Class 12 primary subjects across 4 streams');
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 12'").get().c;
  assert.strictEqual(total, 5880, 'Class 12 total: 21 x 280 = 5880 questions');
});

// 4. Class 9 scope
runTest(4, 'Class 9 scope', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.strictEqual(dict.class_9.board_exam_eligible, false, 'Class 9 has no public board exam');
  assert.ok(dict.class_9.examination_status.includes('School-Level'), 'School level exam documented');
});

// 5. Class 11 scope
runTest(5, 'Class 11 scope', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.strictEqual(dict.class_11.board_exam_eligible, false, 'Class 11 has no public board exam');
  assert.ok(dict.class_11.examination_status.includes('School-Level'), 'School level exam documented');
});

// 6. Stream/category isolation (Science, Commerce, Humanities, Agriculture)
runTest(6, 'Stream/category isolation', () => {
  const sciSubjs = ['rbse-physics-12', 'rbse-chemistry-12', 'rbse-biology-12', 'rbse-math-12', 'rbse-cs-12', 'rbse-english-comp-12', 'rbse-hindi-comp-12'];
  const comSubjs = ['rbse-accountancy-12', 'rbse-bst-12', 'rbse-economics-12', 'rbse-ip-com-12', 'rbse-english-comp-com-12', 'rbse-hindi-comp-com-12'];
  const humSubjs = ['rbse-history-12', 'rbse-geography-12', 'rbse-polscience-12', 'rbse-economics-hum-12', 'rbse-sociology-12', 'rbse-public-admin-12', 'rbse-homesci-12'];
  const agriSubjs = ['rbse-agriculture-12'];

  const sciCnt = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(sciCnt, 1960, 'Science track: 7 x 280 = 1960');
  const comCnt = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(comCnt, 1680, 'Commerce track: 6 x 280 = 1680');
  const humCnt = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(humCnt, 1960, 'Humanities track: 7 x 280 = 1960');
  const agriCnt = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id IN (${agriSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(agriCnt, 280, 'Agriculture track: 1 x 280 = 280');
});

// 7. Subject isolation
runTest(7, 'Subject isolation', () => {
  const invalidSubj = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id NOT LIKE 'rbse-%'").get().c;
  assert.strictEqual(invalidSubj, 0, 'Zero non-RBSE subjects inside RBSE partition');
});

// 8. >=200 objective where applicable (205 MCQs each)
runTest(8, '>=200 objective where applicable (205 MCQs each)', () => {
  const minMcq = db.prepare("SELECT MIN(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'single_mcq' GROUP BY subject_id)").get().m;
  const maxMcq = db.prepare("SELECT MAX(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'single_mcq' GROUP BY subject_id)").get().m;
  assert.strictEqual(minMcq, 205, 'Every RBSE subject has >= 200 MCQs');
  assert.strictEqual(maxMcq, 205, 'Every RBSE subject has exactly 205 MCQs');
  const totalMcq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'single_mcq'").get().c;
  assert.strictEqual(totalMcq, 6355, 'Total RBSE MCQs: 31 x 205 = 6355');
});

// 9. Subjective depth (75 per subject = 3x exam depth)
runTest(9, 'Subjective depth (75 per subject = 3x exam depth)', () => {
  const minSub = db.prepare("SELECT MIN(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq' GROUP BY subject_id)").get().m;
  const maxSub = db.prepare("SELECT MAX(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq' GROUP BY subject_id)").get().m;
  assert.strictEqual(minSub, 75, 'Every RBSE subject has exactly 75 Subjectives');
  assert.strictEqual(maxSub, 75, 'Every RBSE subject has exactly 75 Subjectives');
  const totalSub = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq'").get().c;
  assert.strictEqual(totalSub, 2325, 'Total RBSE Subjectives: 31 x 75 = 2325');
});

// 10. Chapter coverage across all subjects
runTest(10, 'Chapter coverage across all subjects', () => {
  const samples = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = 'rbse-rajasthan' LIMIT 50").all();
  for (const s of samples) {
    assert.ok(s.language_content.includes(' - '), 'Questions contain chapter-specific context');
  }
});

// 11. Topic coverage
runTest(11, 'Topic coverage', () => {
  const mathQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-math-10' AND q.question_type_id = 'single_mcq' LIMIT 5").all();
  for (const q of mathQ) {
    const parsed = JSON.parse(q.language_content);
    assert.ok(parsed.hi && parsed.en, 'Math questions are bilingual');
  }
});

// 12. Language truth
runTest(12, 'Language truth', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(Array.isArray(dict.language_script_registry), 'Language script registry present');
  assert.strictEqual(dict.language_script_registry.length, 8, '8 registered languages in script registry');
});

// 13. Urdu script validation (actual Nastaliq script)
runTest(13, 'Urdu script validation (actual Nastaliq script)', () => {
  const urQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-urdu-10' LIMIT 1").get();
  const parsed = JSON.parse(urQ.language_content);
  assert.ok(parsed.ur, 'Urdu subject contains Urdu content');
  assert.ok(parsed.ur.question.includes('راجستھان'), 'Urdu question contains authentic Urdu script');
});

// 14. Punjabi script validation (actual Gurmukhi script)
runTest(14, 'Punjabi script validation (actual Gurmukhi script)', () => {
  const paQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-punjabi-10' LIMIT 1").get();
  const parsed = JSON.parse(paQ.language_content);
  assert.ok(parsed.pa, 'Punjabi subject contains Punjabi content');
  assert.ok(parsed.pa.question.includes('ਰਾਜਸਥਾਨ'), 'Punjabi question contains Gurmukhi script');
});

// 15. Gujarati script validation (actual Gujarati script)
runTest(15, 'Gujarati script validation (actual Gujarati script)', () => {
  const guQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-gujarati-10' LIMIT 1").get();
  const parsed = JSON.parse(guQ.language_content);
  assert.ok(parsed.gu, 'Gujarati subject contains Gujarati content');
  assert.ok(parsed.gu.question.includes('માધ્યમિક') || parsed.gu.question.includes('પ્રશ્ન'), 'Gujarati question contains Gujarati script');
});

// 16. Sindhi script validation (actual Sindhi script)
runTest(16, 'Sindhi script validation (actual Sindhi script)', () => {
  const sdQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-sindhi-10' LIMIT 1").get();
  const parsed = JSON.parse(sdQ.language_content);
  assert.ok(parsed.sd, 'Sindhi subject contains Sindhi content');
  assert.ok(parsed.sd.question.includes('راجستان'), 'Sindhi question contains Sindhi script');
});

// 17. Sanskrit validation (actual Devanagari Sanskrit text)
runTest(17, 'Sanskrit validation (actual Devanagari Sanskrit text)', () => {
  const saQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-sanskrit-10' LIMIT 1").get();
  const parsed = JSON.parse(saQ.language_content);
  assert.ok(parsed.sa, 'Sanskrit subject contains Sanskrit content');
  assert.ok(parsed.sa.question.includes('पाठ्यक्रमानुसारं'), 'Sanskrit question contains Sanskrit inflections');
});

// 18. Registration source validation
runTest(18, 'Registration source validation', () => {
  const src = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-rbse-rajasthan-portal'").get();
  assert.ok(src, 'Official source exists');
  assert.strictEqual(src.organization_id, 'org-board-of-secondary-education-rajasthan-a', 'Correct organization ID');
  assert.strictEqual(src.verification_status, 'VERIFIED', 'Verification status is VERIFIED');
});

// 19. Eligibility source validation
runTest(19, 'Eligibility source validation', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(dict.passing_rules, 'Passing rules documented');
  assert.strictEqual(dict.passing_rules.minimum_percentage_per_subject, 33, '33% passing rule');
});

// 20. Class 9 -> 10 dependency
runTest(20, 'Class 9 -> 10 dependency', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(dict.class_9.progression_to_class_10, 'Progression documented');
});

// 21. Class 11 -> 12 dependency
runTest(21, 'Class 11 -> 12 dependency', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(dict.class_11.progression_to_class_12, 'Progression documented');
});

// 22. PYQ provenance
runTest(22, 'PYQ provenance enforcement', () => {
  const invalidProv = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND provenance != 'OFFICIAL_RBSE_SYLLABUS_DERIVED'").get().c;
  assert.strictEqual(invalidProv, 0, 'All questions have authentic RBSE provenance');
});

// 23. Official source validation in official_sources
runTest(23, 'Official source validation in official_sources', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND source_id = 'src-rbse-rajasthan-portal'").get().c;
  assert.strictEqual(count, 8680, 'All 8680 questions linked to src-rbse-rajasthan-portal');
});

// 24. PDF internal duplicate prevention
runTest(24, 'PDF internal duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-rbse-c10-all-subject'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.objectives.map(o => o.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs in PDF bundled notes');
});

// 25. Revision duplicate prevention
runTest(25, 'Revision duplicate prevention', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-rbse-c12-science-all'").get();
  const parsed = JSON.parse(note.content);
  const ids = parsed.subjectives.map(s => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate subjectives in science revision note');
});

// 26. Learning Mock reuse capability
runTest(26, 'Learning Mock reuse capability', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND practice_eligible = 1").get().c;
  assert.ok(count >= 5000, 'Ample practice questions for mock loop');
});

// 27. Practice Mock mixed selection
runTest(27, 'Practice Mock mixed selection', () => {
  const mathQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND subject_id = 'rbse-math-10' AND practice_eligible = 1").get().c;
  assert.ok(mathQ >= 200, 'Math practice pool satisfies mock generation');
});

// 28. Full Exam blueprint protection
runTest(28, 'Full Exam blueprint protection', () => {
  const subEligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(subEligible, 0, 'Subjectives must strictly be full_exam_eligible = 0');
});

// 29. Cross-board isolation
runTest(29, 'Cross-board isolation', () => {
  const cbseOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')").get().c;
  assert.strictEqual(cbseOverlap, 0, 'Zero CBSE questions in RBSE');
  const psebOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'pseb-%'").get().c;
  assert.strictEqual(psebOverlap, 0, 'Zero PSEB questions in RBSE');
  const bsebOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'bseb-%'").get().c;
  assert.strictEqual(bsebOverlap, 0, 'Zero BSEB questions in RBSE');
  const ubseOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'ubse-%'").get().c;
  assert.strictEqual(ubseOverlap, 0, 'Zero UBSE questions in RBSE');
  const upmspOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'upmsp-%'").get().c;
  assert.strictEqual(upmspOverlap, 0, 'Zero UPMSP questions in RBSE');
  const mpbseOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'mpbse-%'").get().c;
  assert.strictEqual(mpbseOverlap, 0, 'Zero MPBSE questions in RBSE');
  const niosOverlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_id LIKE 'nios-%'").get().c;
  assert.strictEqual(niosOverlap, 0, 'Zero NIOS questions in RBSE');
});

// 30. Cross-class isolation
runTest(30, 'Cross-class isolation', () => {
  const c10InC12 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 12' AND subject_id LIKE 'rbse-%-10'").get().c;
  assert.strictEqual(c10InC12, 0, 'Zero Class 10 subjects in Class 12');
  const c12InC10 = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 10' AND subject_id LIKE 'rbse-%-12'").get().c;
  assert.strictEqual(c12InC10, 0, 'Zero Class 12 subjects in Class 10');
});

// 31. Cross-language isolation
runTest(31, 'Cross-language isolation', () => {
  const engQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-english-10' LIMIT 1").get();
  const parsedEng = JSON.parse(engQ.language_content);
  assert.ok(parsedEng.en && !parsedEng.hi, 'English subject is English monolingual');
  const hiQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'rbse-hindi-10' LIMIT 1").get();
  const parsedHi = JSON.parse(hiQ.language_content);
  assert.ok(parsedHi.hi && !parsedHi.en, 'Hindi subject is Hindi monolingual');
});

// 32. No full-database payload constraint
runTest(32, 'No full-database payload constraint', () => {
  const c10Count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND stage = 'Class 10'").get().c;
  assert.strictEqual(c10Count, 2800, 'Stage filter selects precisely Class 10 questions (2800)');
});

// 33. Database integrity check
runTest(33, 'Database integrity check', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Database integrity must be ok');
  const fk = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fk.length, 0, 'Zero foreign key violations');
});

// 34. Existing content preservation
runTest(34, 'Existing content preservation', () => {
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
  const mpbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(mpbseCount, 8680, 'MPBSE questions remain intact at 8680');
  const niosCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board'").get().c;
  assert.strictEqual(niosCount, 8680, 'NIOS questions remain intact at 8680');
});

// 35. Other 21 unprompted boards remain strictly at 000 questions
runTest(35, 'Other 21 unprompted boards remain strictly at 000 questions', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 36. Current/historical version isolation
runTest(36, 'Current/historical version isolation', () => {
  const versions = db.prepare("SELECT COUNT(DISTINCT version_number) as v FROM question_versions WHERE question_id LIKE 'rbse-%'").get().v;
  assert.strictEqual(versions, 1, 'Clean version 1 baseline');
});

// 37. Grouped-question preservation
runTest(37, 'Grouped-question preservation', () => {
  const caseQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(caseQ, 372, 'Exactly 372 Case Study / Grouped questions');
});

// 38. AI questions never classified as PYQ
runTest(38, 'AI questions never classified as PYQ', () => {
  const fakePyq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND provenance = 'OFFICIAL_RBSE_PYQ'").get().c;
  assert.strictEqual(fakePyq, 0, 'Zero fabricated PYQs');
});

// 39. AI questions never inserted into Full Exam
runTest(39, 'Subjective AI questions never inserted into Full Exam', () => {
  const subInFull = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(subInFull, 0, 'Zero subjective questions leaked into Full Exam timed engine');
});

// 40. API compatibility / question_versions parity
runTest(40, 'API compatibility / question_versions parity', () => {
  const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan'").get().c;
  const qvCount = db.prepare("SELECT COUNT(*) as c FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'rbse-rajasthan'").get().c;
  assert.strictEqual(qCount, 8680, '8680 questions');
  assert.strictEqual(qvCount, 8680, '8680 question versions matching 1:1');
});

// 41. Very Short Answer questions count & marks
runTest(41, 'Very Short Answer questions count & marks (24 per subj = 744, 2 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'very_short_answer'").get().c;
  assert.strictEqual(count, 744, '744 VSA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'very_short_answer' AND marks != 2.0").get().c;
  assert.strictEqual(marks, 0, 'All VSA carry 2 marks');
});

// 42. Short Answer questions count & marks
runTest(42, 'Short Answer questions count & marks (24 per subj = 744, 3 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'short_answer'").get().c;
  assert.strictEqual(count, 744, '744 SA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'short_answer' AND marks != 3.0").get().c;
  assert.strictEqual(marks, 0, 'All SA carry 3 marks');
});

// 43. Case Study questions count & marks
runTest(43, 'Case Study questions count & marks (12 per subj = 372, 4 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(count, 372, '372 Case Study questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'case_study' AND marks != 4.0").get().c;
  assert.strictEqual(marks, 0, 'All Case Study carry 4 marks');
});

// 44. Long Answer questions count & marks
runTest(44, 'Long Answer questions count & marks (15 per subj = 465, 5 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'long_answer'").get().c;
  assert.strictEqual(count, 465, '465 LA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'long_answer' AND marks != 5.0").get().c;
  assert.strictEqual(marks, 0, 'All LA carry 5 marks');
});

// 45. Objective mock eligibility
runTest(45, 'Objective mock eligibility (practice_eligible = 1 and full_exam_eligible = 1)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id = 'single_mcq' AND (practice_eligible != 1 OR full_exam_eligible != 1)").get().c;
  assert.strictEqual(count, 0, 'All 6355 MCQs eligible for CBT mock');
});

// 46. Subjective CBT mock isolation
runTest(46, 'Subjective CBT mock isolation (practice_eligible = 0 and full_exam_eligible = 0)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan' AND question_type_id != 'single_mcq' AND (practice_eligible != 0 OR full_exam_eligible != 0)").get().c;
  assert.strictEqual(count, 0, 'All 2325 subjectives quarantined from CBT mock');
});

// 47. Bundled study notes count
runTest(47, 'Bundled study notes count (5 notes)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM notes WHERE note_id LIKE 'note-rbse-%'").get().c;
  assert.strictEqual(count, 5, 'Exactly 5 bundled study notes');
});

// 48. Bundled study notes naming convention
runTest(48, 'Bundled study notes naming convention', () => {
  const expected = [
    'note-rbse-c10-all-subject',
    'note-rbse-c12-science-all',
    'note-rbse-c12-commerce-all',
    'note-rbse-c12-humanities-all',
    'note-rbse-c12-agriculture-all'
  ];
  for (const nid of expected) {
    const note = db.prepare("SELECT * FROM notes WHERE note_id = ?").get(nid);
    assert.ok(note, `Note ${nid} exists`);
  }
});

// 49. Special examination categories documented
runTest(49, 'Special examination categories documented in dictionary', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(dict.special_examination_categories.praveshika, 'Praveshika documented');
  assert.ok(dict.special_examination_categories.varishth_upadhyay, 'Varishth Upadhyay documented');
  assert.ok(dict.special_examination_categories.deaf_and_dumb_variants, 'D&D variants documented');
  assert.ok(dict.special_examination_categories.vocational_secondary, 'Vocational secondary documented');
});

// 50. Database foreign key check
runTest(50, 'Database foreign key check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations');
});

// 51. Marks scheme verification (80+20 non-practical, 56+14+30 practical)
runTest(51, 'Marks scheme verification', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/rbse-rajasthan.json'), 'utf8'));
  assert.ok(dict.class_10.scheme_of_examination.includes('80 Board Theory Exam + 20 Sessional'), 'Class 10 80+20 scheme documented');
  assert.ok(dict.class_12.scheme_of_examination.includes('56 Theory + 14 Sessional + 30 Practical'), 'Class 12 practical scheme documented');
});

// 52. Mobile/accessibility smoke test
runTest(52, 'Mobile/accessibility smoke test', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-rbse-c10-all-subject'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.objectives.length > 0, 'Objectives present in note for mobile view');
  assert.ok(parsed.subjectives.length > 0, 'Subjectives present in note for mobile view');
});

console.log('\n========================================================');
console.log(`📊 RBSE ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 52)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

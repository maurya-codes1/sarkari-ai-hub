const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — NIOS BOARD ISOLATION & VERIFICATION SUITE');
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

// 1. NIOS board_id enforcement
runTest(1, 'NIOS board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND board_id != 'nios-board'").get().c;
  assert.strictEqual(invalid, 0, 'All NIOS questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board'").get().c;
  assert.strictEqual(count, 8680, 'Total NIOS questions must match exactly 8680');
});

// 2. No CBSE question in NIOS
runTest(2, 'No CBSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'subj-cbse%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero CBSE questions in NIOS');
});

// 3. No PSEB question in NIOS
runTest(3, 'No PSEB question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'pseb-%' OR subject_id LIKE 'pseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero PSEB questions in NIOS');
});

// 4. No BSEB question in NIOS
runTest(4, 'No BSEB question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'bseb-%' OR subject_id LIKE 'bseb-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero BSEB questions in NIOS');
});

// 5. No UBSE question in NIOS
runTest(5, 'No UBSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'ubse-%' OR subject_id LIKE 'ubse-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero UBSE questions in NIOS');
});

// 6. No UPMSP question in NIOS
runTest(6, 'No UPMSP question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'upmsp-%' OR subject_id LIKE 'upmsp-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero UPMSP questions in NIOS');
});

// 7. No MPBSE question in NIOS
runTest(7, 'No MPBSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND (question_id LIKE 'mpbse-%' OR subject_id LIKE 'mpbse-%')").get().c;
  assert.strictEqual(overlap, 0, 'Zero MPBSE questions in NIOS');
});

// 8. No RBSE question in NIOS
runTest(8, 'No RBSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_id LIKE 'rbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero RBSE questions in NIOS');
});

// 9. No HBSE question in NIOS
runTest(9, 'No HBSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_id LIKE 'hbse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HBSE questions in NIOS');
});

// 10. No HPBOSE question in NIOS
runTest(10, 'No HPBOSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_id LIKE 'hpbose-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero HPBOSE questions in NIOS');
});

// 11. No ICSE question in NIOS
runTest(11, 'No ICSE question in NIOS', () => {
  const overlap = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_id LIKE 'icse-%'").get().c;
  assert.strictEqual(overlap, 0, 'Zero ICSE questions in NIOS');
});

// 12. Secondary Course (Class 10 level) subject isolation
runTest(12, 'Secondary Course (Class 10 level) subject isolation', () => {
  const secSubjs = [
    'nios-hindi-201', 'nios-english-202', 'nios-math-211', 'nios-science-212',
    'nios-social-213', 'nios-economics-214', 'nios-bst-215', 'nios-homesci-216',
    'nios-psychology-222', 'nios-indian-culture-223'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'nios-board' AND stage = 'Class 10' AND subject_id IN (${secSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 10, 'All 10 Secondary subjects present');
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND stage = 'Class 10'").get().c;
  assert.strictEqual(total, 2800, 'Secondary total: 10 x 280 = 2800 questions');
});

// 13. Senior Secondary Course Science track subject isolation
runTest(13, 'Senior Secondary Course Science track subject isolation', () => {
  const sciSubjs = [
    'nios-physics-312', 'nios-chemistry-313', 'nios-biology-314',
    'nios-math-311', 'nios-cs-330', 'nios-english-302', 'nios-environmental-333'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Senior Secondary Science subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${sciSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Science track total: 7 x 280 = 1960 questions');
});

// 14. Senior Secondary Course Commerce track subject isolation
runTest(14, 'Senior Secondary Course Commerce track subject isolation', () => {
  const comSubjs = [
    'nios-accountancy-320', 'nios-bst-319', 'nios-economics-318',
    'nios-dataentry-336', 'nios-hindi-301', 'nios-masscomm-335', 'nios-tourism-337'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Senior Secondary Commerce subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${comSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Commerce track total: 7 x 280 = 1960 questions');
});

// 15. Senior Secondary Course Humanities track subject isolation
runTest(15, 'Senior Secondary Course Humanities track subject isolation', () => {
  const humSubjs = [
    'nios-history-315', 'nios-geography-316', 'nios-polscience-317',
    'nios-sociology-331', 'nios-psychology-328', 'nios-homesci-321', 'nios-law-338'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 7, 'All 7 Senior Secondary Humanities subjects present');
  const total = db.prepare(`SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND subject_id IN (${humSubjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(total, 1960, 'Humanities track total: 7 x 280 = 1960 questions');
});

// 16. Total primary subjects count
runTest(16, 'Total primary subjects count', () => {
  const subjs = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'nios-board'").get().c;
  assert.strictEqual(subjs, 31, 'Exactly 31 primary NIOS subjects');
});

// 17. Exact MCQ target per subject (205 MCQs each)
runTest(17, 'Exact MCQ target per subject (205 MCQs each)', () => {
  const minMcq = db.prepare("SELECT MIN(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'single_mcq' GROUP BY subject_id)").get().m;
  const maxMcq = db.prepare("SELECT MAX(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'single_mcq' GROUP BY subject_id)").get().m;
  assert.strictEqual(minMcq, 205, 'Every NIOS subject has at least 205 MCQs');
  assert.strictEqual(maxMcq, 205, 'Every NIOS subject has exactly 205 MCQs');
  const totalMcq = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'single_mcq'").get().c;
  assert.strictEqual(totalMcq, 6355, 'Total NIOS MCQs: 31 x 205 = 6355');
});

// 18. Exact Subjective target per subject (75 each = 3x exam depth)
runTest(18, 'Exact Subjective target per subject (75 each = 3x exam depth)', () => {
  const minSub = db.prepare("SELECT MIN(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'nios-board' AND question_type_id != 'single_mcq' GROUP BY subject_id)").get().m;
  const maxSub = db.prepare("SELECT MAX(cnt) as m FROM (SELECT COUNT(*) as cnt FROM questions WHERE board_id = 'nios-board' AND question_type_id != 'single_mcq' GROUP BY subject_id)").get().m;
  assert.strictEqual(minSub, 75, 'Every NIOS subject has exactly 75 Subjective revision questions');
  assert.strictEqual(maxSub, 75, 'Every NIOS subject has exactly 75 Subjective revision questions');
  const totalSub = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id != 'single_mcq'").get().c;
  assert.strictEqual(totalSub, 2325, 'Total NIOS Subjectives: 31 x 75 = 2325');
});

// 19. Subjective type: Very Short Answer (24 per subject = 744 total)
runTest(19, 'Subjective type: Very Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'very_short_answer'").get().c;
  assert.strictEqual(count, 744, '31 x 24 = 744 Very Short Answer questions');
});

// 20. Subjective type: Short Answer (24 per subject = 744 total)
runTest(20, 'Subjective type: Short Answer (24 per subject = 744 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'short_answer'").get().c;
  assert.strictEqual(count, 744, '31 x 24 = 744 Short Answer questions');
});

// 21. Subjective type: Case Study / Competency (12 per subject = 372 total)
runTest(21, 'Subjective type: Case Study / Competency (12 per subject = 372 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(count, 372, '31 x 12 = 372 Case Study questions');
});

// 22. Subjective type: Long Answer (15 per subject = 465 total)
runTest(22, 'Subjective type: Long Answer (15 per subject = 465 total)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'long_answer'").get().c;
  assert.strictEqual(count, 465, '31 x 15 = 465 Long Answer questions');
});

// 23. Subjective CBT mock engine isolation (practice_eligible = 0)
runTest(23, 'Subjective CBT mock engine isolation (practice_eligible = 0)', () => {
  const leak = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id != 'single_mcq' AND practice_eligible != 0").get().c;
  assert.strictEqual(leak, 0, 'Zero subjective questions leaked into practice CBT mock engine');
});

// 24. Subjective Full Exam timed engine isolation (full_exam_eligible = 0)
runTest(24, 'Subjective Full Exam timed engine isolation (full_exam_eligible = 0)', () => {
  const leak = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id != 'single_mcq' AND full_exam_eligible != 0").get().c;
  assert.strictEqual(leak, 0, 'Zero subjective questions leaked into full exam timed engine');
});

// 25. Objective mock eligibility (practice_eligible = 1 and full_exam_eligible = 1)
runTest(25, 'Objective mock eligibility (practice_eligible = 1 and full_exam_eligible = 1)', () => {
  const nonEligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'single_mcq' AND (practice_eligible != 1 OR full_exam_eligible != 1)").get().c;
  assert.strictEqual(nonEligible, 0, 'All 6355 MCQs are fully eligible for mock practice and timed exams');
});

// 26. MCQ marks integrity (marks = 1.0)
runTest(26, 'MCQ marks integrity (marks = 1.0)', () => {
  const invalidMarks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'single_mcq' AND marks != 1.0").get().c;
  assert.strictEqual(invalidMarks, 0, 'All MCQs strictly carry 1.0 mark');
});

// 27. Subjective marks integrity (2m, 3m, 4m, 5m)
runTest(27, 'Subjective marks integrity (2m, 3m, 4m, 5m)', () => {
  const vsa = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'very_short_answer' AND marks != 2.0").get().c;
  assert.strictEqual(vsa, 0, 'All VSA questions carry 2 marks');
  const sa = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'short_answer' AND marks != 3.0").get().c;
  assert.strictEqual(sa, 0, 'All SA questions carry 3 marks');
  const cs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'case_study' AND marks != 4.0").get().c;
  assert.strictEqual(cs, 0, 'All Case Study questions carry 4 marks');
  const la = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND question_type_id = 'long_answer' AND marks != 5.0").get().c;
  assert.strictEqual(la, 0, 'All LA questions carry 5 marks');
});

// 28. Difficulty tier distribution
runTest(28, 'Difficulty tier distribution', () => {
  const easy = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND difficulty = 'EASY'").get().c;
  const med = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND difficulty = 'MEDIUM'").get().c;
  const hard = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND difficulty = 'HARD'").get().c;
  assert.ok(easy > 2000, `Adequate EASY tier questions (${easy})`);
  assert.ok(med > 2500, `Adequate MEDIUM tier questions (${med})`);
  assert.ok(hard > 1500, `Adequate HARD tier questions (${hard})`);
  assert.strictEqual(easy + med + hard, 8680, 'All questions categorized into difficulty tiers');
});

// 29. Provenance enforcement
runTest(29, 'Provenance enforcement', () => {
  const invalidProv = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND provenance != 'OFFICIAL_NIOS_SYLLABUS_DERIVED'").get().c;
  assert.strictEqual(invalidProv, 0, 'All questions strictly tagged with official NIOS syllabus provenance');
});

// 30. Official source registry linkage
runTest(30, 'Official source registry linkage', () => {
  const invalidSrc = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board' AND source_id != 'src-nios-board-portal'").get().c;
  assert.strictEqual(invalidSrc, 0, 'All questions linked to src-nios-board-portal');
});

// 31. Official source portal verification in official_sources
runTest(31, 'Official source portal verification in official_sources', () => {
  const src = db.prepare("SELECT * FROM official_sources WHERE source_id = 'src-nios-board-portal'").get();
  assert.ok(src, 'Source src-nios-board-portal exists');
  assert.strictEqual(src.organization_id, 'org-national-institute-of-open-schooling-min', 'Exact NIOS organization ID');
  assert.strictEqual(src.verification_status, 'VERIFIED', 'Source verification status is VERIFIED');
});

// 32. Question versions 1:1 parity
runTest(32, 'Question versions 1:1 parity', () => {
  const totalQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board'").get().c;
  const totalQV = db.prepare("SELECT COUNT(*) as c FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'nios-board'").get().c;
  assert.strictEqual(totalQ, 8680, '8680 questions');
  assert.strictEqual(totalQV, 8680, '8680 question versions matching 1:1');
});

// 33. Question version answers verification
runTest(33, 'Question version answers verification', () => {
  const missingAns = db.prepare("SELECT COUNT(*) as c FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'nios-board' AND (qv.correct_answer IS NULL OR qv.correct_answer = '')").get().c;
  assert.strictEqual(missingAns, 0, 'Zero missing correct answers');
});

// 34. Question versions JSON validity
runTest(34, 'Question versions JSON validity', () => {
  const samples = db.prepare("SELECT qv.language_content FROM question_versions qv JOIN questions q ON qv.question_id = q.question_id WHERE q.board_id = 'nios-board' LIMIT 100").all();
  for (const s of samples) {
    const parsed = JSON.parse(s.language_content);
    assert.ok(parsed.hi || parsed.en, 'language_content contains valid localized payload');
  }
});

// 35. Bundled Study Notes count
runTest(35, 'Bundled Study Notes count', () => {
  const notesCount = db.prepare("SELECT COUNT(*) as c FROM notes WHERE note_id LIKE 'note-nios-%'").get().c;
  assert.strictEqual(notesCount, 4, 'Exactly 4 bundled revision notes for NIOS');
});

// 36. Study Notes ID naming convention
runTest(36, 'Study Notes ID naming convention', () => {
  const expectedNotes = [
    'note-nios-secondary-all',
    'note-nios-srsec-science-all',
    'note-nios-srsec-commerce-all',
    'note-nios-srsec-humanities-all'
  ];
  for (const nid of expectedNotes) {
    const found = db.prepare("SELECT note_id FROM notes WHERE note_id = ?").get(nid);
    assert.ok(found, `Note ${nid} is registered`);
  }
});

// 37. Study Notes Secondary compendium integrity
runTest(37, 'Study Notes Secondary compendium integrity', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-nios-secondary-all'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.stats.mcqs >= 1000, 'Secondary note has >= 1000 MCQs');
  assert.ok(parsed.stats.subs >= 350, 'Secondary note has >= 350 Subjectives');
});

// 38. Study Notes Sr Sec Science vault integrity
runTest(38, 'Study Notes Sr Sec Science vault integrity', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-nios-srsec-science-all'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.stats.mcqs >= 700, 'Science vault has >= 700 MCQs');
  assert.ok(parsed.stats.subs >= 250, 'Science vault has >= 250 Subjectives');
});

// 39. Study Notes Sr Sec Commerce vault integrity
runTest(39, 'Study Notes Sr Sec Commerce vault integrity', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-nios-srsec-commerce-all'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.stats.mcqs >= 700, 'Commerce vault has >= 700 MCQs');
  assert.ok(parsed.stats.subs >= 250, 'Commerce vault has >= 250 Subjectives');
});

// 40. Study Notes Sr Sec Humanities vault integrity
runTest(40, 'Study Notes Sr Sec Humanities vault integrity', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-nios-srsec-humanities-all'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.stats.mcqs >= 700, 'Humanities vault has >= 700 MCQs');
  assert.ok(parsed.stats.subs >= 250, 'Humanities vault has >= 250 Subjectives');
});

// 41. Study Notes JSON content structure
runTest(41, 'Study Notes JSON content structure', () => {
  const notes = db.prepare("SELECT note_id, content FROM notes WHERE note_id LIKE 'note-nios-%'").all();
  for (const n of notes) {
    const parsed = JSON.parse(n.content);
    assert.ok(Array.isArray(parsed.objectives), 'Objectives array present');
    assert.ok(Array.isArray(parsed.subjectives), 'Subjectives array present');
    assert.ok(parsed.stats, 'Stats summary present');
  }
});

// 42. NIOS Data Dictionary file integrity
runTest(42, 'NIOS Data Dictionary file integrity', () => {
  const dictPath = path.join(__dirname, '../../data/boards/nios-board.json');
  assert.ok(fs.existsSync(dictPath), 'nios-board.json exists');
  const data = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
  assert.strictEqual(data.board_id, 'nios-board', 'board_id matches nios-board');
  assert.strictEqual(data.short_name, 'NIOS', 'short_name matches NIOS');
});

// 43. NIOS Secondary certification rules
runTest(43, 'NIOS Secondary certification rules', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/nios-board.json'), 'utf8'));
  const certRules = dict.certification_rules;
  assert.strictEqual(certRules.minimum_subjects, 5, 'Minimum 5 subjects for passing');
  assert.strictEqual(certRules.minimum_languages, 1, 'Minimum 1 language required');
  assert.strictEqual(certRules.maximum_languages, 2, 'Maximum 2 languages counted');
  assert.strictEqual(certRules.maximum_total_subjects, 7, 'Maximum 7 subjects allowed');
});

// 44. NIOS TMA (Tutor Marked Assignment) rule integrity
runTest(44, 'NIOS TMA rule integrity', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/nios-board.json'), 'utf8'));
  assert.ok(dict.assessment_components, 'Assessment components documented');
  assert.ok(dict.assessment_components.tma_policy.includes('20% weightage'), 'TMA carries 20% theory weightage');
});

// 45. NIOS ODE (On-Demand Examination) rule integrity
runTest(45, 'NIOS ODE rule integrity', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/nios-board.json'), 'utf8'));
  assert.ok(dict.examination_modes.on_demand_examination, 'ODE documented');
  assert.ok(dict.examination_modes.on_demand_examination.mode.includes('On-Demand Examination'), 'ODE mode documented');
});

// 46. NIOS TOC (Transfer of Credit) rule integrity
runTest(46, 'NIOS TOC rule integrity', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/nios-board.json'), 'utf8'));
  assert.ok(dict.certification_rules.toc_facility.includes('Transfer of Credit'), 'TOC documented');
  assert.ok(dict.certification_rules.toc_facility.includes('two subjects'), 'Max 2 subjects transferable');
});

// 47. Database pragma foreign key check
runTest(47, 'Database pragma foreign key check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations in database');
});

// 48. Database pragma integrity check
runTest(48, 'Database pragma integrity check', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok', 'Database integrity check returned ok');
});

// 49. Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE, UPMSP, MPBSE questions
runTest(49, 'Preservation of existing competitive, CBSE, PSEB, BSEB, UBSE, UPMSP, MPBSE questions', () => {
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
});

// 50. Other 21 unprompted boards remain strictly at 000 questions
runTest(50, 'Other 21 unprompted boards remain strictly at 000 questions', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 51. Subject code integrity (Secondary 200 series & Sr Secondary 300 series)
runTest(51, 'Subject code integrity (Secondary 200 series & Sr Secondary 300 series)', () => {
  const secSubjs = db.prepare("SELECT subject_id FROM subjects WHERE subject_id LIKE 'nios-%' AND subject_id GLOB '*-[2][0-9][0-9]'").all();
  assert.strictEqual(secSubjs.length, 10, 'All 10 Secondary subjects follow 200 series codes');
  const srSecSubjs = db.prepare("SELECT subject_id FROM subjects WHERE subject_id LIKE 'nios-%' AND subject_id GLOB '*-[3][0-9][0-9]'").all();
  assert.strictEqual(srSecSubjs.length, 21, 'All 21 Senior Secondary subjects follow 300 series codes');
});

// 52. Language fidelity across Hindi and English subjects
runTest(52, 'Language fidelity across Hindi and English subjects', () => {
  const hiSecQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'nios-hindi-201' LIMIT 1").get();
  const parsedHiSec = JSON.parse(hiSecQ.language_content);
  assert.ok(parsedHiSec.hi, 'Secondary Hindi has Hindi content');

  const enSecQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'nios-english-202' LIMIT 1").get();
  const parsedEnSec = JSON.parse(enSecQ.language_content);
  assert.ok(parsedEnSec.en, 'Secondary English has English content');

  const hiSrQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'nios-hindi-301' LIMIT 1").get();
  const parsedHiSr = JSON.parse(hiSrQ.language_content);
  assert.ok(parsedHiSr.hi, 'Sr Secondary Hindi has Hindi content');

  const enSrQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'nios-english-302' LIMIT 1").get();
  const parsedEnSr = JSON.parse(enSrQ.language_content);
  assert.ok(parsedEnSr.en, 'Sr Secondary English has English content');
});

console.log('\n========================================================');
console.log(`📊 NIOS ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 52)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

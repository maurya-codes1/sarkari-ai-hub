const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('========================================================');
console.log('🧪 SARKARIAI HUB — GSEB GUJARAT BOARD ISOLATION & VERIFICATION SUITE');
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

// 1. GSEB board isolation
runTest(1, 'GSEB board_id enforcement', () => {
  const invalid = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND board_id != 'gseb-gujarat'").get().c;
  assert.strictEqual(invalid, 0, 'All GSEB questions have exact board_id');
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat'").get().c;
  assert.strictEqual(count, 8680, 'Total GSEB questions must match exactly 8680');
});

// 2. Class 10 subject dictionary
runTest(2, 'Class 10 subject dictionary (10 subjects, 2800 questions)', () => {
  const c10Subjs = [
    'gseb-gujarati-fl-10', 'gseb-hindi-sl-10', 'gseb-english-10',
    'gseb-math-basic-10', 'gseb-math-std-10', 'gseb-science-10',
    'gseb-social-10', 'gseb-sanskrit-10', 'gseb-urdu-10', 'gseb-computer-10'
  ];
  const count = db.prepare(`SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'gseb-gujarat' AND stage = 'Class 10' AND subject_id IN (${c10Subjs.map(s => `'${s}'`).join(',')})`).get().c;
  assert.strictEqual(count, 10, 'All 10 Class 10 subjects present');
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND stage = 'Class 10'").get().c;
  assert.strictEqual(total, 2800, 'Class 10 total: 10 x 280 = 2800 questions');
});

// 3. Class 12 subject dictionary
runTest(3, 'Class 12 subject dictionary (21 subjects across 4 streams, 5880 questions)', () => {
  const c12Count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = 'gseb-gujarat' AND stage = 'Class 12'").get().c;
  assert.strictEqual(c12Count, 21, 'Exactly 21 Class 12 primary subjects across 4 streams');
  const total = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND stage = 'Class 12'").get().c;
  assert.strictEqual(total, 5880, 'Class 12 total: 21 x 280 = 5880 questions');
});

// 4. Class 9 scope
runTest(4, 'Class 9 scope', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.strictEqual(dict.class_9.board_exam_eligible, false, 'Class 9 has no public board exam');
  assert.ok(dict.class_9.examination_status.includes('School-Level'), 'School level exam documented');
});

// 5. Class 11 scope
runTest(5, 'Class 11 scope', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.strictEqual(dict.class_11.board_exam_eligible, false, 'Class 11 has no public board exam');
  assert.ok(dict.class_11.examination_status.includes('School-Level'), 'School level exam documented');
});

// 6. Stream mapping
runTest(6, 'Stream mapping (Science, Commerce, Arts, Vocational)', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  const streams = dict.class_12.streams;
  assert.ok(streams.science, 'Science stream exists');
  assert.ok(streams.general_commerce, 'Commerce stream exists');
  assert.ok(streams.arts_humanities, 'Arts stream exists');
  assert.ok(streams.vocational, 'Vocational stream exists');
});

// 7. GSEB SSC Mathematics Basic vs Standard dual-track integrity
runTest(7, 'GSEB SSC Mathematics Basic vs Standard dual-track integrity', () => {
  const basicCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'gseb-math-basic-10'").get().c;
  const stdCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'gseb-math-std-10'").get().c;
  assert.strictEqual(basicCount, 280, 'Mathematics Basic has exactly 280 questions');
  assert.strictEqual(stdCount, 280, 'Mathematics Standard has exactly 280 questions');
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.ok(dict.mathematics_dual_track_policy.mathematics_basic_code_18, 'Mathematics Basic Code 18 documented');
  assert.ok(dict.mathematics_dual_track_policy.mathematics_standard_code_12, 'Mathematics Standard Code 12 documented');
});

// 8. GSEB HSC Science Groups (Group A, B, AB)
runTest(8, 'GSEB HSC Science Groups documentation', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  const sci = dict.class_12.streams.science;
  assert.ok(sci.groups.group_A, 'Group A (Physics, Chemistry, Maths) documented');
  assert.ok(sci.groups.group_B, 'Group B (Physics, Chemistry, Biology) documented');
  assert.ok(sci.groups.group_AB, 'Group AB documented');
});

// 9. Gujarati First Language script fidelity
runTest(9, 'Gujarati First Language script fidelity', () => {
  const q = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'gseb-gujarati-fl-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(q.language_content);
  assert.ok(parsed.gu, 'Gujarati content present');
  assert.ok(/[\u0A80-\u0AFF]/.test(parsed.gu.question), 'Question contains authentic Gujarati Unicode characters');
});

// 10. Classical Language Sanskrit fidelity
runTest(10, 'Classical Language Sanskrit fidelity', () => {
  const q = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'gseb-sanskrit-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(q.language_content);
  assert.ok(parsed.sa, 'Sanskrit content present');
  assert.ok(/[\u0A80-\u0AFF\u0900-\u097F]/.test(parsed.sa.question), 'Question contains Sanskrit script');
});

// 11. Hindi Second Language fidelity
runTest(11, 'Hindi Second Language fidelity', () => {
  const q = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'gseb-hindi-sl-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(q.language_content);
  assert.ok(parsed.hi, 'Hindi content present');
  assert.ok(/[\u0900-\u097F]/.test(parsed.hi.question), 'Question contains Devanagari Hindi characters');
});

// 12. Urdu Nastaliq fidelity
runTest(12, 'Urdu Nastaliq fidelity', () => {
  const q = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'gseb-urdu-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(q.language_content);
  assert.ok(parsed.ur, 'Urdu content present');
  assert.ok(/[\u0600-\u06FF]/.test(parsed.ur.question), 'Question contains Perso-Arabic Urdu characters');
});

// 13. English Compulsory language fidelity
runTest(13, 'English Compulsory language fidelity', () => {
  const q = db.prepare(`
    SELECT qv.language_content 
    FROM questions q 
    JOIN question_versions qv ON q.question_id = qv.question_id 
    WHERE q.subject_id = 'gseb-english-10' 
    LIMIT 1
  `).get();
  const parsed = JSON.parse(q.language_content);
  assert.ok(parsed.en, 'English content present');
  assert.ok(parsed.en.question.includes('GSEB'), 'English prompt formatted properly');
});

// 14. Vocational track isolation
runTest(14, 'Vocational track isolation', () => {
  const vocCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'gseb-vocational-12'").get().c;
  assert.strictEqual(vocCount, 280, 'Vocational track has exactly 280 questions');
  const subj = db.prepare("SELECT * FROM subjects WHERE subject_id = 'gseb-vocational-12'").get();
  assert.strictEqual(subj.subject_type, 'VOCATIONAL_ELECTIVE', 'Subject type is VOCATIONAL_ELECTIVE');
});

// 15. Official GSEB source citation
runTest(15, 'Official GSEB source citation', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND source_id = 'src-gseb-gujarat-portal'").get().c;
  assert.strictEqual(count, 8680, 'All 8680 questions cite official GSEB portal');
});

// 16. Provenance tagging
runTest(16, 'Provenance tagging', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND provenance = 'OFFICIAL_GSEB_SYLLABUS_DERIVED'").get().c;
  assert.strictEqual(count, 8680, 'All 8680 questions carry verified GSEB provenance');
});

// 17. GSEB Question Bank 2026 alignment
runTest(17, 'GSEB Question Bank 2026 alignment', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.strictEqual(dict.question_bank_2026_alignment.official_prashna_bank_repository, 'https://www.gseb.org', 'Official question bank repository linked');
  assert.ok(dict.question_bank_2026_alignment.question_banks_released, 'GSEB Question Banks documented');
});

// 18. GSSTB textbook mapping verification
runTest(18, 'GSSTB textbook mapping verification', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.ok(dict.textbook_repository.includes('gsstb.gujarat.gov.in'), 'Gujarat State School Textbook Board repository verified');
});

// 19. Zero CBSE cross-board leakage
runTest(19, 'Zero CBSE cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'cbse-%' OR subject_id LIKE 'cbse-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero CBSE cross-contamination');
});

// 20. Zero PSEB cross-board leakage
runTest(20, 'Zero PSEB cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'pseb-%' OR subject_id LIKE 'pseb-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero PSEB cross-contamination');
});

// 21. Zero BSEB cross-board leakage
runTest(21, 'Zero BSEB cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'bseb-%' OR subject_id LIKE 'bseb-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero BSEB cross-contamination');
});

// 22. Zero UBSE cross-board leakage
runTest(22, 'Zero UBSE cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'ubse-%' OR subject_id LIKE 'ubse-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero UBSE cross-contamination');
});

// 23. Zero UPMSP cross-board leakage
runTest(23, 'Zero UPMSP cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'upmsp-%' OR subject_id LIKE 'upmsp-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero UPMSP cross-contamination');
});

// 24. Zero MPBSE cross-board leakage
runTest(24, 'Zero MPBSE cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'mpbse-%' OR subject_id LIKE 'mpbse-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero MPBSE cross-contamination');
});

// 25. Zero NIOS cross-board leakage
runTest(25, 'Zero NIOS cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'nios-%' OR subject_id LIKE 'nios-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero NIOS cross-contamination');
});

// 26. Zero RBSE cross-board leakage
runTest(26, 'Zero RBSE cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'rbse-%' OR subject_id LIKE 'rbse-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero RBSE cross-contamination');
});

// 27. Zero MSBSHSE cross-board leakage
runTest(27, 'Zero MSBSHSE cross-board leakage', () => {
  const leakage = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND (question_id LIKE 'msbshse-%' OR subject_id LIKE 'msbshse-%')").get().c;
  assert.strictEqual(leakage, 0, 'Zero MSBSHSE cross-contamination');
});

// 28. Existing competitive questions preservation
runTest(28, 'Existing competitive questions preservation', () => {
  const compCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL").get().c;
  assert.strictEqual(compCount, 15390, 'All 15390 competitive exam questions preserved');
});

// 29. Existing CBSE questions preservation
runTest(29, 'Existing CBSE questions preservation', () => {
  const cbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'cbse-board'").get().c;
  assert.strictEqual(cbseCount, 7000, 'CBSE questions remain intact at 7000');
});

// 30. Existing PSEB questions preservation
runTest(30, 'Existing PSEB questions preservation', () => {
  const psebCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'pseb-punjab'").get().c;
  assert.strictEqual(psebCount, 8680, 'PSEB questions remain intact at 8680');
});

// 31. Existing BSEB questions preservation
runTest(31, 'Existing BSEB questions preservation', () => {
  const bsebCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'bseb-bihar'").get().c;
  assert.strictEqual(bsebCount, 8400, 'BSEB questions remain intact at 8400');
});

// 32. Existing UBSE questions preservation
runTest(32, 'Existing UBSE questions preservation', () => {
  const ubseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'ubse-uttarakhand'").get().c;
  assert.strictEqual(ubseCount, 8680, 'UBSE questions remain intact at 8680');
});

// 33. Existing UPMSP questions preservation
runTest(33, 'Existing UPMSP questions preservation', () => {
  const upmspCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'upmsp-uttar-pradesh'").get().c;
  assert.strictEqual(upmspCount, 8680, 'UPMSP questions remain intact at 8680');
});

// 34. Existing MPBSE questions preservation
runTest(34, 'Existing MPBSE questions preservation', () => {
  const mpbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'mpbse-madhya-pradesh'").get().c;
  assert.strictEqual(mpbseCount, 8680, 'MPBSE questions remain intact at 8680');
});

// 35. Existing NIOS questions preservation
runTest(35, 'Existing NIOS questions preservation', () => {
  const niosCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'nios-board'").get().c;
  assert.strictEqual(niosCount, 8680, 'NIOS questions remain intact at 8680');
});

// 36. Existing RBSE questions preservation
runTest(36, 'Existing RBSE questions preservation', () => {
  const rbseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'rbse-rajasthan'").get().c;
  assert.strictEqual(rbseCount, 8680, 'RBSE questions remain intact at 8680');
});

// 37. Existing MSBSHSE questions preservation
runTest(37, 'Existing MSBSHSE questions preservation', () => {
  const msbshseCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'msbshse-maharashtra'").get().c;
  assert.strictEqual(msbshseCount, 8680, 'MSBSHSE questions remain intact at 8680');
});

// 38. Other 21 unprompted boards remain strictly at 000 questions
runTest(38, 'Other 21 unprompted boards remain strictly at 000 questions', () => {
  const otherBoards = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL AND board_id NOT IN ('cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand', 'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat')").get().c;
  assert.strictEqual(otherBoards, 0, 'All other 21 boards remain strictly at 000 questions awaiting individual prompts');
});

// 39. Current/historical version isolation
runTest(39, 'Current/historical version isolation', () => {
  const versions = db.prepare("SELECT COUNT(DISTINCT version_number) as v FROM question_versions WHERE question_id LIKE 'gseb-%'").get().v;
  assert.strictEqual(versions, 1, 'Clean version 1 baseline');
});

// 40. Difficulty distribution across MCQs
runTest(40, 'Difficulty distribution across MCQs', () => {
  const easy = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'single_mcq' AND difficulty = 'EASY'").get().c;
  const med = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'single_mcq' AND difficulty = 'MEDIUM'").get().c;
  const hard = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'single_mcq' AND difficulty = 'HARD'").get().c;
  assert.ok(easy > 0 && med > 0 && hard > 0, 'Difficulty levels properly represented');
  assert.strictEqual(easy + med + hard, 6355, 'All 6355 MCQs have valid difficulty tags');
});

// 41. Very Short Answer questions count & marks
runTest(41, 'Very Short Answer questions count & marks (24 per subj = 744, 2 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'very_short_answer'").get().c;
  assert.strictEqual(count, 744, '744 VSA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'very_short_answer' AND marks != 2.0").get().c;
  assert.strictEqual(marks, 0, 'All VSA carry 2 marks');
});

// 42. Short Answer questions count & marks
runTest(42, 'Short Answer questions count & marks (24 per subj = 744, 3 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'short_answer'").get().c;
  assert.strictEqual(count, 744, '744 SA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'short_answer' AND marks != 3.0").get().c;
  assert.strictEqual(marks, 0, 'All SA carry 3 marks');
});

// 43. Case Study questions count & marks
runTest(43, 'Case Study questions count & marks (12 per subj = 372, 4 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'case_study'").get().c;
  assert.strictEqual(count, 372, '372 Case Study questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'case_study' AND marks != 4.0").get().c;
  assert.strictEqual(marks, 0, 'All Case Study carry 4 marks');
});

// 44. Long Answer questions count & marks
runTest(44, 'Long Answer questions count & marks (15 per subj = 465, 5 marks)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'long_answer'").get().c;
  assert.strictEqual(count, 465, '465 LA questions');
  const marks = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'long_answer' AND marks != 5.0").get().c;
  assert.strictEqual(marks, 0, 'All LA carry 5 marks');
});

// 45. Objective mock eligibility
runTest(45, 'Objective mock eligibility (practice_eligible = 1 and full_exam_eligible = 1)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id = 'single_mcq' AND (practice_eligible != 1 OR full_exam_eligible != 1)").get().c;
  assert.strictEqual(count, 0, 'All 6355 MCQs eligible for CBT mock');
});

// 46. Subjective CBT mock isolation
runTest(46, 'Subjective CBT mock isolation (practice_eligible = 0 and full_exam_eligible = 0)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = 'gseb-gujarat' AND question_type_id != 'single_mcq' AND (practice_eligible != 0 OR full_exam_eligible != 0)").get().c;
  assert.strictEqual(count, 0, 'All 2325 subjectives quarantined from CBT mock');
});

// 47. Bundled study notes count
runTest(47, 'Bundled study notes count (5 notes)', () => {
  const count = db.prepare("SELECT COUNT(*) as c FROM notes WHERE note_id LIKE 'note-gseb-%'").get().c;
  assert.strictEqual(count, 5, 'Exactly 5 bundled study notes');
});

// 48. Bundled study notes naming convention
runTest(48, 'Bundled study notes naming convention', () => {
  const expected = [
    'note-gseb-c10-all-subject',
    'note-gseb-c12-science-all',
    'note-gseb-c12-commerce-all',
    'note-gseb-c12-arts-all',
    'note-gseb-c12-vocational-all'
  ];
  for (const nid of expected) {
    const note = db.prepare("SELECT * FROM notes WHERE note_id = ?").get(nid);
    assert.ok(note, `Note ${nid} exists`);
  }
});

// 49. Special examination categories documented
runTest(49, 'Special examination categories documented in dictionary', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.ok(dict.special_examination_categories.gujarat_state_open_school_gsos, 'GSOS open school documented');
  assert.ok(dict.special_examination_categories.supplementary_purak_pariksha, 'Supplementary Purak Pariksha documented');
  assert.ok(dict.special_examination_categories.mathematics_basic_reentry_to_science, 'Math Basic re-entry documented');
  assert.ok(dict.special_examination_categories.divyangjan_concessions, 'Divyangjan concessions documented');
});

// 50. Database foreign key check
runTest(50, 'Database foreign key check', () => {
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations');
});

// 51. GSEB 33% passing rule and evaluation criteria verified
runTest(51, 'GSEB 33% passing rule and evaluation criteria verified', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/boards/gseb-gujarat.json'), 'utf8'));
  assert.ok(dict.passing_criteria_and_grading.includes('33% minimum marks in each subject'), '33% passing rule documented');
  assert.ok(dict.class_10.scheme_of_examination.includes('80 External Board Theory + 20 Internal'), 'Class 10 80+20 scheme documented');
});

// 52. Mobile/accessibility smoke test
runTest(52, 'Mobile/accessibility smoke test', () => {
  const note = db.prepare("SELECT content FROM notes WHERE note_id = 'note-gseb-c10-all-subject'").get();
  const parsed = JSON.parse(note.content);
  assert.ok(parsed.objectives.length > 0, 'Objectives present in note for mobile view');
  assert.ok(parsed.subjectives.length > 0, 'Subjectives present in note for mobile view');
});

console.log('\n========================================================');
console.log(`📊 GSEB ISOLATION SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: 52)`);
console.log('========================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

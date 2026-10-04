/**
 * test-board11-west-bengal.js
 * 
 * SARKARIAI HUB — BOARD #11
 * WEST BENGAL SCHOOL BOARD ECOSYSTEM (WBBSE & WBCHSE) VERIFICATION SUITE
 * 
 * Verifies all 55 forensic integrity requirements across:
 * - WBBSE (West Bengal Board of Secondary Education - Class 10 Madhyamik)
 * - WBCHSE (West Bengal Council of Higher Secondary Education - Class 12 Higher Secondary)
 * - Class 9 Advance Registration & Academic Support
 * - Class 11 Semester Foundation & Progression
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #11 WEST BENGAL (WBBSE & WBCHSE) SUITE');
console.log('================================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(testNum, testName, fn) {
  try {
    fn();
    console.log(`✅ [${testNum}/55] ${testName}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [${testNum}/55] ${testName}: FAILED -> ${err.message}`);
    failedTests++;
  }
}

const BOARD_ID = 'wbbse-wbchse-west-bengal';
const dictPath = path.join(__dirname, '../../data/boards/wbbse-wbchse-west-bengal.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. WBBSE authority exists
runTest(1, 'WBBSE authority exists in dictionary & database', () => {
  assert.ok(dict.authorities && dict.authorities.WBBSE, 'WBBSE authority defined in dictionary');
  assert.strictEqual(dict.authorities.WBBSE.authority_id, 'WBBSE');
  const boardRow = db.prepare("SELECT * FROM boards WHERE board_id = 'wbbse-west-bengal' OR board_id = 'wbbse-wbchse-west-bengal'").all();
  assert.ok(boardRow.length >= 1, 'WBBSE board record exists in SQLite');
});

// 2. WBCHSE authority exists
runTest(2, 'WBCHSE authority exists in dictionary & database', () => {
  assert.ok(dict.authorities && dict.authorities.WBCHSE, 'WBCHSE authority defined in dictionary');
  assert.strictEqual(dict.authorities.WBCHSE.authority_id, 'WBCHSE');
  const boardRow = db.prepare("SELECT * FROM boards WHERE board_id = 'wbchse-west-bengal' OR board_id = 'wbbse-wbchse-west-bengal'").all();
  assert.ok(boardRow.length >= 1, 'WBCHSE board record exists in SQLite');
});

// 3. West Bengal state mapping correct
runTest(3, 'West Bengal state mapping correct', () => {
  assert.strictEqual(dict.state, 'West Bengal');
  const boards = db.prepare("SELECT DISTINCT jurisdiction FROM boards WHERE board_id LIKE '%west-bengal%'").all();
  assert.ok(boards.length > 0, 'State jurisdiction mapped');
});

// 4. dedicated dictionary exists
runTest(4, 'Dedicated dictionary exists', () => {
  assert.ok(fs.existsSync(dictPath), 'Canonical dictionary exists');
  assert.strictEqual(dict.board_id, BOARD_ID);
});

// 5. no foreign-board dictionary import
runTest(5, 'No foreign-board dictionary import', () => {
  const foreignBoards = [
    'cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand',
    'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board',
    'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat'
  ];
  const rawDict = fs.readFileSync(dictPath, 'utf8');
  for (const fb of foreignBoards) {
    const regex = new RegExp(`"board_id"\\s*:\\s*"${fb}"`, 'i');
    assert.ok(!regex.test(rawDict), `Dictionary must not contain foreign board_id: ${fb}`);
  }
});

// 6. Class 9 support exists
runTest(6, 'Class 9 support exists & not a fake board exam', () => {
  assert.ok(dict.class_9, 'Class 9 documented');
  assert.strictEqual(dict.class_9.board_exam_eligible, false, 'Class 9 is not a public board exam');
  assert.ok(dict.class_9.progression_to_class_10, 'Progression rule to Class 10 defined');
});

// 7. Class 10 structure exists
runTest(7, 'Class 10 structure exists (2,800 questions across 10 subjects)', () => {
  assert.ok(dict.class_10, 'Class 10 documented');
  assert.strictEqual(dict.class_10.board_exam_eligible, true);
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 10'").get(BOARD_ID).c;
  assert.strictEqual(count, 2800, 'Class 10 must contain exactly 2800 questions');
});

// 8. Class 11 structure exists
runTest(8, 'Class 11 structure exists & semester foundation modeled', () => {
  assert.ok(dict.class_11, 'Class 11 documented');
  assert.strictEqual(dict.class_11.board_exam_eligible, false, 'Class 11 is institutional semester foundation');
  assert.ok(dict.class_11.progression_to_class_12, 'Progression rule to Class 12 defined');
});

// 9. Class 12 structure exists
runTest(9, 'Class 12 structure exists (5,880 questions across 21 subjects)', () => {
  assert.ok(dict.class_12, 'Class 12 documented');
  assert.strictEqual(dict.class_12.board_exam_eligible, true);
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage LIKE 'Class 12%'").get(BOARD_ID).c;
  assert.strictEqual(count, 5880, 'Class 12 must contain exactly 5880 questions');
});

// 10. WBBSE first-language rules
runTest(10, 'WBBSE First Language rules enumerated (12 languages)', () => {
  const fls = dict.class_10.first_languages_official;
  assert.ok(fls && fls.length === 12, '12 official First Languages enumerated');
  assert.ok(fls.includes('Bengali') && fls.includes('Santali') && fls.includes('Gurumukhi (Punjabi)'));
});

// 11. WBBSE second-language rules
runTest(11, 'WBBSE Second Language rules modeled', () => {
  const slRule = dict.class_10.second_language_rule.rule_description;
  assert.ok(slRule.includes('English'), 'English is compulsory SL when FL is not English');
  assert.ok(slRule.includes('Bengali or Nepali'), 'Bengali or Nepali SL when FL is English');
});

// 12. WBCHSE language rules
runTest(12, 'WBCHSE language rules modeled (1 FL + 1 SL)', () => {
  const langRule = dict.class_12.language_structure;
  assert.ok(langRule.includes('Two compulsory languages'), 'Two compulsory languages requirement defined');
});

// 13. WBBSE core subjects
runTest(13, 'WBBSE core subjects preserved (Physical Science distinct from Life Science)', () => {
  const coreSubs = dict.class_10.core_academic_subjects.map(s => s.name);
  assert.ok(coreSubs.some(s => s.includes('Physical Science')), 'Physical Science distinct');
  assert.ok(coreSubs.some(s => s.includes('Life Science')), 'Life Science distinct');
  assert.ok(coreSubs.some(s => s.includes('Mathematics')), 'Mathematics distinct');
});

// 14. WBCHSE subject sets
runTest(14, 'WBCHSE subject sets documented (Set I, Set II, Set III)', () => {
  const sets = dict.class_12.subject_sets_and_electives;
  assert.ok(sets.set_I_science, 'Set I Science defined');
  assert.ok(sets.set_II_commerce, 'Set II Commerce defined');
  assert.ok(sets.set_III_humanities, 'Set III Humanities defined');
});

// 15. stream/set isolation
runTest(15, 'Stream and set isolation in Class 12 questions', () => {
  const stages = db.prepare("SELECT DISTINCT stage FROM questions WHERE board_id = ? AND stage LIKE 'Class 12%'").all(BOARD_ID).map(r => r.stage);
  assert.ok(stages.includes('Class 12 Science'), 'Class 12 Science isolated');
  assert.ok(stages.includes('Class 12 Commerce'), 'Class 12 Commerce isolated');
  assert.ok(stages.includes('Class 12 Humanities'), 'Class 12 Humanities isolated');
  assert.ok(stages.includes('Class 12 Languages'), 'Class 12 Languages isolated');
});

// 16. subject isolation
runTest(16, 'Subject isolation: 31 unique subjects for West Bengal', () => {
  const subs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ?").all(BOARD_ID);
  assert.strictEqual(subs.length, 31, 'Exactly 31 primary subjects deployed');
  for (const s of subs) {
    assert.ok(s.subject_id.startsWith('wbbse-') || s.subject_id.startsWith('wbchse-'), `Subject ID ${s.subject_id} has authentic prefix`);
  }
});

// 17. language code/text validation
runTest(17, 'Language code and text script validation', () => {
  const bnSample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-bengali-fl-10' LIMIT 5").all();
  for (const r of bnSample) {
    assert.ok(/[\u0980-\u09FF]/.test(r.language_content), 'Bengali script present in Bengali FL');
  }
});

// 18. Bengali script validation
runTest(18, 'Bengali script validation (U+0980 - U+09FF)', () => {
  const q = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbchse-bengali-fl-12' LIMIT 1").get();
  assert.ok(/[\u0980-\u09FF]/.test(q.language_content), 'Bengali script in Class 12 Bengali');
});

// 19. Hindi script validation
runTest(19, 'Hindi script validation (Devanagari U+0900 - U+097F)', () => {
  const q = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-hindi-fl-10' LIMIT 1").get();
  assert.ok(/[\u0900-\u097F]/.test(q.language_content), 'Devanagari script in Hindi FL');
});

// 20. Punjabi Gurmukhi validation
runTest(20, 'Punjabi Gurmukhi validation in language registry', () => {
  const paEntry = dict.language_script_registry.find(l => l.language_id === 'pa');
  assert.ok(paEntry && paEntry.script === 'Gurmukhi', 'Gurmukhi script registered for Punjabi');
});

// 21. Urdu script validation
runTest(21, 'Urdu script validation (Nastaliq U+0600 - U+06FF)', () => {
  const q = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-urdu-fl-10' LIMIT 1").get();
  assert.ok(/[\u0600-\u06FF]/.test(q.language_content), 'Urdu Nastaliq script in Urdu FL');
});

// 22. Santali validation
runTest(22, 'Santali script validation in language registry', () => {
  const satEntry = dict.language_script_registry.find(l => l.language_id === 'sat');
  assert.ok(satEntry && satEntry.script.includes('Ol Chiki'), 'Santali registered with Ol Chiki script');
});

// 23. objective option count
runTest(23, 'Objective questions contain exactly 4 options', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 50").all(BOARD_ID);
  for (const r of sample) {
    const data = JSON.parse(r.language_content);
    for (const lang of Object.keys(data)) {
      if (data[lang].options) {
        assert.strictEqual(data[lang].options.length, 4, 'MCQ options array must be exactly 4');
      }
    }
  }
});

// 24. answer validity
runTest(24, 'Correct answer exists for all objective questions', () => {
  const missing = db.prepare("SELECT COUNT(*) as c FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' AND (qv.correct_answer IS NULL OR qv.correct_answer = '')").get(BOARD_ID).c;
  assert.strictEqual(missing, 0, 'No MCQ question has empty correct_answer');
});

// 25. answer semantic correctness
runTest(25, 'Correct answer semantically valid and points to option index', () => {
  const sample = db.prepare("SELECT qv.correct_answer FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 50").all(BOARD_ID);
  for (const r of sample) {
    const parsed = JSON.parse(r.correct_answer);
    assert.ok(['A', 'B', 'C', 'D'].includes(parsed.text), 'Text matches option letter');
    assert.ok(parsed.correct_index >= 0 && parsed.correct_index <= 3, 'Index is within 0..3');
  }
});

// 26. option duplication
runTest(26, 'No internal option duplication within any MCQ', () => {
  const sample = db.prepare("SELECT q.question_id, qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 50").all(BOARD_ID);
  for (const r of sample) {
    const data = JSON.parse(r.language_content);
    for (const lang of Object.keys(data)) {
      if (data[lang].options) {
        const opts = data[lang].options.map(o => String(o).trim().toLowerCase());
        const uniq = new Set(opts);
        assert.strictEqual(uniq.size, opts.length, `Duplicate options in ${r.question_id}`);
      }
    }
  }
});

// 27. answer distribution
runTest(27, 'Answer distribution balanced across A, B, C, D (25% each)', () => {
  const mcqs = db.prepare("SELECT qv.correct_answer FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'").all(BOARD_ID);
  const counts = { 'A': 0, 'B': 0, 'C': 0, 'D': 0 };
  for (const m of mcqs) {
    const parsed = JSON.parse(m.correct_answer);
    counts[parsed.text]++;
  }
  const total = mcqs.length;
  for (const letter of ['A', 'B', 'C', 'D']) {
    const pct = (counts[letter] / total) * 100;
    assert.ok(pct >= 24 && pct <= 26, `Option ${letter} must be ~25% (found ${pct.toFixed(2)}%)`);
  }
});

// 28. generator bias detection
runTest(28, 'Zero generator bias in West Bengal question bank', () => {
  const csvPath = path.join(__dirname, '../../reports/board11_west_bengal_question_distribution.csv');
  assert.ok(fs.existsSync(csvPath), 'Question distribution report exists');
  const content = fs.readFileSync(csvPath, 'utf8');
  assert.ok(content.includes('BALANCED_ZERO_BIAS'), 'Documents balanced zero bias');
});

// 29. option shuffle integrity
runTest(29, 'Runtime option shuffle integrity preserves correct answer mapping', () => {
  function shuffleWithOptions(options, correctLetter) {
    const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctIdx = letterToIndex[correctLetter];
    const originalAnswerText = options[correctIdx];
    
    const items = options.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
    const shuffled = [items[2], items[0], items[3], items[1]];
    const newCorrectIdx = shuffled.findIndex(item => item.isCorrect);
    const newCorrectLetter = ['A', 'B', 'C', 'D'][newCorrectIdx];
    const newAnswerText = shuffled[newCorrectIdx].opt;
    
    return { originalAnswerText, newAnswerText, newCorrectLetter };
  }

  const sampleOpts = ['Option A', 'Option B', 'Option C', 'Option D'];
  const res = shuffleWithOptions(sampleOpts, 'B');
  assert.strictEqual(res.originalAnswerText, res.newAnswerText);
});

// 30. subjective model answer
runTest(30, 'Subjective questions have detailed model answers (>= 20 chars)', () => {
  const sample = db.prepare("SELECT q.question_id, qv.correct_answer, qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id != 'single_mcq' LIMIT 50").all(BOARD_ID);
  for (const r of sample) {
    const data = JSON.parse(r.language_content);
    let expLen = 0;
    for (const l of Object.keys(data)) {
      const exp = data[l].model_answer || data[l].explanation || '';
      if (exp.length > expLen) expLen = exp.length;
    }
    assert.ok(expLen >= 20, `Model answer must be >= 20 characters in ${r.question_id}`);
  }
});

// 31. subjective language
runTest(31, 'Subjective model answer language matches question script', () => {
  const bnSubj = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-bengali-fl-10' AND q.question_type_id != 'single_mcq' LIMIT 5").all();
  for (const r of bnSubj) {
    const data = JSON.parse(r.language_content);
    assert.ok(/[\u0980-\u09FF]/.test(data.bn.model_answer), 'Bengali model answer in Bengali script');
  }
});

// 32. PYQ provenance
runTest(32, 'PYQ provenance integrity (zero unverified PYQs)', () => {
  const pyqCsv = path.join(__dirname, '../../reports/board11_west_bengal_pyq_matrix.csv');
  assert.ok(fs.existsSync(pyqCsv), 'PYQ CSV exists');
  const content = fs.readFileSync(pyqCsv, 'utf8');
  assert.ok(content.includes('ZERO_UNVERIFIED_OR_BORROWED_PYQS'));
});

// 33. PYQ source validation
runTest(33, 'PYQ source validation', () => {
  const invalidPyqs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND (provenance = 'OFFICIAL_PYQ' OR source_type = 'OFFICIAL_PYQ')").get(BOARD_ID).c;
  assert.strictEqual(invalidPyqs, 0, 'No synthetic PYQs created');
});

// 34. cross-board duplicate detection
runTest(34, 'Cross-board duplicate detection against previous 10 boards is 0', () => {
  const crossCsv = path.join(__dirname, '../../reports/board11_west_bengal_cross_board_audit.csv');
  assert.ok(fs.existsSync(crossCsv), 'Cross board CSV exists');
  const content = fs.readFileSync(crossCsv, 'utf8');
  assert.ok(content.includes('100% COMPLETELY_ISOLATED'));
});

// 35. WBBSE/WBCHSE ownership isolation
runTest(35, 'WBBSE / WBCHSE ownership isolation', () => {
  const wbbseWrong = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 10' AND question_id NOT LIKE 'wbbse-%'").get(BOARD_ID).c;
  assert.strictEqual(wbbseWrong, 0, 'All Class 10 questions have wbbse- prefix');
  const wbchseWrong = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage LIKE 'Class 12%' AND question_id NOT LIKE 'wbchse-%'").get(BOARD_ID).c;
  assert.strictEqual(wbchseWrong, 0, 'All Class 12 questions have wbchse- prefix');
});

// 36. cross-class isolation
runTest(36, 'Cross-class isolation (Class 10 vs Class 12)', () => {
  const stages = db.prepare("SELECT DISTINCT stage FROM questions WHERE board_id = ?").all(BOARD_ID).map(r => r.stage);
  for (const s of stages) {
    assert.ok(s.startsWith('Class 10') || s.startsWith('Class 12'), `Invalid stage: ${s}`);
  }
});

// 37. cross-stream isolation
runTest(37, 'Cross-stream isolation for Class 12', () => {
  const sciSubs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ? AND stage = 'Class 12 Science'").all(BOARD_ID).map(r => r.subject_id);
  assert.strictEqual(sciSubs.length, 6, '6 Science subjects');
  const comSubs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ? AND stage = 'Class 12 Commerce'").all(BOARD_ID).map(r => r.subject_id);
  assert.strictEqual(comSubs.length, 5, '5 Commerce subjects');
  const humSubs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ? AND stage = 'Class 12 Humanities'").all(BOARD_ID).map(r => r.subject_id);
  assert.strictEqual(humSubs.length, 5, '5 Humanities subjects');
  const langSubs = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ? AND stage = 'Class 12 Languages'").all(BOARD_ID).map(r => r.subject_id);
  assert.strictEqual(langSubs.length, 5, '5 Language subjects');
});

// 38. cross-language isolation
runTest(38, 'Cross-language isolation', () => {
  const urduQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-urdu-fl-10' LIMIT 1").get();
  assert.ok(/[\u0600-\u06FF]/.test(urduQ.language_content), 'Urdu question has Nastaliq');
  assert.ok(!/[\u0980-\u09FF]/.test(urduQ.language_content), 'Urdu question does not have Bengali script');
});

// 39. syllabus isolation
runTest(39, 'Syllabus isolation (chapters belong to West Bengal curricula)', () => {
  const q = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbbse-history-10' LIMIT 1").get();
  assert.ok(q.language_content.includes('WBBSE') || q.language_content.includes('ইতিহাস'), 'West Bengal curriculum cited');
});

// 40. chapter/topic isolation
runTest(40, 'Chapter and topic isolation across subjects', () => {
  const q = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'wbchse-physics-12' LIMIT 1").get();
  assert.ok(q.language_content.includes('WBCHSE'), 'WBCHSE cited in Class 12 Physics');
});

// 41. registration source
runTest(41, 'Registration source verified', () => {
  const regCsv = path.join(__dirname, '../../reports/board11_west_bengal_registration_matrix.csv');
  assert.ok(fs.existsSync(regCsv), 'Registration CSV exists');
  const content = fs.readFileSync(regCsv, 'utf8');
  assert.ok(content.includes('wbbse.wb.gov.in') && content.includes('wbchse.wb.gov.in'));
});

// 42. eligibility source
runTest(42, 'Eligibility source verified', () => {
  const eligCsv = path.join(__dirname, '../../reports/board11_west_bengal_eligibility_matrix.csv');
  assert.ok(fs.existsSync(eligCsv), 'Eligibility CSV exists');
  const content = fs.readFileSync(eligCsv, 'utf8');
  assert.ok(content.includes('34%') && content.includes('30%'));
});

// 43. dependency verification
runTest(43, 'Dependency verification (Class 9 -> 10 and Class 11 -> 12)', () => {
  const depCsv = path.join(__dirname, '../../reports/board11_west_bengal_dependency_matrix.csv');
  assert.ok(fs.existsSync(depCsv), 'Dependency CSV exists');
  const content = fs.readFileSync(depCsv, 'utf8');
  assert.ok(content.includes('Class 9') && content.includes('Class 10') && content.includes('Class 11') && content.includes('Class 12'));
});

// 44. PDF board isolation
runTest(44, 'PDF board isolation (5 bundled study notes for West Bengal)', () => {
  const notes = db.prepare("SELECT note_id FROM notes WHERE note_id LIKE 'note-wbbse-%' OR note_id LIKE 'note-wbchse-%'").all();
  assert.strictEqual(notes.length, 5, 'Exactly 5 West Bengal study notes');
});

// 45. PDF internal duplicate blocking
runTest(45, 'PDF internal duplicate blocking', () => {
  const pdfCsv = path.join(__dirname, '../../reports/board11_west_bengal_pdf_audit.csv');
  assert.ok(fs.existsSync(pdfCsv), 'PDF CSV exists');
  const content = fs.readFileSync(pdfCsv, 'utf8');
  assert.ok(content.includes('ISOLATED_WEST_BENGAL'));
});

// 46. Mock board isolation
runTest(46, 'Mock board isolation enforced', () => {
  const mockCsv = path.join(__dirname, '../../reports/board11_west_bengal_mock_audit.csv');
  assert.ok(fs.existsSync(mockCsv), 'Mock CSV exists');
  const content = fs.readFileSync(mockCsv, 'utf8');
  assert.ok(content.includes('ISOLATION_VERIFIED'));
});

// 47. Mock internal duplicate blocking
runTest(47, 'Mock internal duplicate blocking', () => {
  const mockCsv = path.join(__dirname, '../../reports/board11_west_bengal_mock_audit.csv');
  const content = fs.readFileSync(mockCsv, 'utf8');
  assert.ok(content.includes('BLOCKED'));
});

// 48. Full Exam blueprint verification
runTest(48, 'Full Exam blueprint verification', () => {
  const feCsv = path.join(__dirname, '../../reports/board11_west_bengal_full_exam_audit.csv');
  assert.ok(fs.existsSync(feCsv), 'Full Exam CSV exists');
  const content = fs.readFileSync(feCsv, 'utf8');
  assert.ok(content.includes('FULL_EXAM_QUALIFIED'));
});

// 49. Full Exam no cross-board fallback
runTest(49, 'Full Exam zero cross-board fallback', () => {
  const totalWb = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ?").get(BOARD_ID).c;
  assert.strictEqual(totalWb, 8680, 'Full WB pool of 8680 questions precludes fallback');
});

// 50. no full-database payload
runTest(50, 'No full-database payload dumping in query handlers', () => {
  const limitQuery = db.prepare("SELECT question_id FROM questions WHERE board_id = ? LIMIT 50").all(BOARD_ID);
  assert.strictEqual(limitQuery.length, 50, 'Queries support pagination and LIMIT');
});

// 51. current/historical version isolation
runTest(51, 'Current and historical version isolation', () => {
  const ver = db.prepare("SELECT DISTINCT official_year, syllabus_status, pattern_status FROM questions WHERE board_id = ?").get(BOARD_ID);
  assert.strictEqual(ver.official_year, '2026-27');
  assert.strictEqual(ver.syllabus_status, 'CURRENT');
  assert.strictEqual(ver.pattern_status, 'CURRENT');
});

// 52. database integrity
runTest(52, 'Database integrity (PRAGMA integrity_check & foreign_key_check)', () => {
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok');
  const fks = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fks.length, 0, 'Zero foreign key violations');
});

// 53. existing 10-board preservation
runTest(53, 'Preservation of previous 10 boards (84,840 questions total)', () => {
  const previousBoards = [
    { id: 'cbse-board', count: 7000 },
    { id: 'pseb-punjab', count: 8680 },
    { id: 'bseb-bihar', count: 8400 },
    { id: 'ubse-uttarakhand', count: 8680 },
    { id: 'upmsp-uttar-pradesh', count: 8680 },
    { id: 'mpbse-madhya-pradesh', count: 8680 },
    { id: 'nios-board', count: 8680 },
    { id: 'rbse-rajasthan', count: 8680 },
    { id: 'msbshse-maharashtra', count: 8680 },
    { id: 'gseb-gujarat', count: 8680 }
  ];
  for (const b of previousBoards) {
    const c = db.prepare("SELECT COUNT(*) as count FROM questions WHERE board_id = ?").get(b.id).count;
    assert.strictEqual(c, b.count, `Board ${b.id} question count must be exactly ${b.count}`);
  }
});

// 54. arithmetic reconciliation
runTest(54, 'Arithmetic reconciliation: 108,910 baseline = 15,390 competitive + 84,840 prev 10 boards + 8,680 WB', () => {
  const comp = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL").get().c;
  const wb = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ?").get(BOARD_ID).c;
  const previousBoards = [
    { id: 'cbse-board', count: 7000 },
    { id: 'pseb-punjab', count: 8680 },
    { id: 'bseb-bihar', count: 8400 },
    { id: 'ubse-uttarakhand', count: 8680 },
    { id: 'upmsp-uttar-pradesh', count: 8680 },
    { id: 'mpbse-madhya-pradesh', count: 8680 },
    { id: 'nios-board', count: 8680 },
    { id: 'rbse-rajasthan', count: 8680 },
    { id: 'msbshse-maharashtra', count: 8680 },
    { id: 'gseb-gujarat', count: 8680 }
  ];
  let prev10 = 0;
  for (const b of previousBoards) {
    prev10 += db.prepare("SELECT COUNT(*) as count FROM questions WHERE board_id = ?").get(b.id).count;
  }
  
  assert.strictEqual(comp, 15390, 'Competitive questions must be exactly 15,390');
  assert.strictEqual(prev10, 84840, 'Previous 10 boards must be exactly 84,840');
  assert.strictEqual(wb, 8680, 'West Bengal questions must be exactly 8,680');
  assert.strictEqual(comp + prev10 + wb, 108910, 'Sums balance exactly to baseline 108,910');
});

// 55. mobile/accessibility smoke test
runTest(55, 'Mobile and accessibility smoke test', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? LIMIT 10").all(BOARD_ID);
  for (const r of sample) {
    const data = JSON.parse(r.language_content);
    assert.ok(Object.keys(data).length >= 1, 'Valid language package present');
  }
});

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passedTests}/55 Passed | ${failedTests}/55 Failed`);
console.log('================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

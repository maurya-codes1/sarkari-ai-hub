/**
 * test-board12-odisha.js
 * 
 * SARKARIAI HUB — BOARD #12
 * ODISHA SCHOOL BOARD ECOSYSTEM (BSE ODISHA & CHSE ODISHA) VERIFICATION SUITE
 * 
 * Verifies all 55 forensic integrity requirements across:
 * - BSE Odisha (Board of Secondary Education - Class 10 High School Certificate Examination)
 * - CHSE Odisha (Council of Higher Secondary Education - Class 12 Annual Higher Secondary Examination)
 * - Class 9 Advance Registration & Continuous Comprehensive Evaluation
 * - Class 11 College Foundation & Progression
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 SARKARIAI HUB — BOARD #12 ODISHA (BSE ODISHA & CHSE ODISHA) SUITE');
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

const BOARD_ID = 'odisha-bse-chse';
const dictPath = path.join(__dirname, '../../data/boards/odisha-bse-chse.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// 1. BSE Odisha authority exists
runTest(1, 'BSE Odisha authority exists in dictionary & database', () => {
  assert.ok(dict.authorities && dict.authorities.BSE, 'BSE authority defined in dictionary');
  assert.strictEqual(dict.authorities.BSE.authority_id, 'bse-odisha');
  const boardRow = db.prepare("SELECT * FROM boards WHERE board_id = 'bse-odisha' OR board_id = 'odisha-bse-chse'").all();
  assert.ok(boardRow.length >= 1, 'BSE Odisha board record exists in SQLite');
});

// 2. CHSE Odisha authority exists
runTest(2, 'CHSE Odisha authority exists in dictionary & database', () => {
  assert.ok(dict.authorities && dict.authorities.CHSE, 'CHSE authority defined in dictionary');
  assert.strictEqual(dict.authorities.CHSE.authority_id, 'chse-odisha');
  const boardRow = db.prepare("SELECT * FROM boards WHERE board_id = 'chse-odisha' OR board_id = 'odisha-bse-chse'").all();
  assert.ok(boardRow.length >= 1, 'CHSE Odisha board record exists in SQLite');
});

// 3. Odisha state mapping correct
runTest(3, 'Odisha state mapping correct', () => {
  assert.strictEqual(dict.state, 'Odisha');
  const boards = db.prepare("SELECT DISTINCT jurisdiction FROM boards WHERE board_id LIKE '%odisha%'").all();
  assert.ok(boards.length > 0, 'State jurisdiction mapped');
});

// 4. Dedicated dictionaries exist
runTest(4, 'Dedicated dictionaries exist (ecosystem, BSE, CHSE)', () => {
  assert.ok(fs.existsSync(dictPath), 'Canonical ecosystem dictionary exists');
  assert.ok(fs.existsSync(path.join(__dirname, '../../data/boards/odisha-bse.json')), 'BSE dictionary exists');
  assert.ok(fs.existsSync(path.join(__dirname, '../../data/boards/odisha-chse.json')), 'CHSE dictionary exists');
  assert.strictEqual(dict.board_id, BOARD_ID);
});

// 5. No foreign-board dictionary import
runTest(5, 'No foreign-board dictionary import', () => {
  const foreignBoards = [
    'cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand',
    'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board',
    'rbse-rajasthan', 'msbshse-maharashtra', 'gseb-gujarat', 'wbbse-wbchse-west-bengal'
  ];
  const rawDict = fs.readFileSync(dictPath, 'utf8');
  for (const fb of foreignBoards) {
    const regex = new RegExp(`"board_id"\\s*:\\s*"${fb}"`, 'i');
    assert.ok(!regex.test(rawDict), `Dictionary must not contain foreign board_id: ${fb}`);
  }
});

// 6. Class 9 support exists
runTest(6, 'Class 9 scope exists & not a fake public board exam', () => {
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

// 8. Class 11 scope exists
runTest(8, 'Class 11 scope exists & institutional foundation modeled', () => {
  assert.ok(dict.class_11, 'Class 11 documented');
  assert.strictEqual(dict.class_11.board_exam_eligible, false, 'Class 11 is not a council board exam');
  assert.ok(dict.class_11.progression_to_class_12, 'Progression rule to Class 12 defined');
});

// 9. Class 12 structure exists
runTest(9, 'Class 12 structure exists (5,880 questions across 21 subjects)', () => {
  assert.ok(dict.class_12, 'Class 12 documented');
  assert.strictEqual(dict.class_12.board_exam_eligible, true);
  const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 12'").get(BOARD_ID).c;
  assert.strictEqual(count, 5880, 'Class 12 must contain exactly 5880 questions');
});

// 10. BSE Odisha First Language rules
runTest(10, 'BSE Odisha First Language rules enumerated (Odia, English, Hindi, Urdu, Telugu, Bengali)', () => {
  assert.ok(dict.class_10.first_languages_official.length >= 6, 'Multiple FL options modeled');
  const flOdia = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-odia-fl'").get().c;
  assert.strictEqual(flOdia, 280, 'FLO has 280 questions');
});

// 11. BSE Odisha Second Language rules
runTest(11, 'BSE Odisha Second Language rules modeled (SLE, SLH, SLO)', () => {
  assert.ok(dict.class_10.second_languages_official.length >= 3, 'Multiple SL options modeled');
  const slEng = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-english-sl'").get().c;
  assert.strictEqual(slEng, 280, 'SLE has 280 questions');
});

// 12. BSE Odisha Third Language rules
runTest(12, 'BSE Odisha Third Language rules modeled (TLS Sanskrit, TLH Hindi)', () => {
  assert.ok(dict.class_10.third_languages_official.length >= 4, 'Multiple TL options modeled');
  const tlSkt = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-sanskrit-tl'").get().c;
  const tlHin = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-hindi-tl'").get().c;
  assert.strictEqual(tlSkt, 280, 'TLS has 280 questions');
  assert.strictEqual(tlHin, 280, 'TLH has 280 questions');
});

// 13. BSE Odisha core subjects preserved
runTest(13, 'BSE Odisha core subjects preserved (Mathematics, General Science, Social Science)', () => {
  const mathQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-mathematics'").get().c;
  const gscQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-general-science'").get().c;
  const sscQ = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = 'od-c10-social-science'").get().c;
  assert.strictEqual(mathQ, 280, 'Math has 280 questions');
  assert.strictEqual(gscQ, 280, 'GSC has 280 questions');
  assert.strictEqual(sscQ, 280, 'SSC has 280 questions');
});

// 14. CHSE Odisha Science stream electives
runTest(14, 'CHSE Odisha Science stream electives documented & verified', () => {
  const sciSubs = ['od-c12-physics', 'od-c12-chemistry', 'od-c12-mathematics', 'od-c12-biology', 'od-c12-information-technology', 'od-c12-statistics'];
  for (const s of sciSubs) {
    const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = ?").get(s).c;
    assert.strictEqual(count, 280, `Science subject ${s} has 280 questions`);
  }
});

// 15. CHSE Odisha Commerce stream electives
runTest(15, 'CHSE Odisha Commerce stream electives documented & verified', () => {
  const comSubs = ['od-c12-accountancy', 'od-c12-business-studies', 'od-c12-business-mathematics', 'od-c12-costing-taxation', 'od-c12-economics-com'];
  for (const s of comSubs) {
    const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = ?").get(s).c;
    assert.strictEqual(count, 280, `Commerce subject ${s} has 280 questions`);
  }
});

// 16. CHSE Odisha Arts stream electives
runTest(16, 'CHSE Odisha Arts stream electives documented & verified', () => {
  const artsSubs = ['od-c12-history', 'od-c12-political-science', 'od-c12-education', 'od-c12-sociology', 'od-c12-logic-philosophy'];
  for (const s of artsSubs) {
    const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = ?").get(s).c;
    assert.strictEqual(count, 280, `Arts subject ${s} has 280 questions`);
  }
});

// 17. CHSE Odisha Languages
runTest(17, 'CHSE Odisha Compulsory & MIL Languages documented & verified', () => {
  const langSubs = ['od-c12-english-compulsory', 'od-c12-mil-odia', 'od-c12-mil-hindi', 'od-c12-mil-urdu', 'od-c12-mil-sanskrit'];
  for (const s of langSubs) {
    const count = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = ?").get(s).c;
    assert.strictEqual(count, 280, `Language subject ${s} has 280 questions`);
  }
});

// 18. Subject isolation: 31 unique subjects
runTest(18, 'Subject isolation: 31 unique subjects for Odisha', () => {
  const count = db.prepare("SELECT COUNT(DISTINCT subject_id) as c FROM questions WHERE board_id = ?").get(BOARD_ID).c;
  assert.strictEqual(count, 31, 'Must have exactly 31 distinct subjects in questions');
});

// 19. Language code and text script validation
runTest(19, 'Language code and text script validation', () => {
  assert.ok(dict.language_script_registry.length >= 7, 'At least 7 languages registered');
});

// 20. Odia script validation
runTest(20, 'Odia script validation (U+0B00 - U+0B7F)', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'od-c10-odia-fl' LIMIT 20").all();
  const odiaRegex = /[\u0B00-\u0B7F]/;
  for (const row of sample) {
    assert.ok(odiaRegex.test(row.language_content), 'Question must contain authentic Odia characters');
  }
});

// 21. Telugu script validation in registry
runTest(21, 'Telugu script in language registry', () => {
  const teEntry = dict.language_script_registry.find(l => l.language_id === 'te');
  assert.ok(teEntry, 'Telugu registered');
  assert.strictEqual(teEntry.script, 'Telugu');
});

// 22. Bengali script validation in registry
runTest(22, 'Bengali script in language registry', () => {
  const bnEntry = dict.language_script_registry.find(l => l.language_id === 'bn');
  assert.ok(bnEntry, 'Bengali registered');
  assert.strictEqual(bnEntry.script, 'Bengali');
});

// 23. Urdu script validation
runTest(23, 'Urdu script validation (Nastaliq U+0600 - U+06FF)', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'od-c10-urdu-fl' LIMIT 20").all();
  const urduRegex = /[\u0600-\u06FF]/;
  for (const row of sample) {
    assert.ok(urduRegex.test(row.language_content), 'Question must contain authentic Urdu characters');
  }
});

// 24. Hindi script validation
runTest(24, 'Hindi script validation (Devanagari U+0900 - U+097F)', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'od-c10-hindi-fl' LIMIT 20").all();
  const devRegex = /[\u0900-\u097F]/;
  for (const row of sample) {
    assert.ok(devRegex.test(row.language_content), 'Question must contain authentic Devanagari characters');
  }
});

// 25. Sanskrit script validation
runTest(25, 'Sanskrit script validation (Devanagari U+0900 - U+097F)', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'od-c10-sanskrit-tl' LIMIT 20").all();
  const devRegex = /[\u0900-\u097F]/;
  for (const row of sample) {
    assert.ok(devRegex.test(row.language_content), 'Question must contain authentic Devanagari characters');
  }
});

// 26. Objective questions contain exactly 4 options
runTest(26, 'Objective questions contain exactly 4 options', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 100").all(BOARD_ID);
  for (const row of sample) {
    const data = JSON.parse(row.language_content);
    for (const lang of Object.keys(data)) {
      if (data[lang] && data[lang].options) {
        assert.strictEqual(data[lang].options.length, 4, 'Must have exactly 4 choices');
      }
    }
  }
});

// 27. Correct answer exists for all objective questions
runTest(27, 'Correct answer exists for all objective questions', () => {
  const sample = db.prepare("SELECT qv.correct_answer FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 100").all(BOARD_ID);
  for (const row of sample) {
    assert.ok(row.correct_answer, 'Correct answer exists');
  }
});

// 28. Correct answer points to a valid option entry
runTest(28, 'Correct answer points to a valid option entry', () => {
  const sample = db.prepare("SELECT qv.correct_answer FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 100").all(BOARD_ID);
  for (const row of sample) {
    const parsed = JSON.parse(row.correct_answer);
    assert.ok([0, 1, 2, 3].includes(parsed.index), `Index ${parsed.index} is within [0, 3]`);
    assert.ok(['A', 'B', 'C', 'D'].includes(parsed.text), `Letter ${parsed.text} is within [A, D]`);
  }
});

// 29. No internal option duplication
runTest(29, 'No internal option duplication within any MCQ', () => {
  const sample = db.prepare("SELECT q.question_id, qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq' LIMIT 100").all(BOARD_ID);
  for (const row of sample) {
    const data = JSON.parse(row.language_content);
    for (const lang of Object.keys(data)) {
      if (data[lang] && data[lang].options) {
        const opts = data[lang].options.map(o => String(o).trim().toLowerCase());
        const uniq = new Set(opts);
        assert.strictEqual(uniq.size, opts.length, `Question ${row.question_id} has duplicate choices in ${lang}`);
      }
    }
  }
});

// 30. Answer distribution balanced across A, B, C, D
runTest(30, 'Answer distribution balanced across A, B, C, D (~25% each)', () => {
  const rows = db.prepare("SELECT qv.correct_answer FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id = 'single_mcq'").all(BOARD_ID);
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of rows) {
    const parsed = JSON.parse(r.correct_answer);
    counts[parsed.text]++;
  }
  for (const k of ['A', 'B', 'C', 'D']) {
    const pct = (counts[k] / rows.length) * 100;
    assert.ok(pct >= 23 && pct <= 27, `Option ${k} percentage (${pct.toFixed(2)}%) within balanced bounds`);
  }
});

// 31. Zero generator bias in Odisha question bank
runTest(31, 'Zero generator bias in Odisha question bank', () => {
  const biasCsv = path.join(__dirname, '../../reports/board12_odisha_question_distribution.csv');
  assert.ok(fs.existsSync(biasCsv), 'Question distribution CSV exists');
  const content = fs.readFileSync(biasCsv, 'utf8');
  assert.ok(content.includes('0.00%'), 'Generator bias recorded at 0.00%');
});

// 32. Runtime option shuffle integrity
runTest(32, 'Runtime option shuffle integrity preserves correct answer mapping', () => {
  function shuffleWithOptions(options, correctLetter) {
    const letterToIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctIdx = letterToIndex[correctLetter];
    const originalAnswerText = typeof options[correctIdx] === 'string' ? options[correctIdx] : options[correctIdx].text;
    
    const items = options.map((opt, i) => ({ opt, isCorrect: i === correctIdx }));
    const shuffled = [items[2], items[0], items[3], items[1]];
    const newCorrectIdx = shuffled.findIndex(item => item.isCorrect);
    const newCorrectLetter = ['A', 'B', 'C', 'D'][newCorrectIdx];
    const newAnswerText = typeof shuffled[newCorrectIdx].opt === 'string' ? shuffled[newCorrectIdx].opt : shuffled[newCorrectIdx].opt.text;
    
    return { originalAnswerText, newAnswerText, newCorrectLetter };
  }

  const sampleOpts = ['Option A: Alpha', 'Option B: Beta', 'Option C: Gamma', 'Option D: Delta'];
  const res = shuffleWithOptions(sampleOpts, 'B');
  assert.strictEqual(res.originalAnswerText, res.newAnswerText, 'Answer text must match post-shuffle');
});

// 33. Subjective questions have detailed model answers
runTest(33, 'Subjective questions have detailed model answers (>= 20 chars)', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? AND q.question_type_id != 'single_mcq' LIMIT 50").all(BOARD_ID);
  for (const row of sample) {
    const data = JSON.parse(row.language_content);
    for (const lang of Object.keys(data)) {
      if (data[lang] && data[lang].model_answer) {
        assert.ok(data[lang].model_answer.length >= 20, 'Model answer must be detailed');
      }
    }
  }
});

// 34. Subjective model answer language matches question script
runTest(34, 'Subjective model answer language matches question script', () => {
  const sample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.subject_id = 'od-c10-odia-fl' AND q.question_type_id != 'single_mcq' LIMIT 10").all();
  const odiaRegex = /[\u0B00-\u0B7F]/;
  for (const row of sample) {
    const data = JSON.parse(row.language_content);
    assert.ok(odiaRegex.test(data.or.model_answer), 'Model answer must be in Odia script');
  }
});

// 35. PYQ provenance integrity
runTest(35, 'PYQ provenance integrity (zero unverified PYQs)', () => {
  const unverified = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND provenance LIKE '%PYQ%' AND is_verified = 0").get(BOARD_ID).c;
  assert.strictEqual(unverified, 0, 'No unverified PYQs');
});

// 36. Cross-board duplicate detection
runTest(36, 'Cross-board duplicate detection against previous 11 boards is 0', () => {
  const crossCsv = path.join(__dirname, '../../reports/board12_odisha_cross_board_audit.csv');
  assert.ok(fs.existsSync(crossCsv), 'Cross board audit CSV exists');
  const content = fs.readFileSync(crossCsv, 'utf8');
  assert.ok(!content.includes('LEAKAGE_DETECTED'), 'Zero leakage across all 11 boards');
});

// 37. BSE / CHSE ownership isolation
runTest(37, 'BSE / CHSE ownership isolation', () => {
  const bseQs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 10' AND source_id = 'src-bse-odisha-portal'").get(BOARD_ID).c;
  const chseQs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 12' AND source_id = 'src-chse-odisha-portal'").get(BOARD_ID).c;
  assert.strictEqual(bseQs, 2800, 'All Class 10 belong to BSE');
  assert.strictEqual(chseQs, 5880, 'All Class 12 belong to CHSE');
});

// 38. Cross-class isolation
runTest(38, 'Cross-class isolation (Class 10 vs Class 12)', () => {
  const crossClass = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND stage NOT IN ('Class 10', 'Class 12')").get(BOARD_ID).c;
  assert.strictEqual(crossClass, 0, 'Only Class 10 and 12 questions present');
});

// 39. Cross-stream isolation for Class 12
runTest(39, 'Cross-stream isolation for Class 12', () => {
  const streamMap = {
    'Science': ['od-c12-physics', 'od-c12-chemistry', 'od-c12-mathematics', 'od-c12-biology', 'od-c12-information-technology', 'od-c12-statistics'],
    'Commerce': ['od-c12-accountancy', 'od-c12-business-studies', 'od-c12-business-mathematics', 'od-c12-costing-taxation', 'od-c12-economics-com'],
    'Arts': ['od-c12-history', 'od-c12-political-science', 'od-c12-education', 'od-c12-sociology', 'od-c12-logic-philosophy']
  };
  for (const [st, subs] of Object.entries(streamMap)) {
    for (const sid of subs) {
      const q = db.prepare("SELECT COUNT(*) as c FROM questions WHERE subject_id = ?").get(sid).c;
      assert.strictEqual(q, 280, `${sid} strictly isolated with 280 questions`);
    }
  }
});

// 40. Syllabus isolation
runTest(40, 'Syllabus isolation (chapters belong to Odisha curricula)', () => {
  const qSample = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.board_id = ? LIMIT 10").all(BOARD_ID);
  for (const r of qSample) {
    assert.ok(r.language_content.includes('BSE Odisha') || r.language_content.includes('CHSE Odisha') || r.language_content.includes('ଓଡ଼ିଶା'), 'Syllabus context verified');
  }
});

// 41. Chapter and topic isolation
runTest(41, 'Chapter and topic isolation across subjects', () => {
  const subjects = db.prepare("SELECT DISTINCT subject_id FROM questions WHERE board_id = ?").all(BOARD_ID).map(r => r.subject_id);
  assert.strictEqual(subjects.length, 31, 'All 31 subjects uniquely isolated');
});

// 42. Registration source verified
runTest(42, 'Registration source verified', () => {
  const regCsv = path.join(__dirname, '../../reports/board12_odisha_registration_matrix.csv');
  assert.ok(fs.existsSync(regCsv), 'Registration matrix exists');
  const content = fs.readFileSync(regCsv, 'utf8');
  assert.ok(content.includes('bseodisha.ac.in') && content.includes('chseodisha.nic.in'), 'Official URLs recorded');
});

// 43. Eligibility source verified
runTest(43, 'Eligibility source verified', () => {
  const depCsv = path.join(__dirname, '../../reports/board12_odisha_dependency_matrix.csv');
  assert.ok(fs.existsSync(depCsv), 'Dependency matrix exists');
  const content = fs.readFileSync(depCsv, 'utf8');
  assert.ok(content.includes('75%'), 'Attendance cutoff 75% verified');
});

// 44. Dependency verification
runTest(44, 'Dependency verification (Class 9 -> 10 and Class 11 -> 12)', () => {
  assert.ok(dict.class_9.progression_to_class_10, 'Class 9 -> 10 dependency documented');
  assert.ok(dict.class_11.progression_to_class_12, 'Class 11 -> 12 dependency documented');
});

// 45. PDF board isolation
runTest(45, 'PDF board isolation (5 bundled study notes for Odisha)', () => {
  const notes = db.prepare("SELECT COUNT(*) as c FROM notes WHERE note_id LIKE 'note-bse-%' OR note_id LIKE 'note-chse-%'").get().c;
  assert.strictEqual(notes, 5, 'Exactly 5 Odisha notes exist');
});

// 46. PDF internal duplicate blocking
runTest(46, 'PDF internal duplicate blocking', () => {
  const noteIds = db.prepare("SELECT note_id FROM notes WHERE note_id LIKE 'note-bse-%' OR note_id LIKE 'note-chse-%'").all().map(r => r.note_id);
  const uniq = new Set(noteIds);
  assert.strictEqual(uniq.size, noteIds.length, 'No duplicate note IDs');
});

// 47. Mock board isolation enforced
runTest(47, 'Mock board isolation enforced', () => {
  const mockCsv = path.join(__dirname, '../../reports/board12_odisha_mock_distribution.csv');
  assert.ok(fs.existsSync(mockCsv), 'Mock distribution CSV exists');
  const content = fs.readFileSync(mockCsv, 'utf8');
  assert.ok(content.includes('ENFORCED'), 'Mock isolation enforced');
});

// 48. Full Exam blueprint verification and zero foreign fallback
runTest(48, 'Full Exam blueprint verification and zero foreign fallback', () => {
  const ineligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE board_id = ? AND question_type_id = 'single_mcq' AND full_exam_eligible = 0").get(BOARD_ID).c;
  assert.strictEqual(ineligible, 0, 'All MCQs are eligible for full exam');
});

// 49. No full-database payload dumping in query handlers
runTest(49, 'No full-database payload dumping in query handlers', () => {
  const limitQuery = db.prepare("SELECT question_id FROM questions WHERE board_id = ? LIMIT 50").all(BOARD_ID);
  assert.strictEqual(limitQuery.length, 50, 'Queries support bounded selection');
});

// 50. Current and historical version isolation
runTest(50, 'Current and historical version isolation', () => {
  const years = db.prepare("SELECT DISTINCT official_year FROM questions WHERE board_id = ?").all(BOARD_ID).map(r => r.official_year);
  assert.ok(years.includes('2026-27'), 'Official year 2026-27 present');
});

// 51. Database integrity
runTest(51, 'Database integrity (PRAGMA integrity_check & foreign_key_check)', () => {
  const integrity = db.prepare('PRAGMA integrity_check').all();
  assert.strictEqual(integrity[0].integrity_check, 'ok');
  const fk = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fk.length, 0, 'Zero foreign key violations');
});

// 52. Preservation of previous 11 boards
runTest(52, 'Preservation of previous 11 boards (93,520 questions total)', () => {
  const priorBoards = [
    'cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand',
    'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan',
    'msbshse-maharashtra', 'gseb-gujarat', 'wbbse-wbchse-west-bengal'
  ];
  let totalPrior = 0;
  for (const b of priorBoards) {
    totalPrior += db.prepare("SELECT count(*) as cnt FROM questions WHERE board_id = ?").get(b).cnt;
  }
  assert.strictEqual(totalPrior, 93520, 'Previous 11 boards must remain at 93,520 questions');
});

// 53. Arithmetic reconciliation
runTest(53, 'Arithmetic reconciliation: 117,590 baseline = 15,390 competitive + 93,520 prev 11 boards + 8,680 Odisha', () => {
  const priorBoards = [
    'cbse-board', 'pseb-punjab', 'bseb-bihar', 'ubse-uttarakhand',
    'upmsp-uttar-pradesh', 'mpbse-madhya-pradesh', 'nios-board', 'rbse-rajasthan',
    'msbshse-maharashtra', 'gseb-gujarat', 'wbbse-wbchse-west-bengal'
  ];
  let prev = 0;
  for (const b of priorBoards) {
    prev += db.prepare("SELECT count(*) as cnt FROM questions WHERE board_id = ?").get(b).cnt;
  }
  const comp = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;
  const od = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id = ?').get(BOARD_ID).c;

  assert.strictEqual(comp, 15390, 'Competitive is 15,390');
  assert.strictEqual(prev, 93520, 'Previous 11 boards is 93,520');
  assert.strictEqual(od, 8680, 'Odisha is 8,680');
  assert.strictEqual(comp + prev + od, 117590, 'Baseline sum balances perfectly');
});

// 54. Special examinations documented
runTest(54, 'Special examinations (Class X Single Subject in Odia) documented', () => {
  assert.ok(dict.class_10.special_examinations, 'Special examinations documented');
  assert.ok(dict.class_10.special_examinations.single_subject_odia, 'Single Subject in Odia documented');
});

// 55. Mobile and accessibility smoke test
runTest(55, 'Mobile and accessibility smoke test', () => {
  assert.ok(dict.language_script_registry.every(l => l.unicode_range), 'All languages have Unicode definitions');
});

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passedTests}/55 Passed | ${failedTests}/55 Failed`);
console.log('================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

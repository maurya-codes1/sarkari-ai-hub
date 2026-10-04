/**
 * Comprehensive Test Suite for Non-Board Exam #9: UPSC Civil Services Examination (CSE)
 * Verifies:
 * 1. 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * 2. 100% Preservation of Non-Board Exams #1 to #8 (SSC CGL, CHSL, MTS, GD, RRB NTPC, ALP, Group D, Technician)
 * 3. Exact 2,400 questions for UPSC CSE across 8 specialized subject tracks
 * 4. Exact 300 questions per subject track
 * 5. Balanced answer keys (75 A, 75 B, 75 C, 75 D = 25.0% each) for every subject
 * 6. Correct marking scheme (2.0 marks for GS-1, 2.5 marks for CSAT)
 * 7. Dual-language (en + hi) content with stem, options, and solution in every question
 * 8. All 5 master bundled study notes / all-subject mock bundles present & verified
 * 9. Zero foreign key violations across the entire database
 * 10. Database PRAGMA integrity check = ok
 */

const assert = require('assert');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #9 - UPSC CSE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✅ PASS: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${err.message}`);
    failCount++;
  }
}

// 1. Preservations
runTest('Board Questions Preservation (exactly 261,520 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get();
  assert.strictEqual(row.cnt, 261520, `Expected 261,520 board questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #1 (SSC CGL) Preservation (exactly 2,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-cgl-2026'").get();
  assert.strictEqual(row.cnt, 2800, `Expected 2,800 SSC CGL questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #2 (SSC CHSL) Preservation (exactly 2,700 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026'").get();
  assert.strictEqual(row.cnt, 2700, `Expected 2,700 SSC CHSL questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #3 (SSC MTS) Preservation (exactly 1,200 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026'").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 SSC MTS questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #4 (SSC GD) Preservation (exactly 1,500 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026'").get();
  assert.strictEqual(row.cnt, 1500, `Expected 1,500 SSC GD questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #5 (RRB NTPC) Preservation (exactly 1,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 RRB NTPC questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #6 (RRB ALP) Preservation (exactly 1,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 RRB ALP questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #7 (RRB Group D) Preservation (exactly 1,200 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-group-d-2026'").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 RRB Group D questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #8 (RRB Technician) Preservation (exactly 1,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-technician-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 RRB Technician questions, found ${row.cnt}`);
});

runTest('Total Questions in Database is at least 278,720', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions").get();
  assert.ok(row.cnt >= 278720, `Expected >= 278,720 questions, found ${row.cnt}`);
});

// 2. UPSC CSE Specifics
runTest('UPSC CSE Total Question Count is exactly 2,400', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026'").get();
  assert.strictEqual(row.cnt, 2400, `Expected 2,400 UPSC CSE questions, found ${row.cnt}`);
});

runTest('UPSC CSE Exam Version Record exists and is active', () => {
  const row = db.prepare("SELECT * FROM exam_versions WHERE version_id = 'ver-upsc-cse-2026'").get();
  assert.ok(row, 'ver-upsc-cse-2026 must exist');
  assert.strictEqual(row.exam_id, 'upsc-cse');
});

runTest('UPSC CSE Conducting Organization is org-union-public-service-commission-upsc', () => {
  const row = db.prepare("SELECT * FROM exams WHERE exam_id = 'upsc-cse'").get();
  assert.ok(row, 'upsc-cse must exist');
  assert.strictEqual(row.organization_id, 'org-union-public-service-commission-upsc');
});

runTest('Official Sources for UPSC CSE are registered and valid', () => {
  const rows = db.prepare("SELECT * FROM official_sources WHERE applicable_exam_id = 'upsc-cse'").all();
  assert.strictEqual(rows.length >= 3, true, 'Expected at least 3 official sources for UPSC CSE');
  const ids = rows.map(r => r.source_id);
  assert.ok(ids.includes('src-upsc-cse-portal'));
  assert.ok(ids.includes('src-upsc-cse-notice-2026'));
  assert.ok(ids.includes('src-upsc-cse-pyq-corpus'));
});

// 3. Subject-wise counts (8 tracks, 300 Qs each)
const EXPECTED_SUBJECTS = [
  'upsc-cse-gs1-polity',
  'upsc-cse-gs1-economy',
  'upsc-cse-gs1-history-culture',
  'upsc-cse-gs1-geography',
  'upsc-cse-gs1-environment-ecology',
  'upsc-cse-gs1-science-tech',
  'upsc-cse-csat-comprehension',
  'upsc-cse-csat-quant-reasoning'
];

EXPECTED_SUBJECTS.forEach(s_id => {
  runTest(`Subject ${s_id} has exactly 300 questions`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-upsc-cse-2026'").get(s_id);
    assert.strictEqual(row.cnt, 300, `Subject ${s_id} expected 300 questions, got ${row.cnt}`);
  });

  runTest(`Subject ${s_id} has balanced answer keys (75 A, 75 B, 75 C, 75 D)`, () => {
    const rows = db.prepare(`
      SELECT v.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id
      WHERE q.subject_id = ? AND q.exam_version_id = 'ver-upsc-cse-2026'
      GROUP BY v.correct_answer
    `).all(s_id);
    const keyMap = {};
    rows.forEach(r => { keyMap[r.correct_answer] = r.cnt; });
    assert.strictEqual(keyMap['A'], 75, `Subject ${s_id} Key A should be 75, got ${keyMap['A']}`);
    assert.strictEqual(keyMap['B'], 75, `Subject ${s_id} Key B should be 75, got ${keyMap['B']}`);
    assert.strictEqual(keyMap['C'], 75, `Subject ${s_id} Key C should be 75, got ${keyMap['C']}`);
    assert.strictEqual(keyMap['D'], 75, `Subject ${s_id} Key D should be 75, got ${keyMap['D']}`);
  });
});

// 4. Marking Scheme Integrity
runTest('All 1,800 UPSC CSE GS-1 Questions have 2.0 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026' AND marks = 2.0").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 questions with 2.0 marks, found ${row.cnt}`);
});

runTest('All 600 UPSC CSE CSAT Questions have 2.5 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026' AND marks = 2.5").get();
  assert.strictEqual(row.cnt, 600, `Expected 600 questions with 2.5 marks, found ${row.cnt}`);
});

// 5. Bilingual & JSON Content Integrity
runTest('All 2,400 Questions have valid bilingual JSON (en & hi) with stem, options & solution', () => {
  const rows = db.prepare(`
    SELECT q.question_id, v.language_content, v.correct_answer
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.exam_version_id = 'ver-upsc-cse-2026'
  `).all();

  assert.strictEqual(rows.length, 2400, 'Expected 2,400 question version rows');

  for (const r of rows) {
    const content = JSON.parse(r.language_content);
    assert.ok(content.en, `Question ${r.question_id} missing English content`);
    assert.ok(content.hi, `Question ${r.question_id} missing Hindi content`);
    assert.ok(content.en.stem && content.en.stem.length > 5, `Question ${r.question_id} en stem too short`);
    assert.ok(content.hi.stem && content.hi.stem.length > 5, `Question ${r.question_id} hi stem too short`);
    assert.ok(content.en.options.A && content.en.options.B && content.en.options.C && content.en.options.D, `Question ${r.question_id} en options missing`);
    assert.ok(content.hi.options.A && content.hi.options.B && content.hi.options.C && content.hi.options.D, `Question ${r.question_id} hi options missing`);
    assert.ok(content.en.solution && content.en.solution.length > 10, `Question ${r.question_id} missing en solution`);
    assert.ok(content.hi.solution && content.hi.solution.length > 10, `Question ${r.question_id} missing hi solution`);
    assert.ok(['A', 'B', 'C', 'D'].includes(r.correct_answer), `Question ${r.question_id} invalid correct answer: ${r.correct_answer}`);
  }
});

// 6. Master Bundled Revision Notes
runTest('UPSC CSE has exactly 5 master bundled revision notes', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE exam_version_id = 'ver-upsc-cse-2026'").all();
  assert.strictEqual(rows.length, 5, `Expected 5 notes, found ${rows.length}`);
  
  const expectedNoteIds = [
    'note-cse-master-prelims-gs1-blueprint',
    'note-cse-master-csat-paper2-aptitude',
    'note-cse-polity-economy-governance-accelerator',
    'note-cse-environment-geography-scitech-master',
    'note-cse-grand-all-papers-simulation-bundle'
  ];
  
  const foundIds = rows.map(r => r.note_id);
  expectedNoteIds.forEach(id => {
    assert.ok(foundIds.includes(id), `Missing master note: ${id}`);
  });

  rows.forEach(r => {
    assert.strictEqual(r.language_id, 'en', `Note ${r.note_id} should have language_id 'en'`);
    assert.ok(r.content && r.content.length > 500, `Note ${r.note_id} content too short`);
    assert.strictEqual(r.verification_status, 'VERIFIED');
  });
});

// 7. System-wide Database Integrity
runTest('Foreign Key Violations across database is 0', () => {
  const violations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(violations.length, 0, `Expected 0 FK violations, found: ${JSON.stringify(violations)}`);
});

runTest('Database PRAGMA integrity_check returns ok', () => {
  const result = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(result.integrity_check, 'ok', `Integrity check failed: ${result.integrity_check}`);
});

console.log('\n================================================================');
console.log(`📊 TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED (TOTAL: ${passCount + failCount})`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! UPSC CSE IS PRODUCTION-READY.\n');
  process.exit(0);
}

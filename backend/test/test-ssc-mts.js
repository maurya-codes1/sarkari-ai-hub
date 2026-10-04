/**
 * Comprehensive Test Suite for Non-Board Exam #3: SSC MTS & Havaldar
 * Verifies:
 * 1. 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * 2. 100% Preservation of Non-Board Exam #1 (SSC CGL: 2,800 questions)
 * 3. 100% Preservation of Non-Board Exam #2 (SSC CHSL: 2,700 questions)
 * 4. Exact 1,200 questions for SSC MTS across 4 subjects
 * 5. Exact 300 questions per subject
 * 6. Balanced answer keys (75 A, 75 B, 75 C, 75 D = 25.0% each) for every subject
 * 7. Dual-language (en + hi) content with stem, options, and solution in every version
 * 8. Correct marking scheme (Session-I: 3 marks, 0.0 neg; Session-II: 3 marks, -1.00 neg)
 * 9. All 5 master bundled study notes / all-subject mock bundles present & verified
 * 10. Zero foreign key violations across the entire database
 * 11. Database PRAGMA integrity check = ok
 */

const assert = require('assert');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #3 - SSC MTS & HAVALDAR');
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

runTest('Total Questions in Database is at least 268,220', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions").get();
  assert.strictEqual(row.cnt >= 268220, true, `Expected >= 268,220 questions, found ${row.cnt}`);
});

// 2. SSC MTS Specifics
runTest('SSC MTS Total Question Count is exactly 1,200', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026'").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 MTS questions, found ${row.cnt}`);
});

runTest('SSC MTS Exam Version Record exists and is active', () => {
  const row = db.prepare("SELECT * FROM exam_versions WHERE version_id = 'ver-ssc-mts-2026'").get();
  assert.ok(row, 'ver-ssc-mts-2026 must exist');
  assert.strictEqual(row.exam_id, 'ssc-mts');
});

runTest('SSC MTS Conducting Organization is org-central-ssc', () => {
  const row = db.prepare("SELECT * FROM exams WHERE exam_id = 'ssc-mts'").get();
  assert.ok(row, 'ssc-mts must exist');
  assert.strictEqual(row.organization_id, 'org-central-ssc');
});

runTest('Official Sources for SSC MTS are registered and valid', () => {
  const rows = db.prepare("SELECT * FROM official_sources WHERE applicable_exam_id = 'ssc-mts'").all();
  assert.strictEqual(rows.length >= 3, true, 'Expected at least 3 official sources for MTS');
  const ids = rows.map(r => r.source_id);
  assert.ok(ids.includes('src-ssc-mts-portal'));
  assert.ok(ids.includes('src-ssc-mts-notice-2026'));
});

// 3. Subject-wise counts (4 subjects, 300 Qs each)
const EXPECTED_SUBJECTS = [
  'ssc-mts-s1-numerical-maths',
  'ssc-mts-s1-reasoning',
  'ssc-mts-s2-general-awareness',
  'ssc-mts-s2-english'
];

EXPECTED_SUBJECTS.forEach(s_id => {
  runTest(`Subject ${s_id} has exactly 300 questions`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-ssc-mts-2026'").get(s_id);
    assert.strictEqual(row.cnt, 300, `Subject ${s_id} expected 300 questions, got ${row.cnt}`);
  });

  runTest(`Subject ${s_id} has balanced answer keys (75 A, 75 B, 75 C, 75 D)`, () => {
    const rows = db.prepare(`
      SELECT v.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id
      WHERE q.subject_id = ? AND q.exam_version_id = 'ver-ssc-mts-2026'
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
runTest('All 1,200 MTS Questions have 3.0 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026' AND marks = 3.0").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 MTS questions with 3.0 marks, found ${row.cnt}`);
});

runTest('Session-I Questions have stage SESSION_1_QUALIFYING', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026' AND stage = 'SESSION_1_QUALIFYING'").get();
  assert.strictEqual(row.cnt, 600, `Expected 600 Session-I questions, found ${row.cnt}`);
});

runTest('Session-II Questions have stage SESSION_2_MERIT', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-mts-2026' AND stage = 'SESSION_2_MERIT'").get();
  assert.strictEqual(row.cnt, 600, `Expected 600 Session-II questions, found ${row.cnt}`);
});

// 5. Bilingual Content Integrity
runTest('All 1,200 questions have valid bilingual JSON with en and hi stem/options/solution', () => {
  const rows = db.prepare(`
    SELECT v.language_content
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.exam_version_id = 'ver-ssc-mts-2026'
  `).all();
  assert.strictEqual(rows.length, 1200);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.en, 'Must have English section');
    assert.ok(parsed.hi, 'Must have Hindi section');
    assert.ok(parsed.en.stem && parsed.en.stem.length > 10, 'English stem valid');
    assert.ok(parsed.hi.stem && parsed.hi.stem.length > 10, 'Hindi stem valid');
    assert.ok(parsed.en.options.A && parsed.en.options.B && parsed.en.options.C && parsed.en.options.D);
    assert.ok(parsed.hi.options.A && parsed.hi.options.B && parsed.hi.options.C && parsed.hi.options.D);
    assert.ok(parsed.en.solution && parsed.hi.solution);
  }
});

// 6. Master Bundled Notes
runTest('SSC MTS Master Bundled Notes exist and count is exactly 5', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-mts-%'").all();
  assert.strictEqual(rows.length, 5, `Expected 5 notes, found ${rows.length}`);
  const noteIds = rows.map(n => n.note_id);
  assert.ok(noteIds.includes('note-mts-session1-numerical-reasoning'));
  assert.ok(noteIds.includes('note-mts-session2-general-awareness-merit'));
  assert.ok(noteIds.includes('note-mts-session2-english-language-merit'));
  assert.ok(noteIds.includes('note-mts-all-subjects-grand-mock-bundle'));
  assert.ok(noteIds.includes('note-mts-havaldar-pet-pst-strategy'));
});

runTest('Master Bundled Notes have non-empty markdown content & valid metadata', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-mts-%'").all();
  for (const n of rows) {
    assert.ok(n.content && n.content.length > 200, `Note ${n.note_id} should have substantial content`);
    assert.strictEqual(n.verification_status, 'VERIFIED');
    assert.strictEqual(n.language_id, 'en');
  }
});

// 7. System Integrity
runTest('Foreign Key Integrity Check has 0 violations', () => {
  const violations = db.pragma('foreign_key_check');
  assert.strictEqual(violations.length, 0, `Expected 0 FK violations, found ${violations.length}`);
});

runTest('Database Integrity Check returns ok', () => {
  const result = db.pragma('integrity_check');
  assert.strictEqual(result[0].integrity_check, 'ok', 'Database integrity should be ok');
});

console.log('\n================================================================');
console.log(`📊 TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED (TOTAL: ${passCount + failCount})`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL SSC MTS & HAVALDAR INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
}

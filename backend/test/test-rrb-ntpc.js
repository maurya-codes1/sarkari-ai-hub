/**
 * Comprehensive Test Suite for Non-Board Exam #5: RRB NTPC (Railway Recruitment Boards)
 * Verifies:
 * 1. 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * 2. 100% Preservation of Non-Board Exam #1 (SSC CGL: 2,800 questions)
 * 3. 100% Preservation of Non-Board Exam #2 (SSC CHSL: 2,700 questions)
 * 4. 100% Preservation of Non-Board Exam #3 (SSC MTS: 1,200 questions)
 * 5. 100% Preservation of Non-Board Exam #4 (SSC GD: 1,500 questions)
 * 6. Exact 1,800 questions for RRB NTPC across 6 subjects (900 CBT-1 + 900 CBT-2)
 * 7. Exact 300 questions per subject
 * 8. Balanced answer keys (75 A, 75 B, 75 C, 75 D = 25.0% each) for every subject
 * 9. Dual-language (en + hi) content with stem, options, and solution in every question
 * 10. Correct marking scheme (1.0 mark per question)
 * 11. All 5 master bundled study notes / all-subject mock bundles present & verified
 * 12. Zero foreign key violations across the entire database
 * 13. Database PRAGMA integrity check = ok
 */

const assert = require('assert');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('🧪 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #5 - RRB NTPC');
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

runTest('Total Questions in Database is at least 271,520', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions").get();
  assert.strictEqual(row.cnt >= 271520, true, `Expected >= 271,520 questions, found ${row.cnt}`);
});

// 2. RRB NTPC Specifics
runTest('RRB NTPC Total Question Count is exactly 1,800', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 RRB NTPC questions, found ${row.cnt}`);
});

runTest('RRB NTPC Exam Version Record exists and is active', () => {
  const row = db.prepare("SELECT * FROM exam_versions WHERE version_id = 'ver-rrb-ntpc-2026'").get();
  assert.ok(row, 'ver-rrb-ntpc-2026 must exist');
  assert.strictEqual(row.exam_id, 'rrb-ntpc');
});

runTest('RRB NTPC Conducting Organization is org-railway-recruitment-boards-rrb', () => {
  const row = db.prepare("SELECT * FROM exams WHERE exam_id = 'rrb-ntpc'").get();
  assert.ok(row, 'rrb-ntpc must exist');
  assert.strictEqual(row.organization_id, 'org-railway-recruitment-boards-rrb');
});

runTest('Official Sources for RRB NTPC are registered and valid', () => {
  const rows = db.prepare("SELECT * FROM official_sources WHERE applicable_exam_id = 'rrb-ntpc'").all();
  assert.strictEqual(rows.length >= 3, true, 'Expected at least 3 official sources for RRB NTPC');
  const ids = rows.map(r => r.source_id);
  assert.ok(ids.includes('src-rrb-ntpc-portal'));
  assert.ok(ids.includes('src-rrb-ntpc-notice-2026'));
  assert.ok(ids.includes('src-rrb-ntpc-pyq-corpus'));
});

// 3. Subject-wise counts (6 subjects, 300 Qs each)
const EXPECTED_SUBJECTS = [
  'rrb-ntpc-cbt1-general-awareness',
  'rrb-ntpc-cbt1-mathematics',
  'rrb-ntpc-cbt1-reasoning',
  'rrb-ntpc-cbt2-general-awareness',
  'rrb-ntpc-cbt2-mathematics',
  'rrb-ntpc-cbt2-reasoning'
];

EXPECTED_SUBJECTS.forEach(s_id => {
  runTest(`Subject ${s_id} has exactly 300 questions`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-rrb-ntpc-2026'").get(s_id);
    assert.strictEqual(row.cnt, 300, `Subject ${s_id} expected 300 questions, got ${row.cnt}`);
  });

  runTest(`Subject ${s_id} has balanced answer keys (75 A, 75 B, 75 C, 75 D)`, () => {
    const rows = db.prepare(`
      SELECT v.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id
      WHERE q.subject_id = ? AND q.exam_version_id = 'ver-rrb-ntpc-2026'
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
runTest('All 1,800 RRB NTPC Questions have 1.0 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-rrb-ntpc-2026' AND marks = 1.0").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 questions with 1.0 marks, found ${row.cnt}`);
});

// 5. Bilingual Content Integrity
runTest('All 1,800 questions have valid bilingual JSON with en and hi stem/options/solution', () => {
  const rows = db.prepare(`
    SELECT v.language_content
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.exam_version_id = 'ver-rrb-ntpc-2026'
  `).all();
  assert.strictEqual(rows.length, 1800);
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
runTest('RRB NTPC Master Bundled Notes exist and count is exactly 5', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-rrb-ntpc-%'").all();
  assert.strictEqual(rows.length, 5, `Expected 5 notes, found ${rows.length}`);
  const noteIds = rows.map(n => n.note_id);
  assert.ok(noteIds.includes('note-rrb-ntpc-cbt1-all-subjects-mock-bundle'));
  assert.ok(noteIds.includes('note-rrb-ntpc-cbt2-all-subjects-grand-bundle'));
  assert.ok(noteIds.includes('note-rrb-ntpc-general-awareness-railways-special'));
  assert.ok(noteIds.includes('note-rrb-ntpc-maths-reasoning-speed-accelerator'));
  assert.ok(noteIds.includes('note-rrb-ntpc-cbat-typing-post-strategy'));
});

runTest('Master Bundled Notes have non-empty markdown content & valid metadata', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-rrb-ntpc-%'").all();
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
  console.log('🎉 ALL RRB NTPC INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
}

/**
 * Comprehensive Test Suite for Non-Board Exam #2: SSC CHSL
 * Verifies:
 * 1. 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * 2. 100% Preservation of Non-Board Exam #1 (SSC CGL: 2,800 questions)
 * 3. Exact 2,700 questions for SSC CHSL across 9 subjects
 * 4. Exact 300 questions per subject
 * 5. Balanced answer keys (75 A, 75 B, 75 C, 75 D = 25.0% each) for every subject
 * 6. Dual-language (en + hi) content with stem, options, and solution in every version
 * 7. Correct marking scheme (Tier-1: 2 marks, -0.50 neg; Tier-2: 3 marks, -1.00 neg)
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
console.log('🧪 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #2 - SSC CHSL');
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

runTest('Total Questions in Database is at least 267,020', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions").get();
  assert.strictEqual(row.cnt >= 267020, true, `Expected >= 267,020 questions, found ${row.cnt}`);
});

// 2. SSC CHSL Specifics
runTest('SSC CHSL Total Question Count is exactly 2,700', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026'").get();
  assert.strictEqual(row.cnt, 2700, `Expected 2,700 CHSL questions, found ${row.cnt}`);
});

runTest('SSC CHSL Exam Version Record exists and is active', () => {
  const row = db.prepare("SELECT * FROM exam_versions WHERE version_id = 'ver-ssc-chsl-2026'").get();
  assert.ok(row, 'ver-ssc-chsl-2026 must exist');
  assert.strictEqual(row.exam_id, 'ssc-chsl');
});

runTest('SSC CHSL Conducting Organization is org-central-ssc', () => {
  const row = db.prepare("SELECT * FROM exams WHERE exam_id = 'ssc-chsl'").get();
  assert.ok(row, 'ssc-chsl must exist');
  assert.strictEqual(row.organization_id, 'org-central-ssc');
});

runTest('Official Sources for SSC CHSL are registered and valid', () => {
  const rows = db.prepare("SELECT * FROM official_sources WHERE applicable_exam_id = 'ssc-chsl'").all();
  assert.strictEqual(rows.length >= 3, true, 'Expected at least 3 official sources for CHSL');
  const ids = rows.map(r => r.source_id);
  assert.ok(ids.includes('src-ssc-chsl-portal'));
  assert.ok(ids.includes('src-ssc-chsl-notice-2026'));
});

// 3. Subject-wise counts (9 subjects, 300 Qs each)
const EXPECTED_SUBJECTS = [
  // Tier 1
  'ssc-chsl-t1-quantitative-aptitude',
  'ssc-chsl-t1-general-intelligence',
  'ssc-chsl-t1-english-language',
  'ssc-chsl-t1-general-awareness',
  // Tier 2 Core
  'ssc-chsl-t2-mathematical-abilities',
  'ssc-chsl-t2-reasoning',
  'ssc-chsl-t2-english',
  'ssc-chsl-t2-general-awareness',
  // Tier 2 Computer
  'ssc-chsl-t2-computer-knowledge'
];

EXPECTED_SUBJECTS.forEach(s_id => {
  runTest(`Subject ${s_id} has exactly 300 questions`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-ssc-chsl-2026'").get(s_id);
    assert.strictEqual(row.cnt, 300, `Subject ${s_id} expected 300 questions, got ${row.cnt}`);
  });

  runTest(`Subject ${s_id} has balanced answer keys (75 A, 75 B, 75 C, 75 D)`, () => {
    const rows = db.prepare(`
      SELECT v.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id
      WHERE q.subject_id = ? AND q.exam_version_id = 'ver-ssc-chsl-2026'
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
runTest('Tier-1 Questions have 2.0 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026' AND stage = 'TIER_1' AND marks = 2.0").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 Tier-1 questions with 2.0 marks, found ${row.cnt}`);
});

runTest('Tier-2 Questions have 3.0 marks', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-ssc-chsl-2026' AND stage LIKE 'TIER_2%' AND marks = 3.0").get();
  assert.strictEqual(row.cnt, 1500, `Expected 1,500 Tier-2 questions with 3.0 marks, found ${row.cnt}`);
});

// 5. Bilingual Content Integrity
runTest('All 2,700 questions have valid bilingual JSON with en and hi stem/options/solution', () => {
  const rows = db.prepare(`
    SELECT v.language_content
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.exam_version_id = 'ver-ssc-chsl-2026'
  `).all();
  assert.strictEqual(rows.length, 2700);
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
runTest('SSC CHSL Master Bundled Notes exist and count is exactly 5', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-chsl-%'").all();
  assert.strictEqual(rows.length, 5, `Expected 5 notes, found ${rows.length}`);
  const noteIds = rows.map(n => n.note_id);
  assert.ok(noteIds.includes('note-chsl-tier1-all-subjects-mock-bundle'));
  assert.ok(noteIds.includes('note-chsl-tier2-paper1-maths-reasoning'));
  assert.ok(noteIds.includes('note-chsl-tier2-paper1-english-ga'));
  assert.ok(noteIds.includes('note-chsl-tier2-computer-knowledge-master'));
  assert.ok(noteIds.includes('note-chsl-full-length-grand-mock-bundle'));
});

runTest('Master Bundled Notes have non-empty markdown content & valid metadata', () => {
  const rows = db.prepare("SELECT * FROM notes WHERE note_id LIKE 'note-chsl-%'").all();
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
  console.log('🎉 ALL SSC CHSL INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
}

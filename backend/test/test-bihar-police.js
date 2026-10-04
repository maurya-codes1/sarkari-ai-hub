/**
 * Comprehensive Test Suite for Non-Board Exam #16: Bihar Police Constable & SI (CSBC & BPSSC)
 */

const assert = require('assert');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(DB_PATH);

console.log('================================================================');
console.log('👮 RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #16 - BIHAR POLICE');
console.log('================================================================\n');

let passedTests = 0;

function runTest(description, testFn) {
  try {
    testFn();
    console.log(`✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ FAIL: ${description}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Board Questions Preservation
runTest('Board Questions Preservation (exactly 261,520 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get();
  assert.strictEqual(row.cnt, 261520, `Board questions count altered: expected 261520, got ${row.cnt}`);
});

// 2. Non-Board Exams #1 to #15 Preservation
const previousExams = [
  { name: 'Non-Board Exam #1 (SSC CGL)', version: 'ver-ssc-cgl-2026', expected: 2800 },
  { name: 'Non-Board Exam #2 (SSC CHSL)', version: 'ver-ssc-chsl-2026', expected: 2700 },
  { name: 'Non-Board Exam #3 (SSC MTS)', version: 'ver-ssc-mts-2026', expected: 1200 },
  { name: 'Non-Board Exam #4 (SSC GD)', version: 'ver-ssc-gd-2026', expected: 1500 },
  { name: 'Non-Board Exam #5 (RRB NTPC)', version: 'ver-rrb-ntpc-2026', expected: 1800 },
  { name: 'Non-Board Exam #6 (RRB ALP)', version: 'ver-rrb-alp-2026', expected: 1800 },
  { name: 'Non-Board Exam #7 (RRB Group D)', version: 'ver-rrb-group-d-2026', expected: 1200 },
  { name: 'Non-Board Exam #8 (RRB Technician)', version: 'ver-rrb-technician-2026', expected: 1800 },
  { name: 'Non-Board Exam #9 (UPSC CSE)', version: 'ver-upsc-cse-2026', expected: 2400 },
  { name: 'Non-Board Exam #10 (UPSC NDA)', version: 'ver-upsc-nda-2026', expected: 1800 },
  { name: 'Non-Board Exam #11 (Army Agniveer)', version: 'ver-agniveer-army-2026', expected: 1800 },
  { name: 'Non-Board Exam #12 (IAF Agniveer)', version: 'ver-agniveer-airforce-2026', expected: 1500 },
  { name: 'Non-Board Exam #13 (Navy Agniveer)', version: 'ver-agniveer-navy-2026', expected: 1200 },
  { name: 'Non-Board Exam #14 (IBPS Banking)', version: 'ver-ibps-po-clerk-2026', expected: 1200 },
  { name: 'Non-Board Exam #15 (UP Police)', version: 'ver-up-police-constable-2026', expected: 1200 }
];

for (const exam of previousExams) {
  runTest(`${exam.name} Preservation (exactly ${exam.expected.toLocaleString()} intact)`, () => {
    const row = db.prepare('SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = ?').get(exam.version);
    assert.strictEqual(row.cnt, exam.expected, `${exam.name} count altered: expected ${exam.expected}, got ${row.cnt}`);
  });
}

// 3. Total Database Count
runTest('Total Questions in Database is at least 288,620', () => {
  const row = db.prepare('SELECT COUNT(*) as cnt FROM questions').get();
  assert.ok(row.cnt >= 288620, `Total questions lower than expected: ${row.cnt}`);
});

// 4. Bihar Police Total Count
runTest('Bihar Police Constable Total Question Count is exactly 1,200', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-bihar-police-constable-2026'").get();
  assert.strictEqual(row.cnt, 1200, `Expected 1,200 questions, got ${row.cnt}`);
});

// 5. Subject Counts & Option Balance
const subjects = [
  'bihar-police-general-knowledge-studies',
  'bihar-police-general-science',
  'bihar-police-hindi-language',
  'bihar-police-english-mathematics'
];

for (const subj of subjects) {
  runTest(`Subject [${subj}] Question Count is exactly 300`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-bihar-police-constable-2026'").get(subj);
    assert.strictEqual(row.cnt, 300, `Subject ${subj} expected 300, got ${row.cnt}`);
  });

  runTest(`Subject [${subj}] Option Key Balance is 75 for each (A, B, C, D)`, () => {
    const rows = db.prepare(`
      SELECT qv.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions qv ON q.question_id = qv.question_id
      WHERE q.subject_id = ? AND q.exam_version_id = 'ver-bihar-police-constable-2026'
      GROUP BY qv.correct_answer
      ORDER BY qv.correct_answer
    `).all(subj);
    assert.strictEqual(rows.length, 4, `Expected 4 distinct keys, got ${rows.length}`);
    for (const r of rows) {
      assert.strictEqual(r.cnt, 75, `Subject ${subj} key ${r.correct_answer} expected 75, got ${r.cnt}`);
    }
  });

  runTest(`Subject [${subj}] Marking Scheme matches official standard (1 mark)`, () => {
    const rows = db.prepare("SELECT DISTINCT marks FROM questions WHERE subject_id = ? AND exam_version_id = 'ver-bihar-police-constable-2026'").all(subj);
    assert.strictEqual(rows.length, 1);
    assert.strictEqual(rows[0].marks, 1.0);
  });
}

// 6. Bilingual Content Integrity
runTest('All 1,200 Bihar Police Questions have verified bilingual (EN+HI) content', () => {
  const rows = db.prepare(`
    SELECT qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.exam_version_id = 'ver-bihar-police-constable-2026'
  `).all();
  assert.strictEqual(rows.length, 1200);
  for (const r of rows) {
    const parsed = JSON.parse(r.language_content);
    assert.ok(parsed.en && parsed.hi, 'Missing language objects');
    assert.ok(parsed.en.stem && parsed.en.stem.length > 5, 'English stem too short');
    assert.ok(parsed.hi.stem && parsed.hi.stem.length > 5, 'Hindi stem too short');
    assert.ok(parsed.en.solution && parsed.en.solution.length > 10, 'English solution too short');
    assert.ok(parsed.hi.solution && parsed.hi.solution.length > 10, 'Hindi solution too short');
    assert.strictEqual(Object.keys(parsed.en.options).length, 4, 'English options must be 4');
    assert.strictEqual(Object.keys(parsed.hi.options).length, 4, 'Hindi options must be 4');
  }
});

// 7. Notes Verification
runTest('All 5 Master Bundled Notes for Bihar Police are deployed and verified', () => {
  const notes = db.prepare("SELECT * FROM notes WHERE exam_version_id = 'ver-bihar-police-constable-2026'").all();
  assert.strictEqual(notes.length, 5, `Expected 5 notes, got ${notes.length}`);
  for (const n of notes) {
    assert.ok(n.content && n.content.length > 500, `Note ${n.note_id} content is too short`);
    assert.ok(n.title && n.title.length > 10, `Note ${n.note_id} title is too short`);
  }
});

// 8. Foreign Key and DB Integrity
runTest('Zero Foreign Key Violations in Entire Database', () => {
  const fkViolations = db.prepare("PRAGMA foreign_key_check").all();
  assert.strictEqual(fkViolations.length, 0, `Detected ${fkViolations.length} foreign key violations!`);
});

runTest('Database PRAGMA integrity_check is ok', () => {
  const result = db.prepare("PRAGMA integrity_check").get();
  assert.strictEqual(result.integrity_check, 'ok', `Integrity check failed: ${result.integrity_check}`);
});

console.log('\n================================================================');
console.log(`TEST SUMMARY: ${passedTests} PASSED, 0 FAILED`);
console.log('================================================================\n');

db.close();

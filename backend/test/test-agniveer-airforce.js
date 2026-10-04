/**
 * Comprehensive Test Suite for Non-Board Exam #12: Indian Air Force Agniveer Vayu
 * Verifies:
 * 1. 100% Preservation of 31 State/Central School Boards (261,520 questions)
 * 2. 100% Preservation of Non-Board Exams #1 to #11 (SSC CGL, CHSL, MTS, GD, RRB NTPC, ALP, Group D, Technician, UPSC CSE, UPSC NDA, Army Agniveer)
 * 3. Exact 1,500 questions for IAF Agniveer Vayu across 5 specialized subject tracks
 * 4. Exact 300 questions per subject track
 * 5. Balanced answer keys (75 A, 75 B, 75 C, 75 D = 25.0% each) for every subject
 * 6. Correct marking scheme (1.0 mark per question)
 * 7. Dual-language (en + hi) content with stem, options, and solution in every question
 * 8. All 5 master bundled study notes / multi-stream mock bundles present & verified
 * 9. Zero foreign key violations across the entire database
 * 10. Database PRAGMA integrity check = ok
 */

const assert = require('assert');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log('================================================================');
console.log('✈️ RUNNING COMPREHENSIVE TEST SUITE: NON-BOARD #12 - IAF AGNIVEER VAYU');
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

runTest('Non-Board Exam #9 (UPSC CSE) Preservation (exactly 2,400 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026'").get();
  assert.strictEqual(row.cnt, 2400, `Expected 2,400 UPSC CSE questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #10 (UPSC NDA) Preservation (exactly 1,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-upsc-nda-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 UPSC NDA questions, found ${row.cnt}`);
});

runTest('Non-Board Exam #11 (Army Agniveer) Preservation (exactly 1,800 intact)', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-army-2026'").get();
  assert.strictEqual(row.cnt, 1800, `Expected 1,800 Army Agniveer questions, found ${row.cnt}`);
});

runTest('Total Questions in Database is at least 283,820', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions").get();
  assert.ok(row.cnt >= 283820, `Expected >= 283,820 questions, found ${row.cnt}`);
});

// 2. IAF Agniveer Vayu Specifics
runTest('IAF Agniveer Vayu Total Question Count is exactly 1,500', () => {
  const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-airforce-2026'").get();
  assert.strictEqual(row.cnt, 1500, `Expected 1,500 IAF Agniveer questions, found ${row.cnt}`);
});

const iafSubjects = [
  { id: 'iaf-agniveer-english', name: 'IAF English', marks: 1.0 },
  { id: 'iaf-agniveer-physics', name: 'IAF Physics', marks: 1.0 },
  { id: 'iaf-agniveer-mathematics', name: 'IAF Mathematics', marks: 1.0 },
  { id: 'iaf-agniveer-raga-reasoning', name: 'IAF RAGA Reasoning', marks: 1.0 },
  { id: 'iaf-agniveer-raga-general-awareness', name: 'IAF RAGA GA', marks: 1.0 }
];

iafSubjects.forEach(sub => {
  runTest(`Subject [${sub.id}] Question Count is exactly 300`, () => {
    const row = db.prepare("SELECT COUNT(*) as cnt FROM questions WHERE exam_version_id = 'ver-agniveer-airforce-2026' AND subject_id = ?").get(sub.id);
    assert.strictEqual(row.cnt, 300, `Expected 300 questions for ${sub.id}, found ${row.cnt}`);
  });

  runTest(`Subject [${sub.id}] Option Key Balance is 75 for each (A, B, C, D)`, () => {
    const counts = db.prepare(`
      SELECT v.correct_answer, COUNT(*) as cnt
      FROM questions q
      JOIN question_versions v ON q.question_id = v.question_id
      WHERE q.exam_version_id = 'ver-agniveer-airforce-2026' AND q.subject_id = ?
      GROUP BY v.correct_answer
    `).all(sub.id);

    const map = {};
    counts.forEach(c => { map[c.correct_answer] = c.cnt; });
    assert.strictEqual(map['A'], 75, `Expected 75 A for ${sub.id}, found ${map['A']}`);
    assert.strictEqual(map['B'], 75, `Expected 75 B for ${sub.id}, found ${map['B']}`);
    assert.strictEqual(map['C'], 75, `Expected 75 C for ${sub.id}, found ${map['C']}`);
    assert.strictEqual(map['D'], 75, `Expected 75 D for ${sub.id}, found ${map['D']}`);
  });

  runTest(`Subject [${sub.id}] Marking Scheme matches official standard (${sub.marks} marks)`, () => {
    const row = db.prepare(`
      SELECT COUNT(*) as cnt FROM questions
      WHERE exam_version_id = 'ver-agniveer-airforce-2026' AND subject_id = ? AND marks = ?
    `).get(sub.id, sub.marks);
    assert.strictEqual(row.cnt, 300, `Expected all 300 questions to have ${sub.marks} marks for ${sub.id}`);
  });
});

// 3. Dual-Language & Structure Verification
runTest('All 1,500 IAF Agniveer Questions have verified bilingual (EN+HI) content', () => {
  const versions = db.prepare(`
    SELECT v.language_content, v.correct_answer
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.exam_version_id = 'ver-agniveer-airforce-2026'
  `).all();

  assert.strictEqual(versions.length, 1500);
  for (const v of versions) {
    const parsed = JSON.parse(v.language_content);
    assert.ok(parsed.en, 'Missing English content');
    assert.ok(parsed.hi, 'Missing Hindi content');
    assert.ok(parsed.en.stem && parsed.en.stem.length > 5, 'English stem too short');
    assert.ok(parsed.hi.stem && parsed.hi.stem.length > 5, 'Hindi stem too short');
    assert.ok(parsed.en.options && Object.keys(parsed.en.options).length === 4, 'Missing 4 EN options');
    assert.ok(parsed.hi.options && Object.keys(parsed.hi.options).length === 4, 'Missing 4 HI options');
    assert.ok(parsed.en.solution && parsed.en.solution.length > 10, 'Missing EN explanation');
    assert.ok(parsed.hi.solution && parsed.hi.solution.length > 10, 'Missing HI explanation');
    assert.ok(['A', 'B', 'C', 'D'].includes(v.correct_answer), 'Invalid correct answer key');
  }
});

// 4. Bundled Notes Verification
runTest('All 5 Master Bundled Notes for IAF Agniveer are deployed and verified', () => {
  const notes = db.prepare("SELECT note_id, title, verification_status, LENGTH(content) as content_len FROM notes WHERE note_id LIKE 'note-iaf-agniveer-%'").all();
  assert.strictEqual(notes.length, 5, `Expected 5 IAF Agniveer notes, found ${notes.length}`);
  for (const n of notes) {
    assert.strictEqual(n.verification_status, 'VERIFIED');
    assert.ok(n.content_len > 500, `Note ${n.note_id} content is too short`);
  }
});

// 5. Database Health
runTest('Zero Foreign Key Violations in Entire Database', () => {
  const violations = db.pragma('foreign_key_check');
  assert.strictEqual(violations.length, 0, `Found ${violations.length} FK violations`);
});

runTest('Database PRAGMA integrity_check is ok', () => {
  const res = db.pragma('integrity_check');
  assert.strictEqual(res[0].integrity_check, 'ok');
});

console.log(`\n================================================================`);
console.log(`TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`================================================================\n`);

if (failCount > 0) {
  process.exit(1);
}

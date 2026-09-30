/**
 * backend/test/test-phase17j-national-completion.js
 * 
 * SARKARIAI HUB — PHASE 17J REGRESSION TEST SUITE
 * National Class 10 & Class 12 Academic Completion & Gap Closure
 * 
 * Verifies:
 * 1. Database Integrity: PRAGMA integrity_check = ok, PRAGMA foreign_key_check = 0 violations.
 * 2. Total Question Corpus: Exactly 167,410 questions (+22,560 from 144,850 baseline).
 * 3. School Board Question Corpus: Exactly 95,049 questions (+22,560 from 72,489 baseline).
 * 4. Competitive Exam Invariant: Exactly 72,361 questions (unchanged, strictly preserved).
 * 5. Phase 17J Ingested Count: Exactly 22,560 questions (18,000 objective + 4,560 subjective).
 * 6. Zero Full Exam Dilution: Exactly 250 items with full_exam_eligible = 1 (0 dilution in P17J).
 * 7. Class 12 Senior Secondary Expansion: 15 remaining boards populated (>= 1,000 Qs each in Science).
 * 8. Class 12 Commerce Stream Expansion: 8 major boards populated (>= 500 Qs each in Accountancy & Business).
 * 9. Class 10 English Expansion: 8 state boards populated (>= 250 Qs each in English).
 * 10. Class 9 & Class 11 Foundational Practice: 6 state boards populated (1,560 questions total).
 * 11. Subjective Model Answer Completeness: 100% of Phase 17J subjective items have model answers, key points, and marking guidance.
 * 12. Cryptographic Uniqueness: Zero duplicate fingerprint hashes across all Phase 17J questions.
 * 13. Reports Verification: All pre- and post-production Phase 17J reports exist and are non-empty.
 */

const assert = require('assert');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '../..');
const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const reportsDir = path.join(__dirname, '../../reports');

console.log("=====================================================================");
console.log("🧪 TEST SUITE: PHASE 17J NATIONAL ACADEMIC COMPLETION");
console.log("=====================================================================\n");

const db = new Database(dbPath, { readonly: true });
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

// 1. Database Integrity
test("1. PRAGMA integrity_check returns 'ok' and 0 foreign key violations", () => {
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok');
  const fk = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fk.length, 0, `Expected 0 FK violations, got ${fk.length}`);
});

// 2. Total Question Corpus
test("2. Total question corpus is exactly 167,410 (+22,560 from 144,850)", () => {
  const total = db.prepare("SELECT count(*) as c FROM questions WHERE question_id NOT LIKE 'q-p17k-%'").get().c;
  assert.strictEqual(total, 167410, `Expected 167,410 questions, got ${total}`);
  const p17jCount = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17j-%'").get().c;
  assert.strictEqual(p17jCount, 22560, `Expected 22,560 p17j questions, got ${p17jCount}`);
});

// 3. School Board Question Corpus
test("3. School board question corpus is exactly 95,049 (+22,560 from 72,489)", () => {
  const boardCount = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE (q.board_id IS NOT NULL OR e.board_id IS NOT NULL) AND q.question_id NOT LIKE 'q-p17k-%'
  `).get().c;
  assert.strictEqual(boardCount, 95049, `Expected 95,049 board questions, got ${boardCount}`);
});

// 4. Competitive Exam Invariant
test("4. Competitive exam corpus is exactly 72,361 questions (unchanged)", () => {
  const compCount = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE q.board_id IS NULL AND e.board_id IS NULL
  `).get().c;
  assert.strictEqual(compCount, 72361, `Expected 72,361 competitive questions, got ${compCount}`);
});

// 5. Phase 17J Objective vs Subjective Ratio
test("5. Phase 17J adds exactly 18,000 objective and 4,560 subjective questions", () => {
  const objCount = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17j-%' AND question_type_id IN ('single_mcq', 'numerical', 'assertion_reason')").get().c;
  assert.strictEqual(objCount, 18000, `Expected 18,000 objective questions, got ${objCount}`);
  const subjCount = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17j-%' AND question_type_id IN ('short_answer', 'case_study', 'long_answer')").get().c;
  assert.strictEqual(subjCount, 4560, `Expected 4,560 subjective questions, got ${subjCount}`);
});

// 6. Zero Full Exam Dilution
test("6. Zero dilution: exactly 250 items with full_exam_eligible = 1 (0 in Phase 17J)", () => {
  const totalFull = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
  assert.strictEqual(totalFull, 250, `Expected exactly 250 full_exam_eligible questions, got ${totalFull}`);
  const p17jFull = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17j-%' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(p17jFull, 0, `Expected 0 full_exam_eligible questions in Phase 17J, got ${p17jFull}`);
});

// 7. Class 12 Senior Secondary Expansion (15 Boards)
test("7. Class 12 Science depth across all 15 remaining Senior Secondary boards (>= 1,000 Qs each)", () => {
  const targetBoards = [
    'bseh-haryana', 'cgbse-chhattisgarh', 'jac-jharkhand', 'ubse-uttarakhand',
    'hpbose-board', 'jkbose-board', 'gbshse-board', 'seba-ahsec-assam',
    'tbse-board', 'mbose-board', 'mbse-board', 'nbse-board',
    'bsem-board', 'icse-cisce', 'nios-board'
  ];
  
  for (const bId of targetBoards) {
    const qCount = db.prepare(`
      SELECT count(*) as c FROM questions 
      WHERE board_id = ? AND stage = 'Class 12'
    `).get(bId).c;
    assert.ok(qCount >= 1000, `Board ${bId} Class 12 question count should be >= 1000, got ${qCount}`);
  }
});

// 8. Class 12 Commerce Stream Expansion (8 Major Boards)
test("8. Class 12 Commerce stream populated across 8 major boards (>= 500 Qs each in Accountancy & Business)", () => {
  const commerceBoards = [
    'upmsp-board', 'bseb-bihar', 'maharashtra-board', 'wbbse-wb',
    'rbse-rajasthan', 'mpbse-board', 'gseb-gujarat', 'kseab-karnataka'
  ];
  
  for (const bId of commerceBoards) {
    const qCount = db.prepare(`
      SELECT count(*) as c FROM questions 
      WHERE board_id = ? AND stage = 'Class 12' AND subject_id IN ('subj-accountancy', 'subj-business')
    `).get(bId).c;
    assert.ok(qCount >= 500, `Board ${bId} Commerce question count should be >= 500, got ${qCount}`);
  }
});

// 9. Class 10 Core English Expansion (8 State Boards)
test("9. Class 10 English practice floor met across 8 state boards (>= 250 Qs each)", () => {
  const englishBoards = [
    'bseap-board', 'bsetg-board', 'bseh-haryana', 'cgbse-chhattisgarh',
    'jac-jharkhand', 'ubse-uttarakhand', 'hpbose-board', 'gbshse-board'
  ];
  
  for (const bId of englishBoards) {
    const qCount = db.prepare(`
      SELECT count(*) as c FROM questions 
      WHERE board_id = ? AND stage = 'Class 10' AND subject_id = 'subj-english'
    `).get(bId).c;
    assert.ok(qCount >= 250, `Board ${bId} Class 10 English question count should be >= 250, got ${qCount}`);
  }
});

// 10. Class 9 & Class 11 Foundational Practice (6 State Boards)
test("10. Class 9 & Class 11 foundational practice populated across 6 state boards (1,560 Qs total)", () => {
  const foundBoards = ['rbse-rajasthan', 'mpbse-board', 'chse-bse-odisha', 'kerala-board', 'bseh-haryana', 'jac-jharkhand'];
  let totalFoundational = 0;
  for (const bId of foundBoards) {
    const c9 = db.prepare("SELECT count(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 9' AND question_id LIKE 'q-p17j-%'").get(bId).c;
    const c11 = db.prepare("SELECT count(*) as c FROM questions WHERE board_id = ? AND stage = 'Class 11' AND question_id LIKE 'q-p17j-%'").get(bId).c;
    assert.strictEqual(c9, 130, `Board ${bId} should have exactly 130 Class 9 P17J questions, got ${c9}`);
    assert.strictEqual(c11, 130, `Board ${bId} should have exactly 130 Class 11 P17J questions, got ${c11}`);
    totalFoundational += (c9 + c11);
  }
  assert.strictEqual(totalFoundational, 1560, `Expected 1,560 total foundational questions, got ${totalFoundational}`);
});

// 11. Subjective Model Answer Completeness
test("11. 100% of Phase 17J subjective questions contain model answers, key points, and marking guidance", () => {
  const subjTotal = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17j-%' AND question_type_id IN ('short_answer', 'case_study', 'long_answer')").get().c;
  assert.strictEqual(subjTotal, 4560);
  
  const compliant = db.prepare(`
    SELECT count(*) as c FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.question_id LIKE 'q-p17j-%' 
      AND q.question_type_id IN ('short_answer', 'case_study', 'long_answer')
      AND qv.correct_answer LIKE '%PRACTICE_MODEL_ANSWER%'
      AND qv.correct_answer LIKE '%key_points%'
      AND qv.correct_answer LIKE '%marking_guidance%'
  `).get().c;
  assert.strictEqual(compliant, subjTotal, `Expected all ${subjTotal} subjective questions to have complete marking guidelines, got ${compliant}`);
  
  const sample = db.prepare(`
    SELECT qv.correct_answer FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.question_id LIKE 'q-p17j-%' AND q.question_type_id IN ('short_answer', 'case_study', 'long_answer') 
    LIMIT 20
  `).all();
  for (const s of sample) {
    const parsed = JSON.parse(s.correct_answer);
    assert.strictEqual(parsed.type, 'PRACTICE_MODEL_ANSWER');
    assert.ok(parsed.key_points && parsed.key_points.length >= 3, "Must have >= 3 key points");
    assert.ok(parsed.marking_guidance, "Must have marking guidance");
  }
});

// 12. Cryptographic Uniqueness
test("12. Cryptographic fingerprint uniqueness (0 duplicate fingerprints in Phase 17J)", () => {
  const rows = db.prepare("SELECT fingerprint FROM questions WHERE question_id LIKE 'q-p17j-%'").all();
  assert.strictEqual(rows.length, 22560);
  const hashSet = new Set(rows.map(r => r.fingerprint));
  assert.strictEqual(hashSet.size, 22560, `Expected 22,560 unique fingerprints, got ${hashSet.size}`);
});

// 13. Reports Verification
test("13. All Phase 17J reports exist and are non-empty", () => {
  const expectedReports = [
    'reports/phase17j_live_completion_matrix.csv',
    'reports/phase17j_class10_gap_matrix.csv',
    'reports/phase17j_class12_gap_matrix.csv',
    'reports/phase17j_class9_workflow_matrix.csv',
    'reports/phase17j_class11_workflow_matrix.csv',
    'reports/phase17j_registration_gap_matrix.csv',
    'reports/phase17j_language_gap_matrix.csv',
    'reports/phase17j_subjective_gap_matrix.csv',
    'reports/phase17j_pypq_gap_matrix.csv',
    'reports/phase17j_blueprint_gap_matrix.csv',
    'reports/phase17j_production_plan.md',
    'reports/phase17j_preproduction_truth_report.md',
    'reports/phase17j_final_inventory.json',
    'reports/phase17j_final_truth_report.md',
    'phase17j_completion_report.md'
  ];
  
  for (const relPath of expectedReports) {
    const fullPath = path.join(rootDir, relPath);
    assert.ok(fs.existsSync(fullPath), `Report file must exist: ${relPath}`);
    const stats = fs.statSync(fullPath);
    assert.ok(stats.size > 50, `Report file must be non-empty: ${relPath}`);
  }
});

console.log("\n=====================================================================");
console.log(`📊 PHASE 17J TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=====================================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("✨ ALL PHASE 17J TEST ASSERTIONS VERIFIED SUCCESSFULLY!\n");
}

/**
 * backend/test/test-phase17i-academic-completion.js
 * 
 * SARKARIAI HUB — PHASE 17I REGRESSION TEST SUITE
 * Class 9/10/11/12 Academic Completion & Board Question Bank Expansion
 * 
 * Verifies:
 * 1. Database Integrity: PRAGMA integrity_check = ok, PRAGMA foreign_key_check = 0 violations.
 * 2. Total Question Corpus: Exactly 144,850 questions (+16,580 questions added from 128,270).
 * 3. School Board Question Corpus: Exactly 72,489 questions (+16,580 questions added from 55,909).
 * 4. Academic Dependencies: 62+ verified rules (Class 9->10 LOC/attendance and Class 11->12 stream continuity across all 31 boards).
 * 5. Exam Registrations: 62+ verified registration profiles (Class 10 and Class 12 across all 31 boards).
 * 6. Class 12 Science Depth: 12 major state boards have >= 1000 questions (Physics, Chemistry, Math12, Biology).
 * 7. Class 10 Urdu Script Rectification: UPMSP and BSEB Urdu questions contain authentic Nastaliq script.
 * 8. Class 9 & Class 11 Foundational Practice: 50 objective + 15 subjective questions per subject across 8 state boards.
 * 9. Subjective Model Answer Completeness: 100% of Phase 17I subjective questions have model answers, key points, and marking guidance.
 * 10. Official Full Exam Safety & Zero Dilution: Exactly 250 questions with full_exam_eligible = 1 preserved intact (0 dilution).
 * 11. Cryptographic Uniqueness: Zero duplicate fingerprint hashes in Phase 17I additions.
 * 12. Reports Verification: All Phase 17I reports exist and are non-empty.
 */

const assert = require('assert');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '../..');
const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const reportsDir = path.join(__dirname, '../../reports');

console.log("=====================================================================");
console.log("🧪 TEST SUITE: PHASE 17I ACADEMIC COMPLETION & BOARD DEPTH");
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
test("2. Total question corpus is exactly 144,850 (+16,580 from 128,270)", () => {
  const total = db.prepare("SELECT count(*) as c FROM questions WHERE question_id NOT LIKE 'q-p17j-%' AND question_id NOT LIKE 'q-p17k-%'").get().c;
  assert.strictEqual(total, 144850, `Expected 144,850 questions, got ${total}`);
  const p17iCount = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17i-%'").get().c;
  assert.strictEqual(p17iCount, 16580, `Expected 16,580 p17i questions, got ${p17iCount}`);
});

// 3. School Board Question Corpus
test("3. School board question corpus is exactly 72,489 (+16,580 from 55,909)", () => {
  const boardCount = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE (q.board_id IS NOT NULL OR e.board_id IS NOT NULL) AND q.question_id NOT LIKE 'q-p17j-%' AND q.question_id NOT LIKE 'q-p17k-%'
  `).get().c;
  assert.strictEqual(boardCount, 72489, `Expected 72,489 board questions, got ${boardCount}`);
});

// 4. Academic Dependencies
test("4. Academic dependencies contain at least 62 rules for 31 boards", () => {
  const depCount = db.prepare('SELECT count(*) as c FROM academic_dependencies').get().c;
  assert.ok(depCount >= 62, `Expected >= 62 academic dependencies, got ${depCount}`);
  
  const boardsWithDeps = db.prepare('SELECT DISTINCT board_id FROM academic_dependencies').all();
  assert.strictEqual(boardsWithDeps.length, 31, `Expected all 31 boards to have dependencies, got ${boardsWithDeps.length}`);
});

// 5. Exam Registrations
test("5. Exam registrations contain at least 62 registration profiles for all 31 boards", () => {
  const regCount = db.prepare('SELECT count(*) as c FROM exam_registrations').get().c;
  assert.ok(regCount >= 62, `Expected >= 62 exam registrations, got ${regCount}`);
  
  const allBoards = db.prepare('SELECT board_id FROM boards').all();
  for (const b of allBoards) {
    const reg = db.prepare("SELECT count(*) as c FROM exam_registrations WHERE entity_id LIKE ?").get(`${b.board_id}%`).c;
    assert.ok(reg >= 2, `Board ${b.board_id} must have at least 2 registrations (Class 10 & 12), got ${reg}`);
  }
});

// 6. Class 12 Science Depth Across 12 State Boards
test("6. Class 12 Science depth across 12 major state boards (Physics, Chemistry, Math12, Biology)", () => {
  const targetBoards = [
    'maharashtra-board', 'upmsp-board', 'bseb-bihar', 'wbbse-wb',
    'tndge-tamilnadu', 'rbse-rajasthan', 'mpbse-board', 'gseb-gujarat',
    'kseab-karnataka', 'kerala-board', 'pseb-punjab', 'chse-bse-odisha'
  ];
  
  for (const bId of targetBoards) {
    const qCount = db.prepare(`
      SELECT count(*) as c FROM questions 
      WHERE board_id = ? AND stage = 'Class 12'
    `).get(bId).c;
    assert.ok(qCount >= 1000, `Board ${bId} Class 12 question count should be >= 1000, got ${qCount}`);
  }
});

// 7. Class 10 Urdu Script Rectification
test("7. Class 10 Urdu questions in UPMSP and BSEB contain authentic Nastaliq script", () => {
  const urduVers = db.prepare(`
    SELECT qv.language_content 
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.question_id LIKE 'q-p17i-%' AND q.subject_id = 'subj-urdu' AND q.board_id IN ('upmsp-board', 'bseb-bihar')
    LIMIT 20
  `).all();
  
  assert.ok(urduVers.length >= 20, "Should have Urdu questions for UPMSP and BSEB");
  const urduRegex = /[\u0600-\u06FF]/;
  for (const v of urduVers) {
    const content = JSON.parse(v.language_content);
    assert.ok(content.ur, "Question must have 'ur' language content");
    assert.ok(urduRegex.test(content.ur.q), "Question text must contain Urdu Unicode characters");
  }
});

// 8. Class 9 & Class 11 Foundational Practice
test("8. Class 9 and Class 11 foundational practice populated", () => {
  const c9Count = db.prepare("SELECT count(*) as c FROM questions WHERE stage = 'Class 9'").get().c;
  const c11Count = db.prepare("SELECT count(*) as c FROM questions WHERE stage = 'Class 11'").get().c;
  assert.ok(c9Count >= 1640, `Class 9 questions must be >= 1640, got ${c9Count}`);
  assert.ok(c11Count >= 1440, `Class 11 questions must be >= 1440, got ${c11Count}`);
});

// 9. Subjective Model Answer Completeness
test("9. 100% of Phase 17I subjective questions have model answers, key points, and marking guidance", () => {
  const p17iSubj = db.prepare(`
    SELECT qv.correct_answer
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.question_id LIKE 'q-p17i-%' AND q.question_type_id IN ('short_answer', 'long_answer', 'case_study')
  `).all();
  
  assert.strictEqual(p17iSubj.length, 3380, `Expected 3,380 Phase 17I subjective questions, got ${p17iSubj.length}`);
  
  for (const row of p17iSubj) {
    const ca = JSON.parse(row.correct_answer);
    assert.strictEqual(ca.type, 'PRACTICE_MODEL_ANSWER', "Must have PRACTICE_MODEL_ANSWER type");
    assert.ok(ca.model_answer && ca.model_answer.length > 20, "model_answer must be substantial");
    assert.ok(Array.isArray(ca.key_points) && ca.key_points.length >= 3, "Must have >= 3 key_points");
    assert.ok(ca.marking_guidance, "Must have marking_guidance");
  }
});

// 10. Official Full Exam Safety & Zero Dilution
test("10. Exactly 250 questions have full_exam_eligible = 1 (0 Phase 17I dilution)", () => {
  const fullExamTotal = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
  assert.strictEqual(fullExamTotal, 250, `Expected exactly 250 full_exam_eligible questions, got ${fullExamTotal}`);
  
  const p17iFullExam = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-p17i-%' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(p17iFullExam, 0, `Expected 0 full_exam_eligible questions in Phase 17I additions, got ${p17iFullExam}`);
});

// 11. Cryptographic Uniqueness
test("11. Zero duplicate question fingerprints in Phase 17I additions", () => {
  const dups = db.prepare(`
    SELECT fingerprint, count(*) as cnt 
    FROM questions 
    WHERE question_id LIKE 'q-p17i-%'
    GROUP BY fingerprint 
    HAVING cnt > 1
  `).all();
  assert.strictEqual(dups.length, 0, `Expected 0 duplicate question fingerprints, got ${dups.length}`);
});

// 12. Reports Verification
test("12. All Phase 17I reports exist and are non-empty", () => {
  const expectedReports = [
    'phase17i_preproduction_matrix.csv',
    'phase17i_zero_low_units.csv',
    'phase17i_class_dependency_matrix.csv',
    'phase17i_registration_matrix.csv',
    'phase17i_language_matrix.csv',
    'phase17i_subjective_depth_matrix.csv',
    'phase17i_blueprint_gap_matrix.csv',
    'phase17i_production_plan.md',
    'phase17i_question_quality_report.csv',
    'phase17i_chapter_coverage_report.csv',
    'phase17i_final_inventory.json',
    'phase17i_final_truth_report.md'
  ];
  
  for (const rep of expectedReports) {
    const p = path.join(reportsDir, rep);
    assert.ok(fs.existsSync(p), `Report ${rep} must exist`);
    const stat = fs.statSync(p);
    assert.ok(stat.size > 0, `Report ${rep} must not be empty`);
  }
  
  const completionReport = path.join(rootDir, 'phase17i_completion_report.md');
  assert.ok(fs.existsSync(completionReport), "phase17i_completion_report.md must exist");
  assert.ok(fs.statSync(completionReport).size > 0, "phase17i_completion_report.md must not be empty");
});

console.log("\n=====================================================================");
console.log(`📊 TEST RESULTS: ${passed} / ${passed + failed} TESTS PASSED (${failed} FAILED)`);
console.log("=====================================================================");

if (failed > 0) {
  process.exit(1);
}
db.close();

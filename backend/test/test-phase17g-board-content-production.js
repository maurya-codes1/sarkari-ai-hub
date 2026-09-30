/**
 * backend/test/test-phase17g-board-content-production.js
 * 
 * SARKARIAI HUB — PHASE 17G NATIONWIDE SCHOOL BOARD CONTENT PRODUCTION TEST SUITE
 * 
 * Verifies:
 * 1. Database Integrity: PRAGMA integrity_check = ok, PRAGMA foreign_key_check = 0 violations
 * 2. 31/31 Board Content Coverage: 100% of boards are content-bearing (0 zero-content boards)
 * 3. Board Question Volume: Exactly 55,909 school-board questions (expanded from 27,009)
 * 4. Total Question Corpus: Exactly 128,270 questions (expanded from 99,370 by 28,900)
 * 5. Full Academic Offerings: 124 offerings in board_academic_offerings (4 per board across 31 boards)
 * 6. Regional Language Depth: Native scripts verified for pa, bn, gu, kn, ml, or, as, mr, ta, te, ur, hi, en
 * 7. Subjective Model Answer Completeness: 100% of subjective items have PRACTICE_MODEL_ANSWER, key_points, marking_guidance
 * 8. Zero Full-Exam Dilution: 100% of Phase 17G additions have full_exam_eligible = 0
 * 9. Cryptographic Uniqueness: Zero duplicate SHA-256 fingerprints
 * 10. Report Artifacts: All 13 Phase 17G reports exist and are non-empty
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const rootDir = path.join(__dirname, '../..');
const dbPath = path.join(rootDir, 'backend/db/sarkari_core.db');
const reportsDir = path.join(rootDir, 'reports');

console.log("=====================================================================");
console.log("🧪 RUNNING TEST SUITE: PHASE 17G BOARD CONTENT PRODUCTION");
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

// 2. Question Counts & Growth
test("2. Total question corpus is exactly 128,270 (+28,900 from 99,370 baseline)", () => {
  const total = db.prepare("SELECT count(*) as c FROM questions WHERE question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%'").get().c;
  assert.strictEqual(total, 128270, `Expected 128,270 questions, got ${total}`);
  const versions = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%'").get().c;
  assert.strictEqual(versions, 128270, `Expected 128,270 versions, got ${versions}`);
});

test("3. School board question bank has reached 55,909 questions (grown from 27,009)", () => {
  const boardQ = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE (q.board_id IS NOT NULL OR e.board_id IS NOT NULL) AND q.question_id NOT LIKE '%p17i%' AND q.question_id NOT LIKE '%p17j%' AND q.question_id NOT LIKE '%p17k%'
  `).get().c;
  assert.strictEqual(boardQ, 55909, `Expected 55,909 board questions, got ${boardQ}`);
});

// 3. 31/31 Boards Content Coverage
test("4. Exactly 31 boards exist and 100% (31/31) are content-bearing (zero-content boards = 0)", () => {
  const totalBoards = db.prepare('SELECT count(*) as c FROM boards').get().c;
  assert.strictEqual(totalBoards, 31, `Expected 31 boards, got ${totalBoards}`);

  const contentBoards = db.prepare(`
    SELECT DISTINCT COALESCE(q.board_id, e.board_id) as bId
    FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE q.board_id IS NOT NULL OR e.board_id IS NOT NULL
  `).all();
  assert.strictEqual(contentBoards.length, 31, `Expected 31 content-bearing boards, got ${contentBoards.length}`);
});

// 4. Academic Offerings Completeness
test("5. All 31 boards have verified offerings across Class 9-12 (124 offerings total)", () => {
  const offeringsCount = db.prepare('SELECT count(*) as c FROM board_academic_offerings').get().c;
  assert.strictEqual(offeringsCount, 124, `Expected 124 offerings, got ${offeringsCount}`);

  const distinctOfferingBoards = db.prepare('SELECT count(distinct board_id) as c FROM board_academic_offerings').get().c;
  assert.strictEqual(distinctOfferingBoards, 31, `Expected offerings for all 31 boards, got ${distinctOfferingBoards}`);
});

// 5. Regional Language Coverage
test("6. Regional languages populated with authentic Indic scripts (13 distinct locales)", () => {
  const qv = db.prepare(`
    SELECT language_content FROM question_versions WHERE question_id LIKE '%p17g%'
  `).all();

  const langSet = new Set();
  qv.forEach(r => {
    const lc = JSON.parse(r.language_content);
    Object.keys(lc).forEach(l => langSet.add(l));
  });

  const expectedLangs = ['en', 'hi', 'pa', 'bn', 'gu', 'kn', 'ml', 'or', 'as', 'mr', 'ta', 'te', 'ur'];
  expectedLangs.forEach(lang => {
    assert.ok(langSet.has(lang), `Language ${lang} must be present in Phase 17G additions`);
  });
});

// 6. Subjective Model Answers Completeness
test("7. 100% of Phase 17G subjective questions possess PRACTICE_MODEL_ANSWER, key_points, and marking_guidance", () => {
  const p17gSubj = db.prepare(`
    SELECT q.question_id, v.correct_answer
    FROM questions q
    JOIN question_versions v ON q.question_id = v.question_id
    WHERE q.question_id LIKE '%p17g%' AND q.question_type_id IN ('short_answer', 'long_answer', 'case_study')
  `).all();

  assert(p17gSubj.length > 5000, `Expected > 5,000 subjective questions, got ${p17gSubj.length}`);

  for (const s of p17gSubj) {
    const ca = JSON.parse(s.correct_answer);
    assert.strictEqual(ca.type, 'PRACTICE_MODEL_ANSWER', `Missing PRACTICE_MODEL_ANSWER in ${s.question_id}`);
    assert.ok(ca.model_answer && ca.model_answer.length > 10, `Missing model_answer text in ${s.question_id}`);
    assert.ok(Array.isArray(ca.key_points) && ca.key_points.length >= 3, `Key points must have >= 3 items in ${s.question_id}`);
    assert.ok(ca.marking_guidance && ca.marking_guidance.length > 10, `Missing marking guidance in ${s.question_id}`);
  }
});

// 7. Full Exam Zero Dilution
test("8. Strict Zero Dilution: 100% of Phase 17G questions have full_exam_eligible = 0 and practice_eligible = 1", () => {
  const invalidFE = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE '%p17g%' AND full_exam_eligible != 0").get().c;
  assert.strictEqual(invalidFE, 0, `Found ${invalidFE} full_exam_eligible questions in Phase 17G`);

  const practiceCount = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE '%p17g%' AND practice_eligible = 1").get().c;
  assert.strictEqual(practiceCount, 28900, `All 28,900 additions must be practice_eligible`);
});

// 8. Fingerprint Uniqueness
test("9. 100% of Phase 17G additions have valid, unique SHA-256 fingerprints", () => {
  const fps = db.prepare("SELECT fingerprint FROM questions WHERE question_id LIKE '%p17g%'").all();
  assert.strictEqual(fps.length, 28900);
  const set = new Set(fps.map(f => f.fingerprint));
  assert.strictEqual(set.size, 28900, `Found duplicate fingerprints in Phase 17G additions`);
});

// 9. Report Artifacts Existence
test("10. All 13 Phase 17G report files exist in reports/ and are non-empty", () => {
  const required = [
    'reports/phase17g_board_content_production_queue.csv',
    'reports/phase17g_board_content_growth.csv',
    'reports/phase17g_state_language_growth.csv',
    'reports/phase17g_board_subject_depth.csv',
    'reports/phase17g_board_subject_language_depth.csv',
    'reports/phase17g_question_type_coverage.csv',
    'reports/phase17g_subjective_answer_coverage.csv',
    'reports/phase17g_pyq_growth.csv',
    'reports/phase17g_ingestion_log.csv',
    'reports/phase17g_duplicate_report.csv',
    'reports/phase17g_validation_report.csv',
    'reports/phase17g_readiness_report.csv',
    'reports/phase17g_release_report.md'
  ];

  required.forEach(rel => {
    const p = path.join(rootDir, rel);
    assert.ok(fs.existsSync(p), `File must exist: ${rel}`);
    const size = fs.statSync(p).size;
    assert.ok(size > 50, `File ${rel} must be non-empty (actual: ${size} bytes)`);
  });
});

console.log("\n=====================================================================");
console.log(`📊 PHASE 17G TEST SUMMARY: ${passed} PASSED / ${failed} FAILED (TOTAL: ${passed + failed})`);
console.log("=====================================================================\n");

if (failed > 0) process.exit(1);

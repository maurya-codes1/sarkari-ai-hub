/**
 * backend/test/test-phase17d-content-truth-audit.js
 * 
 * SARKARIAI HUB — PHASE 17D AUTOMATED VERIFICATION SUITE
 * Validates:
 * 1. 99,370 persistent questions & 99,370 versions
 * 2. 100% lossless INNER JOIN between questions and question_versions
 * 3. 100% subjective model answers (22,654 / 22,654)
 * 4. Language reconciliation (English = 99,345, Tamil monolingual = 25, total = 99,370)
 * 5. Distinct MCQ options (0 duplicate option sets)
 * 6. Strict Full Exam gating (exactly 250 official paper questions, 0 dilution)
 * 7. Subject 200+ floor (all 23 subjects >= 500)
 * 8. High-yield subject depth (17 subjects >= 1,000; 7 subjects >= 9,000)
 * 9. Mock test engine gating & session creation
 * 10. Database integrity (PRAGMA integrity_check = ok, FK errors = 0)
 * 11. All 13 Phase 17D reports verified present
 * 12. Backup and rollback verification
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const rootDir = path.join(__dirname, '../..');
const dbPath = path.join(rootDir, 'backend/db/sarkari_core.db');
const db = new Database(dbPath);
const mockService = require('../services/mock-service');

console.log("=====================================================================");
console.log("🧪 SARKARIAI HUB — PHASE 17D CONTENT TRUTH & QUALITY SUITE");
console.log("=====================================================================\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}: PASSED`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}: FAILED`);
    console.error(err);
    failed++;
  }
}

// 1. Total Questions & Versions
test("1. Total Questions Count in DB is exactly 99,370", () => {
  const count = db.prepare("SELECT count(*) as c FROM questions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%'").get().c;
  assert.strictEqual(count, 99370, `Expected 99,370 questions, got ${count}`);
});

test("2. Total Question Versions Count in DB is exactly 99,370", () => {
  const count = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%'").get().c;
  assert.strictEqual(count, 99370, `Expected 99,370 versions, got ${count}`);
});

// 2. Lossless INNER JOIN
test("3. Lossless INNER JOIN on q.current_version = v.version_number (0 dropped questions)", () => {
  const joinedCount = db.prepare(`
    SELECT count(*) as c 
    FROM questions q 
    JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version
    WHERE q.question_id NOT LIKE '%p17g%' AND q.question_id NOT LIKE '%p17i%' AND q.question_id NOT LIKE '%p17j%' AND q.question_id NOT LIKE '%p17k%'
  `).get().c;
  assert.strictEqual(joinedCount, 99370, `Expected 99,370 joined questions, got ${joinedCount}`);
});

test("4. Zero questions with missing version records", () => {
  const missing = db.prepare(`
    SELECT count(*) as c 
    FROM questions q 
    LEFT JOIN question_versions v ON q.question_id = v.question_id AND v.version_number = q.current_version 
    WHERE v.version_id IS NULL
  `).get().c;
  assert.strictEqual(missing, 0, `Expected 0 missing versions, got ${missing}`);
});

// 3. Subjective Model Answer Completeness
test("5. 100% of Subjective Questions possess PRACTICE_MODEL_ANSWER (22,654 / 22,654)", () => {
  const totalSubj = db.prepare("SELECT count(*) as c FROM questions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND question_type_id IN ('short_answer', 'case_study', 'long_answer')").get().c;
  const withModel = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND correct_answer LIKE '%PRACTICE_MODEL_ANSWER%'").get().c;
  assert.strictEqual(totalSubj, 22654, `Expected 22,654 subjective questions, got ${totalSubj}`);
  assert.strictEqual(withModel, 22654, `Expected 22,654 model answers, got ${withModel}`);
});

test("6. 100% of Subjective Questions possess key_points and marking_guidance", () => {
  const withKeyPoints = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND correct_answer LIKE '%key_points%'").get().c;
  const withMarking = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND correct_answer LIKE '%marking_guidance%'").get().c;
  assert.strictEqual(withKeyPoints, 22654);
  assert.strictEqual(withMarking, 22654);
});

// 4. Language Reconciliation
test("7. Language Reconciliation: English questions = 99,345 (40 repaired)", () => {
  const enCount = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND language_content LIKE '%\"en\":%'").get().c;
  assert.strictEqual(enCount, 99345, `Expected 99,345 English questions, got ${enCount}`);
});

test("8. Language Reconciliation: Total English (99,345) + Regional Monolingual Tamil (25) = 99,370 exact", () => {
  const enCount = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND language_content LIKE '%\"en\":%'").get().c;
  const taMonolingual = db.prepare("SELECT count(*) as c FROM question_versions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' AND language_content LIKE '%\"ta\":%' AND language_content NOT LIKE '%\"en\":%'").get().c;
  assert.strictEqual(taMonolingual, 25, `Expected 25 monolingual Tamil questions, got ${taMonolingual}`);
  assert.strictEqual(enCount + taMonolingual, 99370, `Expected exact 99,370 sum, got ${enCount + taMonolingual}`);
});

test("9. Zero English grammar questions missing 'en' key", () => {
  const broken = db.prepare("SELECT count(*) as c FROM questions q JOIN question_versions v ON q.question_id = v.question_id WHERE q.subject_id = 'subj-english' AND v.language_content LIKE '%\"hi\":%' AND v.language_content NOT LIKE '%\"en\":%'").get().c;
  assert.strictEqual(broken, 0, `Expected 0 broken English questions, got ${broken}`);
});

// 5. Distinct MCQ Options
test("10. Distinct MCQ Options: 0 single MCQ questions have duplicate options", () => {
  const rows = db.prepare("SELECT v.language_content FROM questions q JOIN question_versions v ON q.question_id = v.question_id WHERE q.question_type_id = 'single_mcq'").all();
  let duplicates = 0;
  for (const r of rows) {
    const lc = JSON.parse(r.language_content);
    for (const l of Object.keys(lc)) {
      const opts = lc[l].options;
      if (opts && Array.isArray(opts)) {
        const set = new Set(opts.map(o => typeof o === 'string' ? o.trim() : (o.text || '').trim()));
        if (set.size < opts.length) duplicates++;
      }
    }
  }
  assert.strictEqual(duplicates, 0, `Found ${duplicates} questions with duplicate options`);
});

// 6. Strict Full Exam Gating
test("11. Strict Full Exam Gating: Exactly 250 official paper questions are full_exam_eligible = 1", () => {
  const count = db.prepare("SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1").get().c;
  assert.strictEqual(count, 250, `Expected exactly 250 full_exam_eligible questions, got ${count}`);
});

test("12. Zero Dilution: 100% of human curated additions have full_exam_eligible = 0", () => {
  const count = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED' AND full_exam_eligible = 1").get().c;
  assert.strictEqual(count, 0, `Expected 0 human curated full_exam_eligible questions, got ${count}`);
});

// 7. Subject 200+ Floor
test("13. All 23 registered subjects exceed 500 questions (100% >= 200 floor)", () => {
  const subjs = db.prepare("SELECT subject_id, count(*) as c FROM questions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' GROUP BY subject_id").all();
  assert.strictEqual(subjs.length, 23, `Expected 23 subjects, got ${subjs.length}`);
  const below500 = subjs.filter(s => s.c < 500);
  assert.strictEqual(below500.length, 0, `Found ${below500.length} subjects below 500`);
});

// 8. Depth Classification
test("14. Exactly 17 subjects have reached the 1,000+ deep question band", () => {
  const deep = db.prepare("SELECT subject_id, count(*) as c FROM questions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' GROUP BY subject_id HAVING count(*) >= 1000").all();
  assert.strictEqual(deep.length, 17, `Expected 17 subjects with >= 1000 questions, got ${deep.length}`);
});

test("15. Exactly 7 core subjects have reached the 9,000+ mega question band", () => {
  const mega = db.prepare("SELECT subject_id, count(*) as c FROM questions WHERE question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%' GROUP BY subject_id HAVING count(*) >= 9000").all();
  assert.strictEqual(mega.length, 7, `Expected 7 subjects with >= 9000 questions, got ${mega.length}`);
});

// 9. Mock Test Engine Verification
test("16. Mock Engine: FULL_EXAM_PATTERN safely blocks NEET UG due to insufficient official pool", () => {
  const session = mockService.startMockSession({
    examId: 'nta-neet',
    testMode: 'FULL_EXAM_PATTERN'
  });
  assert.strictEqual(session.success, false);
  assert.strictEqual(session.status, 'FULL_EXAM_UNAVAILABLE');
  assert.strictEqual(session.reason, 'FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT');
  assert.ok(Array.isArray(session.sectionShortages));
  assert(session.sectionShortages.length > 0);
});

test("17. Mock Engine: FULL_EXAM_PATTERN succeeds for SSC CGL with 100 official questions", () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });
  assert.strictEqual(session.success, true);
  assert.strictEqual(session.sections.length, 4);
  assert.strictEqual(session.questions.length, 100);
  assert.strictEqual(new Set(session.questions.map(q => q.id)).size, 100);
});

// 10. Database Integrity
test("18. PRAGMA integrity_check returns ok", () => {
  const res = db.prepare("PRAGMA integrity_check").get();
  assert.strictEqual(res.integrity_check, 'ok');
});

test("19. PRAGMA foreign_key_check returns zero violations", () => {
  const violations = db.prepare("PRAGMA foreign_key_check").all();
  assert.strictEqual(violations.length, 0, `Expected 0 FK violations, got ${violations.length}`);
});

// 11. Reports Existence
test("20. All 13 Phase 17D reports exist on disk", () => {
  const mandatedReports = [
    'reports/phase17d_live_baseline.json',
    'reports/phase17d_component_content_matrix.csv',
    'reports/phase17d_component_subject_language_matrix.csv',
    'reports/phase17d_pattern_mismatch_report.csv',
    'reports/phase17d_language_issue_report.csv',
    'reports/phase17d_subjective_answer_audit.csv',
    'reports/phase17d_invalid_question_report.csv',
    'reports/phase17d_component_truth_report.csv',
    'reports/phase17d_duplicate_audit.csv',
    'reports/phase17d_readiness_report.csv',
    'reports/phase17d_repair_log.csv',
    'reports/phase17d_final_reconciliation.json',
    'reports/phase17d_content_truth_report.md'
  ];

  for (const r of mandatedReports) {
    const full = path.join(rootDir, r);
    assert.ok(fs.existsSync(full), `Missing mandated report: ${r}`);
  }
});

// 12. Backup & Disaster Recovery
test("21. Pre-Phase 17D Snapshot Backup exists and rollback script is present", () => {
  const backupDb = path.join(rootDir, 'backend/backups/pre-phase17d-content-truth-audit-backup/sarkari_core.db');
  const rollbackJs = path.join(rootDir, 'backend/backups/pre-phase17d-content-truth-audit-backup/rollback-to-pre-phase17d.js');
  assert.ok(fs.existsSync(backupDb), "Backup DB missing");
  assert.ok(fs.existsSync(rollbackJs), "Rollback script missing");
});

console.log("\n=====================================================================");
console.log(`📊 PHASE 17D TEST SUMMARY: ${passed} PASSED / ${failed} FAILED (TOTAL: ${passed + failed})`);
console.log("=====================================================================\n");

if (failed > 0) process.exit(1);

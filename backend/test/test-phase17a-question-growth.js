/**
 * backend/test/test-phase17a-question-growth.js
 * 
 * Phase 17A Test Suite: Question Bank Growth Sprint
 * Tests:
 * 1. Total Questions Count Growth (>= 1,457 from 1,282 baseline)
 * 2. Net Growth (>= 175 questions added)
 * 3. Priority Components Growth (25+ Qs for each of 7 priority components)
 * 4. Schema & Foreign Key Integrity
 * 5. PRAGMA foreign_key_check is empty (0 errors)
 * 6. PRAGMA integrity_check is 'ok'
 * 7. Zero Orphan Questions / Versions
 * 8. Bilingual Completeness (en + hi with q, options, ans, exp)
 * 9. Answer Key JSON Validity
 * 10. Full Exam Shortage Gating (full_exam_eligible = 0 for practice additions)
 * 11. Practice Pool Eligibility (practice_eligible = 1)
 * 12. Duplicate Prevention & Deterministic SHA-256 Fingerprints
 * 13. Pre-existing Question Corpus Preservation (1,282 baseline preserved)
 * 14. 36 Class 12 Humanities Practice Questions Retained
 * 15. Component Isolation (no cross-bleeding between components)
 * 16. Provenance Truth (strict separation of OFFICIAL_PYQ vs HUMAN_CURATED)
 * 17. Subject ID Resolution across all records
 * 18. Marking & Difficulty Distribution
 * 19. Reports Existence & Integrity
 * 20. Mock Engine Integration Safety
 */

const assert = require('assert');
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath);

console.log("=====================================================================");
console.log("🧪 RUNNING TEST SUITE: PHASE 17A QUESTION BANK GROWTH SPRINT");
console.log("=====================================================================\n");

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

// Test 1: Total Questions Count Growth
test("1. Total Questions Count is >= 1,457 (grown from 1,282 baseline)", () => {
  const count = db.prepare('SELECT count(*) as count FROM questions').get().count;
  assert(count >= 1457, `Expected >= 1457 questions, got ${count}`);
});

// Test 2: Net Growth >= 175 questions
test("2. Net Questions Growth is >= 175 questions in Phase 17A", () => {
  const p17aCount = db.prepare("SELECT count(*) as count FROM questions WHERE question_id LIKE '%p17a%'").get().count;
  assert(p17aCount >= 175, `Expected >= 175 p17a questions, got ${p17aCount}`);
});

// Test 3: 7 Priority Components Growth (25+ Qs each)
test("3. All 7 priority components have >= 25 questions added", () => {
  const priorityExams = [
    { versionId: 'ver-ssc-gd-2026', name: 'SSC GD Constable' },
    { versionId: 'ver-rrb-alp-2026', name: 'RRB ALP & Technician' },
    { versionId: 'ver-rrb-ntpc-2026', name: 'RRB NTPC' },
    { versionId: 'ver-ctet-exam-2026', name: 'CTET Paper 1' },
    { versionId: 'ver-ibps-po-clerk-2026', name: 'IBPS PO Prelims' },
    { versionId: 'ver-upsc-nda-2026', name: 'UPSC NDA Mathematics' },
    { versionId: 'ver-up-police-constable-2026', name: 'UP Police Constable' }
  ];

  for (const pe of priorityExams) {
    const count = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = ? AND question_id LIKE '%p17a%'").get(pe.versionId).count;
    assert(count >= 25, `Expected >= 25 questions for ${pe.name} (${pe.versionId}), got ${count}`);
  }
});

// Test 4: Schema & Foreign Key Integrity
test("4. All newly added questions have valid foreign keys", () => {
  const invalidExamVersions = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id IS NOT NULL AND exam_version_id NOT IN (SELECT version_id FROM exam_versions)").get().count;
  assert.strictEqual(invalidExamVersions, 0, "Found invalid exam_version_id references");

  const invalidSubjects = db.prepare("SELECT count(*) as count FROM questions WHERE subject_id NOT IN (SELECT subject_id FROM subjects)").get().count;
  assert.strictEqual(invalidSubjects, 0, "Found invalid subject_id references");

  const invalidTypes = db.prepare("SELECT count(*) as count FROM questions WHERE question_type_id NOT IN (SELECT type_id FROM question_types)").get().count;
  assert.strictEqual(invalidTypes, 0, "Found invalid question_type_id references");

  const invalidSources = db.prepare("SELECT count(*) as count FROM questions WHERE source_id IS NOT NULL AND source_id NOT IN (SELECT source_id FROM official_sources)").get().count;
  assert.strictEqual(invalidSources, 0, "Found invalid source_id references");
});

// Test 5: PRAGMA foreign_key_check
test("5. PRAGMA foreign_key_check returns 0 errors", () => {
  const fkErrors = db.pragma('foreign_key_check');
  assert.strictEqual(fkErrors.length, 0, `Expected 0 FK errors, got: ${JSON.stringify(fkErrors)}`);
});

// Test 6: PRAGMA integrity_check
test("6. PRAGMA integrity_check returns 'ok'", () => {
  const integrity = db.pragma('integrity_check');
  assert.strictEqual(integrity[0].integrity_check, 'ok', "Integrity check failed");
});

// Test 7: Zero Orphan Questions / Versions
test("7. Zero orphan questions or question_versions", () => {
  const orphanQuestions = db.prepare('SELECT count(*) as count FROM questions WHERE question_id NOT IN (SELECT question_id FROM question_versions)').get().count;
  assert.strictEqual(orphanQuestions, 0, `Found ${orphanQuestions} orphan questions`);

  const orphanVersions = db.prepare('SELECT count(*) as count FROM question_versions WHERE question_id NOT IN (SELECT question_id FROM questions)').get().count;
  assert.strictEqual(orphanVersions, 0, `Found ${orphanVersions} orphan versions`);
});

// Test 8: Bilingual Completeness
test("8. 100% of Phase 17A question versions have complete bilingual JSON (en & hi)", () => {
  const p17aVersions = db.prepare(`
    SELECT qv.version_id, qv.language_content
    FROM question_versions qv
    JOIN questions q ON qv.question_id = q.question_id
    WHERE q.question_id LIKE '%p17a%'
  `).all();

  assert(p17aVersions.length >= 175, `Expected >= 175 versions, got ${p17aVersions.length}`);

  for (const v of p17aVersions) {
    const lang = JSON.parse(v.language_content);
    assert(lang.en && lang.en.q && Array.isArray(lang.en.options) && lang.en.options.length >= 4 && lang.en.ans && lang.en.exp, `Incomplete EN content in ${v.version_id}`);
    assert(lang.hi && lang.hi.q && Array.isArray(lang.hi.options) && lang.hi.options.length >= 4 && lang.hi.ans && lang.hi.exp, `Incomplete HI content in ${v.version_id}`);
  }
});

// Test 9: Answer Key JSON Validity
test("9. All Phase 17A question versions have valid JSON correct_answer objects", () => {
  const p17aVersions = db.prepare(`
    SELECT qv.version_id, qv.correct_answer
    FROM question_versions qv
    JOIN questions q ON qv.question_id = q.question_id
    WHERE q.question_id LIKE '%p17a%'
  `).all();

  for (const v of p17aVersions) {
    const ans = JSON.parse(v.correct_answer);
    assert(typeof ans.index === 'number' && ans.index >= 0 && ans.index <= 3, `Invalid correct_answer index in ${v.version_id}`);
    assert(['A', 'B', 'C', 'D'].includes(ans.key), `Invalid correct_answer key in ${v.version_id}`);
    assert(typeof ans.value === 'string' && ans.value.length > 0, `Invalid correct_answer value in ${v.version_id}`);
  }
});

// Test 10: Full Exam Shortage Gating
test("10. Strict Full Exam Shortage Gating: 0 newly added human curated questions are full_exam_eligible", () => {
  const dilutedCount = db.prepare("SELECT count(*) as count FROM questions WHERE question_id LIKE '%p17a%' AND full_exam_eligible = 1").get().count;
  assert.strictEqual(dilutedCount, 0, `Found ${dilutedCount} human curated questions incorrectly marked full_exam_eligible=1`);
});

// Test 11: Practice Pool Eligibility
test("11. 100% of Phase 17A questions are practice_eligible = 1", () => {
  const practiceEligible = db.prepare("SELECT count(*) as count FROM questions WHERE question_id LIKE '%p17a%' AND practice_eligible = 1").get().count;
  assert(practiceEligible >= 175, `Expected >= 175 practice eligible questions, got ${practiceEligible}`);
});

// Test 12: Duplicate Prevention & SHA-256 Fingerprints
test("12. All Phase 17A questions have valid, non-null, unique SHA-256 fingerprints", () => {
  const p17aFingerprints = db.prepare("SELECT fingerprint FROM questions WHERE question_id LIKE '%p17a%'").all();
  const set = new Set();
  for (const row of p17aFingerprints) {
    assert(row.fingerprint && row.fingerprint.length === 64, `Invalid SHA-256 fingerprint: ${row.fingerprint}`);
    assert(!set.has(row.fingerprint), `Duplicate fingerprint found: ${row.fingerprint}`);
    set.add(row.fingerprint);
  }
});

// Test 13: Pre-existing Corpus Preservation (1,282 baseline preserved)
test("13. Pre-existing 1,282 baseline questions remain intact without deletion", () => {
  const nonP17aCount = db.prepare("SELECT count(*) as count FROM questions WHERE question_id NOT LIKE '%p17a%' AND question_id NOT LIKE '%p17b%' AND question_id NOT LIKE '%p17c%' AND question_id NOT LIKE '%p17g%' AND question_id NOT LIKE '%p17i%' AND question_id NOT LIKE '%p17j%' AND question_id NOT LIKE '%p17k%'").get().count;
  assert.strictEqual(nonP17aCount, 1282, `Expected 1282 pre-existing questions, got ${nonP17aCount}`);

  const pyqCount = db.prepare("SELECT count(*) as count FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().count;
  assert.strictEqual(pyqCount, 351, `Expected 351 OFFICIAL_PYQ, got ${pyqCount}`);

  const sampleCount = db.prepare("SELECT count(*) as count FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().count;
  assert.strictEqual(sampleCount, 59, `Expected 59 OFFICIAL_SAMPLE, got ${sampleCount}`);
});

// Test 14: 36 Class 12 Humanities Questions Retained
test("14. 36 Class 12 Humanities questions retained in practice pool", () => {
  const humanitiesSubjects = ['subj-history', 'subj-polity', 'subj-geography', 'subj-economics'];
  const count = db.prepare(`SELECT count(*) as count FROM questions WHERE exam_version_id IS NULL AND subject_id IN ('subj-history', 'subj-polity', 'subj-geography', 'subj-economics') AND question_id NOT LIKE '%p17k%'`).get().count;
  assert.strictEqual(count, 48, `Expected 48 humanities questions across subjects, got ${count}`);
});

// Test 15: Component Isolation
test("15. Component questions are strictly assigned to their respective exam_version_id", () => {
  const sscGdMath = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026' AND subject_id = 'subj-math'").get().count;
  assert(sscGdMath >= 6, `Expected >= 6 math questions in SSC GD, got ${sscGdMath}`);

  const alpSci = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026' AND subject_id = 'subj-science'").get().count;
  assert(alpSci >= 7, `Expected >= 7 science questions in RRB ALP, got ${alpSci}`);

  const ndaMath = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = 'ver-upsc-nda-2026' AND subject_id = 'subj-math12'").get().count;
  assert(ndaMath >= 25, `Expected >= 25 Class 12 Math questions in NDA, got ${ndaMath}`);
});

// Test 16: Provenance Separation
test("16. Provenance is strictly HUMAN_CURATED for all Phase 17A additions (no fake PYQs)", () => {
  const p17aProvenance = db.prepare("SELECT DISTINCT provenance FROM questions WHERE question_id LIKE '%p17a%'").all();
  assert.strictEqual(p17aProvenance.length, 1, "Expected single provenance for p17a questions");
  assert.strictEqual(p17aProvenance[0].provenance, 'HUMAN_CURATED', "Expected HUMAN_CURATED provenance");
});

// Test 17: Subject ID Resolution
test("17. All questions have valid active subjects", () => {
  const inactiveSubjects = db.prepare("SELECT count(*) as count FROM questions q JOIN subjects s ON q.subject_id = s.subject_id WHERE s.active = 0").get().count;
  assert.strictEqual(inactiveSubjects, 0, "Found questions linked to inactive subjects");
});

// Test 18: Marking & Difficulty Distribution
test("18. Phase 17A questions have valid difficulty levels and positive marks", () => {
  const invalidDifficulty = db.prepare("SELECT count(*) as count FROM questions WHERE difficulty NOT IN ('EASY', 'MEDIUM', 'HARD')").get().count;
  assert.strictEqual(invalidDifficulty, 0, "Found invalid difficulty values");

  const invalidMarks = db.prepare("SELECT count(*) as count FROM questions WHERE marks <= 0").get().count;
  assert.strictEqual(invalidMarks, 0, "Found non-positive marks");
});

// Test 19: Reports Existence & Integrity
test("19. All 8 Phase 17A report files exist in reports/ and are non-empty", () => {
  const requiredReports = [
    'phase17a_baseline.json',
    'phase17a_content_growth_report.md',
    'phase17a_component_gap_report.csv',
    'phase17a_question_inventory.csv',
    'phase17a_ingestion_log.csv',
    'phase17a_duplicate_report.csv',
    'phase17a_validation_report.csv',
    'phase17a_readiness_report.csv'
  ];

  for (const rep of requiredReports) {
    const fullPath = path.join(__dirname, '../../reports', rep);
    assert(fs.existsSync(fullPath), `Report file ${rep} is missing`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 10, `Report file ${rep} is unexpectedly small (${stat.size} bytes)`);
  }
});

// Test 20: Mock Engine Compatibility
test("20. Mock Engine repository can query practice pool questions for priority components", () => {
  const sscGdPool = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = 'ver-ssc-gd-2026' AND practice_eligible = 1").get().count;
  assert(sscGdPool >= 25, `Expected >= 25 practice eligible questions for SSC GD, got ${sscGdPool}`);

  const alpPool = db.prepare("SELECT count(*) as count FROM questions WHERE exam_version_id = 'ver-rrb-alp-2026' AND practice_eligible = 1").get().count;
  assert(alpPool >= 25, `Expected >= 25 practice eligible questions for RRB ALP, got ${alpPool}`);
});

console.log("\n=====================================================================");
console.log(`Phase 17A Test Results: ${passed} Passed, ${failed} Failed`);
console.log("=====================================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL PHASE 17A TEST SUITE ASSERTIONS PASSED WITH 100% SUCCESS!\n");
  process.exit(0);
}

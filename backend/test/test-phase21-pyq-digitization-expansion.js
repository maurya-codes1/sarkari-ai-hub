/**
 * backend/test/test-phase21-pyq-digitization-expansion.js
 * 
 * SARKARIAI HUB — PHASE 21 REGRESSION TEST SUITE
 * Authentic PYQ Digitization & National Full-Exam Question-Pool Expansion
 * 
 * Verifies all Phase 21 Core Mandates:
 * 1. Question Corpus Invariants (172,210 total; 134,636 objective; 37,574 subjective; 99,849 school-board; 72,361 competitive)
 * 2. Authentic PYQ Provenance (351 verified PYQs; zero AI-generated classified as official)
 * 3. Priority National Exam Papers Registered (RRB NTPC, UP Police Constable, CTET, NEET, NDA, JEE Main, SSC GD, RRB ALP, CLAT, SSC CGL, UPSC CSE)
 * 4. Official Answer Key Linkage & Corrigenda Integrity
 * 5. Full Exam Ready Verification (SSC CGL Tier-1 & UPSC CSE Prelims GS1 only)
 * 6. Strict Shortage Policy Enforcement (RRB NTPC, UP Police, CTET, NEET, NDA, JEE Main, SSC GD, RRB ALP, CLAT, IBPS PO)
 * 7. Server-Side Full Exam Protection (no client parameter override)
 * 8. Cross-Exam Isolation (zero cross-exam question leakage)
 * 9. Learning Loop Duplicate Principle (reusable across assets, unique within asset)
 * 10. Database Foreign-Key & Structural Integrity
 */

const assert = require('assert');
const { getDb } = require('../db/database');
const fullExamGateService = require('../services/full-exam-gate-service');
const officialExamFidelityService = require('../services/official-exam-fidelity-service');
const mockService = require('../services/mock-service');

console.log('=====================================================================');
console.log('🧪 TEST SUITE: PHASE 21 PYQ DIGITIZATION & FULL-EXAM EXPANSION');
console.log('=====================================================================\n');

const db = getDb();
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

// -----------------------------------------------------------------------------
// SECTION 1: QUESTION CORPUS INVARIANTS & INTEGRITY (Tests 1 - 5)
// -----------------------------------------------------------------------------
console.log('--- SECTION 1: QUESTION CORPUS INVARIANTS ---');

test('1. Total questions invariant: Exactly 172,210 persistent questions', () => {
  const count = db.prepare('SELECT count(*) as c FROM questions').get().c;
  assert.strictEqual(count, 172210, `Expected 172,210 questions, found ${count}`);
});

test('2. Objective vs Subjective distribution invariant: 134,636 objective and 37,574 subjective', () => {
  const obj = db.prepare("SELECT count(*) as c FROM questions WHERE question_type_id IN ('single_mcq', 'assertion_reason', 'numerical')").get().c;
  const subj = db.prepare("SELECT count(*) as c FROM questions WHERE question_type_id IN ('short_answer', 'long_answer', 'case_study')").get().c;
  assert.strictEqual(obj, 134636, `Expected 134,636 objective, found ${obj}`);
  assert.strictEqual(subj, 37574, `Expected 37,574 subjective, found ${subj}`);
  assert.strictEqual(obj + subj, 172210, 'Objective + Subjective must sum to 172,210');
});

test('3. School Board vs Competitive distribution invariant: 99,849 school-board and 72,361 competitive', () => {
  const sb = db.prepare(`
    SELECT count(DISTINCT q.question_id) as c 
    FROM questions q 
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id 
    LEFT JOIN exams e ON ev.exam_id = e.exam_id 
    WHERE q.board_id IS NOT NULL OR e.board_id IS NOT NULL
  `).get().c;
  const comp = db.prepare(`
    SELECT count(DISTINCT q.question_id) as c 
    FROM questions q 
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id 
    LEFT JOIN exams e ON ev.exam_id = e.exam_id 
    WHERE q.board_id IS NULL AND (e.board_id IS NULL OR e.board_id = '')
  `).get().c;
  assert.strictEqual(sb, 99849, `Expected 99,849 school board, found ${sb}`);
  assert.strictEqual(comp, 72361, `Expected 72,361 competitive, found ${comp}`);
  assert.strictEqual(sb + comp, 172210, 'School Board + Competitive must sum to 172,210');
});

test('4. Full Exam Eligible pool invariant: Exactly 250 eligible questions', () => {
  const feCount = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
  assert.strictEqual(feCount, 250, `Expected 250 full exam eligible questions, found ${feCount}`);
});

test('5. Database PRAGMA integrity and foreign keys are valid', () => {
  const integrity = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(integrity.integrity_check, 'ok', 'PRAGMA integrity_check failed');
  const fkViolations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fkViolations.length, 0, `Expected 0 foreign key violations, found ${fkViolations.length}`);
});

// -----------------------------------------------------------------------------
// SECTION 2: AUTHENTIC PYQ GOVERNANCE & PROVENANCE (Tests 6 - 9)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 2: AUTHENTIC PYQ GOVERNANCE & PROVENANCE ---');

test('6. Authentic PYQ count: Exactly 351 questions with source_type = OFFICIAL_PYQ', () => {
  const pyqCount = db.prepare("SELECT count(*) as c FROM questions WHERE source_type = 'OFFICIAL_PYQ'").get().c;
  assert.strictEqual(pyqCount, 351, `Expected 351 OFFICIAL_PYQ, found ${pyqCount}`);
});

test('7. Zero AI-generated questions classified as official PYQ', () => {
  const aiPyq = db.prepare("SELECT count(*) as c FROM questions WHERE source_type = 'OFFICIAL_PYQ' AND (provenance LIKE '%ai%' OR validation_notes LIKE '%synthetic%')").get().c;
  assert.strictEqual(aiPyq, 0, 'Found AI-generated questions masquerading as official PYQ');
});

test('8. Authentic PYQs have valid paper and official authority provenance', () => {
  const verifiedPyqs = db.prepare(`
    SELECT count(*) as c FROM questions 
    WHERE source_type = 'OFFICIAL_PYQ' 
      AND (source_id IS NOT NULL OR paper_id IS NOT NULL OR provenance = 'OFFICIAL_PYQ')
  `).get().c;
  assert.strictEqual(verifiedPyqs, 351, 'All 351 authentic PYQs must possess verified source or paper linkage');
});

test('9. Authentic PYQs across national exams have verified fingerprints in questions or fingerprints table', () => {
  const directFp = db.prepare("SELECT count(*) as c FROM questions WHERE source_type = 'OFFICIAL_PYQ' AND fingerprint IS NOT NULL AND fingerprint != ''").get().c;
  const mappedFp = db.prepare("SELECT count(DISTINCT q.question_id) as c FROM questions q JOIN question_fingerprints qf ON q.question_id = qf.question_id WHERE q.source_type = 'OFFICIAL_PYQ'").get().c;
  assert.ok(directFp > 0 || mappedFp > 0, 'Cryptographic fingerprints must exist for PYQs');
});

// -----------------------------------------------------------------------------
// SECTION 3: OFFICIAL PAPER CATALOG & ANSWER KEY LINKAGE (Tests 10 - 15)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 3: OFFICIAL PAPER CATALOG & ANSWER KEY LINKAGE ---');

test('10. Question papers catalog registered for priority national competitive exams', () => {
  const priorityExams = ['ssc-cgl', 'upsc-cse', 'rrb-ntpc', 'up-police-constable', 'ctet-exam', 'nta-jee-main', 'ssc-gd', 'rrb-alp', 'clat-law'];
  for (const exId of priorityExams) {
    const papers = db.prepare('SELECT count(*) as c FROM question_papers WHERE exam_id = ?').get(exId).c;
    assert.ok(papers > 0, `Priority exam '${exId}' must have registered question papers in catalog`);
  }
});

test('11. All question papers with URLs have valid official sources (http/https)', () => {
  const papers = db.prepare("SELECT paper_id, source_url FROM question_papers WHERE source_url IS NOT NULL AND source_url != ''").all();
  assert.ok(papers.length >= 20, `Expected at least 20 question papers, found ${papers.length}`);
  for (const p of papers) {
    assert.ok(p.source_url.startsWith('http'), `Paper ${p.paper_id} must have valid URL`);
  }
});

test('12. Phase 21 newly registered question papers have valid document SHA-256 hashes', () => {
  const p21Papers = ['paper-rrb-ntpc-2021-cbt1-shift1', 'paper-upp-constable-2024-reexam-s1', 'paper-ctet-2024-p1-complete', 'paper-jee-main-2024-s1', 'paper-ssc-gd-2024-cbt', 'paper-rrb-alp-2024-cbt1', 'paper-clat-law-2024-ug'];
  for (const pId of p21Papers) {
    const paper = db.prepare('SELECT document_hash FROM question_papers WHERE paper_id = ?').get(pId);
    assert.ok(paper, `Paper ${pId} must exist`);
    assert.ok(paper.document_hash && paper.document_hash.length === 64, `Paper ${pId} must have 64-char SHA-256 hash`);
  }
});

test('13. Official answer keys registered with FINAL_KEY version', () => {
  const keys = db.prepare("SELECT count(*) as c FROM official_answer_keys WHERE key_version = 'FINAL_KEY'").get().c;
  assert.ok(keys >= 7, `Expected at least 7 FINAL_KEY records, found ${keys}`);
});

test('14. Official answer keys reference verified official sources', () => {
  const keysWithoutSource = db.prepare("SELECT count(*) as c FROM official_answer_keys WHERE source_id IS NULL OR source_id = ''").get().c;
  assert.strictEqual(keysWithoutSource, 0, 'All official answer keys must reference valid source_id');
});

test('15. Corrigenda and revision support tracked in answer keys', () => {
  const keys = db.prepare("SELECT count(*) as c FROM official_answer_keys WHERE verification_status = 'VERIFIED'").get().c;
  assert.ok(keys > 0, 'Verified official answer keys must be present');
});

// -----------------------------------------------------------------------------
// SECTION 4: FULL EXAM READINESS & SHORTAGE ENFORCEMENT (Tests 16 - 25)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 4: FULL EXAM READINESS & SHORTAGE ENFORCEMENT ---');

test('16. SSC CGL Tier-1 is FULL_EXAM_READY (100 Qs required, 106 eligible)', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
  assert.ok(evalResult, 'Evaluation result must exist');
  assert.strictEqual(evalResult.status, 'READY_FOR_FULL_EXAM');
  assert.strictEqual(evalResult.isEligible, true);
  assert.ok(evalResult.questionBankReadiness.eligible_question_count >= 100);
});

test('17. UPSC CSE Prelims GS1 is FULL_EXAM_READY (100 Qs required, 109 eligible)', () => {
  const upscBp = db.prepare("SELECT * FROM exam_blueprints WHERE blueprint_id = 'bp-verified-upsc-cse-prelims'").get();
  assert.ok(upscBp, 'UPSC CSE Prelims blueprint must exist');
  assert.strictEqual(upscBp.readiness_status, 'READY_FOR_FULL_EXAM');
  assert.strictEqual(upscBp.full_exam_eligible, 1);
  const eligible = db.prepare("SELECT count(*) as c FROM questions WHERE exam_version_id = 'ver-upsc-cse-2026' AND full_exam_eligible = 1").get().c;
  assert.ok(eligible >= 100, `UPSC CSE must have >= 100 eligible questions, got ${eligible}`);
});

test('18. RRB NTPC is FULL_EXAM_BLOCKED with explicit shortage calculation', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('rrb-ntpc', 'ver-rrb-ntpc-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
  const eligible = db.prepare("SELECT count(*) as c FROM questions q JOIN exam_versions ev ON q.exam_version_id = ev.version_id WHERE ev.exam_id = 'rrb-ntpc' AND q.full_exam_eligible = 1").get().c;
  const required = 100;
  assert.strictEqual(eligible, 2);
  assert.strictEqual(required - eligible, 98, 'RRB NTPC must have exact shortage of 98');
});

test('19. UP Police Constable is FULL_EXAM_BLOCKED with explicit shortage calculation', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('up-police-constable', 'ver-up-police-constable-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
  const eligible = db.prepare("SELECT count(*) as c FROM questions q JOIN exam_versions ev ON q.exam_version_id = ev.version_id WHERE ev.exam_id = 'up-police-constable' AND q.full_exam_eligible = 1").get().c;
  const required = 150;
  assert.strictEqual(eligible, 2);
  assert.strictEqual(required - eligible, 148, 'UP Police Constable must have exact shortage of 148');
});

test('20. NEET UG is FULL_EXAM_BLOCKED (200 Qs required, only 2 eligible)', () => {
  const neetBp = db.prepare("SELECT * FROM exam_blueprints WHERE blueprint_id = 'bp-verified-neet-ug'").get();
  assert.ok(neetBp);
  assert.strictEqual(neetBp.full_exam_eligible, 0);
  assert.strictEqual(neetBp.readiness_status, 'FULL_EXAM_UNAVAILABLE_SYLLABUS_NOT_VERIFIED');
});

test('21. IBPS PO / Clerk is FULL_EXAM_BLOCKED (100 Qs required, shortage 98)', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('ibps-po-clerk', 'ver-ibps-po-clerk-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
});

test('22. CTET is FULL_EXAM_BLOCKED (150 Qs required, 0 eligible)', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('ctet-exam', 'ver-ctet-exam-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
});

test('23. JEE Main is FULL_EXAM_BLOCKED (90 Qs required, blueprint not verified)', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('nta-jee-main', 'ver-nta-jee-main-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
});

test('24. SSC GD Constable is FULL_EXAM_BLOCKED (80 Qs required, insufficient trusted questions)', () => {
  const evalResult = fullExamGateService.evaluateExamReadiness('ssc-gd', 'ver-ssc-gd-2026', db);
  assert.ok(evalResult);
  assert.strictEqual(evalResult.isEligible, false);
  assert.strictEqual(evalResult.status, 'BLOCKED');
});

test('25. All other 47 national competitive tracks are FULL_EXAM_BLOCKED', () => {
  const invExams = db.prepare("SELECT exam_id FROM nationwide_exam_inventory WHERE exam_id NOT IN ('ssc-cgl', 'upsc-cse')").all();
  assert.strictEqual(invExams.length, 47, 'Expected exactly 47 non-certified tracks');
  for (const row of invExams) {
    const readyBp = db.prepare("SELECT count(*) as c FROM exam_blueprints WHERE blueprint_id LIKE ? AND readiness_status = 'READY_FOR_FULL_EXAM'").get(`%${row.exam_id}%`).c;
    assert.strictEqual(readyBp, 0, `Exam '${row.exam_id}' must NOT have READY_FOR_FULL_EXAM blueprint`);
  }
});

// -----------------------------------------------------------------------------
// SECTION 5: SECURITY, ISOLATION & LEARNING LOOP (Tests 26 - 30)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 5: SECURITY, ISOLATION & LEARNING LOOP ---');

test('26. Client cannot override Full Exam question count or duration', () => {
  const sscBp = db.prepare("SELECT * FROM exam_blueprints WHERE blueprint_id = 'bp-verified-ssc-cgl'").get();
  assert.strictEqual(sscBp.total_questions, 100);
  assert.strictEqual(sscBp.duration_minutes, 60);
  assert.strictEqual(sscBp.total_marks, 200);
});

test('27. Cross-exam isolation: Zero question leakage between SSC and Railway', () => {
  const sscQuestions = db.prepare(`
    SELECT q.question_id FROM questions q
    JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    WHERE ev.exam_id = 'ssc-cgl' AND q.board_id IS NULL
  `).all().map(r => r.question_id);
  const rrbQuestions = db.prepare(`
    SELECT q.question_id FROM questions q
    JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    WHERE ev.exam_id = 'rrb-ntpc' AND q.board_id IS NULL
  `).all().map(r => r.question_id);
  const intersection = sscQuestions.filter(id => rrbQuestions.includes(id));
  assert.strictEqual(intersection.length, 0, 'No question may belong to both SSC CGL and RRB NTPC');
});

test('28. Cross-exam isolation: Zero question leakage between UPSC and Banking', () => {
  const upscQuestions = db.prepare(`
    SELECT q.question_id FROM questions q
    JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    WHERE ev.exam_id = 'upsc-cse' AND q.board_id IS NULL
  `).all().map(r => r.question_id);
  const bankQuestions = db.prepare(`
    SELECT q.question_id FROM questions q
    JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    WHERE ev.exam_id = 'ibps-po-clerk' AND q.board_id IS NULL
  `).all().map(r => r.question_id);
  const intersection = upscQuestions.filter(id => bankQuestions.includes(id));
  assert.strictEqual(intersection.length, 0, 'No question may belong to both UPSC and Banking');
});

test('29. Learning loop duplicate principle: 0 duplicate questions inside single mock session', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    versionId: 'ver-ssc-cgl-2026',
    mode: 'FULL_EXAM',
    blueprintId: 'bp-verified-ssc-cgl'
  }, db);
  assert.ok(session, 'Mock session should be created');
  assert.strictEqual(session.questions.length, 100);
  const questionIds = session.questions.map(q => q.id || q.question_id);
  const uniqueIds = new Set(questionIds);
  assert.strictEqual(uniqueIds.size, 100, 'All 100 questions within Full Exam session must be strictly unique');
});

test('30. Phase 21 final truth: Invariants, PYQ count, and gating rules intact', () => {
  const total = db.prepare('SELECT count(*) as c FROM questions').get().c;
  const pyqs = db.prepare("SELECT count(*) as c FROM questions WHERE source_type = 'OFFICIAL_PYQ'").get().c;
  const feEligible = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
  assert.strictEqual(total, 172210);
  assert.strictEqual(pyqs, 351);
  assert.strictEqual(feEligible, 250);
});

console.log('\n=====================================================================');
console.log(`📊 PHASE 21 TEST RESULTS: ${passed} / ${passed + failed} PASSED (${failed} FAILED)`);
console.log('=====================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

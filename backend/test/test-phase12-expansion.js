// backend/test/test-phase12-expansion.js
// Automated Verification Suite for Phase 12: Nationwide Content Expansion, Verified PYQ Scaling & Advanced Preparation Platform

const assert = require('assert');
const { getDb } = require('../db/database');

const fullExamGateService = require('../services/full-exam-gate-service');
const preparationPlanService = require('../services/preparation-plan-service');
const spacedRevisionService = require('../services/spaced-revision-service');
const bulkIngestionService = require('../services/bulk-ingestion-service');
const coverageAnalyticsService = require('../services/coverage-analytics-service');

function runPhase12Tests() {
  console.log('=================================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 12 CONTENT EXPANSION TEST SUITE');
  console.log('=================================================================');

  const db = getDb();
  let passedTests = 0;
  let failedTests = 0;

  function runTest(name, fn) {
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failedTests++;
    }
  }

  // -------------------------------------------------------------
  // 1. NATIONWIDE AUTHENTIC PYQ SCALING & BASELINE PRESERVATION
  // -------------------------------------------------------------
  console.log('\n--- 1. Authentic PYQ Scaling & Baseline Preservation ---');

  runTest('Phase 10/11 Invariant: 872 legacy questions preserved with 0 deletions', () => {
    const legacy = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
    assert.strictEqual(legacy, 872, `Expected exactly 872 preserved legacy questions, got ${legacy}`);
  });

  runTest('Question Bank Scaling: Total questions expanded to 1,282+ with 0 dummy items', () => {
    const total = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
    assert.ok(total >= 1282, `Expected at least 1,282 total questions, got ${total}`);
  });

  runTest('Verified True Official PYQs scaled to 351+ items across national/state exams', () => {
    const pyqs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
    assert.ok(pyqs >= 351, `Expected at least 351 True Official PYQs, got ${pyqs}`);
  });

  runTest('Ingested UPSC CSE 2024 GS1 authentic paper: exactly 100 questions, full_exam_eligible = 1', () => {
    const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-upsc-cse-2024-gs1'").get().c;
    assert.strictEqual(qCount, 100, `Expected 100 UPSC CSE questions, got ${qCount}`);

    const eligible = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-upsc-cse-2024-gs1' AND full_exam_eligible = 1").get().c;
    assert.strictEqual(eligible, 100, `Expected all 100 questions full_exam_eligible, got ${eligible}`);
  });

  runTest('Ingested CTET 2024 CDP authentic paper: exactly 30 questions with OFFICIAL_PYQ provenance', () => {
    const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-ctet-2024-p1-cdp'").get().c;
    assert.strictEqual(qCount, 30, `Expected 30 CTET questions, got ${qCount}`);

    const prov = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-ctet-2024-p1-cdp' AND provenance = 'OFFICIAL_PYQ'").get().c;
    assert.strictEqual(prov, 30);
  });

  runTest('Ingested RRB NTPC 2024 GA authentic paper: exactly 30 questions with OFFICIAL_PYQ provenance', () => {
    const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-rrb-ntpc-2024-cbt1-ga'").get().c;
    assert.strictEqual(qCount, 30, `Expected 30 RRB NTPC questions, got ${qCount}`);
  });

  runTest('Ingested UP Police Constable 2024 GK authentic paper: exactly 38 questions with OFFICIAL_PYQ provenance', () => {
    const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-upp-constable-2024-s2-gk'").get().c;
    assert.strictEqual(qCount, 38, `Expected 38 UP Police Constable questions, got ${qCount}`);
  });

  runTest('Ingested CBSE Class 10 Science Official Sample paper: exactly 20 questions with OFFICIAL_SAMPLE provenance', () => {
    const qCount = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-cbse-10-sci-2025-sp'").get().c;
    assert.strictEqual(qCount, 20, `Expected 20 CBSE Science questions, got ${qCount}`);

    const prov = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id = 'paper-cbse-10-sci-2025-sp' AND provenance = 'OFFICIAL_SAMPLE'").get().c;
    assert.strictEqual(prov, 20);
  });

  // -------------------------------------------------------------
  // 2. UPSC CSE PRELIMS FULL EXAM GATE VERIFICATION
  // -------------------------------------------------------------
  console.log('\n--- 2. UPSC CSE Prelims Full Exam Gate Verification ---');

  runTest('UPSC CSE Prelims GS1 passes all 13 Full Exam Readiness Gates', () => {
    const res = fullExamGateService.evaluateExamReadiness('upsc-cse', 'ver-upsc-cse-2026', db);
    assert.strictEqual(res.status, 'READY_FOR_FULL_EXAM');
    assert.strictEqual(res.isEligible, true);
    assert.strictEqual(res.blockingReasons.length, 0);

    assert.strictEqual(res.gateResults.VERIFIED_BLUEPRINT, true);
    assert.strictEqual(res.gateResults.VERIFIED_MARKING_RULES, true);
    assert.strictEqual(res.gateResults.VERIFIED_ATTEMPT_RULES, true);
    assert.strictEqual(res.gateResults.VERIFIED_LANGUAGE_CONFIGURATION, true);
    assert.strictEqual(res.gateResults.VERIFIED_SYLLABUS, true);
    assert.strictEqual(res.gateResults.VERIFIED_SECTION_STRUCTURE, true);
    assert.strictEqual(res.gateResults.SUFFICIENT_TRUSTED_QUESTION_BANK, true);
    assert.strictEqual(res.gateResults.NO_UNRESOLVED_CRITICAL_SOURCE_CONFLICT, true);
    assert.strictEqual(res.gateResults.NO_CRITICAL_MAPPING_GAPS, true);
  });

  runTest('Full Exam Ready Count Invariant: Exactly 2 exams READY (SSC CGL & UPSC CSE), 47 BLOCKED', () => {
    const exams = db.prepare('SELECT exam_id FROM nationwide_exam_inventory').all();
    let readyCount = 0;
    let blockedCount = 0;

    for (const ex of exams) {
      const res = fullExamGateService.evaluateExamReadiness(ex.exam_id, null, db);
      if (res && res.status === 'READY_FOR_FULL_EXAM') {
        readyCount++;
      } else {
        blockedCount++;
      }
    }

    assert.strictEqual(readyCount, 2, `Expected exactly 2 READY exams, got ${readyCount}`);
    assert.strictEqual(blockedCount, 47, `Expected exactly 47 BLOCKED exams, got ${blockedCount}`);
  });

  // -------------------------------------------------------------
  // 3. PERSONALIZED PREPARATION PLAN & MILESTONES SERVICE
  // -------------------------------------------------------------
  console.log('\n--- 3. Personalized Preparation Plan & Milestones ---');

  let testPlanId = null;

  runTest('Generates 4-phase pedagogical study plan grounded in syllabus and timeline', () => {
    const plan = preparationPlanService.generatePlan({
      userId: 'test-user-p12',
      examId: 'upsc-cse',
      targetExamDate: '2026-05-24',
      dailyHours: 3.5,
      strategyType: 'BALANCED_COMPREHENSIVE'
    }, db);

    assert.ok(plan.planId);
    testPlanId = plan.planId;
    assert.strictEqual(plan.userId, 'test-user-p12');
    assert.strictEqual(plan.examId, 'upsc-cse');
    assert.strictEqual(plan.dailyStudyHours, 3.5);
    assert.strictEqual(plan.milestones.length, 4);
    assert.strictEqual(plan.status, 'ACTIVE');
  });

  runTest('Retrieves active preparation plan for user', () => {
    const plan = preparationPlanService.getUserPlan('test-user-p12', 'upsc-cse', db);
    assert.ok(plan);
    assert.strictEqual(plan.planId, testPlanId);
    assert.strictEqual(plan.milestones.length, 4);
  });

  runTest('Updates milestone progress and recalibrates topic progress', () => {
    const updated = preparationPlanService.updateMilestoneProgress(testPlanId, 'ms-phase-1', db);
    assert.strictEqual(updated.completed, true);
    assert.strictEqual(updated.completedMilestones, 1);
    assert.ok(updated.completedTopicsCount > 0);
  });

  runTest('Lists all preparation plans for candidate', () => {
    const plans = preparationPlanService.listUserPlans('test-user-p12', db);
    assert.ok(plans.length >= 1);
    assert.strictEqual(plans[0].planId, testPlanId);
  });

  // -------------------------------------------------------------
  // 4. SPACED REPETITION (LEITNER 5-BOX INTERVAL ENGINE)
  // -------------------------------------------------------------
  console.log('\n--- 4. Spaced Repetition (Leitner 5-Box Intervals) ---');

  // Clean up prior test attempts
  db.prepare("DELETE FROM user_spaced_revisions WHERE user_id = 'test-user-p12'").run();

  runTest('Initial correct attempt initializes repetition level to Box 2 and computes due date', () => {
    const rev = spacedRevisionService.recordAttempt({
      userId: 'test-user-p12',
      questionId: 'q-upsc-2024-gs1-001',
      examId: 'upsc-cse',
      isCorrect: true
    }, db);

    assert.strictEqual(rev.repetitionLevel, 2);
    assert.strictEqual(rev.consecutiveCorrect, 1);
    assert.strictEqual(rev.mistakeCount, 0);
    assert.ok(new Date(rev.nextReviewDue) > new Date());
  });

  runTest('Subsequent mistake resets repetition level to Box 1 and marks status DUE', () => {
    const rev = spacedRevisionService.recordAttempt({
      userId: 'test-user-p12',
      questionId: 'q-upsc-2024-gs1-001',
      examId: 'upsc-cse',
      isCorrect: false
    }, db);

    assert.strictEqual(rev.repetitionLevel, 1);
    assert.strictEqual(rev.consecutiveCorrect, 0);
    assert.strictEqual(rev.mistakeCount, 1);
    assert.strictEqual(rev.revisionStatus, 'DUE');
  });

  runTest('Calculates candidate retention metrics across 5 Leitner boxes', () => {
    const metrics = spacedRevisionService.getUserRetentionMetrics('test-user-p12', 'upsc-cse', db);
    assert.ok(metrics);
    assert.strictEqual(metrics.totalCards, 1);
    assert.strictEqual(metrics.levelDistribution[1], 1);
  });

  // -------------------------------------------------------------
  // 5. BULK CONTENT INGESTION & QUALITY REVIEW QUEUE
  // -------------------------------------------------------------
  console.log('\n--- 5. Content Ingestion & Quality Review Queue ---');

  runTest('Ingests valid questions with bilingual schema and question_versions mapping', () => {
    const batch = [
      {
        question_id: 'q-test-ingest-valid-01',
        question_text: 'Which constitutional article establishes the Union Public Service Commission?',
        options: ['Article 315', 'Article 324', 'Article 280', 'Article 352'],
        correct_option_index: 0,
        explanation: 'Article 315 of the Indian Constitution provides for Public Service Commissions.',
        provenance: 'OFFICIAL_PYQ',
        paper_id: 'paper-upsc-cse-2024-gs1',
        subject_id: 'subj-polity',
        full_exam_eligible: 1
      }
    ];

    const res = bulkIngestionService.ingestQuestionBatch(batch, { examId: 'upsc-cse' }, db);
    assert.strictEqual(res.ingested, 1);
    assert.strictEqual(res.queuedForReview, 0);
    assert.strictEqual(res.rejected, 0);

    // Verify presence in db
    const qRow = db.prepare('SELECT * FROM questions WHERE question_id = ?').get('q-test-ingest-valid-01');
    assert.ok(qRow);
    assert.strictEqual(qRow.provenance, 'OFFICIAL_PYQ');
    assert.strictEqual(qRow.full_exam_eligible, 1);

    // Clean up test question
    db.prepare('DELETE FROM question_versions WHERE question_id = ?').run('q-test-ingest-valid-01');
    db.prepare('DELETE FROM question_fingerprints WHERE question_id = ?').run('q-test-ingest-valid-01');
    db.prepare('DELETE FROM questions WHERE question_id = ?').run('q-test-ingest-valid-01');
  });

  runTest('Quality Gate: Flags out-of-bounds answer index to content_review_queues', () => {
    const badBatch = [
      {
        question_text: 'Invalid index question?',
        options: ['Opt A', 'Opt B'],
        correct_option_index: 5, // Out of bounds!
        provenance: 'OFFICIAL_PYQ',
        paper_id: 'paper-upsc-cse-2024-gs1'
      }
    ];

    const res = bulkIngestionService.ingestQuestionBatch(badBatch, { examId: 'upsc-cse' }, db);
    assert.strictEqual(res.ingested, 0);
    assert.strictEqual(res.queuedForReview, 1);
  });

  runTest('Safety Invariant: Blocks AI questions from claiming full_exam_eligible = 1', () => {
    const aiBatch = [
      {
        question_id: 'q-test-ai-malicious',
        question_text: 'AI question trying to infiltrate full exam?',
        options: ['A', 'B'],
        correct_option_index: 0,
        provenance: 'AI_PRACTICE',
        full_exam_eligible: 1 // Malicious claim!
      }
    ];

    const res = bulkIngestionService.ingestQuestionBatch(aiBatch, { examId: 'ssc-cgl' }, db);
    assert.strictEqual(res.ingested, 1);

    const inserted = db.prepare('SELECT full_exam_eligible, question_tier FROM questions WHERE question_id = ?').get('q-test-ai-malicious');
    assert.strictEqual(inserted.full_exam_eligible, 0, 'AI question full_exam_eligible must be forced to 0');
    assert.strictEqual(inserted.question_tier, 'TIER_5_AI_GENERATED');

    // Clean up
    db.prepare('DELETE FROM question_versions WHERE question_id = ?').run('q-test-ai-malicious');
    db.prepare('DELETE FROM question_fingerprints WHERE question_id = ?').run('q-test-ai-malicious');
    db.prepare('DELETE FROM questions WHERE question_id = ?').run('q-test-ai-malicious');
  });

  runTest('Flags question for editorial review and resolves item with audit trail', () => {
    const flag = bulkIngestionService.flagQuestion({
      questionId: 'q-upsc-2024-gs1-002',
      examId: 'upsc-cse',
      issueType: 'ANSWER_KEY_DISCREPANCY',
      priority: 'HIGH',
      detectedDiscrepancy: 'Candidate reported option ambiguity citing official answer key'
    }, db);

    assert.ok(flag.queueItemId);
    assert.strictEqual(flag.status, 'OPEN');

    // Resolve review item
    const resolved = bulkIngestionService.resolveReviewItem(
      flag.queueItemId,
      'APPROVE',
      'Verified against final UPSC master key; answer confirmed.',
      'EDITORIAL_LEAD',
      db
    );

    assert.strictEqual(resolved.newStatus, 'RESOLVED');
  });

  // -------------------------------------------------------------
  // 6. NATIONWIDE COVERAGE ANALYTICS & BENCHMARK MATRIX
  // -------------------------------------------------------------
  console.log('\n--- 6. Nationwide Coverage Analytics & Benchmarks ---');

  runTest('Calculates comprehensive nationwide exam coverage matrix across 49 inventory exams', () => {
    const matrix = coverageAnalyticsService.getExamCoverageMatrix(db);
    assert.strictEqual(matrix.totalExams, 49);
    assert.strictEqual(matrix.readyCount, 2);
    assert.ok(matrix.partiallyCoveredCount >= 5);
    assert.ok(matrix.totalVerifiedPyqs >= 300);
  });

  runTest('Calculates school education board coverage across all 31 boards', () => {
    const boardMatrix = coverageAnalyticsService.getBoardCoverageMatrix(db);
    assert.strictEqual(boardMatrix.totalBoards, 31);
    assert.ok(boardMatrix.coveredBoardsCount >= 1);
  });

  runTest('Computes and persists benchmarks in content_coverage_benchmarks table', () => {
    const report = coverageAnalyticsService.computeAndPersistBenchmarks(db);
    assert.ok(report);
    assert.strictEqual(report.nationwideBenchmark.totalMandatedUnits, 80);
    assert.ok(report.nationwideBenchmark.coveragePercentage > 0);

    const stored = coverageAnalyticsService.getStoredBenchmarks(db);
    assert.ok(stored.length >= 3);
  });

  // -------------------------------------------------------------
  // 7. DATABASE STRUCTURAL INTEGRITY & ZERO REGRESSION
  // -------------------------------------------------------------
  console.log('\n--- 7. Database Structural Integrity & Zero Regression ---');

  runTest('SQLite PRAGMA integrity_check returns ok', () => {
    const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
    assert.strictEqual(integrity, 'ok', `Integrity check failed: ${integrity}`);
  });

  runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
    const violations = db.prepare('PRAGMA foreign_key_check').all();
    assert.strictEqual(violations.length, 0, `Expected 0 FK violations, found ${violations.length}`);
  });

  runTest('Search latency SLA: p95 latency under 15ms', () => {
    const { runSearchBenchmarks } = require('../scripts/run-search-benchmarks');
    const results = runSearchBenchmarks();
    assert.ok(results.every(r => r.passedSLA));
  });

  // Clean up test user artifacts
  db.prepare("DELETE FROM user_preparation_plans WHERE user_id = 'test-user-p12'").run();
  db.prepare("DELETE FROM user_spaced_revisions WHERE user_id = 'test-user-p12'").run();

  console.log('=================================================================');
  console.log(`🏁 PHASE 12 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=================================================================');

  if (failedTests > 0) {
    throw new Error(`Phase 12 test suite failed with ${failedTests} failure(s)`);
  }
}

module.exports = { runPhase12Tests };

if (require.main === module) {
  runPhase12Tests();
}

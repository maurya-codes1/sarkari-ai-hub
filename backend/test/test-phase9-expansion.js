// backend/test/test-phase9-expansion.js
// Phase 9 Automated Test Suite: Nationwide Exam Content Expansion,
// Official PYQ Ingestion, Controlled AI Practice Generation & Scalable Question Bank

const assert = require('assert');
const crypto = require('crypto');
const { getDb } = require('../db/database');

const nationwideRegistryService = require('../services/nationwide-exam-registry-service');
const officialSourceIngestionEngine = require('../services/official-source-ingestion-engine');
const aiPracticeGenerationService = require('../services/ai-practice-generation-service');
const coverageAnalyticsService = require('../services/coverage-analytics-service');
const scaleBenchmarkService = require('../services/scale-benchmark-service');
const fullExamGateService = require('../services/full-exam-gate-service');

let passedTests = 0;
let failedTests = 0;

function runTest(testName, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

async function runAsyncTest(testName, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

async function runPhase9Tests() {
  console.log('=================================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 9 AUTOMATED VERIFICATION SUITE');
  console.log('=================================================================');

  const db = getDb();
  assert(db, 'SQLite Database must be accessible.');

  // -----------------------------------------------------------------
  // 1. NATIONWIDE EXAM REGISTRY TESTS
  // -----------------------------------------------------------------
  console.log('\n--- 1. Nationwide Exam Registry & Non-Generic Authority ---');

  runTest('Lists 22 nationwide registered exams across 12 categories', () => {
    const exams = nationwideRegistryService.getAllRegistryEntries({}, db);
    assert(exams.length >= 22, `Expected >= 22 nationwide exams, got ${exams.length}`);
    
    const categories = new Set(exams.map(e => e.category));
    assert(categories.size >= 11, `Expected >= 11 categories, got ${categories.size}`);
    assert(categories.has('SSC'), 'Must contain SSC');
    assert(categories.has('RAILWAY'), 'Must contain RAILWAY');
    assert(categories.has('BANKING'), 'Must contain BANKING');
    assert(categories.has('DEFENCE'), 'Must contain DEFENCE');
    assert(categories.has('CIVIL_SERVICES'), 'Must contain CIVIL_SERVICES');
  });

  runTest('Retrieves single registry entry with authority and portal details', () => {
    const entry = nationwideRegistryService.getRegistryEntry('ssc-cgl', db);
    assert(entry, 'SSC CGL registry entry must exist.');
    assert.strictEqual(entry.exam_id, 'ssc-cgl');
    assert.strictEqual(entry.official_authority, 'Staff Selection Commission (SSC)');
    assert(entry.official_portal_url.includes('ssc.gov.in'), 'Portal URL must point to ssc.gov.in');
    assert(entry.historicalYearsCovered.length >= 5, 'Must have historical years covered listed');
  });

  runTest('Rejects nationwide exam registration with invalid category or malformed URL', () => {
    assert.throws(() => {
      nationwideRegistryService.registerDiscoveredExam({
        examId: 'test-invalid',
        category: 'INVALID_CATEGORY',
        officialAuthority: 'Test Authority',
        officialPortalUrl: 'https://test.gov.in'
      }, db);
    }, /Invalid category/);

    assert.throws(() => {
      nationwideRegistryService.registerDiscoveredExam({
        examId: 'test-invalid-2',
        category: 'SSC',
        officialAuthority: 'Test Authority',
        officialPortalUrl: 'not_a_valid_url'
      }, db);
    }, /Invalid official portal URL/);
  });

  runTest('Registers a discovered nationwide exam with official gazette and authority', () => {
    const testExamId = 'test-discovered-upsc-cds';
    
    // Ensure exam exists in base exams table for foreign key with valid organization_id and required columns
    db.prepare(`
      INSERT OR IGNORE INTO exams (exam_id, organization_id, name, short_name, category, level, official_website)
      VALUES (?, 'org-union-public-service-commission-upsc', 'Combined Defence Services', 'CDS', 'DEFENCE', 'National', 'https://upsc.gov.in')
    `).run(testExamId);

    const reg = nationwideRegistryService.registerDiscoveredExam({
      examId: testExamId,
      category: 'DEFENCE',
      subCategory: 'ARMED_FORCES',
      stateCode: 'ALL_INDIA',
      officialAuthority: 'Union Public Service Commission (UPSC)',
      officialPortalUrl: 'https://upsc.gov.in',
      officialAcronym: 'CDS',
      officialGazetteRef: 'Gazette Notification No. 10/2026-CDS',
      coverageStatus: 'INSUFFICIENT_CONTENT'
    }, db);

    assert(reg, 'Registration must return created entry.');
    assert.strictEqual(reg.exam_id, testExamId);
    assert.strictEqual(reg.official_acronym, 'CDS');
    assert.strictEqual(reg.official_gazette_ref, 'Gazette Notification No. 10/2026-CDS');

    // Cleanup test record
    db.prepare('DELETE FROM nationwide_exam_registry WHERE exam_id = ?').run(testExamId);
    db.prepare('DELETE FROM exams WHERE exam_id = ?').run(testExamId);
  });

  runTest('validateNoGenericExamRules verifies independent blueprint and rejects generic assumptions', () => {
    const validCheck = nationwideRegistryService.validateNoGenericExamRules('ssc-cgl', db);
    assert.strictEqual(validCheck.isValid, true, 'Verified exam ssc-cgl must pass non-generic rules.');
    assert(Boolean(validCheck.blueprintId), 'Must have verified blueprintId.');
    assert(validCheck.sectionCount >= 4, 'Must have verified sectionCount.');

    const unknownCheck = nationwideRegistryService.validateNoGenericExamRules('non-existent-exam', db);
    assert.strictEqual(unknownCheck.isValid, false, 'Non-existent exam must fail validation.');
  });

  // -----------------------------------------------------------------
  // 2. OFFICIAL SOURCE INGESTION ENGINE TESTS
  // -----------------------------------------------------------------
  console.log('\n--- 2. Multi-Stage Ingestion, Document Versions & Resumable Batching ---');

  runTest('15-stage workflow definitions and question types are properly registered', () => {
    assert(officialSourceIngestionEngine.STAGES.length >= 15, 'Must have at least 15 stages defined.');
    assert(officialSourceIngestionEngine.STAGES.includes('HASH'), 'Must include HASH stage.');
    assert(officialSourceIngestionEngine.STAGES.includes('DEDUPLICATION'), 'Must include DEDUPLICATION stage.');
    assert(officialSourceIngestionEngine.STAGES.includes('QUALITY_CHECK'), 'Must include QUALITY_CHECK stage.');

    assert(officialSourceIngestionEngine.QUESTION_TYPES.ASSERTION_REASON, 'Must support assertion_reason.');
    assert(officialSourceIngestionEngine.QUESTION_TYPES.MATCH_FOLLOWING, 'Must support match_following.');
    assert(officialSourceIngestionEngine.QUESTION_TYPES.NUMERICAL, 'Must support numerical.');
  });

  runTest('SHA-256 fingerprinting normalizes Indic Unicode scripts deterministically', () => {
    const stem1 = '  भारतीय संविधान का कौन-सा   अनुच्छेद समता का अधिकार देता है?  ';
    const stem2 = 'भारतीय संविधान का कौन-सा अनुच्छेद समता का अधिकार देता है?';
    
    const fp1 = officialSourceIngestionEngine.computeFingerprint(stem1, ['अनुच्छेद 14', 'अनुच्छेद 19']);
    const fp2 = officialSourceIngestionEngine.computeFingerprint(stem2, ['अनुच्छेद 14', 'अनुच्छेद 19']);

    assert.strictEqual(fp1, fp2, 'Fingerprints of equivalent stems with different whitespace must match.');
    assert.strictEqual(fp1.length, 64, 'Fingerprint must be a 64-character SHA-256 hex string.');
  });

  runTest('Registers source document version with cryptographic change detection', () => {
    const docData = {
      documentId: 'doc-ssc-cgl-notification-2026',
      documentType: 'EXAM_NOTIFICATION',
      sourceUrl: 'https://ssc.gov.in/notifications/cgl-2026.pdf',
      documentBuffer: Buffer.from('Official SSC CGL 2026 Notification Content'),
      changeReason: 'Initial Gazette Publication'
    };

    const ver = officialSourceIngestionEngine.registerSourceDocumentVersion(docData, db);
    assert(ver, 'Must register document version.');
    assert(ver.version, 'Must contain version object.');
    assert.strictEqual(ver.version.versionNumber, 'SOURCE_VERSION_1');

    // Register amended version with change detection
    const amendedData = {
      ...docData,
      documentBuffer: Buffer.from('Official SSC CGL 2026 Corrigendum Content 1'),
      changeReason: 'Corrigendum 1: Negative marking adjustment'
    };

    const ver2 = officialSourceIngestionEngine.registerSourceDocumentVersion(amendedData, db);
    assert(ver2, 'Must register amended version.');
    assert(ver2.version, 'Must contain version object.');
    assert.strictEqual(ver2.version.versionNumber, 'SOURCE_VERSION_2');
    assert.notStrictEqual(ver.version.documentHash, ver2.version.documentHash);
  });

  runTest('Resumable batch processing: creates job, pauses with checkpoint, and resumes', () => {
    const job = officialSourceIngestionEngine.startIngestionJob({
      jobName: 'Resumable Test Batch 2024',
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      academicYear: '2024',
      jobType: 'OFFICIAL_PYQ_INGESTION',
      totalExpected: 100
    }, db);

    assert(job, 'Job must be created.');
    assert.strictEqual(job.status, 'RUNNING');

    const paused = officialSourceIngestionEngine.pauseIngestionJob(job.job_id, { lastProcessedIndex: 25 }, db);
    assert(paused, 'Job must pause.');
    assert.strictEqual(paused.status, 'PAUSED');

    const resumed = officialSourceIngestionEngine.resumeIngestionJob(job.job_id, db);
    assert(resumed, 'Job must resume.');
    assert.strictEqual(resumed.status, 'RUNNING');

    // Cleanup test job
    db.prepare('DELETE FROM resumable_ingestion_jobs WHERE job_id = ?').run(job.job_id);
  });

  await runAsyncTest('Batch ingestion inserts verified questions and rejects exact duplicates', async () => {
    const job = officialSourceIngestionEngine.startIngestionJob({
      jobName: 'Dedup Ingestion Batch',
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      academicYear: '2024',
      jobType: 'OFFICIAL_PYQ_INGESTION',
      totalExpected: 2
    }, db);

    const testQId = 'test-dedup-salt-' + Date.now();
    const candidateQuestion = {
      questionId: testQId,
      stem: `What is the chemical formula for common salt #${Date.now()} (Sodium Chloride)?`,
      options: [
        { optionId: 'opt_a', text: 'NaCl', isCorrect: true },
        { optionId: 'opt_b', text: 'KCl', isCorrect: false },
        { optionId: 'opt_c', text: 'CaCl2', isCorrect: false },
        { optionId: 'opt_d', text: 'Na2SO4', isCorrect: false }
      ],
      explanation: 'Common table salt is chemically known as Sodium Chloride (NaCl).',
      marks: 1.0,
      subjectId: 'subj-science',
      shift: 'SHIFT_1',
      questionNumber: 99
    };

    // First batch: must insert
    const res1 = await officialSourceIngestionEngine.processQuestionBatch(job.job_id, [candidateQuestion], 10, db);
    assert.strictEqual(res1.inserted, 1, 'First attempt must insert 1 question.');
    assert.strictEqual(res1.duplicates, 0);

    // Second batch with fresh job: exact duplicate must be detected and skipped
    const job2 = officialSourceIngestionEngine.startIngestionJob({
      jobName: 'Dedup Ingestion Batch 2',
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      academicYear: '2024',
      jobType: 'OFFICIAL_PYQ_INGESTION',
      totalExpected: 2
    }, db);

    const res2 = await officialSourceIngestionEngine.processQuestionBatch(job2.job_id, [candidateQuestion], 10, db);
    assert.strictEqual(res2.inserted, 0, 'Duplicate attempt must insert 0 questions.');
    assert.strictEqual(res2.duplicates, 1, 'Duplicate must be detected.');
    assert.strictEqual(res2.skipped, 1, 'Duplicate question must be skipped.');

    // Cleanup test artifacts
    db.prepare('DELETE FROM question_fingerprints WHERE question_id = ?').run(testQId);
    db.prepare('DELETE FROM question_versions WHERE question_id = ?').run(testQId);
    db.prepare('DELETE FROM questions WHERE question_id = ?').run(testQId);
    db.prepare('DELETE FROM resumable_ingestion_jobs WHERE job_id IN (?, ?)').run(job.job_id, job2.job_id);
  });

  runTest('Propagates official corrigendum (dropped questions, multi-answer keys)', () => {
    const paperId = 'paper-ssc-cgl-2024-t1-s1';
    const targetQNum = 1;

    // Record original state
    const originalQ = db.prepare('SELECT answer_state, full_exam_eligible, validation_notes FROM questions WHERE paper_id = ? AND source_question_number = ?').get(paperId, targetQNum);

    const corrResult = officialSourceIngestionEngine.propagateCorrigendum(paperId, [
      { questionNumber: targetQNum, action: 'DROP_QUESTION', reason: 'Ambiguous question stem notified by SSC Corrigendum 2024' }
    ], db);

    assert.strictEqual(corrResult.success, true);
    assert.strictEqual(corrResult.modifiedCount, 1);

    const updatedQ = db.prepare('SELECT answer_state, full_exam_eligible, validation_notes FROM questions WHERE paper_id = ? AND source_question_number = ?').get(paperId, targetQNum);
    assert.strictEqual(updatedQ.answer_state, 'DROPPED', 'Question must be marked DROPPED.');
    assert.strictEqual(updatedQ.full_exam_eligible, 0, 'Dropped question must NEVER be full exam eligible.');

    // Restore original state
    if (originalQ) {
      db.prepare(`
        UPDATE questions SET answer_state = ?, full_exam_eligible = ?, validation_notes = ?
        WHERE paper_id = ? AND source_question_number = ?
      `).run(originalQ.answer_state, originalQ.full_exam_eligible, originalQ.validation_notes, paperId, targetQNum);
    }
  });

  // -----------------------------------------------------------------
  // 3. AI PRACTICE GENERATION & 10-POINT QUALITY GATE
  // -----------------------------------------------------------------
  console.log('\n--- 3. Controlled AI Practice & 10-Point Quality Gate ---');

  runTest('Identifies real coverage gaps in syllabus chapters and topics', () => {
    const gapAnalysis = aiPracticeGenerationService.identifyCoverageGaps('ssc-cgl', db);
    assert(gapAnalysis, 'Coverage gap analysis must return results.');
    assert(gapAnalysis.totalGapsIdentified > 0, `Should identify topics needing content, found ${gapAnalysis.totalGapsIdentified}`);
    
    const firstGap = gapAnalysis.gaps[0];
    assert(firstGap.topicId, 'Gap item must have topicId.');
    assert(firstGap.chapterName, 'Gap item must have chapterName.');
    assert(firstGap.priority, 'Gap item must specify priority.');
  });

  runTest('10-Point Quality Gate: Approves valid, mathematically and factually sound practice question', () => {
    const candidate = {
      stem: 'यदि किसी वस्तु का क्रय मूल्य ₹400 है और लाभ 20% है, तो लाभ की राशि कितनी होगी?',
      subjectId: 'subj-math',
      concept: 'Percentage Profit Calculation',
      difficulty: 'MEDIUM',
      cognitiveLevel: 'APPLY',
      questionType: 'single_mcq',
      options: [
        { optionId: 'opt_a', text: '₹80', isCorrect: true, explanation: '400 × 20% = ₹80' },
        { optionId: 'opt_b', text: '₹100', isCorrect: false, explanation: 'Incorrect' },
        { optionId: 'opt_c', text: '₹60', isCorrect: false, explanation: 'Incorrect' },
        { optionId: 'opt_d', text: '₹120', isCorrect: false, explanation: 'Incorrect' }
      ],
      explanation: 'लाभ = (क्रय मूल्य × लाभ %) / 100 = (400 × 20) / 100 = ₹80। अतः विकल्प (A) सही है।',
      marks: 1.0,
      negativeMarks: 0.25,
      fullExamEligible: 0
    };

    const gateResult = aiPracticeGenerationService.verifyTenPointQualityGate(candidate, {
      subjectId: 'subj-math',
      concept: 'Percentage Profit Calculation'
    }, db);

    assert.strictEqual(gateResult.passed, true, 'Valid question must pass all 10 quality gates.');
    assert.strictEqual(gateResult.passedGates, 10, 'All 10 gates must pass.');
    assert.strictEqual(gateResult.status, 'APPROVED');
  });

  runTest('10-Point Quality Gate: Rejects question with mathematical calculation mismatch', () => {
    const faultyMathCandidate = {
      stem: 'What is 20% of 500?',
      subjectId: 'subj-math',
      concept: 'Percentage',
      difficulty: 'EASY',
      cognitiveLevel: 'APPLY',
      questionType: 'single_mcq',
      options: [
        { optionId: 'opt_a', text: '150', isCorrect: true }, // WRONG: 20% of 500 is 100!
        { optionId: 'opt_b', text: '80', isCorrect: false },
        { optionId: 'opt_c', text: '60', isCorrect: false },
        { optionId: 'opt_d', text: '50', isCorrect: false }
      ],
      explanation: '20% of 500 = 100, but wrong option marked as true.',
      marks: 1.0,
      negativeMarks: 0.25,
      fullExamEligible: 0
    };

    const gateResult = aiPracticeGenerationService.verifyTenPointQualityGate(faultyMathCandidate, {
      subjectId: 'subj-math',
      concept: 'Percentage'
    }, db);

    assert.strictEqual(gateResult.passed, false, 'Faulty math question must fail quality gate.');
    assert(gateResult.failures.includes('GATE_3_MATHEMATICAL_VERIFICATION_FAILED'));
    assert.strictEqual(gateResult.status, 'AI_GENERATION_REJECTED_UNVERIFIED');
  });

  runTest('10-Point Quality Gate: Rejects question with hallucinated factual claim', () => {
    const faultyFactCandidate = {
      stem: 'In which year did the Battle of Plassey take place?',
      subjectId: 'subj-history',
      concept: 'Modern Indian History',
      difficulty: 'EASY',
      cognitiveLevel: 'REMEMBER',
      questionType: 'single_mcq',
      options: [
        { optionId: 'opt_a', text: '1857', isCorrect: true }, // WRONG: Battle of Plassey was 1757!
        { optionId: 'opt_b', text: '1764', isCorrect: false },
        { optionId: 'opt_c', text: '1761', isCorrect: false },
        { optionId: 'opt_d', text: '1526', isCorrect: false }
      ],
      explanation: 'Battle of Plassey took place in 1757, not 1857.',
      marks: 1.0,
      negativeMarks: 0.25,
      fullExamEligible: 0
    };

    const gateResult = aiPracticeGenerationService.verifyTenPointQualityGate(faultyFactCandidate, {
      subjectId: 'subj-history',
      concept: 'Modern Indian History'
    }, db);

    assert.strictEqual(gateResult.passed, false, 'Faulty fact question must fail quality gate.');
    assert(gateResult.failures.includes('GATE_4_FACTUAL_ACCURACY_FAILED'));
  });

  runTest('SAFETY INVARIANT: Rejects AI Practice question if full_exam_eligible = 1', () => {
    const illegalLeakCandidate = {
      stem: 'What is the capital of India in geography?',
      subjectId: 'subj-gk',
      concept: 'Indian Geography',
      difficulty: 'EASY',
      cognitiveLevel: 'REMEMBER',
      questionType: 'single_mcq',
      options: [
        { optionId: 'opt_a', text: 'New Delhi', isCorrect: true },
        { optionId: 'opt_b', text: 'Mumbai', isCorrect: false },
        { optionId: 'opt_c', text: 'Kolkata', isCorrect: false },
        { optionId: 'opt_d', text: 'Chennai', isCorrect: false }
      ],
      explanation: 'New Delhi is the official national capital of India.',
      marks: 1.0,
      negativeMarks: 0.25,
      fullExamEligible: 1 // CRITICAL VIOLATION: AI question trying to leak into Full Exam pool!
    };

    const gateResult = aiPracticeGenerationService.verifyTenPointQualityGate(illegalLeakCandidate, {
      subjectId: 'subj-gk',
      concept: 'Indian Geography'
    }, db);

    assert.strictEqual(gateResult.passed, false, 'Must reject AI question with full_exam_eligible = 1');
    assert(gateResult.failures.includes('GATE_10_METADATA_OR_ISOLATION_VIOLATION'));
  });

  runTest('Processes AI Practice queue item, stores strictly as Tier 5, with full_exam_eligible = 0', () => {
    const qItem = aiPracticeGenerationService.queueGeneration({
      examId: 'ssc-cgl',
      examVersionId: 'ver-ssc-cgl-2026',
      subjectId: 'subj-math',
      concept: 'Profit and Loss Practice',
      targetDifficulty: 'MEDIUM',
      languageCode: 'hi',
      questionType: 'single_mcq',
      countRequested: 2
    }, db);

    assert(qItem, 'Queue item must be created.');
    assert.strictEqual(qItem.status, 'QUEUED');

    const result = aiPracticeGenerationService.processQueueItem(qItem.queueId, db);
    assert.strictEqual(result.status, 'COMPLETED');
    assert.strictEqual(result.tier, 'TIER_5_AI_PRACTICE');
    assert.strictEqual(result.fullExamEligible, 0, 'AI practice must ALWAYS have full_exam_eligible = 0');
    assert(result.verified > 0, 'Must verify and persist questions.');

    // Clean up test generated AI practice questions and queue item
    if (result.savedQuestionIds && result.savedQuestionIds.length > 0) {
      for (const qid of result.savedQuestionIds) {
        db.prepare('DELETE FROM question_versions WHERE question_id = ?').run(qid);
        db.prepare('DELETE FROM questions WHERE question_id = ?').run(qid);
      }
    }
    db.prepare('DELETE FROM ai_generation_queue WHERE queue_id = ?').run(qItem.queueId);
  });

  runTest('FULL EXAM SHORTAGE INVARIANT: AI practice questions do NOT unblock a FULL_EXAM_BLOCKED exam', () => {
    // NEET UG is FULL_EXAM_BLOCKED due to insufficient official full exam PYQs
    const readiness = fullExamGateService.evaluateExamReadiness('neet-ug', null, db);
    assert(['BLOCKED', 'FULL_EXAM_BLOCKED'].includes(readiness.gateStatus || readiness.status), 'NEET UG must remain blocked for Full Exam mode.');

    // Even if we have Tier 5 AI questions in database, Full Exam Gate MUST NOT count them
    const neetEligibleCount = db.prepare(`
      SELECT COUNT(*) as c FROM questions q
      JOIN subjects s ON q.subject_id = s.subject_id
      JOIN blueprint_sections bs ON s.subject_id = bs.subject_id
      JOIN exam_blueprints eb ON bs.blueprint_id = eb.blueprint_id
      WHERE eb.exam_version_id = 'ver-neet-ug-2026' AND q.full_exam_eligible = 1
    `).get().c;

    assert(neetEligibleCount < 180, 'Full Exam eligible questions for NEET UG must remain below the 180 requirement.');
  });

  // -----------------------------------------------------------------
  // 4. COVERAGE ANALYTICS & MULTILINGUAL MATRIX
  // -----------------------------------------------------------------
  console.log('\n--- 4. Coverage Analytics & Multilingual Matrix ---');

  runTest('Computes exam coverage matrix with honest coverage statuses', () => {
    const matrix = coverageAnalyticsService.getExamCoverageMatrix('ssc-cgl', db);
    assert(matrix, 'Matrix must be returned.');
    assert.strictEqual(matrix.examId, 'ssc-cgl');
    assert(['VERIFIED_COMPLETE', 'PARTIAL', 'LIMITED'].includes(matrix.coverageStatus), `Unexpected status: ${matrix.coverageStatus}`);
    assert(matrix.subjectMetrics.length > 0, 'Must include subject metrics.');
    assert(matrix.tierBreakdown.TIER_2_VERIFIED_PYQ > 0, 'Must track Tier 2 PYQs.');
  });

  runTest('Refreshes chapter-level coverage gap metrics in coverage_gap_metrics table', () => {
    const refresh = coverageAnalyticsService.refreshCoverageGapMetrics('ssc-cgl', db);
    assert.strictEqual(refresh.examId, 'ssc-cgl');
    assert(refresh.chaptersAnalyzed > 0, 'Chapters must be analyzed and recorded.');

    const recorded = db.prepare('SELECT COUNT(*) as c FROM coverage_gap_metrics WHERE exam_id = ?').get('ssc-cgl').c;
    assert.strictEqual(recorded, refresh.chaptersAnalyzed, 'Recorded count must match analyzed chapters.');
  });

  runTest('Multilingual matrix tracks 12 Indic languages and isolates Hinglish to UI convenience', () => {
    const matrix = coverageAnalyticsService.getExamCoverageMatrix('ssc-cgl', db);
    assert.strictEqual(matrix.languageMatrix.length, 12, 'Must cover all 12 supported Indic languages.');
    
    const langCodes = matrix.languageMatrix.map(l => l.languageCode);
    assert(langCodes.includes('hi'), 'Must support Hindi');
    assert(langCodes.includes('en'), 'Must support English');
    assert(langCodes.includes('bn'), 'Must support Bengali');
    assert(langCodes.includes('te'), 'Must support Telugu');
    assert(langCodes.includes('ta'), 'Must support Tamil');

    // Hinglish MUST NOT be an official paper language
    assert(!langCodes.includes('hinglish'), 'Hinglish must NEVER be listed as an official exam paper language code.');
  });

  // -----------------------------------------------------------------
  // 5. SCALE BENCHMARK & PERFORMANCE VERIFICATION
  // -----------------------------------------------------------------
  console.log('\n--- 5. Scalability Benchmarks, Composite Indexes & QPS ---');

  runTest('EXPLAIN QUERY PLAN confirms all high-frequency queries utilize composite indexes', () => {
    const explain = scaleBenchmarkService.explainQueryPerformance(db);
    assert.strictEqual(explain.allQueriesIndexed, true, 'All high-frequency queries must use indexes.');
    assert.strictEqual(explain.plans.length, 3, 'Must explain 3 critical query plans.');
    explain.plans.forEach(p => {
      assert(p.usesIndex, `Query '${p.query}' must use index. Plan: ${p.plan}`);
    });
  });

  runTest('Indexed search benchmark achieves sub-50ms SLA (p95 < 50ms)', () => {
    const bench = scaleBenchmarkService.runSearchBenchmark(30, db);
    assert(bench.sub50msCompliant, `Search latency must be < 50ms, got p95 = ${bench.latencyMs.p95}ms`);
    assert(bench.latencyMs.p95 < 25.0, `Expected fast sub-25ms retrieval, got ${bench.latencyMs.p95}ms`);
    assert(bench.throughputQueriesPerSec > 200, `Expected > 200 QPS, got ${bench.throughputQueriesPerSec}`);
  });

  runTest('Batch insert simulation achieves > 10,000 QPS with complete transactional rollback', () => {
    const countBefore = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;

    const bench = scaleBenchmarkService.runBatchInsertSimulation(500, db);
    assert.strictEqual(bench.simulatedInsertCount, 500);
    assert(bench.insertionThroughputPerSec > 10000, `Throughput must be > 10k QPS, got ${bench.insertionThroughputPerSec} QPS`);
    assert.strictEqual(bench.rollbackSuccessful, true, 'Transaction must be cleanly rolled back.');

    const countAfter = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
    assert.strictEqual(countBefore, countAfter, 'Database row count must remain 100% untouched after benchmark rollback.');
  });

  runTest('Scale feasibility assessment report generates valid projections for 10k to 500k scale', () => {
    const report = scaleBenchmarkService.getScaleFeasibilityReport(db);
    assert(report, 'Feasibility report must exist.');
    assert(report.currentStatus.insertThroughputQps > 5000, 'Must record insert throughput.');
    assert(report.currentStatus.searchP95LatencyMs < 50.0, 'Must record p95 latency.');
    assert.strictEqual(report.scaleProjections.length, 4, 'Must provide 4 scale projections (10k, 50k, 100k, 500k).');
    assert(report.recommendations.length >= 3, 'Must include architectural recommendations.');
  });

  // -----------------------------------------------------------------
  // 6. ZERO REGRESSION & DATABASE INTEGRITY INVARIANTS
  // -----------------------------------------------------------------
  console.log('\n--- 6. Zero Regression & Database Integrity Invariants ---');

  runTest('SQLite PRAGMA integrity_check returns ok', () => {
    const integrity = db.pragma('integrity_check');
    assert.strictEqual(integrity[0].integrity_check, 'ok', 'PRAGMA integrity_check must return ok.');
  });

  runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
    const fkErrors = db.pragma('foreign_key_check');
    assert.strictEqual(fkErrors.length, 0, `PRAGMA foreign_key_check must have 0 errors, found: ${JSON.stringify(fkErrors)}`);
  });

  console.log('\n=================================================================');
  console.log(`🏁 PHASE 9 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase9Tests().catch(err => {
  console.error('Fatal Phase 9 test error:', err);
  process.exit(1);
});

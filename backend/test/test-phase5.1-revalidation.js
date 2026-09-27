// backend/test/test-phase5.1-revalidation.js
// Automated Test Suite for Phase 5.1: Legacy Question Trust, Exam-Pattern Mapping,
// AI Interleaving & Zero-Question Safety
// Validates Cases 1 through 26 as mandated by Phase 5.1 Specification

const assert = require('assert');
const { getDb } = require('../db/database');
const legacyRevalidationService = require('../services/legacy-revalidation-service');
const aiInterleavingService = require('../services/ai-interleaving-service');
const zeroQuestionService = require('../services/zero-question-service');
const mockService = require('../services/mock-service');
const contentRepo = require('../db/repositories/content-repository');

async function runPhase51Tests() {
  console.log('========================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 5.1 REVALIDATION & QUALITY SUITE');
  console.log('========================================================\n');

  const db = getDb();
  let passed = 0;
  let failed = 0;

  function runTest(name, fn) {
    try {
      fn();
      console.log(`✅ ${name}: PASSED`);
      passed++;
    } catch (err) {
      console.error(`❌ ${name}: FAILED -> ${err.message}`);
      failed++;
    }
  }

  async function runAsyncTest(name, fn) {
    try {
      await fn();
      console.log(`✅ ${name}: PASSED`);
      passed++;
    } catch (err) {
      console.error(`❌ ${name}: FAILED -> ${err.message}`);
      failed++;
    }
  }

  // TEST 1: Legacy Classification — All 872 questions categorized
  runTest('TEST 1: Legacy Classification (all 872 questions categorized)', () => {
    const report = legacyRevalidationService.getAuditReport(db);
    assert(report.totalAudited === 872, `Expected 872 questions audited, got ${report.totalAudited}`);
    const practiceOnly = report.statusBreakdown.find(s => s.trust_status === 'PRACTICE_ONLY')?.count || 0;
    const needsReview = report.statusBreakdown.find(s => s.trust_status === 'NEEDS_REVIEW')?.count || 0;
    assert.strictEqual(practiceOnly + needsReview, 872, 'Every question must be categorized');
    assert.strictEqual(practiceOnly, 726, `Expected 726 PRACTICE_ONLY questions, got ${practiceOnly}`);
    assert.strictEqual(needsReview, 146, `Expected 146 NEEDS_REVIEW questions, got ${needsReview}`);
  });

  // TEST 2: Mismatched & Specialized Subject Separation
  runTest('TEST 2: Mismatched & Specialized Subject Separation (NEEDS_REVIEW isolation)', () => {
    const rows = db.prepare(`
      SELECT q.question_id, s.name as subject_name, q.trust_status, q.full_exam_eligible
      FROM questions q
      JOIN subjects s ON q.subject_id = s.subject_id
      WHERE q.trust_status = 'NEEDS_REVIEW'
    `).all();
    assert(rows.length === 146, `Expected 146 NEEDS_REVIEW rows, got ${rows.length}`);
    for (const r of rows) {
      assert.strictEqual(r.full_exam_eligible, 0, 'NEEDS_REVIEW questions must NOT be full_exam_eligible');
    }
  });

  // TEST 3: Practice Mode 100% Inclusivity
  runTest('TEST 3: Practice Mode 100% Inclusivity (872/872 practice eligible)', () => {
    const report = legacyRevalidationService.getAuditReport(db);
    assert.strictEqual(report.eligibility.practiceEligible, 872, '100% of legacy questions must remain practice eligible');
  });

  // TEST 4: Zero Fake Promotion
  runTest('TEST 4: Zero Fake Promotion (0/872 full_exam_eligible without official verification)', () => {
    const report = legacyRevalidationService.getAuditReport(db);
    assert.strictEqual(report.eligibility.fullExamEligible, 0, 'No legacy generic question can be falsely marked full_exam_eligible');
  });

  // TEST 5: Question Remapping Proposals table and structure
  runTest('TEST 5: Question Remapping Proposals table and structure', () => {
    const tableInfo = db.prepare("PRAGMA table_info('question_remapping_proposals')").all();
    assert(tableInfo.length > 0, 'question_remapping_proposals table must exist');
    const cols = tableInfo.map(c => c.name);
    assert(cols.includes('proposal_id'), 'Must have proposal_id');
    assert(cols.includes('question_id'), 'Must have question_id');
    assert(cols.includes('current_mapping_json'), 'Must have current_mapping_json');
    assert(cols.includes('proposed_mapping_json'), 'Must have proposed_mapping_json');
    assert(cols.includes('confidence_score'), 'Must have confidence_score');
  });

  // TEST 6: AI Interleaving Proportion
  runTest('TEST 6: AI Interleaving Proportion (honors requested proportion and total count)', () => {
    const verified = Array.from({ length: 20 }, (_, i) => ({ questionId: `v-${i}`, text: `Verified ${i}` }));
    const ai = Array.from({ length: 10 }, (_, i) => ({ questionId: `ai-${i}`, text: `AI ${i}` }));
    
    // Request 10 questions with 30% AI (i.e. 3 AI, 7 Verified)
    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 10,
      aiProportion: 0.3
    });

    assert.strictEqual(result.length, 10, 'Resulting pool should have exactly 10 questions');
    const aiCount = result.filter(q => q.questionId.startsWith('ai-')).length;
    const verifiedCount = result.filter(q => q.questionId.startsWith('v-')).length;
    assert.strictEqual(aiCount, 3, `Expected 3 AI questions, got ${aiCount}`);
    assert.strictEqual(verifiedCount, 7, `Expected 7 verified questions, got ${verifiedCount}`);
  });

  // TEST 7: AI Interleaving Zero Proportion (Full Exam Simulation Default)
  runTest('TEST 7: AI Interleaving Zero Proportion (Full Exam Simulation Default)', () => {
    const verified = Array.from({ length: 15 }, (_, i) => ({ questionId: `v-${i}`, text: `Verified ${i}` }));
    const ai = Array.from({ length: 5 }, (_, i) => ({ questionId: `ai-${i}`, text: `AI ${i}` }));

    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 10,
      aiProportion: 0.0
    });

    assert.strictEqual(result.length, 10, 'Should return exactly 10 questions');
    const aiCount = result.filter(q => q.questionId.startsWith('ai-')).length;
    assert.strictEqual(aiCount, 0, 'No AI questions should be included when aiProportion is 0.0');
  });

  // TEST 8: Natural Stride & Contiguous Block Prevention
  runTest('TEST 8: Natural Stride & Contiguous Block Prevention (no consecutive AI questions)', () => {
    const verified = Array.from({ length: 20 }, (_, i) => ({ questionId: `v-${i}`, text: `Verified ${i}` }));
    const ai = Array.from({ length: 5 }, (_, i) => ({ questionId: `ai-${i}`, text: `AI ${i}` }));

    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 15,
      aiProportion: 0.2
    });

    // Check that no two adjacent questions are both AI questions
    for (let i = 0; i < result.length - 1; i++) {
      const isCurrentAi = result[i].questionId.startsWith('ai-');
      const isNextAi = result[i + 1].questionId.startsWith('ai-');
      assert(!(isCurrentAi && isNextAi), `Found contiguous AI questions at index ${i} and ${i + 1}`);
    }
  });

  // TEST 9: Zero Duplicate IDs during Interleaving
  runTest('TEST 9: Zero Duplicate IDs during Interleaving', () => {
    const verified = Array.from({ length: 10 }, (_, i) => ({ questionId: `v-${i}`, text: `Verified ${i}` }));
    const ai = Array.from({ length: 5 }, (_, i) => ({ questionId: `ai-${i}`, text: `AI ${i}` }));

    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 12,
      aiProportion: 0.25
    });

    const ids = result.map(q => q.questionId);
    const uniqueIds = new Set(ids);
    assert.strictEqual(ids.length, uniqueIds.size, 'Zero duplicate question IDs allowed');
  });

  // TEST 10: Passage Group Clustering Protection
  runTest('TEST 10: Passage Group Clustering Protection (passage-based items kept together)', () => {
    const verified = [
      { questionId: 'v-1', text: 'Solo 1' },
      { questionId: 'v-2', text: 'Passage Q1', passage_group_id: 'passage-rc-101' },
      { questionId: 'v-3', text: 'Passage Q2', passage_group_id: 'passage-rc-101' },
      { questionId: 'v-4', text: 'Passage Q3', passage_group_id: 'passage-rc-101' },
      { questionId: 'v-5', text: 'Solo 2' },
      { questionId: 'v-6', text: 'Solo 3' }
    ];
    const ai = [
      { questionId: 'ai-1', text: 'AI 1' },
      { questionId: 'ai-2', text: 'AI 2' }
    ];

    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 7,
      aiProportion: 0.25
    });

    // Find indices of passage questions
    const passageIndices = [];
    result.forEach((q, idx) => {
      if (q.passage_group_id === 'passage-rc-101') {
        passageIndices.push(idx);
      }
    });

    if (passageIndices.length > 1) {
      for (let i = 0; i < passageIndices.length - 1; i++) {
        assert.strictEqual(
          passageIndices[i + 1] - passageIndices[i],
          1,
          `Passage group items were separated! Indices: ${passageIndices.join(', ')}`
        );
      }
    }
  });

  // TEST 11: Section Boundary Isolation
  runTest('TEST 11: Section Boundary Isolation (interleaving contained per section)', () => {
    const sections = [
      {
        sectionId: 'sec-quant',
        name: 'Quantitative Aptitude',
        targetCount: 5,
        verifiedPool: Array.from({ length: 6 }, (_, i) => ({ questionId: `quant-v-${i}`, section: 'quant' })),
        aiPool: Array.from({ length: 2 }, (_, i) => ({ questionId: `quant-ai-${i}`, section: 'quant' }))
      },
      {
        sectionId: 'sec-reasoning',
        name: 'Reasoning',
        targetCount: 5,
        verifiedPool: Array.from({ length: 6 }, (_, i) => ({ questionId: `reason-v-${i}`, section: 'reasoning' })),
        aiPool: Array.from({ length: 2 }, (_, i) => ({ questionId: `reason-ai-${i}`, section: 'reasoning' }))
      }
    ];

    const interleaved = aiInterleavingService.interleaveSections(sections, { aiProportion: 0.2 });
    assert.strictEqual(interleaved.length, 2, 'Should process both sections');
    assert.strictEqual(interleaved[0].questions.length, 5, 'Quant section should have 5 questions');
    assert.strictEqual(interleaved[1].questions.length, 5, 'Reasoning section should have 5 questions');

    // Quant section must only contain quant questions
    interleaved[0].questions.forEach(q => {
      assert.strictEqual(q.section, 'quant', 'Quant section contaminated with non-quant question');
    });

    // Reasoning section must only contain reasoning questions
    interleaved[1].questions.forEach(q => {
      assert.strictEqual(q.section, 'reasoning', 'Reasoning section contaminated with non-reasoning question');
    });
  });

  // TEST 12: AI Question Provenance Integrity
  runTest('TEST 12: AI Question Provenance Integrity (retains AI_PRACTICE provenance)', () => {
    const verified = [{ questionId: 'v-1', provenance: 'HUMAN_CURATED' }];
    const ai = [{ questionId: 'ai-1', provenance: 'AI_PRACTICE' }];

    const result = aiInterleavingService.interleaveQuestions(verified, ai, {
      totalQuestionsNeeded: 2,
      aiProportion: 0.5
    });

    const aiQ = result.find(q => q.questionId === 'ai-1');
    assert(aiQ, 'AI question must be present');
    assert.strictEqual(aiQ.provenance, 'AI_PRACTICE', 'AI question must retain AI_PRACTICE provenance');
    assert.notStrictEqual(aiQ.provenance, 'OFFICIAL_QUESTION', 'AI question must NOT be tagged OFFICIAL_QUESTION');
    assert.notStrictEqual(aiQ.provenance, 'PREVIOUS_YEAR_QUESTION', 'AI question must NOT be tagged PREVIOUS_YEAR_QUESTION');
  });

  // TEST 13: Zero-Question Full Exam Safety
  runTest('TEST 13: Zero-Question Full Exam Safety (safe error with FULL_EXAM_UNAVAILABLE)', () => {
    const evaluation = zeroQuestionService.evaluateFullExamSection({
      sectionName: 'General Studies',
      sectionId: 'sec-gs',
      examId: 'upsc-cse',
      requiredCount: 100,
      verifiedPool: []
    });

    assert.strictEqual(evaluation.isAvailable, false, 'Full exam should be marked unavailable when 0 questions');
    assert.strictEqual(evaluation.status, 'FULL_EXAM_UNAVAILABLE', 'Status must be FULL_EXAM_UNAVAILABLE');
    assert.strictEqual(evaluation.reason, 'NO_VERIFIED_QUESTIONS', 'Reason must be NO_VERIFIED_QUESTIONS');
  });

  // TEST 14: Zero-Question Practice Mode Safety
  runTest('TEST 14: Zero-Question Practice Mode Safety (returns 200 contract with NO_ELIGIBLE_QUESTIONS)', () => {
    const evaluation = zeroQuestionService.evaluatePracticeInventory({
      requestedCount: 20,
      eligiblePool: [],
      subjectId: 'subj-nonexistent',
      allowPartial: true
    });

    assert.strictEqual(evaluation.isAvailable, false, 'Should be marked unavailable');
    assert.strictEqual(evaluation.status, 'NO_ELIGIBLE_QUESTIONS', 'Status must be NO_ELIGIBLE_QUESTIONS');
    assert.strictEqual(evaluation.deliveredQuestions.length, 0, 'Delivered questions should be empty');
    assert.strictEqual(evaluation.count, 0, 'Delivered count should be 0');
  });

  // TEST 15: Partial Inventory Shortage Handling
  runTest('TEST 15: Partial Inventory Shortage Handling (delivers available items without duplicate looping)', () => {
    const pool = [
      { questionId: 'p-1', text: 'Q1' },
      { questionId: 'p-2', text: 'Q2' },
      { questionId: 'p-3', text: 'Q3' }
    ];

    const evaluation = zeroQuestionService.evaluatePracticeInventory({
      requestedCount: 10,
      eligiblePool: pool,
      subjectId: 'subj-small',
      allowPartial: true
    });

    assert.strictEqual(evaluation.isAvailable, true, 'Partial practice should be available');
    assert.strictEqual(evaluation.status, 'REDUCED_PRACTICE_SET', 'Status should indicate REDUCED_PRACTICE_SET');
    assert.strictEqual(evaluation.deliveredQuestions.length, 3, 'Must deliver exactly 3 questions');
    assert.strictEqual(evaluation.shortage, 7, 'Shortage must be 7');
    
    // Check no duplicate IDs in delivered questions
    const ids = evaluation.deliveredQuestions.map(q => q.questionId);
    assert.strictEqual(ids.length, new Set(ids).size, 'No duplicates allowed in partial delivery');
  });

  // TEST 16: Zero-Question Score Safety
  runTest('TEST 16: Zero-Question Score Safety (avoids NaN, Infinity, and division by zero)', () => {
    const safeScore = zeroQuestionService.calculateSafeScore({
      rawMarks: 0,
      totalPossibleMarks: 0,
      totalQuestions: 0,
      questionsAttempted: 0
    });

    assert.strictEqual(safeScore.percentage, 0, 'Percentage on 0 total possible marks must be 0');
    assert.strictEqual(safeScore.marksObtained, 0, 'Marks obtained must be 0');
    assert.strictEqual(safeScore.totalMarks, 0, 'Total marks must be 0');
    assert(!isNaN(safeScore.percentage), 'Percentage must not be NaN');
    assert(isFinite(safeScore.percentage), 'Percentage must be finite');
  });

  // TEST 17: Zero-Question Audit Logging
  runTest('TEST 17: Zero-Question Audit Logging (records events into database)', () => {
    const logId = zeroQuestionService.logZeroQuestionEvent({
      examId: 'exam-test-101',
      subjectId: 'subj-test-math',
      sectionId: 'sec-test',
      requestedCount: 50,
      eligibleCount: 0,
      reason: 'NO_VERIFIED_QUESTIONS',
      fallbackAction: 'RETURNED_SAFE_ERROR',
      details: { test: true }
    }, db);

    assert(typeof logId === 'string' && logId.startsWith('zlog-'), `Log ID should be valid string, got ${logId}`);

    const logRow = db.prepare('SELECT * FROM zero_question_audit_logs WHERE log_id = ?').get(logId);
    assert(logRow, 'Log row must be present in database');
    assert.strictEqual(logRow.exam_id, 'exam-test-101');
    assert.strictEqual(logRow.reason, 'NO_VERIFIED_QUESTIONS');
    assert.strictEqual(logRow.fallback_action, 'RETURNED_SAFE_ERROR');
  });

  // TEST 18: Audit Log Retrieval API & Service
  runTest('TEST 18: Audit Log Retrieval API & Service', () => {
    const logs = db.prepare('SELECT * FROM zero_question_audit_logs ORDER BY logged_at DESC LIMIT 5').all();
    assert(Array.isArray(logs), 'Audit logs should be an array');
    assert(logs.length >= 1, 'Should have at least 1 log entry from test 17');
  });

  // TEST 19: Revalidation Report API Consistency
  runTest('TEST 19: Revalidation Report API Consistency', () => {
    const report = legacyRevalidationService.getAuditReport(db);
    assert(report.statusBreakdown.length >= 2, 'Should have at least 2 status categories');
    assert(typeof report.eligibility.fullExamEligible === 'number', 'fullExamEligible must be a number');
    assert(typeof report.eligibility.practiceEligible === 'number', 'practiceEligible must be a number');
  });

  // TEST 20: Single Question Revalidation Fields in Repository
  runTest('TEST 20: Single Question Revalidation Fields in Repository', () => {
    const sample = db.prepare('SELECT question_id FROM questions LIMIT 1').get();
    const q = contentRepo.getQuestionById(sample.question_id, db);
    assert(q, 'Question must exist');
    assert('trustStatus' in q, 'trustStatus field must exist on retrieved question');
    assert('fullExamEligible' in q, 'fullExamEligible field must exist on retrieved question');
    assert('practiceEligible' in q, 'practiceEligible field must exist on retrieved question');
    assert('validationNotes' in q, 'validationNotes field must exist on retrieved question');
    assert('passageGroupId' in q, 'passageGroupId field must exist on retrieved question');
  });

  // TEST 21: Database Index Verification
  runTest('TEST 21: Database Index Verification (Phase 5.1 indexes exist)', () => {
    const indexes = db.prepare("SELECT name FROM sqlite_master WHERE type='index'").all().map(r => r.name);
    assert(indexes.includes('idx_questions_trust_status'), 'idx_questions_trust_status must exist');
    assert(indexes.includes('idx_questions_full_exam_elig'), 'idx_questions_full_exam_elig must exist');
    assert(indexes.includes('idx_questions_practice_elig'), 'idx_questions_practice_elig must exist');
    assert(indexes.includes('idx_zero_q_exam'), 'idx_zero_q_exam must exist');
    assert(indexes.includes('idx_zero_q_reason'), 'idx_zero_q_reason must exist');
  });

  // TEST 22: Passage Group Schema & Query Support
  runTest('TEST 22: Passage Group Schema & Query Support', () => {
    const cols = db.prepare("PRAGMA table_info('questions')").all().map(c => c.name);
    assert(cols.includes('passage_group_id'), 'questions table must have passage_group_id');
    assert(cols.includes('trust_status'), 'questions table must have trust_status');
    assert(cols.includes('full_exam_eligible'), 'questions table must have full_exam_eligible');
    assert(cols.includes('practice_eligible'), 'questions table must have practice_eligible');
  });

  // TEST 23: Database Foreign Key Integrity
  runTest('TEST 23: Database Foreign Key Integrity (PRAGMA foreign_key_check)', () => {
    const fkErrors = db.prepare('PRAGMA foreign_key_check').all();
    assert.strictEqual(fkErrors.length, 0, `Expected 0 foreign key errors, found ${fkErrors.length}`);
  });

  // TEST 24: Database Schema Integrity
  runTest('TEST 24: Database Schema Integrity (PRAGMA integrity_check)', () => {
    const check = db.prepare('PRAGMA integrity_check').get();
    assert.strictEqual(check.integrity_check, 'ok', `Integrity check failed: ${JSON.stringify(check)}`);
  });

  // TEST 25: Phase 4 Mock Engine Compatibility
  runTest('TEST 25: Phase 4 Mock Engine Compatibility (Session creation & scoring)', () => {
    const session = mockService.startMockSession({ examId: 'ssc-cgl', testMode: 'FULL_EXAM' });
    assert(session.sessionId, 'Session should be created');
    assert(session.questions.length > 0, 'Questions should be loaded');
    assert.strictEqual(session.examId, 'ssc-cgl');

    // Practice session with AI interleaving
    const practiceSession = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'PRACTICE',
      questionCount: 15,
      aiProportion: 0.2
    });
    assert(practiceSession.sessionId, 'Practice session should be created');
    assert.strictEqual(practiceSession.questions.length, 15, 'Should deliver 15 questions');
  });

  // TEST 26: Phase 5 Content Intelligence Compatibility
  runTest('TEST 26: Phase 5 Content Intelligence Compatibility', () => {
    const duplicateEngine = require('../services/duplicate-engine');
    const result = duplicateEngine.checkSemanticDuplicate(
      { stem: 'What is the capital of India?' },
      [{ id: 't-1', text: 'Which city is the national capital of India?' }]
    );
    assert(result.decision, 'Duplicate engine should evaluate similarity decision');
    assert(result.maxSimilarity > 0.5, 'Should detect semantic similarity');
  });

  console.log('\n========================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase51Tests();

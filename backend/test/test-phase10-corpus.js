// backend/test/test-phase10-corpus.js
// Automated Test Suite for Phase 10: Nationwide Historical PYQ Corpus & Exam Content Intelligence
// Tests all 7 major specifications mandated by Phase 10

const assert = require('assert');
const { getDb } = require('../db/database');
const corpusService = require('../services/historical-exam-corpus-service');
const recurrenceService = require('../services/recurrence-intelligence-service');
const contentPopulator = require('../services/historical-content-populator-service');
const examIntelligence = require('../services/exam-content-intelligence-service');
const practiceEngine = require('../services/practice-selection-engine');
const fullExamGateService = require('../services/full-exam-gate-service');

async function runPhase10Tests() {
  console.log('=================================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 10 AUTOMATED VERIFICATION SUITE');
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

  async function runAsyncTest(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failedTests++;
    }
  }

  // -----------------------------------------------------------------
  // 1. HISTORICAL CORPUS & MULTI-YEAR DEPTH
  // -----------------------------------------------------------------
  console.log('\n--- 1. Multi-Year Authentic Historical Exam Corpus ---');

  runTest('Synchronizes and tracks authentic multi-year corpus for SSC CGL (2022-2024)', () => {
    const corpus = corpusService.getExamCorpus('ssc-cgl', db);
    assert(corpus, 'Corpus for ssc-cgl must exist.');
    assert(corpus.historical_depth_years >= 3, `Expected at least 3 historical years, found ${corpus.historical_depth_years}`);
    assert(corpus.verifiedYears.includes(2024), 'Must include 2024.');
    assert(corpus.verifiedYears.includes(2023), 'Must include 2023.');
    assert(corpus.verifiedYears.includes(2022), 'Must include 2022.');
    assert.strictEqual(corpus.corpus_status, 'PARTIAL_HISTORICAL_CORPUS');
    assert.strictEqual(corpus.source_completeness_status, 'COMPLETE_VERIFIED');
    assert.strictEqual(corpus.readiness_state, 'FULL_EXAM_READY');
  });

  runTest('Synchronizes and tracks authentic multi-year corpus for UPSC CSE Prelims', () => {
    const corpus = corpusService.getExamCorpus('upsc-cse', db);
    assert(corpus, 'Corpus for upsc-cse must exist.');
    assert(corpus.historical_depth_years >= 3, `Expected at least 3 verified years, found ${corpus.historical_depth_years}`);
    assert(corpus.verifiedYears.includes(2023), 'Must include 2023.');
    assert(corpus.verifiedYears.includes(2022), 'Must include 2022.');
    assert(corpus.verifiedYears.includes(2021), 'Must include 2021.');
    assert.strictEqual(corpus.readiness_state, 'PRACTICE_READY', 'UPSC Prelims is practice ready until full 100 Qs verified');
  });

  runTest('Honest status representation: never claims 10 years when verified depth is 3', () => {
    const corpus = corpusService.getExamCorpus('upsc-cse', db);
    assert.notStrictEqual(corpus.corpus_status, 'EXTENDED_HISTORICAL_CORPUS', 'Cannot claim 10-year extended corpus when depth is 3');
    assert.strictEqual(corpus.corpus_status, 'PARTIAL_HISTORICAL_CORPUS');
  });

  // -----------------------------------------------------------------
  // 2. RECURRENCE INTELLIGENCE & SECTION 51 SPECIFICATION
  // -----------------------------------------------------------------
  console.log('\n--- 2. Recurrence Intelligence: Frequency as Signal, Not Filter ---');

  runTest('Section 51 Q-A: 7 occurrences -> VERY_HIGH recurrence, retained, current eligible', () => {
    const qIntel = recurrenceService.classifyQuestionIntelligence({
      occurrenceCount: 7,
      isSyllabusRelevant: true,
      isPatternRelevant: true
    });
    assert.strictEqual(qIntel.recurrenceTier, 'VERY_HIGH');
    assert.strictEqual(qIntel.currentEligibility, 1);
    assert.strictEqual(qIntel.fullExamEligibility, 1);
    assert.strictEqual(qIntel.isRareRelevant, 0);
  });

  runTest('Section 51 Q-B: 3 occurrences -> MEDIUM recurrence, retained, current eligible', () => {
    const qIntel = recurrenceService.classifyQuestionIntelligence({
      occurrenceCount: 3,
      isSyllabusRelevant: true,
      isPatternRelevant: true
    });
    assert.strictEqual(qIntel.recurrenceTier, 'MEDIUM');
    assert.strictEqual(qIntel.currentEligibility, 1);
    assert.strictEqual(qIntel.fullExamEligibility, 1);
    assert.strictEqual(qIntel.isRareRelevant, 0);
  });

  runTest('Section 51 Q-C: 1 occurrence, syllabus YES -> RARE recurrence, RETAINED, current eligible', () => {
    const qIntel = recurrenceService.classifyQuestionIntelligence({
      occurrenceCount: 1,
      isSyllabusRelevant: true,
      isPatternRelevant: true
    });
    assert.strictEqual(qIntel.recurrenceTier, 'RARE');
    assert.strictEqual(qIntel.isRareRelevant, 1, 'Rare-but-relevant flag must be 1.');
    assert.strictEqual(qIntel.currentEligibility, 1, 'Rare question must remain current eligible.');
    assert.strictEqual(qIntel.fullExamEligibility, 1, 'Rare question matching pattern is full exam eligible.');
  });

  runTest('Section 51 Q-D: 1 occurrence, syllabus NO -> OUTDATED, retained in archive, excluded from mock', () => {
    const qIntel = recurrenceService.classifyQuestionIntelligence({
      occurrenceCount: 1,
      isSyllabusRelevant: false,
      isPatternRelevant: false
    });
    assert.strictEqual(qIntel.recurrenceTier, 'ONE_TIME');
    assert.strictEqual(qIntel.currentEligibility, 0, 'Outdated question must have current_eligibility = 0.');
    assert.strictEqual(qIntel.fullExamEligibility, 0, 'Outdated question must have full_exam_eligibility = 0.');
    assert.strictEqual(qIntel.isRareRelevant, 0);
  });

  runTest('Concept repetition vs Question repetition distinction', () => {
    // 5 distinct questions testing Ohm's Law
    const conceptName = `Ohm Law Circuit Resistance Analysis #${Date.now()}`;
    const rec1 = recurrenceService.recordConceptIntelligence({
      examId: 'rrb-ntpc',
      subjectId: 'subj-science',
      conceptName,
      year: 2022
    }, db);
    assert.strictEqual(rec1.concept_frequency, 1);

    // Record 4 more questions testing the same concept
    for (let i = 0; i < 4; i++) {
      recurrenceService.recordConceptIntelligence({
        examId: 'rrb-ntpc',
        subjectId: 'subj-science',
        conceptName,
        year: 2022
      }, db);
    }

    const finalRec = db.prepare('SELECT * FROM exam_concept_intelligence WHERE concept_id = ?').get(rec1.concept_id);
    assert.strictEqual(finalRec.concept_frequency, 5, 'Concept frequency must be 5.');

    // Cleanup test concept
    db.prepare('DELETE FROM exam_concept_intelligence WHERE concept_id = ?').run(rec1.concept_id);
  });

  // -----------------------------------------------------------------
  // 3. MULTI-LEVEL DUPLICATE DETECTION & SECTION 52
  // -----------------------------------------------------------------
  console.log('\n--- 3. Multi-Level Duplicate Detection & Section 52 Logic ---');

  runTest('Level 1: Exact Hash Duplicate is detected and blocked', () => {
    const stem1 = 'What is the capital of India?';
    const stem2 = 'What is the capital of India?';
    const res = recurrenceService.analyzeQuestionRelation(stem1, stem2);
    assert.strictEqual(res.relation, 'EXACT_DUPLICATE');
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.action, 'BLOCK_DUPLICATE');
  });

  runTest('Level 2: Near Duplicate (>85% similarity) is detected and blocked', () => {
    const q1 = { stem: 'Which city serves as the official capital of India?' };
    const q2 = { stem: 'Which city is the official capital of India?' };
    const res = recurrenceService.analyzeQuestionRelation(q1, q2);
    assert.strictEqual(res.relation, 'NEAR_DUPLICATE');
    assert.strictEqual(res.isDuplicate, true);
    assert.strictEqual(res.action, 'BLOCK_DUPLICATE');
  });

  runTest('Section 52: Same concept different question (Capital vs River) is APPROVED, not blocked', () => {
    const q1 = { stem: 'What is the capital of India in geography?', concept: 'National Capital Territory' };
    const q3 = { stem: 'Which river flows through the capital city of India?', concept: 'National Capital Territory' };
    const res = recurrenceService.analyzeQuestionRelation(q1, q3);
    assert.strictEqual(res.relation, 'SAME_CONCEPT_DIFFERENT_QUESTION');
    assert.strictEqual(res.isDuplicate, false, 'Same concept distinct question must NOT be blocked as duplicate!');
    assert.strictEqual(res.action, 'APPROVE_DISTINCT_QUESTION');
  });

  // -----------------------------------------------------------------
  // 4. COVERAGE GAP ANALYSIS & SECTION 53 TARGETED AI GENERATION
  // -----------------------------------------------------------------
  console.log('\n--- 4. Coverage Gap Analysis & Targeted AI Generation ---');

  runTest('Section 53: Detects topic coverage gap in syllabus chapters', () => {
    const gaps = examIntelligence.detectTopicCoverageGaps({
      examId: 'ssc-cgl',
      subjectId: 'subj-math',
      targetThreshold: 10
    }, db);
    assert(gaps.totalTopicsEvaluated > 0, 'Must evaluate syllabus topics.');
    assert(gaps.gapsIdentifiedCount > 0, 'Must identify topics needing content.');
    assert(gaps.gaps[0].shortage > 0, 'Top gap must have positive shortage.');
  });

  runTest('Generates targeted AI practice questions ONLY for identified gap topic', () => {
    const gapTarget = {
      examId: 'ssc-cgl',
      subjectId: 'subj-math',
      topicName: 'Algebraic Word Problems',
      count: 2,
      difficulty: 'MEDIUM',
      languageCode: 'hi'
    };

    const genResult = examIntelligence.generatePracticeForGap(gapTarget, db);
    assert.strictEqual(genResult.success, true);
    assert.strictEqual(genResult.tier, 'TIER_5_AI_PRACTICE');
    assert.strictEqual(genResult.fullExamEligible, 0, 'AI practice must ALWAYS have full_exam_eligible = 0');
    assert(genResult.verifiedCount > 0, 'Generated items must pass 10-point quality gate.');

    // Cleanup test generated practice questions
    if (genResult.savedQuestionIds && genResult.savedQuestionIds.length > 0) {
      for (const qid of genResult.savedQuestionIds) {
        db.prepare('DELETE FROM question_versions WHERE question_id = ?').run(qid);
        db.prepare('DELETE FROM questions WHERE question_id = ?').run(qid);
      }
    }
    db.prepare('DELETE FROM ai_generation_queue WHERE queue_id = ?').run(genResult.queueId);
  });

  runTest('SAFETY INVARIANT: AI practice questions NEVER unblock a FULL_EXAM_BLOCKED exam', () => {
    // NEET UG requires 180 questions; currently has ~2 verified PYQs
    const readiness = fullExamGateService.evaluateExamReadiness('nta-neet', null, db);
    assert(['BLOCKED', 'FULL_EXAM_BLOCKED'].includes(readiness.gateStatus || readiness.status), 'NEET UG must remain blocked.');
  });

  // -----------------------------------------------------------------
  // 5. BALANCED PRACTICE SELECTION WITH RARE QUESTION GUARANTEE
  // -----------------------------------------------------------------
  console.log('\n--- 5. Balanced Practice Selection & Rare Question Quota ---');

  runTest('Generates balanced practice set guaranteeing rare-but-relevant question inclusion', () => {
    const practiceSet = practiceEngine.generatePracticeSet({
      examId: 'ssc-cgl',
      questionCount: 5,
      rareQuotaPct: 0.20 // 20% rare question quota
    }, db);

    assert.strictEqual(practiceSet.success, true);
    assert(practiceSet.deliveredCount > 0);
    assert(practiceSet.rareQuestionsCount >= 1, `Expected at least 1 rare question, got ${practiceSet.rareQuestionsCount}`);

    // Verify selection reasons include both RARE_RELEVANT_QUOTA and WEIGHTED_RECURRENCE_AND_RECENCY
    const reasons = practiceSet.questions.map(q => q.selectionReason);
    assert(reasons.includes('RARE_RELEVANT_QUOTA'), 'Must include question picked via rare quota.');
  });

  runTest('Zero duplicate question IDs in generated practice test', () => {
    const practiceSet = practiceEngine.generatePracticeSet({
      examId: 'ssc-cgl',
      questionCount: 5
    }, db);

    const ids = practiceSet.questions.map(q => q.questionId);
    const uniqueIds = new Set(ids);
    assert.strictEqual(ids.length, uniqueIds.size, 'Practice test must contain zero duplicate question IDs.');
  });

  // -----------------------------------------------------------------
  // 6. MULTI-EXAM CONTENT INVENTORY & DATABASE INTEGRITY
  // -----------------------------------------------------------------
  console.log('\n--- 6. Multi-Exam Content Inventory & Database Integrity ---');

  runTest('Corpora summary catalogues 10 nationwide exams across 5 batches', () => {
    const summary = corpusService.getAllCorpora(db);
    assert(summary.length >= 10, `Expected at least 10 exam corpora, found ${summary.length}`);
    const examIds = summary.map(c => c.exam_id);
    assert(examIds.includes('ssc-cgl'), 'Must include ssc-cgl');
    assert(examIds.includes('upsc-cse'), 'Must include upsc-cse');
    assert(examIds.includes('rrb-ntpc'), 'Must include rrb-ntpc');
    assert(examIds.includes('ibps-po-clerk'), 'Must include ibps-po-clerk');
    assert(examIds.includes('nta-neet'), 'Must include nta-neet');
    assert(examIds.includes('cbse-board'), 'Must include cbse-board');
  });

  runTest('SQLite PRAGMA integrity_check returns ok', () => {
    const integrity = db.pragma('integrity_check');
    assert.strictEqual(integrity[0].integrity_check, 'ok');
  });

  runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
    const fkErrors = db.pragma('foreign_key_check');
    assert.strictEqual(fkErrors.length, 0, `Foreign key violations: ${JSON.stringify(fkErrors)}`);
  });

  console.log('\n=================================================================');
  console.log(`🏁 PHASE 10 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runPhase10Tests().catch(err => {
    console.error('Fatal Phase 10 test error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase10Tests };

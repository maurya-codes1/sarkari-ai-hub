// backend/test/test-phase4-mock.js
// Automated Test Suite for Phase 4: Blueprint-Driven Mock Test Engine
// Validates Cases 1 through 15 as mandated by Phase 4 Specification

const assert = require('assert');
const mockService = require('../services/mock-service');
const blueprintRepo = require('../db/repositories/blueprint-repository');
const questionRepo = require('../db/repositories/question-repository');
const mockSessionRepo = require('../db/repositories/mock-session-repository');

async function runPhase4Tests() {
  console.log('========================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 4 MOCK ENGINE TEST SUITE');
  console.log('========================================================\n');

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

  // CASE 1: Full mock with one section
  runTest('CASE 1: Full mock with one section', () => {
    const session = mockService.startMockSession({ examId: 'cbse-board', testMode: 'FULL_EXAM' });
    assert(session.success, 'Session should start successfully');
    assert(session.sections.length >= 1, 'Should have at least 1 section');
    assert(session.questions.length > 0, 'Should load questions');
  });

  // CASE 2: Full mock with multiple sections
  runTest('CASE 2: Full mock with multiple sections (SSC CGL 4 Sections)', () => {
    const session = mockService.startMockSession({ examId: 'ssc-cgl', testMode: 'FULL_EXAM' });
    assert.strictEqual(session.sections.length, 4, 'SSC CGL should have exactly 4 sections');
    assert.strictEqual(session.questions.length, 100, 'SSC CGL should have 100 questions');
    const secNames = session.sections.map(s => s.name);
    assert(secNames.some(n => n.includes('Reasoning')), 'Should include Reasoning section');
    assert(secNames.some(n => n.includes('Awareness')), 'Should include Awareness section');
    assert(secNames.some(n => n.includes('Aptitude')), 'Should include Aptitude section');
    assert(secNames.some(n => n.includes('English')), 'Should include English section');
  });

  // CASE 3: QuestionsToAttempt < totalQuestions
  runTest('CASE 3: QuestionsToAttempt < totalQuestions (NEET UG Section B Choice)', () => {
    const session = mockService.startMockSession({ examId: 'nta-neet', testMode: 'FULL_EXAM' });
    assert(session.blueprint.questionsToAttempt < session.blueprint.totalQuestions, 'questionsToAttempt must be less than totalQuestions');
    assert.strictEqual(session.blueprint.totalQuestions, 200, 'NEET UG total questions should be 200');
    assert.strictEqual(session.blueprint.questionsToAttempt, 180, 'NEET UG attempt target should be 180');
  });

  // CASE 4: Negative marking
  runTest('CASE 4: Negative marking deduction calculation', () => {
    const session = mockService.startMockSession({ examId: 'ssc-cgl', testMode: 'FULL_EXAM' });
    const q1 = session.questions[0];
    const q2 = session.questions[1];

    // Submit: Q1 correct (+2.0), Q2 wrong (-0.50)
    // To ensure Q1 is correct and Q2 is wrong, inspect real answers from DB
    const realQs = questionRepo.getQuestionsByIds([q1.id, q2.id]);
    const q1Ans = JSON.parse(realQs.find(q => q.question_id === q1.id).correct_answer).index;
    const q2Ans = JSON.parse(realQs.find(q => q.question_id === q2.id).correct_answer).index;
    const q2WrongAns = (q2Ans + 1) % 4;

    const sub = mockService.submitMockSession({
      sessionId: session.sessionId,
      userAnswers: { [q1.id]: q1Ans, [q2.id]: q2WrongAns },
      timeSpentSeconds: 120
    });

    assert.strictEqual(sub.scorecard.summary.correct, 1, 'Should have 1 correct');
    assert.strictEqual(sub.scorecard.summary.wrong, 1, 'Should have 1 wrong');
    assert(sub.scorecard.summary.negativeMarksDeducted > 0, 'Negative marks must be deducted');
    assert.strictEqual(sub.scorecard.summary.netScore, 1.5, 'Net score should be 2.0 - 0.5 = 1.5');
  });

  // CASE 5: No negative marking
  runTest('CASE 5: No negative marking (CBSE Board scheme)', () => {
    const session = mockService.startMockSession({ examId: 'cbse-board', testMode: 'FULL_EXAM' });
    const q1 = session.questions[0];
    const q2 = session.questions[1];

    const realQs = questionRepo.getQuestionsByIds([q1.id, q2.id]);
    const q1Ans = JSON.parse(realQs.find(q => q.question_id === q1.id).correct_answer).index;
    const q2Ans = JSON.parse(realQs.find(q => q.question_id === q2.id).correct_answer).index;
    const q2WrongAns = (q2Ans + 1) % 4;

    const sub = mockService.submitMockSession({
      sessionId: session.sessionId,
      userAnswers: { [q1.id]: q1Ans, [q2.id]: q2WrongAns },
      timeSpentSeconds: 60
    });

    assert.strictEqual(sub.scorecard.summary.correct, 1, 'Should have 1 correct');
    assert.strictEqual(sub.scorecard.summary.wrong, 1, 'Should have 1 wrong');
    assert.strictEqual(sub.scorecard.summary.negativeMarksDeducted, 0, 'No negative marks should be deducted');
    assert.strictEqual(sub.scorecard.summary.netScore, 1, 'Net score should be 1.0 (no penalty)');
  });

  // CASE 6: Bilingual question
  runTest('CASE 6: Bilingual question dual-medium rendering', () => {
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'FULL_EXAM',
      languageConfig: { primary: 'hi', secondary: 'en' }
    });
    const sampleQ = session.questions.find(q => q.secondaryQ && q.secondaryQ.length > 0);
    assert(sampleQ, 'Should contain questions with secondary language text');
    assert(sampleQ.q.length > 0, 'Primary question text should exist');
    assert(sampleQ.secondaryQ.length > 0, 'Secondary question text should exist');
  });

  // CASE 7: Monolingual language subject
  runTest('CASE 7: Monolingual language subject (General English)', () => {
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'PRACTICE',
      subjectId: 'subj-english',
      requestedCount: 10
    });
    assert(session.questions.every(q => q.subjectId === 'subj-english'), 'All questions must belong to English');
  });

  // CASE 8: Question language different from UI language
  runTest('CASE 8: Question language independent from UI language', () => {
    // UI language is 'en', but Exam paper medium is Hindi
    const session = mockService.startMockSession({
      examId: 'ssc-gd',
      testMode: 'FULL_EXAM',
      languageConfig: { primary: 'hi', secondary: 'en' }
    });
    assert(session.questions[0].q, 'Question should render in Hindi medium independently');
  });

  // CASE 9: Different option language configuration
  runTest('CASE 9: Different option language configuration', () => {
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'FULL_EXAM',
      languageConfig: { primary: 'hi', secondary: 'en', optionMode: 'bilingual' }
    });
    assert(Array.isArray(session.questions[0].options), 'Options must be present as array');
    assert(session.questions[0].options.length >= 2, 'Options array must contain choices');
  });

  // CASE 10: Countdown reaching zero / auto-submit
  runTest('CASE 10: Auto-submit on countdown timer expiration', () => {
    const session = mockService.startMockSession({ examId: 'ssc-gd', testMode: 'FULL_EXAM' });
    const sub = mockService.submitMockSession({
      sessionId: session.sessionId,
      userAnswers: {},
      timeSpentSeconds: session.timerConfig.totalSeconds,
      isAutoSubmit: true
    });
    assert.strictEqual(sub.scorecard.isAutoSubmit, true, 'isAutoSubmit must be true');
    assert.strictEqual(sub.scorecard.status, 'EXPIRED', 'Status must be EXPIRED upon timer timeout');
  });

  // CASE 11: Duplicate candidate question selection prevention
  runTest('CASE 11: Strict zero duplicate question ID prevention within single mock', () => {
    const session = mockService.startMockSession({ examId: 'ssc-cgl', testMode: 'FULL_EXAM' });
    const qIds = session.questions.map(q => q.id);
    const uniqueIds = new Set(qIds);
    assert.strictEqual(qIds.length, uniqueIds.size, 'Every question ID in mock must be strictly unique');
    assert.strictEqual(qIds.length, 100, 'Must have 100 distinct questions');
  });

  // CASE 12: Insufficient question inventory handling
  runTest('CASE 12: Insufficient question inventory handling without repetition', () => {
    // Request a practice session for subj-sociology (which has 166 questions in DB) with 200 questions
    const session = mockService.startMockSession({
      examId: 'bihar-police-constable',
      testMode: 'PRACTICE',
      subjectId: 'subj-sociology',
      requestedCount: 200
    });
    const qIds = session.questions.map(q => q.id);
    const uniqueIds = new Set(qIds);
    assert.strictEqual(qIds.length, uniqueIds.size, 'No duplicates must be created when inventory is exhausted');
    assert(session.blueprint.hasInsufficientInventory, 'Should report insufficient inventory flag');
  });

  // CASE 13: Legacy blueprint incomplete / pending verification
  runTest('CASE 13: Legacy blueprint pending verification notice (No fake official claim)', () => {
    // An exam that only has a legacy blueprint
    const session = mockService.startMockSession({ examId: 'up-police-constable', testMode: 'FULL_EXAM' });
    assert.strictEqual(session.blueprint.verificationStatus, 'NEEDS_REVIEW', 'Legacy blueprint must be NEEDS_REVIEW');
    assert.strictEqual(session.blueprint.patternBadge, 'Pattern data pending verification', 'Must display pending verification badge');
    assert.strictEqual(session.blueprint.isVerified, false, 'isVerified must be false');
  });

  // CASE 14: Database unavailable fallback
  runTest('CASE 14: Database unavailable graceful fallback', () => {
    // Trigger offline fallback generator directly
    const fallbackSession = mockService._generateOfflineFallbackSession('mock-offline-test', 'ssc-cgl', 'FULL_EXAM', 30, 'all');
    assert.strictEqual(fallbackSession.isOfflineFallback, true, 'isOfflineFallback should be true');
    assert.strictEqual(fallbackSession.blueprint.verificationStatus, 'OFFLINE_FALLBACK');

    const fallbackSub = mockService._evaluateOfflineSubmission({ userAnswers: { 'q1': 0 }, timeSpentSeconds: 45, isAutoSubmit: false });
    assert.strictEqual(fallbackSub.success, true, 'Fallback submission should succeed');
    assert.strictEqual(fallbackSub.scorecard.summary.attempted, 1, 'Should evaluate submitted answers');
  });

  // CASE 15: Practice mode flexibility
  runTest('CASE 15: Practice mode configurable quantities and stopwatch timer', () => {
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'PRACTICE',
      requestedCount: 20,
      subjectId: 'subj-math',
      difficulty: 'HARD',
      timerMode: 'STOPWATCH'
    });
    assert(['PRACTICE', 'SUBJECT_PRACTICE'].includes(session.testMode), 'Test mode must be PRACTICE or SUBJECT_PRACTICE');
    assert.strictEqual(session.timerConfig.mode, 'STOPWATCH', 'Timer mode must be STOPWATCH');
    assert.strictEqual(session.questions.length, 20, 'Should load requested 20 questions');
    assert(session.questions.every(q => q.subjectId === 'subj-math'), 'All questions must match subject filter');
  });

  console.log('\n========================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runPhase4Tests();
}

module.exports = { runPhase4Tests };

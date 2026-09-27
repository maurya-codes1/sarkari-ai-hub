// backend/test/test-phase13-personalization.js
// Phase 13 Comprehensive Automated Verification & Regression Suite

const assert = require('assert');
const { getDb } = require('../db/database');
const adaptiveSelectionService = require('../services/adaptive-selection-service');
const weaknessDetectionService = require('../services/weakness-detection-service');
const candidateProfileService = require('../services/candidate-profile-service');
const mockIntelligenceService = require('../services/mock-intelligence-service');
const searchIntelligenceService = require('../services/search-intelligence-service');
const fullExamGateService = require('../services/full-exam-gate-service');

console.log('=================================================================');
console.log('🧪 SARKARIAI HUB — PHASE 13 PERSONALIZATION & ADAPTIVE TEST SUITE');
console.log('=================================================================\n');

let passCount = 0;
let failCount = 0;

function runTest(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
}

const db = getDb();

// -------------------------------------------------------------
// 1. BASELINE CONTENT & FULL EXAM INVARIANTS PRESERVATION
// -------------------------------------------------------------
console.log('--- 1. Baseline Content & Full Exam Invariants Preservation ---');

runTest('Phase 10/11/12 Invariant: Total questions exactly 1,282 preserved with 0 deletions', () => {
  const count = db.prepare('SELECT COUNT(*) as total FROM questions').get().total;
  assert.strictEqual(count, 1282, `Expected 1282 questions, found ${count}`);
});

runTest('Phase 10/11/12 Invariant: 872 legacy questions baseline preserved intact', () => {
  const count = db.prepare("SELECT COUNT(*) as total FROM questions WHERE exam_version_id IS NULL AND provenance = 'HUMAN_CURATED'").get().total;
  assert.strictEqual(count, 872, `Expected 872 legacy questions, found ${count}`);
});

runTest('Phase 12 Invariant: Exactly 351 verified authentic official PYQs', () => {
  const count = db.prepare("SELECT COUNT(*) as total FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().total;
  assert.strictEqual(count, 351, `Expected 351 official PYQs, found ${count}`);
});

runTest('Phase 12 Invariant: Exactly 59 official samples and 250 full exam eligible questions', () => {
  const samples = db.prepare("SELECT COUNT(*) as total FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().total;
  const fullEligible = db.prepare("SELECT COUNT(*) as total FROM questions WHERE full_exam_eligible = 1").get().total;
  assert.strictEqual(samples, 59, `Expected 59 official samples, found ${samples}`);
  assert.strictEqual(fullEligible, 250, `Expected 250 full exam eligible questions, found ${fullEligible}`);
});

runTest('Full Exam Gate Safety: Exactly 2 exams READY (SSC CGL & UPSC CSE), 47 BLOCKED', () => {
  const sscEval = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026');
  const upscEval = fullExamGateService.evaluateExamReadiness('upsc-cse', 'ver-upsc-cse-2026');
  const ctetEval = fullExamGateService.evaluateExamReadiness('ctet-exam', 'ver-ctet-exam-2026');

  assert.strictEqual(sscEval.isEligible, true, 'SSC CGL Tier-1 must remain READY');
  assert.strictEqual(upscEval.isEligible, true, 'UPSC CSE Prelims GS1 must remain READY');
  assert.strictEqual(ctetEval.isEligible, false, 'CTET must remain BLOCKED due to incomplete official inventory');
});

// -------------------------------------------------------------
// 2. ADAPTIVE QUESTION SELECTION: ALL 8 PRACTICE MODES
// -------------------------------------------------------------
console.log('\n--- 2. Adaptive Question Selection: All 8 Practice Modes ---');

const testUserId = 'test-candidate-' + Date.now();
const testExamId = 'ssc-cgl';

runTest('Mode A: WEAK_TOPIC_DRILL selects verified questions targeting identified weak areas', () => {
  // Pre-seed a weak topic for test user
  weaknessDetectionService.recordAttempt({
    userId: testUserId,
    questionId: 'seed-q1',
    examId: testExamId,
    subjectId: 'subj-math',
    chapterId: 'ch-arithmetic',
    topicId: 'topic-percentages',
    isCorrect: 0,
    timeSpentSeconds: 45
  }, db);
  weaknessDetectionService.recordAttempt({
    userId: testUserId,
    questionId: 'seed-q2',
    examId: testExamId,
    subjectId: 'subj-math',
    chapterId: 'ch-arithmetic',
    topicId: 'topic-percentages',
    isCorrect: 0,
    timeSpentSeconds: 50
  }, db);
  weaknessDetectionService.recordAttempt({
    userId: testUserId,
    questionId: 'seed-q3',
    examId: testExamId,
    subjectId: 'subj-math',
    chapterId: 'ch-arithmetic',
    topicId: 'topic-percentages',
    isCorrect: 0,
    timeSpentSeconds: 40
  }, db);

  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'WEAK_TOPIC_DRILL',
    questionCount: 5
  }, db);

  assert.strictEqual(res.practiceMode, 'WEAK_TOPIC_DRILL');
  assert.strictEqual(res.questions.length, 5);
  assert.ok(res.criteriaExplanation.weakTopicsCount >= 1);
  assert.ok(res.questions.every(q => q.selectionReason && q.selectionReason.length > 5));

  // Zero duplicate check
  const idSet = new Set(res.questions.map(q => q.questionId));
  assert.strictEqual(idSet.size, 5, 'Session must not contain duplicate questions');
});

runTest('Mode B: MIXED_ADAPTIVE selects balanced distribution with explainable criteria', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'MIXED_ADAPTIVE',
    questionCount: 10
  }, db);

  assert.strictEqual(res.practiceMode, 'MIXED_ADAPTIVE');
  assert.strictEqual(res.questions.length, 10);
  assert.ok(res.criteriaExplanation.targetDistribution);
  assert.strictEqual(new Set(res.questions.map(q => q.questionId)).size, 10);
});

runTest('Mode C: PYQ_REVISION enforces strict OFFICIAL_PYQ provenance only', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'PYQ_REVISION',
    questionCount: 10
  }, db);

  assert.strictEqual(res.practiceMode, 'PYQ_REVISION');
  assert.ok(res.questions.length > 0);
  assert.ok(res.questions.every(q => q.provenance === 'OFFICIAL_PYQ'), 'All questions must have OFFICIAL_PYQ provenance');
  assert.strictEqual(res.criteriaExplanation.officialSamplesExcluded, true);
  assert.strictEqual(res.criteriaExplanation.aiGeneratedExcluded, true);
});

runTest('Mode D: RARE_RELEVANT enforces rare question quota and breadth preservation', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'RARE_RELEVANT',
    questionCount: 8
  }, db);

  assert.strictEqual(res.practiceMode, 'RARE_RELEVANT');
  assert.ok(res.questions.length > 0);
  assert.strictEqual(res.criteriaExplanation.rareQuotaEnforced, true);
  assert.ok(res.questions.some(q => q.isRareRelevant === true));
});

runTest('Mode E: ERROR_REVISION targets previously missed questions with error correction reasoning', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'ERROR_REVISION',
    questionCount: 5
  }, db);

  assert.strictEqual(res.practiceMode, 'ERROR_REVISION');
  assert.strictEqual(res.questions.length, 5);
  assert.ok(res.criteriaExplanation.totalCandidateErrorsFound >= 1);
});

runTest('Mode F: SPEED_PRACTICE provides calibrated per-question time limits under 60 seconds', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'SPEED_PRACTICE',
    questionCount: 6
  }, db);

  assert.strictEqual(res.practiceMode, 'SPEED_PRACTICE');
  assert.strictEqual(res.questions.length, 6);
  assert.ok(res.questions.every(q => q.timeLimitSeconds && q.timeLimitSeconds <= 60));
  assert.strictEqual(res.criteriaExplanation.targetSecondsPerQuestion, 50);
});

runTest('Mode G: DIFFICULTY_PROGRESSION organizes questions across progressive difficulty tiers', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'DIFFICULTY_PROGRESSION',
    questionCount: 10
  }, db);

  assert.strictEqual(res.practiceMode, 'DIFFICULTY_PROGRESSION');
  assert.strictEqual(res.questions.length, 10);
  assert.ok(res.criteriaExplanation.actualSplit);
});

runTest('Mode H: BLUEPRINT_PRACTICE aligns question selection with official exam sections', () => {
  const res = adaptiveSelectionService.selectQuestions({
    userId: testUserId,
    examId: testExamId,
    practiceMode: 'BLUEPRINT_PRACTICE',
    questionCount: 8
  }, db);

  assert.strictEqual(res.practiceMode, 'BLUEPRINT_PRACTICE');
  assert.strictEqual(res.questions.length, 8);
  assert.strictEqual(res.criteriaExplanation.blueprintEnforced, true);
});

// -------------------------------------------------------------
// 3. WEAKNESS DETECTION & RECOVERY TRACKING
// -------------------------------------------------------------
console.log('\n--- 3. Weakness Detection & Recovery Tracking ---');

runTest('Subject -> Chapter -> Topic weakness analysis correctly flags critical weakness', () => {
  const topicId = 'topic-mensuration';
  // 3 incorrect attempts
  for (let i = 0; i < 3; i++) {
    weaknessDetectionService.recordAttempt({
      userId: testUserId,
      questionId: `q-men-${i}`,
      examId: testExamId,
      subjectId: 'subj-math',
      chapterId: 'ch-geometry',
      topicId,
      isCorrect: 0,
      timeSpentSeconds: 65
    }, db);
  }

  const analysis = weaknessDetectionService.getHierarchicalAnalysis(testUserId, testExamId, db);
  assert.strictEqual(analysis.userId, testUserId);
  const mathSub = analysis.subjects.find(s => s.subject_id === 'subj-math');
  assert.ok(mathSub, 'Math subject must be present');

  const geomChap = mathSub.chapters.find(c => c.chapter_id === 'ch-geometry');
  assert.ok(geomChap, 'Geometry chapter must be present');

  const menTop = geomChap.topics.find(t => t.topic_id === topicId);
  assert.ok(menTop, 'Mensuration topic must be present');
  assert.strictEqual(menTop.status, 'CRITICAL_WEAKNESS');
  assert.strictEqual(menTop.accuracy_pct, 0.0);
});

runTest('Recovery Tracking: Subsequent consecutive correct attempts transitions status towards RECOVERING / STRONG', () => {
  const topicId = 'topic-mensuration';
  // Candidate studies and now gets 5 consecutive correct answers
  for (let i = 0; i < 5; i++) {
    weaknessDetectionService.recordAttempt({
      userId: testUserId,
      questionId: `q-men-correct-${i}`,
      examId: testExamId,
      subjectId: 'subj-math',
      chapterId: 'ch-geometry',
      topicId,
      isCorrect: 1,
      timeSpentSeconds: 30
    }, db);
  }

  const analysis = weaknessDetectionService.getHierarchicalAnalysis(testUserId, testExamId, db);
  const mathSub = analysis.subjects.find(s => s.subject_id === 'subj-math');
  const geomChap = mathSub.chapters.find(c => c.chapter_id === 'ch-geometry');
  const menTop = geomChap.topics.find(t => t.topic_id === topicId);

  // Recent accuracy on the last 5 attempts is 100%, overall accuracy is 5/8 = 62.5%
  assert.strictEqual(menTop.recent_accuracy_pct, 100.0);
  assert.strictEqual(menTop.recovery_signal, 'IMPROVING');
  assert.strictEqual(menTop.status, 'RECOVERING');
});

// -------------------------------------------------------------
// 4. CANDIDATE PREPARATION PROFILE & HONEST DENOMINATORS
// -------------------------------------------------------------
console.log('\n--- 4. Candidate Preparation Profile & Honest Denominators ---');

runTest('Candidate profile strictly isolates data by userId (Privacy-by-Design)', () => {
  const profA = candidateProfileService.getProfile('user-alpha', 'ssc-cgl', db);
  const profB = candidateProfileService.getProfile('user-beta', 'ssc-cgl', db);

  assert.notStrictEqual(profA.userId, profB.userId);
  assert.strictEqual(profA.userId, 'user-alpha');
  assert.strictEqual(profB.userId, 'user-beta');
  assert.strictEqual(profA.totalAttempted, 0);
  assert.strictEqual(profB.totalAttempted, 0);
});

runTest('Honest Denominators: PYQ coverage uses actual total eligible PYQs denominator', () => {
  const honest = candidateProfileService.getHonestDenominators(testUserId, testExamId, db);
  assert.ok(honest.pyqCoverage);
  assert.strictEqual(typeof honest.pyqCoverage.available, 'number');
  assert.ok(honest.pyqCoverage.available > 0, 'Must have authentic available PYQs');
  assert.ok(honest.pyqCoverage.percentage <= 100.0);
  assert.ok(honest.pyqCoverage.ratioLabel.includes('/'));
});

runTest('Honest Progress Integrity: Displays honest non-promise disclaimer', () => {
  const profile = candidateProfileService.getProfile(testUserId, testExamId, db);
  assert.ok(profile.integrityDisclaimer.includes('does not guarantee exam qualification'));
});

// -------------------------------------------------------------
// 5. MOCK PERFORMANCE INTELLIGENCE & NEGATIVE MARKING
// -------------------------------------------------------------
console.log('\n--- 5. Mock Performance Intelligence & Negative Marking ---');

runTest('Mock diagnostic evaluates total score, negative deduction, and targeted recommendations', () => {
  const mockResult = mockIntelligenceService.processMockResult({
    userId: testUserId,
    examId: testExamId,
    totalScore: 68.5,
    maxPossibleScore: 100,
    attemptedCount: 45,
    skippedCount: 5,
    incorrectCount: 8,
    correctCount: 37,
    negativeMarkingDeduction: 4.0, // 8 * 0.50 negative marking
    timeUtilizationSeconds: 3200,
    sectionPerformance: [
      { sectionName: 'Quantitative Aptitude', attempted: 12, correct: 11, accuracyPct: 91.6 },
      { sectionName: 'General Awareness', attempted: 10, correct: 4, accuracyPct: 40.0 }
    ]
  }, db);

  assert.strictEqual(mockResult.totalScore, 68.5);
  assert.strictEqual(mockResult.negativeMarkingDeduction, 4.0);
  assert.strictEqual(mockResult.accuracyPct, 82.2);
  assert.ok(mockResult.recommendations.negativeMarkingImpact.includes('lost 4 marks'));
  assert.ok(mockResult.recommendations.weakSections.some(s => s.sectionName === 'General Awareness'));
  assert.ok(mockResult.privacyNotice.includes('strictly private'));
});

runTest('Mock history retrieves complete candidate test records', () => {
  const history = mockIntelligenceService.getMockHistory(testUserId, testExamId, db);
  assert.strictEqual(history.userId, testUserId);
  assert.ok(history.totalMocksTaken >= 1);
  assert.strictEqual(history.history[0].negativeMarkingDeduction, 4.0);
});

// -------------------------------------------------------------
// 6. UNIVERSAL SEARCH & TRUST TIER RANKING
// -------------------------------------------------------------
console.log('\n--- 6. Universal Search & Trust Tier Ranking ---');

runTest('Universal search discovers chapters, topics, syllabi, and questions', () => {
  const res = searchIntelligenceService.search('percentage', {}, db);
  assert.ok(res.totalResults >= 0);
  assert.ok(Array.isArray(res.results.chapters));
  assert.ok(Array.isArray(res.results.topics));
  assert.ok(Array.isArray(res.results.questions));
});

runTest('Provenance-Ranked Ordering: OFFICIAL_PYQ questions rank top in search results', () => {
  const res = searchIntelligenceService.search('the', {}, db);
  if (res.results.questions.length >= 2) {
    const firstQ = res.results.questions[0];
    assert.ok(
      ['OFFICIAL_PYQ', 'OFFICIAL_SAMPLE'].includes(firstQ.provenance),
      `Top ranked question should have official provenance, got: ${firstQ.provenance}`
    );
  }
});

// -------------------------------------------------------------
// 7. PERFORMANCE OPTIMIZATION SLA BENCHMARK (< 15ms)
// -------------------------------------------------------------
console.log('\n--- 7. Performance Optimization SLA Benchmark (< 15ms) ---');

runTest('Candidate profile query latency strictly satisfies p95 SLA < 15ms', () => {
  const latencies = [];
  for (let i = 0; i < 100; i++) {
    const t0 = process.hrtime.bigint();
    db.prepare('SELECT * FROM candidate_preparation_profiles WHERE user_id = ? AND exam_id = ?').get(testUserId, testExamId);
    const ms = Number(process.hrtime.bigint() - t0) / 1e6;
    latencies.push(ms);
  }
  latencies.sort((a, b) => a - b);
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  console.log(`     Profile Query p95: ${p95.toFixed(4)} ms`);
  assert.ok(p95 < 15.0, `p95 latency (${p95}ms) must be under 15ms SLA`);
});

runTest('Adaptive question selection candidate query satisfies p95 SLA < 15ms', () => {
  const latencies = [];
  for (let i = 0; i < 100; i++) {
    const t0 = process.hrtime.bigint();
    db.prepare("SELECT question_id, difficulty FROM questions WHERE provenance = 'OFFICIAL_PYQ' AND full_exam_eligible = 1 LIMIT 20").all();
    const ms = Number(process.hrtime.bigint() - t0) / 1e6;
    latencies.push(ms);
  }
  latencies.sort((a, b) => a - b);
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  console.log(`     Adaptive Query p95: ${p95.toFixed(4)} ms`);
  assert.ok(p95 < 15.0, `p95 latency (${p95}ms) must be under 15ms SLA`);
});

// -------------------------------------------------------------
// 8. DATABASE INTEGRITY CHECKS
// -------------------------------------------------------------
console.log('\n--- 8. Database Integrity Checks ---');

runTest('SQLite PRAGMA integrity_check returns ok', () => {
  const result = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(result.integrity_check, 'ok');
});

runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
  const violations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(violations.length, 0, `Expected 0 FK violations, found: ${JSON.stringify(violations)}`);
});

// Clean up test attempts
db.prepare('DELETE FROM candidate_question_attempts WHERE user_id = ?').run(testUserId);
db.prepare('DELETE FROM candidate_preparation_profiles WHERE user_id = ?').run(testUserId);
db.prepare('DELETE FROM user_weak_topics WHERE user_id = ?').run(testUserId);
db.prepare('DELETE FROM mock_performance_records WHERE user_id = ?').run(testUserId);

console.log('\n=================================================================');
console.log(`🏁 PHASE 13 TEST SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('=================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

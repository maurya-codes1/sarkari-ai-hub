// backend/test/test-phase15-user-journeys.js
// Phase 15 Production User Journey Verification Suite
// Executes Complete User Journeys A through H across UI, API, Services, and Database.

const assert = require('assert');
const { getDb } = require('../db/database');
const searchIntelligenceService = require('../services/search-intelligence-service');
const practiceSelectionEngine = require('../services/practice-selection-engine');
const adaptiveSelectionService = require('../services/adaptive-selection-service');
const weaknessDetectionService = require('../services/weakness-detection-service');
const candidateProfileService = require('../services/candidate-profile-service');
const mockService = require('../services/mock-service');
const mockIntelligenceService = require('../services/mock-intelligence-service');
const preparationPlanService = require('../services/preparation-plan-service');
const spacedRevisionService = require('../services/spaced-revision-service');
const pdfOmrGenerator = require('../services/pdf-omr-generator');
const schoolBoardService = require('../services/school-board-academic-service');

console.log('=================================================================');
console.log('🚀 SARKARIAI HUB — PHASE 15 PRODUCTION USER JOURNEYS SUITE');
console.log('=================================================================\n');

let passCount = 0;
let failCount = 0;

function runJourney(name, fn) {
  try {
    fn();
    console.log(`  ✅ JOURNEY PASSED: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ JOURNEY FAILED: ${name}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
}

async function runAsyncJourney(name, fn) {
  try {
    await fn();
    console.log(`  ✅ JOURNEY PASSED: ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ❌ JOURNEY FAILED: ${name}`);
    console.error(`     Reason: ${err.message}`);
    failCount++;
  }
}

const db = getDb();
const journeyUser = 'journey-test-candidate-' + Date.now();

async function main() {
  // -------------------------------------------------------------
  // JOURNEY A: Home -> Search Exam -> Exam Page -> Syllabus -> Practice -> Result -> Revision
  // -------------------------------------------------------------
  console.log('--- JOURNEY A: Exam Search -> Syllabus -> Practice -> Result -> Revision ---');
  runJourney('Journey A: End-to-end exam discovery and practice loop', () => {
    // 1. Search for exam
    const searchRes = searchIntelligenceService.search('cgl', {}, db);
    assert.ok(searchRes.results.exams.length > 0, 'Must find SSC CGL in search');
    const targetExam = searchRes.results.exams[0];
    assert.strictEqual(targetExam.id, 'ssc-cgl');

    // 2. Load Syllabus chapters for exam
    const chapters = db.prepare(`
      SELECT sc.* FROM syllabus_chapters sc
      JOIN syllabi s ON sc.syllabus_id = s.syllabus_id
      WHERE s.exam_version_id LIKE '%ssc-cgl%'
    `).all();
    assert.ok(chapters.length > 0, 'Must retrieve syllabus chapters');

    // 3. Generate balanced practice set
    const practice = practiceSelectionEngine.generatePracticeSet({
      examId: 'ssc-cgl',
      questionCount: 5
    }, db);
    assert.strictEqual(practice.success, true);
    assert.strictEqual(practice.questions.length, 5);

    // 4. Attempt practice question and record error
    const q1 = practice.questions[0];
    const attempt = weaknessDetectionService.recordAttempt({
      userId: journeyUser,
      questionId: q1.questionId || q1.question_id,
      examId: 'ssc-cgl',
      subjectId: q1.subjectId || q1.subject_id,
      chapterId: q1.chapterId || q1.chapter_id,
      topicId: q1.topicId || q1.topic_id,
      practiceMode: 'MIXED_ADAPTIVE',
      isCorrect: 0,
      timeSpentSeconds: 45
    }, db);
    assert.strictEqual(attempt.isCorrect, false);

    // 5. Verify revision card created in Leitner Spaced Revision
    const revCard = spacedRevisionService.recordAttempt({
      userId: journeyUser,
      questionId: q1.questionId || q1.question_id,
      examId: 'ssc-cgl',
      subjectId: q1.subjectId || q1.subject_id,
      topicId: q1.topicId || q1.topic_id,
      isCorrect: false
    }, db);
    assert.ok(revCard, 'Spaced revision card must be created on mistake');
    assert.strictEqual(revCard.repetitionLevel, 1);
  });

  // -------------------------------------------------------------
  // JOURNEY B: Home -> Exam -> PYQ -> Attempt -> Result -> Weak Topic -> Adaptive Practice
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY B: PYQ Practice -> Weakness Detection -> Adaptive Drill ---');
  runJourney('Journey B: PYQ practice leads to weakness signal and targeted adaptive drill', () => {
    // 1. Select authentic PYQ questions
    const pyqSelection = adaptiveSelectionService.selectQuestions({
      userId: journeyUser,
      examId: 'ssc-cgl',
      practiceMode: 'PYQ_REVISION',
      questionCount: 5
    }, db);
    assert.strictEqual(pyqSelection.practiceMode, 'PYQ_REVISION');
    assert.ok(pyqSelection.questions.every(q => q.provenance === 'OFFICIAL_PYQ'));

    // 2. Candidate answers poorly on a specific topic (e.g. topic-percentages)
    for (let i = 0; i < 3; i++) {
      weaknessDetectionService.recordAttempt({
        userId: journeyUser,
        questionId: `pyq-fail-${i}`,
        examId: 'ssc-cgl',
        subjectId: 'subj-math',
        chapterId: 'ch-arithmetic',
        topicId: 'topic-percentages',
        practiceMode: 'PYQ_REVISION',
        isCorrect: 0,
        timeSpentSeconds: 50
      }, db);
    }

    // 3. Weakness engine detects weakness
    const weakTopics = weaknessDetectionService.getActiveWeakTopics(journeyUser, 'ssc-cgl', db);
    assert.ok(weakTopics.some(w => w.topic_id === 'topic-percentages'), 'Weak topic must be detected');

    // 4. Adaptive practice targets the identified weak topic
    const adaptiveDrill = adaptiveSelectionService.selectQuestions({
      userId: journeyUser,
      examId: 'ssc-cgl',
      practiceMode: 'WEAK_TOPIC_DRILL',
      questionCount: 5
    }, db);
    assert.strictEqual(adaptiveDrill.practiceMode, 'WEAK_TOPIC_DRILL');
    assert.ok(adaptiveDrill.criteriaExplanation.weakTopicsCount >= 1);
  });

  // -------------------------------------------------------------
  // JOURNEY C: Home -> Exam -> Full Exam -> Instructions -> Start -> Submit -> Diagnostic
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY C: Full Mock Exam -> Timer -> Anti-Tamper Score -> Diagnostics ---');
  runJourney('Journey C: Complete full exam simulation with negative marking diagnostics', () => {
    // 1. Launch full exam simulation for SSC CGL
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      testMode: 'FULL_EXAM',
      strictVerification: true
    });
    assert.strictEqual(session.success, true);
    assert.strictEqual(session.testMode, 'FULL_EXAM');
    assert.ok(session.sessionId);
    assert.ok(session.sections.length > 0);
    assert.ok(session.questions.length > 0);

    // 2. Submit candidate answers
    const userAnswers = {};
    session.questions.slice(0, 10).forEach(q => {
      userAnswers[q.questionId || q.question_id || q.id] = 0; // candidate selects option 0
    });

    const evalResult = mockService.submitMockSession({
      sessionId: session.sessionId,
      userAnswers,
      timeSpentSeconds: 1800
    });
    assert.ok(evalResult);
    assert.strictEqual(evalResult.success, true);
    assert.ok(evalResult.scorecard);
    assert.strictEqual(typeof evalResult.scorecard.summary.netScore, 'number');

    // 3. Feed into Post-Mock Intelligence Diagnostics
    const diagnostic = mockIntelligenceService.processMockResult({
      userId: journeyUser,
      examId: 'ssc-cgl',
      sessionId: session.sessionId,
      totalScore: evalResult.scorecard.summary.netScore,
      maxPossibleScore: evalResult.scorecard.summary.maxMarks,
      attemptedCount: evalResult.scorecard.summary.attempted,
      correctCount: evalResult.scorecard.summary.correct,
      incorrectCount: evalResult.scorecard.summary.wrong,
      negativeMarkingDeduction: evalResult.scorecard.summary.negativeMarksDeducted,
      timeUtilizationSeconds: 1800,
      sectionPerformance: evalResult.scorecard.sections
    }, db);

    assert.ok(diagnostic.mockRecordId);
    assert.strictEqual(typeof diagnostic.accuracyPct, 'number');
    assert.ok(diagnostic.recommendations.actionSteps.length > 0);
  });

  // -------------------------------------------------------------
  // JOURNEY D: Home -> Board -> Class -> Subject -> Chapter -> Practice
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY D: School Board Hierarchy -> Class -> Subject -> Practice ---');
  runJourney('Journey D: School Board navigation respecting academic dependencies', () => {
    // 1. Fetch Board
    const board = db.prepare("SELECT * FROM boards WHERE board_id = 'cbse-board'").get();
    assert.ok(board, 'CBSE board must exist');

    // 2. Fetch Board Exam structure
    const profile = schoolBoardService.getBoardProfile('cbse-board');
    assert.ok(profile && profile.classes && profile.classes.length > 0, 'Must return board classes array');

    // 3. Fetch Official Sample questions for Board
    const sampleQuestions = db.prepare(`
      SELECT * FROM questions
      WHERE board_id = 'cbse-board' AND provenance = 'OFFICIAL_SAMPLE'
    `).all();
    assert.ok(sampleQuestions.length > 0, 'CBSE official sample questions must exist');
  });

  // -------------------------------------------------------------
  // JOURNEY E: Home -> Planner -> Study Plan -> Milestone -> Analytics
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY E: Study Planner -> Milestones -> Recalibration -> Analytics ---');
  runJourney('Journey E: Dynamic preparation plan, milestone progression, and honest analytics', () => {
    // 1. Generate personalized plan
    const plan = preparationPlanService.generatePlan({
      userId: journeyUser,
      examId: 'ssc-cgl',
      targetExamDate: '2026-11-15',
      dailyStudyHours: 3.5,
      strategyType: 'BALANCED'
    }, db);
    assert.ok(plan.planId);
    assert.strictEqual(plan.status, 'ACTIVE');

    // 2. Complete a milestone
    assert.ok(plan.milestones && plan.milestones.length > 0);
    const m1 = plan.milestones[0];

    const updated = preparationPlanService.updateMilestoneProgress(plan.planId, m1.milestoneId, db);
    assert.strictEqual(updated.completed, true);
    assert.strictEqual(updated.status, 'ACTIVE');

    // 3. Candidate Analytics reflects honest progress
    const analytics = candidateProfileService.getProfile(journeyUser, 'ssc-cgl', db);
    assert.ok(analytics.honestDenominators.pyqCoverage);
    assert.ok(analytics.integrityDisclaimer.includes('does not guarantee exam qualification'));
  });

  // -------------------------------------------------------------
  // JOURNEY F: Home -> Search -> Notes / PDF -> Vector OMR Generation
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY F: Notes Search -> Vector OMR PDF Generation ---');
  await runAsyncJourney('Journey F: Search and vector OMR sheet generation for offline practice', async () => {
    // 1. Search notes / study items
    const searchRes = searchIntelligenceService.search('notes', {}, db);
    assert.ok(searchRes);

    // 2. Generate vector OMR sheet PDF
    const omr = await pdfOmrGenerator.generateOmrSheet({
      examName: 'UPSC CSE 2026 Paper-1 OMR',
      totalQuestions: 100,
      optionsPerQuestion: 4
    });
    assert.strictEqual(omr.bubbleCount, 400);
    assert.ok(omr.buffer.length > 5000);
  });

  // -------------------------------------------------------------
  // JOURNEY G: Home -> Multilingual Navigation -> Exam -> Adaptive Practice
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY G: Multilingual Language Switcher -> Hindi -> Adaptive Drill ---');
  runJourney('Journey G: Hindi language preference in adaptive practice session', () => {
    const hindiSelection = adaptiveSelectionService.selectQuestions({
      userId: journeyUser,
      examId: 'ssc-cgl',
      practiceMode: 'SPEED_PRACTICE',
      questionCount: 4,
      targetLanguage: 'hi'
    }, db);

    assert.strictEqual(hindiSelection.practiceMode, 'SPEED_PRACTICE');
    assert.ok(hindiSelection.questions.length > 0);
    // At least one question contains Hindi characters
    const hasHindi = hindiSelection.questions.some(q => /[\u0900-\u097F]/.test(q.questionText));
    assert.ok(hasHindi, 'Hindi question text must contain Devanagari script');
  });

  // -------------------------------------------------------------
  // JOURNEY H: Mobile Candidate State -> Practice -> Result -> Dashboard
  // -------------------------------------------------------------
  console.log('\n--- JOURNEY H: Mobile User State -> Attempt -> Instant Dashboard Update ---');
  runJourney('Journey H: Mobile attempt execution with instant dashboard synchronization', () => {
    // 1. Attempt question
    weaknessDetectionService.recordAttempt({
      userId: journeyUser,
      questionId: 'mobile-q1',
      examId: 'ssc-cgl',
      isCorrect: 1,
      timeSpentSeconds: 22
    }, db);

    // 2. Fetch candidate profile
    const profile = candidateProfileService.getProfile(journeyUser, 'ssc-cgl', db);
    assert.strictEqual(profile.userId, journeyUser);
    assert.ok(profile.totalAttempted >= 1);
    assert.ok(profile.accuracyRate > 0);
  });

  // Clean up journey candidate records
  db.prepare('DELETE FROM candidate_question_attempts WHERE user_id = ?').run(journeyUser);
  db.prepare('DELETE FROM candidate_preparation_profiles WHERE user_id = ?').run(journeyUser);
  db.prepare('DELETE FROM user_weak_topics WHERE user_id = ?').run(journeyUser);
  db.prepare('DELETE FROM mock_performance_records WHERE user_id = ?').run(journeyUser);
  db.prepare('DELETE FROM user_preparation_plans WHERE user_id = ?').run(journeyUser);
  db.prepare('DELETE FROM user_spaced_revisions WHERE user_id = ?').run(journeyUser);

  console.log('\n=================================================================');
  console.log(`🏁 USER JOURNEYS SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('=================================================================');

  if (failCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal in test-phase15-user-journeys:', err);
  process.exit(1);
});

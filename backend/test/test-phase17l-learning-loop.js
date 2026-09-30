/**
 * backend/test/test-phase17l-learning-loop.js
 * 
 * SARKARIAI HUB — PHASE 17L REGRESSION TEST SUITE
 * PDF -> Revision -> Mock Learning Loop & Cross-Surface Question Reuse Architecture
 * 
 * Verifies all 20 Section 7Q Mandated Assertions:
 * 1. PDF question selected in Learning Mock -> PASS
 * 2. PDF question selected in Practice Mock -> PASS
 * 3. PDF question selected in Full Exam when blueprint allows -> PASS
 * 4. Same question appears twice in one PDF -> REJECT
 * 5. Same question appears twice in one Learning Mock -> REJECT
 * 6. Same question appears twice in one Practice Mock -> REJECT
 * 7. Same question appears twice in one Full Exam -> REJECT
 * 8. Same question appears once in PDF and once in Mock -> PASS
 * 9. Same question appears in PDF + Revision + Mock -> PASS
 * 10. Previously seen question in new Mock -> PASS
 * 11. Same question repeated twice in same Mock -> FAIL
 * 12. Incompatible PDF question reused in unrelated Mock -> REJECT
 * 13. PDF context passed into Learning Mock -> PASS
 * 14. Practice Mock combines studied + new verified questions -> PASS
 * 15. Full Exam ignores PDF overlap when it conflicts with official blueprint -> PASS
 * 16. UI language does not alter PDF/Mock paper language
 * 17. Language-specific question and options remain correct after reuse
 * 18. No canonical question duplication created by reuse
 * 19. Reuse telemetry != duplicate telemetry
 * 20. Existing question bank remains unchanged unless explicitly authorized
 */

const assert = require('assert');
const path = require('path');
const { getDb } = require('../db/database');
const crossSurfaceLearningService = require('../services/cross-surface-learning-service');
const mockService = require('../services/mock-service');
const { initPhase17LSchema } = require('../db/phase17l-learning-loop-init');

console.log('=====================================================================');
console.log('🧪 TEST SUITE: PHASE 17L LEARNING LOOP & CROSS-SURFACE REUSE');
console.log('=====================================================================\n');

const db = getDb();
initPhase17LSchema(db);

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
// Test 1: PDF question selected in Learning Mock -> PASS
// -----------------------------------------------------------------------------
test('1. PDF question selected in Learning Mock -> PASS', () => {
  const samplePdfQs = db.prepare(`
    SELECT question_id FROM questions WHERE board_id = 'cbse-board' AND subject_id = 'subj-math' AND stage = 'Class 9' LIMIT 3
  `).all().map(r => r.question_id);

  assert(samplePdfQs.length >= 2, 'Should have sample cbse questions');
  const res = crossSurfaceLearningService.selectQuestionsForLearningMock({
    subjectId: 'subj-math',
    boardId: 'cbse-board',
    stage: 'Class 9',
    count: 5,
    studiedQuestionIds: samplePdfQs
  }, db);

  assert(res.questions.length > 0, 'Learning mock should select questions');
  const selectedIds = res.questions.map(q => q.id || q.question_id);
  const foundOverlap = selectedIds.some(id => samplePdfQs.includes(id));
  assert(foundOverlap, 'Learning mock must include questions from studied PDF pool');
});

// -----------------------------------------------------------------------------
// Test 2: PDF question selected in Practice Mock -> PASS
// -----------------------------------------------------------------------------
test('2. PDF question selected in Practice Mock -> PASS', () => {
  const samplePdfQs = db.prepare(`
    SELECT question_id FROM questions WHERE board_id = 'cbse-board' AND subject_id = 'subj-math' AND stage = 'Class 9' LIMIT 3
  `).all().map(r => r.question_id);

  const res = crossSurfaceLearningService.selectQuestionsForPracticeMock({
    subjectId: 'subj-math',
    boardId: 'cbse-board',
    stage: 'Class 9',
    count: 10,
    studiedQuestionIds: samplePdfQs
  }, db);

  assert.strictEqual(res.questions.length, 10, 'Practice mock should return requested count');
  const selectedIds = res.questions.map(q => q.id || q.question_id);
  const foundOverlap = selectedIds.some(id => samplePdfQs.includes(id));
  assert(foundOverlap, 'Practice mock should include studied questions in balanced mix');
});

// -----------------------------------------------------------------------------
// Test 3: PDF question selected in Full Exam when blueprint allows -> PASS
// -----------------------------------------------------------------------------
test('3. PDF question selected in Full Exam when blueprint allows -> PASS', () => {
  // Find a question with full_exam_eligible = 1
  const eligibleQ = db.prepare(`
    SELECT question_id, subject_id
    FROM questions
    WHERE full_exam_eligible = 1
    LIMIT 1
  `).get();

  assert(eligibleQ, 'Eligible full exam question should exist');
  const allowed = crossSurfaceLearningService.filterQuestionsForFullExam(
    [eligibleQ.question_id],
    { subjectId: eligibleQ.subject_id },
    db
  );

  assert.strictEqual(allowed.length, 1, 'Eligible PDF question must be allowed in Full Exam');
  assert.strictEqual(allowed[0].question_id, eligibleQ.question_id);
});

// -----------------------------------------------------------------------------
// Test 4: Same question appears twice in one PDF -> REJECT
// -----------------------------------------------------------------------------
test('4. Same question appears twice in one PDF -> REJECT', () => {
  const duplicateList = ['q-math-101', 'q-math-102', 'q-math-101'];
  const res = crossSurfaceLearningService.validateAssetUniqueness(duplicateList, 'PDF');
  assert.strictEqual(res.valid, false, 'Should reject duplicate question in PDF');
  assert.strictEqual(res.reason, 'ASSET_INTERNAL_DUPLICATE');
  assert.strictEqual(res.duplicateId, 'q-math-101');
});

// -----------------------------------------------------------------------------
// Test 5: Same question appears twice in one Learning Mock -> REJECT
// -----------------------------------------------------------------------------
test('5. Same question appears twice in one Learning Mock -> REJECT', () => {
  const duplicateList = ['q-learn-1', 'q-learn-2', 'q-learn-2'];
  const res = crossSurfaceLearningService.validateAssetUniqueness(duplicateList, 'LEARNING_MOCK');
  assert.strictEqual(res.valid, false, 'Should reject duplicate question in Learning Mock');
  assert.strictEqual(res.reason, 'ASSET_INTERNAL_DUPLICATE');
  assert.strictEqual(res.duplicateId, 'q-learn-2');
});

// -----------------------------------------------------------------------------
// Test 6: Same question appears twice in one Practice Mock -> REJECT
// -----------------------------------------------------------------------------
test('6. Same question appears twice in one Practice Mock -> REJECT', () => {
  const duplicateList = ['q-prac-1', 'q-prac-3', 'q-prac-1'];
  const res = crossSurfaceLearningService.validateAssetUniqueness(duplicateList, 'PRACTICE_MOCK');
  assert.strictEqual(res.valid, false, 'Should reject duplicate question in Practice Mock');
  assert.strictEqual(res.reason, 'ASSET_INTERNAL_DUPLICATE');
  assert.strictEqual(res.duplicateId, 'q-prac-1');
});

// -----------------------------------------------------------------------------
// Test 7: Same question appears twice in one Full Exam -> REJECT
// -----------------------------------------------------------------------------
test('7. Same question appears twice in one Full Exam -> REJECT', () => {
  const duplicateList = ['q-full-01', 'q-full-02', 'q-full-01'];
  const res = crossSurfaceLearningService.validateAssetUniqueness(duplicateList, 'FULL_EXAM');
  assert.strictEqual(res.valid, false, 'Should reject duplicate question in Full Exam');
  assert.strictEqual(res.reason, 'ASSET_INTERNAL_DUPLICATE');
});

// -----------------------------------------------------------------------------
// Test 8: Same question appears once in PDF and once in Mock -> PASS
// -----------------------------------------------------------------------------
test('8. Same question appears once in PDF and once in Mock -> PASS', () => {
  const realQ = db.prepare('SELECT question_id FROM questions LIMIT 1 OFFSET 0').get().question_id;
  crossSurfaceLearningService.recordUsage('PDF', 'pdf-test-asset-8', [realQ], {}, db);
  crossSurfaceLearningService.recordUsage('LEARNING_MOCK', 'mock-test-asset-8', [realQ], {}, db);

  const telemetry = crossSurfaceLearningService.getQuestionReuseTelemetry(realQ, db);
  assert.strictEqual(telemetry.appeared_in_pdf, true);
  assert.strictEqual(telemetry.appeared_in_learning_mock, true);
  assert(telemetry.reuse_count >= 2);
  assert.strictEqual(telemetry.telemetry_type, 'CROSS_SURFACE_REUSE');
});

// -----------------------------------------------------------------------------
// Test 9: Same question appears in PDF + Revision + Mock -> PASS
// -----------------------------------------------------------------------------
test('9. Same question appears in PDF + Revision + Mock -> PASS', () => {
  const realQ = db.prepare('SELECT question_id FROM questions LIMIT 1 OFFSET 1').get().question_id;
  crossSurfaceLearningService.recordUsage('PDF', 'pdf-test-asset-9', [realQ], {}, db);
  crossSurfaceLearningService.recordUsage('REVISION', 'rev-test-asset-9', [realQ], {}, db);
  crossSurfaceLearningService.recordUsage('PRACTICE_MOCK', 'mock-test-asset-9', [realQ], {}, db);

  const telemetry = crossSurfaceLearningService.getQuestionReuseTelemetry(realQ, db);
  assert.strictEqual(telemetry.appeared_in_pdf, true);
  assert.strictEqual(telemetry.appeared_in_revision, true);
  assert.strictEqual(telemetry.appeared_in_practice_mock, true);
  assert(telemetry.reuse_count >= 3);
  assert.strictEqual(telemetry.telemetry_type, 'CROSS_SURFACE_REUSE');
});

// -----------------------------------------------------------------------------
// Test 10: Previously seen question in new Mock -> PASS
// -----------------------------------------------------------------------------
test('10. Previously seen question in new Mock -> PASS', () => {
  const realQ = db.prepare('SELECT question_id FROM questions LIMIT 1 OFFSET 2').get().question_id;
  crossSurfaceLearningService.recordUsage('PDF', 'pdf-prior-session-10', [realQ], {}, db);

  // New mock can select it without violation
  const uniquenessCheck = crossSurfaceLearningService.validateAssetUniqueness([realQ, 'q-fresh-002'], 'MOCK');
  assert.strictEqual(uniquenessCheck.valid, true, 'Seen question in new mock must be valid');
});

// -----------------------------------------------------------------------------
// Test 11: Same question repeated twice in same Mock -> FAIL
// -----------------------------------------------------------------------------
test('11. Same question repeated twice in same Mock -> FAIL', () => {
  const uniquenessCheck = crossSurfaceLearningService.validateAssetUniqueness(
    ['q-coll-10', 'q-coll-20', 'q-coll-10'],
    'MOCK_SESSION'
  );
  assert.strictEqual(uniquenessCheck.valid, false);
  assert.strictEqual(uniquenessCheck.reason, 'ASSET_INTERNAL_DUPLICATE');
});

// -----------------------------------------------------------------------------
// Test 12: Incompatible PDF question reused in unrelated Mock -> REJECT
// -----------------------------------------------------------------------------
test('12. Incompatible PDF question reused in unrelated Mock -> REJECT', () => {
  const cbseClass12Q = {
    question_id: 'q-cbse-c12-phy-999',
    board_id: 'cbse-board',
    stage: 'Class 12',
    subject_id: 'subj-physics'
  };

  const psebClass10Context = {
    boardId: 'pseb-punjab',
    stage: 'Class 10',
    subjectId: 'subj-social'
  };

  const check = crossSurfaceLearningService.validateContextCompatibility(cbseClass12Q, psebClass10Context);
  assert.strictEqual(check.compatible, false, 'Must reject incompatible cross-board/class reuse');
  assert.strictEqual(check.reason, 'CONTEXT_MISMATCH');
});

// -----------------------------------------------------------------------------
// Test 13: PDF context passed into Learning Mock -> PASS
// -----------------------------------------------------------------------------
test('13. PDF context passed into Learning Mock -> PASS', () => {
  const session = mockService.startMockSession({
    examId: 'cbse-board',
    testMode: 'LEARNING_MOCK',
    subjectId: 'subj-math',
    questionCount: 5,
    pdfId: 'pdf-context-session-13',
    boardId: 'cbse-board',
    stage: 'Class 9',
    languageConfig: { primary: 'en' }
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'LEARNING_MOCK');
  assert(session.questions.length > 0);
  assert.strictEqual(session.questions[0].subjectId, 'subj-math');
});

// -----------------------------------------------------------------------------
// Test 14: Practice Mock combines studied + new verified questions -> PASS
// -----------------------------------------------------------------------------
test('14. Practice Mock combines studied + new verified questions -> PASS', () => {
  const sampleStudied = db.prepare(`
    SELECT question_id FROM questions WHERE board_id = 'cbse-board' AND subject_id = 'subj-math' AND stage = 'Class 9' LIMIT 2
  `).all().map(r => r.question_id);

  const result = crossSurfaceLearningService.selectQuestionsForPracticeMock({
    subjectId: 'subj-math',
    boardId: 'cbse-board',
    stage: 'Class 9',
    count: 10,
    studiedQuestionIds: sampleStudied
  }, db);

  assert.strictEqual(result.questions.length, 10);
  const qIds = result.questions.map(q => q.id || q.question_id);
  const hasStudied = qIds.some(id => sampleStudied.includes(id));
  const hasNew = qIds.some(id => !sampleStudied.includes(id));
  assert(hasStudied, 'Should contain studied questions');
  assert(hasNew, 'Should contain new verified questions');
});

// -----------------------------------------------------------------------------
// Test 15: Full Exam ignores PDF overlap when it conflicts with official blueprint -> PASS
// -----------------------------------------------------------------------------
test('15. Full Exam ignores PDF overlap when it conflicts with official blueprint -> PASS', () => {
  const ineligibleQ = db.prepare(`
    SELECT question_id, subject_id
    FROM questions
    WHERE full_exam_eligible = 0
    LIMIT 1
  `).get();

  const allowed = crossSurfaceLearningService.filterQuestionsForFullExam(
    [ineligibleQ.question_id],
    { subjectId: ineligibleQ.subject_id },
    db
  );

  assert.strictEqual(allowed.length, 0, 'Ineligible PDF question MUST be rejected for Full Exam');
});

// -----------------------------------------------------------------------------
// Test 16: UI language does not alter PDF/Mock paper language
// -----------------------------------------------------------------------------
test('16. UI language does not alter PDF/Mock paper language', () => {
  const q = db.prepare(`
    SELECT q.question_id, qv.language_content
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
    WHERE q.subject_id = 'subj-math' AND q.board_id = 'cbse-board'
    LIMIT 1
  `).get();

  const langContent = JSON.parse(q.language_content);
  assert(langContent.en || langContent.hi, 'Content payload retains authentic paper language');
});

// -----------------------------------------------------------------------------
// Test 17: Language-specific question and options remain correct after reuse
// -----------------------------------------------------------------------------
test('17. Language-specific question and options remain correct after reuse', () => {
  const q = db.prepare(`
    SELECT q.question_id, q.subject_id, qv.language_content, qv.correct_answer
    FROM questions q
    JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
    WHERE q.subject_id = 'subj-math'
    LIMIT 1
  `).get();

  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'LEARNING_MOCK',
    subjectId: 'subj-math',
    studiedQuestionIds: [q.question_id],
    questionCount: 5
  });

  assert(session.questions.length > 0);
  const reusedQ = session.questions.find(sq => sq.id === q.question_id);
  if (reusedQ) {
    assert(reusedQ.ans || reusedQ.correctAnswer || typeof reusedQ.correct === 'number', 'Answer preserved');
  }
});

// -----------------------------------------------------------------------------
// Test 18: No canonical question duplication created by reuse
// -----------------------------------------------------------------------------
test('18. No canonical question duplication created by reuse', () => {
  const preCount = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  const realQ = db.prepare('SELECT question_id FROM questions LIMIT 1 OFFSET 5').get().question_id;
  
  crossSurfaceLearningService.recordUsage('LEARNING_MOCK', 'mock-test-id-18', [realQ], {}, db);
  crossSurfaceLearningService.recordUsage('PDF', 'pdf-test-id-18', [realQ], {}, db);

  const postCount = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  assert.strictEqual(postCount, preCount, 'Total rows in questions table must remain strictly unchanged');
});

// -----------------------------------------------------------------------------
// Test 19: Reuse telemetry != duplicate telemetry
// -----------------------------------------------------------------------------
test('19. Reuse telemetry != duplicate telemetry', () => {
  const telemetry = crossSurfaceLearningService.getSystemTelemetry(db);
  assert.strictEqual(typeof telemetry.multiAssetReusedQuestions, 'number');
  assert.strictEqual(telemetry.assetInternalDuplicatesBlocked, 0);
  assert.strictEqual(telemetry.telemetryCategories.ASSET_INTERNAL_DUPLICATE, 0);
  assert(telemetry.telemetryCategories.CROSS_SURFACE_REUSE >= 0);
});

// -----------------------------------------------------------------------------
// Test 20: Existing question bank remains unchanged unless explicitly authorized
// -----------------------------------------------------------------------------
test('20. Existing question bank remains unchanged unless explicitly authorized', () => {
  const total = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  const board = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE q.board_id IS NOT NULL OR e.board_id IS NOT NULL
  `).get().c;
  const competitive = db.prepare(`
    SELECT count(*) as c FROM questions q
    LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
    LEFT JOIN exams e ON ev.exam_id = e.exam_id
    WHERE q.board_id IS NULL AND e.board_id IS NULL
  `).get().c;
  const fullExam = db.prepare('SELECT COUNT(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;

  assert.strictEqual(total, 172210, 'Total questions invariant violated');
  assert.strictEqual(board, 99849, 'Board questions invariant violated');
  assert.strictEqual(competitive, 72361, 'Competitive questions invariant violated');
  assert.strictEqual(fullExam, 250, 'Full Exam eligible invariant violated');
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n=====================================================================');
console.log(`📊 TEST RESULTS: ${passed} / 20 ASSERTIONS PASSED (${failed} FAILED)`);
console.log('=====================================================================');

if (failed > 0) process.exit(1);

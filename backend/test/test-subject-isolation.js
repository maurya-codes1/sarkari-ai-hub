// backend/test/test-subject-isolation.js
// Regression test for Subject Isolation and Canonical Mapping
// Asserts that questions served for Subject A belong strictly to Subject A.

const assert = require('assert');
const questionRepository = require('../db/repositories/question-repository');
const mockService = require('../services/mock-service');
const { normalizeSubjectId, matchesSubject } = require('../utils/subject-utils');

console.log('🧪 Starting Subject Isolation & Canonical Mapping Test Suite...');

// Test 1: Canonical Mapping normalization
const testMappings = [
  { input: 'physics', expected: 'subj-physics' },
  { input: 'subj-physics', expected: 'subj-physics' },
  { input: 'math', expected: 'subj-math' },
  { input: 'mathematics', expected: 'subj-math' },
  { input: 'chemistry', expected: 'subj-chemistry' },
  { input: 'biology', expected: 'subj-biology' },
  { input: 'history', expected: 'subj-history' },
  { input: 'polity', expected: 'subj-polity' },
  { input: 'geography', expected: 'subj-geography' },
  { input: 'economics', expected: 'subj-economics' },
  { input: 'gk', expected: 'subj-gk' },
  { input: 'reasoning', expected: 'subj-reasoning' },
  { input: 'all', expected: 'all' }
];

for (const tm of testMappings) {
  const actual = normalizeSubjectId(tm.input);
  assert.strictEqual(actual, tm.expected, `Mapping failed for ${tm.input}: expected ${tm.expected}, got ${actual}`);
}
console.log('  ✅ [1/5] Canonical Subject Normalization rules verified.');

// Test 2: questionRepository.getPracticeQuestions isolation
const subjectsToTest = ['physics', 'chemistry', 'biology', 'math', 'history', 'polity', 'geography', 'gk'];

for (const sub of subjectsToTest) {
  const normSub = normalizeSubjectId(sub);
  const questions = questionRepository.getPracticeQuestions({ subjectId: sub, count: 20 });
  assert(questions.length > 0, `No questions returned for subject: ${sub}`);
  for (const q of questions) {
    assert.strictEqual(
      q.subject_id, 
      normSub, 
      `Subject isolation violation: Requested '${sub}' (${normSub}), but received question '${q.question_id}' with subject '${q.subject_id}'`
    );
  }
}
console.log('  ✅ [2/5] questionRepository strictly enforces subject isolation (tested 8 subjects).');

// Test 3: mockService practice session subject isolation
for (const sub of ['physics', 'chemistry', 'math', 'gk']) {
  const normSub = normalizeSubjectId(sub);
  const session = mockService.startMockSession({
    examId: 'board-12th-science',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: sub,
    requestedCount: 15
  });

  assert(session.success, `Failed to start mock session for subject: ${sub}`);
  assert(Array.isArray(session.questions) && session.questions.length > 0, `No questions in session for ${sub}`);
  
  for (const q of session.questions) {
    assert.strictEqual(
      q.subjectId, 
      normSub, 
      `Mock session subject isolation violation: Requested '${sub}', got '${q.subjectId}' for question '${q.id}'`
    );
  }
}
console.log('  ✅ [3/5] mockService startMockSession isolates questions strictly by requested subject.');

// Test 4: Subject selection in FULL_EXAM_PATTERN mode automatically routes to Subject Practice
const autoRouteSession = mockService.startMockSession({
  examId: 'board-12th-science',
  testMode: 'FULL_EXAM_PATTERN',
  subjectId: 'physics',
  requestedCount: 20
});

assert(autoRouteSession.success, 'Auto-routing to subject practice failed');
assert.strictEqual(autoRouteSession.testMode, 'SUBJECT_PRACTICE', 'Expected auto-route to SUBJECT_PRACTICE when specific subject selected');
for (const q of autoRouteSession.questions) {
  assert.strictEqual(q.subjectId, 'subj-physics', `Question not in subj-physics: ${q.subjectId}`);
}
console.log('  ✅ [4/5] Full exam mode with specific subject cleanly routes to Subject Practice.');

// Test 5: Unknown subject request handled safely without cross-contamination
const invalidSession = mockService.startMockSession({
  examId: 'board-12th-science',
  testMode: 'SUBJECT_PRACTICE',
  subjectId: 'nonexistent-subject-xyz',
  requestedCount: 10
});

if (invalidSession.success) {
  // If questions returned, must match normalized nonexistent ID (which has 0 rows, so length should be 0)
  assert.strictEqual(invalidSession.questions.length, 0, 'Nonexistent subject must return 0 questions');
} else {
  assert(invalidSession.status === 'INSUFFICIENT_INVENTORY' || !invalidSession.success, 'Safely reported shortage');
}
console.log('  ✅ [5/5] Nonexistent subject request safely contained without cross-contamination.');

console.log('🎉 ALL SUBJECT ISOLATION TESTS PASSED 100%!');

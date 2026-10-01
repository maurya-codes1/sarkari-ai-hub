const { getDb } = require('../backend/db/database');
const questionRepository = require('../backend/db/repositories/question-repository');
const mockService = require('../backend/services/mock-service');
const adaptiveSelectionService = require('../backend/services/adaptive-selection-service');

const db = getDb();

console.log('=== TEST 1: SSC GD Mock Generation Boundary Verification ===');
const sscGdResult = mockService.startMockSession({
  examId: 'ssc-gd',
  testMode: 'PRACTICE',
  questionCount: 30,
  subjectId: 'all'
});

console.log('SSC GD Mock generated:', sscGdResult.success, 'Questions count:', sscGdResult.questions?.length);
let sscGdContaminated = 0;
let sscGdNoiseFound = 0;
let sscGdSubjectiveFound = 0;

for (const q of (sscGdResult.questions || [])) {
  const row = db.prepare('SELECT board_id, stage, question_type_id FROM questions WHERE question_id = ?').get(q.id);
  if (row && (row.board_id || (row.stage && row.stage.toLowerCase().includes('class')))) {
    console.error(`FAIL: SSC GD contains board question: ${q.id} (board: ${row.board_id}, stage: ${row.stage})`);
    sscGdContaminated++;
  }
  if (row && ['short_answer', 'long_answer', 'case_study', 'subjective'].includes(row.question_type_id)) {
    console.error(`FAIL: SSC GD contains subjective question: ${q.id}`);
    sscGdSubjectiveFound++;
  }
  const text = (q.q || '') + ' ' + (q.secondaryQ || '');
  if (text.includes('सीबीएसई') || text.includes('CBSE') || text.includes('Question #') || text.includes('प्रश्न #')) {
    console.error(`FAIL: SSC GD question has noise text: ${q.id} -> ${text}`);
    sscGdNoiseFound++;
  }
}

console.log(`SSC GD Verification: Contaminated Board Qs = ${sscGdContaminated}, Noise = ${sscGdNoiseFound}, Subjective = ${sscGdSubjectiveFound}`);

console.log('\n=== TEST 2: CBSE 10th Mock Generation Boundary Verification ===');
const cbseResult = mockService.startMockSession({
  examId: 'cbse-10-board',
  boardId: 'cbse-board',
  stage: 'Class 10',
  testMode: 'PRACTICE',
  questionCount: 30,
  subjectId: 'all'
});

console.log('CBSE Mock generated:', cbseResult.success, 'Questions count:', cbseResult.questions?.length);
let cbseContaminated = 0;
let cbseNoiseFound = 0;
for (const q of (cbseResult.questions || [])) {
  const row = db.prepare('SELECT board_id, stage FROM questions WHERE question_id = ?').get(q.id);
  if (row && row.board_id !== 'cbse-board') {
    console.error(`FAIL: CBSE contains non-cbse question: ${q.id} (board: ${row.board_id})`);
    cbseContaminated++;
  }
  const text = (q.q || '') + ' ' + (q.secondaryQ || '');
  if (text.includes('नमूना प्रश्न 15') || text.includes('Sample Item 15')) {
    console.error(`FAIL: CBSE question still has sample item noise: ${q.id} -> ${text}`);
    cbseNoiseFound++;
  }
}
console.log(`CBSE Verification: Contaminated Qs = ${cbseContaminated}, Noise = ${cbseNoiseFound}`);

console.log('\n=== TEST 3: Adaptive Selection Service Boundary & MCQ Verification ===');
const adaptiveModes = ['MIXED_ADAPTIVE', 'WEAK_TOPIC_DRILL', 'PYQ_REVISION', 'SPEED_PRACTICE'];

for (const mode of adaptiveModes) {
  const adaptiveSsc = adaptiveSelectionService.selectQuestions({
    userId: 'audit-user-test',
    examId: 'ssc-gd',
    practiceMode: mode,
    questionCount: 15,
    targetLanguage: 'hi'
  });

  console.log(`Adaptive SSC GD [${mode}]: total = ${adaptiveSsc.questions.length}`);
  let adContam = 0;
  let adSubj = 0;
  let adNoOpt = 0;

  for (const q of adaptiveSsc.questions) {
    const row = db.prepare('SELECT board_id, stage, question_type_id FROM questions WHERE question_id = ?').get(q.questionId);
    if (row && row.board_id) adContam++;
    if (row && ['short_answer', 'long_answer', 'case_study', 'subjective'].includes(row.question_type_id)) adSubj++;
    if (!q.options || q.options.length < 2) adNoOpt++;
  }
  console.log(`  -> Board contaminated: ${adContam}, Subjective: ${adSubj}, Missing Options: ${adNoOpt}`);
}

console.log('\n=== ALL VERIFICATION TESTS COMPLETED ===');

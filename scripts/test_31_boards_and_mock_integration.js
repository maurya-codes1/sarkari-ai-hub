const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=====================================================================');
console.log('🧪 VERIFYING 31 BOARDS & MOCK TEST INTEGRATION');
console.log('=====================================================================');

// 1. Check index.html grid has all 31 cards
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const expectedBoardSlugs = [
  'upmsp', 'bseb', 'cbse', 'icse', 'rbse', 'mpbse', 'maharashtra', 'gujarat',
  'wb', 'tn', 'karnataka', 'pseb', 'haryana', 'jac', 'cgbse', 'bseodisha',
  'ubse', 'seba', 'bsetelangana', 'nios',
  'hpbose', 'jkbose', 'kerala', 'gbshse', 'bsem', 'mbose', 'mbse', 'nbse',
  'tbse', 'bseap', 'bsetg'
];

console.log(`Checking 31 board cards in public/index.html...`);
expectedBoardSlugs.forEach(slug => {
  const cardMatch = indexHtml.includes(`launchBoardPractice('board-12th-science', '${slug}'`);
  assert(cardMatch, `Missing card for board slug: ${slug} in index.html`);
});
console.log('✅ All 31 board practice cards verified in index.html grid!');

// 2. Check quizBoardSelect has all 31 options
console.log(`Checking 31 board options in #quizBoardSelect...`);
expectedBoardSlugs.forEach(slug => {
  const optionMatch = indexHtml.includes(`value="${slug}"`);
  assert(optionMatch, `Missing option for board slug: ${slug} in #quizBoardSelect`);
});
console.log('✅ All 31 board options verified in #quizBoardSelect!');

// 3. Check EXAMS_CONFIG in quiz-data.js
const { EXAMS_CONFIG, BOARD_METADATA } = require('../public/js/quiz-data.js');
['board-10th', 'board-12th-science', 'board-12th-commerce', 'board-12th-arts'].forEach(examId => {
  const exam = EXAMS_CONFIG.find(e => e.id === examId);
  assert(exam, `Missing exam ${examId}`);
  assert.strictEqual(exam.boards.length, 31, `${examId} does not have 31 boards (found ${exam.boards.length})`);
});
console.log('✅ All 4 board exam configurations in quiz-data.js contain exactly 31 boards!');

// 4. Check BOARD_METADATA
assert.strictEqual(Object.keys(BOARD_METADATA).length, 31, `BOARD_METADATA does not have 31 boards`);
console.log('✅ BOARD_METADATA contains all 31 boards!');

// 5. Check mockService produces authentic native languages for regional boards
const mockService = require('../backend/services/mock-service');

const regionalTests = [
  { boardId: 'tn', langCheck: 'ta', regex: /[\u0B80-\u0BFF]/, name: 'Tamil Nadu (Tamil)' },
  { boardId: 'maharashtra', langCheck: 'mr', regex: /[\u0900-\u097F]/, name: 'Maharashtra (Marathi)' },
  { boardId: 'kerala', langCheck: 'ml', regex: /[\u0D00-\u0D7F]/, name: 'Kerala (Malayalam)' },
  { boardId: 'wb', langCheck: 'bn', regex: /[\u0980-\u09FF]/, name: 'West Bengal (Bengali)' }
];

regionalTests.forEach(t => {
  const session = mockService.startMockSession({
    examId: 'board-12th-science',
    boardId: t.boardId,
    subjectId: 'physics',
    testMode: 'SUBJECT_PRACTICE',
    count: 5
  });

  assert(session.success, `Session creation failed for ${t.name}`);
  assert(session.questions.length > 0, `No questions returned for ${t.name}`);
  const q = session.questions[0];
  assert(q.q, `Question text missing for ${t.name}`);
  assert(t.regex.test(q.q), `Question for ${t.name} did not contain native script: ${q.q.substring(0, 60)}`);
  assert(q.correct !== undefined, `Practice question missing correct index for ${t.name}`);
  assert(q.explanation, `Practice question missing explanation for ${t.name}`);
  console.log(`✅ ${t.name} verified: Native script present, answer & explanation present!`);
});

console.log('=====================================================================');
console.log('🎉 ALL INTEGRATION CHECKS PASSED PERFECTLY!');
console.log('=====================================================================');

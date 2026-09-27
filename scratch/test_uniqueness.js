// Test question uniqueness for BSEB Class 12th Math, Physics, Chemistry, Biology, and SSC GD / UP Police
const fs = require('fs');

// Mock browser window and load dependencies
global.window = global;
require('../public/js/master-class12-bank.js');
require('../public/js/master-high-yield-bank.js');
require('../public/js/master-competitive-bank.js');
const { getFilteredQuestions, getBoardLocalizedQuestions } = require('../public/js/quiz-data.js');

function testQuiz(name, fn) {
  console.log(`\nTesting: ${name}`);
  const questions = fn();
  console.log(`Requested count / Returned count: ${questions.length}`);
  
  const qTexts = new Set();
  let duplicates = 0;
  questions.forEach((q, idx) => {
    // Check clean question title
    const baseQ = q.q.split('\n')[0].trim();
    if (qTexts.has(baseQ)) {
      duplicates++;
      console.log(`  [DUPLICATE DETECTED] at #${idx + 1}: ${baseQ.substring(0, 40)}...`);
    } else {
      qTexts.add(baseQ);
    }
  });

  if (duplicates === 0) {
    console.log(`  [PASS] 100% Unique Questions! (0 duplicates across ${questions.length} questions)`);
  } else {
    console.log(`  [FAIL] ${duplicates} duplicate questions found!`);
  }

  // Also check bilingual options
  let biCount = 0;
  questions.forEach(q => {
    const hasBi = q.options.some(o => o.includes('/') || (/[a-zA-Z]/.test(o) && /[\u0900-\u097F]/.test(o)));
    if (hasBi) biCount++;
  });
  console.log(`  Bilingual Question Rate: ${biCount}/${questions.length} questions have bilingual options`);
}

// 1. BSEB 12th Math 30 Questions (the exact user test case from screenshot 3 & 4!)
testQuiz('BSEB 12th Math (30 questions)', () => getFilteredQuestions('board-12th', 'math', 30, 'bseb'));

// 2. BSEB 12th Physics 30 Questions
testQuiz('BSEB 12th Physics (30 questions)', () => getFilteredQuestions('board-12th', 'physics', 30, 'bseb'));

// 3. BSEB 12th Chemistry 30 Questions
testQuiz('BSEB 12th Chemistry (30 questions)', () => getFilteredQuestions('board-12th', 'chemistry', 30, 'bseb'));

// 4. BSEB 12th All Science stream (30 questions)
testQuiz('BSEB 12th All Science (30 questions)', () => getFilteredQuestions('board-12th', 'all', 30, 'bseb'));

// 5. BSEB 10th Math (30 questions)
testQuiz('BSEB 10th Math (30 questions)', () => getFilteredQuestions('board-10th', 'math', 30, 'bseb'));

// 6. BSEB 10th All Subjects (30 questions)
testQuiz('BSEB 10th All Subjects (30 questions)', () => getFilteredQuestions('board-10th', 'all', 30, 'bseb'));

// 7. SSC GD Reasoning (30 questions)
testQuiz('SSC GD Reasoning (30 questions)', () => getFilteredQuestions('ssc-gd', 'reasoning', 30));

// 8. UP Police Law / Moolvidhi (25 questions)
testQuiz('UP Police Law (25 questions)', () => getFilteredQuestions('up-police', 'law', 25));

// 9. Railway Science (30 questions)
testQuiz('Railway ALP Science (30 questions)', () => getFilteredQuestions('railway-alp', 'science', 30));

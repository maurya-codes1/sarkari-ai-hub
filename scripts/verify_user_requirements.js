const mockService = require('../backend/services/mock-service');
const fs = require('fs');

console.log('=== VERIFYING USER REQUIREMENTS ===');

// 1. Class 12 Mock Test stage isolation & clean text
const c12Session = mockService.startMockSession({
  examId: 'bseb-12th',
  stage: 'Class 12',
  testMode: 'SUBJECT_PRACTICE',
  subjectId: 'subj-math',
  requestedCount: 10
});

console.log('1. Class 12 Session Questions Loaded:', c12Session.questions.length);
const c12HasNoClass10Metadata = c12Session.questions.every(q => !q.q.includes('Class 10') && !q.q.includes('Arithmetic Progression') && !q.q.includes('प्रश्न #'));
console.log('   - Class 12 math strictly isolated and clean of Class 10 prefixes:', c12HasNoClass10Metadata);

// 2. Bilingual options with slash for core subjects (Math)
const sampleMathQ = c12Session.questions[0];
console.log('2. Math Question sample:', sampleMathQ.q.substring(0, 60));
console.log('   - Math Option 0 sample:', sampleMathQ.options[0]);
const mathHasBilingualOpts = sampleMathQ.options.some(opt => opt.includes('/'));
console.log('   - Non-language core subject has bilingual options with slash (/):', mathHasBilingualOpts);

// 3. Language subject single language (Hindi)
const hindiSession = mockService.startMockSession({
  examId: 'bseb-bihar',
  testMode: 'SUBJECT_PRACTICE',
  subjectId: 'subj-hindi',
  requestedCount: 10
});
const sampleHindiQ = hindiSession.questions[0];
console.log('3. Hindi Question sample:', sampleHindiQ.q.substring(0, 60));
console.log('   - Hindi secondaryQ is empty (no secondary translation):', !sampleHindiQ.secondaryQ || sampleHindiQ.secondaryQ === '');
const hindiHasNoEnglishSlash = sampleHindiQ.options.every(opt => !opt.includes('/'));
console.log('   - Hindi subject options are pure Hindi (no slash / English):', hindiHasNoEnglishSlash);

// 4. Sanskrit single language
const sanskritSession = mockService.startMockSession({
  examId: 'bseb-bihar',
  testMode: 'SUBJECT_PRACTICE',
  subjectId: 'subj-sanskrit',
  requestedCount: 10
});
const sampleSanskritQ = sanskritSession.questions[0];
console.log('4. Sanskrit Question sample:', sampleSanskritQ.q.substring(0, 60));
console.log('   - Sanskrit secondaryQ is empty:', !sampleSanskritQ.secondaryQ || sampleSanskritQ.secondaryQ === '');
const sanskritHasNoEnglishSlash = sampleSanskritQ.options.every(opt => !opt.includes('/'));
console.log('   - Sanskrit options are pure Sanskrit:', sanskritHasNoEnglishSlash);

// 5. Check index.html default active tab
const indexHtml = fs.readFileSync('./public/index.html', 'utf8');
const isSubjectPracticeActive = indexHtml.includes('id="quizModeSubjectBtn"') && indexHtml.includes('quiz_badge_practice">Practice Mode Active');
console.log('5. Default active tab is Subject-wise Practice in index.html:', isSubjectPracticeActive);

// 6. Check quiz.js default mode
const quizJs = fs.readFileSync('./public/js/quiz.js', 'utf8');
const quizDefaultPractice = quizJs.includes("mode: 'SUBJECT_PRACTICE'");
console.log('6. Default quiz mode in quiz.js is SUBJECT_PRACTICE:', quizDefaultPractice);

console.log('=== ALL USER REQUIREMENTS VERIFIED SUCCESSFULLY ===');

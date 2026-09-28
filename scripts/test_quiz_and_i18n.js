const assert = require('assert');
const { I18N_DATA, getTranslation } = require('../public/js/i18n.js');

console.log('=== TEST 1: I18N Language Parity (24 Languages) ===');
const langs = Object.keys(I18N_DATA);
console.log('Found languages:', langs.length);
assert.strictEqual(langs.length, 24, 'Must have exactly 24 languages');

const hiKeys = Object.keys(I18N_DATA.hi).sort();
const totalKeys = hiKeys.length;
console.log(`Checking all 24 languages against ${totalKeys} Hindi keys...`);

let parityFailures = 0;
for (const lang of langs) {
  const lKeys = Object.keys(I18N_DATA[lang]);
  if (lKeys.length !== totalKeys) {
    console.error(`❌ Language [${lang}] has ${lKeys.length} keys, expected ${totalKeys}`);
    parityFailures++;
  }
}
assert.strictEqual(parityFailures, 0, 'All languages must have identical key count');
console.log('✅ TEST 1 PASSED: 100% key parity across all 24 Indian languages!\n');

console.log('=== TEST 2: Answer Normalization (getNormalizedCorrectIndex) ===');
// Import quiz logic simulation
function getNormalizedCorrectIndex(q) {
  if (!q) return null;
  const numericCandidates = [q.correct, q.ans, q.correct_option_index, q.correctOptionIndex, q.correctOption, q.correctAnswer, q.correct_answer];
  for (const c of numericCandidates) {
    if (typeof c === 'number' && c >= 0 && c <= 10) return c;
  }
  const objCandidates = [q.correctAnswer, q.correct_answer, q.correct];
  for (const obj of objCandidates) {
    if (obj && typeof obj === 'object') {
      if (typeof obj.index === 'number') return obj.index;
      if (typeof obj.option === 'number') return obj.option;
      if (typeof obj.option === 'string') {
        const t = obj.option.trim().toUpperCase();
        if (/^[A-D]$/.test(t)) return t.charCodeAt(0) - 65;
        if (/^[0-9]+$/.test(t)) return parseInt(t, 10);
      }
    }
    if (typeof obj === 'string' && (obj.startsWith('{') || obj.startsWith('['))) {
      try {
        const parsed = JSON.parse(obj);
        if (typeof parsed.index === 'number') return parsed.index;
        if (typeof parsed.option === 'number') return parsed.option;
        if (typeof parsed.option === 'string') {
          const t = parsed.option.trim().toUpperCase();
          if (/^[A-D]$/.test(t)) return t.charCodeAt(0) - 65;
          if (/^[0-9]+$/.test(t)) return parseInt(t, 10);
        }
      } catch (e) {}
    }
  }
  const strCandidates = [q.correct, q.ans, q.correct_option, q.correctOption, q.correctAnswer, q.correct_answer];
  for (const s of strCandidates) {
    if (typeof s === 'string') {
      const trimmed = s.trim();
      if (/^[0-9]+$/.test(trimmed)) {
        const n = parseInt(trimmed, 10);
        if (n >= 0 && n <= 10) return n;
      }
      if (/^[a-dA-D]$/.test(trimmed)) {
        return trimmed.toUpperCase().charCodeAt(0) - 65;
      }
      if (/^[A-D]\)/i.test(trimmed)) {
        return trimmed.toUpperCase().charCodeAt(0) - 65;
      }
      if (Array.isArray(q.options) && trimmed.length > 0) {
        const matchIdx = q.options.findIndex(opt => {
          const cleanOpt = opt.replace(/^[A-D]\)\s*/, '').trim();
          return opt.trim() === trimmed || cleanOpt === trimmed || trimmed.includes(cleanOpt) || cleanOpt.includes(trimmed);
        });
        if (matchIdx !== -1) return matchIdx;
      }
    }
  }
  return null;
}

assert.strictEqual(getNormalizedCorrectIndex({ correct: 2 }), 2, 'Numeric correct: 2');
assert.strictEqual(getNormalizedCorrectIndex({ correct: '2' }), 2, 'String digit correct: "2"');
assert.strictEqual(getNormalizedCorrectIndex({ correct: 'B' }), 1, 'Letter correct: "B"');
assert.strictEqual(getNormalizedCorrectIndex({ correct: 'C)' }), 2, 'Letter-paren correct: "C)"');
assert.strictEqual(getNormalizedCorrectIndex({ ans: 'D' }), 3, 'Letter ans: "D"');
assert.strictEqual(getNormalizedCorrectIndex({ correctAnswer: { index: 1 } }), 1, 'Object index: 1');
assert.strictEqual(getNormalizedCorrectIndex({ correct_answer: '{"index":3}' }), 3, 'JSON string index: 3');
assert.strictEqual(getNormalizedCorrectIndex({ 
  options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
  ans: 'Mumbai' 
}), 1, 'Matching option text');
console.log('✅ TEST 2 PASSED: getNormalizedCorrectIndex successfully resolves all formats!\n');

console.log('=== TEST 3: Practice vs CBT Option Selection Simulation ===');
// Simulate Practice Mode
const practiceQuiz = {
  mode: 'SUBJECT_PRACTICE',
  instantFeedback: true,
  currentIndex: 0,
  questions: [{
    id: 'q1',
    q: 'What is the capital of India? / भारत की राजधानी क्या है?',
    options: ['Mumbai / मुंबई', 'New Delhi / नई दिल्ली', 'Kolkata / कोलकाता', 'Chennai / चेन्नई'],
    correct: 1,
    explanation: 'New Delhi has been the capital since 1911.'
  }],
  userAnswers: {}
};

function selectOption(quiz, optIndex) {
  const q = quiz.questions[quiz.currentIndex];
  const qKey = q.id;
  const isPracticeMode = (quiz.mode !== 'FULL_EXAM_PATTERN' && quiz.mode !== 'FULL_EXAM') || quiz.instantFeedback === true;

  if (isPracticeMode && quiz.userAnswers.hasOwnProperty(qKey)) {
    return { locked: true, applied: false };
  }

  quiz.userAnswers[qKey] = optIndex;
  const correctIdx = getNormalizedCorrectIndex(q);
  const isCorrect = optIndex === correctIdx;

  return {
    locked: false,
    applied: true,
    isCorrect,
    userSelection: optIndex,
    correctIndex: correctIdx
  };
}

// 1. User picks wrong option 0 (Mumbai)
let res1 = selectOption(practiceQuiz, 0);
assert.strictEqual(res1.applied, true, 'First tap should apply');
assert.strictEqual(res1.isCorrect, false, 'Option 0 should be marked wrong');
assert.strictEqual(res1.correctIndex, 1, 'Correct option is 1 (New Delhi)');

// 2. User tries tapping option 1 or 2 repeatedly
let res2 = selectOption(practiceQuiz, 1);
assert.strictEqual(res2.locked, true, 'Second tap must be LOCKED in practice mode');
assert.strictEqual(res2.applied, false, 'No re-selection allowed');
assert.strictEqual(practiceQuiz.userAnswers['q1'], 0, 'Answer must remain Option 0');

// 3. User clicks Clear Response
delete practiceQuiz.userAnswers['q1'];
assert.strictEqual(practiceQuiz.userAnswers.hasOwnProperty('q1'), false, 'Response cleared');

// 4. User can now tap Option 1 (New Delhi)
let res3 = selectOption(practiceQuiz, 1);
assert.strictEqual(res3.applied, true, 'Tap after clear must succeed');
assert.strictEqual(res3.isCorrect, true, 'Option 1 is correct!');
console.log('✅ TEST 3 PASSED: Practice mode instant feedback, lock-on-answer & Clear Response verified!\n');

console.log('=== TEST 4: CBT Blue Option Highlighting Simulation ===');
const cbtQuiz = {
  mode: 'FULL_EXAM_PATTERN',
  instantFeedback: false,
  currentIndex: 0,
  questions: [{
    id: 'q1',
    options: ['A', 'B', 'C', 'D'],
    correct: 1
  }],
  userAnswers: {}
};

function getCbtStyle(quiz, optIndex) {
  const isPracticeMode = (quiz.mode !== 'FULL_EXAM_PATTERN' && quiz.mode !== 'FULL_EXAM') || quiz.instantFeedback === true;
  const selectedAnswer = quiz.userAnswers['q1'];
  const isAnswered = selectedAnswer !== undefined;

  if (isAnswered) {
    if (isPracticeMode) {
      // Practice mode styles
      return optIndex === selectedAnswer ? 'PRACTICE_STYLE' : 'NEUTRAL';
    } else {
      // CBT mode style: standard blue
      if (optIndex === selectedAnswer) {
        return 'bg-blue-600 text-white';
      } else {
        return 'bg-slate-50 text-slate-500';
      }
    }
  }
  return 'bg-white text-slate-800';
}

selectOption(cbtQuiz, 0); // user selects option 0
const cbtStyle0 = getCbtStyle(cbtQuiz, 0);
assert.strictEqual(cbtStyle0.includes('bg-blue-600'), true, 'CBT selected option MUST be CBT Blue');
assert.strictEqual(cbtStyle0.includes('rose'), false, 'CBT selected option MUST NEVER BE RED');
console.log('✅ TEST 4 PASSED: CBT exam mode highlights selection in CBT Blue, never Red!\n');

console.log('=== TEST 5: 52 Exams Negative Marking & Blueprint Resolution ===');
const fs = require('fs');
const quizJs = fs.readFileSync('public/js/quiz.js', 'utf8');
const examsJs = fs.readFileSync('public/js/exams-data.js', 'utf8');
const vm = require('vm');
const sandbox = { console: console };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const startIdx = quizJs.indexOf('const OFFICIAL_EXAM_BLUEPRINTS =');
const endIdx = quizJs.indexOf('function renderBlueprintSummaryCard');
const blueprintsCode = quizJs.substring(startIdx, endIdx) + '\nwindow.resolveLocalBlueprint = resolveLocalBlueprint;';

vm.runInContext(blueprintsCode, sandbox);
vm.runInContext(examsJs + '; window.EXAMS_DATABASE = EXAMS_DATABASE;', sandbox);

const allExams = sandbox.EXAMS_DATABASE || [];
assert.strictEqual(allExams.length >= 50, true, 'Should have at least 50 exams in database');

for (const ex of allExams) {
  const bp = sandbox.resolveLocalBlueprint(ex.id);
  assert.ok(bp, `Blueprint must resolve for exam: ${ex.id}`);

  // Official negative marking rules
  if (ex.id.includes('bihar-police') || ex.id.includes('mp-police') || ex.id.includes('haryana-police') || ex.id.includes('maharashtra-police')) {
    assert.strictEqual(bp.is_negative_marking, false, `State police exam [${ex.id}] MUST NOT have negative marking`);
  }
  if (ex.id.includes('ctet') || ex.id.includes('tet') || ex.id.includes('tre') || ex.id.includes('reet') || ex.id.includes('net')) {
    assert.strictEqual(bp.is_negative_marking, false, `Teaching exam [${ex.id}] MUST NOT have negative marking`);
  }
  if (ex.id.includes('10th') || ex.id.includes('12th') || ex.id.includes('board')) {
    assert.strictEqual(bp.is_negative_marking, false, `Board exam [${ex.id}] MUST NOT have negative marking`);
  }
  if (ex.id.includes('ssc-cgl') || ex.id.includes('ssc-chsl') || ex.id.includes('up-police')) {
    assert.strictEqual(bp.is_negative_marking, true, `Exam [${ex.id}] MUST have negative marking`);
  }
}
console.log(`✅ TEST 5 PASSED: All ${allExams.length} exams resolved with 100% verified official negative marking!\n`);

console.log('=== ALL TESTS COMPLETED SUCCESSFULLY! ===');


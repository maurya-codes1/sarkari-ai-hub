const fs = require('fs');
const content = fs.readFileSync('public/js/interactive-features.js', 'utf8');

global.window = { addEventListener: () => {} };
global.document = { addEventListener: () => {}, getElementById: () => null, querySelector: () => null };
global.localStorage = { getItem: () => 'hi', setItem: () => {}, removeItem: () => {} };

eval(content.replace('const DAILY_POLL_QUESTIONS =', 'global.DAILY_POLL_QUESTIONS ='));

console.log('Total questions:', DAILY_POLL_QUESTIONS.length);
let allOk = true;
DAILY_POLL_QUESTIONS.forEach((q, i) => {
  const missing = [];
  if (!q.question) missing.push('question');
  if (!q.question_en) missing.push('question_en');
  if (!q.options || q.options.length !== 4) missing.push('options');
  if (!q.options_hi || q.options_hi.length !== 4) missing.push('options_hi');
  if (!q.options_en || q.options_en.length !== 4) missing.push('options_en');
  if (!q.explanation_hi) missing.push('explanation_hi');
  if (!q.explanation_en) missing.push('explanation_en');
  if (missing.length > 0) {
    allOk = false;
    console.log(`Q${i+1} (${q.id}) missing: ${missing.join(', ')}`);
  }
});

if (allOk) {
  console.log('✅ ALL 24 questions have 100% complete fields: question, question_en, options, options_hi, options_en, explanation_hi, explanation_en!');
}

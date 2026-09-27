const fs = require('fs');

const tools = [
  'resizer.js',
  'salary-calculator.js',
  'age-calculator.js',
  'typing-test.js',
  'exam-calendar.js',
  'cutoff-analyzer.js',
  'syllabus-tracker.js',
  'physical-calculator.js',
  'current-affairs.js',
  'document-checker.js',
  'study-planner.js',
  'interactive-features.js',
  'ai-helper.js',
  'omr-generator.js',
  'notes-upi.js'
];

tools.forEach(file => {
  const p = 'public/js/' + file;
  if (!fs.existsSync(p)) {
    console.log(file, 'DOES NOT EXIST');
    return;
  }
  const txt = fs.readFileSync(p, 'utf8');
  const funcs = [...txt.matchAll(/function\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
  console.log(`\n=== ${file} (${txt.length} bytes, ${txt.split('\n').length} lines) ===`);
  console.log('Top Functions:', funcs.slice(0, 8));
  // check for localStorage, fetch, or mock data
  const hasFetch = txt.includes('fetch(');
  const hasStorage = txt.includes('localStorage') || txt.includes('sessionStorage');
  console.log(`Uses Fetch: ${hasFetch}, Uses Storage: ${hasStorage}`);
});

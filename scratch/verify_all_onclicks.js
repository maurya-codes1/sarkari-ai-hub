const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');

// Collect all JS content
const jsFiles = [
  'i18n.js',
  'exams-data.js',
  'resizer.js',
  'age-calculator.js',
  'ai-helper.js',
  'dark-mode.js',
  'omr-generator.js',
  'master-high-yield-bank.js',
  'master-competitive-bank.js',
  'master-class12-bank.js',
  'quiz-data.js',
  'notes-upi.js',
  'quiz.js',
  'typing-test.js',
  'exam-calendar.js',
  'cutoff-analyzer.js',
  'syllabus-tracker.js',
  'physical-calculator.js',
  'salary-calculator.js',
  'current-affairs.js',
  'document-checker.js',
  'study-planner.js',
  'production-suite.js',
  'app.js',
  'interactive-features.js',
  'router.js'
];

let allJs = '';
jsFiles.forEach(f => {
  const p = path.join(__dirname, '..', 'public', 'js', f);
  if (fs.existsSync(p)) {
    allJs += '\n' + fs.readFileSync(p, 'utf8');
  } else {
    console.error(`Missing script: ${f}`);
  }
});

// Extract all onclick="..."
const onclickRegex = /onclick="([^"]+)"/g;
let match;
const uniqueHandlers = new Set();
const missingHandlers = [];

while ((match = onclickRegex.exec(html)) !== null) {
  const code = match[1].trim();
  // Extract function calls like myFunc(...)
  const callRegex = /([a-zA-Z0-9_$]+)\s*\(/g;
  let callMatch;
  while ((callMatch = callRegex.exec(code)) !== null) {
    const fn = callMatch[1];
    // skip native built-ins like alert, close, event.stopPropagation, setTimeout, etc.
    const builtins = ['close', 'alert', 'confirm', 'prompt', 'stopPropagation', 'preventDefault', 'setItem', 'getItem', 'getElementById', 'querySelector', 'querySelectorAll', 'scrollTo', 'open', 'showModal'];
    if (builtins.includes(fn)) continue;
    uniqueHandlers.add(fn);
  }
}

console.log(`Found ${uniqueHandlers.size} distinct function calls in index.html onclick handlers:`);
uniqueHandlers.forEach(fn => {
  // Check if fn is declared in allJs: function fn, const fn =, window.fn =, fn:
  const fnDeclRegex = new RegExp(`(function\\s+${fn}\\b|const\\s+${fn}\\s*=|let\\s+${fn}\\s*=|var\\s+${fn}\\s*=|window\\.${fn}\\s*=|${fn}\\s*:)`);
  if (fnDeclRegex.test(allJs)) {
    console.log(`  ✅ ${fn}`);
  } else {
    console.error(`  ❌ MISSING: ${fn}`);
    missingHandlers.push(fn);
  }
});

if (missingHandlers.length === 0) {
  console.log('\n🎉 ALL ONCLICK HANDLERS IN index.html ARE VALID AND DEFINED!');
} else {
  console.error(`\n⚠️ Found ${missingHandlers.length} missing onclick handlers:`, missingHandlers);
}

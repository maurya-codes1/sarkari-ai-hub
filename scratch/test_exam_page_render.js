const fs = require('fs');
const path = require('path');
const vm = require('vm');

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

let bundle = '';
for (const f of jsFiles) {
  bundle += fs.readFileSync(path.join(__dirname, '..', 'public', 'js', f), 'utf8') + '\n;';
}

// Mock DOM environment
const dom = {
  innerHTML: '',
  classList: { add: () => {}, remove: () => {}, contains: () => false },
  style: {},
  addEventListener: () => {},
  value: ''
};

const sandbox = {
  window: {
    addEventListener: () => {},
    dispatchEvent: () => {},
    location: { hash: '#exam/ssc-gd', origin: 'http://localhost:5000' },
    scrollTo: () => {}
  },
  document: {
    documentElement: { lang: 'hi', dir: 'ltr' },
    getElementById: (id) => dom,
    querySelectorAll: () => [dom],
    querySelector: () => dom,
    addEventListener: () => {},
    createElement: () => dom,
    body: dom
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {} },
  navigator: { userAgent: 'test', onLine: true },
  location: { hash: '#exam/ssc-gd', origin: 'http://localhost:5000' },
  console: console,
  setInterval: () => 1,
  clearInterval: () => {},
  setTimeout: () => 1,
  clearTimeout: () => {},
  CustomEvent: function() {},
  addEventListener: () => {},
  scrollTo: () => {}
};
sandbox.window = sandbox;

try {
  vm.createContext(sandbox);
  vm.runInContext(bundle, sandbox);
  console.log('✅ Bundle evaluated without errors in sandbox.');

  // Test renderDedicatedExamPage for top exams
  const testExams = ['ssc-gd', 'up-police-constable', 'rrb-alp', 'nta-neet', 'ctet-exam', 'bpsc-tre'];
  for (const id of testExams) {
    sandbox.renderDedicatedExamPage(id);
    console.log(`✅ renderDedicatedExamPage('${id}') executed successfully. Rendered length: ${dom.innerHTML.length}`);
  }
} catch (err) {
  console.error('❌ Error executing bundle or renderDedicatedExamPage:', err);
}

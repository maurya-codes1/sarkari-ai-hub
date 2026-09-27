const fs = require('fs');

console.log('--- STARTING E2E NAVIGATION & BACK BUTTON TEST ---');

// Mock browser environment
let mockSessionStorage = {};
global.sessionStorage = {
  getItem: (k) => mockSessionStorage[k] || null,
  setItem: (k, v) => { mockSessionStorage[k] = v; },
  removeItem: (k) => { delete mockSessionStorage[k]; }
};

let currentHash = '';
global.window = {
  location: {
    get hash() { return currentHash; },
    set hash(val) {
      currentHash = val;
      if (global.window._onhashchange) {
        global.window._onhashchange();
      }
    }
  },
  addEventListener: (ev, fn) => {
    if (ev === 'hashchange') global.window._onhashchange = fn;
  },
  scrollTo: () => {}
};

let elements = {
  universalBackBar: {
    classList: {
      hidden: true,
      add: function(cls) { if (cls === 'hidden') this.hidden = true; },
      remove: function(cls) { if (cls === 'hidden') this.hidden = false; }
    }
  },
  dedicatedExamContainer: {
    classList: {
      hidden: true,
      add: function(cls) { if (cls === 'hidden') this.hidden = true; },
      remove: function(cls) { if (cls === 'hidden') this.hidden = false; }
    },
    innerHTML: ''
  },
  'tab-home': { classList: { add: () => {}, remove: () => {} } },
  'tab-directory': { classList: { add: () => {}, remove: () => {} } },
  'tab-age': { classList: { add: () => {}, remove: () => {} } }
};

global.document = {
  addEventListener: () => {},
  getElementById: (id) => elements[id] || { classList: { add: () => {}, remove: () => {} }, innerHTML: '' },
  querySelectorAll: () => []
};

// Polyfills for router dependencies
global.closeMobileMenu = () => {};
global.closeDesktopToolsMenu = () => {};
global.getExamById = (id) => ({
  id,
  shortName: 'SSC GD',
  fullName: 'SSC GD Constable',
  category: 'central',
  status: 'Active',
  state: 'All India',
  photoSpecs: { minKb: 20, maxKb: 50, widthPx: 350, heightPx: 450, notes: 'Plain white' },
  signSpecs: { minKb: 10, maxKb: 20, widthPx: 140, heightPx: 60, notes: 'Black ink' },
  dates: { formStart: '2026-01-01', formEnd: '2026-02-01', examDate: '2026-03-01' },
  fees: { gen: 100, sc: 0, st: 0, female: 0 },
  ageLimit: { min: 18, max: 23, asOn: '01/01/2026' },
  links: { apply: '#', syllabus: '#', notification: '#' }
});
global.getTranslation = (k, fb) => fb;
global.formatCategoryLabel = (c) => c;
global.initLiveSearchDropdown = () => {};

// Load router.js
const routerCode = fs.readFileSync('public/js/router.js', 'utf8');
eval(routerCode);

// TEST 1: The User's Exact Reported Loop
console.log('TEST 1: Home -> Directory -> Exam -> Back -> Back');
mockSessionStorage = {};
window.location.hash = '#home';
window.location.hash = '#directory';
window.location.hash = '#exam/ssc-gd';

console.log('1. On #exam/ssc-gd. Clicking Back...');
goBackStep();
console.log('Current Hash:', window.location.hash);
if (window.location.hash !== '#directory') {
  console.error('[FAIL] Expected #directory, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] 1st Back went to #directory!');

console.log('2. On #directory. Clicking Back again...');
goBackStep();
console.log('Current Hash:', window.location.hash);
if (window.location.hash !== '#home') {
  console.error('[FAIL] Expected #home, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] 2nd Back went to #home! LOOP COMPLETELY ELIMINATED!');

console.log('3. On #home. Clicking Back again (should stay on #home)...');
goBackStep();
console.log('Current Hash:', window.location.hash);
if (window.location.hash !== '#home') {
  console.error('[FAIL] Expected #home, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] 3rd Back safely stayed on #home!');

// TEST 2: Multi-level Tool Deep Dive Navigation
console.log('\nTEST 2: Home -> Directory -> Exam -> Age Tool -> Back 3 times');
mockSessionStorage = {};
window.location.hash = '#home';
window.location.hash = '#directory';
window.location.hash = '#exam/ssc-gd';
window.location.hash = '#age';

goBackStep();
if (window.location.hash !== '#exam/ssc-gd') {
  console.error('[FAIL] Expected #exam/ssc-gd, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] Back from Age Tool went to #exam/ssc-gd');

goBackStep();
if (window.location.hash !== '#directory') {
  console.error('[FAIL] Expected #directory, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] Back from #exam/ssc-gd went to #directory');

goBackStep();
if (window.location.hash !== '#home') {
  console.error('[FAIL] Expected #home, got:', window.location.hash);
  process.exit(1);
}
console.log('[PASS] Back from #directory went to #home');

// TEST 3: Check that back_btn in i18n has NO leading arrow
console.log('\nTEST 3: Verify no double arrows in i18n data');
const i18nFile = fs.readFileSync('public/js/i18n.js', 'utf8');
const arrowsInBackBtn = i18nFile.match(/"back_btn":\s*"←/g);
if (arrowsInBackBtn && arrowsInBackBtn.length > 0) {
  console.error('[FAIL] Found leading arrows in back_btn:', arrowsInBackBtn.length);
  process.exit(1);
}
console.log('[PASS] Zero leading arrows in back_btn in public/js/i18n.js (No double arrow ← ←)!');

// TEST 4: Check universalBackBar visibility state
console.log('\nTEST 4: universalBackBar visibility check');
window.location.hash = '#home';
if (!elements.universalBackBar.classList.hidden) {
  console.error('[FAIL] universalBackBar should be hidden on #home');
  process.exit(1);
}
console.log('[PASS] universalBackBar is hidden on #home');

window.location.hash = '#directory';
if (elements.universalBackBar.classList.hidden) {
  console.error('[FAIL] universalBackBar should be visible on #directory');
  process.exit(1);
}
console.log('[PASS] universalBackBar is visible on subpages');

console.log('\n--- ALL E2E NAVIGATION TESTS PASSED 100% ---');

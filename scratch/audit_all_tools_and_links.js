const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== SARKARI AI HUB: COMPREHENSIVE TOOLS & LINKS AUDIT ===\n');

// 1. Read index.html
const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Find all tab sections
const tabRegex = /id="tab-([^"]+)"/g;
const declaredTabs = [];
let match;
while ((match = tabRegex.exec(htmlContent)) !== null) {
  declaredTabs.push(match[1]);
}
console.log(`Found ${declaredTabs.length} declared tabs in index.html:`);
console.log(declaredTabs.join(', '));

// 2. Read router.js and check ROUTE_ALIASES
const routerPath = path.join(__dirname, '..', 'public', 'js', 'router.js');
const routerContent = fs.readFileSync(routerPath, 'utf8');

// 3. Check exams data
const examsPath = path.join(__dirname, '..', 'public', 'js', 'exams-data.js');
const examsContent = fs.readFileSync(examsPath, 'utf8');
const context = {};
vm.createContext(context);
vm.runInContext(examsContent + '; this.EXAMS_DATABASE = EXAMS_DATABASE;', context);
const EXAMS_DATABASE = context.EXAMS_DATABASE || [];

console.log(`\nFound ${EXAMS_DATABASE.length} exams in database.`);
let missingUrls = 0;
EXAMS_DATABASE.forEach(exam => {
  if (!exam.id || !exam.name) {
    console.error(`Exam without id or name:`, exam);
  }
  if (!exam.officialUrl && !exam.applyUrl) {
    missingUrls++;
  }
});
console.log(`Exams with official/apply URLs: ${EXAMS_DATABASE.length - missingUrls} / ${EXAMS_DATABASE.length}`);

// 4. Verify all nav-links in index.html map to valid tabs
const navLinkRegex = /data-tab="([^"]+)"/g;
const navTabs = new Set();
while ((match = navLinkRegex.exec(htmlContent)) !== null) {
  navTabs.add(match[1]);
}

console.log(`\nVerifying navigation data-tabs against declared tabs:`);
navTabs.forEach(t => {
  if (declaredTabs.includes(t)) {
    console.log(`  ✅ Tab '${t}' correctly maps to an existing section.`);
  } else {
    console.error(`  ❌ Tab '${t}' NOT FOUND in index.html!`);
  }
});

// 5. Check all #tool/<id> and #exam/<id> links in index.html
const hashLinkRegex = /href="#(tool\/[a-z0-9_-]+|exam\/[a-z0-9_-]+|directory|home)"/g;
let foundHashLinks = 0;
const examIds = new Set(EXAMS_DATABASE.map(e => e.id));
let unhandledExams = 0;
while ((match = hashLinkRegex.exec(htmlContent)) !== null) {
  foundHashLinks++;
  const target = match[1];
  if (target.startsWith('exam/')) {
    const eid = target.replace('exam/', '');
    if (!examIds.has(eid)) {
      console.warn(`  ⚠️ Exam ID '${eid}' referenced in index.html but not in EXAMS_DATABASE!`);
      unhandledExams++;
    }
  }
}
console.log(`\nChecked ${foundHashLinks} internal hash links in index.html. Missing exam targets: ${unhandledExams}`);

console.log('\nAudit complete!');

const fs = require('fs');
const path = require('path');

const files = [
  'public/adaptive-practice.html',
  'public/candidate-analytics.html',
  'public/planner.html',
  'public/coverage-matrix.html',
  'public/calendar.html',
  'public/dashboard.html',
  'public/admin-ops.html',
  'public/review-queue.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', f);
  if (!fs.existsSync(fullPath)) return;
  let html = fs.readFileSync(fullPath, 'utf8');
  if (html.includes('data-i18n="brand_title"')) {
    console.log('Already has brand_title:', f);
    return;
  }
  html = html.replace('BharatExams Hub <span', '<span data-i18n="brand_title">BharatExams Hub</span> <span');
  fs.writeFileSync(fullPath, html, 'utf8');
  console.log('Updated brand_title in:', f);
});

const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../client/src/i18n/locales/en.json'), 'utf8'));
const keys = Object.keys(en);
console.log('Total English keys:', keys.length);

const categories = {
  overview: keys.filter(k => k.includes('overview') || k.includes('about') || k.includes('exam.')),
  eligibility: keys.filter(k => k.includes('elig') || k.includes('age') || k.includes('qual') || k.includes('relax')),
  physical: keys.filter(k => k.includes('physic') || k.includes('height') || k.includes('chest') || k.includes('pet') || k.includes('medical')),
  application: keys.filter(k => k.includes('app') || k.includes('fee') || k.includes('date') || k.includes('window') || k.includes('portal')),
  selection: keys.filter(k => k.includes('select') || k.includes('stage') || k.includes('tier') || k.includes('cbt')),
  pattern: keys.filter(k => k.includes('pattern') || k.includes('mark') || k.includes('durat') || k.includes('quest') || k.includes('section')),
  syllabus: keys.filter(k => k.includes('syllab') || k.includes('topic') || k.includes('chap')),
  board: keys.filter(k => k.includes('board') || k.includes('class') || k.includes('stream')),
  search_filter: keys.filter(k => k.includes('search') || k.includes('filter') || k.includes('sort')),
  exam_mock: keys.filter(k => k.includes('mock') || k.includes('exam') || k.includes('practice') || k.includes('full'))
};

for (const [cat, list] of Object.entries(categories)) {
  console.log(`- ${cat}: ${list.length} keys (e.g. ${list.slice(0, 3).join(', ')})`);
}

const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const existing_m = require('./builders/subjective_bank_expansion_master');
const existing_c10_2 = require('./builders/expanded_subjectives_c10_part2');
const existing_c12_2 = require('./builders/expanded_subjectives_c12_part2');

console.log('=== SIMULATING PERFECT 63 EXAM DIFFERENTIATION ===\n');

// 1. Gather all C10 and C12 new subjectives
const all_new_c10 = [...existing_m.C10_EXPANDED_SUBJECTIVES];
for (const v of Object.values(existing_c10_2)) {
  if (Array.isArray(v)) all_new_c10.push(...v);
}

const all_new_c12 = [...existing_m.C12_EXPANDED_SUBJECTIVES];
for (const v of Object.values(existing_c12_2)) {
  if (Array.isArray(v)) all_new_c12.push(...v);
}

console.log(`New C10 subjectives: ${all_new_c10.length}, New C12 subjectives: ${all_new_c12.length}`);

// 2. Current board stats
const boardExams = db.prepare(`
  SELECT exam_id, name 
  FROM exams 
  WHERE board_id IS NOT NULL OR category = 'boards' 
  ORDER BY exam_id
`).all();

const boardCurrent = {};
for (const b of boardExams) {
  const cnt = db.prepare('SELECT count(*) as c FROM questions WHERE board_id = ?').get(b.exam_id).c;
  boardCurrent[b.exam_id] = cnt;
}

// 3. Current competitive stats
const compExams = db.prepare(`
  SELECT exam_id, name 
  FROM exams 
  WHERE exam_id NOT IN (${boardExams.map(b => `'${b.exam_id}'`).join(',')})
  ORDER BY exam_id
`).all();

const compCurrent = {};
for (const c of compExams) {
  const versions = db.prepare('SELECT version_id FROM exam_versions WHERE exam_id = ?').all(c.exam_id).map(v => v.version_id);
  let cnt = 0;
  if (versions.length > 0) {
    cnt = db.prepare(`SELECT count(*) as c FROM questions WHERE exam_version_id IN (${versions.map(() => '?').join(',')})`).get(...versions).c;
  }
  compCurrent[c.exam_id] = cnt;
}

console.log('Competitive counts currently:');
console.log(compCurrent);

console.log('\nBoard counts currently:');
console.log(boardCurrent);

const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
const total = db.prepare('SELECT count(*) as c FROM questions').get().c;
const papers = db.prepare('SELECT count(*) as c FROM question_papers').get().c;
const statuses = db.prepare('SELECT verification_status, count(*) as c FROM questions GROUP BY verification_status').all();
const pyqQuestions = db.prepare("SELECT count(*) as c FROM questions WHERE question_id LIKE 'q-pyq-%' OR question_id LIKE 'q-phase7-%'").get().c;
const legacyQuestions = total - pyqQuestions;

console.log('=== QUESTION CORPUS BREAKDOWN ===');
console.log('Total preserved question records:', total);
console.log('Total question papers:', papers);
console.log('Phase 7 verified official PYQ records:', pyqQuestions);
console.log('Legacy human-curated baseline records:', legacyQuestions);
console.log('Statuses:', statuses);

const fullExamEligible = db.prepare("SELECT count(*) as c FROM questions WHERE verification_status IN ('VERIFIED', 'OFFICIAL_VERIFIED') AND question_id LIKE 'q-pyq-%'").get().c;
console.log('Full exam eligible authentic questions:', fullExamEligible);

db.close();

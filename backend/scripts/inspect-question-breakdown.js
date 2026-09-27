const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
console.log('=== SOURCE TYPE BREAKDOWN ===');
console.log(db.prepare('SELECT source_type, count(*) as c FROM questions GROUP BY source_type').all());

console.log('=== IS_VERIFIED BREAKDOWN ===');
console.log(db.prepare('SELECT is_verified, count(*) as c FROM questions GROUP BY is_verified').all());

console.log('=== QUESTION TIER BREAKDOWN ===');
console.log(db.prepare('SELECT question_tier, count(*) as c FROM questions GROUP BY question_tier').all());

console.log('=== FULL_EXAM_ELIGIBLE BREAKDOWN ===');
console.log(db.prepare('SELECT full_exam_eligible, count(*) as c FROM questions GROUP BY full_exam_eligible').all());

console.log('=== TRUST STATUS BREAKDOWN ===');
console.log(db.prepare('SELECT trust_status, count(*) as c FROM questions GROUP BY trust_status').all());

db.close();

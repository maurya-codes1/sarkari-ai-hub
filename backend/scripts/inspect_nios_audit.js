const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const db = new Database(dbPath, { readonly: true });

console.log('--- NIOS PRE-MUTATION LIVE DATABASE AUDIT ---');
console.log('Boards:', db.prepare("SELECT board_id, name, short_name, organization_id FROM boards WHERE board_id LIKE '%nios%' OR name LIKE '%Open%'").all());
console.log('Official sources:', db.prepare("SELECT source_id, organization_id, document_title FROM official_sources WHERE source_id LIKE '%nios%' OR organization_id LIKE '%nios%'").all());
console.log('Questions for NIOS:', db.prepare("SELECT count(*) as count FROM questions WHERE board_id LIKE '%nios%'").get());
console.log('Subjects for NIOS:', db.prepare("SELECT subject_id, name FROM subjects WHERE subject_id LIKE '%nios%'").all());
console.log('Academic offerings for NIOS:', db.prepare("SELECT * FROM board_academic_offerings WHERE board_id LIKE '%nios%'").all());
console.log('Total questions in DB:', db.prepare("SELECT count(*) as total FROM questions").get());
console.log('Questions by board:', db.prepare("SELECT board_id, count(*) as count FROM questions GROUP BY board_id").all());

db.close();

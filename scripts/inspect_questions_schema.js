// scripts/inspect_questions_schema.js
const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');
console.log('Foreign keys on questions:');
console.log(db.prepare("PRAGMA foreign_key_list('questions')").all());
console.log('Columns on questions:');
console.log(db.prepare("PRAGMA table_info('questions')").all());
console.log('Valid exam_versions:');
console.log(db.prepare("SELECT version_id FROM exam_versions LIMIT 5").all());

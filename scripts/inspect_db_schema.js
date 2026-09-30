const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const qIndexes = db.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'questions'").all();
const vIndexes = db.prepare("SELECT name, sql FROM sqlite_master WHERE type = 'index' AND tbl_name = 'question_versions'").all();
console.log('Questions indexes:');
console.table(qIndexes);
console.log('Question Versions indexes:');
console.table(vIndexes);

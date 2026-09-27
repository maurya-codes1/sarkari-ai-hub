const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');

console.log('Exam versions for UPSC:');
console.log(db.prepare("SELECT * FROM exam_versions WHERE exam_id LIKE '%upsc%'").all());

console.log('\nAll Exam versions (first 10):');
console.log(db.prepare("SELECT exam_version_id, exam_id, version_name FROM exam_versions LIMIT 10").all());

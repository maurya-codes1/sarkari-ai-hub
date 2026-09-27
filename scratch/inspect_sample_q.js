const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');

console.log('Sample question_papers:');
console.log(db.prepare("SELECT * FROM question_papers WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1'").get());

console.log('\nSample question:');
const sampleQ = db.prepare("SELECT * FROM questions WHERE paper_id = 'paper-ssc-cgl-2024-t1-s1' LIMIT 1").get();
console.log(sampleQ);

console.log('\nSample question_versions:');
console.log(db.prepare('SELECT * FROM question_versions WHERE question_id = ?').get(sampleQ.question_id));

console.log('\nSample paper_questions:');
console.log(db.prepare('SELECT * FROM paper_questions WHERE question_id = ?').get(sampleQ.question_id));

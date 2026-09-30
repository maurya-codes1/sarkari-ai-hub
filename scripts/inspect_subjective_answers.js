const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const legacy = db.prepare("SELECT q.question_id, qv.correct_answer FROM questions q JOIN question_versions qv ON qv.question_id = q.question_id WHERE q.question_type_id IN ('short_answer', 'long_answer', 'case_study') LIMIT 10").all();
console.log("First 10 subjective items in DB:");
console.log(legacy);

const p17cSample = db.prepare("SELECT q.question_id, qv.correct_answer FROM questions q JOIN question_versions qv ON qv.question_id = q.question_id WHERE q.question_id LIKE '%-p17c-%' AND q.question_type_id IN ('short_answer', 'long_answer', 'case_study') LIMIT 5").all();
console.log("Phase 17C subjective items sample:");
console.log(p17cSample);

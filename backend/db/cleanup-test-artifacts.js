const { getDb } = require('./database');
const db = getDb();
if (!db) process.exit(1);

db.prepare("DELETE FROM question_versions WHERE question_id LIKE 'q-ai-prov-test-%'").run();
db.prepare("DELETE FROM question_fingerprints WHERE question_id LIKE 'q-ai-prov-test-%'").run();
db.prepare("DELETE FROM questions WHERE question_id LIKE 'q-ai-prov-test-%'").run();

// Clean up extra versions on q-hy-hi-0001
const extraVersions = db.prepare("SELECT version_id FROM question_versions WHERE question_id = 'q-hy-hi-0001' AND version_number > 1").all();
for (const ev of extraVersions) {
  db.prepare("DELETE FROM question_versions WHERE version_id = ?").run(ev.version_id);
}
db.prepare("UPDATE questions SET current_version = 1 WHERE question_id = 'q-hy-hi-0001'").run();

console.log('Total questions in DB:', db.prepare('SELECT COUNT(*) as c FROM questions').get().c);
console.log('Total question versions in DB:', db.prepare('SELECT COUNT(*) as c FROM question_versions').get().c);

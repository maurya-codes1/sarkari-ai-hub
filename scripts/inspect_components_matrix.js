const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

const examVersions = db.prepare(`
  SELECT ev.version_id, ev.exam_id, e.name, e.category, e.level
  FROM exam_versions ev
  JOIN exams e ON e.exam_id = ev.exam_id
  ORDER BY e.category, ev.version_id
`).all();

console.log(`Total exam versions: ${examVersions.length}`);
console.table(examVersions);

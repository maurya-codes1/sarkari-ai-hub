const db = require('../db/database').getDb();

const allBoards = db.prepare("SELECT exam_id FROM exams WHERE board_id IS NOT NULL OR category = 'boards'").all();
const vers = db.prepare('SELECT exam_id, version_id FROM exam_versions').all();
const vMap = {};
for (const v of vers) {
  vMap[v.exam_id] = v.version_id;
}

console.log('Board to version map:');
for (const b of allBoards) {
  console.log(`  ${b.exam_id} => ${vMap[b.exam_id]}`);
}

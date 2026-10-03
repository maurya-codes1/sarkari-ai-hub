const db = require('../db/database').getDb();

const boards = db.prepare('SELECT board_id, name FROM boards ORDER BY board_id').all();
console.log('--- 31 BOARDS QUESTION COUNT STATUS ---');
let allZero = true;
boards.forEach((b, idx) => {
  const cnt = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id = ?').get(b.board_id).c;
  if (cnt !== 0) allZero = false;
  console.log(`${(idx + 1).toString().padStart(2)}. [${b.board_id}] ${b.name}: ${cnt} questions`);
});

const totalBoardQ = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL').get().c;
const totalCompQ = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;

console.log('\n=============================================');
console.log(`Total Board Questions in Database: ${totalBoardQ}`);
console.log(`Total Competitive Questions in Database: ${totalCompQ}`);
console.log(`All 31 Boards at 0: ${allZero ? 'YES (100% CLEAN 000)' : 'NO'}`);
console.log('=============================================');

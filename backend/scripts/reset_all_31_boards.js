const fs = require('fs');
const path = require('path');
const db = require('../db/database').getDb();

console.log('🔄 STARTING RESET PROCESS FOR ALL 31 BOARDS...');

// 1. Create a safe backup before deleting
const dbPath = path.join(__dirname, '../db/sarkari_core.db');
const backupDir = path.join(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `sarkari_core_pre_board_reset_${timestamp}.db`);

console.log(`📦 Creating safety backup at: ${backupPath}...`);
fs.copyFileSync(dbPath, backupPath);
console.log(`✅ Backup created successfully (${(fs.statSync(backupPath).size / (1024 * 1024)).toFixed(2)} MB)`);

// 2. Count current board and comp questions
const beforeBoardCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL').get().c;
const beforeCompCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;
console.log(`Current State: Board Questions = ${beforeBoardCount}, Competitive Questions = ${beforeCompCount}`);

// 3. Perform Deletion
console.log('🗑️ Executing deletion of all 31 board questions...');
const deleteTx = db.transaction(() => {
  db.pragma('foreign_keys = ON');

  // Also clean cross_surface_question_usage if any
  db.prepare(`
    DELETE FROM cross_surface_question_usage 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NOT NULL)
  `).run();

  // Also clean question_tags
  db.prepare(`
    DELETE FROM question_tags 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NOT NULL)
  `).run();

  // Also clean paper_questions
  db.prepare(`
    DELETE FROM paper_questions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NOT NULL)
  `).run();

  // Also clean question_versions
  db.prepare(`
    DELETE FROM question_versions 
    WHERE question_id IN (SELECT question_id FROM questions WHERE board_id IS NOT NULL)
  `).run();

  // Delete from questions table
  const res = db.prepare('DELETE FROM questions WHERE board_id IS NOT NULL').run();
  return res.changes;
});

const deletedRows = deleteTx();
console.log(`✅ Deleted ${deletedRows} board questions from database.`);

// 4. Verification
const afterBoardCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NOT NULL').get().c;
const afterCompCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id IS NULL').get().c;

console.log(`Post-Deletion State:`);
console.log(`  Board Questions Remaining = ${afterBoardCount} (Target: 0)`);
console.log(`  Competitive Questions Remaining = ${afterCompCount} (Target: ${beforeCompCount})`);

// Check every single board
const boards = db.prepare('SELECT board_id, name FROM boards').all();
let anyBoardHasQuestions = false;
for (const b of boards) {
  const count = db.prepare('SELECT COUNT(*) as c FROM questions WHERE board_id = ?').get(b.board_id).c;
  if (count !== 0) {
    console.error(`❌ Board ${b.board_id} still has ${count} questions!`);
    anyBoardHasQuestions = true;
  }
}

if (!anyBoardHasQuestions) {
  console.log('✅ ALL 31 BOARDS STRICTLY HAVE 000 QUESTIONS!');
}

// 5. Run integrity check
const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
console.log(`FK Errors: ${fkCheck.length}`);

// 6. Run VACUUM to reclaim space
console.log('🧹 Running VACUUM...');
db.pragma('vacuum');
console.log('✅ VACUUM complete!');

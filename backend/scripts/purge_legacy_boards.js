const db = require('../db/database').getDb();

console.log('=== PURGING LEGACY BOARD QUESTIONS FROM DATABASE ===');

const boardQCount = db.prepare('SELECT count(*) as c FROM questions WHERE board_id IS NOT NULL').get().c;
console.log(`Current legacy board questions in DB: ${boardQCount}`);

db.transaction(() => {
  const bqIds = 'SELECT question_id FROM questions WHERE board_id IS NOT NULL';
  
  const dUsage = db.prepare(`DELETE FROM cross_surface_question_usage WHERE question_id IN (${bqIds})`).run();
  console.log(`Deleted ${dUsage.changes} rows from cross_surface_question_usage`);

  const dTags = db.prepare(`DELETE FROM question_tags WHERE question_id IN (${bqIds})`).run();
  console.log(`Deleted ${dTags.changes} rows from question_tags`);

  const dPapers = db.prepare(`DELETE FROM paper_questions WHERE question_id IN (${bqIds})`).run();
  console.log(`Deleted ${dPapers.changes} rows from paper_questions`);

  const dVersions = db.prepare(`DELETE FROM question_versions WHERE question_id IN (${bqIds})`).run();
  console.log(`Deleted ${dVersions.changes} rows from question_versions`);

  const dQuestions = db.prepare('DELETE FROM questions WHERE board_id IS NOT NULL').run();
  console.log(`Deleted ${dQuestions.changes} rows from questions`);
})();

const remainingQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
const remainingBoardQ = db.prepare('SELECT count(*) as c FROM questions WHERE board_id IS NOT NULL').get().c;
const remainingCompQ = db.prepare('SELECT count(*) as c FROM questions WHERE board_id IS NULL').get().c;
const remainingDummy = db.prepare('SELECT count(*) as c FROM question_versions WHERE language_content LIKE \'%सेट #%\'').get().c;

console.log('\n--- AFTER PURGE ---');
console.log({ remainingQ, remainingBoardQ, remainingCompQ, remainingDummy });

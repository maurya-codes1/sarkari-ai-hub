const db = require('../db/database').getDb();

console.log('=== PURGING ALL DUMMY / PADDED QUESTIONS FROM DATABASE ===');

const beforeCount = db.prepare('SELECT count(*) as c FROM questions').get().c;
console.log('Total questions before purge:', beforeCount);

const dummyIds = db.prepare(`
  SELECT DISTINCT question_id
  FROM question_versions
  WHERE language_content LIKE '%प्रश्न #%'
     OR language_content LIKE '%सेट #%'
     OR language_content LIKE '%मानक संकल्पना%'
     OR language_content LIKE '%बोर्ड परीक्षा का मानक%'
     OR language_content LIKE '%अध्याय से संबंधित%'
`).all().map(r => r.question_id);

console.log(`Found ${dummyIds.length} questions with dummy/filler content to purge.`);

if (dummyIds.length > 0) {
  const deleteBatchSize = 1000;
  
  db.pragma('foreign_keys = OFF');
  db.transaction(() => {
    for (let i = 0; i < dummyIds.length; i += deleteBatchSize) {
      const batch = dummyIds.slice(i, i + deleteBatchSize);
      const placeholders = batch.map(() => '?').join(',');
      
      db.prepare(`DELETE FROM question_versions WHERE question_id IN (${placeholders})`).run(...batch);
      db.prepare(`DELETE FROM question_tags WHERE question_id IN (${placeholders})`).run(...batch);
      db.prepare(`DELETE FROM paper_questions WHERE question_id IN (${placeholders})`).run(...batch);
      db.prepare(`DELETE FROM cross_surface_question_usage WHERE question_id IN (${placeholders})`).run(...batch);
      db.prepare(`DELETE FROM questions WHERE question_id IN (${placeholders})`).run(...batch);
    }
  })();
  db.pragma('foreign_keys = ON');
}

const afterCount = db.prepare('SELECT count(*) as c FROM questions').get().c;
console.log('Total questions after purge:', afterCount);
console.log('Successfully purged dummy questions:', beforeCount - afterCount);

// Run quick integrity check
const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
console.log('Foreign key check errors:', fkCheck.length);

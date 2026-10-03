const db = require('../db/database').getDb();

const fk = db.prepare('PRAGMA foreign_key_check').all();
console.log('FK Errors:', fk.length);

const dummyCheck = db.prepare(`
  SELECT count(*) as count
  FROM question_versions
  WHERE language_content LIKE '%प्रश्न #%'
     OR language_content LIKE '%सेट #%'
     OR language_content LIKE '%मानक संकल्पना%'
     OR language_content LIKE '%बोर्ड परीक्षा का मानक%'
     OR language_content LIKE '%अध्याय से संबंधित%'
`).get();
console.log('Dummy strings count:', dummyCheck.count);

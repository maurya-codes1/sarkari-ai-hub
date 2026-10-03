const db = require('../db/database').getDb();

const totalQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
const cleanQ = db.prepare(`
  SELECT count(DISTINCT q.question_id) as c FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE qv.language_content NOT LIKE '%प्रश्न #%'
    AND qv.language_content NOT LIKE '%सेट #%'
    AND qv.language_content NOT LIKE '%मानक संकल्पना%'
    AND qv.language_content NOT LIKE '%बोर्ड परीक्षा का मानक%'
    AND qv.language_content NOT LIKE '%अध्याय से संबंधित%'
`).get().c;

console.log('Total questions in DB:', totalQ);
console.log('Clean authentic questions in DB:', cleanQ);

const dummyQ = totalQ - cleanQ;
console.log('Dummy/Padded questions in DB:', dummyQ);

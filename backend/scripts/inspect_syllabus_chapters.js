const db = require('../db/database').getDb();
const chCount = db.prepare('SELECT COUNT(*) as c FROM syllabus_chapters').get().c;
console.log('Total syllabus_chapters:', chCount);
const sampleCh = db.prepare('SELECT * FROM syllabus_chapters LIMIT 5').all();
console.log('Sample chapters:', sampleCh);

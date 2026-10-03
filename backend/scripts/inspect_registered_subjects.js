const db = require('../db/database').getDb();
const subjects = db.prepare('SELECT subject_id, name FROM subjects').all();
console.log('Registered subjects count:', subjects.length);
console.log('Subject IDs:', subjects.map(s => s.subject_id));

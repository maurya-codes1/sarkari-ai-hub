const db = require('../db/database').getDb();
const info = db.prepare('PRAGMA table_info(question_versions)').all();
console.log('question_versions columns:', info.map(c => c.name));

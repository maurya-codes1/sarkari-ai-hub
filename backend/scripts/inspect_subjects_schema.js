const db = require('../db/database').getDb();
const info = db.prepare("PRAGMA table_info('subjects')").all();
console.log('subjects schema:', info);

const db = require('../../../db/database').getDb();
const info = db.prepare("PRAGMA table_info('official_sources')").all();
console.log('official_sources schema:', info.map(c => c.name));
const first = db.prepare("SELECT * FROM official_sources LIMIT 1").get();
console.log('first row:', first);

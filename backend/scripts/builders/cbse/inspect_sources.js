const db = require('../../../db/database').getDb();
const sources = db.prepare('SELECT source_id, name FROM official_sources LIMIT 5').all();
console.log('Sample official_sources:', sources);

const db = require('../../../db/database').getDb();
const qSample = db.prepare('SELECT source_type, source_id, provenance FROM questions LIMIT 5').all();
console.log('Sample questions source_type:', qSample);

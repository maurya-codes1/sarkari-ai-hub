const { getDb } = require('../db/database');
const db = getDb();
const sources = db.prepare('SELECT source_id, issuing_authority, source_url FROM official_sources').all();
console.log(sources.filter(s => s.source_id.includes('ssc') || s.source_id.includes('upsc') || s.source_id.includes('cbse')));

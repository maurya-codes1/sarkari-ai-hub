const db = require('../db/database').getDb();

console.log('NTA / NEET sources:', db.prepare("SELECT source_id FROM official_sources WHERE source_id LIKE '%neet%' OR source_id LIKE '%nta%'").all());
console.log('All sources count:', db.prepare("SELECT count(*) as c FROM official_sources").get().c);
console.log('All sources list:', db.prepare("SELECT source_id FROM official_sources").all().map(s => s.source_id));

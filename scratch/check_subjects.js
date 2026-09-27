const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');
console.table(db.prepare("SELECT source_id, applicable_exam_id, source_url FROM official_sources WHERE source_id LIKE '%upsc%' OR source_id LIKE '%ctet%' OR source_id LIKE '%rrb%' OR source_id LIKE '%police%' OR source_id LIKE '%cbse%'").all());

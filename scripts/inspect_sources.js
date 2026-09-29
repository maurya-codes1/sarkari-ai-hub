// scripts/inspect_sources.js
const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const rows = db.prepare("SELECT source_id, applicable_exam_id, document_title FROM official_sources").all();
console.log('Total sources in DB:', rows.length);
['ssc-gd', 'rrb-alp', 'rrb-ntpc', 'ssc-cgl'].forEach(e => {
  console.log(`Sources for ${e}:`, rows.filter(r => r.applicable_exam_id === e));
});

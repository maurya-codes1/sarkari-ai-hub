// scripts/inspect_db_schema.js
const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('=== TABLES IN SARKARI_CORE.DB ===');
tables.forEach(t => {
  const count = db.prepare(`SELECT count(*) as c FROM ${t.name}`).get().c;
  console.log(`- ${t.name} (${count} rows)`);
});

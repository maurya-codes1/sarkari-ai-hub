const { getDb } = require('./database');
const db = getDb();

if (!db) {
  console.error('Database connection failed.');
  process.exit(1);
}

const tables = db.prepare("SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log('Total tables in DB:', tables.length);
for (const t of tables) {
  console.log(`\n=== TABLE: ${t.name} ===`);
  console.log(t.sql);
}

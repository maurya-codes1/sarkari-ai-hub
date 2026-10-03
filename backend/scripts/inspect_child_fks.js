const db = require('../db/database').getDb();
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Inspecting foreign keys to questions table...');
for (const t of tables) {
  try {
    const fks = db.prepare(`PRAGMA foreign_key_list('${t.name}')`).all();
    for (const fk of fks) {
      if (fk.table === 'questions') {
        console.log(`Table '${t.name}' has FK to questions:`, fk);
      }
    }
  } catch (e) {}
}

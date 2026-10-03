const db = require('../db/database').getDb();

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
for (const t of tables) {
  const fks = db.prepare(`PRAGMA foreign_key_list("${t.name}")`).all();
  const refs = fks.filter(f => f.table === 'questions');
  if (refs.length > 0) {
    console.log(`Table '${t.name}' references 'questions':`, refs.map(r => r.from));
  }
}

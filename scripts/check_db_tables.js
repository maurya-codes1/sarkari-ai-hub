const Database = require('better-sqlite3');
const fs = require('fs');

for (const dbPath of ['backend/db/sarkariai.db', 'backend/db/sarkari_core.db']) {
  if (fs.existsSync(dbPath)) {
    console.log('=== DB:', dbPath, '===');
    const db = new Database(dbPath);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Tables:', tables.map(t => t.name));
    
    // Check integrity
    const integrity = db.prepare("PRAGMA integrity_check").all();
    const fk = db.prepare("PRAGMA foreign_key_check").all();
    console.log('Integrity check:', integrity);
    console.log('Foreign key check:', fk);
  }
}

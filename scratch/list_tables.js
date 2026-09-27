const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all().map(t => t.name);
console.log('Total tables:', tables.length);
console.log(tables);

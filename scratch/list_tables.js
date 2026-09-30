const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('=== LIST ALL TABLES ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
console.log(tables.map(t => t.name));

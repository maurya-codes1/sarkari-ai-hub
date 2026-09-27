const fs = require('fs');
const Database = require('better-sqlite3');

const db = new Database(':memory:');
db.pragma('foreign_keys = ON');

const sql = fs.readFileSync('architecture/schema.sql', 'utf8');

try {
  db.exec(sql);
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name").all();
  console.log('SUCCESS! Total tables created in SQLite:', tables.length);
  console.log('Table list:');
  tables.forEach((t, i) => console.log(` ${i + 1}. ${t.name}`));
} catch (e) {
  console.error('SQL Execution Error:', e.message);
}

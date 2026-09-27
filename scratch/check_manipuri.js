const fs = require('fs');
const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('Searching for Manipuri in DB tables...');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
for (const t of tables) {
  try {
    const rows = db.prepare('SELECT * FROM ' + t.name).all();
    const matches = rows.filter(r => JSON.stringify(r).toLowerCase().includes('manipuri') || JSON.stringify(r).toLowerCase().includes('mni'));
    if (matches.length > 0) {
      console.log('Table ' + t.name + ' has ' + matches.length + ' rows mentioning Manipuri');
      if (matches.length <= 3) {
        console.log(matches);
      }
    }
  } catch (e) {}
}

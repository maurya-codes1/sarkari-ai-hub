const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });
console.log('Columns of questions:');
console.log(db.prepare('PRAGMA table_info(questions)').all().map(c => `${c.name} (${c.type})`));
const sample = db.prepare('SELECT * FROM questions LIMIT 2').all();
console.log('Sample question:', sample);
db.close();

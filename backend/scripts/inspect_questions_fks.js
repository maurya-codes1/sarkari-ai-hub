const db = require('../db/database').getDb();
const fks = db.prepare("PRAGMA foreign_key_list('questions')").all();
console.log('FKs on questions table:');
fks.forEach(f => console.log(`${f.from} -> ${f.table}(${f.to})`));

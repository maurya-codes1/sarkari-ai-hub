const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db', { readonly: true });

const boards = db.prepare('SELECT * FROM boards').all();
console.log(JSON.stringify(boards, null, 2));

db.close();

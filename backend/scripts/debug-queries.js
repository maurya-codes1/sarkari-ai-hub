const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db', { readonly: true });

console.log('LANGUAGES COLS:', db.prepare('PRAGMA table_info(languages)').all().map(c => c.name));
console.log('DISTINCT CATEGORIES IN INVENTORY:', db.prepare('SELECT DISTINCT category FROM nationwide_exam_inventory').all().map(c => c.category));
console.log('BLUEPRINTS EXAM_IDS:', db.prepare('SELECT exam_id FROM exam_blueprints').all().map(b => b.exam_id));
console.log('CORPUS EXAM_IDS:', db.prepare('SELECT exam_id FROM exam_historical_corpus').all().map(b => b.exam_id));
console.log('SSC CGL INVENTORY ROW:', db.prepare("SELECT * FROM nationwide_exam_inventory WHERE exam_id='ssc-cgl'").get());

db.close();

const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');

console.log(db.prepare("SELECT * FROM source_verification_records WHERE target_entity_id = 'bp-verified-ssc-cgl'").all());

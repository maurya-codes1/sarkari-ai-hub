const { getDb } = require('../backend/db/database');
const db = getDb();
db.prepare("UPDATE generation_rate_limits SET count = 0 WHERE scope_key IN ('ssc-cgl', 'rrb-alp', 'global')").run();
console.table(db.prepare('SELECT * FROM generation_rate_limits').all());

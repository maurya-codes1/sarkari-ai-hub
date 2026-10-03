const db = require('../../../db/database').getDb();
const qTypes = db.prepare('SELECT type_id, name FROM question_types').all();
console.log('Valid question_types:', qTypes);

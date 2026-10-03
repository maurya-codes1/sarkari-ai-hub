const db = require('../../../db/database').getDb();
const qCols = db.prepare("PRAGMA table_info('questions')").all();
const notNullCols = qCols.filter(c => c.notnull == 1);
console.log('NOT NULL columns in questions table:', notNullCols.map(c => ({ name: c.name, dflt: c.dflt_value })));

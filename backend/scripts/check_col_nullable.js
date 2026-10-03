const db = require('../db/database').getDb();
const qCols = db.prepare("PRAGMA table_info('questions')").all();
const chCol = qCols.find(c => c.name === 'chapter_id');
const topCol = qCols.find(c => c.name === 'topic_id');
console.log('chapter_id:', chCol);
console.log('topic_id:', topCol);

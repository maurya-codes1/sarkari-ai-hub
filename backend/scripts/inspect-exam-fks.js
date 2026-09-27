const { getDb } = require('../db/database');
const db = getDb();

const examIds = new Set(db.prepare('SELECT exam_id FROM exams').all().map(e => e.exam_id));
const invExams = db.prepare('SELECT exam_id FROM nationwide_exam_inventory').all();
const missingExams = invExams.filter(i => !examIds.has(i.exam_id));
console.log('Total exams:', examIds.size);
console.log('Total inventory exams:', invExams.length);
console.log('Inventory exams missing from exams table:', missingExams);

const sourceIds = new Set(db.prepare('SELECT source_id FROM official_sources').all().map(s => s.source_id));
console.log('Total official sources:', sourceIds.size);
console.log('Sample source IDs:', Array.from(sourceIds).slice(0, 5));

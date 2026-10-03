const db = require('../db/database').getDb();

console.log('--- NOTES & PDF TABLES ---');
const noteTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%note%'").all();
console.log('Note tables:', noteTables);

const pdfTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%pdf%'").all();
console.log('PDF tables:', pdfTables);

// Check notes schema
const notesInfo = db.prepare("PRAGMA table_info('notes')").all();
console.log('notes table columns:', notesInfo.map(c => c.name));

// Check streams schema
const streamsInfo = db.prepare("PRAGMA table_info('streams')").all();
console.log('streams table columns:', streamsInfo.map(c => c.name));
const allStreams = db.prepare("SELECT * FROM streams").all();
console.log('Available streams:', allStreams);

// Check sample notes in DB
const notesCount = db.prepare("SELECT COUNT(*) as c FROM notes").get().c;
console.log('Total notes in DB:', notesCount);
const sampleNotes = db.prepare("SELECT note_id, title, exam_id, board_id, stream_id, class_id FROM notes LIMIT 5").all();
console.log('Sample notes:', sampleNotes);

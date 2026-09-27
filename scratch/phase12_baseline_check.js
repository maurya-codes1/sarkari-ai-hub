const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const dbPath = path.resolve('backend/db/sarkari_core.db');
const db = new Database(dbPath);

const dbBuf = fs.readFileSync(dbPath);
const dbHash = crypto.createHash('sha256').update(dbBuf).digest('hex');
const dbSize = fs.statSync(dbPath).size;

const allTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
const tableCount = allTables.length;

const totalQuestions = db.prepare('SELECT count(*) as c FROM questions').get().c;
const pyqCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
const sampleCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
const legacyCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
const aiPracticeCount = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'AI_PRACTICE'").get().c;
const fullExamEligible = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;

const fullExamGateService = require('../backend/services/full-exam-gate-service');
const inventoryExams = db.prepare('SELECT exam_id FROM nationwide_exam_inventory').all();
let readyExams = 0;
let blockedExams = 0;
for (const ex of inventoryExams) {
  const readiness = fullExamGateService.evaluateExamReadiness(ex.exam_id, 'ver-' + ex.exam_id + '-2026', db);
  if (readiness.status === 'READY_FOR_FULL_EXAM') readyExams++;
  else blockedExams++;
}

const boardCount = db.prepare('SELECT count(*) as c FROM boards').get().c;
const stateCount = db.prepare('SELECT count(*) as c FROM states').get().c;
const langCount = db.prepare('SELECT count(*) as c FROM languages').get().c;
const sourceCount = db.prepare('SELECT count(*) as c FROM official_sources').get().c;
const calendarCount = db.prepare('SELECT count(*) as c FROM exam_calendar_events').get().c;

const notifCount = db.prepare('SELECT count(*) as c FROM user_notifications').get().c;

// Check PDF related tables
const pdfTables = allTables.filter(t => t.toLowerCase().includes('pdf') || t.toLowerCase().includes('document'));
console.log('PDF related tables:', pdfTables);

let pdfCount = 0;
if (allTables.includes('document_archive')) {
  pdfCount += db.prepare('SELECT count(*) as c FROM document_archive').get().c;
}
if (allTables.includes('generated_pdfs')) {
  pdfCount += db.prepare('SELECT count(*) as c FROM generated_pdfs').get().c;
}

const notesCount = db.prepare('SELECT count(*) as c FROM notes').get().c;
const syllabusCount = db.prepare('SELECT count(*) as c FROM syllabus_chapters').get().c;
const topicCount = db.prepare('SELECT count(*) as c FROM syllabus_topics').get().c;

const metrics = {
  dbHash,
  dbSize,
  tableCount,
  totalQuestions,
  pyqCount,
  sampleCount,
  legacyCount,
  aiPracticeCount,
  fullExamEligible,
  readyExams,
  blockedExams,
  boardCount,
  stateCount,
  langCount,
  sourceCount,
  calendarCount,
  notifCount,
  pdfCount,
  notesCount,
  syllabusCount,
  topicCount,
  testCount: 415
};

console.log(JSON.stringify(metrics, null, 2));

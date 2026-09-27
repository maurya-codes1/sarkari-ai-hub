const { getDb } = require('../backend/db/database');
const db = getDb();

console.log('=== CALENDAR EVENTS AUDIT ===');
const totalEvents = db.prepare('SELECT COUNT(*) as count FROM exam_calendar_events').get().count;
console.log('Total calendar events:', totalEvents);

// By exam
const byExam = db.prepare('SELECT exam_id, COUNT(*) as count FROM exam_calendar_events GROUP BY exam_id ORDER BY count DESC').all();
console.log('Exams with calendar events:', byExam.length);
console.log('Sample exam counts (first 5):', byExam.slice(0, 5));
const minPerExam = Math.min(...byExam.map(e => e.count));
const maxPerExam = Math.max(...byExam.map(e => e.count));
console.log('Min events per exam:', minPerExam, 'Max events per exam:', maxPerExam);

// By event type
const byType = db.prepare('SELECT event_type, COUNT(*) as count FROM exam_calendar_events GROUP BY event_type ORDER BY count DESC').all();
console.log('Events by event_type:', byType);

// By status / trust classification
const byStatus = db.prepare('SELECT event_status, COUNT(*) as count FROM exam_calendar_events GROUP BY event_status ORDER BY count DESC').all();
console.log('Events by event_status (trust classification):', byStatus);

// Check official, provisional, estimated, historical counts
const officialCount = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE event_status = 'OFFICIAL'").get().count;
const provisionalCount = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE event_status = 'PROVISIONAL'").get().count;
const estimatedCount = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE event_status = 'ESTIMATED'").get().count;
const historicalCount = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE event_status = 'HISTORICAL'").get().count;
console.log('Counts breakdown -> OFFICIAL:', officialCount, '| PROVISIONAL:', provisionalCount, '| ESTIMATED:', estimatedCount, '| HISTORICAL:', historicalCount);

// Check orphan events (events where exam_id does not exist in nationwide_exam_inventory)
const orphanEvents = db.prepare('SELECT event_id, exam_id FROM exam_calendar_events WHERE exam_id NOT IN (SELECT exam_id FROM nationwide_exam_inventory)').all();
console.log('Orphan events (not in nationwide_exam_inventory):', orphanEvents.length);

// Check duplicate events (same exam_id, event_type, event_date)
const duplicateEvents = db.prepare('SELECT exam_id, event_type, event_date, COUNT(*) as c FROM exam_calendar_events GROUP BY exam_id, event_type, event_date HAVING c > 1').all();
console.log('Duplicate events (same exam, type, date):', duplicateEvents.length);

// Events without exam references
const noExamRef = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE exam_id IS NULL OR TRIM(exam_id) = ''").get().count;
console.log('Events without exam references:', noExamRef);

// Events without status / trust classification
const noStatus = db.prepare("SELECT COUNT(*) as count FROM exam_calendar_events WHERE event_status IS NULL OR TRIM(event_status) = ''").get().count;
console.log('Events without status / trust classification:', noStatus);

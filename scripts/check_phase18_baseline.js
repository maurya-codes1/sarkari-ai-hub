const { getDb } = require('../backend/db/database');
const db = getDb();

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all().map(r => r.name);
console.log("=== TABLES ===");
console.log(tables.join(", "));

console.log("\n=== KEY METRICS ===");
console.log("Total questions:", db.prepare("SELECT count(1) as c FROM questions").get().c);
console.log("Total question_versions:", db.prepare("SELECT count(1) as c FROM question_versions").get().c);
console.log("School board questions:", db.prepare("SELECT count(1) as c FROM questions WHERE board_id IS NOT NULL AND board_id != ''").get().c);
console.log("Competitive questions:", db.prepare("SELECT count(1) as c FROM questions WHERE board_id IS NULL OR board_id = ''").get().c);
console.log("Full exam eligible:", db.prepare("SELECT count(1) as c FROM questions WHERE full_exam_eligible = 1").get().c);
console.log("Objective questions:", db.prepare("SELECT count(1) as c FROM questions WHERE question_type_id IN ('single_mcq', 'numerical', 'assertion_reason')").get().c);
console.log("Subjective questions:", db.prepare("SELECT count(1) as c FROM questions WHERE question_type_id NOT IN ('single_mcq', 'numerical', 'assertion_reason')").get().c);
console.log("\n=== QUESTIONS COLUMNS ===");
const cols = db.prepare("PRAGMA table_info(questions)").all().map(c => c.name);
console.log(cols.join(", "));

let pyqCount = 0;
if (cols.includes('provenance_type')) {
  pyqCount = db.prepare("SELECT count(1) as c FROM questions WHERE provenance_type = 'official_pyq' OR is_pyq = 1").get().c;
} else if (cols.includes('is_pyq')) {
  pyqCount = db.prepare("SELECT count(1) as c FROM questions WHERE is_pyq = 1").get().c;
} else {
  // check question_versions or tags
  pyqCount = db.prepare("SELECT count(1) as c FROM questions WHERE question_id LIKE '%pyq%'").get().c;
}
console.log("PYQ questions:", pyqCount);
console.log("Exam blueprints:", db.prepare("SELECT count(1) as c FROM exam_blueprints").get().c);
console.log("Integrity check:", db.prepare("PRAGMA integrity_check").get().integrity_check);
console.log("Foreign key check violations:", db.prepare("PRAGMA foreign_key_check").all().length);


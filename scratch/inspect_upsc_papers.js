const Database = require('better-sqlite3');
const db = new Database('backend/db/sarkari_core.db');
console.table(db.prepare("SELECT paper_id, exam_id, academic_year, stage, paper, total_questions_expected, total_questions_extracted FROM question_papers WHERE exam_id LIKE '%upsc%'").all());

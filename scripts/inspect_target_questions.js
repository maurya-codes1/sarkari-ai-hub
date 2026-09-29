// scripts/inspect_target_questions.js
const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const exams = ['ssc-gd', 'rrb-alp', 'rrb-ntpc'];
exams.forEach(ex => {
  const qs = db.prepare(`
    SELECT question_id, subject_id, exam_version_id, provenance, marks, source_type, full_exam_eligible 
    FROM questions 
    WHERE question_id LIKE ? OR exam_version_id LIKE ?
  `).all(`%${ex}%`, `%${ex}%`);
  console.log(`\n=== EXAM: ${ex} (count: ${qs.length}) ===`);
  console.log(qs.slice(0, 5));
});

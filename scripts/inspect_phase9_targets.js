// scripts/inspect_phase9_targets.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

console.log('=== BLUEPRINTS ===');
const bps = db.prepare(`
  SELECT blueprint_id, exam_version_id, name, total_questions, total_marks, duration_minutes, verification_status, readiness_status 
  FROM exam_blueprints 
  WHERE blueprint_id LIKE '%ssc-gd%' OR blueprint_id LIKE '%alp%' OR blueprint_id LIKE '%ntpc%'
`).all();
console.log(bps);

console.log('\n=== SECTIONS FOR THESE BLUEPRINTS ===');
bps.forEach(bp => {
  const secs = db.prepare('SELECT section_id, blueprint_id, subject_id, name, question_count, total_marks FROM blueprint_sections WHERE blueprint_id = ?').all(bp.blueprint_id);
  console.log('Blueprint:', bp.blueprint_id, 'Sections:', secs);
});

console.log('\n=== QUESTIONS IN DB BY EXAM VERSION / PREFIX ===');
['ssc-gd', 'rrb-alp', 'rrb-ntpc'].forEach(exam => {
  const rows = db.prepare(`
    SELECT count(*) as count, exam_version_id, subject_id, provenance, full_exam_eligible 
    FROM questions 
    WHERE question_id LIKE ? OR exam_version_id LIKE ?
    GROUP BY exam_version_id, subject_id, provenance, full_exam_eligible
  `).all(`%${exam}%`, `%${exam}%`);
  console.log(`Questions for ${exam}:`, rows);
});

console.log('\n=== HIERARCHICAL BLUEPRINTS JSON ===');
const jsonBpPath = path.join(__dirname, '../exam-blueprints.json');
if (fs.existsSync(jsonBpPath)) {
  const data = JSON.parse(fs.readFileSync(jsonBpPath, 'utf8'));
  ['ssc-gd', 'rrb-alp', 'rrb-ntpc'].forEach(id => {
    console.log(`Blueprint in JSON for ${id}:`, data[id] ? {
      name: data[id].name,
      total_questions: data[id].total_questions,
      sections: data[id].sections ? data[id].sections.map(s => ({ name: s.name, count: s.question_count, subject_id: s.subject_id })) : []
    } : 'NOT FOUND');
  });
}

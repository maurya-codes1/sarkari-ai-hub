const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

const compExams = db.prepare(`
  SELECT exam_id, name, category
  FROM exams
  WHERE exam_id NOT IN (
    'cbse-board', 'icse-cisce', 'nios-board', 'upmsp-board', 'bseb-bihar', 'rbse-rajasthan',
    'mpbse-board', 'cgbse-chhattisgarh', 'bseh-haryana', 'hpbose-board', 'ubse-uttarakhand',
    'jac-jharkhand', 'maharashtra-board', 'gseb-gujarat', 'wbbse-wb', 'pseb-punjab',
    'chse-bse-odisha', 'seba-ahsec-assam', 'kseab-karnataka', 'tndge-tamilnadu',
    'kerala-board', 'bseap-board', 'bsetg-board', 'tsbie-bieap', 'jkbose-board',
    'gbshse-board', 'bsem-board', 'mbose-board', 'mbse-board', 'nbse-board', 'tbse-board'
  )
  ORDER BY exam_id
`).all();

console.log('--- 32 COMPETITIVE EXAMS DETAILED ---');
for (const [idx, e] of compExams.entries()) {
  const versions = db.prepare(`SELECT version_id FROM exam_versions WHERE exam_id = ?`).all(e.exam_id).map(v => v.version_id);
  let total = 0, mcqs = 0, subj = 0;
  if (versions.length > 0) {
    const placeholders = versions.map(() => '?').join(',');
    const stats = db.prepare(`
      SELECT 
        count(*) as total,
        sum(case when question_type_id LIKE '%mcq%' OR question_type_id LIKE '%choice%' then 1 else 0 end) as mcqs,
        sum(case when question_type_id IN ('short_answer', 'long_answer', 'descriptive') then 1 else 0 end) as subj
      FROM questions 
      WHERE exam_version_id IN (${placeholders})
    `).get(...versions);
    total = stats.total || 0;
    mcqs = stats.mcqs || 0;
    subj = stats.subj || 0;
  }
  console.log(`${(idx + 1).toString().padStart(2)}. [${e.exam_id.padEnd(23)}] Total: ${total.toString().padStart(5)} | MCQs: ${mcqs.toString().padStart(5)} | Subj: ${subj.toString().padStart(3)} | ${e.name}`);
}

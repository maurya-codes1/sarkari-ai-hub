const db = require('../db/database').getDb();

const compExams = db.prepare(`
  SELECT exam_id, name 
  FROM exams 
  WHERE board_id IS NULL AND category != 'boards' AND exam_id NOT IN (
    'cbse-board', 'icse-cisce', 'nios-board', 'upmsp-board', 'bseb-bihar', 'rbse-rajasthan',
    'mpbse-board', 'cgbse-chhattisgarh', 'bseh-haryana', 'hpbose-board', 'ubse-uttarakhand',
    'jac-jharkhand', 'maharashtra-board', 'gseb-gujarat', 'wbbse-wb', 'pseb-punjab',
    'chse-bse-odisha', 'seba-ahsec-assam', 'kseab-karnataka', 'tndge-tamilnadu',
    'kerala-board', 'bseap-board', 'bsetg-board', 'tsbie-bieap', 'jkbose-board',
    'gbshse-board', 'bsem-board', 'mbose-board', 'mbse-board', 'nbse-board', 'tbse-board'
  )
  ORDER BY exam_id
`).all();

const compData = [];
for (const c of compExams) {
  const versions = db.prepare('SELECT version_id FROM exam_versions WHERE exam_id = ?').all(c.exam_id).map(v => v.version_id);
  let total = 0, mcqs = 0, subj = 0;
  if (versions.length > 0) {
    const stats = db.prepare(`
      SELECT 
        count(*) as total,
        sum(case when question_type_id LIKE '%mcq%' then 1 else 0 end) as mcqs,
        sum(case when question_type_id != 'single_mcq' then 1 else 0 end) as subj
      FROM questions 
      WHERE exam_version_id IN (${versions.map(() => '?').join(',')})
    `).get(...versions);
    total = stats.total || 0;
    mcqs = stats.mcqs || 0;
    subj = stats.subj || 0;
  }
  compData.push({ id: c.exam_id, name: c.name, total, mcqs, subj });
}

compData.sort((a, b) => a.total - b.total);
console.log('Comp Total | MCQs | Subj | Exam ID & Name');
const freq = {};
for (const c of compData) {
  freq[c.total] = (freq[c.total] || []);
  freq[c.total].push(c.id);
  console.log(`${c.total.toString().padStart(5)} | ${c.mcqs.toString().padStart(5)} | ${c.subj.toString().padStart(4)} | [${c.id.padEnd(23)}] ${c.name}`);
}

console.log('\n--- COMPETITIVE COLLISIONS ---');
for (const [tot, arr] of Object.entries(freq)) {
  if (arr.length > 1) {
    console.log(`Count ${tot} shared by: ${arr.join(', ')}`);
  }
}

const db = require('../db/database').getDb();

const compExams = db.prepare(`
  SELECT e.exam_id, e.name, e.category, ev.version_id
  FROM exams e
  JOIN exam_versions ev ON e.exam_id = ev.exam_id
  WHERE e.board_id IS NULL AND e.exam_id NOT LIKE '%board%' AND e.exam_id NOT IN (
    'icse-cisce', 'tsbie-bieap', 'bseb-bihar', 'bseh-haryana', 'cgbse-chhattisgarh', 
    'chse-bse-odisha', 'gseb-gujarat', 'jac-jharkhand', 'kseab-karnataka', 
    'seba-ahsec-assam', 'wbbse-wb'
  )
`).all();

const compExamMap = {};
compExams.forEach(ce => {
  compExamMap[ce.version_id] = { exam_id: ce.exam_id, name: ce.name, category: ce.category };
});

const compLangStats = {};

const qRows = db.prepare(`
  SELECT q.exam_version_id, q.subject_id, q.question_type_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.exam_version_id IS NOT NULL AND q.board_id IS NULL
`).all();

for (const r of qRows) {
  const meta = compExamMap[r.exam_version_id];
  if (!meta) continue;
  const examId = meta.exam_id;
  if (!compLangStats[examId]) {
    compLangStats[examId] = {
      name: meta.name,
      category: meta.category,
      subjects: {}
    };
  }
  const ex = compLangStats[examId];
  if (!ex.subjects[r.subject_id]) {
    ex.subjects[r.subject_id] = {
      mcq: 0,
      sub: 0,
      langs: {}
    };
  }
  const s = ex.subjects[r.subject_id];
  const isMCQ = r.question_type_id === 'single_mcq' || r.question_type_id === 'MULTIPLE_CHOICE';
  if (isMCQ) s.mcq++; else s.sub++;

  try {
    const parsed = JSON.parse(r.language_content);
    const lKey = Object.keys(parsed).sort().join('+');
    s.langs[lKey] = (s.langs[lKey] || 0) + 1;
  } catch (e) {}
}

console.log('Total competitive exams with questions:', Object.keys(compLangStats).length);
// Print sample: SSC CGL and UP Police
console.log('SSC CGL:');
console.log(JSON.stringify(compLangStats['ssc-cgl'], null, 2));
console.log('UPSC CSE:');
console.log(JSON.stringify(compLangStats['upsc-cse'], null, 2));

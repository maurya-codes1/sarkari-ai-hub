const db = require('../db/database').getDb();
const qs = db.prepare(`
  SELECT 
    q.question_id, 
    q.source_type, 
    q.provenance, 
    q.question_tier, 
    q.full_exam_eligible, 
    q.paper_id,
    qp.paper,
    qp.academic_year,
    qp.source_url,
    qp.notes
  FROM questions q
  LEFT JOIN question_papers qp ON q.paper_id = qp.paper_id
  WHERE q.is_verified = 1
`).all();

const summary = {};
for (const q of qs) {
  const p = q.paper_id;
  if (!summary[p]) {
    summary[p] = {
      count: 0,
      source_type: new Set(),
      provenance: new Set(),
      tier: new Set(),
      full_exam_eligible: 0,
      paper_name: q.paper,
      year: q.academic_year,
      url: q.source_url,
      notes: q.notes
    };
  }
  summary[p].count++;
  summary[p].source_type.add(q.source_type);
  summary[p].provenance.add(q.provenance);
  summary[p].tier.add(q.question_tier);
  if (q.full_exam_eligible) summary[p].full_exam_eligible++;
}

for (const [p, d] of Object.entries(summary)) {
  console.log('--- Paper:', p, '---');
  console.log('  Count:', d.count, '| Full Exam Eligible:', d.full_exam_eligible);
  console.log('  Source types:', [...d.source_type]);
  console.log('  Provenances:', [...d.provenance]);
  console.log('  Tiers:', [...d.tier]);
  console.log('  Paper name:', d.paper_name);
  console.log('  Source URL:', d.url);
  console.log('  Notes:', d.notes);
}

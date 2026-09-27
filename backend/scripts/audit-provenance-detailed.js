const db = require('../db/database').getDb();

console.log('=== AUDITING ALL 192 VERIFIED QUESTIONS ===');

const papers = db.prepare(`
  SELECT 
    paper_id, 
    exam_id, 
    academic_year, 
    paper, 
    paper_code, 
    source_id, 
    source_url, 
    notes,
    total_questions_extracted 
  FROM question_papers
`).all();

for (const p of papers) {
  const qs = db.prepare(`
    SELECT 
      q.question_id,
      q.source_type,
      q.provenance,
      q.question_tier,
      q.full_exam_eligible,
      q.practice_eligible,
      q.validation_notes,
      qv.language_content
    FROM questions q
    LEFT JOIN question_versions qv ON q.question_id = qv.question_id
    WHERE q.paper_id = ?
  `).all(p.paper_id);

  console.log(`\n======================================================`);
  console.log(`PAPER: ${p.paper_id} (${p.exam_id})`);
  console.log(`Title: ${p.paper} | Year: ${p.academic_year} | Code: ${p.paper_code}`);
  console.log(`Source URL: ${p.source_url}`);
  console.log(`Notes: ${p.notes}`);
  console.log(`Question Count in DB: ${qs.length}`);
  
  if (qs.length > 0) {
    const sourceTypes = [...new Set(qs.map(q => q.source_type))];
    const provenances = [...new Set(qs.map(q => q.provenance))];
    const tiers = [...new Set(qs.map(q => q.question_tier))];
    const fullEligible = qs.filter(q => q.full_exam_eligible === 1).length;
    console.log(`  Source Types: ${sourceTypes.join(', ')}`);
    console.log(`  Provenances: ${provenances.join(', ')}`);
    console.log(`  Question Tiers: ${tiers.join(', ')}`);
    console.log(`  Full Exam Eligible: ${fullEligible} / ${qs.length}`);

    // Print first 2 questions
    console.log('  Samples:');
    qs.slice(0, 2).forEach(q => {
      let qText = '';
      try {
        const parsed = JSON.parse(q.language_content);
        qText = parsed.en?.q || parsed.en?.question || parsed.hi?.q || parsed.hi?.question || parsed.ta?.q || parsed.ta?.question;
      } catch (e) {
        qText = 'PARSE_ERROR';
      }
      console.log(`    - [${q.question_id}] (eligible: ${q.full_exam_eligible}, src: ${q.source_type}, prov: ${q.provenance}, tier: ${q.question_tier})`);
      console.log(`      Text: ${String(qText).substring(0, 80)}...`);
      if (q.validation_notes) console.log(`      Notes: ${q.validation_notes}`);
    });
  }
}

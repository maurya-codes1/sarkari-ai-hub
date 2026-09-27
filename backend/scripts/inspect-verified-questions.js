const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname, '../db/sarkari_core.db'), { readonly: true });

console.log('=== VERIFIED QUESTIONS AUDIT ===');
const summary = db.prepare(`
  SELECT 
    source_type, 
    provenance, 
    question_tier, 
    is_verified, 
    full_exam_eligible, 
    count(*) as count 
  FROM questions 
  WHERE is_verified = 1 
  GROUP BY source_type, provenance, question_tier, full_exam_eligible
`).all();
console.table(summary);

const totalVerified = db.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 1').get().c;
console.log('Total is_verified = 1:', totalVerified);

const allVerifiedQuestions = db.prepare(`
  SELECT 
    q.question_id,
    ev.exam_id,
    q.source_type,
    q.provenance,
    q.question_tier,
    q.full_exam_eligible,
    q.practice_eligible,
    q.paper_id,
    q.source_id,
    qp.paper as paper_title,
    qp.academic_year as paper_year,
    qp.exam_id as paper_exam_id,
    qp.notes as paper_notes,
    q.official_year,
    q.shift,
    q.set_code,
    q.source_question_number,
    qv.language_content
  FROM questions q
  LEFT JOIN exam_versions ev ON q.exam_version_id = ev.version_id
  LEFT JOIN question_papers qp ON q.paper_id = qp.paper_id
  LEFT JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.is_verified = 1
`).all();

console.log(`Auditing all ${allVerifiedQuestions.length} verified records...`);

// Group by source_type and paper
const byPaper = {};
for (const q of allVerifiedQuestions) {
  const key = `${q.paper_id || 'NO_PAPER'} | ${q.paper_title || 'N/A'} (source_type: ${q.source_type})`;
  byPaper[key] = (byPaper[key] || 0) + 1;
}
console.log('\nBreakdown by Paper & Source Type:');
console.table(byPaper);

// Breakdown by source_type
const bySourceType = {};
for (const q of allVerifiedQuestions) {
  bySourceType[q.source_type] = (bySourceType[q.source_type] || 0) + 1;
}
console.log('\nBreakdown by Source Type:');
console.table(bySourceType);

// Check all questions where source_type is OFFICIAL_DOCUMENT
const docQuestions = allVerifiedQuestions.filter(q => q.source_type === 'OFFICIAL_DOCUMENT');
console.log(`\nOFFICIAL_DOCUMENT questions count: ${docQuestions.length}`);
if (docQuestions.length > 0) {
  console.log('OFFICIAL_DOCUMENT questions details:');
  docQuestions.forEach(q => {
    let snippet = '';
    try {
      const parsed = JSON.parse(q.language_content);
      const en = parsed.en || parsed[Object.keys(parsed)[0]];
      snippet = (en.question || en.text || '').substring(0, 60);
    } catch (e) {
      snippet = 'PARSE_ERROR';
    }
    console.log(`- QID: ${q.question_id} | Exam: ${q.exam_id} | Paper: ${q.paper_id} (${q.paper_title}) | SrcID: ${q.source_id} | Year: ${q.official_year} | Eligible: ${q.full_exam_eligible} | Snippet: ${snippet}`);
  });
}

// Check all questions where source_type is OFFICIAL_PYQ
const pyqQuestions = allVerifiedQuestions.filter(q => q.source_type === 'OFFICIAL_PYQ');
console.log(`\nOFFICIAL_PYQ questions count: ${pyqQuestions.length}`);

// Group OFFICIAL_PYQ by paper
const pyqByPaper = {};
for (const q of pyqQuestions) {
  const key = `${q.paper_id} | ${q.paper_title} (${q.paper_year})`;
  pyqByPaper[key] = (pyqByPaper[key] || 0) + 1;
}
console.log('\nOFFICIAL_PYQ Breakdown by Paper:');
console.table(pyqByPaper);

// Check questions where full_exam_eligible = 1
const eligible = allVerifiedQuestions.filter(q => q.full_exam_eligible === 1);
console.log(`\nTotal Full Exam Eligible Questions: ${eligible.length}`);
const eligibleBySourceType = {};
for (const q of eligible) {
  eligibleBySourceType[q.source_type] = (eligibleBySourceType[q.source_type] || 0) + 1;
}
console.log('Full Exam Eligible by source_type:', eligibleBySourceType);

// Check which exams have full_exam_eligible questions
const examsWithEligible = {};
for (const q of eligible) {
  examsWithEligible[q.exam_id] = (examsWithEligible[q.exam_id] || 0) + 1;
}
console.log('Full Exam Eligible by exam_id:', examsWithEligible);

// Check official_sources table for these source_ids
const sourceIds = [...new Set(allVerifiedQuestions.map(q => q.source_id).filter(Boolean))];
console.log(`\nDistinct source_ids in verified questions: ${sourceIds.length}`, sourceIds);
const sources = db.prepare(`SELECT source_id, exam_id, source_name, source_type, source_url FROM official_sources WHERE source_id IN (${sourceIds.map(s => `'${s}'`).join(',')})`).all();
console.log('\nOfficial Sources for verified questions:');
console.table(sources);

db.close();

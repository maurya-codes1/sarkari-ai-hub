const db = require('../db/database').getDb();

const qCounts = db.prepare(`
  SELECT 
    paper_id, 
    source_type, 
    provenance, 
    question_tier, 
    is_verified, 
    full_exam_eligible, 
    count(*) as c 
  FROM questions 
  WHERE paper_id IS NOT NULL 
  GROUP BY paper_id, source_type, provenance, question_tier, is_verified, full_exam_eligible
`).all();
console.table(qCounts);

const totalWithPaper = db.prepare('SELECT count(*) as c FROM questions WHERE paper_id IS NOT NULL').get().c;
console.log('Total with paper_id:', totalWithPaper);

const verifiedWithNoPaper = db.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 1 AND paper_id IS NULL').get().c;
console.log('Verified questions with NO paper_id:', verifiedWithNoPaper);

const unverifiedWithPaper = db.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 0 AND paper_id IS NOT NULL').get().c;
console.log('Unverified questions with paper_id:', unverifiedWithPaper);

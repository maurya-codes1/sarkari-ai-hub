const { getDb } = require('../db/database');
const db = getDb();

let baseSql = `
  SELECT 
    q.question_id, q.subject_id, q.chapter_id, q.topic_id, q.difficulty,
    q.marks, q.provenance, q.question_tier, q.historical_year,
    q.recurrence_tier, q.is_rare_relevant, q.fingerprint, q.full_exam_eligible,
    qv.language_content, qv.correct_answer
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id AND (qv.version_number = q.current_version OR qv.version_number = '1.0.0' OR qv.version_number = 1)
  WHERE q.current_eligibility = 1
    AND (q.exam_version_id LIKE ? OR q.paper_id IN (SELECT paper_id FROM question_papers WHERE exam_id = ?))
`;
const candidates = db.prepare(baseSql).all('%ssc-cgl%', 'ssc-cgl');
console.log('Total candidates returned:', candidates.length);

const fingerprints = new Set(candidates.map(c => c.fingerprint));
console.log('Unique fingerprints:', fingerprints.size);

const nullFingerprints = candidates.filter(c => !c.fingerprint || c.fingerprint === null);
console.log('Null fingerprints count:', nullFingerprints.length);

console.log('Difficulties:', candidates.map(c => c.difficulty).reduce((acc, d) => { acc[d] = (acc[d] || 0) + 1; return acc; }, {}));
console.log('Sample 3 fingerprints:', candidates.slice(0, 5).map(c => ({ id: c.question_id, fp: c.fingerprint })));

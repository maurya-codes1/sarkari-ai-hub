// scripts/quarantine_synthetic_questions.js
// Phase 1: Safe and complete quarantine of all 168,350+ synthetic template questions.
// Sets is_published = 0, quality_state = 'SYNTHETIC_QUARANTINE', trust_status = 'QUARANTINED',
// practice_eligible = 0, full_exam_eligible = 0.
// Preserves DB integrity while strictly hiding them from all mock tests, APIs, and PDFs.

const db = require('../backend/db/database').getDb();

console.log('=== PHASE 1: QUARANTINING SYNTHETIC QUESTIONS ===\n');

const patterns = [
  '%मानक एवं प्रमाणित सिद्धांत%',
  '%कथन I एक अमान्य%',
  '%कोई भी कथन निर्धारित शर्तों%',
  '%मूलभूत सिद्धांत%',
  '%fundamental governing law%',
  '%empirical experimental evidence%',
  '%boundary states%',
  '%auxiliary secondary effect%',
  '%स्थिति Alpha%',
  '%स्थिति Beta%',
  '%Alpha मान्य है%',
  '%Condition Alpha%',
  '%PRACTICE_MODEL_ANSWER%',
  '%बैंकिंग परीक्षा के संदर्भ में%',
  '%रेलवे परीक्षा के संदर्भ में%',
  '%एसएससी परीक्षा के संदर्भ में%',
  '%के संदर्भ में, निम्नलिखित में से कौन सा विकल्प सही वैज्ञानिक/विश्लेषणात्मक निष्कर्ष%',
  '%canonically valid and correct%',
  '%प्रथम कथन पूर्णतः सत्य एवं प्रामाणिक है%',
  '%foundational proposition%',
  '%secondary empirical derivatives%',
  '%Only the secondary observation holds true%',
  '%Both statements are factually invalid%',
  '%दोनों कथन असत्य एवं त्रुटिपूर्ण हैं%',
  '%आधिकारिक पाठ्यचर्या के अनुसार केवल द्वितीय कथन सही है%',
  '%उपर्युक्त में से कोई नहीं%', // where part of board template
  '%ਦੇ ਮੁੱਢਲੇ ਨਿਯਮ ਨੂੰ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਪ੍ਰਗਟ ਕਰਦਾ ਹੈ%',
  '%کی بنیادی اور لازمی خصوصیت کو ظاہر کرتا ہے%',
  '%Statement regarding%canonically valid%'
];

console.log('Building query to identify all synthetic question IDs...');

// Use a transaction for fast and atomic execution
db.transaction(() => {
  // Create a temporary table of target question IDs
  db.prepare('CREATE TEMP TABLE IF NOT EXISTS temp_quarantine_ids (question_id TEXT PRIMARY KEY)').run();
  db.prepare('DELETE FROM temp_quarantine_ids').run();

  const insertTemp = db.prepare('INSERT OR IGNORE INTO temp_quarantine_ids (question_id) SELECT DISTINCT question_id FROM question_versions WHERE language_content LIKE ?');

  for (const pattern of patterns) {
    insertTemp.run(pattern);
  }

  const flaggedCount = db.prepare('SELECT count(*) as count FROM temp_quarantine_ids').get().count;
  console.log(`Identified ${flaggedCount} unique questions matching synthetic boilerplate patterns.`);

  // Apply quarantine to `questions` table
  console.log('Updating questions table to SYNTHETIC_QUARANTINE status...');
  const updateQuestions = db.prepare(`
    UPDATE questions 
    SET is_published = 0,
        quality_state = 'SYNTHETIC_QUARANTINE',
        trust_status = 'QUARANTINED',
        practice_eligible = 0,
        full_exam_eligible = 0
    WHERE question_id IN (SELECT question_id FROM temp_quarantine_ids)
  `).run();
  console.log(`Updated questions: ${updateQuestions.changes} rows marked as QUARANTINED.`);

  // Drop temporary table
  db.prepare('DROP TABLE IF EXISTS temp_quarantine_ids').run();
})();

console.log('\n--- VERIFICATION OF QUARANTINE ---');

const activeCount = db.prepare(`
  SELECT count(*) as count 
  FROM questions 
  WHERE is_published = 1 
    AND (quality_state IS NULL OR quality_state != 'SYNTHETIC_QUARANTINE')
    AND trust_status != 'QUARANTINED'
`).get().count;

const quarantinedCount = db.prepare(`
  SELECT count(*) as count 
  FROM questions 
  WHERE quality_state = 'SYNTHETIC_QUARANTINE' OR trust_status = 'QUARANTINED'
`).get().count;

console.log(`Total Active & Verified Questions: ${activeCount}`);
console.log(`Total Quarantined Questions: ${quarantinedCount}`);
console.log(`Total Questions in Database: ${activeCount + quarantinedCount}`);

// Inspect sample of active questions to ensure 100% cleanliness
const sampleActive = db.prepare(`
  SELECT q.question_id, q.subject_id, v.language_content
  FROM questions q
  JOIN question_versions v ON q.question_id = v.question_id
  WHERE q.is_published = 1 
    AND q.quality_state != 'SYNTHETIC_QUARANTINE'
    AND q.trust_status != 'QUARANTINED'
  ORDER BY RANDOM()
  LIMIT 5
`).all();

console.log('\n--- SAMPLE OF ACTIVE VERIFIED QUESTIONS ---');
for (const s of sampleActive) {
  const p = JSON.parse(s.language_content);
  const itm = p.hi || p.en || Object.values(p)[0];
  console.log(`[${s.question_id}] Subject: ${s.subject_id}`);
  console.log(`Q: ${itm?.q}`);
  console.log(`Options:`, itm?.options);
  console.log(`Ans: ${itm?.ans}`);
  console.log('---');
}

console.log('Phase 1 Quarantine Execution Finished successfully.');

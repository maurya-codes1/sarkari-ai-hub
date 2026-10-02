// scripts/verify_phase2_invariants.js
const db = require('../backend/db/database').getDb();
const repo = require('../backend/db/repositories/question-repository');

console.log('=== PHASE 2 ARCHITECTURE INVARIANTS VERIFICATION ===\n');

// Invariant 1: Zero Subjectives in MCQ pool
const subjInMock = db.prepare(`
  SELECT count(1) as count 
  FROM questions 
  WHERE question_type_id IN ('short_answer', 'long_answer', 'subjective') 
    AND practice_eligible = 1 
    AND is_published = 1
`).get().count;
console.log(`Invariant 1 - Subjective questions in MCQ Mock Pool (Must be 0): ${subjInMock}`);
if (subjInMock === 0) console.log('  ✅ PASSED: 100% Subjective Isolation Guaranteed.');
else console.error('  ❌ FAILED: Subjective leaked into MCQ pool!');

// Invariant 2: Total Active Verified MCQs
const totalActive = repo.getTotalCount();
console.log(`\nInvariant 2 - Total Verified Clean Active Questions: ${totalActive}`);

// Invariant 3: Test Practice Questions for Bihar Board Class 10 Science
const bsebSci = repo.getPracticeQuestions({ boardId: 'bseb-bihar', stage: 'Class 10', subjectId: 'subj-science', count: 5 });
console.log(`\nInvariant 3 - BSEB Class 10 Science Sample (5 questions):`);
for (const q of bsebSci) {
  const p = JSON.parse(q.language_content);
  const itm = p.hi || p.en;
  console.log(`  [${q.question_id}] Q: ${itm?.q}`);
  console.log(`  Options: ${itm?.options.join(' | ')}`);
  console.log(`  Ans: ${itm?.ans} (${itm?.pyqTag || 'Tag'})`);
  console.log('  ---');
}

// Invariant 4: Test Practice Questions for UP Police Constable GK
const uppGk = repo.getPracticeQuestions({ examId: 'ver-up-police-constable-2026', subjectId: 'subj-gk', count: 3 });
console.log(`\nInvariant 4 - UP Police Constable GK Sample (3 questions):`);
for (const q of uppGk) {
  const p = JSON.parse(q.language_content);
  const itm = p.hi || p.en;
  console.log(`  [${q.question_id}] Q: ${itm?.q}`);
  console.log(`  Options: ${itm?.options.join(' | ')}`);
  console.log(`  Ans: ${itm?.ans}`);
  console.log('  ---');
}

// Invariant 5: Verify Zero Duplicate Fingerprints in Active Questions
const dupCount = db.prepare(`
  SELECT fingerprint, count(1) as count 
  FROM questions 
  WHERE is_published = 1 
  GROUP BY fingerprint 
  HAVING count > 1
`).all();
console.log(`\nInvariant 5 - Duplicate Fingerprints in Active Pool (Must be 0): ${dupCount.length}`);
if (dupCount.length === 0) console.log('  ✅ PASSED: Strict Zero Duplicate Guarantee.');
else console.error('  ❌ FAILED: Duplicate fingerprints detected!');

// scripts/test_question_repo_quarantine.js
const repo = require('../backend/db/repositories/question-repository');

console.log('--- TESTING QUESTION REPOSITORY WITH QUARANTINE ---');
console.log('Total Count reported by repo:', repo.getTotalCount());

const randomQ = repo.getRandomQuestions(null, 5);
console.log(`Fetched ${randomQ.length} random questions:`);
for (const q of randomQ) {
  const p = JSON.parse(q.language_content);
  const itm = p.hi || p.en || Object.values(p)[0];
  console.log(`[${q.question_id}] (${q.subject_name}):`);
  console.log(`Q: ${itm?.q}`);
  console.log(`Options:`, itm?.options);
  console.log(`Ans:`, itm?.ans);
  console.log('---');
}

// Test practice questions for subj-physics (where the user had the de Broglie problem)
const physicsQ = repo.getPracticeQuestions({ subjectId: 'subj-physics', count: 5 });
console.log(`Fetched ${physicsQ.length} physics practice questions:`);
for (const q of physicsQ) {
  const p = JSON.parse(q.language_content);
  const itm = p.hi || p.en || Object.values(p)[0];
  console.log(`[${q.question_id}]:`);
  console.log(`Q: ${itm?.q}`);
  console.log(`Options:`, itm?.options);
  console.log(`Ans:`, itm?.ans);
  console.log('---');
}

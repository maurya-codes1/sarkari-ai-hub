const Database = require('better-sqlite3');
const db = new Database('./backend/db/sarkari_core.db');

console.log('=== AUDITING QUESTION VERSIONS ===');

// Check total question versions
const totalVersions = db.prepare('SELECT count(*) as count FROM question_versions').get().count;
console.log('Total question versions:', totalVersions);

// Check sample from competitive exam (e.g. ssc-cgl or up-police-constable)
const compSample = db.prepare(`
  SELECT q.question_id, q.exam_version_id, q.subject_id, q.question_type_id, qv.language_content, qv.correct_answer
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE q.board_id IS NULL
  LIMIT 3
`).all();

console.log('\n--- COMPETITIVE EXAM SAMPLES ---');
for (const s of compSample) {
  console.log(`QID: ${s.question_id}, ExamVer: ${s.exam_version_id}, Subj: ${s.subject_id}, Type: ${s.question_type_id}`);
  try {
    const parsed = JSON.parse(s.language_content);
    const lang = Object.keys(parsed)[0];
    console.log(`Lang: ${lang}, Q: ${parsed[lang]?.question?.slice(0, 80)}...`);
    console.log(`Options:`, parsed[lang]?.options);
    console.log(`Ans: ${s.correct_answer}`);
  } catch (e) {
    console.log('Content slice:', s.language_content.slice(0, 100));
  }
}

// Check how many questions have "सेट #" in language_content
const setPatternCount = db.prepare(`
  SELECT count(*) as count 
  FROM question_versions 
  WHERE language_content LIKE '%सेट #%' OR language_content LIKE '%(सेट %'
`).get().count;
console.log('\nTotal question_versions with "सेट #":', setPatternCount);

// Check competitive vs board with "सेट #"
const compSetCount = db.prepare(`
  SELECT count(*) as count 
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE (qv.language_content LIKE '%सेट #%' OR qv.language_content LIKE '%(सेट %') AND q.board_id IS NULL
`).get().count;
console.log('Competitive questions with "सेट #":', compSetCount);

const boardSetCount = db.prepare(`
  SELECT count(*) as count 
  FROM questions q
  JOIN question_versions qv ON q.question_id = qv.question_id
  WHERE (qv.language_content LIKE '%सेट #%' OR qv.language_content LIKE '%(सेट %') AND q.board_id IS NOT NULL
`).get().count;
console.log('Board questions with "सेट #":', boardSetCount);

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../db/sarkari_core.db');
const db = new sqlite3.Database(dbPath);

console.log("=== AUDITING CBSE QUESTIONS ACROSS ALL SUBJECTS ===");

db.all(`
  SELECT 
    stage,
    subject_id,
    question_type_id,
    COUNT(*) as total_count,
    COUNT(DISTINCT chapter) as distinct_chapters
  FROM questions
  WHERE board_id = 'cbse-board'
  GROUP BY stage, subject_id, question_type_id
  ORDER BY stage, subject_id, question_type_id
`, [], (err, rows) => {
  if (err) {
    console.error("Error querying db:", err);
    process.exit(1);
  }

  console.log(`\nFound ${rows.length} subject-stage-type groupings in CBSE:`);
  console.table(rows);

  // Check sample questions from each subject to inspect question text, chapter, and options
  db.all(`
    SELECT stage, subject_id, question_id, chapter, topic, language_content, question_type_id
    FROM questions
    WHERE board_id = 'cbse-board'
    GROUP BY stage, subject_id, question_type_id
    LIMIT 50
  `, [], (err2, samples) => {
    if (err2) {
      console.error(err2);
      process.exit(1);
    }
    console.log("\nSample Question per subject & type:");
    samples.forEach(s => {
      let parsed = {};
      try { parsed = JSON.parse(s.language_content); } catch (e) {}
      const text = parsed.hi?.q || parsed.en?.q || "N/A";
      const opts = parsed.hi?.options || parsed.en?.options || [];
      console.log(`[${s.stage}] [${s.subject_id}] [${s.question_type_id}]`);
      console.log(`  Chapter: ${s.chapter}`);
      console.log(`  Q: ${text.substring(0, 100)}...`);
      console.log(`  Opts: ${JSON.stringify(opts.slice(0, 2))}`);
    });
    db.close();
  });
});

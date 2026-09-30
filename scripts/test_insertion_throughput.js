const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../backend/db/sarkari_core.db'));

console.log("Testing SQLite transaction performance for 1,000 questions...");
const start = Date.now();

const testTx = db.transaction(() => {
  const insertQ = db.prepare(`
    INSERT INTO questions (
      question_id, exam_version_id, subject_id, chapter_id, topic_id,
      question_type_id, difficulty, marks, source_type, source_id,
      fingerprint, provenance, full_exam_eligible, practice_eligible,
      duplicate_status, quality_state, trust_status, is_published, answer_state
    ) VALUES (
      ?, ?, ?, NULL, NULL,
      ?, ?, ?, 'HUMAN_CURATED', ?,
      ?, 'HUMAN_CURATED', 0, 1,
      'UNIQUE', 'IMPORTED', 'VERIFIED', 1, 'ACTIVE'
    )
  `);

  const insertV = db.prepare(`
    INSERT INTO question_versions (
      version_id, question_id, version_number, language_content,
      correct_answer, correction_reason, verified
    ) VALUES (?, ?, 1, ?, ?, 'Benchmark Simulation', 1)
  `);

  for (let i = 1; i <= 1000; i++) {
    const qid = `test-bench-${i}`;
    const vid = `v-bench-${i}`;
    insertQ.run(qid, 'ver-ssc-cgl-2026', 'subj-math', 'single_mcq', 'MEDIUM', 1.0, 'src-ssc-cgl-portal', `bench-fp-${i}`);
    insertV.run(vid, qid, JSON.stringify({ en: { q: `Sample question ${i}`, options: ["A", "B", "C", "D"], ans: "A", exp: "Sample exp" } }), JSON.stringify({ index: 0, key: "A", value: "A" }));
  }

  // Force rollback
  throw new Error("ROLLBACK_BENCHMARK");
});

try {
  testTx();
} catch (err) {
  if (err.message === "ROLLBACK_BENCHMARK") {
    const elapsed = Date.now() - start;
    console.log(`✅ 1,000 questions simulated in ${elapsed} ms (~${((1000 / elapsed) * 1000).toFixed(0)} questions/sec).`);
  } else {
    console.error("Benchmark error:", err);
  }
}

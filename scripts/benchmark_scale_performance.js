/**
 * scripts/benchmark_scale_performance.js
 * 
 * SARKARIAI HUB — LARGE-SCALE DATABASE & ENGINE PERFORMANCE BENCHMARK (PHASE 17C)
 * 
 * Benchmarks the live 99,370 question database across:
 * 1. Primary Key Lookup by question_id
 * 2. Filtered Lookup by subject_id
 * 3. Filtered Lookup by exam_version_id
 * 4. Joined Question + Version Language Content Extraction
 * 5. Random Selection for Mock Engine (ORDER BY RANDOM() LIMIT 25)
 * 6. Adaptive Subjective Bank Model Answer Extraction
 * 7. Duplicate Fingerprint Exact Lookup
 * 8. Deep Pagination Query (OFFSET 50,000 LIMIT 25)
 * 9. Mock Test Blueprint Allocation Simulation
 * 10. PDF Engine Practice Question Selector Simulation
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../backend/db/sarkari_core.db');
const db = new Database(dbPath);

console.log("=====================================================================");
console.log("⚡ SARKARIAI HUB — 100K-SCALE PERFORMANCE BENCHMARK SUITE");
console.log("=====================================================================\n");

const totalQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
console.log(`Target Corpus Size: ${totalQ} questions`);

function benchmark(name, fn, iterations = 100) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    fn(i);
  }
  const end = process.hrtime.bigint();
  const totalNs = Number(end - start);
  const totalMs = totalNs / 1_000_000;
  const avgMs = totalMs / iterations;
  const qps = Math.round((iterations / totalMs) * 1000);
  console.log(`  ⏱️  ${name.padEnd(50)}: ${avgMs.toFixed(3)} ms/op (${qps.toLocaleString()} ops/sec)`);
  return { name, avgMs, qps };
}

const results = [];

// 1. Primary Key Lookup
const sampleQ = db.prepare('SELECT question_id FROM questions LIMIT 100').all().map(r => r.question_id);
const stmtPk = db.prepare('SELECT * FROM questions WHERE question_id = ?');
results.push(benchmark("1. Primary Key Lookup (by question_id)", (i) => {
  stmtPk.get(sampleQ[i % sampleQ.length]);
}, 500));

// 2. Subject Filtered Lookup
const stmtSubj = db.prepare('SELECT question_id, difficulty, marks FROM questions WHERE subject_id = ? LIMIT 50');
results.push(benchmark("2. Subject Filtered Lookup (LIMIT 50)", (i) => {
  stmtSubj.all('subj-math');
}, 200));

// 3. Exam Version Filtered Lookup
const stmtExam = db.prepare('SELECT question_id, subject_id, difficulty FROM questions WHERE exam_version_id = ? LIMIT 50');
results.push(benchmark("3. Exam Version Filtered Lookup (LIMIT 50)", (i) => {
  stmtExam.all('ver-ssc-cgl-2026');
}, 200));

// 4. Joined Question + Version Language Content
const stmtJoin = db.prepare(`
  SELECT q.question_id, q.subject_id, qv.language_content
  FROM questions q
  JOIN question_versions qv ON qv.question_id = q.question_id
  WHERE q.subject_id = ? AND q.practice_eligible = 1
  LIMIT 25
`);
results.push(benchmark("4. Joined Question + Version Content (LIMIT 25)", (i) => {
  stmtJoin.all('subj-science');
}, 200));

// 5. Random Selection for Mock Engine
const stmtRand = db.prepare(`
  SELECT q.question_id, q.subject_id, q.difficulty
  FROM questions q
  WHERE q.subject_id = ? AND q.practice_eligible = 1
  ORDER BY RANDOM()
  LIMIT 25
`);
results.push(benchmark("5. Mock Random Selection (ORDER BY RANDOM() LIMIT 25)", (i) => {
  stmtRand.all('subj-gk');
}, 50));

// 6. Adaptive Subjective Model Answer Lookup
const stmtSubjBank = db.prepare(`
  SELECT q.question_id, q.question_type_id, qv.correct_answer
  FROM questions q
  JOIN question_versions qv ON qv.question_id = q.question_id
  WHERE q.question_type_id IN ('short_answer', 'long_answer', 'case_study')
  LIMIT 20
`);
results.push(benchmark("6. Subjective Model Answer Query (LIMIT 20)", (i) => {
  stmtSubjBank.all();
}, 200));

// 7. Duplicate Fingerprint Exact Lookup
const sampleFp = db.prepare('SELECT fingerprint FROM questions LIMIT 50').all().map(r => r.fingerprint);
const stmtFp = db.prepare('SELECT question_id FROM questions WHERE fingerprint = ?');
results.push(benchmark("7. Exact Fingerprint Lookup (Indexed)", (i) => {
  stmtFp.get(sampleFp[i % sampleFp.length]);
}, 500));

// 8. Deep Pagination Query
const stmtPage = db.prepare('SELECT question_id, subject_id FROM questions LIMIT 25 OFFSET ?');
results.push(benchmark("8. Deep Pagination Query (OFFSET 50,000 LIMIT 25)", (i) => {
  stmtPage.all(50000);
}, 100));

// 9. Mock Test Multi-Subject Blueprint Allocation
const stmtMockAlloc = db.prepare(`
  SELECT q.question_id, q.subject_id, q.marks
  FROM questions q
  WHERE q.exam_version_id = 'ver-ssc-cgl-2026'
    AND q.subject_id IN ('subj-math', 'subj-reasoning', 'subj-english', 'subj-gk')
    AND q.practice_eligible = 1
  LIMIT 100
`);
results.push(benchmark("9. Multi-Subject Mock Allocation (LIMIT 100)", (i) => {
  stmtMockAlloc.all();
}, 100));

// 10. PDF Engine Complete Paper Extraction Simulation
const stmtPdfAlloc = db.prepare(`
  SELECT q.question_id, q.marks, qv.language_content, qv.correct_answer
  FROM questions q
  JOIN question_versions qv ON qv.question_id = q.question_id
  WHERE q.subject_id = 'subj-math'
  LIMIT 50
`);
results.push(benchmark("10. PDF Paper Generation Fetch (LIMIT 50)", (i) => {
  stmtPdfAlloc.all();
}, 100));

console.log("\n=====================================================================");
console.log("📊 SCALE BENCHMARK SUMMARY FOR 99,370 QUESTION CORPUS:");
const slowQueries = results.filter(r => r.avgMs > 50);
if (slowQueries.length === 0) {
  console.log("🚀 ALL 10 BENCHMARKED QUERIES EXECUTED SUB-50MS (EXCELLENT PERFORMANCE)!");
} else {
  console.log(`⚠️ Warning: ${slowQueries.length} queries exceeded 50ms.`);
}
console.log("=====================================================================\n");

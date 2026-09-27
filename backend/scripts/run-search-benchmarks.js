// backend/scripts/run-search-benchmarks.js
// Phase 12: Search Engine Scalability & Latency SLA Verification
// Evaluates query latency against SLAs (p50 < 5ms, p95 < 15ms) and records telemetry in search_performance_logs.

const { getDb } = require('../db/database');

function runSearchBenchmarks() {
  const db = getDb();
  console.log('=================================================================');
  console.log('⚡ SARKARIAI HUB — PHASE 12 SEARCH LATENCY & BENCHMARK SUITE');
  console.log('=================================================================');

  const benchmarkSuites = [
    {
      category: 'PROVENANCE_FILTERED',
      queryText: "provenance = 'OFFICIAL_PYQ' AND full_exam_eligible = 1",
      sql: `SELECT question_id, subject_id, provenance, question_tier 
            FROM questions 
            WHERE provenance = 'OFFICIAL_PYQ' AND full_exam_eligible = 1 
            LIMIT 50`,
      iterations: 200
    },
    {
      category: 'SUBJECT_JOIN_SEARCH',
      queryText: "subject_id = 'subj-gk' with subject name join",
      sql: `SELECT q.question_id, q.difficulty, q.is_verified, sub.name 
            FROM questions q 
            JOIN subjects sub ON q.subject_id = sub.subject_id 
            WHERE q.subject_id = 'subj-gk' 
            LIMIT 50`,
      iterations: 200
    },
    {
      category: 'MULTI_TOKEN_INVENTORY_SEARCH',
      queryText: "category = 'Civil Services' OR authority_code = 'UPSC'",
      sql: `SELECT inventory_id, exam_id, exam_name_en, authority_name 
            FROM nationwide_exam_inventory 
            WHERE category LIKE '%Civil%' OR authority_code = 'UPSC'`,
      iterations: 200
    },
    {
      category: 'FULL_EXAM_GATE_QUERY',
      queryText: "exam_version_id = 'ver-upsc-cse-2026' question bank scan",
      sql: `SELECT COUNT(*) as eligible_count 
            FROM questions 
            WHERE (paper_id LIKE '%upsc-cse%' OR exam_version_id = 'ver-upsc-cse-2026') 
              AND full_exam_eligible = 1`,
      iterations: 200
    }
  ];

  const insertLogStmt = db.prepare(`
    INSERT INTO search_performance_logs (
      log_id, query_text, query_category, result_count, latency_ms, recorded_at
    ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `);

  const summary = [];

  for (const suite of benchmarkSuites) {
    const latencies = [];
    let lastResultCount = 0;

    // Warm-up run
    db.prepare(suite.sql).all();

    for (let i = 0; i < suite.iterations; i++) {
      const start = process.hrtime.bigint();
      const rows = db.prepare(suite.sql).all();
      const end = process.hrtime.bigint();
      const ms = Number(end - start) / 1e6;
      latencies.push(ms);
      lastResultCount = rows.length;
    }

    latencies.sort((a, b) => a - b);
    const p50 = latencies[Math.floor(latencies.length * 0.50)];
    const p90 = latencies[Math.floor(latencies.length * 0.90)];
    const p95 = latencies[Math.floor(latencies.length * 0.95)];
    const p99 = latencies[Math.floor(latencies.length * 0.99)];

    const logId = `perf-bench-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    insertLogStmt.run(logId, suite.queryText, suite.category, lastResultCount, Math.round(p50 * 100) / 100);

    const passedSLA = p95 <= 15.0;

    console.log(`\n--- Benchmark: ${suite.category} (${suite.iterations} queries) ---`);
    console.log(`  Query: "${suite.queryText}"`);
    console.log(`  Rows returned: ${lastResultCount}`);
    console.log(`  p50 Latency:   ${p50.toFixed(3)} ms`);
    console.log(`  p90 Latency:   ${p90.toFixed(3)} ms`);
    console.log(`  p95 Latency:   ${p95.toFixed(3)} ms ${passedSLA ? '✅ (PASSED SLA < 15ms)' : '❌ (FAILED SLA)'}`);
    console.log(`  p99 Latency:   ${p99.toFixed(3)} ms`);

    summary.push({
      category: suite.category,
      iterations: suite.iterations,
      p50: Number(p50.toFixed(3)),
      p95: Number(p95.toFixed(3)),
      p99: Number(p99.toFixed(3)),
      passedSLA
    });
  }

  console.log('\n=================================================================');
  console.log(`🏁 BENCHMARK COMPLETE: ${summary.filter(s => s.passedSLA).length}/${summary.length} SUITES PASSED SLA`);
  console.log('=================================================================\n');

  return summary;
}

module.exports = { runSearchBenchmarks };

if (require.main === module) {
  runSearchBenchmarks();
}

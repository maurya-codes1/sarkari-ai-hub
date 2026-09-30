// scripts/run_all_regression_tests.js
const { execSync } = require('child_process');

const suites = [
  'backend/test/test-question-gap-closure.js',
  'backend/test/test-blueprint-driven-mock-engine.js',
  'backend/test/test-question-pattern-mapping.js',
  'backend/test/test-exam-pattern-governance.js',
  'backend/test/test-exam-pattern-reconciliation.js',
  'backend/test/test-pdf-engine-governance.js',
  'backend/test/test-phase16-pdf-allocation-enrichment.js',
  'backend/test/test-pyq-ingestion.js',
  'backend/test/test-pyq-coverage-expansion.js',
  'backend/test/test-pyq-batch-ingestion-phase9.js',
  'backend/test/test-phase10-pyq-digitization.js',
  'backend/test/test-ai-practice-question-engine.js',
  'backend/test/test-phase12-content-intelligence-mega.js',
  'backend/test/test-phase13-national-inventory.js',
  'backend/test/test-phase14-academic-truth-hardening.js',
  'backend/test/test-phase15-source-monitoring.js',
  'backend/test/test-phase16-exam-pattern-content-completion.js',
  'backend/test/test-phase17a-question-growth.js',
  'backend/test/test-phase17b-mass-question-production.js',
  'backend/test/test-phase17c-large-scale-production.js',
  'backend/test/test-phase17d-content-truth-audit.js',
  'backend/test/test-phase17e-readonly-audit.js',
  'backend/test/test-phase17f-board-language-audit.js',
  'backend/test/test-phase17g-board-content-production.js',
  'backend/test/test-phase17h-board-content-truth.js',
  'backend/test/test-phase17i-academic-completion.js',
  'backend/test/test-phase17j-national-completion.js',
  'backend/test/test-phase17k-final-board-gap-closure.js',
  'backend/test/test-phase17l-learning-loop.js',
  'backend/test/test-phase17m-final-consolidation.js',
  'backend/test/test-phase18-official-full-exam.js',
  'backend/test/test-phase19-state-board-full-exam.js',
  'backend/test/test-phase20-national-competitive-full-exam.js',
  'backend/test/test-phase21-pyq-digitization-expansion.js',
  'backend/test/test-phase22-universal-multilingual-ui.js',
  'backend/test/test-phase23-source-monitoring-observability.js',
  'backend/test/test-phase24-final-production-hardening.js',
  'backend/test/test-subject-isolation.js'
];


console.log('=====================================================================');
console.log(`🚀 RUNNING FULL REGRESSION HARNESS (${suites.length} SUITES)`);
console.log('=====================================================================\n');

let passed = 0;
let failed = 0;

for (let i = 0; i < suites.length; i++) {
  const suite = suites[i];
  process.stdout.write(`[${i + 1}/${suites.length}] Running ${suite}... `);
  try {
    execSync(`node ${suite}`, { stdio: 'pipe' });
    console.log('✅ PASSED');
    passed++;
  } catch (err) {
    console.log('❌ FAILED');
    console.error(err.stdout ? err.stdout.toString() : err.message);
    failed++;
  }
}

console.log('\n=====================================================================');
console.log(`📊 REGRESSION RESULTS: ${passed} / ${suites.length} SUITES PASSED (${failed} FAILED)`);
console.log('=====================================================================');

if (failed > 0) process.exit(1);

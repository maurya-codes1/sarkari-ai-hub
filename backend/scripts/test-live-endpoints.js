// backend/scripts/test-live-endpoints.js
// Tests real HTTP request / response execution against Express app for all frontend endpoints.

const http = require('http');
const app = require('../../server');

const testPort = 5055;
let server;

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: testPort,
      ...options
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, data });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runLiveAudit() {
  server = app.listen(testPort);
  console.log(`Test server running on port ${testPort}`);

  const endpoints = [
    { method: 'GET', path: '/api/health', expectedStatus: 200, name: 'Health Check' },
    { method: 'GET', path: '/api/v1/calendar/events', expectedStatus: 200, name: 'Calendar Events (Phase 11)' },
    { method: 'GET', path: '/api/v1/sources/health', expectedStatus: 200, name: 'Official Sources Health (Phase 11)' },
    { method: 'GET', path: '/api/v2/exams', expectedStatus: 200, name: 'Exams Inventory (Phase 12)' },
    { method: 'GET', path: '/api/v2/coverage/matrix', expectedStatus: 200, name: 'Coverage Matrix (Phase 12)' },
    { method: 'GET', path: '/api/v2/coverage/boards', expectedStatus: 200, name: 'Board Coverage (Phase 12)' },
    { method: 'GET', path: '/api/v2/coverage/benchmarks', expectedStatus: 200, name: 'Coverage Benchmarks (Phase 12)' },
    {
      method: 'POST',
      path: '/api/v2/preparation/plan/generate',
      body: { userId: 'audit-user', examId: 'ssc-cgl', targetExamDate: '2026-12-01', dailyStudyHours: 4.0 },
      expectedStatus: 200,
      name: 'Plan Generation (Phase 12)'
    },
    {
      method: 'POST',
      path: '/api/v3/adaptive/select',
      body: { userId: 'audit-user', examId: 'ssc-cgl', practiceMode: 'MIXED_ADAPTIVE', questionCount: 5 },
      expectedStatus: 200,
      name: 'Adaptive Question Selection (Phase 13)'
    },
    {
      method: 'POST',
      path: '/api/v3/adaptive/attempt',
      body: { userId: 'audit-user', questionId: 'audit-q1', examId: 'ssc-cgl', isCorrect: 1, timeSpentSeconds: 35 },
      expectedStatus: 200,
      name: 'Adaptive Attempt Recording (Phase 13)'
    },
    { method: 'GET', path: '/api/v3/candidate/profile/audit-user/ssc-cgl', expectedStatus: 200, name: 'Candidate Profile (Phase 13)' },
    { method: 'GET', path: '/api/v3/candidate/analytics/audit-user/ssc-cgl', expectedStatus: 200, name: 'Honest Denominators (Phase 13)' },
    {
      method: 'POST',
      path: '/api/v3/mock/submit-diagnostic',
      body: { userId: 'audit-user', examId: 'ssc-cgl', totalScore: 80, maxPossibleScore: 100, attemptedCount: 40, correctCount: 35, incorrectCount: 5, negativeMarkingDeduction: 2.5 },
      expectedStatus: 200,
      name: 'Post-Mock Diagnostic & Penalty (Phase 13)'
    },
    { method: 'GET', path: '/api/v3/search?q=ssc', expectedStatus: 200, name: 'Universal Provenance Search (Phase 13)' },
    { method: 'GET', path: '/api/v3/performance/benchmark', expectedStatus: 200, name: 'Latency SLA Verification (Phase 13)' }
  ];

  let passed = 0;
  let failed = 0;

  console.log('\n--- EXECUTING LIVE HTTP ENDPOINT VERIFICATION ---');
  for (const ep of endpoints) {
    try {
      const res = await request({
        method: ep.method,
        path: ep.path,
        headers: ep.body ? { 'Content-Type': 'application/json' } : {}
      }, ep.body);

      if (res.status === ep.expectedStatus && (res.data.success !== false)) {
        console.log(`  ✅ PASS: [${ep.method}] ${ep.path} -> ${res.status} (${ep.name})`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: [${ep.method}] ${ep.path} -> ${res.status} (Expected ${ep.expectedStatus})`);
        console.error(`     Response:`, res.data);
        failed++;
      }
    } catch (e) {
      console.error(`  ❌ ERROR: [${ep.method}] ${ep.path}:`, e.message);
      failed++;
    }
  }

  server.close();
  console.log(`\nLive Endpoint Audit Result: ${passed} PASSED, ${failed} FAILED`);
  process.exit(failed > 0 ? 1 : 0);
}

runLiveAudit();

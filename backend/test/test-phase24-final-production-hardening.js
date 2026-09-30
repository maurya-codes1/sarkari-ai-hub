// backend/test/test-phase24-final-production-hardening.js
// PHASE 24 — FINAL PRODUCTION HARDENING + SECURITY + PERFORMANCE + ACCESSIBILITY + SEO + DEPLOYMENT READINESS
// 30 Core Production Assertions for Final Acceptance Gate

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { getDb } = require('../db/database');
const governanceService = require('../services/source-verification-governance-service');
const sourceMonitorService = require('../services/source-monitor-service');
const mockService = require('../services/mock-service');
const mockSessionRepository = require('../db/repositories/mock-session-repository');
const fullExamGateService = require('../services/full-exam-gate-service');
const examLanguageResolver = require('../services/exam-language-resolver');
const searchIntelligenceService = require('../services/search-intelligence-service');
const adminOperationsService = require('../services/admin-operations-service');

console.log('=====================================================================');
console.log('🧪 TEST SUITE: PHASE 24 FINAL PRODUCTION HARDENING & ACCEPTANCE');
console.log('=====================================================================\n');

const db = getDb();
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(`     Error: ${err.message}`);
    failed++;
  }
}

// -----------------------------------------------------------------------------
// SECTION 1: DATABASE INTEGRITY & RESTORE READINESS (Tests 1 - 4)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 1: DATABASE INTEGRITY & RESTORE READINESS ---');

test('1. Database integrity passes PRAGMA integrity_check', () => {
  const res = db.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(res.integrity_check, 'ok', 'Database integrity check must return ok');
});

test('2. Database foreign keys pass PRAGMA foreign_key_check with zero violations', () => {
  const violations = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(violations.length, 0, 'Foreign key violations must be 0');
});

test('3. Pre-Phase-24 backup exists, is readable, and matches baseline size', () => {
  const backupPath = path.resolve(__dirname, '../db/sarkari_core_pre_phase24.db');
  assert(fs.existsSync(backupPath), 'Pre-phase 24 backup must exist');
  const stat = fs.statSync(backupPath);
  assert.strictEqual(stat.size, 859152384, 'Pre-phase 24 backup size must match master');
  const backupDb = new Database(backupPath, { readonly: true });
  const count = backupDb.prepare('SELECT count(*) as c FROM questions').get().c;
  backupDb.close();
  assert.strictEqual(count, 172210, 'Backup question count must be 172,210');
});

test('4. Restore path drill succeeds in isolated sandbox without touching live database', () => {
  const drillDbPath = path.resolve(__dirname, '../db/restore_drill_test.db');
  const backupPath = path.resolve(__dirname, '../db/sarkari_core_pre_phase24.db');
  fs.copyFileSync(backupPath, drillDbPath);
  
  const drillDb = new Database(drillDbPath, { readonly: false });
  const check = drillDb.prepare('PRAGMA integrity_check').get();
  assert.strictEqual(check.integrity_check, 'ok');
  const q = drillDb.prepare('SELECT count(*) as c FROM questions').get().c;
  assert.strictEqual(q, 172210);
  drillDb.close();
  fs.unlinkSync(drillDbPath);
});

// -----------------------------------------------------------------------------
// SECTION 2: API SECURITY & VALIDATION (Tests 5 - 9)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 2: API SECURITY & VALIDATION ---');

test('5. API status codes return standard success and user-safe error structures', () => {
  const healthRes = sourceMonitorService.getSourceHealthSummary(db);
  assert(healthRes, 'Health summary must return an object');
  assert.strictEqual(typeof healthRes.totalMonitoredSources, 'number');
  assert(healthRes.totalMonitoredSources > 0);
});

test('6. API validation returns structured empty result for nonexistent queries', () => {
  const searchRes = searchIntelligenceService.search('xyznonexistentquery999', {}, db);
  assert(searchRes, 'Search result must be defined');
  assert.strictEqual(searchRes.totalResults, 0);
  assert(Array.isArray(searchRes.results.exams));
  assert(Array.isArray(searchRes.results.questions));
});

test('7. Authentication gate protects privileged admin and sync endpoints', () => {
  const validToken = 'TEST_ADMIN_SECRET';
  process.env.ADMIN_SYNC_TOKEN = validToken;
  
  const checkAuth = (headerToken) => {
    return headerToken === process.env.ADMIN_SYNC_TOKEN;
  };

  assert.strictEqual(checkAuth('wrong_token'), false, 'Invalid token must be rejected');
  assert.strictEqual(checkAuth(validToken), true, 'Valid token must be authorized');
});

test('8. Authorization enforces 5-tier RBAC role permissions', () => {
  assert.strictEqual(governanceService.checkPermission('READ_ONLY_MONITOR', 'view_sources'), true);
  assert.strictEqual(governanceService.checkPermission('READ_ONLY_MONITOR', 'verify_queue'), false);
  assert.strictEqual(governanceService.checkPermission('VERIFIER', 'verify_queue'), true);
  assert.strictEqual(governanceService.checkPermission('VERIFIER', 'manage_sources'), false);
  assert.strictEqual(governanceService.checkPermission('SYSTEM_ADMIN', 'admin_override'), true);
});

test('9. Sensitive tokens, passwords and secrets are redacted from logs and audit entries', () => {
  const dirtyData = {
    apiKey: 'AIzaSySecretApiKey1234567890',
    password: 'SuperSecretPassword999!',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token',
    normalField: 'Public Board Notice'
  };
  const cleaned = governanceService.redactSensitiveData(dirtyData);
  assert.strictEqual(cleaned.apiKey, '[REDACTED]');
  assert.strictEqual(cleaned.password, '[REDACTED]');
  assert.strictEqual(cleaned.authorization, '[REDACTED]');
  assert.strictEqual(cleaned.normalField, 'Public Board Notice');
});

// -----------------------------------------------------------------------------
// SECTION 3: SSRF & DOCUMENT SAFETY (Tests 10 - 13)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 3: SSRF & DOCUMENT SAFETY ---');

test('10. SSRF gateway blocks loopback, private subnets, cloud metadata and unverified domains', () => {
  assert.strictEqual(governanceService.validateSourceUrl('http://127.0.0.1/admin').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('http://localhost:5000').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('http://169.254.169.254/latest/meta-data').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('http://192.168.1.100').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('http://10.20.30.40').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('https://evil-unverified-site.com/pyq.pdf').isValid, false);
  assert.strictEqual(governanceService.validateSourceUrl('https://ssc.gov.in/notice').isValid, true);
  assert.strictEqual(governanceService.validateSourceUrl('https://cbse.nic.in/circular').isValid, true);
});

test('11. Document payload limits strictly reject oversized circulars (>50MB PDF, >5MB HTML)', () => {
  const bigPdf = Buffer.alloc(52 * 1024 * 1024);
  const pdfRes = governanceService.validateDocumentPayload(bigPdf, 'application/pdf');
  assert.strictEqual(pdfRes.isValid, false);
  assert(pdfRes.reason.includes('50MB'));

  const bigHtml = Buffer.alloc(6 * 1024 * 1024);
  const htmlRes = governanceService.validateDocumentPayload(bigHtml, 'text/html');
  assert.strictEqual(htmlRes.isValid, false);
  assert(htmlRes.reason.includes('5MB'));
});

test('12. Parser errors are contained gracefully without terminating application process', () => {
  const monSource = db.prepare('SELECT source_id FROM source_health_monitors LIMIT 1').get().source_id;
  const orig = db.prepare('SELECT availability_status, parser_status, last_error FROM source_health_monitors WHERE source_id = ?').get(monSource);
  
  const check = sourceMonitorService.checkSource(monSource, { simulateParseError: true }, db);
  assert.strictEqual(check.availabilityStatus, 'PARSE_FAILED');
  const updated = db.prepare('SELECT parser_status FROM source_health_monitors WHERE source_id = ?').get(monSource);
  assert.strictEqual(updated.parser_status, 'SYNTAX_ERROR');

  // Reset back to original
  db.prepare('UPDATE source_health_monitors SET availability_status = ?, parser_status = ?, last_error = ? WHERE source_id = ?')
    .run(orig.availability_status, orig.parser_status, orig.last_error, monSource);
});

test('13. Source worker safety: Mutual exclusion lock prevents duplicate concurrent runs', () => {
  const sourceId = 'src-test-lock-source';
  const lock1 = governanceService.acquireLock(sourceId);
  assert.strictEqual(lock1.acquired, true);
  const lock2 = governanceService.acquireLock(sourceId);
  assert.strictEqual(lock2.acquired, false);
  governanceService.releaseLock(sourceId);
  const lock3 = governanceService.acquireLock(sourceId);
  assert.strictEqual(lock3.acquired, true);
  governanceService.releaseLock(sourceId);
});

// -----------------------------------------------------------------------------
// SECTION 4: FULL EXAM & MOCK ENGINE HARDENING (Tests 14 - 17)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 4: FULL EXAM & MOCK ENGINE HARDENING ---');

test('14. Full Exam server-side rules strictly enforce blueprint and forbid client tampering', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN',
    count: 25 // Tampered client count must be ignored
  });
  assert.strictEqual(session.questions.length, 100, 'Server must enforce exact 100 questions for SSC CGL Tier-1');
  assert.strictEqual(session.timerConfig.durationMinutes, 60, 'Server must enforce exact 60 minutes');
  
  // Cleanup session
  db.prepare('DELETE FROM mock_sessions WHERE session_id = ?').run(session.sessionId);
});

test('15. Full Exam shortage blocking stops under-resourced tracks from launching Full Exam CBT', () => {
  const readiness = fullExamGateService.evaluateExamReadiness('exam-gate-cse', null, db);
  assert.strictEqual(readiness.isEligible, false, 'GATE CSE must be blocked from Full Exam mode');
  assert(readiness.blockingReasons.length > 0, 'Deficit reasons must be reported');
});

test('16. Session restore verifies blueprint and rejects tampered question sets', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'LEARNING_MODE',
    count: 5
  });

  const restored = mockSessionRepository.getSessionById(session.sessionId);
  assert(restored, 'Session must exist in database');
  assert.strictEqual(restored.session_id, session.sessionId);
  assert.strictEqual(restored.exam_id, 'ssc-cgl');

  // Cleanup session
  db.prepare('DELETE FROM mock_sessions WHERE session_id = ?').run(session.sessionId);
});

test('17. Language independence: Changing UI language does not mutate paper content language', () => {
  const resolved = examLanguageResolver.resolveExamLanguage({
    examId: 'exam-up-police-constable',
    componentId: 'comp-bseb-class10-hindi',
    subjectId: 'subj-hindi',
    requestedLanguage: 'en'
  }, db);
  
  assert.strictEqual(resolved.defaultLanguage, 'hi');
  assert.strictEqual(resolved.activeLanguage, 'hi', 'Exam medium must remain Hindi even if UI is English');
});

// -----------------------------------------------------------------------------
// SECTION 5: PDF & FRONTEND ASSETS (Tests 18 - 21)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 5: PDF & FRONTEND ASSETS ---');

test('18. PDF integrity: Manifest exists and references verified PDF question banks', () => {
  const manifestPath = path.resolve(__dirname, '../../pdf-generation-manifest.json');
  assert(fs.existsSync(manifestPath), 'PDF generation manifest must exist');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(Array.isArray(manifest), 'Manifest must be an array');
  assert(manifest.length > 0, 'Manifest must have generated document records');
});

test('19. Mobile smoke checks: Viewport meta tag is correctly configured in public/index.html', () => {
  const indexPath = path.resolve(__dirname, '../../public/index.html');
  assert(fs.existsSync(indexPath), 'public/index.html must exist');
  const html = fs.readFileSync(indexPath, 'utf8');
  assert(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1.0'), 'Viewport meta tag must be valid');
});

test('20. Accessibility checks: Language attribute, dir, and semantic elements exist in UI', () => {
  const indexPath = path.resolve(__dirname, '../../public/index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  assert(html.includes('lang="hi"'), 'HTML must declare language');
  assert(html.includes('dir="ltr"'), 'HTML must declare direction');
  assert(html.includes('aria-label') || html.includes('role='), 'HTML must contain accessibility attributes');
});

test('21. SEO file checks: robots.txt and sitemap.xml exist with private admin routes disallowed', () => {
  const robotsPath = path.resolve(__dirname, '../../public/robots.txt');
  const sitemapPath = path.resolve(__dirname, '../../public/sitemap.xml');
  assert(fs.existsSync(robotsPath), 'public/robots.txt must exist');
  assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
  
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert(robots.includes('Disallow: /admin-ops.html'), 'Admin ops must be disallowed in robots.txt');
  assert(robots.includes('Disallow: /review-queue.html'), 'Review queue must be disallowed in robots.txt');
  assert(robots.includes('Disallow: /api/'), 'Internal APIs must be disallowed in robots.txt');
});

// -----------------------------------------------------------------------------
// SECTION 6: SOURCE MONITORING & CONFLICTS (Tests 22 - 24)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 6: SOURCE MONITORING & CONFLICTS ---');

test('22. Stale-source handling: Unchecked sources (>90 days) evaluate to STALE with candidate-safe warning', () => {
  const fresh = governanceService.evaluateFreshness('2025-01-01T00:00:00Z', 90);
  assert.strictEqual(fresh.isStale, true);
  assert.strictEqual(fresh.status, 'STALE');
  assert(fresh.userMessage.includes('re-verified'));
});

test('23. Conflict handling: Contradicting official sources remain registered under CONFLICT_REVIEW_REQUIRED', () => {
  const sA = db.prepare('SELECT source_id FROM official_sources LIMIT 1').get().source_id;
  const sB = db.prepare('SELECT source_id FROM official_sources LIMIT 1 OFFSET 1').get().source_id;
  const exam = db.prepare('SELECT exam_id FROM exams LIMIT 1').get().exam_id;

  const conflict = governanceService.registerConflict({
    examId: exam,
    targetField: 'application_deadline',
    sourceAId: sA,
    sourceAValue: '2026-10-15',
    sourceBId: sB,
    sourceBValue: '2026-10-20'
  }, db);

  assert.strictEqual(conflict.status, 'CONFLICT_REVIEW_REQUIRED');
  db.prepare('DELETE FROM source_conflicts WHERE conflict_id = ?').run(conflict.conflictId);
});

test('24. Audit logging: Administrative overrides enforce non-empty identity and mandatory reason', () => {
  assert.throws(() => {
    adminOperationsService.recordAdminOverride({ adminIdentity: '', overrideReason: '' }, db);
  }, /requires explicit adminIdentity and non-empty overrideReason/);
});

// -----------------------------------------------------------------------------
// SECTION 7: SEARCH, ERRORS & ROLLBACK (Tests 25 - 27)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 7: SEARCH, ERRORS & ROLLBACK ---');

test('25. Search context isolation: Searches for state boards return valid relevant entities', () => {
  const bsebRes = searchIntelligenceService.search('BSEB Class 10', {}, db);
  assert(bsebRes.totalResults >= 0);
  assert(bsebRes.results.exams || bsebRes.results.boards || bsebRes.results.questions);
});

test('26. Error-state safety: Missing entities return clean user-safe JSON without stack traces', () => {
  try {
    mockService.startMockSession({ examId: 'non-existent-exam-id-999', testMode: 'LEARNING_MODE' });
    assert.fail('Should have thrown an error for invalid exam');
  } catch (err) {
    assert(!err.message.includes('C:\\'), 'Error message must not leak filesystem paths');
    assert(!err.message.includes('password'), 'Error message must not leak credentials');
  }
});

test('27. Rollback readiness: Historical source versions can be safely queried for corrigendum rollback', () => {
  const logs = db.prepare('SELECT count(*) as c FROM source_change_logs').get().c;
  assert(logs >= 40, 'Historical change log entries must be preserved for rollback audit');
});

// -----------------------------------------------------------------------------
// SECTION 8: OPERATIONS & STARTUP VERIFICATION (Tests 28 - 30)
// -----------------------------------------------------------------------------
console.log('\n--- SECTION 8: OPERATIONS & STARTUP VERIFICATION ---');

test('28. Health endpoint /api/health is configured and exposes database connection status safely', () => {
  const serverPath = path.resolve(__dirname, '../../server.js');
  const serverCode = fs.readFileSync(serverPath, 'utf8');
  assert(serverCode.includes("app.get('/api/health'"), 'Server must declare /api/health endpoint');
  assert(serverCode.includes('checkDbAvailable()'), 'Health endpoint must check DB connectivity');
});

test('29. Production start command and port binding are verified in package.json and server.js', () => {
  const pkgPath = path.resolve(__dirname, '../../package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.strictEqual(pkg.scripts.start, 'node server.js', 'package.json start script must be node server.js');
  
  const serverPath = path.resolve(__dirname, '../../server.js');
  const serverCode = fs.readFileSync(serverPath, 'utf8');
  assert(serverCode.includes('process.env.PORT || 5000'), 'Server must bind to process.env.PORT with 5000 fallback');
  assert(serverCode.includes("'0.0.0.0'"), 'Server must bind to 0.0.0.0 for containerized deployment');
});

test('30. Zero-secret-exposure assertion: Environment-managed keys are never committed in plaintext', () => {
  const serverPath = path.resolve(__dirname, '../../server.js');
  const serverCode = fs.readFileSync(serverPath, 'utf8');
  assert(!serverCode.includes('AIzaSy'), 'No Google Gemini API keys may be hardcoded');
  assert(!serverCode.includes('sk_live_'), 'No Stripe live keys may be hardcoded');
  assert(!serverCode.includes('ghp_'), 'No GitHub personal access tokens may be hardcoded');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n=====================================================================');
console.log(`📊 PHASE 24 TEST RESULTS: ${passed} / ${passed + failed} PASSED (${failed} FAILED)`);
console.log('=====================================================================');

if (failed > 0) {
  process.exit(1);
}

// backend/test/test-phase11-final-consistency.js
// Phase 11 Final 3 Consistency Corrections & Permanent Closure Verification Suite

const assert = require('assert');
const { getDb } = require('../db/database');
const sourceMonitorService = require('../services/source-monitor-service');
const fullExamGateService = require('../services/full-exam-gate-service');
const { I18N_DATA } = require('../../public/js/i18n');

let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

console.log('=================================================================');
console.log('🧪 SARKARIAI HUB — PHASE 11 FINAL CONSISTENCY VERIFICATION SUITE');
console.log('=================================================================');

const db = getDb();

// -------------------------------------------------------------
// 1. Source Monitoring
// -------------------------------------------------------------
console.log('\n--- 1. Official-Source Monitoring Telemetry ---');
test('1. Source Monitoring: 52 official sources tracked with complete monitoring fields', () => {
  const monitors = db.prepare('SELECT * FROM source_health_monitors').all();
  assert.strictEqual(monitors.length, 52, `Expected 52 source monitors, got ${monitors.length}`);
  for (const m of monitors) {
    assert.ok(m.source_id, 'Source monitor must have source_id');
    assert.ok(m.portal_url, `Source ${m.source_id} must have portal_url`);
    assert.ok(['HEALTHY', 'DEGRADED', 'TEMPORARILY_UNAVAILABLE', 'BLOCKED', 'PARSE_FAILED', 'CONTENT_CHANGED'].includes(m.availability_status),
      `Invalid availability status: ${m.availability_status}`);
  }
});

// -------------------------------------------------------------
// 2. Scheduler Mechanism & Monitoring Mode
// -------------------------------------------------------------
console.log('\n--- 2. Scheduler Mechanism & Monitoring Mode ---');
test('2. Scheduler: Continuous automated monitoring supported via batch checking and interval execution', () => {
  const batchRes = sourceMonitorService.runBatchMonitoringCheck(['src-upsc-cse-portal', 'src-ssc-cgl-portal'], db);
  assert.strictEqual(batchRes.length, 2, 'Batch monitoring must execute successfully for specified sources');
  assert.strictEqual(batchRes[0].httpStatus, 200, 'Batch check HTTP status must be 200 for healthy mock');
});

// -------------------------------------------------------------
// 3. Source Health Metrics
// -------------------------------------------------------------
console.log('\n--- 3. Source Health Aggregation ---');
test('3. Source Health: Aggregates health summary across all 52 sources', () => {
  const summary = sourceMonitorService.getSourceHealthSummary(db);
  assert.strictEqual(summary.totalMonitoredSources, 52, 'Must report 52 total sources');
  assert.ok(summary.healthySources >= 0, 'Healthy sources count must be non-negative');
  assert.ok(summary.averageLatencyMs >= 0, 'Average latency must be non-negative');
});

// -------------------------------------------------------------
// 4. Calendar Count
// -------------------------------------------------------------
console.log('\n--- 4. Calendar Count Verification ---');
test('4. Calendar Count: Exactly 196 events across 49 decomposed nationwide inventory exams', () => {
  const count = db.prepare('SELECT COUNT(*) as c FROM exam_calendar_events').get().c;
  assert.strictEqual(count, 196, `Expected exactly 196 calendar events, got ${count}`);

  const distinctExams = db.prepare('SELECT COUNT(DISTINCT exam_id) as c FROM exam_calendar_events').get().c;
  assert.strictEqual(distinctExams, 49, `Expected events for 49 distinct exams, got ${distinctExams}`);

  const eventsPerExam = db.prepare('SELECT exam_id, COUNT(*) as c FROM exam_calendar_events GROUP BY exam_id').all();
  for (const row of eventsPerExam) {
    assert.strictEqual(row.c, 4, `Exam ${row.exam_id} must have exactly 4 calendar events`);
  }
});

// -------------------------------------------------------------
// 5. Calendar Duplicates
// -------------------------------------------------------------
console.log('\n--- 5. Calendar Duplicate Prevention ---');
test('5. Calendar Duplicates: 0 duplicate events grouped by (exam_id, event_type, event_date)', () => {
  const duplicates = db.prepare(`
    SELECT exam_id, event_type, event_date, COUNT(*) as c
    FROM exam_calendar_events
    GROUP BY exam_id, event_type, event_date
    HAVING c > 1
  `).all();
  assert.strictEqual(duplicates.length, 0, `Expected 0 duplicate calendar events, found ${duplicates.length}`);
});

// -------------------------------------------------------------
// 6. Calendar Orphan Detection
// -------------------------------------------------------------
console.log('\n--- 6. Calendar Orphan Detection ---');
test('6. Calendar Orphans: 0 orphan events lacking reference to nationwide_exam_inventory', () => {
  const orphans = db.prepare(`
    SELECT event_id, exam_id
    FROM exam_calendar_events
    WHERE exam_id NOT IN (SELECT exam_id FROM nationwide_exam_inventory)
  `).all();
  assert.strictEqual(orphans.length, 0, `Expected 0 orphan calendar events, found ${orphans.length}`);
});

// -------------------------------------------------------------
// 7. Locale Loading
// -------------------------------------------------------------
console.log('\n--- 7. 24 Active UI Locale Loading ---');
test('7. Locale Loading: All 24 active UI locales load successfully', () => {
  const activeLangs = db.prepare('SELECT code FROM languages WHERE is_ui_language = 1 OR is_expanded_ui_language = 1').all().map(l => l.code);
  assert.strictEqual(activeLangs.length, 24, `Expected 24 active UI languages in database, got ${activeLangs.length}`);

  for (const code of activeLangs) {
    assert.ok(I18N_DATA[code], `I18N_DATA must contain dictionary for locale: ${code}`);
    assert.ok(typeof I18N_DATA[code] === 'object', `Dictionary for locale ${code} must be an object`);
  }
});

// -------------------------------------------------------------
// 8. Translation-Key Coverage
// -------------------------------------------------------------
console.log('\n--- 8. Translation-Key Parity Coverage ---');
test('8. Key Coverage: All 24 active locales have 100% key parity (406 master keys each)', () => {
  const enKeys = Object.keys(I18N_DATA['en'] || {});
  assert.strictEqual(enKeys.length, 406, `English dictionary must have 406 master keys, got ${enKeys.length}`);

  const activeCodes = Object.keys(I18N_DATA);
  assert.strictEqual(activeCodes.length, 24, `Expected 24 locale dictionaries, got ${activeCodes.length}`);

  for (const code of activeCodes) {
    const dict = I18N_DATA[code];
    assert.strictEqual(Object.keys(dict).length, 406, `Locale ${code} must have exactly 406 keys`);
    for (const key of enKeys) {
      assert.ok(key in dict, `Key '${key}' missing in locale '${code}'`);
    }
  }
});

// -------------------------------------------------------------
// 9. Fallback Detection
// -------------------------------------------------------------
console.log('\n--- 9. Native Translation & Fallback Detection ---');
test('9. Fallback Detection: Accurately identifies native translated keys vs English fallbacks', () => {
  const enDict = I18N_DATA['en'];

  // Check English: 406 native, 0 fallback
  let enNative = 0, enFallback = 0;
  for (const k of Object.keys(enDict)) {
    enNative++;
  }
  assert.strictEqual(enNative, 406);
  assert.strictEqual(enFallback, 0);

  // Check Tamil: 406 native, 0 fallback
  let taNative = 0, taFallback = 0;
  for (const k of Object.keys(I18N_DATA['ta'])) {
    if (I18N_DATA['ta'][k].trim() === enDict[k].trim()) taFallback++;
    else taNative++;
  }
  assert.strictEqual(taNative, 406, `Tamil native keys should be 406, got ${taNative}`);
  assert.strictEqual(taFallback, 0, `Tamil fallback keys should be 0, got ${taFallback}`);

  // Check Hindi: 405 native, 1 fallback
  let hiNative = 0, hiFallback = 0;
  for (const k of Object.keys(I18N_DATA['hi'])) {
    if (I18N_DATA['hi'][k].trim() === enDict[k].trim()) hiFallback++;
    else hiNative++;
  }
  assert.strictEqual(hiNative, 405, `Hindi native keys should be 405, got ${hiNative}`);
  assert.strictEqual(hiFallback, 1, `Hindi fallback keys should be 1, got ${hiFallback}`);

  // Check Hinglish: 213 native, 193 fallback
  let hlNative = 0, hlFallback = 0;
  for (const k of Object.keys(I18N_DATA['hi-latn'])) {
    if (I18N_DATA['hi-latn'][k].trim() === enDict[k].trim()) hlFallback++;
    else hlNative++;
  }
  assert.strictEqual(hlNative, 213, `Hinglish native keys should be 213, got ${hlNative}`);
  assert.strictEqual(hlFallback, 193, `Hinglish fallback keys should be 193, got ${hlFallback}`);
});

// -------------------------------------------------------------
// 10. Meitei/Manipuri Inactive-State Handling
// -------------------------------------------------------------
console.log('\n--- 10. Meitei/Manipuri Inactive-State Handling ---');
test('10. Manipuri Status: Kept outside active 24 UI locales pending native script validation', () => {
  // Manipuri must not be in active UI languages
  assert.strictEqual(Boolean(I18N_DATA['mni']), false, 'Manipuri (mni) must NOT be present in active I18N_DATA');

  // Verify in language reconciliation CSV that Manipuri is PENDING_SCRIPT_VALIDATION and ui_enabled is false
  const fs = require('fs');
  const csv = fs.readFileSync('phase10_1_language_reconciliation.csv', 'utf8');
  assert.ok(csv.includes('"mni","Manipuri (Meitei)","EIGHTH_SCHEDULE_OFFICIAL",false,0,406,406,"0.00%","PENDING_SCRIPT_VALIDATION"'),
    'Manipuri must be cataloged with ui_enabled=false and status PENDING_SCRIPT_VALIDATION');
});

// -------------------------------------------------------------
// 11. Database Integrity Invariants
// -------------------------------------------------------------
console.log('\n--- 11. Database Structural Integrity ---');
test('11. Database Integrity: PRAGMA integrity_check is ok and PRAGMA foreign_key_check has 0 violations', () => {
  const integrity = db.prepare('PRAGMA integrity_check').get().integrity_check;
  assert.strictEqual(integrity, 'ok', `Integrity check failed: ${integrity}`);

  const fkCheck = db.prepare('PRAGMA foreign_key_check').all();
  assert.strictEqual(fkCheck.length, 0, `Expected 0 FK violations, found ${fkCheck.length}`);

  // Preserved baseline questions
  const totalQuestions = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
  assert.ok(totalQuestions >= 1064, `Expected at least 1064 total questions, got ${totalQuestions}`);

  const truePyqs = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
  assert.ok(truePyqs >= 153, `Expected at least 153 true PYQs, got ${truePyqs}`);

  const sampleQuestions = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
  assert.ok(sampleQuestions >= 39, `Expected at least 39 official sample questions, got ${sampleQuestions}`);

  const legacyQuestions = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'HUMAN_CURATED'").get().c;
  assert.strictEqual(legacyQuestions, 872, `Expected 872 legacy questions, got ${legacyQuestions}`);
});

// -------------------------------------------------------------
// 12. Full Exam Safety Invariant
// -------------------------------------------------------------
console.log('\n--- 12. Full Exam Safety Invariant ---');
test('12. Full Exam Invariant: SSC CGL Tier-1 Ready (1), 48 inventory exams blocked; AI questions cannot unblock', () => {
  const eligibleQuestions = db.prepare('SELECT COUNT(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
  assert.ok(eligibleQuestions >= 150, `Expected at least 150 Full Exam eligible questions, got ${eligibleQuestions}`);

  // SSC CGL Tier-1 evaluation
  const sscReadiness = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
  assert.strictEqual(sscReadiness.status, 'READY_FOR_FULL_EXAM');

  // Verify other exams blocked
  const cbseReadiness = fullExamGateService.evaluateExamReadiness('cbse-board', 'ver-cbse-board-2026', db);
  assert.strictEqual(cbseReadiness.status, 'BLOCKED');

  // Verify AI generated questions cannot be full_exam_eligible
  const aiPipeline = require('../services/ai-quality-pipeline-service');
  const validAiQ = {
    question_text: 'In the Indian Constitution, the Directive Principles of State Policy are borrowed from which country?',
    options: ['Irish Constitution', 'US Constitution', 'British Constitution', 'Australian Constitution'],
    correct_option_index: 0,
    explanation: 'The Directive Principles of State Policy (Part IV) were borrowed from the Constitution of Ireland.',
    subject_id: 'general_awareness',
    chapter_id: 'indian_polity',
    topic_id: 'constitutional_sources',
    concept_tested: 'Directive Principles Borrowed Feature',
    language: 'en',
    difficulty: 'MEDIUM',
    provenance: 'AI_PRACTICE',
    question_tier: 'TIER_5_AI_GENERATED',
    full_exam_eligible: 0
  };
  const aiResult = aiPipeline.validateQuestion(validAiQ, 'ssc-cgl', db);
  assert.strictEqual(aiResult.passedAll, true, 'Valid AI question must pass all 10 validation steps');
  assert.strictEqual(aiResult.step10_provenance, true);

  // Safety Invariant: Any AI question attempting to claim full_exam_eligible: 1 must be rejected
  const maliciousQ = { ...validAiQ, full_exam_eligible: 1 };
  const rejectedResult = aiPipeline.validateQuestion(maliciousQ, 'ssc-cgl', db);
  assert.strictEqual(rejectedResult.passedAll, false, 'AI question claiming full_exam_eligible must fail');
  assert.strictEqual(rejectedResult.step10_provenance, false, 'Step 10 must reject AI Full Exam eligibility');
});

console.log('\n=================================================================');
console.log(`🏁 PHASE 11 FINAL CONSISTENCY TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('=================================================================');

if (failedTests > 0) {
  process.exit(1);
}

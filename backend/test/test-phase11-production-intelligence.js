// backend/test/test-phase11-production-intelligence.js
// Automated Verification Suite for Phase 11: Production Intelligence, Source Monitoring & User Preparation Platform

const assert = require('assert');
const { getDb } = require('../db/database');

const sourceMonitorService = require('../services/source-monitor-service');
const changeDetectionService = require('../services/change-detection-service');
const corrigendumService = require('../services/corrigendum-service');
const examCalendarService = require('../services/exam-calendar-service');
const notificationEngineService = require('../services/notification-engine-service');
const userPreparationService = require('../services/user-preparation-service');
const aiQualityPipelineService = require('../services/ai-quality-pipeline-service');
const adminOperationsService = require('../services/admin-operations-service');
const searchIntelligenceService = require('../services/search-intelligence-service');
const fullExamGateService = require('../services/full-exam-gate-service');

function runPhase11Tests() {
  console.log('=================================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 11 PRODUCTION INTELLIGENCE TEST SUITE');
  console.log('=================================================================');

  const db = getDb();
  let passedTests = 0;
  let failedTests = 0;

  function runTest(name, fn) {
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Error: ${err.message}`);
      failedTests++;
    }
  }

  // -------------------------------------------------------------
  // 1. OFFICIAL SOURCE MONITORING & HEALTH TELEMETRY
  // -------------------------------------------------------------
  console.log('\n--- 1. Continuous Official-Source Monitoring & Health Telemetry ---');

  runTest('Source Monitor accurately indexes and monitors all 52 official sources', () => {
    const monitors = sourceMonitorService.getAllMonitors({}, db);
    assert.strictEqual(monitors.length, 52, `Expected 52 monitored sources, got ${monitors.length}`);
    const summary = sourceMonitorService.getSourceHealthSummary(db);
    assert.strictEqual(summary.totalMonitoredSources, 52);
    assert(summary.healthySources >= 50, 'Majority of sources must be healthy');
  });

  runTest('Source Check detects healthy response and updates telemetry', () => {
    const res = sourceMonitorService.checkSource('src-ssc-cgl-portal', {}, db);
    assert.strictEqual(res.sourceId, 'src-ssc-cgl-portal');
    assert.strictEqual(res.httpStatus, 200);
    assert.strictEqual(res.availabilityStatus, 'HEALTHY');
    assert.strictEqual(res.isContentChanged, false);
  });

  runTest('Source Check handles HTTP failure (503) safely without downgrading content', () => {
    const res = sourceMonitorService.checkSource('src-upsc-cse-portal', {
      simulateFailure: true,
      failureCode: 503,
      errorMessage: 'Service Unavailable'
    }, db);
    assert.strictEqual(res.httpStatus, 503);
    assert.strictEqual(res.availabilityStatus, 'TEMPORARILY_UNAVAILABLE');
    const monitor = sourceMonitorService.getMonitorById('src-upsc-cse-portal', db);
    assert(monitor.failure_count > 0);
    // Restore health for subsequent tests
    sourceMonitorService.checkSource('src-upsc-cse-portal', {}, db);
  });

  runTest('Source Check detects content hash change without false degradation', () => {
    const res = sourceMonitorService.checkSource('src-ssc-cgl-portal', {
      newContent: 'SSC CGL 2026 Revised Notification Stream Hash ' + Date.now()
    }, db);
    assert.strictEqual(res.isContentChanged, true);
    assert.strictEqual(res.availabilityStatus, 'CONTENT_CHANGED');
    // Restore health
    sourceMonitorService.checkSource('src-ssc-cgl-portal', {}, db);
  });

  // -------------------------------------------------------------
  // 2. CHANGE DETECTION & MULTI-LEVEL CLASSIFICATION
  // -------------------------------------------------------------
  console.log('\n--- 2. Source Change Detection, Classification & Impact Analysis ---');

  runTest('Level 0: Formatting / whitespace change is classified as non-meaningful', () => {
    const cls = changeDetectionService.classifyChangeLevel('notice_text', 'Notification  No 12 ', 'Notification No 12');
    assert.strictEqual(cls.level, 'LEVEL_0');
    assert.strictEqual(cls.isMeaningful, false);
    assert.strictEqual(cls.isCritical, false);
  });

  runTest('Level 1: Minor informational change is classified without candidate alert', () => {
    const cls = changeDetectionService.classifyChangeLevel('helpline_phone', '011-24361359', '011-24361360');
    assert.strictEqual(cls.level, 'LEVEL_1');
    assert.strictEqual(cls.isMeaningful, false);
  });

  runTest('Level 2: Important candidate-facing date (admit card) is classified as meaningful', () => {
    const cls = changeDetectionService.classifyChangeLevel('admit_card_date', '2026-08-01', '2026-08-10');
    assert.strictEqual(cls.level, 'LEVEL_2');
    assert.strictEqual(cls.isMeaningful, true);
    assert.strictEqual(cls.isCritical, false);
  });

  runTest('Level 3: Critical exam-rule change (exam date, negative marking) is classified as critical', () => {
    const clsExamDate = changeDetectionService.classifyChangeLevel('exam_date', '2026-09-15', '2026-10-15');
    assert.strictEqual(clsExamDate.level, 'LEVEL_3');
    assert.strictEqual(clsExamDate.isCritical, true);

    const clsNegative = changeDetectionService.classifyChangeLevel('negative_marking', '0.50', '0.25');
    assert.strictEqual(clsNegative.level, 'LEVEL_3');
    assert.strictEqual(clsNegative.isCritical, true);
  });

  runTest('Impact Analysis isolates affected modules and identifies candidate actions', () => {
    const impact = changeDetectionService.analyzeImpact('ssc-cgl', 'exam_date', 'LEVEL_3');
    assert.strictEqual(impact.affectedExamId, 'ssc-cgl');
    assert(impact.affectedModules.includes('exam_calendar'));
    assert(impact.affectedModules.includes('application_tracker'));
    assert(impact.candidateActionsRequired.length > 0);
  });

  // -------------------------------------------------------------
  // 3. STATUTORY CORRIGENDA & HISTORICAL PRESERVATION
  // -------------------------------------------------------------
  console.log('\n--- 3. Statutory Corrigenda & Historical Preservation ---');

  runTest('Registers official corrigendum preserving both original and corrected values', () => {
    const res = corrigendumService.registerCorrigendum({
      examId: 'rrb-ntpc',
      versionId: 'ver-rrb-ntpc-2026',
      corrigendumNumber: 'RRB/CEN-01/2026/Corr-1',
      title: 'RRB NTPC 2026 Corrigendum on Educational Qualification Cutoff Date',
      originalSourceId: 'src-rrb-cdg-portal',
      corrigendumSourceId: 'src-rrb-cdg-portal',
      affectedField: 'qualification_cutoff_date',
      originalFieldValue: '31-07-2026',
      correctedFieldValue: '31-08-2026',
      publicationDate: '2026-06-25',
      effectiveDate: '2026-06-25',
      affectedRecords: ['exam_eligibility_criteria', 'registration_schedule'],
      verificationStatus: 'VERIFIED_OFFICIAL'
    }, db);

    assert.strictEqual(res.status, 'REGISTERED_PRESERVED');
    assert.strictEqual(res.originalFieldValue, '31-07-2026');
    assert.strictEqual(res.correctedFieldValue, '31-08-2026');
  });

  runTest('Retrieves exam corrigenda with full statutory audit history without record deletion', () => {
    const list = corrigendumService.getCorrigendaForExam('rrb-ntpc', db);
    assert(list.length >= 1);
    const corr = list[0];
    assert.strictEqual(corr.corrigendum_number, 'RRB/CEN-01/2026/Corr-1');
    assert.strictEqual(corr.original_field_value, '31-07-2026');
    assert.strictEqual(corr.corrected_field_value, '31-08-2026');
  });

  // -------------------------------------------------------------
  // 4. UNIFIED EXAM CALENDAR & DEADLINE TRACKING
  // -------------------------------------------------------------
  console.log('\n--- 4. Unified Exam Calendar & Deadline Tracking ---');

  runTest('Calendar returns official schedules across nationwide exams', () => {
    const events = examCalendarService.getCalendarEvents({ examId: 'ssc-cgl' }, db);
    assert(events.length >= 4, `Expected at least 4 events for ssc-cgl, found ${events.length}`);
    assert(events.some(e => e.event_type === 'APPLICATION_END'));
    assert(events.some(e => e.event_type === 'EXAM_DATE'));
  });

  runTest('Calendar never marks estimated dates as OFFICIAL', () => {
    const events = examCalendarService.getCalendarEvents({}, db);
    for (const e of events) {
      if (e.event_status === 'OFFICIAL') {
        assert(e.source_url || e.source_id, `Official event ${e.event_id} must have official source binding`);
      }
    }
  });

  runTest('Detects upcoming deadlines within configured horizon', () => {
    const deadlines = examCalendarService.getUpcomingDeadlines('2026-06-15', 45, db);
    assert(deadlines.length > 0, 'Must identify deadlines in the test horizon');
    assert(deadlines.every(d => ['APPLICATION_END', 'CORRECTION_WINDOW', 'EXAM_DATE', 'ADMIT_CARD'].includes(d.event_type)));
  });

  // -------------------------------------------------------------
  // 5. USER NOTIFICATIONS & DEDUPLICATION ENGINE
  // -------------------------------------------------------------
  console.log('\n--- 5. User Notifications & Deduplication Engine ---');

  runTest('Dispatches notification and enforces deduplication key', () => {
    const testUser = 'user-test-dedup-' + Date.now();
    const payload = {
      notificationType: 'EXAM_DATE_CHANGED',
      title: 'SSC CGL Tier-1 Exam Date Announced',
      summary: 'SSC CGL 2026 Tier-1 examination will be held starting 15 September 2026.',
      affectedExamId: 'ssc-cgl',
      severity: 'IMPORTANT',
      effectiveDate: '2026-09-15',
      eventRef: 'notif-cgl-exam-date'
    };

    // First dispatch -> DISPATCHED
    const res1 = notificationEngineService.dispatchNotification(testUser, payload, db);
    assert.strictEqual(res1.status, 'DISPATCHED');

    // Duplicate dispatch -> DUPLICATE_PREVENTED
    const res2 = notificationEngineService.dispatchNotification(testUser, payload, db);
    assert.strictEqual(res2.status, 'DUPLICATE_PREVENTED');
    assert.strictEqual(res2.deduplicationKey, res1.deduplicationKey);
  });

  runTest('Notification preferences suppress unwanted alert categories', () => {
    const testUser = 'user-test-prefs-' + Date.now();
    // User disables application alerts
    notificationEngineService.updateUserPreferences(testUser, { applicationAlerts: false }, db);

    const payload = {
      notificationType: 'APPLICATION_DEADLINE',
      title: 'Deadline Approaching',
      summary: 'Last day to apply.',
      affectedExamId: 'ssc-cgl',
      effectiveDate: '2026-07-20'
    };

    const res = notificationEngineService.dispatchNotification(testUser, payload, db);
    assert.strictEqual(res.status, 'SUPPRESSED_BY_USER_PREFERENCE');
  });

  // -------------------------------------------------------------
  // 6. USER PREPARATION DASHBOARD & WEAK-TOPIC ENGINE
  // -------------------------------------------------------------
  console.log('\n--- 6. User Preparation Intelligence & Weak-Topic Engine ---');

  runTest('Save and unsave items for a user', () => {
    const user = 'user-saved-test';
    const saveRes = userPreparationService.saveItem(user, 'EXAM', 'ssc-cgl', db);
    assert.strictEqual(saveRes.status, 'SAVED');

    let savedList = userPreparationService.getSavedItems(user, db);
    assert.strictEqual(savedList.length, 1);

    const unsaveRes = userPreparationService.unsaveItem(user, 'EXAM', 'ssc-cgl', db);
    assert.strictEqual(unsaveRes.status, 'UNSAVED');

    savedList = userPreparationService.getSavedItems(user, db);
    assert.strictEqual(savedList.length, 0);
  });

  runTest('Application tracker evaluates candidate eligibility and records application', () => {
    const user = 'user-app-test';
    const tracker = userPreparationService.trackApplication(user, {
      examId: 'ssc-cgl',
      candidateCategory: 'OBC',
      candidateDob: '1998-05-15',
      notes: 'Applying under OBC quota'
    }, db);

    assert(tracker);
    assert.strictEqual(tracker.exam_id, 'ssc-cgl');
    assert.strictEqual(tracker.candidate_category, 'OBC');
    assert.strictEqual(tracker.application_status, 'INTENDED');
    assert(tracker.official_portal_url);

    // Update status to APPLIED
    const updated = userPreparationService.updateApplicationStatus(tracker.tracker_id, 'APPLIED', db);
    assert.strictEqual(updated.application_status, 'APPLIED');
  });

  runTest('Practice activity tracking detects weak topics objectively without psychoanalysis', () => {
    const user = 'user-perf-test';
    // Record low accuracy on algebra topic
    userPreparationService.recordPracticeActivity(user, {
      examId: 'ssc-cgl',
      subjectId: 'quantitative_aptitude',
      topicId: 'algebra_quadratics',
      questionsAttempted: 10,
      questionsCorrect: 3,
      questionsIncorrect: 7,
      questionsSkipped: 0,
      timeSpentSeconds: 450,
      isMock: false,
      isPyq: true
    }, db);

    const weakTopics = userPreparationService.getWeakTopics(user, 'ssc-cgl', db);
    assert(weakTopics.length > 0);
    const weak = weakTopics[0];
    assert.strictEqual(weak.topic_id, 'algebra_quadratics');
    assert.strictEqual(weak.accuracy_pct, 30.0);
    assert(weak.recommended_action.includes('algebra_quadratics'));
    assert(['MILD', 'MODERATE', 'CRITICAL'].includes(weak.weakness_severity));
  });

  runTest('Preparation dashboard generates explainable recommendations', () => {
    const user = 'user-perf-test';
    const dashboard = userPreparationService.getDashboardData(user, 'ssc-cgl', db);
    assert(dashboard.userId);
    assert(dashboard.overallMetrics.questionsAttempted >= 10);
    assert(dashboard.recommendations.length >= 2);

    for (const rec of dashboard.recommendations) {
      assert(rec.title);
      assert(rec.rationale, 'Recommendation must provide clear explainable rationale');
      assert(rec.questionCount > 0);
    }
  });

  // -------------------------------------------------------------
  // 7. 10-STEP AI QUALITY PIPELINE & PROVENANCE SAFETY
  // -------------------------------------------------------------
  console.log('\n--- 7. 10-Step AI Practice Quality Pipeline & Provenance Isolation ---');

  runTest('Valid AI practice question passes all 10 validation steps', () => {
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

    const val = aiQualityPipelineService.validateQuestion(validAiQ, 'ssc-cgl', db);
    assert.strictEqual(val.passedAll, true, `Validation failed: ${val.errors.join(', ')}`);
    assert.strictEqual(val.step1_schema, true);
    assert.strictEqual(val.step2_syllabus, true);
    assert.strictEqual(val.step3_concept, true);
    assert.strictEqual(val.step4_answer, true);
    assert.strictEqual(val.step5_options, true);
    assert.strictEqual(val.step6_duplicate, true);
    assert.strictEqual(val.step7_ambiguity, true);
    assert.strictEqual(val.step8_language, true);
    assert.strictEqual(val.step9_difficulty, true);
    assert.strictEqual(val.step10_provenance, true);
  });

  runTest('SAFETY INVARIANT: AI question attempting to claim OFFICIAL_PYQ or Full Exam is blocked by Step 10', () => {
    const invalidProvenanceAiQ = {
      question_text: 'Which article deals with the proclamation of Financial Emergency in India?',
      options: ['Article 352', 'Article 356', 'Article 360', 'Article 365'],
      correct_option_index: 2,
      explanation: 'Article 360 deals with the proclamation of Financial Emergency.',
      subject_id: 'general_awareness',
      chapter_id: 'indian_polity',
      topic_id: 'emergency_provisions',
      concept_tested: 'Financial Emergency Article 360',
      language: 'en',
      difficulty: 'EASY',
      provenance: 'OFFICIAL_PYQ', // ILLEGAL ATTEMPT
      question_tier: 'TIER_2_VERIFIED_PYQ',
      full_exam_eligible: 1
    };

    const val = aiQualityPipelineService.validateQuestion(invalidProvenanceAiQ, 'ssc-cgl', db);
    assert.strictEqual(val.passedAll, false);
    assert.strictEqual(val.step10_provenance, false);
    assert(val.errors.some(e => e.includes('Provenance safety invariant failed')));
  });

  runTest('Option validation blocks questions with duplicate or blank options', () => {
    const dupOptionQ = {
      question_text: 'What is the chemical formula of common salt in chemistry?',
      options: ['NaCl', 'KCl', 'NaCl', 'CaCl2'], // Duplicate NaCl
      correct_option_index: 0,
      explanation: 'Common salt is Sodium Chloride (NaCl).',
      subject_id: 'general_science',
      chapter_id: 'chemistry',
      topic_id: 'compounds',
      concept_tested: 'Common Salt Formula',
      language: 'en',
      difficulty: 'EASY',
      provenance: 'AI_PRACTICE',
      question_tier: 'TIER_5_AI_GENERATED',
      full_exam_eligible: 0
    };

    const val = aiQualityPipelineService.validateQuestion(dupOptionQ, 'ssc-cgl', db);
    assert.strictEqual(val.passedAll, false);
    assert.strictEqual(val.step5_options, false);
    assert(val.errors.some(e => e.includes('Option validation failed')));
  });

  // -------------------------------------------------------------
  // 8. SEARCH INTELLIGENCE & TRUST TIERS
  // -------------------------------------------------------------
  console.log('\n--- 8. Search Intelligence & Trust Tier Classification ---');

  runTest('Universal search identifies exams, calendar events, corrigenda, and questions with badges', () => {
    const res = searchIntelligenceService.search('SSC', { language: 'en' }, db);
    assert(res.totalResults > 0);
    assert(res.results.exams.length > 0);
    assert(res.results.exams.some(e => e.trustTier === 'Verified Official' || e.trustTier === 'Monitoring'));
    assert(res.results.calendarEvents.length > 0);
    assert(res.results.calendarEvents.every(e => ['Official', 'Estimated', 'Historical'].includes(e.trustTier)));
  });

  runTest('Question search returns verified trust tiers (Verified PYQ, Official Sample, Historical)', () => {
    const res = searchIntelligenceService.search('constitution', { language: 'en' }, db);
    if (res.results.questions.length > 0) {
      assert(res.results.questions.every(q => ['Verified PYQ', 'Official Sample', 'Historical', 'Practice', 'AI Practice'].includes(q.trustTier)));
    }
  });

  // -------------------------------------------------------------
  // 9. ADMIN OPERATIONS & MANDATORY AUDIT OVERRIDES
  // -------------------------------------------------------------
  console.log('\n--- 9. Admin Operations & Auditable Overrides ---');

  runTest('Admin Operations overview aggregates live telemetry and gate counters', () => {
    const ov = adminOperationsService.getOperationsOverview(db);
    assert(ov.sourceHealth.totalMonitoredSources === 52);
    assert(ov.fullExamReadiness.readyCount >= 1, 'At least 1 exam must remain Full Exam Ready (SSC CGL)');
    assert(ov.fullExamReadiness.blockedCount >= 47);
    assert.strictEqual(ov.fullExamReadiness.safetyInvariantEnforced, true);
  });

  runTest('Admin Override records mandatory audit reason and trail', () => {
    const override = adminOperationsService.recordAdminOverride({
      adminIdentity: 'sec-admin-test-99',
      targetEntityType: 'SOURCE',
      targetEntityId: 'src-ssc-cgl-portal',
      fieldName: 'availability_status',
      oldValue: 'HEALTHY',
      newValue: 'DEGRADED',
      overrideReason: 'Official maintenance scheduled per notice #2026/01'
    }, db);

    assert.strictEqual(override.status, 'OVERRIDE_RECORDED');
    const trail = adminOperationsService.getOverrideAuditTrail('src-ssc-cgl-portal', db);
    assert(trail.length > 0);
    assert.strictEqual(trail[0].admin_identity, 'sec-admin-test-99');
    assert(trail[0].override_reason.includes('Official maintenance'));
  });

  runTest('Admin Override rejects execution if audit reason is missing', () => {
    assert.throws(() => {
      adminOperationsService.recordAdminOverride({
        adminIdentity: 'sec-admin-test-99',
        targetEntityType: 'SOURCE',
        targetEntityId: 'src-ssc-cgl-portal',
        fieldName: 'status',
        oldValue: 'A',
        newValue: 'B',
        overrideReason: '' // BLANK REASON PROHIBITED
      }, db);
    }, /overrideReason/);
  });

  // -------------------------------------------------------------
  // 10. DATABASE INTEGRITY & ZERO REGRESSION INVARIANTS
  // -------------------------------------------------------------
  console.log('\n--- 10. Database Integrity & Zero Regression Invariants ---');

  runTest('SQLite PRAGMA integrity_check returns ok', () => {
    const res = db.prepare('PRAGMA integrity_check').get();
    assert.strictEqual(res.integrity_check, 'ok');
  });

  runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
    const violations = db.prepare('PRAGMA foreign_key_check').all();
    assert.strictEqual(violations.length, 0, `Expected 0 FK violations, found ${violations.length}`);
  });

  runTest('Phase 10 Invariant: 1,064 preserved questions baseline remains 100% intact', () => {
    const totQ = db.prepare('SELECT count(*) as c FROM questions').get().c;
    assert.ok(totQ >= 1064, `Expected at least 1064 questions, got ${totQ}`);

    const pyqs = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_PYQ'").get().c;
    assert.ok(pyqs >= 153, `Expected at least 153 True Official PYQs, got ${pyqs}`);

    const samples = db.prepare("SELECT count(*) as c FROM questions WHERE provenance = 'OFFICIAL_SAMPLE'").get().c;
    assert.ok(samples >= 39, `Expected at least 39 Official Sample questions, got ${samples}`);

    const legacy = db.prepare('SELECT count(*) as c FROM questions WHERE is_verified = 0').get().c;
    assert.strictEqual(legacy, 872, `Expected 872 legacy questions, got ${legacy}`);

    const fullExam = db.prepare('SELECT count(*) as c FROM questions WHERE full_exam_eligible = 1').get().c;
    assert.ok(fullExam >= 150, `Expected at least 150 Full Exam eligible questions, got ${fullExam}`);
  });

  runTest('Phase 10 Invariant: SSC CGL remains READY_FOR_FULL_EXAM while cbse-board remains FULL_EXAM_BLOCKED', () => {
    const sscReadiness = fullExamGateService.evaluateExamReadiness('ssc-cgl', 'ver-ssc-cgl-2026', db);
    assert.strictEqual(sscReadiness.status, 'READY_FOR_FULL_EXAM');

    const cbseReadiness = fullExamGateService.evaluateExamReadiness('cbse-board', 'ver-cbse-board-2026', db);
    assert.strictEqual(cbseReadiness.status, 'BLOCKED');
    assert.strictEqual(cbseReadiness.primaryReason, 'FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS');
  });

  console.log('=================================================================');
  console.log(`🏁 PHASE 11 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=================================================================');

  if (failedTests > 0) {
    throw new Error(`Phase 11 test suite failed with ${failedTests} failure(s)`);
  }
}

module.exports = { runPhase11Tests };

if (require.main === module) {
  runPhase11Tests();
}

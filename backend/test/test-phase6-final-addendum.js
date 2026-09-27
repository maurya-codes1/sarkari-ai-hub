// backend/test/test-phase6-final-addendum.js
// Automated Test Suite for Phase 6 Final Addendum:
// Content Dependency, Version Snapshots, Language QA & Official-Change Impact
// Validates all 29 mandatory tests:
// 1. Content dependency creation
// 2. Blueprint change detection
// 3. Automatic stale state
// 4. Critical change impact
// 5. Exam snapshot creation
// 6. Historical snapshot preservation
// 7. Historical mock traceability via snapshot ID
// 8. Language consistency validation (Question, Options, Instructions, Notes)
// 9. UI language vs exam language separation (Hinglish UI with Hindi+English content)
// 10. Notes dependency validation
// 11. Question bank dependency validation
// 12. Full Exam revalidation state
// 13. Question shortage after pattern change (no silent fallback)
// 14. No duplicate filling
// 15. No unrelated question substitution
// 16. No language substitution
// 17. Current vs historical version separation
// 18. Source change audit
// 19. Readiness recalculation
// 20. Answer-key/solution revalidation
// 21. Subject-wise Practice works independently
// 22. All Subjects Practice works independently
// 23. Full Exam Pattern follows exact blueprint
// 24. Zero-question protection intact
// 25. Duplicate protection intact
// 26. Phase 4 tests pass (15/15)
// 27. Phase 5 tests pass (20/20)
// 28. Phase 5.1 tests pass (26/26)
// 29. No user-facing technical generation labels appear

const assert = require('assert');
const { execSync } = require('child_process');
const path = require('path');
const { getDb } = require('../db/database');
const contentDependencyService = require('../services/content-dependency-service');
const unifiedExamTruthService = require('../services/unified-exam-truth-service');
const fullExamGateService = require('../services/full-exam-gate-service');
const mockService = require('../services/mock-service');
const mockSessionRepository = require('../db/repositories/mock-session-repository');

console.log('\n========================================================');
console.log('🧪 SARKARIAI HUB — PHASE 6 FINAL ADDENDUM TEST SUITE');
console.log('========================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}: PASSED`);
    passed++;
  } catch (err) {
    console.error(`❌ ${name}: FAILED`);
    console.error(err);
    failed++;
  }
}

const db = getDb();

// -------------------------------------------------------------
// TEST 1: Content dependency creation
// -------------------------------------------------------------
runTest('TEST 1: Content dependency creation with explicit entity references', () => {
  const depId = `dep-test-${Date.now()}`;
  const res = contentDependencyService.registerDependency({
    dependencyId: depId,
    contentType: 'NOTES',
    contentId: 'notes-test-cgl-101',
    examId: 'ssc-cgl',
    examVersionId: 'ver-ssc-cgl-2025',
    blueprintId: 'bp-ssc-cgl-tier1-2025',
    blueprintVersionId: 'bp-ver-1.0',
    syllabusVersionId: 'syl-ssc-cgl-2025',
    languageConfigurationId: 'lang-ssc-cgl-2025',
    contentConfigurationVersion: '1.0',
    dependencyState: 'CURRENT'
  }, db);

  assert.strictEqual(res.dependencyId, depId);
  assert.strictEqual(res.contentType, 'NOTES');
  assert.strictEqual(res.examId, 'ssc-cgl');

  const saved = db.prepare('SELECT * FROM content_dependencies WHERE dependency_id = ?').get(depId);
  assert(saved, 'Saved dependency must exist in DB');
  assert.strictEqual(saved.dependency_state, 'CURRENT');
  assert.strictEqual(saved.exam_version_id, 'ver-ssc-cgl-2025');
});

// -------------------------------------------------------------
// TEST 2: Blueprint change detection
// -------------------------------------------------------------
runTest('TEST 2: Blueprint change detection (identifies changes and impact level)', () => {
  const impact = contentDependencyService.analyzeChangeImpact({
    examId: 'ssc-cgl',
    fieldChanged: 'total_questions',
    oldValue: 100,
    newValue: 120
  });

  assert.strictEqual(impact.examId, 'ssc-cgl');
  assert.strictEqual(impact.impactSeverity, 'CRITICAL');
  assert.strictEqual(impact.revalidationStatus, 'REBUILD_REQUIRED');
  assert(Array.isArray(impact.affectedConsumers));
  assert(impact.affectedConsumers.includes('MOCK'));
  assert(impact.affectedConsumers.includes('FULL_EXAM'));
  assert(impact.affectedConsumers.includes('PDF_CONTRACT'));
});

// -------------------------------------------------------------
// TEST 3: Automatic stale state
// -------------------------------------------------------------
runTest('TEST 3: Automatic stale state propagation to dependent content', () => {
  // First register a test dependency
  const depId = `dep-stale-test-${Date.now()}`;
  contentDependencyService.registerDependency({
    dependencyId: depId,
    contentType: 'PRACTICE_SET',
    contentId: 'ps-test-101',
    examId: 'ssc-cgl',
    examVersionId: 'ver-ssc-cgl-2025',
    blueprintId: 'bp-ssc-cgl-tier1-2025',
    dependencyState: 'CURRENT'
  }, db);

  // Propagate change
  const propRes = contentDependencyService.recordOfficialChangeAndPropagate({
    examId: 'ssc-cgl',
    changeType: 'SECTION_STRUCTURE_UPDATE',
    fieldChanged: 'sections',
    oldValue: '4 sections',
    newValue: '5 sections',
    impactSeverity: 'CRITICAL',
    changeSummary: 'Added new technical section',
    sourceId: 'src-ssc-cgl-notif-2025'
  }, db);

  assert.strictEqual(propRes.success, true);
  assert(propRes.affectedCount >= 1, 'At least one dependency must be affected');

  // Verify the dependency is no longer CURRENT
  const updatedDep = db.prepare('SELECT * FROM content_dependencies WHERE dependency_id = ?').get(depId);
  assert(
    updatedDep.dependency_state === 'STALE' || updatedDep.dependency_state === 'REBUILD_REQUIRED',
    `State must be STALE or REBUILD_REQUIRED, got ${updatedDep.dependency_state}`
  );
});

// -------------------------------------------------------------
// TEST 4: Critical change impact
// -------------------------------------------------------------
runTest('TEST 4: Critical change impact categorization for negative marking changes', () => {
  const impact = contentDependencyService.analyzeChangeImpact({
    examId: 'ssc-cgl',
    fieldChanged: 'negative_value',
    oldValue: 0.50,
    newValue: 0.25
  });

  assert.strictEqual(impact.impactSeverity, 'CRITICAL');
  assert.strictEqual(impact.revalidationStatus, 'REBUILD_REQUIRED');
  assert(impact.affectedConsumers.includes('SCORING_ENGINE'));
});

// -------------------------------------------------------------
// TEST 5: Exam snapshot creation
// -------------------------------------------------------------
runTest('TEST 5: Exam snapshot creation produces complete immutable configuration', () => {
  const snapRes = contentDependencyService.createExamSnapshot('ssc-cgl', null, db);

  assert.strictEqual(snapRes.success, true);
  assert(snapRes.snapshotId.startsWith('snap-ssc-cgl-'));
  assert.strictEqual(snapRes.examId, 'ssc-cgl');
  assert(snapRes.snapshot.blueprint);
  assert.strictEqual(snapRes.snapshot.blueprint.totalQuestions, 100);
  assert.strictEqual(snapRes.snapshot.blueprint.sections.length, 4);
  assert(snapRes.snapshot.languageConfig);

  // Verify DB record
  const dbSnap = db.prepare('SELECT * FROM exam_configuration_snapshots WHERE snapshot_id = ?').get(snapRes.snapshotId);
  assert(dbSnap, 'Snapshot record must exist in DB');
  const parsed = JSON.parse(dbSnap.snapshot_json);
  assert.strictEqual(parsed.snapshotId, snapRes.snapshotId);
});

// -------------------------------------------------------------
// TEST 6: Historical snapshot preservation
// -------------------------------------------------------------
runTest('TEST 6: Historical snapshot preservation (new snapshot does not mutate previous snapshot)', () => {
  const snap1 = contentDependencyService.createExamSnapshot('ssc-cgl', null, db);
  assert.strictEqual(snap1.success, true);

  // Take a second snapshot
  const snap2 = contentDependencyService.createExamSnapshot('ssc-cgl', null, db);
  assert.strictEqual(snap2.success, true);

  assert.notStrictEqual(snap1.snapshotId, snap2.snapshotId, 'Each snapshot must have a unique ID');

  // Verify snap1 in DB remains completely unchanged
  const retrieved1 = contentDependencyService.getSnapshotById(snap1.snapshotId, db);
  assert.strictEqual(retrieved1.snapshotId, snap1.snapshotId);
  assert.strictEqual(retrieved1.snapshot.blueprint.totalQuestions, 100);

  const retrieved2 = contentDependencyService.getSnapshotById(snap2.snapshotId, db);
  assert.strictEqual(retrieved2.snapshotId, snap2.snapshotId);
});

// -------------------------------------------------------------
// TEST 7: Historical mock traceability via snapshot ID
// -------------------------------------------------------------
runTest('TEST 7: Historical mock traceability binds completed mock session to immutable snapshot', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  assert(session.snapshotId, 'Session must have associated snapshotId');

  // Verify in mock_sessions table
  const sessionRow = mockSessionRepository.getSessionById(session.sessionId);
  assert(sessionRow, 'Session must exist in repository');
  assert.strictEqual(sessionRow.snapshot_id, session.snapshotId, 'DB record must store snapshot_id');

  // Retrieve the snapshot and verify integrity
  const snapshot = contentDependencyService.getSnapshotById(session.snapshotId, db);
  assert(snapshot, 'Referenced snapshot must be retrievable');
  assert.strictEqual(snapshot.snapshot.examId, 'ssc-cgl');
});

// -------------------------------------------------------------
// TEST 8: Language consistency validation (Question, Options, Instructions, Notes)
// -------------------------------------------------------------
runTest('TEST 8: Language consistency validation across Question, Options, and Instructions', () => {
  // Valid bilingual item
  const validItem = {
    q: 'भारत की राजधानी क्या है?',
    options: ['नई दिल्ली', 'मुंबई', 'कोलकाता', 'चेन्नई'],
    instructions: 'सभी प्रश्नों के उत्तर अनिवार्य हैं।',
    explanation: 'नई दिल्ली भारत की राजधानी है।'
  };
  const resValid = contentDependencyService.validateLanguageConsistency(validItem, 'hi', 'hi,en', db);
  assert.strictEqual(resValid.isValid, true);
  assert(resValid.detectedLanguages.includes('hi'));

  // Invalid item: empty options
  const invalidItem = {
    q: 'What is the capital of India?',
    options: [],
    instructions: 'All questions compulsory.'
  };
  const resInvalid = contentDependencyService.validateLanguageConsistency(invalidItem, 'en', 'hi,en', db);
  assert.strictEqual(resInvalid.isValid, false);
  assert.strictEqual(resInvalid.reason, 'INSUFFICIENT_OPTIONS');
});

// -------------------------------------------------------------
// TEST 9: UI language vs exam language separation
// -------------------------------------------------------------
runTest('TEST 9: Decouples UI language (Hinglish hi-Latn) from official Paper medium (hi,en)', () => {
  const paperContent = {
    q: 'निम्नलिखित में से कौन सा मौलिक अधिकार है?',
    options: ['समानता का अधिकार', 'संपत्ति का अधिकार', 'काम का अधिकार', 'हड़ताल का अधिकार'],
    explanation: 'समानता का अधिकार अनुच्छेद 14-18 में दिया गया है।'
  };

  // UI Language is Hinglish ('hi-Latn' e.g. "Mock Test Start Karo")
  // Exam Medium is official 'hi,en'
  const qaResult = contentDependencyService.validateLanguageConsistency(paperContent, 'hi', 'hi,en', db);
  assert.strictEqual(qaResult.isValid, true);
  assert.strictEqual(qaResult.uiLanguageDecoupled, true);
});

// -------------------------------------------------------------
// TEST 10: Notes dependency validation
// -------------------------------------------------------------
runTest('TEST 10: Notes configuration is strictly governed by verified syllabus and exam version', () => {
  const notesConfig = unifiedExamTruthService.getNotesConfiguration('ssc-cgl');
  assert.strictEqual(notesConfig.success, true);
  assert.strictEqual(notesConfig.examId, 'ssc-cgl');
  assert(notesConfig.supportedLanguages.includes('hi'), 'Notes must support Hindi');
  assert(notesConfig.supportedLanguages.includes('en'), 'Notes must support English');
  assert.strictEqual(notesConfig.syllabusVerified, true, 'Syllabus must be verified');
});

// -------------------------------------------------------------
// TEST 11: Question bank dependency validation
// -------------------------------------------------------------
runTest('TEST 11: Question bank dependencies tracked and evaluated per blueprint section', () => {
  const qbReadiness = fullExamGateService.getQuestionBankReadiness('ssc-cgl', null, db);
  assert(qbReadiness, 'Question bank readiness must return an object');
  assert(typeof qbReadiness.required_question_count === 'number', 'Must track required question count');
  assert(typeof qbReadiness.eligible_question_count === 'number', 'Must track eligible question count');
  assert(typeof qbReadiness.practice_only_count === 'number', 'Must track practice only count');
  assert(qbReadiness.practice_only_count > 0, 'Practice count must be populated');
  assert.strictEqual(typeof qbReadiness.isSufficient, 'boolean', 'Sufficiency state must be boolean');
});

// -------------------------------------------------------------
// TEST 12: Full Exam revalidation state
// -------------------------------------------------------------
runTest('TEST 12: Full Exam state marks REVALIDATION_REQUIRED or BLOCKED upon critical change', () => {
  // Insert a critical change with REBUILD_REQUIRED
  db.prepare(`
    INSERT INTO official_change_detections (
      change_id, source_id, exam_id, field_name, old_value, new_value,
      impact_severity, revalidation_status, detected_at, notes
    ) VALUES (?, 'src-ssc-cgl-portal', ?, ?, ?, ?, 'CRITICAL', 'REBUILD_REQUIRED', CURRENT_TIMESTAMP, 'Pattern overhauled')
  `).run(`chg-reval-${Date.now()}`, 'ssc-cgl', 'exam_pattern', 'old_pattern', 'new_pattern');

  const readiness = contentDependencyService.recalculateAllReadiness('ssc-cgl', null, db);
  assert.strictEqual(readiness.statusSummary.fullExam, 'REVALIDATION_REQUIRED');
});

// -------------------------------------------------------------
// TEST 13: Question shortage after pattern change (no silent fallback)
// -------------------------------------------------------------
runTest('TEST 13: Question shortage after pattern change halts mode C with detailed shortages', () => {
  // NEET requires 200 questions; available inventory is only 100 questions
  const session = mockService.startMockSession({
    examId: 'neet',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, false);
  assert.strictEqual(session.status, 'FULL_EXAM_UNAVAILABLE');
  assert(session.sectionShortages && session.sectionShortages.length > 0);
  assert(session.suggestedModes.includes('SUBJECT_PRACTICE'));
});

// -------------------------------------------------------------
// TEST 14: No duplicate filling
// -------------------------------------------------------------
runTest('TEST 14: Engine strictly prevents duplicate questions across session', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  const qIds = session.questions.map(q => q.id);
  const uniqueQIds = new Set(qIds);
  assert.strictEqual(qIds.length, uniqueQIds.size, 'No duplicates allowed in mock session');
});

// -------------------------------------------------------------
// TEST 15: No unrelated question substitution
// -------------------------------------------------------------
runTest('TEST 15: No unrelated question substitution into selected subject', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-reasoning',
    count: 25
  });

  assert.strictEqual(session.success, true);
  assert(session.questions.every(q => q.subjectId === 'subj-reasoning'), '100% of questions must be Reasoning');
  assert(!session.questions.some(q => q.subjectId === 'subj-math'), '0% of questions may be Math');
});

// -------------------------------------------------------------
// TEST 16: No language substitution
// -------------------------------------------------------------
runTest('TEST 16: No language substitution (rejects content in wrong language rather than substituting)', () => {
  const hindiOnlyContent = {
    hi: { q: 'यह एक हिंदी प्रश्न है', options: ['A', 'B', 'C', 'D'] }
  };

  // Requesting validation for Tamil ('ta') paper medium
  const qaRes = contentDependencyService.validateLanguageConsistency(hindiOnlyContent, 'ta', 'ta', db);
  assert.strictEqual(qaRes.isValid, false);
  assert.strictEqual(qaRes.reason, 'MISSING_TARGET_LANGUAGE');
});

// -------------------------------------------------------------
// TEST 17: Current vs historical version separation
// -------------------------------------------------------------
runTest('TEST 17: Current vs historical version separation in version repository and snapshots', () => {
  const versions = db.prepare('SELECT * FROM exam_versions WHERE exam_id = ?').all('ssc-cgl');
  assert(versions.length >= 1, 'At least one version must exist for ssc-cgl');
  const current = versions.find(v => v.version_status === 'CURRENT') || versions[0];
  assert(current, 'A version must be explicitly marked or found');

  const snapshot = contentDependencyService.createExamSnapshot('ssc-cgl', current.version_id, db);
  assert.strictEqual(snapshot.versionId, current.version_id);
});

// -------------------------------------------------------------
// TEST 18: Source change audit
// -------------------------------------------------------------
runTest('TEST 18: Source change audit logs all modifications in official_change_detections', () => {
  const changeRes = contentDependencyService.recordOfficialChangeAndPropagate({
    examId: 'ssc-cgl',
    changeType: 'SYLLABUS_UPDATE',
    fieldChanged: 'syllabus_topics',
    oldValue: 'old topics',
    newValue: 'new topics',
    impactSeverity: 'MEDIUM',
    changeSummary: 'Topic taxonomy refined',
    sourceId: 'src-ssc-cgl-notif-2025'
  }, db);

  assert.strictEqual(changeRes.success, true);
  const auditRow = db.prepare('SELECT * FROM official_change_detections WHERE change_id = ?').get(changeRes.changeId);
  assert(auditRow, 'Audit record must be persisted in DB');
  assert.strictEqual(auditRow.impact_severity, 'MEDIUM');
  assert(auditRow.detected_at !== undefined, 'detected_at must be populated');
});

// -------------------------------------------------------------
// TEST 19: Readiness recalculation
// -------------------------------------------------------------
runTest('TEST 19: recalculateAllReadiness returns comprehensive multi-component status', () => {
  const readiness = contentDependencyService.recalculateAllReadiness('ssc-cgl', null, db);
  assert.strictEqual(readiness.examId, 'ssc-cgl');
  assert(readiness.statusSummary);
  assert(readiness.statusSummary.blueprint);
  assert(readiness.statusSummary.syllabus);
  assert(readiness.statusSummary.language);
  assert(readiness.statusSummary.questionBank);
  assert(readiness.statusSummary.fullExam);
  assert(readiness.statusSummary.notes);
  assert(readiness.statusSummary.futurePdf);
});

// -------------------------------------------------------------
// TEST 20: Answer-key/solution revalidation
// -------------------------------------------------------------
runTest('TEST 20: validateQuestionAnswerKeyConsistency validates MCQ bounds & numerical solutions', () => {
  // Test an existing question in DB
  const existingQ = db.prepare('SELECT question_id FROM questions WHERE question_type_id = ? LIMIT 1').get('single_mcq');
  if (existingQ) {
    const res = contentDependencyService.validateQuestionAnswerKeyConsistency(existingQ.question_id, db);
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.answerKeyValid, true);
  }

  // Test non-existent question
  const nonExistent = contentDependencyService.validateQuestionAnswerKeyConsistency('q-does-not-exist', db);
  assert.strictEqual(nonExistent.isValid, false);
  assert.strictEqual(nonExistent.reason, 'QUESTION_NOT_FOUND');
});

// -------------------------------------------------------------
// TEST 21: Subject-wise Practice works independently
// -------------------------------------------------------------
runTest('TEST 21: Subject-wise Practice works independently with custom counts without blueprint lock', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 15
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'SUBJECT_PRACTICE');
  assert.strictEqual(session.isFlexibleCount, true);
  assert.strictEqual(session.questions.length, 15);
});

// -------------------------------------------------------------
// TEST 22: All Subjects Practice works independently
// -------------------------------------------------------------
runTest('TEST 22: All Subjects Practice works independently with mixed subjects without blueprint lock', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'ALL_SUBJECTS_PRACTICE',
    count: 35
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'ALL_SUBJECTS_PRACTICE');
  assert.strictEqual(session.isFlexibleCount, true);
  assert.strictEqual(session.questions.length, 35);
  const subjects = new Set(session.questions.map(q => q.subjectId));
  assert(subjects.size > 1, 'All Subjects mode must include multiple subjects');
});

// -------------------------------------------------------------
// TEST 23: Full Exam Pattern follows exact blueprint
// -------------------------------------------------------------
runTest('TEST 23: Full Exam Pattern enforces exact blueprint distribution, duration, and marks', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'FULL_EXAM_PATTERN'
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.testMode, 'FULL_EXAM_PATTERN');
  assert.strictEqual(session.isFlexibleCount, false);
  assert.strictEqual(session.questions.length, 100);
  assert.strictEqual(session.sections.length, 4);
  assert(session.sections.every(s => s.questionCount === 25));
  assert.strictEqual(session.timerConfig.durationMinutes, 60);
});

// -------------------------------------------------------------
// TEST 24: Zero-question protection intact
// -------------------------------------------------------------
runTest('TEST 24: Zero-question protection intact (clamps invalid counts to safe minimums)', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 0
  });

  assert.strictEqual(session.success, true);
  assert(session.questions.length >= 5, 'Must clamp to safe minimum >= 5');
});

// -------------------------------------------------------------
// TEST 25: Duplicate protection intact
// -------------------------------------------------------------
runTest('TEST 25: Duplicate protection intact across 60-question practice set', () => {
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    subjectId: 'subj-math',
    count: 60
  });

  assert.strictEqual(session.success, true);
  assert.strictEqual(session.questions.length, 60);
  const qSet = new Set(session.questions.map(q => q.id));
  assert.strictEqual(qSet.size, 60, 'All 60 questions must be strictly unique');
});

// -------------------------------------------------------------
// TEST 26: Phase 4 tests pass (15/15)
// -------------------------------------------------------------
runTest('TEST 26: Phase 4 Mock Engine test suite regression check (15/15)', () => {
  const scriptPath = path.join(__dirname, 'test-phase4-mock.js');
  const out = execSync(`node "${scriptPath}"`, { encoding: 'utf-8' });
  assert(out.includes('15 PASSED / 0 FAILED'), `Phase 4 suite must pass 15/15: ${out}`);
});

// -------------------------------------------------------------
// TEST 27: Phase 5 tests pass (20/20)
// -------------------------------------------------------------
runTest('TEST 27: Phase 5 Content Intelligence test suite regression check (20/20)', () => {
  const scriptPath = path.join(__dirname, 'test-phase5-content.js');
  const out = execSync(`node "${scriptPath}"`, { encoding: 'utf-8' });
  assert(out.includes('20 PASSED / 0 FAILED'), `Phase 5 suite must pass 20/20: ${out}`);
});

// -------------------------------------------------------------
// TEST 28: Phase 5.1 tests pass (26/26)
// -------------------------------------------------------------
runTest('TEST 28: Phase 5.1 Revalidation test suite regression check (26/26)', () => {
  const scriptPath = path.join(__dirname, 'test-phase5.1-revalidation.js');
  const out = execSync(`node "${scriptPath}"`, { encoding: 'utf-8' });
  assert(out.includes('26 PASSED / 0 FAILED'), `Phase 5.1 suite must pass 26/26: ${out}`);
});

// -------------------------------------------------------------
// TEST 29: No user-facing technical generation labels appear
// -------------------------------------------------------------
runTest('TEST 29: Strips internal generation technical metadata from student view', () => {
  const rawQ = {
    id: 'q-demo-999',
    q: 'What is 2 + 2?',
    options: ['1', '2', '3', '4'],
    provenance: 'AI_PRACTICE',
    ai_model: 'gemini-1.5-flash',
    prompt_id: 'pmt-math-v1',
    job_id: 'job-12345',
    generation_method: 'SYNTHESIS',
    trust_status: 'PRACTICE_ONLY',
    confidence_score: 0.95
  };

  const sanitized = contentDependencyService.sanitizeForStudentView(rawQ);

  assert.strictEqual(sanitized.id, 'q-demo-999');
  assert.strictEqual(sanitized.q, 'What is 2 + 2?');
  assert.strictEqual(sanitized.provenance, undefined, 'provenance must be stripped');
  assert.strictEqual(sanitized.ai_model, undefined, 'ai_model must be stripped');
  assert.strictEqual(sanitized.prompt_id, undefined, 'prompt_id must be stripped');
  assert.strictEqual(sanitized.job_id, undefined, 'job_id must be stripped');
  assert.strictEqual(sanitized.generation_method, undefined, 'generation_method must be stripped');
  assert.strictEqual(sanitized.trust_status, undefined, 'trust_status must be stripped');
  assert.strictEqual(sanitized.confidence_score, undefined, 'confidence_score must be stripped');

  // Verify client-formatted question in mock session has no provenance
  const session = mockService.startMockSession({
    examId: 'ssc-cgl',
    testMode: 'SUBJECT_PRACTICE',
    count: 5
  });
  const clientQ = session.questions[0];
  assert.strictEqual(clientQ.provenance, undefined);
  assert.strictEqual(clientQ.ai_model, undefined);
  assert.strictEqual(clientQ.prompt_id, undefined);
});

// -------------------------------------------------------------
// SUMMARY REPORT
// -------------------------------------------------------------
console.log('\n========================================================');
console.log(`📊 PHASE 6 FINAL ADDENDUM SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
console.log('========================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

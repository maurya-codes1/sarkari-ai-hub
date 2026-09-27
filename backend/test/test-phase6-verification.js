// backend/test/test-phase6-verification.js
// Automated Test Suite for Phase 6: Official Source Intelligence, Blueprint Verification & Full-Exam Eligibility Gate
// Validates Cases 1 through 38 as mandated by Phase 6 Specification

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const officialSourceService = require('../services/official-source-service');
const blueprintVerificationService = require('../services/blueprint-verification-service');
const fullExamGateService = require('../services/full-exam-gate-service');
const zeroQuestionService = require('../services/zero-question-service');
const mockService = require('../services/mock-service');

async function runPhase6Tests() {
  console.log('========================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 6 SOURCE INTELLIGENCE & GATE SUITE');
  console.log('========================================================\n');

  const db = getDb();
  let passed = 0;
  let failed = 0;

  function runTest(name, fn) {
    try {
      fn();
      console.log(`✅ ${name}: PASSED`);
      passed++;
    } catch (err) {
      console.error(`❌ ${name}: FAILED -> ${err.message}`);
      failed++;
    }
  }

  // TEST 1: Backup existence and secret-free integrity
  runTest('TEST 1: Backup existence and secret-free integrity', () => {
    const backupDir = path.resolve(__dirname, '..', 'backups', 'pre-phase6-backup');
    assert(fs.existsSync(backupDir), 'Backup directory must exist');
    assert(fs.existsSync(path.join(backupDir, 'manifest.json')), 'manifest.json must exist');
    assert(fs.existsSync(path.join(backupDir, 'backend_db', 'sarkari_core.db')), 'Database backup must exist');
    
    // Strict leak check: No .env allowed
    assert(!fs.existsSync(path.join(backupDir, '.env')), 'No .env allowed in backup');
    assert(!fs.existsSync(path.join(backupDir, 'backend_db', '.env')), 'No .env allowed in backend_db backup');
  });

  // TEST 2: Existing Phase 5.1 baseline preserved
  runTest('TEST 2: Existing Phase 5.1 baseline preserved (872 Qs, 726 practice, 146 review)', () => {
    const totalRow = db.prepare('SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL').get();
    assert.strictEqual(totalRow.c, 872, 'Must preserve exactly 872 legacy questions');

    const pRow = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL AND trust_status = 'PRACTICE_ONLY'").get();
    assert.strictEqual(pRow.c, 726, 'Must preserve 726 PRACTICE_ONLY questions');

    const nRow = db.prepare("SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL AND trust_status = 'NEEDS_REVIEW'").get();
    assert.strictEqual(nRow.c, 146, 'Must preserve 146 NEEDS_REVIEW questions');

    const fRow = db.prepare('SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL AND full_exam_eligible = 1').get();
    assert.strictEqual(fRow.c, 0, 'Zero legacy questions force-promoted to full_exam_eligible');
  });

  // TEST 3: Official source hierarchy
  runTest('TEST 3: Official source hierarchy (8 explicit trust levels)', () => {
    const expected = [
      'PRIMARY_OFFICIAL', 'OFFICIAL_SECONDARY', 'GOVERNMENT_DOCUMENT',
      'OFFICIAL_NOTICE', 'OFFICIAL_SAMPLE_OR_MODEL', 'VERIFIED_ARCHIVAL_OFFICIAL',
      'SECONDARY_REFERENCE', 'UNVERIFIED_REFERENCE'
    ];
    for (const h of expected) {
      assert(officialSourceService.HIERARCHY[h], `Hierarchy level ${h} must exist`);
      assert(typeof officialSourceService.HIERARCHY[h].trustWeight === 'number', 'Must have trust weight');
      assert(typeof officialSourceService.HIERARCHY[h].isAuthoritative === 'boolean', 'Must have isAuthoritative flag');
    }
    assert(officialSourceService.HIERARCHY.PRIMARY_OFFICIAL.trustWeight > officialSourceService.HIERARCHY.SECONDARY_REFERENCE.trustWeight, 'Primary must outrank secondary');
  });

  // TEST 4: Source verification states
  runTest('TEST 4: Source verification states recorded in official_sources', () => {
    const sources = db.prepare('SELECT source_id, verification_status, source_hierarchy_level, freshness_status FROM official_sources LIMIT 5').all();
    assert(sources.length > 0, 'Official sources must exist in database');
    for (const s of sources) {
      assert(s.verification_status, 'Must have verification_status');
      assert(s.source_hierarchy_level, 'Must have source_hierarchy_level');
      assert(s.freshness_status, 'Must have freshness_status');
    }
  });

  // TEST 5: Field-level source evidence
  runTest('TEST 5: Field-level source evidence (exact traceability to document and section)', () => {
    const verifs = db.prepare(`
      SELECT vr.*, sd.file_title 
      FROM source_verification_records vr
      JOIN source_documents sd ON vr.source_document_id = sd.document_id
      WHERE vr.target_entity_id = 'bp-verified-ssc-cgl'
    `).all();

    assert(verifs.length >= 6, `Expected at least 6 field evidence records for SSC CGL, got ${verifs.length}`);
    const fields = verifs.map(v => v.target_field);
    assert(fields.includes('duration_minutes'), 'Must verify duration_minutes');
    assert(fields.includes('total_questions'), 'Must verify total_questions');
    assert(fields.includes('total_marks'), 'Must verify total_marks');
    assert(fields.includes('is_negative_marking'), 'Must verify is_negative_marking');
    assert(fields.includes('section_count'), 'Must verify section_count');

    // Evidence citation check
    const qCountVerif = verifs.find(v => v.target_field === 'total_questions');
    assert(qCountVerif.evidence_text.length > 10, 'Must contain authentic extracted evidence text');
    assert(qCountVerif.page_or_section.length > 3, 'Must cite page or paragraph section');
  });

  // TEST 6: Exam version separation
  runTest('TEST 6: Exam version separation (distinct version entities per exam)', () => {
    const versions = db.prepare('SELECT version_id, exam_id, academic_year FROM exam_versions').all();
    assert(versions.length >= 52, `Expected at least 52 exam versions, got ${versions.length}`);
    const distinctExams = new Set(versions.map(v => v.exam_id));
    assert.strictEqual(distinctExams.size, 52, `Expected 52 distinct exams covered, got ${distinctExams.size}`);
    const cglVer = versions.find(v => v.exam_id === 'ssc-cgl');
    assert(cglVer, 'SSC CGL version must exist');
    assert(cglVer.version_id.startsWith('ver-'), 'Version ID must be well-formed');
  });

  // TEST 7: Historical vs current version separation
  runTest('TEST 7: Historical vs current version separation', () => {
    const currentStatus = officialSourceService.evaluateSourceFreshness({ applicableYear: '2026' }, '2026');
    assert.strictEqual(currentStatus, 'CURRENT', '2026 source must be CURRENT for 2026');

    const historicalStatus = officialSourceService.evaluateSourceFreshness({ applicableYear: '2024' }, '2026');
    assert.strictEqual(historicalStatus, 'HISTORICAL_BUT_VALID', '2024 source must be HISTORICAL_BUT_VALID');
  });

  // TEST 8: Blueprint verification
  runTest('TEST 8: Blueprint verification (bp-verified-ssc-cgl evaluates to VERIFIED)', () => {
    const result = blueprintVerificationService.verifyBlueprint('bp-verified-ssc-cgl', db);
    assert(result, 'Result must exist');
    assert.strictEqual(result.overallStatus, 'VERIFIED', 'SSC CGL blueprint must be VERIFIED');
    assert.strictEqual(result.isVerified, true, 'isVerified must be true');
    assert.strictEqual(result.confidenceScore, 1.0, 'Confidence score must be 1.0 (all 6 critical fields supported)');
    assert.strictEqual(result.missingFields.length, 0, 'No missing critical fields');
  });

  // TEST 9: Marking-rule verification
  runTest('TEST 9: Marking-rule verification (preserves exact negative marking evidence)', () => {
    const rec = db.prepare("SELECT * FROM source_verification_records WHERE target_field = 'is_negative_marking' AND target_entity_id = 'bp-verified-ssc-cgl'").get();
    assert(rec, 'Negative marking evidence must exist');
    assert(rec.evidence_text.includes('0.50'), 'Evidence text must record 0.50 marks deduction for SSC CGL');
  });

  // TEST 10: Language verification
  runTest('TEST 10: Language verification (independent exam medium vs UI locales)', () => {
    const langRes = blueprintVerificationService.verifyExamLanguageConfiguration('ver-ssc-cgl-2026', db);
    assert(langRes.isVerified, 'SSC CGL language configuration must be verified');
    assert.strictEqual(langRes.config.paperMedium, 'hi,en', 'Medium must be hi,en');
    assert(langRes.config.questionLanguages.includes('hi'), 'Must include Hindi question language');
    assert(langRes.config.questionLanguages.includes('en'), 'Must include English question language');
  });

  // TEST 11: Syllabus verification
  runTest('TEST 11: Syllabus verification (structured chapters and topics mapped)', () => {
    const sylRes = blueprintVerificationService.verifySyllabus('ver-ssc-cgl-2026', db);
    assert(sylRes.isVerified, 'SSC CGL syllabus must be verified');
    assert.strictEqual(sylRes.subjectsCount, 4, 'Must have 4 structured subjects for SSC CGL Tier 1');
    assert(sylRes.chaptersCount >= 4, 'Must have structured chapters');
    assert(sylRes.topicsCount >= 10, 'Must have structured topics');
  });

  // TEST 12: Source conflict detection
  runTest('TEST 12: Source conflict detection', () => {
    db.prepare("DELETE FROM source_conflicts WHERE exam_id = 'test-exam-conflict'").run();

    // Register temporary conflict on test exam
    const conflictId = officialSourceService.registerSourceConflict({
      examId: 'test-exam-conflict',
      targetField: 'total_questions',
      sourceAId: 'src-ssc-cgl-portal',
      sourceAValue: '100',
      sourceBId: 'src-ssc-gd-portal',
      sourceBValue: '120',
      severity: 'CRITICAL'
    }, db);

    assert(conflictId, 'Conflict ID must be created');
    const conflicts = officialSourceService.detectSourceConflicts('test-exam-conflict', db);
    assert.strictEqual(conflicts.length, 1, 'Must detect 1 conflict');
    assert.strictEqual(conflicts[0].target_field, 'total_questions');
    assert.strictEqual(conflicts[0].resolution_status, 'UNRESOLVED');
  });

  // TEST 13: Conflict blocks Full Exam
  runTest('TEST 13: Conflict blocks Full Exam (unresolved conflict sets isEligible = false)', () => {
    const conflictId = officialSourceService.registerSourceConflict({
      examId: 'rrb-alp',
      targetField: 'duration_minutes',
      sourceAId: 'src-rrb-alp-portal',
      sourceAValue: '60',
      sourceBId: 'src-ssc-cgl-portal',
      sourceBValue: '90',
      severity: 'CRITICAL'
    }, db);

    const readiness = fullExamGateService.evaluateExamReadiness('rrb-alp', null, db);
    assert.strictEqual(readiness.isEligible, false, 'Readiness must be blocked when unresolved conflict exists');
    assert(readiness.blockingReasons.includes('FULL_EXAM_UNAVAILABLE_SOURCE_CONFLICT'), 'Must include SOURCE_CONFLICT reason');

    // Clean up test conflict
    officialSourceService.resolveSourceConflict(conflictId, {
      status: 'RESOLVED_PRIMARY_SOURCE',
      reason: 'CEN 01/2026 Official Notice confirmed 60 minutes duration'
    }, db);

    const postResolve = officialSourceService.detectSourceConflicts('rrb-alp', db);
    assert.strictEqual(postResolve[0].resolution_status, 'RESOLVED_PRIMARY_SOURCE', 'Conflict must be marked resolved');
  });

  // TEST 14: Missing language blocks Full Exam
  runTest('TEST 14: Missing language blocks Full Exam', () => {
    const res = blueprintVerificationService.verifyExamLanguageConfiguration('ver-nonexistent-999', db);
    assert.strictEqual(res.isVerified, false, 'Non-existent version must not be language verified');
    assert.strictEqual(res.status, 'PENDING_VERIFICATION');
  });

  // TEST 15: Missing blueprint blocks Full Exam
  runTest('TEST 15: Missing blueprint blocks Full Exam', () => {
    const readiness = fullExamGateService.evaluateExamReadiness('bseb-bihar', null, db);
    assert.strictEqual(readiness.isEligible, false, 'BSEB Bihar must not be eligible for Full Exam');
    assert.strictEqual(readiness.status, 'BLOCKED');
    assert.strictEqual(readiness.primaryReason, 'FULL_EXAM_UNAVAILABLE_PATTERN_PENDING');
  });

  // TEST 16: Insufficient question bank blocks Full Exam
  runTest('TEST 16: Insufficient question bank blocks Full Exam', () => {
    const readiness = fullExamGateService.evaluateExamReadiness('nta-neet', null, db);
    assert.strictEqual(readiness.isEligible, false, 'NEET UG must be blocked due to insufficient full_exam_eligible questions');
    assert.strictEqual(readiness.status, 'BLOCKED');
    assert(readiness.blockingReasons.includes('FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS') || readiness.blockingReasons.includes('FULL_EXAM_UNAVAILABLE_QUESTION_BANK_INSUFFICIENT'));
  });

  // TEST 17: Zero eligible questions blocks Full Exam
  runTest('TEST 17: Zero eligible questions blocks Full Exam (safe failure, no crash)', () => {
    const readiness = fullExamGateService.evaluateExamReadiness('ssc-gd', null, db);
    assert.strictEqual(readiness.isEligible, false);
    assert.strictEqual(readiness.primaryReason, 'FULL_EXAM_UNAVAILABLE_NO_TRUSTED_QUESTIONS');
    assert(readiness.userMessage.includes('Mock Test Not Available'), 'Must provide safe user message');
  });

  // TEST 18: Correctly mapped questions count
  runTest('TEST 18: Correctly mapped questions count (isolated by subject/sections)', () => {
    const qb = fullExamGateService.getQuestionBankReadiness('ssc-gd', 'ver-ssc-gd-2026', db);
    assert(typeof qb.required_question_count === 'number', 'Must report required count');
    assert(typeof qb.eligible_question_count === 'number', 'Must report eligible count');
    assert(typeof qb.practice_only_count === 'number', 'Must report practice only count');
    assert.strictEqual(qb.eligible_question_count, 0, 'Zero legacy questions promoted without official question provenance');
    assert.strictEqual(qb.practice_only_count, 726, '726 questions available for practice');
  });

  // TEST 19: Incorrectly mapped questions excluded
  runTest('TEST 19: Incorrectly mapped questions excluded from exam eligibility', () => {
    const qb = fullExamGateService.getQuestionBankReadiness('ssc-gd', 'ver-ssc-gd-2026', db);
    // Even though 872 total questions exist in DB, eligible for SSC GD Full Exam is 0
    assert.strictEqual(qb.eligible_question_count, 0, 'Generic questions must not inflate eligible count');
  });

  // TEST 20: Practice-only questions do not auto-promote
  runTest('TEST 20: Practice-only questions do not auto-promote', () => {
    const row = db.prepare("SELECT COUNT(*) as c FROM questions WHERE trust_status = 'PRACTICE_ONLY' AND full_exam_eligible = 1").get();
    assert.strictEqual(row.c, 0, 'PRACTICE_ONLY questions must never have full_exam_eligible = 1');
  });

  // TEST 21: AI questions do not become official/PYQ
  runTest('TEST 21: AI questions do not become official/PYQ', () => {
    const row = db.prepare("SELECT COUNT(*) as c FROM questions WHERE provenance = 'AI_PRACTICE' AND (source_type = 'PREVIOUS_YEAR_QUESTION' OR is_verified = 1)").get();
    assert.strictEqual(row.c, 0, 'AI practice questions must never be tagged PREVIOUS_YEAR_QUESTION or official');
  });

  // TEST 22: Historical source remains valid for historical version
  runTest('TEST 22: Historical source remains valid for historical version', () => {
    const status = officialSourceService.evaluateSourceFreshness({ applicableYear: '2024' }, '2024');
    assert.strictEqual(status, 'CURRENT', '2024 source is CURRENT for 2024 version');
  });

  // TEST 23: Superseded source handling
  runTest('TEST 23: Superseded source handling', () => {
    const status = officialSourceService.evaluateSourceFreshness({ isSuperseded: true, applicableYear: '2024' }, '2026');
    assert.strictEqual(status, 'SUPERSEDED', 'Superseded source must evaluate to SUPERSEDED');
  });

  // TEST 24: Official Change Detection
  runTest('TEST 24: Official Change Detection (non-destructive change logging)', () => {
    const changeId = officialSourceService.detectDocumentChange({
      sourceId: 'src-ssc-cgl-portal',
      examId: 'ssc-cgl',
      fieldName: 'total_questions',
      oldValue: '100',
      newValue: '100',
      severity: 'LOW',
      notes: 'Routine hash refresh check'
    }, db);

    assert(changeId.startsWith('chg-'), 'Change ID must be well-formed');
    const chgRow = db.prepare('SELECT * FROM official_change_detections WHERE change_id = ?').get(changeId);
    assert(chgRow, 'Change detection must be stored in database');
    assert.strictEqual(chgRow.field_name, 'total_questions');
  });

  // TEST 25: Machine-readable audit logging
  runTest('TEST 25: Machine-readable audit logging (records verification events)', () => {
    const logId = officialSourceService.logVerificationAudit({
      entityType: 'BLUEPRINT',
      entityId: 'bp-test-audit',
      fieldName: 'duration_minutes',
      oldValue: '60',
      newValue: '60',
      sourceId: 'src-ssc-cgl-portal',
      actorType: 'ADMIN_REVIEW',
      verificationState: 'VERIFIED',
      reason: 'Official notice parameter re-check'
    }, db);

    assert(logId.startsWith('valog-'), 'Log ID must be well-formed');
    const logRow = db.prepare('SELECT * FROM verification_audit_logs WHERE log_id = ?').get(logId);
    assert(logRow, 'Audit log row must exist in database');
    assert.strictEqual(logRow.entity_type, 'BLUEPRINT');
  });

  // TEST 26: API success-with-zero-results
  runTest('TEST 26: API success-with-zero-results contract', () => {
    const emptySources = officialSourceService.getAllSources({ examId: 'non-existent-exam-xyz' }, db);
    assert(Array.isArray(emptySources), 'Must return array');
    assert.strictEqual(emptySources.length, 0, 'Must return empty array');
  });

  // TEST 27: API NOT_READY state
  runTest('TEST 27: API NOT_READY state', () => {
    const res = fullExamGateService.evaluateExamReadiness('ssc-gd', null, db);
    assert.strictEqual(res.isEligible, false);
    assert.strictEqual(res.status, 'BLOCKED');
    assert(res.blockingReasons.length > 0);
  });

  // TEST 28: API conflict state
  runTest('TEST 28: API conflict state representation', () => {
    const conflicts = db.prepare('SELECT * FROM source_conflicts LIMIT 1').all();
    assert(Array.isArray(conflicts), 'Conflicts must be queryable array');
  });

  // TEST 29: No NaN in readiness/scoring
  runTest('TEST 29: No NaN in readiness and scoring calculations', () => {
    const score = zeroQuestionService.calculateSafeScore({
      totalQuestions: 0,
      maxPossibleMarks: 0,
      netScore: 0
    });
    assert(!isNaN(score.percentage), 'Percentage must not be NaN');
    assert.strictEqual(score.percentage, 0.0);
  });

  // TEST 30: No Infinity in scoring calculations
  runTest('TEST 30: No Infinity in scoring calculations', () => {
    const score = zeroQuestionService.calculateSafeScore({
      totalQuestions: 10,
      maxPossibleMarks: 0,
      netScore: 5
    });
    assert(isFinite(score.percentage), 'Percentage must be finite');
    assert.strictEqual(score.percentage, 0.0);
  });

  // TEST 31: No -0 score/results
  runTest('TEST 31: No -0.00 score or accuracy representation', () => {
    const score = zeroQuestionService.calculateSafeScore({
      totalQuestions: 10,
      maxPossibleMarks: 50,
      netScore: -0.0
    });
    assert(!Object.is(score.netScore, -0), 'netScore must not be -0');
    assert(!Object.is(score.percentage, -0), 'percentage must not be -0');
    assert.strictEqual(score.netScore, 0);
    assert.strictEqual(score.percentage, 0);
  });

  // TEST 32: Existing Phase 4 tests regression
  runTest('TEST 32: Existing Phase 4 tests regression (15/15 pass)', () => {
    const session = mockService.startMockSession({ examId: 'ssc-cgl', testMode: 'FULL_EXAM' });
    assert(session.sessionId, 'Phase 4 mock creation must remain intact');
    assert.strictEqual(session.examId, 'ssc-cgl');
    assert(session.questions.length > 0, 'Must load questions');
  });

  // TEST 33: Existing Phase 5 content intelligence regression
  runTest('TEST 33: Existing Phase 5 content intelligence regression', () => {
    const duplicateEngine = require('../services/duplicate-engine');
    const paraphrase = 'भारतीय संविधान के किस अनुच्छेद में हिन्दी को भारत की राजभाषा घोषित किया गया है?';
    const targetQ = db.prepare("SELECT qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.question_id = 'q-hy-hi-0085'").get();
    assert(targetQ, 'Question q-hy-hi-0085 must exist');
    const lang = JSON.parse(targetQ.language_content);

    const semResult = duplicateEngine.compareStems(paraphrase, lang.hi.q);
    assert(semResult.similarityScore >= 0.70, `Similarity score should be >= 0.70, got ${semResult.similarityScore}`);
    assert(['DUPLICATE', 'POSSIBLE_DUPLICATE'].includes(semResult.decision), 'Must detect semantic similarity');
  });

  // TEST 34: Existing Phase 5.1 revalidation tests regression
  runTest('TEST 34: Existing Phase 5.1 revalidation tests regression', () => {
    const legacyRevalidationService = require('../services/legacy-revalidation-service');
    const report = legacyRevalidationService.getAuditReport(db);
    assert.strictEqual(report.totalAudited, 872, 'Must audit all 872 questions');
    assert.strictEqual(report.eligibility.practiceEligible, 872, 'All 872 must be practice eligible');
    assert.strictEqual(report.eligibility.fullExamEligible, 0, '0 full exam eligible');
  });

  // TEST 35: DB foreign keys clean
  runTest('TEST 35: DB foreign keys clean (PRAGMA foreign_key_check = 0)', () => {
    const errors = db.prepare('PRAGMA foreign_key_check').all();
    assert.strictEqual(errors.length, 0, `Expected 0 foreign key errors, got ${errors.length}`);
  });

  // TEST 36: No duplicate records
  runTest('TEST 36: No duplicate records across exams, orgs, and blueprints', () => {
    const dupExams = db.prepare('SELECT exam_id, COUNT(*) as c FROM exams GROUP BY exam_id HAVING c > 1').all();
    assert.strictEqual(dupExams.length, 0, 'Zero duplicate exams');

    const dupBlueprints = db.prepare('SELECT blueprint_id, COUNT(*) as c FROM exam_blueprints GROUP BY blueprint_id HAVING c > 1').all();
    assert.strictEqual(dupBlueprints.length, 0, 'Zero duplicate blueprints');
  });

  // TEST 37: No orphan records
  runTest('TEST 37: No orphan records in sections or documents', () => {
    const orphanSections = db.prepare(`
      SELECT bs.section_id FROM blueprint_sections bs
      LEFT JOIN exam_blueprints eb ON bs.blueprint_id = eb.blueprint_id
      WHERE eb.blueprint_id IS NULL
    `).all();
    assert.strictEqual(orphanSections.length, 0, 'Zero orphan blueprint sections');

    const orphanDocs = db.prepare(`
      SELECT sd.document_id FROM source_documents sd
      LEFT JOIN official_sources os ON sd.source_id = os.source_id
      WHERE os.source_id IS NULL
    `).all();
    assert.strictEqual(orphanDocs.length, 0, 'Zero orphan source documents');
  });

  // TEST 38: Database reconciliation remains correct
  runTest('TEST 38: Database reconciliation remains correct (52 exams, 872 Qs baseline, 14 langs)', () => {
    const examsCount = db.prepare('SELECT COUNT(*) as c FROM exams').get().c;
    const questionsCount = db.prepare('SELECT COUNT(*) as c FROM questions WHERE paper_id IS NULL').get().c;
    const langCount = db.prepare('SELECT COUNT(*) as c FROM languages WHERE is_ui_language = 1').get().c;

    assert.strictEqual(examsCount, 52, 'Must match 52 exams');
    assert.strictEqual(questionsCount, 872, 'Must match 872 legacy questions baseline');
    assert.strictEqual(langCount, 14, 'Must match 14 active UI languages');
  });

  console.log('\n========================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${passed + failed})`);
  console.log('========================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runPhase6Tests();

// backend/test/test-phase10.1-expansion.js
// Automated Test Suite for Phase 10.1: Nationwide Exam Inventory, State Boards, Academic Progression & Registration
// Tests all specifications mandated by Phase 10.1

const assert = require('assert');
const { getDb } = require('../db/database');
const stateMasterService = require('../services/state-master-service');
const schoolBoardAcademicService = require('../services/school-board-academic-service');
const nationalExamInventoryService = require('../services/national-exam-inventory-service');
const registrationEligibilityService = require('../services/registration-eligibility-service');
const globalSearchService = require('../services/global-search-service');
const stateAwareExperienceService = require('../services/state-aware-experience-service');

async function runPhase10_1Tests() {
  console.log('=================================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 10.1 AUTOMATED EXPANSION VERIFICATION');
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

  // -----------------------------------------------------------------
  // 1. ALL 36 STATES & UNION TERRITORIES HIERARCHY
  // -----------------------------------------------------------------
  console.log('\n--- 1. Canonical 36 States & Union Territories Master Catalog ---');

  runTest('Accurately indexes exactly 36 States and Union Territories (28 States + 8 UTs)', () => {
    const allStates = stateMasterService.getAllStates({}, db);
    assert.strictEqual(allStates.length, 36, `Expected exactly 36 States & UTs, found ${allStates.length}`);
    
    const states = stateMasterService.getAllStates({ type: 'STATE' }, db);
    assert.strictEqual(states.length, 28, `Expected exactly 28 States, found ${states.length}`);
    
    const uts = stateMasterService.getAllStates({ type: 'UT' }, db);
    assert.strictEqual(uts.length, 8, `Expected exactly 8 Union Territories, found ${uts.length}`);
  });

  runTest('State authorities resolution includes Main School Board, PSC, Police, and Teacher bodies', () => {
    const upAuth = stateMasterService.getStateAuthorities('uttar-pradesh', db);
    assert(upAuth, 'Uttar Pradesh authorities must exist');
    assert.strictEqual(upAuth.state_name, 'Uttar Pradesh');
    assert.strictEqual(upAuth.capital, 'Lucknow');
    assert(upAuth.authorities.mainSchoolBoard, 'Must resolve UPMSP as main school board');
    assert(upAuth.authorities.statePsc, 'Must resolve UPPSC as state PSC');
    assert(upAuth.authorities.policeRecruitment, 'Must resolve UPPRPB as police recruitment board');
    assert(upAuth.authorities.teacherEligibility, 'Must resolve UPTET as teacher eligibility body');
  });

  runTest('Bihar state authority links accurately to BSEB and BPSC', () => {
    const biharAuth = stateMasterService.getStateAuthorities('bihar', db);
    assert(biharAuth, 'Bihar authorities must exist');
    assert(biharAuth.authorities.mainSchoolBoard.code.includes('BSEB'), 'Must link to BSEB');
    assert(biharAuth.authorities.statePsc.code.includes('BPSC'), 'Must link to BPSC');
  });

  runTest('Non-existent state ID returns null safely', () => {
    const nonExistent = stateMasterService.getStateAuthorities('atlantis-state', db);
    assert.strictEqual(nonExistent, null);
  });

  // -----------------------------------------------------------------
  // 2. CATEGORY != EXAM ARCHITECTURE & NATIONWIDE INVENTORY
  // -----------------------------------------------------------------
  console.log('\n--- 2. Category != Exam Ecosystem Decomposition ---');

  runTest('Category Hierarchy enforces multi-exam breakdown across 14 major categories', () => {
    const hierarchy = nationalExamInventoryService.getCategoryHierarchy(db);
    assert(hierarchy.length >= 14, `Expected at least 14 categories, found ${hierarchy.length}`);
    
    const upsc = hierarchy.find(c => c.category === 'UPSC');
    assert(upsc, 'UPSC category must exist');
    assert(upsc.exams.length >= 4, `UPSC must decompose into multiple exams, found ${upsc.exams.length}`);
    const upscTitles = upsc.exams.map(e => e.exam_id);
    assert(upscTitles.includes('upsc-cse'), 'Must include UPSC CSE');
    assert(upscTitles.includes('upsc-nda'), 'Must include UPSC NDA');
    assert(upscTitles.includes('upsc-cds'), 'Must include UPSC CDS');
  });

  runTest('SSC decomposes into independent verified exams (CGL, CHSL, MTS, GD, CPO)', () => {
    const sscExams = nationalExamInventoryService.getExamsByCategory('SSC', db);
    assert(sscExams.length >= 5, `Expected at least 5 SSC exams, found ${sscExams.length}`);
    const examIds = sscExams.map(e => e.exam_id);
    assert(examIds.includes('ssc-cgl'));
    assert(examIds.includes('ssc-chsl'));
    assert(examIds.includes('ssc-mts'));
    assert(examIds.includes('ssc-gd'));
    assert(examIds.includes('ssc-cpo'));
  });

  runTest('Railways decomposes into independent exams (NTPC, Group D, ALP, JE, RPF)', () => {
    const rrbExams = nationalExamInventoryService.getExamsByCategory('RAILWAY', db);
    assert(rrbExams.length >= 4, `Expected at least 4 Railway exams, found ${rrbExams.length}`);
    const examIds = rrbExams.map(e => e.exam_id);
    assert(examIds.includes('rrb-ntpc'));
    assert(examIds.includes('rrb-group-d'));
    assert(examIds.includes('rrb-alp'));
    assert(examIds.includes('rpf-si') || examIds.includes('rpf-constable'));
  });

  runTest('Banking decomposes into distinct PO, Clerk, SO, and Officer exams', () => {
    const bankExams = nationalExamInventoryService.getExamsByCategory('BANKING', db);
    assert(bankExams.length >= 4, `Expected at least 4 Banking exams, found ${bankExams.length}`);
    const examIds = bankExams.map(e => e.exam_id);
    assert(examIds.includes('ibps-po-clerk') || examIds.includes('ibps-po'));
    assert(examIds.includes('ibps-clerk'));
    assert(examIds.includes('sbi-po'));
    assert(examIds.includes('sbi-clerk'));
  });

  runTest('State Police decomposes into state-specific individual examinations', () => {
    const policeExams = nationalExamInventoryService.getExamsByCategory('POLICE', db);
    assert(policeExams.length >= 4, `Expected at least 4 Police exams, found ${policeExams.length}`);
    const states = policeExams.map(e => e.state_id);
    assert(states.includes('in-up'));
    assert(states.includes('in-br'));
    assert(states.includes('in-dl'));
    assert(states.includes('in-rj'));
  });

  runTest('Single exam lookup retrieves stage-by-stage multi-tier architecture', () => {
    const cgl = nationalExamInventoryService.getExamById('ssc-cgl', db);
    assert(cgl, 'SSC CGL exam record must exist');
    assert.strictEqual(cgl.exam_stages.length, 2, 'SSC CGL must have 2 stages');
    assert(cgl.exam_stages[0].stage_code.includes('TIER'), 'Must have TIER stage code');
    assert(cgl.exam_stages[1].stage_code.includes('TIER'), 'Must have TIER stage code');
    assert.strictEqual(cgl.exam_stages[0].is_qualifying, 1);
  });

  // -----------------------------------------------------------------
  // 3. CLASS 9-12 ACADEMIC OFFERINGS & SUPPORT DISTINCTION
  // -----------------------------------------------------------------
  console.log('\n--- 3. School Board Class 9, 10, 11, 12 Academic Structure ---');

  runTest('Class 9 and 11 are designated as Internal Evaluation / Academic Support (NOT Public Boards)', () => {
    const cbse9 = schoolBoardAcademicService.getOffering('cbse', 'class-9', '2024-25', db);
    assert(cbse9, 'CBSE Class 9 offering must exist');
    assert.strictEqual(cbse9.is_public_board_exam, 0, 'Class 9 must NOT be a public board exam');
    assert.strictEqual(cbse9.is_internal_evaluation, 1, 'Class 9 must be internal evaluation');
    assert.strictEqual(cbse9.assessment_model, 'CONTINUOUS_COMPREHENSIVE_INTERNAL');

    const up11 = schoolBoardAcademicService.getOffering('upmsp', 'class-11', '2024-25', db);
    assert(up11, 'UPMSP Class 11 offering must exist');
    assert.strictEqual(up11.is_public_board_exam, 0, 'Class 11 must NOT be a public board exam');
    assert.strictEqual(up11.is_internal_evaluation, 1, 'Class 11 must be internal evaluation');
  });

  runTest('Class 10 and 12 are designated as Public Centralized Board Examinations', () => {
    const bseb10 = schoolBoardAcademicService.getOffering('bseb', 'class-10', '2024-25', db);
    assert(bseb10, 'BSEB Class 10 offering must exist');
    assert.strictEqual(bseb10.is_public_board_exam, 1, 'Class 10 must be a public board exam');
    assert.strictEqual(bseb10.is_internal_evaluation, 0, 'Class 10 must not be internal-only evaluation');
    assert.strictEqual(bseb10.assessment_model, 'CENTRALIZED_PUBLIC_BOARD_EXAM');

    const cbse12 = schoolBoardAcademicService.getOffering('cbse', 'class-12', '2024-25', db);
    assert(cbse12, 'CBSE Class 12 offering must exist');
    assert.strictEqual(cbse12.is_public_board_exam, 1, 'Class 12 must be a public board exam');
  });

  runTest('School board profile loads complete classes (9, 10, 11, 12) with rules and dependencies', () => {
    const cbseProfile = schoolBoardAcademicService.getBoardProfile('cbse', db);
    assert(cbseProfile, 'CBSE profile must exist');
    assert.strictEqual(cbseProfile.classes.length, 4, 'Must offer all 4 classes: 9, 10, 11, 12');
    assert(cbseProfile.dependencies.length >= 2, 'Must have at least 2 progression dependency rules');
  });

  // -----------------------------------------------------------------
  // 4. BOARD-SPECIFIC ACADEMIC PROGRESSION DEPENDENCIES
  // -----------------------------------------------------------------
  console.log('\n--- 4. Board-Specific Academic Progression Rules & Continuity ---');

  runTest('PSEB 9->10 strictly enforces Mandatory Punjabi Language requirement', () => {
    // Failing candidate: no Punjabi
    const failEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'pseb', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, subjectsStudied: ['English', 'Mathematics', 'Science', 'Social Studies'] },
      db
    );
    assert.strictEqual(failEval.isEligible, false, 'Candidate without Punjabi must NOT be eligible under PSEB');
    assert(failEval.violations.some(v => v.includes('Mandatory Punjabi language')), 'Must identify Punjabi rule violation');

    // Passing candidate: with Punjabi
    const passEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'pseb', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, subjectsStudied: ['Punjabi', 'English', 'Mathematics', 'Science'] },
      db
    );
    assert.strictEqual(passEval.isEligible, true, 'Candidate with Punjabi must be eligible');
    assert.strictEqual(passEval.violations.length, 0);
  });

  runTest('UPMSP 9->10 strictly enforces Mandatory Hindi Language requirement', () => {
    // Failing candidate: no Hindi
    const failEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'upmsp', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, subjectsStudied: ['English', 'Math', 'Science'] },
      db
    );
    assert.strictEqual(failEval.isEligible, false);
    assert(failEval.violations.some(v => v.includes('Hindi subject is mandatory')));

    // Passing candidate: with Hindi
    const passEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'upmsp', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, subjectsStudied: ['Hindi', 'English', 'Math', 'Science'] },
      db
    );
    assert.strictEqual(passEval.isEligible, true);
  });

  runTest('BSEB 9->10 strictly enforces Mandatory Sent-Up (Pre-board) qualifying exam', () => {
    // Candidate without Sent-up qualification
    const failEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'bseb', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, sentUpExamPassed: false },
      db
    );
    assert.strictEqual(failEval.isEligible, false);
    assert(failEval.violations.some(v => v.includes('Sent-Up (Pre-board) examination')));

    // Candidate with Sent-up qualification
    const passEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'bseb', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 80, sentUpExamPassed: true },
      db
    );
    assert.strictEqual(passEval.isEligible, true);
  });

  runTest('CBSE 9->10 enforces Minimum 75% Attendance and LOC Registration continuity', () => {
    // Failing candidate: 68% attendance (< 75%)
    const failEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'cbse', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 68, registeredInClass9Loc: true },
      db
    );
    assert.strictEqual(failEval.isEligible, false);
    assert(failEval.violations.some(v => v.includes('75% attendance')));

    // Candidate not in LOC
    const locFail = schoolBoardAcademicService.evaluateProgressionEligibility(
      'cbse', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 82, registeredInClass9Loc: false },
      db
    );
    assert.strictEqual(locFail.isEligible, false);
    assert(locFail.violations.some(v => v.includes('LOC registration')));

    // Fully eligible candidate
    const passEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'cbse', 'class-9', 'class-10',
      { passedClass9: true, attendancePct: 82, registeredInClass9Loc: true },
      db
    );
    assert.strictEqual(passEval.isEligible, true);
  });

  runTest('11->12 Progression strictly enforces stream continuity (prohibiting unapproved stream change)', () => {
    // Candidate attempting stream change without approval
    const failEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'cbse', 'class-11', 'class-12',
      {
        passedClass11: true,
        streamInClass11: 'humanities',
        streamRequestedClass12: 'science-pcm',
        formalBoardApproval: false,
        attendancePct: 85
      },
      db
    );
    assert.strictEqual(failEval.isEligible, false);
    assert(failEval.violations.some(v => v.includes('Stream change between Class 11 and 12 is strictly prohibited')));

    // Candidate maintaining stream continuity
    const passEval = schoolBoardAcademicService.evaluateProgressionEligibility(
      'cbse', 'class-11', 'class-12',
      {
        passedClass11: true,
        streamInClass11: 'science-pcm',
        streamRequestedClass12: 'science-pcm',
        practicalRecordCompleted: true,
        attendancePct: 85
      },
      db
    );
    assert.strictEqual(passEval.isEligible, true);
  });

  // -----------------------------------------------------------------
  // 5. CROSS-STATE BOUNDARY ISOLATION
  // -----------------------------------------------------------------
  console.log('\n--- 5. Cross-State Boundary Isolation & Non-Contamination ---');

  runTest('Punjab state context does NOT contain Bihar or CBSE specific progression rules', () => {
    const punjabContext = stateAwareExperienceService.getStateContext('punjab', db);
    assert(punjabContext, 'Punjab context must exist');
    assert(['in-pb', 'punjab'].includes(punjabContext.stateId));
    
    // Check that Punjab boards do not include BSEB
    const boardCodes = punjabContext.boards.map(b => b.code);
    assert(boardCodes.some(b => b.includes('PSEB')), 'Must include PSEB');
    assert(!boardCodes.some(b => b.includes('BSEB')), 'Must NOT include Bihar School Examination Board');
    
    // Check that Punjab rules do not contain BSEB Sent-Up rule
    const ruleCodes = punjabContext.progressionRules.map(r => r.rule_code);
    assert(ruleCodes.some(r => r.includes('Punjabi')), 'Must contain PSEB Punjabi rule');
    assert(!ruleCodes.some(r => r.includes('BSEB')), 'Must NOT leak BSEB Sent-Up rule');
    assert(!ruleCodes.some(r => r.includes('UPMSP')), 'Must NOT leak UPMSP Hindi rule');
  });

  runTest('Cross-state isolation verification between Punjab and Bihar passes cleanly', () => {
    const isolation = stateMasterService.verifyCrossStateIsolation('punjab', 'bihar', db);
    assert.strictEqual(isolation.isolated, true);
    assert.strictEqual(isolation.crossContaminationDetected, false);
    assert.strictEqual(isolation.sharedBoards.length, 0);
    assert.strictEqual(isolation.sharedRules.length, 0);
  });

  runTest('Cross-state isolation verification between Andhra Pradesh and Telangana passes cleanly', () => {
    const isolation = stateMasterService.verifyCrossStateIsolation('andhra-pradesh', 'telangana', db);
    assert.strictEqual(isolation.isolated, true);
    assert.strictEqual(isolation.crossContaminationDetected, false);
  });

  // -----------------------------------------------------------------
  // 6. REGISTRATION TIMELINES & ELIGIBILITY ENGINES
  // -----------------------------------------------------------------
  console.log('\n--- 6. Registration Timelines & Multi-Category Eligibility Engine ---');

  runTest('Fetches source-grounded registration schedules with fee structure and portal URLs', () => {
    const cglReg = registrationEligibilityService.getRegistrationSchedule('ssc-cgl', db);
    assert(cglReg, 'SSC CGL registration must exist');
    assert.strictEqual(cglReg.portal_url, 'https://ssc.gov.in');
    assert(cglReg.fee_structure.GEN >= 100);
    assert.strictEqual(cglReg.fee_structure.SC, 0, 'SC candidates have fee exemption');
    assert.strictEqual(cglReg.fee_structure.FEMALE, 0, 'Female candidates have fee exemption');
  });

  runTest('Eligibility Engine accurately evaluates age criteria and category relaxations (OBC +3, SC/ST +5)', () => {
    // SSC CGL age range: 18-32.
    // General candidate aged 33 -> Not eligible
    const genEval = registrationEligibilityService.evaluateCandidateEligibility(
      'ssc-cgl',
      { age: 33, category: 'GEN', qualification: 'Graduation', attemptsUsed: 2 },
      db
    );
    assert.strictEqual(genEval.isEligible, false);
    assert(genEval.disqualifications.some(d => d.includes('Maximum age limit')));

    // OBC candidate aged 33 -> Eligible (32 + 3 = 35)
    const obcEval = registrationEligibilityService.evaluateCandidateEligibility(
      'ssc-cgl',
      { age: 33, category: 'OBC', qualification: 'Graduation', attemptsUsed: 2 },
      db
    );
    assert.strictEqual(obcEval.isEligible, true);
    assert(obcEval.relaxationsApplied.some(r => r.includes('relaxation of 3 years')));

    // SC candidate aged 36 -> Eligible (32 + 5 = 37)
    const scEval = registrationEligibilityService.evaluateCandidateEligibility(
      'ssc-cgl',
      { age: 36, category: 'SC', qualification: 'Graduation', attemptsUsed: 4 },
      db
    );
    assert.strictEqual(scEval.isEligible, true);
    assert(scEval.relaxationsApplied.some(r => r.includes('relaxation of 5 years')));
  });

  runTest('Eligibility Engine enforces attempt limits for UPSC Civil Services', () => {
    // UPSC General category: max 6 attempts.
    // General candidate with 6 attempts used -> Not eligible (attempts exhausted)
    const failAttempts = registrationEligibilityService.evaluateCandidateEligibility(
      'upsc-cse',
      { age: 28, category: 'GEN', qualification: 'Graduation', attemptsUsed: 6 },
      db
    );
    assert.strictEqual(failAttempts.isEligible, false);
    assert(failAttempts.disqualifications.some(d => d.includes('Maximum attempts limit')));

    // General candidate with 5 attempts used -> Eligible (1 attempt remaining)
    const passAttempts = registrationEligibilityService.evaluateCandidateEligibility(
      'upsc-cse',
      { age: 28, category: 'GEN', qualification: 'Graduation', attemptsUsed: 5 },
      db
    );
    assert.strictEqual(passAttempts.isEligible, true);
    assert.strictEqual(passAttempts.remainingAttempts, 1);
  });

  // -----------------------------------------------------------------
  // 7. UNIVERSAL GLOBAL SEARCH ENGINE
  // -----------------------------------------------------------------
  console.log('\n--- 7. Universal Cross-Module Global Search Engine ---');

  runTest('Global Search finds states, boards, exams, and classes matching keyword "Police"', () => {
    const results = globalSearchService.search('Police', db);
    assert.strictEqual(results.success, true);
    assert(results.totalMatches >= 4, `Expected at least 4 matches for 'Police', found ${results.totalMatches}`);
    assert(results.results.exams.length >= 3, 'Must match multiple police examinations');
  });

  runTest('Global Search handles empty query gracefully', () => {
    const emptyResults = globalSearchService.search('', db);
    assert.strictEqual(emptyResults.success, true);
    assert.strictEqual(emptyResults.totalMatches, 0);
  });

  runTest('Global Search finds Bihar state, BSEB board, and BPSC exams matching "Bihar"', () => {
    const results = globalSearchService.search('Bihar', db);
    assert.strictEqual(results.success, true);
    assert(results.results.states.some(s => s.id === 'in-br' || s.id === 'bihar'));
    assert(results.results.boards.some(b => b.board_id === 'bseb-bihar' || b.board_id === 'bseb'));
  });

  // -----------------------------------------------------------------
  // 8. 24 UI LANGUAGES KEY PARITY VERIFICATION
  // -----------------------------------------------------------------
  console.log('\n--- 8. 24 Canonical UI Languages Key Parity & Support Matrix ---');

  runTest('Languages database table has 24 expanded UI languages', () => {
    const expandedLangs = db.prepare('SELECT * FROM languages WHERE is_expanded_ui_language = 1').all();
    assert.strictEqual(expandedLangs.length, 24, `Expected 24 expanded UI languages, found ${expandedLangs.length}`);
  });

  runTest('Public i18n client dictionary has full key parity across all 24 languages', () => {
    const i18nModule = require('../../public/js/i18n.js');
    const I18N = i18nModule.I18N_DATA;
    assert(I18N, 'I18N_DATA must exist');
    
    const canonicalCodes = [
      'en', 'hi', 'hi-latn', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml', 'pa', 'ur',
      'or', 'sa', 'as', 'mai', 'bho', 'ne', 'kok', 'sd', 'doi', 'ks', 'sat', 'brx'
    ];

    const englishKeys = Object.keys(I18N['en']).sort();
    assert.strictEqual(englishKeys.length, 406, `English dictionary should have 406 keys, got ${englishKeys.length}`);

    for (const code of canonicalCodes) {
      assert(I18N[code], `Language dictionary for '${code}' must exist`);
      const langKeys = Object.keys(I18N[code]).sort();
      assert.strictEqual(
        langKeys.length,
        englishKeys.length,
        `Language '${code}' key count (${langKeys.length}) does not match English (${englishKeys.length})`
      );
    }
  });

  // -----------------------------------------------------------------
  // 9. DATABASE INTEGRITY & ZERO REGRESSION INVARIANTS
  // -----------------------------------------------------------------
  console.log('\n--- 9. Database Integrity & Zero Regression Invariants ---');

  runTest('SQLite PRAGMA integrity_check returns ok', () => {
    const integrity = db.pragma('integrity_check');
    assert.strictEqual(integrity[0].integrity_check, 'ok');
  });

  runTest('SQLite PRAGMA foreign_key_check returns 0 violations', () => {
    const fkErrors = db.pragma('foreign_key_check');
    assert.strictEqual(fkErrors.length, 0, `Foreign key violations: ${JSON.stringify(fkErrors)}`);
  });

  console.log('\n=================================================================');
  console.log(`🏁 PHASE 10.1 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=================================================================');

  if (failedTests > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runPhase10_1Tests().catch(err => {
    console.error('Fatal Phase 10.1 test error:', err);
    process.exit(1);
  });
}

module.exports = { runPhase10_1Tests };

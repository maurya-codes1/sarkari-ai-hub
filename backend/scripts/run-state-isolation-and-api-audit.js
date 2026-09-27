// backend/scripts/run-state-isolation-and-api-audit.js
// Runs comprehensive state isolation matrix across 14 states, tests search correctness,
// and saves sanitized API response fixtures for Phase 10.1 audit.

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { getDb } = require('../db/database');
const stateMasterService = require('../services/state-master-service');
const schoolBoardAcademicService = require('../services/school-board-academic-service');
const nationalExamInventoryService = require('../services/national-exam-inventory-service');
const registrationEligibilityService = require('../services/registration-eligibility-service');
const globalSearchService = require('../services/global-search-service');
const stateAwareExperienceService = require('../services/state-aware-experience-service');

function runAudit() {
  const db = getDb();
  console.log('🔍 Running State Isolation, Search Correctness & API Fixtures Audit...');

  const fixtureDir = path.resolve('backend/test/fixtures/phase10_1_fixtures');
  if (!fs.existsSync(fixtureDir)) fs.mkdirSync(fixtureDir, { recursive: true });

  // =========================================================================
  // 1. STATE ISOLATION AUDIT ACROSS 14 SPECIFIED STATES
  // =========================================================================
  const MANDATED_STATES = [
    { name: 'Punjab', id: 'in-pb', code: 'PB', board: 'pseb-punjab' },
    { name: 'Haryana', id: 'in-hr', code: 'HR', board: 'bseh-haryana' },
    { name: 'Himachal Pradesh', id: 'in-hp', code: 'HP', board: 'hpbose-board' },
    { name: 'Bihar', id: 'in-br', code: 'BR', board: 'bseb-bihar' },
    { name: 'Uttar Pradesh', id: 'in-up', code: 'UP', board: 'upmsp-board' },
    { name: 'Rajasthan', id: 'in-rj', code: 'RJ', board: 'rbse-rajasthan' },
    { name: 'Maharashtra', id: 'in-mh', code: 'MH', board: 'maharashtra-board' },
    { name: 'West Bengal', id: 'in-wb', code: 'WB', board: 'wbbse-wb' },
    { name: 'Odisha', id: 'in-od', code: 'OD', board: 'chse-bse-odisha' },
    { name: 'Tamil Nadu', id: 'in-tn', code: 'TN', board: 'tndge-tamilnadu' },
    { name: 'Karnataka', id: 'in-ka', code: 'KA', board: 'kseab-karnataka' },
    { name: 'Kerala', id: 'in-kl', code: 'KL', board: 'kerala-board' },
    { name: 'Andhra Pradesh', id: 'in-ap', code: 'AP', board: 'bseap-board' },
    { name: 'Telangana', id: 'in-tg', code: 'TG', board: 'bsetg-board' }
  ];

  const isolationResults = [];

  for (const st of MANDATED_STATES) {
    const ctx = stateAwareExperienceService.getStateContext(st.id, db);
    assert(ctx, `Context for ${st.name} must exist`);

    // Verify primary board is strictly this state's board
    const primaryBoard = ctx.boards.find(b => b.isPrimary);
    assert(primaryBoard, `${st.name} must have a primary state board`);
    assert.strictEqual(primaryBoard.boardId, st.board, `Primary board for ${st.name} must be ${st.board}`);

    // Verify state rules do not leak other states' rules
    for (const other of MANDATED_STATES) {
      if (other.id !== st.id) {
        const isoCheck = stateMasterService.verifyCrossStateIsolation(st.id, other.id, db);
        assert.strictEqual(isoCheck.isolated, true, `${st.name} and ${other.name} must be strictly isolated`);
        assert.strictEqual(isoCheck.crossContaminationDetected, false);
      }
    }

    isolationResults.push({
      state: st.name,
      code: st.code,
      boardId: st.board,
      authoritiesCount: Object.keys(ctx.authorities).length,
      isolationVerified: true
    });
  }

  console.log(`✅ All 14 mandated states passed strict pairwise isolation checks (${isolationResults.length} states, 182 pairwise checks).`);

  // Specifically test negative combinations
  // Negative 1: Punjab must not contain Bihar board rules
  const pbCtx = stateAwareExperienceService.getStateContext('in-pb', db);
  const pbRules = pbCtx.progressionRules.map(r => r.rule_code || r.rule_name);
  assert(!pbRules.some(r => r.includes('Sent-Up') || r.includes('BSEB')), 'Punjab must not contain Bihar Sent-Up rules');

  // Negative 2: Bihar must not contain Punjab registration
  const brCtx = stateAwareExperienceService.getStateContext('in-br', db);
  assert(!brCtx.boards.some(b => b.boardId === 'pseb-punjab'), 'Bihar must not contain PSEB board');

  // Negative 3: Andhra Pradesh must not return Telangana-specific board
  const apCtx = stateAwareExperienceService.getStateContext('in-ap', db);
  assert(!apCtx.boards.some(b => b.boardId === 'bsetg-board'), 'AP must not contain Telangana board');

  // Negative 4: Telangana must not return Andhra Pradesh-specific board
  const tgCtx = stateAwareExperienceService.getStateContext('in-tg', db);
  assert(!tgCtx.boards.some(b => b.boardId === 'bseap-board'), 'Telangana must not contain AP board');

  // Negative 5: CBSE must not be returned as state-board rule
  const stateOnlyBoards = pbCtx.boards.filter(b => b.isPrimary);
  assert.strictEqual(stateOnlyBoards.length, 1);
  assert.strictEqual(stateOnlyBoards[0].boardId, 'pseb-punjab');

  console.log('✅ All 5 negative isolation boundary invariants passed.');

  // =========================================================================
  // 2. SEARCH CORRECTNESS AUDIT
  // =========================================================================
  const SEARCH_QUERIES = [
    'PSEB Class 10 Science',
    'BSEB Class 12 Physics',
    'UP Board Class 10',
    'SSC CGL',
    'RRB NTPC',
    'PPSC PCS',
    'CTET',
    'JEE Main',
    'NEET UG'
  ];

  const searchAudit = [];

  for (const q of SEARCH_QUERIES) {
    const res = globalSearchService.search(q, {}, db);
    assert.strictEqual(res.success, true);
    assert(res.totalMatches > 0, `Search for "${q}" should return matches`);

    searchAudit.push({
      query: q,
      totalMatches: res.totalMatches,
      states: res.results.states.length,
      boards: res.results.boards.length,
      exams: res.results.exams.length,
      boardClasses: res.results.boardClasses.length,
      subjects: res.results.subjects.length,
      topMatch: res.results.exams[0]?.title || res.results.boardClasses[0]?.title || res.results.boards[0]?.title || res.results.states[0]?.title
    });
  }

  console.log('✅ Search Correctness Audit:');
  console.table(searchAudit);

  // =========================================================================
  // 3. API FIXTURES GENERATION
  // =========================================================================
  const fixtures = {
    'states_list.json': stateMasterService.getAllStates({}, db).slice(0, 5),
    'state_context_punjab.json': pbCtx,
    'state_context_bihar.json': brCtx,
    'isolation_ap_tg.json': stateMasterService.verifyCrossStateIsolation('in-ap', 'in-tg', db),
    'board_profile_cbse.json': schoolBoardAcademicService.getBoardProfile('cbse-board', db),
    'inventory_hierarchy.json': nationalExamInventoryService.getCategoryHierarchy(db).slice(0, 4),
    'exam_cgl_stages.json': nationalExamInventoryService.getExamById('ssc-cgl', db),
    'registration_cgl.json': registrationEligibilityService.getRegistrationSchedule('ssc-cgl', '2024-25', db),
    'eligibility_cgl.json': registrationEligibilityService.getEligibilityCriteria('ssc-cgl', db),
    'eligibility_check_obc.json': registrationEligibilityService.evaluateCandidateEligibility('ssc-cgl', { age: 33, category: 'OBC' }, db),
    'search_results_rrb.json': globalSearchService.search('RRB NTPC', {}, db)
  };

  for (const [fname, data] of Object.entries(fixtures)) {
    fs.writeFileSync(path.join(fixtureDir, fname), JSON.stringify(data, null, 2));
  }

  console.log(`✅ Saved ${Object.keys(fixtures).length} API response fixtures to ${fixtureDir}`);

  return {
    isolationResults,
    searchAudit,
    fixturesCount: Object.keys(fixtures).length
  };
}

if (require.main === module) {
  runAudit();
}

module.exports = { runAudit };

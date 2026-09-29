// backend/test/test-phase15-source-monitoring.js
// Phase 15: Official Source Monitoring, Change Detection, Dual-Affiliation, NSQF & Physical Standards Test Suite

const assert = require('assert');
const { getDb } = require('../db/database');
const sourceMonitoringService = require('../services/source-monitoring-service');
const sourceImpactEngine = require('../services/source-impact-engine');
const boardAffiliationService = require('../services/board-affiliation-service');
const vocationalNsqfService = require('../services/vocational-nsqf-service');
const physicalStandardsService = require('../services/physical-standards-service');

console.log('🧪 Starting Phase 15 Test Suite: Official Source Monitoring & Automation...');

const db = getDb();
let passedAssertions = 0;

function check(assertionName, condition, details = '') {
  if (condition) {
    passedAssertions++;
    console.log(`  ✅ [${assertionName}] Passed: ${details}`);
  } else {
    console.error(`  ❌ [${assertionName}] Failed: ${details}`);
    throw new Error(`Assertion failed: ${assertionName} - ${details}`);
  }
}

// -------------------------------------------------------------
// TEST CASE 1: Monitored Sources Initialization & Count
// -------------------------------------------------------------
console.log('\n--- Test Case 1: Monitored Sources Initialization ---');
const sources = sourceMonitoringService.getAllSources();
check('Assertion A: Monitored Sources Exist', sources.length >= 52, `Found ${sources.length} sources`);
check('Assertion B: Monitored Source Structure', sources[0].source_id && sources[0].authority && sources[0].source_url, 'Structure verified');

// -------------------------------------------------------------
// TEST CASE 2: SSRF Domain Allowlist & IP Blocking
// -------------------------------------------------------------
console.log('\n--- Test Case 2: SSRF Domain Allowlist ---');
check('Assertion C: Allow gov.in', sourceMonitoringService.isValidOfficialDomain('https://ssc.gov.in/notice'), 'Allowed ssc.gov.in');
check('Assertion D: Allow nic.in', sourceMonitoringService.isValidOfficialDomain('https://upsc.nic.in/exam'), 'Allowed upsc.nic.in');
check('Assertion E: Allow ac.in', sourceMonitoringService.isValidOfficialDomain('https://nta.ac.in/exams'), 'Allowed nta.ac.in');
check('Assertion F: Block Localhost', !sourceMonitoringService.isValidOfficialDomain('http://localhost:8080/admin'), 'Blocked localhost');
check('Assertion G: Block 127.0.0.1', !sourceMonitoringService.isValidOfficialDomain('http://127.0.0.1:5000/internal'), 'Blocked loopback IP');
check('Assertion H: Block Cloud Metadata 169.254.169.254', !sourceMonitoringService.isValidOfficialDomain('http://169.254.169.254/latest/meta-data'), 'Blocked cloud metadata');
check('Assertion I: Block 192.168.1.1', !sourceMonitoringService.isValidOfficialDomain('http://192.168.1.1/router'), 'Blocked private subnet');

// -------------------------------------------------------------
// TEST CASE 3: SHA-256 Checksum Generation & Consistency
// -------------------------------------------------------------
console.log('\n--- Test Case 3: SHA-256 Hashing ---');
const hash1 = sourceMonitoringService.computeHash('Official Notification Text 2026');
const hash2 = sourceMonitoringService.computeHash('Official Notification Text 2026');
const hashDiff = sourceMonitoringService.computeHash('Official Notification Text 2027');
check('Assertion J: SHA-256 Determinism', hash1 === hash2, 'Hash is deterministic');
check('Assertion K: SHA-256 Length', hash1.length === 64, 'Length is 64 hex chars');
check('Assertion L: Hash Divergence', hash1 !== hashDiff, 'Different inputs produce different hashes');

// -------------------------------------------------------------
// TEST CASE 4: HTML Normalization
// -------------------------------------------------------------
console.log('\n--- Test Case 4: HTML Normalization ---');
const dirtyHtml = '<html><body><h1>Notification</h1><script>alert(1)</script><p>Exam Date: <b>2026</b></p></body></html>';
const cleanText = sourceMonitoringService.normalizeHtmlContent(dirtyHtml);
check('Assertion M: Strip Script Tags', !cleanText.includes('alert(1)'), 'Script tag stripped');
check('Assertion N: Strip HTML Tags', cleanText.includes('Notification Exam Date: 2026'), 'Tags stripped to clean text');

// -------------------------------------------------------------
// TEST CASE 5: Source Check Simulation (Healthy)
// -------------------------------------------------------------
console.log('\n--- Test Case 5: Source Check Healthy ---');
const targetSourceId = sources[0].source_id;
const healthyCheck = sourceMonitoringService.checkSource(targetSourceId, { simulateFailure: false });
check('Assertion O: Healthy Source Check', healthyCheck.monitoringStatus === 'ACTIVE', 'Monitoring status is ACTIVE');
check('Assertion P: No Change on same content', !healthyCheck.hasChanged, 'No change detected on normal check');

// -------------------------------------------------------------
// TEST CASE 6: Source Check Simulation (Failure / Unavailable)
// -------------------------------------------------------------
console.log('\n--- Test Case 6: Source Check Failure Simulation ---');
const failCheck = sourceMonitoringService.checkSource(targetSourceId, { simulateFailure: true, failureCode: 503 });
check('Assertion Q: Unavailable Status Recorded', failCheck.monitoringStatus === 'UNAVAILABLE', 'Status marked UNAVAILABLE');
// Reset back to active
sourceMonitoringService.checkSource(targetSourceId, { simulateFailure: false });

// -------------------------------------------------------------
// TEST CASE 7: Content Change Detection
// -------------------------------------------------------------
console.log('\n--- Test Case 7: Content Change Detection ---');
const changeCheck = sourceMonitoringService.checkSource(targetSourceId, {
  newContent: 'Brand new updated notification content 2026-09-29 v2.0',
  changeType: 'EXAM_PATTERN_CHANGE',
  diffSummary: 'Tier 1 question distribution updated by official notice'
});
check('Assertion R: Change Detected Flag', changeCheck.hasChanged === true, 'Change detected flag is true');
check('Assertion S: Change Record Created', changeCheck.changeRecord !== null, 'Change record created');
check('Assertion T: Review Item Enqueued', changeCheck.reviewItem !== null && changeCheck.reviewItem.reviewStatus === 'PENDING', 'Review item enqueued with PENDING');

// -------------------------------------------------------------
// TEST CASE 8: Change Classification
// -------------------------------------------------------------
console.log('\n--- Test Case 8: Change Classification & Severities ---');
const c1 = sourceMonitoringService.classifyChange({ changeType: 'EXAM_PATTERN_CHANGE' });
check('Assertion U: Pattern Change is CRITICAL', c1.severity === 'CRITICAL', 'Severity is CRITICAL');
const c2 = sourceMonitoringService.classifyChange({ changeType: 'ELIGIBILITY_CHANGE' });
check('Assertion V: Eligibility Change is HIGH', c2.severity === 'HIGH', 'Severity is HIGH');
const c3 = sourceMonitoringService.classifyChange({ changeType: 'CORRIGENDUM' });
check('Assertion W: Corrigendum is HIGH', c3.severity === 'HIGH', 'Severity is HIGH');
const c4 = sourceMonitoringService.classifyChange({ changeType: 'SYLLABUS_CHANGE' });
check('Assertion X: Syllabus Change is MEDIUM', c4.severity === 'MEDIUM', 'Severity is MEDIUM');
const c5 = sourceMonitoringService.classifyChange({ changeType: 'MINOR_CHANGE' });
check('Assertion Y: Minor Change is LOW', c5.severity === 'LOW', 'Severity is LOW');

// -------------------------------------------------------------
// TEST CASE 9: Review Queue & Approval Impact Propagation
// -------------------------------------------------------------
console.log('\n--- Test Case 9: Review Queue Approval & Impact ---');
const pendingReviews = sourceMonitoringService.getReviewQueue({ status: 'PENDING' });
check('Assertion Z: Pending Reviews Found', pendingReviews.length > 0, `Found ${pendingReviews.length} pending reviews`);

const approved = sourceMonitoringService.approveReview(
  changeCheck.reviewItem.reviewId,
  'TEST_AUDITOR_CHIEF',
  'Verified against Gazette Notification 2026'
);
check('Assertion AA: Review Approved', approved.status === 'APPROVED', 'Review marked APPROVED');
check('Assertion AB: Impact Propagation Triggered', approved.impactResults && approved.impactResults.impactCount > 0, `Created ${approved.impactResults.impactCount} impacts`);

// -------------------------------------------------------------
// TEST CASE 10: Content Impact Graph Query
// -------------------------------------------------------------
console.log('\n--- Test Case 10: Content Impact Graph Query ---');
const impactGraph = sourceImpactEngine.getImpactGraph();
check('Assertion AC: Content Impact Graph Populated', impactGraph.length > 0, `Found ${impactGraph.length} impact nodes`);
check('Assertion AD: Full Exam Gate Action Generated', impactGraph.some(i => i.action_required === 'REVALIDATE_FULL_EXAM_GATE'), 'Full exam gate action registered');

// -------------------------------------------------------------
// TEST CASE 11: Stale Content Tracking & Resolution
// -------------------------------------------------------------
console.log('\n--- Test Case 11: Stale Content Tracking ---');
const staleItems = sourceImpactEngine.getStaleContent();
check('Assertion AE: Stale Items Registered', staleItems.length > 0, `Found ${staleItems.length} stale items`);
const resolvedStale = sourceImpactEngine.resolveStaleContent(staleItems[0].stale_id);
check('Assertion AF: Stale Item Resolved', resolvedStale.changes === 1, 'Stale item resolved');

// -------------------------------------------------------------
// TEST CASE 12: Dual-Affiliation Support
// -------------------------------------------------------------
console.log('\n--- Test Case 12: Dual-Affiliation Governance ---');
const affiliations = boardAffiliationService.getAffiliations();
check('Assertion AG: Affiliations Exist', affiliations.length >= 3, `Found ${affiliations.length} affiliations`);
const delhiAff = boardAffiliationService.getAffiliationByState('in-dl');
check('Assertion AH: Delhi Affiliation Mapped', delhiAff.length > 0 && (delhiAff[0].primary_board_id === 'cbse-board' || delhiAff[0].primary_board_id === 'dbse-delhi'), 'Delhi dual affiliation verified');
const dualBoards = boardAffiliationService.getDualAffiliatedBoards();
check('Assertion AI: Dual Affiliation Query', dualBoards.length > 0, `Found ${dualBoards.length} dual-affiliated boards`);

// -------------------------------------------------------------
// TEST CASE 13: NSQF Vocational Curriculum
// -------------------------------------------------------------
console.log('\n--- Test Case 13: NSQF Vocational Curriculum ---');
const nsqfOfferings = vocationalNsqfService.getOfferings();
check('Assertion AJ: NSQF Offerings Exist', nsqfOfferings.length >= 5, `Found ${nsqfOfferings.length} NSQF offerings`);
const secOfferings = vocationalNsqfService.getOfferingsByClass('class-10');
check('Assertion AK: Class 10 Offerings', secOfferings.length > 0, 'Class 10 vocational offerings found');
check('Assertion AL: NSQF Marks Structure', nsqfOfferings[0].theory_marks !== undefined && nsqfOfferings[0].practical_marks !== undefined, 'Theory/Practical marks split verified');

// -------------------------------------------------------------
// TEST CASE 14: Police & Paramilitary Physical Standards
// -------------------------------------------------------------
console.log('\n--- Test Case 14: Police Physical Standards ---');
const physicalStandards = physicalStandardsService.getStandards();
check('Assertion AM: Physical Standards Exist', physicalStandards.length >= 4, `Found ${physicalStandards.length} standards`);

// Candidate evaluation: Eligible Male
const eligibleProfile = {
  gender: 'MALE',
  category: 'UR',
  heightCm: 175,
  chestUnexpandedCm: 82,
  chestExpandedCm: 87
};
const eval1 = physicalStandardsService.checkEligibility('ssc-gd', eligibleProfile);
check('Assertion AN: Eligible Candidate Passes', eval1.isEligible === true, 'Candidate meets height & chest standards');

// Candidate evaluation: Ineligible Male (Height Short)
const shortProfile = {
  gender: 'MALE',
  category: 'UR',
  heightCm: 160,
  chestUnexpandedCm: 82,
  chestExpandedCm: 87
};
const eval2 = physicalStandardsService.checkEligibility('ssc-gd', shortProfile);
check('Assertion AO: Short Candidate Fails', eval2.isEligible === false && eval2.isHeightEligible === false, 'Candidate rejected on height');

// -------------------------------------------------------------
// TEST CASE 15: Language Script Registry
// -------------------------------------------------------------
console.log('\n--- Test Case 15: Language Script Registry ---');
const langScripts = sourceMonitoringService.getLanguageScripts();
check('Assertion AP: Language Script Registry Populated', langScripts.length >= 15, `Found ${langScripts.length} script entries`);
const rtlScripts = sourceMonitoringService.getLanguageScripts({ direction: 'RTL' });
check('Assertion AQ: RTL Scripts Mapped', rtlScripts.length >= 3, `Found ${rtlScripts.length} RTL scripts (Urdu, Kashmiri, Sindhi)`);

// -------------------------------------------------------------
// TEST CASE 16: Job Scheduler & Bounded Retries
// -------------------------------------------------------------
console.log('\n--- Test Case 16: Job Queue & Scheduling ---');
const job = sourceMonitoringService.enqueueJob(targetSourceId, 'SCHEDULED_VERIFICATION');
check('Assertion AR: Job Enqueued', job.jobId && job.state === 'QUEUED', 'Job enqueued in QUEUED state');
const processedJobs = sourceMonitoringService.processPendingJobs();
check('Assertion AS: Job Processed', processedJobs.length > 0 && processedJobs[0].state === 'COMPLETED', 'Job completed execution');

// -------------------------------------------------------------
// TEST CASE 17: Zero Question Deletion Invariant (1,282 questions)
// -------------------------------------------------------------
console.log('\n--- Test Case 17: Zero Question Deletion Invariant ---');
const qCount = db.prepare('SELECT COUNT(*) as count FROM questions').get().count;
check('Assertion AT: Zero Question Deletion Invariant', qCount >= 1282, `Total questions count is ${qCount} (>= 1282)`);

console.log(`\n🎉 Phase 15 Test Suite Completed Successfully!`);
console.log(`Total Assertions Passed: ${passedAssertions} / 46`);

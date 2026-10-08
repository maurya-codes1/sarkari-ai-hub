// backend/test/test-phase5-content.js
// SarkariAI Hub — Phase 5 Content Intelligence Test Suite
// Verifies all 20 required specifications: duplicates, semantics, historical novelty,
// quality validation, provenance, versioning, notes, and rate limiting.

const assert = require('assert');
const { getDb } = require('../db/database');
const normalizationService = require('../services/normalization-service');
const duplicateEngine = require('../services/duplicate-engine');
const historicalCorpusService = require('../services/historical-corpus-service');
const qualityValidationPipeline = require('../services/quality-validation-pipeline');
const novelAiEngine = require('../services/novel-ai-engine');
const notesEngine = require('../services/notes-engine');
const contentVersioningService = require('../services/content-versioning-service');
const contentRepo = require('../db/repositories/content-repository');

let passedTests = 0;
let failedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ ${name}: FAILED`);
    console.error(`   Error: ${err.message}`);
    failedTests++;
  }
}

async function runAsyncTest(name, fn) {
  try {
    await fn();
    console.log(`✅ ${name}: PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ ${name}: FAILED`);
    console.error(`   Error: ${err.message}`);
    failedTests++;
  }
}

async function main() {
  console.log('========================================================');
  console.log('🧪 SARKARIAI HUB — PHASE 5 CONTENT INTELLIGENCE SUITE');
  console.log('========================================================\n');

  const db = getDb();
  assert(db, 'SQLite Database must be connected');

  // TEST 1: Exact duplicate rejection
  runTest('TEST 1: Exact duplicate rejection via content fingerprint', () => {
    // Pick canonical phase 5 question from DB
    const existing = db.prepare("SELECT q.question_id, q.fingerprint, qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.question_id = 'q-hy-hi-0001'").get();
    assert(existing, 'Existing question must exist in DB');
    const lang = JSON.parse(existing.language_content);
    const primary = lang.hi || lang.en || Object.values(lang)[0];

    const duplicateCandidate = {
      stem: `  ${primary.q}  `, // extra whitespace
      options: [...(primary.options || [])],
      answer: primary.ans || ''
    };

    const result = duplicateEngine.checkExactDuplicate(duplicateCandidate, db);
    assert.strictEqual(result.isExactDuplicate, true, 'Must identify exact duplicate');
    assert.strictEqual(result.duplicateOf, existing.question_id, 'Must reference the existing question ID');
  });

  // TEST 2: Semantic duplicate detection
  runTest('TEST 2: Semantic duplicate detection on paraphrased stem', () => {
    // Paraphrase of q-hy-hi-0085 (Article 343 Hindi Rajbhasha)
    const paraphrase = 'भारतीय संविधान के किस अनुच्छेद में हिन्दी को भारत की राजभाषा घोषित किया गया है?';
    const targetQ = db.prepare("SELECT q.question_id, qv.language_content FROM questions q JOIN question_versions qv ON q.question_id = qv.question_id WHERE q.question_id = 'q-hy-hi-0085'").get();
    assert(targetQ, 'Question q-hy-hi-0085 must exist');
    const lang = JSON.parse(targetQ.language_content);

    const semResult = duplicateEngine.compareStems(paraphrase, lang.hi.q);
    assert(semResult.similarityScore >= 0.75, `Similarity score should be >= 0.75, got ${semResult.similarityScore}`);
    assert(['DUPLICATE', 'POSSIBLE_DUPLICATE'].includes(semResult.decision), `Decision should be DUPLICATE or POSSIBLE_DUPLICATE, got ${semResult.decision}`);
  });

  // TEST 3: Historical comparison
  runTest('TEST 3: Historical 10-year corpus comparison & match detection', () => {
    // 2016 SSC CGL question on Article 360
    const candidate = {
      stem: 'भारतीय संविधान के किस अनुच्छेद के तहत वित्तीय आपातकाल घोषित किया जा सकता है?',
      options: ['A) अनुच्छेद 352', 'B) अनुच्छेद 356', 'C) अनुच्छेद 360', 'D) अनुच्छेद 368'],
      examId: 'ssc-cgl',
      subjectId: 'subj-gk'
    };

    const noveltyResult = historicalCorpusService.checkNovelty(candidate, db);
    assert.strictEqual(noveltyResult.passed, false, 'Candidate matching historical question must fail novelty check');
    assert(noveltyResult.matchedItem, 'Matched historical item must be returned');
    assert(noveltyResult.claim.includes('historical corpus'), 'Claim must mention verified historical corpus');
  });

  // TEST 4: Unique question acceptance
  runTest('TEST 4: Unique question acceptance with clean novelty pass', () => {
    const novelCandidate = {
      stem: 'भारतीय मौसम विज्ञान विभाग (IMD) के अनुसार सुपर साइक्लोन की न्यूनतम वायु गति कितने किमी प्रति घंटा निर्धारित है?',
      options: ['A) 120 किमी/घंटा', 'B) 160 किमी/घंटा', 'C) 222 किमी/घंटा या अधिक', 'D) 300 किमी/घंटा'],
      correctAnswer: 2,
      examId: 'ssc-cgl',
      subjectId: 'subj-gk',
      difficulty: 'HARD',
      marks: 2.0,
      languageCode: 'hi'
    };

    const valResult = qualityValidationPipeline.validate(novelCandidate, { examId: 'ssc-cgl', subjectId: 'subj-gk' }, db);
    assert.strictEqual(valResult.isValid, true, `Unique question must be valid. Errors: ${valResult.errors.join(', ')}`);
    assert.strictEqual(valResult.status, 'APPROVED');
    assert.strictEqual(valResult.checks.historicalNovelty.passed, true);
  });

  // TEST 5: Wrong-answer rejection
  runTest('TEST 5: Wrong-answer rejection (out-of-bounds MCQ & deterministic math mismatch)', () => {
    // 1. MCQ with invalid index 4 (options length 4 has indices 0-3)
    const badMcq = {
      stem: 'मानव नेत्र के किस भाग पर वस्तु का प्रतिबिम्ब बनता है?',
      options: ['A) कॉर्निया', 'B) आइरिस', 'C) पुतली', 'D) दृष्टिपटल (रेटिना)'],
      correctAnswer: 5, // Invalid index
      subjectId: 'subj-science'
    };
    const resMcq = qualityValidationPipeline.validate(badMcq, {}, db);
    assert.strictEqual(resMcq.isValid, false, 'Invalid answer index must fail validation');
    assert(resMcq.errors.some(e => e.includes('answer index out of bounds') || e.includes('Invalid single_mcq')), 'Must report answer index error');

    // 2. Numerical deterministic math failure (15 + 25 calculates to 40, but answer claims 55)
    const badMath = {
      stem: 'एक वस्तु का अंकित मूल्य 15 + 25 रुपये है। इसका कुल मूल्य ज्ञात कीजिए।',
      questionType: 'numerical',
      correctAnswer: 55, // Mismatch (should be 40)
      subjectId: 'subj-math'
    };
    const resMath = qualityValidationPipeline.validate(badMath, {}, db);
    assert.strictEqual(resMath.isValid, false, 'Deterministic math mismatch must fail');
    assert(resMath.errors.some(e => e.includes('Deterministic math validation failed')), 'Must report math mismatch error');
  });

  // TEST 6: Ambiguous-question rejection
  runTest('TEST 6: Ambiguous and placeholder question rejection', () => {
    const dummyCandidate = {
      stem: 'sample', // Short & placeholder
      options: ['A', 'B'],
      correctAnswer: 0,
      subjectId: 'subj-gk'
    };
    const res = qualityValidationPipeline.validate(dummyCandidate, {}, db);
    assert.strictEqual(res.isValid, false, 'Ambiguous/dummy stem must be rejected');
    assert(res.errors.some(e => e.includes('too short') || e.includes('placeholder')), 'Must report ambiguity error');
  });

  // TEST 7: Invalid-option rejection
  runTest('TEST 7: Invalid-option rejection (duplicate options & empty options)', () => {
    const dupOptsCandidate = {
      stem: 'सौरमंडल का सबसे बड़ा ग्रह कौन सा है?',
      options: ['A) बृहस्पति', 'B) बृहस्पति', 'C) शनि', 'D) मंगल'], // Duplicate 'बृहस्पति'
      correctAnswer: 0,
      subjectId: 'subj-gk'
    };
    const res = qualityValidationPipeline.validate(dupOptsCandidate, {}, db);
    assert.strictEqual(res.isValid, false, 'Duplicate options must be rejected');
    assert(res.errors.some(e => e.includes('duplicate choices') || e.includes('Duplicate options')), 'Must report duplicate option error');
  });

  // TEST 8: Syllabus mismatch rejection
  runTest('TEST 8: Syllabus mismatch rejection (non-existent subject ID)', () => {
    const candidate = {
      stem: 'विद्युत आवेश का SI मात्रक क्या होता है?',
      options: ['A) कूलॉम', 'B) एम्पियर', 'C) वोल्ट', 'D) ओम'],
      correctAnswer: 0,
      subjectId: 'subj-quantum-nonexistent-999'
    };
    const res = qualityValidationPipeline.validate(candidate, {}, db);
    assert.strictEqual(res.isValid, false, 'Non-existent subject must fail syllabus validation');
    assert(res.errors.some(e => e.includes('Invalid syllabus subject_id')), 'Must report syllabus subject error');
  });

  // TEST 9: Blueprint mismatch rejection
  runTest('TEST 9: Blueprint mismatch rejection (non-existent blueprint ID)', () => {
    const candidate = {
      stem: 'कार्य का SI मात्रक क्या है?',
      options: ['A) जूल', 'B) न्यूटन', 'C) वाट', 'D) पास्कल'],
      correctAnswer: 0,
      subjectId: 'subj-science'
    };
    const res = qualityValidationPipeline.validate(candidate, { blueprintId: 'bp-phantom-fake-id' }, db);
    assert.strictEqual(res.isValid, false, 'Non-existent blueprint must fail validation');
    assert(res.errors.some(e => e.includes('does not exist')), 'Must report blueprint error');
  });

  // TEST 10: Language mismatch rejection
  runTest('TEST 10: Language mismatch rejection (unsupported language code)', () => {
    const candidate = {
      stem: 'What is the speed of light?',
      options: ['3x10^8 m/s', '3x10^6 m/s', '100 m/s', '0'],
      correctAnswer: 0,
      subjectId: 'subj-science',
      languageCode: 'klingon-unknown'
    };
    const res = qualityValidationPipeline.validate(candidate, {}, db);
    assert.strictEqual(res.isValid, false, 'Unsupported language code must fail');
    assert(res.errors.some(e => e.includes('Unsupported or unrecognized language code')), 'Must report language error');
  });

  // TEST 11: AI practice provenance enforcement
  runTest('TEST 11: AI practice provenance strict enforcement (AI_PRACTICE & AI_ESTIMATED_DIFFICULTY)', () => {
    const candidate = {
      questionId: `q-ai-prov-test-${Date.now()}`,
      stem: 'प्रकाश का परावर्तन किस सतह से सर्वाधिक नियमित होता है?',
      options: ['A) समतल दर्पण', 'B) खुरदरी दीवार', 'C) लकड़ी', 'D) कपड़ा'],
      correctAnswer: 0,
      subjectId: 'subj-science',
      difficulty: 'MEDIUM',
      languageCode: 'hi'
    };

    const pubResult = novelAiEngine.publishQuestion(candidate, {}, db);
    assert.strictEqual(pubResult.provenance, 'AI_PRACTICE', 'Provenance must be strictly AI_PRACTICE');

    const dbRow = db.prepare('SELECT provenance, difficulty_type, source_type FROM questions WHERE question_id = ?').get(candidate.questionId);
    assert.strictEqual(dbRow.provenance, 'AI_PRACTICE', 'Database provenance must be AI_PRACTICE');
    assert.strictEqual(dbRow.difficulty_type, 'AI_ESTIMATED_DIFFICULTY', 'Difficulty type must be AI_ESTIMATED_DIFFICULTY');
    assert.strictEqual(dbRow.source_type, 'AI_PRACTICE', 'Source type must match AI_PRACTICE');

    // Clean up test record to preserve exact 872 legacy inventory
    db.prepare('DELETE FROM question_versions WHERE question_id = ?').run(candidate.questionId);
    db.prepare('DELETE FROM question_fingerprints WHERE question_id = ?').run(candidate.questionId);
    db.prepare('DELETE FROM questions WHERE question_id = ?').run(candidate.questionId);
  });

  // TEST 12: PYQ provenance preservation
  runTest('TEST 12: Previous Year Question (PYQ) provenance & source attribution', () => {
    const hist = db.prepare("SELECT * FROM historical_questions WHERE exam_id = 'ssc-cgl' AND exam_year = 2016 LIMIT 1").get();
    assert(hist, 'Historical question from 2016 must exist');
    assert(hist.source_document.includes('SSC CGL Tier-1 Official Paper 2016'), 'Must retain official source document title');
    assert.strictEqual(hist.exam_year, 2016, 'Exam year must be accurately preserved');
  });

  // TEST 13: Notes provenance & depth classification
  runTest('TEST 13: Notes engine provenance (AI_NOTE vs HUMAN_CURATED) & depth tiers', () => {
    const humanNote = db.prepare("SELECT * FROM notes WHERE note_id = 'note-cgl-gk-const-01'").get();
    assert(humanNote, 'Human curated note must exist');
    assert.strictEqual(humanNote.provenance, 'HUMAN_CURATED');
    assert.strictEqual(humanNote.content_depth, 'DETAILED');

    const aiNote = db.prepare("SELECT * FROM notes WHERE note_id = 'note-ai-gen-practice-sample'").get();
    assert(aiNote, 'AI practice note must exist');
    assert.strictEqual(aiNote.provenance, 'AI_NOTE');
  });

  // TEST 14: Question versioning & non-destructive history
  runTest('TEST 14: Non-destructive Question Versioning (increments version and preserves past versions)', () => {
    // Pick an existing question
    const targetQ = db.prepare('SELECT question_id, current_version FROM questions LIMIT 1').get();
    const qid = targetQ.question_id;
    const initialVer = targetQ.current_version;

    // Create a new version
    const updateResult = contentVersioningService.createNewVersion(qid, {
      languageContent: { hi: { q: 'संशोधित प्रश्न पाठ (Clarified question text)', options: ['A) 1', 'B) 2'], ans: 'A) 1', exp: 'संशोधित व्याख्या' } },
      correctAnswer: { index: 0, key: 'A', value: '1' },
      correctionReason: 'Editorial clarification of typographical phrasing'
    }, db);

    assert.strictEqual(updateResult.versionNumber, initialVer + 1, 'Version number must increment');

    // Verify all historical versions exist
    const history = contentVersioningService.getQuestionHistory(qid, db);
    assert(history.length >= 2, `Question history should contain at least 2 versions, found ${history.length}`);
    const v1 = history.find(h => h.version_number === 1);
    const v2 = history.find(h => h.version_number === initialVer + 1);
    assert(v1, 'Version 1 must remain intact');
    assert(v2, 'New version must be recorded');
    assert.strictEqual(v2.correction_reason, 'Editorial clarification of typographical phrasing');

    // Clean up test version to restore initial state
    db.prepare('DELETE FROM question_versions WHERE version_id = ?').run(updateResult.versionId);
    db.prepare('UPDATE questions SET current_version = ? WHERE question_id = ?').run(initialVer, qid);
  });

  // TEST 15: Global question uniqueness
  runTest('TEST 15: Global question uniqueness across banks via fingerprint register', () => {
    const qCount = db.prepare('SELECT COUNT(*) as c FROM questions').get().c;
    const fpCount = db.prepare('SELECT COUNT(*) as c FROM question_fingerprints').get().c;
    assert(qCount >= 872, `Must preserve all 872 questions, found ${qCount}`);
    assert(fpCount > 0, `Fingerprints table must be populated, found ${fpCount}`);

    // Verify querying by questionId returns single canonical truth record
    const singleQ = contentRepo.getQuestionById('q-hy-hi-0001', db);
    assert(singleQ, 'Canonical question record must exist');
    assert.strictEqual(singleQ.questionId, 'q-hy-hi-0001');
    assert(singleQ.fingerprint, 'Fingerprint must be linked to canonical record');
  });

  // TEST 16: Mock integration compatibility
  runTest('TEST 16: Phase 4 Mock Engine integration with Phase 5 question bank', () => {
    const mockService = require('../services/mock-service');
    // Start mock session
    const session = mockService.startMockSession({
      examId: 'ssc-cgl',
      mode: 'PRACTICE',
      questionCount: 10
    });
    assert(session && session.success, 'Mock session start must succeed');
    assert(session.sections && session.sections.length > 0, 'Sections must be populated');
    assert(session.questions && session.questions.length > 0, 'Questions must be populated');
    const firstQ = session.questions[0];
    assert(firstQ, 'First question in mock must exist');
    assert(firstQ.id || firstQ.questionId, 'Question ID must be present');
    assert.strictEqual(firstQ.correctAnswer, undefined, 'Correct answer must be stripped for CBT security');
  });

  // TEST 17: Database persistence
  runTest('TEST 17: Database persistence verification for notes, syllabi, and historical corpus', () => {
    const chCount = db.prepare('SELECT COUNT(*) as c FROM syllabus_chapters').get().c;
    const histCount = db.prepare('SELECT COUNT(*) as c FROM historical_questions').get().c;
    const notesCount = db.prepare('SELECT COUNT(*) as c FROM notes').get().c;

    assert(chCount >= 100, `Syllabus chapters must be persisted (found ${chCount})`);
    assert(histCount >= 12, `Historical questions must be persisted (found ${histCount})`);
    assert(notesCount >= 4, `Educational notes must be persisted (found ${notesCount})`);
  });

  // TEST 18: Failed AI job recovery
  runTest('TEST 18: Generation job state machine and transient failure recovery', () => {
    const jobParams = {
      examId: 'ssc-cgl',
      subjectId: 'subj-science',
      questionTypeId: 'single_mcq',
      candidateQuestion: {
        stem: 'short', // Will fail validation on purpose
        options: ['A', 'B'],
        correctAnswer: 0,
        subjectId: 'subj-science'
      },
      maxRetries: 2
    };

    const queueRes = novelAiEngine.queueGenerationJob(jobParams, db);
    assert.strictEqual(queueRes.status, 'QUEUED');

    // Process job: validation fails -> should re-queue for retry (retry_count = 1)
    const procRes1 = novelAiEngine.processJob(queueRes.jobId, db);
    assert.strictEqual(procRes1.status, 'QUEUED', 'Failed job should be re-queued');
    assert.strictEqual(procRes1.retryCount, 1, 'Retry count should be 1');
  });

  // TEST 19: Generation retry limit
  runTest('TEST 19: Generation retry limit exhaustion (transitions to REJECTED after max retries)', () => {
    const jobParams = {
      examId: 'rrb-alp',
      subjectId: 'subj-science',
      questionTypeId: 'single_mcq',
      candidateQuestion: {
        stem: 'tiny', // Fails validation
        options: ['A', 'B'],
        correctAnswer: 0,
        subjectId: 'subj-science'
      },
      maxRetries: 1 // Only 1 retry allowed
    };

    const queueRes = novelAiEngine.queueGenerationJob(jobParams, db);
    // Attempt 1 -> re-queued (retry_count = 1)
    novelAiEngine.processJob(queueRes.jobId, db);
    // Attempt 2 -> max retries exceeded -> REJECTED
    const procRes2 = novelAiEngine.processJob(queueRes.jobId, db);
    assert.strictEqual(procRes2.status, 'REJECTED', 'Job must transition to REJECTED once max retries are exceeded');
  });

  // TEST 20: Rate limiting and cost control
  runTest('TEST 20: Generation rate limiting and cost control enforcement', () => {
    const testExam = 'rate-limit-test-exam';
    const todayStr = new Date().toISOString().slice(0, 10);

    // Simulate exhausting rate limit for this test exam
    db.prepare(`
      INSERT INTO generation_rate_limits (rate_limit_id, scope_type, scope_key, date_key, count, max_allowed)
      VALUES (?, 'EXAM_DAILY', ?, ?, 100, 100)
      ON CONFLICT(scope_type, scope_key, date_key) DO UPDATE SET count = 100
    `).run(`rl-${testExam}-${todayStr}`, testExam, todayStr);

    const check = novelAiEngine.checkRateLimit(testExam, db);
    assert.strictEqual(check.allowed, false, 'Rate limit check must disallow further generations when limit reached');
    assert(check.reason.includes('Daily generation limit'), 'Must provide clear cost control reason');
  });

  console.log('\n========================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passedTests} PASSED / ${failedTests} FAILED (Total: ${passedTests + failedTests})`);
  console.log('========================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});

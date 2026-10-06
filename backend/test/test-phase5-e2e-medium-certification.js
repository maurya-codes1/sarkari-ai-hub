// backend/test/test-phase5-e2e-medium-certification.js
// Phase 5: Master Multi-Script Font Engine Integration & E2E Production Certification
// Tests font registration, multi-medium invariance across 31 boards, three-surface cohesion,
// language subject invariance locks, and central competitive exam isolation.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { getDb } = require('../db/database');
const boardMediumGovService = require('../services/board-medium-governance-service');
const pdfFontRegistry = require('../services/pdf-font-registry');
const pdfGenerationService = require('../services/pdf-generation-service');
const { getCompleteSubjectInventory } = require('../../services/subject-inventory-loader');
const boardCurriculumEngine = require('../../services/board-curriculum-engine');

const OUTPUT_DIR = path.join(__dirname, '../../test_output_phase5');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`✅ ${testName} — PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ ${testName} — FAILED:`, err.message);
    failedTests++;
  }
}

async function runAsyncTest(testName, testFn) {
  try {
    await testFn();
    console.log(`✅ ${testName} — PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`❌ ${testName} — FAILED:`, err.message);
    failedTests++;
  }
}

async function main() {
  console.log('====================================================================');
  console.log('🏛️  RUNNING PHASE 5: MULTI-SCRIPT & MULTI-MEDIUM E2E CERTIFICATION');
  console.log('====================================================================\n');

  const db = getDb();

  // --------------------------------------------------------------------------
  // TEST 1: Multi-Script TrueType Font Registration & Zero Missing Glyphs
  // --------------------------------------------------------------------------
  runTest('Test 1: Multi-Script TrueType Font Registration & Glyph Integrity', () => {
    // A. Validate Indic scripts + Latin + Urdu + Math
    const fontQa = pdfFontRegistry.testAllIndicGlyphs();
    assert.strictEqual(fontQa.allPassed, true, 'All 12 Indic scripts and Math must pass glyph validation');
    assert.strictEqual(fontQa.failed, 0, 'Zero font glyph failures allowed');

    // B. Validate Assamese specific letters (ৰ and ৱ)
    const asVal = pdfFontRegistry.validateGlyphSupport('নমস্কাৰ অসম পৰীক্ষা প্ৰশ্নকাকত', 'as');
    assert.strictEqual(asVal.valid, true, 'Assamese script glyphs must be 100% valid');
    assert.strictEqual(asVal.missingCount, 0, 'Assamese must have 0 missing glyphs');

    // C. Test PDFKit doc font registration
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    const docFonts = pdfFontRegistry.registerDocFonts(doc, { langCode: 'hi' });
    assert.ok(docFonts.regular, 'docFonts must provide regular font');
    assert.ok(docFonts.bold, 'docFonts must provide bold font');
    assert.strictEqual(docFonts.regular, 'NirmalaUI', 'Regular font should be NirmalaUI on Windows');
    assert.strictEqual(docFonts.bold, 'NirmalaUI-Bold', 'Bold font should be NirmalaUI-Bold on Windows');
  });

  // --------------------------------------------------------------------------
  // TEST 2: Multi-Medium Board Invariance — Maharashtra MSBSHSE (5 Mediums)
  // --------------------------------------------------------------------------
  runTest('Test 2: Multi-Medium Board Invariance — Maharashtra MSBSHSE (5 Mediums: mr, en, hi, ur, gu)', () => {
    const rawQ = {
      id: 'q-mah-math-01',
      boardId: 'msbshse-maharashtra',
      subjectId: 'math',
      stage: 'class-10',
      type: 'descriptive',
      marks: 4,
      q: 'वर्गसमीकरण सोडवा: 2x² + 5x + 3 = 0\n[Solve the quadratic equation: 2x² + 5x + 3 = 0]',
      modelAnswer: 'अवयव पद्धत: 2x² + 2x + 3x + 3 = 0 => 2x(x + 1) + 3(x + 1) = 0 => x = -1 किंवा x = -3/2'
    };

    const mediums = ['mr', 'en', 'hi', 'ur', 'gu'];
    const resolvedOutputs = {};

    for (const med of mediums) {
      const res = boardMediumGovService.resolveQuestionMedium(rawQ, med);
      resolvedOutputs[med] = res;

      // Invariance 1: Identical Question ID across all 5 mediums
      assert.strictEqual(res.questionId, 'q-mah-math-01', `Question ID must remain identical for medium ${med}`);
      assert.strictEqual(res.marks, 4, `Marks must remain 4 for medium ${med}`);

      // Invariance 2: Model Answer tailored to chosen medium
      assert.ok(res.modelAnswer && res.modelAnswer.length > 0, `Model answer must exist for medium ${med}`);
    }

    // Verify medium-specific marking headers
    assert.ok(resolvedOutputs.mr.modelAnswer.includes('अवयव') || resolvedOutputs.mr.modelAnswer.includes('आदर्श उत्तर') || resolvedOutputs.mr.modelAnswer.includes('गुणदान'), 'Marathi solution must have authentic Marathi content');
    assert.ok(resolvedOutputs.en.modelAnswer.includes('Model Answer') || resolvedOutputs.en.modelAnswer.includes('Marking Scheme'), 'English solution must have English header');
    assert.ok(resolvedOutputs.hi.modelAnswer.includes('आदर्श उत्तर'), 'Hindi solution must have Hindi header');
    assert.ok(resolvedOutputs.ur.modelAnswer.includes('ماڈل جواب'), 'Urdu solution must have Urdu header');
    assert.ok(resolvedOutputs.gu.modelAnswer.includes('આદર્શ ઉત્તર'), 'Gujarati solution must have Gujarati header');
  });

  // --------------------------------------------------------------------------
  // TEST 3: Multi-Medium Board Invariance — West Bengal WBBSE (4 Mediums)
  // --------------------------------------------------------------------------
  runTest('Test 3: Multi-Medium Board Invariance — West Bengal WBBSE (4 Mediums: bn, en, hi, ur)', () => {
    const rawQ = {
      id: 'q-wb-physical-sci-01',
      boardId: 'wbbse-wbchse-west-bengal',
      subjectId: 'physical-science',
      stage: 'class-10',
      type: 'subjective',
      marks: 3,
      q: 'বয়েলের সূত্রটি বিবৃত কর এবং গাণিতিক রূপ লেখ।\n[State Boyle\'s Law and write its mathematical formula.]',
      modelAnswer: 'বয়েলের সূত্র: স্থির তাপমাত্রায় নির্দিষ্ট ভরের কোনো গ্যাসের আয়তন তার চাপের সাথে ব্যস্তানুপাতে পরিবর্তিত হয়। গাণিতিক রূপ: V ∝ 1/P বা PV = K (ধ্রুবক)।'
    };

    const mediums = ['bn', 'en', 'hi', 'ur'];
    for (const med of mediums) {
      const res = boardMediumGovService.resolveQuestionMedium(rawQ, med);
      assert.strictEqual(res.questionId, 'q-wb-physical-sci-01', 'Question ID must be invariant');
      assert.strictEqual(res.marks, 3, 'Marks must be invariant');
    }

    const bnRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'bn');
    const enRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'en');
    const urRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'ur');

    assert.ok(bnRes.modelAnswer.includes('বয়েলের সূত্র') || bnRes.modelAnswer.includes('আদর্শ উত্তর'), 'Bengali solution retains Bengali script');
    assert.ok(enRes.modelAnswer.includes('Model Answer') || enRes.modelAnswer.includes('Boyle'), 'English solution formats in English');
    assert.ok(urRes.modelAnswer.includes('ماڈل جواب'), 'Urdu solution formats in Urdu');
  });

  // --------------------------------------------------------------------------
  // TEST 4: Multi-Medium Board Invariance — Telangana & Andhra Pradesh (3 Mediums)
  // --------------------------------------------------------------------------
  runTest('Test 4: Multi-Medium Board Invariance — Telangana & AP (3 Mediums: te, en, ur)', () => {
    const rawQ = {
      id: 'q-tel-sci-01',
      boardId: 'tsbie-bieap',
      subjectId: 'science',
      stage: 'class-10',
      type: 'subjective',
      marks: 4,
      q: 'కిరణజన్య సంయోగక్రియ సమీకరణాన్ని రాయండి మరియు వివరించండి.\n[Write and explain the balanced equation of photosynthesis.]',
      modelAnswer: 'సమీకరణం: 6CO₂ + 12H₂O -> C₆H₁₂O₆ + 6O₂ + 6H₂O (క్లోరోఫిల్ మరియు సూర్యరశ్మి సమక్షంలో).'
    };

    const teRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'te');
    const enRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'en');
    const urRes = boardMediumGovService.resolveQuestionMedium(rawQ, 'ur');

    assert.strictEqual(teRes.questionId, enRes.questionId, 'Question ID invariant between te and en');
    assert.strictEqual(enRes.questionId, urRes.questionId, 'Question ID invariant between en and ur');

    assert.ok(teRes.modelAnswer.includes('సమీకరణం') || teRes.modelAnswer.includes('ఆదర్శ సమాధానం'), 'Telugu model answer has Telugu script');
    assert.ok(enRes.modelAnswer.includes('Model Answer'), 'English model answer has English header');
    assert.ok(urRes.modelAnswer.includes('ماڈل جواب'), 'Urdu model answer has Urdu header');
  });

  // --------------------------------------------------------------------------
  // TEST 5: Three-Surface End-to-End Cohesion (Mock, Adaptive, PDF)
  // --------------------------------------------------------------------------
  await runAsyncTest('Test 5: Three-Surface End-to-End Cohesion (Mock Test, Adaptive, PDF Engine)', async () => {
    // Surface 1: Board Curriculum Booklet Engine
    const booklet = boardCurriculumEngine.compileBoardSubjectBooklet('science', {
      boardId: 'bseb-bihar',
      targetClass: '10',
      preferredMedium: 'en'
    });
    assert.ok(booklet, 'Curriculum booklet must compile cleanly');
    assert.ok(booklet.sections.objective.length > 0, 'Objective questions must be present');

    // Surface 2: Subject Inventory Loader
    const inventory = getCompleteSubjectInventory('science', {
      boardId: 'bseb-bihar',
      targetClass: '10',
      preferredMedium: 'hi'
    });
    assert.ok(inventory.length > 0, 'Inventory should return authentic questions');

    // Surface 3: Server-Side PDF Generation Engine
    const pdfPath = path.join(OUTPUT_DIR, 'phase5_cert_bseb_science.pdf');
    const pdfRes = await pdfGenerationService.renderBoardPaperPdf(
      'bseb-bihar',
      'v1',
      'paper-bseb-cert',
      pdfPath,
      db,
      { preferredMedium: 'hi', subjectId: 'science' }
    );
    assert.strictEqual(pdfRes.success, true, 'Board paper PDF must generate successfully');
    assert.ok(fs.existsSync(pdfPath), 'PDF file must exist on disk');
    assert.ok(fs.statSync(pdfPath).size > 1000, 'PDF file must be non-empty');
  });

  // --------------------------------------------------------------------------
  // TEST 6: Language Subject Absolute Invariance Lock Across 5 Diverse Boards
  // --------------------------------------------------------------------------
  runTest('Test 6: Language Subject Absolute Invariance Lock Across 5 Diverse Boards', () => {
    const testCases = [
      { board: 'pseb-punjab', subject: 'subj-punjabi', lang: 'pa', sample: 'ਗੁਰਮੁਖੀ ਲਿਪੀ ਦਾ ਇਤਿਹਾਸ' },
      { board: 'bseb-bihar', subject: 'subj-hindi', lang: 'hi', sample: 'सूरदास के पद की व्याख्या' },
      { board: 'tsbie-bieap', subject: 'subj-telugu', lang: 'te', sample: 'తెలుగు భాష ప్రాముఖ్యత' },
      { board: 'tndge-tamilnadu', subject: 'subj-tamil', lang: 'ta', sample: 'திருக்குறள் விளக்கம்' },
      { board: 'ahsec-seba-assam', subject: 'subj-assamese', lang: 'as', sample: 'অসমীয়া ভাষা আৰু সাহিত্য' }
    ];

    for (const tc of testCases) {
      const rawQ = {
        id: `q-lang-${tc.lang}`,
        boardId: tc.board,
        subjectId: tc.subject,
        stage: 'class-10',
        type: 'descriptive',
        marks: 5,
        q: tc.sample,
        modelAnswer: `${tc.sample} - ਪ੍ਰਮਾਣਿਕ ਹੱਲ / விளக்கம்`
      };

      // Even if user requests 'en', it MUST remain locked in native script
      const resolved = boardMediumGovService.resolveQuestionMedium(rawQ, 'en');
      assert.strictEqual(resolved.isLanguageSubject, true, `${tc.subject} must be classified as language subject`);
      assert.strictEqual(resolved.isMediumLocked, true, `${tc.subject} must be locked against medium switching`);
      assert.strictEqual(resolved.resolvedMedium, tc.lang, `${tc.subject} must remain resolved in ${tc.lang}`);
      assert.strictEqual(resolved.questionText, tc.sample, `${tc.subject} question text must remain untouched in native script`);
    }
  });

  // --------------------------------------------------------------------------
  // TEST 7: Central Competitive Exam Strict Isolation
  // --------------------------------------------------------------------------
  await runAsyncTest('Test 7: Central Competitive Exam Strict Isolation (SSC CGL & RRB NTPC)', async () => {
    const compPdfPath = path.join(OUTPUT_DIR, 'phase5_cert_ssc_cgl.pdf');
    const compRes = await pdfGenerationService.generatePdf({
      documentType: 'OFFICIAL_FULL_EXAM',
      examId: 'ssc-cgl',
      targetLanguage: 'hi',
      outputPath: compPdfPath
    }, db);

    assert.strictEqual(compRes.success, true, 'SSC CGL Tier 1 PDF generation must succeed');
    assert.strictEqual(compRes.totalQuestions, 100, 'SSC CGL must strictly generate 100 questions');
    const outPath = compRes.filePath || compPdfPath;
    assert.ok(fs.existsSync(outPath), 'SSC CGL PDF must exist');
    assert.ok(fs.statSync(outPath).size > 5000, 'SSC CGL PDF must be substantial in size');
  });

  // --------------------------------------------------------------------------
  // TEST 8: Memory Stability & Font Caching Performance
  // --------------------------------------------------------------------------
  await runAsyncTest('Test 8: Memory Stability & Font Caching Performance', async () => {
    const startMemory = process.memoryUsage().heapUsed;
    const startTime = Date.now();

    // Render 3 consecutive solutions PDFs in diverse languages
    const testRuns = [
      { board: 'msbshse-maharashtra', medium: 'mr', sub: 'math' },
      { board: 'tsbie-bieap', medium: 'te', sub: 'science' },
      { board: 'wbbse-wbchse-west-bengal', medium: 'bn', sub: 'math' }
    ];

    for (let i = 0; i < testRuns.length; i++) {
      const run = testRuns[i];
      const solPath = path.join(OUTPUT_DIR, `phase5_perf_sol_${i}.pdf`);
      await pdfGenerationService.renderSolutionsPdf(
        run.board,
        'v1',
        `paper-${i}`,
        solPath,
        db,
        { preferredMedium: run.medium, subjectId: run.sub }
      );
      assert.ok(fs.existsSync(solPath), `Solution PDF ${i} must exist`);
    }

    const duration = Date.now() - startTime;
    const endMemory = process.memoryUsage().heapUsed;
    const memoryDiffMb = (endMemory - startMemory) / (1024 * 1024);

    console.log(`   ⏱️  3 Consecutive Multi-Script PDFs generated in ${duration}ms (Avg: ${(duration / 3).toFixed(1)}ms)`);
    console.log(`   🧠 Heap delta: ${memoryDiffMb.toFixed(2)} MB`);

    assert.ok(duration < 5000, 'Generation must take under 5000ms');
    assert.ok(memoryDiffMb < 60, 'Memory increase must be constrained (< 60MB)');
  });

  console.log('\n====================================================================');
  console.log(`📊 PHASE 5 TEST SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${passedTests + failedTests})`);
  console.log('====================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal Phase 5 suite error:', err);
  process.exit(1);
});

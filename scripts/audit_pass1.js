const http = require('http');

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          duration: Date.now() - start,
          data: data,
          headers: res.headers
        });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runPass1() {
  console.log('====================================================');
  console.log('?? EXECUTING PASS 1: COMPREHENSIVE END-TO-END AUDIT');
  console.log('====================================================\n');

  const pages = [
    '/',
    '/adaptive-practice.html',
    '/candidate-analytics.html',
    '/planner.html',
    '/coverage-matrix.html',
    '/calendar.html',
    '/dashboard.html',
    '/admin-ops.html',
    '/review-queue.html'
  ];

  console.log('--- 1. Testing All 9 Pages HTTP Status & Response Time ---');
  for (const page of pages) {
    try {
      const res = await fetchUrl(page);
      const hasBrand = res.data.includes('data-i18n="brand_title"') || res.data.includes('BharatExams Hub');
      console.log(`  ${page.padEnd(28)} | HTTP ${res.status} | ${res.duration}ms | brand_tag: ${hasBrand ? '?' : '?'}`);
    } catch(e) {
      console.error(`  ${page.padEnd(28)} | ERROR: ${e.message}`);
    }
  }

  console.log('\n--- 2. Testing Mock Test Engine Performance & Schema ---');
  const mockPayload = JSON.stringify({
    examId: 'ssc-gd',
    language: 'hi',
    subject: 'Reasoning',
    mode: 'FULL_MOCK'
  });
  const mockRes = await fetchUrl('/api/v2/mock/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(mockPayload) },
    body: mockPayload
  });
  console.log(`  POST /api/v2/mock/start (SSC GD) | HTTP ${mockRes.status} | ${mockRes.duration}ms`);
  if (mockRes.status === 200) {
    const json = JSON.parse(mockRes.data);
    const questions = json.questions || (json.session && json.session.questions) || [];
    console.log(`    Questions returned: ${questions.length}`);
    if (questions.length > 0) {
      const q = questions[0];
      console.log(`    Sample Q options: ${Array.isArray(q.options) ? 'Array (length ' + q.options.length + ')' : typeof q.options} | Q text: ${(q.question_text || q.text || '').substring(0, 40)}...`);
    }
  } else {
    console.log('    Response body:', mockRes.data.substring(0, 200));
  }

  console.log('\n--- 3. Testing Adaptive Practice API (4 Modes) ---');
  const modes = ['MIXED_ADAPTIVE', 'SPEED_PRACTICE', 'DIFFICULTY_PROGRESSION', 'PYQ_REVISION'];
  for (const mode of modes) {
    const payload = JSON.stringify({
      userId: 'test-audit-user',
      examId: 'ssc-cgl',
      practiceMode: mode,
      questionCount: 10
    });
    const adaptRes = await fetchUrl('/api/v3/adaptive/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      body: payload
    });
    console.log(`  Adaptive Mode [${mode}] | HTTP ${adaptRes.status} | ${adaptRes.duration}ms`);
    if (adaptRes.status === 200) {
      const data = JSON.parse(adaptRes.data);
      const qList = (data.selection && data.selection.questions) || data.questions || [];
      console.log(`    Returned: ${qList.length} questions | Valid Array options: ${qList.length > 0 && Array.isArray(qList[0].options) && qList[0].options.length >= 2 ? '✅' : '❌'}`);
    }
  }

  console.log('\n--- 4. Testing PDF Notes Bundle Latency & Cache ---');
  const notePayload = JSON.stringify({
    exam: 'CBSE Class 10',
    subject: 'Science',
    board: 'cbse'
  });
  const noteRes1 = await fetchUrl('/api/ai/generate-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(notePayload) },
    body: notePayload
  });
  console.log(`  Call 1 (DB fetch / Warm-up) | HTTP ${noteRes1.status} | ${noteRes1.duration}ms`);
  const noteRes2 = await fetchUrl('/api/ai/generate-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(notePayload) },
    body: notePayload
  });
  console.log(`  Call 2 (In-memory Cache)    | HTTP ${noteRes2.status} | ${noteRes2.duration}ms`);
  if (noteRes2.status === 200) {
    const noteData = JSON.parse(noteRes2.data);
    console.log(`    Questions returned in notes: ${noteData.questions ? noteData.questions.length : 'N/A'}`);
  }

  console.log('\n--- 5. Testing 25 Languages Dictionary Integrity ---');
  const i18n = require('../public/js/i18n.js');
  const locales = i18n.SUPPORTED_LOCALES;
  console.log(`  Total Supported Locales: ${locales.length}`);
  let allBrandValid = true;
  let allCountValid = true;
  let allSubValid = true;
  let allMatrixValid = true;
  locales.forEach(loc => {
    const id = loc.id;
    const base = i18n.I18N_DATA[id];
    const ext = i18n.EXTENDED_I18N_DATA[id];
    if (!base || !base.brand_title) allBrandValid = false;
    if (!ext || !ext.bqb_live_count || !ext.bqb_live_count.includes('3,07,520+')) allCountValid = false;
    // Check that 99.8k is gone and string contains 261.5 or native numeral equivalents
    if (!ext || !ext.bqb_stat_total_sub || ext.bqb_stat_total_sub.includes('99.8k') || (!ext.bqb_stat_total_sub.includes('261.5k') && !ext.bqb_stat_total_sub.includes('\u09e8\u09ec\u09e7.\u09ebk') && !ext.bqb_stat_total_sub.includes('\u0b68\u0b6c\u0b67.\u0b6bk'))) allSubValid = false;
    if (!ext || !ext.bqb_card_matrix_sub || ext.bqb_card_matrix_sub.includes('49')) allMatrixValid = false;
  });
  console.log(`  All 25 brand_title present & localized:   ${allBrandValid ? '? PASS' : '? FAIL'}`);
  console.log(`  All 25 bqb_live_count has 3,07,520+:       ${allCountValid ? '? PASS' : '? FAIL'}`);
  console.log(`  All 25 bqb_stat_total_sub has 261.5k:     ${allSubValid ? '? PASS' : '? FAIL'}`);
  console.log(`  All 25 bqb_card_matrix_sub free of 49:    ${allMatrixValid ? '? PASS' : '? FAIL'}`);

  console.log('\n====================================================');
  console.log('? PASS 1 COMPLETE: ALL 5 PHASES TESTED');
  console.log('====================================================');
}

runPass1().catch(console.error);

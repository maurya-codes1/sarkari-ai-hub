// services/subject-inventory-loader.js
// Production Question Inventory Loader & Provenance Resolver for SarkariAI Hub
// Bridges SQLite database question corpus and Master Banks to supply rich, authentic,
// non-duplicated question inventories for Subject-wise PDFs and All-Subject bundles.

const path = require('path');
const { getDb } = require(path.resolve(__dirname, '../backend/db/database'));
const { computeBundleSubjectAllocation, selectRepresentativeSubset, reconcileAllSubjectBundle } = require('./content-allocation-policy');

// Master Banks
let HIGH_YIELD_BANKS = {};
try {
  HIGH_YIELD_BANKS = require('../public/js/master-high-yield-bank');
} catch (e) {
  try { HIGH_YIELD_BANKS = require('./master-high-yield-bank'); } catch (e2) {}
}

let COMP_BANKS = {};
try {
  COMP_BANKS = require('../public/js/master-competitive-bank');
} catch (e) {
  try { COMP_BANKS = require('./master-competitive-bank'); } catch (e2) {}
}

let CLASS12_BANKS = {};
try {
  CLASS12_BANKS = require('../public/js/master-class12-bank');
} catch (e) {
  try { CLASS12_BANKS = require('./master-class12-bank'); } catch (e2) {}
}

let MASTER_VAULT = {};
try {
  MASTER_VAULT = require('./master-notes-vault');
} catch (e) {
  try { MASTER_VAULT = require('../services/master-notes-vault'); } catch (e2) {}
}

/**
 * Normalizes question text for robust deduplication.
 */
function normalizeStem(text = '') {
  const line1 = (text || '').split('\n')[0];
  return line1
    .toLowerCase()
    .replace(/^[0-9]+[\.\)]\s*/, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[^a-z0-9\u0900-\u0DFF]/gi, '')
    .trim();
}

function cleanQuestionText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^\[[^\]]+\]\s*/, '');
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|প্রশ্ন)\s*#?\d+\s*[:.-]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.-]\s*/, '');
  cleaned = cleaned.replace(/^\d+[\.\)]\s+/, '');
  cleaned = cleaned.replace(/\s*\([^)]*(?:जांच संदर्भ|Inquiry|अभ्यास संदर्भ|प्रैक्टिस संदर्भ)[^)]*\)/gi, '');
  return cleaned.trim();
}

/**
 * Filter out auto-generated synthetic test fixtures, machine stubs, and irrelevant templates.
 */
function isSyntheticJunk(qRow, parsedContent, is12th = false) {
  if (qRow.quality_state === 'SYNTHETIC_QUARANTINE' || qRow.trust_status === 'QUARANTINED' || qRow.is_published === 0) return true;
  const qId = qRow.question_id || '';
  if (qId.includes('p17c') || qId.includes('p17b') || qId.startsWith('q-p17') || qId.startsWith('q-c12')) return true;
  if (!is12th && (qRow.subject_id === 'subj-math12' || qId.includes('math12'))) return true;
  
  const contentStr = JSON.stringify(parsedContent || {});
  const junkPatterns = [
    /statement i is uniquely false/i,
    /canonical verified doctrine/i,
    /contrary to gazette findings/i,
    /neither statement applies to indian governance/i,
    /statement i represents an invalid premise/i,
    /standard verified formulation holds true/i,
    /propositions contradict empirical observations/i,
    /neither proposition satisfies/i,
    /only conclusion 1 follows definitively/i,
    /only conclusion 2 follows logically/i,
    /రెండు ప్రకటనలు/i,
    /పైవేవీ కావు/i,
    /సంబంధించిన/i,
    /ଏହି ବିବୃତି/i,
    /bsem curriculum standards/i,
    /bseb bihar board पाठ्यचर्या/i,
    /आरआरबी एनटीपीसी परीक्षा के प्रश्न \d+ का विस्तृत समाधान/i,
    /आईबीपीएस पीओ परीक्षा के लिए प्रश्न #\d+ का चरणबद्ध हल/i,
    /जांच संदर्भ #\d+/i,
    /स्थिति #\d+ का मूल्यांकन/i,
    /scenario #\d+/i,
    /NDA गणित पाठ्यक्रम/i,
    /evaluated result for .* problem scenario #\d+/i,
    /Conceptual Distractor/i,
    /Analytical Alternative/i,
    /Applied Variant/i,
    /Verified Answer/i,
    /Distractor Statement/i,
    /Authoritative Answer/i,
    /Contextual Alternative/i,
    /Conceptual Variant/i,
    /प्रमाणिक उत्तर/i,
    /प्रामाणिकम् उत्तरम्/i,
    /ब्लूप्रिंट के अनुसार सही विकल्प चुनिए/i,
    /प्राथमिक एवं प्रामाणिक तथ्य/i,
    /द्वितीयक गौण संदर्भ/i,
    /व्याकरणसम्मतं रूपम्/i,
    /Syllabus 2026-27, choose the correct option/i,
    /Primary statutory principle/i,
    /Secondary verified academic formulation/i,
    /Tertiary analytical model/i,
    /Conclusive theoretical deduction/i,
    /Fundamental theorem as documented/i,
    /Primary authoritative premise/i,
    /Secondary scholarly interpretation/i,
    /Tertiary observational corollary/i,
    /Systematic empirical synthesis/i,
    /Option [A-D]:\s*'/i,
    /विकल्प [क-घ1-4]:\s*'/i,
    /বিকল্প [ক-ঘ]:\s*'/i,
    /ஆப்ஷன் [A-D]:\s*'/i,
    /Option [A-D] for /i
  ];

  for (const pat of junkPatterns) {
    if (pat.test(contentStr)) return true;
  }

  if (!is12th) {
    const math12Pats = [
      /dy\/dx/i,
      /∫/,
      /d²y\/dx²/i,
      /व्युत्क्रमणीय आव्यूह/i,
      /सममित आव्यूह/i,
      /differential equation/i,
      /integrating factor/i,
      /direction cosines/i,
      /linear programming/i
    ];
    for (const pat of math12Pats) {
      if (pat.test(contentStr)) return true;
    }
  }

  return false;
}

/**
 * Deterministic pseudo-random shuffle seeded by a string (e.g. examId)
 */
function seededShuffle(array, seedStr = '') {
  if (!Array.isArray(array) || array.length <= 1) return array;
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return (seed >>> 0) / 4294967296;
  }
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Normalizes subject names, Hindi terms, and aliases to canonical subject codes.
 */
function normalizeSubjectId(sub = '') {
  const s = (sub || '').toLowerCase().trim();
  if (s.includes('bengali') || s.includes('বাংলা') || s.includes('bangla')) return 'bengali';
  if (s.includes('tamil') || s.includes('தமிழ்')) return 'tamil';
  if (s.includes('telugu') || s.includes('తెలుగు')) return 'telugu';
  if (s.includes('marathi') || s.includes('मराठी')) return 'marathi';
  if (s.includes('gujarati') || s.includes('ગુજરાતી')) return 'gujarati';
  if (s.includes('punjabi') || s.includes('ਪੰਜਾਬੀ')) return 'punjabi';
  if (s.includes('odia') || s.includes('ଓଡ଼ିଆ')) return 'odia';
  if (s.includes('assamese') || s.includes('অসমীয়া')) return 'assamese';
  if (s.includes('urdu') || s.includes('اردو')) return 'urdu';
  if (s.includes('kannada') || s.includes('ಕನ್ನಡ')) return 'kannada';
  if (s.includes('malayalam') || s.includes('മലയാളം')) return 'malayalam';
  if (s.includes('kokborok')) return 'kokborok';
  if (s.includes('mizo')) return 'mizo';
  if (s.includes('nepali')) return 'nepali';
  if (s.includes('math') || s.includes('quant') || s.includes('गणित')) return 'math';
  if (s.includes('sci') || s.includes('विज्ञान')) return 'science';
  if (s.includes('gk') || s.includes('general') || s.includes('gs') || s.includes('जागरूकता')) return 'gk';
  if (s.includes('reason') || s.includes('तर्क') || s.includes('तार्किक') || s.includes('बुद्धिमत्ता')) return 'reasoning';
  if (s.includes('hindi') || s.includes('हिन्दी')) return 'hindi';
  if (s.includes('english') || s === 'eng' || s.startsWith('eng-') || s.startsWith('eng_') || s.includes('अंग्रेजी') || s.includes('अंग्रेज़ी')) return 'english';
  if (s.includes('sanskrit') || s.includes('संस्कृत')) return 'sanskrit';
  if (s.includes('law') || s.includes('विधि') || s.includes('मूलविधि') || s.includes('संविधान')) return 'law';
  if (s.includes('tech') || s.includes('railway-sci')) return 'railway-sci';
  if (s.includes('phys') || s.includes('भौतिक')) return 'physics';
  if (s.includes('chem') || s.includes('रसायन')) return 'chemistry';
  if (s.includes('bio') || s.includes('जीव')) return 'biology';
  if (s.includes('account') || s.includes('लेखा')) return 'accountancy';
  if (s.includes('business') || s.includes('व्यावसायिक')) return 'business';
  if (s.includes('eco') || s.includes('अर्थशास्त्र')) return 'economics';
  if (s.includes('hist') || s.includes('इतिहास')) return 'history';
  if (s.includes('polit') || s.includes('राजनीति')) return 'polity';
  if (s.includes('geog') || s.includes('भूगोल')) return 'geography';
  if (s.includes('social') || s.includes('सामाजिक') || s.includes('sst')) return 'social';
  return s;
}

const CANONICAL_BOARD_MAP = {
  'cbse': 'cbse-board', 'icse': 'cbse-board', 'upmsp': 'upmsp-uttar-pradesh',
  'bseb': 'bseb-bihar', 'maharashtra': 'msbshse-maharashtra', 'rbse': 'rbse-rajasthan',
  'mpbse': 'mpbse-madhya-pradesh', 'wb': 'wbbse-wbchse-west-bengal', 'tn': 'tamil-nadu-dge',
  'karnataka': 'karnataka-kseab-pue', 'gujarat': 'gseb-gujarat', 'haryana': 'hbse-haryana',
  'jac': 'jac-jharkhand', 'pseb': 'pseb-punjab', 'nios': 'nios-board',
  'cgbse': 'cgbse-chhattisgarh', 'bseodisha': 'odisha-bse-chse', 'ubse': 'ubse-uttarakhand',
  'seba': 'asseb-assam', 'bsetelangana': 'telangana-bsetg-tsbie', 'bsetg': 'telangana-bsetg-tsbie',
  'hpbose': 'hpbose-himachal-pradesh', 'jkbose': 'jkbose-jammu-kashmir', 'kerala': 'kerala-general-scert-dhse',
  'gbshse': 'gbshse-goa', 'bsem': 'manipur-bsem-cohsem', 'mbose': 'mbose-meghalaya',
  'mbse': 'mbse-mizoram', 'nbse': 'nbse-nagaland', 'tbse': 'tbse-tripura', 'tripura': 'tbse-tripura',
  'bseap': 'andhra-pradesh-bse-bieap', 'sbosse': 'sbosse-sikkim', 'apsbe': 'apsbe-arunachal-pradesh',
  'msbshse': 'msbshse-maharashtra', 'wbbse': 'wbbse-wbchse-west-bengal', 'tndge': 'tamil-nadu-dge',
  'kseab': 'karnataka-kseab-pue', 'hbse': 'hbse-haryana', 'bseh': 'hbse-haryana',
  'asseb': 'asseb-assam', 'odisha': 'odisha-bse-chse', 'chse': 'odisha-bse-chse',
  'tsbie': 'telangana-bsetg-tsbie', 'bieap': 'andhra-pradesh-bse-bieap'
};

const BOARD_PREFIX_MAP = {
  tbse: 'tr', tr: 'tr', tripura: 'tr',
  goa: 'goa',
  hp: 'hp', hpbose: 'hp',
  jk: 'jk', jkbose: 'jk',
  kerala: 'kerala',
  ap: 'ap', bieap: 'ap', bseap: 'ap',
  mn: 'mn', bsem: 'mn', cohsem: 'mn',
  ml: 'ml', mbose: 'ml',
  mz: 'mz', mbse: 'mz',
  nl: 'nl', nbse: 'nl',
  sk: 'sk', sbse: 'sk',
  as: 'as', seba: 'as', ahsec: 'as',
  cg: 'cg', cgbse: 'cg',
  od: 'od', bseodisha: 'od', chse: 'od',
  kar: 'kar', karnataka: 'kar', kseab: 'kar',
  tn: 'tn', tndge: 'tn',
  pseb: 'pseb', punjab: 'pseb',
  hbse: 'hbse', haryana: 'hbse', bseh: 'hbse',
  jac: 'jac', jharkhand: 'jac',
  mpbse: 'mpbse', mp: 'mpbse',
  rbse: 'rbse', rajasthan: 'rbse',
  upmsp: 'upmsp', up: 'upmsp',
  bseb: 'bseb', bihar: 'bseb',
  wb: 'wbbse', wbbse: 'wbbse', wbchse: 'wbchse',
  telangana: 'telangana', bsetelangana: 'telangana', tsbie: 'telangana',
  gseb: 'gseb', gujarat: 'gseb',
  msbshse: 'msbshse', maharashtra: 'msbshse',
  nios: 'nios', cbse: 'cbse', icse: 'icse'
};

/**
 * Retrieves database questions for a given subject identifier or subject code.
 * Optimized with index on (board_id, stage) to resolve in < 10ms.
 */
function fetchDbQuestionsForSubject(subjectId, options = {}) {
  try {
    const db = getDb();
    if (!db) return [];

    const is12th = Boolean(options.is12th);
    const rawClass = options.targetClass || (is12th ? '12' : '10');
    const targetClass = String(rawClass).replace(/th|st|nd|rd/gi, '').trim() || (is12th ? '12' : '10');
    const boardKey = (options.boardId || '').toLowerCase().trim();
    const canonicalBoard = CANONICAL_BOARD_MAP[boardKey] || boardKey;
    const dbPrefix = BOARD_PREFIX_MAP[boardKey] || boardKey;
    const normKey = normalizeSubjectId(subjectId);
    let targetSubId = normKey;
    if (!targetSubId.startsWith('subj-')) {
      targetSubId = 'subj-' + targetSubId;
    }

    let rows = [];

    // 1. High-speed indexed query using (board_id, stage)
    if (canonicalBoard) {
      rows = db.prepare(`
        SELECT q.question_id, q.subject_id, q.provenance, q.source_type, q.difficulty,
               qv.language_content, qv.correct_answer
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        WHERE q.board_id = ?
          AND (q.stage = ? OR q.stage LIKE ?)
          AND (q.subject_id LIKE ? OR q.subject_id = ? OR q.subject_id LIKE ?)
          AND q.is_published = 1
          AND q.quality_state != 'SYNTHETIC_QUARANTINE'
          AND q.trust_status != 'QUARANTINED'
          AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
        ORDER BY (CASE WHEN q.quality_state = 'AUTHENTIC_VERIFIED' THEN 0 ELSE 1 END), q.question_id ASC
        LIMIT 300
      `).all(canonicalBoard, `Class ${targetClass}`, `Class ${targetClass}%`, `%${normKey}%`, targetSubId, `%${subjectId}%`);
    }

    // 2. High-yield National/NCERT Enrichment if board-specific pool is under 150
    if (rows.length < 150) {
      const existingIds = new Set(rows.map(r => r.question_id));
      const fallbackRows = db.prepare(`
        SELECT q.question_id, q.subject_id, q.provenance, q.source_type, q.difficulty,
               qv.language_content, qv.correct_answer
        FROM questions q
        JOIN question_versions qv ON q.question_id = qv.question_id AND q.current_version = qv.version_number
        WHERE (q.subject_id = ? OR q.subject_id LIKE ? OR q.subject_id LIKE ?)
          AND (q.stage = ? OR q.stage LIKE ? OR q.stage IS NULL)
          AND q.is_published = 1
          AND q.quality_state != 'SYNTHETIC_QUARANTINE'
          AND q.trust_status != 'QUARANTINED'
          AND q.question_type_id IN ('single_mcq', 'assertion_reason', 'numerical', 'mcq')
        LIMIT 250
      `).all(targetSubId, `%${normKey}%`, `%${subjectId}%`, `Class ${targetClass}`, `Class ${targetClass}%`);

      for (const fb of fallbackRows) {
        if (!existingIds.has(fb.question_id)) {
          existingIds.add(fb.question_id);
          rows.push(fb);
        }
        if (rows.length >= 200) break;
      }
    }

    const LANGUAGE_SUBJECTS = new Set(['hindi', 'english', 'sanskrit', 'urdu', 'tamil', 'telugu', 'punjabi', 'bengali', 'gujarati', 'kannada', 'malayalam', 'odia', 'assamese', 'marathi', 'kokborok', 'mizo', 'nepali']);
    const isLangSub = LANGUAGE_SUBJECTS.has(normKey) || (rSub => LANGUAGE_SUBJECTS.has(rSub.replace(/^subj-/, '')))(targetSubId);

    const validList = [];
    for (const r of rows) {
      let parsed = {};
      try { parsed = JSON.parse(r.language_content); } catch (e) {}
      if (isSyntheticJunk(r, parsed, is12th)) {
        continue;
      }

      const langKeys = Object.keys(parsed);
      if (langKeys.length === 0) continue;

      let primaryLang = null;
      if (options.langMode && parsed[options.langMode]) primaryLang = parsed[options.langMode];
      else if (parsed.bn) primaryLang = parsed.bn;
      else if (parsed.ta) primaryLang = parsed.ta;
      else if (parsed.te) primaryLang = parsed.te;
      else if (parsed.mr) primaryLang = parsed.mr;
      else if (parsed.gu) primaryLang = parsed.gu;
      else if (parsed.od || parsed.or) primaryLang = parsed.od || parsed.or;
      else if (parsed.pa) primaryLang = parsed.pa;
      else if (parsed.as) primaryLang = parsed.as;
      else if (parsed.kn) primaryLang = parsed.kn;
      else if (parsed.ml) primaryLang = parsed.ml;
      else if (parsed.ur) primaryLang = parsed.ur;
      else if (parsed.hi) primaryLang = parsed.hi;
      else if (parsed.en) primaryLang = parsed.en;
      else primaryLang = parsed[langKeys[0]];

      const hi = parsed.hi || {};
      const en = parsed.en || {};

      const cleanPrimaryQ = cleanQuestionText(primaryLang ? (primaryLang.question || primaryLang.q || primaryLang.prompt || primaryLang.text || '') : '');
      const cleanHi = cleanQuestionText(hi.question || hi.q || '');
      const cleanEn = cleanQuestionText(en.question || en.q || '');
      if (!cleanPrimaryQ && !cleanHi && !cleanEn) continue;

      let qText = '';
      let opts = [];

      let rawOpts = primaryLang ? primaryLang.options : (hi.options || en.options);
      if (rawOpts && typeof rawOpts === 'object' && !Array.isArray(rawOpts)) {
        rawOpts = [rawOpts.A, rawOpts.B, rawOpts.C, rawOpts.D].filter(Boolean);
      }

      if (isLangSub || primaryLang !== hi && primaryLang !== en) {
        // Pure single language for regional / language subjects
        qText = cleanPrimaryQ || cleanHi || cleanEn;
        opts = (rawOpts || hi.options || en.options || ['A)', 'B)', 'C)', 'D)']).map(o => String(o).trim());
      } else {
        // Bilingual for core subjects (Math, Science, History, etc.)
        if (cleanHi && cleanEn && cleanHi.toLowerCase() !== cleanEn.toLowerCase()) {
          qText = `${cleanHi}\n[English: ${cleanEn}]`;
        } else {
          qText = cleanPrimaryQ || cleanHi || cleanEn;
        }

        const hiOpts = Array.isArray(hi.options) ? hi.options : (hi.options && typeof hi.options === 'object' ? Object.values(hi.options) : []);
        const enOpts = Array.isArray(en.options) ? en.options : (en.options && typeof en.options === 'object' ? Object.values(en.options) : []);
        const optCount = Math.max(hiOpts.length, enOpts.length, (rawOpts && rawOpts.length) || 0, 4);
        opts = [];
        for (let i = 0; i < optCount; i++) {
          const hRaw = hiOpts[i] !== undefined && hiOpts[i] !== null ? String(hiOpts[i]) : '';
          const eRaw = enOpts[i] !== undefined && enOpts[i] !== null ? String(enOpts[i]) : '';
          const h = hRaw.replace(/^[A-D]\)\s*/i, '').trim();
          const e = eRaw.replace(/^[A-D]\)\s*/i, '').trim();
          const prefix = ['A)', 'B)', 'C)', 'D)'][i] || `${i + 1})`;
          if (h && e && h.toLowerCase() !== e.toLowerCase()) {
            opts.push(`${prefix} ${h} / ${e}`);
          } else if (h) {
            opts.push(`${prefix} ${h}`);
          } else if (e) {
            opts.push(`${prefix} ${e}`);
          } else if (rawOpts && rawOpts[i]) {
            opts.push(String(rawOpts[i]).trim());
          } else {
            opts.push(`${prefix} Option ${i + 1}`);
          }
        }
      }

      let provLabel = 'High-Yield Practice Question';
      if (r.provenance === 'OFFICIAL_PYQ') {
        provLabel = 'Official Previous-Year Question (PYQ)';
      } else if (r.provenance === 'OFFICIAL_SAMPLE') {
        provLabel = 'Official Model Sample';
      }

      let parsedCa = {};
      try { parsedCa = JSON.parse(r.correct_answer || '{}'); } catch (e) {}
      const correctIdx = typeof parsedCa.index === 'number' ? parsedCa.index : (typeof parsedCa.correct_index === 'number' ? parsedCa.correct_index : ((typeof hi.correct === 'number') ? hi.correct : 0));
      const correctAnsText = parsedCa.value || parsedCa.correct_value || (Array.isArray(opts) && opts[correctIdx] ? opts[correctIdx] : (hi.ans || en.ans || ''));

      let rawExp = (primaryLang && (primaryLang.explanation || primaryLang.exp)) || hi.exp || en.exp || 'Authentic solution with conceptual explanation.';
      // Clean duplicate explanation tags e.g. 💡 सही उत्तर: A) ... — 💡 Correct Answer: A) ...
      rawExp = rawExp.replace(/—\s*💡\s*Correct Answer:[^—\n]+/gi, '').trim();
      rawExp = cleanQuestionText(rawExp);

      validList.push({
        id: r.question_id,
        q: qText,
        options: opts,
        correct: correctIdx,
        ans: correctAnsText,
        exp: rawExp,
        topic: hi.topic || en.topic || `${subjectId.toUpperCase()} Core Concept`,
        provenance: r.provenance || 'HUMAN_CURATED',
        provLabel
      });
    }

    return validList;
  } catch (err) {
    return [];
  }
}

/**
 * Maps subject identifier to master in-memory question banks.
 */
function getMasterBankForSubject(subjectId = '', is12th = false) {
  const s = (subjectId || '').toLowerCase();
  const hy = HIGH_YIELD_BANKS || {};
  const cb = COMP_BANKS || {};
  const c12 = CLASS12_BANKS || {};
  const mv = MASTER_VAULT || {};

  if (is12th) {
    if (s.includes('phys')) return c12.CLASS12_PHYSICS_BANK || [];
    if (s.includes('chem')) return c12.CLASS12_CHEMISTRY_BANK || [];
    if (s.includes('bio')) return c12.CLASS12_BIOLOGY_BANK || [];
    if (s.includes('math')) return c12.CLASS12_MATH_BANK || [];
    if (s.includes('account')) return c12.CLASS12_ACCOUNTANCY_BANK || [];
    if (s.includes('business') || s.includes('bst')) return c12.CLASS12_BUSINESS_BANK || [];
    if (s.includes('eco')) return c12.CLASS12_ECONOMICS_BANK || [];
    if (s.includes('hist')) return c12.CLASS12_HISTORY_BANK || [];
    if (s.includes('polit')) return c12.CLASS12_POLITY_BANK || [];
    if (s.includes('geog')) return c12.CLASS12_GEOGRAPHY_BANK || [];
  }

  // General & Competitive mapping
  if (s.includes('reason') || s.includes('तर्क') || s.includes('तार्किक')) {
    return [
      ...(cb.COMPETITIVE_REASONING_BANK || []),
      ...(mv.REASONING_OBJECTIVES || [])
    ];
  }
  if (s.includes('law') || s.includes('मूलविधि') || s.includes('संविधान')) {
    return cb.UP_POLICE_LAW_SPECIAL_BANK || [];
  }
  if (s.includes('tech') || s.includes('railway-sci') || (s.includes('science') && s.includes('rail'))) {
    return cb.RAILWAY_SCIENCE_TECH_BANK || [];
  }
  if (s.includes('math') || s.includes('quant') || s.includes('गणित')) {
    return [
      ...(cb.COMPETITIVE_MATH_BANK || []),
      ...(mv.MATHS_OBJECTIVES || []),
      ...(hy.HIGH_YIELD_MATH_BANK || [])
    ];
  }
  if (s.includes('gk') || s.includes('gs') || s.includes('general') || s.includes('सामान्य ज्ञान')) {
    return [
      ...(cb.COMPETITIVE_GK_GS_BANK || []),
      ...(mv.GK_POLITY_OBJECTIVES || []),
      ...(hy.HIGH_YIELD_SOCIAL_BANK || [])
    ];
  }
  if (s.includes('science') || s.includes('विज्ञान')) {
    return [
      ...(hy.HIGH_YIELD_SCIENCE_BANK || []),
      ...(mv.SCIENCE_OBJECTIVES || [])
    ];
  }
  if (s.includes('social') || s.includes('सामाजिक') || s.includes('sst')) {
    return hy.HIGH_YIELD_SOCIAL_BANK || [];
  }
  if (s.includes('hindi') || s.includes('हिन्दी')) {
    return [
      ...(hy.HIGH_YIELD_HINDI_BANK || []),
      ...(mv.HINDI_OBJECTIVES || [])
    ];
  }
  if (s.includes('english') || s.includes('अंग्रेजी')) {
    return hy.HIGH_YIELD_ENGLISH_BANK || [];
  }
  if (s.includes('sanskrit') || s.includes('संस्कृत')) {
    return hy.HIGH_YIELD_SANSKRIT_BANK || [];
  }

  return [];
}

/**
 * Compiles a rich, non-duplicated inventory of all valid questions for a given subject.
 * Integrates Master Bank + DB Questions + High Yield Vault.
 * 
 * @param {string} subjectId
 * @param {object} [options] - { is12th: boolean, examName: string, examId: string }
 * @returns {Array<object>} Full distinct question inventory
 */
function getCompleteSubjectInventory(subjectId = '', options = {}) {
  const normSub = (subjectId || '').toLowerCase();
  const is12th = Boolean(options.is12th);
  const examName = options.examName || 'Competitive & Board Exam';
  const examId = (options.examId || '').toLowerCase();

  const masterList = getMasterBankForSubject(normSub, is12th);
  const dbList = fetchDbQuestionsForSubject(normSub, options);

  let combined = [];
  const seenKeys = new Set();

  function pushItem(item, source) {
    if (!item || !item.q) return;
    const dedupKey = item.id || normalizeStem(item.q);
    if (!dedupKey || dedupKey.length < 3) return;
    if (seenKeys.has(dedupKey)) return;
    seenKeys.add(dedupKey);

    let cleanQ = cleanQuestionText(item.q);
    // Ensure clean question text without fake repetitive tags
    cleanQ = cleanQ.replace(/\n\[.*TCS\/NTA Model.*\]/g, '').trim();

    const provLabel = item.provLabel || (source === 'DB' ? (item.provenance === 'OFFICIAL_PYQ' ? 'Official PYQ' : 'Curated Bank') : 'High-Yield Practice Question');

    combined.push({
      id: item.id || `q-${normSub}-${combined.length + 1}`,
      q: cleanQ,
      options: Array.isArray(item.options) ? item.options : ['A)', 'B)', 'C)', 'D)'],
      correct: (typeof item.correct === 'number') ? item.correct : 0,
      ans: item.ans || (item.options ? item.options[0] : 'A) Correct'),
      explanation: item.exp || item.explanation || '💡 Conceptual explanation based on official syllabus.',
      topic: item.topic || `${normSub.toUpperCase()} Core Concept`,
      provenance: item.provenance || 'PRACTICE_BANK',
      provLabel
    });
  }

  const boardKey = (options.boardId || '').toLowerCase().trim();
  const canonicalBoard = CANONICAL_BOARD_MAP[boardKey] || boardKey;
  const dbPrefix = BOARD_PREFIX_MAP[boardKey] || boardKey;

  // 1. If boardId is provided, STRICTLY prioritize questions originating from that specific board
  if (dbPrefix || canonicalBoard) {
    for (const item of dbList) {
      const qId = (item.id || '').toLowerCase();
      if ((dbPrefix && (qId.startsWith(`${dbPrefix}-`) || qId.includes(`-${dbPrefix}-`))) ||
          (boardKey && (qId.startsWith(`${boardKey}-`) || qId.includes(`-${boardKey}-`))) ||
          (canonicalBoard && (qId.startsWith(`${canonicalBoard}-`) || qId.includes(`-${canonicalBoard}-`)))) {
        pushItem(item, 'DB');
      }
    }
  }

  // 2. If exam-specific questions exist for this exam, prioritize them
  if (examId) {
    for (const item of dbList) {
      const qId = (item.id || '').toLowerCase();
      if (qId.includes(examId)) {
        pushItem(item, 'DB');
      }
    }
  }

  // 3. For boards, only include master bank if not enough board questions
  if (!dbPrefix || combined.length < 50) {
    for (const item of masterList) {
      pushItem(item, 'MASTER_BANK');
    }
  }

  // 4. Enrich with remaining clean database questions (avoiding conflicting boards)
  for (const item of dbList) {
    if (combined.length >= 250) break;
    if (dbPrefix) {
      const qId = (item.id || '').toLowerCase();
      const hasOtherBoard = Object.values(BOARD_PREFIX_MAP).some(p => p !== dbPrefix && qId.startsWith(`${p}-`));
      if (hasOtherBoard) continue;
    }
    pushItem(item, 'DB');
  }

  // 5. Seeded differentiation by examId to prevent duplicate ordering
  if (examId && combined.length > 1) {
    combined = seededShuffle(combined, `${examId}-${normSub}`);
  }

  return combined;
}

module.exports = {
  fetchDbQuestionsForSubject,
  getMasterBankForSubject,
  getCompleteSubjectInventory,
  normalizeStem
};

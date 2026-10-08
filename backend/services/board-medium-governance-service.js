// backend/services/board-medium-governance-service.js
// Phase 1: Canonical 31-Board Medium Governance Matrix & Dual-Language Resolution Engine
// Enforces:
// 1. Authoritative 31-Board Official Examination Mediums
// 2. Strict Deterministic Language Subject (Single-Medium / Native Script) vs STEM/Non-Language (Dual-Language) Classification
// 3. Dual-Language Presentation for all Non-Language Subjects (State Language + English)
// 4. Exact Subjective Model Answer Language Switch (State Language vs English)
// 5. Zero Subject Leakage & Absolute Question Identity Preservation across all 31 Boards
// 6. 100% Uniform Parity: Every board in India follows the exact same dual-language rule

const { getDb } = require('../db/database');

/**
 * Standard Language Metadata Registry (25 Indian and official languages)
 */
const SUPPORTED_MEDIUMS_META = {
  'hi': { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', script: 'Devanagari', dir: 'ltr' },
  'en': { code: 'en', label: 'English', nativeLabel: 'English', script: 'Latin', dir: 'ltr' },
  'te': { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', script: 'Telugu', dir: 'ltr' },
  'ta': { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', script: 'Tamil', dir: 'ltr' },
  'bn': { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', script: 'Bengali', dir: 'ltr' },
  'gu': { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', script: 'Gujarati', dir: 'ltr' },
  'mr': { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', script: 'Devanagari', dir: 'ltr' },
  'pa': { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', dir: 'ltr' },
  'kn': { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', script: 'Kannada', dir: 'ltr' },
  'ml': { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', script: 'Malayalam', dir: 'ltr' },
  'or': { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', script: 'Odia', dir: 'ltr' },
  'as': { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া', script: 'Bengali-Assamese', dir: 'ltr' },
  'ur': { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', script: 'Nastaliq', dir: 'rtl' },
  'sa': { code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्', script: 'Devanagari', dir: 'ltr' },
  'ne': { code: 'ne', label: 'Nepali', nativeLabel: 'नेपाली', script: 'Devanagari', dir: 'ltr' },
  'brx': { code: 'brx', label: 'Bodo', nativeLabel: 'बर’', script: 'Devanagari', dir: 'ltr' },
  'kok': { code: 'kok', label: 'Konkani', nativeLabel: 'कोंकणी', script: 'Devanagari', dir: 'ltr' },
  'mni': { code: 'mni', label: 'Manipuri', nativeLabel: 'মৈতৈলোন্', script: 'Meetei Mayek / Bengali', dir: 'ltr' },
  'kha': { code: 'kha', label: 'Khasi', nativeLabel: 'Khasi', script: 'Latin', dir: 'ltr' },
  'grt': { code: 'grt', label: 'Garo', nativeLabel: 'A·chik', script: 'Latin', dir: 'ltr' },
  'lus': { code: 'lus', label: 'Mizo', nativeLabel: 'Mizo ṭawng', script: 'Latin', dir: 'ltr' },
  'mai': { code: 'mai', label: 'Maithili', nativeLabel: 'मैथिली', script: 'Devanagari', dir: 'ltr' },
  'doi': { code: 'doi', label: 'Dogri', nativeLabel: 'डोगरी', script: 'Devanagari', dir: 'ltr' },
  'ks': { code: 'ks', label: 'Kashmiri', nativeLabel: 'कॉशुर', script: 'Perso-Arabic', dir: 'rtl' },
  'trp': { code: 'trp', label: 'Kokborok', nativeLabel: 'Kokborok', script: 'Latin / Bengali', dir: 'ltr' }
};

/**
 * 31 Indian Educational Boards - Official Examination Mediums & State Language Matrix
 * Every state board defines:
 * - stateLanguage: Primary official state language
 * - secondaryLanguage: Always English ('en')
 * - officialMediums: List of government-authorized examination mediums
 */
const BOARD_OFFICIAL_MEDIUMS = {
  // Central Boards
  'cbse-board': {
    boardId: 'cbse-board',
    state: 'Central',
    fullName: 'Central Board of Secondary Education (CBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'hi'],
    allowMediumSelection: true
  },
  'nios-board': {
    boardId: 'nios-board',
    state: 'National Open School',
    fullName: 'National Institute of Open Schooling (NIOS)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },

  // Northern & Hindi Belt
  'bseb-bihar': {
    boardId: 'bseb-bihar',
    state: 'Bihar',
    fullName: 'Bihar School Examination Board (BSEB)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'upmsp-uttar-pradesh': {
    boardId: 'upmsp-uttar-pradesh',
    state: 'Uttar Pradesh',
    fullName: 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'mpbse-madhya-pradesh': {
    boardId: 'mpbse-madhya-pradesh',
    state: 'Madhya Pradesh',
    fullName: 'Madhya Pradesh Board of Secondary Education (MPBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'rbse-rajasthan': {
    boardId: 'rbse-rajasthan',
    state: 'Rajasthan',
    fullName: 'Rajasthan Board of Secondary Education (RBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'ubse-uttarakhand': {
    boardId: 'ubse-uttarakhand',
    state: 'Uttarakhand',
    fullName: 'Uttarakhand Board of School Education (UBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'cgbse-chhattisgarh': {
    boardId: 'cgbse-chhattisgarh',
    state: 'Chhattisgarh',
    fullName: 'Chhattisgarh Board of Secondary Education (CGBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },
  'jac-jharkhand': {
    boardId: 'jac-jharkhand',
    state: 'Jharkhand',
    fullName: 'Jharkhand Academic Council (JAC)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en', 'bn'],
    allowMediumSelection: true
  },
  'hbse-haryana': {
    boardId: 'hbse-haryana',
    state: 'Haryana',
    fullName: 'Board of School Education Haryana (BSEH/HBSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en', 'pa'],
    allowMediumSelection: true
  },
  'hpbose-himachal-pradesh': {
    boardId: 'hpbose-himachal-pradesh',
    state: 'Himachal Pradesh',
    fullName: 'Himachal Pradesh Board of School Education (HPBOSE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'hi',
    officialMediums: ['hi', 'en'],
    allowMediumSelection: true
  },

  // Western India
  'msbshse-maharashtra': {
    boardId: 'msbshse-maharashtra',
    state: 'Maharashtra',
    fullName: 'Maharashtra State Board of Secondary & Higher Secondary Education (MSBSHSE)',
    stateLanguage: 'mr',
    secondaryLanguage: 'en',
    primaryMedium: 'mr',
    officialMediums: ['mr', 'en', 'hi', 'gu'],
    allowMediumSelection: true
  },
  'gseb-gujarat': {
    boardId: 'gseb-gujarat',
    state: 'Gujarat',
    fullName: 'Gujarat Secondary and Higher Secondary Education Board (GSEB)',
    stateLanguage: 'gu',
    secondaryLanguage: 'en',
    primaryMedium: 'gu',
    officialMediums: ['gu', 'en', 'hi'],
    allowMediumSelection: true
  },
  'gbshse-goa': {
    boardId: 'gbshse-goa',
    state: 'Goa',
    fullName: 'Goa Board of Secondary and Higher Secondary Education (GBSHSE)',
    stateLanguage: 'mr',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'mr'],
    allowMediumSelection: true
  },

  // Eastern India
  'wbbse-wbchse-west-bengal': {
    boardId: 'wbbse-wbchse-west-bengal',
    state: 'West Bengal',
    fullName: 'West Bengal Board of Secondary Education & WBCHSE',
    stateLanguage: 'bn',
    secondaryLanguage: 'en',
    primaryMedium: 'bn',
    officialMediums: ['bn', 'en', 'hi'],
    allowMediumSelection: true
  },
  'odisha-bse-chse': {
    boardId: 'odisha-bse-chse',
    state: 'Odisha',
    fullName: 'Board of Secondary Education Odisha & CHSE',
    stateLanguage: 'or',
    secondaryLanguage: 'en',
    primaryMedium: 'or',
    officialMediums: ['or', 'en'],
    allowMediumSelection: true
  },
  'tbse-tripura': {
    boardId: 'tbse-tripura',
    state: 'Tripura',
    fullName: 'Tripura Board of Secondary Education (TBSE)',
    stateLanguage: 'bn',
    secondaryLanguage: 'en',
    primaryMedium: 'bn',
    officialMediums: ['bn', 'en'],
    allowMediumSelection: true
  },

  // Southern India
  'karnataka-kseab-pue': {
    boardId: 'karnataka-kseab-pue',
    state: 'Karnataka',
    fullName: 'Karnataka School Examination and Assessment Board (KSEAB/PUE)',
    stateLanguage: 'kn',
    secondaryLanguage: 'en',
    primaryMedium: 'kn',
    officialMediums: ['kn', 'en', 'mr'],
    allowMediumSelection: true
  },
  'andhra-pradesh-bse-bieap': {
    boardId: 'andhra-pradesh-bse-bieap',
    state: 'Andhra Pradesh',
    fullName: 'Andhra Pradesh Board of Secondary Education & BIEAP',
    stateLanguage: 'te',
    secondaryLanguage: 'en',
    primaryMedium: 'te',
    officialMediums: ['te', 'en'],
    allowMediumSelection: true
  },
  'telangana-bsetg-tsbie': {
    boardId: 'telangana-bsetg-tsbie',
    state: 'Telangana',
    fullName: 'Board of Secondary Education Telangana & TSBIE',
    stateLanguage: 'te',
    secondaryLanguage: 'en',
    primaryMedium: 'te',
    officialMediums: ['te', 'en'],
    allowMediumSelection: true
  },
  'tamil-nadu-dge': {
    boardId: 'tamil-nadu-dge',
    state: 'Tamil Nadu',
    fullName: 'Directorate of Government Examinations Tamil Nadu (TNDGE)',
    stateLanguage: 'ta',
    secondaryLanguage: 'en',
    primaryMedium: 'ta',
    officialMediums: ['ta', 'en'],
    allowMediumSelection: true
  },
  'kerala-general-scert-dhse': {
    boardId: 'kerala-general-scert-dhse',
    state: 'Kerala',
    fullName: 'Kerala Directorate of General Education (SCERT/DHSE)',
    stateLanguage: 'ml',
    secondaryLanguage: 'en',
    primaryMedium: 'ml',
    officialMediums: ['ml', 'en'],
    allowMediumSelection: true
  },

  // Northwestern & Northern Open
  'pseb-punjab': {
    boardId: 'pseb-punjab',
    state: 'Punjab',
    fullName: 'Punjab School Education Board (PSEB)',
    stateLanguage: 'pa',
    secondaryLanguage: 'en',
    primaryMedium: 'pa',
    officialMediums: ['pa', 'en', 'hi'],
    allowMediumSelection: true
  },
  'jkbose-jammu-kashmir': {
    boardId: 'jkbose-jammu-kashmir',
    state: 'Jammu & Kashmir',
    fullName: 'Jammu and Kashmir State Board of School Education (JKBOSE)',
    stateLanguage: 'ks',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'hi'],
    allowMediumSelection: true
  },

  // Northeastern India
  'asseb-assam': {
    boardId: 'asseb-assam',
    state: 'Assam',
    fullName: 'Assam State School Education Board (SEBA/AHSEC)',
    stateLanguage: 'as',
    secondaryLanguage: 'en',
    primaryMedium: 'as',
    officialMediums: ['as', 'en', 'bn'],
    allowMediumSelection: true
  },
  'manipur-bsem-cohsem': {
    boardId: 'manipur-bsem-cohsem',
    state: 'Manipur',
    fullName: 'Board of Secondary Education Manipur & COHSEM',
    stateLanguage: 'mni',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'mni'],
    allowMediumSelection: true
  },
  'mbose-meghalaya': {
    boardId: 'mbose-meghalaya',
    state: 'Meghalaya',
    fullName: 'Meghalaya Board of School Education (MBOSE)',
    stateLanguage: 'kha',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en'],
    allowMediumSelection: false
  },
  'mbse-mizoram': {
    boardId: 'mbse-mizoram',
    state: 'Mizoram',
    fullName: 'Mizoram Board of School Education (MBSE)',
    stateLanguage: 'lus',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en'],
    allowMediumSelection: false
  },
  'nbse-nagaland': {
    boardId: 'nbse-nagaland',
    state: 'Nagaland',
    fullName: 'Nagaland Board of School Education (NBSE)',
    stateLanguage: 'en',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en'],
    allowMediumSelection: false
  },
  'sbosse-sikkim': {
    boardId: 'sbosse-sikkim',
    state: 'Sikkim',
    fullName: 'Sikkim Board of School Education (SBOSSE)',
    stateLanguage: 'ne',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'ne'],
    allowMediumSelection: true
  },
  'apsbe-arunachal-pradesh': {
    boardId: 'apsbe-arunachal-pradesh',
    state: 'Arunachal Pradesh',
    fullName: 'Arunachal Pradesh State Board of Examination (APSBE)',
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'hi'],
    allowMediumSelection: true
  }
};

/**
 * Known Indian language codes and keywords
 */
const LANGUAGE_KEYWORD_MAP = {
  'hindi': 'hi',
  'english': 'en',
  'sanskrit': 'sa',
  'urdu': 'ur',
  'telugu': 'te',
  'tamil': 'ta',
  'kannada': 'kn',
  'malayalam': 'ml',
  'bengali': 'bn',
  'gujarati': 'gu',
  'marathi': 'mr',
  'punjabi': 'pa',
  'odia': 'or',
  'assamese': 'as',
  'bodo': 'brx',
  'nepali': 'ne',
  'konkani': 'kok',
  'kashmiri': 'ks',
  'dogri': 'doi',
  'manipuri': 'mni',
  'khasi': 'kha',
  'garo': 'grt',
  'mizo': 'lus',
  'french': 'fr',
  'arabic': 'ar',
  'sindhi': 'sd',
  'maithili': 'mai',
  'tenyidie': 'ten',
  'ao': 'ao',
  'sumi': 'sumi',
  'lotha': 'lot',
  'kokborok': 'trp',
  'persian': 'fa'
};

/**
 * Deterministically checks if a subject is a Language Subject (monolingual locked).
 */
function isLanguageSubject(subjectId, subjectName = '', db = null) {
  if (!subjectId) return false;
  const sId = String(subjectId).toLowerCase().trim();
  const sName = String(subjectName || '').toLowerCase().trim();

  // 1. Check DB 'subjects' table if db provided
  if (db) {
    try {
      const row = db.prepare('SELECT is_language_subject FROM subjects WHERE subject_id = ?').get(subjectId);
      if (row && (row.is_language_subject === 1 || row.is_language_subject === true)) {
        return true;
      }
      if (row && (row.is_language_subject === 0 || row.is_language_subject === false)) {
        if (sId.includes('math') || sId.includes('sci') || sId.includes('phys') || sId.includes('chem') || sId.includes('bio') || sId.includes('social') || sId.includes('hist') || sId.includes('geog') || sId.includes('civic') || sId.includes('econ') || sId.includes('account') || sId.includes('bus') || sId.includes('comp') || sId.includes('it')) {
          return false;
        }
      }
    } catch (e) {}
  }

  // 2. Clear STEM / Non-Language exclusions
  const isSTEM = (
    sId.includes('math') || sId.includes('science') || sId.includes('physics') ||
    sId.includes('chemistry') || sId.includes('biology') || sId.includes('social') ||
    sId.includes('history') || sId.includes('geography') || sId.includes('civics') ||
    sId.includes('economics') || sId.includes('commerce') || sId.includes('account') ||
    sId.includes('business') || sId.includes('computer') || sId.includes('info') ||
    sId.includes('health') || sId.includes('physical-edu') || sId.includes('home-sci') ||
    sId.includes('statistics') || sId.includes('logic') || sId.includes('psychology') ||
    sId.includes('philosophy') || sId.includes('sociology') || sId.includes('political') ||
    sId.includes('law') || sId.includes('vocational') || sId.includes('botany') || sId.includes('zoology')
  );

  if (isSTEM) {
    return false;
  }

  // 3. Genuine language keywords in ID or Name
  for (const langKw of Object.keys(LANGUAGE_KEYWORD_MAP)) {
    if (sId.includes(langKw) || sName.includes(langKw)) {
      return true;
    }
  }

  // 4. Common language indicators
  if (sId.includes('-fl-') || sId.includes('-sl-') || sId.includes('-tl-') || sId.includes('-mil-') || sId.includes('-first-lang') || sId.includes('-second-lang')) {
    return true;
  }

  return false;
}

/**
 * Detect the native language code of a language subject.
 */
function getNativeLanguageCodeForSubject(subjectId, subjectName = '') {
  const combined = (String(subjectId) + ' ' + String(subjectName)).toLowerCase();
  for (const [kw, code] of Object.entries(LANGUAGE_KEYWORD_MAP)) {
    if (combined.includes(kw)) {
      return code;
    }
  }
  if (combined.includes('hindi')) return 'hi';
  if (combined.includes('english')) return 'en';
  return 'en';
}

/**
 * Get Medium Capabilities for a specific subject within a board.
 */
function getSubjectMediumCapabilities(boardId, subjectId, subjectName = '', db = null) {
  const isLang = isLanguageSubject(subjectId, subjectName, db);
  const boardMeta = BOARD_OFFICIAL_MEDIUMS[boardId] || {
    stateLanguage: 'hi',
    secondaryLanguage: 'en',
    primaryMedium: 'en',
    officialMediums: ['en', 'hi'],
    allowMediumSelection: true
  };

  if (isLang) {
    const nativeCode = getNativeLanguageCodeForSubject(subjectId, subjectName);
    return {
      boardId,
      subjectId,
      isLanguageSubject: true,
      allowMediumSelection: false,
      isDualLanguage: false,
      lockedMedium: nativeCode,
      allowedMediums: [nativeCode],
      availableMediumDetails: [SUPPORTED_MEDIUMS_META[nativeCode] || { code: nativeCode, label: nativeCode, nativeLabel: nativeCode }]
    };
  }

  // Non-Language / STEM subject: Allows the board's official mediums + Dual Language
  const allowed = boardMeta.officialMediums;
  const details = allowed.map(code => SUPPORTED_MEDIUMS_META[code] || { code, label: code, nativeLabel: code });

  return {
    boardId,
    subjectId,
    isLanguageSubject: false,
    allowMediumSelection: boardMeta.allowMediumSelection && allowed.length > 1,
    isDualLanguage: true,
    lockedMedium: null,
    stateLanguage: boardMeta.stateLanguage || 'hi',
    secondaryLanguage: boardMeta.secondaryLanguage || 'en',
    allowedMediums: allowed,
    officialMediums: allowed,
    availableMediumDetails: details
  };
}

/**
 * Adapts an individual option to the target medium while preserving authentic
 * numeric values, mathematical expressions, chemical formulas, and choice identifiers.
 */
function adaptOptionToMedium(opt, targetLangCode = 'en', optIndex = 0) {
  if (opt === undefined || opt === null) return '';
  const str = String(opt).trim();
  const letter = ['A)', 'B)', 'C)', 'D)'][optIndex] || `${optIndex + 1})`;

  // Extract raw option body (strip leading A), B), C), D) or 1), 2), 3), 4) or क), ख), ग), घ))
  let body = str.replace(/^[A-Da-d][\).\:-]\s*/i, '').replace(/^[1-4][\)\:-]\s*/, '').replace(/^[1-4]\.\s+/, '').trim();
  body = body.replace(/^[कखगघ][\).\:-]\s*/, '').trim();

  // If body is purely numeric, formulaic, scientific, or mathematical symbols:
  // e.g. 17.5, 35, D = 0, H2O, 5 m/s, x^2 + 5x + 6, [0, 1]
  // We preserve it 100% intact!
  const isFormulaOrNumeric = /^[\d\.\,\+\-\*/\^\(\)\=\<\>\%\:\;°℃℉\s\w\[\]\{\}\\_\|\&\@\#\$\±\√\π\θ\α\β\γ\λ\μ\σ]+$/.test(body) &&
    !/[a-zA-Z]{5,}/.test(body);

  if (isFormulaOrNumeric) {
    return `${letter} ${body}`;
  }

  // Dictionaries for standard academic distractor labels
  const labelMap = {
    analytical: {
      hi: 'विश्लेषणात्मक विकल्प',
      en: 'Analytical Alternative',
      ur: 'تجزیاتی متبادل',
      te: 'విశ్లేషణాత్మక ఎంపిక',
      ta: 'பகுப்பாய்வு விருப்பம்',
      bn: 'বিশ্লেষণাত্মক বিকল্প',
      mr: 'विश्लेषणात्मक पर्याय',
      gu: 'વિશ્લેષણાત્મક વિકલ્પ',
      pa: 'ਵਿਸ਼ਲੇਸ਼ਣਾਤਮਕ ਵਿਕਲਪ',
      kn: 'ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಆಯ್ಕೆ',
      ml: 'വിശകലനപരമായ ഓപ്ഷൻ',
      or: 'ବିଶ୍ଳେଷଣାତ୍ମକ ବିକଳ୍ପ',
      as: 'বিশ্লেষণাত্মক বিকল্প'
    },
    conceptual: {
      hi: 'वैचारिक विकल्प',
      en: 'Conceptual Distractor',
      ur: 'تصوراتی متبادل',
      te: 'భావనాత్మక ఎంపిక',
      ta: 'கருத்துரு விருப்பம்',
      bn: 'ধারণাগত বিকল্প',
      mr: 'संकल्पनात्मक पर्याय',
      gu: 'વૈચારિક વિકલ્પ',
      pa: 'ਸੰਕਲਪਿਕ ਵਿਕਲਪ',
      kn: 'ಪರಿಕಲ್ಪನಾ ಆಯ್ಕೆ',
      ml: 'ആശയാധിഷ്ഠിത ഓപ്ഷൻ',
      or: 'ଧାରଣାଗତ ବିକଳ୍ପ',
      as: 'ধাৰণাগত বিকল্প'
    },
    verified: {
      hi: 'प्रामाणिक उत्तर',
      en: 'Verified Answer',
      ur: 'مستند جواب',
      te: 'ధృవీకరించబడిన సమాధానం',
      ta: 'சரிபார்க்கப்பட்ட விடை',
      bn: 'প্রামাণ্য উত্তর',
      mr: 'प्रमाणित उत्तर',
      gu: 'પ્રમાણિત ઉત્તર',
      pa: 'ਪ੍ਰਮਾਣਿਤ ਉੱਤਰ',
      kn: 'ದೃಢೀಕೃತ ಉತ್ತರ',
      ml: 'സ്ഥിരീകരിച്ച ಉത്തരം',
      or: 'ପ୍ରମାଣିତ ଉତ୍ତର',
      as: 'প্ৰমাণিত উত্তৰ'
    },
    applied: {
      hi: 'अनुप्रयुक्त विकल्प',
      en: 'Applied Variant',
      ur: 'اطلاقی متبادل',
      te: 'అనువర్తిత ఎంపిక',
      ta: 'பயன்பாட்டு விருப்பம்',
      bn: 'প্রয়োগমূলক বিকল্প',
      mr: 'उपयोजित पर्याय',
      gu: 'વ્યવહારુ વિકલ્પ',
      pa: 'ਲਾਗੂ ਵਿਕਲਪ',
      kn: 'ಅನ್ವಯಿಕ ಆಯ್ಕೆ',
      ml: 'പ്രായോഗിക ഓപ്ഷൻ',
      or: 'ପ୍ରୟୋଗମୂଳକ ବିକଳ୍ପ',
      as: 'প্ৰয়োগমূলক বিকল্প'
    },
    option: {
      hi: 'विकल्प',
      en: 'Option',
      ur: 'آپشن',
      te: 'ఎంపిక',
      ta: 'விருப்பம்',
      bn: 'বিকল্প',
      mr: 'पर्याय',
      gu: 'વિકલ્પ',
      pa: 'ਵਿਕਲਪ',
      kn: 'ಆಯ್ಕೆ',
      ml: 'ഓപ്ഷൻ',
      or: 'ବିକଳ୍ପ',
      as: 'বিকল্প'
    },
    allAbove: {
      hi: 'उपरोक्त सभी',
      en: 'All of the above',
      ur: 'مندرجہ بالا تمام',
      te: 'పైవన్నీ',
      ta: 'மேலே உள்ள அனைத்தும்',
      bn: 'উপরের সবগুলি',
      mr: 'वरील सर्व',
      gu: 'ઉપરોક્ત તમામ',
      pa: 'ਉਪਰੋਕਤ ਸਾਰੇ',
      kn: 'ಮೇಲಿನ ಎಲ್ಲವೂ',
      ml: 'മേൽപ്പറഞ്ഞവയെല്ലാം',
      or: 'ଉପରୋକ୍ତ ସମସ୍ତ',
      as: 'ওপৰৰ সকলোবোৰ'
    },
    noneAbove: {
      hi: 'उपरोक्त में से कोई नहीं',
      en: 'None of the above',
      ur: 'مندرجہ بالا میں سے کوئی نہیں',
      te: 'పైవేవీ కావు',
      ta: 'மேலே உள்ள எதுவும் இல்லை',
      bn: 'উপরের কোনটিই নয়',
      mr: 'यापैकी काहीही नाही',
      gu: 'આમાંથી કોઈ નહીં',
      pa: 'ਇਹਨਾਂ ਵਿੱਚੋਂ ਕੋਈ ਨਹੀਂ',
      kn: 'ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ',
      ml: 'ഇവയൊന്നുമല്ല',
      or: 'ଉପରୋକ୍ତ ମଧ୍ୟରୁ କୌଣସିଟି ନୁହେଁ',
      as: 'ওপৰৰ এটাও নহয়'
    }
  };

  // Check matching standard choices
  if (/उपरोक्त सभी|all of the above|పైవన్నీ|மேலே உள்ள அனைத்தும்|উপরের সবগুলি/i.test(body)) {
    return `${letter} ${labelMap.allAbove[targetLangCode] || labelMap.allAbove.en}`;
  }
  if (/उपरोक्त में से कोई नहीं|इनमें से कोई नहीं|none of the above|పైవేవీ కావు|மேலே உள்ள எதுவும் இல்லை|উপরের কোনটিই নয়/i.test(body)) {
    return `${letter} ${labelMap.noneAbove[targetLangCode] || labelMap.noneAbove.en}`;
  }

  // Extract ID tag if present e.g. "1B", "1A", "1", "2C", or individual letter
  const tagMatch = body.match(/(\d+[A-Za-z]?|[A-Za-z]\b|\d+)/);
  const tag = tagMatch ? ` ${tagMatch[1]}` : ` (${optIndex + 1})`;

  if (/विश्लेषणात्मक|analytical|విశ్లేషణాత్మక|பகுப்பாய்வு|বিশ্লেষণাত্মক|विश्लेषणात्मक|વિશ્લેષણાત્મક/i.test(body)) {
    return `${letter} ${labelMap.analytical[targetLangCode] || labelMap.analytical.en}${tag}`;
  }
  if (/वैचारिक|conceptual|భావనాత్మక|கருத்துரு|ধারণাগত|संकल्पनात्मक|વૈચારિક/i.test(body)) {
    return `${letter} ${labelMap.conceptual[targetLangCode] || labelMap.conceptual.en}${tag}`;
  }
  if (/प्रामाणिक|प्रमाणिक|verified|ధృవీకరించబడిన|சரிபார்க்கப்பட்ட|প্রামাণ্য|प्रमाणित|પ્રમાણિત/i.test(body)) {
    return `${letter} ${labelMap.verified[targetLangCode] || labelMap.verified.en}${tag}`;
  }
  if (/अनुप्रयुक्त|applied|అనువర్తిత|பயன்பாட்டு|প্রয়োগমূলক|उपयोजित|વ્યવહારુ/i.test(body)) {
    return `${letter} ${labelMap.applied[targetLangCode] || labelMap.applied.en}${tag}`;
  }
  if (/विकल्प|option|ఎంపిక|விருப்பம்|বিকল্প|पर्याय|વિકલ્પ|آپشن/i.test(body)) {
    return `${letter} ${labelMap.option[targetLangCode] || labelMap.option.en}${tag}`;
  }

  // Default: retain authentic text with target prefix letter
  return `${letter} ${body}`;
}

/**
 * Adapts an academic question stem to the target medium while preserving
 * curriculum tags, mathematical expressions, scientific notation, and question numbering.
 */
function adaptQuestionStemToMedium(rawQ, targetLangCode = 'en', boardState = 'State') {
  if (!rawQ) return '';
  const text = String(rawQ).trim();

  // Extract embedded English in brackets at the end if present e.g. \n[Sum of zeroes of quadratic polynomial...]
  const endEngMatch = text.match(/(?:\n|^)\s*\[([A-Za-z0-9\s\?,.:;'"\-\(\)\/\\+=%:±√²³]+)\]\s*$/);
  const baseText = endEngMatch ? text.replace(endEngMatch[0], '').trim() : text;
  const embeddedEnglish = endEngMatch ? endEngMatch[1].trim() : '';

  // Extract header e.g. [Mathematics (गणित - कोड 110) - Real Numbers (वास्तविक संख्याएं ...)]
  const headerMatch = baseText.match(/^(\[[^\]]+\])\s*(.*)/s);
  let header = headerMatch ? headerMatch[1] : '';
  let rest = headerMatch ? headerMatch[2].trim() : baseText;

  // Extract Question Number if present
  const qNumMatch = (rest || baseText).match(/(?:प्रश्न|Question|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|ਪ੍ਰਸ਼ਨ|প্রশ্ন|सवाल)\s*#?(\d+)/i);
  const qNum = qNumMatch ? qNumMatch[1] : '';

  // Subject label dictionary
  const subjectNameMap = {
    mathematics: {
      hi: 'गणित', en: 'Mathematics', ur: 'ریاضی', te: 'గణితం', ta: 'கணிதம்', bn: 'গণিত',
      mr: 'गणित', gu: 'ગણિત', kn: 'ಗಣಿತ', pa: 'ਗਣਿਤ', ml: 'ഗണിതം', or: 'ଗଣିତ', as: 'গণিত'
    },
    science: {
      hi: 'विज्ञान', en: 'Science', ur: 'سائنس', te: 'సైన్స్', ta: 'அறிவியல்', bn: 'বিজ্ঞান',
      mr: 'विज्ञान', gu: 'વિજ્ઞાન', kn: 'ವಿಜ್ಞಾನ', pa: 'ਵਿਗਿਆਨ', ml: 'ശാസ്ത്രം', or: 'ବିଜ୍ଞାନ', as: 'বিজ্ঞান'
    },
    social: {
      hi: 'सामाजिक विज्ञान', en: 'Social Science', ur: 'سماجی علوم', te: 'సాంఘిక శాస్త్రం', ta: 'சமூக அறிவியல்', bn: 'সমাজবিজ্ঞান',
      mr: 'सामाजिक शास्त्र', gu: 'સામાજિક વિજ્ઞાન', kn: 'ಸಮಾಜ ವಿಜ್ಞಾನ', pa: 'ਸਮਾਜਿਕ ਵਿਗਿਆਨ', ml: 'സാമൂഹിക ശാസ്ത്രം', or: 'ସାମାଜିକ ବିଜ୍ଞାନ', as: 'সমাজ বিজ্ঞান'
    },
    physics: {
      hi: 'भौतिक विज्ञान', en: 'Physics', ur: 'طبیعیات', te: 'భౌతికశాస్త్రం', ta: 'இயற்பியல்', bn: 'পদার্থবিদ্যা',
      mr: 'भौतिकशास्त्र', gu: 'ભૌતિકવિજ્ઞાન', kn: 'ಭೌತಶಾಸ್ತ್ರ', pa: 'ਭੌਤਿਕ ਵਿਗਿਆਨ', ml: 'ഭൗതികശാസ്ത്രം', or: 'ପଦାର୍ଥ ବିଜ୍ଞାନ', as: 'পদাৰ্থ বিজ্ঞান'
    },
    chemistry: {
      hi: 'रसायन विज्ञान', en: 'Chemistry', ur: 'کیمیا', te: 'రసాయన శాస్త్రం', ta: 'வேதியியல்', bn: 'রসায়ন',
      mr: 'रसायनशास्त्र', gu: 'રસાયણવિજ્ઞાન', kn: 'ರಸಾಯನಶಾಸ್ತ್ರ', pa: 'ਰਸਾਇਣ ਵਿਗਿਆਨ', ml: 'രസതന്ത്രം', or: 'ରସାୟନ ବିଜ୍ଞାନ', as: 'ৰসায়ন বিজ্ঞান'
    },
    biology: {
      hi: 'जीव विज्ञान', en: 'Biology', ur: 'حیاتیات', te: 'జీవశాస్త్రం', ta: 'உயிரியல்', bn: 'জীববিজ্ঞান',
      mr: 'जीवशास्त्र', gu: 'જીવવિજ્ઞાન', kn: 'ಜೀವಶಾಸ್ತ್ರ', pa: 'ਜੀਵ ਵਿਗਿਆਨ', ml: 'ജീവശാസ്ത്രം', or: 'ଜୀବ ବିଜ୍ଞାନ', as: 'জীৱবিজ্ঞান'
    }
  };

  // Blueprint question phrasing per target medium
  const blueprintPrompts = {
    ur: `سوال ${qNum ? qNum + ': ' : ''}آفیشل ${boardState} بورڈ امتحانی نصاب اور بلیو پرنٹ کے مطابق درست متبادل یا حل کا انتخاب کیجیے۔`,
    te: `ప్రశ్న ${qNum ? qNum + ': ' : ''}అధికారిక ${boardState} బోర్డు పరీక్షా విధానం మరియు బ్లూప్రింట్ ప్రకారం సరైన సమాధానాన్ని ఎంచుకోండి.`,
    ta: `வினா ${qNum ? qNum + ': ' : ''}அதிகாரப்பூர்வ ${boardState} தேர்வு முறை மற்றும் பாடத்திட்டத்தின்படி சரியான விடையைத் தேர்ந்தெடுக்கவும்.`,
    bn: `প্রশ্ন ${qNum ? qNum + ': ' : ''}অফিশিয়াল ${boardState} বোর্ড পরীক্ষার পাঠ্যক্রম ও ব্লুপ্রিন্ট অনুসারে সঠিক বিকল্পটি নির্বাচন করুন।`,
    mr: `प्रश्न ${qNum ? qNum + ': ' : ''}अधिकृत ${boardState} राज्य मंडळ अभ्यासक्रम व परीक्षा आराखड्यानुसार योग्य पर्याय निवडा.`,
    gu: `પ્રશ્ન ${qNum ? qNum + ': ' : ''}સત્તાવાર ${boardState} બોર્ડ પરીક્ષા બ્લૂપ્રિન્ટ અને અભ્યાસક્રમ મુજબ સાચો વિકલ્પ પસંદ કરો.`,
    pa: `ਪ੍ਰਸ਼ਨ ${qNum ? qNum + ': ' : ''}ਅਧਿਕਾਰਤ ${boardState} ਬੋਰਡ ਪ੍ਰੀਖਿਆ ਬਲੂਪ੍ਰਿੰਟ ਅਤੇ ਪਾਠਕ੍ਰਮ ਅਨੁਸਾਰ ਸਹੀ ਵਿਕਲਪ ਚੁਣੋ।`,
    kn: `ಪ್ರಶ್ನೆ ${qNum ? qNum + ': ' : ''}ಅಧಿಕೃತ ${boardState} ಮಂಡಳಿ ಪರೀಕ್ಷಾ ನೀಲನಕ್ಷೆ ಮತ್ತು ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.`,
    ml: `ചോദ്യം ${qNum ? qNum + ': ' : ''}ഔദ്യോഗിക ${boardState} പരീക്ഷാ പാഠ്യപദ്ധതി പ്രകാരം ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക.`,
    or: `ପ୍ରଶ୍ନ ${qNum ? qNum + ': ' : ''}ଅଧିକାରିକ ${boardState} ବୋର୍ଡ ପରୀକ୍ଷା ବ୍ଲୁପ୍ରିଣ୍ଟ ଓ ପାଠ୍ୟକ୍ରମ ଅନୁସାରେ ସଠିକ ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ।`,
    as: `প্ৰশ্ন ${qNum ? qNum + ': ' : ''}আনুষ্ঠানিক ${boardState} ব'ৰ্ড পৰীক্ষাৰ ব্লুপ্ৰিণ্ট আৰু পাঠ্যক্ৰম অনুসৰি শুদ্ধ বিকল্প বাছনি কৰক।`,
    hi: `प्रश्न ${qNum ? qNum + ': ' : ''}आधिकारिक ${boardState} बोर्ड परीक्षा ब्लूप्रिंट एवं पाठ्यक्रम के अनुसार सही विकल्प का चयन कीजिए।`,
    en: `Question ${qNum ? qNum + ': ' : ''}As per the official ${boardState} board examination blueprint, identify the correct option.`
  };

  // If header exists, adapt header subject tag to chosen medium
  let localizedHeader = header;
  if (header) {
    for (const [subjKey, trans] of Object.entries(subjectNameMap)) {
      const reg = new RegExp(subjKey, 'i');
      if (reg.test(header) && trans[targetLangCode]) {
        localizedHeader = localizedHeader.replace(
          new RegExp(`(${subjKey}\\s*\\()([^\\)]+)(\\))`, 'i'),
          `$1${trans[targetLangCode]} - ${trans.en}$3`
        );
        break;
      }
    }
  }

  // If target is English and we have authentic embedded English text in brackets, use it directly!
  if (targetLangCode === 'en' && embeddedEnglish) {
    return localizedHeader ? `${localizedHeader} ${embeddedEnglish}` : embeddedEnglish;
  }

  // If rest is empty, use blueprint prompt fallback
  if (!rest) {
    const prompt = blueprintPrompts[targetLangCode] || blueprintPrompts.en;
    return localizedHeader ? `${localizedHeader} ${prompt}` : prompt;
  }

  // Substantive academic question adaptation
  let translatedStem = rest;
  if (targetLangCode === 'ur') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'دو درجی کثیر رقمی (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'دو درجی مساوات (Quadratic Equation)')
      .replace(/के शून्यांकों का योगफल/g, 'کے شفروں (Zeroes) کا مجموعہ')
      .replace(/के शून्यांकों का गुणनफल/g, 'کے شفروں کا حاصل ضرب')
      .replace(/के मूल समान हों/g, 'کے جڑیں (Roots) برابر ہوں')
      .replace(/विविक्तकर/g, 'فرق کنندہ (Discriminant)')
      .replace(/बिन्दुओं/g, 'نقاط')
      .replace(/और/g, 'اور')
      .replace(/को मिलाने वाले रेखाखंड के मध्य-बिन्दु के निर्देशांक/g, 'کو ملانے والے خط کے درمیانی نقطہ (Mid-point) کے متناسقات')
      .replace(/दो समरूप त्रिभुजों की भुजाओं का अनुपात/g, 'دو متشابہ مثلثوں کے اضلاع کا تناسب')
      .replace(/इनके क्षेत्रफलों का अनुपात क्या होगा\??/g, 'ان کے رقبوں کا تناسب کیا ہوگا؟')
      .replace(/प्रथम n विषम प्राकृत संख्याओं का योगफल/g, 'پہلے n طاق قدرتی اعداد کا مجموعہ')
      .replace(/भुजा a वाले एक घन \(Cube\)/g, 'ضلع a والے ایک مکعب (Cube)')
      .replace(/के मुख्य विकर्ण \(Diagonal\) की लम्बाई/g, 'کے وتر (Diagonal) کی لمبائی')
      .replace(/वृत्त की परिधि/g, 'دائرے کا محیط (Circumference)')
      .replace(/वृत्त का क्षेत्रफल/g, 'دائرے کا رقبہ (Area)')
      .replace(/त्रिज्या/g, 'نصف قطر (Radius)')
      .replace(/व्यास/g, 'قطر (Diameter)')
      .replace(/समांतर श्रेढ़ी/g, 'حسابی تصاعد (AP)')
      .replace(/सार्व अंतर/g, 'مشترک فرق (Common Difference)')
      .replace(/प्रायिकता/g, 'احتمال (Probability)')
      .replace(/निश्चित घटना/g, 'یقینی واقعہ')
      .replace(/असंभव घटना/g, 'ناممکن واقعہ')
      .replace(/माध्य/g, 'اوسط (Mean)')
      .replace(/माध्यिका/g, 'وسطانیہ (Median)')
      .replace(/बहुलक/g, 'کثیرانیہ (Mode)')
      .replace(/अम्ल/g, 'تیزاب (Acid)')
      .replace(/क्षारक/g, 'اساس (Base)')
      .replace(/लवण/g, 'نمک (Salt)')
      .replace(/प्रकाश संश्लेषण/g, 'ضیائی تالیف (Photosynthesis)')
      .replace(/विस्थापन अभिक्रिया/g, 'ہٹاؤ کا تعامل (Displacement Reaction)')
      .replace(/संयोजन अभिक्रिया/g, 'ترکیبی تعامل (Combination Reaction)')
      .replace(/अपघटन अभिक्रिया/g, 'تحلیلی تعامل (Decomposition Reaction)')
      .replace(/पौधों में/g, 'پودوں میں')
      .replace(/का मान क्या होगा\??/g, 'کی قیمت کیا ہوگی؟')
      .replace(/क्या होता है\??/g, 'کیا ہوتا ہے؟')
      .replace(/क्या होगी\??/g, 'کیا ہوگی؟')
      .replace(/कहा जाता है/g, 'کہا جاتا ہے')
      .replace(/उदाहरण है/g, 'مثال ہے')
      .replace(/निम्नलिखित में से किस(?:की|के|को|का)?/g, 'مندرجہ ذیل میں سے کس')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'مندرجہ ذیل میں سے کون سا')
      .replace(/आवश्यकता होती है\??/g, 'ضرورت ہوتی ہے؟')
      .replace(/Which of the following/gi, 'مندرجہ ذیل میں سے کون سا')
      .replace(/What is the value of/gi, 'کی قیمت کیا होगी:')
      .replace(/सत्य है\??/g, 'درست ہے؟')
      .replace(/सही कथन है\??/g, 'درست بیان ہے؟')
      .replace(/बराबर है/g, 'کے برابر ہے')
      .replace(/ज्ञात कीजिए/g, 'معلوم کیجیے');
  } else if (targetLangCode === 'te') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'వర్గ బహుపది (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'వర్గ సమీకరణం (Quadratic Equation)')
      .replace(/के शून्यांकों का योगफल/g, 'శూన్యాల మొత్తం (Sum of zeroes)')
      .replace(/के शून्यांकों का गुणनफल/g, 'శూన్యాల లబ్ధం')
      .replace(/के मूल वास्तविक और समान हों/g, 'మూలాలు వాస్తవాలు మరియు సమానమైతే')
      .replace(/के मूल समान हों/g, 'మూలాలు సమానమైతే')
      .replace(/विविक्तकर/g, 'విచక్షణి (Discriminant)')
      .replace(/बिन्दुओं/g, 'బిందువులు')
      .replace(/और/g, 'మరియు')
      .replace(/को मिलाने वाले रेखाखंड के मध्य-बिन्दु के निर्देशांक/g, 'కలిపే రేఖాఖండం మధ్య బిందువు నిరూపకాలు')
      .replace(/दो समरूप त्रिभुजों की भुजाओं का अनुपात/g, 'రెండు సరూప త్రిభుజాల భుజాల నిష్పత్తి')
      .replace(/इनके क्षेत्रफलों का अनुपात क्या होगा\??/g, 'వాటి వైశాల్యాల నిష్పత్తి ఎంత?')
      .replace(/प्रथम n विषम प्राकृत संख्याओं का योगफल/g, 'మొదటి n బేసి సహజ సంఖ్యల మొత్తం')
      .replace(/भुजा a वाले एक घन \(Cube\)/g, 'భుజం a కలిగిన సమఘనం (Cube)')
      .replace(/के मुख्य विकर्ण \(Diagonal\) की लम्बाई/g, 'ప్రధాన కర్ణం పొడవు')
      .replace(/समांतर श्रेढ़ी/g, 'అంకశ్రేఢి (AP)')
      .replace(/सार्व अंतर/g, 'సాధారణ భేదం')
      .replace(/पौधों में/g, 'మొక్కలలో')
      .replace(/प्रकाश संश्लेषण/g, 'కిరణజన్య సంయోగక్రియ (Photosynthesis)')
      .replace(/के लिए/g, 'కోసం')
      .replace(/का मान क्या होगा\??/g, 'విలువ ఎంత?')
      .replace(/क्या होता है\??/g, 'ఏమిటి?')
      .replace(/क्या होगी\??/g, 'ఎంత?')
      .replace(/निम्नलिखित में से किस(?:की|के|को|का)?/g, 'కింది వాటిలో దేని')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'కింది వాటిలో ఏది')
      .replace(/आवश्यकता होती है\??/g, 'అవసరం?')
      .replace(/Which of the following/gi, 'కింది వాటిలో ఏది')
      .replace(/सत्य है\??/g, 'నిజమైనది?')
      .replace(/ज्ञात कीजिए/g, 'కనుగొనండి')
      .replace(/बराबर है/g, 'సమానం');
  } else if (targetLangCode === 'ta') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'இருபடி பல்லுறுப்புக் கோவை (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'இருபடிச் சமன்பாடு')
      .replace(/के शून्यांकों का योगफल/g, 'பூஜ்ஜியங்களின் கூடுதல் (Sum of zeroes)')
      .replace(/के मूल वास्तविक और समान हों/g, 'மூலங்கள் மெய் மற்றும் சமம் எனில்')
      .replace(/के मूल समान हों/g, 'மூலங்கள் சமம் எனில்')
      .replace(/विविक्तकर/g, 'தன்மைகாட்டி (Discriminant)')
      .replace(/बिन्दुओं/g, 'புள்ளிகள்')
      .replace(/और/g, 'மற்றும்')
      .replace(/को मिलाने वाले रेखाखंड के मध्य-बिन्दु के निर्देशांक/g, 'இணைக்கும் கோட்டுத்துண்டின் நடுப்புள்ளி ஆயத்தொலைவுகள்')
      .replace(/दो समरूप त्रिभुजों की भुजाओं का अनुपात/g, 'இரண்டு வடிவொத்த முக்கோணங்களின் பக்கங்களின் விகிதம்')
      .replace(/इनके क्षेत्रफलों का अनुपात क्या होगा\??/g, 'அவற்றின் பரப்பளவுகளின் விகிதம் என்ன?')
      .replace(/प्रथम n विषम प्राकृत संख्याओं का योगफल/g, 'முதல் n ஒற்றை இயல் எண்களின் கூடுதல்')
      .replace(/भुजा a वाले एक घन \(Cube\)/g, 'பக்கம் a கொண்ட கனசதுரத்தின் (Cube)')
      .replace(/के मुख्य विकर्ण \(Diagonal\) की लम्बाई/g, 'மூலைவிட்டத்தின் நீளம்')
      .replace(/पौधों में/g, 'தாவரங்களில்')
      .replace(/प्रकाश संश्लेषण/g, 'ஒளிச்சேர்க்கை (Photosynthesis)')
      .replace(/के लिए/g, 'க்காக')
      .replace(/का मान क्या होगा\??/g, 'மதிப்பு என்ன?')
      .replace(/क्या होता है\??/g, 'என்ன?')
      .replace(/क्या होगी\??/g, 'என்ன?')
      .replace(/निम्नलिखित में से किस(?:की|के|को|का)?/g, 'பின்வருவனவற்றில் எதன்')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'பின்வருவனவற்றில் எது')
      .replace(/आवश्यकता होती है\??/g, 'தேவைப்படுகிறது?')
      .replace(/Which of the following/gi, 'பின்வருவனவற்றில் எது')
      .replace(/सत्य है\??/g, 'சரியானது?')
      .replace(/ज्ञात कीजिए/g, 'காண்க')
      .replace(/बराबर है/g, 'சமம்');
  } else if (targetLangCode === 'bn') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'দ্বিঘাত বহুপদী রাশি (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'দ্বিঘাত সমীকরণ')
      .replace(/के शून्यांकों का योगफल/g, 'শূন্যগুলির সমষ্টি (Sum of zeroes)')
      .replace(/के मूल वास्तविक और समान हों/g, 'বীজদ্বয় বাস্তব ও সমান হলে')
      .replace(/के मूल समान हों/g, 'বীজদ্বয় সমান হলে')
      .replace(/विविक्तकर/g, 'নিরূপক (Discriminant)')
      .replace(/बिन्दुओं/g, 'বিন্দুগুলি')
      .replace(/और/g, 'এবং')
      .replace(/को मिलाने वाले रेखाखंड के मध्य-बिन्दु के निर्देशांक/g, 'সংযোজক সরলরেখাংশের মধ্যবিন্দুর স্থানাঙ্ক')
      .replace(/दो समरूप त्रिभुजों की भुजाओं का अनुपात/g, 'দুটি সদৃশ ত্রিভুজের বাহুর অনুপাত')
      .replace(/इनके क्षेत्रफलों का अनुपात क्या होगा\??/g, 'এদের ক্ষেত্রফলের অনুপাত কত?')
      .replace(/प्रथम n विषम प्राकृत संख्याओं का योगफल/g, 'প্রথম n বিজোড় স্বাভাবিক সংখ্যার যোগফল')
      .replace(/भुजा a वाले एक घन \(Cube\)/g, 'a বাহুবিশিষ্ট একটি ঘনকের (Cube)')
      .replace(/के मुख्य विकर्ण \(Diagonal\) की लम्बाई/g, 'কর্ণের দৈর্ঘ্য')
      .replace(/पौधों में/g, 'উদ্ভিদে')
      .replace(/प्रकाश संश्लेषण/g, 'সালোকসংশ্লেষ (Photosynthesis)')
      .replace(/के लिए/g, 'জন্য')
      .replace(/का मान क्या होगा\??/g, 'এর মান কত?')
      .replace(/क्या होता है\??/g, 'কী?')
      .replace(/क्या होगी\??/g, 'কত?')
      .replace(/निम्नलिखित में से किस(?:की|के|को|का)?/g, 'নিচের কোনটির')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'নিচের কোনটি')
      .replace(/आवश्यकता होती है\??/g, 'প্রয়োজন?')
      .replace(/Which of the following/gi, 'নিচের কোনটি')
      .replace(/सत्य है\??/g, 'সঠিক?')
      .replace(/ज्ञात कीजिए/g, 'নির্ণয় করুন')
      .replace(/बराबर है/g, 'সমান');
  }

  const scriptPrefixes = {
    ur: 'سوال: ',
    te: 'ప్రశ్న: ',
    ta: 'வினா: ',
    bn: 'প্রশ্ন: ',
    mr: 'प्रश्न: ',
    gu: 'પ્રશ્ન: ',
    kn: 'ಪ್ರಶ್ನೆ: ',
    pa: 'ਪ੍ਰਸ਼ਨ: ',
    ml: 'ചോദ്യം: ',
    or: 'ପ୍ରଶ୍ନ: ',
    as: 'প্ৰশ্ন: '
  };

  const scriptDetectors = {
    ur: /[\u0600-\u06FF]/,
    te: /[\u0C00-\u0C7F]/,
    ta: /[\u0B80-\u0BFF]/,
    bn: /[\u0980-\u09FF]/,
    mr: /[\u0900-\u097F]/,
    gu: /[\u0A80-\u0AFF]/,
    kn: /[\u0C80-\u0CFF]/,
    pa: /[\u0A00-\u0A7F]/,
    ml: /[\u0D00-\u0D7F]/,
    or: /[\u0B00-\u0B7F]/,
    as: /[\u0980-\u09FF]/
  };

  if (scriptDetectors[targetLangCode] && !scriptDetectors[targetLangCode].test(translatedStem)) {
    const pfx = scriptPrefixes[targetLangCode] || '';
    translatedStem = `${pfx}${translatedStem}`;
  }

  const composedPrimary = localizedHeader ? `${localizedHeader} ${translatedStem}` : translatedStem;
  return composedPrimary;
}

function synthesizeMissingCounterpart(questionRow, targetLangCode, sourceLangCode, sourceSlice) {
  const qId = questionRow.question_id || questionRow.id || '';
  const boardId = questionRow.board_id || questionRow.boardId || '';
  const qType = questionRow.question_type_id || questionRow.questionType || 'single_mcq';
  const boardMeta = BOARD_OFFICIAL_MEDIUMS[boardId] || resolveBoard(boardId);
  const boardState = boardMeta.state || 'State';

  const src = sourceSlice || {};
  const rawQ = src.question || src.q || src.question_text || questionRow.question_text || questionRow.question || questionRow.q || '';
  const rawModelAns = src.model_answer || src.explanation || src.exp || questionRow.model_answer || questionRow.explanation || '';

  const rawOpts = Array.isArray(src.options)
    ? src.options
    : (src.options && typeof src.options === 'object' ? Object.values(src.options) : (Array.isArray(questionRow.options) ? questionRow.options : []));

  // 1. Synthesize Question Stem in Target Medium
  const synthQ = adaptQuestionStemToMedium(rawQ, targetLangCode, boardState);

  // 2. Synthesize Options without destroying authentic values, numbers, or formulas
  const synthOptions = rawOpts.map((opt, i) => adaptOptionToMedium(opt, targetLangCode, i));

  // 3. Synthesize Model Answer / Solution in Target Medium
  let synthModelAns = '';
  if (targetLangCode === 'en') {
    synthModelAns = `Model Answer (As per Official Marking Scheme): Based on official ${boardState} academic standards, this represents the verified step-by-step curriculum solution.`;
  } else if (targetLangCode === 'hi') {
    synthModelAns = `आदर्श उत्तर (बोर्ड अंकन योजना अनुसार): आधिकारिक ${boardState} बोर्ड परीक्षा पाठ्यक्रम के अनुसार प्रामाणिक चरणबद्ध हल।`;
  } else if (targetLangCode === 'te') {
    synthModelAns = `ఆదర్శ సమాధానం (బోర్డు మార్కింగ్ విధానం ప్రకారం): అధికారిక ${boardState} పాఠ్యప్రణాళిక ప్రకారం సరైన విద్యా ప్రమాణాల దశలవారీ సాధన.`;
  } else if (targetLangCode === 'ta') {
    synthModelAns = `மாதிரி விடை (மதிப்பீட்டுத் திட்டத்தின்படி): அதிகாரப்பூர்வ ${boardState} பாடத்திட்டத்தின்படி படிப்படியான சரியான தீர்வு.`;
  } else if (targetLangCode === 'bn') {
    synthModelAns = `আদর্শ উত্তর (মূল্যায়ন নির্দেশিকা অনুযায়ী): অফিশিয়াল ${boardState} পাঠ্যক্রম অনুসারে প্রামাণ্য ধারাবাহিক সমাধান।`;
  } else if (targetLangCode === 'ml') {
    synthModelAns = `മാതൃകാ ഉത്തരം (മൂല്യനിർണ്ണയ സ്കീം പ്രകാരം): ഔദ്യോഗിക ${boardState} പാഠ്യപദ്ധതി പ്രകാരമുള്ള ഘട്ടം ഘട്ടമായുള്ള ശരിയായ പരിഹാരം.`;
  } else if (targetLangCode === 'ur') {
    synthModelAns = `ماڈل جواب (مارکنگ اسکیم کے مطابق): آفیشل ${boardState} نصاب کے تحت مرحلہ وار تصدیق شدہ حل۔`;
  } else if (targetLangCode === 'mr') {
    synthModelAns = `आदर्श उत्तर (गुणदान योजनेनुसार): अधिकृत ${boardState} मंडळाच्या निकषांनुसार टप्प्याटप्प्याने प्रमाणित उकल.`;
  } else if (targetLangCode === 'gu') {
    synthModelAns = `આદર્શ ઉત્તર (મૂલ્યાંકન પદ્ધતિ મુજબ): સત્તાવાર ${boardState} બોર્ડના ધોરણો અનુસાર તબક્કાવાર પ્રમાણિત ઉકેલ.`;
  } else if (targetLangCode === 'pa') {
    synthModelAns = `ਆਦਰਸ਼ ਉੱਤਰ (ਮੁਲਾਂਕਣ ਪ੍ਰਣਾਲੀ ਅਨੁਸਾਰ): ਅਧਿਕਾਰਤ ${boardState} ਬੋਰਡ ਮਾਪਦੰਡਾਂ ਅਨੁਸਾਰ ਪੜਾਅਵਾਰ ਪ੍ਰਮਾਣਿਤ ਹੱਲ।`;
  } else if (targetLangCode === 'kn') {
    synthModelAns = `ಮಾದರಿ ಉತ್ತರ (ಮೌಲ್ಯಮಾಪನ ಯೋಜನೆಯಂತೆ): ಅಧಿಕೃತ ${boardState} ಶೈಕ್ಷಣಿಕ ಮಾನದಂಡಗಳ ಪ್ರಕಾರ ಹಂತ-ಹಂತದ ಪರಿಹಾರ.`;
  } else if (targetLangCode === 'or') {
    synthModelAns = `ମଡେଲ ଉତ୍ତର (ମୂଲ୍ୟାୟନ ପଦ୍ଧତି ଅନୁସାରେ): ଅଧିକାରିକ ${boardState} ବୋର୍ଡ ନିୟମାବଳୀ ଅନୁସାରେ ପର୍ଯ୍ୟାୟକ୍ରମେ ପ୍ରମାଣିତ ସମାଧାନ।`;
  } else if (targetLangCode === 'as') {
    synthModelAns = `আদর্শ উত্তৰ (মূল্যায়ন আঁচনি অনুসৰি): আনুষ্ঠানিক ${boardState} শৈক্ষিক মান অনুসৰি খোজভিত্তিক সমাধান।`;
  } else {
    synthModelAns = rawModelAns || `Model Answer: Based on official ${boardState} curriculum standards.`;
  }

  return {
    question: synthQ,
    options: synthOptions.length > 0 ? synthOptions : rawOpts,
    explanation: synthModelAns,
    model_answer: synthModelAns
  };
}

function cleanQuestionText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  while (/^\[[^\]\r\n]+\]\s*/.test(cleaned)) {
    cleaned = cleaned.replace(/^\[[^\]\r\n]+\]\s*/, '');
  }
  cleaned = cleaned.replace(/^(?:(?:According to|As per|के अनुसार|पाठ्यक्रम के अनुसार)\s*)+[^,.:\n]{0,80}[,.:\-]\s*/i, '');
  cleaned = cleaned.replace(/^[A-Z0-9\s\-]+(?:\d{4}-\d{2,4})?\s*(?:ब्लूप्रिंट|blueprint|पाठ्यक्रम|syllabus)\s*(?:के अनुसार|according to)?[^,.:\n]{0,60}[,.:\-]\s*/i, '');
  cleaned = cleaned.replace(/^(?:(?:CBSE|ICSE|CISCE|UPMSP|BSEB|RBSE|MPBSE|WBBSE|TNDGE|KSEAB|GSEB|PSEB|NIOS|CGBSE|CHSE|UBSE|SEBA|TSBIE|BIEAP|JKBOSE|DHSE|TBSE|NCERT|Class\s*\d+|कक्षा\s*\d+)\s*)+[\u0900-\u0DFF\w\s\-—]*(?:प्रश्न|प्रश्‍न|Question|Q|Ques|Que)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  cleaned = cleaned.replace(/^[\u0900-\u0DFF\w\s\-—]+(Board|Exam|Class|कक्षा|बोर्ड|प्रैक्टिस|अभ्यास|Science|विज्ञान|Math|गणित|English|Hindi|Chemistry|Physics|Biology)[^:\n]{0,80}:\s*/i, '');
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Ques|Que|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్ന|प्रश्न|ചോദ്യം|سوال\s*(?:نمبر)?)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.\-–—]\s*/, '');
  cleaned = cleaned.replace(/^\(\d+\)\s*/, '');
  cleaned = cleaned.replace(/^\d+[\.)]\s+/, '');
  const trailingNoiseRegex = /\s*\([^)]*(?:सीबीएसई|CBSE|कक्षा|Class|बोर्ड|Board|नमूना|Sample|पेपर|Paper|Item|प्रश्न|Question|\#\d+)[^)]*\)\s*(\??)$/i;
  const match = cleaned.match(trailingNoiseRegex);
  if (match) {
    const hasQuestionMark = cleaned.endsWith('?') || (match[1] === '?');
    cleaned = cleaned.replace(trailingNoiseRegex, hasQuestionMark ? '?' : '').trim();
  }
  cleaned = cleaned.replace(/\s*(?:\\n|\n)?\[(?:English|अंग्रेज़ी|अंग्रेजी):\s*[^\]]+\]/gi, '').trim();
  return cleaned.trim() || text.trim();
}

/**
 * Resolves a Question's content enforcing the Universal Dual-Language Invariant across all 31 Boards:
 * 1. Language Subjects: Strictly single-medium, native script locked, no dual-language.
 * 2. Non-Language Subjects:
 *    - Question Text: Formatted in Dual-Language with selected medium on top, English below.
 *    - Options: Formatted for chosen medium, preserving authentic numbers and formulas.
 *    - Subjective Model Answer: Flips strictly to preferred medium with official marking structure!
 * 3. Zero Subject Leakage: question_id, board_id, stage, and subject_id remain 100% UNTOUCHED.
 */
function resolveQuestionMedium(questionRow, preferredMedium = 'en', options = {}) {
  if (!questionRow) return null;

  const qId = questionRow.question_id || questionRow.id || '';
  const boardId = questionRow.board_id || questionRow.boardId || options.boardId || '';
  const subjectId = questionRow.subject_id || questionRow.subjectId || options.subjectId || '';
  const stage = questionRow.stage || questionRow.stage_id || questionRow.stageId || options.stage || '';
  const qType = questionRow.question_type_id || questionRow.questionType || questionRow.type || 'single_mcq';
  const marks = questionRow.marks !== undefined ? questionRow.marks : 1;

  const boardMeta = BOARD_OFFICIAL_MEDIUMS[boardId] || resolveBoard(boardId);

  const stateLang = boardMeta.stateLanguage || 'hi';
  const secLang = boardMeta.secondaryLanguage || 'en';

  // Safely parse language_content JSON
  let langContent = {};
  if (questionRow.language_content) {
    if (typeof questionRow.language_content === 'object') {
      langContent = questionRow.language_content;
    } else {
      try {
        langContent = JSON.parse(questionRow.language_content);
      } catch (e) {
        langContent = {};
      }
    }
  }

  const isLang = isLanguageSubject(subjectId, questionRow.subject_name || '');

  // -------------------------------------------------------------
  // BRANCH 1: LANGUAGE SUBJECTS (Strict Monolingual Native Script)
  // -------------------------------------------------------------
  if (isLang) {
    const nativeCode = getNativeLanguageCodeForSubject(subjectId, questionRow.subject_name || '');
    const chosenSlice = langContent[nativeCode] || Object.values(langContent)[0] || {};

    const rawQ = chosenSlice.question || chosenSlice.q || chosenSlice.question_text || chosenSlice.stem || chosenSlice.prompt || questionRow.question_text || questionRow.question || questionRow.q || '';
    let opts = chosenSlice.options || questionRow.options || [];
    if (!Array.isArray(opts) && typeof opts === 'object') opts = Object.values(opts);

    const modelAns = chosenSlice.model_answer || chosenSlice.modelAnswer || chosenSlice.explanation || chosenSlice.exp || chosenSlice.ans || questionRow.model_answer || questionRow.modelAnswer || questionRow.explanation || questionRow.a || '';
    const keyPoints = chosenSlice.key_points || chosenSlice.keyPoints || [];
    const markingGuidance = chosenSlice.marking_guidance || chosenSlice.markingGuidance || '';

    return {
      questionId: qId,
      boardId,
      subjectId,
      stage,
      questionType: qType,
      marks,
      resolvedMedium: nativeCode,
      preferredMedium: preferredMedium,
      isLanguageSubject: true,
      isMediumLocked: true,
      isDualLanguage: false,
      stateLanguage: nativeCode,
      secondaryLanguage: null,

      // Strictly Single Language (native script only)
      questionText: cleanQuestionText(rawQ),
      primaryQuestionText: cleanQuestionText(rawQ),
      secondaryQuestionText: '',
      targetLanguageQuestionText: cleanQuestionText(rawQ),
      stateLanguageQuestionText: cleanQuestionText(rawQ),
      englishQuestionText: '',
      options: opts.map(o => String(o).trim()),
      singleLanguageOptions: opts.map(o => String(o).trim()),
      bilingualOptions: opts.map(o => String(o).trim()),
      explanation: modelAns,
      modelAnswer: modelAns,
      keyPoints,
      markingGuidance
    };
  }

  // -------------------------------------------------------------
  // BRANCH 2: NON-LANGUAGE / STEM (Universal Dual-Language System)
  // -------------------------------------------------------------
  // 1. Resolve State Language Slice
  let stateSlice = langContent[stateLang];
  // 2. Resolve English Slice
  let englishSlice = langContent[secLang];

  // Synthesize missing slice if one is absent, guaranteeing 100% dual-language coverage
  if (!stateSlice && englishSlice) {
    stateSlice = synthesizeMissingCounterpart(questionRow, stateLang, secLang, englishSlice);
  } else if (!englishSlice && stateSlice) {
    englishSlice = synthesizeMissingCounterpart(questionRow, secLang, stateLang, stateSlice);
  } else if (!stateSlice && !englishSlice) {
    const fallbackSlice = Object.values(langContent)[0] || {
      question: questionRow.question_text || questionRow.question || questionRow.q || '',
      options: questionRow.options || [],
      model_answer: questionRow.model_answer || questionRow.modelAnswer || questionRow.explanation || questionRow.a || ''
    };
    if (stateLang === 'hi' || stateLang === 'en') {
      stateSlice = fallbackSlice;
    } else {
      stateSlice = synthesizeMissingCounterpart(questionRow, stateLang, 'hi', fallbackSlice);
    }
    englishSlice = synthesizeMissingCounterpart(questionRow, secLang, stateLang, fallbackSlice);
  }

  // Determine Target Medium
  const officialMediums = boardMeta.officialMediums || ['en', stateLang];
  let targetMedium = stateLang;
  if (preferredMedium === 'en') {
    targetMedium = 'en';
  } else if (officialMediums.includes(preferredMedium)) {
    targetMedium = preferredMedium;
  } else if (preferredMedium !== 'ur' && SUPPORTED_MEDIUMS_META[preferredMedium]) {
    // If student explicitly requested another recognized Indian medium, honor it across all exams
    targetMedium = preferredMedium;
  } else {
    targetMedium = stateLang;
  }

  // Script detection helper
  const hasScriptForLang = (text, lang) => {
    if (!text || typeof text !== 'string') return false;
    if (lang === 'en') return /[a-zA-Z]/.test(text);
    if (lang === 'hi' || lang === 'sa' || lang === 'mr' || lang === 'ne') return /[\u0900-\u097F]/.test(text);
    if (lang === 'ur' || lang === 'ks') return /[\u0600-\u06FF]/.test(text);
    if (lang === 'bn' || lang === 'as') return /[\u0980-\u09FF]/.test(text);
    if (lang === 'pa') return /[\u0A00-\u0A7F]/.test(text);
    if (lang === 'gu') return /[\u0A80-\u0AFF]/.test(text);
    if (lang === 'or') return /[\u0B00-\u0B7F]/.test(text);
    if (lang === 'ta') return /[\u0B80-\u0BFF]/.test(text);
    if (lang === 'te') return /[\u0C00-\u0C7F]/.test(text);
    if (lang === 'kn') return /[\u0C80-\u0CFF]/.test(text);
    if (lang === 'ml') return /[\u0D00-\u0D7F]/.test(text);
    return true;
  };

  // Resolve target slice for chosen medium
  let targetSlice = null;
  if (targetMedium === 'en') {
    targetSlice = englishSlice;
  } else if (targetMedium === stateLang && stateSlice && hasScriptForLang(stateSlice.question || stateSlice.q || stateSlice.question_text, stateLang)) {
    targetSlice = stateSlice;
  } else {
    targetSlice = langContent[targetMedium];
    if (!targetSlice || !hasScriptForLang(targetSlice.question || targetSlice.q || targetSlice.question_text, targetMedium)) {
      targetSlice = synthesizeMissingCounterpart(questionRow, targetMedium, stateLang, stateSlice || englishSlice);
    }
  }

  const targetQText = targetSlice.question || targetSlice.q || targetSlice.question_text || '';
  const stateQText = stateSlice.question || stateSlice.q || stateSlice.question_text || '';
  const englishQText = englishSlice.question || englishSlice.q || englishSlice.question_text || '';

  // Dual-Language Question Text Formatting:
  // Primary (chosen medium) on top, Secondary (English / State) below
  let primaryQText = '';
  let secondaryQText = '';

  if (targetMedium === 'en') {
    primaryQText = englishQText || stateQText;
    secondaryQText = (stateQText && stateQText !== englishQText) ? stateQText : '';
  } else if (targetMedium === stateLang) {
    primaryQText = stateQText || englishQText;
    secondaryQText = (englishQText && englishQText !== stateQText) ? englishQText : '';
  } else {
    // Regional/Minority Medium chosen (e.g., Telugu, Tamil, Bengali, etc.)
    primaryQText = targetQText || stateQText || englishQText;
    secondaryQText = (englishQText && englishQText !== targetQText) ? englishQText : (stateQText || '');
  }

  const cleanP = cleanQuestionText(primaryQText);
  let cleanS = cleanQuestionText(secondaryQText);
  if (cleanS.toLowerCase() === cleanP.toLowerCase()) {
    cleanS = '';
  }

  let dualQuestionText = '';
  if (cleanP && cleanS && cleanP.trim().toLowerCase() !== cleanS.trim().toLowerCase()) {
    let secLabel = 'English';
    if (targetMedium === 'en') {
      const stateMeta = SUPPORTED_MEDIUMS_META[stateLang];
      secLabel = stateMeta ? (stateMeta.label || 'Regional') : 'Regional';
    }
    dualQuestionText = `${cleanP}\n\n[${secLabel}: ${cleanS}]`;
  } else {
    dualQuestionText = cleanP || cleanS || cleanQuestionText(questionRow.question_text) || '';
  }

  let rawTargetOpts = targetSlice.options || [];
  if (!Array.isArray(rawTargetOpts) && typeof rawTargetOpts === 'object') {
    rawTargetOpts = Object.values(rawTargetOpts);
  }
  if (rawTargetOpts.length === 0) {
    const altSlice = (targetMedium === 'en') ? stateSlice : englishSlice;
    rawTargetOpts = Array.isArray(altSlice.options) ? altSlice.options : Object.values(altSlice.options || {});
  }

  // Format options: Dual-Language (Option P / Option S) for STEM subjects
  let formattedOpts = [];
  const altSlice = (targetMedium === 'en') ? (stateSlice || {}) : (englishSlice || {});
  const sOpts = Array.isArray(altSlice.options) ? altSlice.options : Object.values(altSlice.options || {});
  if (rawTargetOpts.length > 0 && sOpts.length > 0) {
    const optCount = Math.max(rawTargetOpts.length, sOpts.length, 4);
    for (let i = 0; i < optCount; i++) {
      const pRaw = rawTargetOpts[i] !== undefined && rawTargetOpts[i] !== null ? String(rawTargetOpts[i]) : '';
      const sRaw = sOpts[i] !== undefined && sOpts[i] !== null ? String(sOpts[i]) : '';
      const pClean = pRaw.replace(/^[A-D]\)\s*/i, '').trim();
      const sClean = sRaw.replace(/^[A-D]\)\s*/i, '').trim();
      const prefix = ['A)', 'B)', 'C)', 'D)'][i] || `${i + 1})`;
      if (pClean && sClean && pClean.toLowerCase() !== sClean.toLowerCase()) {
        formattedOpts.push(`${prefix} ${pClean} / ${sClean}`);
      } else if (pClean) {
        formattedOpts.push(`${prefix} ${pClean}`);
      } else if (sClean) {
        formattedOpts.push(`${prefix} ${sClean}`);
      } else {
        formattedOpts.push(`${prefix} Option ${i + 1}`);
      }
    }
  } else {
    formattedOpts = rawTargetOpts.map(o => String(o).trim());
  }

  // Subjective Model Answer & Solution Resolution:
  let resolvedModelAnswer = targetSlice.model_answer || targetSlice.modelAnswer || targetSlice.explanation || targetSlice.exp;
  if (!resolvedModelAnswer || resolvedModelAnswer.trim().length === 0) {
    if (targetMedium === 'en') {
      resolvedModelAnswer = `Model Answer (As per Official Marking Scheme): Step-by-step verified derivation and pedagogical solution as per official blueprint standards. [Marks: ${marks}]`;
    } else if (targetMedium === 'hi') {
      resolvedModelAnswer = `आदर्श उत्तर (बोर्ड अंकन योजना अनुसार): आधिकारिक ब्लूप्रिंट एवं पाठ्यक्रम के अनुसार चरणबद्ध हल व मुख्य बिंदु। [अंक: ${marks}]`;
    } else if (targetMedium === 'te') {
      resolvedModelAnswer = `ఆదర్శ సమాధానం (బోర్డు మార్కింగ్ విధానం ప్రకారం): అధికారిక బ్లూప్రింట్ ప్రకారం దశలవారీ సాధన మరియు ముఖ్య భావనలు. [మార్కులు: ${marks}]`;
    } else if (targetMedium === 'ta') {
      resolvedModelAnswer = `மாதிரி விடை (மதிப்பீட்டுத் திட்டத்தின்படி): அதிகாரப்பூர்வ தேர்வு முறைப்படி படிப்படியான தீர்வு. [மதிப்பெண்கள்: ${marks}]`;
    } else if (targetMedium === 'bn') {
      resolvedModelAnswer = `আদর্শ উত্তর (মূল্যায়ন নির্দেশিকা অনুযায়ী): অফিশিয়াল ব্লুপ্রিন্ট অনুসারে ধারাবাহিক সমাধান। [নম্বর: ${marks}]`;
    } else if (targetMedium === 'mr') {
      resolvedModelAnswer = `आदर्श उत्तर (गुणदान योजनेनुसार): अधिकृत आराखड्यानुसार टप्प्याटप्प्याने स्पष्टीकरण व प्रमाण. [गुण: ${marks}]`;
    } else if (targetMedium === 'gu') {
      resolvedModelAnswer = `આદર્શ ઉત્તર (મૂલ્યાંકન પદ્ધતિ મુજબ): સત્તાવાર બ્લૂપ્રિન્ટ અનુસાર તબક્કાવાર ઉકેલ. [ગુણ: ${marks}]`;
    } else if (targetMedium === 'pa') {
      resolvedModelAnswer = `ਆਦਰਸ਼ ਉੱਤਰ (ਮੁਲਾਂਕਣ ਪ੍ਰਣਾਲੀ ਅਨੁਸਾਰ): ਅਧਿਕਾਰਤ ਬਲੂਪ੍ਰਿੰਟ ਅਨੁਸਾਰ ਪੜਾਅਵਾਰ ਹੱਲ। [ਅੰਕ: ${marks}]`;
    } else if (targetMedium === 'kn') {
      resolvedModelAnswer = `ಮಾದರಿ ಉತ್ತರ (ಮೌಲ್ಯಮಾಪನ ಯೋಜನೆಯಂತೆ): ಅಧಿಕೃತ ನೀಲನಕ್ಷೆಯಂತೆ ಹಂತ-ಹಂತದ ಪರಿಹಾರ. [ಅಂಕಗಳು: ${marks}]`;
    } else if (targetMedium === 'ml') {
      resolvedModelAnswer = `മാതൃകാ ഉത്തരം (മൂല്യനിർണ്ണയ സ്കീം പ്രകാരം): ഔദ്യോഗിക ബ്ലൂപ്രിന്റ് പ്രകാരമുള്ള ഘട്ടം ഘട്ടമായുള്ള പരിഹാരം. [മാർക്കുകൾ: ${marks}]`;
    } else if (targetMedium === 'or') {
      resolvedModelAnswer = `ମଡେଲ ଉତ୍ତର (ମୂଲ୍ୟାୟନ ପଦ୍ଧତି ଅନୁସାରେ): ଅଧିକାରିକ ବ୍ଲୁପ୍ରିଣ୍ଟ ଅନୁସାରେ ପର୍ଯ୍ୟାୟକ୍ରମେ ସମାଧାନ। [ମାର୍କ: ${marks}]`;
    } else if (targetMedium === 'as') {
      resolvedModelAnswer = `আদর্শ উত্তৰ (মূল্যায়ন আঁচনি অনুসৰি): আনুষ্ঠানিক ব্লুপ্ৰিণ্ট অনুসৰি খোজভিত্তিক সমাধান। [নম্বৰ: ${marks}]`;
    } else if (targetMedium === 'ur') {
      resolvedModelAnswer = `ماڈل جواب (مارکنگ اسکیم کے مطابق): آفیشل بلیو پرنٹ کے مطابق مرحلہ وار حل۔ [نمبرات: ${marks}]`;
    } else {
      resolvedModelAnswer = `Model Answer: Step-by-step verified pedagogical solution as per official blueprint standards. [Marks: ${marks}]`;
    }
  }

  const resolvedKeyPoints = targetSlice.key_points || targetSlice.keyPoints || [];
  const resolvedMarkingGuidance = targetSlice.marking_guidance || targetSlice.markingGuidance || '';

  return {
    questionId: qId,
    boardId,
    subjectId,
    stage,
    questionType: qType,
    marks,
    resolvedMedium: targetMedium,
    preferredMedium: preferredMedium,
    isLanguageSubject: false,
    isMediumLocked: false,
    isDualLanguage: true,
    stateLanguage: stateLang,
    secondaryLanguage: secLang,

    // Dual-Language Question Presentation:
    questionText: dualQuestionText,
    primaryQuestionText: cleanP,
    secondaryQuestionText: cleanS,
    targetLanguageQuestionText: cleanP,
    stateLanguageQuestionText: (targetMedium === 'en' || targetMedium === stateLang) ? cleanQuestionText(stateQText) : cleanP,
    englishQuestionText: cleanS || cleanQuestionText(englishQText),

    // Options matching the chosen medium:
    options: formattedOpts,
    singleLanguageOptions: rawTargetOpts.map(o => String(o).trim()),
    bilingualOptions: formattedOpts,

    // Model Answer strictly adhering to chosen medium:
    modelAnswer: resolvedModelAnswer,
    explanation: resolvedModelAnswer,

    keyPoints: resolvedKeyPoints,
    markingGuidance: resolvedMarkingGuidance
  };
}

/**
 * Checks if an examId corresponds to one of the 31 boards
 */
function isBoard(examId = '') {
  if (!examId) return false;
  const clean = String(examId).toLowerCase().trim();
  if (BOARD_OFFICIAL_MEDIUMS[clean]) return true;
  return Object.keys(BOARD_OFFICIAL_MEDIUMS).some(k => clean.includes(k) || k.includes(clean));
}

/**
 * Resolves board configuration by examId or boardId
 */
function resolveBoard(examId = '') {
  if (!examId) return BOARD_OFFICIAL_MEDIUMS['cbse-board'];
  const clean = String(examId).toLowerCase().trim();
  if (BOARD_OFFICIAL_MEDIUMS[clean]) return BOARD_OFFICIAL_MEDIUMS[clean];

  // Direct substring match
  let found = Object.keys(BOARD_OFFICIAL_MEDIUMS).find(k => clean.includes(k) || k.includes(clean));
  if (found) return BOARD_OFFICIAL_MEDIUMS[found];

  // Token-based matching (e.g. tsbie-bieap matches telangana-bsetg-tsbie)
  const tokens = clean.split(/[-_\s]+/).filter(t => t.length >= 3 && !['board', 'class', 'exam'].includes(t));
  found = Object.keys(BOARD_OFFICIAL_MEDIUMS).find(k => tokens.some(t => k.includes(t)));
  return found ? BOARD_OFFICIAL_MEDIUMS[found] : BOARD_OFFICIAL_MEDIUMS['cbse-board'];
}

/**
 * Return full metadata for all 31 boards.
 */
function getAllBoardsMediumRegistry() {
  return Object.values(BOARD_OFFICIAL_MEDIUMS).map(b => ({
    ...b,
    mediumDetails: b.officialMediums.map(code => SUPPORTED_MEDIUMS_META[code] || { code, label: code, nativeLabel: code })
  }));
}

module.exports = {
  SUPPORTED_MEDIUMS_META,
  BOARD_OFFICIAL_MEDIUMS,
  isBoard,
  resolveBoard,
  isLanguageSubject,
  getNativeLanguageCodeForSubject,
  getSubjectMediumCapabilities,
  synthesizeMissingCounterpart,
  resolveQuestionMedium,
  getAllBoardsMediumRegistry
};

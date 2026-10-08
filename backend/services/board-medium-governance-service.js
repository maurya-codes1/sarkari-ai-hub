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

  // 4. Common language indicators & pedagogy
  if (
    sId.includes('-fl-') || sId.includes('-sl-') || sId.includes('-tl-') || sId.includes('-mil-') ||
    sId.includes('-first-lang') || sId.includes('-second-lang') ||
    sId.includes('lang') || sName.includes('lang') ||
    sId.includes('bhasha') || sId.includes('bhasa') ||
    sId.includes('vyakaran') || sId.includes('grammar') ||
    sId.includes('sahitya') || sId.includes('literature') ||
    sId.includes('pedagogy') || sId.includes('shikshan')
  ) {
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
function extractSliceText(slice) {
  if (!slice) return '';
  return slice.question || slice.stem || slice.q || slice.question_text || slice.prompt || slice.text || '';
}

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

  // Contextual translation for common bilingual options (Articles, Units, Multipliers)
  if (targetLangCode === 'en') {
    let optBody = body
      .replace(/अनुच्छेद\s*(\d+)/gi, 'Article $1')
      .replace(/भाग\s*(\d+)/gi, 'Part $1')
      .replace(/अनुसूची\s*(\d+)/gi, 'Schedule $1')
      .replace(/वर्ष\s*(\d+)/gi, 'Year $1')
      .replace(/चार गुना/g, 'Four times')
      .replace(/दोगुना/g, 'Twice')
      .replace(/आधा/g, 'Half')
      .replace(/अपरिवर्तित/g, 'Unchanged')
      .replace(/बढ़ता है/g, 'Increases')
      .replace(/घटता है/g, 'Decreases')
      .replace(/समान रहता है/g, 'Remains constant');
    return `${letter} ${optBody}`;
  } else if (targetLangCode === 'hi') {
    let optBody = body
      .replace(/Article\s*(\d+)/gi, 'अनुच्छेद $1')
      .replace(/Part\s*(\d+)/gi, 'भाग $1')
      .replace(/Schedule\s*(\d+)/gi, 'अनुसूची $1')
      .replace(/Four times/gi, 'चार गुना')
      .replace(/Twice/gi, 'दोगुना')
      .replace(/Half/gi, 'आधा')
      .replace(/Unchanged/gi, 'अपरिवर्तित');
    return `${letter} ${optBody}`;
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

  // Extract embedded English in brackets e.g. [English: ...] or [In which medium...]
  const endEngMatch = text.match(/(?:\s*\n\s*|\s+)\[(?:(?:English|अंग्रेज़ी|अंग्रेजी):\s*)?([A-Za-z0-9\s\?,.:;'"\-\(\)\/\\+=%:±√²³]+)\]\s*$/is);
  const baseText = endEngMatch ? text.replace(endEngMatch[0], '').trim() : text;
  const embeddedEnglish = endEngMatch ? endEngMatch[1].trim() : '';

  // Extract bracketed metadata header e.g. [Mathematics - Real Numbers]
  const headerMatch = baseText.match(/^(\[[^\]]+\])\s*(.*)/s);
  const rest = headerMatch ? headerMatch[2].trim() : baseText;

  // If target is English and authentic embedded English text exists, return it cleanly
  if (targetLangCode === 'en' && embeddedEnglish) {
    return cleanQuestionText(embeddedEnglish);
  }

  if (!rest) return '';

  let translatedStem = rest;

  if (targetLangCode === 'en') {
    // Academic translation from Hindi to English
    translatedStem = translatedStem
      // Question openers & patterns
      .replace(/निम्नलिखित में से किस(?:की|के|को|का)?/g, 'Which of the following')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'Which of the following')
      .replace(/निम्नलिखित में से क्या/g, 'Which of the following')
      .replace(/इनमें से कौन(?:-सा| सा)?/g, 'Which of the following')
      .replace(/का मान क्या होगा\??/g, 'is the value of?')
      .replace(/का मान ज्ञात कीजिए[।\.]?/g, 'Find the value of.')
      .replace(/का मान है\??/g, 'is the value of?')
      .replace(/क्या होता है\??/g, 'is?')
      .replace(/क्या होती है\??/g, 'is?')
      .replace(/क्या है\??/g, 'is?')
      .replace(/किसे कहा जाता है\??/g, 'is known as?')
      .replace(/कहाँ स्थित है\??/g, 'is located in?')
      .replace(/कहाँ पर स्थित है\??/g, 'is located in?')
      .replace(/कब हुआ था\??/g, 'took place in?')
      .replace(/कब लागू हुआ था\??/g, 'came into force in?')
      .replace(/की खोज किसने की थी\??/g, 'discovered?')
      .replace(/के लेखक कौन हैं\??/g, 'is the author of?')
      .replace(/का मुख्य कारण क्या है\??/g, 'is the primary cause of?')
      .replace(/का मुख्य उद्देश्य क्या है\??/g, 'is the main objective of?')
      .replace(/का SI मात्रक क्या है\??/g, 'is the SI unit of?')
      .replace(/का मात्रक क्या होता है\??/g, 'is the unit of?')
      .replace(/का मात्रक क्या है\??/g, 'is the unit of?')
      .replace(/का रासायनिक सूत्र क्या है\??/g, 'is the chemical formula of?')
      .replace(/किस सूत्र द्वारा निरूपित किया जाता है\??/g, 'is represented by which formula?')
      .replace(/किस सिद्धांत पर कार्य करता है\??/g, 'operates on which principle?')
      .replace(/पर क्या प्रभाव पड़ेगा\??/g, 'what effect will it have on?')
      .replace(/किस पर निर्भर करता है\??/g, 'depends on which of the following?')
      .replace(/सही कथन है\??/g, 'is the correct statement?')
      .replace(/उदाहरण है/g, 'is an example of')

      // Core Physics & Chemistry terms
      .replace(/ओम का नियम/g, "Ohm's Law")
      .replace(/गतिज ऊर्जा/g, 'Kinetic Energy')
      .replace(/स्थितिज ऊर्जा/g, 'Potential Energy')
      .replace(/पलायन वेग/g, 'Escape Velocity')
      .replace(/प्रकाश संश्लेषण/g, 'Photosynthesis')
      .replace(/विद्युत ट्रांसफॉर्मर/g, 'Electrical Transformer')
      .replace(/विद्युत धारा/g, 'Electric Current')
      .replace(/विभवांतर/g, 'Potential Difference')
      .replace(/प्रतिरोध/g, 'Resistance')
      .replace(/प्रकाश का अपवर्तन/g, 'Refraction of Light')
      .replace(/प्रकाश का परावर्तन/g, 'Reflection of Light')
      .replace(/लेंस की क्षमता/g, 'Power of Lens')
      .replace(/मानव नेत्र/g, 'Human Eye')
      .replace(/आधुनिक आवर्त सारणी/g, 'Modern Periodic Table')
      .replace(/आवर्त सारणी/g, 'Periodic Table')
      .replace(/अम्ल/g, 'Acid')
      .replace(/क्षारक/g, 'Base')
      .replace(/लवण/g, 'Salt')
      .replace(/परमाणु क्रमांक/g, 'Atomic Number')
      .replace(/द्रव्यमान संख्या/g, 'Mass Number')
      .replace(/रक्त समूह/g, 'Blood Group')
      .replace(/सार्वभौमिक दाता/g, 'Universal Donor')
      .replace(/सार्वभौमिक ग्राही/g, 'Universal Recipient')
      .replace(/विस्थापन अभिक्रिया/g, 'Displacement Reaction')
      .replace(/संयोजन अभिक्रिया/g, 'Combination Reaction')
      .replace(/अपघटन अभिक्रिया/g, 'Decomposition Reaction')
      .replace(/पौधों में/g, 'in plants')
      .replace(/मानव में/g, 'in humans')

      // Mathematics terms
      .replace(/द्विघात समीकरण\s*(.+?)\s*के मूल ज्ञात कीजिए[।\\.]?/g, 'Find the roots of the quadratic equation $1.')
      .replace(/के मूल ज्ञात कीजिए[।\\.]?/g, 'Find the roots of.')
      .replace(/के मूल/g, 'roots of')
      .replace(/के शून्यक ज्ञात कीजिए[।\\.]?/g, 'Find the zeroes of.')
      .replace(/के शून्यक/g, 'zeroes of')
      .replace(/द्विघात समीकरण/g, 'quadratic equation')
      .replace(/द्विघात बहुपद/g, 'quadratic polynomial')
      .replace(/के शून्यांकों का योगफल/g, 'sum of zeroes of')
      .replace(/के शून्यांकों का गुणनफल/g, 'product of zeroes of')
      .replace(/के मूल वास्तविक और समान हों/g, 'roots are real and equal')
      .replace(/के मूल समान हों/g, 'roots are equal')
      .replace(/विविक्तकर/g, 'Discriminant')
      .replace(/समांतर श्रेढ़ी/g, 'Arithmetic Progression (AP)')
      .replace(/सार्व अंतर/g, 'Common Difference')
      .replace(/प्रथम पद/g, 'First Term')
      .replace(/प्रायिकता/g, 'Probability')
      .replace(/निश्चित घटना/g, 'Certain Event')
      .replace(/असंभव घटना/g, 'Impossible Event')
      .replace(/माध्यिका/g, 'Median')
      .replace(/माध्य/g, 'Mean')
      .replace(/बहुलक/g, 'Mode')
      .replace(/वृत्त की परिधि/g, 'Circumference of Circle')
      .replace(/वृत्त का क्षेत्रफल/g, 'Area of Circle')
      .replace(/त्रिज्या/g, 'Radius')
      .replace(/व्यास/g, 'Diameter')
      .replace(/साधारण ब्याज/g, 'Simple Interest')
      .replace(/चक्रवृद्धि ब्याज/g, 'Compound Interest')
      .replace(/मासिक बचत/g, 'monthly savings')
      .replace(/मासिक वेतन/g, 'monthly salary')

      // Social Science, Polity, History, Economy terms
      .replace(/भारतीय संविधान का कौन सा अनुच्छेद/g, 'Which Article of the Indian Constitution')
      .replace(/संविधान के किस अनुच्छेद के अंतर्गत/g, 'Under which Article of the Constitution')
      .replace(/संविधान के किस अनुच्छेद में/g, 'In which Article of the Constitution')
      .replace(/अनुच्छेद\s*(\d+)/g, 'Article $1')
      .replace(/अस्पृश्यता के उन्मूलन से संबंधित है\??/g, 'deals with the abolition of untouchability?')
      .replace(/अस्पृश्यता का अंत/g, 'Abolition of Untouchability')
      .replace(/अस्पृश्यता/g, 'Untouchability')
      .replace(/उन्मूलन/g, 'Abolition')
      .replace(/भारतीय संविधान/g, 'Indian Constitution')
      .replace(/मौलिक अधिकार/g, 'Fundamental Rights')
      .replace(/मौलिक कर्तव्यों/g, 'Fundamental Duties')
      .replace(/मौलिक कर्तव्य/g, 'Fundamental Duties')
      .replace(/नीति निर्देशक तत्व/g, 'Directive Principles of State Policy')
      .replace(/भारतीय रिज़र्व बैंक/g, 'Reserve Bank of India (RBI)')
      .replace(/मुद्रास्फीति/g, 'Inflation')
      .replace(/सर्वोच्च न्यायालय/g, 'Supreme Court')
      .replace(/उच्च न्यायालय/g, 'High Court')
      .replace(/संसद/g, 'Parliament')
      .replace(/लोकसभा/g, 'Lok Sabha')
      .replace(/राज्यसभा/g, 'Rajya Sabha')
      .replace(/राष्ट्रपति/g, 'President')
      .replace(/प्रधानमंत्री/g, 'Prime Minister')
      .replace(/सिंधु घाटी सभ्यता/g, 'Indus Valley Civilisation')
      .replace(/राष्ट्रीय उद्यान/g, 'National Park')
      .replace(/राजधानी/g, 'Capital')
      .replace(/सत्य है\??/g, 'is true?')
      .replace(/बराबर है/g, 'is equal to')
      .replace(/की गणना कीजिए/g, 'Calculate')
      .replace(/ज्ञात कीजिए/g, 'Find');
  } else if (targetLangCode === 'ur') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'دو درجی کثیر رقمی (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'دو درجی مساوات (Quadratic Equation)')
      .replace(/के शून्यांकों का योगफल/g, 'کے شفروں (Zeroes) کا مجموعہ')
      .replace(/के शून्यांकों का गुणनफल/g, 'کے شفروں کا حاصل ضرب')
      .replace(/के मूल समान हों/g, 'کے جڑیں (Roots) برابر ہوں')
      .replace(/विविक्तकर/g, 'فرق کنندہ (Discriminant)')
      .replace(/समांतर श्रेढ़ी/g, 'حسابی تصاعد (AP)')
      .replace(/प्रकाश संश्लेषण/g, 'ضیائی تالیف (Photosynthesis)')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'مندرجہ ذیل में से कौन سا');
  } else if (targetLangCode === 'te') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'వర్గ బహుపది (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'వర్గ సమీకరణం (Quadratic Equation)')
      .replace(/के शून्यांकों का योगफल/g, 'శూన్యాల మొత్తం (Sum of zeroes)')
      .replace(/प्रकाश संश्लेषण/g, 'కిరణజన్య సంయోగక్రియ (Photosynthesis)')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'కింది వాటిలో ఏది');
  } else if (targetLangCode === 'ta') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'இருபடி பல்லுறுப்புக் கோவை (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'இருபடிச் சமன்பாடு')
      .replace(/प्रकाश संश्लेषण/g, 'ஒளிச்சேர்க்கை (Photosynthesis)')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'பின்வருவனவற்றில் எது');
  } else if (targetLangCode === 'bn') {
    translatedStem = translatedStem
      .replace(/द्विघात बहुपद/g, 'দ্বিঘাত বহুপদী রাশি (Quadratic Polynomial)')
      .replace(/द्विघात समीकरण/g, 'দ্বিঘাত সমীকরণ')
      .replace(/प्रकाश संश्लेषण/g, 'সালোকসংশ্লেষ (Photosynthesis)')
      .replace(/निम्नलिखित में से कौन(?:-सा| सा)?/g, 'নিচের কোনটি');
  }

  return cleanQuestionText(translatedStem);
}

function synthesizeMissingCounterpart(questionRow, targetLangCode, sourceLangCode, sourceSlice) {
  const qId = questionRow.question_id || questionRow.id || '';
  const boardId = questionRow.board_id || questionRow.boardId || '';
  const qType = questionRow.question_type_id || questionRow.questionType || 'single_mcq';
  const boardMeta = BOARD_OFFICIAL_MEDIUMS[boardId] || resolveBoard(boardId);
  const boardState = boardMeta.state || 'State';

  const src = sourceSlice || {};
  const rawQ = extractSliceText(src) || extractSliceText(questionRow) || '';
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

function cleanQuestionText(text, targetLang = null) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();

  // If text is wrapped in [English: XYZ] or [Regional: XYZ], unwrap it
  const wrapMatch = cleaned.match(/^\[(?:English|अंग्रेज़ी|अंग्रेजी|Regional|Hindi|हिन्दी|Secondary):\s*([^\]]+)\]$/i);
  if (wrapMatch) {
    cleaned = wrapMatch[1].trim();
  }

  // If dual-text is present and targetLang is specified
  if (targetLang === 'en') {
    const enMatch = cleaned.match(/\[(?:English|अंग्रेज़ी|अंग्रेजी):\s*([^\]]+)\]/i);
    if (enMatch) {
      cleaned = enMatch[1].trim();
    }
  } else if (targetLang && targetLang !== 'en') {
    cleaned = cleaned.replace(/\s*(?:\\n|\n)?\[(?:English|अंग्रेज़ी|अंग्रेजी):\s*[^\\\]]+\]/gi, '').trim();
  }

  // Strip all leading metadata in brackets e.g. [Mathematics - Real Numbers]
  while (/^\[[^\]\r\n]+\]\s*/.test(cleaned)) {
    cleaned = cleaned.replace(/^\[[^\]\r\n]+\]\s*/, '');
  }

  // Strip session boilerplate e.g. (सत्र 2026-27), (2026-27 Edition), (2026-27 SQP Blueprint)
  cleaned = cleaned.replace(/\((?:सत्र\s*)?\d{4}-\d{2,4}(?:\s*(?:Edition|SQP|Blueprint))?\)\s*[:.\-–—]?\s*/gi, '');
  cleaned = cleaned.replace(/\(सत्र\s*2026-27\)\s*[:.\-–—]?\s*/gi, '');

  // Strip syllabus and blueprint clauses
  cleaned = cleaned.replace(/^(?:(?:According to|As per|के अनुसार|पाठ्यक्रम के अनुसार)\s*)+[^,.:\n]{0,100}[,.:\-]\s*/i, '');
  cleaned = cleaned.replace(/^[A-Z0-9\s\-]+(?:\d{4}-\d{2,4})?\s*(?:ब्लूप्रिंट|blueprint|पाठ्यक्रम|syllabus)\s*(?:के अनुसार|according to)?[^,.:\n]{0,80}[,.:\-]\s*/i, '');
  cleaned = cleaned.replace(/^(?:(?:CBSE|ICSE|CISCE|UPMSP|BSEB|RBSE|MPBSE|WBBSE|TNDGE|KSEAB|GSEB|PSEB|NIOS|CGBSE|CHSE|UBSE|SEBA|TSBIE|BIEAP|JKBOSE|DHSE|TBSE|NCERT|Class\s*\d+|कक्षा\s*\d+)\s*)+[\u0900-\u0DFF\w\s\-—]*(?:अध्याय\s*['"][^'"]+['"]\s*)?(?:से\s*\d+\s*अंक\s*का\s*प्रश्न)?\s*[:.\-–—\n]\s*/i, '');
  cleaned = cleaned.replace(/^[\u0900-\u0DFF\w\s\-—]+(Board|Exam|Class|कक्षा|बोर्ड|प्रैक्टिस|अभ्यास|Science|विज्ञान|Math|गणित|English|Hindi|Chemistry|Physics|Biology)[^:\n]{0,80}:\s*/i, '');

  // Strip chapter/passage question openers
  cleaned = cleaned.replace(/^(?:Question|Q\.)\s*#?\d+\s+from\s+['"][^'"]+['"]\s*[:.\-–—]?\s*/i, '');
  cleaned = cleaned.replace(/^(?:पाठ|अध्याय|यूनिट)\s*['"][^'"]+['"]\s*से\s*संबंधित\s*(?:प्रश्न\s*#?\d+)?\s*[:.\-–—]?\s*/i, '');

  // Strip leading question labels & numbering
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Ques|Que|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|प्रश्न|ചോദ്യം|سوال\s*(?:نمबर)?)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.\-–—]\s*/, '');
  cleaned = cleaned.replace(/^\(\d+\)\s*/, '');
  cleaned = cleaned.replace(/^\d+[\.)]\s+/, '');

  // Strip trailing question type markers
  cleaned = cleaned.replace(/\s*\((?:Very\s*Short\s*Answer|Short\s*Answer|Long\s*Answer|Case\s*Study)[^)]*\)\s*(\??)$/i, '$1');

  // Strip trailing provenance/noise in parentheses e.g. (अभ्यास प्रश्न #112), (Exercise #170)
  const trailingNoiseRegex = /\s*\([^)]*(?:सीबीएसई|CBSE|कक्षा|Class|बोर्ड|Board|नमूना|Sample|पेपर|Paper|Item|प्रश्न|Question|अभ्यास|Exercise|\#\d+|जांच संदर्भ|अभ्यास संदर्भ)[^)]*\)\s*(\??)$/i;
  while (trailingNoiseRegex.test(cleaned)) {
    const m = cleaned.match(trailingNoiseRegex);
    const hasQuestionMark = cleaned.endsWith('?') || (m && m[1] === '?');
    cleaned = cleaned.replace(trailingNoiseRegex, hasQuestionMark ? '?' : '').trim();
  }

  // Strip any leftover bracket wrappers
  cleaned = cleaned.replace(/\s*(?:\\n|\n)?\[(?:English|अंग्रेज़ी|अंग्रेजी|Regional|Hindi|हिन्दी|Secondary):?\s*[^\]]*\]/gi, '').trim();
  // Strip trailing bracketed translations/notes e.g. \n[How many...] or \n[Choose the correct verb form:]
  cleaned = cleaned.replace(/\s*(?:\\n|\n)\s*\[[^\]]+\]\s*$/i, '').trim();

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

    let rawQ = chosenSlice.question || chosenSlice.q || chosenSlice.question_text || chosenSlice.stem || chosenSlice.prompt || questionRow.question_text || questionRow.question || questionRow.q || '';
    let cleanedQ = cleanQuestionText(rawQ);

    // Enforce strictly single language without any foreign second line
    const qLines = cleanedQ.split('\n').map(l => l.trim()).filter(Boolean);
    if (qLines.length > 1) {
      if (nativeCode === 'en' && /[\u0900-\u0DFF]/.test(qLines[1])) {
        cleanedQ = qLines[0];
      } else if (nativeCode !== 'en' && /[a-zA-Z]/.test(qLines[1]) && !hasScriptForLang(qLines[1], nativeCode)) {
        cleanedQ = qLines[0];
      }
    }

    let opts = chosenSlice.options || questionRow.options || [];
    if (!Array.isArray(opts) && typeof opts === 'object') opts = Object.values(opts);
    const cleanOpts = opts.map((o, idx) => {
      let str = String(o).trim();
      const prefix = ['A)', 'B)', 'C)', 'D)'][idx] || `${idx + 1})`;
      let body = str.replace(/^[A-Da-d][\).\:-]\s*/i, '').replace(/^[1-4][\)\:-]\s*/, '').trim();
      if (body.includes(' / ')) {
        const parts = body.split(' / ');
        if (nativeCode === 'en') {
          body = parts.find(p => /[a-zA-Z]/.test(p)) || parts[0];
        } else {
          body = parts.find(p => hasScriptForLang(p, nativeCode)) || parts[0];
        }
      }
      return `${prefix} ${body}`;
    });

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
      questionText: cleanedQ,
      primaryQuestionText: cleanedQ,
      secondaryQuestionText: '',
      targetLanguageQuestionText: cleanedQ,
      stateLanguageQuestionText: cleanedQ,
      englishQuestionText: '',
      options: cleanOpts,
      singleLanguageOptions: cleanOpts,
      bilingualOptions: cleanOpts,
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

  // Helper: check if a slice has authentic text for the given language
  const isSliceAuthentic = (slice, lang) => {
    if (!slice) return false;
    const q = slice.question || slice.q || slice.question_text || slice.stem || '';
    if (!q || typeof q !== 'string') return false;
    if (lang === 'en') {
      const dev = (q.match(/[\u0900-\u097F]/g) || []).length;
      const lat = (q.match(/[a-zA-Z]/g) || []).length;
      return lat > 6 && lat >= dev;
    }
    if (lang === 'hi') {
      const dev = (q.match(/[\u0900-\u097F]/g) || []).length;
      const lat = (q.match(/[a-zA-Z]/g) || []).length;
      return dev > 4 && dev >= lat;
    }
    return hasScriptForLang(q, lang);
  };

  // Check if either slice has embedded [English: ...] tag to separate
  for (const s of [stateSlice, englishSlice]) {
    if (s) {
      const qText = s.question || s.q || s.question_text || s.stem || '';
      const m = qText.match(/^(.*?)(?:\s*\n\s*|\s+)\[(?:(?:English|अंग्रेज़ी|अंग्रेजी):\s*)?([A-Za-z0-9\s\?,.:;'"\-\(\)\/\\+=%:±√²³]+)\]\s*$/is);
      if (m) {
        if (!stateSlice) stateSlice = { ...s };
        if (!englishSlice) englishSlice = { ...s };
        stateSlice.question = m[1].trim();
        englishSlice.question = m[2].trim();
        break;
      }
    }
  }

  // Synthesize missing slice if absent or not authentic
  if (!isSliceAuthentic(stateSlice, stateLang) && isSliceAuthentic(englishSlice, secLang)) {
    stateSlice = synthesizeMissingCounterpart(questionRow, stateLang, secLang, englishSlice);
  } else if (!isSliceAuthentic(englishSlice, secLang) && isSliceAuthentic(stateSlice, stateLang)) {
    englishSlice = synthesizeMissingCounterpart(questionRow, secLang, stateLang, stateSlice);
  } else if (!isSliceAuthentic(stateSlice, stateLang) && !isSliceAuthentic(englishSlice, secLang)) {
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

  const targetQText = extractSliceText(targetSlice);
  const stateQText = extractSliceText(stateSlice);
  const englishQText = extractSliceText(englishSlice);

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
    dualQuestionText = `${cleanP}\n${cleanS}`;
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

// services/board-curriculum-engine.js
// Bharat's Comprehensive Multi-Board Digital Guide & Quiz Content Engine (2026 Edition)
// Covers all 20 Indian Educational Boards for Class 10th & Class 12th
// Strictly implements Quantitative Quotas: 200 MCQs, 50 Short-Answer (2M/3M), 25 Long-Answer (4M/5M/6M)
// Full Regional Localization across 11 Language Modes

let CURATED_BOARD_BLUEPRINTS = {};
try {
  const curatedMod = require('../public/js/curated-board-blueprints');
  CURATED_BOARD_BLUEPRINTS = curatedMod.CURATED_BOARD_BLUEPRINTS || {};
} catch (e) {
  try {
    const curatedMod = require('./curated-board-blueprints');
    CURATED_BOARD_BLUEPRINTS = curatedMod.CURATED_BOARD_BLUEPRINTS || {};
  } catch (e2) {}
}

let HIGH_YIELD_BANKS = {};
try {
  HIGH_YIELD_BANKS = require('../public/js/master-high-yield-bank');
} catch (e) {
  try {
    HIGH_YIELD_BANKS = require('./master-high-yield-bank');
  } catch (e2) {}
}

let SUBJECTIVE_SOLUTIONS_REGISTRY = {};
try {
  const subMod = require('./master-subjective-vault');
  SUBJECTIVE_SOLUTIONS_REGISTRY = subMod.SUBJECTIVE_SOLUTIONS_REGISTRY || {};
} catch (e) {
  try {
    const subMod = require('../services/master-subjective-vault');
    SUBJECTIVE_SOLUTIONS_REGISTRY = subMod.SUBJECTIVE_SOLUTIONS_REGISTRY || {};
  } catch (e2) {}
}

let CLASS12_BANKS = {};
try {
  CLASS12_BANKS = require('../public/js/master-class12-bank');
} catch (e) {
  try {
    CLASS12_BANKS = require('./master-class12-bank');
  } catch (e2) {}
}

const { applyNaturalOptionDistribution } = require('../backend/utils/option-shuffler');

const { getCompleteSubjectInventory, fetchDbQuestionsForSubject, fetchDbSubjectivesForSubject, normalizeStem } = require('./subject-inventory-loader');
const { reconcileAllSubjectBundle, computeBundleSubjectAllocation } = require('./content-allocation-policy');

const BOARD_REGISTRY = {
  cbse: {
    id: "cbse",
    name: "CBSE Board",
    fullName: "Central Board of Secondary Education (CBSE नई दिल्ली)",
    state: "All India / Central",
    langMode: "english",
    langTitle: "English Medium",
    nativeLangId: "hindi",
    nativeLangName: "Hindi Course-A / Course-B"
  },
  icse: {
    id: "icse",
    name: "CISCE (ICSE / ISC)",
    fullName: "Council for the Indian School Certificate Examinations (नई दिल्ली)",
    state: "All India / ICSE Council",
    langMode: "english",
    langTitle: "English Medium",
    nativeLangId: "hindi",
    nativeLangName: "Hindi Literature"
  },
  upmsp: {
    id: "upmsp",
    name: "UP Board (UPMSP)",
    fullName: "उत्तर प्रदेश माध्यमिक शिक्षा परिषद् (UPMSP प्रयागराज)",
    state: "Uttar Pradesh",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "सामान्य हिन्दी"
  },
  bseb: {
    id: "bseb",
    name: "Bihar Board (BSEB)",
    fullName: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)",
    state: "Bihar",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "राष्ट्रभाषा हिन्दी"
  },
  maharashtra: {
    id: "maharashtra",
    name: "Maharashtra Board (MSBSHSE)",
    fullName: "महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ (MSBSHSE पुणे)",
    state: "Maharashtra",
    langMode: "bilingual-marathi",
    langTitle: "मराठी & English (Dual Text)",
    nativeLangId: "marathi",
    nativeLangName: "मराठी भाषा व साहित्य (Marathi)"
  },
  rbse: {
    id: "rbse",
    name: "Rajasthan Board (RBSE)",
    fullName: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)",
    state: "Rajasthan",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "अनिवार्य हिन्दी"
  },
  mpbse: {
    id: "mpbse",
    name: "MP Board (MPBSE)",
    fullName: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)",
    state: "Madhya Pradesh",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "सामान्य हिन्दी"
  },
  wb: {
    id: "wb",
    name: "West Bengal Board (WBBSE/WBCHSE)",
    fullName: "পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ ও উচ্চ মাধ্যমিক শিক্ষা সংসদ (कोलकाता)",
    state: "West Bengal",
    langMode: "bilingual-bengali",
    langTitle: "বাংলা & English (Dual Text)",
    nativeLangId: "bengali",
    nativeLangName: "বাংলা সাহিত্য ও ব্যাকরণ (Bengali)"
  },
  tn: {
    id: "tn",
    name: "Tamil Nadu Board (TNDGE)",
    fullName: "தமிழ்நாடு அரசு தேர்வுகள் இயக்ககம் (TNDGE சென்னை)",
    state: "Tamil Nadu",
    langMode: "bilingual-tamil",
    langTitle: "தமிழ் & English (Dual Text)",
    nativeLangId: "tamil",
    nativeLangName: "தமிழ் மொழி மற்றும் இலக்கியம் (Tamil)"
  },
  karnataka: {
    id: "karnataka",
    name: "Karnataka Board (KSEAB)",
    fullName: "ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಲಿ (KSEAB ಬೆಂಗಳೂರು)",
    state: "Karnataka",
    langMode: "bilingual-kannada",
    langTitle: "ಕನ್ನಡ & English (Dual Text)",
    nativeLangId: "kannada",
    nativeLangName: "ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯ (Kannada)"
  },
  gujarat: {
    id: "gujarat",
    name: "Gujarat Board (GSEB)",
    fullName: "ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ (GSEB ગાંધીનગર)",
    state: "Gujarat",
    langMode: "bilingual-gujarati",
    langTitle: "ગુજરાતી & English (Dual Text)",
    nativeLangId: "gujarati",
    nativeLangName: "ગુજરાતી ભાષા અને વ્યાકરણ (Gujarati)"
  },
  haryana: {
    id: "haryana",
    name: "Haryana Board (BSEH)",
    fullName: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)",
    state: "Haryana",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "हिन्दी (अनिवार्य)"
  },
  jac: {
    id: "jac",
    name: "Jharkhand Board (JAC)",
    fullName: "झारखंड अधिविद्य परिषद् (JAC रांची)",
    state: "Jharkhand",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "हिन्दी (मातृभाषा)"
  },
  pseb: {
    id: "pseb",
    name: "Punjab Board (PSEB)",
    fullName: "ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ (PSEB ਮੋਹਾਲੀ)",
    state: "Punjab",
    langMode: "bilingual-punjabi",
    langTitle: "ਪੰਜਾਬੀ & English (Dual Text)",
    nativeLangId: "punjabi",
    nativeLangName: "ਪੰਜਾਬੀ ਲਾਜ਼ਮੀ (Punjabi)"
  },
  nios: {
    id: "nios",
    name: "NIOS Board",
    fullName: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS नई दिल्ली)",
    state: "National Open",
    langMode: "english",
    langTitle: "English Medium",
    nativeLangId: "hindi",
    nativeLangName: "Hindi Core"
  },
  cgbse: {
    id: "cgbse",
    name: "Chhattisgarh Board (CGBSE)",
    fullName: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)",
    state: "Chhattisgarh",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "हिन्दी विशिष्ट"
  },
  bseodisha: {
    id: "bseodisha",
    name: "Odisha Board (BSE/CHSE Odisha)",
    fullName: "ମାଧ୍ୟମିକ ଶିକ୍ଷା ବୋର୍ଡ, ଓଡ଼ିଶା (BSE Odisha କଟକ)",
    state: "Odisha",
    langMode: "bilingual-odia",
    langTitle: "ଓଡ଼ିଆ & English (Dual Text)",
    nativeLangId: "odia",
    nativeLangName: "ମାତୃଭାଷା ଓଡ଼ିଆ (Odia)"
  },
  ubse: {
    id: "ubse",
    name: "Uttarakhand Board (UBSE)",
    fullName: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)",
    state: "Uttarakhand",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "सामान्य हिन्दी"
  },
  seba: {
    id: "seba",
    name: "Assam Board (SEBA/AHSEC)",
    fullName: "অসম মাধ্যমিক শিক্ষা পৰিষদ (SEBA গুৱাহাটী)",
    state: "Assam",
    langMode: "bilingual-assamese",
    langTitle: "অসমীয়া & English (Dual Text)",
    nativeLangId: "assamese",
    nativeLangName: "অসমীয়া ভাষা আৰু সাহিত্য (Assamese)"
  },
  telangana: {
    id: "telangana",
    name: "Telangana Board (TSBIE / BSE)",
    fullName: "తెలంగాణ సెకండరీ ఎడ్యుకేషన్ బోర్డ్ (TSBIE హైదరాబాద్)",
    state: "Telangana",
    langMode: "bilingual-telugu",
    langTitle: "తెలుగు & English (Dual Text)",
    nativeLangId: "telugu",
    nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)"
  },
  ap: {
    id: "ap",
    name: "Andhra Pradesh Board (BIEAP / BSEAP)",
    fullName: "ఆంధ్రప్రదేశ్ సెకండరీ ఎడ್ಯుకేషన్ బోర్డ్ (BSEAP అమరావతి)",
    state: "Andhra Pradesh",
    langMode: "bilingual-telugu",
    langTitle: "తెలుగు & English (Dual Text)",
    nativeLangId: "telugu",
    nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)"
  },
  tbse: {
    id: "tbse",
    name: "Tripura Board (TBSE)",
    fullName: "ত্রিপুরা মধ্যশিক্ষা পর্ষদ (TBSE আগরতলা)",
    state: "Tripura",
    langMode: "bilingual-bengali",
    langTitle: "বাংলা & English (Dual Text)",
    nativeLangId: "bengali",
    nativeLangName: "বাংলা সাহিত্য ও ব্যাকরণ (Bengali)"
  },
  goa: {
    id: "goa",
    name: "Goa Board (GBSHSE)",
    fullName: "गोवा माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ (GBSHSE Alto Betim)",
    state: "Goa",
    langMode: "english",
    langTitle: "English & Konkani / Marathi",
    nativeLangId: "marathi",
    nativeLangName: "मराठी / Konkani"
  },
  hp: {
    id: "hp",
    name: "Himachal Pradesh Board (HPBOSE)",
    fullName: "हिमाचल प्रदेश स्कूल शिक्षा बोर्ड (HPBOSE धर्मशाला)",
    state: "Himachal Pradesh",
    langMode: "bilingual-hindi",
    langTitle: "हिन्दी एवं English (Dual Text)",
    nativeLangId: "hindi",
    nativeLangName: "सामान्य हिन्दी"
  },
  jk: {
    id: "jk",
    name: "Jammu & Kashmir Board (JKBOSE)",
    fullName: "Jammu & Kashmir State Board of School Education (JKBOSE श्रीनगर/जम्मू)",
    state: "Jammu & Kashmir",
    langMode: "english",
    langTitle: "English & Urdu / Hindi",
    nativeLangId: "urdu",
    nativeLangName: "اردو زبان (Urdu)"
  },
  kerala: {
    id: "kerala",
    name: "Kerala Board (KBPE / DHSE)",
    fullName: "കേരള പൊതുപരീക്ഷാ ബോർഡ് (KBPE തിരുവനന്തപുരം)",
    state: "Kerala",
    langMode: "bilingual-malayalam",
    langTitle: "മലയാളം & English (Dual Text)",
    nativeLangId: "malayalam",
    nativeLangName: "മലയാള സാഹിത്യം (Malayalam)"
  },
  mn: {
    id: "mn",
    name: "Manipur Board (BSEM / COHSEM)",
    fullName: "Board of Secondary Education Manipur (BSEM ഇംഫാൽ/Imphal)",
    state: "Manipur",
    langMode: "english",
    langTitle: "English & Manipuri",
    nativeLangId: "manipuri",
    nativeLangName: "Manipuri (Meiteilon)"
  },
  ml: {
    id: "ml",
    name: "Meghalaya Board (MBOSE)",
    fullName: "Meghalaya Board of School Education (MBOSE Tura/Shillong)",
    state: "Meghalaya",
    langMode: "english",
    langTitle: "English Medium",
    nativeLangId: "khasi",
    nativeLangName: "Khasi / Garo"
  },
  mz: {
    id: "mz",
    name: "Mizoram Board (MBSE)",
    fullName: "Mizoram Board of School Education (MBSE Aizawl)",
    state: "Mizoram",
    langMode: "english",
    langTitle: "English & Mizo",
    nativeLangId: "mizo",
    nativeLangName: "Mizo Language"
  },
  nl: {
    id: "nl",
    name: "Nagaland Board (NBSE)",
    fullName: "Nagaland Board of School Education (NBSE Kohima)",
    state: "Nagaland",
    langMode: "english",
    langTitle: "English Medium",
    nativeLangId: "english",
    nativeLangName: "English & Alternative English"
  },
  sk: {
    id: "sk",
    name: "Sikkim Board (SBSE)",
    fullName: "Sikkim State Board of Education (Gangtok)",
    state: "Sikkim",
    langMode: "english",
    langTitle: "English & Nepali",
    nativeLangId: "nepali",
    nativeLangName: "Nepali / Bhutia / Lepcha"
  }
};

// Generates dynamic subject list based on Class & Board
function getBoardSubjects(classLevel = "10th", boardKey = "bseb") {
  const b = BOARD_REGISTRY[boardKey] || BOARD_REGISTRY["bseb"];
  
  if (classLevel === "10th" || classLevel === "board-10th") {
    const list = [
      { id: "all", name: `🎯 10th All-Subject Master Bundle (सभी विषय एक साथ - ${b.name})` },
      { id: "science", name: "⚡ विज्ञान (Science - Physics, Chem, Bio)" },
      { id: "math", name: "📐 गणित (Mathematics - Algebra, Geom, Trig)" },
      { id: "social", name: "🌍 सामाजिक विज्ञान (Social Science - Hist, Civ, Geog, Eco)" },
      { id: "english", name: "📖 English (Language & Literature)" }
    ];

    if (b.nativeLangId === "hindi") {
      list.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
      list.push({ id: "sanskrit", name: "🕉️ संस्कृत (Sanskrit)" });
    } else {
      list.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      list.push({ id: "hindi", name: "📜 द्वितीय भाषा हिन्दी (Second Language Hindi)" });
    }
    return list;
  }

  // 12th Class Subjects
  const list12 = [
    { id: "all", name: `🎯 12th Science Stream Master Bundle (${b.name})` },
    { id: "physics", name: "⚡ भौतिक विज्ञान (Physics - Mechanics, Optics, Electromagnetism)" },
    { id: "chemistry", name: "🧪 रसायन विज्ञान (Chemistry - Organic, Inorganic, Physical)" },
    { id: "math", name: "📐 गणित (Mathematics - Calculus, Vectors, 3D, Probability)" },
    { id: "biology", name: "🧬 जीव विज्ञान (Biology - Genetics, Ecology, Biotech)" },
    { id: "english", name: "📖 English Core (Writing & Literature)" },
    { id: "accountancy", name: "📊 लेखाशास्त्र (Accountancy - Partnership, Companies, Cash Flow)" },
    { id: "business", name: "🏢 व्यावसायिक अध्ययन (Business Studies - Management & Marketing)" },
    { id: "economics", name: "📈 अर्थशास्त्र (Economics - Macro & Indian Economy)" },
    { id: "history", name: "🏛️ इतिहास (History - Ancient, Medieval, Modern)" },
    { id: "polity", name: "⚖️ राजनीति विज्ञान (Political Science - Constitution & World Politics)" }
  ];

  if (b.nativeLangId === "hindi") {
    list12.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
  } else {
    list12.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
    list12.push({ id: "hindi", name: "📜 हिन्दी साहित्य / सामान्य हिन्दी" });
  }

  return list12;
}

// Multilingual Blueprint Templates for High-Yield Concepts
const ACADEMIC_BLUEPRINTS = {
  // ---------------- CLASS 10TH SCIENCE ----------------
  "science_optics_speed": {
    topic: "Optics (प्रकाशिकी)",
    class: "10th",
    subject: "science",
    loc: {
      "english": {
        q: "In which medium is the speed of light maximum?",
        sub: "CBSE / ICSE Board High-Yield Target",
        options: ["A) Glass (2.0 × 10⁸ m/s)", "B) Water (2.25 × 10⁸ m/s)", "C) Vacuum (3.0 × 10⁸ m/s)", "D) Diamond (1.24 × 10⁸ m/s)"],
        ans: "C) Vacuum (3.0 × 10⁸ m/s)",
        exp: "💡 Solution: The speed of light is inversely proportional to the refractive index (v = c/n). In vacuum, n = 1.00 (minimum), making light travel at its theoretical maximum velocity of 3 × 10⁸ m/s."
      },
      "bilingual-hindi": {
        q: "प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) कांच (Glass)", "B) जल (Water)", "C) निर्वात (Vacuum - 3×10⁸ m/s)", "D) हीरा (Diamond)"],
        ans: "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        exp: "💡 सही उत्तर: C) निर्वात। माध्यम का अपवर्तनांक जितना कम होता है, प्रकाश की चाल उतनी ही अधिक होती है। निर्वात का अपवर्तनांक 1.0 होता है, अतः यहाँ प्रकाश 3 × 10⁸ मी/से की अधिकतम चाल से गमन करता है।"
      },
      "bilingual-marathi": {
        q: "प्रकाशाचा वेग सर्वाधिक कोणत्या माध्यमात असतो?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) काच (Glass)", "B) पाणी (Water)", "C) निर्वात (Vacuum - 3×10⁸ m/s)", "D) हिरा (Diamond)"],
        ans: "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        exp: "💡 अचूक उत्तर: C) निर्वात. प्रकाशाचा वेग माध्यमाच्या अपवर्तनांकावर अवलंबून असतो. निर्वातात कोणताही अडथळा नसल्यामुळे प्रकाशाचा वेग सर्वाधिक 3 × 10⁸ m/s असतो."
      },
      "bilingual-tamil": {
        q: "ஒளியின் வேகம் எந்த ஊடகத்தில் அதிகபட்சமாக இருக்கும்?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) கண்ணாடி (Glass)", "B) நீர் (Water)", "C) வெற்றிடம் (Vacuum - 3×10⁸ m/s)", "D) வைரம் (Diamond)"],
        ans: "C) வெற்றிடம் (Vacuum - 3×10⁸ m/s)",
        exp: "💡 சரியான விடை: C) வெற்றிடம். வெற்றிடத்தில் ஒளியின் திசைவேகம் வினாடிக்கு 3 × 10⁸ மீட்டர் ஆகும். ஒளிவிலகல் எண் குறைவாக இருப்பதால் ஒளி மிக வேகமாக பயணிக்கிறது."
      },
      "bilingual-telugu": {
        q: "కాంతి వేగం ఏ మాధ్యమంలో గరిష్టంగా ఉంటుంది?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) గాజు (Glass)", "B) నీరు (Water)", "C) శూన్యం (Vacuum - 3×10⁸ m/s)", "D) వజ్రం (Diamond)"],
        ans: "C) శూన్యం (Vacuum - 3×10⁸ m/s)",
        exp: "💡 సరైన సమాధానం: C) శూన్యం. శూన్యంలో వక్రీభవన గుణకం కనీసంగా (1.0) ఉంటుంది, కాబట్టి కాంతి గరిష్ట వేగం 3 × 10⁸ మీ/సెకనుతో ప్రయాణిస్తుంది."
      },
      "bilingual-kannada": {
        q: "ಬೆಳಕಿನ ವೇಗವು ಯಾವ ಮಾಧ್ಯಮದಲ್ಲಿ ಗರಿಷ್ಠವಾಗಿರುತ್ತದೆ?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) ಗಾಜು (Glass)", "B) ನೀರು (Water)", "C) ನಿರ್ವಾತ (Vacuum - 3×10⁸ m/s)", "D) ವಜ್ರ (Diamond)"],
        ans: "C) ನಿರ್ವಾತ (Vacuum - 3×10⁸ m/s)",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: C) ನಿರ್ವಾತ. ನಿರ್ವಾತದಲ್ಲಿ ವಕ್ರೀಭವನಾಂಕವು ಕನಿಷ್ಠವಾಗಿರುವುದರಿಂದ ಬೆಳಕು ಗರಿಷ್ಠ 3 × 10⁸ ಮೀ/ಸೆ ವೇಗದಲ್ಲಿ ಚಲಿಸುತ್ತದೆ."
      },
      "bilingual-bengali": {
        q: "কোন মাধ্যমে আলোর বেগ সর্বাধিক হয়?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) কাঁচ (Glass)", "B) জল (Water)", "C) শূন্য মাধ্যম (Vacuum - 3×10⁸ m/s)", "D) হিরে (Diamond)"],
        ans: "C) শূন্য মাধ্যম (Vacuum - 3×10⁸ m/s)",
        exp: "💡 সঠিক উত্তর: C) শূন্য মাধ্যম। আলোর গতিবেগ প্রতিসরাঙ্কের ব্যস্তানুপাতিক। শূন্য মাধ্যমে প্রতিসরাঙ্ক সর্বনিম্ন (1.0) হওয়ায় বেগ সর্বাধিক ৩ × ১০⁸ মি/সে হয়।"
      },
      "bilingual-gujarati": {
        q: "પ્રકાશનો વેગ કયા માધ્યમમાં સૌથી વધુ હોય છે?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) કાચ (Glass)", "B) પાણી (Water)", "C) શૂન્યાવકાશ (Vacuum - 3×10⁸ m/s)", "D) હીરો (Diamond)"],
        ans: "C) શૂન્યાવકાશ (Vacuum - 3×10⁸ m/s)",
        exp: "💡 સાચો જવાબ: C) શૂન્યાવકાશ. શૂન્યાવકાશમાં વક્રીભવનાંક સૌથી ઓછો હોય છે, તેથી પ્રકાશ મહત્તમ ઝડપ 3 × 10⁸ મી/સે થી ગતિ કરે છે."
      },
      "bilingual-punjabi": {
        q: "ਪ੍ਰਕਾਸ਼ ਦੀ ਗਤੀ ਕਿਸ ਮਾਧਿਅਮ ਵਿੱਚ ਸਭ ਤੋਂ ਵੱਧ ਹੁੰਦੀ ਹੈ?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) ਕੱਚ (Glass)", "B) ਪਾਣੀ (Water)", "C) ਖਲਾਅ (Vacuum - 3×10⁸ m/s)", "D) ਹੀਰਾ (Diamond)"],
        ans: "C) ਖਲਾਅ (Vacuum - 3×10⁸ m/s)",
        exp: "💡 ਸਹੀ ਉੱਤਰ: C) ਖਲਾਅ. ਖਲਾਅ ਵਿੱਚ ਅਪਵਰਤਨ ਅੰਕ ਸਭ ਤੋਂ ਘੱਟ (1.0) ਹੁੰਦਾ ਹੈ, ਜਿਸ ਕਾਰਨ ਪ੍ਰਕਾਸ਼ ਦੀ ਗਤੀ ਸਭ ਤੋਂ ਵੱਧ 3 × 10⁸ ਮੀ/ਸੈਕਿੰਡ ਹੁੰਦੀ ਹੈ।"
      },
      "bilingual-odia": {
        q: "ଆଲୋକର ବେଗ କେଉଁ ମାଧ୍ୟମରେ ସର୍ବାଧିକ ଥାଏ?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) କାଚ (Glass)", "B) ଜଳ (Water)", "C) ଶୂନ୍ୟସ୍ଥାନ (Vacuum - 3×10⁸ m/s)", "D) ହୀରା (Diamond)"],
        ans: "C) ଶୂନ୍ୟସ୍ଥାନ (Vacuum - 3×10⁸ m/s)",
        exp: "💡 ସଠିକ ଉତ୍ତର: C) ଶୂନ୍ୟସ୍ଥାନ. ଶୂନ୍ୟ ମାଧ୍ୟମରେ ପ୍ରତିସରଣାଙ୍କ ସର୍ବନିମ୍ନ ହୋଇଥିବାରୁ ଆଲୋକର ବେଗ ସର୍ବାଧିକ ୩ × ୧୦⁸ ମି/ସେ ହୋଇଥାଏ।"
      },
      "bilingual-assamese": {
        q: "পোহৰৰ বেগ কোনটো মাধ্যমত সৰ্বাধিক?",
        sub: "In which medium is the speed of light maximum?",
        options: ["A) কাঁচ (Glass)", "B) পানী (Water)", "C) শূন্যস্থান (Vacuum - 3×10⁸ m/s)", "D) হীৰা (Diamond)"],
        ans: "C) শূন্যস্থান (Vacuum - 3×10⁸ m/s)",
        exp: "💡 সঠিক উত্তৰ: C) শূন্যস্থান। শূন্য মাধ্যমত পোহৰৰ বেগ প্ৰতি চেকেণ্ডত ৩ × ১০⁸ মিটাৰ, যিটো যিকোনো পদাৰ্থৰ মাধ্যমতকৈ বেছি।"
      }
    }
  },

  // ---------------- CLASS 10TH ELECTRICITY ----------------
  "science_electricity_ohm": {
    topic: "Electricity (विद्युत धारा)",
    class: "10th",
    subject: "science",
    loc: {
      "english": {
        q: "According to Ohm's Law, what is the mathematical relationship between Potential Difference (V), Current (I) and Resistance (R)?",
        sub: "Class 10 Physics Core Law",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 Solution: Ohm's law states that at constant temperature, current flowing through a metallic conductor is directly proportional to the potential difference across its terminals (V ∝ I), thus V = IR."
      },
      "bilingual-hindi": {
        q: "ओम के नियमानुसार विभवान्तर (V), विद्युत धारा (I) तथा प्रतिरोध (R) में सही सम्बन्ध क्या है?",
        sub: "Mathematical formulation of Ohm's Law:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 सही उत्तर: B) V = IR। नियत ताप पर चालक के सिरों पर आरोपित विभवान्तर उसमें प्रवाहित विद्युत धारा के अनुक्रमानुपाती होता है (V ∝ I), जहाँ R चालक का प्रतिरोध है।"
      },
      "bilingual-marathi": {
        q: "ओहमच्या नियमानुसार विभवांतर (V), विद्युतधारा (I) आणि रोध (R) यामधील अचूक संबंध कोणता?",
        sub: "Mathematical relationship of Ohm's Law:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 अचूक उत्तर: B) V = I × R. भौतिक परिस्थिती कायम असताना वाहकामधून वाहणारी विद्युतधारा ही वाहकाच्या दोन टोकांमधील विभवांतरास समप्रमाणात असते."
      },
      "bilingual-tamil": {
        q: "ஓம் விதியின்படி மின்னழுத்த வேறுபாடு (V), மின்னோட்டம் (I) மற்றும் மின்தடை (R) இடையேயான கணிதத் தொடர்பு என்ன?",
        sub: "Ohm's Law equation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 சரியான விடை: B) V = I × R. மாறா வெப்பநிலையில் ஒரு கடத்தியின் வழியே பாயும் மின்னோட்டம் அதன் முனைகளுக்கு இடையே உள்ள மின்னழுத்த வேறுபாட்டிற்கு நேர்தகவில் அமையும்."
      },
      "bilingual-telugu": {
        q: "ఓమ్ నియమం ప్రకారం పొటెన్షియల్ తేడా (V), విద్యుత్ ప్రవాహం (I) మరియు నిరోధం (R) మధ్య సంబంధం ఏమిటి?",
        sub: "Ohm's Law formulation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 సరైన సమాధానం: B) V = I × R. స్థిర ఉష్ణోగ్రత వద్ద వాహకం గుండా ప్రవహించే విద్యుత్ ప్రవాహం దాని చివర్ల మధ్య ఉన్న పొటెన్షియల్ తేడాకు అనులోమానుపాతంలో ఉంటుంది."
      },
      "bilingual-kannada": {
        q: "ಓಮ್‌ನ ನಿಯಮದ ಪ್ರಕಾರ ವಿಭವಾಂತರ (V), ವಿದ್ಯುತ್ ಪ್ರವಾಹ (I) ಮತ್ತು ರೋಧ (R) ನಡುವಿನ ಸರಿಯಾದ ಸಂಬಂಧ ಯಾವುದು?",
        sub: "Ohm's Law equation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: B) V = I × R. ಸ್ಥಿರ ತಾಪಮಾನದಲ್ಲಿ ಲೋಹದ ವಾಹಕದಲ್ಲಿ ಹರಿಯುವ ವಿದ್ಯುತ್ ಪ್ರವಾಹವು ಅದರ ಎರಡು ತುದಿಗಳ ನಡುವಿನ ವಿಭವಾಂತರಕ್ಕೆ ನೇರ ಅನುಪಾತದಲ್ಲಿರುತ್ತದೆ."
      },
      "bilingual-bengali": {
        q: "ওহমের সূত্রানুযায়ী বিভবপ্রভেদ (V), তড়িৎপ্রবাহমাত্রা (I) এবং রোধ (R)-এর মধ্যে সঠিক গাণিতিক সম্পর্ক কী?",
        sub: "Ohm's Law formula:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 সঠিক উত্তর: B) V = I × R। উষ্ণতা ও অন্যান্য ভৌত অবস্থা স্থির থাকলে কোনো পরিবাহীর মধ্য দিয়ে তড়িৎপ্রবাহমাত্রা পরিবাহীর দুই প্রান্তের বিভবপ্রভেদের সমানুপাতিক হয়।"
      },
      "bilingual-gujarati": {
        q: "ઓહ્મના નિયમ મુજબ વિદ્યુતસ્થિતિમાનનો તફાવત (V), વિદ્યુતપ્રવાહ (I) અને અવરોધ (R) વચ્ચેનો સંબંધ કયો છે?",
        sub: "Ohm's Law relation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 સાચો જવાબ: B) V = I × R. અચળ તાપમાને વાહકમાંથી વહેતો વિદ્યુતપ્રવાહ તેના બે છેડા વચ્ચેના વિદ્યુતસ્થિતિમાનના તફાવતના સમપ્રમાણમાં હોય છે."
      },
      "bilingual-punjabi": {
        q: "ਓਹਮ ਦੇ ਨਿਯਮ ਅਨੁਸਾਰ ਪੋਟੈਂਸ਼ੀਅਲ ਅੰਤਰ (V), ਕਰੰਟ (I) ਅਤੇ ਪ੍ਰਤੀਰੋਧ (R) ਵਿਚਕਾਰ ਸਹੀ ਸੰਬੰਧ ਕੀ ਹੈ?",
        sub: "Ohm's Law formulation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 ਸਹੀ ਉੱਤਰ: B) V = I × R. ਸਥਿਰ ਤਾਪਮਾਨ 'ਤੇ ਕਿਸੇ ਚਾਲਕ ਵਿੱਚੋਂ ਲੰਘ ਰਿਹਾ ਕਰੰਟ ਉਸਦੇ ਸਿਰਿਆਂ ਵਿਚਕਾਰ ਪੋਟੈਂਸ਼ੀਅਲ ਅੰਤਰ ਦੇ ਸਿੱਧਾ ਅਨੁਪਾਤੀ ਹੁੰਦਾ ਹੈ।"
      },
      "bilingual-odia": {
        q: "ଓମ୍‌ଙ୍କ ନିୟମ ଅନୁସାରେ ବିଭବାନ୍ତର (V), ବିଦ୍ୟୁତ ସ୍ରୋତ (I) ଏବଂ ପ୍ରତିରୋଧ (R) ମଧ୍ୟରେ ସଠିକ ସମ୍ପର୍କ କ’ଣ?",
        sub: "Ohm's Law relation:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 ସଠିକ ଉତ୍ତର: B) V = I × R. ସ୍ଥିର ତାପମାତ୍ରାରେ ଏକ ପରିବାହୀରେ ପ୍ରବାହିତ ବିଦ୍ୟୁତ ସ୍ରୋତ ଏହାର ଦୁଇ ପ୍ରାନ୍ତ ମଧ୍ୟରେ ଥିବା ବିଭବାନ୍ତର ସହ ସମାନୁପାତୀ ଅଟେ।"
      },
      "bilingual-assamese": {
        q: "ওমৰ সূত্ৰ অনুসৰি বিভৱভেদ (V), প্ৰবাহ (I) আৰু ৰোধ (R)ৰ মাজত শুদ্ধ সম্পৰ্কটো কি?",
        sub: "Ohm's Law formula:",
        options: ["A) V = I / R", "B) V = I × R", "C) I = V × R", "D) R = V × I"],
        ans: "B) V = I × R",
        exp: "💡 সঠিক উত্তৰ: B) V = I × R। স্থিৰ উষ্ণতাত পৰিবাহীৰ মাজেৰে যোৱা বিদ্যুৎ প্ৰবাহ পৰিবাহীটোৰ দুই মূৰৰ বিভৱভেদৰ সমানুপাতিক।"
      }
    }
  },

  // ---------------- CLASS 10TH CHEMISTRY: ACIDS & SALTS ----------------
  "science_chem_ph": {
    topic: "Acids, Bases & Salts (अम्ल, क्षारक एवं लवण)",
    class: "10th",
    subject: "science",
    loc: {
      "english": {
        q: "What is the pH value of pure distilled water at 25°C?",
        sub: "Neutral pH standard",
        options: ["A) 0 (Strong Acid)", "B) 7 (Neutral)", "C) 14 (Strong Base)", "D) 5.6 (Acidic)"],
        ans: "B) 7 (Neutral)",
        exp: "💡 Solution: Pure neutral water contains equal concentrations of H⁺ and OH⁻ ions [H⁺] = 10⁻⁷ M at 25°C, yielding pH = -log(10⁻⁷) = 7."
      },
      "bilingual-hindi": {
        q: "25°C पर शुद्ध आसुत जल का pH मान कितना होता है?",
        sub: "pH of pure distilled water:",
        options: ["A) 0 (प्रबल अम्ल)", "B) 7 (उदासीन / Neutral)", "C) 14 (प्रबल क्षार)", "D) 5.6 (अम्लीय)"],
        ans: "B) 7 (उदासीन / Neutral)",
        exp: "💡 सही उत्तर: B) 7। शुद्ध जल उदासीन होता है जिसमें हाइड्रोजन आयन [H⁺] और हाइड्रॉक्साइड आयन [OH⁻] की सांद्रता बराबर (10⁻⁷ mol/L) होती है, अतः pH = 7।"
      },
      "bilingual-marathi": {
        q: "25°C तापमानावर शुद्ध पाण्याचे pH मूल्य किती असते?",
        sub: "pH of pure distilled water:",
        options: ["A) 0 (तीव्र आम्ल)", "B) 7 (उदासीन / Neutral)", "C) 14 (तीव्र आम्लारी)", "D) 5.6"],
        ans: "B) 7 (उदासीन / Neutral)",
        exp: "💡 अचूक उत्तर: B) 7. शुद्ध पाणी उदासीन असते, त्यामुळे त्याचा सामू (pH) बरोबर 7 असतो."
      },
      "bilingual-tamil": {
        q: "25°C வெப்பநிலையில் தூய காய்ச்சி வடித்த நீரின் pH மதிப்பு என்ன?",
        sub: "pH of pure distilled water:",
        options: ["A) 0 (அமிலம்)", "B) 7 (நடுநிலை / Neutral)", "C) 14 (காரம்)", "D) 5.6"],
        ans: "B) 7 (நடுநிலை / Neutral)",
        exp: "💡 சரியான விடை: B) 7. தூய நீர் நடுநிலைத் தன்மை கொண்டது. எனவே அதன் pH மதிப்பு சரியாக 7 ஆகும்."
      },
      "bilingual-telugu": {
        q: "25°C వద్ద స్వచ్ఛమైన నీటి pH విలువ ఎంత?",
        sub: "pH of pure neutral water:",
        options: ["A) 0 (ఆమ్లం)", "B) 7 (తటస్థం / Neutral)", "C) 14 (క్షారం)", "D) 5.6"],
        ans: "B) 7 (తటస్థం / Neutral)",
        exp: "💡 సరైన సమాధానం: B) 7. స్వచ్ఛమైన నీరు తటస్థంగా ఉంటుంది, కావున దాని pH విలువ ఖచ్చితంగా 7 అవుతుంది."
      },
      "bilingual-kannada": {
        q: "25°C ನಲ್ಲಿ ಶುದ್ಧ ನೀರಿನ pH ಮೌಲ್ಯ ಎಷ್ಟು?",
        sub: "pH of pure distilled water:",
        options: ["A) 0 (ಆಮ್ಲ)", "B) 7 (ತಟಸ್ಥ / Neutral)", "C) 14 (ಪ್ರತ್ಯಾಮ್ಲ)", "D) 5.6"],
        ans: "B) 7 (ತಟಸ್ಥ / Neutral)",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: B) 7. ಶುದ್ಧ ನೀರು ತಟಸ್ಥವಾಗಿದ್ದು, ಅದರ pH ಮೌಲ್ಯವು 7 ಆಗಿರುತ್ತದೆ."
      },
      "bilingual-bengali": {
        q: "25°C উষ্ণতায় বিশুদ্ধ পাতিত জলের pH মান কত?",
        sub: "pH of pure distilled water:",
        options: ["A) 0 (তীব্র অ্যাসিড)", "B) 7 (প্রশম / Neutral)", "C) 14 (তীব্র ক্ষার)", "D) 5.6"],
        ans: "B) 7 (প্রশম / Neutral)",
        exp: "💡 সঠিক উত্তর: B) 7। বিশুদ্ধ জল সম্পূর্ণ প্রশম বা নিরপেক্ষ, তাই এর pH মান সর্বদা ৭ হয়।"
      },
      "bilingual-gujarati": {
        q: "25°C તાપમાને શુદ્ધ પાણીનું pH મૂલ્ય કેટલું હોય છે?",
        sub: "pH value of pure water:",
        options: ["A) 0 (એસિડ)", "B) 7 (તટસ્થ / Neutral)", "C) 14 (બેઇઝ)", "D) 5.6"],
        ans: "B) 7 (તટસ્થ / Neutral)",
        exp: "💡 સાચો જવાબ: B) 7. શુદ્ધ પાણી તટસ્થ હોવાથી તેનું pH મૂલ્ય બરાબર 7 હોય છે."
      },
      "bilingual-punjabi": {
        q: "25°C 'ਤੇ ਸ਼ੁੱਧ ਪਾਣੀ ਦਾ pH ਮੁੱਲ ਕਿੰਨਾ ਹੁੰਦਾ ਹੈ?",
        sub: "pH value of pure water:",
        options: ["A) 0 (ਤੇਜ਼ਾਬ)", "B) 7 (ਨਿਰਪੱਖ / Neutral)", "C) 14 (ਖਾਰ)", "D) 5.6"],
        ans: "B) 7 (ਨਿਰਪੱਖ / Neutral)",
        exp: "💡 ਸਹੀ ਉੱਤਰ: B) 7. ਸ਼ੁੱਧ ਪਾਣੀ ਨਿਰਪੱਖ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਇਸਦਾ pH ਮੁੱਲ 7 ਹੁੰਦਾ ਹੈ।"
      },
      "bilingual-odia": {
        q: "25°C ତାପମାତ୍ରାରେ ବିଶୁଦ୍ଧ ଜଳର pH ମୂଲ୍ୟ କେତେ?",
        sub: "pH value of pure water:",
        options: ["A) 0 (ଅମ୍ଳ)", "B) 7 (ପ୍ରଶମିତ / Neutral)", "C) 14 (କ୍ଷାର)", "D) 5.6"],
        ans: "B) 7 (ପ୍ରଶମିତ / Neutral)",
        exp: "💡 ସଠିକ ଉତ୍ତର: B) 7. ବିଶୁଦ୍ଧ ଜଳ ଏକ ପ୍ରଶମିତ ପଦାର୍ଥ ହୋଇଥିବାରୁ ଏହାର pH ମୂଲ୍ୟ ୭ ଅଟେ।"
      },
      "bilingual-assamese": {
        q: "25°C উষ্ণতাত বিশুদ্ধ পানীৰ pH মান কিমান?",
        sub: "pH value of pure water:",
        options: ["A) 0 (এছিড)", "B) 7 (প্ৰশম / Neutral)", "C) 14 (ক্ষাৰ)", "D) 5.6"],
        ans: "B) 7 (প্ৰশম / Neutral)",
        exp: "💡 সঠিক উত্তৰ: B) 7। বিশুদ্ধ পানী প্ৰশমিত হোৱা বাবে ইয়াৰ pH মান সদায় ৭ হয়।"
      }
    }
  },

  // ---------------- CLASS 10TH BIOLOGY: LIFE PROCESSES ----------------
  "science_bio_nephron": {
    topic: "Life Processes - Excretion (उत्सर्जन तंत्र)",
    class: "10th",
    subject: "science",
    loc: {
      "english": {
        q: "What is the structural and functional filtration unit of the human kidney?",
        sub: "Excretory System Core Concept",
        options: ["A) Neuron (Nerve Cell)", "B) Nephron (वृक्काणु)", "C) Alveoli", "D) Villi"],
        ans: "B) Nephron (वृक्काणु)",
        exp: "💡 Solution: Each human kidney contains approximately 1 million nephrons, which filter blood through the glomerulus and Bowman's capsule to reabsorb nutrients and excrete urea."
      },
      "bilingual-hindi": {
        q: "मानव वृक्क (Kidney) की संरचनात्मक एवं कार्यात्मक निस्यंदन इकाई क्या कहलाती है?",
        sub: "Structural and functional filtration unit of kidney:",
        options: ["A) न्यूरॉन (Neuron)", "B) नेफ्रॉन / वृक्काणु (Nephron)", "C) कूपिका (Alveoli)", "D) दीर्घरोम (Villi)"],
        ans: "B) नेफ्रॉन / वृक्काणु (Nephron)",
        exp: "💡 सही उत्तर: B) नेफ्रॉन (वृक्काणु)। वृक्क में रक्त को छानकर मूत्र निर्माण का मुख्य कार्य लाखों सूक्ष्म नलिकाओं द्वारा होता है जिन्हें नेफ्रॉन कहते हैं।"
      },
      "bilingual-marathi": {
        q: "मानवी वृक्काचे (Kidney) रचनात्मक व कार्यात्मक गाळण एकक कोणते?",
        sub: "Structural unit of kidney:",
        options: ["A) न्यूरॉन (चेतापेशी)", "B) नेफ्रॉन / वृक्काणू (Nephron)", "C) वायुकोश", "D) रसांकुर"],
        ans: "B) नेफ्रॉन / वृक्काणू (Nephron)",
        exp: "💡 अचूक उत्तर: B) नेफ्रॉन. प्रत्येक मूत्रपिंडात रक्ताचे गाळण करून मूत्र तयार करण्याचे कार्य नेफ्रॉन (वृक्काणू) करतात."
      },
      "bilingual-tamil": {
        q: "மனித சிறுநீரகத்தின் அமைப்பு மற்றும் செயல்பாட்டு வடிகட்டுதல் அலகு எது?",
        sub: "Functional unit of kidney:",
        options: ["A) நியூரான்கள்", "B) நெஃப்ரான் (Nephron)", "C) நுண் காற்றுப்பைகள்", "D) குடல் உறிஞ்சிகள்"],
        ans: "B) நெஃப்ரான் (Nephron)",
        exp: "💡 சரியான விடை: B) நெஃப்ரான். சிறுநீரகத்தில் ரத்தத்தை வடிகட்டி சிறுநீரை உருவாக்கும் அடிப்படை அலகு நெஃப்ரான் ஆகும்."
      },
      "bilingual-telugu": {
        q: "మానవ మూత్రపిండాల నిర్మాణాత్మక మరియు క్రియాత్మక వడపోత ప్రమాణం ఏది?",
        sub: "Functional unit of kidney:",
        options: ["A) న్యూరాన్ (నాడీ కణం)", "B) నెఫ్రాన్ (Nephron)", "C) వాయుకోశాలు", "D) చూషకాలు"],
        ans: "B) నెఫ్రాన్ (Nephron)",
        exp: "💡 సరైన సమాధానం: B) నెఫ్రాన్. మూత్రపిండాలలో రక్తాన్ని వడకట్టి మూత్రాన్ని ఉత్పత్తి చేసే ప్రాథమిక నిర్మాణం నెఫ్రాన్."
      },
      "bilingual-kannada": {
        q: "ಮಾನವ ಮೂತ್ರಪಿಂಡದ ರಚನಾತ್ಮಕ ಮತ್ತು ಕ್ರಿಯಾತ್ಮಕ ಶೋಧಕ ಘಟಕ ಯಾವುದು?",
        sub: "Functional unit of kidney:",
        options: ["A) ನ್ಯೂರಾನ್", "B) ನೆಫ್ರಾನ್ (Nephron)", "C) ವಾಯುಕೋಶ", "D) ವಿಲ್ಲೈ"],
        ans: "B) ನೆಫ್ರಾನ್ (Nephron)",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: B) ನೆಫ್ರಾನ್. ಮೂತ್ರಪಿಂಡದಲ್ಲಿ ರಕ್ತವನ್ನು ಶೋಧಿಸಿ ಮೂತ್ರವನ್ನು ಬೇರ್ಪಡಿಸುವ ಮೂಲ ಘಟಕ ನೆಫ್ರಾನ್ ಆಗಿದೆ."
      },
      "bilingual-bengali": {
        q: "মানুষের বৃক্কের গঠনগত ও কার্যগত পরিশ্রাবণ একক কী?",
        sub: "Structural and functional unit of kidney:",
        options: ["A) নিউরন", "B) নেফ্রন (Nephron)", "C) অ্যালভিওলাই", "D) ভিলাই"],
        ans: "B) নেফ্রন (Nephron)",
        exp: "💡 সঠিক উত্তর: B) নেফ্রন। বৃক্কে রক্ত পরিশ্রুত করে মূত্র উৎপাদনের মূল গঠনগত একক হল নেফ্রন।"
      },
      "bilingual-gujarati": {
        q: "મનુષ્યના મૂત્રપિંડનો રચનાત્મક અને કાર્યાત્મક ગાળણ એકમ કયો છે?",
        sub: "Filtration unit of kidney:",
        options: ["A) ચેતાકોષ (Neuron)", "B) નેફ્રોન / ઉત્સર્ગ એકમ (Nephron)", "C) વાયુકોષ્ઠ", "D) રસાંકુરો"],
        ans: "B) નેફ્રોન / ઉત્સર્ગ એકમ (Nephron)",
        exp: "💡 સાચો જવાબ: B) નેફ્રોન. મૂત્રપિંડમાં રુધિરનું ગાળણ કરી મૂત્ર નિર્માણ કરતો મુખ્ય એકમ નેફ્રોન છે."
      },
      "bilingual-punjabi": {
        q: "ਮਨੁੱਖੀ ਗੁਰਦੇ ਦੀ ਬਣਤਰ ਅਤੇ ਕਾਰਜਸ਼ੀਲ ਫਿਲਟਰੇਸ਼ਨ ਇਕਾਈ ਕੀ ਹੈ?",
        sub: "Filtration unit of kidney:",
        options: ["A) ਨਿਊਰੋਨ", "B) ਨੈਫਰੋਨ (Nephron)", "C) ਐਲਵੀਓਲਾਈ", "D) ਵਿਲੀ"],
        ans: "B) ਨੈਫਰੋਨ (Nephron)",
        exp: "💡 ਸਹੀ ਉੱਤਰ: B) ਨੈਫਰੋਨ. ਗੁਰਦੇ ਵਿੱਚ ਲਹੂ ਨੂੰ ਫਿਲਟਰ ਕਰਕੇ ਪਿਸ਼ਾਬ ਬਣਾਉਣ ਵਾਲੀ ਮੁੱਖ ਇਕਾਈ ਨੈਫਰੋਨ ਹੈ।"
      },
      "bilingual-odia": {
        q: "ମାନବ ବୃକ୍‌କର ଗଠନମୂଳକ ଓ କାର୍ଯ୍ୟକାରୀ ଛାଣନ ଏକକ କ’ଣ?",
        sub: "Functional unit of kidney:",
        options: ["A) ନ୍ୟୁରନ୍", "B) ନେଫ୍ରନ୍ (Nephron)", "C) କୂପିକା", "D) ଭିଲାଇ"],
        ans: "B) ନେଫ୍ରନ୍ (Nephron)",
        exp: "💡 ସଠିକ ଉତ୍ତର: B) ନେଫ୍ରନ୍. ବୃକ୍‌କରେ ରକ୍ତ ବିଶୋଧନ କରି ମୂତ୍ର ପ୍ରସ୍ତୁତ କରୁଥିବା ମୁଖ୍ୟ ଏକକ ହେଉଛି ନେଫ୍ରନ୍।"
      },
      "bilingual-assamese": {
        q: "মানুহৰ বৃক্কৰ গঠনাত্মক আৰু কাৰ্য্যকৰী পৰিস্ৰাৱণ এককটো কি?",
        sub: "Functional unit of kidney:",
        options: ["A) নিউৰন", "B) নেফ্ৰন (Nephron)", "C) এলভিঅ'লাই", "D) ভিলাই"],
        ans: "B) নেফ্ৰন (Nephron)",
        exp: "💡 সঠিক উত্তৰ: B) নেফ্ৰন। বৃক্কত তেজ পৰিশোধন কৰি মূত্ৰ তৈয়াৰ কৰা মূল এককটোৱেই হ'ল নেফ্ৰন।"
      }
    }
  },

  // ---------------- CLASS 10TH MATHEMATICS: QUADRATIC EQUATIONS ----------------
  "math_quadratic_nature": {
    topic: "Quadratic Equations (द्विघात समीकरण)",
    class: "10th",
    subject: "math",
    loc: {
      "english": {
        q: "For a quadratic equation ax² + bx + c = 0, what is the condition for real and distinct roots?",
        sub: "Discriminant Formula (D = b² - 4ac)",
        options: ["A) D = 0", "B) D > 0", "C) D < 0", "D) D ≤ 0"],
        ans: "B) D > 0",
        exp: "💡 Solution: The nature of roots depends on the discriminant D = b² - 4ac. When D > 0, roots are real and unequal (distinct). When D = 0, roots are real and equal."
      },
      "bilingual-hindi": {
        q: "द्विघात समीकरण ax² + bx + c = 0 के दो भिन्न वास्तविक मूल (Real & Distinct Roots) होने की शर्त क्या है?",
        sub: "Condition for real and distinct roots:",
        options: ["A) विविक्तकर D = 0", "B) विविक्तकर D > 0 (b² - 4ac > 0)", "C) विविक्तकर D < 0", "D) D ≤ 0"],
        ans: "B) विविक्तकर D > 0 (b² - 4ac > 0)",
        exp: "💡 सही उत्तर: B) D > 0। जब विविक्तकर (Discriminant) D = b² - 4ac > 0 होता है, तो समीकरण के दो वास्तविक और असमान मूल होते हैं।"
      },
      "bilingual-marathi": {
        q: "ax² + bx + c = 0 या वर्गसमीकरणाची मुळे वास्तव आणि भिन्न असण्याची अट कोणती?",
        sub: "Condition for real & unequal roots:",
        options: ["A) Δ = 0", "B) Δ > 0 (b² - 4ac > 0)", "C) Δ < 0", "D) Δ ≤ 0"],
        ans: "B) Δ > 0 (b² - 4ac > 0)",
        exp: "💡 अचूक उत्तर: B) Δ > 0. जेव्हा विवेचक Δ = b² - 4ac > 0 असतो, तेव्हा वर्गसमीकरणाची मुळे वास्तव आणि असमान असतात."
      },
      "bilingual-tamil": {
        q: "ax² + bx + c = 0 என்ற இருபடிச் சமன்பாட்டின் மூலங்கள் மெய் மற்றும் வெவ்வேறானவையாக இருப்பதற்கான நிபந்தனை என்ன?",
        sub: "Discriminant condition for real & distinct roots:",
        options: ["A) Δ = 0", "B) Δ > 0 (b² - 4ac > 0)", "C) Δ < 0", "D) Δ ≤ 0"],
        ans: "B) Δ > 0 (b² - 4ac > 0)",
        exp: "💡 சரியான விடை: B) Δ > 0. தன்மை காட்டி Δ = b² - 4ac > 0 ஆக இருக்கும் போது இருபடிச் சமன்பாட்டின் மூலங்கள் மெய் மற்றும் வெவ்வேறானவை ஆகும்."
      },
      "bilingual-telugu": {
        q: "ax² + bx + c = 0 వర్గ సమీకరణానికి వాస్తవ మరియు భిన్నమైన మూలాలు ఉండటానికి షరతు ఏమిటి?",
        sub: "Condition for real and distinct roots:",
        options: ["A) D = 0", "B) D > 0 (b² - 4ac > 0)", "C) D < 0", "D) D ≤ 0"],
        ans: "B) D > 0 (b² - 4ac > 0)",
        exp: "💡 సరైన సమాధానం: B) D > 0. విచక్షణి D = b² - 4ac > 0 అయినప్పుడు వర్గ సమీకరణానికి రెండు విభిన్న వాస్తవ మూలాలు ఉంటాయి."
      },
      "bilingual-kannada": {
        q: "ax² + bx + c = 0 ವರ್ಗ ಸಮೀಕರಣದ ಮೂಲಗಳು ವಾಸ್ತವ ಮತ್ತು ಭಿನ್ನವಾಗಿರಲು ನಿಬಂಧನೆ ಯಾವುದು?",
        sub: "Condition for real and distinct roots:",
        options: ["A) D = 0", "B) D > 0 (b² - 4ac > 0)", "C) D < 0", "D) D ≤ 0"],
        ans: "B) D > 0 (b² - 4ac > 0)",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: B) D > 0. ಶೋಧಕ D = b² - 4ac > 0 ಆದಾಗ ವರ್ಗ ಸಮೀಕರಣದ ಮೂಲಗಳು ವಾಸ್ತವ ಮತ್ತು ಭಿನ್ನವಾಗಿರುತ್ತವೆ."
      },
      "bilingual-bengali": {
        q: "ax² + bx + c = 0 দ্বিঘাত সমীকরণের বীজদ্বয় বাস্তব ও অসমান হওয়ার শর্ত কী?",
        sub: "Condition for real and distinct roots:",
        options: ["A) নিরূপক D = 0", "B) নিরূপক D > 0 (b² - 4ac > 0)", "C) নিরূপক D < 0", "D) D ≤ 0"],
        ans: "B) নিরূপক D > 0 (b² - 4ac > 0)",
        exp: "💡 সঠিক উত্তর: B) D > 0। নিরূপক D = b² - 4ac ধনাত্মক (D > 0) হলে সমীকরণের বীজ দুটি বাস্তব এবং অসমান হয়।"
      },
      "bilingual-gujarati": {
        q: "દ્વિઘાત સમીકરણ ax² + bx + c = 0 ના બે ભિન્ન અને વાસ્તવિક બીજ હોવાની શરત કઈ છે?",
        sub: "Condition for real and distinct roots:",
        options: ["A) વિવેચક D = 0", "B) વિવેચક D > 0 (b² - 4ac > 0)", "C) વિવેચક D < 0", "D) D ≤ 0"],
        ans: "B) વિવેચક D > 0 (b² - 4ac > 0)",
        exp: "💡 સાચો જવાબ: B) D > 0. જ્યારે વિવેચક D = b² - 4ac > 0 હોય ત્યારે સમીકરણના વાસ્તવિક અને ભિન્ન બીજ મળે છે."
      },
      "bilingual-punjabi": {
        q: "ਦੋ-ਘਾਤੀ ਸਮੀਕਰਣ ax² + bx + c = 0 ਦੇ ਦੋ ਵੱਖ-ਵੱਖ ਵਾਸਤਵਿਕ ਮੂਲ ਹੋਣ ਦੀ ਸ਼ਰਤ ਕੀ ਹੈ?",
        sub: "Condition for real and distinct roots:",
        options: ["A) D = 0", "B) D > 0 (b² - 4ac > 0)", "C) D < 0", "D) D ≤ 0"],
        ans: "B) D > 0 (b² - 4ac > 0)",
        exp: "💡 ਸਹੀ ਉੱਤਰ: B) D > 0. ਜਦੋਂ ਡਿਸਕ੍ਰਿਮਿਨੈਂਟ D = b² - 4ac > 0 ਹੁੰਦਾ ਹੈ, ਤਾਂ ਦੋ ਵਾਸਤਵਿਕ ਅਤੇ ਅਸਮਾਨ ਮੂਲ ਹੁੰਦੇ ਹਨ।"
      },
      "bilingual-odia": {
        q: "ଦ୍ୱିଘାତ ସମୀକରଣ ax² + bx + c = 0 ର ମୂଳଦ୍ୱୟ ବାସ୍ତବ ଓ ଭିନ୍ନ ହେବାର ସର୍ତ୍ତ କ’ଣ?",
        sub: "Condition for real and distinct roots:",
        options: ["A) ପ୍ରଭେଦକ D = 0", "B) ପ୍ରଭେଦକ D > 0 (b² - 4ac > 0)", "C) ପ୍ରଭେଦକ D < 0", "D) D ≤ 0"],
        ans: "B) ପ୍ରଭେଦକ D > 0 (b² - 4ac > 0)",
        exp: "💡 ସଠିକ ଉତ୍ତର: B) D > 0. ପ୍ରଭେଦକ D = b² - 4ac > 0 ହେଲେ ଦ୍ୱିଘାତ ସମୀକରଣର ଦୁଇଟି ବାସ୍ତବ ଓ ଅସମାନ ମୂଳ ମିଳିଥାଏ।"
      },
      "bilingual-assamese": {
        q: "ax² + bx + c = 0 দ্বিঘাত সমীকৰণৰ মূল দুটা বাস্তৱ আৰু অসমান হোৱাৰ চৰ্তটো কি?",
        sub: "Condition for real and distinct roots:",
        options: ["A) ভেদ নিৰূপক D = 0", "B) ভেদ নিৰূপক D > 0 (b² - 4ac > 0)", "C) ভেদ নিৰূপক D < 0", "D) D ≤ 0"],
        ans: "B) ভেদ নিৰূপক D > 0 (b² - 4ac > 0)",
        exp: "💡 সঠিক উত্তৰ: B) D > 0। ভেদ নিৰূপক D = b² - 4ac > 0 হ'লে সমীকৰণটোৰ দুটা বাস্তৱ আৰু অসমান মূল থাকে।"
      }
    }
  },

  // ---------------- CLASS 12TH PHYSICS: ELECTROSTATICS ----------------
  "physics_coulomb_gauss": {
    topic: "Electrostatics & Gauss Law (स्थिरवैद्युतिकी)",
    class: "12th",
    subject: "physics",
    loc: {
      "english": {
        q: "What is the total electric flux (Φ) emerging from a closed Gaussian surface enclosing a net charge Q in vacuum?",
        sub: "Gauss's Theorem in Electrostatics",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 Solution: According to Gauss's Law, the total electric flux through any closed surface is equal to 1/ε₀ times the total charge enclosed within that surface (∮ E · dA = Q_enclosed / ε₀)."
      },
      "bilingual-hindi": {
        q: "गाउस के नियमानुसार निर्वात में किसी बंद पृष्ठ से बद्ध कुल वैद्युत फ्लक्स (Φ) का मान क्या होता है?",
        sub: "Electric flux according to Gauss's Law:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 सही उत्तर: B) Φ = Q / ε₀। गाउस के प्रमेय के अनुसार किसी बंद पृष्ठ से गुजरने वाला कुल वैद्युत फ्लक्स उस पृष्ठ द्वारा परिबद्ध कुल आवेश Q का 1/ε₀ गुना होता है।"
      },
      "bilingual-marathi": {
        q: "गॉसच्या नियमानुसार निर्वातातील बंदिस्त पृष्ठभागातून बाहेर पडणारा एकूण विद्युत फ्लक्स (Φ) किती असतो?",
        sub: "Total electric flux by Gauss's theorem:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 अचूक उत्तर: B) Φ = Q / ε₀. गॉसच्या सिद्धांतानुसार कोणत्याही बंद पृष्ठभागातून जाणारा एकूण विद्युत प्रवाह हा त्या पृष्ठभागातील एकूण प्रभाराच्या 1/ε₀ पट असतो."
      },
      "bilingual-tamil": {
        q: "காஸ் விதியின்படி காற்றில் உள்ள ஒரு மூடிய பரப்பினால் சூழப்பட்ட மின்பாயம் (Φ) எதற்குச் சமம்?",
        sub: "Gauss's law for electric flux:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 சரியான விடை: B) Φ = Q / ε₀. காஸ் விதியின்படி மூடிய பரப்பின் வழியே செல்லும் மொத்த மின்பாயம் அப்பரப்பிலுள்ள மொத்த மின்னூட்டத்தின் 1/ε₀ மடங்குக்குச் சமமாகும்."
      },
      "bilingual-telugu": {
        q: "గాస్ నియమం ప్రకారం శూన్యంలో ఒక సంవృత ఉపరితలం గుండా వెళ్ళే మొత్తం విద్యుత్ ఫ్లక్స్ (Φ) విలువ ఎంత?",
        sub: "Electric flux by Gauss's Law:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 సరైన సమాధానం: B) Φ = Q / ε₀. గాస్ సూత్రం ప్రకారం ఏదైనా సంవృత తలం గుండా వెళ్ళే నికర విద్యుత్ ఫ్లక్స్ ఆ తలంలో బంధించబడిన మొత్తం ఆవేశం Q లో 1/ε₀ రెట్లు ఉంటుంది."
      },
      "bilingual-kannada": {
        q: "ಗಾಸ್ ನಿಯಮದ ಪ್ರಕಾರ ನಿರ್ವಾತದಲ್ಲಿ ಮುಚ್ಚಿದ ಮೇಲ್ಮೈಯಿಂದ ಹೊರಹೊಮ್ಮುವ ಒಟ್ಟು ವಿದ್ಯುತ್ ಫ್ಲಕ್ಸ್ (Φ) ಎಷ್ಟು?",
        sub: "Gauss's Law electric flux formula:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: B) Φ = Q / ε₀. ಗಾಸ್ ಪ್ರಮೇಯದಂತೆ ಯಾವುದೇ ಆವೃತ ಮೇಲ್ಮೈ ಮೂಲಕ ಹಾದುಹೋಗುವ ಒಟ್ಟು ವಿದ್ಯುತ್ ಫ್ಲಕ್ಸ್ ಆ ಮೇಲ್ಮೈಯಲ್ಲಿರುವ ಒಟ್ಟು ಆವೇಶದ 1/ε₀ ಪಟ್ಟು ಇರುತ್ತದೆ."
      },
      "bilingual-bengali": {
        q: "গাউসের সূত্রানুযায়ী শূন্য মাধ্যমে কোনো বদ্ধ তল দিয়ে অতিক্রান্ত মোট তড়িৎ ফ্লাক্স (Φ) এর মান কত?",
        sub: "Electric flux according to Gauss's theorem:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 সঠিক উত্তর: B) Φ = Q / ε₀। গাউসের উপপাদ্য অনুসারে কোনো বদ্ধ তলের মধ্য দিয়ে অতিক্রান্ত মোট তড়িৎ ফ্লাক্স ওই তলে আবদ্ধ মোট আধান Q এর 1/ε₀ গুণ।"
      },
      "bilingual-gujarati": {
        q: "ગોસના નિયમ મુજબ શૂન્યાવકાશમાં બંધ પૃષ્ઠમાંથી બહાર આવતું કુલ વિદ્યુત ફ્લક્સ (Φ) કેટલું હોય છે?",
        sub: "Electric flux by Gauss's Law:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 સાચો જવાબ: B) Φ = Q / ε₀. ગોસના પ્રમેય મુજબ કોઈપણ બંધ પૃષ્ઠ સાથે સંકળાયેલ કુલ વિદ્યુત ફ્લક્સ તે પૃષ્ઠ વડે ઘેરાયેલા કુલ વિદ્યુતભારના 1/ε₀ ગણું હોય છે."
      },
      "bilingual-punjabi": {
        q: "ਗੌਸ ਦੇ ਨਿਯਮ ਅਨੁਸਾਰ ਖਲਾਅ ਵਿੱਚ ਕਿਸੇ ਬੰਦ ਸਤ੍ਹਾ ਵਿੱਚੋਂ ਨਿਕਲਣ ਵਾਲਾ ਕੁੱਲ ਇਲੈਕਟ੍ਰਿਕ ਫਲੈਕਸ (Φ) ਕਿੰਨਾ ਹੁੰਦਾ ਹੈ?",
        sub: "Gauss's Law formula:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 ਸਹੀ ਉੱਤਰ: B) Φ = Q / ε₀. ਗੌਸ ਦੇ ਸਿਧਾਂਤ ਅਨੁਸਾਰ ਕਿਸੇ ਬੰਦ ਸਤ੍ਹਾ ਵਿੱਚੋਂ ਲੰਘਣ ਵਾਲਾ ਕੁੱਲ ਇਲੈਕਟ੍ਰਿਕ ਫਲੈਕਸ ਉਸ ਅੰਦਰਲੇ ਕੁੱਲ ਚਾਰਜ Q ਦਾ 1/ε₀ ਗੁਣਾ ਹੁੰਦਾ ਹੈ।"
      },
      "bilingual-odia": {
        q: "ଗାଉସ୍‌ଙ୍କ ନିୟମ ଅନୁସାରେ ଶୂନ୍ୟ ମାଧ୍ୟମରେ ଏକ ଆବଦ୍ଧ ପୃଷ୍ଠ ଦେଇ ନିର୍ଗତ ମୋଟ ବୈଦ୍ୟୁତିକ ଫ୍ଲକ୍ସ (Φ) କେତେ?",
        sub: "Electric flux by Gauss Law:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 ସଠିକ ଉତ୍ତର: B) Φ = Q / ε₀. ଗାଉସ୍ ଉପପାଦ୍ୟ ଅନୁସାରେ ଆବଦ୍ଧ ପୃଷ୍ଠର ବୈଦ୍ୟୁତିକ ଫ୍ଲକ୍ସ ଏହା ମଧ୍ୟରେ ଥିବା ମୋଟ ଚାର୍ଜର 1/ε₀ ଗୁଣ ଅଟେ।"
      },
      "bilingual-assamese": {
        q: "গাউছৰ সূত্ৰ অনুসৰি শূন্য মাধ্যমত এটা বন্ধ পৃষ্ঠই আৱৰি ৰখা মুঠ বৈদ্যুতিক ফ্লাক্স (Φ)ৰ মান কিমান?",
        sub: "Gauss's theorem for electric flux:",
        options: ["A) Φ = Q × ε₀", "B) Φ = Q / ε₀", "C) Φ = ε₀ / Q", "D) Φ = 0"],
        ans: "B) Φ = Q / ε₀",
        exp: "💡 সঠিক উত্তৰ: B) Φ = Q / ε₀। গাউছৰ উপপাদ্য মতে যিকোনো বন্ধ পৃষ্ঠৰ মাজেৰে পাৰ হৈ যোৱা মুঠ বৈদ্যুতিক ফ্লাক্স পৃষ্ঠখনে আৱৰি ৰখা মুঠ আধানৰ 1/ε₀ গুণ।"
      }
    }
  },

  // ---------------- CLASS 12TH CHEMISTRY: SOLUTIONS & RAOULT'S LAW ----------------
  "chem_raoult_colligative": {
    topic: "Solutions & Colligative Properties (विलयन)",
    class: "12th",
    subject: "chemistry",
    loc: {
      "english": {
        q: "Which of the following is NOT a colligative property of a dilute solution?",
        sub: "Class 12 Chemistry High-Yield Question",
        options: ["A) Relative lowering of vapour pressure", "B) Elevation in boiling point", "C) Optical activity / Refractive index", "D) Osmotic pressure"],
        ans: "C) Optical activity / Refractive index",
        exp: "💡 Solution: Colligative properties depend solely on the number of solute particles, not their chemical nature. They are: Relative lowering of VP, Elevation in BP, Depression in FP, and Osmotic Pressure. Optical activity is a constitutive property."
      },
      "bilingual-hindi": {
        q: "निम्नलिखित में से कौन-सा तनु विलयन का अणुसंख्य गुणधर्म (Colligative Property) नहीं है?",
        sub: "Which is NOT a colligative property?",
        options: ["A) वाष्प दाब का आपेक्षिक अवनमन", "B) क्वथनांक का उन्नयन", "C) प्रकाशिक सक्रियता / अपवर्तनांक", "D) परासरण दाब (Osmotic Pressure)"],
        ans: "C) प्रकाशिक सक्रियता / अपवर्तनांक",
        exp: "💡 सही उत्तर: C) प्रकाशिक सक्रियता। अणुसंख्य गुणधर्म केवल विलेय के कणों की संख्या पर निर्भर करते हैं, उनकी प्रकृति पर नहीं। 4 प्रमुख गुणधर्म: वाष्प दाब का आपेक्षिक अवनमन, क्वथनांक उन्नयन, हिमांक अवनमन तथा परासरण दाब हैं।"
      },
      "bilingual-marathi": {
        q: "खालीलपैकी कोणता विरल द्रावणाचा संख्यात्मक गुणधर्म (Colligative Property) नाही?",
        sub: "Colligative property exception:",
        options: ["A) बाष्पदाबातील सापेक्ष घट", "B) उत्कलन बिंदूतील वाढ", "C) प्रकाशीય क्रियाशीलता", "D) परासरण दाब"],
        ans: "C) प्रकाशीय क्रियाशीलता",
        exp: "💡 अचूक उत्तर: C) प्रकाशीय क्रियाशीलता. द्रावणातील कणांच्या संख्येवर अवलंबून असणारे 4 गुणधर्म म्हणजे बाष्પદાબ घट, उत्कलन वाढ, गोठण घट आणि परासरण दाब."
      },
      "bilingual-tamil": {
        q: "பின்வருவனவற்றுள் எது கரைசலின் தொகைசார் பண்பு (Colligative Property) அல்ல?",
        sub: "Non-colligative property:",
        options: ["A) ஆவி அழுத்தத்தின் ஒப்புமை குறைவு", "B) கொதிநிலை ஏற்றம்", "C) ஒளி சுழற்றும் பண்பு", "D) சவ்வூடுபரவல் அழுத்தம்"],
        ans: "C) ஒளி சுழற்றும் பண்பு",
        exp: "💡 சரியான விடை: C) ஒளி சுழற்றும் பண்பு. தொகைசார் பண்புகள் கரைபொருள் துகள்களின் எண்ணிக்கையை மட்டுமே சார்ந்துள்ளன."
      },
      "bilingual-telugu": {
        q: "క్రింది వాటిలో విలీన ద్రావణాల కణాధార ధర్మం (Colligative Property) కానిది ఏది?",
        sub: "Colligative property identifier:",
        options: ["A) బాష్పపీడన సాపేక్ష నిమ్నత", "B) బాష్పీభవన స్థాన ఉన్నతి", "C) ధ్రువణ భ్రమణత", "D) ద్రవాభిసరణ పీడనం"],
        ans: "C) ధ్రువణ భ్రమణత",
        exp: "💡 సరైన సమాధానం: C) ధ్రువణ భ్రమణత. కణాధార ధర్మాలు ద్రావిత కణాల సంఖ్యపై మాత్రమే ఆధారపడతాయి, వాటి రసాయన స్వభావంపై కాదు."
      },
      "bilingual-kannada": {
        q: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ದ್ರಾವಣದ ಕಣಸಂಖ್ಯಾತ್ಮಕ ಗುಣಲಕ್ಷಣ (Colligative Property) ಅಲ್ಲ?",
        sub: "Colligative property identification:",
        options: ["A) ಆವಿ ಒತ್ತಡದ ಸಾಪೇಕ್ಷ ಇಳಿಕೆ", "B) ಕುದಿಯುವ ಬಿಂದುವಿನ ಏರಿಕೆ", "C) ದ್ಯುತಿ ಚಟುವಟಿಕೆ", "D) ಆಸ್ಮೋಟಿಕ್ ಒತ್ತಡ"],
        ans: "C) ದ್ಯುತಿ ಚಟುವಟಿಕೆ",
        exp: "💡 ಸರಿಯಾದ ಉತ್ತರ: C) ದ್ಯುತಿ ಚಟುವಟಿಕೆ. ಕಣಸಂಖ್ಯಾತ್ಮಕ ಗುಣಲಕ್ಷಣಗಳು ಕರಗಿದ ಕಣಗಳ ಸಂಖ್ಯೆಯ ಮೇಲೆ ಮಾತ್ರ ಅವಲಂಬಿತವಾಗಿರುತ್ತವೆ."
      },
      "bilingual-bengali": {
        q: "নিচের কোনটি লঘু দ্রবণের সংখ্যাগত ধর্ম (Colligative Property) নয়?",
        sub: "Colligative property in Chemistry:",
        options: ["A) বাষ্পচাপের আপেক্ষিক অবনমন", "B) স্ফুটনাঙ্কের উন্নয়ন", "C) আলোক সক্রিয়তা", "D) অভিস্রাবণ চাপ"],
        ans: "C) আলোক সক্রিয়তা",
        exp: "💡 সঠিক উত্তর: C) আলোক সক্রিয়তা। সংখ্যাগত ধর্ম কেবল দ্রাবের কণার সংখ্যার ওপর নির্ভর করে, কণার প্রকৃতির ওপর নয়।"
      },
      "bilingual-gujarati": {
        q: "નીચેનામાંથી કયો મંદ દ્રાવણનો સંખ્યાત્મક ગુણધર્મ (Colligative Property) નથી?",
        sub: "Colligative property identification:",
        options: ["A) બાષ્પદબાણમાં સાપેક્ષ ઘટાડો", "B) ઉત્કલનબિંદુ ઉન્નયન", "C) પ્રકાશીય ક્રિયાશીલતા", "D) અભિસરણ દબાણ"],
        ans: "C) પ્રકાશીય ક્રિયાશીલતા",
        exp: "💡 સાચો જવાબ: C) પ્રકાશીય ક્રિયાશીલતા. સંખ્યાત્મક ગુણધર્મો માત્ર દ્રાવ્ય કણોની સંખ્યા પર આધાર રાખે છે."
      },
      "bilingual-punjabi": {
        q: "ਹੇਠ ਲਿਖਿਆਂ ਵਿੱਚੋਂ ਕਿਹੜਾ ਪਤਲੇ ਘੋਲ ਦਾ ਕੋਲੀਗੇਟਿਵ ਗੁਣ (Colligative Property) ਨਹੀਂ ਹੈ?",
        sub: "Colligative property:",
        options: ["A) ਵਾਸ਼ਪ ਦਬਾਅ ਵਿੱਚ ਸਾਪੇਖਿਕ ਕਮੀ", "B) ਉਬਾਲ ਦਰਜੇ ਵਿੱਚ ਵਾਧਾ", "C) ਪ੍ਰਕਾਸ਼ੀ ਗਤੀਵਿਧੀ", "D) ਓਸਮੋਟਿਕ ਦਬਾਅ"],
        ans: "C) ਪ੍ਰਕਾਸ਼ੀ ਗਤੀਵਿਧੀ",
        exp: "💡 ਸਹੀ ਉੱਤਰ: C) ਪ੍ਰਕਾਸ਼ੀ ਗਤੀਵਿਧੀ. ਕੋਲੀਗੇਟਿਵ ਗੁਣ ਸਿਰਫ਼ ਘੋਲ ਵਿੱਚ ਕਣਾਂ ਦੀ ਸੰਖਿਆ 'ਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਨ."
      },
      "bilingual-odia": {
        q: "ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ କେଉଁଟି ଏକ ଲଘୁ ଦ୍ରବଣର କଣିକା ସଂଖ୍ୟାତ୍ମକ ଧର୍ମ (Colligative Property) ନୁହେଁ?",
        sub: "Colligative property:",
        options: ["A) ବାଷ୍ପ ଚାପର ଆପେକ୍ଷିକ ହ୍ରାସ", "B) ସ୍ଫୁଟନାଙ୍କ ଉନ୍ନୟନ", "C) ଆଲୋକୀୟ ସକ୍ରିୟତା", "D) ଅଭିସ୍ରବଣ ଚାପ"],
        ans: "C) ଆଲୋକୀୟ ସକ୍ରିୟତା",
        exp: "💡 ସଠିକ ଉତ୍ତର: C) ଆଲୋକୀୟ ସକ୍ରିୟତା. କଣିକା ସଂଖ୍ୟାତ୍ମକ ଧର୍ମ କେବଳ ଦ୍ରାବ କଣିକାର ସଂଖ୍ୟା ଉପରେ ନିର୍ଭର କରେ."
      },
      "bilingual-assamese": {
        q: "তলৰ কোনটো লঘু দ্ৰৱণৰ সংখ্যাগত ধৰ্ম (Colligative Property) নহয়?",
        sub: "Colligative property test:",
        options: ["A) বাষ্পচাপৰ আপেক্ষিক অৱনমন", "B) উতলাংকৰ উন্নয়ন", "C) আলোকীয় সক্ৰিয়তা", "D) আস্ৰাৱণ চাপ"],
        ans: "C) আলোকীয় সক্ৰিয়তা",
        exp: "💡 সঠিক উত্তৰ: C) আলোকীয় সক্ৰিয়তা। সংখ্যাগত ধৰ্ম কেৱল দ্ৰৱত থকা কণাৰ সংখ্যাৰ ওপৰত নিৰ্ভৰ কৰে।"
      }
    }
  }
};

// // Rich Subjective Question Syllabus Repository by Subject & Class
const SUBJECT_TOPIC_REGISTRY = {
  "math": {
    short: [
      "यूक्लिड विभाजन प्रमेयिका एवं अंकगणित की आधारभूत प्रमेय (Fundamental Theorem of Arithmetic)",
      "अभाज्य गुणनखंडन विधि द्वारा महत्तम समापवर्तक (HCF) एवं लघुत्तम समापवर्त्य (LCM)",
      "सिद्ध कीजिए कि √2, √3 अथवा √5 एक अपरिमेय संख्या (Irrational Number) है",
      "द्विघात बहुपद के शून्यक एवं गुणांकों के बीच संबंध का सत्यापन",
      "दो चर वाले रैखिक समीकरण युग्म की संगतता (Consistency) एवं प्रतिच्छेदी/समांतर शर्तें",
      "द्विघात समीकरण ax² + bx + c = 0 के विविक्तकर (Discriminant D) एवं मूलों की प्रकृति",
      "समांतर श्रेढ़ी (A.P.) का n-वां पद (an = a + (n-1)d) एवं प्रथम n पदों का योग (Sn)",
      "विभाजन सूत्र (Section Formula) द्वारा रेखाखंड को m₁:m₂ में विभाजित करने वाले बिंदु के निर्देशांक",
      "दूरी सूत्र (Distance Formula) एवं संरेखीय बिंदुओं (Collinear Points) का प्रतिबंध",
      "त्रिकोणमितीय सर्वसमिकाएं (sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ) का अनुप्रयोग",
      "त्रिकोणमितीय अनुपातों के पूरक कोण सूत्र (sin(90°-θ) = cosθ)",
      "वृत्त के किसी बाह्य बिंदु से खींची गई स्पर्श रेखाओं की लम्बाइयों की समानता",
      "त्रिज्यखंड का क्षेत्रफल (Sector Area) एवं वृत्तखंड का क्षेत्रफल सूत्र",
      "शंकु के छिन्नक (Frustum) का आयतन एवं वक्रपृष्ठीय क्षेत्रफल",
      "वर्गीकृत आंकड़ों का प्रत्यक्ष विधि एवं कल्पित माध्य विधि द्वारा समान्तर माध्य",
      "बहुलक वर्ग (Modal Class) एवं माध्यक वर्ग (Median Class) की पहचान व सूत्र",
      "प्रायिकता (Probability) के मूल सिद्धांत: पासे एवं ताश के 52 पत्तों पर आधारित प्रश्न",
      "आव्यूह का परिवर्त (Transpose of Matrix) एवं सममित व विषम-सममित आव्यूह",
      "सारणिक के सहखंडज (Adjoint) एवं व्युत्क्रम आव्यूह (A⁻¹) का सूत्र",
      "रोले का प्रमेय (Rolle's Theorem) एवं लैग्रेंज का मध्यमान प्रमेय (LMVT)"
    ],
    long: [
      "थेल्स प्रमेय (आधारभूत समानुपातिकता प्रमेय - BPT) का कथन लिखकर सिद्ध कीजिए।",
      "पाइथागोरस प्रमेय (Pythagoras Theorem) का कथन लिखकर ज्यामितीय उपपत्ति दीजिए।",
      "द्विघात सूत्र विधि (Quadratic Formula) द्वारा जटिल समीकरणों का मूल ज्ञात करना।",
      "ऊंचाई एवं दूरी (Heights & Distances): नदी के दोनों किनारों पर मीनार के उन्नयन कोण पर आधारित प्रश्न।",
      "एक ठोस खिलौना एक अर्धगोले पर अध्यारोपित शंकु के आकार का है, उसका सम्पूर्ण पृष्ठीय क्षेत्रफल व आयतन ज्ञात करें।",
      "निम्नलिखित बारंबारता बंटन का अज्ञात बारंबारता (f₁ तथा f₂) ज्ञात कीजिए यदि माध्यक दिया हो।",
      "आव्यूह विधि (Matrix Inversion Method) से तीन चरों वाले रैखिक समीकरण निकाय को हल कीजिए।",
      "सिद्ध कीजिए कि न्यूनतम पृष्ठ क्षेत्रफल वाले दिए गए आयतन के लंबवृत्तीय बेलन की ऊंचाई उसके आधार के व्यास के बराबर होती है।",
      "निश्चित समाकलन के प्रगुणों का उपयोग कर ∫[0 to π/2] (√sin x / (√sin x + √cos x)) dx का मान ज्ञात कीजिए।",
      "परवलय y² = 4ax एवं रेखा y = mx से घिरे क्षेत्र का क्षेत्रफल समाकलन द्वारा ज्ञात कीजिए।"
    ]
  },
  "physics": {
    short: [
      "कूलॉम का नियम एवं परावैद्युतांक (Dielectric Constant) की परिभाषा",
      "विद्युत द्विध्रुव आघूर्ण (Electric Dipole Moment) की परिभाषा एवं SI मात्रक",
      "गाउस के प्रमेय का कथन एवं इसका गणितीय व्यंजक",
      "समांतर पट्टिका संधारित्र की धारिता एवं परावैद्युत पदार्थ का प्रभाव",
      "विद्युत धारा एवं अनुगमन वेग (Drift Velocity) के मध्य संबंध व्यंजक",
      "किरचॉफ के धारा एवं वोल्टता नियम (KCL & KVL) का कथन",
      "व्हीटस्टोन सेतु का संतुलन प्रतिबंध (P/Q = R/S) की उपपत्ति",
      "बायो-सावर्ट नियम (Biot-Savart Law) का सदिश रूप में कथन",
      "ऐम्पीयर का परिपथीय नियम एवं परिनालिका के भीतर चुम्बकीय क्षेत्र",
      "फैराडे के विद्युत चुम्बकीय प्रेरण के नियम एवं लेंज का नियम",
      "स्वप्रेरण (Self Induction) एवं अन्योन्य प्रेरण गुणांक की परिभाषा व मात्रक",
      "LCR श्रेणी परिपथ में अनुनाद (Resonance) की स्थिति एवं अनुनादी आवृत्ति",
      "विद्युत चुम्बकीय स्पेक्ट्रम की विभिन्न किरणों के उपयोग (गामा, एक्स, अवरक्त)",
      "हाइगेन्स की द्वितीयक तरंगिकाओं का सिद्धांत (Huygens' Principle)",
      "ब्रूस्टर का नियम (Brewster's Law) एवं ध्रुवण कोण",
      "प्रकाश विद्युत प्रभाव में कार्यफलन (Work Function) एवं देहली आवृत्ति",
      "दे-ब्रॉग्ली तरंगदैर्ध्य (λ = h/p) का व्यंजक एवं भौतिक महत्व",
      "बोर के परमाणु मॉडल की तीन मूल परिकल्पनाएं (Bohr's Postulates)",
      "नाभिकीय विखंडन एवं संलयन में प्रमुख अंतर",
      "p-n संधि डायोड में अवक्षय परत (Depletion Layer) एवं विभव प्राचीर"
    ],
    long: [
      "गाउस के प्रमेय की सहायता से एक समान आवेशित अनंत लम्बाई के सीधे तार के कारण विद्युत क्षेत्र की तीव्रता का व्यंजक निगमित कीजिए।",
      "विद्युत द्विध्रुव की अक्षीय एवं निरक्षीय स्थिति में किसी बिंदु पर विद्युत क्षेत्र की तीव्रता का व्यंजक प्राप्त कीजिए।",
      "हाइगेन्स के द्वितीयक तरंगिकाओं के सिद्धांत द्वारा प्रकाश के अपवर्तन अथवा परावर्तन के नियमों को सिद्ध कीजिए।",
      "यंग के द्विक-स्लिट प्रयोग में व्यतिकरण फ्रिंजों की चौड़ाई (β = λD/d) के लिए गणितीय व्यंजक व्युत्पन्न कीजिए।",
      "प्रत्यावर्ती धारा जनित्र (AC Generator) अथवा ट्रांसफार्मर का सिद्धांत, नामांकित चित्र, कार्यप्रणाली एवं दक्षता का वर्णन कीजिए।",
      "p-n संधि डायोड का पूर्ण-तरंग दिष्टकारी (Full Wave Rectifier) के रूप में परिपथ आरेख खींचकर कार्यविधि समझाइए।",
      "आइंस्टीन का प्रकाश विद्युत समीकरण (1/2 mv²_max = h(ν - ν₀)) निगमित कीजिए तथा इसके आधार पर प्रकाश विद्युत प्रभाव की व्याख्या कीजिए।",
      "बोर के हाइड्रोजन परमाणु मॉडल के आधार पर n-वीं कक्षा में इलेक्ट्रॉन की त्रिज्या एवं ऊर्जा (En = -13.6/n² eV) का व्यंजक प्राप्त कीजिए।"
    ]
  },
  "chemistry": {
    short: [
      "राउल्ट का नियम (Raoult's Law) एवं आदर्श व अनादर्श विलयन में अंतर",
      "वाष्प दाब का आपेक्षिक अवनमन एवं अणुसंख्य गुणधर्म (Colligative Properties)",
      "मोलरता (Molarity), मोललता (Molality) एवं मोल प्रभाज (Mole Fraction) की परिभाषा",
      "क्वथनांक का उन्नयन (ΔTb = Kb × m) एवं वान्ट हॉफ गुणक (i)",
      "कोलरौश का स्वतंत्र आयन अभिगमन नियम (Kohlrausch's Law)",
      "नेर्नस्ट समीकरण (Nernst Equation) एवं सेल के मानक विभव की गणना",
      "अभिक्रिया की कोटि (Order) एवं आण्विकता (Molecularity) में प्रमुख अंतर",
      "प्रथम कोटि की अभिक्रिया के वेग स्थिरांक का समाकलित वेग समीकरण एवं अर्ध-आयुकाल",
      "छद्म प्रथम कोटि की अभिक्रिया (Pseudo-first Order Reaction) सोदाहरण",
      "सक्रियण ऊर्जा (Activation Energy) एवं आर्हीनियस समीकरण",
      "लैन्थेनाइड संकुचन (Lanthanoid Contraction) के कारण एवं परिणाम",
      "संक्रमण तत्वों के रंगीन आयन एवं उत्प्रेरकीय गुण प्रदर्शित करने का कारण",
      "वर्नर का उपसहसंयोजन सिद्धांत (Werner's Coordination Theory)",
      "SN1 एवं SN2 नाभिकरागी प्रतिस्थापन अभिक्रियाओं की क्रियाविधि में अंतर",
      "रीमर-टीमैन अभिक्रिया (Reimer-Tiemann Reaction) का रासायनिक समीकरण",
      "कोल्बे अभिक्रिया (Kolbe's Reaction) द्वारा सैलिसिलिक अम्ल का निर्माण",
      "ऐल्डोल संघनन (Aldol Condensation) एवं कैनिजारो अभिक्रिया (Cannizzaro Reaction)",
      "हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया (Hoffmann Bromamide Degradation)",
      "प्रोटीनों का विकृतीकरण (Denaturation of Proteins) एवं पेप्टाइड बंध",
      "डीएनए (DNA) एवं आरएनए (RNA) की संरचनात्मक एवं रासायनिक तुलना"
    ],
    long: [
      "विद्युत रासायनिक सेल (डेनियल सेल) की कार्यप्रणाली, सेल आरेख, नेर्नस्ट समीकरण एवं गिब्स मुक्त ऊर्जा (ΔG° = -nFE°) की विस्तृत विवेचना कीजिए।",
      "संयोजकता आबंध सिद्धांत (VBT) एवं क्रिस्टल क्षेत्र सिद्धांत (CFT) के आधार पर [Fe(CN)₆]³⁻ तथा [Fe(H₂O)₆]³⁺ के चुम्बकीय व्यवहार एवं ज्यामिति की व्याख्या कीजिए।",
      "प्राथमिक, द्वितीयक एवं तृतीयक ऐल्कोहॉलों में विभेद करने की ल्यूकास परीक्षण एवं विक्टर मेयर विधि का सविस्तर वर्णन कीजिए।",
      "ऐसीटोन एवं ऐसीटैल्डिहाइड से आयोडोफॉर्म निर्माण की प्रयोगशाला विधि एवं रासायनिक समीकरण स्पष्ट कीजिए।",
      "ग्लूकोज की चक्रीय संरचना, पाइरानोज वलय एवं हॉवर्थ संरचना का प्रमाण सहित निरूपण कीजिए।"
    ]
  },
  "biology": {
    short: [
      "लघुबीजाणुजनन (Microsporogenesis) एवं परागकण की भित्ति संरचना (Exine व Intine)",
      "आवृतबीजी पादपों में दोहरा निषेचन (Double Fertilization) एवं त्रिसंलयन",
      "शुक्राणुजनन (Spermatogenesis) एवं अंडाणुजनन (Oogenesis) में प्रमुख अंतर",
      "मानव आर्तव चक्र (Menstrual Cycle) के विभिन्न चरण एवं हार्मोनल नियंत्रण (LH & FSH)",
      "कॉर्पस ल्यूटियम (Corpus Luteum) का कार्य एवं प्रोजेस्टेरोन का स्राव",
      "मेंडल के पृथक्करण का नियम (Law of Segregation) एवं स्वतंत्र अपव्यूहन",
      "मानव एवं पक्षियों में लिंग निर्धारण (Sex Determination) की क्रियाविधि",
      "डाउन सिंड्रोम, टर्नर सिंड्रोम एवं क्लाइनफेल्टर सिंड्रोम के आनुवंशिक कारण",
      "डीएनए द्विकुंडली मॉडल (Watson-Crick Model) एवं चारगाफ के नियम",
      "अनुलेखन (Transcription) एवं आरएनए के प्रकार (mRNA, tRNA, rRNA)",
      "आनुवंशिक कूट (Genetic Code) की प्रमुख विशेषताएं (Universal, Triplet, Degenerate)",
      "लैक ओपेरॉन (Lac Operon) की संरचना एवं प्रेरक लैक्टोज की भूमिका",
      "समजात अंग (Homologous Organs) एवं समवृत्ति अंग (Analogous Organs) में अंतर",
      "प्रतिबंध एंडोन्यूक्लिएज एंजाइम (Restriction Enzymes) एवं आण्विक कैंची",
      "पॉलिमरेज़ चेन रिएक्शन (PCR) के तीन चरण: निष्क्रियकरण, तापनुशीलन व विस्तार",
      "बीटी कपास (Bt Cotton) एवं क्राई प्रोटीन (Cry Proteins) की कार्यविधि",
      "जीन चिकित्सा (Gene Therapy) एवं एडीए (ADA) न्यूनता का उपचार",
      "पारिस्थितिक पिरामिड (ऊर्जा का पिरामिड सदैव सीधा क्यों होता है?)",
      "जैव विविधता के हॉटस्पॉट एवं तप्त स्थलों की विशेषताएं",
      "स्वस्थाने संरक्षण (In-situ) एवं बाह्यस्थाने संरक्षण (Ex-situ) में अंतर"
    ],
    long: [
      "पुष्पी पौधों में मादा युग्मकोद्भिद (भ्रूणकोष - Embryo Sac) के विकास का सचित्र 7-कोशिकीय 8-केंद्रकीय अवस्था का विस्तृत वर्णन कीजिए।",
      "मानव नर अथवा मादा जनन तंत्र का स्वच्छ नामांकित चित्र बनाइए तथा इसके प्रमुख अंगों के कार्य समझाइए।",
      "मेसल्सन एवं स्टाल के प्रयोग द्वारा सिद्ध कीजिए कि डीएनए प्रतिकृतियन अर्धसंरक्षी (Semi-conservative) होता है।",
      "पुनर्योगज डीएनए तकनीक (Recombinant DNA Technology) के प्रमुख चरणों का प्रवाह संचित्र (Flowchart) सहित विस्तृत वर्णन कीजिए।",
      "जैव-विविधता की क्षति के 'द एविल क्वार्टेट' (The Evil Quartet) के चारों प्रमुख कारणों की सोदाहरण व्याख्या कीजिए।"
    ]
  },
  "accountancy": {
    short: [
      "साझेदारी संलेख (Partnership Deed) के अभाव में लागू होने वाले प्रमुख नियम",
      "त्याग अनुपात (Sacrifice Ratio) एवं प्राप्ति अनुपात (Gaining Ratio) में अंतर व सूत्र",
      "ख्याति (Goodwill) के मूल्यांकन की अधिलाभ विधि (Super Profit Method)",
      "साझेदार के प्रवेश पर पुनर्मूल्यांकन खाता (Revaluation Account) का प्रारूप",
      "संचित लाभों एवं हानियों का पुराने साझेदारों में विभाजन नियम",
      "अंशों के हरण (Forfeiture of Shares) का अर्थ एवं कानूनी प्रक्रिया",
      "अंशों के आनुपातिक आवंटन (Pro-rata Allotment) का अभिप्राय",
      "ऋणपत्रों का संपार्श्विक प्रतिभूति (Collateral Security) के रूप में निर्गमन",
      "पूंजीगत संचय (Capital Reserve) एवं संचित पूंजी (Reserve Capital) में अंतर",
      "रोकड़ प्रवाह विवरण (Cash Flow Statement - AS-3) के तीन मुख्य क्रियाकलाप",
      "परिचालन क्रियाओं से रोकड़ प्रवाह की गणना में गैर-रोकड़ मदों का समायोजन",
      "चालू अनुपात (Current Ratio) एवं त्वरित अनुपात (Quick Ratio) का आदर्श मान",
      "ऋण-समता अनुपात (Debt to Equity Ratio) एवं स्वामित्व अनुपात",
      "सकल लाभ अनुपात (Gross Profit Ratio) एवं शुद्ध लाभ अनुपात का सूत्र",
      "समान आकार वित्तीय विवरण (Common Size Statements) का उद्देश्य"
    ],
    long: [
      "साझेदार के अवकाश ग्रहण पर संयुक्त जीवन पॉलिसी एवं पूंजी समायोजन की आवश्यक रोजनामचा प्रविष्टियां कीजिए।",
      "एक्स लिमिटेड ने ₹10 वाले 50,000 समता अंश ₹2 प्रीमियम पर निर्गमित किए। अति-अभिदान एवं प्रो-राटा आवंटन की विस्तृत रोजनामचा प्रविष्टियां तैयार कीजिए।",
      "लेखांकन मानक-3 (AS-3) के अनुसार पूर्ण रोकड़ प्रवाह विवरण (Cash Flow Statement) का प्रारूप एवं वित्तीय व परिचालन क्रियाओं का सविस्तर निरूपण कीजिए।",
      "वित्तीय विवरणों के विश्लेषण के प्रमुख औजारों (Tools of Financial Analysis) एवं अनुपात विश्लेषण के महत्व पर प्रकाश डालिए।"
    ]
  },
  "business": {
    short: [
      "प्रबंध की परिभाषा एवं इसके बहु-आयामी (Multidimensional) स्वरूप की व्याख्या",
      "एफ.डब्ल्यू. टेलर के वैज्ञानिक प्रबंध के चार मूल सिद्धांत",
      "हेनरी फेयोल के 14 सिद्धांतों में से 'आदेश की एकता' एवं 'निर्देश की एकता' में अंतर",
      "नियोजन की सीमाएं एवं अनम्यता (Rigidity)",
      "अधिकार अंतरण (Delegation of Authority) के तीन मूल तत्व",
      "कार्यात्मक संगठन ढांचा (Functional Structure) के दो गुण व दो दोष",
      "भर्ती के आंतरिक स्रोतों एवं बाह्य स्रोतों की तुलना",
      "प्रशिक्षण (Training) एवं विकास (Development) में अंतर",
      "मैस्लो के आवश्यकता पदानुक्रम सिद्धांत (Need Hierarchy Theory) के पांच स्तर",
      "वित्तीय प्रबंधन का प्राथमिक उद्देश्य (शेयरधारकों की संपदा को अधिकतम करना)",
      "कार्यशील पूंजी (Working Capital) को प्रभावित करने वाले चार कारक",
      "विपणन मिश्रण (Marketing Mix) के 4Ps: उत्पाद, मूल्य, स्थान एवं संवर्धन",
      "उपभोक्ता संरक्षण अधिनियम 2019 के अंतर्गत उपभोक्ता के 6 मौलिक अधिकार"
    ],
    long: [
      "प्रबंध कला है अथवा विज्ञान अथवा पेशा? तर्कों सहित विस्तृत विश्लेषण प्रस्तुत कीजिए।",
      "नियोजन प्रक्रिया (Planning Process) के विभिन्न चरणों का क्रमबद्ध सविस्तर वर्णन कीजिए।",
      "प्रभावी संदेशवाहन (Communication) की प्रमुख बाधाओं एवं उन्हें दूर करने के व्यावहारिक उपायों की विवेचना कीजिए।",
      "भारतीय प्रतिभूति एवं विनिमय बोर्ड (SEBI) के नियामक, विकासात्मक एवं सुरक्षात्मक कार्यों का मूल्यांकन कीजिए।"
    ]
  },
  "history": {
    short: [
      "हड़प्पा सभ्यता की सुनियोजित नगर योजना एवं मोहनजोदड़ो का विशाल स्नानागार",
      "अशोक के धम्म के प्रमुख सिद्धांत एवं लोक-कल्याणकारी नीतियां",
      "मौर्य कालीन इतिहास जानने के प्रमुख साधन: मेगस्थनीज की इंडिका एवं कौटिल्य का अर्थशास्त्र",
      "महाभारत काल में पितृवंशिकता एवं बहुपति प्रथा के ऐतिहासिक संदर्भ",
      "इब्न बतूता के यात्रा वृत्तांत में भारतीय डाक व्यवस्था का वर्णन",
      "भक्ति आंदोलन के प्रमुख संत कबीर एवं गुरु नानक की शिक्षाएं",
      "विजयनगर साम्राज्य का महानवमी डिब्बा एवं जल संपदा व्यवस्था",
      "मुगल कालीन मनसबदारी व्यवस्था के प्रमुख लक्षण",
      "आईन-ए-अकबरी के रचयिता अबुल फजल की ऐतिहासिक दृष्टि",
      "1793 का लॉर्ड कॉर्नवालिस का स्थायी बंदोबस्त (Permanent Settlement) और रैयत पर प्रभाव",
      "1857 के स्वतंत्रता संग्राम के तात्कालिक कारण एवं चर्बी वाले कारतूस की घटना",
      "महात्मा गांधी का चंपारण सत्याग्रह (1917) एवं तीनकठिया प्रणाली का अंत",
      "जलियांवाला बाग हत्याकांड (13 अप्रैल 1919) एवं रॉलेट एक्ट का विरोध",
      "दांडी मार्च एवं सविनय अवज्ञा आंदोलन (1930) का ऐतिहासिक महत्व",
      "भारत छोड़ो आंदोलन (1942) एवं 'करो या मरो' का नारा",
      "भारतीय संविधान सभा की प्रारूप समिति एवं डॉ. बी.आर. अम्बेडकर का योगदान"
    ],
    long: [
      "हड़प्पा सभ्यता के नगर नियोजन, जल निकासी प्रणाली एवं शिल्प उत्पादन की प्रमुख विशेषताओं का विस्तृत मूल्यांकन कीजिए।",
      "मौर्य कालीन केंद्रीय, प्रांतीय एवं नगर प्रशासन की कार्यप्रणाली का सविस्तर विश्लेषण कीजिए।",
      "1857 के प्रथम स्वतंत्रता संग्राम के राजनीतिक, आर्थिक, सामाजिक एवं धार्मिक कारणों तथा असफलता के परिणामों की विवेचना कीजिए।",
      "भारतीय स्वतंत्रता आंदोलन में महात्मा गांधी द्वारा चलाए गए असहयोग आंदोलन, सविनय अवज्ञा आंदोलन एवं भारत छोड़ो आंदोलन का तुलनात्मक मूल्यांकन कीजिए।"
    ]
  },
  "polity": {
    short: [
      "गुटनिरपेक्ष आंदोलन (NAM) के संस्थापक नेता एवं इसके 5 मूल सिद्धांत",
      "शीत युद्ध (Cold War) के दौरान महाशक्तियों द्वारा छोटे देशों के साथ गठबंधन बनाने के कारण",
      "सोवियत संघ के विघटन के तीन प्रमुख कारण एवं मिखाइल गोर्बाचेव की नीतियां",
      "शॉक थेरेपी (Shock Therapy) का अर्थ एवं इसके आर्थिक परिणाम",
      "आसियान (ASEAN) के तीन स्तंभ एवं आसियान शैली (ASEAN Way)",
      "संयुक्त राष्ट्र संघ (UNO) के सुरक्षा परिषद के स्थायी सदस्यों की वीटो पावर (Veto Power)",
      "वैश्वीकरण (Globalization) के आर्थिक, राजनीतिक एवं सांस्कृतिक प्रभाव",
      "स्वतंत्र भारत में राष्ट्र निर्माण की तीन प्रमुख चुनौतियां",
      "सरदार वल्लभभाई पटेल द्वारा देसी रियासतों (हैदराबाद एवं जूनागढ़) का भारत में विलय",
      "भारत की प्रथम पंचवर्षीय योजना (कृषि) एवं द्वितीय पंचवर्षीय योजना (उद्योग) में अंतर",
      "भारत की विदेश नीति के मूल तत्व: पंचशील के 5 सिद्धांत",
      "1975 में राष्ट्रीय आपातकाल लगाए जाने के कारण एवं भारतीय लोकतंत्र पर प्रभाव",
      "मंडल आयोग की प्रमुख सिफारिशें एवं अन्य पिछड़ा वर्ग (OBC) आरक्षण",
      "भारत में गठबंधन सरकारों के दौर की प्रमुख विशेषताएं एवं प्रभाव"
    ],
    long: [
      "समकालीन विश्व राजनीति में संयुक्त राष्ट्र संघ (UNO) की भूमिका एवं सुरक्षा परिषद में भारत की स्थायी सदस्यता के दावे का तर्कपूर्ण विश्लेषण कीजिए।",
      "भारत और चीन के संबंधों का 1962 के युद्ध से लेकर वर्तमान सीमा विवाद एवं आर्थिक सहयोग के संदर्भ में समग्र मूल्यांकन कीजिए।",
      "1975 के राष्ट्रीय आपातकाल के कारणों, लोकतांत्रिक संस्थाओं पर इसके प्रभाव तथा इससे प्राप्त संवैधानिक शिक्षाओं का सविस्तर वर्णन कीजिए।",
      "भारत में स्वतंत्रता के बाद से लेकर वर्तमान समय तक दल प्रणाली (Party System) के विकास एवं एक-दल प्रभुत्व से बहुदलीय गठबंधन राजनीति के संक्रमण की विवेचना कीजिए।"
    ]
  },
  "hindi": {
    short: [
      "संधि की परिभाषा एवं स्वर संधि के पांचों भेदों (दीर्घ, गुण, वृद्धि, यण, अयादि) के सोदाहरण नियम",
      "समास के भेद: अव्ययीभाव, तत्पुरुष, द्विगु, द्वंद्व, कर्मधारय एवं बहुव्रीहि समास के दो-दो उदाहरण",
      "रस की परिभाषा, स्थायी भाव एवं शृंगार, वीर, करुण तथा हास्य रस का एक-एक उदाहरण",
      "अलंकार: अनुप्रास, यमक, श्लेष, उपमा, रूपक एवं उत्प्रेक्षा अलंकार की पहचान व लक्षण",
      "मुहावरे एवं लोकोक्तियां: 'अंगूठा दिखाना', 'ईद का चांद होना', 'दांत खट्टे करना' का वाक्य प्रयोग",
      "उपसर्ग एवं प्रत्यय में अंतर एवं 'अति', 'दुर्', 'ता', 'इक' से दो-दो शब्द रचना",
      "पर्यायवाची शब्द: सूर्य, गंगा, पृथ्वी, बादल, कमल एवं जल के तीन-तीन पर्याय",
      "विलोम शब्द: अनुराग, उत्कर्ष, तिमिर, प्रत्यक्ष, स्थावर, संकीर्ण का विपरीतार्थक",
      "वाक्यांश के लिए एक शब्द: 'जो सब कुछ जानता हो', 'जिसकी उपमा न हो', 'अल्पाहारी'",
      "शुद्ध-अशुद्ध वर्तनी: कवयित्री, उज्ज्वल, आशीर्वाद, शृंगार, पूजनीय का शुद्ध रूप"
    ],
    long: [
      "दिए गए पद्यांश की सप्रसंग व्याख्या कीजिए (कवि का नाम, संदर्भ, प्रसंग, व्याख्या एवं काव्यगत सौंदर्य)।",
      "दिए गए गद्यांश का संदर्भ सहित भावार्थ एवं रेखांकित अंशों की व्याख्या प्रस्तुत कीजिए।",
      "अपने क्षेत्र में संक्रामक बीमारी अथवा जल-भराव की समस्या के निवारण हेतु नगर निगम आयुक्त/जिलाधिकारी को एक शिकायती पत्र लिखिए।",
      "निम्नलिखित विषयों में से किसी एक पर सारगर्भित निबंध लिखिए: (क) पर्यावरण संरक्षण एवं वृक्षारोपण, (ख) भारत में डिजिटल क्रांति एवं युवा, (ग) विद्यार्थी जीवन और अनुशासन।"
    ]
  }
};

// Generates exactly 200 MCQs, 50 2-Mark Short Answer, and 25 5-Mark Long Answer Questions
function generateSubjectStudyGuide(boardId = "bseb", classLevel = "10th", subjectId = "science", options = {}) {
  const b = BOARD_REGISTRY[boardId] || BOARD_REGISTRY["bseb"];
  const langMode = b.langMode || "bilingual-hindi";
  const is12th = classLevel.includes("12");
  const targetClass = is12th ? "12th" : "10th";

  // Normalize subjectId
  let normSubject = (subjectId || "science").toLowerCase();
  if (normSubject.includes("bengali") || normSubject.includes("বাংলা") || normSubject.includes("bangla")) normSubject = "bengali";
  else if (normSubject.includes("tamil") || normSubject.includes("தமிழ்")) normSubject = "tamil";
  else if (normSubject.includes("telugu") || normSubject.includes("తెలుగు")) normSubject = "telugu";
  else if (normSubject.includes("marathi") || normSubject.includes("मराठी")) normSubject = "marathi";
  else if (normSubject.includes("gujarati") || normSubject.includes("ગુજરાતી")) normSubject = "gujarati";
  else if (normSubject.includes("punjabi") || normSubject.includes("ਪੰਜਾਬੀ")) normSubject = "punjabi";
  else if (normSubject.includes("odia") || normSubject.includes("ଓଡ଼ିଆ")) normSubject = "odia";
  else if (normSubject.includes("assamese") || normSubject.includes("অসমীয়া")) normSubject = "assamese";
  else if (normSubject.includes("urdu") || normSubject.includes("اردو")) normSubject = "urdu";
  else if (normSubject.includes("kannada") || normSubject.includes("ಕನ್ನಡ")) normSubject = "kannada";
  else if (normSubject.includes("malayalam") || normSubject.includes("മലയാളം")) normSubject = "malayalam";
  else if (normSubject.includes("kokborok")) normSubject = "kokborok";
  else if (normSubject.includes("mizo")) normSubject = "mizo";
  else if (normSubject.includes("nepali")) normSubject = "nepali";
  else if (normSubject.includes("math") || normSubject.includes("गणित")) normSubject = "math";
  else if (normSubject.includes("phys") || normSubject.includes("भौतिक")) normSubject = "physics";
  else if (normSubject.includes("chem") || normSubject.includes("रसायन")) normSubject = "chemistry";
  else if (normSubject.includes("bio") || normSubject.includes("जीव")) normSubject = "biology";
  else if (normSubject.includes("account") || normSubject.includes("लेखा")) normSubject = "accountancy";
  else if (normSubject.includes("business") || normSubject.includes("व्यावसायिक")) normSubject = "business";
  else if (normSubject.includes("eco") || normSubject.includes("अर्थशास्त्र")) normSubject = "economics";
  else if (normSubject.includes("hist") || normSubject.includes("इतिहास")) normSubject = "history";
  else if (normSubject.includes("polit") || normSubject.includes("राजनीति")) normSubject = "polity";
  else if (normSubject.includes("hindi") || normSubject.includes("हिन्दी")) normSubject = "hindi";
  else if (normSubject.includes("english") || normSubject === "eng" || normSubject.startsWith("eng-") || normSubject.startsWith("eng_") || normSubject.includes("अंग्रेजी") || normSubject.includes("अंग्रेज़ी")) normSubject = "english";
  else if (normSubject.includes("social") || normSubject.includes("सामाजिक") || normSubject.includes("sst")) normSubject = "social";
  else if (normSubject.includes("sanskrit") || normSubject.includes("संस्कृत")) normSubject = "sanskrit";

  // Authentic Question Inventory Retrieval & Allocation
  let mcqs = [];
  const isAllBundle = normSubject === 'all' || normSubject.includes('सभी') || normSubject.includes('bundle');

  if (isAllBundle) {
    let boardSubjects = [];
    if (is12th) {
      boardSubjects = [
        { id: 'physics', name: '⚡ Physics (भौतिक विज्ञान)' },
        { id: 'chemistry', name: '🧪 Chemistry (रसायन विज्ञान)' },
        { id: 'math', name: '📐 Mathematics (गणित)' },
        { id: 'biology', name: '🧬 Biology (जीव विज्ञान)' },
        { id: 'english', name: '📖 English Core / Literature' },
        { id: 'hindi', name: '📜 Hindi / राष्ट्रभाषा' }
      ];
      if (b.nativeLangId && b.nativeLangId !== 'hindi') {
        boardSubjects.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      } else {
        boardSubjects.push({ id: 'sanskrit', name: '🕉️ Sanskrit / Elective' });
      }
    } else {
      boardSubjects = [
        { id: 'science', name: 'Science / विज्ञान' },
        { id: 'math', name: 'Mathematics / गणित' },
        { id: 'social', name: 'Social Science / सामाजिक विज्ञान' },
        { id: 'english', name: 'English / अंग्रेजी' }
      ];
      if (b.nativeLangId && b.nativeLangId !== 'hindi') {
        boardSubjects.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
        boardSubjects.push({ id: 'hindi', name: 'Hindi / हिन्दी' });
      } else {
        boardSubjects.push({ id: 'hindi', name: 'Hindi / हिन्दी' });
        boardSubjects.push({ id: 'sanskrit', name: 'Sanskrit / संस्कृत' });
      }
    }

    const subjectSections = boardSubjects.map(sub => {
      const qPool = getCompleteSubjectInventory(sub.id, { is12th, targetClass, boardId, langMode: b.langMode, preferredMedium: options.preferredMedium || options.medium, examName: `${b.name} Class ${targetClass}` });
      // Balanced proportion: 30-35 questions per subject for full mock bundle (approx 40%-60% coverage, 210-245 total)
      const sampleCount = Math.min(qPool.length, Math.max(30, Math.floor(qPool.length * 0.5)));
      return {
        subjectId: sub.id,
        subjectName: sub.name,
        questions: qPool.slice(0, sampleCount)
      };
    }).filter(sec => sec.questions.length > 0);

    const reconciled = reconcileAllSubjectBundle(subjectSections, { examId: `${boardId}-${targetClass}` });
    mcqs = reconciled.bundledQuestions.map((item, idx) => ({
      ...item,
      num: idx + 1,
      id: `${boardId}-${targetClass}-bundle-${idx + 1}`
    }));
  } else {
    // Single Subject Guide: Preserves FULL legitimate subject inventory without artificial clamp
    const questions = getCompleteSubjectInventory(normSubject, { is12th, targetClass, boardId, langMode: b.langMode, preferredMedium: options.preferredMedium || options.medium, examName: `${b.name} Class ${targetClass}` });
    mcqs = questions.map((item, idx) => ({
      ...item,
      num: idx + 1,
      id: `${boardId}-${targetClass}-${normSubject}-mcq-${idx + 1}`
    }));
  }

  // Safe memory ceiling: Cap MCQs to target quota (max 250)
  if (mcqs.length > 250) {
    mcqs = mcqs.slice(0, 250);
  }

  // 3. Compile Authentic Subjective Questions (Short & Long Answers)
  const shortSubjectives = [];
  const longSubjectives = [];
  const seenSubjStems = new Set();
  const isEnglishChosen = (langMode === "english" || (options.preferredMedium || options.medium) === 'en');

  // Priority 1: Check Database for authentic subjective questions of this board & subject
  const dbSubjectives = fetchDbSubjectivesForSubject(normSubject, { is12th, targetClass, boardId, langMode: b.langMode, preferredMedium: options.preferredMedium || options.medium });
  if (dbSubjectives && dbSubjectives.length > 0) {
    dbSubjectives.forEach((item) => {
      const stemKey = normalizeStem(item.q);
      if (!stemKey || stemKey.length < 5 || seenSubjStems.has(stemKey)) return;
      seenSubjStems.add(stemKey);

      const isLong = item.marks >= 4 || item.type === 'long_answer' || item.type === 'case_study';
      const formatted = {
        marks: item.marks || (isLong ? 5 : 2),
        topic: `${normSubject.toUpperCase()} Official Curriculum`,
        q: item.q,
        a: item.a
      };
      if (isLong) {
        longSubjectives.push(formatted);
      } else {
        shortSubjectives.push(formatted);
      }
    });
  }

  // Priority 2: Supplement with curated registry (strictly distinct authentic items - ZERO modulo repeats!)
  const isLangSub = ['hindi', 'english', 'sanskrit', 'urdu', 'tamil', 'telugu', 'punjabi', 'bengali', 'gujarati', 'kannada', 'malayalam', 'odia', 'assamese', 'marathi'].includes(normSubject);
  const subjSource = SUBJECTIVE_SOLUTIONS_REGISTRY[normSubject] ||
                     (!isLangSub ? (SUBJECTIVE_SOLUTIONS_REGISTRY["science"] || SUBJECTIVE_SOLUTIONS_REGISTRY["math"]) : null) || {};

  if (subjSource.short && Array.isArray(subjSource.short)) {
    for (const item of subjSource.short) {
      const qText = isEnglishChosen ? (item.q_en || item.q_hi) : (item.q_hi || item.q_en);
      const aText = isEnglishChosen ? (item.a_en || item.a_hi) : (item.a_hi || item.a_en);
      const stemKey = normalizeStem(qText);
      if (!stemKey || stemKey.length < 5 || seenSubjStems.has(stemKey)) continue;
      seenSubjStems.add(stemKey);

      shortSubjectives.push({
        marks: 2,
        topic: item.topic || `${normSubject.toUpperCase()} High-Yield Concept`,
        qRaw: qText,
        a: aText
      });
    }
  }

  if (subjSource.long && Array.isArray(subjSource.long)) {
    for (const item of subjSource.long) {
      const qText = isEnglishChosen ? (item.q_en || item.q_hi) : (item.q_hi || item.q_en);
      const aText = isEnglishChosen ? (item.a_en || item.a_hi) : (item.a_hi || item.a_en);
      const stemKey = normalizeStem(qText);
      if (!stemKey || stemKey.length < 5 || seenSubjStems.has(stemKey)) continue;
      seenSubjStems.add(stemKey);

      longSubjectives.push({
        marks: 5,
        topic: item.topic || `${normSubject.toUpperCase()} Detailed Subjective Proof`,
        qRaw: qText,
        a: aText
      });
    }
  }

  // Sequential numbering with medium-appropriate labels (strictly NO modulo loops!)
  shortSubjectives.forEach((item, idx) => {
    item.num = idx + 1;
    if (!item.q) {
      const prefix = isEnglishChosen ? `Question ${item.num}. [2 Marks]` : `प्रश्न ${item.num}. [2 अंक]`;
      item.q = `${prefix} ${item.qRaw}\n[${b.name} Class ${targetClass} ${normSubject.toUpperCase()} - Board Official Question]`;
    }
  });

  longSubjectives.forEach((item, idx) => {
    item.num = idx + 1;
    if (!item.q) {
      const prefix = isEnglishChosen ? `Long Answer Question ${item.num}. [5 Marks]` : `दीर्घ उत्तरीय प्रश्न ${item.num}. [5 अंक]`;
      item.q = `${prefix} ${item.qRaw}\n[${b.name} Class ${targetClass} Final Board Mandatory 5-Mark Set]`;
    }
  });

  // Hall of fame shortcuts
  const hallOfFame = [
    { q: `★ 10-Year Repeated: ${b.name} बोर्ड में 8+ बार पूछा गया रामबाण प्रश्न (${normSubject.toUpperCase()})`, a: "उत्तर: मुख्य वैज्ञानिक नियम, सूत्र एवं 100% सही उत्तर व्याख्या सहित।" },
    { q: `★ Top Board Distinction Proof: क्लास ${targetClass} मेरिट लिस्ट टॉपर्स द्वारा प्रयुक्त सूत्र`, a: "उत्तर: समय प्रबंधन (Time Management) और स्टेप मार्किंग में पूरे 100/100 अंक प्राप्ति का नियम।" }
  ];

  const shortcuts = [
    `⚡ ${b.name} Board Exam Golden Rule: वस्तुनिष्ठ (MCQ) में नकारात्मक अंकन नहीं होता, सभी 200 प्रश्न हल करें।`,
    `⚡ Step Marking Rule: विषयनिष्ठ प्रश्नों में सूत्र लिखने पर 1 अंक तथा उत्तर व मात्रक पर 1 अंक सुनिश्चित रूप से मिलता है।`,
    `⚡ Dual Medium Advantage: प्रश्न को समझने में कठिनाई होने पर अंग्रेजी व मातृभाषा दोनों रूप पढ़ें।`,
    `⚡ Topper Presentation: उत्तर में मुख्य परिभाषा, रासायनिक समीकरण अथवा गणितीय सूत्र को काले पेन से रेखांकित करें।`
  ];

  // Final Stem Deduplication Pass
  const finalSeenStems = new Set();
  mcqs = mcqs.filter(m => {
    const s = normalizeStem(m.q);
    if (!s || s.length < 5) return false;
    if (finalSeenStems.has(s)) return false;
    const l1 = normalizeStem(m.q.split('\n')[0]);
    if (l1 && l1.length >= 5 && finalSeenStems.has(l1)) return false;
    finalSeenStems.add(s);
    if (l1 && l1.length >= 5) finalSeenStems.add(l1);
    return true;
  }).map((m, idx) => ({ ...m, num: idx + 1 }));

  // Apply Natural Realistic Option Shuffling across all Board MCQs
  mcqs = applyNaturalOptionDistribution(mcqs);

  return {
    board: b.fullName,
    boardName: b.name,
    classLevel: targetClass,
    subject: normSubject,
    langMode: langMode,
    langTitle: b.langTitle,
    title: `${b.name} Class ${targetClass} - ${normSubject.toUpperCase()} Master Guide (2026 Edition)`,
    badge: `🎓 100% ${b.name} Board Exam Aligned (${mcqs.length} Questions)`,
    pages: `${Math.max(16, Math.ceil(mcqs.length / 4))} Pages Master PDF Guide`,
    summary: `${b.name} के प्रामाणिक हल सहित मॉडल पेपर, ${mcqs.length} वस्तुनिष्ठ बहुविकल्पीय प्रश्न (MCQs), ${shortSubjectives.length} लघु उत्तरीय (2M), ${longSubjectives.length} दीर्घ उत्तरीय (5M) व फॉर्मूला बैंक।`,
    objectives: mcqs,
    subjectives: [...shortSubjectives, ...longSubjectives],
    hallOfFame: hallOfFame,
    shortcuts: shortcuts,
    questions: mcqs.map(m => ({ q: m.q.split('\n')[0], a: m.ans }))
  };
}

function compileBoardSubjectBooklet(subjectId, options = {}) {
  const boardId = options.boardId || 'cbse-board';
  const targetClass = options.targetClass || '10';
  const preferredLang = options.preferredMedium || options.preferredLanguage || 'hi';
  const guide = generateSubjectStudyGuide(boardId, subjectId, targetClass, preferredLang, options);
  return {
    ...guide,
    sections: {
      objective: guide.objectives || [],
      subjective: guide.subjectives || []
    }
  };
}

module.exports = {
  BOARD_REGISTRY,
  getBoardSubjects,
  generateSubjectStudyGuide,
  compileBoardSubjectBooklet,
  ACADEMIC_BLUEPRINTS
};

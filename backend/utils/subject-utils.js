// backend/utils/subject-utils.js
// Canonical Subject Normalization and Isolation Utility
// Ensures exact mapping between UI subject slugs and database canonical IDs (e.g. 'physics' -> 'subj-physics').

const CANONICAL_SUBJECT_MAP = {
  // Sciences
  'physics': 'subj-physics',
  'subj-physics': 'subj-physics',
  'भौतिक विज्ञान': 'subj-physics',
  'chemistry': 'subj-chemistry',
  'subj-chemistry': 'subj-chemistry',
  'रसायन विज्ञान': 'subj-chemistry',
  'biology': 'subj-biology',
  'subj-biology': 'subj-biology',
  'जीव विज्ञान': 'subj-biology',
  'science': 'subj-science',
  'subj-science': 'subj-science',
  'सामान्य विज्ञान': 'subj-science',
  'tech': 'subj-railway-sci',
  'railway-sci': 'subj-railway-sci',
  'subj-railway-sci': 'subj-railway-sci',

  // Mathematics
  'math': 'subj-math',
  'maths': 'subj-math',
  'subj-math': 'subj-math',
  'mathematics': 'subj-math',
  'गणित': 'subj-math',
  'math12': 'subj-math12',
  'higher-math': 'subj-math12',
  'subj-math12': 'subj-math12',

  // Social Sciences & Humanities
  'social': 'subj-social',
  'social-science': 'subj-social',
  'subj-social': 'subj-social',
  'सामाजिक विज्ञान': 'subj-social',
  'history': 'subj-history',
  'subj-history': 'subj-history',
  'इतिहास': 'subj-history',
  'polity': 'subj-polity',
  'civics': 'subj-polity',
  'subj-polity': 'subj-polity',
  'राजनीति विज्ञान': 'subj-polity',
  'geography': 'subj-geography',
  'subj-geography': 'subj-geography',
  'भूगोल': 'subj-geography',
  'economics': 'subj-economics',
  'economy': 'subj-economics',
  'subj-economics': 'subj-economics',
  'अर्थशास्त्र': 'subj-economics',
  'sociology': 'subj-sociology',
  'subj-sociology': 'subj-sociology',

  // Commerce
  'accountancy': 'subj-accountancy',
  'accounts': 'subj-accountancy',
  'subj-accountancy': 'subj-accountancy',
  'लेखाशास्त्र': 'subj-accountancy',
  'business': 'subj-business',
  'business-studies': 'subj-business',
  'subj-business': 'subj-business',
  'व्यवसाय अध्ययन': 'subj-business',

  // Competitive & Aptitude
  'gk': 'subj-gk',
  'gs': 'subj-gk',
  'general-knowledge': 'subj-gk',
  'general-awareness': 'subj-gk',
  'subj-gk': 'subj-gk',
  'सामान्य ज्ञान': 'subj-gk',
  'reasoning': 'subj-reasoning',
  'general-intelligence': 'subj-reasoning',
  'subj-reasoning': 'subj-reasoning',
  'तर्कशक्ति': 'subj-reasoning',
  'law': 'subj-law',
  'police-law': 'subj-law',
  'subj-law': 'subj-law',
  'मूलविधि': 'subj-law',

  // Languages
  'hindi': 'subj-hindi',
  'subj-hindi': 'subj-hindi',
  'हिन्दी': 'subj-hindi',
  'english': 'subj-english',
  'subj-english': 'subj-english',
  'अंग्रेजी': 'subj-english',
  'sanskrit': 'subj-sanskrit',
  'subj-sanskrit': 'subj-sanskrit',
  'संस्कृत': 'subj-sanskrit',
  'tamil': 'subj-tamil',
  'subj-tamil': 'subj-tamil',
  'telugu': 'subj-telugu',
  'subj-telugu': 'subj-telugu',
  'punjabi': 'subj-punjabi',
  'subj-punjabi': 'subj-punjabi',
  'bengali': 'subj-bengali',
  'subj-bengali': 'subj-bengali',
  'gujarati': 'subj-gujarati',
  'subj-gujarati': 'subj-gujarati',
  'kannada': 'subj-kannada',
  'subj-kannada': 'subj-kannada',
  'malayalam': 'subj-malayalam',
  'subj-malayalam': 'subj-malayalam',
  'odia': 'subj-odia',
  'subj-odia': 'subj-odia',
  'assamese': 'subj-assamese',
  'subj-assamese': 'subj-assamese',
  'marathi': 'subj-marathi',
  'subj-marathi': 'subj-marathi',
  'urdu': 'subj-urdu',
  'subj-urdu': 'subj-urdu'
};

function normalizeSubjectId(subjectId) {
  if (!subjectId || subjectId === 'all') return 'all';
  const clean = String(subjectId).trim().toLowerCase();
  if (CANONICAL_SUBJECT_MAP[clean]) {
    return CANONICAL_SUBJECT_MAP[clean];
  }
  if (clean.startsWith('subj-')) return clean;
  return `subj-${clean}`;
}

function matchesSubject(qSubjectId, targetSubjectId) {
  if (!targetSubjectId || targetSubjectId === 'all') return true;
  const normTarget = normalizeSubjectId(targetSubjectId);
  const normQ = normalizeSubjectId(qSubjectId);
  return normQ === normTarget;
}

module.exports = {
  CANONICAL_SUBJECT_MAP,
  normalizeSubjectId,
  matchesSubject
};

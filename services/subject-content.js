// services/subject-content.js
// Authentic Subject-Specific High-Yield Question Banks & Formulas
// Accurately calibrated for all 20 Indian Boards (10th/12th) & All Central, Police, Defence, Entrance, Teaching Exams
// Powered by Board Curriculum Engine & Competitive Curriculum Engine (200-300 MCQs + Subjective Outlines)

const { getMasterStudyMaterial } = require('./master-notes-vault');
const { generateSubjectStudyGuide, BOARD_REGISTRY } = require('./board-curriculum-engine');
const { generateCompetitiveStudyGuide, COMPETITIVE_EXAMS_REGISTRY } = require('./competitive-curriculum-engine');

function resolveBoardKey(board = '', exam = '') {
  const combined = `${board} ${exam}`.toLowerCase();
  for (const key of Object.keys(BOARD_REGISTRY)) {
    const b = BOARD_REGISTRY[key];
    if (combined.includes(key) || combined.includes(b.name.toLowerCase()) || combined.includes(b.state.toLowerCase())) {
      return key;
    }
  }
  if (combined.includes('tripura') || combined.includes('tbse') || combined.includes('ত্রিপুরা')) return 'tbse';
  if (combined.includes('goa') || combined.includes('गोवा') || combined.includes('gbshse')) return 'goa';
  if (combined.includes('himachal') || combined.includes('hp') || combined.includes('हिमाचल') || combined.includes('hpbose')) return 'hp';
  if (combined.includes('kashmir') || combined.includes('jk') || combined.includes('जम्मू') || combined.includes('jkbose')) return 'jk';
  if (combined.includes('kerala') || combined.includes('केरल') || combined.includes('കേരള') || combined.includes('kbpe') || combined.includes('dhse')) return 'kerala';
  if (combined.includes('andhra') || combined.includes('ap') || combined.includes('ఆంధ్ర') || combined.includes('bieap') || combined.includes('bseap')) return 'ap';
  if (combined.includes('manipur') || combined.includes('mn') || combined.includes('मणिपुर') || combined.includes('bsem') || combined.includes('cohsem')) return 'mn';
  if (combined.includes('meghalaya') || combined.includes('ml') || combined.includes('मेघालय') || combined.includes('mbose')) return 'ml';
  if (combined.includes('mizoram') || combined.includes('mz') || combined.includes('मिजोरम') || combined.includes('mbse')) return 'mz';
  if (combined.includes('nagaland') || combined.includes('nl') || combined.includes('नागालैंड') || combined.includes('nbse')) return 'nl';
  if (combined.includes('sikkim') || combined.includes('sk') || combined.includes('सिक्किम') || combined.includes('sbse')) return 'sk';
  if (combined.includes('bihar') || combined.includes('पटना') || combined.includes('बिहार') || combined.includes('bseb')) return 'bseb';
  if (combined.includes('up') || combined.includes('उत्तर प्रदेश') || combined.includes('upmsp')) return 'upmsp';
  if (combined.includes('maharashtra') || combined.includes('महाराष्ट्र') || combined.includes('msbshse')) return 'maharashtra';
  if (combined.includes('rajasthan') || combined.includes('राजस्थान') || combined.includes('rbse')) return 'rbse';
  if (combined.includes('mp') || combined.includes('मध्य प्रदेश') || combined.includes('mpbse')) return 'mpbse';
  if (combined.includes('bengal') || combined.includes('पश्चिम बंगाल') || combined.includes('wb')) return 'wb';
  if (combined.includes('tamil') || combined.includes('तमिलनाडु') || combined.includes('tndge')) return 'tn';
  if (combined.includes('karnataka') || combined.includes('कर्नाटक') || combined.includes('kseab')) return 'karnataka';
  if (combined.includes('gujarat') || combined.includes('ગુજરાત') || combined.includes('गुजरात') || combined.includes('gseb')) return 'gujarat';
  if (combined.includes('haryana') || combined.includes('हरियाणा') || combined.includes('hbse') || combined.includes('bseh')) return 'haryana';
  if (combined.includes('jharkhand') || combined.includes('झारखंड') || combined.includes('jac')) return 'jac';
  if (combined.includes('punjab') || combined.includes('ਪੰਜਾਬ') || combined.includes('पंजाब') || combined.includes('pseb')) return 'pseb';
  if (combined.includes('chhattisgarh') || combined.includes('छत्तीसगढ़') || combined.includes('cgbse')) return 'cgbse';
  if (combined.includes('odisha') || combined.includes('ଓଡ଼ିଶା') || combined.includes('ओडिशा') || combined.includes('chse')) return 'bseodisha';
  if (combined.includes('uttarakhand') || combined.includes('उत्तराखंड') || combined.includes('ubse')) return 'ubse';
  if (combined.includes('assam') || combined.includes('অসম') || combined.includes('असम') || combined.includes('seba') || combined.includes('ahsec')) return 'seba';
  if (combined.includes('telangana') || combined.includes('తెలుగు') || combined.includes('तेलंगाना') || combined.includes('tsbie')) return 'bsetelangana';
  if (combined.includes('icse') || combined.includes('isc')) return 'icse';
  if (combined.includes('cbse')) return 'cbse';
  return 'cbse';
}

function resolveCompetitiveExamKey(exam = '') {
  const e = (exam || '').toLowerCase();
  for (const key of Object.keys(COMPETITIVE_EXAMS_REGISTRY)) {
    if (e.includes(key) || e.includes(COMPETITIVE_EXAMS_REGISTRY[key].name.toLowerCase())) {
      return key;
    }
  }
  if (e.includes('cgl') || e.includes('chsl')) return 'ssc-cgl';
  if (e.includes('mts')) return 'ssc-mts';
  if (e.includes('gd')) return 'ssc-gd';
  if (e.includes('alp') || e.includes('technician')) return 'railway-alp';
  if (e.includes('group d') || e.includes('ntpc')) return 'railway-group-d';
  if (e.includes('upsc') || e.includes('civil') || e.includes('ias') || e.includes('ips')) return 'upsc-cse';
  if (e.includes('nda')) return 'upsc-nda';
  if (e.includes('air force') || e.includes('vayu')) return 'iaf-agniveer';
  if (e.includes('navy')) return 'navy-agniveer';
  if (e.includes('army') || e.includes('agniveer')) return 'army-agniveer';
  if (e.includes('bank') || e.includes('ibps') || e.includes('sbi')) return 'banking';
  if (e.includes('up police') || e.includes('up si') || e.includes('उत्तर प्रदेश पुलिस')) return 'up-police';
  if (e.includes('bihar police') || e.includes('csbc') || e.includes('बिहार पुलिस')) return 'bihar-police';
  if (e.includes('delhi police') || e.includes('दिल्ली पुलिस')) return 'delhi-police';
  if (e.includes('rajasthan police') || e.includes('राजस्थान पुलिस')) return 'rajasthan-police';
  if (e.includes('mp police') || e.includes('एमपी पुलिस')) return 'mp-police';
  if (e.includes('haryana police') || e.includes('हरियाणा पुलिस')) return 'haryana-police';
  if (e.includes('wb police') || e.includes('kolkata') || e.includes('পশ্চিমবঙ্গ')) return 'wb-police';
  if (e.includes('maharashtra police') || e.includes('पोलीस') || e.includes('महाराष्ट्र पोलीस')) return 'maharashtra-police';
  if (e.includes('neet')) return 'nta-neet';
  if (e.includes('jee')) return 'nta-jee';
  if (e.includes('cuet')) return 'nta-cuet';
  if (e.includes('clat') || e.includes('law')) return 'clat-law';
  if (e.includes('ctet')) return 'ctet';
  if (e.includes('up tet') || e.includes('super tet')) return 'up-tet';
  if (e.includes('bpsc') || e.includes('tre')) return 'bpsc-tre';
  if (e.includes('reet')) return 'reet';
  if (e.includes('net') || e.includes('ugc')) return 'ugc-net';
  return 'ssc-gd';
}

function getBoardDisplayName(boardKey = '') {
  const b = BOARD_REGISTRY[boardKey] || BOARD_REGISTRY[resolveBoardKey(boardKey)];
  return b ? b.fullName : 'All-India State Board Examination 2026';
}

const NOTES_CACHE = new Map();

function getSubjectSpecificStudyMaterial(exam = '', subject = '', board = '') {
  const s = (subject || '').toLowerCase();
  const e = (exam || '').toLowerCase();
  const cacheKey = `${e}_${s}_${String(board || '').toLowerCase()}`.trim();

  if (NOTES_CACHE.has(cacheKey)) {
    return JSON.parse(JSON.stringify(NOTES_CACHE.get(cacheKey)));
  }
  
  // Competitive exams (SSC, Railway, Police, UPSC, Defence, Banking, Teaching, Entrance) take strict precedence
  const isExplicitCompetitive = e.includes('ssc') || e.includes('police') || e.includes('railway') || e.includes('rrb') || e.includes('upsc') || e.includes('nda') || e.includes('agniveer') || e.includes('banking') || e.includes('ibps') || e.includes('sbi') || e.includes('neet') || e.includes('jee') || e.includes('cuet') || e.includes('clat') || e.includes('ctet') || e.includes('tet') || e.includes('bpsc') || e.includes('reet') || e.includes('ugc');

  const isBoardExam = !isExplicitCompetitive && (
    e.startsWith('board-') || 
    e.includes('class') || 
    e.includes('10th') || 
    e.includes('12th') || 
    e.includes('-10') || 
    e.includes('-12') || 
    e.includes('मैट्रिक') || 
    e.includes('इंटर') || 
    e.includes('hsc') || 
    Object.keys(BOARD_REGISTRY).some(b => e.includes(b)) ||
    (Boolean(board) && !isExplicitCompetitive)
  );
  const boardKey = resolveBoardKey(board, exam);

  let resultGuide = null;

  if (isBoardExam) {
    const classLevel = (e.includes('12th') || e.includes('-12') || e.includes('inter') || e.includes('इंटर') || e.includes('hsc')) ? '12th' : '10th';
    let subjectKey = 'science';
    if (s.includes('bengali') || s.includes('বাংলা') || s.includes('bangla')) subjectKey = 'bengali';
    else if (s.includes('tamil') || s.includes('தமிழ்')) subjectKey = 'tamil';
    else if (s.includes('telugu') || s.includes('తెలుగు')) subjectKey = 'telugu';
    else if (s.includes('marathi') || s.includes('मराठी')) subjectKey = 'marathi';
    else if (s.includes('gujarati') || s.includes('ગુજરાતી')) subjectKey = 'gujarati';
    else if (s.includes('punjabi') || s.includes('ਪੰਜਾਬੀ')) subjectKey = 'punjabi';
    else if (s.includes('odia') || s.includes('ଓଡ଼ିଆ')) subjectKey = 'odia';
    else if (s.includes('assamese') || s.includes('অসমীয়া')) subjectKey = 'assamese';
    else if (s.includes('urdu') || s.includes('اردو')) subjectKey = 'urdu';
    else if (s.includes('kannada') || s.includes('ಕನ್ನಡ')) subjectKey = 'kannada';
    else if (s.includes('malayalam') || s.includes('മലയാളം')) subjectKey = 'malayalam';
    else if (s.includes('kokborok')) subjectKey = 'kokborok';
    else if (s.includes('mizo')) subjectKey = 'mizo';
    else if (s.includes('nepali')) subjectKey = 'nepali';
    else if (s.includes('math') || s.includes('गणित')) subjectKey = 'math';
    else if (s.includes('physics') || s.includes('भौतिक')) subjectKey = classLevel === '10th' ? 'science' : 'physics';
    else if (s.includes('chem') || s.includes('रसायन')) subjectKey = classLevel === '10th' ? 'science' : 'chemistry';
    else if (s.includes('bio') || s.includes('जीव')) subjectKey = classLevel === '10th' ? 'science' : 'biology';
    else if (s.includes('social') || s.includes('सामाजिक') || s.includes('sst')) subjectKey = 'social';
    else if (s.includes('eng') || s.includes('अंग्रेजी')) subjectKey = 'english';
    else if (s.includes('hindi') || s.includes('हिन्दी')) subjectKey = 'hindi';
    else if (s.includes('sanskrit') || s.includes('संस्कृत')) subjectKey = 'sanskrit';
    else if (s.includes('account') || s.includes('लेखा')) subjectKey = 'accountancy';
    else if (s.includes('business') || s.includes('व्यावसायिक')) subjectKey = 'business';
    else if (s.includes('eco') || s.includes('अर्थशास्त्र')) subjectKey = classLevel === '10th' ? 'social' : 'economics';
    else if (s.includes('hist') || s.includes('इतिहास')) subjectKey = classLevel === '10th' ? 'social' : 'history';
    else if (s.includes('polit') || s.includes('राजनीति')) subjectKey = classLevel === '10th' ? 'social' : 'polity';
    else if (s.includes('geog') || s.includes('भूगोल')) subjectKey = classLevel === '10th' ? 'social' : 'geography';
    else if (s.includes('socio') || s.includes('समाजशास्त्र')) subjectKey = classLevel === '10th' ? 'social' : 'sociology';
    else if (s.includes('all') || s.includes('सभी') || s.includes('bundle') || s.includes('full mock') || s.includes('science stream')) subjectKey = 'all';

    resultGuide = generateSubjectStudyGuide(boardKey, classLevel, subjectKey);
  } else {
    // All Competitive, Police, Defence, Entrance, and Teaching Exams (250-300 MCQs)
    const compKey = resolveCompetitiveExamKey(exam);
    resultGuide = generateCompetitiveStudyGuide(compKey, subject);
  }

  // Preserve 100% of authentic inventory without artificial clamps
  if (resultGuide) {
    const qCount = (resultGuide.objectives?.length || 0) + (resultGuide.subjectives?.length || 0);
    resultGuide.pages = `${Math.max(16, Math.ceil(qCount / 7))} Pages Master PDF`;
  }

  NOTES_CACHE.set(cacheKey, JSON.parse(JSON.stringify(resultGuide)));
  return resultGuide;
}

module.exports = {
  getSubjectSpecificStudyMaterial,
  getBoardDisplayName,
  resolveBoardKey,
  resolveCompetitiveExamKey
};

const fs = require('fs');

function auditFile(filePath, bankNames) {
  console.log(`\n=== Auditing ${filePath} ===`);
  const content = fs.readFileSync(filePath, 'utf8');
  bankNames.forEach(b => {
    const start = content.indexOf(`const ${b}`);
    if (start === -1) {
      console.log(`${b}: NOT FOUND`);
      return;
    }
    const nextConst = content.indexOf('const ', start + 5);
    const chunk = nextConst > 0 ? content.slice(start, nextConst) : content.slice(start);
    
    // Parse objects using regex or eval
    let questions = [];
    try {
      const arrStr = chunk.slice(chunk.indexOf('['), chunk.lastIndexOf(']') + 1);
      questions = JSON.parse(arrStr);
    } catch (e) {
      // try loose eval
      try {
        questions = eval(chunk.slice(chunk.indexOf('['), chunk.lastIndexOf(']') + 1));
      } catch (err) {
        console.log(`Error parsing ${b}:`, err.message);
        return;
      }
    }
    
    let totalQ = questions.length;
    let englishInQ = 0;
    let bilingualOptions = 0;
    let totalOptions = 0;
    
    questions.forEach(q => {
      if (q.q && (q.q.includes('[English:') || q.q.includes('[') || /[a-zA-Z]{4,}/.test(q.q))) {
        englishInQ++;
      }
      if (q.options) {
        q.options.forEach(opt => {
          totalOptions++;
          // check if option has both Devanagari and English or '/'
          const hasDev = /[\u0900-\u097F]/.test(opt);
          const hasEng = /[a-zA-Z]/.test(opt.replace(/^[A-D]\)\s*/, ''));
          const isNumeric = /^([A-D]\)\s*)?[\d\.\-\+\×\÷\/\(\)\s\%\^\,\=]+$/.test(opt);
          if ((hasDev && hasEng) || opt.includes('/') || isNumeric || (!hasDev && hasEng)) {
            bilingualOptions++;
          }
        });
      }
    });
    console.log(`${b}: ${totalQ} Qs | Bilingual Qs: ${englishInQ}/${totalQ} | Bilingual/Valid Opts: ${bilingualOptions}/${totalOptions}`);
  });
}

auditFile('public/js/master-class12-bank.js', [
  'CLASS12_PHYSICS_BANK',
  'CLASS12_CHEMISTRY_BANK',
  'CLASS12_BIOLOGY_BANK',
  'CLASS12_MATH_BANK',
  'CLASS12_ACCOUNTANCY_BANK',
  'CLASS12_BUSINESS_BANK',
  'CLASS12_ECONOMICS_BANK',
  'CLASS12_HISTORY_BANK',
  'CLASS12_POLITY_BANK',
  'CLASS12_GEOGRAPHY_BANK'
]);

auditFile('public/js/master-high-yield-bank.js', [
  'HIGH_YIELD_MATH_BANK',
  'HIGH_YIELD_SCIENCE_BANK',
  'HIGH_YIELD_SOCIAL_BANK',
  'HIGH_YIELD_HINDI_BANK',
  'HIGH_YIELD_ENGLISH_BANK',
  'HIGH_YIELD_SANSKRIT_BANK'
]);

auditFile('public/js/master-competitive-bank.js', [
  'COMPETITIVE_REASONING_BANK',
  'COMPETITIVE_MATH_BANK',
  'UP_POLICE_LAW_SPECIAL_BANK',
  'RAILWAY_SCIENCE_TECH_BANK',
  'COMPETITIVE_GK_GS_BANK'
]);

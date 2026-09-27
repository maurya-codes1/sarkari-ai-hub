const fs = require('fs');

const content = fs.readFileSync('public/js/master-high-yield-bank.js', 'utf8');

function inspectBank(bankName) {
  console.log(`\n=== Untranslated options in ${bankName} ===`);
  const start = content.indexOf(`const ${bankName}`);
  const nextConst = content.indexOf('const ', start + 5);
  const chunk = nextConst > 0 ? content.slice(start, nextConst) : content.slice(start);
  const arrStr = chunk.slice(chunk.indexOf('['), chunk.lastIndexOf(']') + 1);
  const questions = eval(arrStr);
  
  const untranslated = [];
  questions.forEach((q, qIdx) => {
    q.options.forEach((opt, optIdx) => {
      const clean = opt.replace(/^[A-D]\)\s*/, '');
      const hasDev = /[\u0900-\u097F]/.test(clean);
      const hasEng = /[a-zA-Z]/.test(clean);
      const isNumeric = /^[\d\.\-\+\×\÷\/\(\)\s\%\^\,\=]+$/.test(clean);
      if (hasDev && !hasEng && !clean.includes('/') && !isNumeric) {
        untranslated.push({ qIdx, optIdx, opt: clean });
      }
    });
  });
  console.log(`Found ${untranslated.length} untranslated options.`);
  console.log('Sample 15:');
  untranslated.slice(0, 15).forEach(u => console.log(`Q${u.qIdx + 1}: ${u.opt}`));
}

inspectBank('HIGH_YIELD_SCIENCE_BANK');
inspectBank('HIGH_YIELD_SOCIAL_BANK');

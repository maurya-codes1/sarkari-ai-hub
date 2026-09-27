const fs = require('fs');

const content = fs.readFileSync('public/js/master-high-yield-bank.js', 'utf8');

function getUntranslatedList(bankNames) {
  const map = new Set();
  bankNames.forEach(b => {
    const start = content.indexOf(`const ${b}`);
    const nextConst = content.indexOf('const ', start + 5);
    const chunk = nextConst > 0 ? content.slice(start, nextConst) : content.slice(start);
    const arrStr = chunk.slice(chunk.indexOf('['), chunk.lastIndexOf(']') + 1);
    const questions = eval(arrStr);
    
    questions.forEach(q => {
      q.options.forEach(opt => {
        const clean = opt.replace(/^[A-D]\)\s*/, '').trim();
        const hasDev = /[\u0900-\u097F]/.test(clean);
        const hasEng = /[a-zA-Z]/.test(clean);
        const isNumeric = /^[\d\.\-\+\×\÷\/\(\)\s\%\^\,\=]+$/.test(clean);
        if (hasDev && !hasEng && !clean.includes('/') && !isNumeric) {
          map.add(clean);
        }
      });
    });
  });
  return Array.from(map);
}

const un = getUntranslatedList(['HIGH_YIELD_SCIENCE_BANK', 'HIGH_YIELD_SOCIAL_BANK', 'HIGH_YIELD_MATH_BANK']);
console.log('Total unique untranslated strings:', un.length);
fs.writeFileSync('scratch/untranslated_strings.json', JSON.stringify(un, null, 2), 'utf8');

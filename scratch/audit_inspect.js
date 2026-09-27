const fs = require('fs');
const path = require('path');

console.log('=== AUDITING QUESTION BANKS VIA REQUIRE ===');

try {
  const hy = require('../public/js/master-high-yield-bank.js');
  let totalHy = 0;
  Object.keys(hy).forEach(k => {
    if (Array.isArray(hy[k])) {
      totalHy += hy[k].length;
      console.log(`- ${k}: ${hy[k].length} questions`);
    }
  });
  console.log(`Total High Yield (Class 10 / Foundational): ${totalHy} questions\n`);
} catch(e) {
  console.log('HY error:', e.message);
}

try {
  const c12 = require('../public/js/master-class12-bank.js');
  let totalC12 = 0;
  Object.keys(c12).forEach(k => {
    if (Array.isArray(c12[k])) {
      totalC12 += c12[k].length;
      console.log(`- ${k}: ${c12[k].length} questions`);
    }
  });
  console.log(`Total Class 12: ${totalC12} questions\n`);
} catch(e) {
  console.log('C12 error:', e.message);
}

try {
  const comp = require('../public/js/master-competitive-bank.js');
  let totalComp = 0;
  Object.keys(comp).forEach(k => {
    if (Array.isArray(comp[k])) {
      totalComp += comp[k].length;
      console.log(`- ${k}: ${comp[k].length} questions`);
    }
  });
  console.log(`Total Competitive: ${totalComp} questions\n`);
} catch(e) {
  console.log('Comp error:', e.message);
}

try {
  const qdCode = fs.readFileSync('public/js/quiz-data.js', 'utf8');
  const win = {};
  const vm = require('vm');
  const sb = { window: win, console: console, module: { exports: {} } };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(qdCode + `
    global.qdResults = {
      examsConfig: typeof EXAMS_CONFIG !== 'undefined' ? EXAMS_CONFIG.length : 0,
      masterQuestions: typeof MASTER_QUESTIONS !== 'undefined' ? MASTER_QUESTIONS.length : 0,
      boardMetadata: typeof BOARD_METADATA !== 'undefined' ? Object.keys(BOARD_METADATA).length : 0,
      clientBlueprints: typeof CLIENT_BLUEPRINTS !== 'undefined' ? CLIENT_BLUEPRINTS.length : 0,
      compBlueprints: typeof COMPETITIVE_BLUEPRINTS !== 'undefined' ? COMPETITIVE_BLUEPRINTS.length : 0
    };
  `, sb);
  console.log('Quiz-data.js stats:', sb.qdResults);
} catch(e) {
  console.log('Quiz data error:', e.message);
}

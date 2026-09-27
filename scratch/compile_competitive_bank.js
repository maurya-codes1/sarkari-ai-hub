const fs = require('fs');

const reasoning = require('./data_comp_reasoning.js');
const math = require('./data_comp_math.js');
const law = require('./data_comp_law.js');
const railway = require('./data_comp_railway.js');
const gk = require('./data_comp_gk.js');

console.log('Reasoning:', reasoning.length);
console.log('Math:', math.length);
console.log('Law:', law.length);
console.log('Railway:', railway.length);
console.log('GK:', gk.length);

const out = `// public/js/master-competitive-bank.js
// 2026 Master Question Bank for Competitive Exams (SSC GD, SSC CGL, UP Police Constable/SI, Railway ALP/Tech/Group D)
// High-Yield 2020-2025 TCS/NTA Exam PYQs + 2026 Standard Model Questions
// 100% Bilingual Question Statements & Options (Hindi + English)
// Strict Subject Isolation: Reasoning, Quantitative Aptitude, UP Police Law/Moolvidhi, Railway Science/Tech, GK/GS

const COMPETITIVE_REASONING_BANK = ${JSON.stringify(reasoning, null, 2)};

const COMPETITIVE_MATH_BANK = ${JSON.stringify(math, null, 2)};

const UP_POLICE_LAW_SPECIAL_BANK = ${JSON.stringify(law, null, 2)};

const RAILWAY_SCIENCE_TECH_BANK = ${JSON.stringify(railway, null, 2)};

const COMPETITIVE_GK_GS_BANK = ${JSON.stringify(gk, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COMPETITIVE_REASONING_BANK,
    COMPETITIVE_MATH_BANK,
    UP_POLICE_LAW_SPECIAL_BANK,
    RAILWAY_SCIENCE_TECH_BANK,
    COMPETITIVE_GK_GS_BANK
  };
}
`;

fs.writeFileSync('public/js/master-competitive-bank.js', out, 'utf8');
console.log('Successfully compiled public/js/master-competitive-bank.js!');

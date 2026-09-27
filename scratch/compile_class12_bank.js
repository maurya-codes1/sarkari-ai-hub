const fs = require('fs');

const math = require('./data_math12.js');
const physics = require('./data_physics12.js');
const chemistry = require('./data_chemistry12.js');
const biology = require('./data_biology12.js');
const commerce = require('./data_commerce12.js');
const arts = require('./data_arts12.js');

console.log('Math:', math.length);
console.log('Physics:', physics.length);
console.log('Chemistry:', chemistry.length);
console.log('Biology:', biology.length);
console.log('Accountancy:', commerce.accountancy.length);
console.log('Business:', commerce.business.length);
console.log('Economics:', commerce.economics.length);
console.log('History:', arts.history.length);
console.log('Polity:', arts.polity.length);
console.log('Geography:', arts.geography.length);

const out = `// public/js/master-class12-bank.js
// 2026 Master Question Bank for Class 12th Streams (Science, Commerce, Arts)
// Strictly localized, zero-fallback dedicated subject vaults
// Authentic 2020-2025 Board PYQs + 2026 NCERT/State Board Model Questions
// 100% Bilingual Question Statements & Options (Hindi + English) for all non-language subjects

const CLASS12_PHYSICS_BANK = ${JSON.stringify(physics, null, 2)};

const CLASS12_CHEMISTRY_BANK = ${JSON.stringify(chemistry, null, 2)};

const CLASS12_BIOLOGY_BANK = ${JSON.stringify(biology, null, 2)};

const CLASS12_MATH_BANK = ${JSON.stringify(math, null, 2)};

const CLASS12_ACCOUNTANCY_BANK = ${JSON.stringify(commerce.accountancy, null, 2)};

const CLASS12_BUSINESS_BANK = ${JSON.stringify(commerce.business, null, 2)};

const CLASS12_ECONOMICS_BANK = ${JSON.stringify(commerce.economics, null, 2)};

const CLASS12_HISTORY_BANK = ${JSON.stringify(arts.history, null, 2)};

const CLASS12_POLITY_BANK = ${JSON.stringify(arts.polity, null, 2)};

const CLASS12_GEOGRAPHY_BANK = ${JSON.stringify(arts.geography, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLASS12_PHYSICS_BANK,
    CLASS12_CHEMISTRY_BANK,
    CLASS12_BIOLOGY_BANK,
    CLASS12_MATH_BANK,
    CLASS12_ACCOUNTANCY_BANK,
    CLASS12_BUSINESS_BANK,
    CLASS12_ECONOMICS_BANK,
    CLASS12_HISTORY_BANK,
    CLASS12_POLITY_BANK,
    CLASS12_GEOGRAPHY_BANK
  };
}
`;

fs.writeFileSync('public/js/master-class12-bank.js', out, 'utf8');
console.log('Successfully wrote public/js/master-class12-bank.js!');

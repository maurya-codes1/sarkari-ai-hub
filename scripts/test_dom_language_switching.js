const fs = require('fs');
const path = require('path');

const { I18N_DATA, EXTENDED_I18N_DATA, RTL_LANGUAGES, getTranslation } = require(path.join(__dirname, '..', 'public', 'js', 'i18n'));

// Read index.html and parse all [data-i18n] keys
const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const i18nMatches = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueKeys = Array.from(new Set(i18nMatches));

console.log(`Auditing DOM translations for ${uniqueKeys.length} keys used in index.html across all 25 locales...`);

const testLanguages = [
  'en', 'hi', 'hi-latn', 'ta', 'te', 'mr', 'bn', 'gu', 'kn', 'ml',
  'pa', 'ur', 'or', 'sa', 'as', 'mai', 'bho', 'ne', 'kok', 'sd',
  'doi', 'ks', 'sat', 'brx', 'mni'
];

let allPassed = true;

for (const lang of testLanguages) {
  const isRTL = RTL_LANGUAGES.includes(lang);
  let resolvedCount = 0;
  let missingCount = 0;
  const missingKeys = [];

  for (const k of uniqueKeys) {
    const val = getTranslation(k, lang);
    if (val && val !== k) {
      resolvedCount++;
    } else {
      missingCount++;
      missingKeys.push(k);
    }
  }

  const pass = missingCount === 0;
  if (!pass) allPassed = false;

  console.log(`${lang.padEnd(8)}: RTL=${isRTL ? 'YES' : 'NO '} | Resolved: ${resolvedCount}/${uniqueKeys.length} | Missing: ${missingCount} -> ${pass ? '✅ PASS' : '❌ FAIL'}`);
  if (missingKeys.length > 0) {
    console.log(`   Sample missing:`, missingKeys.slice(0, 5));
  }
}

console.log('\n======================================================');
console.log('DOM TRANSLATION COVERAGE RESULT:', allPassed ? '✅ 100% COMPLETE PARITY' : '❌ ISSUES FOUND');
console.log('======================================================');
process.exit(allPassed ? 0 : 1);

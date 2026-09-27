const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('./public/js/i18n.js', 'utf8');
const sandbox = {
  window: {},
  localStorage: { getItem: () => 'en', setItem: () => {} },
  document: { addEventListener: () => {}, querySelectorAll: () => [], getElementById: () => null }
};
vm.runInNewContext(content + '; this.I18N_DATA = I18N_DATA;', sandbox);

const I18N_DATA = sandbox.I18N_DATA;
const masterKeys = Object.keys(I18N_DATA['en'] || {});
const masterKeyCount = masterKeys.length;

console.log('Master Key Count (English):', masterKeyCount);

const results = [];
for (const langCode of Object.keys(I18N_DATA)) {
  const dict = I18N_DATA[langCode];
  let nativeCount = 0;
  let fallbackCount = 0;

  for (const k of masterKeys) {
    if (langCode === 'en') {
      nativeCount++;
    } else {
      const val = dict[k];
      const enVal = I18N_DATA['en'][k];
      if (val !== undefined && val !== null && val !== '' && val !== enVal) {
        nativeCount++;
      } else {
        fallbackCount++;
      }
    }
  }

  const exactPct = (nativeCount / masterKeyCount) * 100;

  results.push({
    langCode,
    nativeCount,
    fallbackCount,
    masterKeyCount,
    exactPct: exactPct.toFixed(2) + '%',
    exactPctNum: exactPct
  });
}

console.table(results);

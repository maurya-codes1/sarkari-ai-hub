const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const regex = /data-i18n="([^"]+)"/g;
let match;
const tags = [];
while ((match = regex.exec(html)) !== null) {
  tags.push(match[1]);
}
console.log('Total data-i18n occurrences in index.html:', tags.length);
const unique = new Set(tags);
console.log('Unique data-i18n keys in index.html:', unique.size);

const { I18N_DATA } = require('../public/js/i18n.js');
const missingInEn = [];
const missingInHi = [];
for (const key of unique) {
  if (!I18N_DATA.en || !I18N_DATA.en[key]) missingInEn.push(key);
  if (!I18N_DATA.hi || !I18N_DATA.hi[key]) missingInHi.push(key);
}
console.log('Keys missing in EN:', missingInEn.length, missingInEn);
console.log('Keys missing in HI:', missingInHi.length, missingInHi);

const fs = require('fs');

const content = fs.readFileSync('./public/js/i18n.js', 'utf8');
const start = content.indexOf('const I18N_DATA =');
const end = content.indexOf('const SUPPORTED_LANGUAGES =');
const snippet = content.slice(start, end) + '\nreturn I18N_DATA;';
const fn = new Function(snippet);
const i18n = fn();

const langs = Object.keys(i18n);
console.log('Total languages loaded:', langs.length);
console.log('Languages:', langs);

const html = fs.readFileSync('./public/index.html', 'utf8');
const re = /data-i18n=["']([^"']+)["']/g;
const htmlKeys = [];
let match;
while ((match = re.exec(html)) !== null) {
  htmlKeys.push(match[1]);
}
const uniqueHtmlKeys = [...new Set(htmlKeys)];
console.log('Unique data-i18n attributes in index.html:', uniqueHtmlKeys.length);

let totalErrors = 0;
for (const lang of langs) {
  const missingInLang = uniqueHtmlKeys.filter(k => !(k in i18n[lang]));
  if (missingInLang.length > 0) {
    console.log(`Language [${lang}] is missing ${missingInLang.length} keys used in HTML:`, missingInLang);
    totalErrors += missingInLang.length;
  }
}

if (totalErrors === 0) {
  console.log('PERFECT! Every single data-i18n in public/index.html exists across all 14 languages!');
} else {
  console.log(`Total missing key usages across languages: ${totalErrors}`);
}

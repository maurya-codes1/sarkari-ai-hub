const fs = require('fs');

const html = fs.readFileSync('./public/index.html', 'utf8');
const jsCode = fs.readFileSync('./public/js/i18n.js', 'utf8');

// Parse I18N_DATA
const start = jsCode.indexOf('const I18N_DATA =');
const end = jsCode.indexOf('const SUPPORTED_LANGUAGES =');
const snippet = jsCode.slice(start, end) + '\nreturn I18N_DATA;';
const I18N_DATA = new Function(snippet)();

function simulateTranslate(lang) {
  const dict = I18N_DATA[lang] || I18N_DATA['hi'];
  const regex = /data-i18n=["']([^"']+)["'][^>]*>([^<]*)</g;
  let count = 0;
  let match;
  const sampleTranslations = {};
  
  while ((match = regex.exec(html)) !== null) {
    const key = match[1];
    const originalText = match[2].trim();
    const translatedText = dict[key] || I18N_DATA['en'][key] || key;
    count++;
    if (!sampleTranslations[key]) {
      sampleTranslations[key] = translatedText;
    }
  }
  return { count, sampleTranslations };
}

console.log('--- Testing Hindi (hi) ---');
const hiRes = simulateTranslate('hi');
console.log('Translated elements count:', hiRes.count);
console.log('Sample translations (hi):');
console.log(' - card_quiz_title:    ', hiRes.sampleTranslations['card_quiz_title']);
console.log(' - card_quiz_sub:      ', hiRes.sampleTranslations['card_quiz_sub']);
console.log(' - card_resizer_title: ', hiRes.sampleTranslations['card_resizer_title']);
console.log(' - card_resizer_sub:   ', hiRes.sampleTranslations['card_resizer_sub']);
console.log(' - card_notes_title:   ', hiRes.sampleTranslations['card_notes_title']);
console.log(' - card_notes_sub:     ', hiRes.sampleTranslations['card_notes_sub']);
console.log(' - ticker_label:       ', hiRes.sampleTranslations['ticker_label']);
console.log(' - search_hint:        ', hiRes.sampleTranslations['search_hint']);
console.log(' - nav_quiz:           ', hiRes.sampleTranslations['nav_quiz']);

console.log('\n--- Testing Telugu (te) ---');
const teRes = simulateTranslate('te');
console.log('Translated elements count:', teRes.count);
console.log('Sample translations (te):');
console.log(' - card_quiz_title:    ', teRes.sampleTranslations['card_quiz_title']);
console.log(' - card_quiz_sub:      ', teRes.sampleTranslations['card_quiz_sub']);
console.log(' - card_resizer_title: ', teRes.sampleTranslations['card_resizer_title']);
console.log(' - card_resizer_sub:   ', teRes.sampleTranslations['card_resizer_sub']);
console.log(' - card_notes_title:   ', teRes.sampleTranslations['card_notes_title']);
console.log(' - card_notes_sub:     ', teRes.sampleTranslations['card_notes_sub']);
console.log(' - ticker_label:       ', teRes.sampleTranslations['ticker_label']);
console.log(' - search_hint:        ', teRes.sampleTranslations['search_hint']);
console.log(' - nav_quiz:           ', teRes.sampleTranslations['nav_quiz']);

console.log('\n--- Testing Hinglish (hi-latn) ---');
const hlRes = simulateTranslate('hi-latn');
console.log('Sample translations (hi-latn):');
console.log(' - card_quiz_title:    ', hlRes.sampleTranslations['card_quiz_title']);
console.log(' - card_quiz_sub:      ', hlRes.sampleTranslations['card_quiz_sub']);
console.log(' - card_resizer_title: ', hlRes.sampleTranslations['card_resizer_title']);
console.log(' - card_resizer_sub:   ', hlRes.sampleTranslations['card_resizer_sub']);

console.log('\n--- Testing Tamil (ta) ---');
const taRes = simulateTranslate('ta');
console.log('Sample translations (ta):');
console.log(' - card_quiz_title:    ', taRes.sampleTranslations['card_quiz_title']);
console.log(' - card_quiz_sub:      ', taRes.sampleTranslations['card_quiz_sub']);

const fs = require('fs');
let content = fs.readFileSync('public/js/i18n.js', 'utf8');

// polyfill
global.localStorage = { getItem: () => 'hi', setItem: () => {} };
global.document = { addEventListener: () => {}, querySelectorAll: () => [], documentElement: {} };
global.window = { dispatchEvent: () => {} };

const script = content + '\nmodule.exports = { I18N_DATA, currentLanguage, getTranslation };';
fs.writeFileSync('scratch/temp_i18n_export.js', script);

try {
  const { I18N_DATA } = require('./temp_i18n_export.js');
  const langs = Object.keys(I18N_DATA);
  console.log('Langs count:', langs.length);
  const keys = ['faq_title', 'faq_student_desk', 'faq_q1', 'faq_a1', 'faq_q2', 'faq_a2', 'faq_q3', 'faq_a3', 'faq_q4', 'faq_a4', 'faq_q5', 'faq_a5'];
  langs.forEach(l => {
    const missing = keys.filter(k => !I18N_DATA[l][k]);
    if (missing.length > 0) {
      console.log(l + ' missing: ' + missing.join(', '));
    } else {
      console.log(l + ' OK! q1: ' + I18N_DATA[l]['faq_q1'].substring(0, 35) + '... | q2: ' + I18N_DATA[l]['faq_q2'].substring(0, 30));
    }
  });
} catch(err) {
  console.error('Error:', err);
} finally {
  try { fs.unlinkSync('scratch/temp_i18n_export.js'); } catch(e){}
}

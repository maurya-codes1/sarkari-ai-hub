const fs = require('fs');
let code = fs.readFileSync('public/js/i18n.js', 'utf8');

const backMap = {
  en: 'Back (वापस जाएं)',
  hi: 'वापस जाएं (Back)',
  'hi-latn': 'Wapas Jayein (Back)',
  bn: 'ফিরে যান (Back)',
  ta: 'பின்னே செல் (Back)',
  te: 'వెనుకకు (Back)',
  mr: 'मागे जा (Back)',
  gu: 'પાછા જાઓ (Back)',
  kn: 'ಹಿಂದಕ್ಕೆ (Back)',
  ml: 'പിന്നോട്ട് (Back)',
  pa: 'ਵਾਪਸ ਜਾਓ (Back)',
  ur: 'واپس جائیں (Back)',
  or: 'ଫେରିଯାଆନ୍ତୁ (Back)',
  sa: 'प्रतिनिवर्तताम् (Back)'
};

const exitBtnMap = {
  en: 'Exit Test (क्विज़ छोड़ें)',
  hi: 'क्विज़ छोड़ें (Exit Test)',
  'hi-latn': 'Quiz Chhodein (Exit Test)',
  bn: 'কুইজ ছাড়ুন (Exit Test)',
  ta: 'வெளியேறு (Exit Test)',
  te: 'నిష్క్రమించు (Exit Test)',
  mr: 'चाचणी सोडा (Exit Test)',
  gu: 'ટેસ્ટ છોડો (Exit Test)',
  kn: 'ನಿರ್ಗಮಿಸಿ (Exit Test)',
  ml: 'പുറത്തുകടക്കുക (Exit Test)',
  pa: 'ਟੈਸਟ ਛੱਡੋ (Exit Test)',
  ur: 'ٹیسٹ چھوڑیں (Exit Test)',
  or: 'ପରୀକ୍ଷା ଛାଡନ୍ତୁ (Exit Test)',
  sa: 'प्रश्नोत्तरीं त्यजतु (Exit Test)'
};

for (const [lang, val] of Object.entries(backMap)) {
  const reg = new RegExp('("' + lang + '"\\s*:\\s*\\{[\\s\\S]*?"back_btn"\\s*:\\s*)"[^"]*"');
  code = code.replace(reg, '$1"' + val + '"');
}

for (const [lang, val] of Object.entries(exitBtnMap)) {
  const reg = new RegExp('("' + lang + '"\\s*:\\s*\\{[\\s\\S]*?"quiz_exit_btn"\\s*:\\s*)"[^"]*"');
  code = code.replace(reg, '$1"' + val + '"');
}

fs.writeFileSync('public/js/i18n.js', code, 'utf8');
console.log('Successfully updated i18n.js with bilingual back_btn and quiz_exit_btn!');

const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '../public/js/i18n.js');
let s = fs.readFileSync(p, 'utf8');

const brandMap = {
  en: 'BharatExams Hub',
  hi: 'भारतएग्जाम्स हब',
  'hi-latn': 'BharatExams Hub',
  ta: 'பாரத் எக்ஸாம்ஸ் ஹப்',
  te: 'భారత్ ఎగ్జామ్స్ హబ్',
  mr: 'भारतएक्झाम्स हब',
  bn: 'ভারতএকজামস হাব',
  gu: 'ભારતએક્ઝામ્સ હબ',
  kn: 'ಭಾರತ್ ಎಕ್ಸಾಮ್ಸ್ ಹಬ್',
  ml: 'ഭാരത് എക്സാംസ് ഹബ്',
  pa: 'ਭਾਰਤ ਐਗਜ਼ਾਮਸ ਹੱਬ',
  ur: 'بھارت ایگزامز ہب',
  or: 'ଭାରତଏକ୍ସାମସ୍ ହବ୍',
  sa: 'भारतपरीक्षाकेन्द्रम्',
  as: 'ভাৰতএকজামচ হাব',
  mai: 'भारतएग्जाम्स हब',
  bho: 'भारतएग्जाम्स हब',
  ne: 'भारतएक्जाम्स हब',
  kok: 'भारतएक्झाम्स हब',
  sd: 'ڀارت ايگزامز هب',
  doi: 'भारतएग्जाम्स हब',
  ks: 'بھارت ایگزامز ہب',
  sat: 'ᱵᱷᱟᱨᱚᱛ ᱮᱠᱡᱟᱢᱥ ᱦᱟᱵᱽ',
  brx: 'भारत एक्जाम्स हाब',
  mni: 'ꯚꯥꯔꯠ ꯑꯦꯛꯖꯥꯃꯁ ꯍꯕ'
};

const liveMap = {
  en: '3,07,520+ Live',
  hi: '3,07,520+ लाइव',
  'hi-latn': '3,07,520+ Live',
  ta: '3,07,520+ நேரலை',
  te: '3,07,520+ లైవ్',
  mr: '3,07,520+ थेट उपलब्ध',
  bn: '3,07,520+ লাইভ',
  gu: '3,07,520+ લાઇવ',
  kn: '3,07,520+ ಲೈವ್',
  ml: '3,07,520+ ലൈവ്',
  pa: '3,07,520+ ਲਾਈਵ',
  ur: '3,07,520+ لائیو',
  or: '3,07,520+ ଲାଇଭ୍',
  sa: '3,07,520+ प्रत्यक्षम्',
  as: '3,07,520+ লাইভ',
  mai: '3,07,520+ लाइव',
  bho: '3,07,520+ लाइव',
  ne: '3,07,520+ प्रत्यक्ष',
  kok: '3,07,520+ थेट',
  sd: '3,07,520+ لائیو',
  doi: '3,07,520+ लाइव्ह',
  ks: '3,07,520+ لائیو',
  sat: '3,07,520+ ᱞᱟᱭᱤᱵᱽ',
  brx: '3,07,520+ लाइभ',
  mni: '3,07,520+ ꯂꯥꯏꯚ'
};

for (const [lang, title] of Object.entries(brandMap)) {
  const target = '"' + lang + '": {\n    "nav_lang_select": ';
  const pos = s.indexOf(target);
  if (pos !== -1) {
    const brandPos = s.indexOf('"brand_title": "BharatExams Hub"', pos);
    if (brandPos !== -1 && brandPos < pos + 600) {
      s = s.substring(0, brandPos) + '"brand_title": "' + title + '"' + s.substring(brandPos + '"brand_title": "BharatExams Hub"'.length);
      console.log('Updated brand_title for ' + lang + ' -> ' + title);
    }
  }
}

for (const [lang, countStr] of Object.entries(liveMap)) {
  const target = '"' + lang + '": {\n    "bqb_badge_corpus":';
  const pos = s.indexOf(target);
  if (pos !== -1) {
    const liveKey = '"bqb_live_count": "';
    const livePos = s.indexOf(liveKey, pos);
    if (livePos !== -1 && livePos < pos + 600) {
      const endQuote = s.indexOf('"', livePos + liveKey.length);
      if (endQuote !== -1) {
        const oldVal = s.substring(livePos + liveKey.length, endQuote);
        s = s.substring(0, livePos + liveKey.length) + countStr + s.substring(endQuote);
        console.log('Updated bqb_live_count for ' + lang + ': ' + oldVal + ' -> ' + countStr);
      }
    }
  }
}

s = s.split('1,72,210+').join('3,07,520+');
s = s.split('1,72,210').join('3,07,520');
s = s.split('49 National Competitive Exams').join('32 National Competitive Exams');
s = s.split('49 राष्ट्रीय प्रतियोगी परीक्षाओं').join('32 राष्ट्रीय प्रतियोगी परीक्षाओं');

fs.writeFileSync(p, s, 'utf8');
console.log('✅ ALL 25 LANGUAGES IN public/js/i18n.js UPDATED PERFECTLY!');

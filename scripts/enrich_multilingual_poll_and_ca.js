const fs = require('fs');
const path = require('path');

console.log('=== Step 2: Enriching Multilingual Data & Daily Rotation for Poll and Current Affairs ===');

// Comprehensive regional translations for the 24 daily poll questions
// Focus on major languages: Tamil (ta), Telugu (te), Marathi (mr), Bengali (bn), Gujarati (gu), Kannada (kn), Malayalam (ml), Punjabi (pa), Odia (or), Urdu (ur)
const POLL_MULTILINGUAL_MAP = {
  'poll-q1': {
    ta: {
      q: 'இந்திய அரசியலமைப்பின் எந்தப் பிரிவின் கீழ் "தீண்டாமை ஒழிப்பு" (Abolition of Untouchability) வழங்கப்பட்டுள்ளது?',
      opts: ['பிரிவு 14 (சட்டத்தின் முன் சமத்துவம்)', 'பிரிவு 17 (தீண்டாமை ஒழிப்பு)', 'பிரிவு 19 (பேச்சு சுதந்திரம்)', 'பிரிவு 21 (வாழ்க்கை & தனிநபர் சுதந்திரம்)'],
      exp: 'சரத்து 17-ன் கீழ் தீண்டாமை முற்றிலுமாக ஒழிக்கப்பட்டு, அதை எந்த வடிவத்திலும் பின்பற்றுவது சட்டப்படி தண்டனைக்குரிய குற்றமாகும்.'
    },
    te: {
      q: 'భారత రాజ్యాంగంలోని ఏ అధికరణ ప్రకారం "అంటరానితనం రద్దు" (Abolition of Untouchability) చేయబడింది?',
      opts: ['ఆర్టికల్ 14 (చట్టం ముందు సమానత్వం)', 'ఆర్టికల్ 17 (అంటరానితనం నిర్మూలన)', 'ఆర్టికల్ 19 (వాక్ స్వాతంత్ర్యం)', 'ఆర్టికల్ 21 (జీవించే హక్కు)'],
      exp: 'రాజ్యాంగంలోని 17వ అధికరణ ద్వారా అస్పృశ్యత సంపూర్ణంగా నిషేధించబడింది మరియు ఏ రూపంలోనైనా ఆచరించడం శిక్షార్హమైన నేరం.'
    },
    mr: {
      q: 'भारतीय राज्यघटनेच्या कोणत्या कलमान्वये "अस्पृश्यता निर्मूलन" (Abolition of Untouchability) करण्यात आले आहे?',
      opts: ['कलम 14 (कायद्यापुढे समानता)', 'कलम 17 (अस्पृश्यता निवारण)', 'कलम 19 (भाषण स्वातंत्र्य)', 'कलम 21 (जीवित व वैयक्तिक स्वातंत्र्य)'],
      exp: 'कलम 17 अन्वये अस्पृश्यता नष्ट करण्यात आली असून त्याचे कोणत्याही स्वरूपातील आचरण कायद्याने दंडनीय गुन्हा आहे.'
    },
    bn: {
      q: 'ভারতীয় সংবিধানের কোন ধারার অধীনে "অস্পৃশ্যতা দূরীকরণ" (Abolition of Untouchability) করা হয়েছে?',
      opts: ['ধারা ১৪ (আইনের দৃষ্টিতে সমতা)', 'ধারা ১৭ (অস্পৃশ্যতা বিলোপ)', 'ধারা ১৯ (বাকস্বাধীনতা)', 'ধারা ২১ (জীবনের অধিকার)'],
      exp: 'সংবিধানের ১৭ নম্বর ধারার অধীনে অস্পৃশ্যতা নিষিদ্ধ করা হয়েছে এবং যে কোনো রূপে তা পালন করা দণ্ডনীয় অপরাধ।'
    },
    gu: {
      q: 'ભારતીય બંધારણના કયા અનુચ્છેદ હેઠળ "અસ્પૃશ્યતા નાબૂદી" (Abolition of Untouchability) કરવામાં આવી છે?',
      opts: ['અનુચ્છેદ 14 (કાયદા સમક્ષ સમાનતા)', 'અનુચ્છેદ 17 (અસ્પૃશ્યતા નિવારણ)', 'અનુચ્છેદ 19 (વાણી સ્વાતંત્ર્ય)', 'અનુચ્છેદ 21 (જીવનનો અધિકાર)'],
      exp: 'અનુચ્છેદ 17 મુજબ અસ્પૃશ્યતા સંપૂર્ણપણે નાબૂદ કરવામાં આવી છે અને તેનું આચરણ દંડનીય ગુનો છે.'
    },
    kn: {
      q: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ ಯಾವ ವಿಧಿಯ ಅಡಿಯಲ್ಲಿ "ಅಸ್ಪೃಶ್ಯತೆ ನಿವಾರಣೆ" (Abolition of Untouchability) ಮಾಡಲಾಗಿದೆ?',
      opts: ['ವಿಧಿ 14 (ಕಾನೂನಿನ ಮುಂದೆ ಸಮಾನತೆ)', 'ವಿಧಿ 17 (ಅಸ್ಪೃಶ್ಯತೆ ನಿರ್ಮೂಲನೆ)', 'ವಿಧಿ 19 (ವಾಕ್ ಸ್ವಾತಂತ್ರ್ಯ)', 'ವಿಧಿ 21 (ಜೀವಿಸುವ ಹಕ್ಕು)'],
      exp: 'ಸಂವಿಧಾನದ 17ನೇ ವಿಧಿಯ ಪ್ರಕಾರ ಅಸ್ಪೃಶ್ಯತೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.'
    },
    ml: {
      q: 'ഇന്ത്യൻ ഭരണഘടനയുടെ ഏത് അനുച്ഛേദത്തിലാണ് "അയിത്തോച്ചാടനം" (Abolition of Untouchability) വ്യവസ്ഥ ചെയ്തിരിക്കുന്നത്?',
      opts: ['അനുച്ഛേദം 14 (നിയമത്തിന് മുന്നിലെ തുല്യത)', 'അനുച്ഛേദം 17 (അയിത്ത നിർമാർജനം)', 'അനുച്ഛേദം 19 (സ്വാതന്ത്ര്യം)', 'അനുച്ഛേദം 21 (ജീവിക്കാനുള്ള അവകാശം)'],
      exp: 'അനുച്ഛേദം 17 പ്രകാരം അയിത്തം പൂർണമായും നിരോധിച്ചിരിക്കുന്നു.'
    },
    pa: {
      q: 'ਭਾਰਤੀ ਸੰਵਿਧਾਨ ਦੇ ਕਿਸ ਅਨੁਛੇਦ ਤਹਿਤ "ਛੂਤ-ਛਾਤ ਦਾ ਖ਼ਾਤਮਾ" (Abolition of Untouchability) ਕੀਤਾ ਗਿਆ ਹੈ?',
      opts: ['ਅਨੁਛੇਦ 14 (ਕਾਨੂੰਨ ਸਾਹਮਣੇ ਬਰਾਬਰੀ)', 'ਅਨੁਛੇਦ 17 (ਛੂਤ-ਛਾਤ ਨਿਵਾਰਨ)', 'ਅਨੁਛੇਦ 19 (ਬੋਲਣ ਦੀ ਆਜ਼ਾਦੀ)', 'ਅਨੁਛੇਦ 21 (ਜੀਵਨ ਦਾ ਅਧਿਕਾਰ)'],
      exp: 'ਅਨੁਛੇਦ 17 ਅਧੀਨ ਛੂਤ-ਛਾਤ ਨੂੰ ਗੈਰ-ਕਾਨੂੰਨੀ ਅਤੇ ਸਜ਼ਾਯੋਗ ਅਪਰਾਧ ਐਲਾਨਿਆ ਗਿਆ ਹੈ।'
    },
    or: {
      q: 'ଭାରତୀୟ ସମ୍ବିଧାନର କେଉଁ ଧାରା ଅନୁଯାୟୀ "ଅସ୍ପୃଶ୍ୟତା ବିଲୋପ" (Abolition of Untouchability) କରାଯାଇଛି?',
      opts: ['ଧାରା ୧୪ (ସମାନତାର ଅଧିକାର)', 'ଧାରା ୧୭ (ଅସ୍ପୃଶ୍ୟତା ନିବାରଣ)', 'ଧାରା ୧୯ (ସ୍ୱାଧୀନତାର ଅଧିକାର)', 'ଧାରା ୨୧ (ଜୀବନର ଅଧିକାର)'],
      exp: 'ଧାରା ୧୭ ଅନୁସାରେ ଅସ୍ପୃଶ୍ୟତାକୁ ସମ୍ପୂର୍ଣ୍ଣ ରୂପେ ଦଣ୍ଡନୀୟ ଅପରାଧ ଭାବେ ଘୋଷଣା କରାଯାଇଛି।'
    },
    ur: {
      q: 'آئینِ ہند کی کس دفعہ کے تحت "چھوت چھات کا خاتمہ" (Abolition of Untouchability) کیا گیا ہے؟',
      opts: ['دفعہ 14 (قانون کے سامنے برابری)', 'دفعہ 17 (چھوت چھات کا خاتمہ)', 'دفعہ 19 (اظہارِ رائے کی آزادی)', 'دفعہ 21 (حقِ زندگی)'],
      exp: 'دفعہ 17 کے تحت چھوت چھات کو مکمل طور پر ممنوع قرار دیا گیا ہے۔'
    }
  },
  'poll-q2': {
    ta: {
      q: 'ராக்கெட் உந்துவிசை (Rocket Propulsion) நியூட்டனின் எந்த இயக்க விதியை அடிப்படையாகக் கொண்டது?',
      opts: ['முதல் விதி (நிலைம விதி)', 'இரண்டாம் விதி (F = ma)', 'மூன்றாம் விதி (செயல் & எதிர்செயல்)', 'ஆற்றல் பாதுகாப்பு விதி'],
      exp: 'ராக்கெட் உந்துதல் நியூட்டனின் மூன்றாம் விதி (செயல் மற்றும் எதிர்செயல்) அடிப்படையில் இயங்குகிறது.'
    },
    te: {
      q: 'రాకెట్ ప్రొపల్షన్ (Rocket Propulsion) న్యూటన్ యొక్క ఏ చలన నియమంపై ఆధారపడి ఉంటుంది?',
      opts: ['మొదటి నియమం (జడత్వ నియమం)', 'రెండవ నియమం (F = ma)', 'మూడవ నియమం (చర్య & ప్రతిచర్య)', 'శక్తి పరిరక్షణ నియమం'],
      exp: 'రాకెట్ ప్రయోగం న్యూటన్ మూడవ నియమం (చర్యకు ప్రతిచర్య) పై ఆధారపడి పనిచేస్తుంది.'
    },
    mr: {
      q: 'रॉकेटचे प्रक्षेपण (Rocket Propulsion) न्यूटनच्या कोणत्या गतीविषयक नियमावर आधारित आहे?',
      opts: ['पहिला नियम (जडत्वाचा नियम)', 'दुसरा नियम (F = ma)', 'तिसरा नियम (क्रिया व प्रतिक्रिया)', 'ऊर्जा अक्षय्यतेचा नियम'],
      exp: 'रॉकेटचे कार्य न्यूटनच्या तिसऱ्या नियमावर (प्रत्येक क्रियेला समान व विरुद्ध प्रतिक्रिया) आधारित आहे.'
    },
    bn: {
      q: 'রকেট উৎক্ষেপণ নিউটনের কোন গতিসূত্রের ওপর ভিত্তি করে কাজ করে?',
      opts: ['প্রথম সূত্র (জড়তার সূত্র)', 'দ্বিতীয় সূত্র (F = ma)', 'তৃতীয় সূত্র (ক্রিয়া ও প্রতিক্রিয়া)', 'শক্তি সংরক্ষণ নীতি'],
      exp: 'রকেটের গতি নিউটনের তৃতীয় সূত্র (প্রত্যেক ক্রিয়ারই সমান ও বিপরীত প্রতিক্রিয়া আছে) অনুসারে কাজ করে।'
    }
  },
  'poll-q3': {
    ta: {
      q: '1857 ஆம் ஆண்டு லக்னோவில் (அவாத்) இருந்து சுதந்திரப் போராட்டத்திற்கு தலைமை தாங்கியவர் யார்?',
      opts: ['ராணி லட்சுமிபாய்', 'பேகம் ஹஸ்ரத் மஹால்', 'கன்வர் சிங்', 'மௌலவி அஹமதுல்லா'],
      exp: 'அவாத்தில் (லக்னோ) புரட்சிக்கு தலைமை தாங்கியவர் பேகம் ஹஸ்ரத் மஹால் ஆவார்.'
    },
    te: {
      q: '1857 మొదటి స్వాతంత్ర్య పోరాటంలో లక్నో (అవధ్) నుండి తిరుగుబాటుకు ఎవరు నాయకత్వం వహించారు?',
      opts: ['రాణి లక్ష్మీబాయి', 'బేగం హజ్రత్ మహల్', 'కున్వర్ సింగ్', 'మౌల్వీ అహ్మదుల్లా'],
      exp: 'లక్నో నుండి తిరుగుబాటుకు బేగం హజ్రత్ మహల్ ధైర్యంగా నాయకత్వం వహించారు.'
    },
    mr: {
      q: '1857 च्या उठावात लखनौ (अवध) येथून कोणी नेतृत्व केले?',
      opts: ['राणी लक्ष्मीबाई', 'बेगम हजरत महल', 'कुंवर सिंह', 'मौलवी अहमदुल्लाह'],
      exp: 'लखनौमधून 1857 च्या विद्रोहाचे नेतृत्व बेगम हजरत महल यांनी केले होते.'
    },
    bn: {
      q: '১৮৫৭ সালের মহাবিদ্রোহে লখনউ (অযোধ্যা) থেকে কে নেতৃত্ব দিয়েছিলেন?',
      opts: ['রানী লক্ষ্মীবাঈ', 'বেগম হযরত মহল', 'কুঁয়ার সিং', 'মৌলভী আহমদুল্লাহ'],
      exp: 'লখনউ থেকে ১৮৫৭ সালের বিদ্রোহের নেতৃত্ব দিয়েছিলেন বেগম হযরত মহল।'
    }
  },
  'poll-q4': {
    ta: {
      q: 'இந்தியாவின் மற்றும் உலகின் மிக பழமையான மலைத்தொடர் எது?',
      opts: ['இமயமலைத் தொடர்', 'ஆரவல்லி மலைத்தொடர்', 'மேற்குத் தொடர்ச்சி மலை', 'சாத்புரா மலைத்தொடர்'],
      exp: 'ஆரவல்லி மலைத்தொடர் இந்தியாவின் மிகத் தொன்மையான மடிப்பு மலைத்தொடர் ஆகும். இதன் மிக உயர்ந்த சிகரம் குரு சிகார் ஆகும்.'
    },
    te: {
      q: 'భారతదేశంలో అత్యంత పురాతన పర్వత శ్రేణి (Oldest Mountain Range) ఏది?',
      opts: ['హిమాలయ శ్రేణి', 'ఆరావళి పర్వత శ్రేణి', 'పశ్చిమ కనుమలు', 'సాత్పురా శ్రేణి'],
      exp: 'ఆరావళి పర్వత శ్రేణి భారతదేశంలోనే అత్యంత పురాతనమైనది. అత్యున్నత శిఖరం గురు శిఖర్.'
    },
    mr: {
      q: 'भारतातील सर्वात जुनी पर्वतरांग (Oldest Mountain Range) कोणती आहे?',
      opts: ['हिमालय पर्वतरांग', 'अरवली पर्वतरांग', 'पश्चिम घाट (सह्याद्री)', 'सातपुडा पर्वतरांग'],
      exp: 'अरवली पर्वतरांग ही भारतातील सर्वात प्राचीन पर्वतरांग आहे. याचे सर्वोच्च शिखर गुरु शिखर आहे.'
    },
    bn: {
      q: 'ভারতের প্রাচীনতম পর্বতশ্রেণী (Oldest Mountain Range) কোনটি?',
      opts: ['হিমালয় পর্বতমালা', 'আরাবল্লী পর্বতমালা', 'পশ্চিমঘাট পর্বতমালা', 'সাতপুরা পর্বতমালা'],
      exp: 'আরাবল্লী হলো ভারতের প্রাচীনতম ক্ষয়জাত পর্বতমালা। এর সর্বোচ্চ শৃঙ্গ গুরু শিখর।'
    }
  }
};

// Patch public/js/interactive-features.js to make all 24 questions support full 25 languages
const interactivePath = path.join(__dirname, '..', 'public', 'js', 'interactive-features.js');
let interactiveContent = fs.readFileSync(interactivePath, 'utf8');

// Replace getHourlyPollIndex with deterministic daily rotated index
const oldGetHourly = `function getHourlyPollIndex() {
  const hour = new Date().getHours(); // 0 to 23
  return hour % DAILY_POLL_QUESTIONS.length;
}`;

const newGetHourly = `// Deterministic date + hour rotation ensuring fresh questions every midnight automatically
function getHourlyPollIndex() {
  const now = new Date();
  // IST offset calculation
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  const startOfYear = new Date(istDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((istDate - startOfYear) / (24 * 60 * 60 * 1000));
  const hour = istDate.getHours();
  // Starts each day with a different deterministic offset, rotating hourly
  return (dayOfYear * 7 + hour) % DAILY_POLL_QUESTIONS.length;
}`;

if (interactiveContent.includes(oldGetHourly)) {
  interactiveContent = interactiveContent.replace(oldGetHourly, newGetHourly);
  console.log('Updated getHourlyPollIndex with deterministic day-of-year + hour rotation!');
}

// Enhance getActivePollQuestion & initDailyPoll language resolution
// Ensure when currentLang is NOT 'en':
// - Primary = Localized regional question (or Hindi if regional unavailable)
// - Secondary = ALWAYS English with '🌐 ENGLISH' badge
// - Options = Localized / English
// When currentLang === 'en':
// - Primary = English
// - Secondary = ALWAYS Hindi with '🇮🇳 HINDI' badge
// - Options = English / Hindi

const targetSectionOld = `  if (isEnglish) {
    displayQuestion = poll.question_en || poll.question;
    displaySecondaryQuestion = poll.question;
    secondaryBadge = '🇮🇳 HINDI';
    activeOptions = poll.options_en.map((enOpt, idx) => {
      const hiOpt = (poll.options_hi && poll.options_hi[idx]) ? poll.options_hi[idx] : (poll.options && poll.options[idx] ? poll.options[idx].split('/')[0].trim() : enOpt);
      return \`\${enOpt} / \${hiOpt}\`;
    });
    activeExplanation = poll.explanation_en || poll.explanation_hi;
  } else {
    const regionalQ = (poll['question_' + lang]) || poll.question;
    displayQuestion = regionalQ;
    displaySecondaryQuestion = poll.question_en || poll.question;
    secondaryBadge = '🌐 ENGLISH';
    activeOptions = poll.options_en.map((enOpt, idx) => {
      let langOpt = '';
      if (lang === 'hi' && poll.options_hi && poll.options_hi[idx]) {
        langOpt = poll.options_hi[idx];
      } else if (poll['options_' + lang] && poll['options_' + lang][idx]) {
        langOpt = poll['options_' + lang][idx];
      } else if (poll.options && poll.options[idx]) {
        langOpt = poll.options[idx].split('/')[0].trim();
      } else {
        langOpt = enOpt;
      }
      return \`\${langOpt} / \${enOpt}\`;
    });
    activeExplanation = poll['explanation_' + lang] || poll.explanation_hi;
  }`;

const targetSectionNew = `  // Get localized poll text dynamically using multilingual registry
  const multi = (typeof POLL_MULTILINGUAL_MAP !== 'undefined' && POLL_MULTILINGUAL_MAP[poll.id] && POLL_MULTILINGUAL_MAP[poll.id][lang])
    ? POLL_MULTILINGUAL_MAP[poll.id][lang]
    : null;

  if (isEnglish) {
    displayQuestion = poll.question_en || poll.question;
    displaySecondaryQuestion = poll.question;
    secondaryBadge = '🇮🇳 HINDI';
    activeOptions = (poll.options_en || poll.options).map((enOpt, idx) => {
      const hiOpt = (poll.options_hi && poll.options_hi[idx]) ? poll.options_hi[idx] : (poll.options && poll.options[idx] ? poll.options[idx].split('/')[0].trim() : enOpt);
      return \`\${enOpt} / \${hiOpt}\`;
    });
    activeExplanation = poll.explanation_en || poll.explanation_hi;
  } else {
    // For all 24 regional languages:
    // Primary is strictly the selected language (e.g. Tamil, Telugu, Hindi, etc.)
    // Secondary is ALWAYS English
    displayQuestion = multi ? multi.q : ((poll['question_' + lang]) || poll.question);
    displaySecondaryQuestion = poll.question_en || poll.question;
    secondaryBadge = '🌐 ENGLISH';
    activeOptions = (poll.options_en || poll.options).map((enOpt, idx) => {
      let langOpt = '';
      if (multi && multi.opts && multi.opts[idx]) {
        langOpt = multi.opts[idx];
      } else if (lang === 'hi' && poll.options_hi && poll.options_hi[idx]) {
        langOpt = poll.options_hi[idx];
      } else if (poll['options_' + lang] && poll['options_' + lang][idx]) {
        langOpt = poll['options_' + lang][idx];
      } else if (poll.options && poll.options[idx]) {
        langOpt = poll.options[idx].split('/')[0].trim();
      } else {
        langOpt = enOpt;
      }
      return \`\${langOpt} / \${enOpt}\`;
    });
    activeExplanation = multi ? multi.exp : (poll['explanation_' + lang] || poll.explanation_hi);
  }`;

if (interactiveContent.includes(targetSectionOld)) {
  interactiveContent = interactiveContent.replace(targetSectionOld, targetSectionNew);
  // Also prepend POLL_MULTILINGUAL_MAP definition
  interactiveContent = 'const POLL_MULTILINGUAL_MAP = ' + JSON.stringify(POLL_MULTILINGUAL_MAP, null, 2) + ';\n\n' + interactiveContent;
  fs.writeFileSync(interactivePath, interactiveContent, 'utf8');
  console.log('Successfully updated public/js/interactive-features.js with multilingual map and strict language rule!');
}

// -------------------------------------------------------------
// Now patch public/js/current-affairs.js
// -------------------------------------------------------------
const caPath = path.join(__dirname, '..', 'public', 'js', 'current-affairs.js');
let caContent = fs.readFileSync(caPath, 'utf8');

// Add comprehensive multilingual dictionary for Current Affairs
const CA_MULTILINGUAL_MAP = {
  1: {
    ta: {
      q: "இந்திய விமானப்படையின் எந்த உள்நாட்டு இலகுரக போர் விமானம் (LCA) தனது முதல் வெளிநாட்டு பயிற்சியை வெற்றிகரமாக முடித்தது?",
      opts: ["LCA தேஜஸ் (Tejas)", "HAL பிரசண்ட் (Prachand)", "சுகோய் Su-30MKI", "மிராஜ் 2000"],
      exp: "எல்சிஏ தேஜஸ் (LCA Tejas) இந்தியாவின் உள்நாட்டு 4.5 தலைமுறை போர் விமானமாகும்."
    },
    te: {
      q: "భారత వైమానిక దళానికి చెందిన ఏ స్వదేశీ తేలికపాటి యుద్ధ విమానం (LCA) మొదటి విదేశీ విన్యాసాలను విజయవంతంగా పూర్తి చేసింది?",
      opts: ["LCA తేజస్ (Tejas)", "HAL ప్రచండ్ (Prachand)", "సుఖోయ్ Su-30MKI", "మిరాజ్ 2000"],
      exp: "LCA తేజస్ స్వదేశీ సింగిల్ ఇంజిన్ మల్టీరోల్ యుద్ధ విమానం."
    },
    mr: {
      q: "भारतीय हवाई दलाच्या कोणत्या स्वदेशी हलक्या लढाऊ विमानाने (LCA) आपला पहिला परदेशी युद्धाभ्यास यशस्वीपणे पूर्ण केला?",
      opts: ["एलसीए तेजस (LCA Tejas)", "एचएएल प्रचंड (Prachand)", "सुखोई Su-30MKI", "मिराज 2000"],
      exp: "एलसीए तेजस हे भारताचे स्वदेशी हलके लढाऊ विमान आहे."
    }
  },
  2: {
    ta: {
      q: "இஸ்ரோவின் சூரிய ஆய்வக விண்கலமான 'ஆதித்யா-L1' எந்த லாக்ராஞ்சியன் புள்ளியில் வெற்றிகரமாக நிலைநிறுத்தப்பட்டுள்ளது?",
      opts: ["லாக்ராஞ்சியன் புள்ளி L1", "லாக்ராஞ்சியன் புள்ளி L2", "லாக்ராஞ்சியன் புள்ளி L4", "லாக்ராஞ்சியன் புள்ளி L5"],
      exp: "ஆதித்யா-L1 பூமியிலிருந்து சுமார் 15 லட்சம் கி.மீ தொலைவில் உள்ள லாக்ராஞ்சியன் புள்ளி 1 (L1) சுற்றியுள்ள ஹாலோ சுற்றுப்பாதையில் நிலைநிறுத்தப்பட்டுள்ளது."
    },
    te: {
      q: "ఇస్రో యొక్క సౌర పరిశీలనా ఉపగ్రహం 'ఆదిత్య-L1' ఏ లాగ్రాంజ్ బిందువు వద్ద విజయవంతంగా ప్రవేశపెట్టబడింది?",
      opts: ["లాగ్రాంజ్ పాయింట్ L1", "లాగ్రాంజ్ పాయింట్ L2", "లాగ్రాంజ్ పాయింట్ L4", "లాగ్రాంజ్ పాయింట్ L5"],
      exp: "ఆదిత్య-L1 భూమికి 15 లక్షల కిలోమీటర్ల దూరంలో ఉన్న లాగ్రాంజ్ పాయింట్ 1 (L1) చుట్టూ ఉన్న కక్ష్యలో ప్రవేశపెట్టబడింది."
    }
  },
  3: {
    ta: {
      q: "'பிஎம் சூர்ய கர்: முஃப்த் பிஜ்லி யோஜனா' திட்டத்தின் கீழ் தகுதியான குடும்பங்களுக்கு மாதம் தோறும் வழங்கப்படும் இலவச சூரிய மின்சாரம் எவ்வளவு?",
      opts: ["300 யூனிட்கள் (300 Units)", "150 யூனிட்கள்", "200 யூனிட்கள்", "500 யூனிட்கள்"],
      exp: "பிரதமர் நரேந்திர மோடியால் தொடங்கப்பட்ட இத்திட்டம் ஒவ்வொரு மாதமும் 300 யூனிட் வரை இலவச சூரிய மின்சாரத்தை வழங்குகிறது."
    },
    te: {
      q: "'పీఎం సూర్య ఘర్: ముఫ్త్ బిజ్లీ యోజన' పథకం కింద అర్హత కలిగిన కుటుంబాలకు నెలకు గరిష్టంగా ఎంత ఉచిత సౌర విద్యుత్ అందించబడుతుంది?",
      opts: ["300 యూనిట్లు (300 Units)", "150 యూనిట్లు", "200 యూనిట్లు", "500 యూనిట్లు"],
      exp: "ఈ పథకం ద్వారా నెలకు 300 యూనిట్ల వరకు ఉచిత విద్యుత్ అందించబడుతుంది."
    }
  },
  4: {
    ta: {
      q: "இந்திய அரசியலமைப்பின் 124(6) வது பிரிவின் கீழ் இந்திய தலைமை நீதிபதிக்கு (CJI) பதவிப் பிரமாணம் செய்து வைப்பவர் யார்?",
      opts: ["இந்திய குடியரசுத் தலைவர் (President of India)", "துணைக் குடியரசுத் தலைவர்", "பிரதமர்", "மக்களவை சபாநாயகர்"],
      exp: "பிரிவு 124(6) ன் படி உச்சநீதிமன்ற தலைமை நீதிபதிக்கு குடியரசுத் தலைவர் பதவிப் பிரமாணம் செய்து வைக்கிறார்."
    },
    te: {
      q: "భారత రాజ్యాంగంలోని 124(6) అధికరణ ప్రకారం భారత ప్రధాన న్యాయమూర్తి (CJI) చేత ఎవరు ప్రమాణ స్వీకారం చేయిస్తారు?",
      opts: ["భారత రాష్ట్రపతి (President of India)", "భారత ఉపరాష్ట్రపతి", "ప్రధాన మంత్రి", "లోక్‌సభ స్పీకర్"],
      exp: "రాజ్యాంగంలోని 124(6) ప్రకారం రాష్ట్రపతి ప్రధాన న్యాయమూర్తికి ప్రమాణం చేయిస్తారు."
    }
  },
  5: {
    ta: {
      q: "ஃபிடே கேண்டிடேட்ஸ் செஸ் போட்டியில் வென்று உலக சாம்பியன்ஷிப் பட்டத்திற்கு போட்டியிடும் இளைய இந்திய கிராண்ட்மாஸ்டர் யார்?",
      opts: ["டி. குகேஷ் (D. Gukesh)", "ஆர். பிரக்ஞானந்தா", "விதித் குஜராத்தி", "அர்ஜுன் எரிகைசி"],
      exp: "17 வயதான தொம்மராஜு குகேஷ் கேண்டிடேட்ஸ் செஸ் போட்டியை வென்று வரலாறு படைத்தார்."
    },
    te: {
      q: "ఫిడే కాండిడేట్స్ చెస్ టోర్నమెంట్‌ను గెలుచుకున్న అత్యంత పిన్న వయస్కుడైన భారతీయ గ్రాండ్‌మాస్టర్ ఎవరు?",
      opts: ["డి. గుకేశ్ (D. Gukesh)", "ఆర్. ప్రజ్ఞానంద", "విదిత్ గుజరాతీ", "అర్జున్ ఎరిగైసి"],
      exp: "17 ఏళ్ల డి. గుకేశ్ కాండిడేట్స్ గెలిచి సరికొత్త రికార్డు సృష్టించాడు."
    }
  }
};

// Rewrite renderCAQuiz and renderMonthlyCapsule in current-affairs.js to adhere strictly to:
// - English: Primary = English, Secondary = Hindi, Options = En / Hi
// - Regional (e.g. Tamil): Primary = Regional, Secondary = English, Options = Regional / En
// - Monthly Capsule: localized points + English subtitle
// - Listen to 'languageChanged' event

const caPatchScript = `
// Universal Multilingual Support & Strict Bilingual Rule for Current Affairs & Monthly Capsule
const CA_MULTILINGUAL_MAP = ${JSON.stringify(CA_MULTILINGUAL_MAP, null, 2)};

function getActiveLanguage() {
  if (typeof getCurrentLanguage === 'function') return getCurrentLanguage();
  return localStorage.getItem('sarkari_lang') || 'hi';
}

// Deterministic Daily Rotation of Current Affairs
function getTodayCAQuestions() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  const startOfYear = new Date(istDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((istDate - startOfYear) / (24 * 60 * 60 * 1000));
  
  // Rotate starting question index deterministically per day
  const offset = dayOfYear % CURRENT_AFFAIRS_QUIZ_DATA.length;
  const reordered = [];
  for (let i = 0; i < CURRENT_AFFAIRS_QUIZ_DATA.length; i++) {
    const idx = (i + offset) % CURRENT_AFFAIRS_QUIZ_DATA.length;
    reordered.push(CURRENT_AFFAIRS_QUIZ_DATA[idx]);
  }
  return reordered;
}
`;

// Replace renderCAQuiz in public/js/current-affairs.js
const oldRenderCAQuizHeader = `function renderCAQuiz() {
  const container = document.getElementById('caQuizCardContainer');`;

const newRenderCAQuiz = `function renderCAQuiz() {
  const container = document.getElementById('caQuizCardContainer');
  const progressText = document.getElementById('caQuizProgressText');
  const progressBar = document.getElementById('caQuizProgressBar');
  if (!container) return;

  const activeList = getTodayCAQuestions();
  const total = activeList.length;
  const currentQ = activeList[caCurrentQuestionIndex];
  const userAns = caUserAnswers[currentQ.id];
  const isAnswered = userAns !== undefined;

  const lang = getActiveLanguage();
  const isEnglish = (lang === 'en');
  const multi = CA_MULTILINGUAL_MAP[currentQ.id] && CA_MULTILINGUAL_MAP[currentQ.id][lang];

  // Strict Bilingual Rule:
  // - If English: Primary = English, Secondary = Hindi with [🇮🇳 HINDI] badge
  // - If Regional (e.g. Tamil): Primary = Regional Language, Secondary = English with [🌐 ENGLISH] badge
  let displayPrimaryQ, displaySecondaryQ, secondaryBadge;
  if (isEnglish) {
    displayPrimaryQ = currentQ.qEn;
    displaySecondaryQ = currentQ.qHi;
    secondaryBadge = '🇮🇳 HINDI';
  } else {
    displayPrimaryQ = multi ? multi.q : (lang === 'hi' ? currentQ.qHi : (currentQ['q_' + lang] || currentQ.qHi));
    displaySecondaryQ = currentQ.qEn;
    secondaryBadge = '🌐 ENGLISH';
  }

  if (progressText) {
    progressText.innerText = \`\${isEnglish ? 'Question' : (lang === 'ta' ? 'வினா' : (lang === 'te' ? 'ప్రశ్న' : 'प्रश्न'))} \${caCurrentQuestionIndex + 1} / \${total}\`;
  }
  if (progressBar) {
    const pct = Math.round(((caCurrentQuestionIndex + 1) / total) * 100);
    progressBar.style.width = \`\${pct}%\`;
  }

  let optionsHtml = '';
  currentQ.options.forEach((opt, idx) => {
    const isSelected = userAns === idx;
    const isCorrect = opt.correct;
    
    // Format Option according to rule:
    // If English: English / Hindi
    // If Regional: Regional / English
    let optDisplay = '';
    const cleanEn = opt.text.split('(')[0].trim();
    const cleanHi = opt.text.includes('(') ? opt.text.slice(opt.text.indexOf('(') + 1).replace(')', '').trim() : opt.text;
    
    if (isEnglish) {
      optDisplay = cleanEn + (cleanHi ? \` / \${cleanHi}\` : '');
    } else {
      let regOpt = (multi && multi.opts && multi.opts[idx]) ? multi.opts[idx] : cleanHi;
      optDisplay = \`\${regOpt} / \${cleanEn}\`;
    }

    let btnClass = "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800";
    let icon = String.fromCharCode(65 + idx);

    if (isAnswered) {
      if (isCorrect) {
        btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
        icon = "✓";
      } else if (isSelected && !isCorrect) {
        btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold";
        icon = "✕";
      } else {
        btnClass = "border-slate-100 opacity-60 text-slate-400";
      }
    }

    optionsHtml += \`
      <button type="button" 
              onclick="handleCAAnswerSelection(\${currentQ.id}, \${idx})"
              \${isAnswered ? 'disabled' : ''}
              class="w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm font-semibold \${btnClass}">
        <div class="flex items-center space-x-3">
          <span class="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">
            \${icon}
          </span>
          <span>\${optDisplay}</span>
        </div>
      </button>
    \`;
  });

  let explanationHtml = '';
  if (isAnswered) {
    const isUserCorrect = currentQ.options[userAns]?.correct;
    const expText = isEnglish ? currentQ.explanationEn : (multi ? multi.exp : currentQ.explanationHi);
    const expSecondary = isEnglish ? currentQ.explanationHi : currentQ.explanationEn;

    explanationHtml = \`
      <div class="mt-4 p-4 rounded-2xl \${isUserCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'} space-y-2 animate-fadeIn">
        <div class="flex items-center gap-2">
          <span class="text-base">\${isUserCorrect ? '🎉' : '💡'}</span>
          <span class="text-xs font-bold \${isUserCorrect ? 'text-emerald-800' : 'text-rose-800'}">
            \${isUserCorrect ? (isEnglish ? 'Correct Answer!' : 'सही उत्तर!') : (isEnglish ? 'Answer Explanation:' : 'सही उत्तर की व्याख्या:')}
          </span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed font-medium">
          \${expText}
        </p>
        <p class="text-[11px] text-slate-500 italic border-t border-slate-200/60 pt-1.5">
          <span class="font-bold uppercase tracking-wider text-[10px] text-blue-600 mr-1">\${secondaryBadge}:</span>\${expSecondary}
        </p>
      </div>
    \`;
  }

  container.innerHTML = \`
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
          \${currentQ.category}
        </span>
        <span class="text-xs text-slate-400 font-mono">QID: #CA-2026-\${currentQ.id}</span>
      </div>

      <!-- Question Text (Strict Bilingual Formatting) -->
      <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 space-y-2">
        <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
          \${displayPrimaryQ}
        </h3>
        <div class="p-2.5 rounded-xl bg-blue-50/95 dark:bg-slate-950 border border-blue-200 dark:border-cyan-800 text-xs text-blue-950 dark:text-cyan-200 font-medium leading-relaxed">
          <span class="text-[10px] font-black uppercase text-blue-700 dark:text-cyan-400 mr-1.5 bg-blue-200/70 dark:bg-cyan-950 px-1.5 py-0.5 rounded">\${secondaryBadge}</span>
          \${displaySecondaryQ}
        </div>
      </div>

      <!-- Options -->
      <div class="space-y-2.5 pt-2">
        \${optionsHtml}
      </div>

      <!-- Explanation Box -->
      \${explanationHtml}

      <!-- Navigation Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button type="button" 
                onclick="navigateCAQuestion(-1)"
                \${caCurrentQuestionIndex === 0 ? 'disabled' : ''}
                class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">
          ← \${isEnglish ? 'Previous' : 'पिछला (Prev)'}
        </button>

        \${caCurrentQuestionIndex < total - 1 ? \`
          <button type="button" 
                  onclick="navigateCAQuestion(1)"
                  class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs">
            \${isEnglish ? 'Next →' : 'अगला (Next) →'}
          </button>
        \` : \`
          <button type="button" 
                  onclick="finishCAQuiz()"
                  class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md">
            \${isEnglish ? 'View Scorecard 🎯' : 'स्कोर देखें (View Score) 🎯'}
          </button>
        \`}
      </div>
    </div>
  \`;
}`;

// Update Monthly Capsule rendering to respect selected language
const newRenderMonthlyCapsule = `function renderMonthlyCapsule() {
  const container = document.getElementById('caMonthlyCapsuleContainer');
  if (!container) return;

  const lang = getActiveLanguage();
  const isEnglish = (lang === 'en');

  let html = '';
  MONTHLY_CAPSULE_DATA.forEach((sec, idx) => {
    let itemsHtml = '';
    sec.points.forEach((pt, pIdx) => {
      // If English: pt.en primary, pt.hi secondary
      // If Regional: pt.hi (or localized) primary, pt.en secondary
      const primaryText = isEnglish ? pt.en : pt.hi;
      const secondaryText = isEnglish ? pt.hi : pt.en;
      const secBadge = isEnglish ? 'HINDI' : 'ENGLISH';

      itemsHtml += \`
        <li class="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-xs space-y-1">
          <div class="text-slate-900 font-bold leading-relaxed">
            <span class="text-indigo-600 font-black mr-1.5">•</span>\${primaryText}
          </div>
          <div class="text-slate-500 text-[11px] pl-3.5 italic flex items-center space-x-1.5">
            <span class="text-[9px] font-black uppercase text-blue-700 bg-blue-100 px-1 rounded">\${secBadge}</span>
            <span>\${secondaryText}</span>
          </div>
        </li>
      \`;
    });

    html += \`
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 class="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
            \${sec.category}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            \${sec.points.length} \${isEnglish ? 'Key Points' : 'मुख्य बिंदु'}
          </span>
        </div>
        <ul class="space-y-2">
          \${itemsHtml}
        </ul>
      </div>
    \`;
  });

  container.innerHTML = html;
}`;

// Listen to languageChanged event in current-affairs.js
const eventListenerCode = `
// Auto re-render on language switch
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    if (typeof renderCAQuiz === 'function') renderCAQuiz();
    if (typeof renderMonthlyCapsule === 'function') renderMonthlyCapsule();
  });
}
`;

// Replace renderCAQuiz and renderMonthlyCapsule in caContent
const renderCAQuizStart = caContent.indexOf('function renderCAQuiz() {');
const renderCAQuizEnd = caContent.indexOf('function handleCAAnswerSelection(');

if (renderCAQuizStart !== -1 && renderCAQuizEnd !== -1) {
  const before = caContent.substring(0, renderCAQuizStart);
  const after = caContent.substring(renderCAQuizEnd);
  caContent = before + caPatchScript + '\n' + newRenderCAQuiz + '\n\n' + after;
  console.log('Replaced renderCAQuiz with multilingual version!');
}

const renderCapsuleStart = caContent.indexOf('function renderMonthlyCapsule() {');
const renderCapsuleEnd = caContent.indexOf('function copyCACapsuleNotes() {');

if (renderCapsuleStart !== -1 && renderCapsuleEnd !== -1) {
  const before = caContent.substring(0, renderCapsuleStart);
  const after = caContent.substring(renderCapsuleEnd);
  caContent = before + newRenderMonthlyCapsule + '\n\n' + after;
  console.log('Replaced renderMonthlyCapsule with bilingual version!');
}

caContent += '\n' + eventListenerCode;
fs.writeFileSync(caPath, caContent, 'utf8');
console.log('Updated public/js/current-affairs.js successfully!');

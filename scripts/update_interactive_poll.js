const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'js', 'interactive-features.js');
let code = fs.readFileSync(filePath, 'utf8');

// The 11 additional locales for POLL_I18N
const additionalLocales = `  as: {
    title: 'আজিৰ প্ৰশ্ন আৰু লাইভ কমিউনিটি পোল',
    sub: 'সমগ্ৰ দেশৰ ছাত্ৰ-ছাত্ৰীৰ সৈতে লাইভ ভোট আৰু প্ৰস্তুতি',
    liveVote: 'লাইভ ভোট',
    qLabel: 'এই ঘণ্টাৰ গুৰুত্বপূৰ্ণ প্ৰশ্ন:',
    prev: 'পূৰ্বৱৰ্তী',
    next: 'পৰৱৰ্তী',
    qNum: 'প্ৰশ্ন',
    hourlyNotice: 'এই প্ৰশ্ন প্ৰতি ঘণ্টাত সলনি হয় (বা সকলো ২৪টা প্ৰশ্ন অনুশীলন কৰিবলৈ পূৰ্বৱৰ্তী/পৰৱৰ্তী টিপক)!',
    correctBadge: 'সঠিক উত্তৰ',
    yourChoice: 'আপোনাৰ পছন্দ',
    correctMsg: '🎉 উৎকৃষ্ট! আপোনাৰ উত্তৰ ১০০% সঠিক!',
    wrongPrefix: '💡 সঠিক উত্তৰ বিকল্প ',
    totalParticipants: 'মুঠ অংশগ্ৰহণকাৰী: ',
    aspirants: 'পৰীক্ষাৰ্থী',
    retest: '🔄 পুনৰ পৰীক্ষা',
    nextBtn: 'পৰৱৰ্তী প্ৰশ্ন ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mai: {
    title: 'आबूक सवाल एवं लाइव कम्युनिटी पोल',
    sub: 'देश भरिक छात्रक संग लाइव वोट आ तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'एहि घंटाक महत्वपूर्ण प्रश्न:',
    prev: 'पाछिला',
    next: 'अगिला',
    qNum: 'प्रश्न',
    hourlyNotice: 'ई सवाल प्रति घंटा बदलैत अछि (वा सभ 24 प्रश्न लेल पाछिला/अगिला दबाउ)!',
    correctBadge: 'सटीक उत्तर',
    yourChoice: 'अहाँक उत्तर',
    correctMsg: '🎉 बहुत नीक! अहाँक उत्तर 100% सही अछि!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल प्रतिभागी: ',
    aspirants: 'छात्र',
    retest: '🔄 पुनः प्रयास करू',
    nextBtn: 'अगिला प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  bho: {
    title: 'आज के सवाल आ लाइव कम्युनिटी पोल',
    sub: 'सभ देस के लईकन संगे लाइव वोट आ तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'एह घंटा के खास सवाल:',
    prev: 'पिछला',
    next: 'अगिला',
    qNum: 'सवाल',
    hourlyNotice: 'ई सवाल हर घंटा बदले ला (या सभे 24 सवाल खातिर पिछला/अगिला दबाईं)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'रउआ के जवाब',
    correctMsg: '🎉 बहुत बढ़िया! रउआ के जवाब 100% सही बा!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'छात्र',
    retest: '🔄 दोबारा दीं',
    nextBtn: 'अगिला सवाल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ne: {
    title: 'आजको प्रश्न र प्रत्यक्ष सामुदायिक पोल',
    sub: 'देशभरिका विद्यार्थीहरूसँग प्रत्यक्ष भोट र तयारी',
    liveVote: 'प्रत्यक्ष भोट',
    qLabel: 'यस घण्टाको महत्वपूर्ण प्रश्न:',
    prev: 'अघिल्लो',
    next: 'अर्को',
    qNum: 'प्रश्न',
    hourlyNotice: 'यो प्रश्न हरेक घण्टा परिवर्तन हुन्छ (वा सबै २४ प्रश्नहरू हल गर्न अघिल्लो/अर्को थिच्नुहोस्)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'तपाईंको छनोट',
    correctMsg: '🎉 उत्कृष्ट! तपाईंको उत्तर १००% सही छ!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल सहभागी: ',
    aspirants: 'विद्यार्थीहरू',
    retest: '🔄 पुनः प्रयास गर्नुहोस्',
    nextBtn: 'अर्को प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  kok: {
    title: 'आयचो प्रस्न आनी थेट कम्युनिटी पोल',
    sub: 'देशांतल्या विद्यार्थ्यां वांगडा थेट वोट आनी तयारी',
    liveVote: 'थेट वोट',
    qLabel: 'ह्या वराचो मुखेल प्रस्न:',
    prev: 'फाटलो',
    next: 'फुडलो',
    qNum: 'प्रस्न',
    hourlyNotice: 'हो प्रस्न दर वराक बदलता (वा सगळे २४ प्रस्न सोडवपाक फाटलो/फुडलो दाबात)!',
    correctBadge: 'योग्य जाप',
    yourChoice: 'तुमची निवड',
    correctMsg: '🎉 बरोच बरो! तुमची जाप १००% खरी आसा!',
    wrongPrefix: '💡 खरी जाप पर्याय ',
    totalParticipants: 'एकूण वांटेकार: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 परत सोडयात',
    nextBtn: 'फुडलो प्रस्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sd: {
    title: 'اڄوڪو سوال ۽ لائيو ڪميونٽي پول',
    sub: 'سڄي ملڪ جي اميدوارن سان گڏ لائيو تياري',
    liveVote: 'لائيو ووٽ',
    qLabel: 'هن ڪلاڪ جو اهم سوال:',
    prev: 'پوئتي',
    next: 'اڳتي',
    qNum: 'سوال',
    hourlyNotice: 'هي سوال هر هڪ ڪلاڪ ۾ تبديل ٿيندو آهي (يا سڀ 24 سوال حل ڪرڻ لاءِ اڳتي/پوئتي دٻايو)!',
    correctBadge: 'صحيح جواب',
    yourChoice: 'توهان جي چونڊ',
    correctMsg: '🎉 بهترين! توهان جو جواب 100% صحيح آهي!',
    wrongPrefix: '💡 صحيح جواب آپشن ',
    totalParticipants: 'ڪل شريڪ: ',
    aspirants: 'شاگرد',
    retest: '🔄 وري ڪوشش ڪريو',
    nextBtn: 'اڳيون سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  doi: {
    title: 'अज्जै दा सुआल ते लाइव कम्युनिटी पोल',
    sub: 'पूरे देश दे विद्यार्थियें कन्नै लाइव वोट ते तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'इस घैंटे दा मुक्ख सुआल:',
    prev: 'पिच्छला',
    next: 'अगला',
    qNum: 'सुआल',
    hourlyNotice: 'एह सुआल हर घैंटे बदलदा ऐ (यां सारे 24 सुआलें लेई पिच्छला/अगला दबाओ)!',
    correctBadge: 'सई जवाब',
    yourChoice: 'तुंदी पसंद',
    correctMsg: '🎉 शाबाश! तुंदा जवाब 100% सई ऐ!',
    wrongPrefix: '💡 सई जवाब विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 मुड़ कोशिश करो',
    nextBtn: 'अगला सुआल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ks: {
    title: 'ازک سوال تہ لائیو کمیونٹی پول',
    sub: 'پوری ملکہ کین طالب علمن سیت لائیو ووٹ تہ تیاری',
    liveVote: 'لائیو ووٹ',
    qLabel: 'ام گھنٹک اہم سوال:',
    prev: 'پتھم',
    next: 'برونہم',
    qNum: 'سوال',
    hourlyNotice: 'یہ سوال چھ ہر گھنٹس منز بدلان (یا 24 سوال حل کرن خأطرہ پتھم/برونہم دباو)!',
    correctBadge: 'صحیح جواب',
    yourChoice: 'تہند انتخاب',
    correctMsg: '🎉 واریاہ جان! تہند جواب چھ 100% صحیح!',
    wrongPrefix: '💡 صحیح جواب چھ آپشن ',
    totalParticipants: 'کل شرکاء: ',
    aspirants: 'طالب علم',
    retest: '🔄 دوبار کوشش کریو',
    nextBtn: 'برونہم سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sat: {
    title: 'ᱛᱮᱦᱮᱧᱟᱜ ᱠᱩᱠᱞᱤ ᱟᱨ ᱞᱟᱭᱤᱵᱽ ᱯᱳᱞ',
    sub: 'ᱫᱤᱥᱚᱢ ᱡᱟᱠᱟᱛ ᱨᱤᱱ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱶ ᱞᱟᱭᱤᱵᱽ ᱵᱷᱳᱴ',
    liveVote: 'ᱞᱟᱭᱤᱵᱽ ᱵᱷᱳᱴ',
    qLabel: 'ᱱᱚᱣᱟ ᱴᱟᱲᱟᱝ ᱨᱮᱭᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱩᱠᱞᱤ:',
    prev: 'ᱛᱟᱭᱚᱢ',
    next: 'ᱞᱟᱦᱟ',
    qNum: 'ᱠᱩᱠᱞᱤ',
    hourlyNotice: 'ᱱᱚᱣᱟ ᱠᱩᱠᱞᱤ ᱫᱚ ᱴᱟᱲᱟᱝ ᱯᱤᱪᱷᱤ ᱵᱚᱫᱚᱞᱚᱜᱼᱟ (ᱥᱮ ᱡᱚᱛᱚ ᱒᱔ ᱠᱩᱠᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱦᱟ/ᱛᱟᱭᱚᱢ ᱚᱛᱟᱭ ᱢᱮ)!',
    correctBadge: 'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ',
    yourChoice: 'ᱟᱢᱟᱜ ᱵᱟᱪᱷᱟᱣ',
    correctMsg: '🎉 ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱢᱟᱜ ᱛᱮᱞᱟ ᱫᱚ ᱑᱐᱐% ᱥᱟᱹᱨᱤ ᱜᱮᱭᱟ!',
    wrongPrefix: '💡 ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ ᱫᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱚᱯᱥᱚᱱ ',
    totalParticipants: 'ᱢᱩᱴ ᱥᱮᱞᱮᱫᱤᱭᱟᱹ: ',
    aspirants: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
    retest: '🔄 ᱫᱚᱦᱲᱟ ᱮᱢ',
    nextBtn: 'ᱞᱟᱦᱟ ᱠᱩᱠᱞᱤ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  brx: {
    title: "दिनैनि सोंथि आरो लाइभ कम्यूनिटि पल",
    sub: "गासै हादोरनि फरायसुलाफोरजों लाइभ भट आरो थियारी",
    liveVote: 'लाइभ भट',
    qLabel: "बे घन्टानि गोनांथार सोंथि:",
    prev: 'सिगांनि',
    next: 'उनाव',
    qNum: 'सोंथि',
    hourlyNotice: "बे सोंथिया घन्टाफ्राम सोलायो (एबा गासै २४ सोंथिनि थाखाय सिगांनि/उनाव थु)! ",
    correctBadge: 'थार फिननाय',
    yourChoice: 'नोंनि सायखनाय',
    correctMsg: "🎉 जोबोर मोजां! नोंनि फिननाया १००% थार!",
    wrongPrefix: '💡 थार फिननाय पसन्द ',
    totalParticipants: 'गासै बाहागो लानाय: ',
    aspirants: 'फरायसुला',
    retest: '🔄 फिन नाजा',
    nextBtn: 'उनाव सोंथि ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mni: {
    title: 'ꯉꯁꯤꯒꯤ ꯋꯥꯍꯪ ꯑꯃꯁꯨꯡ ꯂꯥꯏꯚ ꯀꯃ꯭ꯌꯨꯅꯤꯇꯤ ꯄꯣꯜ',
    sub: 'ꯂꯩꯕꯥꯛ ꯁꯤꯅꯕ ꯊꯨꯡꯅꯥ ꯂꯩꯕ ꯃꯍꯩꯔꯣꯏꯁꯤꯡꯒ ꯂꯣꯏꯅꯅ ꯁꯦꯝ ꯁꯥꯕ',
    liveVote: 'ꯂꯥꯏꯚ ꯚꯣꯠ',
    qLabel: 'ꯄꯨꯡꯐꯝ ꯑꯁꯤꯒꯤ ꯃꯔꯨꯑꯣꯏꯕ ꯋꯥꯍꯪ:',
    prev: 'ꯃꯃꯥꯡ',
    next: 'ꯃꯊꯪ',
    qNum: 'ꯋꯥꯍꯪ',
    hourlyNotice: 'ꯋꯥꯍꯪ ꯑꯁꯤ ꯄꯨꯡ ꯈꯨꯗꯤꯡꯒꯤ ꯍꯣꯡꯏ (ꯅꯠꯇ꯭ꯔꯒ ꯋꯥꯍꯪ ꯲꯴ ꯄꯨꯝꯅꯃꯛ ꯍꯣꯠꯅꯅꯕ ꯃꯃꯥꯡ/ꯃꯊꯪ ꯅꯃꯕꯤꯌꯨ)!',
    correctBadge: 'ꯆꯨꯝꯂꯕ ꯄꯥꯎꯈꯨꯝ',
    yourChoice: 'ꯅꯍꯥꯛꯀꯤ ꯈꯟꯕ',
    correctMsg: '🎉 ꯌꯥꯝꯅ ꯐꯔꯦ! ꯅꯍꯥꯛꯀꯤ ꯄꯥꯎꯈꯨꯝ ꯑꯁꯤ ꯱꯰꯰% ꯆꯨꯝꯃꯤ!',
    wrongPrefix: '💡 ꯆꯨꯝꯂꯕ ꯄꯥꯎꯈꯨꯝ ꯑꯣꯞꯁꯟ ',
    totalParticipants: 'ꯄꯨꯟꯅ ꯌꯥꯎꯔꯤꯕ: ',
    aspirants: 'ꯃꯍꯩꯔꯣꯏ',
    retest: '🔄 ꯑꯃꯨꯛ ꯍꯟꯅ ꯍꯣꯠꯅꯕꯤꯌꯨ',
    nextBtn: 'ꯃꯊꯪ ꯋꯥꯍꯪ ➔',
    secondaryBadge: '🌐 ENGLISH'
  }`;

// Target end of sa locale in POLL_I18N
const saTarget = `    nextBtn: 'अग्रिमः प्रश्नः ➔',
    secondaryBadge: '🌐 ENGLISH'
  }
};`;

const saReplacement = `    nextBtn: 'अग्रिमः प्रश्नः ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
${additionalLocales}
};`;

if (!code.includes(saTarget)) {
  console.error('Could not find saTarget in interactive-features.js');
  process.exit(1);
}

code = code.replace(saTarget, saReplacement);

// Now update initDailyPoll() options and questions logic
const pollLogicTarget = `  if (isEnglish) {
    displayQuestion = poll.question_en || poll.question;
    displaySecondaryQuestion = poll.question;
    secondaryBadge = '🇮🇳 HINDI';
    activeOptions = poll.options_en || poll.options;
    activeExplanation = poll.explanation_en || poll.explanation_hi;
  } else {
    displayQuestion = poll.question;
    displaySecondaryQuestion = poll.question_en;
    secondaryBadge = '🌐 ENGLISH';
    activeOptions = (lang === 'hi' && poll.options_hi) ? poll.options_hi : poll.options;
    activeExplanation = poll.explanation_hi;
  }`;

const pollLogicReplacement = `  if (isEnglish) {
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

if (!code.includes(pollLogicTarget)) {
  console.error('Could not find pollLogicTarget in interactive-features.js');
  process.exit(1);
}

code = code.replace(pollLogicTarget, pollLogicReplacement);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated POLL_I18N and initDailyPoll in interactive-features.js!');

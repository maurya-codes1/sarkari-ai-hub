const fs = require('fs');

const POLL_I18N_CODE = `const POLL_I18N = {
  en: {
    title: 'Live Community Quiz & Daily Poll',
    sub: 'All-India Aspirants Active Hub • Live Voting & Prep',
    liveVote: 'LIVE VOTE',
    qLabel: 'Question of the Hour:',
    prev: 'Prev',
    next: 'Next',
    qNum: 'Q',
    hourlyNotice: 'Question rotates hourly (or click Prev/Next to practice all 24 questions anytime)!',
    correctBadge: 'Correct Answer',
    yourChoice: 'Your Choice',
    correctMsg: '🎉 Excellent! Your answer is 100% correct!',
    wrongPrefix: '💡 Correct Answer is Option ',
    totalParticipants: 'Total Participants: ',
    aspirants: 'Aspirants',
    retest: '🔄 Re-test Question',
    nextBtn: 'Next Question ➔',
    secondaryBadge: '🇮🇳 HINDI'
  },
  hi: {
    title: 'आज का सवाल एवं लाइव कम्युनिटी पोल',
    sub: 'देश भर के छात्रों के साथ लाइव वोट व तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'घंटे का महत्वपूर्ण प्रश्न:',
    prev: 'पिछला',
    next: 'अगला',
    qNum: 'प्रश्न',
    hourlyNotice: 'यह सवाल हर 1 घंटे में स्वतः बदलता है (या आप कभी भी पिछला/अगला दबाकर सभी 24 प्रश्न हल कर सकते हैं)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'आपका जवाब',
    correctMsg: '🎉 शाबाश! आपका जवाब बिल्कुल सही है!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'छात्र',
    retest: '🔄 Re-test (दोबारा दें)',
    nextBtn: 'अगला सवाल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  'hi-latn': {
    title: 'Aaj Ka Sawal & Live Community Poll',
    sub: 'Desh bhar ke students ke saath live vote & prep',
    liveVote: 'LIVE VOTE',
    qLabel: 'Ghante Ka Important Sawal:',
    prev: 'Pichhla',
    next: 'Agla',
    qNum: 'Q',
    hourlyNotice: 'Ye sawal har 1 ghante me badalta hai (ya Prev/Next se sabhi 24 solve karein)!',
    correctBadge: 'Correct Answer',
    yourChoice: 'Aapka Jawab',
    correctMsg: '🎉 Shaabash! Aapka answer 100% correct hai!',
    wrongPrefix: '💡 Sahi Answer Option ',
    totalParticipants: 'Total Participants: ',
    aspirants: 'Students',
    retest: '🔄 Re-test (Dobara dein)',
    nextBtn: 'Agla Sawal ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ta: {
    title: 'நேரலை வினாடி வினா & தினசரி கருத்துக்கணிப்பு',
    sub: 'நாடு முழுவதிலும் உள்ள மாணவர்களுடன் நேரலை தயாரிப்பு',
    liveVote: 'நேரலை வாக்கு',
    qLabel: 'இந்த மணிநேரத்தின் முக்கிய வினா:',
    prev: 'முந்தைய',
    next: 'அடுத்தது',
    qNum: 'வினா',
    hourlyNotice: 'இந்த கேள்வி ஒவ்வொரு மணி நேரமும் மாறுகிறது (அல்லது 24 கேள்விகளையும் பயிற்சி செய்ய முந்தைய/அடுத்ததை அழுத்தவும்)!',
    correctBadge: 'சரியான விடை',
    yourChoice: 'உங்கள் தேர்வு',
    correctMsg: '🎉 அருமை! உங்கள் விடை 100% சரியானது!',
    wrongPrefix: '💡 சரியான விடை விருப்பம் ',
    totalParticipants: 'மொத்த பங்கேற்பாளர்கள்: ',
    aspirants: 'மாணவர்கள்',
    retest: '🔄 மீண்டும் முயற்சி செய்க',
    nextBtn: 'அடுத்த வினா ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  te: {
    title: 'లైవ్ క్విజ్ & రోజువారీ పోల్',
    sub: 'దేశవ్యాప్త అభ్యర్థులతో ప్రత్యక్ష ఓటింగ్ & సాధన',
    liveVote: 'లైవ్ ఓట్',
    qLabel: 'ఈ గంట ముఖ్యమైన ప్రశ్న:',
    prev: 'మునుపటి',
    next: 'తదుపరి',
    qNum: 'ప్రశ్న',
    hourlyNotice: 'ఈ ప్రశ్న ప్రతి గంటకు మారుతుంది (లేదా 24 ప్రశ్నలను ప్రాక్టీస్ చేయడానికి మునుపటి/తదుపరి క్లిక్ చేయండి)!',
    correctBadge: 'సరైన సమాధానం',
    yourChoice: 'మీ ఎంపిక',
    correctMsg: '🎉 అద్భుతం! మీ సమాధానం 100% సరైనది!',
    wrongPrefix: '💡 సరైన సమాధానం ఎంపిక ',
    totalParticipants: 'మొత్తం పాల్గొన్నవారు: ',
    aspirants: 'అభ్యర్థులు',
    retest: '🔄 మళ్లీ ప్రయత్నించండి',
    nextBtn: 'తర్వాతి ప్రశ్న ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mr: {
    title: 'आजचा प्रश्न आणि थेट कम्युनिटी पोल',
    sub: 'देशभरातील विद्यार्थ्यांसह थेट तयारी व मत',
    liveVote: 'थेट मतदान',
    qLabel: 'या तासाचा महत्त्वाचा प्रश्न:',
    prev: 'मागील',
    next: 'पुढील',
    qNum: 'प्रश्न',
    hourlyNotice: 'हा प्रश्न दर तासाला बदलतो (किंवा सर्व 24 प्रश्न सोडवण्यासाठी मागील/पुढील वर क्लिक करा)!',
    correctBadge: 'योग्य उत्तर',
    yourChoice: 'तुमची निवड',
    correctMsg: '🎉 खूप छान! तुमचे उत्तर १००% योग्य आहे!',
    wrongPrefix: '💡 योग्य उत्तर पर्याय ',
    totalParticipants: 'एकूण सहभागी: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 पुन्हा सोडवा',
    nextBtn: 'पुढील प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  bn: {
    title: 'লাইভ কুইজ ও দৈনিক পোল',
    sub: 'দেশজুড়ে পরীক্ষার্থীদের সাথে লাইভ প্রস্তুতি',
    liveVote: 'লাইভ ভোট',
    qLabel: 'এই ঘণ্টার গুরুত্বপূর্ণ প্রশ্ন:',
    prev: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    qNum: 'প্রশ্ন',
    hourlyNotice: 'এই প্রশ্নটি প্রতি ঘণ্টায় পরিবর্তিত হয় (অথবা ২৪টি প্রশ্ন অনুশীলনের জন্য পূর্ববর্তী/পরবর্তী ক্লিক করুন)!',
    correctBadge: 'সঠিক উত্তর',
    yourChoice: 'আপনার পছন্দ',
    correctMsg: '🎉 চমৎকার! আপনার উত্তর ১০০% সঠিক!',
    wrongPrefix: '💡 সঠিক উত্তর অপশন ',
    totalParticipants: 'মোট অংশগ্রহণকারী: ',
    aspirants: 'শিক্ষার্থী',
    retest: '🔄 আবার চেষ্টা করুন',
    nextBtn: 'পরের প্রশ্ন ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  gu: {
    title: 'આજનો પ્રશ્ન અને લાઈવ પોલ',
    sub: 'દેશભરના ઉમેદવારો સાથે લાઈવ તૈયારી',
    liveVote: 'લાઈવ વોટ',
    qLabel: 'આ કલાકનો મહત્વનો પ્રશ્ન:',
    prev: 'પાછલું',
    next: 'આગળ',
    qNum: 'પ્રશ્ન',
    hourlyNotice: 'આ પ્રશ્ન દર કલાકે બદલાય છે (અથવા બધા 24 પ્રશ્નો માટે પાછલું/આગળ ક્લિક કરો)!',
    correctBadge: 'સાચો જવાબ',
    yourChoice: 'તમારી પસંદગી',
    correctMsg: '🎉 ઉત્તમ! તમારો જવાબ ૧૦૦% સાચો છે!',
    wrongPrefix: '💡 સાચો જવાબ વિકલ્પ ',
    totalParticipants: 'કુલ સહભાગીઓ: ',
    aspirants: 'વિદ્યાર્થીઓ',
    retest: '🔄 ફરી પ્રયાસ કરો',
    nextBtn: 'આગળનો પ્રશ્ન ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  kn: {
    title: 'ಲೈವ್ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ದೈನಂದಿನ ಪೋಲ್',
    sub: 'ದೇಶದಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಲೈವ್ ಸಿದ್ಧತೆ',
    liveVote: 'ಲೈವ್ ವೋಟ್',
    qLabel: 'ಈ ಗಂಟೆಯ ಪ್ರಮುಖ ಪ್ರಶ್ನೆ:',
    prev: 'ಹಿಂದಿನ',
    next: 'ಮುಂದಿನ',
    qNum: 'ಪ್ರಶ್ನೆ',
    hourlyNotice: 'ಈ ಪ್ರಶ್ನೆಯು ಪ್ರತಿ ಗಂಟೆಗೆ ಬದಲಾಗುತ್ತದೆ (ಅಥವಾ 24 ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಲು ಹಿಂದಿನ/ಮುಂದಿನ ಕ್ಲಿಕ್ ಮಾಡಿ)!',
    correctBadge: 'ಸರಿಯಾದ ಉತ್ತರ',
    yourChoice: 'ನಿಮ್ಮ ಆಯ್ಕೆ',
    correctMsg: '🎉 ಅದ್ಭುತ! ನಿಮ್ಮ ಉತ್ತರ 100% ಸರಿಯಾಗಿದೆ!',
    wrongPrefix: '💡 ಸರಿಯಾದ ಉತ್ತರ ಆಯ್ಕೆ ',
    totalParticipants: 'ಒಟ್ಟು ಭಾಗವಹಿಸಿದವರು: ',
    aspirants: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
    retest: '🔄 ಮರುಪರೀಕ್ಷೆ',
    nextBtn: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ml: {
    title: 'തത്സമയ ക്വിസും ദൈനംദിന പോളും',
    sub: 'രാജ്യമെമ്പാടുമുള്ള ഉദ്യോഗാർത്ഥികളോടൊപ്പം തത്സമയ പരിശീലനം',
    liveVote: 'തത്സമയ വോട്ട്',
    qLabel: 'ഈ മണിക്കൂറിലെ പ്രധാന ചോദ്യം:',
    prev: 'മുമ്പത്തെ',
    next: 'അടുത്തത്',
    qNum: 'ചോദ്യം',
    hourlyNotice: 'ഈ ചോദ്യം ഓരോ മണിക്കൂറിലും മാറുന്നു (24 ചോദ്യങ്ങളും പരിശീലിക്കാൻ മുമ്പത്തെ/അടുത്തത് ക്ലിക്ക് ചെയ്യുക)!',
    correctBadge: 'ശരിയായ ഉത്തരം',
    yourChoice: 'നിങ്ങളുടെ തെരഞ്ഞെടുപ്പ്',
    correctMsg: '🎉 ഉജ്ജ്വലം! നിങ്ങളുടെ ഉത്തരം 100% ശരിയാണ്!',
    wrongPrefix: '💡 ശരിയായ ഉത്തരം ഓപ്ഷൻ ',
    totalParticipants: 'ആകെ പങ്കെടുത്തവർ: ',
    aspirants: 'വിദ്യാർത്ഥികൾ',
    retest: '🔄 വീണ്ടും ശ്രമിക്കുക',
    nextBtn: 'അടുത്ത ചോദ്യം ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  pa: {
    title: 'ਅੱਜ ਦਾ ਸਵਾਲ ਅਤੇ ਲਾਈਵ ਪੋਲ',
    sub: 'ਦੇਸ਼ ਭਰ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਲਾਈਵ ਤਿਆਰੀ',
    liveVote: 'ਲਾਈਵ ਵੋਟ',
    qLabel: 'ਇਸ ਘੰਟੇ ਦਾ ਮਹੱਤਵਪੂਰਨ ਸਵਾਲ:',
    prev: 'ਪਿਛਲਾ',
    next: 'ਅਗਲਾ',
    qNum: 'ਸਵਾਲ',
    hourlyNotice: 'ਇਹ ਸਵਾਲ ਹਰ ਘੰਟੇ ਬਦਲਦਾ ਹੈ (ਜਾਂ ਸਾਰੇ 24 ਸਵਾਲਾਂ ਲਈ ਪਿਛਲਾ/ਅਗਲਾ ਕਲਿੱਕ ਕਰੋ)!',
    correctBadge: 'ਸਹੀ ਜਵਾਬ',
    yourChoice: 'ਤੁਹਾਡੀ ਚੋਣ',
    correctMsg: '🎉 ਸ਼ਾਬਾਸ਼! ਤੁਹਾਡਾ ਜਵਾਬ 100% ਸਹੀ ਹੈ!',
    wrongPrefix: '💡 ਸਹੀ ਜਵਾਬ ਵਿਕਲਪ ',
    totalParticipants: 'ਕੁੱਲ ਭਾਗੀਦਾਰ: ',
    aspirants: 'ਵਿਦਿਆਰਥੀ',
    retest: '🔄 ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    nextBtn: 'ਅਗਲਾ ਸਵਾਲ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  or: {
    title: 'ଆଜିର ପ୍ରଶ୍ନ ଓ ଲାଇଭ୍ ପୋଲ୍',
    sub: 'ସାରା ଦେଶର ଛାତ୍ରଛାତ୍ରୀଙ୍କ ସହ ଲାଇଭ୍ ପ୍ରସ୍ତୁତି',
    liveVote: 'ଲାଇଭ୍ ଭୋଟ୍',
    qLabel: 'ଏହି ଘଣ୍ଟାର ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପ୍ରଶ୍ନ:',
    prev: 'ପୂର୍ବବର୍ତ୍ତୀ',
    next: 'ପରବର୍ତ୍ତୀ',
    qNum: 'ପ୍ରଶ୍ନ',
    hourlyNotice: 'ଏହି ପ୍ରଶ୍ନ ପ୍ରତି ଘଣ୍ଟାରେ ବଦଳେ (କିମ୍ବା ୨୪ଟି ପ୍ରଶ୍ନ ଅଭ୍ୟାସ ପାଇଁ ପୂର୍ବ/ପର କ୍ଲିକ୍ କରନ୍ତୁ)!',
    correctBadge: 'ଠିକ୍ ଉତ୍ତର',
    yourChoice: 'ଆପଣଙ୍କ ପସନ୍ଦ',
    correctMsg: '🎉 ଉତ୍ତମ! ଆପଣଙ୍କ ଉତ୍ତର ୧୦୦% ଠିକ୍!',
    wrongPrefix: '💡 ସଠିକ୍ ଉତ୍ତର ବିକଳ୍ପ ',
    totalParticipants: 'ମୋଟ ଅଂଶଗ୍ରହଣକାରୀ: ',
    aspirants: 'ଛାତ୍ରଛାତ୍ରୀ',
    retest: '🔄 ପୁନଃ ପରୀକ୍ଷା',
    nextBtn: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ur: {
    title: 'آج کا سوال اور لائیو پول',
    sub: 'ملک بھر کے امیدواروں کے ساتھ لائیو تیاری',
    liveVote: 'لائیو ووٹ',
    qLabel: 'اس گھنٹے کا اہم سوال:',
    prev: 'پچھلا',
    next: 'اگلا',
    qNum: 'سوال',
    hourlyNotice: 'یہ سوال ہر گھنٹے بعد تبدیل ہوتا ہے (یا تمام 24 سوالات حل کرنے کے لیے پچھلا/اگلا دبائیں)!',
    correctBadge: 'درست جواب',
    yourChoice: 'آپ کا جواب',
    correctMsg: '🎉 زبردست! آپ کا جواب 100% درست ہے!',
    wrongPrefix: '💡 درست جواب آپشن ',
    totalParticipants: 'کل شرکاء: ',
    aspirants: 'طلباء',
    retest: '🔄 دوبارہ کوشش کریں',
    nextBtn: 'اگلا سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sa: {
    title: 'अद्यतनः प्रश्नः तथा सजीव-मतदानम्',
    sub: 'अखिलभारतीय-छात्रैः सह सजीव-अभ्यासः',
    liveVote: 'सजीव-मतदानम्',
    qLabel: 'अस्याः होरायाः मुख्य-प्रश्नः:',
    prev: 'पूर्वम्',
    next: 'अग्रिमम्',
    qNum: 'प्रश्नः',
    hourlyNotice: 'एषः प्रश्नः प्रतिहोरा परिवर्तते (अथवा २४ प्रश्नान् अभ्यासाय पूर्वम्/अग्रिमम् नुदन्तु)!',
    correctBadge: 'उचितम् उत्तरम्',
    yourChoice: 'भवतः विकल्पः',
    correctMsg: '🎉 साधु! भवतः उत्तरं शतप्रतिशतं शुद्धम् अस्ति!',
    wrongPrefix: '💡 उचितम् उत्तरं विकल्पः ',
    totalParticipants: 'कुल-सहभागिनः: ',
    aspirants: 'छात्राः',
    retest: '🔄 पुनः परीक्ष्यताम्',
    nextBtn: 'अग्रिमः प्रश्नः ➔',
    secondaryBadge: '🌐 ENGLISH'
  }
};`;

const NEW_INIT_DAILY_POLL = `function initDailyPoll() {
  const container = document.getElementById('dailyPollContainer');
  if (!container) return;

  const poll = getActivePollQuestion();
  let savedVote = null;
  try {
    savedVote = localStorage.getItem(\`sarkari_poll_\${poll.id}\`);
  } catch(e) {}

  let lang = 'hi';
  try {
    lang = localStorage.getItem('sarkariai_lang') || 'hi';
  } catch(e) {}

  const isEnglish = (lang === 'en');
  const t = POLL_I18N[lang] || POLL_I18N['hi'];

  // Strict User Rule:
  // For ALL languages except English:
  //   - Primary Question is Hindi (poll.question)
  //   - Secondary Question is ALWAYS English (poll.question_en) with badge '🌐 ENGLISH'
  // For English:
  //   - Primary Question is English (poll.question_en || poll.question)
  //   - Secondary Question is ALWAYS Hindi (poll.question) with badge '🇮🇳 HINDI'
  let displayQuestion, displaySecondaryQuestion, secondaryBadge;
  let activeOptions, activeExplanation;

  if (isEnglish) {
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
  }

  let optionsHtml = '';
  const totalVotes = poll.baseVotes.reduce((a, b) => a + b, 0) + (savedVote !== null ? 1 : 0);

  activeOptions.forEach((opt, idx) => {
    let votes = poll.baseVotes[idx];
    if (savedVote !== null && parseInt(savedVote, 10) === idx) votes += 1;
    const percentage = Math.round((votes / totalVotes) * 100);

    if (savedVote === null) {
      optionsHtml += \`
        <button type="button" onclick="voteDailyPoll(\${idx})" class="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/70 dark:hover:bg-slate-700/60 transition font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between group cursor-pointer shadow-xs active:scale-[0.99]">
          <div class="flex items-center space-x-3">
            <span class="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-amber-300 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black group-hover:bg-amber-500 group-hover:text-slate-950 transition shrink-0">
              \${String.fromCharCode(65 + idx)}
            </span>
            <span class="font-extrabold text-slate-950 dark:text-slate-100">\${opt}</span>
          </div>
          <span class="text-amber-600 dark:text-amber-400 font-black text-sm group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      \`;
    } else {
      const isSelected = parseInt(savedVote, 10) === idx;
      const isCorrect = poll.correct === idx;
      let badgeClass = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white';
      let barColor = 'bg-slate-400 dark:bg-slate-600';

      if (isCorrect) {
        badgeClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 font-black';
        barColor = 'bg-emerald-500';
      } else if (isSelected && !isCorrect) {
        badgeClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 font-black';
        barColor = 'bg-rose-500';
      }

      optionsHtml += \`
        <div class="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl border-2 \${badgeClass} transition space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-xs sm:text-sm font-black relative z-10">
            <div class="flex items-center space-x-2.5">
              <span class="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-black shrink-0">\${String.fromCharCode(65 + idx)}</span>
              <span class="text-slate-950 dark:text-white font-extrabold">\${opt}</span>
              \${isCorrect ? '<span class=\"text-emerald-700 dark:text-emerald-300 text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/80 font-black\">✅ ' + t.correctBadge + '</span>' : ''}
              \${isSelected && !isCorrect ? '<span class=\"text-rose-700 dark:text-rose-300 text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 font-black\">❌ ' + t.yourChoice + '</span>' : ''}
            </div>
            <span class="font-black text-sm text-slate-950 dark:text-white">\${percentage}%</span>
          </div>
          <!-- Percentage progress bar backdrop -->
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-1.5">
            <div class="\${barColor} h-full rounded-full transition-all duration-700" style="width: \${percentage}%"></div>
          </div>
        </div>
      \`;
    }
  });

  let solutionHtml = '';
  if (savedVote !== null) {
    const isUserCorrect = parseInt(savedVote, 10) === poll.correct;
    const explanationText = isEnglish ? (poll.explanation_en || poll.explanation_hi) : poll.explanation_hi;
    solutionHtml = \`
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-slate-950 border-2 border-amber-400 dark:border-amber-600/80 text-xs sm:text-sm space-y-3 animate-fadeIn shadow-md">
        <div class="font-black text-sm sm:text-base flex items-center space-x-2 \${isUserCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-900 dark:text-amber-300'}">
          <span>\${isUserCorrect ? t.correctMsg : (t.wrongPrefix + String.fromCharCode(65 + poll.correct) + (lang === 'hi' || lang === 'sa' ? ' है।' : ''))}</span>
        </div>
        <div class="p-3 sm:p-3.5 rounded-xl bg-white/95 dark:bg-slate-900 border border-amber-300/80 dark:border-slate-800 shadow-xs">
          <p class="text-slate-950 dark:text-slate-100 font-bold leading-relaxed text-xs sm:text-sm">\${explanationText}</p>
        </div>
        <div class="pt-2 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-bold border-t border-amber-200 dark:border-slate-800 gap-2">
          <span>👥 \${t.totalParticipants}<strong class="text-slate-900 dark:text-white font-black">\${totalVotes.toLocaleString('en-IN')}</strong> \${t.aspirants}</span>
          <div class="flex items-center space-x-2">
            <button type="button" onclick="resetPollVote('\${poll.id}')" class="text-blue-700 dark:text-cyan-400 font-black hover:underline cursor-pointer">\${t.retest}</button>
            <button type="button" onclick="nextDailyPoll()" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 rounded-lg font-black text-xs cursor-pointer shadow-xs transition">\${t.nextBtn}</button>
          </div>
        </div>
      </div>
    \`;
  }

  const pollNum = (currentPollIndex >= 0 ? currentPollIndex : getHourlyPollIndex()) + 1;
  const totalPolls = DAILY_POLL_QUESTIONS.length;

  container.innerHTML = \`
    <div class="bg-white dark:bg-slate-900 border-2 border-amber-400/90 dark:border-slate-700 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
      
      <!-- Top Bar: Header + Navigation Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200/80 dark:border-slate-800 pb-3 gap-3">
        <div class="flex items-center space-x-3">
          <span class="text-2xl sm:text-3xl animate-pulse">🗳️</span>
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="font-black text-slate-950 dark:text-white text-sm sm:text-base">\${t.title}</h3>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shadow-xs">\${t.liveVote}</span>
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-400 font-bold">\${poll.subject} • \${t.sub}</div>
          </div>
        </div>
        
        <!-- Multi-Question Navigation Buttons (Allows browsing 24 questions anytime) -->
        <div class="flex items-center space-x-2 self-start sm:self-auto">
          <button type="button" onclick="prevDailyPoll()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black border border-slate-300 dark:border-slate-700 shadow-xs transition active:scale-95 cursor-pointer" title="Previous Question">
            ⬅️ \${t.prev}
          </button>
          <span class="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-black text-xs border border-amber-300 dark:border-amber-700">
            \${t.qNum} \${pollNum}/\${totalPolls}
          </span>
          <button type="button" onclick="nextDailyPoll()" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs font-black shadow-xs transition cursor-pointer" title="Next Question">
            \${t.next} ➔
          </button>
        </div>
      </div>

      <!-- Rotation Notice Badge: Clarifies Hourly Auto-Rotation & Multi-Question Feature -->
      <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
        <span class="flex items-center space-x-1.5">
          <span>🕒</span>
          <span>\${t.hourlyNotice}</span>
        </span>
        <span class="hidden md:inline-flex text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 bg-amber-200/80 dark:bg-amber-950 px-2 py-0.5 rounded">
          \${poll.subject.split('(')[0].trim()}
        </span>
      </div>

      <!-- Dedicated High-Contrast Question Callout Box with Anti-Washed-Out Bilingual Framing -->
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-slate-800 border-2 border-amber-300/80 dark:border-slate-700 shadow-xs space-y-2">
        <div class="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center space-x-1.5">
          <span>📌</span>
          <span>\${t.qLabel}</span>
          <span class="text-slate-500 dark:text-slate-400 font-bold">(\${poll.subject})</span>
        </div>
        
        <!-- Primary Question: Crisp, high-contrast text -->
        <div class="font-black text-slate-950 dark:text-white text-base sm:text-lg leading-relaxed">
          \${displayQuestion}
        </div>
        
        <!-- Secondary Bilingual Translation: Dedicated contrast card with rich blue/cyan colors (NEVER white or washed-out) -->
        \${displaySecondaryQuestion ? \`
          <div class="mt-2.5 p-3 rounded-xl bg-blue-50/95 dark:bg-slate-950 border border-blue-200 dark:border-cyan-800/80 flex items-start space-x-2.5 shadow-2xs">
            <span class="px-2 py-0.5 rounded bg-blue-600 text-white dark:bg-cyan-900/90 dark:text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase shrink-0">
              \${secondaryBadge}
            </span>
            <span class="text-xs sm:text-sm font-bold text-blue-950 dark:text-cyan-200 leading-relaxed">
              \${displaySecondaryQuestion}
            </span>
          </div>
        \` : ''}
      </div>

      <!-- Options List -->
      <div class="space-y-2.5">
        \${optionsHtml}
      </div>

      <!-- Detailed Explanation & Statistics (Displayed after voting) -->
      \${solutionHtml}
    </div>
  \`;
}`;

let content = fs.readFileSync('public/js/interactive-features.js', 'utf8');

// Find initDailyPoll
const startIdx = content.indexOf('function initDailyPoll() {');
const endMarker = 'function voteDailyPoll(index) {';
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find initDailyPoll anchors!');
  process.exit(1);
}

const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

const updated = before + POLL_I18N_CODE + '\n\n' + NEW_INIT_DAILY_POLL + '\n\n' + after;

fs.writeFileSync('public/js/interactive-features.js', updated);
console.log('Successfully updated initDailyPoll and injected POLL_I18N into public/js/interactive-features.js!');

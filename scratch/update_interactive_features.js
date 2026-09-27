const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'public', 'js', 'interactive-features.js');
let content = fs.readFileSync(targetFile, 'utf8');

const updatedSection = `const DAILY_POLL_QUESTIONS = [
  {
    id: 'poll-q1',
    subject: 'Indian Polity & Constitution (भारतीय राजव्यवस्था)',
    question: 'भारतीय संविधान के किस अनुच्छेद के तहत "अस्पृश्यता का उन्मूलन" (Abolition of Untouchability) किया गया है?',
    question_en: 'Under which Article of the Indian Constitution is the "Abolition of Untouchability" provided?',
    options: ['अनुच्छेद 14 / Article 14 (Equality before Law)', 'अनुच्छेद 17 / Article 17 (Abolition of Untouchability)', 'अनुच्छेद 19 / Article 19 (Freedom of Speech)', 'अनुच्छेद 21 / Article 21 (Right to Life & Liberty)'],
    options_hi: ['अनुच्छेद 14 (समानता का अधिकार)', 'अनुच्छेद 17 (अस्पृश्यता निवारण)', 'अनुच्छेद 19 (अभिव्यक्ति की स्वतंत्रता)', 'अनुच्छेद 21 (प्राण एवं दैहिक स्वतंत्रता)'],
    options_en: ['Article 14 (Equality before Law)', 'Article 17 (Abolition of Untouchability)', 'Article 19 (Freedom of Speech)', 'Article 21 (Protection of Life & Personal Liberty)'],
    correct: 1,
    baseVotes: [1240, 11850, 1680, 890],
    explanation_hi: 'संविधान के अनुच्छेद 17 के तहत अस्पृश्यता को पूरी तरह समाप्त कर दिया गया है और इसका किसी भी रूप में आचरण दंडनीय अपराध है। ट्रिक: 17 = "खतरा" (अस्पृश्यता समाज के लिए खतरा है)।',
    explanation_en: 'Under Article 17 of the Indian Constitution, untouchability is abolished and its practice in any form is forbidden and punishable by law.'
  },
  {
    id: 'poll-q2',
    subject: 'General Science & Physics (सामान्य विज्ञान)',
    question: 'रॉकेट का प्रक्षेपण (Rocket Propulsion) न्यूटन के गति के किस नियम पर आधारित है?',
    question_en: 'On which law of motion by Newton is rocket propulsion primarily based?',
    options: ['प्रथम नियम / First Law (Law of Inertia)', 'द्वितीय नियम / Second Law (F = ma)', 'तृतीय नियम / Third Law (Action & Reaction)', 'ऊर्जा संरक्षण नियम / Law of Conservation of Energy'],
    options_hi: ['प्रथम नियम (जड़त्व का नियम)', 'द्वितीय नियम (बल का संवेग नियम)', 'तृतीय नियम (क्रिया-प्रतिक्रिया नियम)', 'ऊर्जा संरक्षण का नियम'],
    options_en: ['First Law (Law of Inertia)', 'Second Law (F = ma, Momentum)', 'Third Law (Action & Reaction)', 'Law of Conservation of Energy'],
    correct: 2,
    baseVotes: [1120, 1940, 12600, 780],
    explanation_hi: 'रॉकेट प्रक्षेपण न्यूटन के तृतीय नियम (Action & Reaction) तथा रेखीय संवेग संरक्षण (Conservation of Linear Momentum) के सिद्धांत पर कार्य करता है।',
    explanation_en: 'Rocket propulsion works on Newton\'s Third Law of Motion (Action and Reaction) along with the law of Conservation of Linear Momentum.'
  },
  {
    id: 'poll-q3',
    subject: 'History & Modern India (आधुनिक भारत का इतिहास)',
    question: '1857 के प्रथम स्वतंत्रता संग्राम में लखनऊ (अवध) से विद्रोह का नेतृत्व किसने किया था?',
    question_en: 'Who led the Revolt of 1857 from Lucknow (Awadh)?',
    options: ['रानी लक्ष्मीबाई / Rani Lakshmibai', 'बेगम हज़रत महल / Begum Hazrat Mahal', 'कुंवर सिंह / Kunwar Singh', 'मौलवी अहमदुल्लाह / Maulvi Ahmadullah'],
    options_hi: ['रानी लक्ष्मीबाई', 'बेगम हज़रत महल', 'कुंवर सिंह', 'मौलवी अहमदुल्लाह'],
    options_en: ['Rani Lakshmibai', 'Begum Hazrat Mahal', 'Kunwar Singh', 'Maulvi Ahmadullah'],
    correct: 1,
    baseVotes: [1850, 13400, 920, 610],
    explanation_hi: 'लखनऊ (अवध) से विद्रोह का नेतृत्व बेगम हज़रत महल ने किया था। उन्होंने अपने अल्पवयस्क पुत्र बिरजिस क़ाद्र को नवाब घोषित कर अंग्रेजों से लोहा लिया था।',
    explanation_en: 'Begum Hazrat Mahal (the Begum of Awadh) led the 1857 Revolt from Lucknow and fought valiantly against British troops.'
  },
  {
    id: 'poll-q4',
    subject: 'Geography of India (भारत का भूगोल)',
    question: 'भारत की सबसे पुरानी पर्वत श्रृंखला (Oldest Mountain Range) कौन सी है?',
    question_en: 'Which is the oldest mountain range in India and the world?',
    options: ['हिमालय पर्वतमाला / Himalayas', 'अरावली पर्वतमाला / Aravalli Range', 'पश्चिमी घाट / Western Ghats (Sahyadri)', 'सतपुड़ा पर्वतमाला / Satpura Range'],
    options_hi: ['हिमालय पर्वतमाला', 'अरावली पर्वतमाला', 'पश्चिमी घाट (सह्याद्री)', 'सतपुड़ा पर्वतमाला'],
    options_en: ['Himalayan Mountain Range', 'Aravalli Range', 'Western Ghats (Sahyadri)', 'Satpura Range'],
    correct: 1,
    baseVotes: [2100, 14200, 1150, 640],
    explanation_hi: 'अरावली भारत और दुनिया की सबसे प्राचीन अवशिष्ट वलित पर्वत श्रृंखलाओं में से एक है। इसका सर्वोच्च शिखर "गुरु शिखर" (माउंट आबू, 1722 मीटर) है।',
    explanation_en: 'The Aravalli Range is the oldest residual mountain range in India. Its highest peak is Guru Shikhar (1,722 meters) near Mount Abu in Rajasthan.'
  },
  {
    id: 'poll-q5',
    subject: 'Economics & Planning (भारतीय अर्थव्यवस्था)',
    question: 'भारत में नीति आयोग (NITI Aayog) का गठन योजना आयोग के स्थान पर किस तारीख को किया गया था?',
    question_en: 'On which date was NITI Aayog established replacing the Planning Commission?',
    options: ['15 अगस्त 2014 / 15 August 2014', '1 जनवरी 2015 / 1 January 2015', '26 जनवरी 2015 / 26 January 2015', '1 अप्रैल 2016 / 1 April 2016'],
    options_hi: ['15 अगस्त 2014', '1 जनवरी 2015', '26 जनवरी 2015', '1 अप्रैल 2016'],
    options_en: ['15 August 2014', '1 January 2015', '26 January 2015', '1 April 2016'],
    correct: 1,
    baseVotes: [1420, 12900, 1350, 810],
    explanation_hi: 'नीति आयोग (National Institution for Transforming India) का गठन 1 जनवरी 2015 को किया गया। इसके पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।',
    explanation_en: 'NITI Aayog (National Institution for Transforming India) was established on 1 January 2015. The Prime Minister is its Ex-officio Chairman.'
  },
  {
    id: 'poll-q6',
    subject: 'Quantitative Aptitude & Maths (गणित एवं अंकगणित)',
    question: 'यदि किसी वस्तु का क्रय मूल्य ₹800 है और उसे ₹960 में बेचा जाता है, तो लाभ प्रतिशत क्या होगा?',
    question_en: 'If the cost price of an article is ₹800 and it is sold for ₹960, what is the profit percentage?',
    options: ['16% Profit (लाभ)', '20% Profit (लाभ)', '25% Profit (लाभ)', '18% Profit (लाभ)'],
    options_hi: ['16% लाभ', '20% लाभ', '25% लाभ', '18% लाभ'],
    options_en: ['16% Profit', '20% Profit', '25% Profit', '18% Profit'],
    correct: 1,
    baseVotes: [980, 13800, 1420, 560],
    explanation_hi: 'लाभ = विक्रय मूल्य - क्रय मूल्य = 960 - 800 = ₹160। लाभ % = (160 / 800) × 100 = 20%।',
    explanation_en: 'Profit = SP - CP = 960 - 800 = ₹160. Profit % = (Profit / CP) * 100 = (160 / 800) * 100 = 20%.'
  },
  {
    id: 'poll-q7',
    subject: 'Computer & Information Technology (कंप्यूटर ज्ञान)',
    question: 'कंप्यूटर में प्रयोग होने वाली IC चिप (Integrated Circuit) प्रायः किस धातु / अर्धचालक की बनी होती है?',
    question_en: 'What semiconductor material is an Integrated Circuit (IC chip) in computers made of?',
    options: ['सिलिकॉन / Silicon (Semiconductor)', 'कॉपर (तांबा) / Copper', 'सिल्वर (चांदी) / Silver', 'आयरन (लोहा) / Iron'],
    options_hi: ['सिलिकॉन (Silicon)', 'कॉपर (तांबा)', 'सिल्वर (चांदी)', 'आयरन (लोहा)'],
    options_en: ['Silicon (Semiconductor)', 'Copper (Conductor)', 'Silver', 'Iron'],
    correct: 0,
    baseVotes: [14500, 890, 420, 310],
    explanation_hi: 'IC चिप्स अर्धचालक (Semiconductor) धातु सिलिकॉन की बनी होती हैं। जे. एस. किल्बी ने 1958 में पहली IC का विकास किया था।',
    explanation_en: 'IC chips are made of Silicon semiconductor material. Jack Kilby created the first integrated circuit in 1958.'
  }
];

function getTodayPollQuestion() {
  const dayIndex = new Date().getDay(); // 0 to 6
  return DAILY_POLL_QUESTIONS[dayIndex % DAILY_POLL_QUESTIONS.length];
}

function initDailyPoll() {
  const container = document.getElementById('dailyPollContainer');
  if (!container) return;

  const poll = getTodayPollQuestion();
  let savedVote = null;
  try {
    savedVote = localStorage.getItem(\`sarkari_poll_\${poll.id}\`);
  } catch(e) {}

  let lang = 'hi';
  try {
    lang = localStorage.getItem('sarkariai_lang') || 'hi';
  } catch(e) {}

  const isEnglish = (lang === 'en');
  const titleText = isEnglish ? 'Question of the Day (Daily Community Poll)' : 'आज का सवाल (Daily Community Poll)';
  const subText = isEnglish ? 'All-India Aspirants Live Poll' : 'देश भर के छात्रों के साथ जांचें';
  const badgeText = isEnglish ? 'Daily Test' : 'आज का टेस्ट';
  const qLabel = isEnglish ? 'Question of the Day:' : 'आज का महत्वपूर्ण प्रश्न:';

  const displayQuestion = isEnglish ? (poll.question_en || poll.question) : poll.question;
  const displaySecondaryQuestion = (!isEnglish && poll.question_en) ? poll.question_en : (isEnglish && poll.question ? poll.question : '');

  const activeOptions = isEnglish ? (poll.options_en || poll.options) : poll.options;

  let optionsHtml = '';
  const totalVotes = poll.baseVotes.reduce((a, b) => a + b, 0) + (savedVote !== null ? 1 : 0);

  activeOptions.forEach((opt, idx) => {
    let votes = poll.baseVotes[idx];
    if (savedVote !== null && parseInt(savedVote, 10) === idx) votes += 1;
    const percentage = Math.round((votes / totalVotes) * 100);

    if (savedVote === null) {
      optionsHtml += \`
        <button onclick="voteDailyPoll(\${idx})" class="w-full text-left p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/60 dark:hover:bg-slate-700/60 transition font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between group cursor-pointer shadow-xs active:scale-[0.99]">
          <div class="flex items-center space-x-3">
            <span class="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              \${String.fromCharCode(65 + idx)}
            </span>
            <span class="font-extrabold text-slate-900 dark:text-white">\${opt}</span>
          </div>
          <span class="text-slate-400 dark:text-slate-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition text-base">➔</span>
        </button>
      \`;
    } else {
      const isSelected = parseInt(savedVote, 10) === idx;
      const isCorrect = poll.correct === idx;
      let badgeClass = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white';
      let barColor = 'bg-slate-300 dark:bg-slate-600';

      if (isCorrect) {
        badgeClass = 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-black';
        barColor = 'bg-emerald-500';
      } else if (isSelected && !isCorrect) {
        badgeClass = 'border-rose-500 bg-rose-50/90 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 font-black';
        barColor = 'bg-rose-500';
      }

      optionsHtml += \`
        <div class="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl border-2 \${badgeClass} transition space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-xs sm:text-sm font-black relative z-10">
            <div class="flex items-center space-x-2.5">
              <span class="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-black">\${String.fromCharCode(65 + idx)}</span>
              <span>\${opt}</span>
              \${isCorrect ? '<span class="text-emerald-700 dark:text-emerald-300 text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/80 font-black">✅ ' + (isEnglish ? 'Correct Answer' : 'सही उत्तर') + '</span>' : ''}
              \${isSelected && !isCorrect ? '<span class="text-rose-700 dark:text-rose-300 text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 font-black">❌ ' + (isEnglish ? 'Your Choice' : 'आपका जवाब') + '</span>' : ''}
            </div>
            <span class="font-black text-sm">\${percentage}%</span>
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
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-slate-800/90 border border-amber-300 dark:border-amber-600/60 text-xs sm:text-sm space-y-2 animate-fadeIn">
        <div class="font-black text-sm sm:text-base flex items-center space-x-1.5 \${isUserCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-900 dark:text-amber-300'}">
          <span>\${isUserCorrect ? (isEnglish ? '🎉 Excellent! Your answer is 100% correct!' : '🎉 शाबाश! आपका जवाब बिल्कुल सही है!') : (isEnglish ? '💡 Correct Answer is Option ' + String.fromCharCode(65 + poll.correct) : '💡 सही उत्तर विकल्प ' + String.fromCharCode(65 + poll.correct) + ' है।')}</span>
        </div>
        <p class="text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">\${explanationText}</p>
        <div class="pt-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-bold border-t border-amber-200 dark:border-slate-700 mt-2">
          <span>👥 \${isEnglish ? 'Total Participants: ' : 'कुल भागीदार: '} \${totalVotes.toLocaleString('en-IN')} \${isEnglish ? 'Aspirants' : 'छात्र'}</span>
          <button onclick="resetPollVote('\${poll.id}')" class="text-blue-700 dark:text-blue-400 font-black hover:underline cursor-pointer">\${isEnglish ? '🔄 Re-test Question' : '🔄 Re-test (दोबारा दें)'}</button>
        </div>
      </div>
    \`;
  }

  container.innerHTML = \`
    <div class="bg-white dark:bg-slate-900 border-2 border-amber-400/90 dark:border-slate-700 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
      <div class="flex items-center justify-between border-b border-amber-200/80 dark:border-slate-800 pb-3">
        <div class="flex items-center space-x-2.5">
          <span class="text-2xl animate-pulse">🗳️</span>
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="font-black text-slate-950 dark:text-white text-sm sm:text-base">\${titleText}</h3>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shadow-xs">LIVE VOTE</span>
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-400 font-bold">\${poll.subject} • \${subText}</div>
          </div>
        </div>
        <span class="hidden sm:inline-flex text-xs font-black text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700 shadow-xs">
          \${badgeText}
        </span>
      </div>

      <!-- Dedicated High-Contrast Question Callout Box (Fixes washed-out / light issue) -->
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-slate-800 border-2 border-amber-300/80 dark:border-slate-700 shadow-xs space-y-1">
        <div class="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center space-x-1.5">
          <span>📌</span>
          <span>\${qLabel}</span>
        </div>
        <div class="font-black text-slate-950 dark:text-white text-base sm:text-lg leading-relaxed">
          \${displayQuestion}
        </div>
        \${displaySecondaryQuestion ? \`<div class="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1 italic">\${displaySecondaryQuestion}</div>\` : ''}
      </div>

      <div class="space-y-2.5">
        \${optionsHtml}
      </div>

      \${solutionHtml}
    </div>
  \`;
}`;

// Find start and end of DAILY_POLL_QUESTIONS and initDailyPoll
const startIndex = content.indexOf('const DAILY_POLL_QUESTIONS = [');
const endIndex = content.indexOf('function voteDailyPoll(index) {');

if (startIndex !== -1 && endIndex !== -1) {
  const newFullContent = content.substring(0, startIndex) + updatedSection + '\n\n' + content.substring(endIndex);
  
  // Also add languageChanged listener if not present
  if (!newFullContent.includes("window.addEventListener('languageChanged', initDailyPoll)")) {
    const endExport = 'window.initDailyPoll = initDailyPoll;';
    const listenerCode = "\\nwindow.addEventListener('languageChanged', initDailyPoll);\\nwindow.initDailyPoll = initDailyPoll;";
    const finalContent = newFullContent.replace(endExport, listenerCode);
    fs.writeFileSync(targetFile, finalContent, 'utf8');
  } else {
    fs.writeFileSync(targetFile, newFullContent, 'utf8');
  }
  console.log('Successfully updated DAILY_POLL_QUESTIONS and initDailyPoll with high-contrast box, bilingual support, and languageChanged listener!');
} else {
  console.error('Could not find markers for replacement.');
}

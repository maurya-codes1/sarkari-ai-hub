// public/js/typing-test.js
// Bharat's Official Govt Exam Typing Speed & Accuracy Test Engine (2026 Edition)
// Compatible with SSC CHSL, SSC CGL Tier-2, Railway NTPC, Allahabad High Court, BSSC
// Supports English, Hindi Mangal (Remington GAIL / Inscript), and Hindi Kruti Dev 010

const TYPING_PASSAGES = {
  en: [
    {
      id: "ssc-chsl-01",
      title: "SSC CHSL / CGL Tier-2 Official LDC Passage (Constitution & Digital India)",
      text: "The Constitution of India is the supreme law of the nation and establishes the framework for political principles, governance procedures, and fundamental rights. In recent decades, the Digital India mission has transformed public service delivery across urban and rural landscapes. Government portals now facilitate direct benefit transfers, scholarship dispensations, and transparent recruitment processes. Every aspiring candidate must understand the core values of integrity, dedication, and precision in administrative work. Technological modernization continues to streamline governance, ensuring equitable access to opportunities for citizens across all states and union territories of Bharat."
    },
    {
      id: "railway-ntpc-02",
      title: "Railway NTPC & Court Clerk Passage (Indian Railway Infrastructure)",
      text: "Indian Railways is one of the largest rail networks in the world, spanning thousands of kilometers and connecting millions of passengers daily. Modern initiatives like Vande Bharat Express and dedicated freight corridors are revolutionizing transport efficiency. Freight corridors reduce logistical costs, while upgraded railway stations enhance passenger convenience with automated ticketing and accessibility features. Efficient railway management demands meticulous record keeping, swift data processing, and unwavering commitment to safety protocols and passenger welfare."
    }
  ],
  hi_mangal: [
    {
      id: "mangal-01",
      title: "SSC व उच्च न्यायालय हिंदी टाइपिंग पैसेज (मंगल फॉन्ट - सुशासन एवं डिजिटल भारत)",
      text: "भारत का संविधान देश की लोकतांत्रिक व्यवस्था की आधारशिला है। यह नागरिकों को मौलिक अधिकार प्रदान करता है तथा शासन के विभिन्न अंगों के उत्तरदायित्व निर्धारित करता है। आधुनिक युग में डिजिटल इंडिया अभियान ने सरकारी सेवाओं को प्रत्येक नागरिक के द्वार तक पहुँचाने में ऐतिहासिक भूमिका निभाई है। विभिन्न सरकारी विभागों में पारदर्शिता और गति लाने के लिए कंप्यूटर आधारित कार्यप्रणाली अनिवार्य कर दी गई है। प्रत्येक प्रतियोगी छात्र को चाहिए कि वह अपने कार्य में निष्ठा, शुद्धता और समयबद्धता का विशेष ध्यान रखे ताकि राष्ट्र के सर्वांगीण विकास में सकारात्मक योगदान दिया जा सके।"
    },
    {
      id: "mangal-02",
      title: "रेलवे एवं सचिवालय टाइपिस्ट पैसेज (पर्यावरण संरक्षण व सतत विकास)",
      text: "पर्यावरण संरक्षण आज के समय की सबसे बड़ी वैश्विक आवश्यकता बन चुका है। प्राकृतिक संसाधनों का अंधाधुंध दोहन वायु, जल और मृदा प्रदूषण को बढ़ावा दे रहा है। सतत विकास की अवधारणा यह सिखाती है कि हम वर्तमान की आवश्यकताओं को पूरा करते समय भावी पीढ़ियों के हितों से समझौता न करें। नवीकरणीय ऊर्जा स्रोतों जैसे सौर ऊर्जा और पवन ऊर्जा का उपयोग बढ़ाने से प्रदूषण में भारी कमी लाई जा सकती है। प्रत्येक नागरिक का दायित्व है कि वह वृक्षारोपण और जल संचयन को अपनी दैनिक जीवनशैली का हिस्सा बनाए।"
    }
  ],
  hi_kruti: [
    {
      id: "kruti-01",
      title: "राज्य पुलिस व लिपिक परीक्षा पैसेज (कृति देव 010 मानक पैसेज)",
      text: "Hkkjr ,d egku vkSj fofo/krkiw.kZ ns'k gSA ;gk¡ fofHkUu /keZ] Hkk\\\"kk vkSj laLd`fr ds yksx vkil esa feytqy dj jgrs gSaA ns'k dh izxfr esa ;qok oxZ dh Hkwfedk loksZifj gSA dEI;wVj Kku vkSj lgh xfr ls fd;k x;k dk;Z gh vkt dh izfrLi/kkZ esa lQyrk fnykrk gSA ges'kk /kS;Z vkSj vH;kl ls viuh {kerk dks c<+krs jguk pkfg,A"
    }
  ]
};

let typingState = {
  lang: 'en',
  durationMins: 1,
  passageIndex: 0,
  targetText: '',
  words: [],
  timerInterval: null,
  timeRemainingSecs: 60,
  totalTimeSecs: 60,
  hasStarted: false,
  isFinished: false,
  keystrokes: 0,
  backspaces: 0,
  errors: 0
};

function initTypingTest() {
  const langSelect = document.getElementById('typingLangSelect');
  const durSelect = document.getElementById('typingDurationSelect');
  const passageSelect = document.getElementById('typingPassageSelect');
  const inputArea = document.getElementById('typingInputArea');

  if (langSelect) {
    langSelect.addEventListener('change', () => {
      typingState.lang = langSelect.value;
      populateTypingPassages();
      resetTypingTest();
    });
  }

  if (durSelect) {
    durSelect.addEventListener('change', () => {
      typingState.durationMins = parseFloat(durSelect.value) || 1;
      resetTypingTest();
    });
  }

  if (passageSelect) {
    passageSelect.addEventListener('change', () => {
      typingState.passageIndex = parseInt(passageSelect.value, 10) || 0;
      resetTypingTest();
    });
  }

  if (inputArea) {
    inputArea.addEventListener('input', handleTypingInput);
    inputArea.addEventListener('keydown', handleTypingKeydown);
  }

  populateTypingPassages();
  resetTypingTest();
}

function populateTypingPassages() {
  const passageSelect = document.getElementById('typingPassageSelect');
  if (!passageSelect) return;

  const list = TYPING_PASSAGES[typingState.lang] || TYPING_PASSAGES.en;
  passageSelect.innerHTML = list.map((p, idx) => `
    <option value="${idx}">${p.title}</option>
  `).join('');
}

function resetTypingTest() {
  if (typingState.timerInterval) {
    clearInterval(typingState.timerInterval);
    typingState.timerInterval = null;
  }

  const list = TYPING_PASSAGES[typingState.lang] || TYPING_PASSAGES.en;
  const p = list[typingState.passageIndex] || list[0];
  
  typingState.targetText = p.text;
  typingState.words = p.text.trim().split(/\s+/);
  typingState.totalTimeSecs = Math.round(typingState.durationMins * 60);
  typingState.timeRemainingSecs = typingState.totalTimeSecs;
  typingState.hasStarted = false;
  typingState.isFinished = false;
  typingState.keystrokes = 0;
  typingState.backspaces = 0;
  typingState.errors = 0;

  const inputArea = document.getElementById('typingInputArea');
  if (inputArea) {
    inputArea.value = '';
    inputArea.disabled = false;
    inputArea.placeholder = "टाइपिंग शुरू करने के लिए यहाँ लिखना आरंभ करें (Start typing here)...";
  }

  document.getElementById('typingResultCard')?.classList.add('hidden');
  document.getElementById('typingActiveArena')?.classList.remove('hidden');

  updateTypingStatsDisplay(0, 0, 100);
  updateTypingTimerDisplay();
  renderPassageTextWithHighlight(0, '');
}

function updateTypingTimerDisplay() {
  const el = document.getElementById('typingTimerBadge');
  if (!el) return;

  const m = Math.floor(typingState.timeRemainingSecs / 60).toString().padStart(2, '0');
  const s = (typingState.timeRemainingSecs % 60).toString().padStart(2, '0');
  el.textContent = `⏱️ ${m}:${s}`;
}

function renderPassageTextWithHighlight(currentWordIdx, currentTypedValue) {
  const displayBox = document.getElementById('typingPassageDisplay');
  if (!displayBox) return;

  displayBox.innerHTML = typingState.words.map((word, idx) => {
    let cls = "inline-block px-1 py-0.5 m-0.5 rounded transition ";
    if (idx < currentWordIdx) {
      cls += "text-emerald-700 bg-emerald-100 font-bold";
    } else if (idx === currentWordIdx) {
      if (currentTypedValue && !word.startsWith(currentTypedValue)) {
        cls += "bg-rose-200 text-rose-900 border-b-2 border-rose-600 font-bold";
      } else {
        cls += "bg-blue-100 text-blue-900 border-b-2 border-blue-600 font-black";
      }
    } else {
      cls += "text-slate-700";
    }
    return `<span class="${cls}">${word}</span>`;
  }).join(' ');

  // Auto scroll to active word
  const activeSpan = displayBox.querySelector('.border-b-2');
  if (activeSpan) {
    displayBox.scrollTop = activeSpan.offsetTop - displayBox.offsetTop - 40;
  }
}

function handleTypingKeydown(e) {
  if (typingState.isFinished) {
    e.preventDefault();
    return;
  }

  if (e.key === 'Backspace') {
    typingState.backspaces++;
  }

  if (!typingState.hasStarted && e.key.length === 1) {
    typingState.hasStarted = true;
    startTypingTimer();
  }
}

function startTypingTimer() {
  if (typingState.timerInterval) clearInterval(typingState.timerInterval);

  typingState.timerInterval = setInterval(() => {
    if (typingState.timeRemainingSecs > 0) {
      typingState.timeRemainingSecs--;
      updateTypingTimerDisplay();
      calculateLiveMetrics();
    } else {
      finishTypingTest();
    }
  }, 1000);
}

function handleTypingInput(e) {
  if (typingState.isFinished) return;

  const typedText = e.target.value;
  typingState.keystrokes = typedText.length;

  const typedWords = typedText.trim().split(/\s+/);
  const currentWordIdx = typedText.endsWith(' ') ? typedWords.length : Math.max(0, typedWords.length - 1);
  const currentTypedWord = typedText.endsWith(' ') ? '' : (typedWords[currentWordIdx] || '');

  renderPassageTextWithHighlight(currentWordIdx, currentTypedWord);
  calculateLiveMetrics();

  // If user completed entire passage before timer expires
  if (typedWords.length >= typingState.words.length && typedText.endsWith(' ')) {
    finishTypingTest();
  }
}

function calculateLiveMetrics() {
  const inputArea = document.getElementById('typingInputArea');
  if (!inputArea) return;

  const typedText = inputArea.value;
  const elapsedSecs = Math.max(1, typingState.totalTimeSecs - typingState.timeRemainingSecs);
  const elapsedMins = elapsedSecs / 60;

  // Gross WPM: Standard 5 characters = 1 word
  const grossWpm = Math.round((typedText.length / 5) / elapsedMins);

  // Errors calculation
  const typedWords = typedText.trim().split(/\s+/);
  let errorCount = 0;
  let correctCharCount = 0;

  typedWords.forEach((tw, idx) => {
    const targetWord = typingState.words[idx];
    if (targetWord) {
      if (tw === targetWord) {
        correctCharCount += tw.length + 1;
      } else {
        errorCount++;
      }
    }
  });

  typingState.errors = errorCount;

  // Net WPM = Gross WPM - (Errors / Minutes)
  const netWpm = Math.max(0, Math.round(grossWpm - (errorCount / elapsedMins)));

  // Accuracy %
  const accuracy = typedText.length > 0 
    ? Math.max(0, Math.min(100, Math.round((correctCharCount / typedText.length) * 100))) 
    : 100;

  updateTypingStatsDisplay(netWpm, grossWpm, accuracy);
}

function updateTypingStatsDisplay(netWpm, grossWpm, accuracy) {
  const netEl = document.getElementById('typingLiveNetWpm');
  const grossEl = document.getElementById('typingLiveGrossWpm');
  const accEl = document.getElementById('typingLiveAccuracy');

  if (netEl) netEl.textContent = `${netWpm} WPM`;
  if (grossEl) grossEl.textContent = `${grossWpm} WPM`;
  if (accEl) accEl.textContent = `${accuracy}%`;
}

function finishTypingTest() {
  if (typingState.timerInterval) {
    clearInterval(typingState.timerInterval);
    typingState.timerInterval = null;
  }
  typingState.isFinished = true;

  const inputArea = document.getElementById('typingInputArea');
  if (inputArea) inputArea.disabled = true;

  calculateLiveMetrics();

  const elapsedSecs = Math.max(1, typingState.totalTimeSecs - typingState.timeRemainingSecs);
  const elapsedMins = elapsedSecs / 60;
  const typedText = inputArea ? inputArea.value : '';
  const grossWpm = Math.round((typedText.length / 5) / elapsedMins);
  const netWpm = Math.max(0, Math.round(grossWpm - (typingState.errors / elapsedMins)));
  const accuracy = typedText.length > 0 
    ? Math.max(0, Math.min(100, Math.round(((typedText.length - (typingState.errors * 5)) / typedText.length) * 100)))
    : 100;

  let speedRating = "🏆 SSC / Court Typist Qualified (35+ WPM)";
  let ratingClass = "from-emerald-600 to-teal-700";
  let ratingDesc = "उत्कृष्ट गति! आप SSC CHSL, CGL, और उच्च न्यायालय की टाइपिंग परीक्षा में शत-प्रतिशत उत्तीर्ण होने के योग्य हैं।";

  if (netWpm < 25) {
    speedRating = "⚠️ Practice Required (< 25 WPM)";
    ratingClass = "from-rose-600 to-orange-700";
    ratingDesc = "टाइपिंग गति में सुधार की आवश्यकता है। सरकारी परीक्षा में चयन हेतु प्रतिदिन 20 मिनट अभ्यास करें।";
  } else if (netWpm < 35) {
    speedRating = "⚡ Good Speed (25 - 34 WPM)";
    ratingClass = "from-amber-500 to-orange-600";
    ratingDesc = "सराहनीय गति! 35 WPM का आधिकारिक कट-ऑफ पार करने के लिए बैकस्पेस का प्रयोग कम करें।";
  }

  // Populate Scorecard
  document.getElementById('typingScorecardNetWpm').textContent = `${netWpm} WPM`;
  document.getElementById('typingScorecardGrossWpm').textContent = `${grossWpm} WPM`;
  document.getElementById('typingScorecardAccuracy').textContent = `${accuracy}%`;
  document.getElementById('typingScorecardKeystrokes').textContent = typingState.keystrokes;
  document.getElementById('typingScorecardBackspaces').textContent = typingState.backspaces;
  document.getElementById('typingScorecardErrors').textContent = typingState.errors;

  const badge = document.getElementById('typingScorecardBadge');
  if (badge) {
    badge.textContent = speedRating;
    badge.className = `inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${ratingClass} shadow-md`;
  }
  document.getElementById('typingScorecardDesc').textContent = ratingDesc;

  document.getElementById('typingActiveArena')?.classList.add('hidden');
  document.getElementById('typingResultCard')?.classList.remove('hidden');
}

// Expose globally
window.initTypingTest = initTypingTest;
window.resetTypingTest = resetTypingTest;
window.finishTypingTest = finishTypingTest;

document.addEventListener('DOMContentLoaded', () => {
  initTypingTest();
});

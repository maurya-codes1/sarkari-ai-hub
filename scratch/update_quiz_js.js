const fs = require('fs');

let code = fs.readFileSync('public/js/quiz.js', 'utf8');

// 1. Replace speech section (lines 19 to 85)
const oldSpeech = `// Global Voice Question Reader controller
function stopSpeaking() {
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  const speechBtn = document.getElementById('quizSpeechBtn');
  if (speechBtn) {
    speechBtn.classList.remove('speech-pulse');
    const label = typeof getTranslation === 'function' ? getTranslation('quiz_listen_btn') : 'Listen Question';
    speechBtn.innerHTML = \`<span>🔊</span> <span class="hidden sm:inline">\${label}</span>\`;
  }
  if (activeQuiz) activeQuiz.isSpeaking = false;
}

function toggleSpeakActiveQuestion() {
  if (!('speechSynthesis' in window)) {
    alert('आपके डिवाइस या ब्राउज़र में टेक्स्ट-टू-स्पीच (Voice Reader) सपोर्ट उपलब्ध नहीं है।');
    return;
  }

  if (activeQuiz.isSpeaking) {
    stopSpeaking();
    return;
  }

  stopSpeaking();
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;

  // Bilingual text preparation for clear Indian voice narration
  let speechText = q.q.replace(/\\[English:/gi, ' In English: ').replace(/[\\[\\]]/g, '');
  speechText += '. Options are: ';
  q.options.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const cleanOpt = opt.replace(/^[A-D]\\)\\s*/, '');
    speechText += \`Option \${letter}: \${cleanOpt}. \`;
  });

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.rate = 0.92; // Clear test cadence
  utterance.pitch = 1.0;

  try {
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('IN') || v.lang.startsWith('en-IN'));
    if (indVoice) utterance.voice = indVoice;
  } catch (e) {}

  utterance.onstart = function () {
    activeQuiz.isSpeaking = true;
    const speechBtn = document.getElementById('quizSpeechBtn');
    if (speechBtn) {
      speechBtn.classList.add('speech-pulse');
      speechBtn.innerHTML = '<span>⏹️</span> <span class="hidden sm:inline">Stop Voice</span>';
    }
  };

  utterance.onend = function () {
    stopSpeaking();
  };

  utterance.onerror = function () {
    stopSpeaking();
  };

  window.speechSynthesis.speak(utterance);
}`;

const newSpeech = `// Global Voice Question Reader controller & Sweet Natural Indian Voices (सुरीली आवाज)
let quizVoiceGender = 'female';
try {
  quizVoiceGender = localStorage.getItem('sarkari_quiz_voice_gender') || 'female';
} catch (e) {}

function updateQuizVoiceUI() {
  const btn = document.getElementById('quizVoiceToggleBtn');
  const icon = document.getElementById('quizVoiceIcon');
  const label = document.getElementById('quizVoiceLabel');
  if (!btn) return;
  if (quizVoiceGender === 'male') {
    if (icon) icon.textContent = '👨';
    if (label) label.textContent = 'मधुर आवाज (पुरुष)';
    btn.title = 'Switch to Sweet Female Voice (सुरीली महिला आवाज चुनें)';
  } else {
    if (icon) icon.textContent = '👩';
    if (label) label.textContent = 'सुरीली आवाज (महिला)';
    btn.title = 'Switch to Sweet Male Voice (मधुर पुरुष आवाज चुनें)';
  }
}

function toggleQuizVoiceGender() {
  quizVoiceGender = quizVoiceGender === 'female' ? 'male' : 'female';
  try {
    localStorage.setItem('sarkari_quiz_voice_gender', quizVoiceGender);
  } catch (e) {}
  updateQuizVoiceUI();
  // If actively speaking, restart with the newly selected voice
  if (activeQuiz && activeQuiz.isSpeaking) {
    stopSpeaking();
    setTimeout(toggleSpeakActiveQuestion, 150);
  }
}

function getSweetVoice(langCode = 'hi-IN', gender = 'female') {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  const isFemale = gender === 'female';
  const isHindi = langCode.toLowerCase().startsWith('hi');

  if (isHindi) {
    const hiVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith('hi'));
    if (hiVoices.length > 0) {
      const femaleHiNames = ['swara', 'kalpana', 'google हिन्दी', 'google hindi', 'kavya', 'female'];
      const maleHiNames = ['madhur', 'hemant', 'google hindi male', 'male'];
      const prefNames = isFemale ? femaleHiNames : maleHiNames;
      for (const name of prefNames) {
        const found = hiVoices.find(v => v.name.toLowerCase().includes(name));
        if (found) return found;
      }
      return hiVoices[0];
    }
  }

  // English / Indian accent voices:
  const inEngVoices = voices.filter(v => v.lang && (v.lang.toLowerCase().includes('in') || v.lang.toLowerCase().startsWith('en')));
  if (inEngVoices.length > 0) {
    const femaleEngNames = ['neerja', 'swara', 'zira', 'natasha', 'samantha', 'victoria', 'female'];
    const maleEngNames = ['prabhat', 'madhur', 'ravi', 'david', 'george', 'male'];
    const prefNames = isFemale ? femaleEngNames : maleEngNames;
    for (const name of prefNames) {
      const found = inEngVoices.find(v => v.name.toLowerCase().includes(name));
      if (found) return found;
    }
    return inEngVoices[0];
  }

  return voices[0] || null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = function() {
    updateQuizVoiceUI();
  };
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  const speechBtn = document.getElementById('quizSpeechBtn');
  if (speechBtn) {
    speechBtn.classList.remove('speech-pulse');
    const label = typeof getTranslation === 'function' ? getTranslation('quiz_listen_btn') : 'Listen Question';
    speechBtn.innerHTML = \`<span>🔊</span> <span class="hidden sm:inline">\${label}</span>\`;
  }
  if (activeQuiz) activeQuiz.isSpeaking = false;
}

function toggleSpeakActiveQuestion() {
  if (!('speechSynthesis' in window)) {
    alert('आपके डिवाइस या ब्राउज़र में टेक्स्ट-टू-स्पीच (Voice Reader) सपोर्ट उपलब्ध नहीं है।');
    return;
  }

  if (activeQuiz.isSpeaking) {
    stopSpeaking();
    return;
  }

  stopSpeaking();
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;

  // Segment-based speech: Clean Hindi + English without dropping Devanagari!
  const isFemale = quizVoiceGender === 'female';
  const speechSegments = [];

  let rawQ = q.q;
  let hindiQ = rawQ;
  let englishQ = '';

  if (rawQ.includes('\\n[English:')) {
    const parts = rawQ.split('\\n[English:');
    hindiQ = parts[0].trim();
    englishQ = parts[1].replace(/\\]\\s*$/, '').trim();
  } else if (rawQ.includes('\\n[')) {
    const parts = rawQ.split('\\n[');
    hindiQ = parts[0].trim();
    englishQ = parts[1].replace(/\\]\\s*$/, '').trim();
  }

  // 1. Primary question statement (Hindi)
  if (hindiQ) {
    speechSegments.push({
      text: \`प्रश्न \${activeQuiz.currentIndex + 1}: \${hindiQ}\`,
      lang: /[\\u0900-\\u097F]/.test(hindiQ) ? 'hi-IN' : 'en-IN'
    });
  }

  // 2. English question statement (if present)
  if (englishQ) {
    speechSegments.push({
      text: \`In English: \${englishQ}\`,
      lang: 'en-IN'
    });
  }

  // 3. Options
  q.options.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const cleanOpt = opt.replace(/^[A-D]\\)\\s*/, '');
    if (cleanOpt.includes(' / ')) {
      const [hiOpt, enOpt] = cleanOpt.split(' / ');
      speechSegments.push({
        text: \`विकल्प \${letter}: \${hiOpt}. In English: \${enOpt}.\`,
        lang: 'hi-IN'
      });
    } else {
      const isDev = /[\\u0900-\\u097F]/.test(cleanOpt);
      speechSegments.push({
        text: \`विकल्प \${letter}: \${cleanOpt}.\`,
        lang: isDev ? 'hi-IN' : 'en-IN'
      });
    }
  });

  const speechBtn = document.getElementById('quizSpeechBtn');
  if (speechBtn) {
    speechBtn.classList.add('speech-pulse');
    speechBtn.innerHTML = '<span>⏹️</span> <span class="hidden sm:inline">Stop Voice</span>';
  }
  activeQuiz.isSpeaking = true;

  // Queue utterances sequentially with pleasant, sweet pitch and cadence
  speechSegments.forEach((seg, idx) => {
    const utt = new SpeechSynthesisUtterance(seg.text);
    utt.lang = seg.lang;
    const voice = getSweetVoice(seg.lang, quizVoiceGender);
    if (voice) utt.voice = voice;
    utt.rate = 0.93; // Smooth natural cadence
    utt.pitch = isFemale ? 1.06 : 0.95; // Sweet pitch

    if (idx === speechSegments.length - 1) {
      utt.onend = stopSpeaking;
      utt.onerror = stopSpeaking;
    }
    window.speechSynthesis.speak(utt);
  });
}`;

// 2. Update renderActiveQuestion question and options rendering
const oldRender = `    if (q.q.includes('\\n[English:')) {
      const parts = q.q.split('\\n[English:');
      const hindiPart = parts[0].trim();
      const engPart = parts[1].replace(/\\]\\s*$/, '').trim();
      qElem.innerHTML = \`
        <div class="text-base sm:text-xl font-black text-slate-900 leading-snug">\${hindiPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 mt-2 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 py-1.5 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 tracking-wider block">\${subLabel}</span>
          <div>\${engPart}</div>
        </div>
      \`;
    } else if (q.q.includes('\\n[')) {
      const parts = q.q.split('\\n[');
      const hindiPart = parts[0].trim();
      const engPart = parts[1].replace(/\\]\\s*$/, '').trim();
      qElem.innerHTML = \`
        <div class="text-base sm:text-xl font-black text-slate-900 leading-snug">\${hindiPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 mt-2 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 py-1.5 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 tracking-wider block">\${subLabel}</span>
          <div>\${engPart}</div>
        </div>
      \`;
    } else {
      qElem.textContent = q.q;
    }
  }

  // Options Container
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const isAnswered = activeQuiz.userAnswers.hasOwnProperty(activeQuiz.currentIndex);
  const selectedOption = isAnswered ? activeQuiz.userAnswers[activeQuiz.currentIndex] : null;

  optionsContainer.innerHTML = q.options.map((opt, optIndex) => {
    let styleClasses = "bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-800 cursor-pointer shadow-sm";
    let icon = \`<span class="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-600 text-xs shrink-0">\${String.fromCharCode(65 + optIndex)}</span>\`;

    if (isAnswered) {
      if (optIndex === q.correct) {
        // Correct Answer is ALWAYS Green
        styleClasses = "bg-emerald-600 text-white border-2 border-emerald-700 shadow-md font-bold";
        icon = \`<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✓</span>\`;
      } else if (optIndex === selectedOption) {
        // Wrong Answer selected by user is RED
        styleClasses = "bg-rose-600 text-white border-2 border-rose-700 shadow-md font-bold";
        icon = \`<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✕</span>\`;
      } else {
        styleClasses = "bg-slate-50 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed";
      }
    }

    return \`
      <button 
        type="button" 
        \${isAnswered ? 'disabled' : ''} 
        onclick="handleOptionSelection(\${optIndex})"
        class="w-full text-left p-4 rounded-2xl transition duration-200 flex items-center space-x-3 \${styleClasses}">
        \${icon}
        <span class="text-sm font-semibold leading-snug">\${opt.replace(/^[A-D]\\)\\s*/, '')}</span>
      </button>
    \`;
  }).join('');`;

const newRender = `    if (q.q.includes('\\n[English:')) {
      const parts = q.q.split('\\n[English:');
      const hindiPart = parts[0].trim();
      const engPart = parts[1].replace(/\\]\\s*$/, '').trim();
      qElem.innerHTML = \`
        <div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">\${hindiPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-1.5 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">\${subLabel}</span>
          <div>\${engPart}</div>
        </div>
      \`;
    } else if (q.q.includes('\\n[')) {
      const parts = q.q.split('\\n[');
      const hindiPart = parts[0].trim();
      const engPart = parts[1].replace(/\\]\\s*$/, '').trim();
      qElem.innerHTML = \`
        <div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">\${hindiPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-1.5 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">\${subLabel}</span>
          <div>\${engPart}</div>
        </div>
      \`;
    } else {
      qElem.innerHTML = \`<div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">\${q.q}</div>\`;
    }
  }

  // Options Container (Bilingual formatting & High Contrast in Light/Dark Mode)
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const isAnswered = activeQuiz.userAnswers.hasOwnProperty(activeQuiz.currentIndex);
  const selectedOption = isAnswered ? activeQuiz.userAnswers[activeQuiz.currentIndex] : null;

  optionsContainer.innerHTML = q.options.map((opt, optIndex) => {
    let styleClasses = "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm";
    let icon = \`<span class="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-700 dark:text-slate-200 text-xs shrink-0">\${String.fromCharCode(65 + optIndex)}</span>\`;

    if (isAnswered) {
      if (optIndex === q.correct) {
        // Correct Answer is ALWAYS Green
        styleClasses = "bg-emerald-600 dark:bg-emerald-600 text-white border-2 border-emerald-700 dark:border-emerald-500 shadow-md font-bold";
        icon = \`<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✓</span>\`;
      } else if (optIndex === selectedOption) {
        // Wrong Answer selected by user is RED
        styleClasses = "bg-rose-600 dark:bg-rose-600 text-white border-2 border-rose-700 dark:border-rose-500 shadow-md font-bold";
        icon = \`<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✕</span>\`;
      } else {
        styleClasses = "bg-slate-50 dark:bg-slate-850 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 opacity-60 cursor-not-allowed";
      }
    }

    const cleanOpt = opt.replace(/^[A-D]\\)\\s*/, '');
    let optDisplay = cleanOpt;
    if (cleanOpt.includes(' / ')) {
      const parts = cleanOpt.split(' / ');
      const hi = parts[0].trim();
      const en = parts.slice(1).join(' / ').trim();
      if (isAnswered && (optIndex === q.correct || optIndex === selectedOption)) {
        optDisplay = \`<span>\${hi}</span> <span class="opacity-90 font-normal text-xs sm:text-sm">/ \${en}</span>\`;
      } else {
        optDisplay = \`<span class="font-bold text-slate-900 dark:text-slate-100">\${hi}</span> <span class="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">/ \${en}</span>\`;
      }
    }

    return \`
      <button 
        type="button" 
        \${isAnswered ? 'disabled' : ''} 
        onclick="handleOptionSelection(\${optIndex})"
        class="w-full text-left p-4 rounded-2xl transition duration-200 flex items-center space-x-3 \${styleClasses}">
        \${icon}
        <span class="text-sm font-semibold leading-snug">\${optDisplay}</span>
      </button>
    \`;
  }).join('');`;

// 3. Update initQuiz to call updateQuizVoiceUI
const oldInit = `function initQuiz() {
  populateExamDropdown();
  setupDynamicEventListeners();
  updateDependentDropdowns();
  restoreQuizStateIfActive();
}`;

const newInit = `function initQuiz() {
  populateExamDropdown();
  setupDynamicEventListeners();
  updateDependentDropdowns();
  restoreQuizStateIfActive();
  updateQuizVoiceUI();
}`;

function replaceBlock(label, o, n) {
  const normO = o.replace(/\r\n/g, '\n');
  const normCode = code.replace(/\r\n/g, '\n');
  if (normCode.includes(normO)) {
    code = normCode.replace(normO, n.replace(/\r\n/g, '\n'));
    console.log(`[PASS] Replaced: ${label}`);
  } else {
    console.log(`[FAIL] Could not find: ${label}`);
  }
}

replaceBlock('Speech section', oldSpeech, newSpeech);
replaceBlock('RenderActiveQuestion section', oldRender, newRender);
replaceBlock('InitQuiz section', oldInit, newInit);

fs.writeFileSync('public/js/quiz.js', code, 'utf8');
console.log('Successfully updated public/js/quiz.js!');

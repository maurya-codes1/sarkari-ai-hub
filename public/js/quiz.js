// Interactive Live Mock Test & Universal CBT Engine for SarkariAI Hub
// Phase 4: Full Exam Blueprint-Driven Mode vs Flexible Practice Set Mode
// Multi-section architecture, countdown timer with auto-submit, zero-duplicate guarantee,
// separate language layers, numerical/subjective hooks, and fail-safe offline fallback.

let activeQuiz = window.activeQuiz = {
  mode: 'FULL_EXAM', // 'FULL_EXAM' or 'PRACTICE'
  exam: 'ssc-gd',
  board: '',
  subject: 'all',
  size: 30,
  negativeMarkingRate: 0.25,
  isSpeaking: false,
  questions: [],
  sections: [],
  currentSectionIndex: 0,
  currentIndex: 0,
  userAnswers: {},
  reviewFlags: {},
  visited: {},
  sessionId: null,
  blueprint: null,
  timerMode: 'COUNTDOWN',
  totalSeconds: 3600,
  secondsRemaining: 3600,
  secondsElapsed: 0,
  timerInterval: null,
  isRunning: false
};

// Global Dual Voice Engine (Dedicated Male and Female Sound Buttons)
let activeSpeakingGender = null;

function updateQuizVoiceButtons() {
  const maleBtn = document.getElementById('quizMaleVoiceBtn');
  const femaleBtn = document.getElementById('quizFemaleVoiceBtn');
  const maleIcon = document.getElementById('quizMaleVoiceIcon');
  const femaleIcon = document.getElementById('quizFemaleVoiceIcon');
  const maleLabel = document.getElementById('quizMaleVoiceLabel');
  const femaleLabel = document.getElementById('quizFemaleVoiceLabel');

  const maleText = typeof getTranslation === 'function' ? getTranslation('quiz_male_sound_btn') : 'Male Voice';
  const femaleText = typeof getTranslation === 'function' ? getTranslation('quiz_female_sound_btn') : 'Female Voice';
  const stopText = typeof getTranslation === 'function' ? getTranslation('quiz_stop_voice_btn') : 'Stop Voice';

  if (maleBtn) {
    if (activeQuiz && activeQuiz.isSpeaking && activeSpeakingGender === 'male') {
      maleBtn.className = "text-xs font-black text-white bg-sky-600 hover:bg-sky-700 border border-sky-500 px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-md active:scale-95 speech-pulse ring-2 ring-sky-300";
      if (maleIcon) maleIcon.textContent = '⏹️';
      if (maleLabel) maleLabel.textContent = stopText;
      maleBtn.title = stopText;
    } else {
      maleBtn.className = "text-xs font-bold text-sky-800 dark:text-sky-300 hover:text-white hover:bg-sky-600 bg-sky-50 dark:bg-slate-800 dark:border-sky-800 border border-sky-300 px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-sm active:scale-95";
      if (maleIcon) maleIcon.textContent = '👨';
      if (maleLabel) maleLabel.textContent = maleText;
      maleBtn.title = maleText;
    }
  }

  if (femaleBtn) {
    if (activeQuiz && activeQuiz.isSpeaking && activeSpeakingGender === 'female') {
      femaleBtn.className = "text-xs font-black text-white bg-pink-600 hover:bg-pink-700 border border-pink-500 px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-md active:scale-95 speech-pulse ring-2 ring-pink-300";
      if (femaleIcon) femaleIcon.textContent = '⏹️';
      if (femaleLabel) femaleLabel.textContent = stopText;
      femaleBtn.title = stopText;
    } else {
      femaleBtn.className = "text-xs font-bold text-pink-700 dark:text-pink-300 hover:text-white hover:bg-pink-600 bg-pink-50 dark:bg-slate-800 dark:border-pink-800 border border-pink-300 px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-sm active:scale-95";
      if (femaleIcon) femaleIcon.textContent = '👩';
      if (femaleLabel) femaleLabel.textContent = femaleText;
      femaleBtn.title = femaleText;
    }
  }
}

// Backward-compatible alias
function updateQuizVoiceUI() {
  updateQuizVoiceButtons();
}

function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
  if (activeQuiz) activeQuiz.isSpeaking = false;
  activeSpeakingGender = null;
  updateQuizVoiceButtons();
}

function getSweetVoice(langCode = 'hi-IN', gender = 'female') {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  const isFemale = gender === 'female';
  const prefix = (langCode || 'hi').substring(0, 2).toLowerCase();

  // 1. Try matching the exact requested language
  const langVoices = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(prefix));
  if (langVoices.length > 0) {
    const femaleNames = ['female', 'swara', 'kalpana', 'kavya', 'neerja', 'zira', 'samantha', 'victoria', 'aarohi', 'pallavi', 'shruti', 'dhwani', 'tanishaa', 'sapna', 'sobhana', 'gul'];
    const maleNames = ['male', 'madhur', 'hemant', 'prabhat', 'david', 'george', 'ravi', 'manohar', 'valluvar', 'mohan', 'niranjan', 'bashkar', 'gagan', 'midhun', 'salman'];
    const prefNames = isFemale ? femaleNames : maleNames;
    for (const name of prefNames) {
      const found = langVoices.find(v => (v.name || '').toLowerCase().includes(name));
      if (found) return found;
    }
    return langVoices[0];
  }

  // 2. Fallback to Indian English or Hindi
  const inVoices = voices.filter(v => v.lang && (v.lang.toLowerCase().includes('in') || v.lang.toLowerCase().startsWith('en') || v.lang.toLowerCase().startsWith('hi')));
  if (inVoices.length > 0) {
    const femaleNames = ['female', 'neerja', 'swara', 'zira', 'samantha', 'victoria'];
    const maleNames = ['male', 'prabhat', 'madhur', 'ravi', 'david', 'george'];
    const prefNames = isFemale ? femaleNames : maleNames;
    for (const name of prefNames) {
      const found = inVoices.find(v => (v.name || '').toLowerCase().includes(name));
      if (found) return found;
    }
    return inVoices[0];
  }

  return voices[0] || null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = function() {
    updateQuizVoiceButtons();
  };
}

function speakActiveQuestionGender(gender = 'female') {
  if (!('speechSynthesis' in window)) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('Your browser does not support text-to-speech voice output.');
    } else {
      alert('Text-to-speech voice output is not supported on this browser.');
    }
    return;
  }

  // If already speaking the clicked gender, clicking again pauses/stops it
  if (activeQuiz.isSpeaking && activeSpeakingGender === gender) {
    stopSpeaking();
    return;
  }

  // Otherwise stop previous voice and start new gender voice
  stopSpeaking();
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;

  activeQuiz.isSpeaking = true;
  activeSpeakingGender = gender;
  updateQuizVoiceButtons();

  const isFemale = gender === 'female';
  const currLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
  const isEn = currLang === 'en';

  const speechSegments = [];
  const qNum = activeQuiz.currentIndex + 1;

  if (isEn) {
    const textQ = q.secondaryQ || q.q || '';
    if (textQ) {
      speechSegments.push({
        text: `Question ${qNum}: ${textQ.replace(/\n\[English:.*\]/g, '')}`,
        lang: 'en-IN'
      });
    }
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const cleanOpt = opt.replace(/^[A-D]\)\s*/, '');
        speechSegments.push({
          text: `Option ${letter}: ${cleanOpt}.`,
          lang: 'en-IN'
        });
      });
    }
  } else {
    const rawQ = q.q || '';
    if (rawQ) {
      speechSegments.push({
        text: `प्रश्न ${qNum}: ${rawQ.replace(/\n\[English:.*\]/g, '')}`,
        lang: /[ऀ-ॿ]/.test(rawQ) ? 'hi-IN' : 'en-IN'
      });
    }
    if (q.secondaryQ && q.secondaryQ !== rawQ) {
      speechSegments.push({
        text: `In English: ${q.secondaryQ}`,
        lang: 'en-IN'
      });
    }
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        const cleanOpt = opt.replace(/^[A-D]\)\s*/, '');
        speechSegments.push({
          text: `विकल्प ${letter}: ${cleanOpt}.`,
          lang: /[ऀ-ॿ]/.test(cleanOpt) ? 'hi-IN' : 'en-IN'
        });
      });
    }
  }

  speechSegments.forEach((seg, idx) => {
    const utt = new SpeechSynthesisUtterance(seg.text);
    utt.lang = seg.lang;
    const voice = getSweetVoice(seg.lang, gender);
    if (voice) utt.voice = voice;
    utt.rate = isFemale ? 0.94 : 0.92;
    utt.pitch = isFemale ? 1.15 : 0.85;

    if (idx === speechSegments.length - 1) {
      utt.onend = stopSpeaking;
      utt.onerror = stopSpeaking;
    }
    window.speechSynthesis.speak(utt);
  });
}

function toggleSpeakActiveQuestion() {
  speakActiveQuestionGender(activeSpeakingGender || 'female');
}


// ----------------------------------------------------
// Mode Switcher: 3 Distinct Mock Modes
// Mode A: SUBJECT_PRACTICE
// Mode B: ALL_SUBJECTS_PRACTICE
// Mode C: FULL_EXAM_PATTERN (or FULL_EXAM)
// ----------------------------------------------------
function switchQuizMode(mode) {
  activeQuiz.mode = mode;
  const subjBtn = document.getElementById('quizModeSubjectBtn');
  const allSubjBtn = document.getElementById('quizModeAllSubjectsBtn');
  const fullBtn = document.getElementById('quizModeFullExamBtn');
  const bpCard = document.getElementById('quizBlueprintSummaryCard');
  const pracCard = document.getElementById('quizPracticeControlsContainer');
  const subjSelectContainer = document.getElementById('quizSubjectSelect')?.parentElement;

  const activeClass = "px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-sm";
  const inactiveClass = "px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 transition cursor-pointer";

  if (subjBtn) subjBtn.className = (mode === 'SUBJECT_PRACTICE') ? activeClass : inactiveClass;
  if (allSubjBtn) allSubjBtn.className = (mode === 'ALL_SUBJECTS_PRACTICE') ? activeClass : inactiveClass;
  if (fullBtn) fullBtn.className = (mode === 'FULL_EXAM_PATTERN' || mode === 'FULL_EXAM') ? activeClass : inactiveClass;

  if (mode === 'FULL_EXAM_PATTERN' || mode === 'FULL_EXAM') {
    if (bpCard) bpCard.classList.remove('hidden');
    if (pracCard) pracCard.classList.add('hidden');
    updateBlueprintSummaryDisplay();
  } else if (mode === 'SUBJECT_PRACTICE') {
    if (bpCard) bpCard.classList.add('hidden');
    if (pracCard) pracCard.classList.remove('hidden');
    if (subjSelectContainer) subjSelectContainer.classList.remove('hidden');
  } else if (mode === 'ALL_SUBJECTS_PRACTICE') {
    if (bpCard) bpCard.classList.add('hidden');
    if (pracCard) pracCard.classList.remove('hidden');
    if (subjSelectContainer) subjSelectContainer.classList.add('hidden');
  }
}

// ----------------------------------------------------
// Blueprint Summary Hydration & Display
// ----------------------------------------------------
async function updateBlueprintSummaryDisplay() {
  const examSelect = document.getElementById('quizExamSelect');
  if (!examSelect) return;
  const examId = examSelect.value || 'ssc-gd';

  try {
    const res = await fetch(`/api/v2/mock/modes/${examId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.modes) {
        const modeC = data.modes.find(m => m.mode === 'FULL_EXAM_PATTERN');
        if (modeC && modeC.blueprintSummary) {
          renderBlueprintSummaryCard({
            ...modeC.blueprintSummary,
            isAvailable: modeC.isAvailable,
            status: modeC.status,
            shortageDetails: modeC.shortageDetails
          });
          return;
        }
      }
    }
  } catch (e) {
    console.warn('[Quiz] Could not fetch remote mock modes, falling back to blueprint endpoint', e.message);
  }

  try {
    const res = await fetch(`/api/v2/exams/${examId}/blueprint`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blueprint) {
        renderBlueprintSummaryCard(data.blueprint);
        return;
      }
    }
  } catch (e) {
    console.warn('[Quiz] Could not fetch remote blueprint, resolving locally', e.message);
  }

  // Local fallback blueprint preview
  const localBp = resolveLocalBlueprint(examId);
  renderBlueprintSummaryCard(localBp);
}

const OFFICIAL_EXAM_BLUEPRINTS = {
  "ssc-gd": {
    name: "SSC GD Constable Official Pattern (4 Sections)",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 80,
    questions_to_attempt: 80,
    total_marks: 160,
    is_negative_marking: true,
    negative_value: 0.25, // Official Para 12.1.2: 0.25 mark per wrong answer
    sections: [
      { name: "Part A: General Intelligence & Reasoning", question_count: 20, marks_correct: 2, negative_value: 0.25 },
      { name: "Part B: General Knowledge & Awareness", question_count: 20, marks_correct: 2, negative_value: 0.25 },
      { name: "Part C: Elementary Mathematics", question_count: 20, marks_correct: 2, negative_value: 0.25 },
      { name: "Part D: Hindi / English Language", question_count: 20, marks_correct: 2, negative_value: 0.25 }
    ]
  },
  "ssc-cgl": {
    name: "SSC CGL / CHSL Tier-1 Official Pattern (4 Sections)",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 200,
    is_negative_marking: true,
    negative_value: 0.50,
    sections: [
      { name: "General Intelligence & Reasoning", question_count: 25, marks_correct: 2, negative_value: 0.50 },
      { name: "General Awareness", question_count: 25, marks_correct: 2, negative_value: 0.50 },
      { name: "Quantitative Aptitude", question_count: 25, marks_correct: 2, negative_value: 0.50 },
      { name: "English Comprehension", question_count: 25, marks_correct: 2, negative_value: 0.50 }
    ]
  },
  "ssc-mts": {
    name: "SSC MTS & Havaldar Pattern (Session 1 & 2)",
    verification_status: "VERIFIED",
    duration_minutes: 90,
    total_questions: 90,
    questions_to_attempt: 90,
    total_marks: 270,
    is_negative_marking: true,
    negative_value: 1.00,
    sections: [
      { name: "Session 1: Numerical Ability & Math", question_count: 20, marks_correct: 3, negative_value: 0.0 },
      { name: "Session 1: Reasoning Ability", question_count: 20, marks_correct: 3, negative_value: 0.0 },
      { name: "Session 2: General Awareness", question_count: 25, marks_correct: 3, negative_value: 1.0 },
      { name: "Session 2: English Language", question_count: 25, marks_correct: 3, negative_value: 1.0 }
    ]
  },
  "railway-alp": {
    name: "Railway ALP & Technician CBT-1 Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 75,
    questions_to_attempt: 75,
    total_marks: 75,
    is_negative_marking: true,
    negative_value: 0.33,
    sections: [
      { name: "Mathematics", question_count: 20, marks_correct: 1, negative_value: 0.33 },
      { name: "General Intelligence & Reasoning", question_count: 25, marks_correct: 1, negative_value: 0.33 },
      { name: "General Science", question_count: 20, marks_correct: 1, negative_value: 0.33 },
      { name: "General Awareness & Current Affairs", question_count: 10, marks_correct: 1, negative_value: 0.33 }
    ]
  },
  "railway-group-d": {
    name: "Railway Group D & RRB NTPC CBT-1 Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 90,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.33,
    sections: [
      { name: "General Science", question_count: 25, marks_correct: 1, negative_value: 0.33 },
      { name: "Mathematics", question_count: 25, marks_correct: 1, negative_value: 0.33 },
      { name: "General Intelligence & Reasoning", question_count: 30, marks_correct: 1, negative_value: 0.33 },
      { name: "General Awareness & Current Affairs", question_count: 20, marks_correct: 1, negative_value: 0.33 }
    ]
  },
  "upsc-cse": {
    name: "UPSC Civil Services Prelims GS Paper-1",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 200,
    is_negative_marking: true,
    negative_value: 0.66,
    sections: [
      { name: "General Studies Paper-1 (History, Polity, Geo, Eco, Env)", question_count: 100, marks_correct: 2, negative_value: 0.66 }
    ]
  },
  "upsc-nda": {
    name: "UPSC NDA & NA Written Examination",
    verification_status: "VERIFIED",
    duration_minutes: 150,
    total_questions: 120,
    questions_to_attempt: 120,
    total_marks: 300,
    is_negative_marking: true,
    negative_value: 0.83,
    sections: [
      { name: "Mathematics (Paper-1)", question_count: 120, marks_correct: 2.5, negative_value: 0.83 }
    ]
  },
  "army-agniveer": {
    name: "Indian Army Agniveer Common Entrance Exam (CEE)",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 50,
    questions_to_attempt: 50,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.50,
    sections: [
      { name: "General Knowledge", question_count: 15, marks_correct: 2, negative_value: 0.5 },
      { name: "General Science", question_count: 15, marks_correct: 2, negative_value: 0.5 },
      { name: "Mathematics", question_count: 15, marks_correct: 2, negative_value: 0.5 },
      { name: "Logical Reasoning", question_count: 5, marks_correct: 2, negative_value: 0.5 }
    ]
  },
  "iaf-agniveer": {
    name: "Indian Air Force Agniveer Vayu Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 45,
    total_questions: 50,
    questions_to_attempt: 50,
    total_marks: 50,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "English", question_count: 20, marks_correct: 1, negative_value: 0.25 },
      { name: "Reasoning & General Awareness (RAGA)", question_count: 30, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "navy-agniveer": {
    name: "Indian Navy Agniveer (SSR / MR) Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "Science", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "Mathematics", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "English", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "General Awareness", question_count: 25, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "banking": {
    name: "Banking (IBPS / SBI Clerk & PO Prelims)",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "English Language", question_count: 30, marks_correct: 1, negative_value: 0.25 },
      { name: "Quantitative Aptitude", question_count: 35, marks_correct: 1, negative_value: 0.25 },
      { name: "Reasoning Ability", question_count: 35, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "up-police": {
    name: "UP Police Constable Written Examination",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 300,
    is_negative_marking: true,
    negative_value: 0.50,
    sections: [
      { name: "General Knowledge (सामान्य ज्ञान)", question_count: 38, marks_correct: 2, negative_value: 0.5 },
      { name: "General Hindi (सामान्य हिन्दी)", question_count: 37, marks_correct: 2, negative_value: 0.5 },
      { name: "Numerical & Mental Ability (संख्यात्मक एवं मानसिक योग्यता)", question_count: 38, marks_correct: 2, negative_value: 0.5 },
      { name: "Mental Aptitude & Reasoning (मानसिक अभिरुचि एवं तार्किक क्षमता)", question_count: 37, marks_correct: 2, negative_value: 0.5 }
    ]
  },
  "bihar-police": {
    name: "Bihar Police Constable (CSBC) Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Hindi, English & General Studies", question_count: 50, marks_correct: 1, negative_value: 0.0 },
      { name: "Science, Mathematics & Social Science", question_count: 50, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "delhi-police": {
    name: "Delhi Police Constable (Executive) Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 90,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "GK & Current Affairs", question_count: 50, marks_correct: 1, negative_value: 0.25 },
      { name: "Reasoning", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "Numerical Ability", question_count: 15, marks_correct: 1, negative_value: 0.25 },
      { name: "Computer Fundamentals", question_count: 10, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "rajasthan-police": {
    name: "Rajasthan Police Constable Written Examination",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 150,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "Reasoning & Computer Fundamentals", question_count: 60, marks_correct: 1, negative_value: 0.25 },
      { name: "General Knowledge & Crimes against Women/Children", question_count: 45, marks_correct: 1, negative_value: 0.25 },
      { name: "Rajasthan General Knowledge & Culture", question_count: 45, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "mp-police": {
    name: "MP Police Constable Written Examination",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "General Knowledge & Reasoning", question_count: 40, marks_correct: 1, negative_value: 0.0 },
      { name: "Intellectual Ability & Mental Aptitude", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Science & Simple Arithmetic", question_count: 30, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "haryana-police": {
    name: "Haryana Police Constable (HSSC Knowledge Test)",
    verification_status: "VERIFIED",
    duration_minutes: 105,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 94.5,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "General Studies, Agriculture, Animal Husbandry & Reasoning", question_count: 100, marks_correct: 0.945, negative_value: 0.0 }
    ]
  },
  "wb-police": {
    name: "West Bengal Police Constable (WBP Preliminary)",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 85,
    questions_to_attempt: 85,
    total_marks: 85,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "General Awareness & GK", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "English Language", question_count: 10, marks_correct: 1, negative_value: 0.25 },
      { name: "Elementary Mathematics", question_count: 25, marks_correct: 1, negative_value: 0.25 },
      { name: "Reasoning & Logical Analysis", question_count: 25, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "maharashtra-police": {
    name: "Maharashtra Police Constable (पोलीस शिपाई लेखी परीक्षा)",
    verification_status: "VERIFIED",
    duration_minutes: 90,
    total_questions: 100,
    questions_to_attempt: 100,
    total_marks: 100,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "अंकगणित (Arithmetic)", question_count: 25, marks_correct: 1, negative_value: 0.0 },
      { name: "सामान्य ज्ञान व चालू घडामोडी (GK & Current Affairs)", question_count: 25, marks_correct: 1, negative_value: 0.0 },
      { name: "बुद्धिमत्ता चाचणी (Reasoning)", question_count: 25, marks_correct: 1, negative_value: 0.0 },
      { name: "मराठी व्याकरण (Marathi Grammar)", question_count: 25, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "nta-neet": {
    name: "NEET UG 2026 Official Pattern (NTA)",
    verification_status: "VERIFIED",
    duration_minutes: 200,
    total_questions: 200,
    questions_to_attempt: 180,
    total_marks: 720,
    is_negative_marking: true,
    negative_value: 1.00,
    sections: [
      { name: "Physics (Sec A 35 Qs + Sec B 15 Qs)", question_count: 50, questions_to_attempt: 45, marks_correct: 4, negative_value: 1.0 },
      { name: "Chemistry (Sec A 35 Qs + Sec B 15 Qs)", question_count: 50, questions_to_attempt: 45, marks_correct: 4, negative_value: 1.0 },
      { name: "Biology - Botany & Zoology (Sec A 70 Qs + Sec B 30 Qs)", question_count: 100, questions_to_attempt: 90, marks_correct: 4, negative_value: 1.0 }
    ]
  },
  "nta-jee": {
    name: "JEE Main 2026 Official Pattern (NTA)",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 90,
    questions_to_attempt: 75,
    total_marks: 300,
    is_negative_marking: true,
    negative_value: 1.00,
    sections: [
      { name: "Physics (20 MCQs + 10 NVQs - Attempt 5 NVQs)", question_count: 30, questions_to_attempt: 25, marks_correct: 4, negative_value: 1.0 },
      { name: "Chemistry (20 MCQs + 10 NVQs - Attempt 5 NVQs)", question_count: 30, questions_to_attempt: 25, marks_correct: 4, negative_value: 1.0 },
      { name: "Mathematics (20 MCQs + 10 NVQs - Attempt 5 NVQs)", question_count: 30, questions_to_attempt: 25, marks_correct: 4, negative_value: 1.0 }
    ]
  },
  "nta-cuet": {
    name: "NTA CUET UG Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 45,
    total_questions: 50,
    questions_to_attempt: 40,
    total_marks: 200,
    is_negative_marking: true,
    negative_value: 1.00,
    sections: [
      { name: "Subject Domain Test (Attempt 40 of 50 Qs)", question_count: 50, questions_to_attempt: 40, marks_correct: 5, negative_value: 1.0 }
    ]
  },
  "clat-law": {
    name: "CLAT (Common Law Admission Test) Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 120,
    total_questions: 120,
    questions_to_attempt: 120,
    total_marks: 120,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "English Language", question_count: 24, marks_correct: 1, negative_value: 0.25 },
      { name: "Current Affairs & General Knowledge", question_count: 30, marks_correct: 1, negative_value: 0.25 },
      { name: "Legal Reasoning", question_count: 32, marks_correct: 1, negative_value: 0.25 },
      { name: "Logical Reasoning", question_count: 24, marks_correct: 1, negative_value: 0.25 },
      { name: "Quantitative Techniques", question_count: 10, marks_correct: 1, negative_value: 0.25 }
    ]
  },
  "ctet": {
    name: "CTET (Central Teacher Eligibility Test - Paper 1 & 2)",
    verification_status: "VERIFIED",
    duration_minutes: 150,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 150,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Child Development & Pedagogy (बाल विकास)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Mathematics (गणित)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Environmental Studies (पर्यावरण अध्ययन)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Language I (भाषा १)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Language II (भाषा २)", question_count: 30, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "up-tet": {
    name: "UP TET & Super TET Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 150,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 150,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Child Development & Teaching Method", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Hindi (हिंदी भाषा)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "English / Sanskrit / Urdu", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Mathematics (गणित)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Environmental Studies (पर्यावरण अध्ययन)", question_count: 30, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "bpsc-tre": {
    name: "Bihar BPSC TRE (Teacher Recruitment Exam)",
    verification_status: "VERIFIED",
    duration_minutes: 150,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 150,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Part 1: Qualifying Language (English & Hindi/Urdu/Bangla)", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Part 2: General Studies", question_count: 40, marks_correct: 1, negative_value: 0.0 },
      { name: "Part 3: Subject Specific", question_count: 80, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "reet": {
    name: "REET (Rajasthan Eligibility Exam for Teachers)",
    verification_status: "VERIFIED",
    duration_minutes: 150,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 150,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Child Development & Pedagogy", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Language 1", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Language 2", question_count: 30, marks_correct: 1, negative_value: 0.0 },
      { name: "Mathematics & Science / Social Studies", question_count: 60, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "ugc-net": {
    name: "UGC NET / CSIR NET Official Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 150,
    questions_to_attempt: 150,
    total_marks: 300,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Paper 1: Teaching & Research Aptitude", question_count: 50, marks_correct: 2, negative_value: 0.0 },
      { name: "Paper 2: Selected Subject Specialization", question_count: 100, marks_correct: 2, negative_value: 0.0 }
    ]
  },
  "board-10th": {
    name: "Class 10th Secondary Board Official Blueprint",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 80,
    questions_to_attempt: 80,
    total_marks: 80,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Objective Section (बहुविकल्पीय खंड)", question_count: 40, marks_correct: 1, negative_value: 0.0 },
      { name: "Descriptive / Short Answer Section", question_count: 40, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "board-12th-science": {
    name: "Class 12th Senior Secondary Science Stream",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 70,
    questions_to_attempt: 70,
    total_marks: 70,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Section A: Objective Questions (वस्तुनिष्ठ प्रश्न)", question_count: 35, marks_correct: 1, negative_value: 0.0 },
      { name: "Section B: Theoretical & Numerical Assessment", question_count: 35, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "board-12th-commerce": {
    name: "Class 12th Commerce Stream Board Blueprint",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 80,
    questions_to_attempt: 80,
    total_marks: 80,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Section A: Objective Assessment", question_count: 40, marks_correct: 1, negative_value: 0.0 },
      { name: "Section B: Subjective & Practical Problems", question_count: 40, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "board-12th-arts": {
    name: "Class 12th Arts / Humanities Stream Blueprint",
    verification_status: "VERIFIED",
    duration_minutes: 180,
    total_questions: 80,
    questions_to_attempt: 80,
    total_marks: 80,
    is_negative_marking: false,
    negative_value: 0.00,
    sections: [
      { name: "Section A: Objective Questions", question_count: 40, marks_correct: 1, negative_value: 0.0 },
      { name: "Section B: Analytical & Essay Problems", question_count: 40, marks_correct: 1, negative_value: 0.0 }
    ]
  },
  "all-india-mix": {
    name: "All-India Competition Master Mix Mock Pattern",
    verification_status: "VERIFIED",
    duration_minutes: 60,
    total_questions: 50,
    questions_to_attempt: 50,
    total_marks: 100,
    is_negative_marking: true,
    negative_value: 0.25,
    sections: [
      { name: "Quantitative Aptitude & Mathematics", question_count: 15, marks_correct: 2, negative_value: 0.25 },
      { name: "General Intelligence & Reasoning", question_count: 15, marks_correct: 2, negative_value: 0.25 },
      { name: "General Studies, Science & Current Affairs", question_count: 20, marks_correct: 2, negative_value: 0.25 }
    ]
  }
};

function resolveLocalBlueprint(examId) {
  if (OFFICIAL_EXAM_BLUEPRINTS[examId]) {
    return OFFICIAL_EXAM_BLUEPRINTS[examId];
  }
  if (examId.includes('board') || examId.includes('10th') || examId.includes('12th')) {
    return OFFICIAL_EXAM_BLUEPRINTS['board-10th'];
  }
  if (examId.includes('police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['up-police'];
  }
  if (examId.includes('rrb') || examId.includes('railway')) {
    return OFFICIAL_EXAM_BLUEPRINTS['railway-alp'];
  }
  if (examId.includes('ssc')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ssc-gd'];
  }
  return OFFICIAL_EXAM_BLUEPRINTS['all-india-mix'];
}

function renderBlueprintSummaryCard(bp) {
  if (!bp) return;

  const examSelect = document.getElementById('quizExamSelect');
  const selectedExamId = (examSelect && examSelect.value) ? examSelect.value : 'ssc-gd';
  const fallbackBp = resolveLocalBlueprint(selectedExamId);

  // Normalize camelCase and snake_case properties
  const bpName = bp.blueprintName || bp.name || fallbackBp.name || 'Official Examination Pattern';
  const duration = bp.durationMinutes || bp.duration_minutes || fallbackBp.duration_minutes || 60;
  const totalQuestions = bp.totalQuestions !== undefined ? bp.totalQuestions : (bp.total_questions !== undefined ? bp.total_questions : fallbackBp.total_questions);
  const toAttempt = bp.questionsToAttempt !== undefined ? bp.questionsToAttempt : (bp.questions_to_attempt !== undefined ? bp.questions_to_attempt : (fallbackBp.questions_to_attempt || totalQuestions));
  const totalMarks = bp.totalMarks !== undefined ? bp.totalMarks : (bp.total_marks !== undefined ? bp.total_marks : (fallbackBp.total_marks || (totalQuestions * 2)));

  // Negative Marking resolution
  let isNegative = false;
  if (bp.isNegativeMarking !== undefined) isNegative = Boolean(bp.isNegativeMarking);
  else if (bp.is_negative_marking !== undefined) isNegative = Boolean(bp.is_negative_marking);
  else if (bp.hasNegativeMarking !== undefined) isNegative = Boolean(bp.hasNegativeMarking);
  else isNegative = Boolean(fallbackBp.is_negative_marking);

  let negVal = 0.0;
  if (isNegative) {
    if (bp.negativeValue !== undefined && bp.negativeValue !== null) negVal = Number(bp.negativeValue);
    else if (bp.negative_value !== undefined && bp.negative_value !== null) negVal = Number(bp.negative_value);
    else if (bp.marksWrong !== undefined && bp.marksWrong !== null) negVal = Number(bp.marksWrong);
    else if (bp.sections && bp.sections[0] && (bp.sections[0].negativeValue || bp.sections[0].marksWrong)) {
      negVal = Number(bp.sections[0].negativeValue || bp.sections[0].marksWrong);
    } else {
      negVal = fallbackBp.negative_value !== undefined ? fallbackBp.negative_value : 0.25;
    }
  }

  const badgeEl = document.getElementById('quizBpBadge');
  const nameEl = document.getElementById('quizBpName');
  const durEl = document.getElementById('quizBpDuration');
  const qEl = document.getElementById('quizBpQuestions');
  const marksEl = document.getElementById('quizBpMarks');
  const negEl = document.getElementById('quizBpNegative');
  const sectionsListEl = document.getElementById('quizBpSectionsList');

  if (badgeEl) {
    badgeEl.className = "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40";
    badgeEl.textContent = "Verified Official Pattern";
  }

  if (nameEl) nameEl.textContent = bpName;
  if (durEl) durEl.textContent = `${duration} Mins (Countdown)`;
  
  const attemptStr = toAttempt < totalQuestions 
    ? `${totalQuestions} Qs (Attempt ${toAttempt})` 
    : `${totalQuestions} Qs (Attempt All)`;
  if (qEl) qEl.textContent = attemptStr;

  if (marksEl) marksEl.textContent = `${totalMarks} Marks`;

  if (negEl) {
    if (!isNegative || negVal === 0) {
      negEl.textContent = "0.00 (No Negative Marking)";
      negEl.className = "text-sm font-black text-emerald-400";
    } else {
      negEl.textContent = `-${negVal.toFixed(2)} Mark per Wrong`;
      negEl.className = "text-sm font-black text-rose-400";
    }
  }

  const sectionsToRender = (Array.isArray(bp.sections) && bp.sections.length > 0) ? bp.sections : (fallbackBp.sections || []);
  if (sectionsListEl && Array.isArray(sectionsToRender)) {
    sectionsListEl.innerHTML = sectionsToRender.map(s => {
      const qCount = s.questionCount || s.question_count || s.questionsToAttempt || s.questions_to_attempt || 20;
      const sName = s.name || s.subjectName || 'Section';
      return `
        <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
          <span class="font-bold">${sName}</span>
          <span class="text-amber-300 font-black">(${qCount} Qs)</span>
        </span>
      `;
    }).join('');
  }
}

// ----------------------------------------------------
// Initialization & Dynamic Events
// ----------------------------------------------------
function initQuiz() {
  populateExamDropdown();
  setupDynamicEventListeners();
  updateDependentDropdowns();
  updateBlueprintSummaryDisplay();
  restoreQuizStateIfActive();
  updateQuizVoiceUI();
}

function populateExamDropdown() {
  const examSelect = document.getElementById('quizExamSelect');
  if (!examSelect || typeof EXAMS_CONFIG === 'undefined') return;

  const categories = [
    { key: 'central', label: '🏛️ Central & Defence Exams (SSC, Railway, Defence, UPSC, Banking)' },
    { key: 'police', label: '👮 State Police Bharti (UP, Bihar, Delhi, Raj, MP, Har, WB, MH)' },
    { key: 'entrance', label: '🎓 National Entrance Tests (NEET, JEE, CUET, CLAT)' },
    { key: 'teaching', label: '👨‍🏫 Teaching, TET & State PSCs (CTET, UPTET, BPSC, REET, NET)' },
    { key: 'board', label: '🏫 All-India Board Examinations (20 State & Central Boards)' },
    { key: 'master', label: '🎯 All-India Master Practice Mix' }
  ];

  let html = '';
  categories.forEach(cat => {
    const list = EXAMS_CONFIG.filter(e => (e.category === cat.key) || (cat.key === 'board' && e.isBoard));
    if (list.length > 0) {
      html += `<optgroup label="${cat.label}">`;
      list.forEach(e => {
        html += `<option value="${e.id}">${e.name}</option>`;
      });
      html += `</optgroup>`;
    }
  });

  examSelect.innerHTML = html;
}

function setupDynamicEventListeners() {
  const examSelect = document.getElementById('quizExamSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  const boardSelect = document.getElementById('quizBoardSelect');
  const sizeSelect = document.getElementById('quizSizeSelect');
  const startBtn = document.getElementById('startQuizBtn');

  if (examSelect) {
    examSelect.addEventListener('change', () => {
      updateDependentDropdowns();
      updateBlueprintSummaryDisplay();
    });
  }

  if (boardSelect) {
    boardSelect.addEventListener('change', () => {
      updateBoardSubjects();
      updateBlueprintSummaryDisplay();
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', startNewQuiz);
  }
}

function updateBoardSubjects() {
  const examSelect = document.getElementById('quizExamSelect');
  const boardSelect = document.getElementById('quizBoardSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  if (!examSelect || !subjectSelect) return;
  const examId = examSelect.value;
  const boardId = boardSelect ? boardSelect.value : 'bseb';

  if (typeof getSubjectsForBoard === 'function' && (examId === 'board-10th' || examId.startsWith('board-12th') || examId === 'board-12th')) {
    const subjects = getSubjectsForBoard(examId, boardId);
    subjectSelect.innerHTML = subjects.map(s => `
      <option value="${s.id}">${s.name}</option>
    `).join('');
  }
}

function updateDependentDropdowns() {
  const examSelect = document.getElementById('quizExamSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  const boardContainer = document.getElementById('quizBoardContainer');
  const boardSelect = document.getElementById('quizBoardSelect');

  if (!examSelect || !subjectSelect || typeof EXAMS_CONFIG === 'undefined') return;

  const selectedExamId = examSelect.value;
  const examObj = EXAMS_CONFIG.find(e => e.id === selectedExamId) || EXAMS_CONFIG[0];

  if (examObj.isBoard) {
    if (boardContainer) boardContainer.classList.remove('hidden');
    if (boardSelect && examObj.boards) {
      boardSelect.innerHTML = examObj.boards.map(b => `
        <option value="${b.id}">${b.name}</option>
      `).join('');
      updateBoardSubjects();
    }
  } else {
    if (boardContainer) boardContainer.classList.add('hidden');
    if (Array.isArray(examObj.subjects)) {
      subjectSelect.innerHTML = examObj.subjects.map(s => `
        <option value="${s.id}">${s.name}</option>
      `).join('');
    }
  }

  updateQuizPaidPdfBanner();
}

// ----------------------------------------------------
// Start Test (API-Driven with Safe Local Fallback)
// ----------------------------------------------------
async function startNewQuiz() {
  const examSelect = document.getElementById('quizExamSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  const boardSelect = document.getElementById('quizBoardSelect');
  const sizeSelect = document.getElementById('quizSizeSelect');
  const diffSelect = document.getElementById('quizDifficultySelect');
  const timerSelect = document.getElementById('quizTimerModeSelect');

  const examId = examSelect ? examSelect.value : 'ssc-gd';
  const subjectId = subjectSelect ? subjectSelect.value : 'all';
  const boardId = boardSelect ? boardSelect.value : '';
  const testMode = activeQuiz.mode || 'FULL_EXAM_PATTERN';
  const requestedCount = sizeSelect ? parseInt(sizeSelect.value, 10) : 30;
  const difficulty = diffSelect ? diffSelect.value : 'MIXED';
  const timerMode = timerSelect ? timerSelect.value : 'COUNTDOWN';

  let sessionData = null;

  try {
    const res = await fetch('/api/v2/mock/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId,
        testMode,
        requestedCount,
        subjectId,
        difficulty,
        timerMode
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.success && data.status === 'FULL_EXAM_UNAVAILABLE') {
        alert(`⚠️ ${data.message || 'Full Exam pattern simulation is currently unavailable.'}\n\nPlease practice in Subject-wise Practice or All Subjects Practice mode!`);
        return;
      }
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        sessionData = data;
      }
    }
  } catch (err) {
    console.warn('[Quiz] Remote mock/start failed, activating safe local fallback:', err.message);
  }

  // Fallback to local question generation if offline or API unavailable
  if (!sessionData) {
    sessionData = generateLocalSessionFallback(examId, subjectId, requestedCount, boardId, testMode);
  }

  if (!sessionData.questions || sessionData.questions.length === 0) {
    alert('इस विषय के लिए प्रश्न लोड हो रहे हैं। कृपया दूसरा विकल्प चुनें।');
    return;
  }

  // Populate active quiz state
  activeQuiz.mode = testMode;
  activeQuiz.sessionId = sessionData.sessionId;
  activeQuiz.exam = examId;
  activeQuiz.board = boardId;
  activeQuiz.subject = subjectId;
  activeQuiz.blueprint = sessionData.blueprint || resolveLocalBlueprint(examId);
  activeQuiz.sections = sessionData.sections || [];
  activeQuiz.questions = sessionData.questions;
  activeQuiz.currentIndex = 0;
  activeQuiz.currentSectionIndex = 0;
  activeQuiz.userAnswers = {};
  activeQuiz.reviewFlags = {};
  activeQuiz.visited = { 0: true };
  activeQuiz.isRunning = true;

  const bp = activeQuiz.blueprint;
  activeQuiz.hasNegativeMarking = Boolean(bp.isNegativeMarking !== undefined ? bp.isNegativeMarking : (bp.is_negative_marking !== undefined ? bp.is_negative_marking : false));
  activeQuiz.negativeMarkingRate = activeQuiz.hasNegativeMarking
    ? Number(bp.negativeValue !== undefined ? bp.negativeValue : (bp.negative_value !== undefined ? bp.negative_value : (bp.sections && bp.sections[0] ? (bp.sections[0].negativeValue || bp.sections[0].marksWrong || 0.25) : 0.25)))
    : 0.0;

  // Setup timer
  const timerConfig = sessionData.timerConfig || { mode: 'COUNTDOWN', durationMinutes: bp.durationMinutes || bp.duration_minutes || 60, totalSeconds: (bp.durationMinutes || bp.duration_minutes || 60) * 60 };
  activeQuiz.timerMode = timerConfig.mode || 'COUNTDOWN';
  activeQuiz.totalSeconds = timerConfig.totalSeconds || 3600;
  activeQuiz.secondsRemaining = activeQuiz.totalSeconds;
  activeQuiz.secondsElapsed = 0;

  if (window.location.hash !== '#tool/quiz') {
    window.location.hash = '#tool/quiz';
  }

  // Start timer interval
  if (activeQuiz.timerInterval) clearInterval(activeQuiz.timerInterval);
  activeQuiz.timerInterval = setInterval(() => {
    activeQuiz.secondsElapsed++;
    if (activeQuiz.timerMode === 'COUNTDOWN') {
      activeQuiz.secondsRemaining--;
      if (activeQuiz.secondsRemaining <= 0) {
        clearInterval(activeQuiz.timerInterval);
        submitQuiz(true); // AUTO SUBMIT ON EXPIRATION
        return;
      }
    }
    updateQuizTimerDisplay();
    saveActiveQuizState();
  }, 1000);

  // Switch UI view
  document.getElementById('quizSetupCard')?.classList.add('hidden');
  document.getElementById('quizScorecardModal')?.classList.add('hidden');
  document.getElementById('quizActiveArena')?.classList.remove('hidden');

  renderSectionTabs();
  renderQuestionPalette();
  renderActiveQuestion();
  updateQuizTimerDisplay();
  saveActiveQuizState();
}

function generateLocalSessionFallback(examId, subjectId, requestedCount, boardId, testMode) {
  let localQuestions = [];
  if (typeof getFilteredQuestions === 'function') {
    localQuestions = getFilteredQuestions(examId, subjectId, requestedCount, boardId);
  }

  const localBp = resolveLocalBlueprint(examId);
  const isNeg = Boolean(localBp.is_negative_marking);
  const negVal = isNeg ? (localBp.negative_value !== undefined ? localBp.negative_value : 0.25) : 0.0;
  const marksCorr = (localBp.sections && localBp.sections[0] && localBp.sections[0].marks_correct) || (localBp.total_marks && localBp.total_questions ? (localBp.total_marks / localBp.total_questions) : 1.0);

  const defaultSection = {
    sectionId: 'sec-local-1',
    name: localBp.name || 'General Assessment Section',
    questionCount: localQuestions.length,
    questionsToAttempt: localQuestions.length,
    marksCorrect: marksCorr,
    marksWrong: negVal,
    hasNegativeMarking: isNeg,
    attemptRuleType: 'ATTEMPT_ALL'
  };

  return {
    sessionId: `local-${Date.now()}`,
    testMode,
    blueprint: localBp,
    sections: [defaultSection],
    questions: localQuestions.map((q, idx) => ({
      id: q.id || `q-local-${idx}`,
      sectionId: 'sec-local-1',
      sectionName: localBp.name || 'General Assessment Section',
      questionType: 'single_mcq',
      q: q.q,
      secondaryQ: '',
      options: q.options || [],
      correct: q.correct !== undefined ? q.correct : q.ans,
      explanation: q.explanation || '',
      marksCorrect: marksCorr,
      marksWrong: negVal
    })),
    timerConfig: {
      mode: 'COUNTDOWN',
      durationMinutes: localBp.duration_minutes || 60,
      totalSeconds: (localBp.duration_minutes || 60) * 60
    }
  };
}

// ----------------------------------------------------
// Section Tabs & Navigation (Multi-Section Support)
// ----------------------------------------------------
function renderSectionTabs() {
  const tabsContainer = document.getElementById('quizSectionTabs');
  const tabsParent = document.getElementById('quizSectionTabsContainer');
  if (!tabsContainer) return;

  if (!activeQuiz.sections || activeQuiz.sections.length <= 1) {
    if (tabsParent) tabsParent.classList.add('hidden');
    return;
  }

  if (tabsParent) tabsParent.classList.remove('hidden');

  const currentQ = activeQuiz.questions[activeQuiz.currentIndex];
  const activeSectionId = currentQ ? currentQ.sectionId : activeQuiz.sections[0]?.sectionId;

  tabsContainer.innerHTML = activeQuiz.sections.map((sec, idx) => {
    const isCurrent = sec.sectionId === activeSectionId;
    let answeredCount = 0;

    activeQuiz.questions.forEach((q, qIdx) => {
      if (q.sectionId === sec.sectionId && activeQuiz.userAnswers.hasOwnProperty(q.id || qIdx)) {
        answeredCount++;
      }
    });

    const activeClass = isCurrent
      ? "bg-rose-600 text-white font-black shadow-md border-rose-700"
      : "bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border-slate-200";

    return `
      <button 
        type="button" 
        onclick="jumpToSection(${idx})"
        class="shrink-0 px-3.5 py-1.5 rounded-xl border text-xs transition flex items-center space-x-1.5 cursor-pointer ${activeClass}">
        <span>${sec.name}</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isCurrent ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-700'}">
          ${answeredCount}/${sec.questionCount || sec.questionsToAttempt}
        </span>
      </button>
    `;
  }).join('');
}

function jumpToSection(sectionIndex) {
  stopSpeaking();
  const targetSection = activeQuiz.sections[sectionIndex];
  if (!targetSection) return;

  const firstQIdx = activeQuiz.questions.findIndex(q => q.sectionId === targetSection.sectionId);
  if (firstQIdx >= 0) {
    activeQuiz.currentIndex = firstQIdx;
    activeQuiz.visited[firstQIdx] = true;
    renderSectionTabs();
    renderActiveQuestion();
    renderQuestionPalette();
    saveActiveQuizState();
  }
}

// ----------------------------------------------------
// Timer Display
// ----------------------------------------------------
function updateQuizTimerDisplay() {
  const timerElem = document.getElementById('quizLiveTimer');
  if (!timerElem) return;

  if (activeQuiz.timerMode === 'COUNTDOWN') {
    const totalSecs = Math.max(0, activeQuiz.secondsRemaining);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const timeStr = hrs > 0 
      ? `⏱️ ${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `⏱️ ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    timerElem.textContent = timeStr;

    // Pulse red if under 5 minutes
    if (totalSecs < 300) {
      timerElem.className = "font-mono text-xs font-black text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl border border-rose-400 animate-pulse";
    } else {
      timerElem.className = "font-mono text-xs font-black text-slate-800 bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300";
    }
  } else {
    const mins = Math.floor(activeQuiz.secondsElapsed / 60).toString().padStart(2, '0');
    const secs = (activeQuiz.secondsElapsed % 60).toString().padStart(2, '0');
    timerElem.textContent = `⏱️ ${mins}:${secs}`;
    timerElem.className = "font-mono text-xs font-black text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300";
  }
}

// ----------------------------------------------------
// Question Rendering (Bilingual, Options, Numerical, Subjective)
// ----------------------------------------------------
function renderActiveQuestion() {
  stopSpeaking();
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;

  const total = activeQuiz.questions.length;
  const currentNum = activeQuiz.currentIndex + 1;
  const qKey = q.id || activeQuiz.currentIndex;
  activeQuiz.visited[activeQuiz.currentIndex] = true;

  // Header & Progress
  const currLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
  const counterEl = document.getElementById('quizQuestionCounter');
  if (counterEl) {
    counterEl.textContent = currLang === 'en' ? `Question ${currentNum} of ${total}` : `प्रश्न ${currentNum} / ${total}`;
  }
  const pct = Math.round((currentNum / total) * 100);
  document.getElementById('quizProgressBar').style.width = `${pct}%`;

  // Tag Badge
  const tagElem = document.getElementById('quizQuestionTag');
  if (tagElem) {
    const subjBadge = q.subjectName ? `[${q.subjectName}] • ` : '';
    tagElem.textContent = subjBadge + (q.sectionName ? q.sectionName + ' • ' : '') + (q.topic || 'High Yield');
  }

  // Section Banner Update
  const secTitle = document.getElementById('quizActiveSectionTitle');
  const secInstr = document.getElementById('quizActiveSectionInstructions');
  const secBadge = document.getElementById('quizActiveSectionAttemptBadge');
  const currentSec = activeQuiz.sections.find(s => s.sectionId === q.sectionId) || activeQuiz.sections[0];

  if (currentSec) {
    if (secTitle) secTitle.textContent = currentSec.name;
    if (secInstr) secInstr.textContent = currentSec.instructions || `Each question: +${currentSec.marksCorrect || 1} mark.`;
    if (secBadge) {
      if (currentSec.attemptRuleType === 'ATTEMPT_N_OF_M') {
        secBadge.textContent = `Attempt any ${currentSec.questionsToAttempt} of ${currentSec.questionCount} Qs`;
      } else {
        secBadge.textContent = "Attempt All Questions";
      }
    }
  }

  // Bilingual Question Text Rendering
  const qElem = document.getElementById('quizQuestionText');
  if (qElem) {
    const primaryText = q.q || '';
    const secondaryText = q.secondaryQ || '';

    if (secondaryText && secondaryText !== primaryText) {
      qElem.innerHTML = `
        <div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">${primaryText}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2.5 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-2 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">In English / Dual Medium:</span>
          <div>${secondaryText}</div>
        </div>
      `;
    } else if (primaryText.includes('\n[English:')) {
      const parts = primaryText.split('\n[English:');
      const hindiPart = parts[0].trim();
      const engPart = parts[1].replace(/\]\s*$/, '').trim();
      qElem.innerHTML = `
        <div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">${hindiPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2.5 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-2 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">In English / Dual Medium:</span>
          <div>${engPart}</div>
        </div>
      `;
    } else {
      qElem.innerHTML = `<div class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">${primaryText}</div>`;
    }
  }

  // Controls for Question Types
  const optContainer = document.getElementById('quizOptionsContainer');
  const numContainer = document.getElementById('quizNumericalContainer');
  const subContainer = document.getElementById('quizSubjectiveContainer');

  const isAnswered = activeQuiz.userAnswers.hasOwnProperty(qKey);
  const selectedAnswer = isAnswered ? activeQuiz.userAnswers[qKey] : null;

  if (q.questionType === 'numerical') {
    if (optContainer) optContainer.classList.add('hidden');
    if (subContainer) subContainer.classList.add('hidden');
    if (numContainer) {
      numContainer.classList.remove('hidden');
      const numInput = document.getElementById('quizNumericalInput');
      if (numInput) numInput.value = selectedAnswer !== null ? selectedAnswer : '';
    }
  } else if (q.questionType === 'short_answer' || q.questionType === 'long_answer') {
    if (optContainer) optContainer.classList.add('hidden');
    if (numContainer) numContainer.classList.add('hidden');
    if (subContainer) {
      subContainer.classList.remove('hidden');
      const subInput = document.getElementById('quizSubjectiveInput');
      if (subInput) subInput.value = selectedAnswer !== null ? selectedAnswer : '';
    }
  } else {
    // Standard MCQ
    if (numContainer) numContainer.classList.add('hidden');
    if (subContainer) subContainer.classList.add('hidden');
    if (optContainer) {
      optContainer.classList.remove('hidden');
      optContainer.innerHTML = (q.options || []).map((opt, optIndex) => {
        let styleClasses = "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm";
        let icon = `<span class="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-700 dark:text-slate-200 text-xs shrink-0">${String.fromCharCode(65 + optIndex)}</span>`;

        if (isAnswered) {
          if (optIndex === selectedAnswer) {
            styleClasses = "bg-rose-600 dark:bg-rose-600 text-white border-2 border-rose-700 dark:border-rose-500 shadow-md font-bold ring-2 ring-rose-400";
            icon = `<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✓</span>`;
          } else {
            styleClasses = "bg-slate-50 dark:bg-slate-850 text-slate-500 border border-slate-200 dark:border-slate-800 opacity-75";
          }
        }

        const cleanOpt = opt.replace(/^[A-D]\)\s*/, '');
        let optDisplay = cleanOpt;
        if (cleanOpt.includes(' / ')) {
          const parts = cleanOpt.split(' / ');
          const hi = parts[0].trim();
          const en = parts.slice(1).join(' / ').trim();
          optDisplay = `<span class="font-bold">${hi}</span> <span class="text-xs sm:text-sm font-semibold opacity-90">/ ${en}</span>`;
        }

        return `
          <button 
            type="button" 
            onclick="handleOptionSelection(${optIndex})"
            class="w-full text-left p-4 rounded-2xl transition duration-150 flex items-center space-x-3 active:scale-98 ${styleClasses}">
            ${icon}
            <span class="text-sm font-semibold leading-snug">${optDisplay}</span>
          </button>
        `;
      }).join('');
    }
  }

  // Explanation Card (Hidden during CBT mock for integrity)
  const expCard = document.getElementById('quizExplanationCard');
  if (expCard) expCard.classList.add('hidden');

  // Navigation Buttons
  const prevBtn = document.getElementById('quizPrevBtn');
  const nextBtn = document.getElementById('quizNextBtn');

  if (prevBtn) {
    prevBtn.disabled = activeQuiz.currentIndex === 0;
    const prevText = typeof getTranslation === 'function' ? getTranslation('quiz_prev_btn') : '← Previous';
    prevBtn.innerHTML = `<span>${prevText}</span>`;
  }
  if (nextBtn) {
    if (activeQuiz.currentIndex === total - 1) {
      const finishText = typeof getTranslation === 'function' ? getTranslation('quiz_finish_btn') : 'Finish Test & See Scorecard';
      nextBtn.innerHTML = `<span>${finishText}</span>`;
      nextBtn.onclick = () => submitQuiz(false);
    } else {
      const nextText = typeof getTranslation === 'function' ? getTranslation('quiz_next_btn') : 'Next Question →';
      nextBtn.innerHTML = `<span>${nextText}</span>`;
      nextBtn.onclick = nextQuizQuestion;
    }
  }

  updateMarkReviewButtonDisplay();
  updateLiveScoreStats();
  renderSectionTabs();
  renderQuestionPalette();
  updateBookmarkButtonDisplay();
  updateQuizVoiceButtons();
}

function handleOptionSelection(optionIndex) {
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;
  const qKey = q.id || activeQuiz.currentIndex;

  // Enforce ATTEMPT_N_OF_M limit check
  const currentSec = activeQuiz.sections.find(s => s.sectionId === q.sectionId);
  if (currentSec && currentSec.attemptRuleType === 'ATTEMPT_N_OF_M') {
    let attemptedInSection = 0;
    activeQuiz.questions.forEach((item, idx) => {
      if (item.sectionId === q.sectionId && activeQuiz.userAnswers.hasOwnProperty(item.id || idx)) {
        attemptedInSection++;
      }
    });

    if (!activeQuiz.userAnswers.hasOwnProperty(qKey) && attemptedInSection >= currentSec.questionsToAttempt) {
      if (typeof showAppAlert === 'function') {
    showAppAlert(`इस सेक्शन में आप अधिकतम ${currentSec.questionsToAttempt} प्रश्न ही हल कर सकते हैं। अन्य प्रश्न हल करने हेतु पूर्व का कोई उत्तर 'Clear Response' करें।`, 'Section Limit', '⚠️');
  } else {
    alert(`इस सेक्शन में आप अधिकतम ${currentSec.questionsToAttempt} प्रश्न ही हल कर सकते हैं। अन्य प्रश्न हल करने हेतु पूर्व का कोई उत्तर 'Clear Response' करें।`);
  }
      return;
    }
  }

  activeQuiz.userAnswers[qKey] = optionIndex;
  renderActiveQuestion();
  renderQuestionPalette();
  saveActiveQuizState();
}

function clearCurrentQuestionResponse() {
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;
  const qKey = q.id || activeQuiz.currentIndex;

  if (activeQuiz.userAnswers.hasOwnProperty(qKey)) {
    delete activeQuiz.userAnswers[qKey];
  }
  renderActiveQuestion();
  renderQuestionPalette();
  saveActiveQuizState();
}

function toggleMarkCurrentQuestionForReview() {
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  if (!q) return;
  const qKey = q.id || activeQuiz.currentIndex;

  if (activeQuiz.reviewFlags[qKey]) {
    delete activeQuiz.reviewFlags[qKey];
  } else {
    activeQuiz.reviewFlags[qKey] = true;
  }

  updateMarkReviewButtonDisplay();
  renderQuestionPalette();
  saveActiveQuizState();
}

function updateMarkReviewButtonDisplay() {
  const btn = document.getElementById('quizMarkReviewBtn');
  if (!btn) return;
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  const qKey = q?.id || activeQuiz.currentIndex;

  if (activeQuiz.reviewFlags[qKey]) {
    btn.className = "text-xs font-black text-white bg-purple-600 hover:bg-purple-700 border border-purple-700 px-4 py-3 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm";
    btn.innerHTML = '<span>🟣 Marked for Review</span>';
  } else {
    btn.className = "text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-3 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm";
    btn.innerHTML = '<span>☆ Mark for Review</span>';
  }
}

function saveNumericalAnswer() {
  const input = document.getElementById('quizNumericalInput');
  if (!input) return;
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  const qKey = q?.id || activeQuiz.currentIndex;

  const val = input.value.trim();
  if (val !== '') {
    activeQuiz.userAnswers[qKey] = val;
  } else {
    delete activeQuiz.userAnswers[qKey];
  }
  nextQuizQuestion();
}

function saveSubjectiveAnswer() {
  const input = document.getElementById('quizSubjectiveInput');
  if (!input) return;
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  const qKey = q?.id || activeQuiz.currentIndex;

  const val = input.value.trim();
  if (val !== '') {
    activeQuiz.userAnswers[qKey] = val;
  } else {
    delete activeQuiz.userAnswers[qKey];
  }
  renderQuestionPalette();
  saveActiveQuizState();
  const langSave = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
  const savedMsg = langSave === 'en' ? 'Your response has been saved.' : 'उत्तर सुरक्षित कर लिया गया है।';
  if (typeof showAppAlert === 'function') {
    showAppAlert(savedMsg, 'Save Response', '✅');
  } else {
    alert(savedMsg);
  }
}

function nextQuizQuestion() {
  stopSpeaking();
  if (activeQuiz.currentIndex < activeQuiz.questions.length - 1) {
    activeQuiz.currentIndex++;
    activeQuiz.visited[activeQuiz.currentIndex] = true;
    renderActiveQuestion();
    saveActiveQuizState();
    window.scrollTo({ top: document.getElementById('quizActiveArena').offsetTop - 80, behavior: 'smooth' });
  }
}

function prevQuizQuestion() {
  stopSpeaking();
  if (activeQuiz.currentIndex > 0) {
    activeQuiz.currentIndex--;
    activeQuiz.visited[activeQuiz.currentIndex] = true;
    renderActiveQuestion();
    saveActiveQuizState();
    window.scrollTo({ top: document.getElementById('quizActiveArena').offsetTop - 80, behavior: 'smooth' });
  }
}

function jumpToQuizQuestion(index) {
  stopSpeaking();
  if (index >= 0 && index < activeQuiz.questions.length) {
    activeQuiz.currentIndex = index;
    activeQuiz.visited[index] = true;
    renderActiveQuestion();
    saveActiveQuizState();
  }
}

function updateLiveScoreStats() {
  const total = activeQuiz.questions.length;
  let answered = 0;
  let reviewCount = 0;

  activeQuiz.questions.forEach((q, idx) => {
    const qKey = q.id || idx;
    if (activeQuiz.userAnswers.hasOwnProperty(qKey)) answered++;
    if (activeQuiz.reviewFlags[qKey]) reviewCount++;
  });

  const remaining = total - answered;

  const statElem = document.getElementById('quizLiveStats');
  if (statElem) {
    statElem.innerHTML = `
      <span class="text-emerald-700 dark:text-emerald-400 font-bold">🟢 ${answered} Answered</span>
      <span class="text-slate-300">|</span>
      <span class="text-purple-700 dark:text-purple-400 font-bold">🟣 ${reviewCount} Review</span>
      <span class="text-slate-300">|</span>
      <span class="text-slate-500 font-medium">⏳ ${remaining} Left</span>
    `;
  }
}

// ----------------------------------------------------
// Question Palette (4 High-Contrast Status Indicators)
// ----------------------------------------------------
function renderQuestionPalette() {
  const paletteContainer = document.getElementById('quizPaletteContainer');
  if (!paletteContainer) return;

  paletteContainer.innerHTML = activeQuiz.questions.map((q, idx) => {
    const qKey = q.id || idx;
    const isAnswered = activeQuiz.userAnswers.hasOwnProperty(qKey);
    const isReview = Boolean(activeQuiz.reviewFlags[qKey]);
    const isVisited = Boolean(activeQuiz.visited[idx]);
    const isCurrent = idx === activeQuiz.currentIndex;

    let bg = "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200";

    if (isAnswered && isReview) {
      bg = "bg-purple-600 text-white border-purple-700 ring-2 ring-emerald-400 font-bold";
    } else if (isAnswered) {
      bg = "bg-emerald-600 text-white border-emerald-700 font-bold";
    } else if (isReview) {
      bg = "bg-purple-600 text-white border-purple-700 font-bold";
    } else if (isVisited) {
      bg = "bg-rose-500 text-white border-rose-600 font-bold";
    }

    if (isCurrent) {
      bg += " ring-4 ring-amber-400 scale-105 font-black";
    }

    return `
      <button 
        type="button" 
        onclick="jumpToQuizQuestion(${idx})"
        class="w-8 h-8 rounded-xl border text-xs flex items-center justify-center transition cursor-pointer ${bg}">
        ${idx + 1}
      </button>
    `;
  }).join('');
}

// ----------------------------------------------------
// Submit Test (Server-Side Evaluation & Secure Result)
// ----------------------------------------------------
async function submitQuiz(isAutoSubmit = false) {
  stopSpeaking();
  if (activeQuiz.timerInterval) {
    clearInterval(activeQuiz.timerInterval);
    activeQuiz.timerInterval = null;
  }
  activeQuiz.isRunning = false;

  // If manual submission, ask confirmation via Centered App Modal (NO top browser popup)
  if (!isAutoSubmit) {
    let answered = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (activeQuiz.userAnswers.hasOwnProperty(q.id || idx)) answered++;
    });
    const total = activeQuiz.questions.length;
    const unanswered = total - answered;

    const currLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
    const isEn = currLang === 'en';

    const statsDetail = isEn
      ? `Total Questions: ${total}\nAnswered: ${answered}\nUnanswered: ${unanswered}`
      : `कुल प्रश्न: ${total}\nहल किए: ${answered}\nछोड़े गए: ${unanswered}`;

    const resumeTimer = () => {
      if (activeQuiz.timerMode === 'COUNTDOWN') {
        activeQuiz.timerInterval = setInterval(() => {
          activeQuiz.secondsRemaining--;
          activeQuiz.secondsElapsed++;
          if (activeQuiz.secondsRemaining <= 0) {
            clearInterval(activeQuiz.timerInterval);
            submitQuiz(true);
          }
          updateQuizTimerDisplay();
        }, 1000);
      }
      activeQuiz.isRunning = true;
    };

    if (typeof showAppConfirm === 'function') {
      showAppConfirm({
        type: 'submit_quiz',
        message: statsDetail,
        onConfirm: async () => {
          await finalizeQuizSubmission(false);
        },
        onCancel: () => {
          resumeTimer();
        }
      });
      return;
    } else {
      if (!confirm(`Submit Test?\n\n${statsDetail}`)) {
        resumeTimer();
        return;
      }
    }
  }

  await finalizeQuizSubmission(isAutoSubmit);
}

async function finalizeQuizSubmission(isAutoSubmit = false) {

  try { sessionStorage.removeItem('sarkari_active_quiz'); } catch (e) {}

  let scorecard = null;

  // Try server-side evaluation via persistent database API
  if (activeQuiz.sessionId) {
    try {
      const res = await fetch('/api/v2/mock/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeQuiz.sessionId,
          userAnswers: activeQuiz.userAnswers,
          reviewFlags: Object.keys(activeQuiz.reviewFlags),
          timeSpentSeconds: activeQuiz.secondsElapsed,
          isAutoSubmit: Boolean(isAutoSubmit)
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.scorecard) {
          scorecard = data.scorecard;
        }
      }
    } catch (e) {
      console.warn('[Quiz] Remote submit evaluation failed, running client fallback:', e.message);
    }
  }

  // Client-side fallback scoring if server was unavailable
  if (!scorecard) {
    scorecard = evaluateLocalScorecardFallback(isAutoSubmit);
  }

  displayScorecardUI(scorecard, isAutoSubmit);
}

function evaluateLocalScorecardFallback(isAutoSubmit) {
  let correct = 0;
  let wrong = 0;
  const total = activeQuiz.questions.length;

  activeQuiz.questions.forEach((q, idx) => {
    const qKey = q.id || idx;
    if (activeQuiz.userAnswers.hasOwnProperty(qKey)) {
      if (activeQuiz.userAnswers[qKey] === q.correct) correct++;
      else wrong++;
    }
  });

  const attempted = Object.keys(activeQuiz.userAnswers).length;
  const skipped = total - attempted;

  const bp = activeQuiz.blueprint || resolveLocalBlueprint(activeQuiz.exam || 'ssc-gd');
  const marksPerCorrect = (bp.sections && bp.sections[0] && bp.sections[0].marks_correct)
    ? Number(bp.sections[0].marks_correct)
    : (bp.total_marks && bp.total_questions ? (bp.total_marks / bp.total_questions) : 1.0);

  const hasNeg = Boolean(activeQuiz.hasNegativeMarking !== undefined ? activeQuiz.hasNegativeMarking : bp.is_negative_marking);
  const negRate = hasNeg ? (activeQuiz.negativeMarkingRate !== undefined ? Number(activeQuiz.negativeMarkingRate) : (bp.negative_value || 0.25)) : 0.0;
  const penalty = (hasNeg && negRate > 0) ? parseFloat((wrong * negRate).toFixed(2)) : 0.00;

  const grossMarks = parseFloat((correct * marksPerCorrect).toFixed(2));
  const maxMarks = bp.total_marks || parseFloat((total * marksPerCorrect).toFixed(2));
  const netScore = Math.max(0, parseFloat((grossMarks - penalty).toFixed(2)));
  const scorePct = maxMarks > 0 ? Math.round((netScore / maxMarks) * 100) : 0;
  const accuracyPct = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  return {
    isAutoSubmit,
    summary: {
      totalQuestions: total,
      attempted,
      unattempted: skipped,
      correct,
      wrong,
      grossMarks,
      negativeMarksDeducted: penalty,
      netScore,
      maxMarks,
      percentage: scorePct,
      accuracy: accuracyPct,
      timeSpentFormatted: `${Math.floor(activeQuiz.secondsElapsed / 60)}m ${activeQuiz.secondsElapsed % 60}s`,
      verdictBadge: scorePct >= 70 ? "🏆 Merit List Top Ranker!" : (scorePct >= 40 ? "⚡ Qualified / Good Effort" : "⚠️ Re-attempt Recommended"),
      verdictClass: scorePct >= 70 ? "from-emerald-600 to-teal-700" : (scorePct >= 40 ? "from-amber-500 to-orange-600" : "from-rose-600 to-orange-700"),
      verdictDesc: scorePct >= 70 ? "शानदार प्रदर्शन! आपका चयन सुनिश्चित है।" : "अभ्यास जारी रखें।"
    },
    sections: []
  };
}

function displayScorecardUI(scorecard, isAutoSubmit) {
  const sum = scorecard.summary;

  // Auto Expired Banner
  const expBanner = document.getElementById('scorecardExpiredBanner');
  if (expBanner) {
    if (isAutoSubmit || scorecard.isAutoSubmit) {
      expBanner.classList.remove('hidden');
    } else {
      expBanner.classList.add('hidden');
    }
  }

  // Summary fields
  const pctEl = document.getElementById('scorecardPct');
  if (pctEl) pctEl.textContent = `${sum.percentage}%`;

  const rawEl = document.getElementById('scorecardRaw');
  if (rawEl) rawEl.textContent = `${sum.netScore} / ${sum.maxMarks} Marks`;

  const descEl = document.getElementById('scorecardDesc');
  if (descEl) descEl.textContent = sum.verdictDesc;

  const corrEl = document.getElementById('scorecardCorrectCount');
  if (corrEl) corrEl.textContent = sum.correct;

  const wrgEl = document.getElementById('scorecardWrongCount');
  if (wrgEl) wrgEl.textContent = sum.wrong;

  const skipEl = document.getElementById('scorecardSkippedCount');
  if (skipEl) skipEl.textContent = sum.unattempted;

  const penEl = document.getElementById('scorecardPenalty');
  if (penEl) penEl.textContent = sum.negativeMarksDeducted > 0 ? `-${sum.negativeMarksDeducted}` : '0.00';

  const accEl = document.getElementById('scorecardAccuracy');
  if (accEl) accEl.textContent = `${sum.accuracy}%`;

  const timeEl = document.getElementById('scorecardTimeTaken');
  if (timeEl) timeEl.textContent = sum.timeSpentFormatted;

  const badgeEl = document.getElementById('scorecardVerdictBadge');
  if (badgeEl) {
    badgeEl.textContent = sum.verdictBadge;
    badgeEl.className = `inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black text-white bg-gradient-to-r ${sum.verdictClass} shadow-md`;
  }

  const netElem = document.getElementById('scorecardNetScore');
  if (netElem) netElem.textContent = `${sum.netScore} / ${sum.maxMarks}`;

  // Multi-Section Breakdown Table
  const secContainer = document.getElementById('scorecardSectionBreakdownContainer');
  const secRows = document.getElementById('scorecardSectionRows');
  if (secContainer && secRows) {
    if (Array.isArray(scorecard.sections) && scorecard.sections.length > 0) {
      secContainer.classList.remove('hidden');
      secRows.innerHTML = scorecard.sections.map(s => `
        <tr class="hover:bg-slate-50">
          <td class="p-2.5 font-bold">${s.sectionName || s.name}</td>
          <td class="p-2.5 text-center font-semibold">${s.questionCount}</td>
          <td class="p-2.5 text-center font-semibold">${s.attempted}</td>
          <td class="p-2.5 text-center text-emerald-700 font-bold">${s.correct}</td>
          <td class="p-2.5 text-center text-rose-700 font-bold">${s.wrong}</td>
          <td class="p-2.5 text-right font-black ${s.netScore >= 0 ? 'text-emerald-700' : 'text-rose-700'}">${s.netScore} / ${s.maxMarks}</td>
        </tr>
      `).join('');
    } else {
      secContainer.classList.add('hidden');
    }
  }

  document.getElementById('quizActiveArena')?.classList.add('hidden');
  document.getElementById('quizScorecardModal')?.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// Reset & Exit Handlers
// ----------------------------------------------------
function resetQuiz() {
  stopSpeaking();
  if (activeQuiz.timerInterval) {
    clearInterval(activeQuiz.timerInterval);
    activeQuiz.timerInterval = null;
  }
  activeQuiz.isRunning = false;
  try { sessionStorage.removeItem('sarkari_active_quiz'); } catch (e) {}
  document.getElementById('quizScorecardModal')?.classList.add('hidden');
  document.getElementById('quizActiveArena')?.classList.add('hidden');
  document.getElementById('quizSetupCard')?.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function exitQuizTest() {
  stopSpeaking();
  if (typeof showAppConfirm === 'function') {
    showAppConfirm({
      type: 'exit_quiz',
      onConfirm: () => {
        resetQuiz();
      }
    });
  } else if (confirm('Are you sure you want to exit the test?')) {
    resetQuiz();
  }
}

// ----------------------------------------------------
// State Persistence (sessionStorage)
// ----------------------------------------------------
function saveActiveQuizState() {
  if (activeQuiz && activeQuiz.isRunning && activeQuiz.questions?.length > 0) {
    const state = {
      mode: activeQuiz.mode,
      sessionId: activeQuiz.sessionId,
      exam: activeQuiz.exam,
      board: activeQuiz.board,
      subject: activeQuiz.subject,
      blueprint: activeQuiz.blueprint,
      sections: activeQuiz.sections,
      questions: activeQuiz.questions,
      currentIndex: activeQuiz.currentIndex,
      userAnswers: activeQuiz.userAnswers,
      reviewFlags: activeQuiz.reviewFlags,
      visited: activeQuiz.visited,
      timerMode: activeQuiz.timerMode,
      totalSeconds: activeQuiz.totalSeconds,
      secondsRemaining: activeQuiz.secondsRemaining,
      secondsElapsed: activeQuiz.secondsElapsed,
      isRunning: true
    };
    try {
      sessionStorage.setItem('sarkari_active_quiz', JSON.stringify(state));
    } catch (e) {}
  }
}

function restoreQuizStateIfActive() {
  try {
    const raw = sessionStorage.getItem('sarkari_active_quiz');
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && saved.isRunning && Array.isArray(saved.questions) && saved.questions.length > 0) {
      activeQuiz.mode = saved.mode || 'FULL_EXAM';
      activeQuiz.sessionId = saved.sessionId || null;
      activeQuiz.exam = saved.exam || 'ssc-gd';
      activeQuiz.board = saved.board || '';
      activeQuiz.subject = saved.subject || 'all';
      activeQuiz.blueprint = saved.blueprint || null;
      activeQuiz.sections = saved.sections || [];
      activeQuiz.questions = saved.questions;
      activeQuiz.currentIndex = saved.currentIndex || 0;
      activeQuiz.userAnswers = saved.userAnswers || {};
      activeQuiz.reviewFlags = saved.reviewFlags || {};
      activeQuiz.visited = saved.visited || { [saved.currentIndex]: true };
      activeQuiz.timerMode = saved.timerMode || 'COUNTDOWN';
      activeQuiz.totalSeconds = saved.totalSeconds || 3600;
      activeQuiz.secondsRemaining = saved.secondsRemaining || 3600;
      activeQuiz.secondsElapsed = saved.secondsElapsed || 0;
      activeQuiz.isRunning = true;

      if (activeQuiz.timerInterval) clearInterval(activeQuiz.timerInterval);
      activeQuiz.timerInterval = setInterval(() => {
        activeQuiz.secondsElapsed++;
        if (activeQuiz.timerMode === 'COUNTDOWN') {
          activeQuiz.secondsRemaining--;
          if (activeQuiz.secondsRemaining <= 0) {
            clearInterval(activeQuiz.timerInterval);
            submitQuiz(true);
            return;
          }
        }
        updateQuizTimerDisplay();
        saveActiveQuizState();
      }, 1000);

      document.getElementById('quizSetupCard')?.classList.add('hidden');
      document.getElementById('quizScorecardModal')?.classList.add('hidden');
      document.getElementById('quizActiveArena')?.classList.remove('hidden');

      renderSectionTabs();
      renderQuestionPalette();
      renderActiveQuestion();
      updateQuizTimerDisplay();
    }
  } catch (e) {
    console.warn('[Quiz] Error restoring quiz state:', e.message);
  }
}

// ----------------------------------------------------
// Bookmarks & Revision Vault (100% Preserved)
// ----------------------------------------------------
function getBookmarkedQuestions() {
  try {
    const raw = localStorage.getItem('sarkari_bookmarked_questions');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveBookmarkedQuestions(list) {
  try {
    localStorage.setItem('sarkari_bookmarked_questions', JSON.stringify(list));
  } catch (e) {}
}

function isCurrentQuestionBookmarked() {
  if (!activeQuiz.questions || !activeQuiz.questions[activeQuiz.currentIndex]) return false;
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  const list = getBookmarkedQuestions();
  return list.some(item => item.q === q.q);
}

function toggleBookmarkCurrentQuestion() {
  if (!activeQuiz.questions || !activeQuiz.questions[activeQuiz.currentIndex]) return;
  const q = activeQuiz.questions[activeQuiz.currentIndex];
  let list = getBookmarkedQuestions();
  const existingIdx = list.findIndex(item => item.q === q.q);

  if (existingIdx >= 0) {
    list.splice(existingIdx, 1);
  } else {
    list.push({ ...q, bookmarkedAt: new Date().toISOString() });
  }
  saveBookmarkedQuestions(list);
  updateBookmarkButtonDisplay();
  if (typeof renderRevisionVault === 'function') renderRevisionVault();
}

function updateBookmarkButtonDisplay() {
  const btn = document.getElementById('quizBookmarkBtn');
  if (!btn) return;
  const isBm = isCurrentQuestionBookmarked();
  const star = document.getElementById('quizBookmarkStar');
  const label = document.getElementById('quizBookmarkLabel');
  const bmKey = isBm ? 'quiz_bookmarked_btn' : 'quiz_bookmark_btn';
  const text = typeof getTranslation === 'function' ? getTranslation(bmKey) : (isBm ? 'Bookmarked' : 'Bookmark');

  if (isBm) {
    btn.className = "text-xs font-black text-amber-900 bg-amber-300 border-2 border-amber-500 px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm active:scale-95";
    if (star) star.textContent = '★';
    if (label) label.textContent = text.replace(/^[★☆]\s*/, '');
    else btn.innerHTML = `<span>★</span> <span class="hidden sm:inline">${text.replace(/^[★☆]\s*/, '')}</span>`;
    btn.title = text;
  } else {
    btn.className = "text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100 dark:hover:bg-slate-700 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm active:scale-95";
    if (star) star.textContent = '☆';
    if (label) label.textContent = text.replace(/^[★☆]\s*/, '');
    else btn.innerHTML = `<span>☆</span> <span class="hidden sm:inline">${text.replace(/^[★☆]\s*/, '')}</span>`;
    btn.title = text;
  }
}

function startRevisionQuiz() {
  const bookmarks = getBookmarkedQuestions();
  if (!bookmarks || bookmarks.length === 0) {
    const langRev = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
    const msg = langRev === 'en'
      ? 'Your Revision Vault is currently empty!\n\nClick the Bookmark button (☆) on any difficult questions during your mock tests to save them here for revision.'
      : 'आपकी रिवीजन तिजोरी अभी खाली है!\n\nकठिन प्रश्नों पर दिए गए Bookmark (☆) बटन पर क्लिक करके उन्हें यहाँ सेव करें।';
    if (typeof showAppAlert === 'function') {
      showAppAlert(msg, 'Revision Vault', '⭐');
    } else {
      alert(msg);
    }
    return;
  }
  activeQuiz.mode = 'PRACTICE';
  activeQuiz.sessionId = `rev-${Date.now()}`;
  activeQuiz.questions = JSON.parse(JSON.stringify(bookmarks));
  activeQuiz.sections = [{ sectionId: 'sec-rev', name: 'Revision Vault', questionCount: bookmarks.length, questionsToAttempt: bookmarks.length, marksCorrect: 1.0, marksWrong: 0.25, hasNegativeMarking: true }];
  activeQuiz.currentIndex = 0;
  activeQuiz.userAnswers = {};
  activeQuiz.reviewFlags = {};
  activeQuiz.visited = { 0: true };
  activeQuiz.timerMode = 'STOPWATCH';
  activeQuiz.secondsElapsed = 0;
  activeQuiz.isRunning = true;

  if (activeQuiz.timerInterval) clearInterval(activeQuiz.timerInterval);
  activeQuiz.timerInterval = setInterval(() => {
    activeQuiz.secondsElapsed++;
    updateQuizTimerDisplay();
  }, 1000);

  document.getElementById('quizSetupCard')?.classList.add('hidden');
  document.getElementById('quizScorecardModal')?.classList.add('hidden');
  document.getElementById('quizActiveArena')?.classList.remove('hidden');

  renderSectionTabs();
  renderQuestionPalette();
  renderActiveQuestion();
}

function renderRevisionVault() {
  const container = document.getElementById('revisionVaultContainer');
  if (!container) return;
  const bookmarks = getBookmarkedQuestions();
  const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : (localStorage.getItem('sarkariai_lang') || 'hi');
  const isEn = lang === 'en';

  if (bookmarks.length === 0) {
    const emptyTitle = isEn ? 'Your Revision Vault is Empty' : 'आपकी रिवीजन तिजोरी अभी खाली है';
    const emptySub = isEn
      ? 'Click the Bookmark button (☆) on any difficult questions during your mock tests to save them here for revision.'
      : 'कठिन प्रश्नों के ऊपर दिए गए Bookmark (☆) बटन पर क्लिक करके उन्हें यहाँ सेव करें।';
    const mockBtn = isEn ? '🎯 Go to Live Mock Test' : '🎯 लाइव मॉक टेस्ट पर जाएं';

    container.innerHTML = `
      <div class="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-amber-300 shadow-sm space-y-4">
        <div class="w-16 h-16 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-3xl">⭐</div>
        <h3 class="text-lg font-black text-slate-900">${emptyTitle}</h3>
        <p class="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">${emptySub}</p>
        <a href="#tool/quiz" class="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-orange-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md">
          <span>${mockBtn}</span>
        </a>
      </div>
    `;
    return;
  }

  const headerTitle = isEn ? `Revision Vault (${bookmarks.length} Saved Questions)` : `रिवीजन वॉल्ट (${bookmarks.length} सेव किए गए प्रश्न)`;
  const headerSub = isEn ? 'Practice these saved tough questions repeatedly until mastered.' : 'इन कठिन प्रश्नों का बार-बार अभ्यास करें जब तक पूरी तरह कंठस्थ न हो जाएं।';
  const startBtn = isEn ? '🚀 Start Revision Test' : '🚀 रिवीजन टेस्ट शुरू करें';

  container.innerHTML = `
    <div class="bg-gradient-to-br from-amber-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-amber-600/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-black">${headerTitle}</h2>
        <p class="text-xs text-amber-200 mt-1">${headerSub}</p>
      </div>
      <button onclick="startRevisionQuiz()" class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg cursor-pointer">
        ${startBtn}
      </button>
    </div>
  `;
}

function updateQuizPaidPdfBanner() {
  const examSelect = document.getElementById('quizExamSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  const badge = document.getElementById('quizBannerActiveSubjectBadge');
  const title = document.getElementById('quizBannerTitle');

  if (!badge || !title) return;
  const examText = examSelect ? (examSelect.options[examSelect.selectedIndex]?.text || examSelect.value) : "SSC GD 2026";
  const subText = subjectSelect ? (subjectSelect.options[subjectSelect.selectedIndex]?.text || subjectSelect.value) : "All Subjects";
  badge.textContent = subText.slice(0, 25);
  title.textContent = `${examText.slice(0, 30)} सर्वाधिक पूछे जाने वाले रामबाण प्रश्नों की Verified PDF`;
}

function triggerQuizPdfPurchase(isAllSubject = false) {
  const price = isAllSubject ? 19 : 9;
  if (typeof openUpiPaymentModal === 'function') {
    openUpiPaymentModal(`quiz-${Date.now()}`, { price });
  } else {
    alert(`₹${price} UPI भुगतान गेटवे लोड हो रहा है...`);
  }
}

// Global Window Exports
window.switchQuizMode = switchQuizMode;
window.startNewQuiz = startNewQuiz;
window.submitQuiz = submitQuiz;
window.resetQuiz = resetQuiz;
window.exitQuizTest = exitQuizTest;
window.prevQuizQuestion = prevQuizQuestion;
window.nextQuizQuestion = nextQuizQuestion;
window.jumpToQuizQuestion = jumpToQuizQuestion;
window.jumpToSection = jumpToSection;
window.handleOptionSelection = handleOptionSelection;
window.clearCurrentQuestionResponse = clearCurrentQuestionResponse;
window.toggleMarkCurrentQuestionForReview = toggleMarkCurrentQuestionForReview;
window.saveNumericalAnswer = saveNumericalAnswer;
window.saveSubjectiveAnswer = saveSubjectiveAnswer;
window.toggleBookmarkCurrentQuestion = toggleBookmarkCurrentQuestion;
window.startRevisionQuiz = startRevisionQuiz;
window.renderRevisionVault = renderRevisionVault;
window.triggerQuizPdfPurchase = triggerQuizPdfPurchase;
window.updateQuizPaidPdfBanner = updateQuizPaidPdfBanner;

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
  updateQuizPaidPdfBanner();
  renderRevisionVault();
});

window.addEventListener('languageChanged', () => {
  updateQuizVoiceButtons();
  updateBookmarkButtonDisplay();
  updateBlueprintSummaryDisplay();
  updateDependentDropdowns();
  if (typeof activeQuiz !== 'undefined' && activeQuiz && activeQuiz.isRunning) {
    renderActiveQuestion();
    renderSectionTabs();
    renderQuestionPalette();
  }
});


window.speakActiveQuestionGender = speakActiveQuestionGender;
window.updateQuizVoiceButtons = updateQuizVoiceButtons;

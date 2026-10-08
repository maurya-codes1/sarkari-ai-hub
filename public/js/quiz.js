// Interactive Live Mock Test & Universal CBT Engine for SarkariAI Hub
// Phase 4: Full Exam Blueprint-Driven Mode vs Flexible Practice Set Mode
// Multi-section architecture, countdown timer with auto-submit, zero-duplicate guarantee,
// separate language layers, numerical/subjective hooks, and fail-safe offline fallback.

function cleanQuestionText(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text.trim();
  // Strip leading metadata in brackets ONLY if it contains known prefix keywords (not rule codes or bracketed questions)
  cleaned = cleaned.replace(/^\[(?:RRB|SSC|UPSC|BSEB|CBSE|TBSE|UPMSP|MPBSE|RBSE|Practice|Question|Exam|Class|कक्षा|बोर्ड|अभ्यास|\d+)[^\]\r\n]*\]\s*/gi, '');
  // Strip exam/board/class/subject names followed by question numbering or colon:
  cleaned = cleaned.replace(/^(?:(?:CBSE|ICSE|CISCE|UPMSP|BSEB|RBSE|MPBSE|WBBSE|TNDGE|KSEAB|GSEB|PSEB|NIOS|CGBSE|CHSE|UBSE|SEBA|TSBIE|BIEAP|JKBOSE|DHSE|TBSE|NCERT|Class\s*\d+|कक्षा\s*\d+)\s*)+[\u0900-\u0DFF\w\s\-—]*(?:प्रश्न|प्रश्‍न|Question|Q|Ques|Que)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  // Strip general board/exam/class labels:
  cleaned = cleaned.replace(/^[\u0900-\u0DFF\w\s\-—]+(Board|Exam|Class|कक्षा|बोर्ड|प्रैक्टिस|अभ्यास|Science|विज्ञान|Math|गणित|English|Hindi|Chemistry|Physics|Biology)[^:\n]{0,80}:\s*/i, '');
  // Strip leading question labels & numbering: Question #1:, प्रश्न 15:, Q.12 -, #4590:, Q13:
  cleaned = cleaned.replace(/^(?:प्रश्न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्‍न\s*(?:सं\.?|संख्या|क्र\.?)|प्रश्न|प्रश्‍न|Question|Q\.|Ques|Que|Q|ਪ੍ਰਸ਼ਨ\s*(?:ਨੰ\.?)?|ಪ್ರಶ್ನೆ|வினா|ప్రశ్న|প্রশ্ন|سوال\s*(?:نمبر)?)\s*#?\d+\s*[:.\-–—]\s*/i, '');
  cleaned = cleaned.replace(/^#?\d+\s*[:.\-–—]\s*/, '');
  cleaned = cleaned.replace(/^\(\d+\)\s*/, '');
  cleaned = cleaned.replace(/^\d+[\.)]\s+/, '');
  // Strip trailing provenance/noise in parentheses e.g. (सीबीएसई कक्षा 10 विज्ञान नमूना प्रश्न 15)? or (Question #26)
  const trailingNoiseRegex = /\s*\([^)]*(?:सीबीएसई|CBSE|कक्षा|Class|बोर्ड|Board|नमूना|Sample|पेपर|Paper|Item|प्रश्न|Question|\#\d+)[^)]*\)\s*(\??)$/i;
  const match = cleaned.match(trailingNoiseRegex);
  if (match) {
    const hasQuestionMark = cleaned.endsWith('?') || (match[1] === '?');
    cleaned = cleaned.replace(trailingNoiseRegex, hasQuestionMark ? '?' : '').trim();
  }
  // Strip inline English tags like \n[English: ...] or [English: ...]
  cleaned = cleaned.replace(/\s*(?:\\n|\n)?\[(?:English|अंग्रेज़ी|अंग्रेजी):\s*[^\]]+\]/gi, '').trim();

  // Safeguard: Never return empty if original text had meaningful characters
  if (!cleaned && text.trim()) {
    return text.trim();
  }
  return cleaned.trim() || text.trim();
}

let activeQuiz = window.activeQuiz = {
  mode: 'SUBJECT_PRACTICE', // 'SUBJECT_PRACTICE', 'ALL_SUBJECTS_PRACTICE', or 'FULL_EXAM_PATTERN'
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
  isRunning: false,
  instantFeedback: false
};

// ----------------------------------------------------
// Normalized Correct Index Helper
// Resolves 0, 1, 2, 3 from 'A'/'B'/'C'/'D', '0'/'1', ans strings, etc.
// ----------------------------------------------------
function getNormalizedCorrectIndex(q) {
  if (!q) return null;

  // 1. Direct numeric 'correct' or 'ans' or 'correct_option_index'
  const numericCandidates = [q.correct, q.ans, q.correct_option_index, q.correctOptionIndex, q.correctOption, q.correctAnswer, q.correct_answer];
  for (const c of numericCandidates) {
    if (typeof c === 'number' && c >= 0 && c <= 10) return c;
  }

  // 2. Object formats e.g. { index: 1 } or { option: 'B' }
  const objCandidates = [q.correctAnswer, q.correct_answer, q.correct];
  for (const obj of objCandidates) {
    if (obj && typeof obj === 'object') {
      if (typeof obj.index === 'number') return obj.index;
      if (typeof obj.option === 'number') return obj.option;
      if (typeof obj.option === 'string') {
        const t = obj.option.trim().toUpperCase();
        if (/^[A-D]$/.test(t)) return t.charCodeAt(0) - 65;
        if (/^[0-9]+$/.test(t)) return parseInt(t, 10);
      }
    }
    // Stringified JSON
    if (typeof obj === 'string' && (obj.startsWith('{') || obj.startsWith('['))) {
      try {
        const parsed = JSON.parse(obj);
        if (typeof parsed.index === 'number') return parsed.index;
        if (typeof parsed.option === 'number') return parsed.option;
        if (typeof parsed.option === 'string') {
          const t = parsed.option.trim().toUpperCase();
          if (/^[A-D]$/.test(t)) return t.charCodeAt(0) - 65;
          if (/^[0-9]+$/.test(t)) return parseInt(t, 10);
        }
      } catch (e) {}
    }
  }

  // 3. String representations e.g. '0', '1', 'A', 'B', 'A)', 'B)'
  const strCandidates = [q.correct, q.ans, q.correct_option, q.correctOption, q.correctAnswer, q.correct_answer];
  for (const s of strCandidates) {
    if (typeof s === 'string') {
      const trimmed = s.trim();
      if (/^[0-9]+$/.test(trimmed)) {
        const n = parseInt(trimmed, 10);
        if (n >= 0 && n <= 10) return n;
      }
      if (/^[a-dA-D]$/.test(trimmed)) {
        return trimmed.toUpperCase().charCodeAt(0) - 65;
      }
      if (/^[A-D]\)/i.test(trimmed)) {
        return trimmed.toUpperCase().charCodeAt(0) - 65;
      }
      // If s matches one of the option strings exactly or partially
      if (Array.isArray(q.options) && trimmed.length > 0) {
        const matchIdx = q.options.findIndex(opt => {
          const cleanOpt = opt.replace(/^[A-D]\)\s*/, '').trim();
          return opt.trim() === trimmed || cleanOpt === trimmed || trimmed.includes(cleanOpt) || cleanOpt.includes(trimmed);
        });
        if (matchIdx !== -1) return matchIdx;
      }
    }
  }

  return null;
}

// Pleasant Web Audio tone feedback (Zero external asset dependencies)
function playQuizFeedbackSound(isCorrect) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isCorrect) {
      // Pleasant high double chime (587Hz -> 880Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } else {
      // Soft gentle low buzz (220Hz -> 170Hz)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.28);
    }
  } catch (e) {
    // Ignore audio context errors silently
  }
}

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
      showAppAlert('Your browser does not support text-to-speech voice output.', 'Voice Support', '🔊');
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
    let textQ = q.secondaryQ || '';
    if (!textQ && q.q) {
      const match = q.q.match(/\[English:\s*([^\]]+)\]/i);
      if (match) {
        textQ = match[1].trim();
      } else {
        textQ = q.q.replace(/\n\[English:.*\]/g, '').trim();
      }
    }
    if (textQ) {
      speechSegments.push({
        text: `Question ${qNum}: ${textQ}`,
        lang: 'en-IN'
      });
    }
    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        let cleanOpt = opt.replace(/^[A-D]\)\s*/, '');
        if (cleanOpt.includes(' / ')) {
          cleanOpt = cleanOpt.split(' / ')[1].trim();
        }
        speechSegments.push({
          text: `Option ${letter}: ${cleanOpt}.`,
          lang: 'en-IN'
        });
      });
    }
  } else {
    // Hindi or active portal Indian language
    let rawQ = q.q || '';
    if (rawQ.includes('\n[English:')) {
      rawQ = rawQ.split('\n[English:')[0].trim();
    }
    const qPrefix = typeof getTranslation === 'function' ? (getTranslation('quiz_question_label') || 'प्रश्न') : 'प्रश्न';
    const optPrefix = typeof getTranslation === 'function' ? (getTranslation('quiz_option_label') || 'विकल्प') : 'विकल्प';

    const bcpMap = {
      'hi': 'hi-IN', 'ta': 'ta-IN', 'te': 'te-IN', 'mr': 'mr-IN',
      'bn': 'bn-IN', 'gu': 'gu-IN', 'kn': 'kn-IN', 'ml': 'ml-IN',
      'pa': 'pa-IN', 'ur': 'ur-PK', 'or': 'or-IN', 'as': 'as-IN',
      'ne': 'ne-NP'
    };
    const bcpLang = bcpMap[currLang] || (/[ऀ-ॿ]/.test(rawQ) ? 'hi-IN' : 'en-IN');

    if (rawQ) {
      speechSegments.push({
        text: `${qPrefix} ${qNum}: ${rawQ}`,
        lang: bcpLang
      });
    }

    if (Array.isArray(q.options)) {
      q.options.forEach((opt, idx) => {
        const letter = String.fromCharCode(65 + idx);
        let cleanOpt = opt.replace(/^[A-D]\)\s*/, '');
        if (cleanOpt.includes(' / ')) {
          cleanOpt = cleanOpt.split(' / ')[0].trim();
        }
        speechSegments.push({
          text: `${optPrefix} ${letter}: ${cleanOpt}.`,
          lang: bcpLang
        });
      });
    }
  }

  if (speechSegments.length === 0) return;

  const fullText = speechSegments.map(s => s.text).join(' ... ');
  const primaryBcp = speechSegments[0]?.lang || (isEn ? 'en-IN' : 'hi-IN');
  const utt = new SpeechSynthesisUtterance(fullText);
  utt.lang = primaryBcp;
  const voice = getSweetVoice(primaryBcp, gender);
  if (voice) utt.voice = voice;
  utt.rate = isFemale ? 0.95 : 0.90;
  utt.pitch = isFemale ? 1.15 : 0.85;
  utt.onend = stopSpeaking;
  utt.onerror = stopSpeaking;
  window.speechSynthesis.speak(utt);
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
  const badgeEl = document.getElementById('quizReadyCountBadge');

  const activeClass = "px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-sm";
  const inactiveClass = "px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 transition cursor-pointer";

  if (subjBtn) subjBtn.className = (mode === 'SUBJECT_PRACTICE') ? activeClass : inactiveClass;
  if (allSubjBtn) allSubjBtn.className = (mode === 'ALL_SUBJECTS_PRACTICE') ? activeClass : inactiveClass;
  if (fullBtn) fullBtn.className = (mode === 'FULL_EXAM_PATTERN' || mode === 'FULL_EXAM') ? activeClass : inactiveClass;

  if (mode === 'FULL_EXAM_PATTERN' || mode === 'FULL_EXAM') {
    if (bpCard) bpCard.classList.remove('hidden');
    if (pracCard) pracCard.classList.add('hidden');
    if (badgeEl) {
      badgeEl.className = "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700";
      badgeEl.setAttribute('data-i18n', 'quiz_badge_blueprint');
      badgeEl.textContent = typeof getTranslation === 'function' ? (getTranslation('quiz_badge_blueprint') || 'Official Blueprint Active') : 'Official Blueprint Active';
    }
    updateBlueprintSummaryDisplay();
  } else if (mode === 'SUBJECT_PRACTICE') {
    if (bpCard) bpCard.classList.add('hidden');
    if (pracCard) pracCard.classList.remove('hidden');
    if (subjSelectContainer) subjSelectContainer.classList.remove('hidden');
    if (badgeEl) {
      badgeEl.className = "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700";
      badgeEl.setAttribute('data-i18n', 'quiz_badge_practice');
      badgeEl.textContent = typeof getTranslation === 'function' ? (getTranslation('quiz_badge_practice') || 'Practice Mode Active') : 'Practice Mode Active';
    }
  } else if (mode === 'ALL_SUBJECTS_PRACTICE') {
    if (bpCard) bpCard.classList.add('hidden');
    if (pracCard) pracCard.classList.remove('hidden');
    if (subjSelectContainer) subjSelectContainer.classList.add('hidden');
    if (badgeEl) {
      badgeEl.className = "inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700";
      badgeEl.setAttribute('data-i18n', 'quiz_badge_practice');
      badgeEl.textContent = typeof getTranslation === 'function' ? (getTranslation('quiz_badge_practice') || 'Practice Mode Active') : 'Practice Mode Active';
    }
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

const EXAM_BLUEPRINT_ALIASES = {
  // Police
  'bihar-police-constable': 'bihar-police',
  'bihar-police': 'bihar-police',
  'up-police-constable': 'up-police',
  'up-police': 'up-police',
  'delhi-police': 'delhi-police',
  'rajasthan-police': 'rajasthan-police',
  'mp-police': 'mp-police',
  'haryana-police': 'haryana-police',
  'wb-police': 'wb-police',
  'maharashtra-police': 'maharashtra-police',

  // Railways
  'rrb-alp': 'railway-alp',
  'railway-alp': 'railway-alp',
  'rrb-group-d': 'railway-group-d',
  'rrb-ntpc': 'railway-group-d',
  'rrb-technician': 'railway-alp',
  'railway-group-d': 'railway-group-d',

  // SSC
  'ssc-gd': 'ssc-gd',
  'ssc-cgl': 'ssc-cgl',
  'ssc-chsl': 'ssc-cgl',
  'ssc-mts': 'ssc-mts',

  // Defence
  'agniveer-army': 'army-agniveer',
  'army-agniveer': 'army-agniveer',
  'agniveer-airforce': 'iaf-agniveer',
  'iaf-agniveer': 'iaf-agniveer',
  'agniveer-navy': 'navy-agniveer',
  'navy-agniveer': 'navy-agniveer',
  'upsc-cse': 'upsc-cse',
  'upsc-nda': 'upsc-nda',

  // Banking
  'banking': 'banking',
  'ibps-po-clerk': 'banking',

  // Entrance
  'nta-neet': 'nta-neet',
  'nta-jee': 'nta-jee',
  'nta-jee-main': 'nta-jee',
  'nta-jee-adv': 'nta-jee',
  'nta-cuet': 'nta-cuet',
  'nta-cuet-ug': 'nta-cuet',
  'clat-law': 'clat-law',

  // Teaching
  'ctet': 'ctet',
  'ctet-exam': 'ctet',
  'up-tet': 'up-tet',
  'uptet-supertet': 'up-tet',
  'bpsc-tre': 'bpsc-tre',
  'reet': 'reet',
  'reet-rajasthan': 'reet',
  'ugc-net': 'ugc-net',

  // Boards
  'board-10th': 'board-10th',
  'cbse-board': 'board-10th',
  'icse-cisce': 'board-10th',
  'upmsp-board': 'board-10th',
  'bseb-bihar': 'board-10th',
  'maharashtra-board': 'board-10th',
  'rbse-rajasthan': 'board-10th',
  'mpbse-board': 'board-10th',
  'wbbse-wb': 'board-10th',
  'tndge-tamilnadu': 'board-10th',
  'kseab-karnataka': 'board-10th',
  'gseb-gujarat': 'board-10th',
  'bseh-haryana': 'board-10th',
  'jac-jharkhand': 'board-10th',
  'pseb-punjab': 'board-10th',
  'nios-board': 'board-10th',
  'cgbse-chhattisgarh': 'board-10th',
  'chse-bse-odisha': 'board-10th',
  'ubse-uttarakhand': 'board-10th',
  'seba-ahsec-assam': 'board-10th',
  'tsbie-bieap': 'board-10th',
  'board-12th-science': 'board-12th-science',
  'board-12th-commerce': 'board-12th-commerce',
  'board-12th-arts': 'board-12th-arts',
  'all-india-mix': 'all-india-mix'
};

function resolveLocalBlueprint(examId) {
  const normId = (examId || '').toLowerCase().trim();
  if (EXAM_BLUEPRINT_ALIASES[normId] && OFFICIAL_EXAM_BLUEPRINTS[EXAM_BLUEPRINT_ALIASES[normId]]) {
    return OFFICIAL_EXAM_BLUEPRINTS[EXAM_BLUEPRINT_ALIASES[normId]];
  }
  if (OFFICIAL_EXAM_BLUEPRINTS[normId]) {
    return OFFICIAL_EXAM_BLUEPRINTS[normId];
  }
  // Explicit priority prefix checks
  if (normId.includes('bihar-police') || normId.includes('csbc')) {
    return OFFICIAL_EXAM_BLUEPRINTS['bihar-police'];
  }
  if (normId.includes('mp-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['mp-police'];
  }
  if (normId.includes('haryana-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['haryana-police'];
  }
  if (normId.includes('maharashtra-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['maharashtra-police'];
  }
  if (normId.includes('delhi-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['delhi-police'];
  }
  if (normId.includes('rajasthan-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['rajasthan-police'];
  }
  if (normId.includes('wb-police') || normId.includes('kolkata-police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['wb-police'];
  }
  if (normId.includes('up-police') || normId.includes('police')) {
    return OFFICIAL_EXAM_BLUEPRINTS['up-police'];
  }
  if (normId.includes('ntpc') || normId.includes('group-d')) {
    return OFFICIAL_EXAM_BLUEPRINTS['railway-group-d'];
  }
  if (normId.includes('alp') || normId.includes('technician') || normId.includes('railway') || normId.includes('rrb')) {
    return OFFICIAL_EXAM_BLUEPRINTS['railway-alp'];
  }
  if (normId.includes('mts') || normId.includes('havaldar')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ssc-mts'];
  }
  if (normId.includes('cgl') || normId.includes('chsl')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ssc-cgl'];
  }
  if (normId.includes('ssc') || normId.includes('gd')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ssc-gd'];
  }
  if (normId.includes('neet')) {
    return OFFICIAL_EXAM_BLUEPRINTS['nta-neet'];
  }
  if (normId.includes('jee')) {
    return OFFICIAL_EXAM_BLUEPRINTS['nta-jee'];
  }
  if (normId.includes('cuet')) {
    return OFFICIAL_EXAM_BLUEPRINTS['nta-cuet'];
  }
  if (normId.includes('ctet')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ctet'];
  }
  if (normId.includes('tet')) {
    return OFFICIAL_EXAM_BLUEPRINTS['up-tet'];
  }
  if (normId.includes('tre') || normId.includes('bpsc')) {
    return OFFICIAL_EXAM_BLUEPRINTS['bpsc-tre'];
  }
  if (normId.includes('reet')) {
    return OFFICIAL_EXAM_BLUEPRINTS['reet'];
  }
  if (normId.includes('ugc') || normId.includes('net')) {
    return OFFICIAL_EXAM_BLUEPRINTS['ugc-net'];
  }
  if (normId.includes('12th-science') || normId.includes('12-science')) {
    return OFFICIAL_EXAM_BLUEPRINTS['board-12th-science'];
  }
  if (normId.includes('12th-commerce') || normId.includes('12-commerce')) {
    return OFFICIAL_EXAM_BLUEPRINTS['board-12th-commerce'];
  }
  if (normId.includes('12th-arts') || normId.includes('12-arts')) {
    return OFFICIAL_EXAM_BLUEPRINTS['board-12th-arts'];
  }
  if (normId.includes('board') || normId.includes('10th') || normId.includes('12th') || normId.includes('matric') || normId.includes('inter')) {
    return OFFICIAL_EXAM_BLUEPRINTS['board-10th'];
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
  switchQuizMode('SUBJECT_PRACTICE');
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

const QUIZ_BOARD_MEDIUMS = {
  'cbse': ['en', 'hi'],
  'icse': ['en', 'hi'],
  'upmsp': ['hi', 'en'],
  'bseb': ['hi', 'en'],
  'maharashtra': ['mr', 'en', 'hi', 'gu'],
  'rbse': ['hi', 'en'],
  'mpbse': ['hi', 'en'],
  'wb': ['bn', 'en', 'hi'],
  'tn': ['ta', 'en'],
  'karnataka': ['kn', 'en'],
  'gujarat': ['gu', 'en', 'hi'],
  'haryana': ['hi', 'en'],
  'jac': ['hi', 'en'],
  'pseb': ['pa', 'en', 'hi'],
  'nios': ['hi', 'en'],
  'cgbse': ['hi', 'en'],
  'bseodisha': ['or', 'en'],
  'ubse': ['hi', 'en'],
  'seba': ['as', 'en', 'bn'],
  'bsetelangana': ['te', 'en'],
  'bsetg': ['te', 'en'],
  'bseap': ['te', 'en'],
  'hpbose': ['hi', 'en'],
  'jkbose': ['en', 'hi'],
  'kerala': ['ml', 'en'],
  'gbshse': ['en', 'mr', 'hi'],
  'bsem': ['en', 'mni'],
  'mbose': ['en'],
  'mbse': ['en'],
  'nbse': ['en'],
  'tbse': ['bn', 'en']
};

let selectedQuizMedium = 'hi';

function isQuizLanguageSubject(subjId) {
  if (!subjId || subjId === 'all') return false;
  const s = String(subjId).toLowerCase();
  return (
    s.includes('hindi') || s.includes('english') || s.includes('sanskrit') ||
    s.includes('urdu') || s.includes('telugu') || s.includes('tamil') ||
    s.includes('punjabi') || s.includes('bengali') || s.includes('gujarati') ||
    s.includes('marathi') || s.includes('kannada') || s.includes('malayalam') ||
    s.includes('odia') || s.includes('assamese') || s.includes('maithili') ||
    s.includes('bodo') || s.includes('khasi') || s.includes('mizo') ||
    s.includes('tenyidie') || s.includes('manipuri') || s.includes('konkani') ||
    s.includes('kokborok')
  );
}

function updateQuizMediumSelector() {
  const examSelect = document.getElementById('quizExamSelect');
  const boardContainer = document.getElementById('quizBoardContainer');
  const boardSelect = document.getElementById('quizBoardSelect');
  const subjectSelect = document.getElementById('quizSubjectSelect');
  const mediumContainer = document.getElementById('quizMediumContainer');
  const langLockBadge = document.getElementById('quizLangLockBadge');
  const dualLangBadge = document.getElementById('quizDualLangBadge');
  const buttonsContainer = document.getElementById('quizMediumButtons');
  const bpMediumText = document.getElementById('quizBpMediumText');

  if (!mediumContainer || !buttonsContainer) return;

  const examId = examSelect ? examSelect.value : '';
  const examObj = (typeof EXAMS_CONFIG !== 'undefined') ? EXAMS_CONFIG.find(e => e.id === examId) : null;
  const isBoardExam = examObj ? Boolean(examObj.isBoard) : (typeof examId === 'string' && (examId.startsWith('board-') || examId.includes('10th') || examId.includes('12th')));

  if (!isBoardExam || (boardContainer && boardContainer.classList.contains('hidden'))) {
    mediumContainer.classList.add('hidden');
    if (bpMediumText) bpMediumText.textContent = 'हिन्दी + English (Bilingual Dual Medium)';
    return;
  }

  mediumContainer.classList.remove('hidden');

  const boardId = boardSelect ? boardSelect.value : 'bseb';
  const subjectId = subjectSelect ? subjectSelect.value : 'all';
  const isLang = isQuizLanguageSubject(subjectId);
  const mediums = QUIZ_BOARD_MEDIUMS[boardId] || ['hi', 'en'];

  if (!mediums.includes(selectedQuizMedium)) {
    selectedQuizMedium = mediums[0] || 'hi';
  }

  const mediumLabelMap = {
    'hi': { label: 'हिन्दी Medium', flag: '🇮🇳' },
    'en': { label: 'English Medium', flag: '🇬🇧' },
    'te': { label: 'తెలుగు Medium', flag: '🏛️' },
    'ta': { label: 'தமிழ் Medium', flag: '🏛️' },
    'bn': { label: 'বাংলা Medium', flag: '🏛️' },
    'gu': { label: 'ગુજરાતી Medium', flag: '🏛️' },
    'mr': { label: 'मराठी Medium', flag: '🏛️' },
    'pa': { label: 'ਪੰਜਾਬੀ Medium', flag: '🏛️' },
    'kn': { label: 'ಕನ್ನಡ Medium', flag: '🏛️' },
    'ml': { label: 'മലയാളം Medium', flag: '🏛️' },
    'or': { label: 'ଓଡ଼ିଆ Medium', flag: '🏛️' },
    'as': { label: 'অসমীয়া Medium', flag: '🏛️' },
    'ur': { label: 'اردو Medium', flag: '🏛️' },
    'mni': { label: 'মৈতৈলোন্ Medium', flag: '🏛️' }
  };

  if (isLang) {
    if (langLockBadge) langLockBadge.classList.remove('hidden');
    if (dualLangBadge) dualLangBadge.classList.add('hidden');
    buttonsContainer.innerHTML = `
      <div class="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center space-x-2">
        <span>🔒</span>
        <span>यह भाषा विषय केवल अपनी मूल लिपि में ही संचालित होता है (No Medium Switch)</span>
      </div>
    `;
    if (bpMediumText) bpMediumText.textContent = 'मूल भाषा परीक्षा (Native Language Locked)';
  } else {
    if (langLockBadge) langLockBadge.classList.add('hidden');
    if (dualLangBadge) dualLangBadge.classList.remove('hidden');

    buttonsContainer.innerHTML = mediums.map(m => {
      const info = mediumLabelMap[m] || { label: m.toUpperCase() + ' Medium', flag: '🌐' };
      const isActive = (selectedQuizMedium === m);
      const activeClasses = isActive
        ? 'bg-rose-600 text-white border-rose-500 shadow-md font-black ring-2 ring-rose-400/50'
        : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 font-bold';
      return `
        <button type="button" onclick="setQuizMedium('${m}')" class="px-3.5 py-1.5 rounded-xl text-xs border transition flex items-center space-x-1.5 cursor-pointer ${activeClasses}">
          <span>${info.flag}</span>
          <span>${info.label}</span>
        </button>
      `;
    }).join('');

    const activeInfo = mediumLabelMap[selectedQuizMedium] || { label: selectedQuizMedium.toUpperCase() };
    if (bpMediumText) bpMediumText.textContent = `${activeInfo.label} + English (Dual Medium)`;
  }
}

window.setQuizMedium = function(m) {
  selectedQuizMedium = m;
  updateQuizMediumSelector();
};

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
      updateQuizMediumSelector();
    });
  }

  if (subjectSelect) {
    subjectSelect.addEventListener('change', () => {
      updateQuizMediumSelector();
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
    if (subjects.length > 0) {
      subjectSelect.value = subjects[0].id;
    }
  }
  updateQuizMediumSelector();
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
      const currentBoard = boardSelect.value;
      const isValidBoard = examObj.boards.some(b => b.id === currentBoard);
      boardSelect.innerHTML = examObj.boards.map(b => `
        <option value="${b.id}">${b.name}</option>
      `).join('');
      if (isValidBoard) {
        boardSelect.value = currentBoard;
      } else if (examObj.boards.length > 0) {
        boardSelect.value = examObj.boards[0].id;
      }
      updateBoardSubjects();
    }
  } else {
    if (boardContainer) boardContainer.classList.add('hidden');
    if (Array.isArray(examObj.subjects)) {
      subjectSelect.innerHTML = examObj.subjects.map(s => `
        <option value="${s.id}">${s.name}</option>
      `).join('');
      if (examObj.subjects.length > 0) {
        subjectSelect.value = examObj.subjects[0].id;
      }
    }
  }

  updateQuizMediumSelector();
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
  const isSpecificSubject = subjectId && subjectId !== 'all';
  const examObj = (typeof EXAMS_CONFIG !== 'undefined') ? EXAMS_CONFIG.find(e => e.id === examId) : null;
  const isBoardExam = examObj ? Boolean(examObj.isBoard) : (typeof examId === 'string' && (examId.startsWith('board-') || examId.includes('10th') || examId.includes('12th')));
  const boardContainer = document.getElementById('quizBoardContainer');
  const boardId = (isBoardExam && boardSelect && boardContainer && !boardContainer.classList.contains('hidden')) ? (boardSelect.value || null) : null;
  
  let stage = null;
  if (isBoardExam) {
    const eLower = String(examId || '').toLowerCase();
    if (eLower.includes('12th') || eLower.includes('class-12') || eLower.includes('c12')) {
      stage = 'Class 12';
    } else if (eLower.includes('10th') || eLower.includes('class-10') || eLower.includes('c10')) {
      stage = 'Class 10';
    }
  }

  let effectiveMode = activeQuiz.mode || 'FULL_EXAM_PATTERN';
  if (isSpecificSubject || isBoardExam) {
    effectiveMode = 'SUBJECT_PRACTICE';
  }
  const isFullExamMode = !isSpecificSubject && !isBoardExam && (effectiveMode === 'FULL_EXAM_PATTERN' || effectiveMode === 'FULL_EXAM');
  const bp = resolveLocalBlueprint(examId);

  // In FULL_EXAM mode, NEVER use practice sizeSelect or custom timer!
  // Lock strictly to the verified official blueprint!
  const requestedCount = isFullExamMode
    ? (bp.total_questions || bp.totalQuestions || 80)
    : (sizeSelect ? parseInt(sizeSelect.value, 10) : 30);
  const difficulty = isFullExamMode ? 'MIXED' : (diffSelect ? diffSelect.value : 'MIXED');
  const timerMode = isFullExamMode ? 'COUNTDOWN' : (timerSelect ? timerSelect.value : 'COUNTDOWN');

  // Immediate visual feedback on start button
  const startBtn = document.getElementById('startQuizBtn');
  let originalBtnHtml = '';
  if (startBtn) {
    originalBtnHtml = startBtn.innerHTML;
    startBtn.innerHTML = `<span>⏳ Preparing CBT Test (लोड हो रहा है)...</span>`;
    startBtn.disabled = true;
  }

  // Exam Safety: Hide floating chatbot widget while taking the exam
  document.body.classList.add('in-quiz');
  const chatBubble = document.getElementById('floatingChatbotWidget');
  if (chatBubble) chatBubble.classList.add('hidden');

  let sessionData = null;

  // Retrieve previous attempted / studied question IDs for 20-30% spaced repetition
  let studiedQuestionIds = [];
  const storageKey = `sarkari_studied_${examId}_${boardId || 'default'}_${subjectId || 'all'}`;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      studiedQuestionIds = JSON.parse(saved);
      if (!Array.isArray(studiedQuestionIds)) studiedQuestionIds = [];
    }
  } catch (e) {}

  try {
    const res = await fetch('/api/v2/mock/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examId,
        boardId,
        stage,
        testMode: effectiveMode,
        requestedCount,
        subjectId: isFullExamMode ? 'all' : subjectId,
        difficulty,
        timerMode,
        studiedQuestionIds,
        preferredMedium: selectedQuizMedium,
        medium: selectedQuizMedium
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (!data.success && data.status === 'FULL_EXAM_UNAVAILABLE') {
        const unavailMsg = `${data.message || 'Full Exam pattern simulation is currently unavailable.'}\n\nPlease practice in Subject-wise Practice or All Subjects Practice mode!`;
        if (typeof showAppAlert === 'function') {
          showAppAlert(unavailMsg, 'Pattern Notice', '⚠️');
        } else {
          alert(unavailMsg);
        }
        if (startBtn && originalBtnHtml) {
          startBtn.innerHTML = originalBtnHtml;
          startBtn.disabled = false;
        }
        document.body.classList.remove('in-quiz');
        if (chatBubble) chatBubble.classList.remove('hidden');
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
    sessionData = generateLocalSessionFallback(examId, subjectId, requestedCount, boardId, effectiveMode);
  }

  if (!sessionData.questions || sessionData.questions.length === 0) {
    if (startBtn && originalBtnHtml) {
      startBtn.innerHTML = originalBtnHtml;
      startBtn.disabled = false;
    }
    const loadingMsg = 'इस विषय के लिए प्रश्न लोड हो रहे हैं। कृपया दूसरा विकल्प चुनें।';
    if (typeof showAppAlert === 'function') {
      showAppAlert(loadingMsg, 'Notice', 'ℹ️');
    } else {
      alert(loadingMsg);
    }
    document.body.classList.remove('in-quiz');
    if (chatBubble) chatBubble.classList.remove('hidden');
    return;
  }

  if (startBtn && originalBtnHtml) {
    startBtn.innerHTML = originalBtnHtml;
    startBtn.disabled = false;
  }

  // Populate active quiz state
  activeQuiz.mode = effectiveMode;
  activeQuiz.instantFeedback = (effectiveMode === 'SUBJECT_PRACTICE' || effectiveMode === 'ALL_SUBJECTS_PRACTICE' || effectiveMode === 'PRACTICE' || isSpecificSubject || isBoardExam);
  activeQuiz.sessionId = sessionData.sessionId;
  activeQuiz.exam = examId;
  activeQuiz.board = boardId;
  activeQuiz.subject = subjectId;
  activeQuiz.blueprint = sessionData.blueprint || resolveLocalBlueprint(examId);
  activeQuiz.sections = sessionData.sections || [];
  activeQuiz.questions = sessionData.questions;
  // Update studied question history in localStorage for future 20-30% spaced repetition
  try {
    const newIds = sessionData.questions.map(q => q.id || q.question_id).filter(Boolean);
    const merged = Array.from(new Set([...newIds, ...studiedQuestionIds])).slice(0, 300);
    localStorage.setItem(storageKey, JSON.stringify(merged));
  } catch (e) {}
  activeQuiz.currentIndex = 0;
  activeQuiz.currentSectionIndex = 0;
  activeQuiz.userAnswers = {};
  activeQuiz.lockedQuestions = {};
  activeQuiz.reviewFlags = {};
  activeQuiz.visited = { 0: true };
  activeQuiz.isRunning = true;

  const activeBp = activeQuiz.blueprint;
  activeQuiz.hasNegativeMarking = Boolean(activeBp.isNegativeMarking !== undefined ? activeBp.isNegativeMarking : (activeBp.is_negative_marking !== undefined ? activeBp.is_negative_marking : false));
  activeQuiz.negativeMarkingRate = activeQuiz.hasNegativeMarking
    ? Number(activeBp.negativeValue !== undefined ? activeBp.negativeValue : (activeBp.negative_value !== undefined ? activeBp.negative_value : (activeBp.sections && activeBp.sections[0] ? (activeBp.sections[0].negativeValue || activeBp.sections[0].marksWrong || 0.25) : 0.25)))
    : 0.0;

  // Setup timer
  const timerConfig = sessionData.timerConfig || { mode: 'COUNTDOWN', durationMinutes: activeBp.durationMinutes || activeBp.duration_minutes || 60, totalSeconds: (activeBp.durationMinutes || activeBp.duration_minutes || 60) * 60 };
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
  const localBp = resolveLocalBlueprint(examId);
  const isFullExam = (testMode === 'FULL_EXAM_PATTERN' || testMode === 'FULL_EXAM');
  const countToUse = isFullExam
    ? (localBp.total_questions || localBp.totalQuestions || 80)
    : (requestedCount || 30);

  let localQuestions = [];
  if (typeof getFilteredQuestions === 'function') {
    localQuestions = getFilteredQuestions(examId, isFullExam ? 'all' : subjectId, countToUse, boardId);
  }

  const isNeg = Boolean(localBp.is_negative_marking);
  const negVal = isNeg ? (localBp.negative_value !== undefined ? localBp.negative_value : 0.25) : 0.0;
  const marksCorr = (localBp.sections && localBp.sections[0] && localBp.sections[0].marks_correct) || (localBp.total_marks && localBp.total_questions ? (localBp.total_marks / localBp.total_questions) : 1.0);

  let sections = [];
  let partitionedQuestions = [];

  if (isFullExam && Array.isArray(localBp.sections) && localBp.sections.length > 0) {
    let qOffset = 0;
    sections = localBp.sections.map((sec, sIdx) => {
      const secCount = sec.question_count || sec.questionCount || Math.ceil(localQuestions.length / localBp.sections.length);
      const secAttempt = sec.questions_to_attempt !== undefined ? sec.questions_to_attempt : (sec.questionsToAttempt !== undefined ? sec.questionsToAttempt : secCount);
      const secMarks = sec.marks_correct !== undefined ? sec.marks_correct : marksCorr;
      const secNeg = sec.negative_value !== undefined ? sec.negative_value : (sec.marks_wrong !== undefined ? sec.marks_wrong : negVal);
      const secId = `sec-local-${sIdx + 1}`;

      const secQuestions = localQuestions.slice(qOffset, qOffset + secCount);
      secQuestions.forEach((q, idx) => {
        const resolvedQ = q.q || q.question || q.questionText || q.question_text || q.prompt || q.text || '';
        partitionedQuestions.push({
          id: q.id || `q-local-${sIdx}-${idx}`,
          sectionId: secId,
          sectionName: sec.name,
          questionType: q.questionType || 'single_mcq',
          q: resolvedQ,
          secondaryQ: q.secondaryQ || q.secondaryQuestion || q.secondary_question || '',
          options: q.options || [],
          correct: q.correct !== undefined ? q.correct : q.ans,
          explanation: q.explanation || q.exp || '',
          marksCorrect: secMarks,
          marksWrong: secNeg
        });
      });
      qOffset += secCount;

      return {
        sectionId: secId,
        name: sec.name,
        questionCount: secCount,
        questionsToAttempt: secAttempt,
        marksCorrect: secMarks,
        marksWrong: secNeg,
        hasNegativeMarking: isNeg,
        attemptRuleType: secAttempt < secCount ? 'ATTEMPT_N_OF_M' : 'ATTEMPT_ALL'
      };
    });

    if (partitionedQuestions.length < localQuestions.length && sections.length > 0) {
      const lastSec = sections[sections.length - 1];
      for (let i = partitionedQuestions.length; i < localQuestions.length; i++) {
        const q = localQuestions[i];
        const resolvedQ = q.q || q.question || q.questionText || q.question_text || q.prompt || q.text || '';
        partitionedQuestions.push({
          id: q.id || `q-local-rem-${i}`,
          sectionId: lastSec.sectionId,
          sectionName: lastSec.name,
          questionType: q.questionType || 'single_mcq',
          q: resolvedQ,
          secondaryQ: q.secondaryQ || q.secondaryQuestion || q.secondary_question || '',
          options: q.options || [],
          correct: q.correct !== undefined ? q.correct : q.ans,
          explanation: q.explanation || q.exp || '',
          marksCorrect: lastSec.marksCorrect,
          marksWrong: lastSec.marksWrong
        });
      }
      lastSec.questionCount = partitionedQuestions.filter(q => q.sectionId === lastSec.sectionId).length;
    }
  } else {
    const defaultSection = {
      sectionId: 'sec-local-1',
      name: 'Practice Drill',
      questionCount: localQuestions.length,
      questionsToAttempt: localQuestions.length,
      marksCorrect: marksCorr,
      marksWrong: isNeg ? negVal : 0.0,
      hasNegativeMarking: isNeg,
      attemptRuleType: 'ATTEMPT_ALL'
    };
    sections = [defaultSection];
    partitionedQuestions = localQuestions.map((q, idx) => {
      const resolvedQ = q.q || q.question || q.questionText || q.question_text || q.prompt || q.text || '';
      return {
        id: q.id || `q-local-${idx}`,
        sectionId: 'sec-local-1',
        sectionName: defaultSection.name,
        questionType: q.questionType || 'single_mcq',
        q: resolvedQ,
        secondaryQ: q.secondaryQ || q.secondaryQuestion || q.secondary_question || '',
        options: q.options || [],
        correct: q.correct !== undefined ? q.correct : q.ans,
        explanation: q.explanation || q.exp || '',
        marksCorrect: marksCorr,
        marksWrong: isNeg ? negVal : 0.0
      };
    });
  }

  return {
    sessionId: `local-${Date.now()}`,
    testMode,
    blueprint: localBp,
    sections,
    questions: partitionedQuestions,
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
    const qWord = typeof getTranslation === 'function' ? (getTranslation('quiz_question_label') || 'Question') : 'Question';
    const ofWord = currLang === 'en' ? 'of' : '/';
    counterEl.textContent = `${qWord} ${currentNum} ${ofWord} ${total}`;
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
    if (secInstr) {
      const eachQText = typeof getTranslation === 'function' ? (getTranslation('quiz_each_question') || 'Each question') : 'Each question';
      secInstr.textContent = currentSec.instructions || `${eachQText}: +${currentSec.marksCorrect || 1} mark.`;
    }
    if (secBadge) {
      if (currentSec.attemptRuleType === 'ATTEMPT_N_OF_M') {
        const attemptNText = typeof getTranslation === 'function' ? (getTranslation('quiz_attempt_n_of_m') || 'Attempt any {n} of {m} Qs') : 'Attempt any {n} of {m} Qs';
        secBadge.textContent = attemptNText.replace('{n}', currentSec.questionsToAttempt).replace('{m}', currentSec.questionCount);
      } else {
        const attemptAllText = typeof getTranslation === 'function' ? (getTranslation('quiz_attempt_all') || 'Attempt All Questions') : 'Attempt All Questions';
        secBadge.textContent = attemptAllText;
      }
    }
  }

  // Bilingual Question Text Rendering
  const qElem = document.getElementById('quizQuestionText');
  if (qElem) {
    const rawPrimary = q.q || q.question || q.questionText || q.question_text || q.prompt || q.text || '';
    let extractedEnglish = '';
    const engMatch = rawPrimary.match(/\[(?:English|अंग्रेजी|अंग्रेज़ी|In English|English Translation):\s*([^\]]+)\]/i)
      || rawPrimary.match(/\n\[English:\s*([^\]]+)\]/i)
      || (rawPrimary.includes('\n[') && rawPrimary.match(/\n\[([A-Za-z0-9\s\?,.:;'"\-\(\)\/\\+=]+)\]/));
    if (engMatch) {
      extractedEnglish = engMatch[1].trim();
    }

    const primaryText = cleanQuestionText(rawPrimary) || rawPrimary;
    const rawSecondary = q.secondaryQ || q.secondaryQuestion || q.secondary_question || extractedEnglish || '';
    let secondaryText = cleanQuestionText(rawSecondary) || rawSecondary;
    if (secondaryText.toLowerCase() === primaryText.toLowerCase()) {
      secondaryText = '';
    }
    const dualLabel = typeof getTranslation === 'function' ? (getTranslation('quiz_in_english_dual') || 'In English / Dual Medium:') : 'In English / Dual Medium:';

    const isUrdu = (q.resolvedMedium === 'ur') || /[\u0600-\u06FF]/.test(primaryText);
    const primaryDirAttr = isUrdu ? 'dir="rtl" style="text-align: right;"' : '';

    if (secondaryText && secondaryText !== primaryText) {
      qElem.innerHTML = `
        <div ${primaryDirAttr} class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug whitespace-pre-line">${primaryText}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2.5 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-2 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">${dualLabel}</span>
          <div class="whitespace-pre-line">${secondaryText}</div>
        </div>
      `;
    } else if (primaryText.includes('\n[English:')) {
      const parts = primaryText.split('\n[English:');
      const mainPart = cleanQuestionText(parts[0].trim());
      const engPart = cleanQuestionText(parts[1].replace(/\]\s*$/, '').trim());
      const isUrduMain = (q.resolvedMedium === 'ur') || /[\u0600-\u06FF]/.test(mainPart);
      const mainDirAttr = isUrduMain ? 'dir="rtl" style="text-align: right;"' : '';
      qElem.innerHTML = `
        <div ${mainDirAttr} class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug whitespace-pre-line">${mainPart}</div>
        <div class="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2.5 pl-3 border-l-4 border-rose-500/70 bg-rose-50/50 dark:bg-rose-950/30 py-2 rounded-r-xl">
          <span class="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 tracking-wider block">${dualLabel}</span>
          <div class="whitespace-pre-line">${engPart}</div>
        </div>
      `;
    } else {
      qElem.innerHTML = `<div ${primaryDirAttr} class="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug whitespace-pre-line">${primaryText}</div>`;
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
      const isPracticeMode = (activeQuiz.mode !== 'FULL_EXAM_PATTERN' && activeQuiz.mode !== 'FULL_EXAM') || activeQuiz.instantFeedback === true;
      const correctIdx = getNormalizedCorrectIndex(q);

      optContainer.innerHTML = (q.options || []).map((opt, optIndex) => {
        let styleClasses = "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer shadow-sm";
        let icon = `<span class="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-700 dark:text-slate-200 text-xs shrink-0">${String.fromCharCode(65 + optIndex)}</span>`;
        let disabledAttr = "";

        if (isAnswered) {
          if (isPracticeMode && correctIdx !== null) {
            disabledAttr = "disabled";
            if (optIndex === selectedAnswer) {
              if (selectedAnswer === correctIdx) {
                // Correct answer selected -> Emerald Green
                styleClasses = "bg-emerald-600 dark:bg-emerald-600 text-white border-2 border-emerald-700 dark:border-emerald-500 shadow-md font-bold ring-2 ring-emerald-400 cursor-default";
                icon = `<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✓</span>`;
              } else {
                // Wrong answer selected -> Crimson Red
                styleClasses = "bg-rose-600 dark:bg-rose-600 text-white border-2 border-rose-700 dark:border-rose-500 shadow-md font-bold ring-2 ring-rose-400 cursor-default";
                icon = `<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✕</span>`;
              }
            } else if (optIndex === correctIdx) {
              // The real correct answer revealed in Green when user picked wrong
              styleClasses = "bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-2 border-emerald-500 dark:border-emerald-400 shadow-md font-bold ring-2 ring-emerald-300 cursor-default";
              icon = `<span class="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0">✓</span>`;
            } else {
              styleClasses = "bg-slate-50 dark:bg-slate-850 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 opacity-60 cursor-default";
            }
          } else {
            // CBT mode selection (standard CBT blue highlight - NEVER red!)
            if (optIndex === selectedAnswer) {
              styleClasses = "bg-blue-600 dark:bg-blue-600 text-white border-2 border-blue-700 dark:border-blue-500 shadow-md font-bold ring-2 ring-blue-400";
              icon = `<span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-white text-xs shrink-0">✓</span>`;
            } else {
              styleClasses = "bg-slate-50 dark:bg-slate-850 text-slate-500 border border-slate-200 dark:border-slate-800 opacity-75";
            }
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

        const isUrduOpt = (q.resolvedMedium === 'ur') || /[\u0600-\u06FF]/.test(optDisplay);
        const optDirAttr = isUrduOpt ? 'dir="rtl" style="text-align: right;"' : '';

        return `
          <button 
            type="button" 
            ${disabledAttr}
            onclick="handleOptionSelection(${optIndex})"
            class="w-full text-left p-4 rounded-2xl transition duration-150 flex items-center space-x-3 active:scale-98 ${styleClasses}">
            ${icon}
            <span ${optDirAttr} class="text-sm font-semibold leading-snug flex-1">${optDisplay}</span>
          </button>
        `;
      }).join('');
    }
  }

  // Explanation Card (reveals immediately in practice mode when answered)
  const expCard = document.getElementById('quizExplanationCard');
  const expText = document.getElementById('quizExplanationText');
  const isPracticeMode = (activeQuiz.mode !== 'FULL_EXAM_PATTERN' && activeQuiz.mode !== 'FULL_EXAM') || activeQuiz.instantFeedback === true;
  const correctIdx = getNormalizedCorrectIndex(q);

  if (expCard && expText) {
    if (isAnswered && isPracticeMode && correctIdx !== null) {
      expCard.classList.remove('hidden');
      const isCorrect = selectedAnswer === correctIdx;
      const correctLetter = String.fromCharCode(65 + correctIdx);
      const marksVal = q.marksCorrect || 1;

      const badgeHtml = isCorrect
        ? `<div class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-black text-xs mb-2 border border-emerald-300 dark:border-emerald-700">
             <span>✅</span>
             <span>सही उत्तर! (+${marksVal} अंक) / Correct Answer!</span>
           </div>`
        : `<div class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 font-black text-xs mb-2 border border-rose-300 dark:border-rose-700">
             <span>❌</span>
             <span>गलत उत्तर! (0 अंक) — सही विकल्प [${correctLetter}] है / Incorrect. Correct Option: [${correctLetter}]</span>
           </div>`;

      const expBody = q.explanation || q.exp || (q.ans ? `💡 सही उत्तर: ${q.ans}` : 'Detailed conceptual breakdown verified against official syllabus.');
      expText.innerHTML = `
        ${badgeHtml}
        <div class="text-slate-800 dark:text-slate-200 leading-relaxed font-medium pt-1 whitespace-pre-line">${expBody}</div>
      `;
    } else {
      expCard.classList.add('hidden');
    }
  }

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

  // In Practice Mode: if already answered or locked, question is STRICTLY LOCKED!
  const isPracticeMode = (activeQuiz.mode !== 'FULL_EXAM_PATTERN' && activeQuiz.mode !== 'FULL_EXAM') || activeQuiz.instantFeedback === true;
  if (isPracticeMode && (activeQuiz.userAnswers.hasOwnProperty(qKey) || (activeQuiz.lockedQuestions && activeQuiz.lockedQuestions[qKey]))) {
    return; // Prevent repeated tapping / multi-click bug!
  }

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

  // Immediately lock all buttons in DOM before re-render to eliminate click race conditions
  if (isPracticeMode) {
    if (!activeQuiz.lockedQuestions) activeQuiz.lockedQuestions = {};
    activeQuiz.lockedQuestions[qKey] = true;
    const optContainer = document.getElementById('quizOptionsContainer');
    if (optContainer) {
      const btns = optContainer.querySelectorAll('button');
      btns.forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });
    }
  }

  activeQuiz.userAnswers[qKey] = optionIndex;

  // Play audio cue in practice mode
  if (isPracticeMode) {
    const correctIdx = getNormalizedCorrectIndex(q);
    if (correctIdx !== null) {
      playQuizFeedbackSound(optionIndex === correctIdx);
    }
  }

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
  if (activeQuiz.lockedQuestions && activeQuiz.lockedQuestions.hasOwnProperty(qKey)) {
    delete activeQuiz.lockedQuestions[qKey];
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

  const markText = typeof getTranslation === 'function' ? getTranslation('quiz_mark_review') : '🟣 Mark for Review';

  if (activeQuiz.reviewFlags[qKey]) {
    btn.className = "text-xs font-black text-white bg-purple-600 hover:bg-purple-700 border border-purple-700 px-4 py-3 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm";
    btn.innerHTML = '<span>🟣 Marked for Review</span>';
  } else {
    btn.className = "text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-3 rounded-xl transition cursor-pointer flex items-center space-x-1.5 shadow-sm";
    btn.innerHTML = `<span>${markText}</span>`;
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
    const answeredText = typeof getTranslation === 'function' ? (getTranslation('quiz_palette_answered') || 'Answered') : 'Answered';
    const reviewText = typeof getTranslation === 'function' ? (getTranslation('quiz_palette_review') || 'Review') : 'Review';
    const leftText = typeof getTranslation === 'function' ? (getTranslation('quiz_palette_unanswered') || 'Left') : 'Left';
    statElem.innerHTML = `
      <span class="text-emerald-700 dark:text-emerald-400 font-bold">🟢 ${answered} ${answeredText}</span>
      <span class="text-slate-300">|</span>
      <span class="text-purple-700 dark:text-purple-400 font-bold">🟣 ${reviewCount} ${reviewText}</span>
      <span class="text-slate-300">|</span>
      <span class="text-slate-500 font-medium">⏳ ${remaining} ${leftText}</span>
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
      finalizeQuizSubmission(false);
      return;
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
      const correctIdx = getNormalizedCorrectIndex(q);
      if (correctIdx !== null && activeQuiz.userAnswers[qKey] === correctIdx) correct++;
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

  // Dynamic Scorecard Simulator / Academic Evaluation
  const rankTitleEl = document.getElementById('scorecardRankTitle');
  const airEl = document.getElementById('scorecardAir');
  const rankSubEl = document.getElementById('scorecardRankSubtitle');
  const pctTitleEl = document.getElementById('scorecardPercentileTitle');
  const percEl = document.getElementById('scorecardPercentile');
  const pctSubEl = document.getElementById('scorecardPercentileSubtitle');

  const examStr = String(activeQuiz.exam || '').toLowerCase();
  const boardStr = String(activeQuiz.board || '').toLowerCase();
  const isBoard = Boolean(
    activeQuiz.board || 
    examStr.startsWith('board-') || 
    examStr.includes('cbse') || 
    examStr.includes('bseb') || 
    examStr.includes('upmsp') || 
    examStr.includes('icse') || 
    examStr.includes('matric') || 
    examStr.includes('inter') ||
    boardStr.length > 0
  );

  const stateKeywords = ['police', 'constable', 'si', 'daroga', 'patwari', 'lekpal', 'reet', 'uptet', 'btet', 'mptet', 'uppsc', 'bpsc', 'mppsc', 'rpsc', 'wbpsc', 'tnpsc', 'appsc', 'tspsc', 'kpsc', 'gpsc', 'hpsc', 'jpsc'];
  const isStateExam = !isBoard && stateKeywords.some(kw => examStr.includes(kw));

  const pct = Number(sum.percentage) || 0;
  const acc = Number(sum.accuracy) || 0;

  if (isBoard) {
    // 1. School Boards: Division & Grade (Never All India Rank)
    if (rankTitleEl) rankTitleEl.textContent = '🎓 बोर्ड परीक्षा परिणाम (Division)';
    if (airEl) {
      if (pct >= 60) {
        airEl.textContent = '1st Division (प्रथम श्रेणी)';
        airEl.className = 'text-xl font-black text-emerald-400';
      } else if (pct >= 45) {
        airEl.textContent = '2nd Division (द्वितीय श्रेणी)';
        airEl.className = 'text-xl font-black text-amber-400';
      } else if (pct >= 33) {
        airEl.textContent = '3rd Division (तृतीय श्रेणी)';
        airEl.className = 'text-xl font-black text-blue-400';
      } else {
        airEl.textContent = 'Compartment (सुधार की आवश्यकता)';
        airEl.className = 'text-base font-black text-rose-400';
      }
    }
    if (rankSubEl) rankSubEl.innerHTML = 'Board Standard Passing Criteria<br>बोर्ड उत्तीर्ण मानक (33% न्यूनतम)';

    if (pctTitleEl) pctTitleEl.textContent = '📊 मूल्यांकन ग्रेड (CCE Grade)';
    if (percEl) {
      let grade = 'Grade E';
      let gradeColor = 'text-rose-400';
      if (pct >= 90) { grade = 'Grade A1 (उत्कृष्ट)'; gradeColor = 'text-emerald-400'; }
      else if (pct >= 80) { grade = 'Grade A2 (अति उत्तम)'; gradeColor = 'text-emerald-300'; }
      else if (pct >= 70) { grade = 'Grade B1 (बहुत अच्छा)'; gradeColor = 'text-cyan-400'; }
      else if (pct >= 60) { grade = 'Grade B2 (अच्छा)'; gradeColor = 'text-blue-400'; }
      else if (pct >= 50) { grade = 'Grade C1 (संतोषजनक)'; gradeColor = 'text-amber-400'; }
      else if (pct >= 33) { grade = 'Grade D (उत्तीर्ण)'; gradeColor = 'text-yellow-400'; }
      percEl.textContent = grade;
      percEl.className = `text-xl font-black ${gradeColor}`;
    }
    if (pctSubEl) pctSubEl.innerHTML = 'Continuous Evaluation<br>शैक्षणिक प्रदर्शन ब्रैकेट';
  } else if (isStateExam) {
    // 2. State-Level Exams: State Merit Rank & State Percentile
    if (rankTitleEl) rankTitleEl.textContent = '🏛️ राज्य मेरिट रैंक (State Merit Rank)';
    if (airEl) {
      let stateRank = 15;
      if (pct >= 95) stateRank = Math.max(1, Math.round(15 + (100 - pct) * 20));
      else if (pct >= 80) stateRank = Math.round(120 + (95 - pct) * 60);
      else if (pct >= 60) stateRank = Math.round(1020 + (80 - pct) * 150);
      else stateRank = Math.round(4050 + (60 - pct) * 280);
      airEl.textContent = `#${stateRank.toLocaleString()}`;
      airEl.className = 'text-2xl font-black text-amber-400';
    }
    if (rankSubEl) rankSubEl.innerHTML = 'Out of 50,000+<br>State-Level Aspirants';

    if (pctTitleEl) pctTitleEl.textContent = '📈 राज्य पर्सेंटाइल (State Percentile)';
    if (percEl) {
      const statePctile = Math.min(99.9, Math.max(5.0, (pct * 0.98 + (acc * 0.02))).toFixed(1));
      percEl.textContent = `${statePctile} %ile`;
      percEl.className = 'text-2xl font-black text-emerald-400';
    }
    if (pctSubEl) pctSubEl.innerHTML = `Top ${Math.max(0.1, (100 - (pct * 0.98 + (acc * 0.02)))).toFixed(1)}% State<br>Merit Bracket`;
  } else {
    // 3. Central & National Competitive Exams: Projected AIR & National Percentile
    if (rankTitleEl) rankTitleEl.textContent = '🏆 Projected All-India Rank (AIR)';
    if (airEl) {
      let air = 45;
      if (pct >= 95) air = Math.max(1, Math.round(45 + (100 - pct) * 50));
      else if (pct >= 80) air = Math.round(295 + (95 - pct) * 180);
      else if (pct >= 60) air = Math.round(2995 + (80 - pct) * 450);
      else air = Math.round(11995 + (60 - pct) * 850);
      airEl.textContent = `#${air.toLocaleString()}`;
      airEl.className = 'text-2xl font-black text-amber-400';
    }
    if (rankSubEl) rankSubEl.innerHTML = 'Out of 2,50,000+<br>Simulated Candidates';

    if (pctTitleEl) pctTitleEl.textContent = '📈 स्कोर पर्सेंटाइल (National Percentile)';
    if (percEl) {
      const airPctile = Math.min(99.9, Math.max(5.0, (pct * 0.99 + (acc * 0.01))).toFixed(1));
      percEl.textContent = `${airPctile} %ile`;
      percEl.className = 'text-2xl font-black text-emerald-400';
    }
    if (pctSubEl) pctSubEl.innerHTML = `Top ${Math.max(0.1, (100 - (pct * 0.99 + (acc * 0.01)))).toFixed(1)}% Nationwide<br>Merit Bracket`;
  }

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

  document.body.classList.remove('in-quiz');
  const chatBubbleScorecard = document.getElementById('floatingChatbotWidget');
  if (chatBubbleScorecard) chatBubbleScorecard.classList.remove('hidden');

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

  document.body.classList.remove('in-quiz');
  const chatBubbleReset = document.getElementById('floatingChatbotWidget');
  if (chatBubbleReset) chatBubbleReset.classList.remove('hidden');

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
  } else {
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
  } else if (typeof showAppAlert === 'function') {
    showAppAlert(`₹${price} UPI भुगतान गेटवे लोड हो रहा है...`, 'UPI Payment', '💳');
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

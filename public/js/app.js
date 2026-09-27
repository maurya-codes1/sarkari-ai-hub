// Main Application Orchestrator: Tabs, Directory, Search, Mobile Drawer, AI Chatbot & Server Mirrors
let activeDirectoryCategory = 'all';

function switchTab(tabId) {
  // Pause quiz timer if navigating away from quiz tab
  if (tabId !== 'quiz' && typeof activeQuiz !== 'undefined' && activeQuiz && activeQuiz.timerInterval) {
    clearInterval(activeQuiz.timerInterval);
    activeQuiz.timerInterval = null;
  }

  // Hide all tab sections
  const sections = document.querySelectorAll('.tab-section');
  sections.forEach(sec => sec.classList.add('hidden'));

  // Show target section
  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav link active states
  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('bg-saffron-500', 'text-white', 'shadow-md');
      btn.classList.remove('text-slate-300', 'hover:bg-slate-800');
    } else {
      btn.classList.remove('bg-saffron-500', 'text-white', 'shadow-md');
      btn.classList.add('text-slate-300', 'hover:bg-slate-800');
    }
  });

  // Close mobile drawer if open
  closeMobileMenu();
}

function navigateToHome(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  // Pause quiz timer if active
  if (typeof activeQuiz !== 'undefined' && activeQuiz && activeQuiz.timerInterval) {
    clearInterval(activeQuiz.timerInterval);
    activeQuiz.timerInterval = null;
  }
  // Close any open menus or modals
  if (typeof closeMobileMenu === 'function') closeMobileMenu();
  if (typeof closeDesktopToolsMenu === 'function') closeDesktopToolsMenu();
  if (typeof closeAppModal === 'function') closeAppModal();

  // Hide dedicated exam container if open
  const detailContainer = document.getElementById('dedicatedExamContainer');
  if (detailContainer) detailContainer.classList.add('hidden');

  // Hide universal back bar
  const backBar = document.getElementById('universalBackBar');
  if (backBar) backBar.classList.add('hidden');

  // Set hash to #home
  if (window.location.hash !== '#home') {
    window.location.hash = '#home';
  }

  // Force show home tab
  switchTab('home');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchDirectoryCategory(cat) {
  activeDirectoryCategory = cat || 'all';
  
  // Navigate to directory tab
  window.location.hash = '#directory';

  // Update button active classes
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(b => {
    if (b.getAttribute('data-cat') === activeDirectoryCategory) {
      b.classList.remove('bg-white', 'text-slate-700', 'text-slate-800');
      b.classList.add('bg-blue-900', 'text-white', 'shadow-md');
    } else {
      b.classList.remove('bg-blue-900', 'text-white', 'shadow-md');
      b.classList.add('bg-white', 'text-slate-800');
    }
  });

  renderDirectoryCards();

  setTimeout(() => {
    const el = document.getElementById('directoryCardsContainer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 120);
}

function initDirectory() {
  renderDirectoryCards();

  // Category filter tabs
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-900', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.remove('bg-white', 'text-slate-700');
      btn.classList.add('bg-blue-900', 'text-white', 'shadow-md');
      activeDirectoryCategory = btn.getAttribute('data-cat') || 'all';
      renderDirectoryCards();
    });
  });
}

function renderDirectoryCards(filteredList = null) {
  const container = document.getElementById('directoryCardsContainer');
  if (!container || typeof EXAMS_DATABASE === 'undefined') return;

  const exams = filteredList || getExamsByCategory(activeDirectoryCategory);

  if (exams.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <span class="text-5xl">🔍</span>
        <h4 class="font-bold text-slate-800 text-lg mt-3">Koi Exam ya Board Nahi Mila</h4>
        <p class="mt-1 text-xs text-slate-400">Kripya spellings check karein ya category badal kar dekhein.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = exams.map(exam => {
    const isBoard = exam.category === 'boards';
    const cardClass = getCategoryCardClass(exam.category);

    return `
      <div onclick="navigateToExam('${exam.id}')" class="rounded-3xl p-6 shadow-md hover:shadow-2xl active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group border border-slate-200/80 cursor-pointer ${cardClass}">
        <div>
          <!-- Header Badges -->
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-black ${getCategoryBadgeColor(exam.category)} shadow-sm">
              ${formatCategoryLabel(exam.category)}
            </span>
            <span class="text-xs font-bold text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-lg border border-slate-200/60">${exam.state}</span>
          </div>

          <a href="#exam/${exam.id}" onclick="event.stopPropagation();" class="font-black text-slate-900 text-lg group-hover:text-blue-700 transition leading-snug block hover:underline">
            ${exam.name}
          </a>
          <p class="text-xs text-slate-500 mt-1 font-semibold">${exam.conductingBody}</p>

          <!-- Specs Info Box -->
          <div class="mt-4 p-4 bg-white/90 rounded-2xl border border-slate-200/80 text-xs space-y-2.5 shadow-inner">
            <div>
              <span class="text-slate-400 block text-[10px] uppercase font-black tracking-wider">🎓 Eligibility & Age Criteria</span>
              <span class="text-slate-800 font-semibold leading-relaxed">${exam.eligibility}</span>
              <span class="text-blue-700 font-bold block text-xs mt-1">(${exam.ageLimit})</span>
            </div>

            <div class="pt-2.5 border-t border-slate-200 flex items-center justify-between">
              <span class="text-slate-600 font-bold text-xs">📸 Photo Rules:</span>
              <span class="font-black text-amber-700 text-xs bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                ${exam.photoSpecs.minKb}-${exam.photoSpecs.maxKb} KB (${exam.photoSpecs.width}x${exam.photoSpecs.height}px)
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row gap-2.5">
          <button type="button" onclick="event.stopPropagation(); navigateToExam('${exam.id}')" class="flex-1 text-center bg-blue-900 hover:bg-blue-800 text-white font-black text-xs py-3 px-3 rounded-xl shadow transition cursor-pointer active:scale-95">
            📄 Full Details →
          </button>
          <button type="button" onclick="event.stopPropagation(); applyPresetAndJump('${exam.id}')" class="flex-1 text-center bg-gradient-to-r from-saffron-500 to-orange-600 hover:from-saffron-600 hover:to-orange-700 text-white font-black text-xs py-3 px-3 rounded-xl shadow-md transition cursor-pointer active:scale-95">
            📸 Resize Photo
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryCardClass(cat) {
  switch (cat) {
    case 'boards': return 'card-board';
    case 'central': return 'card-central';
    case 'police': return 'card-police';
    case 'entrance': return 'card-entrance';
    case 'teaching': return 'card-teaching';
    default: return 'bg-white';
  }
}

function getCategoryBadgeColor(cat) {
  switch (cat) {
    case 'boards': return 'bg-amber-500 text-white';
    case 'central': return 'bg-blue-700 text-white';
    case 'police': return 'bg-rose-600 text-white';
    case 'entrance': return 'bg-emerald-600 text-white';
    case 'teaching': return 'bg-purple-600 text-white';
    default: return 'bg-slate-700 text-white';
  }
}

function formatCategoryLabel(cat) {
  switch (cat) {
    case 'boards': return '🎓 10th/12th Board';
    case 'central': return '🏛️ Central & Defence';
    case 'police': return '👮 Police Bharti';
    case 'entrance': return '🩺 National Entrance';
    case 'teaching': return '👨‍🏫 Teaching / TET';
    default: return cat;
  }
}

// 1-Click: apply preset and switch to Resizer tab
function applyPresetAndJump(examId) {
  window.location.hash = '#tool/resizer';
  setTimeout(() => {
    const presetSelect = document.getElementById('examPresetSelect');
    if (presetSelect) {
      presetSelect.value = examId;
      handlePresetChange();
    }
  }, 100);
}

// Mobile Hamburger Drawer
function toggleMobileMenu(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
  }
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer) {
    const isOpening = drawer.classList.contains('hidden');
    if (isOpening) {
      drawer.classList.remove('hidden');
      if (backdrop) backdrop.classList.remove('hidden');
    } else {
      drawer.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
    }
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  if (drawer) {
    drawer.classList.add('hidden');
  }
  if (backdrop) {
    backdrop.classList.add('hidden');
  }
}

// ================= DESKTOP "OTHER TOOLS" (11 TOOLS) DROPDOWN CONTROLLER =================
let isDesktopToolsLocked = false;

function toggleDesktopToolsMenu(event) {
  if (event) {
    if (typeof event.stopPropagation === 'function') event.stopPropagation();
    if (typeof event.preventDefault === 'function') event.preventDefault();
  }
  const menu = document.getElementById('desktopToolsMenu');
  if (!menu) return;

  const isHidden = menu.classList.contains('hidden');
  if (isHidden) {
    openDesktopToolsMenu(true);
  } else {
    closeDesktopToolsMenu();
  }
}

function openDesktopToolsMenu(locked = true) {
  const menu = document.getElementById('desktopToolsMenu');
  const arrow = document.getElementById('desktopToolsArrow');
  const btn = document.getElementById('desktopToolsBtn');
  if (!menu) return;

  menu.classList.remove('hidden');
  if (arrow) arrow.textContent = '▲';
  if (btn) {
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('bg-slate-800', 'text-white');
  }
  isDesktopToolsLocked = locked;
}

function closeDesktopToolsMenu() {
  const menu = document.getElementById('desktopToolsMenu');
  const arrow = document.getElementById('desktopToolsArrow');
  const btn = document.getElementById('desktopToolsBtn');
  if (!menu) return;

  menu.classList.add('hidden');
  if (arrow) arrow.textContent = '▼';
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('bg-slate-800', 'text-white');
  }
  isDesktopToolsLocked = false;
}

function handleToolItemClick(event, toolId) {
  closeDesktopToolsMenu();
  if (window.location.hash === `#tool/${toolId}`) {
    if (typeof showDedicatedTool === 'function') {
      showDedicatedTool(toolId);
    }
  }
}

// Global click-outside listener: If user clicks ANYWHERE outside the 11 tools dropdown, close it!
document.addEventListener('click', (event) => {
  const container = document.getElementById('desktopToolsDropdownContainer');
  if (container && !container.contains(event.target)) {
    closeDesktopToolsMenu();
  }
});

// Setup hover assistance with safety lock:
function initDesktopToolsHover() {
  const container = document.getElementById('desktopToolsDropdownContainer');
  if (!container) return;

  container.addEventListener('mouseenter', () => {
    if (!isDesktopToolsLocked) {
      openDesktopToolsMenu(false);
    }
  });

  container.addEventListener('mouseleave', () => {
    // If the user tapped/clicked to lock it open, NEVER close on mouseleave!
    if (!isDesktopToolsLocked) {
      closeDesktopToolsMenu();
    }
  });
}

document.addEventListener('DOMContentLoaded', initDesktopToolsHover);

// ================= FLOATING AI SARKARI TUTOR CHATBOT =================
function toggleChatbot() {
  const chatWindow = document.getElementById('sarkariChatWindow');
  if (chatWindow) {
    chatWindow.classList.toggle('hidden');
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHtml = escapeHtml;

function formatAiResponse(raw) {
  if (!raw) return '';
  const escaped = escapeHtml(raw);
  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

async function sendChatMessage(promptText = null) {
  const input = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const text = promptText || input?.value?.trim();

  if (!text) return;
  if (!promptText && input) input.value = '';

  // Append user message with XSS escaping
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'flex justify-end';
  userMsgEl.innerHTML = `
    <div class="bg-blue-900 text-white text-xs rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] shadow-sm font-medium">
      ${escapeHtml(text)}
    </div>
  `;
  chatMessages.appendChild(userMsgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Typing indicator
  const typingEl = document.createElement('div');
  typingEl.id = 'botTyping';
  typingEl.className = 'flex justify-start';
  typingEl.innerHTML = `
    <div class="bg-slate-100 text-slate-500 text-xs rounded-2xl rounded-tl-none px-4 py-2 flex items-center space-x-1.5 shadow-sm">
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
      <span class="text-[11px] ml-1">Sarkari AI सोच रहा है...</span>
    </div>
  `;
  chatMessages.appendChild(typingEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text, language: currentLanguage || 'hi' })
    });
    const data = await res.json();
    
    // Remove typing
    const typing = document.getElementById('botTyping');
    if (typing) typing.remove();

    // Append AI reply with safe markdown formatting
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'flex justify-start';
    botMsgEl.innerHTML = `
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-slate-800 text-xs rounded-2xl rounded-tl-none p-3.5 max-w-[90%] shadow-sm leading-relaxed whitespace-pre-line font-medium">
        <div class="flex items-center space-x-1.5 text-saffron-700 font-bold mb-1">
          <span>🇮🇳 Sarkari AI Guide:</span>
        </div>
        ${formatAiResponse(data.answer || '')}
      </div>
    `;
    chatMessages.appendChild(botMsgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    const typing = document.getElementById('botTyping');
    if (typing) typing.remove();

    const errEl = document.createElement('div');
    errEl.className = 'flex justify-start';
    errEl.innerHTML = `
      <div class="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-2xl rounded-tl-none p-3 max-w-[85%] font-medium">
        Kripya dobara koshish karein ya portal ke tool se check karein.
      </div>
    `;
    chatMessages.appendChild(errEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Global DOM init
document.addEventListener('DOMContentLoaded', () => {
  initDirectory();

  // Language selectors sync
  const langSelect = document.getElementById('langSelectDropdown');
  const mobileLangSelect = document.getElementById('mobileLangSelectDropdown');

  if (langSelect) {
    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }
  if (mobileLangSelect) {
    mobileLangSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  // Outside click / touch listener to dismiss mobile menu drawer
  const handleOutsideMenuClick = (e) => {
    const drawer = document.getElementById('mobileNavDrawer');
    const btn = document.getElementById('mobileMenuBtn');
    if (drawer && !drawer.classList.contains('hidden')) {
      if (!drawer.contains(e.target) && (!btn || !btn.contains(e.target))) {
        closeMobileMenu();
      }
    }
  };

  document.addEventListener('click', handleOutsideMenuClick);
  document.addEventListener('touchstart', handleOutsideMenuClick, { passive: true });

  // Escape key closes mobile menu & centered modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeAppModal();
    }
  });
});

// ================= UNIVERSAL CENTERED BILINGUAL APP MODAL ENGINE =================
const MODAL_I18N = {
  exit_quiz: {
    icon: '🚪',
    title: {
      en: 'Exit Test',
      hi: 'क्विज़ छोड़ें?',
      'hi-latn': 'Quiz Chhodein?',
      bn: 'কুইজ ছাড়বেন?',
      ta: 'தேர்விலிருந்து வெளியேறவா?',
      te: 'క్విజ్ నుండి నిష్క్రమించాలా?',
      mr: 'चाचणी सोडायची का?',
      gu: 'ટેસ્ટ છોડવો છે?',
      kn: 'ರಸಪ್ರಶ್ನೆ ಬಿಡಬೇಕೆ?',
      ml: 'ടെസ്റ്റിൽ നിന്ന് പുറത്തുകടക്കണോ?',
      pa: 'ਕੁਇਜ਼ ਛੱਡਣੀ ਹੈ?',
      ur: 'کوئز چھوڑیں؟',
      or: 'ପରୀକ୍ଷା ଛାଡିବେ କି?',
      sa: 'प्रश्नोत्तरीं त्यजतु वा?'
    },
    message_main: {
      en: 'Are you sure you want to exit the test?',
      hi: 'क्या आप सच में टेस्ट छोड़ना चाहते हैं?',
      'hi-latn': 'Kya aap sach me test chhodna chahte hain?',
      bn: 'আপনি কি সত্যিই পরীক্ষা ছাড়তে চান?',
      ta: 'நீங்கள் நிச்சயமாக தேர்விலிருந்து வெளியேற விரும்புகிறீர்களா?',
      te: 'మీరు నిజంగా పరీక్ష నుండి నిష్క్రమించాలనుకుంటున్నారా?',
      mr: 'तुम्हाला नक्की चाचणी सोडायची आहे का?',
      gu: 'શું તમે ખરેખર ટેસ્ટ છોડવા માંગો છો?',
      kn: 'ನೀವು ಖಚಿತವಾಗಿ ಪರೀಕ್ಷೆಯಿಂದ ನಿರ್ಗಮಿಸಲು ಬಯಸುವಿರಾ?',
      ml: 'നിങ്ങൾക്ക് തീർച്ചയായും ടെസ്റ്റിൽ നിന്ന് പുറത്തുകടക്കണമെന്നുണ്ടോ?',
      pa: 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਟੈਸਟ ਛੱਡਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
      ur: 'کیا آپ واقعی ٹیسٹ چھوڑنا چاہتے ہیں؟',
      or: 'ଆପଣ ପ୍ରକୃତରେ ପରୀକ୍ଷା ଛାଡିବାକୁ ଚାହୁଁଛନ୍ତି କି?',
      sa: 'किं भवान् वस्तुतः परीक्षां त्यक्तुम् इच्छति?'
    },
    message_sub: {
      en: 'Your current progress will be reset.',
      hi: 'आपकी वर्तमान प्रगति रिसेट हो जाएगी।',
      'hi-latn': 'Aapki current progress reset ho jayegi.',
      bn: 'আপনার বর্তমান অগ্রগতি রিসেট হয়ে যাবে।',
      ta: 'உங்கள் தற்போதைய முன்னேற்றம் மீட்டமைக்கப்படும்.',
      te: 'మీ ప్రస్తుత పురోగతి రీసెట్ చేయబడుతుంది.',
      mr: 'तुमची चालू प्रगती रीसेट केली जाईल.',
      gu: 'તમારી વર્તમાન પ્રગતિ રીસેટ થઈ જશે.',
      kn: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಪ್ರಗತಿ ಮರುಹೊಂದಿಸಲಾಗುವುದು.',
      ml: 'നിങ്ങളുടെ നിലവിലെ പുരോഗതി പുനഃസജ്ജമാക്കും.',
      pa: 'ਤੁਹਾਡੀ ਮੌਜੂਦਾ ਤਰੱਕੀ ਰੀਸੈਟ ਹੋ ਜਾਵੇਗੀ।',
      ur: 'آپ کی موجودہ پیشرفت دوبارہ ترتیب دی جائے گی۔',
      or: 'ଆପଣଙ୍କର ବର୍ତ୍ତମାନର ଅଗ୍ରଗତି ପୁନଃସେଟ୍ ହୋଇଯିବ।',
      sa: 'भवतः वर्तमाना प्रगतिः पुनः स्थापिता भविष्यति।'
    },
    cancelText: {
      en: 'Cancel',
      hi: 'वापस टेस्ट दें',
      'hi-latn': 'Wapas Test Dein',
      bn: 'পরীক্ষায় ফিরে যান',
      ta: 'தேர்வுக்குத் திரும்பு',
      te: 'పరీక్షకు తిరిగి వెళ్ళు',
      mr: 'चाचणीवर परत जा',
      gu: 'ટેસ્ટ પર પાછા જાઓ',
      kn: 'ಪರೀಕ್ಷೆಗೆ ಹಿಂತಿರುಗಿ',
      ml: 'പരീക്ഷയിലേക്ക് ಮടങ്ങുക',
      pa: 'ਟੈਸਟ ਤੇ ਵਾਪਸ ਜਾਓ',
      ur: 'ٹیسٹ پر واپس جائیں',
      or: 'ପରୀକ୍ଷାକୁ ଫେରନ୍ତୁ',
      sa: 'परीक्षां प्रति आगच्छतु'
    },
    confirmText: {
      en: 'Exit',
      hi: 'हाँ, टेस्ट छोड़ें',
      'hi-latn': 'Haan, Test Chhodein',
      bn: 'হ্যাঁ, পরীক্ষা ছাড়ুন',
      ta: 'ஆம், வெளியேறு',
      te: 'అవును, నిష్క్రమించు',
      mr: 'होय, चाचणी सोडा',
      gu: 'હા, ટેસ્ટ છોડો',
      kn: 'ಹೌದು, ನಿರ್ಗಮಿಸಿ',
      ml: 'അതെ, പുറത്തുകടക്കുക',
      pa: 'ਹਾਂ, ਟੈਸਟ ਛੱਡੋ',
      ur: 'ہاں، ٹیسਟ چھوڑیں',
      or: 'ହଁ, ପରୀକ୍ଷା ଛାଡନ୍ତୁ',
      sa: 'आम्, त्यजतु'
    }
  },

  clear_vault: {
    icon: '🗑️',
    title: {
      en: 'Clear Vault',
      hi: 'तिजोरी खाली करें?',
      'hi-latn': 'Tijori Khali Karein?',
      bn: 'ভল্ট খালি করবেন?',
      ta: 'பெட்டகத்தை அழிக்கவா?',
      te: 'వాల్ట్‌ను ఖాళీ చేయాలా?',
      mr: 'तिजोरी रिकामी करायची?',
      gu: 'તિજોરી ખાલી કરવી છે?',
      kn: 'ವಾಲ್ಟ್ ತೆರವುಗೊಳಿಸಬೇಕೆ?',
      ml: 'വോൾട്ട് മായ്‌ക്കണോ?',
      pa: 'ਤਿਜੋਰੀ ਖਾਲੀ ਕਰਨੀ ਹੈ?',
      ur: 'والٹ خالی کریں؟',
      or: 'ଭଲ୍ଟ ଖାଲି କରିବେ କି?',
      sa: 'कोषं रिक्तं करोतु वा?'
    },
    message_main: {
      en: 'Are you sure you want to remove all saved bookmarks?',
      hi: 'क्या आप अपनी रिवीजन तिजोरी के सभी बुकमार्क हटाना चाहते हैं?',
      'hi-latn': 'Kya aap apni revision tijori ke sabhi bookmarks hatana chahte hain?',
      bn: 'আপনি কি আপনার রিভিশন ভল্টের সমস্ত বুকমার্ক মুছে ফেলতে চান?',
      ta: 'உங்கள் திருத்தப் பெட்டகத்தின் அனைத்து புக்மார்க்குகளையும் அகற்ற விரும்புகிறீர்களா?',
      te: 'మీరు మీ రివిజన్ వాల్ట్ నుండి అన్ని బుక్‌మార్క్‌లను తీసివేయాలనుకుంటున్నారా?',
      mr: 'तुम्हाला तुमच्या उजळणी तिजोरीतील सर्व बुकमार्क काढून टाकायचे आहेत का?',
      gu: 'શું તમે તમારી રિવિઝન તિજોરીમાંથી તમામ બુકમાર્ક્સ દૂર કરવા માંગો છો?',
      kn: 'ನಿಮ್ಮ ಪರಿಷ್ಕರಣೆ ವಾಲ್ಟ್‌ನ ಎಲ್ಲಾ ಬುಕ್‌ಮಾರ್ಕ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಲು ನೀವು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?',
      ml: 'നിങ്ങളുടെ റിവിഷൻ വോൾട്ടിൽ നിന്നുള്ള എല്ലാ ബുക്ക്മാർക്കുകളും നീക്കംചെയ്യണമെന്ന് ഉറപ്പാണോ?',
      pa: 'ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਰੀਵਿਜ਼ਨ ਤਿਜੋਰੀ ਤੋਂ ਸਾਰੇ ਬੁੱਕਮਾਰਕ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
      ur: 'کیا آپ اپنے ریویژن والٹ سے تمام بُک مارکس کو ہٹانا چاہتے ہیں؟',
      or: 'ଆପଣ ନିଜ ରିଭିଜନ୍ ଭଲ୍ଟରୁ ସମସ୍ତ ବୁକମାର୍କ ହଟାଇବାକୁ ଚାହୁଁଛନ୍ତି କି?',
      sa: 'किं भवान् स्वस्य पुनरावृत्तिकोषात् सर्वान् बुकमार्कान् निष्कासयितुम् इच्छति?'
    },
    cancelText: {
      en: 'Cancel',
      hi: 'रद्द करें',
      'hi-latn': 'Cancel Karein',
      bn: 'বাতিল করুন',
      ta: 'ரத்து செய்',
      te: 'రద్దు చేయి',
      mr: 'रद्द करा',
      gu: 'રદ કરો',
      kn: 'ರದ್ದುಮಾಡಿ',
      ml: 'റദ്ദാക്കുക',
      pa: 'ਰੱਦ ਕਰੋ',
      ur: 'منسوخ کریں',
      or: 'ବାତିଲ୍ କରନ୍ତୁ',
      sa: 'निरस्यतु'
    },
    confirmText: {
      en: 'Delete All',
      hi: 'हाँ, सभी हटाएं',
      'hi-latn': 'Haan, Sabhi Hatayein',
      bn: 'হ্যাঁ, সব মুছুন',
      ta: 'ஆம், அனைத்தையும் நீக்கு',
      te: 'అవును, అన్నీ తొలగించు',
      mr: 'होय, सर्व काढा',
      gu: 'હા, બધું કાઢી નાખો',
      kn: 'ಹೌದು, ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ',
      ml: 'അതെ, എല്ലാം ഇല്ലാതാക്കുക',
      pa: 'ਹਾਂ, ਸਭ ਹਟਾਓ',
      ur: 'ہاں، سب کو ہٹائیں',
      or: 'ହଁ, ସବୁ ହଟାନ୍ତୁ',
      sa: 'आम्, सर्वं निष्कासयतु'
    }
  },

  generic_confirm: {
    icon: '❓',
    title: {
      en: 'Confirmation',
      hi: 'पुष्टि करें',
      'hi-latn': 'Confirmation',
      bn: 'নিশ্চিতকরণ',
      ta: 'உறுதிப்படுத்தல்',
      te: 'ధృవీకరణ',
      mr: 'पुष्टीकरण',
      gu: 'ખાતરી કરો',
      kn: 'ದೃಢೀಕರಣ',
      ml: 'സ്ഥിರീകരണം',
      pa: 'ਪੁਸ਼ਟੀਕਰਨ',
      ur: 'تصدیق کریں',
      or: 'ନିଶ୍ଚିତକରଣ',
      sa: 'पुष्टीकरणम्'
    },
    message_main: {
      en: 'Are you sure you want to proceed?',
      hi: 'क्या आप आगे बढ़ना चाहते हैं?',
      'hi-latn': 'Kya aap aage badhna chahte hain?',
      bn: 'আপনি কি এগিয়ে যেতে চান?',
      ta: 'நீங்கள் தொடர விரும்புகிறீர்களா?',
      te: 'మీరు కొనసాగించాలనుకుంటున్నారా?',
      mr: 'तुम्हाला पुढे जायचे आहे का?',
      gu: 'શું તમે આગળ વધવા માંગો છો?',
      kn: 'ನೀವು ಮುಂದುವರಿಯಲು ಬಯಸುವಿರಾ?',
      ml: 'നിങ്ങൾക്ക് മുന്നോട്ട് പോകണമെന്നുണ്ടോ?',
      pa: 'ਕੀ ਤੁਸੀਂ ਅੱਗੇ ਵਧਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
      ur: 'کیا آپ آگے بڑھنا چاہتے ہیں؟',
      or: 'ଆପଣ ଆଗକୁ ବଢ଼ିବାକୁ ଚାହୁଁଛନ୍ତି କି?',
      sa: 'किं भवान् अग्रे गन्तुम् इच्छति?'
    },
    cancelText: {
      en: 'Cancel',
      hi: 'रद्द करें',
      'hi-latn': 'Cancel Karein',
      bn: 'বাতিল করুন',
      ta: 'ரத்து செய்',
      te: 'రద్దు చేయి',
      mr: 'रद्द करा',
      gu: 'રદ કરો',
      kn: 'ರದ್ದುಮಾಡಿ',
      ml: 'റദ്ദാക്കുക',
      pa: 'ਰੱਦ ਕਰੋ',
      ur: 'منسوخ کریں',
      or: 'ବାତିଲ୍ କରନ୍ତୁ',
      sa: 'निरस्यतु'
    },
    confirmText: {
      en: 'Confirm',
      hi: 'हाँ, पुष्टि करें',
      'hi-latn': 'Haan, Confirm Karein',
      bn: 'হ্যাঁ, নিশ্চিত করুন',
      ta: 'ஆம், உறுதிப்படுத்து',
      te: 'అవును, నిర్ధారించు',
      mr: 'होय, पुष्टी करा',
      gu: 'હા, ખાતરી કરો',
      kn: 'ಹೌದು, ದೃಢೀಕರಿಸಿ',
      ml: 'അതെ, സ്ഥിരീകരിക്കുക',
      pa: 'ਹਾਂ, ਪੁਸ਼ਟੀ ਕਰੋ',
      ur: 'ہاں، تصدیق کریں',
      or: 'ହଁ, ନିଶ୍ଚିତ କରନ୍ତୁ',
      sa: 'आम्, पुष्टिकुरु'
    }
  },

  generic_alert: {
    icon: '💡',
    title: {
      en: 'Notice',
      hi: 'सूचना',
      'hi-latn': 'Soochana',
      bn: 'বিজ্ঞপ্তি',
      ta: 'அறிவிப்பு',
      te: 'గమనిక',
      mr: 'सूचना',
      gu: 'સૂચના',
      kn: 'ಸೂಚನೆ',
      ml: 'അറിയിപ്പ്',
      pa: 'ਸੂਚਨਾ',
      ur: 'اطلاع',
      or: 'ସୂଚନା',
      sa: 'सूचना'
    },
    okText: {
      en: 'OK',
      hi: 'ठीक है',
      'hi-latn': 'Theek Hai',
      bn: 'ঠিক আছে',
      ta: 'சரி',
      te: 'సరే',
      mr: 'ठीक आहे',
      gu: 'બરાબર',
      kn: 'ಸರಿ',
      ml: 'ശരി',
      pa: 'ਠੀਕ ਹੈ',
      ur: 'ٹھیک ہے',
      or: 'ଠିକ୍ ଅଛି',
      sa: 'साधु'
    }
  }
};

function getActiveModalLang() {
  try {
    return localStorage.getItem('sarkariai_lang') || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'hi');
  } catch (e) {
    return 'hi';
  }
}

function formatBilingualModalPair(lang, textMapEntry, icon = '') {
  if (!textMapEntry) return '';
  const prefix = icon ? `${icon} ` : '';
  const enVal = textMapEntry.en || '';
  const hiVal = textMapEntry.hi || '';

  if (lang === 'en') {
    // English active: Primary is English, Secondary in brackets is Hindi
    return hiVal ? `${prefix}${enVal} (${hiVal})` : `${prefix}${enVal}`;
  } else {
    // Non-English active: Primary is active language, Secondary in brackets is ALWAYS English
    const primary = textMapEntry[lang] || hiVal || enVal;
    return enVal ? `${prefix}${primary} (${enVal})` : `${prefix}${primary}`;
  }
}

function getOrCreateAppModal() {
  let modal = document.getElementById('appCenteredModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'appCenteredModal';
    modal.className = 'fixed inset-0 z-[10000] bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity hidden';
    modal.innerHTML = `
      <div id="appCenteredModalBox" class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-800 max-w-sm sm:max-w-md w-full p-6 sm:p-7 space-y-4 text-center transform transition-all duration-200 scale-95 opacity-0">
        <div id="appModalIcon" class="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-2xl flex items-center justify-center mx-auto shadow-inner">
          ⚠️
        </div>
        <h3 id="appModalTitle" class="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">Notice</h3>
        <p id="appModalMessage" class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium whitespace-pre-line leading-relaxed"></p>
        <div id="appModalBtnContainer" class="pt-2 flex items-center justify-center gap-2.5"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  return modal;
}

function showAppAlert(message, title = null, icon = '💡') {
  const lang = getActiveModalLang();
  const template = MODAL_I18N.generic_alert;

  let finalTitle = title;
  if (!finalTitle || finalTitle === 'सूचना (Notice)' || finalTitle === 'Notice' || finalTitle === 'सूचना') {
    finalTitle = formatBilingualModalPair(lang, template.title, icon);
  }

  const finalOk = formatBilingualModalPair(lang, template.okText);

  const modal = getOrCreateAppModal();
  const box = document.getElementById('appCenteredModalBox');
  const iconEl = document.getElementById('appModalIcon');
  const titleEl = document.getElementById('appModalTitle');
  const msgEl = document.getElementById('appModalMessage');
  const btnContainer = document.getElementById('appModalBtnContainer');

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = finalTitle;
  if (msgEl) msgEl.textContent = message;

  if (btnContainer) {
    btnContainer.innerHTML = `
      <button type="button" onclick="closeAppModal()" class="w-full bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-black text-xs py-3 px-6 rounded-xl shadow-md transition cursor-pointer active:scale-95">
        ${finalOk}
      </button>
    `;
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    if (box) {
      box.classList.remove('scale-95', 'opacity-0');
      box.classList.add('scale-100', 'opacity-100');
    }
  }, 10);
}

function showAppConfirm(config = {}) {
  const lang = getActiveModalLang();
  let type = config.type || null;

  // Auto-detect modal type if not explicitly set
  const titleRaw = (config.title || '').toLowerCase();
  const msgRaw = (config.message || '').toLowerCase();
  if (!type) {
    if (titleRaw.includes('exit test') || titleRaw.includes('क्विज़ छोड़ें') || msgRaw.includes('exit the test') || msgRaw.includes('टेस्ट छोड़ना')) {
      type = 'exit_quiz';
    } else if (titleRaw.includes('clear vault') || titleRaw.includes('तिजोरी खाली') || msgRaw.includes('bookmark') || msgRaw.includes('बुकमार्क')) {
      type = 'clear_vault';
    } else {
      type = 'generic_confirm';
    }
  }

  const template = MODAL_I18N[type] || MODAL_I18N.generic_confirm;
  const icon = config.icon || template.icon || '❓';

  // Title:
  let finalTitle = config.title;
  if (!finalTitle || finalTitle.includes('पुष्टि करें') || finalTitle.includes('Confirmation') || finalTitle.includes('Exit Test') || finalTitle.includes('Clear Vault') || finalTitle.includes('क्विज़ छोड़ें') || finalTitle.includes('तिजोरी')) {
    finalTitle = formatBilingualModalPair(lang, template.title, icon);
  }

  // Message:
  let finalMessage = config.message;
  if (!finalMessage || finalMessage.includes('क्या आप सच में') || finalMessage.includes('Are you sure you want to exit') || finalMessage.includes('रिवीजन तिजोरी') || finalMessage.includes('remove all saved bookmarks') || finalMessage.includes('क्या आप जारी रखना चाहते हैं')) {
    const mainP = formatBilingualModalPair(lang, template.message_main);
    const subP = template.message_sub ? formatBilingualModalPair(lang, template.message_sub) : '';
    finalMessage = subP ? `${mainP}\n\n${subP}` : mainP;
  }

  // Cancel text:
  let finalCancel = config.cancelText;
  if (!finalCancel || finalCancel.includes('Cancel') || finalCancel.includes('वापस') || finalCancel.includes('रद्द')) {
    finalCancel = formatBilingualModalPair(lang, template.cancelText);
  }

  // Confirm text:
  let finalConfirm = config.confirmText;
  if (!finalConfirm || finalConfirm.includes('Exit') || finalConfirm.includes('हाँ') || finalConfirm.includes('Confirm') || finalConfirm.includes('Delete All')) {
    finalConfirm = formatBilingualModalPair(lang, template.confirmText);
  }

  const confirmClass = config.confirmClass || (type === 'exit_quiz' || type === 'clear_vault' ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white');

  const modal = getOrCreateAppModal();
  const box = document.getElementById('appCenteredModalBox');
  const iconEl = document.getElementById('appModalIcon');
  const titleEl = document.getElementById('appModalTitle');
  const msgEl = document.getElementById('appModalMessage');
  const btnContainer = document.getElementById('appModalBtnContainer');

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = finalTitle;
  if (msgEl) msgEl.textContent = finalMessage;

  if (btnContainer) {
    btnContainer.innerHTML = `
      <button type="button" id="appModalCancelBtn" class="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 transition cursor-pointer active:scale-95">
        ${finalCancel}
      </button>
      <button type="button" id="appModalConfirmBtn" class="flex-1 ${confirmClass} font-black text-xs py-3 px-4 rounded-xl shadow-md transition cursor-pointer active:scale-95">
        ${finalConfirm}
      </button>
    `;

    document.getElementById('appModalCancelBtn').onclick = () => {
      closeAppModal();
      if (typeof config.onCancel === 'function') config.onCancel();
    };

    document.getElementById('appModalConfirmBtn').onclick = () => {
      closeAppModal();
      if (typeof config.onConfirm === 'function') config.onConfirm();
    };
  }

  modal.classList.remove('hidden');
  setTimeout(() => {
    if (box) {
      box.classList.remove('scale-95', 'opacity-0');
      box.classList.add('scale-100', 'opacity-100');
    }
  }, 10);
}

function closeAppModal() {
  const modal = document.getElementById('appCenteredModal');
  const box = document.getElementById('appCenteredModalBox');
  if (box) {
    box.classList.remove('scale-100', 'opacity-100');
    box.classList.add('scale-95', 'opacity-0');
  }
  if (modal) {
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 150);
  }
}

// ==========================================
// LEGAL PAGES & COMPLIANCE MODAL CONTROLLER
// ==========================================
function openLegalModal(tab = 'privacy') {
  const modal = document.getElementById('legalInfoModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  switchLegalTab(tab);
}

function closeLegalModal() {
  const modal = document.getElementById('legalInfoModal');
  if (modal) modal.classList.add('hidden');
}

function switchLegalTab(tabName) {
  const tabs = ['privacy', 'terms', 'contact', 'adsense'];
  tabs.forEach(t => {
    const btn = document.getElementById(`legalTabBtn-${t}`);
    const panel = document.getElementById(`legalTabPanel-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.classList.add('bg-saffron-500', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      } else {
        btn.classList.remove('bg-saffron-500', 'text-white', 'shadow-sm');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      }
    }
    if (panel) {
      if (t === tabName) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
}

function handleContactSubmit(event) {
  if (event) event.preventDefault();
  const alertBox = document.getElementById('contactSuccessAlert');
  if (alertBox) {
    alertBox.classList.remove('hidden');
    setTimeout(() => {
      alertBox.classList.add('hidden');
      closeLegalModal();
    }, 3500);
  } else {
    showAppAlert('धन्यवाद! आपका संदेश हमें प्राप्त हो गया है। हमारी टीम 24 घंटे के भीतर संपर्क करेगी।');
    closeLegalModal();
  }
}

// ==========================================
// WHATSAPP 1-TAP SHARING ENGINE
// ==========================================
function shareOnWhatsApp(customText = '') {
  const shareText = customText || '🇮🇳 SarkariAI Hub: भारत का #1 ऑल-इन-वन सरकारी परीक्षा एवं बोर्ड पोर्टल। फोटो रिसाइज़र (20-50 KB), 7th CPC वेतन गणक, लाइव मॉक टेस्ट, स्टडी टाइमटेबल और OMR जनरेटर। सीधे देखें:\n' + window.location.origin;
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(url, '_blank');
}

function shareQuizScoreOnWhatsApp() {
  const pct = document.getElementById('scorecardPct')?.innerText || '85%';
  const raw = document.getElementById('scorecardRaw')?.innerText || '26 / 30';
  const air = document.getElementById('scorecardAir')?.innerText || '#1,420';
  const accuracy = document.getElementById('scorecardAccuracy')?.innerText || '90%';

  const text = `🎯 मैंने SarkariAI Hub पर लाइव ऑल-इंडिया मॉक टेस्ट दिया!\n\n📊 मेरा स्कोर: ${raw} (${pct})\n🎯 सटीकता (Accuracy): ${accuracy}\n🏆 अनुमानित ऑल-इंडिया रैंक: ${air}\n\nआप भी अपनी तैयारी का स्तर और ऑल-इंडिया रैंक तुरंत चेक करें:\n${window.location.origin}/#tool/quiz`;
  shareOnWhatsApp(text);
}

// ==========================================
// PWA INSTALLATION & SERVICE WORKER
// ==========================================
let deferredPwaPrompt = null;

function initPwaInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    const installBtns = document.querySelectorAll('.pwa-install-trigger');
    installBtns.forEach(btn => btn.classList.remove('hidden'));
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('Service Worker registration skipped:', err.message);
      });
    });
  }
}

function installPwaApp() {
  if (deferredPwaPrompt) {
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.then((choiceResult) => {
      deferredPwaPrompt = null;
    });
  } else {
    showAppAlert('📱 SarkariAI Hub ऐप इंस्टॉल करने के लिए अपने Chrome ब्राउज़र के मेन्यू (तीन डॉट्स) में "Add to Home screen (होम स्क्रीन पर जोड़ें)" पर टैप करें।');
  }
}

// Qualification & Exam Category Filter
function filterHomeExams(qual, btnEl) {
  const pills = document.querySelectorAll('.exam-filter-pill');
  pills.forEach(p => {
    p.classList.remove('bg-saffron-500', 'text-white', 'shadow-sm');
    p.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-300');
  });
  if (btnEl) {
    btnEl.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-300');
    btnEl.classList.add('bg-saffron-500', 'text-white', 'shadow-sm');
  }

  if (qual === 'answerkey') {
    const akSec = document.getElementById('homeAnswerKeySection');
    if (akSec) {
      akSec.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  const cards = document.querySelectorAll('.home-exam-card-item');
  cards.forEach(card => {
    const cardQual = (card.getAttribute('data-qual') || '').toLowerCase();
    if (qual === 'all' || cardQual.includes(qual.toLowerCase())) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

// Exam Day Hall Protocol & OMR Guide Modal
function openExamDayGuideModal() {
  const modal = document.getElementById('examDayGuideModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeExamDayGuideModal() {
  const modal = document.getElementById('examDayGuideModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Smart Selective Pre-Apply Outbound Gateway Controller
let gwCountdownInterval = null;
const GW_TOTAL_SECONDS = 10;
let gwRemainingSeconds = GW_TOTAL_SECONDS;
let gwTargetUrl = '';

function openOutboundGateway(url, officialName) {
  if (!url) return;
  gwTargetUrl = url;
  gwRemainingSeconds = GW_TOTAL_SECONDS;

  const modal = document.getElementById('externalGatewayModal');
  const urlDisplay = document.getElementById('gwDestinationUrl');
  const countdownNumber = document.getElementById('gwCountdownNumber');
  const progressBar = document.getElementById('gwProgressBar');
  const linkTop = document.getElementById('gwProceedLinkTop');
  const linkBottom = document.getElementById('gwProceedLinkBottom');

  if (urlDisplay) urlDisplay.textContent = url;
  if (countdownNumber) countdownNumber.textContent = gwRemainingSeconds + 's';
  
  if (linkTop) {
    linkTop.href = url;
  }
  if (linkBottom) {
    linkBottom.href = url;
    linkBottom.classList.remove('animate-pulse', 'ring-4', 'ring-emerald-400');
    const proceedText = typeof getTranslation === 'function' ? getTranslation('gw_proceed_btn') : '🚀 Skip & Open Official Site Now →';
    linkBottom.innerHTML = `<span data-i18n="gw_proceed_btn">${proceedText}</span>`;
  }

  if (progressBar) {
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.style.transition = 'width 1s linear';
    }, 50);
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.style.zIndex = '9999';
    document.body.classList.add('overflow-hidden');
  }

  if (gwCountdownInterval) {
    clearInterval(gwCountdownInterval);
  }

  gwCountdownInterval = setInterval(() => {
    gwRemainingSeconds--;
    if (countdownNumber) countdownNumber.textContent = Math.max(0, gwRemainingSeconds) + 's';
    if (progressBar) {
      const percentage = Math.max(0, (gwRemainingSeconds / GW_TOTAL_SECONDS) * 100);
      progressBar.style.width = percentage + '%';
    }

    if (gwRemainingSeconds <= 0) {
      clearInterval(gwCountdownInterval);
      gwCountdownInterval = null;
      proceedToOutboundUrl();
    }
  }, 1000);
}

function proceedToOutboundUrl(e) {
  if (gwCountdownInterval) {
    clearInterval(gwCountdownInterval);
    gwCountdownInterval = null;
  }

  const modal = document.getElementById('externalGatewayModal');
  const target = gwTargetUrl || (e && e.currentTarget && e.currentTarget.href) || '';

  // 1. Direct user click on "Skip & Open Official Site Now" button:
  if (e) {
    if (e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
    gwTargetUrl = '';

    if (target && target !== '#' && !target.startsWith('javascript:')) {
      // Open ONLY in a new tab; NEVER overwrite Tab 1 (our portal stays safe)
      window.open(target, '_blank', 'noopener,noreferrer');
    }
    return;
  }

  // 2. Timer ended automatically after 10 seconds:
  if (target && target !== '#' && !target.startsWith('javascript:')) {
    let opened = false;
    try {
      const win = window.open(target, '_blank', 'noopener,noreferrer');
      if (win) {
        opened = true;
      }
    } catch (err) {
      opened = false;
    }

    if (opened) {
      // Successfully opened in new tab; close gateway modal
      if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
      gwTargetUrl = '';
    } else {
      // If browser blocked automatic pop-up from timer, DO NOT hijack Tab 1!
      // Instead, present a prominent 1-click button so user's direct click opens Tab 2 without blocking
      const countdownNumber = document.getElementById('gwCountdownNumber');
      if (countdownNumber) {
        countdownNumber.textContent = 'Ready! 🚀';
        countdownNumber.classList.add('bg-emerald-500', 'text-white');
      }
      const linkBottom = document.getElementById('gwProceedLinkBottom');
      if (linkBottom) {
        linkBottom.classList.add('animate-bounce', 'ring-4', 'ring-emerald-400');
        linkBottom.innerHTML = `<span>🚀 Click to Open Official Site (Opens in New Tab) ↗</span>`;
      }
      const linkTop = document.getElementById('gwProceedLinkTop');
      if (linkTop) {
        linkTop.innerHTML = `<span>🚀 Open Official Site in New Tab ↗</span>`;
      }
    }
  } else {
    if (modal) {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
    gwTargetUrl = '';
  }
}

function cancelOutboundGateway() {
  if (gwCountdownInterval) {
    clearInterval(gwCountdownInterval);
    gwCountdownInterval = null;
  }
  gwTargetUrl = '';
  const modal = document.getElementById('externalGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function openToolFromGateway(toolRoute) {
  if (gwCountdownInterval) {
    clearInterval(gwCountdownInterval);
    gwCountdownInterval = null;
  }
  gwTargetUrl = '';
  const modal = document.getElementById('externalGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
  if (toolRoute) {
    window.location.hash = toolRoute;
  }
}

// Universal Selective Link Interceptor:
// 1. Internal Portal Links (tabs, tools, exams, #...) -> ZERO countdown, instant internal navigation
// 2. Affiliate / Bookstore Links (Amazon, Flipkart, etc.) -> ZERO countdown, direct speed open / app deep-link
// 3. Official Government / Department Outbound Links -> Show Screen Countdown Gateway Modal
document.addEventListener('click', function(e) {
  const anchor = e.target.closest('a');
  if (!anchor) return;

  // CRITICAL: NEVER intercept links inside the Gateway Modal itself (Skip buttons, checklist tools, etc.)
  if (anchor.closest('#externalGatewayModal') || anchor.hasAttribute('data-no-gateway') || anchor.id === 'gwProceedLinkTop' || anchor.id === 'gwProceedLinkBottom') {
    return;
  }

  const href = anchor.getAttribute('href');
  if (!href) return;

  // Ignore in-page hash links, protocols like mailto/tel/javascript, or empty links
  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../') ||
    href.startsWith('javascript:') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return; // Instant internal transition
  }

  try {
    const urlObj = new URL(href, window.location.origin);
    // Check if internal same-origin link
    if (urlObj.origin === window.location.origin) {
      return; // Instant internal transition
    }

    // Check if Affiliate / Book Link (Amazon, Flipkart, etc.)
    const hostname = urlObj.hostname.toLowerCase();
    const isAffiliate = (
      hostname.includes('amazon.') ||
      hostname.includes('amzn.') ||
      hostname.includes('flipkart.') ||
      hostname.includes('myntra.') ||
      hostname.includes('bookchor.') ||
      hostname.includes('affiliate') ||
      anchor.hasAttribute('data-no-gateway') ||
      anchor.getAttribute('rel')?.includes('nofollow')
    );

    if (isAffiliate) {
      // ZERO countdown! Let native app or browser open immediately at full speed
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer nofollow');
      return;
    }

    // For all other external links (Govt official sites, PDFs, Result portals):
    e.preventDefault();
    e.stopPropagation();
    const title = anchor.getAttribute('title') || anchor.textContent.trim().split('\n')[0] || 'Official Portal';
    openOutboundGateway(href, title);
  } catch (err) {
    // Allow default if URL parsing fails
  }
}, true);

// Initialize PWA listener
initPwaInstallPrompt();

// Global Exports
window.showAppAlert = showAppAlert;
window.showAppConfirm = showAppConfirm;
window.closeAppModal = closeAppModal;
window.navigateToHome = navigateToHome;
window.toggleDesktopToolsMenu = toggleDesktopToolsMenu;
window.openDesktopToolsMenu = openDesktopToolsMenu;
window.closeDesktopToolsMenu = closeDesktopToolsMenu;
window.handleToolItemClick = handleToolItemClick;
window.openLegalModal = openLegalModal;
window.closeLegalModal = closeLegalModal;
window.switchLegalTab = switchLegalTab;
window.handleContactSubmit = handleContactSubmit;
window.shareOnWhatsApp = shareOnWhatsApp;
window.shareQuizScoreOnWhatsApp = shareQuizScoreOnWhatsApp;
window.installPwaApp = installPwaApp;
window.filterHomeExams = filterHomeExams;
window.openExamDayGuideModal = openExamDayGuideModal;
window.closeExamDayGuideModal = closeExamDayGuideModal;
window.openOutboundGateway = openOutboundGateway;
window.proceedToOutboundUrl = proceedToOutboundUrl;
window.cancelOutboundGateway = cancelOutboundGateway;
window.closeOutboundGateway = cancelOutboundGateway;
window.openToolFromGateway = openToolFromGateway;
window.alert = function(msg) {
  showAppAlert(msg);
};



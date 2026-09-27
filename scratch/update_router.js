const fs = require('fs');
const path = require('path');

const routerFile = path.join(__dirname, '..', 'public', 'js', 'router.js');
let content = fs.readFileSync(routerFile, 'utf8');

// Replace goBackStep and handleRouting
const newGoBackAndRouting = `function goBackStep() {
  const currentHash = window.location.hash || '';
  if (currentHash && currentHash !== '#home' && currentHash !== '#') {
    const prevRoute = sessionStorage.getItem('sarkari_prev_route');
    if (prevRoute && prevRoute !== currentHash) {
      window.location.hash = prevRoute;
      return;
    }
    window.location.hash = '#home';
    return;
  }
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.hash = '#home';
  }
}

function handleRouting() {
  if (typeof closeMobileMenu === 'function') {
    closeMobileMenu();
  }
  if (typeof closeDesktopToolsMenu === 'function') {
    closeDesktopToolsMenu();
  }
  let hash = window.location.hash;

  // Track previous route for clean step-back
  const currentSaved = sessionStorage.getItem('sarkari_current_route');
  if (currentSaved && currentSaved !== hash) {
    sessionStorage.setItem('sarkari_prev_route', currentSaved);
  }

  // Handle default / home route
  if (!hash || hash === '#' || hash === '#home') {
    hash = '#home';
    try { 
      sessionStorage.setItem('sarkari_last_route', '#home');
      sessionStorage.setItem('sarkari_current_route', '#home');
    } catch(e) {}
  } else {
    try { 
      sessionStorage.setItem('sarkari_last_route', hash);
      sessionStorage.setItem('sarkari_current_route', hash);
    } catch(e) {}
  }

  // Toggle universal back bar visibility
  const backBar = document.getElementById('universalBackBar');
  if (backBar) {
    if (hash === '#home' || hash === '' || hash === '#') {
      backBar.classList.add('hidden');
    } else {
      backBar.classList.remove('hidden');
    }
  }

  // Check if routing to an exam detail page: #exam/<id>
  if (hash.startsWith('#exam/')) {
    if (backBar) backBar.classList.add('hidden');
    const examId = hash.replace('#exam/', '').trim();
    renderDedicatedExamPage(examId);
    return;
  }

  // Check if routing to a dedicated tool page: #tool/<toolId>
  if (hash.startsWith('#tool/')) {
    const rawToolId = hash.replace('#tool/', '').trim();
    showDedicatedTool(rawToolId);
    return;
  }

  // Otherwise default tabs: #home, #resizer, #ai, #age, #directory, #notes
  const rawCleanTab = hash.replace('#', '') || 'home';
  const cleanTab = resolveTabAlias(rawCleanTab);
  showStandardTab(cleanTab);
}`;

// Replace renderDedicatedExamPage
const newRenderDedicatedExamPage = `// Render Deep, Comprehensive Dedicated Detail Page for any selected Exam/Board
function renderDedicatedExamPage(examId) {
  const exam = getExamById(examId);
  if (!exam) {
    showStandardTab('home');
    return;
  }

  const t = (k, fb) => (typeof getTranslation === 'function' ? getTranslation(k) : fb) || fb;

  // Hide standard tabs
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));

  const container = document.getElementById('dedicatedExamContainer');
  if (!container) return;

  container.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Generate Important Dates Table HTML
  let datesRows = '';
  if (exam.importantDates) {
    datesRows = Object.entries(exam.importantDates).map(([label, val]) => \`
      <tr class="border-b border-slate-200">
        <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/2">\${label}</td>
        <td class="py-3 px-4 text-xs font-bold text-rose-700 w-1/2">\${val}</td>
      </tr>
    \`).join('');
  }

  // Generate Fee Table HTML
  let feeRows = '';
  if (exam.fees) {
    feeRows = Object.entries(exam.fees).map(([label, val]) => \`
      <tr class="border-b border-slate-200">
        <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/2">\${label}</td>
        <td class="py-3 px-4 text-xs font-bold text-emerald-700 w-1/2">\${val}</td>
      </tr>
    \`).join('');
  }

  // Generate Vacancies / Details Table HTML
  let vacancyRows = '';
  if (exam.vacancies) {
    vacancyRows = Object.entries(exam.vacancies).map(([label, val]) => \`
      <tr class="border-b border-slate-200">
        <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/3">\${label}</td>
        <td class="py-3 px-4 text-xs font-semibold text-slate-800">\${val}</td>
      </tr>
    \`).join('');
  }

  // Generate Physical Standards Table HTML (if applicable)
  let physicalSection = '';
  if (exam.physicalStandards) {
    const physRows = Object.entries(exam.physicalStandards).map(([label, val]) => \`
      <tr class="border-b border-slate-200">
        <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/3">\${label}</td>
        <td class="py-3 px-4 text-xs font-semibold text-slate-800">\${val}</td>
      </tr>
    \`).join('');
    physicalSection = \`
      <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="bg-purple-900 text-white px-6 py-3.5 font-black text-sm flex items-center">
          <span class="mr-2">🏃</span> <span data-i18n="exam_sec_physical">\${t('exam_sec_physical', '🏃 Physical Standards & Efficiency Test (PST / PET)')}</span>
        </div>
        <table class="w-full text-left border-collapse">
          <tbody>\${physRows}</tbody>
        </table>
      </div>
    \`;
  }

  // Generate Exam Pattern Table HTML
  let patternSection = '';
  if (exam.examPattern) {
    const patRows = Object.entries(exam.examPattern).map(([label, val]) => \`
      <tr class="border-b border-slate-200">
        <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/3">\${label}</td>
        <td class="py-3 px-4 text-xs font-semibold text-slate-800">\${val}</td>
      </tr>
    \`).join('');
    patternSection = \`
      <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="bg-indigo-900 text-white px-6 py-3.5 font-black text-sm flex items-center">
          <span class="mr-2">📝</span> <span data-i18n="exam_sec_pattern">\${t('exam_sec_pattern', '📝 Exam Scheme & Pattern')}</span>
        </div>
        <table class="w-full text-left border-collapse">
          <tbody>\${patRows}</tbody>
        </table>
      </div>
    \`;
  }

  const safeExamName = (exam.name || '').replace(/'/g, "\\\\'");
  const safeShortName = (exam.shortName || exam.name || '').replace(/'/g, "\\\\'");

  // Render Full Dedicated Page View with Full i18n & Tappable Touch Targets
  container.innerHTML = \`
    <div class="space-y-8 animate-fadeIn">
      
      <!-- Top Breadcrumb & Step-Back Bar (Single Clean Navigation) -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center space-x-2 text-xs font-bold text-slate-500">
          <button type="button" onclick="goBackStep()" class="inline-flex items-center space-x-1.5 text-slate-900 bg-slate-100 hover:bg-slate-200 font-black px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-sm transition group cursor-pointer mr-2 active:scale-95">
            <span class="text-sm group-hover:-translate-x-1 transition-transform">←</span>
            <span data-i18n="exam_back_btn">\${t('exam_back_btn', 'Back (पिछला पेज)')}</span>
          </button>
          <a href="#home" class="hover:text-blue-900" data-i18n="nav_home">\${t('nav_home', 'Home')}</a>
          <span>/</span>
          <a href="#directory" onclick="switchDirectoryCategory('\${exam.category}')" class="hover:text-blue-900 capitalize">\${formatCategoryLabel(exam.category)}</a>
          <span>/</span>
          <span class="text-blue-900 font-black truncate max-w-xs">\${exam.shortName}</span>
        </div>
      </div>

      <!-- Main Header Banner -->
      <div class="bg-gradient-to-r from-navy-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
        <div class="relative z-10 space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-900">
              \${exam.status || 'Active Notification'}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/10">
              \${exam.state}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
              \${exam.conductingBody}
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            \${exam.name}
          </h1>

          <p class="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl leading-relaxed">
            \${exam.eligibility}. \${t('exam_direct_links_sub', 'Official notifications, vacancy distribution, direct apply links, result servers, and photo resizer instructions.')}
          </p>

          <!-- Action Buttons Bar (100% Fully Tappable & Linked to In-Portal Tools) -->
          <div class="pt-4 flex flex-wrap gap-2.5">
            <button type="button" onclick="applyPresetAndJump('\${exam.id}')" class="bg-gradient-to-r from-saffron-500 to-orange-600 hover:from-saffron-600 hover:to-orange-700 active:scale-95 text-white font-black text-xs px-5 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2 cursor-pointer">
              <span data-i18n="exam_btn_resize">\${t('exam_btn_resize', '📸 Resize Photo')}</span>
            </button>
            <button type="button" onclick="prefillAgeCheck('\${exam.id}')" class="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs px-4 py-3.5 rounded-2xl border border-white/20 transition flex items-center space-x-2 cursor-pointer">
              <span data-i18n="exam_btn_age">\${t('exam_btn_age', '🎂 Age Eligibility')}</span>
            </button>
            <button type="button" onclick="shareExamWhatsApp('\${exam.id}')" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs px-4 py-3.5 rounded-2xl shadow-md transition flex items-center space-x-1.5 cursor-pointer">
              <span data-i18n="exam_btn_wa">\${t('exam_btn_wa', '📲 Share on WhatsApp')}</span>
            </button>
            <button type="button" onclick="shareExamTelegram('\${exam.id}')" class="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs px-4 py-3.5 rounded-2xl shadow-md transition flex items-center space-x-1.5 cursor-pointer">
              <span data-i18n="exam_btn_tg">\${t('exam_btn_tg', '🔵 Telegram')}</span>
            </button>
            <button type="button" onclick="copyShareExamLink('\${exam.id}')" class="bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold text-xs px-3.5 py-3.5 rounded-2xl border border-slate-700 transition flex items-center space-x-1.5 cursor-pointer">
              <span data-i18n="exam_btn_copy">\${t('exam_btn_copy', '🔗 Copy Link')}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- DIRECT OFFICIAL ACTION LINKS CARD (THE REAL DEAL - TRIGGERS SCREEN COUNTDOWN MODAL) -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div class="flex items-center justify-between border-b border-amber-200 pb-3">
          <div>
            <h3 class="text-lg font-black text-slate-900 flex items-center">
              <span class="text-2xl mr-2">🔗</span> <span data-i18n="exam_direct_links_title">\${t('exam_direct_links_title', 'Direct Official Action Links (आधिकारिक लिंक)')}</span>
            </h3>
            <p class="text-xs text-slate-600 mt-0.5" data-i18n="exam_direct_links_sub">\${t('exam_direct_links_sub', 'Direct portals for forms, PDFs, and results. Zero fake redirections.')}</p>
          </div>
          <span class="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ✅ 100% Verified
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          \${exam.applyUrl ? \`
            <a href="\${exam.applyUrl}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); openOutboundGateway('\${exam.applyUrl}', '\${safeShortName} - Apply Online');" class="bg-emerald-600 hover:bg-emerald-700 active:scale-95 hover:scale-[1.02] text-white font-black text-xs p-4 rounded-2xl text-center shadow-md transition flex flex-col items-center justify-center cursor-pointer select-none">
              <span class="text-lg mb-1">🟢</span>
              <span data-i18n="exam_btn_apply">\${t('exam_btn_apply', 'Apply Online (Click Here)')}</span>
              <span class="text-[10px] text-emerald-200 font-normal mt-0.5" data-i18n="exam_btn_apply_sub">\${t('exam_btn_apply_sub', 'Official Portal Form')}</span>
            </a>
          \` : ''}

          \${exam.pdfUrl ? \`
            <a href="\${exam.pdfUrl}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); openOutboundGateway('\${exam.pdfUrl}', '\${safeShortName} - Notification PDF');" class="bg-blue-900 hover:bg-blue-800 active:scale-95 hover:scale-[1.02] text-white font-black text-xs p-4 rounded-2xl text-center shadow-md transition flex flex-col items-center justify-center cursor-pointer select-none">
              <span class="text-lg mb-1">📄</span>
              <span data-i18n="exam_btn_pdf">\${t('exam_btn_pdf', 'Download Notification PDF')}</span>
              <span class="text-[10px] text-blue-200 font-normal mt-0.5" data-i18n="exam_btn_pdf_sub">\${t('exam_btn_pdf_sub', 'Full Official Circular')}</span>
            </a>
          \` : ''}

          \${exam.resultUrl ? \`
            <a href="\${exam.resultUrl}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); openOutboundGateway('\${exam.resultUrl}', '\${safeShortName} - Result Server 1');" class="bg-amber-600 hover:bg-amber-700 active:scale-95 hover:scale-[1.02] text-white font-black text-xs p-4 rounded-2xl text-center shadow-md transition flex flex-col items-center justify-center cursor-pointer select-none">
              <span class="text-lg mb-1">📊</span>
              <span data-i18n="exam_btn_result1">\${t('exam_btn_result1', 'Check Result (Server 1)')}</span>
              <span class="text-[10px] text-amber-100 font-normal mt-0.5" data-i18n="exam_btn_result1_sub">\${t('exam_btn_result1_sub', 'Primary Server')}</span>
            </a>
          \` : ''}

          \${exam.resultServer2 ? \`
            <a href="\${exam.resultServer2}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); openOutboundGateway('\${exam.resultServer2}', '\${safeShortName} - Result Server 2');" class="bg-purple-700 hover:bg-purple-800 active:scale-95 hover:scale-[1.02] text-white font-black text-xs p-4 rounded-2xl text-center shadow-md transition flex flex-col items-center justify-center cursor-pointer select-none">
              <span class="text-lg mb-1">⚡</span>
              <span data-i18n="exam_btn_result2">\${t('exam_btn_result2', 'Check Result (Server 2)')}</span>
              <span class="text-[10px] text-purple-200 font-normal mt-0.5" data-i18n="exam_btn_result2_sub">\${t('exam_btn_result2_sub', 'Mirror Server (Fast)')}</span>
            </a>
          \` : ''}

          \${exam.officialUrl ? \`
            <a href="\${exam.officialUrl}" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); openOutboundGateway('\${exam.officialUrl}', '\${safeShortName} - Official Department');" class="bg-slate-800 hover:bg-slate-700 active:scale-95 hover:scale-[1.02] text-white font-black text-xs p-4 rounded-2xl text-center shadow-md transition flex flex-col items-center justify-center cursor-pointer select-none">
              <span class="text-lg mb-1">🏛️</span>
              <span data-i18n="exam_btn_official">\${t('exam_btn_official', 'Official Department Website')}</span>
              <span class="text-[10px] text-slate-300 font-normal mt-0.5">\${exam.officialUrl.replace('https://', '').replace('http://', '')}</span>
            </a>
          \` : ''}
        </div>
      </div>

      <!-- Tables Grid: Important Dates & Application Fees -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Table 1: Important Dates -->
        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="bg-slate-900 text-white px-6 py-4 font-black text-sm flex items-center justify-between">
            <span class="flex items-center"><span class="mr-2">📅</span> <span data-i18n="exam_sec_dates">\${t('exam_sec_dates', '📅 Important Dates')}</span></span>
            <span class="text-xs text-amber-400" data-i18n="exam_dates_badge">\${t('exam_dates_badge', 'Official Schedule')}</span>
          </div>
          <table class="w-full text-left border-collapse">
            <tbody>\${datesRows}</tbody>
          </table>
        </div>

        <!-- Table 2: Application Fees -->
        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="bg-slate-900 text-white px-6 py-4 font-black text-sm flex items-center justify-between">
            <span class="flex items-center"><span class="mr-2">💳</span> <span data-i18n="exam_sec_fees">\${t('exam_sec_fees', '💳 Application Fee Structure')}</span></span>
            <span class="text-xs text-emerald-400" data-i18n="exam_fees_badge">\${t('exam_fees_badge', 'Online Mode')}</span>
          </div>
          <table class="w-full text-left border-collapse">
            <tbody>\${feeRows}</tbody>
          </table>
          <div class="p-3 bg-slate-50 text-[11px] text-slate-500 font-semibold border-t border-slate-200" data-i18n="exam_fee_note">
            \${t('exam_fee_note', 'Pay fee via Net Banking, Debit Card, Credit Card, or UPI.')}
          </div>
        </div>

      </div>

      <!-- Vacancies & Eligibility Table -->
      <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div class="bg-blue-900 text-white px-6 py-4 font-black text-sm flex items-center justify-between">
          <span class="flex items-center"><span class="mr-2">👥</span> <span data-i18n="exam_sec_vacancies">\${t('exam_sec_vacancies', '👥 Vacancy Details & Eligibility Criteria')}</span></span>
          <span class="text-xs text-blue-200">\${exam.shortName}</span>
        </div>
        <table class="w-full text-left border-collapse">
          <tbody>
            <tr class="border-b border-slate-200">
              <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/3" data-i18n="exam_edu_eligibility">\${t('exam_edu_eligibility', 'Educational Eligibility')}</td>
              <td class="py-3 px-4 text-xs font-bold text-slate-900">\${exam.eligibility}</td>
            </tr>
            <tr class="border-b border-slate-200">
              <td class="py-3 px-4 text-xs font-black text-slate-800 bg-slate-50 w-1/3" data-i18n="exam_age_criteria">\${t('exam_age_criteria', 'Age Limit Criteria')}</td>
              <td class="py-3 px-4 text-xs font-bold text-blue-800">\${exam.ageLimit}</td>
            </tr>
            \${vacancyRows}
          </tbody>
        </table>
      </div>

      <!-- Physical Standards & Exam Pattern (if available) -->
      \${physicalSection}
      \${patternSection}

      <!-- Specific Exam Photo Rules Box -->
      <div class="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-black text-slate-900 flex items-center">
            <span class="mr-2">📸</span> <span data-i18n="exam_sec_photo_rules">\${t('exam_sec_photo_rules', '📸 Photo & Signature Upload Rules')}</span> \${exam.shortName}
          </h3>
          <span class="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-full" data-i18n="exam_avoid_rejection">
            \${t('exam_avoid_rejection', 'Avoid Rejection')}
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
            <div class="font-black text-slate-900 flex items-center">
              <span data-i18n="exam_photo_req">\${t('exam_photo_req', 'Photograph Requirements:')}</span>
            </div>
            <ul class="space-y-1.5 text-slate-600 list-disc list-inside">
              <li>File Size: <strong>\${exam.photoSpecs.minKb} KB to \${exam.photoSpecs.maxKb} KB</strong></li>
              <li>Dimensions: <strong>\${exam.photoSpecs.width} x \${exam.photoSpecs.height} px</strong></li>
              <li>\${exam.photoSpecs.notes || 'Clear background, no cap or glasses'}</li>
              \${exam.photoSpecs.requireNameDate ? '<li class="text-rose-600 font-bold">Candidate Name & Date of Photo (DOOP) must be stamped!</li>' : ''}
            </ul>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-amber-200 space-y-2">
            <div class="font-black text-slate-900 flex items-center">
              <span data-i18n="exam_sign_req">\${t('exam_sign_req', 'Signature Requirements:')}</span>
            </div>
            <ul class="space-y-1.5 text-slate-600 list-disc list-inside">
              <li>File Size: <strong>\${exam.signSpecs.minKb} KB to \${exam.signSpecs.maxKb} KB</strong></li>
              <li>Dimensions: <strong>\${exam.signSpecs.width} x \${exam.signSpecs.height} px</strong></li>
              <li>\${exam.signSpecs.notes || 'Running hand signature on white paper'}</li>
            </ul>
          </div>
        </div>
        <div class="pt-2">
          <button type="button" onclick="applyPresetAndJump('\${exam.id}')" class="btn-saffron font-black text-xs px-6 py-3 rounded-xl shadow-md transition cursor-pointer active:scale-95 hover:scale-[1.02]">
            <span data-i18n="exam_open_resizer_btn">\${t('exam_open_resizer_btn', '🚀 Open Photo Resizer Pre-Configured')}</span> (\${exam.shortName})
          </button>
        </div>
      </div>

      <!-- RECOMMENDED PREPARATION BOOKS (ZERO COUNTDOWN AFFILIATE SPEED LINKS - OPENS DIRECTLY / APP DEEP-LINK) -->
      <div class="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-amber-300 dark:border-amber-700/80 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 dark:border-amber-800 pb-3">
          <div>
            <h3 class="text-lg font-black text-slate-900 dark:text-white flex items-center">
              <span class="text-2xl mr-2">📚</span> <span data-i18n="affiliate_books_title">\${t('affiliate_books_title', 'Recommended Preparation Books')}</span>
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5" data-i18n="affiliate_books_sub">\${t('affiliate_books_sub', 'Top-rated official syllabus guides, 10-year solved papers & mock practice workbooks.')}</p>
          </div>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 shadow-sm">
            ⭐ Verified Syllabus 2026
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <!-- Book 1: Complete Guide / Theory -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div class="text-2xl mb-1">📖</div>
              <h4 class="font-black text-xs text-slate-900 dark:text-white">\${exam.shortName} <span data-i18n="affiliate_guide_title">\${t('affiliate_guide_title', 'Master Study Guide 2026')}</span></h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1" data-i18n="affiliate_guide_desc">\${t('affiliate_guide_desc', 'Complete theory coverage with chapter-wise formula notes & shortcut tricks.')}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span class="text-xs font-black text-emerald-600 dark:text-emerald-400" data-i18n="affiliate_best_price">\${t('affiliate_best_price', 'Best Price')}</span>
              <a href="https://www.amazon.in/s?k=\${encodeURIComponent(exam.shortName + ' preparation book 2026')}&tag=sarkariai0d-21" target="_blank" rel="noopener noreferrer nofollow" data-no-gateway="true" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer">
                <span data-i18n="affiliate_buy_amazon">\${t('affiliate_buy_amazon', 'Buy Amazon ↗')}</span>
              </a>
            </div>
          </div>

          <!-- Book 2: 10-Year Solved PYQ -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div class="text-2xl mb-1">🎯</div>
              <h4 class="font-black text-xs text-slate-900 dark:text-white">\${exam.shortName} <span data-i18n="affiliate_pyq_title">\${t('affiliate_pyq_title', '10-Year Solved Papers')}</span></h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1" data-i18n="affiliate_pyq_desc">\${t('affiliate_pyq_desc', 'Authentic shift-wise question papers with 100% verified answer keys.')}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span class="text-xs font-black text-emerald-600 dark:text-emerald-400" data-i18n="affiliate_best_price">\${t('affiliate_best_price', 'Best Price')}</span>
              <a href="https://www.amazon.in/s?k=\${encodeURIComponent(exam.shortName + ' solved papers pyq')}&tag=sarkariai0d-21" target="_blank" rel="noopener noreferrer nofollow" data-no-gateway="true" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer">
                <span data-i18n="affiliate_buy_amazon">\${t('affiliate_buy_amazon', 'Buy Amazon ↗')}</span>
              </a>
            </div>
          </div>

          <!-- Book 3: Practice Sets / Mock Tests -->
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div class="text-2xl mb-1">📝</div>
              <h4 class="font-black text-xs text-slate-900 dark:text-white">\${exam.shortName} <span data-i18n="affiliate_mock_title">\${t('affiliate_mock_title', '20 Full Practice Sets')}</span></h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-1" data-i18n="affiliate_mock_desc">\${t('affiliate_mock_desc', 'OMR-based mock tests with OMR bubble answer sheet for real exam simulation.')}</p>
            </div>
            <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span class="text-xs font-black text-emerald-600 dark:text-emerald-400" data-i18n="affiliate_best_price">\${t('affiliate_best_price', 'Best Price')}</span>
              <a href="https://www.flipkart.com/search?q=\${encodeURIComponent(exam.shortName + ' practice workbook')}" target="_blank" rel="noopener noreferrer nofollow" data-no-gateway="true" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer">
                <span data-i18n="affiliate_buy_flipkart">\${t('affiliate_buy_flipkart', 'Flipkart ↗')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER ACTIONS: BOOKMARK & REPORT BROKEN LINK BUTTONS -->
      <div class="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-2">
          <button type="button" onclick="toggleBookmarkExam('\${exam.id}', event)" id="bookmarkBtn-\${exam.id}" class="bookmark-btn-star px-4 py-2 rounded-xl border border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer active:scale-95">
            <span>⭐</span>
            <span id="bookmarkText-\${exam.id}">\${(typeof isExamBookmarked === 'function' && isExamBookmarked(exam.id)) ? t('bookmark_saved', 'Saved') : t('bookmark_save', 'Save Exam')}</span>
          </button>
          <button type="button" onclick="openRatingModal()" class="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 transition cursor-pointer active:scale-95 flex items-center space-x-1">
            <span>⭐</span>
            <span data-i18n="rate_portal_btn">\${t('rate_portal_btn', 'Rate Portal')}</span>
          </button>
        </div>
        <button type="button" onclick="openBrokenLinkModal('\${safeExamName}', '\${exam.officialUrl || exam.applyUrl || ''}')" class="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition text-xs font-bold flex items-center space-x-1.5 cursor-pointer active:scale-95">
          <span>⚠️</span>
          <span data-i18n="report_broken_btn">\${t('report_broken_btn', 'Report Issue / Broken Link')}</span>
        </button>
      </div>

    </div>
  \`;

  // Apply localized translations to all data-i18n elements inside the freshly rendered page
  if (typeof getTranslation === 'function') {
    container.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getTranslation(key);
      if (val && val !== key) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });
  }
}`;

// Listen to language changes to immediately re-render active exam page
const newLanguageListener = `// Listen to Language Change Events to dynamically translate exam detail page
window.addEventListener('languageChanged', (e) => {
  const hash = window.location.hash || '';
  if (hash.startsWith('#exam/')) {
    const examId = hash.replace('#exam/', '').trim();
    if (examId) {
      renderDedicatedExamPage(examId);
    }
  }
});

// Window Global Exports
window.goBackStep = goBackStep;
window.handleRouting = handleRouting;
window.showStandardTab = showStandardTab;
window.showDedicatedTool = showDedicatedTool;
window.renderDedicatedExamPage = renderDedicatedExamPage;
window.prefillAgeCheck = prefillAgeCheck;
window.navigateToExam = navigateToExam;
`;

// Extract before goBackStep
const beforeGoBack = content.substring(0, content.indexOf('function goBackStep()'));

// Extract between handleRouting and renderDedicatedExamPage
const afterHandleRouting = content.substring(
  content.indexOf('function showStandardTab(rawTabId)'),
  content.indexOf('// Render Deep, Comprehensive Dedicated Detail Page')
);

// Extract after renderDedicatedExamPage
const afterRenderDedicatedExamPage = content.substring(
  content.indexOf('// Prefill Age calculator for specific exam and jump to it')
);

const finalContent = beforeGoBack + newGoBackAndRouting + '\n\n' + afterHandleRouting + newRenderDedicatedExamPage + '\n\n' + afterRenderDedicatedExamPage + '\n\n' + newLanguageListener;

fs.writeFileSync(routerFile, finalContent, 'utf8');
console.log('Successfully updated router.js with localized, tappable exam page and languageChanged listener!');

const fs = require('fs');

let content = fs.readFileSync('public/js/router.js', 'utf8');

// 1. Replace goBackStep and handleRouting
const startIdx = content.indexOf('function goBackStep() {');
const endMarker = 'function showStandardTab(rawTabId) {';
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find goBackStep/handleRouting anchors!');
  process.exit(1);
}

const newRoutingEngine = `function normalizeRoute(hash) {
  if (!hash || hash === '#' || hash === '#home') return '#home';
  return hash.trim();
}

function getRouteStack() {
  try {
    const raw = sessionStorage.getItem('sarkari_route_stack');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return ['#home'];
}

function setRouteStack(stack) {
  try {
    sessionStorage.setItem('sarkari_route_stack', JSON.stringify(stack));
  } catch(e) {}
}

let isInternalBackNavigation = false;

function goBackStep() {
  let stack = getRouteStack();
  const current = normalizeRoute(window.location.hash);

  // If already at #home, nothing to back out of
  if (current === '#home') {
    return;
  }

  // Pop all entries matching current route off top
  while (stack.length > 0 && normalizeRoute(stack[stack.length - 1]) === current) {
    stack.pop();
  }

  let targetRoute = '#home';
  if (stack.length > 0) {
    targetRoute = stack.pop(); // Pop target so it becomes top of stack
  } else {
    // Context-aware fallback if stack has no prior entry
    if (current.startsWith('#exam/')) {
      targetRoute = '#directory';
    } else {
      targetRoute = '#home';
    }
  }

  targetRoute = normalizeRoute(targetRoute);
  if (targetRoute === current) {
    targetRoute = '#home';
  }

  stack.push(targetRoute);
  setRouteStack(stack);

  isInternalBackNavigation = true;
  window.location.hash = targetRoute;
}

function handleRouting() {
  if (typeof closeMobileMenu === 'function') {
    closeMobileMenu();
  }
  if (typeof closeDesktopToolsMenu === 'function') {
    closeDesktopToolsMenu();
  }
  
  const rawHash = window.location.hash;
  const currentRoute = normalizeRoute(rawHash);

  // Manage Route History Stack without infinite loops
  let stack = getRouteStack();
  if (isInternalBackNavigation) {
    // Navigating back via in-app button: stack already updated
    isInternalBackNavigation = false;
  } else {
    // Check if the user navigated backward using browser native back button
    const existingIdx = stack.lastIndexOf(currentRoute);
    if (existingIdx !== -1 && existingIdx < stack.length - 1) {
      // Browser back: unwind stack up to this point
      stack = stack.slice(0, existingIdx + 1);
    } else {
      // Forward navigation: append to stack if not already top
      if (stack[stack.length - 1] !== currentRoute) {
        stack.push(currentRoute);
      }
    }
    // Cap stack to reasonable length
    if (stack.length > 40) {
      stack = stack.slice(stack.length - 40);
    }
    setRouteStack(stack);
  }

  try { 
    sessionStorage.setItem('sarkari_last_route', currentRoute);
    sessionStorage.setItem('sarkari_current_route', currentRoute);
  } catch(e) {}

  // Toggle universal back bar visibility
  const backBar = document.getElementById('universalBackBar');
  if (backBar) {
    if (currentRoute === '#home') {
      backBar.classList.add('hidden');
    } else {
      backBar.classList.remove('hidden');
    }
  }

  // Check if routing to an exam detail page: #exam/<id>
  if (currentRoute.startsWith('#exam/')) {
    if (backBar) backBar.classList.add('hidden');
    const examId = currentRoute.replace('#exam/', '').trim();
    renderDedicatedExamPage(examId);
    return;
  }

  // Check if routing to a dedicated tool page: #tool/<toolId>
  if (currentRoute.startsWith('#tool/')) {
    const rawToolId = currentRoute.replace('#tool/', '').trim();
    showDedicatedTool(rawToolId);
    return;
  }

  // Otherwise default tabs: #home, #resizer, #ai, #age, #directory, #notes
  const rawCleanTab = currentRoute.replace('#', '') || 'home';
  const cleanTab = resolveTabAlias(rawCleanTab);
  showStandardTab(cleanTab);
}
`;

content = content.substring(0, startIdx) + newRoutingEngine + '\n' + content.substring(endIdx);

// 2. Also enhance the top breadcrumb bar in renderDedicatedExamPage
const breadcrumbOld = `<div class="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm">
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
      </div>`;

const breadcrumbNew = `<div class="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <button type="button" onclick="goBackStep()" class="inline-flex items-center space-x-1.5 text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-black px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm transition group cursor-pointer mr-2 active:scale-95">
            <span class="text-sm group-hover:-translate-x-1 transition-transform">←</span>
            <span data-i18n="exam_back_btn">\${t('exam_back_btn', 'Back')}</span>
          </button>
          <a href="#home" class="hover:text-amber-500 dark:hover:text-amber-400" data-i18n="nav_home">\${t('nav_home', 'Home')}</a>
          <span>/</span>
          <a href="#directory" onclick="switchDirectoryCategory('\${exam.category}')" class="hover:text-amber-500 dark:hover:text-amber-400 capitalize">\${formatCategoryLabel(exam.category)}</a>
          <span>/</span>
          <span class="text-amber-600 dark:text-amber-400 font-black truncate max-w-xs">\${exam.shortName}</span>
        </div>
      </div>`;

if (content.includes(breadcrumbOld)) {
  content = content.replace(breadcrumbOld, breadcrumbNew);
  console.log('Updated breadcrumb bar styling!');
}

// 3. Remove forced redirect on empty hash in DOMContentLoaded
const domLoadOld = `document.addEventListener('DOMContentLoaded', () => {
  // Only restore route on initial load if hash is completely empty in URL
  if (!window.location.hash || window.location.hash === '') {
    try {
      const saved = sessionStorage.getItem('sarkari_last_route');
      if (saved && saved !== '#home' && saved !== '#') {
        window.location.hash = saved;
        return;
      }
    } catch (e) {}
  }
  handleRouting();
  initLiveSearchDropdown();
});`;

const domLoadNew = `document.addEventListener('DOMContentLoaded', () => {
  handleRouting();
  initLiveSearchDropdown();
});`;

if (content.includes(domLoadOld)) {
  content = content.replace(domLoadOld, domLoadNew);
  console.log('Cleaned DOMContentLoaded routing!');
}

fs.writeFileSync('public/js/router.js', content);
console.log('Successfully updated router.js with loop-proof Stack Router!');

// dark-mode.js - Night Study / Dark Mode Engine for Sarkari AI Portal
(function () {
  'use strict';

  var THEME_KEY = 'portal_theme_preference';

  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body && document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body && document.body.classList.remove('dark');
    }
    updateToggleButtons(isDark);
  }

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    // If not set, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateToggleButtons(isDark) {
    var btns = document.querySelectorAll('.dark-mode-toggle-btn');
    btns.forEach(function (btn) {
      if (isDark) {
        btn.setAttribute('title', 'Switch to Day Mode (Light)');
        btn.innerHTML = '<span class="text-amber-300 text-lg">☀️</span><span class="hidden md:inline text-xs font-semibold text-amber-200">Day Mode</span>';
      } else {
        btn.setAttribute('title', 'Switch to Night Study Mode (Dark)');
        btn.innerHTML = '<span class="text-indigo-200 text-lg">🌙</span><span class="hidden md:inline text-xs font-semibold text-slate-200">Night Mode</span>';
      }
    });
  }

  window.toggleDarkMode = function () {
    var isCurrentlyDark = document.documentElement.classList.contains('dark');
    var newTheme = isCurrentlyDark ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {}
    applyTheme(newTheme === 'dark');
  };

  window.setDarkMode = function (enable) {
    var newTheme = enable ? 'dark' : 'light';
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {}
    applyTheme(enable);
  };

  // Immediate init before DOM ready to avoid flash
  var initialDark = getSavedTheme() === 'dark';
  if (initialDark) {
    document.documentElement.classList.add('dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getSavedTheme() === 'dark');
    
    // Wire up buttons with id darkModeToggleBtn or class dark-mode-toggle-btn
    var mainBtn = document.getElementById('darkModeToggleBtn');
    if (mainBtn && !mainBtn.classList.contains('dark-mode-toggle-btn')) {
      mainBtn.classList.add('dark-mode-toggle-btn');
    }
    
    document.querySelectorAll('.dark-mode-toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        window.toggleDarkMode();
      });
    });
  });
})();

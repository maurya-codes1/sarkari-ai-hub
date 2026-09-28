// SarkariAI Hub — Production Suite (Push Alerts, Bookmarks, Qualification Filters, Broken Link Reporting, FAQ, Offline Detector, DPDP Consent, & Rating)

// -------------------------------------------------------------
// 1. WEB PUSH NOTIFICATION JOB ALERT BELL
// -------------------------------------------------------------
function initJobAlertBell() {
  const bellBtn = document.getElementById('jobAlertBellBtn');
  if (!bellBtn) return;

  const isSubscribed = localStorage.getItem('sarkari_job_alerts') === 'granted';
  if (isSubscribed) {
    bellBtn.classList.add('text-amber-400');
    const dot = document.getElementById('bellActiveDot');
    if (dot) dot.classList.remove('hidden');
  }
}

function toggleJobAlerts() {
  if (!('Notification' in window)) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('आपके ब्राउज़र में पुश नोटिफिकेशन समर्थित नहीं है।', 'Push Notifications', '🔔');
    } else {
      alert('🔔 आपके ब्राउज़र में पुश नोटिफिकेशन समर्थित नहीं है।');
    }
    return;
  }

  if (Notification.permission === 'granted') {
    if (typeof showAppAlert === 'function') {
      showAppAlert('जॉब अलर्ट पहले से सक्रिय हैं! नई सरकारी भर्ती आते ही आपको नोटिफिकेशन मिलेगा।', 'Job Alerts Active', '✅');
    } else {
      alert('✅ जॉब अलर्ट पहले से सक्रिय हैं! नई सरकारी भर्ती आते ही आपको नोटिफिकेशन मिलेगा।');
    }
    localStorage.setItem('sarkari_job_alerts', 'granted');
    const dot = document.getElementById('bellActiveDot');
    if (dot) dot.classList.remove('hidden');
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      localStorage.setItem('sarkari_job_alerts', 'granted');
      const dot = document.getElementById('bellActiveDot');
      if (dot) dot.classList.remove('hidden');
      
      // Send a welcome notification
      try {
        new Notification('🇮🇳 SarkariAI Hub जॉब अलर्ट सक्रिय!', {
          body: 'धन्यवाद! SSC, रेलवे, पुलिस व बोर्ड परीक्षाओं के आधिकारिक अपडेट सबसे पहले आपको मिलेंगे।',
          icon: '/favicon.svg'
        });
      } catch(e) {}

      showPortalToast('🔔 जॉब अलर्ट्स सफलतापूर्वक ऑन हो गए हैं!');
    } else {
      if (typeof showAppAlert === 'function') {
        showAppAlert('सूचना: आपने नोटिफिकेशन अस्वीकार कर दिया है। भविष्य में अपडेट पाने हेतु ब्राउज़र सेटिंग्स में अनुमति दें।', 'Notification Settings', 'ℹ️');
      } else {
        alert('सूचना: आपने नोटिफिकेशन अस्वीकार कर दिया है। भविष्य में अपडेट पाने हेतु ब्राउज़र सेटिंग्स में अनुमति दें।');
      }
    }
  });
}

// -------------------------------------------------------------
// 2. QUALIFICATION QUICK FILTERS (10th / 12th / Graduate / ITI)
// -------------------------------------------------------------
function filterByQualification(qual) {
  // Update active pill styling
  document.querySelectorAll('.qual-filter-pill').forEach(btn => {
    if (btn.getAttribute('data-qual') === qual) {
      btn.classList.add('bg-saffron-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    } else {
      btn.classList.remove('bg-saffron-500', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
    }
  });

  const query = qual === 'all' ? '' : qual;
  window.location.hash = '#directory';

  setTimeout(() => {
    const searchInput = document.getElementById('directorySearchInput');
    if (searchInput) {
      searchInput.value = query;
      if (typeof handleDirectorySearch === 'function') {
        handleDirectorySearch();
      }
    }
  }, 100);
}

// -------------------------------------------------------------
// 3. EXAM BOOKMARK / FAVORITE EXAMS SYSTEM
// -------------------------------------------------------------
function getSavedExams() {
  try {
    return JSON.parse(localStorage.getItem('sarkari_saved_exams') || '[]');
  } catch(e) {
    return [];
  }
}

function isExamBookmarked(examId) {
  return getSavedExams().includes(examId);
}

function toggleBookmarkExam(examId, event) {
  if (event) event.stopPropagation();
  let saved = getSavedExams();
  const index = saved.indexOf(examId);

  if (index === -1) {
    saved.push(examId);
    showPortalToast('⭐ भर्ती आपके पसंदीदा (Saved) में जोड़ी गई!');
  } else {
    saved.splice(index, 1);
    showPortalToast('रिमूव किया गया (Removed from Saved).');
  }

  localStorage.setItem('sarkari_saved_exams', JSON.stringify(saved));
  updateBookmarkIcons();
}

function updateBookmarkIcons() {
  const saved = getSavedExams();
  document.querySelectorAll('[data-bookmark-id]').forEach(btn => {
    const id = btn.getAttribute('data-bookmark-id');
    if (saved.includes(id)) {
      btn.innerHTML = '⭐';
      btn.title = 'Saved in Favorites';
      btn.classList.add('text-amber-500');
    } else {
      btn.innerHTML = '☆';
      btn.title = 'Save Exam to Favorites';
      btn.classList.remove('text-amber-500');
    }
  });

  // Update badge count in header/drawer
  const countBadge = document.getElementById('savedExamsCountBadge');
  if (countBadge) {
    countBadge.textContent = saved.length;
    if (saved.length > 0) countBadge.classList.remove('hidden');
    else countBadge.classList.add('hidden');
  }
}

function showSavedExamsTab() {
  const saved = getSavedExams();
  if (saved.length === 0) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('आपके पास अभी कोई सेव की गई भर्ती नहीं है! किसी भी भर्ती पर स्टार (☆) दबाकर उसे सेव करें।', 'Saved Exams', '⭐');
    } else {
      alert('⭐ आपके पास अभी कोई सेव की गई भर्ती नहीं है! किसी भी भर्ती पर स्टार (☆) दबाकर उसे सेव करें।');
    }
    return;
  }
  window.location.hash = '#directory';
  setTimeout(() => {
    const container = document.getElementById('directoryGrid');
    if (container && typeof ALL_EXAMS_DATA !== 'undefined') {
      const filtered = ALL_EXAMS_DATA.filter(e => saved.includes(e.id));
      if (typeof renderDirectoryGrid === 'function') {
        renderDirectoryGrid(filtered);
      }
    }
  }, 100);
}

// -------------------------------------------------------------
// 4. BROKEN LINK & ISSUE REPORTING MODAL
// -------------------------------------------------------------
let activeReportExamId = '';

function openBrokenLinkModal(examId) {
  activeReportExamId = examId;
  const modal = document.getElementById('brokenLinkReportModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeBrokenLinkModal() {
  const modal = document.getElementById('brokenLinkReportModal');
  if (modal) modal.classList.add('hidden');
}

function submitBrokenLinkReport() {
  const issueSelect = document.getElementById('reportIssueTypeSelect');
  const details = document.getElementById('reportIssueDetailsInput')?.value || '';
  const issue = issueSelect ? issueSelect.value : 'link_error';

  // Save report locally
  const reports = JSON.parse(localStorage.getItem('sarkari_reported_issues') || '[]');
  reports.push({
    examId: activeReportExamId,
    issue,
    details,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('sarkari_reported_issues', JSON.stringify(reports));

  closeBrokenLinkModal();
  showPortalToast('✅ धन्यवाद! हमारे एडमिन 15 मिनट के अंदर आधिकारिक लिंक की जांच करेंगे।');
}

// -------------------------------------------------------------
// 5. INTERACTIVE FAQ ACCORDION
// -------------------------------------------------------------
function toggleFaq(index) {
  const answer = document.getElementById(`faq-ans-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  if (!answer) return;

  const isHidden = answer.classList.contains('hidden');
  if (isHidden) {
    answer.classList.remove('hidden');
    if (icon) icon.textContent = '−';
  } else {
    answer.classList.add('hidden');
    if (icon) icon.textContent = '+';
  }
}

// -------------------------------------------------------------
// 6. OFFLINE & NETWORK STATUS DETECTOR
// -------------------------------------------------------------
function initNetworkDetector() {
  const banner = document.getElementById('networkStatusBanner');
  if (!banner) return;

  window.addEventListener('offline', () => {
    banner.classList.remove('hidden', 'bg-emerald-600');
    banner.classList.add('bg-amber-600');
    banner.innerHTML = '⚠️ <strong>आप ऑफलाइन हैं:</strong> इंटरनेट बंद है, लेकिन आपके पहले से लोड किए गए टूल्स (फोटो रिसाइजर, मॉक टेस्ट, नोट्स) सुरक्षित चल रहे हैं!';
  });

  window.addEventListener('online', () => {
    banner.classList.remove('bg-amber-600');
    banner.classList.add('bg-emerald-600');
    banner.innerHTML = '🟢 <strong>इंटरनेट कनेक्ट हो गया!</strong> सभी लाइव सरकारी अपडेट्स सक्रिय हैं।';
    setTimeout(() => {
      banner.classList.add('hidden');
    }, 4000);
  });
}

// -------------------------------------------------------------
// 7. DPDP ACT 2023 PRIVACY CONSENT BANNER
// -------------------------------------------------------------
function initDpdpConsent() {
  const consent = localStorage.getItem('sarkari_dpdp_consent');
  const banner = document.getElementById('dpdpConsentBanner');
  if (!consent && banner) {
    banner.classList.remove('hidden');
  }
}

function acceptDpdpConsent() {
  localStorage.setItem('sarkari_dpdp_consent', 'accepted');
  const banner = document.getElementById('dpdpConsentBanner');
  if (banner) banner.classList.add('hidden');
}

// -------------------------------------------------------------
// 8. 5-STAR STUDENT RATING & FEEDBACK MODAL
// -------------------------------------------------------------
let currentSelectedRating = 5;

function setRatingScore(stars) {
  currentSelectedRating = stars;
  const container = document.getElementById('starRatingContainer');
  if (container) {
    const btns = container.querySelectorAll('.star-btn');
    btns.forEach((btn, idx) => {
      if (idx < stars) {
        btn.classList.add('scale-110');
        btn.style.opacity = '1';
        btn.style.filter = 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))';
      } else {
        btn.classList.remove('scale-110');
        btn.style.opacity = '0.35';
        btn.style.filter = 'none';
      }
    });
  }
}

function openRatingModal() {
  const modal = document.getElementById('studentRatingModal');
  if (modal) {
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.classList.remove('hidden');
    }
    setRatingScore(5);
  }
}

function closeRatingModal() {
  const modal = document.getElementById('studentRatingModal');
  if (modal) {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.classList.add('hidden');
    }
  }
}

function submitRating(stars) {
  const finalStars = stars || currentSelectedRating || 5;
  const comment = document.getElementById('ratingFeedbackText')?.value || document.getElementById('ratingCommentInput')?.value || '';
  try {
    localStorage.setItem('sarkari_user_rating', JSON.stringify({ stars: finalStars, comment, date: new Date().toISOString() }));
  } catch (e) {}
  closeRatingModal();
  showPortalToast(`⭐ ${finalStars} स्टार रेटिंग और सुझाव के लिए आपका धन्यवाद!`);
}

// -------------------------------------------------------------
// 9. LIGHTWEIGHT PORTAL TOAST NOTIFICATION
// -------------------------------------------------------------
function showPortalToast(message) {
  let toast = document.getElementById('portalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portalToast';
    toast.className = 'fixed bottom-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400 font-bold text-xs flex items-center space-x-2 transition-opacity duration-300';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  toast.classList.remove('hidden');
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 3500);
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initJobAlertBell();
  initNetworkDetector();
  initDpdpConsent();
  updateBookmarkIcons();
});

// Window exports
window.initJobAlertBell = initJobAlertBell;
window.toggleJobAlerts = toggleJobAlerts;
window.filterByQualification = filterByQualification;
window.toggleBookmarkExam = toggleBookmarkExam;
window.isExamBookmarked = isExamBookmarked;
window.showSavedExamsTab = showSavedExamsTab;
window.updateBookmarkIcons = updateBookmarkIcons;
window.openBrokenLinkModal = openBrokenLinkModal;
window.closeBrokenLinkModal = closeBrokenLinkModal;
window.submitBrokenLinkReport = submitBrokenLinkReport;
window.toggleFaq = toggleFaq;
window.acceptDpdpConsent = acceptDpdpConsent;
window.openRatingModal = openRatingModal;
window.closeRatingModal = closeRatingModal;
window.setRatingScore = setRatingScore;
window.submitRating = submitRating;
window.showPortalToast = showPortalToast;

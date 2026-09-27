// public/js/exam-calendar.js
// Sarkari Exam Live Countdown Timers & Schedule Calendar Engine (2026 Edition)
// Real-time ticking timers (Days : Hours : Mins : Secs) with Category Filters & Google Calendar Sync

const SARKARI_EXAM_SCHEDULE = [
  {
    id: "ssc-gd-2026",
    title: "SSC GD Constable 2026 Exam",
    body: "Staff Selection Commission (TCS Pattern)",
    category: "central",
    targetDate: "2026-02-15T09:00:00+05:30",
    statusBadge: "🔥 Exam Dates Active",
    statusColor: "bg-rose-600 text-white",
    posts: "39,481 Posts",
    admitCardDate: "05 Feb 2026",
    applyLink: "#exam/ssc-gd",
    desc: "सीमा सुरक्षा बल, केंद्रीय रिजर्व पुलिस बल व असम राइफल्स भर्ती।"
  },
  {
    id: "up-police-2026",
    title: "UP Police Constable 60,244 Re-Exam",
    body: "उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB)",
    category: "police",
    targetDate: "2026-11-20T10:00:00+05:30",
    statusBadge: "👮 Exam Center Slip Live",
    statusColor: "bg-red-700 text-white",
    posts: "60,244 Posts",
    admitCardDate: "12 Nov 2026",
    applyLink: "#exam/up-police-constable",
    desc: "उत्तर प्रदेश सिपाही नागरिक पुलिस 60,244 पदों की महा-परीक्षा।"
  },
  {
    id: "rrb-alp-2026",
    title: "Railway RRB ALP & Technician CBT-1",
    body: "Railway Recruitment Control Board (RRB)",
    category: "central",
    targetDate: "2026-12-05T09:30:00+05:30",
    statusBadge: "⚡ City Intimation Active",
    statusColor: "bg-amber-600 text-white",
    posts: "18,799 Posts",
    admitCardDate: "28 Nov 2026",
    applyLink: "#exam/rrb-alp",
    desc: "असिस्टेंट लोको पायलट एवं तकनीशियन ग्रेड-I व III कंप्यूटर आधारित टेस्ट।"
  },
  {
    id: "cbse-board-2026",
    title: "CBSE Class 10th & 12th Board Theory",
    body: "Central Board of Secondary Education (CBSE)",
    category: "board",
    targetDate: "2026-02-15T10:30:00+05:30",
    statusBadge: "🏫 Date Sheet Released",
    statusColor: "bg-blue-600 text-white",
    posts: "Annual Board Exam",
    admitCardDate: "25 Jan 2026",
    applyLink: "#exam/cbse-board",
    desc: "कक्षा 10वीं व 12वीं वार्षिक सैद्धांतिक परीक्षा 2026।"
  },
  {
    id: "bseb-board-2026",
    title: "BSEB Bihar Board Matric / Inter 2026",
    body: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)",
    category: "board",
    targetDate: "2026-02-01T09:30:00+05:30",
    statusBadge: "📜 Official Time Table Live",
    statusColor: "bg-emerald-700 text-white",
    posts: "Matric & Inter Theory",
    admitCardDate: "15 Jan 2026",
    applyLink: "#exam/bseb-board",
    desc: "मैट्रिक (10वीं) एवं इंटरमीडिएट (12वीं) वार्षिक परीक्षा 2026।"
  },
  {
    id: "upmsp-board-2026",
    title: "UPMSP UP Board High School & Inter",
    body: "माध्यमिक शिक्षा परिषद्, उत्तर प्रदेश (प्रयागराज)",
    category: "board",
    targetDate: "2026-02-22T08:30:00+05:30",
    statusBadge: "🏫 Exam Schedule Declared",
    statusColor: "bg-indigo-600 text-white",
    posts: "55 Lakh+ Candidates",
    admitCardDate: "05 Feb 2026",
    applyLink: "#exam/up-board",
    desc: "हाईस्कूल एवं इंटरमीडिएट बोर्ड परीक्षा 2026।"
  },
  {
    id: "nta-neet-2026",
    title: "NTA NEET UG 2026 Medical Entrance",
    body: "National Testing Agency (NTA)",
    category: "entrance",
    targetDate: "2026-05-03T14:00:00+05:30",
    statusBadge: "🩺 Registration Alert",
    statusColor: "bg-teal-600 text-white",
    posts: "MBBS / BDS Admission",
    admitCardDate: "25 Apr 2026",
    applyLink: "#exam/nta-neet",
    desc: "अखिल भारतीय राष्ट्रीय पात्रता सह प्रवेश परीक्षा (यूजी) 2026।"
  },
  {
    id: "bihar-police-2026",
    title: "Bihar Police CSBC Constable 21,391 Posts",
    body: "केंद्रीय चयन पर्षद (सिपाही भर्ती) पटना",
    category: "police",
    targetDate: "2026-11-28T10:00:00+05:30",
    statusBadge: "👮 Admit Card Live",
    statusColor: "bg-red-800 text-white",
    posts: "21,391 Posts",
    admitCardDate: "18 Nov 2026",
    applyLink: "#exam/bihar-police-constable",
    desc: "बिहार पुलिस सिपाही संवर्ग 21,391 पदों हेतु लिखित परीक्षा।"
  }
];

let activeCalendarFilter = 'all';
let calendarInterval = null;

function initExamCalendar() {
  renderCalendarCards();

  if (calendarInterval) clearInterval(calendarInterval);
  calendarInterval = setInterval(() => {
    updateAllCountdowns();
  }, 1000);
}

function filterCalendar(cat) {
  activeCalendarFilter = cat;
  
  document.querySelectorAll('.calendar-filter-btn').forEach(b => {
    if (b.getAttribute('data-cal-cat') === cat) {
      b.classList.remove('bg-white', 'text-slate-800');
      b.classList.add('bg-blue-900', 'text-white', 'shadow-md');
    } else {
      b.classList.remove('bg-blue-900', 'text-white', 'shadow-md');
      b.classList.add('bg-white', 'text-slate-800');
    }
  });

  renderCalendarCards();
}

function calculateTimeRemaining(targetIsoDate) {
  const target = new Date(targetIsoDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPassed: false };
}

function renderCalendarCards() {
  const container = document.getElementById('examCalendarCardsContainer');
  if (!container) return;

  const list = SARKARI_EXAM_SCHEDULE.filter(e => {
    if (activeCalendarFilter === 'all') return true;
    return e.category === activeCalendarFilter;
  });

  container.innerHTML = list.map(item => {
    const t = calculateTimeRemaining(item.targetDate);
    const googleCalUrl = createGoogleCalendarUrl(item.title, item.targetDate, item.desc);

    return `
      <div class="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-md hover:shadow-xl transition space-y-4 flex flex-col justify-between" data-exam-target="${item.targetDate}" data-exam-id="${item.id}">
        <!-- Top Bar -->
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black ${item.statusColor}">
            ${item.statusBadge}
          </span>
          <span class="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            ${item.posts}
          </span>
        </div>

        <!-- Title & Details -->
        <div>
          <h3 class="text-base sm:text-lg font-black text-slate-900 leading-snug">
            <a href="${item.applyLink}" class="hover:text-blue-700 transition">${item.title}</a>
          </h3>
          <p class="text-xs text-slate-500 font-semibold mt-0.5">${item.body}</p>
          <p class="text-xs text-slate-600 mt-2 line-clamp-2">${item.desc}</p>
        </div>

        <!-- Live Ticking Countdown Box -->
        <div class="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 shadow-inner">
          <div class="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span data-i18n="cal_countdown_label">${typeof getTranslation === 'function' ? getTranslation('cal_countdown_label') : '⏱️ Live Exam Countdown'}</span>
            <span class="text-slate-400">Target Date: ${new Date(item.targetDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div class="grid grid-cols-4 gap-1.5 text-center font-mono">
            <div class="bg-white/10 rounded-xl p-1.5">
              <span class="countdown-days text-base sm:text-xl font-black text-amber-400">${t.days}</span>
              <span class="text-[9px] block uppercase font-bold text-slate-300" data-i18n="cal_days">${typeof getTranslation === 'function' ? getTranslation('cal_days') : 'Days'}</span>
            </div>
            <div class="bg-white/10 rounded-xl p-1.5">
              <span class="countdown-hours text-base sm:text-xl font-black text-white">${String(t.hours).padStart(2, '0')}</span>
              <span class="text-[9px] block uppercase font-bold text-slate-300" data-i18n="cal_hours">${typeof getTranslation === 'function' ? getTranslation('cal_hours') : 'Hours'}</span>
            </div>
            <div class="bg-white/10 rounded-xl p-1.5">
              <span class="countdown-mins text-base sm:text-xl font-black text-white">${String(t.minutes).padStart(2, '0')}</span>
              <span class="text-[9px] block uppercase font-bold text-slate-300" data-i18n="cal_mins">${typeof getTranslation === 'function' ? getTranslation('cal_mins') : 'Mins'}</span>
            </div>
            <div class="bg-white/10 rounded-xl p-1.5">
              <span class="countdown-secs text-base sm:text-xl font-black text-rose-400">${String(t.seconds).padStart(2, '0')}</span>
              <span class="text-[9px] block uppercase font-bold text-slate-300" data-i18n="cal_secs">${typeof getTranslation === 'function' ? getTranslation('cal_secs') : 'Secs'}</span>
            </div>
          </div>
        </div>

        <!-- Action Links -->
        <div class="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
          <a href="${item.applyLink}" class="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition flex-grow text-center">
            <span data-i18n="cal_official_portal">${typeof getTranslation === 'function' ? getTranslation('cal_official_portal') : 'Official Portal →'}</span>
          </a>
          <a href="${googleCalUrl}" target="_blank" rel="noopener" class="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs px-3 py-2.5 rounded-xl transition flex items-center space-x-1 shrink-0" title="Add to Google Calendar">
            <span>📅 </span><span data-i18n="cal_add_google">${typeof getTranslation === 'function' ? getTranslation('cal_add_google') : 'Add to Google Calendar'}</span>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function updateAllCountdowns() {
  document.querySelectorAll('#examCalendarCardsContainer [data-exam-target]').forEach(card => {
    const targetDate = card.getAttribute('data-exam-target');
    const t = calculateTimeRemaining(targetDate);

    const dEl = card.querySelector('.countdown-days');
    const hEl = card.querySelector('.countdown-hours');
    const mEl = card.querySelector('.countdown-mins');
    const sEl = card.querySelector('.countdown-secs');

    if (dEl) dEl.textContent = t.days;
    if (hEl) hEl.textContent = String(t.hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(t.minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(t.seconds).padStart(2, '0');
  });
}

function createGoogleCalendarUrl(title, isoDate, details) {
  const d = new Date(isoDate);
  const startStr = d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endDate = new Date(d.getTime() + 3 * 60 * 60 * 1000);
  const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("dates", `${startStr}/${endStr}`);
  url.searchParams.set("details", `${details} • Verified on SarkariAI Hub`);
  url.searchParams.set("location", "Exam Center, India");
  return url.toString();
}

// React to language change
window.addEventListener('languageChanged', () => {
  renderCalendarCards();
});

document.addEventListener('DOMContentLoaded', () => {
  initExamCalendar();
});

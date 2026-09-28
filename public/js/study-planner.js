// public/js/study-planner.js
// Smart Daily Study Timetable & Routine Generator (2026 Edition)
// Scientific Pomodoro-based study schedules for Full-time, Working, and Weekend aspirants

const STUDY_PLAN_TEMPLATES = {
  "full-time": {
    name: "फुल-टाइम समर्पित अभ्यर्थी (Full-Time Aspirant - 8-10 घंटे)",
    description: "घर या लाइब्रेरी से पूरे दिन पढ़ाई करने वाले अभ्यर्थियों के लिए वैज्ञानिक टाइमटेबल।",
    totalHours: "9 घंटे शुद्ध अध्ययन (50:10 पोमोडोरो ब्रेक सहित)",
    slots: [
      {
        slotName: "प्रातः सत्र 1: उच्च एकाग्रता - गणित / क्वांट",
        subject: "Mathematics / Quantitative Aptitude",
        duration: "2 घंटे (120 मिनट)",
        timeDefault: "06:30 AM - 08:30 AM",
        icon: "📐",
        objective: "मस्तिष्क के सर्वाधिक ऊर्जावान समय में कठिन गणितीय अवधारणाएं व 40-50 नए प्रश्नों का हल।"
      },
      {
        slotName: "प्रातः सत्र 2: दैनिक करेंट अफेयर्स व एडिटोरियल",
        subject: "Current Affairs & Static GK Booster",
        duration: "1.5 घंटे (90 मिनट)",
        timeDefault: "09:30 AM - 11:00 AM",
        icon: "📰",
        objective: "दैनिक राष्ट्रीय/अंतर्राष्ट्रीय समाचार, मासिक कैप्सूल रिवीजन एवं 10 दैनिक क्विज प्रश्न।"
      },
      {
        slotName: "दोपहर सत्र 3: रीजनिंग व तार्किक क्षमता",
        subject: "Reasoning & Mental Ability",
        duration: "1.5 घंटे (90 मिनट)",
        timeDefault: "11:30 AM - 01:00 PM",
        icon: "🧠",
        objective: "पहेलियाँ (Puzzles), सिलोगिज्म, कोडिंग-डिकोडिंग और प्रीवियस ईयर प्रश्नों का स्पीड टेस्ट।"
      },
      {
        slotName: "अपराह्न सत्र 4: सामान्य अध्ययन (GS / GK थ्योरी)",
        subject: "General Studies (History, Polity, Geography, Science)",
        duration: "2 घंटे (120 मिनट)",
        timeDefault: "03:30 PM - 05:30 PM",
        icon: "📚",
        objective: "NCERT आधारित नोट्स पढ़ना, संविधान के महत्वपूर्ण अनुच्छेद, विज्ञान के सिद्धांत व हाइलाइट्स।"
      },
      {
        slotName: "सायं सत्र 5: भाषा दक्षता (English / Hindi)",
        subject: "Language & Comprehension (English / Hindi Grammar)",
        duration: "1 घंटा (60 मिनट)",
        timeDefault: "06:30 PM - 07:30 PM",
        icon: "✍️",
        objective: "शब्दावली (Vocab / पर्यायवाची), मुहावरे, व्याकरण के नियम और गद्यांश अभ्यास।"
      },
      {
        slotName: "रात्रि सत्र 6: फुल मॉक टेस्ट व गलतियों का विश्लेषण (Analysis)",
        subject: "Full Mock Test + Error Notebook",
        duration: "1 घंटा (60 मिनट)",
        timeDefault: "09:00 PM - 10:00 PM",
        icon: "🎯",
        objective: "परीक्षा पैटर्न पर 1 स्पीड टेस्ट, गलत हुए प्रश्नों को 'त्रुटि डायरी' (Error Diary) में नोट करना।"
      }
    ]
  },
  "working": {
    name: "वर्किंग / कॉलेज अभ्यर्थी (Working Professional / College - 4-5 घंटे)",
    description: "नौकरी या कॉलेज के साथ सरकारी परीक्षा निकालने हेतु समय-प्रबंधन आधारित सटीक रूटीन।",
    totalHours: "4.5 घंटे केंद्रित स्मार्ट अध्ययन",
    slots: [
      {
        slotName: "सुबह का पावर स्लॉट: गणित या रीजनिंग",
        subject: "Maths / Reasoning (Alternate Days)",
        duration: "1.5 घंटे (90 मिनट)",
        timeDefault: "06:00 AM - 07:30 AM",
        icon: "⚡",
        objective: "ऑफिस/कॉलेज जाने से पहले शांत वातावरण में 30 प्रश्नों का हाई-स्पीड अभ्यास।"
      },
      {
        slotName: "यात्रा / लंच ब्रेक: मोबाइल माइक्रो-लर्निंग",
        subject: "Mobile Current Affairs & Vocab Quiz",
        duration: "30 मिनट",
        timeDefault: "01:30 PM - 02:00 PM",
        icon: "📱",
        objective: "सफर या लंच में SarkariAI पोर्टल से 10 करेंट अफेयर्स क्विज और रिवीजन कैप्सूल पढ़ना।"
      },
      {
        slotName: "शाम का गहन सत्र: सामान्य ज्ञान व भाषा",
        subject: "GS / Static GK & English/Hindi",
        duration: "1.5 घंटे (90 मिनट)",
        timeDefault: "08:00 PM - 09:30 PM",
        icon: "📖",
        objective: "महत्वपूर्ण विषयवार थ्योरी का अध्ययन एवं संक्षिप्त नोट्स तैयार करना।"
      },
      {
        slotName: "रात का क्लोजर: सेक्शनल स्पीड टेस्ट",
        subject: "Sectional Speed Test & Revision",
        duration: "1 घंटा (60 मिनट)",
        timeDefault: "10:00 PM - 11:00 PM",
        icon: "🎯",
        objective: "25-30 प्रश्नों का टाइमर युक्त सेक्शनल टेस्ट और सोने से पहले दिन भर का त्वरित रिवीजन।"
      }
    ]
  },
  "weekend": {
    name: "सप्ताहांत मैराथन अभ्यर्थी (Weekend Marathon Sprint - 10-12 घंटे)",
    description: "शनिवार व रविवार को पूरे सप्ताह का बैकलाग व मैराथन मॉक टेस्ट कवर करने हेतु।",
    totalHours: "11 घंटे का सघन मैराथन अभ्यास",
    slots: [
      {
        slotName: "मैराथन स्लॉट 1: संपूर्ण मॉक टेस्ट 1 व गहन विश्लेषण",
        subject: "Full Length Mock 1 + In-Depth Post Mortem",
        duration: "2.5 घंटे (150 मिनट)",
        timeDefault: "07:00 AM - 09:30 AM",
        icon: "🏆",
        objective: "100 प्रश्नों का पूर्ण मॉक टेस्ट और प्रत्येक गलत प्रश्न के कॉन्सेप्ट का पुनरावलोकन।"
      },
      {
        slotName: "मैराथन स्लॉट 2: गणित के 100 प्रश्नों की श्रृंखला",
        subject: "Quantitative Aptitude 100 Question Sprint",
        duration: "3 घंटे (180 मिनट)",
        timeDefault: "10:30 AM - 01:30 PM",
        icon: "📐",
        objective: "कमजोर अध्यायों (जैसे प्रतिशत, सीआई, समय-काम) के 100 कठिन प्रश्नों का हल।"
      },
      {
        slotName: "मैराथन स्लॉट 3: पूरे सप्ताह के करेंट अफेयर्स व GS रिवीजन",
        subject: "Weekly Current Affairs Digest & GS Master Revision",
        duration: "2.5 घंटे (150 मिनट)",
        timeDefault: "03:00 PM - 05:30 PM",
        icon: "📰",
        objective: "पूरे सप्ताह की प्रमुख घटनाएं, नियुक्तियां व GS के 300 वन-लाइनर्स का त्वरित रिवीजन।"
      },
      {
        slotName: "मैराथन स्लॉट 4: दूसरा फुल मॉक टेस्ट एवं आगामी सप्ताह की योजना",
        subject: "Full Length Mock 2 & Strategy Planning",
        duration: "3 घंटे (180 मिनट)",
        timeDefault: "07:00 PM - 10:00 PM",
        icon: "🎯",
        objective: "दिन का दूसरा फुल टेस्ट देकर अपनी एक्यूरेसी और स्पीड में सुधार की तुलना करना।"
      }
    ]
  }
};

let studyCheckedSlots = {};

function generateStudyTimetable() {
  const profileKey = document.getElementById('studyProfileSelect')?.value || 'full-time';
  const targetExam = document.getElementById('studyExamTargetSelect')?.value || 'ssc';
  const container = document.getElementById('studyTimetableResultContainer');

  if (!container) return;

  const examLabels = {
    'ssc': '🏛️ SSC (CGL/CHSL/GD/MTS)',
    'railway': '🚆 Railway (NTPC/ALP/Group D)',
    'police': '👮 Police (UP/Bihar/Delhi Police)',
    'defence': '🎖️ Defence (Agniveer Army/Air Force/Navy)',
    'banking': '🏦 Banking (IBPS/SBI PO & Clerk)',
    'teaching': '📚 Teaching (CTET/BPSC TRE/UPTET)',
    'upsc': '🎓 Civil Services (UPSC CSE/State PCS)',
    'boards': '📖 Board Exams (10th/12th Theory)'
  };
  const targetExamBadge = examLabels[targetExam] || '🎯 Target Exam Domain';

  const plan = STUDY_PLAN_TEMPLATES[profileKey] || STUDY_PLAN_TEMPLATES['full-time'];
  studyCheckedSlots = {}; // reset for fresh generation

  let slotsHtml = '';
  plan.slots.forEach((slot, idx) => {
    slotsHtml += `
      <div class="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-xs space-y-3" id="slot-card-${idx}">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shrink-0">
              ${slot.icon}
            </span>
            <div>
              <h4 class="font-bold text-sm text-slate-900">${slot.slotName}</h4>
              <div class="text-xs text-indigo-700 font-medium">${slot.subject}</div>
            </div>
          </div>

          <div class="flex items-center gap-3 self-end sm:self-auto">
            <span class="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              ${slot.timeDefault}
            </span>
            <label class="flex items-center gap-1.5 text-xs text-slate-600 font-semibold cursor-pointer select-none">
              <input type="checkbox" 
                     id="chk-slot-${idx}"
                     onchange="handleSlotToggle(${idx}, ${plan.slots.length})"
                     class="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer">
              <span>पूर्ण (Done)</span>
            </label>
          </div>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
          <span class="text-indigo-600 font-bold">🎯 लक्ष्य:</span>
          <span>${slot.objective}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Plan Header Summary -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
              ${plan.name}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-700 text-white shadow-xs">
              ${targetExamBadge}
            </span>
          </div>
          <p class="text-xs text-slate-600 mt-2 font-medium">
            ${plan.description}
          </p>
        </div>
        <div class="text-left md:text-right shrink-0">
          <div class="text-lg font-black text-slate-900">${plan.totalHours}</div>
          <div class="text-xs text-emerald-700 font-bold">💡 50:10 पोमोडोरो तकनीक अनुशंसित</div>
        </div>
      </div>

      <!-- Live Daily Progress Bar -->
      <div class="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-700" data-i18n="planner_daily_completion">${typeof getTranslation === 'function' ? getTranslation('planner_daily_completion') : 'आज का दैनिक अध्ययन लक्ष्य (Daily Completion):'}</span>
          <span id="studyProgressPctDisplay" class="font-bold font-mono text-indigo-700">0% पूर्ण</span>
        </div>
        <div class="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
          <div id="studyProgressBarDisplay" class="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-0 transition-all duration-300 rounded-full"></div>
        </div>
      </div>

      <!-- Slots List -->
      <div class="space-y-3.5">
        ${slotsHtml}
      </div>

      <!-- Motivational Pomodoro Tips -->
      <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
        <div class="font-bold flex items-center gap-2">
          <span>⚡ टॉपर्स का पोमोडोरो (50:10) सीक्रेट नियम:</span>
        </div>
        <ul class="list-disc pl-5 space-y-1 text-slate-700">
          <li>लगातार 50 मिनट तक मोबाइल फोन को 'डू नॉट डिस्टर्ब (DND)' मोड में रखकर सिर्फ एक विषय पढ़ें।</li>
          <li>प्रत्येक 50 मिनट के बाद अनिवार्य रूप से 10 मिनट का ब्रेक लें - पानी पिएं और आंखें बंद कर विश्राम करें।</li>
          <li>शाम 6 बजे के बाद भारी भोजन से बचें ताकि रात्रि अध्ययन के दौरान सुस्ती न आए।</li>
        </ul>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-end gap-3 pt-2">
        <button type="button" 
                onclick="printStudyRoutine()"
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer active:scale-95 transition">
          <span>🖨️ वॉल टाइमटेबल प्रिंट / PDF सेव करें</span>
        </button>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
}

function handleSlotToggle(slotIdx, totalSlots) {
  const chk = document.getElementById(`chk-slot-${slotIdx}`);
  const card = document.getElementById(`slot-card-${slotIdx}`);

  if (chk && chk.checked) {
    studyCheckedSlots[slotIdx] = true;
    if (card) {
      card.classList.add('bg-emerald-50/40', 'border-emerald-300');
    }
  } else {
    delete studyCheckedSlots[slotIdx];
    if (card) {
      card.classList.remove('bg-emerald-50/40', 'border-emerald-300');
    }
  }

  const completedCount = Object.keys(studyCheckedSlots).length;
  const pct = Math.round((completedCount / totalSlots) * 100);

  const pctDisplay = document.getElementById('studyProgressPctDisplay');
  const barDisplay = document.getElementById('studyProgressBarDisplay');

  if (pctDisplay) {
    pctDisplay.innerText = `${pct}% पूर्ण (${completedCount}/${totalSlots} स्लॉट)`;
  }
  if (barDisplay) {
    barDisplay.style.width = `${pct}%`;
  }

  if (pct === 100) {
    const congratsMsg = "🎉 बधाई! आपने आज का संपूर्ण अध्ययन लक्ष्य 100% पूरा कर लिया है! इसी निरंतरता से आपकी सफलता सुनिश्चित है। 🏆";
    if (typeof showAppAlert === 'function') {
      showAppAlert(congratsMsg, 'Goal Completed', '🎉');
    } else {
      alert(congratsMsg);
    }
  }
}

function initStudyPlanner() {
  const profileSelect = document.getElementById('studyProfileSelect');
  if (profileSelect) {
    profileSelect.removeEventListener('change', generateStudyTimetable);
    profileSelect.addEventListener('change', generateStudyTimetable);
  }

  const genBtn = document.getElementById('studyGenerateBtn');
  if (genBtn) {
    genBtn.removeEventListener('click', generateStudyTimetable);
    genBtn.addEventListener('click', generateStudyTimetable);
  }

  generateStudyTimetable();
}

// React to language change
window.addEventListener('languageChanged', () => {
  const container = document.getElementById('studyTimetableResultContainer');
  if (container && container.innerHTML.trim() !== '') {
    generateStudyTimetable();
  }
});

function printStudyRoutine() {
  const profileKey = document.getElementById('studyProfileSelect')?.value || 'full-time';
  const planData = STUDY_PLAN_TEMPLATES[profileKey] || STUDY_PLAN_TEMPLATES['full-time'];

  const printWindow = window.open('', '_blank', 'width=800,height=750');
  if (!printWindow) {
    const popStudy = 'कृपया पॉपअप विंडो को अनुमति दें (Please allow popups to print study routine).';
    if (typeof showAppAlert === 'function') {
      showAppAlert(popStudy, 'Popup Notice', '🖨️');
    } else {
      alert(popStudy);
    }
    return;
  }

  const rows = planData.slots.map(s => `
    <tr>
      <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 22%;">${s.timeDefault}</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; color: #0f172a;">${s.icon} ${s.slotName}</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: 600;">${s.subject} (${s.duration})</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1; font-size: 11px; color: #475569;">${s.objective}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>Daily Study Routine - ${planData.name}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1e293b; background: #fff; margin: 0; line-height: 1.4; }
        .header { text-align: center; border-bottom: 2px solid #ea580c; padding-bottom: 12px; margin-bottom: 16px; }
        .header h2 { margin: 0; font-size: 22px; color: #0f172a; }
        .header p { margin: 4px 0 0; font-size: 13px; color: #64748b; font-weight: bold; }
        .routine-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
        .routine-table th { background: #0f172a; color: #fff; padding: 10px; text-align: left; }
        .tips-box { background: #fff7ed; border-left: 4px solid #ea580c; padding: 12px; margin-top: 20px; font-size: 12px; border-radius: 4px; }
        .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 8px; }
        @media print {
          .no-print { display: none; }
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: right; margin-bottom: 12px;">
        <button onclick="window.print()" style="background: #ea580c; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">🖨️ Print Wall Timetable (दीवार पर चिपकाने हेतु)</button>
        <button onclick="window.close()" style="background: #e2e8f0; color: #334155; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; margin-left: 8px;">Close</button>
      </div>

      <div class="header">
        <h2>🇮🇳 SARKARI EXAM MASTER STUDY TIMETABLE</h2>
        <p>${planData.name} • ${planData.totalHours}</p>
      </div>

      <table class="routine-table">
        <tr>
          <th>समय (Time Slot)</th>
          <th>सत्र का नाम (Session)</th>
          <th>विषय एवं अवधि (Subject)</th>
          <th>लक्ष्य (Focus Goal)</th>
        </tr>
        ${rows}
      </table>

      <div class="tips-box">
        <strong>💡 वैज्ञानिक 50:10 नियम:</strong> प्रत्येक 50 मिनट के गहन अध्ययन के बाद 10 मिनट का स्क्रीन-मुक्त ब्रेक अवश्य लें। पानी पिएं और आंखें बंद कर विश्राम करें।
      </div>

      <div class="footer">
        Generated by SarkariAI Hub (sarkariaihub.in) • Bharat's #1 Exam & Board Portal
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

window.printStudyRoutine = printStudyRoutine;

document.addEventListener('DOMContentLoaded', initStudyPlanner);

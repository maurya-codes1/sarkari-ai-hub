const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Replacements for Bharat Question Bank Explorer
const replacements = [
  // BQB Badges & Header
  [
    `<span>🇮🇳 Bharat's Largest Free Exam Corpus</span>`,
    `<span data-i18n="bqb_badge_corpus">🇮🇳 Bharat's Largest Free Exam Corpus</span>`
  ],
  [
    `<span>100% Verified Authentic Data</span>`,
    `<span data-i18n="bqb_badge_authentic">100% Verified Authentic Data</span>`
  ],
  [
    `<span>📚 Bharat Question Bank Explorer</span>`,
    `<span data-i18n="bqb_title">📚 Bharat Question Bank Explorer</span>`
  ],
  [
    `<span class="text-sm px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">1,72,210+ Live</span>`,
    `<span class="text-sm px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold" data-i18n="bqb_live_count">1,72,210+ Live</span>`
  ],
  [
    `<p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore Bharat's complete multi-exam repository covering 49 National Competitive Exams and 31 State & Central Education Boards (Classes 9th to 12th).
            </p>`,
    `<p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed" data-i18n="bqb_subtitle">
              Explore Bharat's complete multi-exam repository covering 49 National Competitive Exams and 31 State & Central Education Boards (Classes 9th to 12th).
            </p>`
  ],
  // BQB CTAs
  [
    `<span>Adaptive Practice (8 Modes)</span>`,
    `<span data-i18n="bqb_cta_adaptive">Adaptive Practice (8 Modes)</span>`
  ],
  [
    `<span>Coverage Matrix</span>`,
    `<span data-i18n="bqb_cta_matrix">Coverage Matrix</span>`
  ],
  [
    `<span>Study Planner</span>`,
    `<span data-i18n="bqb_cta_planner">Study Planner</span>`
  ],
  // 6 Metric Counters
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Total Questions</div>
            <div class="text-[9px] text-slate-400 mt-0.5">72.3k Comp + 99.8k Board</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_total_q">Total Questions</div>
            <div class="text-[9px] text-slate-400 mt-0.5" data-i18n="bqb_stat_total_sub">72.3k Comp + 99.8k Board</div>`
  ],
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Practice MCQs</div>
            <div class="text-[9px] text-emerald-300/80 mt-0.5">Instant Green/Red Solved</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_mcq">Practice MCQs</div>
            <div class="text-[9px] text-emerald-300/80 mt-0.5" data-i18n="bqb_stat_mcq_sub">Instant Green/Red Solved</div>`
  ],
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Theory Questions</div>
            <div class="text-[9px] text-cyan-300/80 mt-0.5">Class 9-12 Subjective</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_theory">Theory Questions</div>
            <div class="text-[9px] text-cyan-300/80 mt-0.5" data-i18n="bqb_stat_theory_sub">Class 9-12 Subjective</div>`
  ],
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Exam Tracks</div>
            <div class="text-[9px] text-rose-300/80 mt-0.5">SSC, UPSC, RRB, Police</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_tracks">Exam Tracks</div>
            <div class="text-[9px] text-rose-300/80 mt-0.5" data-i18n="bqb_stat_tracks_sub">SSC, UPSC, RRB, Police</div>`
  ],
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Education Boards</div>
            <div class="text-[9px] text-purple-300/80 mt-0.5">CBSE, ICSE & All States</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_boards">Education Boards</div>
            <div class="text-[9px] text-purple-300/80 mt-0.5" data-i18n="bqb_stat_boards_sub">CBSE, ICSE & All States</div>`
  ],
  [
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1">Indian Languages</div>
            <div class="text-[9px] text-orange-300/80 mt-0.5">Regional UI & Papers</div>`,
    `<div class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 mt-1" data-i18n="bqb_stat_languages">Indian Languages</div>
            <div class="text-[9px] text-orange-300/80 mt-0.5" data-i18n="bqb_stat_languages_sub">Regional UI & Papers</div>`
  ],
  // 4 Feature Cards
  [
    `<div class="font-black text-sm text-amber-300">Adaptive Practice</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug">8 scientific modes: Weak-topic drills, PYQ revision, speed training & blueprint calibration.</p>`,
    `<div class="font-black text-sm text-amber-300" data-i18n="bqb_card_adaptive_title">Adaptive Practice</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug" data-i18n="bqb_card_adaptive_sub">8 scientific modes: Weak-topic drills, PYQ revision, speed training & blueprint calibration.</p>`
  ],
  [
    `<div class="font-black text-sm text-rose-300">Learning Practice</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug">Instant Green/Red feedback, explanation cards, option locking & authentic official blueprints.</p>`,
    `<div class="font-black text-sm text-rose-300" data-i18n="bqb_card_learning_title">Learning Practice</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug" data-i18n="bqb_card_learning_sub">Instant Green/Red feedback, explanation cards, option locking & authentic official blueprints.</p>`
  ],
  [
    `<div class="font-black text-sm text-indigo-300">National Matrix</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug">Complete syllabus and question readiness audit across all 49 exams and 31 state boards.</p>`,
    `<div class="font-black text-sm text-indigo-300" data-i18n="bqb_card_matrix_title">National Matrix</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug" data-i18n="bqb_card_matrix_sub">Complete syllabus and question readiness audit across all 49 exams and 31 state boards.</p>`
  ],
  [
    `<div class="font-black text-sm text-pink-300">Leitner Smart Planner</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug">Spaced repetition revision box, 50:10 pomodoro routine & daily target tracking.</p>`,
    `<div class="font-black text-sm text-pink-300" data-i18n="bqb_card_planner_title">Leitner Smart Planner</div>
            </div>
            <p class="text-xs text-slate-300 leading-snug" data-i18n="bqb_card_planner_sub">Spaced repetition revision box, 50:10 pomodoro routine & daily target tracking.</p>`
  ],
  // State Boards Header
  [
    `<span>🎓 31 State & Central Education Boards</span>`,
    `<span data-i18n="sb_badge_title">🎓 31 State & Central Education Boards</span>`
  ],
  [
    `<span>Classes 9th to 12th Full Syllabus</span>`,
    `<span data-i18n="sb_badge_sub">Classes 9th to 12th Full Syllabus</span>`
  ],
  [
    `<h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Direct State Board Question Banks & Practice
            </h3>`,
    `<h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white" data-i18n="sb_heading">
              Direct State Board Question Banks & Practice
            </h3>`
  ],
  [
    `<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Click on your education board to start Subject-wise Practice with instant solutions, formula sheets, and verified chapter MCQs.
            </p>`,
    `<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5" data-i18n="sb_subheading">
              Click on your education board to start Subject-wise Practice with instant solutions, formula sheets, and verified chapter MCQs.
            </p>`
  ],
  [
    `<a href="#tool/quiz" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 transition shrink-0">
            Open Test Console →
          </a>`,
    `<a href="#tool/quiz" class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-black text-slate-700 dark:text-slate-200 transition shrink-0" data-i18n="sb_console_btn">
            Open Test Console →
          </a>`
  ],
  // Board Buttons
  [
    `Practice UP Board →`,
    `<span data-i18n="sb_btn_upmsp">Practice UP Board →</span>`
  ],
  [
    `Practice Bihar Board →`,
    `<span data-i18n="sb_btn_bseb">Practice Bihar Board →</span>`
  ],
  [
    `Practice CBSE Board →`,
    `<span data-i18n="sb_btn_cbse">Practice CBSE Board →</span>`
  ],
  [
    `Practice CISCE/ICSE →`,
    `<span data-i18n="sb_btn_icse">Practice CISCE/ICSE →</span>`
  ],
  [
    `Practice RBSE →`,
    `<span data-i18n="sb_btn_rbse">Practice RBSE →</span>`
  ],
  [
    `Practice MP Board →`,
    `<span data-i18n="sb_btn_mpbse">Practice MP Board →</span>`
  ],
  [
    `Practice Maharashtra →`,
    `<span data-i18n="sb_btn_msbshse">Practice Maharashtra →</span>`
  ],
  [
    `Practice GSEB →`,
    `<span data-i18n="sb_btn_gseb">Practice GSEB →</span>`
  ],
  [
    `Practice West Bengal →`,
    `<span data-i18n="sb_btn_wb">Practice West Bengal →</span>`
  ],
  [
    `Practice Tamil Nadu →`,
    `<span data-i18n="sb_btn_tn">Practice Tamil Nadu →</span>`
  ],
  [
    `Practice Karnataka →`,
    `<span data-i18n="sb_btn_karnataka">Practice Karnataka →</span>`
  ],
  [
    `Practice Punjab Board →`,
    `<span data-i18n="sb_btn_pseb">Practice Punjab Board →</span>`
  ],
  [
    `Practice Haryana Board →`,
    `<span data-i18n="sb_btn_bseh">Practice Haryana Board →</span>`
  ],
  [
    `Practice JAC Jharkhand →`,
    `<span data-i18n="sb_btn_jac">Practice JAC Jharkhand →</span>`
  ],
  [
    `Practice CG Board →`,
    `<span data-i18n="sb_btn_cgbse">Practice CG Board →</span>`
  ],
  [
    `Practice Odisha Board →`,
    `<span data-i18n="sb_btn_odisha">Practice Odisha Board →</span>`
  ],
  [
    `Practice Uttarakhand →`,
    `<span data-i18n="sb_btn_ubse">Practice Uttarakhand →</span>`
  ],
  [
    `Practice Assam Board →`,
    `<span data-i18n="sb_btn_assam">Practice Assam Board →</span>`
  ],
  [
    `Practice Telangana/AP →`,
    `<span data-i18n="sb_btn_telangana">Practice Telangana/AP →</span>`
  ],
  [
    `Practice NIOS →`,
    `<span data-i18n="sb_btn_nios">Practice NIOS →</span>`
  ]
];

let matchCount = 0;
for (const [target, replacement] of replacements) {
  if (html.includes(target)) {
    html = html.replace(target, replacement);
    matchCount++;
  } else {
    console.warn('Could not find target:', target.slice(0, 50));
  }
}

console.log(`Applied ${matchCount}/${replacements.length} replacements`);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with data-i18n attributes!');

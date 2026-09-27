const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/js/interactive-features.js', 'utf8');

let passed = 0;
let total = 0;

function check(title, cond) {
  total++;
  if (cond) {
    console.log(`[PASS] ${title}`);
    passed++;
  } else {
    console.error(`[FAIL] ${title}`);
  }
}

// 1. Tailwind darkMode: 'class'
check('Tailwind config includes darkMode: class', html.includes("darkMode: 'class'"));

// 2. No slate-850 invalid classes
const s850Html = (html.match(/slate-850/g) || []).length;
const s850Js = (js.match(/slate-850/g) || []).length;
check('Zero slate-850 instances in index.html and interactive-features.js', s850Html === 0 && s850Js === 0);

// 3. Answer Key Header
check('Answer key header has high-contrast vibrant amber styling', html.includes('text-amber-950 dark:text-amber-400'));
check('Answer key section removed via-white', !html.includes('from-amber-50 via-white to-blue-50'));

// 4. DAILY_POLL_QUESTIONS length
const qMatches = (js.match(/id:\s*'poll-q/g) || []).length;
check(`Question bank has 24 questions (found: ${qMatches})`, qMatches === 24);

// 5. Anti-washout styling for secondary bilingual question
check('Secondary translation uses high-contrast text-blue-950 dark:text-cyan-200', js.includes('text-blue-950 dark:text-cyan-200'));
check('Secondary translation uses bg-blue-50/95 dark:bg-slate-950', js.includes('bg-blue-50/95 dark:bg-slate-950'));

// 6. Navigation and rotation
check('nextDailyPoll function present', js.includes('function nextDailyPoll()'));
check('prevDailyPoll function present', js.includes('function prevDailyPoll()'));
check('getHourlyPollIndex function present', js.includes('function getHourlyPollIndex()'));
check('Hourly rotation notice present in UI', js.includes('rotates hourly') || js.includes('स्वतः बदलता है'));

console.log(`\nResults: ${passed}/${total} checks passed.`);
process.exit(passed === total ? 0 : 1);

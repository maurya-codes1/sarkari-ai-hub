const fs = require('fs');
const path = require('path');

console.log('=== Step 1: Patching 31 Boards & Directory UI ===');

// 1. Patch public/index.html
const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Find the 31 boards cards in index.html
// The 6th board is MP Board, ending at line ~770:
// <!-- MP Board -->
// ...
// <button type="button" onclick="launchBoardPractice('board-12th-science', 'mpbse', 'physics')" ...>
//   <span data-i18n="sb_btn_mpbse">Practice MPBSE →</span>
// </button>
// </div>

const mpbseEndMarker = `<!-- MP Board -->`;
const mpbseCardEnd = `</button>\n          </div>`;

const mpbseIdx = indexHtml.indexOf(mpbseEndMarker);
if (mpbseIdx !== -1) {
  // Find the closing </div> of MP board card
  const closingDivIdx = indexHtml.indexOf('</div>', indexHtml.indexOf('Practice MPBSE', mpbseIdx));
  if (closingDivIdx !== -1) {
    const afterMpbse = closingDivIdx + '</div>'.length;
    
    // Find the end of the 31 cards grid: right before '<div class="text-center pt-2">'
    const gridEndMarker = '<div class="text-center pt-2">';
    const gridEndIdx = indexHtml.indexOf(gridEndMarker, afterMpbse);
    
    if (gridEndIdx !== -1) {
      // Find the closing </div> of the main grid right before gridEndMarker
      const lastGridDivIdx = indexHtml.lastIndexOf('</div>', gridEndIdx);
      
      const first6Boards = indexHtml.substring(indexHtml.indexOf('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">'), afterMpbse);
      const remaining25Boards = indexHtml.substring(afterMpbse, lastGridDivIdx).trim();

      const newBoardSectionHtml = `${first6Boards}
        </div>

        <!-- Collapsible Container for Remaining 25 State & National Boards -->
        <div id="moreBoardsGrid" class="hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 mt-3.5 transition-all duration-300">
          ${remaining25Boards}
        </div>

        <!-- Interactive Boards Control Bar (Mobile-Optimized) -->
        <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button id="toggleAllBoardsBtn" type="button" onclick="toggleAllBoards()" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer">
            <span id="toggleBoardsText">📚 View All 31 State & Central Education Boards (सभी 31 बोर्ड्स देखें)</span>
            <span id="toggleBoardsIcon" class="text-base font-black transition-transform">↓</span>
          </button>
          <a href="#directory" onclick="switchDirectoryCategory('boards')" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 text-slate-900 dark:text-white font-black text-xs sm:text-sm shadow-xs transition flex items-center justify-center space-x-2">
            <span>📂 Open Full Directory & Result Links</span>
            <span>➔</span>
          </a>
        </div>
`;

      const gridStartIdx = indexHtml.indexOf('<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">');
      indexHtml = indexHtml.substring(0, gridStartIdx) + newBoardSectionHtml + indexHtml.substring(gridEndIdx);
      console.log('Successfully wrapped boards into 6 preview + 25 collapsible cards!');
    }
  }
}

// Update the "See All 20 State Boards" in index.html column 1 footer
indexHtml = indexHtml.replace(
  'See All 20 State Boards (TN, Karnataka, WB, MH, RJ, MP) →',
  'See All 31 State & Central Education Boards (CBSE, UP, Bihar, MH, RJ, MP, South & NE) →'
);
indexHtml = indexHtml.replace(
  'See All 20 State Boards (TN, Karnataka, WB, MH, RJ, MP) —',
  'See All 31 State & Central Education Boards (CBSE, UP, Bihar, MH, RJ, MP, South & NE) →'
);

// Update tab-directory in index.html
indexHtml = indexHtml.replace('60+ National & State Boards', '31 Education Boards + 32+ Competitive Exams (63+ Total)');
indexHtml = indexHtml.replace('instant photo presets for 60+ exams.', 'instant photo presets for 31 state/central boards and 32+ competitive recruitment exams.');
indexHtml = indexHtml.replace('>🎓 10th & 12th Boards<', '>🎓 31 State & National Boards<');
indexHtml = indexHtml.replace('>🏛️ Central & Defence<', '>🏛️ Central & Defence (14)<');
indexHtml = indexHtml.replace('>👮 Police Bharti<', '>👮 Police Bharti (8)<');
indexHtml = indexHtml.replace('>🔬 NEET / JEE / CUET<', '>🔬 NEET / JEE / CUET (5)<');
indexHtml = indexHtml.replace('>👨‍🏫 Teaching / TET<', '>👨‍🏫 Teaching / TET (5)<');

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('Updated public/index.html successfully!');

// 2. Add toggleAllBoards() to public/js/app.js
const appJsPath = path.join(__dirname, '..', 'public', 'js', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');
if (!appJs.includes('function toggleAllBoards()')) {
  const toggleCode = `
// Toggle collapsible 31 boards grid on homepage
function toggleAllBoards() {
  const container = document.getElementById('moreBoardsGrid');
  const btnText = document.getElementById('toggleBoardsText');
  const btnIcon = document.getElementById('toggleBoardsIcon');
  if (!container) return;
  const isHidden = container.classList.contains('hidden');
  if (isHidden) {
    container.classList.remove('hidden');
    if (btnText) btnText.textContent = '▲ Hide Extra Boards (कम बोर्ड्स दिखाएं)';
    if (btnIcon) btnIcon.textContent = '↑';
  } else {
    container.classList.add('hidden');
    if (btnText) btnText.textContent = '📚 View All 31 State & Central Education Boards (सभी 31 बोर्ड्स देखें)';
    if (btnIcon) btnIcon.textContent = '↓';
    const section = document.getElementById('board-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
window.toggleAllBoards = toggleAllBoards;
`;
  appJs += '\n' + toggleCode;
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Added toggleAllBoards to public/js/app.js');
}

// 3. Update col_boards_footer in public/js/i18n.js across all 25 locales
const i18nPath = path.join(__dirname, '..', 'public', 'js', 'i18n.js');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

// Replace any occurrence of 20 with 31 in col_boards_footer
i18nContent = i18nContent.replace(/"col_boards_footer":\s*"[^"]+"/g, (match) => {
  return match.replace(/20/g, '31');
});
fs.writeFileSync(i18nPath, i18nContent, 'utf8');
console.log('Updated col_boards_footer in public/js/i18n.js across all locales!');

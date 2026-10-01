const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const boardReplacements = [
  [`Practice MPBSE →`, `<span data-i18n="sb_btn_mpbse">Practice MPBSE →</span>`],
  [`Practice MSBSHSE →`, `<span data-i18n="sb_btn_msbshse">Practice MSBSHSE →</span>`],
  [`Practice WB Board →`, `<span data-i18n="sb_btn_wb">Practice WB Board →</span>`],
  [`Practice TNDGE →`, `<span data-i18n="sb_btn_tn">Practice TNDGE →</span>`],
  [`Practice KSEAB →`, `<span data-i18n="sb_btn_karnataka">Practice KSEAB →</span>`],
  [`Practice PSEB →`, `<span data-i18n="sb_btn_pseb">Practice PSEB →</span>`],
  [`Practice BSEH →`, `<span data-i18n="sb_btn_bseh">Practice BSEH →</span>`],
  [`Practice JAC →`, `<span data-i18n="sb_btn_jac">Practice JAC →</span>`],
  [`Practice CGBSE →`, `<span data-i18n="sb_btn_cgbse">Practice CGBSE →</span>`],
  [`Practice UBSE →`, `<span data-i18n="sb_btn_ubse">Practice UBSE →</span>`],
  [`Practice SEBA / AHSEC →`, `<span data-i18n="sb_btn_assam">Practice SEBA / AHSEC →</span>`],
  [`Practice TS / AP Board →`, `<span data-i18n="sb_btn_telangana">Practice TS / AP Board →</span>`]
];

let applied = 0;
for (const [target, replacement] of boardReplacements) {
  if (html.includes(target)) {
    html = html.replace(target, replacement);
    applied++;
  } else {
    console.warn('Target not found:', target);
  }
}

console.log(`Applied ${applied}/${boardReplacements.length} board button replacements`);
fs.writeFileSync(indexPath, html, 'utf8');

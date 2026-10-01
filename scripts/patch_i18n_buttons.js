const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'public', 'js', 'i18n.js');
let content = fs.readFileSync(i18nPath, 'utf8');

const engSnippet = `    "sb_btn_nios": "Practice NIOS →",
    "sb_btn_hpbose": "Practice HPBOSE →",
    "sb_btn_jkbose": "Practice JKBOSE →",
    "sb_btn_kerala": "Practice Kerala DHSE →",
    "sb_btn_gbshse": "Practice Goa Board →",
    "sb_btn_bsem": "Practice Manipur BSEM →",
    "sb_btn_mbose": "Practice Meghalaya MBOSE →",
    "sb_btn_mbse": "Practice Mizoram MBSE →",
    "sb_btn_nbse": "Practice Nagaland NBSE →",
    "sb_btn_tbse": "Practice Tripura TBSE →",
    "sb_btn_bseap": "Practice Andhra BSEAP →",
    "sb_btn_bsetg": "Practice Telangana BSETG →",`;

// Replace all remaining occurrences of lone "sb_btn_nios": "Practice NIOS →",
content = content.replaceAll('    "sb_btn_nios": "Practice NIOS →",\n    "sb_additional_boards"', engSnippet + '\n    "sb_additional_boards"');

fs.writeFileSync(i18nPath, content, 'utf8');
console.log('✅ Patched remaining lone occurrences in i18n.js');

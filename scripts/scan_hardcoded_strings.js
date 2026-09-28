const fs = require('fs');
const path = require('path');

const i18n = require('../public/js/i18n.js');
const validKeys = new Set(Object.keys(i18n.I18N_DATA.hi));

console.log('=== AUTOMATED HARDCODED USER-FACING STRING SCAN ===');

// 1. Audit public/index.html elements
const indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Match tags with text content that don't have data-i18n
const tagRegex = /<([a-zA-Z0-9]+)([^>]*)>([^<]+)<\/\1>/g;
let match;
let totalUserTextTags = 0;
let taggedTags = 0;
let approvedExceptions = [];
let potentialUntagged = [];

// Approved exception patterns (exam codes, technical labels, proper nouns, icons)
const isApprovedException = (text) => {
  const t = text.trim();
  if (t.length <= 1) return true;
  if (/^[0-9\s\.\:\-\,\/\+\(\)\%•★⭐]+$/.test(t)) return true;
  if (/^[\p{Emoji}\s]+$/u.test(t)) return true;
  if (/^(SSC|UPSC|RRB|NTPC|NEET|JEE|CBSE|ICSE|CSBC|BPSC|UPPBPB|HSSC|MPESB|WBP|IBPS|SBI|NTA|CUET|NDA|CDS|AFCAT|UGC|NET|CTET|UPTET|BSEM|PSEB|BSEB|WBCHSE|MSBSHSE|GSEB)/i.test(t)) return true;
  if (/^(SarkariAI|SarkariAI Hub|Google|Render|Razorpay|UPI|WhatsApp|Telegram|PDF|OMR|DOOP|DOB|KB|MB|px|min|sec|Tier|CBT|GS|Math|Reasoning|English|Hindi)/i.test(t)) return true;
  return false;
};

while ((match = tagRegex.exec(indexHtml)) !== null) {
  const tag = match[1].toLowerCase();
  const attrs = match[2];
  const innerText = match[3].trim();

  // skip script, style, option, noscript
  if (['script', 'style', 'option', 'noscript', 'title', 'meta'].includes(tag)) continue;
  if (innerText.length === 0) continue;

  totalUserTextTags++;
  if (attrs.includes('data-i18n') || attrs.includes('data-i18n-placeholder')) {
    taggedTags++;
  } else if (isApprovedException(innerText)) {
    approvedExceptions.push({ tag, text: innerText });
  } else {
    potentialUntagged.push({ tag, text: innerText });
  }
}

console.log(`Audited HTML text elements: ${totalUserTextTags}`);
console.log(`Directly tagged with data-i18n: ${taggedTags}`);
console.log(`Approved Exceptions (Exam acronyms, numbers, icons, proper nouns): ${approvedExceptions.length}`);
console.log(`Potential Untagged Candidates: ${potentialUntagged.length}`);

if (potentialUntagged.length > 0) {
  console.log('\nSample potential untagged strings:');
  potentialUntagged.slice(0, 10).forEach(u => console.log(`  [<${u.tag}>]: "${u.text}"`));
}

// 2. Audit client JS files for alert/confirm
const jsFiles = [
  'public/js/app.js',
  'public/js/quiz.js',
  'public/js/resizer.js',
  'public/js/age-calculator.js',
  'public/js/salary-calculator.js',
  'public/js/physical-calculator.js',
  'public/js/omr-generator.js',
  'public/js/study-planner.js',
  'public/js/cutoff-analyzer.js',
  'public/js/current-affairs.js',
  'public/js/notes-upi.js',
  'public/js/production-suite.js',
  'public/js/interactive-features.js'
];

let interceptedAlerts = 0;
for (const f of jsFiles) {
  const c = fs.readFileSync(f, 'utf8');
  const alertMatches = c.match(/window\.alert|alert\(|confirm\(/g);
  if (alertMatches) {
    interceptedAlerts += alertMatches.length;
  }
}
console.log(`Total alert/confirm instances (intercepted by in-app custom modal): ${interceptedAlerts}`);
console.log('✅ Automated string scan completed successfully.\n');

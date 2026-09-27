const fs = require('fs');

let content = fs.readFileSync('public/js/i18n.js', 'utf8');

// Replace all "back_btn": "← ..." with "back_btn": "..."
const beforeCount = (content.match(/"back_btn":\s*"←\s*/g) || []).length;
console.log('Found occurrences with arrow prefix:', beforeCount);

content = content.replace(/"back_btn":\s*"←\s*([^"]+)"/g, '"back_btn": "$1"');

fs.writeFileSync('public/js/i18n.js', content);
console.log('Successfully stripped arrow prefix from back_btn in public/js/i18n.js');

const fs = require('fs');
const content = fs.readFileSync('public/js/i18n.js', 'utf8');
const match1 = content.match(/"back_btn":\s*"[^"]+"/g);
console.log('back_btn:', match1);
const match2 = content.match(/"exam_back_btn":\s*"[^"]+"/g);
console.log('exam_back_btn:', match2);

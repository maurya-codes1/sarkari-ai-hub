const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, '../public/js/i18n.js');
let c = fs.readFileSync(f, 'utf8');
fs.writeFileSync('scripts/patch_i18n.js', 'console.log(i18n);');
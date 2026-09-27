const fs = require('fs');
const content = fs.readFileSync('public/js/exams-data.js', 'utf8');

const checkIds = ['ssc-gd', 'ssc-cgl', 'ssc-chsl', 'rrb-ntpc', 'rrb-alp', 'rrb-group-d', 'upsc-cse', 'up-police-constable', 'up-police-si'];
checkIds.forEach(id => {
  const reg = new RegExp('id:\\s*"' + id + '"[\\s\\S]*?\\n  \\}');
  const match = content.match(reg);
  if (match) {
    const urls = match[0].split('\n').filter(l => l.includes('Url:'));
    console.log(id + ':\n  ' + urls.join('\n  '));
  }
});

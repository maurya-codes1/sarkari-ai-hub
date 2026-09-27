const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('scratch/url_audit_results.json', 'utf8'));
const failedList = audit.failed;

const examsContent = fs.readFileSync('public/js/exams-data.js', 'utf8');
const lines = examsContent.split('\n');

const brokenInExams = [];

failedList.forEach(f => {
  lines.forEach((line, idx) => {
    if (line.includes(f.url)) {
      brokenInExams.push({
        lineNum: idx + 1,
        status: f.status,
        url: f.url,
        lineText: line.trim()
      });
    }
  });
});

console.log(`Found ${brokenInExams.length} occurrences of problematic URLs in exams-data.js:\n`);
brokenInExams.sort((a, b) => a.lineNum - b.lineNum);
brokenInExams.forEach(b => {
  console.log(`L${b.lineNum} [${b.status}]: ${b.lineText}`);
});

fs.writeFileSync('scratch/broken_in_exams.json', JSON.stringify(brokenInExams, null, 2), 'utf8');

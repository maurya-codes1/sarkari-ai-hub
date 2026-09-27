const fs = require('fs');

const content = fs.readFileSync('public/js/exams-data.js', 'utf8');

// Match all url properties: officialUrl, applyUrl, pdfUrl, resultUrl, etc.
const urlRegex = /(officialUrl|applyUrl|pdfUrl|resultUrl|resultServer2|digilockerUrl)\s*:\s*["']([^"']+)["']/g;
let match;
const urls = [];
while ((match = urlRegex.exec(content)) !== null) {
  urls.push({ field: match[1], url: match[2] });
}

console.log('Total URLs found in exams-data.js:', urls.length);
const uniqueUrls = [...new Set(urls.map(u => u.url))];
console.log('Unique URLs found:', uniqueUrls.length);

// Check for any dummy or invalid patterns
const dummyPatterns = ['example.com', 'localhost', 'test.com', 'placeholder', '#', 'undefined', 'null', 'todo'];
const suspicious = uniqueUrls.filter(u => dummyPatterns.some(d => u.toLowerCase().includes(d)));
console.log('Suspicious/dummy URLs:', suspicious);

// Check URLs in public/index.html
const indexHtml = fs.readFileSync('public/index.html', 'utf8');
const hrefRegex = /href\s*=\s*["'](https?:\/\/[^"']+)["']/g;
const htmlUrls = [];
while ((match = hrefRegex.exec(indexHtml)) !== null) {
  htmlUrls.push(match[1]);
}
console.log('\nTotal external URLs in index.html:', htmlUrls.length);
const uniqueHtmlUrls = [...new Set(htmlUrls)];
console.log('Unique external URLs in index.html:', uniqueHtmlUrls.length);
const suspiciousHtml = uniqueHtmlUrls.filter(u => dummyPatterns.some(d => u.toLowerCase().includes(d)));
console.log('Suspicious/dummy URLs in index.html:', suspiciousHtml);

// Output all unique URLs to a JSON file for testing
fs.writeFileSync('scratch/all_urls.json', JSON.stringify({
  examsUrls: uniqueUrls,
  htmlUrls: uniqueHtmlUrls
}, null, 2), 'utf8');
console.log('\nSaved all URLs to scratch/all_urls.json');

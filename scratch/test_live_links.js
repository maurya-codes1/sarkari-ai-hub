const http = require('http');

const urls = [
  'http://localhost:5000/',
  'http://10.143.16.237:5000/',
  'http://10.143.16.237:5000/documentation.html',
  'http://10.143.16.237:5000/robots.txt',
  'http://10.143.16.237:5000/sitemap.xml',
  'http://10.143.16.237:5000/manifest.json'
];

async function testUrl(target) {
  return new Promise((resolve) => {
    http.get(target, (res) => {
      let len = 0;
      res.on('data', chunk => len += chunk.length);
      res.on('end', () => resolve({ url: target, status: res.statusCode, bytes: len }));
    }).on('error', err => resolve({ url: target, error: err.message }));
  });
}

(async () => {
  console.log('Testing Live Network & Local Links:');
  for (const u of urls) {
    const r = await testUrl(u);
    if (r.status === 200) {
      console.log(`✅ [HTTP 200 OK] ${r.url} (${r.bytes} bytes)`);
    } else {
      console.error(`❌ [FAILED] ${r.url}`, r);
    }
  }
})();

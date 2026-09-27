const http = require('http');

const endpoints = [
  '/',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/sw.js',
  '/js/production-suite.js',
  '/js/i18n.js',
  '/js/router.js'
];

async function checkEndpoint(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          bytes: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

(async () => {
  console.log('Testing Endpoints on http://localhost:5000...');
  for (const ep of endpoints) {
    const result = await checkEndpoint(ep);
    if (result.statusCode === 200) {
      console.log(`✅ [200 OK] ${result.path} (${result.bytes} bytes, ${result.contentType})`);
    } else {
      console.error(`❌ [FAIL] ${result.path}`, result);
    }
  }
})();

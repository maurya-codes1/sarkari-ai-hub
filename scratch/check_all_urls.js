const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const data = JSON.parse(fs.readFileSync('scratch/all_urls.json', 'utf8'));
const allUrls = [...new Set([...data.examsUrls, ...data.htmlUrls])];

console.log(`Testing ${allUrls.length} unique URLs across the entire portal...\n`);

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const isHttps = parsed.protocol === 'https:';
      const client = isHttps ? https : http;

      const req = client.request(
        parsed,
        {
          method: 'GET',
          timeout: 7000,
          rejectUnauthorized: false,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        },
        (res) => {
          resolve({
            url: targetUrl,
            status: res.statusCode,
            location: res.headers.location || null,
            ok: res.statusCode >= 200 && res.statusCode < 400
          });
          res.resume(); // discard body
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({ url: targetUrl, status: 'TIMEOUT', ok: false });
      });

      req.on('error', (err) => {
        resolve({ url: targetUrl, status: err.code || err.message, ok: false });
      });

      req.end();
    } catch (err) {
      resolve({ url: targetUrl, status: 'PARSE_ERROR', ok: false });
    }
  });
}

async function runAudit() {
  const results = [];
  const batchSize = 10;

  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(u => checkUrl(u)));
    results.push(...batchResults);
    process.stdout.write(`Checked ${results.length}/${allUrls.length} URLs...\r`);
  }

  console.log(`\n\n=== URL AUDIT COMPLETE ===`);
  const working = results.filter(r => r.ok);
  const failed = results.filter(r => !r.ok);

  console.log(`Total URLs: ${results.length}`);
  console.log(`✅ Working (2xx / 3xx): ${working.length}`);
  console.log(`❌ Failed or Problematic: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n--- LIST OF FAILED / PROBLEMATIC URLs ---');
    failed.forEach(f => {
      console.log(`[Status: ${f.status}] ${f.url}`);
    });
  }

  fs.writeFileSync('scratch/url_audit_results.json', JSON.stringify({ working, failed }, null, 2), 'utf8');
  console.log('\nDetailed results written to scratch/url_audit_results.json');
}

runAudit();

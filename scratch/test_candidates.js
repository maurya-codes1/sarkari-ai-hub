const https = require('https');
const http = require('http');
const { URL } = require('url');

const testCandidates = [
  // CBSE
  'https://cbseresults.nic.in',
  'https://www.cbse.gov.in/cbsenew/cbse.html',
  'https://parikshasangam.cbse.gov.in',

  // UPMSP
  'https://upmsp.edu.in',
  'https://upresults.nic.in',

  // BSEB (Bihar)
  'http://biharboardonline.bihar.gov.in',
  'https://biharboardonline.com',
  'http://secondary.biharboardonline.com',

  // Maharashtra
  'https://mahahsscboard.in',
  'http://mahresult.nic.in',

  // Rajasthan
  'https://rajeduboard.rajasthan.gov.in',

  // MP Board
  'https://mpbse.nic.in',
  'https://esb.mp.gov.in',

  // NIOS
  'https://www.nios.ac.in',
  'https://sdmis.nios.ac.in',

  // West Bengal
  'https://wbbse.wb.gov.in',
  'https://wbchse.wb.gov.in',

  // Uttarakhand
  'https://ubse.uk.gov.in',

  // Assam SEBA
  'https://sebaonline.org',
  'https://site.sebaonline.org',

  // Telangana
  'https://bse.telangana.gov.in',
  'https://tsbie.cgg.gov.in',

  // Navy
  'https://www.joinindiannavy.gov.in',

  // HSSC
  'https://www.hssc.gov.in',

  // NEET
  'https://neet.nta.nic.in',
  'https://exams.nta.ac.in',

  // JEE Main
  'https://jeemain.nta.nic.in',
  'https://jeemain.nta.ac.in',

  // CUET
  'https://cuetug.nta.nic.in',
  'https://exams.nta.ac.in',

  // UGC NET
  'https://ugcnet.nta.nic.in',
  'https://ugcnet.nta.ac.in',

  // RRB
  'https://www.rrbapply.gov.in'
];

function check(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(parsed, {
        method: 'GET',
        timeout: 6000,
        rejectUnauthorized: false,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' }
      }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
        res.resume();
      });
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', ok: false }); });
      req.on('error', (e) => { resolve({ url, status: e.code || e.message, ok: false }); });
      req.end();
    } catch (e) {
      resolve({ url, status: 'ERR', ok: false });
    }
  });
}

async function testAll() {
  console.log('Testing candidates...\n');
  for (const u of testCandidates) {
    const res = await check(u);
    console.log(`${res.ok ? '✅' : '❌'} [${res.status}] ${res.url}`);
  }
}

testAll();

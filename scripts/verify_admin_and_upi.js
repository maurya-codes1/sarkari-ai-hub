const http = require('http');
const app = require('../server');

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Test server running at ${baseUrl}`);

  try {
    // 1. Test /api/pay/config
    let res = await fetch(`${baseUrl}/api/pay/config`);
    let cfg = await res.json();
    console.log('1. /api/pay/config:', cfg);
    if (!cfg.upiId) throw new Error('Failed to get upiId');

    // 2. Test /api/admin/login
    res = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: 'sarkariai2026' })
    });
    let loginData = await res.json();
    console.log('2. /api/admin/login:', loginData);
    if (!loginData.ok || !loginData.token) throw new Error('Admin login failed');

    // 3. Test /api/admin/settings (GET)
    res = await fetch(`${baseUrl}/api/admin/settings`, {
      headers: { 'Authorization': loginData.token }
    });
    let settingsData = await res.json();
    console.log('3. /api/admin/settings (GET):', { upiId: settingsData.upiId, stats: settingsData.stats });

    // 4. Test /api/admin/settings (POST) - Update UPI ID dynamically
    res = await fetch(`${baseUrl}/api/admin/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': loginData.token
      },
      body: JSON.stringify({
        upiId: 'sarkariai@upi',
        payeeName: 'SarkariAI Hub Official',
        defaultPrice: 9
      })
    });
    let saveResult = await res.json();
    console.log('4. /api/admin/settings (POST):', saveResult);

    // 5. Test /api/pay/generate-upi
    res = await fetch(`${baseUrl}/api/pay/generate-upi?noteId=ssc-gd-500&noteName=TestNote`);
    let upiPayload = await res.json();
    console.log('5. /api/pay/generate-upi:', upiPayload);
    if (!upiPayload.upiIntent.includes('sarkariai%40upi')) throw new Error('UPI intent mismatch');

    console.log('✅ ALL ADMIN & DYNAMIC UPI INTEGRATION TESTS PASSED!');
  } catch (err) {
    console.error('❌ Verification error:', err);
    process.exit(1);
  } finally {
    server.close();
    process.exit(0);
  }
});

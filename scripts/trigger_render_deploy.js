// scripts/trigger_render_deploy.js
// Triggers automatic deployment on Render using the verified private Deploy Hook

const https = require('https');
const fs = require('fs');
const path = require('path');

function getHookUrl() {
  if (process.env.RENDER_DEPLOY_HOOK_URL) {
    return process.env.RENDER_DEPLOY_HOOK_URL.trim();
  }
  const hookFile = path.join(__dirname, '..', '.deploy_hook');
  if (fs.existsSync(hookFile)) {
    return fs.readFileSync(hookFile, 'utf8').trim();
  }
  return null;
}

function triggerDeploy() {
  const url = getHookUrl();
  if (!url) {
    console.warn('[Render Deploy] ⚠️ No deploy hook URL found. Skipping trigger.');
    return;
  }

  console.log('[Render Deploy] 🚀 Sending instant trigger to Render...');
  
  const req = https.request(url, { method: 'POST' }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log(`[Render Deploy] Status: ${res.statusCode} ${res.statusMessage}`);
      console.log(`[Render Deploy] Response: ${data}`);
      console.log('[Render Deploy] ✅ Render has started deploying the latest code automatically!');
    });
  });

  req.on('error', (err) => {
    console.error('[Render Deploy] ❌ Error triggering deploy:', err.message);
  });

  req.end();
}

if (require.main === module) {
  triggerDeploy();
}

module.exports = { triggerDeploy };

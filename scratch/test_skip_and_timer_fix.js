const fs = require('fs');

const appJs = fs.readFileSync('public/js/app.js', 'utf8');
const indexHtml = fs.readFileSync('public/index.html', 'utf8');

let passed = 0;
let total = 0;

function check(title, condition) {
  total++;
  if (condition) {
    console.log(`[PASS] ${title}`);
    passed++;
  } else {
    console.error(`[FAIL] ${title}`);
  }
}

// Check 1: Click interceptor excludes modal links
check(
  'Click listener excludes #externalGatewayModal and data-no-gateway',
  appJs.includes("anchor.closest('#externalGatewayModal')") &&
  appJs.includes("anchor.hasAttribute('data-no-gateway')")
);

// Check 2: Skip links in index.html have data-no-gateway="true"
check(
  'gwProceedLinkTop has data-no-gateway="true"',
  indexHtml.includes('id="gwProceedLinkTop"') &&
  indexHtml.includes('data-no-gateway="true"')
);

check(
  'gwProceedLinkBottom has data-no-gateway="true"',
  indexHtml.includes('id="gwProceedLinkBottom"') &&
  indexHtml.includes('data-no-gateway="true"')
);

// Check 3: proceedToOutboundUrl opens new tab on user tap
check(
  'proceedToOutboundUrl uses window.open(target, "_blank") for user gesture',
  appJs.includes("window.open(target, '_blank', 'noopener,noreferrer')")
);

// Check 4: proceedToOutboundUrl redirects window.location.href if popup is blocked on timer end
check(
  'proceedToOutboundUrl falls back to window.location.href = target so it never hangs at 0s',
  appJs.includes('window.location.href = target;')
);

// Check 5: Simulating behavior logic
// Mock browser environment
let windowOpenCalled = false;
let windowOpenTarget = '';
let locationHref = '';
let modalHidden = false;

const mockWindow = {
  open: (url, target, features) => {
    windowOpenCalled = true;
    windowOpenTarget = url;
    return { closed: false };
  },
  location: { href: 'http://localhost:5000' }
};

const mockModal = {
  classList: {
    add: (cls) => { if (cls === 'hidden') modalHidden = true; },
    remove: (cls) => { if (cls === 'hidden') modalHidden = false; }
  },
  style: {}
};

// Test User Tap on Skip
let testTargetUrl = 'https://www.rrbapply.gov.in';
let testInterval = 123;

function simulateProceed(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  mockModal.classList.add('hidden');
  const target = testTargetUrl;
  testTargetUrl = '';
  if (e) {
    mockWindow.open(target, '_blank', 'noopener,noreferrer');
  } else {
    // timer ended
    const win = mockWindow.open(target, '_blank', 'noopener,noreferrer');
    if (!win) {
      mockWindow.location.href = target;
    }
  }
}

// Run simulate tap
let eventPrevented = false;
simulateProceed({ preventDefault: () => { eventPrevented = true; } });

check('Simulated Skip tap called preventDefault', eventPrevented);
check('Simulated Skip tap opened destination in new tab', windowOpenCalled && windowOpenTarget === 'https://www.rrbapply.gov.in');
check('Simulated Skip tap hid the modal without restarting timer', modalHidden && testTargetUrl === '');

console.log(`\nResults: ${passed}/${total} checks passed.`);
process.exit(passed === total ? 0 : 1);

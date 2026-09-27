// Simulation test for SPA Route Stack Engine

let sessionStorageData = {};
const mockSessionStorage = {
  getItem: (k) => sessionStorageData[k] || null,
  setItem: (k, v) => { sessionStorageData[k] = v; },
  removeItem: (k) => { delete sessionStorageData[k]; }
};

function normalizeRoute(hash) {
  if (!hash || hash === '#' || hash === '#home') return '#home';
  return hash.trim();
}

function getRouteStack() {
  try {
    const raw = mockSessionStorage.getItem('sarkari_route_stack');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  return ['#home'];
}

function setRouteStack(stack) {
  try {
    mockSessionStorage.setItem('sarkari_route_stack', JSON.stringify(stack));
  } catch(e) {}
}

let isInternalBackNavigation = false;
let currentHash = '#home';

function navigateTo(hash) {
  currentHash = normalizeRoute(hash);
  let stack = getRouteStack();

  if (isInternalBackNavigation) {
    isInternalBackNavigation = false;
    // Do NOT push on back navigation!
  } else {
    // Check if user went backward using browser back button
    const existingIdx = stack.lastIndexOf(currentHash);
    if (existingIdx !== -1 && existingIdx < stack.length - 1) {
      // Browser back: trim stack to existingIdx
      stack = stack.slice(0, existingIdx + 1);
    } else {
      // Forward: push if not already top
      if (stack[stack.length - 1] !== currentHash) {
        stack.push(currentHash);
      }
    }
    setRouteStack(stack);
  }
}

function goBackStep() {
  let stack = getRouteStack();
  const current = normalizeRoute(currentHash);

  if (current === '#home') {
    console.log('Already on #home, nowhere further back to go.');
    return;
  }

  // Pop current route
  while (stack.length > 0 && normalizeRoute(stack[stack.length - 1]) === current) {
    stack.pop();
  }

  let targetRoute = '#home';
  if (stack.length > 0) {
    targetRoute = stack.pop(); // Pop target from stack so it becomes the new active page
  } else {
    if (current.startsWith('#exam/')) {
      targetRoute = '#directory';
    } else {
      targetRoute = '#home';
    }
  }

  targetRoute = normalizeRoute(targetRoute);
  if (targetRoute === current) {
    targetRoute = '#home';
  }

  stack.push(targetRoute);
  setRouteStack(stack);

  isInternalBackNavigation = true;
  navigateTo(targetRoute);
}

// TEST 1: The User's Exact Problem
console.log('=== TEST 1: User Scenario (Home -> Directory -> SSC GD -> Back -> Back) ===');
sessionStorageData = {};
navigateTo('#home');
console.log('1. On Home. Stack:', getRouteStack());

navigateTo('#directory');
console.log('2. Navigated to Directory. Stack:', getRouteStack());

navigateTo('#exam/ssc-gd');
console.log('3. Navigated to SSC GD. Stack:', getRouteStack());

console.log('--- User Clicks Back (1st time) ---');
goBackStep();
console.log('Current Hash:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#directory') {
  console.log('[PASS] Went back to #directory!');
} else {
  console.error('[FAIL] Expected #directory, got:', currentHash);
}

console.log('--- User Clicks Back (2nd time) ---');
goBackStep();
console.log('Current Hash:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#home') {
  console.log('[PASS] Went back to #home! NO LOOP!');
} else {
  console.error('[FAIL] Expected #home, got:', currentHash);
}

console.log('--- User Clicks Back (3rd time on Home) ---');
goBackStep();
console.log('Current Hash:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#home') {
  console.log('[PASS] Safely stayed on #home! NO CRASH OR LOOP!');
}

// TEST 2: Trending card direct click from Home
console.log('\n=== TEST 2: Home -> Direct SSC GD -> Back ===');
sessionStorageData = {};
navigateTo('#home');
navigateTo('#exam/ssc-gd');
console.log('Stack:', getRouteStack());
goBackStep();
console.log('After back, Current Hash:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#home') {
  console.log('[PASS] Directly returned to #home!');
} else {
  console.error('[FAIL] Expected #home, got:', currentHash);
}

// TEST 3: Deep Subpage Link directly opened
console.log('\n=== TEST 3: Direct External Land on #exam/ssc-gd ===');
sessionStorageData = {};
// User opens URL with #exam/ssc-gd directly
navigateTo('#exam/ssc-gd');
console.log('Initial Stack on direct load:', getRouteStack());
goBackStep();
console.log('After 1st back:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#directory') {
  console.log('[PASS] Context-aware fallback to #directory!');
}
goBackStep();
console.log('After 2nd back:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#home') {
  console.log('[PASS] Unwound to #home! NO LOOP!');
}

// TEST 4: Browser Back Button Simulation
console.log('\n=== TEST 4: Browser Back Button Simulation ===');
sessionStorageData = {};
navigateTo('#home');
navigateTo('#directory');
navigateTo('#exam/ssc-gd');
console.log('User at #exam/ssc-gd. Stack:', getRouteStack());

// User clicks browser back button to #directory
console.log('User clicks BROWSER Back button...');
navigateTo('#directory');
console.log('Stack after browser back:', getRouteStack());

// User clicks on-screen Back button
console.log('User now clicks ON-SCREEN Back button...');
goBackStep();
console.log('Current Hash:', currentHash, '| Stack:', getRouteStack());
if (currentHash === '#home') {
  console.log('[PASS] In-app back button correctly took user to #home after browser back!');
} else {
  console.error('[FAIL] Expected #home, got:', currentHash);
}

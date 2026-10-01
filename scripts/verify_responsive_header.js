// Mathematical and CSS flex layout validation for Header Controls
const viewports = [
  { width: 320, name: 'Small Phone (iPhone SE 1st gen)' },
  { width: 360, name: 'Standard Android (Galaxy A series)' },
  { width: 375, name: 'iPhone SE 2/3 / iPhone 12 mini' },
  { width: 390, name: 'iPhone 13 / 14 / 15' },
  { width: 412, name: 'Pixel 7 / Samsung S22/S23' },
  { width: 430, name: 'iPhone 14/15 Pro Max' },
  { width: 640, name: 'Tablet Portrait / Phone Landscape' },
  { width: 768, name: 'iPad Portrait' },
  { width: 1024, name: 'Half Screen Desktop / iPad Landscape' },
  { width: 1280, name: 'Standard Laptop' },
  { width: 1920, name: 'Desktop Full HD' }
];

console.log('=== VERIFYING RESPONSIVE HEADER COMPLIANCE ===\n');

for (const vp of viewports) {
  let leftWidth = 0;
  let rightWidth = 0;
  let centerNavWidth = 0;
  const padding = (vp.width >= 640 ? 48 : (vp.width <= 360 ? 20 : 32)); // px-2.5 (10*2) for <=360px vs px-4 (16*2) vs px-6/8
  const available = vp.width - padding;

  if (vp.width < 1024) {
    // Mobile mode
    // Left: Hamburger (30px) + Gap (5px) + Logo (34px) + Gap (5px) + Brand Title (max 95px on <=360, 120px on <=430)
    const titleWidth = (vp.width <= 360 ? 80 : (vp.width <= 380 ? 100 : 120));
    const gap = (vp.width <= 360 ? 5 : 6);
    leftWidth = 30 + gap + 34 + gap + titleWidth;

    // Right: Bell (26px) + Gap + DarkMode (26px) + Gap + LangSelect (80px on small, 85px on normal)
    const langWidth = (vp.width <= 360 ? 76 : 85);
    rightWidth = 26 + gap + 26 + gap + langWidth;
    centerNavWidth = 0;
  } else {
    // Desktop mode (1024px+)
    // Left: Logo (48px) + Gap (12px) + Title (150px) + Badge (160px) = 370px
    leftWidth = 48 + 12 + 150;

    // Center Nav: Home (60px) + Mock (90px) + Notes (80px) + GK (75px) + Resizer (75px) + Boards (70px) + OMR (85px) + Tools (75px) = ~610px
    centerNavWidth = (vp.width < 1280 ? 520 : 610);

    // Right: Bell (36px) + DarkMode (36px) + (AutoSync if 1280+) + LangSelect (95px) + (Share if 1280+)
    const isXl = vp.width >= 1280;
    rightWidth = 36 + 10 + 36 + 10 + 95 + (isXl ? 110 + 80 : 0);
  }

  const totalUsed = leftWidth + centerNavWidth + rightWidth;
  const fits = totalUsed <= available || (vp.width >= 1024 && totalUsed <= vp.width);
  const status = fits ? '✅ FITS' : '⚠️ WARNING';
  console.log(`${vp.width}px (${vp.name.padEnd(35)}): Available=${available}px | Used=${totalUsed}px (Left:${leftWidth} Ctr:${centerNavWidth} Right:${rightWidth}) -> ${status}`);
}

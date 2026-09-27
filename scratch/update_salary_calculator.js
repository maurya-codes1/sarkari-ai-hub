const fs = require('fs');
const path = require('path');

const salaryFile = path.join(__dirname, '..', 'public', 'js', 'salary-calculator.js');

const code = `// public/js/salary-calculator.js
// 7th Pay Commission In-Hand Salary & Pay-Slip Calculator (2026 Edition)
// Comprehensive coverage: SSC GD, Army Agniveer, UP Police, Bihar Police, Delhi Police, RRB NTPC/ALP/Group D, SSC CGL/CHSL/MTS, Bank PO, UPSC IAS

const SALARY_POSTS_DATABASE = {
  "ssc-gd": {
    name: "SSC GD Constable (BSF, CISF, CRPF, ITBP, SSB, SSF)",
    payLevel: "Level 3 (7th CPC, 21,700 - 69,100)",
    basicPay: 21700,
    rationMoney: 3965,
    riskAllowance: 6000, // Border / High altitude avg
    department: "Ministry of Home Affairs (CAPFs)"
  },
  "agniveer-army": {
    name: "Indian Army Agniveer GD (General Duty)",
    payLevel: "Agnipath Scheme (Year 1: ₹30,000 Monthly Package)",
    basicPay: 30000,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Ministry of Defence (Indian Army)",
    isAgniveer: true
  },
  "up-police": {
    name: "UP Police Constable (Civil Police / PAC)",
    payLevel: "Level 3 (Grade Pay 2000, 21,700 - 69,100)",
    basicPay: 21700,
    rationMoney: 1500,
    riskAllowance: 0,
    department: "Uttar Pradesh Police (Home Dept)"
  },
  "up-police-si": {
    name: "UP Police Sub-Inspector (SI Civil)",
    payLevel: "Level 6 (Grade Pay 4200, 35,400 - 1,12,400)",
    basicPay: 35400,
    rationMoney: 2000,
    riskAllowance: 0,
    department: "Uttar Pradesh Police (Home Dept)"
  },
  "bihar-police": {
    name: "Bihar Police Constable (CSBC 21,391 Bharti)",
    payLevel: "Level 3 (Grade Pay 2000, 21,700 - 69,100)",
    basicPay: 21700,
    rationMoney: 1500,
    riskAllowance: 0,
    department: "Bihar Police (Home Department)"
  },
  "delhi-police": {
    name: "Delhi Police Executive Constable",
    payLevel: "Level 3 (7th CPC, Delhi X-City HRA)",
    basicPay: 21700,
    rationMoney: 3965,
    riskAllowance: 0,
    department: "Delhi Police (Ministry of Home Affairs)"
  },
  "rpf-constable": {
    name: "Railway RPF Constable & SI",
    payLevel: "Level 3 (Grade Pay 2000, 21,700 - 69,100)",
    basicPay: 21700,
    rationMoney: 3965,
    riskAllowance: 2000,
    department: "Ministry of Railways (RPF)"
  },
  "rrb-alp": {
    name: "Railway RRB Assistant Loco Pilot (ALP)",
    payLevel: "Level 2 (Grade Pay 1900, 19,900 - 63,200)",
    basicPay: 19900,
    runningAllowance: 7500, // Kilometer running allowance avg
    riskAllowance: 0,
    department: "Ministry of Railways (Loco Dept)"
  },
  "rrb-ntpc": {
    name: "Railway RRB NTPC Station Master (SM)",
    payLevel: "Level 6 (Grade Pay 4200, 35,400 - 1,12,400)",
    basicPay: 35400,
    runningAllowance: 4500,
    riskAllowance: 0,
    department: "Ministry of Railways (Traffic)"
  },
  "rrb-group-d": {
    name: "Railway RRB Group D (Track Maintainer, Pointsman)",
    payLevel: "Level 1 (Grade Pay 1800, 18,000 - 56,900)",
    basicPay: 18000,
    riskAllowance: 2700, // Track maintainer risk allowance
    rationMoney: 0,
    department: "Indian Railways (Engineering)"
  },
  "ssc-mts": {
    name: "SSC MTS & Havaldar (General Central Service)",
    payLevel: "Level 1 (Grade Pay 1800, 18,000 - 56,900)",
    basicPay: 18000,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Central Govt Ministries & CBIC/CBN"
  },
  "ssc-chsl-ldc": {
    name: "SSC CHSL Lower Division Clerk (LDC / JSA / DEO)",
    payLevel: "Level 2 (Grade Pay 1900, 19,900 - 63,200)",
    basicPay: 19900,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Central Secretariat / Ministries"
  },
  "ssc-cgl-si": {
    name: "SSC CGL Sub-Inspector (CBI, NIA, Narcotics)",
    payLevel: "Level 6 (Grade Pay 4200, 35,400 - 1,12,400)",
    basicPay: 35400,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Central Enforcement Agencies (MHA/PMO)"
  },
  "ssc-cgl-inspector": {
    name: "SSC CGL Inspector (GST, Customs, Income Tax, ASO)",
    payLevel: "Level 7 (Grade Pay 4600, 44,900 - 1,42,400)",
    basicPay: 44900,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Ministry of Finance / DoPT"
  },
  "ibps-po": {
    name: "Bank PO / Assistant Manager (IBPS / SBI)",
    payLevel: "JMGS-Scale I (Junior Management Scale)",
    basicPay: 48480,
    rationMoney: 0,
    riskAllowance: 0,
    department: "Public Sector Banks (SBI / PNB / BOB)"
  },
  "upsc-ias": {
    name: "UPSC IAS / IPS Probationer (SDM / ASP / AC)",
    payLevel: "Level 10 (Grade Pay 5400, 56,100 - 1,77,500)",
    basicPay: 56100,
    rationMoney: 0,
    riskAllowance: 0,
    department: "All India Services (DoPT / MHA)"
  }
};

const SALARY_POST_ALIASES = {
  'army-agniveer': 'agniveer-army',
  'agniveer-gd': 'agniveer-army',
  'army-agniveer-gd': 'agniveer-army',
  'agniveer': 'agniveer-army',
  'up-police-constable': 'up-police',
  'bihar-police-constable': 'bihar-police',
  'station-master': 'rrb-ntpc',
  'railway-ntpc': 'rrb-ntpc',
  'group-d': 'rrb-group-d',
  'mts': 'ssc-mts',
  'cgl-inspector': 'ssc-cgl-inspector',
  'cgl-si': 'ssc-cgl-si',
  'chsl': 'ssc-chsl-ldc',
  'rpf': 'rpf-constable'
};

function resolveSalaryPostKey(key) {
  if (!key) return 'ssc-gd';
  const clean = key.toLowerCase().trim();
  if (SALARY_POSTS_DATABASE[clean]) return clean;
  if (SALARY_POST_ALIASES[clean]) return SALARY_POST_ALIASES[clean];
  return 'ssc-gd';
}

function calculateGovtSalary() {
  const rawPostKey = document.getElementById('salaryPostSelect')?.value || 'ssc-gd';
  const postKey = resolveSalaryPostKey(rawPostKey);
  const cityTier = document.getElementById('salaryCitySelect')?.value || 'y';
  const postData = SALARY_POSTS_DATABASE[postKey] || SALARY_POSTS_DATABASE['ssc-gd'];

  const displayBox = document.getElementById('salaryResultDisplay');
  if (!displayBox) return;

  // SPECIAL CASE: AGNIVEER SEVA NIDHI PACKAGE
  if (postData.isAgniveer) {
    const monthlyPackage = postData.basicPay; // 30,000 (Year 1)
    const inHandSalary = Math.round(monthlyPackage * 0.70); // 21,000 (70%)
    const corpusDeduction = Math.round(monthlyPackage * 0.30); // 9,000 (30%)
    const govtCorpusContribution = corpusDeduction; // 9,000 (100% matched by Govt)
    const totalCorpusMonthly = corpusDeduction + govtCorpusContribution; // 18,000
    const annualCtc = monthlyPackage * 12;

    displayBox.innerHTML = \`
      <div class="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-emerald-400/40 space-y-6">
        <!-- Payslip Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-emerald-800/80 gap-3">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl">
              🎖️
            </div>
            <div>
              <h3 class="text-lg sm:text-xl font-black text-white">\${postData.name}</h3>
              <p class="text-xs text-emerald-300 font-bold">\${postData.department} • \${postData.payLevel}</p>
            </div>
          </div>
          <div class="text-left sm:text-right">
            <span class="inline-block px-3 py-1 rounded-xl text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              ✓ अग्निपथ सेवा निधि पैकेज (Year 1 Stipend)
            </span>
            <div class="text-[11px] text-slate-400 font-medium mt-1">वर्दी, राशन व आवास: 100% भारतीय सेना द्वारा देय</div>
          </div>
        </div>

        <!-- Main Net In-Hand Highlight Banner -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-xs font-black uppercase tracking-wider text-emerald-100 block" data-i18n="salary_inhand_label">
              🏦 शुद्ध इन-हैंड वेतन (Monthly In-Hand Bank Credit - 70%):
            </span>
            <div class="text-3xl sm:text-5xl font-black tracking-tight mt-1">
              ₹\${inHandSalary.toLocaleString('en-IN')}
            </div>
            <p class="text-[11px] text-emerald-100 font-medium mt-1">
              प्रतिमाह 1 तारीख को बैंक खाते में जमा (Year 1: ₹21k, Year 2: ₹23.1k, Year 3: ₹25.58k, Year 4: ₹28k)।
            </p>
          </div>
          <div class="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4 shrink-0">
            <div class="text-xs text-emerald-100 font-bold">मासिक कस्टमाइज्ड पैकेज:</div>
            <div class="text-xl sm:text-2xl font-black text-white">₹\${monthlyPackage.toLocaleString('en-IN')} / माह</div>
            <div class="text-[10px] text-emerald-200 mt-0.5">वार्षिक पैकेज: ₹\${annualCtc.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <!-- Action: Print -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white/10 rounded-2xl border border-white/10 text-xs">
          <span class="text-emerald-200 font-medium">📄 अग्निवीर सेवा निधि वेतन पर्ची प्रारूप में प्रिंट या PDF सेव करें:</span>
          <button type="button" onclick="printPaySlip()" class="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs transition flex items-center justify-center space-x-1.5 shadow-md cursor-pointer">
            <span>🖨️ वेतन पर्ची (Pay Slip) प्रिंट / PDF</span>
          </button>
        </div>

        <!-- Itemized Salary Matrix -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Col 1: Earnings -->
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5">
            <div class="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center justify-between pb-2 border-b border-white/10">
              <span>➕ पैकेज विवरण (Package Components)</span>
              <span>राशि (₹)</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">मासिक कस्टमाइज्ड पैकेज (Gross):</span>
              <span class="font-bold text-white">₹\${monthlyPackage.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">हस्तगत वेतन (In-Hand Pay 70%):</span>
              <span class="font-bold text-emerald-300">₹\${inHandSalary.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">राशन / वर्दी / मेडिकल / आवास:</span>
              <span class="font-bold text-emerald-400">मुफ्त (100% Armed Forces)</span>
            </div>
            <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-black">
              <span class="text-amber-300 uppercase">कुल इन-हैंड (Net In-Hand):</span>
              <span class="text-amber-300 text-sm">₹\${inHandSalary.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <!-- Col 2: Seva Nidhi Corpus Fund -->
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5">
            <div class="text-xs font-black uppercase text-cyan-300 tracking-wider flex items-center justify-between pb-2 border-b border-white/10">
              <span>🛡️ सेवा निधि फंड (Seva Nidhi Corpus Fund)</span>
              <span>राशि (₹)</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">अग्निवीर कॉर्पस अंशदान (30%):</span>
              <span class="font-bold text-cyan-200">₹\${corpusDeduction.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">भारत सरकार का समतुल्य अंशदान:</span>
              <span class="font-bold text-emerald-300">+₹\${govtCorpusContribution.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">कुल मासिक सेवा निधि बचत:</span>
              <span class="font-bold text-cyan-300">₹\${totalCorpusMonthly.toLocaleString('en-IN')} / माह</span>
            </div>
            <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-black">
              <span class="text-cyan-300 uppercase">4 वर्ष बाद सेवा निधि पैकेज:</span>
              <span class="text-cyan-300 text-sm">~₹11.71 लाख (Tax Free)</span>
            </div>
          </div>
        </div>

        <!-- Motivation Strip -->
        <div class="bg-white/5 rounded-2xl p-4 border border-white/10 text-[11px] text-slate-300 space-y-1.5">
          <div class="font-bold text-white flex items-center space-x-1.5">
            <span>🎁 अग्निवीर विशेष सुविधाएं एवं भविष्य के अवसर:</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-400">
            <div>✓ ₹48 लाख का गैर-अंशदायी जीवन बीमा (Life Insurance)</div>
            <div>✓ 25% को भारतीय सेना में नियमित स्थायी कैडर (Permanent Commission)</div>
            <div>✓ CAPFs (BSF, CISF, CRPF) एवं राज्य पुलिस में 10% आरक्षण व आयु छूट</div>
          </div>
        </div>
      </div>
    \`;
    displayBox.classList.remove('hidden');
    displayBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // STANDARD 7TH CPC POSTS
  const basic = postData.basicPay;

  // 1. Dearness Allowance (DA): 50% of Basic Pay (Current 7th CPC rate)
  const daRate = 0.50;
  const da = Math.round(basic * daRate);

  // 2. House Rent Allowance (HRA): X = 30%, Y = 20%, Z = 10%
  let hraRate = 0.20;
  let hraMin = 3600;
  if (cityTier === 'x') {
    hraRate = 0.30;
    hraMin = 5400;
  } else if (cityTier === 'z') {
    hraRate = 0.10;
    hraMin = 1800;
  }
  const hra = Math.max(hraMin, Math.round(basic * hraRate));

  // 3. Transport Allowance (TA): Level 1-2: 1350/900; Level 3-8: 3600/1800; Level 9+: 7200/3600
  let baseTa = 1800;
  if (postData.payLevel.includes('Level 1') || postData.payLevel.includes('Level 2')) {
    baseTa = (cityTier === 'x') ? 1350 : 900;
  } else if (postData.payLevel.includes('Level 10')) {
    baseTa = (cityTier === 'x') ? 7200 : 3600;
  } else {
    baseTa = (cityTier === 'x') ? 3600 : 1800;
  }
  const daOnTa = Math.round(baseTa * daRate);
  const totalTa = baseTa + daOnTa;

  // Special Allowances (Ration / Risk / Running)
  const specialAllowance = (postData.rationMoney || 0) + (postData.riskAllowance || 0) + (postData.runningAllowance || 0);

  // Gross Earnings
  const grossSalary = basic + da + hra + totalTa + specialAllowance;

  // Deductions
  const nps = Math.round((basic + da) * 0.10);
  const cghs = basic >= 56100 ? 650 : (basic >= 35400 ? 450 : 250);
  const cgegis = basic >= 56100 ? 120 : (basic >= 35400 ? 60 : 30);
  const totalDeductions = nps + cghs + cgegis;

  // Net In-Hand Salary
  const inHandSalary = grossSalary - totalDeductions;

  // Render Pay-Slip
  displayBox.innerHTML = \`
    <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-indigo-400/40 space-y-6">
      
      <!-- Payslip Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-indigo-800/80 gap-3">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-2xl">
            🇮🇳
          </div>
          <div>
            <h3 class="text-lg sm:text-xl font-black text-white">\${postData.name}</h3>
            <p class="text-xs text-indigo-300 font-bold">\${postData.department} • \${postData.payLevel}</p>
          </div>
        </div>
        <div class="text-left sm:text-right">
          <span class="inline-block px-3 py-1 rounded-xl text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            ✓ 7th CPC Revised Pay Scale (50% DA)
          </span>
          <div class="text-[11px] text-slate-400 font-medium mt-1">शहर श्रेणी: Class \${cityTier.toUpperCase()} City</div>
        </div>
      </div>

      <!-- Main Net In-Hand Highlight Banner -->
      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-black uppercase tracking-wider text-emerald-100 block" data-i18n="salary_inhand_label">
            \${typeof getTranslation === 'function' ? getTranslation('salary_inhand_label') : '🏦 शुद्ध इन-हैंड वेतन (Monthly In-Hand Bank Credit):'}
          </span>
          <div class="text-3xl sm:text-5xl font-black tracking-tight mt-1">
            ₹\${inHandSalary.toLocaleString('en-IN')}
          </div>
          <p class="text-[11px] text-emerald-100 font-medium mt-1">
            हर महीने की 1 तारीख को आपके बैंक खाते में जमा होने वाली शुद्ध राशि।
          </p>
        </div>
        <div class="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-white/20 pt-2 sm:pt-0 sm:pl-4 shrink-0">
          <div class="text-xs text-emerald-100 font-bold" data-i18n="salary_ctc_label">\${typeof getTranslation === 'function' ? getTranslation('salary_ctc_label') : 'वार्षिक पैकेज (Annual CTC):'}</div>
          <div class="text-xl sm:text-2xl font-black text-white">₹\${(grossSalary * 12).toLocaleString('en-IN')} / Year</div>
          <div class="text-[10px] text-emerald-200 mt-0.5">भत्ते व बोनस सहित</div>
        </div>
      </div>

      <!-- Quick Action: Print / PDF Official Pay Slip -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white/10 rounded-2xl border border-white/10 text-xs">
        <span class="text-indigo-200 font-medium">📄 आधिकारिक 7th CPC पे-स्लिप प्रारूप में प्रिंट या PDF सेव करें:</span>
        <button type="button" onclick="printPaySlip()" class="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs transition flex items-center justify-center space-x-1.5 shadow-md cursor-pointer">
          <span>🖨️ वेतन पर्ची (Pay Slip) प्रिंट / PDF</span>
        </button>
      </div>

      <!-- Itemized Salary Matrix (Earnings vs Deductions) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Column 1: Gross Earnings -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5">
          <div class="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center justify-between pb-2 border-b border-white/10">
            <span>➕ आय घटक (Monthly Earnings)</span>
            <span>राशि (₹)</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">मूल वेतन (Basic Pay):</span>
            <span class="font-bold text-white">₹\${basic.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">महंगाई भत्ता (DA @ 50%):</span>
            <span class="font-bold text-white">₹\${da.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">मकान किराया भत्ता (HRA):</span>
            <span class="font-bold text-white">₹\${hra.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">परिवहन भत्ता (TA + DA):</span>
            <span class="font-bold text-white">₹\${totalTa.toLocaleString('en-IN')}</span>
          </div>
          \${specialAllowance > 0 ? \`
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-300">राशन / रिस्क / स्पेशल भत्ता:</span>
              <span class="font-bold text-emerald-300">+₹\${specialAllowance.toLocaleString('en-IN')}</span>
            </div>
          \` : ''}
          <div class="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-black">
            <span class="text-amber-300 uppercase">सकल वेतन (Gross Salary):</span>
            <span class="text-amber-300 text-sm">₹\${grossSalary.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <!-- Column 2: Deductions -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2.5">
          <div class="text-xs font-black uppercase text-rose-300 tracking-wider flex items-center justify-between pb-2 border-b border-white/10">
            <span>➖ कटौतियां (Monthly Deductions)</span>
            <span>राशि (₹)</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">राष्ट्रीय पेंशन प्रणाली (NPS Tier-I 10%):</span>
            <span class="font-bold text-rose-300">-₹\${nps.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">स्वास्थ्य योजना (CGHS / Medical):</span>
            <span class="font-bold text-rose-300">-₹\${cghs}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-300">केंद्रीय बीमा योजना (CGEGIS):</span>
            <span class="font-bold text-rose-300">-₹\${cgegis}</span>
          </div>
          <div class="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-black">
            <span class="text-rose-300 uppercase">कुल कटौतियां (Total Deductions):</span>
            <span class="text-rose-300 text-sm">-₹\${totalDeductions.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      <!-- Motivation & Perks Strip -->
      <div class="bg-white/5 rounded-2xl p-4 border border-white/10 text-[11px] text-slate-300 space-y-1.5">
        <div class="font-bold text-white flex items-center space-x-1.5">
          <span>🎁 अतिरिक्त सरकारी लाभ एवं सुविधाएं (Additional Govt Perks):</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-400">
          <div>✓ सरकार का 14% NPS अंशदान (₹\${Math.round((basic + da) * 0.14).toLocaleString('en-IN')} प्रतिमाह अलग से)</div>
          <div>✓ मुफ्त चिकित्सा सुविधा (CGHS कैशलेस)</div>
          <div>✓ रेलवे पास / LTC वार्षिक यात्रा सुविधा</div>
        </div>
      </div>

    </div>
  \`;

  displayBox.classList.remove('hidden');
  displayBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initSalaryCalculator() {
  const postSelect = document.getElementById('salaryPostSelect');
  const citySelect = document.getElementById('salaryCitySelect');

  if (postSelect) {
    postSelect.removeEventListener('change', calculateGovtSalary);
    postSelect.addEventListener('change', calculateGovtSalary);
  }
  if (citySelect) {
    citySelect.removeEventListener('change', calculateGovtSalary);
    citySelect.addEventListener('change', calculateGovtSalary);
  }

  calculateGovtSalary();
}

function printPaySlip() {
  const rawPostKey = document.getElementById('salaryPostSelect')?.value || 'ssc-gd';
  const postKey = resolveSalaryPostKey(rawPostKey);
  const cityTier = document.getElementById('salaryCitySelect')?.value || 'y';
  const postData = SALARY_POSTS_DATABASE[postKey] || SALARY_POSTS_DATABASE['ssc-gd'];

  const printWindow = window.open('', '_blank', 'width=800,height=750');
  if (!printWindow) {
    alert('कृपया पॉपअप विंडो को अनुमति दें (Please allow popups to print pay slip).');
    return;
  }

  if (postData.isAgniveer) {
    const monthlyPackage = postData.basicPay;
    const inHandSalary = Math.round(monthlyPackage * 0.70);
    const corpusDeduction = Math.round(monthlyPackage * 0.30);
    const govtCorpusContribution = corpusDeduction;

    const html = \`
      <!DOCTYPE html>
      <html lang="hi">
      <head>
        <meta charset="UTF-8">
        <title>Agniveer Pay Slip - \${postData.name}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1e293b; background: #fff; margin: 0; line-height: 1.4; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
          .header h2 { margin: 0; font-size: 20px; color: #0f172a; text-transform: uppercase; }
          .header p { margin: 4px 0 0; font-size: 13px; color: #64748b; font-weight: bold; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
          .meta-table td { padding: 6px 8px; border: 1px solid #cbd5e1; }
          .meta-table td.label { font-weight: bold; background: #f8fafc; width: 25%; }
          .salary-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
          .salary-table th { background: #0f172a; color: #fff; padding: 8px; text-align: left; font-size: 13px; }
          .salary-table td { padding: 8px; border: 1px solid #cbd5e1; }
          .salary-table td.amount { text-align: right; font-weight: bold; }
          .total-row { background: #f1f5f9; font-weight: bold; }
          .net-pay-banner { background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; padding: 16px; text-align: center; margin-top: 16px; }
          .net-pay-banner h3 { margin: 0; font-size: 26px; color: #065f46; font-weight: 900; }
          .net-pay-banner p { margin: 4px 0 0; font-size: 12px; color: #047857; }
          .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          @media print { .no-print { display: none; } body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="no-print" style="text-align: right; margin-bottom: 12px;">
          <button onclick="window.print()" style="background: #0f172a; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">🖨️ Print / Save as PDF</button>
          <button onclick="window.close()" style="background: #e2e8f0; color: #334155; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; margin-left: 8px;">Close</button>
        </div>
        <div class="header">
          <h2>MINISTRY OF DEFENCE • INDIAN ARMED FORCES</h2>
          <p>Agnipath Scheme Official Monthly Statement (Seva Nidhi Package)</p>
        </div>
        <table class="meta-table">
          <tr>
            <td class="label">पद नाम (Designation):</td><td>\${postData.name}</td>
            <td class="label">योजना:</td><td>\${postData.payLevel}</td>
          </tr>
          <tr>
            <td class="label">विभाग:</td><td>\${postData.department}</td>
            <td class="label">राशन / आवास:</td><td>मुफ्त सैन्य सुविधा</td>
          </tr>
        </table>
        <table class="salary-table">
          <tr>
            <th colspan="2">MONTHLY PACKAGE BREAKDOWN</th>
            <th colspan="2">SEVA NIDHI CORPUS DEPOSIT</th>
          </tr>
          <tr>
            <td>कस्टमाइज्ड पैकेज (Gross Monthly Package):</td><td class="amount">₹\${monthlyPackage.toLocaleString('en-IN')}</td>
            <td>अग्निवीर अंशदान (30% Deducted):</td><td class="amount">-₹\${corpusDeduction.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td>हस्तगत वेतन (In-Hand Bank Credit 70%):</td><td class="amount">₹\${inHandSalary.toLocaleString('en-IN')}</td>
            <td>सरकार का समतुल्य अंशदान:</td><td class="amount">+₹\${govtCorpusContribution.toLocaleString('en-IN')}</td>
          </tr>
          <tr class="total-row">
            <td>NET IN-HAND (मासिक बैंक जमा):</td><td class="amount">₹\${inHandSalary.toLocaleString('en-IN')}</td>
            <td>मासिक कुल सेवा निधि बचत:</td><td class="amount">₹\${(corpusDeduction * 2).toLocaleString('en-IN')}</td>
          </tr>
        </table>
        <div class="net-pay-banner">
          <div>MONTHLY NET BANK ACCOUNT CREDIT (शुद्ध बैंक क्रेडिट)</div>
          <h3>₹\${inHandSalary.toLocaleString('en-IN')}</h3>
          <p>4 वर्ष पूर्ण होने पर सेवा निधि पैकेज: ~₹11.71 लाख (आयकर मुक्त) + ₹48 लाख निःशुल्क बीमा</p>
        </div>
        <div class="footer">
          Generated by SarkariAI Hub (sarkariaihub.in) • Agnipath Seva Nidhi Pay Statement • For Guidance.
        </div>
      </body>
      </html>
    \`;
    printWindow.document.write(html);
    printWindow.document.close();
    return;
  }

  const basic = postData.basicPay;
  const da = Math.round(basic * 0.50);
  let hraRate = cityTier === 'x' ? 0.30 : (cityTier === 'z' ? 0.10 : 0.20);
  let hraMin = cityTier === 'x' ? 5400 : (cityTier === 'z' ? 1800 : 3600);
  const hra = Math.max(hraMin, Math.round(basic * hraRate));
  let baseTa = (postData.payLevel.includes('Level 1') || postData.payLevel.includes('Level 2')) ? (cityTier === 'x' ? 1350 : 900) : (cityTier === 'x' ? 3600 : 1800);
  if (postData.payLevel.includes('Level 10')) {
    baseTa = (cityTier === 'x') ? 7200 : 3600;
  }
  const totalTa = baseTa + Math.round(baseTa * 0.50);
  const specialAllowance = (postData.rationMoney || 0) + (postData.riskAllowance || 0) + (postData.runningAllowance || 0);
  const grossSalary = basic + da + hra + totalTa + specialAllowance;
  const nps = Math.round((basic + da) * 0.10);
  const cghs = basic >= 56100 ? 650 : (basic >= 35400 ? 450 : 250);
  const cgegis = basic >= 56100 ? 120 : (basic >= 35400 ? 60 : 30);
  const totalDeductions = nps + cghs + cgegis;
  const inHandSalary = grossSalary - totalDeductions;

  const html = \`
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>7th CPC Pay Slip - \${postData.name}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1e293b; background: #fff; margin: 0; line-height: 1.4; }
        .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
        .header h2 { margin: 0; font-size: 20px; color: #0f172a; text-transform: uppercase; }
        .header p { margin: 4px 0 0; font-size: 13px; color: #64748b; font-weight: bold; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
        .meta-table td { padding: 6px 8px; border: 1px solid #cbd5e1; }
        .meta-table td.label { font-weight: bold; background: #f8fafc; width: 25%; }
        .salary-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
        .salary-table th { background: #0f172a; color: #fff; padding: 8px; text-align: left; font-size: 13px; }
        .salary-table td { padding: 8px; border: 1px solid #cbd5e1; }
        .salary-table td.amount { text-align: right; font-weight: bold; }
        .total-row { background: #f1f5f9; font-weight: bold; }
        .net-pay-banner { background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; padding: 16px; text-align: center; margin-top: 16px; }
        .net-pay-banner h3 { margin: 0; font-size: 26px; color: #065f46; font-weight: 900; }
        .net-pay-banner p { margin: 4px 0 0; font-size: 12px; color: #047857; }
        .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        @media print { .no-print { display: none; } body { padding: 0; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="text-align: right; margin-bottom: 12px;">
        <button onclick="window.print()" style="background: #0f172a; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">🖨️ Print / Save as PDF</button>
        <button onclick="window.close()" style="background: #e2e8f0; color: #334155; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; margin-left: 8px;">Close</button>
      </div>
      <div class="header">
        <h2>GOVERNMENT OF INDIA / STATE PUBLIC SERVICE</h2>
        <p>7th Central Pay Commission Revised Salary Statement (DA @ 50%)</p>
      </div>
      <table class="meta-table">
        <tr>
          <td class="label">पद नाम (Designation):</td><td>\${postData.name}</td>
          <td class="label">वेतन स्तर (Pay Level):</td><td>\${postData.payLevel}</td>
        </tr>
        <tr>
          <td class="label">विभाग / मंत्रालय:</td><td>\${postData.department}</td>
          <td class="label">शहर श्रेणी (City Tier):</td><td>Class \${cityTier.toUpperCase()} City</td>
        </tr>
      </table>
      <table class="salary-table">
        <tr>
          <th colspan="2">EARNINGS & ALLOWANCES (आय)</th>
          <th colspan="2">DEDUCTIONS (कटौतियां)</th>
        </tr>
        <tr>
          <td>मूल वेतन (Basic Pay):</td><td class="amount">₹\${basic.toLocaleString('en-IN')}</td>
          <td>NPS Tier-1 (10% Basic + DA):</td><td class="amount">-₹\${nps.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>महंगाई भत्ता (DA @ 50%):</td><td class="amount">₹\${da.toLocaleString('en-IN')}</td>
          <td>CGHS / मेडिकल अंशदान:</td><td class="amount">-₹\${cghs}</td>
        </tr>
        <tr>
          <td>मकान किराया भत्ता (HRA):</td><td class="amount">₹\${hra.toLocaleString('en-IN')}</td>
          <td>CGEGIS (केंद्रीय कर्मचारी बीमा):</td><td class="amount">-₹\${cgegis}</td>
        </tr>
        <tr>
          <td>परिवहन भत्ता (TA + DA):</td><td class="amount">₹\${totalTa.toLocaleString('en-IN')}</td>
          <td>-</td><td class="amount">-</td>
        </tr>
        \${specialAllowance > 0 ? \`
        <tr>
          <td>राशन / रिस्क / स्पेशल भत्ता:</td><td class="amount">+₹\${specialAllowance.toLocaleString('en-IN')}</td>
          <td>-</td><td class="amount">-</td>
        </tr>
        \` : ''}
        <tr class="total-row">
          <td>GROSS EARNINGS (सकल वेतन):</td><td class="amount">₹\${grossSalary.toLocaleString('en-IN')}</td>
          <td>TOTAL DEDUCTIONS (कुल कटौतियां):</td><td class="amount">-₹\${totalDeductions.toLocaleString('en-IN')}</td>
        </tr>
      </table>
      <div class="net-pay-banner">
        <div>NET MONTHLY IN-HAND SALARY (शुद्ध हस्तगत बैंक खाता जमा)</div>
        <h3>₹\${inHandSalary.toLocaleString('en-IN')}</h3>
        <p>वार्षिक पैकेज (Annual CTC): ₹\${(grossSalary * 12).toLocaleString('en-IN')} / Year (अनुमानित)</p>
      </div>
      <div class="footer">
        Generated by SarkariAI Hub (sarkariaihub.in) • Computer Generated 7th CPC Salary Statement • For career guidance purposes.
      </div>
    </body>
    </html>
  \`;

  printWindow.document.write(html);
  printWindow.document.close();
}

window.printPaySlip = printPaySlip;
window.calculateGovtSalary = calculateGovtSalary;

window.addEventListener('languageChanged', () => {
  const displayBox = document.getElementById('salaryResultDisplay');
  if (displayBox && !displayBox.classList.contains('hidden') && displayBox.innerHTML.trim() !== '') {
    calculateGovtSalary();
  }
});

document.addEventListener('DOMContentLoaded', initSalaryCalculator);
`;

fs.writeFileSync(salaryFile, code, 'utf8');
console.log('Successfully written comprehensive salary-calculator.js with 16 posts and Agniveer Seva Nidhi handling!');

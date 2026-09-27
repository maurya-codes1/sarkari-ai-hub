// Sarkari Age & Eligibility Calculator with Cutoff Date and Reservation Logic
function initAgeCalculator() {
  const cutoffInput = document.getElementById('ageCutoffDate');
  const dobInput = document.getElementById('ageDob');
  const calculateBtn = document.getElementById('calculateAgeBtn');
  const examSelect = document.getElementById('ageTargetExamSelect');

  // Populate target exam options
  if (examSelect && typeof EXAMS_DATABASE !== 'undefined') {
    examSelect.innerHTML = `
      <option value="none">-- General Age Calculation Only --</option>
      <optgroup label="👮 Police & Paramilitary Exams">
        <option value="ssc-gd">SSC GD Constable (18-23 Years)</option>
        <option value="up-police-constable">UP Police Constable (18-25 Years)</option>
        <option value="up-police-si">UP Police Sub-Inspector SI (21-28 Years)</option>
        <option value="bihar-police-constable">Bihar Police Constable (18-25 Years)</option>
        <option value="delhi-police">Delhi Police Constable (18-25 Years)</option>
        <option value="rpf-constable">Railway RPF Constable & SI (18-28 Years)</option>
      </optgroup>
      <optgroup label="🏛️ SSC Central Exams">
        <option value="ssc-cgl">SSC CGL (18-27 / 30 / 32 Years)</option>
        <option value="ssc-chsl">SSC CHSL (18-27 Years)</option>
        <option value="ssc-mts">SSC MTS & Havaldar (18-25 / 27 Years)</option>
        <option value="ssc-cpo">SSC CPO Sub-Inspector (20-25 Years)</option>
      </optgroup>
      <optgroup label="🚆 Railway Recruitment (RRB)">
        <option value="rrb-alp">Railway RRB ALP (18-30 Years)</option>
        <option value="rrb-ntpc">Railway RRB NTPC (18-33 Years)</option>
        <option value="rrb-group-d">Railway Group D (18-33 Years)</option>
      </optgroup>
      <optgroup label="🎖️ Armed Forces (Agniveer)">
        <option value="agniveer-army">Indian Army Agniveer GD (17.5-21 Years)</option>
        <option value="agniveer-airforce">Indian Air Force Agniveervayu (17.5-21 Years)</option>
        <option value="agniveer-navy">Indian Navy Agniveer SSR/MR (17.5-21 Years)</option>
      </optgroup>
      <optgroup label="📚 Teaching, Banking & Entrance">
        <option value="ibps-po-clerk">IBPS Bank PO / Clerk (20-30 Years)</option>
        <option value="bpsc-tre">BPSC Teacher TRE 3.0/4.0 (21-37 Years)</option>
        <option value="ctet-exam">CBSE CTET (Min 18 Years, No Upper Limit)</option>
        <option value="upsc-cse">UPSC Civil Services (21-32 Years)</option>
        <option value="nta-neet">NEET UG Medical (Min 17 Years, No Upper Limit)</option>
      </optgroup>
    `;
  }

  // Set default cutoff date to 01/08/2026 (very common UPSC/SSC cutoff date)
  if (cutoffInput && !cutoffInput.value) {
    cutoffInput.value = '2026-08-01';
  }

  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateSarkariAge);
  }
}

function calculateSarkariAge(isSilent = false) {
  const dobVal = document.getElementById('ageDob')?.value;
  const cutoffVal = document.getElementById('ageCutoffDate')?.value;
  const category = document.getElementById('ageCategorySelect')?.value || 'GEN';
  const targetExamId = document.getElementById('ageTargetExamSelect')?.value || 'none';
  const resultCard = document.getElementById('ageResultCard');

  if (!dobVal || !cutoffVal) {
    if (!isSilent) {
      alert('Please enter both your Date of Birth and the Notification Cutoff Date.');
    }
    return;
  }

  const dob = new Date(dobVal);
  const cutoff = new Date(cutoffVal);

  if (dob >= cutoff) {
    if (!isSilent) {
      alert('Date of Birth must be before the Cutoff Date!');
    }
    return;
  }

  // Calculate Years, Months, Days
  let years = cutoff.getFullYear() - dob.getFullYear();
  let months = cutoff.getMonth() - dob.getMonth();
  let days = cutoff.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(cutoff.getFullYear(), cutoff.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Total age in days for fine comparison
  const diffTime = Math.abs(cutoff - dob);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine Age Relaxation
  let relaxationYears = 0;
  let relaxationLabel = "No age relaxation (General/EWS)";

  switch (category) {
    case 'OBC':
      relaxationYears = 3;
      relaxationLabel = "+3 Years Upper Age Relaxation (OBC-NCL)";
      break;
    case 'SC':
    case 'ST':
      relaxationYears = 5;
      relaxationLabel = "+5 Years Upper Age Relaxation (SC/ST)";
      break;
    case 'PWD_GEN':
      relaxationYears = 10;
      relaxationLabel = "+10 Years Upper Age Relaxation (PwD Unreserved)";
      break;
    case 'PWD_OBC':
      relaxationYears = 13;
      relaxationLabel = "+13 Years Upper Age Relaxation (PwD + OBC)";
      break;
    case 'PWD_SCST':
      relaxationYears = 15;
      relaxationLabel = "+15 Years Upper Age Relaxation (PwD + SC/ST)";
      break;
    case 'ESM':
      relaxationYears = 3; // + period of military service
      relaxationLabel = "Military Service + 3 Years (Ex-Servicemen)";
      break;
  }

  // Check against target exam rules
  let eligibilityHtml = '';
  if (targetExamId !== 'none') {
    const exam = getExamById(targetExamId);
    let minAge = 18;
    let maxAge = 27;

    if (targetExamId === 'ssc-gd') { minAge = 18; maxAge = 23; }
    else if (targetExamId === 'ssc-cgl') { minAge = 18; maxAge = 30; }
    else if (targetExamId === 'ssc-chsl') { minAge = 18; maxAge = 27; }
    else if (targetExamId === 'ssc-mts') { minAge = 18; maxAge = 25; }
    else if (targetExamId === 'ssc-cpo') { minAge = 20; maxAge = 25; }
    else if (targetExamId === 'rrb-alp') { minAge = 18; maxAge = 30; }
    else if (targetExamId === 'rrb-ntpc') { minAge = 18; maxAge = 33; }
    else if (targetExamId === 'rrb-group-d') { minAge = 18; maxAge = 33; }
    else if (targetExamId === 'up-police-constable') { minAge = 18; maxAge = 25; }
    else if (targetExamId === 'up-police-si') { minAge = 21; maxAge = 28; }
    else if (targetExamId === 'bihar-police-constable') { minAge = 18; maxAge = 25; }
    else if (targetExamId === 'delhi-police') { minAge = 18; maxAge = 25; }
    else if (targetExamId === 'rpf-constable') { minAge = 18; maxAge = 28; }
    else if (targetExamId === 'upsc-cse') { minAge = 21; maxAge = 32; }
    else if (targetExamId === 'ibps-po-clerk') { minAge = 20; maxAge = 30; }
    else if (targetExamId === 'bpsc-tre') { minAge = 21; maxAge = 37; }
    else if (targetExamId === 'ctet-exam') { minAge = 18; maxAge = 99; }
    else if (targetExamId === 'agniveer-army' || targetExamId === 'agniveer-airforce' || targetExamId === 'agniveer-navy') { minAge = 17.5; maxAge = 21; }
    else if (targetExamId === 'nta-neet') { minAge = 17; maxAge = 99; }

    const isAgniveerExam = targetExamId.startsWith('agniveer-');
    const effectiveMaxAge = isAgniveerExam ? maxAge : (maxAge + relaxationYears);

    const isUnderAge = (years + months / 12) < minAge;
    const isOverAge = (years + months / 12) > effectiveMaxAge;

    const tEligible = typeof getTranslation === 'function' ? getTranslation('age_result_eligible') : 'CONGRATULATIONS: YOU ARE ELIGIBLE!';
    const tUnderage = typeof getTranslation === 'function' ? getTranslation('age_result_underage') : 'UNDER-AGE FOR THIS EXAM';
    const tOverage = typeof getTranslation === 'function' ? getTranslation('age_result_overage') : 'OVER-AGE (EXCEEDED AGE LIMIT)';

    if (!isUnderAge && !isOverAge) {
      eligibilityHtml = `
        <div class="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3">
          <span class="text-2xl">🎉</span>
          <div>
            <h4 class="text-emerald-900 font-bold text-sm" data-i18n="age_result_eligible">${tEligible}</h4>
            <p class="text-emerald-700 text-xs mt-1">
              For <strong>${exam ? exam.shortName : targetExamId}</strong>, the age bracket for your category (${category}) is 
              <strong>${minAge} to ${effectiveMaxAge} years</strong>. Your computed age is <strong>${years}y ${months}m ${days}d</strong>.
            </p>
          </div>
        </div>
      `;
    } else if (isUnderAge) {
      eligibilityHtml = `
        <div class="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3">
          <span class="text-2xl">⚠️</span>
          <div>
            <h4 class="text-amber-900 font-bold text-sm" data-i18n="age_result_underage">${tUnderage}</h4>
            <p class="text-amber-700 text-xs mt-1">
              Minimum age required on cutoff date is <strong>${minAge} years</strong>. You need more time to be eligible.
            </p>
          </div>
        </div>
      `;
    } else {
      eligibilityHtml = `
        <div class="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-3">
          <span class="text-2xl">❌</span>
          <div>
            <h4 class="text-rose-900 font-bold text-sm" data-i18n="age_result_overage">${tOverage}</h4>
            <p class="text-rose-700 text-xs mt-1">
              Maximum permissible age including ${relaxationLabel} is <strong>${effectiveMaxAge} years</strong>. 
              Your age on the cutoff date is <strong>${years} years, ${months} months</strong>.
            </p>
          </div>
        </div>
      `;
    }
  }

  // Display Result Card
  if (resultCard) {
    resultCard.classList.remove('hidden');
    const tExactAge = typeof getTranslation === 'function' ? getTranslation('age_exact_age') : 'Your Exact Age on';
    const tDaysLived = typeof getTranslation === 'function' ? getTranslation('age_days_lived') : 'Total Days Lived';
    const tNextBday = typeof getTranslation === 'function' ? getTranslation('age_next_bday') : 'Next Birthday In:';

    resultCard.innerHTML = `
      <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-700/60 pb-4">
          <div>
            <span class="text-xs uppercase tracking-wider text-indigo-300 font-semibold" data-i18n="age_exact_age">${tExactAge}</span>
            <span class="text-xs uppercase tracking-wider text-indigo-300 font-semibold"> ${cutoffVal}</span>
            <div class="text-3xl sm:text-4xl font-black mt-1 text-white tracking-tight">
              ${years} <span class="text-lg font-normal text-indigo-200">Years</span> 
              ${months} <span class="text-lg font-normal text-indigo-200">Months</span> 
              ${days} <span class="text-lg font-normal text-indigo-200">Days</span>
            </div>
          </div>
          <div class="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-right">
            <div class="text-xs text-indigo-200" data-i18n="age_days_lived">${tDaysLived}</div>
            <div class="text-lg font-bold text-saffron-400">${diffDays.toLocaleString('en-IN')} Days</div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
          <div class="bg-white/5 p-3 rounded-lg border border-white/5">
            <span class="text-indigo-300">Selected Category:</span>
            <span class="font-bold ml-1 text-white">${category} (${relaxationLabel})</span>
          </div>
          <div class="bg-white/5 p-3 rounded-lg border border-white/5">
            <span class="text-indigo-300" data-i18n="age_next_bday">${tNextBday}</span>
            <span class="font-bold ml-1 text-white">${11 - months} Months, ${30 - days} Days</span>
          </div>
        </div>

        ${eligibilityHtml}
      </div>
    `;

    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// React to language change
window.addEventListener('languageChanged', () => {
  const resultCard = document.getElementById('ageResultCard');
  if (resultCard && !resultCard.classList.contains('hidden')) {
    calculateSarkariAge(true);
  }
});

document.addEventListener('DOMContentLoaded', initAgeCalculator);

// public/js/document-checker.js
// Document Verification (DV) & Crucial Date Guard (2026 Edition)
// Comprehensive validation rules for SSC, Railway RRB, State Police & Central Exams

const DV_AUTHORITY_RULES = [
  {
    authority: "District Magistrate (DM) / Addl. DM / Deputy Commissioner",
    rank: "Tier 1 (सर्वोच्च)",
    centralAccepted: true,
    stateAccepted: true,
    badge: "100% मान्य (Unconditional Acceptance)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    notes: "सभी केंद्र व राज्य स्तरीय परीक्षाओं (SSC, UPSC, RRB, Police) में बिना किसी आपत्ति के मान्य।"
  },
  {
    authority: "Sub-Divisional Magistrate (SDM) / SDO",
    rank: "Tier 2 (प्रखंड/अनुमंडल)",
    centralAccepted: true,
    stateAccepted: true,
    badge: "100% मान्य (Universally Accepted)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    notes: "केंद्रीय परीक्षाओं में DoPT नियमों के तहत पूर्णतः स्वीकृत। किसी अतिरिक्त प्रतिहस्ताक्षर की आवश्यकता नहीं।"
  },
  {
    authority: "Tehsildar / Executive Magistrate (कार्यकारी मजिस्ट्रेट)",
    rank: "Tier 3 (तहसील स्तर)",
    centralAccepted: true,
    stateAccepted: true,
    badge: "केंद्रीय व राज्य दोनों में मान्य (Not below Tehsildar rank)",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    notes: "DoPT निर्देशानुसार तहसीलदार रैंक से नीचे का अधिकारी प्रमाण पत्र जारी नहीं कर सकता।"
  },
  {
    authority: "Revenue Officer (RO) / Circle Officer (CO - बिहार/झारखंड)",
    rank: "Tier 4 (राजस्व/अंचल अधिकारी)",
    centralAccepted: false,
    stateAccepted: true,
    badge: "⚠️ राज्य में मान्य, केंद्रीय में SDO अनुशंसित",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    notes: "बिहार CSBC/BSSC में CO/RO मान्य है, परंतु SSC/RRB में कुछ बोर्ड SDO लेवल काउंटर साइन मांगते हैं। सुरक्षित रहने हेतु SDO स्तर से निर्गत करवाएं।"
  },
  {
    authority: "Ward Councillor / Mukhiya / Sarpanch / MLA / MP",
    rank: "Non-Competent (अमान्य)",
    centralAccepted: false,
    stateAccepted: false,
    badge: "❌ पूर्णतः अमान्य (Strictly Rejected)",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    notes: "जनप्रतिनिधि केवल निवास/चरित्र सत्यापन हेतु पत्र दे सकते हैं, जाति/EWS प्रमाण पत्र हेतु सक्षम प्राधिकारी नहीं हैं।"
  }
];

const DV_EXAM_CHECKLISTS = {
  "ssc": {
    name: "SSC CGL / CHSL / GD / MTS / CPO",
    mandatoryItems: [
      { id: "ssc_10th", text: "10वीं (मैट्रिक) मूल अंकपत्र व प्रमाण पत्र (जन्म तिथि के अंतिम साक्ष्य हेतु)", critical: true },
      { id: "ssc_12th_deg", text: "12वीं या स्नातक मूल डिग्री / प्रोविजनल प्रमाण पत्र एवं सभी सेमेस्टर्स की मार्कशीट", critical: true },
      { id: "ssc_caste", text: "केंद्रीय प्रारूप (Central Format) में जाति प्रमाण पत्र (OBC-NCL / SC / ST / EWS)", critical: true },
      { id: "ssc_photo_id", text: "मूल फोटो पहचान पत्र (आधार कार्ड / वोटर आईडी / पैन कार्ड / ड्राइविंग लाइसेंस)", critical: true },
      { id: "ssc_photos", text: "आवेदन फॉर्म में अपलोड किए गए समान कम से कम 6-8 पासपोर्ट साइज नवीनतम फोटो", critical: false },
      { id: "ssc_photocopies", text: "सभी मूल दस्तावेजों की 2-2 स्व-प्रमाणित (Self-Attested) छायाप्रतियां", critical: false },
      { id: "ssc_noc", text: "यदि पहले से सरकारी सेवा में कार्यरत हैं: नियोक्ता से अनापत्ति प्रमाण पत्र (NOC)", critical: false },
      { id: "ssc_affidavit", text: "नाम या पिता के नाम में मामूली स्पेलिंग अंतर होने पर प्रथम श्रेणी मजिस्ट्रेट/नोटरी शपथ पत्र (Affidavit)", critical: false }
    ]
  },
  "railway": {
    name: "Railway RRB (NTPC, ALP, Technician, Group D)",
    mandatoryItems: [
      { id: "rrb_10th", text: "10वीं मूल प्रमाण पत्र (जिसमें जन्म तिथि स्पष्ट रूप से दर्ज हो)", critical: true },
      { id: "rrb_iti_deg", text: "संबंधित पद हेतु आवश्यक तकनीकी योग्यता (ITI / Diploma / B.Tech / Degree मूल प्रमाण पत्र)", critical: true },
      { id: "rrb_caste_annex", text: "रेलवे द्वारा जारी आधिकारिक अनुलग्नक (Railway Annexures Format) में जाति प्रमाण पत्र", critical: true },
      { id: "rrb_medical", text: "A1/B1 मेडिकल फिटनेस हेतु रेलवे मेडिकल बोर्ड दिशानिर्देश अनुपालन", critical: false },
      { id: "rrb_income_ebc", text: "शुल्क छूट प्राप्त अभ्यर्थियों के लिए आर्थिक रूप से पिछड़े वर्ग (EBC) प्रमाण पत्र", critical: false },
      { id: "rrb_photos", text: "8 पासपोर्ट रंगीन फोटो और एडमिट कार्ड का कैंडिडेट काउंटरफॉयल", critical: false },
      { id: "rrb_copies", text: "सभी मूल प्रमाणपत्रों की 2 सेट स्व-अभिप्रमाणित फोटोकॉपी", critical: false }
    ]
  },
  "police": {
    name: "State Police (UP Police, Bihar Police CSBC)",
    mandatoryItems: [
      { id: "pol_10_12", text: "10वीं व 12वीं (इंटरमीडिएट) के मूल अंकपत्र एवं सनद (मूल प्रमाण पत्र)", critical: true },
      { id: "pol_domicile", text: "मूल निवास प्रमाण पत्र (Domicile / Permanent Residence Certificate) - राज्य आरक्षण लाभ हेतु अनिवार्य", critical: true },
      { id: "pol_caste_state", text: "संबंधित राज्य सरकार द्वारा विहित प्रपत्र में निर्गत जाति / EWS प्रमाण पत्र", critical: true },
      { id: "pol_char_cert", text: "अंतिम शिक्षण संस्थान के प्रधानाचार्य एवं दो राजपत्रित अधिकारियों द्वारा चरित्र प्रमाण पत्र", critical: false },
      { id: "pol_aadhar", text: "मूल आधार कार्ड एवं उसमें मोबाइल नंबर लिंक होना अनिवार्य", critical: true },
      { id: "pol_photos", text: "आवेदन में उपयोग किए गए 8 से 10 रंगीन पासपोर्ट साइज फोटो", critical: false }
    ]
  },
  "defence": {
    name: "Defence (Army Agniveer, Airforce, Navy)",
    mandatoryItems: [
      { id: "def_marksheet", text: "कक्षा 10वीं/12वीं मूल अंकपत्र (न्यूनतम 45% या पद के अनुसार प्रतिशत अनिवार्यता)", critical: true },
      { id: "def_domicile_pic", text: "तहसीलदार द्वारा फोटोग्राफ युक्त ऑनलाइन सत्यापित मूल निवास प्रमाण पत्र", critical: true },
      { id: "def_caste", text: "ग्राम प्रधान / तहसीलदार द्वारा जारी फोटोग्राफ युक्त जाति प्रमाण पत्र", critical: true },
      { id: "def_char_pol", text: "संबंधित थाना प्रभारी (SHO) द्वारा जारी पुलिस चरित्र सत्यापन प्रमाण पत्र (6 माह से पुराना न हो)", critical: true },
      { id: "def_unmarried", text: "ग्राम प्रधान / सरपंच द्वारा जारी अविवाहित प्रमाण पत्र (21 वर्ष से कम आयु के लिए)", critical: true },
      { id: "def_affidavit", text: "₹10 के गैर-न्यायिक स्टाम्प पेपर पर निर्धारित प्रारूप में नोटरीकृत शपथ पत्र", critical: true },
      { id: "def_photos", text: "20 रंगीन पासपोर्ट फोटो (बिना चश्मे के, सफेद पृष्ठभूमि में)", critical: false }
    ]
  },
  "teaching": {
    name: "Teaching Exams (CTET, BPSC TRE, UPTET, KVS)",
    mandatoryItems: [
      { id: "teach_10_12", text: "10वीं व 12वीं मूल अंकपत्र एवं प्रमाण पत्र (जन्मतिथि सत्यापन हेतु)", critical: true },
      { id: "teach_deg_bed", text: "स्नातक (Graduation) एवं B.Ed / D.El.Ed / BTC मूल डिग्री व सभी सेमेस्टर की अंकतालिका", critical: true },
      { id: "teach_tet_ctet", text: "CTET / STET / UPTET उत्तीर्णता मूल प्रमाण पत्र एवं अंकपत्र (DigiLocker सत्यापित)", critical: true },
      { id: "teach_domicile", text: "राज्य शिक्षक बहाली हेतु मूल निवास प्रमाण पत्र (Domicile / PRC)", critical: true },
      { id: "teach_caste_ews", text: "सक्षम प्राधिकारी द्वारा निर्गत जाति / क्रीमीलेयर रहित (NCL) / EWS प्रमाण पत्र", critical: true },
      { id: "teach_photos", text: "आवेदन में अपलोड किए गए समान 8 रंगीन पासपोर्ट फोटो", critical: false }
    ]
  },
  "banking": {
    name: "Banking & Insurance (IBPS PO/Clerk, SBI, RBI)",
    mandatoryItems: [
      { id: "bank_10_deg", text: "10वीं, 12वीं एवं स्नातक डिग्री (All Semester Marksheets & Convocation Degree)", critical: true },
      { id: "bank_caste", text: "केंद्रीय प्रारूप (Central Format) में वित्तीय वर्ष हेतु वैध OBC-NCL / SC / ST / EWS प्रमाण पत्र", critical: true },
      { id: "bank_call_letter", text: "साक्षात्कार / डीवी बुलावा पत्र (Interview / DV Call Letter मूल प्रति)", critical: true },
      { id: "bank_id_proof", text: "मूल फोटो पहचान पत्र (PAN Card, Aadhaar, Passport) व प्रतिहस्ताक्षरित फोटोकॉपी", critical: true },
      { id: "bank_experience", text: "यदि लागू हो: पूर्व बैंक / वित्तीय संस्थान का सेवा अनुभव प्रमाण पत्र (Work Experience)", critical: false },
      { id: "bank_noc", text: "सरकारी / सार्वजनिक उपक्रम में कार्यरत अभ्यर्थियों हेतु अनापत्ति प्रमाण पत्र (NOC)", critical: false }
    ]
  },
  "upsc": {
    name: "Civil Services (UPSC CSE, State PCS - UPPSC/BPSC)",
    mandatoryItems: [
      { id: "upsc_matric", text: "मैट्रिकुलेशन (10वीं) मूल सनद / जन्मतिथि प्रमाण पत्र", critical: true },
      { id: "upsc_deg_prov", text: "मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री / प्रोविजनल प्रमाण पत्र", critical: true },
      { id: "upsc_caste_annex", text: "आयोग के निर्धारित फॉर्मेट में जारी मूल जाति / EWS प्रमाण पत्र (DoPT Norms)", critical: true },
      { id: "upsc_daf_summary", text: "विस्तृत आवेदन प्रपत्र (DAF Summary Sheet) की प्रति", critical: true },
      { id: "upsc_photos_id", text: "पासपोर्ट आकार के फोटो एवं सरकारी पहचान पत्र", critical: true }
    ]
  }
};

function checkCrucialDateValidity() {
  const category = document.getElementById('dvCategorySelect')?.value || 'obc';
  const crucialDateStr = document.getElementById('dvCrucialDateInput')?.value;
  const issueDateStr = document.getElementById('dvIssueDateInput')?.value;
  const resultContainer = document.getElementById('dvDateResultContainer');

  if (!resultContainer) return;

  if (!crucialDateStr || !issueDateStr) {
    resultContainer.innerHTML = `
      <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
        <span>⚠️ कृपया फॉर्म की क्रूशियल डेट (आवेदन की अंतिम तिथि) एवं प्रमाण पत्र जारी होने की तिथि दोनों दर्ज करें।</span>
      </div>
    `;
    resultContainer.classList.remove('hidden');
    return;
  }

  const crucialDate = new Date(crucialDateStr);
  const issueDate = new Date(issueDateStr);

  const diffTime = crucialDate.getTime() - issueDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = diffDays / 365.25;

  let statusBadge = '';
  let statusTitle = '';
  let explanation = '';
  let advice = '';

  if (category === 'ur') {
    statusTitle = "🟢 सामान्य वर्ग (General / UR) हेतु जाति प्रमाण पत्र की आवश्यकता नहीं";
    statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
    explanation = "अनारक्षित श्रेणी (UR) के अभ्यर्थियों को किसी श्रेणी आरक्षण प्रमाण पत्र की आवश्यकता नहीं होती। केवल 10वीं, 12वीं, मूल पहचान पत्र और फोटो पर्याप्त हैं।";
  } else if (category === 'obc') {
    if (diffDays < 0) {
      // Issued AFTER crucial date
      const daysAfter = Math.abs(diffDays);
      statusTitle = "🟡 अनंतिम (Provisional / P Status) का जोखिम!";
      statusBadge = "bg-amber-100 text-amber-800 border-amber-300";
      explanation = `आपका OBC-NCL प्रमाण पत्र आवेदन की अंतिम तिथि के ${daysAfter} दिन बाद जारी हुआ है। DoPT नियमों के अनुसार OBC प्रमाण पत्र क्रूशियल डेट या उससे पहले का होना चाहिए।`;
      advice = `<strong>समाधान:</strong> SSC व रेलवे कई बार इसे 'Provisional (P)' स्वीकार कर अंतिम विभाग को भेज देते हैं। यदि संभव हो तो क्रूशियल डेट के वित्तीय वर्ष का पुराना प्रमाण पत्र अथवा आय प्रमाण पत्र साथ रखें।`;
    } else if (diffYears <= 3.0) {
      // Valid within 3 years prior to crucial date
      statusTitle = "🟢 पूर्णतः मान्य (100% Valid & Safe Under DoPT Rules)";
      statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
      explanation = `आपका OBC-NCL प्रमाण पत्र क्रूशियल डेट से ठीक ${diffYears.toFixed(1)} वर्ष पूर्व की अवधि में जारी हुआ है। यह केंद्र सरकार के 3-वर्षीय वैधता नियम (DoPT OM No. 36033/1/2013-Estt(Res)) के पूर्णतः अनुकूल है।`;
      advice = `<strong>ध्यान दें:</strong> सुनिश्चित करें कि प्रमाण पत्र 'Non-Creamy Layer' का स्पष्ट उल्लेख करता हो एवं 'Government of India' के प्रारूप में हो (राज्य प्रारूप नहीं)।`;
    } else {
      // Older than 3 years
      statusTitle = "🔴 अमान्य (Expired / Out of Window - 3 वर्ष से अधिक पुराना)";
      statusBadge = "bg-rose-100 text-rose-800 border-rose-300";
      explanation = `आपका OBC-NCL प्रमाण पत्र क्रूशियल तिथि से ${diffYears.toFixed(1)} वर्ष पुराना है। केंद्र सरकार में OBC प्रमाण पत्र केवल 3 वर्ष हेतु ही मान्य होता है।`;
      advice = `<strong>सुधार:</strong> तत्काल अपने संबंधित अनुमंडल/तहसील से नवीनतम 3 वित्तीय वर्षों की पारिवारिक आय दर्शाते हुए नया केंद्रीय OBC-NCL प्रमाण पत्र बनवाएं।`;
    }
  } else if (category === 'ews') {
    // EWS rules: Valid year vs financial year
    if (diffDays < 0) {
      statusTitle = "🟡 क्रूशियल डेट के बाद जारी (After Crucial Date)";
      statusBadge = "bg-amber-100 text-amber-800 border-amber-300";
      explanation = `EWS प्रमाण पत्र संबंधित भर्ती के आवेदन वर्ष के वित्तीय वर्ष का होना अनिवार्य है। क्रूशियल डेट के बाद जारी प्रमाण पत्र को SSC कभी-कभी अनंतिम (Provisional) मानती है अथवा अस्वीकार कर देती है।`;
      advice = `<strong>समाधान:</strong> विज्ञापन में उल्लिखित वित्तीय वर्ष (Financial Year) और वैधता वर्ष (Valid Year) की जांच करें। सक्षम अधिकारी से जारी आय प्रमाण पत्र संलग्न रखें।`;
    } else {
      statusTitle = "🟢 EWS प्रमाण पत्र समयानुसार मान्य (Valid Within Window)";
      statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
      explanation = `प्रमाण पत्र क्रूशियल तिथि से पूर्व जारी किया गया है।`;
      advice = `<strong>अत्यंत महत्वपूर्ण:</strong> EWS प्रमाण पत्र में दो वर्ष लिखे होते हैं:<br>1. <strong>Financial Year (वित्तीय वर्ष):</strong> जिस वर्ष की आय आंकी गई (जैसे 2024-2025)<br>2. <strong>Valid Year (वैधता वर्ष):</strong> जिस वर्ष भर्ती हो रही है (जैसे 2025-2026)<br>दोनों वर्ष विज्ञापन के अनुसार सुसंगत होने चाहिए।`;
    }
  } else if (category === 'sc_st') {
    statusTitle = "🟢 SC/ST प्रमाण पत्र आजीवन मान्य (Lifetime Validity)";
    statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
    explanation = `अनुसूचित जाति (SC) और अनुसूचित जनजाति (ST) प्रमाण पत्र की कोई समय सीमा या एक्सपायरी नहीं होती। यह जीवन भर मान्य रहता है।`;
    advice = `<strong>ध्यान दें:</strong> प्रमाण पत्र केंद्र सरकार के निर्धारित प्रोफार्मा (Annexure) पर होना चाहिए और उसमें संबंधित राज्य की राष्ट्रपति अधिसूचना (Presidential Order) का स्पष्ट उल्लेख होना चाहिए।`;
  }

  resultContainer.innerHTML = `
    <div class="p-4 rounded-2xl border space-y-3 bg-white shadow-xs">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold px-3 py-1 rounded-full border ${statusBadge}">
          ${statusTitle}
        </span>
        <span class="text-[11px] text-slate-400 font-mono">अंतर: ${Math.abs(diffDays)} दिन</span>
      </div>

      <p class="text-xs sm:text-sm text-slate-800 leading-relaxed">
        ${explanation}
      </p>

      ${advice ? `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
          ${advice}
        </div>
      ` : ''}
    </div>
  `;
  resultContainer.classList.remove('hidden');
}

function renderDVChecklist() {
  const examKey = document.getElementById('dvExamSelect')?.value || 'ssc';
  const container = document.getElementById('dvChecklistItemsContainer');
  if (!container) return;

  const examData = DV_EXAM_CHECKLISTS[examKey] || DV_EXAM_CHECKLISTS['ssc'];
  let html = '';

  examData.mandatoryItems.forEach((item, idx) => {
    html += `
      <label class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all cursor-pointer bg-white text-xs">
        <input type="checkbox" 
               id="${item.id}"
               onchange="updateDVProgress()"
               class="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer">
        <div class="flex-1 space-y-1">
          <div class="text-slate-900 font-semibold flex items-center gap-2">
            <span>${item.text}</span>
            ${item.critical ? '<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">अनिवार्य</span>' : ''}
          </div>
        </div>
      </label>
    `;
  });

  container.innerHTML = html;
  updateDVProgress();
}

function updateDVProgress() {
  const container = document.getElementById('dvChecklistItemsContainer');
  const countDisplay = document.getElementById('dvCheckedCountDisplay');
  const barDisplay = document.getElementById('dvCheckedBarDisplay');
  if (!container) return;

  const total = container.querySelectorAll('input[type="checkbox"]').length;
  const checked = container.querySelectorAll('input[type="checkbox"]:checked').length;

  if (countDisplay) {
    countDisplay.innerText = `${checked} / ${total} तैयार`;
  }
  if (barDisplay) {
    const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    barDisplay.style.width = `${pct}%`;
  }
}

function renderDVAuthorityMatrix() {
  const container = document.getElementById('dvAuthorityMatrixContainer');
  if (!container) return;

  let html = '';
  DV_AUTHORITY_RULES.forEach(rule => {
    html += `
      <div class="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div class="font-bold text-xs sm:text-sm text-slate-900">
            ${rule.authority}
          </div>
          <span class="self-start text-[10px] font-bold px-2 py-0.5 rounded-full border ${rule.badgeColor}">
            ${rule.badge}
          </span>
        </div>
        <p class="text-[11px] text-slate-600 leading-relaxed">
          ${rule.notes}
        </p>
      </div>
    `;
  });

  container.innerHTML = html;
}

function initDocumentChecker() {
  renderDVChecklist();
  renderDVAuthorityMatrix();

  const examSelect = document.getElementById('dvExamSelect');
  if (examSelect) {
    examSelect.removeEventListener('change', renderDVChecklist);
    examSelect.addEventListener('change', renderDVChecklist);
  }

  const checkDateBtn = document.getElementById('dvCheckDateBtn');
  if (checkDateBtn) {
    checkDateBtn.removeEventListener('click', checkCrucialDateValidity);
    checkDateBtn.addEventListener('click', checkCrucialDateValidity);
  }
}

// React to language change
window.addEventListener('languageChanged', () => {
  renderDVChecklist();
  renderDVAuthorityMatrix();
  const dateResult = document.getElementById('dvDateResultContainer');
  if (dateResult && !dateResult.classList.contains('hidden') && dateResult.innerHTML.trim() !== '') {
    checkCrucialDateValidity();
  }
});

window.DV_EXAM_CHECKLISTS = DV_EXAM_CHECKLISTS;
window.DV_AUTHORITY_RULES = DV_AUTHORITY_RULES;
window.checkCrucialDateValidity = checkCrucialDateValidity;
window.initDocumentChecker = initDocumentChecker;

document.addEventListener('DOMContentLoaded', initDocumentChecker);

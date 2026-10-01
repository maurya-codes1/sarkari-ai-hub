const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'public', 'js', 'i18n.js');
let code = fs.readFileSync(i18nPath, 'utf8');

// Load module in sandbox to get current data
const { I18N_DATA, EXTENDED_I18N_DATA } = require(i18nPath);

// ==========================================
// 1. Hinglish (hi-latn) Enhancements
// ==========================================
const hinglishPatches = {
  nav_lang_select: "Bhasha",
  brand_title: "SarkariAI Hub",
  brand_badge: "Bharat Ka #1 Exam & Board Portal",
  nav_home: "Home",
  nav_quiz: "🎯 Mock Test",
  nav_notes: "📚 ₹10 Notes",
  nav_gk: "📰 GK & Current Affairs",
  nav_tools: "📸 Photo Resizer",
  nav_boards: "🎓 Education Boards",
  nav_omr: "📄 OMR Sheet",
  nav_more_tools: "🛠️ Aur Tools",
  nav_alerts: "Job Alerts",
  nav_night_mode: "Night Mode",
  nav_auto_sync: "🤖 Auto-Sync",
  nav_share_btn: "Share Karein",
  nav_physical: "🏃 Physical (PET/PST)",
  nav_salary: "💰 In-Hand Salary Calculator",
  nav_documents: "📜 Document Verification Guard",
  nav_planner: "⏰ 50:10 Study Timetable",
  nav_rank: "🎯 Rank Predictor",
  nav_kit: "🎒 Exam Bag Kit",
  nav_waiver: "💰 Fee Exemption Guide",
  nav_typing: "⌨️ Typing Speed Test",
  nav_calendar: "📅 Exam Countdown Calendar",
  nav_cutoff: "📊 Cut-Off Analyzer",
  nav_syllabus: "📋 Chapter Syllabus Tracker",
  nav_vault: "⭐ Revision Vault",
  nav_adaptive: "🧠 Adaptive Practice",
  nav_analytics: "📊 Candidate Analytics",
  nav_age: "🎂 Age Eligibility Calculator",
  nav_ai: "📑 Circular & Notification Decoder",
  hero_title: "Sarkari Pariksha & Board Tayari Ka #1 AI Portal 🇮🇳",
  hero_subtitle: "100% Free • Verified Official Circulars • Photo Resizer, Mock Tests, Answer Keys & Board Solutions",
  hero_cta_quiz: "🎯 Free Mock Test Dein",
  hero_cta_notes: "📚 ₹10 Study Notes",
  hero_cta_boards: "🎓 State Boards",
  hero_badge: "Bharat Ka Sabse Bharosemand Student Portal",
  quick_resizer: "📸 Photo & Sign Resizer",
  quick_stamp: "✍️ Photo Par Naam / Date",
  quick_age: "🎂 Age Calculator",
  quick_ai: "📑 Circular Decoder",
  quick_notes: "📚 Handwritten Notes",
  quick_boards: "🎓 10th/12th Boards",
  resizer_heading: "Sarkari Exam Photo & Signature Resizer",
  resizer_photo: "📸 Passport Photo",
  resizer_sign: "✍️ Signature",
  resizer_post: "🖼️ Postcard Size Photo",
  resizer_thumb: "👍 Angutha Nishaan (Thumb)",
  resizer_preset: "Exam Preset Select Karein:",
  resizer_upload: "Photo Upload Karein",
  resizer_crop: "Crop & Scale Tool",
  resizer_download: "Resized Photo Download Karein",
  resizer_reset_btn: "Reset Karein",
  quiz_heading: "All India Online Mock Test Lab",
  quiz_next_btn: "Agla Sawal →",
  quiz_prev_btn: "← Pichhla Sawal",
  quiz_submit_btn: "Test Submit Karein ✓",
  quiz_score: "Aapka Score",
  quiz_correct: "Sahi Jawab",
  quiz_wrong: "Galat Jawab",
  quiz_unattempted: "Chhode Gaye Sawal",
  quiz_accuracy: "Accuracy Percentage",
  quiz_review: "Answer Solution & Detailed Explanation",
  quiz_reattempt: "🔄 Test Dobara Dein",
  quiz_bookmark_btn: "☆ Bookmark Karein",
  scorecard_title: "All-India Mock Test Scorecard",
  scorecard_rank: "Estimated Rank",
  scorecard_percentile: "Percentile",
  notes_heading: "High-Yield Notes & Formula Sheets",
  notes_ready_made_title: "🔥 Ready-Made Notes & Guide Books",
  notes_download_btn: "⚡ Complete PDF Download Karein (₹9 UPI)",
  notes_sample_preview: "Sample Preview Dekhein",
  notes_pages_badge: "24 Pages Master PDF",
  age_heading: "Sarkari Job Age Eligibility Calculator",
  age_calculate_btn: "Eligibility Check Karein ➔",
  age_eligible: "Aap Is Exam Ke Liye Eligible Hain!",
  age_not_eligible: "Umar Limit Se Bahar Hain",
  cutoff_heading: "Official Cut-Off & Safe Score Analyzer",
  cal_heading: "Upcoming Exam Dates & Countdown",
  cal_days: "Din",
  cal_hours: "Ghante",
  cal_mins: "Minute",
  cal_secs: "Second",
  cal_live_now: "🔴 Exam Chal Raha Hai",
  anskey_heading: "Official Answer Keys & Objection Tracker",
  dopt_badge: "📜 DoPT Annexure Rules & Certificate Verification",
  dopt_desc: "Crucial date validity aur official format verify karein",
  dopt_checklist_title: "Apna exam choose karein aur document check karein",
  dopt_auth_guide_title: "Konse authorities certificate issue kar sakte hain?",
  study_badge: "⏰ 50:10 Pomodoro Method & Timetable",
  study_desc: "Apni routine ke anusar scientific study plan banayein",
  rank_badge: "📊 Rank & Normalization Calculator",
  rank_label_target_exam: "Target Exam:",
  rank_label_category: "Reservation Category:",
  rank_label_shift_diff: "Shift Difficulty Level:",
  rank_label_total_q: "Total Questions:",
  rank_label_correct_q: "Sahi Questions:",
  rank_label_wrong_q: "Galat Questions:",
  rank_btn_calculate: "📊 Rank & Expected Cut-Off Calculate Karein"
};

// ==========================================
// 2. Urdu, Kashmiri, Sindhi Shared Key Patches (Perso-Arabic Script)
// ==========================================
const persoArabicShared = {
  ca_btn_copy_notes: "📋 نوٹس کاپی کریں",
  dopt_badge: "📜 DoPT ضوابط اور سرٹیفکیٹ تصدیق",
  dopt_desc: "اہم تاریخ کی میعاد اور باضابطہ فارمیٹ کی تصدیق کریں",
  dopt_checklist_title: "اپنا امتحان منتخب کریں اور دستاویزات کی جانچ کریں",
  dopt_auth_guide_title: "کون سے مجاز افسران سرٹیفکیٹ جاری کر سکتے ہیں؟",
  study_badge: "⏰ 50:10 پومودورو طریقہ اور سائنسی روٹین",
  study_desc: "اپنے روزمرہ معمول کے مطابق سائنسی مطالعہ کا پلان بنائیں",
  rank_badge: "📊 رینک اور نارملائزیشن کیلکولیٹر",
  rank_label_target_exam: "ہدف امتحان:",
  rank_label_category: "ریزرویشن کیٹیگری:",
  rank_label_shift_diff: "شفٹ کی دشواری کی سطح:",
  rank_label_total_q: "کل سوالات:",
  rank_label_correct_q: "صحیح سوالات:",
  rank_label_wrong_q: "غلط سوالات:",
  rank_btn_calculate: "📊 رینک اور متوقع کٹ آف کا حساب لگائیں",
  anskey_card6_title: "BPSC 70th CCE / ریاستی PSC ابتدائی امتحانات",
  exam_target_label: "ہدف امتحان:"
};

// ==========================================
// 3. Maithili (mai) Patches
// ==========================================
const maithiliPatches = {
  nav_lang_select: "भाषा",
  brand_title: "सरकारी AI हब",
  nav_ai: "नियम विश्लेषक",
  nav_age: "उम्र गणक",
  quick_age: "🎂 उम्र गणक",
  preview_original: "मूल फाइल",
  ai_eligibility_heading: "🎓 शैक्षणिक योग्यता आ शारीरिक मानक",
  tab_police: "👮 पुलिस भर्ती",
  nav_quiz: "🎯 मॉक टेस्ट",
  nav_auto_sync: "ऑटो-सिंक",
  nav_typing: "⌨️ टाइपिंग टेस्ट",
  nav_calendar: "📅 परीक्षा कैलेंडर",
  card_age_title: "उम्र गणक",
  card_typing_title: "टाइपिंग टेस्ट लैब",
  card_syllabus_title: "पाठ्यक्रम ट्रैकर",
  exam_target_label: "लक्ष्य परीक्षा:",
  quiz_bookmark_btn: "☆ बुकमार्क करू",
  cal_days: "दिन",
  cal_mins: "मिनट",
  gw_timer_suffix: "सेकंड",
  nav_rank: "🎯 रैंक प्रेडिक्टर",
  nav_kit: "🎒 परीक्षा किट",
  nav_alerts: "नौकरी अलर्ट",
  qual_10th: "१०वीं पास",
  qual_12th: "१२वीं पास",
  qual_iti: "आईटीआई / डिप्लोमा"
};

// ==========================================
// 4. Bhojpuri (bho) Patches
// ==========================================
const bhojpuriPatches = {
  nav_lang_select: "भाषा",
  brand_title: "सरकारी AI हब",
  quiz_bookmark_btn: "☆ बुकमार्क करीं",
  cal_days: "दिन",
  cal_mins: "मिनट",
  gw_timer_suffix: "सेकंड",
  nav_rank: "🎯 रैंक प्रेडिक्टर",
  nav_kit: "🎒 परीक्षा किट बैग",
  nav_alerts: "नौकरी अलर्ट",
  qual_10th: "१०वीं पास",
  qual_12th: "१२वीं पास",
  qual_iti: "आईटीआई / डिप्लोमा",
  card_rank_title: "रैंक प्रेडिक्टर",
  card_kit_title: "परीक्षा किट बैग",
  exam_btn_result1_sub: "मुख्य सर्वर",
  nav_quiz: "🎯 मॉक टेस्ट",
  nav_notes: "📚 ₹१० नोट्स",
  nav_tools: "📸 फोटो रिसाइज़र",
  nav_boards: "🎓 शिक्षा बोर्ड",
  nav_age: "🎂 उमिर गणक"
};

// ==========================================
// 5. Dogri (doi) Patches
// ==========================================
const dogriPatches = {
  brand_title: "सरकारी AI हब",
  nav_ai: "नियम विश्लेषक",
  nav_age: "उम्र कैलकुलेटर",
  quick_stamp: "✍️ फोटो पर नां/तारीख",
  quick_age: "🎂 उम्र कैलकुलेटर",
  quick_boards: "🎓 १०वीं/१२वीं बोर्ड",
  preview_original: "मूल फाइल",
  ai_dates_heading: "📅 जरूरी तारीखां",
  tab_boards: "🎓 १०वीं/१२वीं बोर्ड",
  nav_quiz: "🎯 मॉक टेस्ट",
  nav_typing: "⌨️ टाइपिंग टेस्ट",
  nav_calendar: "📅 परीक्षा कैलेंडर",
  card_age_title: "उम्र कैलकुलेटर",
  card_typing_title: "टाइपिंग टेस्ट लैब",
  col_central_badge: "ऑनलाइन दरखास्त",
  quiz_bookmark_btn: "☆ बुकमार्क करो",
  exam_target_label: "लक्ष्य परीक्षा:",
  cal_days: "दिन"
};

// ==========================================
// 6. Nepali (ne) Patches
// ==========================================
const nepaliPatches = {
  nav_lang_select: "भाषा",
  brand_title: "सरकारी AI हब",
  nav_ai: "नियम विश्लेषक",
  quick_ai: "📑 नियम विश्लेषक",
  target_kb_range: "आवश्यक फाइल साइज (KB):",
  preview_original: "मूल फाइल",
  exam_target_label: "लक्षित परीक्षा:",
  resizer_photo: "📸 राहदानी फोटो",
  quiz_bookmark_btn: "☆ बुकमार्क गर्नुहोस्",
  cal_days: "दिन",
  cal_official_portal: "आधिकारिक पोर्टल →",
  planner_goal_label: "🎯 लक्ष्य:",
  qual_grad: "स्नातक",
  qual_iti: "आईटीआई / डिप्लोमा",
  exam_sec_fees: "💳 आवेदन दस्तुर विवरण",
  nav_quiz: "🎯 अभ्यास परीक्षा (मॉक टेस्ट)",
  card_age_title: "उमेर गणक"
};

// ==========================================
// 7. Konkani (kok) Patches
// ==========================================
const konkaniPatches = {
  brand_title: "सरकारी AI हब",
  nav_quiz: "🎯 मॉक टेस्ट",
  quiz_bookmark_btn: "☆ खूण करात",
  scorecard_title: "अखिल भारतीय मॉक टेस्ट गुणपत्रिका",
  study_badge: "⏰ ५०:१० पोमोडोरो पद्धत",
  study_desc: "तुमच्या दिसाच्या वेळापत्रका प्रमाणे वैज्ञानिक अभ्यास योजना",
  rank_badge: "📊 क्रमांक आनी नॉर्मलायझेशन गणक",
  rank_label_target_exam: "ध्येय परीक्षा:",
  rank_label_category: "आरक्षण वर्ग:",
  rank_label_shift_diff: "शिफ्ट कठीणाय पांवडो:",
  rank_label_total_q: "एकूण प्रस्न संख्या:",
  rank_label_correct_q: "योग्य प्रस्न:",
  rank_label_wrong_q: "चूक प्रस्न:",
  rank_btn_calculate: "📊 क्रमांक आनी कट-ऑफ मेजयात",
  rank_guide_text: "दाव्या फॉर्म्संत तुमची योग्य आनी चूक प्रस्नांची संख्या भरा"
};

// ==========================================
// 8. Santali (sat) Patches (Ol Chiki Script)
// ==========================================
const santaliPatches = {
  nav_share_btn: "ᱦᱟᱹᱴᱤᱧ ᱢᱮ (Share)",
  nav_whatsapp_btn: "ᱣᱟᱴᱥᱮᱯ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱢᱮ",
  nav_install_app_btn: "ᱮᱯ ᱤᱱᱥᱴᱚᱞ ᱢᱮ",
  btn_top_scroll: "ᱪᱮᱛᱟᱱ ᱪᱟᱞᱟᱜ ᱢᱮ ↑",
  ticker_item_1: "SSC GD ᱠᱚᱱᱥᱴᱮᱵᱚᱞ ᱒᱐᱒᱖ ᱚᱱᱞᱟᱭᱤᱱ ᱯᱷᱚᱨᱢ",
  ticker_item_2: "UP ᱯᱩᱞᱤᱥ ᱠᱚᱱᱥᱴᱮᱵᱚᱞ ᱖᱐,᱒᱔᱔ ᱵᱤᱰᱟᱹᱣ",
  ticker_item_3: "CBSE ᱑᱐ ᱟᱨ ᱑᱒ ᱟᱱᱟᱜ ᱵᱤᱰᱟᱹᱣ ᱚᱨᱡᱚ",
  ticker_item_4: "ᱨᱮᱞᱣᱮ RRB ALP ᱑᱘,᱗᱙᱙ ᱯᱚᱫᱽ • ᱚᱱᱞᱟᱭᱤᱱ",
  ticker_item_5: "NTA NEET UG ᱒᱐᱒᱖ ᱠᱟᱣᱩᱱᱥᱮᱞᱤᱝ",
  ticker_item_6: "ᱵᱤᱦᱟᱨ ᱯᱩᱞᱤᱥ CSBC ᱠᱚᱱᱥᱴᱮᱵᱚᱞ ᱵᱤᱰᱟᱹᱣ",
  board_card_cbse_title: "CBSE ᱑᱐ ᱟᱨ ᱑᱒ ᱟᱱᱟᱜ ᱵᱳᱨᱰ",
  board_card_cbse_desc: "ᱚᱨᱡᱚ ᱟᱨ ᱵᱤᱰᱟᱹᱣ ᱨᱮᱭᱟᱜ ᱵᱤᱵᱚᱨᱚᱬ",
  board_card_upmsp_title: "UP ᱵᱳᱨᱰ ᱦᱟᱭᱥᱠᱩᱞ ᱟᱨ ᱤᱱᱴᱟᱨ",
  board_card_upmsp_desc: "᱕᱕ ᱞᱟᱠᱷ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ • ᱚᱨᱡᱚ ᱯᱚᱨᱴᱟᱞ"
};

// ==========================================
// 9. Bodo (brx) Patches
// ==========================================
const bodoPatches = {
  quiz_bookmark_btn: "☆ बुकमार्क खालाम",
  nav_share_btn: "रानना हो (Share)",
  nav_whatsapp_btn: "हट्सएपआव रान",
  nav_install_app_btn: "एप इनस्टॉल खालाम",
  btn_top_scroll: "गोजौआव थां ↑",
  ticker_item_1: "SSC GD कन्सटेबल २०२६ अनलाइन आरज",
  ticker_item_2: "UP पुलिस कन्सटेबल ६०,२४४ आनजाद",
  ticker_item_3: "CBSE थाखो १० आरो १२ आनजाद",
  ticker_item_4: "रेलवे RRB ALP १८,७९९ मासि • अनलाइन",
  ticker_item_5: "NTA NEET UG २०२६ काउन्सिलिं",
  ticker_item_6: "बिहार पुलिस CSBC कन्सटेबल आनजाद",
  board_card_cbse_title: "CBSE थाखो १० आरो १२ बर्ड",
  board_card_cbse_desc: "आनजाद फिननाय आरो फिथाय नायगिर",
  board_card_upmsp_title: "UP बर्ड हाइस्कुल आरो इन्टार",
  board_card_upmsp_desc: "५५ लाख फरायसुला • फिथाय पोर्टल"
};

// Apply patches into I18N_DATA
function applyDictPatches(lang, patches) {
  if (!I18N_DATA[lang]) return;
  for (const [k, v] of Object.entries(patches)) {
    if (I18N_DATA[lang].hasOwnProperty(k)) {
      I18N_DATA[lang][k] = v;
    }
  }
}

applyDictPatches('hi-latn', hinglishPatches);
applyDictPatches('ur', persoArabicShared);
applyDictPatches('ks', persoArabicShared);
applyDictPatches('sd', persoArabicShared);
applyDictPatches('mai', maithiliPatches);
applyDictPatches('bho', bhojpuriPatches);
applyDictPatches('doi', dogriPatches);
applyDictPatches('ne', nepaliPatches);
applyDictPatches('kok', konkaniPatches);
applyDictPatches('sat', santaliPatches);
applyDictPatches('brx', bodoPatches);

// Re-serialize i18n.js
const header = fs.readFileSync(path.join(__dirname, 'refactor_i18n_split.js'), 'utf8');

// Use existing code up to const I18N_DATA =
const splitIndex = code.indexOf('const I18N_DATA =');
const topPart = code.slice(0, splitIndex);

// Find end of EXTENDED_I18N_DATA
const funcIndex = code.indexOf('const RTL_LANGUAGES =');
const bottomPart = code.slice(funcIndex);

const newCode = `${topPart}const I18N_DATA = ${JSON.stringify(I18N_DATA, null, 2)};\n\nconst EXTENDED_I18N_DATA = ${JSON.stringify(EXTENDED_I18N_DATA, null, 2)};\n\n${bottomPart}`;

fs.writeFileSync(i18nPath, newCode, 'utf8');
console.log('Successfully patched all language dictionaries in public/js/i18n.js!');

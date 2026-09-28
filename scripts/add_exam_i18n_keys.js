const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'public', 'js', 'i18n.js');
let fileContent = fs.readFileSync(i18nPath, 'utf8');

const newKeysByLocale = {
  en: {
    quiz_badge_practice: "Practice Mode Active",
    quiz_attempt_all: "Attempt All Questions",
    quiz_attempt_n_of_m: "Attempt any {n} of {m} Questions",
    quiz_each_question: "Each question: +{marks} mark",
    quiz_in_english_dual: "In English / Dual Medium:",
    quiz_palette_title: "Question Palette (Jump to question):",
    quiz_palette_answered: "Answered",
    quiz_palette_review: "Marked for Review",
    quiz_palette_not_visited: "Not Visited",
    quiz_palette_unanswered: "Unanswered",
    notes_high_yield_title: "Verified PYQ Collection & Formula Sheet",
    notes_syllabus_aligned: "✓ Syllabus Aligned Practice",
    notes_ready_made_title: "🔥 Ready-Made Notes & Practice Guides",
    notes_download_btn: "⚡ Download Complete PDF (₹9 UPI)"
  },
  hi: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सभी प्रश्न हल करें",
    quiz_attempt_n_of_m: "किन्हीं {n}/{m} प्रश्नों को हल करें",
    quiz_each_question: "प्रत्येक प्रश्न: +{marks} अंक",
    quiz_in_english_dual: "अंग्रेजी / द्विभाषी माध्यम:",
    quiz_palette_title: "प्रश्न पैलेट (किसी भी प्रश्न पर सीधे जाएं):",
    quiz_palette_answered: "उत्तर दिया",
    quiz_palette_review: "समीक्षा के लिए",
    quiz_palette_not_visited: "देखा नहीं",
    quiz_palette_unanswered: "अनुत्तरित",
    notes_high_yield_title: "विगत वर्षों के महत्वपूर्ण प्रश्न (PYQ) एवं संपूर्ण फॉर्मूला शीट PDF तैयार करें",
    notes_syllabus_aligned: "✓ आधिकारिक पाठ्यक्रम आधारित",
    notes_ready_made_title: "🔥 रेडी-मेड परीक्षा नोट्स एवं प्रैक्टिस गाइड्स",
    notes_download_btn: "⚡ संपूर्ण PDF डाउनलोड करें (₹9 UPI)"
  },
  "hi-latn": {
    quiz_badge_practice: "Abhyas Mode Sakriya",
    quiz_attempt_all: "Sabhi Prashn Hal Karein",
    quiz_attempt_n_of_m: "Kinhi {n}/{m} Prashnon Ko Hal Karein",
    quiz_each_question: "Pratyek Prashn: +{marks} Ank",
    quiz_in_english_dual: "In English / Dual Medium:",
    quiz_palette_title: "Question Palette (Direct Jump):",
    quiz_palette_answered: "Answered",
    quiz_palette_review: "Marked for Review",
    quiz_palette_not_visited: "Not Visited",
    quiz_palette_unanswered: "Unanswered",
    notes_high_yield_title: "PYQ Collection & Formula Sheet",
    notes_syllabus_aligned: "✓ Syllabus Aligned Practice",
    notes_ready_made_title: "🔥 Ready-Made Notes & Practice Guides",
    notes_download_btn: "⚡ Download Complete PDF (₹9 UPI)"
  },
  ta: {
    quiz_badge_practice: "பயிற்சி முறை செயலில் உள்ளது",
    quiz_attempt_all: "அனைத்து கேள்விகளையும் முயற்சிக்கவும்",
    quiz_attempt_n_of_m: "எந்த {n}/{m} கேள்விகளையும் முயற்சிக்கவும்",
    quiz_each_question: "ஒவ்வொரு கேள்வி: +{marks} மதிப்பெண்",
    quiz_in_english_dual: "ஆங்கிலம் / இருமொழி ஊடகம்:",
    quiz_palette_title: "கேள்வி பலகம் (நேரடியாக செல்ல):",
    quiz_palette_answered: "பதிலளிக்கப்பட்டது",
    quiz_palette_review: "மறுஆய்வுக்கு குறிக்கப்பட்டது",
    quiz_palette_not_visited: "பார்க்கவில்லை",
    quiz_palette_unanswered: "பதிலளிக்கப்படவில்லை",
    notes_high_yield_title: "சரிபார்க்கப்பட்ட PYQ தொகுப்பு மற்றும் சூத்திரத் தாள்",
    notes_syllabus_aligned: "✓ பாடத்திட்ட சீரமைக்கப்பட்ட பயிற்சி",
    notes_ready_made_title: "🔥 தயார் நிலை குறிப்புகள் மற்றும் பயிற்சி வழிகாட்டிகள்",
    notes_download_btn: "⚡ முழுமையான PDF பதிவிறக்குங்கள் (₹9 UPI)"
  },
  te: {
    quiz_badge_practice: "ప్రాక్టీస్ మోడ్ యాక్టివ్",
    quiz_attempt_all: "అన్ని ప్రశ్నలను ప్రయత్నించండి",
    quiz_attempt_n_of_m: "ఏవైనా {n}/{m} ప్రశ్నలను ప్రయత్నించండి",
    quiz_each_question: "ప్రతి ప్రశ్న: +{marks} మార్కు",
    quiz_in_english_dual: "ఇంగ్లీష్ / ద్విభాషా మాధ్యమం:",
    quiz_palette_title: "ప్రశ్న పాలెట్ (నేరుగా వెళ్ళండి):",
    quiz_palette_answered: "సమాధానమిచ్చారు",
    quiz_palette_review: "సమీక్ష కోసం గుర్తించబడింది",
    quiz_palette_not_visited: "చూడలేదు",
    quiz_palette_unanswered: "సమాధానం ఇవ్వలేదు",
    notes_high_yield_title: "ధృవీకరించబడిన PYQ సేకరణ & ఫార్ములా షీట్",
    notes_syllabus_aligned: "✓ సిలబస్ అనుగుణ్యమైన అభ్యాసం",
    notes_ready_made_title: "🔥 సిద్ధంగా ఉన్న నోట్స్ & ప్రాక్టీస్ గైడ్స్",
    notes_download_btn: "⚡ పూర్తి PDF డౌన్‌లోడ్ చేసుకోండి (₹9 UPI)"
  },
  mr: {
    quiz_badge_practice: "सराव मोड सक्रिय",
    quiz_attempt_all: "सर्व प्रश्न सोडवा",
    quiz_attempt_n_of_m: "कोणतेही {n}/{m} प्रश्न सोडवा",
    quiz_each_question: "प्रत्येक प्रश्न: +{marks} गुण",
    quiz_in_english_dual: "इंग्रजी / द्विभाषिक माध्यम:",
    quiz_palette_title: "प्रश्न पॅलेट (थेट प्रश्नावर जा):",
    quiz_palette_answered: "उत्तर दिले",
    quiz_palette_review: "पुनरावलोकनासाठी चिन्हांकित",
    quiz_palette_not_visited: "भेट दिली नाही",
    quiz_palette_unanswered: "अनुत्तरित",
    notes_high_yield_title: "मागील वर्षांचे प्रश्न (PYQ) आणि सूत्र पत्रिका",
    notes_syllabus_aligned: "✓ अभ्यासक्रमावर आधारित सराव",
    notes_ready_made_title: "🔥 तयार नोट्स आणि सराव मार्गदर्शक",
    notes_download_btn: "⚡ संपूर्ण PDF डाउनलोड करा (₹9 UPI)"
  },
  bn: {
    quiz_badge_practice: "অনুশীলন মোড সক্রিয়",
    quiz_attempt_all: "সমস্ত প্রশ্নের উত্তর দিন",
    quiz_attempt_n_of_m: "যে কোনো {n}/{m} প্রশ্নের উত্তর দিন",
    quiz_each_question: "প্রতিটি প্রশ্ন: +{marks} নম্বর",
    quiz_in_english_dual: "ইংরেজি / দ্বিভাষিক মাধ্যম:",
    quiz_palette_title: "প্রশ্ন প্যালেট (সরাসরি প্রশ্নে যান):",
    quiz_palette_answered: "উত্তর দেওয়া হয়েছে",
    quiz_palette_review: "পুনর্বিবেচনার জন্য চিহ্নিত",
    quiz_palette_not_visited: "দেখা হয়নি",
    quiz_palette_unanswered: "অননুত্তরিত",
    notes_high_yield_title: "যাচাইকৃত PYQ সংগ্রহ ও সূত্র পত্রিকা",
    notes_syllabus_aligned: "✓ পাঠ্যক্রম ভিত্তিক অনুশীলন",
    notes_ready_made_title: "🔥 প্রস্তুত নোট ও অনুশীলন নির্দেশিকা",
    notes_download_btn: "⚡ সম্পূর্ণ PDF ডাউনলোড করুন (₹9 UPI)"
  },
  gu: {
    quiz_badge_practice: "અભ્યાસ મોડ સક્રિય",
    quiz_attempt_all: "બધા પ્રશ્નોના ઉત્તર આપો",
    quiz_attempt_n_of_m: "કોઈપણ {n}/{m} પ્રશ્નોના ઉત્તર આપો",
    quiz_each_question: "દરેક પ્રશ્ન: +{marks} ગુણ",
    quiz_in_english_dual: "અંગ્રેજી / દ્વિભાષી માધ્યમ:",
    quiz_palette_title: "પ્રશ્ન પેલેટ (સીધા પ્રશ્ન પર જાઓ):",
    quiz_palette_answered: "જવાબ આપ્યો",
    quiz_palette_review: "પુનરાવર્તન માટે ચિહ્નિત",
    quiz_palette_not_visited: "જોયું નથી",
    quiz_palette_unanswered: "અનુત્તરિત",
    notes_high_yield_title: "ચકાસાયેલ PYQ સંગ્રહ અને ફોર્મ્યુલા શીટ",
    notes_syllabus_aligned: "✓ અભ્યાસક્રમ આધારિત પ્રેક્ટિસ",
    notes_ready_made_title: "🔥 તૈયાર નોટ્સ અને પ્રેક્ટિસ ગાઇડ્સ",
    notes_download_btn: "⚡ સંપૂર્ણ PDF ડાઉનલોડ કરો (₹9 UPI)"
  },
  kn: {
    quiz_badge_practice: "ಅಭ್ಯಾಸ ಮೋಡ್ ಸಕ್ರಿಯ",
    quiz_attempt_all: "ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳನ್ನು ಉತ್ತರಿಸಿ",
    quiz_attempt_n_of_m: "ಯಾವುದೇ {n}/{m} ಪ್ರಶ್ನೆಗಳನ್ನು ಉತ್ತರಿಸಿ",
    quiz_each_question: "ಪ್ರತಿ ಪ್ರಶ್ನೆ: +{marks} ಅಂಕ",
    quiz_in_english_dual: "ಇಂಗ್ಲಿಷ್ / ದ್ವಿಭಾಷಾ ಮಾಧ್ಯಮ:",
    quiz_palette_title: "ಪ್ರಶ್ನೆ ಪ್ಯಾಲೆಟ್ (ನೇರವಾಗಿ ಹೋಗಿ):",
    quiz_palette_answered: "ಉತ್ತರಿಸಲಾಗಿದೆ",
    quiz_palette_review: "ಮರುಪರಿಶೀಲನೆಗೆ ಗುರುತಿಸಲಾಗಿದೆ",
    quiz_palette_not_visited: "ನೋಡಿಲ್ಲ",
    quiz_palette_unanswered: "ಉತ್ತರಿಸಿಲ್ಲ",
    notes_high_yield_title: "ಪರಿಶೀಲಿಸಿದ PYQ ಸಂಗ್ರಹ ಮತ್ತು ಸೂತ್ರ ಹಾಳೆ",
    notes_syllabus_aligned: "✓ ಪಠ್ಯಕ್ರಮ ಆಧಾರಿತ ಅಭ್ಯಾಸ",
    notes_ready_made_title: "🔥 ಸಿದ್ಧ ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಅಭ್ಯಾಸ ಮಾರ್ಗದರ್ಶಿಗಳು",
    notes_download_btn: "⚡ ಸಂಪೂರ್ಣ PDF ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (₹9 UPI)"
  },
  ml: {
    quiz_badge_practice: "പരിശീലന മോഡ് സജീവം",
    quiz_attempt_all: "എല്ലാ ചോദ്യങ്ങൾക്കും ഉത്തരം നൽകുക",
    quiz_attempt_n_of_m: "ഏതെങ്കിലും {n}/{m} ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക",
    quiz_each_question: "ഓരോ ചോദ്യം: +{marks} മാർക്ക്",
    quiz_in_english_dual: "ഇംഗ്ലീഷ് / ദ്വിഭാഷാ മാധ്യമം:",
    quiz_palette_title: "ചോദ്യ പാലറ്റ് (നേരിട്ട് പോകുക):",
    quiz_palette_answered: "ഉത്തരം നൽകി",
    quiz_palette_review: "പുനരവലോകനത്തിനായി അടയാളപ്പെടുത്തി",
    quiz_palette_not_visited: "സന്ദർശിച്ചില്ല",
    quiz_palette_unanswered: "ഉത്തരമില്ലാത്തവ",
    notes_high_yield_title: "സ്ഥിരീകരിച്ച PYQ ശേഖരവും ഫോർമുല ഷീറ്റും",
    notes_syllabus_aligned: "✓ സിലബസ് അടിസ്ഥാനമാക്കിയുള്ള പരിശീലനം",
    notes_ready_made_title: "🔥 തയ്യാറാക്കിയ നോട്ടുകളും പരിശീലന ഗൈഡുകളും",
    notes_download_btn: "⚡ പൂർണ്ണ PDF ഡൗൺലോഡ് ചെയ്യുക (₹9 UPI)"
  },
  pa: {
    quiz_badge_practice: "ਅਭਿਆਸ ਮੋਡ ਸਰਗਰਮ",
    quiz_attempt_all: "ਸਾਰੇ ਸਵਾਲ ਹੱਲ ਕਰੋ",
    quiz_attempt_n_of_m: "ਕੋਈ ਵੀ {n}/{m} ਸਵਾਲ ਹੱਲ ਕਰੋ",
    quiz_each_question: "ਹਰੇਕ ਸਵਾਲ: +{marks} ਅੰਕ",
    quiz_in_english_dual: "ਅੰਗਰੇਜ਼ੀ / ਦੋਭਾਸ਼ੀ ਮਾਧਿਅਮ:",
    quiz_palette_title: "ਸਵਾਲ ਪੈਲੇਟ (ਸਿੱਧੇ ਸਵਾਲ 'ਤੇ ਜਾਓ):",
    quiz_palette_answered: "ਉੱਤਰ ਦਿੱਤਾ",
    quiz_palette_review: "ਸਮੀਖਿਆ ਲਈ ਚਿੰਨ੍ਹਿਤ",
    quiz_palette_not_visited: "ਨਹੀਂ ਦੇਖਿਆ",
    quiz_palette_unanswered: "ਅਣ-ਉੱਤਰਿਆ",
    notes_high_yield_title: "ਪ੍ਰਮਾਣਿਤ PYQ ਸੰਗ੍ਰਹਿ ਅਤੇ ਫਾਰਮੂਲਾ ਸ਼ੀਟ",
    notes_syllabus_aligned: "✓ ਸਿਲੇਬਸ ਆਧਾਰਿਤ ਅਭਿਆਸ",
    notes_ready_made_title: "🔥 ਤਿਆਰ ਨੋਟਸ ਅਤੇ ਅਭਿਆਸ ਗਾਈਡਾਂ",
    notes_download_btn: "⚡ ਪੂਰੀ PDF ਡਾਊਨਲੋਡ ਕਰੋ (₹9 UPI)"
  },
  ur: {
    quiz_badge_practice: "مشق موڈ فعال",
    quiz_attempt_all: "تمام سوالات حل کریں",
    quiz_attempt_n_of_m: "کوئی بھی {n}/{m} سوالات حل کریں",
    quiz_each_question: "ہر سوال: +{marks} نمبر",
    quiz_in_english_dual: "انگریزی / دو لسانی ذریعہ:",
    quiz_palette_title: "سوال پیلیٹ (براہ راست سوال پر جائیں):",
    quiz_palette_answered: "جواب دیا",
    quiz_palette_review: "نظرثانی کے لیے نشان زد",
    quiz_palette_not_visited: "نہیں دیکھا گیا",
    quiz_palette_unanswered: "غیر جواب شدہ",
    notes_high_yield_title: "تصدیق شدہ PYQ مجموعہ اور فارمولا شیٹ",
    notes_syllabus_aligned: "✓ نصاب کے مطابق مشق",
    notes_ready_made_title: "🔥 تیار شدہ نوٹس اور پریکٹس گائیڈز",
    notes_download_btn: "⚡ مکمل PDF ڈاؤن لوڈ کریں (₹9 UPI)"
  },
  or: {
    quiz_badge_practice: "ଅଭ୍ୟାସ ମୋଡ୍ ସକ୍ରିୟ",
    quiz_attempt_all: "ସମସ୍ତ ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ",
    quiz_attempt_n_of_m: "ଯେକୌଣସି {n}/{m} ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ",
    quiz_each_question: "ପ୍ରତ୍ୟେକ ପ୍ରଶ୍ନ: +{marks} ନମ୍ବର",
    quiz_in_english_dual: "ଇଂରାଜୀ / ଦ୍ୱିଭାଷୀ ମାଧ୍ୟମ:",
    quiz_palette_title: "ପ୍ରଶ୍ନ ପ୍ୟାଲେଟ୍ (ସିଧାସଳଖ ଯାଆନ୍ତୁ):",
    quiz_palette_answered: "ଉତ୍ତର ଦିଆଯାଇଛି",
    quiz_palette_review: "ପୁନର୍ବିଚାର ପାଇଁ ଚିହ୍ନିତ",
    quiz_palette_not_visited: "ଦେଖାଯାଇ ନାହିଁ",
    quiz_palette_unanswered: "ଅନୁତ୍ତରିତ",
    notes_high_yield_title: "ଯାଞ୍ଚ ହୋଇଥିବା PYQ ସଂଗ୍ରହ ଏବଂ ଫର୍ମୁଲା ସିଟ୍",
    notes_syllabus_aligned: "✓ ପାଠ୍ୟକ୍ରମ ଆଧାରିତ ଅଭ୍ୟାସ",
    notes_ready_made_title: "🔥 ପ୍ରସ୍ତୁତ ନୋଟ୍ସ ଏବଂ ଅଭ୍ୟାସ ଗାଇଡ୍",
    notes_download_btn: "⚡ ସମ୍ପୂର୍ଣ୍ଣ PDF ଡାଉନଲୋଡ୍ କରନ୍ତୁ (₹9 UPI)"
  },
  sa: {
    quiz_badge_practice: "अभ्यासविधा सक्रियम्",
    quiz_attempt_all: "सर्वान् प्रश्नान् समादधतु",
    quiz_attempt_n_of_m: "कानिचित् {n}/{m} प्रश्नान् समादधतु",
    quiz_each_question: "प्रत्येकप्रश्नः: +{marks} अङ्काः",
    quiz_in_english_dual: "आङ्ग्ल / द्विभाषी माध्यमः:",
    quiz_palette_title: "प्रश्नपट्टिका (प्रत्यक्षं गच्छतु):",
    quiz_palette_answered: "उत्तरितम्",
    quiz_palette_review: "पुनरीक्षणार्थं चिह्नितम्",
    quiz_palette_not_visited: "न दृष्टम्",
    quiz_palette_unanswered: "अनुत्तरितम्",
    notes_high_yield_title: "प्रमाणितं PYQ संग्रहः सूत्रपत्रिका च",
    notes_syllabus_aligned: "✓ पाठ्यक्रमानुकूलः अभ्यासः",
    notes_ready_made_title: "🔥 सिद्धानि पत्राणि अभ्यासदर्शिकाः च",
    notes_download_btn: "⚡ सम्पूर्णं PDF अवतरणम् (₹9 UPI)"
  },
  as: {
    quiz_badge_practice: "অনুশীলন ম'ড সক্ৰিয়",
    quiz_attempt_all: "সকলো প্ৰশ্ন সমাধান কৰক",
    quiz_attempt_n_of_m: "যিকোনো {n}/{m} টা প্ৰশ্ন সমাধান কৰক",
    quiz_each_question: "প্ৰতিটো প্ৰশ্ন: +{marks} নম্বৰ",
    quiz_in_english_dual: "ইংৰাজী / দ্বিভাষিক মাধ্যম:",
    quiz_palette_title: "প্ৰশ্ন পেলেট (পোনপটীয়াকৈ যাওক):",
    quiz_palette_answered: "উত্তৰ দিয়া হৈছে",
    quiz_palette_review: "পুনৰীক্ষণৰ বাবে চিহ্নিত",
    quiz_palette_not_visited: "চোৱা হোৱা নাই",
    quiz_palette_unanswered: "অননুত্তৰিত",
    notes_high_yield_title: "যাচাই কৰা PYQ সংগ্ৰহ আৰু সূত্ৰ পত্ৰিকা",
    notes_syllabus_aligned: "✓ পাঠ্যক্ৰম ভিত্তিক অনুশীলন",
    notes_ready_made_title: "🔥 প্ৰস্তুত টোকা আৰু অনুশীলন নিৰ্দেশিকা",
    notes_download_btn: "⚡ সম্পূৰ্ণ PDF ডাউনলোড কৰক (₹9 UPI)"
  },
  mai: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सभ प्रश्न हल करू",
    quiz_attempt_n_of_m: "कोनो {n}/{m} प्रश्न हल करू",
    quiz_each_question: "प्रत्येक प्रश्न: +{marks} अंक",
    quiz_in_english_dual: "अंग्रेजी / द्विभाषी माध्यम:",
    quiz_palette_title: "प्रश्न पैलेट (सीधे प्रश्न पर जाउ):",
    quiz_palette_answered: "उत्तर देल गेल",
    quiz_palette_review: "समीक्षा लेल चिह्नित",
    quiz_palette_not_visited: "नहि देखल गेल",
    quiz_palette_unanswered: "अनुत्तरित",
    notes_high_yield_title: "प्रमाणित PYQ संग्रह आ सूत्र पत्रिका",
    notes_syllabus_aligned: "✓ पाठ्यक्रम आधारित अभ्यास",
    notes_ready_made_title: "🔥 तैयार नोट्स आ प्रैक्टिस गाइड्स",
    notes_download_btn: "⚡ सम्पूर्ण PDF डाउनलोड करू (₹9 UPI)"
  },
  bho: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सभ सवाल हल करीं",
    quiz_attempt_n_of_m: "कवनो {n}/{m} सवाल हल करीं",
    quiz_each_question: "हर सवाल: +{marks} अंक",
    quiz_in_english_dual: "अंग्रेजी / दुभाषी माध्यम:",
    quiz_palette_title: "सवाल पैलेट (सीधे सवाल पर जाईं):",
    quiz_palette_answered: "जवाब दिहल गइल",
    quiz_palette_review: "समीक्षा खातिर चिह्नित",
    quiz_palette_not_visited: "ना देखल गइल",
    quiz_palette_unanswered: "बिन जवाब के",
    notes_high_yield_title: "जाँचल PYQ संग्रह आ फॉर्मूला शीट",
    notes_syllabus_aligned: "✓ सिलेबस आधारित अभ्यास",
    notes_ready_made_title: "🔥 तइयार नोट्स आ प्रैक्टिस गाइड्स",
    notes_download_btn: "⚡ पूरा PDF डाउनलोड करीं (₹9 UPI)"
  },
  ne: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सबै प्रश्नहरू हल गर्नुहोस्",
    quiz_attempt_n_of_m: "कुनै {n}/{m} प्रश्नहरू हल गर्नुहोस्",
    quiz_each_question: "प्रत्येक प्रश्न: +{marks} अंक",
    quiz_in_english_dual: "अंग्रेजी / द्विभाषी माध्यम:",
    quiz_palette_title: "प्रश्न प्यालेट (सिधै प्रश्नमा जानुहोस्):",
    quiz_palette_answered: "उत्तर दिइयो",
    quiz_palette_review: "समीक्षाको लागि चिन्हित",
    quiz_palette_not_visited: "हेरिएको छैन",
    quiz_palette_unanswered: "अनुत्तरित",
    notes_high_yield_title: "प्रमाणित PYQ संग्रह र सूत्र पाना",
    notes_syllabus_aligned: "✓ पाठ्यक्रम आधारित अभ्यास",
    notes_ready_made_title: "🔥 तयार नोटहरू र अभ्यास गाइडहरू",
    notes_download_btn: "⚡ सम्पूर्ण PDF डाउनलोड गर्नुहोस् (₹9 UPI)"
  },
  kok: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सगळे प्रस्न सोडोवचे",
    quiz_attempt_n_of_m: "खंयचेय {n}/{m} प्रस्न सोडोवचे",
    quiz_each_question: "दर एक प्रस्न: +{marks} गूण",
    quiz_in_english_dual: "इंग्लीश / दोन भाशी माध्यम:",
    quiz_palette_title: "प्रस्न पॅलेट (थेट प्रस्नाचेर वचात):",
    quiz_palette_answered: "जाप दिली",
    quiz_palette_review: "पुनर्विमर्श खातीर खूण केल्ली",
    quiz_palette_not_visited: "पळोवंक ना",
    quiz_palette_unanswered: "जाप दिवंक ना",
    notes_high_yield_title: "तपासिल्लो PYQ संग्रह आनी सूत्र पत्रक",
    notes_syllabus_aligned: "✓ अभ्यासक्रमाचेर आदारीत सराव",
    notes_ready_made_title: "🔥 तयार नोट्स आनी सराव मार्गदर्शक",
    notes_download_btn: "⚡ पुराय PDF डावनलोड करात (₹9 UPI)"
  },
  sd: {
    quiz_badge_practice: "مشق موڊ فعال",
    quiz_attempt_all: "سڀ سوال حل ڪريو",
    quiz_attempt_n_of_m: "ڪو به {n}/{m} سوال حل ڪريو",
    quiz_each_question: "هر سوال: +{marks} مارڪ",
    quiz_in_english_dual: "انگريزي / ٻه لساني ذريعو:",
    quiz_palette_title: "سوال پيليٽ (سڌو سوال تي وڃو):",
    quiz_palette_answered: "جواب ڏنو ويو",
    quiz_palette_review: "نظرثاني لاءِ نشان لڳل",
    quiz_palette_not_visited: "نه ڏٺو ويو",
    quiz_palette_unanswered: "جواب نه ڏنل",
    notes_high_yield_title: "تصديق ٿيل PYQ گڏجاڻي ۽ فارمولا شيٽ",
    notes_syllabus_aligned: "✓ نصاب مطابق مشق",
    notes_ready_made_title: "🔥 تيار نوٽس ۽ مشق رهنما",
    notes_download_btn: "⚡ مڪمل PDF ڊائون لوڊ ڪريو (₹9 UPI)"
  },
  doi: {
    quiz_badge_practice: "अभ्यास मोड सक्रिय",
    quiz_attempt_all: "सारे सवाल हल करो",
    quiz_attempt_n_of_m: "कोई बी {n}/{m} सवाल हल करो",
    quiz_each_question: "हर सवाल: +{marks} नंबर",
    quiz_in_english_dual: "अंग्रेजी / दुभाषी माध्यम:",
    quiz_palette_title: "सवाल पैलेट (सीधे सवाल पर जाओ):",
    quiz_palette_answered: "जबाब दित्ता",
    quiz_palette_review: "समीक्षा लेई चिह्नित",
    quiz_palette_not_visited: "नी दिक्खेआ",
    quiz_palette_unanswered: "अणजबाबी",
    notes_high_yield_title: "प्रमाणित PYQ संग्रह ते फॉर्मूला शीट",
    notes_syllabus_aligned: "✓ पाठ्यक्रम आधारित अभ्यास",
    notes_ready_made_title: "🔥 त्यार नोट्स ते अभ्यास गाइड",
    notes_download_btn: "⚡ पूरा PDF डाउनलोड करो (₹9 UPI)"
  },
  ks: {
    quiz_badge_practice: "مشق موڈ چالو",
    quiz_attempt_all: "سٲری سوال حل کٔرِو",
    quiz_attempt_n_of_m: "کانٛہہ تہِ {n}/{m} سوال حل کٔرِو",
    quiz_each_question: "پریتھ سوال: +{marks} نمبر",
    quiz_in_english_dual: "انٛگریزی / دۄلسٲنی ذٔریعہٕ:",
    quiz_palette_title: "سوال پیلیٹ (سیدھے سوالس پؠٹھ گژھِو):",
    quiz_palette_answered: "جواب دِیُت",
    quiz_palette_review: "نَظرِثٲنی خٲطرٕ نِشان لگٲوِتھ",
    quiz_palette_not_visited: "نہٕ وُچھمُت",
    quiz_palette_unanswered: "بے جواب",
    notes_high_yield_title: "تَصدیٖق شُدٕ PYQ مَجموعہٕ تہٕ فارمولا شیٖٹ",
    notes_syllabus_aligned: "✓ نِصابَس مُطٲبِق مَشق",
    notes_ready_made_title: "🔥 تیار نوٹس تہٕ مَشق ہَینڈبُک",
    notes_download_btn: "⚡ پوٗرٕ PDF ڈاوٗنلوڈ کٔرِو (₹9 UPI)"
  },
  sat: {
    quiz_badge_practice: "ᱵᱤᱰᱟᱹᱣ ᱢᱳᱰ ᱪᱟᱹᱞᱩ",
    quiz_attempt_all: "ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱛᱮᱞᱟᱭ ᱢᱮ",
    quiz_attempt_n_of_m: "ᱡᱟᱦᱟᱸᱱᱟᱜ {n}/{m} ᱠᱩᱠᱞᱤ ᱛᱮᱞᱟᱭ ᱢᱮ",
    quiz_each_question: "ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ: +{marks} ᱱᱚᱢᱵᱚᱨ",
    quiz_in_english_dual: "ᱤᱝᱨᱟᱹᱡᱤ / ᱵᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱛᱮ:",
    quiz_palette_title: "ᱠᱩᱠᱞᱤ ᱯᱮᱞᱮᱴ (ᱥᱚᱡᱷᱮ ᱥᱮᱱᱚᱜ):",
    quiz_palette_answered: "ᱛᱮᱞᱟ ᱮᱢ ᱮᱱᱟ",
    quiz_palette_review: "ᱧᱮᱞ ᱨᱩᱣᱟᱹᱲ ᱞᱟᱹᱜᱤᱫ ᱪᱤᱱᱦᱟᱹ",
    quiz_palette_not_visited: "ᱵᱟᱝ ᱧᱮᱞ ᱟᱠᱟᱱᱟ",
    quiz_palette_unanswered: "ᱵᱟᱝ ᱛᱮᱞᱟ ᱟᱠᱟᱱᱟ",
    notes_high_yield_title: "ᱯᱩᱨᱟᱹᱣ ᱟᱠᱟᱱ PYQ ᱛᱩᱢᱟᱹᱞ ᱟᱨ ᱯᱷᱚᱨᱢᱩᱞᱟ ᱥᱟᱠᱟᱢ",
    notes_syllabus_aligned: "✓ ᱥᱤᱞᱟᱵᱟᱥ ᱞᱮᱠᱟᱛᱮ ᱵᱤᱰᱟᱹᱣ",
    notes_ready_made_title: "🔥 ᱥᱟᱯᱲᱟᱣ ᱱᱳᱴᱥ ᱟᱨ ᱯᱟᱲᱦᱟᱣ ᱫᱤᱥᱟᱹ",
    notes_download_btn: "⚡ ᱯᱩᱨᱟᱹ PDF ᱰᱟᱣᱩᱱᱞᱳᱰ (₹9 UPI)"
  },
  brx: {
    quiz_badge_practice: "सोंनाय मड' जागायबाय",
    quiz_attempt_all: "गासै सोंनायफोरखौ फिननाय हो",
    quiz_attempt_n_of_m: "जेखि जाया {n}/{m} सोंनायखौ फिननाय हो",
    quiz_each_question: "सोंनायफायाव: +{marks} नम्बर",
    quiz_in_english_dual: "इंग्राजि / मोननै रावजों:",
    quiz_palette_title: "सोंनाय पेलेट (थोंजों सोंनायाव थां):",
    quiz_palette_answered: "फिननाय होनाय जाबाय",
    quiz_palette_review: "नायफिननायनि थाखाय दाग होनाय",
    quiz_palette_not_visited: "नायाखै",
    quiz_palette_unanswered: "फिननाय होयै",
    notes_high_yield_title: "आनजाद खालामनाय PYQ बुथुमनाय आरो फर्मुला बिलाइ",
    notes_syllabus_aligned: "✓ फरायफारि बादियै सोंनाय",
    notes_ready_made_title: "🔥 थियारि न'ट आरो आनजाद बिथोन",
    notes_download_btn: "⚡ गासै PDF दाउनल'द खालाम (₹9 UPI)"
  },
  mni: {
    quiz_badge_practice: "ꯄ꯭ꯔꯦꯛꯇꯤꯁ ꯃꯣꯗ ꯆꯠꯊꯔꯤ",
    quiz_attempt_all: "ꯋꯥꯍꯪ ꯈꯨꯗꯤꯡꯃꯛ ꯄꯥꯎꯈꯨꯝ ꯄꯤꯕꯤꯌꯨ",
    quiz_attempt_n_of_m: "ꯋꯥꯍꯪ {n}/{m} ꯈꯨꯗꯤꯡꯃꯛ ꯄꯥꯎꯈꯨꯝ ꯄꯤꯕꯤꯌꯨ",
    quiz_each_question: "ꯋꯥꯍꯪ ꯑꯃꯃꯃꯗ: +{marks} ꯃꯥꯔꯛ",
    quiz_in_english_dual: "ꯏꯪꯂꯤꯁ / ꯂꯣꯟ ꯑꯅꯤꯒꯤ ꯃꯑꯣꯡꯗ:",
    quiz_palette_title: "ꯋꯥꯍꯪ ꯄꯦꯂꯦꯠ (ꯋꯥꯍꯪꯗ ꯍꯛꯊꯦꯡꯅꯅ ꯆꯠꯄ):",
    quiz_palette_answered: "ꯄꯥꯎꯈꯨꯝ ꯄꯤꯔꯦ",
    quiz_palette_review: "ꯑꯃꯨꯛ ꯍꯟꯅ ꯌꯦꯡꯅꯕ ꯈꯨꯗꯝ ꯇꯧꯔꯦ",
    quiz_palette_not_visited: "ꯌꯦꯡꯗ꯭ꯔꯤ",
    quiz_palette_unanswered: "ꯄꯥꯎꯈꯨꯝ ꯄꯤꯗ꯭ꯔꯤ",
    notes_high_yield_title: "ꯆꯦꯛꯁꯤꯟꯅ ꯌꯦꯡꯁꯤꯜꯂꯕ PYQ ꯑꯃꯁꯨꯡ ꯐꯣꯔꯃꯨꯂꯥ ꯂꯥꯏꯔꯤꯛ",
    notes_syllabus_aligned: "✓ ꯁꯤꯂꯦꯕꯁꯀꯤ ꯃꯇꯨꯡꯏꯟꯅ ꯇꯝꯕ",
    notes_ready_made_title: "🔥 ꯁꯦꯝ ꯁꯥꯔꯕ ꯅꯣꯠꯁ ꯑꯃꯁꯨꯡ ꯂꯝꯖꯤꯡ ꯂꯥꯏꯔꯤꯛ",
    notes_download_btn: "⚡ ꯃꯄꯨꯡꯐꯥꯕ PDF ꯗꯥꯎꯟꯂꯣꯗ ꯇꯧꯕꯤꯌꯨ (₹9 UPI)"
  }
};

// Evaluate the current file content to get existing object
const fn = new Function(fileContent + '; return I18N_DATA;');
const data = fn();

const locales = Object.keys(data);
console.log('Locales found:', locales.length);

// Inject keys into each locale
for (const loc of locales) {
  if (!data[loc]) data[loc] = {};
  const additions = newKeysByLocale[loc] || newKeysByLocale['en'];
  for (const [k, v] of Object.entries(additions)) {
    data[loc][k] = v;
  }
}

// Check key count parity
const masterKeys = Object.keys(data.en);
console.log('Master keys in en after addition:', masterKeys.length);
let parityOk = true;
for (const loc of locales) {
  const locKeys = Object.keys(data[loc]);
  if (locKeys.length !== masterKeys.length) {
    console.error(`Mismatch in ${loc}: ${locKeys.length} vs ${masterKeys.length}`);
    parityOk = false;
  }
}

if (!parityOk) {
  console.error('Parity check failed!');
  process.exit(1);
}

// Regenerate i18n.js
const header = `/**
 * Universal Multilingual Translation Dictionary (24 Indian Languages + English & Hinglish)
 * Full Coverage for Government Exams, Study Tools, Document Verification, and Live CBT Engine
 * 100% Native Script Fidelity - Verified 2026
 */

const I18N_DATA = ${JSON.stringify(data, null, 2)};

// Language Direction Map
const RTL_LANGUAGES = ['ur', 'ks', 'sd'];

// Active language storage & retrieval
function getCurrentLanguage() {
  try {
    return localStorage.getItem('sarkariai_lang') || 'hi';
  } catch(e) {
    return 'hi';
  }
}

function getTranslation(key, lang = null) {
  const targetLang = lang || getCurrentLanguage();
  if (I18N_DATA[targetLang] && I18N_DATA[targetLang][key]) {
    return I18N_DATA[targetLang][key];
  }
  if (I18N_DATA['hi'] && I18N_DATA['hi'][key]) {
    return I18N_DATA['hi'][key];
  }
  if (I18N_DATA['en'] && I18N_DATA['en'][key]) {
    return I18N_DATA['en'][key];
  }
  return key;
}

function applyTranslations(lang = null) {
  const activeLang = lang || getCurrentLanguage();
  const isRTL = RTL_LANGUAGES.includes(activeLang);

  document.documentElement.lang = activeLang;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

  const translatableElements = document.querySelectorAll('[data-i18n]');
  translatableElements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getTranslation(key, activeLang);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = getTranslation(key, activeLang);
    if (translation) el.placeholder = translation;
  });

  const titles = document.querySelectorAll('[data-i18n-title]');
  titles.forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    const translation = getTranslation(key, activeLang);
    if (translation) el.title = translation;
  });

  // Keep select options in sync
  const langSelectors = document.querySelectorAll('.lang-selector-select');
  langSelectors.forEach(sel => {
    if (sel.value !== activeLang) sel.value = activeLang;
  });

  // Dispatch custom event for dynamic components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: activeLang, isRTL } }));
}

function setLanguage(lang) {
  if (!I18N_DATA[lang]) {
    console.warn('[I18N] Unsupported language:', lang);
    return;
  }
  try {
    localStorage.setItem('sarkariai_lang', lang);
  } catch(e) {}
  applyTranslations(lang);
}

// Global Exports
if (typeof window !== 'undefined') {
  window.I18N_DATA = I18N_DATA;
  window.RTL_LANGUAGES = RTL_LANGUAGES;
  window.getCurrentLanguage = getCurrentLanguage;
  window.getTranslation = getTranslation;
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    I18N_DATA,
    RTL_LANGUAGES,
    getCurrentLanguage,
    getTranslation,
    setLanguage,
    applyTranslations
  };
}

// Auto-run on DOM ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
  });
}
`;

fs.writeFileSync(i18nPath, header, 'utf8');
console.log('Successfully updated public/js/i18n.js with 100% key parity across all 25 locales!');

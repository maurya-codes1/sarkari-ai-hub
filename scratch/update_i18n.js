const fs = require('fs');
const path = require('path');

const NEW_KEYS = {
  "en": {
    "nav_alerts": "Job Alerts",
    "qual_all": "All Qualifications",
    "qual_10th": "10th Pass",
    "qual_12th": "12th Pass",
    "qual_grad": "Graduate",
    "qual_iti": "ITI / Diploma",
    "faq_title": "Frequently Asked Questions (FAQ)",
    "report_broken_btn": "Report Issue / Broken Link",
    "affiliate_books_title": "Recommended Preparation Books",
    "rate_portal_btn": "Rate Portal",
    "dpdp_consent_text": "We store preferences locally under DPDP Act 2023. No personal information is tracked or sold.",
    "dpdp_agree_btn": "Accept & Continue",
    "saved_exams_title": "Saved / Favorite Exams",
    "offline_banner_text": "You are currently offline. Cached materials and tools remain active.",
    "bookmark_btn": "Save Exam",
    "bookmarked_btn": "Saved"
  },
  "hi": {
    "nav_alerts": "नौकरी अलर्ट",
    "qual_all": "सभी योग्यताएं",
    "qual_10th": "10वीं पास",
    "qual_12th": "12वीं पास",
    "qual_grad": "स्नातक",
    "qual_iti": "आईटीआई / डिप्लोमा",
    "faq_title": "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    "report_broken_btn": "समस्या / टूटा लिंक रिपोर्ट करें",
    "affiliate_books_title": "अनुशंसित तैयारी पुस्तकें",
    "rate_portal_btn": "पोर्टल को रेटिंग दें",
    "dpdp_consent_text": "हम DPDP अधिनियम 2023 के तहत केवल स्थानीय प्राथमिकताओं को सहेजते हैं। कोई डेटा ट्रैक या बेचा नहीं जाता।",
    "dpdp_agree_btn": "स्वीकार करें",
    "saved_exams_title": "सहेजी गई परीक्षाएं",
    "offline_banner_text": "आप वर्तमान में ऑफ़लाइन हैं। पूर्व-लोड की गई सामग्री और टूल्स चालू रहेंगे।",
    "bookmark_btn": "परीक्षा सहेजें",
    "bookmarked_btn": "सहेजा गया"
  },
  "hi-latn": {
    "nav_alerts": "Job Alerts",
    "qual_all": "Sabhi Qualifications",
    "qual_10th": "10th Pass",
    "qual_12th": "12th Pass",
    "qual_grad": "Graduate",
    "qual_iti": "ITI / Diploma",
    "faq_title": "Frequently Asked Questions (FAQ)",
    "report_broken_btn": "Issue / Broken Link Report Karein",
    "affiliate_books_title": "Recommended Preparation Books",
    "rate_portal_btn": "Portal Ko Rate Karein",
    "dpdp_consent_text": "Hum DPDP Act 2023 ke mutabiq keval local browser preferences save karte hain. Koi personal data track nahi hota.",
    "dpdp_agree_btn": "Accept Karein",
    "saved_exams_title": "Saved / Favorite Exams",
    "offline_banner_text": "Aap abhi offline hain. Cached tools aur materials kaam karte rahenge.",
    "bookmark_btn": "Exam Save Karein",
    "bookmarked_btn": "Saved Hai"
  },
  "sa": {
    "nav_alerts": "कार्यविज्ञप्तयः",
    "qual_all": "सर्वाः योग्यताः",
    "qual_10th": "दशमी-उत्तीर्णाः",
    "qual_12th": "द्वादशी-उत्तीर्णाः",
    "qual_grad": "स्नातक-योग्याः",
    "qual_iti": "वृत्तिशिक्षण-उत्तीर्णाः",
    "faq_title": "प्रायः पृष्टाः प्रश्नाः (FAQ)",
    "report_broken_btn": "दोषं निवेदयतु",
    "affiliate_books_title": "अनुशंसितानि अभ्यासपुस्तकानि",
    "rate_portal_btn": "पोर्टल-मूल्याङ्कनं कुर्वन्तु",
    "dpdp_consent_text": "वयम् अत्र DPDP नियमानुसारेण स्थानीय-सङ्ग्रहणं कुर्मः। किमपि वैयक्तिक-विवरणं न विक्रेतव्यम्।",
    "dpdp_agree_btn": "स्वीकरोमि",
    "saved_exams_title": "संरक्षिताः परीक्षाः",
    "offline_banner_text": "भवन्तः सम्प्रति जालहीनाः (Offline) सन्ति। पूर्वसञ्चितानि साधनानि सुलभानि भविष्यन्ति।",
    "bookmark_btn": "परीक्षां संरक्षतु",
    "bookmarked_btn": "संरक्षितम्"
  },
  "bn": {
    "nav_alerts": "চাকরির সতর্কতা",
    "qual_all": "সকল যোগ্যতা",
    "qual_10th": "১০ম উত্তীর্ণ",
    "qual_12th": "১২শ উত্তীর্ণ",
    "qual_grad": "স্নাতক",
    "qual_iti": "আইটিআই / ডিপ্লোমা",
    "faq_title": "প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী (FAQ)",
    "report_broken_btn": "সমস্যা / অচল লিঙ্ক রিপোর্ট করুন",
    "affiliate_books_title": "প্রস্তুতির জন্য সেরা বই",
    "rate_portal_btn": "পোর্টাল রেট করুন",
    "dpdp_consent_text": "DPDP আইন ২০২৩ অনুসারে আমরা কেবল স্থানীয় ব্রাউজারে সেটিংস সংরক্ষণ করি। কোনো ডেটা ট্র্যাক বা বিক্রি হয় না।",
    "dpdp_agree_btn": "গ্রহণ করুন",
    "saved_exams_title": "সংরক্ষিত পরীক্ষা",
    "offline_banner_text": "আপনি বর্তমানে অফলাইনে আছেন। সংরক্ষিত তথ্য সক্রিয় থাকবে।",
    "bookmark_btn": "পরীক্ষা সংরক্ষণ করুন",
    "bookmarked_btn": "সংরক্ষিত"
  },
  "te": {
    "nav_alerts": "ఉద్యోగ హెచ్చరికలు",
    "qual_all": "అన్ని అర్హతలు",
    "qual_10th": "10వ ఉత్తీర్ణత",
    "qual_12th": "12వ ఉత్తీర్ణత",
    "qual_grad": "డిగ్రీ / గ్రాడ్యుయేట్",
    "qual_iti": "ఐటిఐ / డిప్లొమా",
    "faq_title": "తరచుగా అడిగే ప్రశ్నలు (FAQ)",
    "report_broken_btn": "సమస్య / లింక్ లోపం నివేదించండి",
    "affiliate_books_title": "సిఫార్సు చేయబడిన పుస్తకాలు",
    "rate_portal_btn": "పోర్టల్‌కు రేటింగ్ ఇవ్వండి",
    "dpdp_consent_text": "DPDP చట్టం 2023 ప్రకారం మీ ప్రాధాన్యతలు లోకల్ బ్రౌజర్‌లో మాత్రమే భద్రపరచబడతాయి.",
    "dpdp_agree_btn": "అంగీకరించండి",
    "saved_exams_title": "సేవ్ చేసిన పరీక్షలు",
    "offline_banner_text": "మీరు ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు. కాష్ చేయబడిన సమాచారం అందుబాటులో ఉంటుంది.",
    "bookmark_btn": "పరీక్షను సేవ్ చేయండి",
    "bookmarked_btn": "సేవ్ చేయబడింది"
  },
  "ta": {
    "nav_alerts": "வேலை அறிவிப்புகள்",
    "qual_all": "அனைத்து தகுதிகள்",
    "qual_10th": "10-ஆம் வகுப்பு",
    "qual_12th": "12-ஆம் வகுப்பு",
    "qual_grad": "பட்டதாரி",
    "qual_iti": "ஐடிஐ / டிப்ளமோ",
    "faq_title": "அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)",
    "report_broken_btn": "சிக்கல் / உடைந்த இணைப்பைத் தெரிவிக்கவும்",
    "affiliate_books_title": "பரிந்துரைக்கப்பட்ட தேர்வு புத்தகங்கள்",
    "rate_portal_btn": "போர்ட்டலை மதிப்பிடுங்கள்",
    "dpdp_consent_text": "DPDP சட்டம் 2023-ன் கீழ் பிரவுசர் நினைவகத்தில் மட்டுமே விருப்பங்கள் சேமிக்கப்படுகின்றன.",
    "dpdp_agree_btn": "ஏற்கிறேன்",
    "saved_exams_title": "சேமிக்கப்பட்ட தேர்வுகள்",
    "offline_banner_text": "நீங்கள் தற்போது ஆஃப்லைனில் உள்ளீர்கள். பதிவிறக்கப்பட்ட கருவிகள் இயங்கும்.",
    "bookmark_btn": "தேர்வை சேமிக்கவும்",
    "bookmarked_btn": "சேமிக்கப்பட்டது"
  },
  "mr": {
    "nav_alerts": "नोकरी अलर्ट",
    "qual_all": "सर्व पात्रता",
    "qual_10th": "१० वी उत्तीर्ण",
    "qual_12th": "१२ वी उत्तीर्ण",
    "qual_grad": "पदवीधर",
    "qual_iti": "आयटीआय / डिप्लोमा",
    "faq_title": "वारंवार विचारले जाणारे प्रश्न (FAQ)",
    "report_broken_btn": "समस्या / तुटलेली लिंक कळवा",
    "affiliate_books_title": "शिफारस केलेली पुस्तके",
    "rate_portal_btn": "पोर्टलला रेटिंग द्या",
    "dpdp_consent_text": "DPDP कायदा २०२३ अंतर्गत प्राधान्ये स्थानिक पातळीवर सेव्ह केली जातात. कोणताही डेटा विकला जात नाही.",
    "dpdp_agree_btn": "स्वीकारा",
    "saved_exams_title": "जतन केलेल्या परीक्षा",
    "offline_banner_text": "तुम्ही सध्या ऑफलाइन आहात. लोड केलेले टूल्स कार्यरत राहतील.",
    "bookmark_btn": "परीक्षा सेव्ह करा",
    "bookmarked_btn": "सेव्ह केले"
  },
  "gu": {
    "nav_alerts": "નોકરી એલર્ટ",
    "qual_all": "તમામ લાયકાત",
    "qual_10th": "૧૦ પાસ",
    "qual_12th": "૧૨ પાસ",
    "qual_grad": "સ્નાતક",
    "qual_iti": "આઈટીઆઈ / ડિપ્લોમા",
    "faq_title": "વારંવાર પૂછાતા પ્રશ્નો (FAQ)",
    "report_broken_btn": "સમસ્યા / ક્ષતિગ્રસ્ત લિંક રિપોર્ટ કરો",
    "affiliate_books_title": "ભલામણ કરેલ પુસ્તકો",
    "rate_portal_btn": "પોર્ટલને રેટ કરો",
    "dpdp_consent_text": "DPDP એક્ટ ૨૦૨૩ હેઠળ ફક્ત બ્રાઉઝરમાં ડેટા સચવાય છે. કોઈ વ્યક્તિગત માહિતી શેર થતી નથી.",
    "dpdp_agree_btn": "સ્વીકારો",
    "saved_exams_title": "સાચવેલી પરીક્ષાઓ",
    "offline_banner_text": "તમે હાલ ઑફલાઇન છો. સાચવેલી સુવિધાઓ ઉપલબ્ધ રહેશે.",
    "bookmark_btn": "પરીક્ષા સાચવો",
    "bookmarked_btn": "સાચવેલ"
  },
  "kn": {
    "nav_alerts": "ಉದ್ಯೋಗ ಎಚ್ಚರಿಕೆಗಳು",
    "qual_all": "ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಹತೆಗಳು",
    "qual_10th": "10ನೇ ತರಗತಿ ಉತ್ತೀರ್ಣ",
    "qual_12th": "12ನೇ ತರಗತಿ ಉತ್ತೀರ್ಣ",
    "qual_grad": "ಪದವೀಧರ",
    "qual_iti": "ಐಟಿಐ / ಡಿಪ್ಲೊಮಾ",
    "faq_title": "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು (FAQ)",
    "report_broken_btn": "ದೋಷ / ಮುರಿದ ಲಿಂಕ್ ವರದಿ ಮಾಡಿ",
    "affiliate_books_title": "ಶಿಫಾರಸು ಮಾಡಿದ ಪುಸ್ತಕಗಳು",
    "rate_portal_btn": "ಪೋರ್ಟಲ್ ಅನ್ನು ರೇಟ್ ಮಾಡಿ",
    "dpdp_consent_text": "DPDP ಕಾಯಿದೆ 2023 ರ ಅಡಿಯಲ್ಲಿ ಕೇವಲ ಸ್ಥಳೀಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಡೇಟಾ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ.",
    "dpdp_agree_btn": "ಒಪ್ಪಿಕೊಳ್ಳಿ",
    "saved_exams_title": "ಉಳಿಸಿದ ಪರೀಕ್ಷೆಗಳು",
    "offline_banner_text": "ನೀವು ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಸಂಗ್ರಹಿಸಿದ ಉಪಕರಣಗಳು ಲಭ್ಯವಿರುತ್ತವೆ.",
    "bookmark_btn": "ಪರೀಕ್ಷೆಯನ್ನು ಉಳಿಸಿ",
    "bookmarked_btn": "ಉಳಿಸಲಾಗಿದೆ"
  },
  "ml": {
    "nav_alerts": "തൊഴിൽ അറിയിപ്പുകൾ",
    "qual_all": "എല്ലാ യോഗ്യതകളും",
    "qual_10th": "പത്താം ക്ലാസ് പാസ്",
    "qual_12th": "പന്ത്രണ്ടാം ക്ലാസ് പാസ്",
    "qual_grad": "ബിരുദം",
    "qual_iti": "ഐടിഐ / ഡിപ്ലോമ",
    "faq_title": "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ (FAQ)",
    "report_broken_btn": "പ്രശ്നം / തകരാറിലായ ലിങ്ക് റിപ്പോർട്ട് ചെയ്യുക",
    "affiliate_books_title": "ശുപാർശ ചെയ്യുന്ന പുസ്തകങ്ങൾ",
    "rate_portal_btn": "പോർട്ടൽ റേറ്റ് ചെയ്യുക",
    "dpdp_consent_text": "DPDP ആക്ട് 2023 പ്രകാരം വിവരങ്ങൾ ബ്രൗസറിൽ മാത്രമേ സംരക്ഷിക്കപ്പെടുന്നുള്ളൂ.",
    "dpdp_agree_btn": "സ്വീകരിക്കുക",
    "saved_exams_title": "സൂക്ഷിച്ച പരീക്ഷകൾ",
    "offline_banner_text": "നിങ്ങൾ ഇപ്പോൾ ഓഫ്‌ലൈനിലാണ്. ലഭ്യമായ ടൂളുകൾ പ്രവർത്തിക്കും.",
    "bookmark_btn": "പരീക്ഷ സൂക്ഷിക്കുക",
    "bookmarked_btn": "സൂക്ഷിച്ചു"
  },
  "pa": {
    "nav_alerts": "ਨੌਕਰੀ ਅਲਰਟ",
    "qual_all": "ਸਾਰੀਆਂ ਯੋਗਤਾਵਾਂ",
    "qual_10th": "10ਵੀਂ ਪਾਸ",
    "qual_12th": "12ਵੀਂ ਪਾਸ",
    "qual_grad": "ਗ੍ਰੈਜੂਏਟ",
    "qual_iti": "ਆਈਟੀਆਈ / ਡਿਪਲੋਮਾ",
    "faq_title": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ (FAQ)",
    "report_broken_btn": "ਸਮੱਸਿਆ / ਖਰਾਬ ਲਿੰਕ ਰਿਪੋਰਟ ਕਰੋ",
    "affiliate_books_title": "ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਕਿਤਾਬਾਂ",
    "rate_portal_btn": "ਪੋਰਟਲ ਨੂੰ ਰੇਟ ਕਰੋ",
    "dpdp_consent_text": "DPDP ਐਕਟ 2023 ਦੇ ਤਹਿਤ ਤਰਜੀਹਾਂ ਸਿਰਫ ਸਥਾਨਕ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    "dpdp_agree_btn": "ਸਵੀਕਾਰ ਕਰੋ",
    "saved_exams_title": "ਸੰਭਾਲੀਆਂ ਪ੍ਰੀਖਿਆਵਾਂ",
    "offline_banner_text": "ਤੁਸੀਂ ਵਰਤਮਾਨ ਵਿੱਚ ਔਫਲਾਈਨ ਹੋ। ਲੋਡ ਕੀਤੇ ਟੂਲ ਉਪਲਬਧ ਰਹਿਣਗੇ।",
    "bookmark_btn": "ਪ੍ਰੀਖਿਆ ਸੰਭਾਲੋ",
    "bookmarked_btn": "ਸੰਭਾਲੀ ਗਈ"
  },
  "ur": {
    "nav_alerts": "ملازمت الرٹس",
    "qual_all": "تمام قابلیتیں",
    "qual_10th": "دسویں پاس",
    "qual_12th": "بارہویں پاس",
    "qual_grad": "گریجویٹ",
    "qual_iti": "آئی ٹی آئی / ڈپلومہ",
    "faq_title": "اکثر پوچھے جانے والے سوالات (FAQ)",
    "report_broken_btn": "مسئلہ / خراب لنک کی اطلاع دیں",
    "affiliate_books_title": "تجویز کردہ کتب",
    "rate_portal_btn": "پورٹل کی درجہ بندی کریں",
    "dpdp_consent_text": "ہم DPDP ایکٹ 2023 کے تحت ترجیحات کو مقامی براؤزر میں محفوظ کرتے ہیں۔",
    "dpdp_agree_btn": "قبول کریں",
    "saved_exams_title": "محفوظ شدہ امتحانات",
    "offline_banner_text": "آپ فی الحال آف لائن ہیں۔ کیش شدہ مواد دستیاب رہے گا۔",
    "bookmark_btn": "امتحان محفوظ کریں",
    "bookmarked_btn": "محفوظ"
  },
  "or": {
    "nav_alerts": "ନିଯୁକ୍ତି ସତର୍କତା",
    "qual_all": "ସମସ୍ତ ଯୋଗ୍ୟତା",
    "qual_10th": "ଦଶମ ପାସ",
    "qual_12th": "ଦ୍ୱାଦଶ ପାସ",
    "qual_grad": "ସ୍ନାତକ",
    "qual_iti": "ଆଇଟିଆଇ / ଡିପ୍ଲୋମା",
    "faq_title": "ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ (FAQ)",
    "report_broken_btn": "ତ୍ରୁଟି / ଭଙ୍ଗା ଲିଙ୍କ ରିପୋର୍ଟ କରନ୍ତୁ",
    "affiliate_books_title": "ପ୍ରସ୍ତୁତି ପାଇଁ ସର୍ବୋତ୍ତମ ପୁସ୍ତକ",
    "rate_portal_btn": "ପୋର୍ଟାଲକୁ ରେଟିଂ ଦିଅନ୍ତୁ",
    "dpdp_consent_text": "DPDP ଆକ୍ଟ 2023 ଅଧୀନରେ ତଥ୍ୟ କେବଳ ଲୋକାଲ ବ୍ରାଉଜରରେ ସଂରକ୍ଷିତ ହୋଇଥାଏ।",
    "dpdp_agree_btn": "ଗ୍ରହଣ କରନ୍ତୁ",
    "saved_exams_title": "ସଂରକ୍ଷିତ ପରୀକ୍ଷା",
    "offline_banner_text": "ଆପଣ ବର୍ତ୍ତମାନ ଅଫଲାଇନ ଅଛନ୍ତି। ପୂର୍ବ ତଥ୍ୟ ଉପଲବ୍ଧ ରହିବ।",
    "bookmark_btn": "ପରୀକ୍ଷା ସାଇତି ରଖନ୍ତୁ",
    "bookmarked_btn": "ସାଇତା ଯାଇଛି"
  }
};

const i18nFilePath = path.join(__dirname, '../public/js/i18n.js');
let fileContent = fs.readFileSync(i18nFilePath, 'utf8');

// Parse the I18N_DATA object
const startMarker = 'const I18N_DATA =';
const endMarker = 'const SUPPORTED_LANGUAGES =';

const startIndex = fileContent.indexOf(startMarker);
const endIndex = fileContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const dataCode = fileContent.substring(startIndex, endIndex);
const fn = new Function(dataCode + '\nreturn I18N_DATA;');
const i18nData = fn();

// Merge new keys into each language
for (const lang of Object.keys(NEW_KEYS)) {
  if (!i18nData[lang]) {
    console.error(`Language ${lang} not found in I18N_DATA!`);
    continue;
  }
  Object.assign(i18nData[lang], NEW_KEYS[lang]);
}

const updatedDataCode = 'const I18N_DATA = ' + JSON.stringify(i18nData, null, 2) + ';\n\n';
const restOfFile = fileContent.substring(endIndex);

fs.writeFileSync(i18nFilePath, updatedDataCode + restOfFile, 'utf8');
console.log('Successfully updated public/js/i18n.js with all 14 languages!');

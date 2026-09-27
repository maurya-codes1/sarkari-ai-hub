const fs = require('fs');
const path = require('path');

const NEW_ROW4_KEYS = {
  "en": {
    "card_rank_title": "Rank Predictor",
    "card_rank_sub": "Percentile & Cutoff",
    "card_kit_title": "Exam Bag Kit",
    "card_kit_sub": "Checklist & Packing",
    "card_waiver_title": "Fee Waiver",
    "card_waiver_sub": "0 Fee & Concession",
    "card_omr_title": "Vector OMR",
    "card_omr_sub": "Print 50-200 Sheets",
    "card_directory_title": "All 60+ Exams",
    "card_directory_sub": "Complete Directory"
  },
  "hi": {
    "card_rank_title": "रैंक प्रेडिक्टर",
    "card_rank_sub": "पर्सेंटाइल व कट-ऑफ",
    "card_kit_title": "परीक्षा किट बैग",
    "card_kit_sub": "चेकलिस्ट व पैकिंग",
    "card_waiver_title": "शुल्क छूट परीक्षक",
    "card_waiver_sub": "निःशुल्क फॉर्म नियम",
    "card_omr_title": "वेक्टर ओएमआर",
    "card_omr_sub": "50-200 बबल शीट प्रिंट",
    "card_directory_title": "सभी 60+ परीक्षाएं",
    "card_directory_sub": "सम्पूर्ण डायरेक्टरी"
  },
  "hi-latn": {
    "card_rank_title": "Rank Predictor",
    "card_rank_sub": "Percentile & Cutoff",
    "card_kit_title": "Exam Bag Kit",
    "card_kit_sub": "Checklist & Packing",
    "card_waiver_title": "Fee Waiver",
    "card_waiver_sub": "0 Fee & Chhoot",
    "card_omr_title": "Vector OMR",
    "card_omr_sub": "50-200 Sheets Print",
    "card_directory_title": "Sabhi 60+ Exams",
    "card_directory_sub": "Complete Directory"
  },
  "ta": {
    "card_rank_title": "ரேங்க் கணிப்பாளர்",
    "card_rank_sub": "சதவீதம் மற்றும் கட்-ஆஃப்",
    "card_kit_title": "தேர்வு பை கிட்",
    "card_kit_sub": "சரிபார்ப்பு பட்டியல்",
    "card_waiver_title": "கட்டண விலக்கு",
    "card_waiver_sub": "இலவச படிவ விதிகள்",
    "card_omr_title": "OMR தாள்",
    "card_omr_sub": "50-200 தாள்களை அச்சிடுக",
    "card_directory_title": "அனைத்து 60+ தேர்வுகள்",
    "card_directory_sub": "முழு அடைவு"
  },
  "te": {
    "card_rank_title": "ర్యాంక్ ప్రిడిక్టర్",
    "card_rank_sub": "పర్సంటైల్ & కటాఫ్",
    "card_kit_title": "పరీక్ష బ్యాగ్ కిట్",
    "card_kit_sub": "చెక్‌లిస్ట్ & ప్యాకింగ్",
    "card_waiver_title": "ఫీజు మినహాయింపు",
    "card_waiver_sub": "ఉచిత దరఖాస్తు నిబంధనలు",
    "card_omr_title": "వెక్టర్ OMR",
    "card_omr_sub": "50-200 షీట్లు ప్రింట్",
    "card_directory_title": "అన్ని 60+ పరీక్షలు",
    "card_directory_sub": "పూర్తి డైరెక్టరీ"
  },
  "mr": {
    "card_rank_title": "रँक प्रेडिक्टर",
    "card_rank_sub": "पर्सेंटाइल आणि कटऑफ",
    "card_kit_title": "परीक्षा बॅग किट",
    "card_kit_sub": "चेकलिस्ट आणि पॅकिंग",
    "card_waiver_title": "शुल्क माफी",
    "card_waiver_sub": "मोफत अर्ज नियम",
    "card_omr_title": "व्हेक्टर OMR",
    "card_omr_sub": "50-200 शीट प्रिंट करा",
    "card_directory_title": "सर्व 60+ परीक्षा",
    "card_directory_sub": "संपूर्ण डिरेक्टरी"
  },
  "bn": {
    "card_rank_title": "র‍্যাঙ্ক প্রেডিক্টর",
    "card_rank_sub": "পার্সেন্টাইল ও কাট-অফ",
    "card_kit_title": "পরীক্ষার ব্যাগ কিট",
    "card_kit_sub": "চেকলিস্ট ও প্যাকিং",
    "card_waiver_title": "ফি মওকুফ",
    "card_waiver_sub": "বিনামূল্যে ফর্মের নিয়ম",
    "card_omr_title": "ভেক্টর ওএমআর",
    "card_omr_sub": "৫০-২০০ শিট প্রিন্ট",
    "card_directory_title": "সমস্ত ৬০+ পরীক্ষা",
    "card_directory_sub": "সম্পূর্ণ ডিরেক্টরি"
  },
  "gu": {
    "card_rank_title": "રેન્ક પ્રિડિક્ટર",
    "card_rank_sub": "પર્સન્ટાઇલ અને કટઓફ",
    "card_kit_title": "પરીક્ષા બેગ કીટ",
    "card_kit_sub": "ચેકલિસ્ટ અને પેકિંગ",
    "card_waiver_title": "ફી માફી",
    "card_waiver_sub": "મફત અરજીના નિયમો",
    "card_omr_title": "વેક્ટર OMR",
    "card_omr_sub": "50-200 શીટ પ્રિન્ટ",
    "card_directory_title": "બધી 60+ પરીક્ષાઓ",
    "card_directory_sub": "સંપૂર્ણ ડિરેક્ટરી"
  },
  "kn": {
    "card_rank_title": "ಶ್ರೇಣಿ ಮುನ್ಸೂಚಕ",
    "card_rank_sub": "ಶೇಕಡಾವಾರು ಮತ್ತು ಕಟ್‌ಆಫ್",
    "card_kit_title": "ಪರೀಕ್ಷಾ ಬ್ಯಾಗ್ ಕಿಟ್",
    "card_kit_sub": "ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    "card_waiver_title": "ಶುಲ್ಕ ವಿನಾಯಿತಿ",
    "card_waiver_sub": "ಉಚಿತ ಅರ್ಜಿ ನಿಯಮಗಳು",
    "card_omr_title": "ವೆಕ್ಟರ್ OMR",
    "card_omr_sub": "50-200 ಹಾಳೆಗಳನ್ನು ಮುದ್ರಿಸಿ",
    "card_directory_title": "ಎಲ್ಲಾ 60+ ಪರೀಕ್ಷೆಗಳು",
    "card_directory_sub": "ಸಂಪೂರ್ಣ ಡೈರೆಕ್ಟರಿ"
  },
  "ml": {
    "card_rank_title": "റാങ്ക് പ്രവചനം",
    "card_rank_sub": "പെർസന്റൈലും കട്ട്ഓഫും",
    "card_kit_title": "പരീക്ഷാ ബാഗ് കിറ്റ്",
    "card_kit_sub": "ചെക്ക്ലിസ്റ്റും പാക്കിംഗും",
    "card_waiver_title": "ഫീസ് ഇളവ്",
    "card_waiver_sub": "സൗജന്യ അപേക്ഷാ നിയമങ്ങൾ",
    "card_omr_title": "വെക്റ്റർ OMR",
    "card_omr_sub": "50-200 ഷീറ്റുകൾ പ്രിന്റ്",
    "card_directory_title": "എല്ലാ 60+ പരീക്ഷകളും",
    "card_directory_sub": "പൂർണ്ണ ഡയറക്ടറി"
  },
  "pa": {
    "card_rank_title": "ਰੈਂਕ ਪੂਰਵ-ਅਨੁਮਾਨ",
    "card_rank_sub": "ਪਰਸੈਂਟਾਈਲ ਅਤੇ ਕੱਟ-ਆਫ",
    "card_kit_title": "ਪ੍ਰੀਖਿਆ ਬੈਗ ਕਿੱਟ",
    "card_kit_sub": "ਚੈੱਕਲਿਸਟ ਅਤੇ ਪੈਕਿੰਗ",
    "card_waiver_title": "ਫੀਸ ਛੋਟ",
    "card_waiver_sub": "ਮੁਫਤ ਫਾਰਮ ਦੇ ਨਿਯਮ",
    "card_omr_title": "ਵੈਕਟਰ OMR",
    "card_omr_sub": "50-200 ਸ਼ੀਟਾਂ ਪ੍ਰਿੰਟ ਕਰੋ",
    "card_directory_title": "ਸਾਰੀਆਂ 60+ ਪ੍ਰੀਖਿਆਵਾਂ",
    "card_directory_sub": "ਮੁਕੰਮਲ ਡਾਇਰੈਕਟਰੀ"
  },
  "ur": {
    "card_rank_title": "رینک کی پیش گوئی",
    "card_rank_sub": "پرسنٹائل اور کٹ آف",
    "card_kit_title": "امتحانی بیگ کٹ",
    "card_kit_sub": "چیک لسٹ اور پیکنگ",
    "card_waiver_title": "فیس کی چھوٹ",
    "card_waiver_sub": "مفت فارم کے قوانین",
    "card_omr_title": "ویکٹر OMR",
    "card_omr_sub": "50-200 شیٹس پرنٹ کریں",
    "card_directory_title": "تمام 60+ امتحانات",
    "card_directory_sub": "مکمل ڈائرکٹری"
  },
  "or": {
    "card_rank_title": "ରାଙ୍କ ପୂର୍ବାନୁମାନ",
    "card_rank_sub": "ପର୍ସେଣ୍ଟାଇଲ୍ ଏବଂ କଟ୍-ଅଫ୍",
    "card_kit_title": "ପରୀକ୍ଷା ବ୍ୟାଗ୍ କିଟ୍",
    "card_kit_sub": "ଚେକ୍‌ଲିଷ୍ଟ ଏବଂ ପ୍ୟାକିଂ",
    "card_waiver_title": "ଫି ଛାଡ଼",
    "card_waiver_sub": "ମାଗଣା ଆବେଦନ ନିୟମ",
    "card_omr_title": "ଭେକ୍ଟର OMR",
    "card_omr_sub": "୫୦-୨୦୦ ସିଟ୍ ପ୍ରିଣ୍ଟ",
    "card_directory_title": "ସମସ୍ତ ୬୦+ ପରୀକ୍ଷା",
    "card_directory_sub": "ସମ୍ପୂର୍ଣ୍ଣ ଡିରେକ୍ଟୋରୀ"
  },
  "sa": {
    "card_rank_title": "ಶ್ರೇಣೀಸೂಚಕಃ",
    "card_rank_sub": "ಶತಮಾನಂ ಕಟಾಫ್ ಚ",
    "card_kit_title": "ಪರೀಕ್ಷಾಸ್ಯೂತಕಿಟ್",
    "card_kit_sub": "ಸೂಚೀಪತ್ರಂ ಚ",
    "card_waiver_title": "ಶುಲ್ಕಮುಕ್ತಿಃ",
    "card_waiver_sub": "ನಿಃಶುಲ್ಕನಿಯಮಾಃ",
    "card_omr_title": "ಓಎಂಆರ್ ಪತ್ರಮ್",
    "card_omr_sub": "ಮುದ್ರಣೋಪಯೋಗೀ",
    "card_directory_title": "ಸರ್ವಾಃ 60+ ಪರೀಕ್ಷಾಃ",
    "card_directory_sub": "ಸಂಪೂರ್ಣಸೂಚೀ"
  }
};

const i18nFilePath = path.join(__dirname, '../public/js/i18n.js');
let fileContent = fs.readFileSync(i18nFilePath, 'utf8');

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

for (const lang of Object.keys(NEW_ROW4_KEYS)) {
  if (i18nData[lang]) {
    Object.assign(i18nData[lang], NEW_ROW4_KEYS[lang]);
  }
}

const updatedDataCode = 'const I18N_DATA = ' + JSON.stringify(i18nData, null, 2) + ';\n\n';
const restOfFile = fileContent.substring(endIndex);

fs.writeFileSync(i18nFilePath, updatedDataCode + restOfFile, 'utf8');
console.log('Successfully injected Row 4 keys into i18n.js across all 14 languages!');

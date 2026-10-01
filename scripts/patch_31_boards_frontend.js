const fs = require('fs');
const path = require('path');

// 1. Update public/js/quiz-data.js
const quizDataPath = path.join(__dirname, '..', 'public', 'js', 'quiz-data.js');
let quizData = fs.readFileSync(quizDataPath, 'utf8');

const additionalBoardOptions = `,
      { id: "hpbose", name: "हिमाचल प्रदेश स्कूल शिक्षा बोर्ड (HPBOSE धर्मशाला)" },
      { id: "jkbose", name: "जम्मू और कश्मीर स्टेट बोर्ड (JKBOSE जम्मू/श्रीनगर)" },
      { id: "kerala", name: "കേരള ഡിഎച്ച്എസ്ഇ (DHSE Kerala तिरुवनंतपुरम)" },
      { id: "gbshse", name: "गोवा माध्यमिक व उच्च माध्यमिक मंडळ (GBSHSE पोरवोरिम)" },
      { id: "bsem", name: "Board of Secondary Education Manipur (BSEM इंफाल)" },
      { id: "mbose", name: "Meghalaya Board of School Education (MBOSE तुरा/शिलांग)" },
      { id: "mbse", name: "Mizoram Board of School Education (MBSE आइजोल)" },
      { id: "nbse", name: "Nagaland Board of School Education (NBSE कोहिमा)" },
      { id: "tbse", name: "ত্রিপুরা মধ্যশিক্ষা পর্ষদ (TBSE अगरतला)" },
      { id: "bseap", name: "ఆంధ్రప్రదేశ్ సెకండరీ బోర్డ్ (BSEAP विजयवाड़ा)" },
      { id: "bsetg", name: "తెలంగాణ ఎగ్జామినేషన్స్ (BSETG हैदराबाद)" }`;

// Target each board array ending
const targetBoardsEnd = '      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }\n    ],';
const replacementBoardsEnd = '      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }' + additionalBoardOptions + '\n    ],';

if (quizData.includes(targetBoardsEnd)) {
  quizData = quizData.replaceAll(targetBoardsEnd, replacementBoardsEnd);
  console.log('✅ Updated all 4 board arrays in EXAMS_CONFIG with 11 new boards');
} else {
  console.warn('⚠️ Could not find targetBoardsEnd in quiz-data.js');
}

// Update BOARD_METADATA
const targetMetadataEnd = `  bsetelangana: { id: "bsetelangana", name: "Telangana & AP Board (BSE Telangana / BIEAP)", fullName: "తెలంగాణ & ఆంధ్రప్రదేశ్ బోర్డ్ ఆఫ్ సెకండరీ ఎడ్యుకేషన్", langMode: "bilingual-telugu", nativeLangId: "telugu", nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)" }
};`;

const additionalMetadata = `  bsetelangana: { id: "bsetelangana", name: "Telangana & AP Board (BSE Telangana / BIEAP)", fullName: "తెలంగాణ & ఆంధ్రప్రదేశ్ బోర్డ్ ఆఫ్ సెకండరీ ఎడ్యుకేషన్", langMode: "bilingual-telugu", nativeLangId: "telugu", nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)" },
  hpbose: { id: "hpbose", name: "HPBOSE (Himachal)", fullName: "हिमाचल प्रदेश स्कूल शिक्षा बोर्ड (HPBOSE धर्मशाला)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "अनिवार्य हिन्दी" },
  jkbose: { id: "jkbose", name: "JKBOSE (J&K)", fullName: "जम्मू और कश्मीर स्टेट बोर्ड ऑफ स्कूल एजुकेशन (JKBOSE)", langMode: "bilingual-urdu", nativeLangId: "urdu", nativeLangName: "اردو لازمی (Urdu) / Hindi" },
  kerala: { id: "kerala", name: "Kerala Board (DHSE)", fullName: "കേരള ഡിഎച്ച്എസ്ഇ (DHSE Kerala തിരുവനന്തപുരം)", langMode: "bilingual-malayalam", nativeLangId: "malayalam", nativeLangName: "മലയാളം സാഹിത്യം (Malayalam)" },
  gbshse: { id: "gbshse", name: "Goa Board (GBSHSE)", fullName: "गोवा माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ (GBSHSE)", langMode: "english", nativeLangId: "konkani", nativeLangName: "कोंकणी / English" },
  bsem: { id: "bsem", name: "Manipur Board (BSEM)", fullName: "Board of Secondary Education Manipur (BSEM)", langMode: "english", nativeLangId: "english", nativeLangName: "General English" },
  mbose: { id: "mbose", name: "Meghalaya Board (MBOSE)", fullName: "Meghalaya Board of School Education (MBOSE)", langMode: "english", nativeLangId: "english", nativeLangName: "General English" },
  mbse: { id: "mbse", name: "Mizoram Board (MBSE)", fullName: "Mizoram Board of School Education (MBSE)", langMode: "english", nativeLangId: "english", nativeLangName: "General English" },
  nbse: { id: "nbse", name: "Nagaland Board (NBSE)", fullName: "Nagaland Board of School Education (NBSE)", langMode: "english", nativeLangId: "english", nativeLangName: "General English" },
  tbse: { id: "tbse", name: "Tripura Board (TBSE)", fullName: "ত্রিপুরা মধ্যশিক্ষা পর্ষদ (TBSE আগরতলা)", langMode: "bilingual-bengali", nativeLangId: "bengali", nativeLangName: "বাংলা সাহিত্য (Bengali)" },
  bseap: { id: "bseap", name: "Andhra Pradesh Board (BSEAP)", fullName: "ఆంధ్రప్రదేశ్ సెకండరీ ఎడ్యుకేషన్ బోర్డ్ (BSEAP)", langMode: "bilingual-telugu", nativeLangId: "telugu", nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)" },
  bsetg: { id: "bsetg", name: "Telangana Board (BSETG)", fullName: "తెలంగాణ డైరెక్టరేట్ ఆఫ్ గవర్నమెంట్ ఎగ్జామినేషన్స్ (BSETG)", langMode: "bilingual-telugu", nativeLangId: "telugu", nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)" }
};`;

if (quizData.includes(targetMetadataEnd)) {
  quizData = quizData.replace(targetMetadataEnd, additionalMetadata);
  console.log('✅ Updated BOARD_METADATA with all 11 new boards');
} else {
  console.warn('⚠️ Could not find targetMetadataEnd in quiz-data.js');
}

fs.writeFileSync(quizDataPath, quizData, 'utf8');
console.log('Saved quiz-data.js');

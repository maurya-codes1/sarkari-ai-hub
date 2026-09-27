// Official Sarkari Notification & Rules Decoder
// Extracts vital dates, vacancies, eligibility, exam pattern & form rejection warnings
// Powered by Multi-Language Natural Language Parser across 12 Indian Languages

const SAMPLE_NOTIFICATIONS = {
  sscGd: `STAFF SELECTION COMMISSION (SSC)
NOTICE: CONSTABLE (GD) IN CENTRAL ARMED POLICE FORCES (CAPFs), SSF, AND RIFLEMAN (GD) IN ASSAM RIFLES EXAMINATION 2026
Dates for submission of online applications: 05-09-2026 to 14-10-2026 (23:00)
Last date and time for making online fee payment: 15-10-2026 (23:00)
Schedule of Computer Based Examination (CBT): January - February 2027
Total Vacancies: 39,481 Posts (Male: 35,612, Female: 3,869).
Category-wise Breakdown: SC: 5,600, ST: 3,200, OBC: 8,400, EWS: 4,100, UR: 14,312.
Age Limit: 18-23 years as on 01-01-2027. Crucial date for age: 01-01-2027. Permissible relaxation in upper age limit: SC/ST: 5 years, OBC: 3 years.
Educational Qualification: Candidate must have passed Matriculation or 10th Class Examination from a recognized Board/University.
Physical Efficiency Test (PET): Male: 5 Kms in 24 minutes; Female: 1.6 Kms in 8.5 minutes. Height: Male 170 cms, Female 157 cms. Chest: 80 cms (minimum expansion 5 cms).
Scheme of Examination: Computer Based Examination consisting of 80 questions carrying 2 marks each (Total 160 marks). 60 Minutes duration.
Subjects: Part-A General Intelligence & Reasoning (20 Qs, 40 Marks), Part-B General Knowledge & General Awareness (20 Qs, 40 Marks), Part-C Elementary Mathematics (20 Qs, 40 Marks), Part-D English/Hindi (20 Qs, 40 Marks).
Negative Marking: There will be negative marking of 0.25 marks for each wrong answer.
Important Warning: Photograph must not be blurred or older than 3 months. Applications with blurred photos or signatures will be summarily rejected. Crucial date for OBC-NCL certificate is the closing date of application.`,

  upPolice: `उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB), लखनऊ
विज्ञापन संख्या: PRPB-1(क)2026 - आरक्षी नागरिक पुलिस एवं उपनिरीक्षक (SI) सीधी भर्ती
ऑनलाइन आवेदन प्रारंभ होने की तिथि: 10-08-2026
ऑनलाइन आवेदन जमा करने की अंतिम तिथि: 30-09-2026
कुल रिक्तियां: 60,244 पद। अनारक्षित: 24,102, ईडब्ल्यूएस: 6,024, अन्य पिछड़ा वर्ग: 16,264, अनुसूचित जाति: 12,650, अनुसूचित जनजाति: 1,204।
आयु सीमा: पुरुष अभ्यर्थी ने दिनांक 01-07-2026 को 18 वर्ष की आयु प्राप्त कर ली हो और 22/25 वर्ष से अधिक न हो। महिला अभ्यर्थी 18 से 26 वर्ष। उत्तर प्रदेश के मूल निवासी OBC/SC/ST अभ्यर्थियों को अधिकतम आयु सीमा में 5 वर्ष की छूट अनुमन्य है।
शैक्षणिक योग्यता: भारत में विधि द्वारा स्थापित बोर्ड द्वारा 12वीं (इंटरमीडिएट) उत्तीर्ण या समकक्ष।
शारीरिक मानक: पुरुष (सामान्य/ओबीसी/एससी) न्यूनतम ऊंचाई 168 सेमी, सीना बिना फुलाए 79 सेमी और फुलाने पर 84 सेमी। महिला ऊंचाई न्यूनतम 152 सेमी, वजन न्यूनतम 40 किलोग्राम।
दौड़ (PET): पुरुष अभ्यर्थियों के लिए 4.8 किमी की दौड़ 25 मिनट में, महिला अभ्यर्थियों के लिए 2.4 किमी की दौड़ 14 मिनट में।
लिखित परीक्षा: 300 अंकों की होगी, समय 2 घंटे (120 मिनट)। कुल 150 बहुविकल्पीय प्रश्न (प्रत्येक सही उत्तर पर 2 अंक)।
नेगेटिव मार्किंग: प्रत्येक गलत उत्तर के लिए 0.5 अंक (एक चौथाई) काटे जाएंगे।
सावधानी: फोटो का बैकग्राउंड सफेद या हल्का ग्रे होना चाहिए। दोनों कान साफ दिखने चाहिए। चश्मा और टोपी पहनकर फोटो मान्य नहीं होगी।`,

  rrbAlp: `GOVERNMENT OF INDIA, MINISTRY OF RAILWAYS (RAILWAY RECRUITMENT BOARDS)
CENTRALIZED EMPLOYMENT NOTICE (CEN) No. 01/2026: RECRUITMENT OF ASSISTANT LOCO PILOT (ALP)
Opening date of application: 20-01-2026. Closing date for submission of application: 19-02-2026 (23:59 hrs).
Total Vacancies: 18,799 Posts across all Zonal Railways.
Pay Level: Level-2 in 7th CPC with Initial Pay Rs. 19,900/- plus allowances.
Age Limit: 18 to 30 years as on 01-07-2026 (3 years relaxation for OBC, 5 years for SC/ST).
Minimum Educational Qualification: Matriculation / SSLC plus ITI from recognized institutions of NCVT/SCVT in designated trades OR 3-Year Diploma in Mechanical/Electrical/Electronics/Automobile Engineering OR B.E./B.Tech degree in engineering disciplines.
Medical Standard: A-1 (Distant Vision: 6/6, 6/6 without glasses with fogging test; Near Vision: Sn 0.6, 0.6 without glasses; Color Vision, Field of Vision mandatory).
Recruitment Stages: CBT-1 (75 Questions, 60 Minutes, 1/3rd Negative Marking), CBT-2 (Part-A 100 Qs 90 mins + Part-B 75 Qs 60 mins qualifying), CBAT (Computer Based Aptitude Test), and Document Verification.`,

  biharPolice: `केन्द्रीय चयन पर्षद (सिपाही भर्ती), बिहार, पटना (CSBC)
विज्ञापन संख्या: 01/2026 - बिहार पुलिस में 'सिपाही' (Constable) संवर्ग में रिक्त पदों पर सीधी भर्ती
ऑनलाइन आवेदन पत्र प्राप्ति की अंतिम तिथि: 25-08-2026
कुल रिक्त पद: 21,391 पद। (अनारक्षित: 8,556, ईडब्ल्यूएस: 2,140, एससी: 3,400, एसटी: 228, ईबीसी: 3,842, बीसी: 2,570, पिछड़े वर्ग की महिला: 655)।
शैक्षणिक योग्यता: 10+2 (इंटरमीडिएट) उत्तीर्ण अथवा बिहार राज्य सरकार के मदरसा बोर्ड द्वारा निर्गत मौलवी प्रमाण पत्र या संस्कृत बोर्ड द्वारा निर्गत शास्त्री अथवा समकक्ष।
उम्र सीमा: 01-08-2026 को न्यूनतम 18 वर्ष एवं अधिकतम 25 वर्ष (पिछड़ा/अत्यंत पिछड़ा वर्ग पुरुष: 27 वर्ष, महिला: 28 वर्ष, एससी/एसटी: 30 वर्ष)।
शारीरिक दक्षता परीक्षा (PET) - 100 अंक:
1. दौड़ (50 अंक): 1.6 किमी दौड़ अधिकतम 6 मिनट में। 5 मिनट से कम में दौड़ने पर 50 अंक।
2. गोला फेंक (25 अंक): 16 पाउंड का गोला न्यूनतम 16 फीट फेंकना। 20 फीट से ज्यादा फेंकने पर 25 अंक।
3. ऊंची कूद (25 अंक): न्यूनतम 4 फीट। 5 फीट कूदने पर 25 अंक।
मेधा सूची (Merit List): लिखित परीक्षा केवल शारीरिक परीक्षा हेतु अर्हक (Qualifying) होगी। अंतिम मेधा सूची पूर्णतः शारीरिक दक्षता परीक्षा (दौड़, गोला फेंक, ऊंची कूद) के कुल 100 अंकों के आधार पर तैयार होगी।`,

  cbse10th: `CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)
PUBLIC CIRCULAR: SCHEDULE & PROCEDURE FOR VERIFICATION OF MARKS, OBTAINING PHOTOCOPY OF EVALUATED ANSWER BOOKS, AND RE-EVALUATION FOR CLASS X & XII
1. Verification of Marks: Candidates applying for verification can apply online on cbse.gov.in from 3rd day to 7th day after result declaration. Fee: Rs. 500 per subject.
2. Photocopy of Evaluated Answer Book: Only candidates who applied for verification can obtain a scanned photocopy. Fee: Rs. 700 per answer book for Class XII, Rs. 500 for Class X.
3. Re-evaluation of Answers: Only candidates who obtained a photocopy can apply for question-wise re-evaluation. Fee: Rs. 100 per question.
Important Instructions: Offline applications will NOT be accepted under any circumstances. Fee is non-refundable. Roll number, School number, Center number, and Admit Card ID are required. Scrutiny result will be updated directly on results.cbse.nic.in.`,

  bsebBihar: `बिहार विद्यालय परीक्षा समिति, पटना (BSEB)
विज्ञप्ति संख्या: PR 112/2026 - वार्षिक माध्यमिक (मैट्रिक 10th) एवं उच्च माध्यमिक (इंटरमीडिएट 12th) परीक्षा स्क्रूटिनी एवं कंपार्टमेंटल परीक्षा
1. स्क्रूटिनी हेतु ऑनलाइन आवेदन: परीक्षा परिणाम घोषित होने के उपरांत छात्र bsebinter.org अथवा biharboardonline.bihar.gov.in पर प्रति विषय ₹120 शुल्क के साथ ऑनलाइन आवेदन कर सकते हैं।
2. कंपार्टमेंटल सह-विशेष परीक्षा: अधिकतम दो विषयों में अनुत्तीर्ण परीक्षार्थी कम्पार्टमेंटल परीक्षा में शामिल हो सकते हैं।
3. परीक्षा पैटर्न: 100 अंकों वाले सैद्धांतिक विषयों में 50 वस्तुनिष्ठ (MCQs) प्रश्न OMR शीट पर लिए जाते हैं, जिसमें 100 विकल्पों में से किन्हीं 50 का उत्तर देना होता है। 50 अंक विषयनिष्ठ (लघु व दीर्घ उत्तरीय) होते हैं।`,

  ntaNeet: `NATIONAL TESTING AGENCY (NTA) - PUBLIC NOTICE
NATIONAL ELIGIBILITY CUM ENTRANCE TEST (UG) 2026 (NEET UG)
Submission of Online Application Form: 09 February 2026 to 16 March 2026 (up to 09:00 PM).
Date of Examination: First Sunday of May 2026. Timing: 02:00 PM to 05:20 PM (200 minutes).
Eligibility: Completed 17 years of age on or before 31st December of the year of admission. Passed Physics, Chemistry, Biology/Biotech & English individually with min 50% marks (40% for SC/ST/OBC).
Pattern of Test: 200 Multiple Choice Questions (Section A: 35 Qs, Section B: 15 Qs attempt any 10). Total Marks: 720. Marking: +4 for correct, -1 for incorrect response.
Photo Specifications: Recent passport photograph (10-200 KB) and Postcard photo 4"x6" with white background showing 80% face with ears visible, and candidate name & date of taking photo clearly printed at bottom.`,

  ctetExam: `CENTRAL BOARD OF SECONDARY EDUCATION (CBSE)
CENTRAL TEACHER ELIGIBILITY TEST (CTET) 2026
Online Application Start Date: 07-03-2026. Last Date for Submission: 05-04-2026 (23:59 hrs).
Schedule of Examination: Paper-II (09:30 AM to 12:00 PM) | Paper-I (02:30 PM to 05:00 PM). Duration: 2.5 Hours each.
Paper-I (for Classes I to V Primary Stage): 150 MCQs / 150 Marks (Child Development 30, Math 30, EVS 30, Language-I 30, Language-II 30). No Negative Marking.
Paper-II (for Classes VI to VIII Elementary Stage): 150 MCQs / 150 Marks (Child Development 30, Math & Science 60 OR Social Studies 60, Language-I 30, Language-II 30).
Qualifying Marks: General 60% (90/150 marks), OBC/SC/ST 55% (82/150 marks). Certificate validity is for lifetime.`
};

function initAiHelper() {
  const analyzeBtn = document.getElementById('aiAnalyzeBtn');
  const inputArea = document.getElementById('aiNotificationInput');

  // Sample buttons setup
  const sampleMap = {
    'sampleSscBtn': SAMPLE_NOTIFICATIONS.sscGd,
    'sampleUpBtn': SAMPLE_NOTIFICATIONS.upPolice,
    'sampleRrbBtn': SAMPLE_NOTIFICATIONS.rrbAlp,
    'sampleBiharBtn': SAMPLE_NOTIFICATIONS.biharPolice,
    'sampleCbseBtn': SAMPLE_NOTIFICATIONS.cbse10th,
    'sampleBsebBtn': SAMPLE_NOTIFICATIONS.bsebBihar,
    'sampleNeetBtn': SAMPLE_NOTIFICATIONS.ntaNeet,
    'sampleCtetBtn': SAMPLE_NOTIFICATIONS.ctetExam
  };

  Object.entries(sampleMap).forEach(([btnId, sampleContent]) => {
    const btn = document.getElementById(btnId);
    if (btn && inputArea) {
      btn.addEventListener('click', () => {
        inputArea.value = sampleContent;
        highlightSampleButton(btn);
        // Instant analysis upon clicking official circular button
        handleAnalyzeNotification();
      });
    }
  });

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', handleAnalyzeNotification);
  }
}

function highlightSampleButton(activeBtn) {
  const sampleIds = [
    'sampleSscBtn', 'sampleUpBtn', 'sampleRrbBtn', 'sampleBiharBtn',
    'sampleCbseBtn', 'sampleBsebBtn', 'sampleNeetBtn', 'sampleCtetBtn'
  ];

  // Collect all buttons
  const allBtns = Array.from(document.querySelectorAll('.sample-circular-btn'));
  sampleIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && !allBtns.includes(el)) allBtns.push(el);
  });

  // Reset ALL buttons to unselected state
  allBtns.forEach(btn => {
    btn.className = "sample-circular-btn bg-white hover:bg-purple-100 text-purple-900 font-bold px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm transition cursor-pointer";
  });

  // Apply active highlight strictly to the selected button
  if (activeBtn) {
    activeBtn.className = "sample-circular-btn bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black px-3.5 py-1.5 rounded-xl border-2 border-orange-600 shadow-md ring-2 ring-orange-300 transition cursor-pointer";
  }
}

async function handleAnalyzeNotification() {
  const inputArea = document.getElementById('aiNotificationInput');
  const langSelect = document.getElementById('aiLangSelect');
  const outputContainer = document.getElementById('aiOutputContainer');
  const analyzeBtn = document.getElementById('aiAnalyzeBtn');
  const userApiKey = document.getElementById('userApiKeyInput')?.value || '';

  const text = inputArea?.value?.trim();
  if (!text || text.length < 15) {
    alert('कृपया किसी भी सरकारी भर्ती या बोर्ड परीक्षा का सर्कुलर टेक्स्ट यहाँ पेस्ट करें या ऊपर दिए गए सैम्पल बटन्स पर क्लिक करें।');
    return;
  }

  const lang = langSelect?.value || (typeof currentLanguage !== 'undefined' ? currentLanguage : 'hi');

  // Show loading state
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Analyzing Circular Rules...
    `;
  }

  if (outputContainer) {
    outputContainer.classList.remove('hidden');
    outputContainer.innerHTML = `
      <div class="animate-pulse space-y-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-md">
        <div class="h-6 bg-slate-200 rounded w-1/3"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="h-28 bg-slate-100 rounded-2xl"></div>
          <div class="h-28 bg-slate-100 rounded-2xl"></div>
        </div>
        <div class="h-32 bg-slate-100 rounded-2xl"></div>
      </div>
    `;
  }

  try {
    const response = await fetch('/api/ai/analyze-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notificationText: text,
        language: lang,
        userApiKey: userApiKey
      })
    });

    if (!response.ok) {
      throw new Error('Server returned error status');
    }

    const data = await response.json();
    renderAiAnalysis(data, lang);
  } catch (err) {
    console.error('Notification Decoder Request error:', err);
    if (outputContainer) {
      const fallbackData = getFallbackAnalysisObject(text, lang);
      renderAiAnalysis(fallbackData, lang);
    }
  } finally {
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = `<span>📑 Decode Circular & Extract Rules</span>`;
    }
  }
}

// Localized Card Header Labels for Indian Languages
function getLocalizedCardLabels(lang = 'hi') {
  const l = (lang || 'hi').toLowerCase();

  if (l.startsWith('ml')) {
    return {
      datesTitle: "പ്രധാന തീയതികൾ (Important Dates)",
      vacanciesTitle: "ആകെ ഒഴിവുകൾ (Total Vacancies)",
      eligibilityTitle: "യോഗ്യതയും പ്രായപരിധിയും (Eligibility & Age)",
      patternTitle: "പരീക്ഷാരീതിയും മാർക്കിംഗും (Exam Scheme)",
      pitfallsTitle: "ഫോം നിരസിക്കാതിരിക്കാൻ ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ (Avoid Rejection)",
      applyStart: "അപേക്ഷ ആരംഭം:",
      lastDate: "അവസാന തീയതി:",
      examDate: "പരീക്ഷാ തീയതി:",
      education: "വിദ്യാഭ്യാസം:",
      ageLimit: "പ്രായപരിധി:",
      physical: "ശാരീരിക യോഗ്യത:",
      subjects: "വിഷയങ്ങൾ:",
      marking: "നെഗറ്റീവ് മാർക്കിംഗ്:",
      duration: "പരീക്ഷാ സമയം:"
    };
  }

  if (l.startsWith('ta')) {
    return {
      datesTitle: "முக்கிய தேதிகள் (Important Dates)",
      vacanciesTitle: "மொத்த காலியிடங்கள் (Total Vacancies)",
      eligibilityTitle: "கல்வித் தகுதி & வயது வரம்பு (Eligibility & Age)",
      patternTitle: "தேர்வு முறை & மதிப்பெண் திட்டம் (Exam Scheme)",
      pitfallsTitle: "விண்ணப்பம் நிராகரிக்கப்படுவதைத் தவிர்க்க 3 விதிகள்",
      applyStart: "விண்ணப்ப தொடக்கம்:",
      lastDate: "கடைசி தேதி:",
      examDate: "தேர்வு தேதி:",
      education: "கல்வித் தகுதி:",
      ageLimit: "வயது வரம்பு:",
      physical: "உடற்தகுதி:",
      subjects: "பாடங்கள்:",
      marking: "எதிர்மறை மதிப்பெண்:",
      duration: "தேர்வு நேரம்:"
    };
  }

  if (l.startsWith('te')) {
    return {
      datesTitle: "ముఖ్యమైన తేదీలు (Important Dates)",
      vacanciesTitle: "మొత్తం ఖాళీలు (Total Vacancies)",
      eligibilityTitle: "అర్హత మరియు వయోపరిమితి (Eligibility & Age)",
      patternTitle: "పరీక్షా విధానం మరియు మార్కింగ్ (Exam Scheme)",
      pitfallsTitle: "ఫారమ్ తిరస్కరణకు గురికాకుండా జాగ్రత్తలు",
      applyStart: "దరఖాస్తు ప్రారంభం:",
      lastDate: "చివరి తేదీ:",
      examDate: "పరీక్ష తేదీ:",
      education: "విద్యార్హత:",
      ageLimit: "వయోపరిమితి:",
      physical: "శారీరక ప్రమాణాలు:",
      subjects: "సబ్జెక్టులు:",
      marking: "నెగెటివ్ మార్కులు:",
      duration: "పరీక్ష సమయం:"
    };
  }

  if (l.startsWith('mr')) {
    return {
      datesTitle: "महत्वाच्या तारखा (Important Dates)",
      vacanciesTitle: "एकूण रिक्त पदे (Total Vacancies)",
      eligibilityTitle: "पात्रता आणि वयोमर्यादा (Eligibility & Age)",
      patternTitle: "परीक्षा पद्धत व गुणदान (Exam Scheme)",
      pitfallsTitle: "अर्ज बाद होऊ नये म्हणून घ्यावयाची काळजी",
      applyStart: "अर्ज सुरू दिनांक:",
      lastDate: "अंतिम दिनांक:",
      examDate: "परीक्षेचे वेळापत्रक:",
      education: "शैक्षणिक पात्रता:",
      ageLimit: "वयोमर्यादा:",
      physical: "शारीरिक चाचणी:",
      subjects: "विषय:",
      marking: "नकारात्मक गुण (Negative Marking):",
      duration: "परीक्षेचा वेळ:"
    };
  }

  if (l.startsWith('bn')) {
    return {
      datesTitle: "গুরুত্বপূর্ণ তারিখসমূহ (Important Dates)",
      vacanciesTitle: "মোট শূন্যপদ (Total Vacancies)",
      eligibilityTitle: "যোগ্যতা ও বয়সসীমা (Eligibility & Age)",
      patternTitle: "পরীক্ষার ধরণ ও নম্বর বিভাজন (Exam Scheme)",
      pitfallsTitle: "ফর্ম বাতিল হওয়া রোধ করতে করণীয়",
      applyStart: "আবেদন শুরু:",
      lastDate: "আবেদনের শেষ তারিখ:",
      examDate: "পরীক্ষার সময়সূচী:",
      education: "শিক্ষাগত যোগ্যতা:",
      ageLimit: "বয়সসীমা:",
      physical: "শারীরিক মানদণ্ড:",
      subjects: "বিষয়সমূহ:",
      marking: "নেগেটিভ মার্কিং:",
      duration: "সময়সীমা:"
    };
  }

  if (l.startsWith('en')) {
    return {
      datesTitle: "Important Dates & Application Schedule",
      vacanciesTitle: "Total Vacancies & Reservation Breakdown",
      eligibilityTitle: "Eligibility Criteria & Age Limits",
      patternTitle: "Exam Pattern, Marking & Time Scheme",
      pitfallsTitle: "3 Form Rejection Pitfalls to AVOID",
      applyStart: "Application Start:",
      lastDate: "Closing Last Date:",
      examDate: "Exam Schedule:",
      education: "Educational Qualification:",
      ageLimit: "Age Limit:",
      physical: "Physical Standards:",
      subjects: "Exam Subjects:",
      marking: "Negative Marking:",
      duration: "Exam Duration:"
    };
  }

  // Default: Hindi / Hinglish
  return {
    datesTitle: "Important Dates (महत्वपूर्ण तारीखें)",
    vacanciesTitle: "Total Vacancies (कुल रिक्तियां)",
    eligibilityTitle: "Eligibility & Age Criteria (पात्रता व आयु सीमा)",
    patternTitle: "Exam Pattern & Marking (परीक्षा योजना व अंकन)",
    pitfallsTitle: "3 Form Rejection Pitfalls to AVOID (फॉर्म रिजेक्ट होने से बचने के नियम)",
    applyStart: "Apply Start Date:",
    lastDate: "Last Date to Apply:",
    examDate: "Exam Schedule:",
    education: "Education:",
    ageLimit: "Age Limit:",
    physical: "Physical Standard:",
    subjects: "Subjects:",
    marking: "Negative Marking:",
    duration: "Duration:"
  };
}

function renderAiAnalysis(data, lang = 'hi') {
  const outputContainer = document.getElementById('aiOutputContainer');
  if (!outputContainer) return;

  const lbl = getLocalizedCardLabels(lang);

  outputContainer.innerHTML = `
    <div class="bg-gradient-to-b from-white to-slate-50 border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      <!-- Title & Official Verified Badge -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-900 border border-purple-300">
            ${data.aiPowered ? '✨ AI & Rules Verified Analysis' : '⚡ Smart Official Parser'}
          </span>
          <h3 class="text-xl sm:text-2xl font-black text-slate-900 mt-2">${data.title || 'Official Recruitment Notification Summary'}</h3>
        </div>
        <button onclick="window.print()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-300 flex items-center transition shadow-sm">
          🖨️ Print / Save PDF
        </button>
      </div>

      <!-- Critical 4-Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Card 1: Important Dates -->
        <div class="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <div class="text-blue-900 font-black text-sm flex items-center mb-3">
            <span class="text-lg mr-2">📅</span> ${lbl.datesTitle}
          </div>
          <ul class="text-xs space-y-2 text-slate-700 font-medium">
            <li><strong>${lbl.applyStart}</strong> ${data.dates?.startDate || 'Refer to notice'}</li>
            <li><strong>${lbl.lastDate}</strong> <span class="text-rose-600 font-black">${data.dates?.lastDate || 'Closing soon'}</span></li>
            <li><strong>${lbl.examDate}</strong> ${data.dates?.examDate || 'CBT (Computer Based)'}</li>
          </ul>
        </div>

        <!-- Card 2: Vacancies / Fees / Seats -->
        <div class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-sm">
          <div class="text-emerald-900 font-black text-sm flex items-center mb-3">
            <span class="text-lg mr-2">👥</span> ${data.vacancies?.cardTitle || lbl.vacanciesTitle}
          </div>
          <div class="text-2xl sm:text-3xl font-black text-emerald-900">${data.vacancies?.total || 'As per circular'}</div>
          <p class="text-xs text-slate-600 mt-2 font-medium">${data.vacancies?.breakdown || 'Category details specified in official PDF'}</p>
        </div>

        <!-- Card 3: Eligibility & Criteria -->
        <div class="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 shadow-sm">
          <div class="text-purple-900 font-black text-sm flex items-center mb-3">
            <span class="text-lg mr-2">🎓</span> ${lbl.eligibilityTitle}
          </div>
          <ul class="text-xs space-y-2 text-slate-700 font-medium">
            <li><strong>${lbl.education}</strong> ${data.eligibility?.education || 'Matric / 12th / Degree'}</li>
            <li><strong>${lbl.ageLimit}</strong> ${data.eligibility?.ageLimit || 'Standard rules apply'}</li>
            ${data.eligibility?.physical ? `<li><strong>${lbl.physical}</strong> ${data.eligibility.physical}</li>` : ''}
          </ul>
        </div>

        <!-- Card 4: Exam Pattern & Scheme -->
        <div class="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div class="text-amber-900 font-black text-sm flex items-center mb-3">
            <span class="text-lg mr-2">📝</span> ${data.examPattern?.cardTitle || lbl.patternTitle}
          </div>
          <ul class="text-xs space-y-2 text-slate-700 font-medium">
            <li><strong>${lbl.subjects}</strong> ${data.examPattern?.subjects || 'General Studies, Reasoning, Math'}</li>
            <li><strong>${lbl.marking}</strong> <span class="font-bold text-amber-900">${data.examPattern?.marking || 'As per official scheme'}</span></li>
            <li><strong>${lbl.duration}</strong> ${data.examPattern?.duration || '60-120 minutes'}</li>
          </ul>
        </div>
      </div>

      <!-- Critical Form Rejection Pitfalls -->
      <div class="bg-rose-50 border-2 border-rose-200 rounded-2xl p-6 shadow-sm">
        <h4 class="text-rose-900 font-black text-sm flex items-center mb-3">
          <span class="text-xl mr-2">⚠️</span> ${lbl.pitfallsTitle}
        </h4>
        <ul class="space-y-2 text-xs text-rose-900 font-semibold list-disc list-inside">
          ${(data.pitfalls || [
            "Photo must meet exact KB specs and must not be blurred.",
            "Category certificate must be issued before the crucial cutoff date.",
            "Signatures must be done in running handwriting; all caps will be rejected."
          ]).map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <!-- Action Footer -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 text-xs">
        <span class="text-slate-600 font-semibold">Need your photo resized according to these exact rules?</span>
        <button onclick="switchTab('resizer');" class="bg-gradient-to-r from-saffron-500 to-orange-600 hover:from-saffron-600 hover:to-orange-700 text-white font-black px-5 py-2.5 rounded-xl shadow transition">
          📸 Open Photo Resizer Tool
        </button>
      </div>
    </div>
  `;

  outputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getFallbackAnalysisObject(text, lang = 'hi') {
  const t = (text || '').toLowerCase();
  const isEn = lang === 'en' || lang === 'hi-latn';

  if (t.includes('cbse') || t.includes('verification of marks') || t.includes('re-evaluation')) {
    return {
      title: isEn ? "CBSE Class 10th & 12th Scrutiny & Re-Evaluation Rules 2026" : "CBSE 10वीं/12वीं अंक सत्यापन एवं पुनर्मूल्यांकन नियम 2026",
      dates: { startDate: "3-4 days after result", lastDate: "Strict 5-day window", examDate: "No Exam Required" },
      vacancies: { total: "₹500 / ₹700 / ₹100 per Subject", breakdown: "Step 1 (Marks Verification) ₹500 | Step 2 (Answer Book Photocopy) ₹700/₹500 | Step 3 (Re-evaluation) ₹100/question", cardTitle: isEn ? "Official Scrutiny Fee Structure" : "स्क्रूटिनी एवं जांच शुल्क" },
      eligibility: { education: "All students who appeared in 2026 Board Examinations", ageLimit: "No Age Limit", physical: null },
      examPattern: { subjects: "All theory and language subjects", marking: "Marks can increase or decrease; decreased marks are final", duration: "Online portal procedure", cardTitle: isEn ? "3-Step Scrutiny Process" : "3-चरणीय जांच प्रक्रिया" },
      pitfalls: ["Apply in strict hierarchy: Verification -> Photocopy -> Re-evaluation.", "Marks may decrease; old higher marks cannot be retained.", "Offline fee submission rejected; apply only via cbse.gov.in."],
      aiPowered: false
    };
  }

  if (t.includes('bseb') || t.includes('बिहार विद्यालय') || t.includes('स्क्रूटिनी')) {
    return {
      title: isEn ? "BSEB Bihar Board 10th & 12th Scrutiny & Compartmental Rules 2026" : "बिहार विद्यालय परीक्षा समिति (BSEB) - 10वीं/12वीं स्क्रूटिनी व कंपार्टमेंटल नियम",
      dates: { startDate: "2-3 days after result", lastDate: "As per official schedule", examDate: "Compartment Exam: May-June 2026" },
      vacancies: { total: "₹120 per Subject", breakdown: "Scrutiny: ₹120 per subject | Compartmental: Permitted for students failing in max 2 subjects", cardTitle: isEn ? "Scrutiny Fee & Compartment Limit" : "स्क्रूटिनी शुल्क एवं कंपार्टमेंटल सीमा" },
      eligibility: { education: "BSEB 10th Matric or 12th Inter appeared candidates", ageLimit: "No Age Limit", physical: null },
      examPattern: { subjects: "Theory subjects (50% OMR + 50% Subjective)", marking: "Re-totalling & unchecked answers verified; marks can change", duration: "Compartment: 3 Hours 15 Minutes", cardTitle: isEn ? "OMR Scrutiny Rules" : "OMR व स्क्रूटिनी जांच नियम" },
      pitfalls: ["Online application only via bsebinter.org; offline school forms rejected.", "Failing in 3 or more subjects disqualifies from Compartment exam.", "Admit card Roll Code and Roll Number must match exactly."],
      aiPowered: false
    };
  }

  if (t.includes('neet') || t.includes('mbbs') || t.includes('bds')) {
    return {
      title: isEn ? "NTA NEET (UG) 2026 MBBS/BDS Medical Entrance Bulletin" : "राष्ट्रीय परीक्षा एजेंसी (NTA) - NEET (UG) 2026 मेडिकल प्रवेश बुलेटिन",
      dates: { startDate: "09 February 2026", lastDate: "16 March 2026", examDate: "First Sunday of May 2026 (200 Minutes)" },
      vacancies: { total: "1,08,000+ MBBS & 28,000+ BDS Seats", breakdown: "15% All India Quota (MCC) + 85% State Quota Counseling + AIIMS & JIPMER", cardTitle: isEn ? "Total Available Medical Seats" : "कुल उपलब्ध मेडिकल सीटें" },
      eligibility: { education: "12th with PCB (Physics, Chemistry, Biology) & English (Min 50% Gen, 40% Reserved)", ageLimit: "Min 17 Years as of 31-12-2026. NO UPPER AGE LIMIT", physical: null },
      examPattern: { subjects: "Physics (45), Chemistry (45), Botany (45), Zoology (45) = 180 Questions (720 Marks)", marking: "+4 Marks for correct, -1 Negative Marking for incorrect answer", duration: "200 Minutes (3 Hours 20 Minutes) OMR Mode", cardTitle: isEn ? "720 Marks OMR Pattern" : "720 अंक OMR परीक्षा पैटर्न" },
      pitfalls: ["Passport & 4\"x6\" Postcard photo with 80% face visibility, white background & DOOP (Date of Photo) mandatory.", "Scanned impressions of all 10 fingers & thumbs required.", "Central format OBC-NCL / EWS certificates required."],
      aiPowered: false
    };
  }

  if (t.includes('ctet') || t.includes('teacher eligibility')) {
    return {
      title: isEn ? "CBSE Central Teacher Eligibility Test (CTET) 2026 Bulletin" : "CBSE केंद्रीय शिक्षक पात्रता परीक्षा (CTET) 2026",
      dates: { startDate: "07 March 2026", lastDate: "05 April 2026", examDate: "July 2026 (Paper-I & Paper-II)" },
      vacancies: { total: "Lifetime Validity Certificate (जीवनभर मान्य)", breakdown: "Qualifying exam for teacher recruitment in KVS, NVS, DSSSB & State Govts", cardTitle: isEn ? "CTET Eligibility Scope & Lifetime Validity" : "CTET प्रमाण पत्र मान्यता" },
      eligibility: { education: "Paper-1 (Class 1-5): 12th + D.El.Ed | Paper-2 (Class 6-8): Graduation + B.Ed / D.El.Ed", ageLimit: "No Upper Age Limit (Min 18 Years)", physical: null },
      examPattern: { subjects: "Paper-I: 150 MCQs / 150 Marks | Paper-II: 150 MCQs / 150 Marks", marking: "ZERO Negative Marking (No marks deducted for wrong answers)", duration: "150 Minutes (2.5 Hours) per paper", cardTitle: isEn ? "150 Marks Objective Pattern (No Negative Marking)" : "150 अंक परीक्षा योजना (कोई नेगेटिव मार्किंग नहीं)" },
      pitfalls: ["Do NOT sign in CAPITAL LETTERS; running cursive handwriting required.", "Language-1 and Language-2 must be different.", "Verify NCTE recognition of teacher training institute."],
      aiPowered: false
    };
  }

  // Default clean recruitment
  return {
    title: isEn ? "Official Government Circular Summary" : "सरकारी अधिसूचना का अधिकृत सार",
    dates: { startDate: "Online Application Active", lastDate: "Refer to official notice", examDate: "Announced on official portal" },
    vacancies: { total: "As per official notification", breakdown: "General, OBC, SC, ST, EWS reservation", cardTitle: isEn ? "Total Vacancies & Reservation" : "कुल रिक्तियां एवं आरक्षण" },
    eligibility: { education: "As per official recruitment rules", ageLimit: "Standard reservation applies", physical: null },
    examPattern: { subjects: "Core Subjects & Language", marking: "As per official scheme", duration: "60-120 Minutes", cardTitle: isEn ? "Examination Scheme" : "परीक्षा पैटर्न" },
    pitfalls: ["Upload clear photo and signature matching exact dimensions.", "Category certificate must be valid before cutoff date.", "Submit before deadline to avoid server downtime."],
    aiPowered: false
  };
}

document.addEventListener('DOMContentLoaded', initAiHelper);

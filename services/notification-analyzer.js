// services/notification-analyzer.js
// Generated notification analyzer
function identifyNotificationPreset(text) {
  const t = (text || '').toLowerCase();

  // Check 1: CBSE Scrutiny
  if ((t.includes('cbse') || t.includes('central board of secondary')) && 
      (t.includes('verification') || t.includes('photocopy') || t.includes('re-evaluation') || t.includes('scrutiny'))) {
    return 'cbse10th';
  }

  // Check 2: BSEB Bihar Board Scrutiny / Compartment
  if ((t.includes('bseb') || t.includes('बिहार विद्यालय परीक्षा समिति') || t.includes('bihar board') || t.includes('bsebinter')) &&
      (t.includes('स्क्रूटिनी') || t.includes('scrutiny') || t.includes('कंपार्टमेंटल') || t.includes('कम्पार्टमेंटल') || t.includes('मैट्रिक') || t.includes('इंटरमीडिएट'))) {
    return 'bsebBihar';
  }

  // Check 3: NEET UG
  if (t.includes('neet') || t.includes('national eligibility cum entrance') || (t.includes('mbbs') && t.includes('bds')) || t.includes('nta neet')) {
    return 'ntaNeet';
  }

  // Check 4: CTET
  if (t.includes('ctet') || (t.includes('teacher eligibility') && (t.includes('paper-i') || t.includes('paper-ii') || t.includes('cbse')))) {
    return 'ctetExam';
  }

  // Check 5: SSC GD Constable
  if (t.includes('constable (gd)') || (t.includes('staff selection commission') && t.includes('capf')) || t.includes('assam rifles') || t.includes('ssc gd')) {
    return 'sscGd';
  }

  // Check 6: UP Police Constable
  if (t.includes('upprpb') || t.includes('उत्तर प्रदेश पुलिस भर्ती') || t.includes('आरक्षी नागरिक पुलिस') || (t.includes('up police') && t.includes('60,244'))) {
    return 'upPolice';
  }

  // Check 7: Railway RRB ALP
  if (t.includes('assistant loco pilot') || t.includes('cen 01/2026') || (t.includes('railway') && t.includes('alp')) || t.includes('rrb alp')) {
    return 'rrbAlp';
  }

  // Check 8: Bihar Police Constable
  if (t.includes('csbc') || t.includes('केन्द्रीय चयन पर्षद') || (t.includes('बिहार पुलिस') && t.includes('सिपाही')) || t.includes('bihar police')) {
    return 'biharPolice';
  }

  return null;
}

function parseCustomNotification(text, lang = 'hi') {
  const t = text.toLowerCase();
  const isEnglish = lang === 'en' || lang === 'hi-latn';

  const isScrutiny = t.includes('scrutiny') || t.includes('verification') || t.includes('re-evaluation') || t.includes('स्क्रूटिनी') || t.includes('पुनर्मूल्यांकन') || t.includes('compartment') || t.includes('कम्पार्टमेंटल');
  const isEntrance = t.includes('entrance') || t.includes('admission') || t.includes('neet') || t.includes('jee') || t.includes('cuet') || t.includes('mbbs') || t.includes('b.tech');
  const isTet = t.includes('tet') || t.includes('stet') || t.includes('ctet') || t.includes('teacher eligibility') || t.includes('शिक्षक पात्रता');
  const isPoliceDefense = t.includes('police') || t.includes('constable') || t.includes('sub inspector') || t.includes('army') || t.includes('navy') || t.includes('air force') || t.includes('दौड़') || t.includes('ऊंचाई') || t.includes('physical');

  const dateMatch = text.match(/\\b(\\d{1,2}[\\/\\.-]\\d{1,2}[\\/\\.-]\\d{2,4})\\b/g) || [];
  const startDate = dateMatch[0] || (isEnglish ? 'Online Application Active' : 'ऑनलाइन आवेदन शुरू');
  const lastDate = dateMatch[1] || (isEnglish ? 'Refer to Official Portal' : 'आधिकारिक पोर्टल देखें');
  const examDate = dateMatch[2] || (isEnglish ? 'Announced soon on official portal' : 'आधिकारिक पोर्टल पर जल्द घोषित');

  const feeMatch = text.match(/(?:rs\\.?|₹|fee|शुल्क)\\s*[:=]?\\s*(\\d+[\\d,]*)/i);
  const vacancyMatch = text.match(/(\\d+[\\d,]*)\\s*(posts?|vacanc|pad|seats?|रिक्तियां|पद)/i);

  if (isScrutiny) {
    const feeStr = feeMatch ? `₹\${feeMatch[1]}` : (isEnglish ? '₹100 - ₹500 per Subject' : '₹100 - ₹500 प्रति विषय');
    return {
      title: isEnglish ? 'Board Examination Scrutiny & Marks Re-Evaluation Circular' : 'बोर्ड परीक्षा स्क्रूटिनी एवं अंक पुनर्गणना दिशा-निर्देश',
      dates: { startDate, lastDate, examDate: isEnglish ? 'Re-evaluation results in 15-25 days' : 'स्क्रूटिनी परिणाम 15-25 दिनों में ऑनलाइन जारी' },
      vacancies: {
        total: feeStr,
        breakdown: isEnglish ? 'Fee payable per subject/answer-sheet as per official board norms' : 'बोर्ड के नियमानुसार प्रति विषय/उत्तरपुस्तिका देय स्क्रूटिनी शुल्क',
        cardTitle: isEnglish ? 'Scrutiny Fee & Re-checking Charges' : 'स्क्रूटिनी शुल्क एवं दरें'
      },
      eligibility: {
        education: isEnglish ? 'Students who appeared in the recent Board Examination' : 'संबंधित बोर्ड परीक्षा में सम्मिलित छात्र',
        ageLimit: isEnglish ? 'No Age Limit — Open to all enrolled students' : 'कोई उम्र सीमा नहीं — सभी पंजीकृत छात्र पात्र हैं',
        physical: null
      },
      examPattern: {
        subjects: isEnglish ? 'All theory papers appearing on mark-sheet' : 'अंकतालिका में अंकित सभी सैद्धांतिक विषय',
        marking: isEnglish ? 'Marks re-calculation & verification of un-checked answers' : 'अंकों का योग एवं बिना जांचे उत्तरों का सत्यापन (अंक बढ़ या घट सकते हैं)',
        duration: isEnglish ? 'Step-wise Scrutiny Online Window' : 'ऑनलाइन स्क्रूटिनी पोर्टल प्रक्रिया',
        cardTitle: isEnglish ? 'Scrutiny Evaluation Process' : 'स्क्रूटिनी जांच प्रक्रिया'
      },
      pitfalls: [
        isEnglish ? 'Offline forms sent via school or postal mail will be rejected.' : 'स्कूल के माध्यम से या डाक द्वारा ऑफलाइन आवेदन स्वीकार नहीं होंगे।',
        isEnglish ? 'Ensure accurate Roll Code and Roll Number from your original admit card.' : 'मूल एडमिट कार्ड से मिलान करके ही रोल कोड व रोल नंबर दर्ज करें।',
        isEnglish ? 'Fees once paid are non-refundable irrespective of outcome.' : 'जमा किया गया स्क्रूटिनी शुल्क किसी भी परिस्थिति में वापस नहीं होगा।'
      ],
      aiPowered: false
    };
  }

  if (isEntrance) {
    const seatsStr = vacancyMatch ? `\${vacancyMatch[1]} Seats` : (isEnglish ? 'Nationwide Participating Colleges' : 'अखिल भारतीय सहभागी संस्थान');
    return {
      title: isEnglish ? 'National Entrance Examination & Admission Bulletin' : 'राष्ट्रीय प्रवेश परीक्षा एवं प्रवेश सूचना विवरणिका',
      dates: { startDate, lastDate, examDate },
      vacancies: {
        total: seatsStr,
        breakdown: isEnglish ? 'Central & State Quota Seats across participating universities' : 'सहभागी विश्वविद्यालयों एवं संस्थानों में उपलब्ध सीटें',
        cardTitle: isEnglish ? 'Available Seats & Quota' : 'उपलब्ध सीटें एवं आरक्षण'
      },
      eligibility: {
        education: isEnglish ? 'Passed or Appearing in Qualifying Examination (12th / Degree)' : 'न्यूनतम अर्हक परीक्षा (12वीं/स्नातक) उत्तीर्ण अथवा अपीयरिंग',
        ageLimit: isEnglish ? 'As per National Regulatory Body norms' : 'संबंधित राष्ट्रीय नियामक संस्था के नियमानुसार',
        physical: null
      },
      examPattern: {
        subjects: isEnglish ? 'Subject-specific Multiple Choice Questions (MCQs)' : 'विषय-विशिष्ट बहुविकल्पीय वस्तुनिष्ठ प्रश्न',
        marking: isEnglish ? 'Negative Marking applicable for wrong responses as per scheme' : 'प्रत्येक गलत उत्तर के लिए नियमानुसार नेगेटिव मार्किंग',
        duration: isEnglish ? '120 - 180 Minutes (Computer / OMR Mode)' : '120 से 180 मिनट की परीक्षा',
        cardTitle: isEnglish ? 'Entrance Test Scheme & Marking' : 'प्रवेश परीक्षा योजना एवं मार्किंग'
      },
      pitfalls: [
        isEnglish ? 'Ensure candidate name matches exactly with Class 10 Certificate.' : 'परीक्षार्थी का नाम 10वीं के प्रमाण पत्र से अक्षरशः मिलना चाहिए।',
        isEnglish ? 'Upload recent passport photo with plain background; no spectacles or caps.' : 'सफेद बैकग्राउंड वाली नई फोटो अपलोड करें; चश्मा व टोपी मान्य नहीं।',
        isEnglish ? 'Check category certificate validity as on crucial application cutoff date.' : 'आरक्षण प्रमाण पत्र की वैधता तिथि ध्यानपूर्वक जांचें।'
      ],
      aiPowered: false
    };
  }

  if (isTet) {
    return {
      title: isEnglish ? 'Teacher Eligibility Test (TET) Official Guidelines' : 'शिक्षक पात्रता परीक्षा (TET) आधिकारिक दिशा-निर्देश',
      dates: { startDate, lastDate, examDate },
      vacancies: {
        total: isEnglish ? 'Eligibility Certificate (Lifetime Validity)' : 'पात्रता प्रमाण पत्र (आजीवन वैधता)',
        breakdown: isEnglish ? 'Qualifying exam for Primary & Upper Primary school teacher recruitments' : 'प्राथमिक एवं उच्च प्राथमिक विद्यालयों में शिक्षक भर्ती हेतु पात्रता',
        cardTitle: isEnglish ? 'TET Certificate Scope & Validity' : 'TET प्रमाण पत्र मान्यता'
      },
      eligibility: {
        education: isEnglish ? 'D.El.Ed / B.Ed / Graduation with specified minimum percentage' : 'D.El.Ed / B.Ed / न्यूनतम अंकों के साथ स्नातक',
        ageLimit: isEnglish ? 'No Upper Age Limit for Eligibility Examination' : 'पात्रता परीक्षा हेतु कोई अधिकतम उम्र सीमा नहीं',
        physical: null
      },
      examPattern: {
        subjects: isEnglish ? 'Child Development, Mathematics, EVS/Social Studies, Languages' : 'बाल विकास एवं शिक्षाशास्त्र, गणित, पर्यावरण/सामाजिक अध्ययन, भाषाएं',
        marking: isEnglish ? 'NO NEGATIVE MARKING — Qualifying cutoff applies (60% Gen / 55% Reserved)' : 'शून्य नेगेटिव मार्किंग — न्यूनतम अर्हक अंक (सामान्य 60%, आरक्षित 55%)',
        duration: isEnglish ? '150 Minutes (2.5 Hours) per paper' : '150 मिनट (2.5 घंटे) प्रति पेपर',
        cardTitle: isEnglish ? 'TET Exam Pattern (No Negative Marking)' : 'TET परीक्षा पैटर्न (कोई नेगेटिव मार्किंग नहीं)'
      },
      pitfalls: [
        isEnglish ? 'Do not sign in ALL CAPITAL LETTERS; use regular running cursive handwriting.' : 'कैपिटल लेटर्स में हस्ताक्षर न करें; सामान्य रनिंग हैंडराइटिंग का प्रयोग करें।',
        isEnglish ? 'Both language selections must be different from each other.' : 'भाषा-1 और भाषा-2 दोनों अलग-अलग भाषाएं होनी चाहिए।',
        isEnglish ? 'Verify NCTE recognition status of your teacher training institution.' : 'अपने शिक्षण प्रशिक्षण संस्थान (B.Ed/D.El.Ed) की NCTE मान्यता अवश्य जांच लें।'
      ],
      aiPowered: false
    };
  }

  if (isPoliceDefense) {
    const totalPosts = vacancyMatch ? vacancyMatch[1] : (isEnglish ? 'As per official notification' : 'विज्ञप्ति के अनुसार');
    return {
      title: isEnglish ? 'Uniform Services / Police Recruitment Notification' : 'पुलिस / रक्षा बल भर्ती आधिकारिक अधिसूचना',
      dates: { startDate, lastDate, examDate },
      vacancies: {
        total: totalPosts,
        breakdown: isEnglish ? 'Category-wise: UR, OBC, SC, ST, EWS quota applicable' : 'अनारक्षित, OBC, SC, ST, EWS नियमानुसार आरक्षण',
        cardTitle: isEnglish ? 'Total Vacancies & Quota' : 'कुल रिक्तियां एवं आरक्षण'
      },
      eligibility: {
        education: isEnglish ? '10th / 12th / Graduate as per post rank' : '10वीं / 12वीं / पद के अनुसार स्नातक',
        ageLimit: isEnglish ? '18 to 25/28 Years (Relaxation for reserved categories)' : '18 से 25/28 वर्ष (आरक्षित वर्गों को नियमानुसार छूट)',
        physical: isEnglish ? 'Height: Male 168cm, Female 152cm. Running and physical efficiency test mandatory.' : 'ऊंचाई: पुरुष 168 सेमी, महिला 152 सेमी। दौड़ एवं शारीरिक दक्षता अनिवार्य।'
      },
      examPattern: {
        subjects: isEnglish ? 'General Studies, Reasoning, Quantitative Aptitude, Language' : 'सामान्य अध्ययन, तार्किक क्षमता (Reasoning), गणित, भाषा',
        marking: isEnglish ? 'Negative marking applicable for incorrect responses' : 'गलत उत्तरों के लिए नियमानुसार नेगेटिव मार्किंग',
        duration: isEnglish ? '90 to 120 Minutes (CBT / OMR Mode)' : '90 से 120 मिनट की परीक्षा',
        cardTitle: isEnglish ? 'Written & Physical Selection Scheme' : 'लिखित एवं शारीरिक परीक्षा योजना'
      },
      pitfalls: [
        isEnglish ? 'Physical measurements (Height & Chest) strictly measured; no relaxations except certified domicile.' : 'ऊंचाई और सीना माप में कोई ढील नहीं दी जाती; मानक अवश्य जांचें।',
        isEnglish ? 'Category and domicile certificates must be issued prior to the application closing date.' : 'जाति एवं मूल निवास प्रमाण पत्र आवेदन की अंतिम तिथि से पूर्व का होना अनिवार्य है।',
        isEnglish ? 'Photo must show both ears clearly; head coverings and sunglasses will cause rejection.' : 'फोटो में दोनों कान साफ दिखने चाहिए; चश्मा या टोपी पहनने पर फॉर्म निरस्त हो जाता है।'
      ],
      aiPowered: false
    };
  }

  // Generic Civil / Job Recruitment
  const totalPosts = vacancyMatch ? vacancyMatch[1] : (isEnglish ? 'As per official notification' : 'विज्ञप्ति के अनुसार');
  return {
    title: isEnglish ? 'Official Recruitment Notification Summary' : 'सरकारी भर्ती अधिसूचना का अधिकृत सार',
    dates: { startDate, lastDate, examDate },
    vacancies: {
      total: totalPosts,
      breakdown: isEnglish ? 'Category-wise reservations as per Government of India / State rules' : 'सरकारी नियमानुसार श्रेणीवार आरक्षण विवरण',
      cardTitle: isEnglish ? 'Total Vacancies & Breakdown' : 'कुल रिक्तियां एवं आरक्षण'
    },
    eligibility: {
      education: isEnglish ? 'Matriculation / 10+2 / Degree depending on post cadre' : 'पद के अनुसार 10वीं / 12वीं / स्नातक डिग्री',
      ageLimit: isEnglish ? '18 to 27/30 Years (Upper age relaxation for OBC/SC/ST/PwD)' : '18 से 27/30 वर्ष (आरक्षित श्रेणियों को नियमानुसार आयु सीमा में छूट)',
      physical: null
    },
    examPattern: {
      subjects: isEnglish ? 'General Awareness, Reasoning, Quantitative Aptitude, Language' : 'सामान्य ज्ञान, गणित, रीजनिंग, भाषा (हिन्दी/अंग्रेजी)',
      marking: isEnglish ? 'Objective MCQs with negative marking for incorrect options' : 'वस्तुनिष्ठ बहुविकल्पीय प्रश्न, गलत उत्तर पर नेगेटिव मार्किंग',
      duration: isEnglish ? '60 to 120 Minutes (Computer Based Examination)' : '60 से 120 मिनट की कंप्यूटर आधारित परीक्षा',
      cardTitle: isEnglish ? 'Examination Scheme & Marking' : 'परीक्षा पैटर्न व मार्किंग'
    },
    pitfalls: [
      isEnglish ? 'Submit online form at least 3-4 days before final deadline to avoid server overload.' : 'अंतिम तिथि से कम से कम 3-4 दिन पहले फॉर्म सबमिट करें ताकि सर्वर धीमा न हो।',
      isEnglish ? 'Upload clear photo and signature strictly within specified pixel and KB dimensions.' : 'सटीक KB साइज और डायमेंशन में ही साफ फोटो और सिग्नेचर अपलोड करें।',
      isEnglish ? 'Category/EWS certificates must be in official prescribed format valid for current year.' : 'आरक्षण प्रमाण पत्र चालू वर्ष का और निर्धारित सरकारी प्रारूप में होना चाहिए।'
    ],
    aiPowered: false
  };
}

const PRESET_MAP = {
  "sscGd": {
    "type": "DEFENSE_JOB",
    "en": {
      "title": "SSC Constable (GD) in CAPFs, SSF & Assam Rifles 2026",
      "dates": {
        "startDate": "05-09-2026",
        "lastDate": "14-10-2026 (23:00 hrs)",
        "examDate": "January - February 2027 (CBT)"
      },
      "vacancies": {
        "total": "39,481 Posts (Male: 35,612, Female: 3,869)",
        "breakdown": "UR: 14,312 | OBC: 8,400 | SC: 5,600 | EWS: 4,100 | ST: 3,200 (BSF, CISF, CRPF, SSB, ITBP, AR, SSF)",
        "cardTitle": "Total Vacancies & Force Breakdown"
      },
      "eligibility": {
        "education": "10th Class (Matriculation) Pass from a recognized Board",
        "ageLimit": "18 to 23 Years as on 01-01-2027 (OBC +3 yrs up to 26, SC/ST +5 yrs up to 28)",
        "physical": "Male: Height 170cm, Chest 80-85cm, 5km Run in 24m | Female: Height 157cm, 1.6km Run in 8.5m"
      },
      "examPattern": {
        "subjects": "Reasoning (20 Qs), GK (20 Qs), Elementary Math (20 Qs), English/Hindi (20 Qs) = 80 Qs / 160 Marks",
        "marking": "0.25 Marks Negative Marking for each incorrect answer",
        "duration": "60 Minutes (1 Hour CBT Mode)",
        "cardTitle": "80 Qs / 160 Marks CBT Scheme"
      },
      "pitfalls": [
        "Live Web Camera Capture: Ensure white wall background, ample front lighting, and no cap or spectacles.",
        "Crucial Date for OBC-NCL / EWS Certificate is the closing date (14-10-2026); older expired certificates cause cancellation.",
        "Post preferences (CISF, BSF, CRPF, etc.) locked at submission cannot be modified at document verification."
      ]
    },
    "hi": {
      "title": "कर्मचारी चयन आयोग (SSC) - जीडी कांस्टेबल (CAPF, SSF व असम राइफल्स) 2026",
      "dates": {
        "startDate": "05-09-2026",
        "lastDate": "14-10-2026 (रात 11:00 बजे तक)",
        "examDate": "जनवरी - फरवरी 2027 (CBT ऑनलाइन परीक्षा)"
      },
      "vacancies": {
        "total": "39,481 पद (पुरुष: 35,612, महिला: 3,869)",
        "breakdown": "अनारक्षित: 14,312 | OBC: 8,400 | SC: 5,600 | EWS: 4,100 | ST: 3,200 (BSF, CISF, CRPF, SSB, ITBP, AR, SSF)",
        "cardTitle": "कुल रिक्तियां एवं बलवार वितरण"
      },
      "eligibility": {
        "education": "मान्यता प्राप्त बोर्ड से 10वीं (मैट्रिक) उत्तीर्ण",
        "ageLimit": "18 से 23 वर्ष (01-01-2027 को) | OBC को 3 वर्ष (26 वर्ष तक), SC/ST को 5 वर्ष (28 वर्ष तक) छूट",
        "physical": "पुरुष: ऊंचाई 170 सेमी, सीना 80-85 सेमी, दौड़ 5 किमी 24 मिनट में | महिला: ऊंचाई 157 सेमी, दौड़ 1.6 किमी 8.5 मिनट में"
      },
      "examPattern": {
        "subjects": "रीजनिंग (20), सामान्य ज्ञान (20), गणित (20), हिन्दी/अंग्रेजी (20) = कुल 80 प्रश्न (160 अंक)",
        "marking": "प्रत्येक गलत उत्तर पर 0.25 अंक की नेगेटिव मार्किंग",
        "duration": "60 मिनट (1 घंटा) कंप्यूटर आधारित परीक्षा",
        "cardTitle": "80 प्रश्न / 160 अंक ऑनलाइन परीक्षा पैटर्न"
      },
      "pitfalls": [
        "लाइव वेबकैम फोटो: चश्मा या टोपी न पहनें, पीछे सफेद दीवार और चेहरे पर पर्याप्त रोशनी रखें।",
        "OBC-NCL और EWS प्रमाण पत्र 14-10-2026 से पूर्व का जारी होना चाहिए; बाद का प्रमाण पत्र मान्य नहीं होगा।",
        "ऑनलाइन फॉर्म में चुनी गई पोस्ट प्राथमिकता (CISF, CRPF, BSF) बाद में किसी भी परिस्थिति में नहीं बदली जा सकती।"
      ]
    }
  },
  "upPolice": {
    "type": "DEFENSE_JOB",
    "en": {
      "title": "UP Police Recruitment Board (UPPRPB) - 60,244 Constable Direct Recruitment 2026",
      "dates": {
        "startDate": "10-08-2026",
        "lastDate": "30-09-2026",
        "examDate": "Offline OMR Exam (2 Hours)"
      },
      "vacancies": {
        "total": "60,244 Posts (Mega Recruitment)",
        "breakdown": "General (UR): 24,102 | OBC: 16,264 | SC: 12,650 | EWS: 6,024 | ST: 1,204",
        "cardTitle": "Total Vacancies & Category Breakdown"
      },
      "eligibility": {
        "education": "10+2 (Intermediate) Passed from any recognized Board in India",
        "ageLimit": "Male: 18 to 25 Years | Female: 18 to 28 Years (UP native OBC/SC/ST receive +5 years relaxation)",
        "physical": "Male: Height 168cm, Chest 79-84cm, Run 4.8km in 25m | Female: Height 152cm, Min Weight 40kg, Run 2.4km in 14m"
      },
      "examPattern": {
        "subjects": "General Knowledge (38), General Hindi (37), Numerical Aptitude (38), Mental Ability/Reasoning (37) = 150 Qs / 300 Marks",
        "marking": "0.50 Negative Marks for each incorrect answer (1/4th deduction)",
        "duration": "120 Minutes (2 Hours) Offline OMR Mode",
        "cardTitle": "150 Questions / 300 Marks OMR Scheme"
      },
      "pitfalls": [
        "Photo background must be white or light grey. Both ears must be clearly visible; glasses or caps strictly rejected.",
        "OBC Non-Creamy Layer (NCL) & EWS certificates must be issued on or after 1st April of current financial year.",
        "Candidates from outside Uttar Pradesh will be treated strictly under the Unreserved (UR/General) category."
      ]
    },
    "hi": {
      "title": "उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB) - 60,244 आरक्षी सीधी भर्ती 2026",
      "dates": {
        "startDate": "10-08-2026",
        "lastDate": "30-09-2026",
        "examDate": "ऑफलाइन OMR लिखित परीक्षा (120 मिनट)"
      },
      "vacancies": {
        "total": "60,244 पद (ऐतिहासिक बम्पर भर्ती)",
        "breakdown": "अनारक्षित: 24,102 | OBC: 16,264 | SC: 12,650 | EWS: 6,024 | ST: 1,204",
        "cardTitle": "कुल रिक्तियां एवं श्रेणीवार आरक्षण"
      },
      "eligibility": {
        "education": "भारत में विधि द्वारा स्थापित बोर्ड से 12वीं (इंटरमीडिएट) उत्तीर्ण",
        "ageLimit": "पुरुष: 18 से 25 वर्ष | महिला: 18 से 28 वर्ष (UP के OBC/SC/ST को 5 वर्ष की अधिकतम छूट)",
        "physical": "पुरुष: ऊंचाई 168 सेमी, सीना 79-84 सेमी, दौड़ 4.8 किमी 25 मिनट | महिला: ऊंचाई 152 सेमी, वजन न्यूनतम 40 किग्रा, दौड़ 2.4 किमी 14 मिनट"
      },
      "examPattern": {
        "subjects": "सामान्य ज्ञान (38), सामान्य हिन्दी (37), गणित (38), रीजनिंग (37) = कुल 150 प्रश्न (300 अंक)",
        "marking": "प्रत्येक गलत उत्तर के लिए 0.50 अंक (एक चौथाई) काटे जाएंगे",
        "duration": "120 मिनट (2 घंटे) OMR शीट आधारित",
        "cardTitle": "150 प्रश्न / 300 अंक परीक्षा पैटर्न"
      },
      "pitfalls": [
        "फोटो का बैकग्राउंड सफेद या हल्का ग्रे होना चाहिए; चश्मा और टोपी पहनकर फोटो अपलोड करने पर फॉर्म सीधा रिजेक्ट होगा।",
        "OBC नॉन-क्रीमी लेयर एवं EWS प्रमाण पत्र 1 अप्रैल के बाद का होना अनिवार्य है।",
        "उत्तर प्रदेश के बाहर के सभी आरक्षित अभ्यर्थी केवल अनारक्षित (General) श्रेणी में ही मान्य होंगे।"
      ]
    }
  },
  "rrbAlp": {
    "type": "CIVIL_TECHNICAL_JOB",
    "en": {
      "title": "Ministry of Railways (RRBs) - CEN 01/2026 Assistant Loco Pilot (ALP) Recruitment",
      "dates": {
        "startDate": "20-01-2026",
        "lastDate": "19-02-2026 (23:59 hrs)",
        "examDate": "CBT-1: June-August 2026 | CBT-2: Sept 2026"
      },
      "vacancies": {
        "total": "18,799 Posts across all Zonal Railways",
        "breakdown": "All Indian Railway Zones (Pay Level-2: Basic ₹19,900/- + Running Kilometre Allowances)",
        "cardTitle": "Total Posts & Railway Zones Breakdown"
      },
      "eligibility": {
        "education": "Matriculation (10th) + ITI in specified trades OR 3-Year Engineering Diploma OR B.Tech degree",
        "ageLimit": "18 to 30 Years as on 01-07-2026 (OBC +3 yrs to 33, SC/ST +5 yrs to 35)",
        "physical": "A-1 Medical Standard MANDATORY: Distant vision 6/6, 6/6 without glasses (No spectacles allowed; LASIK surgery strictly unfit)"
      },
      "examPattern": {
        "subjects": "CBT-1 (75 Qs, 60 mins): Math, Reasoning, Science, GA | CBT-2 Part-A (100 Qs) + Part-B Trade Test (75 Qs qualifying)",
        "marking": "1/3rd Negative Marking for each wrong answer in both CBT-1 & CBT-2",
        "duration": "CBT-1: 60 Minutes | CBT-2: 150 Minutes | CBAT: Aptitude Battery",
        "cardTitle": "CBT-1, CBT-2 & Psycho Selection Stages"
      },
      "pitfalls": [
        "LASIK Surgery Disqualification: Candidates who underwent LASIK or refractive eye surgery are permanently disqualified from A-1 Medical.",
        "CBT-2 Part-B Qualifying Rule: Scoring 35% in trade syllabus is mandatory; failing Part-B causes rejection even if Part-A score is 100%.",
        "One Zone Only: Candidates can apply to only ONE RRB zone; applying to multiple zones results in lifetime debarment."
      ]
    },
    "hi": {
      "title": "रेलवे भर्ती बोर्ड (RRB) - CEN 01/2026 असिस्टेंट लोको पायलट (ALP) 18,799 पद",
      "dates": {
        "startDate": "20-01-2026",
        "lastDate": "19-02-2026",
        "examDate": "CBT-1: जून-अगस्त 2026 | CBT-2: सितंबर 2026"
      },
      "vacancies": {
        "total": "18,799 पद (सभी जोनल रेलवे)",
        "breakdown": "नॉर्दर्न, वेस्टर्न, ईस्टर्न, सेंट्रल आदि जोन्स (पे-लेवल 2: बेसिक ₹19,900/- + रनिंग किलोमीटर भत्ता)",
        "cardTitle": "कुल रिक्त पद एवं रेलवे जोन"
      },
      "eligibility": {
        "education": "10वीं + संबंधित ट्रेड में ITI अथवा 3-वर्षीय इंजीनियरिंग डिप्लोमा अथवा B.Tech डिग्री",
        "ageLimit": "18 से 30 वर्ष (01-07-2026 को) | OBC को 3 वर्ष (33 तक), SC/ST को 5 वर्ष (35 तक) छूट",
        "physical": "A-1 मेडिकल मानक अनिवार्य: दूर दृष्टि 6/6, 6/6 बिना चश्मे के (चश्मा अमान्य; लेसिक/लेजर सर्जरी कराने वाले अनफिट)"
      },
      "examPattern": {
        "subjects": "CBT-1: गणित (20), रीजनिंग (25), सामान्य विज्ञान (20), GA (10) = 75 प्रश्न | CBT-2: पार्ट-A (100 प्रश्न) + पार्ट-B ट्रेड टेस्ट (75 प्रश्न)",
        "marking": "प्रत्येक गलत उत्तर पर 1/3 (एक तिहाई) अंक काटे जाएंगे",
        "duration": "CBT-1: 60 मिनट | CBT-2: 150 मिनट | CBAT: साइको टेस्ट",
        "cardTitle": "CBT-1, CBT-2 व साइको परीक्षा पैटर्न"
      },
      "pitfalls": [
        "लेसिक सर्जरी अनफिट: जिन्होंने आंखों में लेसिक या रिफ्रैक्टिव सर्जरी कराई है, वे ALP A-1 मेडिकल में हमेशा के लिए अनफिट घोषित होते हैं।",
        "पार्ट-B पास करना अनिवार्य: CBT-2 के पार्ट-B में 35% अंक पाना अनिवार्य है, इसमें फेल होने पर पार्ट-A में 100 अंक होने पर भी चयन नहीं होगा।",
        "केवल एक RRB से आवेदन: एक से अधिक रेलवे बोर्ड में आवेदन करने पर सभी आवेदन रद्द कर दिए जाएंगे।"
      ]
    }
  },
  "biharPolice": {
    "type": "DEFENSE_JOB",
    "en": {
      "title": "Central Selection Board of Constable (CSBC) - Bihar Police 21,391 Constable Recruitment 2026",
      "dates": {
        "startDate": "20-07-2026",
        "lastDate": "25-08-2026",
        "examDate": "Written Exam: September 2026 | PET: December 2026"
      },
      "vacancies": {
        "total": "21,391 Posts (35% Horizontal Reservation for Women)",
        "breakdown": "UR: 8,556 | EWS: 2,140 | SC: 3,400 | ST: 228 | EBC: 3,842 | BC: 2,570 | BC Women: 655",
        "cardTitle": "Total Vacancies & Category Distribution"
      },
      "eligibility": {
        "education": "10+2 (Intermediate) Passed or Moulvi / Shastri certificate from Bihar Madarsa/Sanskrit Board",
        "ageLimit": "General Male/Female: 18-25 Yrs | BC/EBC Male: 27 Yrs | BC/EBC Female: 28 Yrs | SC/ST: 30 Yrs",
        "physical": "Male Height: 165cm (SC/ST 160cm), Chest 81-86cm | Female Height: 155cm, Min Weight: 48kg"
      },
      "examPattern": {
        "subjects": "Written Exam (100 Qs / 100 Marks): Hindi, English, Math, Social Science, Science, GK (Qualifying 30% marks needed)",
        "marking": "ZERO Negative Marking. Final Merit is 100% prepared on Physical Efficiency Test (PET 100 Marks)",
        "duration": "120 Minutes (2 Hours) Written OMR | PET: Running (50 Marks), Shot Put (25 Marks), High Jump (25 Marks)",
        "cardTitle": "Selection Scheme: Written Qualifying, Merit 100% on PET"
      },
      "pitfalls": [
        "Written Test DOES NOT create merit: Even 90 marks in written test only qualifies for PET; final selection is 100% based on running time and jump heights.",
        "Female Minimum Weight: Female candidates weighing less than 48 kg will be rejected at physical measurement, irrespective of merit.",
        "Bihar Domicile Requirement: EBC/BC/EWS/SC/ST reservation benefits require permanent domicile certificate issued by Bihar Revenue Officer."
      ]
    },
    "hi": {
      "title": "केन्द्रीय चयन पर्षद (सिपाही भर्ती), बिहार (CSBC) - 21,391 सिपाही पद सीधी भर्ती 2026",
      "dates": {
        "startDate": "20-07-2026",
        "lastDate": "25-08-2026",
        "examDate": "लिखित परीक्षा: सितंबर 2026 | शारीरिक दक्षता (PET): दिसंबर 2026"
      },
      "vacancies": {
        "total": "21,391 पद (महिलाओं हेतु 35% क्षैतिज आरक्षण)",
        "breakdown": "अनारक्षित: 8,556 | EWS: 2,140 | SC: 3,400 | ST: 228 | EBC: 3,842 | BC: 2,570 | पिछड़े वर्ग की महिला: 655",
        "cardTitle": "कुल रिक्त पद एवं कोटिवार विवरण"
      },
      "eligibility": {
        "education": "10+2 (इंटरमीडिएट) उत्तीर्ण अथवा मौलवी / शास्त्री प्रमाण पत्र",
        "ageLimit": "सामान्य: 18-25 वर्ष | अत्यंत पिछड़ा/पिछड़ा वर्ग पुरुष: 27 वर्ष | महिला: 28 वर्ष | SC/ST: 30 वर्ष",
        "physical": "पुरुष ऊंचाई: 165 सेमी (SC/ST 160 सेमी) | महिला ऊंचाई: 155 सेमी (न्यूनतम वजन 48 किग्रा) | सीना: पुरुष 81-86 सेमी"
      },
      "examPattern": {
        "subjects": "लिखित परीक्षा 100 प्रश्न / 100 अंक (केवल शारीरिक परीक्षा हेतु क्वालिफाइंग - न्यूनतम 30% अंक अनिवार्य)",
        "marking": "शून्य नेगेटिव मार्किंग (कोई माइनस मार्किंग नहीं)। अंतिम मेरिट पूर्णतः शारीरिक परीक्षा (PET 100 अंक) पर बनेगी",
        "duration": "120 मिनट लिखित परीक्षा | PET: दौड़ (50 अंक), गोला फेंक (25 अंक), ऊंची कूद (25 अंक)",
        "cardTitle": "चयन प्रक्रिया: लिखित केवल अर्हक, 100% मेरिट PET पर"
      },
      "pitfalls": [
        "लिखित परीक्षा से मेरिट नहीं बनती: लिखित में 90 अंक लाने पर भी केवल PET का बुलावा आता है; अंतिम मेरिट दौड़ और कूद के अंकों से तय होती है।",
        "महिला अभ्यर्थियों का न्यूनतम वजन: महिला परीक्षार्थी का वजन कम से कम 48 किग्रा होना अनिवार्य है, कम होने पर अयोग्य घोषित कर दिया जाएगा।",
        "बिहार मूल निवास: आरक्षण का लाभ केवल बिहार के मूल निवासी अभ्यर्थियों को अंचलाधिकारी/राजस्व अधिकारी स्तर के प्रमाण पत्र पर मिलेगा।"
      ]
    }
  },
  "cbse10th": {
    "type": "BOARD_SCRUTINY",
    "en": {
      "title": "CBSE Class 10th & 12th Marks Verification, Answer Book Photocopy & Re-Evaluation Rules 2026",
      "dates": {
        "startDate": "Within 3 to 4 days after Board Result declaration",
        "lastDate": "Strict 5-day window for Verification; strictly no extensions permitted",
        "examDate": "No Exam Required — Re-evaluation result published online within 15-20 days"
      },
      "vacancies": {
        "total": "₹500 / ₹700 / ₹100 per Subject/Question",
        "breakdown": "Step 1 (Marks Verification): ₹500/subject | Step 2 (Answer Book Photocopy): ₹700 for 12th, ₹500 for 10th | Step 3 (Re-evaluation): ₹100 per question",
        "cardTitle": "Official Fee Structure & Charges (Per Subject)"
      },
      "eligibility": {
        "education": "Candidates who appeared in CBSE Class 10th or 12th Board Examinations 2026",
        "ageLimit": "No Age Limit — Open to all registered regular and private CBSE students",
        "physical": null
      },
      "examPattern": {
        "subjects": "All Theory and Language papers evaluated in 2026 Board Exams",
        "marking": "Marks may INCREASE or DECREASE. Decreased marks are final and old marksheet must be surrendered",
        "duration": "3-Step Hierarchy: Step 1 (Verification) -> Step 2 (Photocopy) -> Step 3 (Challenge Re-evaluation)",
        "cardTitle": "3-Tier Verification & Challenge Procedure"
      },
      "pitfalls": [
        "Strict Step Hierarchy: You CANNOT apply directly for Question Re-evaluation without ordering the evaluated answer photocopy first.",
        "Risk of Mark Reduction: If an answer was over-marked previously, your marks WILL BE REDUCED. You cannot request to retain older higher marks.",
        "Online Fee Only: Offline DD, Cheques, or school-level cash submissions are rejected; apply strictly via cbse.gov.in."
      ]
    },
    "hi": {
      "title": "केन्द्रीय माध्यमिक शिक्षा बोर्ड (CBSE) - 10वीं/12वीं अंक सत्यापन, उत्तरपुस्तिका फोटोकॉपी एवं पुनर्मूल्यांकन नियम 2026",
      "dates": {
        "startDate": "बोर्ड परीक्षा परिणाम जारी होने के 3 से 4 दिन बाद ऑनलाइन लिंक सक्रिय",
        "lastDate": "अंक सत्यापन के लिए केवल 5 दिनों की सख्त समय सीमा; अंतिम तिथि के बाद लिंक बंद",
        "examDate": "कोई परीक्षा नहीं — स्क्रूटिनी एवं पुनर्मूल्यांकन का परिणाम 15-20 दिनों में वेबसाइट पर"
      },
      "vacancies": {
        "total": "₹500 / ₹700 / ₹100 प्रति विषय / प्रति प्रश्न",
        "breakdown": "चरण-1 (अंक सत्यापन): ₹500 प्रति विषय | चरण-2 (उत्तरपुस्तिका की फोटोकॉपी): 12वीं हेतु ₹700, 10वीं हेतु ₹500 | चरण-3 (पुनर्मूल्यांकन): ₹100 प्रति प्रश्न",
        "cardTitle": "आधिकारिक शुल्क दरें (प्रति विषय/प्रश्न)"
      },
      "eligibility": {
        "education": "CBSE बोर्ड परीक्षा 2026 में 10वीं या 12वीं में उपस्थित सभी नियमित एवं प्राइवेट छात्र",
        "ageLimit": "कोई आयु सीमा नहीं (No Age Restriction) — सभी पंजीकृत छात्र पात्र हैं",
        "physical": null
      },
      "examPattern": {
        "subjects": "2026 बोर्ड परीक्षा के सभी सैद्धांतिक एवं भाषाई विषय",
        "marking": "पुनर्मूल्यांकन में अंक बढ़ भी सकते हैं और घट भी सकते हैं। घटे हुए अंक ही अंतिम मान्य होंगे और पुरानी अंकतालिका लौटानी होगी",
        "duration": "3-स्तरीय प्रक्रिया: चरण 1 (सत्यापन) -> चरण 2 (कॉपी की फोटोकॉपी) -> चरण 3 (प्रश्नों को चुनौती)",
        "cardTitle": "3-चरणीय स्क्रूटिनी एवं जांच प्रक्रिया"
      },
      "pitfalls": [
        "चरणबद्ध नियम अनिवार्य: सीधे पुनर्मूल्यांकन (Step 3) के लिए आवेदन नहीं कर सकते; पहले उत्तरपुस्तिका की फोटोकॉपी लेना अनिवार्य है।",
        "अंक घटने का जोखिम: यदि किसी प्रश्न में पहले अधिक अंक मिल गए थे, तो अंक कटेंगे भी। कम अंक होने पर पुरानी मार्कशीट वापस नहीं मिल सकती।",
        "केवल ऑनलाइन शुल्क: स्कूल या बैंक के माध्यम से ऑफलाइन फीस स्वीकार नहीं होती; cbse.gov.in पर ही पेमेंट करें।"
      ]
    }
  },
  "bsebBihar": {
    "type": "BOARD_SCRUTINY",
    "en": {
      "title": "Bihar School Examination Board (BSEB Patna) - 10th & 12th Scrutiny & Compartmental Rules 2026",
      "dates": {
        "startDate": "Online application opens within 2 to 3 days after Matric/Inter results",
        "lastDate": "Online submission on bsebinter.org / biharboardonline.bihar.gov.in within announced window",
        "examDate": "Compartmental-cum-Special Exam: May-June 2026"
      },
      "vacancies": {
        "total": "₹120 per Subject (Scrutiny Fee)",
        "breakdown": "Scrutiny: Students can apply for any number of theoretical subjects @ ₹120/subject | Compartmental: Permitted for students failing in max 2 subjects",
        "cardTitle": "Scrutiny Fees & Compartment Limits"
      },
      "eligibility": {
        "education": "Students who appeared in BSEB Matric (10th) or Intermediate (12th) Board Examinations 2026",
        "ageLimit": "No Age Limit — Open to all registered regular and independent students",
        "physical": null
      },
      "examPattern": {
        "subjects": "All Theory papers (50% Objective MCQs on OMR sheet + 50% Subjective descriptive questions)",
        "marking": "In Scrutiny: Total re-counting and checking for un-evaluated answers. Marks may increase, stay unchanged, or decrease",
        "duration": "Compartment Exam: 3 Hours 15 Minutes (15 mins extra cool-off time to read question paper)",
        "cardTitle": "OMR Scrutiny & Evaluation Rules"
      },
      "pitfalls": [
        "Online Application Only: Scrutiny forms submitted through schools or offline post are NOT accepted.",
        "Max 2 Subjects Limit for Compartment: If a student failed in 3 or more subjects, they CANNOT appear in Compartmental exam; they must re-appear next year.",
        "Roll Code & Roll Number Mismatch: Ensure Roll Code and Roll Number match your 2026 Admit Card; incorrect entry invalidates the application."
      ]
    },
    "hi": {
      "title": "बिहार विद्यालय परीक्षा समिति (BSEB पटना) - मैट्रिक (10वीं) एवं इंटर (12वीं) स्क्रूटिनी व कंपार्टमेंटल नियम 2026",
      "dates": {
        "startDate": "मैट्रिक/इंटर का रिजल्ट आने के 2 से 3 दिन बाद ऑनलाइन आवेदन शुरू",
        "lastDate": "bsebinter.org या biharboardonline.bihar.gov.in पर निर्धारित अंतिम तिथि तक",
        "examDate": "कंपार्टमेंटल सह-विशेष परीक्षा: मई - जून 2026 में आयोजित होगी"
      },
      "vacancies": {
        "total": "₹120 प्रति विषय (स्क्रूटिनी शुल्क)",
        "breakdown": "स्क्रूटिनी: छात्र जितने चाहें उतने विषयों में ₹120/विषय देकर आवेदन कर सकते हैं | कंपार्टमेंटल: अधिकतम 2 विषयों में फेल छात्र ही पात्र",
        "cardTitle": "स्क्रूटिनी शुल्क एवं कंपार्टमेंटल सीमा"
      },
      "eligibility": {
        "education": "BSEB 10वीं (मैट्रिक) अथवा 12वीं (इंटर) परीक्षा 2026 में सम्मिलित छात्र",
        "ageLimit": "कोई उम्र सीमा नहीं (No Age Restriction) — सभी नियमित व स्वतंत्र छात्र पात्र",
        "physical": null
      },
      "examPattern": {
        "subjects": "सभी सैद्धांतिक विषय (50% OMR वस्तुनिष्ठ प्रश्न + 50% विषयनिष्ठ लघु व दीर्घ प्रश्न)",
        "marking": "स्क्रूटिनी में अंकों का योग (Re-totalling) और बिना जांचे प्रश्नों की जांच होती है; अंक बढ़, घट या समान रह सकते हैं",
        "duration": "कंपार्टमेंटल परीक्षा: 3 घंटे 15 मिनट (15 मिनट प्रश्न पत्र पढ़ने के लिए कूल-ऑफ समय)",
        "cardTitle": "OMR व स्क्रूटिनी जांच प्रक्रिया"
      },
      "pitfalls": [
        "केवल ऑनलाइन आवेदन: स्कूल के माध्यम से या डाक द्वारा ऑफलाइन आवेदन किसी भी स्थिति में स्वीकार नहीं होगा।",
        "कंपार्टमेंटल में अधिकतम 2 विषय: यदि छात्र 2 से अधिक विषयों में फेल है तो वह कंपार्टमेंटल नहीं दे सकता, उसे अगले साल पूर्ण परीक्षा देनी होगी।",
        "रोल कोड और रोल नंबर: एडमिट कार्ड से मिलान करके ही रोल कोड और रोल नंबर भरें; गलत विवरण पर आवेदन निरस्त हो जाता है।"
      ]
    }
  },
  "ntaNeet": {
    "type": "ENTRANCE_EXAM",
    "en": {
      "title": "National Testing Agency (NTA) - NEET (UG) 2026 MBBS/BDS/AYUSH Entrance Bulletin",
      "dates": {
        "startDate": "09 February 2026",
        "lastDate": "16 March 2026 (up to 21:00 hrs)",
        "examDate": "First Sunday of May 2026 (02:00 PM to 05:20 PM - 200 Minutes)"
      },
      "vacancies": {
        "total": "1,08,000+ MBBS & 28,000+ BDS Medical Seats",
        "breakdown": "15% All India Quota (AIQ) via MCC Counseling + 85% State Quota via State Counseling + AIIMS, JIPMER & AFMC",
        "cardTitle": "Total Medical Seats (MBBS, BDS, AYUSH, BVSc)"
      },
      "eligibility": {
        "education": "Passed/Appearing 12th with Physics, Chemistry, Biology/Biotech & English with Min 50% marks (40% for SC/ST/OBC)",
        "ageLimit": "Minimum 17 Years completed on or before 31st December 2026. NO UPPER AGE LIMIT as per Supreme Court/NMC",
        "physical": null
      },
      "examPattern": {
        "subjects": "Physics (45 Qs), Chemistry (45 Qs), Botany (45 Qs), Zoology (45 Qs) = Total 180 Questions to attempt out of 200",
        "marking": "+4 Marks for correct answer, -1 Negative Mark for incorrect answer. Total Marks: 720",
        "duration": "200 Minutes (3 Hours 20 Minutes) Pen & Paper (OMR) Mode",
        "cardTitle": "720 Marks NTA OMR Exam Pattern & Marking"
      },
      "pitfalls": [
        "Photo Specs with DOOP: Recent passport photo & 4\"x6\" Postcard photo with white background, showing 80% face & ears, with Candidate's Name and Date of Photo (DOOP) printed at bottom.",
        "Finger & Thumb Impressions: Scanned impressions of all 10 fingers & thumbs (left and right hands) must be uploaded clearly.",
        "Central OBC-NCL / EWS Format: Reservation certificate must be in Central Government format issued in the current financial year."
      ]
    },
    "hi": {
      "title": "राष्ट्रीय परीक्षा एजेंसी (NTA) - राष्ट्रीय पात्रता सह प्रवेश परीक्षा NEET (UG) 2026",
      "dates": {
        "startDate": "09 फरवरी 2026",
        "lastDate": "16 मार्च 2026 (रात 09:00 बजे तक)",
        "examDate": "मई 2026 का पहला रविवार (दोपहर 02:00 से शाम 05:20 बजे - 200 मिनट)"
      },
      "vacancies": {
        "total": "1,08,000+ MBBS एवं 28,000+ BDS मेडिकल सीटें",
        "breakdown": "15% ऑल इंडिया कोटा (AIQ - MCC) + 85% राज्य कोटा (स्टेट काउंसलिंग) + AIIMS एवं JIPMER",
        "cardTitle": "कुल उपलब्ध मेडिकल सीटें (MBBS/BDS/AYUSH)"
      },
      "eligibility": {
        "education": "12वीं में भौतिक विज्ञान, रसायन विज्ञान, जीव विज्ञान (PCB) एवं अंग्रेजी में न्यूनतम 50% अंक (SC/ST/OBC हेतु 40%)",
        "ageLimit": "31 दिसंबर 2026 तक न्यूनतम 17 वर्ष की आयु पूरी हो। कोई अधिकतम आयु सीमा नहीं (No Upper Age Limit)",
        "physical": null
      },
      "examPattern": {
        "subjects": "भौतिक विज्ञान (45), रसायन विज्ञान (45), वनस्पति विज्ञान (45), जन्तु विज्ञान (45) = कुल 180 प्रश्न हल करने हैं (200 में से)",
        "marking": "प्रत्येक सही उत्तर पर +4 अंक, प्रत्येक गलत उत्तर पर -1 अंक (नेगेटिव मार्किंग)। कुल अंक: 720",
        "duration": "200 मिनट (3 घंटे 20 मिनट) पेन-पेपर (OMR) मोड",
        "cardTitle": "720 अंक NTA OMR परीक्षा पैटर्न व मार्किंग"
      },
      "pitfalls": [
        "फोटो पर नाम व तारीख अनिवार्य: पासपोर्ट व 4\"x6\" पोस्टकार्ड फोटो में सफेद बैकग्राउंड, 80% चेहरा व कान साफ दिखने चाहिए और नीचे नाम व फोटो खिंचवाने की तारीख (DOOP) अनिवार्य है।",
        "सभी 10 अंगुलियों के निशान: दोनों हाथों की सभी अंगुलियों और अंगूठों के साफ निशान स्कैन करके अपलोड करने होंगे।",
        "केंद्रीय OBC/EWS प्रमाण पत्र: प्रमाण पत्र केंद्र सरकार के फॉर्मेट पर चालू वित्तीय वर्ष का बना होना आवश्यक है।"
      ]
    }
  },
  "ctetExam": {
    "type": "TEACHER_ELIGIBILITY",
    "en": {
      "title": "CBSE Central Teacher Eligibility Test (CTET) 2026 Information Bulletin",
      "dates": {
        "startDate": "07 March 2026",
        "lastDate": "05 April 2026 (23:59 hrs)",
        "examDate": "July 2026 (Paper-II: 09:30 AM to 12:00 PM | Paper-I: 02:30 PM to 05:00 PM)"
      },
      "vacancies": {
        "total": "Lifetime Validity Eligibility Certificate (जीवनभर मान्य)",
        "breakdown": "Qualifying credential for teaching recruitments in KVS, NVS, Central Tibetan Schools, DSSSB & State Govts",
        "cardTitle": "CTET Eligibility Scope & Lifetime Validity"
      },
      "eligibility": {
        "education": "Paper-I (Class 1-5): Senior Secondary + 2-Yr D.El.Ed / B.El.Ed | Paper-II (Class 6-8): Graduation + B.Ed / 2-Yr D.El.Ed",
        "ageLimit": "No Upper Age Limit (कोई अधिकतम उम्र सीमा नहीं) — Minimum age 18 years",
        "physical": null
      },
      "examPattern": {
        "subjects": "Paper-I: CDP (30), Maths (30), EVS (30), Lang-1 (30), Lang-2 (30) = 150 Qs | Paper-II: CDP (30), Math/Science or SST (60), Langs (60)",
        "marking": "ZERO Negative Marking (No deduction for incorrect answers). Qualifying Cutoff: General 60% (90/150), Reserved 55% (82/150)",
        "duration": "150 Minutes (2.5 Hours) per paper",
        "cardTitle": "150 Marks Objective Exam Scheme (No Negative Marking)"
      },
      "pitfalls": [
        "Signature in Capital Letters Prohibited: Signing in ALL CAPS will lead to summary cancellation of application.",
        "Language Selection Rule: Language-1 and Language-2 MUST be two distinct languages; selecting the same language for both leads to rejection.",
        "Teacher Training College Recognition: Ensure your B.Ed/D.El.Ed institute is recognized by NCTE; invalid college degrees are flagged during document verification."
      ]
    },
    "hi": {
      "title": "केन्द्रीय माध्यमिक शिक्षा बोर्ड (CBSE) - केंद्रीय शिक्षक पात्रता परीक्षा (CTET) 2026",
      "dates": {
        "startDate": "07 मार्च 2026",
        "lastDate": "05 अप्रैल 2026 (रात 11:59 बजे तक)",
        "examDate": "जुलाई 2026 (पेपर-II: सुबह 09:30 से 12:00 | पेपर-I: दोपहर 02:30 से 05:00)"
      },
      "vacancies": {
        "total": "आजीवन वैधता पात्रता प्रमाण पत्र (Lifetime Validity)",
        "breakdown": "केन्द्रीय विद्यालय (KVS), नवोदय (NVS), DSSSB एवं केंद्र/राज्य सरकार के विद्यालयों में शिक्षक भर्ती हेतु अनिवार्य पात्रता",
        "cardTitle": "CTET प्रमाण पत्र मान्यता एवं दायरा"
      },
      "eligibility": {
        "education": "पेपर-1 (कक्षा 1-5): 12वीं + 2-वर्षीय D.El.Ed / B.El.Ed | पेपर-2 (कक्षा 6-8): स्नातक + B.Ed / 2-वर्षीय D.El.Ed",
        "ageLimit": "कोई अधिकतम आयु सीमा नहीं (No Upper Age Limit) — न्यूनतम आयु 18 वर्ष",
        "physical": null
      },
      "examPattern": {
        "subjects": "पेपर-1: बाल विकास (30), गणित (30), पर्यावरण (30), भाषा-1 (30), भाषा-2 (30) = 150 प्रश्न | पेपर-2: बाल विकास (30), गणित/विज्ञान या सामाजिक अध्ययन (60), भाषा (60)",
        "marking": "शून्य नेगेटिव मार्किंग (कोई माइनस मार्किंग नहीं)। क्वालिफाइंग अंक: सामान्य 60% (90 अंक), आरक्षित 55% (82 अंक)",
        "duration": "150 मिनट (2.5 घंटे) प्रति पेपर",
        "cardTitle": "150 प्रश्न / 150 अंक परीक्षा योजना (कोई नेगेटिव मार्किंग नहीं)"
      },
      "pitfalls": [
        "कैपिटल लेटर्स में हस्ताक्षर वर्जित: अंग्रेजी के बड़े अक्षरों (CAPITAL LETTERS) में सिग्नेचर करने पर आवेदन तुरंत रिजेक्ट हो जाता है।",
        "दो अलग-अलग भाषाओं का चयन: भाषा-1 और भाषा-2 दोनों समान नहीं हो सकतीं; दो भिन्न भाषाएं (जैसे हिन्दी और अंग्रेजी) चुनना अनिवार्य है।",
        "NCTE मान्यता प्राप्त संस्थान: सुनिश्चित करें कि आपका B.Ed या D.El.Ed कॉलेज NCTE से मान्यता प्राप्त हो, फर्जी संस्थानों की डिग्री मान्य नहीं होगी।"
      ]
    }
  }
};

function analyzeNotificationText(text, lang = 'hi') {
  if (!text || text.trim().length < 10) {
    return parseCustomNotification('Official Circular', lang);
  }

  const langKey = (lang || 'hi').toLowerCase();
  const presetKey = identifyNotificationPreset(text);

  if (presetKey && PRESET_MAP[presetKey]) {
    const preset = PRESET_MAP[presetKey];
    
    if (langKey === 'en' || langKey === 'hi-latn') {
      return { ...preset.en, aiPowered: false };
    }

    if (langKey === 'hi') {
      return { ...preset.hi, aiPowered: false };
    }

    const base = preset.hi || preset.en;
    return { ...base, aiPowered: false };
  }

  return parseCustomNotification(text, lang);
}

module.exports = {
  analyzeNotificationText,
  identifyNotificationPreset,
  PRESET_MAP
};

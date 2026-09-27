// Comprehensive Exam-Analyzed Multi-Exam Question Bank & Dynamic Mapping
// Powered by TCS, NTA & State Examination Board 2020-2025 Analysis

const EXAMS_CONFIG = [
  // 1. CENTRAL & DEFENCE EXAMS
  {
    id: "ssc-gd",
    name: "SSC GD Constable 2026",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Mixed Simulation (सभी विषय एक साथ - 80 Qs)" },
      { id: "gk", name: "🏛️ General Knowledge & General Awareness (TCS PYQs)" },
      { id: "math", name: "📐 Elementary Mathematics & Speed Calculation" },
      { id: "reasoning", name: "🧠 General Intelligence & Reasoning Ability" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (मुहावरे, विलोम, पर्यायवाची, वर्तनी)" },
      { id: "english", name: "📖 General English (Grammar & Comprehension)" }
    ]
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL / CHSL 2026 (Tier-1)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Tier-1 Simulation (100 Qs Standard)" },
      { id: "math", name: "📐 Quantitative Aptitude & Advanced Math" },
      { id: "reasoning", name: "🧠 General Intelligence & Logical Reasoning" },
      { id: "english", name: "📖 English Comprehension, Spotting Errors & Vocab" },
      { id: "gk", name: "🏛️ General Awareness, Science & Current Affairs" }
    ]
  },
  {
    id: "ssc-mts",
    name: "SSC MTS & Havaldar 2026",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Mock (Session 1 & Session 2)" },
      { id: "gk", name: "🏛️ General Awareness (High-Scoring Session-2)" },
      { id: "english", name: "📖 General English (Session-2 Target)" },
      { id: "math", name: "📐 Numerical & Mathematical Ability (Session-1)" },
      { id: "reasoning", name: "🧠 Reasoning Ability & Problem Solving (Session-1)" }
    ]
  },
  {
    id: "railway-alp",
    name: "Railway ALP & Technician (Grade I & III) 2026",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full CBT-1 Simulation (75 Qs Pattern)" },
      { id: "science", name: "⚡ General Science (Physics & Chemistry Numericals)" },
      { id: "tech", name: "🛠️ Basic Science & Engineering (Drawing, Units, Work/Power)" },
      { id: "math", name: "📐 Mathematics (Speed Arithmetic & Geometry)" },
      { id: "reasoning", name: "🧠 General Intelligence & Reasoning" }
    ]
  },
  {
    id: "railway-group-d",
    name: "Railway Group D & NTPC 2026",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full CBT Paper Mock (100 Qs Standard)" },
      { id: "science", name: "⚡ General Science (Physics, Chemistry, Life Science)" },
      { id: "math", name: "📐 Mathematics (Speed Shortcuts & DI)" },
      { id: "reasoning", name: "🧠 General Intelligence & Logical Reasoning" },
      { id: "gk", name: "🏛️ General Awareness & 10-Year Railway PYQs" }
    ]
  },
  {
    id: "upsc-cse",
    name: "UPSC Civil Services (IAS / IPS / IFS) 2026",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Prelims GS-1 Full Simulation Mock" },
      { id: "polity", name: "⚖️ Indian Polity & Constitution (Articles, Supreme Court)" },
      { id: "history", name: "🏛️ Modern History & National Movement" },
      { id: "geography", name: "🗺️ Physical & Indian Geography (Climatology, Resources)" },
      { id: "economy", name: "📈 Indian Economy (Banking, Fiscal Policy, Inflation)" },
      { id: "environment", name: "🌿 Environment, Ecology & Biodiversity" },
      { id: "csat", name: "🧠 CSAT Paper-2 (Comprehension & Logical Reasoning)" }
    ]
  },
  {
    id: "upsc-nda",
    name: "UPSC NDA & NA (National Defence Academy)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full NDA Mock (Maths + GAT)" },
      { id: "math", name: "📐 Mathematics (Calculus, Trigonometry, Vectors - 120 Qs)" },
      { id: "english", name: "📖 English (Grammar, Vocabulary & Comprehension - 50 Qs)" },
      { id: "science", name: "⚡ Physics, Chemistry & Biology (GAT Section)" },
      { id: "gk", name: "🏛️ History, Geography & Current Affairs" }
    ]
  },
  {
    id: "army-agniveer",
    name: "Indian Army Agniveer Rally (GD, Tech, Clerk, Tradesman)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Common Entrance Exam (CEE) 50 Qs Simulation" },
      { id: "gk", name: "🏛️ General Knowledge (15 Qs High-Yield)" },
      { id: "science", name: "⚡ General Science (15 Qs Core Physics, Chem, Bio)" },
      { id: "math", name: "📐 Elementary Mathematics (15 Qs Speed Arithmetic)" },
      { id: "reasoning", name: "🧠 Logical Reasoning (5 Qs)" }
    ]
  },
  {
    id: "iaf-agniveer",
    name: "Indian Air Force Agniveer Vayu (Science & Other than Science)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Phase-1 Online Test Full Mock" },
      { id: "physics", name: "⚡ Physics (10+2 Level Formulas & Numericals)" },
      { id: "math", name: "📐 Mathematics (Calculus, Trigonometry, Matrices)" },
      { id: "english", name: "📖 English (Comprehension & Grammar)" },
      { id: "raga", name: "🧠 RAGA (Reasoning & General Awareness)" }
    ]
  },
  {
    id: "navy-agniveer",
    name: "Indian Navy Agniveer (SSR & MR)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Computer-Based Examination (CBT) Full Mock" },
      { id: "science", name: "⚡ Science & Physics Fundamentals" },
      { id: "math", name: "📐 Mathematics (10th/12th Level Numerical Ability)" },
      { id: "english", name: "📖 English (Vocabulary, Prepositions, Voice)" },
      { id: "gk", name: "🏛️ General Awareness (Defence, History, Geography)" }
    ]
  },
  {
    id: "banking",
    name: "Banking (IBPS Clerk / PO & SBI Clerk / PO)",
    category: "central",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Prelims Speed Test (100 Qs Standard)" },
      { id: "quant", name: "📐 Quantitative Aptitude & Speed Math (DI, Simplification)" },
      { id: "reasoning", name: "🧠 Reasoning Ability & High-Level Puzzles" },
      { id: "english", name: "📖 English Language (Reading Comprehension & Cloze Test)" },
      { id: "banking-gk", name: "🏦 Banking Awareness, Monetary Policy & Financial GK" }
    ]
  },

  // 2. STATE POLICE BHARTI EXAMS
  {
    id: "up-police",
    name: "UP Police Constable & Sub-Inspector (SI)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Paper (150 Qs Standard - 300 Marks)" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (37 Questions Target - व्याकरण, गद्यांश)" },
      { id: "up-gk", name: "🏛️ सामान्य ज्ञान एवं उत्तर प्रदेश विशेष (UP GK)" },
      { id: "law", name: "⚖️ मूल विधि एवं संविधान (Mool Vidhi, IPC/BNS, Polity)" },
      { id: "math", name: "📐 संख्यात्मक एवं मानसिक योग्यता (Maths)" },
      { id: "reasoning", name: "🧠 मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता" }
    ]
  },
  {
    id: "bihar-police",
    name: "Bihar Police Constable (CSBC) & Daroga (SI)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Paper Mock (100 Qs OMR Pattern)" },
      { id: "gk", name: "🏛️ सामान्य अध्ययन एवं बिहार स्पेशल GK" },
      { id: "science", name: "⚡ सामान्य विज्ञान (भौतिकी, रसायन, जीव विज्ञान)" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (व्याकरण एवं रचना)" },
      { id: "math", name: "📐 गणित (संख्या पद्धति, प्रतिशत, लाभ-हानि)" }
    ]
  },
  {
    id: "delhi-police",
    name: "Delhi Police Constable & Head Constable (Executive)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Paper Simulation (100 Qs CBT)" },
      { id: "gk", name: "🏛️ General Knowledge & Current Affairs (50 Qs Target)" },
      { id: "reasoning", name: "🧠 Reasoning Ability (25 Qs)" },
      { id: "math", name: "📐 Numerical Ability (15 Qs)" },
      { id: "computer", name: "💻 कम्प्यूटर ज्ञान (MS Excel, Word, Internet - 10 Qs)" }
    ]
  },
  {
    id: "rajasthan-police",
    name: "Rajasthan Police Constable Bharti",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Written Exam Mock (150 Qs Level)" },
      { id: "reasoning", name: "🧠 तार्किक योग्यता एवं कम्प्यूटर सामान्य ज्ञान" },
      { id: "raj-gk", name: "🏛️ राजस्थान सामान्य ज्ञान (इतिहास, कला-संस्कृति, भूगोल)" },
      { id: "women-child", name: "⚖️ महिला एवं बाल अपराध सुरक्षा कानून नियम" },
      { id: "gs", name: "⚡ सामान्य विज्ञान एवं समसामयिकी (GS & Current Affairs)" }
    ]
  },
  {
    id: "mp-police",
    name: "MP Police Constable & Sub Inspector",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Exam Paper Mock (100 Qs Standard)" },
      { id: "mp-gk", name: "🏛️ सामान्य ज्ञान एवं मध्य प्रदेश स्पेशल GK" },
      { id: "reasoning", name: "🧠 बौद्धिक क्षमता एवं मानसिक अभिरुचि" },
      { id: "science", name: "⚡ विज्ञान एवं सरल अंकगणित (Science & Math)" }
    ]
  },
  {
    id: "haryana-police",
    name: "Haryana Police Constable (HSSC)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 HSSC CET Police Exam Mock" },
      { id: "har-gk", name: "🏛️ हरियाणा सामान्य ज्ञान एवं करंट अफेयर्स" },
      { id: "agri-animal", name: "🌾 कृषि एवं पशुपालन (Agriculture & Animal Husbandry)" },
      { id: "reasoning", name: "🧠 मानसिक क्षमता एवं तर्कशक्ति" },
      { id: "math", name: "📐 संख्यात्मक योग्यता (Maths)" },
      { id: "computer", name: "💻 बुनियादी कम्प्यूटर ज्ञान" }
    ]
  },
  {
    id: "wb-police",
    name: "West Bengal Police (WBP Constable & Kolkata Police)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-bengali",
    subjects: [
      { id: "all", name: "🎯 Preliminary Written Test Full Mock (বাংলা & English)" },
      { id: "gk", name: "🏛️ General Awareness & West Bengal GK (সাধারণ জ্ঞান)" },
      { id: "math", name: "📐 Elementary Mathematics (পাটিগণিত ও পরিমিতি)" },
      { id: "reasoning", name: "🧠 Reasoning & Logical Analysis (যুক্তিবিচার)" },
      { id: "english", name: "📖 English Language Proficiency (ইংরেজী জ্ঞান)" }
    ]
  },
  {
    id: "maharashtra-police",
    name: "Maharashtra Police Constable Bharti (पोलीस शिपाई)",
    category: "police",
    isBoard: false,
    langMode: "bilingual-marathi",
    subjects: [
      { id: "all", name: "🎯 लेखी परीक्षा संपूर्ण सराव पेपर (100 गुण - मराठी)" },
      { id: "marathi", name: "📖 मराठी व्याकरण (मराठी भाषा, शब्दसंग्रह व व्याकरण)" },
      { id: "math", name: "📐 अंकगणित (अंकगणित व क्लृप्त्या - Mathematics)" },
      { id: "reasoning", name: "🧠 बुद्धिमत्ता चाचणी (तर्कक्षमता व आकलन)" },
      { id: "mah-gk", name: "🏛️ सामान्य ज्ञान व महाराष्ट्र चालू घडामोडी" }
    ]
  },

  // 3. NATIONAL ENTRANCE & HIGHER EDUCATION TESTS
  {
    id: "nta-neet",
    name: "NEET UG 2026 (Medical Entrance)",
    category: "entrance",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full Mock Test Simulation (720 Marks Standard)" },
      { id: "biology", name: "🩺 Biology (Botany & Zoology - NCERT Line-by-Line 360 Marks)" },
      { id: "chemistry", name: "🧪 Chemistry (Organic, Inorganic & Physical 180 Marks)" },
      { id: "physics", name: "⚡ Physics (Mechanics, Optics, Modern Physics 180 Marks)" }
    ]
  },
  {
    id: "nta-jee",
    name: "JEE Main & JEE Advanced 2026 (Engineering)",
    category: "entrance",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Full 300 Marks Simulation (NTA Level)" },
      { id: "physics", name: "⚡ Physics (Kinematics, Electrodynamics, Modern Physics)" },
      { id: "chemistry", name: "🧪 Chemistry (Chemical Bonding, Coordination, Thermodynamics)" },
      { id: "math", name: "📐 Mathematics (Calculus, Coordinate Geometry, Vectors, Algebra)" }
    ]
  },
  {
    id: "nta-cuet",
    name: "NTA CUET UG 2026 (Central Universities)",
    category: "entrance",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Section III: General Test Full Simulation" },
      { id: "gk", name: "🏛️ General Knowledge, Current Affairs & Static GK" },
      { id: "reasoning", name: "🧠 General Mental Ability & Numerical Reasoning" },
      { id: "math", name: "📐 Quantitative Reasoning (Grade 8 Math)" },
      { id: "language", name: "📖 Section IA: English / Hindi Language Comprehension" }
    ]
  },
  {
    id: "clat-law",
    name: "CLAT (Common Law Admission Test)",
    category: "entrance",
    isBoard: false,
    langMode: "english",
    subjects: [
      { id: "all", name: "🎯 Full 120 Questions CLAT Simulation Mock" },
      { id: "legal", name: "⚖️ Legal Reasoning & Constitutional Principles" },
      { id: "logical", name: "🧠 Logical Reasoning & Critical Thinking" },
      { id: "english", name: "📖 English Language & Reading Passages" },
      { id: "gk", name: "🏛️ Current Affairs including General Knowledge" },
      { id: "quant", name: "📐 Quantitative Techniques & Data Interpretation" }
    ]
  },

  // 4. TEACHING & TET EXAMS / STATE PSCs
  {
    id: "ctet",
    name: "CTET (Central Teacher Eligibility Test - Paper 1 & 2)",
    category: "teaching",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 CTET 150 Questions Master Simulation Mock" },
      { id: "cdp", name: "👶 Child Development & Pedagogy (बाल विकास एवं शिक्षाशास्त्र - 30 Qs)" },
      { id: "evs", name: "🌿 Environmental Studies (पर्यावरण अध्ययन - 30 Qs)" },
      { id: "math", name: "📐 Mathematics & Pedagogy (गणित एवं शिक्षणशास्त्र - 30 Qs)" },
      { id: "hindi", name: "📖 Language I: हिन्दी व्याकरण एवं भाषा शिक्षण" },
      { id: "english", name: "📖 Language II: English Comprehension & Pedagogy" },
      { id: "social", name: "🌍 Social Studies / Science (Paper 2 Special)" }
    ]
  },
  {
    id: "up-tet",
    name: "UP TET & Super TET 2026",
    category: "teaching",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Primary & Upper Primary Master Mock (150 Qs)" },
      { id: "cdp", name: "👶 बाल मनोविज्ञान एवं शिक्षण कौशल (Child Psychology & Pedagogy)" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (गद्यांश, पद्यांश, व्याकरण)" },
      { id: "math", name: "📐 गणित एवं शिक्षण विधियाँ" },
      { id: "evs", name: "🌿 पर्यावरण एवं सामाजिक अध्ययन (EVS)" },
      { id: "sanskrit", name: "🕉️ संस्कृत भाषा एवं व्याकरण" }
    ]
  },
  {
    id: "bpsc-tre",
    name: "Bihar BPSC TRE (Teacher Recruitment) & BPSC Prelims",
    category: "teaching",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 BPSC 150 Qs General Studies Master Mock" },
      { id: "bihar-special", name: "🌾 बिहार विशेष (इतिहास, भूगोल, अर्थव्यवस्था एवं कला)" },
      { id: "modern-history", name: "🏛️ भारतीय राष्ट्रीय आंदोलन एवं आधुनिक भारत का इतिहास" },
      { id: "science", name: "⚡ सामान्य विज्ञान (भौतिक, रसायन, जीव विज्ञान)" },
      { id: "polity", name: "⚖️ भारतीय राजव्यवस्था एवं संविधान" },
      { id: "math-reasoning", name: "📐 प्राथमिक गणित एवं मानसिक क्षमता परीक्षण" }
    ]
  },
  {
    id: "reet",
    name: "REET (Rajasthan Eligibility Examination for Teachers)",
    category: "teaching",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Level 1 & Level 2 Full Test (150 Qs Standard)" },
      { id: "cdp", name: "👶 बाल विकास एवं शिक्षण विधियाँ (CDP)" },
      { id: "raj-gk", name: "🏛️ राजस्थान का भूगोल, इतिहास एवं कला संस्कृति" },
      { id: "hindi", name: "📖 भाषा I: हिन्दी" },
      { id: "math", name: "📐 गणित एवं शिक्षण विधियाँ" },
      { id: "evs", name: "🌿 पर्यावरण अध्ययन (Level 1)" }
    ]
  },
  {
    id: "ugc-net",
    name: "UGC NET / CSIR NET 2026",
    category: "teaching",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 Paper-1 General Teaching & Research Aptitude (50 Qs)" },
      { id: "teaching-apt", name: "🎓 Teaching Aptitude & Learner Characteristics" },
      { id: "research-apt", name: "🔬 Research Aptitude (Types, Methods & Ethics)" },
      { id: "higher-edu", name: "🏛️ Higher Education System (Policies, Governance)" },
      { id: "ict", name: "💻 Information & Communication Technology (ICT)" },
      { id: "data-interp", name: "📊 Data Interpretation & Mathematical Reasoning" }
    ]
  },

  // 5. BOARD EXAMS (CLASS 10TH & 12TH) - 20 BOARDS
  {
    id: "board-10th",
    name: "Class 10th Board (मैट्रिक बोर्ड परीक्षा 2026)",
    isBoard: true,
    boards: [
      { id: "cbse", name: "CBSE Board (Central Board of Secondary Education)" },
      { id: "icse", name: "CISCE Board (ICSE / ISC नई दिल्ली)" },
      { id: "upmsp", name: "उत्तर प्रदेश बोर्ड (UPMSP प्रयागराज)" },
      { id: "bseb", name: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)" },
      { id: "maharashtra", name: "महाराष्ट्र राज्य माध्यमिक शिक्षण मंडळ (MSBSHSE पुणे)" },
      { id: "rbse", name: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)" },
      { id: "mpbse", name: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)" },
      { id: "wb", name: "पश्चिम बंगाल बोर्ड (WBBSE कोलकाता)" },
      { id: "tn", name: "तमिलनाडु स्टेट बोर्ड (TNDGE चेन्नई)" },
      { id: "karnataka", name: "कर्नाटक स्कूल परीक्षा बोर्ड (KSEAB बेंगलुरु)" },
      { id: "gujarat", name: "गुजरात माध्यमिक बोर्ड (GSEB गांधीनगर)" },
      { id: "haryana", name: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)" },
      { id: "jac", name: "झारखंड अधिविद्य परिषद् (JAC रांची)" },
      { id: "pseb", name: "पंजाब स्कूल शिक्षा बोर्ड (PSEB मोहाली)" },
      { id: "nios", name: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS)" },
      { id: "cgbse", name: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)" },
      { id: "bseodisha", name: "ओडिशा माध्यमिक शिक्षा बोर्ड (BSE Odisha कटक)" },
      { id: "ubse", name: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)" },
      { id: "seba", name: "असम माध्यमिक शिक्षा बोर्ड (SEBA गुवाहाटी)" },
      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }
    ],
    subjects: [
      { id: "all", name: "🎯 10th All-Subject 1-Night Passing Mock" },
      { id: "science", name: "⚡ विज्ञान (Science - Physics, Chem, Bio)" },
      { id: "math", name: "📐 गणित (Mathematics - Quadratic, Trig, Geometry)" },
      { id: "social", name: "🌍 सामाजिक विज्ञान (Social Science)" },
      { id: "hindi", name: "📖 हिन्दी (व्याकरण एवं गद्य-पद्य)" }
    ]
  },
  {
    id: "board-12th-science",
    name: "Class 12th Science Stream (12वीं विज्ञान संकाय)",
    isBoard: true,
    stream: "science",
    boards: [
      { id: "cbse", name: "CBSE Board (Central Board of Secondary Education)" },
      { id: "icse", name: "CISCE Board (ICSE / ISC नई दिल्ली)" },
      { id: "upmsp", name: "उत्तर प्रदेश बोर्ड (UPMSP प्रयागराज)" },
      { id: "bseb", name: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)" },
      { id: "maharashtra", name: "महाराष्ट्र राज्य उच्च माध्यमिक शिक्षण मंडळ (MSBSHSE पुणे)" },
      { id: "rbse", name: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)" },
      { id: "mpbse", name: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)" },
      { id: "wb", name: "पश्चिम बंगाल उच्च माध्यमिक बोर्ड (WBCHSE कोलकाता)" },
      { id: "tn", name: "तमिलनाडु स्टेट बोर्ड (TNDGE चेन्नई)" },
      { id: "karnataka", name: "कर्नाटक स्कूल परीक्षा बोर्ड (KSEAB बेंगलुरु)" },
      { id: "gujarat", name: "गुजरात उच्च माध्यमिक बोर्ड (GSEB गांधीनगर)" },
      { id: "haryana", name: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)" },
      { id: "jac", name: "झारखंड अधिविद्य परिषद् (JAC रांची)" },
      { id: "pseb", name: "पंजाब स्कूल शिक्षा बोर्ड (PSEB मोहाली)" },
      { id: "nios", name: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS)" },
      { id: "cgbse", name: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)" },
      { id: "bseodisha", name: "ओडिशा उच्च माध्यमिक शिक्षा परिषद (CHSE Odisha)" },
      { id: "ubse", name: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)" },
      { id: "seba", name: "असम उच्चतर माध्यमिक शिक्षा परिषद (AHSEC गुवाहाटी)" },
      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }
    ],
    subjects: [
      { id: "all", name: "🎯 12th Science Full Simulation Mock (सभी विज्ञान विषय)" },
      { id: "physics", name: "⚡ भौतिक विज्ञान (Physics - Optics, Electromagnetism, Modern Physics)" },
      { id: "chemistry", name: "🧪 रसायन विज्ञान (Chemistry - Organic, Inorganic, Solutions)" },
      { id: "math", name: "📐 गणित (Mathematics - Calculus, Vectors, 3D, Matrices)" },
      { id: "biology", name: "🧬 जीव विज्ञान (Biology - Genetics, Ecology, Biotech)" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (General Hindi)" },
      { id: "english", name: "📖 English Core (Literature & Grammar)" }
    ]
  },
  {
    id: "board-12th-commerce",
    name: "Class 12th Commerce Stream (12वीं वाणिज्य संकाय)",
    isBoard: true,
    stream: "commerce",
    boards: [
      { id: "cbse", name: "CBSE Board (Central Board of Secondary Education)" },
      { id: "icse", name: "CISCE Board (ICSE / ISC नई दिल्ली)" },
      { id: "upmsp", name: "उत्तर प्रदेश बोर्ड (UPMSP प्रयागराज)" },
      { id: "bseb", name: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)" },
      { id: "maharashtra", name: "महाराष्ट्र राज्य उच्च माध्यमिक शिक्षण मंडळ (MSBSHSE पुणे)" },
      { id: "rbse", name: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)" },
      { id: "mpbse", name: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)" },
      { id: "wb", name: "पश्चिम बंगाल उच्च माध्यमिक बोर्ड (WBCHSE कोलकाता)" },
      { id: "tn", name: "तमिलनाडु स्टेट बोर्ड (TNDGE चेन्नई)" },
      { id: "karnataka", name: "कर्नाटक स्कूल परीक्षा बोर्ड (KSEAB बेंगलुरु)" },
      { id: "gujarat", name: "गुजरात उच्च माध्यमिक बोर्ड (GSEB गांधीनगर)" },
      { id: "haryana", name: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)" },
      { id: "jac", name: "झारखंड अधिविद्य परिषद् (JAC रांची)" },
      { id: "pseb", name: "पंजाब स्कूल शिक्षा बोर्ड (PSEB मोहाली)" },
      { id: "nios", name: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS)" },
      { id: "cgbse", name: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)" },
      { id: "bseodisha", name: "ओडिशा उच्च माध्यमिक शिक्षा परिषद (CHSE Odisha)" },
      { id: "ubse", name: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)" },
      { id: "seba", name: "असम उच्चतर माध्यमिक शिक्षा परिषद (AHSEC गुवाहाटी)" },
      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }
    ],
    subjects: [
      { id: "all", name: "🎯 12th Commerce Full Simulation Mock (सभी वाणिज्य विषय)" },
      { id: "accountancy", name: "📊 लेखाशास्त्र (Accountancy - Partnership, Share Capital, Cash Flow)" },
      { id: "business", name: "🏢 व्यावसायिक अध्ययन (Business Studies - Management, Marketing, Finance)" },
      { id: "economics", name: "📈 अर्थशास्त्र (Economics - Macroeconomics & Indian Economy)" },
      { id: "entrepreneurship", name: "💡 उद्यमिता एवं व्यावसायिक गणित (Entrepreneurship)" },
      { id: "hindi", name: "📖 सामान्य हिन्दी (General Hindi)" },
      { id: "english", name: "📖 English Core (Literature & Grammar)" }
    ]
  },
  {
    id: "board-12th-arts",
    name: "Class 12th Arts Stream (12वीं कला संकाय)",
    isBoard: true,
    stream: "arts",
    boards: [
      { id: "cbse", name: "CBSE Board (Central Board of Secondary Education)" },
      { id: "icse", name: "CISCE Board (ICSE / ISC नई दिल्ली)" },
      { id: "upmsp", name: "उत्तर प्रदेश बोर्ड (UPMSP प्रयागराज)" },
      { id: "bseb", name: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)" },
      { id: "maharashtra", name: "महाराष्ट्र राज्य उच्च माध्यमिक शिक्षण मंडळ (MSBSHSE पुणे)" },
      { id: "rbse", name: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)" },
      { id: "mpbse", name: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)" },
      { id: "wb", name: "पश्चिम बंगाल उच्च माध्यमिक बोर्ड (WBCHSE कोलकाता)" },
      { id: "tn", name: "तमिलनाडु स्टेट बोर्ड (TNDGE चेन्नई)" },
      { id: "karnataka", name: "कर्नाटक स्कूल परीक्षा बोर्ड (KSEAB बेंगलुरु)" },
      { id: "gujarat", name: "गुजरात उच्च माध्यमिक बोर्ड (GSEB गांधीनगर)" },
      { id: "haryana", name: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)" },
      { id: "jac", name: "झारखंड अधिविद्य परिषद् (JAC रांची)" },
      { id: "pseb", name: "पंजाब स्कूल शिक्षा बोर्ड (PSEB मोहाली)" },
      { id: "nios", name: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS)" },
      { id: "cgbse", name: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)" },
      { id: "bseodisha", name: "ओडिशा उच्च माध्यमिक शिक्षा परिषद (CHSE Odisha)" },
      { id: "ubse", name: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)" },
      { id: "seba", name: "असम उच्चतर माध्यमिक शिक्षा परिषद (AHSEC गुवाहाटी)" },
      { id: "bsetelangana", name: "तेलंगाना एवं आंध्र प्रदेश बोर्ड (BSE Telangana / BIEAP)" }
    ],
    subjects: [
      { id: "all", name: "🎯 12th Arts Full Simulation Mock (सभी कला विषय)" },
      { id: "history", name: "🏛️ इतिहास (History - Ancient, Medieval, Modern)" },
      { id: "polity", name: "⚖️ राजनीति विज्ञान (Political Science - Constitution & Global Politics)" },
      { id: "geography", name: "🗺️ भूगोल (Geography - Human Geography & Resources)" },
      { id: "economics", name: "📈 अर्थशास्त्र (Economics - Micro & Macro Economics)" },
      { id: "sociology", name: "👥 समाजशास्त्र (Sociology - Indian Society & Social Change)" },
      { id: "hindi", name: "📖 हिन्दी साहित्य / सामान्य हिन्दी (Hindi Literature)" },
      { id: "english", name: "📖 English Core (Literature & Grammar)" }
    ]
  },

  // 6. ALL-INDIA MASTER MIX
  {
    id: "all-india-mix",
    name: "All-India Competition Master Mix Mock",
    category: "master",
    isBoard: false,
    langMode: "bilingual-hindi",
    subjects: [
      { id: "all", name: "🎯 100 Questions All-India Competition Mix" },
      { id: "gk", name: "🏛️ General Knowledge & 10-Year PYQ" },
      { id: "science", name: "⚡ General Science High-Yield" },
      { id: "math", name: "📐 Mathematics & Speed Calculation" },
      { id: "reasoning", name: "🧠 Reasoning Ability & Problem Solving" },
      { id: "hindi", name: "📖 सामान्य हिन्दी" },
      { id: "english", name: "📖 General English" }
    ]
  }
];

// Curated Master Question Repository
const MASTER_QUESTIONS = [
  // ================= MATHEMATICS / QUANT =================
  {
    id: "m-1",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "bihar-police", "banking", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "औसत चाल शॉर्टकट: एक व्यक्ति 60 किमी/घंटा से जाता है तथा 40 किमी/घंटा से लौटता है। पूरी यात्रा की औसत चाल क्या होगी?",
    options: ["A) 50 किमी/घंटा", "B) 48 किमी/घंटा", "C) 45 किमी/घंटा", "D) 52 किमी/घंटा"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 48 किमी/घंटा।\n⚡ Trick: जब दूरी समान हो, औसत चाल = 2xy/(x+y) = 2×60×40/(60+40) = 4800/100 = 48 किमी/घंटा।"
  },
  {
    id: "m-2",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "bihar-police", "banking", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "समय और कार्य: A किसी कार्य को 12 दिन में तथा B उसी कार्य को 18 दिन में पूरा करता है। दोनों मिलकर कितने दिन में पूरा करेंगे?",
    options: ["A) 7.2 दिन", "B) 8 दिन", "C) 6 दिन", "D) 7.5 दिन"],
    correct: 0,
    explanation: "💡 सही उत्तर: A) 7.2 दिन।\n⚡ Formula: (A × B) / (A + B) = (12 × 18) / 30 = 216 / 30 = 7.2 दिन।"
  },
  {
    id: "m-3",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "banking", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "चक्रवृद्धि व साधारण ब्याज का अंतर: ₹5,000 की राशि पर 10% वार्षिक दर से 2 वर्ष के CI और SI का अंतर क्या होगा?",
    options: ["A) ₹25", "B) ₹50", "C) ₹75", "D) ₹100"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) ₹50।\n⚡ 2 वर्ष के अंतर का रामबाण सूत्र: D = P × (R/100)² = 5000 × (10/100)² = 5000 × 1/100 = ₹50।"
  },
  {
    id: "m-4",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "bihar-police", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "लाभ और हानि: किसी वस्तु को ₹720 में बेचने पर 20% का लाभ होता है। वस्तु का क्रय मूल्य (Cost Price) क्या है?",
    options: ["A) ₹600", "B) ₹580", "C) ₹640", "D) ₹560"],
    correct: 0,
    explanation: "💡 सही उत्तर: A) ₹600।\nCP = SP × 100 / (100 + लाभ %) = 720 × 100 / 120 = ₹600।"
  },
  {
    id: "m-5",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "banking", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "प्रतिशत नियम: यदि चीनी के मूल्य में 25% की वृद्धि हो जाए, तो खपत में कितने प्रतिशत की कमी करनी होगी ताकि खर्च न बढ़े?",
    options: ["A) 25%", "B) 20%", "C) 16.66%", "D) 15%"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 20%।\n⚡ Trick: [r / (100 + r)] × 100 = [25 / 125] × 100 = 1/5 × 100 = 20% कमी।"
  },
  {
    id: "m-6",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "all-india-mix"],
    subjectTags: ["math", "quant"],
    q: "अनुपात: यदि A : B = 2 : 3 तथा B : C = 4 : 5 हो, तो A : B : C का अनुपात क्या होगा?",
    options: ["A) 8 : 12 : 15", "B) 6 : 9 : 15", "C) 8 : 10 : 15", "D) 2 : 7 : 5"],
    correct: 0,
    explanation: "💡 सही उत्तर: A) 8 : 12 : 15।\nउल्टा N गुणा: A = 2×4=8, B = 3×4=12, C = 3×5=15।"
  },
  {
    id: "m-7",
    examTags: ["ssc-gd", "railway-alp", "railway-group-d", "board-10th", "all-india-mix"],
    subjectTags: ["math"],
    q: "समकोण त्रिभुज (पाइथागोरस त्रिक): यदि किसी समकोण त्रिभुज का लम्ब 5 सेमी और आधार 12 सेमी है, तो कर्ण क्या होगा?",
    options: ["A) 15 सेमी", "B) 13 सेमी", "C) 14 सेमी", "D) 17 सेमी"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 13 सेमी।\nपाइथागोरस त्रिक: (5, 12, 13)। कर्ण = √(5² + 12²) = √169 = 13 सेमी।"
  },
  {
    id: "m-8",
    examTags: ["ssc-gd", "railway-alp", "board-10th", "all-india-mix"],
    subjectTags: ["math"],
    q: "द्विघात समीकरण: 2x² - 4x + 3 = 0 के मूलों (Roots) की प्रकृति क्या होगी?",
    options: ["A) वास्तविक एवं समान", "B) काल्पनिक (अवास्तविक)", "C) वास्तविक एवं भिन्न", "D) अपरिमेय"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) काल्पनिक।\nविविक्तकर D = b² - 4ac = (-4)² - 4(2)(3) = 16 - 24 = -8 < 0, अतः मूल अवास्तविक होंगे।"
  },

  // ================= GENERAL SCIENCE / PHYSICS / CHEMISTRY / BIOLOGY =================
  {
    id: "s-1",
    examTags: ["railway-alp", "railway-group-d", "ssc-gd", "bihar-police", "board-10th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "physics"],
    q: "गतिज ऊर्जा (Kinetic Energy) न्यूमेरिकल: 10 किग्रा द्रव्यमान की वस्तु 4 मी/से के वेग से गतिमान है, उसकी गतिज ऊर्जा क्या होगी?",
    options: ["A) 40 जूल", "B) 80 जूल", "C) 160 जूल", "D) 20 जूल"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 80 जूल।\nसूत्र: KE = 1/2 m v² = 1/2 × 10 × 4² = 5 × 16 = 80 जूल (J)।"
  },
  {
    id: "s-2",
    examTags: ["railway-alp", "railway-group-d", "board-10th", "board-12th", "all-india-mix"],
    subjectTags: ["science", "physics"],
    q: "ओम का नियम (Ohm's Law): किसी चालक तार का प्रतिरोध 5 Ω है तथा उसमें 2 A की धारा प्रवाहित है, विभवांतर क्या होगा?",
    options: ["A) 2.5 वोल्ट", "B) 10 वोल्ट", "C) 7 वोल्ट", "D) 20 वोल्ट"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 10 वोल्ट।\nसूत्र: V = I × R = 2 A × 5 Ω = 10 V।"
  },
  {
    id: "s-3",
    examTags: ["railway-alp", "railway-group-d", "ssc-gd", "bihar-police", "board-10th", "all-india-mix"],
    subjectTags: ["science", "physics"],
    q: "ध्वनि की चाल (Speed of Sound): ध्वनि तरंगें किस माध्यम में गमन नहीं कर सकतीं और किसमें सर्वाधिक तेज होती हैं?",
    options: ["A) जल में गमन नहीं कर सकतीं", "B) निर्वात (चाल = 0) में गमन नहीं कर सकतीं, ठोस में सर्वाधिक तेज होती हैं", "C) हवा में सर्वाधिक तेज होती हैं", "D) निर्वात में सर्वाधिक तेज होती हैं"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) निर्वात में गमन नहीं कर सकतीं, ठोस (स्टील/लोहे में लगभग 5,960 मी/से) में सर्वाधिक तेज होती हैं।"
  },
  {
    id: "s-4",
    examTags: ["railway-alp", "railway-group-d", "board-10th", "board-12th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "chemistry"],
    q: "रासायनिक सूत्र: बेकिंग सोडा (खाने का सोडा) और धावन सोडा (धोने का सोडा) का सही रासायनिक सूत्र क्या है?",
    options: ["A) Na₂CO₃ और NaHCO₃", "B) NaHCO₃ (सोडियम बाइकार्बोनेट) और Na₂CO₃·10H₂O", "C) NaCl और NaOH", "D) CaO और CaCO₃"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) बेकिंग सोडा = NaHCO₃; धोने का सोडा = Na₂CO₃·10H₂O।"
  },
  {
    id: "s-5",
    examTags: ["railway-alp", "railway-group-d", "ssc-gd", "board-10th", "board-12th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "biology", "neet-bio"],
    q: "विटामिन व धातु: विटामिन B-12 (Cyanocobalamin) में कौन सी धातु का परमाणु उपस्थित होता है?",
    options: ["A) लोहा (Iron)", "B) मैग्नीशियम", "C) कोबाल्ट (Cobalt)", "D) तांबा"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) कोबाल्ट।\nव्याख्या: क्लोरोफिल में मैग्नीशियम होता है और हीमोग्लोबिन में लोहा।"
  },
  {
    id: "s-6",
    examTags: ["railway-alp", "railway-group-d", "board-10th", "board-12th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "chemistry"],
    q: "आधुनिक आवर्त सारणी: आधुनिक आवर्त सारणी का नियम किसने प्रतिपादित किया था?",
    options: ["A) दिमित्री मेंडलीफ", "B) हेनरी मोसले (1913)", "C) जॉन न्यूलैंड्स", "D) जॉन डाल्टन"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) हेनरी मोसले (1913)।\nतत्वों के भौतिक एवं रासायनिक गुण उनके 'परमाणु क्रमांक' (Atomic Number) के आवर्ती फलन होते हैं।"
  },
  {
    id: "s-7",
    examTags: ["railway-alp", "railway-group-d", "board-10th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "biology", "neet-bio"],
    q: "कोशिका विज्ञान: कोशिका का 'शक्तिगृह' (Powerhouse of the Cell) किसे कहा जाता है?",
    options: ["A) राइबोसोम", "B) लाइसोसोम", "C) माइटोकॉन्ड्रिया", "D) गॉल्जीकाय"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) माइटोकॉन्ड्रिया।\nयहाँ कोशिकीय श्वसन से ऊर्जा ATP के रूप में संचित होती है। लाइसोसोम को आत्महत्या की थैली कहा जाता है।"
  },
  {
    id: "s-8",
    examTags: ["railway-alp", "board-10th", "board-12th", "neet-jee", "all-india-mix"],
    subjectTags: ["science", "physics"],
    q: "प्रकाश का अपवर्तन (Snell's Law): जब प्रकाश विरल से सघन माध्यम में जाता है, तो क्या होता है?",
    options: ["A) अभिलंब से दूर हटता है", "B) अभिलंब की ओर झुकता है और चाल घटती है", "C) चाल बढ़ जाती है", "D) सीधी रेखा में बिना मुड़े निकल जाता है"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) अभिलंब की ओर झुकता है और चाल घटती है। स्नेल का नियम: sin i / sin r = μ।"
  },

  // ================= SAMANYA HINDI (UP POLICE / SSC GD / BIHAR POLICE / BOARDS) =================
  {
    id: "h-1",
    examTags: ["up-police", "ssc-gd", "bihar-police", "board-10th", "board-12th", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "संधि के भेद: 'संधि' के मुख्य रूप से कितने भेद होते हैं और 'विद्या + आलय' में कौन सी संधि है?",
    options: ["A) 2 भेद, गुण संधि", "B) 3 भेद (स्वर, व्यंजन, विसर्ग), दीर्घ स्वर संधि", "C) 4 भेद, यण संधि", "D) 5 भेद, अयादि संधि"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 3 भेद होते हैं। विद्यालय में दीर्घ स्वर संधि (आ + आ = आ) है।"
  },
  {
    id: "h-2",
    examTags: ["up-police", "ssc-gd", "bihar-police", "board-10th", "board-12th", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "समास पहचान: 'दशानन' (दस हैं आनन जिसके अर्थात् रावण) में कौन सा समास है?",
    options: ["A) द्विगु समास", "B) बहुव्रीहि समास", "C) तत्पुरुष समास", "D) कर्मधारय समास"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) बहुव्रीहि समास।\nजब दोनों पद मिलकर किसी तीसरे विशेष पद (रावण) की ओर संकेत करते हैं, तो बहुव्रीहि समास होता है।"
  },
  {
    id: "h-3",
    examTags: ["up-police", "ssc-gd", "bihar-police", "board-10th", "board-12th", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "अलंकार पहचान: 'कनक कनक ते सौ गुनी मादकता अधिकाय' में कौन सा अलंकार है?",
    options: ["A) अनुप्रास अलंकार", "B) रूपक अलंकार", "C) यमक अलंकार", "D) श्लेष अलंकार"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) यमक अलंकार।\nएक ही शब्द दो बार आए और अर्थ अलग हो (पहला कनक = सोना, दूसरा कनक = धतूरा)।"
  },
  {
    id: "h-4",
    examTags: ["up-police", "ssc-gd", "bihar-police", "board-10th", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "मुहावरा: 'आँखें फेर लेना' मुहावरे का सही अर्थ क्या है?",
    options: ["A) दूसरी तरफ देखना", "B) उदासीन हो जाना या पहले जैसा व्यवहार न रखना", "C) गुस्सा करना", "D) अंधा हो जाना"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) उदासीन हो जाना या पहले जैसा व्यवहार न रखना।"
  },
  {
    id: "h-5",
    examTags: ["up-police", "ssc-gd", "bihar-police", "board-10th", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "तत्सम-तद्भव: 'अग्नि' और 'दुग्ध' के सही तद्भव रूप क्या होंगे?",
    options: ["A) अनल और पय", "B) आग और दूध", "C) पावक और क्षीर", "D) ज्वाला और दही"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) आग और दूध। संस्कृत के मूल शब्द तत्सम तथा परिवर्तित रूप तद्भव कहलाते हैं।"
  },
  {
    id: "h-6",
    examTags: ["up-police", "ssc-gd", "bihar-police", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "कारक पहचान: 'पेड़ से पत्ता गिरा' में कौन सा कारक है?",
    options: ["A) करण कारक", "B) कर्म कारक", "C) अपादान कारक", "D) संबंध कारक"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) अपादान कारक।\nजहाँ किसी वस्तु का किसी स्थान से अलग होना पाया जाए (विभक्ति: 'से' अलग होने के अर्थ में), वहाँ अपादान कारक होता है।"
  },
  {
    id: "h-7",
    examTags: ["up-police", "ssc-gd", "bihar-police", "all-india-mix"],
    subjectTags: ["hindi"],
    q: "राजभाषा व लिपि: भारतीय संविधान के किस अनुच्छेद में हिन्दी को संघ की राजभाषा और देवनागरी को लिपि घोषित किया गया है?",
    options: ["A) अनुच्छेद 351", "B) अनुच्छेद 343(1)", "C) अनुच्छेद 324", "D) अनुच्छेद 280"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) अनुच्छेद 343(1)। हिन्दी दिवस प्रत्येक वर्ष 14 सितम्बर को मनाया जाता है।"
  },

  // ================= GENERAL KNOWLEDGE / POLITY / HISTORY / GEOGRAPHY =================
  {
    id: "gk-1",
    examTags: ["ssc-gd", "ssc-cgl", "railway-group-d", "up-police", "delhi-police", "bihar-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "ga", "polity"],
    q: "भारतीय संविधान का अनुच्छेद 17 (Article 17) किससे संबंधित है?",
    options: ["A) उपाधियों का अंत", "B) अस्पृश्यता का अंत (Abolition of Untouchability)", "C) प्रेस की स्वतंत्रता", "D) धार्मिक स्वतंत्रता"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) अस्पृश्यता का अंत। अनुच्छेद 18 उपाधियों के अंत से संबंधित है।"
  },
  {
    id: "gk-2",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "ga"],
    q: "'नीति आयोग' (NITI Aayog) की स्थापना किस वर्ष योजना आयोग के स्थान पर की गई थी?",
    options: ["A) 15 अगस्त 2014", "B) 1 जनवरी 2015", "C) 26 जनवरी 2015", "D) 1 अप्रैल 2016"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 1 जनवरी 2015। इसके पदेन अध्यक्ष प्रधानमंत्री होते हैं।"
  },
  {
    id: "gk-3",
    examTags: ["ssc-gd", "ssc-cgl", "up-police", "delhi-police", "bihar-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "history"],
    q: "सिंधु घाटी सभ्यता का प्रमुख स्थल 'मोहनजोदड़ो' किस नदी के किनारे स्थित है?",
    options: ["A) रावी नदी", "B) सिन्धु नदी", "C) भोगवा नदी", "D) घग्घर नदी"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) सिन्धु नदी। (हड़प्पा रावी नदी पर है, लोथल भोगवा नदी पर है।)"
  },
  {
    id: "gk-4",
    examTags: ["ssc-gd", "ssc-cgl", "up-police", "delhi-police", "bihar-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "polity"],
    q: "संविधान सभा की 'प्रारूप समिति' (Drafting Committee) के अध्यक्ष कौन थे?",
    options: ["A) डॉ. राजेन्द्र प्रसाद", "B) पं. जवाहरलाल नेहरू", "C) डॉ. भीमराव अंबेडकर", "D) बी. एन. राव"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) डॉ. भीमराव अंबेडकर। प्रारूप समिति का गठन 29 अगस्त 1947 को हुआ था (कुल 7 सदस्य)।"
  },
  {
    id: "gk-5",
    examTags: ["ssc-gd", "ssc-cgl", "railway-group-d", "up-police", "delhi-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "ga"],
    q: "भारत की मुख्य भूमि की सबसे लंबी तटरेखा (Longest Coastline) किस राज्य की है?",
    options: ["A) महाराष्ट्र", "B) आंध्र प्रदेश", "C) गुजरात", "D) तमिलनाडु"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) गुजरात (लगभग 1,600 किमी)। दूसरे स्थान पर आंध्र प्रदेश है।"
  },
  {
    id: "gk-6",
    examTags: ["ssc-gd", "ssc-cgl", "up-police", "delhi-police", "bihar-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "history"],
    q: "1917 का 'चंपारण सत्याग्रह' महात्मा गांधी जी द्वारा किसके विरोध में शुरू किया गया था?",
    options: ["A) रोलेट एक्ट", "B) नमक कानून", "C) तिनकठिया प्रथा (नील की खेती)", "D) साइमन कमीशन"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) तिनकठिया प्रथा। राजकुमार शुक्ल के निमंत्रण पर गांधीजी चंपारण पहुंचे थे।"
  },
  {
    id: "gk-7",
    examTags: ["ssc-gd", "ssc-cgl", "railway-group-d", "up-police", "delhi-police", "banking", "all-india-mix"],
    subjectTags: ["gk", "ga", "banking-gk"],
    q: "भारत में ₹1 के नोट और सिक्कों को कौन जारी करता है?",
    options: ["A) RBI", "B) वित्त मंत्रालय (वित्त सचिव के हस्ताक्षर)", "C) SBI", "D) नीति आयोग"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) वित्त मंत्रालय। ₹1 के नोट पर वित्त सचिव के हस्ताक्षर होते हैं, अन्य सभी पर RBI गवर्नर के।"
  },
  {
    id: "gk-8",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "up-police", "bpsc", "all-india-mix"],
    subjectTags: ["gk", "ga"],
    q: "'सत्यमेव जयते' भारत का राष्ट्रीय आदर्श वाक्य किस प्राचीन उपनिषद से लिया गया है?",
    options: ["A) कठोपनिषद", "B) मुण्डकोपनिषद", "C) छांदोग्य उपनिषद", "D) केनोपनिषद"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) मुण्डकोपनिषद। यह अशोक स्तंभ के नीचे देवनागरी लिपि में अंकित है।"
  },

  // ================= COMPUTER KNOWLEDGE (DELHI POLICE / BANKING / SSC) =================
  {
    id: "comp-1",
    examTags: ["delhi-police", "banking", "ssc-cgl", "all-india-mix"],
    subjectTags: ["computer"],
    q: "MS Excel में किसी सेल में वर्तमान दिनांक (Current Date) प्रविष्ट करने की शॉर्टकट कुंजी क्या है?",
    options: ["A) Ctrl + D", "B) Ctrl + ; (Semi-colon)", "C) Ctrl + Shift + :", "D) Alt + Shift + D"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) Ctrl + ;।\nCtrl + Shift + : से वर्तमान समय (Time) प्रविष्ट होता है।"
  },
  {
    id: "comp-2",
    examTags: ["delhi-police", "banking", "ssc-cgl", "all-india-mix"],
    subjectTags: ["computer"],
    q: "कंप्यूटर नेटवर्क में 'HTTP' और 'HTTPS' में 'S' का पूर्ण रूप क्या है?",
    options: ["A) Standard", "B) Secure (Security Protocol SSL/TLS)", "C) System", "D) Server"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) Secure। HTTPS का पोर्ट नंबर सामान्यतः 443 होता है और HTTP का पोर्ट 80।"
  },
  {
    id: "comp-3",
    examTags: ["delhi-police", "banking", "ssc-cgl", "all-india-mix"],
    subjectTags: ["computer"],
    q: "कंप्यूटर की कौन सी मेमोरी अस्थायी (Volatile) होती है, जो बिजली कटने पर डेटा खो देती है?",
    options: ["A) ROM", "B) Hard Disk", "C) RAM (Random Access Memory)", "D) SSD"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) RAM। ROM एक स्थायी (Non-Volatile) मेमोरी है।"
  },
  {
    id: "comp-4",
    examTags: ["delhi-police", "banking", "ssc-cgl", "all-india-mix"],
    subjectTags: ["computer"],
    q: "ई-मेल में 'BCC' का पूर्ण रूप क्या होता है?",
    options: ["A) Basic Carbon Copy", "B) Blind Carbon Copy", "C) Best Communication Channel", "D) Binary Code Carrier"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) Blind Carbon Copy। इसमें जोड़े गए प्राप्तकर्ताओं के पते अन्य प्राप्तकर्ताओं को नहीं दिखते।"
  },

  // ================= UP SPECIAL GK & LAW (UP POLICE CONSTABLE / SI) =================
  {
    id: "up-1",
    examTags: ["up-police"],
    subjectTags: ["up-gk"],
    q: "उत्तर प्रदेश का राजकीय पशु और राजकीय पक्षी कौन सा है?",
    options: ["A) बाघ और मोर", "B) बारहसिंगा (रूसर्वस डुवाउसेली) और सारस (क्रेन)", "C) गाय और तोता", "D) हाथी और कोयल"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) बारहसिंगा और सारस (क्रेन)। UP का राजकीय वृक्ष अशोक और राजकीय पुष्प पलाश (ढाक) है।"
  },
  {
    id: "up-2",
    examTags: ["up-police"],
    subjectTags: ["up-gk"],
    q: "उत्तर प्रदेश में प्रसिद्ध 'कुंभ मेला' किस पवित्र संगम नगरी में आयोजित होता है?",
    options: ["A) वाराणसी", "B) प्रयागराज (त्रिवेणी संगम)", "C) मथुरा", "D) अयोध्या"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) प्रयागराज। गंगा, यमुना और अदृश्य सरस्वती के पावन संगम पर महाकुंभ का आयोजन होता है।"
  },
  {
    id: "up-3",
    examTags: ["up-police"],
    subjectTags: ["law"],
    q: "भारतीय दंड संहिता (IPC) / भारतीय न्याय संहिता (BNS): एफआईआर (FIR) का पूर्ण रूप क्या है?",
    options: ["A) First Investigation Report", "B) First Information Report (प्रथम सूचना रिपोर्ट)", "C) Final Inspection Record", "D) Formal Inquiry Rule"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) First Information Report। यह दंड प्रक्रिया संहिता (CrPC) की धारा 154 के तहत दर्ज की जाती है।"
  },

  // ================= BIHAR SPECIAL GK (BIHAR POLICE / BPSC) =================
  {
    id: "bih-1",
    examTags: ["bihar-police", "bpsc"],
    subjectTags: ["bihar", "gk"],
    q: "बिहार का शोक (Sorrow of Bihar) किस नदी को कहा जाता है जो अपना मार्ग बदलने के लिए कुख्यात है?",
    options: ["A) गंडक नदी", "B) कोसी नदी", "C) सोन नदी", "D) बागमती नदी"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) कोसी नदी। यह तिब्बत/नेपाल से निकलकर गंगा में मिलती है और भारी बाढ़ लाती है।"
  },
  {
    id: "bih-2",
    examTags: ["bihar-police", "bpsc"],
    subjectTags: ["bihar", "gk"],
    q: "प्राचीन भारत का प्रसिद्ध 'नालंदा विश्वविद्यालय' किसके द्वारा स्थापित किया गया था?",
    options: ["A) चंद्रगुप्त मौर्य", "B) समुद्रगुप्त", "C) गुप्त सम्राट कुमारगुप्त प्रथम", "D) हर्षवर्धन"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) कुमारगुप्त प्रथम (5वीं शताब्दी ईस्वी)। 12वीं शताब्दी में इसे बख्तियार खिलजी ने नष्ट किया था।"
  },

  // ================= REASONING ABILITY =================
  {
    id: "r-1",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "banking", "all-india-mix"],
    subjectTags: ["reasoning"],
    q: "संख्या श्रृंखला: 2, 6, 12, 20, 30, ? में अगला पद क्या होगा?",
    options: ["A) 40", "B) 42", "C) 44", "D) 38"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 42।\nपैटर्न: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, अगला पद 6×7 = 42 होगा।"
  },
  {
    id: "r-2",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "railway-group-d", "up-police", "delhi-police", "banking", "all-india-mix"],
    subjectTags: ["reasoning"],
    q: "कोडिंग-डिकोडिंग: यदि किसी कूटभाषा में 'CAT' = 24 और 'DOG' = 26 है, तो 'PIG' = ?",
    options: ["A) 32", "B) 30", "C) 34", "D) 28"],
    correct: 0,
    explanation: "💡 सही उत्तर: A) 32।\nवर्णमाला स्थान मान का योग: P(16) + I(9) + G(7) = 32।"
  },
  {
    id: "r-3",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "up-police", "banking", "all-india-mix"],
    subjectTags: ["reasoning"],
    q: "रक्त संबंध: एक तस्वीर की ओर संकेत करते हुए मोहन ने कहा, 'यह मेरे पिता के इकलौते पुत्र की पत्नी है।' वह महिला मोहन की क्या है?",
    options: ["A) बहन", "B) माता", "C) पत्नी", "D) पुत्री"],
    correct: 2,
    explanation: "💡 सही उत्तर: C) पत्नी।\nमोहन के पिता का इकलौता पुत्र = स्वयं मोहन। मोहन की पत्नी = तस्वीर वाली महिला।"
  },
  {
    id: "r-4",
    examTags: ["ssc-gd", "ssc-cgl", "railway-alp", "up-police", "banking", "all-india-mix"],
    subjectTags: ["reasoning"],
    q: "दिशा परीक्षण: एक व्यक्ति उत्तर दिशा में 10 मीटर चलता है, फिर दाएं मुड़कर 15 मीटर चलता है, पुनः दाएं मुड़कर 10 मीटर चलता है। वह प्रारंभिक बिंदु से कितनी दूरी पर है?\n[Direction Test: A person walks 10m North, turns right and walks 15m, turns right again and walks 10m. How far is he from starting point?]",
    options: ["A) 25 मीटर", "B) 15 मीटर पूर्व (15m East)", "C) 15 मीटर पश्चिम (15m West)", "D) 20 मीटर"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 15 मीटर पूर्व दिशा में।"
  },

  // ================= UP POLICE SPECIAL & LAW =================
  {
    id: "up-spec-1",
    examTags: ["up-police"],
    subjectTags: ["up-gk"],
    q: "उत्तर प्रदेश में कुल कितने प्रशासनिक मंडल (Divisions) तथा कितने जिले (Districts) हैं?\n[How many administrative divisions and districts are there in Uttar Pradesh?]",
    options: ["A) 16 मंडल और 70 जिले", "B) 18 मंडल और 75 जिले (18 Divisions & 75 Districts)", "C) 20 मंडल और 80 जिले", "D) 15 मंडल और 65 जिले"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 18 मंडल और 75 जिले। उत्तर प्रदेश का सबसे बड़ा जिला लखीमपुर खीरी तथा सबसे छोटा हापुड़ है।"
  },
  {
    id: "up-spec-2",
    examTags: ["up-police"],
    subjectTags: ["up-gk"],
    q: "उत्तर प्रदेश का एकमात्र राष्ट्रीय उद्यान 'दुधवा राष्ट्रीय उद्यान' किस जिले में स्थित है?\n[In which district is Dudhwa National Park located in Uttar Pradesh?]",
    options: ["A) पीलीभीत", "B) लखीमपुर खीरी (Lakhimpur Kheri)", "C) बहराइच", "D) सोनभद्र"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) लखीमपुर खीरी। इसे 1977 में राष्ट्रीय उद्यान घोषित किया गया था और यह टाइगर रिजर्व भी है।"
  },
  {
    id: "up-law-2",
    examTags: ["up-police"],
    subjectTags: ["law"],
    q: "भारतीय संविधान का कौन सा अनुच्छेद 'प्राण और दैहिक स्वतंत्रता के संरक्षण' (Right to Life & Personal Liberty) की गारंटी देता है?\n[Which Article of the Constitution guarantees Protection of Life and Personal Liberty?]",
    options: ["A) अनुच्छेद 19", "B) अनुच्छेद 21 (Article 21)", "C) अनुच्छेद 22", "D) अनुच्छेद 32"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) अनुच्छेद 21। आपातकाल (Emergency) के दौरान भी अनुच्छेद 20 और 21 को निलंबित नहीं किया जा सकता।"
  },

  // ================= BIHAR POLICE & BPSC SPECIAL =================
  {
    id: "bih-spec-1",
    examTags: ["bihar-police", "bpsc"],
    subjectTags: ["bihar", "gk"],
    q: "बिहार में 1857 के प्रथम स्वतंत्रता संग्राम का नेतृत्व जगदीशपुर से किस वीर योद्धा ने किया था?\n[Who led the First War of Independence (1857) from Jagdishpur in Bihar?]",
    options: ["A) तात्या टोपे", "B) बाबू वीर कुंवर सिंह (Babu Veer Kunwar Singh)", "C) अमर सिंह", "D) पीर अली"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) बाबू वीर कुंवर सिंह। उन्होंने 80 वर्ष की उम्र में अंग्रेजों के विरुद्ध वीरतापूर्वक युद्ध किया।"
  },
  {
    id: "bih-spec-2",
    examTags: ["bihar-police", "bpsc"],
    subjectTags: ["bihar", "gk"],
    q: "बिहार का एकमात्र टाइगर रिजर्व 'वाल्मीकि राष्ट्रीय उद्यान' किस जिले में स्थित है?\n[In which district is Valmiki National Park & Tiger Reserve located in Bihar?]",
    options: ["A) गया", "B) पश्चिमी चंपारण (West Champaran)", "C) कैमूर", "D) रोहतास"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) पश्चिमी चंपारण। यह भारत-नेपाल सीमा पर गंडक नदी के किनारे स्थित है।"
  },
  {
    id: "bih-sci-1",
    examTags: ["bihar-police", "railway-group-d"],
    subjectTags: ["science"],
    q: "प्रकाश संश्लेषण (Photosynthesis) की क्रिया में उत्सर्जित होने वाली ऑक्सीजन गैस का मुख्य स्रोत क्या है?\n[What is the source of Oxygen released during photosynthesis?]",
    options: ["A) कार्बन डाइऑक्साइड (CO₂)", "B) जल (H₂O - Water)", "C) ग्लूकोज", "D) क्लोरोफिल"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) जल (H₂O)। प्रकाश-रासायनिक अभिक्रिया में जल के अणुओं का प्रकाशिक अपघटन (Photolysis) होता है।"
  },

  // ================= CLASS 10TH BOARD (MATRIC) =================
  {
    id: "b10-sci-1",
    examTags: ["board-10th"],
    subjectTags: ["science"],
    q: "प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?\n[In which medium is the speed of light maximum?]",
    options: ["A) कांच (Glass)", "B) निर्वात (Vacuum - 3 × 10⁸ m/s)", "C) जल (Water)", "D) हीरा (Diamond)"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) निर्वात (Vacuum)। निर्वात में प्रकाश की चाल लगभग 3 लाख किमी प्रति सेकंड होती है।"
  },
  {
    id: "b10-math-1",
    examTags: ["board-10th"],
    subjectTags: ["math"],
    q: "यदि द्विघात समीकरण 2x² - 4x + k = 0 के दोनों मूल बराबर हों, तो k का मान क्या होगा?\n[If both roots of quadratic equation 2x² - 4x + k = 0 are equal, find value of k:]",
    options: ["A) 1", "B) 2", "C) 4", "D) -2"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 2।\nसमान मूलों हेतु विविक्तकर D = b² - 4ac = 0 ⇒ (-4)² - 4(2)(k) = 0 ⇒ 16 - 8k = 0 ⇒ k = 2।"
  },
  {
    id: "b10-math-2",
    examTags: ["board-10th"],
    subjectTags: ["math"],
    q: "निर्देशांक ज्यामिति: बिन्दु (-3, 4) कार्तीय तल के किस चतुर्थांश (Quadrant) में स्थित है?\n[In which quadrant of coordinate plane does the point (-3, 4) lie?]",
    options: ["A) प्रथम चतुर्थांश (+, +)", "B) द्वितीय चतुर्थांश (-, +)", "C) तृतीय चतुर्थांश (-, -)", "D) चतुर्थ चतुर्थांश (+, -)"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) द्वितीय चतुर्थांश (Second Quadrant: x ऋणात्मक, y धनात्मक)।"
  },
  {
    id: "b10-soc-1",
    examTags: ["board-10th"],
    subjectTags: ["social"],
    q: "पर्यावरण संरक्षण: 'चिपको आंदोलन' का मुख्य उद्देश्य किसका संरक्षण था और इसके मुख्य प्रणेता कौन थे?\n[What was the main aim of Chipko Movement and who was its key leader?]",
    options: ["A) जल संरक्षण - मेधा पाटकर", "B) वनों एवं वृक्षों की कटाई रोकना - सुंदरलाल बहुगुणा", "C) वन्यजीव संरक्षण - सलीम अली", "D) वायु प्रदूषण नियंत्रण"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) वृक्षों की कटाई रोकना। 1973 में उत्तराखंड के चमोली जिले में सुंदरलाल बहुगुणा और गौरा देवी के नेतृत्व में शुरू हुआ था।"
  },

  // ================= CLASS 12TH BOARD (INTERMEDIATE) =================
  {
    id: "b12-phy-1",
    examTags: ["board-12th", "neet-jee"],
    subjectTags: ["physics", "science"],
    q: "स्थिरवैद्युतिकी: गॉस के नियमानुसार किसी बंद पृष्ठ से गुजरने वाला कुल वैद्युत फ्लक्स (Φ) होता है:\n[According to Gauss Law, total electric flux through a closed surface is:]",
    options: ["A) q × ε₀", "B) q / ε₀ (Charge enclosed divided by permittivity)", "C) ε₀ / q", "D) शून्य"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) Φ = q / ε₀। यह स्थिरवैद्युतिकी का मूल नियम है।"
  },
  {
    id: "b12-chem-1",
    examTags: ["board-12th", "neet-jee"],
    subjectTags: ["chemistry", "science"],
    q: "विलयन: 1 लीटर विलयन में घुले विलेय के मोलों की संख्या को क्या कहा जाता है और इसकी इकाई क्या है?\n[Number of moles of solute dissolved in 1 liter of solution is:]",
    options: ["A) मोललता (Molality - mol/kg)", "B) मोलरता (Molarity - mol/L)", "C) नॉर्मलता", "D) मोल प्रभाज"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) मोलरता (Molarity: mol/L)। तापमान बदलने पर मोलरता बदलती है क्योंकि आयतन तापमान पर निर्भर करता है।"
  },
  {
    id: "b12-math-1",
    examTags: ["board-12th", "neet-jee"],
    subjectTags: ["math"],
    q: "अवकलन (Calculus): d/dx (sin 2x) का मान क्या होगा?\n[What is the derivative of sin 2x with respect to x?]",
    options: ["A) cos 2x", "B) 2 cos 2x", "C) -2 cos 2x", "D) 1/2 cos 2x"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 2 cos 2x।\nश्रृंखला नियम (Chain Rule): d/dx[sin(2x)] = cos(2x) × d/dx(2x) = 2 cos 2x।"
  },
  {
    id: "b12-bio-1",
    examTags: ["board-12th", "neet-jee"],
    subjectTags: ["biology", "neet-bio"],
    q: "आनुवंशिकी: डीएनए (DNA) की द्विकुण्डलिनी संरचना (Double Helix Model) का प्रतिपादन 1953 में किसने किया था?\n[Who proposed the Double Helix Model of DNA in 1953?]",
    options: ["A) रॉबर्ट ब्राउन", "B) जेम्स वॉटसन एवं फ्रांसिस क्रिक (Watson & Crick)", "C) मेंडल", "D) हरगोविंद खुराना"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) वॉटसन और क्रिक। इसके लिए उन्हें 1962 में नोबेल पुरस्कार प्रदान किया गया।"
  },

  // ================= RAILWAY ALP & TECHNICIAN SPECIAL =================
  {
    id: "rrb-alp-tech-1",
    examTags: ["railway-alp"],
    subjectTags: ["tech", "science"],
    q: "इंजीनियरिंग एवं भौतिकी: अंतर्राष्ट्रीय मात्रक प्रणाली (SI) में विद्युत आवेश (Electric Charge) का मात्रक क्या है?\n[In SI units, what is the unit of Electric Charge?]",
    options: ["A) एम्पीयर (A)", "B) कूलॉम (Coulomb - C)", "C) वोल्ट (V)", "D) जूल (J)"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) कूलॉम (C)। विद्युत धारा I = Q/t ⇒ Q = I × t (एम्पीयर × सेकंड = कूलॉम)।"
  },
  {
    id: "rrb-alp-num-1",
    examTags: ["railway-alp", "railway-group-d"],
    subjectTags: ["science", "physics"],
    q: "विद्युत ऊर्जा न्यूमेरिकल: 100 वाट का एक बल्ब प्रतिदिन 8 घंटे जलता है। 30 दिन में कितनी यूनिट विद्युत ऊर्जा खर्च होगी?\n[A 100 Watt bulb runs 8 hours daily. How many units of electricity will be consumed in 30 days?]",
    options: ["A) 12 यूनिट", "B) 24 यूनिट (24 kWh)", "C) 48 यूनिट", "D) 240 यूनिट"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 24 यूनिट।\nऊर्जा = (वाट × घंटे × दिन) / 1000 = (100 × 8 × 30) / 1000 = 24000 / 1000 = 24 kWh (यूनिट)।"
  },

  // ================= BANKING & SSC CGL SPECIAL =================
  {
    id: "bank-spec-1",
    examTags: ["banking", "ssc-cgl"],
    subjectTags: ["banking-gk", "gk"],
    q: "बैंकिंग जागरूकता: भारतीय रिजर्व बैंक (RBI) का राष्ट्रीयकरण (Nationalization) किस तिथि को हुआ था?\n[On which date was the Reserve Bank of India nationalized?]",
    options: ["A) 1 अप्रैल 1935", "B) 1 जनवरी 1949 (1st January 1949)", "C) 15 अगस्त 1947", "D) 19 जुलाई 1969"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 1 जनवरी 1949। RBI की स्थापना 1 अप्रैल 1935 को RBI अधिनियम 1934 के तहत हुई थी।"
  },
  {
    id: "cgl-math-spec-1",
    examTags: ["ssc-cgl", "ssc-gd"],
    subjectTags: ["math", "quant"],
    q: "बीजगणित (Algebra Shortcut): यदि x + 1/x = 4 हो, तो x² + 1/x² का मान क्या होगा?\n[If x + 1/x = 4, what is the value of x² + 1/x²?]",
    options: ["A) 16", "B) 14", "C) 18", "D) 12"],
    correct: 1,
    explanation: "💡 सही उत्तर: B) 14।\nरामबाण सूत्र: यदि x + 1/x = k, तो x² + 1/x² = k² - 2 = 4² - 2 = 16 - 2 = 14।"
  }
];

// Helper: Shuffles array in-place using Fisher-Yates algorithm
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ================= 20 MAJOR INDIAN BOARDS METADATA & MULTILINGUAL QUIZ ENGINE =================
const BOARD_METADATA = {
  cbse: { id: "cbse", name: "CBSE Board", fullName: "Central Board of Secondary Education (CBSE)", langMode: "english", nativeLangId: "hindi", nativeLangName: "Hindi Course-A / Course-B" },
  icse: { id: "icse", name: "CISCE (ICSE/ISC)", fullName: "Council for the Indian School Certificate Examinations", langMode: "english", nativeLangId: "hindi", nativeLangName: "Hindi Literature" },
  upmsp: { id: "upmsp", name: "UP Board (UPMSP)", fullName: "उत्तर प्रदेश माध्यमिक शिक्षा परिषद् (UPMSP प्रयागराज)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "सामान्य हिन्दी" },
  bseb: { id: "bseb", name: "Bihar Board (BSEB)", fullName: "बिहार विद्यालय परीक्षा समिति (BSEB पटना)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "राष्ट्रभाषा हिन्दी" },
  maharashtra: { id: "maharashtra", name: "Maharashtra Board (MSBSHSE)", fullName: "महाराष्ट्र राज्य माध्यमिक व उच्च माध्यमिक शिक्षण मंडळ (पुणे)", langMode: "bilingual-marathi", nativeLangId: "marathi", nativeLangName: "मराठी भाषा व साहित्य (Marathi)" },
  rbse: { id: "rbse", name: "Rajasthan Board (RBSE)", fullName: "माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE अजमेर)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "अनिवार्य हिन्दी" },
  mpbse: { id: "mpbse", name: "MP Board (MPBSE)", fullName: "मध्य प्रदेश माध्यमिक शिक्षा मंडल (MPBSE भोपाल)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "सामान्य हिन्दी" },
  wb: { id: "wb", name: "West Bengal Board (WBBSE)", fullName: "পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ (WBBSE কলকাতা)", langMode: "bilingual-bengali", nativeLangId: "bengali", nativeLangName: "বাংলা সাহিত্য ও ব্যাকরণ (Bengali)" },
  tn: { id: "tn", name: "Tamil Nadu Board (TNDGE)", fullName: "தமிழ்நாடு அரசு தேர்வுகள் இயக்ககம் (TNDGE சென்னை)", langMode: "bilingual-tamil", nativeLangId: "tamil", nativeLangName: "தமிழ் மொழி மற்றும் இலக்கியம் (Tamil)" },
  karnataka: { id: "karnataka", name: "Karnataka Board (KSEAB)", fullName: "ಕರ್ನಾಟಕ ಶಾಲಾ ಪರೀಕ್ಷೆ ಮತ್ತು ಮೌಲ್ಯನಿರ್ಣಯ ಮಂಡಲಿ (KSEAB)", langMode: "bilingual-kannada", nativeLangId: "kannada", nativeLangName: "ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯ (Kannada)" },
  gujarat: { id: "gujarat", name: "Gujarat Board (GSEB)", fullName: "ગુજરાત માધ્યમિક અને ઉચ્ચતર માધ્યમિક શિક્ષણ બોર્ડ (GSEB)", langMode: "bilingual-gujarati", nativeLangId: "gujarati", nativeLangName: "ગુજરાતી ભાષા અને વ્યાકરણ (Gujarati)" },
  haryana: { id: "haryana", name: "Haryana Board (BSEH)", fullName: "हरियाणा विद्यालय शिक्षा बोर्ड (BSEH भिवानी)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "हिन्दी (अनिवार्य)" },
  jac: { id: "jac", name: "Jharkhand Board (JAC)", fullName: "झारखंड अधिविद्य परिषद् (JAC रांची)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "हिन्दी (मातृभाषा)" },
  pseb: { id: "pseb", name: "Punjab Board (PSEB)", fullName: "ਪੰਜਾਬ ਸਕੂਲ ਸਿੱਖਿਆ ਬੋਰਡ (PSEB ਮੋਹਾਲੀ)", langMode: "bilingual-punjabi", nativeLangId: "punjabi", nativeLangName: "ਪੰਜਾਬੀ ਲਾਜ਼ਮੀ (Punjabi)" },
  nios: { id: "nios", name: "NIOS Board", fullName: "राष्ट्रीय मुक्त विद्यालयी शिक्षण संस्थान (NIOS)", langMode: "english", nativeLangId: "hindi", nativeLangName: "Hindi Core" },
  cgbse: { id: "cgbse", name: "Chhattisgarh Board (CGBSE)", fullName: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल (CGBSE रायपुर)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "हिन्दी विशिष्ट" },
  bseodisha: { id: "bseodisha", name: "Odisha Board (BSE Odisha)", fullName: "ମାଧ୍ୟମିକ ଶିକ୍ଷା ବୋର୍ଡ, ଓଡ଼ିଶା (BSE Odisha କଟକ)", langMode: "bilingual-odia", nativeLangId: "odia", nativeLangName: "ମାତୃଭାଷା ଓଡ଼ିଆ (Odia)" },
  ubse: { id: "ubse", name: "Uttarakhand Board (UBSE)", fullName: "उत्तराखंड विद्यालयी शिक्षा परिषद् (UBSE रामनगर)", langMode: "bilingual-hindi", nativeLangId: "hindi", nativeLangName: "सामान्य हिन्दी" },
  seba: { id: "seba", name: "Assam Board (SEBA/AHSEC)", fullName: "অসম মাধ্যমিক শিক্ষা পৰিষদ (SEBA গুৱাহাটী)", langMode: "bilingual-assamese", nativeLangId: "assamese", nativeLangName: "অসমীয়া ভাষা আৰু সাহিত্য (Assamese)" },
  bsetelangana: { id: "bsetelangana", name: "Telangana & AP Board (BSE Telangana / BIEAP)", fullName: "తెలంగాణ & ఆంధ్రప్రదేశ్ బోర్డ్ ఆఫ్ సెకండరీ ఎడ్యుకేషన్", langMode: "bilingual-telugu", nativeLangId: "telugu", nativeLangName: "తెలుగు ప్రథమ భాష (Telugu)" }
};

// Returns full academic subject roster for any given board & class
function getSubjectsForBoard(examId = "board-10th", boardId = "bseb") {
  const b = BOARD_METADATA[boardId] || BOARD_METADATA["bseb"];
  
  if (examId === "board-10th") {
    const list = [
      { id: "all", name: `🎯 10th All-Subject Simulation (सभी विषय एक साथ - ${b.name})` },
      { id: "science", name: "⚡ विज्ञान (Science - Physics, Chem, Bio)" },
      { id: "math", name: "📐 गणित (Mathematics - Algebra, Geom, Trig)" },
      { id: "social", name: "🌍 सामाजिक विज्ञान (Social Science - Hist, Civ, Geog, Eco)" },
      { id: "english", name: "📖 English Language & Literature" }
    ];
    if (b.nativeLangId === "hindi") {
      list.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
      list.push({ id: "sanskrit", name: "🕉️ संस्कृत (Sanskrit)" });
    } else {
      list.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      list.push({ id: "hindi", name: "📜 द्वितीय भाषा हिन्दी (Second Language Hindi)" });
    }
    return list;
  }

  // 12th Science Stream
  if (examId === "board-12th-science" || examId === "board-12th") {
    const list = [
      { id: "all", name: `🎯 12th Science Stream Full Mock (${b.name})` },
      { id: "physics", name: "⚡ भौतिक विज्ञान (Physics - Optics, Electromagnetism, Modern Physics)" },
      { id: "chemistry", name: "🧪 रसायन विज्ञान (Chemistry - Organic, Inorganic, Solutions)" },
      { id: "math", name: "📐 गणित (Mathematics - Calculus, Vectors, 3D, Matrices)" },
      { id: "biology", name: "🧬 जीव विज्ञान (Biology - Genetics, Ecology, Biotech)" },
      { id: "english", name: "📖 English Core (Writing & Literature)" }
    ];
    if (b.nativeLangId === "hindi") {
      list.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
      list.push({ id: "sanskrit", name: "🕉️ संस्कृत (Sanskrit)" });
    } else {
      list.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      list.push({ id: "hindi", name: "📜 सामान्य हिन्दी" });
    }
    return list;
  }

  // 12th Commerce Stream
  if (examId === "board-12th-commerce") {
    const list = [
      { id: "all", name: `🎯 12th Commerce Stream Full Mock (${b.name})` },
      { id: "accountancy", name: "📊 लेखाशास्त्र (Accountancy - Partnership, Shares, Cash Flow)" },
      { id: "business", name: "🏢 व्यावसायिक अध्ययन (Business Studies - Management, Marketing, Finance)" },
      { id: "economics", name: "📈 अर्थशास्त्र (Economics - Macroeconomics & Indian Economy)" },
      { id: "entrepreneurship", name: "💡 उद्यमिता एवं व्यावसायिक गणित (Entrepreneurship)" },
      { id: "english", name: "📖 English Core (Writing & Literature)" }
    ];
    if (b.nativeLangId === "hindi") {
      list.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
    } else {
      list.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      list.push({ id: "hindi", name: "📜 सामान्य हिन्दी" });
    }
    return list;
  }

  // 12th Arts Stream
  if (examId === "board-12th-arts") {
    const list = [
      { id: "all", name: `🎯 12th Arts Stream Full Mock (${b.name})` },
      { id: "history", name: "🏛️ इतिहास (History - Ancient, Medieval, Modern)" },
      { id: "polity", name: "⚖️ राजनीति विज्ञान (Political Science - Constitution & Global Politics)" },
      { id: "geography", name: "🗺️ भूगोल (Geography - Human Geography & Resources)" },
      { id: "economics", name: "📈 अर्थशास्त्र (Economics - Micro & Macro Economics)" },
      { id: "sociology", name: "👥 समाजशास्त्र (Sociology - Indian Society & Social Change)" },
      { id: "english", name: "📖 English Core (Writing & Literature)" }
    ];
    if (b.nativeLangId === "hindi") {
      list.push({ id: "hindi", name: `📜 ${b.nativeLangName}` });
    } else {
      list.push({ id: b.nativeLangId, name: `📜 ${b.nativeLangName}` });
      list.push({ id: "hindi", name: "📜 हिन्दी साहित्य" });
    }
    return list;
  }

  return [];
}

// Multilingual Blueprint Matrix for Live Quiz
const CLIENT_BLUEPRINTS = [
  {
    "class": "10th",
    "subject": "math",
    "topic": "Quadratic Equations / द्विघात समीकरण",
    "loc": {
      "bilingual-hindi": {
        "q": "द्विघात समीकरण ax² + bx + c = 0 के दो वास्तविक एवं समान मूल होने की शर्त क्या है?",
        "sub": "Condition for real and equal roots of ax² + bx + c = 0:",
        "options": [
          "A) D > 0",
          "B) विविक्तकर D = 0 (b² - 4ac = 0)",
          "C) D < 0",
          "D) D ≠ 0"
        ],
        "ans": "B) विविक्तकर D = 0 (b² - 4ac = 0)",
        "exp": "💡 सही उत्तर: B) D = 0। जब विविक्तकर D = b² - 4ac = 0 होता है, तो दोनों मूल वास्तविक और समान होते हैं (x = -b/2a)।",
        "correct": 1
      },
      "english": {
        "q": "Condition for real and equal roots of ax² + bx + c = 0:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) D > 0",
          "B) विविक्तकर D = 0 (b² - 4ac = 0)",
          "C) D < 0",
          "D) D ≠ 0"
        ],
        "ans": "B) विविक्तकर D = 0 (b² - 4ac = 0)",
        "exp": "💡 सही उत्तर: B) D = 0। जब विविक्तकर D = b² - 4ac = 0 होता है, तो दोनों मूल वास्तविक और समान होते हैं (x = -b/2a)।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Arithmetic Progressions / समान्तर श्रेढ़ी",
    "loc": {
      "bilingual-hindi": {
        "q": "समान्तर श्रेढ़ी (AP) 3, 8, 13, 18, ... का 10वाँ पद क्या होगा?",
        "sub": "Find the 10th term of the AP: 3, 8, 13, 18, ...",
        "options": [
          "A) 45",
          "B) 48",
          "C) 53",
          "D) 38"
        ],
        "ans": "B) 48",
        "exp": "💡 सही उत्तर: B) 48। सूत्र: a_n = a + (n-1)d। a = 3, d = 5, n = 10 => a_10 = 3 + 9×5 = 48।",
        "correct": 1
      },
      "english": {
        "q": "Find the 10th term of the AP: 3, 8, 13, 18, ...",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 45",
          "B) 48",
          "C) 53",
          "D) 38"
        ],
        "ans": "B) 48",
        "exp": "💡 सही उत्तर: B) 48। सूत्र: a_n = a + (n-1)d। a = 3, d = 5, n = 10 => a_10 = 3 + 9×5 = 48।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Trigonometry / त्रिकोणमिति",
    "loc": {
      "bilingual-hindi": {
        "q": "त्रिकोणमितीय सर्वसमिका 1 + tan²θ का मान किसके बराबर होता है?",
        "sub": "Value of standard identity 1 + tan²θ is equal to:",
        "options": [
          "A) cos²θ",
          "B) sin²θ",
          "C) sec²θ",
          "D) cosec²θ"
        ],
        "ans": "C) sec²θ",
        "exp": "💡 सही उत्तर: C) sec²θ। मूल सर्वसमिका sec²θ - tan²θ = 1 होती है, अतः 1 + tan²θ = sec²θ।",
        "correct": 2
      },
      "english": {
        "q": "Value of standard identity 1 + tan²θ is equal to:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) cos²θ",
          "B) sin²θ",
          "C) sec²θ",
          "D) cosec²θ"
        ],
        "ans": "C) sec²θ",
        "exp": "💡 सही उत्तर: C) sec²θ। मूल सर्वसमिका sec²θ - tan²θ = 1 होती है, अतः 1 + tan²θ = sec²θ।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Coordinate Geometry / निर्देशांक ज्यामिति",
    "loc": {
      "bilingual-hindi": {
        "q": "मूल बिंदु (0, 0) से बिंदु P(3, 4) की दूरी क्या होगी?",
        "sub": "Distance of point P(3, 4) from the origin (0, 0):",
        "options": [
          "A) 3 मात्रक",
          "B) 4 मात्रक",
          "C) 5 मात्रक",
          "D) 7 मात्रक"
        ],
        "ans": "C) 5 मात्रक",
        "exp": "💡 सही उत्तर: C) 5 मात्रक। मूल बिंदु से दूरी = √(x² + y²) = √(3² + 4²) = √(9 + 16) = √25 = 5 मात्रक।",
        "correct": 2
      },
      "english": {
        "q": "Distance of point P(3, 4) from the origin (0, 0):",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 3 मात्रक",
          "B) 4 मात्रक",
          "C) 5 मात्रक",
          "D) 7 मात्रक"
        ],
        "ans": "C) 5 मात्रक",
        "exp": "💡 सही उत्तर: C) 5 मात्रक। मूल बिंदु से दूरी = √(x² + y²) = √(3² + 4²) = √(9 + 16) = √25 = 5 मात्रक।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Circles & Tangents / वृत्त की स्पर्श रेखाएँ",
    "loc": {
      "bilingual-hindi": {
        "q": "वृत्त के किसी बाह्य बिंदु से वृत्त पर कितनी स्पर्श रेखाएँ खींची जा सकती हैं?",
        "sub": "How many tangents can be drawn from an external point to a circle?",
        "options": [
          "A) केवल 1",
          "B) ठीक 2 (दोनों की लंबाई समान)",
          "C) अनंत",
          "D) 0"
        ],
        "ans": "B) ठीक 2 (दोनों की लंबाई समान)",
        "exp": "💡 सही उत्तर: B) ठीक 2। बाह्य बिंदु से वृत्त पर केवल 2 स्पर्श रेखाएँ खींची जा सकती हैं और दोनों लम्बाइयाँ परस्पर बराबर होती हैं।",
        "correct": 1
      },
      "english": {
        "q": "How many tangents can be drawn from an external point to a circle?",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) केवल 1",
          "B) ठीक 2 (दोनों की लंबाई समान)",
          "C) अनंत",
          "D) 0"
        ],
        "ans": "B) ठीक 2 (दोनों की लंबाई समान)",
        "exp": "💡 सही उत्तर: B) ठीक 2। बाह्य बिंदु से वृत्त पर केवल 2 स्पर्श रेखाएँ खींची जा सकती हैं और दोनों लम्बाइयाँ परस्पर बराबर होती हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Statistics / सांख्यिकी",
    "loc": {
      "bilingual-hindi": {
        "q": "माध्य (Mean), माध्यक (Median) तथा बहुलक (Mode) में सही आनुभविक सम्बन्ध क्या है?",
        "sub": "Empirical relationship connecting Mean, Median, and Mode:",
        "options": [
          "A) बहुलक = 3 माध्यक - 2 माध्य",
          "B) बहुलक = 2 माध्यक - 3 माध्य",
          "C) 3 माध्य = बहुलक + माध्यक",
          "D) माध्यक = Mode - Mean"
        ],
        "ans": "A) बहुलक = 3 माध्यक - 2 माध्य",
        "exp": "💡 सही उत्तर: A) बहुलक = 3 माध्यक - 2 माध्य (Mode = 3 Median - 2 Mean)।",
        "correct": 0
      },
      "english": {
        "q": "Empirical relationship connecting Mean, Median, and Mode:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) बहुलक = 3 माध्यक - 2 माध्य",
          "B) बहुलक = 2 माध्यक - 3 माध्य",
          "C) 3 माध्य = बहुलक + माध्यक",
          "D) माध्यक = Mode - Mean"
        ],
        "ans": "A) बहुलक = 3 माध्यक - 2 माध्य",
        "exp": "💡 सही उत्तर: A) बहुलक = 3 माध्यक - 2 माध्य (Mode = 3 Median - 2 Mean)।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Probability / प्रायिकता",
    "loc": {
      "bilingual-hindi": {
        "q": "किसी निश्चित घटना (Sure Event) की प्रायिकता (P) का मान कितना होता है?",
        "sub": "Probability of a sure / certain event is:",
        "options": [
          "A) 0",
          "B) 0.5",
          "C) 1",
          "D) -1"
        ],
        "ans": "C) 1",
        "exp": "💡 सही उत्तर: C) 1। निश्चित घटना की प्रायिकता सदैव 1 होती है तथा असंभव घटना की प्रायिकता 0 होती है।",
        "correct": 2
      },
      "english": {
        "q": "Probability of a sure / certain event is:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 0",
          "B) 0.5",
          "C) 1",
          "D) -1"
        ],
        "ans": "C) 1",
        "exp": "💡 सही उत्तर: C) 1। निश्चित घटना की प्रायिकता सदैव 1 होती है तथा असंभव घटना की प्रायिकता 0 होती है।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Real Numbers / वास्तविक संख्याएँ",
    "loc": {
      "bilingual-hindi": {
        "q": "यदि दो संख्याओं का म०स० (HCF) 6 तथा ल०स० (LCM) 36 है, और एक संख्या 12 है, तो दूसरी संख्या क्या होगी?",
        "sub": "If HCF = 6, LCM = 36, and first number = 12, find the second number:",
        "options": [
          "A) 18",
          "B) 24",
          "C) 36",
          "D) 15"
        ],
        "ans": "A) 18",
        "exp": "💡 सही उत्तर: A) 18। सूत्र: पहली संख्या × दूसरी संख्या = HCF × LCM => 12 × x = 6 × 36 = 216 => x = 216 / 12 = 18।",
        "correct": 0
      },
      "english": {
        "q": "If HCF = 6, LCM = 36, and first number = 12, find the second number:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 18",
          "B) 24",
          "C) 36",
          "D) 15"
        ],
        "ans": "A) 18",
        "exp": "💡 सही उत्तर: A) 18। सूत्र: पहली संख्या × दूसरी संख्या = HCF × LCM => 12 × x = 6 × 36 = 216 => x = 216 / 12 = 18।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Linear Equations / दो चरों वाले रैखिक समीकरण",
    "loc": {
      "bilingual-hindi": {
        "q": "समीकरण निकाय a₁x + b₁y + c₁ = 0 और a₂x + b₂y + c₂ = 0 का एक अद्वितीय हल (Unique Solution) होने की शर्त क्या है?",
        "sub": "Condition for a unique solution in a system of linear equations:",
        "options": [
          "A) a₁/a₂ ≠ b₁/b₂",
          "B) a₁/a₂ = b₁/b₂ = c₁/c₂",
          "C) a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
          "D) a₁a₂ = b₁b₂"
        ],
        "ans": "A) a₁/a₂ ≠ b₁/b₂",
        "exp": "💡 सही उत्तर: A) a₁/a₂ ≠ b₁/b₂। जब दोनों रेखाओं के गुणांकों का अनुपात असमान होता है, तो रेखाएँ प्रतिच्छेदी होती हैं और अद्वितीय हल होता है।",
        "correct": 0
      },
      "english": {
        "q": "Condition for a unique solution in a system of linear equations:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) a₁/a₂ ≠ b₁/b₂",
          "B) a₁/a₂ = b₁/b₂ = c₁/c₂",
          "C) a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
          "D) a₁a₂ = b₁b₂"
        ],
        "ans": "A) a₁/a₂ ≠ b₁/b₂",
        "exp": "💡 सही उत्तर: A) a₁/a₂ ≠ b₁/b₂। जब दोनों रेखाओं के गुणांकों का अनुपात असमान होता है, तो रेखाएँ प्रतिच्छेदी होती हैं और अद्वितीय हल होता है।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Surface Area & Volume / पृष्ठीय क्षेत्रफल एवं आयतन",
    "loc": {
      "bilingual-hindi": {
        "q": "त्रिज्या 'r' तथा तिर्यक ऊँचाई 'l' वाले लम्ब वृत्तीय शंकु (Cone) का वक्र पृष्ठीय क्षेत्रफल क्या है?",
        "sub": "Curved surface area of a right circular cone of radius 'r' and slant height 'l':",
        "options": [
          "A) 2πrh",
          "B) πrl",
          "C) πr²h",
          "D) 2πr(r+h)"
        ],
        "ans": "B) πrl",
        "exp": "💡 सही उत्तर: B) πrl। शंकु का वक्र पृष्ठीय क्षेत्रफल πrl होता है, जहाँ l = √(r² + h²)।",
        "correct": 1
      },
      "english": {
        "q": "Curved surface area of a right circular cone of radius 'r' and slant height 'l':",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 2πrh",
          "B) πrl",
          "C) πr²h",
          "D) 2πr(r+h)"
        ],
        "ans": "B) πrl",
        "exp": "💡 सही उत्तर: B) πrl। शंकु का वक्र पृष्ठीय क्षेत्रफल πrl होता है, जहाँ l = √(r² + h²)।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Trigonometry / विशिष्ट कोणों के त्रिकोणमितीय मान",
    "loc": {
      "bilingual-hindi": {
        "q": "(sin 30° + cos 60°) का मान कितना होगा?",
        "sub": "Evaluate (sin 30° + cos 60°):",
        "options": [
          "A) 1/2",
          "B) 1",
          "C) √3/2",
          "D) 0"
        ],
        "ans": "B) 1",
        "exp": "💡 सही उत्तर: B) 1। sin 30° = 1/2 और cos 60° = 1/2। अतः sin 30° + cos 60° = 1/2 + 1/2 = 1।",
        "correct": 1
      },
      "english": {
        "q": "Evaluate (sin 30° + cos 60°):",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 1/2",
          "B) 1",
          "C) √3/2",
          "D) 0"
        ],
        "ans": "B) 1",
        "exp": "💡 सही उत्तर: B) 1। sin 30° = 1/2 और cos 60° = 1/2। अतः sin 30° + cos 60° = 1/2 + 1/2 = 1।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Triangles / त्रिभुज (थेल्स प्रमेय)",
    "loc": {
      "bilingual-hindi": {
        "q": "थेल्स प्रमेय (आधारभूत आनुपातिकता प्रमेय) के अनुसार, यदि DE || BC हो तो:",
        "sub": "According to Thales Theorem (Basic Proportionality Theorem), if DE || BC, then:",
        "options": [
          "A) AD / DB = AE / EC",
          "B) AD × DB = AE × EC",
          "C) AD + DB = AE + EC",
          "D) AB = AC"
        ],
        "ans": "A) AD / DB = AE / EC",
        "exp": "💡 सही उत्तर: A) AD / DB = AE / EC। त्रिभुज की एक भुजा के समान्तर खींची गई रेखा अन्य दो भुजाओं को समान अनुपात में विभाजित करती है।",
        "correct": 0
      },
      "english": {
        "q": "According to Thales Theorem (Basic Proportionality Theorem), if DE || BC, then:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) AD / DB = AE / EC",
          "B) AD × DB = AE × EC",
          "C) AD + DB = AE + EC",
          "D) AB = AC"
        ],
        "ans": "A) AD / DB = AE / EC",
        "exp": "💡 सही उत्तर: A) AD / DB = AE / EC। त्रिभुज की एक भुजा के समान्तर खींची गई रेखा अन्य दो भुजाओं को समान अनुपात में विभाजित करती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Quadratic Equations / मूलों का योग व गुणनफल",
    "loc": {
      "bilingual-hindi": {
        "q": "द्विघात समीकरण 2x² - 8x + 6 = 0 के मूलों का योगफल (Sum of Roots) क्या होगा?",
        "sub": "Find the sum of roots for the quadratic equation 2x² - 8x + 6 = 0:",
        "options": [
          "A) 3",
          "B) 4",
          "C) -4",
          "D) 2"
        ],
        "ans": "B) 4",
        "exp": "💡 सही उत्तर: B) 4। मूलों का योग = -b / a = -(-8) / 2 = 8 / 2 = 4।",
        "correct": 1
      },
      "english": {
        "q": "Find the sum of roots for the quadratic equation 2x² - 8x + 6 = 0:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) 3",
          "B) 4",
          "C) -4",
          "D) 2"
        ],
        "ans": "B) 4",
        "exp": "💡 सही उत्तर: B) 4। मूलों का योग = -b / a = -(-8) / 2 = 8 / 2 = 4।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Coordinate Geometry / मध्य बिंदु सूत्र",
    "loc": {
      "bilingual-hindi": {
        "q": "बिन्दुओं (2, 8) और (6, 4) को मिलाने वाले रेखाखण्ड के मध्य-बिंदु के निर्देशांक क्या होंगे?",
        "sub": "Midpoint coordinates connecting (2, 8) and (6, 4):",
        "options": [
          "A) (4, 6)",
          "B) (3, 6)",
          "C) (8, 12)",
          "D) (4, 4)"
        ],
        "ans": "A) (4, 6)",
        "exp": "💡 सही उत्तर: A) (4, 6)। मध्य-बिंदु सूत्र: ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+6)/2, (8+4)/2) = (8/2, 12/2) = (4, 6)।",
        "correct": 0
      },
      "english": {
        "q": "Midpoint coordinates connecting (2, 8) and (6, 4):",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) (4, 6)",
          "B) (3, 6)",
          "C) (8, 12)",
          "D) (4, 4)"
        ],
        "ans": "A) (4, 6)",
        "exp": "💡 सही उत्तर: A) (4, 6)। मध्य-बिंदु सूत्र: ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+6)/2, (8+4)/2) = (8/2, 12/2) = (4, 6)।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "math",
    "topic": "Arithmetic Progressions / प्रथम n पदों का योग",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रथम n प्राकृत संख्याओं (Natural Numbers: 1, 2, 3, ... n) का योगफल ज्ञात करने का सूत्र क्या है?",
        "sub": "Formula for the sum of first n natural numbers:",
        "options": [
          "A) n(n+1) / 2",
          "B) n²",
          "C) n(n-1) / 2",
          "D) 2n + 1"
        ],
        "ans": "A) n(n+1) / 2",
        "exp": "💡 सही उत्तर: A) n(n+1) / 2। गणितीय आगमन व AP के सूत्र S_n = n/2 [1 + n] से प्रथम n प्राकृत संख्याओं का योग n(n+1)/2 होता है।",
        "correct": 0
      },
      "english": {
        "q": "Formula for the sum of first n natural numbers:",
        "sub": "Class 10th MATH - Official Syllabus Target",
        "options": [
          "A) n(n+1) / 2",
          "B) n²",
          "C) n(n-1) / 2",
          "D) 2n + 1"
        ],
        "ans": "A) n(n+1) / 2",
        "exp": "💡 सही उत्तर: A) n(n+1) / 2। गणितीय आगमन व AP के सूत्र S_n = n/2 [1 + n] से प्रथम n प्राकृत संख्याओं का योग n(n+1)/2 होता है।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Optics / प्रकाश का परावर्तन एवं अपवर्तन",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?",
        "sub": "In which medium is the speed of light maximum?",
        "options": [
          "A) कांच (Glass)",
          "B) जल (Water)",
          "C) निर्वात (Vacuum - 3×10⁸ m/s)",
          "D) हीरा (Diamond)"
        ],
        "ans": "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        "exp": "💡 सही उत्तर: C) निर्वात। निर्वात का अपवर्तनांक न्यूनतम (1.0) होता है, अतः प्रकाश 3 × 10⁸ m/s की अधिकतम चाल से गमन करता है।",
        "correct": 2
      },
      "english": {
        "q": "In which medium is the speed of light maximum?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) कांच (Glass)",
          "B) जल (Water)",
          "C) निर्वात (Vacuum - 3×10⁸ m/s)",
          "D) हीरा (Diamond)"
        ],
        "ans": "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        "exp": "💡 सही उत्तर: C) निर्वात। निर्वात का अपवर्तनांक न्यूनतम (1.0) होता है, अतः प्रकाश 3 × 10⁸ m/s की अधिकतम चाल से गमन करता है।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Electricity / विद्युत धारा का ऊष्मीय प्रभाव",
    "loc": {
      "bilingual-hindi": {
        "q": "विद्युत ऊर्जा की व्यावसायिक इकाई (Commercial Unit) '1 यूनिट' (1 kWh) कितने जूल के बराबर होती है?",
        "sub": "1 kilowatt-hour (1 kWh) of electrical energy is equal to how many Joules?",
        "options": [
          "A) 3.6 × 10⁶ J",
          "B) 3.6 × 10⁵ J",
          "C) 1000 J",
          "D) 3600 J"
        ],
        "ans": "A) 3.6 × 10⁶ J",
        "exp": "💡 सही उत्तर: A) 3.6 × 10⁶ J। 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ वाट-सेकंड (जूल)।",
        "correct": 0
      },
      "english": {
        "q": "1 kilowatt-hour (1 kWh) of electrical energy is equal to how many Joules?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) 3.6 × 10⁶ J",
          "B) 3.6 × 10⁵ J",
          "C) 1000 J",
          "D) 3600 J"
        ],
        "ans": "A) 3.6 × 10⁶ J",
        "exp": "💡 सही उत्तर: A) 3.6 × 10⁶ J। 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ वाट-सेकंड (जूल)।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Acids, Bases & Salts / अम्ल, क्षार एवं लवण",
    "loc": {
      "bilingual-hindi": {
        "q": "अम्लीय वर्षा (Acid Rain) के जल का pH मान सामान्यतः कितना होता है?",
        "sub": "The pH value of acid rain is typically:",
        "options": [
          "A) 7.0 से अधिक",
          "B) 5.6 से कम",
          "C) ठीक 7.0",
          "D) 8.5"
        ],
        "ans": "B) 5.6 से कम",
        "exp": "💡 सही उत्तर: B) 5.6 से कम। जब वर्षा के जल का pH मान 5.6 से कम हो जाता है, तो उसे अम्लीय वर्षा कहते हैं।",
        "correct": 1
      },
      "english": {
        "q": "The pH value of acid rain is typically:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) 7.0 से अधिक",
          "B) 5.6 से कम",
          "C) ठीक 7.0",
          "D) 8.5"
        ],
        "ans": "B) 5.6 से कम",
        "exp": "💡 सही उत्तर: B) 5.6 से कम। जब वर्षा के जल का pH मान 5.6 से कम हो जाता है, तो उसे अम्लीय वर्षा कहते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Life Processes / जैव प्रक्रम - उत्सर्जन तंत्र",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव वृक्क (Kidney) की संरचनात्मक एवं कार्यात्मक निस्यंदन इकाई क्या कहलाती है?",
        "sub": "The structural and functional filtration unit of the human kidney is:",
        "options": [
          "A) न्यूरॉन",
          "B) नेफ्रॉन (Nephron / वृक्काणु)",
          "C) कूपिका (Alveoli)",
          "D) विली"
        ],
        "ans": "B) नेफ्रॉन (Nephron / वृक्काणु)",
        "exp": "💡 सही उत्तर: B) नेफ्रॉन। वृक्क में रक्त से यूरिया व अपशिष्ट पदार्थों को छानने की मूल इकाई नेफ्रॉन है।",
        "correct": 1
      },
      "english": {
        "q": "The structural and functional filtration unit of the human kidney is:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) न्यूरॉन",
          "B) नेफ्रॉन (Nephron / वृक्काणु)",
          "C) कूपिका (Alveoli)",
          "D) विली"
        ],
        "ans": "B) नेफ्रॉन (Nephron / वृक्काणु)",
        "exp": "💡 सही उत्तर: B) नेफ्रॉन। वृक्क में रक्त से यूरिया व अपशिष्ट पदार्थों को छानने की मूल इकाई नेफ्रॉन है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Carbon & its Compounds / कार्बन एवं उसके यौगिक",
    "loc": {
      "bilingual-hindi": {
        "q": "एल्केन (Alkane - संतृप्त हाइड्रोकार्बन) का सामान्य आण्विक सूत्र क्या होता है?",
        "sub": "General molecular formula for Alkanes (saturated hydrocarbons):",
        "options": [
          "A) C_n H_2n",
          "B) C_n H_2n+2",
          "C) C_n H_2n-2",
          "D) C_n H_n"
        ],
        "ans": "B) C_n H_2n+2",
        "exp": "💡 सही उत्तर: B) C_n H_2n+2। मीथेन (CH₄), ईथेन (C₂H₆) आदि एल्केन श्रेणी के सदस्य हैं।",
        "correct": 1
      },
      "english": {
        "q": "General molecular formula for Alkanes (saturated hydrocarbons):",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) C_n H_2n",
          "B) C_n H_2n+2",
          "C) C_n H_2n-2",
          "D) C_n H_n"
        ],
        "ans": "B) C_n H_2n+2",
        "exp": "💡 सही उत्तर: B) C_n H_2n+2। मीथेन (CH₄), ईथेन (C₂H₆) आदि एल्केन श्रेणी के सदस्य हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Optics / लेंस की क्षमता",
    "loc": {
      "bilingual-hindi": {
        "q": "किसी 50 cm फोकस दूरी वाले उत्तल लेंस की क्षमता (Power of Lens) कितनी होगी?",
        "sub": "Power of a convex lens having a focal length of +50 cm is:",
        "options": [
          "A) +2 D",
          "B) -2 D",
          "C) +0.5 D",
          "D) +5 D"
        ],
        "ans": "A) +2 D",
        "exp": "💡 सही उत्तर: A) +2 D। लेंस की क्षमता P = 1 / f(मीटर में) = 1 / 0.5 m = +2 डाइऑप्टर (D)।",
        "correct": 0
      },
      "english": {
        "q": "Power of a convex lens having a focal length of +50 cm is:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) +2 D",
          "B) -2 D",
          "C) +0.5 D",
          "D) +5 D"
        ],
        "ans": "A) +2 D",
        "exp": "💡 सही उत्तर: A) +2 D। लेंस की क्षमता P = 1 / f(मीटर में) = 1 / 0.5 m = +2 डाइऑप्टर (D)।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Chemical Reactions / रासायनिक अभिक्रियाएँ",
    "loc": {
      "bilingual-hindi": {
        "q": "लोहे पर जंग लगना (Rusting of Iron) किस प्रकार की रासायनिक अभिक्रिया का उदाहरण है?",
        "sub": "Rusting of iron in moist air is an example of:",
        "options": [
          "A) केवल अपचयन",
          "B) संक्षारण एवं रेडॉक्स (उपचयन-अपचयन) अभिक्रिया",
          "C) प्रकाश-रासायनिक",
          "D) प्रतिस्थापन"
        ],
        "ans": "B) संक्षारण एवं रेडॉक्स (उपचयन-अपचयन) अभिक्रिया",
        "exp": "💡 सही उत्तर: B। नमी व ऑक्सीजन की उपस्थिति में लोहे का ऑक्सीकरण होकर जलयोजित फैरिक ऑक्साइड (Fe₂O₃·xH₂O) बनता है।",
        "correct": 1
      },
      "english": {
        "q": "Rusting of iron in moist air is an example of:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) केवल अपचयन",
          "B) संक्षारण एवं रेडॉक्स (उपचयन-अपचयन) अभिक्रिया",
          "C) प्रकाश-रासायनिक",
          "D) प्रतिस्थापन"
        ],
        "ans": "B) संक्षारण एवं रेडॉक्स (उपचयन-अपचयन) अभिक्रिया",
        "exp": "💡 सही उत्तर: B। नमी व ऑक्सीजन की उपस्थिति में लोहे का ऑक्सीकरण होकर जलयोजित फैरिक ऑक्साइड (Fe₂O₃·xH₂O) बनता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Life Processes / परिसंचरण तंत्र",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव हृदय में कितने कोष्ठ (Chambers) पाए जाते हैं?",
        "sub": "How many chambers are present in the human heart?",
        "options": [
          "A) 2 कोष्ठ",
          "B) 3 कोष्ठ",
          "C) 4 कोष्ठ (दो अलिंद एवं दो निलय)",
          "D) 6 कोष्ठ"
        ],
        "ans": "C) 4 कोष्ठ (दो अलिंद एवं दो निलय)",
        "exp": "💡 सही उत्तर: C) 4 कोष्ठ। मानव हृदय में दो ऊपरी अलिंद (Atria) तथा दो निचले निलय (Ventricles) होते हैं जो दोहरे परिसंचरण को सुगम बनाते हैं।",
        "correct": 2
      },
      "english": {
        "q": "How many chambers are present in the human heart?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) 2 कोष्ठ",
          "B) 3 कोष्ठ",
          "C) 4 कोष्ठ (दो अलिंद एवं दो निलय)",
          "D) 6 कोष्ठ"
        ],
        "ans": "C) 4 कोष्ठ (दो अलिंद एवं दो निलय)",
        "exp": "💡 सही उत्तर: C) 4 कोष्ठ। मानव हृदय में दो ऊपरी अलिंद (Atria) तथा दो निचले निलय (Ventricles) होते हैं जो दोहरे परिसंचरण को सुगम बनाते हैं।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Metals & Non-metals / धातु एवं अधातु",
    "loc": {
      "bilingual-hindi": {
        "q": "कमरे के ताप पर द्रव अवस्था में पाई जाने वाली एकमात्र धातु कौन सी है?",
        "sub": "Which metal exists in liquid state at normal room temperature?",
        "options": [
          "A) ब्रोमीन",
          "B) पारा / मरकरी (Hg)",
          "C) सोडियम",
          "D) सीसा (Lead)"
        ],
        "ans": "B) पारा / मरकरी (Hg)",
        "exp": "💡 सही उत्तर: B) पारा (Hg)। पारा एकमात्र धातु है जो कमरे के ताप (25°C) पर द्रव अवस्था में रहती है। (ब्रोमीन अधातु है)।",
        "correct": 1
      },
      "english": {
        "q": "Which metal exists in liquid state at normal room temperature?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) ब्रोमीन",
          "B) पारा / मरकरी (Hg)",
          "C) सोडियम",
          "D) सीसा (Lead)"
        ],
        "ans": "B) पारा / मरकरी (Hg)",
        "exp": "💡 सही उत्तर: B) पारा (Hg)। पारा एकमात्र धातु है जो कमरे के ताप (25°C) पर द्रव अवस्था में रहती है। (ब्रोमीन अधातु है)।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Control & Coordination / नियंत्रण एवं समन्वय",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव शरीर में आपातकालीन हॉर्मोन (Emergency Hormone / Fight or Flight) किसे कहा जाता है?",
        "sub": "Which hormone is known as the emergency 'Fight or Flight' hormone?",
        "options": [
          "A) इंसुलिन",
          "B) थायरॉक्सिन",
          "C) एड्रीनेलिन (Adrenaline)",
          "D) वृद्धि हॉर्मोन"
        ],
        "ans": "C) एड्रीनेलिन (Adrenaline)",
        "exp": "💡 सही उत्तर: C) एड्रीनेलिन। अधिवृक्क ग्रंथि (Adrenal Gland) से स्रावित यह हॉर्मोन संकट की स्थिति में हृदय गति व रक्तचाप बढ़ाता है।",
        "correct": 2
      },
      "english": {
        "q": "Which hormone is known as the emergency 'Fight or Flight' hormone?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) इंसुलिन",
          "B) थायरॉक्सिन",
          "C) एड्रीनेलिन (Adrenaline)",
          "D) वृद्धि हॉर्मोन"
        ],
        "ans": "C) एड्रीनेलिन (Adrenaline)",
        "exp": "💡 सही उत्तर: C) एड्रीनेलिन। अधिवृक्क ग्रंथि (Adrenal Gland) से स्रावित यह हॉर्मोन संकट की स्थिति में हृदय गति व रक्तचाप बढ़ाता है।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Heredity / आनुवंशिकता - मेण्डल के प्रयोग",
    "loc": {
      "bilingual-hindi": {
        "q": "मेण्डल के एकसंकर संकरण (Monohybrid Cross) की F₂ पीढ़ी में लक्षणप्ररूपी अनुपात (Phenotypic Ratio) क्या था?",
        "sub": "Phenotypic ratio in F₂ generation of Mendel's monohybrid cross:",
        "options": [
          "A) 1 : 2 : 1",
          "B) 3 : 1 (3 लम्बे : 1 बौना)",
          "C) 9 : 3 : 3 : 1",
          "D) 2 : 1"
        ],
        "ans": "B) 3 : 1 (3 लम्बे : 1 बौना)",
        "exp": "💡 सही उत्तर: B) 3 : 1। दृश्य रूप से 75% पौधे लम्बे तथा 25% बौने प्राप्त हुए, जबकि जीनोटाइप अनुपात 1:2:1 था।",
        "correct": 1
      },
      "english": {
        "q": "Phenotypic ratio in F₂ generation of Mendel's monohybrid cross:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) 1 : 2 : 1",
          "B) 3 : 1 (3 लम्बे : 1 बौना)",
          "C) 9 : 3 : 3 : 1",
          "D) 2 : 1"
        ],
        "ans": "B) 3 : 1 (3 लम्बे : 1 बौना)",
        "exp": "💡 सही उत्तर: B) 3 : 1। दृश्य रूप से 75% पौधे लम्बे तथा 25% बौने प्राप्त हुए, जबकि जीनोटाइप अनुपात 1:2:1 था।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Magnetic Effects / विद्युत धारा के चुंबकीय प्रभाव",
    "loc": {
      "bilingual-hindi": {
        "q": "विद्युत मोटर (Electric Motor) किस नियम पर कार्य करती है?",
        "sub": "An electric motor works on the principle of:",
        "options": [
          "A) फ्लेमिंग के बाएँ हाथ का नियम (Left Hand Rule)",
          "B) फ्लेमिंग के दाएँ हाथ का नियम",
          "C) फैराडे का नियम",
          "D) पास्कल का नियम"
        ],
        "ans": "A) फ्लेमिंग के बाएँ हाथ का नियम (Left Hand Rule)",
        "exp": "💡 सही उत्तर: A) फ्लेमिंग के बाएँ हाथ का नियम। चुंबकीय क्षेत्र में रखी धारावाही कुंडली पर लगने वाले बल की दिशा फ्लेमिंग के वामहस्त नियम से ज्ञात होती है।",
        "correct": 0
      },
      "english": {
        "q": "An electric motor works on the principle of:",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) फ्लेमिंग के बाएँ हाथ का नियम (Left Hand Rule)",
          "B) फ्लेमिंग के दाएँ हाथ का नियम",
          "C) फैराडे का नियम",
          "D) पास्कल का नियम"
        ],
        "ans": "A) फ्लेमिंग के बाएँ हाथ का नियम (Left Hand Rule)",
        "exp": "💡 सही उत्तर: A) फ्लेमिंग के बाएँ हाथ का नियम। चुंबकीय क्षेत्र में रखी धारावाही कुंडली पर लगने वाले बल की दिशा फ्लेमिंग के वामहस्त नियम से ज्ञात होती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Environment / हमारा पर्यावरण - खाद्य श्रृंखला",
    "loc": {
      "bilingual-hindi": {
        "q": "खाद्य श्रृंखला में एक पोषी स्तर से अगले पोषी स्तर तक कितने प्रतिशत ऊर्जा का स्थानांतरण होता है?",
        "sub": "According to Lindeman's 10% law, what percentage of energy is transferred to the next trophic level?",
        "options": [
          "A) 1%",
          "B) 10%",
          "C) 50%",
          "D) 90%"
        ],
        "ans": "B) 10%",
        "exp": "💡 सही उत्तर: B) 10%। लिण्डमान के 10% नियम के अनुसार प्रत्येक पोषी स्तर पर केवल 10% ऊर्जा ही अगले स्तर को स्थानांतरित होती है।",
        "correct": 1
      },
      "english": {
        "q": "According to Lindeman's 10% law, what percentage of energy is transferred to the next trophic level?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) 1%",
          "B) 10%",
          "C) 50%",
          "D) 90%"
        ],
        "ans": "B) 10%",
        "exp": "💡 सही उत्तर: B) 10%। लिण्डमान के 10% नियम के अनुसार प्रत्येक पोषी स्तर पर केवल 10% ऊर्जा ही अगले स्तर को स्थानांतरित होती है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Chemical Reactions / विस्थापन अभिक्रिया",
    "loc": {
      "bilingual-hindi": {
        "q": "जब लोहे की कील को कॉपर सल्फेट (CuSO₄) के नीले विलयन में डुबोया जाता है, तो विलयन का रंग हल्का हरा क्यों हो जाता है?",
        "sub": "Why does blue CuSO₄ solution turn light green on dipping an iron nail?",
        "options": [
          "A) फेरस सल्फेट (FeSO₄) बनने के कारण (विस्थापन अभिक्रिया)",
          "B) कॉपर वाष्पीकृत होने के कारण",
          "C) जंग लगने से",
          "D) अवक्षेपण से"
        ],
        "ans": "A) फेरस सल्फेट (FeSO₄) बनने के कारण (विस्थापन अभिक्रिया)",
        "exp": "💡 सही उत्तर: A। लोहा, तांबे से अधिक क्रियाशील होने के कारण कॉपर को विस्थापित कर हरा FeSO₄ बना देता है: Fe + CuSO₄ → FeSO₄ + Cu।",
        "correct": 0
      },
      "english": {
        "q": "Why does blue CuSO₄ solution turn light green on dipping an iron nail?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) फेरस सल्फेट (FeSO₄) बनने के कारण (विस्थापन अभिक्रिया)",
          "B) कॉपर वाष्पीकृत होने के कारण",
          "C) जंग लगने से",
          "D) अवक्षेपण से"
        ],
        "ans": "A) फेरस सल्फेट (FeSO₄) बनने के कारण (विस्थापन अभिक्रिया)",
        "exp": "💡 सही उत्तर: A। लोहा, तांबे से अधिक क्रियाशील होने के कारण कॉपर को विस्थापित कर हरा FeSO₄ बना देता है: Fe + CuSO₄ → FeSO₄ + Cu।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "science",
    "topic": "Human Eye / मानव नेत्र एवं दृष्टि दोष",
    "loc": {
      "bilingual-hindi": {
        "q": "निकट दृष्टि दोष (Myopia) के निवारण के लिए किस प्रकार के लेंस का चश्मा प्रयोग किया जाता है?",
        "sub": "Which lens is prescribed to correct Myopia (near-sightedness)?",
        "options": [
          "A) उत्तल लेंस (Convex Lens)",
          "B) अवतल लेंस (Concave Lens)",
          "C) द्विफोकसी लेंस",
          "D) बेलनाकार लेंस"
        ],
        "ans": "B) अवतल लेंस (Concave Lens)",
        "exp": "💡 सही उत्तर: B) अवतल लेंस। निकट दृष्टि दोष में दूर की वस्तु का प्रतिबिम्ब रेटिना से पहले बन जाता है, जिसे अवतल लेंस द्वारा रेटिना पर केंद्रित किया जाता है।",
        "correct": 1
      },
      "english": {
        "q": "Which lens is prescribed to correct Myopia (near-sightedness)?",
        "sub": "Class 10th SCIENCE - Official Syllabus Target",
        "options": [
          "A) उत्तल लेंस (Convex Lens)",
          "B) अवतल लेंस (Concave Lens)",
          "C) द्विफोकसी लेंस",
          "D) बेलनाकार लेंस"
        ],
        "ans": "B) अवतल लेंस (Concave Lens)",
        "exp": "💡 सही उत्तर: B) अवतल लेंस। निकट दृष्टि दोष में दूर की वस्तु का प्रतिबिम्ब रेटिना से पहले बन जाता है, जिसे अवतल लेंस द्वारा रेटिना पर केंद्रित किया जाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Sandhi / सन्धि प्रकरण",
    "loc": {
      "bilingual-hindi": {
        "q": "'पवन' शब्द का सही सन्धि-विच्छेद क्या होगा?",
        "sub": "Correct Sandhi-Vichhed of 'Pawan':",
        "options": [
          "A) प + वन",
          "B) पो + अन (अयादि सन्धि)",
          "C) पौ + अन",
          "D) पा + अन"
        ],
        "ans": "B) पो + अन (अयादि सन्धि)",
        "exp": "💡 सही उत्तर: B) पो + अन। अयादि सन्धि में 'ओ' का मेल किसी भिन्न स्वर से होने पर 'अव्' बनता है: पो + अन = पवन।",
        "correct": 1
      },
      "english": {
        "q": "Correct Sandhi-Vichhed of 'Pawan':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) प + वन",
          "B) पो + अन (अयादि सन्धि)",
          "C) पौ + अन",
          "D) पा + अन"
        ],
        "ans": "B) पो + अन (अयादि सन्धि)",
        "exp": "💡 सही उत्तर: B) पो + अन। अयादि सन्धि में 'ओ' का मेल किसी भिन्न स्वर से होने पर 'अव्' बनता है: पो + अन = पवन।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Samas / समास प्रकरण",
    "loc": {
      "bilingual-hindi": {
        "q": "'यथाशक्ति' (शक्ति के अनुसार) में कौन सा समास है?",
        "sub": "Identify the Samas in 'Yathashakti':",
        "options": [
          "A) तत्पुरुष समास",
          "B) अव्ययीभाव समास",
          "C) कर्मधारय समास",
          "D) बहुव्रीहि समास"
        ],
        "ans": "B) अव्ययीभाव समास",
        "exp": "💡 सही उत्तर: B) अव्ययीभाव समास। जिस सामासिक पद का पूर्व पद प्रधान और अव्यय (यथा) हो, उसे अव्ययीभाव समास कहते हैं।",
        "correct": 1
      },
      "english": {
        "q": "Identify the Samas in 'Yathashakti':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) तत्पुरुष समास",
          "B) अव्ययीभाव समास",
          "C) कर्मधारय समास",
          "D) बहुव्रीहि समास"
        ],
        "ans": "B) अव्ययीभाव समास",
        "exp": "💡 सही उत्तर: B) अव्ययीभाव समास। जिस सामासिक पद का पूर्व पद प्रधान और अव्यय (यथा) हो, उसे अव्ययीभाव समास कहते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Muhavare / मुहावरे एवं लोकोक्तियाँ",
    "loc": {
      "bilingual-hindi": {
        "q": "'आँखों का तारा होना' मुहावरे का सही अर्थ क्या है?",
        "sub": "Meaning of Hindi idiom 'Aankhon Ka Tara':",
        "options": [
          "A) अत्यधिक प्रिय होना",
          "B) रात में जागना",
          "C) आँखों में चमक होना",
          "D) घमंडी होना"
        ],
        "ans": "A) अत्यधिक प्रिय होना",
        "exp": "💡 सही उत्तर: A) अत्यधिक प्रिय होना। जैसे- श्रवण कुमार अपने माता-पिता की आँखों का तारा थे।",
        "correct": 0
      },
      "english": {
        "q": "Meaning of Hindi idiom 'Aankhon Ka Tara':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) अत्यधिक प्रिय होना",
          "B) रात में जागना",
          "C) आँखों में चमक होना",
          "D) घमंडी होना"
        ],
        "ans": "A) अत्यधिक प्रिय होना",
        "exp": "💡 सही उत्तर: A) अत्यधिक प्रिय होना। जैसे- श्रवण कुमार अपने माता-पिता की आँखों का तारा थे।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Alankar / काव्य सौंदर्य - अलंकार",
    "loc": {
      "bilingual-hindi": {
        "q": "'तरनि तनूजा तट तमाल तरुवर बहु छाए' में 'त' वर्ण की बार-बार आवृत्ति होने से कौन सा अलंकार है?",
        "sub": "Identify the Alankar where consonant 'T' is repeated:",
        "options": [
          "A) यमक अलंकार",
          "B) अनुप्रास अलंकार",
          "C) श्लेष अलंकार",
          "D) रूपक अलंकार"
        ],
        "ans": "B) अनुप्रास अलंकार",
        "exp": "💡 सही उत्तर: B) अनुप्रास अलंकार। जहाँ एक ही वर्ण की आवृत्ति एक से अधिक बार होती है, वहाँ अनुप्रास अलंकार होता है।",
        "correct": 1
      },
      "english": {
        "q": "Identify the Alankar where consonant 'T' is repeated:",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) यमक अलंकार",
          "B) अनुप्रास अलंकार",
          "C) श्लेष अलंकार",
          "D) रूपक अलंकार"
        ],
        "ans": "B) अनुप्रास अलंकार",
        "exp": "💡 सही उत्तर: B) अनुप्रास अलंकार। जहाँ एक ही वर्ण की आवृत्ति एक से अधिक बार होती है, वहाँ अनुप्रास अलंकार होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Ras / रस सिद्धान्त",
    "loc": {
      "bilingual-hindi": {
        "q": "'वीर रस' का स्थायी भाव क्या होता है?",
        "sub": "What is the Sthayi Bhava (permanent emotion) of Veer Rasa?",
        "options": [
          "A) रति",
          "B) उत्साह",
          "C) क्रोध",
          "D) शोक"
        ],
        "ans": "B) उत्साह",
        "exp": "💡 सही उत्तर: B) उत्साह। युद्ध अथवा कठिन कार्यों के प्रति मन में उत्पन्न उमंग और जोश 'उत्साह' कहलाता है, जो वीर रस का स्थायी भाव है।",
        "correct": 1
      },
      "english": {
        "q": "What is the Sthayi Bhava (permanent emotion) of Veer Rasa?",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) रति",
          "B) उत्साह",
          "C) क्रोध",
          "D) शोक"
        ],
        "ans": "B) उत्साह",
        "exp": "💡 सही उत्तर: B) उत्साह। युद्ध अथवा कठिन कार्यों के प्रति मन में उत्पन्न उमंग और जोश 'उत्साह' कहलाता है, जो वीर रस का स्थायी भाव है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Vilom Shabd / विलोम शब्द",
    "loc": {
      "bilingual-hindi": {
        "q": "'उत्कर्ष' शब्द का विलोम शब्द क्या होगा?",
        "sub": "Antonym of Hindi word 'Utkarsh':",
        "options": [
          "A) अपकर्ष",
          "B) निष्कर्ष",
          "C) विकर्ष",
          "D) आकर्ष"
        ],
        "ans": "A) अपकर्ष",
        "exp": "💡 सही उत्तर: A) अपकर्ष। उत्कर्ष का अर्थ उन्नति होता है और इसका सटीक विलोम अपकर्ष (अवनति) है।",
        "correct": 0
      },
      "english": {
        "q": "Antonym of Hindi word 'Utkarsh':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) अपकर्ष",
          "B) निष्कर्ष",
          "C) विकर्ष",
          "D) आकर्ष"
        ],
        "ans": "A) अपकर्ष",
        "exp": "💡 सही उत्तर: A) अपकर्ष। उत्कर्ष का अर्थ उन्नति होता है और इसका सटीक विलोम अपकर्ष (अवनति) है।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Paryayvachi / पर्यायवाची शब्द",
    "loc": {
      "bilingual-hindi": {
        "q": "निम्नलिखित में से कौन सा शब्द 'कमल' का पर्यायवाची नहीं है?",
        "sub": "Which word is NOT a synonym of Lotus (Kamal)?",
        "options": [
          "A) जलज",
          "B) पंकज",
          "C) वारिद (बादल)",
          "D) राजीव"
        ],
        "ans": "C) वारिद (बादल)",
        "exp": "💡 सही उत्तर: C) वारिद। वारिद (वारि + द) का अर्थ 'जल देने वाला' अर्थात् बादल होता है, जबकि जलज, पंकज, राजीव कमल के पर्यायवाची हैं।",
        "correct": 2
      },
      "english": {
        "q": "Which word is NOT a synonym of Lotus (Kamal)?",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) जलज",
          "B) पंकज",
          "C) वारिद (बादल)",
          "D) राजीव"
        ],
        "ans": "C) वारिद (बादल)",
        "exp": "💡 सही उत्तर: C) वारिद। वारिद (वारि + द) का अर्थ 'जल देने वाला' अर्थात् बादल होता है, जबकि जलज, पंकज, राजीव कमल के पर्यायवाची हैं।",
        "correct": 2
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Shuddh Vartani / वर्तनी शुद्धि",
    "loc": {
      "bilingual-hindi": {
        "q": "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द का चयन कीजिए:",
        "sub": "Select the correctly spelled Hindi word:",
        "options": [
          "A) उज्वल",
          "B) उज्ज्वल",
          "C) उज्वल",
          "D) उज्जवल"
        ],
        "ans": "B) उज्ज्वल",
        "exp": "💡 सही उत्तर: B) उज्ज्वल। उत् + ज्वल = उज्ज्वल (दोनों 'ज' आधे होते हैं)। यह बोर्ड परीक्षा का सर्वाधिक पूछा जाने वाला प्रश्न है।",
        "correct": 1
      },
      "english": {
        "q": "Select the correctly spelled Hindi word:",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) उज्वल",
          "B) उज्ज्वल",
          "C) उज्वल",
          "D) उज्जवल"
        ],
        "ans": "B) उज्ज्वल",
        "exp": "💡 सही उत्तर: B) उज्ज्वल। उत् + ज्वल = उज्ज्वल (दोनों 'ज' आधे होते हैं)। यह बोर्ड परीक्षा का सर्वाधिक पूछा जाने वाला प्रश्न है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Sahitya / प्रमुख रचनाएँ एवं रचनाकार",
    "loc": {
      "bilingual-hindi": {
        "q": "कालजयी उपन्यास 'गोदान' तथा 'गबन' के प्रसिद्ध लेखक कौन हैं?",
        "sub": "Who is the author of classic Hindi novels 'Godan' and 'Gaban'?",
        "options": [
          "A) जयशंकर प्रसाद",
          "B) मुंशी प्रेमचंद (उपन्यास सम्राट)",
          "C) रामधारी सिंह दिनकर",
          "D) महादेवी वर्मा"
        ],
        "ans": "B) मुंशी प्रेमचंद (उपन्यास सम्राट)",
        "exp": "💡 सही उत्तर: B) मुंशी प्रेमचंद। प्रेमचंद जी को हिन्दी साहित्य में 'उपन्यास सम्राट' की उपाधि प्राप्त है।",
        "correct": 1
      },
      "english": {
        "q": "Who is the author of classic Hindi novels 'Godan' and 'Gaban'?",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) जयशंकर प्रसाद",
          "B) मुंशी प्रेमचंद (उपन्यास सम्राट)",
          "C) रामधारी सिंह दिनकर",
          "D) महादेवी वर्मा"
        ],
        "ans": "B) मुंशी प्रेमचंद (उपन्यास सम्राट)",
        "exp": "💡 सही उत्तर: B) मुंशी प्रेमचंद। प्रेमचंद जी को हिन्दी साहित्य में 'उपन्यास सम्राट' की उपाधि प्राप्त है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Vakya Bhed / रचना के आधार पर वाक्य भेद",
    "loc": {
      "bilingual-hindi": {
        "q": "'परिश्रम करोगे तो सफलता अवश्य मिलेगी।' रचना की दृष्टि से यह किस प्रकार का वाक्य है?",
        "sub": "Identify the sentence type based on structure:",
        "options": [
          "A) सरल वाक्य",
          "B) मिश्र वाक्य (Complex Sentence)",
          "C) संयुक्त वाक्य",
          "D) प्रश्नवाचक वाक्य"
        ],
        "ans": "B) मिश्र वाक्य (Complex Sentence)",
        "exp": "💡 सही उत्तर: B) मिश्र वाक्य। इसमें एक मुख्य उपवाक्य है और दूसरा उस पर आश्रित उपवाक्य (तो से जुड़ा) है।",
        "correct": 1
      },
      "english": {
        "q": "Identify the sentence type based on structure:",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) सरल वाक्य",
          "B) मिश्र वाक्य (Complex Sentence)",
          "C) संयुक्त वाक्य",
          "D) प्रश्नवाचक वाक्य"
        ],
        "ans": "B) मिश्र वाक्य (Complex Sentence)",
        "exp": "💡 सही उत्तर: B) मिश्र वाक्य। इसमें एक मुख्य उपवाक्य है और दूसरा उस पर आश्रित उपवाक्य (तो से जुड़ा) है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Upsarg / उपसर्ग एवं प्रत्यय",
    "loc": {
      "bilingual-hindi": {
        "q": "'अभिमान' शब्द में कौन सा उपसर्ग प्रयुक्त हुआ है?",
        "sub": "Identify the prefix (Upsarg) in 'Abhiman':",
        "options": [
          "A) अ",
          "B) अभि",
          "C) अभी",
          "D) मान"
        ],
        "ans": "B) अभि",
        "exp": "💡 सही उत्तर: B) अभि। 'अभि' उपसर्ग का अर्थ सामने या विशेष होता है (अभि + मान = अभिमान)।",
        "correct": 1
      },
      "english": {
        "q": "Identify the prefix (Upsarg) in 'Abhiman':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) अ",
          "B) अभि",
          "C) अभी",
          "D) मान"
        ],
        "ans": "B) अभि",
        "exp": "💡 सही उत्तर: B) अभि। 'अभि' उपसर्ग का अर्थ सामने या विशेष होता है (अभि + मान = अभिमान)।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Pratyay / प्रत्यय",
    "loc": {
      "bilingual-hindi": {
        "q": "'मिठास' शब्द में किस प्रत्यय का प्रयोग हुआ है?",
        "sub": "Identify the suffix (Pratyay) in 'Mithaas':",
        "options": [
          "A) आस",
          "B) ठास",
          "C) मिठा",
          "D) स"
        ],
        "ans": "A) आस",
        "exp": "💡 सही उत्तर: A) आस। मीठा (मूल शब्द) + आस (तद्धित प्रत्यय) = मिठास (भाववाचक संज्ञा)।",
        "correct": 0
      },
      "english": {
        "q": "Identify the suffix (Pratyay) in 'Mithaas':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) आस",
          "B) ठास",
          "C) मिठा",
          "D) स"
        ],
        "ans": "A) आस",
        "exp": "💡 सही उत्तर: A) आस। मीठा (मूल शब्द) + आस (तद्धित प्रत्यय) = मिठास (भाववाचक संज्ञा)।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Chhand / छन्द शास्त्र",
    "loc": {
      "bilingual-hindi": {
        "q": "'दोहा' छन्द के पहले और तीसरे चरण में कितनी-कितनी मात्राएँ होती हैं?",
        "sub": "How many Matras are in the 1st and 3rd quarters of a Doha?",
        "options": [
          "A) 11-11 मात्राएँ",
          "B) 13-13 मात्राएँ (विषम चरण)",
          "C) 16-16 मात्राएँ",
          "D) 24 मात्राएँ"
        ],
        "ans": "B) 13-13 मात्राएँ (विषम चरण)",
        "exp": "💡 सही उत्तर: B) 13-13 मात्राएँ। दोहा अर्द्धसम मात्रिक छंद है; इसके विषम चरणों (1, 3) में 13-13 तथा सम चरणों (2, 4) में 11-11 मात्राएँ होती हैं।",
        "correct": 1
      },
      "english": {
        "q": "How many Matras are in the 1st and 3rd quarters of a Doha?",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) 11-11 मात्राएँ",
          "B) 13-13 मात्राएँ (विषम चरण)",
          "C) 16-16 मात्राएँ",
          "D) 24 मात्राएँ"
        ],
        "ans": "B) 13-13 मात्राएँ (विषम चरण)",
        "exp": "💡 सही उत्तर: B) 13-13 मात्राएँ। दोहा अर्द्धसम मात्रिक छंद है; इसके विषम चरणों (1, 3) में 13-13 तथा सम चरणों (2, 4) में 11-11 मात्राएँ होती हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Karak / कारक एवं विभक्ति",
    "loc": {
      "bilingual-hindi": {
        "q": "'पेड़ से पत्ता गिरा।' इस वाक्य में 'पेड़ से' में कौन सा कारक है?",
        "sub": "Identify the Karak in 'Ped se patta gira':",
        "options": [
          "A) करण कारक",
          "B) अपादान कारक (अलगाव का भाव)",
          "C) कर्म कारक",
          "D) सम्प्रदान कारक"
        ],
        "ans": "B) अपादान कारक (अलगाव का भाव)",
        "exp": "💡 सही उत्तर: B) अपादान कारक। जहाँ किसी वस्तु का किसी स्थान या वस्तु से अलग होने (अलगाव) का बोध हो, वहाँ अपादान कारक (पंचमी विभक्ति) होता है।",
        "correct": 1
      },
      "english": {
        "q": "Identify the Karak in 'Ped se patta gira':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) करण कारक",
          "B) अपादान कारक (अलगाव का भाव)",
          "C) कर्म कारक",
          "D) सम्प्रदान कारक"
        ],
        "ans": "B) अपादान कारक (अलगाव का भाव)",
        "exp": "💡 सही उत्तर: B) अपादान कारक। जहाँ किसी वस्तु का किसी स्थान या वस्तु से अलग होने (अलगाव) का बोध हो, वहाँ अपादान कारक (पंचमी विभक्ति) होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "hindi",
    "topic": "Anekarthi / अनेक शब्दों के लिए एक शब्द",
    "loc": {
      "bilingual-hindi": {
        "q": "'जो सब कुछ जानता हो' वाक्यांश के लिए एक शब्द क्या होगा?",
        "sub": "One word substitution for 'One who knows everything':",
        "options": [
          "A) अल्पज्ञ",
          "B) सर्वज्ञ (Omniscient)",
          "C) विज्ञ",
          "D) सर्वव्यापी"
        ],
        "ans": "B) सर्वज्ञ (Omniscient)",
        "exp": "💡 सही उत्तर: B) सर्वज्ञ। कम जानने वाले को 'अल्पज्ञ' तथा सब कुछ जानने वाले को 'सर्वज्ञ' कहते हैं।",
        "correct": 1
      },
      "english": {
        "q": "One word substitution for 'One who knows everything':",
        "sub": "Class 10th HINDI - Official Syllabus Target",
        "options": [
          "A) अल्पज्ञ",
          "B) सर्वज्ञ (Omniscient)",
          "C) विज्ञ",
          "D) सर्वव्यापी"
        ],
        "ans": "B) सर्वज्ञ (Omniscient)",
        "exp": "💡 सही उत्तर: B) सर्वज्ञ। कम जानने वाले को 'अल्पज्ञ' तथा सब कुछ जानने वाले को 'सर्वज्ञ' कहते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Electrostatics / गाउस का प्रमेय",
    "loc": {
      "bilingual-hindi": {
        "q": "गाउस के नियमानुसार निर्वात में किसी बंद पृष्ठ से बद्ध कुल वैद्युत फ्लक्स (Φ) का मान क्या होता है?",
        "sub": "According to Gauss's Law, the total electric flux (Φ) through a closed surface in vacuum is:",
        "options": [
          "A) Φ = Q × ε₀",
          "B) Φ = Q / ε₀",
          "C) Φ = ε₀ / Q",
          "D) Φ = 0"
        ],
        "ans": "B) Φ = Q / ε₀",
        "exp": "💡 सही उत्तर: B) Φ = Q / ε₀। किसी बंद पृष्ठ से बद्ध कुल फ्लक्स पृष्ठ द्वारा परिबद्ध कुल आवेश का 1/ε₀ गुना होता है।",
        "correct": 1
      },
      "english": {
        "q": "According to Gauss's Law, the total electric flux (Φ) through a closed surface in vacuum is:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) Φ = Q × ε₀",
          "B) Φ = Q / ε₀",
          "C) Φ = ε₀ / Q",
          "D) Φ = 0"
        ],
        "ans": "B) Φ = Q / ε₀",
        "exp": "💡 सही उत्तर: B) Φ = Q / ε₀। किसी बंद पृष्ठ से बद्ध कुल फ्लक्स पृष्ठ द्वारा परिबद्ध कुल आवेश का 1/ε₀ गुना होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Electrostatics / धारिता एवं संधारित्र",
    "loc": {
      "bilingual-hindi": {
        "q": "समान्तर पट्टिका संधारित्र की धारिता (C) बढ़ाने के लिए क्या किया जाना चाहिए?",
        "sub": "To increase the capacitance of a parallel plate capacitor, one should:",
        "options": [
          "A) प्लेटों के बीच की दूरी d बढ़ानी चाहिए",
          "B) प्लेटों का क्षेत्रफल A बढ़ाना चाहिए अथवा परावैद्युतांक K युक्त माध्यम रखना चाहिए",
          "C) क्षेत्रफल घटाना चाहिए",
          "D) आवेश घटाना चाहिए"
        ],
        "ans": "B) प्लेटों का क्षेत्रफल A बढ़ाना चाहिए अथवा परावैद्युतांक K युक्त माध्यम रखना चाहिए",
        "exp": "💡 सही उत्तर: B। संधारित्र की धारिता C = (K ε₀ A) / d होती है। अतः प्लेटों का क्षेत्रफल A बढ़ाने या परावैद्युत K रखने से धारिता बढ़ती है।",
        "correct": 1
      },
      "english": {
        "q": "To increase the capacitance of a parallel plate capacitor, one should:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) प्लेटों के बीच की दूरी d बढ़ानी चाहिए",
          "B) प्लेटों का क्षेत्रफल A बढ़ाना चाहिए अथवा परावैद्युतांक K युक्त माध्यम रखना चाहिए",
          "C) क्षेत्रफल घटाना चाहिए",
          "D) आवेश घटाना चाहिए"
        ],
        "ans": "B) प्लेटों का क्षेत्रफल A बढ़ाना चाहिए अथवा परावैद्युतांक K युक्त माध्यम रखना चाहिए",
        "exp": "💡 सही उत्तर: B। संधारित्र की धारिता C = (K ε₀ A) / d होती है। अतः प्लेटों का क्षेत्रफल A बढ़ाने या परावैद्युत K रखने से धारिता बढ़ती है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Current Electricity / किरचॉफ के नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "किरचॉफ का लूप नियम (द्वितीय नियम - Voltage Law: ∑V = 0) किस संरक्षण सिद्धान्त पर आधारित है?",
        "sub": "Kirchhoff's loop rule (KVL: ∑V = 0) is based on the law of conservation of:",
        "options": [
          "A) आवेश (Charge)",
          "B) ऊर्जा (Energy)",
          "C) संवेग (Momentum)",
          "D) कोणीय संवेग"
        ],
        "ans": "B) ऊर्जा (Energy)",
        "exp": "💡 सही उत्तर: B) ऊर्जा संरक्षण। किसी बंद वैद्युत परिपथ में आवेश को एक पूर्ण चक्कर में ले जाने में किया गया कुल कार्य शून्य होता है, जो ऊर्जा संरक्षण दर्शाता है।",
        "correct": 1
      },
      "english": {
        "q": "Kirchhoff's loop rule (KVL: ∑V = 0) is based on the law of conservation of:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) आवेश (Charge)",
          "B) ऊर्जा (Energy)",
          "C) संवेग (Momentum)",
          "D) कोणीय संवेग"
        ],
        "ans": "B) ऊर्जा (Energy)",
        "exp": "💡 सही उत्तर: B) ऊर्जा संरक्षण। किसी बंद वैद्युत परिपथ में आवेश को एक पूर्ण चक्कर में ले जाने में किया गया कुल कार्य शून्य होता है, जो ऊर्जा संरक्षण दर्शाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Current Electricity / व्हीटस्टोन सेतु",
    "loc": {
      "bilingual-hindi": {
        "q": "व्हीटस्टोन सेतु की संतुलन अवस्था (Balanced Condition) में गैल्वेनोमीटर में बहने वाली धारा कितनी होती है?",
        "sub": "Current flowing through galvanometer in balanced Wheatstone Bridge is:",
        "options": [
          "A) अधिकतम",
          "B) शून्य (I_g = 0 तथा P/Q = R/S)",
          "C) अनंत",
          "D) ऋणात्मक"
        ],
        "ans": "B) शून्य (I_g = 0 तथा P/Q = R/S)",
        "exp": "💡 सही उत्तर: B) शून्य। संतुलन की स्थिति में सेतु के दोनों बिंदुओं का विभव समान हो जाता है, अतः गैल्वेनोमीटर से कोई धारा प्रवाहित नहीं होती (I_g = 0)।",
        "correct": 1
      },
      "english": {
        "q": "Current flowing through galvanometer in balanced Wheatstone Bridge is:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) अधिकतम",
          "B) शून्य (I_g = 0 तथा P/Q = R/S)",
          "C) अनंत",
          "D) ऋणात्मक"
        ],
        "ans": "B) शून्य (I_g = 0 तथा P/Q = R/S)",
        "exp": "💡 सही उत्तर: B) शून्य। संतुलन की स्थिति में सेतु के दोनों बिंदुओं का विभव समान हो जाता है, अतः गैल्वेनोमीटर से कोई धारा प्रवाहित नहीं होती (I_g = 0)।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Electromagnetic Induction / लेंज का नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "लेंज का नियम (Lenz's Law) किस भौतिक राशि के संरक्षण नियम का पालन करता है?",
        "sub": "Lenz's law of electromagnetic induction obeys the law of conservation of:",
        "options": [
          "A) आवेश",
          "B) ऊर्जा (Energy)",
          "C) द्रव्यमान",
          "D) चुंबकीय फ्लक्स"
        ],
        "ans": "B) ऊर्जा (Energy)",
        "exp": "💡 सही उत्तर: B) ऊर्जा। प्रेरित धारा की दिशा सदैव ऐसी होती है कि वह उस कारण का विरोध करती है जिससे वह स्वयं उत्पन्न हुई है। यह ऊर्जा संरक्षण पर आधारित है।",
        "correct": 1
      },
      "english": {
        "q": "Lenz's law of electromagnetic induction obeys the law of conservation of:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) आवेश",
          "B) ऊर्जा (Energy)",
          "C) द्रव्यमान",
          "D) चुंबकीय फ्लक्स"
        ],
        "ans": "B) ऊर्जा (Energy)",
        "exp": "💡 सही उत्तर: B) ऊर्जा। प्रेरित धारा की दिशा सदैव ऐसी होती है कि वह उस कारण का विरोध करती है जिससे वह स्वयं उत्पन्न हुई है। यह ऊर्जा संरक्षण पर आधारित है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Optics / पूर्ण आंतरिक परावर्तन",
    "loc": {
      "bilingual-hindi": {
        "q": "पूर्ण आंतरिक परावर्तन (Total Internal Reflection - TIR) घटित होने के लिए आवश्यक शर्त क्या है?",
        "sub": "Essential condition for Total Internal Reflection to occur:",
        "options": [
          "A) प्रकाश विरल से सघन माध्यम में जाना चाहिए",
          "B) प्रकाश सघन से विरल माध्यम में जाए और आपतन कोण क्रांतिक कोण से बड़ा हो (i > C)",
          "C) आपतन कोण 0° होना चाहिए",
          "D) दोनों माध्यमों का अपवर्तनांक समान हो"
        ],
        "ans": "B) प्रकाश सघन से विरल माध्यम में जाए और आपतन कोण क्रांतिक कोण से बड़ा हो (i > C)",
        "exp": "💡 सही उत्तर: B। जब प्रकाश सघन से विरल माध्यम में जाता है और आपतन कोण का मान क्रांतिक कोण C से अधिक हो जाता है, तो सम्पूर्ण प्रकाश उसी माध्यम में लौट आता है।",
        "correct": 1
      },
      "english": {
        "q": "Essential condition for Total Internal Reflection to occur:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) प्रकाश विरल से सघन माध्यम में जाना चाहिए",
          "B) प्रकाश सघन से विरल माध्यम में जाए और आपतन कोण क्रांतिक कोण से बड़ा हो (i > C)",
          "C) आपतन कोण 0° होना चाहिए",
          "D) दोनों माध्यमों का अपवर्तनांक समान हो"
        ],
        "ans": "B) प्रकाश सघन से विरल माध्यम में जाए और आपतन कोण क्रांतिक कोण से बड़ा हो (i > C)",
        "exp": "💡 सही उत्तर: B। जब प्रकाश सघन से विरल माध्यम में जाता है और आपतन कोण का मान क्रांतिक कोण C से अधिक हो जाता है, तो सम्पूर्ण प्रकाश उसी माध्यम में लौट आता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Modern Physics / दे ब्रॉग्ली तरंगदैर्घ्य",
    "loc": {
      "bilingual-hindi": {
        "q": "द्रव्यमान 'm' तथा वेग 'v' से गतिमान किसी कण की दे ब्रॉग्ली तरंगदैर्घ्य (λ) का सही सूत्र क्या है?",
        "sub": "De Broglie wavelength of a particle of mass 'm' moving with velocity 'v':",
        "options": [
          "A) λ = h / (mv)",
          "B) λ = mv / h",
          "C) λ = h × mv",
          "D) λ = h / c"
        ],
        "ans": "A) λ = h / (mv)",
        "exp": "💡 सही उत्तर: A) λ = h / (mv) = h / p। दे ब्रॉग्ली के अनुसार प्रत्येक गतिमान द्रव्य कण से एक तरंग संबद्ध होती है जिसकी तरंगदैर्घ्य संवेग के व्युत्क्रमानुपाती होती है।",
        "correct": 0
      },
      "english": {
        "q": "De Broglie wavelength of a particle of mass 'm' moving with velocity 'v':",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) λ = h / (mv)",
          "B) λ = mv / h",
          "C) λ = h × mv",
          "D) λ = h / c"
        ],
        "ans": "A) λ = h / (mv)",
        "exp": "💡 सही उत्तर: A) λ = h / (mv) = h / p। दे ब्रॉग्ली के अनुसार प्रत्येक गतिमान द्रव्य कण से एक तरंग संबद्ध होती है जिसकी तरंगदैर्घ्य संवेग के व्युत्क्रमानुपाती होती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Semiconductor / अर्धचालक इलेक्ट्रॉनिकी",
    "loc": {
      "bilingual-hindi": {
        "q": "शुद्ध सिलिकॉन (Si) में पंचसंयोजी अपद्रव्य (जैसे फास्फोरस या आर्सेनिक) मिलाने पर किस प्रकार का अर्धचालक बनता है?",
        "sub": "Doping pure silicon with a pentavalent impurity produces which semiconductor?",
        "options": [
          "A) P-प्रकार का अर्धचालक",
          "B) N-प्रकार का अर्धचालक (बहुसंख्यक वाहक: इलेक्ट्रॉन)",
          "C) आंतरिक अर्धचालक",
          "D) अतिचालक"
        ],
        "ans": "B) N-प्रकार का अर्धचालक (बहुसंख्यक वाहक: इलेक्ट्रॉन)",
        "exp": "💡 सही उत्तर: B) N-प्रकार। पंचसंयोजी परमाणु चार सहसंयोजक बंध बनाते हैं और एक अतिरिक्त इलेक्ट्रॉन मुक्त रहता है, जिससे N-प्रकार का अर्धचालक बनता है।",
        "correct": 1
      },
      "english": {
        "q": "Doping pure silicon with a pentavalent impurity produces which semiconductor?",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) P-प्रकार का अर्धचालक",
          "B) N-प्रकार का अर्धचालक (बहुसंख्यक वाहक: इलेक्ट्रॉन)",
          "C) आंतरिक अर्धचालक",
          "D) अतिचालक"
        ],
        "ans": "B) N-प्रकार का अर्धचालक (बहुसंख्यक वाहक: इलेक्ट्रॉन)",
        "exp": "💡 सही उत्तर: B) N-प्रकार। पंचसंयोजी परमाणु चार सहसंयोजक बंध बनाते हैं और एक अतिरिक्त इलेक्ट्रॉन मुक्त रहता है, जिससे N-प्रकार का अर्धचालक बनता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Semiconductor / जेनर डायोड",
    "loc": {
      "bilingual-hindi": {
        "q": "जेनर डायोड (Zener Diode) का मुख्य उपयोग किस रूप में किया जाता है?",
        "sub": "Zener diode is primarily operated in reverse breakdown region as:",
        "options": [
          "A) दिष्टकारी (Rectifier)",
          "B) वोल्टता नियंत्रक (DC Voltage Regulator)",
          "C) प्रवर्धक (Amplifier)",
          "D) दोलक (Oscillator)"
        ],
        "ans": "B) वोल्टता नियंत्रक (DC Voltage Regulator)",
        "exp": "💡 सही उत्तर: B) वोल्टता नियंत्रक। जेनर डायोड उत्क्रम अभिनति (Reverse Bias) में ब्रेकडाउन वोल्टता पर स्थिर विभव बनाए रखता है।",
        "correct": 1
      },
      "english": {
        "q": "Zener diode is primarily operated in reverse breakdown region as:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) दिष्टकारी (Rectifier)",
          "B) वोल्टता नियंत्रक (DC Voltage Regulator)",
          "C) प्रवर्धक (Amplifier)",
          "D) दोलक (Oscillator)"
        ],
        "ans": "B) वोल्टता नियंत्रक (DC Voltage Regulator)",
        "exp": "💡 सही उत्तर: B) वोल्टता नियंत्रक। जेनर डायोड उत्क्रम अभिनति (Reverse Bias) में ब्रेकडाउन वोल्टता पर स्थिर विभव बनाए रखता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Magnetism / लॉरेंज बल",
    "loc": {
      "bilingual-hindi": {
        "q": "एकसमान विद्युत क्षेत्र E तथा चुंबकीय क्षेत्र B में 'v' वेग से गतिमान आवेश 'q' पर लगने वाला कुल लॉरेंज बल क्या है?",
        "sub": "Total Lorentz force on charge 'q' moving with velocity 'v' in electric field E and magnetic field B:",
        "options": [
          "A) F = q [E + (v × B)]",
          "B) F = q (E · B)",
          "C) F = q (v · B) E",
          "D) F = q E / B"
        ],
        "ans": "A) F = q [E + (v × B)]",
        "exp": "💡 सही उत्तर: A) F = q [E + (v × B)]। यह विद्युत बल (qE) तथा चुंबकीय बल q(v × B) का सदिश योग होता है।",
        "correct": 0
      },
      "english": {
        "q": "Total Lorentz force on charge 'q' moving with velocity 'v' in electric field E and magnetic field B:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) F = q [E + (v × B)]",
          "B) F = q (E · B)",
          "C) F = q (v · B) E",
          "D) F = q E / B"
        ],
        "ans": "A) F = q [E + (v × B)]",
        "exp": "💡 सही उत्तर: A) F = q [E + (v × B)]। यह विद्युत बल (qE) तथा चुंबकीय बल q(v × B) का सदिश योग होता है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "AC Circuits / प्रत्यावर्ती धारा - LCR परिपथ",
    "loc": {
      "bilingual-hindi": {
        "q": "श्रेणीबद्ध LCR परिपथ में अनुनाद (Resonance) की स्थिति में परिपथ की प्रतिबाधा (Impedance - Z) किसके बराबर होती है?",
        "sub": "At resonance in a series LCR circuit, the impedance Z equals:",
        "options": [
          "A) Z = 0",
          "B) Z = R (न्यूनतम प्रतिबाधा)",
          "C) Z = ωL",
          "D) Z = ∞"
        ],
        "ans": "B) Z = R (न्यूनतम प्रतिबाधा)",
        "exp": "💡 सही उत्तर: B) Z = R। अनुनाद पर प्रेरकीय प्रतिघात X_L तथा धारितीय प्रतिघात X_C परस्पर बराबर हो जाते हैं (X_L = X_C), जिससे प्रतिबाधा केवल प्रतिरोध R के बराबर रह जाती है।",
        "correct": 1
      },
      "english": {
        "q": "At resonance in a series LCR circuit, the impedance Z equals:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) Z = 0",
          "B) Z = R (न्यूनतम प्रतिबाधा)",
          "C) Z = ωL",
          "D) Z = ∞"
        ],
        "ans": "B) Z = R (न्यूनतम प्रतिबाधा)",
        "exp": "💡 सही उत्तर: B) Z = R। अनुनाद पर प्रेरकीय प्रतिघात X_L तथा धारितीय प्रतिघात X_C परस्पर बराबर हो जाते हैं (X_L = X_C), जिससे प्रतिबाधा केवल प्रतिरोध R के बराबर रह जाती है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Atoms & Nuclei / बोहर का परमाणु मॉडल",
    "loc": {
      "bilingual-hindi": {
        "q": "बोहर के परमाणु मॉडल के अनुसार इलेक्ट्रॉन का कोणीय संवेग (L) केवल किस मान का पूर्ण गुणज हो सकता है?",
        "sub": "According to Bohr's model, the orbital angular momentum of an electron is quantized as:",
        "options": [
          "A) L = nh / (2π)",
          "B) L = 2π / (nh)",
          "C) L = nh / π",
          "D) L = n²h"
        ],
        "ans": "A) L = nh / (2π)",
        "exp": "💡 सही उत्तर: A) L = nh / (2π)। जहाँ n = 1, 2, 3... मुख्य क्वांटम संख्या है। इसे बोहर की क्वांटम शर्त कहते हैं।",
        "correct": 0
      },
      "english": {
        "q": "According to Bohr's model, the orbital angular momentum of an electron is quantized as:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) L = nh / (2π)",
          "B) L = 2π / (nh)",
          "C) L = nh / π",
          "D) L = n²h"
        ],
        "ans": "A) L = nh / (2π)",
        "exp": "💡 सही उत्तर: A) L = nh / (2π)। जहाँ n = 1, 2, 3... मुख्य क्वांटम संख्या है। इसे बोहर की क्वांटम शर्त कहते हैं।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Optics / स्नेल का नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रकाश के अपवर्तन के लिए स्नेल का नियम (Snell's Law) क्या है?",
        "sub": "Snell's Law connecting angle of incidence 'i' and angle of refraction 'r':",
        "options": [
          "A) sin i / sin r = μ (नियतांक)",
          "B) sin i × sin r = μ",
          "C) cos i / cos r = μ",
          "D) tan i = μ"
        ],
        "ans": "A) sin i / sin r = μ (नियतांक)",
        "exp": "💡 सही उत्तर: A) sin i / sin r = μ। किन्हीं दो निश्चित माध्यमों और निश्चित रंग के प्रकाश के लिए आपतन कोण की ज्या व अपवर्तन कोण की ज्या का अनुपात स्थिर होता है।",
        "correct": 0
      },
      "english": {
        "q": "Snell's Law connecting angle of incidence 'i' and angle of refraction 'r':",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) sin i / sin r = μ (नियतांक)",
          "B) sin i × sin r = μ",
          "C) cos i / cos r = μ",
          "D) tan i = μ"
        ],
        "ans": "A) sin i / sin r = μ (नियतांक)",
        "exp": "💡 सही उत्तर: A) sin i / sin r = μ। किन्हीं दो निश्चित माध्यमों और निश्चित रंग के प्रकाश के लिए आपतन कोण की ज्या व अपवर्तन कोण की ज्या का अनुपात स्थिर होता है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Modern Physics / नाभिकीय संलयन",
    "loc": {
      "bilingual-hindi": {
        "q": "सूर्य तथा अन्य तारों में ऊर्जा का मुख्य स्रोत कौन सी नाभिकीय प्रक्रिया है?",
        "sub": "Primary source of immense energy in the Sun and stars:",
        "options": [
          "A) नाभिकीय विखंडन",
          "B) नाभिकीय संलयन (Nuclear Fusion - 4 ¹H → ⁴He)",
          "C) रेडियोऐक्टिव क्षय",
          "D) रासायनिक दहन"
        ],
        "ans": "B) नाभिकीय संलयन (Nuclear Fusion - 4 ¹H → ⁴He)",
        "exp": "💡 सही उत्तर: B) नाभिकीय संलयन। सूर्य के क्रोड में अत्यधिक ताप व दाब पर हाइड्रोजन नाभिक संलयित होकर हीलियम नाभिक बनाते हैं तथा द्रव्यमान क्षति ऊर्जा में बदलती है।",
        "correct": 1
      },
      "english": {
        "q": "Primary source of immense energy in the Sun and stars:",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) नाभिकीय विखंडन",
          "B) नाभिकीय संलयन (Nuclear Fusion - 4 ¹H → ⁴He)",
          "C) रेडियोऐक्टिव क्षय",
          "D) रासायनिक दहन"
        ],
        "ans": "B) नाभिकीय संलयन (Nuclear Fusion - 4 ¹H → ⁴He)",
        "exp": "💡 सही उत्तर: B) नाभिकीय संलयन। सूर्य के क्रोड में अत्यधिक ताप व दाब पर हाइड्रोजन नाभिक संलयित होकर हीलियम नाभिक बनाते हैं तथा द्रव्यमान क्षति ऊर्जा में बदलती है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "physics",
    "topic": "Wave Optics / ध्रुवण एवं ब्रूस्टर का नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "ब्रूस्टर के नियमानुसार ध्रुवण कोण (i_p) तथा माध्यम के अपवर्तनांक (μ) में क्या सम्बन्ध है?",
        "sub": "Brewster's Law relating polarizing angle (i_p) and refractive index (μ):",
        "options": [
          "A) μ = sin i_p",
          "B) μ = tan i_p",
          "C) μ = cos i_p",
          "D) μ = cot i_p"
        ],
        "ans": "B) μ = tan i_p",
        "exp": "💡 सही उत्तर: B) μ = tan i_p। जब प्रकाश ध्रुवण कोण पर आपतित होता है, तो परावर्तित व अपवर्तित किरणें परस्पर 90° पर लम्बवत् होती हैं।",
        "correct": 1
      },
      "english": {
        "q": "Brewster's Law relating polarizing angle (i_p) and refractive index (μ):",
        "sub": "Class 12th PHYSICS - Official Syllabus Target",
        "options": [
          "A) μ = sin i_p",
          "B) μ = tan i_p",
          "C) μ = cos i_p",
          "D) μ = cot i_p"
        ],
        "ans": "B) μ = tan i_p",
        "exp": "💡 सही उत्तर: B) μ = tan i_p। जब प्रकाश ध्रुवण कोण पर आपतित होता है, तो परावर्तित व अपवर्तित किरणें परस्पर 90° पर लम्बवत् होती हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Solutions / विलयन - अणुसंख्य गुणधर्म",
    "loc": {
      "bilingual-hindi": {
        "q": "निम्नलिखित में से कौन सा विलयन का अणुसंख्य गुणधर्म (Colligative Property) नहीं है?",
        "sub": "Which of the following is NOT a colligative property of dilute solutions?",
        "options": [
          "A) वाष्प दाब का आपेक्षिक अवनमन",
          "B) क्वथनांक का उन्नयन",
          "C) प्रकाशीय सक्रियता (Optical Activity)",
          "D) परासरण दाब (Osmotic Pressure)"
        ],
        "ans": "C) प्रकाशीय सक्रियता (Optical Activity)",
        "exp": "💡 सही उत्तर: C) प्रकाशीय सक्रियता। अणुसंख्य गुणधर्म केवल विलेय कणों की संख्या पर निर्भर करते हैं, उनकी प्रकृति पर नहीं। 4 मुख्य गुणधर्म: वाष्पदाब अवनमन, क्वथनांक उन्नयन, हिमांक अवनमन और परासरण दाब हैं।",
        "correct": 2
      },
      "english": {
        "q": "Which of the following is NOT a colligative property of dilute solutions?",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) वाष्प दाब का आपेक्षिक अवनमन",
          "B) क्वथनांक का उन्नयन",
          "C) प्रकाशीय सक्रियता (Optical Activity)",
          "D) परासरण दाब (Osmotic Pressure)"
        ],
        "ans": "C) प्रकाशीय सक्रियता (Optical Activity)",
        "exp": "💡 सही उत्तर: C) प्रकाशीय सक्रियता। अणुसंख्य गुणधर्म केवल विलेय कणों की संख्या पर निर्भर करते हैं, उनकी प्रकृति पर नहीं। 4 मुख्य गुणधर्म: वाष्पदाब अवनमन, क्वथनांक उन्नयन, हिमांक अवनमन और परासरण दाब हैं।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Electrochemistry / फैराडे के नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "फैराडे के विद्युत अपघटन के प्रथम नियम के अनुसार इलेक्ट्रोड पर मुक्त पदार्थ का द्रव्यमान (W) किसके समानुपाती होता है?",
        "sub": "According to Faraday's First Law of Electrolysis, mass deposited (W) is proportional to:",
        "options": [
          "A) प्रवाहित कुल विद्युत आवेश Q (W = Z·I·t)",
          "B) केवल समय t",
          "C) ताप T",
          "D) विलयन का आयतन"
        ],
        "ans": "A) प्रवाहित कुल विद्युत आवेश Q (W = Z·I·t)",
        "exp": "💡 सही उत्तर: A) प्रवाहित आवेश Q। W ∝ Q = I × t => W = ZIt, जहाँ Z विद्युत रासायनिक तुल्यांक (ECE) है।",
        "correct": 0
      },
      "english": {
        "q": "According to Faraday's First Law of Electrolysis, mass deposited (W) is proportional to:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) प्रवाहित कुल विद्युत आवेश Q (W = Z·I·t)",
          "B) केवल समय t",
          "C) ताप T",
          "D) विलयन का आयतन"
        ],
        "ans": "A) प्रवाहित कुल विद्युत आवेश Q (W = Z·I·t)",
        "exp": "💡 सही उत्तर: A) प्रवाहित आवेश Q। W ∝ Q = I × t => W = ZIt, जहाँ Z विद्युत रासायनिक तुल्यांक (ECE) है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Coordination Compounds / उपसहसंयोजन यौगिक",
    "loc": {
      "bilingual-hindi": {
        "q": "जटिल यौगिक [Co(NH₃)₆]Cl₃ में केन्द्रीय धातु कोबाल्ट (Co) की प्राथमिक एवं द्वितीयक संयोजकता क्या है?",
        "sub": "Primary and secondary valency of cobalt in [Co(NH₃)₆]Cl₃:",
        "options": [
          "A) प्राथमिक = 3, द्वितीयक = 6",
          "B) प्राथमिक = 6, द्वितीयक = 3",
          "C) प्राथमिक = 2, द्वितीयक = 4",
          "D) दोनों 3 हैं"
        ],
        "ans": "A) प्राथमिक = 3, द्वितीयक = 6",
        "exp": "💡 सही उत्तर: A) प्राथमिक = 3, द्वितीयक = 6। प्राथमिक संयोजकता ऑक्सीकरण अवस्था (+3) के बराबर होती है तथा द्वितीयक संयोजकता उपसहसंयोजन संख्या (6) के बराबर होती है।",
        "correct": 0
      },
      "english": {
        "q": "Primary and secondary valency of cobalt in [Co(NH₃)₆]Cl₃:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) प्राथमिक = 3, द्वितीयक = 6",
          "B) प्राथमिक = 6, द्वितीयक = 3",
          "C) प्राथमिक = 2, द्वितीयक = 4",
          "D) दोनों 3 हैं"
        ],
        "ans": "A) प्राथमिक = 3, द्वितीयक = 6",
        "exp": "💡 सही उत्तर: A) प्राथमिक = 3, द्वितीयक = 6। प्राथमिक संयोजकता ऑक्सीकरण अवस्था (+3) के बराबर होती है तथा द्वितीयक संयोजकता उपसहसंयोजन संख्या (6) के बराबर होती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Organic Chemistry / हैलोऐल्केन - नाभिकरागी प्रतिस्थापन",
    "loc": {
      "bilingual-hindi": {
        "q": "तृतीयक ब्यूटिल ब्रोमाइड [(CH₃)₃C-Br] का जलीय KOH द्वारा जलअपघटन मुख्यतः किस क्रियाविधि से होता है?",
        "sub": "Hydrolysis of tert-butyl bromide by aqueous KOH proceeds predominantly via which mechanism?",
        "options": [
          "A) S_N1 क्रियाविधि (कार्बधनायन मध्यवर्ती द्वारा)",
          "B) S_N2 क्रियाविधि (एकल पद)",
          "C) विलोपन E2",
          "D) मुक्त मूलक"
        ],
        "ans": "A) S_N1 क्रियाविधि (कार्बधनायन मध्यवर्ती द्वारा)",
        "exp": "💡 सही उत्तर: A) S_N1 क्रियाविधि। तृतीयक हैलाइड में त्रिविम बाधा अधिक होने और तृतीयक कार्बधनायन [(CH₃)₃C⁺] के अत्यंत स्थायी होने के कारण यह अभिक्रिया S_N1 मार्ग से होती है।",
        "correct": 0
      },
      "english": {
        "q": "Hydrolysis of tert-butyl bromide by aqueous KOH proceeds predominantly via which mechanism?",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) S_N1 क्रियाविधि (कार्बधनायन मध्यवर्ती द्वारा)",
          "B) S_N2 क्रियाविधि (एकल पद)",
          "C) विलोपन E2",
          "D) मुक्त मूलक"
        ],
        "ans": "A) S_N1 क्रियाविधि (कार्बधनायन मध्यवर्ती द्वारा)",
        "exp": "💡 सही उत्तर: A) S_N1 क्रियाविधि। तृतीयक हैलाइड में त्रिविम बाधा अधिक होने और तृतीयक कार्बधनायन [(CH₃)₃C⁺] के अत्यंत स्थायी होने के कारण यह अभिक्रिया S_N1 मार्ग से होती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Biomolecules / जैव अणु - प्रोटीन",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रोटीन की प्राथमिक संरचना में अमीनो अम्लों को परस्पर जोड़ने वाला विशिष्ट रासायनिक बंध क्या कहलाता है?",
        "sub": "The specific chemical bond that links amino acids in proteins is known as:",
        "options": [
          "A) ग्लाइकोसिडिक बंध",
          "B) पेप्टाइड बंध (-CO-NH-)",
          "C) फॉस्फोडाइएस्टर बंध",
          "D) हाइड्रोजन बंध"
        ],
        "ans": "B) पेप्टाइड बंध (-CO-NH-)",
        "exp": "💡 सही उत्तर: B) पेप्टाइड बंध। एक अमीनो अम्ल का -COOH समूह दूसरे अमीनो अम्ल के -NH₂ समूह से जल अणु त्यागकर -CO-NH- (पेप्टाइड बंध) बनाता है।",
        "correct": 1
      },
      "english": {
        "q": "The specific chemical bond that links amino acids in proteins is known as:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) ग्लाइकोसिडिक बंध",
          "B) पेप्टाइड बंध (-CO-NH-)",
          "C) फॉस्फोडाइएस्टर बंध",
          "D) हाइड्रोजन बंध"
        ],
        "ans": "B) पेप्टाइड बंध (-CO-NH-)",
        "exp": "💡 सही उत्तर: B) पेप्टाइड बंध। एक अमीनो अम्ल का -COOH समूह दूसरे अमीनो अम्ल के -NH₂ समूह से जल अणु त्यागकर -CO-NH- (पेप्टाइड बंध) बनाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Electrochemistry / कोलराउश का नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "अनंत तनुता पर किसी दुर्बल विद्युत अपघट्य (जैसे CH₃COOH) की मोलर चालकता ज्ञात करने के लिए किस नियम का उपयोग किया जाता है?",
        "sub": "Which law is applied to determine the molar conductivity of weak electrolytes at infinite dilution?",
        "options": [
          "A) राउल्ट का नियम",
          "B) कोलराउश का नियम (आयनों के स्वतंत्र अभिगमन का नियम)",
          "C) हेनरी का नियम",
          "D) आर्हेनियस समीकरण"
        ],
        "ans": "B) कोलराउश का नियम (आयनों के स्वतंत्र अभिगमन का नियम)",
        "exp": "💡 सही उत्तर: B) कोलराउश का नियम। कोलराउश के अनुसार अनंत तनुता पर किसी विद्युत अपघट्य की कुल मोलर चालकता उसके धनायनों तथा ऋणायनों की व्यक्तिगत आयनिक चालकताओं के योग के बराबर होती है।",
        "correct": 1
      },
      "english": {
        "q": "Which law is applied to determine the molar conductivity of weak electrolytes at infinite dilution?",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) राउल्ट का नियम",
          "B) कोलराउश का नियम (आयनों के स्वतंत्र अभिगमन का नियम)",
          "C) हेनरी का नियम",
          "D) आर्हेनियस समीकरण"
        ],
        "ans": "B) कोलराउश का नियम (आयनों के स्वतंत्र अभिगमन का नियम)",
        "exp": "💡 सही उत्तर: B) कोलराउश का नियम। कोलराउश के अनुसार अनंत तनुता पर किसी विद्युत अपघट्य की कुल मोलर चालकता उसके धनायनों तथा ऋणायनों की व्यक्तिगत आयनिक चालकताओं के योग के बराबर होती है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Chemical Kinetics / अभिक्रिया की कोटि",
    "loc": {
      "bilingual-hindi": {
        "q": "अभिक्रिया 2A + B → उत्पाद, का वेग नियम Rate = k[A]²[B]¹ है। इस अभिक्रिया की कुल कोटि (Overall Order) क्या होगी?",
        "sub": "For rate law Rate = k[A]²[B]¹, what is the overall order of reaction?",
        "options": [
          "A) 1",
          "B) 2",
          "C) 3 (तृतीय कोटि)",
          "D) 0"
        ],
        "ans": "C) 3 (तृतीय कोटि)",
        "exp": "💡 सही उत्तर: C) 3। अभिक्रिया की कोटि वेग नियम में सांद्रताओं के घातांकों का योग होती है: 2 + 1 = 3।",
        "correct": 2
      },
      "english": {
        "q": "For rate law Rate = k[A]²[B]¹, what is the overall order of reaction?",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) 1",
          "B) 2",
          "C) 3 (तृतीय कोटि)",
          "D) 0"
        ],
        "ans": "C) 3 (तृतीय कोटि)",
        "exp": "💡 सही उत्तर: C) 3। अभिक्रिया की कोटि वेग नियम में सांद्रताओं के घातांकों का योग होती है: 2 + 1 = 3।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Organic Chemistry / लुकास परीक्षण",
    "loc": {
      "bilingual-hindi": {
        "q": "लुकास अभिकर्मक (सांद्र HCl + निर्जल ZnCl₂) का उपयोग किन यौगिकों में विभेद करने के लिए किया जाता है?",
        "sub": "Lucas reagent (concentrated HCl + anhydrous ZnCl₂) is used to distinguish between:",
        "options": [
          "A) 1°, 2° और 3° ऐल्कोहॉल (Alcohols)",
          "B) एल्डिहाइड एवं कीटोन",
          "C) प्राथमिक एवं द्वितीयक एमीन",
          "D) फिनॉल एवं ईथर"
        ],
        "ans": "A) 1°, 2° और 3° ऐल्कोहॉल (Alcohols)",
        "exp": "💡 सही उत्तर: A) 1°, 2° और 3° ऐल्कोहॉल। तृतीयक (3°) ऐल्कोहॉल तुरंत धुंधलापन (धुंध) देता है, द्वितीयक (2°) 5 मिनट में, और प्राथमिक (1°) कमरे के ताप पर नहीं देता।",
        "correct": 0
      },
      "english": {
        "q": "Lucas reagent (concentrated HCl + anhydrous ZnCl₂) is used to distinguish between:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) 1°, 2° और 3° ऐल्कोहॉल (Alcohols)",
          "B) एल्डिहाइड एवं कीटोन",
          "C) प्राथमिक एवं द्वितीयक एमीन",
          "D) फिनॉल एवं ईथर"
        ],
        "ans": "A) 1°, 2° और 3° ऐल्कोहॉल (Alcohols)",
        "exp": "💡 सही उत्तर: A) 1°, 2° और 3° ऐल्कोहॉल। तृतीयक (3°) ऐल्कोहॉल तुरंत धुंधलापन (धुंध) देता है, द्वितीयक (2°) 5 मिनट में, और प्राथमिक (1°) कमरे के ताप पर नहीं देता।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Solutions / हेनरी का नियम",
    "loc": {
      "bilingual-hindi": {
        "q": "सोडा वाटर और शीतल पेयों (Cold Drinks) में CO₂ की विलेयता बढ़ाने के लिए बोतल को किस स्थिति में सील किया जाता है?",
        "sub": "To increase the solubility of CO₂ in soft drinks, the bottle is sealed under:",
        "options": [
          "A) उच्च दाब (High Pressure - हेनरी के नियमानुसार)",
          "B) निम्न दाब",
          "C) उच्च ताप",
          "D) निर्वात"
        ],
        "ans": "A) उच्च दाब (High Pressure - हेनरी के नियमानुसार)",
        "exp": "💡 सही उत्तर: A) उच्च दाब। हेनरी के नियमानुसार किसी गैस का आंशिक दाब विलयन में गैस के मोल अंश के समानुपाती होता है (p = K_H · x)। अतः दाब बढ़ाने पर विलेयता बढ़ती है।",
        "correct": 0
      },
      "english": {
        "q": "To increase the solubility of CO₂ in soft drinks, the bottle is sealed under:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) उच्च दाब (High Pressure - हेनरी के नियमानुसार)",
          "B) निम्न दाब",
          "C) उच्च ताप",
          "D) निर्वात"
        ],
        "ans": "A) उच्च दाब (High Pressure - हेनरी के नियमानुसार)",
        "exp": "💡 सही उत्तर: A) उच्च दाब। हेनरी के नियमानुसार किसी गैस का आंशिक दाब विलयन में गैस के मोल अंश के समानुपाती होता है (p = K_H · x)। अतः दाब बढ़ाने पर विलेयता बढ़ती है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "chemistry",
    "topic": "Organic Chemistry / हॉफमैन ब्रोमामाइड अभिक्रिया",
    "loc": {
      "bilingual-hindi": {
        "q": "हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया द्वारा ऐमाइड (R-CONH₂) से किस प्रकार का ऐमीन प्राप्त होता है?",
        "sub": "Hoffmann Bromamide degradation reaction converts an amide into a primary amine with:",
        "options": [
          "A) एक अधिक कार्बन वाला ऐमीन",
          "B) एक कम कार्बन वाला प्राथमिक ऐमीन (Primary Amine: R-NH₂)",
          "C) द्वितीयक ऐमीन",
          "D) तृतीयक ऐमीन"
        ],
        "ans": "B) एक कम कार्बन वाला प्राथमिक ऐमीन (Primary Amine: R-NH₂)",
        "exp": "💡 सही उत्तर: B। R-CONH₂ + Br₂ + 4KOH → R-NH₂ + K₂CO₃ + 2KBr + 2H₂O। इसमें प्राप्त प्राथमिक ऐमीन में जनक ऐमाइड की तुलना में एक कार्बन कम होता है।",
        "correct": 1
      },
      "english": {
        "q": "Hoffmann Bromamide degradation reaction converts an amide into a primary amine with:",
        "sub": "Class 12th CHEMISTRY - Official Syllabus Target",
        "options": [
          "A) एक अधिक कार्बन वाला ऐमीन",
          "B) एक कम कार्बन वाला प्राथमिक ऐमीन (Primary Amine: R-NH₂)",
          "C) द्वितीयक ऐमीन",
          "D) तृतीयक ऐमीन"
        ],
        "ans": "B) एक कम कार्बन वाला प्राथमिक ऐमीन (Primary Amine: R-NH₂)",
        "exp": "💡 सही उत्तर: B। R-CONH₂ + Br₂ + 4KOH → R-NH₂ + K₂CO₃ + 2KBr + 2H₂O। इसमें प्राप्त प्राथमिक ऐमीन में जनक ऐमाइड की तुलना में एक कार्बन कम होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Partnership / साझेदारी संलेख",
    "loc": {
      "bilingual-hindi": {
        "q": "साझेदारी संलेख (Partnership Deed) के अभाव में साझेदारों द्वारा फर्म को दिए गए ऋण (Partner's Loan) पर वार्षिक ब्याज की दर क्या होती है?",
        "sub": "In the absence of a Partnership Deed, what interest rate is payable on a partner's loan?",
        "options": [
          "A) 10% वार्षिक",
          "B) 6% वार्षिक (साझेदारी अधिनियम 1932)",
          "C) कोई ब्याज नहीं",
          "D) 12% वार्षिक"
        ],
        "ans": "B) 6% वार्षिक (साझेदारी अधिनियम 1932)",
        "exp": "💡 सही उत्तर: B) 6% वार्षिक। भारतीय साझेदारी अधिनियम 1932 की धारा 13(d) के अनुसार संलेख न होने पर ऋण पर 6% वार्षिक ब्याज दिया जाता है।",
        "correct": 1
      },
      "english": {
        "q": "In the absence of a Partnership Deed, what interest rate is payable on a partner's loan?",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) 10% वार्षिक",
          "B) 6% वार्षिक (साझेदारी अधिनियम 1932)",
          "C) कोई ब्याज नहीं",
          "D) 12% वार्षिक"
        ],
        "ans": "B) 6% वार्षिक (साझेदारी अधिनियम 1932)",
        "exp": "💡 सही उत्तर: B) 6% वार्षिक। भारतीय साझेदारी अधिनियम 1932 की धारा 13(d) के अनुसार संलेख न होने पर ऋण पर 6% वार्षिक ब्याज दिया जाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Partnership / पुनर्मूल्यांकन खाता",
    "loc": {
      "bilingual-hindi": {
        "q": "साझेदार के प्रवेश या अवकाश ग्रहण पर बनाया जाने वाला 'पुनर्मूल्यांकन खाता' (Revaluation Account) किस प्रकृति का खाता है?",
        "sub": "Nature of Revaluation Account prepared on reconstitution of partnership:",
        "options": [
          "A) व्यक्तिगत खाता (Personal A/c)",
          "B) वास्तविक खाता (Real A/c)",
          "C) अवास्तविक / नाममात्र खाता (Nominal A/c)",
          "D) दायित्व खाता"
        ],
        "ans": "C) अवास्तविक / नाममात्र खाता (Nominal A/c)",
        "exp": "💡 सही उत्तर: C) नाममात्र खाता (Nominal Account)। संपत्तियों एवं दायित्वों के पुनर्मूल्यांकन से होने वाले लाभ या हानि को दर्ज करने के कारण यह नाममात्र खाता होता है।",
        "correct": 2
      },
      "english": {
        "q": "Nature of Revaluation Account prepared on reconstitution of partnership:",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) व्यक्तिगत खाता (Personal A/c)",
          "B) वास्तविक खाता (Real A/c)",
          "C) अवास्तविक / नाममात्र खाता (Nominal A/c)",
          "D) दायित्व खाता"
        ],
        "ans": "C) अवास्तविक / नाममात्र खाता (Nominal A/c)",
        "exp": "💡 सही उत्तर: C) नाममात्र खाता (Nominal Account)। संपत्तियों एवं दायित्वों के पुनर्मूल्यांकन से होने वाले लाभ या हानि को दर्ज करने के कारण यह नाममात्र खाता होता है।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Share Capital / न्यूनतम अभिदान",
    "loc": {
      "bilingual-hindi": {
        "q": "सेबी (SEBI) के दिशा-निर्देशों के अनुसार किसी कम्पनी को अंशों के आबंटन हेतु निर्गमित पूँजी का न्यूनतम कितना प्रतिशत अभिदान (Minimum Subscription) प्राप्त होना अनिवार्य है?",
        "sub": "According to SEBI guidelines, minimum subscription required before share allotment is:",
        "options": [
          "A) 50%",
          "B) 75%",
          "C) 90%",
          "D) 100%"
        ],
        "ans": "C) 90%",
        "exp": "💡 सही उत्तर: C) 90%। यदि किसी कम्पनी को 30 दिनों के भीतर कुल निर्गमित राशि का कम से कम 90% आवेदन प्राप्त नहीं होता, तो उसे पूरा धन वापस करना होता है।",
        "correct": 2
      },
      "english": {
        "q": "According to SEBI guidelines, minimum subscription required before share allotment is:",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) 50%",
          "B) 75%",
          "C) 90%",
          "D) 100%"
        ],
        "ans": "C) 90%",
        "exp": "💡 सही उत्तर: C) 90%। यदि किसी कम्पनी को 30 दिनों के भीतर कुल निर्गमित राशि का कम से कम 90% आवेदन प्राप्त नहीं होता, तो उसे पूरा धन वापस करना होता है।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Accounting Ratios / तरलता अनुपात",
    "loc": {
      "bilingual-hindi": {
        "q": "लेखांकन में आदर्श चालू अनुपात (Ideal Current Ratio) क्या माना जाता है?",
        "sub": "What is considered as the benchmark Ideal Current Ratio in financial analysis?",
        "options": [
          "A) 1 : 1",
          "B) 2 : 1 (चालू परिसंपत्तियां : चालू दायित्व)",
          "C) 3 : 1",
          "D) 0.5 : 1"
        ],
        "ans": "B) 2 : 1 (चालू परिसंपत्तियां : चालू दायित्व)",
        "exp": "💡 सही उत्तर: B) 2 : 1। चालू अनुपात = Current Assets / Current Liabilities। इसका आदर्श मानक 2:1 है, जबकि तरल अनुपात (Quick Ratio) का 1:1 है।",
        "correct": 1
      },
      "english": {
        "q": "What is considered as the benchmark Ideal Current Ratio in financial analysis?",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) 1 : 1",
          "B) 2 : 1 (चालू परिसंपत्तियां : चालू दायित्व)",
          "C) 3 : 1",
          "D) 0.5 : 1"
        ],
        "ans": "B) 2 : 1 (चालू परिसंपत्तियां : चालू दायित्व)",
        "exp": "💡 सही उत्तर: B) 2 : 1। चालू अनुपात = Current Assets / Current Liabilities। इसका आदर्श मानक 2:1 है, जबकि तरल अनुपात (Quick Ratio) का 1:1 है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Share Capital / प्रतिभूति प्रीमियम संचय",
    "loc": {
      "bilingual-hindi": {
        "q": "कम्पनी अधिनियम 2013 की धारा 52(2) के अनुसार 'प्रतिभूति प्रीमियम संचय' (Securities Premium) का उपयोग किस कार्य के लिए नहीं किया जा सकता?",
        "sub": "Securities Premium Reserve CANNOT be utilized for which purpose under Section 52(2)?",
        "options": [
          "A) पूर्ण प्रदत्त बोनस अंश निर्गमित करने में",
          "B) सदस्यों को लाभांश का नकद भुगतान करने में",
          "C) प्रारंभिक व्ययों को अपलिखित करने में",
          "D) डिबेंचरों के शोधन पर प्रीमियम अपलिखित करने में"
        ],
        "ans": "B) सदस्यों को लाभांश का नकद भुगतान करने में",
        "exp": "💡 सही उत्तर: B। प्रतिभूति प्रीमियम का उपयोग लाभांश बांटने हेतु कभी नहीं किया जा सकता; इसका उपयोग बोनस अंश, प्रारंभिक व्यय अपलेखन, या स्वयं के अंशों की खरीद (बायबैक) में ही हो सकता है।",
        "correct": 1
      },
      "english": {
        "q": "Securities Premium Reserve CANNOT be utilized for which purpose under Section 52(2)?",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) पूर्ण प्रदत्त बोनस अंश निर्गमित करने में",
          "B) सदस्यों को लाभांश का नकद भुगतान करने में",
          "C) प्रारंभिक व्ययों को अपलिखित करने में",
          "D) डिबेंचरों के शोधन पर प्रीमियम अपलिखित करने में"
        ],
        "ans": "B) सदस्यों को लाभांश का नकद भुगतान करने में",
        "exp": "💡 सही उत्तर: B। प्रतिभूति प्रीमियम का उपयोग लाभांश बांटने हेतु कभी नहीं किया जा सकता; इसका उपयोग बोनस अंश, प्रारंभिक व्यय अपलेखन, या स्वयं के अंशों की खरीद (बायबैक) में ही हो सकता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Cash Flow Statement / विनियोग गतिविधियाँ",
    "loc": {
      "bilingual-hindi": {
        "q": "रोकड़ प्रवाह विवरण (Cash Flow Statement) में संयंत्र एवं मशीनरी (Plant & Machinery) के विक्रय से प्राप्त नकद राशि किस गतिविधि में दर्ज की जाती है?",
        "sub": "Cash received from sale of plant and machinery is classified under which activity in Cash Flow Statement?",
        "options": [
          "A) परिचालन गतिविधि (Operating)",
          "B) विनियोजन गतिविधि (Investing Activity)",
          "C) वित्तीय गतिविधि (Financing)",
          "D) बैंक ओवरड्राफ्ट"
        ],
        "ans": "B) विनियोजन गतिविधि (Investing Activity)",
        "exp": "💡 सही उत्तर: B) विनियोजन गतिविधि (Investing Activity)। गैर-चालू संपत्तियों (अचल संपत्तियों) एवं प्रतिभूतियों के क्रय-विक्रय से संबंधित रोकड़ प्रवाह विनियोजन गतिविधियों में आता है।",
        "correct": 1
      },
      "english": {
        "q": "Cash received from sale of plant and machinery is classified under which activity in Cash Flow Statement?",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) परिचालन गतिविधि (Operating)",
          "B) विनियोजन गतिविधि (Investing Activity)",
          "C) वित्तीय गतिविधि (Financing)",
          "D) बैंक ओवरड्राफ्ट"
        ],
        "ans": "B) विनियोजन गतिविधि (Investing Activity)",
        "exp": "💡 सही उत्तर: B) विनियोजन गतिविधि (Investing Activity)। गैर-चालू संपत्तियों (अचल संपत्तियों) एवं प्रतिभूतियों के क्रय-विक्रय से संबंधित रोकड़ प्रवाह विनियोजन गतिविधियों में आता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Partnership / ख्याति का मूल्यांकन",
    "loc": {
      "bilingual-hindi": {
        "q": "अधि-लाभ विधि (Super Profit Method) द्वारा ख्याति की गणना करते समय 'अधि-लाभ' का क्या अर्थ होता है?",
        "sub": "Super Profit in goodwill valuation equals:",
        "options": [
          "A) औसत लाभ - सामान्य लाभ (Actual Average Profit - Normal Profit)",
          "B) सामान्य लाभ - शुद्ध लाभ",
          "C) कुल बिक्री - कुल लागत",
          "D) पूँजी × सामान्य दर"
        ],
        "ans": "A) औसत लाभ - सामान्य लाभ (Actual Average Profit - Normal Profit)",
        "exp": "💡 सही उत्तर: A। सामान्य लाभ की तुलना में व्यवसाय द्वारा अर्जित वास्तविक अतिरिक्त लाभ को 'अधि-लाभ' (Super Profit = Average Profit - Normal Profit) कहते हैं।",
        "correct": 0
      },
      "english": {
        "q": "Super Profit in goodwill valuation equals:",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) औसत लाभ - सामान्य लाभ (Actual Average Profit - Normal Profit)",
          "B) सामान्य लाभ - शुद्ध लाभ",
          "C) कुल बिक्री - कुल लागत",
          "D) पूँजी × सामान्य दर"
        ],
        "ans": "A) औसत लाभ - सामान्य लाभ (Actual Average Profit - Normal Profit)",
        "exp": "💡 सही उत्तर: A। सामान्य लाभ की तुलना में व्यवसाय द्वारा अर्जित वास्तविक अतिरिक्त लाभ को 'अधि-लाभ' (Super Profit = Average Profit - Normal Profit) कहते हैं।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Dissolution / फर्म का विघटन",
    "loc": {
      "bilingual-hindi": {
        "q": "साझेदारी फर्म के विघटन (Dissolution) पर संपत्तियों और बाह्य दायित्वों के निपटारे हेतु कौन सा खाता तैयार किया जाता है?",
        "sub": "Which account is prepared to dispose of assets and settle liabilities on dissolution of a partnership firm?",
        "options": [
          "A) पुनर्मूल्यांकन खाता",
          "B) वसूली खाता (Realisation Account)",
          "C) लाभ-हानि खाता",
          "D) साझेदारों का चालू खाता"
        ],
        "ans": "B) वसूली खाता (Realisation Account)",
        "exp": "💡 सही उत्तर: B) वसूली खाता। फर्म के पूर्ण समापन पर संपत्तियों की बिक्री से वसूली तथा दायित्वों के भुगतान हेतु Realisation Account खोला जाता है।",
        "correct": 1
      },
      "english": {
        "q": "Which account is prepared to dispose of assets and settle liabilities on dissolution of a partnership firm?",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) पुनर्मूल्यांकन खाता",
          "B) वसूली खाता (Realisation Account)",
          "C) लाभ-हानि खाता",
          "D) साझेदारों का चालू खाता"
        ],
        "ans": "B) वसूली खाता (Realisation Account)",
        "exp": "💡 सही उत्तर: B) वसूली खाता। फर्म के पूर्ण समापन पर संपत्तियों की बिक्री से वसूली तथा दायित्वों के भुगतान हेतु Realisation Account खोला जाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Debentures / ऋणपत्रों का निर्गमन",
    "loc": {
      "bilingual-hindi": {
        "q": "ऋणपत्रधारियों (Debenture Holders) को कम्पनी द्वारा निश्चित दर से क्या प्रदान किया जाता है?",
        "sub": "Debenture holders of a company are entitled to receive:",
        "options": [
          "A) लाभांश (Dividend)",
          "B) निश्चित दर से ब्याज (Interest at a fixed coupon rate)",
          "C) मतदान का अधिकार",
          "D) लाभ में हिस्सा"
        ],
        "ans": "B) निश्चित दर से ब्याज (Interest at a fixed coupon rate)",
        "exp": "💡 सही उत्तर: B) ब्याज। ऋणपत्र ऋण का प्रमाणपत्र होता है। ऋणपत्रधारी कम्पनी के लेनदार होते हैं और उन्हें लाभ हो या हानि, निश्चित दर से ब्याज प्राप्त होता है।",
        "correct": 1
      },
      "english": {
        "q": "Debenture holders of a company are entitled to receive:",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) लाभांश (Dividend)",
          "B) निश्चित दर से ब्याज (Interest at a fixed coupon rate)",
          "C) मतदान का अधिकार",
          "D) लाभ में हिस्सा"
        ],
        "ans": "B) निश्चित दर से ब्याज (Interest at a fixed coupon rate)",
        "exp": "💡 सही उत्तर: B) ब्याज। ऋणपत्र ऋण का प्रमाणपत्र होता है। ऋणपत्रधारी कम्पनी के लेनदार होते हैं और उन्हें लाभ हो या हानि, निश्चित दर से ब्याज प्राप्त होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "accountancy",
    "topic": "Financial Analysis / कार्यशील पूँजी",
    "loc": {
      "bilingual-hindi": {
        "q": "शुद्ध कार्यशील पूँजी (Net Working Capital) ज्ञात करने का सही सूत्र क्या है?",
        "sub": "Formula to calculate Net Working Capital:",
        "options": [
          "A) चालू परिसंपत्तियां - चालू दायित्व (Current Assets - Current Liabilities)",
          "B) कुल परिसंपत्तियां - कुल दायित्व",
          "C) स्थायी संपत्तियां - स्थायी दायित्व",
          "D) नकद + बैंक"
        ],
        "ans": "A) चालू परिसंपत्तियां - चालू दायित्व (Current Assets - Current Liabilities)",
        "exp": "💡 सही उत्तर: A। दैनिक परिचालन हेतु उपलब्ध पूँजी = Current Assets - Current Liabilities (चालू परिसंपत्तियां - चालू दायित्व)।",
        "correct": 0
      },
      "english": {
        "q": "Formula to calculate Net Working Capital:",
        "sub": "Class 12th ACCOUNTANCY - Official Syllabus Target",
        "options": [
          "A) चालू परिसंपत्तियां - चालू दायित्व (Current Assets - Current Liabilities)",
          "B) कुल परिसंपत्तियां - कुल दायित्व",
          "C) स्थायी संपत्तियां - स्थायी दायित्व",
          "D) नकद + बैंक"
        ],
        "ans": "A) चालू परिसंपत्तियां - चालू दायित्व (Current Assets - Current Liabilities)",
        "exp": "💡 सही उत्तर: A। दैनिक परिचालन हेतु उपलब्ध पूँजी = Current Assets - Current Liabilities (चालू परिसंपत्तियां - चालू दायित्व)।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "business",
    "topic": "Principles of Management / वैज्ञानिक प्रबंध",
    "loc": {
      "bilingual-hindi": {
        "q": "'वैज्ञानिक प्रबंध के जनक' (Father of Scientific Management) के रूप में किसे जाना जाता है?",
        "sub": "Who is widely known as the Father of Scientific Management?",
        "options": [
          "A) हेनरी फेयोल",
          "B) एफ. डब्ल्यू. टेलर (F.W. Taylor)",
          "C) पीटर ड्रकर",
          "D) मैक्स वेबर"
        ],
        "ans": "B) एफ. डब्ल्यू. टेलर (F.W. Taylor)",
        "exp": "💡 सही उत्तर: B) एफ. डब्ल्यू. टेलर। टेलर ने समय अध्ययन, गति अध्ययन तथा 'अंगूठे के नियम के स्थान पर विज्ञान' (Science not rule of thumb) का सिद्धान्त दिया।",
        "correct": 1
      },
      "english": {
        "q": "Who is widely known as the Father of Scientific Management?",
        "sub": "Class 12th BUSINESS - Official Syllabus Target",
        "options": [
          "A) हेनरी फेयोल",
          "B) एफ. डब्ल्यू. टेलर (F.W. Taylor)",
          "C) पीटर ड्रकर",
          "D) मैक्स वेबर"
        ],
        "ans": "B) एफ. डब्ल्यू. टेलर (F.W. Taylor)",
        "exp": "💡 सही उत्तर: B) एफ. डब्ल्यू. टेलर। टेलर ने समय अध्ययन, गति अध्ययन तथा 'अंगूठे के नियम के स्थान पर विज्ञान' (Science not rule of thumb) का सिद्धान्त दिया।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "business",
    "topic": "Functions of Management / नियोजन",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रबंध का वह प्राथमिक कार्य कौन सा है जो यह निर्धारित करता है कि 'क्या करना है, कैसे करना है और किसे करना है'?",
        "sub": "Primary function of management determining in advance what to do and how to do:",
        "options": [
          "A) संगठन (Organising)",
          "B) नियोजन (Planning)",
          "C) नियंत्रण (Controlling)",
          "D) निर्देशन (Directing)"
        ],
        "ans": "B) नियोजन (Planning)",
        "exp": "💡 सही उत्तर: B) नियोजन। नियोजन प्रबंध का पहला और आधारभूत कार्य है जो वर्तमान से भविष्य के लक्ष्यों के बीच की दूरी को पाटता है।",
        "correct": 1
      },
      "english": {
        "q": "Primary function of management determining in advance what to do and how to do:",
        "sub": "Class 12th BUSINESS - Official Syllabus Target",
        "options": [
          "A) संगठन (Organising)",
          "B) नियोजन (Planning)",
          "C) नियंत्रण (Controlling)",
          "D) निर्देशन (Directing)"
        ],
        "ans": "B) नियोजन (Planning)",
        "exp": "💡 सही उत्तर: B) नियोजन। नियोजन प्रबंध का पहला और आधारभूत कार्य है जो वर्तमान से भविष्य के लक्ष्यों के बीच की दूरी को पाटता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "business",
    "topic": "Marketing Management / उपभोक्ता संरक्षण",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में 'उपभोक्ता संरक्षण अधिनियम 2019' के अनुसार जिला उपभोक्ता आयोग (District Commission) में कितनी राशि तक के विवादों की सुनवाई होती है?",
        "sub": "Under Consumer Protection Act 2019, District Commission entertains claims up to:",
        "options": [
          "A) ₹20 लाख तक",
          "B) ₹50 लाख तक (नियम संशोधन उपरांत)",
          "C) ₹1 करोड़ तक",
          "D) ₹10 करोड़ तक"
        ],
        "ans": "B) ₹50 लाख तक (नियम संशोधन उपरांत)",
        "exp": "💡 सही उत्तर: B) ₹50 लाख तक। संशोधित उपभोक्ता संरक्षण नियमों के अनुसार जिला आयोग 50 लाख तक, राज्य आयोग 50 लाख से 2 करोड़ तक, और राष्ट्रीय आयोग 2 करोड़ से अधिक के मामलों की सुनवाई करता है।",
        "correct": 1
      },
      "english": {
        "q": "Under Consumer Protection Act 2019, District Commission entertains claims up to:",
        "sub": "Class 12th BUSINESS - Official Syllabus Target",
        "options": [
          "A) ₹20 लाख तक",
          "B) ₹50 लाख तक (नियम संशोधन उपरांत)",
          "C) ₹1 करोड़ तक",
          "D) ₹10 करोड़ तक"
        ],
        "ans": "B) ₹50 लाख तक (नियम संशोधन उपरांत)",
        "exp": "💡 सही उत्तर: B) ₹50 लाख तक। संशोधित उपभोक्ता संरक्षण नियमों के अनुसार जिला आयोग 50 लाख तक, राज्य आयोग 50 लाख से 2 करोड़ तक, और राष्ट्रीय आयोग 2 करोड़ से अधिक के मामलों की सुनवाई करता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "business",
    "topic": "Staffing / भर्ती के आंतरिक स्रोत",
    "loc": {
      "bilingual-hindi": {
        "q": "निम्नलिखित में से कौन सा कर्मचारियों की भर्ती का आंतरिक स्रोत (Internal Source of Recruitment) है?",
        "sub": "Which of the following is an internal source of recruitment?",
        "options": [
          "A) कैम्पस प्लेसमेंट",
          "B) पदोन्नति (Promotion) एवं स्थानांतरण (Transfer)",
          "C) रोजगार कार्यालय",
          "D) प्रत्यक्ष भर्ती गेट पर"
        ],
        "ans": "B) पदोन्नति (Promotion) एवं स्थानांतरण (Transfer)",
        "exp": "💡 सही उत्तर: B। संस्था के अंदर ही कार्यरत कर्मचारियों को उच्च पद पर पदोन्नत करना या एक शाखा से दूसरी शाखा में स्थानांतरित करना भर्ती का आंतरिक स्रोत है।",
        "correct": 1
      },
      "english": {
        "q": "Which of the following is an internal source of recruitment?",
        "sub": "Class 12th BUSINESS - Official Syllabus Target",
        "options": [
          "A) कैम्पस प्लेसमेंट",
          "B) पदोन्नति (Promotion) एवं स्थानांतरण (Transfer)",
          "C) रोजगार कार्यालय",
          "D) प्रत्यक्ष भर्ती गेट पर"
        ],
        "ans": "B) पदोन्नति (Promotion) एवं स्थानांतरण (Transfer)",
        "exp": "💡 सही उत्तर: B। संस्था के अंदर ही कार्यरत कर्मचारियों को उच्च पद पर पदोन्नत करना या एक शाखा से दूसरी शाखा में स्थानांतरित करना भर्ती का आंतरिक स्रोत है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "business",
    "topic": "Financial Markets / मुद्रा बाजार उपकरण",
    "loc": {
      "bilingual-hindi": {
        "q": "ट्रेजरी बिल (Treasury Bills / T-Bills) भारत सरकार की ओर से किसके द्वारा जारी किए जाते हैं?",
        "sub": "Treasury Bills are issued by which institution on behalf of the Government of India?",
        "options": [
          "A) स्टेट बैंक ऑफ इंडिया (SBI)",
          "B) भारतीय रिजर्व बैंक (RBI)",
          "C) सेबी (SEBI)",
          "D) वित्त मंत्रालय प्रत्यक्ष रूप से"
        ],
        "ans": "B) भारतीय रिजर्व बैंक (RBI)",
        "exp": "💡 सही उत्तर: B) भारतीय रिजर्व बैंक। T-Bills शून्य कूपन वाले अल्पकालिक ऋण प्रपत्र हैं जो 91 दिन, 182 दिन तथा 364 दिन की अवधि के लिए RBI द्वारा जारी किए जाते हैं।",
        "correct": 1
      },
      "english": {
        "q": "Treasury Bills are issued by which institution on behalf of the Government of India?",
        "sub": "Class 12th BUSINESS - Official Syllabus Target",
        "options": [
          "A) स्टेट बैंक ऑफ इंडिया (SBI)",
          "B) भारतीय रिजर्व बैंक (RBI)",
          "C) सेबी (SEBI)",
          "D) वित्त मंत्रालय प्रत्यक्ष रूप से"
        ],
        "ans": "B) भारतीय रिजर्व बैंक (RBI)",
        "exp": "💡 सही उत्तर: B) भारतीय रिजर्व बैंक। T-Bills शून्य कूपन वाले अल्पकालिक ऋण प्रपत्र हैं जो 91 दिन, 182 दिन तथा 364 दिन की अवधि के लिए RBI द्वारा जारी किए जाते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "economics",
    "topic": "Macroeconomics / मुद्रा गुणक",
    "loc": {
      "bilingual-hindi": {
        "q": "यदि वैधानिक तरलता व नकद आरक्षित अनुपात (Legal Reserve Ratio - LRR) 10% है, तो मुद्रा गुणक (Money Multiplier) का मान क्या होगा?",
        "sub": "If the Legal Reserve Ratio (LRR) is 10%, what will be the value of Money Multiplier?",
        "options": [
          "A) 5",
          "B) 10",
          "C) 20",
          "D) 100"
        ],
        "ans": "B) 10",
        "exp": "💡 सही उत्तर: B) 10। मुद्रा गुणक = 1 / LRR = 1 / 0.10 = 10 गुना। वाणिज्यिक बैंक अपनी प्रारंभिक जमा का 10 गुना तक साख सृजन कर सकते हैं।",
        "correct": 1
      },
      "english": {
        "q": "If the Legal Reserve Ratio (LRR) is 10%, what will be the value of Money Multiplier?",
        "sub": "Class 12th ECONOMICS - Official Syllabus Target",
        "options": [
          "A) 5",
          "B) 10",
          "C) 20",
          "D) 100"
        ],
        "ans": "B) 10",
        "exp": "💡 सही उत्तर: B) 10। मुद्रा गुणक = 1 / LRR = 1 / 0.10 = 10 गुना। वाणिज्यिक बैंक अपनी प्रारंभिक जमा का 10 गुना तक साख सृजन कर सकते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "economics",
    "topic": "Macroeconomics / राजकोषीय घाटा",
    "loc": {
      "bilingual-hindi": {
        "q": "सरकार के कुल व्यय और कुल प्राप्तियों (उधार को छोड़कर) के बीच के अंतर को क्या कहा जाता है?",
        "sub": "The excess of total government expenditure over total receipts excluding borrowings is called:",
        "options": [
          "A) राजस्व घाटा (Revenue Deficit)",
          "B) राजकोषीय घाटा (Fiscal Deficit)",
          "C) प्राथमिक घाटा (Primary Deficit)",
          "D) व्यापार घाटा"
        ],
        "ans": "B) राजकोषीय घाटा (Fiscal Deficit)",
        "exp": "💡 सही उत्तर: B) राजकोषीय घाटा। Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings। यह सरकार की कुल उधारी आवश्यकताओं को दर्शाता है।",
        "correct": 1
      },
      "english": {
        "q": "The excess of total government expenditure over total receipts excluding borrowings is called:",
        "sub": "Class 12th ECONOMICS - Official Syllabus Target",
        "options": [
          "A) राजस्व घाटा (Revenue Deficit)",
          "B) राजकोषीय घाटा (Fiscal Deficit)",
          "C) प्राथमिक घाटा (Primary Deficit)",
          "D) व्यापार घाटा"
        ],
        "ans": "B) राजकोषीय घाटा (Fiscal Deficit)",
        "exp": "💡 सही उत्तर: B) राजकोषीय घाटा। Fiscal Deficit = Total Expenditure - Total Receipts excluding borrowings। यह सरकार की कुल उधारी आवश्यकताओं को दर्शाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "economics",
    "topic": "Indian Economy / 1991 के आर्थिक सुधार",
    "loc": {
      "bilingual-hindi": {
        "q": "वर्ष 1991 की नई आर्थिक नीति (NEP 1991) के तीन मुख्य आधार स्तम्भ (LPG) कौन से थे?",
        "sub": "The three core pillars of India's 1991 New Economic Policy (LPG) were:",
        "options": [
          "A) उदारीकरण, निजीकरण एवं वैश्वीकरण (Liberalisation, Privatisation, Globalisation)",
          "B) लाइसेंस, कोटा, परमिट",
          "C) राष्ट्रीयकरण, समाजवाद, बंद अर्थव्यवस्था",
          "D) कृषि, उद्योग, सेवा"
        ],
        "ans": "A) उदारीकरण, निजीकरण एवं वैश्वीकरण (Liberalisation, Privatisation, Globalisation)",
        "exp": "💡 सही उत्तर: A। तत्कालीन वित्त मंत्री डॉ. मनमोहन सिंह और प्रधानमंत्री पी.वी. नरसिम्हा राव द्वारा भारतीय अर्थव्यवस्था को संकट से उबारने के लिए LPG सुधार लागू किए गए।",
        "correct": 0
      },
      "english": {
        "q": "The three core pillars of India's 1991 New Economic Policy (LPG) were:",
        "sub": "Class 12th ECONOMICS - Official Syllabus Target",
        "options": [
          "A) उदारीकरण, निजीकरण एवं वैश्वीकरण (Liberalisation, Privatisation, Globalisation)",
          "B) लाइसेंस, कोटा, परमिट",
          "C) राष्ट्रीयकरण, समाजवाद, बंद अर्थव्यवस्था",
          "D) कृषि, उद्योग, सेवा"
        ],
        "ans": "A) उदारीकरण, निजीकरण एवं वैश्वीकरण (Liberalisation, Privatisation, Globalisation)",
        "exp": "💡 सही उत्तर: A। तत्कालीन वित्त मंत्री डॉ. मनमोहन सिंह और प्रधानमंत्री पी.वी. नरसिम्हा राव द्वारा भारतीय अर्थव्यवस्था को संकट से उबारने के लिए LPG सुधार लागू किए गए।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "economics",
    "topic": "Macroeconomics / उपभोग फलन",
    "loc": {
      "bilingual-hindi": {
        "q": "यदि सीमांत उपभोग प्रवृत्ति (Marginal Propensity to Consume - MPC) 0.8 है, तो निवेश गुणक (Investment Multiplier - K) का मान क्या होगा?",
        "sub": "If MPC = 0.8, what is the value of the Investment Multiplier (K)?",
        "options": [
          "A) 2",
          "B) 4",
          "C) 5",
          "D) 10"
        ],
        "ans": "C) 5",
        "exp": "💡 सही उत्तर: C) 5। निवेश गुणक सूत्र: K = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5।",
        "correct": 2
      },
      "english": {
        "q": "If MPC = 0.8, what is the value of the Investment Multiplier (K)?",
        "sub": "Class 12th ECONOMICS - Official Syllabus Target",
        "options": [
          "A) 2",
          "B) 4",
          "C) 5",
          "D) 10"
        ],
        "ans": "C) 5",
        "exp": "💡 सही उत्तर: C) 5। निवेश गुणक सूत्र: K = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "economics",
    "topic": "Indian Economy / नीति आयोग",
    "loc": {
      "bilingual-hindi": {
        "q": "योजना आयोग (Planning Commission) के स्थान पर 'नीति आयोग' (NITI Aayog) की स्थापना किस तिथि को की गई थी?",
        "sub": "NITI Aayog was established replacing the Planning Commission on:",
        "options": [
          "A) 15 अगस्त 2014",
          "B) 1 जनवरी 2015",
          "C) 1 अप्रैल 2017",
          "D) 26 जनवरी 2015"
        ],
        "ans": "B) 1 जनवरी 2015",
        "exp": "💡 सही उत्तर: B) 1 जनवरी 2015। NITI (National Institution for Transforming India) Aayog सहकारी संघवाद को बढ़ावा देने वाला सरकार का थिंक टैंक है जिसके पदेन अध्यक्ष प्रधानमंत्री होते हैं।",
        "correct": 1
      },
      "english": {
        "q": "NITI Aayog was established replacing the Planning Commission on:",
        "sub": "Class 12th ECONOMICS - Official Syllabus Target",
        "options": [
          "A) 15 अगस्त 2014",
          "B) 1 जनवरी 2015",
          "C) 1 अप्रैल 2017",
          "D) 26 जनवरी 2015"
        ],
        "ans": "B) 1 जनवरी 2015",
        "exp": "💡 सही उत्तर: B) 1 जनवरी 2015। NITI (National Institution for Transforming India) Aayog सहकारी संघवाद को बढ़ावा देने वाला सरकार का थिंक टैंक है जिसके पदेन अध्यक्ष प्रधानमंत्री होते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "history",
    "topic": "Ancient India / मौर्य साम्राज्य",
    "loc": {
      "bilingual-hindi": {
        "q": "मौर्य शासक सम्राट अशोक के शिलालेखों को सर्वप्रथम 1837 ई. में किस विद्वान ने पढ़ा था?",
        "sub": "Who first deciphered the Ashokan inscriptions written in Brahmi script in 1837?",
        "options": [
          "A) जेम्स प्रिंसेप (James Prinsep)",
          "B) अलेक्जेंडर कनिंघम",
          "C) मैक्स मूलर",
          "D) जॉन मार्शल"
        ],
        "ans": "A) जेम्स प्रिंसेप (James Prinsep)",
        "exp": "💡 सही उत्तर: A) जेम्स प्रिंसेप। ईस्ट इंडिया कंपनी के टकसाल अधिकारी जेम्स प्रिंसेप ने 1837 में ब्राह्मी और खरोष्ठी लिपि का उद्वाचन (Decipherment) किया।",
        "correct": 0
      },
      "english": {
        "q": "Who first deciphered the Ashokan inscriptions written in Brahmi script in 1837?",
        "sub": "Class 12th HISTORY - Official Syllabus Target",
        "options": [
          "A) जेम्स प्रिंसेप (James Prinsep)",
          "B) अलेक्जेंडर कनिंघम",
          "C) मैक्स मूलर",
          "D) जॉन मार्शल"
        ],
        "ans": "A) जेम्स प्रिंसेप (James Prinsep)",
        "exp": "💡 सही उत्तर: A) जेम्स प्रिंसेप। ईस्ट इंडिया कंपनी के टकसाल अधिकारी जेम्स प्रिंसेप ने 1837 में ब्राह्मी और खरोष्ठी लिपि का उद्वाचन (Decipherment) किया।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "history",
    "topic": "Medieval India / विजयनगर साम्राज्य",
    "loc": {
      "bilingual-hindi": {
        "q": "प्रसिद्ध विजयनगर साम्राज्य की स्थापना 1336 ई. में किन दो भाइयों ने तुंगभद्रा नदी के तट पर की थी?",
        "sub": "Vijayanagara Empire was founded in 1336 AD on the banks of Tungabhadra river by:",
        "options": [
          "A) कृष्णदेव राय और अच्युत राय",
          "B) हरिहर और बुक्का राय (संगम वंश)",
          "C) अलाउद्दीन और मुहम्मद",
          "D) राम राय और तिरुमल"
        ],
        "ans": "B) हरिहर और बुक्का राय (संगम वंश)",
        "exp": "💡 सही उत्तर: B) हरिहर और बुक्का राय। दोनों भाइयों ने अपने गुरु विद्यारण्य के आशीर्वाद से हम्पी (कर्नाटक) के निकट विजयनगर साम्राज्य की नींव रखी।",
        "correct": 1
      },
      "english": {
        "q": "Vijayanagara Empire was founded in 1336 AD on the banks of Tungabhadra river by:",
        "sub": "Class 12th HISTORY - Official Syllabus Target",
        "options": [
          "A) कृष्णदेव राय और अच्युत राय",
          "B) हरिहर और बुक्का राय (संगम वंश)",
          "C) अलाउद्दीन और मुहम्मद",
          "D) राम राय और तिरुमल"
        ],
        "ans": "B) हरिहर और बुक्का राय (संगम वंश)",
        "exp": "💡 सही उत्तर: B) हरिहर और बुक्का राय। दोनों भाइयों ने अपने गुरु विद्यारण्य के आशीर्वाद से हम्पी (कर्नाटक) के निकट विजयनगर साम्राज्य की नींव रखी।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "history",
    "topic": "Modern India / 1857 की क्रांति",
    "loc": {
      "bilingual-hindi": {
        "q": "1857 के प्रथम भारतीय स्वतंत्रता संग्राम की औपचारिक शुरुआत 10 मई 1857 को किस छावनी से हुई थी?",
        "sub": "The Revolt of 1857 officially broke out on 10 May 1857 from which cantonment?",
        "options": [
          "A) बैरकपुर",
          "B) मेरठ छावनी (Meerut Cantonment)",
          "C) दिल्ली छावनी",
          "D) कानपुर"
        ],
        "ans": "B) मेरठ छावनी (Meerut Cantonment)",
        "exp": "💡 सही उत्तर: B) मेरठ छावनी। 10 मई 1857 को मेरठ के सिपाहियों ने विद्रोह का बिगुल फूंका और दिल्ली पहुंचकर मुगल बादशाह बहादुर शाह जफर को अपना नेता घोषित किया।",
        "correct": 1
      },
      "english": {
        "q": "The Revolt of 1857 officially broke out on 10 May 1857 from which cantonment?",
        "sub": "Class 12th HISTORY - Official Syllabus Target",
        "options": [
          "A) बैरकपुर",
          "B) मेरठ छावनी (Meerut Cantonment)",
          "C) दिल्ली छावनी",
          "D) कानपुर"
        ],
        "ans": "B) मेरठ छावनी (Meerut Cantonment)",
        "exp": "💡 सही उत्तर: B) मेरठ छावनी। 10 मई 1857 को मेरठ के सिपाहियों ने विद्रोह का बिगुल फूंका और दिल्ली पहुंचकर मुगल बादशाह बहादुर शाह जफर को अपना नेता घोषित किया।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "history",
    "topic": "Modern India / सविनय अवज्ञा आंदोलन - दांडी मार्च",
    "loc": {
      "bilingual-hindi": {
        "q": "महात्मा गांधी ने नमक कानून तोड़ने के लिए ऐतिहासिक 'दांडी मार्च' की शुरुआत साबरमती आश्रम से किस तिथि को की थी?",
        "sub": "On which date did Mahatma Gandhi begin the historic Dandi Salt March from Sabarmati Ashram?",
        "options": [
          "A) 12 मार्च 1930 (6 अप्रैल 1930 को दांडी पहुंचे)",
          "B) 1 अगस्त 1920",
          "C) 8 अगस्त 1942",
          "D) 26 जनवरी 1930"
        ],
        "ans": "A) 12 मार्च 1930 (6 अप्रैल 1930 को दांडी पहुंचे)",
        "exp": "💡 सही उत्तर: A) 12 मार्च 1930। गांधीजी ने 78 अनुयायियों के साथ 240 मील की यात्रा कर 6 अप्रैल 1930 को दांडी तट पर नमक बनाकर सविनय अवज्ञा आंदोलन का शंखनाद किया।",
        "correct": 0
      },
      "english": {
        "q": "On which date did Mahatma Gandhi begin the historic Dandi Salt March from Sabarmati Ashram?",
        "sub": "Class 12th HISTORY - Official Syllabus Target",
        "options": [
          "A) 12 मार्च 1930 (6 अप्रैल 1930 को दांडी पहुंचे)",
          "B) 1 अगस्त 1920",
          "C) 8 अगस्त 1942",
          "D) 26 जनवरी 1930"
        ],
        "ans": "A) 12 मार्च 1930 (6 अप्रैल 1930 को दांडी पहुंचे)",
        "exp": "💡 सही उत्तर: A) 12 मार्च 1930। गांधीजी ने 78 अनुयायियों के साथ 240 मील की यात्रा कर 6 अप्रैल 1930 को दांडी तट पर नमक बनाकर सविनय अवज्ञा आंदोलन का शंखनाद किया।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "history",
    "topic": "Constitution / संविधान सभा",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत के संविधान का प्रारूप तैयार करने वाली 'प्रारूप समिति' (Drafting Committee) के अध्यक्ष कौन थे?",
        "sub": "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
        "options": [
          "A) डॉ. राजेन्द्र प्रसाद",
          "B) डॉ. भीमराव अम्बेडकर",
          "C) पं. जवाहरलाल नेहरू",
          "D) सरदार वल्लभभाई पटेल"
        ],
        "ans": "B) डॉ. भीमराव अम्बेडकर",
        "exp": "💡 सही उत्तर: B) डॉ. भीमराव अम्बेडकर। 29 अगस्त 1947 को गठित 7 सदस्यीय प्रारूप समिति के अध्यक्ष डॉ. अम्बेडकर थे, जिन्हें भारतीय संविधान का जनक कहा जाता है।",
        "correct": 1
      },
      "english": {
        "q": "Who was the Chairman of the Drafting Committee of the Constituent Assembly?",
        "sub": "Class 12th HISTORY - Official Syllabus Target",
        "options": [
          "A) डॉ. राजेन्द्र प्रसाद",
          "B) डॉ. भीमराव अम्बेडकर",
          "C) पं. जवाहरलाल नेहरू",
          "D) सरदार वल्लभभाई पटेल"
        ],
        "ans": "B) डॉ. भीमराव अम्बेडकर",
        "exp": "💡 सही उत्तर: B) डॉ. भीमराव अम्बेडकर। 29 अगस्त 1947 को गठित 7 सदस्यीय प्रारूप समिति के अध्यक्ष डॉ. अम्बेडकर थे, जिन्हें भारतीय संविधान का जनक कहा जाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "polity",
    "topic": "Constitution / पंचायती राज - 73वाँ संविधान संशोधन",
    "loc": {
      "bilingual-hindi": {
        "q": "किस ऐतिहासिक संविधान संशोधन अधिनियम (1992) द्वारा पंचायती राज संस्थाओं को त्रि-स्तरीय संवैधानिक दर्जा प्रदान किया गया?",
        "sub": "Which Constitutional Amendment Act granted constitutional status to Panchayati Raj Institutions in India?",
        "options": [
          "A) 42वाँ संशोधन",
          "B) 44वाँ संशोधन",
          "C) 73वाँ संविधान संशोधन अधिनियम 1992 (11वीं अनुसूची)",
          "D) 86वाँ संशोधन"
        ],
        "ans": "C) 73वाँ संविधान संशोधन अधिनियम 1992 (11वीं अनुसूची)",
        "exp": "💡 सही उत्तर: C) 73वाँ संशोधन। इसके द्वारा संविधान में भाग IX और 11वीं अनुसूची जोड़ी गई जिसमें पंचायतों के लिए 29 विषय निर्धारित किए गए।",
        "correct": 2
      },
      "english": {
        "q": "Which Constitutional Amendment Act granted constitutional status to Panchayati Raj Institutions in India?",
        "sub": "Class 12th POLITY - Official Syllabus Target",
        "options": [
          "A) 42वाँ संशोधन",
          "B) 44वाँ संशोधन",
          "C) 73वाँ संविधान संशोधन अधिनियम 1992 (11वीं अनुसूची)",
          "D) 86वाँ संशोधन"
        ],
        "ans": "C) 73वाँ संविधान संशोधन अधिनियम 1992 (11वीं अनुसूची)",
        "exp": "💡 सही उत्तर: C) 73वाँ संशोधन। इसके द्वारा संविधान में भाग IX और 11वीं अनुसूची जोड़ी गई जिसमें पंचायतों के लिए 29 विषय निर्धारित किए गए।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "polity",
    "topic": "World Politics / सोवियत संघ का विघटन",
    "loc": {
      "bilingual-hindi": {
        "q": "शीत युद्ध (Cold War) की समाप्ति और सोवियत संघ (USSR) का औपचारिक विघटन किस वर्ष हुआ था?",
        "sub": "In which year did the Cold War conclude with the formal disintegration of the Soviet Union (USSR)?",
        "options": [
          "A) 1989",
          "B) 1991 (दिसंबर 1991)",
          "C) 1995",
          "D) 1985"
        ],
        "ans": "B) 1991 (दिसंबर 1991)",
        "exp": "💡 सही उत्तर: B) 1991। बोरिस येल्तसिन के नेतृत्व में रूस, यूक्रेन और बेलारूस द्वारा सोवियत संघ के विघटन की घोषणा के साथ ही 15 स्वतंत्र राष्ट्र बने और शीत युद्ध समाप्त हुआ।",
        "correct": 1
      },
      "english": {
        "q": "In which year did the Cold War conclude with the formal disintegration of the Soviet Union (USSR)?",
        "sub": "Class 12th POLITY - Official Syllabus Target",
        "options": [
          "A) 1989",
          "B) 1991 (दिसंबर 1991)",
          "C) 1995",
          "D) 1985"
        ],
        "ans": "B) 1991 (दिसंबर 1991)",
        "exp": "💡 सही उत्तर: B) 1991। बोरिस येल्तसिन के नेतृत्व में रूस, यूक्रेन और बेलारूस द्वारा सोवियत संघ के विघटन की घोषणा के साथ ही 15 स्वतंत्र राष्ट्र बने और शीत युद्ध समाप्त हुआ।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "polity",
    "topic": "International Organisations / संयुक्त राष्ट्र सुरक्षा परिषद",
    "loc": {
      "bilingual-hindi": {
        "q": "संयुक्त राष्ट्र सुरक्षा परिषद (UNSC) में कितने स्थायी सदस्य (Permanent Members - P5) हैं जिन्हें वीटो (Veto) शक्ति प्राप्त है?",
        "sub": "How many permanent members (P5) with Veto power exist in the UN Security Council?",
        "options": [
          "A) 5 सदस्य (अमेरिका, रूस, चीन, ब्रिटेन, फ्रांस)",
          "B) 10 सदस्य",
          "C) 15 सदस्य",
          "D) 7 सदस्य"
        ],
        "ans": "A) 5 सदस्य (अमेरिका, रूस, चीन, ब्रिटेन, फ्रांस)",
        "exp": "💡 सही उत्तर: A) 5 सदस्य। सुरक्षा परिषद में 5 स्थायी तथा 10 अस्थायी (2 वर्ष हेतु निर्वाचित) कुल 15 सदस्य होते हैं। केवल 5 स्थायी सदस्यों को वीटो शक्ति प्राप्त है।",
        "correct": 0
      },
      "english": {
        "q": "How many permanent members (P5) with Veto power exist in the UN Security Council?",
        "sub": "Class 12th POLITY - Official Syllabus Target",
        "options": [
          "A) 5 सदस्य (अमेरिका, रूस, चीन, ब्रिटेन, फ्रांस)",
          "B) 10 सदस्य",
          "C) 15 सदस्य",
          "D) 7 सदस्य"
        ],
        "ans": "A) 5 सदस्य (अमेरिका, रूस, चीन, ब्रिटेन, फ्रांस)",
        "exp": "💡 सही उत्तर: A) 5 सदस्य। सुरक्षा परिषद में 5 स्थायी तथा 10 अस्थायी (2 वर्ष हेतु निर्वाचित) कुल 15 सदस्य होते हैं। केवल 5 स्थायी सदस्यों को वीटो शक्ति प्राप्त है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "polity",
    "topic": "Indian Politics / आपातकाल 1975",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में 25 जून 1975 को आंतरिक अशांति के आधार पर किस अनुच्छेद के तहत राष्ट्रीय आपातकाल लगाया गया था?",
        "sub": "Under which Article was the National Emergency declared in India on 25 June 1975?",
        "options": [
          "A) अनुच्छेद 352 (राष्ट्रीय आपातकाल)",
          "B) अनुच्छेद 356 (राष्ट्रपति शासन)",
          "C) अनुच्छेद 360 (वित्तीय आपातकाल)",
          "D) अनुच्छेद 370"
        ],
        "ans": "A) अनुच्छेद 352 (राष्ट्रीय आपातकाल)",
        "exp": "💡 सही उत्तर: A) अनुच्छेद 352। तत्कालीन प्रधानमंत्री इंदिरा गांधी की सिफारिश पर राष्ट्रपति फखरुद्दीन अली अहमद द्वारा अनुच्छेद 352 के तहत आपातकाल लागू किया गया था।",
        "correct": 0
      },
      "english": {
        "q": "Under which Article was the National Emergency declared in India on 25 June 1975?",
        "sub": "Class 12th POLITY - Official Syllabus Target",
        "options": [
          "A) अनुच्छेद 352 (राष्ट्रीय आपातकाल)",
          "B) अनुच्छेद 356 (राष्ट्रपति शासन)",
          "C) अनुच्छेद 360 (वित्तीय आपातकाल)",
          "D) अनुच्छेद 370"
        ],
        "ans": "A) अनुच्छेद 352 (राष्ट्रीय आपातकाल)",
        "exp": "💡 सही उत्तर: A) अनुच्छेद 352। तत्कालीन प्रधानमंत्री इंदिरा गांधी की सिफारिश पर राष्ट्रपति फखरुद्दीन अली अहमद द्वारा अनुच्छेद 352 के तहत आपातकाल लागू किया गया था।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "polity",
    "topic": "Election Commission / निर्वाचन आयोग",
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय संविधान के किस अनुच्छेद के तहत एक स्वतंत्र एवं निष्पक्ष 'भारत निर्वाचन आयोग' (ECI) की स्थापना का प्रावधान है?",
        "sub": "Under which Article is the Election Commission of India established as an autonomous body?",
        "options": [
          "A) अनुच्छेद 280",
          "B) अनुच्छेद 324",
          "C) अनुच्छेद 312",
          "D) अनुच्छेद 343"
        ],
        "ans": "B) अनुच्छेद 324",
        "exp": "💡 सही उत्तर: B) अनुच्छेद 324। अनुच्छेद 324 संसद, राज्य विधानमंडलों, राष्ट्रपति और उपराष्ट्रपति पदों के निर्वाचनों के अधीक्षण, निर्देशन और नियंत्रण का अधिकार निर्वाचन आयोग को देता है।",
        "correct": 1
      },
      "english": {
        "q": "Under which Article is the Election Commission of India established as an autonomous body?",
        "sub": "Class 12th POLITY - Official Syllabus Target",
        "options": [
          "A) अनुच्छेद 280",
          "B) अनुच्छेद 324",
          "C) अनुच्छेद 312",
          "D) अनुच्छेद 343"
        ],
        "ans": "B) अनुच्छेद 324",
        "exp": "💡 सही उत्तर: B) अनुच्छेद 324। अनुच्छेद 324 संसद, राज्य विधानमंडलों, राष्ट्रपति और उपराष्ट्रपति पदों के निर्वाचनों के अधीक्षण, निर्देशन और नियंत्रण का अधिकार निर्वाचन आयोग को देता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Modern History / सविनय अवज्ञा आंदोलन",
    "loc": {
      "bilingual-hindi": {
        "q": "गांधी-इरविन समझौता (Gandhi-Irwin Pact) किस वर्ष हस्ताक्षरित हुआ था?",
        "sub": "In which year was the historic Gandhi-Irwin Pact signed?",
        "options": [
          "A) 1928",
          "B) 1931 (5 मार्च 1931)",
          "C) 1935",
          "D) 1942"
        ],
        "ans": "B) 1931 (5 मार्च 1931)",
        "exp": "💡 सही उत्तर: B) 1931। 5 मार्च 1931 को महात्मा गांधी और वायसराय लॉर्ड इरविन के बीच समझौता हुआ जिसके तहत कांग्रेस ने सविनय अवज्ञा आंदोलन स्थगित कर दूसरे गोलमेज सम्मेलन में भाग लेना स्वीकार किया।",
        "correct": 1
      },
      "english": {
        "q": "In which year was the historic Gandhi-Irwin Pact signed?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) 1928",
          "B) 1931 (5 मार्च 1931)",
          "C) 1935",
          "D) 1942"
        ],
        "ans": "B) 1931 (5 मार्च 1931)",
        "exp": "💡 सही उत्तर: B) 1931। 5 मार्च 1931 को महात्मा गांधी और वायसराय लॉर्ड इरविन के बीच समझौता हुआ जिसके तहत कांग्रेस ने सविनय अवज्ञा आंदोलन स्थगित कर दूसरे गोलमेज सम्मेलन में भाग लेना स्वीकार किया।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Civics / संघवाद (Federalism)",
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय संविधान की 7वीं अनुसूची में केंद्र और राज्यों के बीच विधायी शक्तियों को कितने सूचियों में बांटा गया है?",
        "sub": "Legislative powers between Union and States are divided into how many lists in the 7th Schedule?",
        "options": [
          "A) 2 सूचियाँ",
          "B) 3 सूचियाँ (संघ सूची, राज्य सूची, समवर्ती सूची)",
          "C) 4 सूचियाँ",
          "D) 5 सूचियाँ"
        ],
        "ans": "B) 3 सूचियाँ (संघ सूची, राज्य सूची, समवर्ती सूची)",
        "exp": "💡 सही उत्तर: B) 3 सूचियाँ। संघ सूची (रक्षा, विदेश आदि), राज्य सूची (पुलिस, कृषि आदि) और समवर्ती सूची (शिक्षा, वन आदि जिस पर दोनों कानून बना सकते हैं)।",
        "correct": 1
      },
      "english": {
        "q": "Legislative powers between Union and States are divided into how many lists in the 7th Schedule?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) 2 सूचियाँ",
          "B) 3 सूचियाँ (संघ सूची, राज्य सूची, समवर्ती सूची)",
          "C) 4 सूचियाँ",
          "D) 5 सूचियाँ"
        ],
        "ans": "B) 3 सूचियाँ (संघ सूची, राज्य सूची, समवर्ती सूची)",
        "exp": "💡 सही उत्तर: B) 3 सूचियाँ। संघ सूची (रक्षा, विदेश आदि), राज्य सूची (पुलिस, कृषि आदि) और समवर्ती सूची (शिक्षा, वन आदि जिस पर दोनों कानून बना सकते हैं)।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Economics / भारतीय अर्थव्यवस्था के क्षेत्रक",
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय अर्थव्यवस्था में 'कृषि, पशुपालन एवं मत्स्य पालन' को किस क्षेत्रक (Sector) के अंतर्गत शामिल किया जाता है?",
        "sub": "Agriculture, animal husbandry, and fishing are classified under which economic sector?",
        "options": [
          "A) प्राथमिक क्षेत्रक (Primary Sector)",
          "B) द्वितीयक क्षेत्रक (Secondary Sector)",
          "C) तृतीयक क्षेत्रक (सेवा क्षेत्र)",
          "D) चतुर्थक क्षेत्रक"
        ],
        "ans": "A) प्राथमिक क्षेत्रक (Primary Sector)",
        "exp": "💡 सही उत्तर: A) प्राथमिक क्षेत्रक। प्राकृतिक संसाधनों के सीधे विदोहन से होने वाली आर्थिक गतिविधियाँ प्राथमिक क्षेत्रक (Primary Sector) कहलाती हैं।",
        "correct": 0
      },
      "english": {
        "q": "Agriculture, animal husbandry, and fishing are classified under which economic sector?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) प्राथमिक क्षेत्रक (Primary Sector)",
          "B) द्वितीयक क्षेत्रक (Secondary Sector)",
          "C) तृतीयक क्षेत्रक (सेवा क्षेत्र)",
          "D) चतुर्थक क्षेत्रक"
        ],
        "ans": "A) प्राथमिक क्षेत्रक (Primary Sector)",
        "exp": "💡 सही उत्तर: A) प्राथमिक क्षेत्रक। प्राकृतिक संसाधनों के सीधे विदोहन से होने वाली आर्थिक गतिविधियाँ प्राथमिक क्षेत्रक (Primary Sector) कहलाती हैं।",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Geography / जल संसाधन - बहुउद्देशीय परियोजनाएं",
    "loc": {
      "bilingual-hindi": {
        "q": "स्वतंत्र भारत की प्रथम बहुउद्देशीय नदी घाटी परियोजना कौन सी थी?",
        "sub": "Which was the first multipurpose river valley project of independent India?",
        "options": [
          "A) भाखड़ा नांगल परियोजना",
          "B) दामोदर घाटी परियोजना (DVC - 1948)",
          "C) हीराकुंड बांध",
          "D) टिहरी बांध"
        ],
        "ans": "B) दामोदर घाटी परियोजना (DVC - 1948)",
        "exp": "💡 सही उत्तर: B) दामोदर घाटी परियोजना। अमेरिका की टेनेसी वैली अथॉरिटी की तर्ज पर 1948 में दामोदर नदी पर भारत की पहली बहुउद्देशीय परियोजना स्थापित की गई।",
        "correct": 1
      },
      "english": {
        "q": "Which was the first multipurpose river valley project of independent India?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) भाखड़ा नांगल परियोजना",
          "B) दामोदर घाटी परियोजना (DVC - 1948)",
          "C) हीराकुंड बांध",
          "D) टिहरी बांध"
        ],
        "ans": "B) दामोदर घाटी परियोजना (DVC - 1948)",
        "exp": "💡 सही उत्तर: B) दामोदर घाटी परियोजना। अमेरिका की टेनेसी वैली अथॉरिटी की तर्ज पर 1948 में दामोदर नदी पर भारत की पहली बहुउद्देशीय परियोजना स्थापित की गई।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Civics / राजनीतिक दल एवं लोकतंत्र",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में चुनाव लड़ने वाले राजनीतिक दलों को 'मान्यता' तथा 'चुनाव चिन्ह' प्रदान करने का अधिकार किसके पास है?",
        "sub": "Who holds the constitutional authority to recognize political parties and allocate election symbols in India?",
        "options": [
          "A) भारत की संसद",
          "B) भारत निर्वाचन आयोग (Election Commission of India)",
          "C) सर्वोच्च न्यायालय",
          "D) राष्ट्रपति"
        ],
        "ans": "B) भारत निर्वाचन आयोग (Election Commission of India)",
        "exp": "💡 सही उत्तर: B) भारत निर्वाचन आयोग। चुनाव आयोग ही राष्ट्रीय व राज्य स्तरीय दलों को चुनाव चिन्ह (आरक्षण व आबंटन) आदेश 1968 के तहत मान्यता देता है।",
        "correct": 1
      },
      "english": {
        "q": "Who holds the constitutional authority to recognize political parties and allocate election symbols in India?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) भारत की संसद",
          "B) भारत निर्वाचन आयोग (Election Commission of India)",
          "C) सर्वोच्च न्यायालय",
          "D) राष्ट्रपति"
        ],
        "ans": "B) भारत निर्वाचन आयोग (Election Commission of India)",
        "exp": "💡 सही उत्तर: B) भारत निर्वाचन आयोग। चुनाव आयोग ही राष्ट्रीय व राज्य स्तरीय दलों को चुनाव चिन्ह (आरक्षण व आबंटन) आदेश 1968 के तहत मान्यता देता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Geography / कृषि के प्रकार",
    "loc": {
      "bilingual-hindi": {
        "q": "पूर्वोत्तर राज्यों (जैसे असम, मेघालय) में की जाने वाली 'स्थानांतरित कृषि' (Shifting Cultivation) को स्थानीय रूप से क्या कहते हैं?",
        "sub": "Slash-and-burn shifting cultivation in Northeast India is locally termed as:",
        "options": [
          "A) रोका",
          "B) झूम खेती (Jhum Cultivation)",
          "C) बेवर",
          "D) पोडु"
        ],
        "ans": "B) झूम खेती (Jhum Cultivation)",
        "exp": "💡 सही उत्तर: B) झूम खेती। पूर्वोत्तर भारत में किसान जंगलों को काटकर व जलाकर राख पर खेती करते हैं, जिसे 'झूम' (Jhumming) कहा जाता है।",
        "correct": 1
      },
      "english": {
        "q": "Slash-and-burn shifting cultivation in Northeast India is locally termed as:",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) रोका",
          "B) झूम खेती (Jhum Cultivation)",
          "C) बेवर",
          "D) पोडु"
        ],
        "ans": "B) झूम खेती (Jhum Cultivation)",
        "exp": "💡 सही उत्तर: B) झूम खेती। पूर्वोत्तर भारत में किसान जंगलों को काटकर व जलाकर राख पर खेती करते हैं, जिसे 'झूम' (Jhumming) कहा जाता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Economics / मुद्रा एवं साख",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में करेंसी नोट (₹2, ₹5, ₹10, ₹100, ₹500) जारी करने का एकमात्र वैधानिक अधिकार किस संस्था के पास है?",
        "sub": "Which institution has the sole legal authority to issue currency notes in India?",
        "options": [
          "A) वित्त मंत्रालय (केवल ₹1 नोट)",
          "B) भारतीय रिजर्व बैंक (RBI)",
          "C) नीति आयोग",
          "D) स्टेट बैंक ऑफ इंडिया"
        ],
        "ans": "B) भारतीय रिजर्व बैंक (RBI)",
        "exp": "💡 सही उत्तर: B) भारतीय रिजर्व बैंक। RBI अधिनियम 1934 की धारा 22 के तहत ₹1 के नोट व सिक्कों को छोड़कर अन्य सभी बैंक नोट जारी करने का एकाधिकार केवल RBI के पास है।",
        "correct": 1
      },
      "english": {
        "q": "Which institution has the sole legal authority to issue currency notes in India?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) वित्त मंत्रालय (केवल ₹1 नोट)",
          "B) भारतीय रिजर्व बैंक (RBI)",
          "C) नीति आयोग",
          "D) स्टेट बैंक ऑफ इंडिया"
        ],
        "ans": "B) भारतीय रिजर्व बैंक (RBI)",
        "exp": "💡 सही उत्तर: B) भारतीय रिजर्व बैंक। RBI अधिनियम 1934 की धारा 22 के तहत ₹1 के नोट व सिक्कों को छोड़कर अन्य सभी बैंक नोट जारी करने का एकाधिकार केवल RBI के पास है।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "social",
    "topic": "Civics / सूचना का अधिकार",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में ऐतिहासिक 'सूचना का अधिकार अधिनियम' (RTI Act) किस वर्ष संसद द्वारा पारित होकर प्रभावी हुआ था?",
        "sub": "In which year did the landmark Right to Information (RTI) Act come into force in India?",
        "options": [
          "A) 2000",
          "B) 2005 (अक्टूबर 2005)",
          "C) 2010",
          "D) 1995"
        ],
        "ans": "B) 2005 (अक्टूबर 2005)",
        "exp": "💡 सही उत्तर: B) 2005। नागरिकों को सरकारी अभिलेखों और पारदर्शिता की पहुँच देने के लिए अक्टूबर 2005 में RTI कानून लागू किया गया।",
        "correct": 1
      },
      "english": {
        "q": "In which year did the landmark Right to Information (RTI) Act come into force in India?",
        "sub": "Class 10th SOCIAL - Official Syllabus Target",
        "options": [
          "A) 2000",
          "B) 2005 (अक्टूबर 2005)",
          "C) 2010",
          "D) 1995"
        ],
        "ans": "B) 2005 (अक्टूबर 2005)",
        "exp": "💡 सही उत्तर: B) 2005। नागरिकों को सरकारी अभिलेखों और पारदर्शिता की पहुँच देने के लिए अक्टूबर 2005 में RTI कानून लागू किया गया।",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "english",
    "topic": "Grammar / Active and Passive Voice",
    "loc": {
      "bilingual-hindi": {
        "q": "Convert to Passive Voice: 'The teacher praised the boy.'",
        "sub": "Change the following sentence into passive voice: 'The teacher praised the boy.'",
        "options": [
          "A) The boy was praised by the teacher.",
          "B) The boy is praised by the teacher.",
          "C) The boy has been praised.",
          "D) The boy praised by teacher."
        ],
        "ans": "A) The boy was praised by the teacher.",
        "exp": "💡 Solution: In Simple Past tense, passive structure is Object + was/were + V3 + by + Subject. Hence, 'The boy was praised by the teacher.'",
        "correct": 0
      },
      "english": {
        "q": "Change the following sentence into passive voice: 'The teacher praised the boy.'",
        "sub": "Class 10th ENGLISH - Official Syllabus Target",
        "options": [
          "A) The boy was praised by the teacher.",
          "B) The boy is praised by the teacher.",
          "C) The boy has been praised.",
          "D) The boy praised by teacher."
        ],
        "ans": "A) The boy was praised by the teacher.",
        "exp": "💡 Solution: In Simple Past tense, passive structure is Object + was/were + V3 + by + Subject. Hence, 'The boy was praised by the teacher.'",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "english",
    "topic": "Grammar / Direct & Indirect Speech",
    "loc": {
      "bilingual-hindi": {
        "q": "Convert to Indirect Speech: He said, 'I am reading a book.'",
        "sub": "Change into Indirect Speech: He said, 'I am reading a book.'",
        "options": [
          "A) He said that he was reading a book.",
          "B) He said that he is reading a book.",
          "C) He told he read a book.",
          "D) He says that he was reading."
        ],
        "ans": "A) He said that he was reading a book.",
        "exp": "💡 Solution: Present Continuous tense ('am reading') in reported speech changes to Past Continuous ('was reading').",
        "correct": 0
      },
      "english": {
        "q": "Change into Indirect Speech: He said, 'I am reading a book.'",
        "sub": "Class 10th ENGLISH - Official Syllabus Target",
        "options": [
          "A) He said that he was reading a book.",
          "B) He said that he is reading a book.",
          "C) He told he read a book.",
          "D) He says that he was reading."
        ],
        "ans": "A) He said that he was reading a book.",
        "exp": "💡 Solution: Present Continuous tense ('am reading') in reported speech changes to Past Continuous ('was reading').",
        "correct": 0
      }
    }
  },
  {
    "class": "10th",
    "subject": "english",
    "topic": "Vocabulary / Antonyms",
    "loc": {
      "bilingual-hindi": {
        "q": "What is the antonym of the word 'TRANSPARENT'?",
        "sub": "Choose the word opposite in meaning to 'TRANSPARENT':",
        "options": [
          "A) Clear",
          "B) Opaque",
          "C) Fragile",
          "D) Bright"
        ],
        "ans": "B) Opaque",
        "exp": "💡 Solution: Transparent means allowing light to pass through completely; Opaque means not transparent or impenetrable to light.",
        "correct": 1
      },
      "english": {
        "q": "Choose the word opposite in meaning to 'TRANSPARENT':",
        "sub": "Class 10th ENGLISH - Official Syllabus Target",
        "options": [
          "A) Clear",
          "B) Opaque",
          "C) Fragile",
          "D) Bright"
        ],
        "ans": "B) Opaque",
        "exp": "💡 Solution: Transparent means allowing light to pass through completely; Opaque means not transparent or impenetrable to light.",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "english",
    "topic": "Vocabulary / Synonyms",
    "loc": {
      "bilingual-hindi": {
        "q": "What is the synonym of the word 'ABUNDANT'?",
        "sub": "Select the word most similar in meaning to 'ABUNDANT':",
        "options": [
          "A) Scarce",
          "B) Plentiful",
          "C) Limited",
          "D) Minor"
        ],
        "ans": "B) Plentiful",
        "exp": "💡 Solution: Abundant means existing or available in large quantities (plentiful, copious).",
        "correct": 1
      },
      "english": {
        "q": "Select the word most similar in meaning to 'ABUNDANT':",
        "sub": "Class 10th ENGLISH - Official Syllabus Target",
        "options": [
          "A) Scarce",
          "B) Plentiful",
          "C) Limited",
          "D) Minor"
        ],
        "ans": "B) Plentiful",
        "exp": "💡 Solution: Abundant means existing or available in large quantities (plentiful, copious).",
        "correct": 1
      }
    }
  },
  {
    "class": "10th",
    "subject": "english",
    "topic": "Grammar / Prepositions",
    "loc": {
      "bilingual-hindi": {
        "q": "Fill in the blank with the appropriate preposition: 'He has been suffering from fever _____ Monday.'",
        "sub": "Choose correct preposition for point of time in perfect continuous:",
        "options": [
          "A) for",
          "B) since",
          "C) from",
          "D) by"
        ],
        "ans": "B) since",
        "exp": "💡 Solution: 'Since' is used for a definite point in time (Monday), while 'for' is used for a duration or period of time.",
        "correct": 1
      },
      "english": {
        "q": "Choose correct preposition for point of time in perfect continuous:",
        "sub": "Class 10th ENGLISH - Official Syllabus Target",
        "options": [
          "A) for",
          "B) since",
          "C) from",
          "D) by"
        ],
        "ans": "B) since",
        "exp": "💡 Solution: 'Since' is used for a definite point in time (Monday), while 'for' is used for a duration or period of time.",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "Calculus / अवकलन - प्रतिलोम त्रिकोणमितीय फलन",
    "loc": {
      "bilingual-hindi": {
        "q": "sin⁻¹(x) का x के सापेक्ष अवकलज (Derivative) क्या होता है?",
        "sub": "Derivative of sin⁻¹(x) with respect to x is:",
        "options": [
          "A) 1 / √(1 - x²)",
          "B) -1 / √(1 - x²)",
          "C) 1 / (1 + x²)",
          "D) √(1 - x²)"
        ],
        "ans": "A) 1 / √(1 - x²)",
        "exp": "💡 सही उत्तर: A) 1 / √(1 - x²)। प्रतिलोम त्रिकोणमिति में मानक सूत्र d/dx [sin⁻¹(x)] = 1 / √(1 - x²) होता है (|x| < 1)।",
        "correct": 0
      },
      "english": {
        "q": "Derivative of sin⁻¹(x) with respect to x is:",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) 1 / √(1 - x²)",
          "B) -1 / √(1 - x²)",
          "C) 1 / (1 + x²)",
          "D) √(1 - x²)"
        ],
        "ans": "A) 1 / √(1 - x²)",
        "exp": "💡 सही उत्तर: A) 1 / √(1 - x²)। प्रतिलोम त्रिकोणमिति में मानक सूत्र d/dx [sin⁻¹(x)] = 1 / √(1 - x²) होता है (|x| < 1)।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "Calculus / निश्चित समाकलन के गुणधर्म",
    "loc": {
      "bilingual-hindi": {
        "q": "निश्चित समाकलन ∫₋ₐᵃ f(x) dx का मान शून्य (0) कब होता है?",
        "sub": "When is the definite integral ∫₋ₐᵃ f(x) dx equal to 0?",
        "options": [
          "A) जब f(x) एक सम फलन (Even Function) हो",
          "B) जब f(x) एक विषम फलन (Odd Function: f(-x) = -f(x)) हो",
          "C) हमेशा",
          "D) कभी नहीं"
        ],
        "ans": "B) जब f(x) एक विषम फलन (Odd Function: f(-x) = -f(x)) हो",
        "exp": "💡 सही उत्तर: B) विषम फलन होने पर। यदि f(-x) = -f(x) हो, तो सममिति के कारण धनात्मक व ऋणात्मक क्षेत्रफल एक-दूसरे को निरस्त कर शून्य परिणाम देते हैं।",
        "correct": 1
      },
      "english": {
        "q": "When is the definite integral ∫₋ₐᵃ f(x) dx equal to 0?",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) जब f(x) एक सम फलन (Even Function) हो",
          "B) जब f(x) एक विषम फलन (Odd Function: f(-x) = -f(x)) हो",
          "C) हमेशा",
          "D) कभी नहीं"
        ],
        "ans": "B) जब f(x) एक विषम फलन (Odd Function: f(-x) = -f(x)) हो",
        "exp": "💡 सही उत्तर: B) विषम फलन होने पर। यदि f(-x) = -f(x) हो, तो सममिति के कारण धनात्मक व ऋणात्मक क्षेत्रफल एक-दूसरे को निरस्त कर शून्य परिणाम देते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "Differential Equations / अवकल समीकरण की कोटि एवं घात",
    "loc": {
      "bilingual-hindi": {
        "q": "अवकल समीकरण (d²y/dx²)³ + (dy/dx)⁴ + y = 0 की कोटि (Order) और घात (Degree) क्या होगी?",
        "sub": "Find the Order and Degree of differential equation (d²y/dx²)³ + (dy/dx)⁴ + y = 0:",
        "options": [
          "A) कोटि = 2, घात = 3",
          "B) कोटि = 3, घात = 2",
          "C) कोटि = 2, घात = 4",
          "D) कोटि = 4, घात = 3"
        ],
        "ans": "A) कोटि = 2, घात = 3",
        "exp": "💡 सही उत्तर: A) कोटि = 2, घात = 3। उच्चतम अवकलज d²y/dx² है (कोटि 2) और उस उच्चतम अवकलज की घात 3 है (घात 3)।",
        "correct": 0
      },
      "english": {
        "q": "Find the Order and Degree of differential equation (d²y/dx²)³ + (dy/dx)⁴ + y = 0:",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) कोटि = 2, घात = 3",
          "B) कोटि = 3, घात = 2",
          "C) कोटि = 2, घात = 4",
          "D) कोटि = 4, घात = 3"
        ],
        "ans": "A) कोटि = 2, घात = 3",
        "exp": "💡 सही उत्तर: A) कोटि = 2, घात = 3। उच्चतम अवकलज d²y/dx² है (कोटि 2) और उस उच्चतम अवकलज की घात 3 है (घात 3)।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "Vectors / सदिश गुणनफल",
    "loc": {
      "bilingual-hindi": {
        "q": "दो सदिशों a और b के परस्पर समान्तर (Collinear / Parallel) होने की आवश्यक शर्त क्या है?",
        "sub": "Condition for two non-zero vectors a and b to be parallel:",
        "options": [
          "A) a · b = 0",
          "B) a × b = 0 (सदिश गुणनफल शून्य सदिश हो)",
          "C) a + b = 0",
          "D) |a| = |b|"
        ],
        "ans": "B) a × b = 0 (सदिश गुणनफल शून्य सदिश हो)",
        "exp": "💡 सही उत्तर: B) a × b = 0। समान्तर सदिशों के बीच कोण θ = 0° या 180° होता है, जिससे sin θ = 0 होने पर a × b = |a||b| sin θ n̂ = 0 होता है।",
        "correct": 1
      },
      "english": {
        "q": "Condition for two non-zero vectors a and b to be parallel:",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) a · b = 0",
          "B) a × b = 0 (सदिश गुणनफल शून्य सदिश हो)",
          "C) a + b = 0",
          "D) |a| = |b|"
        ],
        "ans": "B) a × b = 0 (सदिश गुणनफल शून्य सदिश हो)",
        "exp": "💡 सही उत्तर: B) a × b = 0। समान्तर सदिशों के बीच कोण θ = 0° या 180° होता है, जिससे sin θ = 0 होने पर a × b = |a||b| sin θ n̂ = 0 होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "3D Geometry / दिक्-कोसाइन",
    "loc": {
      "bilingual-hindi": {
        "q": "यदि किसी सरल रेखा की दिक्-कोसाइन (Direction Cosines) l, m, n हैं, तो उनके वर्गों का योग क्या होता है?",
        "sub": "Sum of squares of direction cosines l, m, n of a straight line:",
        "options": [
          "A) 0",
          "B) 1 (l² + m² + n² = 1)",
          "C) 2",
          "D) -1"
        ],
        "ans": "B) 1 (l² + m² + n² = 1)",
        "exp": "💡 सही उत्तर: B) l² + m² + n² = 1। cos²α + cos²β + cos²γ = 1 त्रिविमीय निर्देशांक ज्यामिति का आधारभूत सिद्धान्त है।",
        "correct": 1
      },
      "english": {
        "q": "Sum of squares of direction cosines l, m, n of a straight line:",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) 0",
          "B) 1 (l² + m² + n² = 1)",
          "C) 2",
          "D) -1"
        ],
        "ans": "B) 1 (l² + m² + n² = 1)",
        "exp": "💡 सही उत्तर: B) l² + m² + n² = 1। cos²α + cos²β + cos²γ = 1 त्रिविमीय निर्देशांक ज्यामिति का आधारभूत सिद्धान्त है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "math",
    "topic": "Probability / बेज प्रमेय",
    "loc": {
      "bilingual-hindi": {
        "q": "यदि P(A) = 0.6, P(B) = 0.4 और P(A ∩ B) = 0.2 है, तो सप्रतिबंध प्रायिकता P(A|B) का मान क्या होगा?",
        "sub": "If P(A) = 0.6, P(B) = 0.4, P(A ∩ B) = 0.2, find conditional probability P(A|B):",
        "options": [
          "A) 0.5 (1/2)",
          "B) 0.2",
          "C) 0.8",
          "D) 0.25"
        ],
        "ans": "A) 0.5 (1/2)",
        "exp": "💡 सही उत्तर: A) 0.5। सप्रतिबंध प्रायिकता सूत्र: P(A|B) = P(A ∩ B) / P(B) = 0.2 / 0.4 = 1/2 = 0.5।",
        "correct": 0
      },
      "english": {
        "q": "If P(A) = 0.6, P(B) = 0.4, P(A ∩ B) = 0.2, find conditional probability P(A|B):",
        "sub": "Class 12th MATH - Official Syllabus Target",
        "options": [
          "A) 0.5 (1/2)",
          "B) 0.2",
          "C) 0.8",
          "D) 0.25"
        ],
        "ans": "A) 0.5 (1/2)",
        "exp": "💡 सही उत्तर: A) 0.5। सप्रतिबंध प्रायिकता सूत्र: P(A|B) = P(A ∩ B) / P(B) = 0.2 / 0.4 = 1/2 = 0.5।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "biology",
    "topic": "Sexual Reproduction / दोहरा निषेचन",
    "loc": {
      "bilingual-hindi": {
        "q": "आवृतबीजी (Angiosperms) पौधों में 'दोहरा निषेचन' (Double Fertilization) के फलस्वरूप प्राथमिक भ्रूणपोष केंद्रक (PEN) की गुणता क्या होती है?",
        "sub": "Ploidy level of Primary Endosperm Nucleus (PEN) in angiosperms formed via triple fusion:",
        "options": [
          "A) अगुणित (n)",
          "B) द्विगुणित (2n)",
          "C) त्रिगुणित (3n)",
          "D) चतुर्गुणित (4n)"
        ],
        "ans": "C) त्रिगुणित (3n)",
        "exp": "💡 सही उत्तर: C) त्रिगुणित (3n)। एक नर युग्मक (n) दो ध्रुवीय केंद्रकों (n + n = 2n) के साथ संलयित (त्रिसंलयन) होकर 3n भ्रूणपोष बनाता है जो भ्रूण को पोषण देता है।",
        "correct": 2
      },
      "english": {
        "q": "Ploidy level of Primary Endosperm Nucleus (PEN) in angiosperms formed via triple fusion:",
        "sub": "Class 12th BIOLOGY - Official Syllabus Target",
        "options": [
          "A) अगुणित (n)",
          "B) द्विगुणित (2n)",
          "C) त्रिगुणित (3n)",
          "D) चतुर्गुणित (4n)"
        ],
        "ans": "C) त्रिगुणित (3n)",
        "exp": "💡 सही उत्तर: C) त्रिगुणित (3n)। एक नर युग्मक (n) दो ध्रुवीय केंद्रकों (n + n = 2n) के साथ संलयित (त्रिसंलयन) होकर 3n भ्रूणपोष बनाता है जो भ्रूण को पोषण देता है।",
        "correct": 2
      }
    }
  },
  {
    "class": "12th",
    "subject": "biology",
    "topic": "Human Reproduction / मानव जनन",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव मादा में निषेचन (Fertilization) की क्रिया सामान्यतः फैलोपियन नलिका के किस भाग में सम्पन्न होती है?",
        "sub": "Fertilization in human females typically takes place in which region of the fallopian tube?",
        "options": [
          "A) गर्भाशय (Uterus)",
          "B) एम्प्युला / तुम्बिका (Ampullary region)",
          "C) अंडाशय (Ovary)",
          "D) योनि"
        ],
        "ans": "B) एम्प्युला / तुम्बिका (Ampullary region)",
        "exp": "💡 सही उत्तर: B) एम्प्युला (तुम्बिका)। शुक्राणु और अंडाणु का मिलन फैलोपियन ट्यूब के एम्प्युला भाग में होता है।",
        "correct": 1
      },
      "english": {
        "q": "Fertilization in human females typically takes place in which region of the fallopian tube?",
        "sub": "Class 12th BIOLOGY - Official Syllabus Target",
        "options": [
          "A) गर्भाशय (Uterus)",
          "B) एम्प्युला / तुम्बिका (Ampullary region)",
          "C) अंडाशय (Ovary)",
          "D) योनि"
        ],
        "ans": "B) एम्प्युला / तुम्बिका (Ampullary region)",
        "exp": "💡 सही उत्तर: B) एम्प्युला (तुम्बिका)। शुक्राणु और अंडाणु का मिलन फैलोपियन ट्यूब के एम्प्युला भाग में होता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "biology",
    "topic": "Biotechnology / प्रतिबंधन एंजाइम",
    "loc": {
      "bilingual-hindi": {
        "q": "डीएनए को विशिष्ट पैलिन्ड्रोमिक न्यूक्लियोटाइड अनुक्रम पर काटने वाले 'आण्विक कैंची' (Molecular Scissors) किसे कहते हैं?",
        "sub": "Enzymes known as 'molecular scissors' cutting DNA at specific palindromic sequences:",
        "options": [
          "A) डीएनए लाइगेज",
          "B) रिस्ट्रिक्शन एंडोन्यूक्लिएज (Restriction Endonucleases)",
          "C) डीएनए पॉलीमरेज़",
          "D) आरएनए प्राइमेज़"
        ],
        "ans": "B) रिस्ट्रिक्शन एंडोन्यूक्लिएज (Restriction Endonucleases)",
        "exp": "💡 सही उत्तर: B) रिस्ट्रिक्शन एंडोन्यूक्लिएज। ये एंजाइम पुनर्योगज डीएनए (rDNA) तकनीक में डीएनए को निश्चित स्थानों से काटने का कार्य करते हैं।",
        "correct": 1
      },
      "english": {
        "q": "Enzymes known as 'molecular scissors' cutting DNA at specific palindromic sequences:",
        "sub": "Class 12th BIOLOGY - Official Syllabus Target",
        "options": [
          "A) डीएनए लाइगेज",
          "B) रिस्ट्रिक्शन एंडोन्यूक्लिएज (Restriction Endonucleases)",
          "C) डीएनए पॉलीमरेज़",
          "D) आरएनए प्राइमेज़"
        ],
        "ans": "B) रिस्ट्रिक्शन एंडोन्यूक्लिएज (Restriction Endonucleases)",
        "exp": "💡 सही उत्तर: B) रिस्ट्रिक्शन एंडोन्यूक्लिएज। ये एंजाइम पुनर्योगज डीएनए (rDNA) तकनीक में डीएनए को निश्चित स्थानों से काटने का कार्य करते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "biology",
    "topic": "Ecology / जैव विविधता के तप्तस्थल",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में वैश्विक जैव विविधता के 4 प्रमुख तप्तस्थलों (Biodiversity Hotspots) में से कौन सा क्षेत्र शामिल है?",
        "sub": "Which region is a globally recognized Biodiversity Hotspot in India?",
        "options": [
          "A) थार मरुस्थल",
          "B) पश्चिमी घाट (Western Ghats) एवं पूर्वी हिमालय",
          "C) दक्कन का पठार",
          "D) गंगा का मैदान"
        ],
        "ans": "B) पश्चिमी घाट (Western Ghats) एवं पूर्वी हिमालय",
        "exp": "💡 सही उत्तर: B) पश्चिमी घाट। भारत में पश्चिमी घाट, हिमालय, इंडो-बर्मा और सुंदरलैंड अत्यधिक प्रजाति समृद्धि और स्थानिकता वाले तप्तस्थल हैं।",
        "correct": 1
      },
      "english": {
        "q": "Which region is a globally recognized Biodiversity Hotspot in India?",
        "sub": "Class 12th BIOLOGY - Official Syllabus Target",
        "options": [
          "A) थार मरुस्थल",
          "B) पश्चिमी घाट (Western Ghats) एवं पूर्वी हिमालय",
          "C) दक्कन का पठार",
          "D) गंगा का मैदान"
        ],
        "ans": "B) पश्चिमी घाट (Western Ghats) एवं पूर्वी हिमालय",
        "exp": "💡 सही उत्तर: B) पश्चिमी घाट। भारत में पश्चिमी घाट, हिमालय, इंडो-बर्मा और सुंदरलैंड अत्यधिक प्रजाति समृद्धि और स्थानिकता वाले तप्तस्थल हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "biology",
    "topic": "Genetics / सहप्रभाविता",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव में ABO रक्त समूह (Blood Groups) की वंशागति किस आनुवंशिक सिद्धान्त का श्रेष्ठ उदाहरण है?",
        "sub": "ABO blood group inheritance in humans is a prime example of:",
        "options": [
          "A) अपूर्ण प्रभाविता",
          "B) सहप्रभाविता (Co-dominance) एवं बहु-एलीलता (Multiple Alleles)",
          "C) सहलग्नता",
          "D) बहुजीनी वंशागति"
        ],
        "ans": "B) सहप्रभाविता (Co-dominance) एवं बहु-एलीलता (Multiple Alleles)",
        "exp": "💡 सही उत्तर: B। I^A और I^B एलील साथ होने पर दोनों अपने-अपने प्रतिजन व्यक्त करते हैं (AB समूह), जो सहप्रभाविता प्रदर्शित करता है।",
        "correct": 1
      },
      "english": {
        "q": "ABO blood group inheritance in humans is a prime example of:",
        "sub": "Class 12th BIOLOGY - Official Syllabus Target",
        "options": [
          "A) अपूर्ण प्रभाविता",
          "B) सहप्रभाविता (Co-dominance) एवं बहु-एलीलता (Multiple Alleles)",
          "C) सहलग्नता",
          "D) बहुजीनी वंशागति"
        ],
        "ans": "B) सहप्रभाविता (Co-dominance) एवं बहु-एलीलता (Multiple Alleles)",
        "exp": "💡 सही उत्तर: B। I^A और I^B एलील साथ होने पर दोनों अपने-अपने प्रतिजन व्यक्त करते हैं (AB समूह), जो सहप्रभाविता प्रदर्शित करता है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "geography",
    "topic": "Human Geography / मानव विकास सूचकांक",
    "loc": {
      "bilingual-hindi": {
        "q": "मानव विकास सूचकांक (Human Development Index - HDI) की संकल्पना का प्रतिपादन 1990 में किस अर्थशास्त्री ने किया था?",
        "sub": "Who formulated the Human Development Index (HDI) for UNDP in 1990?",
        "options": [
          "A) डॉ. महबूब-उल-हक (पाकिस्तानी अर्थशास्त्री)",
          "B) प्रो. अमर्त्य सेन",
          "C) एडम स्मिथ",
          "D) अल्फ्रेड मार्शल"
        ],
        "ans": "A) डॉ. महबूब-उल-हक (पाकिस्तानी अर्थशास्त्री)",
        "exp": "💡 सही उत्तर: A) डॉ. महबूब-उल-हक। उन्होंने प्रो. अमर्त्य सेन के सहयोग से स्वास्थ्य, शिक्षा और आय पर आधारित HDI की रूपरेखा तैयार की थी।",
        "correct": 0
      },
      "english": {
        "q": "Who formulated the Human Development Index (HDI) for UNDP in 1990?",
        "sub": "Class 12th GEOGRAPHY - Official Syllabus Target",
        "options": [
          "A) डॉ. महबूब-उल-हक (पाकिस्तानी अर्थशास्त्री)",
          "B) प्रो. अमर्त्य सेन",
          "C) एडम स्मिथ",
          "D) अल्फ्रेड मार्शल"
        ],
        "ans": "A) डॉ. महबूब-उल-हक (पाकिस्तानी अर्थशास्त्री)",
        "exp": "💡 सही उत्तर: A) डॉ. महबूब-उल-हक। उन्होंने प्रो. अमर्त्य सेन के सहयोग से स्वास्थ्य, शिक्षा और आय पर आधारित HDI की रूपरेखा तैयार की थी।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "geography",
    "topic": "Agriculture / प्रमुख फसलें",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में किस फसल को 'सुनहरा रेशा' (Golden Fibre) के नाम से जाना जाता है?",
        "sub": "Which cash crop is famously referred to as the 'Golden Fibre' of India?",
        "options": [
          "A) कपास (Cotton)",
          "B) पटसन / जूट (Jute)",
          "C) रेशम (Silk)",
          "D) ऊन"
        ],
        "ans": "B) पटसन / जूट (Jute)",
        "exp": "💡 सही उत्तर: B) जूट (पटसन)। पश्चिम बंगाल हुगली नदी घाटी में देश का 80% से अधिक जूट उत्पादित करता है, जिसे इसके सुनहरे रंग के कारण गोल्डन फाइबर कहते हैं।",
        "correct": 1
      },
      "english": {
        "q": "Which cash crop is famously referred to as the 'Golden Fibre' of India?",
        "sub": "Class 12th GEOGRAPHY - Official Syllabus Target",
        "options": [
          "A) कपास (Cotton)",
          "B) पटसन / जूट (Jute)",
          "C) रेशम (Silk)",
          "D) ऊन"
        ],
        "ans": "B) पटसन / जूट (Jute)",
        "exp": "💡 सही उत्तर: B) जूट (पटसन)। पश्चिम बंगाल हुगली नदी घाटी में देश का 80% से अधिक जूट उत्पादित करता है, जिसे इसके सुनहरे रंग के कारण गोल्डन फाइबर कहते हैं।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "geography",
    "topic": "Water Transport / राष्ट्रीय जलमार्ग",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत का 'राष्ट्रीय जलमार्ग संख्या 1' (National Waterway-1) किस नदी पर प्रयागराज से हल्दिया तक विस्तृत है?",
        "sub": "National Waterway-1 (1620 km) is developed on which river system from Prayagraj to Haldia?",
        "options": [
          "A) ब्रह्मपुत्र नदी",
          "B) गंगा-भागीरथी-हुगली नदी प्रणाली",
          "C) गोदावरी नदी",
          "D) नर्मदा नदी"
        ],
        "ans": "B) गंगा-भागीरथी-हुगली नदी प्रणाली",
        "exp": "💡 सही उत्तर: B) गंगा-भागीरथी-हुगली। यह 1620 किमी लंबा भारत का सबसे लंबा आंतरिक राष्ट्रीय जलमार्ग है।",
        "correct": 1
      },
      "english": {
        "q": "National Waterway-1 (1620 km) is developed on which river system from Prayagraj to Haldia?",
        "sub": "Class 12th GEOGRAPHY - Official Syllabus Target",
        "options": [
          "A) ब्रह्मपुत्र नदी",
          "B) गंगा-भागीरथी-हुगली नदी प्रणाली",
          "C) गोदावरी नदी",
          "D) नर्मदा नदी"
        ],
        "ans": "B) गंगा-भागीरथी-हुगली नदी प्रणाली",
        "exp": "💡 सही उत्तर: B) गंगा-भागीरथी-हुगली। यह 1620 किमी लंबा भारत का सबसे लंबा आंतरिक राष्ट्रीय जलमार्ग है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "geography",
    "topic": "Minerals / ऊर्जा संसाधन",
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में 'अंकलेश्वर' और 'बॉम्बे हाई' किस महत्वपूर्ण खनिज संसाधन के प्रमुख उत्पादक क्षेत्र हैं?",
        "sub": "Ankleshwar (Gujarat) and Mumbai High are premier offshore/onshore fields for:",
        "options": [
          "A) कोयला",
          "B) पेट्रोलियम एवं प्राकृतिक गैस (Crude Oil)",
          "C) यूरेनियम",
          "D) लौह अयस्क"
        ],
        "ans": "B) पेट्रोलियम एवं प्राकृतिक गैस (Crude Oil)",
        "exp": "💡 सही उत्तर: B) पेट्रोलियम। बॉम्बे हाई अरब सागर में स्थित भारत का सबसे बड़ा अपतटीय खनिज तेल उत्पादक क्षेत्र है।",
        "correct": 1
      },
      "english": {
        "q": "Ankleshwar (Gujarat) and Mumbai High are premier offshore/onshore fields for:",
        "sub": "Class 12th GEOGRAPHY - Official Syllabus Target",
        "options": [
          "A) कोयला",
          "B) पेट्रोलियम एवं प्राकृतिक गैस (Crude Oil)",
          "C) यूरेनियम",
          "D) लौह अयस्क"
        ],
        "ans": "B) पेट्रोलियम एवं प्राकृतिक गैस (Crude Oil)",
        "exp": "💡 सही उत्तर: B) पेट्रोलियम। बॉम्बे हाई अरब सागर में स्थित भारत का सबसे बड़ा अपतटीय खनिज तेल उत्पादक क्षेत्र है।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "sociology",
    "topic": "Demography / माल्थस का जनसंख्या सिद्धान्त",
    "loc": {
      "bilingual-hindi": {
        "q": "थॉमस माल्थस के जनसंख्या सिद्धान्त के अनुसार जनसंख्या किस गति से बढ़ती है जबकि खाद्य उत्पादन किस गति से बढ़ता है?",
        "sub": "According to Malthusian theory, population grows exponentially while food production grows:",
        "options": [
          "A) जनसंख्या ज्यामितीय (Geometric: 1,2,4,8...) तथा खाद्यान्न अंकगणितीय (Arithmetic: 1,2,3,4...)",
          "B) दोनों अंकगणितीय",
          "C) दोनों ज्यामितीय",
          "D) कोई सम्बन्ध नहीं"
        ],
        "ans": "A) जनसंख्या ज्यामितीय (Geometric: 1,2,4,8...) तथा खाद्यान्न अंकगणितीय (Arithmetic: 1,2,3,4...)",
        "exp": "💡 सही उत्तर: A। माल्थस के अनुसार अनियंत्रित जनसंख्या गुणोत्तर श्रेणी (Geometric Progression) में बढ़ती है जबकि खाद्यान्न केवल समांतर श्रेणी में बढ़ता है।",
        "correct": 0
      },
      "english": {
        "q": "According to Malthusian theory, population grows exponentially while food production grows:",
        "sub": "Class 12th SOCIOLOGY - Official Syllabus Target",
        "options": [
          "A) जनसंख्या ज्यामितीय (Geometric: 1,2,4,8...) तथा खाद्यान्न अंकगणितीय (Arithmetic: 1,2,3,4...)",
          "B) दोनों अंकगणितीय",
          "C) दोनों ज्यामितीय",
          "D) कोई सम्बन्ध नहीं"
        ],
        "ans": "A) जनसंख्या ज्यामितीय (Geometric: 1,2,4,8...) तथा खाद्यान्न अंकगणितीय (Arithmetic: 1,2,3,4...)",
        "exp": "💡 सही उत्तर: A। माल्थस के अनुसार अनियंत्रित जनसंख्या गुणोत्तर श्रेणी (Geometric Progression) में बढ़ती है जबकि खाद्यान्न केवल समांतर श्रेणी में बढ़ता है।",
        "correct": 0
      }
    }
  },
  {
    "class": "12th",
    "subject": "sociology",
    "topic": "Social Movements / चिपको आंदोलन",
    "loc": {
      "bilingual-hindi": {
        "q": "वनों की कटाई रोकने के लिए 1973 में उत्तराखंड (तत्कालीन चमोली जनपद) में प्रसिद्ध 'चिपको आंदोलन' का नेतृत्व किसने किया था?",
        "sub": "Who was the foremost leader of the 1973 Chipko Movement to save trees in Uttarakhand?",
        "options": [
          "A) मेधा पाटकर",
          "B) सुंदरलाल बहुगुणा एवं चंडी प्रसाद भट्ट",
          "C) बाबा आम्टे",
          "D) अरुंधति रॉय"
        ],
        "ans": "B) सुंदरलाल बहुगुणा एवं चंडी प्रसाद भट्ट",
        "exp": "💡 सही उत्तर: B) सुंदरलाल बहुगुणा। ग्रामीणों व महिलाओं (गौरा देवी) ने पेड़ों से चिपककर ठेकेदारों द्वारा वृक्ष कटाई का अहिंसक विरोध किया था।",
        "correct": 1
      },
      "english": {
        "q": "Who was the foremost leader of the 1973 Chipko Movement to save trees in Uttarakhand?",
        "sub": "Class 12th SOCIOLOGY - Official Syllabus Target",
        "options": [
          "A) मेधा पाटकर",
          "B) सुंदरलाल बहुगुणा एवं चंडी प्रसाद भट्ट",
          "C) बाबा आम्टे",
          "D) अरुंधति रॉय"
        ],
        "ans": "B) सुंदरलाल बहुगुणा एवं चंडी प्रसाद भट्ट",
        "exp": "💡 सही उत्तर: B) सुंदरलाल बहुगुणा। ग्रामीणों व महिलाओं (गौरा देवी) ने पेड़ों से चिपककर ठेकेदारों द्वारा वृक्ष कटाई का अहिंसक विरोध किया था।",
        "correct": 1
      }
    }
  },
  {
    "class": "12th",
    "subject": "sociology",
    "topic": "Caste / अस्पृश्यता उन्मूलन",
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय संविधान के किस अनुच्छेद द्वारा 'अस्पृश्यता का अंत' (Abolition of Untouchability) कर इसे दंडनीय अपराध घोषित किया गया?",
        "sub": "Under which Article of the Constitution is Untouchability abolished and its practice forbidden?",
        "options": [
          "A) अनुच्छेद 14",
          "B) अनुच्छेद 15",
          "C) अनुच्छेद 17 (अस्पृश्यता का उन्मूलन)",
          "D) अनुच्छेद 19"
        ],
        "ans": "C) अनुच्छेद 17 (अस्पृश्यता का उन्मूलन)",
        "exp": "💡 सही उत्तर: C) अनुच्छेद 17। अनुच्छेद 17 अस्पृश्यता को किसी भी रूप में आचरण करने पर पूर्ण प्रतिबंध लगाता है।",
        "correct": 2
      },
      "english": {
        "q": "Under which Article of the Constitution is Untouchability abolished and its practice forbidden?",
        "sub": "Class 12th SOCIOLOGY - Official Syllabus Target",
        "options": [
          "A) अनुच्छेद 14",
          "B) अनुच्छेद 15",
          "C) अनुच्छेद 17 (अस्पृश्यता का उन्मूलन)",
          "D) अनुच्छेद 19"
        ],
        "ans": "C) अनुच्छेद 17 (अस्पृश्यता का उन्मूलन)",
        "exp": "💡 सही उत्तर: C) अनुच्छेद 17। अनुच्छेद 17 अस्पृश्यता को किसी भी रूप में आचरण करने पर पूर्ण प्रतिबंध लगाता है।",
        "correct": 2
      }
    }
  }
];

// Helper: Shuffles array in-place using Fisher-Yates algorithm
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getSubjectDisplayName(subjectKey = "") {
  const map = {
    math: "📐 गणित (Mathematics)",
    quant: "📐 Quantitative Aptitude",
    science: "⚡ विज्ञान (General Science)",
    physics: "⚡ भौतिक विज्ञान (Physics)",
    chemistry: "🧪 रसायन विज्ञान (Chemistry)",
    biology: "🧬 जीव विज्ञान (Biology)",
    social: "🌍 सामाजिक विज्ञान (Social Science)",
    history: "🏛️ इतिहास (History)",
    polity: "⚖️ राजनीति विज्ञान (Polity & Constitution)",
    geography: "🗺️ भूगोल (Geography)",
    economics: "📈 अर्थशास्त्र (Economics)",
    accountancy: "📊 लेखाशास्त्र (Accountancy)",
    business: "🏢 व्यावसायिक अध्ययन (Business Studies)",
    entrepreneurship: "💡 उद्यमिता (Entrepreneurship)",
    sociology: "👥 समाजशास्त्र (Sociology)",
    hindi: "📖 सामान्य हिन्दी (Hindi)",
    english: "📖 General English",
    reasoning: "🧠 तर्कशक्ति (Reasoning Ability)",
    gk: "🏛️ सामान्य ज्ञान (GK & Current Affairs)",
    tech: "🛠️ Basic Science & Engineering"
  };
  return map[subjectKey.toLowerCase()] || (subjectKey ? subjectKey.toUpperCase() : "General Target");
}

// Generate fully localized questions for any of the 20 Indian Boards
// Helper to retrieve the High-Yield Master Question Banks (10th, 12th Streams & Competitive)
function getHighYieldVault() {
  if (typeof window !== 'undefined') {
    return {
      // 10th Core Banks
      hindi: window.HIGH_YIELD_HINDI_BANK || (typeof HIGH_YIELD_HINDI_BANK !== 'undefined' ? HIGH_YIELD_HINDI_BANK : []),
      math: window.HIGH_YIELD_MATH_BANK || (typeof HIGH_YIELD_MATH_BANK !== 'undefined' ? HIGH_YIELD_MATH_BANK : []),
      science: window.HIGH_YIELD_SCIENCE_BANK || (typeof HIGH_YIELD_SCIENCE_BANK !== 'undefined' ? HIGH_YIELD_SCIENCE_BANK : []),
      social: window.HIGH_YIELD_SOCIAL_BANK || (typeof HIGH_YIELD_SOCIAL_BANK !== 'undefined' ? HIGH_YIELD_SOCIAL_BANK : []),
      english: window.HIGH_YIELD_ENGLISH_BANK || (typeof HIGH_YIELD_ENGLISH_BANK !== 'undefined' ? HIGH_YIELD_ENGLISH_BANK : []),
      sanskrit: window.HIGH_YIELD_SANSKRIT_BANK || (typeof HIGH_YIELD_SANSKRIT_BANK !== 'undefined' ? HIGH_YIELD_SANSKRIT_BANK : []),
      // 12th Stream-Specific Banks
      physics: window.CLASS12_PHYSICS_BANK || (typeof CLASS12_PHYSICS_BANK !== 'undefined' ? CLASS12_PHYSICS_BANK : []),
      chemistry: window.CLASS12_CHEMISTRY_BANK || (typeof CLASS12_CHEMISTRY_BANK !== 'undefined' ? CLASS12_CHEMISTRY_BANK : []),
      biology: window.CLASS12_BIOLOGY_BANK || (typeof CLASS12_BIOLOGY_BANK !== 'undefined' ? CLASS12_BIOLOGY_BANK : []),
      math12: window.CLASS12_MATH_BANK || (typeof CLASS12_MATH_BANK !== 'undefined' ? CLASS12_MATH_BANK : []),
      accountancy: window.CLASS12_ACCOUNTANCY_BANK || (typeof CLASS12_ACCOUNTANCY_BANK !== 'undefined' ? CLASS12_ACCOUNTANCY_BANK : []),
      business: window.CLASS12_BUSINESS_BANK || (typeof CLASS12_BUSINESS_BANK !== 'undefined' ? CLASS12_BUSINESS_BANK : []),
      economics: window.CLASS12_ECONOMICS_BANK || (typeof CLASS12_ECONOMICS_BANK !== 'undefined' ? CLASS12_ECONOMICS_BANK : []),
      history: window.CLASS12_HISTORY_BANK || (typeof CLASS12_HISTORY_BANK !== 'undefined' ? CLASS12_HISTORY_BANK : []),
      polity: window.CLASS12_POLITY_BANK || (typeof CLASS12_POLITY_BANK !== 'undefined' ? CLASS12_POLITY_BANK : []),
      geography: window.CLASS12_GEOGRAPHY_BANK || (typeof CLASS12_GEOGRAPHY_BANK !== 'undefined' ? CLASS12_GEOGRAPHY_BANK : []),
      // Competitive Banks
      reasoning: window.COMPETITIVE_REASONING_BANK || (typeof COMPETITIVE_REASONING_BANK !== 'undefined' ? COMPETITIVE_REASONING_BANK : []),
      compMath: window.COMPETITIVE_MATH_BANK || (typeof COMPETITIVE_MATH_BANK !== 'undefined' ? COMPETITIVE_MATH_BANK : []),
      compLaw: window.UP_POLICE_LAW_SPECIAL_BANK || (typeof UP_POLICE_LAW_SPECIAL_BANK !== 'undefined' ? UP_POLICE_LAW_SPECIAL_BANK : []),
      compTech: window.RAILWAY_SCIENCE_TECH_BANK || (typeof RAILWAY_SCIENCE_TECH_BANK !== 'undefined' ? RAILWAY_SCIENCE_TECH_BANK : []),
      compGk: window.COMPETITIVE_GK_GS_BANK || (typeof COMPETITIVE_GK_GS_BANK !== 'undefined' ? COMPETITIVE_GK_GS_BANK : [])
    };
  }
  if (typeof require !== 'undefined') {
    let hy10 = {}, hyComp = {}, hy12 = {};
    try { hy10 = require('./master-high-yield-bank'); } catch (e) {
      try { hy10 = require('./public/js/master-high-yield-bank'); } catch (e2) {}
    }
    try { hyComp = require('./master-competitive-bank'); } catch (e) {
      try { hyComp = require('./public/js/master-competitive-bank'); } catch (e2) {}
    }
    try { hy12 = require('./master-class12-bank'); } catch (e) {
      try { hy12 = require('./public/js/master-class12-bank'); } catch (e2) {}
    }
    return {
      hindi: hy10.HIGH_YIELD_HINDI_BANK || [],
      math: hy10.HIGH_YIELD_MATH_BANK || [],
      science: hy10.HIGH_YIELD_SCIENCE_BANK || [],
      social: hy10.HIGH_YIELD_SOCIAL_BANK || [],
      english: hy10.HIGH_YIELD_ENGLISH_BANK || [],
      sanskrit: hy10.HIGH_YIELD_SANSKRIT_BANK || [],
      physics: hy12.CLASS12_PHYSICS_BANK || [],
      chemistry: hy12.CLASS12_CHEMISTRY_BANK || [],
      biology: hy12.CLASS12_BIOLOGY_BANK || [],
      math12: hy12.CLASS12_MATH_BANK || [],
      accountancy: hy12.CLASS12_ACCOUNTANCY_BANK || [],
      business: hy12.CLASS12_BUSINESS_BANK || [],
      economics: hy12.CLASS12_ECONOMICS_BANK || [],
      history: hy12.CLASS12_HISTORY_BANK || [],
      polity: hy12.CLASS12_POLITY_BANK || [],
      geography: hy12.CLASS12_GEOGRAPHY_BANK || [],
      reasoning: hyComp.COMPETITIVE_REASONING_BANK || [],
      compMath: hyComp.COMPETITIVE_MATH_BANK || [],
      compLaw: hyComp.UP_POLICE_LAW_SPECIAL_BANK || [],
      compTech: hyComp.RAILWAY_SCIENCE_TECH_BANK || [],
      compGk: hyComp.COMPETITIVE_GK_GS_BANK || []
    };
  }
  return {};
}

// Generate fully localized questions for any of the 20 Indian Boards
// Guarantees zero repetition for tests up to 80 questions and strict subject isolation (Hindi only loads Hindi)
function getBoardLocalizedQuestions(boardId = "bseb", classLevel = "10th", subjectId = "all", requestedCount = 30, stream = "science") {
  const b = BOARD_METADATA[boardId] || BOARD_METADATA["bseb"];
  const langMode = b.langMode || "bilingual-hindi";
  const vault = getHighYieldVault();

  const formatHyItem = (item, subKey, idx) => ({
    id: `${b.id}-${classLevel}-${subKey}-${idx + 1}`,
    uniqueKey: `${b.id}-${classLevel}-${subKey}-${idx + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    examTags: [classLevel === "12th" ? `board-12th-${stream}` : "board-10th"],
    subjectTags: [subKey],
    subjectName: getSubjectDisplayName(subKey),
    q: item.q,
    options: [...item.options],
    correct: item.correct !== undefined ? item.correct : 0,
    ans: item.ans,
    explanation: item.exp || item.explanation,
    topic: `${item.topic} (${b.name})`,
    boardTag: b.name
  });

  const normSub = (subjectId || 'all').toLowerCase();

  // 1. STRICT SUBJECT-SPECIFIC SELECTION: 10th & 12th Streams (Science, Commerce, Arts)
  // Completely prevents fallback to other subjects. If user picks Accountancy, they get pure Accountancy!
  let specificBank = null;
  let cleanSub = normSub;

  if (classLevel === '12th') {
    if (normSub === 'physics' || normSub.includes('physics') || normSub.includes('भौतिक')) {
      specificBank = vault.physics;
      cleanSub = 'physics';
    } else if (normSub === 'chemistry' || normSub.includes('chemistry') || normSub.includes('रसायन')) {
      specificBank = vault.chemistry;
      cleanSub = 'chemistry';
    } else if (normSub === 'biology' || normSub.includes('biology') || normSub.includes('जीव विज्ञान') || normSub.includes('bio')) {
      specificBank = vault.biology;
      cleanSub = 'biology';
    } else if (normSub === 'math' || normSub.includes('math') || normSub.includes('गणित')) {
      specificBank = (vault.math12 && vault.math12.length > 0) ? vault.math12 : vault.math;
      cleanSub = 'math';
    } else if (normSub === 'accountancy' || normSub.includes('account') || normSub.includes('लेखाशास्त्र')) {
      specificBank = vault.accountancy;
      cleanSub = 'accountancy';
    } else if (normSub === 'business' || normSub.includes('business') || normSub.includes('व्यवसाय') || normSub.includes('bst')) {
      specificBank = vault.business;
      cleanSub = 'business';
    } else if (normSub === 'economics' || normSub.includes('econom') || normSub.includes('अर्थशास्त्र')) {
      specificBank = vault.economics;
      cleanSub = 'economics';
    } else if (normSub === 'history' || normSub.includes('history') || normSub.includes('इतिहास')) {
      specificBank = vault.history;
      cleanSub = 'history';
    } else if (normSub === 'polity' || normSub.includes('polity') || normSub.includes('राजनीति') || normSub.includes('political')) {
      specificBank = vault.polity;
      cleanSub = 'polity';
    } else if (normSub === 'geography' || normSub.includes('geograph') || normSub.includes('भूगोल')) {
      specificBank = vault.geography;
      cleanSub = 'geography';
    } else if (normSub === 'hindi' || normSub.includes('hindi') || normSub.includes('हिन्दी')) {
      specificBank = vault.hindi;
      cleanSub = 'hindi';
    } else if (normSub === 'english' || normSub.includes('english') || normSub.includes('अंग्रेजी')) {
      specificBank = vault.english;
      cleanSub = 'english';
    }
  } else {
    // 10th Core subjects
    if (normSub === 'hindi' || normSub.includes('hindi') || normSub.includes('हिन्दी')) {
      specificBank = vault.hindi;
      cleanSub = 'hindi';
    } else if (normSub === 'math' || normSub.includes('math') || normSub.includes('गणित') || normSub.includes('quant')) {
      specificBank = vault.math;
      cleanSub = 'math';
    } else if (normSub === 'science' || normSub.includes('science') || normSub.includes('विज्ञान')) {
      specificBank = vault.science;
      cleanSub = 'science';
    } else if (normSub === 'social' || normSub.includes('social') || normSub.includes('सामाजिक') || normSub.includes('sst')) {
      specificBank = vault.social;
      cleanSub = 'social';
    } else if (normSub === 'english' || normSub.includes('english') || normSub.includes('अंग्रेजी')) {
      specificBank = vault.english;
      cleanSub = 'english';
    } else if (normSub === 'sanskrit' || normSub.includes('sanskrit') || normSub.includes('संस्कृत')) {
      specificBank = vault.sanskrit;
      cleanSub = 'sanskrit';
    }
  }

  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const seenTitles = new Set();
    for (let i = 0; i < shuffledBank.length && result.length < requestedCount; i++) {
      const item = shuffledBank[i];
      const cleanTitle = (item.q || '').split('\n')[0].trim();
      if (!seenTitles.has(cleanTitle)) {
        seenTitles.add(cleanTitle);
        result.push(formatHyItem(item, cleanSub, result.length));
      }
    }
    return result;
  }

  // 2. ALL SUBJECTS (Class 12th): Interleave strictly within chosen stream (Science, Commerce, Arts)
  if (normSub === 'all' && classLevel === '12th') {
    let streamBanks = [];
    if (stream === 'commerce') {
      streamBanks = [
        { name: 'accountancy', list: vault.accountancy },
        { name: 'business', list: vault.business },
        { name: 'economics', list: vault.economics },
        { name: 'hindi', list: vault.hindi },
        { name: 'english', list: vault.english }
      ];
    } else if (stream === 'arts') {
      streamBanks = [
        { name: 'history', list: vault.history },
        { name: 'polity', list: vault.polity },
        { name: 'geography', list: vault.geography },
        { name: 'economics', list: vault.economics },
        { name: 'hindi', list: vault.hindi },
        { name: 'english', list: vault.english }
      ];
    } else {
      // science
      streamBanks = [
        { name: 'physics', list: vault.physics },
        { name: 'chemistry', list: vault.chemistry },
        { name: 'biology', list: vault.biology },
        { name: 'math', list: (vault.math12 && vault.math12.length > 0) ? vault.math12 : vault.math },
        { name: 'hindi', list: vault.hindi },
        { name: 'english', list: vault.english }
      ];
    }
    const activeBanks = streamBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      activeBanks.forEach(b => { b.shuffled = shuffleArray([...b.list]); });
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      const totalAvailable = activeBanks.reduce((sum, b) => sum + b.shuffled.length, 0);
      const targetCount = Math.min(requestedCount, totalAvailable);
      let attempts = 0;

      const seenTitles = new Set();
      while (result.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          counters[sub]++;
          const cleanTitle = (item.q || '').split('\n')[0].trim();
          if (!seenTitles.has(cleanTitle)) {
            seenTitles.add(cleanTitle);
            result.push(formatHyItem(item, sub, result.length));
          }
        }
        bIdx++;
      }
      return result;
    }
  }

  // 2. ALL SUBJECTS (Class 10th): Interleave balanced questions across all 6 core subjects (510+ pool)
  // Ensures 30, 50, 80 question tests have zero repetition and even distribution
  if (normSub === 'all' && classLevel === '10th') {
    const bHindi = shuffleArray([...(vault.hindi || [])]);
    const bMath = shuffleArray([...(vault.math || [])]);
    const bSci = shuffleArray([...(vault.science || [])]);
    const bSoc = shuffleArray([...(vault.social || [])]);
    const bEng = shuffleArray([...(vault.english || [])]);
    const bSkt = shuffleArray([...(vault.sanskrit || [])]);

    const banks = [
      { name: 'hindi', list: bHindi },
      { name: 'math', list: bMath },
      { name: 'science', list: bSci },
      { name: 'social', list: bSoc },
      { name: 'english', list: bEng },
      { name: 'sanskrit', list: bSkt }
    ];

    const result = [];
    let bIdx = 0;
    const counters = { hindi: 0, math: 0, science: 0, social: 0, english: 0, sanskrit: 0 };
    const totalAvailable = banks.reduce((sum, b) => sum + b.list.length, 0);
    const targetCount = Math.min(requestedCount, totalAvailable);
    let attempts = 0;

    const seenTitles = new Set();
    while (result.length < targetCount && attempts < targetCount * 5) {
      attempts++;
      const bEntry = banks[bIdx % banks.length];
      const sub = bEntry.name;
      const list = bEntry.list;
      if (list && counters[sub] < list.length) {
        const item = list[counters[sub]];
        counters[sub]++;
        const cleanTitle = (item.q || '').split('\n')[0].trim();
        if (!seenTitles.has(cleanTitle)) {
          seenTitles.add(cleanTitle);
          result.push(formatHyItem(item, sub, result.length));
        }
      }
      bIdx++;
    }
    return result;
  }

  // 3. Fallback / Class 12th Specialized Streams (Physics, Chemistry, Biology, Commerce, Arts)
  let candidates = CLIENT_BLUEPRINTS.filter(bp => {
    const classMatch = (classLevel === "12th") ? bp.class === "12th" : bp.class === "10th";
    let subMatch = false;
    
    if (subjectId === "all") {
      if (classLevel === "10th") {
        subMatch = true;
      } else {
        if (stream === "commerce") {
          subMatch = ["accountancy", "business", "economics", "hindi", "english", "entrepreneurship"].includes(bp.subject);
        } else if (stream === "arts") {
          subMatch = ["history", "polity", "geography", "sociology", "economics", "hindi", "english"].includes(bp.subject);
        } else {
          subMatch = ["physics", "chemistry", "math", "biology", "hindi", "english"].includes(bp.subject);
        }
      }
    } else {
      subMatch = (bp.subject === subjectId);
    }
    return classMatch && subMatch;
  });

  if (candidates.length === 0 && subjectId !== "all") {
    candidates = CLIENT_BLUEPRINTS.filter(bp => bp.subject === subjectId);
  }
  if (candidates.length === 0) {
    candidates = CLIENT_BLUEPRINTS.filter(bp => bp.class === classLevel);
  }
  if (candidates.length === 0) candidates = CLIENT_BLUEPRINTS;

  let pool = [...candidates];
  shuffleArray(pool);

  const result = [];
  let idx = 0;
  const count = Math.min(requestedCount, pool.length);
  while (result.length < count) {
    const bp = pool[idx];
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const subName = getSubjectDisplayName(bp.subject);

    let qText = loc.q;
    if (loc.sub && langMode !== "english") {
      qText += `\n[${loc.sub}]`;
    } else if (loc.sub && langMode === "english") {
      qText += `\n[${b.name} Class ${classLevel} - High Yield Model]`;
    }

    result.push({
      id: `${b.id}-${classLevel}-${subjectId}-${result.length + 1}`,
      uniqueKey: `${b.id}-${classLevel}-${result.length + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      examTags: [classLevel === "12th" ? `board-12th-${stream}` : "board-10th"],
      subjectTags: [bp.subject],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 1,
      ans: loc.ans,
      explanation: loc.exp,
      topic: `${bp.topic} (${b.name})`,
      boardTag: b.name
    });
    idx++;
  }

  return result;
}

// ================= COMPETITIVE, POLICE, DEFENCE, ENTRANCE & TEACHING BLUEPRINTS =================
// Full Localization: Marathi (Maharashtra Police), Bengali (WB Police), English (CLAT), Bilingual Hindi+English
const COMPETITIVE_BLUEPRINTS = [
  {
    "id": "cmp-polity-14",
    "topic": "Constitution & Polity (राजव्यवस्था)",
    "subjectTags": [
      "gk",
      "polity",
      "law",
      "legal",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय संविधान के किस अनुच्छेद के तहत 'विधि के समक्ष समानता' (Equality before Law) का मौलिक अधिकार वर्णित है?",
        "sub": "Under which Article of the Constitution is 'Equality before Law' guaranteed?",
        "options": [
          "A) अनुच्छेद 14 (Article 14)",
          "B) अनुच्छेद 19 (Article 19)",
          "C) अनुच्छेद 21 (Article 21)",
          "D) अनुच्छेद 32 (Article 32)"
        ],
        "correct": 0,
        "ans": "A) अनुच्छेद 14 (Article 14)",
        "exp": "💡 सही उत्तर: A) अनुच्छेद 14। संविधान के भाग 3 में अनुच्छेद 14 यह घोषणा करता है कि राज्य भारत के राज्यक्षेत्र में किसी व्यक्ति को विधि के समक्ष समानता या विधियों के समान संरक्षण से वंचित नहीं करेगा।"
      },
      "bilingual-marathi": {
        "q": "भारतीय राज्यघटनेच्या कोणत्या कलमांतर्गत 'कायद्यापुढे समानता' (Equality before Law) हा मूलभूत हक्क प्रदान करण्यात आला आहे?",
        "sub": "Under which Article of the Constitution is 'Equality before Law' guaranteed?",
        "options": [
          "A) कलम 14 (Article 14)",
          "B) कलम 19 (Article 19)",
          "C) कलम 21 (Article 21)",
          "D) कलम 32 (Article 32)"
        ],
        "correct": 0,
        "ans": "A) कलम 14 (Article 14)",
        "exp": "💡 अचूक उत्तर: A) कलम 14. राज्यघटनेच्या भाग 3 मधील कलम 14 अन्वये भारताच्या राज्यक्षेत्रात कोणालाही कायद्यापुढे समानता किंवा कायद्याचे समान संरक्षण नाकारले जाणार नाही."
      },
      "bilingual-bengali": {
        "q": "ভারতীয় সংবিধানের কোন ধারায় 'আইনের দৃষ্টিতে সমতা' (Equality before Law) মৌলিক অধিকার হিসেবে বর্ণিত হয়েছে?",
        "sub": "Under which Article of the Constitution is 'Equality before Law' guaranteed?",
        "options": [
          "A) ধারা 14 (Article 14)",
          "B) ধারা 19 (Article 19)",
          "C) ধারা 21 (Article 21)",
          "D) ধারা 32 (Article 32)"
        ],
        "correct": 0,
        "ans": "A) ধারা 14 (Article 14)",
        "exp": "💡 সঠিক উত্তর: A) ধারা 14। ভারতীয় সংবিধানের তৃতীয় অংশে 14 নম্বর ধারা অনুযায়ী রাষ্ট্রের ভূখণ্ডের মধ্যে সকল ব্যক্তি আইনের দৃষ্টিতে সমান।"
      },
      "english": {
        "q": "Under which Article of the Indian Constitution is 'Equality before Law' guaranteed as a Fundamental Right?",
        "sub": "CLAT Legal Aptitude & Constitutional Principles",
        "options": [
          "A) Article 14",
          "B) Article 19",
          "C) Article 21",
          "D) Article 32"
        ],
        "correct": 0,
        "ans": "A) Article 14",
        "exp": "💡 Correct Answer: A) Article 14. Article 14 guarantees equality before the law and equal protection of the laws to all persons within the territory of India."
      }
    }
  },
  {
    "id": "cmp-polity-21",
    "topic": "Constitution & Fundamental Rights (मौलिक अधिकार)",
    "subjectTags": [
      "gk",
      "polity",
      "law",
      "legal",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "संविधान का कौन सा अनुच्छेद 'प्राण एवं दैहिक स्वतंत्रता के संरक्षण' (Protection of Life & Personal Liberty) की गारंटी देता है?",
        "sub": "Which Article guarantees protection of life and personal liberty?",
        "options": [
          "A) अनुच्छेद 19",
          "B) अनुच्छेद 21 (Article 21)",
          "C) अनुच्छेद 25",
          "D) अनुच्छेद 29"
        ],
        "correct": 1,
        "ans": "B) अनुच्छेद 21 (Article 21)",
        "exp": "💡 सही उत्तर: B) अनुच्छेद 21। मेनका गांधी वाद (1978) एवं पुट्टास्वामी वाद (2017) में सर्वोच्च न्यायालय ने इसके तहत निजता के अधिकार व गरिमापूर्ण जीवन को मान्यता दी।"
      },
      "bilingual-marathi": {
        "q": "राज्यघटनेचे कोणते कलम 'जीविताचे व वैयक्तिक स्वातंत्र्याचे रक्षण' (Protection of Life & Personal Liberty) प्रदान करते?",
        "sub": "Which Article guarantees protection of life and personal liberty?",
        "options": [
          "A) कलम 19",
          "B) कलम 21 (Article 21)",
          "C) कलम 25",
          "D) कलम 29"
        ],
        "correct": 1,
        "ans": "B) कलम 21 (Article 21)",
        "exp": "💡 अचूक उत्तर: B) कलम 21. सर्वोच्च न्यायालयाच्या विविध निकालांनुसार सन्मानाने जगण्याचा हक्क आणि गोपनीयतेचा हक्क कलम 21 चा अविभाज्य भाग आहे."
      },
      "bilingual-bengali": {
        "q": "সংবিধানের কোন ধারা 'জীবন ও ব্যক্তিগত স্বাধীনতার সুরক্ষা' (Protection of Life & Personal Liberty) নিশ্চিত করে?",
        "sub": "Which Article guarantees protection of life and personal liberty?",
        "options": [
          "A) ধারা 19",
          "B) ধারা 21 (Article 21)",
          "C) ধারা 25",
          "D) ধারা 29"
        ],
        "correct": 1,
        "ans": "B) ধারা 21 (Article 21)",
        "exp": "💡 সঠিক উত্তর: B) ধারা 21। মেনকা গান্ধী ও পুট্টাস্বামী মামলার মাধ্যমে এই ধারার পরিধি অভূতপূর্বভাবে প্রসারিত হয়েছে।"
      },
      "english": {
        "q": "Which Article of the Indian Constitution provides the 'Protection of Life and Personal Liberty'?",
        "sub": "Constitutional Law & Landmark Judgments",
        "options": [
          "A) Article 19",
          "B) Article 21",
          "C) Article 25",
          "D) Article 29"
        ],
        "correct": 1,
        "ans": "B) Article 21",
        "exp": "💡 Correct Answer: B) Article 21. Interpreted broadly in Maneka Gandhi (1978) and K.S. Puttaswamy (2017) to include the right to privacy and human dignity."
      }
    }
  },
  {
    "id": "cmp-polity-32",
    "topic": "Constitutional Remedies (संवैधानिक उपचार)",
    "subjectTags": [
      "gk",
      "polity",
      "law",
      "legal",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "डॉ. बी.आर. आंबेडकर ने किस अनुच्छेद को 'संविधान का हृदय एवं आत्मा' (Heart and Soul of the Constitution) कहा था?",
        "sub": "Which Article was termed 'Heart & Soul of Constitution' by Dr. Ambedkar?",
        "options": [
          "A) अनुच्छेद 14",
          "B) अनुच्छेद 19",
          "C) अनुच्छेद 32 (Article 32)",
          "D) अनुच्छेद 356"
        ],
        "correct": 2,
        "ans": "C) अनुच्छेद 32 (Article 32)",
        "exp": "💡 सही उत्तर: C) अनुच्छेद 32। अनुच्छेद 32 के तहत नागरिकों को मौलिक अधिकारों के प्रवर्तन हेतु सीधे सर्वोच्च न्यायालय में रिट (बन्दी प्रत्यक्षीकरण, परमादेश आदि) याचिका दायर करने का अधिकार है।"
      },
      "bilingual-marathi": {
        "q": "डॉ. बाबासाहेब आंबेडकरांनी कोणत्या कलमास 'घटनेचा आत्मा व हृदय' म्हटले आहे?",
        "sub": "Which Article was called 'Heart and Soul' by Dr. B.R. Ambedkar?",
        "options": [
          "A) कलम 14",
          "B) कलम 19",
          "C) कलम 32 (Article 32)",
          "D) कलम 356"
        ],
        "correct": 2,
        "ans": "C) कलम 32 (Article 32)",
        "exp": "💡 अचूक उत्तर: C) कलम 32. मूलभूत हक्कांच्या संरक्षणासाठी सर्वोच्च न्यायालयात दाद मागण्याचा अधिकार या कलमाने मिळतो."
      },
      "bilingual-bengali": {
        "q": "ড. বি.আর. আম্বেদকর কোন ধারাটিকে 'সংবিধানের হৃদয় ও আত্মা' বলে অভিহিত করেছিলেন?",
        "sub": "Heart and Soul of the Constitution by Dr. B.R. Ambedkar:",
        "options": [
          "A) ধারা 14",
          "B) ধারা 19",
          "C) ধারা 32 (Article 32)",
          "D) ধারা 356"
        ],
        "correct": 2,
        "ans": "C) ধারা 32 (Article 32)",
        "exp": "💡 সঠিক উত্তর: C) ধারা 32। নাগরিকদের মৌলিক অধিকার ক্ষুণ্ণ হলে এই ধারার মাধ্যমে সরাসরি সুপ্রিম কোর্টে রিট দাখিল করা যায়।"
      },
      "english": {
        "q": "Which Article of the Constitution was called the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar?",
        "sub": "Constitutional Remedies & Supreme Court Writs",
        "options": [
          "A) Article 14",
          "B) Article 19",
          "C) Article 32",
          "D) Article 356"
        ],
        "correct": 2,
        "ans": "C) Article 32",
        "exp": "💡 Correct Answer: C) Article 32. It confers the right to move the Supreme Court by appropriate proceedings for the enforcement of Fundamental Rights."
      }
    }
  },
  {
    "id": "cmp-polity-73",
    "topic": "Panchayati Raj & Local Governance (पंचायती राज)",
    "subjectTags": [
      "gk",
      "polity",
      "law",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "73वें संविधान संशोधन अधिनियम (1992) द्वारा संविधान में कौन सी अनुसूची जोड़ी गई थी?",
        "sub": "Which Schedule was added by the 73rd Amendment Act 1992?",
        "options": [
          "A) 9वीं अनुसूची",
          "B) 10वीं अनुसूची",
          "C) 11वीं अनुसूची (11th Schedule - 29 विषय)",
          "D) 12वीं अनुसूची"
        ],
        "correct": 2,
        "ans": "C) 11वीं अनुसूची (11th Schedule)",
        "exp": "💡 सही उत्तर: C) 11वीं अनुसूची। 73वें संशोधन द्वारा पंचायती राज संस्थाओं को संवैधानिक दर्जा दिया गया तथा 11वीं अनुसूची में पंचायतों के कार्यक्षेत्र हेतु 29 विषय शामिल किए गए।"
      },
      "bilingual-marathi": {
        "q": "73व्या घटनादुरुस्ती कायदा (1992) द्वारे घटनेत कोणती अनुसूची जोडण्यात आली?",
        "sub": "Which schedule was added by 73rd Constitutional Amendment?",
        "options": [
          "A) 9 वी अनुसूची",
          "B) 10 वी अनुसूची",
          "C) 11 वी अनुसूची (29 विषय)",
          "D) 12 वी अनुसूची"
        ],
        "correct": 2,
        "ans": "C) 11 वी अनुसूची (29 विषय)",
        "exp": "💡 अचूक उत्तर: C) 11 वी अनुसूची. 73व्या घटनादुरुस्तीने पंचायत राज संस्थांना घटनात्मक दर्जा देऊन 11 व्या अनुसूचीमध्ये 29 विषयांचा समावेश केला."
      },
      "bilingual-bengali": {
        "q": "৭৩তম সংবিধান সংশোধন আইন (১৯৯২) দ্বারা সংবিধানে কোন তফসিল যুক্ত করা হয়েছিল?",
        "sub": "73rd Amendment schedule for Panchayati Raj:",
        "options": [
          "A) ৯ম তফসিল",
          "B) ১০ম তফসিল",
          "C) ১১শ তফসিল (29টি বিষয়)",
          "D) ১২শ তফসিল"
        ],
        "correct": 2,
        "ans": "C) ১১শ তফসিল (29টি বিষয়)",
        "exp": "💡 সঠিক উত্তর: C) ১১শ তফসিল। পঞ্চায়েতি রাজ সংস্থাকে সাংবিধানিক স্বীকৃতি দিয়ে ১১শ তফসিলে ২৯টি কার্যক্ষেত্র প্রদান করা হয়।"
      },
      "english": {
        "q": "Which Schedule was inserted into the Indian Constitution by the 73rd Constitutional Amendment Act, 1992?",
        "sub": "Panchayati Raj & Local Self-Government",
        "options": [
          "A) Ninth Schedule",
          "B) Tenth Schedule",
          "C) Eleventh Schedule (29 Functional Items)",
          "D) Twelfth Schedule"
        ],
        "correct": 2,
        "ans": "C) Eleventh Schedule",
        "exp": "💡 Correct Answer: C) Eleventh Schedule. It contains 29 functional items placed within the purview of Panchayats."
      }
    }
  },
  {
    "id": "cmp-math-avgspeed",
    "topic": "Mathematics & Speed Tricks (औसत चाल)",
    "subjectTags": [
      "math",
      "quant",
      "math-reasoning",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "एक व्यक्ति 60 किमी/घंटा की चाल से जाता है और 40 किमी/घंटा से वापस लौटता है। पूरी यात्रा की औसत चाल क्या होगी?",
        "sub": "Average Speed Shortcut: A travels at 60 km/h and returns at 40 km/h.",
        "options": [
          "A) 50 किमी/घंटा",
          "B) 48 किमी/घंटा",
          "C) 45 किमी/घंटा",
          "D) 52 किमी/घंटा"
        ],
        "correct": 1,
        "ans": "B) 48 किमी/घंटा",
        "exp": "💡 सही उत्तर: B) 48 किमी/घंटा।\\n⚡ शॉर्टकट ट्रिक: जब दोनों दिशाओं में दूरी समान हो, औसत चाल = 2xy / (x + y) = 2 × 60 × 40 / (60 + 40) = 4800 / 100 = 48 किमी/घंटा।"
      },
      "bilingual-marathi": {
        "q": "एक व्यक्ती 60 किमी/तास वेगाने जाते आणि 40 किमी/तास वेगाने परत येते. संपूर्ण प्रवासाचा सरासरी वेग किती?",
        "sub": "Average Speed Shortcut: Travels at 60 km/h and returns at 40 km/h.",
        "options": [
          "A) 50 किमी/तास",
          "B) 48 किमी/तास",
          "C) 45 किमी/तास",
          "D) 52 किमी/तास"
        ],
        "correct": 1,
        "ans": "B) 48 किमी/तास",
        "exp": "💡 अचूक उत्तर: B) 48 किमी/तास.\\n⚡ क्लृप्ती: अंतर समान असल्यास, सरासरी वेग = 2xy / (x + y) = 2 × 60 × 40 / 100 = 48 किमी/तास."
      },
      "bilingual-bengali": {
        "q": "এক ব্যক্তি ৬০ কিমি/ঘণ্টা বেগে গিয়ে ৪০ কিমি/ঘণ্টা বেগে ফিরে আসে। সমগ্র যাত্রায় গড় গতিবেগ কত?",
        "sub": "Average speed calculation for equal distance.",
        "options": [
          "A) ৫০ কিমি/ঘণ্টা",
          "B) ৪৮ কিমি/ঘণ্টা",
          "C) ৪৫ কিমি/ঘণ্টা",
          "D) ৫২ কিমি/ঘণ্টা"
        ],
        "correct": 1,
        "ans": "B) ৪৮ কিমি/ঘণ্টা",
        "exp": "💡 সঠিক উত্তর: B) ৪৮ কিমি/ঘণ্টা।\\n⚡ শর্টকাট সূত্র: গড় গতিবেগ = 2xy / (x + y) = (2 × 60 × 40) / 100 = ৪৮ কিমি/ঘণ্টা।"
      },
      "english": {
        "q": "A person travels from A to B at 60 km/h and returns from B to A at 40 km/h. What is the average speed of the entire journey?",
        "sub": "Quantitative Techniques & Speed Arithmetic",
        "options": [
          "A) 50 km/h",
          "B) 48 km/h",
          "C) 45 km/h",
          "D) 52 km/h"
        ],
        "correct": 1,
        "ans": "B) 48 km/h",
        "exp": "💡 Correct Answer: B) 48 km/h.\\n⚡ Shortcut Formula: Average Speed = 2xy / (x + y) = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h."
      }
    }
  },
  {
    "id": "cmp-math-timework",
    "topic": "Time & Work (समय और कार्य)",
    "subjectTags": [
      "math",
      "quant",
      "math-reasoning",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "A किसी कार्य को 12 दिन में तथा B उसी कार्य को 18 दिन में पूरा करता है। दोनों मिलकर उस कार्य को कितने दिन में पूरा करेंगे?",
        "sub": "A finishes work in 12 days, B in 18 days. Both together in how many days?",
        "options": [
          "A) 7.2 दिन",
          "B) 8 दिन",
          "C) 6 दिन",
          "D) 7.5 दिन"
        ],
        "correct": 0,
        "ans": "A) 7.2 दिन",
        "exp": "💡 सही उत्तर: A) 7.2 दिन।\\n⚡ शॉर्टकट सूत्र: समय = (A × B) / (A + B) = (12 × 18) / (12 + 18) = 216 / 30 = 7.2 दिन।"
      },
      "bilingual-marathi": {
        "q": "A एक काम 12 दिवसांत आणि B तेच काम 18 दिवसांत करतो. दोघे मिळून ते काम किती दिवसांत पूर्ण करतील?",
        "sub": "Time & Work shortcut calculation.",
        "options": [
          "A) 7.2 दिवस",
          "B) 8 दिवस",
          "C) 6 दिवस",
          "D) 7.5 दिवस"
        ],
        "correct": 0,
        "ans": "A) 7.2 दिवस",
        "exp": "💡 अचूक उत्तर: A) 7.2 दिवस.\\n⚡ सूत्र: दिवस = (A × B) / (A + B) = (12 × 18) / 30 = 7.2 दिवस."
      },
      "bilingual-bengali": {
        "q": "A একটি কাজ ১২ দিনে এবং B সেই কাজটি ১৮ দিনে করে। উভয় একসাথে কাজটি কত দিনে শেষ করবে?",
        "sub": "Time and work combined shortcut formula.",
        "options": [
          "A) ৭.২ দিন",
          "B) ৮ দিন",
          "C) ৬ দিন",
          "D) ৭.৫ দিন"
        ],
        "correct": 0,
        "ans": "A) ৭.২ দিন",
        "exp": "💡 সঠিক উত্তর: A) ৭.২ দিন।\\n⚡ শর্টকাট: সময় = (A × B) / (A + B) = (১২ × ১৮) / ৩০ = ৭.২ দিন।"
      },
      "english": {
        "q": "A can complete a piece of work in 12 days and B can do it in 18 days. Working together, in how many days will they finish the work?",
        "sub": "Quantitative Aptitude & Time-Work Tricks",
        "options": [
          "A) 7.2 days",
          "B) 8 days",
          "C) 6 days",
          "D) 7.5 days"
        ],
        "correct": 0,
        "ans": "A) 7.2 days",
        "exp": "💡 Correct Answer: A) 7.2 days.\\n⚡ Formula: Combined Days = (A × B) / (A + B) = (12 × 18) / 30 = 7.2 days."
      }
    }
  },
  {
    "id": "cmp-math-cisi",
    "topic": "Simple & Compound Interest (ब्याज अंतर शॉर्टकट)",
    "subjectTags": [
      "math",
      "quant",
      "math-reasoning",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "banking",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "₹10,000 की धनराशि पर 10% वार्षिक ब्याज की दर से 2 वर्ष के चक्रवृद्धि ब्याज और साधारण ब्याज का अंतर क्या होगा?",
        "sub": "Difference between CI and SI on ₹10,000 at 10% for 2 years:",
        "options": [
          "A) ₹50",
          "B) ₹100",
          "C) ₹120",
          "D) ₹150"
        ],
        "correct": 1,
        "ans": "B) ₹100",
        "exp": "💡 सही उत्तर: B) ₹100।\\n⚡ 2 वर्ष के CI और SI के अंतर का रामबाण सूत्र: D = P × (R / 100)² = 10,000 × (10 / 100)² = 10,000 × (1 / 100) = ₹100।"
      },
      "bilingual-marathi": {
        "q": "₹10,000 वर 10% दराने 2 वर्षांचे चक्रवाढ व्याज व सरळ व्याज यातील फरक किती असेल?",
        "sub": "CI vs SI difference on ₹10,000 at 10% for 2 yrs.",
        "options": [
          "A) ₹50",
          "B) ₹100",
          "C) ₹120",
          "D) ₹150"
        ],
        "correct": 1,
        "ans": "B) ₹100",
        "exp": "💡 अचूक उत्तर: B) ₹100.\\n⚡ 2 वर्षांचा फरक: D = P × (R / 100)² = 10000 × (10/100)² = ₹100."
      },
      "bilingual-bengali": {
        "q": "₹১০,০০০ টাকার ওপর ১০% বার্ষিক হারে ২ বছরের চক্রবৃদ্ধি সুদ ও সরল সুদের পার্থক্য কত?",
        "sub": "CI vs SI difference shortcut formula.",
        "options": [
          "A) ₹৫০",
          "B) ₹১০০",
          "C) ₹১২০",
          "D) ₹১৫০"
        ],
        "correct": 1,
        "ans": "B) ₹১০০",
        "exp": "💡 সঠিক উত্তর: B) ₹১০০।\\n⚡ সূত্র: পার্থক্য = P × (R / 100)² = ১০০০০ × (১০/১০০)² = ₹১০০।"
      },
      "english": {
        "q": "What is the difference between Compound Interest and Simple Interest on ₹10,000 for 2 years at 10% per annum?",
        "sub": "Banking & SSC Speed Mathematics",
        "options": [
          "A) ₹50",
          "B) ₹100",
          "C) ₹120",
          "D) ₹150"
        ],
        "correct": 1,
        "ans": "B) ₹100",
        "exp": "💡 Correct Answer: B) ₹100.\\n⚡ 2-Year Difference Formula: D = P × (R / 100)² = 10,000 × (10/100)² = ₹100."
      }
    }
  },
  {
    "id": "cmp-math-profit",
    "topic": "Profit & Loss (लाभ एवं हानि)",
    "subjectTags": [
      "math",
      "quant",
      "math-reasoning",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "banking",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "यदि किसी वस्तु का क्रय मूल्य ₹800 है और उसे ₹960 में बेचा जाता है, तो लाभ प्रतिशत कितना होगा?",
        "sub": "If CP is ₹800 and SP is ₹960, find profit percentage:",
        "options": [
          "A) 15%",
          "B) 20%",
          "C) 25%",
          "D) 18%"
        ],
        "correct": 1,
        "ans": "B) 20%",
        "exp": "💡 सही उत्तर: B) 20%।\\n⚡ लाभ = 960 - 800 = ₹160। लाभ % = (लाभ / क्रय मूल्य) × 100 = (160 / 800) × 100 = 20%।"
      },
      "bilingual-marathi": {
        "q": "एका वस्तूची खरेदी किंमत ₹800 असून ती ₹960 ला विकल्यास शेकडा नफा किती होईल?",
        "sub": "Profit percentage calculation.",
        "options": [
          "A) 15%",
          "B) 20%",
          "C) 25%",
          "D) 18%"
        ],
        "correct": 1,
        "ans": "B) 20%",
        "exp": "💡 अचूक उत्तर: B) 20%.\\n⚡ नफा = 960 - 800 = 160. शेकडा नफा = (160 / 800) × 100 = 20%."
      },
      "bilingual-bengali": {
        "q": "একটি বস্তুর ক্রয়মূল্য ₹৮০০ এবং বিক্রয়মূল্য ₹৯৬০ হলে শতকরা লাভ কত হবে?",
        "sub": "Profit % on CP 800 and SP 960.",
        "options": [
          "A) ১৫%",
          "B) ২০%",
          "C) ২৫%",
          "D) ১৮%"
        ],
        "correct": 1,
        "ans": "B) ২০%",
        "exp": "💡 সঠিক উত্তর: B) ২০%।\\n⚡ লাভ = ১৬০ টাকা। শতকরা লাভ = (১৬০ / ৮০০) × ১০০ = ২০%।"
      },
      "english": {
        "q": "An article bought for ₹800 is sold for ₹960. What is the gain percentage?",
        "sub": "Quantitative Aptitude & Business Arithmetic",
        "options": [
          "A) 15%",
          "B) 20%",
          "C) 25%",
          "D) 18%"
        ],
        "correct": 1,
        "ans": "B) 20%",
        "exp": "💡 Correct Answer: B) 20%.\\n⚡ Profit = 960 - 800 = ₹160. Profit % = (160 / 800) × 100 = 20%."
      }
    }
  },
  {
    "id": "cmp-reasoning-coding",
    "topic": "Reasoning & Mental Ability (कोडिंग-डिकोडिंग)",
    "subjectTags": [
      "reasoning",
      "logical",
      "raga",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "यदि किसी सांकेतिक भाषा में 'PATNA' को 'QBUOB' लिखा जाता है, तो उसी भाषा में 'DELHI' को क्या लिखा जाएगा?",
        "sub": "Coding: If PATNA is coded as QBUOB, how is DELHI coded?",
        "options": [
          "A) EFMIJ",
          "B) EDMIJ",
          "C) EFMIK",
          "D) CFMIJ"
        ],
        "correct": 0,
        "ans": "A) EFMIJ",
        "exp": "💡 सही उत्तर: A) EFMIJ।\\n⚡ लॉजिक: प्रत्येक अक्षर में +1 की वृद्धि हो रही है: D(+1)=E, E(+1)=F, L(+1)=M, H(+1)=I, I(+1)=J। अतः सही कोड EFMIJ है।"
      },
      "bilingual-marathi": {
        "q": "जर सांकेतिक भाषेत 'PATNA' ला 'QBUOB' लिहिले जाते, तर 'DELHI' ला कसे लिहिले जाईल?",
        "sub": "Coding-Decoding logic (+1 shift).",
        "options": [
          "A) EFMIJ",
          "B) EDMIJ",
          "C) EFMIK",
          "D) CFMIJ"
        ],
        "correct": 0,
        "ans": "A) EFMIJ",
        "exp": "💡 अचूक उत्तर: A) EFMIJ.\\n⚡ तर्क: प्रत्येक अक्षरात +1 केले आहे: D->E, E->F, L->M, H->I, I->J."
      },
      "bilingual-bengali": {
        "q": "যদি একটি সংকেত লিপিতে 'PATNA'-কে 'QBUOB' লেখা হয়, তবে 'DELHI'-কে কী লেখা হবে?",
        "sub": "Logical Coding pattern.",
        "options": [
          "A) EFMIJ",
          "B) EDMIJ",
          "C) EFMIK",
          "D) CFMIJ"
        ],
        "correct": 0,
        "ans": "A) EFMIJ",
        "exp": "💡 সঠিক উত্তর: A) EFMIJ।\\n⚡ যুক্তি: প্রতিটি বর্ণে +১ যোগ হয়েছে: D+1=E, E+1=F, L+1=M, H+1=I, I+1=J।"
      },
      "english": {
        "q": "If in a certain code language, 'PATNA' is written as 'QBUOB', how will 'DELHI' be written in that language?",
        "sub": "General Intelligence & Reasoning Ability",
        "options": [
          "A) EFMIJ",
          "B) EDMIJ",
          "C) EFMIK",
          "D) CFMIJ"
        ],
        "correct": 0,
        "ans": "A) EFMIJ",
        "exp": "💡 Correct Answer: A) EFMIJ.\\n⚡ Pattern: Each letter is shifted by +1: D(+1)=E, E(+1)=F, L(+1)=M, H(+1)=I, I(+1)=J."
      }
    }
  },
  {
    "id": "cmp-reasoning-series",
    "topic": "Number Series (संख्या श्रृंखला)",
    "subjectTags": [
      "reasoning",
      "logical",
      "raga",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "दी गई संख्या श्रृंखला में लुप्त पद ज्ञात कीजिए: 2, 6, 12, 20, 30, ?",
        "sub": "Find next term: 2, 6, 12, 20, 30, ?",
        "options": [
          "A) 40",
          "B) 42",
          "C) 44",
          "D) 46"
        ],
        "correct": 1,
        "ans": "B) 42",
        "exp": "💡 सही उत्तर: B) 42।\\n⚡ अंतर श्रृंखला: 6-2=4, 12-6=6, 20-12=8, 30-20=10। अगला अंतर 12 होगा: 30 + 12 = 42 (अथवा n² + n रूप: 1²+1=2, 2²+2=6 ... 6²+6=42)।"
      },
      "bilingual-marathi": {
        "q": "खालील संख्या मालिकेत प्रश्नचिन्हाच्या जागी कोणती संख्या येईल: 2, 6, 12, 20, 30, ?",
        "sub": "Number Series next term.",
        "options": [
          "A) 40",
          "B) 42",
          "C) 44",
          "D) 46"
        ],
        "correct": 1,
        "ans": "B) 42",
        "exp": "💡 अचूक उत्तर: B) 42.\\n⚡ फरक +4, +6, +8, +10, +12 आहे: 30 + 12 = 42."
      },
      "bilingual-bengali": {
        "q": "নিচের সংখ্যা শ্রেণিতে পরবর্তী সংখ্যাটি নির্ণয় করো: ২, ৬, ১২, ২০, ৩০, ?",
        "sub": "Number series difference logic.",
        "options": [
          "A) ৪০",
          "B) ৪২",
          "C) ৪৪",
          "D) ৪৬"
        ],
        "correct": 1,
        "ans": "B) ৪২",
        "exp": "💡 সঠিক উত্তর: B) ৪২।\\n⚡ পার্থক্য: ৪, ৬, ৮, ১০, ১২। সুতরাং ৩০ + ১২ = ৪২।"
      },
      "english": {
        "q": "Find the next number in the given series: 2, 6, 12, 20, 30, ?",
        "sub": "Logical Reasoning & Sequence Analysis",
        "options": [
          "A) 40",
          "B) 42",
          "C) 44",
          "D) 46"
        ],
        "correct": 1,
        "ans": "B) 42",
        "exp": "💡 Correct Answer: B) 42.\\n⚡ Difference sequence: +4, +6, +8, +10, +12. Therefore 30 + 12 = 42 (or n² + n pattern: 6² + 6 = 42)."
      }
    }
  },
  {
    "id": "cmp-reasoning-blood",
    "topic": "Blood Relations (रक्त संबंध)",
    "subjectTags": [
      "reasoning",
      "logical",
      "raga",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "एक तस्वीर की ओर इशारा करते हुए रमेश ने कहा, 'वह मेरे दादाजी के एकमात्र पुत्र की पुत्री है।' वह लड़की रमेश की क्या लगती है?",
        "sub": "Ramesh said: She is daughter of the only son of my grandfather. Relation?",
        "options": [
          "A) बहन (Sister)",
          "B) माता (Mother)",
          "C) चाची (Aunt)",
          "D) पुत्री (Daughter)"
        ],
        "correct": 0,
        "ans": "A) बहन (Sister)",
        "exp": "💡 सही उत्तर: A) बहन।\\n⚡ विश्लेषण: दादाजी का एकमात्र पुत्र = रमेश के पिता। पिता की पुत्री = रमेश की बहन।"
      },
      "bilingual-marathi": {
        "q": "एका छायाचित्राकडे बोट दाखवून रमेश म्हणाला, 'ती माझ्या आजोबांच्या एकुलत्या एक मुलाची मुलगी आहे.' तर ती मुलगी रमेशची कोण?",
        "sub": "Blood relation reasoning.",
        "options": [
          "A) बहीण (Sister)",
          "B) आई (Mother)",
          "C) काकू (Aunt)",
          "D) मुलगी (Daughter)"
        ],
        "correct": 0,
        "ans": "A) बहीण (Sister)",
        "exp": "💡 अचूक उत्तर: A) बहीण. आजोबांचा एकुलता एक मुलगा = रमेशचे वडील. वडिलांची मुलगी = रमेशची बहीण."
      },
      "bilingual-bengali": {
        "q": "একটি ছবির দিকে তাকিয়ে রমেশ বলল, 'সে আমার পিতামহের একমাত্র পুত্রের কন্যা।' মেয়েটি রমেশের কে হয়?",
        "sub": "Blood relation logic.",
        "options": [
          "A) বোন (Sister)",
          "B) মা (Mother)",
          "C) কাকিমা (Aunt)",
          "D) কন্যা (Daughter)"
        ],
        "correct": 0,
        "ans": "A) বোন (Sister)",
        "exp": "💡 সঠিক উত্তর: A) বোন। পিতামহের একমাত্র পুত্র = রমেশের পিতা। পিতার কন্যা = রমেশের বোন।"
      },
      "english": {
        "q": "Pointing to a photograph, Ramesh said, 'She is the daughter of the only son of my grandfather.' How is the girl related to Ramesh?",
        "sub": "Analytical Reasoning & Blood Relations",
        "options": [
          "A) Sister",
          "B) Mother",
          "C) Aunt",
          "D) Daughter"
        ],
        "correct": 0,
        "ans": "A) Sister",
        "exp": "💡 Correct Answer: A) Sister.\\n⚡ Grandfather's only son = Ramesh's father. Father's daughter = Ramesh's sister."
      }
    }
  },
  {
    "id": "cmp-science-bio",
    "topic": "General Science & Biology (मानव शरीर क्रिया विज्ञान)",
    "subjectTags": [
      "science",
      "biology",
      "neet-bio",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "मानव शरीर में रक्त का शुद्धिकरण एवं यूरिया का निस्यंदन (Filtration) मुख्य रूप से किस अंग द्वारा संपन्न होता है?",
        "sub": "Purification of blood and excretion of urea is carried out by which organ?",
        "options": [
          "A) यकृत (Liver)",
          "B) वृक्क / गुर्दा (Kidney - Nephron)",
          "C) हृदय (Heart)",
          "D) फेफड़े (Lungs)"
        ],
        "correct": 1,
        "ans": "B) वृक्क / गुर्दा (Kidney)",
        "exp": "💡 सही उत्तर: B) वृक्क। वृक्क की संरचनात्मक एवं कार्यात्मक इकाई 'नेफ्रॉन' (Nephron) है जो रक्त से यूरिया एवं नाइट्रोजनी अपशिष्टों को छानकर मूत्र का निर्माण करती है।"
      },
      "bilingual-marathi": {
        "q": "मानवी शरीरात रक्ताचे शुद्धीकरण व युरियाचे गाळण कोणत्या अवयवाद्वारे केले जाते?",
        "sub": "Filtration of blood in human body.",
        "options": [
          "A) यकृत (Liver)",
          "B) वृक्क / मूत्रपिंड (Kidney)",
          "C) हृदय (Heart)",
          "D) फुफ्फुसे (Lungs)"
        ],
        "correct": 1,
        "ans": "B) वृक्क / मूत्रपिंड (Kidney)",
        "exp": "💡 अचूक उत्तर: B) वृक्क / मूत्रपिंड. मूत्रपिंडातील नेफ्रॉन हे रक्तातील अपायकारक टाकाऊ पदार्थ गाळून बाहेर टाकतात."
      },
      "bilingual-bengali": {
        "q": "মানবদেহে রক্ত পরিস্রাবণ ও ইউরিয়া নিঃসরণ কোন প্রধান অঙ্গ দ্বারা সম্পন্ন হয়?",
        "sub": "Excretion and blood filtration in humans.",
        "options": [
          "A) যকৃৎ (Liver)",
          "B) বৃক্ক (Kidney - Nephron)",
          "C) হৃৎপিণ্ড (Heart)",
          "D) ফুসফুস (Lungs)"
        ],
        "correct": 1,
        "ans": "B) বৃক্ক (Kidney)",
        "exp": "💡 সঠিক উত্তর: B) বৃক্ক (Kidney)। বৃক্কে অবস্থিত নেফ্রন রক্ত থেকে নাইট্রোজেনঘটিত বর্জ্য ছেঁকে মূত্র উৎপাদন করে।"
      },
      "english": {
        "q": "In the human body, the ultrafiltration of blood and excretion of urea is carried out by which organ?",
        "sub": "Human Physiology & Excretory System (NEET / SSC)",
        "options": [
          "A) Liver",
          "B) Kidney (Nephron)",
          "C) Heart",
          "D) Lungs"
        ],
        "correct": 1,
        "ans": "B) Kidney (Nephron)",
        "exp": "💡 Correct Answer: B) Kidney (Nephron). The nephron is the functional unit of the kidney, responsible for filtering nitrogenous wastes (urea) from the blood."
      }
    }
  },
  {
    "id": "cmp-science-optics",
    "topic": "Physics / Optics (प्रकाशिकी)",
    "subjectTags": [
      "science",
      "physics",
      "jee-physics",
      "tech",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "प्रकाश का वेग सर्वाधिक किस माध्यम में होता है?",
        "sub": "In which medium is the speed of light maximum?",
        "options": [
          "A) कांच (Glass)",
          "B) जल (Water)",
          "C) निर्वात (Vacuum - 3×10⁸ m/s)",
          "D) हीरा (Diamond)"
        ],
        "correct": 2,
        "ans": "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        "exp": "💡 सही उत्तर: C) निर्वात। निर्वात में प्रकाश की चाल 3 × 10⁸ मीटर/सेकंड (3 लाख किमी/सेकंड) होती है, जहाँ अपवर्तनांक 1.0 होता है।"
      },
      "bilingual-marathi": {
        "q": "प्रकाशाचा वेग सर्वाधिक कोणत्या माध्यमात असतो?",
        "sub": "In which medium is speed of light maximum?",
        "options": [
          "A) काच (Glass)",
          "B) पाणी (Water)",
          "C) निर्वात (Vacuum - 3×10⁸ m/s)",
          "D) हिरा (Diamond)"
        ],
        "correct": 2,
        "ans": "C) निर्वात (Vacuum - 3×10⁸ m/s)",
        "exp": "💡 अचूक उत्तर: C) निर्वात. निर्वातात प्रकाशाचा वेग सर्वाधिक 3 × 10⁸ मी/से असतो."
      },
      "bilingual-bengali": {
        "q": "আলোর বেগ কোন মাধ্যমে সর্বাধিক হয়?",
        "sub": "Speed of light maximum in which medium?",
        "options": [
          "A) কাচ",
          "B) জল",
          "C) শূন্য মাধ্যম (Vacuum - 3×10⁸ m/s)",
          "D) হীরা"
        ],
        "correct": 2,
        "ans": "C) শূন্য মাধ্যম (Vacuum - 3×10⁸ m/s)",
        "exp": "💡 সঠিক উত্তর: C) শূন্য মাধ্যম। শূন্য মাধ্যমে আলোর বেগ প্রায় ৩ × ১০⁸ মিটার/সেকেন্ড।"
      },
      "english": {
        "q": "In which medium is the speed of light maximum?",
        "sub": "Optics & Universal Physical Constants",
        "options": [
          "A) Glass",
          "B) Water",
          "C) Vacuum (3 × 10⁸ m/s)",
          "D) Diamond"
        ],
        "correct": 2,
        "ans": "C) Vacuum (3 × 10⁸ m/s)",
        "exp": "💡 Correct Answer: C) Vacuum (3 × 10⁸ m/s). Light travels fastest in a vacuum where the refractive index is 1.0."
      }
    }
  },
  {
    "id": "cmp-science-physics",
    "topic": "General Science & Physics (न्यूटन के गति नियम)",
    "subjectTags": [
      "science",
      "physics",
      "jee-physics",
      "tech",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "रॉकेट प्रक्षेपण (Rocket Propulsion) न्यूटन के किस गति नियम और सिद्धांत पर कार्य करता है?",
        "sub": "Rocket propulsion is based on which Newton's Law?",
        "options": [
          "A) प्रथम नियम",
          "B) द्वितीय नियम",
          "C) तृतीय नियम एवं संवेग संरक्षण (Third Law & Momentum)",
          "D) गुरुत्वाकर्षण नियम"
        ],
        "correct": 2,
        "ans": "C) तृतीय नियम एवं संवेग संरक्षण",
        "exp": "💡 सही उत्तर: C) तृतीय नियम एवं संवेग संरक्षण। रॉकेट से निकलने वाली तीव्र गैसों की प्रतिक्रिया (Action-Reaction) रॉकेट को आगे की ओर त्वरित करती है।"
      },
      "bilingual-marathi": {
        "q": "रॉकेटचे उड्डाण न्यूटनच्या कोणत्या नियमावर आणि तत्त्वावर आधारित आहे?",
        "sub": "Rocket propulsion Newton's law.",
        "options": [
          "A) पहिला नियम",
          "B) दुसरा नियम",
          "C) तिसरा नियम व संवेग अक्षय्यता",
          "D) गुरुत्वाकर्षण नियम"
        ],
        "correct": 2,
        "ans": "C) तिसरा नियम व संवेग अक्षय्यता",
        "exp": "💡 अचूक उत्तर: C) तिसरा नियम व संवेग अक्षय्यता. प्रत्येक क्रियेस समान व विरुद्ध प्रतिक्रिया असते या तत्त्वावर रॉकेट उड्डाण करते."
      },
      "bilingual-bengali": {
        "q": "রকেট উৎক্ষেপণ নিউটনের কোন গতিসূত্র এবং নীতির ওপর ভিত্তি করে পরিচালিত হয়?",
        "sub": "Rocket propulsion Newton's Third Law.",
        "options": [
          "A) প্রথম গতিসূত্র",
          "B) দ্বিতীয় গতিসূত্র",
          "C) তৃতীয় গতিসূত্র ও ভরবেগের সংরক্ষণ",
          "D) মহাকর্ষ সূত্র"
        ],
        "correct": 2,
        "ans": "C) তৃতীয় গতিসূত্র ও ভরবেগের সংরক্ষণ",
        "exp": "💡 সঠিক উত্তর: C) তৃতীয় গতিসূত্র ও ভরবেগের সংরক্ষণ। নির্গত গ্যাসের ক্রিয়া ও সমান বিপরীত প্রতিক্রিয়া রকেটকে এগিয়ে নিয়ে যায়।"
      },
      "english": {
        "q": "The working principle of rocket propulsion is primarily based on which Newton's law?",
        "sub": "Mechanics & Conservation of Momentum",
        "options": [
          "A) First Law of Motion",
          "B) Second Law of Motion",
          "C) Third Law of Motion & Conservation of Linear Momentum",
          "D) Law of Universal Gravitation"
        ],
        "correct": 2,
        "ans": "C) Third Law of Motion",
        "exp": "💡 Correct Answer: C) Third Law of Motion. The expelled exhaust gases exert an equal and opposite reactive force pushing the rocket upward."
      }
    }
  },
  {
    "id": "cmp-history-lahore",
    "topic": "Modern Indian History (आधुनिक भारत का इतिहास)",
    "subjectTags": [
      "gk",
      "history",
      "modern-history",
      "gs",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "entrance",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय राष्ट्रीय कांग्रेस के ऐतिहासिक 1929 के लाहौर अधिवेशन की अध्यक्षता किसने की थी, जिसमें 'पूर्ण स्वराज' का प्रस्ताव पारित हुआ?",
        "sub": "Who presided over 1929 Lahore session where Purna Swaraj was adopted?",
        "options": [
          "A) महात्मा गांधी",
          "B) पं. जवाहरलाल नेहरू (Pt. Nehru)",
          "C) सरदार वल्लभभाई पटेल",
          "D) सुभाष चंद्र बोस"
        ],
        "correct": 1,
        "ans": "B) पं. जवाहरलाल नेहरू",
        "exp": "💡 सही उत्तर: B) पं. जवाहरलाल नेहरू। 31 दिसंबर 1929 को रावी नदी के तट पर तिरंगा फहराया गया और 26 जनवरी 1930 को प्रथम स्वतंत्रता दिवस के रूप में मनाने की घोषणा की गई।"
      },
      "bilingual-marathi": {
        "q": "काँग्रेसच्या ऐतिहासिक 1929 च्या लाहोर अधिवेशनाचे अध्यक्ष कोण होते ज्यामध्ये 'संपूर्ण स्वराज्य'चा ठराव झाला?",
        "sub": "1929 Lahore Congress session president.",
        "options": [
          "A) महात्मा गांधी",
          "B) पं. जवाहरलाल नेहरू",
          "C) सरदार वल्लभभाई पटेल",
          "D) सुभाष चंद्र बोस"
        ],
        "correct": 1,
        "ans": "B) पं. जवाहरलाल नेहरू",
        "exp": "💡 अचूक उत्तर: B) पं. जवाहरलाल नेहरू. 1929 च्या लाहोर अधिवेशनात संपूर्ण स्वराज्याची ऐतिहासिक घोषणा करण्यात आली."
      },
      "bilingual-bengali": {
        "q": "কংগ্রেসের ১৯২৯ সালের ঐতিহাসিক লাহোর অধিবেশনে কে সভাপতিত্ব করেছিলেন যেখানে 'পূর্ণ স্বরাজ'-এর প্রস্তাব গৃহীত হয়?",
        "sub": "1929 Lahore Congress session president.",
        "options": [
          "A) মহাত্মা গান্ধী",
          "B) পণ্ডিত জওহরলাল নেহরু",
          "C) সর্দার বল্লভভাই প্যাটেল",
          "D) সুভাষচন্দ্র বসু"
        ],
        "correct": 1,
        "ans": "B) পণ্ডিত জওহরলাল নেহরু",
        "exp": "💡 সঠিক উত্তর: B) পণ্ডিত জওহরলাল নেহরু। রাভী নদীর তীরে পূর্ণ স্বরাজের সংকল্প নেওয়া হয় এবং ২৬ জানুয়ারি ১৯৩০ স্বাধীনতা দিবস উদযাপিত হয়।"
      },
      "english": {
        "q": "Who presided over the historic 1929 Lahore session of the Indian National Congress where the resolution for 'Purna Swaraj' (Complete Independence) was adopted?",
        "sub": "Indian National Movement & Modern History",
        "options": [
          "A) Mahatma Gandhi",
          "B) Pt. Jawaharlal Nehru",
          "C) Sardar Vallabhbhai Patel",
          "D) Subhas Chandra Bose"
        ],
        "correct": 1,
        "ans": "B) Pt. Jawaharlal Nehru",
        "exp": "💡 Correct Answer: B) Pt. Jawaharlal Nehru. At midnight on Dec 31, 1929, the tricolour was unfurled on the banks of River Ravi, declaring Jan 26, 1930 as Independence Day."
      }
    }
  },
  {
    "id": "cmp-history-1857",
    "topic": "Modern Indian History (1857 का संग्राम)",
    "subjectTags": [
      "gk",
      "history",
      "modern-history",
      "gs",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "1857 के प्रथम भारतीय स्वतंत्रता संग्राम की शुरुआत 10 मई 1857 को किस छावनी से हुई थी?",
        "sub": "Where did the Revolt of 1857 begin on 10th May 1857?",
        "options": [
          "A) बैरकपुर",
          "B) मेरठ (Meerut Cantt)",
          "C) दिल्ली",
          "D) कानपुर"
        ],
        "correct": 1,
        "ans": "B) मेरठ (Meerut Cantt)",
        "exp": "💡 सही उत्तर: B) मेरठ। यद्यपि मंगल पांडे ने 29 मार्च 1857 को बैरकपुर में विद्रोह किया था, परंतु 1857 के सुनियोजित व्यापक संग्राम की शुरुआत 10 मई 1857 को मेरठ छावनी से हुई।"
      },
      "bilingual-marathi": {
        "q": "१८५७ च्या स्वातंत्र्यसमराची औपचारिक सुरुवात १० मे १८५७ रोजी कोणत्या छावणीतून झाली?",
        "sub": "1857 revolt start on 10 May 1857.",
        "options": [
          "A) बराकपूर",
          "B) मेरठ छावणी (Meerut)",
          "C) दिल्ली",
          "D) कानपूर"
        ],
        "correct": 1,
        "ans": "B) मेरठ छावणी (Meerut)",
        "exp": "💡 अचूक उत्तर: B) मेरठ छावणी. १० मे १८५७ रोजी मेरठच्या भारतीय शिपायांनी ब्रिटिशांविरुद्ध उघड बंड पुकारले."
      },
      "bilingual-bengali": {
        "q": "১৮৫৭ সালের ১০ মে মহাবিদ্রোহের আনুষ্ঠানিক সূচনা কোন সেনা ছাউনি থেকে হয়েছিল?",
        "sub": "Start of 1857 revolt on 10 May.",
        "options": [
          "A) ব্যারাকপুর",
          "B) মিরাট ছাউনি (Meerut)",
          "C) দিল্লি",
          "D) কানপুর"
        ],
        "correct": 1,
        "ans": "B) মিরাট ছাউনি (Meerut)",
        "exp": "💡 সঠিক উত্তর: B) মিরাট ছাউনি। ১০ মে ১৮৫৭ তারিখে মিরাটের সিপাহিরা প্রকাশ্য বিদ্রোহ ঘোষণা করে দিল্লির উদ্দেশ্যে রওনা হন।"
      },
      "english": {
        "q": "From which military cantonment did the widespread Indian Revolt of 1857 officially break out on 10th May 1857?",
        "sub": "Modern Indian History & Armed Rebellions",
        "options": [
          "A) Barrackpore",
          "B) Meerut",
          "C) Delhi",
          "D) Kanpur"
        ],
        "correct": 1,
        "ans": "B) Meerut",
        "exp": "💡 Correct Answer: B) Meerut. While Mangal Pandey rebelled in Barrackpore in March, the organized uprising officially commenced on May 10, 1857 in Meerut."
      }
    }
  },
  {
    "id": "cmp-geography-tropic",
    "topic": "Indian Geography (भारत का भूगोल)",
    "subjectTags": [
      "gk",
      "geography",
      "gs",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "भारत में कर्क रेखा (Tropic of Cancer - 23.5° N) कितने राज्यों से होकर गुजरती है?",
        "sub": "Through how many Indian states does the Tropic of Cancer pass?",
        "options": [
          "A) 6 राज्य",
          "B) 7 राज्य",
          "C) 8 राज्य (गुजरात, राज., MP, CG, झार., WB, त्रिपु., मिजो.)",
          "D) 9 राज्य"
        ],
        "correct": 2,
        "ans": "C) 8 राज्य",
        "exp": "💡 सही उत्तर: C) 8 राज्य।\\n⚡ ट्रिक: 'मित्र पर गमछा झार' (मिजोरम, त्रिपुरा, पश्चिम बंगाल, राजस्थान, गुजरात, मध्य प्रदेश, छत्तीसगढ़, झारखंड)।"
      },
      "bilingual-marathi": {
        "q": "भारतातून कर्कवृत्त (23.5° उत्तर) किती राज्यांमधून जाते?",
        "sub": "Tropic of Cancer passes through how many states?",
        "options": [
          "A) 6 राज्ये",
          "B) 7 राज्ये",
          "C) 8 राज्ये (गुजरात ते मिझोराम)",
          "D) 9 राज्ये"
        ],
        "correct": 2,
        "ans": "C) 8 राज्ये",
        "exp": "💡 अचूक उत्तर: C) 8 राज्ये. गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगड, झारखंड, पश्चिम बंगाल, त्रिपुरा व मिझोराम या 8 राज्यांतून जाते."
      },
      "bilingual-bengali": {
        "q": "কর্কটক্রান্তি রেখা (23.5° N) ভারতের কয়টি রাজ্যের ওপর দিয়ে বিস্তৃত?",
        "sub": "Tropic of cancer through Indian states.",
        "options": [
          "A) ৬টি",
          "B) ৭টি",
          "C) ৮টি রাজ্য",
          "D) ৯টি"
        ],
        "correct": 2,
        "ans": "C) ৮টি রাজ্য",
        "exp": "💡 সঠিক উত্তর: C) ৮টি রাজ্য। গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা ও মিজোরাম।"
      },
      "english": {
        "q": "Through how many Indian states does the Tropic of Cancer (23°30' N) pass?",
        "sub": "Physical & Indian Geography",
        "options": [
          "A) 6 States",
          "B) 7 States",
          "C) 8 States",
          "D) 9 States"
        ],
        "correct": 2,
        "ans": "C) 8 States",
        "exp": "💡 Correct Answer: C) 8 States. Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram."
      }
    }
  },
  {
    "id": "cmp-economy-rbi",
    "topic": "Indian Economy & Banking (भारतीय अर्थव्यवस्था)",
    "subjectTags": [
      "gk",
      "economy",
      "banking-gk",
      "gs",
      "all"
    ],
    "examTags": [
      "central",
      "police",
      "teaching",
      "banking",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "भारतीय रिजर्व बैंक (RBI) की स्थापना किस वर्ष और किस समिति की सिफारिश पर हुई थी?",
        "sub": "When was RBI established and on which committee's recommendation?",
        "options": [
          "A) 1930 (साइमन कमीशन)",
          "B) 1 अप्रैल 1935 (हिल्टन यंग कमीशन)",
          "C) 1947",
          "D) 1950"
        ],
        "correct": 1,
        "ans": "B) 1 अप्रैल 1935 (हिल्टन यंग कमीशन)",
        "exp": "💡 सही उत्तर: B) 1 अप्रैल 1935। RBI की स्थापना RBI अधिनियम 1934 के तहत हिल्टन यंग कमीशन की सिफारिश पर 1 अप्रैल 1935 को हुई थी। इसका राष्ट्रीयकरण 1 जनवरी 1949 को हुआ।"
      },
      "bilingual-marathi": {
        "q": "भारतीय रिझर्व्ह बँकेची (RBI) स्थापना कोणत्या वर्षी झाली?",
        "sub": "Reserve Bank of India establishment date.",
        "options": [
          "A) 1930",
          "B) 1 एप्रिल 1935 (हिल्टन यंग कमिशन)",
          "C) 1947",
          "D) 1950"
        ],
        "correct": 1,
        "ans": "B) 1 एप्रिल 1935 (हिल्टन यंग कमिशन)",
        "exp": "💡 अचूक उत्तर: B) 1 एप्रिल 1935. रिझर्व्ह बँक ऑफ इंडिया 1 एप्रिल 1935 रोजी स्थापन झाली व 1 जानेवारी 1949 रोजी राष्ट्रीयीकरण झाले."
      },
      "bilingual-bengali": {
        "q": "ভারতীয় রিজার্ভ ব্যাঙ্ক (RBI) কোন সালে প্রতিষ্ঠিত হয়েছিল?",
        "sub": "Establishment of Reserve Bank of India.",
        "options": [
          "A) ১৯৩০",
          "B) ১ এপ্রিল ১৯৩৫ (হিলটন ইয়ং কমিশন)",
          "C) ১৯৪৭",
          "D) ১৯৫০"
        ],
        "correct": 1,
        "ans": "B) ১ এপ্রিল ১৯৩৫ (হিলটন ইয়ং কমিশন)",
        "exp": "💡 সঠিক উত্তর: B) ১ এপ্রিল ১৯৩৫। আরবিআই আইন ১৯৩৪ অনুসারে গঠিত হয় এবং ১ জানুয়ারি ১৯৪৯ সালে জাতীয়করণ হয়।"
      },
      "english": {
        "q": "On which date was the Reserve Bank of India (RBI) established, based on the Hilton Young Commission recommendations?",
        "sub": "Banking Awareness & Monetary Economics",
        "options": [
          "A) 1st January 1930",
          "B) 1st April 1935",
          "C) 15th August 1947",
          "D) 26th January 1950"
        ],
        "correct": 1,
        "ans": "B) 1st April 1935",
        "exp": "💡 Correct Answer: B) 1st April 1935. Established under the Reserve Bank of India Act, 1934 and nationalized on January 1, 1949."
      }
    }
  },
  {
    "id": "cmp-computer-cpu",
    "topic": "Computer Awareness & ICT (कम्प्यूटर ज्ञान)",
    "subjectTags": [
      "computer",
      "ict",
      "all"
    ],
    "examTags": [
      "delhi-police",
      "haryana-police",
      "rajasthan-police",
      "ugc-net",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "कम्प्यूटर का 'मस्तिष्क' (Brain of the Computer) किसे कहा जाता है जो सभी गणनाओं व नियंत्रण को निष्पादित करता है?",
        "sub": "Which hardware component is known as the Brain of Computer?",
        "options": [
          "A) RAM",
          "B) CPU (Central Processing Unit)",
          "C) हार्ड डिस्क (Hard Disk)",
          "D) मॉनिटर (Monitor)"
        ],
        "correct": 1,
        "ans": "B) CPU (Central Processing Unit)",
        "exp": "💡 सही उत्तर: B) CPU। CPU (कंट्रोल यूनिट + ALU) कम्प्यूटर का प्रमुख प्रोसेसिंग घटक है जो सभी निर्देशों को क्रियान्वित करता है।"
      },
      "bilingual-marathi": {
        "q": "संगणकाचा 'मेंदू' (Brain of Computer) कोणास म्हटले जाते?",
        "sub": "Brain of computer CPU.",
        "options": [
          "A) RAM",
          "B) CPU (Central Processing Unit)",
          "C) हार्ड डिस्क",
          "D) मॉनिटर"
        ],
        "correct": 1,
        "ans": "B) CPU (Central Processing Unit)",
        "exp": "💡 अचूक उत्तर: B) CPU. सेंट्रल प्रोसेसिंग युनिट सर्व गणितीय व तार्किक प्रक्रिया नियंत्रित करतो."
      },
      "bilingual-bengali": {
        "q": "কম্পিউটারের 'মস্তিষ্ক' (Brain of Computer) কাকে বলা হয়?",
        "sub": "Brain of the computer hardware component.",
        "options": [
          "A) RAM",
          "B) CPU (Central Processing Unit)",
          "C) হার্ড ডিস্ক",
          "D) মনিটর"
        ],
        "correct": 1,
        "ans": "B) CPU (Central Processing Unit)",
        "exp": "💡 সঠিক উত্তর: B) CPU। সেন্ট্রাল প্রসেসিং ইউনিট সমস্ত গণনা ও প্রক্রিয়াকরণ নিয়ন্ত্রণ করে।"
      },
      "english": {
        "q": "Which hardware component is universally recognized as the 'Brain of the Computer'?",
        "sub": "Computer Knowledge & Architecture",
        "options": [
          "A) Random Access Memory (RAM)",
          "B) Central Processing Unit (CPU)",
          "C) Hard Disk Drive",
          "D) Motherboard"
        ],
        "correct": 1,
        "ans": "B) CPU",
        "exp": "💡 Correct Answer: B) Central Processing Unit (CPU). It contains the ALU and CU to fetch, decode, and execute instructions."
      }
    }
  },
  {
    "id": "cmp-hindi-sandhi",
    "topic": "General Hindi (हिन्दी व्याकरण - संधि)",
    "subjectTags": [
      "hindi",
      "language",
      "all"
    ],
    "examTags": [
      "ssc-gd",
      "up-police",
      "bihar-police",
      "ctet",
      "up-tet",
      "reet",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "'सूर्योदय' शब्द का शुद्ध संधि-विच्छेद क्या होगा तथा यह किस संधि का उदाहरण है?",
        "sub": "Correct Sandhi split of 'Suryodaya':",
        "options": [
          "A) सूर्य + उदय (गुण स्वर संधि)",
          "B) सूर्यो + दय",
          "C) सूरी + उदय",
          "D) सूर्य + दय"
        ],
        "correct": 0,
        "ans": "A) सूर्य + उदय (गुण स्वर संधि)",
        "exp": "💡 सही उत्तर: A) सूर्य + उदय।\\n⚡ नियम: अ/आ के बाद उ/ऊ आने पर दोनों मिलकर 'ओ' बन जाते हैं (अ + उ = ओ), यह गुण स्वर संधि का नियम है।"
      },
      "bilingual-marathi": {
        "q": "'सूर्योदय' या शब्दाचा योग्य संधी विग्रह कोणता आहे?",
        "sub": "Grammar Sandhi analysis.",
        "options": [
          "A) सूर्य + उदय (गुण स्वर संधी)",
          "B) सूर्यो + दय",
          "C) सूरी + उदय",
          "D) सूर्य + दय"
        ],
        "correct": 0,
        "ans": "A) सूर्य + उदय (गुण स्वर संधी)",
        "exp": "💡 अचूक उत्तर: A) सूर्य + उदय. अ + उ = ओ हा गुण स्वर संधीचा नियम आहे."
      },
      "bilingual-bengali": {
        "q": "'সূর্যোদয়' শব্দের সঠিক সন্ধি বিচ্ছেদ কোনটি?",
        "sub": "Sandhi split of Suryodaya.",
        "options": [
          "A) সূর্য + উদয় (গুণ স্বরসন্ধি)",
          "B) সূর্যো + দয়",
          "C) সূরি + উদয়",
          "D) সূর্য + দয়"
        ],
        "correct": 0,
        "ans": "A) সূর্য + উদয়",
        "exp": "💡 সঠিক উত্তর: A) সূর্য + উদয়। অ + উ মিলে 'ও' হয়, এটি গুণ স্বরসন্ধির উদাহরণ।"
      },
      "english": {
        "q": "What is the grammatical breakdown (Sandhi-Vichhed) of the Hindi term 'Suryodaya'?",
        "sub": "General Hindi Grammar & Sandhi Rules",
        "options": [
          "A) Surya + Udaya (Guna Sandhi)",
          "B) Suryo + Daya",
          "C) Suri + Udaya",
          "D) Surya + Daya"
        ],
        "correct": 0,
        "ans": "A) Surya + Udaya",
        "exp": "💡 Correct Answer: A) Surya + Udaya. As per Hindi grammar rules, 'a' followed by 'u' transforms into 'o' (Guna Svara Sandhi)."
      }
    }
  },
  {
    "id": "cmp-english-grammar",
    "topic": "General English (Error Spotting & Grammar Rules)",
    "subjectTags": [
      "english",
      "language",
      "all"
    ],
    "examTags": [
      "ssc-cgl",
      "ssc-mts",
      "banking",
      "clat-law",
      "ctet",
      "wb-police",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "त्रुटि पहचानिए (Spot the Error): 'Neither of the two boys (A) / have done (B) / their homework properly. (C) / No error (D)'",
        "sub": "Spot the grammatical error in the sentence:",
        "options": [
          "A) Part A",
          "B) Part B ('has done' होना चाहिए)",
          "C) Part C",
          "D) Part D"
        ],
        "correct": 1,
        "ans": "B) Part B",
        "exp": "💡 सही उत्तर: B) Part B।\\n⚡ नियम: 'Neither of' के बाद संज्ञा बहुवचन होती है परंतु क्रिया हमेशा एकवचन (Singular Verb - 'has done') प्रयुक्त होती है।"
      },
      "bilingual-marathi": {
        "q": "व्याकरणातील त्रुटी ओळखा: 'Neither of the two boys (A) / have done (B) / their homework. (C) / No error (D)'",
        "sub": "English grammar subject-verb agreement.",
        "options": [
          "A) Part A",
          "B) Part B ('has done' हवे)",
          "C) Part C",
          "D) Part D"
        ],
        "correct": 1,
        "ans": "B) Part B",
        "exp": "💡 अचूक उत्तर: B) Part B. 'Neither of' नंतर नेहमी एकवचनी क्रियापद (Singular Verb: has done) येते."
      },
      "bilingual-bengali": {
        "q": "বাক্যটির ভুল অংশটি চিহ্নিত করো: 'Neither of the two boys (A) / have done (B) / their homework. (C) / No error (D)'",
        "sub": "Grammatical subject-verb rule.",
        "options": [
          "A) Part A",
          "B) Part B ('has done' হবে)",
          "C) Part C",
          "D) Part D"
        ],
        "correct": 1,
        "ans": "B) Part B",
        "exp": "💡 সঠিক উত্তর: B) Part B। 'Neither of' থাকলে ক্রিয়াপদ একবচন (has done) হয়।"
      },
      "english": {
        "q": "Identify the erroneous segment: 'Neither of the two boys (A) / have done (B) / their homework properly. (C) / No error (D)'",
        "sub": "English Grammar & Subject-Verb Concord",
        "options": [
          "A) Neither of the two boys",
          "B) have done",
          "C) their homework properly",
          "D) No error"
        ],
        "correct": 1,
        "ans": "B) have done",
        "exp": "💡 Correct Answer: B) have done. The distributive pronoun 'Neither' is singular and must be followed by the singular verb 'has done'."
      }
    }
  },
  {
    "id": "cmp-legal-mensrea",
    "topic": "Law & Criminal Jurisprudence (मूल विधि एवं विधिक सिद्धांत)",
    "subjectTags": [
      "law",
      "legal",
      "all"
    ],
    "examTags": [
      "clat-law",
      "up-police",
      "bihar-police",
      "delhi-police",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "आपराधिक विधि के प्रसिद्ध सूत्र 'Actus non facit reum nisi mens sit rea' का क्या आशय है?",
        "sub": "What is the meaning of 'Actus non facit reum nisi mens sit rea'?",
        "options": [
          "A) केवल कार्य किसी को दोषी नहीं बनाता जब तक कि उसका मन भी दोषी न हो (No crime without guilty mind)",
          "B) कानून की अज्ञानता कोई बहाना नहीं है",
          "C) तथ्य की भूल क्षम्य है",
          "D) बिना हानि के विधिक अधिकार उल्लंघन"
        ],
        "correct": 0,
        "ans": "A) बिना आपराधिक मनःस्थिति के कोई कार्य अपराध नहीं होता",
        "exp": "💡 सही उत्तर: A) आपराधिक मनःस्थिति (Mens Rea)। अपराध के गठन हेतु दो अनिवार्य तत्व होते हैं: दुराशय (Mens Rea - Guilty Mind) तथा आपराधिक कृत्य (Actus Reus - Guilty Act)।"
      },
      "bilingual-marathi": {
        "q": "'Actus non facit reum nisi mens sit rea' या प्रसिद्ध फौजदारी विधी सूत्राचा अर्थ काय?",
        "sub": "Legal maxim on guilty mind (Mens Rea).",
        "options": [
          "A) मानसिक हेतू (गुन्हेगारी मन) असल्याशिवाय केवळ कृतीने गुन्हा ठरत नाही",
          "B) कायदा माहीत नसणे ही सबब चालत नाही",
          "C) तथ्याची चूक क्षम्य असते",
          "D) केवळ नुकसान गुन्हा ठरत नाही"
        ],
        "correct": 0,
        "ans": "A) गुन्हेगारी मन असल्याशिवाय गुन्हा ठरत नाही",
        "exp": "💡 अचूक उत्तर: A. फौजदारी गुन्ह्यासाठी गुन्हेगारी मन (Mens Rea) आणि प्रत्यक्ष कृती (Actus Reus) दोन्ही आवश्यक असतात."
      },
      "bilingual-bengali": {
        "q": "ফৌজদারি আইনের 'Actus non facit reum nisi mens sit rea' সূত্রের মূল অর্থ কী?",
        "sub": "Meaning of criminal legal maxim.",
        "options": [
          "A) অপরাধমূলক মানসিকতা ছাড়া কেবল কাজ দ্বারা অপরাধ সংগঠিত হয় না",
          "B) আইনের অজ্ঞতা কোনো অজুহাত নয়",
          "C) তথ্যের ভুল মার্জনীয়",
          "D) ক্ষতিপূরণ ব্যতীত অধিকার হরণ"
        ],
        "correct": 0,
        "ans": "A) অপরাধমূলক মানসিকতা ছাড়া অপরাধ সংগঠিত হয় না",
        "exp": "💡 সঠিক উত্তর: A। অপরাধের ক্ষেত্রে অপরাধমূলক অভিপ্রায় (Mens Rea) থাকা অপরিহার্য।"
      },
      "english": {
        "q": "What is the core principle embodied in the criminal law maxim 'Actus non facit reum nisi mens sit rea'?",
        "sub": "CLAT Legal Reasoning & Law of Crimes",
        "options": [
          "A) An act does not make a person guilty unless the mind is also guilty",
          "B) Ignorance of law is no excuse",
          "C) Mistake of fact is a complete defence",
          "D) Infringement of legal right without actual damage"
        ],
        "correct": 0,
        "ans": "A) An act does not make a person guilty unless the mind is also guilty",
        "exp": "💡 Correct Answer: A. Every standard crime requires both an actus reus (wrongful act) and a mens rea (guilty mind/criminal intent)."
      }
    }
  },
  {
    "id": "cmp-police-crpc",
    "topic": "Police Administration & Criminal Procedure (दण्ड प्रक्रिया संहिता)",
    "subjectTags": [
      "law",
      "legal",
      "women-child",
      "all"
    ],
    "examTags": [
      "up-police",
      "bihar-police",
      "delhi-police",
      "rajasthan-police",
      "mp-police",
      "haryana-police",
      "wb-police",
      "maharashtra-police",
      "clat-law",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "संविधान के अनुच्छेद 22(2) एवं CrPC/BNSS के तहत पुलिस द्वारा गिरफ्तार व्यक्ति को कितने समय के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है?",
        "sub": "Within what timeframe must an arrested person be produced before a magistrate?",
        "options": [
          "A) 12 घंटे",
          "B) 24 घंटे (यात्रा का समय छोड़कर - 24 Hours)",
          "C) 48 घंटे",
          "D) 72 घंटे"
        ],
        "correct": 1,
        "ans": "B) 24 घंटे (यात्रा समय छोड़कर)",
        "exp": "💡 सही उत्तर: B) 24 घंटे। बिना न्यायिक प्राधिकार के किसी नागरिक को 24 घंटे से अधिक पुलिस हिरासत में नहीं रखा जा सकता।"
      },
      "bilingual-marathi": {
        "q": "पोलीस प्रशासनाद्वारे अटक केलेल्या व्यक्तीला किती तासांच्या आत जवळच्या दंडाधिकाऱ्यांसमोर हजर करणे कायद्याने बंधनकारक आहे?",
        "sub": "Arrest procedure & magistrate production deadline.",
        "options": [
          "A) 12 तास",
          "B) 24 तास (प्रवासाचा वेळ वगळून)",
          "C) 48 तास",
          "D) 72 तास"
        ],
        "correct": 1,
        "ans": "B) 24 तास (प्रवासाचा वेळ वगळून)",
        "exp": "💡 अचूक उत्तर: B) 24 तास. घटनेच्या कलम 22(2) नुसार प्रवासाचा आवश्यक वेळ वगळून 24 तासांच्या आत न्यायदंडाधिकाऱ्यांसमोर हजर करणे बंधनकारक आहे."
      },
      "bilingual-bengali": {
        "q": "সংবিধানের ২২(২) ধারা অনুযায়ী গ্রেফতার হওয়া ব্যক্তিকে কত ঘণ্টার মধ্যে নিকটবর্তী ম্যাজিস্ট্রেটের সামনে হাজির করতে হয়?",
        "sub": "Time limit to present an arrested person to magistrate.",
        "options": [
          "A) ১২ ঘণ্টা",
          "B) ২৪ ঘণ্টা (যাতায়াতের সময় বাদে)",
          "C) ৪৮ ঘণ্টা",
          "D) ৭২ ঘণ্টা"
        ],
        "correct": 1,
        "ans": "B) ২৪ ঘণ্টা (যাতায়াতের সময় বাদে)",
        "exp": "💡 সঠিক উত্তর: B) ২৪ ঘণ্টা। যাত্রার সময় বাদে ২৪ ঘণ্টার বেশি কাউকে পুলিশি হেফাজতে আটকে রাখা বেআইনি।"
      },
      "english": {
        "q": "Under Article 22(2) of the Constitution and criminal procedural laws, within how much time must an arrested individual be produced before the nearest Judicial Magistrate?",
        "sub": "Constitutional Safeguards & Criminal Procedure",
        "options": [
          "A) 12 Hours",
          "B) 24 Hours (excluding journey time)",
          "C) 48 Hours",
          "D) 72 Hours"
        ],
        "correct": 1,
        "ans": "B) 24 Hours (excluding journey time)",
        "exp": "💡 Correct Answer: B) 24 Hours. No person arrested without warrant can be detained in custody for a longer period than 24 hours without an order of a Magistrate."
      }
    }
  },
  {
    "id": "cmp-cdp-piaget",
    "topic": "Child Development & Pedagogy (बाल विकास एवं शिक्षाशास्त्र)",
    "subjectTags": [
      "cdp",
      "teaching-apt",
      "all"
    ],
    "examTags": [
      "ctet",
      "up-tet",
      "bpsc-tre",
      "reet",
      "ugc-net",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "जीन पियाजे (Jean Piaget) के संज्ञानात्मक विकास सिद्धांत के अनुसार 'मूर्त संक्रियात्मक अवस्था' (Concrete Operational Stage) की आयु सीमा क्या है?",
        "sub": "Age range of Concrete Operational Stage in Piaget's theory:",
        "options": [
          "A) जन्म से 2 वर्ष (संवेदी गामक)",
          "B) 2 से 7 वर्ष (पूर्व-संक्रियात्मक)",
          "C) 7 से 11 वर्ष (मूर्त संक्रियात्मक)",
          "D) 11 वर्ष से आगे (औपचारिक)"
        ],
        "correct": 2,
        "ans": "C) 7 से 11 वर्ष (मूर्त संक्रियात्मक)",
        "exp": "💡 सही उत्तर: C) 7 से 11 वर्ष। इस अवस्था में बालक में संरक्षण (Conservation), वर्गीकरण एवं उत्क्रमणीयता (Reversibility) की क्षमता का विकास हो जाता है।"
      },
      "bilingual-marathi": {
        "q": "जीन पियाजे यांच्या ज्ञानात्मक विकास सिद्धांतानुसार 'मूर्त क्रियात्मक अवस्था' कोणत्या वयोगटात येते?",
        "sub": "Piaget's Concrete Operational stage age group.",
        "options": [
          "A) जन्म ते 2 वर्षे",
          "B) 2 ते 7 वर्षे",
          "C) 7 ते 11 वर्षे (मूर्त क्रियात्मक)",
          "D) 11 वर्षांपुढे"
        ],
        "correct": 2,
        "ans": "C) 7 ते 11 वर्षे",
        "exp": "💡 अचूक उत्तर: C) 7 ते 11 वर्षे. या अवस्थेत बालकामध्ये मूर्त वस्तूंच्या आधारे तार्किक विचार करण्याची क्षमता विकसित होते."
      },
      "bilingual-bengali": {
        "q": "জাঁ পিয়াজের জ্ঞানমূলক বিকাশ তত্ত্বের 'মূর্ত সক্রিয়তার স্তর' (Concrete Operational Stage)-এর সময়কাল কোনটি?",
        "sub": "Piaget's Cognitive Development stage age.",
        "options": [
          "A) ০-২ বছর",
          "B) ২-৭ বছর",
          "C) ৭-১১ বছর",
          "D) ১১ বছর ও তদূর্ধ্ব"
        ],
        "correct": 2,
        "ans": "C) ৭-১১ বছর",
        "exp": "💡 সঠিক উত্তর: C) ৭-১১ বছর। এই স্তরে শিশু বাস্তব বস্তুর উপস্থিতিতে যুক্তিপূর্ণ চিন্তা করতে পারে।"
      },
      "english": {
        "q": "According to Jean Piaget's theory of cognitive development, what is the age range for the 'Concrete Operational Stage'?",
        "sub": "Child Development & Pedagogy (CTET / TET)",
        "options": [
          "A) Birth to 2 years",
          "B) 2 to 7 years",
          "C) 7 to 11 years",
          "D) 11 years and above"
        ],
        "correct": 2,
        "ans": "C) 7 to 11 years",
        "exp": "💡 Correct Answer: C) 7 to 11 years. In this stage, children acquire logical operations, reversibility, and conservation of mass and volume."
      }
    }
  },
  {
    "id": "cmp-cdp-vygotsky",
    "topic": "Child Development & Pedagogy (सामाजिक-सांस्कृतिक सिद्धांत)",
    "subjectTags": [
      "cdp",
      "teaching-apt",
      "all"
    ],
    "examTags": [
      "ctet",
      "up-tet",
      "bpsc-tre",
      "reet",
      "ugc-net",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "लेव वायगोत्स्की (Lev Vygotsky) के सिद्धांत में बालक के वास्तविक विकास स्तर और वयस्क सहायता से प्राप्त संभावित स्तर के अंतर को क्या कहते हैं?",
        "sub": "Distance between actual development and potential development:",
        "options": [
          "A) समीपस्थ विकास का क्षेत्र (Zone of Proximal Development - ZPD)",
          "B) स्कीमा (Schema)",
          "C) आत्मसातीकरण (Assimilation)",
          "D) संरक्षण (Conservation)"
        ],
        "correct": 0,
        "ans": "A) समीपस्थ विकास का क्षेत्र (ZPD)",
        "exp": "💡 सही उत्तर: A) ZPD (Zone of Proximal Development)। वायगोत्स्की के अनुसार यह वह क्षेत्र है जहाँ बालक वयस्क या अधिक जानकार साथी (MKO) की सहायता (Scaffolding) से कार्य सीख सकता है।"
      },
      "bilingual-marathi": {
        "q": "लेव्ह व्हायगोत्स्की यांच्या सिद्धांतानुसार बालकाच्या प्रत्यक्ष व संभाव्य विकास पातळीतील अंतरास काय म्हणतात?",
        "sub": "Vygotsky's Zone of Proximal Development.",
        "options": [
          "A) निकटवर्ती विकासाचा पट्टा (ZPD)",
          "B) स्कीमा (Schema)",
          "C) सात्मीकरण",
          "D) समतोलन"
        ],
        "correct": 0,
        "ans": "A) निकटवर्ती विकासाचा पट्टा (ZPD)",
        "exp": "💡 अचूक उत्तर: A) ZPD. अधिक सक्षम व्यक्तीच्या मार्गदर्शनाखाली बालक जी प्रगती करू शकते त्याला ZPD म्हटले जाते."
      },
      "bilingual-bengali": {
        "q": "ভাইগটস্কির তত্ত্বে শিক্ষার্থীর প্রকৃত বিকাশ ও সম্ভাব্য বিকাশের মধ্যবর্তী অঞ্চলকে কী বলা হয়?",
        "sub": "Zone of Proximal Development (ZPD) concept.",
        "options": [
          "A) নিকটবর্তী বিকাশের ক্ষেত্র (Zone of Proximal Development - ZPD)",
          "B) স্কিমা (Schema)",
          "C) আত্মীকরণ",
          "D) সমযোজন"
        ],
        "correct": 0,
        "ans": "A) নিকটবর্তী বিকাশের ক্ষেত্র (ZPD)",
        "exp": "💡 সঠিক উত্তর: A) ZPD। এই অঞ্চলে দক্ষ শিক্ষক বা সহপাঠীর সহযোগিতায় (Scaffolding) শিক্ষার্থী নতুন কাজ শেখে।"
      },
      "english": {
        "q": "In Lev Vygotsky's socio-cultural theory, what term describes the gap between what a child can do independently and what they can achieve with guidance?",
        "sub": "Learning Theories & Educational Psychology",
        "options": [
          "A) Zone of Proximal Development (ZPD)",
          "B) Schema Organization",
          "C) Egocentric Speech",
          "D) Object Permanence"
        ],
        "correct": 0,
        "ans": "A) Zone of Proximal Development (ZPD)",
        "exp": "💡 Correct Answer: A) Zone of Proximal Development (ZPD). It represents the optimal zone for learning with targeted scaffolding from an MKO (More Knowledgeable Other)."
      }
    }
  },
  {
    "id": "cmp-ugc-research",
    "topic": "Research Aptitude & Ethics (शोध अभिवृत्ति एवं नैतिकता)",
    "subjectTags": [
      "research-apt",
      "higher-edu",
      "teaching-apt",
      "all"
    ],
    "examTags": [
      "ugc-net",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "शोध में 'साहित्यिक चोरी' (Plagiarism) को रोकने हेतु भारत में विश्वविद्यालय अनुदान आयोग (UGC) द्वारा अनुशंसित प्रमुख सॉफ्टवेयर कौन सा है?",
        "sub": "Software recommended by UGC for detecting plagiarism in research:",
        "options": [
          "A) Urkund (Ouriginal) / Turnitin",
          "B) SPSS Data Modeler",
          "C) MS PowerPoint",
          "D) AutoCad"
        ],
        "correct": 0,
        "ans": "A) Urkund (Ouriginal) / Turnitin",
        "exp": "💡 सही उत्तर: A) Urkund (Ouriginal) / Turnitin। UGC के 2018 के नियमों के तहत शोध प्रबंधों में साहित्यिक समानता (Similarity Index) की जाँच हेतु इसका प्रयोग अनिवार्य है।"
      },
      "bilingual-marathi": {
        "q": "संशोधनातील वाङ्मयचौर्य (Plagiarism) तपासण्यासाठी यूजीसीद्वारे मान्यताप्राप्त सॉफ्टवेअर कोणते आहे?",
        "sub": "Plagiarism detection software in research.",
        "options": [
          "A) Urkund / Turnitin",
          "B) SPSS",
          "C) MS Excel",
          "D) Photoshop"
        ],
        "correct": 0,
        "ans": "A) Urkund / Turnitin",
        "exp": "💡 अचूक उत्तर: A) Urkund / Turnitin. शोधनिबंधांची सत्यता व वाङ्मयचौर्य तपासण्यासाठी याचा वापर होतो."
      },
      "bilingual-bengali": {
        "q": "গবেষণাপত্রে চৌর্যবৃত্তি (Plagiarism) যাচাই করার জন্য ইউজিসি অনুমোদিত প্রধান সফটওয়্যার কোনটি?",
        "sub": "UGC approved plagiarism detection software.",
        "options": [
          "A) Urkund (Ouriginal) / Turnitin",
          "B) SPSS",
          "C) MS Excel",
          "D) PageMaker"
        ],
        "correct": 0,
        "ans": "A) Urkund (Ouriginal) / Turnitin",
        "exp": "💡 সঠিক উত্তর: A) Urkund / Turnitin। গবেষণার নীতি ও মান সুরক্ষায় এটি ব্যবহৃত হয়।"
      },
      "english": {
        "q": "Which anti-plagiarism web-based software is predominantly provided to Indian universities under the INFLIBNET/UGC consortium?",
        "sub": "UGC NET Paper-1 Research Aptitude & Ethics",
        "options": [
          "A) Urkund (Ouriginal) / Turnitin",
          "B) Adobe Illustrator",
          "C) SPSS Modeler",
          "D) Tally Prime"
        ],
        "correct": 0,
        "ans": "A) Urkund (Ouriginal) / Turnitin",
        "exp": "💡 Correct Answer: A) Urkund / Turnitin. UGC (Promotion of Academic Integrity and Prevention of Plagiarism) Regulations, 2018 mandates electronic verification via these tools."
      }
    }
  },
  {
    "id": "cmp-state-mah",
    "topic": "Maharashtra Special & History (महाराष्ट्र इतिहास व सामान्य ज्ञान)",
    "subjectTags": [
      "mah-gk",
      "marathi",
      "gk",
      "all"
    ],
    "examTags": [
      "maharashtra-police",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-marathi": {
        "q": "छत्रपती शिवाजी महाराजांचा भव्य राज्याभिषेक १६७४ मध्ये कोणत्या ऐतिहासिक किल्ल्यावर संपन्न झाला?",
        "sub": "At which historic fort did Chhatrapati Shivaji Maharaj's coronation take place in 1674?",
        "options": [
          "A) शिवनेरी किल्ला",
          "B) रायगड किल्ला (६ जून १६७४)",
          "C) प्रतापगड किल्ला",
          "D) सिंहगड किल्ला"
        ],
        "correct": 1,
        "ans": "B) रायगड किल्ला (६ जून १६७४)",
        "exp": "💡 अचूक उत्तर: B) रायगड किल्ला. ६ जून १६७४ रोजी गागाभट्टांच्या उपस्थितीत छत्रपती शिवाजी महाराजांचा राज्याभिषेक होऊन हिंदवी स्वराज्याची स्थापना अधिकृतरीत्या घोषित झाली."
      },
      "bilingual-hindi": {
        "q": "छत्रपति शिवाजी महाराज का भव्य राज्याभिषेक 1674 में किस ऐतिहासिक दुर्ग पर संपन्न हुआ था?",
        "sub": "Coronation of Shivaji Maharaj in 1674 occurred at:",
        "options": [
          "A) शिवनेरी दुर्ग",
          "B) रायगढ़ दुर्ग (6 जून 1674)",
          "C) प्रतापगढ़",
          "D) सिंहगढ़"
        ],
        "correct": 1,
        "ans": "B) रायगढ़ दुर्ग",
        "exp": "💡 सही उत्तर: B) रायगढ़ दुर्ग। 6 जून 1674 को काशी के विद्वान पंडित गागाभट्ट द्वारा शिवाजी महाराज का राज्याभिषेक रायगढ़ में किया गया।"
      },
      "bilingual-bengali": {
        "q": "১৬৭৪ সালে ছত্রপতি শিবাজী মহারাজের রাজ্যাভিষেক কোন ঐতিহাসিক দুর্গে অনুষ্ঠিত হয়েছিল?",
        "sub": "Shivaji Maharaj coronation in 1674 fort.",
        "options": [
          "A) শিবনেরী দুর্গ",
          "B) রায়গড় দুর্গ (Raigad Fort)",
          "C) প্রতাপগড় দুর্গ",
          "D) সিংহগড় দুর্গ"
        ],
        "correct": 1,
        "ans": "B) রায়গড় দুর্গ",
        "exp": "💡 সঠিক উত্তর: B) রায়গড় দুর্গ। ১৬৭৪ সালের ৬ জুন রায়গড় দুর্গে ঐতিহাসিক রাজ্যাভিষেক সম্পন্ন হয়।"
      },
      "english": {
        "q": "At which historic hill fortress was the grand coronation ceremony of Chhatrapati Shivaji Maharaj performed on 6th June 1674?",
        "sub": "Maharashtra State Police & Regional History",
        "options": [
          "A) Shivneri Fort",
          "B) Raigad Fort",
          "C) Pratapgad Fort",
          "D) Sinhagad Fort"
        ],
        "correct": 1,
        "ans": "B) Raigad Fort",
        "exp": "💡 Correct Answer: B) Raigad Fort. Pandit Gaga Bhatt of Varanasi officiated the coronation where Shivaji Maharaj assumed the title of Chhatrapati."
      }
    }
  },
  {
    "id": "cmp-state-wb",
    "topic": "West Bengal History & GK (পশ্চিমবঙ্গ সাধারণ জ্ঞান)",
    "subjectTags": [
      "wb-gk",
      "gk",
      "all"
    ],
    "examTags": [
      "wb-police",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-bengali": {
        "q": "ঐতিহাসিক পলাশীর যুদ্ধ (Battle of Plassey) কোন সালে সংঘটিত হয়েছিল যা বাংলায় ব্রিটিশ শাসনের পথ প্রশস্ত করে?",
        "sub": "In which year was the historic Battle of Plassey fought in Bengal?",
        "options": [
          "A) ২৩ জুন ১৭৫৭ (23 June 1757)",
          "B) ২২ অক্টোবর ১৭৬৪",
          "C) ১৮৫৭",
          "D) ১৭৬১"
        ],
        "correct": 0,
        "ans": "A) ২৩ জুন ১৭৫৭",
        "exp": "💡 সঠিক উত্তর: A) ২৩ জুন ১৭৫৭। রবার্ট ক্লাইভের নেতৃত্বাধীন ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানি ও বাংলার শেষ স্বাধীন নবাব সিরাজউদ্দৌলার মধ্যে এই যুদ্ধ সংঘটিত হয়।"
      },
      "bilingual-hindi": {
        "q": "बंगाल में ऐतिहासिक प्लासी का युद्ध (Battle of Plassey) किस तिथि को लड़ा गया था?",
        "sub": "Battle of Plassey date in Bengal:",
        "options": [
          "A) 23 जून 1757",
          "B) 22 अक्टूबर 1764",
          "C) 1857",
          "D) 1761"
        ],
        "correct": 0,
        "ans": "A) 23 जून 1757",
        "exp": "💡 सही उत्तर: A) 23 जून 1757। नवाब सिराजुद्दौला और रॉबर्ट क्लाइव की सेना के बीच नदिया जिले के प्लासी में यह युद्ध लड़ा गया।"
      },
      "bilingual-marathi": {
        "q": "ऐतिहासिक प्लासीची लढाई कोणत्या वर्षी लढली गेली?",
        "sub": "Battle of Plassey fought in:",
        "options": [
          "A) 23 जून 1757",
          "B) 1764",
          "C) 1857",
          "D) 1761"
        ],
        "correct": 0,
        "ans": "A) 23 जून 1757",
        "exp": "💡 अचूक उत्तर: A) 23 जून 1757. बंगालचा नवाब सिराजउद्दौला आणि रॉबर्ट क्लाइव्ह यांच्यात ही लढाई झाली."
      },
      "english": {
        "q": "On which date was the historic Battle of Plassey fought on the banks of the Bhagirathi river in Bengal?",
        "sub": "West Bengal Police & Colonial History",
        "options": [
          "A) 23rd June 1757",
          "B) 22nd October 1764",
          "C) 10th May 1857",
          "D) 14th January 1761"
        ],
        "correct": 0,
        "ans": "A) 23rd June 1757",
        "exp": "💡 Correct Answer: A) 23rd June 1757. British forces under Robert Clive defeated Nawab Siraj-ud-Daulah, consolidating Company rule in Bengal."
      }
    }
  },
  {
    "id": "cmp-state-up",
    "topic": "Uttar Pradesh GK (उत्तर प्रदेश विशेष)",
    "subjectTags": [
      "up-gk",
      "gk",
      "all"
    ],
    "examTags": [
      "up-police",
      "up-tet",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "उत्तर प्रदेश का एकमात्र राष्ट्रीय उद्यान 'दुधवा राष्ट्रीय उद्यान' (Dudhwa National Park) किस जनपद में स्थित है?",
        "sub": "In which district of UP is Dudhwa National Park located?",
        "options": [
          "A) लखीमपुर खीरी (Lakhimpur Kheri)",
          "B) वाराणसी",
          "C) प्रयागराज",
          "D) गोरखपुर"
        ],
        "correct": 0,
        "ans": "A) लखीमपुर खीरी",
        "exp": "💡 सही उत्तर: A) लखीमपुर खीरी। दुधवा राष्ट्रीय उद्यान तराई क्षेत्र में स्थित है जो बाघों एवं बारहसिंगा (दलदल के हिरण) के संरक्षण हेतु विख्यात है।"
      },
      "bilingual-marathi": {
        "q": "उत्तर प्रदेशातील एकमेव 'दुधवा राष्ट्रीय उद्यान' कोणत्या जिल्ह्यात आहे?",
        "sub": "Dudhwa National Park district in UP.",
        "options": [
          "A) लखीमपूर खेरी",
          "B) वाराणसी",
          "C) प्रयागराज",
          "D) गोरखपूर"
        ],
        "correct": 0,
        "ans": "A) लखीमपूर खेरी",
        "exp": "💡 अचूक उत्तर: A) लखीमपूर खेरी. हे उद्यान वाघ व दलदली हरणांसाठी प्रसिद्ध आहे."
      },
      "bilingual-bengali": {
        "q": "উত্তর প্রদেশের একমাত্র 'দুধওয়া জাতীয় উদ্যান' কোন জেলায় অবস্থিত?",
        "sub": "Dudhwa National Park location in UP.",
        "options": [
          "A) লখিমপুর খেরী",
          "B) বারাণসী",
          "C) প্রয়াগরাজ",
          "D) গোরক্ষপুর"
        ],
        "correct": 0,
        "ans": "A) লখিমপুর খেরী",
        "exp": "💡 সঠিক উত্তর: A) লখিমপুর খেরী।"
      },
      "english": {
        "q": "In which district of Uttar Pradesh is the state's sole National Park, 'Dudhwa National Park', situated?",
        "sub": "UP Police & State Special Environmental GK",
        "options": [
          "A) Lakhimpur Kheri",
          "B) Varanasi",
          "C) Prayagraj",
          "D) Gorakhpur"
        ],
        "correct": 0,
        "ans": "A) Lakhimpur Kheri",
        "exp": "💡 Correct Answer: A) Lakhimpur Kheri. Established in 1977, it is part of the Dudhwa Tiger Reserve in the Terai belt."
      }
    }
  },
  {
    "id": "cmp-state-bihar",
    "topic": "Bihar Special & History (बिहार विशेष सामान्य ज्ञान)",
    "subjectTags": [
      "bihar-special",
      "bihar",
      "gk",
      "all"
    ],
    "examTags": [
      "bihar-police",
      "bpsc-tre",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "महात्मा गांधी ने भारत में अपना प्रथम ऐतिहासिक सत्याग्रह 1917 में बिहार के किस जिले में 'तिनकठिया प्रथा' (नील की खेती) के विरुद्ध किया था?",
        "sub": "Where did Gandhiji launch Champaran Satyagraha in 1917?",
        "options": [
          "A) पटना",
          "B) चंपारण (Champaran)",
          "C) गया",
          "D) मुजफ्फरपुर"
        ],
        "correct": 1,
        "ans": "B) चंपारण",
        "exp": "💡 सही उत्तर: B) चंपारण। राजकुमार शुक्ल के आमंत्रण पर गांधीजी चंपारण पहुँचे और तिनकठिया प्रथा (3/20 भाग पर अनिवार्य नील की खेती) के विरुद्ध सफल सत्याग्रह किया।"
      },
      "bilingual-marathi": {
        "q": "महात्मा गांधींनी भारतातील पहिला सत्याग्रह 1917 मध्ये बिहारमधील कोणत्या जिल्ह्यात केला?",
        "sub": "First Satyagraha of Mahatma Gandhi in Bihar.",
        "options": [
          "A) पाटणा",
          "B) चंपारण्य (Champaran)",
          "C) गया",
          "D) मुझफ्फरपूर"
        ],
        "correct": 1,
        "ans": "B) चंपारण्य",
        "exp": "💡 अचूक उत्तर: B) चंपारण्य. निळीच्या सक्तीच्या लागवडीविरुद्ध (तिनकठिया पद्धत) गांधीजींनी हा सत्याग्रह केला."
      },
      "bilingual-bengali": {
        "q": "মহাত্মা গান্ধী ১৯১৭ সালে বিহারের কোন জেলায় নীল চাষের 'তিনকাঠিয়া প্রথা'র বিরুদ্ধে তাঁর প্রথম সত্যাগ্রহ শুরু করেন?",
        "sub": "Champaran Satyagraha district in Bihar.",
        "options": [
          "A) পাটনা",
          "B) চম্পারণ (Champaran)",
          "C) গয়া",
          "D) মুজাফফরপুর"
        ],
        "correct": 1,
        "ans": "B) চম্পারণ",
        "exp": "💡 সঠিক উত্তর: B) চম্পারণ। রাজকুমার শুক্লার আমন্ত্রণে গিয়ে তিনি তিনকাঠিয়া পদ্ধতির বিরুদ্ধে ঐতিহাসিক আন্দোলন সফল করেন।"
      },
      "english": {
        "q": "In 1917, Mahatma Gandhi launched his first Satyagraha in India against the exploitative Tinkathia system in which district of Bihar?",
        "sub": "BPSC Prelims & Bihar Police Historical Milestones",
        "options": [
          "A) Patna",
          "B) Champaran",
          "C) Gaya",
          "D) Muzaffarpur"
        ],
        "correct": 1,
        "ans": "B) Champaran",
        "exp": "💡 Correct Answer: B) Champaran. Invited by Raj Kumar Shukla, Gandhi successfully led the agitation against mandatory indigo cultivation on 3/20th of the land."
      }
    }
  },
  {
    "id": "cmp-neet-genetics",
    "topic": "Genetics & Inheritance (आनुवंशिकी एवं मेंडल के नियम)",
    "subjectTags": [
      "biology",
      "neet-bio",
      "science",
      "all"
    ],
    "examTags": [
      "nta-neet",
      "all-india-mix",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "ग्रेगर जॉन मेंडल के द्विसंकर संकरण (Dihybrid Cross) प्रयोग में F₂ पीढ़ी का लक्षणप्ररूपी अनुपात (Phenotypic Ratio) क्या प्राप्त होता है?",
        "sub": "Phenotypic ratio in F2 generation of dihybrid cross:",
        "options": [
          "A) 3:1",
          "B) 9:3:3:1",
          "C) 1:2:1",
          "D) 9:7"
        ],
        "correct": 1,
        "ans": "B) 9:3:3:1",
        "exp": "💡 सही उत्तर: B) 9:3:3:1।\\n⚡ व्याख्या: पीले-गोल (9) : हरे-गोल (3) : पीले-झुर्रीदार (3) : हरे-झुर्रीदार (1)। यह मेंडल के 'स्वतंत्र अपव्यूहन के नियम' (Law of Independent Assortment) को सिद्ध करता है।"
      },
      "bilingual-marathi": {
        "q": "मेंडेलच्या द्विसंकर संकरणात (Dihybrid Cross) F₂ पिढीचे फिनोटाइपिक गुणोत्तर काय असते?",
        "sub": "Mendelian dihybrid phenotypic ratio.",
        "options": [
          "A) 3:1",
          "B) 9:3:3:1",
          "C) 1:2:1",
          "D) 9:7"
        ],
        "correct": 1,
        "ans": "B) 9:3:3:1",
        "exp": "💡 अचूक उत्तर: B) 9:3:3:1. स्वतंत्र अपवहनाचा नियम या प्रयोगातून सिद्ध होतो."
      },
      "bilingual-bengali": {
        "q": "মেন্ডেলের দ্বিসংকর জনন পরীক্ষায় F₂ জনুর ফিনোটাইপিক অনুপাত কী হয়?",
        "sub": "Dihybrid cross phenotypic ratio.",
        "options": [
          "A) ৩:১",
          "B) ৯:৩:৩:১",
          "C) ১:২:১",
          "D) ৯:৭"
        ],
        "correct": 1,
        "ans": "B) ৯:৩:৩:১",
        "exp": "💡 সঠিক উত্তর: B) ৯:৩:৩:১। স্বাধীন সঞ্চারণ সূত্র প্রমাণ করে।"
      },
      "english": {
        "q": "What is the classical phenotypic ratio obtained in the F₂ generation of Mendel's dihybrid cross with pea plants?",
        "sub": "NEET UG Biology: Principles of Inheritance & Variation",
        "options": [
          "A) 3:1",
          "B) 9:3:3:1",
          "C) 1:2:1",
          "D) 9:7"
        ],
        "correct": 1,
        "ans": "B) 9:3:3:1",
        "exp": "💡 Correct Answer: B) 9:3:3:1 (Round-Yellow : Round-Green : Wrinkled-Yellow : Wrinkled-Green), validating the Law of Independent Assortment."
      }
    }
  },
  {
    "id": "cmp-jee-physics",
    "topic": "Gravitation & Mechanics (गुरुत्वाकर्षण एवं पलायन वेग)",
    "subjectTags": [
      "physics",
      "jee-physics",
      "science",
      "all"
    ],
    "examTags": [
      "nta-jee",
      "railway-alp",
      "iaf-agniveer",
      "all"
    ],
    "loc": {
      "bilingual-hindi": {
        "q": "पृथ्वी की सतह से किसी वस्तु का पलायन वेग (Escape Velocity - v_e) का मान लगभग कितना होता है?",
        "sub": "Escape velocity value from Earth's surface:",
        "options": [
          "A) 9.8 km/s",
          "B) 11.2 km/s (v_e = √(2gR))",
          "C) 8.4 km/s",
          "D) 15.0 km/s"
        ],
        "correct": 1,
        "ans": "B) 11.2 km/s",
        "exp": "💡 सही उत्तर: B) 11.2 किमी/सेकंड।\\n⚡ सूत्र: v_e = √(2gR) = √(2 × 9.8 × 6.4 × 10⁶) ≈ 11.2 km/s। यह पिंड के द्रव्यमान पर निर्भर नहीं करता।"
      },
      "bilingual-marathi": {
        "q": "पृथ्वीच्या पृष्ठभागावरून कोणत्याही वस्तूचा मुक्ती वेग / पलायन वेग (Escape Velocity) किती असतो?",
        "sub": "Earth's escape velocity formula and value.",
        "options": [
          "A) 9.8 किमी/से",
          "B) 11.2 किमी/से (v_e = √(2gR))",
          "C) 8.4 किमी/से",
          "D) 15.0 किमी/से"
        ],
        "correct": 1,
        "ans": "B) 11.2 किमी/से",
        "exp": "💡 अचूक उत्तर: B) 11.2 किमी/सेकंद. सूत्र: v_e = √(2gR)."
      },
      "bilingual-bengali": {
        "q": "পৃথিবীর পৃষ্ঠ থেকে কোনো বস্তুর মুক্তিবেগ (Escape Velocity)-এর মান কত?",
        "sub": "Escape velocity from surface of Earth.",
        "options": [
          "A) ৯.৮ কিমি/সেকেন্ড",
          "B) ১১.২ কিমি/সেকেন্ড (v_e = √(2gR))",
          "C) ৮.৪ কিমি/সেকেন্ড",
          "D) ১৫.০ কিমি/সেকেন্ড"
        ],
        "correct": 1,
        "ans": "B) ১১.২ কিমি/সেকেন্ড",
        "exp": "💡 সঠিক উত্তর: B) ১১.২ কিমি/সেকেন্ড।"
      },
      "english": {
        "q": "What is the theoretical escape velocity (v_e) required for a projectile to escape Earth's gravitational field from the surface?",
        "sub": "JEE Main Physics & Gravitation Formulas",
        "options": [
          "A) 9.8 km/s",
          "B) 11.2 km/s (v_e = √(2gR))",
          "C) 8.4 km/s",
          "D) 16.5 km/s"
        ],
        "correct": 1,
        "ans": "B) 11.2 km/s",
        "exp": "💡 Correct Answer: B) 11.2 km/s. Formula: v_e = √(2GM/R) = √(2gR) ≈ 11.2 km/s, which is independent of the mass of the projectile."
      }
    }
  }
];

// Generates fully localized questions for any competitive exam
// Integrates authentic High-Yield Vault (Reasoning, Math, Law, Tech, GK, Hindi, English) with zero repetition
function getCompetitiveLocalizedQuestions(examId = "ssc-gd", subjectId = "all", requestedCount = 30) {
  const examObj = EXAMS_CONFIG.find(e => e.id === examId) || EXAMS_CONFIG[0];
  const langMode = examObj.langMode || "bilingual-hindi";
  const examName = examObj.name;
  const vault = getHighYieldVault();

  const normSub = (subjectId || 'all').toLowerCase();

  // 1. Strict Subject-Wise High-Yield Integration for Competitive Exams
  let specificBank = null;
  let cleanSub = normSub;

  if (normSub === 'reasoning' || normSub.includes('reason') || normSub.includes('तर्क') || normSub.includes('तार्किक') || normSub.includes('बुद्धिलब्धि') || normSub.includes('अभिरुचि')) {
    specificBank = vault.reasoning;
    cleanSub = 'reasoning';
  } else if (normSub === 'math' || normSub.includes('math') || normSub.includes('गणित') || normSub.includes('quant') || normSub.includes('संख्यात्मक')) {
    specificBank = (vault.compMath && vault.compMath.length > 0) ? vault.compMath : vault.math;
    cleanSub = 'math';
  } else if (normSub === 'law' || normSub.includes('law') || normSub.includes('मूलविधि') || normSub.includes('संविधान') || normSub.includes('विधि') || normSub.includes('mool') || normSub.includes('police-law')) {
    specificBank = vault.compLaw;
    cleanSub = 'law';
  } else if (normSub === 'tech' || normSub.includes('tech') || normSub.includes('science') || normSub.includes('विज्ञान') || normSub.includes('भौतिक')) {
    specificBank = (vault.compTech && vault.compTech.length > 0) ? vault.compTech : vault.science;
    cleanSub = 'science';
  } else if (normSub === 'gk' || normSub === 'gs' || normSub.includes('gk') || normSub.includes('general') || normSub.includes('सामान्य ज्ञान') || normSub.includes('up-gk') || normSub.includes('affairs')) {
    specificBank = [...(vault.compGk || []), ...(vault.compLaw || []), ...(vault.social || [])];
    cleanSub = 'gk';
  } else if (normSub === 'hindi' || normSub.includes('hindi') || normSub.includes('हिन्दी')) {
    specificBank = vault.hindi;
    cleanSub = 'hindi';
  } else if (normSub === 'english' || normSub.includes('english') || normSub.includes('अंग्रेजी')) {
    specificBank = vault.english;
    cleanSub = 'english';
  }

  if (specificBank && specificBank.length > 0) {
    const shuffledBank = shuffleArray([...specificBank]);
    const result = [];
    const seenTitles = new Set();
    for (let i = 0; i < shuffledBank.length && result.length < requestedCount; i++) {
      const item = shuffledBank[i];
      const cleanTitle = (item.q || '').split('\n')[0].trim();
      if (!seenTitles.has(cleanTitle)) {
        seenTitles.add(cleanTitle);
        result.push({
          id: `${examId}-${cleanSub}-${result.length + 1}`,
          uniqueKey: `${examId}-${cleanSub}-${result.length + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          examTags: [examId],
          subjectTags: [cleanSub],
          subjectName: getSubjectDisplayName(cleanSub),
          q: item.q,
          options: [...item.options],
          correct: item.correct !== undefined ? item.correct : 0,
          ans: item.ans,
          explanation: item.exp || item.explanation,
          topic: `${item.topic} (${examName})`,
          boardTag: examName
        });
      }
    }
    return result;
  }

  // Interleave for 'all' based on exam type:
  if (normSub === 'all') {
    let examBanks = [];
    if (examId === 'up-police' || examId.includes('police')) {
      examBanks = [
        { name: 'law', list: vault.compLaw },
        { name: 'gk', list: vault.compGk },
        { name: 'hindi', list: vault.hindi },
        { name: 'math', list: (vault.compMath && vault.compMath.length > 0) ? vault.compMath : vault.math },
        { name: 'reasoning', list: vault.reasoning }
      ];
    } else if (examId.includes('railway')) {
      examBanks = [
        { name: 'tech', list: vault.compTech },
        { name: 'math', list: (vault.compMath && vault.compMath.length > 0) ? vault.compMath : vault.math },
        { name: 'reasoning', list: vault.reasoning },
        { name: 'gk', list: vault.compGk }
      ];
    } else {
      // SSC GD / CGL / Central
      examBanks = [
        { name: 'reasoning', list: vault.reasoning },
        { name: 'math', list: (vault.compMath && vault.compMath.length > 0) ? vault.compMath : vault.math },
        { name: 'gk', list: vault.compGk },
        { name: 'hindi', list: vault.hindi },
        { name: 'english', list: vault.english }
      ];
    }
    const activeBanks = examBanks.filter(b => b.list && b.list.length > 0);
    if (activeBanks.length > 0) {
      activeBanks.forEach(b => { b.shuffled = shuffleArray([...b.list]); });
      const result = [];
      let bIdx = 0;
      const counters = {};
      activeBanks.forEach(b => { counters[b.name] = 0; });
      const totalAvailable = activeBanks.reduce((sum, b) => sum + b.shuffled.length, 0);
      const targetCount = Math.min(requestedCount, totalAvailable);
      let attempts = 0;

      const seenTitles = new Set();
      while (result.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const bEntry = activeBanks[bIdx % activeBanks.length];
        const sub = bEntry.name;
        const list = bEntry.shuffled;
        if (counters[sub] < list.length) {
          const item = list[counters[sub]];
          counters[sub]++;
          const cleanTitle = (item.q || '').split('\n')[0].trim();
          if (!seenTitles.has(cleanTitle)) {
            seenTitles.add(cleanTitle);
            result.push({
              id: `${examId}-${sub}-${result.length + 1}`,
              uniqueKey: `${examId}-${sub}-${result.length + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              examTags: [examId],
              subjectTags: [sub],
              subjectName: getSubjectDisplayName(sub),
              q: item.q,
              options: [...item.options],
              correct: item.correct !== undefined ? item.correct : 0,
              ans: item.ans,
              explanation: item.exp || item.explanation,
              topic: `${item.topic} (${examName})`,
              boardTag: examName
            });
          }
        }
        bIdx++;
      }
      return result;
    }
  }

  // 2. Filter blueprints matching subject and exam tags
  let candidates = COMPETITIVE_BLUEPRINTS.filter(bp => {
    const subMatch = (subjectId === "all") || bp.subjectTags.includes(subjectId);
    const examMatch = (examId === "all-india-mix") || bp.examTags.includes(examId) || bp.examTags.includes(examObj.category) || bp.examTags.includes("all");
    return subMatch && examMatch;
  });

  if (candidates.length === 0) {
    candidates = COMPETITIVE_BLUEPRINTS.filter(bp => {
      return (subjectId === "all") || bp.subjectTags.includes(subjectId);
    });
  }
  if (candidates.length === 0) {
    candidates = COMPETITIVE_BLUEPRINTS;
  }

  // Interleave subjects when 'all' is selected
  let pool = [];
  if (subjectId === "all") {
    const subjectsMap = {};
    candidates.forEach(bp => {
      const primarySub = bp.subjectTags.find(t => t !== "all") || "gk";
      if (!subjectsMap[primarySub]) subjectsMap[primarySub] = [];
      subjectsMap[primarySub].push(bp);
    });
    Object.values(subjectsMap).forEach(list => shuffleArray(list));

    const subjectKeys = Object.keys(subjectsMap);
    let sIdx = 0;
    const counters = {};
    subjectKeys.forEach(k => { counters[k] = 0; });

    while (pool.length < Math.max(requestedCount * 2, candidates.length * 3)) {
      const sk = subjectKeys[sIdx % subjectKeys.length];
      const list = subjectsMap[sk];
      if (list && list.length > 0) {
        pool.push(list[counters[sk] % list.length]);
        counters[sk]++;
      }
      sIdx++;
      if (pool.length >= requestedCount * 3) break;
    }
  } else {
    pool = [...candidates];
    shuffleArray(pool);
  }

  const result = [];
  let idx = 0;
  const count = Math.min(requestedCount, pool.length);
  while (result.length < count) {
    const bp = pool[idx];
    const loc = bp.loc[langMode] || bp.loc["bilingual-hindi"] || bp.loc["english"];
    const mainSub = bp.subjectTags.find(t => t !== "all") || "general";
    const subName = getSubjectDisplayName(mainSub);

    let qText = loc.q;
    if (loc.sub && langMode !== "english") {
      qText += `\n[${loc.sub}]`;
    } else if (loc.sub && langMode === "english") {
      qText += `\n[${examName} - High-Yield Target Model]`;
    }

    result.push({
      id: `${examId}-${subjectId}-${result.length + 1}`,
      uniqueKey: `${examId}-${result.length + 1}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      examTags: [examId],
      subjectTags: [...bp.subjectTags],
      subjectName: subName,
      q: qText,
      options: [...loc.options],
      correct: loc.correct !== undefined ? loc.correct : 0,
      ans: loc.ans,
      explanation: loc.exp,
      topic: `${bp.topic} (${examName})`,
      boardTag: examName
    });
    idx++;
  }

  return result;
}

// Master Filter: Checks whether exam is Board (and uses exact Board Medium) or Competitive CBT
function getFilteredQuestions(examId = "ssc-gd", subjectId = "all", requestedCount = 30, boardId = "") {
  const examObj = (typeof EXAMS_CONFIG !== 'undefined') ? EXAMS_CONFIG.find(e => e.id === examId) : null;
  const isBoardExam = examObj ? Boolean(examObj.isBoard) : (examId.startsWith("board-") || examId.includes("10th") || examId.includes("12th"));

  if (isBoardExam) {
    let classLevel = "10th";
    let stream = "general";
    if (examId.includes("12th") || examId.includes("12")) {
      classLevel = "12th";
      if (examId.includes("commerce")) stream = "commerce";
      else if (examId.includes("arts")) stream = "arts";
      else stream = "science";
    }
    const effectiveBoard = boardId || "bseb";
    return getBoardLocalizedQuestions(effectiveBoard, classLevel, subjectId, requestedCount, stream);
  }

  // All Central, Police, Defence, Entrance & Teaching Exams (with strict medium/regional language fidelity):
  return getCompetitiveLocalizedQuestions(examId, subjectId, requestedCount);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXAMS_CONFIG,
    BOARD_METADATA,
    CLIENT_BLUEPRINTS,
    COMPETITIVE_BLUEPRINTS,
    getHighYieldVault,
    getBoardLocalizedQuestions,
    getCompetitiveLocalizedQuestions,
    getFilteredQuestions,
    getSubjectsForBoard
  };
}

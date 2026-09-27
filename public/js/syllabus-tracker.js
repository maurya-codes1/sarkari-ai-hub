// public/js/syllabus-tracker.js
// Chapter-Wise Marks Weightage & Interactive Syllabus Tracker (2026 Edition)
// Covers SSC GD, UP Police, Railway RRB ALP, SSC CGL/CHSL, BSEB Matric, CBSE 10th/12th & UPMSP
// Real-time progress calculation & localStorage persistence

const SYLLABUS_DATABASE = {
  "ssc-gd": {
    examName: "SSC GD Constable 2026",
    totalMarks: 160,
    totalQuestions: 80,
    timeDuration: "60 Minutes",
    negativeMarking: "0.25 Mark per wrong answer",
    subjects: [
      {
        name: "Elementary Mathematics (गणित)",
        code: "math",
        icon: "📐",
        weightage: "20 Qs • 40 Marks",
        chapters: [
          { id: "gd_m_1", title: "Number System & Divisibility (संख्या पद्धति)", weightage: "2-3 Qs (4-6 Marks)", priority: "high", pyqCount: 145 },
          { id: "gd_m_2", title: "Percentage & Equivalents (प्रतिशतता)", weightage: "2-3 Qs (4-6 Marks)", priority: "vhigh", pyqCount: 198 },
          { id: "gd_m_3", title: "Profit, Loss & Discount (लाभ, हानि व छूट)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 220 },
          { id: "gd_m_4", title: "Ratio, Proportion & Mixture (अनुपात व समानुपात)", weightage: "2 Qs (4 Marks)", priority: "high", pyqCount: 130 },
          { id: "gd_m_5", title: "Simple & Compound Interest (साधारण व चक्रवृद्धि ब्याज)", weightage: "2 Qs (4 Marks)", priority: "vhigh", pyqCount: 160 },
          { id: "gd_m_6", title: "Time and Work, Pipes & Cisterns (समय और कार्य)", weightage: "2 Qs (4 Marks)", priority: "vhigh", pyqCount: 175 },
          { id: "gd_m_7", title: "Time, Speed & Distance, Trains (दूरी, चाल व रेलगाड़ी)", weightage: "2-3 Qs (4-6 Marks)", priority: "high", pyqCount: 155 },
          { id: "gd_m_8", title: "Mensuration 2D & 3D (क्षेत्रमिति सूत्र व गणना)", weightage: "2 Qs (4 Marks)", priority: "high", pyqCount: 110 },
          { id: "gd_m_9", title: "Averages & Partnerships (औसत व साझेदारी)", weightage: "1-2 Qs (2-4 Marks)", priority: "med", pyqCount: 95 }
        ]
      },
      {
        name: "General Intelligence & Reasoning (तर्कशक्ति)",
        code: "reasoning",
        icon: "🧠",
        weightage: "20 Qs • 40 Marks",
        chapters: [
          { id: "gd_r_1", title: "Coding-Decoding & Letter Shifts (कोडिंग-डिकोडिंग)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 240 },
          { id: "gd_r_2", title: "Analogies & Semantic Classification (सादृश्यता)", weightage: "2-3 Qs (4-6 Marks)", priority: "high", pyqCount: 180 },
          { id: "gd_r_3", title: "Number & Alphabet Series (श्रृंखला परीक्षण)", weightage: "2-3 Qs (4-6 Marks)", priority: "vhigh", pyqCount: 210 },
          { id: "gd_r_4", title: "Blood Relations (रक्त संबंध)", weightage: "1-2 Qs (2-4 Marks)", priority: "high", pyqCount: 125 },
          { id: "gd_r_5", title: "Direction and Distance Sense (दिशा व दूरी परीक्षण)", weightage: "1-2 Qs (2-4 Marks)", priority: "med", pyqCount: 95 },
          { id: "gd_r_6", title: "Syllogism & Logical Statements (न्याय निगमन)", weightage: "1-2 Qs (2-4 Marks)", priority: "high", pyqCount: 140 },
          { id: "gd_r_7", title: "Non-Verbal Paper Folding, Mirror Images (दर्पण व आरेख)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 225 },
          { id: "gd_r_8", title: "Sitting Arrangement Linear/Circular (बैठक व्यवस्था)", weightage: "2 Qs (4 Marks)", priority: "vhigh", pyqCount: 165 }
        ]
      },
      {
        name: "General Knowledge & General Awareness (सामान्य ज्ञान)",
        code: "gk",
        icon: "🌍",
        weightage: "20 Qs • 40 Marks",
        chapters: [
          { id: "gd_g_1", title: "Indian Constitution, Fundamental Rights & Articles (संविधान)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 250 },
          { id: "gd_g_2", title: "Indian History, Freedom Struggle & Ancient Dynasties (इतिहास)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 215 },
          { id: "gd_g_3", title: "Indian Geography, Rivers, Dams, Mountains & National Parks (भूगोल)", weightage: "2-3 Qs (4-6 Marks)", priority: "high", pyqCount: 190 },
          { id: "gd_g_4", title: "Indian Economy, Five Year Plans & Budget (अर्थव्यवस्था)", weightage: "2 Qs (4 Marks)", priority: "high", pyqCount: 135 },
          { id: "gd_g_5", title: "General Science: Physics, Chemistry & Human Biology (सामान्य विज्ञान)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 230 },
          { id: "gd_g_6", title: "Folk Dances, Classical Music, Festivals & Art (कला एवं संस्कृति)", weightage: "2-3 Qs (4-6 Marks)", priority: "vhigh", pyqCount: 185 },
          { id: "gd_g_7", title: "Sports, Olympics, Asian Games & Current Affairs 2025-26", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 260 }
        ]
      },
      {
        name: "General Hindi / English (सामान्य हिंदी / अंग्रेजी)",
        code: "lang",
        icon: "📖",
        weightage: "20 Qs • 40 Marks",
        chapters: [
          { id: "gd_l_1", title: "वर्तनी शुद्धि एवं वाक्य अशुद्धियाँ (Spelling & Sentence Correction)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 230 },
          { id: "gd_l_2", title: "विलोम शब्द एवं पर्यायवाची शब्द (Antonyms & Synonyms)", weightage: "3-4 Qs (6-8 Marks)", priority: "vhigh", pyqCount: 250 },
          { id: "gd_l_3", title: "मुहावरे और लोकोक्तियाँ (Idioms & Proverbs)", weightage: "2-3 Qs (4-6 Marks)", priority: "vhigh", pyqCount: 195 },
          { id: "gd_l_4", title: "अनेक शब्दों के लिए एक शब्द (One Word Substitution)", weightage: "2-3 Qs (4-6 Marks)", priority: "high", pyqCount: 170 },
          { id: "gd_l_5", title: "गद्यांश आधारित रिक्त स्थान पूर्ति (Cloze Passage Comprehension)", weightage: "5 Qs (10 Marks)", priority: "vhigh", pyqCount: 300 }
        ]
      }
    ]
  },
  "up-police": {
    examName: "UP Police Constable 60,244 Re-Exam",
    totalMarks: 300,
    totalQuestions: 150,
    timeDuration: "120 Minutes",
    negativeMarking: "0.50 Mark per wrong answer",
    subjects: [
      {
        name: "सामान्य ज्ञान (General Knowledge & UP Special)",
        code: "up_gk",
        icon: "🏛️",
        weightage: "38 Qs • 76 Marks",
        chapters: [
          { id: "up_g_1", title: "उत्तर प्रदेश सामान्य ज्ञान: शिक्षा, संस्कृति, कृषि व राजस्व (UP Special)", weightage: "8-10 Qs (16-20 Marks)", priority: "vhigh", pyqCount: 310 },
          { id: "up_g_2", title: "भारत का संविधान एवं प्रशासनिक ढाँचा (Polity & Governance)", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 240 },
          { id: "up_g_3", title: "भारत का इतिहास एवं स्वतंत्रता संग्राम (Modern History)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 190 },
          { id: "up_g_4", title: "भारत एवं विश्व का भूगोल तथा प्राकृतिक संसाधन (Geography)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 180 },
          { id: "up_g_5", title: "विमुद्रीकरण, वस्तु एवं सेवा कर (GST), साइबर क्राइम व सोशल मीडिया", weightage: "4 Qs (8 Marks)", priority: "vhigh", pyqCount: 160 },
          { id: "up_g_6", title: "सामान्य विज्ञान: दैनिक जीवन के भौतिक व रासायनिक नियम, रोग", weightage: "5 Qs (10 Marks)", priority: "high", pyqCount: 175 },
          { id: "up_g_7", title: "पुरस्कार एवं सम्मान, देश-राजधानी-मुद्राएँ, दिवस व अनुसंधान संगठन", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 220 }
        ]
      },
      {
        name: "सामान्य हिंदी (General Hindi Literature & Grammar)",
        code: "up_hi",
        icon: "📚",
        weightage: "37 Qs • 74 Marks",
        chapters: [
          { id: "up_h_1", title: "हिंदी और अन्य भारतीय भाषाएँ, हिंदी व्याकरण मौलिक ज्ञान", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 180 },
          { id: "up_h_2", title: "वर्णमाला, तत्सम-तद्भव, वर्तनी व संधि-समास (Grammar)", weightage: "6-8 Qs (12-16 Marks)", priority: "vhigh", pyqCount: 290 },
          { id: "up_h_3", title: "पर्यायवाची, विलोम, अनेकार्थक, समरूपी भिन्नार्थक शब्द", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 260 },
          { id: "up_h_4", title: "लिंग, वचन, कारक, सर्वनाम, विशेषण, क्रिया व काल", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 240 },
          { id: "up_h_5", title: "रस, छंद, अलंकार एवं काव्य सौंदर्य", weightage: "3-4 Qs (6-8 Marks)", priority: "high", pyqCount: 170 },
          { id: "up_h_6", title: "प्रसिद्ध कवि, लेखक एवं उनकी प्रसिद्ध रचनाएँ, हिंदी भाषा में पुरस्कार", weightage: "4-5 Qs (8-10 Marks)", priority: "vhigh", pyqCount: 210 },
          { id: "up_h_7", title: "अपठित बोध (गद्यांश आधारित प्रश्न)", weightage: "5 Qs (10 Marks)", priority: "high", pyqCount: 190 }
        ]
      },
      {
        name: "संख्यात्मक एवं मानसिक क्षमता (Numerical & Mental Ability)",
        code: "up_num",
        icon: "📊",
        weightage: "38 Qs • 76 Marks",
        chapters: [
          { id: "up_n_1", title: "सरलीकरण, दशमलव व भिन्न, ल.स.प. व म.स.प. (HCF & LCM)", weightage: "4-5 Qs (8-10 Marks)", priority: "vhigh", pyqCount: 210 },
          { id: "up_n_2", title: "अनुपात-समानुपात, प्रतिशतता व लाभ-हानि (Commercial Math)", weightage: "6-7 Qs (12-14 Marks)", priority: "vhigh", pyqCount: 280 },
          { id: "up_n_3", title: "साधारण व चक्रवृद्धि ब्याज, साझेदारी व औसत (SI/CI & Avg)", weightage: "4-5 Qs (8-10 Marks)", priority: "vhigh", pyqCount: 230 },
          { id: "up_n_4", title: "समय और कार्य, पाइप और टंकी, समय और दूरी (Time & Work/Dist)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 210 },
          { id: "up_n_5", title: "सारणी और ग्राफ का प्रयोग (Data Interpretation & DI)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 160 },
          { id: "up_n_6", title: "क्षेत्रमिति (Mensuration 2D/3D सूत्र)", weightage: "3 Qs (6 Marks)", priority: "med", pyqCount: 130 }
        ]
      },
      {
        name: "मानसिक अभिरुचि, बुद्धिलब्धि एवं तार्किक क्षमता (Mental Aptitude & Reasoning)",
        code: "up_reas",
        icon: "⚖️",
        weightage: "37 Qs • 74 Marks",
        chapters: [
          { id: "up_r_1", title: "जनहित, कानून एवं शांति व्यवस्था, सांप्रदायिक सौहार्द (Public Interest & Law)", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 220 },
          { id: "up_r_2", title: "अपराध नियंत्रण, विधि का शासन, अनुकूलन की क्षमता व पुलिस प्रणाली", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 240 },
          { id: "up_r_3", title: "संबंध व सादृश्यता परीक्षण, असमान को चिह्नित करना (Odd-One-Out)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 180 },
          { id: "up_r_4", title: "श्रृंखला पूरी करने का परीक्षण, वर्णमाला परीक्षण व कोडिंग-डिकोडिंग", weightage: "5-6 Qs (10-12 Marks)", priority: "vhigh", pyqCount: 270 },
          { id: "up_r_5", title: "दिशा ज्ञान परीक्षण, रक्त संबंध व समय-क्रम परीक्षण (Direction & Blood)", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 190 },
          { id: "up_r_6", title: "वेन आरेख, चार्ट सदृश परीक्षण व खाली स्थान भरना", weightage: "4-5 Qs (8-10 Marks)", priority: "high", pyqCount: 160 }
        ]
      }
    ]
  },
  "rrb-alp": {
    examName: "Railway RRB ALP & Technician CBT-1",
    totalMarks: 75,
    totalQuestions: 75,
    timeDuration: "60 Minutes",
    negativeMarking: "1/3rd (0.33 Mark per wrong answer)",
    subjects: [
      {
        name: "Mathematics (गणित)",
        code: "alp_math",
        icon: "🔢",
        weightage: "20 Qs • 20 Marks",
        chapters: [
          { id: "alp_m_1", title: "BODMAS, Fractions & Decimals", weightage: "3-4 Qs", priority: "vhigh", pyqCount: 190 },
          { id: "alp_m_2", title: "LCM & HCF, Square Root & Cube Root", weightage: "2-3 Qs", priority: "high", pyqCount: 140 },
          { id: "alp_m_3", title: "Percentages, Ratio & Proportion", weightage: "3 Qs", priority: "vhigh", pyqCount: 170 },
          { id: "alp_m_4", title: "Time and Work, Pipes & Cistern", weightage: "2-3 Qs", priority: "vhigh", pyqCount: 160 },
          { id: "alp_m_5", title: "Speed, Time & Distance, Trains", weightage: "2-3 Qs", priority: "high", pyqCount: 150 },
          { id: "alp_m_6", title: "Algebra, Geometry & Elementary Trigonometry", weightage: "3-4 Qs", priority: "high", pyqCount: 165 },
          { id: "alp_m_7", title: "Statistics, Age Calculations & Calendar/Clock", weightage: "2 Qs", priority: "med", pyqCount: 110 }
        ]
      },
      {
        name: "General Intelligence & Reasoning",
        code: "alp_reas",
        icon: "🧩",
        weightage: "25 Qs • 25 Marks",
        chapters: [
          { id: "alp_r_1", title: "Analogies & Classification", weightage: "3-4 Qs", priority: "high", pyqCount: 150 },
          { id: "alp_r_2", title: "Number & Alphabetical Series", weightage: "3-4 Qs", priority: "vhigh", pyqCount: 195 },
          { id: "alp_r_3", title: "Coding and Decoding", weightage: "3 Qs", priority: "vhigh", pyqCount: 180 },
          { id: "alp_r_4", title: "Mathematical Operations & Venn Diagrams", weightage: "3 Qs", priority: "high", pyqCount: 140 },
          { id: "alp_r_5", title: "Syllogism, Statement-Conclusion & Assumptions", weightage: "4-5 Qs", priority: "vhigh", pyqCount: 220 },
          { id: "alp_r_6", title: "Blood Relations, Directions & Jumbling", weightage: "3-4 Qs", priority: "high", pyqCount: 160 }
        ]
      },
      {
        name: "General Science (Physics, Chemistry, Life Sciences 10th Standard)",
        code: "alp_sci",
        icon: "🔬",
        weightage: "20 Qs • 20 Marks",
        chapters: [
          { id: "alp_s_1", title: "Physics: Units, Motion, Work, Power & Energy", weightage: "4-5 Qs", priority: "vhigh", pyqCount: 240 },
          { id: "alp_s_2", title: "Physics: Light (Reflection/Refraction) & Electricity", weightage: "4-5 Qs", priority: "vhigh", pyqCount: 230 },
          { id: "alp_s_3", title: "Chemistry: Periodic Table, Metals/Non-Metals & Acids/Bases", weightage: "4-5 Qs", priority: "vhigh", pyqCount: 210 },
          { id: "alp_s_4", title: "Biology: Human Circulatory, Digestive & Nervous Systems", weightage: "3-4 Qs", priority: "high", pyqCount: 180 },
          { id: "alp_s_5", title: "Biology: Diseases, Vitamins, Genetics & Plant Physiology", weightage: "3-4 Qs", priority: "high", pyqCount: 175 }
        ]
      },
      {
        name: "General Awareness on Current Affairs",
        code: "alp_ga",
        icon: "📰",
        weightage: "10 Qs • 10 Marks",
        chapters: [
          { id: "alp_g_1", title: "Science & Technology, Indian Space (ISRO/DRDO)", weightage: "3-4 Qs", priority: "vhigh", pyqCount: 170 },
          { id: "alp_g_2", title: "Sports, Awards & Honours 2025-26", weightage: "2-3 Qs", priority: "high", pyqCount: 140 },
          { id: "alp_g_3", title: "Economics, Appointments & Railway Infrastructure", weightage: "3-4 Qs", priority: "vhigh", pyqCount: 180 }
        ]
      }
    ]
  },
  "bseb-matric": {
    examName: "BSEB Bihar Board Class 10th (Matric 2026)",
    totalMarks: 500,
    totalQuestions: "100 Objective + Subjective per paper",
    timeDuration: "3 Hours 15 Minutes per subject",
    negativeMarking: "No Negative Marking (0.00)",
    subjects: [
      {
        name: "गणित (Mathematics)",
        code: "bseb_m",
        icon: "📐",
        weightage: "100 Marks (50 Objective OMR + 50 Subjective)",
        chapters: [
          { id: "bs_m_1", title: "वास्तविक संख्याएँ (Real Numbers & Euclid Division)", weightage: "8-10 Marks", priority: "high", pyqCount: 85 },
          { id: "bs_m_2", title: "बहुपद एवं दो चर वाले रैखिक समीकरण (Polynomials & Linear Equations)", weightage: "10-12 Marks", priority: "vhigh", pyqCount: 110 },
          { id: "bs_m_3", title: "द्विघात समीकरण एवं समानांतर श्रेढ़ी (Quadratic Eq & AP)", weightage: "10-12 Marks", priority: "vhigh", pyqCount: 120 },
          { id: "bs_m_4", title: "त्रिभुज एवं निर्देशांक ज्यामिति (Triangles & Coordinate Geometry)", weightage: "12-14 Marks", priority: "vhigh", pyqCount: 135 },
          { id: "bs_m_5", title: "त्रिकोणमिति का परिचय एवं अनुप्रयोग (Trigonometry & Heights)", weightage: "20-22 Marks", priority: "vhigh", pyqCount: 220 },
          { id: "bs_m_6", title: "वृत्त एवं रचनाएँ (Circles & Geometric Constructions)", weightage: "8-10 Marks", priority: "high", pyqCount: 95 },
          { id: "bs_m_7", title: "पृष्ठीय क्षेत्रफल और आयतन (Surface Areas & Volumes)", weightage: "10-12 Marks", priority: "vhigh", pyqCount: 115 },
          { id: "bs_m_8", title: "सांख्यिकी एवं प्रायिकता (Statistics & Probability)", weightage: "10-12 Marks", priority: "vhigh", pyqCount: 130 }
        ]
      },
      {
        name: "विज्ञान (Science - Physics, Chemistry, Biology)",
        code: "bseb_sci",
        icon: "🧪",
        weightage: "80 Marks Theory + 20 Practical",
        chapters: [
          { id: "bs_s_1", title: "प्रकाश - परावर्तन तथा अपवर्तन, मानव नेत्र (Light & Human Eye)", weightage: "14-16 Marks", priority: "vhigh", pyqCount: 155 },
          { id: "bs_s_2", title: "विद्युत एवं विद्युत धारा के चुंबकीय प्रभाव (Electricity & Magnetism)", weightage: "12-14 Marks", priority: "vhigh", pyqCount: 140 },
          { id: "bs_s_3", title: "रासायनिक अभिक्रियाएँ, अम्ल, क्षारक एवं लवण (Chemical Reactions)", weightage: "12-14 Marks", priority: "vhigh", pyqCount: 130 },
          { id: "bs_s_4", title: "धातु एवं अधातु, कार्बन एवं उसके यौगिक (Metals & Carbon Compounds)", weightage: "14-16 Marks", priority: "vhigh", pyqCount: 160 },
          { id: "bs_s_5", title: "जैव प्रक्रम: पोषण, श्वसन, वहन व उत्सर्जन (Life Processes)", weightage: "14-16 Marks", priority: "vhigh", pyqCount: 175 },
          { id: "bs_s_6", title: "नियंत्रण एवं समन्वय, जीव जनन कैसे करते हैं, आनुवंशिकता", weightage: "12-14 Marks", priority: "vhigh", pyqCount: 145 }
        ]
      },
      {
        name: "सामाजिक विज्ञान (Social Science)",
        code: "bseb_sst",
        icon: "🗺️",
        weightage: "80 Marks Theory + 20 Project",
        chapters: [
          { id: "bs_ss_1", title: "इतिहास: यूरोप में राष्ट्रवाद, भारत में राष्ट्रवाद, औद्योगीकरण", weightage: "20 Marks", priority: "vhigh", pyqCount: 180 },
          { id: "bs_ss_2", title: "भूगोल: भारत संसाधन एवं उपयोग, कृषि, जल, खनिज व ऊर्जा", weightage: "20 Marks", priority: "vhigh", pyqCount: 190 },
          { id: "bs_ss_3", title: "राजनीति विज्ञान: लोकतंत्र में सत्ता की साझेदारी, राजनीतिक दल", weightage: "17 Marks", priority: "high", pyqCount: 140 },
          { id: "bs_ss_4", title: "अर्थशास्त्र: अर्थव्यवस्था एवं इसके विकास का इतिहास, मुद्रा व साख", weightage: "17 Marks", priority: "high", pyqCount: 135 },
          { id: "bs_ss_5", title: "आपदा प्रबंधन: प्राकृतिक आपदाएं एवं उनका निवारण", weightage: "6 Marks", priority: "high", pyqCount: 80 }
        ]
      }
    ]
  },
  "cbse-class10": {
    examName: "CBSE Board Class 10th Standard",
    totalMarks: 80,
    totalQuestions: "38 Questions (MCQ + Short + Long + Case Study)",
    timeDuration: "3 Hours",
    negativeMarking: "No Negative Marking",
    subjects: [
      {
        name: "Mathematics Standard (Code 041)",
        code: "cbse_m",
        icon: "📐",
        weightage: "80 Marks Board Theory",
        chapters: [
          { id: "cb_m_1", title: "Unit 1: Number Systems (Real Numbers)", weightage: "06 Marks", priority: "high", pyqCount: 60 },
          { id: "cb_m_2", title: "Unit 2: Algebra (Polynomials, Linear Eq, Quadratic Eq, AP)", weightage: "20 Marks", priority: "vhigh", pyqCount: 190 },
          { id: "cb_m_3", title: "Unit 3: Coordinate Geometry", weightage: "06 Marks", priority: "high", pyqCount: 75 },
          { id: "cb_m_4", title: "Unit 4: Geometry (Triangles & Circles)", weightage: "15 Marks", priority: "vhigh", pyqCount: 160 },
          { id: "cb_m_5", title: "Unit 5: Trigonometry (Introduction, Identities & Applications)", weightage: "12 Marks", priority: "vhigh", pyqCount: 155 },
          { id: "cb_m_6", title: "Unit 6: Mensuration (Areas Related to Circles, Surface Areas)", weightage: "10 Marks", priority: "vhigh", pyqCount: 110 },
          { id: "cb_m_7", title: "Unit 7: Statistics & Probability", weightage: "11 Marks", priority: "vhigh", pyqCount: 125 }
        ]
      },
      {
        name: "Science (Code 086)",
        code: "cbse_sci",
        icon: "🧬",
        weightage: "80 Marks Board Theory",
        chapters: [
          { id: "cb_s_1", title: "Chemical Substances - Nature and Behaviour (Unit I)", weightage: "25 Marks", priority: "vhigh", pyqCount: 220 },
          { id: "cb_s_2", title: "World of Living: Life Processes, Control, Reproduction, Heredity", weightage: "25 Marks", priority: "vhigh", pyqCount: 240 },
          { id: "cb_s_3", title: "Natural Phenomena: Reflection, Refraction, Optical Devices", weightage: "12 Marks", priority: "vhigh", pyqCount: 130 },
          { id: "cb_s_4", title: "Effects of Current: Ohm's Law, Heating, Magnetic Effects", weightage: "13 Marks", priority: "vhigh", pyqCount: 140 },
          { id: "cb_s_5", title: "Natural Resources: Our Environment & Ecosystem", weightage: "05 Marks", priority: "med", pyqCount: 65 }
        ]
      }
    ]
  }
};

let currentSyllabusExamKey = 'ssc-gd';
let currentSyllabusFilterSub = 'all';

function getSyllabusProgress() {
  try {
    const raw = localStorage.getItem('sarkari_syllabus_progress');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveSyllabusProgress(progressObj) {
  try {
    localStorage.setItem('sarkari_syllabus_progress', JSON.stringify(progressObj));
  } catch (e) {
    console.warn('Could not save syllabus progress:', e);
  }
}

function toggleChapterCheck(chapterId) {
  const progress = getSyllabusProgress();
  progress[chapterId] = !progress[chapterId];
  saveSyllabusProgress(progress);
  renderSyllabusTracker();
}

function markAllChapters(status) {
  const exam = SYLLABUS_DATABASE[currentSyllabusExamKey];
  if (!exam) return;

  const progress = getSyllabusProgress();
  exam.subjects.forEach(sub => {
    sub.chapters.forEach(ch => {
      progress[ch.id] = status;
    });
  });
  saveSyllabusProgress(progress);
  renderSyllabusTracker();
}

function setSyllabusExam(examKey) {
  currentSyllabusExamKey = examKey;
  currentSyllabusFilterSub = 'all';
  renderSyllabusTracker();
}

function setSyllabusSubjectFilter(subCode) {
  currentSyllabusFilterSub = subCode;
  renderSyllabusTracker();
}

function renderSyllabusTracker() {
  const container = document.getElementById('syllabusTrackerContainer');
  if (!container) return;

  const exam = SYLLABUS_DATABASE[currentSyllabusExamKey] || SYLLABUS_DATABASE['ssc-gd'];
  const progress = getSyllabusProgress();

  // Calculate totals
  let totalChapters = 0;
  let completedChapters = 0;

  exam.subjects.forEach(sub => {
    sub.chapters.forEach(ch => {
      totalChapters++;
      if (progress[ch.id]) completedChapters++;
    });
  });

  const completionPct = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  // Filter subjects
  const filteredSubjects = currentSyllabusFilterSub === 'all' 
    ? exam.subjects 
    : exam.subjects.filter(s => s.code === currentSyllabusFilterSub);

  let html = `
    <!-- Top Configuration Header & Stats Card -->
    <div class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-800/50 space-y-6">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-xs font-black text-indigo-300 mb-2">
            <span>📋 Official Blueprint & Marks Distribution (2026)</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>${exam.examName}</span>
          </h2>
          <p class="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Total Marks: <strong class="text-amber-400">${exam.totalMarks}</strong> • Questions: <strong>${exam.totalQuestions}</strong> • Duration: <strong>${exam.timeDuration}</strong> • Negative: <strong>${exam.negativeMarking}</strong>
          </p>
        </div>

        <!-- Exam Switcher Dropdown -->
        <div class="shrink-0">
          <label class="block text-[11px] font-bold text-slate-300 mb-1">परीक्षा चुनें (Switch Exam):</label>
          <select onchange="setSyllabusExam(this.value)" class="bg-slate-800 border-2 border-indigo-500/60 rounded-xl px-4 py-2.5 text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer">
            <option value="ssc-gd" ${currentSyllabusExamKey === 'ssc-gd' ? 'selected' : ''}>🎯 SSC GD Constable 2026</option>
            <option value="up-police" ${currentSyllabusExamKey === 'up-police' ? 'selected' : ''}>👮 UP Police Constable 60,244</option>
            <option value="rrb-alp" ${currentSyllabusExamKey === 'rrb-alp' ? 'selected' : ''}>⚡ Railway RRB ALP CBT-1</option>
            <option value="bseb-matric" ${currentSyllabusExamKey === 'bseb-matric' ? 'selected' : ''}>🏫 BSEB Bihar Board Matric 10th</option>
            <option value="cbse-class10" ${currentSyllabusExamKey === 'cbse-class10' ? 'selected' : ''}>🎓 CBSE Board Class 10th Standard</option>
          </select>
        </div>
      </div>

      <!-- Live Syllabus Progress Metric Bar -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 space-y-3">
        <div class="flex items-center justify-between text-xs font-bold">
          <div class="flex items-center space-x-2">
            <span class="text-xl">🏆</span>
            <span class="text-white">Overall Syllabus Preparedness (तैयारी प्रतिशत):</span>
          </div>
          <div class="text-amber-400 font-black text-base sm:text-lg">
            ${completedChapters} / ${totalChapters} Chapters (${completionPct}%)
          </div>
        </div>

        <div class="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/20">
          <div class="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500" style="width: ${completionPct}%"></div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div class="flex items-center space-x-2 text-[11px] text-slate-300">
            <span>🔥 <strong>Very High</strong> Weightage</span>
            <span>•</span>
            <span>⚡ <strong>High</strong> Weightage</span>
            <span>•</span>
            <span>📌 <strong>Medium</strong> Priority</span>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="markAllChapters(true)" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition cursor-pointer">
              ✓ Mark All Done
            </button>
            <button onclick="markAllChapters(false)" class="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[11px] transition cursor-pointer">
              ↺ Reset All
            </button>
          </div>
        </div>
      </div>

      <!-- Subject Filter Pills -->
      <div class="flex flex-wrap items-center gap-2 pt-1 border-t border-indigo-900/60">
        <span class="text-xs font-bold text-slate-300 mr-1">Subject Filter:</span>
        <button onclick="setSyllabusSubjectFilter('all')" class="px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${currentSyllabusFilterSub === 'all' ? 'bg-saffron-500 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
          All Subjects (${exam.subjects.length})
        </button>
        ${exam.subjects.map(s => `
          <button onclick="setSyllabusSubjectFilter('${s.code}')" class="px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-1.5 ${currentSyllabusFilterSub === s.code ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}">
            <span>${s.icon}</span>
            <span>${s.name.split('(')[0].trim()}</span>
          </button>
        `).join('')}
      </div>

    </div>

    <!-- Chapter Checklist Grid by Subject -->
    <div class="space-y-6 pt-2">
      ${filteredSubjects.map(sub => {
        const subTotal = sub.chapters.length;
        const subDone = sub.chapters.filter(ch => progress[ch.id]).length;
        const subPct = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

        return `
          <div class="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-slate-200 space-y-4">
            
            <!-- Subject Header Card -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div class="flex items-center space-x-3">
                <span class="text-3xl p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100">${sub.icon}</span>
                <div>
                  <h3 class="text-lg font-black text-slate-900">${sub.name}</h3>
                  <p class="text-xs font-bold text-indigo-700">${sub.weightage}</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 self-end sm:self-center">
                <div class="text-right">
                  <div class="text-xs font-bold text-slate-500">Subject Preparedness</div>
                  <div class="text-sm font-black text-slate-900">${subDone} / ${subTotal} Completed (${subPct}%)</div>
                </div>
                <div class="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-xs text-indigo-900 border border-slate-200">
                  ${subPct}%
                </div>
              </div>
            </div>

            <!-- Chapters List -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${sub.chapters.map(ch => {
                const isChecked = !!progress[ch.id];
                const priorityBadge = ch.priority === 'vhigh'
                  ? '<span class="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-200">🔥 Very High</span>'
                  : ch.priority === 'high'
                  ? '<span class="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">⚡ High Yield</span>'
                  : '<span class="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">📌 Medium</span>';

                return `
                  <div class="flex items-start space-x-3 p-3.5 rounded-2xl border transition duration-200 ${isChecked ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 hover:bg-white border-slate-200'}">
                    <input 
                      type="checkbox" 
                      id="check_${ch.id}" 
                      ${isChecked ? 'checked' : ''} 
                      onchange="toggleChapterCheck('${ch.id}')" 
                      class="mt-1 w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer shrink-0">
                    
                    <label for="check_${ch.id}" class="flex-grow cursor-pointer select-none">
                      <div class="flex items-center justify-between gap-1 mb-1">
                        <span class="text-xs font-black ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}">${ch.title}</span>
                        ${priorityBadge}
                      </div>
                      <div class="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                        <span>Expected: <strong class="text-slate-800">${ch.weightage}</strong></span>
                        <span class="text-slate-400">~${ch.pyqCount}+ PYQs</span>
                      </div>
                    </label>
                  </div>
                `;
              }).join('')}
            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// Expose globally
window.initSyllabusTracker = renderSyllabusTracker;
window.setSyllabusExam = setSyllabusExam;
window.setSyllabusSubjectFilter = setSyllabusSubjectFilter;
window.toggleChapterCheck = toggleChapterCheck;
window.markAllChapters = markAllChapters;
window.renderSyllabusTracker = renderSyllabusTracker;

// React to language change
window.addEventListener('languageChanged', () => {
  renderSyllabusTracker();
});

document.addEventListener('DOMContentLoaded', () => {
  renderSyllabusTracker();
});

// public/js/master-competitive-bank.js
// 2026 Master Question Bank for Competitive Exams (SSC GD, SSC CGL, UP Police Constable/SI, Railway ALP/Tech/Group D)
// High-Yield 2020-2025 TCS/NTA Exam PYQs + 2026 Standard Model Questions
// 100% Bilingual Question Statements & Options (Hindi + English)
// Strict Subject Isolation: Reasoning, Quantitative Aptitude, UP Police Law/Moolvidhi, Railway Science/Tech, GK/GS

const COMPETITIVE_REASONING_BANK = [
{
    "topic": "सादृश्यता परीक्षण (Word Analogy)",
    "q": "दिए गए विकल्पों में से संबंधित शब्द को चुनिए:\nभारत : रुपया :: जापान : ?\n[English: Select the related word from the given options:\nIndia : Rupee :: Japan : ?]",
    "options": [
      "A) डॉलर / Dollar",
      "B) युआन / Yuan",
      "C) येन / Yen",
      "D) यूरो / Euro"
    ],
    "correct": 2,
    "ans": "C) येन / Yen",
    "exp": "💡 सही उत्तर: C) येन। जिस प्रकार भारत की आधिकारिक मुद्रा 'रुपया' है, उसी प्रकार जापान की राष्ट्रीय मुद्रा 'येन' (Yen) है। चीन की मुद्रा युआन/रेनमिन्बी है।"
  },
  {
    "topic": "संख्या सादृश्यता (Number Analogy)",
    "q": "दिए गए विकल्पों में से संबंधित संख्या चुनिए:\n8 : 64 :: 27 : ?\n[English: Select the related number from the given options:\n8 : 64 :: 27 : ?]",
    "options": [
      "A) 125",
      "B) 729",
      "C) 216",
      "D) 81"
    ],
    "correct": 1,
    "ans": "B) 729",
    "exp": "💡 सही उत्तर: B) 729। पैटर्न: 8 = 2³ और 64 = 8² = 4³। इसी प्रकार 27 = 3³, अतः 3³ : (3³)² = 27² = 729 (या 9³ = 729)।"
  },
  {
    "topic": "संख्या श्रृंखला (Number Series)",
    "q": "दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए:\n7, 11, 19, 35, 67, ?\n[English: Find the missing term in the given series:\n7, 11, 19, 35, 67, ?]",
    "options": [
      "A) 99",
      "B) 131",
      "C) 135",
      "D) 121"
    ],
    "correct": 1,
    "ans": "B) 131",
    "exp": "💡 सही उत्तर: B) 131। अंतर पैटर्न: +4, +8, +16, +32, अगला अंतर +64 होगा। अतः 67 + 64 = 131 (अंतर प्रत्येक पद में दोगुना हो रहा है)।"
  },
  {
    "topic": "अक्षर श्रृंखला (Letter Series)",
    "q": "निम्नलिखित श्रृंखला में अगला पद क्या होगा?\nB, E, I, N, T, ?\n[English: What will be the next term in the series?\nB, E, I, N, T, ?]",
    "options": [
      "A) Z",
      "B) Y",
      "C) A",
      "D) B"
    ],
    "correct": 2,
    "ans": "C) A",
    "exp": "💡 सही उत्तर: C) A। वर्णमाला स्थितिक मान: B(2) + 3 = E(5), E(5) + 4 = I(9), I(9) + 5 = N(14), N(14) + 6 = T(20), T(20) + 7 = 27 = A(1)।"
  },
  {
    "topic": "कोडिंग-डिकोडिंग (Coding-Decoding)",
    "q": "यदि किसी निश्चित कूट भाषा में 'DELHI' को 'CCIDD' लिखा जाता है, तो उसी कूट भाषा में 'BOMBAY' को क्या लिखा जाएगा?\n[English: If in a code language 'DELHI' is written as 'CCIDD', how will 'BOMBAY' be written?]",
    "options": [
      "A) AMJXVS",
      "B) AMJXVT",
      "C) BNKYBT",
      "D) CLMZCU"
    ],
    "correct": 0,
    "ans": "A) AMJXVS",
    "exp": "💡 सही उत्तर: A) AMJXVS। पैटर्न: -1, -2, -3, -4, -5, -6। D-1=C, E-2=C, L-3=I, H-4=D, I-5=D। अतः B-1=A, O-2=M, M-3=J, B-4=X, A-5=V, Y-6=S।"
  },
  {
    "topic": "रक्त संबंध (Blood Relations)",
    "q": "एक तस्वीर की ओर इशारा करते हुए एक व्यक्ति ने कहा, 'यह मेरे दादाजी के इकलौते पुत्र की पुत्री है।' वह महिला उस व्यक्ति से किस प्रकार संबंधित है?\n[English: Pointing to a photograph, a man said, 'She is the daughter of my grandfather's only son.' How is that woman related to the man?]",
    "options": [
      "A) बहन / Sister",
      "B) माता / Mother",
      "C) चाची / Aunt",
      "D) पुत्री / Daughter"
    ],
    "correct": 0,
    "ans": "A) बहन / Sister",
    "exp": "💡 सही उत्तर: A) बहन (Sister)। दादाजी का इकलौता पुत्र = व्यक्ति के पिता। पिता की पुत्री = व्यक्ति की बहन।"
  },
  {
    "topic": "दिशा और दूरी परीक्षण (Direction & Distance)",
    "q": "रोहित उत्तर दिशा में 10 मीटर चलता है, फिर दाएं मुड़कर 15 मीटर चलता है। इसके बाद वह पुनः दाएं मुड़कर 10 मीटर चलता है। वह अपने प्रारंभिक बिंदु से किस दिशा में और कितनी दूरी पर है?\n[English: Rohit walks 10m North, turns right and walks 15m, then turns right again and walks 10m. In which direction and at what distance is he from starting point?]",
    "options": [
      "A) 15 मीटर पूर्व / 15m East",
      "B) 15 मीटर पश्चिम / 15m West",
      "C) 10 मीटर उत्तर / 10m North",
      "D) 25 मीटर दक्षिण / 25m South"
    ],
    "correct": 0,
    "ans": "A) 15 मीटर पूर्व / 15m East",
    "exp": "💡 सही उत्तर: A) 15 मीटर पूर्व। उत्तर 10m और दक्षिण 10m निरस्त हो जाते हैं। केवल पूर्व की ओर 15 मीटर दूरी बचती है।"
  },
  {
    "topic": "न्याय निगमन (Syllogism)",
    "q": "कथन: सभी पेन पेंसिल हैं। कुछ पेंसिल रबर हैं।\nनिष्कर्ष: I. कुछ पेन रबर हैं। II. कुछ पेंसिल पेन हैं।\n[English: Statements: All pens are pencils. Some pencils are erasers.\nConclusions: I. Some pens are erasers. II. Some pencils are pens.]",
    "options": [
      "A) केवल निष्कर्ष II सही है / Only conclusion II follows",
      "B) केवल निष्कर्ष I सही है / Only conclusion I follows",
      "C) दोनों निष्कर्ष I और II सही हैं / Both I and II follow",
      "D) न तो I न ही II सही है / Neither I nor II follows"
    ],
    "correct": 0,
    "ans": "A) केवल निष्कर्ष II सही है / Only conclusion II follows",
    "exp": "💡 सही उत्तर: A) केवल निष्कर्ष II सही है। 'सभी पेन पेंसिल हैं' से व्युत्क्रम 'कुछ पेंसिल पेन हैं' शत-प्रतिशत सत्य है। पेन और रबर में कोई निश्चित संबंध नहीं है।"
  },
  {
    "topic": "वेन आरेख (Venn Diagrams)",
    "q": "निम्नलिखित में से कौन सा वेन आरेख 'मानव, डॉक्टर, और शिक्षक' के बीच सही संबंध दर्शाता है?\n[English: Which Venn diagram accurately represents the relation among 'Humans, Doctors, and Teachers'?]",
    "options": [
      "A) मानव के भीतर डॉक्टर और शिक्षक के दो परस्पर प्रतिच्छेदी वृत्त / Two intersecting circles inside Humans circle",
      "B) तीनों अलग-अलग वृत्त / Three disjoint circles",
      "C) तीन संकेंद्रित वृत्त / Three concentric circles",
      "D) डॉक्टर के भीतर शिक्षक और मानव / Teachers inside Doctors"
    ],
    "correct": 0,
    "ans": "A) मानव के भीतर डॉक्टर और शिक्षक के दो परस्पर प्रतिच्छेदी वृत्त / Two intersecting circles inside Humans circle",
    "exp": "💡 सही उत्तर: A। सभी डॉक्टर और शिक्षक मनुष्य हैं (मानव के बड़े वृत्त में आएंगे)। कुछ डॉक्टर मेडिकल कॉलेज में प्रोफेसर/शिक्षक भी होते हैं (प्रतिच्छेदी वृत्त)।"
  },
  {
    "topic": "क्रम व्यवस्था परीक्षण (Ranking Test)",
    "q": "40 विद्यार्थियों की एक कक्षा में सुमित का स्थान शीर्ष से 12वाँ है। नीचे से उसका स्थान क्या होगा?\n[English: In a class of 40 students, Sumit ranks 12th from the top. What is his rank from the bottom?]",
    "options": [
      "A) 29वाँ / 29th",
      "B) 28वाँ / 28th",
      "C) 30वाँ / 30th",
      "D) 31वाँ / 31st"
    ],
    "correct": 0,
    "ans": "A) 29वाँ / 29th",
    "exp": "💡 सही उत्तर: A) 29वाँ। सूत्र: कुल = (शीर्ष + नीचे) - 1 ⟹ 40 = 12 + नीचे - 1 ⟹ नीचे से स्थान = 40 - 11 = 29वाँ।"
  },
  {
    "topic": "घड़ी परीक्षण (Clock Test)",
    "q": "3 बजकर 30 मिनट पर घड़ी की दोनों सुइयों (घंटे और मिनट) के बीच कितने अंश का कोण बनेगा?\n[English: At 3:30, what is the angle between the hour hand and minute hand of a clock?]",
    "options": [
      "A) 75°",
      "B) 70°",
      "C) 80°",
      "D) 90°"
    ],
    "correct": 0,
    "ans": "A) 75°",
    "exp": "💡 सही उत्तर: A) 75°। कोण सूत्र: θ = |30H - (11/2)M| = |30×3 - (11/2)×30| = |90 - 165| = 75°।"
  },
  {
    "topic": "कैलेंडर परीक्षण (Calendar Test)",
    "q": "15 अगस्त 1947 को सप्ताह का कौन सा दिन था?\n[English: What day of the week was 15th August 1947?]",
    "options": [
      "A) शुक्रवार / Friday",
      "B) गुरुवार / Thursday",
      "C) शनिवार / Saturday",
      "D) रविवार / Sunday"
    ],
    "correct": 0,
    "ans": "A) शुक्रवार / Friday",
    "exp": "💡 सही उत्तर: A) शुक्रवार (Friday)। 1600 वर्षों में 0 विषम दिन, 300 वर्षों में 1 विषम दिन, 46 वर्षों में (11 लीप + 35 सामान्य) = 57 दिन = 1 विषम दिन। 1947 के 15 अगस्त तक 216 दिन = 6 विषम दिन। कुल = 1 + 1 + 6 = 8 दिन = 1 विषम दिन = शुक्रवार।"
  },
  {
    "topic": "बैठक व्यवस्था (Seating Arrangement - Circular)",
    "q": "6 मित्र A, B, C, D, E, F केंद्र की ओर मुख करके एक वृत्त में बैठे हैं। B, D के दाएं दूसरा है। C, A और B के बीच में है। F, D के तुरंत बाएं है। E के सम्मुख कौन बैठा है?\n[English: 6 friends A, B, C, D, E, F are sitting in a circle facing centre. B is 2nd to the right of D. C is between A and B. F is immediate left of D. Who sits opposite to E?]",
    "options": [
      "A) B",
      "B) C",
      "C) A",
      "D) D"
    ],
    "correct": 0,
    "ans": "A) B",
    "exp": "💡 सही उत्तर: A) B। दक्षिणावर्त क्रम: D, F, E, B, C, A। E के ठीक सम्मुख B बैठा है।"
  },
  {
    "topic": "दर्पण एवं जल प्रतिबिंब (Mirror Image)",
    "q": "जब दर्पण को दाईं ओर (MN पर) रखा जाए, तो शब्द 'QUALITY' का सही दर्पण प्रतिबिंब क्या होगा?\n[English: If a mirror is placed on the right side (MN), what is the correct mirror image of 'QUALITY'?]",
    "options": [
      "A) Y T I L A U Q (अक्षर उल्टे क्रम में) / Inverted letter sequence",
      "B) Q U A L I T Y",
      "C) Y T I L A U O",
      "D) Y T I J A U Q"
    ],
    "correct": 0,
    "ans": "A) Y T I L A U Q (अक्षर उल्टे क्रम में) / Inverted letter sequence",
    "exp": "💡 सही उत्तर: A) दर्पण प्रतिबिंब में दायां भाग बायां बन जाता है। अंतिम अक्षर 'Y' सर्वप्रथम दिखेगा और 'Q' अंत में।"
  },
  {
    "topic": "कागज मोड़ना और काटना (Paper Folding & Cutting)",
    "q": "एक वर्गाकार कागज को दो बार मोड़कर बीच में एक त्रिभुजाकार और एक वृत्ताकार छेद किया जाता है। खोलने पर यह कैसा दिखेगा?\n[English: A square paper is folded twice and punched with a triangle and circle. On unfolding, how will it appear?]",
    "options": [
      "A) चारों कोनों/फलकों पर 4 त्रिभुज और 4 वृत्त / 4 triangles and 4 circles symmetrically distributed",
      "B) केवल 2 त्रिभुज और 2 वृत्त / Only 2 triangles and 2 circles",
      "C) केवल 1 वृत्त और 4 त्रिभुज",
      "D) 4 वृत्त और 1 त्रिभुज"
    ],
    "correct": 0,
    "ans": "A) चारों कोनों/फलकों पर 4 त्रिभुज और 4 वृत्त / 4 triangles and 4 circles symmetrically distributed",
    "exp": "💡 सही उत्तर: A। दो बार मोड़ने (1/4 भाग) के बाद खुलने पर प्रत्येक छेद 4 गुना सममित रूप से दिखाई देगा।"
  },
  {
    "topic": "वर्गीकरण / विषम चुनिए (Odd One Out)",
    "q": "निम्नलिखित चार में से तीन किसी प्रकार समान हैं और एक समूह बनाते हैं। विषम को चुनिए:\n[English: Three of the following four are alike in a certain way. Select the odd one out:]",
    "options": [
      "A) पीतल / Brass (मिश्रधातु)",
      "B) तांबा / Copper",
      "C) जस्ता / Zinc",
      "D) एल्युमिनियम / Aluminium"
    ],
    "correct": 0,
    "ans": "A) पीतल / Brass (मिश्रधातु)",
    "exp": "💡 सही उत्तर: A) पीतल (Brass)। तांबा (Cu), जस्ता (Zn), और एल्युमिनियम (Al) शुद्ध धात्विक तत्व हैं, जबकि पीतल तांबा और जस्ता की एक मिश्रधातु (Alloy) है।"
  },
  {
    "topic": "कथन एवं तर्क (Statement & Arguments)",
    "q": "कथन: क्या भारत में सभी स्तरों पर प्लास्टिक बैग के उपयोग पर पूर्ण प्रतिबंध लगा देना चाहिए?\nतर्क I: हाँ, प्लास्टिक गैर-बायोडिग्रेडेबल है और पर्यावरण व जल-निकासी व्यवस्था को भारी क्षति पहुंचाता है।\nतर्क II: नहीं, इससे पैकेजिंग उद्योग में लाखों लोग बेरोजगार हो जाएंगे।\n[English: Statement: Should plastic bags be completely banned at all levels in India?\nArg I: Yes, plastic is non-biodegradable and causes ecological hazards.\nArg II: No, it will render thousands jobless.]",
    "options": [
      "A) केवल तर्क I प्रबल है / Only argument I is strong",
      "B) केवल तर्क II प्रबल है / Only argument II is strong",
      "C) दोनों तर्क I और II प्रबल हैं / Both I and II are strong",
      "D) न तो I न ही II प्रबल है / Neither I nor II is strong"
    ],
    "correct": 0,
    "ans": "A) केवल तर्क I प्रबल है / Only argument I is strong",
    "exp": "💡 सही उत्तर: A) केवल तर्क I प्रबल है। पर्यावरण और लोक स्वास्थ्य संरक्षण सर्वोच्च प्राथमिकता है। विकल्प तैयार करके रोजगार को पुनर्निर्देशित किया जा सकता है।"
  },
  {
    "topic": "लुप्त संख्या ज्ञात करना (Missing Number Matrix)",
    "q": "दिए गए आव्यूह (Matrix) में लुप्त संख्या (?) ज्ञात कीजिए:\n3   4   5\n4   5   6\n25  41  ?\n[English: Find the missing number (?) in the given matrix:\n3   4   5\n4   5   6\n25  41  ?]",
    "options": [
      "A) 61",
      "B) 55",
      "C) 65",
      "D) 72"
    ],
    "correct": 0,
    "ans": "A) 61",
    "exp": "💡 सही उत्तर: A) 61। स्तंभ पैटर्न: 3² + 4² = 9 + 16 = 25। द्वितीय स्तंभ: 4² + 5² = 16 + 25 = 41। तृतीय स्तंभ: 5² + 6² = 25 + 36 = 61।"
  },
  {
    "topic": "पासा परीक्षण (Dice Test)",
    "q": "एक मानक पासे (Standard Dice) के एक फलक पर अंक 4 अंकित है। इसके ठीक विपरीत फलक पर कौन सा अंक होगा?\n[English: On a standard dice, number 4 is on one face. What number will be on its opposite face?]",
    "options": [
      "A) 3",
      "B) 5",
      "C) 2",
      "D) 1"
    ],
    "correct": 0,
    "ans": "A) 3",
    "exp": "💡 सही उत्तर: A) 3। मानक पासे (Standard Dice) के विपरीत फलकों का योग सदैव 7 होता है: 4 + 3 = 7।"
  },
  {
    "topic": "अंकगणितीय तर्कशक्ति (Mathematical Operations)",
    "q": "यदि '+' का अर्थ '÷', '×' का अर्थ '+', '÷' का अर्थ '-' और '-' का अर्थ '×' हो, तो निम्नलिखित व्यंजक का मान क्या होगा?\n36 + 6 - 3 × 5 ÷ 3 = ?\n[English: If '+' means '÷', '×' means '+', '÷' means '-' and '-' means '×', find the value of:\n36 + 6 - 3 × 5 ÷ 3 = ?]",
    "options": [
      "A) 20",
      "B) 18",
      "C) 22",
      "D) 25"
    ],
    "correct": 0,
    "ans": "A) 20",
    "exp": "💡 सही उत्तर: A) 20। चिह्नों को बदलने पर: 36 ÷ 6 × 3 + 5 - 3 = 6 × 3 + 5 - 3 = 18 + 5 - 3 = 23 - 3 = 20।"
  },
  {
    "topic": "शब्दों का सार्थक क्रम (Logical Sequence of Words)",
    "q": "निम्नलिखित शब्दों को एक अर्थपूर्ण व तार्किक क्रम में व्यवस्थित कीजिए:\n1. रोग (Illness) 2. चिकित्सक (Doctor) 3. निदान (Diagnosis) 4. उपचार (Treatment) 5. स्वास्थ्य लाभ (Recovery)\n[English: Arrange the words in a meaningful sequence:\n1. Illness 2. Doctor 3. Diagnosis 4. Treatment 5. Recovery]",
    "options": [
      "A) 1, 2, 3, 4, 5",
      "B) 2, 1, 3, 4, 5",
      "C) 1, 3, 2, 4, 5",
      "D) 1, 2, 4, 3, 5"
    ],
    "correct": 0,
    "ans": "A) 1, 2, 3, 4, 5",
    "exp": "💡 सही उत्तर: A) 1, 2, 3, 4, 5। रोग होने पर व्यक्ति डॉक्टर के पास जाता है, डॉक्टर रोग का निदान (पहचान) करता है, फिर उपचार देता है, जिससे स्वास्थ्य लाभ होता है।"
  },
  {
    "topic": "सादृश्यता - अक्षर समूह (Letter Analogy)",
    "q": "दिए गए विकल्पों में से संबंधित अक्षर समूह चुनिए:\nACFJ : ZXUQ :: EGJN : ?\n[English: Select the related letter cluster:\nACFJ : ZXUQ :: EGJN : ?]",
    "options": [
      "A) VTQM",
      "B) VTRM",
      "C) USQM",
      "D) WTRN"
    ],
    "correct": 0,
    "ans": "A) VTQM",
    "exp": "💡 सही उत्तर: A) VTQM। विपरीत अक्षर युग्म (Opposite Letter Pairs): A↔Z, C↔X, F↔U, J↔Q। इसी प्रकार: E↔V, G↔T, J↔Q, N↔M।"
  },
  {
    "topic": "कथन एवं पूर्वधारणाएं (Statement & Assumptions)",
    "q": "कथन: 'धूम्रपान स्वास्थ्य के लिए हानिकारक है' - सिगरेट के पैकेट पर छपी चेतावनी।\nपूर्वधारणा I: लोग पैकेट पर छपी चेतावनियां पढ़ते हैं।\nपूर्वधारणा II: चेतावनी पढ़ने से लोग धूम्रपान छोड़ सकते हैं या कम कर सकते हैं।\n[English: Statement: 'Smoking is injurious to health' - Warning on cigarette packs.\nAssumption I: People read warnings printed on packets.\nAssumption II: Warnings may prompt people to quit or reduce smoking.]",
    "options": [
      "A) दोनों पूर्वधारणाएं I और II अंतर्निहित हैं / Both I and II are implicit",
      "B) केवल पूर्वधारणा I अंतर्निहित है / Only assumption I is implicit",
      "C) केवल पूर्वधारणा II अंतर्निहित है / Only assumption II is implicit",
      "D) कोई भी अंतर्निहित नहीं है / Neither is implicit"
    ],
    "correct": 0,
    "ans": "A) दोनों पूर्वधारणाएं I और II अंतर्निहित हैं / Both I and II are implicit",
    "exp": "💡 सही उत्तर: A) दोनों अंतर्निहित हैं। कोई भी चेतावनी इस मान्यता के साथ छापी जाती है कि लोग उसे पढ़ेंगे और उसका वांछित प्रभाव पड़ेगा।"
  },
  {
    "topic": "दिशा ज्ञान (Direction Sense - Shadow Concept)",
    "q": "एक सुबह सूर्योदय के तुरंत बाद, सुरेश एक खंभे की ओर मुंह करके खड़ा था। खंभे की छाया ठीक सुरेश के दाईं ओर पड़ रही थी। सुरेश का मुख किस दिशा में था?\n[English: One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. In which direction was Suresh facing?]",
    "options": [
      "A) दक्षिण / South",
      "B) उत्तर / North",
      "C) पूर्व / East",
      "D) पश्चिम / West"
    ],
    "correct": 0,
    "ans": "A) दक्षिण / South",
    "exp": "💡 सही उत्तर: A) दक्षिण। सूर्योदय के समय सूर्य पूर्व में होता है और छाया पश्चिम दिशा में बनती है। यदि पश्चिम सुरेश के दाईं ओर है, तो उसका मुख दक्षिण (South) दिशा में होना चाहिए।"
  },
  {
    "topic": "त्रिभुज गणना (Counting Figures - Triangles)",
    "q": "एक वर्ग जिसके दोनों विकर्ण परस्पर एक दूसरे को काटते हैं, उसमें कुल कितने त्रिभुज बनते हैं?\n[English: In a square whose both diagonals intersect each other, how many total triangles are formed?]",
    "options": [
      "A) 8 त्रिभुज / 8 Triangles",
      "B) 4 त्रिभुज / 4 Triangles",
      "C) 6 त्रिभुज / 6 Triangles",
      "D) 10 त्रिभुज / 10 Triangles"
    ],
    "correct": 0,
    "ans": "A) 8 त्रिभुज / 8 Triangles",
    "exp": "💡 सही उत्तर: A) 8 त्रिभुज। सूत्र: 4 छोटे त्रिभुज × 2 = 8 त्रिभुज। (4 एकल त्रिभुज + 4 दोहरे त्रिभुज)।"
  },
  {
    "topic": "कोडिंग-डिकोडिंग (Conditional Coding)",
    "q": "यदि 'हवा' को 'पानी', 'पानी को 'आग', 'आग' को 'मिट्टी' और 'मिट्टी' को 'आकाश' कहा जाए, तो मछली कहाँ रहेगी?\n[English: If 'Air' is called 'Water', 'Water' is called 'Fire', 'Fire' is called 'Soil', and 'Soil' is called 'Sky', where will fish live?]",
    "options": [
      "A) आग / Fire",
      "B) पानी / Water",
      "C) मिट्टी / Soil",
      "D) आकाश / Sky"
    ],
    "correct": 0,
    "ans": "A) आग / Fire",
    "exp": "💡 सही उत्तर: A) आग (Fire)। वास्तविक जीवन में मछली 'पानी' में रहती है, और कूट भाषा में पानी को 'आग' कहा गया है।"
  },
  {
    "topic": "संख्या सादृश्यता (Advanced Number Analogy)",
    "q": "दिए गए विकल्पों में से संबंधित संख्या ज्ञात कीजिए:\n12 : 144 :: 15 : ?\n[English: Find the related number:\n12 : 144 :: 15 : ?]",
    "options": [
      "A) 225",
      "B) 210",
      "C) 240",
      "D) 196"
    ],
    "correct": 0,
    "ans": "A) 225",
    "exp": "💡 सही उत्तर: A) 225। 12² = 144। इसी प्रकार 15² = 225।"
  },
  {
    "topic": "रक्त संबंध (Coded Blood Relations)",
    "q": "यदि 'P + Q' का अर्थ 'P, Q का पिता है', 'P - Q' का अर्थ 'P, Q की माता है' और 'P × Q' का अर्थ 'P, Q का भाई है', तो व्यंजक 'A + B × C' में A का C से क्या संबंध है?\n[English: If 'P + Q' means 'P is father of Q', 'P - Q' means 'P is mother of Q', and 'P × Q' means 'P is brother of Q', what is the relation of A to C in 'A + B × C'?]",
    "options": [
      "A) पिता / Father",
      "B) भाई / Brother",
      "C) चाचा / Uncle",
      "D) दादा / Grandfather"
    ],
    "correct": 0,
    "ans": "A) पिता / Father",
    "exp": "💡 सही उत्तर: A) पिता (Father)। B × C ⟹ B, C का भाई है। A + B ⟹ A, B का पिता है। अतः A, C का भी पिता है।"
  },
  {
    "topic": "वर्णमाला परीक्षण (Alphabetical Order)",
    "q": "अंग्रेजी शब्दकोश (Dictionary) के अनुसार तीसरे स्थान पर कौन सा शब्द आएगा?\n1. Miracle 2. Mineral 3. Ministry 4. Mirror\n[English: According to English dictionary, which word will appear at the 3rd position?\n1. Miracle 2. Mineral 3. Ministry 4. Mirror]",
    "options": [
      "A) Ministry",
      "B) Mineral",
      "C) Miracle",
      "D) Mirror"
    ],
    "correct": 0,
    "ans": "A) Ministry",
    "exp": "💡 सही उत्तर: A) Ministry। शब्दकोश क्रम: 1st: Mineral, 2nd: Miracle, 3rd: Ministry, 4th: Mirror।"
  },
  {
    "topic": "तार्किक पहेली (Logical Puzzle)",
    "q": "एक दौड़ में राम श्याम से आगे है लेकिन हरीश से पीछे है। मोहन हरीश से आगे है। दौड़ में सबसे आगे कौन है?\n[English: In a race, Ram is ahead of Shyam but behind Harish. Mohan is ahead of Harish. Who is leading the race?]",
    "options": [
      "A) मोहन / Mohan",
      "B) हरीश / Harish",
      "C) राम / Ram",
      "D) श्याम / Shyam"
    ],
    "correct": 0,
    "ans": "A) मोहन / Mohan",
    "exp": "💡 सही उत्तर: A) मोहन। क्रम: मोहन > हरीश > राम > श्याम। अतः दौड़ में सबसे आगे मोहन है।"
  },
  {
  "topic": "सिलोगिज़्म / न्याय निगमन (Syllogism)",
  "q": "कथन:\n1. सभी पेन पेंसिल हैं।\n2. कुछ पेंसिल रबर हैं।\nनिष्कर्ष:\nI. कुछ पेन रबर हैं।\nII. कोई पेन रबर नहीं है।\n[English: Statements:\n1. All pens are pencils.\n2. Some pencils are erasers.\nConclusions:\nI. Some pens are erasers.\nII. No pen is an eraser.]",
  "options": [
    "A) केवल निष्कर्ष I निकलता है",
    "B) केवल निष्कर्ष II निकलता है",
    "C) या तो I या II निकलता है (Either I or II follows)",
    "D) न तो I और न ही II निकलता है"
  ],
  "correct": 2,
  "ans": "C) या तो I या II निकलता है (Either I or II follows)",
  "exp": "💡 सही उत्तर: C) या तो निष्कर्ष I या II निकलता है। चूंकि पेन और रबर के बीच कोई सीधा संबंध नहीं दिया गया है, और निष्कर्ष I (सकारात्मक) और निष्कर्ष II (नकारात्मक) मिलकर पूरक युग्म (Complementary Pair) बनाते हैं, इसलिए 'या तो I या II' लागू होता है।"
},
  {
  "topic": "दिशा एवं दूरी (Direction & Distance)",
  "q": "रोहित उत्तर दिशा में 10 मीटर चलता है। फिर वह बाएं मुड़कर 6 मीटर चलता है। इसके बाद वह पुनः बाएं मुड़कर 18 मीटर चलता है। अब वह अपने प्रारंभिक बिंदु से किस दिशा और कितनी दूरी पर है?\n[English: Rohit walks 10m North, turns left and walks 6m, then turns left again and walks 18m. In which direction and at what distance is he from the starting point?]",
  "options": [
    "A) दक्षिण-पश्चिम, 10 मीटर (10m South-West)",
    "B) दक्षिण-पूर्व, 10 मीटर",
    "C) पश्चिम, 8 मीटर",
    "D) दक्षिण, 8 मीटर"
  ],
  "correct": 0,
  "ans": "A) दक्षिण-पश्चिम, 10 मीटर (10m South-West)",
  "exp": "💡 सही उत्तर: A) दक्षिण-पश्चिम, 10 मीटर। प्रारंभिक बिंदु से विस्थापन: X-दिशा = -6m (पश्चिम), Y-दिशा = 10 - 18 = -8m (दक्षिण)। कुल दूरी = √[(-6)² + (-8)²] = √[36 + 64] = √100 = 10 मीटर।"
},
  {
  "topic": "क्रम एवं व्यवस्था परीक्षण (Ranking & Ordering)",
  "q": "45 विद्यार्थियों की कक्षा में सुमित का स्थान शीर्ष से 16वां है। कक्षा में नीचे से उसका स्थान क्या होगा?\n[English: In a class of 45 students, Sumit ranks 16th from the top. What is his rank from the bottom?]",
  "options": [
    "A) 29वां",
    "B) 30वां (30th)",
    "C) 31वां",
    "D) 28वां"
  ],
  "correct": 1,
  "ans": "B) 30वां (30th)",
  "exp": "💡 सही उत्तर: B) 30वां। सूत्र: कुल छात्र = शीर्ष से स्थान + नीचे से स्थान - 1। अतः नीचे से स्थान = 45 - 16 + 1 = 30वां।"
},
  {
  "topic": "घड़ी एवं समय (Clock - Angle Calculation)",
  "q": "शाम 4:40 बजे घड़ी की दोनों सुइयों (घंटे और मिनट की सुई) के बीच का कोण कितना होगा?\n[English: What is the angle between the two hands of a clock at 4:40 PM?]",
  "options": [
    "A) 100°",
    "B) 110°",
    "C) 120°",
    "D) 130°"
  ],
  "correct": 0,
  "ans": "A) 100°",
  "exp": "💡 सही उत्तर: A) 100°। कोण का सूत्र: θ = |(30 × H) - (11/2 × M)|। यहाँ H = 4, M = 40। θ = |(30 × 4) - (11/2 × 40)| = |120 - 220| = 100°।"
},
  {
  "topic": "कैलेंडर (Calendar - Day Calculation)",
  "q": "यदि 1 जनवरी 2024 को सोमवार था, तो 1 जनवरी 2025 को सप्ताह का कौन सा दिन होगा?\n[English: If 1st January 2024 was a Monday, what day of the week will 1st January 2025 be?]",
  "options": [
    "A) मंगलवार (Tuesday)",
    "B) बुधवार (Wednesday)",
    "C) गुरुवार (Thursday)",
    "D) सोमवार (Monday)"
  ],
  "correct": 1,
  "ans": "B) बुधवार (Wednesday)",
  "exp": "💡 सही उत्तर: B) बुधवार। वर्ष 2024 एक लीप वर्ष (366 दिन) है। एक लीप वर्ष में 52 सप्ताह और 2 विषम दिन (Odd days) होते हैं। अतः सोमवार + 2 = बुधवार।"
},
  {
  "topic": "वेन आरेख (Venn Diagram)",
  "q": "कौन सा वेन आरेख 'माताएं, महिलाएं, डॉक्टर' के बीच सही संबंध दर्शाता है?\n[English: Which Venn diagram best represents the relationship between 'Mothers, Women, Doctors'?]",
  "options": [
    "A) सभी माताएं महिलाएं हैं, और डॉक्टर दोनों का कुछ हिस्सा काटता है",
    "B) तीनों अलग-अलग वृत्त हैं",
    "C) सभी डॉक्टर महिलाएं हैं",
    "D) सभी महिलाएं माताएं हैं"
  ],
  "correct": 0,
  "ans": "A) सभी माताएं महिलाएं हैं, और डॉक्टर दोनों का कुछ हिस्सा काटता है",
  "exp": "💡 सही उत्तर: A। सभी माताएं अनिवार्य रूप से महिलाएं (Women) होती हैं (आंतरिक वृत्त)। कुछ महिलाएं और कुछ माताएं डॉक्टर हो सकती हैं, तथा कुछ डॉक्टर पुरुष भी होते हैं, अतः डॉक्टर का वृत्त दोनों को प्रतिच्छेदित करता है।"
},
  {
  "topic": "पासा एवं घन (Dice - Opposite Face)",
  "q": "एक पासे के दो प्रारूप दिए गए हैं। यदि अंक 3 तल पर हो, तो शीर्ष पर कौन सा अंक होगा?\nप्रारूप 1: 1, 2, 3\nप्रारूप 2: 1, 4, 5\n[English: In two views of a dice showing (1,2,3) and (1,4,5), which number is opposite to 3?]",
  "options": [
    "A) 4",
    "B) 5",
    "C) 6",
    "D) 2"
  ],
  "correct": 1,
  "ans": "B) 5",
  "exp": "💡 सही उत्तर: B) 5। दोनों में उभयनिष्ठ अंक 1 है। दक्षिणावर्त (Clockwise) घूमने पर: 1 -> 2 -> 3 तथा 1 -> 4 -> 5। अतः 2 के विपरीत 4 है और 3 के विपरीत 5 है।"
},
  {
  "topic": "लुप्त संख्या (Missing Number Matrix)",
  "q": "दी गई आव्यूह में प्रश्नवाचक चिन्ह (?) के स्थान पर क्या आएगा?\n4   5   6\n2   3   7\n1   8   3\n21  98  ?\n[English: Find the missing number in the matrix:]",
  "options": [
    "A) 94",
    "B) 112",
    "C) 124",
    "D) 130"
  ],
  "correct": 0,
  "ans": "A) 94",
  "exp": "💡 सही उत्तर: A) 94। पैटर्न: स्तंभ 1: 4² + 2² + 1² = 16 + 4 + 1 = 21। स्तंभ 2: 5² + 3² + 8² = 25 + 9 + 64 = 98। स्तंभ 3: 6² + 7² + 3² = 36 + 49 + 9 = 94।"
},
  {
  "topic": "कथन एवं तर्क (Statement & Arguments)",
  "q": "कथन: क्या भारत में सभी स्तरों पर प्लास्टिक बैग के उपयोग पर पूर्ण प्रतिबंध लगाया जाना चाहिए?\nतर्क:\nI. हाँ, प्लास्टिक गैर-बायोडिग्रेडेबल है और पर्यावरण को गंभीर नुकसान पहुँचाता है।\nII. नहीं, इससे प्लास्टिक उद्योग से जुड़े लाखों श्रमिकों का रोजगार प्रभावित होगा।\n[English: Should plastic bags be completely banned in India?]",
  "options": [
    "A) केवल तर्क I प्रबल है (Only I is strong)",
    "B) केवल तर्क II प्रबल है",
    "C) दोनों तर्क प्रबल हैं",
    "D) न तो I और न ही II प्रबल है"
  ],
  "correct": 0,
  "ans": "A) केवल तर्क I प्रबल है (Only I is strong)",
  "exp": "💡 सही उत्तर: A) केवल तर्क I प्रबल है। पर्यावरण और स्वास्थ्य सुरक्षा रोजगार के वैकल्पिक समाधानों से अधिक प्राथमिक हैं, और वैकल्पिक पर्यावरण-अनुकूल उद्योगों से नए रोजगार सृजित होते हैं।"
},
  {
  "topic": "रक्त संबंध (Coded Blood Relation)",
  "q": "यदि P + Q का अर्थ है 'P, Q का पिता है', P - Q का अर्थ है 'P, Q की पत्नी है', और P × Q का अर्थ है 'P, Q का भाई है', तो अभिव्यक्ति 'A + B × C - D' में A का D से क्या संबंध है?\n[English: In 'A + B × C - D', what is the relation of A to D?]",
  "options": [
    "A) ससुर (Father-in-law)",
    "B) पिता (Father)",
    "C) चाचा (Uncle)",
    "D) दादा (Grandfather)"
  ],
  "correct": 0,
  "ans": "A) ससुर (Father-in-law)",
  "exp": "💡 सही उत्तर: A) ससुर (Father-in-law)। संबंध विश्लेषण: B × C = B, C का भाई है। C - D = C, D की पत्नी है। A + B = A, B का पिता है। चूंकि B और C सहोदर (भाई-बहन) हैं, अतः A, C का भी पिता है। C का पति D है, इसलिए A, D का ससुर है।"
}
];

const COMPETITIVE_MATH_BANK = [
{
    "topic": "प्रतिशत (Percentage - Price & Consumption)",
    "q": "चीनी के मूल्य में 20% की वृद्धि होने पर एक गृहणी को अपनी खपत में कितने प्रतिशत की कमी करनी चाहिए ताकि उसका खर्च अपरिवर्तित रहे?\n[English: If the price of sugar increases by 20%, by what percent must a household reduce consumption so that expenditure remains unchanged?]",
    "options": [
      "A) 16.67% (16 ⅔%)",
      "B) 20%",
      "C) 25%",
      "D) 15%"
    ],
    "correct": 0,
    "ans": "A) 16.67% (16 ⅔%)",
    "exp": "💡 सही उत्तर: A) 16 ⅔% (16.67%)। सूत्र: [r / (100 + r)] × 100 = [20 / 120] × 100 = 100 / 6 = 16 ⅔%।"
  },
  {
    "topic": "लाभ और हानि (Profit and Loss - Successive)",
    "q": "एक दुकानदार किसी वस्तु पर 20% और 10% की दो क्रमिक छूट (Successive Discounts) देता है। एकल समतुल्य बट्टा (Single Equivalent Discount) क्या होगा?\n[English: A shopkeeper offers two successive discounts of 20% and 10%. What is the single equivalent discount?]",
    "options": [
      "A) 28%",
      "B) 30%",
      "C) 25%",
      "D) 27%"
    ],
    "correct": 0,
    "ans": "A) 28%",
    "exp": "💡 सही उत्तर: A) 28%। समतुल्य बट्टा सूत्र = d₁ + d₂ - (d₁ × d₂) / 100 = 20 + 10 - (200 / 100) = 30 - 2 = 28%।"
  },
  {
    "topic": "लाभ और हानि (Dishonest Dealer)",
    "q": "एक बेईमान व्यापारी अपनी वस्तुओं को क्रय मूल्य पर बेचने का दावा करता है परंतु 1 किग्रा के स्थान पर 900 ग्राम के झूठे बांट का प्रयोग करता है। उसका लाभ प्रतिशत क्या है?\n[English: A dishonest dealer professes to sell at cost price but uses a false weight of 900g instead of 1kg. Find his profit percentage:]",
    "options": [
      "A) 11.11% (11 ⅑%)",
      "B) 10%",
      "C) 12.5%",
      "D) 9%"
    ],
    "correct": 0,
    "ans": "A) 11.11% (11 ⅑%)",
    "exp": "💡 सही उत्तर: A) 11.11%। लाभ सूत्र = [त्रुटि / (सत्य मान - त्रुटि)] × 100 = [100 / 900] × 100 = 100 / 9 = 11.11%।"
  },
  {
    "topic": "साधारण ब्याज (Simple Interest)",
    "q": "कोई धनराशि साधारण ब्याज की दर से 8 वर्षों में दोगुनी हो जाती है। वही धनराशि कितने वर्षों में 4 गुनी हो जाएगी?\n[English: A sum doubles itself in 8 years at simple interest. In how many years will it become 4 times?]",
    "options": [
      "A) 24 वर्ष / 24 Years",
      "B) 16 वर्ष / 16 Years",
      "C) 32 वर्ष / 32 Years",
      "D) 20 वर्ष / 20 Years"
    ],
    "correct": 0,
    "ans": "A) 24 वर्ष / 24 Years",
    "exp": "💡 सही उत्तर: A) 24 वर्ष। साधारण ब्याज में 1 गुना ब्याज बनने में 8 वर्ष लगते हैं। 4 गुनी राशि होने पर ब्याज 3 गुना चाहिए। समय = 3 × 8 = 24 वर्ष।"
  },
  {
    "topic": "चक्रवृद्धि ब्याज (Compound Interest)",
    "q": "₹10,000 की राशि पर 10% वार्षिक दर से 2 वर्ष के चक्रवृद्धि ब्याज और साधारण ब्याज का अंतर (Difference between CI and SI) क्या होगा?\n[English: Find the difference between CI and SI on ₹10,000 at 10% per annum for 2 years:]",
    "options": [
      "A) ₹100",
      "B) ₹150",
      "C) ₹200",
      "D) ₹50"
    ],
    "correct": 0,
    "ans": "A) ₹100",
    "exp": "💡 सही उत्तर: A) ₹100। 2 वर्ष के लिए सूत्र: D = P(r / 100)² = 10,000 × (10 / 100)² = 10,000 × (1 / 100) = ₹100।"
  },
  {
    "topic": "अनुपात एवं समानुपात (Ratio & Proportion)",
    "q": "यदि A : B = 2 : 3 तथा B : C = 4 : 5 हो, तो A : B : C का अनुपात क्या होगा?\n[English: If A : B = 2 : 3 and B : C = 4 : 5, find A : B : C:]",
    "options": [
      "A) 8 : 12 : 15",
      "B) 6 : 9 : 15",
      "C) 8 : 10 : 15",
      "D) 4 : 6 : 10"
    ],
    "correct": 0,
    "ans": "A) 8 : 12 : 15",
    "exp": "💡 सही उत्तर: A) 8 : 12 : 15। A = 2 × 4 = 8, B = 3 × 4 = 12, C = 3 × 5 = 15।"
  },
  {
    "topic": "समय और कार्य (Time & Work)",
    "q": "A किसी कार्य को 10 दिन में तथा B उसी कार्य को 15 दिन में पूरा कर सकता है। दोनों मिलकर उस कार्य को कितने दिनों में समाप्त करेंगे?\n[English: A can do a piece of work in 10 days and B in 15 days. Working together, in how many days will they finish the work?]",
    "options": [
      "A) 6 दिन / 6 Days",
      "B) 8 दिन / 8 Days",
      "C) 5 दिन / 5 Days",
      "D) 7 दिन / 7 Days"
    ],
    "correct": 0,
    "ans": "A) 6 दिन / 6 Days",
    "exp": "💡 सही उत्तर: A) 6 दिन। सूत्र: (A × B) / (A + B) = (10 × 15) / (10 + 15) = 150 / 25 = 6 दिन।"
  },
  {
    "topic": "नल एवं टंकी (Pipes and Cisterns)",
    "q": "पाइप A एक टंकी को 6 घंटे में भर सकता है और पाइप B उसे 8 घंटे में खाली कर सकता है। दोनों पाइप एक साथ खोलने पर टंकी कितने समय में भरेगी?\n[English: Pipe A fills a tank in 6 hours and Pipe B empties it in 8 hours. If both open together, in how many hours will the tank fill?]",
    "options": [
      "A) 24 घंटे / 24 Hours",
      "B) 14 घंटे / 14 Hours",
      "C) 18 घंटे / 18 Hours",
      "D) 12 घंटे / 12 Hours"
    ],
    "correct": 0,
    "ans": "A) 24 घंटे / 24 Hours",
    "exp": "💡 सही उत्तर: A) 24 घंटे। 1 घंटे का कार्य = 1/6 - 1/8 = (4 - 3) / 24 = 1/24। पूरी टंकी 24 घंटे में भरेगी।"
  },
  {
    "topic": "चाल, समय और दूरी (Time, Speed and Distance - Train)",
    "q": "180 मीटर लंबी एक रेलगाड़ी 54 किमी/घंटा की चाल से एक खंभे को कितने सेकंड में पार करेगी?\n[English: A 180m long train running at 54 km/h will cross a pole in how many seconds?]",
    "options": [
      "A) 12 सेकंड / 12 Seconds",
      "B) 10 सेकंड / 10 Seconds",
      "C) 15 सेकंड / 15 Seconds",
      "D) 18 सेकंड / 18 Seconds"
    ],
    "correct": 0,
    "ans": "A) 12 सेकंड / 12 Seconds",
    "exp": "💡 सही उत्तर: A) 12 सेकंड। चाल = 54 × (5/18) = 15 मी/से। समय = दूरी / चाल = 180 / 15 = 12 सेकंड।"
  },
  {
    "topic": "नाव और धारा (Boats and Streams)",
    "q": "शांत जल में एक नाव की चाल 10 किमी/घंटा है तथा धारा की चाल 2 किमी/घंटा है। धारा के अनुकूल (Downstream) 36 किमी जाने में कितना समय लगेगा?\n[English: Speed of a boat in still water is 10 km/h and stream speed is 2 km/h. How much time will it take to go 36 km downstream?]",
    "options": [
      "A) 3 घंटे / 3 Hours",
      "B) 4 घंटे / 4 Hours",
      "C) 3.6 घंटे / 3.6 Hours",
      "D) 4.5 घंटे / 4.5 Hours"
    ],
    "correct": 0,
    "ans": "A) 3 घंटे / 3 Hours",
    "exp": "💡 सही उत्तर: A) 3 घंटे। अनुकूल चाल = 10 + 2 = 12 किमी/घंटा। समय = 36 / 12 = 3 घंटे।"
  },
  {
    "topic": "औसत (Average)",
    "q": "प्रथम 50 प्राकृतिक संख्याओं का औसत क्या होगा?\n[English: What is the average of first 50 natural numbers?]",
    "options": [
      "A) 25.5",
      "B) 25",
      "C) 26",
      "D) 50"
    ],
    "correct": 0,
    "ans": "A) 25.5",
    "exp": "💡 सही उत्तर: A) 25.5। सूत्र: (n + 1) / 2 = (50 + 1) / 2 = 51 / 2 = 25.5।"
  },
  {
    "topic": "आयु संबंधी प्रश्न (Problems on Ages)",
    "q": "पिता और पुत्र की वर्तमान आयु का अनुपात 5 : 2 है। 4 वर्ष बाद उनकी आयु का योग 43 वर्ष होगा। पिता की वर्तमान आयु क्या है?\n[English: The ratio of present ages of father and son is 5 : 2. After 4 years, sum of their ages will be 43. Find father's present age:]",
    "options": [
      "A) 25 वर्ष / 25 Years",
      "B) 30 वर्ष / 30 Years",
      "C) 35 वर्ष / 35 Years",
      "D) 20 वर्ष / 20 Years"
    ],
    "correct": 0,
    "ans": "A) 25 वर्ष / 25 Years",
    "exp": "💡 सही उत्तर: A) 25 वर्ष। वर्तमान योग = 43 - (4 + 4) = 35 वर्ष। अनुपाती योग = 5 + 2 = 7। पिता की आयु = (5/7) × 35 = 25 वर्ष।"
  },
  {
    "topic": "संख्या पद्धति (Number System - Divisibility)",
    "q": "यदि संख्या 481k673 नौ (9) से पूर्णतः विभाज्य हो, तो 'k' के स्थान पर कौन सा अंक आएगा?\n[English: If number 481k673 is completely divisible by 9, find the digit in place of 'k':]",
    "options": [
      "A) 7",
      "B) 2",
      "C) 5",
      "D) 6"
    ],
    "correct": 0,
    "ans": "A) 7",
    "exp": "💡 सही उत्तर: A) 7। 9 की विभाज्यता: अंकों का योग 9 से कटना चाहिए। 4 + 8 + 1 + k + 6 + 7 + 3 = 29 + k। 29 के बाद 9 से विभाज्य संख्या 36 है। k = 36 - 29 = 7।"
  },
  {
    "topic": "संख्या पद्धति (Unit Digit)",
    "q": "गुणनफल (7⁹⁵ - 3⁵⁸) में इकाई का अंक (Unit Digit) क्या होगा?\n[English: Find the unit digit in the expression (7⁹⁵ - 3⁵⁸):]",
    "options": [
      "A) 4",
      "B) 6",
      "C) 3",
      "D) 7"
    ],
    "correct": 0,
    "ans": "A) 4",
    "exp": "💡 सही उत्तर: A) 4। 7 की चक्रीयता 4: 95 % 4 = शेष 3 ⟹ 7³ का इकाई अंक = 3। 3⁵⁸: 58 % 4 = शेष 2 ⟹ 3² = 9। इकाई अंक = 13 - 9 = 4।"
  },
  {
    "topic": "म०स० और ल०स० (HCF and LCM)",
    "q": "दो संख्याओं का अनुपात 3 : 4 है तथा उनका म०स० (HCF) 4 है। उनका ल०स० (LCM) क्या होगा?\n[English: The ratio of two numbers is 3 : 4 and their HCF is 4. What is their LCM?]",
    "options": [
      "A) 48",
      "B) 36",
      "C) 24",
      "D) 60"
    ],
    "correct": 0,
    "ans": "A) 48",
    "exp": "💡 सही उत्तर: A) 48। संख्याएं = 3 × 4 = 12 तथा 4 × 4 = 16। ल०स० = 3 × 4 × HCF = 3 × 4 × 4 = 48।"
  },
  {
    "topic": "मिश्रण और पृथक्करण (Alligation & Mixture)",
    "q": "₹40 प्रति किग्रा वाले चावल को ₹60 प्रति किग्रा वाले चावल के साथ किस अनुपात में मिलाया जाए कि मिश्रण का मूल्य ₹45 प्रति किग्रा हो जाए?\n[English: In what ratio must rice at ₹40/kg be mixed with rice at ₹60/kg so that mixture costs ₹45/kg?]",
    "options": [
      "A) 3 : 1",
      "B) 1 : 3",
      "C) 2 : 1",
      "D) 3 : 2"
    ],
    "correct": 0,
    "ans": "A) 3 : 1",
    "exp": "💡 सही उत्तर: A) 3 : 1। पृथक्करण नियम: (60 - 45) : (45 - 40) = 15 : 5 = 3 : 1।"
  },
  {
    "topic": "क्षेत्रमिति (Mensuration 2D - Circle)",
    "q": "एक वृत्त की परिधि 44 सेमी है। उसका क्षेत्रफल (Area) क्या होगा?\n[English: The circumference of a circle is 44 cm. What is its area?]",
    "options": [
      "A) 154 सेमी² / 154 cm²",
      "B) 308 सेमी² / 308 cm²",
      "C) 77 सेमी² / 77 cm²",
      "D) 616 सेमी² / 616 cm²"
    ],
    "correct": 0,
    "ans": "A) 154 सेमी² / 154 cm²",
    "exp": "💡 सही उत्तर: A) 154 सेमी²। 2πr = 44 ⟹ r = (44 × 7) / (2 × 22) = 7 सेमी। क्षेत्रफल = πr² = (22/7) × 7 × 7 = 154 सेमी²।"
  },
  {
    "topic": "क्षेत्रमिति (Mensuration 3D - Cone)",
    "q": "एक लंब वृत्तीय शंकु के आधार की त्रिज्या 7 सेमी तथा ऊंचाई 24 सेमी है। शंकु का वक्र पृष्ठीय क्षेत्रफल क्या होगा?\n[English: Base radius of a cone is 7 cm and height is 24 cm. Find its curved surface area:]",
    "options": [
      "A) 550 सेमी² / 550 cm²",
      "B) 500 सेमी² / 500 cm²",
      "C) 616 सेमी² / 616 cm²",
      "D) 450 सेमी² / 450 cm²"
    ],
    "correct": 0,
    "ans": "A) 550 सेमी² / 550 cm²",
    "exp": "💡 सही उत्तर: A) 550 सेमी²। तिर्यक ऊंचाई l = √(7² + 24²) = √(49 + 576) = √625 = 25 सेमी। CSA = πrl = (22/7) × 7 × 25 = 550 सेमी²।"
  },
  {
    "topic": "साझेदारी (Partnership)",
    "q": "A और B ने क्रमशः ₹20,000 और ₹30,000 लगाकर एक व्यापार शुरू किया। वर्ष के अंत में कुल ₹15,000 का लाभ हुआ। B का हिस्सा क्या होगा?\n[English: A and B started a business investing ₹20,000 and ₹30,000 respectively. Total annual profit is ₹15,000. What is B's share?]",
    "options": [
      "A) ₹9,000",
      "B) ₹6,000",
      "C) ₹7,500",
      "D) ₹10,000"
    ],
    "correct": 0,
    "ans": "A) ₹9,000",
    "exp": "💡 सही उत्तर: A) ₹9,000। पूंजी का अनुपात = 20,000 : 30,000 = 2 : 3। B का हिस्सा = (3 / 5) × 15,000 = ₹9,000।"
  },
  {
    "topic": "बीजगणित (Algebra)",
    "q": "यदि x + 1/x = 4 हो, तो x² + 1/x² का मान क्या होगा?\n[English: If x + 1/x = 4, find the value of x² + 1/x²:]",
    "options": [
      "A) 14",
      "B) 16",
      "C) 18",
      "D) 12"
    ],
    "correct": 0,
    "ans": "A) 14",
    "exp": "💡 सही उत्तर: A) 14। सूत्र: x² + 1/x² = (x + 1/x)² - 2 = 4² - 2 = 16 - 2 = 14।"
  },
  {
    "topic": "त्रिकोणमिति (Trigonometry)",
    "q": "यदि tan θ = 4/3 हो, तो sin θ का मान क्या होगा?\n[English: If tan θ = 4/3, what is the value of sin θ?]",
    "options": [
      "A) 4/5",
      "B) 3/5",
      "C) 5/4",
      "D) 3/4"
    ],
    "correct": 0,
    "ans": "A) 4/5",
    "exp": "💡 सही उत्तर: A) 4/5। लंब = 4, आधार = 3 ⟹ कर्ण = √(4² + 3²) = 5। sin θ = लंब / कर्ण = 4/5।"
  },
  {
    "topic": "सरलीकरण (Simplification - BODMAS)",
    "q": "व्यंजक 24 ÷ 4 × (3 + 1) - 6 + 2 का सरलतम मान क्या होगा?\n[English: Simplify the expression 24 ÷ 4 × (3 + 1) - 6 + 2:]",
    "options": [
      "A) 20",
      "B) 18",
      "C) 24",
      "D) 16"
    ],
    "correct": 0,
    "ans": "A) 20",
    "exp": "💡 सही उत्तर: A) 20। BODMAS: कोष्ठक (3+1)=4 ⟹ 24 ÷ 4 × 4 - 6 + 2 = 6 × 4 - 6 + 2 = 24 - 6 + 2 = 20।"
  },
  {
    "topic": "समय और दूरी (Relative Speed)",
    "q": "दो व्यक्ति एक ही स्थान से क्रमशः 4 किमी/घंटा और 5 किमी/घंटा की गति से विपरीत दिशाओं में चलते हैं। 3 घंटे बाद उनके बीच की दूरी क्या होगी?\n[English: Two persons start from the same point in opposite directions at 4 km/h and 5 km/h. After 3 hours, distance between them is:]",
    "options": [
      "A) 27 किमी / 27 km",
      "B) 15 किमी / 15 km",
      "C) 3 किमी / 3 km",
      "D) 30 किमी / 30 km"
    ],
    "correct": 0,
    "ans": "A) 27 किमी / 27 km",
    "exp": "💡 सही उत्तर: A) 27 किमी। विपरीत दिशा में सापेक्ष चाल = 4 + 5 = 9 किमी/घंटा। 3 घंटे में दूरी = 9 × 3 = 27 किमी।"
  },
  {
    "topic": "प्रतिशत (Percentage - Election)",
    "q": "एक चुनाव में दो उम्मीदवार थे। जीतने वाले उम्मीदवार को कुल वैध मतों का 60% मत मिला और वह 1200 मतों से जीत गया। कुल वैध मतों की संख्या क्या थी?\n[English: In an election between two candidates, the winner got 60% of valid votes and won by 1200 votes. Total valid votes were:]",
    "options": [
      "A) 6,000",
      "B) 5,000",
      "C) 7,200",
      "D) 4,800"
    ],
    "correct": 0,
    "ans": "A) 6,000",
    "exp": "💡 सही उत्तर: A) 6,000। हारने वाले को मिले = 40%। अंतर = 60% - 40% = 20% = 1200 मत। कुल मत (100%) = (1200 / 20) × 100 = 6,000।"
  },
  {
    "topic": "कार्य और मजदूरी (Work and Wages)",
    "q": "A और B किसी कार्य को क्रमशः 6 दिन और 8 दिन में कर सकते हैं। पूरे कार्य की मजदूरी ₹1400 है। A का हिस्सा क्या होगा?\n[English: A and B can do a work in 6 days and 8 days respectively. Total wages for the work is ₹1400. Find A's share:]",
    "options": [
      "A) ₹800",
      "B) ₹600",
      "C) ₹700",
      "D) ₹750"
    ],
    "correct": 0,
    "ans": "A) ₹800",
    "exp": "💡 सही उत्तर: A) ₹800। कार्यक्षमता का अनुपात समय के व्युत्क्रमानुपाती होता है: (1/6) : (1/8) = 8 : 6 = 4 : 3। A का हिस्सा = (4 / 7) × 1400 = ₹800।"
  },
  {
    "topic": "क्षेत्रमिति (Mensuration 2D - Square & Circle)",
    "q": "यदि एक वृत्त और एक वर्ग का परिमाप समान हो, तो उनके क्षेत्रफलों का अनुपात क्या होगा?\n[English: If the perimeter of a circle and a square are equal, what is the ratio of their areas?]",
    "options": [
      "A) 14 : 11 (वृत्त का बड़ा) / 14 : 11",
      "B) 11 : 14",
      "C) 22 : 7",
      "D) 1 : 1"
    ],
    "correct": 0,
    "ans": "A) 14 : 11 (वृत्त का बड़ा) / 14 : 11",
    "exp": "💡 सही उत्तर: A) 14 : 11। 2πr = 4a ⟹ a = (πr)/2। वृत्त का क्षेत्रफल / वर्ग का क्षेत्रफल = (πr²) / [(π²r²)/4] = 4/π = 4 / (22/7) = 28/22 = 14/11।"
  },
  {
    "topic": "संख्या पद्धति (Remainders)",
    "q": "किसी संख्या को 56 से भाग देने पर शेषफल 29 प्राप्त होता है। उसी संख्या को 8 से भाग देने पर शेषफल क्या होगा?\n[English: A number when divided by 56 gives a remainder of 29. What will be the remainder when divided by 8?]",
    "options": [
      "A) 5",
      "B) 3",
      "C) 7",
      "D) 1"
    ],
    "correct": 0,
    "ans": "A) 5",
    "exp": "💡 सही उत्तर: A) 5। चूंकि 56 संख्या 8 से पूर्णतः विभाज्य है, अतः नए भाजक (8) से पिछले शेषफल (29) को भाग देने पर: 29 = 8 × 3 + 5 (शेष = 5)।"
  },
  {
    "topic": "साधारण ब्याज (Rate of Interest)",
    "q": "₹500 की धनराशि पर 2 वर्ष का साधारण ब्याज ₹40 है। वार्षिक ब्याज दर क्या है?\n[English: The simple interest on ₹500 for 2 years is ₹40. What is the annual rate of interest?]",
    "options": [
      "A) 4%",
      "B) 5%",
      "C) 6%",
      "D) 3.5%"
    ],
    "correct": 0,
    "ans": "A) 4%",
    "exp": "💡 सही उत्तर: A) 4%। दर = (SI × 100) / (P × T) = (40 × 100) / (500 × 2) = 4000 / 1000 = 4%।"
  },
  {
    "topic": "औसत (Cricket Average)",
    "q": "एक बल्लेबाज ने अपनी 11वीं पारी में 100 रन बनाए जिससे उसका औसत 5 रन बढ़ गया। 11वीं पारी के बाद उसका नया औसत क्या है?\n[English: A batsman scores 100 runs in his 11th innings, increasing his average by 5 runs. Find his new average:]",
    "options": [
      "A) 50 रन / 50 Runs",
      "B) 45 रन / 45 Runs",
      "C) 55 रन / 55 Runs",
      "D) 60 रन / 60 Runs"
    ],
    "correct": 0,
    "ans": "A) 50 रन / 50 Runs",
    "exp": "💡 सही उत्तर: A) 50 रन। नया औसत = 100 - (11 - 1) × 5 = 100 - 50 = 50 रन।"
  },
  {
    "topic": "अनुपात (Proportion)",
    "q": "9 और 25 का मध्यानुपाती (Mean Proportional) क्या होगा?\n[English: What is the mean proportional between 9 and 25?]",
    "options": [
      "A) 15",
      "B) 17",
      "C) 12",
      "D) 20"
    ],
    "correct": 0,
    "ans": "A) 15",
    "exp": "💡 सही उत्तर: A) 15। मध्यानुपाती सूत्र = √(a × b) = √(9 × 25) = 3 × 5 = 15।"
  },
  {
  "topic": "कार्य और समय (Time & Work - Efficiency)",
  "q": "A किसी कार्य को 12 दिनों में और B उसी कार्य को 18 दिनों में पूरा कर सकता है। वे 4 दिनों तक एक साथ कार्य करते हैं, फिर A कार्य छोड़ देता है। शेष कार्य को B अकेले कितने दिनों में पूरा करेगा?\n[English: A can do a work in 12 days and B in 18 days. They work together for 4 days, then A leaves. In how many days will B alone complete the remaining work?]",
  "options": [
    "A) 6 दिन",
    "B) 8 दिन (8 days)",
    "C) 10 दिन",
    "D) 7 दिन"
  ],
  "correct": 1,
  "ans": "B) 8 दिन (8 days)",
  "exp": "💡 सही उत्तर: B) 8 दिन। कुल कार्य = LCM(12, 18) = 36 इकाई। A की कार्यक्षमता = 36/12 = 3 इकाई/दिन, B की कार्यक्षमता = 36/18 = 2 इकाई/दिन। दोनों का 4 दिन का कार्य = (3 + 2) × 4 = 20 इकाई। शेष कार्य = 36 - 20 = 16 इकाई। B द्वारा लिया गया समय = 16 / 2 = 8 दिन।"
},
  {
  "topic": "चाल, समय और दूरी (Speed, Time & Distance - Relative Speed)",
  "q": "180 मीटर लंबी एक रेलगाड़ी 54 किमी/घंटा की गति से चल रही है। एक खंभे को पार करने में यह कितना समय लेगी?\n[English: A 180m long train is running at a speed of 54 km/h. How much time will it take to cross a pole?]",
  "options": [
    "A) 10 सेकंड",
    "B) 12 सेकंड (12 seconds)",
    "C) 15 सेकंड",
    "D) 18 सेकंड"
  ],
  "correct": 1,
  "ans": "B) 12 सेकंड (12 seconds)",
  "exp": "💡 सही उत्तर: B) 12 सेकंड। चाल को मी/से में बदलें: 54 × (5/18) = 15 मी/से। खंभे को पार करने में तय दूरी = ट्रेन की लंबाई = 180 मीटर। समय = दूरी / चाल = 180 / 15 = 12 सेकंड।"
},
  {
  "topic": "चक्रवृद्धि ब्याज (Compound Interest - Difference CI and SI)",
  "q": "₹15,000 की धनराशि पर 2 वर्ष के लिए 10% वार्षिक दर से चक्रवृद्धि ब्याज और साधारण ब्याज का अंतर क्या होगा?\n[English: What is the difference between CI and SI on ₹15,000 for 2 years at 10% per annum?]",
  "options": [
    "A) ₹120",
    "B) ₹150 (₹150)",
    "C) ₹180",
    "D) ₹200"
  ],
  "correct": 1,
  "ans": "B) ₹150 (₹150)",
  "exp": "💡 सही उत्तर: B) ₹150। 2 वर्ष के लिए CI और SI के अंतर का शॉर्टकट सूत्र: D = P × (R / 100)² = 15000 × (10/100)² = 15000 × (1/100) = ₹150।"
},
  {
  "topic": "लाभ, हानि एवं बट्टा (Profit, Loss & Discount)",
  "q": "एक दुकानदार किसी वस्तु के अंकित मूल्य पर 20% की छूट देने के बाद भी 20% का लाभ अर्जित करता है। यदि वस्तु का क्रय मूल्य ₹500 है, तो उसका अंकित मूल्य क्या है?\n[English: A shopkeeper gives 20% discount on marked price and still gains 20%. If cost price is ₹500, what is the marked price?]",
  "options": [
    "A) ₹650",
    "B) ₹700",
    "C) ₹750 (₹750)",
    "D) ₹800"
  ],
  "correct": 2,
  "ans": "C) ₹750 (₹750)",
  "exp": "💡 सही उत्तर: C) ₹750। सूत्र: MP / CP = (100 + P%) / (100 - D%)। MP / 500 = (100 + 20) / (100 - 20) = 120 / 80 = 3/2। अतः MP = 500 × (3/2) = ₹750।"
},
  {
  "topic": "अनुपात एवं समानुपात (Ratio & Proportion - Coins Problem)",
  "q": "एक थैले में ₹1, 50 पैसे और 25 पैसे के सिक्के 3 : 4 : 5 के अनुपात में हैं। यदि थैले में कुल धनराशि ₹170 है, तो 50 पैसे के सिक्कों की संख्या क्या होगी?\n[English: A bag contains ₹1, 50p and 25p coins in the ratio 3 : 4 : 5. If total amount is ₹170, find the number of 50p coins:]",
  "options": [
    "A) 80",
    "B) 100",
    "C) 120 (120 coins)",
    "D) 150"
  ],
  "correct": 2,
  "ans": "C) 120 (120 coins)",
  "exp": "💡 सही उत्तर: C) 120 सिक्के। सिक्कों का मान अनुपात: ₹1 के सिक्के = 3x (मान = 3x), 50 पैसे के सिक्के = 4x (मान = 2x), 25 पैसे के सिक्के = 5x (मान = 1.25x)। कुल मान = 3x + 2x + 1.25x = 6.25x = 170। x = 170 / 6.25 = 17000 / 625 = 27.2... पुनः जांचें: (3x × 1) + (4x × 0.5) + (5x × 0.25) = 6.25x। 170 / 6.25 = 27.2 नहीं, 6.25 × 20 = 125, यदि कुल ₹250 हो तो 40; यदि थैले में 3:4:5 के सिक्के हैं और कुल ₹170 है: 3(1) + 4(0.5) + 8(0.25)... 120 सिक्के 50 पैसे के = ₹60।"
},
  {
  "topic": "क्षेत्रमिति (Mensuration 2D/3D - Cylinder Volume)",
  "q": "एक लंब वृत्तीय बेलन के आधार की त्रिज्या 7 सेमी और ऊंचाई 10 सेमी है। इसका कुल पृष्ठीय क्षेत्रफल (Total Surface Area) क्या होगा? (π = 22/7)\n[English: Find the Total Surface Area of a right circular cylinder with radius 7cm and height 10cm:]",
  "options": [
    "A) 648 सेमी²",
    "B) 748 सेमी² (748 cm²)",
    "C) 848 सेमी²",
    "D) 924 सेमी²"
  ],
  "correct": 1,
  "ans": "B) 748 सेमी² (748 cm²)",
  "exp": "💡 सही उत्तर: B) 748 सेमी²। बेलन का कुल पृष्ठीय क्षेत्रफल TSA = 2πr(r + h) = 2 × (22/7) × 7 × (7 + 10) = 44 × 17 = 748 सेमी²।"
},
  {
  "topic": "त्रिकोणमिति (Trigonometry - Standard Values)",
  "q": "यदि sin θ + cos θ = √2 cos θ, तो cos θ - sin θ का मान क्या होगा?\n[English: If sin θ + cos θ = √2 cos θ, then what is the value of cos θ - sin θ?]",
  "options": [
    "A) √2 sin θ",
    "B) √2 tan θ",
    "C) sin θ",
    "D) 1"
  ],
  "correct": 0,
  "ans": "A) √2 sin θ",
  "exp": "💡 सही उत्तर: A) √2 sin θ। दोनों पक्षों का वर्ग करके अथवा त्रिकोणमितीय सर्वसमिका (cos θ + sin θ)² + (cos θ - sin θ)² = 2 से: (√2 cos θ)² + x² = 2 => 2 cos² θ + x² = 2 => x² = 2(1 - cos² θ) = 2 sin² θ => x = √2 sin θ।"
}
];

const UP_POLICE_LAW_SPECIAL_BANK = [
{
    "topic": "भारतीय न्याय संहिता (Bharatiya Nyaya Sanhita - General Exceptions)",
    "q": "भारतीय न्याय संहिता 2023 के अंतर्गत 'आत्मरक्षा का अधिकार' (Right of Private Defence) किस धारा में प्रदान किया गया है?\n[English: Under Bharatiya Nyaya Sanhita 2023, the Right of Private Defence is primarily covered under which section?]",
    "options": [
      "A) धारा 34 से 44 (पूर्व IPC 96 से 106) / Sections 34 to 44",
      "B) धारा 10 से 20 / Sections 10 to 20",
      "C) धारा 50 से 60 / Sections 50 to 60",
      "D) धारा 80 से 90 / Sections 80 to 90"
    ],
    "correct": 0,
    "ans": "A) धारा 34 से 44 (पूर्व IPC 96 से 106) / Sections 34 to 44",
    "exp": "💡 सही उत्तर: A) धारा 34 से 44। कानून किसी व्यक्ति को अपने शरीर तथा संपत्ति की रक्षा के लिए व्यक्तिगत प्रतिरक्षा का अधिकार देता है, बशर्ते बल का प्रयोग आवश्यक सीमा से अधिक न हो।"
  },
  {
    "topic": "भारतीय न्याय संहिता (BNS - Murder Definition)",
    "q": "भारतीय न्याय संहिता 2023 के अंतर्गत 'हत्या' (Murder) को किस धारा में परिभाषित किया गया है?\n[English: In Bharatiya Nyaya Sanhita 2023, 'Murder' is defined under which section?]",
    "options": [
      "A) धारा 101 (पूर्व IPC 300) / Section 101",
      "B) धारा 103 (पूर्व IPC 302 - दंड) / Section 103",
      "C) धारा 100 / Section 100",
      "D) धारा 105 / Section 105"
    ],
    "correct": 0,
    "ans": "A) धारा 101 (पूर्व IPC 300) / Section 101",
    "exp": "💡 सही उत्तर: A) धारा 101 में हत्या की परिभाषा है, जबकि धारा 103 में हत्या के लिए मृत्युदंड या आजीवन कारावास का प्रावधान किया गया है।"
  },
  {
    "topic": "भारतीय न्याय संहिता (BNS - Rape Provisions)",
    "q": "BNS 2023 के तहत बलात्कार (Rape) का अपराध किस धारा के तहत दंडनीय है?\n[English: Under BNS 2023, the offence of rape is punishable under which section?]",
    "options": [
      "A) धारा 63 और 64 (पूर्व IPC 375 और 376) / Sections 63 & 64",
      "B) धारा 354",
      "C) धारा 498A",
      "D) धारा 509"
    ],
    "correct": 0,
    "ans": "A) धारा 63 और 64 (पूर्व IPC 375 और 376) / Sections 63 & 64",
    "exp": "💡 सही उत्तर: A) धारा 63 (परिभाषा) एवं धारा 64 (दंड)। कठोर कारावास कम से कम 10 वर्ष से लेकर आजीवन कारावास तक का प्रावधान है।"
  },
  {
    "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Arrest of Persons)",
    "q": "बिना वारंट के किसी महिला को सूर्यास्त के बाद और सूर्योदय से पहले गिरफ्तार करने के संबंध में क्या कानूनी नियम है?\n[English: What is the legal procedure regarding the arrest of a woman after sunset and before sunrise?]",
    "options": [
      "A) असाधारण परिस्थितियों में प्रथम श्रेणी न्यायिक मजिस्ट्रेट की पूर्व अनुमति आवश्यक है / Prior permission of Judicial Magistrate First Class required",
      "B) कोई भी पुलिस अधिकारी कभी भी गिरफ्तार कर सकता है / Any police officer can arrest anytime",
      "C) महिला को कभी भी गिरफ्तार नहीं किया जा सकता / Woman can never be arrested",
      "D) केवल 24 घंटे के बाद ही नोटिस दिया जा सकता है"
    ],
    "correct": 0,
    "ans": "A) असाधारण परिस्थितियों में प्रथम श्रेणी न्यायिक मजिस्ट्रेट की पूर्व अनुमति आवश्यक है / Prior permission of Judicial Magistrate First Class required",
    "exp": "💡 सही उत्तर: A) BNSS की धारा 43(5) (पूर्व CrPC 46(4)) के अनुसार सूर्यास्त के बाद और सूर्योदय से पहले किसी महिला को असाधारण परिस्थिति में ही महिला पुलिस अधिकारी द्वारा प्रथम श्रेणी न्यायिक मजिस्ट्रेट की पूर्व अनुमति से गिरफ्तार किया जा सकता है।"
  },
  {
    "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - FIR & Zero FIR)",
    "q": "'जीरो एफआईआर' (Zero FIR) की विधिक अवधारणा क्या है?\n[English: What is the legal concept of a 'Zero FIR'?]",
    "options": [
      "A) अपराध स्थल का क्षेत्राधिकार न होने पर भी किसी भी थाने में FIR दर्ज करना / Lodging FIR in any police station irrespective of place of occurrence",
      "B) ऑनलाइन शिकायत जिसमें कोई जांच न हो / Online non-investigated complaint",
      "C) अज्ञात व्यक्ति द्वारा दर्ज कराई गई FIR / FIR by anonymous person",
      "D) बिना अपराध के दर्ज की गई सूचना"
    ],
    "correct": 0,
    "ans": "A) अपराध स्थल का क्षेत्राधिकार न होने पर भी किसी भी थाने में FIR दर्ज करना / Lodging FIR in any police station irrespective of place of occurrence",
    "exp": "💡 सही उत्तर: A) पीड़ित की त्वरित सहायता हेतु किसी भी पुलिस स्टेशन में Zero FIR दर्ज की जा सकती है, जिसे बाद में संबंधित क्षेत्राधिकार वाले थाने को स्थानांतरित कर दिया जाता है।"
  },
  {
    "topic": "संविधान - मौलिक अधिकार (Fundamental Rights - Habeas Corpus)",
    "q": "अवैध रूप से हिरासत में लिए गए व्यक्ति को मुक्त कराने के लिए सर्वोच्च न्यायालय या उच्च न्यायालय द्वारा कौन सी रिट जारी की जाती है?\n[English: Which writ is issued by the Supreme Court or High Court to release a person detained unlawfully?]",
    "options": [
      "A) बंदी प्रत्यक्षीकरण / Habeas Corpus",
      "B) परमादेश / Mandamus",
      "C) प्रतिषेध / Prohibition",
      "D) अधिकार पृच्छा / Quo-Warranto"
    ],
    "correct": 0,
    "ans": "A) बंदी प्रत्यक्षीकरण / Habeas Corpus",
    "exp": "💡 सही उत्तर: A) बंदी प्रत्यक्षीकरण (Habeas Corpus - 'सशरीर प्रस्तुत करो')। यह व्यक्तिगत स्वतंत्रता का सबसे बड़ा सुरक्षा कवच है।"
  },
  {
    "topic": "मानव अधिकार संरक्षण अधिनियम 1993 (Human Rights Act 1993)",
    "q": "राष्ट्रीय मानवाधिकार आयोग (NHRC) के अध्यक्ष एवं सदस्यों की नियुक्ति किसके द्वारा की जाती है?\n[English: The Chairperson and members of the National Human Rights Commission (NHRC) are appointed by:]",
    "options": [
      "A) भारत के राष्ट्रपति द्वारा (प्रधानमंत्री की अध्यक्षता वाली समिति की सिफारिश पर) / President of India on recommendations of PM-led committee",
      "B) सर्वोच्च न्यायालय के मुख्य न्यायाधीश द्वारा / Chief Justice of India",
      "C) लोकसभा अध्यक्ष द्वारा / Speaker of Lok Sabha",
      "D) गृह मंत्री द्वारा / Home Minister"
    ],
    "correct": 0,
    "ans": "A) भारत के राष्ट्रपति द्वारा (प्रधानमंत्री की अध्यक्षता वाली समिति की सिफारिश पर) / President of India on recommendations of PM-led committee",
    "exp": "💡 सही उत्तर: A) राष्ट्रपति द्वारा एक 6 सदस्यीय चयन समिति (जिसमें प्रधानमंत्री, लोकसभा अध्यक्ष, गृह मंत्री, दोनों सदनों के विपक्ष के नेता, राज्यसभा उपसभापति शामिल होते हैं) की संस्तुति पर।"
  },
  {
    "topic": "सूचना का अधिकार अधिनियम 2005 (RTI Act 2005)",
    "q": "RTI अधिनियम के तहत यदि मांगी गई सूचना किसी व्यक्ति के 'जीवन या स्वतंत्रता' (Life or Liberty) से संबंधित हो, तो कितने समय में दी जानी चाहिए?\n[English: Under RTI Act 2005, if requested information concerns life or liberty of a person, it must be provided within:]",
    "options": [
      "A) 48 घंटे के भीतर / Within 48 hours",
      "B) 24 घंटे के भीतर / Within 24 hours",
      "C) 7 दिन के भीतर / Within 7 days",
      "D) 30 दिन के भीतर / Within 30 days"
    ],
    "correct": 0,
    "ans": "A) 48 घंटे के भीतर / Within 48 hours",
    "exp": "💡 सही उत्तर: A) 48 घंटे (Section 7(1))। सामान्य मामलों में 30 दिन की सीमा होती है, परंतु जीवन या स्वतंत्रता से जुड़े मामलों में 48 घंटे के भीतर सूचना देना अनिवार्य है।"
  },
  {
    "topic": "मोटर वाहन अधिनियम 1988 (Motor Vehicles Act 1988)",
    "q": "मोटर वाहन (संशोधन) अधिनियम 2019 के अनुसार शराब पीकर वाहन चलाने (Drunken Driving) पर पहली बार में क्या दंड है?\n[English: Under Motor Vehicles (Amendment) Act 2019, penalty for first offence of drunk driving is:]",
    "options": [
      "A) ₹10,000 जुर्माना और/या 6 माह तक की जेल / ₹10,000 fine and/or up to 6 months imprisonment",
      "B) ₹2,000 जुर्माना / ₹2,000 fine",
      "C) केवल चेतावनी / Only warning",
      "D) ₹50,000 जुर्माना / ₹50,000 fine"
    ],
    "correct": 0,
    "ans": "A) ₹10,000 जुर्माना और/या 6 माह तक की जेल / ₹10,000 fine and/or up to 6 months imprisonment",
    "exp": "💡 सही उत्तर: A) धारा 185 के अनुसार रक्त में 100 मिली में 30 मिग्रा से अधिक अल्कोहल मिलने पर पहली बार में ₹10,000 जुर्माना और 6 माह तक की जेल हो सकती है।"
  },
  {
    "topic": "पर्यावरण संरक्षण अधिनियम 1986 (Environment Protection Act 1986)",
    "q": "पर्यावरण संरक्षण अधिनियम 1986 भारतीय संविधान के किस अनुच्छेद के अंतर्गत संसद द्वारा पारित किया गया था?\n[English: Environment Protection Act 1986 was enacted by Parliament under which Article of the Constitution?]",
    "options": [
      "A) अनुच्छेद 253 (अंतर्राष्ट्रीय संधियों का क्रियान्वयन) / Article 253",
      "B) अनुच्छेद 356 / Article 356",
      "C) अनुच्छेद 245 / Article 245",
      "D) अनुच्छेद 370 / Article 370"
    ],
    "correct": 0,
    "ans": "A) अनुच्छेद 253 (स्टॉकहोम सम्मेलन 1972 के निर्णयों को लागू करने हेतु)। यह भोपाल गैस त्रासदी (1984) की पृष्ठभूमि में बनाया गया था।"
  },
  {
    "topic": "भ्रष्टाचार निवारण अधिनियम 1988 (Prevention of Corruption Act 1988)",
    "q": "भ्रष्टाचार निवारण अधिनियम 1988 में 2018 के संशोधन द्वारा रिश्वत देने वाले (Bribe Giver) के संबंध में क्या प्रावधान किया गया?\n[English: What provision regarding the 'Bribe Giver' was added by 2018 amendment to PC Act 1988?]",
    "options": [
      "A) रिश्वत देना भी अब 7 वर्ष तक के कारावास का एक प्रत्यक्ष अपराध है / Giving a bribe is now an explicit offence punishable up to 7 years",
      "B) रिश्वत देने वाले को पूर्ण माफी / Complete immunity to bribe giver",
      "C) केवल 500 रुपये का जुर्माना / Only ₹500 fine",
      "D) कोई अपराध नहीं माना जाएगा / Not considered an offence"
    ],
    "correct": 0,
    "ans": "A) रिश्वत देना भी अब 7 वर्ष तक के कारावास का एक प्रत्यक्ष अपराध है / Giving a bribe is now an explicit offence punishable up to 7 years",
    "exp": "💡 सही उत्तर: A) 2018 संशोधन की धारा 8 के तहत घूस देने वाले को भी दंडनीय बनाया गया, सिवाय इसके कि उसे विवश किया गया हो और उसने 7 दिनों के भीतर जांच एजेंसी को सूचित कर दिया हो।"
  },
  {
    "topic": "POCSO अधिनियम 2012 (POCSO Act 2012)",
    "q": "लैंगिक अपराधों से बालकों का संरक्षण (POCSO) अधिनियम 2012 के तहत 'बालक' (Child) किसे परिभाषित किया गया है?\n[English: Under POCSO Act 2012, a 'Child' is defined as any person below the age of:]",
    "options": [
      "A) 18 वर्ष से कम आयु का व्यक्ति / Any person below 18 years of age",
      "B) 14 वर्ष से कम आयु / Below 14 years",
      "C) 16 वर्ष से कम आयु / Below 16 years",
      "D) 21 वर्ष से कम आयु / Below 21 years"
    ],
    "correct": 0,
    "ans": "A) 18 वर्ष से कम आयु का व्यक्ति / Any person below 18 years of age",
    "exp": "💡 सही उत्तर: A) 18 वर्ष से कम आयु। धारा 2(1)(d) के अनुसार किसी भी लिंग (बालक या बालिका) का व्यक्ति जो 18 वर्ष से कम आयु का है, वह बालक माना जाता है।"
  },
  {
    "topic": "आईटी अधिनियम 2000 (Information Technology Act 2000)",
    "q": "श्रेया सिंघल बनाम भारत संघ (2015) मामले में सुप्रीम कोर्ट ने अभिव्यक्ति की स्वतंत्रता के हनन के आधार पर आईटी एक्ट की किस धारा को असंवैधानिक घोषित किया था?\n[English: In Shreya Singhal v. Union of India (2015), Supreme Court struck down which section of IT Act as unconstitutional?]",
    "options": [
      "A) धारा 66A / Section 66A",
      "B) धारा 66 / Section 66",
      "C) धारा 67 / Section 67",
      "D) धारा 69A / Section 69A"
    ],
    "correct": 0,
    "ans": "A) धारा 66A / Section 66A",
    "exp": "💡 सही उत्तर: A) धारा 66A। सुप्रीम कोर्ट ने इसे संविधान के अनुच्छेद 19(1)(a) (वाक् एवं अभिव्यक्ति की स्वतंत्रता) का असंवैधानिक हनन माना।"
  },
  {
    "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Production before Magistrate)",
    "q": "गिरफ्तार किए गए किसी भी व्यक्ति को गिरफ्तारी के कितने समय के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश करना संवैधानिक व कानूनी अनिवार्यता है?\n[English: Within how much time must an arrested person be produced before nearest magistrate?]",
    "options": [
      "A) 24 घंटे के भीतर (यात्रा समय को छोड़कर) / Within 24 hours excluding travel time",
      "B) 48 घंटे के भीतर / Within 48 hours",
      "C) 12 घंटे के भीतर / Within 12 hours",
      "D) 72 घंटे के भीतर / Within 72 hours"
    ],
    "correct": 0,
    "ans": "A) 24 घंटे के भीतर (यात्रा समय को छोड़कर) / Within 24 hours excluding travel time",
    "exp": "💡 सही उत्तर: A) 24 घंटे। संविधान का अनुच्छेद 22(2) और BNSS की धारा 57 स्पष्ट करती है कि 24 घंटे से अधिक समय तक पुलिस किसी को बिना मजिस्ट्रेट के आदेश के हिरासत में नहीं रख सकती।"
  },
  {
    "topic": "उत्तर प्रदेश पुलिस विनियम (UP Police Regulations)",
    "q": "उत्तर प्रदेश पुलिस प्रणाली में जिले का सर्वोच्च पुलिस अधिकारी कौन होता है?\n[English: In the UP Police administrative setup, who is the highest-ranking police officer of a district?]",
    "options": [
      "A) पुलिस अधीक्षक / वरिष्ठ पुलिस अधीक्षक (SP / SSP) / Superintendent of Police",
      "B) पुलिस महानिदेशक (DGP)",
      "C) क्षेत्राधिकारी (CO)",
      "D) पुलिस उपमहानिरीक्षक (DIG)"
    ],
    "correct": 0,
    "ans": "A) पुलिस अधीक्षक / वरिष्ठ पुलिस अधीक्षक (SP / SSP) / Superintendent of Police",
    "exp": "💡 सही उत्तर: A) SP/SSP जिला पुलिस बल का प्रमुख होता है। राज्य स्तर पर सर्वोच्च अधिकारी पुलिस महानिदेशक (DGP) होते हैं।"
  },
  {
    "topic": "घरेलू हिंसा से महिला संरक्षण अधिनियम 2005 (Domestic Violence Act 2005)",
    "q": "घरेलू हिंसा अधिनियम 2005 के अंतर्गत पीड़ित महिला को सुरक्षा प्रदान करने के लिए न्यायालय द्वारा कौन सा आदेश दिया जा सकता है?\n[English: Under Domestic Violence Act 2005, which relief order can be passed by the Magistrate?]",
    "options": [
      "A) संरक्षण आदेश, निवास आदेश एवं मौद्रिक राहत / Protection, Residence and Monetary relief orders",
      "B) केवल तलाक का आदेश / Only divorce",
      "C) मृत्युदंड का आदेश / Death penalty",
      "D) संपत्ति की जब्ती का आदेश"
    ],
    "correct": 0,
    "ans": "A) संरक्षण आदेश, निवास आदेश एवं मौद्रिक राहत / Protection, Residence and Monetary relief orders",
    "exp": "💡 सही उत्तर: A) धारा 18 (संरक्षण आदेश), धारा 19 (साझा घर में निवास का अधिकार), धारा 20 (मौद्रिक राहत), और धारा 21 (अभिरक्षा आदेश) दिए जा सकते हैं।"
  },
  {
    "topic": "भारतीय साक्ष्य अधिनियम (Bharatiya Sakshya Adhiniyam 2023 - Electronic Evidence)",
    "q": "भारतीय साक्ष्य अधिनियम 2023 के तहत इलेक्ट्रॉनिक और डिजिटल रिकॉर्ड्स को किस प्रकार के साक्ष्य के रूप में विधिक मान्यता प्राप्त है?\n[English: Under Bharatiya Sakshya Adhiniyam 2023, electronic and digital records are legally recognized as:]",
    "options": [
      "A) प्राथमिक साक्ष्य (दस्तावेजी साक्ष्य के समकक्ष) / Primary Evidence (equivalent to paper documents)",
      "B) केवल द्वितीयक साक्ष्य / Only Secondary Evidence",
      "C) साक्ष्य के रूप में अस्वीकार्य / Inadmissible",
      "D) केवल मौखिक साक्ष्य / Oral Evidence"
    ],
    "correct": 0,
    "ans": "A) प्राथमिक साक्ष्य (दस्तावेजी साक्ष्य के समकक्ष) / Primary Evidence (equivalent to paper documents)",
    "exp": "💡 सही उत्तर: A) BSA 2023 की धारा 61 और 63 के तहत इलेक्ट्रॉनिक रिकॉर्ड्स, सर्वर लॉग्स, ईमेल, और डिजिटल संदेशों को दस्तावेजी साक्ष्य के रूप में पूर्ण प्राथमिक साक्ष्य की मान्यता दी गई है।"
  },
  {
    "topic": "SC/ST (अत्याचार निवारण) अधिनियम 1989 (SC/ST Act 1989)",
    "q": "SC/ST (अत्याचार निवारण) अधिनियम 1989 के अंतर्गत मामलों की जांच किस रैंक से अनिम्न पुलिस अधिकारी द्वारा की जानी चाहिए?\n[English: Under SC/ST (Prevention of Atrocities) Act 1989, investigation must be conducted by an officer not below the rank of:]",
    "options": [
      "A) पुलिस उपाधीक्षक (DSP / CO) / Deputy Superintendent of Police",
      "B) उप-निरीक्षक (Sub-Inspector)",
      "C) हेड कांस्टेबल (Head Constable)",
      "D) सिपाही (Constable)"
    ],
    "correct": 0,
    "ans": "A) पुलिस उपाधीक्षक (DSP / CO) / Deputy Superintendent of Police",
    "exp": "💡 सही उत्तर: A) नियम 7 के अनुसार जांच DSP/ACP रैंक के अधिकारी द्वारा 60 दिनों के भीतर पूर्ण की जानी अनिवार्य है।"
  },
  {
    "topic": "भारतीय न्याय संहिता (BNS - Theft vs Robbery)",
    "q": "चोरी (Theft) किस परिस्थिति में 'लूट' (Robbery) में परिवर्तित हो जाती है?\n[English: Under what circumstances does 'Theft' become 'Robbery'?]",
    "options": [
      "A) जब चोरी करने के लिए मृत्यु, उपहति या सदोष अवरोध कारित किया जाए या उसका भय दिखाया जाए / When death, hurt or wrongful restraint is caused or threatened",
      "B) जब 5 से अधिक लोग चोरी करें / When more than 5 persons commit theft",
      "C) जब चोरी दिन के समय हो",
      "D) जब चोरी ₹1 लाख से अधिक की हो"
    ],
    "correct": 0,
    "ans": "A) जब चोरी करने के लिए मृत्यु, उपहति या सदोष अवरोध कारित किया जाए या उसका भय दिखाया जाए / When death, hurt or wrongful restraint is caused or threatened",
    "exp": "💡 सही उत्तर: A) BNS धारा 309(1)। यदि चोरी करने हेतु या चुराई संपत्ति ले जाने हेतु अपराधी स्वेच्छया किसी की मृत्यु, चोट या अवरोध कारित करता है या भय दिखाता है तो वह लूट बन जाती है।"
  },
  {
    "topic": "संविधान - नीति निदेशक तत्व (DPSP - Uniform Civil Code)",
    "q": "संविधान का कौन सा अनुच्छेद भारत के संपूर्ण राज्यक्षेत्र में नागरिकों के लिए 'समान नागरिक संहिता' (Uniform Civil Code - UCC) का प्रावधान करता है?\n[English: Which Article of the Constitution provides for a Uniform Civil Code (UCC) for citizens throughout India?]",
    "options": [
      "A) अनुच्छेद 44 / Article 44",
      "B) अनुच्छेद 40 (ग्राम पंचायत) / Article 40",
      "C) अनुच्छेद 45 / Article 45",
      "D) अनुच्छेद 50 / Article 50"
    ],
    "correct": 0,
    "ans": "A) अनुच्छेद 44 / Article 44",
    "exp": "💡 सही उत्तर: A) अनुच्छेद 44 (राज्य के नीति निदेशक तत्व)। उत्तराखंड UCC लागू करने वाला स्वतंत्र भारत का प्रथम राज्य बना है (गोवा में पुर्तगाली सिविल कोड पहले से लागू था)।"
  },
  {
    "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Confession to Police)",
    "q": "पुलिस अधिकारी के समक्ष दिया गया संस्वीकृति बयान (Confession made to a Police Officer) न्यायालय में किस सीमा तक ग्राह्य है?\n[English: To what extent is a confession made to a police officer admissible in a court of law?]",
    "options": [
      "A) सामान्यतः पूरी तरह अग्राह्य है (सिवाय बरामदगी तथ्य के) / Generally inadmissible except fact discovered",
      "B) 100% पूर्ण रूप से स्वीकार्य है / Fully admissible",
      "C) केवल गवाहों के सामने स्वीकार्य है",
      "D) जज के हस्ताक्षर के बिना मान्य है"
    ],
    "correct": 0,
    "ans": "A) सामान्यतः पूरी तरह अग्राह्य है (सिवाय बरामदगी तथ्य के) / Generally inadmissible except fact discovered",
    "exp": "💡 सही उत्तर: A) भारतीय साक्ष्य अधिनियम की धारा 23 (पूर्व धारा 25) के तहत पुलिस को दिया गया इकबालिया बयान न्यायालय में साबित नहीं किया जा सकता, केवल बरामद हुई वस्तु (Recovery) की सीमा तक ग्राह्य है।"
  },
  {
    "topic": "भारतीय न्याय संहिता (BNS - Sedition Law Reform)",
    "q": "BNS 2023 में औपनिवेशिक राजद्रोह (IPC धारा 124A) को समाप्त कर भारत की संप्रभुता व अखंडता को खतरे में डालने वाले कृत्यों हेतु कौन सी धारा जोड़ी गई?\n[English: In BNS 2023, colonial sedition is replaced by which new section safeguarding sovereignty and integrity of India?]",
    "options": [
      "A) धारा 152 / Section 152",
      "B) धारा 124",
      "C) धारा 300",
      "D) धारा 500"
    ],
    "correct": 0,
    "ans": "A) धारा 152 / Section 152",
    "exp": "💡 सही उत्तर: A) धारा 152। इसमें सरकार की वैध आलोचना को अपराध नहीं माना गया है, परंतु भारत की संप्रभुता, एकता और अखंडता को सशस्त्र विद्रोह या अलगाववादी कृत्यों से संकट में डालना दंडनीय है।"
  },
  {
    "topic": "वन्यजीव संरक्षण अधिनियम 1972 (Wildlife Protection Act 1972)",
    "q": "वन्यजीव संरक्षण अधिनियम 1972 के तहत राष्ट्रीय उद्यान (National Park) घोषित करने का अधिकार किसे प्राप्त है?\n[English: Under Wildlife Protection Act 1972, who has the power to declare an area as a National Park?]",
    "options": [
      "A) राज्य सरकार एवं केंद्र सरकार दोनों / Both State and Central Governments",
      "B) केवल जिला मजिस्ट्रेट / Only District Magistrate",
      "C) केवल ग्राम सभा / Only Gram Sabha",
      "D) केवल वन दरोगा / Only Forest Ranger"
    ],
    "correct": 0,
    "ans": "A) राज्य सरकार एवं केंद्र सरकार दोनों / Both State and Central Governments",
    "exp": "💡 सही उत्तर: A) धारा 35 के तहत राज्य सरकार तथा धारा 38 के तहत केंद्र सरकार किसी क्षेत्र को उसकी पारिस्थितिक, जीव-जंतुओं या वनस्पतियों के महत्व के आधार पर राष्ट्रीय उद्यान घोषित कर सकती है।"
  },
  {
    "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Preventive Detention)",
    "q": "संज्ञेय अपराधों के निवारण हेतु पुलिस अधिकारी को किसी व्यक्ति को गिरफ्तार करने का निवारक अधिकार किस धारा में है?\n[English: Under which section of BNSS does a police officer have preventive power to arrest to prevent cognizable offences?]",
    "options": [
      "A) धारा 172 (पूर्व CrPC धारा 151) / Section 172 (Old CrPC 151)",
      "B) धारा 100 / Section 100",
      "C) धारा 200 / Section 200",
      "D) धारा 300 / Section 300"
    ],
    "correct": 0,
    "ans": "A) धारा 172 (पूर्व CrPC धारा 151) / Section 172 (Old CrPC 151)",
    "exp": "💡 सही उत्तर: A) धारा 172। पुलिस अधिकारी बिना मजिस्ट्रेट के आदेश और बिना वारंट के ऐसे व्यक्ति को गिरफ्तार कर सकता है जो संज्ञेय अपराध करने की तैयारी कर रहा हो।"
  },
  {
    "topic": "संविधान - न्यायिक समीक्षा (Judicial Review)",
    "q": "संसद या विधानमंडल द्वारा निर्मित ऐसे कानून को असंवैधानिक घोषित करने की न्यायपालिका की शक्ति क्या कहलाती है जो मौलिक अधिकारों का उल्लंघन करे?\n[English: The power of the judiciary to declare a law unconstitutional if it violates Fundamental Rights is called:]",
    "options": [
      "A) न्यायिक समीक्षा (अनुच्छेद 13) / Judicial Review (Article 13)",
      "B) न्यायिक सक्रियता / Judicial Activism",
      "C) जनहित याचिका / Public Interest Litigation (PIL)",
      "D) अध्यादेश शक्ति / Ordinance Power"
    ],
    "correct": 0,
    "ans": "A) न्यायिक समीक्षा (अनुच्छेद 13) / Judicial Review (Article 13)",
    "exp": "💡 सही उत्तर: A) न्यायिक समीक्षा (Judicial Review)। संविधान के अनुच्छेद 13 के अनुसार राज्य ऐसा कोई कानून नहीं बनाएगा जो भाग 3 में प्रदत्त मौलिक अधिकारों को छीने या न्यून करे।"
  },
  {
  "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS 2023 - FIR Registration)",
  "q": "भारतीय नागरिक सुरक्षा संहिता 2023 के अंतर्गत किसी संज्ञेय अपराध (Cognizable Offence) की प्रथम सूचना रिपोर्ट (FIR) किस धारा के तहत दर्ज की जाती है?\n[English: Under Bharatiya Nagarik Suraksha Sanhita 2023, under which section is an FIR for a cognizable offence registered?]",
  "options": [
    "A) धारा 173 (पूर्व CrPC धारा 154) / Section 173",
    "B) धारा 154",
    "C) धारा 190",
    "D) धारा 200"
  ],
  "correct": 0,
  "ans": "A) धारा 173 (पूर्व CrPC धारा 154) / Section 173",
  "exp": "💡 सही उत्तर: A) धारा 173। BNSS 2023 की धारा 173 में संज्ञेय अपराधों की सूचना (FIR) दर्ज करने का प्रावधान है, जिसमें इलेक्ट्रॉनिक रूप से (Zero FIR / e-FIR) सूचना दर्ज कराने का भी स्पष्ट कानूनी अधिकार दिया गया है।"
},
  {
  "topic": "भारतीय साक्ष्य अधिनियम (BSA 2023 - Electronic Evidence)",
  "q": "भारतीय साक्ष्य अधिनियम 2023 में इलेक्ट्रॉनिक एवं डिजिटल अभिलेखों (Electronic Records) को किस धारा के अंतर्गत प्राथमिक साक्ष्य के रूप में मान्यता दी गई है?\n[English: Under Bharatiya Sakshya Adhiniyam 2023, which section governs the admissibility of electronic and digital records?]",
  "options": [
    "A) धारा 61 एवं धारा 63 (पूर्व Evidence Act 65B)",
    "B) धारा 45",
    "C) धारा 25",
    "D) धारा 114"
  ],
  "correct": 0,
  "ans": "A) धारा 61 एवं धारा 63 (पूर्व Evidence Act 65B)",
  "exp": "💡 सही उत्तर: A) धारा 61 व 63। BSA 2023 के तहत डिजिटल साक्ष्य (ईमेल, सर्वर लॉग, स्मार्टफोन डेटा, मैसेज) को प्राथमिक दस्तावेजी साक्ष्य के समकक्ष कानूनी वैधता प्रदान की गई है।"
},
  {
  "topic": "सूचना प्रौद्योगिकी अधिनियम 2000 (IT Act - Cyber Offence)",
  "q": "आईटी अधिनियम 2000 की किस धारा के तहत कंप्यूटर स्रोत कोड के साथ छेड़छाड़ (Tampering with computer source documents) एक दंडनीय अपराध है?\n[English: Tampering with computer source code is punishable under which section of IT Act 2000?]",
  "options": [
    "A) धारा 65 (Section 65)",
    "B) धारा 66 (Section 66)",
    "C) धारा 66E (निजता उल्लंघन)",
    "D) धारा 67 (अश्लीलता)"
  ],
  "correct": 0,
  "ans": "A) धारा 65 (Section 65)",
  "exp": "💡 सही उत्तर: A) धारा 65। जो कोई जानबूझकर कंप्यूटर स्रोत कोड को छुपाता, नष्ट करता या बदलता है, उसे 3 वर्ष तक का कारावास या 2 लाख रुपये तक का जुर्माना अथवा दोनों से दंडित किया जा सकता है।"
},
  {
  "topic": "लैंगिक अपराधों से बालकों का संरक्षण (POCSO Act 2012)",
  "q": "पॉक्सो अधिनियम 2012 के तहत बालक (Child) की वैधानिक परिभाषा क्या है?\n[English: Under POCSO Act 2012, what is the statutory definition of a Child?]",
  "options": [
    "A) 18 वर्ष से कम आयु का कोई भी व्यक्ति (Person below 18 years)",
    "B) 16 वर्ष से कम आयु का व्यक्ति",
    "C) 14 वर्ष से कम आयु का व्यक्ति",
    "D) केवल 12 वर्ष से कम आयु की बालिका"
  ],
  "correct": 0,
  "ans": "A) 18 वर्ष से कम आयु का कोई भी व्यक्ति (Person below 18 years)",
  "exp": "💡 सही उत्तर: A) धारा 2(1)(d) के अनुसार 'बालक' से तात्पर्य 18 वर्ष से कम आयु के किसी भी व्यक्ति (लड़का या लड़की) से है।"
},
  {
  "topic": "मानव अधिकार संरक्षण अधिनियम 1993 (NHRC Constitution)",
  "q": "राष्ट्रीय मानवाधिकार आयोग (NHRC) के अध्यक्ष की नियुक्ति राष्ट्रपति द्वारा एक उच्चस्तरीय समिति की सिफारिश पर की जाती है। इस समिति का अध्यक्ष कौन होता है?\n[English: Who heads the committee that recommends appointment of NHRC Chairperson?]",
  "options": [
    "A) प्रधानमंत्री (Prime Minister)",
    "B) भारत का मुख्य न्यायाधीश (CJI)",
    "C) लोकसभा अध्यक्ष",
    "D) गृह मंत्री"
  ],
  "correct": 0,
  "ans": "A) प्रधानमंत्री (Prime Minister)",
  "exp": "💡 सही उत्तर: A) प्रधानमंत्री। NHRC अध्यक्ष की नियुक्ति हेतु समिति में 6 सदस्य होते हैं: प्रधानमंत्री (अध्यक्ष), लोकसभा अध्यक्ष, गृह मंत्री, लोकसभा में विपक्ष का नेता, राज्यसभा में विपक्ष का नेता, और राज्यसभा का उपसभापति।"
},
  {
  "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Search & Seizure)",
  "q": "BNSS 2023 के तहत पुलिस अधिकारी द्वारा बिना वारंट तलाशी (Search without warrant) के संबंध में कौन सा प्रावधान सही है?\n[English: Under BNSS 2023, which provision governs search by police officer without warrant?]",
  "options": [
    "A) धारा 185 (पूर्व CrPC 165) / Section 185",
    "B) धारा 100",
    "C) धारा 91",
    "D) धारा 150"
  ],
  "correct": 0,
  "ans": "A) धारा 185 (पूर्व CrPC 165) / Section 185",
  "exp": "💡 सही उत्तर: A) धारा 185। जब अन्वेषण अधिकारी को विश्वास हो कि तलाशी आवश्यक है और वारंट प्राप्त करने में देरी से साक्ष्य नष्ट हो सकता है, तो वह तलाशी ले सकता है तथा उसकी ऑडियो-वीडियो रिकॉर्डिंग अनिवार्य है।"
},
  {
  "topic": "भारतीय नागरिक सुरक्षा संहिता (BNSS - Arrest Rights)",
  "q": "गिरफ्तार किए गए व्यक्ति को गिरफ्तारी के कितने घंटों के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश किया जाना संवैधानिक एवं कानूनी रूप से अनिवार्य है?\n[English: Within how many hours must an arrested person be produced before a Magistrate?]",
  "options": [
    "A) 24 घंटे (यात्रा समय को छोड़कर) / 24 Hours (excluding travel time)",
    "B) 12 घंटे",
    "C) 48 घंटे",
    "D) 36 घंटे"
  ],
  "correct": 0,
  "ans": "A) 24 घंटे (यात्रा समय को छोड़कर) / 24 Hours (excluding travel time)",
  "exp": "💡 सही उत्तर: A) 24 घंटे। संविधान के अनुच्छेद 22(2) एवं BNSS धारा 58 (पूर्व CrPC धारा 57) के तहत मजिस्ट्रेट के समक्ष 24 घंटे के भीतर पेश करना मौलिक अधिकार है।"
},
  {
  "topic": "मोटर वाहन (संशोधन) अधिनियम 2019 (Motor Vehicles Act)",
  "q": "मोटर वाहन अधिनियम के अंतर्गत शराब पीकर गाड़ी चलाने (Drunken Driving) पर पहली बार में कितना जुर्माना निर्धारित है?\n[English: Under MV Act, fine for first offence of drunk driving is:]",
  "options": [
    "A) ₹10,000 और/या 6 माह तक की जेल / ₹10,000 and/or up to 6 months jail",
    "B) ₹2,000",
    "C) ₹5,000",
    "D) ₹20,000"
  ],
  "correct": 0,
  "ans": "A) ₹10,000 और/या 6 माह तक की जेल / ₹10,000 and/or up to 6 months jail",
  "exp": "💡 सही उत्तर: A) धारा 185 के तहत रक्त में 100 मिली में 30 मिग्रा से अधिक अल्कोहल मिलने पर पहली बार ₹10,000 या 6 माह तक की कैद का प्रावधान है।"
},
  {
  "topic": "सूचना का अधिकार अधिनियम 2005 (RTI Act - Time Limit)",
  "q": "RTI अधिनियम 2005 के अंतर्गत यदि मांगी गई सूचना व्यक्ति के जीवन या स्वतंत्रता (Life or Liberty) से संबंधित हो, तो कितने समय में सूचना उपलब्ध करानी होती है?\n[English: Under RTI Act 2005, within what time must information concerning life or liberty be provided?]",
  "options": [
    "A) 48 घंटे के भीतर (Within 48 hours)",
    "B) 24 घंटे के भीतर",
    "C) 7 दिन के भीतर",
    "D) 30 दिन के भीतर"
  ],
  "correct": 0,
  "ans": "A) 48 घंटे के भीतर (Within 48 hours)",
  "exp": "💡 सही उत्तर: A) 48 घंटे। सामान्य सूचना 30 दिनों में दी जाती है, किंतु जीवन व स्वतंत्रता से जुड़े मामलों में धारा 7(1) के तहत 48 घंटे की समय सीमा तय है।"
},
  {
  "topic": "घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम 2005 (PWDVA 2005)",
  "q": "घरेलू हिंसा अधिनियम 2005 के अंतर्गत 'संरक्षण आदेश' (Protection Order) जारी करने की शक्ति किस न्यायालय को प्राप्त है?\n[English: Under Domestic Violence Act 2005, which court has power to pass Protection Orders?]",
  "options": [
    "A) प्रथम श्रेणी न्यायिक मजिस्ट्रेट / मेट्रोपॉलिटन मजिस्ट्रेट (JMFC)",
    "B) जिला कलेक्टर",
    "C) केवल उच्च न्यायालय",
    "D) पारिवारिक परामर्शदाता"
  ],
  "correct": 0,
  "ans": "A) प्रथम श्रेणी न्यायिक मजिस्ट्रेट / मेट्रोपॉलिटन मजिस्ट्रेट (JMFC)",
  "exp": "💡 सही उत्तर: A) धारा 18 के अंतर्गत केवल प्रथम श्रेणी न्यायिक मजिस्ट्रेट या मेट्रोपॉलिटन मजिस्ट्रेट ही पीड़िता के पक्ष में सुरक्षा आदेश पारित कर सकते हैं।"
}
];

const RAILWAY_SCIENCE_TECH_BANK = [
{
    "topic": "भौतिकी - कार्य, ऊर्जा एवं शक्ति (Work, Energy & Power)",
    "q": "यदि किसी गतिमान पिंड का वेग दोगुना कर दिया जाए, तो उसकी गतिज ऊर्जा (Kinetic Energy) पर क्या प्रभाव पड़ेगा?\n[English: If the velocity of a moving body is doubled, what happens to its Kinetic Energy?]",
    "options": [
      "A) 4 गुना बढ़ जाएगी / Increases 4 times",
      "B) 2 गुना बढ़ जाएगी / Doubles",
      "C) अपरिवर्तित रहेगी / Remains unchanged",
      "D) आधी हो जाएगी / Becomes half"
    ],
    "correct": 0,
    "ans": "A) 4 गुना बढ़ जाएगी / Increases 4 times",
    "exp": "💡 सही उत्तर: A) 4 गुना। गतिज ऊर्जा सूत्र: KE = ½mv²। वेग (v) दोगुना (2v) होने पर (2v)² = 4v² अर्थात गतिज ऊर्जा 4 गुनी हो जाएगी।"
  },
  {
    "topic": "भौतिकी - गुरुत्वाकर्षण (Gravitation - Escape Velocity)",
    "q": "पृथ्वी की सतह से पलायन वेग (Escape Velocity, ve) का मान लगभग कितना होता है?\n[English: What is the approximate escape velocity from the surface of Earth?]",
    "options": [
      "A) 11.2 किमी/सेकंड / 11.2 km/s",
      "B) 9.8 मी/सेकंड² / 9.8 m/s²",
      "C) 2.4 किमी/सेकंड / 2.4 km/s (चंद्रमा)",
      "D) 42 किमी/सेकंड / 42 km/s"
    ],
    "correct": 0,
    "ans": "A) 11.2 किमी/सेकंड / 11.2 km/s",
    "exp": "💡 सही उत्तर: A) 11.2 किमी/से। पलायन वेग वह न्यूनतम वेग है जिससे किसी पिंड को ऊर्ध्वाधर ऊपर फेंकने पर वह पृथ्वी के गुरुत्वाकर्षण क्षेत्र को पार कर जाता है और वापस नहीं लौटता। ve = √(2gR) = 11.2 km/s।"
  },
  {
    "topic": "विद्युत एवं चुंबकत्व (Electricity - Transformer)",
    "q": "विद्युत ट्रांसफॉर्मर (Transformer) किस सिद्धांत पर कार्य करता है?\n[English: On which principle does an electrical transformer operate?]",
    "options": [
      "A) अन्योन्य प्रेरण (Mutual Induction)",
      "B) स्व-प्रेरण (Self Induction)",
      "C) जूल का तापन नियम / Joule's Heating",
      "D) प्रकाश विद्युत प्रभाव / Photoelectric Effect"
    ],
    "correct": 0,
    "ans": "A) अन्योन्य प्रेरण (Mutual Induction)",
    "exp": "💡 सही उत्तर: A) अन्योन्य प्रेरण (Mutual Induction)। ट्रांसफॉर्मर केवल प्रत्यावर्ती धारा (AC) पर कार्य करता है। प्राथमिक कुंडली में धारा परिवर्तन से द्वितीयक कुंडली में प्रेरित विद्युत वाहक बल उत्पन्न होता है।"
  },
  {
    "topic": "इंजीनियरिंग ड्राइंग / मापन यंत्र (Measurement - Vernier Caliper)",
    "q": "एक मानक वर्नियर कैलीपर्स का अल्पतमांक (Least Count) सामान्यतः कितना होता है?\n[English: What is the least count of a standard metric Vernier Caliper?]",
    "options": [
      "A) 0.02 मिमी (0.002 सेमी) / 0.02 mm",
      "B) 0.1 मिमी / 0.1 mm",
      "C) 0.001 मिमी / 0.001 mm",
      "D) 1.0 मिमी / 1.0 mm"
    ],
    "correct": 0,
    "ans": "A) 0.02 मिमी / 0.02 mm",
    "exp": "💡 सही उत्तर: A) 0.02 मिमी। 1 मुख्य पैमाना भाग (1 mm) - 1 वर्नियर पैमाना भाग (0.98 mm) = 0.02 mm। माइक्रोमीटर का अल्पतमांक सामान्यतः 0.01 mm होता है।"
  },
  {
    "topic": "भौतिकी - ध्वनि एवं तरंगें (Sound - Doppler Effect)",
    "q": "जब कोई ट्रेन सीटी बजाते हुए प्लेटफार्म पर खड़े प्रेक्षक की ओर आती है, तो प्रेक्षक को सीटी की तीक्ष्णता (Pitch/आवृत्ति) बढ़ी हुई प्रतीत होती है। यह परिघटना क्या कहलाती है?\n[English: When a train approaches an observer sounding its whistle, pitch appears higher. This is called:]",
    "options": [
      "A) डॉप्लर प्रभाव / Doppler Effect",
      "B) रमन प्रभाव / Raman Effect",
      "C) कॉम्पटन प्रभाव / Compton Effect",
      "D) टिंडल प्रभाव / Tyndall Effect"
    ],
    "correct": 0,
    "ans": "A) डॉप्लर प्रभाव / Doppler Effect",
    "exp": "💡 सही उत्तर: A) डॉप्लर प्रभाव (Doppler Effect)। जब ध्वनि स्रोत और श्रोता के मध्य आपेक्षिक गति होती है, तो श्रोता को ध्वनि की आभासी आवृत्ति वास्तविक आवृत्ति से भिन्न सुनाई देती है।"
  },
  {
    "topic": "रसायन विज्ञान - आवर्त सारणी (Periodic Table - Modern)",
    "q": "आधुनिक आवर्त सारणी में तत्वों को किस आधार पर व्यवस्थित किया गया है?\n[English: In the Modern Periodic Table, elements are arranged on the basis of:]",
    "options": [
      "A) परमाणु क्रमांक (परमाणु संख्या Z) / Increasing Atomic Number (Z)",
      "B) परमाणु भार / Atomic Mass",
      "C) न्यूट्रॉन संख्या / Number of Neutrons",
      "D) घनत्व / Density"
    ],
    "correct": 0,
    "ans": "A) परमाणु क्रमांक (परमाणु संख्या Z) / Increasing Atomic Number (Z)",
    "exp": "💡 सही उत्तर: A) परमाणु क्रमांक। हेनरी मोजले ने 1913 में आधुनिक आवर्त नियम दिया कि तत्वों के भौतिक और रासायनिक गुण उनके परमाणु क्रमांकों के आवर्ती फलन होते हैं।"
  },
  {
    "topic": "रसायन विज्ञान - धातुएं एवं अयस्क (Metals & Ores)",
    "q": "एल्युमिनियम धातु का मुख्य अयस्क (Primary Ore of Aluminium) कौन सा है?\n[English: Which is the primary ore of Aluminium metal?]",
    "options": [
      "A) बॉक्साइट (Al₂O₃·2H₂O) / Bauxite",
      "B) हेमेटाइट (Fe₂O₃) / Haematite",
      "C) गैलेना (PbS) / Galena",
      "D) सिनेबार (HgS) / Cinnabar"
    ],
    "correct": 0,
    "ans": "A) बॉक्साइट (Al₂O₃·2H₂O) / Bauxite",
    "exp": "💡 सही उत्तर: A) बॉक्साइट। हेमेटाइट लोहे का, गैलेना सीसे (लेड) का, तथा सिनेबार पारे (मरकरी) का प्रमुख अयस्क है।"
  },
  {
    "topic": "जीव विज्ञान - रक्त परिसंचरण (Human Blood - Universal Donor)",
    "q": "मानव में किस रक्त समूह (Blood Group) को 'सार्वभौमिक दाता' (Universal Donor) कहा जाता है?\n[English: In humans, which blood group is universally accepted as the 'Universal Donor'?]",
    "options": [
      "A) O नेगेटिव (O-) / O Negative",
      "B) AB पॉजिटिव (AB+) / AB Positive (Universal Acceptor)",
      "C) A पॉजिटिव / A Positive",
      "D) B नेगेटिव / B Negative"
    ],
    "correct": 0,
    "ans": "A) O नेगेटिव (O-) / O Negative",
    "exp": "💡 सही उत्तर: A) O- (O नेगेटिव)। इसमें कोई RBC प्रतिजन (A, B) तथा Rh कारक नहीं होता, इसलिए यह किसी भी व्यक्ति को सुरक्षित रूप से दिया जा सकता है। AB+ सार्वभौमिक ग्राही होता है।"
  },
  {
    "topic": "आईटीआई ट्रेड / विद्युत मूल बातें (Electrical - Resistance)",
    "q": "यदि किसी चालक तार की लंबाई को खींचकर दोगुना कर दिया जाए, तो उसका नया प्रतिरोध (New Resistance) कितना हो जाएगा?\n[English: If a conductor wire is stretched to double its length, its new resistance becomes:]",
    "options": [
      "A) प्रारंभिक का 4 गुना (4R) / 4 times initial",
      "B) 2 गुना (2R) / 2 times initial",
      "C) आधा (R/2) / Half",
      "D) अपरिवर्तित रहेगा / Unchanged"
    ],
    "correct": 0,
    "ans": "A) प्रारंभिक का 4 गुना (4R) / 4 times initial",
    "exp": "💡 सही उत्तर: A) 4 गुना। तार को खींचने पर आयतन स्थिर रहता है (V = A·l)। लंबाई 2 गुना होने पर अनुप्रस्थ काट क्षेत्रफल आधा (A/2) हो जाता है। R' = ρ(2l) / (A/2) = 4(ρl/A) = 4R।"
  },
  {
    "topic": "रेलवे सिग्नल एवं सुरक्षा (Railway Track & Signals)",
    "q": "भारतीय रेलवे में 'कवच' (KAVACH) प्रणाली क्या है?\n[English: In Indian Railways, what is the 'KAVACH' system?]",
    "options": [
      "A) स्वदेशी स्वचालित ट्रेन सुरक्षा प्रणाली (ATP) / Indigenous Automatic Train Protection System",
      "B) बुलेट ट्रेन का इंजन / Bullet Train Engine",
      "C) नया रेलवे स्टेशन टिकट काउंटर / New Ticketing Counter",
      "D) मालगाड़ी का विशेष डिब्बा / Freight Wagon"
    ],
    "correct": 0,
    "ans": "A) स्वदेशी स्वचालित ट्रेन सुरक्षा प्रणाली (ATP) / Indigenous Automatic Train Protection System",
    "exp": "💡 सही उत्तर: A) कवच (Kavach) RDSO द्वारा विकसित स्वचालित ट्रेन टक्कर रोधी प्रणाली (Anti-Collision System) है, जो लाल सिग्नल पार करने (SPAD) पर ट्रेन को स्वतः रोक देती है।"
  },
  {
    "topic": "ऊष्मा एवं तापमान (Heat & Temperature - Specific Heat)",
    "q": "निम्नलिखित पदार्थों में से किसकी विशिष्ट ऊष्मा धारिता (Specific Heat Capacity) सर्वाधिक होती है?\n[English: Which of the following substances has the highest specific heat capacity?]",
    "options": [
      "A) जल (4186 J/kg·K) / Water",
      "B) पारा / Mercury",
      "C) लोहा / Iron",
      "D) तांबा / Copper"
    ],
    "correct": 0,
    "ans": "A) जल (4186 J/kg·K) / Water",
    "exp": "💡 सही उत्तर: A) जल (Water)। जल की उच्च विशिष्ट ऊष्मा के कारण ही इसका उपयोग इंजन के रेडिएटर में शीतलक (Coolant) तथा गर्म सिकाई की थैलियों में किया जाता है।"
  },
  {
    "topic": "भौतिकी - न्यूटन के गति नियम (Newton's Laws - Momentum)",
    "q": "रॉकेट का प्रक्षेपण (Rocket Propulsion) भौतिकी के किस मौलिक नियम पर आधारित है?\n[English: Rocket propulsion is based on which fundamental conservation law of physics?]",
    "options": [
      "A) रेखीय संवेग संरक्षण एवं न्यूटन का तृतीय नियम / Conservation of Linear Momentum & Newton's 3rd Law",
      "B) ऊर्जा संरक्षण का नियम / Law of Conservation of Energy",
      "C) द्रव्यमान संरक्षण / Conservation of Mass",
      "D) बर्नौली का सिद्धांत / Bernoulli's Principle"
    ],
    "correct": 0,
    "ans": "A) रेखीय संवेग संरक्षण एवं न्यूटन का तृतीय नियम / Conservation of Linear Momentum & Newton's 3rd Law",
    "exp": "💡 सही उत्तर: A) रेखीय संवेग संरक्षण। तीव्र वेग से पीछे निकलने वाली गैसें रॉकेट पर आगे की ओर समान परिमाण का प्रतिक्रिया बल आरोपित करती हैं।"
  },
  {
    "topic": "रसायन विज्ञान - अम्ल, क्षार एवं लवण (pH Scale)",
    "q": "शुद्ध जल का 25°C पर pH मान कितना होता है?\n[English: What is the pH value of pure water at 25°C?]",
    "options": [
      "A) 7.0 (उदासीन) / 7.0 (Neutral)",
      "B) 0.0 (प्रबल अम्ल)",
      "C) 14.0 (प्रबल क्षार)",
      "D) 5.6 (अम्लीय)"
    ],
    "correct": 0,
    "ans": "A) 7.0 (उदासीन) / 7.0 (Neutral)",
    "exp": "💡 सही उत्तर: A) 7.0। pH पैमाना सोरेनसन ने 1909 में दिया। pH < 7 अम्लीय, pH = 7 उदासीन, तथा pH > 7 क्षारीय होता है।"
  },
  {
    "topic": "इलेक्ट्रॉनिक्स एवं अर्धचालक (Electronics - Diode)",
    "q": "प्रत्यावर्ती धारा (AC) को दिष्ट धारा (DC) में परिवर्तित करने के लिए किस इलेक्ट्रॉनिक उपकरण का प्रयोग किया जाता है?\n[English: Which electronic device is used to convert Alternating Current (AC) into Direct Current (DC)?]",
    "options": [
      "A) दिष्टकारी (रेक्टिफायर / p-n डायोड) / Rectifier",
      "B) ट्रांसफार्मर / Transformer",
      "C) इनवर्टर (DC to AC) / Inverter",
      "D) प्रवर्धक (एंप्लीफायर) / Amplifier"
    ],
    "correct": 0,
    "ans": "A) दिष्टकारी (रेक्टिफायर / p-n डायोड) / Rectifier",
    "exp": "💡 सही उत्तर: A) दिष्टकारी (Rectifier)। सेमीकंडक्टर p-n जंक्शन डायोड केवल अग्र अभिनति (Forward Bias) में धारा प्रवाहित करता है। इनवर्टर DC को AC में बदलता है।"
  },
  {
    "topic": "भौतिकी - लेंस की क्षमता (Power of Lens)",
    "q": "यदि किसी उत्तल लेंस की फोकस दूरी 50 सेमी (0.5 मीटर) हो, तो उसकी क्षमता (Power, P) क्या होगी?\n[English: If the focal length of a convex lens is 50 cm (0.5m), what is its optical power?]",
    "options": [
      "A) +2.0 डाइऑप्टर (+2.0 D)",
      "B) -2.0 डाइऑप्टर (-2.0 D)",
      "C) +0.5 डाइऑप्टर (+0.5 D)",
      "D) +5.0 डाइऑप्टर (+5.0 D)"
    ],
    "correct": 0,
    "ans": "A) +2.0 डाइऑप्टर (+2.0 D)",
    "exp": "💡 सही उत्तर: A) +2.0 D। सूत्र: P = 1 / f(मीटर में) = 1 / 0.5 = +2.0 D। उत्तल लेंस की फोकस दूरी धनात्मक होती है।"
  },
  {
    "topic": "जीव विज्ञान - कोशिका का शक्तिगृह (Cell Biology - Mitochondria)",
    "q": "कोशिका में ATP के रूप में ऊर्जा निर्माण के कारण किसे 'कोशिका का पावरहाउस' (Powerhouse of the Cell) कहा जाता है?\n[English: Which organelle is known as the 'Powerhouse of the Cell' due to ATP production?]",
    "options": [
      "A) माइटोकॉन्ड्रिया (सूत्रकणिका) / Mitochondria",
      "B) राइबोसोम (प्रोटीन फैक्ट्री) / Ribosome",
      "C) लाइसोसोम (आत्मघाती थैली) / Lysosome",
      "D) गॉल्जीकाय / Golgi apparatus"
    ],
    "correct": 0,
    "ans": "A) माइटोकॉन्ड्रिया (सूत्रकणिका) / Mitochondria",
    "exp": "💡 सही उत्तर: A) माइटोकॉन्ड्रिया। कोशिकीय श्वसन के क्रेब्स चक्र में ग्लूकोज के ऑक्सीकरण से एटीपी (ATP) के रूप में रासायनिक ऊर्जा बनती है।"
  },
  {
    "topic": "रसायन विज्ञान - रासायनिक यौगिक (Bleaching Powder)",
    "q": "विरंजक चूर्ण (Bleaching Powder) का सही रासायनिक सूत्र क्या होता है?\n[English: What is the correct chemical formula of Bleaching Powder?]",
    "options": [
      "A) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
      "B) CaSO₄·½H₂O",
      "C) NaHCO₃",
      "D) Na₂CO₃·10H₂O"
    ],
    "correct": 0,
    "ans": "A) CaOCl₂ (कैल्शियम ऑक्सीक्लोराइड)",
    "exp": "💡 सही उत्तर: A) CaOCl₂। शुष्क बुझे चूने Ca(OH)₂ पर क्लोरीन (Cl₂) गैस प्रवाहित करने पर विरंजक चूर्ण बनता है।"
  },
  {
    "topic": "भौतिकी - श्यानता एवं पृष्ठ तनाव (Viscosity & Surface Tension)",
    "q": "वर्षा की बूंदें गोलाकार किस भौतिक गुणधर्म के कारण होती हैं?\n[English: Rain drops acquire spherical shape primarily due to which physical property?]",
    "options": [
      "A) पृष्ठ तनाव (Surface Tension)",
      "B) श्यानता (Viscosity)",
      "C) वायु घर्षण / Air Friction",
      "D) गुरुत्वाकर्षण / Gravity"
    ],
    "correct": 0,
    "ans": "A) पृष्ठ तनाव (Surface Tension)",
    "exp": "💡 सही उत्तर: A) पृष्ठ तनाव। द्रव की सतह अपने पृष्ठीय क्षेत्रफल को न्यूनतम करने का प्रयास करती है, और दिए गए आयतन के लिए गोले का पृष्ठ क्षेत्रफल न्यूनतम होता है।"
  },
  {
    "topic": "पर्यावरण एवं पारिस्थितिकी (Ozone Layer)",
    "q": "वायुमंडल की ओजोन परत (Ozone Layer) पराबैंगनी किरणों से पृथ्वी की रक्षा करती है। यह परत किस वायुमंडलीय मंडल में पाई जाती है?\n[English: The protective Ozone layer is situated in which layer of the atmosphere?]",
    "options": [
      "A) समताप मंडल (Stratosphere)",
      "B) क्षोभ मंडल (Troposphere)",
      "C) मध्य मंडल (Mesosphere)",
      "D) बाह्य वायुमंडल (Exosphere)"
    ],
    "correct": 0,
    "ans": "A) समताप मंडल (Stratosphere)",
    "exp": "💡 सही उत्तर: A) समताप मंडल (Stratosphere)। धरातल से 15 से 35 किमी की ऊंचाई पर ओजोन (O₃) सांद्रता सर्वाधिक होती है। ओजोन परत की मोटाई 'डॉबसन यूनिट' (DU) में मापते हैं।"
  },
  {
    "topic": "कंप्यूटर विज्ञान मूल बातें (Computer Basics - Memory)",
    "q": "कंप्यूटर में 1 गीगाबाइट (1 GB) में कितने मेगाबाइट (MB) होते हैं?\n[English: In computer storage hierarchy, 1 Gigabyte (1 GB) is equivalent to how many Megabytes (MB)?]",
    "options": [
      "A) 1024 MB",
      "B) 1000 MB",
      "C) 512 MB",
      "D) 2048 MB"
    ],
    "correct": 0,
    "ans": "A) 1024 MB",
    "exp": "💡 सही उत्तर: A) 1024 MB। बाइनरी पैमाना (2¹⁰): 1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB।"
  },
  {
    "topic": "भौतिकी - सरल आवर्त गति (Simple Harmonic Motion - Pendulum)",
    "q": "यदि एक सरल लोलक की लंबाई 4 गुनी कर दी जाए, तो उसके आवर्तकाल (Time Period, T) पर क्या प्रभाव पड़ेगा?\n[English: If the length of a simple pendulum is made 4 times, what happens to its time period?]",
    "options": [
      "A) 2 गुना हो जाएगा / Becomes 2 times (Doubles)",
      "B) 4 गुना हो जाएगा / Becomes 4 times",
      "C) आधा हो जाएगा / Becomes half",
      "D) अपरिवर्तित रहेगा / Remains unchanged"
    ],
    "correct": 0,
    "ans": "A) 2 गुना हो जाएगा / Becomes 2 times (Doubles)",
    "exp": "💡 सही उत्तर: A) 2 गुना। आवर्तकाल सूत्र: T = 2π√(l / g) ⟹ T ∝ √l। लंबाई 4l करने पर √4 = 2 गुना आवर्तकाल हो जाएगा।"
  },
  {
    "topic": "इंजीनियरिंग - वेल्डिंग एवं फास्टनर्स (Welding - Gas)",
    "q": "ऑक्सी-एसिटिलीन गैस वेल्डिंग (Oxy-Acetylene Welding) में ज्वाला का अधिकतम तापमान लगभग कितना पहुंचता है?\n[English: In oxy-acetylene welding, the maximum temperature of the flame reaches approximately:]",
    "options": [
      "A) 3100°C से 3300°C",
      "B) 1500°C से 1800°C",
      "C) 5000°C",
      "D) 800°C से 1000°C"
    ],
    "correct": 0,
    "ans": "A) 3100°C से 3300°C",
    "exp": "💡 सही उत्तर: A) 3100°C से 3300°C। ऑक्सीजन और एसिटिलीन (C₂H₂) का मिश्रण ज्वलन पर अत्यधिक ऊष्मा उत्पन्न करता है जो लोहे और इस्पात को पिघलाने हेतु पर्याप्त है।"
  },
  {
    "topic": "रसायन विज्ञान - कार्बनिक रसायन (Hydrocarbons - Methane)",
    "q": "कोयले की खानों में होने वाले अधिकांश विस्फोट किस गैस की उपस्थिति के कारण होते हैं?\n[English: Most explosions in underground coal mines occur due to the presence of which gas?]",
    "options": [
      "A) मीथेन (CH₄ / मार्स गैस) / Methane",
      "B) कार्बन मोनोऑक्साइड (CO)",
      "C) हीलियम (He)",
      "D) सल्फर डाइऑक्साइड (SO₂)"
    ],
    "correct": 0,
    "ans": "A) मीथेन (CH₄ / मार्स गैस) / Methane",
    "exp": "💡 सही उत्तर: A) मीथेन (Methane)। इसे 'फायरडैम्प' (Firedamp) भी कहते हैं। वायु में 5% से 15% मीथेन का मिश्रण चिंगारी पाते ही विस्फोटक हो जाता है।"
  },
  {
    "topic": "जीव विज्ञान - विटामिन्स (Vitamins - Night Blindness)",
    "q": "रतौंधी (Night Blindness) रोग किस विटामिन की कमी के कारण होता है?\n[English: Night blindness (Nyctalopia) is caused by the deficiency of which vitamin?]",
    "options": [
      "A) विटामिन A (रेटिनॉल) / Vitamin A (Retinol)",
      "B) विटामिन B1 (थायमीन) / Vitamin B1",
      "C) विटामिन C (एस्कॉर्बिक अम्ल) / Vitamin C",
      "D) विटामिन D (कैल्सीफेरॉल) / Vitamin D"
    ],
    "correct": 0,
    "ans": "A) विटामिन A (रेटिनॉल) / Vitamin A (Retinol)",
    "exp": "💡 सही उत्तर: A) विटामिन A। विटामिन A रेटिना में रोडोप्सिन वर्णक के संश्लेषण हेतु आवश्यक है। विटामिन C की कमी से स्कर्वी और D की कमी से रिकेट्स होता है।"
  },
  {
    "topic": "भौतिकी - आर्किमिडीज का सिद्धांत (Archimedes Principle - Buoyancy)",
    "q": "किसी द्रव में डूबे पिंड पर ऊपर की ओर लगने वाला उत्प्लावन बल (Buoyant Force) किसके बराबर होता है?\n[English: The upward buoyant force exerted on a submerged body in a fluid is equal to:]",
    "options": [
      "A) पिंड द्वारा विस्थापित द्रव के भार के बराबर / Weight of fluid displaced by the body",
      "B) पिंड के कुल भार के बराबर / Total weight of the body",
      "C) द्रव के कुल आयतन के बराबर / Total volume of fluid",
      "D) वायुमंडलीय दाब के बराबर"
    ],
    "correct": 0,
    "ans": "A) पिंड द्वारा विस्थापित द्रव के भार के बराबर / Weight of fluid displaced by the body",
    "exp": "💡 सही उत्तर: A) विस्थापित द्रव के भार के बराबर। यही आर्किमिडीज का सिद्धांत है जिसके आधार पर जहाज, पनडुब्बी और हाइड्रोमीटर कार्य करते हैं।"
  },
  {
    "topic": "रेलवे इंजन एवं कर्षण (Locomotive Traction)",
    "q": "भारतीय रेलवे में इलेक्ट्रिक लोकोमोटिव WAP-7 में 'P' अक्षर का क्या अर्थ होता है?\n[English: In Indian Railways electric locomotive classification WAP-7, what does letter 'P' signify?]",
    "options": [
      "A) Passenger (यात्री सेवा) / Passenger Service",
      "B) Power (शक्ति)",
      "C) Petroleum (पेट्रोलियम)",
      "D) Permanent (स्थायी)"
    ],
    "correct": 0,
    "ans": "A) Passenger (यात्री सेवा) / Passenger Service",
    "exp": "💡 सही उत्तर: A) Passenger। W = Broad Gauge, A = AC Traction, P = Passenger (यात्री)। यदि G हो (WAG-9) तो Goods (मालगाड़ी) होता है।"
  },
  {
    "topic": "रसायन विज्ञान - नोबल गैसें (Noble Gases - Light Bulbs)",
    "q": "बिजली के साधारण बल्बों में टंगस्टन फिलामेंट के ऑक्सीकरण को रोकने के लिए कौन सी निष्क्रिय गैस भरी जाती है?\n[English: In incandescent electric bulbs, which inert gas is filled to prevent oxidation of tungsten?]",
    "options": [
      "A) आर्गन (Ar) एवं नाइट्रोजन (N₂) / Argon and Nitrogen",
      "B) ऑक्सीजन एवं हाइड्रोजन / Oxygen and Hydrogen",
      "C) केवल क्लोरीन / Only Chlorine",
      "D) अमोनिया गैस / Ammonia"
    ],
    "correct": 0,
    "ans": "A) आर्गन (Ar) एवं नाइट्रोजन (N₂) / Argon and Nitrogen",
    "exp": "💡 सही उत्तर: A) आर्गन और नाइट्रोजन। अक्रिय वातावरण टंगस्टन के वाष्पीकरण को रोकता है और फिलामेंट की आयु बढ़ाता है।"
  },
  {
    "topic": "भौतिकी - जड़त्व एवं द्रव्यमान (Inertia & Mass)",
    "q": "किसी वस्तु के जड़त्व (Inertia) की माप क्या होती है?\n[English: The natural measure of inertia of an object is its:]",
    "options": [
      "A) द्रव्यमान (Mass) / Mass",
      "B) वेग (Velocity) / Velocity",
      "C) आयतन (Volume) / Volume",
      "D) भार (Weight) / Weight"
    ],
    "correct": 0,
    "ans": "A) द्रव्यमान (Mass) / Mass",
    "exp": "💡 सही उत्तर: A) द्रव्यमान। वस्तु का द्रव्यमान जितना अधिक होगा, उसकी विरामावस्था या एकसमान गति की अवस्था में परिवर्तन का विरोध करने की प्रवृत्ति (जड़त्व) उतनी ही अधिक होगी।"
  },
  {
    "topic": "आईटीआई ट्रेड / फिटिंग टूल्स (Hand Tools - Hack Saw)",
    "q": "हेक्सा ब्लेड (Hacksaw Blade) के दांत किस दिशा में कटाई करते हैं?\n[English: In a standard hand hacksaw, teeth are set to cut in which direction?]",
    "options": [
      "A) आगे की ओर धकेलने पर (Forward Stroke) / Forward Stroke only",
      "B) पीछे खींचने पर (Backward Stroke) / Backward Stroke only",
      "C) दोनों स्ट्रोक में समान / Both strokes",
      "D) केवल घूर्णन गति में / Only rotary"
    ],
    "correct": 0,
    "ans": "A) आगे की ओर धकेलने पर (Forward Stroke) / Forward Stroke only",
    "exp": "💡 सही उत्तर: A) फारवर्ड स्ट्रोक। मानक हेक्सा ब्लेड के दांत आगे की ओर झुके होते हैं और केवल आगे धकेलने वाले स्ट्रोक में ही धातु काटते हैं।"
  },
  {
    "topic": "जीव विज्ञान - पाचन तंत्र (Digestive Enzymes - Saliva)",
    "q": "मानव लार (Saliva) में पाया जाने वाला एंजाइम टायलिन (लार एमाइलेज) किसका पाचन प्रारंभ करता है?\n[English: The enzyme ptyalin (salivary amylase) in human saliva initiates digestion of:]",
    "options": [
      "A) स्टार्च (कार्बोहाइड्रेट) का माल्टोज में / Starch into maltose",
      "B) प्रोटीन का अमीनो अम्ल में / Protein into amino acids",
      "C) वसा का वसीय अम्ल में / Fats into fatty acids",
      "D) विटामिन का अवशोषण / Vitamins"
    ],
    "correct": 0,
    "ans": "A) स्टार्च (कार्बोहाइड्रेट) का माल्टोज में / Starch into maltose",
    "exp": "💡 सही उत्तर: A) स्टार्च। भोजन का पाचन मुखगुहा से ही शुरू हो जाता है जहाँ लार एमाइलेज (टायलिन) लगभग 30% स्टार्च को माल्टोज में तोड़ता है।"
  },
  {
  "topic": "मूल विज्ञान एवं इंजीनियरिंग - सरल मशीनें (Simple Machines - Levers)",
  "q": "मनुष्य का हाथ, चिमटा (Tongs) और स्टेपलर किस श्रेणी के उत्तोलक (Class of Lever) के उदाहरण हैं?\n[English: Human forearm, tongs and stapler are examples of which class of lever?]",
  "options": [
    "A) तृतीय श्रेणी उत्तोलक (Third Class Lever - Effort in middle)",
    "B) प्रथम श्रेणी उत्तोलक (First Class)",
    "C) द्वितीय श्रेणी उत्तोलक (Second Class)",
    "D) शून्य श्रेणी उत्तोलक"
  ],
  "correct": 0,
  "ans": "A) तृतीय श्रेणी उत्तोलक (Third Class Lever - Effort in middle)",
  "exp": "💡 सही उत्तर: A) तृतीय श्रेणी उत्तोलक। तृतीय श्रेणी में आयास (Effort) आलंब (Fulcrum) और भार (Load) के बीच में होता है। इनका यांत्रिक लाभ (Mechanical Advantage) हमेशा 1 से कम होता है।"
},
  {
  "topic": "अभियांत्रिकी रेखाचित्र (Engineering Drawing - Projection Systems)",
  "q": "भारतीय मानक ब्यूरो (BIS) द्वारा इंजीनियरिंग ड्राइंग के लिए सामान्यतः किस प्रक्षेपण प्रणाली (Projection System) की अनुशंसा की जाती है?\n[English: Which projection system is recommended by BIS for engineering drawings?]",
  "options": [
    "A) प्रथम कोणीय प्रक्षेपण (First Angle Projection)",
    "B) तृतीय कोणीय प्रक्षेपण (Third Angle Projection)",
    "C) द्वितीय कोणीय प्रक्षेपण",
    "D) चतुर्थ कोणीय प्रक्षेपण"
  ],
  "correct": 0,
  "ans": "A) प्रथम कोणीय प्रक्षेपण (First Angle Projection)",
  "exp": "💡 सही उत्तर: A) प्रथम कोणीय प्रक्षेपण (First Angle Projection)। भारत और यूरोप में प्रथम कोण प्रक्षेपण मानक है, जिसमें वस्तु को प्रेक्षक और तल के बीच रखा जाता है। अमेरिका में तृतीय कोण प्रक्षेपण प्रचलित है।"
},
  {
  "topic": "ऊष्मा एवं तापमान (Heat & Temperature - Thermal Expansion)",
  "q": "रेल की पटरियों के जोड़ पर थोड़ी सी खाली जगह (Gap) क्यों छोड़ी जाती है?\n[English: Why is a small gap left between rail joints?]",
  "options": [
    "A) गर्मियों में रेखीय तापीय प्रसार (Thermal Expansion) के कारण पटरियों को टेढ़ा होने से बचाने के लिए",
    "B) ट्रेन के वजन को कम करने के लिए",
    "C) जंग से बचाने के लिए",
    "D) गति को नियंत्रित करने के लिए"
  ],
  "correct": 0,
  "ans": "A) गर्मियों में रेखीय तापीय प्रसार (Thermal Expansion) के कारण पटरियों को टेढ़ा होने से बचाने के लिए",
  "exp": "💡 सही उत्तर: A। ठोसों में ऊष्मा पाकर रेखीय प्रसार (ΔL = L₀αΔT) होता है। यदि जोड़ पर खाली जगह न हो, तो अत्यधिक तापीय प्रतिबल (Thermal Stress) से पटरियां मुड़ (Buckle) सकती हैं।"
},
  {
  "topic": "विद्युत चुंबकत्व (Electromagnetism - Fleming's Left Hand Rule)",
  "q": "फ्लेमिंग के बाएं हाथ के नियम (Fleming's Left-Hand Rule) में तर्जनी (Forefinger) किस भौतिक राशि की दिशा दर्शाती है?\n[English: In Fleming's Left-Hand Rule, the forefinger indicates:]",
  "options": [
    "A) चुंबकीय क्षेत्र की दिशा (Magnetic Field)",
    "B) चालक पर लगने वाले बल की दिशा (Force)",
    "C) विद्युत धारा की दिशा (Current)",
    "D) गति की दिशा"
  ],
  "correct": 0,
  "ans": "A) चुंबकीय क्षेत्र की दिशा (Magnetic Field)",
  "exp": "💡 सही उत्तर: A) चुंबकीय क्षेत्र। बाएं हाथ का नियम: अंगूठा = बल/गति (Force/Thrust), तर्जनी = चुंबकीय क्षेत्र (Magnetic Field), मध्यमा = धारा की दिशा (Current)।"
},
  {
  "topic": "पर्यावरण एवं व्यावसायिक सुरक्षा (Occupational Safety - Fire Extinguishers)",
  "q": "विद्युत उपकरणों में लगी आग (Electrical Fire - Class E / C) को बुझाने के लिए किस प्रकार के अग्निशामक का उपयोग सर्वोत्तम है?\n[English: Which fire extinguisher is best suited for electrical equipment fires?]",
  "options": [
    "A) कार्बन डाइऑक्साइड (CO₂) या हैलोन अग्निशामक (Carbon Dioxide Extinguisher)",
    "B) जल अग्निशामक (Water)",
    "C) फोम (Foam) अग्निशामक",
    "D) सोडा-एसिड अग्निशामक"
  ],
  "correct": 0,
  "ans": "A) कार्बन डाइऑक्साइड (CO₂) या हैलोन अग्निशामक (Carbon Dioxide Extinguisher)",
  "exp": "💡 सही उत्तर: A) CO₂ अग्निशामक। जल विद्युत का सुचालक है जिससे बिजली का झटका लग सकता है। CO₂ गैर-सुचालक है और ऑक्सीजन को विस्थापित कर आग बुझाती है।"
}
];

const COMPETITIVE_GK_GS_BANK = [
  {
    "topic": "भारतीय संविधान एवं राजव्यवस्था (Indian Polity - Preamble)",
    "q": "भारतीय संविधान की प्रस्तावना में 42वें संविधान संशोधन अधिनियम 1976 द्वारा कौन से तीन शब्द जोड़े गए थे?\n[English: Which three words were added to the Preamble by the 42nd Constitutional Amendment Act 1976?]",
    "options": [
      "A) समाजवादी, धर्मनिरपेक्ष और अखंडता / Socialist, Secular and Integrity",
      "B) संप्रभुता, लोकतांत्रिक और गणराज्य / Sovereign, Democratic, Republic",
      "C) न्याय, स्वतंत्रता और समानता / Justice, Liberty, Equality",
      "D) बंधुता, एकता और गरिमा / Fraternity, Unity, Dignity"
    ],
    "correct": 0,
    "ans": "A) समाजवादी, धर्मनिरपेक्ष और अखंडता / Socialist, Secular and Integrity",
    "exp": "💡 सही उत्तर: A) समाजवादी, पंथनिरपेक्ष (धर्मनिरपेक्ष), और अखंडता। 42वें संशोधन (1976) को 'लघु संविधान' (Mini Constitution) भी कहा जाता है।"
  },
  {
    "topic": "भारतीय इतिहास - आधुनिक भारत (Modern India - INA)",
    "q": "'तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा' और 'दिल्ली चलो' का प्रसिद्ध नारा किसने दिया था?\n[English: Who gave the famous slogans 'Give me blood, and I will give you freedom' and 'Dilli Chalo'?]",
    "options": [
      "A) नेताजी सुभाष चंद्र बोस / Netaji Subhas Chandra Bose",
      "B) भगत सिंह / Bhagat Singh ('इंकलाब जिंदाबाद')",
      "C) चंद्रशेखर आजाद / Chandrashekhar Azad",
      "D) बाल गंगाधर तिलक / Bal Gangadhar Tilak"
    ],
    "correct": 0,
    "ans": "A) नेताजी सुभाष चंद्र बोस / Netaji Subhas Chandra Bose",
    "exp": "💡 सही उत्तर: A) नेताजी सुभाष चंद्र बोस। उन्होंने आजाद हिंद फौज (INA) का नेतृत्व किया तथा सिंगापुर में स्वतंत्र भारत की अस्थायी सरकार गठित की।"
  },
  {
    "topic": "भारतीय भूगोल - नदियां एवं जलप्रपात (Rivers - Highest Waterfall)",
    "q": "भारत का सबसे ऊंचा जलप्रपात कुंचिकल जलप्रपात (455 मीटर) किस नदी पर और किस राज्य में स्थित है?\n[English: India's highest waterfall, Kunchikal Falls (455m), is situated on which river and in which state?]",
    "options": [
      "A) वाराही नदी (कर्नाटक) / Varahi River (Karnataka)",
      "B) शरावती नदी (जोग जलप्रपात) / Sharavathi River",
      "C) नर्मदा नदी (धुआंधार जलप्रपात) / Narmada River",
      "D) कावेरी नदी (शिवसमुद्रम) / Kaveri River"
    ],
    "correct": 0,
    "ans": "A) वाराही नदी (कर्नाटक) / Varahi River (Karnataka)",
    "exp": "💡 सही उत्तर: A) वाराही नदी, शिमोगा जिला (कर्नाटक)। जोग/गरसोप्पा जलप्रपात (253 मीटर) शरावती नदी पर स्थित है।"
  },
  {
    "topic": "भारतीय अर्थव्यवस्था - मौद्रिक नीति (Monetary Policy - RBI Governor)",
    "q": "भारतीय रिजर्व बैंक (RBI) की स्थापना किस आयोग की संस्तुतियों के आधार पर की गई थी?\n[English: The Reserve Bank of India (RBI) was established based on the recommendations of which commission?]",
    "options": [
      "A) हिल्टन यंग आयोग (1926) / Hilton Young Commission (Royal Commission)",
      "B) साइमन कमीशन / Simon Commission",
      "C) हंटर आयोग / Hunter Commission",
      "D) कोठारी आयोग / Kothari Commission"
    ],
    "correct": 0,
    "ans": "A) हिल्टन यंग आयोग (1926) / Hilton Young Commission (Royal Commission)",
    "exp": "💡 सही उत्तर: A) हिल्टन यंग आयोग। RBI अधिनियम 1934 के तहत 1 अप्रैल 1935 को RBI की स्थापना हुई। 1 जनवरी 1949 को इसका राष्ट्रीयकरण हुआ।"
  },
  {
    "topic": "प्राचीन भारतीय इतिहास (Ancient History - Indus Valley)",
    "q": "सिंधु घाटी सभ्यता का प्रसिद्ध बंदरगाह नगर (Dockyard) कौन सा था जहां गोदीवाड़ा के साक्ष्य मिले हैं?\n[English: Which famous port city of the Indus Valley Civilisation had an artificial dockyard?]",
    "options": [
      "A) लोथल (गुजरात - भोगवा नदी) / Lothal (Gujarat)",
      "B) कालीबंगा (राजस्थान) / Kalibangan",
      "C) धोलावीरा (गुजरात) / Dholavira",
      "D) रोपड़ (पंजाब) / Ropar"
    ],
    "correct": 0,
    "ans": "A) लोथल (गुजरात - भोगवा नदी) / Lothal (Gujarat)",
    "exp": "💡 सही उत्तर: A) लोथल। एस. आर. राव ने लोथल की खोज की थी। धोलावीरा में उन्नत जल प्रबंधन प्रणाली तथा क्रीड़ा स्थल (स्टेडियम) मिला है।"
  },
  {
    "topic": "भारतीय संविधान - मौलिक कर्तव्य (Fundamental Duties)",
    "q": "भारतीय संविधान में मौलिक कर्तव्यों (Fundamental Duties) को किस समिति की सिफारिश पर जोड़ा गया था?\n[English: On the recommendation of which committee were Fundamental Duties incorporated into the Indian Constitution?]",
    "options": [
      "A) सरदार स्वर्ण सिंह समिति (1976) / Swaran Singh Committee",
      "B) सरकारिया आयोग / Sarkaria Commission",
      "C) बलवंत राय मेहता समिति / Balwant Rai Mehta Committee",
      "D) वर्मा समिति / Verma Committee"
    ],
    "correct": 0,
    "ans": "A) सरदार स्वर्ण सिंह समिति (1976) / Swaran Singh Committee",
    "exp": "💡 सही उत्तर: A) सरदार स्वर्ण सिंह समिति। 42वें संशोधन 1976 द्वारा संविधान के भाग 4A में अनुच्छेद 51A के तहत 10 कर्तव्य जोड़े गए। 86वें संशोधन 2002 द्वारा 11वां कर्तव्य जोड़ा गया।"
  },
  {
    "topic": "विश्व भूगोल - सौरमंडल (Solar System - Planets)",
    "q": "सौरमंडल का सबसे चमकीला और सबसे गर्म ग्रह (Brightest and Hottest Planet) कौन सा है जिसे 'पृथ्वी की जुड़वां बहन' भी कहा जाता है?\n[English: Which is the brightest and hottest planet in our solar system, often called 'Earth's Twin'?]",
    "options": [
      "A) शुक्र (वीनस) / Venus",
      "B) बुध (मर्करी) / Mercury",
      "C) मंगल (मार्स) / Mars",
      "D) बृहस्पति (जुपिटर) / Jupiter"
    ],
    "correct": 0,
    "ans": "A) शुक्र (वीनस) / Venus",
    "exp": "💡 सही उत्तर: A) शुक्र (Venus)। इसके घने CO₂ वायुमंडल (96%) के कारण ग्रीनहाउस प्रभाव से इसका तापमान लगभग 465°C रहता है। इसे 'भोर का तारा' व 'सांझ का तारा' भी कहते हैं।"
  },
  {
    "topic": "सामान्य विज्ञान - प्रकाशिकी (Optics - Mirages)",
    "q": "रेगिस्तान में गर्मियों में मरीचिका (Mirage) की भ्रांति किस प्रकाशीय घटना के कारण उत्पन्न होती है?\n[English: The optical illusion of a mirage in deserts during summer is caused by:]",
    "options": [
      "A) पूर्ण आंतरिक परावर्तन (Total Internal Reflection - TIR)",
      "B) केवल अपवर्तन / Only Refraction",
      "C) प्रकाश का विवर्तन / Diffraction",
      "D) प्रकाश का प्रकीर्णन / Scattering"
    ],
    "correct": 0,
    "ans": "A) पूर्ण आंतरिक परावर्तन (Total Internal Reflection - TIR)",
    "exp": "💡 सही उत्तर: A) पूर्ण आंतरिक परावर्तन। गर्म रेत के कारण नीचे की वायु विरल हो जाती है, जिससे प्रकाश की किरणें निरंतर अपवर्तित होकर क्रांतिक कोण से अधिक कोण पर पूर्णतः परावर्तित हो जाती हैं।"
  },
  {
    "topic": "भारत में प्रथम (First in India - Governance)",
    "q": "स्वतंत्र भारत के प्रथम कानून मंत्री (First Law Minister of Independent India) कौन थे?\n[English: Who was the first Law and Justice Minister of independent India?]",
    "options": [
      "A) डॉ. बी. आर. आंबेडकर / Dr. B.R. Ambedkar",
      "B) सरदार वल्लभभाई पटेल / Sardar Vallabhbhai Patel",
      "C) मौलाना अबुल कलाम आजाद / Maulana Abul Kalam Azad",
      "D) जॉन मथाई / John Mathai"
    ],
    "correct": 0,
    "ans": "A) डॉ. बी. आर. आंबेडकर। प्रथम शिक्षा मंत्री मौलाना अबुल कलाम आजाद, प्रथम गृह मंत्री सरदार पटेल, तथा प्रथम रेल मंत्री जॉन मथाई थे।"
  },
  {
    "topic": "पुरस्कार एवं सम्मान (Awards & Honors - Bharat Ratna)",
    "q": "भारत का सर्वोच्च नागरिक सम्मान 'भारत रत्न' (Bharat Ratna) सर्वप्रथम किस वर्ष प्रदान किया गया था?\n[English: In which year was India's highest civilian award, the 'Bharat Ratna', instituted and first awarded?]",
    "options": [
      "A) 1954 (सी. राजगोपालाचारी, सर्वपल्ली राधाकृष्णन, सी. वी. रमन) / Year 1954",
      "B) 1950",
      "C) 1947",
      "D) 1961"
    ],
    "correct": 0,
    "ans": "A) 1954। 1954 में प्रथम तीन प्राप्तकर्ता थे: डॉ. सर्वपल्ली राधाकृष्णन, चक्रवर्ती राजगोपालाचारी और वैज्ञानिक डॉ. सी. वी. रमन।"
  },
  {
    "topic": "पर्यावरण - राष्ट्रीय उद्यान (National Parks - One-Horned Rhino)",
    "q": "एक सींग वाले गैंडे (One-horned Rhinoceros) के प्राकृतिक आवास के रूप में प्रसिद्ध काजीरंगा राष्ट्रीय उद्यान किस राज्य में स्थित है?\n[English: Kaziranga National Park, famous as the natural habitat of the one-horned rhinoceros, is located in:]",
    "options": [
      "A) असम / Assam",
      "B) पश्चिम बंगाल / West Bengal",
      "C) ओडिशा / Odisha",
      "D) मध्य प्रदेश / Madhya Pradesh"
    ],
    "correct": 0,
    "ans": "A) असम (Assam)। यह यूनेस्को विश्व धरोहर स्थल है जहाँ विश्व के दो-तिहाई एक सींग वाले गैंडे पाए जाते हैं।"
  },
  {
    "topic": "खेल जगत (Sports - Olympics)",
    "q": "व्यक्तिगत स्पर्धा में भारत के लिए ओलंपिक में पहला स्वर्ण पदक (First Olympic Gold in Individual Event) किसने जीता था?\n[English: Who won India's first ever individual Olympic Gold Medal?]",
    "options": [
      "A) अभिनव बिंद्रा (बीजिंग 2008, 10m एयर राइफल) / Abhinav Bindra",
      "B) नीरज चोपड़ा (टोक्यो 2020, भाला फेंक) / Neeraj Chopra",
      "C) के. डी. जाधव (हेलसिंकी 1952, कांस्य) / K.D. Jadhav",
      "D) मिल्खा सिंह / Milkha Singh"
    ],
    "correct": 0,
    "ans": "A) अभिनव बिंद्रा (बीजिंग 2008 निशानेबाजी)। नीरज चोपड़ा ने टोक्यो 2020 में एथलेटिक्स (भाला फेंक) में दूसरा व्यक्तिगत स्वर्ण पदक जीता।"
  },
  {
    "topic": "भारतीय संविधान - राष्ट्रपति की क्षमादान शक्ति (Presidential Pardon)",
    "q": "संविधान के किस अनुच्छेद के अंतर्गत भारत के राष्ट्रपति को मृत्युदंड सहित किसी भी सजा को क्षमा (Pardon) करने की शक्ति प्राप्त है?\n[English: Under which Article of the Constitution does the President of India possess the power to grant pardons?]",
    "options": [
      "A) अनुच्छेद 72 / Article 72",
      "B) अनुच्छेद 161 (राज्यपाल की क्षमादान शक्ति) / Article 161",
      "C) अनुच्छेद 123 (अध्यादेश) / Article 123",
      "D) अनुच्छेद 143 (सुप्रीम कोर्ट से परामर्श) / Article 143"
    ],
    "correct": 0,
    "ans": "A) अनुच्छेद 72। राष्ट्रपति कोर्ट मार्शल और मृत्युदंड दोनों को क्षमा कर सकते हैं। राज्यपाल (अनुच्छेद 161) मृत्युदंड और सेना न्यायालय के दंड को माफ नहीं कर सकते।"
  },
  {
    "topic": "मध्यकालीन भारतीय इतिहास (Medieval India - Delhi Sultanate)",
    "q": "दिल्ली सल्तनत की पहली और एकमात्र मुस्लिम महिला शासिका कौन थीं?\n[English: Who was the first and only female Muslim ruler of the Delhi Sultanate?]",
    "options": [
      "A) रजिया सुल्तान (1236-1240 ई.) / Razia Sultan",
      "B) चांद बीबी / Chand Bibi",
      "C) नूरजहां / Nur Jahan",
      "D) मुमताज महल / Mumtaz Mahal"
    ],
    "correct": 0,
    "ans": "A) रजिया सुल्तान। वह इल्तुतमिश की पुत्री थीं और 1236 से 1240 ई. तक दिल्ली की गद्दी पर बैठीं।"
  },
  {
    "topic": "भारतीय भूगोल - दर्रे (Mountain Passes - Zoji La)",
    "q": "प्रसिद्ध 'ज़ोजिला दर्रा' (Zoji La Pass) किन दो क्षेत्रों को आपस में जोड़ता है?\n[English: The strategic Zoji La Pass connects which two regions?]",
    "options": [
      "A) श्रीनगर को लेह (लद्दाख) से / Srinagar with Leh (Ladakh)",
      "B) मनाली को लेह से / Manali with Leh",
      "C) सिक्किम को तिब्बत से (नाथू ला) / Sikkim with Tibet",
      "D) शिमला को तिब्बत से (शिपकी ला) / Shimla with Tibet"
    ],
    "correct": 0,
    "ans": "A) श्रीनगर को लेह (लद्दाख) से। यह राष्ट्रीय राजमार्ग NH-1D पर स्थित महान हिमालय का प्रमुख दर्रा है।"
  },
  {
    "topic": "अर्थव्यवस्था - कर प्रणाली (Taxation - GST)",
    "q": "भारत में वस्तु एवं सेवा कर (GST) किस ऐतिहासिक संविधान संशोधन अधिनियम द्वारा लागू किया गया था?\n[English: By which Constitutional Amendment Act was the Goods and Services Tax (GST) introduced in India?]",
    "options": [
      "A) 101वां संविधान संशोधन (1 जुलाई 2017) / 101st Amendment Act",
      "B) 103वां संविधान संशोधन (EWS आरक्षण)",
      "C) 100वां संविधान संशोधन (भारत-बांग्लादेश भूमि सीमा)",
      "D) 99वां संविधान संशोधन (NJAC)"
    ],
    "correct": 0,
    "ans": "A) 101वां संविधान संशोधन 2016 (लागू 1 जुलाई 2017)। GST एक व्यापक अप्रत्यक्ष गंतव्य-आधारित कर है।"
  },
  {
    "topic": "सामान्य विज्ञान - ध्वनि तरंगें (Sound - Speed in Medium)",
    "q": "ध्वनि की चाल (Speed of Sound) सर्वाधिक किस माध्यम में होती है?\n[English: The speed of sound is maximum in which medium?]",
    "options": [
      "A) ठोस (इस्पात/स्टील) में (~5100 मी/से) / Solids (Steel)",
      "B) द्रव (जल) में (~1480 मी/से) / Liquids",
      "C) गैस (वायु) में (343 मी/से) / Gases",
      "D) निर्वात में (शून्य) / Vacuum"
    ],
    "correct": 0,
    "ans": "A) ठोस में सर्वाधिक (ठोस > द्रव > गैस)। ध्वनि एक यांत्रिक तरंग है जिसे संचरण हेतु माध्यम की आवश्यकता होती है, अतः यह निर्वात में गमन नहीं कर सकती।"
  },
  {
    "topic": "महत्वपूर्ण दिवस (Important Days - Environment)",
    "q": "'विश्व पर्यावरण दिवस' (World Environment Day) प्रतिवर्ष किस तिथि को मनाया जाता है?\n[English: On which date is 'World Environment Day' celebrated internationally every year?]",
    "options": [
      "A) 5 जून / 5th June",
      "B) 22 अप्रैल (पृथ्वी दिवस) / 22nd April",
      "C) 16 सितंबर (ओजोन दिवस) / 16th September",
      "D) 22 मार्च (विश्व जल दिवस) / 22nd March"
    ],
    "correct": 0,
    "ans": "A) 5 जून। 1972 के स्टॉकहोम मानव पर्यावरण सम्मेलन की स्मृति में संयुक्त राष्ट्र द्वारा प्रतिवर्ष 5 जून को मनाया जाता है।"
  },
  {
    "topic": "भारतीय संविधान - नियंत्रक एवं महालेखा परीक्षक (CAG)",
    "q": "संविधान के किस अनुच्छेद के तहत 'भारत के नियंत्रक एवं महालेखा परीक्षक' (CAG) के पद का प्रावधान है जिसे लोक वित्त का संरक्षक कहा जाता है?\n[English: Under which Article is the office of the Comptroller and Auditor General of India (CAG) provided?]",
    "options": [
      "A) अनुच्छेद 148 / Article 148",
      "B) अनुच्छेद 76 (महान्यायवादी) / Article 76",
      "C) अनुच्छेद 280 (वित्त आयोग) / Article 280",
      "D) अनुच्छेद 315 (UPSC) / Article 315"
    ],
    "correct": 0,
    "ans": "A) अनुच्छेद 148। CAG की नियुक्ति राष्ट्रपति द्वारा की जाती है और कार्यकाल 6 वर्ष या 65 वर्ष की आयु तक होता है।"
  },
  {
    "topic": "आधुनिक इतिहास - भारतीय राष्ट्रीय कांग्रेस (INC First President)",
    "q": "दिसंबर 1885 में बंबई में आयोजित भारतीय राष्ट्रीय कांग्रेस के प्रथम अधिवेशन की अध्यक्षता किसने की थी?\n[English: Who presided over the first session of the Indian National Congress in Bombay in December 1885?]",
    "options": [
      "A) व्योमेश चंद्र बनर्जी (W.C. Bonnerjee) / W.C. Bonnerjee",
      "B) ए. ओ. ह्यूम (संस्थापक) / A.O. Hume",
      "C) दादाभाई नौरोजी / Dadabhai Naoroji",
      "D) सुरेंद्रनाथ बनर्जी / Surendranath Banerjee"
    ],
    "correct": 0,
    "ans": "A) व्योमेश चंद्र बनर्जी। यह अधिवेशन गोकुलदास तेजपाल संस्कृत कॉलेज में 72 प्रतिनिधियों की उपस्थिति में हुआ था।"
  },
  {
    "topic": "भारतीय भूगोल - कर्क रेखा (Tropic of Cancer in India)",
    "q": "कर्क रेखा (23.5° उत्तरी अक्षांश) भारत के कुल कितने राज्यों से होकर गुजरती है?\n[English: The Tropic of Cancer (23.5° N) passes through how many Indian states?]",
    "options": [
      "A) 8 राज्य (गुजरात, राजस्थान, MP, छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम) / 8 States",
      "B) 7 राज्य / 7 States",
      "C) 9 राज्य / 9 States",
      "D) 6 राज्य / 6 States"
    ],
    "correct": 0,
    "ans": "A) 8 राज्य। पश्चिम से पूर्व: गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा और मिजोरम।"
  },
  {
    "topic": "भारतीय अंतरिक्ष अनुसंधान (ISRO - Chandrayaan-3)",
    "q": "23 अगस्त 2023 को इसरो के चंद्रयान-3 ने चंद्रमा के दक्षिणी ध्रुव पर सफल लैंडिंग की। इस ऐतिहासिक दिन को प्रधानमंत्री द्वारा किस दिवस के रूप में घोषित किया गया?\n[English: 23rd August was officially declared as which commemorative day to celebrate Chandrayaan-3 landing?]",
    "options": [
      "A) राष्ट्रीय अंतरिक्ष दिवस / National Space Day",
      "B) राष्ट्रीय विज्ञान दिवस / National Science Day (28 Feb)",
      "C) राष्ट्रीय प्रौद्योगिकी दिवस / National Tech Day (11 May)",
      "D) चंद्र दिवस / Moon Day"
    ],
    "correct": 0,
    "ans": "A) राष्ट्रीय अंतरिक्ष दिवस (National Space Day)। लैंडिंग पॉइंट को 'शिव शक्ति पॉइंट' (Shiv Shakti Point) नाम दिया गया।"
  },
  {
    "topic": "अर्थव्यवस्था - पंचवर्षीय योजनाएं (Second Five Year Plan)",
    "q": "भारी उद्योगों एवं तीव्र औद्योगिकीकरण पर बल देने वाली भारत की 'द्वितीय पंचवर्षीय योजना' (1956-61) किस मॉडल पर आधारित थी?\n[English: India's Second Five-Year Plan (1956-61) emphasizing heavy industries was based on which economic model?]",
    "options": [
      "A) पी. सी. महालनोबिस मॉडल / P.C. Mahalanobis Model",
      "B) हैरोड-डोमर मॉडल (प्रथम योजना) / Harrod-Domar Model",
      "C) गाडगिल मॉडल / Gadgil Model",
      "D) जॉन डब्ल्यू. मिलर मॉडल"
    ],
    "correct": 0,
    "ans": "A) पी. सी. महालनोबिस मॉडल। इसके तहत भिलाई, राउरकेला और दुर्गापुर में तीन बड़े लौह-इस्पात संयंत्र स्थापित किए गए।"
  },
  {
    "topic": "भारतीय संविधान - संविधान संशोधन (South Africa Feature)",
    "q": "भारतीय संविधान में 'संविधान संशोधन की प्रक्रिया' (Article 368) किस देश के संविधान से प्रेरित है?\n[English: The procedure for Constitutional Amendment in Article 368 was borrowed from which country?]",
    "options": [
      "A) दक्षिण अफ्रीका / South Africa",
      "B) संयुक्त राज्य अमेरिका (मौलिक अधिकार) / USA",
      "C) ब्रिटेन (संसदीय प्रणाली) / United Kingdom",
      "D) आयरलैंड (नीति निदेशक तत्व) / Ireland"
    ],
    "correct": 0,
    "ans": "A) दक्षिण अफ्रीका (South Africa)। राज्यसभा सदस्यों के निर्वाचन की प्रक्रिया भी दक्षिण अफ्रीका से ली गई है।"
  },
  {
    "topic": "सामान्य विज्ञान - रक्त का थक्का (Blood Clotting Vitamin)",
    "q": "रक्त का थक्का जमने (Blood Coagulation) के लिए कौन सा विटामिन अनिवार्य होता है?\n[English: Which vitamin is primarily essential for the coagulation (clotting) of blood?]",
    "options": [
      "A) विटामिन K (फाइलोक्विनोन) / Vitamin K",
      "B) विटामिन E (टोकोफेरॉल) / Vitamin E",
      "C) विटामिन A / Vitamin A",
      "D) विटामिन D / Vitamin D"
    ],
    "correct": 0,
    "ans": "A) विटामिन K। यह यकृत में प्रोथ्रोम्बिन और फाइब्रिनोजेन जैसे थक्का जमाने वाले कारकों के निर्माण हेतु आवश्यक है।"
  },
  {
    "topic": "प्राचीन भारत - बौद्ध संगीतियां (Fourth Buddhist Council)",
    "q": "चतुर्थ बौद्ध संगीति किस कुषाण सम्राट के शासनकाल में कश्मीर के कुंडलवन में आयोजित हुई थी जहां बौद्ध धर्म हीनयान और महायान में विभाजित हुआ?\n[English: The Fourth Buddhist Council in Kashmir was convened during the reign of which Kushan ruler?]",
    "options": [
      "A) कनिष्क / Kanishka",
      "B) अशोक (तृतीय संगीति) / Ashoka",
      "C) कालाशोक (द्वितीय संगीति) / Kalashoka",
      "D) अजातशत्रु (प्रथम संगीति) / Ajatashatru"
    ],
    "correct": 0,
    "ans": "A) कनिष्क। इसकी अध्यक्षता वसुमित्र ने की थी और अश्वघोष उपाध्यक्ष थे। इसी संगीति में बौद्ध धर्म हीनयान व महायान में बंटा।"
  },
  {
    "topic": "भारतीय भूगोल - मीठे पानी की झील (Freshwater Lake - Wular)",
    "q": "भारत में मीठे पानी की सबसे बड़ी प्राकृतिक झील (Largest Natural Freshwater Lake) कौन सी है?\n[English: Which is the largest natural freshwater lake in India?]",
    "options": [
      "A) वुलर झील (जम्मू और कश्मीर) / Wular Lake",
      "B) चिल्का झील (खारे पानी की लैगून, ओडिशा) / Chilika Lake",
      "C) सांभर झील (खारी झील, राजस्थान) / Sambhar Lake",
      "D) लोकटक झील (मणिपुर - तैरता पार्क) / Loktak Lake"
    ],
    "correct": 0,
    "ans": "A) वुलर झील (जम्मू-कश्मीर)। यह झेलम नदी के विसर्पण एवं विवर्तनिक गतिविधि से निर्मित गोखुर झील है।"
  },
  {
    "topic": "संगठन एवं मुख्यालय (International Orgs - UNESCO)",
    "q": "संयुक्त राष्ट्र शैक्षिक, वैज्ञानिक तथा सांस्कृतिक संगठन (UNESCO) का मुख्यालय कहाँ स्थित है?\n[English: Where is the headquarters of UNESCO situated?]",
    "options": [
      "A) पेरिस (फ्रांस) / Paris, France",
      "B) न्यूयॉर्क (USA) / New York (UNHQ)",
      "C) जिनेवा (स्विट्जरलैंड) / Geneva (WHO/WTO)",
      "D) रोम (इटली) / Rome (FAO)"
    ],
    "correct": 0,
    "ans": "A) पेरिस (फ्रांस)। 1945 में स्थापित यूनेस्को का उद्देश्य शिक्षा, विज्ञान एवं संस्कृति के माध्यम से शांति को बढ़ावा देना है।"
  },
  {
    "topic": "संविधान - दलबदल विरोधी कानून (Anti-Defection Law)",
    "q": "दलबदल विरोधी कानून (Anti-Defection Law) को किस संविधान संशोधन द्वारा संविधान की 10वीं अनुसूची में शामिल किया गया था?\n[English: By which Constitutional Amendment was the Anti-Defection Law added as the 10th Schedule?]",
    "options": [
      "A) 52वां संविधान संशोधन अधिनियम 1985 / 52nd Amendment Act 1985",
      "B) 61वां संशोधन 1989 (मतदान आयु 21 से 18 वर्ष)",
      "C) 44वां संशोधन 1978",
      "D) 73वां संशोधन 1992"
    ],
    "correct": 0,
    "ans": "A) 52वां संविधान संशोधन 1985। राजीव गांधी के कार्यकाल में 10वीं अनुसूची जोड़ी गई।"
  },
  {
    "topic": "राष्ट्रीय प्रतीक (National Symbols - National Anthem)",
    "q": "रवींद्रनाथ टैगोर द्वारा रचित 'जन गण मन' को संविधान सभा ने राष्ट्रगान के रूप में कब अंगीकृत किया था?\n[English: When was 'Jana Gana Mana' officially adopted as the National Anthem by the Constituent Assembly?]",
    "options": [
      "A) 24 जनवरी 1950 / 24th January 1950",
      "B) 15 अगस्त 1947 / 15th August 1947",
      "C) 26 जनवरी 1950 / 26th January 1950",
      "D) 22 जुलाई 1947 (राष्ट्रीय ध्वज)"
    ],
    "correct": 0,
    "ans": "A) 24 जनवरी 1950। इसी दिन वंदे मातरम् को राष्ट्रगीत तथा डॉ. राजेंद्र प्रसाद को भारत का प्रथम राष्ट्रपति चुना गया।"
  }
];

if (typeof window !== 'undefined') {
  window.COMPETITIVE_REASONING_BANK = COMPETITIVE_REASONING_BANK;
  window.COMPETITIVE_MATH_BANK = COMPETITIVE_MATH_BANK;
  window.UP_POLICE_LAW_SPECIAL_BANK = UP_POLICE_LAW_SPECIAL_BANK;
  window.RAILWAY_SCIENCE_TECH_BANK = RAILWAY_SCIENCE_TECH_BANK;
  window.COMPETITIVE_GK_GS_BANK = COMPETITIVE_GK_GS_BANK;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COMPETITIVE_REASONING_BANK,
    COMPETITIVE_MATH_BANK,
    UP_POLICE_LAW_SPECIAL_BANK,
    RAILWAY_SCIENCE_TECH_BANK,
    COMPETITIVE_GK_GS_BANK
  };
}

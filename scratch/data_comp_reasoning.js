// 30 Authentic Bilingual Reasoning Questions (SSC GD, SSC CGL, UP Police SI/Constable, Railway NTPC/ALP)
module.exports = [
  {
    topic: "सादृश्यता परीक्षण (Word Analogy)",
    q: "दिए गए विकल्पों में से संबंधित शब्द को चुनिए:\nभारत : रुपया :: जापान : ?\n[English: Select the related word from the given options:\nIndia : Rupee :: Japan : ?]",
    options: [
      "A) डॉलर / Dollar",
      "B) युआन / Yuan",
      "C) येन / Yen",
      "D) यूरो / Euro"
    ],
    correct: 2,
    ans: "C) येन / Yen",
    exp: "💡 सही उत्तर: C) येन। जिस प्रकार भारत की आधिकारिक मुद्रा 'रुपया' है, उसी प्रकार जापान की राष्ट्रीय मुद्रा 'येन' (Yen) है। चीन की मुद्रा युआन/रेनमिन्बी है।"
  },
  {
    topic: "संख्या सादृश्यता (Number Analogy)",
    q: "दिए गए विकल्पों में से संबंधित संख्या चुनिए:\n8 : 64 :: 27 : ?\n[English: Select the related number from the given options:\n8 : 64 :: 27 : ?]",
    options: [
      "A) 125",
      "B) 729",
      "C) 216",
      "D) 81"
    ],
    correct: 1,
    ans: "B) 729",
    exp: "💡 सही उत्तर: B) 729। पैटर्न: 8 = 2³ और 64 = 8² = 4³। इसी प्रकार 27 = 3³, अतः 3³ : (3³)² = 27² = 729 (या 9³ = 729)।"
  },
  {
    topic: "संख्या श्रृंखला (Number Series)",
    q: "दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए:\n7, 11, 19, 35, 67, ?\n[English: Find the missing term in the given series:\n7, 11, 19, 35, 67, ?]",
    options: [
      "A) 99",
      "B) 131",
      "C) 135",
      "D) 121"
    ],
    correct: 1,
    ans: "B) 131",
    exp: "💡 सही उत्तर: B) 131। अंतर पैटर्न: +4, +8, +16, +32, अगला अंतर +64 होगा। अतः 67 + 64 = 131 (अंतर प्रत्येक पद में दोगुना हो रहा है)।"
  },
  {
    topic: "अक्षर श्रृंखला (Letter Series)",
    q: "निम्नलिखित श्रृंखला में अगला पद क्या होगा?\nB, E, I, N, T, ?\n[English: What will be the next term in the series?\nB, E, I, N, T, ?]",
    options: [
      "A) Z",
      "B) Y",
      "C) A",
      "D) B"
    ],
    correct: 2,
    ans: "C) A",
    exp: "💡 सही उत्तर: C) A। वर्णमाला स्थितिक मान: B(2) + 3 = E(5), E(5) + 4 = I(9), I(9) + 5 = N(14), N(14) + 6 = T(20), T(20) + 7 = 27 = A(1)।"
  },
  {
    topic: "कोडिंग-डिकोडिंग (Coding-Decoding)",
    q: "यदि किसी निश्चित कूट भाषा में 'DELHI' को 'CCIDD' लिखा जाता है, तो उसी कूट भाषा में 'BOMBAY' को क्या लिखा जाएगा?\n[English: If in a code language 'DELHI' is written as 'CCIDD', how will 'BOMBAY' be written?]",
    options: [
      "A) AMJXVS",
      "B) AMJXVT",
      "C) BNKYBT",
      "D) CLMZCU"
    ],
    correct: 0,
    ans: "A) AMJXVS",
    exp: "💡 सही उत्तर: A) AMJXVS। पैटर्न: -1, -2, -3, -4, -5, -6। D-1=C, E-2=C, L-3=I, H-4=D, I-5=D। अतः B-1=A, O-2=M, M-3=J, B-4=X, A-5=V, Y-6=S।"
  },
  {
    topic: "रक्त संबंध (Blood Relations)",
    q: "एक तस्वीर की ओर इशारा करते हुए एक व्यक्ति ने कहा, 'यह मेरे दादाजी के इकलौते पुत्र की पुत्री है।' वह महिला उस व्यक्ति से किस प्रकार संबंधित है?\n[English: Pointing to a photograph, a man said, 'She is the daughter of my grandfather's only son.' How is that woman related to the man?]",
    options: [
      "A) बहन / Sister",
      "B) माता / Mother",
      "C) चाची / Aunt",
      "D) पुत्री / Daughter"
    ],
    correct: 0,
    ans: "A) बहन / Sister",
    exp: "💡 सही उत्तर: A) बहन (Sister)। दादाजी का इकलौता पुत्र = व्यक्ति के पिता। पिता की पुत्री = व्यक्ति की बहन।"
  },
  {
    topic: "दिशा और दूरी परीक्षण (Direction & Distance)",
    q: "रोहित उत्तर दिशा में 10 मीटर चलता है, फिर दाएं मुड़कर 15 मीटर चलता है। इसके बाद वह पुनः दाएं मुड़कर 10 मीटर चलता है। वह अपने प्रारंभिक बिंदु से किस दिशा में और कितनी दूरी पर है?\n[English: Rohit walks 10m North, turns right and walks 15m, then turns right again and walks 10m. In which direction and at what distance is he from starting point?]",
    options: [
      "A) 15 मीटर पूर्व / 15m East",
      "B) 15 मीटर पश्चिम / 15m West",
      "C) 10 मीटर उत्तर / 10m North",
      "D) 25 मीटर दक्षिण / 25m South"
    ],
    correct: 0,
    ans: "A) 15 मीटर पूर्व / 15m East",
    exp: "💡 सही उत्तर: A) 15 मीटर पूर्व। उत्तर 10m और दक्षिण 10m निरस्त हो जाते हैं। केवल पूर्व की ओर 15 मीटर दूरी बचती है।"
  },
  {
    topic: "न्याय निगमन (Syllogism)",
    q: "कथन: सभी पेन पेंसिल हैं। कुछ पेंसिल रबर हैं।\nनिष्कर्ष: I. कुछ पेन रबर हैं। II. कुछ पेंसिल पेन हैं।\n[English: Statements: All pens are pencils. Some pencils are erasers.\nConclusions: I. Some pens are erasers. II. Some pencils are pens.]",
    options: [
      "A) केवल निष्कर्ष II सही है / Only conclusion II follows",
      "B) केवल निष्कर्ष I सही है / Only conclusion I follows",
      "C) दोनों निष्कर्ष I और II सही हैं / Both I and II follow",
      "D) न तो I न ही II सही है / Neither I nor II follows"
    ],
    correct: 0,
    ans: "A) केवल निष्कर्ष II सही है / Only conclusion II follows",
    exp: "💡 सही उत्तर: A) केवल निष्कर्ष II सही है। 'सभी पेन पेंसिल हैं' से व्युत्क्रम 'कुछ पेंसिल पेन हैं' शत-प्रतिशत सत्य है। पेन और रबर में कोई निश्चित संबंध नहीं है।"
  },
  {
    topic: "वेन आरेख (Venn Diagrams)",
    q: "निम्नलिखित में से कौन सा वेन आरेख 'मानव, डॉक्टर, और शिक्षक' के बीच सही संबंध दर्शाता है?\n[English: Which Venn diagram accurately represents the relation among 'Humans, Doctors, and Teachers'?]",
    options: [
      "A) मानव के भीतर डॉक्टर और शिक्षक के दो परस्पर प्रतिच्छेदी वृत्त / Two intersecting circles inside Humans circle",
      "B) तीनों अलग-अलग वृत्त / Three disjoint circles",
      "C) तीन संकेंद्रित वृत्त / Three concentric circles",
      "D) डॉक्टर के भीतर शिक्षक और मानव / Teachers inside Doctors"
    ],
    correct: 0,
    ans: "A) मानव के भीतर डॉक्टर और शिक्षक के दो परस्पर प्रतिच्छेदी वृत्त / Two intersecting circles inside Humans circle",
    exp: "💡 सही उत्तर: A। सभी डॉक्टर और शिक्षक मनुष्य हैं (मानव के बड़े वृत्त में आएंगे)। कुछ डॉक्टर मेडिकल कॉलेज में प्रोफेसर/शिक्षक भी होते हैं (प्रतिच्छेदी वृत्त)।"
  },
  {
    topic: "क्रम व्यवस्था परीक्षण (Ranking Test)",
    q: "40 विद्यार्थियों की एक कक्षा में सुमित का स्थान शीर्ष से 12वाँ है। नीचे से उसका स्थान क्या होगा?\n[English: In a class of 40 students, Sumit ranks 12th from the top. What is his rank from the bottom?]",
    options: [
      "A) 29वाँ / 29th",
      "B) 28वाँ / 28th",
      "C) 30वाँ / 30th",
      "D) 31वाँ / 31st"
    ],
    correct: 0,
    ans: "A) 29वाँ / 29th",
    exp: "💡 सही उत्तर: A) 29वाँ। सूत्र: कुल = (शीर्ष + नीचे) - 1 ⟹ 40 = 12 + नीचे - 1 ⟹ नीचे से स्थान = 40 - 11 = 29वाँ।"
  },
  {
    topic: "घड़ी परीक्षण (Clock Test)",
    q: "3 बजकर 30 मिनट पर घड़ी की दोनों सुइयों (घंटे और मिनट) के बीच कितने अंश का कोण बनेगा?\n[English: At 3:30, what is the angle between the hour hand and minute hand of a clock?]",
    options: [
      "A) 75°",
      "B) 70°",
      "C) 80°",
      "D) 90°"
    ],
    correct: 0,
    ans: "A) 75°",
    exp: "💡 सही उत्तर: A) 75°। कोण सूत्र: θ = |30H - (11/2)M| = |30×3 - (11/2)×30| = |90 - 165| = 75°।"
  },
  {
    topic: "कैलेंडर परीक्षण (Calendar Test)",
    q: "15 अगस्त 1947 को सप्ताह का कौन सा दिन था?\n[English: What day of the week was 15th August 1947?]",
    options: [
      "A) शुक्रवार / Friday",
      "B) गुरुवार / Thursday",
      "C) शनिवार / Saturday",
      "D) रविवार / Sunday"
    ],
    correct: 0,
    ans: "A) शुक्रवार / Friday",
    exp: "💡 सही उत्तर: A) शुक्रवार (Friday)। 1600 वर्षों में 0 विषम दिन, 300 वर्षों में 1 विषम दिन, 46 वर्षों में (11 लीप + 35 सामान्य) = 57 दिन = 1 विषम दिन। 1947 के 15 अगस्त तक 216 दिन = 6 विषम दिन। कुल = 1 + 1 + 6 = 8 दिन = 1 विषम दिन = शुक्रवार।"
  },
  {
    topic: "बैठक व्यवस्था (Seating Arrangement - Circular)",
    q: "6 मित्र A, B, C, D, E, F केंद्र की ओर मुख करके एक वृत्त में बैठे हैं। B, D के दाएं दूसरा है। C, A और B के बीच में है। F, D के तुरंत बाएं है। E के सम्मुख कौन बैठा है?\n[English: 6 friends A, B, C, D, E, F are sitting in a circle facing centre. B is 2nd to the right of D. C is between A and B. F is immediate left of D. Who sits opposite to E?]",
    options: [
      "A) B",
      "B) C",
      "C) A",
      "D) D"
    ],
    correct: 0,
    ans: "A) B",
    exp: "💡 सही उत्तर: A) B। दक्षिणावर्त क्रम: D, F, E, B, C, A। E के ठीक सम्मुख B बैठा है।"
  },
  {
    topic: "दर्पण एवं जल प्रतिबिंब (Mirror Image)",
    q: "जब दर्पण को दाईं ओर (MN पर) रखा जाए, तो शब्द 'QUALITY' का सही दर्पण प्रतिबिंब क्या होगा?\n[English: If a mirror is placed on the right side (MN), what is the correct mirror image of 'QUALITY'?]",
    options: [
      "A) Y T I L A U Q (अक्षर उल्टे क्रम में) / Inverted letter sequence",
      "B) Q U A L I T Y",
      "C) Y T I L A U O",
      "D) Y T I J A U Q"
    ],
    correct: 0,
    ans: "A) Y T I L A U Q (अक्षर उल्टे क्रम में) / Inverted letter sequence",
    exp: "💡 सही उत्तर: A) दर्पण प्रतिबिंब में दायां भाग बायां बन जाता है। अंतिम अक्षर 'Y' सर्वप्रथम दिखेगा और 'Q' अंत में।"
  },
  {
    topic: "कागज मोड़ना और काटना (Paper Folding & Cutting)",
    q: "एक वर्गाकार कागज को दो बार मोड़कर बीच में एक त्रिभुजाकार और एक वृत्ताकार छेद किया जाता है। खोलने पर यह कैसा दिखेगा?\n[English: A square paper is folded twice and punched with a triangle and circle. On unfolding, how will it appear?]",
    options: [
      "A) चारों कोनों/फलकों पर 4 त्रिभुज और 4 वृत्त / 4 triangles and 4 circles symmetrically distributed",
      "B) केवल 2 त्रिभुज और 2 वृत्त / Only 2 triangles and 2 circles",
      "C) केवल 1 वृत्त और 4 त्रिभुज",
      "D) 4 वृत्त और 1 त्रिभुज"
    ],
    correct: 0,
    ans: "A) चारों कोनों/फलकों पर 4 त्रिभुज और 4 वृत्त / 4 triangles and 4 circles symmetrically distributed",
    exp: "💡 सही उत्तर: A। दो बार मोड़ने (1/4 भाग) के बाद खुलने पर प्रत्येक छेद 4 गुना सममित रूप से दिखाई देगा।"
  },
  {
    topic: "वर्गीकरण / विषम चुनिए (Odd One Out)",
    q: "निम्नलिखित चार में से तीन किसी प्रकार समान हैं और एक समूह बनाते हैं। विषम को चुनिए:\n[English: Three of the following four are alike in a certain way. Select the odd one out:]",
    options: [
      "A) पीतल / Brass (मिश्रधातु)",
      "B) तांबा / Copper",
      "C) जस्ता / Zinc",
      "D) एल्युमिनियम / Aluminium"
    ],
    correct: 0,
    ans: "A) पीतल / Brass (मिश्रधातु)",
    exp: "💡 सही उत्तर: A) पीतल (Brass)। तांबा (Cu), जस्ता (Zn), और एल्युमिनियम (Al) शुद्ध धात्विक तत्व हैं, जबकि पीतल तांबा और जस्ता की एक मिश्रधातु (Alloy) है।"
  },
  {
    topic: "कथन एवं तर्क (Statement & Arguments)",
    q: "कथन: क्या भारत में सभी स्तरों पर प्लास्टिक बैग के उपयोग पर पूर्ण प्रतिबंध लगा देना चाहिए?\nतर्क I: हाँ, प्लास्टिक गैर-बायोडिग्रेडेबल है और पर्यावरण व जल-निकासी व्यवस्था को भारी क्षति पहुंचाता है।\nतर्क II: नहीं, इससे पैकेजिंग उद्योग में लाखों लोग बेरोजगार हो जाएंगे।\n[English: Statement: Should plastic bags be completely banned at all levels in India?\nArg I: Yes, plastic is non-biodegradable and causes ecological hazards.\nArg II: No, it will render thousands jobless.]",
    options: [
      "A) केवल तर्क I प्रबल है / Only argument I is strong",
      "B) केवल तर्क II प्रबल है / Only argument II is strong",
      "C) दोनों तर्क I और II प्रबल हैं / Both I and II are strong",
      "D) न तो I न ही II प्रबल है / Neither I nor II is strong"
    ],
    correct: 0,
    ans: "A) केवल तर्क I प्रबल है / Only argument I is strong",
    exp: "💡 सही उत्तर: A) केवल तर्क I प्रबल है। पर्यावरण और लोक स्वास्थ्य संरक्षण सर्वोच्च प्राथमिकता है। विकल्प तैयार करके रोजगार को पुनर्निर्देशित किया जा सकता है।"
  },
  {
    topic: "लुप्त संख्या ज्ञात करना (Missing Number Matrix)",
    q: "दिए गए आव्यूह (Matrix) में लुप्त संख्या (?) ज्ञात कीजिए:\n3   4   5\n4   5   6\n25  41  ?\n[English: Find the missing number (?) in the given matrix:\n3   4   5\n4   5   6\n25  41  ?]",
    options: [
      "A) 61",
      "B) 55",
      "C) 65",
      "D) 72"
    ],
    correct: 0,
    ans: "A) 61",
    exp: "💡 सही उत्तर: A) 61। स्तंभ पैटर्न: 3² + 4² = 9 + 16 = 25। द्वितीय स्तंभ: 4² + 5² = 16 + 25 = 41। तृतीय स्तंभ: 5² + 6² = 25 + 36 = 61।"
  },
  {
    topic: "पासा परीक्षण (Dice Test)",
    q: "एक मानक पासे (Standard Dice) के एक फलक पर अंक 4 अंकित है। इसके ठीक विपरीत फलक पर कौन सा अंक होगा?\n[English: On a standard dice, number 4 is on one face. What number will be on its opposite face?]",
    options: [
      "A) 3",
      "B) 5",
      "C) 2",
      "D) 1"
    ],
    correct: 0,
    ans: "A) 3",
    exp: "💡 सही उत्तर: A) 3। मानक पासे (Standard Dice) के विपरीत फलकों का योग सदैव 7 होता है: 4 + 3 = 7।"
  },
  {
    topic: "अंकगणितीय तर्कशक्ति (Mathematical Operations)",
    q: "यदि '+' का अर्थ '÷', '×' का अर्थ '+', '÷' का अर्थ '-' और '-' का अर्थ '×' हो, तो निम्नलिखित व्यंजक का मान क्या होगा?\n36 + 6 - 3 × 5 ÷ 3 = ?\n[English: If '+' means '÷', '×' means '+', '÷' means '-' and '-' means '×', find the value of:\n36 + 6 - 3 × 5 ÷ 3 = ?]",
    options: [
      "A) 20",
      "B) 18",
      "C) 22",
      "D) 25"
    ],
    correct: 0,
    ans: "A) 20",
    exp: "💡 सही उत्तर: A) 20। चिह्नों को बदलने पर: 36 ÷ 6 × 3 + 5 - 3 = 6 × 3 + 5 - 3 = 18 + 5 - 3 = 23 - 3 = 20।"
  },
  {
    topic: "शब्दों का सार्थक क्रम (Logical Sequence of Words)",
    q: "निम्नलिखित शब्दों को एक अर्थपूर्ण व तार्किक क्रम में व्यवस्थित कीजिए:\n1. रोग (Illness) 2. चिकित्सक (Doctor) 3. निदान (Diagnosis) 4. उपचार (Treatment) 5. स्वास्थ्य लाभ (Recovery)\n[English: Arrange the words in a meaningful sequence:\n1. Illness 2. Doctor 3. Diagnosis 4. Treatment 5. Recovery]",
    options: [
      "A) 1, 2, 3, 4, 5",
      "B) 2, 1, 3, 4, 5",
      "C) 1, 3, 2, 4, 5",
      "D) 1, 2, 4, 3, 5"
    ],
    correct: 0,
    ans: "A) 1, 2, 3, 4, 5",
    exp: "💡 सही उत्तर: A) 1, 2, 3, 4, 5। रोग होने पर व्यक्ति डॉक्टर के पास जाता है, डॉक्टर रोग का निदान (पहचान) करता है, फिर उपचार देता है, जिससे स्वास्थ्य लाभ होता है।"
  },
  {
    topic: "सादृश्यता - अक्षर समूह (Letter Analogy)",
    q: "दिए गए विकल्पों में से संबंधित अक्षर समूह चुनिए:\nACFJ : ZXUQ :: EGJN : ?\n[English: Select the related letter cluster:\nACFJ : ZXUQ :: EGJN : ?]",
    options: [
      "A) VTQM",
      "B) VTRM",
      "C) USQM",
      "D) WTRN"
    ],
    correct: 0,
    ans: "A) VTQM",
    exp: "💡 सही उत्तर: A) VTQM। विपरीत अक्षर युग्म (Opposite Letter Pairs): A↔Z, C↔X, F↔U, J↔Q। इसी प्रकार: E↔V, G↔T, J↔Q, N↔M।"
  },
  {
    topic: "कथन एवं पूर्वधारणाएं (Statement & Assumptions)",
    q: "कथन: 'धूम्रपान स्वास्थ्य के लिए हानिकारक है' - सिगरेट के पैकेट पर छपी चेतावनी।\nपूर्वधारणा I: लोग पैकेट पर छपी चेतावनियां पढ़ते हैं।\nपूर्वधारणा II: चेतावनी पढ़ने से लोग धूम्रपान छोड़ सकते हैं या कम कर सकते हैं।\n[English: Statement: 'Smoking is injurious to health' - Warning on cigarette packs.\nAssumption I: People read warnings printed on packets.\nAssumption II: Warnings may prompt people to quit or reduce smoking.]",
    options: [
      "A) दोनों पूर्वधारणाएं I और II अंतर्निहित हैं / Both I and II are implicit",
      "B) केवल पूर्वधारणा I अंतर्निहित है / Only assumption I is implicit",
      "C) केवल पूर्वधारणा II अंतर्निहित है / Only assumption II is implicit",
      "D) कोई भी अंतर्निहित नहीं है / Neither is implicit"
    ],
    correct: 0,
    ans: "A) दोनों पूर्वधारणाएं I और II अंतर्निहित हैं / Both I and II are implicit",
    exp: "💡 सही उत्तर: A) दोनों अंतर्निहित हैं। कोई भी चेतावनी इस मान्यता के साथ छापी जाती है कि लोग उसे पढ़ेंगे और उसका वांछित प्रभाव पड़ेगा।"
  },
  {
    topic: "दिशा ज्ञान (Direction Sense - Shadow Concept)",
    q: "एक सुबह सूर्योदय के तुरंत बाद, सुरेश एक खंभे की ओर मुंह करके खड़ा था। खंभे की छाया ठीक सुरेश के दाईं ओर पड़ रही थी। सुरेश का मुख किस दिशा में था?\n[English: One morning after sunrise, Suresh was standing facing a pole. The shadow of the pole fell exactly to his right. In which direction was Suresh facing?]",
    options: [
      "A) दक्षिण / South",
      "B) उत्तर / North",
      "C) पूर्व / East",
      "D) पश्चिम / West"
    ],
    correct: 0,
    ans: "A) दक्षिण / South",
    exp: "💡 सही उत्तर: A) दक्षिण। सूर्योदय के समय सूर्य पूर्व में होता है और छाया पश्चिम दिशा में बनती है। यदि पश्चिम सुरेश के दाईं ओर है, तो उसका मुख दक्षिण (South) दिशा में होना चाहिए।"
  },
  {
    topic: "त्रिभुज गणना (Counting Figures - Triangles)",
    q: "एक वर्ग जिसके दोनों विकर्ण परस्पर एक दूसरे को काटते हैं, उसमें कुल कितने त्रिभुज बनते हैं?\n[English: In a square whose both diagonals intersect each other, how many total triangles are formed?]",
    options: [
      "A) 8 त्रिभुज / 8 Triangles",
      "B) 4 त्रिभुज / 4 Triangles",
      "C) 6 त्रिभुज / 6 Triangles",
      "D) 10 त्रिभुज / 10 Triangles"
    ],
    correct: 0,
    ans: "A) 8 त्रिभुज / 8 Triangles",
    exp: "💡 सही उत्तर: A) 8 त्रिभुज। सूत्र: 4 छोटे त्रिभुज × 2 = 8 त्रिभुज। (4 एकल त्रिभुज + 4 दोहरे त्रिभुज)।"
  },
  {
    topic: "कोडिंग-डिकोडिंग (Conditional Coding)",
    q: "यदि 'हवा' को 'पानी', 'पानी को 'आग', 'आग' को 'मिट्टी' और 'मिट्टी' को 'आकाश' कहा जाए, तो मछली कहाँ रहेगी?\n[English: If 'Air' is called 'Water', 'Water' is called 'Fire', 'Fire' is called 'Soil', and 'Soil' is called 'Sky', where will fish live?]",
    options: [
      "A) आग / Fire",
      "B) पानी / Water",
      "C) मिट्टी / Soil",
      "D) आकाश / Sky"
    ],
    correct: 0,
    ans: "A) आग / Fire",
    exp: "💡 सही उत्तर: A) आग (Fire)। वास्तविक जीवन में मछली 'पानी' में रहती है, और कूट भाषा में पानी को 'आग' कहा गया है।"
  },
  {
    topic: "संख्या सादृश्यता (Advanced Number Analogy)",
    q: "दिए गए विकल्पों में से संबंधित संख्या ज्ञात कीजिए:\n12 : 144 :: 15 : ?\n[English: Find the related number:\n12 : 144 :: 15 : ?]",
    options: [
      "A) 225",
      "B) 210",
      "C) 240",
      "D) 196"
    ],
    correct: 0,
    ans: "A) 225",
    exp: "💡 सही उत्तर: A) 225। 12² = 144। इसी प्रकार 15² = 225।"
  },
  {
    topic: "रक्त संबंध (Coded Blood Relations)",
    q: "यदि 'P + Q' का अर्थ 'P, Q का पिता है', 'P - Q' का अर्थ 'P, Q की माता है' और 'P × Q' का अर्थ 'P, Q का भाई है', तो व्यंजक 'A + B × C' में A का C से क्या संबंध है?\n[English: If 'P + Q' means 'P is father of Q', 'P - Q' means 'P is mother of Q', and 'P × Q' means 'P is brother of Q', what is the relation of A to C in 'A + B × C'?]",
    options: [
      "A) पिता / Father",
      "B) भाई / Brother",
      "C) चाचा / Uncle",
      "D) दादा / Grandfather"
    ],
    correct: 0,
    ans: "A) पिता / Father",
    exp: "💡 सही उत्तर: A) पिता (Father)। B × C ⟹ B, C का भाई है। A + B ⟹ A, B का पिता है। अतः A, C का भी पिता है।"
  },
  {
    topic: "वर्णमाला परीक्षण (Alphabetical Order)",
    q: "अंग्रेजी शब्दकोश (Dictionary) के अनुसार तीसरे स्थान पर कौन सा शब्द आएगा?\n1. Miracle 2. Mineral 3. Ministry 4. Mirror\n[English: According to English dictionary, which word will appear at the 3rd position?\n1. Miracle 2. Mineral 3. Ministry 4. Mirror]",
    options: [
      "A) Ministry",
      "B) Mineral",
      "C) Miracle",
      "D) Mirror"
    ],
    correct: 0,
    ans: "A) Ministry",
    exp: "💡 सही उत्तर: A) Ministry। शब्दकोश क्रम: 1st: Mineral, 2nd: Miracle, 3rd: Ministry, 4th: Mirror।"
  },
  {
    topic: "तार्किक पहेली (Logical Puzzle)",
    q: "एक दौड़ में राम श्याम से आगे है लेकिन हरीश से पीछे है। मोहन हरीश से आगे है। दौड़ में सबसे आगे कौन है?\n[English: In a race, Ram is ahead of Shyam but behind Harish. Mohan is ahead of Harish. Who is leading the race?]",
    options: [
      "A) मोहन / Mohan",
      "B) हरीश / Harish",
      "C) राम / Ram",
      "D) श्याम / Shyam"
    ],
    correct: 0,
    ans: "A) मोहन / Mohan",
    exp: "💡 सही उत्तर: A) मोहन। क्रम: मोहन > हरीश > राम > श्याम। अतः दौड़ में सबसे आगे मोहन है।"
  }
];

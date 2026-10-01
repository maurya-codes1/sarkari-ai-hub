// public/js/current-affairs.js
// Daily Current Affairs & Static GK Booster (2025-2026 High-Yield Edition)
// Tailored for SSC CGL/CHSL/GD, RRB NTPC/ALP/Group D, UP/Bihar Police & Defence Exams

const CURRENT_AFFAIRS_QUIZ_DATA = [
  {
    id: 1,
    category: "Defence & Space",
    qEn: "Which indigenous light combat aircraft squadron of the Indian Air Force completed its inaugural overseas deployment in 2024-2025?",
    qHi: "भारतीय वायुसेना के किस स्वदेशी हल्के लड़ाकू विमान (LCA) स्क्वाड्रन ने अपना पहला विदेशी युद्धाभ्यास सफलता पूर्वक पूरा किया?",
    options: [
      { text: "LCA Tejas (तेजस)", correct: true },
      { text: "HAL Prachand (प्रचंड)", correct: false },
      { text: "Sukhoi Su-30MKI (सुखोई-30)", correct: false },
      { text: "Mirage 2000 (मिराज-2000)", correct: false }
    ],
    explanationEn: "LCA Tejas is India's indigenous single-engine multirole fighter developed by ADA and HAL. Tejas participated in multinational air exercises like Desert Flag and Tarang Shakti.",
    explanationHi: "एलसीए तेजस (LCA Tejas) भारत का स्वदेशी 4.5 पीढ़ी का हल्का लड़ाकू विमान है जिसे HAL व ADA द्वारा निर्मित किया गया है। इसने बहुराष्ट्रीय युद्धाभ्यास तरंग शक्ति और डेजर्ट फ्लैग में भाग लिया।"
  },
  {
    id: 2,
    category: "Science & Space",
    qEn: "At which Lagrange Point is ISRO's solar observatory spacecraft 'Aditya-L1' successfully positioned?",
    qHi: "इसरो का सौर वेधशाला उपग्रह 'आदित्य-L1' पृथ्वी-सूर्य प्रणाली के किस लैग्रेंज बिंदु पर स्थापित किया गया है?",
    options: [
      { text: "Lagrange Point L1 (लैग्रेंज बिंदु L1)", correct: true },
      { text: "Lagrange Point L2 (लैग्रेंज बिंदु L2)", correct: false },
      { text: "Lagrange Point L4 (लैग्रेंज बिंदु L4)", correct: false },
      { text: "Lagrange Point L5 (लैग्रेंज बिंदु L5)", correct: false }
    ],
    explanationEn: "Aditya-L1 was inserted into a halo orbit around the Sun-Earth Lagrange Point 1 (L1), approximately 1.5 million km from Earth, allowing uninterrupted 24x7 solar observation without occultation.",
    explanationHi: "आदित्य-L1 को पृथ्वी से लगभग 15 लाख किमी दूर सूर्य-पृथ्वी लैग्रेंजियन बिंदु 1 (L1) के चारों ओर एक प्रभामंडल (Halo) कक्षा में स्थापित किया गया है, जहाँ से बिना किसी ग्रहण के लगातार सूर्य का अध्ययन संभव है।"
  },
  {
    id: 3,
    category: "Government Schemes",
    qEn: "Under the 'PM Surya Ghar: Muft Bijli Yojana', what is the maximum monthly free solar electricity provided to eligible households?",
    qHi: "'पीएम सूर्य घर: मुफ्त बिजली योजना' के तहत पात्र परिवारों को प्रति माह अधिकतम कितने यूनिट मुफ्त सौर बिजली उपलब्ध कराई जा रही है?",
    options: [
      { text: "300 Units (300 यूनिट)", correct: true },
      { text: "150 Units (150 यूनिट)", correct: false },
      { text: "200 Units (200 यूनिट)", correct: false },
      { text: "500 Units (500 यूनिट)", correct: false }
    ],
    explanationEn: "Launched by PM Narendra Modi with an outlay of ₹75,000+ Crore, PM Surya Ghar Muft Bijli Yojana aims to light up 1 crore households with rooftop solar panels, providing up to 300 units of free power each month.",
    explanationHi: "प्रधानमंत्री नरेंद्र मोदी द्वारा शुरू की गई 'पीएम सूर्य घर मुफ्त बिजली योजना' का लक्ष्य 1 करोड़ घरों पर रूफटॉप सोलर लगाकर हर महीने 300 यूनिट तक मुफ्त बिजली और ग्रिड को बिजली बेचकर अतिरिक्त आय प्रदान करना है।"
  },
  {
    id: 4,
    category: "Appointments & Polity",
    qEn: "Who administers the oath of office to the Chief Justice of India (CJI) under Article 124(6) of the Indian Constitution?",
    qHi: "भारतीय संविधान के अनुच्छेद 124(6) के तहत भारत के मुख्य न्यायाधीश (CJI) को पद की शपथ कौन दिलाता है?",
    options: [
      { text: "The President of India (भारत के राष्ट्रपति)", correct: true },
      { text: "The Vice President of India (भारत के उपराष्ट्रपति)", correct: false },
      { text: "The Prime Minister (भारत के प्रधानमंत्री)", correct: false },
      { text: "Speaker of Lok Sabha (लोकसभा अध्यक्ष)", correct: false }
    ],
    explanationEn: "According to Article 124(6), every person appointed to be a Judge of the Supreme Court shall, before entering upon office, make and subscribe an oath before the President of India.",
    explanationHi: "संविधान के अनुच्छेद 124(6) के अनुसार, सर्वोच्च न्यायालय के मुख्य न्यायाधीश और अन्य न्यायाधीशों को पद ग्रहण करने से पूर्व राष्ट्रपति अथवा उनके द्वारा नियुक्त व्यक्ति के समक्ष शपथ लेनी होती है।"
  },
  {
    id: 5,
    category: "Sports & Honors",
    qEn: "Who became the youngest Indian chess grandmaster to win the FIDE Candidates Tournament and challenge for the World Chess Championship title?",
    qHi: "FIDE कैंडिडेट्स शतरंज टूर्नामेंट जीतकर विश्व शतरंज चैंपियनशिप खिताब के लिए चुनौती देने वाले सबसे युवा भारतीय ग्रैंडमास्टर कौन बने?",
    options: [
      { text: "D. Gukesh (डी. गुकेश)", correct: true },
      { text: "R. Praggnanandhaa (आर. प्रज्ञानानंद)", correct: false },
      { text: "Vidit Gujrathi (विदित गुजराती)", correct: false },
      { text: "Arjun Erigaisi (अर्जुन एरिगैसी)", correct: false }
    ],
    explanationEn: "Dommaraju Gukesh (aged 17) won the 2024 FIDE Candidates Tournament in Toronto, becoming the youngest player in history to win the event, breaking Garry Kasparov's 40-year record.",
    explanationHi: "17 वर्षीय भारतीय ग्रैंडमास्टर डी. गुकेश ने टोरंटो में आयोजित FIDE कैंडिडेट्स टूर्नामेंट जीतकर इतिहास रचा और महान गैरी कास्पारोव का 40 साल पुराना रिकॉर्ड तोड़कर सबसे युवा चैलेंजर बने।"
  },
  {
    id: 6,
    category: "National & Social",
    qEn: "In 2024-2025, the Union Cabinet approved the expansion of Ayushman Bharat PM-JAY to cover all senior citizens aged:",
    qHi: "केंद्रीय मंत्रिमंडल ने आयुष्मान भारत (AB PM-JAY) योजना का दायरा बढ़ाकर किस आयु वर्ग के सभी वरिष्ठ नागरिकों को स्वास्थ्य कवर देने की मंजूरी दी?",
    options: [
      { text: "70 Years and above (70 वर्ष और उससे अधिक)", correct: true },
      { text: "60 Years and above (60 वर्ष और उससे अधिक)", correct: false },
      { text: "65 Years and above (65 वर्ष और उससे अधिक)", correct: false },
      { text: "75 Years and above (75 वर्ष और उससे अधिक)", correct: false }
    ],
    explanationEn: "The Union Cabinet approved universal health coverage under Ayushman Bharat for all senior citizens aged 70 years and above irrespective of their income, providing ₹5 Lakh annual top-up health insurance.",
    explanationHi: "केंद्रीय मंत्रिमंडल ने आय सीमा की परवाह किए बिना 70 वर्ष या उससे अधिक आयु के सभी बुजुर्गों को आयुष्मान भारत योजना के तहत प्रति परिवार प्रति वर्ष 5 लाख रुपये का मुफ्त स्वास्थ्य बीमा देने का ऐतिहासिक निर्णय लिया।"
  },
  {
    id: 7,
    category: "Environment & Geography",
    qEn: "Which Tiger Reserve in India recently celebrated its golden jubilee and has the highest density of wild tigers in the world?",
    qHi: "भारत का कौन सा टाइगर रिजर्व अपनी स्थापना का स्वर्ण जयंती वर्ष मना रहा है और जहां विश्व में बाघों का सर्वाधिक घनत्व दर्ज है?",
    options: [
      { text: "Corbett Tiger Reserve, Uttarakhand (कॉर्बेट, उत्तराखंड)", correct: true },
      { text: "Kanha Tiger Reserve, MP (कान्हा, मध्य प्रदेश)", correct: false },
      { text: "Ranthambore, Rajasthan (रणथंभौर, राजस्थान)", correct: false },
      { text: "Sundarbans, West Bengal (सुंदरवन, पश्चिम बंगाल)", correct: false }
    ],
    explanationEn: "Jim Corbett National Park (established in 1936 as Hailey National Park) was the first protected area launched under Project Tiger in 1973. It continues to report the highest tiger density in India.",
    explanationHi: "जिम कॉर्बेट नेशनल पार्क (उत्तराखंड) भारत का पहला राष्ट्रीय उद्यान है। 1973 में 'प्रोजेक्ट टाइगर' यहीं से शुरू हुआ था। नवीनतम अखिल भारतीय बाघ अनुमान के अनुसार यहाँ देश में सर्वाधिक बाघ घनत्व है।"
  },
  {
    id: 8,
    category: "Economy & Banking",
    qEn: "What is the key monetary policy rate fixed by the RBI Monetary Policy Committee (MPC) through which banks borrow overnight funds?",
    qHi: "भारतीय रिजर्व बैंक (RBI) की मौद्रिक नीति समिति (MPC) द्वारा निर्धारित वह मुख्य दर क्या है जिस पर वाणिज्यिक बैंक आरबीआई से अल्पकालिक ऋण लेते हैं?",
    options: [
      { text: "Repo Rate (रेपो रेट)", correct: true },
      { text: "Reverse Repo Rate (रिवर्स रेपो रेट)", correct: false },
      { text: "Bank Rate (बैंक दर)", correct: false },
      { text: "Cash Reserve Ratio (CRR)", correct: false }
    ],
    explanationEn: "Repo Rate (Repurchase Option) is the benchmark interest rate at which the Reserve Bank of India lends short-term money to commercial banks against government securities.",
    explanationHi: "रेपो रेट (Repo Rate) वह ब्याज दर है जिस पर देश का केंद्रीय बैंक (RBI) वाणिज्यिक बैंकों को सरकारी प्रतिभूतियों के बदले अल्पकालिक ऋण प्रदान करता है। इसका मुद्रास्फीति नियंत्रण में मुख्य उपयोग होता है।"
  },
  {
    id: 9,
    category: "Defence & Security",
    qEn: "What is the name of India's newly inducted indigenous anti-aircraft missile defense system capable of targeting multiple airborne threats?",
    qHi: "भारत की उस स्वदेशी सतह-से-हवा में मार करने वाली मिसाइल वायु रक्षा प्रणाली का नाम क्या है जिसे हाल ही में विकसित और तैनात किया गया है?",
    options: [
      { text: "Akash-NG / Samar (आकाश-एनजी / समर)", correct: true },
      { text: "Nag Anti-Tank (नाग)", correct: false },
      { text: "Pinaka MBRL (पिनाका)", correct: false },
      { text: "Dhanush Artillery (धनुष)", correct: false }
    ],
    explanationEn: "Akash-NG (New Generation) and SAMAR (Surface-to-Air Missile for Assured Retaliation) are cutting-edge Indian Air Defence systems developed by DRDO/IAF to intercept supersonic fighter jets and cruise missiles.",
    explanationHi: "आकाश-एनजी (Akash-NG) और समर (SAMAR) वायु रक्षा प्रणाली भारतीय वायुसेना और DRDO द्वारा विकसित की गई है, जो 70-80 किमी दूर से आ रहे लड़ाकू विमानों, ड्रोन और क्रूज मिसाइलों को नष्ट करने में सक्षम है।"
  },
  {
    id: 10,
    category: "Static GK & History",
    qEn: "Under which Article of the Constitution can the President of India declare a Financial Emergency?",
    qHi: "भारतीय संविधान के किस अनुच्छेद के तहत भारत के राष्ट्रपति 'वित्तीय आपातकाल' की घोषणा कर सकते हैं?",
    options: [
      { text: "Article 360 (अनुच्छेद 360)", correct: true },
      { text: "Article 352 (अनुच्छेद 352)", correct: false },
      { text: "Article 356 (अनुच्छेद 356)", correct: false },
      { text: "Article 370 (अनुच्छेद 370)", correct: false }
    ],
    explanationEn: "Article 360 empowers the President to proclaim a Financial Emergency if financial stability or credit of India is threatened. Notably, Financial Emergency has NEVER been imposed in India so far.",
    explanationHi: "संविधान के अनुच्छेद 360 में वित्तीय आपातकाल का प्रावधान है। यदि राष्ट्रपति संतुष्ट हों कि देश का वित्तीय स्थायित्व खतरे में है तो इसे लागू किया जा सकता है। सौभाग्य से भारत में आज तक कभी वित्तीय आपातकाल नहीं लगा है।"
  }
];

const MONTHLY_CAPSULE_DATA = [
  {
    "category": "🚀 Science & Defense (विज्ञान व रक्षा)",
    "category_en": "🚀 Science & Defense",
    "category_i18n": {
      "ta": "🚀 அறிவியல் & பாதுகாப்பு (Science & Defense)",
      "te": "🚀 సైన్స్ & డిఫెన్స్ (Science & Defense)",
      "mr": "🚀 विज्ञान आणि संरक्षण (Science & Defense)",
      "bn": "🚀 বিজ্ঞান ও প্রতিরক্ষা (Science & Defense)",
      "gu": "🚀 વિજ્ઞાન અને સંરક્ષણ (Science & Defense)",
      "kn": "🚀 ವಿಜ್ಞಾನ ಮತ್ತು ರಕ್ಷಣೆ (Science & Defense)",
      "ml": "🚀 ശാസ്ത്രവും പ്രതിരോധവും (Science & Defense)",
      "pa": "🚀 ਵਿਗਿਆਨ ਅਤੇ ਰੱਖਿਆ (Science & Defense)",
      "ur": "🚀 سائنس اور دفاع (Science & Defense)",
      "or": "🚀 ବିଜ୍ଞାନ ଓ ପ୍ରତିରକ୍ଷା (Science & Defense)"
    },
    "points": [
      {
        "hi": "इसरो ने इनसैट-3डीएस (INSAT-3DS) मौसम उपग्रह को जीएसएलवी-एफ14 (GSLV-F14) रॉकेट से सफलतापूर्वक कक्षा में स्थापित किया।",
        "en": "ISRO launched meteorological satellite INSAT-3DS aboard GSLV-F14 from Sriharikota.",
        "ta": "இஸ்ரோ தனது ஜிஎஸ்எல்வி-எஃப்14 (GSLV-F14) ராக்கெட் மூலம் இன்சாட்-3டிஎஸ் (INSAT-3DS) வானிலை செயற்கைக்கோளை வெற்றிகரமாக விண்ணில் செலுத்தியது.",
        "te": "ఇస్రో జీఎస్ఎల్వీ-ఎఫ్14 (GSLV-F14) రాకెట్ ద్వారా ఇన్సాట్-3డీఎస్ (INSAT-3DS) వాతావరణ ఉపగ్రహాన్ని విజయవంతంగా ప్రయోగించింది.",
        "mr": "इस्रोने जीएसएलव्ही-एफ14 (GSLV-F14) रॉकेटच्या साहाय्याने इनसॅट-3डीएस (INSAT-3DS) हवामान उपग्रह यशस्वीरित्या कक्षेत प्रस्थापित केला.",
        "bn": "ইসরো জিএসএলভি-এফ১৪ (GSLV-F14) রকেটের মাধ্যমে ইনস্যাট-৩ডিএস (INSAT-3DS) আবহাওয়া উপগ্রহ সফলভাবে কক্ষপথে স্থাপন করেছে।"
      },
      {
        "hi": "भारत की पहली स्वदेशी 155mm स्मार्ट गोला बारूद प्रणाली IIT मद्रास और म्यूनिशन्स इंडिया लिमिटेड द्वारा विकसित की गई।",
        "en": "India's first indigenous 155mm smart ammunition was co-developed by IIT Madras and Munitions India Ltd.",
        "ta": "இந்தியாவின் முதல் உள்நாட்டு 155மிமீ ஸ்மார்ட் வெடிமருந்து அமைப்பு ஐஐடி மெட்ராஸ் மற்றும் மியூனிஷன்ஸ் இந்தியா லிமிடெட் இணைந்து தயாரித்துள்ளன.",
        "te": "భారతదేశపు మొట్టమొదటి స్వదేశీ 155మిమీ స్మార్ట్ మందుగుండు సామగ్రిని ఐఐటీ మద్రాస్ మరియు మ్యూనిషన్స్ ఇండియా లిమిటెడ్ అభివృద్ధి చేశాయి.",
        "mr": "भारताची पहिली स्वदेशी 155 मिमी स्मार्ट दारूगोळा प्रणाली आयआयटी मद्रास आणि म्युनिशन इंडिया लिमिटेड यांनी संयुक्तपणे विकसित केली.",
        "bn": "ভারতের প্রথম দেশীয় ১৫৫ মিমি স্মার্ট গোলাবারুদ ব্যবস্থা আইআইটি মাদ্রাজ ও মিউনিশন্স ইন্ডিয়া লিমিটেড যৌথভাবে তৈরি করেছে।"
      },
      {
        "hi": "डीआरडीओ ने ओडिशा तट पर अग्नि-प्राइम (Agni-Prime) नई पीढ़ी की बैलिस्टिक मिसाइल का सफल रात्रि परीक्षण किया।",
        "en": "DRDO carried out successful night launch of New Generation Ballistic Missile Agni-Prime off Odisha coast.",
        "ta": "டிஆர்டிஓ (DRDO) ஒடிசா கடற்கரையில் அக்னி-பிரைம் (Agni-Prime) புதிய தலைமுறை பாலிஸ்டிக் ஏவுகணையின் வெற்றிகரமான இரவு சோதனையை நடத்தியது.",
        "te": "డీఆర్డీవో ఒడిశా తీరంలో అగ్ని-ప్రైమ్ (Agni-Prime) కొత్త తరం బాలిస్టిక్ క్షిపణి రాత్రిపూట ప్రయోగాన్ని విజయవంతంగా నిర్వహించింది.",
        "mr": "डीआरडीओने ओडिशा किनारपट्टीवर अग्नि-प्राइम (Agni-Prime) या नवीन पिढीच्या बॅलिस्टिक क्षेपणास्त्राची यशस्वी रात्रीची चाचणी घेतली.",
        "bn": "ডিআরডিও ওড়িশা উপকূলে অগ্নি-প্রাইম (Agni-Prime) নতুন প্রজন্মের ব্যালিস্টিক ক্ষেপণাস্ত্রের সফল নৈশ পরীক্ষা চালিয়েছে।"
      },
      {
        "hi": "भारतीय नौसेना में पहली बार दो महिला अधिकारियों को युद्धपोत पर तैनात किया गया - सब लेफ्टिनेंट कुमुदिनी त्यागी व रीति सिंह।",
        "en": "Indian Navy inducted specialized women combatants aboard frontline destroyers (Sub Lt Kumudini Tyagi & Riti Singh).",
        "ta": "இந்திய கடற்படையில் முதல் முறையாக இரண்டு பெண் அதிகாரிகள் போர்க்கப்பலில் பணியமர்த்தப்பட்டனர் - சப் லெப்டினன்ட் குமுதினி தியாகி மற்றும் ரிதி சிங்.",
        "te": "భారత నౌకాదళ యుద్ధనౌకల్లో తొలిసారిగా ఇద్దరు మహిళా అధికారులను నియమించారు - సబ్ లెఫ్టినెంట్ కుముదిని త్యాగి మరియు రీతి సింగ్.",
        "mr": "भारतीय नौदलात पहिल्यांदाच दोन महिला अधिकाऱ्यांना युद्धनौकेवर तैनात करण्यात आले - सब लेफ्टनंट कुमुदिनी त्यागी आणि रीती सिंग.",
        "bn": "ভারতীয় নৌবাহিনীর যুদ্ধজাহাজে প্রথমবার দুই মহিলা অফিসারকে মোতায়েন করা হলো - সাব লেফটেন্যান্ট কুমুদিনী ত্যাগী ও রীতি সিং।"
      }
    ]
  },
  {
    "category": "🏆 Awards & Sports (पुरस्कार व खेल)",
    "category_en": "🏆 Awards & Sports",
    "category_i18n": {
      "ta": "🏆 விருதுகள் & விளையாட்டுகள் (Awards & Sports)",
      "te": "🏆 అవార్డులు & క్రీడలు (Awards & Sports)",
      "mr": "🏆 पुरस्कार आणि क्रीडा (Awards & Sports)",
      "bn": "🏆 পুরস্কার ও ক্রীড়া (Awards & Sports)",
      "gu": "🏆 એવોર્ડ્સ અને રમતો (Awards & Sports)",
      "kn": "🏆 ಪ್ರಶಸ್ತಿಗಳು ಮತ್ತು ಕ್ರೀಡೆಗಳು (Awards & Sports)",
      "ml": "🏆 പുരസ്കാരങ്ങളും കായികരംഗവും (Awards & Sports)",
      "pa": "🏆 ਇਨਾਮ ਅਤੇ ਖੇਡਾਂ (Awards & Sports)",
      "ur": "🏆 اعزازات اور کھیل (Awards & Sports)",
      "or": "🏆 ପୁରସ୍କାର ଓ କ୍ରୀଡ଼ା (Awards & Sports)"
    },
    "points": [
      {
        "hi": "भारत के 49वें और 50वें भारत रत्न सम्मान क्रमशः कर्पूरी ठाकुर, लालकृष्ण आडवाणी, पी.वी. नरसिम्हा राव, चौधरी चरण सिंह और डॉ. एम.एस. स्वामीनाथन को मरणोपरांत/आजीवन सेवा हेतु दिए गए।",
        "en": "Bharat Ratna awarded to Karpoori Thakur, L.K. Advani, P.V. Narasimha Rao, Chaudhary Charan Singh, and Dr. M.S. Swaminathan.",
        "ta": "இந்தியாவின் மிக உயரிய பாரத ரத்னா விருது கர்பூரி தாக்கூர், எல்.கே. அத்வானி, பி.வி. நரசிம்ம ராவ், சவுத்ரி சரண் சிங் மற்றும் டாக்டர் எம்.எஸ். சுவாமிநாதன் ஆகியோருக்கு அறிவிக்கப்பட்டது.",
        "te": "భారత రత్న పురస్కారాలు కర్పూరి ఠాకూర్, ఎల్.కె. అద్వానీ, పి.వి. నరసింహారావు, చౌదరి చరణ్ సింగ్ మరియు డాక్టర్ ఎం.ఎస్. స్వామినాథన్‌లకు ప్రకటించబడ్డాయి.",
        "mr": "भारतरत्न पुरस्कार कर्पूरी ठाकूर, लालकृष्ण अडवाणी, पी.व्ही. नरसिंह राव, चौधरी चरण सिंग आणि डॉ. एम.एस. स्वामीनाथन यांना प्रदान करण्यात आले.",
        "bn": "ভারতরত্ন সম্মান কর্পূরী ঠাকুর, লালকৃষ্ণ আদবানী, পি.ভি. নরসিমা রাও, চৌধুরী চরণ সিং এবং ডঃ এম.এস. স্বামীনাথনকে প্রদান করা হয়েছে।"
      },
      {
        "hi": "रोहन बोपन्ना 43 वर्ष की उम्र में ऑस्ट्रेलियन ओपन पुरुष युगल जीतकर दुनिया के सबसे उम्रदराज नंबर 1 टेनिस खिलाड़ी बने।",
        "en": "Rohan Bopanna became the oldest World No. 1 in men's doubles tennis after winning the Australian Open at age 43.",
        "ta": "43 வயதில் ஆஸ்திரேலிய ஓபன் ஆடவர் இரட்டையர் பட்டத்தை வென்ற ரோகன் போபண்ணா, உலகின் மிக மூத்த நம்பர் 1 டென்னிஸ் வீரர் என்ற சாதனையைப் படைத்தார்.",
        "te": "43 ఏళ్ల వయసులో ఆస్ట్రేలియన్ ఓపెన్ పురుషుల డబుల్స్ గెలిచి రోహన్ బోపన్న ప్రపంచంలోనే అత్యంత పెద్ద వయస్కుడైన నంబర్ 1 టెన్నిస్ ఆటగాడిగా నిలిచాడు.",
        "mr": "रोहन बोपण्णाने वयाच्या 43 व्या वर्षी ऑस्ट्रेलियन ओपन पुरुष दुहेरी जिंकून जागतिक क्रमवारीत अग्रस्थान पटकावणारा सर्वात वयस्कर खेळाडू ठरला.",
        "bn": "৪৩ বছর বয়সে অস্ট্রেলিয়ান ওপেন পুরুষদের ডাবলস জিতে রোহন বোপান্না বিশ্বের সবচেয়ে বয়স্ক নম্বর ১ টেনিস খেলোয়াড় হলেন।"
      },
      {
        "hi": "शतरंज ओलंपियाड 2024 (बुडापेस्ट) में भारतीय पुरुष व महिला दोनों टीमों ने ऐतिहासिक दोहरा स्वर्ण पदक (Double Gold) जीता।",
        "en": "Indian Open and Women's teams created history by winning historic double gold at the 45th Chess Olympiad in Budapest.",
        "ta": "புடாபெஸ்ட்டில் நடைபெற்ற 45வது சதுரங்க ஒலிம்பியாட் 2024-ல் இந்திய ஆடவர் மற்றும் மகளிர் இரு அணிகளும் வரலாற்றுச் சிறப்புமிக்க இரட்டைத் தங்கப் பதக்கம் (Double Gold) வென்றன.",
        "te": "బుడాపెస్ట్‌లో జరిగిన 45వ చెస్ ఒలింపియాడ్ 2024లో భారత పురుషుల మరియు మహిళల జట్లు చారిత్రాత్మక డబుల్ బంగారు పతకాలను గెలుచుకున్నాయి.",
        "mr": "बुडापेस्ट येथे झालेल्या 45 व्या बुद्धिबळ ऑलिम्पियाडमध्ये भारतीय पुरुष आणि महिला दोन्ही संघांनी ऐतिहासिक दुहेरी सुवर्णपदक पटकावले.",
        "bn": "বুদাপেস্টে অনুষ্ঠিত ৪৫তম দাবা অলিম্পিয়াডে ভারতীয় পুরুষ ও মহিলা উভয় দল ঐতিহাসিক ডাবল সোনা (Double Gold) জয় করেছে।"
      }
    ]
  },
  {
    "category": "🏛️ National & Policy (राष्ट्रीय घटनाक्रम व योजनाएं)",
    "category_en": "🏛️ National & Policy",
    "category_i18n": {
      "ta": "🏛️ தேசிய நிகழ்வுகள் & கொள்கைகள் (National & Policy)",
      "te": "🏛️ జాతీయ అంశాలు & విధానాలు (National & Policy)",
      "mr": "🏛️ राष्ट्रीय घडामोडी आणि धोरणे (National & Policy)",
      "bn": "🏛️ জাতীয় ঘটনাবলী ও নীতি (National & Policy)",
      "gu": "🏛️ રાષ્ટ્રીય વિકાસ અને નીતિઓ (National & Policy)",
      "kn": "🏛️ ರಾಷ್ಟ್ರೀಯ ಬೆಳವಣಿಗೆಗಳು ಮತ್ತು ನೀತಿಗಳು (National & Policy)",
      "ml": "🏛️ ദേശീയ സംഭവവികാസങ്ങളും നയങ്ങളും (National & Policy)",
      "pa": "🏛️ ਰਾਸ਼ਟਰੀ ਘਟਨਾਵਾਂ ਅਤੇ ਨੀਤੀਆਂ (National & Policy)",
      "ur": "🏛️ قومی امور اور پالیسیاں (National & Policy)",
      "or": "🏛️ ଜାତୀୟ ଘଟଣାବଳୀ ଓ ନୀତି (National & Policy)"
    },
    "points": [
      {
        "hi": "संसद के दोनों सदनों द्वारा 106वां संविधान संशोधन अधिनियम (नारी शक्ति वंदन अधिनियम) पारित हुआ, जो लोकसभा व विधानसभाओं में 33% महिला आरक्षण सुनिश्चित करता है।",
        "en": "106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam) guarantees 33% reservation for women in Lok Sabha and Assemblies.",
        "ta": "நாடாளுமன்றத்தில் நிறைவேற்றப்பட்ட 106வது அரசியலமைப்பு திருத்தச் சட்டம் (நாரி சக்தி வந்தன் சட்டம்), மக்களவை மற்றும் மாநில சட்டசபைகளில் பெண்களுக்கு 33% இடஒதுக்கீட்டை உறுதி செய்கிறது.",
        "te": "106వ రాజ్యాంగ సవరణ చట్టం (నారీ శక్తి వందన్ చట్టం) లోక్‌సభ మరియు అసెంబ్లీలలో మహిళలకు 33% రిజర్వేషన్‌ను కల్పిస్తుంది.",
        "mr": "106 व्या घटनादुरुस्ती कायद्यान्वये (नारी शक्ती वंदन कायदा) लोकसभा आणि विधानसभांमध्ये महिलांसाठी 33% आरक्षण निश्चित करण्यात आले आहे.",
        "bn": "১০৬তম সংবিধান সংশোধন আইনের (নারী শক্তি বন্দন অধিনিয়ম) মাধ্যমে লোকসভা ও বিধানসভাগুলিতে মহিলাদের জন্য ৩৩% সংরক্ষণ নিশ্চিত করা হয়েছে।"
      },
      {
        "hi": "उत्तराखंड समान नागरिक संहिता (UCC - Uniform Civil Code) लागू करने वाला आजादी के बाद देश का पहला राज्य बना।",
        "en": "Uttarakhand became the first state in independent India to pass and notify the Uniform Civil Code (UCC) Bill.",
        "ta": "சுதந்திரத்திற்குப் பிறகு பொது சிவில் சட்டத்தை (UCC - Uniform Civil Code) அமல்படுத்திய நாட்டின் முதல் மாநிலமாக உத்தரகாண்ட் உருவெடுத்துள்ளது.",
        "te": "స్వాతంత్య్రానంతరం ఉమ్మడి పౌరస్మృతి (UCC) బిల్లును ఆమోదించి అమలు చేసిన తొలి భారతీయ రాష్ట్రంగా ఉత్తరాఖండ్ నిలిచింది.",
        "mr": "स्वातंत्र्योत्तर भारतात समान नागरी कायदा (UCC) लागू करणारे उत्तराखंड हे पहिले राज्य ठरले आहे.",
        "bn": "স্বাধীনতার পর উত্তরাখণ্ড অভিন্ন দেওয়ানি বিধি (UCC) প্রণয়ন ও কার্যকরকারী দেশের প্রথম রাজ্য হলো।"
      },
      {
        "hi": "भारतीय रेलवे ने दुनिया के सबसे ऊंचे रेलवे पुल 'चिनाब ब्रिज' (359 मीटर ऊंचा) पर उधमपुर-श्रीनगर-बारामूला रेल लिंक में ट्रायल रन पूरा किया।",
        "en": "Indian Railways successfully conducted trials on the world's highest railway arch bridge over the Chenab River (359m high) in J&K.",
        "ta": "ஜம்மு காஷ்மீரில் செனாப் ஆற்றின் மீது உலகின் மிக உயரமான ரயில்வே வளைவுப் பாலத்தில் (359 மீட்டர் உயரம்) இந்திய ரயில்வே வெற்றிகரமாக சோதனை ஓட்டத்தை நிறைவு செய்தது.",
        "te": "జమ్మూ కశ్మీర్‌లోని చీనాబ్ నదిపై ప్రపంచంలోనే అత్యంత ఎత్తైన రైల్వే వంతెన (359 మీటర్లు) పై భారత రైల్వే విజయవంతంగా ట్రయల్ రన్ పూర్తి చేసింది.",
        "mr": "भारतीय रेल्वेने चिनाब नदीवर जगातील सर्वात उंच रेल्वे पुलावर (359 मीटर उंच) यशस्वी चाचणी पूर्ण केली.",
        "bn": "ভারতীয় রেল চেনাব নদীর ওপর বিশ্বের সর্বোচ্চ রেল সেতুর (৩৫৯ মিটার উঁচু) ওপর দিয়ে সফল ট্রায়াল রান সম্পন্ন করেছে।"
      }
    ]
  },
  {
    "category": "📚 Static GK High-Yield Matrix (अक्सर पूछे जाने वाले तथ्य)",
    "category_en": "📚 Static GK High-Yield Matrix",
    "category_i18n": {
      "ta": "📚 பொது அறிவு முக்கியக் குறிப்புகள் (Static GK Matrix)",
      "te": "📚 స్టాటిక్ జీకే ముఖ్య అంశాలు (Static GK Matrix)",
      "mr": "📚 स्टॅटिक सामान्य ज्ञान नोट्स (Static GK Matrix)",
      "bn": "📚 স্ট্যাটিক জিকে গুরুত্বপূর্ণ তথ্য (Static GK Matrix)",
      "gu": "📚 સ્ટેટિક જનરલ નોલેજ (Static GK Matrix)",
      "kn": "📚 ಸ್ಥಿರ ಸಾಮಾನ್ಯ ಜ್ಞಾನ (Static GK Matrix)",
      "ml": "📚 സ്റ്റാറ്റിക് പൊതുവിജ്ഞാനം (Static GK Matrix)",
      "pa": "📚 ਸਥਿਰ ਜਨਰਲ ਨਾਲੇਜ (Static GK Matrix)",
      "ur": "📚 جامد عمومی معلومات (Static GK Matrix)",
      "or": "📚 ଷ୍ଟାଟିକ ସାଧାରଣ ଜ୍ଞାନ (Static GK Matrix)"
    },
    "points": [
      {
        "hi": "संविधान सभा की पहली बैठक: 9 दिसंबर 1946 (अस्थायी अध्यक्ष: डॉ. सच्चिदानंद सिन्हा, स्थायी: डॉ. राजेंद्र प्रसाद)।",
        "en": "First meeting of Constituent Assembly: Dec 9, 1946 (Temporary President: Dr. Sachchidananda Sinha, Permanent: Dr. Rajendra Prasad).",
        "ta": "அரசியலமைப்பு நிர்ணய சபையின் முதல் கூட்டம்: 9 டிசம்பர் 1946 (தற்காலிக தலைவர்: டாக்டர் சச்சிதானந்த சின்ஹா, நிரந்தர தலைவர்: டாக்டர் ராஜேந்திர பிரசாத்).",
        "te": "రాజ్యాంగ పరిషత్ మొదటి సమావేశం: డిసెంబర్ 9, 1946 (తాత్కాలిక అధ్యక్షుడు: డాక్టర్ సచ్చిదానంద సిన్హా, శాశ్వత అధ్యక్షుడు: డాక్టర్ రాజేంద్ర ప్రసాద్).",
        "mr": "घटना समितीची पहिली बैठक: 9 डिसेंबर 1946 (तात्पुरते अध्यक्ष: डॉ. सच्चिदानंद सिन्हा, कायमस्वरूपी: डॉ. राजेंद्र प्रसाद).",
        "bn": "গণপরিষদের প্রথম অধিবেশন: ৯ ডিসেম্বর ১৯৪৬ (অস্থায়ী সভাপতি: ডঃ সচ্চিদানন্দ সিনহা, স্থায়ী: ডঃ রাজেন্দ্র প্রসাদ)।"
      },
      {
        "hi": "नीति आयोग (NITI Aayog): स्थापना 1 जनवरी 2015, पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।",
        "en": "NITI Aayog established Jan 1, 2015 replacing Planning Commission. Ex-officio Chairman is the Prime Minister of India.",
        "ta": "நிதி ஆயோக் (NITI Aayog): ஜனவரி 1, 2015 இல் திட்டக் குழுவிற்குப் பதிலாக அமைக்கப்பட்டது. இதன் பதவிவழித் தலைவர் இந்தியப் பிரதமர் ஆவார்.",
        "te": "నీతి ఆయోగ్: జనవరి 1, 2015న ప్రణాళికా సంఘం స్థానంలో ఏర్పాటైంది. దీని పదవీరీత్యా ఛైర్మన్ భారత ప్రధాన మంత్రి.",
        "mr": "नीती आयोग: 1 जानेवारी 2015 रोजी नियोजन आयोगाऐवजी स्थापना. पदसिद्ध अध्यक्ष भारताचे पंतप्रधान असतात.",
        "bn": "নীতি আয়োগ (NITI Aayog): ১ জানুয়ারি ২০১৫ তারিখে গঠিত হয়। এর পদাধিকারবলে সভাপতি হলেন ভারতের প্রধানমন্ত্রী।"
      },
      {
        "hi": "कर्क रेखा भारत के 8 राज्यों से गुजरती है: गुजरात, राजस्थान, मप्र, छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।",
        "en": "Tropic of Cancer passes through 8 Indian States: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.",
        "ta": "கடக ரேகை (Tropic of Cancer) இந்தியாவின் 8 மாநிலங்கள் வழியே செல்கிறது: குஜராத், ராஜஸ்தான், ம.பி, சத்தீஸ்கர், ஜார்க்கண்ட், மேற்கு வங்கம், திரிபுரா, மிசோரம்.",
        "te": "కర్కట రేఖ భారతదేశంలోని 8 రాష్ట్రాల గుండా వెళుతుంది: గుజరాత్, రాజస్థాన్, మధ్యప్రదేశ్, ఛత్తీస్‌గఢ్, జార్ఖండ్, పశ్చిమ బెంగాల్, త్రిపుర, మిజోరం.",
        "mr": "कर्कवृत्त भारतातील 8 राज्यांमधून जाते: गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगड, झारखंड, पश्चिम बंगाल, त्रिपुरा आणि मिझोराम.",
        "bn": "কর্কটক্রান্তি রেখা ভারতের ৮টি রাজ্যের ওপর দিয়ে গেছে: গুজরাট, রাজস্থান, মধ্যপ্রদেশ, ছত্তিশগড়, ঝাড়খণ্ড, পশ্চিমবঙ্গ, ত্রিপুরা ও মিজোরাম।"
      }
    ]
  }
];

let caCurrentQuestionIndex = 0;
let caUserAnswers = {}; // { questionId: selectedOptionIndex }


// Universal Multilingual Support & Strict Bilingual Rule for Current Affairs & Monthly Capsule
const CA_MULTILINGUAL_MAP = {
  "1": {
    "ta": {
      "q": "இந்திய விமானப்படையின் எந்த உள்நாட்டு இலகுரக போர் விமானம் (LCA) தனது முதல் வெளிநாட்டு பயிற்சியை வெற்றிகரமாக முடித்தது?",
      "opts": [
        "LCA தேஜஸ் (Tejas)",
        "HAL பிரசண்ட் (Prachand)",
        "சுகோய் Su-30MKI",
        "மிராஜ் 2000"
      ],
      "exp": "எல்சிஏ தேஜஸ் (LCA Tejas) இந்தியாவின் உள்நாட்டு 4.5 தலைமுறை போர் விமானமாகும்."
    },
    "te": {
      "q": "భారత వైమానిక దళానికి చెందిన ఏ స్వదేశీ తేలికపాటి యుద్ధ విమానం (LCA) మొదటి విదేశీ విన్యాసాలను విజయవంతంగా పూర్తి చేసింది?",
      "opts": [
        "LCA తేజస్ (Tejas)",
        "HAL ప్రచండ్ (Prachand)",
        "సుఖోయ్ Su-30MKI",
        "మిరాజ్ 2000"
      ],
      "exp": "LCA తేజస్ స్వదేశీ సింగిల్ ఇంజిన్ మల్టీరోల్ యుద్ధ విమానం."
    },
    "mr": {
      "q": "भारतीय हवाई दलाच्या कोणत्या स्वदेशी हलक्या लढाऊ विमानाने (LCA) आपला पहिला परदेशी युद्धाभ्यास यशस्वीपणे पूर्ण केला?",
      "opts": [
        "एलसीए तेजस (LCA Tejas)",
        "एचएएल प्रचंड (Prachand)",
        "सुखोई Su-30MKI",
        "मिराज 2000"
      ],
      "exp": "एलसीए तेजस हे भारताचे स्वदेशी हलके लढाऊ विमान आहे."
    }
  },
  "2": {
    "ta": {
      "q": "இஸ்ரோவின் சூரிய ஆய்வக விண்கலமான 'ஆதித்யா-L1' எந்த லாக்ராஞ்சியன் புள்ளியில் வெற்றிகரமாக நிலைநிறுத்தப்பட்டுள்ளது?",
      "opts": [
        "லாக்ராஞ்சியன் புள்ளி L1",
        "லாக்ராஞ்சியன் புள்ளி L2",
        "லாக்ராஞ்சியன் புள்ளி L4",
        "லாக்ராஞ்சியன் புள்ளி L5"
      ],
      "exp": "ஆதித்யா-L1 பூமியிலிருந்து சுமார் 15 லட்சம் கி.மீ தொலைவில் உள்ள லாக்ராஞ்சியன் புள்ளி 1 (L1) சுற்றியுள்ள ஹாலோ சுற்றுப்பாதையில் நிலைநிறுத்தப்பட்டுள்ளது."
    },
    "te": {
      "q": "ఇస్రో యొక్క సౌర పరిశీలనా ఉపగ్రహం 'ఆదిత్య-L1' ఏ లాగ్రాంజ్ బిందువు వద్ద విజయవంతంగా ప్రవేశపెట్టబడింది?",
      "opts": [
        "లాగ్రాంజ్ పాయింట్ L1",
        "లాగ్రాంజ్ పాయింట్ L2",
        "లాగ్రాంజ్ పాయింట్ L4",
        "లాగ్రాంజ్ పాయింట్ L5"
      ],
      "exp": "ఆదిత్య-L1 భూమికి 15 లక్షల కిలోమీటర్ల దూరంలో ఉన్న లాగ్రాంజ్ పాయింట్ 1 (L1) చుట్టూ ఉన్న కక్ష్యలో ప్రవేశపెట్టబడింది."
    }
  },
  "3": {
    "ta": {
      "q": "'பிஎம் சூர்ய கர்: முஃப்த் பிஜ்லி யோஜனா' திட்டத்தின் கீழ் தகுதியான குடும்பங்களுக்கு மாதம் தோறும் வழங்கப்படும் இலவச சூரிய மின்சாரம் எவ்வளவு?",
      "opts": [
        "300 யூனிட்கள் (300 Units)",
        "150 யூனிட்கள்",
        "200 யூனிட்கள்",
        "500 யூனிட்கள்"
      ],
      "exp": "பிரதமர் நரேந்திர மோடியால் தொடங்கப்பட்ட இத்திட்டம் ஒவ்வொரு மாதமும் 300 யூனிட் வரை இலவச சூரிய மின்சாரத்தை வழங்குகிறது."
    },
    "te": {
      "q": "'పీఎం సూర్య ఘర్: ముఫ్త్ బిజ్లీ యోజన' పథకం కింద అర్హత కలిగిన కుటుంబాలకు నెలకు గరిష్టంగా ఎంత ఉచిత సౌర విద్యుత్ అందించబడుతుంది?",
      "opts": [
        "300 యూనిట్లు (300 Units)",
        "150 యూనిట్లు",
        "200 యూనిట్లు",
        "500 యూనిట్లు"
      ],
      "exp": "ఈ పథకం ద్వారా నెలకు 300 యూనిట్ల వరకు ఉచిత విద్యుత్ అందించబడుతుంది."
    }
  },
  "4": {
    "ta": {
      "q": "இந்திய அரசியலமைப்பின் 124(6) வது பிரிவின் கீழ் இந்திய தலைமை நீதிபதிக்கு (CJI) பதவிப் பிரமாணம் செய்து வைப்பவர் யார்?",
      "opts": [
        "இந்திய குடியரசுத் தலைவர் (President of India)",
        "துணைக் குடியரசுத் தலைவர்",
        "பிரதமர்",
        "மக்களவை சபாநாயகர்"
      ],
      "exp": "பிரிவு 124(6) ன் படி உச்சநீதிமன்ற தலைமை நீதிபதிக்கு குடியரசுத் தலைவர் பதவிப் பிரமாணம் செய்து வைக்கிறார்."
    },
    "te": {
      "q": "భారత రాజ్యాంగంలోని 124(6) అధికరణ ప్రకారం భారత ప్రధాన న్యాయమూర్తి (CJI) చేత ఎవరు ప్రమాణ స్వీకారం చేయిస్తారు?",
      "opts": [
        "భారత రాష్ట్రపతి (President of India)",
        "భారత ఉపరాష్ట్రపతి",
        "ప్రధాన మంత్రి",
        "లోక్‌సభ స్పీకర్"
      ],
      "exp": "రాజ్యాంగంలోని 124(6) ప్రకారం రాష్ట్రపతి ప్రధాన న్యాయమూర్తికి ప్రమాణం చేయిస్తారు."
    }
  },
  "5": {
    "ta": {
      "q": "ஃபிடே கேண்டிடேட்ஸ் செஸ் போட்டியில் வென்று உலக சாம்பியன்ஷிப் பட்டத்திற்கு போட்டியிடும் இளைய இந்திய கிராண்ட்மாஸ்டர் யார்?",
      "opts": [
        "டி. குகேஷ் (D. Gukesh)",
        "ஆர். பிரக்ஞானந்தா",
        "விதித் குஜராத்தி",
        "அர்ஜுன் எரிகைசி"
      ],
      "exp": "17 வயதான தொம்மராஜு குகேஷ் கேண்டிடேட்ஸ் செஸ் போட்டியை வென்று வரலாறு படைத்தார்."
    },
    "te": {
      "q": "ఫిడే కాండిడేట్స్ చెస్ టోర్నమెంట్‌ను గెలుచుకున్న అత్యంత పిన్న వయస్కుడైన భారతీయ గ్రాండ్‌మాస్టర్ ఎవరు?",
      "opts": [
        "డి. గుకేశ్ (D. Gukesh)",
        "ఆర్. ప్రజ్ఞానంద",
        "విదిత్ గుజరాతీ",
        "అర్జున్ ఎరిగైసి"
      ],
      "exp": "17 ఏళ్ల డి. గుకేశ్ కాండిడేట్స్ గెలిచి సరికొత్త రికార్డు సృష్టించాడు."
    }
  }
};

function getActiveLanguage() {
  if (typeof getCurrentLanguage === 'function') return getCurrentLanguage();
  return localStorage.getItem('sarkari_lang') || 'hi';
}

// Deterministic Daily Rotation of Current Affairs
function getTodayCAQuestions() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istDate = new Date(utc + (3600000 * 5.5));
  const startOfYear = new Date(istDate.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((istDate - startOfYear) / (24 * 60 * 60 * 1000));
  
  // Rotate starting question index deterministically per day
  const offset = dayOfYear % CURRENT_AFFAIRS_QUIZ_DATA.length;
  const reordered = [];
  for (let i = 0; i < CURRENT_AFFAIRS_QUIZ_DATA.length; i++) {
    const idx = (i + offset) % CURRENT_AFFAIRS_QUIZ_DATA.length;
    reordered.push(CURRENT_AFFAIRS_QUIZ_DATA[idx]);
  }
  return reordered;
}

function renderCAQuiz() {
  const container = document.getElementById('caQuizCardContainer');
  const progressText = document.getElementById('caQuizProgressText');
  const progressBar = document.getElementById('caQuizProgressBar');
  if (!container) return;

  const activeList = getTodayCAQuestions();
  const total = activeList.length;
  const currentQ = activeList[caCurrentQuestionIndex];
  const userAns = caUserAnswers[currentQ.id];
  const isAnswered = userAns !== undefined;

  const lang = getActiveLanguage();
  const isEnglish = (lang === 'en');
  const multi = CA_MULTILINGUAL_MAP[currentQ.id] && CA_MULTILINGUAL_MAP[currentQ.id][lang];

  // Strict Bilingual Rule:
  // - If English: Primary = English, Secondary = Hindi with [🇮🇳 HINDI] badge
  // - If Regional (e.g. Tamil): Primary = Regional Language, Secondary = English with [🌐 ENGLISH] badge
  let displayPrimaryQ, displaySecondaryQ, secondaryBadge;
  if (isEnglish) {
    displayPrimaryQ = currentQ.qEn;
    displaySecondaryQ = currentQ.qHi;
    secondaryBadge = '🇮🇳 HINDI';
  } else {
    displayPrimaryQ = multi ? multi.q : (lang === 'hi' ? currentQ.qHi : (currentQ['q_' + lang] || currentQ.qHi));
    displaySecondaryQ = currentQ.qEn;
    secondaryBadge = '🌐 ENGLISH';
  }

  if (progressText) {
    progressText.innerText = `${isEnglish ? 'Question' : (lang === 'ta' ? 'வினா' : (lang === 'te' ? 'ప్రశ్న' : 'प्रश्न'))} ${caCurrentQuestionIndex + 1} / ${total}`;
  }
  if (progressBar) {
    const pct = Math.round(((caCurrentQuestionIndex + 1) / total) * 100);
    progressBar.style.width = `${pct}%`;
  }

  let optionsHtml = '';
  currentQ.options.forEach((opt, idx) => {
    const isSelected = userAns === idx;
    const isCorrect = opt.correct;
    
    // Format Option according to rule:
    // If English: English / Hindi
    // If Regional: Regional / English
    let optDisplay = '';
    const cleanEn = opt.text.split('(')[0].trim();
    const cleanHi = opt.text.includes('(') ? opt.text.slice(opt.text.indexOf('(') + 1).replace(')', '').trim() : opt.text;
    
    if (isEnglish) {
      optDisplay = cleanEn + (cleanHi ? ` / ${cleanHi}` : '');
    } else {
      let regOpt = (multi && multi.opts && multi.opts[idx]) ? multi.opts[idx] : cleanHi;
      optDisplay = `${regOpt} / ${cleanEn}`;
    }

    let btnClass = "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800";
    let icon = String.fromCharCode(65 + idx);

    if (isAnswered) {
      if (isCorrect) {
        btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
        icon = "✓";
      } else if (isSelected && !isCorrect) {
        btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-bold";
        icon = "✕";
      } else {
        btnClass = "border-slate-100 opacity-60 text-slate-400";
      }
    }

    optionsHtml += `
      <button type="button" 
              onclick="handleCAAnswerSelection(${currentQ.id}, ${idx})"
              ${isAnswered ? 'disabled' : ''}
              class="w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm font-semibold ${btnClass}">
        <div class="flex items-center space-x-3">
          <span class="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">
            ${icon}
          </span>
          <span>${optDisplay}</span>
        </div>
      </button>
    `;
  });

  let explanationHtml = '';
  if (isAnswered) {
    const isUserCorrect = currentQ.options[userAns]?.correct;
    const expText = isEnglish ? currentQ.explanationEn : (multi ? multi.exp : currentQ.explanationHi);
    const expSecondary = isEnglish ? currentQ.explanationHi : currentQ.explanationEn;

    explanationHtml = `
      <div class="mt-4 p-4 rounded-2xl ${isUserCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'} space-y-2 animate-fadeIn">
        <div class="flex items-center gap-2">
          <span class="text-base">${isUserCorrect ? '🎉' : '💡'}</span>
          <span class="text-xs font-bold ${isUserCorrect ? 'text-emerald-800' : 'text-rose-800'}">
            ${isUserCorrect ? (isEnglish ? 'Correct Answer!' : 'सही उत्तर!') : (isEnglish ? 'Answer Explanation:' : 'सही उत्तर की व्याख्या:')}
          </span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed font-medium">
          ${expText}
        </p>
        <p class="text-[11px] text-slate-500 italic border-t border-slate-200/60 pt-1.5">
          <span class="font-bold uppercase tracking-wider text-[10px] text-blue-600 mr-1">${secondaryBadge}:</span>${expSecondary}
        </p>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 uppercase tracking-wide">
          ${currentQ.category}
        </span>
        <span class="text-xs text-slate-400 font-mono">QID: #CA-2026-${currentQ.id}</span>
      </div>

      <!-- Question Text (Strict Bilingual Formatting) -->
      <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border-2 border-amber-300 dark:border-slate-700 space-y-2">
        <h3 class="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
          ${displayPrimaryQ}
        </h3>
        <div class="p-2.5 rounded-xl bg-blue-50/95 dark:bg-slate-950 border border-blue-200 dark:border-cyan-800 text-xs text-blue-950 dark:text-cyan-200 font-medium leading-relaxed">
          <span class="text-[10px] font-black uppercase text-blue-700 dark:text-cyan-400 mr-1.5 bg-blue-200/70 dark:bg-cyan-950 px-1.5 py-0.5 rounded">${secondaryBadge}</span>
          ${displaySecondaryQ}
        </div>
      </div>

      <!-- Options -->
      <div class="space-y-2.5 pt-2">
        ${optionsHtml}
      </div>

      <!-- Explanation Box -->
      ${explanationHtml}

      <!-- Navigation Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button type="button" 
                onclick="navigateCAQuestion(-1)"
                ${caCurrentQuestionIndex === 0 ? 'disabled' : ''}
                class="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed">
          ← ${isEnglish ? 'Previous' : 'पिछला (Prev)'}
        </button>

        ${caCurrentQuestionIndex < total - 1 ? `
          <button type="button" 
                  onclick="navigateCAQuestion(1)"
                  class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs">
            ${isEnglish ? 'Next →' : 'अगला (Next) →'}
          </button>
        ` : `
          <button type="button" 
                  onclick="finishCAQuiz()"
                  class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md">
            ${isEnglish ? 'View Scorecard 🎯' : 'स्कोर देखें (View Score) 🎯'}
          </button>
        `}
      </div>
    </div>
  `;
}

function handleCAAnswerSelection(questionId, selectedIdx) {
  if (caUserAnswers[questionId] !== undefined) return;
  caUserAnswers[questionId] = selectedIdx;
  renderCAQuiz();
}

function navigateCAQuestion(delta) {
  const total = CURRENT_AFFAIRS_QUIZ_DATA.length;
  const newIndex = caCurrentQuestionIndex + delta;
  if (newIndex >= 0 && newIndex < total) {
    caCurrentQuestionIndex = newIndex;
    renderCAQuiz();
  }
}

function finishCAQuiz() {
  const container = document.getElementById('caQuizCardContainer');
  if (!container) return;

  let correctCount = 0;
  let wrongCount = 0;
  let unattempted = 0;

  CURRENT_AFFAIRS_QUIZ_DATA.forEach(q => {
    const userAns = caUserAnswers[q.id];
    if (userAns === undefined) {
      unattempted++;
    } else if (q.options[userAns]?.correct) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const total = CURRENT_AFFAIRS_QUIZ_DATA.length;
  const accuracy = Math.round((correctCount / total) * 100);

  let badge = "उत्कृष्ट तैयारी (Outstanding)";
  let badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (accuracy < 50) {
    badge = "रिवीजन की सख्त जरूरत (Needs Revision)";
    badgeColor = "bg-rose-100 text-rose-800 border-rose-300";
  } else if (accuracy < 80) {
    badge = "अच्छा प्रयास, निरंतर अभ्यास करें (Good Effort)";
    badgeColor = "bg-amber-100 text-amber-800 border-amber-300";
  }

  container.innerHTML = `
    <div class="text-center py-6 px-4 space-y-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-50 border-4 border-indigo-200 text-3xl shadow-inner animate-bounce">
        🎯
      </div>
      <div>
        <h2 class="text-2xl font-black text-slate-900">क्विज परिणाम (Daily Quiz Scorecard)</h2>
        <p class="text-xs text-slate-500 mt-1">SarkariAI Real-Time Current Affairs Assessment</p>
      </div>

      <div class="inline-block px-4 py-1.5 rounded-full border text-xs font-bold ${badgeColor}">
        ${badge}
      </div>

      <div class="grid grid-cols-3 gap-3 max-w-sm mx-auto text-center">
        <div class="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
          <div class="text-2xl font-black text-emerald-700">${correctCount}</div>
          <div class="text-[11px] font-semibold text-emerald-800">सही उत्तर</div>
        </div>
        <div class="p-3 bg-rose-50 rounded-2xl border border-rose-200">
          <div class="text-2xl font-black text-rose-700">${wrongCount}</div>
          <div class="text-[11px] font-semibold text-rose-800">गलत उत्तर</div>
        </div>
        <div class="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
          <div class="text-2xl font-black text-indigo-700">${accuracy}%</div>
          <div class="text-[11px] font-semibold text-indigo-800">सटीकता</div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-3 pt-4">
        <button type="button" 
                onclick="resetCAQuiz()"
                class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all">
          🔄 पुनः अभ्यास करें (Retake Quiz)
        </button>
        <button type="button"
                onclick="reviewCAQuiz()"
                class="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all">
          📖 सभी प्रश्नों की व्याख्या देखें
        </button>
      </div>
    </div>
  `;
}

function resetCAQuiz() {
  caUserAnswers = {};
  caCurrentQuestionIndex = 0;
  renderCAQuiz();
}

function reviewCAQuiz() {
  caCurrentQuestionIndex = 0;
  renderCAQuiz();
}

function renderMonthlyCapsule() {
  const containers = document.querySelectorAll('.caMonthlyCapsuleContainer, #caMonthlyCapsuleContainer');
  if (!containers || containers.length === 0) return;

  const lang = (typeof getActiveLanguage === 'function') ? getActiveLanguage() : (localStorage.getItem('preferred_language') || 'hi');
  const isEnglish = (lang === 'en');

  let html = '';
  MONTHLY_CAPSULE_DATA.forEach((sec, idx) => {
    let itemsHtml = '';
    const catTitle = (!isEnglish && sec.category_i18n && sec.category_i18n[lang])
      ? sec.category_i18n[lang]
      : (isEnglish ? (sec.category_en || sec.category) : sec.category);

    sec.points.forEach((pt, pIdx) => {
      // If English: pt.en primary, pt.hi secondary
      // If Regional (Tamil, Telugu, Marathi, etc.): pt[lang] primary, pt.en secondary
      let primaryText = '';
      let secondaryText = '';
      let secBadge = '';

      if (isEnglish) {
        primaryText = pt.en || pt.hi;
        secondaryText = pt.hi || pt.en;
        secBadge = 'HINDI';
      } else {
        primaryText = pt[lang] || pt.ta || pt.hi;
        secondaryText = pt.en || pt.hi;
        secBadge = 'ENGLISH';
      }

      itemsHtml += `
        <li class="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all text-xs space-y-1">
          <div class="text-slate-900 dark:text-slate-100 font-bold leading-relaxed">
            <span class="text-indigo-600 dark:text-indigo-400 font-black mr-1.5">•</span>${primaryText}
          </div>
          <div class="text-slate-500 dark:text-slate-400 text-[11px] pl-3.5 italic flex items-center space-x-1.5">
            <span class="text-[9px] font-black uppercase text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">${secBadge}</span>
            <span>${secondaryText}</span>
          </div>
        </li>
      `;
    });

    html += `
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h4 class="font-bold text-sm sm:text-base text-slate-800 dark:text-white flex items-center gap-2">
            ${catTitle}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            ${sec.points.length} ${isEnglish ? 'Key Points' : 'முக்கிய குறிப்புகள் / मुख्य बिंदु'}
          </span>
        </div>
        <ul class="space-y-2">
          ${itemsHtml}
        </ul>
      </div>
    `;
  });

  containers.forEach(container => {
    container.innerHTML = html;
  });
}

function copyCACapsuleNotes() {
  let text = "📚 SarkariAI Daily Current Affairs & Static GK High-Yield Capsule 2026\n\n";
  MONTHLY_CAPSULE_DATA.forEach(sec => {
    text += `== ${sec.category} ==\n`;
    sec.points.forEach(pt => {
      text += `• ${pt.hi}\n  (${pt.en})\n`;
    });
    text += "\n";
  });

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('caCopyCapsuleBtn');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = "✓ नोट्स कॉपी हो गए (Copied)!";
      btn.classList.add("bg-emerald-600", "text-white");
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove("bg-emerald-600", "text-white");
      }, 2500);
    }
  }).catch(err => {
    if (typeof showAppAlert === 'function') {
      showAppAlert("Clipboard copy failed. Please select text manually.", 'Copy Notice', '📋');
    } else {
      alert("Clipboard copy failed. Please select text manually.");
    }
  });
}

function initCurrentAffairs() {
  renderCAQuiz();
  renderMonthlyCapsule();

  const copyBtn = document.getElementById('caCopyCapsuleBtn');
  if (copyBtn) {
    copyBtn.removeEventListener('click', copyCACapsuleNotes);
    copyBtn.addEventListener('click', copyCACapsuleNotes);
  }
}

// Global exposure
window.initCurrentAffairs = initCurrentAffairs;
window.handleCAAnswerSelection = handleCAAnswerSelection;
window.navigateCAQuestion = navigateCAQuestion;
window.finishCAQuiz = finishCAQuiz;
window.resetCAQuiz = resetCAQuiz;
window.reviewCAQuiz = reviewCAQuiz;
window.copyCACapsuleNotes = copyCACapsuleNotes;

document.addEventListener('DOMContentLoaded', initCurrentAffairs);


// Auto re-render on language switch
if (typeof window !== 'undefined') {
  window.addEventListener('languageChanged', () => {
    if (typeof renderCAQuiz === 'function') renderCAQuiz();
    if (typeof renderMonthlyCapsule === 'function') renderMonthlyCapsule();
  });
}

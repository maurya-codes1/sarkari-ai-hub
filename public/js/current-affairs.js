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
    category: "🚀 Science & Defense (विज्ञान व रक्षा)",
    points: [
      { hi: "इसरो ने इनसैट-3डीएस (INSAT-3DS) मौसम उपग्रह को जीएसएलवी-एफ14 (GSLV-F14) रॉकेट से सफलतापूर्वक कक्षा में स्थापित किया।", en: "ISRO launched meteorological satellite INSAT-3DS aboard GSLV-F14 from Sriharikota." },
      { hi: "भारत की पहली स्वदेशी 155mm स्मार्ट गोला बारूद प्रणाली IIT मद्रास और म्यूनिशन्स इंडिया लिमिटेड द्वारा विकसित की गई।", en: "India's first indigenous 155mm smart ammunition was co-developed by IIT Madras and Munitions India Ltd." },
      { hi: "डीआरडीओ ने ओडिशा तट पर अग्नि-प्राइम (Agni-Prime) नई पीढ़ी की बैलिस्टिक मिसाइल का सफल रात्रि परीक्षण किया।", en: "DRDO carried out successful night launch of New Generation Ballistic Missile Agni-Prime off Odisha coast." },
      { hi: "भारतीय नौसेना में पहली बार दो महिला अधिकारियों को युद्धपोत पर तैनात किया गया - सब लेफ्टिनेंट कुमुदिनी त्यागी व रीति सिंह।", en: "Indian Navy inducted specialized women combatants aboard frontline destroyers." }
    ]
  },
  {
    category: "🏆 Awards & Sports (पुरस्कार व खेल)",
    points: [
      { hi: "भारत के 49वें और 50वें भारत रत्न सम्मान क्रमशः कर्पूरी ठाकुर, लालकृष्ण आडवाणी, पी.वी. नरसिम्हा राव, चौधरी चरण सिंह और डॉ. एम.एस. स्वामीनाथन को मरणोपरांत/आजीवन सेवा हेतु दिए गए।", en: "Bharat Ratna awarded to Karpoori Thakur, L.K. Advani, P.V. Narasimha Rao, Chaudhary Charan Singh, and Dr. M.S. Swaminathan." },
      { hi: "रोहन बोपन्ना 43 वर्ष की उम्र में ऑस्ट्रेलियन ओपन पुरुष युगल जीतकर दुनिया के सबसे उम्रदराज नंबर 1 टेनिस खिलाड़ी बने।", en: "Rohan Bopanna became the oldest World No. 1 in men's doubles tennis after winning the Australian Open." },
      { hi: "शतरंज ओलंपियाड 2024 (बुडापेस्ट) में भारतीय पुरुष व महिला दोनों टीमों ने ऐतिहासिक दोहरा स्वर्ण पदक (Double Gold) जीता।", en: "Indian Open and Women's teams created history by winning historic double gold at the 45th Chess Olympiad in Budapest." }
    ]
  },
  {
    category: "🏛️ National & Policy (राष्ट्रीय घटनाक्रम व योजनाएं)",
    points: [
      { hi: "संसद के दोनों सदनों द्वारा 106वां संविधान संशोधन अधिनियम (नारी शक्ति वंदन अधिनियम) पारित हुआ, जो लोकसभा व विधानसभाओं में 33% महिला आरक्षण सुनिश्चित करता है।", en: "106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam) guarantees 33% reservation for women in Lok Sabha and Assemblies." },
      { hi: "उत्तराखंड समान नागरिक संहिता (UCC - Uniform Civil Code) लागू करने वाला आजादी के बाद देश का पहला राज्य बना।", en: "Uttarakhand became the first state in independent India to pass and notify the Uniform Civil Code (UCC) Bill." },
      { hi: "भारतीय रेलवे ने दुनिया के सबसे ऊंचे रेलवे पुल 'चिनाब ब्रिज' (359 मीटर ऊंचा) पर उधमपुर-श्रीनगर-बारामूला रेल लिंक में ट्रायल रन पूरा किया।", en: "Indian Railways successfully conducted trials on the world's highest railway arch bridge over the Chenab River in J&K." }
    ]
  },
  {
    category: "📚 Static GK High-Yield Matrix (अक्सर पूछे जाने वाले तथ्य)",
    points: [
      { hi: "संविधान सभा की पहली बैठक: 9 दिसंबर 1946 (अस्थायी अध्यक्ष: डॉ. सच्चिदानंद सिन्हा, स्थायी: डॉ. राजेंद्र प्रसाद)।", en: "First meeting of Constituent Assembly: Dec 9, 1946. Temporary President: Dr. Sachchidananda Sinha." },
      { hi: "नीति आयोग (NITI Aayog): स्थापना 1 जनवरी 2015, पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।", en: "NITI Aayog established Jan 1, 2015 replacing Planning Commission. Chairman is Prime Minister of India." },
      { hi: "कर्क रेखा भारत के 8 राज्यों से गुजरती है: गुजरात, राजस्थान, मप्र, छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम।", en: "Tropic of Cancer passes through 8 Indian States: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram." }
    ]
  }
];

let caCurrentQuestionIndex = 0;
let caUserAnswers = {}; // { questionId: selectedOptionIndex }

function renderCAQuiz() {
  const container = document.getElementById('caQuizCardContainer');
  const progressText = document.getElementById('caQuizProgressText');
  const progressBar = document.getElementById('caQuizProgressBar');
  if (!container) return;

  const total = CURRENT_AFFAIRS_QUIZ_DATA.length;
  const currentQ = CURRENT_AFFAIRS_QUIZ_DATA[caCurrentQuestionIndex];
  const userAns = caUserAnswers[currentQ.id];
  const isAnswered = userAns !== undefined;

  if (progressText) {
    progressText.innerText = `प्रश्न ${caCurrentQuestionIndex + 1} / ${total}`;
  }
  if (progressBar) {
    const pct = Math.round(((caCurrentQuestionIndex + 1) / total) * 100);
    progressBar.style.width = `${pct}%`;
  }

  let optionsHtml = '';
  currentQ.options.forEach((opt, idx) => {
    let btnClass = "border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/50 text-slate-800";
    let iconBadge = `<span class="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs mr-3 border border-slate-200">${String.fromCharCode(65 + idx)}</span>`;

    if (isAnswered) {
      if (opt.correct) {
        btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-300";
        iconBadge = `<span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mr-3">✓</span>`;
      } else if (userAns === idx) {
        btnClass = "border-rose-500 bg-rose-50 text-rose-900 font-semibold ring-2 ring-rose-300";
        iconBadge = `<span class="w-7 h-7 rounded-lg bg-rose-600 text-white font-bold flex items-center justify-center text-xs mr-3">✗</span>`;
      } else {
        btnClass = "border-slate-100 bg-slate-50/60 text-slate-400 opacity-60";
      }
    }

    optionsHtml += `
      <button type="button" 
              onclick="handleCAAnswerSelection(${currentQ.id}, ${idx})"
              ${isAnswered ? 'disabled' : ''}
              class="w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center shadow-xs text-sm ${btnClass}">
        ${iconBadge}
        <span class="flex-1">${opt.text}</span>
      </button>
    `;
  });

  let explanationHtml = '';
  if (isAnswered) {
    const isCorrect = currentQ.options[userAns]?.correct;
    explanationHtml = `
      <div class="mt-4 p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50/80 border-emerald-200' : 'bg-amber-50/80 border-amber-200'} animate-fade-in text-xs leading-relaxed space-y-2">
        <div class="flex items-center gap-2 font-bold ${isCorrect ? 'text-emerald-800' : 'text-amber-900'}">
          <span>${isCorrect ? '🎉 सही उत्तर (Correct Answer)!' : '⚠️ सही उत्तर विकल्प देखें (Explanation):'}</span>
        </div>
        <p class="text-slate-800"><strong>हिंदी:</strong> ${currentQ.explanationHi}</p>
        <p class="text-slate-600"><strong>English:</strong> ${currentQ.explanationEn}</p>
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

      <!-- Question Text (Bilingual) -->
      <div class="space-y-1.5">
        <h3 class="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          ${currentQ.qHi}
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 italic">
          ${currentQ.qEn}
        </p>
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
          ← पिछला (Prev)
        </button>

        ${caCurrentQuestionIndex < total - 1 ? `
          <button type="button" 
                  onclick="navigateCAQuestion(1)"
                  class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs">
            अगला (Next) →
          </button>
        ` : `
          <button type="button" 
                  onclick="finishCAQuiz()"
                  class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md">
            स्कोर देखें (View Score) 🎯
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
  const container = document.getElementById('caMonthlyCapsuleContainer');
  if (!container) return;

  let html = '';
  MONTHLY_CAPSULE_DATA.forEach((sec, idx) => {
    let itemsHtml = '';
    sec.points.forEach((pt, pIdx) => {
      itemsHtml += `
        <li class="p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-xs space-y-1">
          <div class="text-slate-800 font-medium leading-relaxed">
            <span class="text-indigo-600 font-bold mr-1.5">•</span>${pt.hi}
          </div>
          <div class="text-slate-500 text-[11px] pl-3.5 italic">
            ${pt.en}
          </div>
        </li>
      `;
    });

    html += `
      <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-100">
          <h4 class="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2">
            ${sec.category}
          </h4>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
            ${sec.points.length} मुख्य बिंदु
          </span>
        </div>
        <ul class="space-y-2">
          ${itemsHtml}
        </ul>
      </div>
    `;
  });

  container.innerHTML = html;
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

const fs = require('fs');

// Fresh Social Science Questions (Bilingual)
const freshSocial = [
  {
    topic: "यूरोप में राष्ट्रवाद का उदय (Rise of Nationalism in Europe)",
    q: "वियना कांग्रेस (Congress of Vienna) 1815 की अध्यक्षता किस ऑस्ट्रियाई चांसलर ने की थी?\n[English: Who hosted the Congress of Vienna in 1815?]",
    options: [
      "A) ड्यूक मेटरनिख / Duke Metternich",
      "B) ऑटो वॉन बिस्मार्क / Otto von Bismarck",
      "C) ज्यूसेपे मेत्सिनी / Giuseppe Mazzini",
      "D) लुई फिलिप / Louis Philippe"
    ],
    correct: 0,
    ans: "A) ड्यूक मेटरनिख / Duke Metternich",
    exp: "💡 सही उत्तर: A) ड्यूक मेटरनिख। वियना संधि 1815 का मुख्य उद्देश्य नेपोलियन द्वारा यूरोप में किए गए बदलावों को खत्म कर रूढ़िवादी व्यवस्था बहाल करना था।"
  },
  {
    topic: "यूरोप में राष्ट्रवाद (Unification of Italy)",
    q: "'यंग इटली' (Young Italy) नामक गुप्त क्रांतिकारी संगठन की स्थापना किसने की थी?\n[English: Who founded the secret revolutionary society 'Young Italy'?]",
    options: [
      "A) ज्यूसेपे मेत्सिनी (1831) / Giuseppe Mazzini",
      "B) काउंट कावूर / Count Cavour",
      "C) गैरीबाल्डी / Garibaldi",
      "D) विक्टर इमैनुएल द्वितीय / Victor Emmanuel II"
    ],
    correct: 0,
    ans: "A) ज्यूसेपे मेत्सिनी। मेत्सिनी ने मार्सेई में यंग इटली और बर्न में यंग यूरोप की स्थापना की।"
  },
  {
    topic: "जर्मनी का एकीकरण (Unification of Germany)",
    q: "जर्मनी के एकीकरण का प्रमुख वास्तुकार (आर्किटेक्ट) किसे माना जाता है जिसने 'रक्त और लौह' की नीति अपनाई?\n[English: Who is considered the architect of German unification following 'Blood and Iron' policy?]",
    options: [
      "A) ऑटो वॉन बिस्मार्क / Otto von Bismarck",
      "B) विलियम प्रथम / Kaiser William I",
      "C) हिटलर / Adolf Hitler",
      "D) फ्रेडरिक विल्हेम / Friedrich Wilhelm"
    ],
    correct: 0,
    ans: "A) ऑटो वॉन बिस्मार्क। प्रशा के चांसलर बिस्मार्क ने तीन युद्धों (डेनमार्क, ऑस्ट्रिया, फ्रांस) के बाद 1871 में एकीकृत जर्मन साम्राज्य की स्थापना की।"
  },
  {
    topic: "भारत में राष्ट्रवाद (Rowlatt Act 1919)",
    q: "रौलट एक्ट (काला कानून) 1919 का मुख्य प्रावधान क्या था?\n[English: What was the main provision of the Rowlatt Act 1919?]",
    options: [
      "A) बिना मुकदमा चलाए किसी भी व्यक्ति को 2 वर्ष तक जेल में बंद रखना / Detention of political prisoners without trial for up to 2 years",
      "B) केवल प्रेस पर प्रतिबंध लगाना / Only press censorship",
      "C) लगान दोगुना करना / Doubling tax",
      "D) हथियार रखने पर पूर्ण प्रतिबंध / Ban on arms"
    ],
    correct: 0,
    ans: "A) बिना मुकदमा चलाए 2 वर्ष तक नजरबंदी। इसे 'बिना वकील, बिना दलील, बिना अपील' का कानून कहा गया जिसके विरोध में 13 अप्रैल 1919 को जलियांवाला बाग सभा हुई थी।"
  },
  {
    topic: "भारत में राष्ट्रवाद (Chauri Chaura Incident)",
    q: "महात्मा गांधी ने 1922 में असहयोग आंदोलन को किस हिंसक घटना के कारण अचानक वापस ले लिया था?\n[English: Due to which violent incident did Mahatma Gandhi withdraw the Non-Cooperation Movement in 1922?]",
    options: [
      "A) चौरी-चौरा कांड (गोरखपुर, यूपी) / Chauri Chaura incident (Feb 1922)",
      "B) काकोरी ट्रेन एक्शन / Kakori action",
      "C) जलियांवाला बाग हत्याकांड / Jallianwala massacre",
      "D) मेरठ षड्यंत्र / Meerut conspiracy"
    ],
    correct: 0,
    ans: "A) चौरी-चौरा कांड। 4 फरवरी 1922 को गोरखपुर (यूपी) के चौरी-चौरा में गुस्साई भीड़ ने थाने में आग लगा दी जिसमें 22 पुलिसकर्मी मारे गए। गांधी जी ने 12 फरवरी को आंदोलन स्थगित कर दिया।"
  },
  {
    topic: "संसाधन एवं विकास (Resource Planning)",
    q: "संसाधन होते नहीं, बनते हैं' - यह प्रसिद्ध कथन किस प्रसिद्ध भूगोलवेत्ता का है?\n[English: 'Resources are not, they become' - This famous quote belongs to:]",
    options: [
      "A) जिम्मरमैन / Erich Zimmermann",
      "B) महात्मा गांधी / Mahatma Gandhi",
      "C) रैटजेल / Friedrich Ratzel",
      "D) हम्बोल्ट / Alexander von Humboldt"
    ],
    correct: 0,
    ans: "A) जिम्मरमैन (Erich Zimmermann)। प्रकृति में मौजूद वस्तुएं मानवीय ज्ञान और तकनीक के उपयोग से ही उपयोगी संसाधन बनती हैं।"
  },
  {
    topic: "कृषि (Agriculture - Cropping Seasons)",
    q: "भारत में रबी (Rabi) की प्रमुख फसल कौन सी है जो शीत ऋतु में बोई जाती है?\n[English: Which of the following is a major Rabi crop sown in winter in India?]",
    options: [
      "A) गेहूं, चना और सरसों / Wheat, Gram and Mustard",
      "B) धान (चावल), मक्का और ज्वार / Rice, Maize and Jowar (Kharif)",
      "C) तरबूज और खीरा / Watermelon and Cucumber (Zaid)",
      "D) कपास और जूट / Cotton and Jute"
    ],
    correct: 0,
    ans: "A) गेहूं, चना, सरसों और मटर रबी की फसलें हैं जो अक्टूबर-दिसंबर में बोई जाती हैं और अप्रैल-जून में काटी जाती हैं।"
  },
  {
    topic: "खनिज तथा ऊर्जा संसाधन (Minerals - Iron Ore)",
    q: "भारत में सर्वोत्तम गुणवत्ता वाला चुंबकीय लौह अयस्क (Magnetic Iron Ore) कौन सा है?\n[English: Which is the finest iron ore with very high content of iron up to 70%?]",
    options: [
      "A) मैग्नेटाइट (Fe₃O₄ - 70% लोहा) / Magnetite",
      "B) हेमेटाइट (Fe₂O₃ - 50-60%) / Haematite",
      "C) लिमोनाइट / Limonite",
      "D) सिडेराइट / Siderite"
    ],
    correct: 0,
    ans: "A) मैग्नेटाइट (Fe₃O₄)। इसमें 70% तक लौहांश होता है और इसमें उत्कृष्ट चुंबकीय गुण होते हैं। हेमेटाइट औद्योगिक रूप से सबसे अधिक प्रयोग होने वाला अयस्क है।"
  },
  {
    topic: "जल संसाधन (Water Resources - Multi-purpose Projects)",
    q: "स्वतंत्र भारत की पहली बहुउद्देशीय नदी घाटी परियोजना (First Multipurpose River Valley Project) कौन सी थी?\n[English: Which was the first multipurpose river valley project of independent India?]",
    options: [
      "A) दामोदर घाटी परियोजना (DVC 1948) / Damodar Valley Project",
      "B) भाखड़ा नांगल परियोजना / Bhakra Nangal Project",
      "C) हीराकुड बांध परियोजना / Hirakud Dam Project",
      "D) तुंगभद्रा परियोजना / Tungabhadra Project"
    ],
    correct: 0,
    ans: "A) दामोदर घाटी निगम (DVC 1948)। यह अमेरिका की टेनेसी वैली अथॉरिटी (TVA) के मॉडल पर बनाई गई थी। दामोदर नदी को 'बंगाल का शोक' कहा जाता था।"
  },
  {
    topic: "संघवाद (Federalism - Decentralisation)",
    q: "संविधान के 73वें और 74वें संशोधन (1992) द्वारा भारत में किस त्रिस्तरीय व्यवस्था को संवैधानिक दर्जा दिया गया?\n[English: By 73rd and 74th Amendments (1992), which system was given constitutional status?]",
    options: [
      "A) पंचायती राज एवं नगर पालिकाएं / Panchayati Raj and Municipalities",
      "B) राज्यपाल व्यवस्था / Governor system",
      "C) योजना आयोग / Planning Commission",
      "D) निर्वाचन आयोग / Election Commission"
    ],
    correct: 0,
    ans: "A) पंचायती राज और नगर पालिकाएं। 73वां संशोधन ग्रामीण स्थानीय स्वशासन (भाग 9, 11वीं अनुसूची) तथा 74वां शहरी स्थानीय शासन (भाग 9A, 12वीं अनुसूची) से संबंधित है।"
  },
  {
    topic: "लोकतंत्र और विविधता (Gender, Religion and Caste)",
    q: "भारत की संसद में महिलाओं के लिए 33% आरक्षण का ऐतिहासिक प्रावधान किस संविधान संशोधन अधिनियम द्वारा किया गया?\n[English: 33% reservation for women in Lok Sabha and State Assemblies was enacted by which Amendment?]",
    options: [
      "A) 106वां संविधान संशोधन अधिनियम (नारी शक्ति वंदन) / 106th Amendment Act 2023",
      "B) 103वां संशोधन / 103rd Amendment",
      "C) 101वां संशोधन / 101st Amendment",
      "D) 91वां संशोधन / 91st Amendment"
    ],
    correct: 0,
    ans: "A) 106वां संविधान संशोधन अधिनियम 2023 ('नारी शक्ति वंदन अधिनियम')। इसके तहत लोकसभा और राज्य विधानसभाओं में महिलाओं को एक-तिहाई (33%) सीटें आरक्षित की गई हैं।"
  },
  {
    topic: "विकास (Development - HDI)",
    q: "विश्व बैंक की 'विश्व विकास रिपोर्ट' देशों का वर्गीकरण करने के लिए किस मुख्य मापदंड का प्रयोग करती है?\n[English: Which main criterion does the World Bank use in classifying different countries?]",
    options: [
      "A) प्रति व्यक्ति आय (औसत आय) / Per Capita Income (Average Income)",
      "B) कुल राष्ट्रीय आय / Total National Income",
      "C) साक्षरता दर / Literacy Rate",
      "D) शिशु मृत्यु दर / Infant Mortality Rate"
    ],
    correct: 0,
    ans: "A) प्रति व्यक्ति आय (Per Capita Income)। देश की कुल राष्ट्रीय आय को कुल जनसंख्या से भाग देने पर प्रति व्यक्ति आय प्राप्त होती है।"
  },
  {
    topic: "भारतीय अर्थव्यवस्था के क्षेत्रक (Sectors of Economy)",
    q: "कृषि, वानिकी, मत्स्य पालन और खनन अर्थव्यवस्था के किस क्षेत्रक (Sector) के अंतर्गत आते हैं?\n[English: Agriculture, forestry, fishing and mining fall under which sector of economy?]",
    options: [
      "A) प्राथमिक क्षेत्रक / Primary Sector",
      "B) द्वितीयक क्षेत्रक (औद्योगिक) / Secondary Sector",
      "C) तृतीयक क्षेत्रक (सेवा) / Tertiary Sector",
      "D) चतुर्थक क्षेत्रक / Quaternary Sector"
    ],
    correct: 0,
    ans: "A) प्राथमिक क्षेत्रक। प्राकृतिक संसाधनों के सीधे दोहन से होने वाली आर्थिक गतिविधियां प्राथमिक क्षेत्रक में आती हैं। विनिर्माण द्वितीयक तथा परिवहन, बैंकिंग तृतीयक में आते हैं।"
  },
  {
    topic: "मुद्रा और साख (Money and Credit - SHGs)",
    q: "स्वयं सहायता समूह (Self Help Group - SHG) में बचत और ऋण संबंधी अधिकांश निर्णय किसके द्वारा लिए जाते हैं?\n[English: Most of the decisions regarding savings and loan activities in an SHG are taken by:]",
    options: [
      "A) समूह के सदस्यों द्वारा / By the members of the group",
      "B) बैंक प्रबंधक द्वारा / Bank Manager",
      "C) ग्राम प्रधान द्वारा / Village Pradhan",
      "D) गैर-सरकारी संगठन (NGO) द्वारा"
    ],
    correct: 0,
    ans: "A) समूह के सदस्यों द्वारा। 15-20 महिलाओं का समूह नियमित बचत करता है और आपस में बिना गारंटी के कम ब्याज पर ऋण देने का निर्णय स्वयं लोकतांत्रिक तरीके से लेता है।"
  },
  {
    topic: "वैश्वीकरण (Globalisation - MNCs)",
    q: "बहुराष्ट्रीय कंपनियां (MNCs) अपने उत्पादन केंद्र उन स्थानों पर क्यों स्थापित करती हैं?\n[English: Why do Multinational Corporations (MNCs) set up production units in specific locations?]",
    options: [
      "A) जहां सस्ता श्रम और अन्य संसाधन सुलभ हों / Where cheap labour and resources are easily available",
      "B) जहां कर की दर सबसे अधिक हो / High tax rates",
      "C) केवल अपने गृह देश में / Only in home country",
      "D) जहां बाजार बहुत दूर हो"
    ],
    correct: 0,
    ans: "A) सस्ता श्रम और कम उत्पादन लागत। MNCs का मुख्य लक्ष्य उत्पादन लागत कम करके अधिकतम लाभ कमाना होता है।"
  }
];

console.log('Fresh social science questions prepared:', freshSocial.length);

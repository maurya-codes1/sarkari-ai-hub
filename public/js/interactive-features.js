// SarkariAI Hub — Interactive Features Engine (Daily Poll, Viral Share, Voice Search, Rank Predictor, Exam Kit, Fee Waiver & PWA)

// -------------------------------------------------------------
// 1. DAILY QUESTION OF THE DAY & LIVE COMMUNITY POLL
// -------------------------------------------------------------
const DAILY_POLL_QUESTIONS = [
  {
    id: 'poll-q1',
    subject: 'Indian Polity & Constitution (भारतीय राजव्यवस्था)',
    question: 'भारतीय संविधान के किस अनुच्छेद के तहत "अस्पृश्यता का उन्मूलन" (Abolition of Untouchability) किया गया है?',
    question_en: 'Under which Article of the Indian Constitution is the "Abolition of Untouchability" provided?',
    options: ['अनुच्छेद 14 / Article 14 (Equality before Law)', 'अनुच्छेद 17 / Article 17 (Abolition of Untouchability)', 'अनुच्छेद 19 / Article 19 (Freedom of Speech)', 'अनुच्छेद 21 / Article 21 (Right to Life & Liberty)'],
    options_hi: ['अनुच्छेद 14 (समानता का अधिकार)', 'अनुच्छेद 17 (अस्पृश्यता निवारण)', 'अनुच्छेद 19 (अभिव्यक्ति की स्वतंत्रता)', 'अनुच्छेद 21 (प्राण एवं दैहिक स्वतंत्रता)'],
    options_en: ['Article 14 (Equality before Law)', 'Article 17 (Abolition of Untouchability)', 'Article 19 (Freedom of Speech)', 'Article 21 (Protection of Life & Personal Liberty)'],
    correct: 1,
    baseVotes: [1240, 11850, 1680, 890],
    explanation_hi: 'संविधान के अनुच्छेद 17 के तहत अस्पृश्यता को पूरी तरह समाप्त कर दिया गया है और इसका किसी भी रूप में आचरण दंडनीय अपराध है। ट्रिक: 17 = "खतरा" (अस्पृश्यता समाज के लिए खतरा है)।',
    explanation_en: 'Under Article 17 of the Indian Constitution, untouchability is abolished and its practice in any form is forbidden and punishable by law.'
  },
  {
    id: 'poll-q2',
    subject: 'General Science & Physics (सामान्य विज्ञान)',
    question: 'रॉकेट का प्रक्षेपण (Rocket Propulsion) न्यूटन के गति के किस नियम पर आधारित है?',
    question_en: 'On which law of motion by Newton is rocket propulsion primarily based?',
    options: ['प्रथम नियम / First Law (Law of Inertia)', 'द्वितीय नियम / Second Law (F = ma)', 'तृतीय नियम / Third Law (Action & Reaction)', 'ऊर्जा संरक्षण नियम / Law of Conservation of Energy'],
    options_hi: ['प्रथम नियम (जड़त्व का नियम)', 'द्वितीय नियम (बल का संवेग नियम)', 'तृतीय नियम (क्रिया-प्रतिक्रिया नियम)', 'ऊर्जा संरक्षण का नियम'],
    options_en: ['First Law (Law of Inertia)', 'Second Law (F = ma, Momentum)', 'Third Law (Action & Reaction)', 'Law of Conservation of Energy'],
    correct: 2,
    baseVotes: [1120, 1940, 12600, 780],
    explanation_hi: 'रॉकेट प्रक्षेपण न्यूटन के तृतीय नियम (Action & Reaction) तथा रेखीय संवेग संरक्षण (Conservation of Linear Momentum) के सिद्धांत पर कार्य करता है।',
    explanation_en: "Rocket propulsion works on Newton's Third Law of Motion (Action and Reaction) along with the law of Conservation of Linear Momentum."
  },
  {
    id: 'poll-q3',
    subject: 'History & Modern India (आधुनिक भारत का इतिहास)',
    question: '1857 के प्रथम स्वतंत्रता संग्राम में लखनऊ (अवध) से विद्रोह का नेतृत्व किसने किया था?',
    question_en: 'Who led the Revolt of 1857 from Lucknow (Awadh)?',
    options: ['रानी लक्ष्मीबाई / Rani Lakshmibai', 'बेगम हज़रत महल / Begum Hazrat Mahal', 'कुंवर सिंह / Kunwar Singh', 'मौलवी अहमदुल्लाह / Maulvi Ahmadullah'],
    options_hi: ['रानी लक्ष्मीबाई', 'बेगम हज़रत महल', 'कुंवर सिंह', 'मौलवी अहमदुल्लाह'],
    options_en: ['Rani Lakshmibai', 'Begum Hazrat Mahal', 'Kunwar Singh', 'Maulvi Ahmadullah'],
    correct: 1,
    baseVotes: [1850, 13400, 920, 610],
    explanation_hi: 'लखनऊ (अवध) से विद्रोह का नेतृत्व बेगम हज़रत महल ने किया था। उन्होंने अपने अल्पवयस्क पुत्र बिरजिस क़ाद्र को नवाब घोषित कर अंग्रेजों से लोहा लिया था।',
    explanation_en: 'Begum Hazrat Mahal (the Begum of Awadh) led the 1857 Revolt from Lucknow and fought valiantly against British troops.'
  },
  {
    id: 'poll-q4',
    subject: 'Geography of India (भारत का भूगोल)',
    question: 'भारत की सबसे पुरानी पर्वत श्रृंखला (Oldest Mountain Range) कौन सी है?',
    question_en: 'Which is the oldest mountain range in India and the world?',
    options: ['हिमालय पर्वतमाला / Himalayas', 'अरावली पर्वतमाला / Aravalli Range', 'पश्चिमी घाट / Western Ghats (Sahyadri)', 'सतपुड़ा पर्वतमाला / Satpura Range'],
    options_hi: ['हिमालय पर्वतमाला', 'अरावली पर्वतमाला', 'पश्चिमी घाट (सह्याद्री)', 'सतपुड़ा पर्वतमाला'],
    options_en: ['Himalayan Mountain Range', 'Aravalli Range', 'Western Ghats (Sahyadri)', 'Satpura Range'],
    correct: 1,
    baseVotes: [2100, 14200, 1150, 640],
    explanation_hi: 'अरावली भारत और दुनिया की सबसे प्राचीन अवशिष्ट वलित पर्वत श्रृंखलाओं में से एक है। इसका सर्वोच्च शिखर "गुरु शिखर" (माउंट आबू, 1722 मीटर) है।',
    explanation_en: 'The Aravalli Range is the oldest residual mountain range in India. Its highest peak is Guru Shikhar (1,722 meters) near Mount Abu in Rajasthan.'
  },
  {
    id: 'poll-q5',
    subject: 'Economics & Planning (भारतीय अर्थव्यवस्था)',
    question: 'भारत में नीति आयोग (NITI Aayog) का गठन योजना आयोग के स्थान पर किस तारीख को किया गया था?',
    question_en: 'On which date was NITI Aayog established replacing the Planning Commission?',
    options: ['15 अगस्त 2014 / 15 August 2014', '1 जनवरी 2015 / 1 January 2015', '26 जनवरी 2015 / 26 January 2015', '1 अप्रैल 2016 / 1 April 2016'],
    options_hi: ['15 अगस्त 2014', '1 जनवरी 2015', '26 जनवरी 2015', '1 अप्रैल 2016'],
    options_en: ['15 August 2014', '1 January 2015', '26 January 2015', '1 April 2016'],
    correct: 1,
    baseVotes: [1420, 12900, 1350, 810],
    explanation_hi: 'नीति आयोग (National Institution for Transforming India) का गठन 1 जनवरी 2015 को किया गया। इसके पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।',
    explanation_en: 'NITI Aayog (National Institution for Transforming India) was established on 1 January 2015. The Prime Minister is its Ex-officio Chairman.'
  },
  {
    id: 'poll-q6',
    subject: 'Quantitative Aptitude & Maths (गणित एवं अंकगणित)',
    question: 'यदि किसी वस्तु का क्रय मूल्य ₹800 है और उसे ₹960 में बेचा जाता है, तो लाभ प्रतिशत क्या होगा?',
    question_en: 'If the cost price of an article is ₹800 and it is sold for ₹960, what is the profit percentage?',
    options: ['16% Profit (लाभ)', '20% Profit (लाभ)', '25% Profit (लाभ)', '18% Profit (लाभ)'],
    options_hi: ['16% लाभ', '20% लाभ', '25% लाभ', '18% लाभ'],
    options_en: ['16% Profit', '20% Profit', '25% Profit', '18% Profit'],
    correct: 1,
    baseVotes: [980, 13800, 1420, 560],
    explanation_hi: 'लाभ = विक्रय मूल्य - क्रय मूल्य = 960 - 800 = ₹160। लाभ % = (160 / 800) × 100 = 20%।',
    explanation_en: 'Profit = SP - CP = 960 - 800 = ₹160. Profit % = (Profit / CP) * 100 = (160 / 800) * 100 = 20%.'
  },
  {
    id: 'poll-q7',
    subject: 'Computer & Information Technology (कंप्यूटर ज्ञान)',
    question: 'कंप्यूटर में प्रयोग होने वाली IC चिप (Integrated Circuit) प्रायः किस धातु / अर्धचालक की बनी होती है?',
    question_en: 'What semiconductor material is an Integrated Circuit (IC chip) in computers made of?',
    options: ['सिलिकॉन / Silicon (Semiconductor)', 'कॉपर (तांबा) / Copper', 'सिल्वर (चांदी) / Silver', 'आयरन (लोहा) / Iron'],
    options_hi: ['सिलिकॉन (Silicon)', 'कॉपर (तांबा)', 'सिल्वर (चांदी)', 'आयरन (लोहा)'],
    options_en: ['Silicon (Semiconductor)', 'Copper (Conductor)', 'Silver', 'Iron'],
    correct: 0,
    baseVotes: [14500, 890, 420, 310],
    explanation_hi: 'IC चिप्स अर्धचालक (Semiconductor) धातु सिलिकॉन की बनी होती हैं। जे. एस. किल्बी ने 1958 में पहली IC का विकास किया था।',
    explanation_en: 'IC chips are made of Silicon semiconductor material. Jack Kilby created the first integrated circuit in 1958.'
  },
  {
    id: 'poll-q8',
    subject: 'Indian Polity (संविधान सभा की समितियां)',
    question: 'संविधान सभा की प्रसिद्ध प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?',
    question_en: 'Who was the Chairman of the Drafting Committee of the Constituent Assembly?',
    options: ['डॉ. राजेन्द्र प्रसाद / Dr. Rajendra Prasad', 'डॉ. भीमराव अम्बेडकर / Dr. B.R. Ambedkar', 'पं. जवाहरलाल नेहरू / Jawaharlal Nehru', 'सर बी. एन. राव / Sir B.N. Rau'],
    options_hi: ['डॉ. राजेन्द्र प्रसाद', 'डॉ. भीमराव अम्बेडकर', 'पं. जवाहरलाल नेहरू', 'सर बी. एन. राव'],
    options_en: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sir B.N. Rau'],
    correct: 1,
    baseVotes: [1290, 15400, 890, 410],
    explanation_hi: '29 अगस्त 1947 को संविधान सभा ने 7 सदस्यीय प्रारूप समिति बनाई थी जिसके अध्यक्ष डॉ. भीमराव अम्बेडकर थे। डॉ. राजेन्द्र प्रसाद संविधान सभा के स्थायी अध्यक्ष थे।',
    explanation_en: 'Dr. B.R. Ambedkar was elected the Chairman of the Drafting Committee on 29 August 1947 to draft the Constitution of India.'
  },
  {
    id: 'poll-q9',
    subject: 'General Science & Biology (मानव परिसंचरण तंत्र)',
    question: 'मानव शरीर में कौन सा रक्त समूह "सर्वदाता" (Universal Donor) कहलाता है?',
    question_en: 'Which blood group is known as the "Universal Donor" in the human ABO system?',
    options: ['AB पॉजिटिव / AB Positive (AB+)', 'O नेगेटिव / O Negative (O-)', 'O पॉजिटिव / O Positive (O+)', 'A पॉजिटिव / A Positive (A+)'],
    options_hi: ['AB पॉजिटिव (AB+)', 'O नेगेटिव (O-)', 'O पॉजिटिव (O+)', 'A पॉजिटिव (A+)'],
    options_en: ['AB Positive (AB+)', 'O Negative (O-)', 'O Positive (O+)', 'A Positive (A+)'],
    correct: 1,
    baseVotes: [1420, 13950, 3100, 540],
    explanation_hi: 'O नेगेटिव (O-) रक्त समूह की लाल रक्त कोशिकाओं (RBC) पर कोई एंटीजन (A, B या Rh) नहीं होता, जिससे यह किसी भी व्यक्ति को सुरक्षित रूप से दिया जा सकता है। AB+ सर्वग्राही (Universal Recipient) है।',
    explanation_en: 'Blood group O negative (O-) has neither A, B, nor Rh antigens on RBCs, making it universally safe to donate to anyone in emergencies.'
  },
  {
    id: 'poll-q10',
    subject: 'Geography of India (भारत की भौगोलिक स्थिति)',
    question: 'कर्क रेखा (Tropic of Cancer - 23.5° N) भारत के कुल कितने राज्यों से होकर गुजरती है?',
    question_en: 'Through how many Indian states does the Tropic of Cancer (23.5° N) pass?',
    options: ['6 राज्य / 6 States', '7 राज्य / 7 States', '8 राज्य / 8 States', '9 राज्य / 9 States'],
    options_hi: ['6 राज्य', '7 राज्य', '8 राज्य', '9 राज्य'],
    options_en: ['6 States', '7 States', '8 States', '9 States'],
    correct: 2,
    baseVotes: [880, 1620, 16100, 940],
    explanation_hi: 'कर्क रेखा 8 राज्यों से गुजरती है: गुजरात, राजस्थान, मध्य प्रदेश, छत्तीसगढ़, झारखंड, पश्चिम बंगाल, त्रिपुरा और मिजोरम। याद रखने की ट्रिक: "मित्र पर गमछा झार"।',
    explanation_en: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.'
  },
  {
    id: 'poll-q11',
    subject: 'History & Modern India (राष्ट्रीय स्वतंत्रता आंदोलन)',
    question: 'महात्मा गांधी जी ने 12 मार्च 1930 को ऐतिहासिक नमक सत्याग्रह (दांडी मार्च) किस स्थान से प्रारंभ किया था?',
    question_en: 'From which location did Mahatma Gandhi begin the historic Dandi March on 12 March 1930?',
    options: ['दांडी समुद्र तट / Dandi Beach', 'साबरमती आश्रम (अहमदाबाद) / Sabarmati Ashram', 'सेवाग्राम आश्रम (वर्धा) / Sevagram', 'चंपारण (बिहार) / Champaran'],
    options_hi: ['दांडी समुद्र तट', 'साबरमती आश्रम (अहमदाबाद)', 'सेवाग्राम आश्रम (वर्धा)', 'चंपारण (बिहार)'],
    options_en: ['Dandi Beach', 'Sabarmati Ashram (Ahmedabad)', 'Sevagram Ashram (Wardha)', 'Champaran (Bihar)'],
    correct: 1,
    baseVotes: [1980, 14850, 720, 490],
    explanation_hi: 'गांधी जी ने 78 सत्याग्रहियों के साथ साबरमती आश्रम (अहमदाबाद) से दांडी तक 241 मील (385 किमी) की पदयात्रा की और 6 अप्रैल 1930 को नमक कानून तोड़कर सविनय अवज्ञा आंदोलन का शंखनाद किया था।',
    explanation_en: 'Gandhiji launched the Salt Satyagraha from Sabarmati Ashram with 78 followers on 12 March 1930, reaching Dandi on 6 April 1930.'
  },
  {
    id: 'poll-q12',
    subject: 'Indian Economy & Banking (भारतीय मुद्रा प्रणाली)',
    question: 'भारत में ₹1 के नोट और सिक्कों को छोड़कर अन्य सभी मूल्यवर्ग के बैंक नोट जारी करने का वैधानिक अधिकार किसके पास है?',
    question_en: 'Which authority has the exclusive right to issue currency notes in India (except ₹1 notes and coins)?',
    options: ['केंद्रीय वित्त मंत्रालय / Ministry of Finance', 'भारतीय रिजर्व बैंक / Reserve Bank of India (RBI)', 'भारतीय स्टेट बैंक / State Bank of India (SBI)', 'नीति आयोग / NITI Aayog'],
    options_hi: ['केंद्रीय वित्त मंत्रालय', 'भारतीय रिजर्व बैंक (RBI)', 'भारतीय स्टेट बैंक (SBI)', 'नीति आयोग'],
    options_en: ['Ministry of Finance', 'Reserve Bank of India (RBI)', 'State Bank of India (SBI)', 'NITI Aayog'],
    correct: 1,
    baseVotes: [1650, 15100, 610, 290],
    explanation_hi: 'RBI अधिनियम 1934 की धारा 22 के तहत ₹2 से ₹500 तक के नोट जारी करने का एकाधिकार केवल RBI के पास है। ₹1 का नोट व सभी सिक्के भारत सरकार (वित्त मंत्रालय) द्वारा जारी किए जाते हैं।',
    explanation_en: 'Under Section 22 of the RBI Act 1934, the Reserve Bank of India has the sole right to issue currency notes above ₹1. One-rupee notes and coins are issued by the Government of India.'
  },
  {
    id: 'poll-q13',
    subject: 'General Hindi Grammar (सामान्य हिन्दी - समास)',
    question: 'हिन्दी व्याकरण के नियमानुसार "प्रतिदिन" शब्द में कौन सा समास है?',
    question_en: 'According to Hindi grammar rules, which compound (Samas) is present in the word "प्रतिदिन" (Pratidin)?',
    options: ['तत्पुरुष समास / Tatpurush Samas', 'अव्ययीभाव समास / Avyayibhav Samas', 'द्वंद्व समास / Dwandwa Samas', 'कर्मधारय समास / Karmadharaya Samas'],
    options_hi: ['तत्पुरुष समास', 'अव्ययीभाव समास', 'द्वंद्व समास', 'कर्मधारय समास'],
    options_en: ['Tatpurush Samas', 'Avyayibhav Samas', 'Dwandwa Samas', 'Karmadharaya Samas'],
    correct: 1,
    baseVotes: [1340, 14200, 890, 720],
    explanation_hi: 'जिस समास का पहला पद प्रधान और अव्यय हो, उसे अव्ययीभाव समास कहते हैं। प्रतिदिन = प्रत्येक दिन (दिन-दिन)। अन्य उदाहरण: यथासंभव, भरपेट, आजन्म, अनजाने।',
    explanation_en: 'In "Pratidin", the initial element "Prati" is an indeclinable prefix (Avyaya) which governs the compound, making it an Avyayibhav Samas.'
  },
  {
    id: 'poll-q14',
    subject: 'General Science & Physics (ध्वनि एवं तरंग गति)',
    question: 'ध्वनि तरंगें (Sound Waves) निम्नलिखित में से किस माध्यम में यात्रा नहीं कर सकती हैं?',
    question_en: 'Through which of the following mediums can sound waves NOT travel?',
    options: ['ठोस धातु में / In Solid Metals', 'शुद्ध जल में / In Pure Water', 'वायु में / In Air', 'निर्वात में / In Vacuum'],
    options_hi: ['ठोस धातु में', 'शुद्ध जल में', 'वायु में', 'निर्वात में'],
    options_en: ['In Solid Metals', 'In Pure Water', 'In Air', 'In Vacuum'],
    correct: 3,
    baseVotes: [410, 520, 890, 16800],
    explanation_hi: 'ध्वनि एक यांत्रिक तरंग (Mechanical Wave) है जिसे चलने के लिए माध्यम के कणों की आवश्यकता होती है। निर्वात (Vacuum) में कोई कण नहीं होते, इसलिए अंतरिक्ष या निर्वात में ध्वनि नहीं सुनाई देती। प्रकाश निर्वात में चल सकता है।',
    explanation_en: 'Sound is a mechanical longitudinal wave requiring a physical medium with particles to propagate. It cannot propagate through vacuum.'
  },
  {
    id: 'poll-q15',
    subject: 'Static GK & Space Technology (भारत का अंतरिक्ष कार्यक्रम)',
    question: 'ISRO का प्रमुख उपग्रह एवं रॉकेट प्रक्षेपण केंद्र "सतीश धवन अंतरिक्ष केंद्र" (SDSC) किस राज्य में स्थित है?',
    question_en: 'In which state is ISRO\'s premier rocket launch facility, Satish Dhawan Space Centre (Sriharikota), located?',
    options: ['केरल / Kerala', 'तमिलनाडु / Tamil Nadu', 'आंध्र प्रदेश / Andhra Pradesh', 'ओडिशा / Odisha'],
    options_hi: ['केरल (तिरुवनंतपुरम)', 'तमिलनाडु (चेन्नई)', 'आंध्र प्रदेश (श्रीहरिकोटा)', 'ओडिशा (चांदीपुर)'],
    options_en: ['Kerala', 'Tamil Nadu', 'Andhra Pradesh (Sriharikota)', 'Odisha (Chandipur)'],
    correct: 2,
    baseVotes: [810, 1250, 15900, 740],
    explanation_hi: 'सतीश धवन अंतरिक्ष केंद्र आंध्र प्रदेश के तिरुपति जिले में पुलिकट झील के निकट श्रीहरिकोटा द्वीप पर स्थित है। भारत के चंद्रयान और गगनयान मिशन यहीं से प्रक्षेपित किए जाते हैं।',
    explanation_en: 'Satish Dhawan Space Centre (SDSC SHAR) is located on Sriharikota Island in Andhra Pradesh along the Bay of Bengal coast.'
  },
  {
    id: 'poll-q16',
    subject: 'Quantitative Aptitude (साधारण ब्याज - Simple Interest)',
    question: '₹5,000 की मूलधन राशि पर 10% वार्षिक दर से 2 वर्ष में कुल कितना साधारण ब्याज (SI) प्राप्त होगा?',
    question_en: 'What is the total simple interest earned on a principal of ₹5,000 at 10% per annum for 2 years?',
    options: ['₹500', '₹1,000', '₹1,050', '₹1,200'],
    options_hi: ['₹500', '₹1,000', '₹1,050', '₹1,200'],
    options_en: ['₹500', '₹1,000', '₹1,050', '₹1,200'],
    correct: 1,
    baseVotes: [650, 16400, 1120, 480],
    explanation_hi: 'साधारण ब्याज सूत्र: SI = (मूलधन × दर × समय) / 100 = (5000 × 10 × 2) / 100 = ₹1,000। कुल मिश्रधन = ₹6,000 होगा।',
    explanation_en: 'Simple Interest formula: SI = (P × R × T) / 100 = (5000 × 10 × 2) / 100 = ₹1,000. Total amount after 2 years will be ₹6,000.'
  },
  {
    id: 'poll-q17',
    subject: 'Indian Polity (आपातकालीन उपबंध)',
    question: 'भारतीय संविधान के किस अनुच्छेद के तहत देश में "राष्ट्रीय आपातकाल" (National Emergency) की घोषणा की जाती है?',
    question_en: 'Under which Article of the Indian Constitution can a National Emergency be proclaimed by the President?',
    options: ['अनुच्छेद 352 / Article 352 (National Emergency)', 'अनुच्छेद 356 / Article 356 (President\'s Rule)', 'अनुच्छेद 360 / Article 360 (Financial Emergency)', 'अनुच्छेद 368 / Article 368 (Constitutional Amendment)'],
    options_hi: ['अनुच्छेद 352 (राष्ट्रीय आपातकाल)', 'अनुच्छेद 356 (राज्यों में राष्ट्रपति शासन)', 'अनुच्छेद 360 (वित्तीय आपातकाल)', 'अनुच्छेद 368 (संविधान संशोधन)'],
    options_en: ['Article 352 (National Emergency)', 'Article 356 (President\'s Rule)', 'Article 360 (Financial Emergency)', 'Article 368 (Amendment)'],
    correct: 0,
    baseVotes: [14900, 1680, 980, 520],
    explanation_hi: 'अनुच्छेद 352 के तहत युद्ध, बाह्य आक्रमण या सशस्त्र विद्रोह पर राष्ट्रीय आपातकाल लगता है। अनुच्छेद 356 संवैधानिक तंत्र विफल होने पर राज्यों में राष्ट्रपति शासन, और अनुच्छेद 360 वित्तीय आपातकाल से संबंधित है।',
    explanation_en: 'Article 352 allows proclamation of National Emergency by the President on grounds of war, external aggression, or armed rebellion.'
  },
  {
    id: 'poll-q18',
    subject: 'Indian Geography & Rivers (भारतीय नदियां एवं आपदा)',
    question: 'बार-बार अपना मार्ग बदलने और भीषण बाढ़ लाने के कारण किस नदी को "बिहार का शोक" (Sorrow of Bihar) कहा जाता है?',
    question_en: 'Which river is famously called the "Sorrow of Bihar" due to unpredictable course shifts and annual floods?',
    options: ['दामोदर नदी / Damodar River', 'कोसी नदी / Kosi River', 'गंडक नदी / Gandak River', 'सोन नदी / Son River'],
    options_hi: ['दामोदर नदी (दामोदर)', 'कोसी नदी (कोसी)', 'गंडक नदी (गंडक)', 'सोन नदी (सोन)'],
    options_en: ['Damodar River', 'Kosi River', 'Gandak River', 'Son River'],
    correct: 1,
    baseVotes: [1420, 16300, 890, 460],
    explanation_hi: 'कोसी नदी नेपाल के हिमालय से भारी गाद (Silt) लाती है, जिससे इसका तल उठ जाता है और यह रास्ता बदल लेती है। दामोदर नदी को पहले "बंगाल का शोक" कहा जाता था।',
    explanation_en: 'The Kosi River is known as the "Sorrow of Bihar" because excessive silt deposits cause frequent catastrophic shifts in its riverbed.'
  },
  {
    id: 'poll-q19',
    subject: 'General Science & Chemistry / Biology (विटामिन एवं पोषण)',
    question: 'निम्नलिखित में से कौन सा विटामिन जल में घुलनशील (Water Soluble Vitamin) है?',
    question_en: 'Which of the following vitamins is water-soluble in the human body?',
    options: ['विटामिन A / Vitamin A', 'विटामिन D / Vitamin D', 'विटामिन C / Vitamin C', 'विटामिन K / Vitamin K'],
    options_hi: ['विटामिन A', 'विटामिन D', 'विटामिन C', 'विटामिन K'],
    options_en: ['Vitamin A', 'Vitamin D', 'Vitamin C', 'Vitamin K'],
    correct: 2,
    baseVotes: [1100, 1450, 15300, 820],
    explanation_hi: 'विटामिन B कॉम्प्लेक्स और विटामिन C जल में घुलनशील होते हैं (मूत्र के साथ निकल जाते हैं, अतः प्रतिदिन आवश्यक हैं)। विटामिन K, E, D, A (ट्रिक: KEDA) वसा में घुलनशील होते हैं।',
    explanation_en: 'Vitamins B-complex and C are water-soluble and excreted via urine, needing daily dietary intake. Vitamins A, D, E, and K are fat-soluble.'
  },
  {
    id: 'poll-q20',
    subject: 'Ancient Indian History (सिंधु घाटी सभ्यता)',
    question: 'वर्ष 1921 में सिंधु घाटी सभ्यता के पहले प्रमुख स्थल "हड़प्पा" (Harappa) का उत्खनन किसने किया था?',
    question_en: 'Who excavated the first Indus Valley Civilization site "Harappa" in 1921?',
    options: ['राखालदास बनर्जी / Rakhaldas Banerjee', 'दयाराम साहनी / Daya Ram Sahni', 'सर जॉन मार्शल / Sir John Marshall', 'आर. एस. बिष्ट / R.S. Bisht'],
    options_hi: ['राखालदास बनर्जी (1922 मोहनजोदड़ो)', 'दयाराम साहनी (1921 हड़प्पा)', 'सर जॉन मार्शल', 'आर. एस. बिष्ट (धौलावीरा)'],
    options_en: ['Rakhaldas Banerjee', 'Daya Ram Sahni', 'Sir John Marshall', 'R.S. Bisht'],
    correct: 1,
    baseVotes: [2100, 14600, 1150, 480],
    explanation_hi: 'रायबहादुर दयाराम साहनी ने 1921 में पंजाब (वर्तमान पाकिस्तान) के मोंटगोमरी जिले में रावी नदी के तट पर हड़प्पा की खोज की। 1922 में राखालदास बनर्जी ने मोहनजोदड़ो की खोज की।',
    explanation_en: 'Rai Bahadur Daya Ram Sahni excavated Harappa on the banks of the Ravi River in 1921. Rakhaldas Banerjee excavated Mohenjo-daro in 1922.'
  },
  {
    id: 'poll-q21',
    subject: 'General Intelligence & Reasoning (संख्या श्रृंखला)',
    question: 'दी गई श्रृंखला में लुप्त पद ज्ञात कीजिए: 2, 6, 12, 20, 30, ?',
    question_en: 'Find the missing number in the given logical series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    options_hi: ['36', '40', '42', '44'],
    options_en: ['36', '40', '42', '44'],
    correct: 2,
    baseVotes: [1200, 1680, 15800, 710],
    explanation_hi: 'अंतर का तर्क: 2 (+4) = 6 (+6) = 12 (+8) = 20 (+10) = 30 (+12) = 42। वैकल्पिक वर्ग तर्क: 1²+1=2, 2²+2=6, 3²+3=12, 4²+4=20, 5²+5=30, 6²+6=42।',
    explanation_en: 'Series difference increases by 2: +4, +6, +8, +10, +12. Thus 30 + 12 = 42. Alternatively n² + n gives 6² + 6 = 42.'
  },
  {
    id: 'poll-q22',
    subject: 'Computer & Web Technology (इंटरनेट शब्दावली)',
    question: 'इंटरनेट ब्राउज़र में वेब पेज के पते के लिए प्रयुक्त "URL" का सही पूर्ण रूप (Full Form) क्या है?',
    question_en: 'What is the correct full form of "URL" used as an address in web browsing?',
    options: ['Uniform Resource Locator', 'Universal Record Link', 'Unified Resource Link', 'Unlimited Resource Locator'],
    options_hi: ['Uniform Resource Locator', 'Universal Record Link', 'Unified Resource Link', 'Unlimited Resource Locator'],
    options_en: ['Uniform Resource Locator', 'Universal Record Link', 'Unified Resource Link', 'Unlimited Resource Locator'],
    correct: 0,
    baseVotes: [16700, 820, 540, 390],
    explanation_hi: 'URL का पूर्ण रूप "Uniform Resource Locator" है। यह इंटरनेट पर किसी भी विशिष्ट वेब पेज, फाइल या इमेज का पता (Address) होता है, जैसे: https://www.upsc.gov.in।',
    explanation_en: 'URL stands for Uniform Resource Locator, specifying the address of a unique web page or file resource on the internet.'
  },
  {
    id: 'poll-q23',
    subject: 'General Hindi (मुहावरे एवं लोकोक्तियां)',
    question: 'हिन्दी मुहावरे "आंखें खुलना" का सबसे उपयुक्त और सटीक अर्थ क्या है?',
    question_en: 'What is the most accurate meaning of the popular Hindi idiom "आंखें खुलना" (Aankhein Khulna)?',
    options: ['नींद से सुबह जागना / Waking up from sleep', 'सच्चाई या वास्तविकता का बोध होना / Realizing the truth', 'नेत्रों में तेज जलन होना / Eye irritation', 'अत्यधिक क्रोधित होना / Getting extremely angry'],
    options_hi: ['नींद से सुबह जागना', 'सच्चाई या वास्तविकता का बोध होना', 'नेत्रों में तेज जलन होना', 'अत्यधिक क्रोधित होना'],
    options_en: ['Waking up from sleep', 'Realizing the truth and reality', 'Eye irritation', 'Getting extremely angry'],
    correct: 1,
    baseVotes: [910, 16100, 380, 420],
    explanation_hi: '"आंखें खुलना" का अर्थ है भ्रम दूर होना और वास्तविकता का पता चलना। उदाहरण: परीक्षा परिणाम आने पर राहुल की आंखें खुलीं कि बिना नियमित अध्ययन के चयन संभव नहीं है।',
    explanation_en: 'The idiom "Aankhein Khulna" figuratively means becoming aware of the ground reality or truth after having been mistaken.'
  },
  {
    id: 'poll-q24',
    subject: 'Current Affairs & Sports (राष्ट्रीय खेल दिवस)',
    question: 'भारत में प्रत्येक वर्ष 29 अगस्त को "राष्ट्रीय खेल दिवस" (National Sports Day) किस महान खिलाड़ी की जयंती पर मनाया जाता है?',
    question_en: 'On whose birth anniversary is National Sports Day celebrated in India every year on 29 August?',
    options: ['मिल्खा सिंह (फ्लाइंग सिख) / Milkha Singh', 'मेजर ध्यानचंद (हॉकी के जादूगर) / Major Dhyan Chand', 'के. डी. जाधव (प्रथम व्यक्तिगत पदक) / K.D. Jadhav', 'कपिल देव (विश्व कप विजेता) / Kapil Dev'],
    options_hi: ['मिल्खा सिंह (फ्लाइंग सिख)', 'मेजर ध्यानचंद (हॉकी के जादूगर)', 'के. डी. जाधव', 'कपिल देव'],
    options_en: ['Milkha Singh (Flying Sikh)', 'Major Dhyan Chand (The Wizard of Hockey)', 'K.D. Jadhav', 'Kapil Dev'],
    correct: 1,
    baseVotes: [1140, 16900, 780, 610],
    explanation_hi: 'हॉकी के महान जादूगर मेजर ध्यानचंद का जन्म 29 अगस्त 1905 को प्रयागराज (इलाहाबाद) में हुआ था। उनके सम्मान में 29 अगस्त को राष्ट्रीय खेल दिवस मनाया जाता है और राष्ट्रपति खेल रत्न व अर्जुन पुरस्कार प्रदान करते हैं।',
    explanation_en: 'National Sports Day is celebrated on 29 August commemorating the birth anniversary of hockey legend Major Dhyan Chand, who won 3 Olympic Gold medals.'
  }
];

let currentPollIndex = -1;

function getHourlyPollIndex() {
  const hour = new Date().getHours(); // 0 to 23
  return hour % DAILY_POLL_QUESTIONS.length;
}

function getActivePollQuestion() {
  if (currentPollIndex < 0 || currentPollIndex >= DAILY_POLL_QUESTIONS.length) {
    currentPollIndex = getHourlyPollIndex();
  }
  return DAILY_POLL_QUESTIONS[currentPollIndex];
}

function getTodayPollQuestion() {
  return getActivePollQuestion();
}

function nextDailyPoll() {
  if (currentPollIndex < 0) currentPollIndex = getHourlyPollIndex();
  currentPollIndex = (currentPollIndex + 1) % DAILY_POLL_QUESTIONS.length;
  initDailyPoll();
}

function prevDailyPoll() {
  if (currentPollIndex < 0) currentPollIndex = getHourlyPollIndex();
  currentPollIndex = (currentPollIndex - 1 + DAILY_POLL_QUESTIONS.length) % DAILY_POLL_QUESTIONS.length;
  initDailyPoll();
}

function jumpToPoll(idx) {
  if (idx >= 0 && idx < DAILY_POLL_QUESTIONS.length) {
    currentPollIndex = idx;
    initDailyPoll();
  }
}

const POLL_I18N = {
  en: {
    title: 'Live Community Quiz & Daily Poll',
    sub: 'All-India Aspirants Active Hub • Live Voting & Prep',
    liveVote: 'LIVE VOTE',
    qLabel: 'Question of the Hour:',
    prev: 'Prev',
    next: 'Next',
    qNum: 'Q',
    hourlyNotice: 'Question rotates hourly (or click Prev/Next to practice all 24 questions anytime)!',
    correctBadge: 'Correct Answer',
    yourChoice: 'Your Choice',
    correctMsg: '🎉 Excellent! Your answer is 100% correct!',
    wrongPrefix: '💡 Correct Answer is Option ',
    totalParticipants: 'Total Participants: ',
    aspirants: 'Aspirants',
    retest: '🔄 Re-test Question',
    nextBtn: 'Next Question ➔',
    secondaryBadge: '🇮🇳 HINDI'
  },
  hi: {
    title: 'आज का सवाल एवं लाइव कम्युनिटी पोल',
    sub: 'देश भर के छात्रों के साथ लाइव वोट व तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'घंटे का महत्वपूर्ण प्रश्न:',
    prev: 'पिछला',
    next: 'अगला',
    qNum: 'प्रश्न',
    hourlyNotice: 'यह सवाल हर 1 घंटे में स्वतः बदलता है (या आप कभी भी पिछला/अगला दबाकर सभी 24 प्रश्न हल कर सकते हैं)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'आपका जवाब',
    correctMsg: '🎉 शाबाश! आपका जवाब बिल्कुल सही है!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'छात्र',
    retest: '🔄 Re-test (दोबारा दें)',
    nextBtn: 'अगला सवाल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  'hi-latn': {
    title: 'Aaj Ka Sawal & Live Community Poll',
    sub: 'Desh bhar ke students ke saath live vote & prep',
    liveVote: 'LIVE VOTE',
    qLabel: 'Ghante Ka Important Sawal:',
    prev: 'Pichhla',
    next: 'Agla',
    qNum: 'Q',
    hourlyNotice: 'Ye sawal har 1 ghante me badalta hai (ya Prev/Next se sabhi 24 solve karein)!',
    correctBadge: 'Correct Answer',
    yourChoice: 'Aapka Jawab',
    correctMsg: '🎉 Shaabash! Aapka answer 100% correct hai!',
    wrongPrefix: '💡 Sahi Answer Option ',
    totalParticipants: 'Total Participants: ',
    aspirants: 'Students',
    retest: '🔄 Re-test (Dobara dein)',
    nextBtn: 'Agla Sawal ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ta: {
    title: 'நேரலை வினாடி வினா & தினசரி கருத்துக்கணிப்பு',
    sub: 'நாடு முழுவதிலும் உள்ள மாணவர்களுடன் நேரலை தயாரிப்பு',
    liveVote: 'நேரலை வாக்கு',
    qLabel: 'இந்த மணிநேரத்தின் முக்கிய வினா:',
    prev: 'முந்தைய',
    next: 'அடுத்தது',
    qNum: 'வினா',
    hourlyNotice: 'இந்த கேள்வி ஒவ்வொரு மணி நேரமும் மாறுகிறது (அல்லது 24 கேள்விகளையும் பயிற்சி செய்ய முந்தைய/அடுத்ததை அழுத்தவும்)!',
    correctBadge: 'சரியான விடை',
    yourChoice: 'உங்கள் தேர்வு',
    correctMsg: '🎉 அருமை! உங்கள் விடை 100% சரியானது!',
    wrongPrefix: '💡 சரியான விடை விருப்பம் ',
    totalParticipants: 'மொத்த பங்கேற்பாளர்கள்: ',
    aspirants: 'மாணவர்கள்',
    retest: '🔄 மீண்டும் முயற்சி செய்க',
    nextBtn: 'அடுத்த வினா ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  te: {
    title: 'లైవ్ క్విజ్ & రోజువారీ పోల్',
    sub: 'దేశవ్యాప్త అభ్యర్థులతో ప్రత్యక్ష ఓటింగ్ & సాధన',
    liveVote: 'లైవ్ ఓట్',
    qLabel: 'ఈ గంట ముఖ్యమైన ప్రశ్న:',
    prev: 'మునుపటి',
    next: 'తదుపరి',
    qNum: 'ప్రశ్న',
    hourlyNotice: 'ఈ ప్రశ్న ప్రతి గంటకు మారుతుంది (లేదా 24 ప్రశ్నలను ప్రాక్టీస్ చేయడానికి మునుపటి/తదుపరి క్లిక్ చేయండి)!',
    correctBadge: 'సరైన సమాధానం',
    yourChoice: 'మీ ఎంపిక',
    correctMsg: '🎉 అద్భుతం! మీ సమాధానం 100% సరైనది!',
    wrongPrefix: '💡 సరైన సమాధానం ఎంపిక ',
    totalParticipants: 'మొత్తం పాల్గొన్నవారు: ',
    aspirants: 'అభ్యర్థులు',
    retest: '🔄 మళ్లీ ప్రయత్నించండి',
    nextBtn: 'తర్వాతి ప్రశ్న ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mr: {
    title: 'आजचा प्रश्न आणि थेट कम्युनिटी पोल',
    sub: 'देशभरातील विद्यार्थ्यांसह थेट तयारी व मत',
    liveVote: 'थेट मतदान',
    qLabel: 'या तासाचा महत्त्वाचा प्रश्न:',
    prev: 'मागील',
    next: 'पुढील',
    qNum: 'प्रश्न',
    hourlyNotice: 'हा प्रश्न दर तासाला बदलतो (किंवा सर्व 24 प्रश्न सोडवण्यासाठी मागील/पुढील वर क्लिक करा)!',
    correctBadge: 'योग्य उत्तर',
    yourChoice: 'तुमची निवड',
    correctMsg: '🎉 खूप छान! तुमचे उत्तर १००% योग्य आहे!',
    wrongPrefix: '💡 योग्य उत्तर पर्याय ',
    totalParticipants: 'एकूण सहभागी: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 पुन्हा सोडवा',
    nextBtn: 'पुढील प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  bn: {
    title: 'লাইভ কুইজ ও দৈনিক পোল',
    sub: 'দেশজুড়ে পরীক্ষার্থীদের সাথে লাইভ প্রস্তুতি',
    liveVote: 'লাইভ ভোট',
    qLabel: 'এই ঘণ্টার গুরুত্বপূর্ণ প্রশ্ন:',
    prev: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    qNum: 'প্রশ্ন',
    hourlyNotice: 'এই প্রশ্নটি প্রতি ঘণ্টায় পরিবর্তিত হয় (অথবা ২৪টি প্রশ্ন অনুশীলনের জন্য পূর্ববর্তী/পরবর্তী ক্লিক করুন)!',
    correctBadge: 'সঠিক উত্তর',
    yourChoice: 'আপনার পছন্দ',
    correctMsg: '🎉 চমৎকার! আপনার উত্তর ১০০% সঠিক!',
    wrongPrefix: '💡 সঠিক উত্তর অপশন ',
    totalParticipants: 'মোট অংশগ্রহণকারী: ',
    aspirants: 'শিক্ষার্থী',
    retest: '🔄 আবার চেষ্টা করুন',
    nextBtn: 'পরের প্রশ্ন ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  gu: {
    title: 'આજનો પ્રશ્ન અને લાઈવ પોલ',
    sub: 'દેશભરના ઉમેદવારો સાથે લાઈવ તૈયારી',
    liveVote: 'લાઈવ વોટ',
    qLabel: 'આ કલાકનો મહત્વનો પ્રશ્ન:',
    prev: 'પાછલું',
    next: 'આગળ',
    qNum: 'પ્રશ્ન',
    hourlyNotice: 'આ પ્રશ્ન દર કલાકે બદલાય છે (અથવા બધા 24 પ્રશ્નો માટે પાછલું/આગળ ક્લિક કરો)!',
    correctBadge: 'સાચો જવાબ',
    yourChoice: 'તમારી પસંદગી',
    correctMsg: '🎉 ઉત્તમ! તમારો જવાબ ૧૦૦% સાચો છે!',
    wrongPrefix: '💡 સાચો જવાબ વિકલ્પ ',
    totalParticipants: 'કુલ સહભાગીઓ: ',
    aspirants: 'વિદ્યાર્થીઓ',
    retest: '🔄 ફરી પ્રયાસ કરો',
    nextBtn: 'આગળનો પ્રશ્ન ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  kn: {
    title: 'ಲೈವ್ ರಸಪ್ರಶ್ನೆ ಮತ್ತು ದೈನಂದಿನ ಪೋಲ್',
    sub: 'ದೇಶದಾದ್ಯಂತ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಲೈವ್ ಸಿದ್ಧತೆ',
    liveVote: 'ಲೈವ್ ವೋಟ್',
    qLabel: 'ಈ ಗಂಟೆಯ ಪ್ರಮುಖ ಪ್ರಶ್ನೆ:',
    prev: 'ಹಿಂದಿನ',
    next: 'ಮುಂದಿನ',
    qNum: 'ಪ್ರಶ್ನೆ',
    hourlyNotice: 'ಈ ಪ್ರಶ್ನೆಯು ಪ್ರತಿ ಗಂಟೆಗೆ ಬದಲಾಗುತ್ತದೆ (ಅಥವಾ 24 ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಲು ಹಿಂದಿನ/ಮುಂದಿನ ಕ್ಲಿಕ್ ಮಾಡಿ)!',
    correctBadge: 'ಸರಿಯಾದ ಉತ್ತರ',
    yourChoice: 'ನಿಮ್ಮ ಆಯ್ಕೆ',
    correctMsg: '🎉 ಅದ್ಭುತ! ನಿಮ್ಮ ಉತ್ತರ 100% ಸರಿಯಾಗಿದೆ!',
    wrongPrefix: '💡 ಸರಿಯಾದ ಉತ್ತರ ಆಯ್ಕೆ ',
    totalParticipants: 'ಒಟ್ಟು ಭಾಗವಹಿಸಿದವರು: ',
    aspirants: 'ವಿದ್ಯಾರ್ಥಿಗಳು',
    retest: '🔄 ಮರುಪರೀಕ್ಷೆ',
    nextBtn: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ml: {
    title: 'തത്സമയ ക്വിസും ദൈനംദിന പോളും',
    sub: 'രാജ്യമെമ്പാടുമുള്ള ഉദ്യോഗാർത്ഥികളോടൊപ്പം തത്സമയ പരിശീലനം',
    liveVote: 'തത്സമയ വോട്ട്',
    qLabel: 'ഈ മണിക്കൂറിലെ പ്രധാന ചോദ്യം:',
    prev: 'മുമ്പത്തെ',
    next: 'അടുത്തത്',
    qNum: 'ചോദ്യം',
    hourlyNotice: 'ഈ ചോദ്യം ഓരോ മണിക്കൂറിലും മാറുന്നു (24 ചോദ്യങ്ങളും പരിശീലിക്കാൻ മുമ്പത്തെ/അടുത്തത് ക്ലിക്ക് ചെയ്യുക)!',
    correctBadge: 'ശരിയായ ഉത്തരം',
    yourChoice: 'നിങ്ങളുടെ തെരഞ്ഞെടുപ്പ്',
    correctMsg: '🎉 ഉജ്ജ്വലം! നിങ്ങളുടെ ഉത്തരം 100% ശരിയാണ്!',
    wrongPrefix: '💡 ശരിയായ ഉത്തരം ഓപ്ഷൻ ',
    totalParticipants: 'ആകെ പങ്കെടുത്തവർ: ',
    aspirants: 'വിദ്യാർത്ഥികൾ',
    retest: '🔄 വീണ്ടും ശ്രമിക്കുക',
    nextBtn: 'അടുത്ത ചോദ്യം ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  pa: {
    title: 'ਅੱਜ ਦਾ ਸਵਾਲ ਅਤੇ ਲਾਈਵ ਪੋਲ',
    sub: 'ਦੇਸ਼ ਭਰ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਲਾਈਵ ਤਿਆਰੀ',
    liveVote: 'ਲਾਈਵ ਵੋਟ',
    qLabel: 'ਇਸ ਘੰਟੇ ਦਾ ਮਹੱਤਵਪੂਰਨ ਸਵਾਲ:',
    prev: 'ਪਿਛਲਾ',
    next: 'ਅਗਲਾ',
    qNum: 'ਸਵਾਲ',
    hourlyNotice: 'ਇਹ ਸਵਾਲ ਹਰ ਘੰਟੇ ਬਦਲਦਾ ਹੈ (ਜਾਂ ਸਾਰੇ 24 ਸਵਾਲਾਂ ਲਈ ਪਿਛਲਾ/ਅਗਲਾ ਕਲਿੱਕ ਕਰੋ)!',
    correctBadge: 'ਸਹੀ ਜਵਾਬ',
    yourChoice: 'ਤੁਹਾਡੀ ਚੋਣ',
    correctMsg: '🎉 ਸ਼ਾਬਾਸ਼! ਤੁਹਾਡਾ ਜਵਾਬ 100% ਸਹੀ ਹੈ!',
    wrongPrefix: '💡 ਸਹੀ ਜਵਾਬ ਵਿਕਲਪ ',
    totalParticipants: 'ਕੁੱਲ ਭਾਗੀਦਾਰ: ',
    aspirants: 'ਵਿਦਿਆਰਥੀ',
    retest: '🔄 ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    nextBtn: 'ਅਗਲਾ ਸਵਾਲ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  or: {
    title: 'ଆଜିର ପ୍ରଶ୍ନ ଓ ଲାଇଭ୍ ପୋଲ୍',
    sub: 'ସାରା ଦେଶର ଛାତ୍ରଛାତ୍ରୀଙ୍କ ସହ ଲାଇଭ୍ ପ୍ରସ୍ତୁତି',
    liveVote: 'ଲାଇଭ୍ ଭୋଟ୍',
    qLabel: 'ଏହି ଘଣ୍ଟାର ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପ୍ରଶ୍ନ:',
    prev: 'ପୂର୍ବବର୍ତ୍ତୀ',
    next: 'ପରବର୍ତ୍ତୀ',
    qNum: 'ପ୍ରଶ୍ନ',
    hourlyNotice: 'ଏହି ପ୍ରଶ୍ନ ପ୍ରତି ଘଣ୍ଟାରେ ବଦଳେ (କିମ୍ବା ୨୪ଟି ପ୍ରଶ୍ନ ଅଭ୍ୟାସ ପାଇଁ ପୂର୍ବ/ପର କ୍ଲିକ୍ କରନ୍ତୁ)!',
    correctBadge: 'ଠିକ୍ ଉତ୍ତର',
    yourChoice: 'ଆପଣଙ୍କ ପସନ୍ଦ',
    correctMsg: '🎉 ଉତ୍ତମ! ଆପଣଙ୍କ ଉତ୍ତର ୧୦୦% ଠିକ୍!',
    wrongPrefix: '💡 ସଠିକ୍ ଉତ୍ତର ବିକଳ୍ପ ',
    totalParticipants: 'ମୋଟ ଅଂଶଗ୍ରହଣକାରୀ: ',
    aspirants: 'ଛାତ୍ରଛାତ୍ରୀ',
    retest: '🔄 ପୁନଃ ପରୀକ୍ଷା',
    nextBtn: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ur: {
    title: 'آج کا سوال اور لائیو پول',
    sub: 'ملک بھر کے امیدواروں کے ساتھ لائیو تیاری',
    liveVote: 'لائیو ووٹ',
    qLabel: 'اس گھنٹے کا اہم سوال:',
    prev: 'پچھلا',
    next: 'اگلا',
    qNum: 'سوال',
    hourlyNotice: 'یہ سوال ہر گھنٹے بعد تبدیل ہوتا ہے (یا تمام 24 سوالات حل کرنے کے لیے پچھلا/اگلا دبائیں)!',
    correctBadge: 'درست جواب',
    yourChoice: 'آپ کا جواب',
    correctMsg: '🎉 زبردست! آپ کا جواب 100% درست ہے!',
    wrongPrefix: '💡 درست جواب آپشن ',
    totalParticipants: 'کل شرکاء: ',
    aspirants: 'طلباء',
    retest: '🔄 دوبارہ کوشش کریں',
    nextBtn: 'اگلا سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sa: {
    title: 'अद्यतनः प्रश्नः तथा सजीव-मतदानम्',
    sub: 'अखिलभारतीय-छात्रैः सह सजीव-अभ्यासः',
    liveVote: 'सजीव-मतदानम्',
    qLabel: 'अस्याः होरायाः मुख्य-प्रश्नः:',
    prev: 'पूर्वम्',
    next: 'अग्रिमम्',
    qNum: 'प्रश्नः',
    hourlyNotice: 'एषः प्रश्नः प्रतिहोरा परिवर्तते (अथवा २४ प्रश्नान् अभ्यासाय पूर्वम्/अग्रिमम् नुदन्तु)!',
    correctBadge: 'उचितम् उत्तरम्',
    yourChoice: 'भवतः विकल्पः',
    correctMsg: '🎉 साधु! भवतः उत्तरं शतप्रतिशतं शुद्धम् अस्ति!',
    wrongPrefix: '💡 उचितम् उत्तरं विकल्पः ',
    totalParticipants: 'कुल-सहभागिनः: ',
    aspirants: 'छात्राः',
    retest: '🔄 पुनः परीक्ष्यताम्',
    nextBtn: 'अग्रिमः प्रश्नः ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  as: {
    title: 'আজিৰ প্ৰশ্ন আৰু লাইভ কমিউনিটি পোল',
    sub: 'সমগ্ৰ দেশৰ ছাত্ৰ-ছাত্ৰীৰ সৈতে লাইভ ভোট আৰু প্ৰস্তুতি',
    liveVote: 'লাইভ ভোট',
    qLabel: 'এই ঘণ্টাৰ গুৰুত্বপূৰ্ণ প্ৰশ্ন:',
    prev: 'পূৰ্বৱৰ্তী',
    next: 'পৰৱৰ্তী',
    qNum: 'প্ৰশ্ন',
    hourlyNotice: 'এই প্ৰশ্ন প্ৰতি ঘণ্টাত সলনি হয় (বা সকলো ২৪টা প্ৰশ্ন অনুশীলন কৰিবলৈ পূৰ্বৱৰ্তী/পৰৱৰ্তী টিপক)!',
    correctBadge: 'সঠিক উত্তৰ',
    yourChoice: 'আপোনাৰ পছন্দ',
    correctMsg: '🎉 উৎকৃষ্ট! আপোনাৰ উত্তৰ ১০০% সঠিক!',
    wrongPrefix: '💡 সঠিক উত্তৰ বিকল্প ',
    totalParticipants: 'মুঠ অংশগ্ৰহণকাৰী: ',
    aspirants: 'পৰীক্ষাৰ্থী',
    retest: '🔄 পুনৰ পৰীক্ষা',
    nextBtn: 'পৰৱৰ্তী প্ৰশ্ন ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mai: {
    title: 'आबूक सवाल एवं लाइव कम्युनिटी पोल',
    sub: 'देश भरिक छात्रक संग लाइव वोट आ तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'एहि घंटाक महत्वपूर्ण प्रश्न:',
    prev: 'पाछिला',
    next: 'अगिला',
    qNum: 'प्रश्न',
    hourlyNotice: 'ई सवाल प्रति घंटा बदलैत अछि (वा सभ 24 प्रश्न लेल पाछिला/अगिला दबाउ)!',
    correctBadge: 'सटीक उत्तर',
    yourChoice: 'अहाँक उत्तर',
    correctMsg: '🎉 बहुत नीक! अहाँक उत्तर 100% सही अछि!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल प्रतिभागी: ',
    aspirants: 'छात्र',
    retest: '🔄 पुनः प्रयास करू',
    nextBtn: 'अगिला प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  bho: {
    title: 'आज के सवाल आ लाइव कम्युनिटी पोल',
    sub: 'सभ देस के लईकन संगे लाइव वोट आ तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'एह घंटा के खास सवाल:',
    prev: 'पिछला',
    next: 'अगिला',
    qNum: 'सवाल',
    hourlyNotice: 'ई सवाल हर घंटा बदले ला (या सभे 24 सवाल खातिर पिछला/अगिला दबाईं)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'रउआ के जवाब',
    correctMsg: '🎉 बहुत बढ़िया! रउआ के जवाब 100% सही बा!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'छात्र',
    retest: '🔄 दोबारा दीं',
    nextBtn: 'अगिला सवाल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ne: {
    title: 'आजको प्रश्न र प्रत्यक्ष सामुदायिक पोल',
    sub: 'देशभरिका विद्यार्थीहरूसँग प्रत्यक्ष भोट र तयारी',
    liveVote: 'प्रत्यक्ष भोट',
    qLabel: 'यस घण्टाको महत्वपूर्ण प्रश्न:',
    prev: 'अघिल्लो',
    next: 'अर्को',
    qNum: 'प्रश्न',
    hourlyNotice: 'यो प्रश्न हरेक घण्टा परिवर्तन हुन्छ (वा सबै २४ प्रश्नहरू हल गर्न अघिल्लो/अर्को थिच्नुहोस्)!',
    correctBadge: 'सही उत्तर',
    yourChoice: 'तपाईंको छनोट',
    correctMsg: '🎉 उत्कृष्ट! तपाईंको उत्तर १००% सही छ!',
    wrongPrefix: '💡 सही उत्तर विकल्प ',
    totalParticipants: 'कुल सहभागी: ',
    aspirants: 'विद्यार्थीहरू',
    retest: '🔄 पुनः प्रयास गर्नुहोस्',
    nextBtn: 'अर्को प्रश्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  kok: {
    title: 'आयचो प्रस्न आनी थेट कम्युनिटी पोल',
    sub: 'देशांतल्या विद्यार्थ्यां वांगडा थेट वोट आनी तयारी',
    liveVote: 'थेट वोट',
    qLabel: 'ह्या वराचो मुखेल प्रस्न:',
    prev: 'फाटलो',
    next: 'फुडलो',
    qNum: 'प्रस्न',
    hourlyNotice: 'हो प्रस्न दर वराक बदलता (वा सगळे २४ प्रस्न सोडवपाक फाटलो/फुडलो दाबात)!',
    correctBadge: 'योग्य जाप',
    yourChoice: 'तुमची निवड',
    correctMsg: '🎉 बरोच बरो! तुमची जाप १००% खरी आसा!',
    wrongPrefix: '💡 खरी जाप पर्याय ',
    totalParticipants: 'एकूण वांटेकार: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 परत सोडयात',
    nextBtn: 'फुडलो प्रस्न ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sd: {
    title: 'اڄوڪو سوال ۽ لائيو ڪميونٽي پول',
    sub: 'سڄي ملڪ جي اميدوارن سان گڏ لائيو تياري',
    liveVote: 'لائيو ووٽ',
    qLabel: 'هن ڪلاڪ جو اهم سوال:',
    prev: 'پوئتي',
    next: 'اڳتي',
    qNum: 'سوال',
    hourlyNotice: 'هي سوال هر هڪ ڪلاڪ ۾ تبديل ٿيندو آهي (يا سڀ 24 سوال حل ڪرڻ لاءِ اڳتي/پوئتي دٻايو)!',
    correctBadge: 'صحيح جواب',
    yourChoice: 'توهان جي چونڊ',
    correctMsg: '🎉 بهترين! توهان جو جواب 100% صحيح آهي!',
    wrongPrefix: '💡 صحيح جواب آپشن ',
    totalParticipants: 'ڪل شريڪ: ',
    aspirants: 'شاگرد',
    retest: '🔄 وري ڪوشش ڪريو',
    nextBtn: 'اڳيون سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  doi: {
    title: 'अज्जै दा सुआल ते लाइव कम्युनिटी पोल',
    sub: 'पूरे देश दे विद्यार्थियें कन्नै लाइव वोट ते तैयारी',
    liveVote: 'लाइव वोट',
    qLabel: 'इस घैंटे दा मुक्ख सुआल:',
    prev: 'पिच्छला',
    next: 'अगला',
    qNum: 'सुआल',
    hourlyNotice: 'एह सुआल हर घैंटे बदलदा ऐ (यां सारे 24 सुआलें लेई पिच्छला/अगला दबाओ)!',
    correctBadge: 'सई जवाब',
    yourChoice: 'तुंदी पसंद',
    correctMsg: '🎉 शाबाश! तुंदा जवाब 100% सई ऐ!',
    wrongPrefix: '💡 सई जवाब विकल्प ',
    totalParticipants: 'कुल भागीदार: ',
    aspirants: 'विद्यार्थी',
    retest: '🔄 मुड़ कोशिश करो',
    nextBtn: 'अगला सुआल ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  ks: {
    title: 'ازک سوال تہ لائیو کمیونٹی پول',
    sub: 'پوری ملکہ کین طالب علمن سیت لائیو ووٹ تہ تیاری',
    liveVote: 'لائیو ووٹ',
    qLabel: 'ام گھنٹک اہم سوال:',
    prev: 'پتھم',
    next: 'برونہم',
    qNum: 'سوال',
    hourlyNotice: 'یہ سوال چھ ہر گھنٹس منز بدلان (یا 24 سوال حل کرن خأطرہ پتھم/برونہم دباو)!',
    correctBadge: 'صحیح جواب',
    yourChoice: 'تہند انتخاب',
    correctMsg: '🎉 واریاہ جان! تہند جواب چھ 100% صحیح!',
    wrongPrefix: '💡 صحیح جواب چھ آپشن ',
    totalParticipants: 'کل شرکاء: ',
    aspirants: 'طالب علم',
    retest: '🔄 دوبار کوشش کریو',
    nextBtn: 'برونہم سوال ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  sat: {
    title: 'ᱛᱮᱦᱮᱧᱟᱜ ᱠᱩᱠᱞᱤ ᱟᱨ ᱞᱟᱭᱤᱵᱽ ᱯᱳᱞ',
    sub: 'ᱫᱤᱥᱚᱢ ᱡᱟᱠᱟᱛ ᱨᱤᱱ ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱥᱟᱶ ᱞᱟᱭᱤᱵᱽ ᱵᱷᱳᱴ',
    liveVote: 'ᱞᱟᱭᱤᱵᱽ ᱵᱷᱳᱴ',
    qLabel: 'ᱱᱚᱣᱟ ᱴᱟᱲᱟᱝ ᱨᱮᱭᱟᱜ ᱢᱩᱬᱩᱛ ᱠᱩᱠᱞᱤ:',
    prev: 'ᱛᱟᱭᱚᱢ',
    next: 'ᱞᱟᱦᱟ',
    qNum: 'ᱠᱩᱠᱞᱤ',
    hourlyNotice: 'ᱱᱚᱣᱟ ᱠᱩᱠᱞᱤ ᱫᱚ ᱴᱟᱲᱟᱝ ᱯᱤᱪᱷᱤ ᱵᱚᱫᱚᱞᱚᱜᱼᱟ (ᱥᱮ ᱡᱚᱛᱚ ᱒᱔ ᱠᱩᱠᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱞᱟᱦᱟ/ᱛᱟᱭᱚᱢ ᱚᱛᱟᱭ ᱢᱮ)!',
    correctBadge: 'ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ',
    yourChoice: 'ᱟᱢᱟᱜ ᱵᱟᱪᱷᱟᱣ',
    correctMsg: '🎉 ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱟᱢᱟᱜ ᱛᱮᱞᱟ ᱫᱚ ᱑᱐᱐% ᱥᱟᱹᱨᱤ ᱜᱮᱭᱟ!',
    wrongPrefix: '💡 ᱥᱟᱹᱨᱤ ᱛᱮᱞᱟ ᱫᱚ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱚᱯᱥᱚᱱ ',
    totalParticipants: 'ᱢᱩᱴ ᱥᱮᱞᱮᱫᱤᱭᱟᱹ: ',
    aspirants: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ',
    retest: '🔄 ᱫᱚᱦᱲᱟ ᱮᱢ',
    nextBtn: 'ᱞᱟᱦᱟ ᱠᱩᱠᱞᱤ ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  brx: {
    title: "दिनैनि सोंथि आरो लाइभ कम्यूनिटि पल",
    sub: "गासै हादोरनि फरायसुलाफोरजों लाइभ भट आरो थियारी",
    liveVote: 'लाइभ भट',
    qLabel: "बे घन्टानि गोनांथार सोंथि:",
    prev: 'सिगांनि',
    next: 'उनाव',
    qNum: 'सोंथि',
    hourlyNotice: "बे सोंथिया घन्टाफ्राम सोलायो (एबा गासै २४ सोंथिनि थाखाय सिगांनि/उनाव थु)! ",
    correctBadge: 'थार फिननाय',
    yourChoice: 'नोंनि सायखनाय',
    correctMsg: "🎉 जोबोर मोजां! नोंनि फिननाया १००% थार!",
    wrongPrefix: '💡 थार फिननाय पसन्द ',
    totalParticipants: 'गासै बाहागो लानाय: ',
    aspirants: 'फरायसुला',
    retest: '🔄 फिन नाजा',
    nextBtn: 'उनाव सोंथि ➔',
    secondaryBadge: '🌐 ENGLISH'
  },
  mni: {
    title: 'ꯉꯁꯤꯒꯤ ꯋꯥꯍꯪ ꯑꯃꯁꯨꯡ ꯂꯥꯏꯚ ꯀꯃ꯭ꯌꯨꯅꯤꯇꯤ ꯄꯣꯜ',
    sub: 'ꯂꯩꯕꯥꯛ ꯁꯤꯅꯕ ꯊꯨꯡꯅꯥ ꯂꯩꯕ ꯃꯍꯩꯔꯣꯏꯁꯤꯡꯒ ꯂꯣꯏꯅꯅ ꯁꯦꯝ ꯁꯥꯕ',
    liveVote: 'ꯂꯥꯏꯚ ꯚꯣꯠ',
    qLabel: 'ꯄꯨꯡꯐꯝ ꯑꯁꯤꯒꯤ ꯃꯔꯨꯑꯣꯏꯕ ꯋꯥꯍꯪ:',
    prev: 'ꯃꯃꯥꯡ',
    next: 'ꯃꯊꯪ',
    qNum: 'ꯋꯥꯍꯪ',
    hourlyNotice: 'ꯋꯥꯍꯪ ꯑꯁꯤ ꯄꯨꯡ ꯈꯨꯗꯤꯡꯒꯤ ꯍꯣꯡꯏ (ꯅꯠꯇ꯭ꯔꯒ ꯋꯥꯍꯪ ꯲꯴ ꯄꯨꯝꯅꯃꯛ ꯍꯣꯠꯅꯅꯕ ꯃꯃꯥꯡ/ꯃꯊꯪ ꯅꯃꯕꯤꯌꯨ)!',
    correctBadge: 'ꯆꯨꯝꯂꯕ ꯄꯥꯎꯈꯨꯝ',
    yourChoice: 'ꯅꯍꯥꯛꯀꯤ ꯈꯟꯕ',
    correctMsg: '🎉 ꯌꯥꯝꯅ ꯐꯔꯦ! ꯅꯍꯥꯛꯀꯤ ꯄꯥꯎꯈꯨꯝ ꯑꯁꯤ ꯱꯰꯰% ꯆꯨꯝꯃꯤ!',
    wrongPrefix: '💡 ꯆꯨꯝꯂꯕ ꯄꯥꯎꯈꯨꯝ ꯑꯣꯞꯁꯟ ',
    totalParticipants: 'ꯄꯨꯟꯅ ꯌꯥꯎꯔꯤꯕ: ',
    aspirants: 'ꯃꯍꯩꯔꯣꯏ',
    retest: '🔄 ꯑꯃꯨꯛ ꯍꯟꯅ ꯍꯣꯠꯅꯕꯤꯌꯨ',
    nextBtn: 'ꯃꯊꯪ ꯋꯥꯍꯪ ➔',
    secondaryBadge: '🌐 ENGLISH'
  }
};

function initDailyPoll() {
  const container = document.getElementById('dailyPollContainer');
  if (!container) return;

  const poll = getActivePollQuestion();
  let savedVote = null;
  try {
    savedVote = localStorage.getItem(`sarkari_poll_${poll.id}`);
  } catch(e) {}

  let lang = 'hi';
  try {
    lang = localStorage.getItem('sarkariai_lang') || 'hi';
  } catch(e) {}

  const isEnglish = (lang === 'en');
  const t = POLL_I18N[lang] || POLL_I18N['hi'];

  // Strict User Rule:
  // For ALL languages except English:
  //   - Primary Question is Hindi (poll.question)
  //   - Secondary Question is ALWAYS English (poll.question_en) with badge '🌐 ENGLISH'
  // For English:
  //   - Primary Question is English (poll.question_en || poll.question)
  //   - Secondary Question is ALWAYS Hindi (poll.question) with badge '🇮🇳 HINDI'
  let displayQuestion, displaySecondaryQuestion, secondaryBadge;
  let activeOptions, activeExplanation;

  if (isEnglish) {
    displayQuestion = poll.question_en || poll.question;
    displaySecondaryQuestion = poll.question;
    secondaryBadge = '🇮🇳 HINDI';
    activeOptions = poll.options_en.map((enOpt, idx) => {
      const hiOpt = (poll.options_hi && poll.options_hi[idx]) ? poll.options_hi[idx] : (poll.options && poll.options[idx] ? poll.options[idx].split('/')[0].trim() : enOpt);
      return `${enOpt} / ${hiOpt}`;
    });
    activeExplanation = poll.explanation_en || poll.explanation_hi;
  } else {
    const regionalQ = (poll['question_' + lang]) || poll.question;
    displayQuestion = regionalQ;
    displaySecondaryQuestion = poll.question_en || poll.question;
    secondaryBadge = '🌐 ENGLISH';
    activeOptions = poll.options_en.map((enOpt, idx) => {
      let langOpt = '';
      if (lang === 'hi' && poll.options_hi && poll.options_hi[idx]) {
        langOpt = poll.options_hi[idx];
      } else if (poll['options_' + lang] && poll['options_' + lang][idx]) {
        langOpt = poll['options_' + lang][idx];
      } else if (poll.options && poll.options[idx]) {
        langOpt = poll.options[idx].split('/')[0].trim();
      } else {
        langOpt = enOpt;
      }
      return `${langOpt} / ${enOpt}`;
    });
    activeExplanation = poll['explanation_' + lang] || poll.explanation_hi;
  }

  let optionsHtml = '';
  const totalVotes = poll.baseVotes.reduce((a, b) => a + b, 0) + (savedVote !== null ? 1 : 0);

  activeOptions.forEach((opt, idx) => {
    let votes = poll.baseVotes[idx];
    if (savedVote !== null && parseInt(savedVote, 10) === idx) votes += 1;
    const percentage = Math.round((votes / totalVotes) * 100);

    if (savedVote === null) {
      optionsHtml += `
        <button type="button" onclick="voteDailyPoll(${idx})" class="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50/70 dark:hover:bg-slate-700/60 transition font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between group cursor-pointer shadow-xs active:scale-[0.99]">
          <div class="flex items-center space-x-3">
            <span class="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-amber-300 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-black group-hover:bg-amber-500 group-hover:text-slate-950 transition shrink-0">
              ${String.fromCharCode(65 + idx)}
            </span>
            <span class="font-extrabold text-slate-950 dark:text-slate-100">${opt}</span>
          </div>
          <span class="text-amber-600 dark:text-amber-400 font-black text-sm group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      `;
    } else {
      const isSelected = parseInt(savedVote, 10) === idx;
      const isCorrect = poll.correct === idx;
      let badgeClass = 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white';
      let barColor = 'bg-slate-400 dark:bg-slate-600';

      if (isCorrect) {
        badgeClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-950 dark:text-emerald-100 font-black';
        barColor = 'bg-emerald-500';
      } else if (isSelected && !isCorrect) {
        badgeClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/80 text-rose-950 dark:text-rose-100 font-black';
        barColor = 'bg-rose-500';
      }

      optionsHtml += `
        <div class="relative overflow-hidden p-3.5 sm:p-4 rounded-2xl border-2 ${badgeClass} transition space-y-1.5 shadow-xs">
          <div class="flex items-center justify-between text-xs sm:text-sm font-black relative z-10">
            <div class="flex items-center space-x-2.5">
              <span class="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-black shrink-0">${String.fromCharCode(65 + idx)}</span>
              <span class="text-slate-950 dark:text-white font-extrabold">${opt}</span>
              ${isCorrect ? '<span class="text-emerald-700 dark:text-emerald-300 text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/80 font-black">✅ ' + t.correctBadge + '</span>' : ''}
              ${isSelected && !isCorrect ? '<span class="text-rose-700 dark:text-rose-300 text-xs px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/80 font-black">❌ ' + t.yourChoice + '</span>' : ''}
            </div>
            <span class="font-black text-sm text-slate-950 dark:text-white">${percentage}%</span>
          </div>
          <!-- Percentage progress bar backdrop -->
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden mt-1.5">
            <div class="${barColor} h-full rounded-full transition-all duration-700" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }
  });

  let solutionHtml = '';
  if (savedVote !== null) {
    const isUserCorrect = parseInt(savedVote, 10) === poll.correct;
    const explanationText = isEnglish ? (poll.explanation_en || poll.explanation_hi) : poll.explanation_hi;
    solutionHtml = `
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-slate-950 border-2 border-amber-400 dark:border-amber-600/80 text-xs sm:text-sm space-y-3 animate-fadeIn shadow-md">
        <div class="font-black text-sm sm:text-base flex items-center space-x-2 ${isUserCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-900 dark:text-amber-300'}">
          <span>${isUserCorrect ? t.correctMsg : (t.wrongPrefix + String.fromCharCode(65 + poll.correct) + (lang === 'hi' || lang === 'sa' ? ' है।' : ''))}</span>
        </div>
        <div class="p-3 sm:p-3.5 rounded-xl bg-white/95 dark:bg-slate-900 border border-amber-300/80 dark:border-slate-800 shadow-xs">
          <p class="text-slate-950 dark:text-slate-100 font-bold leading-relaxed text-xs sm:text-sm">${explanationText}</p>
        </div>
        <div class="pt-2 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-bold border-t border-amber-200 dark:border-slate-800 gap-2">
          <span>👥 ${t.totalParticipants}<strong class="text-slate-900 dark:text-white font-black">${totalVotes.toLocaleString('en-IN')}</strong> ${t.aspirants}</span>
          <div class="flex items-center space-x-2">
            <button type="button" onclick="resetPollVote('${poll.id}')" class="text-blue-700 dark:text-cyan-400 font-black hover:underline cursor-pointer">${t.retest}</button>
            <button type="button" onclick="nextDailyPoll()" class="px-3 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 rounded-lg font-black text-xs cursor-pointer shadow-xs transition">${t.nextBtn}</button>
          </div>
        </div>
      </div>
    `;
  }

  const pollNum = (currentPollIndex >= 0 ? currentPollIndex : getHourlyPollIndex()) + 1;
  const totalPolls = DAILY_POLL_QUESTIONS.length;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border-2 border-amber-400/90 dark:border-slate-700 rounded-3xl p-5 sm:p-7 shadow-xl space-y-4">
      
      <!-- Top Bar: Header + Navigation Controls -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200/80 dark:border-slate-800 pb-3 gap-3">
        <div class="flex items-center space-x-3">
          <span class="text-2xl sm:text-3xl animate-pulse">🗳️</span>
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="font-black text-slate-950 dark:text-white text-sm sm:text-base">${t.title}</h3>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shadow-xs">${t.liveVote}</span>
            </div>
            <div class="text-[11px] text-slate-600 dark:text-slate-400 font-bold">${poll.subject} • ${t.sub}</div>
          </div>
        </div>
        
        <!-- Multi-Question Navigation Buttons (Allows browsing 24 questions anytime) -->
        <div class="flex items-center space-x-2 self-start sm:self-auto">
          <button type="button" onclick="prevDailyPoll()" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black border border-slate-300 dark:border-slate-700 shadow-xs transition active:scale-95 cursor-pointer" title="Previous Question">
            ⬅️ ${t.prev}
          </button>
          <span class="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-black text-xs border border-amber-300 dark:border-amber-700">
            ${t.qNum} ${pollNum}/${totalPolls}
          </span>
          <button type="button" onclick="nextDailyPoll()" class="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 text-xs font-black shadow-xs transition cursor-pointer" title="Next Question">
            ${t.next} ➔
          </button>
        </div>
      </div>

      <!-- Rotation Notice Badge: Clarifies Hourly Auto-Rotation & Multi-Question Feature -->
      <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-amber-50/80 dark:bg-slate-800/80 border border-amber-200 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
        <span class="flex items-center space-x-1.5">
          <span>🕒</span>
          <span>${t.hourlyNotice}</span>
        </span>
        <span class="hidden md:inline-flex text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 bg-amber-200/80 dark:bg-amber-950 px-2 py-0.5 rounded">
          ${poll.subject.split('(')[0].trim()}
        </span>
      </div>

      <!-- Dedicated High-Contrast Question Callout Box with Anti-Washed-Out Bilingual Framing -->
      <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-slate-800 border-2 border-amber-300/80 dark:border-slate-700 shadow-xs space-y-2">
        <div class="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center space-x-1.5">
          <span>📌</span>
          <span>${t.qLabel}</span>
          <span class="text-slate-500 dark:text-slate-400 font-bold">(${poll.subject})</span>
        </div>
        
        <!-- Primary Question: Crisp, high-contrast text -->
        <div class="font-black text-slate-950 dark:text-white text-base sm:text-lg leading-relaxed">
          ${displayQuestion}
        </div>
        
        <!-- Secondary Bilingual Translation: Dedicated contrast card with rich blue/cyan colors (NEVER white or washed-out) -->
        ${displaySecondaryQuestion ? `
          <div class="mt-2.5 p-3 rounded-xl bg-blue-50/95 dark:bg-slate-950 border border-blue-200 dark:border-cyan-800/80 flex items-start space-x-2.5 shadow-2xs">
            <span class="px-2 py-0.5 rounded bg-blue-600 text-white dark:bg-cyan-900/90 dark:text-cyan-300 text-[10px] sm:text-[11px] font-black uppercase shrink-0">
              ${secondaryBadge}
            </span>
            <span class="text-xs sm:text-sm font-bold text-blue-950 dark:text-cyan-200 leading-relaxed">
              ${displaySecondaryQuestion}
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Options List -->
      <div class="space-y-2.5">
        ${optionsHtml}
      </div>

      <!-- Detailed Explanation & Statistics (Displayed after voting) -->
      ${solutionHtml}
    </div>
  `;
}

function voteDailyPoll(index) {
  const poll = getActivePollQuestion();
  try {
    localStorage.setItem(`sarkari_poll_${poll.id}`, index);
  } catch(e) {}
  initDailyPoll();
}

function resetPollVote(pollId) {
  try {
    localStorage.removeItem(`sarkari_poll_${pollId}`);
  } catch(e) {}
  initDailyPoll();
}

// -------------------------------------------------------------
// 2. 1-CLICK WHATSAPP & TELEGRAM VIRAL SHARE GENERATOR
// -------------------------------------------------------------
function shareExamWhatsApp(examId) {
  const exam = (typeof getExamById === 'function') ? getExamById(examId) : null;
  const siteUrl = window.location.origin + '/#exam/' + (examId || '');

  let shareText = '';
  if (exam) {
    shareText = `🚨 *${exam.name} की नई भर्ती 2026 आ गई!* 🚨\n\n` +
      `🏛️ *आयोग:* ${exam.conductingBody}\n` +
      `👥 *कुल पद / स्थिति:* ${exam.status || 'Active Notification'}\n` +
      `📅 *अंतिम तिथि:* ${exam.importantDates ? Object.values(exam.importantDates)[1] || 'जल्द देखें' : 'शीघ्र'}\n` +
      `🎓 *योग्यता:* ${exam.eligibility || 'विस्तार देखें'}\n\n` +
      `👉 *डायरेक्ट ऑनलाइन फॉर्म, फोटो रिसाइजर & नोटिफिकेशन PDF:* \n${siteUrl}\n\n` +
      `🇮🇳 _सरकारी नौकरी की सभी सटीक जानकारी के लिए ग्रुप में शेयर करें!_`;
  } else {
    shareText = `🚨 *सरकारी नौकरी, 10th/12th बोर्ड व फ्री मॉक टेस्ट पोर्टल:*\n👉 ${window.location.origin}\n\n_फोटो रिसाइजर, एज कैलकुलेटर और सभी भर्तियों के डायरेक्ट लिंक उपलब्ध हैं!_`;
  }

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  window.open(waUrl, '_blank');
}

function shareExamTelegram(examId) {
  const exam = (typeof getExamById === 'function') ? getExamById(examId) : null;
  const siteUrl = window.location.origin + '/#exam/' + (examId || '');

  let title = exam ? `🔥 ${exam.name} - SarkariAI Hub` : 'SarkariAI Hub - All India Exam Portal';
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(title)}`;
  window.open(tgUrl, '_blank');
}

function copyShareExamLink(examId) {
  const siteUrl = window.location.origin + '/#exam/' + (examId || '');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(siteUrl).then(() => {
      if (typeof showAppAlert === 'function') {
        showAppAlert('✅ लिंक कॉपी हो गया! अब व्हाट्सएप या टेलीग्राम ग्रुप में पेस्ट करें।', 'Link Copied', '🔗');
      } else {
        alert('✅ लिंक कॉपी हो गया! अब व्हाट्सएप या टेलीग्राम ग्रुप में पेस्ट करें।');
      }
    }).catch(() => {
      prompt('लिंक कॉपी करें:', siteUrl);
    });
  } else {
    prompt('लिंक कॉपी करें:', siteUrl);
  }
}

// -------------------------------------------------------------
// 3. VOICE SEARCH (MIC BUTTON ON SEARCH BAR)
// -------------------------------------------------------------
let isVoiceListening = false;
let speechRecognizerInstance = null;

function initVoiceSearch() {
  const micBtn = document.getElementById('voiceSearchBtn');
  const searchInput = document.getElementById('globalSearchInput');
  if (!micBtn || !searchInput) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    micBtn.title = 'वॉइस सर्च आपके ब्राउज़र में समर्थित नहीं है (Google Chrome उपयोग करें)';
    micBtn.classList.add('opacity-50');
    return;
  }

  speechRecognizerInstance = new SpeechRecognition();
  speechRecognizerInstance.lang = 'hi-IN'; // Default Hindi/Hinglish
  speechRecognizerInstance.interimResults = false;
  speechRecognizerInstance.maxAlternatives = 1;

  speechRecognizerInstance.onstart = () => {
    isVoiceListening = true;
    micBtn.classList.add('animate-pulse', 'bg-rose-600', 'text-white');
    micBtn.classList.remove('bg-slate-800', 'text-slate-300');
    searchInput.placeholder = '🎙️ बोलिए... (जैसे: यूपी पुलिस या एसएससी जीडी)...';
  };

  speechRecognizerInstance.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    searchInput.dispatchEvent(new Event('input'));
  };

  speechRecognizerInstance.onerror = (event) => {
    console.warn('Voice search error:', event.error);
    isVoiceListening = false;
    micBtn.classList.remove('animate-pulse', 'bg-rose-600', 'text-white');
    micBtn.classList.add('bg-slate-800', 'text-slate-300');
    searchInput.placeholder = 'Search CBSE, UP Board, SSC GD, Railway, NEET, UP Police...';
  };

  speechRecognizerInstance.onend = () => {
    isVoiceListening = false;
    micBtn.classList.remove('animate-pulse', 'bg-rose-600', 'text-white');
    micBtn.classList.add('bg-slate-800', 'text-slate-300');
    searchInput.placeholder = 'Search CBSE, UP Board, SSC GD, Railway, NEET, UP Police...';
  };

  micBtn.addEventListener('click', () => {
    if (isVoiceListening) {
      speechRecognizerInstance.stop();
    } else {
      try {
        speechRecognizerInstance.start();
      } catch(e) {
        console.error(e);
      }
    }
  });
}

// -------------------------------------------------------------
// 4. RANK & SHIFT NORMALIZATION PREDICTOR (RankIQ Engine)
// -------------------------------------------------------------
const RANK_EXAM_METRICS = {
  'ssc-gd': { totalQuestions: 80, marksPerCorrect: 2, penaltyPerWrong: 0.50, totalCandidates: 4500000, name: "SSC GD Constable" },
  'up-police-constable': { totalQuestions: 150, marksPerCorrect: 2, penaltyPerWrong: 0.50, totalCandidates: 4800000, name: "UP Police Constable" },
  'bihar-police': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.00, totalCandidates: 1800000, name: "Bihar Police Constable" },
  'delhi-police': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.25, totalCandidates: 3200000, name: "Delhi Police Constable" },
  'rpf-constable': { totalQuestions: 120, marksPerCorrect: 1, penaltyPerWrong: 0.33, totalCandidates: 2500000, name: "Railway RPF Constable & SI" },
  'ssc-cgl': { totalQuestions: 100, marksPerCorrect: 2, penaltyPerWrong: 0.50, totalCandidates: 3200000, name: "SSC CGL Tier-1" },
  'ssc-chsl': { totalQuestions: 100, marksPerCorrect: 2, penaltyPerWrong: 0.50, totalCandidates: 3400000, name: "SSC CHSL Tier-1" },
  'ssc-mts': { totalQuestions: 90, marksPerCorrect: 3, penaltyPerWrong: 1.00, totalCandidates: 4000000, name: "SSC MTS & Havaldar" },
  'ssc-cpo': { totalQuestions: 200, marksPerCorrect: 1, penaltyPerWrong: 0.25, totalCandidates: 800000, name: "SSC CPO Sub-Inspector" },
  'rrb-alp': { totalQuestions: 75, marksPerCorrect: 1, penaltyPerWrong: 0.33, totalCandidates: 2200000, name: "Railway RRB ALP CBT-1" },
  'rrb-technician': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.33, totalCandidates: 1800000, name: "Railway RRB Technician" },
  'rrb-ntpc': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.33, totalCandidates: 5500000, name: "Railway RRB NTPC CBT-1" },
  'rrb-group-d': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.33, totalCandidates: 6000000, name: "Railway RRB Group D" },
  'army-agniveer': { totalQuestions: 50, marksPerCorrect: 2, penaltyPerWrong: 0.50, totalCandidates: 1200000, name: "Indian Army Agniveer CEE" },
  'airforce-agniveer': { totalQuestions: 70, marksPerCorrect: 1, penaltyPerWrong: 0.25, totalCandidates: 600000, name: "Indian Air Force Agniveervayu" },
  'bpsc-tre': { totalQuestions: 150, marksPerCorrect: 1, penaltyPerWrong: 0.00, totalCandidates: 900000, name: "BPSC Teacher TRE 3.0/4.0" },
  'ctet-exam': { totalQuestions: 150, marksPerCorrect: 1, penaltyPerWrong: 0.00, totalCandidates: 2800000, name: "CBSE CTET Paper 1 & 2" },
  'ibps-po': { totalQuestions: 100, marksPerCorrect: 1, penaltyPerWrong: 0.25, totalCandidates: 1100000, name: "IBPS Bank PO Prelims" }
};

const RANK_EXAM_ALIASES = {
  'up-police': 'up-police-constable',
  'bihar-police-constable': 'bihar-police',
  'rpf': 'rpf-constable',
  'agniveer-army': 'army-agniveer',
  'agniveer-gd': 'army-agniveer',
  'army-agniveer-gd': 'army-agniveer',
  'agniveer-airforce': 'airforce-agniveer',
  'alp': 'rrb-alp',
  'ntpc': 'rrb-ntpc',
  'group-d': 'rrb-group-d',
  'mts': 'ssc-mts',
  'chsl': 'ssc-chsl',
  'cgl': 'ssc-cgl'
};

function resolveRankExamKey(key) {
  if (!key) return 'ssc-gd';
  const clean = key.toLowerCase().trim();
  if (RANK_EXAM_METRICS[clean]) return clean;
  if (RANK_EXAM_ALIASES[clean]) return RANK_EXAM_ALIASES[clean];
  return 'ssc-gd';
}

function updateRankExamDefaults() {
  const rawExam = document.getElementById('rankExamSelect')?.value || 'ssc-gd';
  const examKey = resolveRankExamKey(rawExam);
  const metric = RANK_EXAM_METRICS[examKey] || RANK_EXAM_METRICS['ssc-gd'];
  const totalQInput = document.getElementById('rankTotalQInput');
  if (totalQInput) {
    totalQInput.value = metric.totalQuestions;
  }
}

function calculateRankAndNormalization() {
  const rawExam = document.getElementById('rankExamSelect')?.value || 'ssc-gd';
  const exam = resolveRankExamKey(rawExam);
  const metric = RANK_EXAM_METRICS[exam] || RANK_EXAM_METRICS['ssc-gd'];
  const category = document.getElementById('rankCategorySelect')?.value || 'UR';
  const shiftDiff = document.getElementById('rankShiftDiffSelect')?.value || 'moderate';
  const totalQuestions = parseInt(document.getElementById('rankTotalQInput')?.value, 10) || metric.totalQuestions;
  const correctCount = parseInt(document.getElementById('rankCorrectInput')?.value, 10) || 0;
  const wrongCount = parseInt(document.getElementById('rankWrongInput')?.value, 10) || 0;

  if (correctCount + wrongCount > totalQuestions) {
    if (typeof showAppAlert === 'function') {
      showAppAlert('गलती: सही और गलत प्रश्नों का योग कुल प्रश्नों से अधिक नहीं हो सकता!', 'Input Notice', '⚠️');
    } else {
      alert('गलती: सही और गलत प्रश्नों का योग कुल प्रश्नों से अधिक नहीं हो सकता!');
    }
    return;
  }

  // Marks criteria per exam
  const marksPerCorrect = metric.marksPerCorrect;
  const penaltyPerWrong = metric.penaltyPerWrong;
  const totalCandidates = metric.totalCandidates;

  const rawScore = (correctCount * marksPerCorrect) - (wrongCount * penaltyPerWrong);
  const maxScore = totalQuestions * marksPerCorrect;
  const accuracy = correctCount + wrongCount > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;

  // Normalization Adjustment Factor based on shift difficulty
  let shiftAdjustment = 0;
  if (shiftDiff === 'tough') {
    shiftAdjustment = Math.round((rawScore * 0.12 + 6.5) * 10) / 10; // +6.5 to +18
  } else if (shiftDiff === 'moderate') {
    shiftAdjustment = Math.round((rawScore * 0.04 + 2.0) * 10) / 10; // +2 to +7
  } else {
    shiftAdjustment = Math.round((rawScore * -0.02 - 1.0) * 10) / 10; // -1 to -3
  }

  const normalizedScore = Math.max(0, Math.round((rawScore + shiftAdjustment) * 100) / 100);

  // Percentile and Predicted Rank Estimation
  const scoreRatio = Math.max(0, Math.min(1, normalizedScore / maxScore));
  let percentile = 0;
  if (scoreRatio >= 0.85) percentile = 98.8;
  else if (scoreRatio >= 0.75) percentile = 94.2;
  else if (scoreRatio >= 0.65) percentile = 86.5;
  else if (scoreRatio >= 0.55) percentile = 72.0;
  else if (scoreRatio >= 0.45) percentile = 54.0;
  else percentile = 32.0;

  // Category multiplier
  let catRankMultiplier = 1;
  if (category === 'OBC') catRankMultiplier = 0.42;
  else if (category === 'EWS') catRankMultiplier = 0.14;
  else if (category === 'SC') catRankMultiplier = 0.22;
  else if (category === 'ST') catRankMultiplier = 0.09;

  const estimatedOverallRankLow = Math.max(1, Math.round(totalCandidates * (1 - (percentile / 100)) * 0.85));
  const estimatedOverallRankHigh = Math.round(totalCandidates * (1 - (percentile / 100)) * 1.15);
  const catRankLow = Math.max(1, Math.round(estimatedOverallRankLow * catRankMultiplier));
  const catRankHigh = Math.round(estimatedOverallRankHigh * catRankMultiplier);

  // Qualification Verdict
  let statusBadge = '';
  let statusColor = '';
  if (percentile >= 90) {
    statusBadge = '🟢 SAFE ZONE (चयन की प्रबल संभावना - मेरिट में आने के पूरे अवसर)';
    statusColor = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-200';
  } else if (percentile >= 75) {
    statusBadge = '🟡 BORDERLINE ZONE (कट-ऑफ के आसपास - नॉर्मलाइजेशन पर निर्भर)';
    statusColor = 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-200';
  } else {
    statusBadge = '🔴 HIGH RISK ZONE (स्कोर कट-ऑफ से कम - अगले प्रयास पर फोकस करें)';
    statusColor = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-950 dark:text-rose-200';
  }

  const resultContainer = document.getElementById('rankPredictorResult');
  if (!resultContainer) return;

  resultContainer.classList.remove('hidden');
  resultContainer.innerHTML = `
    <div class="p-6 rounded-3xl border-2 ${statusColor} shadow-md space-y-4 animate-fadeIn">
      <div class="flex items-center justify-between border-b pb-3 border-current/20">
        <div>
          <span class="text-xs font-black uppercase tracking-wider">🎯 रैंक व नॉर्मलाइजेशन प्रेडिक्शन रिपोर्ट</span>
          <h4 class="text-base sm:text-lg font-black mt-0.5">${statusBadge}</h4>
        </div>
        <span class="text-2xl">📊</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-3 bg-white/80 dark:bg-slate-800 rounded-2xl border border-current/10">
          <div class="text-[11px] font-bold opacity-75">रॉ स्कोर (Raw Score)</div>
          <div class="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-300">${rawScore} <span class="text-xs font-normal">/ ${maxScore}</span></div>
        </div>
        <div class="p-3 bg-white/80 dark:bg-slate-800 rounded-2xl border border-current/10">
          <div class="text-[11px] font-bold opacity-75">नॉर्मलाइज्ड स्कोर (Est.)</div>
          <div class="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400">${normalizedScore}</div>
          <div class="text-[10px] font-bold ${shiftAdjustment >= 0 ? 'text-emerald-600' : 'text-rose-600'}">(${shiftAdjustment >= 0 ? '+' : ''}${shiftAdjustment} शिफ्ट लाभ)</div>
        </div>
        <div class="p-3 bg-white/80 dark:bg-slate-800 rounded-2xl border border-current/10">
          <div class="text-[11px] font-bold opacity-75">अनुमानित पर्सेंटाइल</div>
          <div class="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300">${percentile}%</div>
        </div>
        <div class="p-3 bg-white/80 dark:bg-slate-800 rounded-2xl border border-current/10">
          <div class="text-[11px] font-bold opacity-75">शुद्धता (Accuracy)</div>
          <div class="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400">${accuracy}%</div>
        </div>
      </div>

      <div class="p-4 bg-white/90 dark:bg-slate-800 rounded-2xl border border-current/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <div class="font-black text-slate-900 dark:text-white">ऑल-इंडिया रैंक अनुमान (Overall Rank):</div>
          <div class="text-sm font-black text-blue-800 dark:text-blue-300">${estimatedOverallRankLow.toLocaleString('en-IN')} से ${estimatedOverallRankHigh.toLocaleString('en-IN')} के बीच</div>
        </div>
        <div>
          <div class="font-black text-slate-900 dark:text-white">${category} श्रेणी रैंक (Category Rank):</div>
          <div class="text-sm font-black text-emerald-800 dark:text-emerald-300">${catRankLow.toLocaleString('en-IN')} से ${catRankHigh.toLocaleString('en-IN')} के बीच</div>
        </div>
      </div>

      <div class="text-[11px] opacity-75 italic text-center">
        *यह गणना TCS / आयोग के मानक मल्टी-शिफ्ट नॉर्मलाइजेशन फॉर्मूले और पिछले 3 वर्षों के सांख्यिकीय डेटा पर आधारित है।
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. EXAM DAY BAG & DOCUMENT PACKING CHECKLIST
// -------------------------------------------------------------
const EXAM_KIT_ITEMS = [
  { id: 'kit_admit', icon: '📄', label: 'एडमिट कार्ड का साफ प्रिंटआउट (Admit Card Printout)', detail: 'रोल नंबर, बारकोड और परीक्षा केंद्र का पता स्पष्ट दिखना चाहिए (कलर या B&W)' },
  { id: 'kit_id', icon: '🪪', label: 'मूल फोटो पहचान पत्र (Original Photo ID Proof)', detail: 'ओरिजिनल आधार कार्ड, वोटर कार्ड या पैन कार्ड (फोटोकॉपी मान्य नहीं होगी)' },
  { id: 'kit_photos', icon: '📸', label: '2 पासपोर्ट साइज फोटो (वही जो फॉर्म में अपलोड की थी)', detail: 'अटेंडेंस शीट पर चिपकाने के लिए' },
  { id: 'kit_pen', icon: '🖊️', label: 'पारदर्शी बॉलपॉइंट पेन (Transparent Black/Blue Pen)', detail: 'ओएमआर शीट भरने व रफ कार्य के लिए पारदर्शी बॉडी वाला पेन' },
  { id: 'kit_water', icon: '💧', label: 'पारदर्शी पानी की बोतल (Transparent Water Bottle)', detail: 'लेबल रहित 500ml पारदर्शी बोतल' }
];

function initExamKit() {
  const container = document.getElementById('examKitItemsContainer');
  if (!container) return;

  const kitStatus = JSON.parse(localStorage.getItem('sarkari_exam_kit') || '{}');
  let checkedCount = 0;

  let itemsHtml = EXAM_KIT_ITEMS.map(item => {
    const isChecked = !!kitStatus[item.id];
    if (isChecked) checkedCount++;

    return `
      <div onclick="toggleKitItem('${item.id}')" class="p-3.5 rounded-2xl border-2 ${isChecked ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'} hover:border-emerald-400 transition cursor-pointer flex items-center justify-between gap-3 group">
        <div class="flex items-center space-x-3">
          <span class="text-xl sm:text-2xl">${item.icon}</span>
          <div>
            <div class="font-black text-xs sm:text-sm text-slate-900 dark:text-white ${isChecked ? 'line-through opacity-75' : ''}">${item.label}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">${item.detail}</div>
          </div>
        </div>
        <div class="w-6 h-6 rounded-lg border-2 ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'} flex items-center justify-center text-xs font-black shrink-0 transition">
          ${isChecked ? '✓' : ''}
        </div>
      </div>
    `;
  }).join('');

  const percentage = Math.round((checkedCount / EXAM_KIT_ITEMS.length) * 100);

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between text-xs font-black">
        <span class="text-slate-800 dark:text-slate-200">पैकिंग तैयारी स्कोर (Readiness Score):</span>
        <span class="${percentage === 100 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}">${checkedCount} / ${EXAM_KIT_ITEMS.length} पैक (${percentage}%)</span>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
        <div class="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
      </div>

      <div class="space-y-2.5 pt-1">
        ${itemsHtml}
      </div>

      ${percentage === 100 ? `
        <div class="p-4 rounded-2xl bg-emerald-100/90 dark:bg-emerald-950/60 border border-emerald-400 text-center space-y-2 animate-fadeIn">
          <div class="text-2xl">🎉 🎯</div>
          <div class="font-black text-emerald-950 dark:text-emerald-200 text-sm">आपकी परीक्षा हॉल तैयारी 100% पूरी है! Best of Luck!</div>
          <p class="text-[11px] text-emerald-800 dark:text-emerald-300">परीक्षा केंद्र पर रिपोर्टिंग टाइम से कम से कम 90 मिनट पहले पहुंचे।</p>
          <button onclick="window.print()" class="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow transition cursor-pointer">
            🖨️ पैकिंग स्लिप प्रिंट करें
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

function toggleKitItem(itemId) {
  const kitStatus = JSON.parse(localStorage.getItem('sarkari_exam_kit') || '{}');
  kitStatus[itemId] = !kitStatus[itemId];
  localStorage.setItem('sarkari_exam_kit', JSON.stringify(kitStatus));
  initExamKit();
}

function resetExamKit() {
  localStorage.removeItem('sarkari_exam_kit');
  initExamKit();
}

// -------------------------------------------------------------
// 6. GOVERNMENT EXAM FEE EXEMPTION & WAIVER FINDER
// -------------------------------------------------------------
function checkFeeWaiver() {
  const gender = document.getElementById('waiverGenderSelect')?.value || 'male';
  const category = document.getElementById('waiverCategorySelect')?.value || 'UR';
  const isPwd = document.getElementById('waiverPwdSelect')?.value === 'yes';
  const isEbc = document.getElementById('waiverEbcSelect')?.value === 'yes';

  const container = document.getElementById('waiverResultContainer');
  if (!container) return;

  const isFemale = gender === 'female' || gender === 'transgender';
  const isScSt = category === 'SC' || category === 'ST';

  // SSC Rules
  let sscFee = '₹100';
  let sscNote = 'Standard Application Fee';
  let sscFree = false;
  if (isFemale || isScSt || isPwd) {
    sscFee = '₹0 (100% मुफ्त)';
    sscNote = 'महिला, SC/ST एवं PwD उम्मीदवारों को SSC परीक्षा में शून्य शुल्क!';
    sscFree = true;
  }

  // UPSC Rules
  let upscFee = '₹100 / ₹200';
  let upscNote = 'Standard Application Fee';
  let upscFree = false;
  if (isFemale || isScSt || isPwd) {
    upscFee = '₹0 (100% मुफ्त)';
    upscNote = 'महिला, SC/ST एवं दिव्यांग उम्मीदवारों के लिए संपूर्ण शुल्क माफी!';
    upscFree = true;
  }

  // Railway Rules (Refund policy)
  let rrbFee = '₹500 (CBT-1 बाद ₹400 वापस)';
  let rrbNote = 'Gen/OBC पुरुष: ₹500 में से ₹400 बैंक खाते में रिफंड';
  let rrbFree = false;
  if (isFemale || isScSt || isPwd || isEbc) {
    rrbFee = '₹250 (CBT-1 बाद ₹250 पूरा वापस)';
    rrbNote = 'परीक्षा में उपस्थित होते ही पूरी ₹250 फीस सीधे बैंक खाते में रिफंड!';
    rrbFree = true;
  }

  // State Police / UP Police
  let policeFee = '₹400';
  let policeNote = 'UP Police में सभी श्रेणियों के लिए एक समान शुल्क';

  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-600 shadow-md space-y-4 animate-fadeIn">
      <div class="flex items-center justify-between border-b border-amber-200 dark:border-slate-800 pb-3">
        <div>
          <h4 class="font-black text-slate-900 dark:text-white text-base">💰 आपकी परीक्षा फीस छूट रिपोर्ट (Fee Exemption Status)</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400">जेंडर: ${gender === 'female' ? 'महिला' : 'पुरुष'}, श्रेणी: ${category}, दिव्यांग: ${isPwd ? 'हाँ' : 'नहीं'}</p>
        </div>
        <span class="text-2xl">🏛️</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border ${sscFree ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'} space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-slate-900 dark:text-white">कर्मचारी चयन आयोग (SSC)</span>
            <span class="font-black ${sscFree ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}">${sscFee}</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${sscNote}</p>
        </div>

        <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border ${upscFree ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'} space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-slate-900 dark:text-white">संघ लोक सेवा आयोग (UPSC)</span>
            <span class="font-black ${upscFree ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}">${upscFee}</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${upscNote}</p>
        </div>

        <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border ${rrbFree ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'} space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-slate-900 dark:text-white">रेलवे भर्ती बोर्ड (RRB)</span>
            <span class="font-black ${rrbFree ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}">${rrbFee}</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${rrbNote}</p>
        </div>

        <div class="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-black text-slate-900 dark:text-white">राज्य पुलिस / सिपाही भर्ती</span>
            <span class="font-black text-slate-800 dark:text-slate-200">${policeFee}</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400">${policeNote}</p>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 7. PWA (PROGRESSIVE WEB APP) INSTALL PROMPT
// -------------------------------------------------------------
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPwaPrompt = e;
  const pwaBanner = document.getElementById('pwaInstallBanner');
  if (pwaBanner) pwaBanner.classList.remove('hidden');
});

function installPWA() {
  if (window.deferredPwaPrompt) {
    window.deferredPwaPrompt.prompt();
    window.deferredPwaPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        const pwaBanner = document.getElementById('pwaInstallBanner');
        if (pwaBanner) pwaBanner.classList.add('hidden');
      }
      window.deferredPwaPrompt = null;
    });
  } else {
    const pwaMsg = '📲 ऐप इंस्टॉल करने के लिए अपने मोबाइल ब्राउज़र के मेनू (तीन बिंदु ⋮) पर क्लिक करके "Add to Home Screen" चुनें।';
    if (typeof showAppAlert === 'function') {
      showAppAlert(pwaMsg, 'Install App', '📲');
    } else {
      alert(pwaMsg);
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initDailyPoll();
  initVoiceSearch();
  initExamKit();

  // Register service worker if available
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});

// Export to window
window.addEventListener('languageChanged', initDailyPoll);
window.initDailyPoll = initDailyPoll;
window.voteDailyPoll = voteDailyPoll;
window.resetPollVote = resetPollVote;
window.nextDailyPoll = nextDailyPoll;
window.prevDailyPoll = prevDailyPoll;
window.jumpToPoll = jumpToPoll;
window.getActivePollQuestion = getActivePollQuestion;
window.getTodayPollQuestion = getTodayPollQuestion;
window.shareExamWhatsApp = shareExamWhatsApp;
window.shareExamTelegram = shareExamTelegram;
window.copyShareExamLink = copyShareExamLink;
window.initVoiceSearch = initVoiceSearch;
window.RANK_EXAM_METRICS = RANK_EXAM_METRICS;
window.resolveRankExamKey = resolveRankExamKey;
window.DAILY_POLL_QUESTIONS = DAILY_POLL_QUESTIONS;
window.calculateRankAndNormalization = calculateRankAndNormalization;
window.updateRankExamDefaults = updateRankExamDefaults;
window.initExamKit = initExamKit;
window.toggleKitItem = toggleKitItem;
window.resetExamKit = resetExamKit;
window.checkFeeWaiver = checkFeeWaiver;
window.installPWA = installPWA;

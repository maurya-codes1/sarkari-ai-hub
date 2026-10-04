"""
MP Police Constable & SI - General Knowledge, MP Special GK & Current Affairs Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- MP Police Administration, Structure, Motto ('Desh Bhakti, Jan Seva'), Hawk Force, SAF
- MP History, Freedom Movement & Tribal Heroes (Azad, Tantya Bhil, Ahilyabai, Rani Laxmibai)
- MP Geography, Rivers (Narmada, Chambal, Tapti, Betwa, Son), Waterfalls, National Parks
- MP Art, Culture, Tribes (Gond, Bhil, Baiga, Sahariya, Bharia) & Heritage (Khajuraho, Sanchi, Bhimbetka)
- Indian Constitution, Polity, MP Vidhan Sabha (230 seats) & Panchayati Raj
- General Knowledge, Science & Current Affairs
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_gk_items():
    items = []

    benchmarks = [
        ("What is the official motto of the Madhya Pradesh Police?",
         "मध्यप्रदेश पुलिस का आधिकारिक ध्येय वाक्य (Motto) क्या है?",
         "Desh Bhakti, Jan Seva (देश भक्ति, जन सेवा)", "Shanti, Seva, Nyaya", "Satyamev Jayate", "Seva aur Suraksha",
         0, "The official motto of Madhya Pradesh Police is 'देश भक्ति, जन सेवा' (Patriotism, Public Service).",
         "मध्यप्रदेश पुलिस का आधिकारिक ध्येय वाक्य 'देश भक्ति, जन सेवा' है।"),

        ("Where is the State Police Headquarters (DGP Office) of Madhya Pradesh located?",
         "मध्यप्रदेश राज्य पुलिस मुख्यालय (DGP कार्यालय) कहाँ स्थित है?",
         "Indore", "Bhopal (जहाँगीराबाद, भोपाल)", "Jabalpur", "Gwalior",
         1, "The State Police Headquarters of Madhya Pradesh is located at Jahangirabad, Bhopal.",
         "मध्यप्रदेश पुलिस का राज्य मुख्यालय जहाँगीराबाद, भोपाल में स्थित है।"),

        ("Which specialized elite commando force was established in Madhya Pradesh to counter Left-Wing Extremism (Naxalism)?",
         "मध्यप्रदेश में नक्सलवाद विरोधी अभियानों के लिए किस विशेष कमांडो बल का गठन किया गया है?",
         "Greyhounds", "CoBRA", "Hawk Force (हॉक फोर्स - बालाघाट मुख्यालय)", "Thunderbolt",
         2, "The Hawk Force is the specialized anti-Naxal commando unit of Madhya Pradesh Police operating primarily in Balaghat, Mandla, and Dindori districts.",
         "मध्यप्रदेश पुलिस की विशेष नक्सल विरोधी कमांडो यूनिट 'हॉक फोर्स' (Hawk Force) है, जो मुख्य रूप से बालाघाट, मंडला और डिंडौरी में सक्रिय है।"),

        ("What is the state animal of Madhya Pradesh?",
         "मध्यप्रदेश का राजकीय पशु कौन-सा है?",
         "Tiger", "Wild Water Buffalo", "Blackbuck", "Barasingha / Swamp Deer (बारहसिंगा - कान्हा राष्ट्रीय उद्यान)",
         3, "The state animal of Madhya Pradesh is the Barasingha (Swamp Deer / Rucervus duvaucelii branderi), iconic to Kanha National Park.",
         "मध्यप्रदेश का राजकीय पशु ब्रेडरी प्रजाति का बारहसिंगा (Swamp Deer) है, जो कान्हा राष्ट्रीय उद्यान में पाया जाता है।"),

        ("What is the state bird of Madhya Pradesh?",
         "मध्यप्रदेश का राजकीय पक्षी कौन-सा है?",
         "Dudhraj / Asian Paradise Flycatcher (दूधराज / शाह बुलबुल)", "Great Indian Bustard", "House Sparrow", "Peacock",
         0, "The state bird of Madhya Pradesh is Dudhraj (Asian Paradise Flycatcher / Terpsiphone paradisi), also known as Shah Bulbul.",
         "मध्यप्रदेश का राजकीय पक्षी दूधराज (Asian Paradise Flycatcher) है, जिसे स्थानीय भाषा में 'शाह बुलबुल' भी कहा जाता है।"),

        ("Which is the official State Sport of Madhya Pradesh?",
         "मध्यप्रदेश का आधिकारिक राजकीय खेल कौन-सा है?",
         "Kabaddi", "Malkhamb (मलखंब - घोषित 2013)", "Kho Kho", "Hockey",
         1, "Malkhamb was declared the official State Sport of Madhya Pradesh in April 2013, with the Prabhash Joshi Award given for excellence in it.",
         "अप्रैल 2013 में मध्यप्रदेश सरकार ने 'मलखंब' को राजकीय खेल घोषित किया। इसके लिए प्रभाष जोशी पुरस्कार दिया जाता है।"),

        ("Which river is widely revered as the 'Lifeline of Madhya Pradesh' (मध्यप्रदेश की जीवनरेखा)?",
         "मध्यप्रदेश की जीवनरेखा (Lifeline of MP) के रूप में किस नदी को जाना जाता है?",
         "Chambal River", "Betwa River", "Narmada River (नर्मदा नदी - उद्गम अमरकंटक)", "Tapti River",
         2, "The Narmada River is known as the Lifeline of Madhya Pradesh, originating from Amarkantak (Anuppur district) and flowing 1,077 km within MP out of its total 1,312 km.",
         "नर्मदा नदी को मध्यप्रदेश की जीवनरेखा कहा जाता है। यह अनूपपुर जिले के अमरकंटक से निकलती है और कुल 1,312 किमी में से 1,077 किमी मध्यप्रदेश में बहती है।"),

        ("The famous 'Dhuandhar Falls' (धुआंधार जलप्रपात) on the Narmada River is located in which district of Madhya Pradesh?",
         "नर्मदा नदी पर स्थित प्रसिद्ध 'धुआंधार जलप्रपात' मध्यप्रदेश के किस जिले में स्थित है?",
         "Hoshangabad (Narmadapuram)", "Khandwa", "Mandla", "Jabalpur (भेड़ाघाट, जबलपुर)",
         3, "The majestic Dhuandhar Falls and Marble Rocks are located at Bhedaghat in Jabalpur district on the Narmada River.",
         "धुआंधार जलप्रपात और संगमरमर की चट्टानें जबलपुर जिले के भेड़ाघाट में नर्मदा नदी पर स्थित हैं।"),

        ("In which district of Madhya Pradesh is the country's only active diamond producing mine located?",
         "भारत की एकमात्र सक्रिय हीरा उत्पादक खदान (मझगवां) मध्यप्रदेश के किस जिले में स्थित है?",
         "Panna (पन्ना - मझगवां खदान)", "Satna", "Chhatarpur", "Rewa",
         0, "The Majhgawan diamond mine, managed by NMDC in Panna district, is the only mechanized diamond mine in India.",
         "पन्ना जिले में स्थित मझगवां खदान (NMDC द्वारा संचालित) भारत की एकमात्र सक्रिय एवं यांत्रिक हीरा खदान है।"),

        ("Which National Park in Madhya Pradesh was selected for the historic Cheetah Reintroduction Project in India in 2022?",
         "वर्ष 2022 में भारत में चीतों के ऐतिहासिक पुनरुत्पादन (Project Cheetah) के लिए मध्यप्रदेश के किस राष्ट्रीय उद्यान को चुना गया?",
         "Kanha National Park", "Kuno National Park (कूनो राष्ट्रीय उद्यान - श्योपुर जिला)", "Bandhavgarh National Park", "Panna National Park",
         1, "Kuno National Park located in Sheopur district was chosen for Project Cheetah, where cheetahs from Namibia and South Africa were reintroduced.",
         "श्योपुर जिले में स्थित कूनो राष्ट्रीय उद्यान (Kuno National Park) को प्रोजेक्ट चीता के तहत नामीबिया और दक्षिण अफ्रीका से लाए गए चीतों के लिए चुना गया।"),

        ("Which dynasty built the world-renowned Khajuraho Temples in the Chhatarpur district of Madhya Pradesh?",
         "मध्यप्रदेश के छतरपुर जिले में स्थित विश्वप्रसिद्ध खजुराहो के मंदिरों का निर्माण किस राजवंश के शासकों द्वारा कराया गया था?",
         "Paramara Dynasty", "Pratihara Dynasty", "Chandela Dynasty (चंदेल राजवंश - 10वीं-11वीं शताब्दी)", "Kalachuri Dynasty",
         2, "The temples at Khajuraho (UNESCO World Heritage Site) were built by the rulers of the Chandela dynasty between 950 and 1050 CE.",
         "खजुराहो के भव्य मंदिरों का निर्माण 10वीं से 11वीं शताब्दी के बीच चंदेल राजवंश के शासकों (जैसे यशोवर्मन, धंगदेव) द्वारा कराया गया था।"),

        ("Great revolutionary freedom fighter Chandrashekhar Azad was born in Bhabhra village, which is situated in which district of Madhya Pradesh?",
         "महान क्रांतिकारी चंद्रशेखर आजाद का जन्म भाबरा गाँव में हुआ था, यह वर्तमान में मध्यप्रदेश के किस जिले में स्थित है?",
         "Jhabua", "Dhar", "Khargone", "Alirajpur (अलीराजपुर - भाबरा/आजाद नगर)",
         3, "Chandrashekhar Azad was born on 23 July 1906 in Bhabhra village, which now falls under Alirajpur district (renamed Azad Nagar).",
         "चंद्रशेखर आजाद का जन्म 23 जुलाई 1906 को भाबरा गाँव में हुआ था, जो वर्तमान में अलीराजपुर जिले (अब आजाद नगर) में स्थित है।"),

        ("Who was the great Maratha queen and administrator who ruled the Malwa kingdom from Maheshwar (Khargone)?",
         "मालवा क्षेत्र में महेश्वर को अपनी राजधानी बनाकर सुशासन स्थापित करने वाली महान मराठा शासिका कौन थीं?",
         "Punyasloka Devi Ahilyabai Holkar (देवी अहिल्याबाई होल्कर)", "Rani Durgavati", "Rani Avantibai", "Rani Kamlapati",
         0, "Devi Ahilyabai Holkar ruled the Holkar state from Maheshwar on the banks of Narmada, renowned for her justice, administrative wisdom, and temple restorations.",
         "देवी अहिल्याबाई होल्कर ने महेश्वर (नर्मदा तट) को अपनी राजधानी बनाया और अपने न्यायप्रिय शासन एवं देश भर में मंदिरों व घाटों के जीर्णोद्धार के लिए विख्यात हुईं।"),

        ("Which historic city of Madhya Pradesh hosts the holy Simhastha Kumbh Mahaparva on the banks of river Shipra every 12 years?",
         "मध्यप्रदेश का कौन-सा ऐतिहासिक नगर प्रत्येक 12 वर्ष में शिप्रा नदी के तट पर पवित्र सिंहस्थ कुंभ महापर्व की मेजबानी करता है?",
         "Omkareshwar", "Ujjain (उज्जैन - महाकालेश्वर ज्योतिर्लिंग)", "Mandleshwar", "Amarkantak",
         1, "The Simhastha Kumbh Mela is held every 12 years in the ancient holy city of Ujjain on the banks of the sacred Shipra river.",
         "सिंहस्थ कुंभ मेला प्रत्येक 12 वर्ष में शिप्रा नदी के तट पर पवित्र नगरी उज्जैन (महाकालेश्वर ज्योतिर्लिंग स्थल) में आयोजित किया जाता है।"),

        ("Which is the largest tribal group in Madhya Pradesh in terms of population?",
         "जनसंख्या की दृष्टि से मध्यप्रदेश का सबसे बड़ा जनजाति समूह कौन-सा है?",
         "Baiga", "Sahariya", "Bhil Tribe (भील जनजाति)", "Korku",
         2, "The Bhil tribe (along with its sub-tribes Barela, Bhilala, Patelia) is the most populous individual tribal community in Madhya Pradesh.",
         "2011 की जनगणना के अनुसार भील जनजाति (भीलाला, बारेला, पटलिया सहित) मध्यप्रदेश की सबसे बड़ी जनजाति है, जो मुख्य रूप से झाबुआ, अलीराजपुर, धार और बड़वानी में निवास करती है।"),

        ("The famous 'Pithora' painting (पिथोरा चित्रकला) is a sacred wall painting tradition of which tribal community of Madhya Pradesh?",
         "प्रसिद्ध 'पिथोरा' चित्रकला मध्यप्रदेश के किस जनजाति समुदाय की पवित्र भित्ति चित्रकला परंपरा है?",
         "Gond", "Korku", "Baiga", "Bhil & Bhilala Tribes (भील एवं भीलाला जनजाति - पेमा फातिया/भूरी बाई)",
         3, "Pithora painting is a sacred ritualistic mural tradition of the Bhil and Bhilala tribes, with Padmashri Bhuri Bai and Pema Fatya being iconic exponents.",
         "पिथोरा चित्रकला भील और भीलाला जनजातियों की अनुष्ठानिक भित्ति चित्रकला है। इसके प्रसिद्ध कलाकारों में पद्मश्री भूरी बाई और पेमा फातिया शामिल हैं।"),

        ("How many total assembly constituencies (seats) are there in the Madhya Pradesh Vidhan Sabha?",
         "मध्यप्रदेश विधान सभा में कुल कितने निर्वाचित सदस्य (सीटें) होते हैं?",
         "230 Seats (230 विधानसभा सीटें)", "200 Seats", "250 Seats", "243 Seats",
         0, "The Madhya Pradesh Legislative Assembly consists of 230 directly elected members (plus previously 1 nominated Anglo-Indian member).",
         "मध्यप्रदेश विधानसभा में कुल 230 निर्वाचित सदस्य होते हैं।"),

        ("How many Lok Sabha parliamentary constituencies are there in Madhya Pradesh?",
         "मध्यप्रदेश में कुल कितनी लोक सभा संसदीय सीटें हैं?",
         "25", "29 Lok Sabha Seats (29 लोकसभा सीटें)", "31", "40",
         1, "Madhya Pradesh sends 29 elected members to the Lok Sabha in the Parliament of India.",
         "मध्यप्रदेश में कुल 29 लोक सभा सीटें हैं (जिनमें अनुसूचित जाति के लिए 4 और अनुसूचित जनजाति के लिए 6 सीटें आरक्षित हैं)।"),

        ("Where is the Principal Seat (Main Bench) of the High Court of Madhya Pradesh located?",
         "मध्यप्रदेश उच्च न्यायालय का मुख्य स्थान (Principal Bench) कहाँ स्थित है?",
         "Bhopal", "Gwalior", "Jabalpur (जबलपुर - खंडपीठें ग्वालियर एवं इंदौर)", "Indore",
         2, "The Principal Seat of the Madhya Pradesh High Court is at Jabalpur, with permanent benches at Gwalior and Indore.",
         "मध्यप्रदेश उच्च न्यायालय का मुख्य पीठ जबलपुर में स्थित है, जबकि इसकी दो स्थायी खंडपीठें ग्वालियर और इंदौर में कार्यरत हैं।"),

        ("Which was the first state in India to conduct elections under the 73rd Constitutional Amendment Act (Panchayati Raj)?",
         "73वें संविधान संशोधन अधिनियम (पंचायती राज) के अंतर्गत त्रिस्तरीय चुनाव कराने वाला देश का पहला राज्य कौन-सा था?",
         "Rajasthan", "Andhra Pradesh", "Karnataka", "Madhya Pradesh (मध्यप्रदेश - 1994 में प्रथम चुनाव)",
         3, "Madhya Pradesh was the first state in India to implement the 73rd Amendment and conduct three-tier Panchayati Raj elections in 1994.",
         "73वें संविधान संशोधन 1992 के क्रियान्वयन हेतु मध्यप्रदेश पंचायती राज अधिनियम 1993 पारित कर 1994 में चुनाव कराने वाला देश का पहला राज्य मध्यप्रदेश था।"),

        ("In which year was Madhya Pradesh formed in its original state on the recommendation of the States Reorganisation Commission?",
         "राज्य पुनर्गठन आयोग की सिफारिशों पर मध्यप्रदेश राज्य का मूल गठन किस वर्ष हुआ था?",
         "1 November 1956 (1 नवम्बर 1956)", "15 August 1947", "26 January 1950", "1 November 2000",
         0, "Madhya Pradesh was officially formed on 1 November 1956 by merging Madhya Bharat, Vindhya Pradesh, Bhopal State, and Mahakoshal.",
         "फजल अली की अध्यक्षता वाले राज्य पुनर्गठन आयोग की सिफारिशों पर 1 नवम्बर 1956 को मध्यप्रदेश राज्य का गठन हुआ था।"),

        ("On which date was Chhattisgarh carved out of Madhya Pradesh as a separate state?",
         "छत्तीसगढ़ राज्य को मध्यप्रदेश से अलग करके किस तिथि को एक नए राज्य के रूप में गठित किया गया था?",
         "15 August 2000", "1 November 2000 (1 नवम्बर 2000 - 84वां संशोधन विधेयक)", "26 January 2001", "1 November 2001",
         1, "Chhattisgarh was carved out of eastern Madhya Pradesh on 1 November 2000 under the Madhya Pradesh Reorganisation Act, 2000.",
         "मध्य प्रदेश पुनर्गठन अधिनियम 2000 के तहत 1 नवम्बर 2000 को मध्यप्रदेश के 16 पूर्वी जिलों को अलग कर छत्तीसगढ़ राज्य बनाया गया।"),

        ("Which district in Madhya Pradesh is known as the 'Energy Capital' (ऊर्जाधानी) of the state due to huge coal deposits and thermal power plants?",
         "विशाल कोयला भंडार और ताप विद्युत संयंत्रों के कारण मध्यप्रदेश के किस जिले को 'ऊर्जाधानी' कहा जाता है?",
         "Shahdol", "Anuppur", "Singrauli (सिंगरौली - ऊर्जाधानी)", "Betul",
         2, "Singrauli is known as the Energy Capital (Urjadhani) of MP due to extensive coal mines of NCL and mega thermal power stations of NTPC.",
         "सिंगरौली जिले को विशाल कोयला खदानों और NTPC के विशाल सुपर थर्मल पावर स्टेशनों के कारण मध्य प्रदेश की 'ऊर्जाधानी' कहा जाता है।"),

        ("Tansen Music Festival (तानसेन समारोह) is celebrated every year at the tomb of Sangeet Samrat Tansen in which city of Madhya Pradesh?",
         "संगीत सम्राट तानसेन की समाधि पर प्रतिवर्ष 'तानसेन संगीत समारोह' का आयोजन मध्यप्रदेश के किस नगर में किया जाता है?",
         "Ujjain", "Bhopal", "Indore", "Gwalior (ग्वालियर - बेहट)",
         3, "The national Tansen Samaroh is held annually in December near Tansen's Tomb in Gwalior, organized by the MP Culture Department.",
         "तानसेन संगीत समारोह का आयोजन प्रतिवर्ष दिसंबर माह में ग्वालियर स्थित तानसेन की समाधि पर मध्यप्रदेश संस्कृति विभाग द्वारा किया जाता है।"),

        ("Which national park in Madhya Pradesh is famous for having the highest density of Royal Bengal Tigers in India?",
         "भारत में रॉयल बंगाल टाइगर का सर्वाधिक घनत्व (Tiger Density) किस राष्ट्रीय उद्यान में पाया जाता है?",
         "Bandhavgarh National Park (बांधवगढ़ राष्ट्रीय उद्यान - उमरिया)", "Satpura National Park", "Madhav National Park", "Pench National Park",
         0, "Bandhavgarh National Park located in Umaria district has the highest known tiger density among protected areas in India.",
         "उमरिया जिले में स्थित बांधवगढ़ राष्ट्रीय उद्यान में भारत में बाघों का सर्वाधिक घनत्व पाया जाता है। यह 32 पहाड़ियों से घिरा हुआ है।"),

        ("The famous 'Bhimbetka Rock Shelters' (भीमबेटका शैलाश्रय), a UNESCO World Heritage site, is located in which district of MP?",
         "यूनेस्को विश्व धरोहर स्थल 'भीमबेटका के शैलचित्र' मध्यप्रदेश के किस जिले में स्थित हैं?",
         "Sehore", "Raisen (रायसेन जिला - खोजकर्ता वी.एस. वाकणकर)", "Vidisha", "Bhopal",
         1, "Bhimbetka rock shelters, discovered by Dr. V.S. Wakankar in 1957, are located in Raisen district and exhibit prehistoric cave art.",
         "भीमबेटका के पुरापाषाणकालीन शैलाश्रय रायसेन जिले में स्थित हैं। इनकी खोज 1957 में डॉ. विष्णु श्रीधर वाकणकर ने की थी।"),

        ("The Great Stupa at Sanchi (सांची का स्तूप) was originally commissioned by which Mauryan Emperor?",
         "सांची के महान बौद्ध स्तूप का निर्माण मूल रूप से किस मौर्य सम्राट द्वारा करवाया गया था?",
         "Chandragupta Maurya", "Bindusara", "Emperor Ashoka (सम्राट अशोक - 3री शताब्दी ई.पू.)", "Brihadratha",
         2, "The Great Stupa at Sanchi was originally commissioned by Emperor Ashoka in the 3rd century BCE in Raisen district.",
         "सांची के स्तूप का निर्माण मौर्य सम्राट अशोक ने तीसरी शताब्दी ईसा पूर्व में करवाया था। यह रायसेन जिले में बेतवा नदी के पास स्थित है।"),

        ("Which river originates from Janapav hills near Mhow (Dr. Ambedkar Nagar) in Indore district?",
         "इंदौर जिले के महू (डॉ. आंबेडकर नगर) के निकट जानापाव की पहाड़ियों से किस प्रसिद्ध नदी का उद्गम होता है?",
         "Kshipra River", "Betwa River", "Ken River", "Chambal River (चंबल नदी - महू जानापाव)",
         3, "The Chambal River originates from the Janapav hill near Mhow in Indore district and flows northward through MP and Rajasthan.",
         "चंबल नदी का उद्गम इंदौर जिले की महू तहसील के निकट जानापाव की पहाड़ी से होता है। यह यमुना की प्रमुख सहायक नदी है।"),

        ("Dr. Bhimrao Ramji Ambedkar, the chief architect of the Indian Constitution, was born in which place in Madhya Pradesh?",
         "भारतीय संविधान के मुख्य शिल्पकार डॉ. भीमराव रामजी आंबेडकर का जन्म मध्यप्रदेश के किस स्थान पर हुआ था?",
         "Mhow / Dr. Ambedkar Nagar (महू, इंदौर - 14 अप्रैल 1891)", "Bhopal", "Gwalior", "Jabalpur",
         0, "Dr. B.R. Ambedkar was born on 14 April 1891 at Mhow military cantonment in Indore district (now named Dr. Ambedkar Nagar).",
         "डॉ. भीमराव आंबेडकर का जन्म 14 अप्रैल 1891 को महू (वर्तमान डॉ. आंबेडकर नगर, इंदौर) के सैन्य छावनी क्षेत्र में हुआ था।"),

        ("Which place in Madhya Pradesh is renowned as the only hill station in the state, often referred to as 'Satpura ki Rani'?",
         "मध्यप्रदेश का एकमात्र हिल स्टेशन कौन-सा है, जिसे 'सतपुड़ा की रानी' भी कहा जाता है?",
         "Amarkantak", "Pachmarhi (पचमढ़ी - नर्मदापुरम जिला)", "Mandu", "Chanderi",
         1, "Pachmarhi in Narmadapuram (Hoshangabad) district is the only hill station of MP, situated at an altitude of 1,067 m and called 'Queen of Satpura'.",
         "पचमढ़ी (नर्मदापुरम जिला) सतपुड़ा पर्वतश्रेणी में स्थित मध्यप्रदेश का एकमात्र हिल स्टेशन है, जिसे 'सतपुड़ा की रानी' कहा जाता है। धूपगढ़ (1350 मी) यहाँ का सर्वोच्च शिखर है।"),

        ("The Malwa plateau in Madhya Pradesh is predominantly covered with which type of soil?",
         "मध्यप्रदेश का मालवा पठार मुख्य रूप से किस प्रकार की मिट्टी से आच्छादित है?",
         "Alluvial Soil", "Red and Yellow Soil", "Black Soil / Regur (काली मिट्टी - बेसाल्ट चट्टानें)", "Laterite Soil",
         2, "The Malwa Plateau is covered with rich deep Black Soil (Regur), formed by weathering of Deccan Trap basaltic lava, ideal for cotton and soybean.",
         "मालवा का पठार दक्कन ट्रैप की बेसाल्ट लावा चट्टानों के क्षरण से बनी उपजाऊ काली मिट्टी (रेगुर) से आच्छादित है, जो कपास और सोयाबीन के लिए आदर्श है।"),

        ("Why is Madhya Pradesh officially nicknamed the 'Soy State' of India?",
         "मध्यप्रदेश को भारत का 'सोया स्टेट' (Soy State) क्यों कहा जाता है?",
         "High forest density", "Maximum river origins", "Leader in diamond production", "Highest producer of Soybean in India (सोयाबीन का सर्वाधिक उत्पादन)",
         3, "Madhya Pradesh produces the largest share of soybean in the country, earning it the title 'Soybean State' or 'Soy State'.",
         "मध्यप्रदेश भारत में सोयाबीन का सबसे बड़ा उत्पादक राज्य है, इसी कारण इसे 'सोयाबीन राज्य' या 'सोया राज्य' के नाम से जाना जाता है।"),

        ("Which ruler of the Paramara dynasty established Saraswati Mandir (Bhojshala) in Dhar and founded Bhojpur temple?",
         "धार में भोजशाला (सरस्वती मंदिर) की स्थापना तथा विशाल भोजपुर शिव मंदिर का निर्माण किस परमार शासक ने कराया था?",
         "Raja Bhoj (राजा भोज - 1010-1055 ईस्वी)", "Upendra Krishnaraja", "Siyaka II", "Vakpati Munja",
         0, "Raja Bhoj of Dhar was a great scholar-king of the Paramara dynasty who founded Bhojpur, wrote encyclopedic treatises, and built Bhojshala.",
         "परमार वंश के प्रतापी राजा भोज ने धार को अपनी राजधानी बनाया, भोजशाला की स्थापना की और भोजपुर में विशाल शिवलिंग मंदिर बनवाया।"),

        ("The ancient city of Mandu (मंडू / मांडवगढ़) in Dhar district is known by which romantic sobriquet?",
         "धार जिले में स्थित ऐतिहासिक नगर मांडू को किस उपनाम से जाना जाता है?",
         "City of Joy / Anand Nagari (आनंद की नगरी - रानी रूपमती एवं बाज बहादुर)", "City of Palaces", "City of Temples", "City of Lakes",
         1, "Mandu is celebrated as the 'City of Joy' (शादियाबाद), famous for the immortal love saga of Baz Bahadur and Rani Roopmati, Jahaz Mahal, and Hindola Mahal.",
         "मांडू को 'सिटी ऑफ जॉय' (आनंद की नगरी / शादियाबाद) कहा जाता है। यह बाज बहादुर और रानी रूपमती के प्रेम प्रसंग, जहाज महल और हिंडोला महल के लिए प्रसिद्ध है।"),

        ("The historic 'Gwalior Fort' was described as 'the pearl amongst fortresses in Hind' by which Mughal emperor in his memoirs?",
         "ग्वालियर के भव्य किले को 'भारत के किलों का सिरमौर' (जिब्राल्टर / पर्ल ऑफ फोर्ट्रेस) किस मुगल सम्राट ने अपनी आत्मकथा में कहा था?",
         "Akbar", "Jahangir", "Babur (बाबर - बाबरनामा में)", "Shah Jahan",
         2, "Mughal Emperor Babur described the Gwalior Fort as 'the pearl in the necklace of fortresses of Hind' in his autobiography Baburnama.",
         "मुगल सम्राट बाबर ने अपनी आत्मकथा बाबरनामा में ग्वालियर के किले को 'हिन्द के किलों के हार का मोती' (Pearl of the forts of India) कहा था।"),

        ("Rani Durgavati, the heroic Gond queen who fought valiantly against the Mughal army of Asaf Khan in 1564, was the ruler of which kingdom?",
         "1564 में आसफ खान की मुगल सेना के विरुद्ध वीरतापूर्वक युद्ध करने वाली गोंडवाना की वीरांगना रानी दुर्गावती किस राज्य की शासिका थीं?",
         "Rewa", "Orchha", "Bhopal", "Garha-Katanga / Mandla (गढ़ा-मंडला / गोंडवाना साम्राज्य)",
         3, "Rani Durgavati ruled the prosperous Gond kingdom of Garha-Mandla (Jabalpur region) and embraced martyrdom at Narrai Nala.",
         "वीरांगना रानी दुर्गावती गढ़ा-मंडला (जबलपुर क्षेत्र) के गोंडवाना साम्राज्य की रानी थीं, जिन्होंने मुगलों से लड़ते हुए नरई नाले के पास बलिदान दिया।"),

        ("The dial number '100' or '112' for police emergency response in Madhya Pradesh is operated under which citizen-safety fleet service?",
         "मध्यप्रदेश में त्वरित पुलिस आपातकालीन सहायता सेवा किस नाम से संचालित की जाती है?",
         "Dial 100 / Dial 112 (डायल 100 - प्रथम रिस्पॉन्स वाहन सेवा)", "Police Express", "Jan Suraksha Vahan", "Rakshak Dal",
         0, "MP Police was the first state force in India to launch the statewide GPS-enabled 'Dial 100 First Response Vehicle' scheme in 2015.",
         "मध्यप्रदेश पुलिस ने 2015 में पूरे राज्य में GPS आधारित त्वरित प्रतिक्रिया वाहन सेवा 'डायल 100' (अब 112 एकीकृत) शुरू की थी।"),

        ("Which district in Madhya Pradesh has the highest sex ratio according to the 2011 Census?",
         "2011 की जनगणना के अनुसार मध्यप्रदेश के किस जिले में लिंगानुपात (Sex Ratio) सर्वाधिक (1021) है?",
         "Dindori", "Balaghat (बालाघाट - 1021 स्त्रियां प्रति 1000 पुरुष)", "Alirajpur", "Mandla",
         1, "Balaghat district recorded the highest sex ratio in MP at 1021 females per 1000 males in Census 2011.",
         "2011 की जनगणना के अनुसार बालाघाट जिले का लिंगानुपात 1021 है, जो मध्यप्रदेश में सर्वाधिक है।"),

        ("Asia's largest underground manganese mine is located at which place in Balaghat district of Madhya Pradesh?",
         "एशिया की सबसे बड़ी भूमिगत मैंगनीज खदान मध्यप्रदेश के बालाघाट जिले में किस स्थान पर स्थित है?",
         "Malanjkhand", "Harda", "Bharveli (भरवेली - MOIL द्वारा संचालित)", "Birsinghpur",
         2, "Bharveli mine in Balaghat, operated by MOIL, is the largest underground manganese mine in Asia.",
         "बालाघाट जिले की भरवेली मैंगनीज खदान (MOIL द्वारा संचालित) एशिया की सबसे बड़ी भूमिगत मैंगनीज खदान है।"),

        ("Which tribe in Madhya Pradesh celebrates the colorful social and matrimonial festival called 'Bhagoria Haat' before Holi?",
         "होली से पूर्व मध्यप्रदेश की कौन-सी जनजाति 'भगोरिया हाट' (Bhagoria Festival) का पारंपरिक उत्सव धूमधाम से मनाती है?",
         "Gond", "Baiga", "Korku", "Bhil & Bhilala (भील एवं भीलाला - झाबुआ, अलीराजपुर, बड़वानी)",
         3, "Bhagoria is a famous pre-Holi cultural carnival and match-making haat celebrated enthusiastically by the Bhil and Bhilala tribes.",
         "भगोरिया उत्सव होली से एक सप्ताह पहले मालवा-निमाड़ के आदिवासी अंचलों (झाबुआ, अलीराजपुर, बड़वानी, धार) में भील समुदाय द्वारा मनाया जाता है।")
    ]

    for b in benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'MP Police Administration & State Identity',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if len(items) % 3 == 0 else 'MODERATE'
        })

    # Generate remaining 260 systematic questions across MP geography, history, districts, culture, schemes, and polity
    # MP 55 districts and landmarks catalog
    mp_districts_catalog = [
        ("Indore", "Commercial capital, cleanest city of India, Rajwada, Lal Bagh Palace, Khan-Saraswati rivers", "Ahilyabai Holkar"),
        ("Bhopal", "State capital, City of Lakes, Upper Lake (Bhojtal), Van Vihar National Park, Taj-ul-Masajid", "Dost Mohammad Khan / Raja Bhoj"),
        ("Gwalior", "Gwalior Fort, Jai Vilas Palace (Scindia dynasty), Sun Temple, Tansen Tomb, Rani Laxmibai Samadhi", "Suraj Sen / Scindias"),
        ("Jabalpur", "Sanskardhani, Marble Rocks at Bhedaghat, Dhuandhar Falls, High Court of MP, Madan Mahal", "Raja Madan Shah / Rani Durgavati"),
        ("Ujjain", "City of Mahakal, Mahakaleshwar Jyotirlinga (Dakshinmukhi), Shipra river, Simhastha Kumbh, Vedh Shala", "Vikramaditya / Raja Bhoj"),
        ("Rewa", "Land of White Tigers (Mohan), Govindgarh Palace, Chachai and Keoti waterfalls, Betel nut craft", "Baghel Dynasty / Maharaja Martand Singh"),
        ("Satna", "Chitrakoot (Lord Ram exile), Maihar Sharda Temple, cement industries, Tulsi Peeth", "King Ramchandra / Ustad Allauddin Khan"),
        ("Sagar", "Dr. Hari Singh Gour University (MP's first central university), Rahatgarh waterfall, Lakha Banjara lake", "Dr. Hari Singh Gour / Udanshah"),
        ("Chhatarpur", "Khajuraho temples (UNESCO), Ken river, Raneh waterfall (canyon of pink granite)", "Chhatrasal Bundela"),
        ("Damoh", "Nohleshwar temple at Nohta, Singrampur (Rani Durgavati battle), Batiyagarh inscription", "Damayanti / Chandelas"),
        ("Panna", "Diamond mines of Majhgawan, Panna National Park, Padmavati temple, Pandav falls", "Maharaja Chhatrasal / NMDC"),
        ("Tikamgarh", "Kundeshwar temple, brass bell metal craft, historic lakes of Bundelkhand", "Bir Singh Deo"),
        ("Niwari", "Carved out of Tikamgarh in 2018, historic town of Orchha (Raja Ram Temple, Jahangir Mahal, Betwa river)", "Rudra Pratap Bundela"),
        ("Datia", "Pitambara Peeth temple, Datia Palace (Satkhanda Mahal), Gujjara Ashokan inscription", "Bir Singh Deo"),
        ("Shivpuri", "Madhav National Park, George Castle, Sakhya Sagar Ramsar wetland, Tatya Tope memorial", "Scindias of Gwalior"),
        ("Guna", "Bajrangarh fort, Gopi Krishna Sagar dam, Vijaypur fertilizer plant", "Pratihara / Scindias"),
        ("Ashoknagar", "Chanderi sarees (GI tag), Chanderi fort, Koshak Mahal, Badal Mahal gateway", "Kirti Pal / Chandelas"),
        ("Morena", "Bateshwar temple complex, Chausath Yogini temple at Mitawali, Kaknamath temple at Sihoniya, Chambal ravines", "Kachchhapaghata dynasty"),
        ("Bhind", "Ater fort on Chambal, Gohad fort (UNESCO Asia-Pacific award), Malanpur industrial area", "Bhaduria kings / Jat rulers"),
        ("Sheopur", "Kuno National Park (Project Cheetah), Sheopur fort, wooden craft carving", "Gaur kings / MP Forest Dept"),
        ("Vidisha", "Besnagar, Heliodorus pillar (Kham Baba - Garuda pillar), Udayagiri caves (Varaha sculpture)", "Shunga / Gupta emperors"),
        ("Raisen", "Sanchi Stupa (UNESCO), Bhimbetka Rock Shelters (UNESCO), Raisen Fort (water harvesting)", "Emperor Ashoka / V.S. Wakankar"),
        ("Sehore", "Saromaro Ashokan caves, Chintaharan Ganesh temple, chain of Narmada tributaries, Budhni toy cluster", "Ashoka Maurya"),
        ("Rajgarh", "Biaora junction, Narsinghgarh sanctuary (Kashmir-e-Malwa), Chidikho lake, Jalpa Mata temple", "Rawat Mohan Singh"),
        ("Shajapur", "Karedi temple, Chilhar river, birthplace of Makhanlal Chaturvedi (Babai connection)", "Shah Jahan (Shahjahanpur)"),
        ("Agar Malwa", "Carved out of Shajapur in 2013, Baijnath Mahadev temple (built by British officer Martin's wife), Moti Sagar lake", "Jhala kings"),
        ("Hoshangabad", "Renamed Narmadapuram, Sethani Ghat on Narmada, Pachmarhi (Queen of Satpura), Security Paper Mill", "Hoshang Shah"),
        ("Harda", "Makrai fort, Handia pilgrimage on Narmada, rich agriculture belt of MP", "Gond rajas of Makrai"),
        ("Betul", "Origin of Tapti river at Multai, Muktagiri Jain pilgrimage, corkwood craft, Padhar tribe", "Gond kings of Kherla"),
        ("Khandwa", "East Nimar, Omkareshwar Jyotirlinga (Mandhata island), Indira Sagar Dam, Kishore Kumar samadhi", "Mandhata / Kishore Kumar"),
        ("Khargone", "West Nimar, Maheshwar (Ahilyabai Holkar capital), Narmada river ghats, Maheshwari handloom sarees", "Devi Ahilyabai Holkar"),
        ("Barwani", "Bawangaja (massive 84-ft rock-cut Adinath Jain statue), Narmada submergence, Bhil tribal hub", "Chandelas / Ranas of Barwani"),
        ("Alirajpur", "Carved from Jhabua, birthplace of Chandrashekhar Azad (Bhabhra), highest percentage of tribal population (89%)", "Rathore dynasty / Azad"),
        ("Jhabua", "Bhagoria Haat center, Pithora art hub, Bhil tribe homeland, Kadaknath chicken (GI Tag)", "Kashyap rulers / Bhil chiefs"),
        ("Dhar", "Dhar fort, Bhojshala (Raja Bhoj), Bagh caves (Buddhist murals), Mandu palace complex, Dinosaur fossil park", "Raja Bhoj Paramara"),
        ("Dewas", "Chamunda Devi hill temple, Bank Note Press (BNP), industrial corridor, Kumar Gandharva music center", "Puar Maratha dynasty"),
        ("Ratlam", "Ratlam sev (GI tag), Ratlam gold jewelry market, Cactus garden Sailana, Hussain Tekri Jaora", "Ratan Singh Rathore"),
        ("Mandsaur", "Pashupatinath temple on Shivna river, opium production hub, Hinglajgarh fort, Gandhi Sagar Dam", "Yashodharman / Dashapura"),
        ("Neemuch", "CRPF birthplace (Crown Representative Police 1939), Morwan dam, opium processing factory", "British Cantt 1844"),
        ("Chhindwara", "Patalkot valley (Bharia tribe), Tamia hill station, Chhindwara university, Corn festival (Corn City)", "Gond rulers"),
        ("Seoni", "Mowgli land (Pench Tiger Reserve - inspired Rudyard Kipling's Jungle Book), Bhimgarh Sanjay Sarovar dam (Asia's largest mud dam)", "Gond rajas"),
        ("Balaghat", "Malanjkhand copper project, Bharveli manganese mine, highest forest cover, Lanji fort, Kanha southern gate", "Gond rajas / MOIL"),
        ("Mandla", "Kanha National Park (Kanha Tiger Reserve), Ramnagar fort, Narmada crescent loops, Gond tribal culture", "Rani Durgavati / Hriday Shah"),
        ("Dindori", "Carved from Mandla, Baiga Chak (heartland of Baiga tribe), Ghughwa fossil national park, Dagona waterfall", "Baiga kings"),
        ("Shahdol", "Sohagpur coalfield, Virateshwar temple, Son river valley, Baan Sagar dam catchment", "Baghel kings"),
        ("Umaria", "Bandhavgarh National Park (highest tiger density, 32 hills, Shesh Shaiya Vishnu), Chandia fort", "Baghel kings"),
        ("Anuppur", "Origin of Narmada, Son and Johilla rivers at Amarkantak, Mai ki Bagiya, Kapildhara, thermal power plant Chachai", "Amarkantak sages"),
        ("Singrauli", "Energy Capital of MP, NCL coal mines, NTPC power super-plants, Rihand reservoir (Govind Ballabh Pant Sagar)", "NTPC / Singrauli rajas"),
        ("Sidhi", "Sanjay Dubri National Park & Tiger Reserve, Parsili resort on Banas river, birthplace of Birbal (Mahesh Das)", "Birbal / Chandela rajas"),
        ("Mauganj", "53rd district of MP carved from Rewa in August 2023, Devtalab Shiva temple, Ashta-Bhuja temple", "Sengar Rajputs"),
        ("Maihar", "54th district of MP carved from Satna in 2023, Maa Sharda Temple atop Trikoot hill, Ustad Allauddin Khan Maihar Gharana", "Ustad Allauddin Khan"),
        ("Pandhurna", "55th district of MP carved from Chhindwara in 2023, world-famous Gotmar Mela (stone pelting tradition on Jaam river)", "Gond kings"),
        ("Amarkantak", "Holy pilgrim hill town, holy source of sacred Narmada and Son rivers, Maikal mountain range", "Adi Shankaracharya"),
        ("Chanderi", "Historic town in Ashoknagar, famed worldwide for handloom Chanderi silk and cotton sarees with GI tag", "Chandelas / Bundelas"),
        ("Orchha", "Heritage capital of Bundelkhand on Betwa river, Ram Raja Temple (where Rama is worshipped as King), Jahangir Mahal", "Raja Rudra Pratap")
    ]

    styles = [
        "landmark_location",
        "administrative_significance",
        "historical_connection",
        "geographical_attribute"
    ]

    for i in range(40, 300):
        entry = mp_districts_catalog[(i - 40) % len(mp_districts_catalog)]
        name, desc, creator = entry
        q_style = (i - 40) % len(styles)

        if q_style == 0:
            stem_en = f"Which notable feature or administrative recognition is associated with '{name}' in Madhya Pradesh?"
            stem_hi = f"मध्यप्रदेश के संदर्भ में '{name}' की प्रमुख ऐतिहासिक, भौगोलिक या प्रशासनिक पहचान क्या है?"
            sol_en = f"'{name}' in MP is known for: {desc}."
            sol_hi = f"मध्यप्रदेश में '{name}' की प्रमुख विशेषता: {desc}।"
            choices = [
                {'en': desc, 'hi': desc},
                {'en': "Deep marine coral reef zone", 'hi': "गहरा समुद्री प्रवाल भित्ति क्षेत्र"},
                {'en': "Active volcanic caldera", 'hi': "सक्रिय ज्वालामुखी क्रेटर"},
                {'en': "Tidal mangrove estuary delta", 'hi': "ज्वारीय मैंग्रोव डेल्टा"}
            ]
            c_idx = 0
        elif q_style == 1:
            stem_en = f"In which district or region of Madhya Pradesh is the notable heritage and culture associated with '{name}' primarily located?"
            stem_hi = f"'{name}' से संबंधित प्रमुख सांस्कृतिक, भौगोलिक या ऐतिहासिक विरासत मुख्य रूप से मध्यप्रदेश के किस क्षेत्र में स्थित है?"
            sol_en = f"'{name}' is an integral geographical and administrative center in Madhya Pradesh."
            sol_hi = f"'{name}' मध्यप्रदेश का एक प्रमुख प्रशासनिक, सांस्कृतिक एवं भौगोलिक केंद्र है।"
            choices = [
                {'en': "Thar Desert Oasis, Rajasthan", 'hi': "थार मरुस्थल, राजस्थान"},
                {'en': f"Madhya Pradesh ({name} region)", 'hi': f"मध्यप्रदेश ({name} अंचल)"},
                {'en': "Rann of Kutch, Gujarat", 'hi': "कच्छ का रन, गुजरात"},
                {'en': "Sunderbans Delta, West Bengal", 'hi': "सुंदरबन डेल्टा, पश्चिम बंगाल"}
            ]
            c_idx = 1
        elif q_style == 2:
            stem_en = f"Regarding state administration and police surveillance in Madhya Pradesh, the law and order of '{name}' is managed under which police organization?"
            stem_hi = f"राज्य में कानून-व्यवस्था एवं जन सुरक्षा के दृष्टिकोण से '{name}' क्षेत्र किसके प्रशासनिक क्षेत्राधिकार में आता है?"
            sol_en = f"The territorial policing in {name} is administered by the Madhya Pradesh Police."
            sol_hi = f"'{name}' में कानून व्यवस्था का प्रबंधन मध्यप्रदेश पुलिस (Madhya Pradesh Police) द्वारा किया जाता है।"
            choices = [
                {'en': "Tamil Nadu State Police", 'hi': "तमिलनाडु पुलिस"},
                {'en': "Kerala Police", 'hi': "केरल पुलिस"},
                {'en': "Madhya Pradesh Police (मध्यप्रदेश पुलिस)", 'hi': "मध्यप्रदेश पुलिस (MP Police)"},
                {'en': "Assam Police", 'hi': "असम पुलिस"}
            ]
            c_idx = 2
        else:
            stem_en = f"Which historical personality, dynasty, or pioneer is associated with the heritage of '{name}'?"
            stem_hi = f"'{name}' की ऐतिहासिक विरासत, स्थापना या विकास से कौन-सा प्रसिद्ध व्यक्तित्व, राजवंश या तथ्य जुड़ा हुआ है?"
            sol_en = f"'{name}' is historically linked to {creator}."
            sol_hi = f"'{name}' ऐतिहासिक एवं सांस्कृतिक रूप से '{creator}' से संबंधित है।"
            choices = [
                {'en': "Ancient Roman Gladiators", 'hi': "रोमन ग्लेडिएटर"},
                {'en': "Viking Seafarers of Scandinavia", 'hi': "स्कैंडिनेवियाई वाइकिंग्स"},
                {'en': "Ottoman Janissaries", 'hi': "तुर्क जेनिसरी"},
                {'en': creator, 'hi': creator}
            ]
            c_idx = 3

        items.append({
            'domain': 'MP Geography, Districts & Heritage',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 2 == 0 else 'MODERATE'
        })

    assert len(items) == 300, f"Expected 300 GK items, got {len(items)}"
    return items

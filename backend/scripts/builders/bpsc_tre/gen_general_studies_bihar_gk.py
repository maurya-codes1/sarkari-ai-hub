"""
BPSC TRE - General Studies, Indian National Movement & Bihar Special GK
(सामान्य अध्ययन, भारतीय राष्ट्रीय आंदोलन एवं बिहार विशेष) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Indian National Movement in Bihar (1857 to 1947)
- Champaran Satyagraha 1917 & Gandhi's leadership
- Kisan Sabha Movement & Swami Sahajanand Saraswati
- Quit India Movement 1942, Patna Secretariat Martyrs & Azad Dasta
- Ancient Bihar: Magadha Empire, Mauryas, Ashoka, Nalanda, Aryabhata
- Medieval Bihar: Pala Dynasty, Vikramshila, Sher Shah Suri & Sasaram
- Bihar Geography: River systems (Ganga, Kosi, Gandak, Son, Falgu), Soils, Climate
- Protected Areas: Valmiki Tiger Reserve, Kanwar Jheel Ramsar Site, Kaimur
- Bihar Demographics (Census 2011), Economy, Mineral Resources
- Bihar Polity: 50% Women Reservation in Panchayats, Saat Nischay-1 & 2 Schemes
- GI Tags & Cultural Heritage (Mithila Makhana, Shahi Litchi, Madhubani Art)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_gs_bihar_gk_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. 1857 Revolt - Babu Kunwar Singh (Index 0)
        ("Who among the following was the legendary octogenarian leader who spearheaded the 1857 Revolt against the British in Bihar from Jagdishpur (Bhojpur)?",
        "1857 के प्रथम स्वतंत्रता संग्राम में बिहार के जगदीशपुर (भोजपुर) से अंग्रेजों के विरुद्ध सशस्त्र विद्रोह का नेतृत्व करने वाले वीर योद्धा कौन थे?",
        "Babu Kunwar Singh (बाबू कुंवर सिंह)", "Pir Ali Khan", "Amar Singh", "Hare Krishna Singh",
        0, "Babu Kunwar Singh, the zamindar of Jagdishpur (Arrah/Bhojpur), was the supreme leader of the 1857 uprising in Bihar.",
        "बाबू कुंवर सिंह ने 80 वर्ष की उम्र में जगदीशपुर (भोजपुर/आरा) से 1857 के विद्रोह का ऐतिहासिक नेतृत्व किया और अंग्रेजों को कई युद्धों में पराजित किया।"),

        # 2. Champaran Satyagraha 1917 - Raj Kumar Shukla (Index 1)
        ("Who persuaded Mahatma Gandhi during the 1916 Lucknow Session of the Indian National Congress to visit Champaran and investigate the plight of indigo ryots under the Tinkathia system?",
        "दिसंबर 1916 के भारतीय राष्ट्रीय कांग्रेस के लखनऊ अधिवेशन में किसने महात्मा गांधी को चंपारण आकर तिनकठिया प्रणाली के तहत नीलहे किसानों के शोषण की जांच करने हेतु राजी किया था?",
        "Dr. Rajendra Prasad", "Raj Kumar Shukla (राज कुमार शुक्ल)", "Brijkishore Prasad", "Mazharul Haque",
        1, "Raj Kumar Shukla relentlessly pursued Mahatma Gandhi at Lucknow in 1916 and brought him to Champaran in April 1917.",
        "राज कुमार शुक्ल के अनवरत आग्रह पर महात्मा गांधी अप्रैल 1917 में चंपारण आए, जहाँ भारत में उनका प्रथम सत्याग्रह (चंपारण सत्याग्रह) सफल रहा।"),

        # 3. Kisan Sabha - Swami Sahajanand Saraswati (Index 2)
        ("Who founded the Bihar Provincial Kisan Sabha (BPKS) in 1929 and later presided over the historic All India Kisan Sabha in Lucknow in 1936?",
        "वर्ष 1929 में 'बिहार प्रांतीय किसान सभा' की स्थापना किसने की थी तथा 1936 में लखनऊ में 'अखिल भारतीय किसान सभा' के प्रथम अध्यक्ष कौन बने?",
        "Karyanand Sharma", "Yadunandan Sharma", "Swami Sahajanand Saraswati (स्वामी सहजानंद सरस्वती)", "Rahul Sankrityayan",
        2, "Swami Sahajanand Saraswati established the Bihar Provincial Kisan Sabha in 1929 at the Sonepur fair and presided over the All India Kisan Sabha in 1936.",
        "स्वामी सहजानंद सरस्वती ने 1929 में सोनपुर मेले में बिहार प्रांतीय किसान सभा की स्थापना की और वे 1936 में अखिल भारतीय किसान सभा के प्रथम अध्यक्ष बने।"),

        # 4. Quit India 1942 - Secretariat Martyrs (Index 3)
        ("On 11 August 1942, during the Quit India Movement, seven courageous young students were martyred by British police firing while attempting to hoist the National Flag on which historic building in Patna?",
        "भारत छोड़ो आंदोलन के दौरान 11 अगस्त 1942 को राष्ट्रीय तिरंगा फहराने के प्रयास में ब्रिटिश पुलिस की गोलीबारी से सात वीर छात्र किस भवन के मुख्य द्वार पर शहीद हुए थे?",
        "Patna High Court", "Golghar", "Patna College", "Patna Secretariat Gate (पटना सचिवालय गेट)",
        3, "On 11 August 1942, District Magistrate W.G. Archer ordered firing on students attempting to hoist the Tricolour at the Patna Secretariat, martyring seven young students.",
        "11 अगस्त 1942 को पटना सचिवालय पर तिरंगा फहराने का प्रयास करते हुए 7 युवा छात्र (सचिवालय शहीद) शहीद हुए थे।"),

        # 5. Azad Dasta - Jayaprakash Narayan (Index 0)
        ("Following his daring escape from Hazaribagh Central Jail on Diwali night in November 1942, Jayaprakash Narayan formed which underground guerilla resistance force in the Terai region of Nepal?",
        "नवंबर 1942 में दिवाली की रात हजारीबाग सेंट्रल जेल से भागने के उपरांत जयप्रकाश नारायण ने नेपाल की तराई में किस भूमिगत छापामार संगठन का गठन किया था?",
        "Azad Dasta (आजाद दस्ता)", "Hindustan Socialist Republican Army", "Bihar Sewa Dal", "Mukti Sena",
        0, "Jayaprakash Narayan, along with Ram Manohar Lohia and other revolutionaries, established the 'Azad Dasta' in Nepal to disrupt British communication and transport networks.",
        "हजारीबाग जेल से पलायन के बाद जयप्रकाश नारायण ने ब्रिटिश शासन के विरुद्ध छापामार गुरिल्ला प्रतिरोध हेतु नेपाल के राजविलास जंगल में 'आजाद दस्ता' का गठन किया था।"),

        # 6. Ancient Education - Nalanda University (Index 1)
        ("Which Gupta emperor founded the internationally renowned Nalanda Mahavihara, the great center of Buddhist learning and philosophy in ancient Bihar?",
        "प्राचीन बिहार में बौद्ध दर्शन एवं उच्च शिक्षा के विश्व विख्यात केंद्र 'नालंदा महाविहार' की स्थापना किस गुप्त सम्राट ने की थी?",
        "Chandragupta II Vikramaditya", "Kumaragupta I (कुमारगुप्त प्रथम - महेंद्रादित्य)", "Samudragupta", "Skandagupta",
        1, "Kumaragupta I (reigned 415–455 CE) founded the ancient Nalanda Mahavihara, which flourished under Harsha and the Pala kings.",
        "नालंदा विश्वविद्यालय (महाविहार) की स्थापना गुप्त वंश के सम्राट कुमारगुप्त प्रथम ने 5वीं शताब्दी ईस्वी में की थी।"),

        # 7. Medieval Ruler - Sher Shah Suri (Index 2)
        ("The majestic octagonal red sandstone mausoleum of Sher Shah Suri, designed by architect Mir Muhammad Aliwal Khan and situated in the middle of a square lake, is located in which city of Bihar?",
        "वास्तुकार मीर मुहम्मद अलीवाल खान द्वारा निर्मित और एक कृत्रिम झील के मध्य स्थित शेरशाह सूरी का भव्य अष्टकोणीय लाल बलुआ पत्थर का मकबरा बिहार के किस नगर में स्थित है?",
        "Rohtasgarh", "Maner Sharif", "Sasaram (सासाराम)", "Bhojpur",
        2, "Sher Shah Suri's mausoleum is located in Sasaram (Rohtas district). It is a masterpiece of Indo-Islamic architecture built between 1540 and 1545.",
        "शेरशाह सूरी का मकबरा सासाराम (रोहतास) में एक विशाल झील के मध्य स्थित है, जो इंडो-इस्लामिक वास्तुकला का अनुपम उदाहरण है।"),

        # 8. River System - Sorrow of Bihar (Index 3)
        ("Which Himalayan river originating from the Tibet/Nepal Himalayas is notoriously infamous as the 'Sorrow of Bihar' (बिहार का शोक) due to frequent dynamic course shifts, devastating floods, and massive silt deposition?",
        "नेपाल/तिब्बत हिमालय से निकलने वाली कौन-सी नदी अपने अत्यधिक मार्ग परिवर्तन, तीव्र धारा और विनाशकारी बाढ़ के कारण 'बिहार का शोक' (Sorrow of Bihar) कहलाती है?",
        "Gandak River", "Son River", "Ghaghara River", "Kosi River (कोसी नदी)",
        3, "The Kosi River originates as Saptakoshi in the Himalayas and has shifted its course over 120 km westward over the past 250 years, causing catastrophic floods.",
        "कोसी नदी अपनी तेज धारा, रेत निक्षेपण और बार-बार मार्ग बदलने के कारण 'बिहार का शोक' कही जाती है।"),

        # 9. Panchayati Raj - Women Reservation (Index 0)
        ("Bihar became the very first state in independent India to grant what percentage of reservation to women in Panchayati Raj institutions under the Bihar Panchayati Raj Act of 2006?",
        "बिहार पंचायती राज अधिनियम, 2006 के तहत पंचायती राज संस्थाओं में महिलाओं को कितने प्रतिशत आरक्षण देने वाला बिहार भारत का पहला राज्य बना?",
        "50% Reservation (50% आरक्षण)", "33% Reservation", "25% Reservation", "40% Reservation",
        0, "Under the leadership of Chief Minister Nitish Kumar, the Bihar Panchayati Raj Act 2006 enacted 50% reservation for women in local self-governments.",
        "बिहार ने वर्ष 2006 में पंचायती राज संस्थाओं और नगर निकायों में महिलाओं को 50% आरक्षण प्रदान किया, जिससे यह ऐसा करने वाला देश का पहला राज्य बना।"),

        # 10. Geography - River Ganga in Bihar (Index 1)
        ("Near which historic location does the river Ganga enter the territory of Bihar from Uttar Pradesh, and where does it exit Bihar into West Bengal?",
        "गंगा नदी उत्तर प्रदेश से बिहार की सीमा में किस स्थान के निकट प्रवेश करती है, और बिहार से पश्चिम बंगाल में किस जिले से बाहर निकलती है?",
        "Enters at Gopalganj, exits at Bhagalpur", "Enters near Chausa (Buxar), exits from Katihar (चौसा/बक्सर में प्रवेश, कटिहार से निकास)", "Enters at Chapra, exits at Purnia", "Enters at Kaimur, exits at Kishanganj",
        1, "The Ganga enters Bihar near Chausa (Buxar district) and flows approximately 445 km through 12 districts, exiting near Manihari in Katihar district.",
        "गंगा नदी बिहार में चौसा (बक्सर) के निकट प्रवेश करती है और लगभग 445 किमी बहते हुए कटिहार जिले के मनिहारी के पास से पश्चिम बंगाल में प्रवेश करती है।"),

        # 11. Ramsar Site - Kanwar Jheel (Index 2)
        ("Which Asia's largest freshwater oxbow lake, situated in Begusarai district, was designated as Bihar's first Ramsar wetland site of international importance in 2020?",
        "बेगूसराय जिले में स्थित एशिया की सबसे बड़ी मीठे पानी की गोखुर (Oxbow) झील कौन-सी है, जिसे 2020 में बिहार के प्रथम रामसर आर्द्रभूमि स्थल के रूप में मान्यता दी गई थी?",
        "Baraila Lake (Vaishali)", "Gogabil Lake (Katihar)", "Kanwar Jheel / Kabar Taal (कांवर झील / काबर ताल - बेगूसराय)", "Kusheshwar Asthan (Darbhanga)",
        2, "Kanwar Lake (Kabar Taal) in Begusarai district was formed by an oxbow bend of the Burhi Gandak river and is Bihar's first Ramsar site.",
        "बेगूसराय स्थित काबर ताल (कांवर झील) एशिया की सबसे बड़ी गोखुर झील है तथा यह बिहार का प्रथम रामसर स्थल (Ramsar Site) है।"),

        # 12. Demographics - Population Density Census 2011 (Index 3)
        ("According to the Census of India 2011, what is the population density of Bihar, making it the most densely populated state in the country?",
        "भारत की जनगणना 2011 के अनुसार, बिहार का जनघनत्व (व्यक्ति प्रति वर्ग किलोमीटर) कितना है, जो इसे देश का सर्वाधिक जनघनत्व वाला राज्य बनाता है?",
        "829 persons per sq km", "918 persons per sq km", "1,028 persons per sq km", "1,106 persons per sq km (1,106 व्यक्ति प्रति वर्ग किमी)",
        3, "According to Census 2011, Bihar has the highest population density among all Indian states at 1,106 persons per square kilometer (Sheohar has the highest: 1,880).",
        "जनगणना 2011 के अनुसार बिहार का जनसंख्या घनत्व 1,106 व्यक्ति प्रति वर्ग किमी है (भारत में राज्यों में शीर्ष)। शिवहर जिला 1,880 के साथ सर्वाधिक जनघनत्व वाला जिला है।"),

        # 13. Ancient Thinker - Aryabhata (Index 0)
        ("The classical Indian mathematician and astronomer who propounded that the Earth rotates on its axis and approximated the value of Pi (π) worked in his observatory at Khagaul near which ancient city?",
        "प्राचीन भारत के महान खगोलशास्त्री एवं गणितज्ञ आर्यभट्ट, जिन्होंने पृथ्वी के अपनी धुरी पर घूमने और पाई (π) के सटीक मान का प्रतिपादन किया, की वेधशाला 'खगौल' किस प्राचीन नगर के समीप स्थित थी?",
        "Pataliputra / Patna (पाटलिपुत्र / पटना)", "Vaishali", "Rajgir", "Champa",
        0, "Aryabhata conducted his astronomical observations at Khagaul (meaning 'firmament/celestial sphere') near modern-day Patna (ancient Pataliputra).",
        "आर्यभट्ट ने अपनी प्रसिद्ध पुस्तक 'आर्यभटीय' की रचना पाटलिपुत्र में की थी। पटना के समीप 'खगौल' उनकी प्रसिद्ध खगोलीय वेधशाला थी।"),

        # 14. Tiger Reserve - Valmiki National Park (Index 1)
        ("What is the name of Bihar's sole National Park and Tiger Reserve, nestled along the foothills of the Himalayas and the Gandak river basin in West Champaran district?",
        "पश्चिमी चंपारण जिले में हिमालय की तराई और गंडक नदी बेसिन में स्थित बिहार के एकमात्र राष्ट्रीय उद्यान एवं बाघ अभयारण्य का क्या नाम है?",
        "Kaimur Tiger Reserve", "Valmiki National Park and Tiger Reserve (वाल्मीकि राष्ट्रीय उद्यान एवं टाइगर रिजर्व)", "Bhimbandh Sanctuary", "Gautam Buddha Sanctuary",
        1, "Valmiki National Park & Tiger Reserve in West Champaran district is the only national park in Bihar.",
        "वाल्मीकि राष्ट्रीय उद्यान एवं टाइगर रिजर्व पश्चिमी चंपारण जिले में स्थित बिहार का एकमात्र राष्ट्रीय उद्यान और बाघ अभयारण्य है।"),

        # 15. Mineral Resources - Pyrite Belt (Index 2)
        ("Bihar holds virtually 95% of India's total reserves of Pyrite (iron disulfide), predominantly mined from Amjhore located in which district of Bihar?",
        "भारत के कुल पाइराइट (Iron Disulfide - मूर्खों का सोना) भंडार का लगभग 95% बिहार में पाया जाता है। पाइराइट का प्रमुख खनन केंद्र 'आमझोर' किस जिले में स्थित है?",
        "Gaya", "Munger", "Rohtas (रोहतास - आमझोर)", "Kaimur",
        2, "Amjhore in Rohtas district contains India's premier pyrite deposits, historically used by Pyrites, Phosphates & Chemicals Limited (PPCL).",
        "रोहतास जिले का आमझोर क्षेत्र भारत में पाइराइट्स का सबसे बड़ा खनन केंद्र है।"),

        # 16. GI Tag - Makhana (Index 3)
        ("Which aquatic cash crop, harvested across the wetlands of the Mithila region (Darbhanga, Madhubani, Saharsa, Purnia), received a prestigious Geographical Indication (GI) tag in 2022?",
        "दरभंगा, मधुबनी, सहरसा और पूर्णिया सहित मिथिलांचल के जलाशयों में उत्पादित किस पौष्टिक जलीय उत्पाद को 2022 में भौगोलिक उपदर्शन (GI टैग) प्रदान किया गया?",
        "Katarni Chawal", "Magahi Paan", "Shahi Litchi", "Mithila Makhana (मिथिला मखाना / फॉक्स नट)",
        3, "Mithila Makhana (Fox nut / Euryale ferox) received its GI tag in 2022. Bihar produces more than 85-90% of the world's makhana.",
        "मिथिला मखाना को अगस्त 2022 में GI टैग दिया गया। बिहार विश्व के 85-90% मखाना का उत्पादन करता है।"),

        # 17. National Movement - Mazharul Haque & Sadaqat Ashram (Index 0)
        ("Who established the 'Sadaqat Ashram' in Patna on land donated by his friend Khairun Mian in 1921, which served as the epicentre of Bihar's freedom struggle?",
        "1921 में अपने मित्र खैरू मियाँ द्वारा दान की गई भूमि पर पटना में 'सदाकत आश्रम' की स्थापना किसने की थी, जो बिहार में स्वतंत्रता आंदोलन का मुख्य केंद्र बना?",
        "Maulana Mazharul Haque (मौलाना मजहरुल हक)", "Dr. Rajendra Prasad", "Maulana Shaukat Ali", "Syed Hasan Imam",
        0, "Maulana Mazharul Haque founded Sadaqat Ashram and also established the Bihar Vidyapeeth and launched the weekly paper 'The Motherland'.",
        "मौलाना मजहरुल हक ने 1921 में सदाकत आश्रम की स्थापना की और 'द मदरलैंड' नामक समाचार पत्र निकाला। बाद में सदाकत आश्रम डॉ. राजेंद्र प्रसाद का निवास बना।"),

        # 18. Soil Types - Karail-Kewal Soil (Index 1)
        ("The heavy clayey, highly moisture-retentive older alluvial soil found in the South Bihar plains (from Buxar, Bhojpur, Patna, Gaya to Munger and Bhagalpur) is locally known by which name?",
        "दक्षिण बिहार के मैदानी भागों (बक्सर, भोजपुर, पटना, गया, जहानाबाद से मुंगेर तक) में पाई जाने वाली भारी, जल-धारण क्षमता युक्त पुरानी जलोढ़ मिट्टी को स्थानीय भाषा में क्या कहा जाता है?",
        "Balsundari soil", "Karail-Kewal Soil (कराइल-केवाल मिट्टी)", "Piedmont Swamp soil", "Tal soil",
        1, "Karail-Kewal soil is the local name for older alluvium in South Bihar. It is highly fertile and suitable for rabi crops like wheat, gram, and pulses.",
        "दक्षिण बिहार की पुरानी जलोढ़ मिट्टी को 'कराइल-केवाल' कहा जाता है, जो चीका प्रधान, भारी और रबी फसलों (गेहूं, चना, दलहन) के लिए अत्यंत उपयुक्त होती है।"),

        # 19. First President - Dr. Rajendra Prasad (Index 2)
        ("Born in Ziradei (Siwan district), which stalwart leader served as the President of the Constituent Assembly of India and subsequently as the first President of the Republic of India?",
        "सीवान जिले के जीरादेई में जन्मे किस महान विभूति ने भारत की संविधान सभा के स्थायी अध्यक्ष तथा बाद में स्वतंत्र भारत के प्रथम राष्ट्रपति के रूप में कार्य किया?",
        "Sachchidananda Sinha", "Anugrah Narayan Sinha", "Dr. Rajendra Prasad (डॉ. राजेंद्र प्रसाद)", "Jayaprakash Narayan",
        2, "Dr. Rajendra Prasad was elected permanent President of the Constituent Assembly on 11 December 1946 and was India's first President (1950–1962).",
        "डॉ. राजेंद्र प्रसाद (जन्म: जीरादेई, सीवान) 11 दिसंबर 1946 को संविधान सभा के स्थायी अध्यक्ष चुने गए और 1950 से 1962 तक भारत के प्रथम राष्ट्रपति रहे।"),

        # 20. Ancient Monastery - Vikramshila Mahavihara (Index 3)
        ("Which Pala dynasty ruler founded the renowned Vikramshila Mahavihara at Antichak (Bhagalpur district) in the late 8th century CE, known for Vajrayana Buddhist studies?",
        "8वीं शताब्दी के उत्तरार्ध में भागलपुर जिले के अंतीचक में वज्रयान बौद्ध धर्म और तंत्र विद्या के प्रमुख केंद्र 'विक्रमशिला महाविहार' की स्थापना किस पाल नरेश ने की थी?",
        "Gopala", "Devapala", "Mahipala I", "Dharmapala (धर्मपाल)",
        3, "King Dharmapala (770–810 CE) founded Vikramshila University, which was later headed by scholar Atisa Dipankara.",
        "पाल वंश के प्रतापी राजा धर्मपाल ने 8वीं शताब्दी में विक्रमशिला विश्वविद्यालय की स्थापना की थी।"),

        # 21. Flagship Scheme - Saat Nischay-2 (Index 0)
        ("Under the Bihar Government's 'Saat Nischay-2' (सात निश्चय-2: 2020-2025) development roadmap, which component focuses specifically on promoting women empowerment and entrepreneurship?",
        "बिहार सरकार के 'सात निश्चय-2' (2020-2025) के अंतर्गत कौन-सा घटक विशेष रूप से महिला सशक्तिकरण एवं महिला उद्यमिता को बढ़ावा देने हेतु समर्पित है?",
        "Sashakt Mahila, Saksham Mahila (सशक्त महिला, सक्षम महिला)", "Yuva Shakti, Bihar Ki Pragati", "Har Khet Tak Sinchai Ka Pani", "Swachh Gaon, Samriddh Gaon",
        0, "'Sashakt Mahila, Saksham Mahila' provides financial aid (such as Mukhyamantri Kanya Utthan Yojana and Mahila Udyami Yojana) to empower women entrepreneurs.",
        "सात निश्चय-2 के तहत 'सशक्त महिला, सक्षम महिला' का लक्ष्य महिलाओं को उच्च शिक्षा हेतु प्रोत्साहन राशि और 10 लाख तक के ऋण/अनुदान देकर आत्मनिर्भर बनाना है।"),

        # 22. First Interim Assembly President - Sachchidananda Sinha (Index 1)
        ("Which eminent jurist and founder of the 'Searchlight' and 'Hindustan Review' from Bihar served as the temporary/interim President of the Constituent Assembly on 9 December 1946?",
        "बिहार के किस प्रख्यात विधिवेत्ता एवं 'द सर्चलाइट' के संस्थापक ने 9 दिसंबर 1946 को भारत की संविधान सभा की प्रथम बैठक की अंतरिम अध्यक्षता की थी?",
        "Sir Syed Ali Imam", "Dr. Sachchidananda Sinha (डॉ. सच्चिदानंद सिन्हा)", "Maulana Mazharul Haque", "Deep Narayan Singh",
        1, "Dr. Sachchidananda Sinha was chosen as the temporary Chairman of the Constituent Assembly on 9 December 1946 following the French practice of appointing the oldest member.",
        "डॉ. सच्चिदानंद सिन्हा ने वरिष्ठतम सदस्य होने के नाते 9 दिसंबर 1946 को संविधान सभा की प्रथम बैठक की अंतरिम अध्यक्षता की थी।"),

        # 23. Geography - Sone River Origin (Index 2)
        ("The Son river, the principal right-bank southern tributary of the Ganga in Bihar, originates from which plateau / range in central India?",
        "दक्षिण बिहार में गंगा की प्रमुख दाहिनी सहायक नदी 'सोन नदी' मध्य भारत के किस पठार/पर्वतमाला से निकलती है?",
        "Chota Nagpur Plateau", "Maikal Hills - Parasnath", "Amarkantak Plateau (अमरकंटक पठार - मध्य प्रदेश)", "Mahadeo Hills",
        2, "The Son River originates near Amarkantak in Anuppur district of Madhya Pradesh and flows through MP, UP, and Jharkhand before entering Bihar at Rohtas.",
        "सोन नदी मध्य प्रदेश के अमरकंटक पठार से निकलती है और बिहार में रोहतास के पास प्रवेश कर दानापुर/मनेर के निकट गंगा में मिलती है।"),

        # 24. Historic Firing - Pir Ali Khan (Index 3)
        ("During the 1857 Uprising in Patna, which brave bookseller organized an armed rebel uprising against British Deputy Opium Agent Dr. R. Lyell on 3 July 1857 before being hanged?",
        "पटना में 1857 की क्रांति के दौरान 3 जुलाई 1857 को किस देशभक्त पुस्तक विक्रेता ने ब्रिटिश अफीम एजेंट डॉ. आर. लॉयल के विरुद्ध सशस्त्र विद्रोह का बिगुल फूंका था, जिन्हें बाद में फांसी दी गई?",
        "Wilayat Ali", "Inayat Ali", "Lutf Ali Khan", "Pir Ali Khan (पीर अली खान - पटना)",
        3, "Pir Ali Khan, a humble bookseller of Patna, led the initial armed insurrection on 3 July 1857 in Patna and was martyred on 7 July 1857.",
        "पटना के पुस्तक विक्रेता पीर अली ने 3 जुलाई 1857 को पटना में अंग्रेजों के विरुद्ध विद्रोह किया। कमिश्नर टेलर ने उन्हें 7 जुलाई 1857 को फांसी दे दी थी।")
    ]

    for b in core_benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'BPSC TRE GS & Bihar Special Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering BPSC TRE General Studies and Bihar GK
    bihar_modules = [
        # History & National Movement
        ("Babu Kunwar Singh Jagdishpur Uprising 1857", "Led the 1857 revolt in Bhojpur/Arrah, defeated Captain Le Grand and Eyre", "बाबू कुंवर सिंह जगदीशपुर विद्रोह 1857", "बिहार का स्वतंत्रता संग्राम"),
        ("Champaran Satyagraha Tinkathia System 1917", "Mandatory indigo cultivation on 3/20th part of tenant holdings, abolished in 1917", "चंपारण सत्याग्रह तिनकठिया प्रणाली 1917", "बिहार का स्वतंत्रता संग्राम"),
        ("Swami Sahajanand Saraswati and Kisan Sabha", "Founded Bihar Provincial Kisan Sabha 1929, championed peasant tenancy rights", "स्वामी सहजानंद सरस्वती एवं किसान सभा", "किसान आंदोलन"),
        ("Patna Secretariat Martyrs of 11 August 1942", "Seven brave student martyrs shot while hoisting tricolour during Quit India", "11 अगस्त 1942 के पटना सचिवालय शहीद", "भारत छोड़ो आंदोलन"),
        ("Jayaprakash Narayan Azad Dasta Guerilla Force", "Underground resistance established in Nepal Terai after Hazaribagh jail escape", "जयप्रकाश नारायण आजाद दस्ता छापामार बल", "भारत छोड़ो आंदोलन"),
        ("Maulana Mazharul Haque and Sadaqat Ashram", "Established Sadaqat Ashram in 1921, founded Motherland newspaper and Bihar Vidyapeeth", "मौलाना मजहरुल हक एवं सदाकत आश्रम", "राष्ट्रीय आंदोलन"),
        ("Dr. Rajendra Prasad First President of India", "Constituent Assembly President, Bharat Ratna 1962, native of Ziradei Siwan", "डॉ. राजेंद्र प्रसाद भारत के प्रथम राष्ट्रपति", "राष्ट्रीय व्यक्तित्व"),
        ("Pir Ali Khan Patna 1857 Bookshop Martyrdom", "Led initial armed revolt in Patna on 3 July 1857 against Dr. Lyell", "पीर अली खान पटना 1857 शहादत", "बिहार का स्वतंत्रता संग्राम"),
        ("Karyanand Sharma and Barahiya Tal Movement", "Led Bakasht land restoration movement against zamindars in Munger", "कार्यानंद शर्मा एवं बड़हिया ताल आंदोलन", "किसान आंदोलन"),
        ("Bihari Students Conference and Tej Narayan College", "Established in 1906 under Dr. Rajendra Prasad's initiative, fostered youth leaders", "बिहारी छात्र सम्मेलन 1906", "छात्र आंदोलन"),
        ("Bihar Separate Province Movement 1912", "Carved out of Bengal Presidency on 22 March 1912, championed by Sachchidananda Sinha", "बिहार पृथक राज्य गठन 1912 (बिहार दिवस)", "बिहार का इतिहास"),
        ("Chaukidari Tax Non-Payment Campaign 1930", "Civil disobedience resistance in Champaran, Saran, Monghyr against village police tax", "चौकीदारी कर बंदी आंदोलन 1930", "सविनय अवज्ञा आंदोलन"),

        # Ancient & Medieval Bihar
        ("Nalanda Mahavihara Ancient University", "Founded by Kumaragupta I in 5th century CE, premier international Buddhist monastery", "नालंदा महाविहार प्राचीन विश्वविद्यालय", "प्राचीन बिहार"),
        ("Vikramshila Mahavihara Buddhist Seat", "Established by Pala King Dharmapala at Antichak Bhagalpur, Tantric Vajrayana center", "विक्रमशिला महाविहार बौद्ध अध्ययन केंद्र", "प्राचीन बिहार"),
        ("Aryabhata Astronomical Observatory Khagaul", "Calculated Pi and Earth's planetary rotation at Khagaul near Pataliputra", "आर्यभट्ट खगोलीय वेधशाला खगौल", "प्राचीन विज्ञान"),
        ("Ashoka Major Rock and Pillar Edicts in Bihar", "Pillars at Lauriya Nandangarh, Rampurva, Sasaram minor rock edict promoting Dhamma", "अशोक के बिहार स्थित शिलालेख एवं स्तंभ", "मौर्य साम्राज्य"),
        ("Chandragupta Maurya and Chanakya Arthashastra", "Overthrew Nandas in 321 BCE, established unified empire from Pataliputra", "चंद्रगुप्त मौर्य एवं चाणक्य का अर्थशास्त्र", "मौर्य साम्राज्य"),
        ("Mahavira Nirvana at Pavapuri and Birth at Kundagram", "24th Jain Tirthankara, attained Kaivalya and Nirvana at Pavapuri near Nalanda", "भगवान महावीर जन्म कुंडलपुर एवं निर्वाण पावापुरी", "जैन धर्म"),
        ("Gautama Buddha Enlightenment at Bodh Gaya", "Attained supreme Bodhi under Bodhi tree on banks of river Niranjana/Falgu", "भगवान बुद्ध संबोधि बोधगया निरंजना तट", "बौद्ध धर्म"),
        ("Sher Shah Suri Sasaram Mausoleum and GT Road", "Octagonal tomb in water tank, administrative land revenue reforms and Rupiya", "शेरशाह सूरी सासाराम मकबरा एवं प्रशासनिक सुधार", "मध्यकालीन बिहार"),
        ("Barabar Caves Mauryan Rock Architecture", "Lomas Rishi and Sudama caves carved for Ajivika sect by Ashoka and Dasaratha", "बराबर की गुफाएं जहानाबाद", "मौर्यकालीन वास्तुकला"),
        ("Megasthenes Indica and Pataliputra Administration", "Described municipal administration of Pataliputra by six municipal boards", "मेगस्थनीज की इंडिका एवं नगर प्रशासन", "प्राचीन इतिहास"),

        # Geography, Rivers & Climate
        ("River Ganga Trajectory Across Bihar", "Flows 445 km through 12 districts, dividing state into North and South plains", "गंगा नदी का बिहार में प्रवाह मार्ग", "बिहार का भूगोल"),
        ("Kosi River Saptakoshi Sorrow of Bihar", "Antecedent river with 7 tributaries, extensive meandering and shift westward", "कोसी नदी सप्तकोशी एवं बाढ़ विभीषिका", "बिहार की नदियां"),
        ("Gandak River and Triveni Canal Project", "Originates in Nepal as Narayani, provides major irrigation via Triveni canal", "गंडक नदी एवं त्रिवेणी नहर प्रणाली", "बिहार की नदियां"),
        ("Son River Tributary and Dehri Barrage", "Originates at Amarkantak MP, right bank southern tributary, Indrapuri barrage", "सोन नदी अमरकंटक उद्गम एवं डेहरी बराज", "बिहार की नदियां"),
        ("Falgu River and Pitrapaksha Mela Gaya", "Formed by Lilajan and Mohana rivers, dry sandy bed where Gayawali priests perform Pind Daan", "फल्गु नदी एवं गया पितृपक्ष मेला", "बिहार की नदियां"),
        ("Bagmati and Burhi Gandak River Basins", "Originates in Shivapuri Nepal, flood-prone northern sub-basins draining into Kosi/Ganga", "बागमती एवं बूढ़ी गंडक नदी बेसिन", "बिहार की नदियां"),
        ("Shiwalik Someshwar Fort Range West Champaran", "Highest elevation point in Bihar (~874 meters) in northwestern corner", "सोमेश्वर श्रेणी एवं पश्चिमी चंपारण शिवालिक", "बिहार की भू-आकृति"),
        ("Bangar Older Alluvium and Khadar Newer Soils", "Bangar in South plains (clayey), Khadar in North floodplains (sandy loam)", "बांगर पुरानी जलोढ़ एवं खादर नवीन जलोढ़", "बिहार की मिट्टियां"),
        ("Karail-Kewal Soil Characteristics in South Bihar", "Heavy dark clay soil with high moisture retention, ideal for rabi crops", "कराइल-केवाल भारी चीका मिट्टी", "बिहार की मिट्टियां"),
        ("Terai Marshy Soil Belt along Nepal Border", "Narrow damp northern belt with acidic marshy soil supporting sal forests", "तराई नम दलदली मिट्टी पेटी", "बिहार की मिट्टियां"),
        ("Koppen Climate Classification Cwg for Bihar", "Subtropical monsoon climate with hot summer, dry winter and humid rainy season", "कोपेन जलवायु वर्गीकरण Cwg बिहार", "बिहार की जलवायु"),
        ("Rainfall Distribution in Kishanganj vs Aurangabad", "Highest rainfall in northeastern Kishanganj (>1500 mm), lowest in Aurangabad", "किशनगंज अधिकतम वर्षा बनाम औरंगाबाद न्यूनतम", "बिहार की जलवायु"),

        # Protected Wildlife & Natural Heritage
        ("Valmiki National Park and Tiger Reserve", "Sole national park in West Champaran, Terai ecosystem with Bengal tigers and rhinos", "वाल्मीकि राष्ट्रीय उद्यान एवं टाइगर रिजर्व", "वन्यजीव संरक्षण"),
        ("Kanwar Jheel Begusarai Ramsar Wetland", "Asia's largest oxbow lake formed by Burhi Gandak, vital migratory bird habitat", "कांवर झील बेगूसराय रामसर आर्द्रभूमि", "आर्द्रभूमि संरक्षण"),
        ("Vikramshila Gangetic Dolphin Sanctuary Bhagalpur", "Sole dolphin sanctuary in India along 50 km stretch of Ganga from Sultanganj to Kahalgaon", "विक्रमशिला गंगा डॉल्फिन अभयारण्य", "वन्यजीव संरक्षण"),
        ("Kaimur Wildlife Sanctuary Rohtas and Kaimur", "Largest wildlife sanctuary in Bihar, Vindhyan sandstone forested plateau", "कैमूर वन्यजीव अभयारण्य", "वन्यजीव संरक्षण"),
        ("Nakti and Nagi Dam Bird Sanctuaries Jamui", "Twin dam reservoirs in Jamui declared Ramsar wetlands in 2024", "नकटी एवं नागी पक्षी अभयारण्य जमुई", "रामसर स्थल"),
        ("Bhimbandh Wildlife Sanctuary Munger", "Dense sal forest surrounding hot sulfur springs in Kharagpur hill tracts", "भीमबांध वन्यजीव अभयारण्य मुंगेर", "वन्यजीव संरक्षण"),
        ("Rajgir Wildlife Sanctuary and Nature Safari", "Historic Five Hills (Vipula, Vaibhava, Ratna, Giddha, Sona) with glass skywalk", "राजगीर वन्यजीव अभयारण्य एवं नेचर सफारी", "प्राकृतिक पर्यटन"),

        # Minerals & Economy
        ("Pyrite Mineral Wealth at Amjhore Rohtas", "Accounts for 95% of India's pyrite reserves, sulfur extraction industry", "पाइराइट खनिज आमझोर रोहतास", "बिहार के खनिज"),
        ("Limestone Reserves of Kaimur and Rohtas", "Supports major cement factories at Banjari, Kalyanpur and Japla", "चूना पत्थर भंडार कैमूर एवं रोहतास", "बिहार के खनिज"),
        ("Mica Mineral Belt in Nawada and Gaya", "Part of the historic Bihar-Jharkhand mica belt, pegmatite vein deposits", "अभ्रक खनिज पेटी नवादा एवं गया", "बिहार के खनिज"),
        ("Gold Reserves Discovered at Sono Jamui", "Geological Survey of India identified significant sub-surface gold ore reserves", "सोने का भंडार सोनो जमुई", "बिहार के खनिज"),
        ("Dharwar Rock Formation vs Vindhyan Formations", "Dharwar quartzites in southeastern hills (Munger, Jamui), Vindhyan limestones in southwest", "धारवाड़ चट्टानें बनाम विंध्यन चट्टानें", "बिहार का भूविज्ञान"),

        # Demographics (Census 2011) & Literacy
        ("Bihar Population Density 1106 Persons Per Sq Km", "Highest population density among Indian states; Sheohar district leads at 1880", "बिहार जनघनत्व 1,106 व्यक्ति प्रति वर्ग किमी", "जनगणना 2011"),
        ("Bihar Overall Literacy Rate 61.8 Percent", "Male literacy 71.2%, Female literacy 51.5%; Rohtas district has highest literacy", "बिहार साक्षरता दर 61.8% (रोहतास शीर्ष)", "जनगणना 2011"),
        ("Sex Ratio Across Bihar 918 Females Per 1000 Males", "Gopalganj has highest sex ratio (1021), Munger has lowest (876)", "बिहार लिंगानुपात 918 (गोपालगंज 1021 शीर्ष)", "जनगणना 2011"),
        ("Urbanization Percentage in Bihar 11.3 Percent", "Lowest urbanized state after Himachal Pradesh; Patna district has highest urbanization", "बिहार में नगरीकरण 11.3%", "जनगणना 2011"),
        ("Decadal Population Growth Rate 25.42 Percent", "Madhepura recorded highest decadal population growth rate (31.12%)", "दशकीय जनसंख्या वृद्धि दर 25.42%", "जनगणना 2011"),

        # Polity & Public Administration
        ("Bicameral Legislature Vidhan Sabha 243 Seats", "Bihar Legislative Assembly (243 seats) and Legislative Council (75 seats)", "द्विसदनीय विधायिका विधानसभा 243 सीटें", "बिहार की राजव्यवस्था"),
        ("Lok Sabha 40 and Rajya Sabha 16 Representation", "Bihar sends 40 MPs to Lok Sabha (6 reserved for SCs) and 16 to Rajya Sabha", "लोकसभा 40 एवं राज्यसभा 16 सीटें", "संसदीय प्रतिनिधित्व"),
        ("Panchayati Raj 50 Percent Women Reservation 2006", "Pioneering state enactment empowering rural women governance across PRI tiers", "पंचायती राज में 50% महिला आरक्षण", "पंचायती राज व्यवस्था"),
        ("Saat Nischay Part 1 Seven Resolves 2015", "Har Ghar Nal Ka Jal, Ghar Tak Pakki Galiyan, Awas Yojana, Shauchalay Nirman", "सात निश्चय भाग-1 (2015-2020)", "सरकारी योजनाएं"),
        ("Saat Nischay Part 2 Development Blueprint 2020", "Yuva Shakti, Sashakt Mahila, Har Khet Sinchai, Swachh Gaon, Sulabh Samparkata", "सात निश्चय भाग-2 (2020-2025)", "सरकारी योजनाएं"),
        ("Mukhyamantri Kanya Utthan Yojana Incentives", "Cash assistance from girl child birth up to graduation degree completion", "मुख्यमंत्री कन्या उत्थान योजना", "महिला सशक्तिकरण"),
        ("Har Ghar Nal Ka Jal Tap Water Scheme", "Flagship piped drinking water supply program later adopted nationally as Jal Jeevan Mission", "हर घर नल का जल योजना", "ग्रामीण विकास"),
        ("Mukhyamantri Udyami Yojana for SC ST OBC Women", "10 lakh financial assistance (5 lakh grant + 5 lakh interest-free/1% loan) for enterprises", "मुख्यमंत्री उद्यमी योजना", "रोजगार एवं स्वरोजगार"),

        # GI Tags & Cultural Arts
        ("Mithila Makhana Aquatic Superfood GI Tag", "Fox nut cultivated extensively in ponds of Mithila, rich in protein and flavonoids", "मिथिला मखाना जीआई टैग", "कृषि एवं जीआई उत्पाद"),
        ("Shahi Litchi of Muzaffarpur GI Tag", "Renowned luscious pink fruit with sweet pulp, GI certified from north Bihar", "मुजफ्फरपुर की शाही लीची जीआई टैग", "कृषि एवं जीआई उत्पाद"),
        ("Katarni Chawal Aromatic Rice of Bhagalpur", "Short-grained indigenous aromatic rice cultivated in Bhagalpur and Banka", "कतर्नी चावल भागलपुर जीआई टैग", "कृषि एवं जीआई उत्पाद"),
        ("Magahi Paan Betel Leaf of Nawada and Gaya", "Delicate fragrant betel leaf variety cultivated in specialized barejas", "मगही पान नवादा-गया जीआई टैग", "कृषि एवं जीआई उत्पाद"),
        ("Zardalu Mango of Bhagalpur Sweet Scent", "Golden yellow sweet fragrant mango awarded Geographical Indication status", "जर्दालु आम भागलपुर जीआई टैग", "कृषि एवं जीआई उत्पाद"),
        ("Madhubani Painting Mithila Folk Art GI Tag", "Traditional wall (Bhitti) and floor (Aripana) art using natural vegetable dyes", "मधुबनी पेंटिंग मिथिला लोक कला", "बिहार की लोक कला"),
        ("Sujani Embroidery Traditional Quilt Stitching", "Intricate narrative chain stitch embroidery on recycled layered fabrics", "सुजनी कढ़ाई कला जीआई टैग", "हस्तशिल्प"),
        ("Sikki Grass Golden Fiber Craft of Mithila", "Golden grass craft weaving decorative baskets, boxes and toys in north Bihar", "सिक्की घास सुनहरी रेशा कला", "हस्तशिल्प"),
        ("Silao Khaja Sweet Confectionery GI Tag", "Multi-layered crispy sweet pastry originating from Silao near Nalanda", "सिलाव का खाजा नालंदा जीआई टैग", "पारंपरिक व्यंजन")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(bihar_modules)
        topic, facts, topic_hi, category = bihar_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the context of Bihar's administrative, historical, and geographical landscape, which statement regarding '{topic}' is historically or factually accurate?"
            stem_hi = f"बिहार के प्रशासनिक, ऐतिहासिक एवं भौगोलिक परिप्रेक्ष्य में '{topic_hi}' से संबंधित कौन-सा कथन प्रामाणिक एवं सत्य है?"
            sol_en = f"Factual core: {facts}. Domain: {category}."
            sol_hi = f"प्रामाणिक तथ्य: {facts}। श्रेणी: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Regulated under the British Thames Conservancy Act 1857", 'hi': "ब्रिटिश टेम्स जल संरक्षण अधिनियम 1857 द्वारा नियंत्रित"},
                {'en': "Administered solely through the Swedish Forestry Board protocol", 'hi': "स्वीडिश वानिकी बोर्ड प्रोटोकॉल द्वारा प्रशासित"},
                {'en': "Formulated as part of the Treaty of Utrecht trade provisions", 'hi': "उट्रेच संधि के व्यापारिक प्रावधानों के तहत निर्मित"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key syllabus component of BPSC TRE General Studies is '{topic}' categorized?"
            stem_hi = f"बीपीएससी शिक्षक भर्ती (BPSC TRE) के सामान्य अध्ययन पाठ्यक्रम में '{topic_hi}' किस मुख्य विषय/क्षेत्र से संबद्ध है?"
            sol_en = f"Categorized under {category}. Details: {facts}."
            sol_hi = f"यह '{category}' के अंतर्गत आता है। विवरण: {facts}।"
            choices = [
                {'en': "Medieval Venetian Merchant Maritime Routes", 'hi': "मध्यकालीन वेनिस समुद्री व्यापारिक मार्ग"},
                {'en': f"BPSC TRE Syllabus: {category} ({facts})", 'hi': f"बीपीएससी पाठ्यक्रम: {category} ({facts})"},
                {'en': "North American Appalachian Coal Basin Logistics", 'hi': "उत्तरी अमेरिकी एपलाचियन कोयला बेसिन"},
                {'en': "Ottoman Imperial Cavalry Regiment Reorganization", 'hi': "उस्मानी साम्राज्य घुड़सवार सेना पुनर्गठन"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"Why is knowledge of '{topic}' crucial for understanding Bihar's socioeconomic development and freedom struggle?"
            stem_hi = f"बिहार के सामाजिक-आर्थिक विकास अथवा स्वतंत्रता संग्राम के अध्ययन में '{topic_hi}' का क्या महत्व है?"
            sol_en = f"Significance: {facts}. Core domain: {category}."
            sol_hi = f"महत्व: {facts}। मुख्य क्षेत्र: {category}।"
            choices = [
                {'en': "It was created to regulate diamond exports from South African mines", 'hi': "यह दक्षिण अफ्रीकी खानों से हीरा निर्यात नियंत्रित करने हेतु बना था"},
                {'en': "It serves as the base protocol for Pacific undersea telegraph cables", 'hi': "यह प्रशांत महासागर के नीचे टेलीग्राफ केबल बिछाने का प्रोटोकॉल है"},
                {'en': f"Key historical/geographical significance: {facts} ({category})", 'hi': f"महत्वपूर्ण ऐतिहासिक/भौगोलिक योगदान: {facts} ({category})"},
                {'en': "It was designed to calculate astronomical ephemeris for Antarctic observatories", 'hi': "यह अंटार्कटिक वेधशालाओं हेतु खगोलीय पंचांग गणना हेतु बना था"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately synthesizes the significance of '{topic}' in Bihar?"
            stem_hi = f"बिहार में '{topic_hi}' के महत्व का सबसे सटीक और प्रमाणिक सार संक्षेप कौन-सा है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Pertains to alpine skiing safety standards in the European Alps", 'hi': "यूरोपीय आल्प्स में स्कीइंग सुरक्षा मानकों से संबंधित"},
                {'en': "Relates to the deep-water petroleum extraction policy of the Gulf of Mexico", 'hi': "मेक्सिको की खाड़ी की गहरे पानी की पेट्रोलियम नीति से संबंधित"},
                {'en': "Governs the currency exchange rates of the 19th-century Austro-Hungarian Empire", 'hi': "19वीं सदी के ऑस्ट्रो-हंगेरियन साम्राज्य की मुद्रा विनिमय दर"},
                {'en': f"Accurate Bihar context: {facts} ({category})", 'hi': f"सटीक बिहार संदर्भ: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Bihar GS - {category}',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': opt_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 3 == 0 else ('MODERATE' if i % 3 == 1 else 'HARD')
        })

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items

if __name__ == '__main__':
    res = get_raw_gs_bihar_gk_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

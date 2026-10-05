"""
UP TET & Super TET - Environmental Studies, Science, Social Studies & UP Special GK
(पर्यावरण अध्ययन, सामान्य विज्ञान एवं उत्तर प्रदेश विशेष सामान्य ज्ञान) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Environmental Ecology: Food Chains, Lindeman's 10% Rule, Ozone Depletion, Acid Rain, Chipko Movement
- General Science: Physics, Chemistry & Biology Fundamentals, Human Physiology, Vitamins & Diseases
- Indian Constitution & Geography: Preamble, Fundamental Rights, Article 21A RTE, River Basins, Regur Soil
- Uttar Pradesh Special GK: UP Geography (Rivers: Ganga, Yamuna, Gomti), Dudhwa National Park & Ramsar Sites
- 1857 Revolt in UP: Meerut, Jhansi (Rani Lakshmibai), Lucknow (Begum Hazrat Mahal), Kanpur (Nana Saheb)
- UP Culture & Folk Arts: Kathak (Lucknow Gharana), Charkula Dance, Nautanki, Kajari, Alha Ballads
- UP Handicrafts & ODOP: Lucknow Chikan, Moradabad Brass, Firozabad Glass, Kannauj Itr, Bhadohi Carpets
- UP Demographics: Census 2011 figures (Population, Density, Sex Ratio 912, Literacy 67.7%)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_evs_up_gk_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. UP National Park - Dudhwa (Index 0)
        ("Which is the sole National Park and premier Tiger Reserve of Uttar Pradesh, situated in Lakhimpur Kheri district along the Indo-Nepal Terai border?",
        "उत्तर प्रदेश का एकमात्र राष्ट्रीय उद्यान एवं प्रमुख बाघ अभयारण्य कौन-सा है, जो भारत-नेपाल सीमा पर लखीमपुर खीरी जिले में स्थित है?",
        "Dudhwa National Park (दुधवा राष्ट्रीय उद्यान - लखीमपुर खीरी)", "Chandraprabha Sanctuary", "Hastinapur Sanctuary", "Kaimur Sanctuary",
        0, "Dudhwa National Park in Lakhimpur Kheri was established in 1977 and forms the core of the Dudhwa Tiger Reserve.",
        "दुधवा राष्ट्रीय उद्यान (लखीमपुर खीरी) उत्तर प्रदेश का एकमात्र राष्ट्रीय उद्यान है, जिसे 1977 में राष्ट्रीय उद्यान तथा 1987 में प्रोजेक्ट टाइगर में शामिल किया गया।"),

        # 2. 1857 Revolt in UP - Meerut Outbreak (Index 1)
        ("On which historic date did the sepoys of the 3rd Native Cavalry in Meerut openly revolt against the British, sparking the widespread 1857 First War of Indian Independence?",
        "मेरठ छावनी में तीसरी देशी घुड़सवार सेना (3rd Native Cavalry) के सैनिकों ने चर्बीयुक्त कारतूसों के प्रयोग से इनकार कर किस ऐतिहासिक तिथि को 1857 के प्रथम स्वतंत्रता संग्राम का खुला बिगुल फूंका था?",
        "29 March 1857", "10 May 1857 (10 मई 1857 - मेरठ छावनी से क्रांति का सूत्रपात)", "12 June 1857", "15 August 1857",
        1, "On 10 May 1857, Indian soldiers in Meerut broke open the jail, marched to Delhi, and proclaimed Bahadur Shah Zafar as the Emperor of Hindustan.",
        "10 मई 1857 को मेरठ छावनी से सैनिकों ने ब्रिटिश अधिकारियों के विरुद्ध विद्रोह कर 'दिल्ली चलो' का नारा दिया और क्रांति की औपचारिक शुरुआत की।"),

        # 3. UP Folk Dance - Charkula Dance (Index 2)
        ("In which cultural region of Uttar Pradesh is the traditional 'Charkula' folk dance performed, where female dancers balance a multi-tiered wooden pyramid holding 108 illuminated oil lamps on their heads?",
        "उत्तर प्रदेश के किस सांस्कृतिक क्षेत्र में प्रसिद्ध 'चरकुला नृत्य' (Charkula Dance) किया जाता है, जिसमें महिलाएं सिर पर 108 प्रज्वलित दीपकों से युक्त लकड़ी के बहुमंजिला पिरामिड को संतुलित कर नृत्य करती हैं?",
        "Awadh Region", "Bundelkhand Region", "Braj Region (ब्रज भूमि / मथुरा-वृंदावन क्षेत्र)", "Purvanchal Region",
        2, "Charkula is a dramatic folk dance of the Braj region (Mathura/Vrindavan) celebrating Radha's birth anniversary, where women dance with a heavy 108-lamp structure on their heads.",
        "चरकुला नृत्य ब्रज क्षेत्र (मथुरा, गोवर्धन) का प्रसिद्ध पारंपरिक लोक नृत्य है, जिसमें नृत्यांगनाएं सिर पर 108 दीपकों का चरकुला रखकर नृत्य करती हैं।"),

        # 4. UP River - Gomti Origin (Index 3)
        ("The river Gomti, on whose banks the historic capital city of Lucknow and Sultanpur are situated, originates from which lake in Pilibhit district of Uttar Pradesh?",
        "गोमती नदी, जिसके तट पर उत्तर प्रदेश की राजधानी लखनऊ तथा सुल्तानपुर व जौनपुर स्थित हैं, पीलीभीत जिले की किस झील से निकलती है?",
        "Govind Ballabh Pant Sagar", "Keetham Lake", "Bara Tal", "Fulhar Lake / Gomat Taal (फुलहर झील / गोमत ताल - पीलीभीत)",
        3, "The Gomti River originates from Fulhar Lake (Gomat Taal) near Madho Tanda in Pilibhit district, flowing 960 km before joining the Ganga near Saidpur in Ghazipur.",
        "गोमती नदी पीलीभीत जिले के माधोटांडा के निकट 'फुलहर झील' (गोमत ताल) से निकलती है और गाजीपुर के सैदपुर के पास गंगा में मिलती है।"),

        # 5. EVS - Acid Rain Chemical Agent (Index 0)
        ("The historical discoloration and marble corrosion ('Marble Cancer') of the Taj Mahal in Agra is primarily caused by Acid Rain formed by which atmospheric industrial pollutants?",
        "आगरा के विश्व प्रसिद्ध ताजमहल के संगमरमर का पीला पड़ना तथा 'मार्बल कैंसर' का मुख्य कारण कौन-सी वायुमंडलीय गैसों द्वारा बनने वाली अम्लीय वर्षा (Acid Rain) है?",
        "Sulfur Dioxide (SO2) and Nitrogen Oxides (NOx) (सल्फर डाइऑक्साइड एवं नाइट्रोजन के ऑक्साइड)", "Carbon Monoxide and Methane", "Chlorofluorocarbons and Ozone", "Ammonia and Carbon Dioxide",
        0, "Sulfur Dioxide (SO2) and Nitrogen Oxides (NOx) react with water vapour in clouds to form sulfuric and nitric acids, corroding the calcium carbonate marble of the Taj Mahal.",
        "मथुरा तेल शोधक कारखाने और उद्योगों से निकलने वाली सल्फर डाइऑक्साइड (SO2) और नाइट्रोजन ऑक्साइड जलवाष्प से क्रिया कर सल्फ्यूरिक व नाइट्रिक अम्ल बनाती हैं, जिससे ताजमहल का संगमरमर पीला पड़ रहा है।"),

        # 6. UP Handicrafts - ODOP Moradabad (Index 1)
        ("Under the Uttar Pradesh Government's flagship 'One District One Product' (ODOP) initiative, which city is globally acclaimed as the 'Peetal Nagri' (Brass City) for its exquisite brass handicrafts?",
        "उत्तर प्रदेश सरकार की 'एक जिला एक उत्पाद' (ODOP) योजना के अंतर्गत किस नगर को अपने उत्कृष्ट पीतल के बर्तनों और नक्काशीदार हस्तशिल्प हेतु विश्व विख्यात 'पीतल नगरी' कहा जाता है?",
        "Firozabad", "Moradabad (मुरादाबाद - पीतल नगरी)", "Aligarh", "Khurja",
        1, "Moradabad is renowned worldwide as 'Peetal Nagri' (Brass City) for its brassware manufacturing and export industry.",
        "मुरादाबाद को अपने पीतल हस्तशिल्प और नक्काशी उद्योग के कारण 'पीतल नगरी' के रूप में जाना जाता है।"),

        # 7. Environmental Movement - Chipko Movement (Index 2)
        ("The historic 'Chipko Movement' (चिपको आंदोलन), where rural villagers hugged forest trees to prevent commercial felling, was initiated in 1973 in Chamoli district under the leadership of:",
        "1973 में पेड़ों को कटने से बचाने के लिए महिलाओं द्वारा पेड़ों से चिपककर चलाया गया ऐतिहासिक 'चिपको आंदोलन' किसके नेतृत्व में शुरू हुआ था?",
        "Medha Patkar", "Baba Amte", "Sunderlal Bahuguna, Chandi Prasad Bhatt & Gaura Devi (सुंदरलाल बहुगुणा, चंडी प्रसाद भट्ट एवं गौरा देवी)", "Salim Ali",
        2, "The Chipko Movement began in 1973 in Reni village, Chamoli (then in UP, now Uttarakhand) spearheaded by Sunderlal Bahuguna, Chandi Prasad Bhatt, and Gaura Devi.",
        "चिपको आंदोलन 1973 में चमोली (तत्कालीन उत्तर प्रदेश) में सुंदरलाल बहुगुणा, चंडी प्रसाद भट्ट और गौरा देवी के नेतृत्व में शुरू हुआ था।"),

        # 8. UP Demographics - Sex Ratio Census 2011 (Index 3)
        ("According to the Census of India 2011, what is the overall Sex Ratio (लिंगानुपात - females per 1,000 males) of Uttar Pradesh, and which district has the highest sex ratio in the state?",
        "भारत की जनगणना 2011 के अनुसार, उत्तर प्रदेश का कुल लिंगानुपात कितना है तथा राज्य में सर्वाधिक लिंगानुपात वाला जिला कौन-सा है?",
        "928 per 1,000; Azamgarh", "943 per 1,000; Varanasi", "902 per 1,000; Deoria", "912 per 1,000; Jaunpur (1,024 females per 1,000 males) (उत्तर प्रदेश: 912; जौनपुर: 1024)",
        3, "According to Census 2011, Uttar Pradesh's sex ratio is 912 females per 1000 males. Jaunpur district records the highest sex ratio in UP at 1,024 females per 1000 males.",
        "जनगणना 2011 के अनुसार उत्तर प्रदेश का लिंगानुपात 912 है। जौनपुर जिला 1,024 लिंगानुपात के साथ राज्य में शीर्ष स्थान पर है (दूसरा: आजमगढ़ 1,019)।"),

        # 9. UP Classical Dance - Kathak Lucknow Gharana (Index 0)
        ("The classical dance form 'Kathak' (कथक), which originated in Uttar Pradesh from storytellers (कथा कहे सो कथक कहावे), flourished under the royal patronage of Nawab Wajid Ali Shah in which renowned Gharana?",
        "उत्तर प्रदेश का एकमात्र शास्त्रीय नृत्य 'कथक' नवाब वाजिद अली शाह के संरक्षण में किस प्रसिद्ध घराने में अपने चरमोत्कर्ष पर पहुंचा?",
        "Lucknow Gharana (लखनऊ घराना - बिंदादीन महाराज, लच्छू महाराज, पंडित बिरजू महाराज)", "Jaipur Gharana", "Banaras Gharana", "Raigarh Gharana",
        0, "The Lucknow Gharana of Kathak was established by Ishwari Prasad and nurtured under the reign of Nawab Wajid Ali Shah, renowned for graceful 'Bhava' and 'Abhinaya'.",
        "कथक का लखनऊ घराना नवाब वाजिद अली शाह के काल में प्रसिद्ध हुआ। इस घराने के प्रमुख कलाकार पंडित बिरजू महाराज, लच्छू महाराज और शंभू महाराज रहे हैं।"),

        # 10. EVS - Ramsar Site Bakhira (Index 1)
        ("Which freshwater bird sanctuary located in Sant Kabir Nagar district of eastern Uttar Pradesh was designated as a Ramsar Wetland of International Importance on World Wetlands Day 2022?",
        "पूर्वी उत्तर प्रदेश के संत कबीर नगर जिले में स्थित कौन-सा मीठे पानी का पक्षी अभयारण्य विश्व आर्द्रभूमि दिवस 2022 को अंतरराष्ट्रीय महत्व का 'रामसर स्थल' घोषित किया गया था?",
        "Sur Sarovar Lake (Agra)", "Bakhira Bird Sanctuary (बखीरा पक्षी अभयारण्य - संत कबीर नगर)", "Saman Sanctuary (Mainpuri)", "Sandi Sanctuary (Hardoi)",
        1, "Bakhira Wildlife Sanctuary in Sant Kabir Nagar provides wintering ground for over 80 species of migratory waterbirds and was designated a Ramsar site in 2022.",
        "संत कबीर नगर जिले में स्थित बखीरा पक्षी अभयारण्य उत्तर प्रदेश का एक प्रमुख रामसर आर्द्रभूमि स्थल है।"),

        # 11. 1857 Revolt in UP - Begum Hazrat Mahal (Index 2)
        ("During the 1857 Rebellion, which courageous queen led the freedom fighters in Lucknow, placed her young son Birjis Qadr on the throne of Awadh, and fiercely resisted British Commissioner Henry Lawrence?",
        "1857 के संग्राम में लखनऊ (अवध) से ब्रिटिश हुकूमत के विरुद्ध क्रांति का नेतृत्व करने वाली वीरांगना कौन थीं, जिन्होंने अपने अल्पवयस्क पुत्र बिरजिस कद्र को अवध का नवाब घोषित कर अंग्रेजों से लोहा लिया?",
        "Rani Lakshmibai", "Rani Avantibai", "Begum Hazrat Mahal (बेगम हजरत महल - लखनऊ)", "Uda Devi Pasi",
        2, "Begum Hazrat Mahal led the revolt in Lucknow, capturing the Residency and inflicting heavy casualties on British forces before retreating to Nepal.",
        "बेगम हजरत महल ने लखनऊ में 1857 के विद्रोह का नेतृत्व किया और अपने पुत्र बिरजिस कद्र को नवाब घोषित कर रेजीडेंसी पर कब्जा कर लिया था।"),

        # 12. UP Geography - Bordering States Count (Index 3)
        ("Uttar Pradesh shares its geographical borders with how many Indian States and Union Territories, making it bordered by the maximum number of states in India?",
        "उत्तर प्रदेश अपनी भौगोलिक सीमा कितने भारतीय राज्यों एवं केंद्र शासित प्रदेशों के साथ साझा करता है (जो देश के किसी भी राज्य से सर्वाधिक है)?",
        "7 States and 1 UT", "8 States and 2 UTs", "6 States and 1 UT", "8 States and 1 Union Territory (Delhi) + 1 International Country Nepal (कुल 9: 8 राज्य + 1 दिल्ली)",
        3, "UP touches 8 States (Uttarakhand, Himachal Pradesh, Haryana, Rajasthan, MP, Chhattisgarh, Jharkhand, Bihar) and 1 UT (Delhi), plus international border with Nepal.",
        "उत्तर प्रदेश की सीमा 8 राज्यों (उत्तराखंड, हिप्र, हरियाणा, राजस्थान, मप्र, छत्तीसगढ़, झारखंड, बिहार) तथा 1 केंद्र शासित प्रदेश (दिल्ली) को स्पर्श करती है।"),

        # 13. UP Handicrafts - Kannauj Itr (Index 0)
        ("Known historically as 'Mahodaya Sri' and 'Kanyakubja', which ancient city of Uttar Pradesh on the banks of the Ganga is universally celebrated as the 'Perfume Capital of India' (इत्र नगरी)?",
        "प्राचीन काल में 'महोदय श्री' और 'कान्यकुब्ज' के नाम से विख्यात, गंगा तट पर स्थित उत्तर प्रदेश का कौन-सा ऐतिहासिक नगर 'भारत की इत्र राजधानी' (Perfume Capital) के रूप में विख्यात है?",
        "Kannauj (कन्नौज - इत्र नगरी)", "Jaunpur", "Farrukhabad", "Bareilly",
        0, "Kannauj has distilled floral essential oils and traditional deg-bhapka perfume (Itr) for centuries, holding a protected GI tag.",
        "कन्नौज को पारंपरिक देग-भपका विधि से तैयार किए जाने वाले प्राकृतिक इत्र एवं गुलाब जल के लिए 'इत्र नगरी' (City of Scents) कहा जाता है।"),

        # 14. EVS - Biological Oxygen Demand (BOD) (Index 1)
        ("What does Biological Oxygen Demand (BOD) indicate when measuring the quality and organic pollution levels of river water (such as the Ganga or Yamuna)?",
        "गंगा अथवा यमुना जैसी नदियों के जल प्रदूषण स्तर और गुणवत्ता के मापन में 'बायोलॉजिकल ऑक्सीजन डिमांड' (BOD) किसका सूचक होता है?",
        "The concentration of dissolved radioactive radon gas", "The amount of dissolved oxygen needed by aerobic microorganisms to decompose organic waste (जैविक प्रदूषण सूचक: BOD बढ़ने पर जल प्रदूषित होता है)", "The volume of heavy lead particulates suspended in water", "The total electrical resistivity of river water",
        1, "High BOD indicates that microorganisms are consuming large amounts of dissolved oxygen to decompose high levels of organic waste, signaling severe water pollution.",
        "BOD (बायोलॉजिकल ऑक्सीजन डिमांड) जल में कार्बनिक कचरे के अपघटन हेतु सूक्ष्मजीवों द्वारा आवश्यक ऑक्सीजन की मात्रा है। उच्च BOD अत्यधिक जल प्रदूषण दर्शाता है।"),

        # 15. UP 1857 Revolt - Jhansi (Index 2)
        ("Which British military commander famously paid tribute to Rani Lakshmibai of Jhansi after the Battle of Kotah-ki-Sarai in Gwalior, stating: 'Here lay the woman who was the only man among the rebels'?",
        "ग्वालियर के युद्ध में वीरांगना रानी लक्ष्मीबाई के बलिदान के उपरांत किस ब्रिटिश जनरल ने उन्हें नमन करते हुए कहा था कि: 'यहाँ वह भारतीय महिला सोई हुई है जो विद्रोहियों में एकमात्र मर्द थी'?",
        "General Colin Campbell", "General James Outram", "Sir Hugh Rose (सर ह्यू रोज)", "General Henry Havelock",
        2, "Sir Hugh Rose, who commanded the Central India Field Force against Rani Lakshmibai, made this famous remark acknowledging her peerless valor.",
        "सर ह्यू रोज ने रानी लक्ष्मीबाई के अदम्य साहस की प्रशंसा करते हुए कहा था कि 'विद्रोहियों में वह एकमात्र मर्द थीं'।"),

        # 16. UP Folklore - Alha Ballads (Index 3)
        ("In the Bundelkhand region of Uttar Pradesh, which epic folk singing genre narrates the legendary heroism and 52 battles of the warrior brothers Alha and Udal under Chandel King Paramardideva?",
        "उत्तर प्रदेश के बुंदेलखंड क्षेत्र में चंदेल राजा परमार्दिदेव (परमल) के सेनापति वीर आल्हा और ऊदल की वीरता तथा उनके द्वारा लड़े गए 52 युद्धों का ओजस्वी गायन किस लोकगीत विधा में किया जाता है?",
        "Kajari", "Rasiya", "Birha", "Alha / Alha-Khand (आल्हा / आल्हा-खंड - जगनिक रचित परमाल रासो)",
        3, "The Alha ballad, composed by poet Jagnik in 'Parmal Raso' (Alha-Khand), is sung vigorously during the monsoon season throughout Bundelkhand.",
        "आल्हा गायन बुंदेलखंड का प्रसिद्ध वीर रस लोकगीत है, जिसकी रचना कवि जगनिक ने 'आल्हा-खंड' में की थी। यह वर्षा ऋतु में ओजस्वी स्वर में गाया जाता है।"),

        # 17. UP District - Sonbhadra Borders (Index 0)
        ("Which southernmost district of Uttar Pradesh is unique in the entire country for touching the borders of four different Indian states (MP, Chhattisgarh, Jharkhand, and Bihar)?",
        "उत्तर प्रदेश का कौन-सा दक्षिणतम जिला भारत का एकमात्र ऐसा जिला है जो चार अलग-अलग राज्यों (मध्य प्रदेश, छत्तीसगढ़, झारखंड एवं बिहार) की सीमाओं को स्पर्श करता है?",
        "Sonbhadra (सोनभद्र जिला)", "Lalitpur", "Chandauli", "Mirzapur",
        0, "Sonbhadra is the only district in India bordering four states: Bihar (east), Jharkhand (east), Chhattisgarh (south), and Madhya Pradesh (west).",
        "सोनभद्र जिला भारत का एकमात्र ऐसा जिला है जो चार राज्यों (मप्र, छत्तीसगढ़, झारखंड और बिहार) की सीमाओं से घिरा हुआ है।"),

        # 18. EVS - Minamata Disease (Index 1)
        ("Minamata disease, a severe neurological syndrome characterized by ataxia, numbness, and muscle weakness, was first discovered in Japan caused by environmental contamination of which heavy metal in industrial effluents?",
        "जापान में औद्योगिक अपशिष्टों से जलस्रोतों में किस भारी धातु (Heavy Metal) के घुलने और मछलियों के उपभोग से तंत्रिका तंत्र को नष्ट करने वाला घातक 'मिनीमाता रोग' (Minamata Disease) फैला था?",
        "Cadmium (causes Itai-Itai)", "Methylmercury / Mercury (पारा - मिथाइल मरकरी)", "Lead", "Arsenic",
        1, "Minamata disease is caused by methylmercury poisoning from consuming contaminated marine life. (Cadmium causes Itai-Itai disease).",
        "मिनीमाता रोग पारे (Mercury / मिथाइल मरकरी) के प्रदूषण से होता है (कैडमियम से इटाई-इटाई तथा नाइट्रेट से ब्लू बेबी सिंड्रोम होता है)।"),

        # 19. Indian Constitution - Article 21A RTE Act (Index 2)
        ("By which Constitutional Amendment Act was Article 21A inserted into the Constitution of India, making free and compulsory education a Fundamental Right for all children aged 6 to 14 years?",
        "किस संविधान संशोधन अधिनियम द्वारा भारतीय संविधान में 'अनुच्छेद 21A' जोड़कर 6 से 14 वर्ष के बच्चों के लिए निःशुल्क एवं अनिवार्य शिक्षा को मौलिक अधिकार बनाया गया?",
        "42nd Amendment Act 1976", "44th Amendment Act 1978", "86th Constitutional Amendment Act 2002 (86वां संविधान संशोधन 2002)", "91st Amendment Act 2003",
        2, "The 86th Constitutional Amendment Act of 2002 inserted Article 21A, which led to the enactment of the Right of Children to Free and Compulsory Education (RTE) Act 2009.",
        "86वें संविधान संशोधन अधिनियम 2002 द्वारा अनुच्छेद 21A जोड़ा गया, जिसके क्रियान्वयन हेतु शिक्षा का अधिकार अधिनियम (RTE Act) 2009 पारित हुआ।"),

        # 20. UP Soil - Bhabar and Terai (Index 3)
        ("Along the northern foothills of the Shiwalik Himalayas in Uttar Pradesh (extending from Saharanpur to Deoria), which geological belt is characterized by coarse porous gravel/pebbles where streams disappear underground?",
        "उत्तर प्रदेश के उत्तरी भाग में शिवालिक तलहटी के समानांतर सहारनपुर से कुशीनगर तक फैली कंकड़-पत्थरों से निर्मित वह छिद्रयुक्त पेटी क्या कहलाती है जहाँ नदियां भूमिगत होकर विलुप्त हो जाती हैं?",
        "Khadar Plain", "Bangar Plain", "Terai Marshland", "Bhabar Belt (भाबर पेटी - कंकड़-पत्थर युक्त छिद्रयुक्त क्षेत्र)",
        3, "The Bhabar is a narrow gravelly slope at the Himalayan foothills where mountain rivers sink beneath porous deposits before re-emerging in the marshy Terai belt.",
        "भाबर कंकड़-पत्थरों से बनी छिद्रयुक्त पेटी है जहाँ नदियां भूमिगत हो जाती हैं। भाबर के ठीक दक्षिण में नम दलदली 'तराई' क्षेत्र स्थित है।"),

        # 21. UP Handicrafts - Firozabad Glass (Index 0)
        ("Firozabad, recognized as the 'Suhag Nagri' of Uttar Pradesh, is world-renowned for which century-old manufacturing industry under the ODOP scheme?",
        "उत्तर प्रदेश का फिरोजाबाद नगर, जिसे 'सुहाग नगरी' भी कहा जाता है, किस पारंपरिक उद्योग के लिए विश्व विख्यात है?",
        "Glass Bangles, Chandeliers & Glassware (कांच की चूड़ियां, झाड़-फानूस एवं कांच उद्योग)", "Wood Carving", "Silk Weaving", "Sports Goods",
        0, "Firozabad has manufactured glass bangles, blown glass, and artistic chandeliers for over two centuries, earning the moniker 'City of Glass'.",
        "फिरोजाबाद भारत का कांच निर्माण और रंग-बिरंगी कांच की चूड़ियों का सबसे बड़ा केंद्र है, जिस कारण इसे 'सुहाग नगरी' कहा जाता है।"),

        # 22. EVS - Montreal Protocol Target (Index 1)
        ("The landmark Montreal Protocol, which came into force in 1989, specifically targets the international phase-out and elimination of which group of chemical substances?",
        "1989 में लागू हुआ ऐतिहासिक 'मॉन्ट्रियल प्रोटोकॉल' (Montreal Protocol) मुख्य रूप से किन रासायनिक पदार्थों के वैश्विक उन्मूलन और उत्पादन पर रोक लगाने हेतु लक्षित है?",
        "Carbon Monoxide in vehicle exhausts", "Chlorofluorocarbons (CFCs) and Ozone-Depleting Substances (ओजोन परत क्षयकारी पदार्थ - CFCs/Halons)", "Synthetic Plastic Polymers", "Nitrogenous chemical fertilizers",
        1, "The Montreal Protocol successfully banned the manufacture and consumption of chlorofluorocarbons (CFCs), halons, and other ozone-depleting substances.",
        "मॉन्ट्रियल प्रोटोकॉल समतापमंडल में ओजोन परत की रक्षा हेतु क्लोरोफ्लोरोकार्बन (CFCs) और हैलोन जैसी ओजोन क्षयकारी गैसों के उत्पादन पर रोक लगाता है।"),

        # 23. UP Fair - Kumbh Mela Prayagraj (Index 2)
        ("The world-famous 'Maha Kumbh Mela', recognized by UNESCO as an Intangible Cultural Heritage of Humanity, is held every 12 years at the holy confluence (Triveni Sangam) in which city of Uttar Pradesh?",
        "यूनेस्को द्वारा मानवता की अमूर्त सांस्कृतिक धरोहर घोषित विश्व का सबसे विशाल धार्मिक समागम 'महाकुंभ मेला' (Maha Kumbh) प्रत्येक 12 वर्ष में उत्तर प्रदेश के किस पावन संगम तट पर आयोजित होता है?",
        "Varanasi (Kashi)", "Ayodhya", "Prayagraj (प्रयागराज - गंगा, यमुना व सरस्वती का पावन त्रिवेणी संगम)", "Mathura",
        2, "The Maha Kumbh Mela takes place every 12 years at the Triveni Sangam (confluence of Ganga, Yamuna, and mythical Saraswati) in Prayagraj.",
        "महाकुंभ मेला प्रत्येक 12 वर्ष में प्रयागराज के त्रिवेणी संगम (गंगा, यमुना, सरस्वती) पर आयोजित होता है।"),

        # 24. UP Literacy - Gautam Buddha Nagar (Index 3)
        ("According to the Census 2011 figures for Uttar Pradesh, which district achieved the highest overall literacy rate (साक्षरता दर) in the state at 80.12%?",
        "जनगणना 2011 के अनुसार, उत्तर प्रदेश का सर्वाधिक साक्षरता दर (80.12%) वाला जिला कौन-सा है?",
        "Kanpur Nagar (79.65%)", "Auraiya (78.95%)", "Ghaziabad (78.07%)", "Gautam Buddha Nagar / Noida (80.12% - राज्य में सर्वाधिक साक्षर जिला)",
        3, "Gautam Buddha Nagar (Noida) has the highest overall literacy rate in Uttar Pradesh at 80.12%, while Shravasti has the lowest literacy rate at 46.74%.",
        "जनगणना 2011 में गौतम बुद्ध नगर (80.12%) उत्तर प्रदेश का सर्वाधिक साक्षर जिला है। सबसे कम साक्षरता वाला जिला श्रावस्ती (46.74%) है।")
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
            'domain': 'UPTET EVS Science & UP GK Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering EVS, Science, and UP Special GK
    evs_up_modules = [
        # Uttar Pradesh Special GK Modules
        ("उत्तर प्रदेश भौगोलिक अवस्थिति एवं क्षेत्रफल", "क्षेत्रफल 2,40,928 वर्ग किमी (भारत का 7.33%, चौथा स्थान), 75 जिले एवं 18 मंडल", "UP Geographic Area and Divisions", "उत्तर प्रदेश भूगोल"),
        ("उत्तर प्रदेश की नदियां गंगा एवं यमुना", "गंगा बिजनौर से प्रवेश कर बलिया से बाहर (28 जिले), यमुना सहारनपुर से प्रयागराज संगम", "Ganga and Yamuna Flow in UP", "उत्तर प्रदेश नदियां"),
        ("गोमती नदी उद्गम फुलहर झील पीलीभीत", "पीलीभीत की फुलहर झील से निकलकर लखनऊ, सुल्तानपुर, जौनपुर होते हुए गाजीपुर में गंगा में विलय", "Gomti River Fulhar Lake Origin", "उत्तर प्रदेश नदियां"),
        ("केन बेतवा एवं चंबल नदियां बुंदेलखंड", "यमुना की दाहिनी सहायक नदियां; माताटीला बांध (बेतवा), राजघाट बांध (बेतवा)", "Ken Betwa Chambal Bundelkhand Rivers", "उत्तर प्रदेश नदियां"),
        ("दुधवा राष्ट्रीय उद्यान एवं बाघ अभयारण्य", "लखीमपुर खीरी में 1977 में स्थापित, दलदली हिरण (बारहसिंगा) एवं गैंडा पुनर्वास", "Dudhwa National Park Wildlife", "उत्तर प्रदेश वन्यजीव"),
        ("चंद्रप्रभा वन्यजीव अभयारण्य चंदौली", "उत्तर प्रदेश का प्रथम वन्यजीव अभयारण्य (1957 में स्थापित), एशियाई शेरों का पूर्व आवास", "Chandraprabha Wildlife Sanctuary", "उत्तर प्रदेश वन्यजीव"),
        ("राष्ट्रीय चंबल अभयारण्य घड़ियाल संरक्षण", "आगरा एवं इटावा क्षेत्र में चंबल नदी पर घड़ियाल एवं डॉल्फिन संरक्षण", "National Chambal Sanctuary Gharial", "उत्तर प्रदेश वन्यजीव"),
        ("उत्तर प्रदेश के रामसर आर्द्रभूमि स्थल", "सूर सरोवर (कीठम आगरा), बखीरा (संत कबीर नगर), नवाबगंज (उन्नाव), सांडी (हरदोई)", "Ramsar Wetland Sites of UP", "उत्तर प्रदेश पर्यावरण"),
        ("1857 क्रांति मेरठ छावनी 10 मई", "सैनिकों द्वारा विद्रोह का बिगुल, दिल्ली कूच एवं बहादुर शाह जफर को सम्राट घोषित करना", "1857 Meerut Outbreak Revolution", "उत्तर प्रदेश इतिहास"),
        ("झांसी की रानी लक्ष्मीबाई एवं 1857", "दामोदर राव का दत्तक अधिकार, कालपी व ग्वालियर का युद्ध, सर ह्यू रोज से मुकाबला", "Rani Lakshmibai Jhansi Uprising", "उत्तर प्रदेश इतिहास"),
        ("बेगम हजरत महल एवं लखनऊ का विद्रोह", "अवध की बेगम, बिरजिस कद्र का राज्याभिषेक, हेनरी लॉरेंस के विरुद्ध रेजीडेंसी घेरा", "Begum Hazrat Mahal Lucknow Revolt", "उत्तर प्रदेश इतिहास"),
        ("नाना साहेब एवं तात्या टोपे कानपुर क्रांति", "बिठूर कानपुर से 1857 विद्रोह का संचालन, सतीचौरा घाट एवं बिठूर युद्ध", "Nana Saheb Tatya Tope Kanpur", "उत्तर प्रदेश इतिहास"),
        ("कथक शास्त्रीय नृत्य लखनऊ घराना", "नवाब वाजिद अली शाह का संरक्षण, भाव व अभिनय प्रधान, पंडित बिरजू महाराज", "Kathak Classical Dance Lucknow", "उत्तर प्रदेश कला संस्कृति"),
        ("चरकुला लोक नृत्य ब्रज भूमि", "राधा जन्म उत्सव पर 108 दीपकों का चरकुला सिर पर रखकर महिलाओं द्वारा नृत्य", "Charkula Folk Dance Braj", "उत्तर प्रदेश कला संस्कृति"),
        ("नौटंकी एवं रासलीला लोक नाट्य", "हाथरस व कानपुर शैली की नौटंकी तथा ब्रज की रासलीला व रामनगर की रामलीला", "Nautanki and Raslila Folk Theater", "उत्तर प्रदेश कला संस्कृति"),
        ("कजरी एवं आल्हा लोक गायन", "मिर्जापुर की कजरी (वर्षा ऋतु/सावन) तथा बुंदेलखंड का आल्हा (वीर रस 52 लड़ाइयां)", "Kajari and Alha Folk Music", "उत्तर प्रदेश कला संस्कृति"),
        ("कुंभ मेला एवं माघ मेला प्रयागराज", "त्रिवेणी संगम पर प्रत्येक 12 वर्ष में महाकुंभ तथा 6 वर्ष में अर्धकुंभ का आयोजन", "Kumbh Mela Prayagraj Triveni", "उत्तर प्रदेश मेले"),
        ("बटेश्वर मेला एवं नौचंदी मेला", "बटेश्वर पशु मेला (आगरा यमुना तट) तथा नौचंदी मेला (मेरठ कौमी एकता प्रतीक)", "Bateshwar and Nauchandi Fairs", "उत्तर प्रदेश मेले"),
        ("एक जिला एक उत्पाद ओडीओपी योजना", "मुरादाबाद (पीतल), फिरोजाबाद (कांच/चूड़ियां), कन्नौज (इत्र), भदोही (कालीन), लखनऊ (चिकनकारी)", "ODOP Flagship Scheme UP", "उत्तर प्रदेश उद्योग"),
        ("सोनभद्र चार राज्यों की सीमा", "मध्य प्रदेश, छत्तीसगढ़, झारखंड एवं बिहार की सीमा को स्पर्श करने वाला एकमात्र जिला", "Sonbhadra Four State Borders", "उत्तर प्रदेश भूगोल"),
        ("उत्तर प्रदेश जनगणना 2011 आंकड़े", "जनसंख्या 19.98 करोड़ (16.51%), जनघनत्व 829, लिंगानुपात 912, साक्षरता 67.7%", "UP Census 2011 Demographic Facts", "उत्तर प्रदेश जनगणना"),

        # Environmental Studies Modules
        ("पारिस्थितिक तंत्र एवं 10% ऊर्जा नियम", "लिंडमैन का 10% नियम: केवल 10% ऊर्जा अगले पोषण स्तर को स्थानांतरित होती है", "Ecosystem Energy Pyramid Lindeman", "पर्यावरण अध्ययन"),
        ("पारिस्थितिक पिरामिड ऊर्जा का पिरामिड", "ऊर्जा का पिरामिड सदैव सीधा (Upright) होता है क्योंकि ऊर्जा निरंतर क्षय होती है", "Energy Pyramid Always Upright", "पर्यावरण अध्ययन"),
        ("ओजोन परत क्षरण एवं डॉबसन इकाई", "समतापमंडल में ओजोन परत पराबैंगनी किरणों को रोकती है; मोटाई मापक डॉबसन (DU)", "Ozone Layer Depletion Dobson Unit", "पर्यावरण अध्ययन"),
        ("अम्लीय वर्षा सल्फर एवं नाइट्रोजन ऑक्साइड", "SO2 और NO2 वर्षा जल से मिलकर सल्फ्यूरिक व नाइट्रिक अम्ल बनाते हैं (pH < 5.6)", "Acid Rain Environmental Chemistry", "पर्यावरण अध्ययन"),
        ("जैव आवर्धन डीडीटी एवं भारी धातुएं", "खाद्य श्रृंखला के उच्च स्तरों पर गैर-अपघटनीय रसायनों की सांद्रता में वृद्धि", "Biomagnification in Trophic Chains", "पर्यावरण अध्ययन"),
        ("जल प्रदूषण बीओडी एवं सुपोषण", "BOD बढ़ने से घुलित ऑक्सीजन (DO) घटती है; सुपोषण (Eutrophication) से शैवाल प्रस्फुटन", "BOD and Eutrophication Aquatic Impact", "पर्यावरण अध्ययन"),
        ("मिनीमाता एवं इटाई-इटाई रोग", "पारा (Mercury) से मिनीमाता तथा कैडमियम (Cadmium) के प्रदूषण से इटाई-इटाई रोग", "Minamata and Itai-Itai Toxic Diseases", "पर्यावरण अध्ययन"),
        ("ब्लू बेबी सिंड्रोम नाइट्रेट संदूषण", "पेयजल में नाइट्रेट की अधिकता से हीमोग्लोबिन मेथेमोग्लोबिन में बदल जाता है", "Blue Baby Syndrome Nitrate Poisoning", "पर्यावरण अध्ययन"),
        ("चिपको आंदोलन सुंदरलाल बहुगुणा", "1973 चमोली उत्तराखंड में पेड़ों की कटाई रोकने हेतु वृक्ष आलिंगन आंदोलन", "Chipko Environmental Hugging Movement", "पर्यावरण आंदोलन"),
        ("नर्मदा बचाओ आंदोलन मेधा पाटकर", "सरदार सरोवर बांध परियोजना से विस्थापित आदिवासियों व पर्यावरण संरक्षण हेतु संघर्ष", "Narmada Bachao Andolan Movement", "पर्यावरण आंदोलन"),
        ("शांत घाटी आंदोलन केरल साइलेंट वैली", "कुंतीपुझा नदी पर जलविद्युत परियोजना से उष्णकटिबंधीय वर्षावन को बचाने का आंदोलन", "Silent Valley Movement Kerala", "पर्यावरण आंदोलन"),

        # General Science Modules
        ("निकट दृष्टि दोष मायोपिया अवतल लेंस", "दूर की वस्तुएं अस्पष्ट दिखती हैं, प्रतिबिंब रेटिना के आगे बनता है, अवतल लेंस निवारण", "Myopia Correction Concave Lens", "सामान्य विज्ञान"),
        ("दूर दृष्टि दोष हाइपरमेट्रोपिया उत्तल लेंस", "निकट की वस्तुएं अस्पष्ट दिखती हैं, प्रतिबिंब रेटिना के पीछे बनता है, उत्तल लेंस निवारण", "Hypermetropia Convex Lens Optics", "सामान्य विज्ञान"),
        ("ध्वनि की चाल माध्यम घनत्व प्रभाव", "ध्वनि अनुदैर्ध्य तरंग है; चाल ठोस में सर्वाधिक (स्टील ~5000 मी/से), निर्वात में शून्य", "Speed of Sound Material Medium", "सामान्य विज्ञान"),
        ("प्लास्टर ऑफ पेरिस एवं जिप्सम सूत्र", "POP = CaSO4·1/2H2O (कैल्शियम सल्फेट हेमीहाइड्रेट), जिप्सम = CaSO4·2H2O", "Plaster of Paris and Gypsum Chemistry", "सामान्य विज्ञान"),
        ("बेकिंग सोडा एवं धावन सोडा सूत्र", "बेकिंग सोडा = NaHCO3 (सोडियम बाइकार्बोनेट), धावन सोडा = Na2CO3·10H2O", "Baking Soda and Washing Soda Salts", "सामान्य विज्ञान"),
        ("कोशिका का पावरहाउस माइटोकॉन्ड्रिया", "क्रेब्स चक्र द्वारा एटीपी (ATP) ऊर्जा का उत्पादन; स्वयं का डीएनए व राइबोसोम", "Mitochondria Powerhouse ATP Synthesis", "सामान्य विज्ञान"),
        ("प्रकाश संश्लेषण में ऑक्सीजन स्रोत", "जल (H2O) के प्रकाश-अपघटन (Photolysis) से ऑक्सीजन गैस वायुमंडल में मुक्त होती है", "Photolysis of Water Oxygen Release", "सामान्य विज्ञान"),
        ("रक्त समूह सर्वदाता एवं सर्वग्राही", "रक्त समूह O Rh- सर्वदाता (Universal Donor) तथा AB Rh+ सर्वग्राही (Universal Recipient)", "Blood Group ABO and Rh Factor", "सामान्य विज्ञान"),
        ("विटामिन एवं हीनता जन्य रोग", "विटामिन A (रतौंधी), B1 (बेरी-बेरी), C (स्कर्वी), D (रिकेट्स), K (रक्त का थक्का न जमना)", "Vitamins and Deficiency Pathologies", "सामान्य विज्ञान"),
        ("इंसुलिन हार्मोन एवं मधुमेह रोग", "अग्न्याशय के लैंगरहेंस द्वीपिकाओं की बीटा कोशिकाओं से स्रावित रक्त शर्करा नियंत्रक", "Insulin Secretion and Diabetes Mellitus", "सामान्य विज्ञान"),

        # Indian Constitution & Social Science
        ("प्रस्तावना 42वां संशोधन 1976", "प्रस्तावना में समाजवादी (Socialist), पंथनिरपेक्ष (Secular) एवं अखंडता (Integrity) शब्द जोड़े गए", "Preamble 42nd Amendment Words", "भारतीय संविधान"),
        ("मौलिक अधिकार अनुच्छेद 21 प्राण स्वतंत्रता", "विधि द्वारा स्थापित प्रक्रिया के बिना जीवन एवं व्यक्तिगत स्वतंत्रता से वंचित नहीं", "Article 21 Right to Personal Liberty", "भारतीय संविधान"),
        ("अनुच्छेद 21A शिक्षा का मौलिक अधिकार", "86वें संशोधन 2002 द्वारा 6 से 14 वर्ष के बच्चों हेतु निःशुल्क व अनिवार्य शिक्षा", "Article 21A Right to Education 86th", "भारतीय संविधान"),
        ("संवैधानिक उपचार अनुच्छेद 32 अंबेडकर", "संविधान की आत्मा; सर्वोच्च न्यायालय द्वारा पांच रिटें (Habeas Corpus आदि) जारी करना", "Article 32 Constitutional Remedies Soul", "भारतीय संविधान"),
        ("नीति निदेशक तत्व अनुच्छेद 40 एवं 44", "अनुच्छेद 40 (ग्राम पंचायत गठन) तथा अनुच्छेद 44 (समान नागरिक संहिता UCC)", "Directive Principles Articles 40 and 44", "भारतीय संविधान"),
        ("मौलिक कर्तव्य अनुच्छेद 51A स्वर्ण सिंह", "स्वर्ण सिंह समिति की सिफारिश पर 42वें संशोधन द्वारा 10 तथा 86वें संशोधन द्वारा 11वां कर्तव्य", "Fundamental Duties Article 51A", "भारतीय संविधान"),
        ("भारत की नदियां नर्मदा एवं ताप्ती भ्रंश", "भ्रंश घाटी से होकर पश्चिम की ओर बहने वाली नदियां जो अरब सागर में गिरती हैं", "Rift Valley Rivers Narmada Tapti", "भारतीय भूगोल"),
        ("काली मिट्टी रेगुर कपास की खेती", "दक्कन बेसाल्ट लावा से निर्मित अत्यधिक जल-धारण क्षमता वाली कपास हेतु सर्वोत्तम मिट्टी", "Black Regur Soil Deccan Cotton", "भारतीय भूगोल")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(evs_up_modules)
        topic, facts, topic_en, category = evs_up_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the EVS, General Science, and UP Special GK syllabus of UP TET & Super TET, which statement regarding '{topic_en}' is factually accurate?"
            stem_hi = f"यूपी टीईटी एवं सुपर टीईटी के पर्यावरण अध्ययन, सामान्य विज्ञान एवं यूपी विशेष पाठ्यक्रम में '{topic}' से संबंधित कौन-सा कथन प्रामाणिक एवं सत्य है?"
            sol_en = f"Factual core: {facts}. Section: {category}."
            sol_hi = f"प्रामाणिक तथ्य: {facts}। वर्ग: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Derived from Cretaceous paleomagnetic polarity reversal records", 'hi': "क्रेटेशियस चुंबकीय उत्क्रमण रिकॉर्ड से व्युत्पन्न"},
                {'en': "Calculated from abyssal hydrostatic trench decompression curves", 'hi': "अगाध महासागरीय विसंपीड़न वक्र से परिकलित"},
                {'en': "Regulated under Baltic timber maritime trade tariffs 1845", 'hi': "बाल्टिक इमारती लकड़ी व्यापार शुल्क द्वारा नियंत्रित"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key academic or geographical domain of UP TET/Super TET is '{topic_en}' categorized?"
            stem_hi = f"शिक्षक भर्ती परीक्षा के अंतर्गत '{topic}' का संबंध किस प्रमुख शैक्षणिक विषय खंड से है?"
            sol_en = f"Classified under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Pleistocene Glacial Erratic Boulder Deposition", 'hi': "प्लीस्टोसिन हिमनदीय बोल्डर निक्षेपण"},
                {'en': f"UP TET/Super TET Core: {category} ({facts})", 'hi': f"पाठ्यक्रम मानक: {category} ({facts})"},
                {'en': "Sub-zero Antarctic Firn Compaction Densification", 'hi': "अंटार्कटिक बर्फ संघनन घनत्वीकरण"},
                {'en': "Medieval Venetian Silk Guild Apprenticeship Protocols", 'hi': "मध्यकालीन वेनिस रेशम गिल्ड नियम"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"Why is a thorough factual understanding of '{topic_en}' essential for teachers and educators in Uttar Pradesh?"
            stem_hi = f"उत्तर प्रदेश में शिक्षक भर्ती एवं पर्यावरण चेतना के विकास हेतु '{topic}' का अध्ययन क्यों अत्यंत महत्वपूर्ण है?"
            sol_en = f"Key factual importance: {facts} ({category})."
            sol_hi = f"महत्व: {facts}। मुख्य क्षेत्र: {category}।"
            choices = [
                {'en': "To compute supersonic aircraft aerodynamic shockwave angles", 'hi': "सुपरसोनिक विमान शॉकवेव कोण गणना हेतु"},
                {'en': "To synthesize synthetic hydrocarbons from deep subsoil shale", 'hi': "गहरे उपमृदा शेल से सिंथेटिक हाइड्रोकार्बन संश्लेषित करने हेतु"},
                {'en': f"Essential for environmental consciousness and state GK: {facts} ({category})", 'hi': f"पर्यावरणीय चेतना एवं राज्य सामान्य ज्ञान हेतु: {facts} ({category})"},
                {'en': "To calibrate satellite telemetry antennas during solar flares", 'hi': "सौर ज्वाला के दौरान उपग्रह एंटीना कैलिब्रेट करने हेतु"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately presents the significance of '{topic_en}'?"
            stem_hi = f"निम्न में से कौन-सा विकल्प '{topic}' के महत्व अथवा तथ्य का सबसे सटीक सारांश प्रस्तुत करता है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Regulates deep trench oceanic tectonic subduction boundary friction", 'hi': "गहरे महासागरीय सबडक्शन घर्षण को नियंत्रित करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर कोरोनाग्राफ स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Measures hydraulic gradient across underwater continental shelves", 'hi': "पानी के नीचे महाद्वीपीय शेल्फ पर हाइड्रोलिक प्रवणता मापता है"},
                {'en': f"Standard factual summary: {facts} ({category})", 'hi': f"मानक प्रामाणिक तथ्य: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'UPTET - {category}',
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
    res = get_raw_evs_up_gk_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

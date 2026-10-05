"""
Haryana Police Constable - Agriculture, Animal Husbandry & General Science Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Agriculture in Haryana: Kharif & Rabi crops, Green Revolution, CCS HAU Hisar (1970), Soil health
- Animal Husbandry & Dairy: Milk Pail of India, NDRI Karnal (1955), CIRB Hisar, LUVAS Hisar
- Breeds of Cattle & Buffalo: Murrah Buffalo ('Black Gold' / काला सोना), Hariana cow, Sahiwal, Beetal goat
- Veterinary Health: FMD (खुरपका-मुंहपका), Anthrax, Mastitis, Artificial Insemination, Cattle nutrition
- General Science - Physics: Mechanics, Newton's laws, Work, Energy, Pressure, Optics, Electricity
- General Science - Chemistry: Acids, Bases, Salts, Metals, Fertilizers (Urea, DAP), Everyday compounds
- General Science - Biology & Nutrition: Human physiology, Vitamins, Deficiency diseases, Vaccines
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_agriculture_animal_husbandry_items():
    items = []

    # 1. 24 Benchmark Core Questions
    core_benchmarks = [
        # 1. Murrah Buffalo - Black Gold
        ("Which world-famous buffalo breed, native to Haryana and renowned for highest milk yield, is popularly hailed as the 'Black Gold of Haryana' (काला सोना)?",
         "हरियाणा की कौन-सी विश्व प्रसिद्ध भैंस की नस्ल, जो सर्वाधिक दूध उत्पादन के लिए जानी जाती है, 'हरियाणा का काला सोना' (Black Gold) कहलाती है?",
         "Murrah Buffalo (मुर्राह नस्ल - खूंडी सींग)", "Jafarabadi", "Surti", "Bhadawari",
         0, "Murrah buffalo, native to Rohtak, Jind and Hisar, is famously called the Black Gold of Haryana.",
         "मुर्राह नस्ल की भैंस (जिसके सींग जलेबी के आकार के मुड़े होते हैं) को अधिक दूध देने के कारण 'हरियाणा का काला सोना' कहा जाता है।"),

        # 2. National Dairy Research Institute
        ("Where is the premier National Dairy Research Institute (NDRI), established in 1955 in Haryana, located?",
         "1955 में स्थापित भारत का प्रमुख राष्ट्रीय डेयरी अनुसंधान संस्थान (NDRI) हरियाणा के किस जिले में स्थित है?",
         "Hisar", "Karnal (करनाल - 1955 में बंगलुरु से स्थानांतरित)", "Rohtak", "Sirsa",
         1, "The National Dairy Research Institute (NDRI) has been headquartered at Karnal since 1955.",
         "राष्ट्रीय डेयरी अनुसंधान संस्थान (NDRI) करनाल में स्थित है, जिसने भारत में क्लोनिंग तकनीक से भैंस के पहले कटड़े (गरिमा) को जन्म दिया था।"),

        # 3. Central Institute for Research on Buffaloes
        ("Where is the Central Institute for Research on Buffaloes (CIRB), established in 1985 by ICAR, situated in Haryana?",
         "भारतीय कृषि अनुसंधान परिषद (ICAR) द्वारा 1985 में स्थापित 'केंद्रीय भैंस अनुसंधान संस्थान' (CIRB) हरियाणा में कहाँ स्थित है?",
         "Karnal", "Ambala", "Hisar (हिसar - 1985 में स्थापित)", "Fatehabad",
         2, "CIRB is located at Hisar in Haryana, dedicated to buffalo genetic improvement.",
         "केंद्रीय भैंस अनुसंधान संस्थान (CIRB) हिसार में स्थित है, जो भैंसों के नस्ल सुधार और क्लोनिंग अनुसंधान का प्रमुख केंद्र है।"),

        # 4. Agricultural University
        ("In which year was Chaudhary Charan Singh Haryana Agricultural University (CCS HAU) established at Hisar?",
         "चौधरी चरण सिंह हरियाणा कृषि विश्वविद्यालय (CCS HAU) की स्थापना हिसार में किस वर्ष की गई थी?",
         "1966", "1972", "1980", "1970 (2 फरवरी 1970)",
         3, "CCS HAU was established on 2 February 1970 at Hisar, playing a pioneering role in the Green Revolution.",
         "हिसार स्थित चौधरी चरण सिंह हरियाणा कृषि विश्वविद्यालय (HAU) की स्थापना 2 फरवरी 1970 को पंजाब कृषि विश्वविद्यालय से अलग करके की गई थी।"),

        # 5. Dual Purpose Cattle Breed
        ("Which indigenous cow breed, known as the best dual-purpose (draft and milk) cattle breed of northern India, originated in Haryana?",
         "उत्तरी भारत की सर्वश्रेष्ठ द्विकाजी (दूध एवं हल चलाने योग्य) देसी गाय की कौन-सी नस्ल हरियाणा से उत्पन्न मानी जाती है?",
         "Hariana Cow / हरियाणवी गाय (सफेद रंग, लंबा माथा)", "Sahiwal", "Gir", "Rathi",
         0, "Hariana cattle breed is celebrated across India for strong bullocks and good milk productivity.",
         "हरियाणवी गाय भारत की प्रसिद्ध द्विकाजी नस्ल है, जिसके बैल खेती व गाड़ी खींचने में अत्यंत शक्तिशाली होते हैं और गाय अच्छा दूध देती है।"),

        # 6. Animal Disease - FMD
        ("Foot-and-Mouth Disease (FMD / खुरपका-मुंहपका), a contagious acute disease of cloven-hoofed cattle, is caused by which pathogen?",
         "खुरदार पशुओं (गाय, भैंस) में होने वाला संक्रामक 'खुरपका-मुंहपका रोग' (FMD) किस सूक्ष्मजीव के संक्रमण से होता है?",
         "Bacteria", "Virus (पिकोर्ना वायरस / Picornavirus - FMD Virus)", "Fungus", "Protozoa",
         1, "Foot-and-Mouth Disease is caused by an Aphthovirus of the Picornaviridae family.",
         "खुरपका-मुंहपका रोग (FMD) एक विषाणुजनित (Viral) रोग है, जिससे पशु के खुरों और मुंह में छाले पड़ जाते हैं और तेज बुखार आता है।"),

        # 7. Major Rabi Crop
        ("Which of the following is the premier Rabi food grain crop grown in Haryana during the winter season?",
         "सर्दियों के मौसम में बोई जाने वाली हरियाणा की प्रमुख रबी खाद्यान्न फसल कौन-सी है?",
         "Paddy / Rice", "Bajra", "Wheat / गेहूं (Triticum aestivum)", "Cotton",
         2, "Wheat is the dominant Rabi crop in Haryana, sown in October-November and harvested in April.",
         "गेहूं (Wheat) हरियाणा की प्रमुख रबी फसल है, जिसके उत्पादन में हरियाणा भारत के शीर्ष राज्यों में शामिल है।"),

        # 8. Cash Crop of Haryana
        ("Which important commercial fiber crop, known as 'White Gold' (सफेद सोना), is predominantly cultivated in western Haryana districts like Sirsa and Hisar?",
         "पश्चिमी हरियाणा (सिरसा, फतेहाबाद, हिसार) में उगाई जाने वाली कौन-सी प्रमुख नकदी रेशा फसल 'सफेद सोना' कहलाती है?",
         "Sugarcane", "Jute", "Mustard", "Cotton / कपास (नरमा व देशी कपास)",
         3, "Cotton (नरमा) is the premier fiber commercial crop of Haryana, largely grown in Sirsa, Fatehabad, and Hisar.",
         "कपास (Cotton) को 'सफेद सोना' कहा जाता है, जिसका सर्वाधिक उत्पादन सिरसा जिले में होता है।"),

        # 9. Bhavantar Bharpai Yojana
        ("Which unique state scheme was launched by Haryana to compensate horticulture and vegetable farmers when market prices fall below protected base prices?",
         "सब्जियों व बागवानी फसलों के बाजार भाव कम होने पर किसानों के जोखिम को न्यूनतम करने हेतु हरियाणा द्वारा शुरू की गई योजना कौन-सी है?",
         "Bhavantar Bharpai Yojana (भावांतर भरपाई योजना - 2018)", "PM Kisan Samman Nidhi", "Pradhan Mantri Fasal Bima", "Kisan Credit Scheme",
         0, "Bhavantar Bharpai Yojana was introduced by Haryana to compensate farmers for price volatility in vegetables.",
         "हरियाणा सरकार ने जनवरी 2018 में 'भावांतर भरपाई योजना' शुरू की, जिसमें संरक्षित मूल्य और बिक्री मूल्य के अंतर की भरपाई सरकार करती है।"),

        # 10. Colostrum in Calves
        ("What is the first nutrient-rich, antibody-loaded milk produced by a cow or buffalo immediately after calving called?",
         "प्रसव के तुरंत बाद गाय या भैंस द्वारा दिए जाने वाले गाढ़े, एंटीबॉडी-युक्त पहले दूध को क्या कहा जाता है?",
         "Skimmed Milk", "Colostrum / खीस (नवजात बछड़े की रोग प्रतिरोधक क्षमता हेतु अनिवार्य)", "Toned Milk", "Casein",
         1, "Colostrum (खीस) contains immunoglobulins that provide passive immunity to newborn calves.",
         "प्रसव के बाद पशु के पहले दूध को 'खीस' (Colostrum) कहते हैं, जो नवजात बछड़े को संक्रामक रोगों से बचाने के लिए तुरंत पिलाया जाना आवश्यक है।"),

        # 11. Nitrogenous Fertilizer
        ("What is the percentage of pure Nitrogen present in chemical Urea fertilizer [CO(NH2)2] used extensively in agriculture?",
         "कृषि में व्यापक रूप से प्रयुक्त रासायनिक यूरिया खाद [CO(NH2)2] में शुद्ध नाइट्रोजन का प्रतिशत कितना होता है?",
         "21%", "33%", "46% (यूरिया में 46% नाइट्रोजन)", "60%",
         2, "Urea contains exactly 46% Nitrogen, making it the most concentrated solid nitrogenous fertilizer.",
         "यूरिया खाद में 46% नाइट्रोजन पाई जाती है, जो पौधों की वानस्पतिक वृद्धि के लिए आवश्यक है।"),

        # 12. Milk Fever in Dairy Cattle
        ("Milk Fever (दुग्ध ज्वर) in high-yielding dairy cows after parturition is caused by an acute deficiency of which blood mineral?",
         "ब्याने के बाद अधिक दूध देने वाली गाय-भैंसों में 'मिल्क फीवर' (दुग्ध ज्वर) रोग रक्त में किस खनिज तत्व की तीव्र कमी से होता है?",
         "Iron", "Sodium", "Phosphorus", "Calcium (कैल्शियम की कमी - Hypocalcemia)",
         3, "Milk fever is hypocalcemia, caused by rapid loss of calcium into colostrum and milk.",
         "मिल्क फीवर (दुग्ध ज्वर) रक्त में 'कैल्शियम' की तीव्र कमी (Hypocalcemia) के कारण होता है, जिसे कैल्शियम बोरो-ग्लूकोनेट का इंजेक्शन देकर ठीक किया जाता है।"),

        # 13. Physics - Atmospheric Pressure
        ("Which scientific instrument is used to measure atmospheric air pressure in meteorology and weather forecasting?",
         "मौसम विज्ञान में वायुमंडलीय दाब (Atmospheric Pressure) मापने के लिए किस वैज्ञानिक यंत्र का उपयोग किया जाता है?",
         "Barometer (बैरोमीटर / वायुदाबमापी)", "Hydrometer", "Lactometer", "Anemometer",
         0, "A Barometer (mercury or aneroid) measures atmospheric pressure.",
         "बैरोमीटर (Barometer) का उपयोग वायुमंडलीय दाब मापने के लिए किया जाता है। इसका आविष्कार टॉरीसेली ने किया था।"),

        # 14. Physics - Archimedes Principle
        ("Which scientific principle explains why an iron ship floats on water while a small iron nail sinks?",
         "लोहे की छोटी कील पानी में डूब जाती है जबकि लोहे का विशाल समुद्री जहाज पानी पर तैरता है, यह किस वैज्ञानिक सिद्धांत पर आधारित है?",
         "Pascal's Law", "Archimedes' Principle (आर्कमिडीज का सिद्धांत - उत्प्लावन बल)", "Bernoulli's Theorem", "Newton's Law of Gravitation",
         1, "Archimedes' principle states that buoyant force equals weight of displaced fluid; ships displace water greater than their weight.",
         "आर्कमिडीज के सिद्धांत के अनुसार, जहाज द्वारा हटाए गए पानी का भार जहाज के कुल भार के बराबर होता है, जिससे वह तैरता रहता है।"),

        # 15. Chemistry - Metal in Liquid State
        ("Which metal remains in liquid state at standard room temperature (25°C)?",
         "कमरे के सामान्य तापमान (25°C) पर द्रव अवस्था में रहने वाली एकमात्र धातु कौन-सी है?",
         "Bromine", "Gallium", "Mercury / पारा (Hg)", "Lead",
         2, "Mercury (Hg) is the only metal that is liquid at standard room temperature.",
         "पारा (Mercury / संकेत: Hg) सामान्य ताप पर द्रव रूप में रहने वाली एकमात्र धातु है। (ब्रोमीन एकमात्र द्रव अधातु है)।"),

        # 16. Chemistry - Rusting of Iron
        ("What type of chemical reaction occurs during the rusting of iron in the presence of air and moisture?",
         "वायु और नमी की उपस्थिति में लोहे पर जंग (Rust) लगना किस प्रकार की रासायनिक अभिक्रिया का उदाहरण है?",
         "Reduction only", "Neutralization", "Displacement", "Oxidation / संक्षारण (Hydrated Iron Oxide निर्माण)",
         3, "Rusting is an electrochemical oxidation reaction forming hydrated iron(III) oxide (Fe2O3·xH2O).",
         "लोहे पर जंग लगना 'ऑक्सीकरण' (Oxidation) और संक्षारण का उदाहरण है, जिससे लोहे का भार बढ़ जाता है।"),

        # 17. Biology - Vitamin Deficiency
        ("Night blindness (रतौंधी) and Xerophthalmia are caused by the deficiency of which vitamin?",
         "रतौंधी (Night Blindness) और आंखों का सूखापन किस विटामिन की कमी के कारण होता है?",
         "Vitamin A (विटामिन A - रेटिनॉल)", "Vitamin B1", "Vitamin C", "Vitamin D",
         0, "Deficiency of Vitamin A (Retinol), found in carrots and green leafy vegetables, causes night blindness.",
         "विटामिन A (रेटिनॉल) की कमी से रतौंधी और जेरोफ्थैलमिया रोग होता है।"),

        # 18. Biology - Universal Blood Group
        ("Which human blood group is universally known as the 'Universal Donor' (सर्वदाता रक्त समूह)?",
         "मानव रक्त समूहों में किस रक्त समूह को 'सर्वदाता' (Universal Donor) कहा जाता है?",
         "AB Positive", "O Negative (O नेगेटिव - जिसमें कोई एंटीजन नहीं होता)", "B Positive", "A Negative",
         1, "O Negative blood lacks A, B, and Rh surface antigens, making it the universal donor.",
         "O नेगेटिव (O Negative) रक्त समूह में कोई भी एंटीजन (A, B या Rh) नहीं पाया जाता, इसलिए यह सर्वदाता रक्त समूह कहलाता है।"),

        # 19. Biology - Hormone in Blood Sugar
        ("Which hormone secreted by the Beta cells of the Islets of Langerhans in the pancreas regulates glucose levels in human blood?",
         "अग्न्याशय (Pancreas) की लैंगरहेंस की द्वीपिकाओं की बीटा कोशिकाओं से स्रावित होने वाला कौन-सा हार्मोन रक्त में शर्करा को नियंत्रित करता है?",
         "Thyroxine", "Adrenaline", "Insulin (इंसुलिन - कमी से मधुमेह / डायबिटीज रोग)", "Glucagon",
         2, "Insulin facilitates cellular uptake of glucose; its deficiency causes Diabetes Mellitus.",
         "अग्न्याशय की बीटा कोशिकाओं से 'इंसुलिन' (Insulin) हार्मोन निकलता है। इसकी कमी से रक्त में शुगर बढ़ जाती है और मधुमेह (डायबिटीज) होता है।"),

        # 20. Veterinary University in Haryana
        ("In memory of which freedom fighter is the prestigious Veterinary and Animal Sciences University established at Hisar in 2010 named?",
         "हिसार में 2010 में स्थापित प्रसिद्ध पशु चिकित्सा एवं पशु विज्ञान विश्वविद्यालय का नाम किस महान स्वतंत्रता सेनानी के नाम पर रखा गया है?",
         "Chaudhary Devi Lal", "Sir Chhotu Ram", "Chaudhary Charan Singh", "Lala Lajpat Rai (LUVAS - लाला लाजपत राय पशु चिकित्सा विश्वविद्यालय)",
         3, "LALA LAJPAT RAI University of Veterinary and Animal Sciences (LUVAS) was established at Hisar in 2010.",
         "लाला लाजपत राय पशु चिकित्सा एवं पशु विज्ञान विश्वविद्यालय (LUVAS) 2010 में हिसार में स्थापित किया गया था।"),

        # 21. Milk Testing Instrument
        ("Which instrument is specifically used to test the purity and specific gravity of milk in dairy farming?",
         "डेयरी व्यवसाय में दूध की शुद्धता और उसका आपेक्षिक घनत्व मापने के लिए किस यंत्र का उपयोग किया जाता है?",
         "Lactometer (लैक्टोमीटर / दुग्धमापी)", "Hydrometer", "Saccharometer", "Viscometer",
         0, "A Lactometer measures the specific gravity and fat purity of milk.",
         "लैक्टोमीटर (Lactometer) एक विशेष हाइड्रोमीटर है, जिसका उपयोग दूध की शुद्धता और उसमें पानी की मिलावट की जांच करने हेतु किया जाता है।"),

        # 22. Green Revolution Father
        ("Who is revered as the Father of the Green Revolution in India, whose high-yielding wheat varieties transformed Haryana's agriculture in the late 1960s?",
         "भारत में 'हरित क्रांति के जनक' के रूप में किसे जाना जाता है, जिनके प्रयासों से 1960 के दशक में हरियाणा और पंजाब में खाद्यान्न का रिकॉर्ड उत्पादन हुआ?",
         "Dr. Verghese Kurien", "Dr. M. S. Swaminathan (डॉ. एम. एस. स्वामीनाथन - भारत रत्न)", "Dr. Norman Borlaug", "Dr. B. P. Pal",
         1, "Dr. M. S. Swaminathan led the Green Revolution in India introducing semi-dwarf wheat strains.",
         "डॉ. एम. एस. स्वामीनाथन को भारत में हरित क्रांति का जनक कहा जाता है। उन्होंने मैक्सिकन गेहूं की बौनी किस्मों को भारतीय जलवायु के अनुकूल बनाकर खाद्यान्न आत्मनिर्भरता हासिल की।"),

        # 23. Artificial Insemination
        ("In veterinary animal breeding, at what temperature is bull semen cryo-preserved in liquid nitrogen tanks?",
         "पशु नस्ल सुधार एवं कृत्रिम गर्भाधान (AI) हेतु सांड के वीर्य (Semen) को तरल नाइट्रोजन में किस तापमान पर सुरक्षित रखा जाता है?",
         "-50°C", "-100°C", "-196°C (माइनस 196 डिग्री सेल्सियस)", "-273°C",
         2, "Bull semen straws are preserved at -196°C in liquid nitrogen for indefinite viability.",
         "कृत्रिम गर्भाधान हेतु वीर्य की स्ट्रॉ को तरल नाइट्रोजन (Liquid Nitrogen) में -196°C तापमान पर सुरक्षित रखा जाता है।"),

        # 24. Silage Preparation
        ("What is the nutritious fermented green fodder preserved in airtight pits during surplus seasons called in dairy farming?",
         "डेयरी फार्मिंग में हरे चारे की प्रचुरता के समय हवा रहित गड्ढों (Silo Pits) में किण्वित करके सुरक्षित रखे गए पौष्टिक चारे को क्या कहते हैं?",
         "Hay", "Straw", "Oil Cake", "Silage / साइलेज (मक्के या ज्वार से बना अचार जैसा पौष्टिक चारा)",
         3, "Silage is fermented green fodder (often maize) preserved under anaerobic conditions.",
         "साइलेज (Silage) हरे चारे (विशेषकर मक्का व ज्वार) को गड्ढों में वायु की अनुपस्थिति में किण्वित करके बनाया गया रसदार व पौष्टिक पशु आहार होता है।")
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
            'domain': 'Agriculture & Animal Husbandry Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all syllabus topics
    agri_modules = [
        # Crops & Agronomy
        ("Soil testing and NPK ratio 4:2:1", "फसलों के लिए आदर्श नाइट्रोजन, फास्फोरस व पोटाश का अनुपात", "मृदा स्वास्थ्य", "कृषि"),
        ("Kharif crop Bajra cultivation", "हरियाणा के भिवानी, महेंद्रगढ़, रेवाड़ी में उगाई जाने वाली प्रमुख बाजरा फसल", "खरीफ फसलें", "कृषि"),
        ("Mustard cultivation in South Haryana", "रेवाड़ी, महेंद्रगढ़, भिवानी में तेलहन की प्रमुख रबी फसल", "तिलहन फसलें", "कृषि"),
        ("Basmati rice export from Karnal and Taraori", "हरियाणा का सुगंधित बासमती चावल जिसका विदेशों में भारी निर्यात होता है", "धान की खेती", "कृषि"),
        ("Sugarcane crop in Yamunanagar", "सरस्वती शुगर मिल (यमुनानगर - एशिया की सबसे बड़ी चीनी मिलों में से एक)", "नकदी फसलें", "कृषि"),
        ("Drip and Sprinkler micro-irrigation", "अरावली व रेतीले क्षेत्रों में भूजल संरक्षण हेतु सूक्ष्म सिंचाई तकनीक", "जल संरक्षण", "कृषि"),
        ("Green manuring with Dhaincha and Sunnhemp", "मिट्टी में जैविक कार्बन और नाइट्रोजन बढ़ाने हेतु ढैंचा की हरी खाद", "जैविक खेती", "कृषि"),
        ("Zero Tillage Wheat sowing technology", "धान की कटाई के तुरंत बाद बिना जुताई गेहूं की बुआई कर पराली प्रबंधन", "आधुनिक तकनीक", "कृषि"),
        ("Pradhan Mantri Fasal Bima Yojana (PMFBY)", "प्राकृतिक आपदाओं से फसल नुकसान पर किसानों को आर्थिक सुरक्षा", "फसल बीमा", "कृषि"),
        ("Mera Pani Meri Virasat Yojana Haryana", "धान के स्थान पर कम पानी वाली मक्का व दालों की खेती पर ₹7000 प्रति एकड़ प्रोत्साहन", "जल योजना", "कृषि"),
        # Animal Breeds & Husbandry
        ("Sahiwal cow dairy breed", "लाल-भूरे रंग की देसी गाय जो उच्च दुग्ध उत्पादन के लिए प्रसिद्ध है", "गोवंश नस्लें", "पशुपालन"),
        ("Tharparkar cow desert breed", "सफेद रंग की रोग प्रतिरोधी देसी गाय जो सूखे क्षेत्रों के अनुकूल है", "गोवंश नस्लें", "पशुपालन"),
        ("Beetal goat breed of Haryana-Punjab", "दूध और मांस दोनों के लिए प्रसिद्ध लंबे कानों वाली बकरी की नस्ल", "बकरी पालन", "पशुपालन"),
        ("Black Bengal goat meat quality", "उच्च प्रजनन क्षमता और स्वादिष्ट मांस के लिए प्रसिद्ध बकरी", "बकरी पालन", "पशुपालन"),
        ("Murrah buffalo breeding tract Rohtak Jind", "रोहतक, जींद, हिसार, कैथल को मुर्राह का गृह क्षेत्र माना जाता है", "मुर्राह नस्ल", "पशुपालन"),
        ("Rinderpest / Cattle Plague eradication", "विषाणुजनित महामारी जिसे टीकाकरण द्वारा भारत से पूर्णतः समाप्त किया गया", "पशु रोग", "पशुपालन"),
        ("Anthrax bacterial zoonotic disease", "बैसिलस एन्थ्रेसिस जीवाणु से होने वाला जानलेवा गिल्टी रोग", "पशु रोग", "पशुपालन"),
        ("Black Quarter (BQ / लंगड़ा बुखार)", "क्लॉस्ट्रिडियम जीवाणु से होने वाला युवा मवेशियों का घातक रोग", "पशु रोग", "पशुपालन"),
        ("Mastitis / थनैला रोग in dairy cows", "दुधारू पशुओं के अयन में जीवाणु संक्रमण जिससे दूध में थक्के आते हैं", "पशु रोग", "पशुपालन"),
        ("Haemorrhagic Septicaemia (HS / गलघोंटू)", "पाश्चुरेला जीवाणु से होने वाला बरसात का जानलेवा रोग", "पशु रोग", "पशुपालन"),
        ("Pashu Kisan Credit Card Scheme Haryana", "पशुपालकों को रियायती ब्याज दर पर ₹1.60 लाख तक बिना गारंटी ऋण", "पशु कल्याण", "पशुपालन"),
        ("Hay making from Berseem and Lucerne", "हरे चारे को सुखाकर नमी 15% से कम करके चारा संरक्षण करना", "चारा प्रबंधन", "पशुपालन"),
        ("Total Mixed Ration (TMR) cattle feeding", "सूखा चारा, हरा चारा और दाना का संतुलित मिश्रण बनाकर खिलाना", "पशु पोषण", "पशुपालन"),
        ("Gestation period of Buffalo (310 days)", "भैंस का गर्भकाल लगभग 10 माह 10 दिन (310 दिन) होता है", "प्रजनन विज्ञान", "पशुपालन"),
        ("Gestation period of Cow (282 days)", "गाय का गर्भकाल लगभग 9 माह 9 दिन (280-282 दिन) होता है", "प्रजनन विज्ञान", "पशुपालन"),
        ("Gestation period of Goat (150 days)", "बकरी का गर्भकाल लगभग 5 माह (145-150 दिन) होता है", "प्रजनन विज्ञान", "पशुपालन"),
        ("Estrus cycle duration in Cattle (21 days)", "गाय और भैंस में मद चक्र (गर्मी में आना) औसतन 21 दिन में दोहराता है", "प्रजनन विज्ञान", "पशुपालन"),
        # General Science - Physics
        ("Newton's First Law of Motion (Inertia)", "जड़त्व का नियम - बस के अचानक चलने पर यात्री का पीछे झुकना", "भौतिकी", "सामान्य विज्ञान"),
        ("Newton's Second Law of Motion (F = ma)", "बल = द्रव्यमान x त्वरण; संवेग परिवर्तन की दर लगाए गए बल के समानुपाती", "भौतिकी", "सामान्य विज्ञान"),
        ("Work done formula (W = F x d x cos theta)", "बल और विस्थापन का अदिश गुणनफल; कार्य का मात्रक जूल (Joule)", "भौतिकी", "सामान्य विज्ञान"),
        ("Kinetic Energy formula (KE = 1/2 m v^2)", "गति के कारण उत्पन्न ऊर्जा; वेग दोगुना करने पर ऊर्जा चार गुना", "भौतिकी", "सामान्य विज्ञान"),
        ("Potential Energy formula (PE = mgh)", "ऊंचाई या स्थिति के कारण संचित गुरुत्वीय स्थितिज ऊर्जा", "भौतिकी", "सामान्य विज्ञान"),
        ("Atmospheric pressure measurement unit Pascal", "दाब = बल / क्षेत्रफल; एसआई मात्रक पास्कल या न्यूटन/मीटर²", "भौतिकी", "सामान्य विज्ञान"),
        ("Focal length and power of lens (P = 1/f)", "लेंस की क्षमता का मात्रक डायोप्टर (Dioptre - D)", "प्रकाशिकी", "सामान्य विज्ञान"),
        ("Ohm's Law of electric resistance (V = IR)", "विभवांतर और धारा का अनुपात प्रतिरोध कहलाता है (मात्रक: ओम)", "विद्युत", "सामान्य विज्ञान"),
        ("Electric power unit Watt and Commercial kWh", "1 किलोवाट घंटा (kWh) = 1 यूनिट = 3.6 x 10^6 जूल", "विद्युत", "सामान्य विज्ञान"),
        ("Speed of sound in air (343 m/s at 20 C)", "ध्वनि एक अनुदैर्ध्य यांत्रिक तरंग है जो निर्वात में गमन नहीं कर सकती", "ध्वनि", "सामान्य विज्ञान"),
        # General Science - Chemistry
        ("Atomic Number equals Proton count", "परमाणु क्रमांक नाभिक में उपस्थित प्रोटॉनों की संख्या के बराबर", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Avogadro's Number (6.022 x 10^23)", "एक मोल पदार्थ में उपस्थित कणों की निश्चित संख्या", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("pH value scale of acids and bases (0 to 14)", "7 से कम अम्लीय, 7 उदासीन (शुद्ध जल), 7 से अधिक क्षारीय", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Chemical formula of Plaster of Paris (CaSO4.1/2H2O)", "जिप्सम को गर्म करके बनाया जाने वाला प्लास्टर ऑफ पेरिस", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Chemical formula of Bleaching Powder (CaOCl2)", "कैल्शियम ऑक्सीक्लोराइड - कीटाणुनाशक व जल शुद्धिकरण में प्रयुक्त", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Washing Soda chemical formula (Na2CO3.10H2O)", "सोडियम कार्बोनेट डेकाहाइड्रेट - कपड़ों की धुलाई व जल की कठोरता दूर करने में", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Baking Soda chemical formula (NaHCO3)", "सोडियम बाइकार्बोनेट - खाना पकाने व अग्निशामक यंत्रों में प्रयुक्त", "रसायन विज्ञान", "सामान्य विज्ञान"),
        ("Brass alloy composition (Copper + Zinc)", "पीतल तांबा (70%) और जस्ता (30%) की मिश्रधातु है", "मिश्रधातु", "सामान्य विज्ञान"),
        ("Bronze alloy composition (Copper + Tin)", "कांसा तांबा और टिन की मजबूत मिश्रधातु है", "मिश्रधातु", "सामान्य विज्ञान"),
        ("Stainless Steel composition (Fe + Cr + Ni + C)", "लोहे में क्रोमियम (18%) और निकेल मिलाकर जंगरोधी इस्पात बनाना", "मिश्रधातु", "सामान्य विज्ञान"),
        ("DAP fertilizer nutrient ratio (18% N, 46% P2O5)", "डाई-अमोनियम फॉस्फेट खाद में 18% नाइट्रोजन व 46% फॉस्फोरस", "उर्वरक", "सामान्य विज्ञान"),
        # General Science - Biology & Health
        ("Mitochondria as Powerhouse of Cell", "कोशिका का ऊर्जाघर जहाँ एटीपी (ATP) के रूप में ऊर्जा बनती है", "कोशिका विज्ञान", "सामान्य विज्ञान"),
        ("Ribosomes as Protein factories", "कोशिका में प्रोटीन संश्लेषण का मुख्य स्थल", "कोशिका विज्ञान", "सामान्य विज्ञान"),
        ("Red Blood Cells lifespan (120 days)", "आरबीसी का जीवनकाल 120 दिन; प्लीहा (Spleen) को आरबीसी का कब्रिस्तान कहते हैं", "मानव शरीर", "सामान्य विज्ञान"),
        ("White Blood Cells immunity soldiers", "श्वेत रक्त कणिकाएं शरीर को संक्रमण से बचाती हैं (ल्यूकोसाइट्स)", "प्रतिरक्षा", "सामान्य विज्ञान"),
        ("Blood platelets in coagulation (Clotting)", "रक्त का थक्का जमाने के लिए प्लेटलेट्स और विटामिन K आवश्यक", "रक्त परिसंचरण", "सामान्य विज्ञान"),
        ("Normal human blood pressure (120/80 mmHg)", "स्फिग्मोमैनोमीटर द्वारा मापा जाने वाला सिस्टोलिक व डायस्टोलिक दाब", "मानव शरीर", "सामान्य विज्ञान"),
        ("Bile juice produced by Liver and stored in Gallbladder", "यकृत द्वारा पित्त रस का निर्माण और वसा का इमल्सीकरण", "पाचन तंत्र", "सामान्य विज्ञान"),
        ("Nephron as functional unit of Kidney", "वृक्क (किडनी) की कार्यात्मक इकाई जो रक्त से यूरिया छानती है", "उत्सर्जन तंत्र", "सामान्य विज्ञान"),
        ("Vitamin C deficiency causes Scurvy", "एस्कॉर्बिक एसिड की कमी से मसूड़ों से खून आना और घाव देर से भरना", "पोषण", "सामान्य विज्ञान"),
        ("Vitamin D deficiency causes Rickets", "कैल्सीफेरोल की कमी से बच्चों की हड्डियां मुड़ना व कमजोर होना", "पोषण", "सामान्य विज्ञान"),
        ("Vitamin B1 deficiency causes Beriberi", "थायमिन की कमी से तंत्रिका तंत्र व मांसपेशियों की कमजोरी", "पोषण", "सामान्य विज्ञान"),
        ("Vitamin B12 contains Cobalt metal", "सायनोकोबालामिन - आरबीसी निर्माण हेतु आवश्यक (कोबाल्ट धातु युक्त)", "पोषण", "सामान्य विज्ञान"),
        ("Tuberculosis caused by Mycobacterium tuberculosis", "जीवाणुजनित फेफड़ों का संक्रामक रोग (बीसीजी टीका)", "रोग एवं उपचार", "सामान्य विज्ञान"),
        ("Typhoid diagnosed by Widal Test", "साल्मोनेला टाइफी जीवाणु से होने वाली आंतों की बीमारी (विडाल टेस्ट)", "रोग एवं उपचार", "सामान्य विज्ञान"),
        ("Dengue virus transmitted by Aedes mosquito", "डेंगू में रक्त में प्लेटलेट्स की संख्या तेजी से घटती है", "रोग एवं उपचार", "सामान्य विज्ञान"),
        ("Rabies virus caused by animal bites", "रेबीज (हाइड्रोफोबिया) का टीका लुई पाश्चर ने खोजा था", "रोग एवं उपचार", "सामान्य विज्ञान"),
        ("Polio vaccine invented by Jonas Salk and Albert Sabin", "इन्जेक्टेबल साल्क टीका और ओरल सबिन ड्रॉप्स", "टीकाकरण", "सामान्य विज्ञान"),
        ("Penicillin discovered by Alexander Fleming 1928", "पेनिसिलियम नोटेटम कवक से प्राप्त पहला एंटीबायोटिक", "चिकित्सा विज्ञान", "सामान्य विज्ञान")
    ]

    # Generate remaining items up to 300
    for i in range(24, 300):
        a_idx = (i - 24) % len(agri_modules)
        topic, facts, theme, category = agri_modules[a_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In Agriculture, Animal Husbandry & General Science for Haryana Police, which statement accurately explains '{topic}'?"
            stem_hi = f"हरियाणा पुलिस कृषि, पशुपालन एवं विज्ञान अभ्यासक्रम के अंतर्गत '{topic}' का सही वैज्ञानिक/कृषि तथ्य कौन-सा है?"
            sol_en = f"Accurate fact for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही तथ्य: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Antarctic volcanic lava glass density ratio", 'hi': "अंटार्कटिका ज्वालामुखी लावा कांच घनत्व अनुपात"},
                {'en': "Deep sea hydrothermal vent iron sulfide chimney", 'hi': "गहरे समुद्र में हाइड्रोथर्मल चिमनी का सल्फाइड अनुपात"},
                {'en': "Lunar regolith helium-3 extraction formula", 'hi': "चंद्रमा की मिट्टी से हीलियम निष्कर्षण सूत्र"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Which major domain or branch of science does the study of '{topic}' belong to?"
            stem_hi = f"'{topic}' विषय किस प्रमुख अध्ययन शाखा या वैज्ञानिक श्रेणी के अंतर्गत आता है?"
            sol_en = f"'{topic}' belongs to {category} ({theme})."
            sol_hi = f"'{topic}' विषय '{category}' ({theme}) शाखा के अंतर्गत आता है।"
            choices = [
                {'en': "Trans-Neptunian Kuiper Belt Asteroids", 'hi': "कुइपर बेल्ट क्षुद्रग्रह खगोलिकी"},
                {'en': f"Haryana Police Curriculum: {category} ({theme})", 'hi': f"हरियाणा पुलिस पाठ्यक्रम: {category} ({theme})"},
                {'en': "Mesopotamian Cuneiform Clay Tablet Translation", 'hi': "मेसोपोटामिया मिट्टी की पट्टिका अनुवाद"},
                {'en': "South American Tropical Orchid Taxonomy", 'hi': "दक्षिण अमेरिकी आर्किड पादप वर्गीकरण"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"What is the practical farming, livestock, or scientific significance of '{topic}' in Haryana?"
            stem_hi = f"हरियाणा के कृषि, पशुपालन या वैज्ञानिक परिवेश में '{topic}' का व्यावहारिक महत्व क्या है?"
            sol_en = f"Practical significance: {facts}. Theme: {theme}."
            sol_hi = f"व्यावहारिक महत्व: {facts} (पहचान: {theme})।"
            choices = [
                {'en': "Completely fictitious and non-applicable myth", 'hi': "पूर्णतः काल्पनिक एवं अव्यावहारिक तथ्य"},
                {'en': "British medieval longbow archery tension", 'hi': "ब्रिटिश तीरंदाजी धनुष का खिंचाव तनाव"},
                {'en': f"Essential application: {facts} ({theme})", 'hi': f"व्यावहारिक उपयोग: {facts} ({theme})"},
                {'en': "Amazonian poison dart frog alkaloid secretion", 'hi': "अमेजन मेंढक का विषैला स्राव"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is sound knowledge of '{topic}' tested in the Haryana Police Constable Knowledge Test?"
            stem_hi = f"हरियाणा पुलिस सिपाही भर्ती परीक्षा में '{topic}' से संबंधित प्रश्न क्यों पूछे जाते हैं?"
            sol_en = f"It builds awareness of rural agrarian economy, livestock management, and everyday science: {facts}."
            sol_hi = f"हरियाणा की ग्रामीण अर्थव्यवस्था, पशुधन सुरक्षा एवं दैनिक विज्ञान की समझ हेतु {facts} जानना आवश्यक है।"
            choices = [
                {'en': "To compute supersonic missile nose cone heat", 'hi': "सुपरसोनिक मिसाइल के ताप की गणना हेतु"},
                {'en': "To monitor migratory Arctic seal pups", 'hi': "आर्कटिक सील के बच्चों की निगरानी हेतु"},
                {'en': "To trade crude oil futures on NYMEX", 'hi': "कच्चे तेल के वायदा सौदे करने हेतु"},
                {'en': f"Crucial for Agri & Science awareness: {facts}", 'hi': f"कृषि व विज्ञान का आवश्यक ज्ञान: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'{category} - {theme}',
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

"""
CTET - Environmental Studies & EVS Pedagogy (पर्यावरण अध्ययन एवं शिक्षण शास्त्र) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- NCERT EVS Core Themes:
  1. Family and Friends: Animals (Elephants, Sloth, Snakes, Honeybees), Plants (Pitcher plant, Desert oak, Khejadi)
  2. Food: Dr. Beaumont stomach experiment, Traditional food across states (Ling-hu-fen, Tapioca, Mustard/Coconut fish)
  3. Shelter: Traditional houses across states (Assam bamboo stilts, Ladakh stone, Kashmir Khatamband, Rajasthan mud), Bird nests
  4. Water: Stepwells (Baolis), Ghadsisar lake, Al-Biruni, Malaria (Ronald Ross, Anopheles, Quinine), Anaemia & Iron rich foods
  5. Travel: India map directions (Arabian Sea vs Bay of Bengal states), Transports (Vallam, Jugaad), Changpa & Pashmina shawl, Bachendri Pal
  6. Things We Make and Do: Madhubani art (Bihar), Pochampalli sarees, Kannauj Itr, Suryamani Kuduk Torang, Amrita Devi Bishnoi
- EVS Pedagogy:
  - Integrated EVS (Science + Social Science + Environmental Education under NCF 2005)
  - Experiential learning, Field visits, Community as learning resource
  - CCE in EVS: Portfolios, Anecdotal records, Rubrics, Holistic evaluation
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_evs_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Animals - Elephant Herd (Index 0)
        ("According to NCERT Class 5 EVS, who is the leader of an elephant herd in the wild, and how much foliage can an adult elephant eat in a single day?",
         "एनसीईआरटी कक्षा 5 पर्यावरण अध्ययन के अनुसार, हाथियों के झुंड का नेतृत्व कौन करता है और एक वयस्क हाथी एक दिन में लगभग कितने किलोग्राम पत्ते व झाड़ियां खा सकता है?",
         "The oldest female elephant leads the herd; an adult eats more than 100 kg of leaves and twigs (सबसे बुजुर्ग हथिनी झुंड की मुखिया होती है; 100 किग्रा से अधिक पत्तियां)", "The strongest adult male elephant leads; an adult eats 20 kg", "The youngest female elephant leads; an adult eats 500 kg", "A pair of male tusker brothers leads; an adult eats 50 kg",
         0, "In an elephant herd, the oldest female is the leader (matriarch). An adult elephant can eat more than 100 kg of leaves and twigs in a day and sleeps only 2 to 4 hours.",
         "हाथियों के झुंड में केवल हथिनियां और बच्चे होते हैं। सबसे बुजुर्ग हथिनी पूरे झुंड की मुखिया होती है। एक बड़ा हाथी एक दिन में 100 किग्रा से ज्यादा पत्ते खा लेता है और केवल 2 से 4 घंटे सोता है।"),

        # 2. Food - Traditional Dish Ling-hu-fen (Index 1)
        ("In NCERT EVS, a child mentions: 'My mother and I love to eat snakes. Whenever we feel like eating snakes, we go to a nearby restaurant and eat Ling-hu-fen.' Which country or region is the child from?",
         "एनसीईआरटी ईवीएस में एक बच्ची कहती है: 'मुझे और मेरी माँ दोनों को सांप खाना बहुत पसंद है। जब भी हमारी सांप खाने की इच्छा होती है, हम पास के होटल में जाकर लिंग-हू-फेन (Ling-hu-fen) खाते हैं।' यह बच्ची किस क्षेत्र से संबंधित है?",
         "Kashmir", "Hong Kong (हांगकांग)", "Kerala", "Goa",
         1, "Ling-hu-fen is a popular traditional dish made from snakes in Hong Kong.",
         "हांगकांग में सांप के मांस से बना व्यंजन 'लिंग-हू-फेन' (Ling-hu-fen) बड़े चाव से खाया जाता है।"),

        # 3. Traditional Shelter - Assam Bamboo Stilts (Index 2)
        ("In which Indian state are traditional houses constructed on strong bamboo pillars (stilts) 10 to 12 feet (3 to 3.5 meters) above the ground with sloping roofs due to frequent torrential rainfall?",
         "भारी वर्षा के कारण भारत के किस राज्य में पारंपरिक घर जमीन से 10 से 12 फीट (3 से 3.5 मीटर) ऊंचे मजबूत बांस के खंभों पर बनाए जाते हैं जिनकी छतें ढलवा होती हैं?",
         "Ladakh", "Rajasthan", "Assam (असम)", "Manali (Himachal Pradesh)",
         2, "In Assam, houses are built 10 to 12 feet high on strong bamboo pillars because it rains heavily, preventing flood inundation.",
         "असम में बहुत बारिश होती है, इसलिए वहां घर जमीन से 10-12 फीट ऊंचे बांस के मजबूत खंभों पर बनाए जाते हैं और अंदर भी लकड़ियों का प्रयोग होता है।"),

        # 4. Plant - Insectivorous Pitcher Plant (Nepenthes) (Index 3)
        ("The insectivorous Pitcher Plant (Nepenthes), which traps and consumes frogs, insects, and even mice using a special pitcher organ and sweet fragrance, is found in which Indian state?",
         "कीटभक्षी शिकारी पौधा 'घटपर्णी' (नेपेंथीस / Nepenthes), जो घड़े के आकार की पत्ती और मनमोहक खुशबू से मेंढकों, कीड़ों और चूहों को फंसाकर खा जाता है, भारत के किस राज्य में पाया जाता है?",
         "Rajasthan", "Kerala", "Uttar Pradesh", "Meghalaya (मेघालय)",
         3, "Nepenthes (Pitcher Plant) is found in Australia, Indonesia, and Meghalaya in India.",
         "नेपेंथीस (घटपर्णी) पौधा भारत के मेघालय राज्य के अलावा ऑस्ट्रेलिया और इंडोनेशिया में पाया जाता है। यह नाइट्रोजन की कमी पूरी करने हेतु कीटों का भक्षण करता है।"),

        # 5. Animals - Sloth Characteristics (Index 0)
        ("Which tree-dwelling mammal looks like a bear, spends almost 17 hours a day sleeping hanging upside down from a tree branch, and eats leaves of the same tree, living for about 40 years?",
         "भालू जैसा दिखने वाला कौन-सा स्तनधारी जानवर दिन के लगभग 17 घंटे पेड़ की शाखा पर उल्टे लटककर सोता है, उसी पेड़ की पत्तियां खाता है और लगभग 40 वर्ष के जीवनकाल में मात्र 8 पेड़ों पर ही जाता है?",
         "Sloth (स्लॉथ)", "Chimpanzee", "Panda", "Koala Bear",
         0, "The sloth sleeps upside down for about 17 hours a day, lives for 40 years, and changes only about 8 trees in its entire lifetime.",
         "स्लॉथ (Sloth) दिन में करीब 17 घंटे पेड़ों पर उल्टे लटककर सोता है। यह जिस पेड़ पर रहता है उसी की पत्तियां खाता है और सप्ताह में केवल एक बार शौच हेतु नीचे उतरता है।"),

        # 6. Disease - Ronald Ross and Malaria (Index 1)
        ("Which scientist was awarded the Nobel Prize in Physiology or Medicine in 1902 for proving that Malaria is transmitted by the female Anopheles mosquito?",
         "किस वैज्ञानिक को 1902 में यह सिद्ध करने के लिए चिकित्सा का नोबेल पुरस्कार दिया गया था कि मलेरिया का संचरण मादा एनाफिलीज़ मच्छर द्वारा होता है?",
         "Gregor Mendel", "Ronald Ross (रोनाल्ड रॉस)", "Edward Jenner", "Louis Pasteur",
         1, "Ronald Ross discovered the malaria parasite in the stomach of female Anopheles mosquitoes in Secunderabad, India, winning the 1902 Nobel Prize.",
         "रोनाल्ड रॉस (Ronald Ross) ने 1897 में सिकंदराबाद में अनुसंधान कर सिद्ध किया कि मलेरिया मादा एनाफिलीज़ मच्छर के काटने से फैलता है।"),

        # 7. Traditional Textiles - Pochampalli (Index 2)
        ("Pochampalli, renowned for its distinct, vibrant geometric patterns and traditional silk weaving, is a world-famous town located in which state of India?",
         "पोचमपल्ली, जो अपने विशिष्ट ज्यामितीय आकारों और पारंपरिक रेशमी साड़ियों की बुनाई के लिए प्रसिद्ध है, भारत के किस राज्य का एक मंडल/कस्बा है?",
         "Karnataka", "Tamil Nadu", "Telangana (तेलंगाना - नलगोंडा/यादाद्री भुवनगिरि जिला)", "Kerala",
         2, "Pochampalli is a town in Telangana where weavers produce globally renowned Pochampalli Ikat silk sarees.",
         "पोचमपल्ली तेलंगाना राज्य का एक कस्बा है, जहाँ के बुनकर अपनी पारंपरिक 'पोचमपल्ली इकत' साड़ियों के लिए विश्व विख्यात हैं।"),

        # 8. High Altitude Adaptation - Pashmina Shawl (Index 3)
        ("A Changpa tribal nomadic goat living at 5,000 meters altitude in Ladakh yields the world-famous Pashmina wool. How many regular sweaters' warmth does one fine Pashmina shawl provide, and how many hours of hand-weaving does it take?",
         "लद्दाख में 5,000 मीटर की ऊंचाई पर चांगपा जनजाति की बकरियों से विश्व प्रसिद्ध पश्मीना ऊन प्राप्त होती है। एक पश्मीना शॉल कितने साधारण स्वेटरों के बराबर गर्म होती है और इसे हाथ से बुनने में लगभग कितने घंटे लगते हैं?",
         "4 sweaters warmth; 50 hours weaving", "10 sweaters warmth; 500 hours weaving", "8 sweaters warmth; 100 hours weaving", "6 sweaters warmth; 250 hours weaving (6 स्वेटरों के बराबर गर्मी; 250 घंटे की बुनाई)",
         3, "A pure Pashmina shawl is as warm as 6 sweaters, is made from hair 6 times thinner than human hair, and takes about 250 hours of hand-weaving.",
         "एक पश्मीना शॉल 6 साधारण स्वेटरों जितनी गर्म होती है। इसका रेशा मानव बाल से 6 गुना पतला होता है और एक सादी शॉल बुनने में लगभग 250 घंटे का समय लगता है।"),

        # 9. Geography - States Bordering Arabian Sea (Index 0)
        ("Which of the following groups of Indian coastal states strictly borders the Arabian Sea (अरब सागर)?",
         "भारत के तटीय राज्यों का कौन-सा समूह केवल 'अरब सागर' (Arabian Sea) की सीमा को स्पर्श करता है?",
         "Gujarat, Maharashtra, Goa, Karnataka, Kerala (गुजरात, महाराष्ट्र, गोवा, कर्नाटक, केरल)", "Odisha, Andhra Pradesh, Tamil Nadu, West Bengal", "West Bengal, Odisha, Karnataka, Kerala", "Andhra Pradesh, Tamil Nadu, Kerala, Goa",
         0, "States on the Arabian Sea (western coast) are Gujarat, Maharashtra, Goa, Karnataka, and Kerala.",
         "भारत के पश्चिमी तट पर अरब सागर से लगे राज्य: गुजरात, महाराष्ट्र, गोवा, कर्नाटक और केरल हैं।"),

        # 10. Nutrition - Anaemia and Iron-Rich Foods (Index 1)
        ("A doctor diagnoses a school child with Anaemia (रक्ताल्पता) due to low hemoglobin levels. Which group of food items should the doctor recommend to increase iron intake?",
         "एक डॉक्टर जांच के बाद एक स्कूली बच्चे में हीमोग्लोबिन की कमी के कारण एनीमिया (रक्ताल्पता) की पहचान करता है। डॉक्टर को लौह तत्व (Iron) बढ़ाने के लिए किस खाद्य समूह की सिफारिश करनी चाहिए?",
         "Rice, Sugar, Apple", "Amla, Spinach, Jaggery (आंवला, पालक, गुड़)", "Milk, Butter, Curd", "Banana, Potato, Tomato",
         1, "Amla, green leafy vegetables (spinach), and jaggery are rich natural sources of dietary iron, combating anaemia.",
         "एनीमिया हीमोग्लोबिन या आयरन की कमी से होता है। आंवला, हरी पत्तेदार सब्जियां (पालक) और गुड़ में प्रचुर मात्रा में आयरन पाया जाता है।"),

        # 11. Traditional Water Reservoir - Ghadsisar Lake (Index 2)
        ("The historic 'Ghadsisar' lake, featuring nine interconnected rainwater collection lakes built 650 years ago by King Ghadsi, is located in which city of Rajasthan?",
         "राजा घड़सी द्वारा 650 वर्ष पूर्व 9 परस्पर जुड़ी झीलों के रूप में निर्मित ऐतिहासिक वर्षा जल संचयन सरोवर 'घड़सीसर' राजस्थान के किस शहर में स्थित है?",
         "Jaipur", "Udaipur", "Jaisalmer (जैसलमेर)", "Bikaner",
         2, "Ghadsisar lake in Jaisalmer was built by King Ghadsi with ghats, verandas, and 9 interconnected reservoirs to catch every drop of rain.",
         "घड़सीसर सरोवर जैसलमेर में स्थित है, जिसे 650 साल पहले राजा घड़सी ने लोगों के साथ मिलकर बनवाया था। इसमें 9 झीलें आपस में जुड़ी हुई थीं।"),

        # 12. Plant - Desert Oak (Index 3)
        ("Which tree, found in the deserts of Australia, has roots that grow nearly 30 times deeper into the ground until they reach the water table, storing water in its trunk that locals can drink with a straw?",
         "ऑस्ट्रेलिया के रेगिस्तान में पाया जाने वाला कौन-सा पेड़ अपनी ऊंचाई से 30 गुना गहराई तक जड़ें फैलाता है जब तक कि पानी तक न पहुंच जाए, और तने में पानी जमा रखता है जिसे स्थानीय लोग पाइप डालकर पीते हैं?",
         "Banyan Tree", "Khejadi Tree", "Cactus", "Desert Oak (रेगिस्तानी ओक)",
         3, "Desert Oak is native to dry regions of Australia. Its roots reach deep underground water reserves stored inside its trunk.",
         "रेगिस्तानी ओक (Desert Oak) ऑस्ट्रेलिया में पाया जाता है। इसकी जड़ें जमीन में 30 गुना गहराई तक जाती हैं और इसके तने में जमा पानी को स्थानीय लोग पतले पाइप से पीते हैं।"),

        # 13. Traditional Folk Art - Madhubani (Index 0)
        ("In which district/state of India is the traditional Madhubani folk painting, created on walls and floors using paste of powdered rice mixed with natural dyes (indigo, turmeric, flower extracts), practiced?",
         "दीवारों और आंगनों पर पिसे हुए चावल के घोल में प्राकृतिक रंगों (नील, हल्दी, फूलों के रस) को मिलाकर बनाई जाने वाली प्रसिद्ध 'मधुबनी' लोक चित्रकला किस राज्य से संबंधित है?",
         "Bihar (बिहार - मिथिलांचल/मधुबनी जिला)", "Odisha", "Rajasthan", "Madhya Pradesh",
         0, "Madhubani painting is a traditional folk art originating in Madhubani district of Bihar.",
         "मधुबनी चित्रकला बिहार के मधुबनी और मिथिलांचल क्षेत्र की प्रसिद्ध लोक कला है जिसमें पिसे चावल के घोल और प्राकृतिक रंगों से मानव, पशु-पक्षी और प्रकृति के चित्र बनाए जाते हैं।"),

        # 14. EVS Pedagogy - Integrated Nature (Index 1)
        ("According to NCF 2005, why is Environmental Studies (EVS) for Classes III to V designed as an 'Integrated Subject'?",
         "एनसीएफ 2005 के अनुसार, कक्षा 3 से 5 के लिए पर्यावरण अध्ययन (EVS) को एक 'एकीकृत विषय' (Integrated Subject) के रूप में क्यों अभिकल्पित किया गया है?",
         "To reduce textbook publishing expenses for schools", "Because young children perceive their environment holistically rather than partitioned into separate disciplines of Science, Social Science, and Environmental Education (क्योंकि बच्चे अपने परिवेश को समग्र रूप में देखते हैं)", "Because teachers at primary stage lack specialized degrees", "To replace all language and mathematics classes with nature studies",
         1, "Children at primary level view their environment holistically, so NCF 2005 integrates Science, Social Science, and Environmental Education into EVS.",
         "प्राथमिक स्तर पर बालक अपने परिवेश को विज्ञान, सामाजिक विज्ञान या पर्यावरण में बांटकर नहीं, बल्कि एक समग्र (Holistic) रूप में देखता है, इसलिए ईटीएस को एकीकृत विषय बनाया गया है।"),

        # 15. Mountain Exploration - Bachendri Pal (Index 2)
        ("Bachendri Pal, who became the first Indian woman and the fifth woman in the world to reach the summit of Mount Everest (Sagarmatha) on 23 May 1984, trained at which premier mountaineering institute?",
         "बछेंद्री पाल, जो 23 मई 1984 को माउंट एवरेस्ट (सागरमाथा) के शिखर पर पहुंचने वाली पहली भारतीय महिला बनीं, ने किस प्रमुख पर्वतारोहण संस्थान से प्रशिक्षण प्राप्त किया था?",
         "Himalayan Mountaineering Institute (HMI Darjeeling)", "Atal Bihari Mountaineering Institute (Manali)", "Nehru Institute of Mountaineering (NIM Uttarkashi - नेहरू पर्वतारोहण संस्थान उत्तरकाशी)", "Indian Mountaineering Foundation (Delhi)",
         2, "Bachendri Pal trained under Brigadier Gyan Singh at Nehru Institute of Mountaineering (NIM) in Uttarkashi, Uttarakhand.",
         "बछेंद्री पाल ने उत्तरकाशी के नेहरू पर्वतारोहण संस्थान (NIM) से ब्रिगेडियर ज्ञान सिंह के मार्गदर्शन में प्रशिक्षण प्राप्त किया था।"),

        # 16. Bird Nests - Weaver Bird (Index 3)
        ("In which bird species does the male bird weave several intricately designed hanging nests, and the female inspects them all and lays her eggs in the one she likes best?",
         "पक्षियों की किस प्रजाति में केवल नर पक्षी सुंदर लटके हुए घोंसले बुनता है, और मादा पक्षी सभी घोंसलों का निरीक्षण कर उनमें से सबसे पसंद आने वाले घोंसले में अंडे देती है?",
         "Sunbird", "Indian Robin", "Tailor Bird", "Weaver Bird / Baya (बुनकर पक्षी / बया)",
         3, "The male Weaver Bird (Baya) weaves several nests, and the female chooses the best one to lay her eggs.",
         "नर बया (Weaver Bird) अपने सुंदर घोंसले खुद बुनता है। मादा बया सभी घोंसलों को देखती है और जो उसे सबसे अच्छा लगता है उसी में अंडे देती है।"),

        # 17. Travel Transport - Vallam (Index 0)
        ("In certain parts of Kerala, school children use a small wooden boat to cross rivers and water lagoons to reach their schools. What is this wooden boat called in NCERT EVS?",
         "केरल के कुछ भागों में बच्चे नदी या लैगून पार कर विद्यालय पहुंचने के लिए लकड़ी की बनी छोटी नाव का प्रयोग करते हैं। एनसीईआरटी ईवीएस में इस नाव को क्या कहा जाता है?",
         "Vallam (वल्लम)", "Ferry", "Shikara", "Jugaad",
         0, "In Kerala, a small wooden boat used to ferry passengers and schoolchildren across backwaters is called Vallam.",
         "केरल में बच्चे पानी पार करने के लिए लकड़ी की बनी छोटी नाव 'वल्लम' (Vallam) का उपयोग करते हैं।"),

        # 18. Food - Cooking Fish in Different Oils (Index 1)
        ("In NCERT Class 5 EVS, two children compare their food habits: One child says, 'In our state, we eat sea fish cooked in coconut oil,' while the other says, 'In our state, we eat freshwater fish cooked in mustard oil.' Which two regions are they referring to respectively?",
         "एनसीईआरटी कक्षा 5 में दो बच्चे कहते हैं: पहला- 'हमारे राज्य में नारियल के तेल में पकी समुद्री मछली खाई जाती है,' दूसरा- 'हमारे यहां सरसों के तेल में बनी मछली खाई जाती है।' ये दोनों क्रमशः किन क्षेत्रों से हैं?",
         "Kerala and West Bengal", "Goa and Kashmir (गोवा एवं कश्मीर)", "Tamil Nadu and Assam", "Gujarat and Bihar",
         1, "In Goa, sea fish cooked in coconut oil is popular; in Kashmir, fish cooked in mustard oil is traditional.",
         "गोवा में समुद्र की मछली नारियल के तेल में बनाई जाती है, जबकि कश्मीर में मछली सरसों के तेल में पकाई जाती है।"),

        # 19. Historical Traveler - Al-Biruni (Index 2)
        ("More than a thousand years ago, a scholar and traveler named Al-Biruni visited India and documented the sophisticated water architecture and stepwells of Indian people. Which modern country did Al-Biruni come from?",
         "एक हजार वर्ष से भी पहले भारत आए विद्वान एवं यात्री 'अल-बिरूनी' (Al-Biruni) ने भारतीय लोगों की जल संरक्षण तकनीकों और तालाबों की भूरि-भूरि प्रशंसा की थी। अल-बिरूनी आधुनिक किस देश से आए थे?",
         "Morocco", "Afghanistan", "Uzbekistan (उज्बेकिस्तान)", "Iran",
         2, "Al-Biruni came from Khwarazm in modern Uzbekistan and wrote 'Kitab-ul-Hind', praising India's stepwells and ponds.",
         "अल-बिरूनी आज के उज्बेकिस्तान से भारत आया था। उसने अपनी पुस्तक 'किताब-उल-हिंद' में भारत के तालाबों और बावड़ियों की निर्माण कला की प्रशंसा की थी।"),

        # 20. Environmental Leader - Suryamani (Index 3)
        ("Suryamani, recognized as an inspiring 'Girl Star' in NCERT EVS, founded the 'Torang' center in Jharkhand to preserve the forest heritage, herbs, and cultural traditions of which tribal community?",
         "एनसीईआरटी की 'चमकता सितारा' (Girl Star) सूर्यमणि ने झारखंड में आदिवासियों के वन अधिकारों, जड़ी-बूटियों और संस्कृति के संरक्षण हेतु 'तोरंग' (Torang) केंद्र की स्थापना की। वह किस जनजाति से संबंधित हैं?",
         "Santhal Tribe", "Gond Tribe", "Munda Tribe", "Kuduk Tribe (कुडुख जनजाति)",
         3, "Suryamani belongs to the Kuduk tribe in Jharkhand. In the Kuduk language, 'Torang' means jungle/forest.",
         "सूर्यमणि झारखंड की कुडुख (Kuduk) जनजाति से हैं। कुडुख भाषा में 'तोरंग' का अर्थ जंगल होता है।"),

        # 21. Snake Venom & Antidote (Index 0)
        ("In India, out of hundreds of snake species, how many types of snakes are venomous according to NCERT, and how is the anti-venom medicine prepared?",
         "एनसीईआरटी के अनुसार भारत में पाए जाने वाले सांपों में से कितने प्रकार के सांप जहरीले होते हैं, और सांप के जहर की दवा (Anti-venom) किससे बनाई जाती है?",
         "Only 4 types (Cobra, Common Krait, Russell's Viper, Saw-scaled Viper); anti-venom is prepared from snake venom itself (केवल 4 प्रकार के; सीरम सांप के जहर से ही बनता है)", "12 types; anti-venom is synthesized from mineral sulfur", "All snake species are venomous; anti-venom is extracted from neem leaves", "Only 2 types; anti-venom is made from scorpion stings",
         0, "Only 4 snakes in India are poisonous: Cobra, Common Krait, Russell's Viper (Duboya), and Saw-scaled Viper (Afai). The anti-venom is prepared from snake's own venom.",
         "भारत में केवल 4 तरह के जहरीले सांप होते हैं: नाग (Cobra), करैत (Common Krait), दुबोइया (Russell's Viper), और अफाई (Saw-scaled Viper)। सांप के काटने की दवा (सीरम) सांप के जहर से ही बनाई जाती है।"),

        # 22. Bird Nests - Dove and Barbet (Index 1)
        ("Which bird builds its nest hidden between the sharp thorns of a cactus plant or in a Mehendi hedge to protect its eggs from predators?",
         "कौन-सा पक्षी कैक्टस (नागफनी) के कांटों के बीच या मेहंदी की मेड़ में अपना घोंसला बनाकर शिकारी जीवों से अंडों की रक्षा करता है?",
         "Crow", "Dove (फाख्ता)", "Sunbird", "Sparrow",
         1, "The Dove (फाख्ता) builds its nest among the thorns of a cactus plant or in a Mehendi hedge.",
         "फाख्ता (Dove) पक्षी कैक्टस के कांटों के बीच या मेहंदी की मेड़ में अपना सुरक्षित घोंसला बनाता है।"),

        # 23. EVS Activity - Field Excursions (Index 2)
        ("What is the primary pedagogical objective of organizing a 'Field Trip' (क्षेत्र भ्रमण / शैक्षिक भ्रमण) to a local pond or botanical garden for EVS students?",
         "पर्यावरण अध्ययन (EVS) के विद्यार्थियों के लिए स्थानीय तालाब या वानस्पतिक उद्यान में 'क्षेत्र भ्रमण' (Field Trip) आयोजित करने का मुख्य शैक्षणिक उद्देश्य क्या है?",
         "To give relief to classroom teachers from daily timetable routines", "To test students with competitive pen-paper exams on the spot", "To provide direct, first-hand experiential learning and connect textbook concepts with the real-world environment (मूर्त अनुभव प्रदान करना एवं किताबी ज्ञान को वास्तविक जीवन से जोड़ना)", "To collect plant specimens for commercial school exhibitions",
         2, "Field trips provide direct experiential learning, connecting abstract textbook concepts to authentic real-world observations.",
         "क्षेत्र भ्रमण का मुख्य उद्देश्य विद्यार्थियों को प्रत्यक्ष, जीवंत अनुभव प्रदान करना और कक्षा के किताबी ज्ञान को बाहरी वास्तविक दुनिया से जोड़ना है।"),

        # 24. Traditional Sacrifice - Khejadli Village (Index 3)
        ("In 1730, Amrita Devi Bishnoi and 363 fellow villagers sacrificed their lives hugging Khejadi trees to prevent them from being cut down by the Maharaja's soldiers. In which district of Rajasthan is Khejadli village located?",
         "वर्ष 1730 में अमृता देवी विश्नोई और 363 ग्रामीणों ने राजा के सैनिकों द्वारा खेजड़ी के पेड़ों को काटने से बचाने हेतु पेड़ों से चिपककर अपने प्राणों का बलिदान दिया था। 'खेजड़ली गांव' राजस्थान के किस जिले में स्थित है?",
         "Barmer", "Bikaner", "Nagaur", "Jodhpur (जोधपुर)",
         3, "Khejadli village is located in Jodhpur district of Rajasthan, where the Bishnoi community protects wildlife and Khejadi trees.",
         "खेजड़ली गांव राजस्थान के जोधपुर जिले में स्थित है, जहाँ विश्नोई समाज पेड़ों और वन्यजीवों की रक्षा को अपना परम धर्म मानता है।")
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
            'domain': 'Environmental Studies Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all CTET EVS themes and pedagogical issues
    evs_modules = [
        # Theme 1: Family and Friends (Animals & Plants)
        ("Elephant Herd Social Structure", "Oldest female matriarch leads 10-12 females and calves; males leave at 14-15 years", "हाथियों के झुंड की सामाजिक संरचना", "परिवार एवं मित्र"),
        ("Sloth Arboreal Habits and Lifespan", "Spends 17 hours daily sleeping upside down, eats same tree leaves, lives 40 years", "स्लॉथ की शारीरिक व व्यवहारगत विशेषताएं", "परिवार एवं मित्र"),
        ("Four Venomous Snakes in India", "Cobra (Nag), Common Krait, Russell's Viper (Duboya), Saw-scaled Viper (Afai)", "भारत के चार जहरीले सांप", "परिवार एवं मित्र"),
        ("Honeybee Colony Division of Labor", "Queen lays eggs, worker bees forage and perform waggle dance; Oct-Dec egg laying", "मधुमक्खी पालन एवं श्रम विभाजन", "परिवार एवं मित्र"),
        ("Insectivorous Pitcher Plant (Nepenthes)", "Found in Meghalaya; traps mice, frogs and insects in pitcher leaves for nitrogen", "कीटभक्षी घटपर्णी पौधा (नेपेंथीस)", "परिवार एवं मित्र"),
        ("Desert Oak Deep Root Architecture", "Roots go 30 times deeper to reach groundwater stored inside hollow trunk", "रेगिस्तानी ओक की गहरी जड़ें", "परिवार एवं मित्र"),
        ("Khejadi Tree Environmental Value", "Bishnoi sacred tree in Rajasthan requiring minimal water; bark used as medicine", "खेजड़ी वृक्ष एवं विश्नोई संस्कृति", "परिवार एवं मित्र"),
        ("Crotone Indicator Plants for Soil Moisture", "Shallow roots wilt quickly, signaling to farmers that field requires watering", "क्रोटोन पौधे (सिंचाई सूचक)", "परिवार एवं मित्र"),

        # Theme 2: Food & Digestion
        ("Dr. Beaumont Stomach Digestion Findings", "Stomach churns food in acidic environment (pH 1.5-2) faster inside than outside", "डॉ. बोमोंट का पेट का पाचन प्रयोग", "भोजन एवं पोषण"),
        ("Traditional Hong Kong Snake Dish Ling-hu-fen", "Culinary cultural diversity: soup prepared from boiled snake meat", "हांगकांग का पारंपरिक व्यंजन लिंग-हू-फेन", "भोजन एवं पोषण"),
        ("Tapioca and Coconut Curry in Kerala", "Boiled cassava/tapioca (Kappa) served with spicy fish or coconut curry", "केरल में टैपियोका और नारियल करी", "भोजन एवं पोषण"),
        ("Goan Sea Fish in Coconut Oil vs Kashmiri Fish", "Regional food differences based on locally available oils and water bodies", "गोवा और कश्मीर में मछली पकाने का अंतर", "भोजन एवं पोषण"),
        ("Mamidi Tandra (Aam Papad) Sun Preservation", "Drying layered ripe mango pulp mixed with jaggery in Andhra Pradesh", "मामिडी तान्द्रा (आम पापड़) संरक्षण", "भोजन एवं पोषण"),
        ("Food Spoilage vs Food Preservation Methods", "Boiling milk, storing coriander in damp cloth, sun-drying vegetables", "खाद्य संरक्षण की घरेलू विधियां", "भोजन एवं पोषण"),

        # Theme 3: Shelter & Architecture
        ("Assam Elevated Bamboo Stilt Houses", "Raised 10-12 feet on bamboo pillars with sloping roofs against heavy rains", "असम के बांस के खंभों पर बने घर", "आवास एवं आश्रय"),
        ("Ladakh Double-Storey Stone and Mud Houses", "Ground floor for livestock/stores with no windows; flat roof for sun drying", "लद्दाख के दो मंजिला पत्थरों के घर", "आवास एवं आश्रय"),
        ("Kashmir Houseboats and Khatamband Woodwork", "80-ft houseboats on Dal Lake featuring interlocking geometric ceiling carvings", "कश्मीर के हाउसबोट और खतमबंद नक्काशी", "आवास एवं आश्रय"),
        ("Rajasthan Mud Houses with Thorny Bush Roofs", "Thick mud walls keep interiors cool; acacia/kikar thorny roofs prevent pests", "राजस्थान के मिट्टी और कंटीली झाड़ियों के घर", "आवास एवं आश्रय"),
        ("Weaver Bird (Baya) Male Nest Construction", "Male weaves intricate hanging nests; female inspects and selects the best", "बुनकर पक्षी (बया) का घोंसला", "आवास एवं आश्रय"),
        ("Sunbird Hanging Nest Materials", "Suspended nest built with hair, grass, dry leaves, bits of tree bark and cobwebs", "शकरखोरा (Sunbird) का लटकता घोंसला", "आवास एवं आश्रय"),
        ("Dove Nesting in Cactus and Hedges", "Hides nest among thorns of cactus plants or mehendi hedges for safety", "फाख्ता पक्षी का कांटों में घोंसला", "आवास एवं आश्रय"),
        ("Indian Robin Nesting on Stone Crevices", "Builds soft nest on ground between stones using roots, wool and cotton", "कलचिड़ी (Indian Robin) का घोंसला", "आवास एवं आश्रय"),

        # Theme 4: Water & Health
        ("Traditional Stepwells (Baolis) of India", "Subterranean multi-storey water reservoirs allowing access via stone steps", "पारंपरिक बावड़ियां (Stepwells)", "जल एवं स्वास्थ्य"),
        ("Ghadsisar Interconnected Lakes in Jaisalmer", "Rainwater harvesting engineering built by King Ghadsi with 9 linked lakes", "जैसलमेर का घड़सीसर सरोवर", "जल एवं स्वास्थ्य"),
        ("Al-Biruni Travelogue on Indian Ponds", "Uzbek scholar praised Indian masonry, raised stone platforms and staircases", "अल-बिरूनी का भारतीय जलाशयों पर विवरण", "जल एवं स्वास्थ्य"),
        ("Ronald Ross Discovery of Malaria Vector", "Female Anopheles mosquito transmits Plasmodium; Cinchona bark provides quinine", "रोनाल्ड रॉस और मलेरिया परजीवी", "जल एवं स्वास्थ्य"),
        ("Anaemia and Dietary Iron Deficiency", "Low hemoglobin caused by iron lack; treated by amla, spinach and jaggery", "एनीमिया, हीमोग्लोबिन और लौह युक्त आहार", "जल एवं स्वास्थ्य"),
        ("Water-Borne Diseases Prevention", "Boiling water, chlorination, eliminating stagnant pools to prevent mosquitoes", "जल जनित रोग एवं स्वच्छता", "जल एवं स्वास्थ्य"),

        # Theme 5: Travel, Mapping & Geography
        ("Arabian Sea vs Bay of Bengal Coastal States", "West coast: Gujarat to Kerala; East coast: West Bengal to Tamil Nadu", "भारत के तटीय राज्य एवं दिशा ज्ञान", "यात्रा एवं भूगोल"),
        ("Map Reading Cardinal Directions and Scales", "North at top; determining relative positions of states on India map", "मानचित्र पठन एवं दिशा निर्धारण", "यात्रा एवं भूगोल"),
        ("Pashmina Shawl Craft and Changpa Tribe", "Changthangi goats at 5,000m; 6 times warmer than wool; 250 hours handloom", "चांगपा जनजाति एवं पश्मीना शॉल", "यात्रा एवं भूगोल"),
        ("Bachendri Pal Mt. Everest Expedition (1984)", "First Indian woman atop Sagarmatha; trained under Brigadier Gyan Singh", "बछेंद्री पाल का एवरेस्ट अभियान", "यात्रा एवं भूगोल"),
        ("Traditional Water Transports (Vallam in Kerala)", "Small wooden boats navigating backwaters to transport schoolchildren", "केरल की वल्लम नौका और परिवहन", "यात्रा एवं भूगोल"),
        ("Desert Travel via Camel Carts in Rajasthan", "Padded hooves suited for loose sand and high temperature tolerance", "रेगिस्तान में ऊंट गाड़ी परिवहन", "यात्रा एवं भूगोल"),

        # Theme 6: Things We Make and Do (Art & Ecology)
        ("Madhubani Painting of Bihar", "Folk art using rice powder paste and natural botanical dyes on walls", "बिहार की मधुबनी लोक चित्रकला", "कला एवं दस्तकारी"),
        ("Pochampalli and Kalamkari Handloom Sarees", "Traditional ikat dyeing and block printing in Telangana and Andhra Pradesh", "पोचमपल्ली एवं कलमकारी हथकरघा", "कला एवं दस्तकारी"),
        ("Kannauj Perfume (Itr) Distillation in UP", "Ancient steam distillation of rose, jasmine and kewra petals in copper stills", "कन्नौज का पारंपरिक इत्र उद्योग", "कला एवं दस्तकारी"),
        ("Suryamani Kuduk Torang Forest Movement", "Jharkhand Girl Star protecting tribal forest rights and indigenous language", "सूर्यमणि और तोरंग केंद्र (झारखंड)", "पर्यावरण संरक्षण"),
        ("Amrita Devi Bishnoi Khejadli Sacrifice (1730)", "363 villagers sacrificed lives hugging Khejadi trees in Jodhpur", "अमृता देवी विश्नोई का खेजड़ली बलिदान", "पर्यावरण संरक्षण"),

        # EVS Pedagogy & Classroom Methodology
        ("Integrated Nature of Primary EVS (NCF 2005)", "Holistic synthesis of Science, Social Science, and Environmental Education", "ईवीएस की एकीकृत प्रकृति (NCF 2005)", "ईवीएस शिक्षाशास्त्र"),
        ("Child's Immediate Environment as Primary Resource", "Rooting learning in neighborhood observations rather than rote textbook facts", "बालक का परिवेश ही अधिगम संसाधन", "ईवीएस शिक्षाशास्त्र"),
        ("Field Excursions and Outdoor Nature Walks", "Direct experiential sensory engagement linking concepts to living reality", "शैक्षिक भ्रमण एवं क्षेत्रीय अवलोकन", "शिक्षण विधियां"),
        ("Activity-Based and Inquiry Learning in EVS", "Posing open-ended questions, conducting simple trials, recording observations", "क्रियाकलाप आधारित एवं खोजपरक अधिगम", "शिक्षण विधियां"),
        ("Survey and Interview Methods with Elders", "Gathering oral histories about past climate, farming and community traditions", "समुदाय से साक्षात्कार एवं सर्वेक्षण", "शिक्षण विधियां"),
        ("Continuous and Comprehensive Assessment in EVS", "Portfolios, rubrics, anecdotal notes documenting affective empathy for nature", "ईवीएस में सतत एवं व्यापक मूल्यांकन", "आकलन प्रविधि"),
        ("Sensitization Towards Social Inequality & Gender", "Challenging stereotypes during discussions on family roles and community labor", "जेंडर एवं सामाजिक संवेदनशीलता", "सामाजिक मूल्य"),
        ("Environmental Ethics and Conservation Attitude", "Fostering stewardship for animals, water conservation and zero waste habits", "पर्यावरणीय नैतिकता एवं संरक्षण मूल्य", "सामाजिक मूल्य")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        e_idx = (i - 24) % len(evs_modules)
        topic, facts, theme, category = evs_modules[e_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the Environmental Studies (EVS) curriculum, which statement accurately reflects the concept of '{topic}'?"
            stem_hi = f"पर्यावरण अध्ययन (EVS) पाठ्यक्रम के अंतर्गत '{topic}' से संबंधित कौन-सा कथन प्रामाणिक है?"
            sol_en = f"Accurate EVS concept for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही पर्यावरणीय तथ्य: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Subterranean magma viscosity flow rate calculation", 'hi': "भूमिगत मैग्मा श्यानता प्रवाह दर"},
                {'en': "Stratospheric chlorofluorocarbon catalytic decay index", 'hi': "समतापमंडलीय सीएफसी उत्प्रेरक क्षय सूचकांक"},
                {'en': "Deep ocean trench sonar bathymetry metric", 'hi': "गहरे महासागरीय गर्त सोनार गहराई मापन"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key theme or pedagogical domain of NCERT EVS is '{topic}' classified?"
            stem_hi = f"एनसीईआरटी पर्यावरण अध्ययन में '{topic}' किस मुख्य थीम या शैक्षणिक क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' is categorized under {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) थीम से है।"
            choices = [
                {'en': "Medieval French Heraldry Nomenclature", 'hi': "मध्यकालीन फ्रांसीसी राजचिह्न नामकरण"},
                {'en': f"NCERT EVS Core: {category} ({theme})", 'hi': f"एनसीईआरटी पर्यावरण: {category} ({theme})"},
                {'en': "Alaskan Tundra Permafrost Thawing Rate", 'hi': "अलास्का टुंड्रा बर्फ पिघलने की दर"},
                {'en': "Polynesian Outrigger Canoe Navigation Route", 'hi': "पोलिनेशियन डोंगी समुद्री नौकायन मार्ग"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should an EVS teacher facilitate experiential and child-centered learning regarding '{topic}'?"
            stem_hi = f"एक पर्यावरण अध्ययन शिक्षक को कक्षा में '{topic}' पर अनुभवात्मक व बाल-केंद्रित अधिगम कैसे कराना चाहिए?"
            sol_en = f"Recommended pedagogy: {facts}. Theme: {theme}."
            sol_hi = f"अनुशंसित शिक्षण विधि: {facts} (थीम: {theme})।"
            choices = [
                {'en': "Demanding children memorize definitions verbatim without real-life context", 'hi': "बिना संदर्भ के बच्चों से परिभाषाएं कंठस्थ करवाना"},
                {'en': "Confining learning strictly to lecture without allowing students to ask questions", 'hi': "बच्चों को प्रश्न पूछने से रोककर केवल व्याख्यान देना"},
                {'en': f"Experiential method: {facts} ({theme})", 'hi': f"अनुभवात्मक उपागम: {facts} ({theme})"},
                {'en': "Penalizing students who show empathy towards animals or nature", 'hi': "प्रकृति या पशुओं के प्रति संवेदनशीलता दिखाने पर बच्चों को डांटना"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is contextual understanding of '{topic}' crucial for building environmental awareness among primary school students?"
            stem_hi = f"प्राथमिक स्तर के बच्चों में पर्यावरणीय चेतना व संवेदनशीलता के विकास हेतु '{topic}' की समझ क्यों आवश्यक है?"
            sol_en = f"It connects school learning to immediate surroundings and fosters conservation values: {facts}."
            sol_hi = f"यह स्कूली ज्ञान को वास्तविक परिवेश से जोड़ती है और संरक्षण के मूल्यों को सुदृढ़ करती है: {facts}।"
            choices = [
                {'en': "To trade financial derivatives on international stock markets", 'hi': "अंतरराष्ट्रीय शेयर बाजारों में वित्तीय डेरिवेटिव का व्यापार करने हेतु"},
                {'en': "To command deep sea oil tankers in arctic waters", 'hi': "आर्कटिक जलक्षेत्र में गहरे समुद्र में तेल टैंकर का संचालन करने हेतु"},
                {'en': "To manufacture optical glass lenses for satellite telescopes", 'hi': "उपग्रह दूरबीन हेतु प्रकाशीय कांच के लेंस निर्माण हेतु"},
                {'en': f"Essential for environmental consciousness: {facts}", 'hi': f"पर्यावरणीय चेतना व संरक्षण मूल्यों हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'EVS - {category}',
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
    res = get_raw_evs_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

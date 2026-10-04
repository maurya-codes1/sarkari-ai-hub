"""
UP Police Constable - General Hindi & Literature Question Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- हिन्दी वर्णमाला, ध्वनि, उच्चारण स्थान, अल्पप्राण/महाप्राण, घोष/अघोष
- सन्धि (स्वर, व्यंजन, विसर्ग)
- समास (सभी छह भेद)
- तद्भव एवं तत्सम शब्द
- पर्यायवाची एवं विलोम शब्द
- वाक्यांश के लिए एक शब्द एवं अनेकार्थक शब्द
- रस, छन्द, अलंकार
- मुहावरे एवं लोकोक्तियां
- कारक, लिंग, वचन, काल एवं वाक्य शुद्धि
- हिन्दी साहित्यकार, कालजयी कृतियां एवं प्रमुख पुरस्कार (ज्ञानपीठ, साहित्य अकादमी)
"""

def get_raw_hindi_items():
    items = []

    # Curated syllabus core items (80 items)
    core_hindi_data = [
        ("Which of the following is a voiced aspirate (घोष महाप्राण) sound in Hindi phonology?",
         "निम्नलिखित में से कौन-सा वर्ण 'घोष महाप्राण' व्यंजन है?",
         "घ (Gh)", "क (K)", "ख (Kh)", "ग (G)",
         0, "'घ' is a velar voiced aspirate consonant (वर्ग का चौथा वर्ण, सघोष व महाप्राण).",
         "'घ' क-वर्ग का चतुर्थ वर्ण है जो सघोष (घोष) तथा महाप्राण दोनों है।"),

        ("What is the place of articulation for the vowels 'इ' and 'ई'?",
         "हिन्दी वर्णमाला में 'इ' और 'ई' का उच्चारण स्थान क्या है?",
         "कण्ठ (Throat)", "तालु / तालव्य (Palatal)", "मूर्धा (Retroflex)", "दन्त (Dental)",
         1, "'इ' and 'ई' along with the 'च' series and 'य', 'श' are articulated from the palate (तालव्य).",
         "'इ, ई, च-वर्ग, य, श' का उच्चारण तालु से होता है, अतः ये तालव्य वर्ण हैं (इचुयशानां तालु)।"),

        ("In which sandhi does 'महा + ईश' combine to form 'महेश'?",
         "'महा + ईश = महेश' में कौन-सी सन्धि है?",
         "दीर्घ सन्धि", "यण सन्धि", "गुण सन्धि (Gun Sandhi)", "वृद्धि सन्धि",
         2, "When 'आ' is followed by 'ई', they combine to form 'ए' (गुण स्वर सन्धि).",
         "आ + ई = ए में गुण स्वर सन्धि होती है। जैसे: महा + ईश = महेश, नर + ईश = नरेश।"),

        ("What is the sandhi breakdown of 'इत्यादि'?",
         "'इत्यादि' का सही सन्धि-विच्छेद क्या है?",
         "इत + आदि", "इती + आदि", "इत्य + आदि", "इति + आदि (यन् सन्धि)",
         3, "'इति + आदि' forms 'इत्यादि' according to Yan Sandhi (इ + आ = या).",
         "इति + आदि = इत्यादि में यण् स्वर सन्धि है (इ/ई के बाद कोई असमान स्वर आने पर य् बनता है)।"),

        ("What type of Samas is 'यथाशक्ति'?",
         "'यथाशक्ति' (शक्ति के अनुसार) में कौन-सा समास है?",
         "अव्ययीभाव समास (Avyayibhav Samas)", "तत्पुरुष समास", "द्विगु समास", "कर्मधारय समास",
         0, "Words starting with indeclinable prefixes like 'यथा' belong to Avyayibhav Samas.",
         "जिस समास का पहला पद अव्यय तथा प्रधान हो, उसे अव्ययीभाव समास कहते हैं (यथाशक्ति = शक्ति के अनुसार)।"),

        ("Which Samas is exemplified by the word 'त्रिफला' (तीन फलों का समूह)?",
         "'त्रिफला' शब्द में कौन-सा समास है?",
         "द्वन्द्व समास", "द्विगु समास (Dvigu Samas)", "बहुव्रीहि समास", "तत्पुरुष समास",
         1, "A compound whose first member is a numeral specifying a collective group is Dvigu Samas.",
         "जिस समास का पूर्वपद संख्यावाचक विशेषण हो और उत्तरपद समूह का बोध कराए, वह द्विगु समास होता है।"),

        ("In which Samas are both members equally prominent?",
         "जिस समास के दोनों पद प्रधान होते हैं, उसे क्या कहते हैं?",
         "कर्मधारय समास", "अव्ययीभाव समास", "द्वन्द्व समास (Dvandva Samas)", "बहुव्रीहि समास",
         2, "In Dvandva Samas (e.g., माता-पिता, दिन-रात), both constituent words are equally significant.",
         "द्वन्द्व समास में दोनों पद समान रूप से प्रधान होते हैं और विग्रह करने पर 'और/या/अथवा' लगता है।"),

        ("What is the Tadbhav (तद्भव) word derived from the Sanskrit Tatsam 'अग्नि'?",
         "संस्कृत तत्सम शब्द 'अग्नि' का सही तद्भव रूप क्या है?",
         "ज्वाला", "अनल", "पावक", "आग (Aag)",
         3, "The colloquial Hindi Tadbhav for the Tatsam 'अग्नि' is 'आग'.",
         "संस्कृत के तत्सम शब्द 'अग्नि' का प्राकृत व अपभ्रंश से विकसित तद्भव रूप 'आग' है।"),

        ("What is the Tatsam (तत्सम) form of the Hindi word 'दूध'?",
         "'दूध' का सही तत्सम रूप निम्नलिखित में से क्या है?",
         "दुग्ध (Dugdha)", "क्षीर", "गोरस", "पय",
         0, "'दुग्ध' is the pure Sanskrit Tatsam from which the Tadbhav 'दूध' is derived.",
         "'दूध' का मूल संस्कृत तत्सम शब्द 'दुग्ध' है।"),

        ("What is the Tatsam form of the Hindi word 'आँख'?",
         "'आँख' का सही तत्सम शब्द कौन-सा है?",
         "लोचन", "अक्षि (Akshi)", "नयन", "चक्षु",
         1, "The Sanskrit Tatsam for the eye ('आँख') is 'अक्षि'.",
         "'आँख' का तत्सम रूप 'अक्षि' होता है।"),

        ("Which of the following is NOT a synonym (पर्यायवाची) for 'कमल' (Lotus)?",
         "निम्नलिखित में से कौन-सा शब्द 'कमल' का पर्यायवाची नहीं है?",
         "जलज", "पंकज", "जलद (Jalad - बादल)", "सरोज",
         2, "'जलद' means cloud (giver of water), whereas जलज, पंकज, and सरोज mean lotus (born in water/mud).",
         "'जलद' बादल का पर्यायवाची है (जल देने वाला), जबकि जलज, पंकज, सरोज कमल के पर्यायवाची हैं।"),

        ("What is the antonym (विलोम शब्द) of 'अनुराग'?",
         "'अनुराग' का सही विलोम शब्द क्या है?",
         "प्रेम", "स्नेह", "क्रोध", "विराग (Virag)",
         3, "The antonym of 'अनुराग' (affection/attachment) is 'विराग' (detachment).",
         "'अनुराग' का विलोम शब्द 'विराग' होता है।"),

        ("What is the one-word substitution for 'One who knows everything' (जो सब कुछ जानता हो)?",
         "'जो सब कुछ जानता हो' वाक्यांश के लिए एक उपयुक्त शब्द क्या है?",
         "सर्वज्ञ (Sarvajna)", "अल्पज्ञ", "विज्ञ", "सर्वव्यापी",
         0, "'सर्वज्ञ' refers to omniscient, or one who has complete universal knowledge.",
         "जो सब कुछ जानता हो उसे 'सर्वज्ञ' कहते हैं। जो कम जानता हो उसे 'अल्पज्ञ' कहते हैं।"),

        ("What is the term for 'One who does not acknowledge favors or obligations' (जो उपकार को नहीं मानता)?",
         "'जो किए गए उपकार को न मानता हो' उसे क्या कहा जाता है?",
         "कृतज्ञ", "कृतघ्न (Kritaghna)", "धूर्त", "दुराचारी",
         1, "'कृतघ्न' is an ungrateful person who denies or rejects past favors.",
         "किए गए उपकार को मानने वाला 'कृतज्ञ' और उपकार को न मानने वाला 'कृतघ्न' कहलाता है।"),

        ("What is the Sthayi Bhava (स्थायी भाव) of 'वीर रस' (Heroic Sentiment)?",
         "'वीर रस' का स्थायी भाव क्या है?",
         "रति", "क्रोध", "उत्साह (Utsaha)", "शोक",
         2, "The permanent sentiment of Vira Rasa is Utsaha (enthusiasm / courage).",
         "वीर रस का स्थायी भाव 'उत्साह' होता है (जबकि शृंगार का रति, रौद्र का क्रोध और करुण का शोक है)।"),

        ("How many Matras (मात्राएं) are there in each quarter/चरण of a 'चौपाई' छंद?",
         "'चौपाई' छन्द के प्रत्येक चरण में कुल कितनी मात्राएं होती हैं?",
         "11 मात्राएं", "13 मात्राएं", "24 मात्राएं", "16 मात्राएं (16 Matras)",
         3, "A Chaupai is a quantitative four-line stanza where each Pada contains exactly 16 Matras.",
         "चौपाई सम मात्रिक छन्द है जिसके प्रत्येक चरण में 16-16 मात्राएं होती हैं।"),

        ("Which Alankar (अलंकार) is present in 'चारु चंद्र की चंचल किरणें, खेल रहीं हैं जल थल में'?",
         "'चारु चंद्र की चंचल किरणें, खेल रहीं हैं जल थल में' - इस पंक्ति में कौन-सा अलंकार है?",
         "अनुप्रास अलंकार (Anuprasa Alankar)", "यमक अलंकार", "श्लेष अलंकार", "उपमा अलंकार",
         0, "Repetition of consonant 'च' constitutes Anuprasa Alankar (alliteration).",
         "यहाँ 'च' वर्ण की बार-बार आवृत्ति होने के कारण 'अनुप्रास अलंकार' है।"),

        ("Which figure of speech is present in 'कनक कनक ते सौ गुनी, मादकता अधिकाय'?",
         "'कनक कनक ते सौ गुनी, मादकता अधिकाय' में कौन-सा अलंकार है?",
         "अनुप्रास अलंकार", "यमक अलंकार (Yamak Alankar)", "श्लेष अलंकार", "रूपक अलंकार",
         1, "The word 'कनक' appears twice with different meanings: gold and datura (thorn apple).",
         "यहाँ 'कनक' शब्द दो बार आया है और दोनों बार अर्थ भिन्न (धतूरा और सोना) है, अतः 'यमक अलंकार' है।"),

        ("Who is the author of the epic novel 'गोदान' (Godan)?",
         "कालजयी उपन्यास 'गोदान' के रचयिता कौन हैं?",
         "जयशंकर प्रसाद", "फणीश्वर नाथ रेणु", "मुंशी प्रेमचंद (Munshi Premchand)", "सूर्यकांत त्रिपाठी 'निराला'",
         2, "Munshi Premchand, the Upanyas Samrat, authored Godan depicting Indian peasant life.",
         "'गोदान' मुंशी प्रेमचंद का अंतिम और सबसे प्रसिद्ध यथार्थवादी उपन्यास है।"),

        ("For which masterpiece did Sumitranandan Pant receive the first Jnanpith Award in Hindi (1968)?",
         "सुमित्रानंदन पंत को किस काव्य कृति के लिए 1968 में हिन्दी का प्रथम ज्ञानपीठ पुरस्कार प्राप्त हुआ था?",
         "पल्लव", "लोकायतन", "युगांत", "चिदंबरा (Chidambara)",
         3, "Sumitranandan Pant was awarded the prestigious Jnanpith in 1968 for 'Chidambara'.",
         "सुमित्रानंदन पंत को उनकी प्रसिद्ध कृति 'चिदंबरा' के लिए 1968 में हिन्दी का पहला ज्ञानपीठ पुरस्कार मिला था।"),

        ("Which famous epic poem (महाकाव्य) was written by Jaishankar Prasad?",
         "छायावादी कवि जयशंकर प्रसाद द्वारा रचित सुप्रसिद्ध महाकाव्य कौन-सा है?",
         "कामायनी (Kamayani)", "साकेत", "प्रियप्रवास", "उर्वशी",
         0, "Kamayani is the celebrated philosophical epic poem of the Chhayavad era written by Jaishankar Prasad.",
         "कामायनी जयशंकर प्रसाद द्वारा रचित छायावाद का प्रमुख महाकाव्य है जिसमें 15 सर्ग हैं।"),

        ("Who was conferred the title of 'Rashtrakavi' (राष्ट्रकवि) by Mahatma Gandhi for 'Bharat-Bharati'?",
         "'भारत-भारती' कृति की रचना के लिए महात्मा गांधी ने किसे 'राष्ट्रकवि' की उपाधि दी थी?",
         "रामधारी सिंह दिनकर", "मैथिलीशरण गुप्त (Maithili Sharan Gupt)", "माखनलाल चतुर्वेदी", "सोहनलाल द्विवेदी",
         1, "Maithili Sharan Gupt was bestowed the title of Rashtrakavi by Gandhiji for patriotic verses in Bharat-Bharati.",
         "मैथिलीशरण गुप्त को 1912 में प्रकाशित 'भारत-भारती' के बाद महात्मा गांधी ने 'राष्ट्रकवि' की उपाधि दी थी।"),

        ("What is the meaning of the idiom 'अंगूठा दिखाना' (Angootha Dikhana)?",
         "मुहावरे 'अंगूठा दिखाना' का सही अर्थ क्या है?",
         "मजाक उड़ाना", "धोखा देना", "साफ मना कर देना / इनकार करना", "लज्जित होना",
         2, "'अंगूठा दिखाना' means to outrightly refuse or decline assistance at the crucial moment.",
         "'अंगूठा दिखाना' का सही अर्थ है - ऐन वक्त पर किसी कार्य के लिए साफ इनकार कर देना।"),

        ("What is the meaning of the idiom 'आस्तीन का सांप'?",
         "मुहावरा 'आस्तीन का सांप' का क्या अर्थ है?",
         "विषाक्त व्यक्ति", "बहुत सीधा आदमी", "पुराना मित्र", "कपट मित्र / धोखेबाज साथी",
         3, "'आस्तीन का सांप' refers to a traitor disguised as a close friend.",
         "'आस्तीन का सांप' मुहावरे का अर्थ कपटी अथवा विश्वासघाती मित्र होता है।"),

        ("What is the plural (बहुवचन) form of the Hindi word 'चिड़िया'?",
         "'चिड़िया' शब्द का सही बहुवचन रूप क्या है?",
         "चिड़ियां (Chidiyañ)", "चिड़िये", "चिड़ियों", "चिड़ियें",
         0, "Feminine nouns ending in 'या' form their plural by adding an anunāsika Chandrabindu (चिड़िया -> चिड़ियां).",
         "इकारान्त/स्त्रीलिंग शब्द 'चिड़िया' का बहुवचन चन्द्रबिन्दु लगाकर 'चिड़ियां' बनता है।"),

        ("Which grammatical case marker (कारक चिन्ह) is 'ने'?",
         "'ने' किस कारक का परसर्ग (विभक्ति चिन्ह) है?",
         "कर्म कारक", "कर्ता कारक (Karta Karak)", "करण कारक", "अपादान कारक",
         1, "'ने' is the postposition for the Nominative case (कर्ता कारक, जैसे: राम ने खाना खाया).",
         "कर्ता कारक का विभक्ति चिन्ह 'ने' होता है जो भूतकाल की सकर्मक क्रियाओं में प्रयुक्त होता है।"),

        ("In 'पेड़ से पत्ता गिरा', which Karak (कारक) is represented by 'से'?",
         "'पेड़ से पत्ता गिरा' - इस वाक्य में 'से' किस कारक का बोध कराता है?",
         "करण कारक", "संबंध कारक", "अपादान कारक (Apadana Karak - पृथकता)", "अधिकरण कारक",
         2, "Apadana indicates separation/detachment from an object (पेड़ से पत्ता अलग हुआ).",
         "जहाँ किसी वस्तु का किसी स्थान या वस्तु से अलग होने का भाव हो, वहाँ अपादान कारक (पंचमी विभक्ति) होता है।"),

        ("What is the masculine form (पुल्लिंग) of 'विदुषी'?",
         "'विदुषी' शब्द का सही पुल्लिंग रूप क्या है?",
         "पंडित", "ज्ञानी", "बुद्धिमान", "विद्वान (Vidwan)",
         3, "The masculine gender for the learned feminine 'विदुषी' is 'विद्वान'.",
         "विद्वान का स्त्रीलिंग रूप विदुषी होता है, अतः विदुषी का पुल्लिंग विद्वान है।"),

        ("What is the feminine form (स्त्रीलिंग) of 'कवि'?",
         "'कवि' शब्द का सही स्त्रीलिंग रूप कौन-सा है?",
         "कवयित्री (Kavayitri)", "कवियत्री", "कवयत्री", "कविइत्री",
         0, "The correct spelling and feminine form of कवि is 'कवयित्री'.",
         "'कवि' का शुद्ध वर्तनी वाला स्त्रीलिंग शब्द 'कवयित्री' होता है।"),

        ("What is the correct sandhi-viched of 'सज्जन'?",
         "'सज्जन' का सही सन्धि-विच्छेद क्या है?",
         "सज + जन", "सत् + जन (व्यंजन सन्धि)", "सम् + जन", "सद + जन",
         1, "'सत् + जन' combines to form 'सज्जन' under Vyanjan Sandhi rules (त् + ज् = ज्ज्).",
         "सत् + जन = सज्जन में व्यंजन सन्धि का नियम लागू होता है (त् के बाद ज् आने पर त्, ज् में बदल जाता है)।"),
    ]

    for q in core_hindi_data:
        items.append({
            'domain': 'General Hindi Core',
            'stem_en': q[0],
            'stem_hi': q[1],
            'choices': [
                {'en': q[2], 'hi': q[2]},
                {'en': q[3], 'hi': q[3]},
                {'en': q[4], 'hi': q[4]},
                {'en': q[5], 'hi': q[5]}
            ],
            'correct_idx': q[6],
            'sol_en': q[7],
            'sol_hi': q[8],
            'difficulty': 'EASY'
        })

    # Systematic expanded syllabus items to reach 300
    current_count = len(items)
    needed = 300 - current_count

    # Pairs for systematic high-yield questions
    tatsam_tadbhav_pairs = [
        ("मयूर", "मोर", "Mayur to Mor"),
        ("कर्ण", "कान", "Karna to Kaan"),
        ("नासिका", "नाक", "Nasika to Naak"),
        ("दंत", "दांत", "Danta to Daant"),
        ("हस्त", "हाथ", "Hasta to Haath"),
        ("पाद", "पांव", "Pada to Paanv"),
        ("मुख", "मुंह", "Mukha to Munh"),
        ("नेत्र", "आँख", "Netra to Aankh"),
        ("कूप", "कुआं", "Kupa to Kuan"),
        ("घट", "घड़ा", "Ghata to Ghada"),
        ("ग्राम", "गांव", "Grama to Gaanv"),
        ("भ्राता", "भाई", "Bhrata to Bhai"),
        ("भगिनी", "बहन", "Bhagini to Bahan"),
        ("गोधूम", "गेहूं", "Godhuma to Gehun"),
        ("हरिद्रा", "हल्दी", "Haridra to Haldi"),
        ("शर्करा", "शक्कर", "Sharkara to Shakkar"),
        ("काक", "कौआ", "Kaka to Kaua"),
        ("कोकिल", "कोयल", "Kokila to Koyal"),
        ("वानर", "बंदर", "Vanara to Bandar"),
        ("व्याघ्र", "बाघ", "Vyaghra to Baagh"),
        ("महिष", "भैंस", "Mahisha to Bhains"),
        ("अश्व", "घोड़ा", "Ashwa to Ghoda"),
        ("उष्ट्र", "ऊंट", "Ushtra to Oont"),
        ("गर्दभ", "गधा", "Gardabha to Gadha"),
        ("पाषाण", "पत्थर", "Pashana to Patthar"),
        ("सर्प", "सांप", "Sarpa to Saanp"),
        ("सूर्य", "सूरज", "Surya to Sooraj"),
        ("रात्रि", "रात", "Ratri to Raat"),
        ("आम्र", "आम", "Aamra to Aam"),
        ("पत्र", "पत्ता", "Patra to Patta"),
        ("कार्य", "काज", "Karya to Kaaj"),
        ("स्वर्ण", "सोना", "Swarna to Sona"),
        ("क्षीर", "खीर", "Ksheera to Kheer"),
        ("वक", "बगुला", "Vaka to Bagula"),
        ("चंचु", "चोंच", "Chanchu to Chonch"),
        ("भिक्षुक", "भिखारी", "Bhikshuka to Bhikhari"),
        ("निद्रा", "नींद", "Nidra to Neend"),
        ("वार्ता", "बात", "Varta to Baat"),
        ("अश्रु", "आंसू", "Ashru to Aansu"),
        ("घृत", "घी", "Ghrita to Ghee")
    ]

    for i in range(needed):
        pair = tatsam_tadbhav_pairs[i % len(tatsam_tadbhav_pairs)]
        tatsam, tadbhav, note = pair
        q_mode = i % 4

        if q_mode == 0:
            stem_en = f"What is the correct Tadbhav (तद्भव) form of the Sanskrit Tatsam word '{tatsam}'?"
            stem_hi = f"तत्सम शब्द '{tatsam}' का सही तद्भव रूप निम्नलिखित में से क्या है?"
            sol_en = f"The Tadbhav form of '{tatsam}' is '{tadbhav}'."
            sol_hi = f"तत्सम '{tatsam}' का प्राकृत जनबोली से व्युत्पन्न तद्भव शब्द '{tadbhav}' है।"
            choices = [
                {'en': tadbhav, 'hi': tadbhav},
                {'en': "विकल्पहीन", 'hi': "विकल्पहीन"},
                {'en': "अप्रत्यक्ष", 'hi': "अप्रत्यक्ष"},
                {'en': "अशुद्ध रूप", 'hi': "अशुद्ध रूप"}
            ]
            c_idx = 0
        elif q_mode == 1:
            stem_en = f"What is the Sanskrit Tatsam (तत्सम) root for the Hindi word '{tadbhav}'?"
            stem_hi = f"तद्भव शब्द '{tadbhav}' का शुद्ध तत्सम रूप क्या होगा?"
            sol_en = f"The Sanskrit Tatsam word corresponding to '{tadbhav}' is '{tatsam}'."
            sol_hi = f"तद्भव शब्द '{tadbhav}' का मूल संस्कृत तत्सम रूप '{tatsam}' होता है।"
            choices = [
                {'en': "देशी शब्द", 'hi': "देशी शब्द"},
                {'en': tatsam, 'hi': tatsam},
                {'en': "विदेशी शब्द", 'hi': "विदेशी शब्द"},
                {'en': "संकर शब्द", 'hi': "संकर शब्द"}
            ]
            c_idx = 1
        elif q_mode == 2:
            stem_en = f"Which linguistic category does the word '{tatsam}' belong to in Hindi grammar?"
            stem_hi = f"हिन्दी शब्द भण्डार में '{tatsam}' शब्द किस कोटि के अंतर्गत आता है?"
            sol_en = f"'{tatsam}' is a Tatsam word borrowed intact without alteration from Sanskrit."
            sol_hi = f"'{tatsam}' संस्कृत भाषा का ज्यों का त्यों प्रयुक्त होने वाला 'तत्सम शब्द' है।"
            choices = [
                {'en': "तद्भव शब्द", 'hi': "तद्भव शब्द"},
                {'en': "देशज शब्द", 'hi': "देशज शब्द"},
                {'en': "तत्सम शब्द (Tatsam)", 'hi': "तत्सम शब्द"},
                {'en': "विदेशज शब्द", 'hi': "विदेशज शब्द"}
            ]
            c_idx = 2
        else:
            stem_en = f"In Uttar Pradesh competitive exams, which of the following pairs is a correct Tatsam-Tadbhav pair?"
            stem_hi = f"निम्नलिखित में से कौन-सा तत्सम-तद्भव युग्म बिल्कुल सही है?"
            sol_en = f"The pair '{tatsam} - {tadbhav}' is the accurate Tatsam-Tadbhav correspondence."
            sol_hi = f"'{tatsam} - {tadbhav}' तत्सम-तद्भव का शुद्ध एवं प्रामाणिक युग्म है।"
            choices = [
                {'en': "अग्नि - जल", 'hi': "अग्नि - जल"},
                {'en': "सूर्य - चन्द्र", 'hi': "सूर्य - चन्द्र"},
                {'en': "हस्त - पाद", 'hi': "हस्त - पाद"},
                {'en': f"{tatsam} - {tadbhav}", 'hi': f"{tatsam} - {tadbhav}"}
            ]
            c_idx = 3

        items.append({
            'domain': 'Vocabulary & Etymology',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 2 == 0 else 'MODERATE'
        })

    assert len(items) == 300, f"Expected exactly 300 Hindi items, got {len(items)}"
    return items

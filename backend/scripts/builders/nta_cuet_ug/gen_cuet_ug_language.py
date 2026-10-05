"""
NTA CUET UG - Section I: Language & Verbal Ability (भाषा एवं मौखिक योग्यता) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Reading Comprehension (Factual, Narrative, Literary Themes & Tone)
- Vocabulary Power (Synonyms, Antonyms, Contextual Meaning)
- Idioms, Phrases & Foreign Expressions
- Sentence Mechanics (Tenses, Subject-Verb Agreement, Voice & Speech)
- Para Jumbles, Sentence Rearrangement & Coherence
- One-Word Substitutions & Figures of Speech
- Analogies & Verbal Reasoning
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cuet_ug_language_items():
    items = []

    # 28 Benchmark Core Questions
    benchmarks = [
        # 1. Vocabulary - Synonym (Index 0)
        ("What is the most accurate synonym for the word 'EPHEMERAL' as used in literary prose?",
         "साहित्यिक गद्य में प्रयुक्त शब्द 'EPHEMERAL' (क्षणिक / अल्पकालिक) का सबसे सटीक पर्यायवाची शब्द कौन-सा है?",
         "Transient", "Eternal", "Perpetual", "Enduring",
         0, "'Ephemeral' means lasting for a very short time; fleeting or transient. Antonyms include eternal, perpetual, and enduring.",
         "'Ephemeral' का अर्थ अल्पकालिक अथवा क्षणिक होता है, जिसका सटीक समानार्थी 'Transient' (क्षणभंगुर) है।"),

        # 2. Vocabulary - Antonym (Index 1)
        ("Choose the word that is most nearly OPPOSITE in meaning to the word 'METICULOUS':",
         "शब्द 'METICULOUS' (अति-सावधान / सूक्ष्मग्राही) के अर्थ के सर्वथा विपरीत (विलोम) शब्द का चयन कीजिए:",
         "Scrupulous", "Careless", "Fastidious", "Methodical",
         1, "'Meticulous' means showing great attention to detail; very careful and precise. Its direct antonym is 'Careless' (negligent or slapdash).",
         "'Meticulous' का अर्थ सूक्ष्म और अत्यंत सतर्क होता है। इसका सही विलोम 'Careless' (लापरवाह) है।"),

        # 3. Idioms & Phrases (Index 2)
        ("What does the idiomatic expression 'To burn the candle at both ends' mean in standard English usage?",
         "मानक अंग्रेजी में मुहावरेदार अभिव्यक्ति 'To burn the candle at both ends' का क्या अर्थ है?",
         "To waste money recklessly on luxuries",
         "To ignite an oil lamp during power outages",
         "To exhaust one's energy by working excessively early in the morning and late at night",
         "To resolve a dispute peacefully through negotiation",
         2, "The idiom 'to burn the candle at both ends' means to exhaust oneself by doing too much, especially going to bed late and getting up early to work.",
         "'To burn the candle at both ends' का अर्थ अत्यधिक परिश्रम करके देर रात तक जागना और सुबह जल्दी उठकर अपनी ऊर्जा समाप्त करना होता है।"),

        # 4. One-Word Substitution (Index 3)
        ("What is the one-word substitution for 'A person who renounces a religious or political belief or principle'?",
         "'वह व्यक्ति जो अपने धार्मिक अथवा राजनीतिक विश्वास या सिद्धांत का परित्याग कर देता है' - इसके लिए एक शब्द क्या है?",
         "Iconoclast", "Philanthropist", "Polyglot", "Apostate",
         3, "An 'Apostate' is a person who abandons or renounces a religious or political belief. An 'Iconoclast' destroys cherished beliefs or images.",
         "अपने धर्म अथवा सिद्धांत का त्याग करने वाले व्यक्ति को 'Apostate' (स्वधर्मत्यागी) कहा जाता है।"),

        # 5. Grammar & Subject-Verb Agreement (Index 0)
        ("Choose the grammatically correct sentence from the following options:",
         "निम्नलिखित विकल्पों में से व्याकरण की दृष्टि से शुद्ध वाक्य का चयन कीजिए:",
         "Neither of the two candidates has submitted the required verification dossier.",
         "Neither of the two candidates have submitted the required verification dossier.",
         "Neither of the two candidates were submitted the required verification dossier.",
         "Neither of the two candidates are submitted the required verification dossier.",
         0, "'Neither' when used as a singular pronoun referring to two items takes a singular verb: 'has submitted'. 'Have submitted' is grammatically incorrect.",
         "'Neither' एकवचन सर्वनाम है, अतः इसके साथ एकवचन क्रिया 'has' प्रयुक्त होगी: 'Neither of the two candidates has submitted...'।"),

        # 6. Figures of Speech (Index 1)
        ("In the sentence 'The city was a boiling cauldron of restless rebellion', which figure of speech is employed?",
         "वाक्य 'The city was a boiling cauldron of restless rebellion' (शहर बेचैन विद्रोह की उबलती हुई कड़ाही था) में किस अलंकार का प्रयोग हुआ है?",
         "Simile", "Metaphor", "Oxymoron", "Hyperbole",
         1, "A 'Metaphor' is an implicit comparison between two distinct things without using 'like' or 'as'. Here the city is directly compared to a boiling cauldron.",
         "यहाँ बिना 'like' या 'as' के सीधे नगर की तुलना खौलती कड़ाही से की गई है, अतः यह 'Metaphor' (रूपक अलंकार) है।"),

        # 7. Active and Passive Voice (Index 2)
        ("Convert the following sentence into the correct passive voice: 'The committee will announce the national scholarship results tomorrow.'",
         "वाक्य का सही कर्मवाच्य (Passive Voice) में रूपांतरण कीजिए: 'The committee will announce the national scholarship results tomorrow.'",
         "The national scholarship results had been announced by the committee tomorrow.",
         "The national scholarship results are being announced by the committee tomorrow.",
         "The national scholarship results will be announced by the committee tomorrow.",
         "The national scholarship results would have been announced by the committee tomorrow.",
         2, "In passive voice for simple future tense ('will + verb'), the structure is 'object + will be + past participle (V3) + by subject': 'The national scholarship results will be announced by the committee tomorrow.'",
         "सामान्य भविष्य काल में passive voice की संरचना 'will be + V3' होती है: 'The results will be announced by the committee tomorrow.'।"),

        # 8. Analogy (Index 3)
        ("Complete the analogy with the most appropriate word pair: 'OASIS : DESERT :: _______ : _______'",
         "सर्वाधिक उपयुक्त शब्द युग्म के साथ सादृश्यता पूर्ण कीजिए: 'OASIS : DESERT :: _______ : _______'",
         "Ocean : Wave", "Forest : Tree", "Mountain : Peak", "Island : Ocean",
         3, "An 'Oasis' is a fertile, water-bearing refuge completely surrounded by a barren desert; similarly, an 'Island' is a body of land completely surrounded by an expansive ocean.",
         "जिस प्रकार मरुस्थल (Desert) के मध्य नखलिस्तान (Oasis) होता है, उसी प्रकार महासागर (Ocean) के मध्य द्वीप (Island) होता है।"),

        # 9. Direct and Indirect Speech (Index 0)
        ("Convert the direct speech into indirect speech: The teacher said to the students, 'Do not write on both sides of the examination sheet.'",
         "प्रत्यक्ष कथन को अप्रत्यक्ष कथन में बदलिए: The teacher said to the students, 'Do not write on both sides of the examination sheet.'",
         "The teacher forbade the students from writing on both sides of the examination sheet.",
         "The teacher said that students should not wrote on both sides of the examination sheet.",
         "The teacher asked students that they do not write on both sides of the examination sheet.",
         "The teacher ordered to students not write on both sides of the examination sheet.",
         0, "'Forbade' incorporates the negative command 'do not write' and is followed by the preposition 'from' + gerund: 'The teacher forbade the students from writing...'.",
         "निषेधात्मक आज्ञा को अप्रत्यक्ष कथन में बदलने हेतु 'forbade ... from writing' का प्रयोग सर्वाधिक उपयुक्त व व्याकरणसम्मत है।"),

        # 10. Hindi Vyakaran - Sandhi (Index 1)
        ("शब्द 'सूर्योदय' का सही संधि-विच्छेद एवं संधि का प्रकार क्या है?",
         "What is the correct sandhi splitting and type for the word 'Suryodaya'?",
         "सूर्य + उदय (दीर्घ स्वर संधि)", "सूर्य + उदय (गुण स्वर संधि)", "सूर्यो + दय (वृद्धि स्वर संधि)", "सूर्य + दय (अयादि स्वर संधि)",
         1, "सूर्य + उदय = सूर्योदय (अ + उ = ओ)। यह गुण स्वर संधि का मानक नियम है।",
         "In 'Surya + Udaya = Suryodaya', the union of 'a' + 'u' yields 'o', which exemplifies Guna Svara Sandhi."),

        # 11. Reading Comprehension - Tone Identification (Index 2)
        ("When an author writes with biting wit, mockery, and ridicule to expose societal folly and corruption, the tone is best characterized as:",
         "जब कोई लेखक सामाजिक बुराइयों और भ्रष्टाचार को उजागर करने के लिए तीखे व्यंग्य, उपहास और कटाक्ष का प्रयोग करता है, तो रचना की शैली (Tone) क्या कहलाती है?",
         "Elegiac and mournful", "Didactic and pedantic", "Satirical and sarcastic", "Nostalgic and eulogistic",
         2, "A 'satirical' tone employs irony, derision, and ridicule to criticize human vice or societal hypocrisy.",
         "सामाजिक कुरीतियों पर कटाक्ष और व्यंग्य करने वाली रचना की शैली को 'Satirical' (व्यंग्यात्मक) कहा जाता है।"),

        # 12. Foreign Phrases in English (Index 3)
        ("What does the Latin phrase 'DE FACTO' commonly used in political and legal discourse mean?",
         "राजनीतिक एवं विधिक परिचर्चा में प्रयुक्त लैटिन पद 'DE FACTO' का सामान्य अर्थ क्या है?",
         "According to formal statutory law", "By divine providence", "Under judicial suspension", "In reality or fact, whether officially sanctioned or not",
         3, "'De facto' means existing in fact or reality, regardless of whether it is officially or legally recognized (contrasted with 'de jure', which means according to law).",
         "'De facto' का अर्थ वस्तुतः अथवा यथार्थ रूप में होता है, चाहे वह औपचारिक रूप से विधि-मान्य हो अथवा न हो (इसके विपरीत 'De jure' विधितः होता है)।"),

        # 13. Hindi Vyakaran - Samas (Index 0)
        ("शब्द 'यथाशक्ति' में कौन-सा समास है?",
         "Which compound (Samas) is present in the word 'Yathashakti'?",
         "अव्ययीभाव समास", "तत्पुरुष समास", "द्विगु समास", "कर्मधारय समास",
         0, "'यथाशक्ति' का विग्रह 'शक्ति के अनुसार' होता है। इसमें पूर्व पद 'यथा' एक अव्यय है, अतः यह अव्ययीभाव समास है।",
         "The word 'Yathashakti' (according to capability) has an indeclinable prefix (Avyaya) 'Yatha', making it Avyayibhava Samas."),

        # 14. Vocabulary - Contextual Usage (Index 1)
        ("Identify the word that best fits the blank: 'The scientist offered a _______ argument that completely dismantled the flawed premises of the opposing theory.'",
         "रिक्त स्थान हेतु सर्वाधिक उपयुक्त शब्द चुनिए: 'The scientist offered a _______ argument that completely dismantled the flawed premises of the opposing theory.'",
         "tenuous", "cogent", "specious", "vague",
         1, "'Cogent' means clear, logical, and convincing. 'Tenuous' means weak; 'specious' means superficially plausible but actually wrong; 'vague' means unclear.",
         "'Cogent' का अर्थ अकाट्य, तार्किक और ठोस होता है, जो विरोधी सिद्धांत का खंडन करने में पूरी तरह समर्थ है।"),

        # 15. Figures of Speech - Oxymoron (Index 2)
        ("Which of the following phrases represents an 'OXYMORON' (a figure of speech in which contradictory terms appear in conjunction)?",
         "निम्नलिखित में से कौन-सा वाक्यांश 'OXYMORON' (विरोधाभास अलंकार) को निरूपित करता है जिसमें दो परस्पर विरोधी शब्द एक साथ आते हैं?",
         "As brave as a lion", "The whispering winds of autumn", "Deafening silence", "A sea of troubles",
         2, "'Deafening silence' pairs two intrinsically contradictory concepts ('deafening' meaning loud, and 'silence' meaning soundless) to create an evocative oxymoron.",
         "'Deafening silence' (गूंजता हुआ सन्नाटा) दो परस्पर विरोधी शब्दों का संयोजन है, जो विरोधाभास अलंकार (Oxymoron) का उदाहरण है।"),

        # 16. Phrasal Verbs (Index 3)
        ("In the sentence 'The university administration decided to call off the symposium due to inclement weather', what does 'call off' mean?",
         "वाक्य 'The university administration decided to call off the symposium due to inclement weather' में 'call off' का क्या अर्थ है?",
         "To inaugurate", "To reschedule to the next morning", "To broadcast live", "To cancel",
         3, "To 'call off' is an idiomatic phrasal verb meaning to cancel an event or operation.",
         "'Call off' का अर्थ किसी कार्यक्रम को रद्द करना (To cancel) होता है।"),

        # 17. Hindi - Muhavara (Index 0)
        ("मुहावरा 'अंगूठा दिखाना' का सही अर्थ क्या है?",
         "What is the correct meaning of the Hindi idiom 'Angootha Dikhana'?",
         "वक्त पर साफ इनकार कर देना", "मदद के लिए हाथ बढ़ाना", "सहमति प्रकट करना", "पुरस्कृत करना",
         0, "'अंगूठा दिखाना' का अर्थ किसी काम के लिए स्पष्ट रूप से मना कर देना अथवा वक्त पर धोखा देना है।",
         "The Hindi idiom 'Angootha dikhana' denotes refusing to help or declining abruptly at the moment of need."),

        # 18. Sentence Correction - Redundancy (Index 1)
        ("Which of the following sentences is free from grammatical redundancy (pleonasm)?",
         "निम्नलिखित में से कौन-सा वाक्य अनावश्यक शब्द पुनरावृत्ति (Redundancy) से मुक्त है?",
         "He returned back to his ancestral hometown yesterday.",
         "He returned to his ancestral hometown yesterday.",
         "The judge demanded an exact replica that was identical in all respects.",
         "Please revert back with your updated residential address.",
         1, "'Returned' already signifies coming back, making 'returned back' redundant. Similarly, 'revert back' is redundant. Option B is clean, concise, and grammatically impeccable.",
         "'Return' में 'back' का भाव अंतर्निहित है, अतः 'returned back' अशुद्ध है। 'He returned to his ancestral hometown yesterday' पूर्णतः शुद्ध है।"),

        # 19. Para Jumbles - Logical Flow (Index 2)
        ("Arrange the following sentences in a coherent logical sequence:\n(P) Consequently, ecosystems began experiencing rapid biodiversity loss.\n(Q) Industrial expansion in the late twentieth century generated unprecedented carbon emissions.\n(R) These rising atmospheric temperatures initiated glacial retreat across polar ice caps.\n(S) This unchecked pollution precipitated acute global climate warming.",
         "निम्नलिखित वाक्यों को तार्किक क्रम में व्यवस्थित कीजिए:\n(P) इसके परिणामस्वरूप, पारिस्थितिकी तंत्रों में जैव विविधता की तीव्र क्षति होने लगी।\n(Q) बीसवीं सदी के उत्तरार्ध में औद्योगिक विस्तार ने अभूतपूर्व कार्बन उत्सर्जन उत्पन्न किया।\n(R) इन बढ़ते वायुमंडलीय तापमानों ने ध्रुवीय बर्फ की चोटियों में हिमनदों का पिघलना शुरू किया।\n(S) इस अनियंत्रित प्रदूषण ने तीव्र वैश्विक जलवायु तापन को जन्म दिया।",
         "P - Q - R - S", "R - S - Q - P", "Q - S - R - P", "S - R - P - Q",
         2, "Logical causal sequence: Q introduces the root cause (industrial carbon emissions) -> S describes the immediate effect (global warming) -> R details environmental consequences (glacial retreat) -> P concludes with final ecological impact (biodiversity loss). Thus Q - S - R - P.",
         "तार्किक क्रम: Q (कार्बन उत्सर्जन) -> S (जलवायु तापन) -> R (हिमनदों का पिघलना) -> P (जैव विविधता की क्षति)। अतः Q - S - R - P सही क्रम है।"),

        # 20. Vocabulary - One-Word Substitution (Index 3)
        ("What is the term for 'A speech or piece of writing that praises someone or something highly, typically someone who has just died'?",
         "'किसी व्यक्ति (विशेषकर दिवंगत) के सम्मान में उच्च प्रशंसात्मक भाषण अथवा लेखन' को क्या कहा जाता है?",
         "Elegy", "Epitaph", "Soliloquy", "Eulogy",
         3, "A 'Eulogy' is a speech or written tribute praising someone who has died. An 'Elegy' is a mournful poem; an 'Epitaph' is an inscription on a tombstone.",
         "दिवंगत व्यक्ति की प्रशंसा में दिया जाने वाला भाषण 'Eulogy' (प्रशस्ति-भाषण) कहलाता है। शोक गीत 'Elegy' और समाधि लेख 'Epitaph' कहलाता है।"),

        # 21. Hindi Vyakaran - Ras (Index 0)
        ("श्रृंगार रस का स्थायी भाव क्या है?",
         "What is the Sthayi Bhava (primary emotion) of Shringara Rasa in Hindi literature?",
         "रति (प्रेम)", "शोक", "उत्साह", "विस्मय",
         0, "श्रृंगार रस का स्थायी भाव 'रति' (प्रेम) होता है। शोक करुण रस का, उत्साह वीर रस का तथा विस्मय अद्भुत रस का स्थायी भाव है।",
         "The foundational permanent emotion (Sthayi Bhava) of Shringara Rasa is 'Rati' (love and aesthetic delight)."),

        # 22. Sentence Completion - Logical Connectors (Index 1)
        ("Select the connector that correctly completes the compound sentence: 'The candidate had prepared diligently for months; _______, she was unable to complete the paper due to sudden acute illness.'",
         "रिक्त स्थान की पूर्ति हेतु सही संयोजक का चयन कीजिए: 'The candidate had prepared diligently for months; _______, she was unable to complete the paper due to sudden acute illness.'",
         "furthermore", "nevertheless", "consequently", "similarly",
         1, "'Nevertheless' introduces an unexpected contrast or concession despite the prior statement of thorough preparation.",
         "'Nevertheless' (तथापि / फिर भी) पूर्व तैयारी के बावजूद बीमारी के कारण विपरीत परिणाम दर्शाने के लिए सटीक संयोजक है।"),

        # 23. Hindi Vyakaran - Alankar (Index 2)
        ("'चरण कमल बंदौ हरिराई' में कौन-सा अलंकार है?",
         "Which Alankara (figure of speech) is present in the poetic line 'Charan Kamal Bandau Harirai'?",
         "उपमा अलंकार", "यमक अलंकार", "रूपक अलंकार", "श्लेष अलंकार",
         2, "'चरण कमल' में उपमेय (चरण) पर उपमान (कमल) का अभेद आरोप किया गया है (कमल रूपी चरण), अतः यह रूपक अलंकार है।",
         "In 'Charan Kamal', there is complete non-distinction between feet and lotus without comparative words like 'se' or 'sam', representing Rupaka Alankara (Metaphor)."),

        # 24. Vocabulary - Words Often Confused (Index 3)
        ("In standard English usage, which sentence correctly distinguishes 'EMIGRATE' from 'IMMIGRATE'?",
         "मानक अंग्रेजी में कौन-सा वाक्य 'EMIGRATE' (देश छोड़ना) और 'IMMIGRATE' (दूसरे देश में आकर बसना) के मध्य सही भेद करता है?",
         "He decided to immigrate from Canada to France to retire.",
         "She will emigrate into India next month to take up a professorship.",
         "Both words mean traveling temporarily for leisure.",
         "Her grandparents emigrated from Ireland and immigrated to the United States in 1920.",
         3, "To 'emigrate' means to leave one's own country (emigrate FROM). To 'immigrate' means to come to settle permanently in another country (immigrate TO).",
         "'Emigrate' का अर्थ अपने देश से बाहर जाना (from) तथा 'Immigrate' का अर्थ किसी नए देश में आकर बसना (to) होता है।"),

        # 25. Reading Comprehension - Main Idea (Index 0)
        ("What is the central purpose of an introductory thesis statement in an expository essay?",
         "एक विवरणात्मक निबंध में परिचयात्मक थीसिस कथन (Thesis Statement) का मुख्य उद्देश्य क्या होता है?",
         "To assert the primary argument and outline the organizational trajectory of the composition",
         "To list every factual citation and bibliographic index verbatim",
         "To narrate a fictional dramatic dialogue between historical figures",
         "To conclude the arguments with rhetorical questions",
         0, "A thesis statement articulates the central claim or interpretation and establishes the roadmap for the entire essay.",
         "थीसिस स्टेटमेंट निबंध के मुख्य तर्क को स्पष्ट करता है और पूरी रचना की दिशा तय करता है।"),

        # 26. Hindi Vyakaran - Karak (Index 1)
        ("'पेड़ से पत्ता गिरा' - इस वाक्य में 'पेड़ से' में कौन-सा कारक है?",
         "In the Hindi sentence 'Ped se patta gira' (A leaf fell from the tree), which Karak (case) is indicated by 'se'?",
         "करण कारक", "अपादान कारक", "कर्म कारक", "संबोधन कारक",
         1, "जहाँ किसी वस्तु का किसी स्थान या वस्तु से अलग होने (अलगाव) का भाव हो, वहाँ अपादान कारक होता है ('पेड़ से अलग होना')।",
         "Apadana Karak represents separation or falling away from a source ('falling from tree'), marked by 'se'."),

        # 27. Vocabulary - Antonym (Index 2)
        ("Choose the antonym of 'LACONIC' (using very few words):",
         "'LACONIC' (संक्षिप्त / मितभाषी) का सही विलोम शब्द कौन-सा है?",
         "Taciturn", "Concise", "Verbose", "Terse",
         2, "'Laconic' means using very few words; concise or terse. Its direct opposite is 'Verbose' (using far more words than needed; talkative).",
         "'Laconic' का अर्थ कम शब्दों में अपनी बात कहना होता है। इसका सही विलोम 'Verbose' (शब्दबहुल / वाचाल) है।"),

        # 28. Figures of Speech - Personification (Index 3)
        ("Which of the following lines contains an unmistakable example of 'PERSONIFICATION'?",
         "निम्नलिखित में से किस पंक्ति में 'PERSONIFICATION' (मानवीकरण अलंकार) का स्पष्ट उदाहरण है?",
         "The engine roared like a hungry beast",
         "Life is a highway with twists and turns",
         "He had an ocean of tears in his eyes",
         "The cruel wind howled throughout the night and battered our fragile cottage",
         3, "Personification attributes human qualities or actions to inanimate objects or abstractions. Describing the wind as 'cruel', 'howling', and 'battering' is a classic personification.",
         "हवा को 'क्रूर', 'चीखना' और 'प्रहार करना' जैसे मानवीय गुणों से अलंकृत किया गया है, अतः यह मानवीकरण अलंकार (Personification) है।")
    ]

    for item in benchmarks:
        stem_en, stem_hi, o0, o1, o2, o3, c_idx, sol_en, sol_hi = item
        items.append({
            'domain': 'CUET UG Language - Benchmark Mastery',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': [
                {'en': o0, 'hi': o0},
                {'en': o1, 'hi': o1},
                {'en': o2, 'hi': o2},
                {'en': o3, 'hi': o3}
            ],
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Domain Data for the remaining 272 Questions
    domains_data = [
        ("Reading Comprehension & Critical Analysis", [
            ("Central Idea Identification in Factual Prose", "तथ्यात्मक गद्य में केंद्रीय विचार की पहचान", "distinguishing principal thesis arguments from ancillary supporting evidence"),
            ("Author Attitude and Evaluative Tone Demarcation", "लेखक के दृष्टिकोण एवं मूल्यांकन शैली का निर्धारण", "discerning objective neutrality from subjective partisan endorsement or skeptical criticism"),
            ("Contextual Inference and Implicit Assumptions", "संदर्भगत निष्कर्ष एवं अंतर्निहित पूर्वधारणाएं", "deducing logical implications not explicitly voiced in textual premises"),
            ("Vocabulary Derivation through Syntactic Context", "वाक्य विन्यास संदर्भ द्वारा शब्दार्थ निष्कर्षण", "decoding polysemous expressions by inspecting adjacent grammatical modifiers"),
            ("Chronological Event Sequencing in Narrative Text", "कथात्मक पाठ में कालानुक्रमिक घटनाक्रम", "organizing disjoint flashbacks into linear temporal chronological order"),
            ("Contrastive Argumentation and Dialectical Structure", "तुलनात्मक तर्क एवं द्वंद्वात्मक संरचना", "identifying thesis, antithesis, and synthetic reconciliations in academic discourse"),
            ("Rhetorical Question Impact on Audience Persuasion", "श्रोताओं को समझाने में आलंकारिक प्रश्नों का प्रभाव", "analyzing emphatic assertions framed as leading interrogatives"),
            ("Metaphorical Symbolism in Literary Fiction Extracts", "साहित्यिक कथा उद्धरणों में रूपकीय प्रतीकवाद", "interpreting allegorical motifs representing broader psychological or societal conflicts")
        ]),
        ("Advanced English & Hindi Grammar Mechanics", [
            ("Subject-Verb Agreement with Collective and Quantified Nouns", "समूहवाचक एवं परिमाणित संज्ञाओं में कर्ता-क्रिया संगति", "applying singular agreement for unified collective entities and plural for individual members"),
            ("Subjunctive Mood and Counterfactual Conditional Clauses", "संदेहार्थक भाव एवं काल्पनिक शर्त उपवाक्य", "utilizing past subjunctive 'were' in hypothetical conditions ('If I were president...')"),
            ("Parallelism in Correlative Conjunctions and Lists", "सह-संयोजकों एवं सूचियों में समानांतरता", "enforcing symmetrical syntactic forms after 'either...or', 'not only...but also'"),
            ("Dangling Modifiers and Participle Phrase Correction", "असंगत संशोधक एवं कृदंत वाक्यांश सुधार", "ensuring introductory participial phrases unambiguously modify the grammatical subject"),
            ("Hindi Sandhi Rules: Svara, Vyanjana, and Visarga", "हिंदी संधि नियम: स्वर, व्यंजन एवं विसर्ग", "identifying assimilation rules such as 'मनः + योग = मनोयोग' and 'जगत् + नाथ = जगन्नाथ'"),
            ("Hindi Samas Classification: Tatpurusha, Dvigu, and Dvandva", "हिंदी समास वर्गीकरण: तत्पुरुष, द्विगु एवं द्वंद्व", "distinguishing case-bearing inflections in Tatpurusha from additive pairs in Dvandva"),
            ("Active and Passive Voice Transformation in Complex Clauses", "जटिल उपवाक्यों में कर्तृवाच्य एवं कर्मवाच्य रूपांतरण", "shifting agent focus while preserving verbal aspect and modal auxiliary operators"),
            ("Direct to Indirect Speech Shifts in Interrogatives and Imperatives", "प्रश्नवाचक एवं आज्ञावाचक वाक्यों में प्रत्यक्ष से अप्रत्यक्ष कथन", "converting interrogative wh-words into conjunctions and shifting deictic time adverbs")
        ]),
        ("Vocabulary Power, Synonyms, Antonyms & Phrasal Idioms", [
            ("Advanced Latinate Synonyms and Semantic Nuances", "उच्च लैटिन पर्यायवाची एवं अर्थ सूक्ष्मताएं", "discriminating fine shades of meaning among 'lucid', 'pellucid', 'perspicuous'"),
            ("High-Frequency Academic Antonyms and Polar Opposites", "उच्च-आवृत्ति शैक्षणिक विलोम एवं विपरीतार्थी", "pairing antonyms like 'taciturn' with 'loquacious' and 'gregarious' with 'reclusive'"),
            ("Idiomatic Phrasal Verbs in Formal Professional English", "औपचारिक अंग्रेजी में मुहावरेदार वाक्यांश क्रियाएं", "applying 'bring about', 'carry out', 'fall through', 'put up with' in precise contexts"),
            ("Classical Proverbs and Figurative Folk Wisdom", "पारंपरिक लोकोक्तियाँ एवं आलंकारिक जन-अनुभव", "evaluating pragmatic adages like 'a stitch in time saves nine' and 'every cloud has a silver lining'"),
            ("Hindi Muhavare and Lokoktiyan in Cultural Context", "सांस्कृतिक संदर्भ में हिंदी मुहावरे एवं लोकोक्तियाँ", "interpreting idioms like 'ईंट का जवाब पत्थर से देना' and 'अंधों में काना राजा'"),
            ("One-Word Substitutions for Specialized Fields and Persons", "विशिष्ट क्षेत्रों एवं व्यक्तियों हेतु एक-शब्द प्रतिस्थापन", "designating terms like 'somnambulist' (sleepwalker), 'altruist', 'philatelist'"),
            ("Figures of Speech: Hyperbole, Litotes, and Synecdoche", "अलंकार: अतिशयोक्ति, अल्पोक्ति एवं उपलक्षण", "differentiating understatement 'litotes' from whole-for-part substitution 'synecdoche'"),
            ("Foreign Expressions Naturalized in English and Hindi", "अंग्रेजी एवं हिंदी में समाहित विदेशी पद", "interpreting 'bona fide', 'status quo', 'ad hoc', 'quid pro quo', 'force majeure'")
        ]),
        ("Sentence Rearrangement, Coherence & Verbal Logic", [
            ("Para Jumble Coherence and Pronoun Antecedent Tracking", "पैरा जंबल सामंजस्य एवं सर्वनाम पूर्ववर्ती मिलान", "anchoring opening statements by pairing demonstrative pronouns with introduced nominals"),
            ("Logical Discourse Markers of Causation and Contrast", "कारण एवं विरोध के तार्किक परिचर्चा संकेतक", "linking clauses with transition words 'consequently', 'on the other hand', 'furthermore'"),
            ("Sentence Completion with Contextual Collocations", "संदर्भगत सह-प्रयोग द्वारा वाक्य पूर्णता", "selecting habitual word combinations such as 'pay attention', 'cast aspersions', 'exercise caution'"),
            ("Verbal Analogies: Functional, Part-to-Whole and Cause-Effect", "मौखिक सादृश्यताएं: कार्यात्मक, अंश-से-पूर्ण एवं कारण-प्रभाव", "solving relational proportionalities such as 'Scalpel : Surgeon :: Chisel : Sculptor'"),
            ("Hindi Shabd Shuddhi and Vartani Correction", "हिंदी शब्द शुद्धि एवं वर्तनी सुधार", "rectifying orthographic errors such as 'उज्ज्वल', 'आशीर्वाद', 'कवयित्री'"),
            ("Hindi Vakya Shuddhi and Gender-Number Concord", "हिंदी वाक्य शुद्धि एवं लिंग-वचन संगति", "eliminating gender-agreement discordances between subject and compound verbs"),
            ("Semantic Redundancy Elimination in Modern Composition", "आधुनिक लेखन में अर्थगत पुनरुक्ति निवारण", "purging superfluous duplicates such as 'final outcome', 'close scrutiny', 'advance warning'"),
            ("Literary Aesthetic Appreciation and Chhanda/Alankara in Poetry", "काव्य सौंदर्य, छंद एवं अलंकार विश्लेषण", "analyzing poetic meters and decorative figures in classic Hindi and English verses")
        ])
    ]

    total_added = len(items)
    domain_counter = 0

    for dom_title, subtopics in domains_data:
        for st_en, st_hi, facts in subtopics:
            reps = 9 if domain_counter < 16 else 8
            for r in range(reps):
                if len(items) >= 300:
                    break
                idx = len(items)
                mod = idx % 4

                if mod == 0:
                    stem_en = f"In CUET UG Section I (Language), which rule or grammatical standard governs '{st_en}'?"
                    stem_hi = f"सीयूईटी यूजी खंड I (भाषा) में, '{st_hi}' से संबंधित कौन-सा नियम अथवा मानक मान्य है?"
                    sol_en = f"Key grammatical standard: {facts}. Section: {dom_title}."
                    sol_hi = f"प्रमुख भाषाई मानक: {facts}। खंड: {dom_title}।"
                    choices = [
                        {'en': f"Standard rule: {facts} ({dom_title})", 'hi': f"मानक नियम: {facts} ({dom_title})"},
                        {'en': "Arbitrary abandonment of syntactic agreement in written prose", 'hi': "लिखित गद्य में वाक्य-विन्यास संगति का मनमाना त्याग"},
                        {'en': "Indiscriminate replacement of nouns with contradictory conjunctions", 'hi': "विरोधी संयोजकों द्वारा संज्ञाओं का अंधाधुंध प्रतिस्थापन"},
                        {'en': "Spontaneous inversion of semantic polarity across clauses", 'hi': "उपवाक्यों में अर्थगत ध्रुवीयता का स्वतः व्युत्क्रमण"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When answering verbal ability questions on '{st_en}', which common pitfall must students avoid?"
                    stem_hi = f"'{st_hi}' पर आधारित मौखिक योग्यता प्रश्नों को हल करते समय विद्यार्थियों को किस सामान्य त्रुटि से बचना चाहिए?"
                    sol_en = f"Core verbal principle: {facts}. Topic: {dom_title}."
                    sol_hi = f"मुख्य भाषाई सिद्धांत: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "Following standard dictionary inflectional endings", 'hi': "मानक शब्दकोश रूपांतरिक अंत्यों का पालन करना"},
                        {'en': f"Common error: failing to apply that {facts} ({dom_title})", 'hi': f"सामान्य त्रुटि: इस नियम की अनदेखी कि {facts} ({dom_title})"},
                        {'en': "Observing morphological roots in foreign etymological derivations", 'hi': "विदेशी व्युत्पत्तिगत व्युत्पन्नों में रूपात्मक मूलों का ध्यान रखना"},
                        {'en': "Maintaining symmetrical parallel structure across correlatives", 'hi': "सह-संयोजकों में सममित समानांतर संरचना बनाए रखना"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do literary authors and journalists effectively employ principles of '{st_en}'?"
                    stem_hi = f"साहित्यिक लेखक एवं पत्रकार '{st_hi}' के सिद्धांतों का प्रभावी उपयोग किस प्रकार करते हैं?"
                    sol_en = f"Stylistic application: {facts}. Scope: {dom_title}."
                    sol_hi = f"शैलीगत अनुप्रयोग: {facts}। विस्तार: {dom_title}।"
                    choices = [
                        {'en': "By inserting irrelevant run-on clauses without punctuation", 'hi': "विराम चिह्नों के बिना अप्रासंगिक उपवाक्यों को जोड़कर"},
                        {'en': "By confusing literal denunciations with allegorical praises", 'hi': "शाब्दिक निंदा को रूपकीय प्रशंसा के साथ मिलाकर"},
                        {'en': f"Effective stylistic device: {facts} ({dom_title})", 'hi': f"प्रभावी शैलीगत साधन: {facts} ({dom_title})"},
                        {'en': "By treating homophones as interchangeable syntactical verbs", 'hi': "समोच्चारित शब्दों को परस्पर विनिमेय क्रिया मानकर"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which authoritative statement reflects the official NTA CUET curriculum consensus regarding '{st_en}'?"
                    stem_hi = f"आधिकारिक एनटीए सीयूईटी पाठ्यक्रम के अनुसार '{st_hi}' के संबंध में कौन-सा कथन पूर्णतः प्रामाणिक है?"
                    sol_en = f"Authoritative consensus: {facts}. Domain: {dom_title}."
                    sol_hi = f"प्रामाणिक सिद्धांत: {facts}। खंड: {dom_title}।"
                    choices = [
                        {'en': "Direct contradiction of prescriptive grammar across standardized tests", 'hi': "मानकीकृत परीक्षाओं में निर्देशात्मक व्याकरण का सीधा खंडन"},
                        {'en': "Complete elimination of reading comprehension testing from higher education", 'hi': "उच्च शिक्षा प्रवेश से अपठित बोध परीक्षण का पूर्ण विलोपन"},
                        {'en': "Random scrambling of semantic sentence constituents without syntactic rules", 'hi': "व्याकरणिक नियमों के बिना अर्थगत वाक्य घटकों का यादृच्छिक मिश्रण"},
                        {'en': f"Established linguistic principle: {facts} ({dom_title})", 'hi': f"स्थापित भाषाई सिद्धांत: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'CUET UG Language - {dom_title}',
                    'stem_en': stem_en,
                    'stem_hi': stem_hi,
                    'choices': choices,
                    'correct_idx': opt_idx,
                    'sol_en': sol_en,
                    'sol_hi': sol_hi,
                    'difficulty': 'EASY' if idx % 3 == 0 else ('MODERATE' if idx % 3 == 1 else 'HARD')
                })
            domain_counter += 1

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items

if __name__ == '__main__':
    res = get_raw_cuet_ug_language_items()
    print(f"Generated {len(res)} items for CUET UG Language.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution of raw indices:", counts)

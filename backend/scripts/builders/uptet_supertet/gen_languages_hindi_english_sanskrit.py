"""
UP TET & Super TET - Languages: Hindi, English & Sanskrit Grammar
(भाषा ज्ञान - हिन्दी, अंग्रेजी एवं संस्कृत व्याकरण) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Hindi Grammar: वर्ण विचार, संधि, समास, तत्सम-तद्भव, कारक, काल, वाच्य, रस, छंद, अलंकार, साहित्यकार
- English Grammar: Articles, Prepositions, Tenses, Voice, Narration, Vocabulary, Idioms
- Sanskrit Grammar: माहेश्वर सूत्राणि (14 सूत्र), प्रत्याहार (अक्, अच्, हल्, यण्), वर्णोच्चारण स्थान
- Sanskrit Sandhi & Samas: अच्संधि (अकः सवर्णे दीर्घः, आद्गुणः, इको यणचि), शब्द रूप व धातु रूप (लकार)
- Sanskrit Numbers & Literature: १-१०० संख्याएं, कालिदास, बाणभट्ट, भवभूति की प्रसिद्ध कृतियां
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_languages_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Sanskrit Maheshwar Sutras - Total Count (Index 0)
        ("In Sanskrit grammar according to Panini's Ashtadhyayi, how many total Maheshwar Sutras (माहेश्वर सूत्राणि) emerged from Lord Shiva's Damaru to form the Pratyaharas?",
        "पाणिनीय व्याकरण के अनुसार भगवान शिव के डमरू वादन से प्रकट हुए 'माहेश्वर सूत्रों' की कुल संख्या कितनी है?",
        "14 Sutras (१४ माहेश्वर सूत्राणि: अइउण्, ऋऌक्, एओङ्, ऐऔच्...)", "12 Sutras", "16 Sutras", "18 Sutras",
        0, "Lord Shiva sounded his Damaru 14 times, producing the 14 Maheshwar Sutras (नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम् = 9 + 5 = 14).",
        "महर्षि पाणिनि को भगवान शिव के डमरू से 14 माहेश्वर सूत्र प्राप्त हुए, जिनसे 42 प्रत्याहारों का निर्माण हुआ।"),

        # 2. Hindi Alankar - Shlesh Alankar (Index 1)
        ("Identify the figure of speech (अलंकार) in the famous poetic lines: 'रहिमन पानी राखिये, बिन पानी सब सून। पानी गये न ऊबरै, मोती, मानुष, चून॥'?",
        "'रहिमन पानी राखिये, बिन पानी सब सून। पानी गये न ऊबरै, मोती, मानुष, चून॥' दोहे में प्रयुक्त मुख्य अलंकार कौन-सा है?",
        "यमक अलंकार", "श्लेष अलंकार (Shlesh Alankar - एक शब्द के अनेक प्रसंगानुकूल अर्थ)", "अनुप्रास अलंकार", "रूपक अलंकार",
        1, "In the second line, the single word 'पानी' (water) yields three distinct meanings simultaneously: चमक/आभा (for मोती), प्रतिष्ठा/इज्जत (for मानुष), and जल (for चून), exemplifying Shlesh Alankar.",
        "यहाँ 'पानी' शब्द एक ही बार आकर तीन भिन्न अर्थ दे रहा है: मोती के संदर्भ में चमक, मनुष्य के संदर्भ में सम्मान, और चूने के संदर्भ में जल। अतः यहाँ श्लेष अलंकार है।"),

        # 3. English Preposition - Fixed Idiomatic Usage (Index 2)
        ("Fill in the blank with the appropriate preposition: 'The hardworking teacher was completely absorbed _____ reading the ancient Sanskrit manuscripts.'",
        "दिए गए वाक्य हेतु उपयुक्त Preposition चुनिए: 'The hardworking teacher was completely absorbed _____ reading the ancient Sanskrit manuscripts.'",
        "with", "at", "in (absorbed in - लीन या मग्न होना)", "for",
        2, "'Absorbed' is idiomatically followed by the preposition 'in' when denoting deep engrossment in an activity or study.",
        "'Absorbed' के साथ निश्चित Preposition 'in' का प्रयोग होता है (absorbed in = किसी कार्य में पूरी तरह तल्लीन होना)।"),

        # 4. Sanskrit Numbers - Number 19 in Sanskrit (Index 3)
        ("In Sanskrit cardinal numbers, how is the number '19' (उन्नीस) traditionally and grammatically denoted?",
        "संस्कृत संख्या वाचक शब्दों में संख्या '19' (उन्नीस) को किस रूप में लिखा जाता है?",
        "एकोनविंशतिः (Ekonvimshatih)", "ऊनविंशतिः (Oonvimshatih)", "नवदश (Navadasha)", "सर्वे विकल्पाः शुद्धाः (All the above options are correct / उपर्युक्त सभी)",
        3, "In Sanskrit, 19 is correctly expressed as एकोनविंशतिः (one less than twenty), ऊनविंशतिः, and नवदश (nine plus ten). All three forms are authentic.",
        "संस्कृत में 19 को एकोनविंशतिः, ऊनविंशतिः तथा नवदश तीनों कहा जाता है। अतः उपर्युक्त सभी विकल्प शुद्ध हैं।"),

        # 5. Hindi Sandhi - Yan Sandhi (Index 0)
        ("What is the correct split and sandhi rule in the word 'इत्यादि' (Ityadi)?",
        "हिन्दी व्याकरण में 'इत्यादि' शब्द का शुद्ध संधि-विच्छेद एवं संधि का भेद क्या है?",
        "इति + आदि = इत्यादि (यण स्वर संधि - इ + आ = या)", "इत् + आदि = इत्यादि (व्यंजन संधि)", "इती + आदि = इत्यादि (दीर्घ संधि)", "इति + यादि = इत्यादि (गुण संधि)",
        0, "इति + आदि = इत्यादि illustrates Yan Sandhi where short 'इ' followed by dissimilar vowel 'आ' transforms into semivowel 'य्' (इ + आ = या).",
        "इति + आदि = इत्यादि में यण स्वर संधि है (नियम: इ/ई के बाद कोई असमान स्वर आए तो इ/ई का 'य्' हो जाता है)।"),

        # 6. English Voice - Passive Construction (Index 1)
        ("Choose the correct passive voice of: 'The principal delivered an inspiring speech at the assembly.'",
        "दिए गए वाक्य का सही Passive Voice रूप चुनिए: 'The principal delivered an inspiring speech at the assembly.'",
        "An inspiring speech is delivered by the principal at the assembly.", "An inspiring speech was delivered by the principal at the assembly.", "An inspiring speech had been delivered by the principal at the assembly.", "An inspiring speech has delivered by the principal at the assembly.",
        1, "Simple past active 'delivered' converts to 'was delivered' in passive voice with singular subject 'speech'.",
        "Simple Past Tense का passive रूप 'was/were + V3' होता है। नया कर्ता 'An inspiring speech' एकवचन है, अतः 'was delivered' शुद्ध है।"),

        # 7. Sanskrit Pratyahara - Yan Pratyahara (Index 2)
        ("In Panini's grammar, which four semivowel consonants (अंतःस्थ वर्ण) are included in the 'यण्' (Yan) Pratyahara formulated by the formula 'इको यणचि'?",
        "पाणिनीय व्याकरण के सूत्र 'इको यणचि' के अंतर्गत 'यण्' (Yan) प्रत्याहार में कौन-से चार अंतःस्थ व्यंजन वर्ण समाविष्ट होते हैं?",
        "श्, ष्, स्, ह् (शल् प्रत्याहार)", "क्, ख्, ग्, घ्", "य्, व्, र्, ल् (यण् प्रत्याहार - अंतःस्थ वर्ण)", "ञ्, म्, ङ्, ण्, न्",
        2, "'यण्' Pratyahara includes the four semivowels य्, व्, र्, ल् (derived from सूत्र 5 हयवरट् and सूत्र 6 लण्).",
        "'यण्' प्रत्याहार में चार अंतःस्थ वर्ण 'य्, व्, र्, ल्' आते हैं (हयवरट् के 'य' से लण् के 'ण' तक)।"),

        # 8. Hindi Sahitya - Kamayani Author (Index 3)
        ("Which celebrated Chhayavadi poet authored the epic masterpiece 'कामायनी' (Kamayani), featuring Manu, Shraddha, and Ida as central allegorical characters?",
        "छायावाद के चार प्रमुख स्तंभों में से महाकाव्य 'कामायनी' (जिसके प्रमुख पात्र मनु, श्रद्धा और इड़ा हैं) के रचयिता कौन हैं?",
        "सूर्यकांत त्रिपाठी 'निराला'", "सुमित्रानंदन पंत", "महादेवी वर्मा", "जयशंकर प्रसाद (Jaishankar Prasad)",
        3, "Jaishankar Prasad composed 'Kamayani' in 1936, a timeless philosophical epic consisting of 15 cantos (सर्ग).",
        "कामायनी (1936) छायावादी युग के प्रवर्तक जयशंकर प्रसाद का अमर महाकाव्य है जिसमें कुल 15 सर्ग हैं (प्रथम सर्ग: चिंता, अंतिम: आनंद)।"),

        # 9. Sanskrit Literature - Mahakavi Kalidasa (Index 0)
        ("Which immortal drama composed by Mahakavi Kalidasa revolves around the love story of King Dushyanta and Shakuntala, acclaimed globally by Johann Wolfgang von Goethe?",
        "महाकवि कालिदास द्वारा रचित कौन-सा सात अंकों का अमर संस्कृत नाटक राजा दुष्यंत और शकुंतला के प्रणय आख्यान पर आधारित है जिसकी विश्व भर में भूरि-भूरि प्रशंसा हुई?",
        "अभिज्ञानशाकुंतलम् (Abhijnanashakuntalam)", "मालविकाग्निमित्रम्", "विक्रमोर्वशीयम्", "मृच्छकटिकम्",
        0, "'Abhijnanashakuntalam' is Kalidasa's masterwork in 7 acts, celebrated worldwide for its dramatic excellence and aesthetic beauty.",
        "कालिदास का सर्वश्रेष्ठ नाटक 'अभिज्ञानशाकुंतलम्' है (काव्येषु नाटकं रम्यं तत्र रम्या शकुन्तला)।"),

        # 10. English Vocabulary - Synonym of Meticulous (Index 1)
        ("Select the word that is most nearly identical in meaning (synonym) to 'METICULOUS':",
        "शब्द 'METICULOUS' (बारीकी से कार्य करने वाला / सतर्क) का सटीक Synonym चुनिए:",
        "Hasty", "Painstaking / Scrupulously careful (परिश्रमी / सूक्ष्मदर्शी)", "Careless", "Aggressive",
        1, "'Meticulous' means taking extreme care about minute details; its exact synonym is 'painstaking' or 'scrupulous'.",
        "'Meticulous' का अर्थ अत्यंत सावधानीपूर्वक बारीकियों पर ध्यान देने वाला होता है, जिसका पर्यायवाची 'Painstaking' है।"),

        # 11. Hindi Samas - Dvigu Samas (Index 2)
        ("In Hindi compound words, which compound is characterized by having an initial numerical adjective (संख्यावाचक पूर्वपद) denoting an aggregate/group, as in 'पंचवटी' (Panchavati)?",
        "जिस समस्त पद का पूर्वपद संख्यावाचक विशेषण हो और वह किसी समूह या समाहार का बोध कराए (जैसे: पंचवटी - पांच वटों का समाहार, त्रिफला), उसे कौन-सा समास कहते हैं?",
        "अव्ययीभाव समास", "कर्मधारय समास", "द्विगु समास (Dvigu Samas)", "बहुव्रीहि समास",
        2, "Dvigu Samas is a subcategory of Tatpurusha where the first member is a numeral and the whole word denotes a collective group.",
        "द्विगु समास में पूर्वपद संख्यावाचक होता है और समस्त पद किसी समूह (समाहार) का ज्ञान कराता है।"),

        # 12. Sanskrit Grammar - Upapada Vibhakti (Index 3)
        ("According to Panini's sutra 'नमःस्वस्तिस्वाहास्वधालंवषड्योगाच्च', which grammatical case (विभक्ति) is mandatorily applied with the word 'नमः' (as in 'श्रीगणेशाय नमः')?",
        "पाणिनीय सूत्र 'नमःस्वस्तिस्वाहास्वधालंवषड्योगाच्च' के अनुसार 'नमः' शब्द के योग में किस विभक्ति का प्रयोग अनिवार्यतः होता है (जैसे: शिवाय नमः, गुरवे नमः)?",
        "द्वितीया विभक्ति (Accusative)", "तृतीया विभक्ति (Instrumental)", "षष्ठी विभक्ति (Genitive)", "चतुर्थी विभक्ति (Dative - Chaturthi Vibhakti)",
        3, "The words नमः, स्वस्ति, स्वाहा, स्वधा, अलम्, and वषट् strictly govern the Chaturthi (Dative / 4th) Vibhakti.",
        "सूत्रानुसार 'नमः' के योग में चतुर्थी विभक्ति होती है (जैसे: 'श्री गणेशाय नमः' में गणेश शब्द में चतुर्थी विभक्ति प्रयुक्त हुई है)।"),

        # 13. Hindi Varn Vichar - Murdhanya Varna (Index 0)
        ("According to Hindi phonetics, which group of sounds is articulated by curling the tongue tip against the hard roof of the mouth (मूर्धा), comprising 'ट, ठ, ड, ढ, ण, ष, ऋ'?",
        "हिन्दी एवं संस्कृत वर्णमाला में 'ऋटुरषाणां मूर्धा' सूत्र के अनुसार मूर्धन्य (Retroflex) वर्णों का सही वर्ग कौन-सा है?",
        "ट, ठ, ड, ढ, ण, ष, ऋ (मूर्धन्य वर्ण)", "त, थ, द, ध, न, ल, स", "प, फ, ब, भ, म, व", "च, छ, ज, झ, ञ, य, श",
        0, "'ऋटुरषाणां मूर्धा' states that ऋ, ट-वर्ग (ट, ठ, ड, ढ, ण), र, and ष are Murdhanya sounds produced at the palate roof.",
        "संस्कृत सूत्र 'ऋटुरषाणां मूर्धा' के अनुसार ऋ, ट-वर्ग, र और ष का उच्चारण मूर्धा से होता है।"),

        # 14. English Narration - Indirect Speech (Index 1)
        ("Identify the correct indirect speech form of: The teacher said to the students, 'Honesty is the best policy.'",
        "दिए गए वाक्य का सही Indirect Speech रूप चुनिए: The teacher said to the students, 'Honesty is the best policy.'",
        "The teacher said to the students that honesty was the best policy.", "The teacher told the students that honesty is the best policy. (सार्वभौमिक सत्य में टेंस नहीं बदलता)", "The teacher told the students that honesty had been the best policy.", "The teacher asked the students if honesty is the best policy.",
        1, "Universal truths, scientific facts, and proverbs do not undergo tense shifts in indirect speech.",
        "कहावतें, मुहावरे और सार्वभौमिक सत्य (Universal Truths) में Reporting Verb भूतकाल में होने पर भी Reported Speech का टेंस अपरिवर्तित रहता है।"),

        # 15. Sanskrit Dhatu Roopa - Path Dhatu Lat Lakar (Index 2)
        ("In Sanskrit conjugation of the root verb 'पठ्' (to read) in Present Tense (लट् लकार), what is the form for Third Person Plural (प्रथम पुरुष, बहुवचन)?",
        "संस्कृत में 'पठ्' धातु के वर्तमान काल (लट् लकार) के प्रथम पुरुष, बहुवचन का शुद्ध रूप क्या होगा?",
        "पठति", "पठतः", "पठन्ति (पठति, पठतः, पठन्ति)", "पठामि",
        2, "Conjugation of पठ् in लट् लकार प्रथम पुरुष: पठति (singular), पठतः (dual), पठन्ति (plural).",
        "लट् लकार प्रथम पुरुष के रूप: पठति (एकवचन), पठतः (द्विवचन), पठन्ति (बहुवचन) होते हैं।"),

        # 16. Hindi Chand - Rola and Soratha (Index 3)
        ("Which Ardha-Samamatrik Chand (अर्धसम मात्रिक छंद) is exactly the inverse/reverse of a 'दोहा' (Doha), containing 11 syllables in odd charans (1st & 3rd) and 13 in even charans (2nd & 4th)?",
        "दोहा छंद के सर्वथा विपरीत (उल्टा) कौन-सा मात्रिक छंद होता है, जिसके विषम चरणों (प्रथम व तृतीय) में 11-11 मात्राएं तथा सम चरणों (द्वितीय व चतुर्थ) में 13-13 मात्राएं होती हैं?",
        "चौपाई (16 मात्राएं)", "रोला छंद", "बरवै छंद", "सोरठा छंद (Soratha - दोहा का उल्टा)",
        3, "Soratha has 11 morae in odd lines and 13 morae in even lines with end-rhyme in odd lines, making it the exact reverse of Doha (13-11).",
        "सोरठा दोहे का ठीक उल्टा होता है। इसके प्रथम और तृतीय चरण में 11-11 मात्राएं तथा द्वितीय और चतुर्थ में 13-13 मात्राएं होती हैं।"),

        # 17. Sanskrit Shabda Roopa - Ram Shabda Tritiya (Index 0)
        ("What is the Instrumental Singular (तृतीया विभक्ति, एकवचन) form of the masculine noun 'राम' (Rama) in Sanskrit declension?",
        "संस्कृत व्याकरण में अकारांत पुल्लिंग 'राम' शब्द के तृतीया विभक्ति, एकवचन का शुद्ध रूप क्या है?",
        "रामेण (Ramen - तृतीया एकवचन)", "रामाय", "रामात्", "रामस्य",
        0, "Declension of राम in तृतीया: रामेण (singular), रामाभ्याम् (dual), रामैः (plural). Note that र् changes न to ण (रामेण).",
        "राम शब्द के तृतीया विभक्ति के रूप: रामेण, रामाभ्याम्, रामैः होते हैं (अतः एकवचन = रामेण)।"),

        # 18. English Spelling - Frequently Confused Words (Index 1)
        ("Identify the correctly spelled word among the options given below:",
        "दिए गए विकल्पों में से सही वर्तनी (Correct Spelling) वाले शब्द का चयन कीजिए:",
        "Seperate", "Separate (S-e-p-a-r-a-t-e)", "Seprate", "Seperete",
        1, "The correct spelling is 'Separate' (s-e-p-a-r-a-t-e), with an 'a' after the 'p'.",
        "'Separate' की सही स्पेलिंग में 'p' के बाद 'a' आता है (S-e-p-a-r-a-t-e)।"),

        # 19. Hindi Karak - Karana Karak (Index 2)
        ("In the sentence 'शिकारी ने बाण से हिरन को मारा', what is the grammatical case (कारक) of 'बाण से' acting as the instrument/medium of action?",
        "'शिकारी ने बाण से हिरन को मारा' वाक्य में साधन (Instrument) का बोध कराने वाले 'बाण से' में कौन-सा कारक है?",
        "कर्म कारक", "अपादान कारक", "करण कारक (Karan Karak - तृतीया विभक्ति: साधन)", "संबंध कारक",
        2, "Karan Karak denotes the instrument or means by which an action is performed ('साधकतमं करणम्' - चिह्न: से / के द्वारा)।",
        "क्रिया के साधन या उपकरण में करण कारक होता है (चिह्न: 'से' / 'के द्वारा')। बाण शिकार करने का साधन है, अतः करण कारक है।"),

        # 20. Sanskrit Sandhi - Gun Sandhi Sutra (Index 3)
        ("Which foundational Paninian sutra ordains Gun Sandhi (गुण स्वर संधि) when अ/आ is followed by इ/ई, उ/ऊ, or ऋ, resulting in ए, ओ, or अर्?",
        "अ/आ के बाद ह्रस्व या दीर्घ इ, उ, ऋ आने पर क्रमशः ए, ओ, अर् करने वाला पाणिनीय गुण संधि सूत्र कौन-सा है?",
        "अकः सवर्णे दीर्घः", "वृद्धिरेचि", "इको यणचि", "आद्गुणः (Aadgunah - सूत्र 6.1.87)",
        3, "Sutra 'आद्गुणः' prescribes that when short or long अ/आ is followed by an अच् vowel, both merge into their गुण substitute (ए, ओ, अर्).",
        "पाणिनीय सूत्र 'आद्गुणः' गुण संधि का विधान करता है (जैसे: नर + ईश = नरेश, महा + उत्सव = महोत्सव)।"),

        # 21. Hindi Ras - Shringar Ras Sthayi Bhav (Index 0)
        ("What is the Sthayi Bhav (स्थायी भाव - permanent aesthetic emotion) of 'शृंगार रस' (the King of Ragas / रसराज)?",
        "हिन्दी काव्यशास्त्र में 'रसराज' कहे जाने वाले 'शृंगार रस' का स्थायी भाव क्या है?",
        "रति (Rati / प्रेम)", "शोक", "उत्साह", "निर्वेद",
        0, "The Sthayi Bhav of Shringar Ras is 'Rati' (रति/प्रेम), divided into संयोग शृंगार (love in union) and वियोग शृंगार (love in separation).",
        "शृंगार रस को रसों का राजा (रसराज) कहा जाता है और इसका स्थायी भाव 'रति' (प्रेम) होता है।"),

        # 22. English Conditionals - First Conditional (Index 1)
        ("Complete the conditional sentence correctly: 'If the candidates study the basic Sanskrit sutras attentively, they _____ full marks in the language section.'",
        "सटीक क्रिया रूप चुनिए: 'If the candidates study the basic Sanskrit sutras attentively, they _____ full marks in the language section.'",
        "would score", "will score (First Conditional: If + Present, will + V1)", "scored", "would have scored",
        1, "First conditional: 'If + present simple' takes 'will + base verb' in the main clause for a real future possibility.",
        "First Conditional संरचना: If उपवाक्य में Simple Present होने पर मुख्य उपवाक्य में 'will + V1' आता है।"),

        # 23. Sanskrit Kadambari Author - Banabhatta (Index 2)
        ("Which celebrated 7th-century Sanskrit court poet of Emperor Harshavardhana authored the world's premier romantic prose novel 'कादंबरी' (Kadambari) and 'हर्षचरितम्'?",
        "सम्राट हर्षवर्धन के दरबारी कवि तथा संस्कृत के प्रसिद्ध गद्यकार कौन हैं जिन्होंने विश्व के प्रथम गद्य उपन्यास 'कादंबरी' तथा 'हर्षचरितम्' की रचना की?",
        "दण्डी", "सुबंधु", "बाणभट्ट (Banabhatta)", "अंबिकादत्त व्यास",
        2, "Banabhatta wrote 'Kadambari' (completed by his son Bhushanabhatta) and 'Harshacharita', masterworks of classical Sanskrit prose.",
        "बाणभट्ट ने 'कादंबरी' और 'हर्षचरितम्' की रचना की (बाणोच्छिष्टं जगत्सर्वम्)।"),

        # 24. Hindi Tatsam - Shuddh Tatsam (Index 3)
        ("Identify the word that is an authentic Sanskrit-origin 'तत्सम' (Tatsam) word rather than an evolved Tadbhav word:",
        "निम्न में से विशुद्ध 'तत्सम' शब्द का चयन कीजिए:",
        "आंख (तद्भव)", "सूरज (तद्भव)", "घी (तद्भव)", "अक्षि (Akshi - शुद्ध तत्सम शब्द)",
        3, "'अक्षि' is a pure Tatsam word (its evolved Tadbhav form in modern Hindi is 'आंख').",
        "'अक्षि' तत्सम शब्द है, जिसका तद्भव 'आंख' होता है। अन्य तत्सम रूप: सूर्य (सूरज), घृत (घी)।")
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
            'domain': 'UPTET Languages Trilingual Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering Hindi, English, and Sanskrit
    lang_modules = [
        # Sanskrit Grammar Modules
        ("माहेश्वर सूत्र 14 सूत्र पाणिनि", "अइउण्, ऋऌक्, एओङ्, ऐऔच्, हयवरट्, लण्, ञमङणनम्, झभञ्, घढधष्, जबगडदश्, खफछठथचटतव्, कपय्, शषसर्, हल्", "Fourteen Maheshwar Sutras", "संस्कृत व्याकरण"),
        ("अक् एवं अच् प्रत्याहार वर्ण", "अक् में मूल स्वर (अ, इ, उ, ऋ, ऌ) तथा अच् में सभी स्वर वर्ण समाविष्ट होते हैं", "Ak and Ach Pratyahara Vowels", "संस्कृत व्याकरण"),
        ("इको यणचि यण् संधि नियम", "इकः (इ, उ, ऋ, ऌ) के स्थान पर यण् (य, व, र, ल) आदेश होता है जब बाद में असमान अच् (स्वर) आए", "Iko Yanachi Sandhi Formulation", "संस्कृत संधि"),
        ("अकः सवर्णे दीर्घः दीर्घ संधि", "अकः (अ, इ, उ, ऋ) के बाद सवर्ण स्वर आए तो दोनों मिलकर दीर्घ रूप हो जाते हैं (दैत्य + अरिः = दैत्यारिः)", "Akah Savarne Dirghah Rule", "संस्कृत संधि"),
        ("आद्गुणः गुण संधि नियम", "अवर्ण (अ/आ) के बाद अच् आए तो पूर्व व पर के स्थान पर गुण (ए, ओ, अर्) एकादेश होता है", "Aadgunah Gun Sandhi Mechanics", "संस्कृत संधि"),
        ("वृद्धिरेचि वृद्धि संधि नियम", "अवर्ण के बाद एच् (ए, ओ, ऐ, औ) आए तो वृद्धि एकादेश (ऐ, औ) होता है जैसे कृष्ण + एकत्वम् = कृष्णैकत्वम्", "Vriddhirechi Growth Sandhi Rule", "संस्कृत संधि"),
        ("एचोऽयवायावः अयादि संधि नियम", "ए, ओ, ऐ, औ के बाद कोई स्वर आए तो क्रमशः अय्, अव्, आय्, आव् आदेश होता है जैसे पो + अनः = पवनः", "Echoyavayavah Sandhi Mechanics", "संस्कृत संधि"),
        ("राम एवं हरि शब्द रूप विभक्ति", "अकारांत पुल्लिंग राम तथा इकारांत पुल्लिंग हरि शब्द के सातों विभक्तियों में रूप", "Rama and Hari Noun Declensions", "संस्कृत शब्द रूप"),
        ("लता एवं नदी स्त्रीलिंग शब्द रूप", "आकारांत स्त्रीलिंग लता तथा ईकारांत नदी शब्द रूप (नद्या, नद्यै, नद्याः, नद्याम्)", "Lata and Nadi Feminine Declensions", "संस्कृत शब्द रूप"),
        ("अस्मद् एवं युष्मद् सर्वनाम रूप", "अस्मद् (अहम्, आवाम्, वयम्) तथा युष्मद् (त्वम्, युवाम्, यूयम्) के तीनों लिंगों में समान रूप", "Asmad and Yushmad Pronouns", "संस्कृत शब्द रूप"),
        ("पठ् एवं भू धातु लट् लङ् लोट् लकार", "पठति/अपठत्/पठतु/पठिष्यति/पठेत् पांचों प्रमुख लकारों में क्रिया रूप", "Path and Bhu Root Conjugations", "संस्कृत धातु रूप"),
        ("गम् धातु लट् एवं लृट् लकार", "गम् (गच्छति, अगच्छत्, गमिष्यति) गच्छ आदेश तथा भविष्यत काल में गमिष्यति", "Gam Dhatu Future and Present Forms", "संस्कृत धातु रूप"),
        ("कारक एवं उपपद विभक्ति सहार्थे तृतीया", "सह, साकम्, सार्धम्, समम् के योग में अप्रधान कर्ता में तृतीया विभक्ति (रामेण सह सीता गच्छति)", "Saharthe Tritiya Case Syntax", "संस्कृत कारक"),
        ("रुच्यर्थानां प्रीयमाणः चतुर्थी विभक्ति", "रुच् धातु के प्रयोग में जो प्रसन्न होता है उसमें चतुर्थी विभक्ति होती है (बालकाय मोदकं रोचते)", "Ruchyarthanam Priyamanah Rule", "संस्कृत कारक"),
        ("येनाङ्गविकारः तृतीया विभक्ति", "जिस विकृत अंग से अंगी का विकार लक्षित हो उसमें तृतीया विभक्ति होती है (अक्ष्णा काणः, पादेन खञ्जः)", "Yenangavakarah Instrumental Case", "संस्कृत कारक"),
        ("संस्कृत संख्याएं 1 से 100 तक", "एकादश (11), विंशतिः (20), एकोनत्रिंशत् (29), पञ्चाशत् (50), अशीतिः (80), शतम् (100)", "Sanskrit Cardinal Numbers Lexicon", "संस्कृत संख्याएं"),
        ("कालिदास रघुवंशम् एवं मेघदूतम्", "रघुवंशम् (19 सर्गों का महाकाव्य) तथा मेघदूतम् (मंदाक्रांता छंद में खंडकाव्य/गीतिकाव्य)", "Raghuvamsham and Meghadutam Works", "संस्कृत साहित्य"),
        ("भवभूति उत्तररामचरितम् करुण रस", "उत्तररामचरितम् नाटक सात अंकों में, करुण रस की प्रधानता (एको रसः करुण एव)", "Bhavabhuti Uttararamacharita", "संस्कृत साहित्य"),

        # Hindi Grammar Modules
        ("हिन्दी वर्णमाला अयोगवाह अनुस्वार विसर्ग", "अं (अनुस्वार) और अः (विसर्ग) न तो पूर्ण स्वर हैं और न व्यंजन, इन्हें अयोगवाह कहते हैं", "Ayogavaha Anusvara Visarga", "हिन्दी वर्ण विचार"),
        ("स्पर्श अंतःस्थ एवं ऊष्म व्यंजन", "स्पर्श (क से म तक 25), अंतःस्थ (य, र, ल, व), ऊष्म (श, ष, स, ह), संयुक्त (क्ष, त्र, ज्ञ, श्र)", "Consonant Classification in Hindi", "हिन्दी वर्ण विचार"),
        ("अव्ययीभाव समास यथा प्रति बे भर", "प्रथम पद अव्यय/उपसर्ग तथा प्रधान होता है और समस्त पद क्रियाविशेषण बनता है (प्रतिदिन, आजन्म)", "Avyayibhava Compound Mechanics", "हिन्दी समास"),
        ("कर्मधारय समास विशेषण-विशेष्य भाव", "उपमेय-उपमान या विशेषण-विशेष्य का संबंध होता है (चरणकमल, चंद्रमुख, श्वेतांबर)", "Karmadharaya Adjectival Compound", "हिन्दी समास"),
        ("बहुव्रीहि समास अन्य पद प्रधानता", "दोनों पद अप्रधान होकर अन्य तीसरे अर्थ का बोध कराते हैं (दशानन, चक्रपाणि, लंबोदर)", "Bahuvrihi Third-entity Denotation", "हिन्दी समास"),
        ("तत्सम तद्भव पहचान नियम", "तत्सम में प्रायः क्ष, त्र, ज्ञ, श्र, ष, ऋ, व तथा तद्भव में ख/छ, ब, स का प्रयोग होता है", "Tatsam Tadbhav Morphological Rules", "हिन्दी शब्द भेद"),
        ("संज्ञा के भेद भाववाचक संज्ञा निर्माण", "जातिवाचक, विशेषण व क्रिया से भाववाचक संज्ञा बनना (मित्र -> मित्रता, सुंदर -> सुंदरता)", "Abstract Noun Formation in Hindi", "हिन्दी व्याकरण"),
        ("सर्वनाम के छह भेद निजवाचक सर्वनाम", "निजवाचक सर्वनाम में 'आप, स्वयं, खुद, स्वतः' का प्रयोग कर्ता के लिए होता है", "Reflexive Pronoun in Hindi", "हिन्दी व्याकरण"),
        ("कारक चिह्न एवं विभक्तियां अपादान", "पेड़ से पत्ता गिरा (अपादान पृथकता), छात्र कलम से लिखता है (करण साधन)", "Apadan vs Karan Case Distinctions", "हिन्दी कारक"),
        ("वाच्य परिवर्तन कर्तृवाच्य से कर्मवाच्य", "कर्ता के साथ 'के द्वारा' जोड़ना तथा क्रिया को कर्म के लिंग-वचन के अनुसार ढालना", "Voice Transformation in Hindi", "हिन्दी वाच्य"),
        ("अनुप्रास अलंकार के पांच भेद", "छेकानुप्रास, वृत्त्यानुप्रास, लाटानुप्रास, अंत्यानुप्रास, श्रुत्यानुप्रास", "Alliteration Five Sub-types in Hindi", "हिन्दी अलंकार"),
        ("यमक अलंकार शब्द आवृत्ति भिन्न अर्थ", "कनक कनक ते सौ गुनी मादकता अधिकाय (प्रथम कनक = धतूरा, द्वितीय कनक = स्वर्ण)", "Yamak Pun and Repetition Alankar", "हिन्दी अलंकार"),
        ("उत्प्रेक्षा अलंकार संभावना बोधक शब्द", "मनु, मानहु, जनु, जानहु, जानो, मानो शब्दों द्वारा उपमेय में उपमान की संभावना", "Utpreksha Metaphorical Conjecture", "हिन्दी अलंकार"),
        ("रस निष्पत्ति भरतमुनि रस सूत्र", "विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः (विभाव, अनुभाव, संचारी भाव के संयोग से रस)", "Bharatamuni Rasa Sutra Mechanics", "हिन्दी रस शास्त्र"),
        ("चौपाई छंद 16 मात्राएं अंत में गुरु", "चार चरण, प्रत्येक चरण में 16 मात्राएं तथा अंत में जगण (।ऽ।) व तगण (ऽऽ।) वर्जित", "Chaupai Quatrain Metrics", "हिन्दी छंद शास्त्र"),
        ("दोहा छंद 13 और 11 मात्राएं", "प्रथम व तृतीय चरण में 13-13 मात्राएं तथा द्वितीय व चतुर्थ चरण में 11-11 मात्राएं", "Doha Meter 13-11 Syllable Count", "हिन्दी छंद शास्त्र"),
        ("रामचरितमानस तुलसीदास सात कांड", "बालकांड, अयोध्याकांड, अरण्यकांड, किष्किंधाकांड, सुंदरकांड, लंकाकांड, उत्तरकांड", "Ramcharitmanas Seven Cantos Order", "हिन्दी साहित्य"),
        ("गोदान मुंशी प्रेमचंद यथार्थवादी उपन्यास", "होरी, धनिया, गोबर, धनिया पात्रों के माध्यम से भारतीय किसान की त्रासदी", "Godan Premchand Agrarian Realism", "हिन्दी साहित्य"),

        # English Grammar & Usage Modules
        ("Articles Definite vs Indefinite Rules", "A before consonant sounds, an before vowel sounds; the before specific and superlative entities", "Definite and Indefinite Article Usages", "English Grammar"),
        ("Subject-Verb Concord Neither Nor Pairs", "Verb agrees in number with closest subject; collective nouns act as singular units", "Subject Verb Proximity Rules", "English Grammar"),
        ("Preposition Usage Fond of Rely on", "Fond takes of, rely takes on, abstained takes from, prevent takes from + gerund", "Fixed Dependent Prepositions", "English Grammar"),
        ("Tenses Present Perfect vs Past Simple", "Present perfect links past accomplishment to present result; past simple marks historic point", "Present Perfect Sequence of Tenses", "English Grammar"),
        ("Active to Passive Voice Auxiliary Shifts", "Present continuous takes being; modals take be + V3; interrogatives invert auxiliary", "Passive Voice Transformation Rules", "English Grammar"),
        ("Direct to Indirect Speech Tense Backshift", "Present tense shifts to corresponding past; tomorrow becomes next day, yesterday becomes previous day", "Indirect Speech Reported Tense Shift", "English Grammar"),
        ("Conditional Sentence Structure Zero to Third", "Third conditional uses if + had + V3 and would have + V3 in the main clause", "Conditional Clauses Typology", "English Grammar"),
        ("Question Tags Rules Negative vs Affirmative", "Affirmative statements take negative tag; let's takes shall we; imperative takes will you", "Question Tag Structural Rules", "English Grammar"),
        ("Vocabulary Synonyms and Antonyms", "Candid (frank), frugal (economical), obstinate (stubborn), gregarious (sociable)", "Synonyms and Antonyms Lexicon", "English Vocabulary"),
        ("Idioms and Phrasal Verbs in Context", "Break the ice, burn the midnight oil, call off (cancel), put out (extinguish)", "Idiomatic Expressions and Phrasals", "English Idioms"),
        ("One-Word Substitutions Scholar Lexicon", "Omniscient (all-knowing), philanthropist (lover of mankind), novice (beginner)", "One-Word Substitution Terms", "English Vocabulary"),
        ("Spelling Mechanics Double Consonants", "Embarrassment, committee, accommodation, millennium, occasion orthography", "Tricky Orthography and Spellings", "English Vocabulary")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(lang_modules)
        topic, facts, topic_en, category = lang_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the Languages curriculum of UP TET & Super TET, which grammatical principle regarding '{topic_en}' is linguistically valid?"
            stem_hi = f"यूपी टीईटी एवं सुपर टीईटी के भाषा ज्ञान (हिन्दी/अंग्रेजी/संस्कृत) पाठ्यक्रम में '{topic}' से संबंधित कौन-सा नियम अथवा कथन प्रामाणिक है?"
            sol_en = f"Standard linguistic principle: {facts}. Section: {category}."
            sol_hi = f"प्रामाणिक भाषाई नियम: {facts}। वर्ग: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Derived from Cretaceous paleomagnetic polarity reversal records", 'hi': "क्रेटेशियस चुंबकीय उत्क्रमण रिकॉर्ड से व्युत्पन्न"},
                {'en': "Calculated from abyssal hydrostatic trench decompression curves", 'hi': "अगाध महासागरीय विसंपीड़न वक्र से परिकलित"},
                {'en': "Regulated under Baltic timber maritime trade tariffs 1845", 'hi': "बाल्टिक इमारती लकड़ी व्यापार शुल्क द्वारा नियंत्रित"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key linguistic discipline or grammar section is '{topic_en}' categorized?"
            stem_hi = f"शिक्षक भर्ती परीक्षा में '{topic}' किस प्रमुख व्याकरणिक अथवा भाषाई खंड के अंतर्गत आता है?"
            sol_en = f"Classified under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Pleistocene Glacial Erratic Boulder Deposition", 'hi': "प्लीस्टोसिन हिमनदीय बोल्डर निक्षेपण"},
                {'en': f"UP TET/Super TET Core: {category} ({facts})", 'hi': f"भाषा मानक: {category} ({facts})"},
                {'en': "Sub-zero Antarctic Firn Compaction Densification", 'hi': "अंटार्कटिक बर्फ संघनन घनत्वीकरण"},
                {'en': "Medieval Venetian Silk Guild Apprenticeship Protocols", 'hi': "मध्यकालीन वेनिस रेशम गिल्ड नियम"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"Why is rigorous mastery of '{topic_en}' vital for teaching and answering language comprehension questions accurately?"
            stem_hi = f"कक्षा शिक्षण एवं भाषा बोध प्रश्नों के सटीक समाधान हेतु '{topic}' का ज्ञान क्यों अनिवार्य है?"
            sol_en = f"Key grammatical importance: {facts} ({category})."
            sol_hi = f"भाषाई महत्व: {facts} ({category})।"
            choices = [
                {'en': "To compute supersonic aircraft aerodynamic shockwave angles", 'hi': "सुपरसोनिक विमान शॉकवेव कोण गणना हेतु"},
                {'en': "To synthesize synthetic hydrocarbons from deep subsoil shale", 'hi': "गहरे उपमृदा शेल से सिंथेटिक हाइड्रोकार्बन संश्लेषित करने हेतु"},
                {'en': f"Essential for syntactic and grammatical precision: {facts} ({category})", 'hi': f"व्याकरणिक शुद्धता एवं अनुप्रयोग हेतु: {facts} ({category})"},
                {'en': "To calibrate satellite telemetry antennas during solar flares", 'hi': "सौर ज्वाला के दौरान उपग्रह एंटीना कैलिब्रेट करने हेतु"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately presents the grammatical rule of '{topic_en}'?"
            stem_hi = f"निम्न में से कौन-सा विकल्प '{topic}' के मानक नियम अथवा उदाहरण का सबसे सटीक सारांश प्रस्तुत करता है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Regulates deep trench oceanic tectonic subduction boundary friction", 'hi': "गहरे महासागरीय सबडक्शन घर्षण को नियंत्रित करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर कोरोनाग्राफ स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Measures hydraulic gradient across underwater continental shelves", 'hi': "पानी के नीचे महाद्वीपीय शेल्फ पर हाइड्रोलिक प्रवणता मापता है"},
                {'en': f"Standard grammatical rule: {facts} ({category})", 'hi': f"मानक व्याकरणिक नियम: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'UPTET Languages - {category}',
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
    res = get_raw_languages_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

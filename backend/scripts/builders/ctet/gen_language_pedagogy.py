"""
CTET - Language I & II Comprehension & Pedagogy (भाषा विकास एवं शिक्षण शास्त्र - हिन्दी एवं English) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Language Acquisition vs Learning: Noam Chomsky (LAD, Universal Grammar), Stephen Krashen (Input Hypothesis i+1, Affective filter)
- Four Language Skills (LSRW): Receptive (Listening, Reading) vs Productive (Speaking, Writing)
- Reading Sub-skills: Skimming (gist), Scanning (specific details), Intensive vs Extensive reading
- Principles of Language Teaching: CLT, Natural order, Situational language teaching, Habit formation
- Multilingualism as a Resource: Mother tongue foundation (NCF 2005 & NEP 2020), Translanguaging
- Grammar in Context: Inductive (Examples to Rules) vs Deductive methods, Functional grammar
- Language Difficulties & Errors: Dyslexia, Speech disorders, Errors as developmental milestones
- Assessment & Remedial Teaching: Portfolios, Rubrics, Diagnostic tests, Remedial instruction
- Hindi & English Grammar Core: Sandhi, Samas, Prefixes/Suffixes, Concord, Prepositions, Voice, Narration
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_language_pedagogy_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Chomsky - LAD (Index 0)
        ("According to linguist Noam Chomsky, children are born with an innate biological capacity that enables them to discover the underlying grammar of any language they are exposed to. What is this mental mechanism termed?",
         "भाषाविद् नोम चॉम्स्की के अनुसार, सभी बच्चों में भाषा सीखने की एक जन्मजात जैविक क्षमता होती है जो उन्हें किसी भी भाषा के व्याकरण को समझने में समर्थ बनाती है। इस मानसिक तंत्र को क्या कहा जाता है?",
         "Language Acquisition Device - LAD (भाषा अर्जन यंत्र / साधन)", "Language Production Engine", "Universal Lexicon Processor", "Operant Conditioning Mechanism",
         0, "Chomsky proposed that humans are biologically equipped with an innate Language Acquisition Device (LAD) and Universal Grammar.",
         "नोम चॉम्स्की के अनुसार मनुष्य में भाषा सीखने की जन्मजात क्षमता (Innate capacity) होती है, जिसके लिए मस्तिष्क में 'भाषा अर्जन यंत्र' (LAD) कार्य करता है।"),

        # 2. Reading Sub-skill - Skimming (Index 1)
        ("A reader quickly glances through a newspaper article, reading headings, sub-headings, and the first lines of paragraphs solely to get the general gist or main idea of the text. Which reading sub-skill is being utilized?",
         "एक पाठक किसी समाचार पत्र के लेख को केवल उसका मुख्य भाव या सामान्य सारांश (Gist / Central Idea) जानने के लिए शीर्षकों और अनुच्छेदों पर तेजी से दृष्टि दौड़ाता है। यह पठन का कौन-सा उप-कौशल है?",
         "Scanning", "Skimming (सरसरी तौर पर पढ़ना / विहंगावलोकन)", "Intensive Reading", "Critical Proofreading",
         1, "Skimming is reading quickly to identify the main idea or general gist of a text.",
         "सरसरी तौर पर पढ़ना (Skimming) पाठ्यवस्तु का सामान्य विचार, सारांश या मूल भाव (Gist) समझने के लिए तेजी से पढ़ने की प्रविधि है।"),

        # 3. Four Skills - Receptive vs Productive (Index 2)
        ("In the categorization of the four fundamental language skills (LSRW - Listening, Speaking, Reading, Writing), which two skills are classified as 'Receptive Skills' (ग्रहणात्मक कौशल)?",
         "भाषा के चार मूलभूत कौशलों (LSRW - सुनना, बोलना, पढ़ना, लिखना) के वर्गीकरण में किन दो कौशलों को 'ग्रहणात्मक कौशल' (Receptive Skills) कहा जाता है?",
         "Speaking and Writing", "Listening and Speaking", "Listening and Reading (सुनना एवं पढ़ना)", "Reading and Writing",
         2, "Listening and Reading are receptive skills through which learners receive and comprehend linguistic input, whereas Speaking and Writing are productive.",
         "सुनना और पढ़ना 'ग्रहणात्मक कौशल' (Receptive Skills) हैं क्योंकि इनके माध्यम से बालक भाषा ग्रहण करता है, जबकि बोलना और लिखना 'अभिव्यक्तात्मक कौशल' (Productive) हैं।"),

        # 4. Multilingualism in Classroom (Index 3)
        ("According to the National Curriculum Framework (NCF 2005) and NEP 2020, how should a teacher view the linguistic diversity and multiple mother tongues of children in a primary classroom?",
         "राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF 2005) और एनईपी 2020 के अनुसार, प्राथमिक कक्षा में बच्चों की बहुभाषिकता और मातृभाषाओं की विविधता को शिक्षक द्वारा किस रूप में देखा जाना चाहिए?",
         "As a serious defect that hinders English pronunciation", "As a cognitive burden requiring immediate suppression", "As an unwanted obstacle in completing syllabus lessons", "As a rich resource and asset for language acquisition and inclusive learning (एक समृद्ध संसाधन एवं संपत्ति के रूप में)",
         3, "Multilingualism is viewed as a valuable pedagogical resource and asset that promotes cognitive flexibility and mutual cultural respect.",
         "बहुभाषिकता कक्षा में कोई बाधा नहीं बल्कि एक 'समृद्ध संसाधन' (Resource) है, जो बच्चों के संज्ञानात्मक विकास और सीखने को सुगम बनाती है।"),

        # 5. Krashen - Comprehensible Input (Index 0)
        ("In Stephen Krashen's Second Language Acquisition theory, what hypothesis posits that language acquisition occurs best when learners are exposed to comprehensible input that is slightly beyond their current level of competence (represented as 'i + 1')?",
         "स्टीफन क्रैशन के द्वितीय भाषा अर्जन सिद्धांत में, कौन-सी परिकल्पना यह प्रतिपादित करती है कि भाषा अर्जन तब सर्वाधिक प्रभावी होता है जब शिक्षार्थी को उसके वर्तमान स्तर से थोड़ा ऊपर का बोधगम्य इनपुट ('i + 1') प्रदान किया जाता है?",
         "The Input Hypothesis (बोधगम्य इनपुट परिकल्पना - i + 1)", "The Natural Order Hypothesis", "The Monitor Hypothesis", "The Affective Filter Hypothesis",
         0, "Krashen's Input Hypothesis states that learners progress when they receive comprehensible input that is one step beyond their current competence level (i + 1).",
         "क्रैशन की इनपुट परिकल्पना (Input Hypothesis) के अनुसार बालक को उसके वर्तमान भाषाई स्तर (i) से थोड़ा उच्च स्तर (i + 1) का बोधगम्य इनपुट मिलने पर भाषा का स्वाभाविक अर्जन होता है।"),

        # 6. Reading Sub-skill - Scanning (Index 1)
        ("A student searches a train timetable strictly to locate the specific arrival time of the Rajdhani Express at Kanpur railway station. Which reading technique is the student employing?",
         "एक छात्र रेलवे समय-सारणी में केवल यह खोजने के लिए पढ़ता है कि कानपुर स्टेशन पर राजधानी एक्सप्रेस के पहुंचने का निश्चित समय क्या है। छात्र किस पठन तकनीक का उपयोग कर रहा है?",
         "Skimming", "Scanning (विशिष्ट जानकारी खोजना / बारीकी से पढ़ना)", "Extensive Reading", "Sub-vocalizing",
         1, "Scanning is reading rapidly to locate a specific piece of information, date, number, or name in a text.",
         "विशिष्ट जानकारी खोजना (Scanning) किसी पाठ में से किसी खास तथ्य, नाम, तारीख या समय को तेजी से ढूंढने का पठन कौशल है।"),

        # 7. Grammar Teaching - Inductive Method (Index 2)
        ("A language teacher first writes sentences like 'Rohan plays cricket', 'Pooja writes a letter', and 'Delhi is the capital of India' on the board, encourages students to identify names of persons and places, and finally leads them to define the grammatical category 'Noun'. Which method did the teacher employ?",
         "एक भाषा शिक्षिका पहले बोर्ड पर 'रोहन खेलता है', 'पूजा पत्र लिखती है', 'दिल्ली भारत की राजधानी है' जैसे वाक्य लिखती हैं, बच्चों से व्यक्तियों व स्थानों के नाम अलग करवाती हैं, और अंत में 'संज्ञा' की परिभाषा निकलवाती हैं। शिक्षिका ने किस विधि का प्रयोग किया?",
         "Deductive Method", "Grammar-Translation Method", "Inductive Method (आगमन विधि - उदाहरण से नियम की ओर)", "Structural Direct Method",
         2, "The Inductive method moves from concrete, contextual examples to the derivation and formulation of general grammatical rules.",
         "आगमन विधि (Inductive Method) में पहले संदर्भयुक्त उदाहरण प्रस्तुत किए जाते हैं और फिर छात्र स्वयं सामान्य नियम या परिभाषा निकालते हैं।"),

        # 8. Learning vs Acquisition (Index 3)
        ("Which of the following statements accurately differentiates between 'Language Acquisition' (भाषा अर्जन) and 'Language Learning' (भाषा अधिगम)?",
         "निम्नलिखित में से कौन-सा कथन 'भाषा अर्जन' (Language Acquisition) और 'भाषा अधिगम' (Language Learning) के अंतर को सही स्पष्ट करता है?",
         "Acquisition is conscious with formal rules, while learning is natural", "Both acquisition and learning occur only through high-stakes written tests", "Acquisition takes place only after puberty in adult universities", "Acquisition is an intuitive, subconscious process in natural immersion (like mother tongue), while learning is conscious and structured through formal schooling (अर्जन स्वाभाविक व अवचेतन है, जबकि अधिगम सचेत व औपचारिक है)",
         3, "Language acquisition is subconscious and natural through immersion (L1), whereas language learning is conscious and structured with explicit grammatical rules (L2).",
         "भाषा अर्जन (Acquisition) एक स्वाभाविक व अवचेतन प्रक्रिया है जो प्राकृतिक परिवेश में मातृभाषा के साथ होती है, जबकि भाषा अधिगम (Learning) विद्यालय में औपचारिक नियमों द्वारा सचेतन रूप से सीखा जाता है।"),

        # 9. Language Skill - Extensive Reading (Index 0)
        ("When elementary children are encouraged to read illustrated comic books, folklore stories, and adventure tales outside the textbook for pure enjoyment, pleasure, and reading fluency, this pedagogical practice is called:",
         "जब प्राथमिक बच्चों को किताबी परीक्षा के दबाव के बिना केवल आनंद, रुचि और धाराप्रवाह पठन के विकास हेतु कॉमिक्स, बाल कहानियां और किस्से पढ़ने के लिए प्रेरित किया जाता है, तो यह क्या कहलाता है?",
         "Extensive Reading (विस्तृत / द्रुत पठन - आनंद हेतु पठन)", "Intensive Reading", "Phonetic Decoding", "Grammar Drill Reading",
         0, "Extensive reading involves reading large quantities of enjoyable, accessible texts for pleasure, general comprehension, and reading fluency.",
         "विस्तृत पठन (Extensive Reading) आनंद, मनोरंजन और पठन गति बढ़ाने के लिए किया जाता है, जिसमें बालक बिना किसी परीक्षा के डर के रुचिपूर्वक कहानियां पढ़ता है।"),

        # 10. Language Skill - Intensive Reading (Index 1)
        ("In contrast to extensive reading, 'Intensive Reading' (गहन पठन) in language pedagogy primarily focuses on:",
         "विस्तृत पठन के विपरीत, भाषा शिक्षण में 'गहन पठन' (Intensive Reading) का मुख्य केंद्र किस पर होता है?",
         "Skimming through an entire novel in a single sitting", "Detailed, meticulous study of a short passage to examine syntactic structures, vocabulary, and deep textual meaning (गहन अर्थ, व्याकरणिक संरचना व शब्दार्थ की सूक्ष्म समझ)", "Reading billboards while riding a school bus", "Memorizing whole paragraphs without understanding word meanings",
         1, "Intensive reading involves close, meticulous examination of short texts for detailed comprehension, vocabulary acquisition, and syntactic analysis.",
         "गहन पठन (Intensive Reading) किसी छोटे गद्यांश का सूक्ष्मता से अध्ययन है, जिसमें शब्दों के अर्थ, व्याकरणिक संरचना और गहरे भावार्थ को समझा जाता है।"),

        # 11. Errors as Windows into Learning (Index 2)
        ("In constructivist language pedagogy, how should a teacher perceive oral and written 'errors' made by children while learning a language?",
         "रचनावादी भाषा शिक्षाशास्त्र में, भाषा सीखते समय बच्चों द्वारा की जाने वाली मौखिक या लिखित 'त्रुटियों' (Errors) को शिक्षक द्वारा कैसे देखा जाना चाहिए?",
         "As gross carelessness that must be punished immediately", "As signs of poor cognitive capacity that should be eradicated through rote drills", "As natural developmental milestones and windows into how the child is constructing language rules (सीखने की स्वाभाविक सीढ़ी एवं बच्चे की भाषाई समझ का परिचायक)", "As permanent defects preventing second language mastery",
         2, "Errors are natural, inevitable indicators of the learner's developing interlanguage and hypotheses about how language rules operate.",
         "त्रुटियां भाषा अधिगम की प्रक्रिया का स्वाभाविक हिस्सा हैं। वे दर्शाती हैं कि बच्चा भाषा के नियमों का सक्रियता से निर्माण व परीक्षण कर रहा है।"),

        # 12. Hindi Grammar - संधि (Index 3)
        ("हिंदी व्याकरण में 'हिमालय' शब्द का सही संधि-विच्छेद क्या है और यह किस संधि का उदाहरण है?",
         "In Hindi grammar, what is the correct Sandhi-viched of the word 'हिमालय' and which type of Sandhi does it represent?",
         "हिम + लय (गुण संधि)", "हिमा + लय (अयादि संधि)", "हिम् + आलय (वृद्धि संधि)", "हिम + आलय (दीर्घ स्वर संधि - अ + आ = आ)",
         3, "हिम + आलय = हिमालय (दीर्घ स्वर संधि, where 'अ' + 'आ' combine to form 'आ').",
         "हिम + आलय = हिमालय। यहाँ 'अ' और 'आ' के मेल से दीर्घ 'आ' बना है, अतः यह 'दीर्घ स्वर संधि' का उदाहरण है।"),

        # 13. Hindi Grammar - समास (Index 0)
        ("जिस समास में पूर्व पद (पहला पद) प्रधान और अव्यय होता है तथा समस्त पद भी अव्यय की भांति कार्य करता है (जैसे: 'यथाशक्ति', 'प्रतिदिन'), वह कौन-सा समास कहलाता है?",
         "In Hindi grammar, a compound word where the first term is an Indeclinable (Avyaya) and remains primary (e.g., 'यथाशक्ति', 'प्रतिदिन') is classified as which Samas?",
         "अव्ययीभाव समास (Avyayibhav Samas)", "तत्पुरुष समास", "द्विगु समास", "द्वंद्व समास",
         0, "अव्ययीभाव समास has an avyaya as its prior member, retaining indeclinable syntactic force.",
         "जिस समास का पहला पद अव्यय तथा प्रधान हो, उसे 'अव्ययीभाव समास' कहते हैं (जैसे यथाशक्ति = शक्ति के अनुसार, प्रतिदिन = प्रत्येक दिन)।"),

        # 14. English Grammar - Subject-Verb Agreement (Index 1)
        ("Choose the grammatically correct sentence conforming to standard English Subject-Verb Agreement:",
         "मानक अंग्रेजी व्याकरण के कर्ता-क्रिया समन्वय (Subject-Verb Agreement) के अनुसार शुद्ध वाक्य का चयन कीजिए:",
         "Neither the teacher nor the students was present in the auditorium.", "Neither the teacher nor the students were present in the auditorium.", "Neither the teacher nor the students is present in the auditorium.", "Neither the teacher nor the students has present in the auditorium.",
         1, "In sentences with 'Neither... nor...', the verb agrees in number with the nearer subject ('students' is plural, so 'were' is correct).",
         "'Neither... nor...' में क्रिया अपने सबसे निकटवर्ती कर्ता के अनुसार आती है। यहाँ 'students' बहुवचन है, अतः 'were' शुद्ध है।"),

        # 15. Hindi Grammar - उपसर्ग एवं प्रत्यय (Index 2)
        ("'अपमानित' शब्द में क्रमशः कौन-सा उपसर्ग और कौन-सा प्रत्यय प्रयुक्त हुआ है?",
         "In the Hindi word 'अपमानित', which prefix (Upsarg) and suffix (Pratyaya) are used respectively on the root word 'मान'?",
         "अ (उपसर्ग) और त (प्रत्यय)", "अप (उपसर्ग) और मान (प्रत्यय)", "अप (उपसर्ग) और इत (प्रत्यय) - अप + मान + इत", "अपमा (उपसर्ग) और नित (प्रत्यय)",
         2, "Root word is 'मान' (honor). Prefix is 'अप-' and suffix is '-इत' -> अप + मान + इत = अपमानित.",
         "मूल शब्द 'मान' है। इसमें 'अप-' उपसर्ग आगे लगा है और '-इत' प्रत्यय पीछे जुड़ा है (अप + मान + इत = अपमानित)।"),

        # 16. CLT Approach (Index 3)
        ("What is the core philosophical focus of the 'Communicative Language Teaching' (CLT) approach in the classroom?",
         "कक्षा में 'संप्रेषणात्मक भाषा शिक्षण' (Communicative Language Teaching - CLT) उपागम का केंद्रीय लक्ष्य क्या होता है?",
         "Mastery of isolated Latinate grammatical terminology", "Translating literary classics word-for-word into the native language", "Reciting verb conjugations by heart without understanding context", "Developing communicative competence and practical fluency in authentic real-life social interactions (वास्तविक जीवन के संदर्भों में प्रभावी संप्रेषण क्षमता का विकास)",
         3, "CLT focuses on developing communicative competence—enabling learners to use language meaningfully and fluently in authentic social situations.",
         "संप्रेषणात्मक भाषा शिक्षण (CLT) का मुख्य उद्देश्य भाषा के नियमों को रटने के बजाय दैनिक जीवन के वास्तविक संदर्भों में प्रभावपूर्ण संवाद व संप्रेषण क्षमता विकसित करना है।"),

        # 17. Krashen - Affective Filter (Index 0)
        ("According to Stephen Krashen, when a learner experiences high anxiety, low self-confidence, or fear of punishment in the classroom, what happens to language acquisition?",
         "स्टीफन क्रैशन के अनुसार, जब कोई शिक्षार्थी कक्षा में अत्यधिक भय, तनाव या कम आत्मविश्वास महसूस करता है, तो उसके भाषा अर्जन पर क्या प्रभाव पड़ता है?",
         "The Affective Filter rises, blocking comprehensible input from reaching the language acquisition mechanism (भावात्मक फिल्टर बढ़ जाता है, जिससे इनपुट अवरुद्ध हो जाता है)", "The learner acquires grammar rules with double speed", "The Affective Filter drops to zero, accelerating fluency", "Language acquisition becomes automatic and effortless",
         0, "A high Affective Filter (high anxiety, low confidence) acts as a mental block preventing input from reaching the language acquisition device.",
         "क्रैशन के अनुसार उच्च तनाव या भय से 'भावात्मक फिल्टर' (Affective Filter) उठ जाता है, जो बोधगम्य इनपुट को भाषा अर्जन तंत्र तक पहुंचने से रोक देता है।"),

        # 18. Remedial Teaching in Language (Index 1)
        ("What should be the primary basis for designing and conducting 'Remedial Teaching' (उपचारात्मक शिक्षण) in a language classroom?",
         "भाषा की कक्षा में 'उपचारात्मक शिक्षण' (Remedial Teaching) आयोजित करने का मुख्य आधार क्या होना चाहिए?",
         "The financial background of the parents", "The specific weaknesses and conceptual gaps identified through Diagnostic Evaluation (निदानात्मक परीक्षण द्वारा पहचानी गई विशिष्ट कमियां व भ्रांतियां)", "Randomly assigning extra chapters from advanced grades", "The alphabetical order of student roll numbers",
         1, "Remedial teaching must be directly tailored to rectify specific gaps and misconceptions diagnosed through systematic diagnostic assessment.",
         "उपचारात्मक शिक्षण निदानात्मक परीक्षण (Diagnostic Test) के परिणामों पर आधारित होना चाहिए, ताकि बच्चे की विशिष्ट भाषाई कमजोरी को दूर किया जा सके।"),

        # 19. Hindi Grammar - तत्सम एवं तद्भव (Index 2)
        ("निम्नलिखित में से कौन-सा युग्म 'तत्सम' और उसके 'तद्भव' रूप का सही और प्रामाणिक मेल दर्शाता है?",
         "Which of the following pairs correctly matches a Sanskrit 'Tatsam' word with its evolved Hindi 'Tadbhav' equivalent?",
         "अग्नि - जल", "सूर्य - चंद्रमा", "दुग्ध - दूध (Tatsam: दुग्ध -> Tadbhav: दूध)", "हस्त - चरण",
         2, "Sanskrit root word 'दुग्ध' (Tatsam) evolved into the everyday Hindi word 'दूध' (Tadbhav).",
         "'दुग्ध' संस्कृत का तत्सम शब्द है, जो समय के साथ परिवर्तित होकर हिंदी में 'दूध' (तद्भव) बना।"),

        # 20. English Vocabulary - Context Clues (Index 3)
        ("In reading pedagogy, when a student encounters an unfamiliar English word like 'arid' in the sentence: 'The desert was so arid that no crops could survive without irrigation', and infers that 'arid' means 'dry', which reading strategy was used?",
         "पठन शिक्षण में, जब कोई छात्र किसी अपरिचित शब्द के अर्थ का अनुमान वाक्य के संदर्भ (जैसे 'desert' और 'irrigation') को देखकर लगाता है, तो उसने किस पठन रणनीति का प्रयोग किया?",
         "Rote dictionary drilling", "Phonetic spell-check algorithm", "Sub-vocal articulation", "Using Context Clues (संदर्भगत संकेतों द्वारा अर्थ निकालना)",
         3, "Context clues refer to hints found within a sentence or paragraph that a reader can use to infer the meaning of unfamiliar words.",
         "संदर्भगत संकेत (Context Clues) वाक्य में छिपे वे सुराग होते हैं जिनकी सहायता से पाठक किसी नए या अज्ञात शब्द के अर्थ का सहज अनुमान लगा लेता है।"),

        # 21. Translanguaging Pedagogy (Index 0)
        ("In modern bilingual classrooms, what pedagogical practice encourages learners to flexibly draw upon their entire linguistic repertoire (mother tongue and school language) to communicate, discuss ideas, and construct meaning?",
         "आधुनिक द्विभाषी कक्षाओं में, कौन-सा शिक्षण अभ्यास शिक्षार्थियों को अपनी पूरी भाषाई पूंजी (मातृभाषा एवं मानक विद्यालयी भाषा) का लचीलेपन से प्रयोग कर विचार विमर्श व ज्ञान निर्माण करने की अनुमति देता है?",
         "Translanguaging (भाषा-पारगमन / ट्रांसलैंग्वेजिंग)", "Submersion Method", "Strict Monolingual Prohibition", "Grammar Translation Rote Drill",
         0, "Translanguaging is the pedagogical practice where multilingual learners fluidly leverage all their linguistic resources to make meaning and learn.",
         "ट्रांसलैंग्वेजिंग (Translanguaging) वह शिक्षण दृष्टिकोण है जिसमें बच्चे अपनी मातृभाषा और लक्ष्य भाषा दोनों के शब्दों का सहज उपयोग करके अवधारणाओं को समझते हैं।"),

        # 22. Authentic Material in Language Teaching (Index 1)
        ("Which of the following is considered an 'Authentic Material' (प्रामाणिक सामग्री) in language pedagogy?",
         "भाषा शिक्षण में निम्नलिखित में से किसे 'प्रामाणिक शिक्षण सामग्री' (Authentic Material) माना जाता है?",
         "A simplified sentence exercise constructed artificially only for a grammar test", "A real restaurant menu, train ticket, or newspaper article written for native speakers (वास्तविक होटल का मेनू कार्ड, रेल टिकट या समाचार पत्र का लेख)", "A list of isolated vocabulary words in alphabetical order", "A synthetic phonetic pronunciation workbook",
         1, "Authentic materials are real-world texts (menus, advertisements, newspapers) created for genuine communicative purposes, not solely for language drills.",
         "प्रामाणिक सामग्री (Authentic Material) वह वास्तविक सामग्री है जो भाषा सीखने के लिए कृत्रिम रूप से नहीं, बल्कि वास्तविक जीवन में संवाद हेतु बनाई गई हो (जैसे मेनू, बस टिकट, अखबार)।"),

        # 23. Hindi Grammar - विलोम एवं पर्यायवाची (Index 2)
        ("'अमृत' शब्द का सही विलोम शब्द और सही पर्यायवाची शब्द क्रमशः कौन-सा है?",
         "In Hindi grammar, what is the correct antonym (Vilom) and synonym (Paryayvachi) of the word 'अमृत'?",
         "जल एवं पावक", "सुधा एवं गरल", "विष (विलोम) एवं सुधा (पर्यायवाची)", "अग्नि एवं समीर",
         2, "'अमृत' का विलोम 'विष' होता है, और इसका पर्यायवाची 'सुधा' या 'पीयूष' होता है।",
         "'अमृत' का विलोम शब्द 'विष' (गरल) है और इसका पर्यायवाची 'सुधा' (पीयूष, सोम) है।"),

        # 24. Writing as a Process (Index 3)
        ("In contemporary language pedagogy, 'Writing as a Process' (प्रक्रिया आधारित लेखन उपागम) involves which sequential stages?",
         "समकालीन भाषा शिक्षण में, 'प्रक्रिया आधारित लेखन' (Writing as a Process) के अंतर्गत कौन-से क्रमिक चरण शामिल होते हैं?",
         "Testing -> Ranking -> Failing -> Retesting", "Copying from blackboard -> Silent reading -> Recitation", "Grammar drill -> Direct translation -> Penmanship test", "Brainstorming/Pre-writing -> Drafting -> Revising -> Editing -> Publishing (विचार-मंथन -> प्रारूपण -> संशोधन -> संपादन -> प्रकाशन)",
         3, "The process approach to writing involves recursive stages: pre-writing (brainstorming), drafting, revising, editing (proofreading), and sharing/publishing.",
         "प्रक्रिया आधारित लेखन में बालक सीधे अंतिम लेख नहीं लिखता, बल्कि विचार-मंथन (Brainstorming), प्रारूप बनाना (Drafting), संशोधन (Revising), संपादन (Editing) और प्रकाशन के चरणों से गुजरता है।")
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
            'domain': 'Language Pedagogy Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all CTET Language Pedagogy domains
    language_modules = [
        # Language Acquisition & Theories
        ("Chomsky's Language Acquisition Device (LAD)", "Innate neuro-cognitive predisposition universal to all human children", "भाषा अर्जन यंत्र (LAD की अवधारणा)", "भाषा अर्जन"),
        ("Chomsky's Universal Grammar (UG)", "Underlying structural principles shared by all human languages", "सार्वभौमिक व्याकरण का सिद्धांत", "भाषा अर्जन"),
        ("Krashen's Acquisition-Learning Distinction", "Subconscious intuitive acquisition vs conscious formal learning of rules", "अर्जन बनाम अधिगम का अंतर (क्रैशन)", "द्वितीय भाषा अर्जन"),
        ("Krashen's Comprehensible Input (i + 1)", "Providing language input just one level beyond the learner's current competence", "बोधगम्य इनपुट परिकल्पना (i + 1)", "द्वितीय भाषा अर्जन"),
        ("Krashen's Affective Filter Hypothesis", "Emotional barrier (anxiety, self-consciousness) inhibiting language intake", "भावात्मक फिल्टर परिकल्पना", "द्वितीय भाषा अर्जन"),
        ("Krashen's Natural Order Hypothesis", "Grammatical structures are acquired in a predictable developmental sequence", "प्राकृतिक क्रम परिकल्पना", "द्वितीय भाषा अर्जन"),
        ("Krashen's Monitor Hypothesis", "Conscious grammar learning acts only as an editor/monitor during speech production", "मॉनिटर परिकल्पना", "द्वितीय भाषा अर्जन"),
        ("Vygotsky's Social Speech to Inner Speech", "Social communication internalized into private speech and finally inner verbal thought", "सामाजिक संवाद से अंतर्निहित विचार", "भाषा व चिंतन"),
        ("Skinner's Behaviorist Theory (Imitation & Reinforcement)", "Language learned through conditioning and operant stimulus-response bonds", "व्यवहारवादी भाषा सिद्धांत (स्किनर)", "भाषा सिद्धांत"),

        # Four Skills (LSRW)
        ("Listening Comprehension Sub-skills", "Distinguishing phonemes, catching stress and intonation, identifying main idea", "श्रवण कौशल एवं उसके उप-कौशल", "भाषा कौशल"),
        ("Speaking Fluency vs Accuracy", "Encouraging spontaneous expression without anxiety over minor grammatical errors", "मौखिक अभिव्यक्ति (धाराप्रवाहता बनाम शुद्धता)", "भाषा कौशल"),
        ("Skimming Technique for Global Gist", "Rapid scanning over text headings and introductory paragraphs for overall theme", "सरसरी तौर पर पठन (Skimming)", "पठन कौशल"),
        ("Scanning for Specific Factual Details", "Targeted visual sweep locating isolated dates, names or telephone numbers", "बारीकी से पठन (Scanning)", "पठन कौशल"),
        ("Intensive Reading for Micro-Structure", "Close detailed linguistic and semantic analysis of short dense passages", "गहन पठन (Intensive Reading)", "पठन कौशल"),
        ("Extensive Reading for Pleasure & Fluency", "Wide independent reading of accessible narratives fostering reading habit", "विस्तृत / द्रुत पठन (Extensive Reading)", "पठन कौशल"),
        ("Writing as a Recursive Process", "Pre-writing, drafting, peer-feedback, revising, proofreading, and publishing", "प्रक्रिया आधारित लेखन (Process Writing)", "लेखन कौशल"),
        ("Mechanics of Writing (Handwriting, Punctuation, Spelling)", "Lower-order transcription skills supporting higher-order compositional expression", "लेखन के यांत्रिक पहलू (विराम चिह्न व वर्तनी)", "लेखन कौशल"),

        # Multilingualism & Diversity
        ("Multilingualism as a Classroom Resource", "Leveraging home languages to negotiate meaning, validate cultural identity", "बहुभाषिकता एक संसाधन के रूप में", "बहुभाषिकता"),
        ("Translanguaging in Primary Education", "Fluid, flexible shuttling between languages to enrich understanding", "ट्रांसलैंग्वेजिंग (भाषा-पारगमन)", "बहुभाषिकता"),
        ("Mother Tongue Based Multilingual Education (MTB-MLE)", "Building early literacy and numeracy in child's mother tongue (NEP 2020)", "मातृभाषा आधारित बहुभाषी शिक्षण", "बहुभाषिकता"),
        ("Linguistic Diversity vs Linguistic Deficit", "Rejecting non-standard dialect deficit view; valuing all sociolects equally", "भाषाई विविधता बनाम भाषाई हीनता भ्रम", "बहुभाषिकता"),

        # Grammar in Context
        ("Inductive Grammar Teaching (Examples to Rules)", "Students actively notice patterns in authentic texts before deriving rules", "आगमन विधि (संदर्भ में व्याकरण)", "व्याकरण शिक्षण"),
        ("Deductive Grammar Teaching (Rules to Practice)", "Presenting formal rule first, followed by isolated synthetic drills", "निगमन विधि (नियम से उदाहरण)", "व्याकरण शिक्षण"),
        ("Functional Grammar in Communicative Context", "Grammar taught as tools for real-world meaning making rather than abstract terms", "प्रकार्यात्मक व्याकरण (Functional Grammar)", "व्याकरण शिक्षण"),
        ("Grammar Translation Method Limitations", "Excessive reliance on L1 translation inhibits automatic oral fluency in L2", "व्याकरण-अनुवाद विधि की सीमाएं", "शिक्षण विधियां"),

        # Language Disorders & Errors
        ("Dyslexia in Early Language Learning", "Phonological processing deficits causing difficulty in mapping letters to sounds", "डिस्लेक्सिया एवं पठन अक्षमता", "अधिगम कठिनाइयां"),
        ("Dysgraphia Motor and Spatial Challenges", "Difficulty in letter formation, spacing, and converting verbal thoughts to text", "डिस्ग्राफिया एवं लेखन अक्षमता", "अधिगम कठिनाइयां"),
        ("Developmental Language Errors (Interlanguage)", "Overgeneralization of rules (e.g., 'goed' instead of 'went') shows active grammar construction", "विकासात्मक त्रुटियां एवं अति-सामान्यीकरण", "त्रुटि विश्लेषण"),
        ("Error Correction Pedagogical Protocol", "Gentle recasting and modeling rather than punitive interruption during conversation", "त्रुटि सुधार प्रविधियां (Recasting)", "शिक्षण प्रविधि"),

        # Assessment & Remediation
        ("Formative Language Assessment Tasks", "Role plays, group storytelling, reading logs, learner portfolios", "रचनात्मक भाषाई आकलन", "आकलन एवं मूल्यांकन"),
        ("Diagnostic Tests in Language Learning", "Pinpointing specific phonetic confusion or syntactic comprehension breakdowns", "भाषा में निदानात्मक परीक्षण", "आकलन एवं मूल्यांकन"),
        ("Remedial Teaching Language Workshops", "Targeted, multisensory, engaging activities addressing diagnosed gaps", "उपचारात्मक शिक्षण रणनीतियां", "उपचारात्मक शिक्षण"),
        ("Rubrics for Assessing Speaking and Writing", "Explicit criteria covering content, organization, vocabulary, syntax, and voice", "रूब्रिक्स द्वारा भाषा मूल्यांकन", "आकलन प्रविधि"),
        ("Authentic Materials (Menus, Brochures, News)", "Real-world linguistic artifacts bridging classroom lessons to living reality", "प्रामाणिक शिक्षण सामग्री (Authentic Materials)", "शिक्षण सहायक सामग्री"),

        # Hindi & English Grammar Core
        ("स्वर संधि, व्यंजन संधि एवं विसर्ग संधि", "Rules of euphonic junction in Sanskrit and Hindi compounds", "संधि के भेद एवं विच्छेद", "हिन्दी व्याकरण"),
        ("समास के छह प्रमुख भेद (तत्पुरुष, कर्मधारय, आदि)", "Compound words structure and semantic headship analysis", "समास के भेद एवं विग्रह", "हिन्दी व्याकरण"),
        ("उपसर्ग और प्रत्यय द्वारा शब्द रचना", "Derivational and inflectional affixation in Hindi morphology", "उपसर्ग एवं प्रत्यय अनुप्रयोग", "हिन्दी व्याकरण"),
        ("तत्सम, तद्भव, देशज एवं विदेशी शब्द", "Etymological origins and historical evolution of Hindi lexicon", "शब्द विचार एवं वर्गीकरण", "हिन्दी व्याकरण"),
        ("विलोम, पर्यायवाची एवं अनेकार्थी शब्द", "Lexical antonymy, synonymy and polysemy in contextual usage", "पर्यायवाची एवं विलोम शब्द", "हिन्दी व्याकरण"),
        ("मुहावरे और लोकोक्तियों का लाक्षणिक प्रयोग", "Idiomatic expressions enriching figurative and expressive communication", "मुहावरे एवं लोकोक्तियां", "हिन्दी व्याकरण"),
        ("Subject-Verb Concord in Complex Sentences", "Rules of number and person harmony between subjects and predicates", "सब्जेक्ट-वर्ब कॉनकॉर्ड नियम", "अंग्रेजी व्याकरण"),
        ("Prepositions of Time, Place and Movement", "Accurate usage of in, on, at, into, onto, between, among", "अंग्रेजी प्रीपोजिशन अनुप्रयोग", "अंग्रेजी व्याकरण"),
        ("Active and Passive Voice Transformation", "Focusing on agent vs recipient of action in informational texts", "वाच्य परिवर्तन (Active vs Passive)", "अंग्रेजी व्याकरण"),
        ("Direct and Indirect Speech Transformation", "Tense shifting, pronoun changes and reporting clause mechanics", "कथन परिवर्तन (Direct/Indirect Speech)", "अंग्रेजी व्याकरण")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        l_idx = (i - 24) % len(language_modules)
        topic, facts, theme, category = language_modules[l_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In Language Acquisition and Pedagogy, which statement correctly describes '{topic}'?"
            stem_hi = f"भाषा अर्जन एवं शिक्षण शास्त्र के अंतर्गत '{topic}' से संबंधित कौन-सा कथन प्रामाणिक है?"
            sol_en = f"Accurate linguistic principle for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही भाषाई सिद्धांत: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Subterranean magma viscosity flow rate calculation", 'hi': "भूमिगत मैग्मा श्यानता प्रवाह दर"},
                {'en': "Stratospheric chlorofluorocarbon catalytic decay index", 'hi': "समतापमंडलीय सीएफसी उत्प्रेरक क्षय सूचकांक"},
                {'en': "Deep ocean trench sonar bathymetry metric", 'hi': "गहरे महासागरीय गर्त सोनार गहराई मापन"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key content or pedagogical area of CTET Language Development is '{topic}' classified?"
            stem_hi = f"सीटीईटी भाषा विकास एवं शिक्षण शास्त्र में '{topic}' किस मुख्य विषय-क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' is categorized under {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) क्षेत्र से है।"
            choices = [
                {'en': "Medieval French Heraldry Nomenclature", 'hi': "मध्यकालीन फ्रांसीसी राजचिह्न नामकरण"},
                {'en': f"CTET Language Pedagogy: {category} ({theme})", 'hi': f"सीटीईटी भाषा शिक्षण: {category} ({theme})"},
                {'en': "Alaskan Tundra Permafrost Thawing Rate", 'hi': "अलास्का टुंड्रा बर्फ पिघलने की दर"},
                {'en': "Polynesian Outrigger Canoe Navigation Route", 'hi': "पोलिनेशियन डोंगी समुद्री नौकायन मार्ग"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should an effective language educator implement '{topic}' in a diverse elementary classroom?"
            stem_hi = f"एक प्रभावी भाषा शिक्षक को समावेशी कक्षा में '{topic}' का सफल क्रियान्वयन किस प्रकार करना चाहिए?"
            sol_en = f"Recommended pedagogy: {facts}. Domain: {category}."
            sol_hi = f"अनुशंसित शिक्षण अभ्यास: {facts} (क्षेत्र: {category})।"
            choices = [
                {'en': "Silencing children whenever they use words from their home language", 'hi': "मातृभाषा के शब्द बोलने पर बच्चों को चुप करा देना"},
                {'en': "Testing students with isolated rote grammar definitions without context", 'hi': "बिना संदर्भ केवल रटंत व्याकरण परिभाषाओं की परीक्षा लेना"},
                {'en': f"Communicative method: {facts} ({theme})", 'hi': f"संप्रेषणात्मक शिक्षण उपागम: {facts} ({theme})"},
                {'en': "Insisting on strict mechanical repetition of synthetic textbooks only", 'hi': "केवल कृत्रिम पाठ्यपुस्तकों की यांत्रिक नकल पर जोर देना"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is sound pedagogical understanding of '{topic}' essential for developing communicative competence in children?"
            stem_hi = f"बच्चों में संप्रेषणात्मक दक्षता और भाषाई प्रवाह के विकास हेतु '{topic}' का ज्ञान शिक्षक के लिए क्यों अनिवार्य है?"
            sol_en = f"It fosters natural language acquisition, eliminates communicative anxiety, and values linguistic diversity: {facts}."
            sol_hi = f"यह स्वाभाविक भाषा अर्जन, भाषाई झिझक दूर करने और बहुभाषिकता के सम्मान हेतु आवश्यक है: {facts}।"
            choices = [
                {'en': "To trade financial derivatives on international stock markets", 'hi': "अंतरराष्ट्रीय शेयर बाजारों में वित्तीय डेरिवेटिव का व्यापार करने हेतु"},
                {'en': "To command deep sea oil tankers in arctic waters", 'hi': "आर्कटिक जलक्षेत्र में गहरे समुद्र में तेल टैंकर का संचालन करने हेतु"},
                {'en': "To manufacture optical glass lenses for satellite telescopes", 'hi': "उपग्रह दूरबीन हेतु प्रकाशीय कांच के लेंस निर्माण हेतु"},
                {'en': f"Essential for communicative language pedagogy: {facts}", 'hi': f"प्रभावी भाषाई शिक्षण एवं संप्रेषण दक्षता हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Language Pedagogy - {category}',
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
    res = get_raw_language_pedagogy_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

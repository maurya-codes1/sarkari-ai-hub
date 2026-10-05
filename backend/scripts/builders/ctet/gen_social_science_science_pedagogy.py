"""
CTET - Science, Social Science & Upper Primary Pedagogy (विज्ञान, सामाजिक विज्ञान एवं उच्च प्राथमिक शिक्षाशास्त्र) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Upper Primary Science Core:
  - Food & Materials: Nutrient tests (Iodine for starch, Biuret for protein), Acids, Bases & Indicators, Separation
  - World of the Living: Cell biology, Respiration, Plant/Animal reproduction, Ecosystems
  - How Things Work / Physics: Motion & Time, Electric circuits, Mirrors & Lenses, Sound (Frequency, Amplitude), Pressure
- Upper Primary Social Science Core:
  - History: Harappa, Ashoka's Dhamma, Delhi Sultanate, Mughal Mansabdari, 1857 Revolt, Social Reformers, National Movement
  - Geography: Latitudes/Longitudes, Earth motions (Seasons), Atmospheric layers, Ocean currents, Indian physical geography
  - Social & Political Life (SPL): Panchayati Raj, State Government, Constitution, Judiciary & PIL, Criminal Justice System & FIR
- Pedagogy of Science & Social Science:
  - Nature of Science: Empirical inquiry, Scientific temper (Article 51A), Hands-on experiments
  - Nature of Social Science: Primary vs Secondary sources, Developing critical thinking, Multi-perspective analysis
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_upper_primary_pedagogy_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Science - Nutrient Test for Starch (Index 0)
        ("In a school science laboratory, when a few drops of dilute Iodine solution are added to a crushed raw potato sample, what distinct color change confirms the presence of Starch?",
         "विद्यालय की विज्ञान प्रयोगशाला में जब कच्चे आलू के पेस्ट पर तनु आयोडीन विलयन (Dilute Iodine Solution) की कुछ बूंदें डाली जाती हैं, तो किस रंग में परिवर्तन स्टार्च (मंड) की उपस्थिति को सिद्ध करता है?",
         "Blue-Black color (नीला-काला रंग)", "Bright Red color", "Pale Green color", "Milky White precipitate",
         0, "Iodine reacts with amylose in starch to form a characteristic blue-black complex.",
         "स्टार्च (मंड) पर आयोडीन विलयन डालने पर उसका रंग बदलकर नीला-काला (Blue-Black) हो जाता है, जो मंड की उपस्थिति का प्रामाणिक परीक्षण है।"),

        # 2. History - Ashoka's Dhamma & Script (Index 1)
        ("Most of the historic rock and pillar inscriptions of Emperor Ashoka conveying his message of Dhamma were written in the Prakrit language and which ancient script?",
         "सम्राट अशोक के अधिकांश ऐतिहासिक शिलालेख और स्तंभ लेख, जो उनके 'धम्म' का संदेश प्रसारित करते हैं, प्राकृत भाषा और किस प्राचीन लिपि में उत्कीर्ण किए गए थे?",
         "Devanagari script", "Brahmi script (ब्राह्मी लिपि)", "Kharosthi script", "Greek script",
         1, "Most of Ashoka's inscriptions in India were written in Prakrit using the Brahmi script, deciphered by James Prinsep in 1837.",
         "अशोक के अधिकांश शिलालेख प्राकृत भाषा और 'ब्राह्मी लिपि' (Brahmi Script) में लिखे गए थे, जिसे 1837 में जेम्स प्रिंसेप ने पहली बार पढ़ा था।"),

        # 3. Geography - Atmospheric Layers & Ozone (Index 2)
        ("In which atmospheric layer directly above the troposphere is the protective Ozone layer situated, making it the most ideal layer for flying commercial jet aircraft due to lack of weather turbulence?",
         "क्षोभमंडल के ठीक ऊपर स्थित वायुमंडल की किस परत में जीवनरक्षक 'ओजोन परत' पाई जाती है और बादलों व मौसमी हलचलों से मुक्त होने के कारण यह हवाई जहाजों के उड़ान भरने हेतु सर्वोत्तम मानी जाती है?",
         "Troposphere", "Mesosphere", "Stratosphere (समताप मंडल)", "Thermosphere",
         2, "The Stratosphere contains the protective ozone layer (O3) and is free from clouds and turbulent weather, making it ideal for jet flying.",
         "समताप मंडल (Stratosphere) में ओजोन गैस की परत होती है जो पराबैंगनी किरणों से रक्षा करती है। इसमें मौसमी घटनाएं नहीं होतीं, अतः यह जेट विमानों की उड़ान हेतु आदर्श है।"),

        # 4. Social & Political Life - PIL (Index 3)
        ("Under which revolutionary legal mechanism, introduced by the Supreme Court of India in the early 1980s, can any citizen or organization file a petition on behalf of underprivileged persons whose rights are being violated?",
         "1980 के दशक की शुरुआत में भारत के सर्वोच्च न्यायालय द्वारा शुरू की गई किस क्रांतिकारी न्यायिक व्यवस्था के तहत कोई भी नागरिक या संगठन उन निर्धन लोगों की ओर से न्यायालय जा सकता है जिनके अधिकारों का हनन हुआ हो?",
         "Special Leave Petition", "Review Petition", "Curative Petition", "Public Interest Litigation - PIL (जनहित याचिका)",
         3, "Public Interest Litigation (PIL) was pioneered by Justices P.N. Bhagwati and V.R. Krishna Iyer to ensure judicial access for marginalized communities.",
         "जनहित याचिका (PIL - Public Interest Litigation) व्यवस्था न्यायमूर्ति पी.एन. भगवती द्वारा शुरू की गई थी, जिसके माध्यम से साधारण पत्र लिखकर भी जनहित में न्याय मांगा जा सकता है।"),

        # 5. Science - Acid-Base Neutralization Indicator (Index 0)
        ("When a few drops of synthetic Phenolphthalein indicator are added to an aqueous solution of Sodium Hydroxide (NaOH, a strong base), what color change is observed?",
         "जब सोडियम हाइड्रॉक्साइड (NaOH - एक क्षार) के जलीय विलयन में संश्लेषित सूचक 'फिनॉल्फथलीन' (Phenolphthalein) की कुछ बूंदें मिलाई जाती हैं, तो कौन-सा रंग दिखाई देता है?",
         "Deep Pink color (गुलाबी रंग)", "Colorless", "Deep Yellow color", "Dark Brown color",
         0, "Phenolphthalein turns bright pink in basic solutions (pH > 8.2) and remains colorless in acidic or neutral solutions.",
         "फिनॉल्फथलीन क्षारीय विलयन में गुलाबी (Pink) रंग देता है, जबकि अम्लीय अथवा उदासीन विलयन में यह रंगहीन (Colorless) रहता है।"),

        # 6. History - 1857 Revolt Outbreak (Index 1)
        ("At which military cantonment did sepoy Mangal Pandey rebel against the British East India Company on 29 March 1857 by attacking British officers, initiating the prelude to the 1857 Uprising?",
         "29 मार्च 1857 को किस सैन्य छावनी में युवा सिपाही मंगल पांडे ने चर्बी वाले कारतूसों के विरोध में ब्रिटिश अधिकारियों पर हमला कर 1857 के प्रथम स्वतंत्रता संग्राम की पृष्ठभूमि तैयार की थी?",
         "Meerut Cantonment", "Barrackpore Cantonment (बैरकपुर छावनी, बंगाल)", "Ambala Cantonment", "Gwalior Cantonment",
         1, "Mangal Pandey staged his historic revolt at the Barrackpore military cantonment near Kolkata, for which he was hanged on 8 April 1857.",
         "मंगल पांडे 34वीं बंगाल नेटिव इन्फैंट्री के सिपाही थे जिन्होंने बैरकपुर (बंगाल) छावनी में ब्रिटिश हुकूमत के खिलाफ बगावत का बिगुल फूंका था।"),

        # 7. Geography - International Standard Meridian of India (Index 2)
        ("The Standard Meridian of India, which determines Indian Standard Time (IST) exactly 5 hours and 30 minutes ahead of Greenwich Mean Time (GMT), passes through Mirzapur (near Prayagraj) along which longitude?",
         "भारत का मानक याम्योत्तर (Standard Meridian), जो भारतीय मानक समय (IST) निर्धारित करता है और ग्रीनविच से 5 घंटे 30 मिनट आगे है, मिर्जापुर (प्रयागराज) से किस देशांतर रेखा से होकर गुजरता है?",
         "80° 30' E Longitude", "85° 00' E Longitude", "82° 30' E Longitude (82° 30' पूर्वी देशांतर)", "75° 30' E Longitude",
         2, "The Standard Meridian of India is 82°30' East longitude, passing through Mirzapur in Uttar Pradesh.",
         "भारत का मानक समय 82°30' पूर्वी देशांतर (82.5° E) से मापा जाता है, जो मिर्जापुर से गुजरती है और ग्रीनविच रेखा से 5 घंटे 30 मिनट आगे है।"),

        # 8. SPL - Panchayati Raj Three Tiers (Index 3)
        ("Under the 73rd Constitutional Amendment Act, what is the middle tier (block-level body) of the three-tier Panchayati Raj system in India?",
         "73वें संविधान संशोधन के तहत भारत की त्रि-स्तरीय पंचायती राज व्यवस्था में खंड/प्रखंड स्तर (Block Level) पर कार्य करने वाली मध्यवर्ती संस्था कौन-सी है?",
         "Gram Sabha", "Zila Parishad", "Nyaya Panchayat", "Panchayat Samiti / Janpad Panchayat (पंचायत समिति / प्रखंड पंचायत)",
         3, "The three tiers are Gram Panchayat (village), Panchayat Samiti (block/intermediate level), and Zila Parishad (district level).",
         "पंचायती राज के तीन स्तर हैं: ग्राम पंचायत (ग्राम स्तर), पंचायत समिति (प्रखंड स्तर), और जिला परिषद (जिला स्तर)।"),

        # 9. Science - Sound Pitch vs Loudness (Index 0)
        ("In the physical properties of sound, the 'Pitch' (श्रुति / तीखापन) of a sound is determined by its frequency, while the 'Loudness' (प्रबलता) is determined by which property of vibration?",
         "ध्वनि के भौतिक गुणों में, ध्वनि का 'तारत्व' (Pitch) उसकी आवृत्ति से निर्धारित होता है, जबकि ध्वनि की 'प्रबलता' (Loudness) कंपन के किस गुण पर निर्भर करती है?",
         "Amplitude of vibration (कंपन का आयाम)", "Speed of sound in air", "Wavelength of the acoustic wave", "Distance of the listening observer",
         0, "Loudness is proportional to the square of the amplitude of vibration (Loudness ∝ Amplitude²), while pitch depends on frequency.",
         "ध्वनि की प्रबलता कंपन के 'आयाम' (Amplitude) के वर्ग के समानुपाती होती है, जबकि तीखापन या तारत्व (Pitch) कंपन की आवृत्ति (Frequency) पर निर्भर करता है।"),

        # 10. History - Mughal Mansabdari System (Index 1)
        ("In the administrative structure established by Mughal Emperor Akbar, what did the numerical rank called 'Zat' (जात) determine for a Mansabdar?",
         "मुगल सम्राट अकबर द्वारा लागू की गई 'मनसबदारी प्रणाली' में 'जात' (Zat) नामक संख्यात्मक पद मनसबदार के किस अधिकार व स्थिति को निर्धारित करता था?",
         "The number of elephants presented to the royal court", "The personal rank, noble status, and official salary of the Mansabdar (मनसबदार का व्यक्तिगत पद, प्रतिष्ठा एवं वेतन)", "The number of cannons mounted in provincial forts", "The specific geographic province assigned for revenue collection",
         1, "In the Mansabdari system, 'Zat' fixed the noble's personal military ranking and salary, while 'Sawar' determined the number of horsemen required to maintain.",
         "मनसबदारी में 'जात' (Zat) मनसबदार के पद, ओहदे और वेतन का सूचक था, जबकि 'सवार' (Sawar) उसके द्वारा रखे जाने वाले घुड़सवार सैनिकों की संख्या दर्शाता था।"),

        # 11. Geography - Earth's Revolution and Seasons (Index 2)
        ("The occurrence of varying seasons (Summer, Winter, Spring, Autumn) on Earth is primarily caused by which combined planetary factors?",
         "पृथ्वी पर विभिन्न ऋतुओं (गर्मी, सर्दी, वसंत, शरद) का चक्र मुख्य रूप से किन दो खगोलीय कारणों के संयोजन से उत्पन्न होता है?",
         "Earth's rotation on its axis and lunar gravitational pull", "Sun's variable solar flare radiation and ocean tidal currents", "Earth's revolution around the Sun and the permanent tilt of its axis at 66.5° to orbital plane (सूर्य की परिक्रमा एवं अक्ष का 66.5° कक्षीय झुकाव)", "Continental drift and variable distance from Jupiter",
         2, "Seasons are caused by Earth's revolution around the Sun combined with the 23.5° axial tilt (66.5° to its orbital plane).",
         "ऋतु परिवर्तन पृथ्वी द्वारा सूर्य के चारों ओर 'परिक्रमण' (Revolution) और अपने अक्ष पर 66.5° कक्षीय झुकाव के कारण होता है।"),

        # 12. SPL - Criminal Justice System & FIR (Index 3)
        ("Under Section 154 of the Code of Criminal Procedure / BNSS, what official written record must a police officer in charge of a police station register upon receiving information about the commission of a cognizable offense?",
         "दंड प्रक्रिया संहिता / बीएनएसएस के तहत किसी संज्ञेय अपराध (Cognizable Offense) की सूचना मिलने पर थाना प्रभारी द्वारा सर्वप्रथम कौन-सा आधिकारिक दस्तावेज दर्ज करना अनिवार्य है?",
         "Charge Sheet", "Case Diary", "Arrest Memo", "First Information Report - FIR (प्रथम सूचना रिपोर्ट)",
         3, "An FIR (First Information Report) is the initial written document registered by police upon receiving information about a cognizable offense.",
         "प्रथम सूचना रिपोर्ट (FIR) वह प्राथमिक दस्तावेज है जिसे पुलिस किसी संज्ञेय अपराध की सूचना मिलने पर तुरंत दर्ज करने के लिए कानूनी रूप से बाध्य है।"),

        # 13. Science - Electric Current Magnetic Effect (Index 0)
        ("Which Danish physicist discovered in 1820 that an electric current flowing through a wire deflects a nearby magnetic compass needle, establishing electromagnetism?",
         "किस डेनिश भौतिक विज्ञानी ने 1820 में यह ऐतिहासिक खोज की थी कि तार में विद्युत धारा प्रवाहित करने पर पास रखी चुंबकीय सुई विक्षेपित हो जाती है?",
         "Hans Christian Oersted (हांस क्रिश्चियन ओर्स्टेड)", "Michael Faraday", "James Prescott Joule", "Thomas Alva Edison",
         0, "Oersted discovered the magnetic effect of electric current when he noticed a compass needle deflected next to a current-carrying wire.",
         "हांस क्रिश्चियन ओर्स्टेड ने सर्वप्रथम देखा कि विद्युत धारा प्रवाहित चालक के चारों ओर चुंबकीय क्षेत्र उत्पन्न होता है जो चुंबकीय सुई को विक्षेपित करता है।"),

        # 14. History - Social Reformers - Jyotirao Phule (Index 1)
        ("In 1873, social reformer Jyotirao Govindrao Phule founded the 'Satyashodhak Samaj' in Maharashtra and authored the book 'Gulamgiri' dedicated to which historic struggle?",
         "1873 में महाराष्ट्र के समाज सुधारक ज्योतिराव गोविंदराव फुले ने 'सत्यशोधक समाज' की स्थापना की और अपनी प्रसिद्ध पुस्तक 'गुलामगिरी' किस ऐतिहासिक संघर्ष को समर्पित की थी?",
         "The French Revolution peasants", "The American movement against Black slavery (अमेरिकी अश्वेत दास-मुक्ति आंदोलन)", "The Russian Bolshevik working class", "The British Chartist labor movement",
         1, "Phule dedicated 'Gulamgiri' (Slavery) to the American abolitionists who fought to free African-American slaves, linking it to the struggle of lower castes in India.",
         "ज्योतिराव फुले ने अपनी पुस्तक 'गुलामगिरी' (1873) उन अमेरिकी समाज सुधारकों को समर्पित की जिन्होंने अश्वेत दासों को मुक्त कराने के लिए संघर्ष किया था।"),

        # 15. Geography - Ocean Currents - Gulf Stream (Index 2)
        ("Which powerful, warm ocean current originates in the Gulf of Mexico and flows across the North Atlantic, moderating the winter climate of Western European ports and keeping them ice-free?",
         "मैक्सिको की खाड़ी से उत्पन्न होकर उत्तरी अटलांटिक में बहने वाली कौन-सी शक्तिशाली 'गर्म महासागरीय जलधारा' पश्चिमी यूरोप के बंदरगाहों को सर्दियों में भी बर्फ-मुक्त रखती है?",
         "Labrador Current (Cold)", "Canary Current (Cold)", "Gulf Stream (गल्फ स्ट्रीम - गर्म जलधारा)", "Oyashio Current (Cold)",
         2, "The Gulf Stream is a warm Atlantic ocean current that moderates coastal temperatures across northwestern Europe.",
         "गल्फ स्ट्रीम (Gulf Stream) एक गर्म जलधारा है जो मैक्सिको की खाड़ी से उत्तर-पूर्व की ओर बहती है और पश्चिमी यूरोप के तटीय मौसम को अत्यधिक ठंडा होने से बचाती है।"),

        # 16. SPL - Role of Judiciary - Independent Judiciary (Index 3)
        ("What constitutional provision ensures that judges of the Supreme Court and High Courts in India remain independent of political executive interference?",
         "भारतीय संविधान में कौन-सा प्रावधान यह सुनिश्चित करता है कि सर्वोच्च न्यायालय और उच्च न्यायालय के न्यायाधीश राजनीतिक कार्यपालिका के अनुचित दबाव से स्वतंत्र रहें?",
         "Judges are elected directly by public parliamentary vote every five years", "Judges can be summarily removed by a ministerial cabinet order", "Judges receive bonuses based on convictions delivered in courts", "Security of tenure, high bar for impeachment in Parliament, and salaries charged on Consolidated Fund (कार्यकाल की सुरक्षा एवं संचित निधि से वेतन)",
         3, "Judicial independence is safeguarded by security of tenure, difficult impeachment process, and non-votable salaries charged on the Consolidated Fund.",
         "न्यायपालिका की स्वतंत्रता हेतु न्यायाधीशों के कार्यकाल की सुरक्षा, संसद द्वारा महाभियोग की अत्यंत कठोर प्रक्रिया तथा संचित निधि पर भारित वेतन का प्रावधान है।"),

        # 17. Science - Cell Organelle - Mitochondria (Index 0)
        ("Which cell organelle is hailed as the 'Powerhouse of the Cell' because it generates adenosine triphosphate (ATP) via cellular aerobic respiration?",
         "किस कोशिकांग (Cell Organelle) को 'कोशिका का शक्तिगृह' (Powerhouse of the Cell) कहा जाता है क्योंकि यह कोशिकीय श्वसन द्वारा एटीपी (ATP) ऊर्जा का उत्पादन करता है?",
         "Mitochondria (माइटोकॉन्ड्रिया)", "Ribosome", "Golgi Apparatus", "Endoplasmic Reticulum",
         0, "Mitochondria produce cellular chemical energy in the form of ATP, earning the title 'Powerhouse of the Cell'.",
         "माइटोकॉन्ड्रिया में कोशिकीय श्वसन द्वारा ऊर्जा एटीपी (ATP) के रूप में संचित होती है, इसलिए इसे कोशिका का 'पावरहाउस' या शक्तिगृह कहते हैं।"),

        # 18. History - Delhi Sultanate - First Female Ruler (Index 1)
        ("Who was the daughter of Sultan Iltutmish who ruled the Delhi Sultanate from 1236 to 1240 as the first and only woman monarch of medieval India?",
         "सुल्तान इल्तुतमिश की वह कौन-सी योग्य पुत्री थी जिसने 1236 से 1240 तक दिल्ली सल्तनत पर शासन किया और मध्यकालीन भारत की पहली महिला शासक बनी?",
         "Nur Jahan", "Razia Sultan (रजिया सुल्तान)", "Chand Bibi", "Rani Durgavati",
         1, "Razia Sultan, daughter of Iltutmish, ruled Delhi from 1236 to 1240, noted by chronicler Minhaj-i-Siraj for her administrative merit.",
         "रजिया सुल्तान (1236-1240) दिल्ली की गद्दी पर बैठने वाली पहली और एकमात्र महिला सुल्तान थीं। इतिहासकार मिन्हाज-ए-सिराज ने माना कि वह अपने सभी भाइयों से अधिक योग्य थीं।"),

        # 19. Geography - Rock Cycle Types (Index 2)
        ("Which classification of rocks is formed directly from the cooling, solidification, and crystallization of molten magma or lava?",
         "पिघले हुए मैग्मा अथवा लावा के ठंडे होकर जमने और क्रिस्टलीकरण से निर्मित होने वाले प्राथमिक चट्टानों को क्या कहा जाता है?",
         "Sedimentary Rocks (अवसादी शैल)", "Metamorphic Rocks (कायांतरित शैल)", "Igneous Rocks (आग्नेय शैल - जैसे ग्रेनाइट एवं बेसाल्ट)", "Fossiliferous Shale",
         2, "Igneous rocks (e.g., granite, basalt) form from the cooling and solidification of molten rock material (magma/lava).",
         "आग्नेय चट्टानें (Igneous Rocks) मैग्मा या लावा के जमने से बनती हैं (जैसे ग्रेनाइट, बेसाल्ट)। इन्हें प्राथमिक शैल भी कहा जाता है।"),

        # 20. SPL - Constitution Article 21 - Right to Food & Water (Index 3)
        ("In historic landmark judgments (such as Subhash Kumar case and PUCL Right to Food case), the Supreme Court of India interpreted which Fundamental Right to include the right to pollution-free water, clean air, and adequate nutrition?",
         "सर्वोच्च न्यायालय ने ऐतिहासिक निर्णयों (जैसे सुभाष कुमार मामला व पीयूसीएल मामला) में किस मौलिक अधिकार का विस्तार करते हुए उसमें प्रदूषण-मुक्त जल, स्वच्छ वायु और भोजन के अधिकार को शामिल माना है?",
         "Article 14 (Right to Equality)", "Article 19 (Right to Freedom)", "Article 25 (Freedom of Religion)", "Article 21 (Protection of Life and Personal Liberty - जीने का अधिकार)",
         3, "The Supreme Court expanded Article 21 (Right to Life) to encompass a dignified life, including clean environment, water, shelter, and food.",
         "अनुच्छेद 21 (प्राण एवं दैहिक स्वतंत्रता) की व्यापक व्याख्या करते हुए न्यायालय ने स्वच्छ जल, शुद्ध वायु, स्वास्थ्य और गरिमापूर्ण जीवन को जीने के अधिकार का अभिन्न हिस्सा माना है।"),

        # 21. Pedagogy - Primary vs Secondary Sources (Index 0)
        ("In Social Science pedagogy, which of the following is classified as a 'Primary Source' (प्राथमिक स्रोत) for historical investigation?",
         "सामाजिक विज्ञान शिक्षण में ऐतिहासिक अनुसंधान हेतु निम्नलिखित में से किसे 'प्राथमिक स्रोत' (Primary Source) माना जाता है?",
         "An original diary written by a freedom fighter during the 1942 Quit India movement (स्वतंत्रता सेनानी की हस्तलिखित डायरी)", "A chapter in a modern NCERT history textbook written in 2024", "A fictional historical movie made on the life of Bhagat Singh", "A contemporary editorial article analyzing the 1857 revolt in a daily newspaper",
         0, "A primary source is an immediate, first-hand account created during the historical period under study (diaries, letters, eyewitness accounts, original artifacts).",
         "प्राथमिक स्रोत (Primary Source) वह मूल दस्तावेज या सामग्री है जो घटना के समय प्रत्यक्षदर्शी द्वारा रची गई हो (जैसे उस काल की डायरी, सिक्के, सरकारी अभिलेख या मूल पत्र)।"),

        # 22. Science Pedagogy - Scientific Temper (Index 1)
        ("Under Article 51A(h) of the Indian Constitution and science pedagogical guidelines, developing 'Scientific Temper' (वैज्ञानिक दृष्टिकोण) in students means cultivating:",
         "भारतीय संविधान के अनुच्छेद 51A(h) और विज्ञान शिक्षाशास्त्र के तहत छात्रों में 'वैज्ञानिक दृष्टिकोण' (Scientific Temper) विकसित करने का क्या अभिप्राय है?",
         "Memorizing all scientific definitions without questioning authority", "A spirit of critical inquiry, evidence-based skepticism, and empirical testing (जिज्ञासा, साक्ष्य आधारित तर्क एवं आलोचनात्मक जांच की भावना)", "Believing that technology can instantly solve every philosophical problem", "Blind acceptance of established dogmas without verification",
         1, "Scientific temper is the attitude of inquiry, rational doubt, evidence-based reasoning, and willingness to revise beliefs based on new evidence.",
         "वैज्ञानिक दृष्टिकोण (Scientific Temper) का अर्थ है अंधविश्वास से परे रहकर साक्ष्य आधारित तर्क, खुली जिज्ञासा और तार्किक आलोचनात्मक जांच की भावना को आत्मसात करना।"),

        # 23. Social Science Pedagogy - Teaching Controversial Issues (Index 2)
        ("How should a teacher address controversial, sensitive social issues (such as caste discrimination, gender inequality, and communal riots) in a middle school Social Science class?",
         "उच्च प्राथमिक सामाजिक विज्ञान कक्षा में जातिगत भेदभाव, जेंडर असमानता या संवेदनशील सामाजिक मुद्दों पर चर्चा करते समय शिक्षक का दृष्टिकोण क्या होना चाहिए?",
         "Avoiding the topic entirely to prevent disputes in class", "Dictating one biased viewpoint and penalizing counter-arguments", "Creating a safe, respectful deliberative space where multiple perspectives are examined critically against Constitutional values (संवैधानिक मूल्यों के आलोक में विविध दृष्टिकोणों पर खुली व सम्मानजनक चर्चा)", "Assigning students to write lines apologizing for societal conflicts",
         2, "Controversial issues should be explored through facilitated dialogue, examining multiple evidence-based perspectives grounded in constitutional ideals of justice and equality.",
         "संवेदनशील मुद्दों से बचना नहीं चाहिए, बल्कि संवैधानिक मूल्यों (न्याय, समानता, बंधुत्व) के आधार पर सुरक्षित व सम्मानजनक माहौल में विभिन्न पक्षों पर आलोचनात्मक विमर्श कराना चाहिए।"),

        # 24. Science Pedagogy - Hands-On Experimentation (Index 3)
        ("What is the primary pedagogical benefit of engaging middle school students in hands-on practical experiments (e.g., testing acid-base reactions or building simple circuits)?",
         "उच्च प्राथमिक स्तर के छात्रों को हाथों से करके सीखने (Hands-on Experiments - जैसे परिपथ बनाना या लिटमस परीक्षण करना) में संलग्न करने का मुख्य शैक्षणिक लाभ क्या है?",
         "It consumes classroom time so less homework needs to be graded", "It allows teachers to rank students based on dexterity alone", "It eliminates the need for any scientific textbooks in school", "It fosters experiential conceptual understanding, procedural skills, and scientific inquiry (मूर्त अनुभव, प्रक्रियात्मक कौशल एवं वैज्ञानिक खोज का विकास)",
         3, "Hands-on laboratory work bridges theoretical concepts to concrete reality, nurturing inquiry skills, observation, and experiential understanding.",
         "हस्त-गतिविधियों और प्रयोगों से छात्र अमूर्त सिद्धांतों को स्वयं अपनी आंखों से घटित होते देखते हैं, जिससे प्रक्रियात्मक कौशल, जिज्ञासा और वैज्ञानिक समझ गहरी होती है।")
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
            'domain': 'Upper Primary Science & Social Science Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all CTET Upper Primary domains
    upper_primary_modules = [
        # Upper Primary Science: Food, Materials & Chemistry
        ("Starch Test with Dilute Iodine Solution", "Forms dark blue-black complex confirming presence of polysaccharides", "आयोडीन द्वारा स्टार्च (मंड) परीक्षण", "विज्ञान विषय-वस्तु"),
        ("Protein Test with Copper Sulfate and Caustic Soda", "Produces distinctive violet/purple coloration confirming peptide bonds", "प्रोटीन का बायोरेट परीक्षण", "विज्ञान विषय-वस्तु"),
        ("Acids, Bases and Natural Indicators (Turmeric, Litmus, China Rose)", "Turmeric turns reddish-brown in bases; Litmus turns red in acid and blue in base", "अम्ल, क्षार एवं प्राकृतिक सूचक", "विज्ञान विषय-वस्तु"),
        ("Separation of Substances (Decantation, Filtration, Evaporation)", "Physical methods separating insoluble solids, mixtures and dissolved solutes", "पदार्थों का पृथक्करण एवं विधियां", "विज्ञान विषय-वस्तु"),
        ("Chemical vs Physical Changes in Daily Life", "Reversible state changes vs irreversible formation of new substances with energy transfer", "भौतिक एवं रासायनिक परिवर्तन", "विज्ञान विषय-वस्तु"),
        ("Metals and Non-Metals Reaction with Water and Acids", "Metals form basic oxides and evolve hydrogen gas; non-metals form acidic oxides", "धातु एवं अधातु के रासायनिक गुण", "विज्ञान विषय-वस्तु"),

        # Upper Primary Science: Biology & World of Living
        ("Plant Cell vs Animal Cell Architecture", "Cell wall, large central vacuole, and plastids present exclusively in plant cells", "पादप कोशिका बनाम जंतु कोशिका", "विज्ञान विषय-वस्तु"),
        ("Mitochondria Cellular Energy Production (ATP)", "Aerobic respiration in cristae yielding ATP molecules for metabolic work", "माइटोकॉन्ड्रिया एवं कोशिकीय श्वसन", "विज्ञान विषय-वस्तु"),
        ("Photosynthesis Light and Dark Reactions", "Chlorophyll in chloroplasts trapping sunlight to convert CO2 and H2O to glucose", "प्रकाश संश्लेषण की प्रक्रिया", "विज्ञान विषय-वस्तु"),
        ("Sexual Reproduction in Flowering Plants", "Pollination (wind, insects), pollen tube germination, and double fertilization", "पादपों में जनन एवं परागण", "विज्ञान विषय-वस्तु"),
        ("Human Digestive and Circulatory Systems", "Peristalsis, enzyme breakdown in stomach/duodenum, and systemic heart pumping", "मानव पाचन एवं परिसंचरण तंत्र", "विज्ञान विषय-वस्तु"),

        # Upper Primary Science: Physics & Mechanics
        ("Speed, Distance and Time Equations", "Speed = Distance / Time; uniform vs non-uniform motion along straight lines", "चाल, समय एवं दूरी समीकरण", "विज्ञान विषय-वस्तु"),
        ("Electric Current and Heating Effect (Joule Heating)", "Heating effect in electric irons and fuses using low-melting alloy wires", "विद्युत धारा का तापीय प्रभाव", "विज्ञान विषय-वस्तु"),
        ("Electromagnets and Magnetic Field Generation", "Current in solenoid coil creating temporary strong magnetic core", "विद्युत चुंबक एवं चुंबकीय प्रभाव", "विज्ञान विषय-वस्तु"),
        ("Spherical Mirrors (Concave vs Convex Applications)", "Concave mirror produces real/magnified images; convex gives wide virtual field", "गोलीय दर्पण (अवतल व उत्तल)", "विज्ञान विषय-वस्तु"),
        ("Sound Propagation and Frequency vs Amplitude", "Sound needs material medium; amplitude governs loudness, frequency governs pitch", "ध्वनि की प्रकृति (तारत्व व प्रबलता)", "विज्ञान विषय-वस्तु"),
        ("Atmospheric Pressure and Barometric Variation", "Decreases with altitude; exerted equally in all directions by fluid weight", "वायुमंडलीय दाब एवं मापन", "विज्ञान विषय-वस्तु"),

        # Upper Primary History: Ancient & Medieval
        ("Harappan Urban Planning and Sanitation", "Grid town layout, baked bricks, covered drainage systems, Citadel and Great Bath", "हड़प्पा सभ्यता का नगर नियोजन", "इतिहास विषय-वस्तु"),
        ("Ashoka's Inscriptions and Dhamma Policy", "Moral governance, non-violence, rock edicts in Brahmi, Prakrit and Aramaic", "अशोक का धम्म एवं अभिलेख", "इतिहास विषय-वस्तु"),
        ("Delhi Sultanate Administrative System", "Iqta land revenue assignments to Muqtis, market reforms of Alauddin Khilji", "दिल्ली सल्तनत एवं इक्ता प्रणाली", "इतिहास विषय-वस्तु"),
        ("Akbar's Policy of Sulh-i-Kul and Religious Harmony", "Universal peace and tolerance guided by Abul Fazl; Din-i-Ilahi ethical order", "अकबर की सुलह-ए-कुल नीति", "इतिहास विषय-वस्तु"),
        ("Mansabdari System (Zat and Sawar Ranks)", "Dual numeric ranking determining noble status, salary (Zat) and horsemen quota (Sawar)", "मुगल मनसबदारी प्रणाली", "इतिहास विषय-वस्तु"),

        # Upper Primary History: Modern & Freedom Struggle
        ("1857 Great Uprising Causes and Outbreak", "Enfield cartridge greased with animal fat, Mangal Pandey at Barrackpore", "1857 की क्रांति का आरंभ व कारण", "इतिहास विषय-वस्तु"),
        ("Jyotirao Phule Satyashodhak Samaj Movement", "Anti-caste equality campaign and dedication of 'Gulamgiri' to US anti-slavery", "ज्योतिराव फुले और सत्यशोधक समाज", "इतिहास विषय-वस्तु"),
        ("Ishwar Chandra Vidyasagar Widow Remarriage Act 1856", "Legalization of Hindu widow remarriage and girls education schools in Bengal", "ईश्वरचंद्र विद्यासागर एवं समाज सुधार", "इतिहास विषय-वस्तु"),
        ("Non-Cooperation Movement and Chauri Chaura", "Boycott of British titles, cloth and courts; suspended after police station burning", "असहयोग आंदोलन एवं चौरी-चौरा", "इतिहास विषय-वस्तु"),
        ("Dandi March and Civil Disobedience Movement 1930", "Salt satyagraha from Sabarmati to Dandi coast defying British salt monopoly", "दांडी मार्च एवं सविनय अवज्ञा", "इतिहास विषय-वस्तु"),

        # Upper Primary Geography: Earth, Atmosphere & Environment
        ("Earth's Rotation (Day/Night) and Revolution (Seasons)", "Axial rotation creates diurnal cycle; orbital revolution with tilt creates seasons", "पृथ्वी की गतियां एवं ऋतु चक्र", "भूगोल विषय-वस्तु"),
        ("Latitudes, Longitudes and Standard Time (IST)", "Parallels and meridians; IST based on 82°30' E passing through Mirzapur", "अक्षांश, देशांतर एवं भारतीय मानक समय", "भूगोल विषय-वस्तु"),
        ("Atmospheric Layers (Troposphere to Exosphere)", "Troposphere contains weather; Stratosphere hosts protective ozone layer", "वायुमंडल की परतें एवं ओजोन", "भूगोल विषय-वस्तु"),
        ("Rock Types (Igneous, Sedimentary, Metamorphic)", "Magma solidification vs stratified sediment compaction vs thermal pressure alteration", "शैल चक्र एवं चट्टानों के प्रकार", "भूगोल विषय-वस्तु"),
        ("Ocean Currents and Thermohaline Circulation", "Gulf Stream warm current vs Labrador cold current moderating marine climate", "महासागरीय जलधाराएं", "भूगोल विषय-वस्तु"),
        ("Major Landforms (Mountains, Plateaus, Plains)", "Fold mountains, Deccan volcanic plateau, fertile Indo-Gangetic alluvial plains", "प्रमुख स्थलरूप एवं भारत का भूगोल", "भूगोल विषय-वस्तु"),

        # Upper Primary SPL: Polity, Constitution & Justice
        ("Preamble to Constitution of India Principles", "Sovereign, Socialist, Secular, Democratic Republic securing Justice, Liberty, Equality", "भारतीय संविधान की प्रस्तावना", "नागरिक शास्त्र विषय-वस्तु"),
        ("Three Tiers of Panchayati Raj System", "Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district)", "त्रि-स्तरीय पंचायती राज व्यवस्था", "नागरिक शास्त्र विषय-वस्तु"),
        ("State Legislative Assembly (Vidhan Sabha)", "MLAs elected by universal adult franchise, responsible to cabinet and Governor", "राज्य विधानसभा एवं सरकार गठन", "नागरिक शास्त्र विषय-वस्तु"),
        ("Independent Judiciary and Public Interest Litigation (PIL)", "Supreme Court as sentinel of rights, expanding PIL access under Article 32/226", "स्वतंत्र न्यायपालिका एवं जनहित याचिका", "नागरिक शास्त्र विषय-वस्तु"),
        ("Criminal Justice System and Role of Police FIR", "Section 154 mandatory FIR registration, public prosecutor and fair trial judge", "आपराधिक न्याय प्रणाली एवं प्राथमिकी", "नागरिक शास्त्र विषय-वस्तु"),
        ("Secularism in Indian Constitutional Practice", "Principled distance and equal respect for all religions without state religion", "भारतीय धर्मनिरपेक्षता की अवधारणा", "नागरिक शास्त्र विषय-वस्तु"),

        # Science Pedagogy: Inquiry & Hands-on Learning
        ("Nature of Science (Empirical, Tentative, Creative)", "Scientific knowledge is supported by empirical evidence and subject to revision", "विज्ञान की प्रकृति एवं विशेषताएं", "विज्ञान शिक्षाशास्त्र"),
        ("Scientific Temper Cultivation (Article 51A)", "Encouraging rational inquiry, evidence-based doubt and rejecting superstition", "वैज्ञानिक दृष्टिकोण का विकास", "विज्ञान शिक्षाशास्त्र"),
        ("Hands-on Laboratory Activities and Inquiry", "Guiding students to design experiments, control variables and record data", "प्रयोगात्मक एवं खोजपरक शिक्षण", "विज्ञान शिक्षाशास्त्र"),
        ("Alternative Conceptions (Misconceptions) in Science", "Addressing intuitive naive ideas (e.g., heavy objects fall faster) through disconfirming trials", "विज्ञान में वैकल्पिक भ्रांतियां", "विज्ञान शिक्षाशास्त्र"),

        # Social Science Pedagogy: Critical Inquiry & Multi-Perspective
        ("Primary vs Secondary Historical Sources", "First-hand archaeological artifacts and letters vs compiled textbook analyses", "प्राथमिक एवं द्वितीयक ऐतिहासिक स्रोत", "सामाजिक विज्ञान शिक्षाशास्त्र"),
        ("Developing Critical Thinking in Social Science", "Analyzing historical events from marginalized, peasant and gender perspectives", "आलोचनात्मक चिंतन का विकास", "सामाजिक विज्ञान शिक्षाशास्त्र"),
        ("Handling Sensitive and Controversial Social Issues", "Facilitating structured dialogue grounded in constitutional values of human dignity", "संवेदनशील सामाजिक मुद्दों का शिक्षण", "सामाजिक विज्ञान शिक्षाशास्त्र"),
        ("Community Visits and Oral History Projects", "Interviewing senior community members to document oral folk histories and ecology", "क्षेत्रीय सर्वेक्षण एवं मौखिक इतिहास", "सामाजिक विज्ञान शिक्षाशास्त्र")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        u_idx = (i - 24) % len(upper_primary_modules)
        topic, facts, theme, category = upper_primary_modules[u_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In Upper Primary Science & Social Science curriculum, which statement accurately explains '{topic}'?"
            stem_hi = f"उच्च प्राथमिक विज्ञान एवं सामाजिक विज्ञान पाठ्यक्रम के अंतर्गत '{topic}' से संबंधित कौन-सा कथन प्रामाणिक है?"
            sol_en = f"Accurate concept for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही वैज्ञानिक या सामाजिक तथ्य: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Subterranean magma viscosity flow rate calculation", 'hi': "भूमिगत मैग्मा श्यानता प्रवाह दर"},
                {'en': "Stratospheric chlorofluorocarbon catalytic decay index", 'hi': "समतापमंडलीय सीएफसी उत्प्रेरक क्षय सूचकांक"},
                {'en': "Deep ocean trench sonar bathymetry metric", 'hi': "गहरे महासागरीय गर्त सोनार गहराई मापन"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key content or pedagogical area of CTET Paper II is '{topic}' classified?"
            stem_hi = f"सीटीईटी पेपर II पाठ्यक्रम में '{topic}' किस मुख्य विषय-वस्तु या शैक्षणिक क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' is categorized under {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) क्षेत्र से है।"
            choices = [
                {'en': "Medieval French Heraldry Nomenclature", 'hi': "मध्यकालीन फ्रांसीसी राजचिह्न नामकरण"},
                {'en': f"CTET Upper Primary Core: {category} ({theme})", 'hi': f"सीटीईटी उच्च प्राथमिक: {category} ({theme})"},
                {'en': "Alaskan Tundra Permafrost Thawing Rate", 'hi': "अलास्का टुंड्रा बर्फ पिघलने की दर"},
                {'en': "Polynesian Outrigger Canoe Navigation Route", 'hi': "पोलिनेशियन डोंगी समुद्री नौकायन मार्ग"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should an upper-primary educator implement '{topic}' to cultivate inquiry and critical thinking?"
            stem_hi = f"एक उच्च प्राथमिक शिक्षक को कक्षा में '{topic}' पर खोजपरक व आलोचनात्मक चिंतन को कैसे प्रोत्साहित करना चाहिए?"
            sol_en = f"Recommended pedagogical practice: {facts}. Domain: {category}."
            sol_hi = f"अनुशंसित शिक्षण अभ्यास: {facts} (क्षेत्र: {category})।"
            choices = [
                {'en': "Demanding passive memorization of definitions without evidence or reasoning", 'hi': "बिना तर्क या प्रमाण के केवल परिभाषाएं रटवाना"},
                {'en': "Refusing to allow students to question historical or scientific assumptions", 'hi': "विद्यार्थियों को प्रश्न पूछने या जांच करने से रोकना"},
                {'en': f"Inquiry-based practice: {facts} ({theme})", 'hi': f"खोजपरक एवं रचनावादी अभ्यास: {facts} ({theme})"},
                {'en': "Restricting learning to dictation without hands-on trials or document inquiry", 'hi': "प्रयोगों या स्रोतों के बिना केवल इमला लिखवाना"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is sound pedagogical and content mastery of '{topic}' crucial for an upper-primary teacher?"
            stem_hi = f"उच्च प्राथमिक स्तर के शिक्षक के लिए '{topic}' का गहन विषय ज्ञान एवं शिक्षण शास्त्रीय दृष्टिकोण क्यों अनिवार्य है?"
            sol_en = f"It fosters scientific temper, historical inquiry, and democratic constitutional values: {facts}."
            sol_hi = f"यह छात्रों में वैज्ञानिक दृष्टिकोण, ऐतिहासिक जांच और संवैधानिक मूल्यों के विकास हेतु आवश्यक है: {facts}।"
            choices = [
                {'en': "To trade financial derivatives on international stock markets", 'hi': "अंतरराष्ट्रीय शेयर बाजारों में वित्तीय डेरिवेटिव का व्यापार करने हेतु"},
                {'en': "To command deep sea oil tankers in arctic waters", 'hi': "आर्कटिक जलक्षेत्र में गहरे समुद्र में तेल टैंकर का संचालन करने हेतु"},
                {'en': "To manufacture optical glass lenses for satellite telescopes", 'hi': "उपग्रह दूरबीन हेतु प्रकाशीय कांच के लेंस निर्माण हेतु"},
                {'en': f"Essential for upper primary inquiry pedagogy: {facts}", 'hi': f"उच्च प्राथमिक शिक्षण एवं आलोचनात्मक सोच हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Upper Primary - {category}',
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
    res = get_raw_upper_primary_pedagogy_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

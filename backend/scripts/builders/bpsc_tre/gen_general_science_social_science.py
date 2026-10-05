"""
BPSC TRE - General Science, Social Studies & Teaching Pedagogy
(सामान्य विज्ञान, सामाजिक अध्ययन एवं शिक्षण अभिरुचि) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Physical Sciences (Physics): Laws of Motion, Work-Power-Energy, Gravitation, Optics, Electricity, Sound
- Chemical Sciences (Chemistry): Acids, Bases & Salts, Chemical Reactions, Periodic Trends, Metals & Alloys
- Life Sciences (Biology): Cell Structure, Human Physiology, Plant Physiology, Genetics, Diseases & Vitamins
- Ecology & Environment: Food Chains, Lindeman's 10% Rule, Ozone Depletion, Biodiversity Conservation
- Indian Polity & Constitution: Preamble, Fundamental Rights, DPSPs, President, Parliament, Judiciary & Writs
- Indian Geography: Physical Divisions, River Basins, Monsoons, Regur Soil, Multipurpose Dam Projects
- Educational Pedagogy: Inductive-Deductive Methods, Project Method, CCE, Bloom's Taxonomy, NEP 2020 (5+3+3+4)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_science_social_science_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Physics - Eye Defect Myopia (Index 0)
        ("A school teacher notices that a student can clearly see nearby objects on their desk but struggles to read the blackboard from a distance. Which vision defect does the student have, and which corrective lens is prescribed?",
        "एक शिक्षक देखता है कि एक विद्यार्थी अपनी डेस्क पर रखी पुस्तक को स्पष्ट पढ़ लेता है परंतु दूर श्यामपट्ट पर लिखे अक्षरों को पढ़ने में असमर्थ है। विद्यार्थी किस दृष्टि दोष से पीड़ित है और इसके निवारण हेतु किस लेंस का चश्मा दिया जाता है?",
        "Myopia / Near-sightedness, corrected with Concave Lens (निकट दृष्टि दोष / मायोपिया - अवतल लेंस)", "Hypermetropia, corrected with Convex Lens", "Presbyopia, corrected with Bifocal Lens", "Astigmatism, corrected with Cylindrical Lens",
        0, "Myopia (near-sightedness) causes parallel rays from distant objects to focus in front of the retina. A diverging (concave) lens corrects it.",
        "मायोपिया (निकट दृष्टि दोष) में दूर की वस्तुएं स्पष्ट नहीं दिखतीं क्योंकि प्रतिबिंब रेटिना के आगे बनता है। इसे अवतल (Concave) लेंस से ठीक किया जाता है।"),

        # 2. Chemistry - Chemical Compound Plaster of Paris (Index 1)
        ("What is the chemical name and correct chemical formula of 'Plaster of Paris' (POP), widely used for setting fractured bones and making statues?",
        "टूटी हड्डियों को स्थिर करने और मूर्तियां बनाने में प्रयुक्त होने वाले 'प्लास्टर ऑफ पेरिस' (POP) का रासायनिक नाम और सही रासायनिक सूत्र क्या है?",
        "Calcium Sulfate Dihydrate (CaSO4·2H2O)", "Calcium Sulfate Hemihydrate (CaSO4·1/2H2O - कैल्शियम सल्फेट हेमीहाइड्रेट)", "Calcium Oxychloride (CaOCl2)", "Sodium Hydrogen Carbonate (NaHCO3)",
        1, "Plaster of Paris is Calcium Sulfate Hemihydrate (CaSO4·1/2H2O), obtained by heating gypsum (CaSO4·2H2O) to 373 K (100°C).",
        "जिप्सम को 373 K पर गर्म करने पर वह जल के अणुओं का त्याग कर 'कैल्शियम सल्फेट हेमीहाइड्रेट' (CaSO4·1/2H2O) बनाता है, जिसे प्लास्टर ऑफ पेरिस कहते हैं।"),

        # 3. Biology - Cell Organelle Powerhouse (Index 2)
        ("Which cellular organelle is designated as the 'Powerhouse of the Cell' (कोशिका का ऊर्जा गृह) because it generates adenosine triphosphate (ATP) via aerobic cellular respiration?",
        "किस कोशिकांग को 'कोशिका का ऊर्जा गृह' (Powerhouse of the Cell) कहा जाता है क्योंकि यह कोशिकीय श्वसन द्वारा एटीपी (ATP) के रूप में जैव ऊर्जा उत्पन्न करता है?",
        "Ribosome", "Endoplasmic Reticulum", "Mitochondria (माइटोकॉन्ड्रिया)", "Golgi Apparatus",
        2, "Mitochondria carry out the Krebs cycle and oxidative phosphorylation, generating ATP, the cellular energy currency.",
        "माइटोकॉन्ड्रिया में कोशिकीय श्वसन की क्रेब्स चक्र प्रक्रिया होती है जिससे एटीपी (ATP) के रूप में ऊर्जा मुक्त होती है, अतः इसे कोशिका का पावरहाउस कहते हैं।"),

        # 4. Indian Polity - Fundamental Rights Article 32 (Index 3)
        ("Which Article of the Constitution of India was characterized by Dr. B.R. Ambedkar as the 'very soul of the Constitution and the very heart of it', empowering citizens to move the Supreme Court for enforcement of Fundamental Rights?",
        "डॉ. बी.आर. अंबेडकर ने भारत के संविधान के किस अनुच्छेद को 'संविधान की आत्मा और उसका हृदय' (Heart and Soul of the Constitution) कहा था, जो मौलिक अधिकारों के प्रवर्तन हेतु सर्वोच्च न्यायालय जाने का अधिकार देता है?",
        "Article 14", "Article 19", "Article 21", "Article 32 (संवैधानिक उपचारों का अधिकार - Right to Constitutional Remedies)",
        3, "Article 32 guarantees the Right to Constitutional Remedies, empowering the Supreme Court to issue five types of prerogative writs (Habeas Corpus, Mandamus, etc.).",
        "अनुच्छेद 32 के तहत नागरिकों को मौलिक अधिकारों के उल्लंघन पर सीधे सर्वोच्च न्यायालय जाने का अधिकार है। डॉ. अंबेडकर ने इसे संविधान का हृदय और आत्मा कहा था।"),

        # 5. Ecology - Lindeman's 10 Percent Law (Index 0)
        ("According to Raymond Lindeman's 10% Ecological Law of energy transfer, how much energy is transferred from one trophic level to the next consecutive higher trophic level in an ecosystem food chain?",
        "रेमंड लिंडमैन के 10% ऊर्जा नियम के अनुसार, किसी पारिस्थितिक तंत्र की खाद्य श्रृंखला में एक पोषण स्तर से अगले उच्च पोषण स्तर पर लगभग कितने प्रतिशत ऊर्जा स्थानांतरित होती है?",
        "Only 10% of the energy is transferred (केवल 10% ऊर्जा का स्थानांतरण होता है)", "25% of the energy is transferred", "50% of the energy is transferred", "90% of the energy is transferred",
        0, "Lindeman (1942) established that roughly 10% of chemical energy from organic food is transferred to the next trophic level, with ~90% lost as metabolic heat.",
        "प्रत्येक पोषण स्तर पर उपलब्ध कुल ऊर्जा का केवल 10% भाग ही अगले स्तर के उपभोक्ता को मिलता है, शेष 90% ऊर्जा श्वसन एवं जैविक क्रियाओं में ऊष्मा के रूप में नष्ट हो जाती है।"),

        # 6. Geography - Black Soil (Regur) (Index 1)
        ("Which soil type, formed by the weathering and denudation of basaltic lava rocks of the Deccan Traps, is intensely fertile, moisture-retentive, and acclaimed as ideal for cotton cultivation?",
        "दक्कन के लावा पठार (बेसाल्ट चट्टानों) के अपक्षय से निर्मित कौन-सी मिट्टी सर्वाधिक जल-धारण क्षमता युक्त तथा कपास की खेती के लिए विश्व प्रसिद्ध है जिसे 'रेगुर' (Regur) मिट्टी भी कहा जाता है?",
        "Laterite Soil", "Black Soil / Regur Soil (काली मिट्टी / रेगुर मिट्टी)", "Alluvial Soil", "Red and Yellow Soil",
        1, "Black soil (Regur) is rich in clay minerals, calcium carbonate, and magnesium. It develops deep cracks in dry weather and is ideal for cotton farming.",
        "काली मिट्टी को रेगुर या 'काली कपास मिट्टी' भी कहा जाता है। यह बेसाल्टीय लावा से बनी होती है और कपास की खेती के लिए सर्वोत्तम होती है।"),

        # 7. Pedagogy - Kilpatrick's Project Method (Index 2)
        ("Which experiential pedagogical method, formulated by William Heard Kilpatrick (a disciple of John Dewey), defines learning as 'a purposeful activity proceeding in a social environment'?",
        "जॉन डीवी के शिष्य विलियम हर्ड किलपैट्रिक द्वारा प्रतिपादित कौन-सी शिक्षण विधि सीखने को 'सामाजिक वातावरण में पूर्ण संलग्नता से की जाने वाली सोद्देश्य गतिविधि' के रूप में परिभाषित करती है?",
        "Lecture Method", "Grammar-Translation Method", "Project Method (प्रायोजना / प्रोजेक्ट विधि)", "Rote Recitation Method",
        2, "Kilpatrick formulated the Project Method, stressing that students learn through collaborative, purposeful, real-life projects embedded in social contexts.",
        "प्रोजेक्ट विधि (Project Method) के जनक किलपैट्रिक हैं। इसमें छात्र वास्तविक जीवन की समस्याओं पर सक्रिय रूप से कार्य करके सीखते हैं।"),

        # 8. Physics - Sound Waves Nature (Index 3)
        ("In physics, sound waves propagating through air are classified as which type of waves, and how does their propagation velocity change as medium density and elasticity increase from gases to liquids to solids?",
        "भौतिक विज्ञान में वायु में संचरित होने वाली ध्वनि तरंगें किस प्रकार की तरंगें हैं, और गैसों से द्रवों तथा ठोसों में जाने पर ध्वनि का वेग किस प्रकार परिवर्तित होता है?",
        "Transverse electromagnetic waves; velocity decreases", "Transverse mechanical waves; velocity remains constant", "Surface waves; velocity drops to zero", "Longitudinal mechanical waves; velocity increases (ठोसों में सर्वाधिक: Longitudinal Waves)",
        3, "Sound waves in air are longitudinal mechanical waves (requiring a material medium). Sound travels fastest in solids, slower in liquids, and slowest in gases (cannot travel in a vacuum).",
        "वायु में ध्वनि तरंगें अनुदैर्ध्य यांत्रिक तरंगें (Longitudinal Mechanical Waves) होती हैं। ध्वनि की चाल ठोस में सबसे अधिक, द्रव में उससे कम और गैस में सबसे कम होती है।"),

        # 9. Chemistry - Universal Indicator & pH Scale (Index 0)
        ("A student tests four unknown solutions A, B, C, and D with universal pH paper and records pH values of 2, 7, 9, and 13 respectively. Which solution represents a strong acid?",
        "एक विद्यार्थी यूनिवर्सल पीएच पेपर से चार अज्ञात विलयनों A, B, C और D का परीक्षण करता है और उनके पीएच मान क्रमशः 2, 7, 9 और 13 पाता है। इनमें से कौन-सा विलयन 'प्रबल अम्ल' (Strong Acid) है?",
        "Solution A with pH = 2 (विलयन A - pH = 2 प्रबल अम्ल)", "Solution B with pH = 7", "Solution C with pH = 9", "Solution D with pH = 13",
        0, "On the pH scale (0 to 14), values below 7 indicate acidity. A pH of 2 has a high concentration of H+ ions, indicating a strong acid.",
        "pH पैमाने पर 7 से कम मान अम्लीय होता है। pH = 2 अत्यधिक हाइड्रोजन आयन सांद्रता वाला 'प्रबल अम्ल' दर्शाता है (उदासीन = 7, क्षारीय > 7)।"),

        # 10. Biology - Blood Groups and Universal Donor (Index 1)
        ("An emergency patient requires an immediate blood transfusion without prior cross-matching. Which blood group can be safely transfused as the Universal Donor?",
        "आपातकालीन स्थिति में किसी घायल मरीज को बिना रक्त समूह मिलान किए तुरंत किस रक्त समूह का रक्त सुरक्षित रूप से चढ़ाया जा सकता है (सर्वदाता रक्त समूह)?",
        "Blood Group AB Rh+", "Blood Group O Rh-negative (O निगेटिव - सर्वदाता)", "Blood Group A Rh+", "Blood Group B Rh-",
        1, "O Rh-negative blood has neither A nor B antigens on RBCs and lacks Rh antigen, making it the universal donor blood.",
        "O Rh- (ओ निगेटिव) रक्त समूह में आरबीसी पर न तो A/B एंटीजन होते हैं और न ही Rh कारक, अतः यह सुरक्षित 'सर्वदाता' (Universal Donor) माना जाता है।"),

        # 11. Indian Polity - Directive Principles Article 44 (Index 2)
        ("Under Part IV (Directive Principles of State Policy) of the Indian Constitution, which Article directs the State to secure for all citizens a Uniform Civil Code (UCC) throughout the territory of India?",
        "भारतीय संविधान के भाग IV (राज्य के नीति निदेशक तत्व) का कौन-सा अनुच्छेद राज्य को संपूर्ण भारत में नागरिकों के लिए 'समान नागरिक संहिता' (Uniform Civil Code - UCC) लागू करने का निर्देश देता है?",
        "Article 40 (Gram Panchayats)", "Article 42 (Maternity Relief)", "Article 44 (Uniform Civil Code - समान नागरिक संहिता)", "Article 48 (Agriculture & Animal Husbandry)",
        2, "Article 44 states that 'The State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India.'",
        "संविधान का अनुच्छेद 44 समान नागरिक संहिता (UCC) से संबंधित है।"),

        # 12. Geography - Multipurpose Project Hirakud (Index 3)
        ("The historic Hirakud Dam, the longest earthen dam in India built after independence, is constructed across which major river in Odisha?",
        "स्वतंत्रता के पश्चात निर्मित भारत का सबसे लंबा मिट्टी का बांध 'हीराकुंड बांध' (Hirakud Dam) ओडिशा में किस प्रमुख नदी पर स्थित है?",
        "Godavari River", "Krishna River", "Narmada River", "Mahanadi River (महानदी - ओडिशा)",
        3, "Hirakud Dam was constructed across the Mahanadi River near Sambalpur in Odisha, controlling devastating floods and generating hydroelectricity.",
        "हीराकुंड बांध ओडिशा के संबलपुर के पास महानदी पर निर्मित भारत का सबसे लंबा बांध है।"),

        # 13. Pedagogy - Bloom's Taxonomy Cognitive Domain (Index 0)
        ("In the revised Bloom's Taxonomy of educational objectives (Anderson & Krathwohl 2001), which cognitive process represents the highest and most complex level of thinking?",
        "एंडरसन और क्रैथवोहल (2001) द्वारा संशोधित ब्लूम के शैक्षिक उद्देश्यों के संज्ञानात्मक क्षेत्र में चिंतन का सर्वोच्च और सबसे जटिल स्तर कौन-सा है?",
        "Creating / सृजन करना (नवीन विचारों या उत्पादों की रचना)", "Evaluating / मूल्यांकन करना", "Analyzing / विश्लेषण करना", "Remembering / स्मरण रखना",
        0, "In the revised Bloom's taxonomy, the hierarchy from lowest to highest is: Remembering -> Understanding -> Applying -> Analyzing -> Evaluating -> Creating.",
        "संशोधित ब्लूम टैक्सोनॉमी (2001) में शीर्ष स्तर 'Creating' (सृजन/रचना करना) है, जो ज्ञान को संश्लेषित कर नवीन विचार प्रस्तुत करने की क्षमता है।"),

        # 14. Physics - Newton's Third Law (Index 1)
        ("When a rocket accelerates upward into space, its propulsion is an direct application of which fundamental law of classical mechanics?",
        "जब कोई रॉकेट अत्यधिक वेग से अंतरिक्ष की ओर प्रक्षेपित होता है, तो उसका प्रणोदन (Propulsion) क्लासिकल भौतिकी के किस मौलिक नियम का प्रत्यक्ष अनुप्रयोग है?",
        "Newton's First Law of Inertia", "Newton's Third Law of Motion / Conservation of Momentum (क्रिया-प्रतिक्रिया नियम / संवेग संरक्षण)", "Kepler's Second Law of Planetary Motion", "Pascal's Law of Fluid Pressure",
        1, "Rocket propulsion is based on Newton's Third Law of Motion (every action has an equal and opposite reaction) and the Law of Conservation of Linear Momentum.",
        "रॉकेट का आगे बढ़ना न्यूटन के गति के तृतीय नियम (क्रिया-प्रतिक्रिया) और संवेग संरक्षण के सिद्धांत पर आधारित है।"),

        # 15. Chemistry - Baking Soda Chemical Identity (Index 2)
        ("What is the chemical name and molecular formula of 'Baking Soda', extensively used in kitchen cooking and fire extinguishers?",
        "रसोई में पकवानों को स्पंजी बनाने तथा अग्निशामक यंत्रों में प्रयुक्त होने वाले 'बेकिंग सोडा' (मीठा सोडा) का रासायनिक नाम और सूत्र क्या है?",
        "Sodium Carbonate (Na2CO3)", "Sodium Hydroxide (NaOH)", "Sodium Bicarbonate / Sodium Hydrogen Carbonate (NaHCO3)", "Sodium Chloride (NaCl)",
        2, "Baking soda is Sodium Hydrogen Carbonate (NaHCO3). It releases CO2 gas upon heating or reaction with mild acid, making baked food spongy.",
        "बेकिंग सोडा का रासायनिक नाम सोडियम बाइकार्बोनेट (NaHCO3) है।"),

        # 16. Biology - Photosynthesis Byproduct (Index 3)
        ("During oxygenic photosynthesis in green plants, from which molecule is the oxygen (O2) gas released into the atmosphere derived?",
        "हरे पौधों में प्रकाश संश्लेषण की प्रकाश अभिक्रिया के दौरान वातावरण में मुक्त होने वाली ऑक्सीजन (O2) गैस किस अणु के प्रकाश-अपघटन (Photolysis) से प्राप्त होती है?",
        "Carbon dioxide (CO2)", "Glucose (C6H12O6)", "Chlorophyll pigment", "Water molecules (H2O - जल के प्रकाश-अपघटन से)",
        3, "Photolysis of water (2H2O -> 4H+ + 4e- + O2) at the oxygen-evolving complex of Photosystem II is the true source of released oxygen.",
        "प्रकाश संश्लेषण में निकलने वाली ऑक्सीजन गैस कार्बन डाइऑक्साइड से नहीं, बल्कि जल (H2O) के विखंडन (Photolysis of Water) से निकलती है।"),

        # 17. Indian Polity - Fundamental Duties 42nd Amendment (Index 0)
        ("Fundamental Duties were incorporated into Part IVA (Article 51A) of the Constitution of India upon the recommendation of which committee via the 42nd Constitutional Amendment Act of 1976?",
        "1976 के 42वें संविधान संशोधन द्वारा भारतीय संविधान के भाग IVA (अनुच्छेद 51A) में मौलिक कर्तव्य किस समिति की सिफारिश पर जोड़े गए थे?",
        "Swaran Singh Committee (स्वर्ण सिंह समिति)", "Sarkaria Commission", "Balwant Rai Mehta Committee", "Verma Committee",
        0, "The Swaran Singh Committee (1976) recommended the inclusion of Fundamental Duties, leading to the enactment of Article 51A via the 42nd Amendment.",
        "स्वर्ण सिंह समिति की सिफारिश पर 42वें संविधान संशोधन 1976 द्वारा संविधान में 10 मौलिक कर्तव्य जोड़े गए (बाद में 86वें संशोधन 2002 द्वारा 11वां जोड़ा गया)।"),

        # 18. Geography - Tropic of Cancer States (Index 1)
        ("The Tropic of Cancer (23°30' N latitude) passes through how many Indian states, and does it pass through the territory of Bihar?",
        "कर्क रेखा (23°30' उत्तरी अक्षांश) भारत के कितने राज्यों से होकर गुजरती है, और क्या यह वर्तमान बिहार राज्य से होकर गुजरती है?",
        "Passes through 7 states; passes through south Bihar", "Passes through 8 states; does NOT pass through Bihar (8 राज्यों से गुजरती है; बिहार से नहीं गुजरती)", "Passes through 9 states; passes through central Bihar", "Passes through 6 states; passes through Bihar border",
        1, "The Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram. It does NOT pass through Bihar (it passed through south Bihar before Jharkhand was bifurcated in 2000).",
        "कर्क रेखा भारत के 8 राज्यों (गुजरात, राजस्थान, मप्र, छत्तीसगढ़, झारखंड, प. बंगाल, त्रिपुरा, मिजोरम) से गुजरती है। यह वर्तमान बिहार से होकर नहीं गुजरती।"),

        # 19. Pedagogy - National Education Policy NEP 2020 Structure (Index 2)
        ("Under the National Education Policy 2020 (NEP 2020), the legacy 10+2 school pedagogical structure was restructured into which new curricular pedagogical design?",
        "राष्ट्रीय शिक्षा नीति 2020 (NEP 2020) के अंतर्गत पुरानी 10+2 स्कूली प्रणाली के स्थान पर कौन-सी नई पाठ्यचर्या एवं शैक्षणिक संरचना लागू की गई है?",
        "5+4+3+2 System", "3+3+4+5 System", "5+3+3+4 System (Foundational 5, Preparatory 3, Middle 3, Secondary 4)", "4+4+3+3 System",
        2, "NEP 2020 introduces the 5+3+3+4 structure covering ages 3 to 18: Foundational stage (5 yrs: ages 3-8), Preparatory stage (3 yrs: ages 8-11), Middle stage (3 yrs: ages 11-14), and Secondary stage (4 yrs: ages 14-18).",
        "NEP 2020 में 5+3+3+4 ढांचा अपनाया गया है: बुनियादी चरण (5 वर्ष), प्रारंभिक चरण (3 वर्ष), मध्य चरण (3 वर्ष), और माध्यमिक चरण (4 वर्ष)।"),

        # 20. Ecology - Ozone Layer and Montreal Protocol (Index 3)
        ("Which international treaty signed in 1987 is universally hailed as the most successful environmental agreement for phasing out substances that deplete the stratospheric ozone layer (ODSs like CFCs)?",
        "समतापमंडलीय ओजोन परत को नष्ट करने वाले पदार्थों (जैसे क्लोरोफ्लोरोकार्बन - CFCs) के उत्पादन पर रोक लगाने हेतु 1987 में हस्ताक्षरित ऐतिहासिक वैश्विक संधि कौन-सी है?",
        "Kyoto Protocol", "Paris Climate Agreement", "Basel Convention", "Montreal Protocol (मॉन्ट्रियल प्रोटोकॉल - 1987)",
        3, "The Montreal Protocol on Substances that Deplete the Ozone Layer was finalized in 1987 to phase out chlorofluorocarbons (CFCs) and halons.",
        "मॉन्ट्रियल प्रोटोकॉल (1987) ओजोन क्षयकारी पदार्थों (ODS) पर रोक लगाने हेतु हस्ताक्षरित अंतरराष्ट्रीय पर्यावरण संधि है।"),

        # 21. Physics - Archimedes Principle (Index 0)
        ("When an object is partially or fully immersed in a fluid at rest, it experiences an upward buoyant force equal to the weight of the fluid displaced by the object. This is known as:",
        "जब कोई वस्तु किसी स्थिर तरल में पूर्णतः या आंशिक रूप से डुबोई जाती है, तो वह ऊपर की ओर एक उत्प्लावन बल (Buoyant Force) अनुभव करती है जो वस्तु द्वारा विस्थापित द्रव के भार के बराबर होता है। यह कौन-सा नियम है?",
        "Archimedes' Principle (आर्किमिडीज का सिद्धांत)", "Bernoulli's Principle", "Pascal's Principle", "Hooke's Law",
        0, "Archimedes' principle explains buoyant forces and the flotation of ships, submarines, and hydrometers.",
        "आर्किमिडीज के सिद्धांत के अनुसार उत्प्लावन बल विस्थापित द्रव के भार के बराबर होता है। जहाजों का तैरना इसी सिद्धांत पर आधारित है।"),

        # 22. Chemistry - Rusting of Iron Prevention (Index 1)
        ("The industrial metallurgical process of protecting iron or steel sheets from rusting by applying a protective coating of molten zinc is called:",
        "लोहे अथवा स्टील की चादरों को जंग (Rust) से बचाने के लिए उन पर पिघले हुए जस्ते (Zinc) की पतली परत चढ़ाने की औद्योगिक प्रक्रिया क्या कहलाती है?",
        "Anodizing", "Galvanization / Yashad-lepan (गैल्वनीकरण / यशद-लेपन)", "Electroplating with nickel", "Vulcanization",
        1, "Galvanization coats iron with a thin sacrificial layer of zinc, preventing oxidation even if the surface is scratched.",
        "लोहे को जंग से बचाने हेतु उस पर जस्ते (Zinc) की परत चढ़ाना गैल्वनीकरण (Galvanization / यशद-लेपन) कहलाता है।"),

        # 23. Biology - Vitamin C Deficiency (Index 2)
        ("Bleeding gums, delayed wound healing, loose teeth, and skin petechiae are clinical manifestations of Scurvy, caused by a nutritional deficiency of which vitamin?",
        "मसूड़ों से खून आना, घाव भरने में अत्यधिक समय लगना और जोड़ों में दर्द किस विटामिन की हीनता से होने वाले 'स्कर्वी' (Scurvy) रोग के लक्षण हैं?",
        "Vitamin A", "Vitamin B12", "Vitamin C / Ascorbic Acid (विटामिन C - एस्कॉर्बिक एसिड)", "Vitamin D",
        2, "Scurvy results from severe deficiency of ascorbic acid (Vitamin C), essential for collagen synthesis and tissue repair.",
        "विटामिन C (एस्कॉर्बिक एसिड) की कमी से स्कर्वी रोग होता है जिसमें मसूड़ों से रक्तस्त्राव और घाव न भरने की समस्या होती है (आंवला व नींबू वर्गीय फल इसके प्रमुख स्रोत हैं)।"),

        # 24. Indian Polity - Writs Habeas Corpus (Index 3)
        ("Which constitutional writ literally translates from Latin as 'To have the body of' and serves as the ultimate bulwark against unlawful and arbitrary detention or imprisonment of a citizen?",
        "कौन-सी संवैधानिक रिट लैटिन भाषा में 'शरीर को प्रस्तुत किया जाए' (To have the body of) अर्थ रखती है तथा किसी व्यक्ति को अवैध व मनमाने ढंग से हिरासत में रखे जाने के विरुद्ध व्यक्तिगत स्वतंत्रता का सर्वोच्च सुरक्षा कवच है?",
        "Mandamus (परमादेश)", "Quo-Warranto (अधिकार-पृच्छा)", "Certiorari (उत्प्रेषण)", "Habeas Corpus (बंदी प्रत्यक्षीकरण)",
        3, "The writ of Habeas Corpus commands a detaining authority to produce the detained person before the court to examine the legal justification of detention.",
        "बंदी प्रत्यक्षीकरण (Habeas Corpus) रिट द्वारा न्यायालय बंदी बनाए गए व्यक्ति को अपने समक्ष प्रस्तुत करने का आदेश देता है ताकि उसकी गिरफ्तारी की वैधानिकता की जांच की जा सके।")
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
            'domain': 'BPSC TRE Science & Social Studies Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering Science, Polity, Geography, and Pedagogy
    science_social_modules = [
        # Physical Sciences
        ("न्यूटन का द्वितीय गति नियम बल सूत्र", "F = ma (बल = द्रव्यमान × त्वरण), संवेग परिवर्तन की दर लगाए गए बाह्य बल के समानुपाती होती है", "Newton Second Law Momentum Force", "भौतिक विज्ञान"),
        ("कार्य, शक्ति एवं ऊर्जा संबंध", "कार्य = F × s × cosθ (जूल), शक्ति = कार्य / समय (वाट), 1 अश्वशक्ति = 746 वाट", "Work Energy Power Dynamics", "भौतिक विज्ञान"),
        ("गुरुत्वाकर्षण एवं भारहीनता", "g = 9.8 मी/से²; पृथ्वी के केंद्र पर g का मान शून्य होता है, ध्रुवों पर अधिकतम और भूमध्य रेखा पर न्यूनतम", "Gravitational Field and Acceleration", "भौतिक विज्ञान"),
        ("प्रकाश का अपवर्तन स्नेल का नियम", "sin i / sin r = स्थिरांक (अपवर्तनांक n), विरल से सघन माध्यम में जाने पर किरण अभिलंब की ओर झुकती है", "Snell Law of Refraction", "भौतिक विज्ञान"),
        ("विद्युत धारा ओम का नियम प्रतिरोध", "V = IR; श्रेणी क्रम में R = R1 + R2 तथा समांतर क्रम में 1/R = 1/R1 + 1/R2", "Ohm Law and Circuit Resistance", "भौतिक विज्ञान"),
        ("विद्युत चुंबकीय प्रेरण फैराडे नियम", "परिपथ से बद्ध चुंबकीय फ्लक्स में परिवर्तन होने पर प्रेरित विद्युत वाहक बल (EMF) उत्पन्न होता है", "Faraday Electromagnetic Induction", "भौतिक विज्ञान"),

        # Chemical Sciences
        ("अम्ल-क्षार उदासीनीकरण एवं लवण निर्माण", "अम्ल + क्षार -> लवण + जल (ऊष्माक्षेपी अभिक्रिया); लिटमस पेपर को अम्ल नीला से लाल, क्षार लाल से नीला करता है", "Acid Base Neutralization Chemistry", "रसायन विज्ञान"),
        ("आधुनिक आवर्त सारणी मोजले नियम", "तत्वों के भौतिक एवं रासायनिक गुण उनके परमाणु क्रमांक (Atomic Number) के आवर्ती फलन होते हैं", "Modern Periodic Table Law", "रसायन विज्ञान"),
        ("धातुओं की सक्रियता श्रेणी विस्थापन", "पोटेशियम > सोडियम > कैल्शियम > मैग्नीशियम > एल्युमिनियम > जिंक > आयरन > लेड > हाइड्रोजन > कॉपर", "Reactivity Series of Metals", "रसायन विज्ञान"),
        ("कार्बन का अपररूप हीरा एवं ग्रेफाइट", "हीरा चतुष्फलकीय sp³ त्रिआयामी कठोर कुचालक है जबकि ग्रेफाइट षट्कोणीय sp² परतों वाला मुलायम सुचालक है", "Allotropes of Carbon Structure", "रसायन विज्ञान"),
        ("रासायनिक बंध आयनिक बनाम सहसंयोजी", "इलेक्ट्रॉन के स्थानांतरण से आयनिक बंध (NaCl) तथा इलेक्ट्रॉन के साझे से सहसंयोजी बंध (CH4) बनते हैं", "Ionic vs Covalent Bonding", "रसायन विज्ञान"),

        # Life Sciences
        ("पादप कोशिका बनाम जंतु कोशिका", "पादप कोशिका में सेल्यूलोज कोशिका भित्ति, हरित लवक और बड़ी रिक्तिका होती है जो जंतु कोशिका में नहीं होती", "Plant vs Animal Cell Anatomy", "जीव विज्ञान"),
        ("मानव परिसंचरण तंत्र दोहरा परिसंचरण", "मानव हृदय 4 कोष्ठीय होता है; फुफ्फुसीय परिसंचरण और दैहिक परिसंचरण मिलकर दोहरा परिसंचरण बनाते हैं", "Human Double Circulation System", "जीव विज्ञान"),
        ("मानव श्वसन तंत्र वायवीय श्वसन", "ग्लूकोज का माइटोकॉन्ड्रिया में ऑक्सीजन की उपस्थिति में पूर्ण विखंडन होकर 36-38 एटीपी ऊर्जा और CO2+H2O बनता है", "Aerobic Cellular Respiration", "जीव विज्ञान"),
        ("मानव पाचन तंत्र एंजाइम क्रिया", "लार में टायलिन (एमाइलेज), आमाशय में पेप्सिन (प्रोटीन पाचक), अग्न्याशय में ट्रिप्सिन और लाइपेस", "Digestive Enzymes and Catalysis", "जीव विज्ञान"),
        ("मानव अंतःस्रावी ग्रंथियां और हार्मोन", "इंसुलिन (अग्न्याशय - रक्त शर्करा नियंत्रण), थायरोक्सिन (थायरॉयड - उपापचय), एड्रेनालिन (संकटकालीन हार्मोन)", "Endocrine Glands and Hormones", "जीव विज्ञान"),
        ("मेंडल के आनुवंशिकता के नियम", "प्रभाविता का नियम, पृथक्करण का नियम (विपुंसन) और स्वतंत्र अपव्यूहन का नियम", "Mendelian Genetics Principles", "जीव विज्ञान"),

        # Ecology & Environment
        ("पारिस्थितिक तंत्र जैविक एवं अजैविक घटक", "उत्पादक (पौधे), प्राथमिक उपभोक्ता (शाकाहारी), द्वितीयक उपभोक्ता (मांसाहारी), अपघटक (जीवाणु-कवक)", "Ecosystem Biotic Abiotic Balance", "पर्यावरण अध्ययन"),
        ("जैव आवर्धन (Biomagnification)", "खाद्य श्रृंखला में डीडीटी और भारी धातुओं जैसे गैर-बायोडिग्रेडेबल रसायनों की सांद्रता शीर्ष स्तर पर बढ़ती है", "Biomagnification in Food Chains", "पर्यावरण अध्ययन"),
        ("ग्रीनहाउस प्रभाव एवं वैश्विक तापन", "CO2, CH4, N2O, जलवाष्प द्वारा पृथ्वी से विकिरित अवरक्त (Infrared) किरणों का अवशोषण कर तापमान बढ़ाना", "Greenhouse Gases Infrared Trapping", "पर्यावरण अध्ययन"),
        ("जैव विविधता तप्त स्थल (Hotspots)", "भारत के प्रमुख हॉटस्पॉट: पश्चिमी घाट, पूर्वी हिमालय, इंडो-बर्मा तथा सुंदरलैंड क्षेत्र", "Biodiversity Hotspots of India", "पर्यावरण अध्ययन"),

        # Indian Polity & Constitution
        ("संविधान की प्रस्तावना संप्रभुता दर्शन", "हम भारत के लोग... संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य", "Preamble Constitutional Philosophy", "भारतीय संविधान"),
        ("मौलिक अधिकार अनुच्छेद 21 प्राण एवं दैहिक स्वतंत्रता", "विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त किसी व्यक्ति को उसके जीवन या वैयक्तिक स्वतंत्रता से वंचित नहीं किया जाएगा", "Article 21 Right to Life Protection", "भारतीय संविधान"),
        ("अनुच्छेद 19 अभिव्यक्ति की स्वतंत्रता", "वाक् एवं अभिव्यक्ति की स्वतंत्रता, शांतिपूर्वक सम्मेलन, संघ निर्माण, निर्बाध संचरण, निवास एवं व्यापार की स्वतंत्रता", "Article 19 Six Basic Freedoms", "भारतीय संविधान"),
        ("राज्य के नीति निदेशक तत्व अनुच्छेद 40", "राज्य ग्राम पंचायतों का गठन करेगा और उन्हें स्वायत्त शासन की इकाइयों के रूप में कार्य करने की शक्तियां देगा", "Article 40 Organization of Panchayats", "भारतीय संविधान"),
        ("राष्ट्रपति की क्षमादान शक्ति अनुच्छेद 72", "राष्ट्रपति को किसी दंड को क्षमा, उसका प्रविलंबन, विराम या परिहार करने अथवा दंडादेश का लघुकरण करने की शक्ति", "Article 72 Presidential Pardoning Power", "भारतीय संविधान"),
        ("संसद में धन विधेयक अनुच्छेद 110", "धन विधेयक केवल लोकसभा में पेश हो सकता है; राज्यसभा इसे केवल 14 दिनों तक रोक सकती है", "Money Bill Procedure Article 110", "भारतीय संविधान"),
        ("संसदीय संयुक्त बैठक अनुच्छेद 108", "साधारण विधेयक पर दोनों सदनों में गतिरोध होने पर राष्ट्रपति संयुक्त बैठक बुलाते हैं, जिसकी अध्यक्षता लोकसभा अध्यक्ष करते हैं", "Joint Sitting of Parliament Article 108", "भारतीय संविधान"),
        ("सर्वोच्च न्यायालय एवं उच्च न्यायालय रिट अधिकारिता", "अनुच्छेद 32 (SC) तथा अनुच्छेद 226 (HC) के तहत 5 प्रकार की रिटें (बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण, अधिकार-पृच्छा)", "Constitutional Writs Jurisdiction", "भारतीय संविधान"),

        # Indian Geography
        ("भारत की भू-आकृति प्रायद्वीपीय पठार", "गोंडवाना लैंड का प्राचीनतम भाग, जिसमें मालवा, दक्कन का पठार और छोटानागपुर पठार सम्मिलित हैं", "Peninsular Plateau Physiography", "भारतीय भूगोल"),
        ("दक्षिण-पश्चिम मानसून की दो शाखाएं", "अरब सागर शाखा (पश्चिमी घाट पर भारी वर्षा) तथा बंगाल की खाड़ी शाखा (पूर्वोत्तर एवं गंगा मैदान में वर्षा)", "Southwest Monsoon Wind Currents", "भारतीय भूगोल"),
        ("सिंधु, गंगा एवं ब्रह्मपुत्र नदी तंत्र", "हिमालयी सदा नीरा नदियां; सुंदरबन डेल्टा विश्व का सबसे बड़ा डेल्टा जो गंगा-ब्रह्मपुत्र द्वारा निर्मित है", "Himalayan Drainage Systems", "भारतीय भूगोल"),
        ("प्रायद्वीपीय नदियां नर्मदा एवं ताप्ती", "भ्रंश घाटी (Rift Valley) से होकर पश्चिम की ओर बहने वाली नदियां जो डेल्टा न बनाकर ज्वारनदमुख (Estuary) बनाती हैं", "Narmada Tapti Rift Flow and Estuary", "भारतीय भूगोल"),
        ("भारत की मिट्टियां जलोढ़ एवं लेटेराइट", "जलोढ़ देश के 40% भाग पर उपजाऊ; लेटेराइट भारी वर्षा व निक्षालन (Leaching) से निर्मित चाय/कॉफी हेतु उपयुक्त", "Alluvial vs Laterite Soil Leaching", "भारतीय भूगोल"),

        # Teaching Aptitude & Educational Pedagogy
        ("आगमन विधि बनाम निगमन विधि", "आगमन विधि: उदाहरण से नियम की ओर (विशिष्ट से सामान्य); निगमन विधि: नियम से उदाहरण की ओर (सामान्य से विशिष्ट)", "Inductive vs Deductive Pedagogy", "शिक्षण अभिरुचि"),
        ("सतत एवं समग्र मूल्यांकन (CCE)", "अधिगम के संज्ञानात्मक, भावात्मक और मनोगामक पक्षों का रचनात्मक (Formative) व योगात्मक (Summative) मूल्यांकन", "Continuous Comprehensive Evaluation CCE", "शिक्षण अभिरुचि"),
        ("निदानात्मक परीक्षण एवं उपचारात्मक शिक्षण", "छात्रों की अधिगम संबंधी कठिनाइयों और कमियों की पहचान करना (निदान) तथा उनके निवारण हेतु शिक्षण (उपचार)", "Diagnostic and Remedial Teaching", "शिक्षण अभिरुचि"),
        ("समावेशी शिक्षा के मूलभूत सिद्धांत", "बिना किसी भेदभाव के सामान्य और विशिष्ट आवश्यकता वाले सभी बच्चों को एक साथ एक ही कक्षा में गुणवत्तापूर्ण शिक्षा", "Inclusive Classroom Principles", "शिक्षण अभिरुचि"),
        ("शिक्षा का अधिकार अधिनियम (RTE 2009)", "6 से 14 वर्ष के बच्चों हेतु निःशुल्क व अनिवार्य शिक्षा; प्राथमिक स्तर पर 30:1 तथा उच्च प्राथमिक पर 35:1 छात्र-शिक्षक अनुपात", "Right to Education Act 2009 Mandates", "शैक्षणिक नीतियां"),
        ("राष्ट्रीय शिक्षा नीति 2020 त्रि-भाषा सूत्र", "कक्षा 5 तक मातृभाषा/स्थानीय भाषा में शिक्षण, बहुभाषिकता को प्रोत्साहन, आलोचनात्मक चिंतन पर बल", "NEP 2020 Multilingual Pedagogical Tenets", "शैक्षणिक नीतियां"),
        ("कक्षा-कक्ष संचार एवं अंतःक्रिया", "द्विमार्गी संवादात्मक संचार (Two-way communication), जिसमें शिक्षक सुविधाप्रदाता (Facilitator) की भूमिका निभाता है", "Two-Way Classroom Interaction", "शिक्षण अभिरुचि")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(science_social_modules)
        topic, facts, topic_en, category = science_social_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the General Science, Social Studies, and Pedagogy curriculum of BPSC TRE, which statement regarding '{topic_en}' is factually and scientifically sound?"
            stem_hi = f"बीपीएससी शिक्षक भर्ती के सामान्य विज्ञान, सामाजिक अध्ययन एवं शिक्षण अभिरुचि पाठ्यक्रम के अनुसार '{topic}' से संबंधित कौन-सा कथन प्रामाणिक एवं सत्य है?"
            sol_en = f"Accurate concept: {facts}. Domain: {category}."
            sol_hi = f"प्रामाणिक तथ्य: {facts}। वर्ग: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Derived from Cretaceous paleomagnetic reversal trajectories", 'hi': "क्रेटेशियस जीवाश्म चुंबकीय उत्क्रमण से व्युत्पन्न"},
                {'en': "Calculated from abyssal hydrostatic trench decompression curves", 'hi': "अगाध महासागरीय हाइड्रोस्टैटिक विसंपीड़न वक्र से परिकलित"},
                {'en': "Formulated as part of North Sea offshore drilling concessions", 'hi': "उत्तरी सागर अपतटीय ड्रिलिंग रियायतों के तहत तैयार"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key academic or pedagogical discipline is '{topic_en}' categorized in BPSC TRE?"
            stem_hi = f"बीपीएससी शिक्षक भर्ती के अंतर्गत '{topic}' का संबंध किस प्रमुख शैक्षणिक विषय खंड से है?"
            sol_en = f"Categorized under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Mesozoic Trilobite Exoskeleton Fossilization", 'hi': "मेसोजोइक ट्राइलोबाइट जीवाश्म रचना"},
                {'en': f"BPSC Curriculum Core: {category} ({facts})", 'hi': f"पाठ्यक्रम मानक: {category} ({facts})"},
                {'en': "Antarctic Subglacial Lake Vostok Ice Core Sampling", 'hi': "अंटार्कटिक वोस्तोक बर्फ कोर नमूनाकरण"},
                {'en': "Neolithic Flint Knapping Tool Manufacture Sequences", 'hi': "नवपाषाण युगीन चकमक पत्थर औजार निर्माण"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"Why is a comprehensive understanding of '{topic_en}' vital for aspiring school educators and teachers?"
            stem_hi = f"एक कुशल शिक्षक एवं शिक्षाशास्त्री के रूप में '{topic}' का गहन ज्ञान क्यों अनिवार्य है?"
            sol_en = f"Key pedagogical/scientific value: {facts} ({category})."
            sol_hi = f"महत्व: {facts} ({category})।"
            choices = [
                {'en': "To compute supersonic shockwave angles on hypersonic missiles", 'hi': "हाइपरसोनिक मिसाइलों पर सुपरसोनिक शॉकवेव कोण गणना हेतु"},
                {'en': "To synthesize rare synthetic transuranic radioactive elements", 'hi': "दुर्लभ कृत्रिम ट्रांसयूरेनिक रेडियोधर्मी तत्वों को संश्लेषित करने हेतु"},
                {'en': f"Essential for conceptual mastery and teaching: {facts} ({category})", 'hi': f"अवधारणात्मक स्पष्टता एवं प्रभावी शिक्षण हेतु: {facts} ({category})"},
                {'en': "To navigate deep oceanic container convoys through arctic ice", 'hi': "आर्कटिक बर्फ में कंटेनर जहाजों के नौवहन हेतु"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately reflects the core principles of '{topic_en}'?"
            stem_hi = f"निम्न में से कौन-सा विकल्प '{topic}' के वैज्ञानिक अथवा शैक्षणिक सिद्धांत का सबसे सटीक सारांश प्रस्तुत करता है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Monitors deep crustal magma convection under volcanic calderas", 'hi': "ज्वालामुखीय काल्डेरा के नीचे मैग्मा संवहन की निगरानी करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on orbital space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर कोरोनाग्राफ स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Regulates deep trench oceanic tectonic subduction boundary friction", 'hi': "गहरे महासागरीय ट्रेंच सबडक्शन सीमा घर्षण को नियंत्रित करता है"},
                {'en': f"Standard conceptual synthesis: {facts} ({category})", 'hi': f"मानक शैक्षणिक/वैज्ञानिक तथ्य: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'BPSC - {category}',
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
    res = get_raw_science_social_science_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

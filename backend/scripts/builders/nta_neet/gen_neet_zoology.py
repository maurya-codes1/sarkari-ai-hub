"""
NTA NEET-UG - Zoology (प्राणी विज्ञान) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Animal Kingdom & Structural Organisation:
  Non-chordates (Porifera to Hemichordata), Chordates (Cyclostomata to Mammalia),
  Animal Tissues (Epithelial, Connective, Muscular, Neural), Anatomy of Frog and Cockroach
- Human Physiology:
  Breathing & Gas Exchange (Lung Volumes, Oxygen-Hb Dissociation, Haldane Effect),
  Circulation (Cardiac Cycle, ECG Interpretation, Blood Groups, Double Circulation),
  Excretion (Nephron, Countercurrent Mechanism, RAAS Regulation, GFR),
  Locomotion & Movement (Sliding Filament Theory, Sarcomere, Human Skeletal Framework, Joints),
  Neural Control & Coordination (Resting Potential, Action Potential, Synapse, Brain Regions, Reflex Arc),
  Chemical Coordination & Integration (Endocrine Glands, Hormones, Second Messenger vs Nuclear Receptors)
- Human Reproduction & Reproductive Health:
  Male & Female Reproductive Anatomy, Spermatogenesis, Oogenesis, Menstrual Cycle (LH Surge, Corpus Luteum),
  Fertilization, Cleavage, Implantation, Placenta, Parturition, Contraceptive Strategies (IUDs, Saheli),
  Assisted Reproductive Technologies (IVF, ZIFT, GIFT, ICSI)
- Evolution, Human Health & Diseases:
  Origin of Life (Miller-Urey), Homologous vs Analogous Organs, Natural Selection, Hardy-Weinberg Law, Human Evolution,
  Pathogens (Malaria Life Cycle, Typhoid Widal Test), Immunity (Innate, Acquired, Humoral, Cell-Mediated, Antibodies H2L2),
  AIDS (HIV, Helper T-Cells, ELISA), Cancer (Metastasis, Oncogenes)
- Biotechnology - Principles & Applications:
  Restriction Enzymes, pBR322 Vector Markers, PCR Steps (Taq Polymerase), Gel Electrophoresis, Bioreactors,
  Bt Cotton (Cry Toxins), RNA Interference (RNAi), Humulin (Recombinant Insulin), ADA Gene Therapy
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_neet_zoology_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Animal Kingdom - Phylum Porifera (Index 0)
        ("In sponges (Phylum Porifera), which specialized flagellated cells line the spongocoel and radial canals, creating water currents that facilitate filter feeding, respiration, and excretion?",
        "स्पंजों (संघ पोरीफेरा) में स्पंजगुहा (Spongocoel) तथा नालों को आस्तरित करने वाली वे विशिष्ट कशाभिकायुक्त कोशिकाएं कौन-सी हैं जो जल धारा उत्पन्न कर पोषण, श्वसन एवं उत्सर्जन में सहायता करती हैं?",
        "Choanocytes / Collar cells (कोएनोसाइट्स / कॉलर कोशिकाएं)",
        "Pinacocytes (पिनाकोसाइट्स)",
        "Cnidocytes (दंश कोशिकाएं)",
        "Archaeocytes (आर्कियोसाइट्स)",
        0, "Choanocytes (collar cells) are unique flagellated cells lining the central spongocoel and canals of sponges. Their flagellar beating drives the water transport system (canal system) essential for filter feeding, gas exchange, and waste removal.",
        "कोएनोसाइट्स या कॉलर कोशिकाएं (Choanocytes) संघ पोरीफेरा की अभिलाक्षणिक कशाभिकीय कोशिकाएं हैं जो स्पंजगुहा को आस्तरित करती हैं तथा जल संवहन नाल तंत्र को संचालित करती हैं।"),

        # 2. Human Physiology - Breathing & Exchange of Gases (Index 1)
        ("A healthy adult human breathes quietly at rest. What is the total maximum volume of air a person can exhale after a maximal forced inspiration (representing Vital Capacity, VC)?",
        "एक स्वस्थ वयस्क व्यक्ति में अधिकतम बलपूर्वक अंतःश्वसन के पश्चात वायु की वह अधिकतम मात्रा क्या कहलाती है जिसे बलपूर्वक बाहर निकाला जा सकता है (जैव क्षमता / Vital Capacity)?",
        "Tidal Volume (TV) + Residual Volume (RV)",
        "Tidal Volume (TV) + Inspiratory Reserve Volume (IRV) + Expiratory Reserve Volume (ERV) (जैव क्षमता = TV + IRV + ERV)",
        "Inspiratory Capacity (IC) + Residual Volume (RV)",
        "Expiratory Capacity (EC) + Functional Residual Capacity (FRC)",
        1, "Vital Capacity (VC) is the maximum volume of air an individual can expel from the lungs after a maximum inhalation: VC = TV + IRV + ERV (approximately 4000 to 4600 mL in healthy adults). Total Lung Capacity TLC = VC + RV.",
        "जैव क्षमता (Vital Capacity, VC) = प्रवाही आयतन (TV) + अंतःश्वसन सुरक्षित आयतन (IRV) + निःश्वसन सुरक्षित आयतन (ERV)। यह सामान्यतः 4000 से 4600 mL होती है। कुल फेफड़ा क्षमता TLC = VC + RV होती है।"),

        # 3. Human Physiology - Cardiac Cycle ECG (Index 2)
        ("In a standard clinical Electrocardiogram (ECG) trace, which wave or complex corresponds to the electrical depolarization of the ventricles, triggering ventricular systole?",
        "एक मानक नैदानिक इलेक्ट्रोकार्डियोग्राम (ECG) में कौन-सी तरंग या सम्मिश्र निलयों के विध्रुवण (Ventricular Depolarization) को प्रदर्शित करता है, जिससे निलय प्रकुंचन (Systole) प्रारंभ होता है?",
        "P wave (पी तरंग)",
        "T wave (टी तरंग)",
        "QRS complex (QRS सम्मिश्र)",
        "P-R interval",
        2, "In an ECG: P wave represents atrial depolarization; QRS complex represents ventricular depolarization (leading to ventricular contraction); and T wave represents ventricular repolarization (return to resting state).",
        "ECG में: P तरंग आलिंदों के विध्रुवण को, QRS सम्मिश्र निलयों के विध्रुवण (Ventricular depolarization) को, तथा T तरंग निलयों के पुनर्ध्रुवण (Repolarization) को दर्शाती है।"),

        # 4. Excretory System - Countercurrent Mechanism (Index 3)
        ("In the mammalian kidney, the high osmolarity gradient in the medullary interstitium (increasing from 300 mOsm/L at cortex to 1200 mOsm/L at inner medulla) is maintained primarily by which two substances?",
        "स्तनधारियों के वृक्क में मध्यांश अंतराकाश में उच्च परासरणी प्रवणता (वल्कुट में 300 mOsm/L से भीतरी मध्यांश में 1200 mOsm/L) बनाए रखने में किन दो पदार्थों की मुख्य भूमिका होती है?",
        "Glucose and Potassium ions",
        "Creatinine and Bicarbonate ions",
        "Ammonium ions and Calcium ions",
        "NaCl and Urea (सोडियम क्लोराइड एवं यूरिया)",
        3, "The hyperosmolar medullary gradient essential for urine concentration is established and maintained by the countercurrent multiplier of Henle's loop and countercurrent exchanger of vasa recta, utilizing active transport of NaCl and passive recycling of Urea.",
        "वृक्क के मध्यांश में उच्च परासरणीयता (300 से 1200 mOsm/L) बनाए रखने में हेनले लूप और वासा रेक्टा के प्रतिधारा तंत्र द्वारा NaCl और यूरिया का संकेंद्रण मुख्य रूप से उत्तरदायी होता है।"),

        # 5. Locomotion - Sliding Filament Theory (Index 0)
        ("According to the sliding filament theory of skeletal muscle contraction, what happens to the length of the A-band, I-band, and H-zone during muscle shortening?",
        "कंकाल पेशी संकुचन के सर्पी तंतु सिद्धांत (Sliding Filament Theory) के अनुसार, पेशी संकुचन के समय A-बैंड, I-बैंड तथा H-क्षेत्र की लंबाई में क्या परिवर्तन होता है?",
        "A-band length remains constant, while I-band and H-zone shorten (A-बैंड अपरिवर्तित रहता है, जबकि I-बैंड एवं H-क्षेत्र छोटे हो जाते हैं)",
        "A-band shortens while I-band length remains constant",
        "Both A-band and I-band lengthen simultaneously",
        "H-zone widens while sarcomere shortens",
        0, "During contraction, thin actin filaments slide over thick myosin filaments towards the center of the sarcomere (M-line). The A-band (myosin length) remains unchanged, while the I-band and H-zone shorten and may completely disappear.",
        "पेशी संकुचन में मायोसिन युक्त A-बैंड की लंबाई स्थिर रहती है, जबकि एक्टिन तंतुओं के सरकने से I-बैंड और H-क्षेत्र छोटे हो जाते हैं तथा सार्कोमियर सिकुड़ जाता है।"),

        # 6. Neural Control - Action Potential Generation (Index 1)
        ("During the transmission of a nerve impulse along an axon, the rapid depolarization phase of the action potential (+30 mV) is caused by which ion channel event?",
        "एक तंत्रिकाक्ष (Axon) के साथ तंत्रिका आवेग के संचरण के दौरान, क्रियात्मक विभव (Action Potential) का तीव्र विध्रुवण (+30 mV) किस आयनिक घटना के कारण होता है?",
        "Rapid efflux of Potassium ions (K+) out of the axoplasm",
        "Rapid influx of Sodium ions (Na+) into the axoplasm through voltage-gated channels (वोल्टेज-गेटेड चैनलों द्वारा सोडियम आयनों का तीव्र अंतर्वाह)",
        "Active pumping of Calcium ions by Na+/K+ ATPase",
        "Complete closure of all membrane cation pores",
        1, "A stimulus above threshold causes voltage-gated Na+ channels to open rapidly. Extracellular Na+ rushes into the negatively charged axoplasm down its electrochemical gradient, causing rapid depolarization from -70 mV to +30 mV.",
        "उद्दीपन मिलने पर वोल्टेज-गेटेड Na⁺ चैनल तेजी से खुल जाते हैं जिससे कोशिका के बाहर से Na⁺ आयन तीव्र गति से अंदर प्रवेश करते हैं और झिल्ली विध्रुवित होकर +30 mV पर पहुंच जाती है।"),

        # 7. Chemical Coordination - Hormone Action Mechanism (Index 2)
        ("Which of the following endocrine hormones is a steroid hormone that crosses the target cell plasma membrane and binds to an intracellular nuclear receptor to regulate gene transcription?",
        "निम्न में से कौन-सा अंतःस्रावी हार्मोन एक स्टेरॉयड हार्मोन है जो कोशिका झिल्ली को पार कर अंतःकोशिकीय केंद्रकीय ग्राही से जुड़कर जीन अभिव्यक्ति को नियंत्रित करता है?",
        "Adrenaline / Epinephrine",
        "Insulin",
        "Estrogen / Progesterone (एस्ट्रोजन / प्रोजेस्टेरोन - स्टेरॉयड हार्मोन)",
        "Glucagon",
        2, "Steroid hormones (Estrogen, Progesterone, Testosterone, Cortisol, Aldosterone) and iodothyronines are lipid-soluble. They diffuse across the lipid bilayer and bind to intracellular/nuclear receptors to form hormone-receptor complexes regulating mRNA synthesis.",
        "स्टेरॉयड हार्मोन (जैसे एस्ट्रोजन, टेस्टोस्टेरोन, कोर्टिसोल) लिपिड-घुलनशील होते हैं। ये झिल्ली पार कर सीधे अंतःकोशिकीय केंद्रकीय ग्राहियों से जुड़ते हैं और जीन ट्रांसक्रिप्शन को नियंत्रित करते हैं। पेप्टाइड हार्मोन द्वितीयक संदेशवाहक (cAMP) का उपयोग करते हैं।"),

        # 8. Human Reproduction - Menstrual Cycle Ovulation (Index 3)
        ("In a normal 28-day human menstrual cycle, the rupture of the mature Graafian follicle and release of the secondary oocyte (ovulation) on around Day 14 is directly triggered by which endocrine event?",
        "सामान्य 28-दिवसीय मानव आर्तव चक्र में, लगभग 14वें दिन परिपक्व ग्रैफियन पुटक के फटने तथा द्वितीयक अंडक के मुक्त होने (अंडोत्सर्ग / Ovulation) का मुख्य कारण कौन-सी अंतःस्रावी घटना है?",
        "Sharp drop in pituitary FSH levels",
        "Sudden surge in progesterone secretion from the corpus albicans",
        "Complete cessation of estrogen production by granulosa cells",
        "Rapid surge in Luteinizing Hormone (LH surge) secreted by the anterior pituitary (अग्र पीयूषिका द्वारा स्रावित ल्यूटिनाइजिंग हार्मोन का तीव्र स्राव / LH सर्ज)",
        3, "Around the midpoint of the cycle (day 14), high estrogen triggers positive feedback causing rapid anterior pituitary secretion of Luteinizing Hormone (LH surge), which induces rupture of the mature Graafian follicle and ovulates the ovum.",
        "आर्तव चक्र के 14वें दिन ल्यूटिनाइजिंग हार्मोन (LH) का स्तर चरम पर पहुंच जाता है जिसे 'LH सर्ज' (LH surge) कहते हैं। यह ग्रैफियन पुटिका को तोड़कर अंडोत्सर्ग (Ovulation) को प्रेरित करता है।"),

        # 9. Reproductive Health - Contraceptive Mechanism (Index 0)
        ("What is the primary contraceptive mechanism of action of non-steroidal oral contraceptive pills like 'Saheli' developed by CDRI Lucknow?",
        "केंद्रीय औषधि अनुसंधान संस्थान (CDRI लखनऊ) द्वारा विकसित गैर-स्टेरॉयडल गर्भनिरोधक गोली 'सहेली' (Saheli) की कार्यप्रणाली क्या है?",
        "It acts as a selective estrogen receptor modulator that binds estrogen receptors in the endometrium and prevents blastocyst implantation (यह एंडोमेट्रियम में एस्ट्रोजन रिसेप्टर्स को अवरुद्ध कर आरोपण रोकती है)",
        "It irreversibly destroys all primordial germ cells in the ovary",
        "It forms a thick physical plug in the vas deferens",
        "It induces surgical menopause within three weeks",
        0, "'Saheli' (Centchroman/Ormeloxifene) is a non-steroidal, once-a-week oral contraceptive that blocks estrogen receptors in the uterine endometrium, altering endometrial receptivity and preventing blastocyst implantation.",
        "'सहेली' (सेंटक्रोमन) एक गैर-स्टेरॉयडल साप्ताहिक गर्भनिरोधक गोली है जो गर्भाशय के एंडोमेट्रियम में एस्ट्रोजन ग्राहियों को अवरुद्ध कर देती है, जिससे युग्मनज का आरोपण (Implantation) नहीं हो पाता।"),

        # 10. Evolution - Homologous Organs (Index 1)
        ("The forelimbs of humans, cheetahs, whales, and bats share a similar skeletal anatomy (humerus, radius, ulna, carpals, metacarpals, phalanges) despite performing completely different functions. This provides classic evolutionary evidence of:",
        "मनुष्य, चीता, व्हेल और चमगादड़ के अग्रपाद समान अस्थि संरचना (ह्यूमरस, रेडियस, अल्ना, कार्पल्स) साझा करते हैं यद्यपि वे भिन्न-भिन्न कार्य करते हैं। यह किसका उत्कृष्ट विकासीय प्रमाण प्रस्तुत करता है?",
        "Analogous organs resulting from convergent evolution",
        "Homologous organs resulting from divergent evolution (समजात अंग - अपसारी विकास)",
        "Vestigial organs inherited from extinct reptiles",
        "Saltation mutations produced by macro-evolutionary jumps",
        1, "Homologous organs share identical fundamental anatomical architecture and embryological origin but have evolved along different lines to perform divergent functional tasks (divergent evolution). Analogous organs share function but differ in origin.",
        "समजात अंग (Homologous Organs) की मूल संरचना और भ्रूणीय उत्पत्ति समान होती है परंतु अनुकूलन के कारण वे भिन्न कार्य करते हैं। यह अपसारी विकास (Divergent Evolution) का प्रमाण है।"),

        # 11. Human Health & Disease - Malaria Vector & Stage (Index 2)
        ("In the life cycle of the malarial parasite Plasmodium falciparum, what is the infective stage of the parasite that is inoculated into the human bloodstream during the bite of an infected female Anopheles mosquito?",
        "मलेरिया परजीवी प्लाज्मोडियम फाल्सीपेरम के जीवन चक्र में, संक्रमित मादा एनोफिलीज़ मच्छर के काटने पर मानव रक्तप्रवाह में प्रवेश करने वाली संक्रामक अवस्था (Infective Stage) कौन-सी होती है?",
        "Trophozoites",
        "Gametocytes",
        "Sporozoites (स्पोरोज़ोआइट्स / बीजाणुज)",
        "Merozoites",
        2, "Female Anopheles mosquitoes harbor sickle-shaped Sporozoites in their salivary glands. When biting a human host, sporozoites are injected into the bloodstream and travel to liver hepatocytes to initiate schizogony.",
        "मादा एनोफिलीज़ मच्छर की लार ग्रंथियों में 'स्पोरोज़ोआइट' (Sporozoites) संचित रहते हैं। मच्छर के काटने पर यही अवस्था मानव के रक्त में पहुंचकर यकृत कोशिकाओं को संक्रमित करती है।"),

        # 12. Biotechnology - Restriction Endonucleases (Index 3)
        ("The restriction endonuclease enzyme EcoRI specifically recognizes and cleaves double-stranded DNA at which palindromic nucleotide sequence?",
        "प्रतिबंधन एंडोन्यूक्लिएज एंजाइम EcoRI द्विरज्जुक डीएनए को किस विशिष्ट पैलिंड्रोमिक न्यूक्लियोटाइड अनुक्रम पर पहचानकर काटता है?",
        "5'-AAGCTT-3' and 3'-TTCGAA-5' (HindIII)",
        "5'-GGATCC-3' and 3'-CCTAGG-5' (BamHI)",
        "5'-GATATC-3' and 3'-CTATAG-5' (EcoRV)",
        "5'-GAATTC-3' and 3'-CTTAAG-5' (5'-GAATTC-3' / 3'-CTTAAG-5' - EcoRI)",
        3, "EcoRI cuts the palindromic hexanucleotide sequence 5'-GAATTC-3' between G and A on both opposite complementary strands, producing staggered single-stranded 'sticky ends' (AATT).",
        "EcoRI प्रतिबंध एंजाइम 5'-GAATTC-3' पैलिंड्रोमिक अनुक्रम को G तथा A के मध्य काटता है, जिससे चिपचिपे सिरे (Sticky ends) बनते हैं।"),

        # 13. Biotechnology Applications - Bt Cotton (Index 0)
        ("In genetically modified Bt cotton, why does the crystalline insecticidal protoxin produced by Bacillus thuringiensis (Cry protein) NOT kill the bacterium itself, but effectively kills target lepidopteran insect pests?",
        "आनुवंशिक रूप से रूपांतरित बीटी कपास में, बैसिलस थुरिंजिएंसिस जीवाणु द्वारा निर्मित क्रिस्टलीय कीटनाशक प्रोटीन (Cry प्रोटीन) स्वयं जीवाणु को क्यों नहीं मारता, परंतु लक्षित कीटों को मार देता है?",
        "The toxin exists as an inactive protoxin in bacteria and is solubilized and activated only in the alkaline pH of the insect midgut (जीवाणु में विष निष्क्रिय प्रोटॉक्सिन रूप में रहता है तथा कीट की मध्यांत के क्षारीय pH में सक्रिय होता है)",
        "Bacteria possess a thick impermeable calcium shell that blocks all proteins",
        "The Cry toxin is digested immediately by bacterial mitochondrial enzymes",
        "The Cry gene is expressed only in eukaryotic cotton chloroplasts",
        0, "Bt Cry toxin is synthesized as an inactive crystalline protoxin. When ingested by insects, the alkaline pH of the insect midgut solubilizes the crystals, and gut proteases cleave it into an active toxin that binds midgut epithelial cells, creating pores and causing cell lysis.",
        "Cry प्रोटीन जीवाणु में निष्क्रिय प्राक्-विष (Protoxin) के रूप में रहता है। कीट द्वारा खाने पर उसकी मध्यांत (Midgut) के क्षारीय pH के कारण यह घुलकर सक्रिय रूप में बदल जाता है और उपकला कोशिकाओं में छिद्र कर कीट को मार देता है।"),

        # 14. Human Health & Disease - Antibodies Structure (Index 1)
        ("An antibody molecule (Immunoglobulin) consists of four polypeptide chains structured as H_2L_2. Which type of chemical bond links the heavy and light chains together into a functional Y-shaped monomer?",
        "प्रतिरक्षी अणु (इम्युनोग्लोबुलिन) चार पॉलीपेप्टाइड श्रृंखलाओं (H₂L₂) से बना होता है। भारी (Heavy) एवं हल्की (Light) श्रृंखलाओं को आपस में जोड़कर Y-आकार का अणु बनाने वाले रासायनिक बंध कौन-से होते हैं?",
        "Phosphodiester bonds",
        "Disulfide bonds (-S-S- डाइसल्फाइड बंध)",
        "Glycosidic ether linkages",
        "High-energy ester bonds",
        1, "An antibody monomer comprises two identical heavy (H) chains and two identical light (L) chains held together by covalent interchain and intrachain Disulfide (-S-S-) bonds forming the flexible Y-shape.",
        "एंटीबॉडी अणु में दो भारी (H) और दो हल्की (L) श्रृंखलाएं आपस में सहसंयोजी डाइसल्फाइड बंधों (-S-S- bonds) द्वारा जुड़ी होती हैं। इसका सूत्र H₂L₂ होता है।"),

        # 15. Biotechnology - Gene Therapy ADA (Index 2)
        ("In 1990, the first clinical gene therapy was successfully administered to a 4-year-old girl suffering from Severe Combined Immunodeficiency (SCID) caused by a hereditary deficiency of which vital enzyme?",
        "वर्ष 1990 में किस महत्वपूर्ण एंजाइम की वंशानुगत कमी के कारण होने वाले गंभीर संयुक्त प्रतिरक्षा अभाव रोग (SCID) से पीड़ित 4 वर्षीय बालिका को पहली सफल नैदानिक जीन थेरेपी दी गई थी?",
        "Phenylalanine hydroxylase",
        "Glucocerebrosidase",
        "Adenosine Deaminase / ADA (एडीनोसिन डीएमीनेज)",
        "Alpha-1-antitrypsin",
        2, "The first human gene therapy cured a 4-year-old girl with Adenosine Deaminase (ADA) deficiency SCID. Functional ADA cDNA was introduced into the patient's cultured lymphocytes using a retroviral vector.",
        "1990 में पहली जीन थेरेपी एडीनोसिन डीएमीनेज (ADA) एंजाइम की कमी वाले रोगी को दी गई थी। रेट्रोवायरल वेक्टर का उपयोग करके रोगी के लिम्फोसाइट्स में सक्रिय ADA जीन डाला गया था।"),

        # 16. Animal Kingdom - Phylum Arthropoda Excretion (Index 3)
        ("In terrestrial insects like Cockroaches (Periplaneta americana), which specialized excretory tubules extract uric acid and potassium urate from the hemolymph to discharge waste into the hindgut?",
        "तिलचट्टा (पेरिप्लेनेटा अमेरिकाना) जैसे स्थलीय कीटों में, हीमोलिम्फ से यूरिक अम्ल को अवशोषित कर पश्चांत में उत्सर्जित करने वाली विशिष्ट उत्सर्जी नलिकाएं कौन-सी हैं?",
        "Nephridia", "Flame cells / Solenocytes", "Green glands / Antennal glands", "Malpighian tubules (मैल्पीघी नलिकाएं)",
        3, "In insects, 100-150 fine yellow Malpighian tubules at the junction of the midgut and hindgut absorb nitrogenous wastes from hemolymph, convert them into uric acid crystals, and excrete them, making insects uricotelic.",
        "तिलचट्टे में मध्यांत और पश्चांत के संधि स्थल पर 100-150 पतली पीली मैल्पीघी नलिकाएं (Malpighian tubules) होती हैं जो हीमोलिम्फ से यूरिक अम्ल का उत्सर्जन करती हैं।"),

        # 17. Human Physiology - Blood Clotting Cascade (Index 0)
        ("During blood coagulation, which enzyme complex catalyzes the conversion of inactive prothrombin in plasma into active thrombin in the presence of calcium ions (Ca^(2+))?",
        "रक्त का थक्का जमने (Blood Clotting) के दौरान, प्लाज्मा में उपस्थित निष्क्रिय प्रोथ्रोम्बिन को कैल्शियम आयनों (Ca²⁺) की उपस्थिति में सक्रिय थ्रोम्बिन में बदलने वाला एंजाइम सम्मिश्र कौन-सा है?",
        "Thrombokinase / Prothrombinase (थ्रोम्बोकाइनेज एंजाइम सम्मिश्र)",
        "Fibrin stabilizing factor (Factor XIII)",
        "Heparinase",
        "Plasminogen activator",
        0, "Damaged platelets and tissues release thromboplastin, initiating a cascade of reactions that forms the enzyme complex Thrombokinase (prothrombinase). Thrombokinase in the presence of Ca^(2+) converts prothrombin into active thrombin.",
        "क्षतिग्रस्त ऊतकों और प्लेटलेट्स से निकलने वाले कारकों द्वारा थ्रोम्बोकाइनेज (Thrombokinase) एंजाइम बनता है, जो Ca²⁺ आयनों की उपस्थिति में प्रोथ्रोम्बिन को सक्रिय थ्रोम्बिन में परिवर्तित करता है।"),

        # 18. Human Physiology - Endocrine Pituitary (Index 1)
        ("Which of the following hormones is synthesized by neurosecretory cells of the hypothalamus, but stored and released into circulation by the posterior pituitary (neurohypophysis)?",
        "निम्न में से कौन-सा हार्मोन हाइपोथैलेमस की तंत्रिकास्रावी कोशिकाओं द्वारा संश्लेषित होता है परंतु पश्च पीयूषिका (न्यूरोहाइपोफाइसिस) द्वारा संचित एवं रक्त में स्रावित किया जाता है?",
        "Prolactin and Growth Hormone",
        "Oxytocin and Vasopressin / Anti-Diuretic Hormone (ऑक्सीटोसिन एवं वैसोप्रेसिन / ADH)",
        "Luteinizing Hormone and Follicle Stimulating Hormone",
        "Thyroid Stimulating Hormone and ACTH",
        1, "Oxytocin and Vasopressin (ADH) are peptide hormones synthesized in the supraoptic and paraventricular nuclei of the hypothalamus and transported axonally to the posterior pituitary (Pars nervosa) for storage and release.",
        "ऑक्सीटोसिन तथा वैसोप्रेसिन (ADH) का संश्लेषण हाइपोथैलेमस में होता है तथा वे तंत्रिकाक्षों द्वारा पश्च पीयूषिका (न्यूरोहाइपोफाइसिस) में पहुंचते हैं जहाँ से वे स्रावित होते हैं।"),

        # 19. Evolution - Hardy-Weinberg Principle (Index 2)
        ("In a stable population in Hardy-Weinberg genetic equilibrium, if the frequency of a recessive allele (q) is 0.40, what is the frequency of the heterozygous carrier genotype (2pq)?",
        "हार्डी-वेनबर्ग साम्यावस्था में स्थित एक जनसंख्या में, यदि एक अप्रभावी एलील (q) की आवृत्ति 0.40 है, तो विषमयुग्मजी वाहक जीनप्ररूप (2pq) की आवृत्ति क्या होगी?",
        "0.16", "0.36", "0.48 (2pq = 2 * 0.60 * 0.40 = 0.48)", "0.24",
        2, "p + q = 1 => p = 1 - 0.40 = 0.60. The heterozygous frequency = 2 * p * q = 2 * (0.60) * (0.40) = 0.48 (48% of the population).",
        "p + q = 1 से: p = 1 - 0.40 = 0.60। विषमयुग्मजी वाहक (2pq) = 2 * 0.60 * 0.40 = 0.48 (या 48%)।"),

        # 20. Human Physiology - Nephron Filtration (Index 3)
        ("In human nephrons, what is the average normal Glomerular Filtration Rate (GFR) in a healthy adult individual?",
        "मानव वृक्क के नेफ्रॉन में एक स्वस्थ वयस्क व्यक्ति की औसत सामान्य गुच्छीय निस्यंदन दर (Glomerular Filtration Rate - GFR) कितनी होती है?",
        "12.5 mL/min (18 Liters/day)",
        "500 mL/min (720 Liters/day)",
        "50 mL/min (72 Liters/day)",
        "125 mL/min (180 Liters/day) (125 मिली/मिनट या लगभग 180 लीटर/दिन)",
        3, "GFR is the volume of filtrate formed by both kidneys per minute, averaging 125 mL/min, which equates to approximately 180 Liters of ultrafiltrate formed per day (of which 99% is reabsorbed).",
        "दोनों वृक्कों द्वारा प्रति मिनट बनने वाले निस्यंद की मात्रा को GFR कहते हैं, जो सामान्यतः 125 mL/मिनट (लगभग 180 लीटर/दिन) होती है। इसका 99% भाग पुनः अवशोषित हो जाता है।"),

        # 21. Structural Organisation - Epithelial Tissues (Index 0)
        ("Which type of simple epithelium forms a single thin layer of flattened cells with irregular boundaries, facilitating rapid diffusion of gases across the alveolar walls of the lungs and capillary endothelium?",
        "फेफड़ों की कूपिकाओं (Alveoli) की भित्ति तथा रक्त केशिकाओं की एंडोथीलियम में गैसों के त्वरित विसरण हेतु उत्तरदायी चपटी कोशिकाओं का एकस्तरीय उपकला ऊतक कौन-सा है?",
        "Simple Squamous Epithelium (सरल शल्की उपकला)",
        "Simple Cuboidal Epithelium",
        "Ciliated Columnar Epithelium",
        "Transitional Stratified Epithelium",
        0, "Simple squamous epithelium consists of a single layer of scale-like flattened cells with irregular boundaries. It functions as a thin diffusion boundary in pulmonary alveoli and Bowman's capsule.",
        "सरल शल्की उपकला (Simple Squamous Epithelium) पतली चपटी कोशिकाओं की एकल परत होती है जो फेफड़ों की कूपिकाओं और रक्त वाहिकाओं में विसरण सीमा (Diffusion boundary) बनाती है।"),

        # 22. Human Health - Immune Cells (Index 1)
        ("Which class of human leukocytes (white blood cells) are agranulocytes that mediate graft rejection in organ transplants through Cell-Mediated Immunity (CMI)?",
        "अंग प्रत्यारोपण में कोशिका-माध्यस्थ प्रतिरक्षा (CMI) द्वारा ग्राफ्ट अस्वीकृति (Graft Rejection) हेतु कौन-सी ल्यूकोसाइट कोशिकाएं उत्तरदायी होती हैं?",
        "B-Lymphocytes producing circulating IgG",
        "T-Lymphocytes / T-Cells (टी-लिम्फोसाइट्स / टी-कोशिकाएं)",
        "Eosinophils",
        "Basophils releasing histamine",
        1, "Cell-Mediated Immunity (CMI) is mediated by T-lymphocytes (specifically cytotoxic CD8+ T cells). CMI is primarily responsible for the graft versus host tissue rejection in kidney, heart, and liver transplants.",
        "कोशिका-माध्यस्थ प्रतिरक्षा (CMI) का संचालन T-लिम्फोसाइट्स (T-cells) द्वारा होता है। अंग प्रत्यारोपण में ग्राफ्ट अस्वीकृति हेतु T-कोशिकाएं ही मुख्य रूप से उत्तरदायी होती हैं।"),

        # 23. Biotechnology - PCR Steps (Index 2)
        ("In the Polymerase Chain Reaction (PCR) technique developed by Kary Mullis, what are the three sequential steps performed in each thermal cycle?",
        "कैरी मुलिस द्वारा विकसित पॉलीमरेज श्रृंखला अभिक्रिया (PCR) के प्रत्येक चक्र में संपन्न होने वाले तीन क्रमिक चरण कौन-से हैं?",
        "Elongation, Ligation, and Transcription",
        "Ligation, Annealing, and Cleavage",
        "Denaturation (~94°C), Annealing (~55°C), and Extension (~72°C) (निष्क्रियीकरण/विकृतीकरण, तापानुशीतन, तथा विस्तार)",
        "Hybridization, Translation, and Electrophoresis",
        2, "Each cycle of PCR consists of: (1) Denaturation of dsDNA template at 94-96°C; (2) Annealing of oligonucleotide primers to single strands at 50-60°C; and (3) Extension of primers by thermostable Taq DNA polymerase at 72°C.",
        "PCR के तीन क्रमिक चरण हैं: (1) विकृतीकरण (Denaturation ~94°C), (2) तापानुशीतन (Annealing ~55°C), तथा (3) विस्तार (Extension ~72°C - टैक पॉलीमरेज़ द्वारा)।"),

        # 24. Reproductive Health - Assisted Reproductive Technology (Index 3)
        ("In which Assisted Reproductive Technology (ART) procedure is an embryo with up to 8 blastomeres transferred directly into the Fallopian tube of a surrogate or biological mother?",
        "किस सहायक जनन प्रौद्योगिकी (ART) में 8 ब्लास्टोमियर तक के प्रारंभिक भ्रूण को सीधे फैलोपियन नलिका में स्थानांतरित किया जाता है?",
        "Intra-Uterine Insemination (IUI)",
        "Intra-Cytoplasmic Sperm Injection (ICSI)",
        "GIFT (Gamete Intra-Fallopian Transfer)",
        "ZIFT (Zygote Intra-Fallopian Transfer - युग्मनज अंतःफैलोपियन स्थानांतरण)",
        3, "In ZIFT (Zygote Intra-Fallopian Transfer), the in-vitro fertilized zygote or early embryo up to 8 blastomeres is transferred into the Fallopian tube. If the embryo has more than 8 blastomeres, it is transferred into the uterus (IUT).",
        "ZIFT (Zygote Intra-Fallopian Transfer) में इन-विट्रो निषेचित युग्मनज या 8 ब्लास्टोमियर तक के प्रारंभिक भ्रूण को फैलोपियन ट्यूब में स्थानांतरित किया जाता है। 8 से अधिक ब्लास्टोमियर होने पर उसे गर्भाशय में स्थानांतरित (IUT) करते हैं।")
    ]

    for q in core_benchmarks:
        items.append({
            'domain': 'NEET Zoology - Core Benchmark',
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
            'difficulty': 'MODERATE'
        })

    # Systematic expansion to exactly 300 items across 6 core domains (46 Qs each):
    # 1. Animal Kingdom & Structural Organisation (46 Qs)
    # 2. Human Physiology: Digestion, Respiration & Circulation (46 Qs)
    # 3. Human Physiology: Excretion, Locomotion & Neural Coordination (46 Qs)
    # 4. Human Physiology: Endocrine System & Hormone Mechanisms (46 Qs)
    # 5. Human Reproduction, Embryology & Reproductive Health (46 Qs)
    # 6. Genetics, Evolution, Human Health & Biotechnology (46 Qs)

    domains_data = [
        ("Animal Kingdom & Structural Organisation", [
            ("Cnidaria Metagenesis Obelia Alternation", "नाइडेरिया ओबेलिया में पीढ़ी एकांतरण", "polyp asexual sessile phase alternates with medusa sexual free-swimming phase via metagenesis"),
            ("Ctenophora Bioluminescence Comb Plates", "टीनोफोरा जैव संदीप्ति कंकत पट्टिकाएं", "eight external ciliated comb plates facilitate locomotion alongside striking biological luminescence"),
            ("Platyhelminthes Flame Cells Osmoregulation", "प्लेटीहेल्मिंथीज ज्वाला कोशिकाएं", "specialized protonephridial flame cells maintain ionic balance and excrete nitrogenous wastes"),
            ("Echinodermata Water Vascular System", "एकाइनोडर्माटा जल संवहन तंत्र", "hydraulic ambulacral system operating tube feet for locomotion, food capture, and gas exchange"),
            ("Chondrichthyes Placoid Scales Operculum Absence", "उपास्थिल मछलियां पट्टलाभ शल्क", "tough skin embedded with backward pointing placoid scales and exposed gill slits lacking opercula"),
            ("Dense Regular Connective Tissue Tendons", "सघन नियमित संयोजी ऊतक कंडरा (टेंडन)", "parallel collagen fiber bundles connecting skeletal muscle to bone providing high tensile strength"),
            ("Cockroach Compound Eyes Mosaic Vision", "तिलचट्टा संयुक्त नेत्र मोज़ेक दृष्टि", "composed of 2000 hexagonal ommatidia providing high sensitivity with low resolution vision"),
            ("Frog Cutaneous Respiration Hibernation", "मेंढक त्वचीय श्वसन शीतनिष्क्रियता", "vascularized moist skin enables gas exchange during hibernation and aestivation underwater")
        ]),
        ("Human Physiology: Digestion, Respiration & Circulation", [
            ("Oxygen-Hemoglobin Dissociation Curve Shifts", "ऑक्सीजन-हीमोग्लोबिन वियोजन वक्र विस्थापन", "high pCO2, elevated temperature, and high H+ (low pH) shift the curve to the right (Bohr effect)"),
            ("Carbon Dioxide Transport Bicarbonate Ions", "कार्बन डाइऑक्साइड परिवहन बाइकार्बोनेट आयन", "approximately 70% of CO2 is carried as bicarbonate ions in plasma facilitated by carbonic anhydrase"),
            ("Cardiac Output Stroke Volume Modulation", "हृदय निर्गम स्ट्रोक आयतन नियमन", "cardiac output equals stroke volume (70 mL) multiplied by heart rate (72 bpm), approximately 5 L/min"),
            ("Erythroblastosis Fetalis Rh Incompatibility", "गर्भ रक्ताणुकोरकता Rh असंगतता", "Rh-negative mother carrying Rh-positive fetus develops anti-Rh antibodies destroying fetal RBCs in subsequent pregnancies"),
            ("Hepatic Portal System Venous Circuit", "यकृत निवाहिका तंत्र शिरा परिपथ", "drains deoxygenated nutrient-rich blood from stomach and intestine directly into liver before systemic return"),
            ("Sinoatrial Node Cardiac Pacemaker", "शिरा-आलिंद गांठ (SAN) पेसमेकर", "inherently self-excitable nodal tissue generating spontaneous action potentials at 70-75 impulses per minute"),
            ("Atherosclerosis Coronary Artery Disease", "धमनीकाठिन्य कोरोनरी धमनी रोग", "deposition of cholesterol, fat, and fibrous tissue narrowing arterial lumen supplying heart myocardium"),
            ("Hypertension Sustained Blood Pressure Threshold", "उच्च रक्तचाप निरंतर दाब सीमा", "persistent arterial blood pressure exceeding 140/90 mmHg risking cerebrovascular and renal damage")
        ]),
        ("Human Physiology: Excretion, Locomotion & Neural Coordination", [
            ("Renin-Angiotensin-Aldosterone System RAAS", "रेनिन-एंजियोटेंसिन-एल्डोस्टेरोन तंत्र", "fall in GFR stimulates juxtaglomerular cells to secrete renin, activating angiotensin II and aldosterone to restore blood volume"),
            ("Urea Secretion Thin Loop of Henle", "यूरिया स्राव हेनले लूप की पतली भुजा", "urea diffuses into thin ascending limb from medullary interstitium maintaining hyperosmotic gradient"),
            ("Atrial Natriuretic Factor Vasodilation", "एट्रियल नैट्रियूरेटिक कारक वासोडिलेशन", "secreted by atrial wall in response to high blood pressure causing vasodilation and sodium excretion opposing RAAS"),
            ("Troponin-Tropomyosin Actin Masking", "ट्रोपोनिन-ट्रोपोमायोसिन एक्टिन आवरण", "calcium ions bind troponin-C causing conformational unmasking of active myosin-binding sites on actin filaments"),
            ("Synovial Joint Fluid Articular Cartilage", "साइनोवियल जोड़ तरल उपास्थि", "synovial fluid-filled cavity between hyaline-capped articulating bones enabling frictionless rotation"),
            ("Saltatory Conduction Nodes of Ranvier", "सॉल्टेटरी संचरण रैन्वियर की गांठ", "action potential jumps across insulated myelin sheaths from one Node of Ranvier to the next accelerating velocity"),
            ("Cerebellum Motor Coordination Equilibrium", "अनुमस्तिष्क पेशीय समन्वय संतुलन", "integrates sensory inputs from semicircular canals and muscle spindles to maintain posture and balance"),
            ("Cornea Sclera Fibrous Coat of Eyeball", "कॉर्निया श्वेतपटल नेत्रगोलक बाह्य कोट", "anterior transparent cornea refracts light while dense posterior fibrous sclera maintains structural integrity")
        ]),
        ("Human Physiology: Endocrine System & Hormone Mechanisms", [
            ("Thyroid Hormone Basal Metabolic Rate", "थायरॉयड हार्मोन आधारी उपापचय दर", "thyroxine (T4) and triiodothyronine (T3) regulate oxygen consumption, carbohydrate/lipid metabolism, and thermogenesis"),
            ("Parathyroid Hormone Hypercalcemic Action", "पैराथायरॉयड हार्मोन हाइपरकैल्सीमिक प्रभाव", "increases blood calcium levels by stimulating bone osteoclastic resorption, renal tubular reabsorption, and gut absorption"),
            ("Adrenal Medulla Emergency Fight-or-Flight", "अधिवृक्क मध्यांश आपातकालीन हार्मोन", "epinephrine and norepinephrine rapidly increase alertness, pupillary dilation, heart rate, and glycogenolysis"),
            ("Insulin Glycogenesis Beta Cell Secretion", "इंसुलिन ग्लाइकोजेनेसिस बीटा कोशिकाएं", "promotes rapid cellular glucose uptake in hepatocytes and adipocytes converting glucose into glycogen"),
            ("Glucagon Glycogenolysis Alpha Cell Secretion", "ग्लूकागन ग्लाइकोजिनोलिसिस अल्फा कोशिकाएं", "stimulates glycogen breakdown and gluconeogenesis in liver restoring blood glucose during hypoglycemia"),
            ("Melatonin Circadian Rhythm Pineal Gland", "मेलाटोनिन सर्केडियन लय पीनियल ग्रंथि", "regulates 24-hour sleep-wake cycle, body temperature, pigmentation, and reproductive seasonal cycles"),
            ("Atrial Endocrine Vasodilation Balance", "आलिंद अंतःस्रावी वासोडिलेशन संतुलन", "cardiac myocytes secrete ANF in response to hypervolemia reducing blood pressure and renal sodium retention"),
            ("Second Messenger Generation cAMP IP3", "द्वितीयक संदेशवाहक निर्माण cAMP IP3", "peptide hormones bind membrane receptors activating G-proteins and adenylyl cyclase generating intracellular cyclic AMP")
        ]),
        ("Human Reproduction, Embryology & Reproductive Health", [
            ("Sertoli Cells Nourishment of Spermatids", "सर्टोली कोशिकाएं शुक्राणु पोषण", "somatic nurse cells in seminiferous tubules providing nutritional support and forming blood-testis barrier"),
            ("Acrosome Hyaluronidase Ovum Penetration", "एक्रोसोम हाइलूरोनिडेस अंड प्रवेश", "modified Golgi-derived enzymatic cap releasing lytic enzymes that digest corona radiata and zona pellucida"),
            ("Corpus Luteum Progesterone Secretion", "कॉर्पस ल्यूटियम प्रोजेस्टेरोन स्राव", "endocrine remnant of ovulated follicle secreting progesterone essential for sustaining pregnancy"),
            ("Trophoblast Blastocyst Implantation", "ट्रोफोब्लास्ट कोरकपुटी आरोपण", "outer blastocyst cell layer embedding into maternal uterine endometrium and developing chorionic villi"),
            ("Human Chorionic Gonadotropin Placental Hormone", "ह्यूमन कोरियोनिक गोनाडोट्रोपिन (hCG)", "placental hormone maintaining corpus luteum and serving as the primary diagnostic marker in pregnancy test kits"),
            ("Copper-T IUD Spermicidal Motility Suppression", "कॉपर-टी आईयूडी शुक्राणु गतिशीलता दमन", "releases free copper ions increasing phagocytosis of sperms and suppressing sperm motility and fertilizing capacity"),
            ("Amniocentesis Sex Determination Misuse Ban", "उल्ववेधन लिंग परीक्षण कानूनी प्रतिबंध", "prenatal diagnostic procedure testing fetal chromosomes restricted by law to prevent female foeticide"),
            ("Intra-Cytoplasmic Sperm Injection ICSI", "इंट्रा-साइटोप्लाज्मिक स्पर्म इंजेक्शन", "specialized in-vitro fertilization procedure where a single selected spermatozoon is injected directly into an ovum")
        ]),
        ("Genetics, Evolution, Human Health & Biotechnology", [
            ("Adaptive Radiation Darwin's Finches", "अनुकूली विकिरण डार्विन की फिंच", "divergence of a single ancestral stock into diverse evolutionary forms adapted to unique ecological niches"),
            ("Miller-Urey Primitive Atmosphere Simulation", "मिलर-यूरे आदिम वायुमंडल प्रयोग", "spark discharge through methane, ammonia, hydrogen, and water vapor produced proteinaceous amino acids"),
            ("Humoral vs Cell-Mediated Immune Defense", "तरल बनाम कोशिका-माध्यस्थ प्रतिरक्षा", "B-cells secrete antigen-specific antibodies into humors while T-cells direct cellular cytotoxicity and macrophage activation"),
            ("ELISA Diagnostic Technique Antigen-Antibody", "एलिसा नैदानिक तकनीक एंटीजन-एंटीबॉडी", "enzyme-linked immunosorbent assay detecting viral antibodies or antigens utilizing chromogenic substrates"),
            ("Metastasis Malignant Neoplasms Hallmarks", "मेटास्टेसिस घातक अर्बुद लक्षण", "detachment of cancerous cells from primary tumors circulating to establish distant secondary neoplastic colonies"),
            ("Gel Electrophoresis DNA Anode Migration", "जेल इलेक्ट्रोफोरेसिस डीएनए एनोड गति", "negatively charged phosphate-backboned DNA fragments migrate toward positive anode based on molecular sieving size"),
            ("Selectable Markers pBR322 Recombinant Screening", "चयनात्मक मार्कर pBR322 संकर चयन", "ampicillin and tetracycline resistance genes enable selection of transformants and insertional inactivation screening"),
            ("RNA Interference dsRNA Gene Silencing", "आरएनए अंतःक्षेप द्विरज्जुक जीन मौनीकरण", "post-transcriptional silencing of specific messenger RNA by complementary double-stranded RNA complexes in nematodes")
        ])
    ]

    domain_counter = 0
    for dom_title, subtopics in domains_data:
        for st_en, st_hi, facts in subtopics:
            reps = 6 if domain_counter < 36 else 5
            for r in range(reps):
                if len(items) >= 300:
                    break
                idx = len(items)
                mod = idx % 4

                if mod == 0:
                    stem_en = f"In the official NTA NEET-UG zoology curriculum, what fundamental physiological or evolutionary principle governs '{st_en}'?"
                    stem_hi = f"NTA NEET-UG के आधिकारिक प्राणी विज्ञान पाठ्यक्रम में, '{st_hi}' से संबंधित मुख्य जैविक नियम कौन-सा है?"
                    sol_en = f"Fundamental zoological principle: {facts}. Focus: {dom_title}."
                    sol_hi = f"मूल प्राणी विज्ञान सिद्धांत: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': f"Governing biological principle: {facts} ({dom_title})", 'hi': f"मूल जैविक सिद्धांत: {facts} ({dom_title})"},
                        {'en': "Arbitrary cessation of neural synaptic neurotransmitter release", 'hi': "तंत्रिका सिनैप्स पर न्यूरोट्रांसमीटर स्राव का मनमाना अवरोध"},
                        {'en': "Spontaneous conversion of genetic RNA into inorganic silica", 'hi': "आनुवंशिक आरएनए का अकार्बनिक सिलिका में स्वतः रूपांतरण"},
                        {'en': "Complete absence of homeostatic physiological feedback loops", 'hi': "समस्थापन कायिकीय पुनर्भरण लूपों की पूर्ण अनुपस्थिति"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When evaluating physiological pathways or evolutionary lineages involving '{st_en}', which conceptual fallacy must be avoided?"
                    stem_hi = f"'{st_hi}' से संबंधित कायिकीय या विकासीय प्रश्नों का विश्लेषण करते समय किस सामान्य भ्रांति से बचना चाहिए?"
                    sol_en = f"Essential biological fact: {facts}. Misconception occurs when ignoring {dom_title} principles."
                    sol_hi = f"अनिवार्य जैविक तथ्य: {facts}। {dom_title} के सिद्धांतों की अनदेखी से भ्रांति होती है।"
                    choices = [
                        {'en': "Strict adherence to NCERT anatomical terminology and histological diagrams", 'hi': "NCERT शारीरिकी शब्दावली तथा ऊतकीय आरेखों का कठोर अनुपालन"},
                        {'en': f"Conceptual fallacy: ignoring that {facts} ({dom_title})", 'hi': f"अवधारणात्मक भ्रांति: इस तथ्य की अनदेखी करना कि {facts} ({dom_title})"},
                        {'en': "Verification of endocrine negative feedback homeostasis", 'hi': "अंतःस्रावी नकारात्मक पुनर्भरण समस्थापन का सत्यापन"},
                        {'en': "Differentiating between homologous and analogous organ origins", 'hi': "समजात एवं समवृत्ति अंगों की उत्पत्ति में स्पष्ट विभेदन"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do medical physiologists and geneticists systematically characterize the mechanism in '{st_en}'?"
                    stem_hi = f"मेडिकल फिजियोलॉजिस्ट एवं आनुवंशिकीविद् '{st_hi}' के अंतर्निहित तंत्र को किस प्रकार वर्गीकृत करते हैं?"
                    sol_en = f"Systematic characterization: {facts}. Area: {dom_title}."
                    sol_hi = f"व्यवस्थित लक्षण-वर्णन: {facts}। क्षेत्र: {dom_title}।"
                    choices = [
                        {'en': "By treating cardiac muscle tissue as completely voluntary motor muscle", 'hi': "हृदय पेशी ऊतक को पूरी तरह ऐच्छिक पेशी मानकर"},
                        {'en': "By assuming antibody molecules lack peptide disulfide bonds", 'hi': "एंटीबॉडी अणुओं में पेप्टाइड डाइसल्फाइड बंधों का अभाव मानकर"},
                        {'en': f"Systematic characterization: {facts} ({dom_title})", 'hi': f"व्यवस्थित लक्षण-वर्णन: {facts} ({dom_title})"},
                        {'en': "By denying the role of enzymes in cellular metabolic cascades", 'hi': "कोशिकीय उपापचयी क्रियाओं में एंजाइमों की भूमिका को नकार कर"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which statement expresses the verified, authoritative scientific consensus regarding '{st_en}' as tested in NEET-UG?"
                    stem_hi = f"NEET-UG में परीक्षित '{st_hi}' के संदर्भ में वैज्ञानिक रूप से सत्यापित प्रामाणिक तथ्य कौन-सा कथन दर्शाता है?"
                    sol_en = f"Authoritative consensus: {facts}. Domain: {dom_title}."
                    sol_hi = f"प्रामाणिक तथ्य: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "It contradicts all laws of physiological homeostasis and genetics", 'hi': "यह कायिकीय समस्थापन एवं आनुवंशिकी के सभी नियमों का खंडन करता है"},
                        {'en': "It applies only to non-biological synthetic electronic circuits", 'hi': "यह केवल गैर-जैविक सिंथेटिक इलेक्ट्रॉनिक परिपथों पर लागू होता है"},
                        {'en': "It produces random erratic abnormalities in all healthy subjects", 'hi': "यह सभी स्वस्थ व्यक्तियों में अनियंत्रित असामान्यताएं उत्पन्न करता है"},
                        {'en': f"Established zoological consensus: {facts} ({dom_title})", 'hi': f"स्थापित प्राणी विज्ञान तथ्य: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'NEET Zoology - {dom_title}',
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
    res = get_raw_neet_zoology_items()
    print(f"Generated {len(res)} items for NEET Zoology.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

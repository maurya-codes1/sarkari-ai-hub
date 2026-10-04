import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling HPBOSE Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-hp-c10-science-tech-guide",
        "subject_id": "hp-c10-science-en",
        "language_id": "en",
        "note_type": "FULL_NOTES",
        "title": "HPBOSE Class 10 Science & Technology Comprehensive Board Preparation Guide (Physics, Chemistry, Biology & Practical Work)",
        "summary": "Master curriculum revision compendium for HPBOSE Class 10 Matriculation Science & Technology covering Chemical Reactions, Acids/Bases/Salts, Metals and Non-metals, Carbon Compounds, Life Processes, Control & Coordination, Heredity, Optics, Electricity, Magnetic Effects, and 25-Marks Practical Laboratory Assessment.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_HPBOSE_MATRIC_SYLLABUS_DERIVED",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# HPBOSE Matriculation Examination (Class 10) Science & Technology Master Guide

## 1. Chemistry (रसायन विज्ञान)
- **Chemical Reactions and Equations:**
  - Types: Combination, Decomposition (thermal, electrolytic, photolytic), Displacement, Double Displacement (Precipitation), Redox (Oxidation and Reduction).
  - Practical observation: Burning of Magnesium ribbon in air ($2Mg + O_2 \\rightarrow 2MgO$), heating ferrous sulphate crystals ($2FeSO_4 \\xrightarrow{\\Delta} Fe_2O_3 + SO_2 + SO_3$).
- **Acids, Bases and Salts:**
  - Indicator reactions (litmus, phenolphthalein, methyl orange). pH Scale ($0-14$): $pH = -\\log_{10}[H^+]$.
  - Salts: Bleaching powder ($CaOCl_2$), Baking soda ($NaHCO_3$), Washing soda ($Na_2CO_3 \\cdot 10H_2O$), Plaster of Paris ($CaSO_4 \\cdot \\frac{1}{2}H_2O$).
- **Metals and Non-metals:**
  - Reactivity Series: $K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au$.
  - Metallurgy: Roasting (sulfide ores in presence of oxygen) vs Calcination (carbonate ores in absence/limited air), Thermit reaction ($Fe_2O_3 + 2Al \\rightarrow 2Fe + Al_2O_3 + \\text{Heat}$).
- **Carbon and its Compounds:**
  - Covalent bonding, catenation, tetravalency, homologous series ($C_n H_{2n+2}, C_n H_{2n}, C_n H_{2n-2}$).
  - Saponification and Micelle formation for soap cleansing action.

## 2. Biology (जीव विज्ञान)
- **Life Processes:**
  - Nutrition: Photosynthesis ($6CO_2 + 12H_2O \\xrightarrow{\\text{Sunlight/Chlorophyll}} C_6H_{12}O_6 + 6O_2 + 6H_2O$) and heterotrophic modes.
  - Respiration: Aerobic (mitochondria, 38 ATP) vs Anaerobic (cytoplasm, lactic acid in muscles / ethanol in yeast).
  - Transportation: Human 4-chambered heart, double circulation (systemic and pulmonary), xylem (tracheids & vessels) vs phloem (sieve tubes & companion cells).
  - Excretion: Human nephron structure (Bowman's capsule, glomerulus, loop of Henle, collecting duct).
- **Control and Coordination:**
  - Reflex arc (receptor $\\rightarrow$ sensory neuron $\\rightarrow$ spinal cord $\\rightarrow$ motor neuron $\\rightarrow$ effector).
  - Plant hormones: Auxins, Gibberellins, Cytokinins, Abscisic acid (stress hormone). Endocrine glands: Pituitary, Thyroid (Thyroxine), Adrenal (Adrenaline), Pancreas (Insulin).
- **Reproduction and Heredity:**
  - Mendel's Monohybrid Cross ($3:1$ phenotypic ratio, $1:2:1$ genotypic ratio), Dihybrid Cross ($9:3:3:1$).
  - Sex determination in humans ($XX$ female, $XY$ male).

## 3. Physics (भौतिक विज्ञान)
- **Optics (Reflection and Refraction):**
  - Mirror Formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$. Lens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$.
  - Snell's Law: $\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1}$. Power of a lens: $P = \\frac{1}{f \\text{ (in metres)}}$ (Dioptre, D).
- **Electricity and Magnetism:**
  - Ohm's Law: $V = IR$. Resistance combination: Series ($R_s = R_1 + R_2 + R_3$) and Parallel ($\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$).
  - Joule's Law of Heating: $H = I^2 R t$. Electric Power: $P = VI = I^2 R = \\frac{V^2}{R}$.
  - Magnetic effect: Right-Hand Thumb Rule, Fleming's Left-Hand Rule (Electric Motor), Domestic electric circuits (Live, Neutral, Earth wires with earthing safety)."""
    },
    {
        "note_id": "note-hp-c10-math-social-guide",
        "subject_id": "hp-c10-mathematics-hi",
        "language_id": "hi",
        "note_type": "FULL_NOTES",
        "title": "HPBOSE Class 10 Mathematics & Social Science Master Guide (Real Numbers, Geometry, History of Himachal Hill States, Satluj/Beas Basins, Disaster Management in Zone V)",
        "summary": "High-yield preparation guide for HPBOSE Class 10 Matriculation Mathematics (Euclid Division, Quadratic Equations, Similar Triangles, Trigonometry, Statistics) and Social Science (Nationalism, Integration of Himachal Hill States, Dhami Firing, Suket Satyagraha, Himalayan Geography, Cloudburst and Earthquake Zone V Mitigation).",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_HPBOSE_MATRIC_SYLLABUS_DERIVED",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# हिमाचल प्रदेश स्कूल शिक्षा बोर्ड (HPBOSE) - कक्षा १०वीं गणित एवं सामाजिक विज्ञान मुख्य मार्गदर्शिका

## १. गणित (Mathematics)
- **वास्तविक संख्याएँ एवं बहुपद:**
  - यूक्लिड विभाजन प्रमेयिका: $a = bq + r$, जहाँ $0 \\le r < b$।
  - अंकगणित की आधारभूत प्रमेय: प्रत्येक भाज्य संख्या को अभाज्य संख्याओं के गुणनफल के रूप में अद्वितीय रूप से व्यक्त किया जा सकता है। $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$।
  - द्विघात बहुपद $ax^2 + bx + c$ के शून्यक $\\alpha, \\beta$: $\\alpha + \\beta = -\\frac{b}{a}$, $\\alpha\\beta = \\frac{c}{a}$।
- **द्विघात समीकरण एवं समांतर श्रेढ़ियाँ:**
  - द्विघाती सूत्र (श्रीधराचार्य सूत्र): $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$। विविक्तकर $D = b^2 - 4ac$ ($D > 0$ दो भिन्न वास्तविक मूल, $D = 0$ दो बराबर वास्तविक मूल, $D < 0$ कोई वास्तविक मूल नहीं)।
  - समांतर श्रेढ़ी का $n$-वाँ पद: $a_n = a + (n-1)d$। प्रथम $n$ पदों का योग: $S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)$।
- **त्रिभुज एवं निर्देशांक ज्यामिति:**
  - थेल्स प्रमेय (आधारभूत आनुपातिकता प्रमेय): यदि किसी त्रिभुज की एक भुजा के समांतर अन्य दो भुजाओं को काटते हुए कोई रेखा खींची जाए, तो वह उन भुजाओं को समान अनुपात में विभाजित करती है।
  - दूरी सूत्र: $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$। विभाजन सूत्र: $(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2})$।
- **त्रिकोणमिति एवं सांख्यिकी:**
  - सर्वसमिकाएँ: $\\sin^2 \\theta + \\cos^2 \\theta = 1$, $1 + \\tan^2 \\theta = \\sec^2 \\theta$, $1 + \\cot^2 \\theta = \\operatorname{cosec}^2 \\theta$।
  - आनुभविक संबंध: $3 \\times \\text{माध्यक} = \\text{बहुलक} + 2 \\times \\text{माध्य}$ ($3M = Z + 2\\bar{x}$)।

## २. सामाजिक विज्ञान: हिमाचल प्रदेश का इतिहास, भूगोल एवं आपदा प्रबंधन
- **हिमाचल प्रदेश का ऐतिहासिक परिप्रेक्ष्य:**
  - पहाड़ी रियासतों का संगठन: कांगड़ा, मंडी, सुकेत, बिलासपुर, चंबा, बुशहर, सिरमौर आदि ३० पहाड़ी रियासतों को मिलाकर १५ अप्रैल १९४८ को मुख्य आयुक्त प्रांत के रूप में हिमाचल प्रदेश का गठन।
  - प्रमुख जन-आंदोलन: धामी गोलीकांड (१६ जुलाई १९३९ - भागमल सौहटा का नेतृत्व), पझौता आंदोलन (१९४२ - किसान आंदोलन), सुकेत सत्याग्रह (फरवरी १९४८ - पंडित पदम देव का नेतृत्व)।
  - पूर्ण राज्यत्व: २५ जनवरी १९७१ को भारत का १८वाँ पूर्ण राज्य बना, प्रथम मुख्यमंत्री डॉ. यशवंत सिंह परमार ('हिमाचल निर्माता')।
- **हिमाचल प्रदेश का भूगोल एवं जल संसाधन:**
  - पर्वत श्रेणियाँ: शिवालिक (निम्न हिमालय / मानक पर्वत), धौलाधार (मध्य हिमालय / श्वेत पर्वत), पीर पंजाल एवं वृहद् हिमालय (जांस्कर श्रेणी)।
  - नदी तंत्र: सतलुज (मानसरोवर से उद्गम), व्यास (रोहतांग दर्रा/व्यास कुंड), रावी (बड़ा बंगाल), चिनाब (चंद्र-भागा संगम तांडी), यमुना (यमुनोत्री से उद्गमित होकर सिरमौर में प्रवेश)।
  - आर्थिकी: भाखड़ा-नांगल, नाथपा झाकड़ी, कोलडैम एवं पार्वती जलविद्युत परियोजनाएँ; कोटगढ़, रामपुर, कुल्लू, शिमला की प्रसिद्ध सेब बागवानी।
- **हिमाचल प्रदेश में आपदा प्रबंधन:**
  - उच्च भूकंपीय संवेदनशीलता: कांगड़ा एवं चंबा क्षेत्र भूकंपीय क्षेत्र V (Seismic Zone V) में तथा शेष क्षेत्र Zone IV में स्थित हैं। (१९०५ का विनाशकारी कांगड़ा भूकंप)।
  - बादल फटना (Cloudburst), आकस्मिक बाढ़ (Flash Floods), भूस्खलन (Landslides) एवं हिमस्खलन (Avalanche) से बचाव एवं राज्य आपदा प्रतिक्रिया बल (SDRF) की भूमिका।"""
    },
    {
        "note_id": "note-hp-c10-c12-languages-sanskrit-guide",
        "subject_id": "hp-c10-sanskrit",
        "language_id": "sa",
        "note_type": "FULL_NOTES",
        "title": "HPBOSE Languages & Classical Sanskrit Compendium (शेमुषी एवं भास्वती संस्कृत, क्षितिज/आरोह हिन्दी, English Flamingo & Vistas)",
        "summary": "Exhaustive literary and grammatical guide for HPBOSE Matriculation and Higher Secondary Sanskrit (शेमुषी भाग-२ एवं भास्वती भाग-२), Hindi (क्षितिज, कृतिका, आरोह, वितान), and English covering classical shlokas, grammar rules, sandhi, samasa, and comprehension.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_HPBOSE_LANGUAGE_CURRICULUM",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# हिमाचल प्रदेश स्कूल शिक्षा बोर्ड (HPBOSE) - संस्कृत, हिन्दी एवं आंग्ल-साहित्य मुख्य संकलन

## १. संस्कृत-साहित्यम् एवं व्याकरणम् (शेमुषी एवं भास्वती - १०वीं व १२वीं)
- **प्रमुख पाठाः सूक्तयश्च:**
  - **शुचिपर्यावरणम्:** 'दुर् Name अत्र जीवितं जातं प्रकृतिरेव शरणम्। शुचिपर्यावरणम्' - पर्यावरणसंरक्षणस्य सार्वकालिकं महत्त्वम्।
  - **बुद्धिर्बलवती सदा:** बुद्धेः चातुर्येण व्याघ्रभयात् मुक्तिः। 'बुद्धिर्बलवती तन्वि सर्वकार्येषु सर्वदा'।
  - **सुभाषितानि:** 'आलस्यं हि मनुष्याणां शरीरस्थो महान् रिपुः। नास्त्युद्यमसमो बन्धुः कृत्वा यं नावसीदति'॥
  - **अनुशासनम् (तैत्तिरीयोपनिषद् - १२वीं):** 'सत्यं वद। धर्मं चर। स्वाध्यायान्मा प्रमदः। मातृदेवो भव। पितृदेवो भव। आचार्यदेवो भव'।
- **संस्कृत-व्याकरण-नियमाः:**
  - **सन्धिः:** स्वरसन्धिः (दीर्घ, गुण, वृद्धि, यण्, अयादि), व्यञ्जनसन्धिः (जश्त्व, श्चुत्व, अनुस्वार), विसर्गसन्धिः (उत्व, रत्व, लोप)।
  - **समासः:** तत्पुरुष (विभक्ति-तत्पुरुष), कर्मधारय (विशेषण-विशेष्य), द्विगु (संख्यापूर्व), द्वन्द्व (उभयपदप्रधान), बहुव्रीहि (अन्यपदप्रधान)।
  - **प्रत्ययाः:** क्त्वा, ल्यप्, तुमुन्, क्त, क्तवतु, शतृ, शानच्, तव्यत्, अनीयर्, मतुप्, तल्, त्व।
  - **कारकम्:** कर्तृ (प्रथमा), कर्म (द्वितीया), करण (तृतीया - सह, साकम्), सम्प्रदान (चतुर्थी - नमः, स्वस्ति, दा), अपादान (पञ्चमी - पृथक्, भिया), अधिकरण (सप्तमी)।

## २. हिन्दी साहित्य एवं व्याकरण (क्षितिज, कृतिका, आरोह, वितान)
- **काव्य धारा:**
  - सूरदास (भ्रमरगीत - निर्गुण पर सगुण भक्ति की विजय), तुलसीदास (रामचरितमानस बालकांड - लक्ष्मण-परशुराम संवाद), जयशंकर प्रसाद (आत्मकथ्य - छायावादी भावुकता), सूर्यकांत त्रिपाठी निराला (उत्साह एवं अट नहीं रही है - ओज एवं प्रकृति), हरिवंश राय बच्चन (आत्मपरिचय), महादेवी वर्मा (भक्तिन - नारी संघर्ष)।
- **गद्य विधाएँ:**
  - कहानी (प्रेमचंद, स्वयं प्रकाश), संस्मरण (महादेवी वर्मा, शिवपूजन सहाय), व्यंग्य (हरिशंकर परसाई, यशपाल), यात्रा-वृत्तांत (मधु कांकरिया - साना-साना हाथ जोड़ि)।
  - व्याकरण: रचना के आधार पर वाक्य भेद (सरल, संयुक्त, मिश्र), वाच्य (कर्तृ, कर्म, भाव), पद-परिचय, रस (शृंगार, हास्य, करुण, वीर, रौद्र, भयानक, वीभत्स, अद्भुत, शांत)।

## ३. English Literature (Flamingo & Vistas)
- **Key Themes:** Freedom and linguistic pride (*The Last Lesson*), child labour and lost childhood (*Lost Spring*), overcoming fear (*Deep Water*), human goodness and redemption (*The Rattrap*), Gandhian leadership (*Indigo*), art and beauty (*A Thing of Beauty* by John Keats)."""
    },
    {
        "note_id": "note-hp-c12-physics-chemistry-guide",
        "subject_id": "hp-c12-physics",
        "language_id": "en",
        "note_type": "FULL_NOTES",
        "title": "HPBOSE Class 12 Higher Secondary Physics & Chemistry Master Guide (Electrostatics, Optics, Kinetics, Coordination Compounds, 25-Marks Practical Scheme)",
        "summary": "Higher Secondary (+2) comprehensive preparation compendium for Physics (Coulomb's Law, Gauss Theorem, Biot-Savart, Optics, Semiconductor Devices) and Chemistry (Solutions, Electrochemistry, Chemical Kinetics, Coordination Compounds, Organic Name Reactions) aligned with HPBOSE 60 Theory + 25 Practical + 15 IA Scheme.",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_HPBOSE_PLUS2_SYLLABUS_DERIVED",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# HPBOSE Higher Secondary (+2) Physics & Chemistry Master Guide

## 1. Physics (60 Theory + 25 Practical + 15 IA Scheme)
- **Electrostatics & Capacitance:**
  - Coulomb's Law: $F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}$. Gauss's Law: $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$.
  - Capacitance: Parallel plate capacitor $C = \\frac{\\varepsilon_0 A}{d}$, with dielectric slab $C = \\frac{K\\varepsilon_0 A}{d}$. Energy stored $U = \\frac{1}{2}CV^2$.
- **Current Electricity & Magnetism:**
  - Drift velocity $v_d = \\frac{eE\\tau}{m}$, Current $I = n e A v_d$.
  - Kirchhoff's Rules: Current Law ($\\sum I = 0$, charge conservation) and Voltage Law ($\\sum \\Delta V = 0$, energy conservation). Wheatstone Bridge balance condition: $\\frac{P}{Q} = \\frac{R}{S}$.
  - Biot-Savart Law: $d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\hat{r}}{r^2}$. Ampere's Law: $\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I$.
- **Optics and Modern Physics:**
  - Lens Maker's Formula: $\\frac{1}{f} = (\\mu - 1) \\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)$.
  - Young's Double Slit Experiment: Fringe width $\\beta = \\frac{\\lambda D}{d}$.
  - Einstein's Photoelectric Equation: $K_{\\max} = h\\nu - h\\nu_0 = eV_0$. de Broglie wavelength: $\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mqV}}$.
  - Semiconductors: Forward bias and reverse bias p-n junction diode characteristics, full-wave rectifier circuit with filter.

## 2. Chemistry (60 Theory + 25 Practical + 15 IA Scheme)
- **Solutions & Electrochemistry:**
  - Raoult's Law: $P_A = P_A^0 x_A$. Colligative properties: $\\Delta T_b = K_b m$, $\\Delta T_f = K_f m$, $\\pi = iCRT$.
  - Nernst Equation: $E_{\\text{cell}} = E^0_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10} Q$. Kohlrausch's Law of independent migration of ions.
- **Chemical Kinetics & Coordination Compounds:**
  - First-order integrated rate law: $k = \\frac{2.303}{t} \\log_{10} \\left( \\frac{[R]_0}{[R]} \\right)$, Half-life $t_{1/2} = \\frac{0.693}{k}$.
  - Coordination Chemistry: Werner's Theory (primary ionizable vs secondary non-ionizable valencies), Crystal Field Splitting in octahedral ($\\Delta_o$) and tetrahedral ($\\Delta_t$) complexes.
- **Organic Chemistry Name Reactions:**
  - Aldol Condensation, Cannizzaro Reaction, Reimer-Tiemann Reaction, Kolbe's Reaction, Williamson's Ether Synthesis, Hoffmann Bromamide Degradation."""
    },
    {
        "note_id": "note-hp-c12-biology-commerce-humanities-guide",
        "subject_id": "hp-c12-biology",
        "language_id": "en",
        "note_type": "FULL_NOTES",
        "title": "HPBOSE Class 12 Biology, Commerce & Humanities Master Compendium (Genetics, Accountancy, Economics, Themes in Indian History, Himachal Geography & Administration)",
        "summary": "Multi-stream master compendium for HPBOSE Higher Secondary (+2) covering Biology (Genetics, Molecular Biology, Biotechnology), Commerce (Partnership Reconstitution, Corporate Balance Sheet, Macroeconomic Aggregates, Banking), and Humanities (Harappa, Mughal History, Indian Constitution, Public Administration, and Himachal Pradesh Hill Economy).",
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_HPBOSE_PLUS2_SYLLABUS_DERIVED",
        "priority_tier": "HIGH_PRIORITY",
        "verification_status": "VERIFIED",
        "version": 1,
        "content": """# HPBOSE Higher Secondary (+2) Multi-Stream Master Compendium

## 1. Biology (Medical Science Stream)
- **Genetics & Molecular Basis:**
  - Hershey-Chase experiment proving DNA as genetic material. Meselson-Stahl experiment confirming semiconservative replication.
  - Genetic Code characteristics: Triplet, degenerate, unambiguous, non-overlapping, universal. Lac Operon (Jacob & Monod).
- **Biotechnology:**
  - Tools of rDNA: Restriction endonucleases (sticky ends), DNA ligase, cloning vectors (pBR322), PCR technique (Denaturation $94^\\circ C$, Annealing $54^\\circ C$, Extension $72^\\circ C$).
  - Applications: Humulin (Eli Lilly), Bt Cotton (*Bacillus thuringiensis* Cry toxins), Gene therapy for ADA deficiency.

## 2. Commerce Stream: Accountancy, Business Studies & Economics
- **Accountancy:**
  - Admission of Partner: Sacrificing Ratio = Old Ratio - New Ratio. Revaluation Account rules.
  - Company Accounts: Forfeiture of shares: Share Capital A/c Dr. (Called-up amount) to Share Forfeited A/c (Paid amount) to Calls-in-Arrears A/c.
  - Cash Flow Statement (AS-3): Cash flows classified into Operating, Investing, and Financing activities.
- **Economics & Business Studies:**
  - Macroeconomics: National Income computation methods (Value Added, Income, Expenditure).
  - Central Banking: Quantitative credit control (Repo rate, Reverse repo, CRR, SLR) vs Qualitative tools.
  - Planning and Organising: Functional vs Divisional organizational structure, Delegation elements (Authority, Responsibility, Accountability).

## 3. Arts / Humanities Stream: History, Political Science & Public Administration
- **Themes in Indian History:**
  - Harappan Urban Planning: Mohenjo-daro Great Bath, Citadel, drainage systems, weights and measures.
  - Integration of Himachal Pradesh: Praja Mandal agitations, Suket Satyagraha, Dhami incident, and transition from Chief Commissioner's province to full Statehood under Dr. Y.S. Parmar.
- **Political Science & Public Administration:**
  - Indian Constitutional Framework: Fundamental Rights (Articles 14-32), Directive Principles of State Policy, Federal structure.
  - Principles of Administration: Hierarchy, Span of Control, Unity of Command, Delegation.
  - District Administration in HP: Role of Deputy Commissioner, District Collector, District Magistrate, and District Revenue Administration."""
    }
]

out_file = os.path.join(os.path.dirname(__file__), "hp_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"✅ Compiled {len(NOTES)} master bundled study notes into {out_file}")

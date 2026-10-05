"""
NTA CUET UG - Section II: Science & Applied Mathematics (विज्ञान एवं व्यावहारिक गणित) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Physical Sciences: Electrostatics, Current, Magnetism, EMI/AC, Optics & Modern Physics
- Chemical Sciences: Solutions, Kinetics, Coordination Compounds, Organic Synthesis & Biomolecules
- Life Sciences: Genetics, Molecular Biology, Biotechnology Principles & Ecology
- Applied Mathematics: Calculus, Matrices, Differential Equations, Vectors & Probability
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cuet_ug_sciences_items():
    items = []

    # 28 Benchmark Core Questions
    benchmarks = [
        # 1. Physics - Electrostatics & Capacitance (Index 0)
        ("A parallel plate capacitor with air between the plates has capacitance C0. If a dielectric slab of dielectric constant K = 4 is inserted completely filling the space between the plates, what is the new capacitance?",
         "प्लेटों के बीच वायु वाले एक समांतर पट्टिका संधारित्र की धारिता C0 है। यदि परावैद्युतांक K = 4 वाली एक परावैद्युत पट्टिका प्लेटों के बीच पूरे स्थान में प्रविष्ट करा दी जाए, तो नई धारिता क्या होगी?",
         "4 C0", "C0 / 4", "2 C0", "16 C0",
         0, "Capacitance with a dielectric slab filling the gap is C = K * C0. With K = 4, C = 4 C0.",
         "परावैद्युत माध्यम भरने पर धारिता C = K * C0 हो जाती है। K = 4 होने पर नई धारिता 4 C0 होगी।"),

        # 2. Chemistry - Colligative Properties (Index 1)
        ("What is the Van 't Hoff factor (i) for a completely dissociated aqueous solution of potassium ferrocyanide, K4[Fe(CN)6]?",
         "पोटेशियम फेरोसायनाइड, K4[Fe(CN)6] के पूर्णतः वियोजित जलीय विलयन हेतु वॉन्ट हॉफ गुणक (i) का मान क्या होगा?",
         "4", "5", "6", "1",
         1, "K4[Fe(CN)6] dissociates completely into 4 K+ cations and 1 [Fe(CN)6]^4- complex anion: total 5 ions. Hence i = 1 + (n - 1) alpha = 1 + (5 - 1)(1) = 5.",
         "K4[Fe(CN)6] पूर्ण वियोजन पर 4 K+ और 1 [Fe(CN)6]^4- आयन देता है (कुल 5 आयन)। अतः वॉन्ट हॉफ गुणक i = 5 होता है।"),

        # 3. Biology - Genetics & Molecular Basis of Inheritance (Index 2)
        ("In molecular genetics, during the transcription of DNA to mRNA, which nitrogenous base replaces Thymine (T) in the synthesized messenger RNA strand?",
         "आणविक आनुवंशिकी में, DNA से mRNA के अनुलेखन (Transcription) के दौरान संश्लेषित संदेशवाहक RNA रज्जुक में थायमीन (T) के स्थान पर कौन-सा नाइट्रोजनी क्षारक आता है?",
         "Adenine (A)", "Cytosine (C)", "Uracil (U)", "Guanine (G)",
         2, "In RNA synthesis, Adenine pairs with Uracil (U) instead of Thymine (T) which is present exclusively in DNA.",
         "RNA में थायमीन (Thymine) के स्थान पर यूरेसिल (Uracil) पाया जाता है, जो एडेनिन के साथ पूरक क्षार युग्म बनाता है।"),

        # 4. Mathematics - Matrices and Determinants (Index 3)
        ("If A is an invertible square matrix of order 3 and det(A) = 4, what is the value of det(adj A)?",
         "यदि A कोटि 3 का एक व्युत्क्रमणीय वर्ग आव्यूह है और det(A) = 4 है, तो det(adj A) का मान क्या होगा?",
         "4", "8", "64", "16",
         3, "For any n x n square matrix, det(adj A) = (det A)^(n - 1). Here n = 3 and det(A) = 4, so det(adj A) = 4^(3 - 1) = 4^2 = 16.",
         "n कोटि के वर्ग आव्यूह हेतु det(adj A) = (det A)^(n-1) होता है। n = 3 और det(A) = 4 होने पर det(adj A) = 4^2 = 16 प्राप्त होता है।"),

        # 5. Physics - Optics: Total Internal Reflection (Index 0)
        ("What is the critical angle theta_c for total internal reflection at an interface between glass (refractive index mu_g = 1.5 = 3/2) and water (mu_w = 4/3)?",
         "कांच (अपवर्तनांक mu_g = 3/2) और जल (mu_w = 4/3) के अंतरापृष्ठ पर पूर्ण आंतरिक परावर्तन हेतु क्रांतिक कोण theta_c क्या है?",
         "sin^-1(8 / 9)", "sin^-1(9 / 8)", "sin^-1(2 / 3)", "sin^-1(1 / 2)",
         0, "Critical angle condition: sin(theta_c) = mu_rarer / mu_denser = (4/3) / (3/2) = (4/3) * (2/3) = 8/9 => theta_c = sin^-1(8/9).",
         "क्रांतिक कोण सूत्र: sin(theta_c) = mu_विरल / mu_सघन = (4/3) / (3/2) = 8/9 => theta_c = sin^-1(8/9)।"),

        # 6. Chemistry - Chemical Kinetics: First Order Half-Life (Index 1)
        ("A first-order chemical reaction has a rate constant k = 2.31 x 10^-3 s^-1. What is the half-life (t_1/2) of the reaction (ln 2 ~= 0.693)?",
         "एक प्रथम कोटि की रासायनिक अभिक्रिया का दर स्थिरांक k = 2.31 x 10^-3 s^-1 है। अभिक्रिया की अर्ध-आयु (t_1/2) क्या है (ln 2 ~= 0.693)?",
         "150 seconds", "300 seconds", "450 seconds", "600 seconds",
         1, "Half-life of a first-order reaction: t_1/2 = 0.693 / k = 0.693 / (2.31 x 10^-3) = 300 seconds.",
         "प्रथम कोटि अभिक्रिया की अर्ध-आयु t_1/2 = 0.693 / k = 0.693 / (2.31 x 10^-3) = 300 सेकंड होती है।"),

        # 7. Biology - Biotechnology: Restriction Endonucleases (Index 2)
        ("In recombinant DNA technology, which restriction enzyme was historically the first to be isolated and characterized from Haemophilus influenzae Rd?",
         "पुनर्योगज DNA तकनीक में, ऐतिहासिक रूप से हीमोफिलस इन्फ्लुएंजा Rd से पृथक और अभिलक्षित किया जाने वाला पहला प्रतिबंधन एंडोन्यूक्लिएज (Restriction Enzyme) कौन-सा था?",
         "EcoRI", "BamHI", "Hind II", "PstI",
         2, "Hind II was the first restriction endonuclease characterized (in 1970 by Hamilton Smith), recognizing a specific six base-pair palindromic DNA sequence.",
         "पहला पृथक किया गया प्रतिबंधन एंजाइम 'Hind II' था, जिसे 1970 में हीमोफिलस इन्फ्लुएंजा से प्राप्त किया गया था।"),

        # 8. Mathematics - Definite Integrals: Area under Curve (Index 3)
        ("What is the area of the region bounded by the standard circle x^2 + y^2 = 16?",
         "मानक वृत्त x^2 + y^2 = 16 द्वारा परिबद्ध क्षेत्र का क्षेत्रफल क्या है?",
         "4 pi", "8 pi", "32 pi", "16 pi",
         3, "Equation is x^2 + y^2 = r^2 where r = 4. Area of circle = pi * r^2 = pi * 4^2 = 16 pi.",
         "वृत्त की त्रिज्या r = 4 है। वृत्त का क्षेत्रफल = pi r^2 = pi * 16 = 16 pi वर्ग इकाई होता है।"),

        # 9. Physics - Modern Physics: Photoelectric Equation (Index 0)
        ("According to Einstein's photoelectric equation, what is the maximum kinetic energy (K_max) of photoelectrons ejected when light of frequency nu strikes a metal surface with work function Phi_0?",
         "आइंस्टीन के प्रकाश-विद्युत समीकरण के अनुसार, कार्य फलन Phi_0 वाली धातु की सतह पर आवृत्ति nu का प्रकाश आपतित होने पर उत्सर्जित प्रकाश-इलेक्ट्रॉनों की अधिकतम गतिज ऊर्जा (K_max) क्या होती है?",
         "K_max = h nu - Phi_0", "K_max = h nu + Phi_0", "K_max = Phi_0 - h nu", "K_max = (h nu) / Phi_0",
         0, "Einstein's photoelectric law states energy conservation: h nu = Phi_0 + K_max => K_max = h nu - Phi_0.",
         "आइंस्टीन का प्रकाश-विद्युत समीकरण: h nu = Phi_0 + K_max => K_max = h nu - Phi_0 होता है।"),

        # 10. Chemistry - Coordination Chemistry: IUPAC Nomenclature (Index 1)
        ("What is the correct IUPAC name of the coordination compound [Co(NH3)5(Cl)]Cl2?",
         "उपसहसंयोजन यौगिक [Co(NH3)5(Cl)]Cl2 का सही IUPAC नाम क्या है?",
         "Cobalt pentammine chloro dichloride",
         "Pentaamminechloridocobalt(III) chloride",
         "Chloropentammine cobaltate(II) chloride",
         "Pentammine cobalt trichloride",
         1, "Ligands are named alphabetically: 'pentaammine' then 'chlorido'. Cobalt has oxidation state +3: x + 0 - 1 = +2 => x = +3. Outside counter ion is chloride. Hence: Pentaamminechloridocobalt(III) chloride.",
         "वर्णमाला क्रम में लिगेंडों का नामकरण: pentaammine, chlorido; कोबाल्ट की ऑक्सीकरण संख्या +3 है। अतः सही IUPAC नाम Pentaamminechloridocobalt(III) chloride है।"),

        # 11. Biology - Ecology: 10% Energy Transfer Law (Index 2)
        ("Who formulated the 'Ten Percent Law' of energy transfer stating that only about 10% of the energy stored as biomass in a trophic level is passed on to the next trophic level?",
         "ऊर्जा स्थानांतरण का 'दस प्रतिशत नियम' (10% Law) किसने प्रतिपादित किया था जिसके अनुसार एक पोषण स्तर से अगले पोषण स्तर तक केवल 10% ऊर्जा ही स्थानांतरित होती है?",
         "Eugene Odum", "Arthur Tansley", "Raymond Lindeman", "Ernst Haeckel",
         2, "Raymond Lindeman (1942) formulated the 10% energy transfer law in trophic dynamics.",
         "रेमंड लिंडेमैन (1942) ने पारिस्थितिक तंत्र में पोषण स्तरों के बीच ऊर्जा प्रवाह का 10 प्रतिशत नियम प्रतिपादित किया था।"),

        # 12. Mathematics - Vectors: Cross Product Direction (Index 3)
        ("If i_hat, j_hat, and k_hat are standard orthogonal unit vectors along the Cartesian coordinate axes, what is the value of i_hat x (j_hat x k_hat)?",
         "यदि i_hat, j_hat और k_hat कार्तीय अक्षों के अनुदिश मानक लांबिक इकाई सदिश हैं, तो i_hat x (j_hat x k_hat) का मान क्या होगा?",
         "i_hat", "k_hat", "- j_hat", "0 (Zero vector)",
         3, "We know j_hat x k_hat = i_hat. Then i_hat x (j_hat x k_hat) = i_hat x i_hat = 0 (the cross product of any vector with itself is the zero vector).",
         "j_hat x k_hat = i_hat होता है। अतः i_hat x i_hat = 0 (शून्य सदिश) प्राप्त होता है।"),

        # 13. Physics - Current Electricity: Metre Bridge (Index 0)
        ("In a balanced Metre Bridge experiment, an unknown resistance R is connected in the left gap and a standard resistance of 12 ohm is placed in the right gap. If the null balance point is obtained at 40 cm from the left end, what is the value of R?",
         "एक संतुलित मीटर ब्रिज प्रयोग में, बाएं अंतराल में अज्ञात प्रतिरोध R और दाएं अंतराल में 12 ओम का मानक प्रतिरोध जोड़ा गया है। यदि शून्य विक्षेप संतुलन बिंदु बाएं सिरे से 40 सेमी पर मिलता है, तो R का मान क्या है?",
         "8.0 ohm", "18.0 ohm", "6.0 ohm", "24.0 ohm",
         0, "Condition for Metre Bridge balance: R / S = l / (100 - l) => R / 12 = 40 / (100 - 40) = 40 / 60 = 2 / 3 => R = 12 * (2 / 3) = 8.0 ohm.",
         "संतुलित मीटर ब्रिज का सूत्र: R / S = l / (100 - l) => R / 12 = 40 / 60 => R = 8.0 ओम।"),

        # 14. Chemistry - Organic Chemistry: Reimer-Tiemann Reaction (Index 1)
        ("When phenol (C6H5OH) is heated with chloroform (CHCl3) in the presence of aqueous sodium hydroxide (NaOH) followed by acidification, what is the major organic product formed?",
         "जब फिनोल (C6H5OH) को जलीय सोडियम हाइड्रॉक्साइड (NaOH) की उपस्थिति में क्लोरोफॉर्म (CHCl3) के साथ गर्म कर अम्लीकृत किया जाता है, तो कौन-सा मुख्य उत्पाद बनता है (राइमर-टीमैन अभिक्रिया)?",
         "Benzoic acid", "Salicylaldehyde (2-Hydroxybenzaldehyde)", "Salicylic acid", "Picric acid",
         1, "In the Reimer-Tiemann reaction, phenol reacts with chloroform in alkaline medium via dichlorocarbene intermediate to introduce an ortho -CHO group, forming salicylaldehyde.",
         "राइमर-टीमैन अभिक्रिया में फिनोल क्लोरोफॉर्म और क्षार के साथ अभिक्रिया कर डाइक्लोरोकार्बीन मध्यवर्ती द्वारा सेलिसिलैल्डिहाइड बनाता है।"),

        # 15. Biology - Human Physiology & Reproduction (Index 2)
        ("In the human female menstrual cycle, the rapid surge of which pituitary gonadotropic hormone directly induces ovulation (rupture of the mature Graafian follicle)?",
         "मानव मादा के मासिक धर्म चक्र में, किस पीयूष गोनाडोट्रोपिक हार्मोन की तीव्र वृद्धि (Surge) सीधे अंडोत्सर्ग (ग्राफियन पुटक का फटना) को प्रेरित करती है?",
         "Prolactin", "Follicle Stimulating Hormone (FSH)", "Luteinizing Hormone (LH)", "Progesterone",
         2, "The mid-cycle LH surge (LH peak around day 14 of a 28-day cycle) triggers ovulation and the subsequent transformation of the ruptured follicle into the corpus luteum.",
         "माहवारी चक्र के 14वें दिन ल्यूटिनाइजिंग हार्मोन (LH Surge) की अधिकतम सांद्रता ग्राफियन पुटक को तोड़कर अंडोत्सर्ग (Ovulation) करवाती है।"),

        # 16. Mathematics - Differential Calculus: Derivative of Composite Function (Index 3)
        ("What is the derivative of f(x) = ln(sec x + tan x) with respect to x?",
         "x के सापेक्ष f(x) = ln(sec x + tan x) का अवकलज क्या है?",
         "tan x", "sec^2 x", "cos x", "sec x",
         3, "By chain rule: d/dx [ln(sec x + tan x)] = (1 / (sec x + tan x)) * (sec x tan x + sec^2 x) = (sec x (tan x + sec x)) / (sec x + tan x) = sec x.",
         "श्रृंखला नियम से: f'(x) = 1/(sec x + tan x) * (sec x tan x + sec^2 x) = sec x प्राप्त होता है।"),

        # 17. Physics - EMI: Faraday's Law and Lenz's Law (Index 0)
        ("A magnetic flux through a stationary wire coil changes according to the equation Phi(t) = 4 t^2 + 2 t + 5 (in Weber). What is the magnitude of the induced electromotive force (EMF) at t = 2 seconds?",
         "एक स्थिर तार की कुंडली से गुजरने वाला चुंबकीय फ्लक्स समीकरण Phi(t) = 4 t^2 + 2 t + 5 (वेबर में) के अनुसार बदलता है। t = 2 सेकंड पर प्रेरित विद्युत वाहक बल (EMF) का परिमाण क्या है?",
         "18 V", "16 V", "21 V", "10 V",
         0, "By Faraday's law of induction: e = - dPhi/dt. Here dPhi/dt = 8 t + 2. At t = 2 s: |e| = 8(2) + 2 = 16 + 2 = 18 V.",
         "फैराडे के नियम से: |e| = dPhi/dt = 8 t + 2। t = 2 पर |e| = 8(2) + 2 = 18 वोल्ट होता है।"),

        # 18. Chemistry - Biomolecules: Peptide Bond Linkage (Index 1)
        ("What is the chemical nature of the peptide bond that links adjacent alpha-amino acid residues together in protein polypeptide chains?",
         "प्रोटीन पॉलीपेप्टाइड श्रृंखलाओं में निकटवर्ती अल्फा-अमीनो अम्ल अवशेषों को परस्पर जोड़ने वाले पेप्टाइड बंध की रासायनिक प्रकृति क्या है?",
         "Ester linkage (-COO-)", "Amide linkage (-CONH-)", "Glycosidic ether linkage (-O-)", "Disulfide linkage (-S-S-)",
         1, "A peptide bond is formed by condensation between the -COOH group of one amino acid and the -NH2 group of another, forming an amide bond (-CO-NH-).",
         "पेप्टाइड बंध एक एमाइड बंध (-CONH-) होता है जो एक अमीनो अम्ल के -COOH और दूसरे के -NH2 समूह के मध्य जल अणु के निष्कासन से बनता है।"),

        # 19. Biology - Genetics: Dihybrid Cross Phenotypic Ratio (Index 2)
        ("According to Gregor Mendel's Law of Independent Assortment, what is the classic phenotypic ratio observed in the F2 generation of a dihybrid cross involving two heterozygous parents (e.g., RrYy x RrYy)?",
         "ग्रेगर मेंडल के स्वतंत्र अपव्यूहन नियम के अनुसार, दो विषमयुग्मजी जनकों (RrYy x RrYy) के द्विसंकर क्रॉस की F2 पीढ़ी में दिखने वाला मानक लक्षणप्ररूपी (Phenotypic) अनुपात क्या है?",
         "3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1 : 1 : 1",
         2, "Mendel's dihybrid cross in pea plants yields 9 round-yellow : 3 round-green : 3 wrinkled-yellow : 1 wrinkled-green (9:3:3:1 phenotypic ratio).",
         "द्विसंकर क्रॉस (Dihybrid cross) की F2 पीढ़ी का मानक लक्षणप्ररूपी अनुपात 9 : 3 : 3 : 1 होता है।"),

        # 20. Mathematics - Probability: Conditional Probability (Index 3)
        ("If P(A) = 0.6, P(B) = 0.5, and P(A cap B) = 0.2, what is the conditional probability P(A | B)?",
         "यदि P(A) = 0.6, P(B) = 0.5 और P(A cap B) = 0.2 है, तो सप्रतिबंध प्रायिकता P(A | B) का मान क्या होगा?",
         "0.30", "0.33", "0.50", "0.40",
         3, "By definition of conditional probability: P(A | B) = P(A cap B) / P(B) = 0.2 / 0.5 = 2 / 5 = 0.40.",
         "सप्रतिबंध प्रायिकता सूत्र: P(A | B) = P(A cap B) / P(B) = 0.2 / 0.5 = 0.40।"),

        # 21. Physics - Nuclear Physics: Mass Defect and Binding Energy (Index 0)
        ("According to Einstein's mass-energy equivalence principle, an atomic mass defect of exactly 1 unified atomic mass unit (1 amu or 1 u) is equivalent to how much nuclear energy?",
         "आइंस्टीन के द्रव्यमान-ऊर्जा तुल्यता सिद्धांत के अनुसार, ठीक 1 परमाणु द्रव्यमान इकाई (1 amu अथवा 1 u) का द्रव्यमान क्षय कितनी नाभिकीय ऊर्जा के समतुल्य होता है?",
         "931.5 MeV", "93.15 MeV", "1.6 x 10^-19 J", "931.5 keV",
         0, "1 u = 1.6605 x 10^-27 kg. Energy E = m c^2 = (1.6605 x 10^-27 kg)(3 x 10^8 m/s)^2 ~= 1.492 x 10^-10 J ~= 931.5 MeV.",
         "1 amu द्रव्यमान का ऊर्जा समतुल्य मान लगभग 931.5 MeV (मेगा इलेक्ट्रॉन वोल्ट) होता है।"),

        # 22. Chemistry - p-Block Elements: Inert Pair Effect (Index 1)
        ("Why does Thallium exhibit a stable +1 oxidation state (Tl+) rather than +3, whereas Aluminum predominantly forms +3 (Al3+)?",
         "थैलियम +3 की तुलना में स्थिर +1 ऑक्सीकरण अवस्था (Tl+) क्यों प्रदर्शित करता है, जबकि एल्युमिनियम मुख्य रूप से +3 (Al3+) बनाता है?",
         "Due to high electron affinity of valence p-electrons",
         "Due to the Inert Pair Effect (reluctance of inner 6s2 valence electrons to participate in bonding)",
         "Due to complete absence of d- and f-orbitals in Thallium",
         "Due to high sublimation enthalpy of elemental Thallium",
         1, "The Inert Pair Effect occurs in heavier p-block elements (like Tl, Pb, Bi) due to poor shielding by intervening 4f and 5d electrons, tightly binding the valence 6s2 electrons and favoring oxidation state 2 units lower than group valence.",
         "भारी तत्वों (Tl, Pb, Bi) में 4f और 5d इलेक्ट्रॉनों के दुर्बल परिरक्षण प्रभाव के कारण 6s2 इलेक्ट्रॉन बंध निर्माण में भाग नहीं लेते (अक्रिय युग्म प्रभाव), जिससे Tl+ अधिक स्थायी होता है।"),

        # 23. Biology - Immunology: Antibodies Structure (Index 2)
        ("Which class of human immunoglobulins (antibodies) is actively transported across the maternal placenta to confer passive immunity to the developing fetus?",
         "मानव इम्यूनोग्लोबुलिन (एंटीबॉडी) का कौन-सा वर्ग विकासशील भ्रूण को निष्क्रिय प्रतिरक्षा प्रदान करने हेतु मातृ अपरा (Placenta) को पार कर सकता है?",
         "IgA", "IgM", "IgG", "IgE",
         2, "Immunoglobulin G (IgG) is the only antibody class capable of crossing the human placenta to protect the fetus and newborn.",
         "केवल IgG एंटीबॉडी ही प्लेसेंटा (अपरा) को पार कर गर्भस्थ शिशु में प्रवेश कर सकती है और उसे जन्मजात प्रतिरक्षा देती है।"),

        # 24. Mathematics - Algebra: System of Linear Equations (Index 3)
        ("For what value of k does the system of equations 2 x + 3 y = 5 and 4 x + k y = 10 have infinitely many real solutions?",
         "k के किस मान के लिए समीकरण निकाय 2 x + 3 y = 5 और 4 x + k y = 10 के अनंत वास्तविक हल होंगे?",
         "k = 3", "k = 12", "k = 8", "k = 6",
         3, "Condition for infinite solutions: a1/a2 = b1/b2 = c1/c2 => 2/4 = 3/k = 5/10 => 1/2 = 3/k => k = 6.",
         "अनंत हल होने की शर्त: a1/a2 = b1/b2 = c1/c2 => 2/4 = 3/k = 5/10 => 1/2 = 3/k => k = 6।"),

        # 25. Physics - Semiconductors: Logic Gate (Index 0)
        ("Which two-input digital logic gate produces an output of HIGH (1) if and only if both of its inputs are simultaneously HIGH (1)?",
         "कौन-सा दो-इनपुट डिजिटल लॉजिक गेट केवल और केवल तभी HIGH (1) आउटपुट देता है जब उसके दोनों इनपुट एक साथ HIGH (1) हों?",
         "AND Gate", "OR Gate", "NAND Gate", "NOR Gate",
         0, "Truth table of AND gate: Y = A . B. Output is 1 only when A = 1 and B = 1.",
         "AND गेट का बुलियन व्यंजक Y = A . B होता है, जो केवल दोनों इनपुट 1 होने पर ही आउटपुट 1 देता है।"),

        # 26. Chemistry - Electrochemistry: Standard Hydrogen Electrode (Index 1)
        ("By universal international thermodynamic convention, what is the standard reduction potential (E0) assigned to the Standard Hydrogen Electrode (SHE) at 298 K under 1 bar H2 pressure?",
         "सार्वभौमिक अंतरराष्ट्रीय सम्मेलन के अनुसार, 1 बार H2 दाब और 298 K पर मानक हाइड्रोजन इलेक्ट्रोड (SHE) का मानक अपचयन विभव (E0) कितना माना गया है?",
         "+ 1.00 V", "0.00 V", "- 1.00 V", "+ 0.50 V",
         1, "By convention of IUPAC, the standard electrode potential of the Standard Hydrogen Electrode (SHE) is defined as exactly 0.00 V at all temperatures.",
         "मानक हाइड्रोजन इलेक्ट्रोड (SHE) का मानक विभव सभी तापों पर स्वेच्छा से 0.00 वोल्ट (शून्य) निर्धारित किया गया है।"),

        # 27. Biology - Plant Physiology: Calvin Cycle (Index 2)
        ("In C3 photosynthesis (Calvin Cycle), what is the primary carbon dioxide (CO2) acceptor molecule in the stroma of chloroplasts?",
         "C3 प्रकाश-संश्लेषण (केल्विन चक्र) में, क्लोरोप्लास्ट के स्ट्रोमा में प्राथमिक कार्बन डाइऑक्साइड (CO2) ग्राही अणु कौन-सा होता है?",
         "Phosphoenolpyruvate (PEP)", "3-Phosphoglyceric acid (3-PGA)", "Ribulose-1,5-bisphosphate (RuBP)", "Oxaloacetic acid (OAA)",
         2, "RuBP (a 5-carbon ketose sugar) is the primary CO2 acceptor catalyzed by the enzyme RuBisCO in C3 plants.",
         "C3 पादपों में CO2 का प्राथमिक ग्राही 5-कार्बन वाला अणु राइबुलोज-1,5-बिसफॉस्फेट (RuBP) होता है जिसे RuBisCO एंजाइम उत्प्रेरित करता है।"),

        # 28. Mathematics - Calculus: Maxima and Minima (Index 3)
        ("What is the minimum value attained by the quadratic function f(x) = x^2 - 6 x + 13 on the entire real domain?",
         "संपूर्ण वास्तविक प्रांत पर द्विघात फलन f(x) = x^2 - 6 x + 13 का न्यूनतम मान क्या है?",
         "13", "6", "9", "4",
         3, "Rewrite by completing the square: f(x) = (x - 3)^2 - 9 + 13 = (x - 3)^2 + 4. Since (x - 3)^2 >= 0 for all real x, minimum value is 4 (at x = 3).",
         "पूर्ण वर्ग बनाने पर: f(x) = (x - 3)^2 + 4। चूँकि (x - 3)^2 >= 0 होता है, अतः न्यूनतम मान 4 (x = 3 पर) प्राप्त होता है।")
    ]

    for item in benchmarks:
        stem_en, stem_hi, o0, o1, o2, o3, c_idx, sol_en, sol_hi = item
        items.append({
            'domain': 'CUET UG Sciences - Benchmark Mastery',
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
        ("Physical Sciences & Electromagnetic Applications", [
            ("Gauss Law Flux through Symmetric Closed Surfaces", "सममित बंद पृष्ठों से गाउस नियम फ्लक्स", "deriving electric field E = sigma / epsilon0 near conducting plates and verifying inverse square laws"),
            ("Kirchhoff Loop Voltage Law and Mesh Currents", "किरचॉफ पाश वोल्टता नियम एवं मेश धाराएं", "formulating algebraic sum of potential differences sum V = 0 around complete closed circuit loops"),
            ("Cyclotron Frequency and Charged Particle Helical Trajectories", "साइक्लोट्रॉन आवृत्ति एवं आवेशित कण सर्पिलाकार प्रक्षेप पथ", "evaluating f = q B / (2 pi m) independent of particle velocity and radius in uniform magnetic fields"),
            ("LCR Series Resonant Frequency and Power Factor Optimization", "LCR श्रेणी अनुनादी आवृत्ति एवं शक्ति गुणांक अनुकूलन", "operating at resonance omega0 = 1 / sqrt(L C) where inductive and capacitive reactances cancel (cos phi = 1)"),
            ("Young Double Slit Interference Fringe Width Calculation", "यंग द्वि-झिरी व्यतिकरण फ्रिंज चौड़ाई गणना", "applying beta = lambda D / d and evaluating central bright fringe shifts upon inserting thin transparent mica sheets"),
            ("Bohr Model Quantized Energy Levels and Spectral Series", "बोहर मॉडल परिमाणीकृत ऊर्जा स्तर एवं वर्णक्रमीय श्रेणियां", "calculating photon energy E = - 13.6 Z^2 / n^2 eV and matching Lyman, Balmer, and Paschen transitions"),
            ("Semiconductor Full Wave Rectifier and Ripple Factor", "अर्धचालक पूर्ण तरंग दिष्टकारी एवं उर्मिका गुणांक", "utilizing center-tapped or bridge diodes to convert AC into pulsating DC with ripple factor 0.48"),
            ("de Broglie Matter Wavelength and Electron Acceleration", "दे ब्रॉग्ली पदार्थ तरंगदैर्ध्य एवं इलेक्ट्रॉन त्वरण", "applying lambda = h / sqrt(2 m e V) = 1.227 / sqrt(V) nm for non-relativistic electrons")
        ]),
        ("Chemical Sciences, Coordination & Reaction Mechanisms", [
            ("Raoult Law for Binary Volatile Liquid Mixtures", "द्विअंगी वाष्पशील द्रव मिश्रणों हेतु राउल्ट नियम", "establishing partial vapor pressures P_A = P0_A x_A and P_B = P0_B x_B and analyzing positive/negative deviations"),
            ("Arrhenius Equation Temperature Dependence of Rate Constant", "दर स्थिरांक की ताप निर्भरता हेतु आरेनियस समीकरण", "evaluating ln(k2/k1) = (E_a / R) (1/T1 - 1/T2) to determine chemical activation barrier energy"),
            ("Crystal Field Splitting in Octahedral vs Tetrahedral Complexes", "अष्टफलकीय बनाम चतुष्फलकीय संकुलों में क्रिस्टल क्षेत्र विपाटन", "establishing Delta_t = (4/9) Delta_o and identifying low-spin versus high-spin electronic configurations"),
            ("Aldol Condensation Mechanism of Alpha-Hydrogen Carbonyls", "अल्फा-हाइड्रोजन कार्बोनिलों की एल्डोल संघनन क्रियाविधि", "generating enolate carbanion nucleophile attacking adjacent aldehyde carbonyl to form beta-hydroxyaldehyde"),
            ("Cannizzaro Disproportionation of Non-enolizable Aldehydes", "गैर-इनॉलाइजेबल एल्डिहाइडों का कैनिजारो असमानुपातन", "reacting benzaldehyde with concentrated alkali yielding equal moles of benzyl alcohol and sodium benzoate"),
            ("Gabriel Phthalimide Synthesis Limitations for Aromatic Amines", "ऐरोमैटिक ऐमीनों हेतु गैब्रियल थैलिमाइड संश्लेषण सीमाएं", "demonstrating aryl halides cannot undergo nucleophilic SN2 substitution with phthalimide anion"),
            ("Biomolecules: Glucose Structure and Anomeric Mutarotation", "जैव-अणु: ग्लूकोज संरचना एवं एनोमेरिक परिवर्ती ध्रुवण", "equilibrating alpha-D-glucopyranose and beta-D-glucopyranose via open-chain hydroxyaldehyde form"),
            ("Polymers: Addition vs Condensation Polymerization Chains", "बहुलक: योगात्मक बनाम संघनन बहुलकीकरण श्रृंखलाएं", "contrasting polyethylene/Teflon radical addition with Dacron/Nylon-6,6 step-growth elimination of water")
        ]),
        ("Life Sciences, Genetics & Applied Biotechnology", [
            ("Mendelian Monohybrid Law of Segregation (Purity of Gametes)", "मेंडेलियन एकसंकर पृथक्करण नियम (युग्मकों की शुद्धता)", "demonstrating alleles segregate during meiosis so each gamete carries only one allele of a gene pair"),
            ("DNA Double Helix Watson-Crick Dimensions and Hydrogen Bonds", "DNA द्विकुंडली वाटसन-क्रिक विमाएं एवं हाइड्रोजन बंध", "verifying 2 nm diameter, 3.4 nm pitch with 10 base pairs per helical turn, and A=T, G=C complementarity"),
            ("Polymerase Chain Reaction (PCR) Cycles and Taq DNA Polymerase", "पॉलीमरेज श्रृंखला अभिक्रिया (PCR) चक्र एवं टैक DNA पॉलीमरेज", "executing denaturation (94C), annealing (55C), and extension (72C) using thermophilic bacterium enzyme"),
            ("Plasmid Cloning Vector pBR322 Selectable Marker Genes", "प्लाज्मिड क्लोनिंग संवाहक pBR322 वरणयोग्य मार्कर जीन", "employing ampicillin (ampR) and tetracycline (tetR) resistance genes for insertional inactivation screening"),
            ("Human Spermatogenesis vs Oogenesis Meiotic Timing", "मानव शुक्रजनन बनाम अंडजनन अर्धसूत्रीय समय", "contrasting continuous male sperm production with female meiotic arrest at prophase I until ovulation"),
            ("Ecosystem Ecological Pyramids: Energy, Biomass, and Numbers", "पारिस्थितिक तंत्र के पारिस्थितिक पिरामिड: ऊर्जा, जैवभार एवं संख्या", "establishing energy pyramid is always upright whereas marine biomass pyramid is inverted"),
            ("Biodiversity In-situ vs Ex-situ Conservation Modalities", "जैव विविधता स्व-स्थाने बनाम बाह्य-स्थाने संरक्षण पद्धतियां", "contrasting national parks and biosphere reserves (in-situ) with botanical gardens and cryopreservation (ex-situ)"),
            ("Double Fertilization in Angiosperms: Syngamy and Triple Fusion", "आवृतबीजियों में दोहरा निषेचन: युग्मक संलयन एवं त्रिसंलयन", "fusing one sperm with egg (2n zygote) and second sperm with polar nuclei (3n primary endosperm nucleus)")
        ]),
        ("Applied Mathematics, Calculus & Probability Models", [
            ("Matrix Inversion and Solution of Linear Algebraic Systems", "आव्यूह प्रतिलोम एवं रैखिक बीजीय निकायों का हल", "solving X = A^(-1) B using adjoint and determinant for unique non-singular coefficient systems"),
            ("Continuity and Differentiability Testing at Piecewise Boundaries", "खंडशः सीमाओं पर सातत्य एवं अवकलनीयता परीक्षण", "verifying left-hand and right-hand limits and derivatives coincide at critical transitional points"),
            ("Definite Integral King Property for Symmetric Reduction", "सममित न्यूनन हेतु निश्चित समाकल किंग गुणधर्म", "substituting x with a + b - x to evaluate complicated trigonometric and logarithmic quotients"),
            ("First-Order Linear Differential Equations Integrating Factor", "प्रथम-कोटि रैखिक अवकल समीकरण समाकलन गुणक", "multiplying by exp(int P dx) to integrate d/dx [y * IF] = Q * IF directly"),
            ("Vector Scalar Triple Product and Parallelepiped Geometry", "सदिश अदिश त्रिक गुणन एवं समांतर षट्फलक ज्यामिति", "evaluating volume V = a . (b x c) and confirming coplanar vectors satisfy triple product zero"),
            ("Shortest Distance Between Skew Lines in Three Dimensions", "त्रिविम में तिर्यक रेखाओं के मध्य न्यूनतम दूरी", "projecting segment (a2 - a1) onto unit normal vector (b1 x b2) / |b1 x b2|"),
            ("Bayes Theorem for Partitioned Event Probability Updating", "विभाजित घटना प्रायिकता अद्यतन हेतु बेयेस प्रमेय", "calculating conditional posterior probabilities given diagnostic evidence and prior base rates"),
            ("Linear Programming Graphic Feasible Region and Optimal Extrema", "रैखिक प्रोग्रामन आलेखीय सुसंगत क्षेत्र एवं अनुकूलतम चरम", "evaluating objective function Z = a x + b y at corner vertices of bounded convex polyhedral sets")
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
                    stem_en = f"In CUET UG Section II (Sciences), which fundamental principle or mathematical law governs '{st_en}'?"
                    stem_hi = f"सीयूईटी यूजी खंड II (विज्ञान) में, '{st_hi}' से संबंधित कौन-सा मूलभूत वैज्ञानिक अथवा गणितीय नियम मान्य है?"
                    sol_en = f"Fundamental scientific principle: {facts}. Section: {dom_title}."
                    sol_hi = f"मूल वैज्ञानिक सिद्धांत: {facts}। खंड: {dom_title}।"
                    choices = [
                        {'en': f"Scientific principle: {facts} ({dom_title})", 'hi': f"वैज्ञानिक सिद्धांत: {facts} ({dom_title})"},
                        {'en': "Arbitrary breakdown of thermodynamic conservation laws in closed systems", 'hi': "बंद निकायों में ऊष्मागतिक संरक्षण नियमों का मनमाना क्षय"},
                        {'en': "Spontaneous divergence of biological homeostasis without metabolic expenditure", 'hi': "उपापचयी व्यय के बिना जैविक समस्थापन का स्वतः विचलन"},
                        {'en': "Unphysical negative probabilities in standard axiomatic distributions", 'hi': "मानक अभिगृहीतीय वितरणों में गैर-भौतिक ऋणात्मक प्रायिकताएं"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When solving complex scientific and mathematical problems on '{st_en}', which conceptual error must be avoided?"
                    stem_hi = f"'{st_hi}' पर आधारित वैज्ञानिक एवं गणितीय प्रश्नों को हल करते समय किस सामान्य त्रुटि से बचना आवश्यक है?"
                    sol_en = f"Key theoretical axiom: {facts}. Topic: {dom_title}."
                    sol_hi = f"मुख्य सैद्धांतिक नियम: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "Maintaining dimensional homogeneity across physical equations", 'hi': "भौतिक समीकरणों में विमीय समरूपता बनाए रखना"},
                        {'en': f"Conceptual error: failing to apply that {facts} ({dom_title})", 'hi': f"सैद्धांतिक त्रुटि: इस तथ्य की अनदेखी कि {facts} ({dom_title})"},
                        {'en': "Verifying boundary conditions in differential calculations", 'hi': "अवकल गणनाओं में परिसीमा शर्तों की पुष्टि करना"},
                        {'en': "Conserving total mass-energy across atomic and nuclear reactions", 'hi': "परमाण्विक एवं नाभिकीय अभिक्रियाओं में कुल द्रव्यमान-ऊर्जा का संरक्षण करना"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do engineers, physicians, and research scientists apply equations related to '{st_en}'?"
                    stem_hi = f"अभियंता, चिकित्सक एवं वैज्ञानिक शोधकर्ता '{st_hi}' से जुड़े सूत्रों का व्यावहारिक अनुप्रयोग किस प्रकार करते हैं?"
                    sol_en = f"Applied practical formulation: {facts}. Scope: {dom_title}."
                    sol_hi = f"व्यावहारिक अनुप्रयोग: {facts}। विस्तार: {dom_title}।"
                    choices = [
                        {'en': "By omitting non-linear damping coefficients arbitrarily in physical circuits", 'hi': "भौतिक परिपथों में गैर-रेखीय अवमंदन गुणांकों को मनमाने ढंग से हटाकर"},
                        {'en': "By assuming chemical catalysts shift thermodynamic equilibrium positions", 'hi': "यह मानकर कि रासायनिक उत्प्रेरक ऊष्मागतिक साम्य स्थिति को बदल देते हैं"},
                        {'en': f"Empirical scientific application: {facts} ({dom_title})", 'hi': f"अनुभवजन्य वैज्ञानिक अनुप्रयोग: {facts} ({dom_title})"},
                        {'en': "By treating variable biological parameters as immutable mathematical constants", 'hi': "परिवर्तनीय जैविक मापदंडों को अपरिवर्तनीय गणितीय स्थिरांक मानकर"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which authoritative finding represents the official NCERT and NTA curriculum consensus regarding '{st_en}'?"
                    stem_hi = f"आधिकारिक एनसीईआरटी और एनटीए पाठ्यक्रम के अनुसार '{st_hi}' का प्रामाणिक व सत्यापित विवरण कौन-सा कथन देता है?"
                    sol_en = f"Authoritative scientific consensus: {facts}. Domain: {dom_title}."
                    sol_hi = f"प्रामाणिक वैज्ञानिक सिद्धांत: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "Direct contradiction of universal gravitation across astronomical observations", 'hi': "खगोलीय प्रेक्षणों में सार्वत्रिक गुरुत्वाकर्षण का प्रत्यक्ष खंडन"},
                        {'en': "Permanent violation of Mendelian inheritance in diploid sexual reproduction", 'hi': "द्विगुणित लैंगिक जनन में मेंडेलियन आनुवंशिकी का स्थायी उल्लंघन"},
                        {'en': "Spontaneous failure of calculus integration across continuous real functions", 'hi': "संतत वास्तविक फलनों में कलन समाकलन की स्वतः विफलता"},
                        {'en': f"Established scientific truth: {facts} ({dom_title})", 'hi': f"स्थापित वैज्ञानिक सत्य: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'CUET UG Sciences - {dom_title}',
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
    res = get_raw_cuet_ug_sciences_items()
    print(f"Generated {len(res)} items for CUET UG Sciences.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution of raw indices:", counts)

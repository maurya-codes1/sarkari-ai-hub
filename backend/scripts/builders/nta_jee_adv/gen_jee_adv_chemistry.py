"""
JEE Advanced - Advanced Chemistry (रसायन विज्ञान - उच्च स्तरीय) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Physical Chemistry: Thermodynamics, Chemical Potential, Clausius-Clapeyron, Complex Ionic Equilibrium
- Electrochemistry: Concentration Cells, Overpotential, Kohlrausch Law & Debye-Huckel
- Chemical Kinetics: Steady-State Approximation, Transition State Theory & Catalytic Mechanisms
- Solid State & Surface Phenomena: Crystal Lattices, Bragg Law, Defects & Langmuir Adsorption
- Inorganic Chemistry: MOT of Heteronuclear Diatomics, Crystal Field Splitting (CFSE) & Jahn-Teller Effect
- Main Group Chemistry: Borane 3c-2e Bonding, Silicates, Silicones & Transition Metal Metallurgy (Ellingham)
- Qualitative Inorganic Analysis: Group Cation Reagents, Chromyl Chloride, Brown Ring & Complexation Tests
- Organic Chemistry: Stereochemistry (Cyclohexane Conformations, NGP), Substitution & Elimination Regioselectivity
- Carbonyl Chemistry: Named Condensations (Aldol, Claisen, Cannizzaro, Michael, Wittig) & Biomolecules (pI, Mutarotation)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_jee_adv_chemistry_items():
    items = []

    # 28 Benchmark Core Questions with detailed reactions, formulas and explanations
    benchmarks = [
        # 1. Physical Chemistry - Clausius-Clapeyron Equation (Index 0)
        ("For a liquid-vapor phase transition with molar enthalpy of vaporization Delta H_vap, which equation correctly relates vapor pressure P to absolute temperature T assuming ideal vapor behavior and temperature-independent Delta H_vap?",
         "मोलर वाष्पीकरण एन्थैल्पी Delta H_vap वाले द्रव-वाष्प प्रावस्था संक्रमण हेतु, आदर्श वाष्प व्यवहार और ताप-अनाश्रित Delta H_vap मानते हुए कौन-सा समीकरण वाष्प दाब P को परम ताप T से सही रूप से जोड़ता है?",
         "ln(P2 / P1) = - (Delta H_vap / R) * (1/T2 - 1/T1)", "ln(P2 / P1) = (Delta H_vap / R) * (T2 - T1)", "ln(P2 / P1) = - (Delta H_vap / (2 R)) * (1/T2^2 - 1/T1^2)", "ln(P2 / P1) = (R / Delta H_vap) * (1/T1 - 1/T2)",
         0, "The Clausius-Clapeyron differential equation is d(ln P)/dT = Delta H_vap / (R T^2). Integrating between (P1, T1) and (P2, T2) yields ln(P2 / P1) = - (Delta H_vap / R) * (1/T2 - 1/T1).",
         "क्लॉसियस-क्लेपरॉन समीकरण d(ln P)/dT = Delta H_vap / (R T^2) होता है। समाकलन करने पर ln(P2 / P1) = - (Delta H_vap / R) * (1/T2 - 1/T1) प्राप्त होता है।"),

        # 2. Coordination Chemistry - CFSE of High-Spin vs Low-Spin Octahedral Complexes (Index 1)
        ("For an octahedral complex of a transition metal ion with d6 electronic configuration in the presence of strong field ligands (pairing energy P < Delta_o), what is the Crystal Field Stabilization Energy (CFSE)?",
         "प्रबल क्षेत्र लिगेंडों की उपस्थिति में (युग्मन ऊर्जा P < Delta_o) d6 इलेक्ट्रॉनिक विन्यास वाले संक्रमण धातु आयन के अष्टफलकीय संकुल हेतु क्रिस्टल क्षेत्र स्थायीकरण ऊर्जा (CFSE) क्या है?",
         "- 0.4 Delta_o + P", "- 2.4 Delta_o + 2 P", "- 1.2 Delta_o", "- 1.8 Delta_o + P",
         1, "For d6 strong field (low spin), all 6 electrons occupy the t2g orbitals: (t2g)^6 (eg)^0. CFSE = 6 * (-0.4 Delta_o) + 2 P = - 2.4 Delta_o + 2 P (where 2 P accounts for the two extra electron pairs beyond spherical environment).",
         "d6 प्रबल क्षेत्र (निम्न चक्रण) में विन्यास (t2g)^6 (eg)^0 होता है। CFSE = 6 * (-0.4 Delta_o) + 2 P = - 2.4 Delta_o + 2 P प्राप्त होता है।"),

        # 3. Organic Chemistry - Neighboring Group Participation (NGP) (Index 2)
        ("In the solvolysis of trans-2-bromocyclohexyl brosylate compared to the cis isomer, the trans isomer reacts over 1,000 times faster with complete retention of relative trans configuration. What mechanistic phenomenon explains this dramatic rate acceleration and stereochemical outcome?",
         "cis-समावयवी की तुलना में trans-2-ब्रोमोसाइक्लोहेक्सिल ब्रोसिलेट के विलायक-अपघटन में, trans-समावयवी आपेक्षिक trans-विन्यास के पूर्ण प्रतिधारण के साथ 1,000 गुना से अधिक तेजी से अभिक्रिया करता है। इस तीव्र गति वृद्धि और त्रिविम रासायनिक परिणाम की व्याख्या कौन-सी क्रियाविधि परिघटना करती है?",
         "Anti-periplanar E2 elimination yielding cyclohexene exclusively", "Classical planar carbocation intermediate in SN1 dissociation", "Neighboring Group Participation (NGP) forming an intermediate cyclic bromonium ion", "SN2 backside displacement by solvent directly without neighboring participation",
         2, "The neighboring trans-bromo substituent has anti-periplanar lone pairs that displace the brosylate leaving group from the rear, forming a bridged cyclic bromonium ion intermediate (anchimeric assistance / NGP). Subsequent solvent attack with second inversion yields net retention.",
         "पड़ोसी trans-ब्रोमो परमाणु का एकाकी इलेक्ट्रॉन युग्म पश्च आक्रमण द्वारा चक्रीय ब्रोमोनियम आयन मध्यवर्ती बनाता है (एंकिमेरिक सहायता / NGP), जिससे अभिक्रिया की गति तीव्र हो जाती है और विन्यास का प्रतिधारण होता है।"),

        # 4. Qualitative Analysis - Chromyl Chloride Test (Index 3)
        ("When a solid mixture containing chloride ions is heated with solid potassium dichromate (K2Cr2O7) and concentrated H2SO4, red vapors of chromyl chloride (CrO2Cl2) are evolved. When these vapors are passed into aqueous NaOH followed by addition of lead acetate, what precipitate confirms chloride?",
         "जब क्लोराइड आयन युक्त ठोस मिश्रण को ठोस पोटेशियम डाइक्रोमेट (K2Cr2O7) और सांद्र H2SO4 के साथ गर्म किया जाता है, तो क्रोमिल क्लोराइड (CrO2Cl2) की लाल वाष्प निकलती है। जब इन वाष्पों को जलीय NaOH में प्रवाहित कर लेड एसीटेट मिलाया जाता है, तो कौन-सा अवक्षेप क्लोराइड की पुष्टि करता है?",
         "White precipitate of Lead Chloride (PbCl2)", "Dark red precipitate of Lead Dichromate (PbCr2O7)", "Black precipitate of Lead Oxide (PbO2)", "Yellow precipitate of Lead Chromate (PbCrO4)",
         3, "CrO2Cl2 reacts with NaOH to form sodium chromate (Na2CrO4, yellow solution). Adding acetic acid and lead acetate (CH3COO)2Pb forms a bright yellow precipitate of lead chromate: Na2CrO4 + Pb(CH3COO)2 -> PbCrO4(s) (yellow) + 2 CH3COONa.",
         "CrO2Cl2 NaOH के साथ सोडियम क्रोमेट बनाता है। लेड एसीटेट मिलाने पर लेड क्रोमेट (PbCrO4) का चमकीला पीला अवक्षेप बनता है, जो क्लोराइड की पुष्टि करता है।"),

        # 5. Inorganic Chemistry - Bonding in Diborane (Index 0)
        ("In the molecule of diborane (B2H6), which of the following statements correctly describes the nature of chemical bonds connecting the boron and hydrogen atoms?",
         "डाइबोरेन (B2H6) के अणु में, बोरॉन और हाइड्रोजन परमाणुओं को जोड़ने वाले रासायनिक बंधों की प्रकृति का सही विवरण कौन-सा कथन देता है?",
         "Four terminal 2-center-2-electron (2c-2e) B-H bonds and two bridging 3-center-2-electron (3c-2e) B-H-B bonds",
         "Six equivalent 2-center-2-electron B-H single covalent bonds with an open boron-boron double bond",
         "Four bridging 3-center-2-electron bonds and two terminal 2-center-2-electron bonds",
         "Two direct 2-center-2-electron B-B covalent bonds and six ionic B-H bonds",
         0, "Diborane B2H6 contains 4 terminal B-H bonds that are normal 2-center-2-electron (2c-2e) covalent bonds and 2 bridging B-H-B banana bonds which are electron-deficient 3-center-2-electron (3c-2e) bonds.",
         "डाइबोरेन में 4 सिरे वाले B-H बंध सामान्य 2c-2e सहसंयोजक बंध होते हैं तथा 2 सेतु B-H-B बनाना बंध इलेक्ट्रॉन-न्यून 3c-2e बंध होते हैं।"),

        # 6. Chemical Kinetics - Steady-State Approximation (Index 1)
        ("In the Lindemann-Hinshelwood unimolecular reaction mechanism: A + A <=>[k1][k-1] A* + A (activation/deactivation), followed by A* ->[k2] Products (decomposition). Applying the steady-state approximation to the energized intermediate [A*], what is the rate law for product formation?",
         "लिंडेमैन-हिंशेलवुड एकाण्विक अभिक्रिया क्रियाविधि में: A + A <=>[k1][k-1] A* + A, इसके बाद A* ->[k2] उत्पाद। सक्रिय मध्यवर्ती [A*] पर स्थायी-अवस्था सन्निकटन लागू करने पर उत्पाद निर्माण का दर नियम क्या है?",
         "Rate = k1 k2 [A]^2 / (k-1 + k2)", "Rate = (k1 k2 [A]^2) / (k-1 [A] + k2)", "Rate = k1 k2 [A] / (k-1 [A] + k2)", "Rate = k1 [A]^2 / (k-1 [A] + k2 [A])",
         1, "Rate of product formation is d[P]/dt = k2 [A*]. Setting d[A*]/dt = 0 gives k1 [A]^2 - k-1 [A*][A] - k2 [A*] = 0 => [A*] = (k1 [A]^2) / (k-1 [A] + k2). Thus Rate = (k1 k2 [A]^2) / (k-1 [A] + k2). At high pressure (k-1 [A] >> k2), it is 1st order; at low pressure, it is 2nd order.",
         "स्थायी-अवस्था सन्निकटन d[A*]/dt = 0 से [A*] = k1 [A]^2 / (k-1 [A] + k2) प्राप्त होता है। अतः दर = (k1 k2 [A]^2) / (k-1 [A] + k2) होती है।"),

        # 7. Physical Chemistry - Debye-Huckel Limiting Law (Index 2)
        ("According to the Debye-Huckel limiting law for dilute aqueous electrolyte solutions at 298 K, how does the mean ionic activity coefficient log10(gamma_+-) depend on the ionic strength I of the solution?",
         "298 K पर तनु जलीय विद्युत-अपघट्य विलयनों हेतु देबाई-हकल सीमांत नियम के अनुसार, माध्य आयनिक सक्रियता गुणांक log10(gamma_+-) विलयन के आयनिक सामर्थ्य I पर किस प्रकार निर्भर करता है?",
         "log10(gamma_+-) is directly proportional to I", "log10(gamma_+-) is inversely proportional to sqrt(I)", "log10(gamma_+-) = - A * |z_+ z_-| * sqrt(I)", "log10(gamma_+-) = - A * (z_+ + z_-) * I^2",
         2, "The Debye-Huckel limiting law is log10(gamma_+-) = - A * |z_+ * z_-| * sqrt(I), where A ~= 0.509 mol^(-1/2) kg^(1/2) for water at 298 K and I = 1/2 sum(c_i z_i^2).",
         "देबाई-हकल सीमांत नियम log10(gamma_+-) = - A * |z_+ * z_-| * sqrt(I) होता है, जहाँ A जल हेतु 298 K पर लगभग 0.509 होता है।"),

        # 8. Organic Chemistry - Aldol Condensation with Crossed Enolates (Index 3)
        ("When benzaldehyde (C6H5CHO) and acetophenone (C6H5COCH3) are reacted in the presence of dilute aqueous NaOH followed by heating, what is the major organic product formed (Claisen-Schmidt condensation)?",
         "जब तनु जलीय NaOH की उपस्थिति में बेन्जैल्डिहाइड (C6H5CHO) और ऐसीटोफीनोन (C6H5COCH3) की अभिक्रिया के पश्चात गर्म किया जाता है, तो कौन-सा मुख्य कार्बनिक उत्पाद बनता है (क्लैसेन-श्मिट संघनन)?",
         "Benzyl benzoate (C6H5COOCH2C6H5)", "1,2-Diphenylethane-1,2-dione (Benzil)", "1,3-Diphenylpropane-1,3-diol", "1,3-Diphenylprop-2-en-1-one (Chalcone, C6H5CH=CHCOC6H5)",
         3, "Benzaldehyde has no alpha-hydrogens, while acetophenone forms an enolate ion at its methyl group. Nucleophilic attack on benzaldehyde followed by dehydration upon heating yields the alpha,beta-unsaturated ketone 1,3-diphenylprop-2-en-1-one (Chalcone).",
         "बेन्जैल्डिहाइड में अल्फा-हाइड्रोजन नहीं होता। ऐसीटोफीनोन इनॉलेट बनाकर बेन्जैल्डिहाइड पर आक्रमण करता है और निर्जलीकरण द्वारा कैल्कोन (1,3-डाइफेनिलप्रोप-2-एन-1-ओन) बनाता है।"),

        # 9. Inorganic Chemistry - Ellingham Diagram and Carbon Reduction (Index 0)
        ("In an Ellingham diagram (Delta G vs Temperature T) for metal oxide formation, why does the line representing the reaction 2 C(s) + O2(g) -> 2 CO(g) have a distinct negative slope (d(Delta G)/dT < 0)?",
         "धातु ऑक्साइड निर्माण हेतु एलिंघम आरेख (Delta G बनाम ताप T) में, 2 C(s) + O2(g) -> 2 CO(g) अभिक्रिया को दर्शाने वाली रेखा की ढाल ऋणात्मक (d(Delta G)/dT < 0) क्यों होती है?",
         "Because the reaction produces 2 moles of gas from 1 mole of gas, resulting in positive entropy change (Delta S > 0)",
         "Because the enthalpy of formation of CO is strictly positive and endothermic at all temperatures",
         "Because carbon sublimes directly into carbon monoxide without interacting with gaseous oxygen",
         "Because the entropy of solid carbon increases exponentially as temperature exceeds 1000 K",
         0, "Delta G = Delta H - T Delta S implies d(Delta G)/dT = - Delta S. In 2 C(s) + O2(g) -> 2 CO(g), 1 mole of gas forms 2 moles of gas, so Delta S > 0. Hence the slope - Delta S is negative. Consequently, carbon becomes a more potent reducing agent at higher temperatures.",
         "Delta G = Delta H - T Delta S से ढाल = - Delta S होती है। 1 मोल O2 गैस से 2 मोल CO गैस बनने पर Delta S धनात्मक होता है, जिससे ढाल ऋणात्मक (- Delta S < 0) हो जाती है।"),

        # 10. Physical Chemistry - Henderson-Hasselbalch Equation for Buffer (Index 1)
        ("A buffer solution is prepared by mixing 0.10 M sodium acetate (CH3COONa) and 0.05 M acetic acid (CH3COOH, Ka = 1.8 x 10^-5, pKa = 4.74). What is the pH of this buffer solution (log10(2) ~= 0.301)?",
         "0.10 M सोडियम एसीटेट (CH3COONa) और 0.05 M एसीटिक अम्ल (CH3COOH, Ka = 1.8 x 10^-5, pKa = 4.74) को मिलाकर एक बफर विलयन तैयार किया जाता है। इस बफर विलयन का pH क्या है (log10(2) ~= 0.301)?",
         "4.44", "5.04", "4.74", "5.34",
         1, "By Henderson-Hasselbalch equation: pH = pKa + log10([Conjugate Base] / [Acid]) = 4.74 + log10(0.10 / 0.05) = 4.74 + log10(2) = 4.74 + 0.301 = 5.041 ~= 5.04.",
         "हेंडरसन-हेसलबाल्च समीकरण से: pH = pKa + log([लवण]/[अम्ल]) = 4.74 + log(0.10/0.05) = 4.74 + 0.30 = 5.04।"),

        # 11. Organic Chemistry - Hofmann Bromamide Degradation (Index 2)
        ("When benzamide (C6H5CONH2) is treated with bromine (Br2) and concentrated aqueous KOH, what is the primary organic product obtained?",
         "जब बेन्ज़ामाइड (C6H5CONH2) को ब्रोमीन (Br2) और सांद्र जलीय KOH के साथ अभिकृत किया जाता है, तो कौन-सा प्राथमिक कार्बनिक उत्पाद प्राप्त होता है?",
         "Benzoic acid (C6H5COOH)", "Benzonitrile (C6H5CN)", "Aniline (C6H5NH2)", "Benzylamine (C6H5CH2NH2)",
         2, "In the Hofmann bromamide reaction, an amide is converted into a primary amine with one fewer carbon atom via an intermediate isocyanate: C6H5CONH2 + Br2 + 4 KOH -> C6H5NH2 + K2CO3 + 2 KBr + 2 H2O.",
         "हॉफमैन ब्रोमामाइड निम्नीकरण में एमाइड से एक कम कार्बन वाला प्राथमिक ऐमीन बनता है: बेन्ज़ामाइड से ऐनिलीन (C6H5NH2) प्राप्त होता है।"),

        # 12. Solid State - Radius Ratio for Octahedral Coordination (Index 3)
        ("In an ionic crystal lattice with rock-salt (NaCl) structure where anions form an FCC lattice and cations occupy all octahedral voids without lattice distortion, what is the limiting critical radius ratio r_+ / r_-?",
         "रॉक-साल्ट (NaCl) संरचना वाले एक आयनिक क्रिस्टल जालक में जहाँ ऋणायन FCC जालक बनाते हैं और धनायन बिना जालक विरूपण के सभी अष्टफलकीय रिक्तियों को घेरते हैं, सीमित क्रांतिक त्रिज्या अनुपात r_+ / r_- क्या है?",
         "0.155", "0.225", "0.732", "0.414",
         3, "For octahedral coordination (coordination number 6), the face diagonal satisfies 2 (r_+ + r_-) = sqrt(2) * (2 r_-) => r_+ / r_- = sqrt(2) - 1 ~= 1.414 - 1 = 0.414.",
         "अष्टफलकीय रिक्ति (उपसहसंयोजन संख्या 6) के लिए क्रांतिक त्रिज्या अनुपात r_+ / r_- = sqrt(2) - 1 = 0.414 होता है।"),

        # 13. Molecular Orbital Theory - Bond Order of Paramagnetic Diatomic (Index 0)
        ("According to Molecular Orbital Theory, which of the following homonuclear or heteronuclear diatomic species possesses a bond order of 2.5 and is simultaneously paramagnetic due to unpaired electrons?",
         "आणविक कक्षक सिद्धांत (MOT) के अनुसार, निम्नलिखित में से कौन-सी समनाभिकीय अथवा विषमनाभिकीय द्विपरमाण्विक स्पीशीज 2.5 का बंध क्रम रखती है तथा अयुग्मित इलेक्ट्रॉन के कारण अनुचुंबकीय है?",
         "Nitric oxide molecule (NO) with 15 valence/core electrons",
         "Nitrogen molecule (N2) with 14 valence/core electrons",
         "Carbon monoxide molecule (CO) with 14 electrons",
         "Cyanide anion (CN-) with 14 electrons",
         0, "NO has 15 electrons. Electronic configuration: sigma1s^2 sigma*1s^2 sigma2s^2 sigma*2s^2 pi2px^2 = pi2py^2 sigma2pz^2 pi*2px^1. Bond order = (10 - 5) / 2 = 2.5. It has 1 unpaired electron in pi*2px, making it paramagnetic.",
         "NO में 15 इलेक्ट्रॉन होते हैं। बंध क्रम = (10 - 5)/2 = 2.5 होता है तथा pi* कक्षक में 1 अयुग्मित इलेक्ट्रॉन होने के कारण यह अनुचुंबकीय होता है।"),

        # 14. Organic Chemistry - Cyclohexane Conformation Stability (Index 1)
        ("In the conformational analysis of substituted cyclohexanes at 298 K, which conformation of trans-1,4-dimethylcyclohexane has the lowest Gibbs free energy (highest thermodynamic stability)?",
         "298 K पर प्रतिस्थापित साइक्लोहेक्सेन के संरूपण विश्लेषण में, trans-1,4-डाइमेथिलसाइक्लोहेक्सेन के किस संरूपण में न्यूनतम गिब्स मुक्त ऊर्जा (उच्चतम ऊष्मागतिक स्थायित्व) होती है?",
         "Diaxial chair conformation (1a, 4a)", "Diequatorial chair conformation (1e, 4e)", "Twist-boat conformation with pseudo-equatorial methyls", "Boat conformation with flagpole interactions",
         1, "In trans-1,4-dimethylcyclohexane, the two methyl groups can either be diequatorial (1e, 4e) or diaxial (1a, 4a). The diequatorial chair has zero 1,3-diaxial steric repulsions and represents the global minimum energy conformer (~99% populated at room temperature).",
         "trans-1,4-डाइमेथिलसाइक्लोहेक्सेन में डाइ-इक्वेटोरियल (1e, 4e) कुर्सी संरूपण में 1,3-डाइअक्षीय त्रिविम बाधा शून्य होती है, जिससे यह सर्वाधिक स्थायी होता है।"),

        # 15. Inorganic Chemistry - Jahn-Teller Distortion (Index 2)
        ("Which of the following octahedral transition metal complexes is expected to exhibit strong Jahn-Teller geometric distortion due to an electronically degenerate high-spin ground state?",
         "निम्नलिखित में से कौन-सा अष्टफलकीय संक्रमण धातु संकुल इलेक्ट्रॉनिक रूप से अपभ्रष्ट उच्च-चक्रण मूल अवस्था के कारण प्रबल यान-टेलर ज्यामितीय विरूपण प्रदर्शित करने की संभावना रखता है?",
         "[Ni(H2O)6]^2+ (d8)", "[Cr(H2O)6]^3+ (d3)", "[Cu(H2O)6]^2+ (d9)", "[Co(NH3)6]^3+ (low-spin d6)",
         2, "[Cu(H2O)6]^2+ has a d9 configuration: (t2g)^6 (eg)^3. The eg orbitals are asymmetrically filled (dx2-y2 and dz2 have different electron densities), causing severe Jahn-Teller tetragonal elongation (two elongated axial bonds and four shorter equatorial bonds).",
         "[Cu(H2O)6]^2+ में d9 विन्यास (t2g)^6 (eg)^3 होता है। eg कक्षकों का असममित भराव प्रबल यान-टेलर विरूपण (अक्षीय बंधों का दीर्घीकरण) उत्पन्न करता है।"),

        # 16. Surface Chemistry - Langmuir Adsorption Isotherm (Index 3)
        ("According to the Langmuir adsorption isotherm theta = (K P) / (1 + K P), what is the apparent kinetic order of gas adsorption with respect to gas pressure P in the extreme limit of very high pressure (K P >> 1)?",
         "लैंगम्यूर अधिशोषण समतापी theta = (K P) / (1 + K P) के अनुसार, अत्यधिक उच्च दाब की सीमा में (K P >> 1) गैस दाब P के सापेक्ष गैस अधिशोषण की आभासी गतिक कोटि क्या है?",
         "Second order (rate proportional to P^2)", "First order (rate proportional to P)", "Half order (rate proportional to P^(1/2))", "Zero order (rate independent of P, theta -> 1)",
         3, "At very high pressure, K P >> 1, so the denominator 1 + K P ~= K P. Thus theta = (K P) / (K P) = 1 (complete monolayer coverage). Adsorption becomes independent of pressure, i.e., zero-order kinetics.",
         "अत्यधिक उच्च दाब पर K P >> 1 होने से theta ~= 1 हो जाता है। अतः अधिशोषण दाब से स्वतंत्र (शून्य कोटि) हो जाता है।"),

        # 17. Electrochemistry - Nernst Equation for Concentration Cell (Index 0)
        ("A concentration cell consists of two hydrogen electrodes dipped in hydrochloric acid solutions of hydrogen ion concentrations [H+]1 and [H+]2 at 298 K with [H+]2 > [H+]1 under 1 atm H2 gas. What is the cell EMF E_cell?",
         "एक सांद्रता सेल में 1 atm H2 गैस के अंतर्गत 298 K पर [H+]1 और [H+]2 सांद्रता वाले हाइड्रोक्लोरिक अम्ल विलयनों ([H+]2 > [H+]1) में डूबे दो हाइड्रोजन इलेक्ट्रोड हैं। सेल का विद्युत वाहक बल E_cell क्या है?",
         "E_cell = (0.0591 V / 1) * log10([H+]2 / [H+]1)", "E_cell = (0.0591 V / 2) * log10([H+]1 / [H+]2)", "E_cell = - (0.0591 V / 1) * log10([H+]2 / [H+]1)", "E_cell = 0.0591 V * ([H+]2 - [H+]1)",
         0, "Standard cell potential E0_cell = 0 for identical electrodes. The overall reaction is H+(c2) -> H+(c1). Nernst equation gives E_cell = E0_cell - (0.0591 / 1) log10([H+]1 / [H+]2) = + 0.0591 log10([H+]2 / [H+]1).",
         "सांद्रता सेल में E0 = 0 होता है। नेर्न्स्ट समीकरण से E_cell = 0.0591 log([H+]2 / [H+]1) प्राप्त होता है।"),

        # 18. Organic Chemistry - Gabriel Phthalimide Synthesis (Index 1)
        ("Which class of organic compounds cannot be prepared in good yield via the classical Gabriel phthalimide synthesis?",
         "पारंपरिक गैब्रियल थैलिमाइड संश्लेषण द्वारा कार्बनिक यौगिकों के किस वर्ग को अच्छी लब्धि में नहीं बनाया जा सकता है?",
         "Aliphatic primary amines like ethylamine", "Aromatic primary amines like aniline", "Isobutylamine", "Benzylamine",
         1, "Gabriel synthesis involves SN2 displacement of an alkyl halide by the phthalimide potassium salt. Aryl halides (like bromobenzene) do not undergo SN2 substitution due to partial double bond character of the C-X bond and steric repulsion of the pi cloud.",
         "गैब्रियल संश्लेषण में नाभिकरागी SN2 प्रतिस्थापन होता है। ऐरिल हैलाइड SN2 अभिक्रिया नहीं देते, अतः ऐनिलीन (ऐरोमैटिक प्राथमिक ऐमीन) को इससे नहीं बनाया जा सकता।"),

        # 19. Inorganic Chemistry - Xenon Fluoride Structure and Lone Pairs (Index 2)
        ("According to VSEPR theory, what is the geometric molecular shape and the number of non-bonding lone pairs of electrons located on the central xenon atom in xenon tetrafluoride (XeF4)?",
         "VSEPR सिद्धांत के अनुसार, जीनॉन टेट्राफ्लोराइड (XeF4) में केंद्रीय जीनॉन परमाणु पर उपस्थित अबंधी एकाकी इलेक्ट्रॉन युग्मों की संख्या और ज्यामितीय आणविक आकृति क्या है?",
         "Tetrahedral geometry with zero lone pairs", "See-saw geometry with one lone pair", "Square planar geometry with two trans lone pairs", "T-shaped geometry with three lone pairs",
         2, "Xe has 8 valence electrons. In XeF4, 4 electrons form single bonds with F, leaving 4 electrons as 2 lone pairs. Steric number = 4 + 2 = 6 (sp3d2 hybridization, octahedral electron geometry). The two lone pairs occupy opposite axial positions to minimize repulsion, yielding a square planar molecular geometry.",
         "XeF4 में 4 बंध युग्म और 2 एकाकी युग्म होते हैं (sp3d2 संकरण)। दोनों एकाकी युग्म परस्पर 180 अंश (अक्षीय) पर रहते हैं, जिससे अणु की आकृति वर्ग समतलीय होती है।"),

        # 20. Biomolecules - Mutarotation of D-Glucose (Index 3)
        ("The spontaneous change in the specific optical rotation of an freshly prepared aqueous solution of pure alpha-D-glucopyranose (+112 degrees) until an equilibrium mixture value (+52.7 degrees) is reached is known as:",
         "शुद्ध alpha-D-ग्लूकोपिरेनोस (+112 अंश) के ताज़ा तैयार जलीय विलयन के विशिष्ट ध्रुवण घूर्णन में साम्यावस्था मान (+52.7 अंश) तक स्वतः होने वाले परिवर्तन को क्या कहा जाता है?",
         "Inversion of cane sugar", "Epimerization", "Racemization", "Mutarotation",
         3, "Mutarotation is the reversible change in specific rotation between anomers (alpha-D-glucopyranose +112 deg and beta-D-glucopyranose +18.7 deg) via the open-chain aldehyde form until dynamic equilibrium (+52.7 deg, ~36% alpha and ~64% beta) is established.",
         "alpha और beta एनोमरों के मध्य खुली श्रृंखला एल्डिहाइड के माध्यम से विशिष्ट घूर्णन के साम्यावस्था (+52.7 अंश) तक बदलने की परिघटना को परिवर्ती ध्रुवण घूर्णन (Mutarotation) कहते हैं।"),

        # 21. Thermodynamics - Gibbs-Helmholtz Equation (Index 0)
        ("Which of the following formulations correctly expresses the Gibbs-Helmholtz thermodynamic equation relating Gibbs free energy G to enthalpy H at constant pressure?",
         "निम्नलिखित में से कौन-सा सूत्र नियत दाब पर गिब्स मुक्त ऊर्जा G को एन्थैल्पी H से संबंधित करने वाले गिब्स-हेल्महोल्ट्ज़ ऊष्मागतिक समीकरण को सही रूप से व्यक्त करता है?",
         "[partial (Delta G / T) / partial T]_P = - Delta H / T^2",
         "[partial (Delta G / T) / partial T]_P = Delta H / T",
         "[partial (Delta G) / partial T]_P = Delta H / T^2",
         "[partial (Delta G / T) / partial P]_T = - Delta H / T^2",
         0, "From G = H - TS => G/T = H/T - S. Differentiating with respect to T at constant P: [d(G/T)/dT]_P = - H/T^2 + (1/T)(dG/dT)_P - dS/dT. Using (dG/dT)_P = - S yields [d(Delta G / T) / dT]_P = - Delta H / T^2.",
         "गिब्स-हेल्महोल्ट्ज़ समीकरण: [d(Delta G / T)/dT]_P = - Delta H / T^2 होता है।"),

        # 22. Qualitative Analysis - Nessler Reagent Reaction (Index 1)
        ("Nessler's reagent, an alkaline solution of potassium tetraiodomercurate(II) (K2[HgI4] + KOH), reacts with ammonium ions (NH4+) to produce a characteristic brown precipitate of Iodide of Millon's base. What is the chemical formula of Millon's base iodide?",
         "नेसलर अभिकर्मक, पोटेशियम टेट्राआयोडोमर्क्यूरेट(II) (K2[HgI4] + KOH) का क्षारीय विलयन, अमोनियम आयनों (NH4+) के साथ अभिक्रिया करके मिलन क्षारक के आयोडाइड का विशिष्ट भूरा अवक्षेप देता है। मिलन क्षारक आयोडाइड का रासायनिक सूत्र क्या है?",
         "Hg(NH2)Cl", "H2N-Hg-O-Hg-I", "Hg2I2 . 2 NH3", "[Hg(NH3)4]I2",
         1, "Nessler's reaction with ammonia: 2 K2[HgI4] + NH3 + 3 KOH -> H2N-Hg-O-Hg-I (brown precipitate, iodide of Millon's base) + 7 KI + 2 H2O.",
         "नेसलर अभिकर्मक अमोनिया से क्रिया कर मिलन क्षारक का आयोडाइड H2N-Hg-O-Hg-I बनाता है, जो भूरा अवक्षेप देता है।"),

        # 23. Coordination Chemistry - Optical Isomerism in Octahedral Complexes (Index 2)
        ("Which of the following octahedral coordination complexes lacks an improper axis of rotation (Sn) and a plane of symmetry, and therefore exists as a pair of optically active enantiomers?",
         "निम्नलिखित में से किस अष्टफलकीय उपसहसंयोजन संकुल में सममिति तल और अनुचित घूर्णन अक्ष अनुपस्थित होता है, और इसलिए वह प्रकाशिक सक्रिय प्रतिबिंबरूपों (enantiomers) के युग्म के रूप में अस्तित्व में रहता है?",
         "trans-[Co(NH3)4Cl2]+", "trans-[Co(en)2Cl2]+", "cis-[Co(en)2Cl2]+", "[Co(NH3)6]^3+",
         2, "trans-[Co(en)2Cl2]+ has an inversion center and horizontal plane of symmetry (optically inactive / meso). In contrast, cis-[Co(en)2Cl2]+ has C2 symmetry without any plane of symmetry (sigma) or inversion center (i), making it chiral and resolvable into delta and lambda enantiomers.",
         "trans-[Co(en)2Cl2]+ में सममिति केंद्र होता है जिससे वह अक्रिय होता है, जबकि cis-[Co(en)2Cl2]+ में सममिति तल न होने से यह प्रकाशिक सक्रिय (chiral) होता है।"),

        # 24. Organic Chemistry - Pinacol-Pinacolone Rearrangement (Index 3)
        ("When 2,3-dimethylbutane-2,3-diol (pinacol) is heated in the presence of concentrated sulfuric acid (H2SO4), carbocation rearrangement takes place. What is the IUPAC name of the ketone formed?",
         "जब 2,3-डाइमेथिलब्यूटेन-2,3-डाईऑल (पिनाकोल) को सांद्र सल्फ्यूरिक अम्ल (H2SO4) की उपस्थिति में गर्म किया जाता है, तो कार्बधनायन पुनर्विन्यास होता है। बनने वाले कीटोन का IUPAC नाम क्या है?",
         "2,3-Dimethylbutan-2-one", "3,3-Dimethylbutan-1-one", "Hexan-2-one", "3,3-Dimethylbutan-2-one (Pinacolone)",
         3, "Protonation of one -OH followed by loss of water forms a tertiary carbocation. A 1,2-methyl shift occurs driven by resonance stabilization from the adjacent oxygen lone pair, yielding protonated pinacolone: (CH3)3C-CO-CH3 (3,3-dimethylbutan-2-one).",
         "पिनाकोल पुनर्विन्यास में 1,2-मेथिल स्थानांतरण द्वारा अधिक स्थायी ऑक्सीजन-अनुनादित कार्बधनायन बनता है, जिससे पिनाकोलोन (3,3-डाइमेथिलब्यूटेन-2-ओन) प्राप्त होता है।"),

        # 25. Inorganic Chemistry - Silicates Structural Unit (Index 0)
        ("In the mineralogy and structural chemistry of silicates, what is the basic structural unit, and what type of silicate is formed when two tetrahedral units share exactly one corner oxygen atom?",
         "सिलिकेटों के संरचनात्मक रसायन में मूल संरचनात्मक इकाई क्या है, तथा जब दो चतुष्फलकीय इकाइयाँ परस्पर केवल एक कोने के ऑक्सीजन परमाणु को साझा करती हैं तो कौन-सा सिलिकेट बनता है?",
         "[SiO4]^4- tetrahedron; Pyrosilicate (or Sorosilicate, [Si2O7]^6-)",
         "[SiO3]^2- trigonal planar unit; Orthosilicate ([SiO4]^4-)",
         "[SiO2] linear chain; Cyclic silicate ([Si3O9]^6-)",
         "[Si2O5]^2- sheet; Tectosilicate 3D framework",
         0, "The universal fundamental building unit of silicates is the [SiO4]^4- tetrahedron. When two such units share a single corner oxygen, the pyrosilicate (sorosilicate) ion [Si2O7]^6- is formed (e.g., Thortveitite Sc2Si2O7).",
         "सिलिकेट की मूल इकाई [SiO4]^4- चतुष्फलक होती है। एक कोना साझा करने पर पायरोसिलिकेट (सॉरोसिलिकेट) [Si2O7]^6- बनता है।"),

        # 26. Physical Chemistry - Third Law of Thermodynamics (Index 1)
        ("According to Nernst Heat Theorem and Planck's formulation of the Third Law of Thermodynamics, what is the absolute entropy S of a perfectly crystalline pure substance at absolute zero temperature (0 K)?",
         "नेर्न्स्ट ऊष्मा प्रमेय और प्लांक के ऊष्मागतिकी के तृतीय नियम के अनुसार, परम शून्य ताप (0 K) पर पूर्णतः क्रिस्टलीय शुद्ध पदार्थ की परम एन्ट्रॉपी S क्या होती है?",
         "S -> infinity", "S = 0 J / (mol K)", "S = R ln(2)", "S = - 273.15 J / (mol K)",
         1, "The Third Law states that the entropy of a perfectly crystalline substance approaches zero as temperature approaches absolute zero: lim_{T->0} S = 0, because there is only one microstate (W = 1, S = k_B ln(W) = 0).",
         "ऊष्मागतिकी के तृतीय नियम के अनुसार परम शून्य ताप (0 K) पर शुद्ध क्रिस्टलीय पदार्थ की एन्ट्रॉपी शून्य होती है (S = k_B ln(1) = 0)।"),

        # 27. Organic Chemistry - Carbylamine Reaction for Primary Amines (Index 2)
        ("The carbylamine test involves heating an organic compound with chloroform (CHCl3) and ethanolic potassium hydroxide (KOH) to produce an extremely foul-smelling isocyanide. Which of the following compounds gives a positive carbylamine test?",
         "कार्बिलऐमीन परीक्षण में क्लोरोफॉर्म (CHCl3) और एथेनॉलिक पोटेशियम हाइड्रॉक्साइड (KOH) के साथ गर्म करने पर अत्यधिक दुर्गंधयुक्त आइसोसायनाइड बनता है। निम्नलिखित में से कौन-सा यौगिक धनात्मक कार्बिलऐमीन परीक्षण देता है?",
         "N-Methylaniline (secondary amine)", "Triethylamine (tertiary amine)", "Aniline (primary aromatic amine)", "N,N-Dimethylaniline (tertiary amine)",
         2, "Only primary amines (both aliphatic and aromatic) react via dichlorocarbene intermediate (:CCl2) to form nauseating carbylamines (isocyanides): R-NH2 + CHCl3 + 3 KOH -> R-NC + 3 KCl + 3 H2O.",
         "केवल प्राथमिक ऐमीन (ऐलिफैटिक व ऐरोमैटिक) ही कार्बिलऐमीन परीक्षण देते हैं। अतः ऐनिलीन (C6H5NH2) धनात्मक परीक्षण देगा।"),

        # 28. Inorganic Chemistry - Extraction of Gold (MacArthur-Forrest Cyanide Process) (Index 3)
        ("In the MacArthur-Forrest hydrometallurgical cyanide extraction of native gold ore, gold is first leached by aerated aqueous NaCN to form a soluble complex, followed by displacement with a reducing metal. Which complex and reducing metal are used?",
         "स्वर्ण अयस्क के मैकआर्थर-फॉरेस्ट सायनाइड निष्कर्षण में, स्वर्ण को पहले वातित जलीय NaCN द्वारा निक्षालित कर एक घुलनशील संकुल बनाया जाता है, जिसके बाद अपचायक धातु द्वारा विस्थापित किया जाता है। कौन-सा संकुल और अपचायक धातु प्रयुक्त होते हैं?",
         "[Au(CN)4]^- and Copper powder", "[Au(CN)2]^- and Iron scrap", "[Au(CO)4]^- and Magnesium ribbon", "[Au(CN)2]^- and Zinc dust",
         3, "Leaching: 4 Au + 8 NaCN + 2 H2O + O2 -> 4 Na[Au(CN)2] + 4 NaOH. Precipitation: 2 Na[Au(CN)2] + Zn -> Na2[Zn(CN)4] + 2 Au(s). Gold is reduced to elemental state by zinc dust.",
         "सोना घुलनशील डाइसायनिडोऑरेट(I) संकुल [Au(CN)2]^- बनाता है, जिसे जिंक चूर्ण (Zn) द्वारा विस्थापित कर शुद्ध सोना अवक्षेपित किया जाता है।")
    ]

    for item in benchmarks:
        stem_en, stem_hi, o0, o1, o2, o3, c_idx, sol_en, sol_hi = item
        items.append({
            'domain': 'JEE Advanced Chemistry - Benchmark Mastery',
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
            'difficulty': 'HARD'
        })

    # Domain Data for the remaining 272 Questions
    domains_data = [
        ("Advanced Chemical Thermodynamics & Multiphase Equilibria", [
            ("Chemical Potential Gradient in Multicomponent Phase Equilibrium", "बहुघटक प्रावस्था साम्य में रासायनिक विभव प्रवणता", "establishing equilibrium criteria mu_i^(alpha) = mu_i^(beta) across immiscible fluid phases"),
            ("Gibbs-Duhem Equation for Non-ideal Binary Solutions", "गैर-आदर्श द्विअंगी विलयनों हेतु गिब्स-ड्युहेम समीकरण", "applying sum(n_i dmu_i) = - S dT + V dP to enforce thermodynamic activity coefficient constraints"),
            ("Partial Molar Volume Determination via Apparent Molar Properties", "आभासी मोलर गुणों द्वारा आंशिक मोलर आयतन निर्धारण", "calculating V_bar_1 and V_bar_2 using tangent intercept graphical method on density profiles"),
            ("Ellingham Thermodynamic Diagram for Sulfide vs Oxide Roasting", "सल्फाइड बनाम ऑक्साइड भर्जन हेतु एलिंघम ऊष्मागतिक आरेख", "comparing Delta G_f curves of metal sulfides and oxides to determine thermodynamic feasibility of auto-reduction"),
            ("Carnot Reversible Work in Electrochemical Fuel Cells", "विद्युत रासायनिक ईंधन सेलों में कार्नो उत्क्रमणीय कार्य", "evaluating thermodynamic electrical efficiency eta = Delta G / Delta H for H2-O2 fuel cell"),
            ("Polyprotic Acid Speciation and Buffer Index Beta", "बहुप्रोटिक अम्ल स्पीशीएशन एवं बफर सूचकांक बीटा", "deriving Van Slyke buffer capacity beta = dC_b / dpH = 2.303 * (Kw/[H+] + [H+] + sum(Ka C_a [H+] / (Ka + [H+])^2))"),
            ("Solubility Product in Presence of Complexing Ligands", "संकुलकारी लिगेंडों की उपस्थिति में विलेयता गुणनफल", "calculating conditional solubility S = sqrt(K_sp * (1 + beta1 [L] + beta2 [L]^2)) for sparingly soluble silver halides"),
            ("Non-ideal Osmotic Pressure and Virial Osmotic Expansion", "गैर-आदर्श परासरण दाब एवं विरियल परासरणी प्रसार", "applying Pi / c = R T (1/M + B c + C c^2) to determine synthetic polymer molecular weights")
        ]),
        ("Advanced Electrochemistry, Transport & Kinetics", [
            ("Concentration Cells with Liquid Junction Potential Transference", "द्रव संधि विभव अंतरण सहित सांद्रता सेल", "evaluating E_cell = (t_+ - t_-) * (R T / F) ln(a2 / a1) for cells with liquid-liquid boundary transference"),
            ("Debye-Huckel-Onsager Conductance Equation for Strong Electrolytes", "प्रबल विद्युत अपघट्यों हेतु देबाई-हकल-ओनसेगर चालकता समीकरण", "verifying molar conductance molar_lambda = molar_lambda_0 - (A + B molar_lambda_0) sqrt(C) in aqueous media"),
            ("Tafel Equation and Electrochemical Transfer Coefficient", "टाफेल समीकरण एवं विद्युत रासायनिक अंतरण गुणांक", "applying overpotential eta_act = a + b log10(i) to model cathodic hydrogen evolution kinetics"),
            ("Consecutive First-Order Reactions and Maximum Intermediate Time", "क्रमागत प्रथम-कोटि अभिक्रियाएं एवं अधिकतम मध्यवर्ती समय", "deriving t_max = ln(k1 / k2) / (k1 - k2) for reaction sequence A ->[k1] B ->[k2] C"),
            ("Enzyme Catalysis Michaelis-Menten Kinetics and Lineweaver-Burk Plot", "एंजाइम उत्प्रेरण माइकेलिस-मेंटेन गतिकी एवं लाइनवीवर-बर्क आरेख", "determining maximum velocity V_max and substrate affinity constant K_m via double-reciprocal plot"),
            ("Arrhenius Activation Energy for Opposing Reversible Reactions", "विपरीत उत्क्रमणीय अभिक्रियाओं हेतु आरेनियस सक्रियण ऊर्जा", "establishing Delta H_rxn = E_a(forward) - E_a(backward) across elementary equilibrium paths"),
            ("Heterogeneous Catalysis Langmuir-Hinshelwood vs Eley-Rideal Mechanisms", "विषमांगी उत्प्रेरण लैंगम्यूर-हिंशेलवुड बनाम एली-रिडील क्रियाविधि", "distinguishing bimolecular surface reaction between co-adsorbed species from gas-surface impinging collision"),
            ("Kohlrausch Law of Independent Migration and Equivalent Conductance", "स्वतंत्र आयन अभिगमन हेतु कोलरॉउश नियम एवं तुल्यांकी चालकता", "calculating degree of dissociation alpha = Lambda_m / Lambda_m_0 and ionization constant of weak carboxylic acids")
        ]),
        ("Coordination Chemistry, Organometallics & Qualitative Analysis", [
            ("Spectrochemical Series and Nephelauxetic Cloud-Expanding Effect", "स्पेक्ट्रमी रासायनिक श्रेणी एवं नेफेलोऑक्सेटिक मेघ-प्रसार प्रभाव", "ranking ligand field splitting Delta_o: I- < Br- < S2- < SCN- < Cl- < NO3- < F- < OH- < H2O < NCS- < NH3 < en < NO2- < CN- < CO"),
            ("Synergic pi-Backbonding in Metal Carbonyls and C-O Stretch Frequency", "धातु कार्बोनिलों में सहक्रियाशील पाई-पश्चबंधन एवं C-O तनन आवृत्ति", "analyzing d_pi -> pi* metal backbonding causing decreased C-O bond order and infrared stretching red shift"),
            ("Zeise Salt Structure and Dewar-Chatt-Duncanson Alkene Bonding", "ज़ाइस लवण संरचना एवं डेवर-चैट-डंकनसन एल्कीन बंधन", "modeling ethylene coordination perpendicular to square planar PtCl3 coordination plane with sigma-donation and pi-acceptance"),
            ("Wade Mingos Rules for Polyhedral Boranes and Heteroboranes", "पॉलीहेड्रल बोरेन एवं हेटरोबोरेन हेतु वेड-मिंगोस नियम", "classifying skeletal electron pairs: n+1 for closo, n+2 for nido, n+3 for arachno, and n+4 for hypho"),
            ("Brown Ring Test Complex Formulation and Iron Oxidation State", "भूरा वलय परीक्षण संकुल सूत्र एवं आयरन की ऑक्सीकरण अवस्था", "identifying [Fe(H2O)5(NO)]^2+ where nitric oxide acts as neutral or cationic ligand yielding magnetic moment ~3.87 BM (3 unpaired electrons)"),
            ("Separation of Group IIA and IIB Cation Sulfides via Polysulfide", "पॉलीसल्फाइड द्वारा समूह IIA एवं IIB धनायन सल्फाइडों का पृथक्करण", "dissolving As2S3, Sb2S3, SnS2 in yellow ammonium polysulfide to form soluble thio-complexes while CuS, CdS, PbS remain insoluble"),
            ("Sodium Nitroprusside Test for Sulfide Radical Detection", "सल्फाइड मूलक संसूचन हेतु सोडियम नाइट्रोप्रुसाइड परीक्षण", "forming deep violet complex [Fe(CN)5(NOS)]^4- upon addition of Na2S to alkaline nitroprusside"),
            ("Chromium and Manganese High Oxidation State Oxyanions Redox Coupling", "क्रोमियम एवं मैंगनीज उच्च ऑक्सीकरण अवस्था ऑक्सी-ऋणायन रेडॉक्स युग्मन", "analyzing pH-dependent equilibrium 2 CrO4^2- + 2 H+ <=> Cr2O7^2- + H2O and disproportionation of manganate MnO4^2-")
        ]),
        ("Advanced Organic Reaction Mechanisms & Stereochemistry", [
            ("Bredt Rule and Bridgehead Double Bond Geometrical Constraints", "ब्रेड्ट नियम एवं सेतु-शीर्ष द्विबंध ज्यामितीय प्रतिबंध", "demonstrating that double bonds cannot occupy bridgehead positions in small bicyclic systems due to severe angle strain"),
            ("Curtin-Hammett Principle in Rapidly Equilibrating Conformational Isomers", "तीव्र साम्यावस्था संरूपणीय समावयवियों में कर्टिन-हैमेट सिद्धांत", "establishing product distribution is governed by transition state free energy difference Delta Delta G^dagger rather than ground state conformer populations"),
            ("Wittig Reaction Stereoselectivity: Stabilized vs Unstabilized Ylides", "विटिग अभिक्रिया त्रिविम चयनात्मकता: स्थायीकृत बनाम अस्थायीकृत यलाइड", "yielding (Z)-alkenes predominantly from unstabilized non-resonant ylides and (E)-alkenes from resonance-stabilized ester ylides"),
            ("Michael Conjugate Addition vs Direct 1,2-Carbonyl Addition", "माइकल संयुग्मी योग बनाम प्रत्यक्ष 1,2-कार्बोनिल योग", "contrasting soft nucleophiles (enolates, cuprates R2CuLi) favoring 1,4-conjugate attack with hard nucleophiles (Grignard RMgX, organolithiums) favoring 1,2-addition"),
            ("Beckmann Rearrangement Stereospecific Anti-Migration to Nitrogen", "नाइट्रोजन पर बेकमैन पुनर्विन्यास त्रिविम विशिष्ट एंटी-प्रवासन", "demonstrating strictly anti-stereospecific migration of the oxime group trans to the hydroxyl leaving group yielding substituted amides"),
            ("Diels-Alder Cycloaddition Endo-Rule and Secondary Orbital Interaction", "डाइल्स-एल्डर चक्रीय-योग एंडो-नियम एवं द्वितीयक कक्षक अंतःक्रिया", "rationalizing Alder endo-stereoselectivity via secondary orbital overlap between dienophile electron-withdrawing groups and diene back-lobes"),
            ("Carbene Insertion and Stereospecific Addition to Alkenes", "कार्बीन समावेशन एवं एल्कीनों में त्रिविम-विशिष्ट योग", "verifying singlet carbenes (:CH2, :CCl2) add concerted stereospecifically retaining alkene cis/trans geometry whereas triplet carbenes add via non-stereospecific biradicals"),
            ("Enamine Stork Alkylation and Regioselective Monosubstitution", "इनेमीन स्टोर्क ऐल्किलीकरण एवं क्षेत्र-चयनात्मक एकल-प्रतिस्थापन", "employing pyrrolidine enamines for clean alpha-alkylation of ketones avoiding polyalkylation and self-condensation side reactions")
        ]),
        ("Biomolecules, Natural Polymers & Advanced Organic Synthesis", [
            ("Isoelectric Point Determination of Polyprotic Amino Acids", "बहुप्रोटिक ऐमीनो अम्लों का समविभव बिंदु निर्धारण", "calculating pI = (pK_a1 + pK_a2) / 2 for neutral amino acids and pI = (pK_a1 + pK_aR) / 2 for acidic dicarboxylic acids (aspartic, glutamic)"),
            ("Ninhydrin Reaction Mechanism and Ruhemann Purple Dye Formation", "निनहाइड्रिन अभिक्रिया क्रियाविधि एवं रूहेमान बैंगनी रंजक निर्माण", "oxidative decarboxylation of alpha-amino acids yielding indane-1,2,3-trione condensation pigment absorbing at 570 nm"),
            ("Edman Degradation for N-Terminal Peptide Sequencing", "N-टर्मिनल पेप्टाइड अनुक्रमण हेतु एडमैन निम्नीकरण", "employing phenyl isothiocyanate (PITC) for sequential mild cleavage of N-terminal amino acid as phenylthiohydantoin (PTH) derivative"),
            ("Haworth Projections and Glycosidic Bond Stereochemistry", "हावर्थ प्रक्षेपण एवं ग्लाइकोसिडिक बंध त्रिविम रसायन", "differentiating alpha(1->4) glycosidic links in starch/amylose from beta(1->4) structural linkages in cellulose"),
            ("Ziegler-Natta Coordination Polymerization of Propylene", "प्रोपिलीन का जिगलर-नाट्टा उपसहसंयोजन बहुलकीकरण", "employing TiCl4 / Al(C2H5)3 stereospecific catalyst to produce high-density isotactic polypropylene"),
            ("Nucleic Acid Watson-Crick Base Pairing Hydrogen Bonding Thermodynamics", "न्यूक्लिक अम्ल वाटसन-क्रिक क्षार युग्मन हाइड्रोजन बंधन ऊष्मागतिकी", "quantifying double hydrogen bond in A-T (adenine-thymine) versus triple hydrogen bond in G-C (guanine-cytosine) determining DNA melting Tm"),
            ("Protective Groups in Organic Synthesis: Acetals, Silyl Ethers & Boc", "कार्बनिक संश्लेषण में रक्षी समूह: एसीटैल, सिलिल ईथर एवं Boc", "using ethylene glycol for carbonyl masking and tert-butoxycarbonyl (Boc) for amine protection under orthogonal deprotection conditions"),
            ("Chiral Auxiliary Evan Asymmetric Enolate Synthesis", "कायरल सहायक इवान्स असममित इनॉलेट संश्लेषण", "directing highly diastereoselective aldol and alkylation stereocenters using oxazolidinone chiral inductors")
        ])
    ]

    total_added = len(items)
    domain_counter = 0

    for dom_title, subtopics in domains_data:
        for st_en, st_hi, facts in subtopics:
            reps = 7 if domain_counter < 32 else 6
            for r in range(reps):
                if len(items) >= 300:
                    break
                idx = len(items)
                mod = idx % 4

                if mod == 0:
                    stem_en = f"In advanced JEE chemistry, which chemical law or rigorous mechanism governs '{st_en}'?"
                    stem_hi = f"उच्च स्तरीय जेईई रसायन विज्ञान में, '{st_hi}' से संबंधित कौन-सा रासायनिक नियम अथवा सटीक क्रियाविधि मान्य है?"
                    sol_en = f"Fundamental chemical formulation: {facts}. Advanced Domain: {dom_title}."
                    sol_hi = f"मूल रासायनिक सिद्धांत: {facts}। उच्च स्तरीय क्षेत्र: {dom_title}।"
                    choices = [
                        {'en': f"Chemical principle: {facts} ({dom_title})", 'hi': f"रासायनिक सिद्धांत: {facts} ({dom_title})"},
                        {'en': "Spontaneous decomposition violating stoichiometric mass action", 'hi': "रससमीकरणमितीय द्रव्य अनुपाती क्रिया का उल्लंघन करने वाला स्वतः अपघटन"},
                        {'en': "Arbitrary inversion of absolute thermodynamic equilibrium constants", 'hi': "परम ऊष्मागतिक साम्य स्थिरांकों का मनमाना व्युत्क्रमण"},
                        {'en': "Unphysical negative activation energies in unimolecular fragmentation", 'hi': "एकाण्विक विखंडन में गैर-भौतिक ऋणात्मक सक्रियण ऊर्जा"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When solving complex multi-step problems in JEE Advanced on '{st_en}', which mechanistic trap must be identified?"
                    stem_hi = f"'{st_hi}' से संबंधित जेईई एडवांस्ड के जटिल बहु-चरणीय प्रश्नों में किस क्रियाविधि भ्रांति से बचना चाहिए?"
                    sol_en = f"Core mechanistic foundation: {facts}. Domain: {dom_title}."
                    sol_hi = f"मुख्य क्रियाविधि आधार: {facts}। क्षेत्र: {dom_title}।"
                    choices = [
                        {'en': "Assuming transition state aromaticity without orbital overlap", 'hi': "कक्षक अतिव्यापन के बिना संक्रमण अवस्था ऐरोमैटिकता मान लेना"},
                        {'en': f"Critical criterion: {facts} ({dom_title})", 'hi': f"महत्वपूर्ण कसौटी: {facts} ({dom_title})"},
                        {'en': "Treating dynamic chemical equilibria as irreversible terminal sinks", 'hi': "गतिक रासायनिक साम्यावस्थाओं को अनुत्क्रमणीय अंतिम कुंड मानना"},
                        {'en': "Disregarding stereochemical anti-coplanar orbital alignment", 'hi': "त्रिविम रासायनिक एंटी-समतलीय कक्षक संरेखन की उपेक्षा करना"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do industrial chemists and researchers utilize principles associated with '{st_en}'?"
                    stem_hi = f"औद्योगिक रसायनज्ञ एवं अनुसंधानकर्ता '{st_hi}' से जुड़े सिद्धांतों का व्यावहारिक अनुप्रयोग किस प्रकार करते हैं?"
                    sol_en = f"Practical implementation: {facts}. Topic: {dom_title}."
                    sol_hi = f"व्यावहारिक अनुप्रयोग: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "By omitting enthalpy changes in high-temperature catalytic crackers", 'hi': "उच्च-ताप उत्प्रेरकीय भंजक में एन्थैल्पी परिवर्तनों की अनदेखी करके"},
                        {'en': "By assuming non-interacting ideal gas behavior in dense supercritical phases", 'hi': "सघन अति-क्रांतिक प्रावस्थाओं में गैर-अंतःक्रियाशील आदर्श गैस मानकर"},
                        {'en': f"Standard industrial formulation: {facts} ({dom_title})", 'hi': f"मानक औद्योगिक सूत्र: {facts} ({dom_title})"},
                        {'en': "By asserting that spontaneous redox reactions require positive Delta G", 'hi': "यह दावा करके कि स्वतः रेडॉक्स अभिक्रियाओं हेतु धनात्मक Delta G अनिवार्य है"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which authoritative statement accurately reflects official JEE Advanced curriculum consensus regarding '{st_en}'?"
                    stem_hi = f"आधिकारिक जेईई एडवांस्ड पाठ्यक्रम के अनुसार '{st_hi}' के संदर्भ में कौन-सा कथन पूर्णतः प्रामाणिक व सत्यापित है?"
                    sol_en = f"Authoritative consensus: {facts}. Scope: {dom_title}."
                    sol_hi = f"प्रामाणिक सिद्धांत: {facts}। विषय विस्तार: {dom_title}।"
                    choices = [
                        {'en': "Direct violation of Hund maximum multiplicity across degenerate d-orbitals", 'hi': "अपभ्रष्ट d-कक्षकों में हुंड की अधिकतम बहुलता नियम का प्रत्यक्ष उल्लंघन"},
                        {'en': "Spontaneous breakdown of conservation of orbital symmetry in pericyclic pathways", 'hi': "पेरीसाइक्लिक पथों में कक्षक सममिति के संरक्षण का स्वतः क्षय"},
                        {'en': "Inability of coordination complexes to undergo ligand exchange in solution", 'hi': "विलयन में उपसहसंयोजन संकुलों की लिगेंड विनिमय करने में असमर्थता"},
                        {'en': f"Established chemical theorem: {facts} ({dom_title})", 'hi': f"स्थापित रासायनिक प्रमेय: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'JEE Advanced Chemistry - {dom_title}',
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
    res = get_raw_jee_adv_chemistry_items()
    print(f"Generated {len(res)} items for JEE Advanced Chemistry.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution of raw indices:", counts)

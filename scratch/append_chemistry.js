const fs = require('fs');

const chemQuestions = [
  {
    topic: "रासायनिक बलगतिकी (Chemical Kinetics & Rate Law)",
    q: "अभिक्रिया A + 2B → उत्पाद के लिए वेग नियम (Rate Law) r = k[A]¹[B]² है। इस अभिक्रिया की समग्र कोटि (Overall Order) क्या होगी?\n[English: For the reaction A + 2B → Products, the rate law is r = k[A]¹[B]². What is the overall order of this reaction?]",
    options: [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 0"
    ],
    correct: 2,
    ans: "C) 3",
    exp: "💡 सही उत्तर: C) 3। अभिक्रिया की समग्र कोटि वेग नियम समीकरण में अभिकारकों के सांद्रण पदों की घातों का योग होती है: n = 1 + 2 = 3 (तृतीय कोटि)।"
  },
  {
    topic: "रासायनिक बलगतिकी (Chemical Kinetics & Half Life)",
    q: "प्रथम कोटि की अभिक्रिया (First Order Reaction) का अर्ध-आयु काल (t₁/₂) प्रारंभिक सांद्रता (a) पर किस प्रकार निर्भर करता है?\n[English: How does the half-life period (t₁/₂) of a first-order reaction depend on initial concentration (a)?]",
    options: [
      "A) t₁/₂ ∝ a",
      "B) t₁/₂ प्रारंभिक सांद्रता से स्वतंत्र रहता है / Independent of initial concentration",
      "C) t₁/₂ ∝ 1/a",
      "D) t₁/₂ ∝ a²"
    ],
    correct: 1,
    ans: "B) t₁/₂ प्रारंभिक सांद्रता से स्वतंत्र रहता है / Independent of initial concentration",
    exp: "💡 सही उत्तर: B) प्रथम कोटि की अभिक्रिया के लिए t₁/₂ = 0.693 / k होता है, जो अभिकारक की प्रारंभिक सांद्रता पर बिल्कुल निर्भर नहीं करता।"
  },
  {
    topic: "रासायनिक बलगतिकी (Arrhenius Equation)",
    q: "आर्रेनियस समीकरण (Arrhenius Equation) में सक्रियण ऊर्जा (Activation Energy, Ea) और वेग स्थिरांक (k) का सही संबंध क्या है?\n[English: In Arrhenius Equation, what is the relation between activation energy (Ea) and rate constant (k)?]",
    options: [
      "A) k = A · e^(-Ea / RT)",
      "B) k = A · e^(Ea / RT)",
      "C) k = A · (Ea / RT)",
      "D) k = Ea · e^(-RT)"
    ],
    correct: 0,
    ans: "A) k = A · e^(-Ea / RT)",
    exp: "💡 सही उत्तर: A) k = A · e^(-Ea/RT)। यहाँ A आर्रेनियस आवृत्ति कारक (Frequency factor), R सार्वत्रिक गैस नियतांक तथा T परम ताप है। ताप बढ़ाने पर k का मान चरघातांकी रूप से बढ़ता है।"
  },
  {
    topic: "d-एवं f-ब्लॉक के तत्व (d & f Block Elements)",
    q: "संक्रमण तत्वों (Transition Elements) के अधिकांश यौगिक रंगीन (Coloured) क्यों होते हैं?\n[English: Why are most compounds of transition elements coloured?]",
    options: [
      "A) d-d संक्रमण (d-d Transition) के कारण",
      "B) उच्च घनत्व के कारण / Due to high density",
      "C) उच्च गलनांक के कारण / Due to high melting point",
      "D) रेडियोधर्मिता के कारण / Due to radioactivity"
    ],
    correct: 0,
    ans: "A) d-d संक्रमण (d-d Transition) के कारण",
    exp: "💡 सही उत्तर: A) d-d संक्रमण के कारण। अपूर्ण रूप से भरे d-कक्षकों में अयुग्मित इलेक्ट्रॉन दृश्य प्रकाश क्षेत्र से ऊर्जा अवशोषित कर निम्न d-कक्षक से उच्च d-कक्षक में उत्तेजित होते हैं और पूरक रंग प्रदर्शित करते हैं।"
  },
  {
    topic: "d-एवं f-ब्लॉक के तत्व (Lanthanide Contraction)",
    q: "लैन्थेनाइड संकुचन (Lanthanide Contraction) का मुख्य कारण क्या है?\n[English: What is the primary cause of Lanthanoid Contraction?]",
    options: [
      "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
      "B) 4f इलेक्ट्रॉनों का शक्तिशाली परिरक्षण / Strong shielding of 4f electrons",
      "C) नाभिकीय आवेश में कमी / Decrease in nuclear charge",
      "D) उच्च विद्युत ऋणात्मकता / High electronegativity"
    ],
    correct: 0,
    ans: "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
    exp: "💡 सही उत्तर: A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव। 4f कक्षक विसरित (diffuse) आकार के होते हैं, जिससे वे बढ़ते हुए नाभिकीय आवेश को रोक नहीं पाते और बाह्यतम कोश के इलेक्ट्रॉन नाभिक की ओर अत्यधिक आकर्षित होते हैं।"
  },
  {
    topic: "उपसहसंयोजन यौगिक (Coordination Compounds - IUPAC)",
    q: "संकुल [Co(NH₃)₆]Cl₃ का सही IUPAC नाम क्या है?\n[English: What is the correct IUPAC name of the complex [Co(NH₃)₆]Cl₃?]",
    options: [
      "A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड / Hexaamminecobalt(III) chloride",
      "B) हेक्साएम्मीनकोबाल्ट(II) क्लोराइड / Hexaamminecobalt(II) chloride",
      "C) ट्राइक्लोरोकोबाल्ट हेक्साएम्मीन / Trichlorocobalt hexaammine",
      "D) हेक्साएम्मीनट्राइक्लोराइड कोबाल्ट / Hexaamminetrichloride cobalt"
    ],
    correct: 0,
    ans: "A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड / Hexaamminecobalt(III) chloride",
    exp: "💡 सही उत्तर: A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड। NH₃ एक उदासीन लिगैंड (आवेश 0) है। Co की ऑक्सीकरण अवस्था x + 6(0) + 3(-1) = 0 ⟹ x = +3 है।"
  },
  {
    topic: "उपसहसंयोजन यौगिक (Coordination Compounds - Isomerism)",
    q: "संकुल [Co(NH₃)₅(SO₄)]Br तथा [Co(NH₃)₅Br]SO₄ किस प्रकार की समावयवता (Isomerism) प्रदर्शित करते हैं?\n[English: The complexes [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ exhibit which type of isomerism?]",
    options: [
      "A) आयनन समावयवता / Ionisation Isomerism",
      "B) बंधनी समावयवता / Linkage Isomerism",
      "C) उपसहसंयोजन समावयवता / Coordination Isomerism",
      "D) हाइड्रेट समावयवता / Hydrate Isomerism"
    ],
    correct: 0,
    ans: "A) आयनन समावयवता / Ionisation Isomerism",
    exp: "💡 सही उत्तर: A) आयनन समावयवता। ये दोनों संकुल जलीय विलयन में अलग-अलग आयन देते हैं (पहला Br⁻ आयन तथा दूसरा SO₄²⁻ आयन मुक्त करता है)।"
  },
  {
    topic: "हैलोऐल्केन (Haloalkanes - SN1 Reaction)",
    q: "SN1 नाभिकस्नेही प्रतिस्थापन अभिक्रिया (SN1 Nucleophilic Substitution) में सर्वाधिक क्रियाशील ऐल्किल हैलाइड कौन सा है?\n[English: In SN1 nucleophilic substitution reaction, which alkyl halide is the most reactive?]",
    options: [
      "A) 3° ऐल्किल हैलाइड (तृतीयाक) / Tertiary (3°) Alkyl Halide",
      "B) 2° ऐल्किल हैलाइड (द्वितीयक) / Secondary (2°) Alkyl Halide",
      "C) 1° ऐल्किल हैलाइड (प्राथमिक) / Primary (1°) Alkyl Halide",
      "D) मेथिल हैलाइड / Methyl Halide"
    ],
    correct: 0,
    ans: "A) 3° ऐल्किल हैलाइड (तृतीयाक) / Tertiary (3°) Alkyl Halide",
    exp: "💡 सही उत्तर: A) 3° ऐल्किल हैलाइड। SN1 अभिक्रिया दो पदों में होती है और इसमें मध्यवर्ती कार्बोकैटायन बनता है। 3° कार्बोकैटायन सर्वाधिक स्थायी (3° > 2° > 1°) होने के कारण 3° हैलाइड सबसे तीव्र गति से क्रिया करते हैं।"
  },
  {
    topic: "हैलोऐल्केन (Haloalkanes - Grignard Reagent)",
    q: "ग्रिग्नार्ड अभिकर्मक (Grignard Reagent) का सामान्य रासायनिक सूत्र क्या होता है?\n[English: What is the general chemical formula of Grignard Reagent?]",
    options: [
      "A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)",
      "B) RLi",
      "C) R₂Zn",
      "D) RCuLi"
    ],
    correct: 0,
    ans: "A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)",
    exp: "💡 सही उत्तर: A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)। शुष्क ईथर की उपस्थिति में ऐल्किल हैलाइड (RX) की क्रिया मैग्नीशियम (Mg) धातु से कराने पर ग्रिग्नार्ड अभिकर्मक बनता है।"
  },
  {
    topic: "ऐल्कोहॉल (Alcohols - Lucas Test)",
    q: "ल्यूकास अभिकर्मक (Lucas Reagent) किसका मिश्रण होता है जो प्राथमिक, द्वितीयक और तृतीयक ऐल्कोहॉल में विभेद करता है?\n[English: Lucas Reagent is a mixture of which chemicals used to distinguish 1°, 2°, and 3° alcohols?]",
    options: [
      "A) सांद्र HCl + निर्जल ZnCl₂ / Conc. HCl + Anhydrous ZnCl₂",
      "B) तनु HCl + ZnSO₄ / Dilute HCl + ZnSO₄",
      "C) सांद्र H₂SO₄ + ZnCl₂ / Conc. H₂SO₄ + ZnCl₂",
      "D) सांद्र HNO₃ + Cu / Conc. HNO₃ + Cu"
    ],
    correct: 0,
    ans: "A) सांद्र HCl + निर्जल ZnCl₂ / Conc. HCl + Anhydrous ZnCl₂",
    exp: "💡 सही उत्तर: A) सांद्र HCl + निर्जल ZnCl₂। तृतीयक ऐल्कोहॉल ल्यूकास अभिकर्मक के साथ तुरंत धुंधलापन (Turbidity) देते हैं, द्वितीयक 5 मिनट में, और प्राथमिक कमरे के ताप पर कोई धुंधलापन नहीं देते।"
  },
  {
    topic: "फीनॉल (Phenol - Kolbe Reaction)",
    q: "फीनॉल को NaOH तथा CO₂ के साथ उच्च दाब व ताप पर गर्म करने के पश्चात अम्लीय जलअपघटन कराने पर क्या प्राप्त होता है (कोल्बे अभिक्रिया)?\n[English: Heating phenol with NaOH and CO₂ under pressure followed by acidification yields which product (Kolbe reaction)?]",
    options: [
      "A) सैलिसिलिक अम्ल (Salicylic acid)",
      "B) सैलिसिलैल्डिहाइड (Salicylaldehyde)",
      "C) बेन्जोइक अम्ल (Benzoic acid)",
      "D) पिक्रिक अम्ल (Picric acid)"
    ],
    correct: 0,
    ans: "A) सैलिसिलिक अम्ल (Salicylic acid)",
    exp: "💡 सही उत्तर: A) सैलिसिलिक अम्ल (2-हाइड्रॉक्सी बेन्जोइक अम्ल)। यह कोल्बे-श्मिट अभिक्रिया कहलाती है, जो एस्पिरिन के निर्माण में काम आती है।"
  },
  {
    topic: "ईथर (Ethers - Williamson Synthesis)",
    q: "विलियमसन संश्लेषण (Williamson Synthesis) विधि द्वारा किसका निर्माण किया जाता है?\n[English: Which class of compounds is prepared by Williamson Synthesis?]",
    options: [
      "A) ईथर (Ethers - R-O-R')",
      "B) ऐल्कोहॉल (Alcohols - R-OH)",
      "C) ऐल्डिहाइड (Aldehydes - R-CHO)",
      "D) कीटोन (Ketones - R-CO-R')"
    ],
    correct: 0,
    ans: "A) ईथर (Ethers - R-O-R')",
    exp: "💡 सही उत्तर: A) ईथर (Ethers)। सोडियम ऐल्कॉक्साइड (RONa) की ऐल्किल हैलाइड (R'X) के साथ अभिक्रिया कराने पर सममित या असममित ईथर प्राप्त होते हैं: RONa + R'X → R-O-R' + NaX।"
  },
  {
    topic: "ऐल्डिहाइड एवं कीटोन (Cannizzaro Reaction)",
    q: "निम्नलिखित में से कौन सा यौगिक कैनीजारो अभिक्रिया (Cannizzaro Reaction) प्रदर्शित करता है?\n[English: Which of the following compounds exhibits Cannizzaro Reaction?]",
    options: [
      "A) फॉर्मैल्डिहाइड (HCHO) / Formaldehyde",
      "B) ऐसीटैल्डिहाइड (CH₃CHO) / Acetaldehyde",
      "C) ऐसीटोन (CH₃COCH₃) / Acetone",
      "D) प्रोपियोनैल्डिहाइड (CH₃CH₂CHO) / Propionaldehyde"
    ],
    correct: 0,
    ans: "A) फॉर्मैल्डिहाइड (HCHO) / Formaldehyde",
    exp: "💡 सही उत्तर: A) फॉर्मैल्डिहाइड (HCHO)। वे ऐल्डिहाइड जिनमें α-हाइड्रोजन परमाणु अनुपस्थित होता है (जैसे HCHO, C₆H₅CHO), 50% सांद्र क्षार (NaOH) की उपस्थिति में स्वतः ऑक्सीकरण-अपचयन (असमानुपातन) द्वारा एक अणु ऐल्कोहॉल व एक अणु कार्बोक्सिलिक लवण बनाते हैं।"
  },
  {
    topic: "ऐल्डिहाइड एवं कीटोन (Aldol Condensation)",
    q: "ऐल्डोल संघनन (Aldol Condensation) देने के लिए ऐल्डिहाइड या कीटोन के पास क्या उपस्थित होना अनिवार्य है?\n[English: To undergo Aldol Condensation, what must an aldehyde or ketone possess?]",
    options: [
      "A) कम से कम एक α-हाइड्रोजन परमाणु / At least one α-hydrogen atom",
      "B) कोई α-हाइड्रोजन नहीं / No α-hydrogen",
      "C) केवल β-हाइड्रोजन / Only β-hydrogen",
      "D) सुगंधित वलय / Aromatic ring"
    ],
    correct: 0,
    ans: "A) कम से कम एक α-हाइड्रोजन परमाणु / At least one α-hydrogen atom",
    exp: "💡 सही उत्तर: A) कम से कम एक α-हाइड्रोजन परमाणु। तनु क्षार की उपस्थिति में α-हाइड्रोजन युक्त दो अणु संघनित होकर β-हाइड्रॉक्सी ऐल्डिहाइड (ऐल्डोल) या β-हाइड्रॉक्सी कीटोन (कीटोल) बनाते हैं।"
  },
  {
    topic: "कार्बोक्सिलिक अम्ल (Carboxylic Acids - HVZ Reaction)",
    q: "हेल-वोलहार्ड-जेलिंस्की (HVZ) अभिक्रिया में कार्बोक्सिलिक अम्ल के किस कार्बन पर हैलोजन परमाणु जुड़ता है?\n[English: In Hell-Volhard-Zelinsky (HVZ) reaction, halogen atom attaches to which carbon of carboxylic acid?]",
    options: [
      "A) α-कार्बन परमाणु पर / On α-carbon atom",
      "B) β-कार्बन परमाणु पर / On β-carbon atom",
      "C) कार्बोनिल कार्बन पर / On carbonyl carbon",
      "D) γ-कार्बन परमाणु पर / On γ-carbon atom"
    ],
    correct: 0,
    ans: "A) α-कार्बन परमाणु पर / On α-carbon atom",
    exp: "💡 सही उत्तर: A) α-कार्बन परमाणु पर। लाल फास्फोरस की उपस्थिति में कार्बोक्सिलिक अम्लों की Cl₂ या Br₂ से अभिक्रिया कराने पर α-हैलोजनो अम्ल प्राप्त होते हैं।"
  },
  {
    topic: "ऐमीन (Amines - Hofmann Bromamide)",
    q: "हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया (Hofmann Bromamide Degradation) में एमाइड (RCONH₂) से प्राथमिक ऐमीन बनने में कार्बन संख्या पर क्या प्रभाव पड़ता है?\n[English: In Hofmann Bromamide reaction, what happens to the number of carbons in the resulting 1° amine compared to amide?]",
    options: [
      "A) एक कार्बन कम हो जाता है / One carbon decreases",
      "B) एक कार्बन बढ़ जाता है / One carbon increases",
      "C) कार्बन संख्या समान रहती है / Remains same",
      "D) कार्बन संख्या दोगुनी हो जाती है / Doubles"
    ],
    correct: 0,
    ans: "A) एक कार्बन कम हो जाता है / One carbon decreases",
    exp: "💡 सही उत्तर: A) एक कार्बन कम हो जाता है। RCONH₂ + Br₂ + 4KOH → R-NH₂ + K₂CO₃ + 2KBr + 2H₂O। उत्पाद ऐमीन में जनक एमाइड की तुलना में ठीक एक कार्बन परमाणु कम होता है।"
  },
  {
    topic: "जैव-अणु (Biomolecules - Proteins)",
    q: "प्रोटीन की प्राथमिक संरचना (Primary Structure) में अमीनो अम्ल परस्पर किस रासायनिक बंध द्वारा जुड़े होते हैं?\n[English: In the primary structure of proteins, amino acids are joined by which chemical bond?]",
    options: [
      "A) पेप्टाइड बंध (-CO-NH-) / Peptide Bond",
      "B) ग्लाइकोसिडिक बंध / Glycosidic Bond",
      "C) फॉस्फोडाइएस्टर बंध / Phosphodiester Bond",
      "D) हाइड्रोजन बंध / Hydrogen Bond"
    ],
    correct: 0,
    ans: "A) पेप्टाइड बंध (-CO-NH-) / Peptide Bond",
    exp: "💡 सही उत्तर: A) पेप्टाइड बंध (-CO-NH-)। एक अमीनो अम्ल के -COOH समूह तथा दूसरे अमीनो अम्ल के -NH₂ समूह के बीच से जल का अणु निकलने से पेप्टाइड बंध बनता है।"
  },
  {
    topic: "जैव-अणु (Biomolecules - Vitamins)",
    q: "निम्नलिखित में से कौन सा विटामिन जल में घुलनशील (Water Soluble) है?\n[English: Which of the following vitamins is water-soluble?]",
    options: [
      "A) विटामिन C तथा B-कॉम्प्लेक्स / Vitamin C and B-complex",
      "B) विटामिन A",
      "C) विटामिन D",
      "D) विटामिन K"
    ],
    correct: 0,
    ans: "A) विटामिन C तथा B-कॉम्प्लेक्स / Vitamin C and B-complex",
    exp: "💡 सही उत्तर: A) विटामिन B तथा C जल में विलेय होते हैं और मूत्र के साथ उत्सर्जित हो जाते हैं। विटामिन A, D, E और K वसा (Fat) में घुलनशील होते हैं।"
  },
  {
    topic: "वैद्युतरसायन (Electrochemistry - Primary Battery)",
    q: "शुष्क सेल (Leclanché Dry Cell) में कैथोड के रूप में किसका उपयोग किया जाता है?\n[English: In a dry cell (Leclanché cell), what is used as the cathode?]",
    options: [
      "A) कार्बन (ग्रेफाइट) छड़ जो MnO₂ से घिरी होती है / Carbon rod surrounded by MnO₂",
      "B) जिंक (जस्ता) का पात्र / Zinc container",
      "C) लेड (सीसा) की प्लेट / Lead plate",
      "D) कॉपर की तार / Copper wire"
    ],
    correct: 0,
    ans: "A) कार्बन (ग्रेफाइट) छड़ जो MnO₂ से घिरी होती है / Carbon rod surrounded by MnO₂",
    exp: "💡 सही उत्तर: A) कार्बन (ग्रेफाइट) छड़ कैथोड का कार्य करती है जिसके चारों ओर MnO₂ और कार्बन चूर्ण का मिश्रण होता है। जिंक का बाहरी पात्र एनोड का कार्य करता है।"
  },
  {
    topic: "विलयन (Solutions - Ideal Solutions)",
    q: "एक आदर्श विलयन (Ideal Solution) के निर्माण में मिश्रण की एन्थैल्पी (ΔH_mix) तथा आयतन परिवर्तन (ΔV_mix) का मान क्या होता है?\n[English: For the formation of an ideal solution, what are the values of ΔH_mix and ΔV_mix?]",
    options: [
      "A) ΔH_mix = 0, ΔV_mix = 0",
      "B) ΔH_mix > 0, ΔV_mix > 0",
      "C) ΔH_mix < 0, ΔV_mix < 0",
      "D) ΔH_mix = 0, ΔV_mix > 0"
    ],
    correct: 0,
    ans: "A) ΔH_mix = 0, ΔV_mix = 0",
    exp: "💡 सही उत्तर: A) आदर्श विलयन वे हैं जो राउल्ट के नियम का पूर्णतया पालन करते हैं। इनके बनने पर न ऊष्मा उत्सर्जित/अवशोषित होती है (ΔH_mix = 0) और न ही आयतन में कोई परिवर्तन होता है (ΔV_mix = 0)।"
  }
];

const existing = require('./data_chemistry12.js');
const combined = [...existing, ...chemQuestions];
console.log('Total chemistry questions now:', combined.length);

const outContent = `// 35 Authentic Class 12th Chemistry Questions (BSEB, CBSE, UP Board, State Boards & NEET/JEE Foundation)\n// 100% Bilingual Question Statements & Options\nmodule.exports = ${JSON.stringify(combined, null, 2)};\n`;
fs.writeFileSync('scratch/data_chemistry12.js', outContent, 'utf8');
console.log('Successfully updated scratch/data_chemistry12.js');

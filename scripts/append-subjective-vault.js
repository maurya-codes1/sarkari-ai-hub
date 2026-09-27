const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../services/master-subjective-vault.js');
let content = fs.readFileSync(filePath, 'utf8');

const additionalRegistry = `  physics: {
    short: [
      {
        topic: "गाउस का नियम (Gauss Law in Electrostatics)",
        q_hi: "स्थिर वैद्युतिकी में गाउस का नियम लिखिए तथा इसका गणितीय सूत्र बताइए।",
        q_en: "State Gauss's Law in Electrostatics and give its mathematical expression.",
        a_hi: \`आदर्श उत्तर (2/3 अंक पूर्ण हल):
1. नियम का कथन:
किसी बंद काल्पनिक पृष्ठ (गाउसीय पृष्ठ) से गुजरने वाला कुल विद्युत फ्लक्स (Φ_E), उस बंद पृष्ठ द्वारा परिबद्ध कुल नेट आवेश (q_in) का 1/ε₀ गुना होता है।

2. गणितीय व्यंजक:
Φ_E = ∮ \vec{E} · d\vec{A} = q_in / ε₀
(जहाँ ε₀ = निर्वात की विद्युतशीलता = 8.854 × 10⁻¹² C² N⁻¹ m⁻²)

★ टॉपर प्रस्तुति निर्देश (+2 लाइन अंकन लाभ):
- यदि बंद पृष्ठ के भीतर कोई नेट आवेश नहीं है (q_in = 0), तो कुल निर्गत विद्युत फ्लक्स शून्य होगा।
- गाउस का नियम सममित आवेश वितरण (तार, चादर, गोला) के विद्युत क्षेत्र ज्ञात करने का सबसे सरल साधन है।\`,
        a_en: \`Model Solution (2 Marks):
Gauss's Law states that the total electric flux linked with a closed Gaussian surface is equal to 1/ε₀ times the net charge enclosed inside it: Φ_E = ∮ E·dA = q_enclosed / ε₀.\`
      },
      {
        topic: "विद्युत विभव प्रवणता (Potential Gradient)",
        q_hi: "विभव प्रवणता को परिभाषित कीजिए तथा विद्युत क्षेत्र की तीव्रता (E) और विभव प्रवणता में संबंध स्थापित कीजिए।",
        q_en: "Define Potential Gradient and state its relation with Electric Field Intensity (E).",
        a_hi: \`आदर्श उत्तर (2 अंक पूर्ण हल):
1. परिभाषा:
विद्युत क्षेत्र की दिशा में दूरी (r) के साथ विभव (V) में होने वाले परिवर्तन की दर को 'विभव प्रवणता' (Potential Gradient) कहते हैं।

2. संबंध:
E = - dV/dr
(ऋणात्मक चिह्न यह प्रदर्शित करता है कि विद्युत क्षेत्र की दिशा में चलने पर विद्युत विभव सदैव घटता है)।
मात्रक: V/m (वोल्ट/मीटर) अथवा N/C।\`,
        a_en: \`Model Solution (2 Marks):
Potential gradient is the rate of change of electric potential with respect to distance along the field line: E = - dV/dr. The negative sign indicates potential decreases in field direction.\`
      }
    ],
    long: [
      {
        topic: "हाइगेन्स तरंग सिद्धांत - प्रकाश का अपवर्तन (Refraction by Huygens Principle)",
        q_hi: "हाइगेन्स के द्वितीयक तरंगिकाओं के सिद्धांत का उपयोग करके प्रकाश के अपवर्तन के नियमों (स्नेल के नियम) का निगमन कीजिए।",
        q_en: "Using Huygens' principle of secondary wavelets, derive the laws of refraction of light (Snell's Law).",
        a_hi: \`आदर्श उत्तर (5 अंक पूर्ण बोर्ड ब्लूप्रिंट):
1. मूल परिकल्पना एवं चित्र विवरण:
माना AB एक समतल तरंगाग्र है जो माध्यम 1 (अपवर्तनांक n₁, प्रकाश चाल v₁) से माध्यम 2 (अपवर्तनांक n₂, प्रकाश चाल v₂) की पृथक्कारी सीमा XY पर i कोण पर आपतित होता है।

2. तरंगिकाओं का संचरण (चरणबद्ध विश्लेषण):
- बिंदु A पहले सीमा पृष्ठ को स्पर्श करता है। जब सिरा B दूरी BC तय करके बिंदु C तक पहुँचने में t समय लेता है, तब BC = v₁ × t।
- इसी समय t में बिंदु A से द्वितीयक तरंगिका माध्यम 2 में v₂ चाल से चलकर त्रिज्या AD = v₂ × t का चाप बनाती है।
- बिंदु C से चाप पर खींची गई स्पर्श रेखा CD अपवर्तित तरंगाग्र (Refracted Wavefront) को निरूपित करती है।

3. ज्यामितीय निगमन:
समकोण त्रिभुज ΔABC में:
sin i = BC / AC = (v₁ t) / AC   ... (समीकरण 1)

समकोण त्रिभुज ΔADC में:
sin r = AD / AC = (v₂ t) / AC   ... (समीकरण 2)

समीकरण 1 को 2 से भाग देने पर:
(sin i) / (sin r) = (v₁ t / AC) / (v₂ t / AC) = v₁ / v₂

चूंकि v₁ / v₂ = n₂ / n₁ = ₁n₂ (माध्यम 1 के सापेक्ष माध्यम 2 का अपवर्तनांक)
अतः (sin i) / (sin r) = n₂ / n₁ ⟹ n₁ sin i = n₂ sin r [स्नेल का नियम, इति सिद्धम्]

★ टॉपर प्रस्तुति एवं अंकन लाभ (+3 पंक्तियां):
1. आपतित तरंगाग्र AB, अपवर्तित तरंगाग्र CD तथा पृथक्कारी तल XY तीनों कागज के तल में हैं, जो अपवर्तन के प्रथम नियम की पुष्टि करते हैं।
2. स्पष्ट नामांकित किरण आरेख (Ray Diagram) पेंसिल व स्केल से बनाएं, जिससे परीक्षक पूरे 5/5 अंक प्रदान करे।\`,
        a_en: \`Model Solution (5 Marks Huygens Refraction):
Rigorous derivation of Snell's Law sin i / sin r = v1 / v2 = n2 / n1 using geometry of triangles ΔABC and ΔADC formed by secondary wavelets.\`
      }
    ]
  },
  chemistry: {
    short: [
      {
        topic: "राउल्ट का नियम (Raoult's Law)",
        q_hi: "वाष्पशील द्रवों के विलयन हेतु राउल्ट का नियम लिखिए तथा इसका गणितीय रूप दीजिए।",
        q_en: "State Raoult's Law for solutions of volatile liquids with mathematical formula.",
        a_hi: \`आदर्श उत्तर (2 अंक पूर्ण हल):
1. नियम का कथन:
निश्चित ताप पर वाष्पशील द्रवों के विलयन में प्रत्येक घटक का आंशिक वाष्प दाब (p_A), विलयन में उसके मोल अंश (x_A) के समानुपाती होता है।

2. गणितीय व्यंजक:
p_A = p_A° · x_A   तथा   p_B = p_B° · x_B
डाल्टन के आंशिक दाब के नियमानुसार कुल दाब:
P_total = p_A + p_B = p_A° · x_A + p_B° · x_B

★ परीक्षक टिप: p_A° शुद्ध घटक A का वाष्प दाब है। अवाष्पशील विलेय मिलाने पर वाष्प दाब का आपेक्षिक अवनमन (p° - p)/p° = x_B होता है।\`,
        a_en: \`Model Solution (2 Marks):
Raoult's law states that the partial vapour pressure of each volatile component in solution is directly proportional to its mole fraction: p_A = p_A° · x_A.\`
      },
      {
        topic: "नेर्नस्ट समीकरण (Nernst Equation)",
        q_hi: "इलेक्ट्रोड विभव हेतु नेर्नस्ट समीकरण लिखिए तथा 298 K ताप पर इसका सरल रूप प्रस्तुत कीजिए।",
        q_en: "Write the Nernst Equation for electrode potential and express it at 298 K.",
        a_hi: \`आदर्श उत्तर (2 अंक):
अभिक्रिया Mⁿ⁺(aq) + ne⁻ ⟶ M(s) के लिए:
E = E° - (RT / nF) ln(1 / [Mⁿ⁺])
298 K ताप पर (R = 8.314 J/K·mol, F = 96500 C):
E = E° - (0.0591 / n) log₁₀(1 / [Mⁿ⁺])
= E° + (0.0591 / n) log₁₀[Mⁿ⁺]\`,
        a_en: \`Model Solution (2 Marks):
Nernst Equation at 298 K: E = E° - (0.0591 / n) log(1/[Mⁿ⁺]).\`
      }
    ],
    long: [
      {
        topic: "प्रथम कोटि की अभिक्रिया (Integrated Rate Equation for First Order Reaction)",
        q_hi: "प्रथम कोटि की अभिक्रिया के लिए समाकलित वेग समीकरण (Integrated Rate Expression) का निगमन कीजिए तथा सिद्ध कीजिए कि इसका अर्धायु काल (t_1/2) प्रारंभिक सांद्रता पर निर्भर नहीं करता।",
        q_en: "Derive the integrated rate equation for a first-order reaction and prove that half-life (t_1/2) is independent of initial concentration.",
        a_hi: \`आदर्श उत्तर (5 अंक पूर्ण स्टेप मार्किंग):
1. अभिक्रिया एवं दर नियम:
माना एक सामान्य प्रथम कोटि अभिक्रिया: R ⟶ P
तात्कालिक वेग: - d[R]/dt = k [R]¹
⟹ d[R] / [R] = - k dt

2. समाकलन करने पर:
∫ (1/[R]) d[R] = - k ∫ dt
⟹ ln[R] = - k t + I   ... (समीकरण 1, जहाँ I समाकलन स्थिरांक है)

3. प्रारंभिक स्थितियां (Boundary conditions):
जब समय t = 0 हो, तब [R] = [R]₀ (प्रारंभिक सांद्रता)
समीकरण 1 में रखने पर:
ln[R]₀ = - k(0) + I ⟹ I = ln[R]₀

4. मान रखने पर:
ln[R] = - k t + ln[R]₀
⟹ k t = ln[R]₀ - ln[R] = ln([R]₀ / [R])
⟹ k = (1/t) ln([R]₀ / [R])
प्राकृतिक लघुगणक (ln) को आधार 10 (log₁₀) में बदलने पर (ln x = 2.303 log₁₀ x):
k = (2.303 / t) log₁₀([R]₀ / [R])  [समाकलित वेग समीकरण]

5. अर्धायु काल (Half-life, t_1/2) का निगमन:
जब t = t_1/2 हो, तब शेष सांद्रता [R] = [R]₀ / 2
k = (2.303 / t_1/2) log₁₀([R]₀ / ([R]₀/2))
k = (2.303 / t_1/2) log₁₀(2)
चूँकि log₁₀ 2 = 0.3010
k = (2.303 × 0.3010) / t_1/2 = 0.693 / t_1/2
⟹ t_1/2 = 0.693 / k

निष्कर्ष: इस व्यंजक में प्रारंभिक सांद्रता [R]₀ नहीं है, अतः प्रथम कोटि अभिक्रिया का अर्धायु काल प्रारंभिक सांद्रता पर निर्भर नहीं करता है। [इति सिद्धम्]

★ टॉपर टिप (+2 लाइन): उत्तर के अंत में t_1/2 = 0.693/k को आयताकार बॉक्स में बंद करें और k का मात्रक (s⁻¹ या समय⁻¹) स्पष्ट लिखें।\`,
        a_en: \`Model Solution (5 Marks First Order Kinetics):
Full step-by-step calculus integration from -d[R]/dt = k[R] to k = (2.303/t) log([R]₀/[R]) and derivation of t_1/2 = 0.693/k showing zero dependency on initial concentration.\`
      }
    ]
  },
  biology: {
    short: [
      {
        topic: "दोहरा निषेचन एवं त्रिसंलयन (Double Fertilization & Triple Fusion)",
        q_hi: "आवृतबीजी पादपों में 'दोहरा निषेचन' (Double Fertilization) किसे कहते हैं? इसका क्या महत्व है?",
        q_en: "What is Double Fertilization in Angiosperms? Explain its significance.",
        a_hi: \`आदर्श उत्तर (2/3 अंक):
1. प्रक्रिया:
पराग नलिका से भ्रूणपोष में मुक्त दो नर युग्मकों में से:
- प्रथम नर युग्मक (n) + अंड कोशिका (n) ⟶ युग्मनज (2n) [सत्य निषेचन / Syngamy]
- द्वितीय नर युग्मक (n) + द्वितीयक केंद्रक (2n) ⟶ प्राथमिक भ्रूणपोष केंद्रक (3n) [त्रिसंलयन / Triple Fusion]
इस प्रकार एक ही भ्रूणकोष में दो बार निषेचन होने के कारण इसे 'दोहरा निषेचन' कहते हैं।

2. जैविक महत्व:
त्रिसंलयन से त्रिगुणित (3n) भ्रूणपोष बनता है, जो विकसित हो रहे भ्रूण (Embryo) को प्रचुर पोषण प्रदान करता है।\`,
        a_en: \`Model Solution (2 Marks):
Double fertilization involves syngamy (male gamete + egg cell -> 2n zygote) and triple fusion (second male gamete + polar nuclei -> 3n endosperm) ensuring nutrition for the developing seed.\`
      }
    ],
    long: [
      {
        topic: "डीएनए की द्विकुंडलिनी संरचना (Watson & Crick Double Helix Model)",
        q_hi: "वाटसन एवं क्रिक द्वारा प्रस्तुत डीएनए की द्विकुंडलिनी संरचना (Double Helix Model) की मुख्य विशेषताओं का सचित्र वर्णन कीजिए।",
        q_en: "Describe the salient features of the Watson and Crick Double Helix DNA model with labeled illustration.",
        a_hi: \`आदर्श उत्तर (5 अंक पूर्ण मॉडल विवरण):
1. ऐतिहासिक संदर्भ:
1953 में जेम्स वाटसन और फ्रांसिस क्रिक ने रोज़ालिंड फ्रैंकलिन व विल्किंस के एक्स-रे विवर्तन आंकड़ों के आधार पर डीएनए का B-फॉर्म मॉडल प्रस्तुत किया।

2. प्रमुख संरचनात्मक विशेषताएं (Salient Features):
(i) दो पॉलीपेप्टाइड शृंखलाएं: डीएनए दो पॉलीन्यूक्लियोटाइड रज्जुक का बना होता है, जिसकी रीढ़ शर्करा-फॉस्फेट की बनी होती है तथा क्षारक भीतर की ओर प्रक्षेपित होते हैं।
(ii) प्रति-समानांतर ध्रुवता (Anti-parallel Polarity): एक रज्जुक की ध्रुवता 5' ⟶ 3' तथा दूसरे की 3' ⟶ 5' होती है।
(iii) पूरक क्षार युग्मन (Chargaff's Rule): प्यूरिन सदैव पिरिमिडीन से जुड़ता है। एडेनिन (A) दो हाइड्रोजन बंधों द्वारा थाइमिन (T) से (A = T) तथा ग्वानिन (G) तीन हाइड्रोजन बंधों द्वारा साइटोसिन (C) से (G ≡ C) जुड़ता है।
(iv) कुंडल का आयाम: द्विकुंडली का व्यास 2.0 nm (20 Å) होता है। एक पूर्ण घुमाव (Pitch) की लंबाई 3.4 nm (34 Å) होती है जिसमें 10 क्षार युग्म (bp) होते हैं। दो क्रमागत क्षार युग्मों के बीच की दूरी 0.34 nm होती है।

★ टॉपर प्रस्तुति (+2 अंकन लाभ):
5' और 3' सिरों को स्पष्ट दर्शाने वाला साफ-सुथरा नामांकित रेखाचित्र अवश्य बनाएं तथा चारगाफ नियम (A+G = T+C) का उल्लेख करें।\`,
        a_en: \`Model Solution (5 Marks DNA Structure):
Salient features of Watson-Crick B-DNA: anti-parallel 5'->3' and 3'->5' strands, sugar-phosphate backbone, complementary base pairing (A=T with 2 H-bonds, G≡C with 3 H-bonds), 2.0 nm diameter, 3.4 nm helical pitch containing 10 base pairs.\`
      }
    ]
  },
  accountancy: {
    short: [
      {
        topic: "पुनर्मूल्यांकन खाता (Revaluation Account)",
        q_hi: "साझेदारी फर्म में पुनर्मूल्यांकन खाता (Revaluation Account) कब और क्यों बनाया जाता है?",
        q_en: "When and why is a Revaluation Account prepared in a partnership firm?",
        a_hi: \`आदर्श उत्तर (2 अंक):
1. कब बनाया जाता है:
नए साझेदार के प्रवेश, किसी साझेदार के अवकाश ग्रहण (Retirement), मृत्यु अथवा लाभ-विभाजन अनुपात में परिवर्तन के समय।

2. उद्देश्य / प्रकृति:
यह एक नाममात्र (Nominal) खाता है। संपत्तियों के मूल्यों में वृद्धि/कमी तथा दायित्वों के पुनर्मूल्यांकन से होने वाले लाभ या हानि का निर्धारण करने हेतु बनाया जाता है। अंतिम लाभ/हानि को पुराने साझेदारों में उनके पुराने लाभ-विभाजन अनुपात में हस्तांतरित किया जाता है।\`,
        a_en: \`Model Solution (2 Marks):
Revaluation A/c is a nominal account prepared during reconstitution of partnership to record changes in asset/liability values, distributing net profit/loss to old partners in old ratio.\`
      }
    ],
    long: [
      {
        topic: "अंशों का जब्तीकरण एवं पुनर्निर्गमन (Forfeiture and Re-issue of Shares Journal Entries)",
        q_hi: "अंशों के जब्तीकरण (Forfeiture) तथा उनके बट्टे पर पुनर्निर्गमन (Re-issue at Discount) के समय की जाने वाली आवश्यक जर्नल प्रविष्टियां लिखिए।",
        q_en: "Pass the necessary Journal Entries for forfeiture of shares and their re-issue at discount with transfer to Capital Reserve.",
        a_hi: \`आदर्श उत्तर (5 अंक पूर्ण अकाउंटेंसी हल):
1. अंशों के जब्तीकरण पर (On Forfeiture of Shares):
Share Capital A/c ... Dr. [मांगी गई राशि से / Called-up Value]
   To Share Allotment / Call A/c [जो बकाया राशि प्राप्त नहीं हुई / Unpaid Calls]
   To Share Forfeiture A/c [जो राशि पहले प्राप्त हो चुकी है / Paid-up amount]
(नैरेशन: Being ... shares forfeited for non-payment of call money as per Board Resolution No...)

2. जब्त अंशों के बट्टे पर पुनर्निर्गमन पर (On Re-issue of Forfeited Shares at Discount):
Bank A/c ... Dr. [वास्तविक प्राप्त राशि से / Actual amount received]
Share Forfeiture A/c ... Dr. [दी गई बट्टा / छूट राशि से]
   To Share Capital A/c [चुक्ता पूंजी मूल्य से / Paid-up capital value]
(नैरेशन: Being forfeited shares re-issued at Rs... per share)

3. शेयर जब्ती खाते के शेष को पूंजीगत संचय में अंतरण पर (Transfer to Capital Reserve):
Share Forfeiture A/c ... Dr.
   To Capital Reserve A/c
(नैरेशन: Being net gain on re-issue of forfeited shares transferred to Capital Reserve A/c)

★ परीक्षक 5/5 अंकन टिप:
- जर्नल का 5-कॉलम प्रारूप (Date, Particulars, L.F., Debit Amount, Credit Amount) अवश्य बनाएं।
- पूंजीगत संचय की गणना सूत्र सहित दर्शाएं: [Total Forfeiture Amount on re-issued shares - Discount allowed on re-issue].\`,
        a_en: \`Model Solution (5 Marks Share Forfeiture Accounting):
Standard 3-stage journal accounting entries for share forfeiture, re-issue at discount, and capital reserve transfer with clear narration and 5-column journal ledger format.\`
      }
    ]
  },
  business: {
    short: [
      {
        topic: "सोपान श्रृंखला एवं गैंग प्लैंक (Scalar Chain & Gang Plank)",
        q_hi: "फेयोल के 'सोपान श्रृंखला' (Scalar Chain) सिद्धांत तथा इसमें 'गैंग प्लैंक' (Gang Plank) की भूमिका स्पष्ट कीजिए।",
        q_en: "Explain Henri Fayol's 'Scalar Chain' principle and the role of 'Gang Plank'.",
        a_hi: \`आदर्श उत्तर (2/3 अंक):
1. सोपान श्रृंखला:
उच्चतम स्तर से निम्नतम स्तर तक संप्रेषण एवं प्राधिकार की औपचारिक रेखा को सोपान श्रृंखला कहते हैं। सूचना सदैव क्रमबद्ध रूप से ऊपर से नीचे या नीचे से ऊपर जाती है।

2. गैंग प्लैंक (प्रत्यक्ष संपर्क):
आपातकाल की स्थिति में संप्रेषण में अनावश्यक देरी से बचने हेतु एक ही स्तर के दो अधिकारी सोपान श्रृंखला का उल्लंघन करते हुए प्रत्यक्ष संपर्क स्थापित कर सकते हैं, जिसे गैंग प्लैंक (Gang Plank) कहा जाता है।\`,
        a_en: \`Model Solution (2 Marks):
Scalar chain is the unbroken chain of authority and communication from highest to lowest rank. Gang Plank is an exception allowing direct communication between peers in emergencies to avoid delays.\`
      }
    ],
    long: [
      {
        topic: "विपणन मिश्रण के 4Ps (The 4Ps of Marketing Mix)",
        q_hi: "विपणन मिश्रण (Marketing Mix) के चारों घटकों (Product, Price, Place, Promotion) का विस्तारपूर्वक विवेचन कीजिए।",
        q_en: "Discuss in detail the four elements (4Ps) of Marketing Mix: Product, Price, Place, and Promotion.",
        a_hi: \`आदर्श उत्तर (5 अंक सम्पूर्ण रूपरेखा):
विपणन मिश्रण उन विपणन उपकरणों का समूह है जिसका उपयोग एक फर्म अपने लक्ष्य बाजार में अपने विपणन उद्देश्यों को पूरा करने के लिए करती है।

1. उत्पाद (Product):
यह वह वस्तु या सेवा है जो उपभोक्ता की आवश्यकता को संतुष्ट करने हेतु बाजार में प्रस्तुत की जाती है। इसमें उत्पाद डिजाइन, गुणवत्ता, ब्रांडिंग (Branding), पैकेजिंग और लेबलिंग शामिल हैं।

2. मूल्य (Price):
वह धनराशि जो उपभोक्ता उत्पाद प्राप्त करने के बदले में चुकाता है। मूल्य निर्धारण में उत्पादन लागत, प्रतिस्पर्धी मूल्य, मांग की लोच और सरकारी नीतियां मुख्य कारक हैं।

3. स्थान / वितरण (Place / Physical Distribution):
उत्पाद को उत्पादन स्थल से उपभोक्ता तक पहुँचाने की समस्त गतिविधियां। इसमें वितरण के माध्यम (Channels of Distribution), परिवहन, भण्डारण (Warehousing) और इन्वेंट्री प्रबंधन शामिल हैं।

4. संवर्धन (Promotion):
उपभोक्ताओं को उत्पाद के गुणों की जानकारी देकर उन्हें क्रय हेतु प्रेरित करने की तकनीक। इसके 4 प्रमुख अंग हैं: विज्ञापन (Advertising), वैयक्तिक विक्रय (Personal Selling), विक्रय संवर्धन (Sales Promotion - छूट/कूपन) और प्रचार (Publicity)।

★ परीक्षक 5/5 अंकन योजना:
चारों Ps का एक सुव्यवस्थित चक्राकार आरेख (Flow Diagram) बनाएं। प्रत्येक बिंदु के साथ 1-1 व्यावहारिक उदाहरण (जैसे Apple या अमूल) देने पर परीक्षक पूरे 5 अंक देता है।\`,
        a_en: \`Model Solution (5 Marks Marketing Mix):
Comprehensive analysis of 4Ps: Product (features, branding, packaging), Price (cost-plus, market penetration), Place (channels, logistics, warehousing), Promotion (advertising, sales promo, personal selling).\`
      }
    ]
  },
  economics: {
    short: [
      {
        topic: "सकल घरेलू उत्पाद एवं साधन लागत (GDPmp vs NNPfc)",
        q_hi: "बाजार मूल्य पर सकल घरेलू उत्पाद (GDP_MP) से साधन लागत पर शुद्ध राष्ट्रीय उत्पाद (NNP_FC - राष्ट्रीय आय) कैसे ज्ञात किया जाता है?",
        q_en: "How is Net National Product at Factor Cost (NNP_FC / National Income) derived from GDP_MP?",
        a_hi: \`आदर्श उत्तर (2 अंक):
समीकरण:
NNP_FC = GDP_MP - मूल्यह्रास (Depreciation) + विदेशों से शुद्ध साधन आय (NFIA) - शुद्ध अप्रत्यक्ष कर (NIT)

जहाँ:
1. Gross से Net जाने हेतु: (-) Depreciation
2. Domestic से National जाने हेतु: (+) NFIA
3. Market Price से Factor Cost जाने हेतु: (-) NIT (अप्रत्यक्ष कर - आर्थिक सहायता)\`,
        a_en: \`Model Solution (2 Marks):
NNP_FC = GDP_MP - Depreciation + NFIA - NIT (Indirect Taxes - Subsidies).\`
      }
    ],
    long: [
      {
        topic: "केंद्रीय बैंक के साख नियंत्रण के उपाय (Credit Control by Central Bank / RBI)",
        q_hi: "भारतीय रिजर्व बैंक (RBI) द्वारा मुद्रा आपूर्ति एवं साख पर नियंत्रण के लिए प्रयुक्त मात्रात्मक एवं गुणात्मक उपकरणों का विस्तृत वर्णन कीजिए।",
        q_en: "Explain the Quantitative and Qualitative instruments used by the Reserve Bank of India (RBI) for credit control.",
        a_hi: \`आदर्श उत्तर (5 अंक सम्पूर्ण हल):
केंद्रीय बैंक अर्थव्यवस्था में मुद्रास्फीति (महंगाई) और मंदी को नियंत्रित करने के लिए मौद्रिक नीति का उपयोग करता है।

क. मात्रात्मक उपकरण (Quantitative Instruments - कुल ऋण मात्रा को प्रभावित करते हैं):
1. बैंक दर एवं रेपो दर (Repo Rate): वह दर जिस पर केंद्रीय बैंक वाणिज्यिक बैंकों को अल्पकालिक ऋण देता है। महंगाई के समय रेपो दर बढ़ाई जाती है, जिससे ब्याज दरें बढ़ती हैं और साख संकुचित होती है।
2. नकद आरक्षित अनुपात (CRR): वाणिज्यिक बैंकों को अपनी कुल जमा का एक निश्चित प्रतिशत RBI के पास अनिवार्य रूप से नकद रखना होता है। CRR बढ़ाने से बैंकों की ऋण देने की क्षमता घटती है।
3. वैधानिक तरलता अनुपात (SLR): बैंकों को अपनी कुल जमा का निश्चित भाग तरल संपत्तियों (स्वर्ण/सरकारी प्रतिभूतियां) में रखना होता है।
4. खुले बाजार की क्रियाएं (OMO): बाजार में तरलता सोखने के लिए RBI सरकारी प्रतिभूतियों की बिक्री करता है।

ख. गुणात्मक उपकरण (Qualitative Instruments - ऋण की दिशा को प्रभावित करते हैं):
1. सीमांत आवश्यकता (Margin Requirement): बंधक रखी गई संपत्ति के मूल्य और स्वीकृत ऋण राशि के बीच का अंतर।
2. साख की राशनिंग (Credit Rationing): विशिष्ट क्षेत्रों के लिए ऋण की अधिकतम सीमा तय करना।
3. नैतिक दबाव (Moral Suasion): बैंकों को RBI के दिशा-निर्देशों का पालन करने हेतु परामर्श व समझाइश देना।

★ टॉपर प्रस्तुति (+2 पंक्तियां): एक तुलनात्मक चार्ट (मात्रात्मक बनाम गुणात्मक) अवश्य बनाएं और वर्तमान भारतीय संदर्भ में मुद्रास्फीति नियंत्रण का उल्लेख करें।\`,
        a_en: \`Model Solution (5 Marks Monetary Policy):
Detailed breakdown of Quantitative measures (Repo rate, CRR, SLR, OMO) and Qualitative measures (Margin requirements, moral suasion, selective credit control) used by RBI.\`
      }
    ]
  },
  history: {
    short: [
      {
        topic: "हड़प्पा सभ्यता का नगर नियोजन (Harappan Town Planning)",
        q_hi: "हड़प्पा सभ्यता की नगर नियोजन प्रणाली एवं जल निकासी व्यवस्था की दो प्रमुख विशेषताएं लिखिए।",
        q_en: "Write two key features of Harappan town planning and drainage system.",
        a_hi: \`आदर्श उत्तर (2 अंक):
1. ग्रिड पद्धति (Grid System): नगर दो भागों (पश्चिमी दुर्ग एवं निचला शहर) में विभाजित थे। सड़कें एक-दूसरे को समकोण (90°) पर काटती थीं।
2. वैज्ञानिक जल निकासी (Drainage System): प्रत्येक घर की नाली सड़क की मुख्य ढकी हुई नाली से जुड़ती थी। नालियों में नियमित दूरी पर सफाई हेतु सोखते गड्ढे (Manholes) बने थे।\`,
        a_en: \`Model Solution (2 Marks):
Grid pattern town planning intersecting at right angles and covered domestic drainage connected to street drains with regular inspection manholes.\`
      }
    ],
    long: [
      {
        topic: "महात्मा गांधी और असहयोग आंदोलन (Non-Cooperation Movement 1920-22)",
        q_hi: "महात्मा गांधी द्वारा 1920 में असहयोग आंदोलन शुरू करने के क्या कारण थे? इसका स्वरूप क्या था तथा इसे अचानक क्यों वापस लिया गया?",
        q_en: "What were the causes, nature, and reasons for the sudden withdrawal of the Non-Cooperation Movement by Mahatma Gandhi?",
        a_hi: \`आदर्श उत्तर (5 अंक विश्लेषणात्मक हल):
1. आंदोलन के मुख्य कारण:
- रौलट एक्ट 1919 (काला कानून) एवं जलियांवाला बाग नरसंहार (13 अप्रैल 1919) की बर्बरता।
- प्रथम विश्व युद्ध के बाद की आर्थिक बदहाली व महंगाई।
- खिलाफत आंदोलन का समर्थन कर हिंदू-मुस्लिम एकता स्थापित करने का अवसर।

2. आंदोलन का स्वरूप (कार्यक्रम):
- उपाधियों व मानद पदों का परित्याग (जैसे गांधीजी द्वारा 'कैसर-ए-हिंद' लौटाना)।
- सरकारी स्कूलों, कॉलेजों, अदालतों एवं विदेशी वस्त्रों का पूर्ण बहिष्कार तथा खादी का प्रचार।
- चरखा चलाना, मद्यपान निषेध और अस्पृश्यता निवारण जैसे रचनात्मक कार्य।

3. आंदोलन का अचानक स्थगन (चौरी-चौरा की घटना):
4 फरवरी 1922 को गोरखपुर (उत्तर प्रदेश) के चौरी-चौरा में शांतिपूर्ण जुलूस पर पुलिस द्वारा गोली चलाने के बाद उत्तेजित भीड़ ने थाने में आग लगा दी, जिसमें 22 पुलिसकर्मी जलकर मर गए।
गांधीजी अहिंसा के सिद्धांत के प्रति पूर्णतः समर्पित थे। उनका मानना था कि देश अभी व्यापक सत्याग्रह हेतु तैयार नहीं है, अतः 12 फरवरी 1922 को बारदोली में उन्होंने आंदोलन वापस ले लिया।

★ टॉपर प्रस्तुति निष्कर्ष (+2 पंक्तियां): यद्यपि आंदोलन स्थगित हुआ, किंतु इसने स्वतंत्रता संग्राम को उच्च वर्ग से निकालकर आम जनता, किसानों व श्रमिकों का जन-आंदोलन बना दिया।\`,
        a_en: \`Model Solution (5 Marks Non-Cooperation Movement):
Causes (Rowlatt Act, Jallianwala Bagh, Khilafat), methods of boycott and constructive work, and Gandhi's withdrawal following the Chauri Chaura incident upholding non-violence.\`
      }
    ]
  },
  polity: {
    short: [
      {
        topic: "संविधान - मौलिक कर्तव्य (Fundamental Duties - Article 51A)",
        q_hi: "भारतीय संविधान में मौलिक कर्तव्यों को किस संविधान संशोधन द्वारा जोड़ा गया तथा इनकी वर्तमान संख्या कितनी है?",
        q_en: "By which Constitutional Amendment were Fundamental Duties added to the Indian Constitution, and what is their current number?",
        a_hi: \`आदर्श उत्तर (2 अंक):
1. संशोधन एवं समिति: 42वें संविधान संशोधन अधिनियम 1976 द्वारा सरदार स्वर्ण सिंह समिति की सिफारिश पर संविधान के भाग 4(क) में अनुच्छेद 51(क) के तहत 10 मौलिक कर्तव्य जोड़े गए।
2. वर्तमान संख्या: 86वें संविधान संशोधन 2002 द्वारा 11वाँ कर्तव्य (6 से 14 वर्ष के बच्चों को शिक्षा का अवसर) जोड़ा गया, अतः वर्तमान में कुल 11 मौलिक कर्तव्य हैं।\`,
        a_en: \`Model Solution (2 Marks):
Added by 42nd Amendment 1976 on Swaran Singh Committee recommendation; expanded from 10 to 11 by the 86th Amendment 2002 (Article 51A).\`
      }
    ],
    long: [
      {
        topic: "संवैधानिक उपचारों का अधिकार एवं 5 रिटें (Article 32 - Writs)",
        q_hi: "सर्वोच्च न्यायालय द्वारा मौलिक अधिकारों के संरक्षण हेतु अनुच्छेद 32 के तहत जारी की जाने वाली 5 रिटों (Writs) का विस्तृत विवेचन कीजिए।",
        q_en: "Explain in detail the 5 types of Writs issued by the Supreme Court under Article 32 for the enforcement of Fundamental Rights.",
        a_hi: \`आदर्श उत्तर (5 अंक संविधान ब्लूप्रिंट):
डॉ. अम्बेडकर ने अनुच्छेद 32 को 'संविधान का हृदय और आत्मा' कहा था। इसके तहत सर्वोच्च न्यायालय 5 प्रकार की रिटें जारी कर सकता है:

1. बंदी प्रत्यक्षीकरण (Habeas Corpus - 'सशरीर प्रस्तुत करो'):
अवैध रूप से हिरासत में लिए गए व्यक्ति को न्यायालय के समक्ष 24 घंटे के भीतर पेश करने का आदेश। यदि निरोध अवैध पाया जाता है तो तुरंत रिहाई का आदेश दिया जाता है।

2. परमादेश (Mandamus - 'हमारा आदेश है'):
यह किसी सार्वजनिक अधिकारी, निगम या अधीनस्थ न्यायालय को उसके वैधानिक कर्तव्य के पालन का निर्देश देने हेतु जारी किया जाता है।

3. प्रतिषेध (Prohibition - 'मना करना'):
उच्च न्यायालय या सर्वोच्च न्यायालय द्वारा अधीनस्थ न्यायालय या न्यायाधिकरण को अपने क्षेत्राधिकार से बाहर जाकर कार्य करने से रोकने हेतु जारी की जाती है।

4. उत्प्रेषण (Certiorari - 'पूर्णतया सूचित होना'):
अधीनस्थ न्यायालय के विचाराधीन मामले को अपने पास मंगाने अथवा क्षेत्राधिकार के अभाव या प्राकृतिक न्याय के उल्लंघन पर उसके आदेश को रद्द करने हेतु।

5. अधिकार पृच्छा (Quo-Warranto - 'आपका प्राधिकार क्या है?'):
किसी व्यक्ति द्वारा अवैध रूप से सार्वजनिक पद (Public Office) धारण करने की वैधता की जांच करने हेतु जारी की जाती है।

★ टॉपर प्रस्तुति निर्देश: सर्वोच्च न्यायालय (अनुच्छेद 32) एवं उच्च न्यायालय (अनुच्छेद 226) की रिट अधिकारिता के अंतर का 1 पंक्ति में उल्लेख अवश्य करें।\`,
        a_en: \`Model Solution (5 Marks Constitutional Writs):
Detailed legal breakdown of Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo-Warranto under Article 32, highlighting their scope, safeguards, and judicial authority.\`
      }
    ]
  },
  geography: {
    short: [
      {
        topic: "नवनिश्चयवाद (Neo-Determinism / Stop and Go)",
        q_hi: "ग्रिफिथ टेलर द्वारा प्रतिपादित 'नवनिश्चयवाद' (रुको और जाओ निश्चयवाद) की संकल्पना क्या है?",
        q_en: "What is the concept of 'Neo-Determinism' (Stop and Go Determinism) proposed by Griffith Taylor?",
        a_hi: \`आदर्श उत्तर (2 अंक):
1. मध्य मार्ग: यह पर्यावरणीय निश्चयवाद (प्रकृति की सर्वोच्चता) और संभववाद (मानव की पूर्ण स्वतंत्रता) के बीच का एक मध्यम मार्ग प्रस्तुत करता है।
2. संकल्पना: जैसे लाल बत्ती पर रुकना और हरी बत्ती पर चलना होता है, वैसे ही मानव प्रकृति के नियमों को समझकर, पर्यावरण को क्षति पहुँचाए बिना सतत विकास की दिशा में आगे बढ़ सकता है।\`,
        a_en: \`Model Solution (2 Marks):
Neo-determinism by Griffith Taylor bridges environmental determinism and possibilism, asserting humans can direct progress by respecting nature's limits (sustainable development).\`
      }
    ],
    long: [
      {
        topic: "विश्व में जनसंख्या वितरण को प्रभावित करने वाले कारक (Factors Affecting Population Distribution)",
        q_hi: "विश्व में जनसंख्या के असमान वितरण को प्रभावित करने वाले प्रमुख भौगोलिक एवं आर्थिक कारकों का विस्तृत विश्लेषण कीजिए।",
        q_en: "Analyze the major Geographical and Economic factors affecting the uneven distribution of world population.",
        a_hi: \`आदर्श उत्तर (5 अंक भूगोल मॉडल):
विश्व की 90% जनसंख्या मात्र 10% स्थल भाग पर निवास करती है। इसके प्रमुख कारक निम्नलिखित हैं:

क. भौगोलिक कारक (Geographical Factors):
1. जल की उपलब्धता: मनुष्य वहां बसना पसंद करता है जहां मीठा जल आसानी से मिले (जैसे नदी घाटियां - गंगा, नील, यांग्त्सी)।
2. भू-आकृति (Relief): मैदानी क्षेत्र कृषि, उद्योग व परिवहन हेतु सर्वोत्तम होते हैं, जबकि दुर्गम पर्वतीय क्षेत्र विरल आबादी वाले होते हैं।
3. जलवायु: अत्यधिक गर्म (सहारा मरुस्थल) या अत्यधिक ठंडी (ध्रुवीय प्रदेश) जलवायु मानव बसाव के प्रतिकूल होती है। समशीतोष्ण व मानसूनी जलवायु में घनी आबादी होती है।
4. मृदाएं (Soils): उपजाऊ जलोढ़ मृदा गहन कृषि को सहारा देती है, अतः नदी घाटियां सघन बसी हैं।

ख. आर्थिक कारक (Economic Factors):
1. खनिज संपदा: खनिजों से युक्त क्षेत्र उद्योगों को आकर्षित करते हैं (जैसे जांबिया की तांबा पेटी)।
2. नगरीकरण एवं औद्योगिकीकरण: रोजगार, शिक्षा, स्वास्थ्य व परिवहन के बेहतर अवसर बड़े नगरों (मुंबई, टोक्यो, न्यूयॉर्क) में आबादी को खींचते हैं।

★ टॉपर प्रस्तुति टिप: उत्तर में विश्व के 3 सघन बसे प्रदेश (दक्षिण व पूर्वी एशिया, उत्तर-पश्चिमी यूरोप, उत्तर-पूर्वी उत्तरी अमेरिका) का एक प्रतीकात्मक मानचित्र या फ्लो-चार्ट बनाएं।\`,
        a_en: \`Model Solution (5 Marks Population Geography):
Systematic analysis of geographical factors (water availability, landforms, climate, fertile soils) and economic drivers (minerals, urbanization, industrialization) with global spatial examples.\`
      }
    ]
  },
  law: {
    short: [
      {
        topic: "संज्ञेय बनाम असंज्ञेय अपराध (Cognizable vs Non-Cognizable)",
        q_hi: "भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) के अनुसार संज्ञेय अपराध (Cognizable Offence) और असंज्ञेय अपराध में क्या मुख्य अंतर है?",
        q_en: "What is the key difference between Cognizable and Non-Cognizable offences under BNSS 2023?",
        a_hi: \`आदर्श उत्तर (2 अंक):
1. संज्ञेय अपराध (Cognizable): गंभीर अपराध (जैसे हत्या, डकैती, बलात्कार) जिनमें पुलिस अधिकारी बिना वारंट के गिरफ्तार कर सकता है तथा बिना मजिस्ट्रेट की अनुमति के तुरंत अन्वेषण (Investigation) शुरू कर सकता है।
2. असंज्ञेय अपराध (Non-Cognizable): साधारण अपराध (जैसे मानहानि, साधारण मारपीट) जिनमें पुलिस बिना वारंट के गिरफ्तार नहीं कर सकती तथा मजिस्ट्रेट के आदेश के बिना जांच नहीं कर सकती।\`,
        a_en: \`Model Solution (2 Marks):
In cognizable offences, police can arrest without warrant and investigate without magistrate orders; in non-cognizable offences, warrant and magistrate permission are mandatory.\`
      }
    ],
    long: [
      {
        topic: "गिरफ्तारी के समय अभियुक्त के विधिक अधिकार (Rights of Arrested Person & D.K. Basu Guidelines)",
        q_hi: "भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) तथा उच्चतम न्यायालय के डी.के. बसु दिशानिर्देशों के तहत गिरफ्तार किए गए व्यक्ति के विधिक अधिकारों का विस्तृत वर्णन कीजिए।",
        q_en: "Explain the legal rights of an arrested person under BNSS 2023 and the landmark D.K. Basu Supreme Court guidelines.",
        a_hi: \`आदर्श उत्तर (5 अंक पुलिस एवं मूलविधि ब्लूप्रिंट):
भारतीय संविधान के अनुच्छेद 21 व 22 तथा BNSS की धाराओं के तहत गिरफ्तार व्यक्ति को निम्नलिखित मौलिक विधिक अधिकार प्राप्त हैं:

1. गिरफ्तारी का आधार जानने का अधिकार:
गिरफ्तार करते समय पुलिस अधिकारी को तुरंत गिरफ्तारी का स्पष्ट कारण व आरोप बताना अनिवार्य है।

2. मित्र या परिजन को सूचित करने का अधिकार:
गिरफ्तारी के उपरांत पुलिस थाने द्वारा व्यक्ति द्वारा नामित मित्र या रिश्तेदार को उसकी गिरफ्तारी व स्थान की तुरंत सूचना दी जाएगी (गिरफ्तारी मेमो तैयार करना अनिवार्य)।

3. विधिक सहायता व वकील से परामर्श का अधिकार:
पूछताछ के दौरान अपने वकील से मिलने का अधिकार तथा आर्थिक रूप से असमर्थ होने पर राज्य द्वारा निःशुल्क विधिक सहायता (Legal Aid - अनुच्छेद 39A) प्राप्त करने का अधिकार।

4. स्वास्थ्य परीक्षण का अधिकार:
गिरफ्तार व्यक्ति का प्रत्येक 48 घंटे में मान्यता प्राप्त चिकित्सक द्वारा अनिवार्य चिकित्सीय परीक्षण (Medical Examination) कराया जाएगा।

5. 24 घंटे के भीतर मजिस्ट्रेट के समक्ष पेशी का अधिकार:
यात्रा समय को छोड़कर, गिरफ्तारी के 24 घंटे के भीतर निकटतम मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है। बिना मजिस्ट्रेट के रिमांड आदेश के 24 घंटे से अधिक पुलिस हिरासत अवैध मानी जाती है।

★ परीक्षक 5/5 अंकन टिप: डी.के. बसु बनाम पश्चिम बंगाल राज्य (1997) वाद तथा पुलिस अधिकारियों द्वारा अपनी पहचान पट्टिका (Name Badge with designation) स्पष्ट प्रदर्शित करने के नियम का उल्लेख अवश्य करें।\`,
        a_en: \`Model Solution (5 Marks Police Law & Constitutional Safeguards):
Comprehensive analysis of the rights of an arrested person under BNSS and D.K. Basu guidelines: right to know grounds of arrest, right to inform family, legal aid, mandatory medical checkup, and 24-hour magistrate production.\`
      }
    ]
  }
`;

const insertIndex = content.lastIndexOf('module.exports = {');
if (insertIndex !== -1) {
  const before = content.substring(0, insertIndex);
  const closingBraceIndex = before.lastIndexOf('};');
  if (closingBraceIndex !== -1) {
    const newContent = before.substring(0, closingBraceIndex) + ',\n' + additionalRegistry + '\n};\n\nmodule.exports = {\n  SUBJECTIVE_SOLUTIONS_REGISTRY\n};\n';
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully updated services/master-subjective-vault.js with Class 12th & Law solutions!');
  } else {
    console.error('Could not find closing brace of SUBJECTIVE_SOLUTIONS_REGISTRY');
  }
} else {
  console.error('Could not find module.exports in master-subjective-vault.js');
}

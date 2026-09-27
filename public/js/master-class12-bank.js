// public/js/master-class12-bank.js
// 2026 Master Question Bank for Class 12th Streams (Science, Commerce, Arts)
// Strictly localized, zero-fallback dedicated subject vaults
// Authentic 2020-2025 Board PYQs + 2026 NCERT/State Board Model Questions
// 100% Bilingual Question Statements & Options (Hindi + English) for all non-language subjects

const CLASS12_PHYSICS_BANK = [
  {
    "topic": "स्थिर वैद्युतिकी (Electrostatics & Coulomb's Law)",
    "q": "निर्वात की विद्युतशीलता (Permittivity of Free Space, ε₀) का SI मात्रक क्या होता है?\n[English: What is the SI unit of permittivity of free space (ε₀)?]",
    "options": [
      "A) C² N⁻¹ m⁻²",
      "B) N m² C⁻²",
      "C) N C⁻¹ m",
      "D) C N m"
    ],
    "correct": 0,
    "ans": "A) C² N⁻¹ m⁻²",
    "exp": "💡 सही उत्तर: A) C² N⁻¹ m⁻²। कूलॉम के नियम से: F = (1 / 4πε₀) · (q₁q₂ / r²) ⟹ ε₀ = q₁q₂ / (4πFr²)। अतः मात्रक = C² / (N · m²) = C² N⁻¹ m⁻²। इसका मान 8.854 × 10⁻¹² C² N⁻¹ m⁻² होता है।"
  },
  {
    "topic": "स्थिर वैद्युतिकी (Electrostatics & Gauss Law)",
    "q": "अनंत लंबाई के एकसमान आवेशित सीधे तार के कारण विद्युत क्षेत्र की तीव्रता (E) दूरी (r) पर किस प्रकार निर्भर करती है?\n[English: How does the electric field intensity (E) due to an infinitely long uniformly charged wire depend on distance (r)?]",
    "options": [
      "A) E ∝ r",
      "B) E ∝ 1/r",
      "C) E ∝ 1/r²",
      "D) E ∝ 1/r³"
    ],
    "correct": 1,
    "ans": "B) E ∝ 1/r",
    "exp": "💡 सही उत्तर: B) E ∝ 1/r। गाउस के नियम के अनुसार अनंत लंबाई के रेखीय आवेश (रेखीय आवेश घनत्व λ) के कारण विद्युत क्षेत्र E = λ / (2πε₀r) होता है। अतः E, दूरी r के व्युत्क्रमानुपाती होता है।"
  },
  {
    "topic": "संधारित्र एवं धारिता (Capacitors & Capacitance)",
    "q": "समानांतर पट्टिका संधारित्र की पट्टिकाओं के बीच परावैद्युत पदार्थ (Dielectric constant K) रखने पर उसकी धारिता पर क्या प्रभाव पड़ता है?\n[English: What happens to the capacitance of a parallel plate capacitor when a dielectric slab of constant K is inserted?]",
    "options": [
      "A) घटती है (C/K) / Decreases",
      "B) अपरिवर्तित रहती है / Remains Unchanged",
      "C) K गुना बढ़ जाती है (KC) / Increases by K times",
      "D) शून्य हो जाती है / Becomes Zero"
    ],
    "correct": 2,
    "ans": "C) K गुना बढ़ जाती है (KC) / Increases by K times",
    "exp": "💡 सही उत्तर: C) K गुना बढ़ जाती है। निर्वात में धारिता C₀ = ε₀A/d होती है। परावैद्युत माध्यम भरने पर नई धारिता C = K(ε₀A/d) = K·C₀ हो जाती है।"
  },
  {
    "topic": "विद्युत धारा (Current Electricity & Drift Velocity)",
    "q": "किसी चालक तार में विद्युत धारा (I) तथा अपवाह वेग (Drift Velocity, v_d) के बीच सही संबंध क्या है?\n[English: What is the correct relation between electric current (I) and drift velocity (v_d) in a conductor?]",
    "options": [
      "A) I = n e A v_d",
      "B) I = n e / (A v_d)",
      "C) I = n A / (e v_d)",
      "D) I = v_d / (n e A)"
    ],
    "correct": 0,
    "ans": "A) I = n e A v_d",
    "exp": "💡 सही उत्तर: A) I = n e A v_d। यहाँ n = मुक्त इलेक्ट्रॉन घनत्व, e = मूल आवेश, A = चालक का अनुप्रस्थ काट क्षेत्रफल तथा v_d = अपवाह वेग है।"
  },
  {
    "topic": "विद्युत धारा (Kirchhoff's Laws)",
    "q": "किरचॉफ का प्रथम नियम (संधि नियम, Junction Rule) किस भौतिक राशि के संरक्षण के नियम पर आधारित है?\n[English: Kirchhoff's first law (Junction rule) is based on the conservation of which physical quantity?]",
    "options": [
      "A) ऊर्जा संरक्षण / Conservation of Energy",
      "B) आवेश संरक्षण / Conservation of Charge",
      "C) संवेग संरक्षण / Conservation of Momentum",
      "D) द्रव्यमान संरक्षण / Conservation of Mass"
    ],
    "correct": 1,
    "ans": "B) आवेश संरक्षण / Conservation of Charge",
    "exp": "💡 सही उत्तर: B) आवेश संरक्षण। किसी विद्युत संधि पर मिलने वाली समस्त धाराओं का बीजगणितीय योग शून्य होता है (ΣI = 0)। किरचॉफ का द्वितीय नियम (लूप नियम) ऊर्जा संरक्षण पर आधारित है।"
  },
  {
    "topic": "विद्युत धारा (Kirchhoff's Laws)",
    "q": "किरचॉफ का द्वितीय नियम (लूप नियम / वोल्टेज नियम) किसके संरक्षण पर आधारित है?\n[English: Kirchhoff's second law (Loop rule / Voltage law) is based on the conservation of:]",
    "options": [
      "A) आवेश / Charge",
      "B) ऊर्जा / Energy",
      "C) संवेग / Momentum",
      "D) कोणीय संवेग / Angular Momentum"
    ],
    "correct": 1,
    "ans": "B) ऊर्जा / Energy",
    "exp": "💡 सही उत्तर: B) ऊर्जा। किसी बंद विद्युत परिपथ के विभिन्न खंडों में धाराओं तथा उनके प्रतिरोधों के गुणनफलों का बीजगणितीय योग उस लूप में उपस्थित विद्युत वाहक बलों के योग के बराबर होता है (ΣIR = ΣE)। यह ऊर्जा संरक्षण का प्रकटीकरण है।"
  },
  {
    "topic": "विद्युत धारा (Heating Effects of Current)",
    "q": "विद्युत हीटर का तार (Heating Element) किस मिश्रधातु का बना होता है?\n[English: The heating element of an electric heater is made of which alloy?]",
    "options": [
      "A) तांबा / Copper",
      "B) टंगस्टन / Tungsten",
      "C) नाइक्रोम / Nichrome",
      "D) एल्युमिनियम / Aluminium"
    ],
    "correct": 2,
    "ans": "C) नाइक्रोम / Nichrome",
    "exp": "💡 सही उत्तर: C) नाइक्रोम (Nichrome)। नाइक्रोम निकल (80%) और क्रोमियम (20%) की मिश्रधातु है। इसकी उच्च प्रतिरोधकता (High Resistivity) और उच्च गलनांक (High Melting Point) होता है तथा यह उच्च ताप पर ऑक्सीकृत नहीं होता।"
  },
  {
    "topic": "गतिमान आवेश एवं चुंबकत्व (Moving Charges & Magnetism)",
    "q": "चुंबकीय क्षेत्र B⃗ में वेग v⃗ से गतिमान आवेश q पर लगने वाले लॉरेंट्ज चुंबकीय बल का सदिश रूप क्या है?\n[English: What is the vector form of magnetic Lorentz force acting on a charge q moving with velocity v⃗ in magnetic field B⃗?]",
    "options": [
      "A) F⃗ = q(v⃗ · B⃗)",
      "B) F⃗ = q(v⃗ × B⃗)",
      "C) F⃗ = q(B⃗ × v⃗)",
      "D) F⃗ = (v⃗ × B⃗) / q"
    ],
    "correct": 1,
    "ans": "B) F⃗ = q(v⃗ × B⃗)",
    "exp": "💡 सही उत्तर: B) F⃗ = q(v⃗ × B⃗)। परिमाण F = qvB sin θ होता है। यदि आवेश चुंबकीय क्षेत्र की दिशा में गति करे (θ = 0°), तो बल शून्य होता है। जब θ = 90° हो, तो बल अधिकतम F_max = qvB होता है।"
  },
  {
    "topic": "गतिमान आवेश एवं चुंबकत्व (Moving Charges & Magnetism)",
    "q": "एक आदर्श वोल्टमीटर (Ideal Voltmeter) का प्रतिरोध कितना होना चाहिए?\n[English: What should be the resistance of an ideal voltmeter?]",
    "options": [
      "A) शून्य / Zero",
      "B) अनंत / Infinite",
      "C) 1 ओम / 1 Ohm",
      "D) बहुत कम / Very Low"
    ],
    "correct": 1,
    "ans": "B) अनंत / Infinite",
    "exp": "💡 सही उत्तर: B) अनंत (Infinite)। एक आदर्श वोल्टमीटर का प्रतिरोध अनंत होना चाहिए ताकि वह परिपथ से कोई धारा न खींचे और वास्तविक विभवांतर सटीक नाप सके। आदर्श अमीटर का प्रतिरोध शून्य होना चाहिए।"
  },
  {
    "topic": "चुंबकत्व एवं द्रव्य (Magnetism & Matter)",
    "q": "अनुचुंबकीय (Paramagnetic) पदार्थों की चुंबकीय प्रवृत्ति (Magnetic Susceptibility, χ) कैसी होती है?\n[English: The magnetic susceptibility (χ) of paramagnetic materials is:]",
    "options": [
      "A) ऋणात्मक तथा कम / Negative and small",
      "B) धनात्मक तथा अल्प / Positive and small",
      "C) धनात्मक तथा अत्यधिक बड़ी / Positive and very large",
      "D) शून्य / Zero"
    ],
    "correct": 1,
    "ans": "B) धनात्मक तथा अल्प / Positive and small",
    "exp": "💡 सही उत्तर: B) धनात्मक तथा अल्प (Positive and small)। प्रतिचुंबकीय (Diamagnetic) की प्रवृत्ति ऋणात्मक होती है, अनुचुंबकीय (Paramagnetic) की अल्प धनात्मक तथा लौहचुंबकीय (Ferromagnetic) की बहुत अधिक धनात्मक (χ >> 1) होती है।"
  },
  {
    "topic": "विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
    "q": "लेन्ज का नियम (Lenz's Law) किस मौलिक संरक्षण नियम का परिणाम है?\n[English: Lenz's Law is a consequence of which conservation law?]",
    "options": [
      "A) आवेश संरक्षण / Conservation of Charge",
      "B) ऊर्जा संरक्षण / Conservation of Energy",
      "C) संवेग संरक्षण / Conservation of Momentum",
      "D) द्रव्यमान संरक्षण / Conservation of Mass"
    ],
    "correct": 1,
    "ans": "B) ऊर्जा संरक्षण / Conservation of Energy",
    "exp": "💡 सही उत्तर: B) ऊर्जा संरक्षण। लेन्ज के नियम के अनुसार प्रेरित विद्युत वाहक बल या धारा की दिशा सदैव ऐसी होती है कि वह उस कारण का विरोध करती है जिससे वह स्वयं उत्पन्न होती है। यांत्रिक कार्य ही विद्युत ऊर्जा में रूपांतरित होता है।"
  },
  {
    "topic": "विद्युत चुंबकीय प्रेरण (Electromagnetic Induction)",
    "q": "स्वप्रेरकत्व (Self-Inductance, L) का SI मात्रक क्या होता है?\n[English: What is the SI unit of Self-Inductance (L)?]",
    "options": [
      "A) वेबर / Weber (Wb)",
      "B) हेनरी / Henry (H)",
      "C) टेस्ला / Tesla (T)",
      "D) गॉस / Gauss (G)"
    ],
    "correct": 1,
    "ans": "B) हेनरी / Henry (H)",
    "exp": "💡 सही उत्तर: B) हेनरी (Henry, H)। सूत्र: e = -L (dI/dt) ⟹ L = e / (dI/dt) = Volt · second / Ampere = Henry (H)। चुंबकीय फ्लक्स का मात्रक वेबर (Weber) तथा चुंबकीय क्षेत्र का मात्रक टेस्ला (Tesla) है।"
  },
  {
    "topic": "प्रत्यावर्ती धारा (Alternating Current - AC)",
    "q": "प्रत्यावर्ती धारा के शिखर मान (I₀) तथा वर्ग माध्य मूल मान (I_rms) के बीच सही संबंध क्या है?\n[English: What is the relation between peak current (I₀) and root mean square current (I_rms)?]",
    "options": [
      "A) I_rms = I₀ / √2 = 0.707 I₀",
      "B) I_rms = √2 I₀",
      "C) I_rms = I₀ / 2",
      "D) I_rms = 2 I₀"
    ],
    "correct": 0,
    "ans": "A) I_rms = I₀ / √2 = 0.707 I₀",
    "exp": "💡 सही उत्तर: A) I_rms = I₀ / √2। प्रत्यावर्ती धारा का RMS मान शिखर मान का 1/√2 गुना (लगभग 70.7%) होता है। भारत में घरेलू 220V आपूर्ति इसका RMS मान ही होती है, जिसका शिखर मान 220 × √2 ≈ 311V होता है।"
  },
  {
    "topic": "प्रत्यावर्ती धारा (Alternating Current - AC)",
    "q": "एक शुद्ध प्रेरकत्व (Pure Inductive) परिपथ में प्रत्यावर्ती वोल्टेज तथा धारा के बीच कलान्तर (Phase Difference) कितना होता है?\n[English: In a pure inductive AC circuit, what is the phase difference between voltage and current?]",
    "options": [
      "A) शून्य / Zero (समान कला)",
      "B) वोल्टेज, धारा से 90° (π/2) अग्रगामी होता है / Voltage leads current by 90°",
      "C) धारा, वोल्टेज से 90° अग्रगामी होती है / Current leads voltage by 90°",
      "D) 180°"
    ],
    "correct": 1,
    "ans": "B) वोल्टेज, धारा से 90° (π/2) अग्रगामी होता है / Voltage leads current by 90°",
    "exp": "💡 सही उत्तर: B) वोल्टेज धारा से 90° अग्रगामी होता है। शुद्ध प्रेरक में वोल्टेज धारा से π/2 आगे रहता है। शुद्ध धारिता (Capacitor) में धारा वोल्टेज से π/2 आगे रहती है। शुद्ध प्रतिरोधक में कलान्तर शून्य होता है।"
  },
  {
    "topic": "प्रत्यावर्ती धारा (Alternating Current - AC)",
    "q": "ट्रांसफार्मर किस सिद्धांत पर कार्य करता है?\n[English: On which principle does a transformer work?]",
    "options": [
      "A) स्वप्रेरण / Self Induction",
      "B) अन्योन्य प्रेरण / Mutual Induction",
      "C) भंवर धाराएँ / Eddy Currents",
      "D) प्रकाश विद्युत प्रभाव / Photoelectric Effect"
    ],
    "correct": 1,
    "ans": "B) अन्योन्य प्रेरण / Mutual Induction",
    "exp": "💡 सही उत्तर: B) अन्योन्य प्रेरण (Mutual Induction)। जब प्राथमिक कुंडली में प्रत्यावर्ती धारा प्रवाहित होती है, तो उसके चुंबकीय फ्लक्स में परिवर्तन से द्वितीयक कुंडली में प्रेरित विद्युत वाहक बल उत्पन्न हो जाता है। ट्रांसफार्मर केवल AC पर कार्य करता है, DC पर नहीं।"
  },
  {
    "topic": "विद्युत चुंबकीय तरंगें (Electromagnetic Waves)",
    "q": "निम्नलिखित में से किसकी तरंगदैर्घ्य (Wavelength) सबसे कम (न्यूनतम) तथा आवृत्ति सर्वाधिक होती है?\n[English: Which of the following has the minimum wavelength and highest frequency?]",
    "options": [
      "A) रेडियो तरंगें / Radio Waves",
      "B) गामा किरणें / Gamma Rays (γ-rays)",
      "C) सूक्ष्म तरंगें / Microwaves",
      "D) दृश्य प्रकाश / Visible Light"
    ],
    "correct": 1,
    "ans": "B) गामा किरणें / Gamma Rays (γ-rays)",
    "exp": "💡 सही उत्तर: B) गामा किरणें। विद्युत चुंबकीय स्पेक्ट्रम क्रम (घटती तरंगदैर्घ्य): रेडियो > माइक्रो > अवरक्त > दृश्य प्रकाश > पराबैंगनी > एक्स-किरणें > गामा किरणें। गामा किरणों की तरंगदैर्घ्य सबसे कम (< 10⁻¹² m) और ऊर्जा व भेदन क्षमता सर्वाधिक होती है।"
  },
  {
    "topic": "किरण प्रकाशिकी (Ray Optics & Refraction)",
    "q": "ऑप्टिकल फाइबर (प्रकाशीय तंतु) प्रकाश के किस सिद्धांत पर आधारित है?\n[English: Optical fiber works on which optical principle?]",
    "options": [
      "A) प्रकाश का प्रकीर्णन / Scattering of Light",
      "B) पूर्ण आंतरिक परावर्तन / Total Internal Reflection (TIR)",
      "C) प्रकाश का विवर्तन / Diffraction",
      "D) प्रकाश का अपवर्तन / Simple Refraction"
    ],
    "correct": 1,
    "ans": "B) पूर्ण आंतरिक परावर्तन / Total Internal Reflection (TIR)",
    "exp": "💡 सही उत्तर: B) पूर्ण आंतरिक परावर्तन (TIR)। ऑप्टिकल फाइबर में कोर का अपवर्तनांक क्लैडिंग से अधिक होता है। जब प्रकाश किरण क्रांतिक कोण से बड़े कोण पर प्रवेश करती है, तो वह बिना ऊर्जा ह्रास के बार-बार पूर्ण आंतरिक परावर्तित होकर आगे बढ़ती है।"
  },
  {
    "topic": "किरण प्रकाशिकी (Ray Optics & Lenses)",
    "q": "दो पतले लेंस जिनकी क्षमताएँ क्रमशः +4D तथा -2D हैं, संपर्क में रखे हैं। संयुक्त लेंस की फोकस दूरी क्या होगी?\n[English: Two thin lenses of powers +4D and -2D are in contact. What is the focal length of the combination?]",
    "options": [
      "A) +50 cm",
      "B) -50 cm",
      "C) +25 cm",
      "D) +100 cm"
    ],
    "correct": 0,
    "ans": "A) +50 cm",
    "exp": "💡 सही उत्तर: A) +50 cm। संयुक्त क्षमता P = P₁ + P₂ = (+4) + (-2) = +2 D। फोकस दूरी f = 1/P मीटर = 1/2 m = +50 cm। धनात्मक चिह्न दर्शाता है कि संयोजन उत्तल लेंस (Convex lens) की भांति कार्य करता है।"
  },
  {
    "topic": "तरंग प्रकाशिकी (Wave Optics & Interference)",
    "q": "यंग के द्वि-झिरी प्रयोग (YDSE) में फ्रिंज चौड़ाई (Fringe Width, β) का सूत्र क्या होता है?\n[English: In Young's double slit experiment (YDSE), what is the formula for fringe width (β)?]",
    "options": [
      "A) β = λ D / d",
      "B) β = λ d / D",
      "C) β = D d / λ",
      "D) β = λ / (D d)"
    ],
    "correct": 0,
    "ans": "A) β = λ D / d",
    "exp": "💡 सही उत्तर: A) β = λ D / d। यहाँ λ = प्रयुक्त प्रकाश की तरंगदैर्घ्य, D = झिरियों से पर्दे की दूरी तथा d = दोनों झिरियों के बीच की अल्प दूरी है। लाल प्रकाश के लिए λ अधिक होने से फ्रिंज चौड़ाई सबसे अधिक होती है।"
  },
  {
    "topic": "तरंग प्रकाशिकी (Wave Optics & Polarization)",
    "q": "ब्रूस्टर का नियम (Brewster's Law) माध्यम के अपवर्तनांक (μ) तथा ध्रुवण कोण (i_p) के बीच क्या संबंध बताता है?\n[English: Brewster's Law states which relation between refractive index (μ) and polarizing angle (i_p)?]",
    "options": [
      "A) μ = sin i_p",
      "B) μ = tan i_p",
      "C) μ = cos i_p",
      "D) μ = cot i_p"
    ],
    "correct": 1,
    "ans": "B) μ = tan i_p",
    "exp": "💡 सही उत्तर: B) μ = tan i_p। ब्रूस्टर के नियमानुसार जब प्रकाश ध्रुवण कोण (Brewster's angle) पर आपतित होता है, तो परावर्तित प्रकाश पूर्णतः समतल ध्रुवित होता है तथा परावर्तित व अपवर्तित किरणें परस्पर लंबवत (90°) होती हैं।"
  },
  {
    "topic": "विकिरण तथा द्रव्य की द्वैत प्रकृति (Dual Nature of Radiation)",
    "q": "प्रकाश विद्युत प्रभाव (Photoelectric Effect) की सफल व्याख्या के लिए अल्बर्ट आइंस्टीन को नोबेल पुरस्कार किस सिद्धांत के अनुप्रयोग पर दिया गया था?\n[English: Albert Einstein was awarded the Nobel Prize for explaining the Photoelectric Effect based on:]",
    "options": [
      "A) मैक्सवेल के तरंग सिद्धांत / Maxwell Wave Theory",
      "B) प्लांक का क्वांटम सिद्धांत / Planck's Quantum Theory (Photon Concept)",
      "C) रदरफोर्ड नाभिकीय मॉडल / Rutherford Model",
      "D) बोर का परमाणु मॉडल / Bohr Model"
    ],
    "correct": 1,
    "ans": "B) प्लांक का क्वांटम सिद्धांत / Planck's Quantum Theory (Photon Concept)",
    "exp": "💡 सही उत्तर: B) प्लांक का क्वांटम सिद्धांत। आइंस्टीन ने 1905 में फोटॉन अवधारणा (E = hν) के आधार पर प्रकाश विद्युत समीकरण K_max = hν - Φ₀ प्रतिपादित किया। इसके लिए उन्हें 1921 में भौतिकी का नोबेल पुरस्कार प्रदान किया गया।"
  },
  {
    "topic": "विकिरण तथा द्रव्य की द्वैत प्रकृति (Dual Nature of Radiation)",
    "q": "संवेग p वाले गतिशील कण की डी-ब्रोग्ली तरंगदैर्घ्य (de Broglie Wavelength, λ) क्या होती है?\n[English: What is the de Broglie wavelength (λ) of a moving particle having momentum p?]",
    "options": [
      "A) λ = h / p",
      "B) λ = p / h",
      "C) λ = h · p",
      "D) λ = h / p²"
    ],
    "correct": 0,
    "ans": "A) λ = h / p",
    "exp": "💡 सही उत्तर: A) λ = h / p। डी-ब्रोग्ली परिकल्पना के अनुसार द्रव्य कणों के साथ भी तरंग संबद्ध होती है। तरंगदैर्घ्य λ = h / p = h / (mv) = h / √(2mE) होती है, जहाँ h प्लांक नियतांक है।"
  },
  {
    "topic": "परमाणु (Atoms & Bohr Model)",
    "q": "हाइड्रोजन परमाणु के प्रथम बोर कक्ष की त्रिज्या (Bohr Radius, r₁) का मान लगभग कितना होता है?\n[English: What is the approximate value of the first Bohr orbit radius (r₁) of a hydrogen atom?]",
    "options": [
      "A) 0.529 Å (0.053 nm)",
      "B) 1.058 Å",
      "C) 0.265 Å",
      "D) 5.29 Å"
    ],
    "correct": 0,
    "ans": "A) 0.529 Å (0.053 nm)",
    "exp": "💡 सही उत्तर: A) 0.529 Å। बोर मॉडल के अनुसार r_n = 0.529 × (n² / Z) Å। हाइड्रोजन के लिए Z = 1 तथा प्रथम कक्षा के लिए n = 1 ⟹ r₁ = 0.529 Å।"
  },
  {
    "topic": "परमाणु (Atoms & Spectral Series)",
    "q": "हाइड्रोजन परमाणु स्पेक्ट्रम की कौन सी श्रेणी विद्युत चुंबकीय स्पेक्ट्रम के दृश्य प्रकाश (Visible Light) क्षेत्र में पड़ती है?\n[English: Which spectral series of the hydrogen atom lies in the visible light region?]",
    "options": [
      "A) लाइमन श्रेणी / Lyman Series",
      "B) बामर श्रेणी / Balmer Series",
      "C) पाश्चन श्रेणी / Paschen Series",
      "D) फुंड श्रेणी / Pfund Series"
    ],
    "correct": 1,
    "ans": "B) बामर श्रेणी / Balmer Series",
    "exp": "💡 सही उत्तर: B) बामर श्रेणी (Balmer Series)। लाइमन श्रेणी पराबैंगनी (UV) क्षेत्र में, बामर श्रेणी दृश्य प्रकाश (Visible) में, तथा पाश्चन, ब्रैकेट व फुंड श्रेणियां अवरक्त (Infrared) क्षेत्र में पड़ती हैं।"
  },
  {
    "topic": "नाभिक (Nuclei & Binding Energy)",
    "q": "1 परमाणु द्रव्यमान मात्रक (1 amu / 1 u) के तुल्य ऊर्जा कितनी होती है?\n[English: What is the equivalent energy of 1 atomic mass unit (1 amu / 1 u)?]",
    "options": [
      "A) 931.5 MeV",
      "B) 93.15 MeV",
      "C) 1.6 × 10⁻¹⁹ J",
      "D) 931.5 eV"
    ],
    "correct": 0,
    "ans": "A) 931.5 MeV",
    "exp": "💡 सही उत्तर: A) 931.5 MeV। आइंस्टीन के द्रव्यमान-ऊर्जा समीकरण E = Δm · c² से 1 u (1.66 × 10⁻²⁷ kg) के समतुल्य ऊर्जा 931.5 मिलियन इलेक्ट्रॉन वोल्ट (MeV) प्राप्त होती है।"
  },
  {
    "topic": "नाभिक (Nuclei & Radioactivity)",
    "q": "सूर्य तथा अन्य तारों में ऊर्जा का विशाल स्रोत निम्नलिखित में से कौन सी नाभिकीय प्रक्रिया है?\n[English: Which nuclear process is the source of tremendous energy in the Sun and stars?]",
    "options": [
      "A) नाभिकीय विखंडन / Nuclear Fission",
      "B) नाभिकीय संलयन / Nuclear Fusion",
      "C) रेडियोएक्टिव क्षय / Radioactive Decay",
      "D) रासायनिक दहन / Chemical Combustion"
    ],
    "correct": 1,
    "ans": "B) नाभिकीय संलयन / Nuclear Fusion",
    "exp": "💡 सही उत्तर: B) नाभिकीय संलयन (Nuclear Fusion)। तारों में अत्यधिक उच्च ताप और दाब पर हल्के हाइड्रोजन नाभिक संलयित होकर हीलियम नाभिक बनाते हैं (प्रोटॉन-प्रोटॉन चक्र), जिसमें भारी मात्रा में ऊर्जा मुक्त होती है।"
  },
  {
    "topic": "अर्धचालक इलेक्ट्रॉनिकी (Semiconductor Electronics)",
    "q": "शुद्ध (नैज) अर्धचालक (Intrinsic Semiconductor - सिलिकॉन/जर्मेनियम) में त्रिसंयोजी (Trivalent - बोरॉन, एल्युमिनियम) अपद्रव्य मिलाने पर किस प्रकार का अर्धचालक प्राप्त होता है?\n[English: Doping a pure semiconductor with trivalent impurities (B, Al, Ga) produces which type of semiconductor?]",
    "options": [
      "A) n-प्रकार अर्धचालक / n-type",
      "B) p-प्रकार अर्धचालक / p-type",
      "C) कुचालक / Insulator",
      "D) अतिचालक / Superconductor"
    ],
    "correct": 1,
    "ans": "B) p-प्रकार अर्धचालक / p-type",
    "exp": "💡 सही उत्तर: B) p-प्रकार अर्धचालक (p-type)। त्रिसंयोजी अपद्रव्य मिलाने पर संयोजी बंध में एक इलेक्ट्रॉन की कमी से कोटर (Hole) बनता है। अतः p-प्रकार में बहुसंख्यक आवेश वाहक होल (Holes) होते हैं। पंचसंयोजी (P, As, Sb) मिलाने पर n-प्रकार बनता है।"
  },
  {
    "topic": "अर्धचालक इलेक्ट्रॉनिकी (Semiconductor Electronics)",
    "q": "परम शून्य ताप (Absolute Zero - 0 K) पर एक शुद्ध अर्धचालक (Pure Silicon/Germanium) किस प्रकार व्यवहार करता है?\n[English: At absolute zero temperature (0 K), how does an intrinsic semiconductor behave?]",
    "options": [
      "A) एक आदर्श चालक की भांति / Like a perfect conductor",
      "B) एक आदर्श कुचालक (विद्युतरोधी) की भांति / Like an ideal insulator",
      "C) अतिचालक की भांति / Like a superconductor",
      "D) अर्धचालक ही रहता है"
    ],
    "correct": 1,
    "ans": "B) एक आदर्श कुचालक (विद्युतरोधी) की भांति / Like an ideal insulator",
    "exp": "💡 सही उत्तर: B) एक आदर्श कुचालक की भांति। 0 K पर सभी संयोजी इलेक्ट्रॉन दृढ़तापूर्वक सहसंयोजक बंधों में बंधे होते हैं और चालन बैंड में कोई मुक्त इलेक्ट्रॉन नहीं होता। अतः चालकता शून्य हो जाती है।"
  },
  {
    "topic": "अर्धचालक इलेक्ट्रॉनिकी (Logic Gates)",
    "q": "NAND गेट का बूलियन व्यंजक (Boolean Expression) क्या होता है?\n[English: What is the Boolean expression for a NAND gate?]",
    "options": [
      "A) Y = A + B",
      "B) Y = A · B",
      "C) Y = (A · B)' (NOT of AND)",
      "D) Y = (A + B)'"
    ],
    "correct": 2,
    "ans": "C) Y = (A · B)' (NOT of AND)",
    "exp": "💡 सही उत्तर: C) Y = (A · B)'। NAND गेट AND गेट और NOT गेट का संयोजन है। इसका आउटपुट तभी 0 होता है जब दोनों इनपुट 1 हों। NAND तथा NOR गेटों को सार्वत्रिक गेट (Universal Gates) कहा जाता है।"
  },
  {
    "topic": "अर्धचालक इलेक्ट्रॉनिकी (Semiconductor Diodes)",
    "q": "p-n संधि डायोड को अग्र अभिनति (Forward Bias) में जोड़ने पर अवक्षय परत (Depletion Layer) की चौड़ाई पर क्या प्रभाव पड़ता है?\n[English: What happens to the width of the depletion layer when a p-n junction is forward biased?]",
    "options": [
      "A) घटती है / Decreases",
      "B) बढ़ती है / Increases",
      "C) अपरिवर्तित रहती है / Remains same",
      "D) अनंत हो जाती है / Becomes infinite"
    ],
    "correct": 0,
    "ans": "A) घटती है / Decreases",
    "exp": "💡 सही उत्तर: A) घटती है (Decreases)। अग्र अभिनति में बाह्य विद्युत क्षेत्र आंतरिक रोधिका क्षेत्र का विरोध करता है, जिससे अवक्षय परत पतली हो जाती है और धारा सुगमता से प्रवाहित होती है। पश्च अभिनति (Reverse bias) में परत की चौड़ाई बढ़ जाती है।"
  }
];

const CLASS12_CHEMISTRY_BANK = [
  {
    "topic": "विलयन (Solutions & Henry's Law)",
    "q": "सोडा वाटर तथा शीतल पेयों में CO₂ की घुलनशीलता बढ़ाने के लिए बोतल को उच्च दाब पर बंद किया जाता है। यह किस नियम का अनुप्रयोग है?\n[English: In soda water bottles, CO₂ solubility is increased by sealing under high pressure. This applies which law?]",
    "options": [
      "A) राउल्ट का नियम / Raoult's Law",
      "B) हेनरी का नियम / Henry's Law",
      "C) बॉयल का नियम / Boyle's Law",
      "D) डाल्टन का नियम / Dalton's Law"
    ],
    "correct": 1,
    "ans": "B) हेनरी का नियम / Henry's Law",
    "exp": "💡 सही उत्तर: B) हेनरी का नियम। हेनरी के नियमानुसार स्थिर ताप पर किसी विलायक में गैस की विलेयता द्रव की सतह पर लगने वाले गैस के आंशिक दाब के समानुपाती होती है (p = K_H · x)।"
  },
  {
    "topic": "विलयन (Solutions & Colligative Properties)",
    "q": "निम्नलिखित में से कौन सा विलयन का अणुसंख्य गुणधर्म (Colligative Property) नहीं है?\n[English: Which of the following is NOT a colligative property of solutions?]",
    "options": [
      "A) परासरण दाब / Osmotic Pressure",
      "B) पृष्ठ तनाव / Surface Tension",
      "C) क्वथनांक में उन्नयन / Elevation in Boiling Point",
      "D) हिमांक में अवनमन / Depression in Freezing Point"
    ],
    "correct": 1,
    "ans": "B) पृष्ठ तनाव / Surface Tension",
    "exp": "💡 सही उत्तर: B) पृष्ठ तनाव (Surface Tension)। अणुसंख्य गुणधर्म वे गुण हैं जो विलेय के कणों की संख्या पर निर्भर करते हैं, उनकी प्रकृति पर नहीं। चार मुख्य अणुसंख्य गुणधर्म हैं: वाष्प दाब का आपेक्षिक अवनमन, क्वथनांक उन्नयन, हिमांक अवनमन और परासरण दाब।"
  },
  {
    "topic": "विलयन (Solutions & Osmotic Pressure)",
    "q": "तनु विलयनों के लिए परासरण दाब (π) का सही सूत्र क्या होता है?\n[English: What is the correct formula for osmotic pressure (π) of dilute solutions?]",
    "options": [
      "A) π = CRT",
      "B) π = C / RT",
      "C) π = RT / C",
      "D) π = C² RT"
    ],
    "correct": 0,
    "ans": "A) π = CRT",
    "exp": "💡 सही उत्तर: A) π = CRT = (n/V)RT। यहाँ C = मोलर सांद्रता, R = गैस नियतांक तथा T = परम ताप है। वान्ट हॉफ नियम के अनुसार परासरण दाब सांद्रता और ताप के समानुपाती होता है।"
  },
  {
    "topic": "वैद्युतरसायन (Electrochemistry & Kohlrausch's Law)",
    "q": "अनंत तनुता पर किसी दुर्बल विद्युत अपघट्य (जैसे CH₃COOH) की मोलर चालकता ज्ञात करने के लिए किस नियम का उपयोग किया जाता है?\n[English: Which law is used to determine the molar conductivity of a weak electrolyte at infinite dilution?]",
    "options": [
      "A) फैराडे का विद्युत अपघटन नियम / Faraday's Law",
      "B) कोलराउश का नियम (आयन स्वतंत्र अभिगमन) / Kohlrausch's Law",
      "C) नेर्न्स्ट समीकरण / Nernst Equation",
      "D) ओस्टवाल्ड का तनुता नियम / Ostwald's Law"
    ],
    "correct": 1,
    "ans": "B) कोलराउश का नियम / Kohlrausch's Law",
    "exp": "💡 सही उत्तर: B) कोलराउश का नियम। कोलराउश के आयनों के स्वतंत्र अभिगमन के नियमानुसार अनंत तनुता पर किसी विद्युत अपघट्य की मोलर चालकता उसके धनायनों तथा ऋणायनों की व्यक्तिगत मोलर चालकताओं के योग के बराबर होती है।"
  },
  {
    "topic": "वैद्युतरसायन (Electrochemistry & Faraday's Laws)",
    "q": "विद्युत अपघटन में 1 मोल Al³⁺ आयनों को धात्विक एल्युमिनियम (Al) में अपचयित करने के लिए कितने फैराडे (F) विद्युत आवेश की आवश्यकता होगी?\n[English: How many Faradays of charge are required to reduce 1 mole of Al³⁺ to metallic Al?]",
    "options": [
      "A) 1 F",
      "B) 2 F",
      "C) 3 F (3 × 96500 C)",
      "D) 4 F"
    ],
    "correct": 2,
    "ans": "C) 3 F (3 × 96500 C)",
    "exp": "💡 सही उत्तर: C) 3 F। अर्ध-अभिक्रिया: Al³⁺ + 3e⁻ → Al। 1 मोल Al³⁺ के अपचयन हेतु 3 मोल इलेक्ट्रॉनों की आवश्यकता होती है। 1 मोल इलेक्ट्रॉन का आवेश = 1 फैराडे (≈ 96,500 कूलॉम) होता है, अतः कुल 3F आवेश चाहिए।"
  },
  {
    "topic": "रासायनिक बलगतिकी (Chemical Kinetics)",
    "q": "प्रथम कोटि की अभिक्रिया (First Order Reaction) के अर्ध-आयुकाल (t₁/₂) का सूत्र क्या होता है?\n[English: What is the formula for the half-life period (t₁/₂) of a first-order reaction?]",
    "options": [
      "A) t₁/₂ = 0.693 / k",
      "B) t₁/₂ = k / 0.693",
      "C) t₁/₂ = [R]₀ / (2k)",
      "D) t₁/₂ = 1 / (k [R]₀)"
    ],
    "correct": 0,
    "ans": "A) t₁/₂ = 0.693 / k",
    "exp": "💡 सही उत्तर: A) t₁/₂ = 0.693 / k। प्रथम कोटि की अभिक्रिया का अर्ध-आयुकाल अभिकारकों की प्रारंभिक सांद्रता पर बिल्कुल निर्भर नहीं करता है, यह केवल वेग स्थिरांक k पर निर्भर करता है।"
  },
  {
    "topic": "रासायनिक बलगतिकी (Chemical Kinetics)",
    "q": "अभिक्रिया की दर (Rate of Reaction) और वेग स्थिरांक (Rate Constant, k) की इकाई किस कोटि की अभिक्रिया के लिए समान होती है?\n[English: For which order of reaction are the units of rate of reaction and rate constant identical?]",
    "options": [
      "A) प्रथम कोटि / First Order",
      "B) शून्य कोटि / Zero Order (mol L⁻¹ s⁻¹)",
      "C) द्वितीय कोटि / Second Order",
      "D) तृतीय कोटि / Third Order"
    ],
    "correct": 1,
    "ans": "B) शून्य कोटि / Zero Order (mol L⁻¹ s⁻¹)",
    "exp": "💡 सही उत्तर: B) शून्य कोटि (Zero Order)। शून्य कोटि की अभिक्रिया में Rate = k [A]⁰ = k। अतः वेग स्थिरांक k की इकाई भी दर की भांति mol L⁻¹ s⁻¹ ही होती है।"
  },
  {
    "topic": "d- एवं f-ब्लॉक के तत्व (d- and f-Block Elements)",
    "q": "संक्रमण तत्व (Transition Elements) तथा उनके यौगिक प्रायः उत्प्रेरक (Catalyst) के रूप में कार्य करते हैं, इसका मुख्य कारण क्या है?\n[English: Transition elements and their compounds act as good catalysts mainly because of:]",
    "options": [
      "A) उनकी परिवर्ती संयोजकता (ऑक्सीकरण अवस्था) तथा रिक्त d-कक्षक / Variable oxidation states and vacant d-orbitals",
      "B) उनका उच्च घनत्व / High density",
      "C) उनकी चुंबकीय उदासीनता / Magnetic neutrality",
      "D) उनका कम गलनांक / Low melting point"
    ],
    "correct": 0,
    "ans": "A) उनकी परिवर्ती संयोजकता तथा रिक्त d-कक्षक",
    "exp": "💡 सही उत्तर: A) परिवर्ती ऑक्सीकरण अवस्थाएं तथा रिक्त d-कक्षक। संक्रमण धातुएं अपनी परिवर्ती ऑक्सीकरण अवस्थाओं के कारण मध्यवर्ती संकुल बना सकती हैं और अभिक्रिया की सक्रियण ऊर्जा को घटाकर दर बढ़ा देती हैं।"
  },
  {
    "topic": "d- एवं f-ब्लॉक के तत्व (d- and f-Block Elements)",
    "q": "लैन्थेनॉयड संकुचन (Lanthanoid Contraction) का प्रमुख कारण क्या है?\n[English: The primary cause of Lanthanoid Contraction is:]",
    "options": [
      "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
      "B) नाभिकीय आवेश में कमी / Decrease in nuclear charge",
      "C) 5d कक्षकों का विखंडन / Splitting of 5d",
      "D) संयोजी इलेक्ट्रॉनों की वृद्धि / Increase in valence electrons"
    ],
    "correct": 0,
    "ans": "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
    "exp": "💡 सही उत्तर: A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव। f-कक्षकों का आकार विसरित (diffuse) होने के कारण वे बाह्यतम इलेक्ट्रॉनों को नाभिक के आकर्षण से प्रभावी रूप से नहीं बचा पाते, जिससे परमाणु आकार में क्रमिक संकुचन होता है।"
  },
  {
    "topic": "उपसहसंयोजन यौगिक (Coordination Compounds)",
    "q": "संकुल [Co(NH₃)₆]Cl₃ में कोबाल्ट (Co) की प्राथमिक संयोजकता (Primary Valency) तथा द्वितीयक संयोजकता (Secondary Valency) क्या है?\n[English: In the complex [Co(NH₃)₆]Cl₃, what are the primary and secondary valencies of Cobalt?]",
    "options": [
      "A) प्राथमिक = 3, द्वितीयक = 6",
      "B) प्राथमिक = 6, द्वितीयक = 3",
      "C) प्राथमिक = 3, द्वितीयक = 3",
      "D) प्राथमिक = 6, द्वितीयक = 6"
    ],
    "correct": 0,
    "ans": "A) प्राथमिक = 3, द्वितीयक = 6",
    "exp": "💡 सही उत्तर: A) प्राथमिक = 3, द्वितीयक = 6। वर्नर के सिद्धांत के अनुसार प्राथमिक संयोजकता ऑक्सीकरण संख्या (+3) के बराबर तथा आयननीय होती है। द्वितीयक संयोजकता उपसहसंयोजन संख्या (6 लिगैंड) के बराबर तथा अन-आयननीय होती है।"
  },
  {
    "topic": "हैलोएल्केन तथा हैलोएरीन (Haloalkanes & Haloarenes)",
    "q": "S_N2 अभिक्रिया की क्रियाविधि में निम्नलिखित में से कौन सी घटना घटित होती है?\n[English: Which phenomenon occurs during an S_N2 reaction mechanism?]",
    "options": [
      "A) रेसिमीकरण / Racemisation",
      "B) विन्यास का प्रतिलोमन / Walden Inversion of Configuration",
      "C) कार्बोकैटायन का निर्माण / Carbocation formation",
      "D) मुक्त मूलक निर्माण / Free radical formation"
    ],
    "correct": 1,
    "ans": "B) विन्यास का प्रतिलोमन / Walden Inversion of Configuration",
    "exp": "💡 सही उत्तर: B) विन्यास का प्रतिलोमन (Walden Inversion)। S_N2 एकल-पदीय (Bimolecular) प्रक्रिया है जिसमें नाभिकरागी (Nucleophile) पीछे से आक्रमण करता है और संक्रमण अवस्था से गुजरते हुए छतरी के उलट जाने जैसा विन्यास प्रतिलोमन होता है।"
  },
  {
    "topic": "ऐल्कोहॉल, फीनॉल एवं ईथर (Alcohols, Phenols & Ethers)",
    "q": "फीनॉल को जलीय NaOH की उपस्थिति में क्लोरोफॉर्म (CHCl₃) के साथ गर्म करने पर सैलिसिलैल्डिहाइड प्राप्त होता है। इस प्रसिद्ध अभिक्रिया का नाम क्या है?\n[English: Reaction of phenol with chloroform in the presence of NaOH to form salicylaldehyde is known as:]",
    "options": [
      "A) कोल्बे अभिक्रिया / Kolbe's Reaction",
      "B) राइमर-टीमैन अभिक्रिया / Reimer-Tiemann Reaction",
      "C) विलियमसन ईथर संश्लेषण / Williamson Synthesis",
      "D) कैनिजारो अभिक्रिया / Cannizzaro Reaction"
    ],
    "correct": 1,
    "ans": "B) राइमर-टीमैन अभिक्रिया / Reimer-Tiemann Reaction",
    "exp": "💡 सही उत्तर: B) राइमर-टीमैन अभिक्रिया (Reimer-Tiemann Reaction)। इसमें डाइक्लोरोकार्बीन (:CCl₂) इलेक्ट्रॉनरागी मध्यवर्ती के रूप में कार्य करता है और फीनॉल के ऑर्थो-स्थान पर -CHO समूह जुड़ता है।"
  },
  {
    "topic": "ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल (Aldehydes, Ketones & Acids)",
    "q": "निम्नलिखित में से कौन सा यौगिक टॉलेन अभिकर्मक (Tollens' Reagent - अमोनियामय AgNO₃) को अपचयित करके रजत दर्पण (Silver Mirror) देता है?\n[English: Which of the following compounds reduces Tollens' reagent to give a silver mirror?]",
    "options": [
      "A) ऐसीटोन (CH₃COCH₃) / Acetone",
      "B) ऐसीटैल्डिहाइड (CH₃CHO) / Acetaldehyde",
      "C) एथेनॉल (CH₃CH₂OH) / Ethanol",
      "D) ऐसीटिक अम्ल (CH₃COOH) / Acetic Acid"
    ],
    "correct": 1,
    "ans": "B) ऐसीटैल्डिहाइड (CH₃CHO) / Acetaldehyde",
    "exp": "💡 सही उत्तर: B) ऐसीटैल्डिहाइड। ऐल्डिहाइड आसानी से टॉलेन अभिकर्मक को धात्विक चांदी (Ag) में अपचयित कर देते हैं, जिससे परखनली की दीवार पर चमकदार चांदी का दर्पण बनता है। कीटोन यह परीक्षण नहीं देते।"
  },
  {
    "topic": "ऐमीन (Amines & Carbylamine Test)",
    "q": "कार्बिलऐमीन परीक्षण (Carbylamine Test) किस प्रकार की ऐमीन की पहचान के लिए किया जाता है?\n[English: The Carbylamine Test is used for the detection of which type of amines?]",
    "options": [
      "A) केवल प्राथमिक ऐमीन / Only Primary (1°) Amines",
      "B) केवल द्वितीयक ऐमीन / Only Secondary (2°) Amines",
      "C) केवल तृतीयक ऐमीन / Only Tertiary (3°) Amines",
      "D) केवल चतुर्थक अमोनियम लवण"
    ],
    "correct": 0,
    "ans": "A) केवल प्राथमिक ऐमीन / Only Primary (1°) Amines",
    "exp": "💡 सही उत्तर: A) केवल प्राथमिक ऐमीन। प्राथमिक ऐलिफैटिक या ऐरोमैटिक ऐमीन को CHCl₃ और ऐल्कोहॉली KOH के साथ गर्म करने पर अत्यंत दुर्गंधयुक्त आइसोसायनाइड (कार्बिलऐमीन) बनता है। 2° और 3° ऐमीन यह परीक्षण नहीं देते।"
  },
  {
    "topic": "जैव-अणु (Biomolecules & Nucleic Acids)",
    "q": "DNA में उपस्थित नाइट्रोजनी क्षार एडेनिन (A), ग्वानिन (G) तथा साइटोसिन (C) के अतिरिक्त चौथा क्षार कौन सा होता है जो RNA में अनुपस्थित रहता है?\n[English: Which nitrogenous base is present in DNA but absent in RNA?]",
    "options": [
      "A) यूरेसिल / Uracil",
      "B) थायमीन / Thymine",
      "C) ग्वानिन / Guanine",
      "D) राइबोस / Ribose"
    ],
    "correct": 1,
    "ans": "B) थायमीन / Thymine",
    "exp": "💡 सही उत्तर: B) थायमीन (Thymine)। DNA में चार क्षार होते हैं: एडेनिन (A), ग्वानिन (G), साइटोसिन (C) और थायमीन (T)। RNA में थायमीन के स्थान पर यूरेसिल (Uracil - U) उपस्थित होता है।"
  },
  {
    "topic": "रासायनिक बलगतिकी (Chemical Kinetics & Rate Law)",
    "q": "अभिक्रिया A + 2B → उत्पाद के लिए वेग नियम (Rate Law) r = k[A]¹[B]² है। इस अभिक्रिया की समग्र कोटि (Overall Order) क्या होगी?\n[English: For the reaction A + 2B → Products, the rate law is r = k[A]¹[B]². What is the overall order of this reaction?]",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 0"
    ],
    "correct": 2,
    "ans": "C) 3",
    "exp": "💡 सही उत्तर: C) 3। अभिक्रिया की समग्र कोटि वेग नियम समीकरण में अभिकारकों के सांद्रण पदों की घातों का योग होती है: n = 1 + 2 = 3 (तृतीय कोटि)।"
  },
  {
    "topic": "रासायनिक बलगतिकी (Chemical Kinetics & Half Life)",
    "q": "प्रथम कोटि की अभिक्रिया (First Order Reaction) का अर्ध-आयु काल (t₁/₂) प्रारंभिक सांद्रता (a) पर किस प्रकार निर्भर करता है?\n[English: How does the half-life period (t₁/₂) of a first-order reaction depend on initial concentration (a)?]",
    "options": [
      "A) t₁/₂ ∝ a",
      "B) t₁/₂ प्रारंभिक सांद्रता से स्वतंत्र रहता है / Independent of initial concentration",
      "C) t₁/₂ ∝ 1/a",
      "D) t₁/₂ ∝ a²"
    ],
    "correct": 1,
    "ans": "B) t₁/₂ प्रारंभिक सांद्रता से स्वतंत्र रहता है / Independent of initial concentration",
    "exp": "💡 सही उत्तर: B) प्रथम कोटि की अभिक्रिया के लिए t₁/₂ = 0.693 / k होता है, जो अभिकारक की प्रारंभिक सांद्रता पर बिल्कुल निर्भर नहीं करता।"
  },
  {
    "topic": "रासायनिक बलगतिकी (Arrhenius Equation)",
    "q": "आर्रेनियस समीकरण (Arrhenius Equation) में सक्रियण ऊर्जा (Activation Energy, Ea) और वेग स्थिरांक (k) का सही संबंध क्या है?\n[English: In Arrhenius Equation, what is the relation between activation energy (Ea) and rate constant (k)?]",
    "options": [
      "A) k = A · e^(-Ea / RT)",
      "B) k = A · e^(Ea / RT)",
      "C) k = A · (Ea / RT)",
      "D) k = Ea · e^(-RT)"
    ],
    "correct": 0,
    "ans": "A) k = A · e^(-Ea / RT)",
    "exp": "💡 सही उत्तर: A) k = A · e^(-Ea/RT)। यहाँ A आर्रेनियस आवृत्ति कारक (Frequency factor), R सार्वत्रिक गैस नियतांक तथा T परम ताप है। ताप बढ़ाने पर k का मान चरघातांकी रूप से बढ़ता है।"
  },
  {
    "topic": "d-एवं f-ब्लॉक के तत्व (d & f Block Elements)",
    "q": "संक्रमण तत्वों (Transition Elements) के अधिकांश यौगिक रंगीन (Coloured) क्यों होते हैं?\n[English: Why are most compounds of transition elements coloured?]",
    "options": [
      "A) d-d संक्रमण (d-d Transition) के कारण",
      "B) उच्च घनत्व के कारण / Due to high density",
      "C) उच्च गलनांक के कारण / Due to high melting point",
      "D) रेडियोधर्मिता के कारण / Due to radioactivity"
    ],
    "correct": 0,
    "ans": "A) d-d संक्रमण (d-d Transition) के कारण",
    "exp": "💡 सही उत्तर: A) d-d संक्रमण के कारण। अपूर्ण रूप से भरे d-कक्षकों में अयुग्मित इलेक्ट्रॉन दृश्य प्रकाश क्षेत्र से ऊर्जा अवशोषित कर निम्न d-कक्षक से उच्च d-कक्षक में उत्तेजित होते हैं और पूरक रंग प्रदर्शित करते हैं।"
  },
  {
    "topic": "d-एवं f-ब्लॉक के तत्व (Lanthanide Contraction)",
    "q": "लैन्थेनाइड संकुचन (Lanthanide Contraction) का मुख्य कारण क्या है?\n[English: What is the primary cause of Lanthanoid Contraction?]",
    "options": [
      "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
      "B) 4f इलेक्ट्रॉनों का शक्तिशाली परिरक्षण / Strong shielding of 4f electrons",
      "C) नाभिकीय आवेश में कमी / Decrease in nuclear charge",
      "D) उच्च विद्युत ऋणात्मकता / High electronegativity"
    ],
    "correct": 0,
    "ans": "A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव / Poor shielding effect of 4f electrons",
    "exp": "💡 सही उत्तर: A) 4f इलेक्ट्रॉनों का दुर्बल परिरक्षण प्रभाव। 4f कक्षक विसरित (diffuse) आकार के होते हैं, जिससे वे बढ़ते हुए नाभिकीय आवेश को रोक नहीं पाते और बाह्यतम कोश के इलेक्ट्रॉन नाभिक की ओर अत्यधिक आकर्षित होते हैं।"
  },
  {
    "topic": "उपसहसंयोजन यौगिक (Coordination Compounds - IUPAC)",
    "q": "संकुल [Co(NH₃)₆]Cl₃ का सही IUPAC नाम क्या है?\n[English: What is the correct IUPAC name of the complex [Co(NH₃)₆]Cl₃?]",
    "options": [
      "A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड / Hexaamminecobalt(III) chloride",
      "B) हेक्साएम्मीनकोबाल्ट(II) क्लोराइड / Hexaamminecobalt(II) chloride",
      "C) ट्राइक्लोरोकोबाल्ट हेक्साएम्मीन / Trichlorocobalt hexaammine",
      "D) हेक्साएम्मीनट्राइक्लोराइड कोबाल्ट / Hexaamminetrichloride cobalt"
    ],
    "correct": 0,
    "ans": "A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड / Hexaamminecobalt(III) chloride",
    "exp": "💡 सही उत्तर: A) हेक्साएम्मीनकोबाल्ट(III) क्लोराइड। NH₃ एक उदासीन लिगैंड (आवेश 0) है। Co की ऑक्सीकरण अवस्था x + 6(0) + 3(-1) = 0 ⟹ x = +3 है।"
  },
  {
    "topic": "उपसहसंयोजन यौगिक (Coordination Compounds - Isomerism)",
    "q": "संकुल [Co(NH₃)₅(SO₄)]Br तथा [Co(NH₃)₅Br]SO₄ किस प्रकार की समावयवता (Isomerism) प्रदर्शित करते हैं?\n[English: The complexes [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄ exhibit which type of isomerism?]",
    "options": [
      "A) आयनन समावयवता / Ionisation Isomerism",
      "B) बंधनी समावयवता / Linkage Isomerism",
      "C) उपसहसंयोजन समावयवता / Coordination Isomerism",
      "D) हाइड्रेट समावयवता / Hydrate Isomerism"
    ],
    "correct": 0,
    "ans": "A) आयनन समावयवता / Ionisation Isomerism",
    "exp": "💡 सही उत्तर: A) आयनन समावयवता। ये दोनों संकुल जलीय विलयन में अलग-अलग आयन देते हैं (पहला Br⁻ आयन तथा दूसरा SO₄²⁻ आयन मुक्त करता है)।"
  },
  {
    "topic": "हैलोऐल्केन (Haloalkanes - SN1 Reaction)",
    "q": "SN1 नाभिकस्नेही प्रतिस्थापन अभिक्रिया (SN1 Nucleophilic Substitution) में सर्वाधिक क्रियाशील ऐल्किल हैलाइड कौन सा है?\n[English: In SN1 nucleophilic substitution reaction, which alkyl halide is the most reactive?]",
    "options": [
      "A) 3° ऐल्किल हैलाइड (तृतीयाक) / Tertiary (3°) Alkyl Halide",
      "B) 2° ऐल्किल हैलाइड (द्वितीयक) / Secondary (2°) Alkyl Halide",
      "C) 1° ऐल्किल हैलाइड (प्राथमिक) / Primary (1°) Alkyl Halide",
      "D) मेथिल हैलाइड / Methyl Halide"
    ],
    "correct": 0,
    "ans": "A) 3° ऐल्किल हैलाइड (तृतीयाक) / Tertiary (3°) Alkyl Halide",
    "exp": "💡 सही उत्तर: A) 3° ऐल्किल हैलाइड। SN1 अभिक्रिया दो पदों में होती है और इसमें मध्यवर्ती कार्बोकैटायन बनता है। 3° कार्बोकैटायन सर्वाधिक स्थायी (3° > 2° > 1°) होने के कारण 3° हैलाइड सबसे तीव्र गति से क्रिया करते हैं।"
  },
  {
    "topic": "हैलोऐल्केन (Haloalkanes - Grignard Reagent)",
    "q": "ग्रिग्नार्ड अभिकर्मक (Grignard Reagent) का सामान्य रासायनिक सूत्र क्या होता है?\n[English: What is the general chemical formula of Grignard Reagent?]",
    "options": [
      "A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)",
      "B) RLi",
      "C) R₂Zn",
      "D) RCuLi"
    ],
    "correct": 0,
    "ans": "A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)",
    "exp": "💡 सही उत्तर: A) RMgX (ऐल्किल मैग्नीशियम हैलाइड)। शुष्क ईथर की उपस्थिति में ऐल्किल हैलाइड (RX) की क्रिया मैग्नीशियम (Mg) धातु से कराने पर ग्रिग्नार्ड अभिकर्मक बनता है।"
  },
  {
    "topic": "ऐल्कोहॉल (Alcohols - Lucas Test)",
    "q": "ल्यूकास अभिकर्मक (Lucas Reagent) किसका मिश्रण होता है जो प्राथमिक, द्वितीयक और तृतीयक ऐल्कोहॉल में विभेद करता है?\n[English: Lucas Reagent is a mixture of which chemicals used to distinguish 1°, 2°, and 3° alcohols?]",
    "options": [
      "A) सांद्र HCl + निर्जल ZnCl₂ / Conc. HCl + Anhydrous ZnCl₂",
      "B) तनु HCl + ZnSO₄ / Dilute HCl + ZnSO₄",
      "C) सांद्र H₂SO₄ + ZnCl₂ / Conc. H₂SO₄ + ZnCl₂",
      "D) सांद्र HNO₃ + Cu / Conc. HNO₃ + Cu"
    ],
    "correct": 0,
    "ans": "A) सांद्र HCl + निर्जल ZnCl₂ / Conc. HCl + Anhydrous ZnCl₂",
    "exp": "💡 सही उत्तर: A) सांद्र HCl + निर्जल ZnCl₂। तृतीयक ऐल्कोहॉल ल्यूकास अभिकर्मक के साथ तुरंत धुंधलापन (Turbidity) देते हैं, द्वितीयक 5 मिनट में, और प्राथमिक कमरे के ताप पर कोई धुंधलापन नहीं देते।"
  },
  {
    "topic": "फीनॉल (Phenol - Kolbe Reaction)",
    "q": "फीनॉल को NaOH तथा CO₂ के साथ उच्च दाब व ताप पर गर्म करने के पश्चात अम्लीय जलअपघटन कराने पर क्या प्राप्त होता है (कोल्बे अभिक्रिया)?\n[English: Heating phenol with NaOH and CO₂ under pressure followed by acidification yields which product (Kolbe reaction)?]",
    "options": [
      "A) सैलिसिलिक अम्ल (Salicylic acid)",
      "B) सैलिसिलैल्डिहाइड (Salicylaldehyde)",
      "C) बेन्जोइक अम्ल (Benzoic acid)",
      "D) पिक्रिक अम्ल (Picric acid)"
    ],
    "correct": 0,
    "ans": "A) सैलिसिलिक अम्ल (Salicylic acid)",
    "exp": "💡 सही उत्तर: A) सैलिसिलिक अम्ल (2-हाइड्रॉक्सी बेन्जोइक अम्ल)। यह कोल्बे-श्मिट अभिक्रिया कहलाती है, जो एस्पिरिन के निर्माण में काम आती है।"
  },
  {
    "topic": "ईथर (Ethers - Williamson Synthesis)",
    "q": "विलियमसन संश्लेषण (Williamson Synthesis) विधि द्वारा किसका निर्माण किया जाता है?\n[English: Which class of compounds is prepared by Williamson Synthesis?]",
    "options": [
      "A) ईथर (Ethers - R-O-R')",
      "B) ऐल्कोहॉल (Alcohols - R-OH)",
      "C) ऐल्डिहाइड (Aldehydes - R-CHO)",
      "D) कीटोन (Ketones - R-CO-R')"
    ],
    "correct": 0,
    "ans": "A) ईथर (Ethers - R-O-R')",
    "exp": "💡 सही उत्तर: A) ईथर (Ethers)। सोडियम ऐल्कॉक्साइड (RONa) की ऐल्किल हैलाइड (R'X) के साथ अभिक्रिया कराने पर सममित या असममित ईथर प्राप्त होते हैं: RONa + R'X → R-O-R' + NaX।"
  },
  {
    "topic": "ऐल्डिहाइड एवं कीटोन (Cannizzaro Reaction)",
    "q": "निम्नलिखित में से कौन सा यौगिक कैनीजारो अभिक्रिया (Cannizzaro Reaction) प्रदर्शित करता है?\n[English: Which of the following compounds exhibits Cannizzaro Reaction?]",
    "options": [
      "A) फॉर्मैल्डिहाइड (HCHO) / Formaldehyde",
      "B) ऐसीटैल्डिहाइड (CH₃CHO) / Acetaldehyde",
      "C) ऐसीटोन (CH₃COCH₃) / Acetone",
      "D) प्रोपियोनैल्डिहाइड (CH₃CH₂CHO) / Propionaldehyde"
    ],
    "correct": 0,
    "ans": "A) फॉर्मैल्डिहाइड (HCHO) / Formaldehyde",
    "exp": "💡 सही उत्तर: A) फॉर्मैल्डिहाइड (HCHO)। वे ऐल्डिहाइड जिनमें α-हाइड्रोजन परमाणु अनुपस्थित होता है (जैसे HCHO, C₆H₅CHO), 50% सांद्र क्षार (NaOH) की उपस्थिति में स्वतः ऑक्सीकरण-अपचयन (असमानुपातन) द्वारा एक अणु ऐल्कोहॉल व एक अणु कार्बोक्सिलिक लवण बनाते हैं।"
  },
  {
    "topic": "ऐल्डिहाइड एवं कीटोन (Aldol Condensation)",
    "q": "ऐल्डोल संघनन (Aldol Condensation) देने के लिए ऐल्डिहाइड या कीटोन के पास क्या उपस्थित होना अनिवार्य है?\n[English: To undergo Aldol Condensation, what must an aldehyde or ketone possess?]",
    "options": [
      "A) कम से कम एक α-हाइड्रोजन परमाणु / At least one α-hydrogen atom",
      "B) कोई α-हाइड्रोजन नहीं / No α-hydrogen",
      "C) केवल β-हाइड्रोजन / Only β-hydrogen",
      "D) सुगंधित वलय / Aromatic ring"
    ],
    "correct": 0,
    "ans": "A) कम से कम एक α-हाइड्रोजन परमाणु / At least one α-hydrogen atom",
    "exp": "💡 सही उत्तर: A) कम से कम एक α-हाइड्रोजन परमाणु। तनु क्षार की उपस्थिति में α-हाइड्रोजन युक्त दो अणु संघनित होकर β-हाइड्रॉक्सी ऐल्डिहाइड (ऐल्डोल) या β-हाइड्रॉक्सी कीटोन (कीटोल) बनाते हैं।"
  },
  {
    "topic": "कार्बोक्सिलिक अम्ल (Carboxylic Acids - HVZ Reaction)",
    "q": "हेल-वोलहार्ड-जेलिंस्की (HVZ) अभिक्रिया में कार्बोक्सिलिक अम्ल के किस कार्बन पर हैलोजन परमाणु जुड़ता है?\n[English: In Hell-Volhard-Zelinsky (HVZ) reaction, halogen atom attaches to which carbon of carboxylic acid?]",
    "options": [
      "A) α-कार्बन परमाणु पर / On α-carbon atom",
      "B) β-कार्बन परमाणु पर / On β-carbon atom",
      "C) कार्बोनिल कार्बन पर / On carbonyl carbon",
      "D) γ-कार्बन परमाणु पर / On γ-carbon atom"
    ],
    "correct": 0,
    "ans": "A) α-कार्बन परमाणु पर / On α-carbon atom",
    "exp": "💡 सही उत्तर: A) α-कार्बन परमाणु पर। लाल फास्फोरस की उपस्थिति में कार्बोक्सिलिक अम्लों की Cl₂ या Br₂ से अभिक्रिया कराने पर α-हैलोजनो अम्ल प्राप्त होते हैं।"
  },
  {
    "topic": "ऐमीन (Amines - Hofmann Bromamide)",
    "q": "हॉफमैन ब्रोमामाइड निम्नीकरण अभिक्रिया (Hofmann Bromamide Degradation) में एमाइड (RCONH₂) से प्राथमिक ऐमीन बनने में कार्बन संख्या पर क्या प्रभाव पड़ता है?\n[English: In Hofmann Bromamide reaction, what happens to the number of carbons in the resulting 1° amine compared to amide?]",
    "options": [
      "A) एक कार्बन कम हो जाता है / One carbon decreases",
      "B) एक कार्बन बढ़ जाता है / One carbon increases",
      "C) कार्बन संख्या समान रहती है / Remains same",
      "D) कार्बन संख्या दोगुनी हो जाती है / Doubles"
    ],
    "correct": 0,
    "ans": "A) एक कार्बन कम हो जाता है / One carbon decreases",
    "exp": "💡 सही उत्तर: A) एक कार्बन कम हो जाता है। RCONH₂ + Br₂ + 4KOH → R-NH₂ + K₂CO₃ + 2KBr + 2H₂O। उत्पाद ऐमीन में जनक एमाइड की तुलना में ठीक एक कार्बन परमाणु कम होता है।"
  },
  {
    "topic": "जैव-अणु (Biomolecules - Proteins)",
    "q": "प्रोटीन की प्राथमिक संरचना (Primary Structure) में अमीनो अम्ल परस्पर किस रासायनिक बंध द्वारा जुड़े होते हैं?\n[English: In the primary structure of proteins, amino acids are joined by which chemical bond?]",
    "options": [
      "A) पेप्टाइड बंध (-CO-NH-) / Peptide Bond",
      "B) ग्लाइकोसिडिक बंध / Glycosidic Bond",
      "C) फॉस्फोडाइएस्टर बंध / Phosphodiester Bond",
      "D) हाइड्रोजन बंध / Hydrogen Bond"
    ],
    "correct": 0,
    "ans": "A) पेप्टाइड बंध (-CO-NH-) / Peptide Bond",
    "exp": "💡 सही उत्तर: A) पेप्टाइड बंध (-CO-NH-)। एक अमीनो अम्ल के -COOH समूह तथा दूसरे अमीनो अम्ल के -NH₂ समूह के बीच से जल का अणु निकलने से पेप्टाइड बंध बनता है।"
  },
  {
    "topic": "जैव-अणु (Biomolecules - Vitamins)",
    "q": "निम्नलिखित में से कौन सा विटामिन जल में घुलनशील (Water Soluble) है?\n[English: Which of the following vitamins is water-soluble?]",
    "options": [
      "A) विटामिन C तथा B-कॉम्प्लेक्स / Vitamin C and B-complex",
      "B) विटामिन A",
      "C) विटामिन D",
      "D) विटामिन K"
    ],
    "correct": 0,
    "ans": "A) विटामिन C तथा B-कॉम्प्लेक्स / Vitamin C and B-complex",
    "exp": "💡 सही उत्तर: A) विटामिन B तथा C जल में विलेय होते हैं और मूत्र के साथ उत्सर्जित हो जाते हैं। विटामिन A, D, E और K वसा (Fat) में घुलनशील होते हैं।"
  },
  {
    "topic": "वैद्युतरसायन (Electrochemistry - Primary Battery)",
    "q": "शुष्क सेल (Leclanché Dry Cell) में कैथोड के रूप में किसका उपयोग किया जाता है?\n[English: In a dry cell (Leclanché cell), what is used as the cathode?]",
    "options": [
      "A) कार्बन (ग्रेफाइट) छड़ जो MnO₂ से घिरी होती है / Carbon rod surrounded by MnO₂",
      "B) जिंक (जस्ता) का पात्र / Zinc container",
      "C) लेड (सीसा) की प्लेट / Lead plate",
      "D) कॉपर की तार / Copper wire"
    ],
    "correct": 0,
    "ans": "A) कार्बन (ग्रेफाइट) छड़ जो MnO₂ से घिरी होती है / Carbon rod surrounded by MnO₂",
    "exp": "💡 सही उत्तर: A) कार्बन (ग्रेफाइट) छड़ कैथोड का कार्य करती है जिसके चारों ओर MnO₂ और कार्बन चूर्ण का मिश्रण होता है। जिंक का बाहरी पात्र एनोड का कार्य करता है।"
  },
  {
    "topic": "विलयन (Solutions - Ideal Solutions)",
    "q": "एक आदर्श विलयन (Ideal Solution) के निर्माण में मिश्रण की एन्थैल्पी (ΔH_mix) तथा आयतन परिवर्तन (ΔV_mix) का मान क्या होता है?\n[English: For the formation of an ideal solution, what are the values of ΔH_mix and ΔV_mix?]",
    "options": [
      "A) ΔH_mix = 0, ΔV_mix = 0",
      "B) ΔH_mix > 0, ΔV_mix > 0",
      "C) ΔH_mix < 0, ΔV_mix < 0",
      "D) ΔH_mix = 0, ΔV_mix > 0"
    ],
    "correct": 0,
    "ans": "A) ΔH_mix = 0, ΔV_mix = 0",
    "exp": "💡 सही उत्तर: A) आदर्श विलयन वे हैं जो राउल्ट के नियम का पूर्णतया पालन करते हैं। इनके बनने पर न ऊष्मा उत्सर्जित/अवशोषित होती है (ΔH_mix = 0) और न ही आयतन में कोई परिवर्तन होता है (ΔV_mix = 0)।"
  }
];

const CLASS12_BIOLOGY_BANK = [
  {
    "topic": "पुष्पी पादपों में लैंगिक जनन (Sexual Reproduction in Flowering Plants)",
    "q": "आवृतबीजी पौधों (Angiosperms) में भ्रूणपोष (Endosperm) की गुणसूत्र प्रकृति (Ploidy) क्या होती है?\n[English: In angiosperms, what is the ploidy level of endosperm?]",
    "options": [
      "A) अगुणित (Haploid - n)",
      "B) द्विगुणित (Diploid - 2n)",
      "C) त्रिगुणित (Triploid - 3n)",
      "D) चतुर्गुणित (Tetraploid - 4n)"
    ],
    "correct": 2,
    "ans": "C) त्रिगुणित (Triploid - 3n)",
    "exp": "💡 सही उत्तर: C) त्रिगुणित (3n)। आवृतबीजी पौधों में त्रिसंलयन (Triple Fusion) होता है, जिसमें एक नर युग्मक (n) दो ध्रुवीय केंद्रकों (2n) से संलयित होकर त्रिगुणित प्राथमिक भ्रूणपोष केंद्रक (PEN, 3n) बनाता है।"
  },
  {
    "topic": "पुष्पी पादपों में लैंगिक जनन (Pollination & Agents)",
    "q": "वायु द्वारा होने वाले परागण (Wind Pollination) को वैज्ञानिक रूप से क्या कहा जाता है?\n[English: Pollination effected by wind is scientifically termed as:]",
    "options": [
      "A) एनीमोफिली / Anemophily",
      "B) हाइड्रोफिली / Hydrophily",
      "C) एन्टोमोफिली / Entomophily",
      "D) ऑर्निथोफिली / Ornithophily"
    ],
    "correct": 0,
    "ans": "A) एनीमोफिली / Anemophily",
    "exp": "💡 सही उत्तर: A) एनीमोफिली (Anemophily)। वायु परागण को एनीमोफिली कहते हैं (जैसे मक्का, घास)। जल परागण को हाइड्रोफिली, कीट परागण को एन्टोमोफिली तथा पक्षी परागण को ऑर्निथोफिली कहते हैं।"
  },
  {
    "topic": "मानव जनन (Human Reproduction - Spermatogenesis)",
    "q": "वृषण (Testis) में शुक्राणुओं (Sperms) को पोषण प्रदान करने वाली विशिष्ट कोशिकाएं कौन सी हैं?\n[English: Which specialized cells in the testis provide nutrition to developing spermatozoa?]",
    "options": [
      "A) लीडिग कोशिकाएं / Leydig Cells",
      "B) सर्टोली कोशिकाएं / Sertoli Cells",
      "C) प्राथमिक शुक्राणुजन / Primary Spermatocytes",
      "D) कॉर्पस ल्यूटियम / Corpus Luteum"
    ],
    "correct": 1,
    "ans": "B) सर्टोली कोशिकाएं / Sertoli Cells",
    "exp": "💡 सही उत्तर: B) सर्टोली कोशिकाएं (Sertoli Cells)। इन्हें 'नर्स कोशिकाएं' भी कहा जाता है, जो विकासशील शुक्राणुओं को पोषण देती हैं। लीडिग कोशिकाएं टेस्टोस्टेरोन (एंड्रोजन) हार्मोन स्रावित करती हैं।"
  },
  {
    "topic": "मानव जनन (Human Reproduction - Ovulation)",
    "q": "मानव मादा में अंडोत्सर्ग (Ovulation) किस हार्मोन के चरम स्तर (Surge) पर पहुंचने के कारण प्रेरित होता है?\n[English: In human females, ovulation is induced by the surge of which hormone?]",
    "options": [
      "A) ल्यूटिनाइजिंग हार्मोन / Luteinizing Hormone (LH)",
      "B) प्रोजेस्टेरोन / Progesterone",
      "C) एस्ट्रोजन / Estrogen",
      "D) प्रोलैक्टिन / Prolactin"
    ],
    "correct": 0,
    "ans": "A) ल्यूटिनाइजिंग हार्मोन / Luteinizing Hormone (LH)",
    "exp": "💡 सही उत्तर: A) LH (LH Surge)। मासिक चक्र के लगभग 14वें दिन LH का स्तर अपने उच्चतम शिखर पर पहुंचता है, जिसे 'LH सर्ज' कहते हैं। यह ग्राफी पुटक को फाड़कर द्वितीयक अंडक मुक्त करता है।"
  },
  {
    "topic": "मानव जनन (Human Reproduction - Fertilization Site)",
    "q": "मानव मादा में निषेचन (Fertilization) सामान्यतः अंडवाहिनी (Fallopian Tube) के किस विशिष्ट भाग में संपन्न होता है?\n[English: In human females, where does fertilization typically take place in the fallopian tube?]",
    "options": [
      "A) तुम्बिका (एम्पुला) / Ampulla region",
      "B) संकीर्ण पथ (इस्थमस) / Isthmus",
      "C) कीपक (इन्फंडिबुलम) / Infundibulum",
      "D) गर्भाशय गुहा / Uterine cavity"
    ],
    "correct": 0,
    "ans": "A) तुम्बिका (एम्पुला) / Ampulla region",
    "exp": "💡 सही उत्तर: A) एम्पुला (Ampullary region)। निषेचन फैलोपियन नलिका के तुम्बिका (Ampulla) क्षेत्र में होता है जहाँ शुक्राणु और अंडाणु का संलयन होता है।"
  },
  {
    "topic": "जनन स्वास्थ्य (Reproductive Health - Contraception)",
    "q": "सहेली (Saheli) क्या है जिसे CDRI लखनऊ द्वारा विकसित किया गया था?\n[English: What is 'Saheli' developed by CDRI Lucknow?]",
    "options": [
      "A) गैर-स्टेरॉयडल साप्ताहिक गर्भनिरोधक गोली / Non-steroidal weekly oral contraceptive",
      "B) दैनिक स्टेरॉयडल गोली / Daily steroidal pill",
      "C) कॉपर-टी अंतर्गर्भाशयी युक्ति / Copper-T IUD",
      "D) आपातकालीन गर्भनिरोधक इंजेक्शन / Emergency injectable"
    ],
    "correct": 0,
    "ans": "A) गैर-स्टेरॉयडल साप्ताहिक गर्भनिरोधक गोली / Non-steroidal weekly oral contraceptive",
    "exp": "💡 सही उत्तर: A) गैर-स्टेरॉयडल साप्ताहिक मौखिक गर्भनिरोधक गोली। केंद्रीय औषधि अनुसंधान संस्थान (CDRI) लखनऊ द्वारा तैयार 'सहेली' एक गैर-स्टेरॉयडल गोली है जिसके न्यूनतम दुष्प्रभाव होते हैं।"
  },
  {
    "topic": "जनन स्वास्थ्य (Reproductive Health - Assisted Reproduction)",
    "q": "ART तकनीक 'ZIFT' का पूर्ण रूप (Full Form) क्या है?\n[English: What is the full form of the ART technique 'ZIFT'?]",
    "options": [
      "A) Zygote Intra-Fallopian Transfer / युग्मनज अंतःफैलोपियन स्थानांतरण",
      "B) Zygote Inter-Fallopian Transfer",
      "C) Zygote Intra-Fertilization Test",
      "D) Zygote Internal Female Transfer"
    ],
    "correct": 0,
    "ans": "A) Zygote Intra-Fallopian Transfer / युग्मनज अंतःफैलोपियन स्थानांतरण",
    "exp": "💡 सही उत्तर: A) Zygote Intra-Fallopian Transfer। प्रयोगशाला में निषेचित युग्मनज या 8 ब्लास्टोमियर तक के प्रारंभिक भ्रूण को फैलोपियन नलिका में स्थानांतरित करने की विधि ZIFT कहलाती है।"
  },
  {
    "topic": "वंशागति तथा विविधता के सिद्धांत (Principles of Inheritance - Mendel's Laws)",
    "q": "मेंडल के द्विसंकर क्रॉस (Dihybrid Cross) की F₂ पीढ़ी में लक्षणप्ररूपी अनुपात (Phenotypic Ratio) क्या होता है?\n[English: What is the phenotypic ratio in the F₂ generation of Mendel's dihybrid cross?]",
    "options": [
      "A) 9 : 3 : 3 : 1",
      "B) 1 : 2 : 1",
      "C) 3 : 1",
      "D) 9 : 7"
    ],
    "correct": 0,
    "ans": "A) 9 : 3 : 3 : 1",
    "exp": "💡 सही उत्तर: A) 9 : 3 : 3 : 1। मेंडल के द्विसंकर क्रॉस (जैसे गोल-पीला × झुर्रीदार-हरा) की F₂ पीढ़ी में 9 गोल पीले, 3 गोल हरे, 3 झुर्रीदार पीले और 1 झुर्रीदार हरा बीज प्राप्त होता है।"
  },
  {
    "topic": "वंशागति तथा विविधता के सिद्धांत (Co-dominance & Blood Groups)",
    "q": "मानव में ABO रक्त समूह (ABO Blood Grouping) किस आनुवंशिक परिघटना का उत्कृष्ट उदाहरण है?\n[English: Human ABO blood grouping is an excellent example of which genetic phenomenon?]",
    "options": [
      "A) सहप्रभाविता एवं बहुविकल्पता / Co-dominance and Multiple Allelism",
      "B) अपूर्ण प्रभाविता / Incomplete Dominance",
      "C) बिंदु उत्परिवर्तन / Point Mutation",
      "D) बहुजीनी वंशागति / Polygenic Inheritance"
    ],
    "correct": 0,
    "ans": "A) सहप्रभाविता एवं बहुविकल्पता / Co-dominance and Multiple Allelism",
    "exp": "💡 सही उत्तर: A) सहप्रभाविता और बहुविकल्पता। ABO रक्त समूह जीन I के तीन विकल्पी Iᴬ, Iᴮ, i द्वारा नियंत्रित होता है। रक्त समूह AB में Iᴬ और Iᴮ दोनों समान रूप से अभिव्यक्त होते हैं (सहप्रभाविता)।"
  },
  {
    "topic": "वंशागति तथा विविधता के सिद्धांत (Genetic Disorders)",
    "q": "टर्नर सिंड्रोम (Turner's Syndrome) से ग्रसित व्यक्ति में गुणसूत्रों का विन्यास क्या होता है?\n[English: What is the chromosomal complement of an individual suffering from Turner's Syndrome?]",
    "options": [
      "A) 45 गुणसूत्र (44 + XO) / 45 Chromosomes (44 + XO)",
      "B) 47 गुणसूत्र (44 + XXY) / 47 Chromosomes (Klinefelter)",
      "C) 47 गुणसूत्र (21वीं जोड़ी ट्राइसोमी) / Down Syndrome",
      "D) 46 गुणसूत्र (44 + XY)"
    ],
    "correct": 0,
    "ans": "A) 45 गुणसूत्र (44 + XO) / 45 Chromosomes (44 + XO)",
    "exp": "💡 सही उत्तर: A) 44 + XO (कुल 45 गुणसूत्र)। यह एक लिंग गुणसूत्री मोनोसोमी है जिसमें एक X गुणसूत्र की अनुपस्थिति के कारण मादा बंध्य (Sterile) होती है और अंडाशय अल्पविकसित होते हैं।"
  },
  {
    "topic": "वंशागति के आणविक आधार (Molecular Basis of Inheritance - DNA Structure)",
    "q": "DNA अणु में वाटसन और क्रिक मॉडल के अनुसार दोनों रज्जुकों (Strands) के मध्य की चौड़ाई (व्यास) कितनी होती है?\n[English: In Watson-Crick DNA model, what is the diameter between two backbones?]",
    "options": [
      "A) 20 Å (2.0 nm)",
      "B) 34 Å (3.4 nm)",
      "C) 3.4 Å (0.34 nm)",
      "D) 10 Å (1.0 nm)"
    ],
    "correct": 0,
    "ans": "A) 20 Å (2.0 nm)",
    "exp": "💡 सही उत्तर: A) 20 Å (2.0 nm)। B-DNA का व्यास 20 Å (2 nm) होता है। एक पूर्ण घुमाव (Pitch) की लंबाई 34 Å होती है तथा प्रत्येक क्षार युग्म के मध्य दूरी 3.4 Å (0.34 nm) होती है।"
  },
  {
    "topic": "वंशागति के आणविक आधार (Transcription & Central Dogma)",
    "q": "आणविक जीवविज्ञान में सूचना के प्रवाह DNA → RNA → प्रोटीन को क्या कहा जाता है?\n[English: In molecular biology, the unidirectional flow of genetic information DNA → RNA → Protein is called:]",
    "options": [
      "A) सेंट्रल डोग्मा / Central Dogma",
      "B) प्रतिवर्ती अनुलेखन / Reverse Transcription",
      "C) आनुवंशिक अपवाह / Genetic Drift",
      "D) उत्परिवर्तन सिद्धांत / Mutation Theory"
    ],
    "correct": 0,
    "ans": "A) सेंट्रल डोग्मा / Central Dogma",
    "exp": "💡 सही उत्तर: A) सेंट्रल डोग्मा (Central Dogma)। फ्रांसिस क्रिक ने 1958 में प्रस्तावित किया था कि आनुवंशिक सूचनाएं DNA से m-RNA में अनुलेखन (Transcription) द्वारा और m-RNA से प्रोटीन में रूपांतरण (Translation) द्वारा जाती हैं।"
  },
  {
    "topic": "वंशागति के आणविक आधार (Genetic Code)",
    "q": "प्रारंभक प्रकूट (Initiation Codon) AUG किस अमीनो अम्ल को कोडित करता है?\n[English: The universal start codon AUG codes for which amino acid?]",
    "options": [
      "A) मेथियोनीन / Methionine",
      "B) वैलीन / Valine",
      "C) फेनिलऐलेनीन / Phenylalanine",
      "D) ट्रिप्टोफैन / Tryptophan"
    ],
    "correct": 0,
    "ans": "A) मेथियोनीन / Methionine",
    "exp": "💡 सही उत्तर: A) मेथियोनीन (Methionine)। AUG दोहरा कार्य करता है: यह पॉलीपेप्टाइड श्रृंखला संश्लेषण हेतु आरंभक प्रकूट है और मेथियोनीन अमीनो अम्ल को कोडित करता है।"
  },
  {
    "topic": "वंशागति के आणविक आधार (Lac Operon)",
    "q": "ई. कोलाई के लैक ऑपेरॉन (Lac Operon) में लैक z-जीन किस एंजाइम का कूटलेखन करता है?\n[English: In the lac operon of E. coli, the lac z-gene codes for which enzyme?]",
    "options": [
      "A) बीटा-गैलेक्टोसाइडेज / Beta-galactosidase",
      "B) पर्मिएज / Permease",
      "C) ट्रांसएसिटाइलेज / Transacetylase",
      "D) RNA पॉलीमरेज / RNA Polymerase"
    ],
    "correct": 0,
    "ans": "A) बीटा-गैलेक्टोसाइडेज / Beta-galactosidase",
    "exp": "💡 सही उत्तर: A) बीटा-गैलेक्टोसाइडेज। जीन z बीटा-गैलेक्टोसाइडेज को कोड करता है जो लैक्टोज को ग्लूकोज तथा गैलेक्टोज में तोड़ता है। जीन y पर्मिएज तथा जीन a ट्रांसएसिटाइलेज को कोड करता है।"
  },
  {
    "topic": "विकास (Evolution - Miller-Urey Experiment)",
    "q": "मिलर और यूरे के प्रयोग में जीवन की उत्पत्ति सिद्ध करने के लिए किन गैसों का मिश्रण प्रयुक्त हुआ था?\n[English: In Miller-Urey experiment, which gas mixture was used to demonstrate origin of life?]",
    "options": [
      "A) CH₄, NH₃, H₂ तथा जलवाष्प (2:1:2) / CH₄, NH₃, H₂ and H₂O vapor",
      "B) CO₂, O₂, N₂ तथा H₂O",
      "C) CH₄, O₂, NH₃ तथा He",
      "D) SO₂, NO₂, CH₄ तथा O₂"
    ],
    "correct": 0,
    "ans": "A) CH₄, NH₃, H₂ तथा जलवाष्प (2:1:2) / CH₄, NH₃, H₂ and H₂O vapor",
    "exp": "💡 सही उत्तर: A) मीथेन (CH₄), अमोनिया (NH₃), हाइड्रोजन (H₂) और जलवाष्प। 1953 में स्टेनली मिलर ने विद्युत विसर्जन द्वारा अनाक्सीय वातावरण में सरल अमीनो अम्लों (जैसे ग्लाइसिन, ऐलेनीन) का निर्माण कर ओपेरिन-हाल्डेन सिद्धांत को सिद्ध किया।"
  },
  {
    "topic": "विकास (Evolution - Homologous Organs)",
    "q": "मनुष्य के अग्रपाद, चमगादड़ के पंख और व्हेल के फ्लिपर्स किसके उत्कृष्ट उदाहरण हैं?\n[English: Forelimbs of humans, wings of bats, and flippers of whales are examples of:]",
    "options": [
      "A) समजात अंग (अपसारी विकास) / Homologous organs (Divergent evolution)",
      "B) समवृत्ति अंग (अभिसारी विकास) / Analogous organs (Convergent evolution)",
      "C) अवशेषी अंग / Vestigial organs",
      "D) जीवाश्म / Fossils"
    ],
    "correct": 0,
    "ans": "A) समजात अंग (अपसारी विकास) / Homologous organs (Divergent evolution)",
    "exp": "💡 सही उत्तर: A) समजात अंग (Homologous Organs)। ये अंग आंतरिक संरचना और उत्पत्ति में समान होते हैं परंतु भिन्न-भिन्न कार्यों के लिए रूपांतरित होते हैं। यह अपसारी विकास (Divergent Evolution) को दर्शाता है।"
  },
  {
    "topic": "मानव स्वास्थ्य तथा रोग (Human Health & Disease - Malaria)",
    "q": "मलेरिया परजीवी प्लाज्मोडियम (Plasmodium) का संक्रामक रूप जो मच्छर के काटने पर मानव शरीर में प्रवेश करता है:\n[English: The infectious stage of Plasmodium that enters the human body through mosquito bite is:]",
    "options": [
      "A) स्पोरोजोआइट (जीवाणुज) / Sporozoite",
      "B) ट्रॉफोजोआइट / Trophozoite",
      "C) मीरोजोआइट / Merozoite",
      "D) गैमीटोसाइट / Gametocyte"
    ],
    "correct": 0,
    "ans": "A) स्पोरोजोआइट (जीवाणुज) / Sporozoite",
    "exp": "💡 सही उत्तर: A) स्पोरोजोआइट (Sporozoite)। मादा एनाफिलीज़ मच्छर जब मनुष्य को काटती है तो उसकी लार से स्पोरोजोआइट मानव रक्त में प्रवेश कर सर्वप्रथम यकृत कोशिकाओं (Liver cells) पर हमला करते हैं।"
  },
  {
    "topic": "मानव स्वास्थ्य तथा रोग (Human Health & Disease - AIDS/HIV)",
    "q": "एड्स (AIDS) के रोगजनक HIV विषाणु की आनुवंशिक सामग्री किस प्रकार की होती है?\n[English: What is the genetic material of HIV (Human Immunodeficiency Virus)?]",
    "options": [
      "A) एकल रज्जुक RNA की दो प्रतियां / Two single-stranded RNA molecules (ssRNA)",
      "B) द्विरज्जुक DNA / Double-stranded DNA",
      "C) एकल रज्जुक DNA / Single-stranded DNA",
      "D) द्विरज्जुक RNA / Double-stranded RNA"
    ],
    "correct": 0,
    "ans": "A) एकल रज्जुक RNA की दो प्रतियां / Two single-stranded RNA molecules (ssRNA)",
    "exp": "💡 सही उत्तर: A) एकल-रज्जुक RNA की दो समान प्रतियां। HIV एक रेट्रोवायरस है जिसमें रिवर्स ट्रांसक्रिप्टेज एंजाइम होता है जो RNA से वायरल DNA बनाता है।"
  },
  {
    "topic": "मानव स्वास्थ्य तथा रोग (Immunoglobulins & Antibodies)",
    "q": "मां के प्रथम स्तन्य दुग्ध (Colostrum) में कौन सा प्रतिरक्षी (Antibody) प्रचुर मात्रा में पाया जाता है?\n[English: Which antibody is abundantly present in the mother's first milk (Colostrum)?]",
    "options": [
      "A) IgA",
      "B) IgG",
      "C) IgM",
      "D) IgE"
    ],
    "correct": 0,
    "ans": "A) IgA",
    "exp": "💡 सही उत्तर: A) IgA। कोलोस्ट्रम में इम्यूनोग्लोबुलिन A (IgA) प्रचुर मात्रा में होता है जो नवजात शिशु को निष्क्रिय प्रतिरक्षा (Passive Immunity) प्रदान कर संक्रमणों से रक्षा करता है।"
  },
  {
    "topic": "मानव कल्याण में सूक्ष्मजीव (Microbes in Human Welfare - Antibiotics)",
    "q": "पेनिसिलिन (Penicillin) नामक प्रथम प्रतिजैविक की खोज अलेक्जेंडर फ्लेमिंग द्वारा किस कवक से की गई थी?\n[English: The first antibiotic Penicillin was discovered by Alexander Fleming from which fungus?]",
    "options": [
      "A) पेनिसिलियम नोटेटम / Penicillium notatum",
      "B) पेनिसिलियम क्राइसोजेनम / Penicillium chrysogenum",
      "C) एस्परजिलस नाइजर / Aspergillus niger",
      "D) राइजोपस / Rhizopus"
    ],
    "correct": 0,
    "ans": "A) पेनिसिलियम नोटेटम / Penicillium notatum",
    "exp": "💡 सही उत्तर: A) पेनिसिलियम नोटेटम। 1928 में अलेक्जेंडर फ्लेमिंग ने स्टैफिलोकोकस जीवाणु के संवर्धन के दौरान पेनिसिलियम नोटेटम नामक कवक से पेनिसिलिन की खोज की थी।"
  },
  {
    "topic": "मानव कल्याण में सूक्ष्मजीव (Microbes in Human Welfare - Biocontrol)",
    "q": "पादप रोगों के जैविक नियंत्रण (Biocontrol Agent) के रूप में किस मुक्तजीवी कवक का व्यापक प्रयोग होता है?\n[English: Which free-living fungus is widely used as a biological control agent for plant pathogens?]",
    "options": [
      "A) ट्राइकोडर्मा / Trichoderma",
      "B) यीस्ट (Saccharomyces)",
      "C) म्यूकर / Mucor",
      "D) कैंडिडा / Candida"
    ],
    "correct": 0,
    "ans": "A) ट्राइकोडर्मा / Trichoderma",
    "exp": "💡 सही उत्तर: A) ट्राइकोडर्मा (Trichoderma)। यह एक मुक्तजीवी कवक है जो मृदा और जड़ पारिस्थितिकी तंत्र में पाया जाता है और विभिन्न पादप रोगजनकों का जैविक नियंत्रण करता है।"
  },
  {
    "topic": "जैव प्रौद्योगिकी: सिद्धांत व प्रक्रम (Biotechnology: Principles & Tools)",
    "q": "आणविक कैंची (Molecular Scissors) के नाम से जाने जाने वाले एंजाइम कौन से हैं जो DNA को विशिष्ट स्थल पर काटते हैं?\n[English: Which enzymes are known as 'molecular scissors' that cut DNA at specific palindromic sites?]",
    "options": [
      "A) प्रतिबंधन एंडोन्यूक्लिएज / Restriction Endonuclease",
      "B) DNA लाइगेज / DNA Ligase",
      "C) DNA पॉलीमरेज / DNA Polymerase",
      "D) लाइसोजाइम / Lysozyme"
    ],
    "correct": 0,
    "ans": "A) प्रतिबंधन एंडोन्यूक्लिएज / Restriction Endonuclease",
    "exp": "💡 सही उत्तर: A) प्रतिबंधन एंडोन्यूक्लिएज (Restriction Endonucleases)। ये एंजाइम DNA में विशिष्ट पैलिंड्रोमिक अनुक्रमों को पहचानकर काटते हैं। DNA लाइगेज खंडों को जोड़ने का कार्य करता है।"
  },
  {
    "topic": "जैव प्रौद्योगिकी: सिद्धांत व प्रक्रम (PCR Technique)",
    "q": "पॉलीमरेज श्रृंखला अभिक्रिया (PCR) में उच्च ताप पर स्थिर रहने वाला कौन सा DNA पॉलीमरेज एंजाइम प्रयुक्त होता है?\n[English: In Polymerase Chain Reaction (PCR), which thermostable DNA polymerase enzyme is used?]",
    "options": [
      "A) टैक पॉलीमरेज (Taq Polymerase)",
      "B) RNA पॉलीमरेज III",
      "C) DNA गाइरेज",
      "D) हेलिकेज एंजाइम"
    ],
    "correct": 0,
    "ans": "A) टैक पॉलीमरेज (Taq Polymerase)",
    "exp": "💡 सही उत्तर: A) टैक पॉलीमरेज (Taq Polymerase)। यह थर्मोस्टेबल एंजाइम 'थर्मस एक्वाटिकस' (Thermus aquaticus) नामक थर्मोफिलिक जीवाणु से प्राप्त किया जाता है, जो 95°C तक सक्रिय रहता है।"
  },
  {
    "topic": "जैव प्रौद्योगिकी एवं उसके उपयोग (Biotechnology & Applications - Bt Crops)",
    "q": "Bt-कपास (Bt Cotton) में बेसिलस थुरिंजिएंसिस जीवाणु से प्राप्त कौन सा जीन कीट प्रतिरोधकता हेतु स्थानांतरित किया गया है?\n[English: In Bt Cotton, which crystal protein gene from Bacillus thuringiensis is incorporated for insect resistance?]",
    "options": [
      "A) क्राय जीन (Cry IAc एवं Cry IIAb) / Cry Genes",
      "B) लैक जीन (lacZ)",
      "C) बार जीन (bar gene)",
      "D) टाइ जीन (Ti gene)"
    ],
    "correct": 0,
    "ans": "A) क्राय जीन (Cry IAc एवं Cry IIAb) / Cry Genes",
    "exp": "💡 सही उत्तर: A) क्राय जीन (Cry Genes)। Cry जीन कीट-विशिष्ट एंडोटॉक्सिन क्रिस्टल प्रोटीन बनाते हैं जो कपास के मुकुल कृमि (Bollworm) की मध्य आहारनाल में छिद्र कर उसे मार देते हैं।"
  },
  {
    "topic": "जैव प्रौद्योगिकी एवं उसके उपयोग (Biotechnology - Gene Therapy)",
    "q": "सर्वप्रथम मानव जीन थेरेपी (1990) किस एंजाइम की कमी से ग्रसित 4 वर्षीय बच्ची के उपचार हेतु की गई थी?\n[English: The first human gene therapy (1990) was given for the treatment of which enzyme deficiency?]",
    "options": [
      "A) एडेनोसिन डिएमिनेज (ADA deficiency)",
      "B) टायरोसिनेज",
      "C) ग्लूकोकिनेज",
      "D) पेप्सिनोजेन"
    ],
    "correct": 0,
    "ans": "A) एडेनोसिन डिएमिनेज (ADA deficiency)",
    "exp": "💡 सही उत्तर: A) एडेनोसिन डिएमिनेज (ADA)। ADA की कमी से गंभीर संयुक्त प्रतिरक्षा न्यूनता (SCID) रोग हो जाता है। 1990 में रेट्रोवायरल वेक्टर द्वारा कार्यात्मक ADA-cDNA को रोगी की लसीकाणु में प्रविष्ट कराया गया था।"
  },
  {
    "topic": "जीव और समष्टियां (Organisms and Populations - Growth Models)",
    "q": "सीमित संसाधनों की उपस्थिति में समष्टि वृद्धि (Population Growth) किस वक्र का अनुसरण करती है?\n[English: In the presence of limiting resources, population growth follows which curve?]",
    "options": [
      "A) सिग्मॉइड (लॉजिस्टिक S-वक्र) / Sigmoid (Logistic S-curve)",
      "B) चरघातांकी (J-आकार वक्र) / Exponential J-curve",
      "C) परवलयाकार / Parabolic",
      "D) क्षैतिज सरल रेखा / Linear"
    ],
    "correct": 0,
    "ans": "A) सिग्मॉइड (लॉजिस्टिक S-वक्र) / Sigmoid (Logistic S-curve)",
    "exp": "💡 सही उत्तर: A) सिग्मॉइड (लॉजिस्टिक S-वक्र)। वर्हल्स्ट-पर्ल लॉजिस्टिक वृद्धि सूत्र: dN/dt = rN((K-N)/K) होता है, जहाँ K धारिता क्षमता (Carrying capacity) है। सीमित संसाधनों में S-आकार वक्र बनता है।"
  },
  {
    "topic": "जीव और समष्टियां (Interactions - Parasitism & Commensalism)",
    "q": "सहभोजिता (Commensalism) पारस्परिक क्रिया में दो जातियों के मध्य क्या संबंध होता है?\n[English: In Commensalism interspecific interaction, what is the effect on the two interacting species?]",
    "options": [
      "A) एक जाति को लाभ (+), दूसरी अप्रभावित (0) / One species benefited (+), other unaffected (0)",
      "B) दोनों जातियों को लाभ (+/+)",
      "C) एक को लाभ (+), दूसरी को हानि (-)",
      "D) दोनों जातियों को हानि (-/-)"
    ],
    "correct": 0,
    "ans": "A) एक जाति को लाभ (+), दूसरी अप्रभावित (0) / One species benefited (+), other unaffected (0)",
    "exp": "💡 सही उत्तर: A) (+ / 0)। जैसे आम की शाखा पर ऑर्किड का अधिपादप के रूप में उगना या बगुले और चरते हुए मवेशियों का संबंध। परजीविता (+/-), सहोपकारिता (+/+), और स्पर्धा (-/-) होती है।"
  },
  {
    "topic": "पारितंत्र (Ecosystem - Energy Flow)",
    "q": "पारिस्थितिक तंत्र में ऊर्जा का पिरामिड (Pyramid of Energy) सदैव कैसा होता है?\n[English: In any ecological ecosystem, the pyramid of energy is always:]",
    "options": [
      "A) सदैव सीधा (Always Upright)",
      "B) सदैव उल्टा (Always Inverted)",
      "C) पहले सीधा फिर उल्टा",
      "D) तर्कुरूपी (Spindle shaped)"
    ],
    "correct": 0,
    "ans": "A) सदैव सीधा (Always Upright)",
    "exp": "💡 सही उत्तर: A) सदैव सीधा (Always Upright)। लिंडमैन के 10% ऊर्जा नियम के अनुसार एक पोषण स्तर से दूसरे पोषण स्तर में जाने पर 90% ऊर्जा ऊष्मा के रूप में नष्ट हो जाती है। अतः ऊर्जा पिरामिड कभी उल्टा नहीं हो सकता।"
  },
  {
    "topic": "पारितंत्र (Ecosystem - Trophic Levels)",
    "q": "एक जलीय पारिस्थितिक तंत्र (तालाब) में जैवभार का पिरामिड (Pyramid of Biomass) कैसा होता है?\n[English: In an aquatic ecosystem (e.g. pond), the pyramid of biomass is typically:]",
    "options": [
      "A) उल्टा (Inverted)",
      "B) सदैव सीधा (Always Upright)",
      "C) गोलाकार / Spherical",
      "D) बेलनाकार / Cylindrical"
    ],
    "correct": 0,
    "ans": "A) उल्टा (Inverted)",
    "exp": "💡 सही उत्तर: A) उल्टा (Inverted)। तालाब में प्राथमिक उत्पादकों (पादपप्लवक) का जैवभार बहुत कम होता है जबकि उन पर निर्भर बड़ी मछलियों का जैवभार काफी अधिक होता है।"
  },
  {
    "topic": "जैव विविधता एवं संरक्षण (Biodiversity Conservation - Hotspots)",
    "q": "भारत में वैश्विक जैव विविधता के कितने हॉटस्पॉट (Biodiversity Hotspots) विस्तृत हैं?\n[English: How many global biodiversity hotspots extend into India?]",
    "options": [
      "A) 4 (पश्चिमी घाट, हिमालय, इंडो-बर्मा, सुंडालैंड) / 4 Hotspots",
      "B) 2",
      "C) 1",
      "D) 10"
    ],
    "correct": 0,
    "ans": "A) 4 (पश्चिमी घाट, हिमालय, इंडो-बर्मा, सुंडालैंड) / 4 Hotspots",
    "exp": "💡 सही उत्तर: A) 4 हॉटस्पॉट्स। विश्व के 36 हॉटस्पॉट्स में से 4 भारत के भौगोलिक क्षेत्र में आते हैं: (1) पश्चिमी घाट व श्रीलंका, (2) पूर्वी हिमालय, (3) इंडो-बर्मा, (4) सुंडालैंड (अंडमान निकोबार)।"
  },
  {
    "topic": "जैव विविधता एवं संरक्षण (In-situ vs Ex-situ Conservation)",
    "q": "निम्नलिखित में से कौन सा बाह्य-स्थाने संरक्षण (Ex-situ Conservation) का उदाहरण है?\n[English: Which of the following is an example of ex-situ conservation?]",
    "options": [
      "A) वानस्पतिक उद्यान एवं प्राणी उद्यान / Botanical Gardens and Zoos",
      "B) राष्ट्रीय उद्यान / National Parks",
      "C) वन्यजीव अभयारण्य / Wildlife Sanctuaries",
      "D) जीवमंडल आरक्षित क्षेत्र / Biosphere Reserves"
    ],
    "correct": 0,
    "ans": "A) वानस्पतिक उद्यान एवं प्राणी उद्यान / Botanical Gardens and Zoos",
    "exp": "💡 सही उत्तर: A) वानस्पतिक उद्यान, चिड़ियाघर, जीन बैंक तथा क्रायोप्रिजर्वेशन बाह्य-स्थाने (Ex-situ) संरक्षण के उदाहरण हैं जहाँ संकटग्रस्त जीवों को उनके प्राकृतिक आवास से बाहर विशेष देखभाल में रखा जाता है।"
  },
  {
    "topic": "वंशागति तथा विविधता के सिद्धांत (Linkage & Recombination)",
    "q": "ड्रोसोफिला (फलमक्खी) पर सहलग्नता (Linkage) और पुनर्योजन का विस्तृत अध्ययन किसने किया था?\n[English: Detailed study of linkage and recombination in Drosophila was conducted by:]",
    "options": [
      "A) थॉमस हंट मॉर्गन / Thomas Hunt Morgan",
      "B) ग्रेगर जॉन मेंडल / Gregor Mendel",
      "C) ह्यूगो डी व्रीज / Hugo de Vries",
      "D) कार्ल कोरेन्स / Carl Correns"
    ],
    "correct": 0,
    "ans": "A) थॉमस हंट मॉर्गन / Thomas Hunt Morgan",
    "exp": "💡 सही उत्तर: A) टी. एच. मॉर्गन (T.H. Morgan)। मॉर्गन ने ड्रोसोफिला मेलानोगास्टर पर जीन सहलग्नता, विनिमय (Crossing over) और लिंग सहलग्न वंशागति की खोज की जिसके लिए उन्हें नोबेल पुरस्कार मिला।"
  },
  {
    "topic": "मानव जनन (Menstrual Cycle - Hormones)",
    "q": "गर्भावस्था को बनाए रखने के लिए आवश्यक प्रोजेस्टेरोन हार्मोन का स्राव मुख्य रूप से किससे होता है?\n[English: The hormone progesterone, essential for maintaining pregnancy, is secreted primarily by:]",
    "options": [
      "A) कॉर्पस ल्यूटियम / Corpus Luteum",
      "B) पीयूष ग्रंथि / Pituitary Gland",
      "C) थायरॉइड ग्रंथि / Thyroid Gland",
      "D) एड्रीनल कोर्टेक्स / Adrenal Cortex"
    ],
    "correct": 0,
    "ans": "A) कॉर्पस ल्यूटियम / Corpus Luteum",
    "exp": "💡 सही उत्तर: A) कॉर्पस ल्यूटियम (Corpus Luteum)। अंडोत्सर्ग के बाद फटा हुआ ग्राफी पुटक पीले रंग की अंतःस्रावी संरचना 'कॉर्पस ल्यूटियम' में बदल जाता है जो गर्भाशय के एंडोमेट्रियम को बनाए रखने हेतु भारी मात्रा में प्रोजेस्टेरोन स्रावित करता है।"
  },
  {
    "topic": "जैव विविधता एवं संरक्षण (IUCN Red List)",
    "q": "संकटग्रस्त एवं विलुप्तप्राय जातियों की सूची किस पुस्तक में प्रकाशित की जाती है?\n[English: The list of threatened and endangered species is officially published in:]",
    "options": [
      "A) रेड डेटा बुक (IUCN) / Red Data Book",
      "B) ग्रीन डेटा बुक / Green Data Book",
      "C) ब्लू डेटा बुक / Blue Data Book",
      "D) यलो डेटा बुक / Yellow Data Book"
    ],
    "correct": 0,
    "ans": "A) रेड डेटा बुक (IUCN) / Red Data Book",
    "exp": "💡 सही उत्तर: A) रेड डेटा बुक। अंतर्राष्ट्रीय प्रकृति संरक्षण संघ (IUCN) संकटग्रस्त पादप एवं जंतु प्रजातियों का रिकॉर्ड रेड डेटा बुक में संकलित करता है।"
  },
  {
    "topic": "जैव प्रौद्योगिकी: सिद्धांत व प्रक्रम (Gel Electrophoresis)",
    "q": "एगारोज जेल वैद्युतकणसंचलन (Agarose Gel Electrophoresis) में DNA खंड किस आधार पर अलग होते हैं?\n[English: In Agarose Gel Electrophoresis, DNA fragments are separated based on:]",
    "options": [
      "A) आकार एवं आणविक भार (छलनी प्रभाव) / Size and molecular weight (Sieving effect)",
      "B) केवल धनात्मक आवेश / Only positive charge",
      "C) शर्करा की मात्रा / Sugar content",
      "D) ग्वानिन अनुपात / Guanine ratio"
    ],
    "correct": 0,
    "ans": "A) आकार एवं आणविक भार (छलनी प्रभाव) / Size and molecular weight (Sieving effect)",
    "exp": "💡 सही उत्तर: A) आकार और आणविक भार। ऋणात्मक आवेशित DNA अणु एनोड (+) की ओर गमन करते हैं। छोटे DNA खंड एगारोज जेल की जाली से तीव्रता से आगे निकल जाते हैं, जबकि बड़े खंड पीछे रह जाते हैं।"
  }
];

const CLASS12_MATH_BANK = [
  {
    "topic": "संबंध एवं फलन (Relations & Functions)",
    "q": "यदि समुच्चय A पर संबंध R स्वतुल्य (Reflexive), सममित (Symmetric) तथा संक्रामक (Transitive) तीनों हो, तो R को क्या कहा जाता है?\n[English: If a relation R on set A is reflexive, symmetric and transitive, then what is R called?]",
    "options": [
      "A) रिक्त संबंध / Empty Relation",
      "B) तुल्यता संबंध / Equivalence Relation",
      "C) प्रतिसममित संबंध / Anti-symmetric Relation",
      "D) सार्वत्रिक संबंध / Universal Relation"
    ],
    "correct": 1,
    "ans": "B) तुल्यता संबंध / Equivalence Relation",
    "exp": "💡 सही उत्तर: B) तुल्यता संबंध (Equivalence Relation)। कोई संबंध R समुच्चय A पर तुल्यता संबंध कहलाता है यदि और केवल यदि: (i) ∀ a ∈ A, (a,a) ∈ R, (ii) (a,b) ∈ R ⟹ (b,a) ∈ R, (iii) (a,b) ∈ R व (b,c) ∈ R ⟹ (a,c) ∈ R।"
  },
  {
    "topic": "संबंध एवं फलन (Relations & Functions)",
    "q": "यदि फलन f: R → R, f(x) = 2x द्वारा परिभाषित है, तो f किस प्रकार का फलन है?\n[English: If the function f: R → R is defined by f(x) = 2x, then what type of function is f?]",
    "options": [
      "A) एकैकी तथा आच्छादक / One-one and Onto (Bijective)",
      "B) बहु-एक तथा आच्छादक / Many-one and Onto",
      "C) एकैकी परंतु अनाच्छादक / One-one but not Onto",
      "D) न तो एकैकी न ही आच्छादक / Neither One-one nor Onto"
    ],
    "correct": 0,
    "ans": "A) एकैकी तथा आच्छादक / One-one and Onto (Bijective)",
    "exp": "💡 सही उत्तर: A) एकैकी तथा आच्छादक। f(x₁) = f(x₂) ⟹ 2x₁ = 2x₂ ⟹ x₁ = x₂ (एकैकी)। प्रत्येक y ∈ R के लिए x = y/2 ∈ R ऐसा विद्यमान है कि f(x) = y (आच्छादक)। अतः f एकैकी आच्छादक (Bijective) है।"
  },
  {
    "topic": "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    "q": "मुख्य मान शाखा (Principal Value Branch) में sin⁻¹(1/2) का मान क्या होगा?\n[English: What is the principal value of sin⁻¹(1/2)?]",
    "options": [
      "A) π/6 (30°)",
      "B) π/3 (60°)",
      "C) π/4 (45°)",
      "D) π/2 (90°)"
    ],
    "correct": 0,
    "ans": "A) π/6 (30°)",
    "exp": "💡 सही उत्तर: A) π/6। sin⁻¹(x) का मुख्य मान परिसर [-π/2, π/2] होता है। sin(π/6) = 1/2, अतः sin⁻¹(1/2) = π/6।"
  },
  {
    "topic": "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    "q": "tan⁻¹(1) + cos⁻¹(-1/2) + sin⁻¹(-1/2) का मान क्या होगा?\n[English: What is the value of tan⁻¹(1) + cos⁻¹(-1/2) + sin⁻¹(-1/2)?]",
    "options": [
      "A) π/4",
      "B) π/2",
      "C) 3π/4",
      "D) π"
    ],
    "correct": 2,
    "ans": "C) 3π/4",
    "exp": "💡 सही उत्तर: C) 3π/4। सूत्र: cos⁻¹(x) + sin⁻¹(x) = π/2। यहाँ x = -1/2 है, अतः cos⁻¹(-1/2) + sin⁻¹(-1/2) = π/2। साथ ही tan⁻¹(1) = π/4। कुल मान = π/4 + π/2 = 3π/4।"
  },
  {
    "topic": "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    "q": "sin⁻¹(sin(2π/3)) का सही मान क्या होगा?\n[English: What is the correct value of sin⁻¹(sin(2π/3))?]",
    "options": [
      "A) 2π/3",
      "B) π/3",
      "C) -π/3",
      "D) 4π/3"
    ],
    "correct": 1,
    "ans": "B) π/3",
    "exp": "💡 सही उत्तर: B) π/3। 2π/3 कोण sin⁻¹ की मुख्य शाखा [-π/2, π/2] में नहीं है। sin(2π/3) = sin(π - π/3) = sin(π/3)। अतः sin⁻¹(sin(π/3)) = π/3।"
  },
  {
    "topic": "आव्यूह (Matrices)",
    "q": "यदि आव्यूह A = [a_ij] एक सममित आव्यूह (Symmetric Matrix) है, तो कौन सी शर्त सत्य होगी?\n[English: If matrix A = [a_ij] is a symmetric matrix, which condition is true?]",
    "options": [
      "A) a_ij = -a_ji",
      "B) a_ij = a_ji",
      "C) a_ij = 0",
      "D) a_ij = 1"
    ],
    "correct": 1,
    "ans": "B) a_ij = a_ji",
    "exp": "💡 सही उत्तर: B) a_ij = a_ji। सममित आव्यूह के लिए A' = A होता है, अर्थात a_ij = a_ji। विषम-सममित (Skew-symmetric) आव्यूह के लिए A' = -A अर्थात a_ij = -a_ji तथा विकर्ण अवयव शून्य होते हैं।"
  },
  {
    "topic": "आव्यूह (Matrices)",
    "q": "यदि A और B समान कोटि के वर्ग आव्यूह हैं, तो (AB)' का मान किसके बराबर होता है?\n[English: If A and B are square matrices of same order, then (AB)' is equal to:]",
    "options": [
      "A) A'B'",
      "B) B'A'",
      "C) AB",
      "D) BA"
    ],
    "correct": 1,
    "ans": "B) B'A'",
    "exp": "💡 सही उत्तर: B) B'A'। परिवर्त (Transpose) के उत्क्रमण नियम (Reversal Law) के अनुसार दो आव्यूहों के गुणनफल का परिवर्त (AB)' = B'A' होता है।"
  },
  {
    "topic": "सारणिक (Determinants)",
    "q": "यदि A एक 3 × 3 कोटि का व्युत्क्रमणीय (Invertible) आव्यूह है, तो |adj(A)| का मान किसके बराबर होगा?\n[English: If A is an invertible matrix of order 3 × 3, then |adj(A)| is equal to:]",
    "options": [
      "A) |A|",
      "B) |A|²",
      "C) |A|³",
      "D) 3|A|"
    ],
    "correct": 1,
    "ans": "B) |A|²",
    "exp": "💡 सही उत्तर: B) |A|²। प्रमेय: n × n कोटि के वर्ग आव्यूह के लिए |adj(A)| = |A|^(n - 1) होता है। यहाँ n = 3 है, अतः |adj(A)| = |A|^(3 - 1) = |A|²।"
  },
  {
    "topic": "सारणिक (Determinants)",
    "q": "यदि किसी सारणिक की कोई दो पंक्तियाँ (Rows) अथवा दो स्तंभ (Columns) सर्वसम (Identical) हों, तो सारणिक का मान क्या होता है?\n[English: If any two rows or columns of a determinant are identical, what is the value of the determinant?]",
    "options": [
      "A) 1",
      "B) 0 / Zero",
      "C) -1",
      "D) अपरिमित / Infinite"
    ],
    "correct": 1,
    "ans": "B) 0 / Zero",
    "exp": "💡 सही उत्तर: B) 0 (शून्य)। सारणिक का मूलभूत गुणधर्म है कि यदि किसी सारणिक की किन्हीं दो पंक्तियों या दो स्तंभों के संगत अवयव समान (सर्वसम) हों, तो उस सारणिक का मान सदैव शून्य होता है।"
  },
  {
    "topic": "सारणिक (Determinants)",
    "q": "एक वर्ग आव्यूह A व्युत्क्रमणीय (Invertible) कहलाता है यदि और केवल यदि:\n[English: A square matrix A is called invertible if and only if:]",
    "options": [
      "A) |A| = 0",
      "B) |A| ≠ 0 (अव्युत्क्रमणीय नहीं, Non-singular)",
      "C) A = A'",
      "D) A = -A'"
    ],
    "correct": 1,
    "ans": "B) |A| ≠ 0 (अव्युत्क्रमणीय नहीं, Non-singular)",
    "exp": "💡 सही उत्तर: B) |A| ≠ 0। आव्यूह A⁻¹ का अस्तित्व तभी होता है जब A एक व्युत्क्रमणीय वर्ग आव्यूह हो, अर्थात |A| ≠ 0 (A is non-singular)। यदि |A| = 0 हो तो वह अव्युत्क्रमणीय (Singular) कहलाता है।"
  },
  {
    "topic": "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    "q": "फलन y = log(sin x) का x के सापेक्ष अवकलज (dy/dx) क्या होगा?\n[English: What is the derivative (dy/dx) of y = log(sin x) with respect to x?]",
    "options": [
      "A) tan x",
      "B) cot x",
      "C) -cot x",
      "D) sec x"
    ],
    "correct": 1,
    "ans": "B) cot x",
    "exp": "💡 सही उत्तर: B) cot x। श्रृंखला नियम (Chain rule): dy/dx = (1 / sin x) × d/dx(sin x) = (1 / sin x) × cos x = cos x / sin x = cot x।"
  },
  {
    "topic": "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    "q": "यदि y = tan⁻¹((3x - x³) / (1 - 3x²)) हो, तो dy/dx का मान क्या होगा?\n[English: If y = tan⁻¹((3x - x³) / (1 - 3x²)), then what is dy/dx?]",
    "options": [
      "A) 3 / (1 + x²)",
      "B) 1 / (1 + x²)",
      "C) 3 / (1 - x²)",
      "D) 2 / (1 + x²)"
    ],
    "correct": 0,
    "ans": "A) 3 / (1 + x²)",
    "exp": "💡 सही उत्तर: A) 3 / (1 + x²)। त्रिकोणमितीय प्रतिस्थापन x = tan θ से: y = tan⁻¹(tan 3θ) = 3θ = 3 tan⁻¹ x। अतः dy/dx = 3 × (1 / (1 + x²)) = 3 / (1 + x²)।"
  },
  {
    "topic": "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    "q": "यदि x = a cos θ तथा y = a sin θ हो, तो dy/dx का मान क्या होगा?\n[English: If x = a cos θ and y = a sin θ, then dy/dx is equal to:]",
    "options": [
      "A) tan θ",
      "B) -cot θ",
      "C) cot θ",
      "D) -tan θ"
    ],
    "correct": 1,
    "ans": "B) -cot θ",
    "exp": "💡 सही उत्तर: B) -cot θ। प्राचलिक अवकलन: dx/dθ = -a sin θ तथा dy/dθ = a cos θ। अतः dy/dx = (dy/dθ) / (dx/dθ) = (a cos θ) / (-a sin θ) = -cot θ।"
  },
  {
    "topic": "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    "q": "वृत्त के क्षेत्रफल में त्रिज्या r के सापेक्ष परिवर्तन की दर क्या होगी जब r = 5 cm हो?\n[English: What is the rate of change of area of a circle with respect to radius r when r = 5 cm?]",
    "options": [
      "A) 10π cm²/cm",
      "B) 5π cm²/cm",
      "C) 25π cm²/cm",
      "D) 20π cm²/cm"
    ],
    "correct": 0,
    "ans": "A) 10π cm²/cm",
    "exp": "💡 सही उत्तर: A) 10π cm²/cm। वृत्त का क्षेत्रफल A = πr²। त्रिज्या के सापेक्ष अवकलन dA/dr = 2πr। जब r = 5 cm, dA/dr = 2π(5) = 10π cm²/cm।"
  },
  {
    "topic": "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    "q": "वक्र y = x³ - x के बिंदु x = 2 पर स्पर्श रेखा की प्रवणता (Slope of Tangent) क्या होगी?\n[English: What is the slope of the tangent to the curve y = x³ - x at the point x = 2?]",
    "options": [
      "A) 11",
      "B) 12",
      "C) 10",
      "D) 6"
    ],
    "correct": 0,
    "ans": "A) 11",
    "exp": "💡 सही उत्तर: A) 11। प्रवणता m = dy/dx। यहाँ y = x³ - x ⟹ dy/dx = 3x² - 1। x = 2 रखने पर: m = 3(2)² - 1 = 3(4) - 1 = 12 - 1 = 11।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "∫ (1 / (1 + x²)) dx का मान क्या होता है?\n[English: What is the value of ∫ (1 / (1 + x²)) dx?]",
    "options": [
      "A) sin⁻¹ x + C",
      "B) tan⁻¹ x + C",
      "C) log(1 + x²) + C",
      "D) cos⁻¹ x + C"
    ],
    "correct": 1,
    "ans": "B) tan⁻¹ x + C",
    "exp": "💡 सही उत्तर: B) tan⁻¹ x + C। मानक समाकलन सूत्र: d/dx(tan⁻¹ x) = 1/(1 + x²), अतः प्रति-अवकलज ∫ 1/(1 + x²) dx = tan⁻¹ x + C।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "∫ sec x dx का समाकलन मान क्या होगा?\n[English: What is the integral value of ∫ sec x dx?]",
    "options": [
      "A) log |sec x + tan x| + C",
      "B) log |sec x - tan x| + C",
      "C) sec x tan x + C",
      "D) tan² x + C"
    ],
    "correct": 0,
    "ans": "A) log |sec x + tan x| + C",
    "exp": "💡 सही उत्तर: A) log |sec x + tan x| + C। मानक सूत्र: ∫ sec x dx = log |sec x + tan x| + C = log |tan(π/4 + x/2)| + C।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "∫ eˣ (sin x + cos x) dx का मान क्या होगा?\n[English: What is the value of ∫ eˣ (sin x + cos x) dx?]",
    "options": [
      "A) eˣ cos x + C",
      "B) eˣ sin x + C",
      "C) -eˣ sin x + C",
      "D) eˣ (sin x - cos x) + C"
    ],
    "correct": 1,
    "ans": "B) eˣ sin x + C",
    "exp": "💡 सही उत्तर: B) eˣ sin x + C। महत्वपूर्ण मानक सूत्र: ∫ eˣ [f(x) + f'(x)] dx = eˣ f(x) + C। यहाँ f(x) = sin x तथा f'(x) = cos x है, अतः उत्तर eˣ sin x + C है।"
  },
  {
    "topic": "निश्चित समाकलन (Definite Integrals)",
    "q": "निश्चित समाकलन ∫₀^(π/2) (sin x / (sin x + cos x)) dx का मान क्या होगा?\n[English: What is the value of the definite integral ∫₀^(π/2) (sin x / (sin x + cos x)) dx?]",
    "options": [
      "A) π/2",
      "B) π/4",
      "C) 1",
      "D) 0"
    ],
    "correct": 1,
    "ans": "B) π/4",
    "exp": "💡 सही उत्तर: B) π/4। गुणधर्म ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx लगाने पर: I = ∫₀^(π/2) (cos x / (cos x + sin x)) dx। दोनों को जोड़ने पर: 2I = ∫₀^(π/2) 1 dx = π/2 ⟹ I = π/4।"
  },
  {
    "topic": "निश्चित समाकलन (Definite Integrals)",
    "q": "यदि f(x) एक विषम फलन (Odd Function, f(-x) = -f(x)) है, तो ∫₋ₐᵃ f(x) dx का मान क्या होगा?\n[English: If f(x) is an odd function (f(-x) = -f(x)), what is the value of ∫₋ₐᵃ f(x) dx?]",
    "options": [
      "A) 2 ∫₀ᵃ f(x) dx",
      "B) 0 / Zero",
      "C) a",
      "D) 1"
    ],
    "correct": 1,
    "ans": "B) 0 / Zero",
    "exp": "💡 सही उत्तर: B) 0। निश्चित समाकलन का मौलिक गुणधर्म: विषम फलन के लिए सीमा -a से +a तक का समाकलन सदैव शून्य होता है।"
  },
  {
    "topic": "अवकल समीकरण (Differential Equations)",
    "q": "अवकल समीकरण (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 की घात (Degree) क्या है?\n[English: What is the degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0?]",
    "options": [
      "A) 3",
      "B) 2",
      "C) 1",
      "D) परिभाषित नहीं / Not Defined"
    ],
    "correct": 3,
    "ans": "D) परिभाषित नहीं / Not Defined",
    "exp": "💡 सही उत्तर: D) परिभाषित नहीं (Not Defined)। क्योंकि यह अवकल समीकरण अवकलजों (dy/dx) में एक बहुपद समीकरण (Polynomial equation) नहीं है (sin(dy/dx) पद के कारण), इसलिए इसकी कोटि 2 है परंतु घात अपरिभाषित है।"
  },
  {
    "topic": "अवकल समीकरण (Differential Equations)",
    "q": "रैखिक अवकल समीकरण dy/dx + Py = Q का समाकलन गुणक (Integrating Factor - I.F.) क्या होता है?\n[English: What is the integrating factor (I.F.) of linear differential equation dy/dx + Py = Q?]",
    "options": [
      "A) e^(∫ P dx)",
      "B) e^(∫ Q dx)",
      "C) ∫ P dx",
      "D) e^(-∫ P dx)"
    ],
    "correct": 0,
    "ans": "A) e^(∫ P dx)",
    "exp": "💡 सही उत्तर: A) e^(∫ P dx)। प्रथम कोटि के मानक रैखिक अवकल समीकरण dy/dx + Py = Q का समाकलन गुणक (Integrating Factor) I.F. = e^(∫ P dx) होता है।"
  },
  {
    "topic": "अवकल समीकरण (Differential Equations)",
    "q": "अवकल समीकरण dy/dx = y/x का व्यापक हल (General Solution) क्या होगा?\n[English: What is the general solution of the differential equation dy/dx = y/x?]",
    "options": [
      "A) y = Cx",
      "B) y = C / x",
      "C) y = x² + C",
      "D) xy = C"
    ],
    "correct": 0,
    "ans": "A) y = Cx",
    "exp": "💡 सही उत्तर: A) y = Cx। चरों को पृथक करने पर: dy/y = dx/x। दोनों पक्षों का समाकलन करने पर: log y = log x + log C ⟹ log y = log(Cx) ⟹ y = Cx।"
  },
  {
    "topic": "सदिश बीजगणित (Vector Algebra)",
    "q": "यदि दो शून्येत्तर सदिशों a⃗ और b⃗ के लिए a⃗ · b⃗ = 0 हो, तो उनके बीच का कोण θ क्या होगा?\n[English: If for two non-zero vectors a⃗ and b⃗, a⃗ · b⃗ = 0, what is the angle θ between them?]",
    "options": [
      "A) 0°",
      "B) 45°",
      "C) 90° (π/2, परस्पर लंबवत / Perpendicular)",
      "D) 180°"
    ],
    "correct": 2,
    "ans": "C) 90° (π/2, परस्पर लंबवत / Perpendicular)",
    "exp": "💡 सही उत्तर: C) 90°। बिंदु गुणनफल (Dot Product) सूत्र: a⃗ · b⃗ = |a⃗||b⃗| cos θ। चूँकि a⃗ · b⃗ = 0 और सदिश शून्येत्तर हैं, cos θ = 0 ⟹ θ = 90° (π/2, सदिश परस्पर लंबवत हैं)।"
  },
  {
    "topic": "सदिश बीजगणित (Vector Algebra)",
    "q": "î · (ĵ × k̂) का मान क्या होगा?\n[English: What is the value of î · (ĵ × k̂)?]",
    "options": [
      "A) 0",
      "B) 1",
      "C) -1",
      "D) k̂"
    ],
    "correct": 1,
    "ans": "B) 1",
    "exp": "💡 सही उत्तर: B) 1। दाएँ हाथ के दक्षिणावर्ती नियम से: ĵ × k̂ = î। अतः î · (ĵ × k̂) = î · î = 1। यह अदिश त्रिक गुणनफल (Scalar Triple Product) का मूलभूत परिणाम है।"
  },
  {
    "topic": "सदिश बीजगणित (Vector Algebra)",
    "q": "सदिश a⃗ = 2î + 3ĵ + 6k̂ का परिमाण (Magnitude |a⃗|) कितना होगा?\n[English: What is the magnitude of vector a⃗ = 2î + 3ĵ + 6k̂?]",
    "options": [
      "A) 7",
      "B) 11",
      "C) 49",
      "D) √41"
    ],
    "correct": 0,
    "ans": "A) 7",
    "exp": "💡 सही उत्तर: A) 7। परिमाण सूत्र: |a⃗| = √(x² + y² + z²) = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7।"
  },
  {
    "topic": "सदिश बीजगणित (Vector Algebra)",
    "q": "यदि a⃗ × b⃗ = 0⃗ हो, तो सदिश a⃗ और b⃗ के संबंध में क्या सत्य है?\n[English: If a⃗ × b⃗ = 0⃗, what is true regarding vectors a⃗ and b⃗?]",
    "options": [
      "A) a⃗ और b⃗ परस्पर लंबवत हैं / Perpendicular",
      "B) a⃗ और b⃗ परस्पर समानांतर / संरेख हैं (Parallel / Collinear)",
      "C) |a⃗| = |b⃗|",
      "D) a⃗ + b⃗ = 0⃗"
    ],
    "correct": 1,
    "ans": "B) a⃗ और b⃗ परस्पर समानांतर / संरेख हैं (Parallel / Collinear)",
    "exp": "💡 सही उत्तर: B) a⃗ और b⃗ परस्पर समानांतर हैं। सदिश गुणनफल |a⃗ × b⃗| = |a⃗||b⃗| sin θ = 0 ⟹ sin θ = 0 ⟹ θ = 0° या 180°। अतः दोनों सदिश समानांतर अथवा संरेख (Collinear) होते हैं।"
  },
  {
    "topic": "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    "q": "यदि एक रेखा की दिक्-कोज्याएँ (Direction Cosines) l, m, n हों, तो कौन सा संबंध सदैव सत्य है?\n[English: If l, m, n are the direction cosines of a line, which relation is always true?]",
    "options": [
      "A) l + m + n = 1",
      "B) l² + m² + n² = 1",
      "C) l² + m² + n² = 0",
      "D) l² - m² + n² = 1"
    ],
    "correct": 1,
    "ans": "B) l² + m² + n² = 1",
    "exp": "💡 सही उत्तर: B) l² + m² + n² = 1। किसी भी सरल रेखा के लिए अक्षों से बने कोणों की कोज्याओं के वर्गों का योग सदैव 1 होता है (cos² α + cos² β + cos² γ = 1)।"
  },
  {
    "topic": "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    "q": "बिंदु (x, y, z) की मूल बिंदु (Origin - 0, 0, 0) से दूरी क्या होगी?\n[English: What is the distance of point (x, y, z) from the origin?]",
    "options": [
      "A) x + y + z",
      "B) √(x² + y² + z²)",
      "C) x² + y² + z²",
      "D) √(x + y + z)"
    ],
    "correct": 1,
    "ans": "B) √(x² + y² + z²)",
    "exp": "💡 सही उत्तर: B) √(x² + y² + z²)। 3D दूरी सूत्र: d = √((x - 0)² + (y - 0)² + (z - 0)²) = √(x² + y² + z²)।"
  },
  {
    "topic": "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    "q": "दो रेखाएँ जिनके दिक्-अनुपात क्रमशः a₁, b₁, c₁ तथा a₂, b₂, c₂ हैं, परस्पर लंबवत (Perpendicular) होंगी यदि:\n[English: Two lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂ are perpendicular if:]",
    "options": [
      "A) a₁/a₂ = b₁/b₂ = c₁/c₂",
      "B) a₁a₂ + b₁b₂ + c₁c₂ = 0",
      "C) a₁a₂ + b₁b₂ + c₁c₂ = 1",
      "D) a₁b₂ - a₂b₁ = 0"
    ],
    "correct": 1,
    "ans": "B) a₁a₂ + b₁b₂ + c₁c₂ = 0",
    "exp": "💡 सही उत्तर: B) a₁a₂ + b₁b₂ + c₁c₂ = 0। दो रेखाओं के मध्य कोण cos θ = (a₁a₂ + b₁b₂ + c₁c₂) / (√(a₁² + b₁² + c₁²) √(a₂² + b₂² + c₂²))। लंबवत होने पर θ = 90° ⟹ cos 90° = 0 ⟹ a₁a₂ + b₁b₂ + c₁c₂ = 0।"
  },
  {
    "topic": "रैखिक प्रोग्रामन (Linear Programming - LPP)",
    "q": "रैखिक प्रोग्रामन समस्या (LPP) में उद्देश्य फलन (Objective Function) Z = ax + by का इष्टतम मान (Optimal Value) कहाँ स्थित होता है?\n[English: In a Linear Programming Problem (LPP), where does the optimal value of the objective function Z = ax + by lie?]",
    "options": [
      "A) सुसंगत क्षेत्र के शीर्ष (कोणीय) बिंदुओं पर / Corner points of feasible region",
      "B) केवल मूल बिंदु पर / Only at origin",
      "C) सुसंगत क्षेत्र के ठीक केंद्र पर / Exact center",
      "D) क्षेत्र के किसी भी यादृच्छिक बिंदु पर / Any random point"
    ],
    "correct": 0,
    "ans": "A) सुसंगत क्षेत्र के शीर्ष (कोणीय) बिंदुओं पर / Corner points of feasible region",
    "exp": "💡 सही उत्तर: A) सुसंगत क्षेत्र के शीर्ष बिंदुओं पर। LPP की मूलभूत प्रमेय: यदि किसी रैखिक प्रोग्रामन समस्या का सुसंगत क्षेत्र परिबद्ध (Bounded) है, तो उद्देश्य फलन का अधिकतम या न्यूनतम मान सदैव सुसंगत क्षेत्र के शीर्ष (Corner) बिंदुओं पर ही प्राप्त होता है।"
  },
  {
    "topic": "प्रायिकता (Probability)",
    "q": "यदि A और B दो स्वतंत्र घटनाएँ (Independent Events) हों, तो P(A ∩ B) का मान क्या होगा?\n[English: If A and B are two independent events, then what is P(A ∩ B)?]",
    "options": [
      "A) P(A) + P(B)",
      "B) P(A) × P(B)",
      "C) P(A) / P(B)",
      "D) P(A) - P(B)"
    ],
    "correct": 1,
    "ans": "B) P(A) × P(B)",
    "exp": "💡 सही उत्तर: B) P(A) × P(B)। दो घटनाएँ A और B स्वतंत्र कहलाती हैं यदि एक के घटित होने की प्रायिकता दूसरे के घटित होने से प्रभावित न हो। इसका गुणन नियम P(A ∩ B) = P(A) · P(B) है।"
  },
  {
    "topic": "प्रायिकता (Probability)",
    "q": "यदि P(A) = 3/8, P(B) = 1/2 तथा P(A ∩ B) = 1/4 हो, तो P(A | B) का मान क्या होगा?\n[English: If P(A) = 3/8, P(B) = 1/2 and P(A ∩ B) = 1/4, what is P(A | B)?]",
    "options": [
      "A) 1/2",
      "B) 2/3",
      "C) 3/4",
      "D) 1/8"
    ],
    "correct": 0,
    "ans": "A) 1/2",
    "exp": "💡 सही उत्तर: A) 1/2। सप्रतिबंध प्रायिकता (Conditional Probability) सूत्र: P(A | B) = P(A ∩ B) / P(B) = (1/4) / (1/2) = (1/4) × (2/1) = 2/4 = 1/2।"
  },
  {
    "topic": "प्रायिकता (Probability)",
    "q": "किसी घटना E की प्रायिकता P(E) तथा उसकी पूरक घटना P(E') का योग क्या होता है?\n[English: What is the sum of probability of an event P(E) and its complement event P(E')?]",
    "options": [
      "A) 0",
      "B) 1",
      "C) 0.5",
      "D) अनिश्चित / Indeterminate"
    ],
    "correct": 1,
    "ans": "B) 1",
    "exp": "💡 सही उत्तर: B) 1। प्रायिकता का मौलिक नियम: किसी घटना के होने और न होने की प्रायिकताओं का योग सदैव 1 होता है (P(E) + P(E') = 1)।"
  },
  {
    "topic": "आव्यूह (Matrices)",
    "q": "यदि A एक वर्ग आव्यूह है, तो A + A' सदैव किस प्रकार का आव्यूह होता है?\n[English: If A is a square matrix, then A + A' is always which type of matrix?]",
    "options": [
      "A) विषम-सममित आव्यूह / Skew-symmetric",
      "B) सममित आव्यूह / Symmetric Matrix",
      "C) इकाई आव्यूह / Identity Matrix",
      "D) शून्य आव्यूह / Null Matrix"
    ],
    "correct": 1,
    "ans": "B) सममित आव्यूह / Symmetric Matrix",
    "exp": "💡 सही उत्तर: B) सममित आव्यूह। सत्यापन: (A + A')' = A' + (A')' = A' + A = A + A'। चूँकि (A + A')' = A + A', अतः यह सदैव सममित होता है। A - A' सदैव विषम-सममित होता है।"
  },
  {
    "topic": "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    "q": "फलन f(x) = x³ - 3x का स्थानीय उच्चिष्ठ (Local Maxima) किस बिंदु पर होगा?\n[English: At which point does the function f(x) = x³ - 3x have a local maximum?]",
    "options": [
      "A) x = 1",
      "B) x = -1",
      "C) x = 0",
      "D) x = 3"
    ],
    "correct": 1,
    "ans": "B) x = -1",
    "exp": "💡 सही उत्तर: B) x = -1। f'(x) = 3x² - 3 = 0 ⟹ x² = 1 ⟹ x = ±1। द्वितीय अवकलज f''(x) = 6x। x = -1 पर: f''(-1) = -6 < 0 (उच्चिष्ठ)। x = 1 पर f''(1) = 6 > 0 (निम्निष्ठ)।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "∫ (1 / √(a² - x²)) dx का मान क्या होता है?\n[English: What is the value of ∫ (1 / √(a² - x²)) dx?]",
    "options": [
      "A) sin⁻¹(x/a) + C",
      "B) (1/a) sin⁻¹(x/a) + C",
      "C) cos⁻¹(x/a) + C",
      "D) log|x + √(a² - x²)| + C"
    ],
    "correct": 0,
    "ans": "A) sin⁻¹(x/a) + C",
    "exp": "💡 सही उत्तर: A) sin⁻¹(x/a) + C। मानक त्रिकोणमितीय प्रतिस्थापन x = a sin θ करने पर dx = a cos θ dθ ⟹ ∫ (a cos θ / a cos θ) dθ = θ + C = sin⁻¹(x/a) + C।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "खंडशः समाकलन (Integration by Parts) सूत्र ∫ u v dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx में प्रथम फलन चुनने का सही नियम क्या है?\n[English: In Integration by Parts, what is the standard rule for choosing the first function?]",
    "options": [
      "A) BODMAS नियम",
      "B) ILATE नियम (Inverse, Logarithmic, Algebraic, Trigonometric, Exponential)",
      "C) L'Hopital नियम",
      "D) Cramer नियम"
    ],
    "correct": 1,
    "ans": "B) ILATE नियम",
    "exp": "💡 सही उत्तर: B) ILATE नियम। ILATE क्रम: I (प्रतिलोम त्रिकोणमितीय), L (लघुगणकीय), A (बीजगणितीय), T (त्रिकोणमितीय), E (चरघातांकी)। जो फलन इस क्रम में पहले आता है, उसे प्रथम फलन (u) माना जाता है।"
  },
  {
    "topic": "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    "q": "2 tan⁻¹ x का मान sin⁻¹ के पदों में क्या होता है?\n[English: What is the value of 2 tan⁻¹ x in terms of sin⁻¹?]",
    "options": [
      "A) sin⁻¹(2x / (1 + x²))",
      "B) sin⁻¹(2x / (1 - x²))",
      "C) sin⁻¹((1 - x²) / (1 + x²))",
      "D) sin⁻¹(x / (1 + x²))"
    ],
    "correct": 0,
    "ans": "A) sin⁻¹(2x / (1 + x²))",
    "exp": "💡 सही उत्तर: A) sin⁻¹(2x / (1 + x²))। सूत्र: 2 tan⁻¹ x = sin⁻¹(2x / (1 + x²)) = cos⁻¹((1 - x²) / (1 + x²)) = tan⁻¹(2x / (1 - x²))।"
  },
  {
    "topic": "आव्यूह (Matrices)",
    "q": "यदि आव्यूह A की कोटि 2 × 3 तथा B की कोटि 3 × 4 हो, तो गुणनफल आव्यूह AB की कोटि (Order) क्या होगी?\n[English: If matrix A is of order 2 × 3 and matrix B is of order 3 × 4, what is the order of matrix AB?]",
    "options": [
      "A) 3 × 3",
      "B) 2 × 4",
      "C) 4 × 2",
      "D) गुणन संभव नहीं है / Multiplication not possible"
    ],
    "correct": 1,
    "ans": "B) 2 × 4",
    "exp": "💡 सही उत्तर: B) 2 × 4। यदि A की कोटि m × k और B की कोटि k × n हो, तो गुणनफल AB की कोटि m × n होती है। यहाँ 2 × 3 और 3 × 4 का गुणनफल 2 × 4 कोटि का आव्यूह देगा।"
  },
  {
    "topic": "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    "q": "x-अक्ष की दिक्-कोज्याएँ (Direction Cosines of x-axis) क्या हैं?\n[English: What are the direction cosines of the x-axis?]",
    "options": [
      "A) (1, 0, 0)",
      "B) (0, 1, 0)",
      "C) (0, 0, 1)",
      "D) (1, 1, 1)"
    ],
    "correct": 0,
    "ans": "A) (1, 0, 0)",
    "exp": "💡 सही उत्तर: A) (1, 0, 0)। x-अक्ष x-अक्ष से 0°, y-अक्ष से 90° तथा z-अक्ष से 90° का कोण बनाती है। अतः दिक्-कोज्याएँ (cos 0°, cos 90°, cos 90°) = (1, 0, 0) होंगी।"
  },
  {
    "topic": "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    "q": "फलन f(x) = |x| बिंदु x = 0 पर किस प्रकार का व्यवहार प्रदर्शित करता है?\n[English: How does the function f(x) = |x| behave at the point x = 0?]",
    "options": [
      "A) सतत है परंतु अवकलनीय नहीं / Continuous but not Differentiable",
      "B) सतत तथा अवकलनीय दोनों है / Both Continuous and Differentiable",
      "C) न तो सतत है न ही अवकलनीय / Neither Continuous nor Differentiable",
      "D) असतत है / Discontinuous"
    ],
    "correct": 0,
    "ans": "A) सतत है परंतु अवकलनीय नहीं / Continuous but not Differentiable",
    "exp": "💡 सही उत्तर: A) सतत है परंतु अवकलनीय नहीं। x = 0 पर फलन की सीमा f(0) = 0 है (सतत है)। परंतु बायाँ अवकलज LHD = -1 तथा दायाँ अवकलज RHD = +1 है, जो बराबर नहीं हैं। अतः x = 0 पर नुकीले कोने (sharp corner) के कारण यह अवकलनीय नहीं है।"
  },
  {
    "topic": "समाकलन (Integrals)",
    "q": "∫₁^(√3) (1 / (1 + x²)) dx का मान क्या होगा?\n[English: What is the value of ∫₁^(√3) (1 / (1 + x²)) dx?]",
    "options": [
      "A) π/12",
      "B) π/6",
      "C) π/4",
      "D) 2π/3"
    ],
    "correct": 0,
    "ans": "A) π/12",
    "exp": "💡 सही उत्तर: A) π/12। समाकलन tan⁻¹ x सीमा 1 से √3: [tan⁻¹(√3) - tan⁻¹(1)] = π/3 - π/4 = (4π - 3π)/12 = π/12।"
  },
  {
    "topic": "रैखिक प्रोग्रामन (Linear Programming - LPP)",
    "q": "व्यवरोधों x + y ≤ 4, x ≥ 0, y ≥ 0 के अंतर्गत Z = 3x + 4y का अधिकतम मान क्या होगा?\n[English: What is the maximum value of Z = 3x + 4y subject to x + y ≤ 4, x ≥ 0, y ≥ 0?]",
    "options": [
      "A) 12",
      "B) 16",
      "C) 7",
      "D) 0"
    ],
    "correct": 1,
    "ans": "B) 16",
    "exp": "💡 सही उत्तर: B) 16। शीर्ष बिंदु: O(0,0) पर Z=0; A(4,0) पर Z=3(4)=12; B(0,4) पर Z=4(4)=16। अतः अधिकतम मान 16 है जो बिंदु (0,4) पर प्राप्त होता है।"
  },
  {
    "topic": "प्रायिकता (Probability)",
    "q": "एक सिक्के को 3 बार उछाला जाता है। ठीक 2 शीर्ष (Heads) आने की प्रायिकता क्या होगी?\n[English: A coin is tossed 3 times. What is the probability of getting exactly 2 heads?]",
    "options": [
      "A) 3/8",
      "B) 1/2",
      "C) 1/4",
      "D) 1/8"
    ],
    "correct": 0,
    "ans": "A) 3/8",
    "exp": "💡 सही उत्तर: A) 3/8। कुल परिणाम = 2³ = 8। ठीक 2 शीर्ष वाले अनुकूल परिणाम: {HHT, HTH, THH} = 3। प्रायिकता = अनुकूल / कुल = 3/8।"
  }
];

const CLASS12_ACCOUNTANCY_BANK = [
  {
    "topic": "साझेदारी फर्म का लेखांकन - आधारभूत सिद्धांत (Partnership Accounting - Fundamentals)",
    "q": "साझेदारी संलेख (Partnership Deed) के अभाव में साझेदारों के ऋण (Loan by Partner) पर किस दर से ब्याज देय होता है?\n[English: In the absence of a partnership deed, at what rate is interest payable on a partner's loan?]",
    "options": [
      "A) 6% वार्षिक / 6% per annum",
      "B) 10% वार्षिक / 10% per annum",
      "C) 12% वार्षिक / 12% per annum",
      "D) कोई ब्याज देय नहीं / No interest allowed"
    ],
    "correct": 0,
    "ans": "A) 6% वार्षिक / 6% per annum",
    "exp": "💡 सही उत्तर: A) 6% प्रति वर्ष। भारतीय साझेदारी अधिनियम 1932 की धारा 13(d) के अनुसार साझेदारी विलेख के अभाव में किसी साझेदार द्वारा फर्म को दिए गए ऋण पर 6% प्रति वर्ष की दर से ब्याज दिया जाता है।"
  },
  {
    "topic": "साझेदारी फर्म का पुनर्गठन (Reconstitution of Partnership - Goodwill)",
    "q": "ख्याति (Goodwill) किस प्रकार की संपत्ति मानी जाती है?\n[English: Goodwill is categorized under which type of asset?]",
    "options": [
      "A) अमूर्त किंतु वास्तविक संपत्ति / Intangible but Real Asset",
      "B) मूर्त संपत्ति / Tangible Asset",
      "C) कृत्रिम संपत्ति / Fictitious Asset",
      "D) चालू संपत्ति / Current Asset"
    ],
    "correct": 0,
    "ans": "A) अमूर्त किंतु वास्तविक संपत्ति / Intangible but Real Asset",
    "exp": "💡 सही उत्तर: A) अमूर्त किंतु वास्तविक संपत्ति (Intangible Asset)। ख्याति फर्म का नाम, प्रतिष्ठा और ग्राहकों के विश्वास का मौद्रिक मूल्य है जिसे देखा या छुआ नहीं जा सकता, किंतु इसका वास्तविक विक्रय मूल्य होता है।"
  },
  {
    "topic": "कंपनी लेखांकन - अंशों का निर्गमन (Share Capital - Forfeiture)",
    "q": "अंश हरण खाता (Share Forfeiture Account) के शेष को अंततः किस खाते में हस्तांतरित किया जाता है?\n[English: The balance of the Share Forfeiture Account on reissue is transferred to which account?]",
    "options": [
      "A) पूंजी संचय खाता / Capital Reserve Account",
      "B) सामान्य संचय खाता / General Reserve Account",
      "C) लाभ-हानि खाता / Profit & Loss Account",
      "D) अंश पूंजी खाता / Share Capital Account"
    ],
    "correct": 0,
    "ans": "A) पूंजी संचय खाता / Capital Reserve Account",
    "exp": "💡 सही उत्तर: A) पूंजी संचय खाता (Capital Reserve Account)। जब्त किए गए अंशों के पुनः निर्गमन के पश्चात अंश हरण खाते का शुद्ध लाभ पूंजीगत लाभ (Capital Profit) होता है, जिसे पूंजी संचय खाते में अंतरित करते हैं।"
  },
  {
    "topic": "कंपनी लेखांकन - ऋणपत्र (Debentures)",
    "q": "ऋणपत्रधारी (Debenture Holders) कंपनी के क्या कहलाते हैं?\n[English: Debenture holders are considered as what to the company?]",
    "options": [
      "A) कंपनी के लेनदार / Creditors of the Company",
      "B) कंपनी के स्वामी / Owners of the Company",
      "C) कंपनी के ग्राहक / Customers of the Company",
      "D) कंपनी के निदेशक / Directors of the Company"
    ],
    "correct": 0,
    "ans": "A) कंपनी के लेनदार / Creditors of the Company",
    "exp": "💡 सही उत्तर: A) लेनदार (Creditors)। ऋणपत्र एक ऋण स्वीकृति प्रपत्र है। ऋणपत्रधारी कंपनी को दीर्घकालिक ऋण देते हैं और उन्हें लाभ के बजाय निश्चित दर से ब्याज पाने का अधिकार होता है।"
  },
  {
    "topic": "वित्तीय विवरणों का विश्लेषण - रोकड़ प्रवाह विवरण (Cash Flow Statement)",
    "q": "लेखांकन मानक-3 (AS-3 संशोधित) के अनुसार रोकड़ प्रवाह विवरण में गतिविधियों को कितने वर्गों में बांटा जाता है?\n[English: According to AS-3 (revised), Cash Flow Statement activities are classified into how many categories?]",
    "options": [
      "A) 3 वर्ग (परिचालन, निवेश, वित्तीय) / 3 Categories (Operating, Investing, Financing)",
      "B) 2 वर्ग / 2 Categories",
      "C) 4 वर्ग / 4 Categories",
      "D) 5 वर्ग / 5 Categories"
    ],
    "correct": 0,
    "ans": "A) 3 वर्ग (परिचालन, निवेश, वित्तीय) / 3 Categories (Operating, Investing, Financing)",
    "exp": "💡 सही उत्तर: A) 3 वर्ग: (1) परिचालन गतिविधियां (Operating Activities), (2) निवेश गतिविधियां (Investing Activities), तथा (3) वित्तीय गतिविधियां (Financing Activities)।"
  },
  {
    "topic": "अनुपात विश्लेषण (Ratio Analysis - Liquidity)",
    "q": "आदर्श चालू अनुपात (Ideal Current Ratio) सामान्यतः क्या माना जाता है?\n[English: What is generally considered as the ideal Current Ratio?]",
    "options": [
      "A) 2 : 1",
      "B) 1 : 1",
      "C) 3 : 1",
      "D) 0.5 : 1"
    ],
    "correct": 0,
    "ans": "A) 2 : 1",
    "exp": "💡 सही उत्तर: A) 2 : 1। चालू अनुपात = चालू संपत्तियां / चालू दायित्व (Current Assets / Current Liabilities)। एक स्वस्थ व्यवसाय के लिए 2:1 का अनुपात आदर्श तरलता का मानक माना जाता है।"
  },
  {
    "topic": "साझेदार का प्रवेश (Admission of Partner - Sacrificing Ratio)",
    "q": "त्याग अनुपात (Sacrificing Ratio) की गणना का सही सूत्र क्या है?\n[English: What is the correct formula to calculate the Sacrificing Ratio?]",
    "options": [
      "A) पुराना अनुपात - नया अनुपात / Old Ratio - New Ratio",
      "B) नया अनुपात - पुराना अनुपात / New Ratio - Old Ratio",
      "C) पुराना अनुपात + नया अनुपात",
      "D) पुराना अनुपात × लाभ का हिस्सा"
    ],
    "correct": 0,
    "ans": "A) पुराना अनुपात - नया अनुपात / Old Ratio - New Ratio",
    "exp": "💡 सही उत्तर: A) त्याग अनुपात = पुराना अनुपात - नया अनुपात (Sacrificing Ratio = Old Ratio - New Ratio)। नए साझेदार के प्रवेश पर पुराने साझेदार अपने लाभ का हिस्सा नए साझेदार के पक्ष में त्यागते हैं।"
  },
  {
    "topic": "साझेदारी फर्म का विघटन (Dissolution of Partnership Firm - Realisation A/c)",
    "q": "फर्म के विघटन (Dissolution) के समय संपत्तियों के विक्रय एवं दायित्वों के भुगतान हेतु कौन सा खाता खोला जाता है?\n[English: Upon dissolution of a partnership firm, which account is prepared to realize assets and discharge liabilities?]",
    "options": [
      "A) वसूली खाता / Realisation Account",
      "B) पुनर्मूल्यांकन खाता / Revaluation Account",
      "C) लाभ-हानि नियोजन खाता / P&L Appropriation Account",
      "D) साझेदारों का चालू खाता / Partners' Current Account"
    ],
    "correct": 0,
    "ans": "A) वसूली खाता / Realisation Account",
    "exp": "💡 सही उत्तर: A) वसूली खाता (Realisation Account)। पुनर्मूल्यांकन खाता केवल फर्म के पुनर्गठन (प्रवेश, अवकाश ग्रहण) पर बनता है, जबकि पूर्ण विघटन पर संपत्तियों को बेचकर दायित्व चुकाने हेतु वसूली खाता बनाया जाता है।"
  },
  {
    "topic": "कंपनी लेखांकन - अंशों का अधिमूल्य पर निर्गमन (Securities Premium)",
    "q": "कंपनी अधिनियम 2013 की धारा 52(2) के अनुसार प्रतिभूति प्रव्याजि (Securities Premium) का उपयोग किस कार्य हेतु नहीं किया जा सकता?\n[English: Under Section 52(2) of Companies Act 2013, Securities Premium cannot be utilized for:]",
    "options": [
      "A) लाभांश वितरण के लिए / For payment of dividends",
      "B) पूर्णप्रदत्त बोनस अंश जारी करने हेतु / Issue of fully paid bonus shares",
      "C) प्रारंभिक व्ययों को अपलिखित करने हेतु / Writing off preliminary expenses",
      "D) स्वयं के अंशों की पुनः खरीद (Buy-back) हेतु / Buy-back of own securities"
    ],
    "correct": 0,
    "ans": "A) लाभांश वितरण के लिए / For payment of dividends",
    "exp": "💡 सही उत्तर: A) लाभांश वितरण हेतु। प्रतिभूति प्रीमियम एक पूंजीगत लाभ है जिसे नकद लाभांश वितरण में कभी प्रयोग नहीं किया जा सकता।"
  },
  {
    "topic": "अनुपात विश्लेषण (Ratio Analysis - Quick Ratio)",
    "q": "त्वरित अनुपात (Quick / Acid-Test Ratio) ज्ञात करते समय चालू संपत्तियों में से किसे घटाया जाता है?\n[English: While calculating Quick Ratio, which items are excluded from Current Assets?]",
    "options": [
      "A) स्टॉक (इन्वेंट्री) तथा पूर्वदत्त व्यय / Stock (Inventory) and Prepaid Expenses",
      "B) देनदार एवं प्राप्य बिल / Debtors and Bills Receivable",
      "C) बैंक में रोकड़ / Cash at Bank",
      "D) अल्पकालिक निवेश / Short-term Investments"
    ],
    "correct": 0,
    "ans": "A) स्टॉक (इन्वेंट्री) तथा पूर्वदत्त व्यय / Stock (Inventory) and Prepaid Expenses",
    "exp": "💡 सही उत्तर: A) त्वरित संपत्तियां = चालू संपत्तियां - (स्टॉक + पूर्वदत्त व्यय)। स्टॉक को तुरंत नकदी में बदलना कठिन होता है तथा पूर्वदत्त व्यय नकद में वापस नहीं मिलते।"
  },
  {
    "topic": "गैर-व्यापारिक संस्थाओं का लेखांकन (Not-for-Profit Organisations - NPO)",
    "q": "प्राप्ति एवं भुगतान खाता (Receipts and Payments Account) किस प्रकृति का खाता होता है?\n[English: Receipts and Payments Account is what nature of account?]",
    "options": [
      "A) वास्तविक खाता / Real Account (Cash nature)",
      "B) नाममात्र खाता / Nominal Account",
      "C) व्यक्तिगत खाता / Personal Account",
      "D) प्रतिनिधित्व व्यक्तिगत खाता"
    ],
    "correct": 0,
    "ans": "A) वास्तविक खाता / Real Account (Cash nature)",
    "exp": "💡 सही उत्तर: A) वास्तविक खाता (Real Account)। यह मूलतः रोकड़ बही (Cash Book) का सारांश होता है। आय-व्यय खाता (Income & Expenditure Account) नाममात्र खाता (Nominal Account) होता है।"
  },
  {
    "topic": "साझेदार का अवकाश ग्रहण (Retirement of Partner - Gaining Ratio)",
    "q": "साझेदार के अवकाश ग्रहण पर शेष साझेदारों का अधिलाभ अनुपात (Gaining Ratio) क्या होता है?\n[English: Upon retirement of a partner, the gaining ratio of continuing partners is calculated as:]",
    "options": [
      "A) नया अनुपात - पुराना अनुपात / New Ratio - Old Ratio",
      "B) पुराना अनुपात - नया अनुपात / Old Ratio - New Ratio",
      "C) पुराना अनुपात + नया अनुपात",
      "D) त्याग अनुपात के बराबर"
    ],
    "correct": 0,
    "ans": "A) नया अनुपात - पुराना अनुपात / New Ratio - Old Ratio",
    "exp": "💡 सही उत्तर: A) अधिलाभ अनुपात = नया अनुपात - पुराना अनुपात (Gaining Ratio = New Ratio - Old Ratio)। जाने वाले साझेदार के लाभ का हिस्सा शेष साझेदारों को मिलता है।"
  }
];

const CLASS12_BUSINESS_BANK = [
  {
    "topic": "प्रबंध के सिद्धांत (Principles of Management - Henry Fayol)",
    "q": "प्रबंध के 14 सिद्धांतों (14 Principles of Management) का प्रतिपादन किसने किया था?\n[English: Who propounded the famous 14 Principles of Management?]",
    "options": [
      "A) हेनरी फेयोल / Henri Fayol",
      "B) एफ. डब्ल्यू. टेलर / F.W. Taylor",
      "C) पीटर एफ. ड्रकर / Peter F. Drucker",
      "D) मैक्स वेबर / Max Weber"
    ],
    "correct": 0,
    "ans": "A) हेनरी फेयोल / Henri Fayol",
    "exp": "💡 सही उत्तर: A) हेनरी फेयोल। फेयोल को प्रशासनिक प्रबंध का जनक माना जाता है जिन्होंने 1916 में अपनी पुस्तक 'General and Industrial Management' में 14 सिद्धांत दिए।"
  },
  {
    "topic": "वैज्ञानिक प्रबंध (Scientific Management - F.W. Taylor)",
    "q": "वैज्ञानिक प्रबंध का जनक (Father of Scientific Management) किसे कहा जाता है?\n[English: Who is known as the 'Father of Scientific Management'?]",
    "options": [
      "A) एफ. डब्ल्यू. टेलर / F.W. Taylor",
      "B) हेनरी फेयोल / Henri Fayol",
      "C) एल्टन मेयो / Elton Mayo",
      "D) जॉर्ज आर. टेरी / George R. Terry"
    ],
    "correct": 0,
    "ans": "A) एफ. डब्ल्यू. टेलर / F.W. Taylor",
    "exp": "💡 सही उत्तर: A) एफ. डब्ल्यू. टेलर। टेलर ने समय अध्ययन, गति अध्ययन, थकान अध्ययन और विभेदात्मक मजदूरी प्रणाली के सिद्धांतों द्वारा कार्य कुशलता बढ़ाने पर बल दिया।"
  },
  {
    "topic": "प्रबंध के कार्य - नियोजन (Planning)",
    "q": "प्रबंध का प्राथमिक एवं आधारभूत कार्य (First and Primary Function of Management) कौन सा है?\n[English: Which is the primary and fundamental function of management?]",
    "options": [
      "A) नियोजन / Planning",
      "B) संगठन / Organizing",
      "C) निर्देशन / Directing",
      "D) नियंत्रण / Controlling"
    ],
    "correct": 0,
    "ans": "A) नियोजन / Planning",
    "exp": "💡 सही उत्तर: A) नियोजन (Planning)। प्रबंध प्रक्रिया का आरंभ नियोजन से होता है (क्या करना है, कैसे करना है, कब करना है और किसके द्वारा किया जाना है)।"
  },
  {
    "topic": "वित्तीय बाजार (Financial Markets - SEBI)",
    "q": "भारतीय प्रतिभूति एवं विनिमय बोर्ड (SEBI) की स्थापना किस वर्ष की गई थी?\n[English: In which year was the Securities and Exchange Board of India (SEBI) established?]",
    "options": [
      "A) 1988 (वैधानिक दर्जा 1992) / 1988 (Statutory status 1992)",
      "B) 1995",
      "C) 2000",
      "D) 1982"
    ],
    "correct": 0,
    "ans": "A) 1988 (वैधानिक दर्जा 1992) / 1988 (Statutory status 1992)",
    "exp": "💡 सही उत्तर: A) 1988। सेबी की स्थापना 12 अप्रैल 1988 को एक गैर-सांविधिक निकाय के रूप में हुई और 1992 में SEBI Act के तहत इसे वैधानिक अधिकार मिले।"
  },
  {
    "topic": "विपणन प्रबंध (Marketing Management - Marketing Mix)",
    "q": "ई. जेरोम मैकार्थी द्वारा प्रतिपादित विपणन मिश्रण (Marketing Mix) के 4P कौन से हैं?\n[English: What are the 4Ps of Marketing Mix propounded by E. Jerome McCarthy?]",
    "options": [
      "A) Product, Price, Place, Promotion (उत्पाद, मूल्य, स्थान, संवर्धन)",
      "B) People, Planet, Profit, Process",
      "C) Plan, Process, Package, People",
      "D) Production, Power, Policy, Payment"
    ],
    "correct": 0,
    "ans": "A) Product, Price, Place, Promotion (उत्पाद, मूल्य, स्थान, संवर्धन)",
    "exp": "💡 सही उत्तर: A) 4Ps: उत्पाद (Product), मूल्य (Price), स्थान/वितरण (Place), और संवर्धन (Promotion)।"
  },
  {
    "topic": "उपभोक्ता संरक्षण (Consumer Protection Act 2019)",
    "q": "उपभोक्ता संरक्षण अधिनियम 2019 के अंतर्गत जिला उपभोक्ता विवाद निवारण आयोग (District Commission) का क्षेत्राधिकार कितना है?\n[English: Under Consumer Protection Act 2019, what is the pecuniary jurisdiction of the District Commission?]",
    "options": [
      "A) 50 लाख रुपये तक (पहले 1 करोड़) / Up to Rs 50 Lakhs (revised rules)",
      "B) 10 करोड़ रुपये से अधिक / Above 10 Crores",
      "C) 5 करोड़ रुपये तक / Up to 5 Crores",
      "D) 20 लाख रुपये तक / Up to 20 Lakhs"
    ],
    "correct": 0,
    "ans": "A) 50 लाख रुपये तक (पहले 1 करोड़) / Up to Rs 50 Lakhs (revised rules)",
    "exp": "💡 सही उत्तर: A) 2021 के संशोधित नियमों के अनुसार जिला आयोग 50 लाख रुपये तक, राज्य आयोग 50 लाख से 2 करोड़ तक तथा राष्ट्रीय आयोग 2 करोड़ रुपये से अधिक के मामलों की सुनवाई करता है।"
  },
  {
    "topic": "निर्देशन - अभिप्रेरणा (Directing - Maslow's Need Hierarchy)",
    "q": "मास्लो के आवश्यकता पदानुक्रम सिद्धांत (Need Hierarchy Theory) में मानवीय आवश्यकताओं का सर्वोच्च स्तर क्या है?\n[English: In Maslow's Need Hierarchy Theory, what is the highest level of human needs?]",
    "options": [
      "A) आत्म-संतुष्टि / आत्म-प्राप्ति की आवश्यकता / Self-Actualization Needs",
      "B) सम्मान की आवश्यकता / Esteem Needs",
      "C) सुरक्षा की आवश्यकता / Safety Needs",
      "D) शारीरिक आवश्यकता / Physiological Needs"
    ],
    "correct": 0,
    "ans": "A) आत्म-संतुष्टि / आत्म-प्राप्ति की आवश्यकता / Self-Actualization Needs",
    "exp": "💡 सही उत्तर: A) आत्म-प्राप्ति की आवश्यकता (Self-Actualization)। अब्राहम मास्लो के 5 स्तर: (1) शारीरिक, (2) सुरक्षा, (3) सामाजिक/संबंध, (4) आत्म-सम्मान, (5) आत्म-प्राप्ति।"
  },
  {
    "topic": "नियंत्रण (Controlling - Exception Principle)",
    "q": "'अपवाद द्वारा प्रबंध' (Management by Exception - MBE) का मूल विचार क्या है?\n[English: What is the core philosophy of 'Management by Exception'?]",
    "options": [
      "A) केवल महत्वपूर्ण विचलनों (Significant Deviations) पर ही उच्च प्रबंधकों का ध्यान आकर्षित करना",
      "B) हर छोटी गलती पर कर्मचारी को दंडित करना",
      "C) किसी भी विचलन पर ध्यान न देना",
      "D) केवल उत्पादन की निगरानी करना"
    ],
    "correct": 0,
    "ans": "A) केवल महत्वपूर्ण विचलनों (Significant Deviations) पर ही उच्च प्रबंधकों का ध्यान आकर्षित करना",
    "exp": "💡 सही उत्तर: A) 'यदि आप सब कुछ नियंत्रित करने का प्रयास करेंगे तो आप कुछ भी नियंत्रित नहीं कर पाएंगे।' अतः केवल महत्वपूर्ण विचलनों को ही उच्च प्रबंधन के समक्ष लाना चाहिए।"
  },
  {
    "topic": "व्यावसायिक पर्यावरण (Business Environment - LPG Policy)",
    "q": "भारत में नई आर्थिक नीति (LPG सुधार: उदारीकरण, निजीकरण, वैश्वीकरण) किस वर्ष लागू की गई थी?\n[English: In which year was the New Economic Policy (LPG reforms) introduced in India?]",
    "options": [
      "A) जुलाई 1991 / July 1991",
      "B) जनवरी 1985 / January 1985",
      "C) मार्च 2000 / March 2000",
      "D) अगस्त 1995 / August 1995"
    ],
    "correct": 0,
    "ans": "A) जुलाई 1991 / July 1991",
    "exp": "💡 सही उत्तर: A) 1991। तत्कालीन प्रधानमंत्री पी. वी. नरसिम्हा राव एवं वित्त मंत्री डॉ. मनमोहन सिंह द्वारा नई आर्थिक नीति लागू की गई थी।"
  },
  {
    "topic": "प्रबंध के स्तर (Levels of Management)",
    "q": "मुख्य कार्यकारी अधिकारी (CEO) और बोर्ड ऑफ डायरेक्टर्स किस प्रबंध स्तर से संबंधित होते हैं?\n[English: The Chief Executive Officer (CEO) and Board of Directors belong to which level of management?]",
    "options": [
      "A) उच्च स्तरीय प्रबंध / Top-level Management",
      "B) मध्य स्तरीय प्रबंध / Middle-level Management",
      "C) परिचालन / निम्न स्तरीय प्रबंध / Operational / Supervisory level",
      "D) परामर्शक स्तर / Advisory level"
    ],
    "correct": 0,
    "ans": "A) उच्च स्तरीय प्रबंध / Top-level Management",
    "exp": "💡 सही उत्तर: A) उच्च स्तरीय प्रबंध। उच्च स्तर नीतियां, उद्देश्य और रणनीति तय करता है। विभागाध्यक्ष मध्य स्तर में तथा सुपरवाइजर/फोरमैन निम्न स्तर में आते हैं।"
  },
  {
    "topic": "वित्तीय प्रबंध (Financial Management - Trading on Equity)",
    "q": "समता पर व्यापार (Trading on Equity) का मुख्य उद्देश्य क्या होता है?\n[English: What is the primary objective of 'Trading on Equity'?]",
    "options": [
      "A) अंशधारकों की प्रति अंश आय (EPS) में वृद्धि करना / To increase Earnings Per Share (EPS)",
      "B) ऋण की लागत बढ़ाना / To increase cost of debt",
      "C) कर का भुगतान न करना / To avoid tax payment",
      "D) व्यवसाय को बंद करना / To close business"
    ],
    "correct": 0,
    "ans": "A) अंशधारकों की प्रति अंश आय (EPS) में वृद्धि करना / To increase Earnings Per Share (EPS)",
    "exp": "💡 सही उत्तर: A) अंशधारकों की प्रति अंश आय (EPS) बढ़ाना। जब कुल विनियोग पर प्रत्यय दर (ROI) ऋण की ब्याज दर से अधिक होती है, तो निश्चित लागत वाले ऋण का उपयोग कर समता अंशधारकों की आय बढ़ाई जाती है।"
  },
  {
    "topic": "संगठन (Organizing - Span of Management)",
    "q": "प्रबंध के विस्तार (Span of Management) से क्या आशय है?\n[English: What does 'Span of Management' refer to?]",
    "options": [
      "A) एक अधिकारी द्वारा प्रभावी रूप से नियंत्रित किए जा सकने वाले अधीनस्थों की संख्या / Number of subordinates effectively managed by a superior",
      "B) प्रबंधकों का कार्यकाल / Tenure of managers",
      "C) संगठन की कुल संपत्ति / Total assets of organization",
      "D) उत्पादन का भौगोलिक क्षेत्र / Geographical scope"
    ],
    "correct": 0,
    "ans": "A) एक अधिकारी द्वारा प्रभावी रूप से नियंत्रित किए जा सकने वाले अधीनस्थों की संख्या / Number of subordinates effectively managed by a superior",
    "exp": "💡 सही उत्तर: A) एक वरिष्ठ अधिकारी के अधीन कार्य करने वाले अधीनस्थों की वह संख्या जिनका वह कुशलतापूर्वक पर्यवेक्षण कर सके।"
  }
];

const CLASS12_ECONOMICS_BANK = [
  {
    "topic": "व्यष्टि अर्थशास्त्र - मांग का नियम (Microeconomics - Law of Demand)",
    "q": "सामान्य वस्तुओं (Normal Goods) के संदर्भ में मांग का नियम वस्तु की कीमत और उसकी मांग मात्रा के बीच कैसा संबंध दर्शाता है?\n[English: For normal goods, what type of relationship does the Law of Demand show between price and quantity demanded?]",
    "options": [
      "A) विपरीत या ऋणात्मक संबंध / Inverse or Negative Relationship",
      "B) सीधा या धनात्मक संबंध / Direct or Positive Relationship",
      "C) कोई संबंध नहीं / No relationship",
      "D) स्थिर संबंध / Constant relationship"
    ],
    "correct": 0,
    "ans": "A) विपरीत या ऋणात्मक संबंध / Inverse or Negative Relationship",
    "exp": "💡 सही उत्तर: A) विपरीत या ऋणात्मक संबंध। अन्य बातें समान रहने पर वस्तु की कीमत बढ़ने पर उसकी मांग घटती है और कीमत घटने पर मांग बढ़ती है। इसी कारण मांग वक्र का ढाल बाएं से दाएं नीचे की ओर (ऋणात्मक) होता है।"
  },
  {
    "topic": "व्यष्टि अर्थशास्त्र - मांग की लोच (Price Elasticity of Demand)",
    "q": "यदि किसी वस्तु की कीमत में 10% परिवर्तन होने पर उसकी मांग में ठीक 10% परिवर्तन होता है, तो मांग की लोच (Ed) क्या होगी?\n[English: If a 10% change in price causes an exact 10% change in quantity demanded, what is the elasticity of demand (Ed)?]",
    "options": [
      "A) इकाई के बराबर (Ed = 1) / Unitary Elastic",
      "B) पूर्णतया लोचदार (Ed = ∞) / Perfectly Elastic",
      "C) पूर्णतया बेलोचदार (Ed = 0) / Perfectly Inelastic",
      "D) अत्यधिक लोचदार (Ed > 1) / Highly Elastic"
    ],
    "correct": 0,
    "ans": "A) इकाई के बराबर (Ed = 1) / Unitary Elastic",
    "exp": "💡 सही उत्तर: A) इकाई लोचदार (Ed = 1)। मांग की कीमत लोच सूत्र = (% परिवर्तन मांग में) / (% परिवर्तन कीमत में) = 10% / 10% = 1।"
  },
  {
    "topic": "समष्टि अर्थशास्त्र - राष्ट्रीय आय (Macroeconomics - GDP & GNP)",
    "q": "सकल घरेलू उत्पाद (GDP) और सकल राष्ट्रीय उत्पाद (GNP) के बीच का शुद्ध अंतर क्या होता है?\n[English: What constitutes the net difference between Gross Domestic Product (GDP) and Gross National Product (GNP)?]",
    "options": [
      "A) विदेशों से प्राप्त शुद्ध साधन आय (NFIA) / Net Factor Income from Abroad",
      "B) मूल्यह्रास (घिसावट व्यय) / Depreciation",
      "C) शुद्ध अप्रत्यक्ष कर (NIT) / Net Indirect Taxes",
      "D) आर्थिक सहायता (सब्सिडी) / Subsidies"
    ],
    "correct": 0,
    "ans": "A) विदेशों से प्राप्त शुद्ध साधन आय (NFIA) / Net Factor Income from Abroad",
    "exp": "💡 सही उत्तर: A) NFIA (Net Factor Income from Abroad)। सूत्र: GNP = GDP + विदेशों से प्राप्त शुद्ध साधन आय (NFIA)।"
  },
  {
    "topic": "मुद्रा एवं बैंकिंग (Money and Banking - Central Bank)",
    "q": "भारत में ₹1 के नोट और सभी सिक्कों को जारी करने का वैधानिक अधिकार किसके पास है?\n[English: In India, who holds the statutory authority to issue ₹1 currency notes and all coins?]",
    "options": [
      "A) वित्त मंत्रालय (भारत सरकार) / Ministry of Finance (Govt. of India)",
      "B) भारतीय रिजर्व बैंक (RBI) / Reserve Bank of India",
      "C) स्टेट बैंक ऑफ इंडिया (SBI) / State Bank of India",
      "D) नीति आयोग / NITI Aayog"
    ],
    "correct": 0,
    "ans": "A) वित्त मंत्रालय (भारत सरकार) / Ministry of Finance (Govt. of India)",
    "exp": "💡 सही उत्तर: A) वित्त मंत्रालय (भारत सरकार)। ₹1 के नोट पर वित्त सचिव (Finance Secretary) के हस्ताक्षर होते हैं। ₹2 और उससे ऊपर के सभी नोट भारतीय रिजर्व बैंक (RBI) द्वारा जारी किए जाते हैं जिन पर RBI गवर्नर के हस्ताक्षर होते हैं।"
  },
  {
    "topic": "मुद्रा एवं बैंकिंग (Credit Control - Repo Rate)",
    "q": "वह ब्याज दर जिस पर केंद्रीय बैंक (RBI) व्यापारिक बैंकों को अल्पकालिक ऋण प्रदान करता है, क्या कहलाती है?\n[English: The interest rate at which the Central Bank (RBI) lends short-term money to commercial banks is called:]",
    "options": [
      "A) रेपो दर (Repo Rate)",
      "B) रिवर्स रेपो दर (Reverse Repo Rate)",
      "C) बैंक दर (Bank Rate)",
      "D) नकद आरक्षित अनुपात (CRR)"
    ],
    "correct": 0,
    "ans": "A) रेपो दर (Repo Rate)",
    "exp": "💡 सही उत्तर: A) रेपो दर (Repo Rate)। अल्पकालिक ऋण हेतु रेपो दर होती है। रिवर्स रेपो दर वह दर है जिस पर बैंक अपना अधिशेष धन RBI के पास जमा करते हैं।"
  },
  {
    "topic": "सरकारी बजट एवं अर्थव्यवस्था (Government Budget - Deficits)",
    "q": "राजकोषीय घाटा (Fiscal Deficit) का सही सूत्र क्या होता है?\n[English: What is the correct formula for Fiscal Deficit?]",
    "options": [
      "A) कुल व्यय - (कुल प्राप्तियां - उधार) / Total Expenditure - (Total Receipts excluding borrowings)",
      "B) राजस्व व्यय - राजस्व प्राप्तियां / Revenue Deficit",
      "C) राजकोषीय घाटा - ब्याज भुगतान / Primary Deficit",
      "D) कुल प्राप्तियां - कुल व्यय"
    ],
    "correct": 0,
    "ans": "A) कुल व्यय - (कुल प्राप्तियां - उधार) / Total Expenditure - (Total Receipts excluding borrowings)",
    "exp": "💡 सही उत्तर: A) राजकोषीय घाटा = कुल बजट व्यय - (राजस्व प्राप्तियां + गैर-ऋण पूंजीगत प्राप्तियां) = कुल उधार (Total Borrowings)। प्राथमिक घाटा = राजकोषीय घाटा - ब्याज भुगतान।"
  },
  {
    "topic": "खुली अर्थव्यवस्था - भुगतान संतुलन (Balance of Payments - BoP)",
    "q": "भुगतान संतुलन के चालू खाते (Current Account) में किसे शामिल नहीं किया जाता?\n[English: Which of the following is NOT included in the Current Account of Balance of Payments?]",
    "options": [
      "A) विदेशी प्रत्यक्ष निवेश (FDI) / Foreign Direct Investment",
      "B) वस्तुओं का दृश्य व्यापार (निर्यात-आयात) / Merchandise Trade",
      "C) सेवाओं का अदृश्य व्यापार (सॉफ्टवेयर, पर्यटन) / Invisibles / Services",
      "D) एकपक्षीय अंतरण (उपहार व प्रेषण) / Unilateral Transfers"
    ],
    "correct": 0,
    "ans": "A) विदेशी प्रत्यक्ष निवेश (FDI) / Foreign Direct Investment",
    "exp": "💡 सही उत्तर: A) FDI पूंजी खाते (Capital Account) का भाग है, चालू खाते का नहीं। चालू खाते में दृश्य व्यापार (वस्तुएं), अदृश्य व्यापार (सेवाएं) तथा एकपक्षीय अंतरण शामिल होते हैं।"
  },
  {
    "topic": "व्यष्टि अर्थशास्त्र - अवसर लागत (Opportunity Cost)",
    "q": "अर्थशास्त्र में 'अवसर लागत' (Opportunity Cost) की सर्वमान्य परिभाषा क्या है?\n[English: In economics, what is the standard definition of 'Opportunity Cost'?]",
    "options": [
      "A) अगले सर्वश्रेष्ठ त्यागे गए विकल्प की लागत / The cost of the next best alternative forgone",
      "B) वस्तु के उत्पादन में लगा कुल नकद व्यय / Total cash spent in production",
      "C) भविष्य में होने वाला संभावित लाभ / Future expected profit",
      "D) शून्य लागत / Zero cost"
    ],
    "correct": 0,
    "ans": "A) अगले सर्वश्रेष्ठ त्यागे गए विकल्प की लागत / The cost of the next best alternative forgone",
    "exp": "💡 सही उत्तर: A) किसी संसाधन का एक कार्य में प्रयोग करने पर उसके दूसरे सर्वश्रेष्ठ वैकल्पिक उपयोग से प्राप्त होने वाले मूल्य का त्याग अवसर लागत कहलाता है।"
  },
  {
    "topic": "समष्टि अर्थशास्त्र - उपभोग फलन (Marginal Propensity to Consume - MPC)",
    "q": "सीमांत उपभोग प्रवृत्ति (MPC) और सीमांत बचत प्रवृत्ति (MPS) का योग सदैव कितना होता है?\n[English: What is the sum of Marginal Propensity to Consume (MPC) and Marginal Propensity to Save (MPS)?]",
    "options": [
      "A) 1 के बराबर (MPC + MPS = 1)",
      "B) 0 के बराबर (0)",
      "C) अनंत (∞)",
      "D) 100 के बराबर"
    ],
    "correct": 0,
    "ans": "A) 1 के बराबर (MPC + MPS = 1)",
    "exp": "💡 सही उत्तर: A) 1। क्योंकि आय में परिवर्तन (ΔY) या तो उपभोग (ΔC) में जाता है या बचत (ΔS) में। ΔY = ΔC + ΔS। दोनों पक्षों में ΔY से भाग देने पर ΔC/ΔY + ΔS/ΔY = MPC + MPS = 1 प्राप्त होता है।"
  },
  {
    "topic": "भारतीय अर्थव्यवस्था का विकास (Indian Economic Development - NITI Aayog)",
    "q": "योजना आयोग (Planning Commission) के स्थान पर नीति आयोग (NITI Aayog) का गठन कब किया गया था?\n[English: In place of Planning Commission, when was NITI Aayog established?]",
    "options": [
      "A) 1 जनवरी 2015 / 1st January 2015",
      "B) 15 अगस्त 2014 / 15th August 2014",
      "C) 1 अप्रैल 2017 / 1st April 2017",
      "D) 26 जनवरी 2016 / 26th January 2016"
    ],
    "correct": 0,
    "ans": "A) 1 जनवरी 2015 / 1st January 2015",
    "exp": "💡 सही उत्तर: A) 1 जनवरी 2015। National Institution for Transforming India (नीति आयोग) की स्थापना हुई जिसके पदेन अध्यक्ष भारत के प्रधानमंत्री होते हैं।"
  },
  {
    "topic": "बाजार के रूप (Market Forms - Perfect Competition)",
    "q": "पूर्ण प्रतियोगिता (Perfect Competition) बाजार की प्रमुख विशेषता क्या होती है?\n[English: What is a defining characteristic of a Perfect Competition market?]",
    "options": [
      "A) समरूप वस्तुएं तथा फर्म का कीमत स्वीकारक होना / Homogeneous products and price-taker firms",
      "B) विभेदित उत्पाद तथा एकाधिकार / Differentiated products",
      "C) बाजार में केवल एक विक्रेता होना / Single seller",
      "D) प्रवेश पर कठोर कानूनी प्रतिबंध / Strict entry barriers"
    ],
    "correct": 0,
    "ans": "A) समरूप वस्तुएं तथा फर्म का कीमत स्वीकारक होना / Homogeneous products and price-taker firms",
    "exp": "💡 सही उत्तर: A) पूर्ण प्रतियोगिता में क्रेता और विक्रेता अत्यधिक संख्या में होते हैं, उत्पाद 100% समरूप होते हैं तथा उद्योग कीमत निर्धारक एवं व्यक्तिगत फर्म कीमत स्वीकारक (Price Taker) होती है।"
  },
  {
    "topic": "समष्टि अर्थशास्त्र - गुणक (Investment Multiplier)",
    "q": "यदि सीमांत उपभोग प्रवृत्ति (MPC) 0.8 हो, तो निवेश गुणक (Investment Multiplier, k) का मान क्या होगा?\n[English: If the Marginal Propensity to Consume (MPC) is 0.8, what is the value of investment multiplier (k)?]",
    "options": [
      "A) 5",
      "B) 4",
      "C) 2",
      "D) 10"
    ],
    "correct": 0,
    "ans": "A) 5",
    "exp": "💡 सही उत्तर: A) 5। गुणक सूत्र: k = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5।"
  }
];

const CLASS12_HISTORY_BANK = [
  {
    "topic": "ईंटें, मनके तथा अस्थियां - हड़प्पा सभ्यता (Bricks, Beads and Bones - Harappan Civilisation)",
    "q": "हड़प्पा सभ्यता का विशाल स्नानागार (Great Bath) किस प्रमुख पुरातात्विक स्थल से प्राप्त हुआ है?\n[English: The Great Bath of the Harappan Civilisation was excavated at which prominent site?]",
    "options": [
      "A) मोहनजोदड़ो / Mohenjo-daro",
      "B) हड़प्पा / Harappa",
      "C) लोथल / Lothal",
      "D) कालीबंगा / Kalibangan"
    ],
    "correct": 0,
    "ans": "A) मोहनजोदड़ो / Mohenjo-daro",
    "exp": "💡 सही उत्तर: A) मोहनजोदड़ो (Mohenjo-daro)। मोहनजोदड़ो के दुर्ग (Citadel) क्षेत्र में विशाल स्नानागार तथा विशाल अन्नागार प्राप्त हुए हैं। लोथल में गोदीवाड़ा (Dockyard) तथा कालीबंगा में जुते हुए खेत के साक्ष्य मिले।"
  },
  {
    "topic": "राजा, किसान और नगर - आरंभिक राज्य और अर्थव्यवस्थाएं (Kings, Farmers and Towns)",
    "q": "मौर्य साम्राज्य के संस्थापक चंद्रगुप्त मौर्य के प्रधानमंत्री चाणक्य (कौटिल्य) द्वारा रचित प्रसिद्ध ग्रंथ कौन सा है?\n[English: Which famous political treatise was authored by Chanakya (Kautilya), prime minister of Chandragupta Maurya?]",
    "options": [
      "A) अर्थशास्त्र / Arthashastra",
      "B) इंडिका (मेगस्थनीज) / Indica",
      "C) मुद्राराक्षस / Mudrarakshasa",
      "D) राजतरंगिणी / Rajatarangini"
    ],
    "correct": 0,
    "ans": "A) अर्थशास्त्र / Arthashastra",
    "exp": "💡 सही उत्तर: A) अर्थशास्त्र (Arthashastra)। कौटिल्य का अर्थशास्त्र प्राचीन भारतीय राजनीति, शासनकला और कूटनीति का प्रमाणिक ग्रंथ है। इंडिका मेगस्थनीज द्वारा लिखी गई थी।"
  },
  {
    "topic": "बंधुत्व, जाति तथा वर्ग - आरंभिक समाज (Kinship, Caste and Class)",
    "q": "महाभारत का समालोचनात्मक संस्करण (Critical Edition of Mahabharata) तैयार करने का महत्वाकांक्षी कार्य किसके नेतृत्व में प्रारंभ हुआ?\n[English: Under whose leadership was the critical edition of Mahabharata prepared?]",
    "options": [
      "A) वी. एस. सुकथांकर / V.S. Sukthankar (1919)",
      "B) मैक्स मूलर / Max Muller",
      "C) अलेक्जेंडर कनिंघम / Alexander Cunningham",
      "D) जॉन मार्शल / John Marshall"
    ],
    "correct": 0,
    "ans": "A) वी. एस. सुकथांकर / V.S. Sukthankar (1919)",
    "exp": "💡 सही उत्तर: A) वी. एस. सुकथांकर (1919)। भंडारकर ओरिएंटल रिसर्च इंस्टीट्यूट, पुणे के विद्वानों ने 47 वर्षों के शोध के बाद 13,000 पृष्ठों में महाभारत का समालोचनात्मक संस्करण पूर्ण किया।"
  },
  {
    "topic": "विचारक, विश्वास और इमारतें - बौद्ध एवं जैन धर्म (Thinkers, Beliefs and Buildings)",
    "q": "मध्य प्रदेश में स्थित सांची के स्तूप (Sanchi Stupa) के संरक्षण में भोपाल की किस बेगम का सर्वाधिक योगदान रहा?\n[English: Which Begum of Bhopal played the most instrumental role in preserving the Sanchi Stupa?]",
    "options": [
      "A) शाहजहां बेगम तथा सुल्तान जहां बेगम / Shahjahan Begum & Sultan Jahan Begum",
      "B) रजिया सुल्तान / Razia Sultan",
      "C) नूरजहां / Nur Jahan",
      "D) चांद बीबी / Chand Bibi"
    ],
    "correct": 0,
    "ans": "A) शाहजहां बेगम तथा सुल्तान जहां बेगम / Shahjahan Begum & Sultan Jahan Begum",
    "exp": "💡 सही उत्तर: A) शाहजहां बेगम एवं सुल्तान जहां बेगम। भोपाल की बेगमों ने सांची स्तूप के संरक्षण, संग्रहालय निर्माण तथा जॉन मार्शल के शोध कार्यों हेतु महत्वपूर्ण वित्तीय अनुदान दिया।"
  },
  {
    "topic": "यात्रियों के नजरिए - समाज के बारे में उनकी समझ (Through the Eyes of Travellers)",
    "q": "मोरक्को का प्रसिद्ध यात्री इब्न बतूता किसके शासनकाल में भारत आया था?\n[English: The famous Moroccan traveller Ibn Battuta visited India during the reign of which Delhi Sultan?]",
    "options": [
      "A) मुहम्मद बिन तुगलक / Muhammad bin Tughlaq",
      "B) अलाउद्दीन खिलजी / Alauddin Khalji",
      "C) बलबन / Balban",
      "D) फिरोज शाह तुगलक / Firoz Shah Tughlaq"
    ],
    "correct": 0,
    "ans": "A) मुहम्मद बिन तुगलक (1333 ई.)। मुहम्मद बिन तुगलक ने इब्न बतूता को दिल्ली का काजी नियुक्त किया था। इब्न बतूता ने अपना अरबी यात्रा वृत्तांत 'रिहला' (Rihla) लिखा।"
  },
  {
    "topic": "भक्ति-सूफी परंपराएं (Bhakti-Sufi Traditions)",
    "q": "अजमेर में स्थित विश्व प्रसिद्ध दरगाह किस सूफी संत की है?\n[English: The world-famous Dargah located at Ajmer belongs to which revered Sufi saint?]",
    "options": [
      "A) ख्वाजा मुईनुद्दीन चिश्ती / Khwaja Moinuddin Chishti (गरीब नवाज)",
      "B) हजरत निजामुद्दीन औलिया / Hazrat Nizamuddin Auliya",
      "C) शेख सलीम चिश्ती / Sheikh Salim Chishti",
      "D) बाबा फरीद / Baba Farid"
    ],
    "correct": 0,
    "ans": "A) ख्वाजा मुईनुद्दीन चिश्ती / Khwaja Moinuddin Chishti (गरीब नवाज)",
    "exp": "💡 सही उत्तर: A) ख्वाजा मुईनुद्दीन चिश्ती (ख्वाजा गरीब नवाज)। चिश्ती सिलसिले के महान संत थे। हजरत निजामुद्दीन की दरगाह दिल्ली में तथा शेख सलीम चिश्ती की फतेहपुर सीकरी में है।"
  },
  {
    "topic": "एक साम्राज्य की राजधानी: विजयनगर (An Imperial Capital: Vijayanagara)",
    "q": "विजयनगर साम्राज्य की स्थापना 1336 ई. में किन दो भाइयों ने की थी?\n[English: The Vijayanagara Empire was founded in 1336 AD by which two brothers?]",
    "options": [
      "A) हरिहर और बुक्का / Harihara and Bukka",
      "B) कृष्णदेव राय और अच्युत राय / Krishnadeva Raya and Achyuta Raya",
      "C) देवराय प्रथम और देवराय द्वितीय",
      "D) अल्लारम और तिरुमल"
    ],
    "correct": 0,
    "ans": "A) हरिहर और बुक्का / Harihara and Bukka",
    "exp": "💡 सही उत्तर: A) हरिहर प्रथम और बुक्का राय प्रथम ने संगम वंश की नींव रखी। विजयनगर की राजधानी हम्पी तुंगभद्रा नदी के तट पर स्थित थी। इसके महानतम शासक कृष्णदेव राय थे।"
  },
  {
    "topic": "किसान, जमींदार और राज्य - मुगल समाज (Peasants, Zamindars and the State)",
    "q": "मुगल सम्राट अकबर के नवरत्नों में से एक अबुल फजल द्वारा रचित 'आइन-ए-अकबरी' किस बड़े ग्रंथ का भाग है?\n[English: 'Ain-i-Akbari', authored by Abul Fazl, forms a part of which monumental historical text?]",
    "options": [
      "A) अकबरनामा (तीसरा खंड) / Akbar Nama (Third Volume)",
      "B) बाबरनामा / Baburnama",
      "C) हुमायूंनामा / Humayun-nama",
      "D) तुजुक-ए-जहांगीरी / Tuzuk-i-Jahangiri"
    ],
    "correct": 0,
    "ans": "A) अकबरनामा (तीसरा खंड) / Akbar Nama (Third Volume)",
    "exp": "💡 सही उत्तर: A) अकबरनामा का तीसरा दफ्तर (खंड) 'आइन-ए-अकबरी' है। इसमें अकबर के प्रशासन, सेना, राजस्व और साम्राज्य के सांख्यिकीय आंकड़ों का विशद विवरण है।"
  },
  {
    "topic": "उपनिवेशवाद और देहात (Colonialism and the Countryside)",
    "q": "1793 में बंगाल में इस्तमरारी बंदोबस्त (स्थायी बंदोबस्त / Permanent Settlement) किस गवर्नर-जनरल ने लागू किया था?\n[English: In 1793, which Governor-General introduced the Permanent Settlement in Bengal?]",
    "options": [
      "A) लॉर्ड कॉर्नवालिस / Lord Cornwallis",
      "B) लॉर्ड वारेन हेस्टिंग्स / Lord Warren Hastings",
      "C) लॉर्ड वेलेस्ली / Lord Wellesley",
      "D) लॉर्ड विलियम बेंटिंक / Lord William Bentinck"
    ],
    "correct": 0,
    "ans": "A) लॉर्ड कॉर्नवालिस / Lord Cornwallis",
    "exp": "💡 सही उत्तर: A) लॉर्ड कॉर्नवालिस। स्थायी बंदोबस्त में जमींदारों को भूमि का स्वामी मानकर लगान की दर हमेशा के लिए तय कर दी गई थी (10/11 भाग कंपनी का, 1/11 भाग जमींदार का)।"
  },
  {
    "topic": "विद्रोही और राज - 1857 का आंदोलन (Rebels and the Raj - 1857 Revolt)",
    "q": "1857 के प्रथम स्वतंत्रता संग्राम में बिहार (जगदीशपुर) से विद्रोह का सफल नेतृत्व किस वीर योद्धा ने किया था?\n[English: Who led the 1857 revolt in Bihar (Jagdishpur)?]",
    "options": [
      "A) बाबू कुंवर सिंह / Babu Kunwar Singh",
      "B) नाना साहेब / Nana Saheb",
      "C) तात्या टोपे / Tatya Tope",
      "D) मौलवी लियाकत अली / Maulvi Liaquat Ali"
    ],
    "correct": 0,
    "ans": "A) बाबू कुंवर सिंह / Babu Kunwar Singh",
    "exp": "💡 सही उत्तर: A) बाबू कुंवर सिंह। जगदीशपुर (भोजपुर/आरा, बिहार) के जमींदार 80 वर्षीय वीर कुंवर सिंह ने अंग्रेजों के दांत खट्टे किए। नाना साहेब ने कानपुर में तथा तात्या टोपे ने ग्वालियर में नेतृत्व किया।"
  },
  {
    "topic": "महात्मा गांधी और राष्ट्रीय आंदोलन (Mahatma Gandhi and National Movement)",
    "q": "महात्मा गांधी ने ऐतिहासिक नमक सत्याग्रह (दांडी मार्च) किस तिथि को साबरमती आश्रम से प्रारंभ किया था?\n[English: On which date did Mahatma Gandhi commence the historic Dandi March from Sabarmati Ashram?]",
    "options": [
      "A) 12 मार्च 1930 / 12th March 1930",
      "B) 6 अप्रैल 1930 / 6th April 1930",
      "C) 1 अगस्त 1920 / 1st August 1920",
      "D) 9 अगस्त 1942 / 9th August 1942"
    ],
    "correct": 0,
    "ans": "A) 12 मार्च 1930 / 12th March 1930",
    "exp": "💡 सही उत्तर: A) 12 मार्च 1930। गांधी जी ने 78 अनुयायियों के साथ 240 मील की पदयात्रा शुरू की और 6 अप्रैल 1930 को दांडी तट पर नमक बनाकर सविनय अवज्ञा आंदोलन का शंखनाद किया।"
  },
  {
    "topic": "संविधान का निर्माण - एक नए युग की शुरुआत (Framing the Constitution)",
    "q": "भारतीय संविधान सभा की प्रारूप समिति (Drafting Committee) के अध्यक्ष कौन थे?\n[English: Who was the Chairman of the Drafting Committee of the Indian Constituent Assembly?]",
    "options": [
      "A) डॉ. भीमराव रामजी आंबेडकर / Dr. B.R. Ambedkar",
      "B) डॉ. राजेंद्र प्रसाद / Dr. Rajendra Prasad",
      "C) पंडित जवाहरलाल नेहरू / Pt. Jawaharlal Nehru",
      "D) सरदार वल्लभभाई पटेल / Sardar Vallabhbhai Patel"
    ],
    "correct": 0,
    "ans": "A) डॉ. भीमराव रामजी आंबेडकर / Dr. B.R. Ambedkar",
    "exp": "💡 सही उत्तर: A) डॉ. बी. आर. आंबेडकर। 29 अगस्त 1947 को 7 सदस्यीय प्रारूप समिति गठित हुई जिसके अध्यक्ष बाबा साहेब आंबेडकर थे। डॉ. राजेंद्र प्रसाद संविधान सभा के स्थायी अध्यक्ष थे।"
  }
];

const CLASS12_POLITY_BANK = [
  {
    "topic": "दो ध्रुवीयता का अंत (The End of Bipolarity - Cold War Era)",
    "q": "सोवियत संघ (USSR) का औपचारिक विघटन किस वर्ष हुआ था?\n[English: In which year did the formal disintegration of the Soviet Union (USSR) occur?]",
    "options": [
      "A) दिसंबर 1991 / December 1991",
      "B) नवंबर 1989 / November 1989 (बर्लिन दीवार)",
      "C) मार्च 1995 / March 1995",
      "D) जनवरी 1985 / January 1985"
    ],
    "correct": 0,
    "ans": "A) दिसंबर 1991 / December 1991",
    "exp": "💡 सही उत्तर: A) दिसंबर 1991। मिखाइल गोर्बाचेव के इस्तीफे के बाद सोवियत संघ के 15 गणराज्यों में विभाजन के साथ शीत युद्ध समाप्त हुआ और रूस उसका उत्तराधिकारी बना।"
  },
  {
    "topic": "सत्ता के समकालीन केंद्र (Alternative Centres of Power - ASEAN)",
    "q": "दक्षिण-पूर्वी एशियाई राष्ट्र संघ (ASEAN) की स्थापना 1967 में किस घोषणा-पत्र द्वारा की गई थी?\n[English: In 1967, the Association of Southeast Asian Nations (ASEAN) was established through which declaration?]",
    "options": [
      "A) बैंकॉक घोषणा-पत्र / Bangkok Declaration",
      "B) जकार्ता घोषणा-पत्र / Jakarta Declaration",
      "C) सिंगापुर समझौता / Singapore Accord",
      "D) मनीला संधि / Manila Treaty"
    ],
    "correct": 0,
    "ans": "A) बैंकॉक घोषणा-पत्र / Bangkok Declaration",
    "exp": "💡 सही उत्तर: A) बैंकॉक घोषणा-पत्र (8 अगस्त 1967)। 5 संस्थापक सदस्य: इंडोनेशिया, मलेशिया, फिलीपींस, सिंगापुर और थाईलैंड। आसियान का मुख्यालय जकार्ता (इंडोनेशिया) में है।"
  },
  {
    "topic": "अंतर्राष्ट्रीय संगठन - संयुक्त राष्ट्र संघ (International Organisations - UN)",
    "q": "संयुक्त राष्ट्र सुरक्षा परिषद (UNSC) में कुल कितने स्थायी सदस्य (Permanent Members) हैं जिनके पास वीटो (Veto) शक्ति है?\n[English: How many permanent members with Veto power are there in the United Nations Security Council (UNSC)?]",
    "options": [
      "A) 5 देश (USA, रूस, ब्रिटेन, फ्रांस, चीन) / 5 Permanent Members (P5)",
      "B) 10 देश / 10 Members",
      "C) 15 देश / 15 Members",
      "D) 7 देश / 7 Members"
    ],
    "correct": 0,
    "ans": "A) 5 देश (USA, रूस, ब्रिटेन, फ्रांस, चीन) / 5 Permanent Members (P5)",
    "exp": "💡 सही उत्तर: A) 5 स्थायी सदस्य (P-5): अमेरिका, रूस, ब्रिटेन, फ्रांस और चीन। इनके अतिरिक्त 10 अस्थायी सदस्य 2 वर्ष के कार्यकाल हेतु चुने जाते हैं (कुल 15 सदस्य)।"
  },
  {
    "topic": "राष्ट्र-निर्माण की चुनौतियां (Challenges of Nation-Building - Integration of States)",
    "q": "स्वतंत्रता के समय 565 से अधिक देशी रियासतों के भारत में ऐतिहासिक एकीकरण का श्रेय किसे जाता है?\n[English: Who is credited with the historic integration of over 565 princely states into the Indian Union?]",
    "options": [
      "A) सरदार वल्लभभाई पटेल (लौह पुरुष) / Sardar Vallabhbhai Patel",
      "B) चक्रवर्ती राजगोपालाचारी / C. Rajagopalachari",
      "C) मौलाना अबुल कलाम आजाद / Maulana Abul Kalam Azad",
      "D) गोविंद वल्लभ पंत / Govind Ballabh Pant"
    ],
    "correct": 0,
    "ans": "A) सरदार वल्लभभाई पटेल (लौह पुरुष) / Sardar Vallabhbhai Patel",
    "exp": "💡 सही उत्तर: A) सरदार वल्लभभाई पटेल। भारत के प्रथम उप-प्रधानमंत्री एवं गृह मंत्री सरदार पटेल तथा सचिव वी. पी. मेनन ने 'इंस्ट्रूमेंट ऑफ एक्सेशन' पर हस्ताक्षर कराकर अखंड भारत का निर्माण किया।"
  },
  {
    "topic": "नियोजित विकास की राजनीति (Politics of Planned Development)",
    "q": "भारत में प्रथम पंचवर्षीय योजना (1951-1956) मुख्य रूप से किस क्षेत्र के विकास पर केंद्रित थी?\n[English: India's First Five-Year Plan (1951-1956) primarily focused on the development of which sector?]",
    "options": [
      "A) कृषि एवं सिंचाई (भाखड़ा-नांगल आदि) / Agriculture and Irrigation",
      "B) भारी उद्योग एवं विनिर्माण / Heavy Industries",
      "C) सूचना प्रौद्योगिकी एवं सेवा क्षेत्र / Information Technology",
      "D) अंतरिक्ष एवं परमाणु ऊर्जा / Space & Atomic Energy"
    ],
    "correct": 0,
    "ans": "A) कृषि एवं सिंचाई (भाखड़ा-नांगल आदि) / Agriculture and Irrigation",
    "exp": "💡 सही उत्तर: A) कृषि और सिंचाई (हैरोड-डोमर मॉडल आधारित)। द्वितीय पंचवर्षीय योजना (1956-61, पी. सी. महालनोबिस मॉडल) भारी उद्योगों पर केंद्रित थी।"
  },
  {
    "topic": "भारत के विदेश संबंध (India's External Relations - Panchsheel)",
    "q": "भारत और चीन के मध्य ऐतिहासिक 'पंचशील समझौता' किस वर्ष हस्ताक्षरित हुआ था?\n[English: In which year was the historic 'Panchsheel Agreement' signed between India and China?]",
    "options": [
      "A) 29 अप्रैल 1954 / 29th April 1954",
      "B) 1962 (भारत-चीन युद्ध) / 1962",
      "C) 1947",
      "D) 1971"
    ],
    "correct": 0,
    "ans": "A) 29 अप्रैल 1954 / 29th April 1954",
    "exp": "💡 सही उत्तर: A) 1954। प्रधानमंत्री जवाहरलाल नेहरू और चीन के प्रीमियर चाउ एन-लाई के बीच शांतिपूर्ण सह-अस्तित्व के 5 सिद्धांतों (पंचशील) पर समझौता हुआ था।"
  },
  {
    "topic": "लोकतांत्रिक व्यवस्था का संकट (Crisis of Democratic Order - Emergency)",
    "q": "भारत में 25 जून 1975 को किस अनुच्छेद के तहत आंतरिक अशांति के आधार पर राष्ट्रीय आपातकाल घोषित हुआ था?\n[English: Under which Article was the National Emergency declared in India on 25th June 1975?]",
    "options": [
      "A) अनुच्छेद 352 / Article 352",
      "B) अनुच्छेद 356 (राष्ट्रपति शासन) / Article 356",
      "C) अनुच्छेद 360 (वित्तीय आपात) / Article 360",
      "D) अनुच्छेद 370 / Article 370"
    ],
    "correct": 0,
    "ans": "A) अनुच्छेद 352 / Article 352",
    "exp": "💡 सही उत्तर: A) अनुच्छेद 352। राष्ट्रपति फखरुद्दीन अली अहमद ने तत्कालीन प्रधानमंत्री इंदिरा गांधी की सलाह पर आंतरिक अशांति के आधार पर राष्ट्रीय आपातकाल लगाया (जो 21 मार्च 1977 तक चला)।"
  },
  {
    "topic": "क्षेत्रीय आकांक्षाएं (Regional Aspirations)",
    "q": "1985 में पंजाब समझौते (राजीव-लौंगोवाल समझौता) पर किन दो नेताओं ने हस्ताक्षर किए थे?\n[English: In 1985, the Punjab Accord was signed between Prime Minister Rajiv Gandhi and which leader?]",
    "options": [
      "A) संत हरचंद सिंह लौंगोवाल / Sant Harchand Singh Longowal",
      "B) प्रकाश सिंह बादल / Parkash Singh Badal",
      "C) जरनैल सिंह भिंडरावाले / Jarnail Singh Bhindranwale",
      "D) ज्ञानी जैल सिंह / Giani Zail Singh"
    ],
    "correct": 0,
    "ans": "A) संत हरचंद सिंह लौंगोवाल / Sant Harchand Singh Longowal",
    "exp": "💡 सही उत्तर: A) संत हरचंद सिंह लौंगोवाल (अकाली दल अध्यक्ष)। जुलाई 1985 में पंजाब में शांति बहाली हेतु राजीव-लौंगोवाल समझौता हुआ।"
  },
  {
    "topic": "भारतीय राजनीति: नए बदलाव (Recent Developments in Indian Politics - Mandal Commission)",
    "q": "अन्य पिछड़ा वर्ग (OBC) को सरकारी नौकरियों में 27% आरक्षण की सिफारिश करने वाले मंडल आयोग के अध्यक्ष कौन थे?\n[English: Who was the Chairman of the Mandal Commission that recommended 27% reservation for OBCs?]",
    "options": [
      "A) बी. पी. मंडल (बिंदेश्वरी प्रसाद मंडल) / B.P. Mandal",
      "B) काका कालेलकर / Kaka Kalelkar (प्रथम पिछड़ा आयोग)",
      "C) वी. पी. सिंह / V.P. Singh",
      "D) जगजीवन राम / Jagjivan Ram"
    ],
    "correct": 0,
    "ans": "A) बी. पी. मंडल (बिंदेश्वरी प्रसाद मंडल) / B.P. Mandal",
    "exp": "💡 सही उत्तर: A) बी. पी. मंडल (1979 में गठित)। अगस्त 1990 में प्रधानमंत्री वी. पी. सिंह की राष्ट्रीय मोर्चा सरकार ने मंडल आयोग की 27% OBC आरक्षण सिफारिश को लागू किया।"
  },
  {
    "topic": "समकालीन विश्व में सुरक्षा (Security in the Contemporary World)",
    "q": "परमाणु अप्रसार संधि (NPT) किस वर्ष अस्तित्व में आई थी जिस पर भारत ने भेदभावपूर्ण मानकर हस्ताक्षर नहीं किए?\n[English: In which year did the Non-Proliferation Treaty (NPT) open for signature?]",
    "options": [
      "A) 1968 / Year 1968",
      "B) 1974 (पोखरण-1)",
      "C) 1998 (पोखरण-2)",
      "D) 1950"
    ],
    "correct": 0,
    "ans": "A) 1968 / Year 1968",
    "exp": "💡 सही उत्तर: A) 1968 (प्रभावी 1970)। भारत ने इसे भेदभावपूर्ण माना क्योंकि यह केवल 5 देशों (P-5) को परमाणु शक्ति संपन्न मानती थी और शेष देशों पर प्रतिबंध लगाती थी।"
  },
  {
    "topic": "पर्यावरण और प्राकृतिक संसाधन (Environment and Natural Resources - Kyoto Protocol)",
    "q": "ग्रीनहाउस गैसों के उत्सर्जन को कम करने के लिए क्योटो प्रोटोकॉल (Kyoto Protocol) किस वर्ष स्वीकार किया गया?\n[English: In which year was the Kyoto Protocol adopted to reduce greenhouse gas emissions?]",
    "options": [
      "A) 1997 (क्योटो, जापान) / 1997",
      "B) 1992 (रियो पृथ्वी सम्मेलन)",
      "C) 2015 (पेरिस समझौता)",
      "D) 1972 (स्टॉकहोम सम्मेलन)"
    ],
    "correct": 0,
    "ans": "A) 1997 (क्योटो, जापान) / 1997",
    "exp": "💡 सही उत्तर: A) 1997 (लागू 2005)। UNFCCC के अंतर्गत औद्योगिक देशों पर कार्बन डाइऑक्साइड, मीथेन आदि ग्रीनहाउस गैसों के उत्सर्जन में कटौती के कानूनी बाध्यकारी लक्ष्य तय किए गए।"
  },
  {
    "topic": "वैश्वीकरण (Globalisation)",
    "q": "वैश्वीकरण (Globalisation) का मूलभूत अर्थ क्या है?\n[English: What is the fundamental essence of Globalisation?]",
    "options": [
      "A) विचारों, पूंजी, वस्तुओं और लोगों का सीमाओं के पार निर्बाध प्रवाह / Free flow of ideas, capital, goods and people across borders",
      "B) केवल एक देश के भीतर व्यापार",
      "C) सभी देशों में एक ही मुद्रा लागू करना",
      "D) विदेशी यात्राओं पर पूर्ण प्रतिबंध"
    ],
    "correct": 0,
    "ans": "A) विचारों, पूंजी, वस्तुओं और लोगों का सीमाओं के पार निर्बाध प्रवाह / Free flow of ideas, capital, goods and people across borders",
    "exp": "💡 सही उत्तर: A) वैश्विक अंतर्संबंधों का विस्तार जिसमें सूचना, प्रौद्योगिकी, संस्कृति, वस्तुओं और मानव पूंजी का अंतर्राष्ट्रीय स्तर पर प्रवाह होता है।"
  }
];

const CLASS12_GEOGRAPHY_BANK = [
  {
    "topic": "मानव भूगोल: प्रकृति एवं विषय क्षेत्र (Human Geography: Nature and Scope)",
    "q": "'मानव भूगोल मानव समाजों और धरातल के बीच संबंधों का संश्लेषित अध्ययन है' - यह परिभाषा किसने दी?\n[English: 'Human Geography is the synthetic study of relationships between human societies and Earth's surface' - Defined by:]",
    "options": [
      "A) फ्रेडरिक रैटजेल / Friedrich Ratzel",
      "B) एलेन सी. सेम्पल / Ellen C. Semple",
      "C) पॉल विडाल डी ला ब्लाश / Paul Vidal de la Blache",
      "D) ग्रिफिथ टेलर / Griffith Taylor"
    ],
    "correct": 0,
    "ans": "A) फ्रेडरिक रैटजेल / Friedrich Ratzel",
    "exp": "💡 सही उत्तर: A) फ्रेडरिक रैटजेल (आधुनिक मानव भूगोल के जनक)। उनकी पुस्तक 'एंथ्रोपोजियोग्राफी' थी। ग्रिफिथ टेलर ने नवनिश्चयवाद (रुको और जाओ निश्चयवाद) दिया।"
  },
  {
    "topic": "विश्व जनसंख्या: वितरण, घनत्व और वृद्धि (World Population: Distribution & Density)",
    "q": "जनांकिकीय संक्रमण सिद्धांत (Demographic Transition Theory) की प्रथम अवस्था की मुख्य विशेषता क्या होती है?\n[English: What is the primary characteristic of the first stage of Demographic Transition Theory?]",
    "options": [
      "A) उच्च जन्म दर एवं उच्च मृत्यु दर (धीमी जनसंख्या वृद्धि) / High birth rate and high death rate",
      "B) निम्न जन्म दर एवं निम्न मृत्यु दर / Low birth rate and low death rate",
      "C) तीव्र जनसंख्या विस्फोट / Rapid population explosion",
      "D) शून्य जन्म दर / Zero birth rate"
    ],
    "correct": 0,
    "ans": "A) उच्च जन्म दर एवं उच्च मृत्यु दर (धीमी जनसंख्या वृद्धि) / High birth rate and high death rate",
    "exp": "💡 सही उत्तर: A) उच्च जन्म दर और उच्च मृत्यु दर। महामारियों और भोजन की अनिश्चितता के कारण मृत्यु दर ऊंची रहती थी। द्वितीय अवस्था में स्वास्थ्य सुधार से मृत्यु दर घटती है और जनसंख्या तीव्र गति से बढ़ती है।"
  },
  {
    "topic": "मानव विकास (Human Development - HDI)",
    "q": "मानव विकास सूचकांक (Human Development Index - HDI) की अवधारणा का प्रतिपादन किसने किया था?\n[English: Who conceptualized the Human Development Index (HDI) under UNDP in 1990?]",
    "options": [
      "A) डॉ. महबूब-उल-हक एवं प्रो. अमर्त्य सेन / Dr. Mahbub-ul-Haq & Prof. Amartya Sen",
      "B) एडम स्मिथ / Adam Smith",
      "C) थॉमस माल्थस / Thomas Malthus",
      "D) डेविड रिकार्डो / David Ricardo"
    ],
    "correct": 0,
    "ans": "A) डॉ. महबूब-उल-हक एवं प्रो. अमर्त्य सेन / Dr. Mahbub-ul-Haq & Prof. Amartya Sen",
    "exp": "💡 सही उत्तर: A) पाकिस्तानी अर्थशास्त्री डॉ. महबूब-उल-हक ने 1990 में UNDP के लिए HDI विकसित किया। इसमें तीन आयाम शामिल हैं: स्वास्थ्य (जीवन प्रत्याशा), शिक्षा (साक्षरता) तथा संसाधन पहुंच (प्रति व्यक्ति आय)।"
  },
  {
    "topic": "प्राथमिक क्रियाएं (Primary Activities - Agriculture)",
    "q": "भूमध्यसागरीय कृषि (Mediterranean Agriculture) किस प्रकार की फसलों के उत्पादन के लिए विश्व प्रसिद्ध है?\n[English: Mediterranean agriculture is internationally acclaimed for the commercial cultivation of:]",
    "options": [
      "A) खट्टे रसदार फल (अंगूर, जैतून, संतरा) / Citrus fruits and Viticulture (Grapes)",
      "B) चाय एवं कहवा / Tea and Coffee",
      "C) गेहूं एवं मक्का / Wheat and Maize",
      "D) चावल एवं जूट / Rice and Jute"
    ],
    "correct": 0,
    "ans": "A) खट्टे रसदार फल (अंगूर, जैतून, संतरा) / Citrus fruits and Viticulture (Grapes)",
    "exp": "💡 सही उत्तर: A) खट्टे रसदार फल और अंगूर की खेती (द्राक्षाकृषि/Viticulture)। भूमध्यसागरीय जलवायु में सर्दियों में वर्षा होती है, जिससे उच्च कोटि की शराब (वाइन) का निर्माण होता है।"
  },
  {
    "topic": "द्वितीयक क्रियाएं (Secondary Activities - Industries)",
    "q": "कच्चे माल के भार ह्रास (Weight-losing raw material) वाले उद्योगों को अल्फ्रेड वेबर के अनुसार कहाँ स्थापित किया जाना चाहिए?\n[English: According to Alfred Weber, weight-losing raw material industries should ideally be located:]",
    "options": [
      "A) कच्चे माल के स्रोत के निकट / Near the source of raw materials",
      "B) सीधे उपभोक्ता बाजार में / Directly at the consumer market",
      "C) बंदरगाहों के निकट / Near seaports",
      "D) श्रमिक बस्तियों में / In labor colonies"
    ],
    "correct": 0,
    "ans": "A) कच्चे माल के स्रोत के निकट / Near the source of raw materials",
    "exp": "💡 सही उत्तर: A) कच्चे माल के स्रोत के समीप। जैसे चीनी उद्योग (गन्ना) और लौह-इस्पात उद्योग (लौह अयस्क और कोयला) में उत्पादन प्रक्रिया में भार घटता है, अतः परिवहन लागत बचाने हेतु इन्हें स्रोत के पास लगाते हैं।"
  },
  {
    "topic": "तृतीयक और चतुर्थ क्रियाकलाप (Tertiary and Quaternary Activities)",
    "q": "अनुसंधान, सूचना विकास, सॉफ्टवेयर निर्माण और उच्च स्तरीय परामर्श किस क्रियाकलाप श्रेणी में आते हैं?\n[English: Research, IT software development, and specialized consultancy fall under which economic sector?]",
    "options": [
      "A) चतुर्थक एवं पंचमक क्रियाकलाप / Quaternary and Quinary Activities",
      "B) प्राथमिक क्रियाकलाप / Primary Activities",
      "C) द्वितीयक क्रियाकलाप / Secondary Activities",
      "D) केवल असंगठित मजदूरी"
    ],
    "correct": 0,
    "ans": "A) चतुर्थक एवं पंचमक क्रियाकलाप / Quaternary and Quinary Activities",
    "exp": "💡 सही उत्तर: A) चतुर्थक क्रियाकलाप ज्ञान-आधारित होते हैं (सूचना उत्पादन, विश्लेषण)। पंचमक क्रियाकलाप में शीर्ष नीति निर्माता एवं वैज्ञानिक आते हैं। इन्हें 'गोल्ड कॉलर' कहा जाता है।"
  },
  {
    "topic": "परिवहन एवं संचार (Transport and Communication - Canals)",
    "q": "स्वेज नहर (Suez Canal) किन दो प्रमुख जल-राशियों (सागरों) को आपस में जोड़ती है?\n[English: The Suez Canal connects which two major water bodies?]",
    "options": [
      "A) भूमध्य सागर को लाल सागर से / Mediterranean Sea with Red Sea",
      "B) अटलांटिक महासागर को प्रशांत महासागर से (पनामा नहर) / Atlantic with Pacific",
      "C) बाल्टिक सागर को उत्तरी सागर से / Baltic Sea with North Sea (Kiel Canal)",
      "D) काला सागर को कैस्पियन सागर से / Black Sea with Caspian"
    ],
    "correct": 0,
    "ans": "A) भूमध्य सागर को लाल सागर से / Mediterranean Sea with Red Sea",
    "exp": "💡 सही उत्तर: A) भूमध्य सागर और लाल सागर (1869 में निर्मित)। यह यूरोप और एशिया के मध्य 7,000 किमी से अधिक समुद्री दूरी घटाती है। पनामा नहर अटलांटिक और प्रशांत को जोड़ती है।"
  },
  {
    "topic": "भारत: जनसंख्या वितरण एवं घनत्व (India: Population Distribution & Density)",
    "q": "2011 की जनगणना के अनुसार भारत के किस राज्य का जनसंख्या घनत्व सर्वाधिक (1106 व्यक्ति/वर्ग किमी) है?\n[English: As per Census 2011, which Indian state records the highest population density (1,106 persons/sq km)?]",
    "options": [
      "A) बिहार / Bihar (1,106 per sq km)",
      "B) पश्चिम बंगाल / West Bengal (1,028)",
      "C) उत्तर प्रदेश / Uttar Pradesh (829)",
      "D) केरल / Kerala (860)"
    ],
    "correct": 0,
    "ans": "A) बिहार / Bihar (1,106 per sq km)",
    "exp": "💡 सही उत्तर: A) बिहार (1106 व्यक्ति/वर्ग किमी)। पश्चिम बंगाल दूसरे स्थान पर (1028) है। सबसे कम जनसंख्या घनत्व अरुणाचल प्रदेश (17 व्यक्ति/वर्ग किमी) का है।"
  },
  {
    "topic": "भारत: जल संसाधन (India: Water Resources)",
    "q": "भारत की 'राष्ट्रीय जल नीति' (National Water Policy) सर्वप्रथम किस वर्ष घोषित की गई थी?\n[English: In which year was India's National Water Policy first formulated?]",
    "options": [
      "A) 1987 (संशोधित 2002 एवं 2012) / Year 1987",
      "B) 1950",
      "C) 2000",
      "D) 2014"
    ],
    "correct": 0,
    "ans": "A) 1987 (संशोधित 2002 एवं 2012) / Year 1987",
    "exp": "💡 सही उत्तर: A) 1987। राष्ट्रीय जल नीति में पेयजल को सर्वोच्च प्राथमिकता दी गई, उसके पश्चात सिंचाई, जलविद्युत और औद्योगिक उपयोग को स्थान दिया गया।"
  },
  {
    "topic": "भारत: खनिज तथा ऊर्जा संसाधन (India: Mineral and Energy Resources)",
    "q": "भारत का सबसे बड़ा और प्रमुख पेट्रोलियम उत्पादक अपतटीय क्षेत्र (Offshore Oil Field) कौन सा है?\n[English: Which is India's largest and most productive offshore petroleum oilfield?]",
    "options": [
      "A) मुंबई हाई / Mumbai High (1974)",
      "B) डिगबोई (असम) / Digboi (Oldest in India)",
      "C) अंकलेश्वर (गुजरात) / Ankleshwar",
      "D) कृष्णा-गोदावरी बेसिन / KG Basin"
    ],
    "correct": 0,
    "ans": "A) मुंबई हाई / Mumbai High (1974)",
    "exp": "💡 सही उत्तर: A) मुंबई हाई (अरब सागर में मुंबई तट से 176 किमी दूर)। डिगबोई (असम) भारत का सबसे पुराना तेल क्षेत्र है जहाँ 1901 में पहली रिफाइनरी लगी थी।"
  },
  {
    "topic": "सतत पोषणीय विकास (Sustainable Development - Brundtland Report)",
    "q": "'सतत पोषणीय विकास' (Sustainable Development) की अवधारणा को सर्वप्रथम किस ऐतिहासिक रिपोर्ट में परिभाषित किया गया था?\n[English: The concept of Sustainable Development was first formally defined in which landmark report?]",
    "options": [
      "A) ब्रुंटलैंड रिपोर्ट: 'अवर कॉमन फ्यूचर' (1987) / Brundtland Report: 'Our Common Future'",
      "B) क्लब ऑफ रोम: 'लिमिट्स टू ग्रोथ' (1972)",
      "C) क्योटो प्रोटोकॉल (1997)",
      "D) मॉन्ट्रियल प्रोटोकॉल (1987)"
    ],
    "correct": 0,
    "ans": "A) ब्रुंटलैंड रिपोर्ट: 'अवर कॉमन फ्यूचर' (1987) / Brundtland Report: 'Our Common Future'",
    "exp": "💡 सही उत्तर: A) ब्रुंटलैंड आयोग रिपोर्ट (1987)। परिभाषा: 'ऐसा विकास जो वर्तमान पीढ़ी की आवश्यकताओं को पूरा करता है बिना भावी पीढ़ियों की अपनी जरूरतों को पूरा करने की क्षमता से समझौता किए।'"
  },
  {
    "topic": "भौगोलिक परिप्रेक्ष्य में चयनित मुद्दे (Geographical Perspective on Selected Issues)",
    "q": "वायु प्रदूषण के कारण होने वाली 'अम्लीय वर्षा' (Acid Rain) के लिए कौन सी दो गैसें मुख्य रूप से उत्तरदायी हैं?\n[English: Which two gases are primarily responsible for atmospheric Acid Rain?]",
    "options": [
      "A) सल्फर डाइऑक्साइड (SO₂) एवं नाइट्रोजन ऑक्साइड (NOx) / SO₂ and NOx",
      "B) कार्बन मोनोऑक्साइड एवं मीथेन / CO and CH₄",
      "C) क्लोरोफ्लोरोकार्बन (CFC) एवं हीलियम",
      "D) ऑक्सीजन एवं हाइड्रोजन"
    ],
    "correct": 0,
    "ans": "A) सल्फर डाइऑक्साइड (SO₂) एवं नाइट्रोजन ऑक्साइड (NOx) / SO₂ and NOx",
    "exp": "💡 सही उत्तर: A) SO₂ और NOx। ये गैसें वायुमंडल में जलवाष्प के साथ मिलकर सल्फ्यूरिक अम्ल (H₂SO₄) और नाइट्रिक अम्ल (HNO₃) बनाती हैं जिससे वर्षा जल का pH मान 5.6 से कम हो जाता है।"
  }
];

if (typeof window !== 'undefined') {
  window.CLASS12_PHYSICS_BANK = CLASS12_PHYSICS_BANK;
  window.CLASS12_CHEMISTRY_BANK = CLASS12_CHEMISTRY_BANK;
  window.CLASS12_BIOLOGY_BANK = CLASS12_BIOLOGY_BANK;
  window.CLASS12_MATH_BANK = CLASS12_MATH_BANK;
  window.CLASS12_ACCOUNTANCY_BANK = CLASS12_ACCOUNTANCY_BANK;
  window.CLASS12_BUSINESS_BANK = CLASS12_BUSINESS_BANK;
  window.CLASS12_ECONOMICS_BANK = CLASS12_ECONOMICS_BANK;
  window.CLASS12_HISTORY_BANK = CLASS12_HISTORY_BANK;
  window.CLASS12_POLITY_BANK = CLASS12_POLITY_BANK;
  window.CLASS12_GEOGRAPHY_BANK = CLASS12_GEOGRAPHY_BANK;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLASS12_PHYSICS_BANK,
    CLASS12_CHEMISTRY_BANK,
    CLASS12_BIOLOGY_BANK,
    CLASS12_MATH_BANK,
    CLASS12_ACCOUNTANCY_BANK,
    CLASS12_BUSINESS_BANK,
    CLASS12_ECONOMICS_BANK,
    CLASS12_HISTORY_BANK,
    CLASS12_POLITY_BANK,
    CLASS12_GEOGRAPHY_BANK
  };
}

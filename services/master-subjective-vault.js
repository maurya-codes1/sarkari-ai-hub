// services/master-subjective-vault.js
// 2026 Master Subjective Solutions Vault for State Boards & Competitive Descriptive Exams
// Provides 100% authentic, textbook-grade model answers (2-Mark, 3-Mark & 5-Mark)
// Includes precise definitions, balanced equations, step-by-step proofs, and +2-4 lines of presentation & examiner distinction tips.

const SUBJECTIVE_SOLUTIONS_REGISTRY = {
  math: {
    short: [
      {
        topic: "अपरिमेय संख्या उपपत्ति (Proof of Irrationality)",
        q_hi: "सिद्ध कीजिए कि √5 एक अपरिमेय संख्या (Irrational Number) है।",
        q_en: "Prove that √5 is an irrational number.",
        a_hi: `आदर्श उत्तर (2/3 अंक पूर्ण स्टेप मार्किंग):
माना कि √5 एक परिमेय संख्या है।
अतः √5 = a/b, जहाँ a और b सह-अभाज्य (Co-prime) पूर्णांक हैं तथा b ≠ 0।
दोनों पक्षों का वर्ग करने पर:
5 = a²/b²  ⟹  a² = 5b²  ... (समीकरण 1)
चूँकि 5, a² को विभाजित करता है, अतः 5, a को भी विभाजित करेगा (प्रमेय 1.3)।
माना a = 5c (जहाँ c कोई पूर्णांक है)।
a का मान समीकरण 1 में रखने पर:
(5c)² = 5b²  ⟹  25c² = 5b²  ⟹  b² = 5c²
चूँकि 5, b² को विभाजित करता है, अतः 5, b को भी विभाजित करेगा।
इस प्रकार a और b का कम से कम एक उभयनिष्ठ गुणनखंड 5 है।
किंतु यह हमारी इस परिकल्पना का खंडन करता है कि a और b सह-अभाज्य हैं।
अतः हमारी कल्पना त्रुटिपूर्ण थी। √5 एक अपरिमेय संख्या है। [इति सिद्धम्]

★ टॉपर प्रस्तुति निर्देश (+2 लाइन अंकन लाभ):
1. सह-अभाज्य पूर्णांक (Co-prime integers, b ≠ 0) लिखना अनिवार्य है।
2. अंतिम निष्कर्ष को हमेशा बॉक्स में बंद करें। इससे परीक्षक बिना संकोच पूरे 3/3 अंक देता है।`,
        a_en: `Model Solution (2/3 Marks Step-by-Step Blueprint):
Let us assume, to the contrary, that √5 is rational.
Then √5 = a/b, where a and b are co-prime integers and b ≠ 0.
Squaring both sides:
5 = a²/b²  ⟹  a² = 5b²  ... (Equation 1)
Therefore, 5 divides a². By Theorem, 5 also divides a.
Let a = 5c for some integer c.
Substituting in Equation 1:
(5c)² = 5b²  ⟹  25c² = 5b²  ⟹  b² = 5c²
This means 5 divides b², so 5 divides b.
Therefore, a and b have at least 5 as a common factor.
This contradicts the fact that a and b are co-prime.
Hence, our assumption is false. √5 is an irrational number. [Hence Proved]

★ Examiner Scoring Note (+2 Lines Impact):
Explicit mention of 'co-prime integers' and 'contradiction' secures full marks without any step deductions.`
      },
      {
        topic: "यूक्लिड विभाजन एल्गोरिद्म (Euclid's Division Algorithm)",
        q_hi: "यूक्लिड विभाजन एल्गोरिद्म का प्रयोग करके 135 और 225 का महत्तम समापवर्तक (HCF) ज्ञात कीजिए।",
        q_en: "Use Euclid's Division Algorithm to find the HCF of 135 and 225.",
        a_hi: `आदर्श उत्तर (2 अंक पूर्ण हल):
यूक्लिड विभाजन प्रमेयिका: a = bq + r (जहाँ 0 ≤ r < b)
यहाँ 225 > 135 है।
चरण 1: 225 को 135 से भाग देने पर:
225 = 135 × 1 + 90  (यहाँ शेषफल r = 90 ≠ 0)
चरण 2: भाजक 135 और शेषफल 90 पर एल्गोरिद्म लगाने पर:
135 = 90 × 1 + 45  (यहाँ शेषफल r = 45 ≠ 0)
चरण 3: भाजक 90 और शेषफल 45 पर पुनः लगाने पर:
90 = 45 × 2 + 0  (यहाँ शेषफल r = 0 प्राप्त हुआ)
चूँकि इस चरण में शेषफल 0 हो गया है तथा अंतिम भाजक 45 है।
अतः HCF(135, 225) = 45।

★ परीक्षक अंकन सूत्र:
सूत्र a = bq + r का उल्लेख (0.5 अंक), चरणबद्ध गणना (1 अंक) और अंतिम भाजक को HCF घोषित करना (0.5 अंक)। कुल 2/2 अंक।`,
        a_en: `Model Solution (2 Marks Step-by-Step):
According to Euclid's Division Lemma: a = bq + r, where 0 ≤ r < b.
Since 225 > 135:
Step 1: 225 = 135 × 1 + 90  (Remainder r = 90 ≠ 0)
Step 2: 135 = 90 × 1 + 45   (Remainder r = 45 ≠ 0)
Step 3: 90 = 45 × 2 + 0    (Remainder r = 0)
Since the remainder has become zero and the divisor at this stage is 45:
Therefore, HCF(135, 225) = 45.

★ Presentation Tip: Always write the general formula in the opening step to establish mathematical rigor.`
      },
      {
        topic: "द्विघात समीकरण का विविक्तकर (Discriminant & Nature of Roots)",
        q_hi: "द्विघात समीकरण 2x² - 4x + 3 = 0 का विविक्तकर (Discriminant D) ज्ञात कीजिए और मूलों की प्रकृति बताइए।",
        q_en: "Find the discriminant of quadratic equation 2x² - 4x + 3 = 0 and determine the nature of its roots.",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण हल):
दिए गए द्विघात समीकरण की मानक रूप ax² + bx + c = 0 से तुलना करने पर:
a = 2, b = -4, c = 3
विविक्तकर सूत्र: D = b² - 4ac
D = (-4)² - 4(2)(3)
D = 16 - 24 = -8
चूँकि D < 0 (विविक्तकर ऋणात्मक है), अतः:
दिए गए समीकरण का कोई वास्तविक मूल नहीं है (मूल काल्पनिक/अवास्तविक होंगे)।

★ बोर्ड परीक्षा विशिष्ट नियम:
1. D > 0 ⟹ दो भिन्न वास्तविक मूल।
2. D = 0 ⟹ दो बराबर वास्तविक मूल (-b/2a)।
3. D < 0 ⟹ कोई वास्तविक मूल नहीं। इन तीनों शर्तों को याद रखें।`,
        a_en: `Model Solution (2 Marks):
Comparing with standard form ax² + bx + c = 0:
a = 2, b = -4, c = 3
Discriminant Formula: D = b² - 4ac
D = (-4)² - 4(2)(3) = 16 - 24 = -8
Since D < 0 (Discriminant is negative):
The given quadratic equation has NO REAL ROOTS (roots are non-real complex numbers).

★ Examiner Tip: Explicitly stating the condition 'D < 0 implies no real roots' secures the full marks.`
      },
      {
        topic: "समांतर श्रेढ़ी का n-वां पद (Arithmetic Progression)",
        q_hi: "A.P.: 2, 7, 12, ... का 10वाँ पद ज्ञात कीजिए।",
        q_en: "Find the 10th term of the A.P.: 2, 7, 12, ...",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण हल):
दी गई A.P. में:
प्रथम पद (a) = 2
सार्व अंतर (d) = 7 - 2 = 5
पदों की संख्या (n) = 10
सूत्र: aₙ = a + (n - 1)d
मान रखने पर:
a₁₀ = 2 + (10 - 1) × 5
a₁₀ = 2 + 9 × 5
a₁₀ = 2 + 45 = 47
उत्तर: इस समांतर श्रेढ़ी का 10वाँ पद 47 है।

★ टॉपर प्रस्तुति टिप:
a, d, n का मान पहले स्पष्ट पंक्ति में लिखें। सूत्र को रेखांकित करें। उत्तर: a₁₀ = 47 को बॉक्स करें।`,
        a_en: `Model Solution (2 Marks):
In the given A.P.:
First term (a) = 2
Common difference (d) = 7 - 2 = 5
Number of terms (n) = 10
Formula: aₙ = a + (n - 1)d
Substituting the values:
a₁₀ = 2 + (10 - 1) × 5 = 2 + 45 = 47
Answer: The 10th term of this A.P. is 47.`
      },
      {
        topic: "निर्देशांक ज्यामिति - विभाजन सूत्र (Section Formula)",
        q_hi: "बिंदुओं (4, -3) और (8, 5) को जोड़ने वाले रेखाखंड को 3:1 के अनुपात में अंतःविभाजित करने वाले बिंदु के निर्देशांक ज्ञात कीजिए।",
        q_en: "Find the coordinates of the point which divides the line joining (4, -3) and (8, 5) in the ratio 3:1 internally.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण हल):
मान लिया कि विभाजन बिंदु P(x, y) है।
दिए गए बिंदु: A(x₁, y₁) = (4, -3) और B(x₂, y₂) = (8, 5)
अनुपात: m₁:m₂ = 3:1
विभाजन सूत्र (Section Formula):
x = (m₁x₂ + m₂x₁) / (m₁ + m₂)
x = (3×8 + 1×4) / (3 + 1) = (24 + 4) / 4 = 28 / 4 = 7

y = (m₁y₂ + m₂y₁) / (m₁ + m₂)
y = (3×5 + 1×(-3)) / (3 + 1) = (15 - 3) / 4 = 12 / 4 = 3

अतः अभीष्ट बिंदु के निर्देशांक P(7, 3) हैं।

★ परीक्षक अंकन टिप्पणी:
सूत्र लिखने पर 1 अंक तथा x व y के सही मान की गणना पर 1 अंक निर्धारित है।`,
        a_en: `Model Solution (2/3 Marks):
Let the required point be P(x, y).
Given: A(x₁, y₁) = (4, -3), B(x₂, y₂) = (8, 5), and ratio m₁:m₂ = 3:1.
By Section Formula:
x = (m₁x₂ + m₂x₁) / (m₁ + m₂) = (3(8) + 1(4)) / (3 + 1) = 28 / 4 = 7
y = (m₁y₂ + m₂y₁) / (m₁ + m₂) = (3(5) + 1(-3)) / (3 + 1) = 12 / 4 = 3
Therefore, the coordinates of the dividing point are P(7, 3).`
      },
      {
        topic: "त्रिकोणमितीय सर्वसमिका सत्यापन (Trigonometric Identity)",
        q_hi: "सिद्ध कीजिए: cos A / (1 + sin A) + (1 + sin A) / cos A = 2 sec A",
        q_en: "Prove that: cos A / (1 + sin A) + (1 + sin A) / cos A = 2 sec A",
        a_hi: `आदर्श उत्तर (3 अंक सम्पूर्ण हल):
L.H.S. = cos A / (1 + sin A) + (1 + sin A) / cos A
लघुत्तम समापवर्त्य (LCM) लेने पर:
= [cos²A + (1 + sin A)²] / [cos A (1 + sin A)]
(1 + sin A)² का प्रसार करने पर:
= [cos²A + 1 + 2 sin A + sin²A] / [cos A (1 + sin A)]
चूँकि sin²A + cos²A = 1 होता है:
= [(sin²A + cos²A) + 1 + 2 sin A] / [cos A (1 + sin A)]
= [1 + 1 + 2 sin A] / [cos A (1 + sin A)]
= [2 + 2 sin A] / [cos A (1 + sin A)]
अंश से 2 उभयनिष्ठ लेने पर:
= 2(1 + sin A) / [cos A (1 + sin A)]
= 2 / cos A = 2 × (1 / cos A) = 2 sec A = R.H.S.
[L.H.S. = R.H.S. इति सिद्धम्]

★ टॉपर नियम: प्रयुक्त सर्वसमिका (sin²A + cos²A = 1 तथा 1/cos A = sec A) को दाईं ओर ब्रैकेट में अवश्य लिखें।`,
        a_en: `Model Solution (3 Marks):
L.H.S. = cos A / (1 + sin A) + (1 + sin A) / cos A
Taking LCM:
= [cos²A + (1 + sin A)²] / [cos A (1 + sin A)]
Expanding numerator:
= [cos²A + 1 + 2 sin A + sin²A] / [cos A (1 + sin A)]
Using sin²A + cos²A = 1:
= [1 + 1 + 2 sin A] / [cos A (1 + sin A)] = [2 + 2 sin A] / [cos A (1 + sin A)]
Factoring 2:
= 2(1 + sin A) / [cos A (1 + sin A)] = 2 / cos A = 2 sec A = R.H.S. [Hence Proved]`
      }
    ],
    long: [
      {
        topic: "थेल्स प्रमेय (आधारभूत समानुपातिकता प्रमेय - Basic Proportionality Theorem / BPT)",
        q_hi: "थेल्स प्रमेय (BPT) का कथन लिखिए एवं इसे ज्यामितीय विधि से सिद्ध कीजिए।",
        q_en: "State and prove Thales Theorem (Basic Proportionality Theorem - BPT).",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण स्टेप मार्किंग):
कथन (Statement):
यदि किसी त्रिभुज की एक भुजा के समांतर अन्य दो भुजाओं को भिन्न-भिन्न बिंदुओं पर प्रतिच्छेद करने के लिए एक रेखा खींची जाए, तो ये अन्य दो भुजाएं एक ही अनुपात में विभाजित हो जाती हैं।

1. दिया है (Given):
त्रिभुज ABC में भुजा BC के समांतर एक रेखा DE खींची गई है, जो AB को D पर तथा AC को E पर काटती है।

2. सिद्ध करना है (To Prove):
AD / DB = AE / EC

3. रचना (Construction):
B को E से तथा C को D से मिलाया। साथ ही DM ⊥ AC तथा EN ⊥ AB खींचा।

4. उपपत्ति (Proof):
त्रिभुज का क्षेत्रफल = 1/2 × आधार × ऊंचाई
ar(ΔADE) = 1/2 × AD × EN
ar(ΔBDE) = 1/2 × DB × EN
अतः ar(ΔADE) / ar(ΔBDE) = (1/2 × AD × EN) / (1/2 × DB × EN) = AD / DB  ... (समीकरण 1)

इसी प्रकार:
ar(ΔADE) = 1/2 × AE × DM
ar(ΔCDE) = 1/2 × EC × DM
अतः ar(ΔADE) / ar(ΔCDE) = (1/2 × AE × DM) / (1/2 × EC × DM) = AE / EC  ... (समीकरण 2)

चूँकि ΔBDE और ΔCDE एक ही आधार DE तथा एक ही समांतर रेखाओं BC और DE के बीच बने त्रिभुज हैं:
अतः ar(ΔBDE) = ar(ΔCDE)  ... (समीकरण 3)

समीकरण 1, 2 और 3 से:
ar(ΔADE) / ar(ΔBDE) = ar(ΔADE) / ar(ΔCDE)
⟹ AD / DB = AE / EC  [इति सिद्धम् / Hence Proved]

★ परीक्षक 5/5 अंकन विभाजन:
कथन (1 अंक) + दिया है व सिद्ध करना है (0.5 अंक) + स्वच्छ नामांकित चित्र व रचना (1 अंक) + चरणबद्ध उपपत्ति (2.5 अंक)। कुल 5/5 अंक।`,
        a_en: `Model Solution (5 Marks Comprehensive Proof):
Statement:
If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, then the other two sides are divided in the same ratio.

Given: In ΔABC, a line DE || BC intersects AB at D and AC at E.
To Prove: AD / DB = AE / EC
Construction: Join BE and CD. Draw DM ⊥ AC and EN ⊥ AB.
Proof:
Area of triangle = 1/2 × base × height
ar(ΔADE) = 1/2 × AD × EN
ar(ΔBDE) = 1/2 × DB × EN
ar(ΔADE) / ar(ΔBDE) = AD / DB  ... (1)

Similarly:
ar(ΔADE) / ar(ΔCDE) = (1/2 × AE × DM) / (1/2 × EC × DM) = AE / EC  ... (2)
Now, ΔBDE and ΔCDE are on the same base DE and between the same parallels DE and BC.
Therefore, ar(ΔBDE) = ar(ΔCDE)  ... (3)
From (1), (2), and (3):
AD / DB = AE / EC. [Hence Proved]`
      },
      {
        topic: "ऊंचाई एवं दूरी (Heights and Distances - Trigonometric Application)",
        q_hi: "एक 7 मीटर ऊंचे भवन के शिखर से एक केबल टावर के शिखर का उन्नयन कोण 60° है और इसके पाद का अवनमन कोण 45° है। टावर की ऊंचाई ज्ञात कीजिए। (√3 = 1.732 लें)",
        q_en: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण हल):
1. रेखाचित्र एवं मान्यताएं:
माना कि AB = 7 m ऊंचा भवन है तथा CD = H मीटर ऊंचा केबल टावर है।
माना कि दोनों के बीच की क्षैतिज दूरी BC = x मीटर है।
बिंदु A से टावर CD पर लंब AE खींचा।
अतः AE = BC = x मीटर तथा ED = AB = 7 मीटर।
टावर का शेष भाग CE = (H - 7) मीटर।
दिया है: उन्नयन कोण ∠CAE = 60° तथा अवनमन कोण ∠EAD = ∠ADB = 45°।

2. समकोण त्रिभुज ΔABD में:
tan 45° = AB / BD
1 = 7 / x  ⟹  x = 7 मीटर

3. समकोण त्रिभुज ΔCAE में:
tan 60° = CE / AE
√3 = (H - 7) / x
√3 = (H - 7) / 7
7√3 = H - 7
H = 7√3 + 7 = 7(√3 + 1) मीटर
मान रखने पर (√3 = 1.732):
H = 7(1.732 + 1) = 7 × 2.732 = 19.124 मीटर

उत्तर: केबल टावर की कुल ऊंचाई 19.12 मीटर है।

★ टॉपर प्रस्तुति टिप: चित्र में दृष्टि रेखा, क्षैतिज स्तर और कोणों को स्वच्छ पेंसिल से दर्शाइए।`,
        a_en: `Model Solution (5 Marks):
Let AB = 7 m be the building and CD = H be the cable tower.
Let distance BC = x m. Draw AE ⊥ CD so AE = BC = x and ED = AB = 7 m.
Upper part of tower CE = (H - 7) m.
In right ΔABD:
tan 45° = AB / BD ⟹ 1 = 7 / x ⟹ x = 7 m.
In right ΔCAE:
tan 60° = CE / AE ⟹ √3 = (H - 7) / x ⟹ √3 = (H - 7) / 7
⟹ H - 7 = 7√3 ⟹ H = 7(√3 + 1) = 7(1.732 + 1) = 19.12 m.
Answer: The height of the cable tower is 19.12 m.`
      }
    ]
  },
  science: {
    short: [
      {
        topic: "ओम का नियम एवं प्रतिरोध (Ohm's Law & Factors Affecting Resistance)",
        q_hi: "ओम का नियम लिखिए। इसका गणितीय व्यंजक दीजिए तथा किसी चालक का प्रतिरोध किन-किन कारकों पर निर्भर करता है?",
        q_en: "State Ohm's Law. Give its mathematical formula and list the factors on which the resistance of a conductor depends.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण वैज्ञानिक हल):
ओम का नियम (Ohm's Law):
स्थिर ताप पर, किसी चालक तार के दोनों सिरों के बीच का विभवांतर (V), उसमें प्रवाहित होने वाली विद्युत धारा (I) के समानुपाती होता है।
गणितीय व्यंजक:
V ∝ I  ⟹  V = IR
जहाँ R एक नियतांक है जिसे चालक का विद्युत प्रतिरोध (Resistance) कहते हैं।
SI मात्रक: ओम (Ω)। (1 Ω = 1 Volt / 1 Ampere)

चालक के प्रतिरोध को प्रभावित करने वाले 4 कारक:
1. चालक की लम्बाई (L) पर: R ∝ L (लम्बाई बढ़ने पर प्रतिरोध बढ़ता है)।
2. अनुप्रस्थ काट के क्षेत्रफल (A) पर: R ∝ 1/A (मोटा तार होने पर प्रतिरोध कम होता है)।
3. पदार्थ की प्रकृति (Resistivity ρ) पर।
4. चालक के तापमान पर (ताप बढ़ने पर धातुओं का प्रतिरोध बढ़ता है)।
सूत्र: R = ρ (L / A)

★ परीक्षक विशिष्ट निर्देश:
'स्थिर ताप पर' (At constant temperature) लिखना अनिवार्य है; इसे छोड़ने पर 0.5 से 1 अंक काट लिया जाता है।`,
        a_en: `Model Solution (2/3 Marks Step-by-Step):
Ohm's Law Statement:
At constant temperature, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) across its ends.
Mathematical Expression:
V ∝ I  ⟹  V = IR
where R is the constant of proportionality called resistance.
SI Unit: Ohm (Ω). (1 Ω = 1 V / 1 A)

Factors affecting resistance of a conductor:
1. Length of the conductor (L): R ∝ L
2. Cross-sectional area (A): R ∝ 1/A
3. Nature of material (Resistivity ρ)
4. Temperature (increases with temperature for metals)
Governing Equation: R = ρ (L / A)`
      },
      {
        topic: "प्रकाश का अपवर्तन एवं स्नेल का नियम (Refraction of Light & Snell's Law)",
        q_hi: "प्रकाश के अपवर्तन के दो नियम लिखिए तथा स्नेल के नियम को गणितीय रूप में स्पष्ट कीजिए।",
        q_en: "State the two laws of refraction of light and write Snell's law in mathematical form.",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण हल):
प्रकाश के अपवर्तन के नियम:
1. प्रथम नियम: आपतित किरण, अपवर्तित किरण तथा आपतन बिंदु पर अभिलंब — तीनों एक ही तल में स्थित होते हैं।
2. द्वितीय नियम (स्नेल का नियम - Snell's Law):
प्रकाश के किसी निश्चित रंग तथा निश्चित माध्यमों के युग्म के लिए आपतन कोण की ज्या (sin i) तथा अपवर्तन कोण की ज्या (sin r) का अनुपात एक नियतांक होता है।
गणितीय रूप:
sin i / sin r = n₂₁ = स्थिर (Constant)
जहाँ n₂₁ पहले माध्यम के सापेक्ष दूसरे माध्यम का अपवर्तनांक (Refractive Index) है।

★ अंकन युक्ति: प्रकाश विरल से सघन में जाने पर अभिलंब की ओर झुकता है, तथा सघन से विरल में अभिलंब से दूर हटता है। यह अतिरिक्त पंक्ति लिखने पर परीक्षक पूरे 2/2 अंक देता है।`,
        a_en: `Model Solution (2 Marks):
Laws of Refraction of Light:
1. First Law: The incident ray, the refracted ray and the normal to the interface at the point of incidence all lie in the same plane.
2. Second Law (Snell's Law):
For a given pair of media and for light of a given wavelength, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant.
Mathematical Form:
sin i / sin r = constant (n₂₁)
where n₂₁ is the refractive index of the second medium with respect to the first medium.`
      },
      {
        topic: "एस्टरीकरण एवं साबुनीकरण (Esterification & Saponification)",
        q_hi: "एस्टरीकरण एवं साबुनीकरण अभिक्रिया में क्या अंतर है? दोनों के संतुलित रासायनिक समीकरण लिखिए।",
        q_en: "Differentiate between Esterification and Saponification reactions with balanced chemical equations.",
        a_hi: `आदर्श उत्तर (3 अंक सम्पूर्ण रासायनिक हल):
1. एस्टरीकरण (Esterification):
जब सांद्र सल्फ्यूरिक अम्ल (H₂SO₄) की उपस्थिति में एथेनॉइक अम्ल की अभिक्रिया एथेनॉल से कराई जाती है, तो मीठी फलों जैसी गंध वाला एस्टर (एथिल एथेनोएट) बनता है।
समीकरण:
CH₃COOH + C₂H₅OH ⎯⎯(सांद्र H₂SO₄)⎯⎯→ CH₃COOC₂H₅ + H₂O
(एथेनॉइक अम्ल)   (एथेनॉल)                      (एथिल एथेनोएट - एस्टर)

2. साबुनीकरण (Saponification):
जब एस्टर किसी क्षार (जैसे NaOH) के साथ अभिक्रिया करता है, तो यह पुनः ऐल्कोहॉल तथा सोडियम कार्बोक्सिलेट (साबुन) में परिवर्तित हो जाता है।
समीकरण:
CH₃COOC₂H₅ + NaOH ⎯⎯(ऊष्मा)⎯⎯→ CH₃COONa + C₂H₅OH
(एस्टर)                                (सोडियम एसीटेट - साबुन)  (एथेनॉल)

★ परीक्षक टिप्पणी: दोनों समीकरणों में अभिकारकों व उत्पादों के रासायनिक नाम तथा उत्प्रेरक (Conc. H₂SO₄) का उल्लेख अवश्य करें।`,
        a_en: `Model Solution (3 Marks):
1. Esterification:
When ethanoic acid reacts with ethanol in the presence of concentrated H₂SO₄ catalyst, sweet fruity smelling ester (ethyl ethanoate) is formed.
Equation:
CH₃COOH + C₂H₅OH ⎯⎯(conc. H₂SO₄)⎯⎯→ CH₃COOC₂H₅ + H₂O

2. Saponification:
When an ester is heated with an alkali (NaOH), it hydrolyzes back to form alcohol and sodium salt of carboxylic acid (soap).
Equation:
CH₃COOC₂H₅ + NaOH ⎯⎯→ CH₃COONa + C₂H₅OH`
      },
      {
        topic: "धमनी और शिरा में अंतर (Artery vs Vein)",
        q_hi: "धमनी (Artery) और शिरा (Vein) में चार प्रमुख संरचनात्मक एवं कार्यात्मक अंतर लिखिए।",
        q_en: "Write four major structural and functional differences between Arteries and Veins.",
        a_hi: `आदर्श उत्तर (2/3 अंक पूर्ण तालिका हल):
| क्रमांक | धमनी (Artery) | शिरा (Vein) |
|---|---|---|
| 1 | यह रुधिर को हृदय से शरीर के विभिन्न अंगों तक ले जाती है। | यह शरीर के विभिन्न अंगों से रुधिर को वापस हृदय तक लाती है। |
| 2 | इसमें शुद्ध (ऑक्सीजनयुक्त) रुधिर बहता है (अपवाद: फुफ्फुस धमनी)। | इसमें अशुद्ध (डीऑक्सीजनयुक्त) रुधिर बहता है (अपवाद: फुफ्फुस शिरा)। |
| 3 | इसकी दीवारें मोटी, अत्यधिक लचीली एवं कपाट-रहित (no valves) होती हैं। | इसकी दीवारें पतली होती हैं और रक्त के उल्टे प्रवाह को रोकने हेतु कपाट (Valves) होते हैं। |
| 4 | इसमें रक्त उच्च दाब एवं झटके के साथ बहता है। | इसमें रक्त कम दाब एवं निरंतर समान गति से बहता है। |

★ टॉपर नोट: फुफ्फुस धमनी और फुफ्फुस शिरा के अपवाद का उल्लेख करने पर परीक्षक प्रभावित होकर पूरे अंक देता है।`,
        a_en: `Model Solution (2/3 Marks Tabular Format):
1. Direction: Arteries carry blood away from the heart to tissues; Veins return blood from tissues back to the heart.
2. Oxygenation: Arteries carry oxygenated blood (exception: Pulmonary Artery); Veins carry deoxygenated blood (exception: Pulmonary Vein).
3. Wall Structure: Arteries have thick, muscular, elastic walls without valves; Veins have thinner walls and contain internal valves to prevent backflow.
4. Blood Pressure: High pressure and jerky flow in arteries; Low pressure and smooth flow in veins.`
      },
      {
        topic: "मेंडल का एकसंकर संकरण (Mendel's Monohybrid Cross)",
        q_hi: "मेंडल के एकसंकर संकरण प्रयोग की सहायता से पृथक्करण के नियम (Law of Segregation) को स्पष्ट कीजिए।",
        q_en: "Explain Mendel's Law of Segregation using a Monohybrid Cross with genotypic and phenotypic ratios.",
        a_hi: `आदर्श उत्तर (3 अंक सम्पूर्ण आनुवंशिकी हल):
पृथक्करण का नियम (Law of Segregation):
जब दो विपर्यासी लक्षणों वाले जनकों में संकरण कराया जाता है, तो F₁ पीढ़ी में केवल प्रभावी लक्षण दिखाई देता है, किंतु युग्मक निर्माण के समय दोनों युग्मविकल्पी (एलील) एक-दूसरे से पूरी तरह पृथक हो जाते हैं।

एकसंकर संकरण (Monohybrid Cross):
जनक (P): शुद्ध लंबा (TT) × शुद्ध बौना (tt)
F₁ पीढ़ी: सभी संकर लंबे पौधे (Tt)

F₁ पीढ़ी में स्व-परागण (Self-Pollination: Tt × Tt):
F₂ पीढ़ी के पौधे: TT (शुद्ध लंबा), Tt (संकर लंबा), Tt (संकर लंबा), tt (शुद्ध बौना)
1. लक्षणप्ररूपी अनुपात (Phenotypic Ratio) = 3 लंबा : 1 बौना (3:1)
2. जीनप्ररूपी अनुपात (Genotypic Ratio) = 1 TT : 2 Tt : 1 tt (1:2:1)

★ निष्कर्ष: F₂ पीढ़ी में बौने लक्षण (tt) का पुनः प्रकट होना सिद्ध करता है कि लक्षण मिश्रित नहीं होते बल्कि शुद्ध रूप से पृथक होते हैं।`,
        a_en: `Model Solution (3 Marks):
Law of Segregation:
Alleles of a gene separate during gamete formation, so that each gamete carries only one allele for each gene.
Cross: Pure Tall (TT) × Pure Dwarf (tt)
F₁ Generation: All Tall heterozygous (Tt)
Selfing F₁ (Tt × Tt) gives F₂ Generation:
1. Phenotypic Ratio = 3 Tall : 1 Dwarf (3:1)
2. Genotypic Ratio = 1 TT : 2 Tt : 1 tt (1:2:1)
Conclusion: The reappearance of the recessive dwarf trait in F₂ confirms that alleles do not blend and segregate purely.`
      }
    ],
    long: [
      {
        topic: "मानव हृदय एवं दोहरा परिसंचरण (Human Heart Double Circulation)",
        q_hi: "मानव हृदय की संरचना का सचित्र वर्णन कीजिए तथा स्पष्ट कीजिए कि दोहरा परिसंचरण (Double Circulation) क्या है और यह पक्षियों व स्तनधारियों में क्यों आवश्यक है?",
        q_en: "Describe the structure of human heart and explain Double Circulation. Why is it necessary in birds and mammals?",
        a_hi: `आदर्श उत्तर (5 अंक विस्तृत स्टेप मार्किंग):
1. मानव हृदय की संरचना (Structure of Human Heart):
मानव हृदय एक पेशीय अंग है जो मुट्ठी के आकार का होता है। इसमें 4 कोष्ठक (Chambers) होते हैं:
- दो अलिंद (ऊपरी कोष्ठक: दायां अलिंद व बायां अलिंद)
- दो निलय (निचले कोष्ठक: दायां निलय व बायां निलय)
दाएं और बाएं भागों को एक पेशीय भित्ति (सेप्टम - Septum) अलग करती है, जिससे ऑक्सीजनयुक्त और डीऑक्सीजनयुक्त रुधिर आपस में नहीं मिलते।

2. दोहरे परिसंचरण की कार्यप्रणाली (Double Circulation Mechanism):
मानव में रक्त एक चक्र पूरा करने के लिए हृदय से दो बार गुजरता है:
(क) फुफ्फुसीय परिसंचरण (Pulmonary Circulation):
शरीर से आया अशुद्ध रक्त (CO₂ युक्त) महाशिरा द्वारा दाएं अलिंद में आता है, फिर दाएं निलय में जाता है। दायां निलय इसे फुफ्फुस धमनी द्वारा फेफड़ों में भेजता है जहाँ रक्त का ऑक्सीजनीकरण होता है।
(ख) दैहिक परिसंचरण (Systemic Circulation):
फेफड़ों से शुद्ध रक्त (O₂ युक्त) फुफ्फुस शिराओं द्वारा बाएं अलिंद में आता है, फिर बाएं निलय में जाता है। बायां निलय तीव्र संकुचन से इसे महाधमनी (Aorta) द्वारा पूरे शरीर में पंप करता है।

3. पक्षियों और स्तनधारियों में इसकी आवश्यकता (Why Necessary?):
- पक्षी और स्तनधारी समतापी (Warm-blooded / Homeothermic) प्राणी हैं।
- इन्हें अपने शरीर का तापमान स्थिर (37°C) बनाए रखने हेतु अत्यधिक ऊर्जा की आवश्यकता होती है।
- दोहरे परिसंचरण द्वारा ऑक्सीजनयुक्त और डीऑक्सीजनयुक्त रक्त का पृथक्करण शरीर को प्रचुर ऑक्सीजन आपूर्ति सुनिश्चित करता है जिससे उच्च सेलुलर श्वसन व ऊर्जा उत्पादन संभव होता है।

★ परीक्षक अंकन विभाजन:
हृदय संरचना व कोष्ठक (1.5 अंक) + दोहरा परिसंचरण पथ (2 अंक) + समतापी प्राणियों में महत्व (1.5 अंक)। कुल 5/5 अंक।`,
        a_en: `Model Solution (5 Marks Comprehensive Answer):
1. Structure of Human Heart:
The human heart is a muscular pumping organ with 4 chambers: two upper atria (Right Atrium, Left Atrium) and two lower ventricles (Right Ventricle, Left Ventricle). The septum completely separates oxygenated and deoxygenated blood.

2. Double Circulation Mechanism:
Blood passes through the heart twice during each complete cardiac cycle:
(a) Pulmonary Circulation: Deoxygenated blood from Right Ventricle is pumped via pulmonary arteries to lungs for oxygenation and returns via pulmonary veins to Left Atrium.
(b) Systemic Circulation: Oxygenated blood from Left Ventricle is pumped via Aorta to all body tissues and deoxygenated blood returns via Vena Cava to Right Atrium.

3. Why Necessary in Birds and Mammals:
Birds and mammals are warm-blooded (homeotherms) and require constant, high body temperature irrespective of surrounding temperature. Complete separation of oxygenated and deoxygenated blood ensures highly efficient oxygen delivery for aerobic respiration and sustained metabolic energy.`
      },
      {
        topic: "साबुन की सफाई क्रिया एवं मिसेल निर्माण (Cleansing Action of Soap & Micelle)",
        q_hi: "साबुन के अणु की संरचना समझाइए तथा चित्र सहित स्पष्ट कीजिए कि साबुन की सफाई प्रक्रिया में मिसेल (Micelle) का निर्माण किस प्रकार होता है?",
        q_en: "Explain the structure of a soap molecule and the mechanism of cleansing action of soap through micelle formation with labeled diagram.",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण हल):
1. साबुन के अणु की संरचना (Structure of Soap Molecule):
साबुन दीर्घ श्रृंखला वाले कार्बोक्सिलिक अम्लों के सोडियम या पोटैशियम लवण होते हैं (जैसे सोडियम स्टीयरेट C₁₇H₃₅COONa)।
इसके अणु के दो सिरे होते हैं:
(क) हाइड्रोकार्बन पूँछ (जलविरागी सिरा - Hydrophobic tail): यह गैर-ध्रुवीय होती है, जल से दूर भागती है तथा तेल/ग्रीस (मैल) में घुलती है।
(ख) आयनिक सिरा (जलरागी सिरा - Hydrophilic head - COO⁻Na⁺): यह ध्रुवीय होता है, जल के प्रति आकर्षित होता है तथा जल में घुलता है।

2. मिसेल निर्माण की क्रियाविधि (Micelle Formation & Cleansing Action):
- अधिकांश मैल तैलीय या ग्रीसी प्रकृति की होती है जो पानी में नहीं घुलती।
- जब साबुन को जल में घोला जाता है, तो साबुन के अणुओं का हाइड्रोकार्बन सिरा मैल की बूंद की ओर अंदर की तरफ केंद्रित हो जाता है, जबकि आयनिक सिरा बाहर जल की ओर व्यवस्थित हो जाता है।
- इस प्रकार एक गोलाकार आण्विक संरचना बनती है जिसे 'मिसेल' (Micelle) कहते हैं।
- मिसेल के केंद्र में मैल की बूंद फंस जाती है। आयन-आयन प्रतिकर्षण के कारण मिसेल आपस में मिलकर अवक्षेपित नहीं होते।
- जब कपड़े को रगड़ा या हिलाया जाता है, तो मिसेल के साथ मैल जल में घुलकर बाहर निकल जाती है और कपड़ा स्वच्छ हो जाता है।

★ टॉपर युक्ति: केंद्र में ग्रीस की बूंद और चारों ओर Na⁺ वाले आयनिक सिरे का गोल चक्र खींचने पर पूरे 5 अंक मिलते हैं।`,
        a_en: `Model Solution (5 Marks):
1. Structure of Soap Molecule:
A soap molecule (e.g., sodium stearate C₁₇H₃₅COONa) consists of two parts:
(a) Hydrophobic Hydrocarbon Tail: Non-polar, repels water, and dissolves in oil/grease dirt.
(b) Hydrophilic Ionic Head (-COO⁻Na⁺): Polar, attracts water, and dissolves in water.

2. Mechanism of Cleansing Action:
Oily dirt is insoluble in water. When soap is applied to dirty clothes in water, the hydrophobic tails embed into the oil droplet while the hydrophilic heads project outward into the water.
This spherical cluster is called a 'Micelle'. The grease is trapped in the micelle core. Because of electrostatic repulsion between ionic heads, micelles remain suspended as an emulsion and are easily rinsed away with water.`
      }
    ]
  },
  social: {
    short: [
      {
        topic: "जलियांवाला बाग हत्याकांड (Jallianwala Bagh Massacre)",
        q_hi: "जलियांवाला बाग हत्याकांड (13 अप्रैल 1919) के कारणों एवं भारतीय स्वतंत्रता आंदोलन पर इसके प्रभावों का संक्षेप में वर्णन कीजिए।",
        q_en: "Briefly describe the causes and national impact of the Jallianwala Bagh Massacre (13 April 1919).",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण ऐतिहासिक हल):
1. घटना की पृष्ठभूमि एवं कारण:
13 अप्रैल 1919 को बैसाखी के दिन अमृतसर (पंजाब) के जलियांवाला बाग में एक शांतिपूर्ण जनसभा आयोजित की गई थी। इस सभा का उद्देश्य दमनकारी 'रॉलेट एक्ट' (काला कानून) तथा लोकप्रिय नेताओं (डॉ. सैफुद्दीन किचलू और डॉ. सत्यपाल) की गिरफ्तारी का शांतिपूर्ण विरोध करना था।
2. बर्बर नरसंहार:
ब्रिटिश सैन्य अधिकारी जनरल डायर ने बाग के एकमात्र संकरे निकास द्वार को बंद कर निहत्थी भीड़ पर बिना चेतावनी के अंधाधुंध गोलियां चलवा दीं। इसमें सैकड़ों निर्दोष पुरुष, महिलाएं व बच्चे मारे गए तथा हजारों घायल हुए।
3. राष्ट्रीय प्रभाव:
- रवीन्द्रनाथ टैगोर ने ब्रिटिश हुकूमत के विरोध में अपनी सर्वोच्च उपाधि 'नाइटहुड' (Knighthood) त्याग दी।
- महात्मा गांधी ने 'असहयोग आंदोलन' (Non-Cooperation Movement - 1920) प्रारंभ करने का निर्णय लिया।
- इस घटना ने भारतीय जनता के मन से ब्रिटिश न्यायप्रियता का भ्रम हमेशा के लिए मिटा दिया।

★ परीक्षक अंकन बिंदु: 13 अप्रैल 1919 तिथि, जनरल डायर, रॉलेट एक्ट, और टैगोर की नाइटहुड वापसी—इन चारों कीवर्ड्स पर पूरे 3/3 अंक मिलते हैं।`,
        a_en: `Model Solution (2/3 Marks):
1. Cause: On 13 April 1919 (Baisakhi), a peaceful crowd assembled at Jallianwala Bagh in Amritsar to protest against the repressive Rowlatt Act and the arrest of nationalist leaders Dr. Saifuddin Kitchlew and Dr. Satyapal.
2. Event: Brigadier-General Reginald Dyer blocked the only exit and ordered troops to fire upon the unarmed gathering, killing hundreds.
3. Impact: Rabindranath Tagore renounced his British Knighthood. Mahatma Gandhi lost all faith in British benevolence and launched the Non-Cooperation Movement in 1920.`
      },
      {
        topic: "भारतीय संघवाद की विशेषताएं (Features of Indian Federalism)",
        q_hi: "भारतीय संघवाद (Federalism) की तीन प्रमुख विशेषताओं का उल्लेख कीजिए।",
        q_en: "Mention three key features of the federal system of government in India.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण हल):
भारतीय संविधान के तहत संघीय शासन प्रणाली की तीन प्रमुख विशेषताएं निम्नलिखित हैं:
1. त्रि-स्तरीय शासन व्यवस्था (Three-tier Government):
भारत में सत्ता का विभाजन केंद्र सरकार, राज्य सरकारों तथा 73वें व 74वें संविधान संशोधन (1992) द्वारा स्थानीय निकायों (पंचायती राज एवं नगर पालिका) के रूप में तीन स्तरों पर है।
2. संविधान द्वारा शक्तियों का स्पष्ट विभाजन (Three Lists):
संविधान की 7वीं अनुसूची में तीन सूचियों द्वारा केंद्र व राज्यों के अधिकार क्षेत्र स्पष्ट हैं:
- संघ सूची (Union List): 97 विषय (रक्षा, विदेश, रेलवे, बैंकिंग)।
- राज्य सूची (State List): 66 विषय (पुलिस, कृषि, स्वास्थ्य, जेल)।
- समवर्ती सूची (Concurrent List): 47 विषय (शिक्षा, वन, विवाह)।
3. स्वतंत्र एवं निष्पक्ष न्यायपालिका (Independent Judiciary):
सर्वोच्च न्यायालय संविधान का संरक्षक है और केंद्र व राज्यों के बीच किसी भी क्षेत्राधिकार विवाद में अंतिम मध्यस्थ के रूप में कार्य करता है।

★ टॉपर प्रस्तुति: तीनों सूचियों का उल्लेख करने पर परीक्षक पूरे 3/3 अंक देता है।`,
        a_en: `Model Solution (2/3 Marks):
Key Features of Indian Federalism:
1. Three-Tier Government: Constitutional division of governance among Union Government, State Governments, and Local Self-Governments (Panchayati Raj & Municipalities).
2. Constitutional Division of Powers (7th Schedule): Legislative powers distributed via Union List (Defense, Foreign Affairs), State List (Police, Agriculture), and Concurrent List (Education, Forests).
3. Independent Judiciary: The Supreme Court acts as the final arbiter and custodian of the Constitution to resolve disputes between Centre and States.`
      },
      {
        topic: "अर्थव्यवस्था के तीन क्षेत्र (Three Sectors of Economy)",
        q_hi: "भारतीय अर्थव्यवस्था के तीनों प्रमुख क्षेत्रों (प्राथमिक, द्वितीयक एवं तृतीयक) को सोदाहरण स्पष्ट कीजिए।",
        q_en: "Explain the three main sectors of the Indian economy (Primary, Secondary, and Tertiary) with examples.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण अर्थशास्त्र हल):
1. प्राथमिक क्षेत्र (Primary / Agricultural Sector):
जब हम प्राकृतिक संसाधनों का सीधे दोहन करके किसी वस्तु का उत्पादन करते हैं, तो इसे प्राथमिक क्षेत्र कहते हैं।
उदाहरण: कृषि, वानिकी, मत्स्य पालन, पशुपालन एवं खनन।
2. द्वितीयक क्षेत्र (Secondary / Industrial Sector):
वह क्षेत्र जिसमें प्राथमिक क्षेत्र से प्राप्त कच्चे माल को विनिर्माण प्रणाली (Manufacturing) द्वारा अधिक उपयोगी व मूल्यवान वस्तुओं में बदला जाता है।
उदाहरण: कपास से कपड़ा बनाना, गन्ने से चीनी बनाना, लौह अयस्क से स्टील तैयार करना।
3. तृतीयक क्षेत्र (Tertiary / Service Sector):
यह क्षेत्र किसी भौतिक वस्तु का उत्पादन नहीं करता बल्कि प्राथमिक व द्वितीयक क्षेत्र की उत्पादन प्रक्रिया में सहायता व सेवा प्रदान करता है।
उदाहरण: बैंकिंग, परिवहन, संचार, बीमा, सूचना प्रौद्योगिकी (IT), चिकित्सा एवं शिक्षण।

★ अतिरिक्त आर्थिक तथ्य: तृतीयक क्षेत्र वर्तमान में भारत के सकल घरेलू उत्पाद (GDP) में सर्वाधिक योगदान (54%+) देता है।`,
        a_en: `Model Solution (2/3 Marks):
1. Primary Sector: Direct utilization of natural resources to produce goods (e.g., Agriculture, Forestry, Fishing, Mining).
2. Secondary Sector: Industrial processing and manufacturing that converts raw materials into finished consumer goods (e.g., Textile manufacturing, Steel factories, Sugar mills).
3. Tertiary Sector: Provides essential services to support primary and secondary production rather than goods (e.g., Banking, Transport, IT, Healthcare, Education). Contributes over 54% to India's GDP.`
      }
    ],
    long: [
      {
        topic: "असहयोग आंदोलन का समग्र मूल्यांकन (Non-Cooperation Movement)",
        q_hi: "असहयोग आंदोलन (1920-1922) के प्रमुख कारण, कार्यक्रम एवं 1922 में इसके स्थगन के कारणों का सविस्तर मूल्यांकन कीजिए।",
        q_en: "Critically evaluate the causes, main programmes, and reasons for the withdrawal of the Non-Cooperation Movement (1920-1922).",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण विश्लेषणात्मक हल):
1. आंदोलन के प्रमुख कारण:
(क) प्रथम विश्व युद्ध के बाद की भीषण महंगाई और भारतीय संसाधनों का अंग्रेजों द्वारा दोहन।
(ख) 1919 का दमनकारी 'रॉलेट एक्ट' (ना कोई अपील, ना कोई दलील, ना कोई वकील)।
(ग) जलियांवाला बाग का अमानवीय नरसंहार तथा हंटर कमेटी द्वारा दोषियों को बचाना।
(घ) तुर्की के खलीफा के पद को समाप्त करने के विरोध में शुरू हुआ खिलाफत आंदोलन।

2. आंदोलन के प्रमुख कार्यक्रम:
- सरकारी उपाधियों, पदवियों एवं अवैतनिक पदों का त्याग।
- सरकारी स्कूलों, कॉलेजों एवं ब्रिटिश अदालतों का पूर्ण बहिष्कार।
- विदेशी वस्त्रों व वस्तुओं की होली जलाना एवं मदिरा की दुकानों पर धरना।
- स्वदेशी खादी का प्रचार, चरखा कातने को प्रोत्साहन एवं राष्ट्रीय शिक्षण संस्थानों (काशी विद्यापीठ, जामिया) की स्थापना।

3. आंदोलन का स्थगन (चौरी-चौरा की घटना):
- 5 फरवरी 1922 को संयुक्त प्रांत (वर्तमान उत्तर प्रदेश) के गोरखपुर जिले के चौरी-चौरा नामक स्थान पर पुलिस के अत्याचार के विरोध में उत्तेजित भीड़ ने थाने में आग लगा दी, जिसमें 22 पुलिसकर्मी जलकर मर गए।
- महात्मा गांधी का अटूट विश्वास था कि स्वतंत्रता का संग्राम केवल पूर्णतः अहिंसक मार्ग से ही जीता जा सकता है।
- हिंसा भड़कने पर गांधीजी ने 12 फरवरी 1922 को बारदोली में कांग्रेस कार्यसमिति की बैठक बुलाकर आंदोलन को तत्काल प्रभाव से स्थगित कर दिया।

4. आंदोलन का ऐतिहासिक महत्व व निष्कर्ष:
भले ही यह आंदोलन अपने एक वर्ष में स्वराज्य प्राप्ति के लक्ष्य को तुरंत न पा सका, किंतु इसने पहली बार भारतीय राष्ट्रीय आंदोलन को मुट्ठी भर शिक्षित वर्ग से निकालकर करोड़ों किसानों, मजदूरों, महिलाओं और छात्रों का 'सच्चा जन-आंदोलन' (Mass Movement) बना दिया और ब्रिटिश सत्ता की नैतिक शक्ति को ध्वस्त कर दिया।

★ परीक्षक 5/5 अंकन योजना: कारण (1.5 अंक) + कार्यक्रम (1.5 अंक) + चौरी-चौरा स्थगन (1 अंक) + ऐतिहासिक महत्व (1 अंक)।`,
        a_en: `Model Solution (5 Marks Comprehensive Historical Analysis):
1. Causes: Economic distress post-WWI, draconian Rowlatt Act 1919, Jallianwala Bagh massacre, and Khilafat issue.
2. Programmes: Surrender of government titles, boycott of civil services, army, police, courts, legislative councils, schools, and foreign goods; promotion of Khadi and charkha.
3. Withdrawal: On 5 February 1922 at Chauri Chaura (Gorakhpur, UP), a violent crowd set fire to a police station, killing 22 policemen. Committed to absolute non-violence, Gandhi suspended the movement on 12 February 1922.
4. Historical Significance: Transformed the Indian freedom struggle from an elite constitutional protest into a genuine mass movement uniting peasants, workers, and youth.`
      }
    ]
  },
  hindi: {
    short: [
      {
        topic: "स्वर संधि के पांच भेद (Swar Sandhi Classification)",
        q_hi: "स्वर संधि की परिभाषा लिखिए तथा इसके पांचों भेदों (दीर्घ, गुण, वृद्धि, यण, अयादि) के नियम व दो-दो उदाहरण दीजिए।",
        q_en: "Define Swar Sandhi and state the rules of its five types with two examples each.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण व्याकरण हल):
परिभाषा: दो स्वरों के आपस में मिलने से जो विकार (परिवर्तन) उत्पन्न होता है, उसे 'स्वर संधि' कहते हैं।

स्वर संधि के 5 भेद, नियम एवं उदाहरण:
1. दीर्घ संधि: ह्रस्व या दीर्घ अ, इ, उ के बाद समान ह्रस्व या दीर्घ स्वर आए तो दोनों मिलकर दीर्घ (आ, ई, ऊ) हो जाते हैं।
   - विद्या + आलय = विद्यालय (आ + आ = आ)
   - गिरि + ईश = गिरीश (इ + ई = ई)
2. गुण संधि: अ, आ के बाद इ, ई आए तो 'ए', उ, ऊ आए तो 'ओ' तथा ऋ आए तो 'अर्' हो जाता है।
   - देव + इन्द्र = देवेन्द्र (अ + इ = ए)
   - सूर्य + उदय = सूर्योदय (अ + उ = ओ)
3. वृद्धि संधि: अ, आ के बाद ए, ऐ आए तो 'ऐ' तथा ओ, औ आए तो 'औ' हो जाता है।
   - एक + एक = एकैक (अ + ए = ऐ)
   - महा + औषधि = महौषधि (आ + औ = औ)
4. यण संधि: इ, ई, उ, ऊ, ऋ के बाद कोई भिन्न स्वर आए तो क्रमशः य्, व्, र् हो जाते हैं।
   - यदि + अपि = यद्यपि (इ + अ = य्)
   - सु + आगतम् = स्वागतम् (उ + आ = व्)
5. अयादि संधि: ए, ऐ, ओ, औ के बाद कोई भिन्न स्वर आए तो क्रमशः अय्, आय्, अव्, आव् हो जाते हैं।
   - ने + अन = नयन (ए + अ = अय्)
   - पौ + अक = पावक (औ + अ = आव्)

★ परीक्षक युक्ति: संधि विच्छेद के साथ प्रयुक्त स्वर विकार (जैसे अ + उ = ओ) दिखाने पर पूरे 3/3 अंक मिलते हैं।`,
        a_en: `Model Solution (2/3 Marks Hindi Grammar):
Swar Sandhi Definition: The phonetic change produced by the combination of two vowels.
5 Types:
1. Dirgh Sandhi: a/aa + a/aa = aa (Vidya + Alaya = Vidyalaya).
2. Gun Sandhi: a/aa + i/ee = e, a/aa + u/oo = o (Dev + Indra = Devendra, Surya + Uday = Suryodaya).
3. Vriddhi Sandhi: a/aa + e/ai = ai, a/aa + o/au = au (Ek + Ek = Ekaik, Maha + Aushadhi = Mahaushadhi).
4. Yan Sandhi: i/ee + vowel = y, u/oo + vowel = v (Yadi + Api = Yadyapi, Su + Aagatam = Swagatam).
5. Ayadi Sandhi: e/ai/o/au + vowel = ay/aay/av/aav (Ne + An = Nayan, Pau + Ak = Paavak).`
      },
      {
        topic: "समास भेद एवं अंतर (Samas Definition & Types)",
        q_hi: "समास किसे कहते हैं? तत्पुरुष, कर्मधारय एवं बहुव्रीहि समास में अंतर सोदाहरण स्पष्ट कीजिए।",
        q_en: "Define Samas and explain the difference between Tatpurush, Karmadharay, and Bahuvrihi Samas with examples.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण हल):
परिभाषा: दो या दो से अधिक शब्दों के मेल से संक्षिप्त नया सार्थक शब्द बनाने की प्रक्रिया को 'समास' कहते हैं।

तीन प्रमुख समासों में अंतर:
1. तत्पुरुष समास:
इसमें उत्तर पद (दूसरा पद) प्रधान होता है तथा दोनों पदों के बीच कारक चिह्न (का, के, की, में, पर आदि) का लोप होता है।
उदाहरण:
- राजपुत्र = राजा का पुत्र (संबंध तत्पुरुष)
- रोगमुक्त = रोग से मुक्त (अपादान तत्पुरुष)

2. कर्मधारय समास:
इसमें पहला पद विशेषण तथा दूसरा पद विशेष्य (अथवा उपमान और उपमेय) होता है।
उदाहरण:
- नीलकमल = नीला है जो कमल
- चन्द्रमुखी = चन्द्रमा के समान मुख वाली

3. बहुव्रीहि समास:
इसमें कोई भी पद प्रधान नहीं होता, बल्कि दोनों पद मिलकर किसी तीसरे अन्य अर्थ/व्यक्ति की ओर संकेत करते हैं।
उदाहरण:
- दशानन = दस हैं आनन (सिर) जिसके अर्थात् रावण।
- लंबोदर = लंबा है उदर जिसका अर्थात् श्रीगणेश।

★ टॉपर प्रस्तुति निर्देश: विग्रह करते समय स्पष्ट लिखें कि किसमें विशेषण है और किसमें अन्य पद प्रधान है।`,
        a_en: `Model Solution (2/3 Marks):
Samas Definition: The compounding of two or more words to form a concise meaningful word.
Key Differences:
1. Tatpurush: Second word is primary and case marker is omitted (Rajputra = King's son).
2. Karmadharay: Adjective-noun or comparison relationship (Neelkamal = Blue lotus).
3. Bahuvrihi: Neither word is primary; together they refer to a third distinct entity (Dashanana = Ten-headed, i.e., Ravana).`
      },
      {
        topic: "रस एवं उसके अंग (Ras Definition & Examples)",
        q_hi: "रस की परिभाषा देते हुए इसके चारों अंगों के नाम लिखिए तथा वीर रस का स्थायी भाव व पद्य उदाहरण दीजिए।",
        q_en: "Define Ras, list its four limbs, and provide the sthayi bhav and verse for Veer Ras.",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण हल):
रस की परिभाषा:
काव्य को पढ़ने, सुनने अथवा नाटक को देखने से सहृदय के अंतःकरण में जिस अलौकिक आनंद की अनुभूति होती है, उसे 'रस' कहते हैं। आचार्य भरतमुनि के अनुसार: "विभावानुभावव्यभिचारिसंयोगाद्रसनिष्पत्तिः"।

रस के 4 अनिवार्य अंग:
1. स्थायी भाव (हृदय में सुप्तावस्था में रहने वाले मूल भाव - 9 प्रकार)
2. विभाव (भाव को जगाने वाले कारण - आलम्बन व उद्दीपन)
3. अनुभाव (भाव जाग्रत होने पर शारीरिक चेष्टाएं)
4. संचारी/व्यभिचारी भाव (पानी के बुलबुलों की तरह आने-जाने वाले भाव - 33 प्रकार)

वीर रस (Veer Ras):
स्थायी भाव: 'उत्साह'
उदाहरण:
"बुंदेले हरबोलों के मुँह हमने सुनी कहानी थी।
खूब लड़ी मर्दानी वह तो झाँसी वाली रानी थी॥"

★ अंकन युक्ति: रस का नाम, स्थायी भाव, आलम्बन एवं आश्रय का उल्लेख करने पर परीक्षक पूर्ण 2/2 अंक प्रदान करता है।`,
        a_en: `Model Solution (2 Marks):
Ras Definition: The aesthetic emotional bliss experienced upon reading, hearing, or observing literature/drama.
Four Limbs of Ras: Sthayi Bhav (Permanent emotion), Vibhav (Stimulating cause), Anubhav (Physical reactions), Sanchari Bhav (Transient emotions).
Veer Ras: Sthayi Bhav is 'Utsaha' (Courage/Zeal).
Example Verse: 'Bundele harbolon ke munh humne suni kahani thi, Khoob ladi mardani wah to Jhansi wali rani thi.'`
      }
    ],
    long: [
      {
        topic: "औपचारिक शिकायती पत्र (Formal Complaint Letter to Municipal Commissioner)",
        q_hi: "अपने नगर निगम के आयुक्त / अधिशासी अधिकारी को एक शिकायती पत्र लिखिए जिसमें मोहल्ले में व्याप्त जल-जमाव, नालियों की गंदगी तथा संक्रामक बीमारियों (डेंगू, मलेरिया) के फैलने के भय का उल्लेख हो।",
        q_en: "Write a formal letter to the Municipal Commissioner regarding waterlogging, uncleaned drains, and risk of epidemic diseases in your locality.",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण प्रारूप पत्र):
सेवा में,
श्रीमान नगर आयुक्त,
नगर निगम, [शहर का नाम]।

विषय: मोहल्ले में भीषण जल-जमाव एवं संक्रामक बीमारियों के प्रसार की रोकथाम हेतु।

महोदय,
सविनय निवेदन है कि मैं [मोहल्ला/वार्ड संख्या, शहर का नाम] का एक स्थायी निवासी हूँ। इस पत्र के माध्यम से मैं आपका ध्यान हमारे क्षेत्र में व्याप्त गंभीर स्वास्थ्य संकट की ओर आकर्षित करना चाहता हूँ।

विगत दो सप्ताहों से लगातार वर्षा के कारण हमारे मोहल्ले की मुख्य सड़कों एवं गलियों में घुटनों तक गंदा पानी भर गया है। नालियों की नियमित सफाई न होने के कारण वे पूरी तरह अवरुद्ध हो चुकी हैं और गंदा बदबूदार पानी घरों के प्रवेश द्वारों तक पहुंच रहा है। सड़कों पर जल-जमाव के कारण आवागमन पूरी तरह ठप हो गया है तथा स्कूली बच्चों व वृद्धों का घर से निकलना दूभर हो गया है।

सबसे अधिक चिंताजनक विषय यह है कि ठहरे हुए गंदे पानी में मच्छरों, मक्खियों एवं घातक कीटाणुओं का प्रकोप चरम पर पहुंच चुका है। हमारे क्षेत्र में डेंगू, मलेरिया, चिकनगुनिया तथा हैजा जैसी जानलेवा संक्रामक बीमारियां तेजी से फैलने का गंभीर भय बना हुआ है। कई बच्चे पहले ही बुखार से पीड़ित हो चुके हैं। स्थानीय सफाई कर्मचारियों से बार-बार अनुरोध करने पर भी कोई कार्रवाई नहीं की गई।

अतः आपसे करबद्ध प्रार्थना है कि जनहित को ध्यान में रखते हुए हमारे मोहल्ले में तुरंत जल निकासी हेतु सक्शन पम्पों की व्यवस्था करवाने, नालियों की व्यापक सफाई तथा पूरे क्षेत्र में कीटनाशक (डीडीटी) व फॉगिंग मशीन का छिड़काव युद्धस्तर पर करवाने की कृपा करें। इस त्वरित कृपा हेतु समस्त क्षेत्रवासी आपके सदैव आभारी रहेंगे।

सधन्यवाद।

भवदीय,
समस्त क्षेत्रवासी,
वार्ड संख्या: 14, [मोहल्ले का नाम],
दिनांक: [परीक्षा की तिथि]

★ परीक्षक 5/5 अंकन विभाजन:
प्रारूप/संबोधन व विषय (1 अंक) + मुख्य समस्या व विवरण (3 अंक) + शिष्टाचारपूर्ण समापन व दिनांक (1 अंक)। कुल 5/5 अंक।`,
        a_en: `Model Solution (5 Marks Official Letter Format):
To,
The Municipal Commissioner,
Municipal Corporation, [City Name].

Subject: Urgent grievance regarding acute waterlogging, uncleaned drains, and epidemic threat.

Sir/Madam,
I write to bring to your urgent notice the hazardous conditions in Ward No. 14. Due to choked drains, contaminated rainwater has inundated main streets, stranding residents and school children. Stagnant filthy water has turned the area into a massive breeding ground for mosquitoes, posing an acute threat of dengue, malaria, and waterborne epidemics.
Kindly deploy water suction pumps immediately, order comprehensive drainage declogging, and arrange disinfectant DDT fogging on a priority basis.
Thanking you.
Yours faithfully,
Residents of Ward 14,
Date: [Exam Date]`
      }
    ]
  },
  english: {
    short: [
      {
        topic: "Active and Passive Voice Transformation",
        q_hi: "Active Voice से Passive Voice में बदलने के प्रमुख नियम उदाहरण सहित समझाइए।",
        q_en: "Explain the general rules of changing Active Voice into Passive Voice with suitable examples.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण अंग्रेजी व्याकरण हल):
Active से Passive बनाने के 4 मूल नियम:
1. Active Voice का Object ⟹ Passive Voice का Subject बन जाता है।
2. हमेशा मुख्य क्रिया की तीसरी अवस्था (Past Participle - V3) का प्रयोग होता है।
3. नए Object से पहले सामान्यतः 'by' प्रीपोज़िशन लगाई जाती है।
4. सहायक क्रिया (Helping Verb) काल (Tense) के अनुसार बदलती है:
   - Simple Present: is/am/are + V3 (He writes a letter ⟹ A letter is written by him).
   - Simple Past: was/were + V3 (She helped me ⟹ I was helped by her).
   - Present Continuous: is/am/are + being + V3 (They are playing cricket ⟹ Cricket is being played by them).
   - Present Perfect: has/have + been + V3 (He has done the work ⟹ The work has been done by him).
   - Modal Auxiliary: Modal + be + V3 (You can solve this puzzle ⟹ This puzzle can be solved by you).

★ अंकन नियम: V3 का सही प्रयोग और काल के अनुसार 'being' या 'been' जोड़ने पर पूरे अंक मिलते हैं।`,
        a_en: `Model Solution (2/3 Marks):
Core Rules of Active to Passive Voice Transformation:
1. Object of active becomes subject of passive.
2. Verb is always in third form (V3 - Past Participle).
3. Preposition 'by' introduces the doer/agent.
4. Auxiliary verb adjustments:
   - Present Simple: is/am/are + V3 (He writes a letter ⟹ A letter is written by him).
   - Continuous: be-verb + being + V3 (They are singing songs ⟹ Songs are being sung by them).
   - Perfect: has/have/had + been + V3 (She has finished it ⟹ It has been finished by her).
   - Modals: modal + be + V3 (He can do it ⟹ It can be done by him).`
      },
      {
        topic: "Direct and Indirect Speech Rules",
        q_hi: "Direct Speech से Indirect Speech में परिवर्तन के नियम (Tense व Pronoun) उदाहरण सहित समझाइए।",
        q_en: "State the rules of converting Direct Speech into Indirect Speech with respect to Tense and Pronouns.",
        a_hi: `आदर्श उत्तर (2/3 अंक सम्पूर्ण हल):
यदि Reporting Verb भूतकाल (Past Tense - said/told) में हो, तो Reported Speech का Tense निम्नानुसार बदलता है:
1. Simple Present ⟹ Simple Past (writes ⟹ wrote)
2. Present Continuous ⟹ Past Continuous (is singing ⟹ was singing)
3. Present Perfect ⟹ Past Perfect (has gone ⟹ had gone)
4. Simple Past ⟹ Past Perfect (went ⟹ had gone)
5. Will/Shall ⟹ Would/Should, Can ⟹ Could, May ⟹ Might

सर्वनाम परिवर्तन (SON नियम):
- First Person (I, we) ⟹ Subject के अनुसार
- Second Person (you) ⟹ Object के अनुसार
- Third Person (he, she, it, they) ⟹ No Change (कोई परिवर्तन नहीं)

उदाहरण:
Direct: Ram said, "I am reading my book."
Indirect: Ram said that he was reading his book.

★ अपवाद: सार्वभौमिक सत्य (Universal Truth) या ऐतिहासिक तथ्य का Tense कभी नहीं बदलता (e.g., The teacher said, "The earth revolves round the sun.").`,
        a_en: `Model Solution (2/3 Marks):
Rules for Direct to Indirect Speech (When Reporting Verb is Past):
1. Tense Backshift:
   - Present Simple ⟹ Past Simple (write ⟹ wrote)
   - Present Continuous ⟹ Past Continuous (is reading ⟹ was reading)
   - Present Perfect ⟹ Past Perfect (has done ⟹ had done)
   - Past Simple ⟹ Past Perfect (saw ⟹ had seen)
2. Pronoun Shift (SON Formula): 1st person changes with Subject; 2nd person changes with Object; 3rd person remains unchanged.
3. Exception: Universal truths and habitual facts never change tense (e.g., The teacher said, "Water boils at 100°C.").`
      }
    ],
    long: [
      {
        topic: "Formal Letter to Editor (Reckless Driving Hazards)",
        q_hi: "किसी राष्ट्रीय दैनिक समाचार पत्र के संपादक को पत्र लिखिए जिसमें क्षेत्र में बेलगाम गति से वाहन चलाने व सड़क दुर्घटनाओं पर चिंता व्यक्त की गई हो तथा समाधान सुझाए गए हों।",
        q_en: "Write a letter to the Editor of a National Daily expressing concern over reckless driving and road accidents in your city, suggesting effective measures.",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण अंग्रेजी पत्र प्रारूप):
Examination Hall,
City Center, New Delhi.
Date: 25th September 2026

The Editor,
The Times of India,
Bahadur Shah Zafar Marg, New Delhi.

Subject: Grave concern over the menace of reckless driving and rising road accidents.

Sir/Madam,
Through the esteemed columns of your widely circulated newspaper, I wish to draw the urgent attention of the traffic authorities and the general public towards the escalating menace of reckless and underage driving in our city.

In recent months, our arterial roads have witnessed an alarming surge in fatal road accidents. Young motorists and commercial vehicle drivers frequently jump red signals, indulge in dangerous speed-racing, and drive on the wrong side of the road with blatant disregard for traffic laws. Pedestrians, cyclists, and senior citizens find it perilous even to cross designated zebra crossings. The menace is aggravated by widespread driving under the influence of alcohol and the rampant use of mobile phones while steering.

To curb this carnage and restore road discipline, the traffic administration must enforce stringent measures. Speed-monitoring radar cameras and automated challan systems must be installed at all major intersections. Heavy spot fines, impounding of vehicles, and temporary suspension of driving licenses should be strictly enforced against repeat offenders. Furthermore, continuous awareness campaigns in schools and colleges regarding helmet compliance and defensive driving are essential.

I earnestly hope that this letter will awaken the concerned authorities to take prompt, decisive action to ensure road safety.

Yours sincerely,
A Concerned Citizen
(Name & Signature)

★ अंकन विवरण: Sender's address, Date, Receiver, Subject, Salutation (1 Mark) + Body with problems & remedies (3 Marks) + Complimentary close (1 Mark). Total 5/5 Marks.`,
        a_en: `Model Solution (5 Marks Formal Letter):
Examination Hall,
New Delhi.
25th September 2026

The Editor,
The National Herald,
New Delhi.

Subject: Escalating menace of reckless driving and road safety hazards.

Sir,
Through the columns of your esteemed daily, I wish to draw the attention of the authorities to the increasing incidence of reckless driving in our city. Speed-racing, signal jumping, and drunken driving have made our streets extremely hazardous for pedestrians and commuters alike.
I urge the traffic police to install AI-enabled speed cameras, enforce heavy spot fines, and strictly penalize underage driving. Public awareness drives in schools and colleges are equally crucial.
Prompt action is urgently solicited.
Yours faithfully,
Rohit Sharma / Ritu Verma`
      }
    ]
  },
  sanskrit: {
    short: [
      {
        topic: "संस्कृत स्वर सन्धि सूत्राणि (Sanskrit Vowel Sandhi Sutras)",
        q_hi: "संस्कृत में 'अकः सवर्णे दीर्घः' तथा 'आद्गुणः' सूत्रों का अर्थ लिखकर दो-दो उदाहरण दीजिए।",
        q_en: "Explain the Sanskrit Sandhi sutras 'Aka Savarne Dirghah' and 'Adgunah' with two examples each.",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण संस्कृत व्याकरण हल):
1. सूत्रम्: 'अकः सवर्णे दीर्घः' (दीर्घ सन्धि)
अर्थ: अक् प्रत्याहार के वर्णों (अ, इ, उ, ऋ) के बाद यदि समान स्वर (सवर्ण) आए, तो दोनों मिलकर दीर्घ हो जाते हैं।
यथा (उदाहरण):
- विद्या + आलयः = विद्यालयः (आ + आ = आ)
- मुनि + इन्द्रः = मुनीन्द्रः (इ + इ = ई)
- भानु + उदयः = भानूदयः (उ + उ = ऊ)

2. सूत्रम्: 'आद्गुणः' (गुण सन्धि)
अर्थ: अवर्ण (अ या आ) के बाद यदि ह्रस्व या दीर्घ इ, उ, ऋ, ऌ आए, तो दोनों के स्थान पर क्रमशः ए, ओ, अर्, अल् गुण एकादेश हो जाता है।
यथा (उदाहरण):
- देव + इन्द्रः = देवेन्द्रः (अ + इ = ए)
- सूर्य + उदयः = सूर्योदयः (अ + उ = ओ)
- महा + ऋषिः = महर्षिः (आ + ऋ = अर्)

★ अंकन युक्ति: सूत्र का नाम, नियम तथा संधि-विच्छेद तीनों लिखने पर परीक्षक पूरे 2/2 अंक देता है।`,
        a_en: `Model Solution (2 Marks):
1. Sutra: 'Aka Savarne Dirghah' (Dirgha Sandhi)
Meaning: When similar vowels follow Ak vowels (a, i, u, ri), both combine into their long counterpart.
Examples: Vidya + Alayah = Vidyalayah; Muni + Indrah = Munindrah.
2. Sutra: 'Adgunah' (Guna Sandhi)
Meaning: When 'a' or 'aa' is followed by 'i, u, ri', they turn into 'e, o, ar'.
Examples: Deva + Indrah = Devendrah; Surya + Udayah = Suryodayah.`
      },
      {
        topic: "संस्कृत कारक एवं विभक्ति (Karak & Vibhakti Rules)",
        q_hi: "'सहार्थे तृतीया' तथा 'नमः स्वस्ति स्वाहा स्वधाऽलंवषड्योगाच्च' सूत्रों को सोदाहरण स्पष्ट कीजिए।",
        q_en: "Explain the Sanskrit Vibhakti sutras 'Saharthe Tritiya' and 'Namah Swasti...' with examples.",
        a_hi: `आदर्श उत्तर (2 अंक सम्पूर्ण हल):
1. 'सहार्थे तृतीया' (करण / सहयुक्त तृतीया):
सह (साथ), साकम्, सार्धम्, समम् आदि सहार्थक शब्दों के योग में अप्रधान कर्ता में तृतीया विभक्ति होती है।
यथा:
- रामेण सह सीता वनम् अगच्छत्। (राम के साथ सीता वन गईं - 'रामेण' में तृतीया)
- जनकः पुत्रेण सह गच्छति। (पिता पुत्र के साथ जाता है)

2. 'नमः स्वस्ति स्वाहा स्वधाऽलंवषड्योगाच्च' (सम्प्रदान चतुर्थी):
नमः (नमस्कार), स्वस्ति (कल्याण), स्वाहा (हवि समर्पण) आदि शब्दों के योग में चतुर्थी विभक्ति प्रयुक्त होती है।
यथा:
- गुरवे नमः। (गुरु जी को नमस्कार - 'गुरवे' में चतुर्थी)
- श्री गणेशाय नमः। (श्री गणेश जी को नमस्कार)
- प्रजाभ्यः स्वस्ति। (प्रजा का कल्याण हो)

★ टॉपर टिप: रेखांकित पद में विभक्ति और उसका कारण सूत्र सहित लिखने पर पूरे अंक मिलते हैं।`,
        a_en: `Model Solution (2 Marks):
1. 'Saharthe Tritiya': The 3rd case is used with words meaning 'along with' (Saha, Saakam, Sardham).
Example: Ramena saha Sita vanam agachhat (Sita went to the forest with Rama - 'Ramena' is 3rd case).
2. 'Namah Swasti...': The 4th case (Dative) is used with words of salutation (Namah, Swasti).
Example: Gurave namah (Salutations to the Teacher - 'Gurave' is 4th case); Shri Ganeshaya namah.`
      }
    ],
    long: [
      {
        topic: "संस्कृत श्लोक सप्रसंग व्याख्या (Sloka Explanation with Anvaya & Bhavartha)",
        q_hi: "निम्नलिखित श्लोक का अन्वय, शब्दार्थ एवं सप्रसंग भावार्थ लिखिए:\n'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।\nन हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः॥'",
        q_en: "Write the Anvaya, Word Meanings, and Comprehensive Explanation for the Sanskrit Sloka on Diligence.",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण सप्रसंग हल):
1. संदर्भ:
प्रस्तुत श्लोक हमारी संस्कृत पाठ्यपुस्तक के नीतिपरक / सुभाषितम् पाठ से उद्धृत है। इसमें परिश्रम (उद्योग) के महत्व का प्रतिपादन किया गया है।

2. अन्वय (Anvaya):
कार्याणि उद्यमेन हि सिध्यन्ति, मनोरथैः न (सिध्यन्ति)। हि सुप्तस्य सिंहस्य मुखे मृगाः न प्रविशन्ति।

3. शब्दार्थ:
- उद्यमेन = परिश्रम से / मेहनत से (By hard work)
- मनोरथैः = केवल मन की इच्छाओं से (By merely wishing)
- सिध्यन्ति = सिद्ध / सफल होते हैं (Succeed)
- सुप्तस्य = सोए हुए (Of sleeping)
- मृगाः = हिरण / पशु (Deer/animals)

4. सरल भावार्थ:
संसार में सभी कार्य केवल कठिन परिश्रम और उद्यम करने से ही सिद्ध (सफल) होते हैं, मात्र मन में इच्छा करने या सोचने से कोई कार्य पूरा नहीं होता।
उदाहरण देते हुए कहा गया है कि सिंह यद्यपि जंगल का सबसे पराक्रमी राजा होता है, फिर भी यदि वह सोता रहे तो हिरण स्वयं चलकर उसके मुंह में प्रवेश नहीं करते; उसे भी अपनी क्षुधा शांत करने हेतु आखेट (शिकार) का परिश्रम करना ही पड़ता है।

5. शिक्षा / नीतिगत संदेश (+2 अतिरिक्त पंक्तियां):
इस श्लोक से हमें यह शाश्वत प्रेरणा मिलती है कि जीवन में सफलता, विद्या एवं प्रगति प्राप्त करने हेतु आलस्य का त्याग कर निरंतर कर्मशील रहना चाहिए। कर्म ही पूजा है।

★ परीक्षक 5/5 अंकन योजना: संदर्भ (1 अंक) + अन्वय व शब्दार्थ (1.5 अंक) + सप्रसंग भावार्थ (2 अंक) + नीतिगत संदेश (0.5 अंक)। कुल 5/5 अंक।`,
        a_en: `Model Solution (5 Marks Sanskrit Sloka):
Sloka: 'Udyamena hi sidhyanti karyani na manorathaih, Na hi suptasya simhasya pravishanti mukhe mrigah.'
1. Anvaya: Karyani udyamena hi sidhyanti, manorathaih na. Hi suptasya simhasya mukhe mrigah na pravishanti.
2. Word Meanings: Udyamena = By hard work; Manorathaih = By mere wishes; Sidhyanti = Are accomplished; Suptasya = Sleeping; Mrigah = Deer/prey.
3. Meaning & Moral: All tasks in this world are accomplished only through diligence and hard work, never by mere daydreaming or wishes. Even the lion, king of the forest, has to hunt actively; deer do not walk into the mouth of a sleeping lion. Hard work is indispensable for success.`
      }
    ]
  }
,
  physics: {
    short: [
      {
        topic: "गाउस का नियम (Gauss Law in Electrostatics)",
        q_hi: "स्थिर वैद्युतिकी में गाउस का नियम लिखिए तथा इसका गणितीय सूत्र बताइए।",
        q_en: "State Gauss's Law in Electrostatics and give its mathematical expression.",
        a_hi: `आदर्श उत्तर (2/3 अंक पूर्ण हल):
1. नियम का कथन:
किसी बंद काल्पनिक पृष्ठ (गाउसीय पृष्ठ) से गुजरने वाला कुल विद्युत फ्लक्स (Φ_E), उस बंद पृष्ठ द्वारा परिबद्ध कुल नेट आवेश (q_in) का 1/ε₀ गुना होता है।

2. गणितीय व्यंजक:
Φ_E = ∮ ec{E} · dec{A} = q_in / ε₀
(जहाँ ε₀ = निर्वात की विद्युतशीलता = 8.854 × 10⁻¹² C² N⁻¹ m⁻²)

★ टॉपर प्रस्तुति निर्देश (+2 लाइन अंकन लाभ):
- यदि बंद पृष्ठ के भीतर कोई नेट आवेश नहीं है (q_in = 0), तो कुल निर्गत विद्युत फ्लक्स शून्य होगा।
- गाउस का नियम सममित आवेश वितरण (तार, चादर, गोला) के विद्युत क्षेत्र ज्ञात करने का सबसे सरल साधन है।`,
        a_en: `Model Solution (2 Marks):
Gauss's Law states that the total electric flux linked with a closed Gaussian surface is equal to 1/ε₀ times the net charge enclosed inside it: Φ_E = ∮ E·dA = q_enclosed / ε₀.`
      },
      {
        topic: "विद्युत विभव प्रवणता (Potential Gradient)",
        q_hi: "विभव प्रवणता को परिभाषित कीजिए तथा विद्युत क्षेत्र की तीव्रता (E) और विभव प्रवणता में संबंध स्थापित कीजिए।",
        q_en: "Define Potential Gradient and state its relation with Electric Field Intensity (E).",
        a_hi: `आदर्श उत्तर (2 अंक पूर्ण हल):
1. परिभाषा:
विद्युत क्षेत्र की दिशा में दूरी (r) के साथ विभव (V) में होने वाले परिवर्तन की दर को 'विभव प्रवणता' (Potential Gradient) कहते हैं।

2. संबंध:
E = - dV/dr
(ऋणात्मक चिह्न यह प्रदर्शित करता है कि विद्युत क्षेत्र की दिशा में चलने पर विद्युत विभव सदैव घटता है)।
मात्रक: V/m (वोल्ट/मीटर) अथवा N/C।`,
        a_en: `Model Solution (2 Marks):
Potential gradient is the rate of change of electric potential with respect to distance along the field line: E = - dV/dr. The negative sign indicates potential decreases in field direction.`
      }
    ],
    long: [
      {
        topic: "हाइगेन्स तरंग सिद्धांत - प्रकाश का अपवर्तन (Refraction by Huygens Principle)",
        q_hi: "हाइगेन्स के द्वितीयक तरंगिकाओं के सिद्धांत का उपयोग करके प्रकाश के अपवर्तन के नियमों (स्नेल के नियम) का निगमन कीजिए।",
        q_en: "Using Huygens' principle of secondary wavelets, derive the laws of refraction of light (Snell's Law).",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण बोर्ड ब्लूप्रिंट):
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
2. स्पष्ट नामांकित किरण आरेख (Ray Diagram) पेंसिल व स्केल से बनाएं, जिससे परीक्षक पूरे 5/5 अंक प्रदान करे।`,
        a_en: `Model Solution (5 Marks Huygens Refraction):
Rigorous derivation of Snell's Law sin i / sin r = v1 / v2 = n2 / n1 using geometry of triangles ΔABC and ΔADC formed by secondary wavelets.`
      }
    ]
  },
  chemistry: {
    short: [
      {
        topic: "राउल्ट का नियम (Raoult's Law)",
        q_hi: "वाष्पशील द्रवों के विलयन हेतु राउल्ट का नियम लिखिए तथा इसका गणितीय रूप दीजिए।",
        q_en: "State Raoult's Law for solutions of volatile liquids with mathematical formula.",
        a_hi: `आदर्श उत्तर (2 अंक पूर्ण हल):
1. नियम का कथन:
निश्चित ताप पर वाष्पशील द्रवों के विलयन में प्रत्येक घटक का आंशिक वाष्प दाब (p_A), विलयन में उसके मोल अंश (x_A) के समानुपाती होता है।

2. गणितीय व्यंजक:
p_A = p_A° · x_A   तथा   p_B = p_B° · x_B
डाल्टन के आंशिक दाब के नियमानुसार कुल दाब:
P_total = p_A + p_B = p_A° · x_A + p_B° · x_B

★ परीक्षक टिप: p_A° शुद्ध घटक A का वाष्प दाब है। अवाष्पशील विलेय मिलाने पर वाष्प दाब का आपेक्षिक अवनमन (p° - p)/p° = x_B होता है।`,
        a_en: `Model Solution (2 Marks):
Raoult's law states that the partial vapour pressure of each volatile component in solution is directly proportional to its mole fraction: p_A = p_A° · x_A.`
      },
      {
        topic: "नेर्नस्ट समीकरण (Nernst Equation)",
        q_hi: "इलेक्ट्रोड विभव हेतु नेर्नस्ट समीकरण लिखिए तथा 298 K ताप पर इसका सरल रूप प्रस्तुत कीजिए।",
        q_en: "Write the Nernst Equation for electrode potential and express it at 298 K.",
        a_hi: `आदर्श उत्तर (2 अंक):
अभिक्रिया Mⁿ⁺(aq) + ne⁻ ⟶ M(s) के लिए:
E = E° - (RT / nF) ln(1 / [Mⁿ⁺])
298 K ताप पर (R = 8.314 J/K·mol, F = 96500 C):
E = E° - (0.0591 / n) log₁₀(1 / [Mⁿ⁺])
= E° + (0.0591 / n) log₁₀[Mⁿ⁺]`,
        a_en: `Model Solution (2 Marks):
Nernst Equation at 298 K: E = E° - (0.0591 / n) log(1/[Mⁿ⁺]).`
      }
    ],
    long: [
      {
        topic: "प्रथम कोटि की अभिक्रिया (Integrated Rate Equation for First Order Reaction)",
        q_hi: "प्रथम कोटि की अभिक्रिया के लिए समाकलित वेग समीकरण (Integrated Rate Expression) का निगमन कीजिए तथा सिद्ध कीजिए कि इसका अर्धायु काल (t_1/2) प्रारंभिक सांद्रता पर निर्भर नहीं करता।",
        q_en: "Derive the integrated rate equation for a first-order reaction and prove that half-life (t_1/2) is independent of initial concentration.",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण स्टेप मार्किंग):
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

★ टॉपर टिप (+2 लाइन): उत्तर के अंत में t_1/2 = 0.693/k को आयताकार बॉक्स में बंद करें और k का मात्रक (s⁻¹ या समय⁻¹) स्पष्ट लिखें।`,
        a_en: `Model Solution (5 Marks First Order Kinetics):
Full step-by-step calculus integration from -d[R]/dt = k[R] to k = (2.303/t) log([R]₀/[R]) and derivation of t_1/2 = 0.693/k showing zero dependency on initial concentration.`
      }
    ]
  },
  biology: {
    short: [
      {
        topic: "दोहरा निषेचन एवं त्रिसंलयन (Double Fertilization & Triple Fusion)",
        q_hi: "आवृतबीजी पादपों में 'दोहरा निषेचन' (Double Fertilization) किसे कहते हैं? इसका क्या महत्व है?",
        q_en: "What is Double Fertilization in Angiosperms? Explain its significance.",
        a_hi: `आदर्श उत्तर (2/3 अंक):
1. प्रक्रिया:
पराग नलिका से भ्रूणपोष में मुक्त दो नर युग्मकों में से:
- प्रथम नर युग्मक (n) + अंड कोशिका (n) ⟶ युग्मनज (2n) [सत्य निषेचन / Syngamy]
- द्वितीय नर युग्मक (n) + द्वितीयक केंद्रक (2n) ⟶ प्राथमिक भ्रूणपोष केंद्रक (3n) [त्रिसंलयन / Triple Fusion]
इस प्रकार एक ही भ्रूणकोष में दो बार निषेचन होने के कारण इसे 'दोहरा निषेचन' कहते हैं।

2. जैविक महत्व:
त्रिसंलयन से त्रिगुणित (3n) भ्रूणपोष बनता है, जो विकसित हो रहे भ्रूण (Embryo) को प्रचुर पोषण प्रदान करता है।`,
        a_en: `Model Solution (2 Marks):
Double fertilization involves syngamy (male gamete + egg cell -> 2n zygote) and triple fusion (second male gamete + polar nuclei -> 3n endosperm) ensuring nutrition for the developing seed.`
      }
    ],
    long: [
      {
        topic: "डीएनए की द्विकुंडलिनी संरचना (Watson & Crick Double Helix Model)",
        q_hi: "वाटसन एवं क्रिक द्वारा प्रस्तुत डीएनए की द्विकुंडलिनी संरचना (Double Helix Model) की मुख्य विशेषताओं का सचित्र वर्णन कीजिए।",
        q_en: "Describe the salient features of the Watson and Crick Double Helix DNA model with labeled illustration.",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण मॉडल विवरण):
1. ऐतिहासिक संदर्भ:
1953 में जेम्स वाटसन और फ्रांसिस क्रिक ने रोज़ालिंड फ्रैंकलिन व विल्किंस के एक्स-रे विवर्तन आंकड़ों के आधार पर डीएनए का B-फॉर्म मॉडल प्रस्तुत किया।

2. प्रमुख संरचनात्मक विशेषताएं (Salient Features):
(i) दो पॉलीपेप्टाइड शृंखलाएं: डीएनए दो पॉलीन्यूक्लियोटाइड रज्जुक का बना होता है, जिसकी रीढ़ शर्करा-फॉस्फेट की बनी होती है तथा क्षारक भीतर की ओर प्रक्षेपित होते हैं।
(ii) प्रति-समानांतर ध्रुवता (Anti-parallel Polarity): एक रज्जुक की ध्रुवता 5' ⟶ 3' तथा दूसरे की 3' ⟶ 5' होती है।
(iii) पूरक क्षार युग्मन (Chargaff's Rule): प्यूरिन सदैव पिरिमिडीन से जुड़ता है। एडेनिन (A) दो हाइड्रोजन बंधों द्वारा थाइमिन (T) से (A = T) तथा ग्वानिन (G) तीन हाइड्रोजन बंधों द्वारा साइटोसिन (C) से (G ≡ C) जुड़ता है।
(iv) कुंडल का आयाम: द्विकुंडली का व्यास 2.0 nm (20 Å) होता है। एक पूर्ण घुमाव (Pitch) की लंबाई 3.4 nm (34 Å) होती है जिसमें 10 क्षार युग्म (bp) होते हैं। दो क्रमागत क्षार युग्मों के बीच की दूरी 0.34 nm होती है।

★ टॉपर प्रस्तुति (+2 अंकन लाभ):
5' और 3' सिरों को स्पष्ट दर्शाने वाला साफ-सुथरा नामांकित रेखाचित्र अवश्य बनाएं तथा चारगाफ नियम (A+G = T+C) का उल्लेख करें।`,
        a_en: `Model Solution (5 Marks DNA Structure):
Salient features of Watson-Crick B-DNA: anti-parallel 5'->3' and 3'->5' strands, sugar-phosphate backbone, complementary base pairing (A=T with 2 H-bonds, G≡C with 3 H-bonds), 2.0 nm diameter, 3.4 nm helical pitch containing 10 base pairs.`
      }
    ]
  },
  accountancy: {
    short: [
      {
        topic: "पुनर्मूल्यांकन खाता (Revaluation Account)",
        q_hi: "साझेदारी फर्म में पुनर्मूल्यांकन खाता (Revaluation Account) कब और क्यों बनाया जाता है?",
        q_en: "When and why is a Revaluation Account prepared in a partnership firm?",
        a_hi: `आदर्श उत्तर (2 अंक):
1. कब बनाया जाता है:
नए साझेदार के प्रवेश, किसी साझेदार के अवकाश ग्रहण (Retirement), मृत्यु अथवा लाभ-विभाजन अनुपात में परिवर्तन के समय।

2. उद्देश्य / प्रकृति:
यह एक नाममात्र (Nominal) खाता है। संपत्तियों के मूल्यों में वृद्धि/कमी तथा दायित्वों के पुनर्मूल्यांकन से होने वाले लाभ या हानि का निर्धारण करने हेतु बनाया जाता है। अंतिम लाभ/हानि को पुराने साझेदारों में उनके पुराने लाभ-विभाजन अनुपात में हस्तांतरित किया जाता है।`,
        a_en: `Model Solution (2 Marks):
Revaluation A/c is a nominal account prepared during reconstitution of partnership to record changes in asset/liability values, distributing net profit/loss to old partners in old ratio.`
      }
    ],
    long: [
      {
        topic: "अंशों का जब्तीकरण एवं पुनर्निर्गमन (Forfeiture and Re-issue of Shares Journal Entries)",
        q_hi: "अंशों के जब्तीकरण (Forfeiture) तथा उनके बट्टे पर पुनर्निर्गमन (Re-issue at Discount) के समय की जाने वाली आवश्यक जर्नल प्रविष्टियां लिखिए।",
        q_en: "Pass the necessary Journal Entries for forfeiture of shares and their re-issue at discount with transfer to Capital Reserve.",
        a_hi: `आदर्श उत्तर (5 अंक पूर्ण अकाउंटेंसी हल):
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
- पूंजीगत संचय की गणना सूत्र सहित दर्शाएं: [Total Forfeiture Amount on re-issued shares - Discount allowed on re-issue].`,
        a_en: `Model Solution (5 Marks Share Forfeiture Accounting):
Standard 3-stage journal accounting entries for share forfeiture, re-issue at discount, and capital reserve transfer with clear narration and 5-column journal ledger format.`
      }
    ]
  },
  business: {
    short: [
      {
        topic: "सोपान श्रृंखला एवं गैंग प्लैंक (Scalar Chain & Gang Plank)",
        q_hi: "फेयोल के 'सोपान श्रृंखला' (Scalar Chain) सिद्धांत तथा इसमें 'गैंग प्लैंक' (Gang Plank) की भूमिका स्पष्ट कीजिए।",
        q_en: "Explain Henri Fayol's 'Scalar Chain' principle and the role of 'Gang Plank'.",
        a_hi: `आदर्श उत्तर (2/3 अंक):
1. सोपान श्रृंखला:
उच्चतम स्तर से निम्नतम स्तर तक संप्रेषण एवं प्राधिकार की औपचारिक रेखा को सोपान श्रृंखला कहते हैं। सूचना सदैव क्रमबद्ध रूप से ऊपर से नीचे या नीचे से ऊपर जाती है।

2. गैंग प्लैंक (प्रत्यक्ष संपर्क):
आपातकाल की स्थिति में संप्रेषण में अनावश्यक देरी से बचने हेतु एक ही स्तर के दो अधिकारी सोपान श्रृंखला का उल्लंघन करते हुए प्रत्यक्ष संपर्क स्थापित कर सकते हैं, जिसे गैंग प्लैंक (Gang Plank) कहा जाता है।`,
        a_en: `Model Solution (2 Marks):
Scalar chain is the unbroken chain of authority and communication from highest to lowest rank. Gang Plank is an exception allowing direct communication between peers in emergencies to avoid delays.`
      }
    ],
    long: [
      {
        topic: "विपणन मिश्रण के 4Ps (The 4Ps of Marketing Mix)",
        q_hi: "विपणन मिश्रण (Marketing Mix) के चारों घटकों (Product, Price, Place, Promotion) का विस्तारपूर्वक विवेचन कीजिए।",
        q_en: "Discuss in detail the four elements (4Ps) of Marketing Mix: Product, Price, Place, and Promotion.",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण रूपरेखा):
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
चारों Ps का एक सुव्यवस्थित चक्राकार आरेख (Flow Diagram) बनाएं। प्रत्येक बिंदु के साथ 1-1 व्यावहारिक उदाहरण (जैसे Apple या अमूल) देने पर परीक्षक पूरे 5 अंक देता है।`,
        a_en: `Model Solution (5 Marks Marketing Mix):
Comprehensive analysis of 4Ps: Product (features, branding, packaging), Price (cost-plus, market penetration), Place (channels, logistics, warehousing), Promotion (advertising, sales promo, personal selling).`
      }
    ]
  },
  economics: {
    short: [
      {
        topic: "सकल घरेलू उत्पाद एवं साधन लागत (GDPmp vs NNPfc)",
        q_hi: "बाजार मूल्य पर सकल घरेलू उत्पाद (GDP_MP) से साधन लागत पर शुद्ध राष्ट्रीय उत्पाद (NNP_FC - राष्ट्रीय आय) कैसे ज्ञात किया जाता है?",
        q_en: "How is Net National Product at Factor Cost (NNP_FC / National Income) derived from GDP_MP?",
        a_hi: `आदर्श उत्तर (2 अंक):
समीकरण:
NNP_FC = GDP_MP - मूल्यह्रास (Depreciation) + विदेशों से शुद्ध साधन आय (NFIA) - शुद्ध अप्रत्यक्ष कर (NIT)

जहाँ:
1. Gross से Net जाने हेतु: (-) Depreciation
2. Domestic से National जाने हेतु: (+) NFIA
3. Market Price से Factor Cost जाने हेतु: (-) NIT (अप्रत्यक्ष कर - आर्थिक सहायता)`,
        a_en: `Model Solution (2 Marks):
NNP_FC = GDP_MP - Depreciation + NFIA - NIT (Indirect Taxes - Subsidies).`
      }
    ],
    long: [
      {
        topic: "केंद्रीय बैंक के साख नियंत्रण के उपाय (Credit Control by Central Bank / RBI)",
        q_hi: "भारतीय रिजर्व बैंक (RBI) द्वारा मुद्रा आपूर्ति एवं साख पर नियंत्रण के लिए प्रयुक्त मात्रात्मक एवं गुणात्मक उपकरणों का विस्तृत वर्णन कीजिए।",
        q_en: "Explain the Quantitative and Qualitative instruments used by the Reserve Bank of India (RBI) for credit control.",
        a_hi: `आदर्श उत्तर (5 अंक सम्पूर्ण हल):
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

★ टॉपर प्रस्तुति (+2 पंक्तियां): एक तुलनात्मक चार्ट (मात्रात्मक बनाम गुणात्मक) अवश्य बनाएं और वर्तमान भारतीय संदर्भ में मुद्रास्फीति नियंत्रण का उल्लेख करें।`,
        a_en: `Model Solution (5 Marks Monetary Policy):
Detailed breakdown of Quantitative measures (Repo rate, CRR, SLR, OMO) and Qualitative measures (Margin requirements, moral suasion, selective credit control) used by RBI.`
      }
    ]
  },
  history: {
    short: [
      {
        topic: "हड़प्पा सभ्यता का नगर नियोजन (Harappan Town Planning)",
        q_hi: "हड़प्पा सभ्यता की नगर नियोजन प्रणाली एवं जल निकासी व्यवस्था की दो प्रमुख विशेषताएं लिखिए।",
        q_en: "Write two key features of Harappan town planning and drainage system.",
        a_hi: `आदर्श उत्तर (2 अंक):
1. ग्रिड पद्धति (Grid System): नगर दो भागों (पश्चिमी दुर्ग एवं निचला शहर) में विभाजित थे। सड़कें एक-दूसरे को समकोण (90°) पर काटती थीं।
2. वैज्ञानिक जल निकासी (Drainage System): प्रत्येक घर की नाली सड़क की मुख्य ढकी हुई नाली से जुड़ती थी। नालियों में नियमित दूरी पर सफाई हेतु सोखते गड्ढे (Manholes) बने थे।`,
        a_en: `Model Solution (2 Marks):
Grid pattern town planning intersecting at right angles and covered domestic drainage connected to street drains with regular inspection manholes.`
      }
    ],
    long: [
      {
        topic: "महात्मा गांधी और असहयोग आंदोलन (Non-Cooperation Movement 1920-22)",
        q_hi: "महात्मा गांधी द्वारा 1920 में असहयोग आंदोलन शुरू करने के क्या कारण थे? इसका स्वरूप क्या था तथा इसे अचानक क्यों वापस लिया गया?",
        q_en: "What were the causes, nature, and reasons for the sudden withdrawal of the Non-Cooperation Movement by Mahatma Gandhi?",
        a_hi: `आदर्श उत्तर (5 अंक विश्लेषणात्मक हल):
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

★ टॉपर प्रस्तुति निष्कर्ष (+2 पंक्तियां): यद्यपि आंदोलन स्थगित हुआ, किंतु इसने स्वतंत्रता संग्राम को उच्च वर्ग से निकालकर आम जनता, किसानों व श्रमिकों का जन-आंदोलन बना दिया।`,
        a_en: `Model Solution (5 Marks Non-Cooperation Movement):
Causes (Rowlatt Act, Jallianwala Bagh, Khilafat), methods of boycott and constructive work, and Gandhi's withdrawal following the Chauri Chaura incident upholding non-violence.`
      }
    ]
  },
  polity: {
    short: [
      {
        topic: "संविधान - मौलिक कर्तव्य (Fundamental Duties - Article 51A)",
        q_hi: "भारतीय संविधान में मौलिक कर्तव्यों को किस संविधान संशोधन द्वारा जोड़ा गया तथा इनकी वर्तमान संख्या कितनी है?",
        q_en: "By which Constitutional Amendment were Fundamental Duties added to the Indian Constitution, and what is their current number?",
        a_hi: `आदर्श उत्तर (2 अंक):
1. संशोधन एवं समिति: 42वें संविधान संशोधन अधिनियम 1976 द्वारा सरदार स्वर्ण सिंह समिति की सिफारिश पर संविधान के भाग 4(क) में अनुच्छेद 51(क) के तहत 10 मौलिक कर्तव्य जोड़े गए।
2. वर्तमान संख्या: 86वें संविधान संशोधन 2002 द्वारा 11वाँ कर्तव्य (6 से 14 वर्ष के बच्चों को शिक्षा का अवसर) जोड़ा गया, अतः वर्तमान में कुल 11 मौलिक कर्तव्य हैं।`,
        a_en: `Model Solution (2 Marks):
Added by 42nd Amendment 1976 on Swaran Singh Committee recommendation; expanded from 10 to 11 by the 86th Amendment 2002 (Article 51A).`
      }
    ],
    long: [
      {
        topic: "संवैधानिक उपचारों का अधिकार एवं 5 रिटें (Article 32 - Writs)",
        q_hi: "सर्वोच्च न्यायालय द्वारा मौलिक अधिकारों के संरक्षण हेतु अनुच्छेद 32 के तहत जारी की जाने वाली 5 रिटों (Writs) का विस्तृत विवेचन कीजिए।",
        q_en: "Explain in detail the 5 types of Writs issued by the Supreme Court under Article 32 for the enforcement of Fundamental Rights.",
        a_hi: `आदर्श उत्तर (5 अंक संविधान ब्लूप्रिंट):
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

★ टॉपर प्रस्तुति निर्देश: सर्वोच्च न्यायालय (अनुच्छेद 32) एवं उच्च न्यायालय (अनुच्छेद 226) की रिट अधिकारिता के अंतर का 1 पंक्ति में उल्लेख अवश्य करें।`,
        a_en: `Model Solution (5 Marks Constitutional Writs):
Detailed legal breakdown of Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo-Warranto under Article 32, highlighting their scope, safeguards, and judicial authority.`
      }
    ]
  },
  geography: {
    short: [
      {
        topic: "नवनिश्चयवाद (Neo-Determinism / Stop and Go)",
        q_hi: "ग्रिफिथ टेलर द्वारा प्रतिपादित 'नवनिश्चयवाद' (रुको और जाओ निश्चयवाद) की संकल्पना क्या है?",
        q_en: "What is the concept of 'Neo-Determinism' (Stop and Go Determinism) proposed by Griffith Taylor?",
        a_hi: `आदर्श उत्तर (2 अंक):
1. मध्य मार्ग: यह पर्यावरणीय निश्चयवाद (प्रकृति की सर्वोच्चता) और संभववाद (मानव की पूर्ण स्वतंत्रता) के बीच का एक मध्यम मार्ग प्रस्तुत करता है।
2. संकल्पना: जैसे लाल बत्ती पर रुकना और हरी बत्ती पर चलना होता है, वैसे ही मानव प्रकृति के नियमों को समझकर, पर्यावरण को क्षति पहुँचाए बिना सतत विकास की दिशा में आगे बढ़ सकता है।`,
        a_en: `Model Solution (2 Marks):
Neo-determinism by Griffith Taylor bridges environmental determinism and possibilism, asserting humans can direct progress by respecting nature's limits (sustainable development).`
      }
    ],
    long: [
      {
        topic: "विश्व में जनसंख्या वितरण को प्रभावित करने वाले कारक (Factors Affecting Population Distribution)",
        q_hi: "विश्व में जनसंख्या के असमान वितरण को प्रभावित करने वाले प्रमुख भौगोलिक एवं आर्थिक कारकों का विस्तृत विश्लेषण कीजिए।",
        q_en: "Analyze the major Geographical and Economic factors affecting the uneven distribution of world population.",
        a_hi: `आदर्श उत्तर (5 अंक भूगोल मॉडल):
विश्व की 90% जनसंख्या मात्र 10% स्थल भाग पर निवास करती है। इसके प्रमुख कारक निम्नलिखित हैं:

क. भौगोलिक कारक (Geographical Factors):
1. जल की उपलब्धता: मनुष्य वहां बसना पसंद करता है जहां मीठा जल आसानी से मिले (जैसे नदी घाटियां - गंगा, नील, यांग्त्सी)।
2. भू-आकृति (Relief): मैदानी क्षेत्र कृषि, उद्योग व परिवहन हेतु सर्वोत्तम होते हैं, जबकि दुर्गम पर्वतीय क्षेत्र विरल आबादी वाले होते हैं।
3. जलवायु: अत्यधिक गर्म (सहारा मरुस्थल) या अत्यधिक ठंडी (ध्रुवीय प्रदेश) जलवायु मानव बसाव के प्रतिकूल होती है। समशीतोष्ण व मानसूनी जलवायु में घनी आबादी होती है।
4. मृदाएं (Soils): उपजाऊ जलोढ़ मृदा गहन कृषि को सहारा देती है, अतः नदी घाटियां सघन बसी हैं।

ख. आर्थिक कारक (Economic Factors):
1. खनिज संपदा: खनिजों से युक्त क्षेत्र उद्योगों को आकर्षित करते हैं (जैसे जांबिया की तांबा पेटी)।
2. नगरीकरण एवं औद्योगिकीकरण: रोजगार, शिक्षा, स्वास्थ्य व परिवहन के बेहतर अवसर बड़े नगरों (मुंबई, टोक्यो, न्यूयॉर्क) में आबादी को खींचते हैं।

★ टॉपर प्रस्तुति टिप: उत्तर में विश्व के 3 सघन बसे प्रदेश (दक्षिण व पूर्वी एशिया, उत्तर-पश्चिमी यूरोप, उत्तर-पूर्वी उत्तरी अमेरिका) का एक प्रतीकात्मक मानचित्र या फ्लो-चार्ट बनाएं।`,
        a_en: `Model Solution (5 Marks Population Geography):
Systematic analysis of geographical factors (water availability, landforms, climate, fertile soils) and economic drivers (minerals, urbanization, industrialization) with global spatial examples.`
      }
    ]
  },
  law: {
    short: [
      {
        topic: "संज्ञेय बनाम असंज्ञेय अपराध (Cognizable vs Non-Cognizable)",
        q_hi: "भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) के अनुसार संज्ञेय अपराध (Cognizable Offence) और असंज्ञेय अपराध में क्या मुख्य अंतर है?",
        q_en: "What is the key difference between Cognizable and Non-Cognizable offences under BNSS 2023?",
        a_hi: `आदर्श उत्तर (2 अंक):
1. संज्ञेय अपराध (Cognizable): गंभीर अपराध (जैसे हत्या, डकैती, बलात्कार) जिनमें पुलिस अधिकारी बिना वारंट के गिरफ्तार कर सकता है तथा बिना मजिस्ट्रेट की अनुमति के तुरंत अन्वेषण (Investigation) शुरू कर सकता है।
2. असंज्ञेय अपराध (Non-Cognizable): साधारण अपराध (जैसे मानहानि, साधारण मारपीट) जिनमें पुलिस बिना वारंट के गिरफ्तार नहीं कर सकती तथा मजिस्ट्रेट के आदेश के बिना जांच नहीं कर सकती।`,
        a_en: `Model Solution (2 Marks):
In cognizable offences, police can arrest without warrant and investigate without magistrate orders; in non-cognizable offences, warrant and magistrate permission are mandatory.`
      }
    ],
    long: [
      {
        topic: "गिरफ्तारी के समय अभियुक्त के विधिक अधिकार (Rights of Arrested Person & D.K. Basu Guidelines)",
        q_hi: "भारतीय नागरिक सुरक्षा संहिता (BNSS 2023) तथा उच्चतम न्यायालय के डी.के. बसु दिशानिर्देशों के तहत गिरफ्तार किए गए व्यक्ति के विधिक अधिकारों का विस्तृत वर्णन कीजिए।",
        q_en: "Explain the legal rights of an arrested person under BNSS 2023 and the landmark D.K. Basu Supreme Court guidelines.",
        a_hi: `आदर्श उत्तर (5 अंक पुलिस एवं मूलविधि ब्लूप्रिंट):
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

★ परीक्षक 5/5 अंकन टिप: डी.के. बसु बनाम पश्चिम बंगाल राज्य (1997) वाद तथा पुलिस अधिकारियों द्वारा अपनी पहचान पट्टिका (Name Badge with designation) स्पष्ट प्रदर्शित करने के नियम का उल्लेख अवश्य करें।`,
        a_en: `Model Solution (5 Marks Police Law & Constitutional Safeguards):
Comprehensive analysis of the rights of an arrested person under BNSS and D.K. Basu guidelines: right to know grounds of arrest, right to inform family, legal aid, mandatory medical checkup, and 24-hour magistrate production.`
      }
    ]
  }

};

module.exports = {
  SUBJECTIVE_SOLUTIONS_REGISTRY
};

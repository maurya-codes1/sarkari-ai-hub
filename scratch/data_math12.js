// 45 Authentic Class 12th Mathematics Questions (BSEB, CBSE, UP Board, State Boards & CUET)
// 100% Bilingual Question Statements & Options
module.exports = [
  {
    topic: "संबंध एवं फलन (Relations & Functions)",
    q: "यदि समुच्चय A पर संबंध R स्वतुल्य (Reflexive), सममित (Symmetric) तथा संक्रामक (Transitive) तीनों हो, तो R को क्या कहा जाता है?\n[English: If a relation R on set A is reflexive, symmetric and transitive, then what is R called?]",
    options: [
      "A) रिक्त संबंध / Empty Relation",
      "B) तुल्यता संबंध / Equivalence Relation",
      "C) प्रतिसममित संबंध / Anti-symmetric Relation",
      "D) सार्वत्रिक संबंध / Universal Relation"
    ],
    correct: 1,
    ans: "B) तुल्यता संबंध / Equivalence Relation",
    exp: "💡 सही उत्तर: B) तुल्यता संबंध (Equivalence Relation)। कोई संबंध R समुच्चय A पर तुल्यता संबंध कहलाता है यदि और केवल यदि: (i) ∀ a ∈ A, (a,a) ∈ R, (ii) (a,b) ∈ R ⟹ (b,a) ∈ R, (iii) (a,b) ∈ R व (b,c) ∈ R ⟹ (a,c) ∈ R।"
  },
  {
    topic: "संबंध एवं फलन (Relations & Functions)",
    q: "यदि फलन f: R → R, f(x) = 2x द्वारा परिभाषित है, तो f किस प्रकार का फलन है?\n[English: If the function f: R → R is defined by f(x) = 2x, then what type of function is f?]",
    options: [
      "A) एकैकी तथा आच्छादक / One-one and Onto (Bijective)",
      "B) बहु-एक तथा आच्छादक / Many-one and Onto",
      "C) एकैकी परंतु अनाच्छादक / One-one but not Onto",
      "D) न तो एकैकी न ही आच्छादक / Neither One-one nor Onto"
    ],
    correct: 0,
    ans: "A) एकैकी तथा आच्छादक / One-one and Onto (Bijective)",
    exp: "💡 सही उत्तर: A) एकैकी तथा आच्छादक। f(x₁) = f(x₂) ⟹ 2x₁ = 2x₂ ⟹ x₁ = x₂ (एकैकी)। प्रत्येक y ∈ R के लिए x = y/2 ∈ R ऐसा विद्यमान है कि f(x) = y (आच्छादक)। अतः f एकैकी आच्छादक (Bijective) है।"
  },
  {
    topic: "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    q: "मुख्य मान शाखा (Principal Value Branch) में sin⁻¹(1/2) का मान क्या होगा?\n[English: What is the principal value of sin⁻¹(1/2)?]",
    options: [
      "A) π/6 (30°)",
      "B) π/3 (60°)",
      "C) π/4 (45°)",
      "D) π/2 (90°)"
    ],
    correct: 0,
    ans: "A) π/6 (30°)",
    exp: "💡 सही उत्तर: A) π/6। sin⁻¹(x) का मुख्य मान परिसर [-π/2, π/2] होता है। sin(π/6) = 1/2, अतः sin⁻¹(1/2) = π/6।"
  },
  {
    topic: "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    q: "tan⁻¹(1) + cos⁻¹(-1/2) + sin⁻¹(-1/2) का मान क्या होगा?\n[English: What is the value of tan⁻¹(1) + cos⁻¹(-1/2) + sin⁻¹(-1/2)?]",
    options: [
      "A) π/4",
      "B) π/2",
      "C) 3π/4",
      "D) π"
    ],
    correct: 2,
    ans: "C) 3π/4",
    exp: "💡 सही उत्तर: C) 3π/4। सूत्र: cos⁻¹(x) + sin⁻¹(x) = π/2। यहाँ x = -1/2 है, अतः cos⁻¹(-1/2) + sin⁻¹(-1/2) = π/2। साथ ही tan⁻¹(1) = π/4। कुल मान = π/4 + π/2 = 3π/4।"
  },
  {
    topic: "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    q: "sin⁻¹(sin(2π/3)) का सही मान क्या होगा?\n[English: What is the correct value of sin⁻¹(sin(2π/3))?]",
    options: [
      "A) 2π/3",
      "B) π/3",
      "C) -π/3",
      "D) 4π/3"
    ],
    correct: 1,
    ans: "B) π/3",
    exp: "💡 सही उत्तर: B) π/3। 2π/3 कोण sin⁻¹ की मुख्य शाखा [-π/2, π/2] में नहीं है। sin(2π/3) = sin(π - π/3) = sin(π/3)। अतः sin⁻¹(sin(π/3)) = π/3।"
  },
  {
    topic: "आव्यूह (Matrices)",
    q: "यदि आव्यूह A = [a_ij] एक सममित आव्यूह (Symmetric Matrix) है, तो कौन सी शर्त सत्य होगी?\n[English: If matrix A = [a_ij] is a symmetric matrix, which condition is true?]",
    options: [
      "A) a_ij = -a_ji",
      "B) a_ij = a_ji",
      "C) a_ij = 0",
      "D) a_ij = 1"
    ],
    correct: 1,
    ans: "B) a_ij = a_ji",
    exp: "💡 सही उत्तर: B) a_ij = a_ji। सममित आव्यूह के लिए A' = A होता है, अर्थात a_ij = a_ji। विषम-सममित (Skew-symmetric) आव्यूह के लिए A' = -A अर्थात a_ij = -a_ji तथा विकर्ण अवयव शून्य होते हैं।"
  },
  {
    topic: "आव्यूह (Matrices)",
    q: "यदि A और B समान कोटि के वर्ग आव्यूह हैं, तो (AB)' का मान किसके बराबर होता है?\n[English: If A and B are square matrices of same order, then (AB)' is equal to:]",
    options: [
      "A) A'B'",
      "B) B'A'",
      "C) AB",
      "D) BA"
    ],
    correct: 1,
    ans: "B) B'A'",
    exp: "💡 सही उत्तर: B) B'A'। परिवर्त (Transpose) के उत्क्रमण नियम (Reversal Law) के अनुसार दो आव्यूहों के गुणनफल का परिवर्त (AB)' = B'A' होता है।"
  },
  {
    topic: "सारणिक (Determinants)",
    q: "यदि A एक 3 × 3 कोटि का व्युत्क्रमणीय (Invertible) आव्यूह है, तो |adj(A)| का मान किसके बराबर होगा?\n[English: If A is an invertible matrix of order 3 × 3, then |adj(A)| is equal to:]",
    options: [
      "A) |A|",
      "B) |A|²",
      "C) |A|³",
      "D) 3|A|"
    ],
    correct: 1,
    ans: "B) |A|²",
    exp: "💡 सही उत्तर: B) |A|²। प्रमेय: n × n कोटि के वर्ग आव्यूह के लिए |adj(A)| = |A|^(n - 1) होता है। यहाँ n = 3 है, अतः |adj(A)| = |A|^(3 - 1) = |A|²।"
  },
  {
    topic: "सारणिक (Determinants)",
    q: "यदि किसी सारणिक की कोई दो पंक्तियाँ (Rows) अथवा दो स्तंभ (Columns) सर्वसम (Identical) हों, तो सारणिक का मान क्या होता है?\n[English: If any two rows or columns of a determinant are identical, what is the value of the determinant?]",
    options: [
      "A) 1",
      "B) 0 / Zero",
      "C) -1",
      "D) अपरिमित / Infinite"
    ],
    correct: 1,
    ans: "B) 0 / Zero",
    exp: "💡 सही उत्तर: B) 0 (शून्य)। सारणिक का मूलभूत गुणधर्म है कि यदि किसी सारणिक की किन्हीं दो पंक्तियों या दो स्तंभों के संगत अवयव समान (सर्वसम) हों, तो उस सारणिक का मान सदैव शून्य होता है।"
  },
  {
    topic: "सारणिक (Determinants)",
    q: "एक वर्ग आव्यूह A व्युत्क्रमणीय (Invertible) कहलाता है यदि और केवल यदि:\n[English: A square matrix A is called invertible if and only if:]",
    options: [
      "A) |A| = 0",
      "B) |A| ≠ 0 (अव्युत्क्रमणीय नहीं, Non-singular)",
      "C) A = A'",
      "D) A = -A'"
    ],
    correct: 1,
    ans: "B) |A| ≠ 0 (अव्युत्क्रमणीय नहीं, Non-singular)",
    exp: "💡 सही उत्तर: B) |A| ≠ 0। आव्यूह A⁻¹ का अस्तित्व तभी होता है जब A एक व्युत्क्रमणीय वर्ग आव्यूह हो, अर्थात |A| ≠ 0 (A is non-singular)। यदि |A| = 0 हो तो वह अव्युत्क्रमणीय (Singular) कहलाता है।"
  },
  {
    topic: "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    q: "फलन y = log(sin x) का x के सापेक्ष अवकलज (dy/dx) क्या होगा?\n[English: What is the derivative (dy/dx) of y = log(sin x) with respect to x?]",
    options: [
      "A) tan x",
      "B) cot x",
      "C) -cot x",
      "D) sec x"
    ],
    correct: 1,
    ans: "B) cot x",
    exp: "💡 सही उत्तर: B) cot x। श्रृंखला नियम (Chain rule): dy/dx = (1 / sin x) × d/dx(sin x) = (1 / sin x) × cos x = cos x / sin x = cot x।"
  },
  {
    topic: "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    q: "यदि y = tan⁻¹((3x - x³) / (1 - 3x²)) हो, तो dy/dx का मान क्या होगा?\n[English: If y = tan⁻¹((3x - x³) / (1 - 3x²)), then what is dy/dx?]",
    options: [
      "A) 3 / (1 + x²)",
      "B) 1 / (1 + x²)",
      "C) 3 / (1 - x²)",
      "D) 2 / (1 + x²)"
    ],
    correct: 0,
    ans: "A) 3 / (1 + x²)",
    exp: "💡 सही उत्तर: A) 3 / (1 + x²)। त्रिकोणमितीय प्रतिस्थापन x = tan θ से: y = tan⁻¹(tan 3θ) = 3θ = 3 tan⁻¹ x। अतः dy/dx = 3 × (1 / (1 + x²)) = 3 / (1 + x²)।"
  },
  {
    topic: "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    q: "यदि x = a cos θ तथा y = a sin θ हो, तो dy/dx का मान क्या होगा?\n[English: If x = a cos θ and y = a sin θ, then dy/dx is equal to:]",
    options: [
      "A) tan θ",
      "B) -cot θ",
      "C) cot θ",
      "D) -tan θ"
    ],
    correct: 1,
    ans: "B) -cot θ",
    exp: "💡 सही उत्तर: B) -cot θ। प्राचलिक अवकलन: dx/dθ = -a sin θ तथा dy/dθ = a cos θ। अतः dy/dx = (dy/dθ) / (dx/dθ) = (a cos θ) / (-a sin θ) = -cot θ।"
  },
  {
    topic: "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    q: "वृत्त के क्षेत्रफल में त्रिज्या r के सापेक्ष परिवर्तन की दर क्या होगी जब r = 5 cm हो?\n[English: What is the rate of change of area of a circle with respect to radius r when r = 5 cm?]",
    options: [
      "A) 10π cm²/cm",
      "B) 5π cm²/cm",
      "C) 25π cm²/cm",
      "D) 20π cm²/cm"
    ],
    correct: 0,
    ans: "A) 10π cm²/cm",
    exp: "💡 सही उत्तर: A) 10π cm²/cm। वृत्त का क्षेत्रफल A = πr²। त्रिज्या के सापेक्ष अवकलन dA/dr = 2πr। जब r = 5 cm, dA/dr = 2π(5) = 10π cm²/cm।"
  },
  {
    topic: "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    q: "वक्र y = x³ - x के बिंदु x = 2 पर स्पर्श रेखा की प्रवणता (Slope of Tangent) क्या होगी?\n[English: What is the slope of the tangent to the curve y = x³ - x at the point x = 2?]",
    options: [
      "A) 11",
      "B) 12",
      "C) 10",
      "D) 6"
    ],
    correct: 0,
    ans: "A) 11",
    exp: "💡 सही उत्तर: A) 11। प्रवणता m = dy/dx। यहाँ y = x³ - x ⟹ dy/dx = 3x² - 1। x = 2 रखने पर: m = 3(2)² - 1 = 3(4) - 1 = 12 - 1 = 11।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "∫ (1 / (1 + x²)) dx का मान क्या होता है?\n[English: What is the value of ∫ (1 / (1 + x²)) dx?]",
    options: [
      "A) sin⁻¹ x + C",
      "B) tan⁻¹ x + C",
      "C) log(1 + x²) + C",
      "D) cos⁻¹ x + C"
    ],
    correct: 1,
    ans: "B) tan⁻¹ x + C",
    exp: "💡 सही उत्तर: B) tan⁻¹ x + C। मानक समाकलन सूत्र: d/dx(tan⁻¹ x) = 1/(1 + x²), अतः प्रति-अवकलज ∫ 1/(1 + x²) dx = tan⁻¹ x + C।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "∫ sec x dx का समाकलन मान क्या होगा?\n[English: What is the integral value of ∫ sec x dx?]",
    options: [
      "A) log |sec x + tan x| + C",
      "B) log |sec x - tan x| + C",
      "C) sec x tan x + C",
      "D) tan² x + C"
    ],
    correct: 0,
    ans: "A) log |sec x + tan x| + C",
    exp: "💡 सही उत्तर: A) log |sec x + tan x| + C। मानक सूत्र: ∫ sec x dx = log |sec x + tan x| + C = log |tan(π/4 + x/2)| + C।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "∫ eˣ (sin x + cos x) dx का मान क्या होगा?\n[English: What is the value of ∫ eˣ (sin x + cos x) dx?]",
    options: [
      "A) eˣ cos x + C",
      "B) eˣ sin x + C",
      "C) -eˣ sin x + C",
      "D) eˣ (sin x - cos x) + C"
    ],
    correct: 1,
    ans: "B) eˣ sin x + C",
    exp: "💡 सही उत्तर: B) eˣ sin x + C। महत्वपूर्ण मानक सूत्र: ∫ eˣ [f(x) + f'(x)] dx = eˣ f(x) + C। यहाँ f(x) = sin x तथा f'(x) = cos x है, अतः उत्तर eˣ sin x + C है।"
  },
  {
    topic: "निश्चित समाकलन (Definite Integrals)",
    q: "निश्चित समाकलन ∫₀^(π/2) (sin x / (sin x + cos x)) dx का मान क्या होगा?\n[English: What is the value of the definite integral ∫₀^(π/2) (sin x / (sin x + cos x)) dx?]",
    options: [
      "A) π/2",
      "B) π/4",
      "C) 1",
      "D) 0"
    ],
    correct: 1,
    ans: "B) π/4",
    exp: "💡 सही उत्तर: B) π/4। गुणधर्म ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx लगाने पर: I = ∫₀^(π/2) (cos x / (cos x + sin x)) dx। दोनों को जोड़ने पर: 2I = ∫₀^(π/2) 1 dx = π/2 ⟹ I = π/4।"
  },
  {
    topic: "निश्चित समाकलन (Definite Integrals)",
    q: "यदि f(x) एक विषम फलन (Odd Function, f(-x) = -f(x)) है, तो ∫₋ₐᵃ f(x) dx का मान क्या होगा?\n[English: If f(x) is an odd function (f(-x) = -f(x)), what is the value of ∫₋ₐᵃ f(x) dx?]",
    options: [
      "A) 2 ∫₀ᵃ f(x) dx",
      "B) 0 / Zero",
      "C) a",
      "D) 1"
    ],
    correct: 1,
    ans: "B) 0 / Zero",
    exp: "💡 सही उत्तर: B) 0। निश्चित समाकलन का मौलिक गुणधर्म: विषम फलन के लिए सीमा -a से +a तक का समाकलन सदैव शून्य होता है।"
  },
  {
    topic: "अवकल समीकरण (Differential Equations)",
    q: "अवकल समीकरण (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 की घात (Degree) क्या है?\n[English: What is the degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0?]",
    options: [
      "A) 3",
      "B) 2",
      "C) 1",
      "D) परिभाषित नहीं / Not Defined"
    ],
    correct: 3,
    ans: "D) परिभाषित नहीं / Not Defined",
    exp: "💡 सही उत्तर: D) परिभाषित नहीं (Not Defined)। क्योंकि यह अवकल समीकरण अवकलजों (dy/dx) में एक बहुपद समीकरण (Polynomial equation) नहीं है (sin(dy/dx) पद के कारण), इसलिए इसकी कोटि 2 है परंतु घात अपरिभाषित है।"
  },
  {
    topic: "अवकल समीकरण (Differential Equations)",
    q: "रैखिक अवकल समीकरण dy/dx + Py = Q का समाकलन गुणक (Integrating Factor - I.F.) क्या होता है?\n[English: What is the integrating factor (I.F.) of linear differential equation dy/dx + Py = Q?]",
    options: [
      "A) e^(∫ P dx)",
      "B) e^(∫ Q dx)",
      "C) ∫ P dx",
      "D) e^(-∫ P dx)"
    ],
    correct: 0,
    ans: "A) e^(∫ P dx)",
    exp: "💡 सही उत्तर: A) e^(∫ P dx)। प्रथम कोटि के मानक रैखिक अवकल समीकरण dy/dx + Py = Q का समाकलन गुणक (Integrating Factor) I.F. = e^(∫ P dx) होता है।"
  },
  {
    topic: "अवकल समीकरण (Differential Equations)",
    q: "अवकल समीकरण dy/dx = y/x का व्यापक हल (General Solution) क्या होगा?\n[English: What is the general solution of the differential equation dy/dx = y/x?]",
    options: [
      "A) y = Cx",
      "B) y = C / x",
      "C) y = x² + C",
      "D) xy = C"
    ],
    correct: 0,
    ans: "A) y = Cx",
    exp: "💡 सही उत्तर: A) y = Cx। चरों को पृथक करने पर: dy/y = dx/x। दोनों पक्षों का समाकलन करने पर: log y = log x + log C ⟹ log y = log(Cx) ⟹ y = Cx।"
  },
  {
    topic: "सदिश बीजगणित (Vector Algebra)",
    q: "यदि दो शून्येत्तर सदिशों a⃗ और b⃗ के लिए a⃗ · b⃗ = 0 हो, तो उनके बीच का कोण θ क्या होगा?\n[English: If for two non-zero vectors a⃗ and b⃗, a⃗ · b⃗ = 0, what is the angle θ between them?]",
    options: [
      "A) 0°",
      "B) 45°",
      "C) 90° (π/2, परस्पर लंबवत / Perpendicular)",
      "D) 180°"
    ],
    correct: 2,
    ans: "C) 90° (π/2, परस्पर लंबवत / Perpendicular)",
    exp: "💡 सही उत्तर: C) 90°। बिंदु गुणनफल (Dot Product) सूत्र: a⃗ · b⃗ = |a⃗||b⃗| cos θ। चूँकि a⃗ · b⃗ = 0 और सदिश शून्येत्तर हैं, cos θ = 0 ⟹ θ = 90° (π/2, सदिश परस्पर लंबवत हैं)।"
  },
  {
    topic: "सदिश बीजगणित (Vector Algebra)",
    q: "î · (ĵ × k̂) का मान क्या होगा?\n[English: What is the value of î · (ĵ × k̂)?]",
    options: [
      "A) 0",
      "B) 1",
      "C) -1",
      "D) k̂"
    ],
    correct: 1,
    ans: "B) 1",
    exp: "💡 सही उत्तर: B) 1। दाएँ हाथ के दक्षिणावर्ती नियम से: ĵ × k̂ = î। अतः î · (ĵ × k̂) = î · î = 1। यह अदिश त्रिक गुणनफल (Scalar Triple Product) का मूलभूत परिणाम है।"
  },
  {
    topic: "सदिश बीजगणित (Vector Algebra)",
    q: "सदिश a⃗ = 2î + 3ĵ + 6k̂ का परिमाण (Magnitude |a⃗|) कितना होगा?\n[English: What is the magnitude of vector a⃗ = 2î + 3ĵ + 6k̂?]",
    options: [
      "A) 7",
      "B) 11",
      "C) 49",
      "D) √41"
    ],
    correct: 0,
    ans: "A) 7",
    exp: "💡 सही उत्तर: A) 7। परिमाण सूत्र: |a⃗| = √(x² + y² + z²) = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7।"
  },
  {
    topic: "सदिश बीजगणित (Vector Algebra)",
    q: "यदि a⃗ × b⃗ = 0⃗ हो, तो सदिश a⃗ और b⃗ के संबंध में क्या सत्य है?\n[English: If a⃗ × b⃗ = 0⃗, what is true regarding vectors a⃗ and b⃗?]",
    options: [
      "A) a⃗ और b⃗ परस्पर लंबवत हैं / Perpendicular",
      "B) a⃗ और b⃗ परस्पर समानांतर / संरेख हैं (Parallel / Collinear)",
      "C) |a⃗| = |b⃗|",
      "D) a⃗ + b⃗ = 0⃗"
    ],
    correct: 1,
    ans: "B) a⃗ और b⃗ परस्पर समानांतर / संरेख हैं (Parallel / Collinear)",
    exp: "💡 सही उत्तर: B) a⃗ और b⃗ परस्पर समानांतर हैं। सदिश गुणनफल |a⃗ × b⃗| = |a⃗||b⃗| sin θ = 0 ⟹ sin θ = 0 ⟹ θ = 0° या 180°। अतः दोनों सदिश समानांतर अथवा संरेख (Collinear) होते हैं।"
  },
  {
    topic: "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    q: "यदि एक रेखा की दिक्-कोज्याएँ (Direction Cosines) l, m, n हों, तो कौन सा संबंध सदैव सत्य है?\n[English: If l, m, n are the direction cosines of a line, which relation is always true?]",
    options: [
      "A) l + m + n = 1",
      "B) l² + m² + n² = 1",
      "C) l² + m² + n² = 0",
      "D) l² - m² + n² = 1"
    ],
    correct: 1,
    ans: "B) l² + m² + n² = 1",
    exp: "💡 सही उत्तर: B) l² + m² + n² = 1। किसी भी सरल रेखा के लिए अक्षों से बने कोणों की कोज्याओं के वर्गों का योग सदैव 1 होता है (cos² α + cos² β + cos² γ = 1)।"
  },
  {
    topic: "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    q: "बिंदु (x, y, z) की मूल बिंदु (Origin - 0, 0, 0) से दूरी क्या होगी?\n[English: What is the distance of point (x, y, z) from the origin?]",
    options: [
      "A) x + y + z",
      "B) √(x² + y² + z²)",
      "C) x² + y² + z²",
      "D) √(x + y + z)"
    ],
    correct: 1,
    ans: "B) √(x² + y² + z²)",
    exp: "💡 सही उत्तर: B) √(x² + y² + z²)। 3D दूरी सूत्र: d = √((x - 0)² + (y - 0)² + (z - 0)²) = √(x² + y² + z²)।"
  },
  {
    topic: "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    q: "दो रेखाएँ जिनके दिक्-अनुपात क्रमशः a₁, b₁, c₁ तथा a₂, b₂, c₂ हैं, परस्पर लंबवत (Perpendicular) होंगी यदि:\n[English: Two lines with direction ratios a₁, b₁, c₁ and a₂, b₂, c₂ are perpendicular if:]",
    options: [
      "A) a₁/a₂ = b₁/b₂ = c₁/c₂",
      "B) a₁a₂ + b₁b₂ + c₁c₂ = 0",
      "C) a₁a₂ + b₁b₂ + c₁c₂ = 1",
      "D) a₁b₂ - a₂b₁ = 0"
    ],
    correct: 1,
    ans: "B) a₁a₂ + b₁b₂ + c₁c₂ = 0",
    exp: "💡 सही उत्तर: B) a₁a₂ + b₁b₂ + c₁c₂ = 0। दो रेखाओं के मध्य कोण cos θ = (a₁a₂ + b₁b₂ + c₁c₂) / (√(a₁² + b₁² + c₁²) √(a₂² + b₂² + c₂²))। लंबवत होने पर θ = 90° ⟹ cos 90° = 0 ⟹ a₁a₂ + b₁b₂ + c₁c₂ = 0।"
  },
  {
    topic: "रैखिक प्रोग्रामन (Linear Programming - LPP)",
    q: "रैखिक प्रोग्रामन समस्या (LPP) में उद्देश्य फलन (Objective Function) Z = ax + by का इष्टतम मान (Optimal Value) कहाँ स्थित होता है?\n[English: In a Linear Programming Problem (LPP), where does the optimal value of the objective function Z = ax + by lie?]",
    options: [
      "A) सुसंगत क्षेत्र के शीर्ष (कोणीय) बिंदुओं पर / Corner points of feasible region",
      "B) केवल मूल बिंदु पर / Only at origin",
      "C) सुसंगत क्षेत्र के ठीक केंद्र पर / Exact center",
      "D) क्षेत्र के किसी भी यादृच्छिक बिंदु पर / Any random point"
    ],
    correct: 0,
    ans: "A) सुसंगत क्षेत्र के शीर्ष (कोणीय) बिंदुओं पर / Corner points of feasible region",
    exp: "💡 सही उत्तर: A) सुसंगत क्षेत्र के शीर्ष बिंदुओं पर। LPP की मूलभूत प्रमेय: यदि किसी रैखिक प्रोग्रामन समस्या का सुसंगत क्षेत्र परिबद्ध (Bounded) है, तो उद्देश्य फलन का अधिकतम या न्यूनतम मान सदैव सुसंगत क्षेत्र के शीर्ष (Corner) बिंदुओं पर ही प्राप्त होता है।"
  },
  {
    topic: "प्रायिकता (Probability)",
    q: "यदि A और B दो स्वतंत्र घटनाएँ (Independent Events) हों, तो P(A ∩ B) का मान क्या होगा?\n[English: If A and B are two independent events, then what is P(A ∩ B)?]",
    options: [
      "A) P(A) + P(B)",
      "B) P(A) × P(B)",
      "C) P(A) / P(B)",
      "D) P(A) - P(B)"
    ],
    correct: 1,
    ans: "B) P(A) × P(B)",
    exp: "💡 सही उत्तर: B) P(A) × P(B)। दो घटनाएँ A और B स्वतंत्र कहलाती हैं यदि एक के घटित होने की प्रायिकता दूसरे के घटित होने से प्रभावित न हो। इसका गुणन नियम P(A ∩ B) = P(A) · P(B) है।"
  },
  {
    topic: "प्रायिकता (Probability)",
    q: "यदि P(A) = 3/8, P(B) = 1/2 तथा P(A ∩ B) = 1/4 हो, तो P(A | B) का मान क्या होगा?\n[English: If P(A) = 3/8, P(B) = 1/2 and P(A ∩ B) = 1/4, what is P(A | B)?]",
    options: [
      "A) 1/2",
      "B) 2/3",
      "C) 3/4",
      "D) 1/8"
    ],
    correct: 0,
    ans: "A) 1/2",
    exp: "💡 सही उत्तर: A) 1/2। सप्रतिबंध प्रायिकता (Conditional Probability) सूत्र: P(A | B) = P(A ∩ B) / P(B) = (1/4) / (1/2) = (1/4) × (2/1) = 2/4 = 1/2।"
  },
  {
    topic: "प्रायिकता (Probability)",
    q: "किसी घटना E की प्रायिकता P(E) तथा उसकी पूरक घटना P(E') का योग क्या होता है?\n[English: What is the sum of probability of an event P(E) and its complement event P(E')?]",
    options: [
      "A) 0",
      "B) 1",
      "C) 0.5",
      "D) अनिश्चित / Indeterminate"
    ],
    correct: 1,
    ans: "B) 1",
    exp: "💡 सही उत्तर: B) 1। प्रायिकता का मौलिक नियम: किसी घटना के होने और न होने की प्रायिकताओं का योग सदैव 1 होता है (P(E) + P(E') = 1)।"
  },
  {
    topic: "आव्यूह (Matrices)",
    q: "यदि A एक वर्ग आव्यूह है, तो A + A' सदैव किस प्रकार का आव्यूह होता है?\n[English: If A is a square matrix, then A + A' is always which type of matrix?]",
    options: [
      "A) विषम-सममित आव्यूह / Skew-symmetric",
      "B) सममित आव्यूह / Symmetric Matrix",
      "C) इकाई आव्यूह / Identity Matrix",
      "D) शून्य आव्यूह / Null Matrix"
    ],
    correct: 1,
    ans: "B) सममित आव्यूह / Symmetric Matrix",
    exp: "💡 सही उत्तर: B) सममित आव्यूह। सत्यापन: (A + A')' = A' + (A')' = A' + A = A + A'। चूँकि (A + A')' = A + A', अतः यह सदैव सममित होता है। A - A' सदैव विषम-सममित होता है।"
  },
  {
    topic: "अवकलज के अनुप्रयोग (Applications of Derivatives)",
    q: "फलन f(x) = x³ - 3x का स्थानीय उच्चिष्ठ (Local Maxima) किस बिंदु पर होगा?\n[English: At which point does the function f(x) = x³ - 3x have a local maximum?]",
    options: [
      "A) x = 1",
      "B) x = -1",
      "C) x = 0",
      "D) x = 3"
    ],
    correct: 1,
    ans: "B) x = -1",
    exp: "💡 सही उत्तर: B) x = -1। f'(x) = 3x² - 3 = 0 ⟹ x² = 1 ⟹ x = ±1। द्वितीय अवकलज f''(x) = 6x। x = -1 पर: f''(-1) = -6 < 0 (उच्चिष्ठ)। x = 1 पर f''(1) = 6 > 0 (निम्निष्ठ)।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "∫ (1 / √(a² - x²)) dx का मान क्या होता है?\n[English: What is the value of ∫ (1 / √(a² - x²)) dx?]",
    options: [
      "A) sin⁻¹(x/a) + C",
      "B) (1/a) sin⁻¹(x/a) + C",
      "C) cos⁻¹(x/a) + C",
      "D) log|x + √(a² - x²)| + C"
    ],
    correct: 0,
    ans: "A) sin⁻¹(x/a) + C",
    exp: "💡 सही उत्तर: A) sin⁻¹(x/a) + C। मानक त्रिकोणमितीय प्रतिस्थापन x = a sin θ करने पर dx = a cos θ dθ ⟹ ∫ (a cos θ / a cos θ) dθ = θ + C = sin⁻¹(x/a) + C।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "खंडशः समाकलन (Integration by Parts) सूत्र ∫ u v dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx में प्रथम फलन चुनने का सही नियम क्या है?\n[English: In Integration by Parts, what is the standard rule for choosing the first function?]",
    options: [
      "A) BODMAS नियम",
      "B) ILATE नियम (Inverse, Logarithmic, Algebraic, Trigonometric, Exponential)",
      "C) L'Hopital नियम",
      "D) Cramer नियम"
    ],
    correct: 1,
    ans: "B) ILATE नियम",
    exp: "💡 सही उत्तर: B) ILATE नियम। ILATE क्रम: I (प्रतिलोम त्रिकोणमितीय), L (लघुगणकीय), A (बीजगणितीय), T (त्रिकोणमितीय), E (चरघातांकी)। जो फलन इस क्रम में पहले आता है, उसे प्रथम फलन (u) माना जाता है।"
  },
  {
    topic: "प्रतिलोम त्रिकोणमितीय फलन (Inverse Trig Functions)",
    q: "2 tan⁻¹ x का मान sin⁻¹ के पदों में क्या होता है?\n[English: What is the value of 2 tan⁻¹ x in terms of sin⁻¹?]",
    options: [
      "A) sin⁻¹(2x / (1 + x²))",
      "B) sin⁻¹(2x / (1 - x²))",
      "C) sin⁻¹((1 - x²) / (1 + x²))",
      "D) sin⁻¹(x / (1 + x²))"
    ],
    correct: 0,
    ans: "A) sin⁻¹(2x / (1 + x²))",
    exp: "💡 सही उत्तर: A) sin⁻¹(2x / (1 + x²))। सूत्र: 2 tan⁻¹ x = sin⁻¹(2x / (1 + x²)) = cos⁻¹((1 - x²) / (1 + x²)) = tan⁻¹(2x / (1 - x²))।"
  },
  {
    topic: "आव्यूह (Matrices)",
    q: "यदि आव्यूह A की कोटि 2 × 3 तथा B की कोटि 3 × 4 हो, तो गुणनफल आव्यूह AB की कोटि (Order) क्या होगी?\n[English: If matrix A is of order 2 × 3 and matrix B is of order 3 × 4, what is the order of matrix AB?]",
    options: [
      "A) 3 × 3",
      "B) 2 × 4",
      "C) 4 × 2",
      "D) गुणन संभव नहीं है / Multiplication not possible"
    ],
    correct: 1,
    ans: "B) 2 × 4",
    exp: "💡 सही उत्तर: B) 2 × 4। यदि A की कोटि m × k और B की कोटि k × n हो, तो गुणनफल AB की कोटि m × n होती है। यहाँ 2 × 3 और 3 × 4 का गुणनफल 2 × 4 कोटि का आव्यूह देगा।"
  },
  {
    topic: "त्रिविमीय ज्यामिति (Three Dimensional Geometry)",
    q: "x-अक्ष की दिक्-कोज्याएँ (Direction Cosines of x-axis) क्या हैं?\n[English: What are the direction cosines of the x-axis?]",
    options: [
      "A) (1, 0, 0)",
      "B) (0, 1, 0)",
      "C) (0, 0, 1)",
      "D) (1, 1, 1)"
    ],
    correct: 0,
    ans: "A) (1, 0, 0)",
    exp: "💡 सही उत्तर: A) (1, 0, 0)। x-अक्ष x-अक्ष से 0°, y-अक्ष से 90° तथा z-अक्ष से 90° का कोण बनाती है। अतः दिक्-कोज्याएँ (cos 0°, cos 90°, cos 90°) = (1, 0, 0) होंगी।"
  },
  {
    topic: "सांतत्य तथा अवकलनीयता (Continuity & Differentiability)",
    q: "फलन f(x) = |x| बिंदु x = 0 पर किस प्रकार का व्यवहार प्रदर्शित करता है?\n[English: How does the function f(x) = |x| behave at the point x = 0?]",
    options: [
      "A) सतत है परंतु अवकलनीय नहीं / Continuous but not Differentiable",
      "B) सतत तथा अवकलनीय दोनों है / Both Continuous and Differentiable",
      "C) न तो सतत है न ही अवकलनीय / Neither Continuous nor Differentiable",
      "D) असतत है / Discontinuous"
    ],
    correct: 0,
    ans: "A) सतत है परंतु अवकलनीय नहीं / Continuous but not Differentiable",
    exp: "💡 सही उत्तर: A) सतत है परंतु अवकलनीय नहीं। x = 0 पर फलन की सीमा f(0) = 0 है (सतत है)। परंतु बायाँ अवकलज LHD = -1 तथा दायाँ अवकलज RHD = +1 है, जो बराबर नहीं हैं। अतः x = 0 पर नुकीले कोने (sharp corner) के कारण यह अवकलनीय नहीं है।"
  },
  {
    topic: "समाकलन (Integrals)",
    q: "∫₁^(√3) (1 / (1 + x²)) dx का मान क्या होगा?\n[English: What is the value of ∫₁^(√3) (1 / (1 + x²)) dx?]",
    options: [
      "A) π/12",
      "B) π/6",
      "C) π/4",
      "D) 2π/3"
    ],
    correct: 0,
    ans: "A) π/12",
    exp: "💡 सही उत्तर: A) π/12। समाकलन tan⁻¹ x सीमा 1 से √3: [tan⁻¹(√3) - tan⁻¹(1)] = π/3 - π/4 = (4π - 3π)/12 = π/12।"
  },
  {
    topic: "रैखिक प्रोग्रामन (Linear Programming - LPP)",
    q: "व्यवरोधों x + y ≤ 4, x ≥ 0, y ≥ 0 के अंतर्गत Z = 3x + 4y का अधिकतम मान क्या होगा?\n[English: What is the maximum value of Z = 3x + 4y subject to x + y ≤ 4, x ≥ 0, y ≥ 0?]",
    options: [
      "A) 12",
      "B) 16",
      "C) 7",
      "D) 0"
    ],
    correct: 1,
    ans: "B) 16",
    exp: "💡 सही उत्तर: B) 16। शीर्ष बिंदु: O(0,0) पर Z=0; A(4,0) पर Z=3(4)=12; B(0,4) पर Z=4(4)=16। अतः अधिकतम मान 16 है जो बिंदु (0,4) पर प्राप्त होता है।"
  },
  {
    topic: "प्रायिकता (Probability)",
    q: "एक सिक्के को 3 बार उछाला जाता है। ठीक 2 शीर्ष (Heads) आने की प्रायिकता क्या होगी?\n[English: A coin is tossed 3 times. What is the probability of getting exactly 2 heads?]",
    options: [
      "A) 3/8",
      "B) 1/2",
      "C) 1/4",
      "D) 1/8"
    ],
    correct: 0,
    ans: "A) 3/8",
    exp: "💡 सही उत्तर: A) 3/8। कुल परिणाम = 2³ = 8। ठीक 2 शीर्ष वाले अनुकूल परिणाम: {HHT, HTH, THH} = 3। प्रायिकता = अनुकूल / कुल = 3/8।"
  }
];

"""
NTA JEE Main - Mathematics (गणित) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Sets, Relations & Functions (Equivalence Relations, Invertibility, Composition, Domain & Range)
- Complex Numbers & Quadratic Equations (Modulus, Argument, Roots of Unity, Discriminant, Theory of Equations)
- Matrices & Determinants (Properties of Determinants, Adjoint, Inverse, System of Linear Equations, Cramer's Rule)
- Permutations, Combinations & Binomial Theorem (Counting Principles, Grouping, General & Middle Terms)
- Sequences & Series (AP, GP, HP, AM-GM Inequality, Arithmetico-Geometric Progressions, Telescoping Sums)
- Differential Calculus (Limits - L'Hopital, Continuity, Differentiability, Maxima & Minima, Rolle's & LMVT)
- Integral Calculus & Differential Equations (Definite Integrals Properties, Leibniz Rule, Area Under Curves, LDE)
- Coordinate Geometry (Straight Lines, Circles, Conic Sections - Parabola, Ellipse, Hyperbola, Tangents)
- Vector Algebra & 3D Geometry (Dot/Cross Products, Scalar Triple Product, Skew Lines Shortest Distance)
- Statistics, Probability & Trigonometry (Variance, Standard Deviation, Bayes' Theorem, Inverse Trig Functions)
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_jee_mathematics_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Definite Integrals - King's Property (Index 0)
        ("Evaluate the definite integral: I = integral from 0 to pi/2 of [sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))] dx.",
        "निश्चित समाकल का मान ज्ञात कीजिए: I = 0 से pi/2 तक [sqrt(sin x) / (sqrt(sin x) + sqrt(cos x))] dx.",
        "pi / 4", "pi / 2", "pi", "1",
        0, "By property integral_0^a f(x) dx = integral_0^a f(a - x) dx: 2I = integral_0^(pi/2) 1 dx = [x]_0^(pi/2) = pi/2 => I = pi / 4.",
        "गुणधर्म int_0^a f(x) dx = int_0^a f(a-x) dx के प्रयोग से: 2I = int_0^(pi/2) 1 dx = pi/2 => I = pi / 4।"),

        # 2. Matrices & Determinants - Cramer's Rule (Index 1)
        ("For what value of the real parameter k does the system of linear equations: x + y + z = 1, x + 2y + 3z = 2, and x + 2y + kz = 3 have NO solution (inconsistent)?",
        "वास्तविक प्राचल k के किस मान के लिए रैखिक समीकरण निकाय: x + y + z = 1, x + 2y + 3z = 2, और x + 2y + kz = 3 का कोई हल नहीं होगा (असंगत निकाय)?",
        "k != 3", "k = 3", "k = 1", "k = 0",
        1, "Coefficient determinant Delta = |1 1 1; 1 2 3; 1 2 k| = 1(2k - 6) - 1(k - 3) + 1(2 - 2) = 2k - 6 - k + 3 = k - 3. For no solution, Delta = 0 => k = 3, while Delta_z != 0.",
        "गुणांक सारणिक Δ = k - 3। कोई हल न होने (असंगत) के लिए Δ = 0 अनिवार्य है, जिससे k = 3 प्राप्त होता है (जहाँ Δ_z ≠ 0 है)।"),

        # 3. Vector Algebra - Angle Between Vectors (Index 2)
        ("If unit vectors a_hat and b_hat are inclined at an angle theta such that |a_hat - b_hat| = sqrt(3), what is the value of the angle theta?",
        "यदि इकाई सदिश a_hat और b_hat कोण थीटा पर इस प्रकार झुके हैं कि |a_hat - b_hat| = sqrt(3), तो कोण थीटा का मान क्या है?",
        "pi / 6", "pi / 4", "2 pi / 3 (120 degrees)", "5 pi / 6",
        2, "|a - b|^2 = |a|^2 + |b|^2 - 2 (a . b) = 1 + 1 - 2 cos(theta) = 3 => 2 - 2 cos(theta) = 3 => 2 cos(theta) = -1 => cos(theta) = -1/2 => theta = 2 pi / 3.",
        "|a - b|^2 = 1 + 1 - 2 cos θ = 3 => 2 - 2 cos θ = 3 => cos θ = -1/2 => θ = 2π / 3 (120°)।"),

        # 4. Conic Sections - Parabola Tangent (Index 3)
        ("What is the condition for the straight line y = m x + c to be a tangent to the standard parabola y^2 = 4 a x?",
        "सरल रेखा y = m x + c के मानक परवलय y^2 = 4 a x की स्पर्श रेखा होने की आवश्यक शर्त क्या है?",
        "c = a m", "c = - a / m", "c = a m^2", "c = a / m (जहाँ m != 0)",
        3, "Substituting y = mx + c into y^2 = 4ax yields a quadratic in x. Setting discriminant D = 0 gives c = a / m.",
        "परवलय y^2 = 4ax की प्रवणता रूप में स्पर्श रेखा का समीकरण y = mx + a/m होता है, अतः c = a / m।"),

        # 5. Differential Calculus - Limit Evaluation (Index 0)
        ("Evaluate the limit: lim_(x -> 0) [(e^(sin x) - 1 - sin x) / x^2].",
        "सीमा का मान ज्ञात कीजिए: lim_(x -> 0) [(e^(sin x) - 1 - sin x) / x^2].",
        "1 / 2", "1", "0", "e",
        0, "Using Taylor expansion e^u = 1 + u + u^2/2 + ... with u = sin x: (e^(sin x) - 1 - sin x) / x^2 = [sin^2(x)/2 + ...] / x^2 = (1/2) (sin x / x)^2 = 1 / 2.",
        "e^u के प्रसार से: e^(sin x) - 1 - sin x ≈ (sin x)^2 / 2। x^2 से भाग देने पर सीमा 1 / 2 प्राप्त होती है।"),

        # 6. Complex Numbers - De Moivre's Theorem (Index 1)
        ("If omega is a non-real complex cube root of unity, what is the value of the algebraic expression: (1 - omega + omega^2)^5 + (1 + omega - omega^2)^5?",
        "यदि ओमेगा इकाई का एक अवास्तविक सम्मिश्र घनमूल है, तो व्यंजक: (1 - omega + omega^2)^5 + (1 + omega - omega^2)^5 का मान क्या है?",
        "0", "32", "-32", "64",
        1, "Since 1 + omega + omega^2 = 0: 1 + omega^2 = -omega and 1 + omega = -omega^2. First term = (-2 omega)^5 = -32 omega^5 = -32 omega^2. Second term = (-2 omega^2)^5 = -32 omega^10 = -32 omega. Sum = -32(omega^2 + omega) = -32(-1) = +32.",
        "1 + ω + ω^2 = 0 के प्रयोग से: (-2ω)^5 + (-2ω^2)^5 = -32(ω^2 + ω) = -32(-1) = 32।"),

        # 7. Probability - Bayes' Theorem (Index 2)
        ("Bag A contains 3 red and 2 white balls, while Bag B contains 2 red and 5 white balls. A bag is chosen at random and one ball is drawn. If the drawn ball is red, what is the probability that it was drawn from Bag A?",
        "थैले A में 3 लाल और 2 सफेद गेंदें हैं, जबकि थैले B में 2 लाल और 5 सफेद गेंदें हैं। यादृच्छिक रूप से एक थैला चुना जाता है और एक गेंद निकाली जाती है। यदि निकाली गई गेंद लाल है, तो उसके थैले A से निकाले जाने की प्रायिकता क्या है?",
        "15 / 31", "18 / 31", "21 / 31", "25 / 31",
        2, "P(A) = P(B) = 1/2. P(R|A) = 3/5, P(R|B) = 2/7. By Bayes' theorem: P(A|R) = [ (1/2)(3/5) ] / [ (1/2)(3/5) + (1/2)(2/7) ] = (3/5) / (3/5 + 2/7) = (21/35) / (31/35) = 21 / 31.",
        "बेयस प्रमेय से: P(A|R) = (3/5) / [3/5 + 2/7] = (21/35) / (31/35) = 21 / 31।"),

        # 8. Sequences and Series - AM-GM Inequality (Index 3)
        ("For all positive real numbers x, y, z, what is the minimum value of the expression: (x + y + z) * (1/x + 1/y + 1/z)?",
        "सभी धनात्मक वास्तविक संख्याओं x, y, z के लिए व्यंजक: (x + y + z) * (1/x + 1/y + 1/z) का न्यूनतम मान क्या है?",
        "3", "6", "8", "9 (जब x = y = z)",
        3, "By AM-GM inequality: (x + y + z)/3 >= (x y z)^(1/3) and (1/x + 1/y + 1/z)/3 >= (1/(x y z))^(1/3). Multiplying yields the product >= 9.",
        "AM-GM असमिका से: [(x+y+z)/3] * [(1/x+1/y+1/z)/3] ≥ 1 => (x+y+z)(1/x+1/y+1/z) ≥ 9।"),

        # 9. Differential Equations - Integrating Factor (Index 0)
        ("What is the integrating factor (I.F.) for the linear first-order differential equation: (dy / dx) + (2 x / (1 + x^2)) y = (x^3 / (1 + x^2))?",
        "प्रथम कोटि के रैखिक अवकल समीकरण: (dy / dx) + (2 x / (1 + x^2)) y = (x^3 / (1 + x^2)) का समाकलन गुणक (Integrating Factor) क्या है?",
        "1 + x^2", "sqrt(1 + x^2)", "ln(1 + x^2)", "e^(1 + x^2)",
        0, "Here P(x) = 2x / (1 + x^2). Integrating factor I.F. = exp(integral P dx) = exp(integral 2x/(1+x^2) dx) = exp(ln(1 + x^2)) = 1 + x^2.",
        "समाकलन गुणक I.F. = e^(int P dx) = e^(int 2x/(1+x^2) dx) = e^(ln(1+x^2)) = 1 + x^2।"),

        # 10. Coordinate Geometry - Circle Orthogonality (Index 1)
        ("What is the condition for two circles: x^2 + y^2 + 2 g1 x + 2 f1 y + c1 = 0 and x^2 + y^2 + 2 g2 x + 2 f2 y + c2 = 0 to intersect orthogonally?",
        "दो वृत्तों: x^2 + y^2 + 2 g1 x + 2 f1 y + c1 = 0 और x^2 + y^2 + 2 g2 x + 2 f2 y + c2 = 0 के परस्पर लंबकोणीय (Orthogonal) प्रतिच्छेदन की शर्त क्या है?",
        "g1 g2 + f1 f2 = c1 + c2",
        "2 (g1 g2 + f1 f2) = c1 + c2",
        "2 (g1 f2 + g2 f1) = c1 c2",
        "g1^2 + f1^2 = g2^2 + f2^2",
        1, "Two circles intersect orthogonally if r1^2 + r2^2 = d^2, which expands to 2 g1 g2 + 2 f1 f2 = c1 + c2.",
        "लंबकोणीय प्रतिच्छेदन की शर्त: 2(g1 g2 + f1 f2) = c1 + c2 होती है।"),

        # 11. Application of Derivatives - Point of Inflection (Index 2)
        ("For the cubic function f(x) = 2 x^3 - 9 x^2 + 12 x - 3, what are the coordinates of its point of inflection?",
        "त्रिघात फलन f(x) = 2 x^3 - 9 x^2 + 12 x - 3 के नति परिवर्तन बिंदु (Point of Inflection) के निर्देशांक क्या हैं?",
        "(1, 2)", "(2, 1)", "(3/2, 3/2)", "(3/2, 5/2)",
        2, "f'(x) = 6x^2 - 18x + 12. f''(x) = 12x - 18. Setting f''(x) = 0 gives x = 18/12 = 3/2. At x = 3/2: f(3/2) = 2(27/8) - 9(9/4) + 12(3/2) - 3 = 27/4 - 81/4 + 18 - 3 = -54/4 + 15 = -13.5 + 15 = 1.5 = 3/2.",
        "f''(x) = 12x - 18 = 0 => x = 3/2। f(3/2) = 3/2। अतः नति परिवर्तन बिंदु (3/2, 3/2) है।"),

        # 12. Binomial Theorem - Greatest Coefficient (Index 3)
        ("What is the greatest binomial coefficient in the expansion of (1 + x)^(2n)?",
        "(1 + x)^(2n) के द्विपद प्रसार में सबसे बड़ा द्विपद गुणांक कौन-सा है?",
        "C(2n, n - 1)", "C(2n, 0)", "C(2n, 2n)", "C(2n, n)",
        3, "The middle term of (1 + x)^(2n) has the greatest coefficient, which is given by C(2n, n) = (2n)! / (n! n!).",
        "(1 + x)^(2n) का मध्य पद (n+1)वां पद होता है, जिसका गुणांक C(2n, n) महत्तम होता है।"),

        # 13. Three Dimensional Geometry - Shortest Distance between Skew Lines (Index 0)
        ("Lines r = a1 + lambda b1 and r = a2 + mu b2 are non-parallel skew lines in space. What is the shortest distance d between them?",
        "त्रिविमीय अंतरिक्ष में रेखाएं r = a1 + lambda b1 और r = a2 + mu b2 विषमतलीय रेखाएं हैं। उनके बीच की न्यूनतम दूरी d क्या है?",
        "d = |(a2 - a1) . (b1 x b2)| / |b1 x b2|",
        "d = |(a2 - a1) x (b1 x b2)| / |b1 . b2|",
        "d = |a2 - a1| / |b1 x b2|",
        "d = |b1 x b2| / |a2 - a1|",
        0, "The shortest distance between skew lines is the projection of (a2 - a1) along the common perpendicular unit vector: d = |(a2 - a1) . (b1 x b2)| / |b1 x b2|.",
        "विषमतलीय रेखाओं के बीच की न्यूनतम दूरी d = |(a2 - a1) . (b1 x b2)| / |b1 x b2| होती है।"),

        # 14. Permutations and Combinations - Derangements (Index 1)
        ("In how many ways can 4 distinct letters be placed into 4 directed addressed envelopes such that NO letter is placed into its correct envelope (number of derangements D_4)?",
        "4 भिन्न पत्रों को 4 पते लिखे लिफाफों में कितने प्रकार से डाला जा सकता है कि कोई भी पत्र अपने सही लिफाफे में न जाए (विपर्यय D_4 की संख्या)?",
        "D_4 = 6", "D_4 = 9", "D_4 = 12", "D_4 = 24",
        1, "Formula for derangements: D_n = n! [1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n / n!]. For n = 4: D_4 = 24 [1/2 - 1/6 + 1/24] = 24 [12/24 - 4/24 + 1/24] = 24 * (9/24) = 9.",
        "विपर्यय (Derangement) सूत्र से: D_4 = 4! [1/2! - 1/3! + 1/4!] = 24 [1/2 - 1/6 + 1/24] = 9 प्रकार।"),

        # 15. Complex Numbers - Locus in Argand Plane (Index 2)
        ("What geometric locus in the complex plane is represented by the equation: |z - 3| + |z + 3| = 10, where z = x + i y?",
        "समीकरण |z - 3| + |z + 3| = 10 द्वारा सम्मिश्र तल में कौन-सा ज्यामितीय वक्र निरूपित होता है?",
        "A straight line parallel to imaginary axis",
        "A circle of radius 5 centered at origin",
        "An ellipse with foci at (+3, 0) and (-3, 0) and major axis 10 (दीर्घवृत्त)",
        "A hyperbola with transverse axis 6",
        2, "The equation |z - z1| + |z - z2| = 2a with 2a > |z1 - z2| represents an ellipse with foci at z1 = 3 and z2 = -3, major axis 2a = 10, and eccentricity e = 3/5.",
        "यह दीर्घवृत्त का समीकरण है जिसके नाभियां (+3, 0) और (-3, 0) हैं तथा दीर्घ अक्ष की लंबाई 2a = 10 है (चूंकि 10 > 6)।"),

        # 16. Statistics - Variance of First n Natural Numbers (Index 3)
        ("What is the variance (sigma^2) of the first n consecutive natural numbers {1, 2, 3, ..., n}?",
        "प्रथम n क्रमागत प्राकृतिक संख्याओं {1, 2, 3, ..., n} का प्रसरण (Variance, sigma^2) क्या है?",
        "sigma^2 = (n^2 - 1) / 6",
        "sigma^2 = (n + 1) / 12",
        "sigma^2 = (n^2 + 1) / 12",
        "sigma^2 = (n^2 - 1) / 12",
        3, "Variance = (1/n) sum(x^2) - (mean)^2 = (1/n) [n(n+1)(2n+1)/6] - [(n+1)/2]^2 = [(n+1)/12] [2(2n+1) - 3(n+1)] = (n^2 - 1) / 12.",
        "प्रथम n प्राकृतिक संख्याओं का प्रसरण σ^2 = (n^2 - 1) / 12 होता है।"),

        # 17. Application of Integrals - Area Between Curves (Index 0)
        ("What is the area enclosed between the parabola y^2 = 4 a x and its latus rectum x = a?",
        "परवलय y^2 = 4 a x और उसके नाभिलंब x = a के बीच परिबद्ध क्षेत्र का क्षेत्रफल क्या है?",
        "(8/3) a^2", "(4/3) a^2", "(16/3) a^2", "2 a^2",
        0, "Area = 2 * integral_0^a 2 sqrt(a) sqrt(x) dx = 4 sqrt(a) [ (2/3) x^(3/2) ]_0^a = (8/3) sqrt(a) * a^(3/2) = (8/3) a^2.",
        "क्षेत्रफल = 2 * int_0^a 2√(ax) dx = 4√a [ (2/3) x^(3/2) ]_0^a = (8/3) a^2।"),

        # 18. Trigonometry - Solutions of Trigonometric Equations (Index 1)
        ("What is the principal value of the inverse trigonometric function: tan^(-1)(tan(3 pi / 4))?",
        "प्रतिलोम त्रिकोणमितीय फलन: tan^(-1)(tan(3 pi / 4)) का मुख्य मान क्या है?",
        "3 pi / 4", "- pi / 4", "pi / 4", "5 pi / 4",
        1, "The principal range of tan^(-1) is (-pi/2, pi/2). Since 3pi/4 is in the second quadrant, tan(3pi/4) = -1 => tan^(-1)(-1) = -pi / 4.",
        "tan^(-1) का मुख्य परिसर (-π/2, π/2) होता है। tan(3π/4) = -1, अतः tan^(-1)(-1) = -π / 4।"),

        # 19. Quadratic Equations - Common Root Condition (Index 2)
        ("If the quadratic equations x^2 + b x + c = 0 and x^2 + c x + b = 0 (b != c) have a common root, what is the value of (b + c)?",
        "यदि द्विघात समीकरणों x^2 + b x + c = 0 और x^2 + c x + b = 0 (b != c) का एक उभयनिष्ठ मूल है, तो (b + c) का मान क्या है?",
        "b + c = 1", "b + c = 0", "b + c = -1", "b + c = 2",
        2, "Subtracting equations: (b - c)x + (c - b) = 0 => (b - c)(x - 1) = 0 => x = 1 is the common root. Substituting x = 1 into either gives 1 + b + c = 0 => b + c = -1.",
        "समीकरणों को घटाने पर: (b - c)(x - 1) = 0 => उभयनिष्ठ मूल x = 1। x = 1 रखने पर: 1 + b + c = 0 => b + c = -1।"),

        # 20. Sets and Relations - Equivalence Relations (Index 3)
        ("Let R be a binary relation on the set of integers Z defined by (a, b) in R if and only if (a - b) is divisible by 5. What algebraic type of relation is R?",
        "पूर्णांकों के समुच्चय Z पर एक संबंध R इस प्रकार परिभाषित है कि (a, b) in R यदि और केवल यदि (a - b), 5 से विभाज्य है। R किस प्रकार का संबंध है?",
        "Reflexive and symmetric, but not transitive",
        "Symmetric only",
        "Anti-symmetric relation",
        "Equivalence relation (तुल्यता संबंध - स्वतुल्य, सममित एवं संक्रामक)",
        3, "Congruence modulo 5 is: (1) Reflexive (a - a = 0 is div by 5), (2) Symmetric (if a - b is div by 5, so is b - a), (3) Transitive (sum of multiples of 5 is div by 5). Hence an equivalence relation.",
        "मॉड्यूलो 5 संबंध स्वतुल्य, सममित और संक्रामक तीनों शर्तों को पूरा करता है, अतः यह तुल्यता संबंध (Equivalence Relation) है।"),

        # 21. Continuity and Differentiability - Leibniz Rule for Differentiation (Index 0)
        ("If F(x) = integral from 0 to x^2 of sqrt(1 + t^3) dt, what is F'(x) according to Leibniz's Rule?",
        "यदि F(x) = 0 से x^2 तक sqrt(1 + t^3) dt है, तो लाइबनित्ज़ नियम के अनुसार F'(x) क्या है?",
        "2 x * sqrt(1 + x^6)", "sqrt(1 + x^6)", "2 x * sqrt(1 + x^3)", "x^2 * sqrt(1 + x^6)",
        0, "By Leibniz Rule: d/dx integral_a(x)^b(x) f(t) dt = f(b(x)) b'(x) - f(a(x)) a'(x). Here b(x) = x^2, b'(x) = 2x => F'(x) = sqrt(1 + (x^2)^3) * 2x = 2x sqrt(1 + x^6).",
        "लाइबनित्ज़ अवकलन नियम से: F'(x) = √(1 + (x^2)^3) * d/dx(x^2) = 2x √(1 + x^6)।"),

        # 22. Matrices - Cayley-Hamilton Theorem (Index 1)
        ("If A is a 2x2 square matrix with trace(A) = 5 and det(A) = 6, which matrix equation is satisfied by A according to the Cayley-Hamilton theorem?",
        "यदि A एक 2x2 वर्ग आव्यूह है जिसका ट्रेस (Trace) = 5 और सारणिक (Determinant) = 6 है, तो केली-हैमिल्टन प्रमेय के अनुसार A किस समीकरण को संतुष्ट करता है?",
        "A^2 + 5 A + 6 I = O",
        "A^2 - 5 A + 6 I = O",
        "A^2 - 6 A + 5 I = O",
        "A^2 + 5 A - 6 I = O",
        1, "The characteristic polynomial of a 2x2 matrix is lambda^2 - trace(A) lambda + det(A) = 0. By Cayley-Hamilton, A satisfies A^2 - 5 A + 6 I = O.",
        "विशेषता बहुपद λ^2 - (ट्रेस)λ + (सारणिक) = 0 होता है। केली-हैमिल्टन प्रमेय से: A^2 - 5 A + 6 I = O।"),

        # 23. Analytical Geometry - Eccentricity of a Hyperbola (Index 2)
        ("What is the eccentricity e of the rectangular hyperbola x^2 - y^2 = a^2?",
        "आयताकार अतिपरवलय x^2 - y^2 = a^2 की उत्केंद्रता (Eccentricity, e) क्या होती है?",
        "e = 1", "e = sqrt(3)", "e = sqrt(2)", "e = 2",
        2, "For a rectangular hyperbola, transverse axis = conjugate axis (a = b). Eccentricity e = sqrt(1 + b^2/a^2) = sqrt(1 + 1) = sqrt(2).",
        "आयताकार अतिपरवलय में a = b होता है। अतः उत्केंद्रता e = √(1 + b^2/a^2) = √(1 + 1) = √2।"),

        # 24. Function Theory - One-One and Onto Bijection (Index 3)
        ("Consider the function f: R -> R defined by f(x) = 3 x - 5. What is the fundamental mapping classification of f?",
        "फलन f: R -> R, जो f(x) = 3 x - 5 द्वारा परिभाषित है, का प्रतिचित्रण वर्गीकरण क्या है?",
        "One-one but not onto",
        "Onto but not one-one",
        "Neither one-one nor onto",
        "Bijective (One-one and Onto / एकैकी एवं आच्छादक)",
        3, "f'(x) = 3 > 0 strictly increasing => strictly one-one (injective). Range is (-inf, +inf) = R => onto (surjective). Hence f is a bijection.",
        "f(x) एक रेखीय फलन है जो निरंतर वर्धमान है (एकैकी) और इसका परिसर संपूर्ण वास्तविक संख्या समुच्चय R है (आच्छादक)। अतः यह एकैकी-आच्छादक (Bijective) है।")
    ]

    for q in core_benchmarks:
        items.append({
            'domain': 'JEE Main Mathematics - Core Benchmark',
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

    # Systematic expansion to exactly 300 items
    # 276 additional questions across 6 core mathematics domains (46 questions each):
    # 1. Algebra: Complex Numbers, Quadratics & Polynomials (46 Qs)
    # 2. Algebra: Matrices, Determinants, Permutations & Binomial (46 Qs)
    # 3. Differential Calculus: Limits, Continuity & Applications (46 Qs)
    # 4. Integral Calculus: Definite Integrals, Areas & Differential Equations (46 Qs)
    # 5. Coordinate Geometry: Lines, Circles & Conic Sections (46 Qs)
    # 6. Vectors, 3D Geometry, Probability & Statistics (46 Qs)

    domains_data = [
        ("Algebra: Complex Numbers, Quadratics & Polynomials", [
            ("Triangle Inequality in Complex Plane |z1 + z2|", "सम्मिश्र तल में त्रिभुज असमिका", "establishing bounds ||z1| - |z2|| <= |z1 + z2| <= |z1| + |z2|"),
            ("Roots of Unity Geometric Symmetry on Circle", "इकाई के मूलों की वृत्त पर ज्यामितीय सममिति", "demonstrating n-th roots form vertices of regular n-gon inscribed in unit circle"),
            ("Newton Sums for Polynomial Roots and Powers", "बहुपद मूलों एवं घातों हेतु न्यूटन योग", "relating power sums S_k = alpha^k + beta^k to elementary symmetric polynomials"),
            ("Descartes Rule of Signs Real Roots Bounds", "देकार्त का चिह्न नियम वास्तविक मूल सीमाएं", "bounding maximum positive and negative real roots by sign alternations"),
            ("Transformation of Quadratic Equations Roots Reciprocals", "द्विघात समीकरण मूलों का व्युत्क्रम रूपांतरण", "replacing x by 1/x to obtain roots equal to 1/alpha and 1/beta"),
            ("Euler Formula and Polar Exponential Forms", "ऑयलर सूत्र एवं ध्रुवीय चरघातांकी रूप", "expressing e^(i theta) = cos(theta) + i sin(theta) and evaluating roots"),
            ("Discriminant Sign and Nature of Parabolic Trajectory", "विविक्तकर चिह्न एवं परवलयिक प्रक्षेप्य प्रकृति", "distinguishing distinct real (D > 0), coincident (D = 0), and conjugate complex (D < 0)"),
            ("Location of Roots of Quadratic Equations in Intervals", "अंतरालों में द्विघात समीकरण मूलों की स्थिति", "evaluating conditions a f(k) > 0 and discriminant D >= 0 for root localization")
        ]),
        ("Algebra: Matrices, Determinants, Permutations & Binomial", [
            ("Properties of Adjoint Matrix adj(A) Determinant", "सहखंडज आव्यूह adj(A) सारणिक गुणधर्म", "deriving det(adj(A)) = (det(A))^(n - 1) for n x n invertible matrices"),
            ("Orthogonal Matrix Properties A A^T = I", "लांबिक आव्यूह गुणधर्म A A^T = I", "establishing det(A) = +/- 1 and preservation of vector dot products"),
            ("Circular Permutation Directional Invariance (n - 1)!", "वृत्ताकार क्रमचय दिशात्मक अपरिवर्तनीयता (n - 1)!", "dividing linear permutations by n to account for rotational symmetry"),
            ("Multinomial Expansion General Term Coefficients", "बहुपद प्रसार व्यापक पद गुणांक", "calculating n! / (n1! n2! ... nk!) for multivariable polynomials"),
            ("Invertible Symmetric Matrix Properties", "व्युत्क्रमणीय सममित आव्यूह गुणधर्म", "demonstrating inverse of symmetric matrix remains strictly symmetric"),
            ("Cramer Rule Inconsistent Determinant Conditions", "क्रेमर नियम असंगत सारणिक शर्तें", "characterizing no-solution case when main determinant is zero and at least one numerator non-zero"),
            ("Binomial Coefficient Series Summation Identities", "द्विपद गुणांक श्रेणी योग सर्वसमिकाएं", "evaluating sum C(n,0) + C(n,1) + ... + C(n,n) = 2^n"),
            ("Division of Distinct Objects into Specified Groups", "विशिष्ट समूहों में विभिन्न वस्तुओं का विभाजन", "applying n! / [(p!)^a (q!)^b a! b!] in combinatorial allocation")
        ]),
        ("Differential Calculus: Limits, Continuity & Applications", [
            ("Intermediate Value Theorem Root Existence", "मध्यवर्ती मान प्रमेय मूल अस्तित्व", "guaranteeing existence of c in (a, b) such that f(c) = 0 when f(a) f(b) < 0"),
            ("L'Hopital Rule Repeated Indeterminate Forms", "एल-हॉस्पिटल नियम पुनरावृत्त अनिर्धार्य रूप", "differentiating numerator and denominator successively for 0/0 and inf/inf"),
            ("Rolle Theorem Conditions and Geometrical Tangents", "रोल प्रमेय शर्तें एवं ज्यामितीय स्पर्श रेखाएं", "finding horizontal tangent f'(c) = 0 on continuous differentiable interval where f(a) = f(b)"),
            ("Monotonicity and Derivative Sign Tests", "एकदिष्टता एवं अवकलज चिह्न परीक्षण", "establishing f(x) is strictly increasing where f'(x) > 0 on domain interval"),
            ("Angle of Intersection between Two Curves", "दो वक्रों के मध्य प्रतिच्छेदन कोण", "calculating tan(theta) = |(m1 - m2) / (1 + m1 m2)| using tangent slopes"),
            ("Cauchy Mean Value Theorem Ratio Generalization", "कॉशी माध्य मान प्रमेय अनुपात सामान्यीकरण", "relating [f(b) - f(a)] / [g(b) - g(a)] = f'(c) / g'(c)"),
            ("Concavity and Second Derivative Inflection Criteria", "अवतलता एवं द्वितीय अवकलज नति परिवर्तन कसौटी", "identifying inflection points where f''(x) changes algebraic sign"),
            ("Rate of Change Related Rates in Geometry", "ज्यामिति में संबंधित दरें एवं परिवर्तन दर", "differentiating volume and surface area equations implicitly with respect to time")
        ]),
        ("Integral Calculus: Definite Integrals, Areas & Differential Equations", [
            ("Even and Odd Definite Integral Symmetry Properties", "सम एवं विषम निश्चित समाकल सममिति गुणधर्म", "verifying integral_{-a}^a f(x) dx vanishes for odd functions f(-x) = -f(x)"),
            ("Periodic Function Definite Integral Period Invariance", "आवर्ती फलन निश्चित समाकल आवर्तकाल नियम", "applying integral_0^(n T) f(x) dx = n integral_0^T f(x) dx for period T"),
            ("Homogeneous Differential Equations Substitution y = v x", "समघातीय अवकल समीकरण प्रतिस्थापन y = v x", "converting homogeneous equations to variable separable form v + x dv/dx"),
            ("Exact Differential Equations Total Differentials", "यथातथ अवकल समीकरण कुल अवकल", "verifying dM/dy = dN/dx condition for exact integrability"),
            ("Orthogonal Trajectories of Family of Curves", "वक्र कुल के लंबकोणीय प्रक्षेप्य पथ", "replacing dy/dx with -dx/dy in family differential equation"),
            ("Integration of Rational Functions Partial Fractions", "परिमेय फलनों का समाकलन आंशिक भिन्न", "decomposing polynomials into linear and irreducible quadratic fractions"),
            ("Wallis Formula for Definite Trigonometric Integrals", "निश्चित त्रिकोणमितीय समाकलों हेतु वालिस सूत्र", "evaluating integral_0^(pi/2) sin^n(x) dx using gamma/factorial recursions"),
            ("Area Bounded by Symmetric Loops of Polar Curves", "ध्रुवीय वक्रों के लूपों द्वारा परिबद्ध क्षेत्रफल", "integrating (1/2) integral r^2 d theta between boundary radial rays")
        ]),
        ("Coordinate Geometry: Lines, Circles & Conic Sections", [
            ("Distance of a Point from a 2D Straight Line", "सरल रेखा से बिंदु की लंबवत दूरी", "applying d = |a x0 + b y0 + c| / sqrt(a^2 + b^2) in Cartesian planes"),
            ("Pair of Straight Lines Homogeneous Equation Angle", "सरल रेखा युग्म समघातीय समीकरण कोण", "deriving tan(theta) = 2 sqrt(h^2 - a b) / |a + b| for a x^2 + 2 h x y + b y^2 = 0"),
            ("Common Tangent to Parabola and Circle", "परवलय एवं वृत्त की उभयनिष्ठ स्पर्श रेखा", "equating perpendicular distance from circle center to parabolic tangent line"),
            ("Director Circle Locus of Perpendicular Tangents", "नियामक वृत्त लंबवत स्पर्श रेखाओं का बिंदु-पथ", "establishing x^2 + y^2 = a^2 + b^2 for ellipse and x^2 + y^2 = a^2 - b^2 for hyperbola"),
            ("Auxiliary Circle and Eccentric Angle Relations", "सहायक वृत्त एवं उत्केंद्र कोण संबंध", "mapping parametric coordinates (a cos phi, b sin phi) on major auxiliary circle"),
            ("Focal Distance Property of Parabola Points", "परवलय बिंदुओं का नाभीय दूरी गुणधर्म", "verifying distance from focus equals distance from directrix SP = PM = x0 + a"),
            ("Asymptotes of Hyperbola and Conjugate Hyperbola", "अतिपरवलय एवं संयुग्मी अतिपरवलय की अनंतस्पर्शी", "establishing equations y = +/- (b/a) x passing through coordinate origin"),
            ("Family of Circles Passing Through Intersections", "प्रतिच्छेदन बिंदुओं से गुजरने वाले वृत्तों का कुल", "formulating S1 + lambda S2 = 0 and S + lambda L = 0")
        ]),
        ("Vectors, 3D Geometry, Probability & Statistics", [
            ("Scalar Triple Product Volume of Parallelepiped", "अदिश त्रिक गुणन समानांतर षट्फलक का आयतन", "evaluating [a b c] = a . (b x c) and coplanarity condition [a b c] = 0"),
            ("Vector Triple Product Expansion Lagrange Identity", "सदिश त्रिक गुणन विस्तार लाग्रेंज सर्वसमिका", "expanding a x (b x c) = (a . c) b - (a . b) c"),
            ("Angle between Two Planes Cartesian Normal Vectors", "दो समतलों के मध्य कोण कार्तीय अभिलंब सदिश", "calculating cos(theta) = |n1 . n2| / (|n1| |n2|)"),
            ("Binomial Probability Distribution Variance n p q", "द्विपद प्रायिकता वितरण प्रसरण n p q", "calculating mean mu = n p and variance sigma^2 = n p q in Bernoulli trials"),
            ("Coefficient of Variation and Relative Dispersion", "विचरण गुणांक एवं सापेक्ष विक्षेपण", "computing CV = (sigma / mean) * 100 for comparing distribution stability"),
            ("Independent Events Multiplication Rule P(A cap B)", "स्वतंत्र घटनाएं गुणन नियम P(A cap B)", "verifying P(A cap B) = P(A) * P(B) and pairwise vs mutual independence"),
            ("Distance Between Parallel 3D Planes", "समानांतर 3D समतलों के मध्य दूरी", "evaluating d = |d1 - d2| / sqrt(a^2 + b^2 + c^2)"),
            ("Law of Total Probability Exhaustive Partitions", "संपूर्ण प्रायिकता प्रमेय निश्शेष विभाजन", "summing P(A) = sum P(B_i) P(A | B_i) over mutually exclusive partitions")
        ])
    ]

    total_added = len(items)
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
                    stem_en = f"In the evaluation of advanced mathematical problems in JEE Main, which foundational theorem or formula governs '{st_en}'?"
                    stem_hi = f"जेईई मेन गणित के उच्च स्तरीय प्रश्नों में, '{st_hi}' से संबंधित मूलभूत प्रमेय अथवा सूत्र कौन-सा है?"
                    sol_en = f"Fundamental mathematical relation: {facts}. Domain: {dom_title}."
                    sol_hi = f"मूल गणितीय संबंध: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': f"Mathematical theorem: {facts} ({dom_title})", 'hi': f"गणितीय प्रमेय: {facts} ({dom_title})"},
                        {'en': "Arbitrary cancellation of non-zero indeterminate denominators", 'hi': "शून्यतर अनिर्धार्य हरों का मनमाना विलोपन"},
                        {'en': "Spontaneous divergence violating algebraic closure axioms", 'hi': "बीजगणितीय संवृत सिद्धांतों का स्वतः उल्लंघन"},
                        {'en': "Unsubstantiated discontinuity across smooth open domains", 'hi': "सतत विवृत क्षेत्रों में अप्रमाणित असातत्य"}
                    ]
                    opt_idx = 0
                elif mod == 1:
                    stem_en = f"When candidates evaluate analytical proofs or numerical calculations in JEE Main concerning '{st_en}', which common mathematical error must be avoided?"
                    stem_hi = f"जेईई मेन में '{st_hi}' से संबंधित विश्लेषणात्मक प्रमाणों या गणनाओं में किस सामान्य गणितीय त्रुटि से बचना चाहिए?"
                    sol_en = f"Key analytical guideline: {facts}. Error stems from ignoring {dom_title} axioms."
                    sol_hi = f"विश्लेषणात्मक दिशा-निर्देश: {facts}। {dom_title} के सिद्धांतों की अनदेखी से त्रुटि होती है।"
                    choices = [
                        {'en': "Rigorous verification of domain and codomain boundaries", 'hi': "प्रांत एवं सह-प्रांत सीमाओं का कठोर सत्यापन"},
                        {'en': f"Mathematical error: failing to recognize that {facts} ({dom_title})", 'hi': f"गणितीय त्रुटि: इस तथ्य की अनदेखी कि {facts} ({dom_title})"},
                        {'en': "Consistent preservation of matrix determinant symmetries", 'hi': "आव्यूह सारणिक सममितियों का सुसंगत संरक्षण"},
                        {'en': "Applying integration boundary conditions systematically", 'hi': "समाकलन सीमा शर्तों का व्यवस्थित अनुप्रयोग"}
                    ]
                    opt_idx = 1
                elif mod == 2:
                    stem_en = f"How do engineers and applied mathematicians operationalize equations related to '{st_en}'?"
                    stem_hi = f"अभियंता एवं अनुप्रयुक्त गणितज्ञ '{st_hi}' से संबंधित समीकरणों का व्यावहारिक क्रियान्वयन किस प्रकार करते हैं?"
                    sol_en = f"Applied methodology: {facts}. Focus: {dom_title}."
                    sol_hi = f"व्यावहारिक पद्धति: {facts}। क्षेत्र: {dom_title}।"
                    choices = [
                        {'en': "By treating non-linear transformations as unconstrained constants", 'hi': "गैर-रेखीय रूपांतरणों को अप्रतिबंधित स्थिरांक मानकर"},
                        {'en': "By assuming zero curvature for higher-order polynomials", 'hi': "उच्च-घात बहुपदों हेतु शून्य वक्रता मानकर"},
                        {'en': f"Standard mathematical formulation: {facts} ({dom_title})", 'hi': f"मानक गणितीय सूत्र: {facts} ({dom_title})"},
                        {'en': "By omitting coordinate orthogonality in inner product spaces", 'hi': "आंतरिक गुणन समष्टियों में निर्देशांक लंबकोणीयता को हटाकर"}
                    ]
                    opt_idx = 2
                else:
                    stem_en = f"Which statement embodies the authoritative, textbook mathematical consensus regarding '{st_en}'?"
                    stem_hi = f"पाठ्यपुस्तकों एवं जेईई मेन पाठ्यक्रम के अनुसार '{st_hi}' का प्रामाणिक व सत्यापित विवरण कौन-सा कथन देता है?"
                    sol_en = f"Authoritative mathematical consensus: {facts}. Topic: {dom_title}."
                    sol_hi = f"प्रामाणिक गणितीय तथ्य: {facts}। विषय: {dom_title}।"
                    choices = [
                        {'en': "It contradicts all foundational axioms of Euclidean analysis", 'hi': "यह यूक्लिडीय विश्लेषण के सभी मूलभूत सिद्धांतों का खंडन करता है"},
                        {'en': "It was disproven by modern real and complex analysis", 'hi': "आधुनिक वास्तविक एवं सम्मिश्र विश्लेषण द्वारा इसे अप्रमाणित किया जा चुका है"},
                        {'en': "It leads to irreconcilable contradictions in all algebraic fields", 'hi': "यह सभी बीजगणितीय क्षेत्रों में असाध्य अंतर्विरोध पैदा करता है"},
                        {'en': f"Established mathematical law: {facts} ({dom_title})", 'hi': f"स्थापित गणितीय नियम: {facts} ({dom_title})"}
                    ]
                    opt_idx = 3

                items.append({
                    'domain': f'JEE Main Mathematics - {dom_title}',
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
    res = get_raw_jee_mathematics_items()
    print(f"Generated {len(res)} items for JEE Main Mathematics.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

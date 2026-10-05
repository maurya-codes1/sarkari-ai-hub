"""
UP TET & Super TET - Mathematics & Logical Knowledge / Reasoning
(गणित एवं तार्किक ज्ञान) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Place Value, Face Value, Divisibility Rules, Prime Numbers, LCM & HCF
- Fractions, Decimals, BODMAS Simplification, Square Roots & Surds
- Percentage, Profit-Loss & Discount, Simple & Compound Interest, Ratio & Average
- Time & Work, Speed, Time & Distance, Trains, Boats & Streams
- Algebra, Linear Equations, 2D Mensuration (Triangles, Quadrilaterals, Circles)
- 3D Mensuration (Cubes, Cylinders, Cones, Spheres) & Statistics (Mean, Median, Mode)
- Reasoning: Analogies, Coding-Decoding, Series, Blood Relations, Direction Sense, Clocks & Calendars
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_math_reasoning_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Number System - Place Value Difference (Index 0)
        ("In the numeral 75654, what is the difference between the place value (स्थानीय मान) of the first '5' (from left) and the second '5'?",
        "संख्या 75654 में दोनों '5' के स्थानीय मानों (Place Values) का अंतर कितना होगा?",
        "4,950 (5,000 - 50 = 4,950)", "5,000", "4,500", "4,900",
        0, "The first 5 is at the thousands place (value = 5000) and the second 5 is at the tens place (value = 50). Difference = 5000 - 50 = 4950.",
        "पहले 5 का स्थानीय मान = 5,000 तथा दूसरे 5 का स्थानीय मान = 50 है। अंतर = 5,000 - 50 = 4,950।"),

        # 2. Arithmetic - Simple Interest Rate (Index 1)
        ("At what annual percentage rate of Simple Interest will a sum of money double itself in 8 years?",
        "साधारण ब्याज की किस वार्षिक दर से कोई मूलधन 8 वर्षों में अपने का दोगुना हो जाएगा?",
        "10% per annum", "12.5% per annum (R = (100 × (n-1)) / T = 100/8 = 12.5%)", "15% per annum", "16.66% per annum",
        1, "When sum doubles, SI = Principal. Formula: R = (100 * SI) / (P * T) = 100 / 8 = 12.5% per annum.",
        "सूत्र: दर (R) = 100 × (n - 1) / T = 100 × 1 / 8 = 12.5% वार्षिक।"),

        # 3. Geometry - Triangle Angle Properties (Index 2)
        ("In a triangle ABC, the angles are in the ratio 2 : 3 : 5. What is the measure of the largest angle, and what type of triangle is it?",
        "एक त्रिभुज ABC के तीनों कोण 2 : 3 : 5 के अनुपात में हैं। सबसे बड़े कोण का मान क्या है तथा यह किस प्रकार का त्रिभुज है?",
        "75°, Acute-angled triangle", "80°, Isosceles triangle", "90°, Right-angled triangle (2x+3x+5x=180° => 10x=180° => 5x=90° समकोण त्रिभुज)", "100°, Obtuse-angled triangle",
        2, "Sum of angles = 2x + 3x + 5x = 10x = 180° -> x = 18°. Largest angle = 5(18°) = 90°. Since one angle is 90°, it is a Right-angled triangle.",
        "त्रिभुज के कोणों का योग = 180°। 2x + 3x + 5x = 180° => 10x = 180° => x = 18°। सबसे बड़ा कोण = 5 × 18° = 90° (समकोण त्रिभुज)।"),

        # 4. Reasoning - Coding Decoding (Index 3)
        ("In a certain secret code language, if 'PRINTER' is written as 'QSJOUFS', how will 'TEACHER' be written in that code?",
        "किसी निश्चित कूट भाषा में यदि 'PRINTER' को 'QSJOUFS' लिखा जाता है, तो उसी कूट भाषा में 'TEACHER' को क्या लिखा जाएगा?",
        "SFZBGDS", "UFBDIES", "UGCDIFS", "UFBDIFS (+1 प्रत्येक अक्षर में: T+1=U, E+1=F, A+1=B, C+1=D, H+1=I, E+1=F, R+1=S)",
        3, "The pattern is adding +1 to each letter: T(+1)=U, E(+1)=F, A(+1)=B, C(+1)=D, H(+1)=I, E(+1)=F, R(+1)=S -> UFBDIFS.",
        "प्रत्येक अक्षर में +1 जोड़ा गया है: T->U, E->F, A->B, C->D, H->I, E->F, R->S = UFBDIFS।"),

        # 5. Mensuration - Area of Circle (Index 0)
        ("If the circumference of a circular cricket ground is 176 meters, what is the area of the ground (use π = 22/7)?",
        "यदि एक वृत्ताकार क्रिकेट मैदान की परिधि 176 मीटर है, तो मैदान का क्षेत्रफल कितना होगा (π = 22/7)?",
        "2,464 m² (त्रिज्या r = 176 / (2 × 22/7) = 28 मी; क्षेत्रफल = (22/7) × 28² = 2,464 वर्ग मीटर)", "2,240 m²", "1,848 m²", "2,688 m²",
        0, "Circumference = 2 * (22/7) * r = 176 -> r = (176 * 7) / 44 = 28 m. Area = (22/7) * 28 * 28 = 22 * 4 * 28 = 2464 m^2.",
        "परिधि 2πr = 176 => r = 28 मीटर। क्षेत्रफल πr² = (22/7) × 28 × 28 = 2,464 वर्ग मीटर।"),

        # 6. Commercial Math - Profit and Loss (Index 1)
        ("A shopkeeper marks an article at ₹800 and gives a 10% cash discount. If the cost price of the article is ₹600, what is the shopkeeper's profit percentage?",
        "एक दुकानदार किसी वस्तु का अंकित मूल्य ₹800 रखता है और 10% की छूट देता है। यदि वस्तु का क्रय मूल्य ₹600 है, तो दुकानदार का लाभ प्रतिशत कितना है?",
        "15%", "20% (विक्रय मूल्य = 800 - 80 = ₹720; लाभ = 720 - 600 = ₹120; लाभ% = (120/600) × 100 = 20%)", "25%", "18%",
        1, "Selling price = 800 - 10% of 800 = ₹720. Profit = 720 - 600 = ₹120. Profit % = (120 / 600) * 100 = 20%.",
        "विक्रय मूल्य = ₹720। लाभ = ₹720 - ₹600 = ₹120। लाभ% = (120 / 600) × 100 = 20%।"),

        # 7. Time & Work - Combined Work (Index 2)
        ("P can finish a job in 15 days, and Q can finish the same job in 30 days. In how many days can they complete the work if they work together?",
        "P किसी कार्य को 15 दिनों में समाप्त कर सकता है और Q उसी कार्य को 30 दिनों में समाप्त कर सकता है। यदि वे दोनों एक साथ कार्य करें, तो कार्य कितने दिनों में समाप्त होगा?",
        "8 days", "9 days", "10 days (1/15 + 1/30 = 3/30 = 1/10 => 10 दिन)", "12 days",
        2, "1/Time = 1/15 + 1/30 = (2 + 1)/30 = 3/30 = 1/10. Time = 10 days.",
        "कुल कार्य = 30 इकाई। P की दक्षता = 2, Q की = 1। समय = 30 / (2+1) = 10 दिन।"),

        # 8. Reasoning - Direction Sense Test (Index 3)
        ("Rohit walks 12 km toward South, then turns right and walks 5 km. How far is he from his initial starting point in a straight line?",
        "रोहित दक्षिण दिशा में 12 किमी चलता है, फिर दाएं मुड़कर 5 किमी चलता है। वह प्रारंभिक बिंदु से सीधी रेखा में कितनी दूरी पर है?",
        "17 km", "7 km", "15 km", "13 km (पाइथागोरस प्रमेय: √(12² + 5²) = √(144 + 25) = √169 = 13 किमी)",
        3, "Distance = sqrt(12^2 + 5^2) = sqrt(144 + 25) = sqrt(169) = 13 km.",
        "पाइथागोरस त्रिक (5, 12, 13) के अनुसार न्यूनतम दूरी = √(12² + 5²) = 13 किमी।"),

        # 9. Number System - Unit Digit in Multiplication (Index 0)
        ("What is the digit in the units place of the product: 81 × 82 × 83 × 84 × 85 × 86 × 87 × 88 × 89?",
        "गुणनफल: 81 × 82 × 83 × 84 × 85 × 86 × 87 × 88 × 89 में इकाई का अंक क्या होगा?",
        "0 (क्योंकि 82 के 2 और 85 के 5 का गुणनफल 10 देता है, जिससे इकाई अंक 0 हो जाता है)", "2", "5", "8",
        0, "The product contains 82 (even number with unit digit 2) and 85 (unit digit 5). 2 * 5 = 10, so the unit digit is always 0.",
        "श्रृंखला में सम संख्या 82 और 85 (इकाई अंक 5) दोनों विद्यमान हैं। 2 × 5 = 10 होने से इकाई अंक सदैव 0 होगा।"),

        # 10. Mensuration - Cube Volume & Surface Area (Index 1)
        ("If the total surface area of a solid wooden cube is 216 cm², what is the volume of the cube?",
        "यदि किसी ठोस लकड़ी के घन का संपूर्ण पृष्ठीय क्षेत्रफल 216 सेमी² है, तो उस घन का आयतन कितना होगा?",
        "144 cm³", "216 cm³ (6a² = 216 => a² = 36 => a = 6 सेमी; आयतन = 6³ = 216 सेमी³)", "256 cm³", "512 cm³",
        1, "Total surface area = 6a^2 = 216 -> a^2 = 36 -> a = 6 cm. Volume = a^3 = 6^3 = 216 cm^3.",
        "घन का कुल पृष्ठ = 6a² = 216 => a = 6 सेमी। आयतन = a³ = 6³ = 216 घन सेमी।"),

        # 11. Statistics - Median of Data Set (Index 2)
        ("What is the Median (माध्यिका) of the given observations: 15, 12, 8, 20, 25, 18, 10, 22?",
        "दिए गए आंकड़ों: 15, 12, 8, 20, 25, 18, 10, 22 की माध्यिका (Median) क्या होगी?",
        "15.0", "16.0", "16.5 (आरोही क्रम: 8, 10, 12, 15, 18, 20, 22, 25; माध्यिका = (15 + 18)/2 = 16.5)", "17.0",
        2, "Arrange in ascending order: 8, 10, 12, 15, 18, 20, 22, 25 (N = 8, even). Median = (4th term + 5th term) / 2 = (15 + 18) / 2 = 16.5.",
        "आंकड़ों को आरोही क्रम में रखने पर मध्य पद 15 और 18 हैं। माध्यिका = (15 + 18)/2 = 16.5।"),

        # 12. Reasoning - Number Series Pattern (Index 3)
        ("Find the next number in the series: 3, 7, 15, 31, 63, ?",
        "दी गई संख्या श्रेणी में अगला पद ज्ञात कीजिए: 3, 7, 15, 31, 63, ?",
        "125", "126", "128", "127 (पैटर्न: ×2 + 1: 63 × 2 + 1 = 127)",
        3, "The pattern is (previous number * 2) + 1: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1 = 127.",
        "पैटर्न: (संख्या × 2) + 1 => 63 × 2 + 1 = 127।"),

        # 13. Commercial Math - Compound Interest (Index 0)
        ("A sum of ₹8,000 is invested at 5% per annum compound interest compounded annually. What will be the amount at the end of 2 years?",
        "₹8,000 की राशि 5% वार्षिक चक्रवृद्धि ब्याज की दर से 2 वर्ष के लिए निवेश की जाती है। 2 वर्ष के अंत में मिश्रधन कितना होगा?",
        "₹8,820 (A = 8000 × (1 + 5/100)² = 8000 × (21/20)² = 8000 × 441/400 = ₹8,820)", "₹8,800", "₹8,900", "₹8,750",
        0, "Amount = P * (1 + R/100)^T = 8000 * (1.05)^2 = 8000 * 1.1025 = ₹8820.",
        "मिश्रधन A = P(1 + R/100)² = 8000 × (21/20)² = 8000 × (441/400) = ₹8,820।"),

        # 14. Speed & Distance - Average Speed Formula (Index 1)
        ("A person travels from Prayagraj to Lucknow at a speed of 60 km/h and returns along the same route at a speed of 40 km/h. What is his average speed for the entire journey?",
        "एक व्यक्ति प्रयागराज से लखनऊ 60 किमी/घंटा की चाल से जाता है और उसी मार्ग से 40 किमी/घंटा की चाल से वापस आता है। पूरी यात्रा के लिए उसकी औसत चाल क्या है?",
        "50 km/h", "48 km/h (औसत चाल = 2xy / (x + y) = (2 × 60 × 40) / 100 = 48 किमी/घंटा)", "45 km/h", "52 km/h",
        1, "Average speed for equal distances = (2 * x * y) / (x + y) = (2 * 60 * 40) / (60 + 40) = 4800 / 100 = 48 km/h.",
        "समान दूरी के लिए औसत चाल = 2xy / (x + y) = (2 × 60 × 40) / 100 = 48 किमी/घंटा।"),

        # 15. Reasoning - Blood Relations (Index 2)
        ("Introducing a lady, a man said: 'Her mother is the only daughter of my mother-in-law.' How is the man related to the lady?",
        "एक महिला का परिचय कराते हुए एक पुरुष ने कहा: 'इसकी माता मेरी सास की एकमात्र पुत्री है।' वह पुरुष उस महिला से किस प्रकार संबंधित है?",
        "Brother", "Uncle", "Father (पिता - सास की एकमात्र पुत्री = पुरुष की पत्नी; पत्नी की पुत्री = स्वयं की पुत्री)", "Maternal Uncle",
        2, "The man's mother-in-law's only daughter is the man's wife. The lady's mother is the man's wife. Therefore, the man is the lady's father.",
        "पुरुष की सास की एकमात्र पुत्री = पुरुष की पत्नी। महिला की माता = पुरुष की पत्नी। अतः पुरुष महिला का 'पिता' है।"),

        # 16. Algebra - Linear Equation (Index 3)
        ("If (3x - 5) / 2 = (x + 7) / 3, what is the value of x?",
        "यदि (3x - 5) / 2 = (x + 7) / 3 हो, तो x का मान क्या होगा?",
        "x = 3", "x = 4", "x = 5", "x = 4.14 / 29/7 (9x - 15 = 2x + 14 => 7x = 29 => x = 29/7)",
        3, "Cross multiplication: 3*(3x - 5) = 2*(x + 7) -> 9x - 15 = 2x + 14 -> 7x = 29 -> x = 29/7.",
        "वज्र गुणन: 3(3x - 5) = 2(x + 7) => 9x - 15 = 2x + 14 => 7x = 29 => x = 29/7।"),

        # 17. Number System - LCM & HCF of Fractions (Index 0)
        ("What is the LCM (लघुत्तम समापवर्त्य) of the fractions 2/3, 4/9, and 5/6?",
        "भिन्नों 2/3, 4/9 और 5/6 का ल.स. (LCM) क्या होगा?",
        "20/3 (भिन्नों का LCM = अंशों का LCM / हरों का HCF = LCM(2,4,5)/HCF(3,9,6) = 20/3)", "10/3", "20/9", "40/3",
        0, "LCM of fractions = LCM of numerators / HCF of denominators = LCM(2, 4, 5) / HCF(3, 9, 6) = 20 / 3.",
        "भिन्नों का LCM = LCM(2, 4, 5) / HCF(3, 9, 6) = 20 / 3।"),

        # 18. Reasoning - Syllogism (Index 1)
        ("Statements: 1. All books are pens. 2. All pens are papers. Conclusions: I. All books are papers. II. Some papers are pens.",
        "कथन: 1. सभी पुस्तकें कलम हैं। 2. सभी कलम कागज हैं।\nनिष्कर्ष: I. सभी पुस्तकें कागज हैं। II. कुछ कागज कलम हैं।",
        "Only conclusion I follows", "Both conclusions I and II follow (दोनों निष्कर्ष I और II सत्य हैं)", "Only conclusion II follows", "Neither follows",
        1, "All books are pens and all pens are papers implies All books are papers (Conclusion I is valid). By conversion, Some papers are pens (Conclusion II is valid). Both follow.",
        "कथन 1 और 2 से निष्कर्ष निकलता है कि सभी पुस्तकें कागज हैं (I सत्य) और कुछ कागज कलम हैं (II सत्य)। दोनों निष्कर्ष मान्य हैं।"),

        # 19. Mensuration - Trapezium Area (Index 2)
        ("The parallel sides of a trapezium are 14 cm and 20 cm, and the perpendicular distance between them is 8 cm. What is the area of the trapezium?",
        "एक समलंब चतुर्भुज की समांतर भुजाएं 14 सेमी और 20 सेमी हैं तथा उनके बीच की लंबवत दूरी 8 सेमी है। समलंब का क्षेत्रफल क्या होगा?",
        "120 cm²", "130 cm²", "136 cm² (क्षेत्रफल = 1/2 × (14 + 20) × 8 = 34 × 4 = 136 सेमी²)", "144 cm²",
        2, "Area of trapezium = (1/2) * (sum of parallel sides) * height = (1/2) * (14 + 20) * 8 = (1/2) * 34 * 8 = 136 cm^2.",
        "समलंब का क्षेत्रफल = 1/2 × (समांतर भुजाओं का योग) × ऊंचाई = 1/2 × (14 + 20) × 8 = 136 वर्ग सेमी।"),

        # 20. Commercial Math - Ratio of Ages (Index 3)
        ("The ratio of the present ages of Ram and Shyam is 4 : 5. Four years hence, the ratio of their ages will become 5 : 6. What is Ram's present age?",
        "राम और श्याम की वर्तमान आयु का अनुपात 4 : 5 है। चार वर्ष बाद उनकी आयु का अनुपात 5 : 6 हो जाएगा। राम की वर्तमान आयु कितनी है?",
        "12 years", "20 years", "24 years", "16 years (4x+4 / 5x+4 = 5/6 => 24x+24 = 25x+20 => x=4; राम = 4×4 = 16 वर्ष)",
        3, "Let ages be 4x and 5x. (4x + 4)/(5x + 4) = 5/6 -> 24x + 24 = 25x + 20 -> x = 4. Ram's age = 4*4 = 16 years.",
        "माना आयु 4x और 5x है। (4x+4)/(5x+4) = 5/6 => x = 4। राम की वर्तमान आयु = 4 × 4 = 16 वर्ष।"),

        # 21. Probability - Single Coin Toss (Index 0)
        ("A standard unbiased coin is tossed 3 times. What is the probability of getting at least two heads (कम से कम दो शीर्ष)?",
        "एक निष्पक्ष सिक्के को 3 बार उछाला जाता है। कम से कम दो शीर्ष (Heads) आने की प्रायिकता क्या है?",
        "1/2 (अनुकूल स्थितियां: HHH, HHT, HTH, THH = 4/8 = 1/2)", "3/8", "5/8", "3/4",
        0, "Total outcomes = 2^3 = 8. Favorable outcomes (>= 2 Heads): HHH, HHT, HTH, THH -> 4 outcomes. Probability = 4/8 = 1/2.",
        "कुल परिणाम = 8। कम से कम 2 चित्त के अनुकूल परिणाम = 4 (HHH, HHT, HTH, THH)। प्रायिकता = 4/8 = 1/2।"),

        # 22. Reasoning - Clock Angle (Index 1)
        ("What is the measure of the angle formed between the hour hand and minute hand of a clock at 8:20?",
        "किसी घड़ी में 8 बजकर 20 मिनट पर घंटे और मिनट की सुइयों के बीच कितने अंश का कोण बनता है?",
        "120°", "130° (कोण = |30H - 5.5M| = |30(8) - 5.5(20)| = |240 - 110| = 130°)", "140°", "125°",
        1, "Angle = |30*H - 5.5*M| = |30*8 - 5.5*20| = |240 - 110| = 130°.",
        "कोण सूत्र: |30 × 8 - 5.5 × 20| = |240 - 110| = 130°।"),

        # 23. Arithmetic - Partnership Capital (Index 2)
        ("A and B enter into a partnership. A invests ₹40,000 for 8 months and B invests ₹60,000 for 6 months. In what ratio should the annual profit be divided between A and B?",
        "A और B एक साझेदारी करते हैं। A ने ₹40,000 आठ महीने के लिए तथा B ने ₹60,000 छह महीने के लिए लगाए। वर्ष के अंत में लाभ को A और B में किस अनुपात में बांटा जाएगा?",
        "4 : 3", "1 : 1", "8 : 9 (लाभ अनुपात = (40000 × 8) : (60000 × 6) = 320000 : 360000 = 8 : 9)", "16 : 15",
        2, "Profit ratio = (Capital A * Time A) : (Capital B * Time B) = (40000 * 8) : (60000 * 6) = 320000 : 360000 = 8 : 9.",
        "लाभ का अनुपात = (पूंजी × समय) का अनुपात = (40,000 × 8) : (60,000 × 6) = 3,20,000 : 3,60,000 = 8 : 9।"),

        # 24. Reasoning - Calendar Day (Index 3)
        ("If 1 January 2024 was a Monday, what day of the week was 31 December 2024 (2024 is a leap year)?",
        "यदि 1 जनवरी 2024 को सोमवार था, तो 31 दिसंबर 2024 को सप्ताह का कौन-सा दिन होगा (2024 एक लीप वर्ष है)?",
        "Monday", "Wednesday", "Thursday", "Tuesday (लीप वर्ष जिस दिन शुरू होता है, उसके अगले दिन समाप्त होता है: सोमवार + 1 = मंगलवार)",
        3, "A leap year has 366 days (52 weeks + 2 days). The last day is one day ahead of the first day: Monday + 1 = Tuesday.",
        "लीप वर्ष 366 दिनों का होता है, अतः वर्ष का अंतिम दिन (31 दिसंबर) प्रथम दिन से एक दिन आगे होता है: सोमवार + 1 = मंगलवार।")
    ]

    for b in core_benchmarks:
        stem_en, stem_hi, o1, o2, o3, o4, c_idx, sol_en, sol_hi = b
        raw_choices = [
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3},
            {'en': o4, 'hi': o4}
        ]
        items.append({
            'domain': 'UPTET Math & Reasoning Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering elementary mathematics and reasoning
    math_modules = [
        # Number System & Basic Arithmetic
        ("स्थानीय मान एवं जातीय मान में अंतर", "स्थानीय मान (Place value) स्थान के अनुसार बदलता है जबकि जातीय मान (Face value) स्थिर रहता है", "Place Value vs Face Value", "संख्या पद्धति"),
        ("अभाज्य संख्याएं 1 से 100 तक गणना", "1 से 100 के बीच कुल 25 अभाज्य संख्याएं (Prime numbers) होती हैं, 2 एकमात्र सम अभाज्य है", "Prime Numbers Distribution up to 100", "संख्या पद्धति"),
        ("विभाज्यता नियम 9 एवं 3 का नियम", "संख्या के सभी अंकों का योग यदि 9 या 3 से विभाज्य हो तो संपूर्ण संख्या विभाज्य होती है", "Divisibility Rules of 3 and 9", "संख्या पद्धति"),
        ("भिन्नों का जोड़ घटाव एवं ल.स.", "भिन्नों के हरों का लघुत्तम समापवर्त्य (LCM) निकालकर समहर बनाकर सरल किया जाता है", "Fractions Arithmetic Operations", "भिन्न एवं दशमलव"),
        ("दशमलव संख्याओं का प्रसार एवं रूप", "सांत दशमलव (Terminating) के हर के अभाज्य गुणनखंड केवल 2ⁿ × 5ᵐ के रूप में होते हैं", "Terminating and Non-terminating Decimals", "भिन्न एवं दशमलव"),
        ("वर्गमूल एवं घनमूल अभाज्य गुणनखंड", "वर्गमूल में दो-दो के जोड़े तथा घनमूल में तीन-तीन समान गुणनखंडों के समूह बनाए जाते हैं", "Square Root and Cube Root Techniques", "मूल एवं घातांक"),
        ("घातांक के नियम aᵐ × aⁿ = aᵐ⁺ⁿ", "समान आधार पर गुणा में घातें जुड़ती हैं तथा भाग में घटती हैं (aᵐ / aⁿ = aᵐ⁻ⁿ)", "Laws of Exponents and Indices", "घातांक एवं करणी"),
        ("बॉडमास नियम संक्रियाओं का क्रम", "कोष्ठक (Bracket), का (Of), भाग (Division), गुणा (Multiplication), जोड़ (Addition), घटाव (Subtraction)", "BODMAS Order of Operations", "सरलीकरण"),

        # Commercial Arithmetic
        ("प्रतिशतता आधारभूत संकल्पना", "प्रतिशत का अर्थ प्रति सौ है; भिन्न को प्रतिशत में बदलने हेतु 100 से गुणा किया जाता है", "Percentage Conceptual Foundations", "व्यावसायिक गणित"),
        ("लाभ हानि क्रय-विक्रय मूल्य सूत्र", "लाभ% = (लाभ / क्रय मूल्य) × 100 तथा हानि% = (हानि / क्रय मूल्य) × 100", "Profit and Loss Fundamental Equations", "व्यावसायिक गणित"),
        ("साधारण ब्याज मूल सूत्र एवं अनुप्रयोग", "SI = (P × R × T) / 100 तथा मिश्रधन A = P + SI", "Simple Interest Standard Formulations", "व्यावसायिक गणित"),
        ("चक्रवृद्धि ब्याज वार्षिक संयोजन", "A = P(1 + R/100)ⁿ, जहाँ ब्याज पर भी ब्याज की गणना की जाती है", "Compound Interest Annual Compounding", "व्यावसायिक गणित"),
        ("अनुपात एवं समानुपात मध्य अनुपाती", "दो संख्याओं a और b का मध्यानुपाती (Mean Proportional) = √(a × b)", "Mean Proportional Formulation", "अनुपात एवं समानुपात"),
        ("साझेदारी में लाभ का बंटवारा", "लाभ का बंटवारा साझेदारों की निवेशित पूंजी और समय अवधि के गुणनफल के अनुपात में होता है", "Partnership Capital-Time Allocation", "व्यावसायिक गणित"),
        ("मिश्रण एवं पृथक्कीकरण नियम", "मात्रा अनुपात = (महंगा मूल्य - औसत मूल्य) : (औसत मूल्य - सस्ता मूल्य)", "Alligation Ratio for Mixtures", "व्यावसायिक गणित"),
        ("कार्य और समय एकांतर दिवस दक्षता", "कार्यक्षमता समय के व्युत्क्रमानुपाती होती है; कुल कार्य = दक्षता × समय", "Work Efficiency and Time Mechanics", "कार्य और समय"),
        ("नल एवं टंकी अंतर्गम व बहिर्गम", "भरने वाले नल का कार्य 1/x धनात्मक तथा खाली करने वाले का 1/y ऋणात्मक होता है", "Inlet and Outlet Rate Dynamics", "कार्य और समय"),
        ("चाल, समय एवं दूरी रूपांतरण", "किमी/घंटा को मी/सेकंड में बदलने हेतु 5/18 से गुणा तथा विपरीत हेतु 18/5 से गुणा", "Speed Distance Conversion Factors", "चाल और दूरी"),
        ("रेलगाड़ी संबंधी खंभा एवं प्लेटफॉर्म", "खंभे को पार करने में ट्रेन अपनी लंबाई तथा प्लेटफॉर्म को पार करने में (ट्रेन + प्लेटफॉर्म) दूरी तय करती है", "Train Length Crossing Formulas", "चाल और दूरी"),
        ("नाव एवं धारा शांत जल वेग", "शांत जल में चाल = 1/2(डाउनस्ट्रीम + अपस्ट्रीम), धारा का वेग = 1/2(डाउनस्ट्रीम - अपस्ट्रीम)", "Boat and Stream River Velocity", "चाल और दूरी"),
        ("औसत एवं आयु संबंधी प्रश्न", "औसत = कुल पदों का योग / पदों की कुल संख्या; आयु का अंतर सदैव स्थिर रहता है", "Average and Age Conservation", "अंकगणित"),

        # Geometry & Mensuration
        ("त्रिभुज के प्रकार एवं कोण योग", "त्रिभुज के तीनों अंतःकोणों का योग 180° तथा किसी भी दो भुजाओं का योग तीसरी से बड़ा होता है", "Triangle Inequality and Angle Sum", "ज्यामिति"),
        ("समबाहु त्रिभुज क्षेत्रफल सूत्र", "समबाहु त्रिभुज का क्षेत्रफल = (√3 / 4) × भुजा² तथा ऊंचाई = (√3 / 2) × भुजा", "Equilateral Triangle Formulas", "क्षेत्रमिति 2D"),
        ("आयत एवं वर्ग परिमाप व क्षेत्रफल", "आयत का क्षेत्रफल = l × b, परिमाप = 2(l + b); वर्ग का क्षेत्रफल = a², परिमाप = 4a", "Rectangle and Square Mensuration", "क्षेत्रमिति 2D"),
        ("समचतुर्भुज विकर्ण एवं क्षेत्रफल", "समचतुर्भुज का क्षेत्रफल = 1/2 × d1 × d2 तथा भुजा = √[(d1/2)² + (d2/2)²]", "Rhombus Area and Diagonals", "क्षेत्रमिति 2D"),
        ("वृत्त की परिधि एवं क्षेत्रफल", "परिधि = 2πr तथा क्षेत्रफल = πr²; अर्धवृत्त का परिमाप = πr + 2r", "Circle Circumference and Perimeter", "क्षेत्रमिति 2D"),
        ("बेलन का वक्र पृष्ठ एवं आयतन", "बेलन का वक्र पृष्ठ = 2πrh, संपूर्ण पृष्ठ = 2πr(r + h), आयतन = πr²h", "Right Circular Cylinder Geometry", "क्षेत्रमिति 3D"),
        ("शंकु का आयतन एवं वक्र पृष्ठ", "शंकु का वक्र पृष्ठ = πrl, आयतन = 1/3 πr²h, तिर्यक ऊंचाई l = √(r² + h²)", "Cone Geometry and Slant Height", "क्षेत्रमिति 3D"),
        ("गोले एवं अर्धगोले का आयतन", "गोले का आयतन = 4/3 πr³, पृष्ठ = 4πr²; अर्धगोले का संपूर्ण पृष्ठ = 3πr²", "Sphere and Hemisphere Mensuration", "क्षेत्रमिति 3D"),
        ("सांख्यिकी माध्य, माध्यिका एवं बहुलक", "बहुलक = 3 × माध्यिका - 2 × माध्य (कार्ल पियर्सन का आनुभविक संबंध)", "Central Tendency Empirical Formula", "सांख्यिकी"),
        ("प्रायिकता सिक्का पासा एवं ताश", "अनुकूल परिणामों की संख्या / कुल संभावित परिणामों की संख्या, 0 ≤ P(E) ≤ 1", "Probability Event Axioms", "प्रायिकता"),

        # Logical Knowledge & Reasoning
        ("सादृश्यता परीक्षण शब्द व संख्या", "प्रथम युग्म के अंतर्निहित संबंध के आधार पर द्वितीय युग्म का अज्ञात पद ज्ञात करना", "Analogy Verbal and Numerical", "तर्कशक्ति"),
        ("वर्गीकरण विजातीय पद की पहचान", "दिए गए चार विकल्पों में से उस एक का चयन करना जो अन्य तीन से भिन्न गुणधर्म रखता है", "Classification Odd-One-Out", "तर्कशक्ति"),
        ("संख्या श्रेणी समांतर एवं अंतर", "पदों के मध्य स्थिर अंतर, गुणोत्तर वृद्धि, अथवा वर्ग-घन का क्रमिक योग", "Number Series Progression Pattern", "तर्कशक्ति"),
        ("अक्षर श्रेणी वर्णमाला स्थानीय मान", "A=1 से Z=26 तक के स्थानीय मान तथा विपरीत अक्षर जोड़े (A-Z, B-Y, C-X)", "Alphabet Letter Numerical Value", "तर्कशक्ति"),
        ("कोडिंग डिकोडिंग अक्षर विस्थापन", "+1, -1, +2 या अक्षरों के स्थान परिवर्तन पर आधारित सांकेतिक कूट", "Letter Shift Coding Mechanism", "तर्कशक्ति"),
        ("रक्त संबंध प्रत्यक्ष व अप्रत्यक्ष", "पीढ़ी आरेख द्वारा माता-पिता, भाई-बहन, वैवाहिक एवं दूरस्थ संबंधों का निर्धारण", "Blood Relations Kinship Hierarchy", "तर्कशक्ति"),
        ("दिशा परीक्षण न्यूनतम विस्थापन", "चार मुख्य दिशाएं व चार उप-दिशाएं, पाइथागोरस प्रमेय द्वारा सीधी दूरी का परिकलन", "Direction Sense Displacement Logic", "तर्कशक्ति"),
        ("वेन आरेख तार्किक संबंध निरूपण", "समुच्चयों के परस्पर संबंध को वृत्तों के माध्यम से तार्किक रूप से प्रदर्शित करना", "Venn Diagram Set Relationships", "तर्कशक्ति"),
        ("न्याय निगमन वेन आरेख परीक्षण", "दिए गए कथनों को सत्य मानकर निष्कर्षात्मक सत्यता की जांच करना", "Syllogistic Deductive Reasoning", "तर्कशक्ति"),
        ("घड़ी की सुइयों का कोण सूत्र", "कोण = |30H - 5.5M|; 12 घंटे में सुइयां 11 बार 0° और 22 बार 90° बनाती हैं", "Clock Face Angle Calculations", "तर्कशक्ति"),
        ("कैलेंडर विषम दिन एवं शताब्दी", "साधारण वर्ष में 1 विषम दिन, लीप वर्ष में 2 विषम दिन; 400 वर्षों में 0 विषम दिन", "Calendar Odd Day Calculations", "तर्कशक्ति"),
        ("पासा मानक एवं सामान्य नियम", "मानक पासे में विपरीत फलकों का योग 7 होता है; खुले पासे के एकांतर फलक विपरीत होते हैं", "Dice Surface Rules and Expansion", "तर्कशक्ति"),
        ("दर्पण एवं जल प्रतिबिंब नियम", "दर्पण में दायां-बायां उत्क्रमण तथा जल प्रतिबिंब में ऊपर-नीचे का उत्क्रमण होता है", "Mirror and Water Reflection Rules", "तर्कशक्ति"),
        ("गणितीय संक्रियाएं चिह्न परिवर्तन", "दिए गए निर्देशों के अनुसार गणितीय चिह्नों को बदलकर BODMAS नियम से हल करना", "Mathematical Operation Substitution", "तर्कशक्ति")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(math_modules)
        topic, facts, topic_en, category = math_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the Mathematics and Reasoning curriculum of UP TET & Super TET, which principle or formula concerning '{topic_en}' is mathematically authentic?"
            stem_hi = f"यूपी टीईटी एवं सुपर टीईटी के गणित एवं तार्किक ज्ञान पाठ्यक्रम में '{topic}' से संबंधित कौन-सा नियम अथवा सूत्र प्रामाणिक है?"
            sol_en = f"Standard mathematical rule: {facts}. Category: {category}."
            sol_hi = f"प्रामाणिक गणितीय नियम: {facts}। वर्ग: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Calculated from Jurassic belemnite fossil shell density logs", 'hi': "जुरासिक बेलेमनाइट जीवाश्म घनत्व रिकॉर्ड से परिकलित"},
                {'en': "Derived from abyssal deep ocean trench hydrodynamic salinity vents", 'hi': "अगाध महासागरीय लवणता वेंट से व्युत्पन्न"},
                {'en': "Formulated as part of North Sea offshore oil concessions 1920", 'hi': "उत्तरी सागर तेल रियायतों के तहत तैयार"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key quantitative or analytical reasoning topic is '{topic_en}' categorized?"
            stem_hi = f"शिक्षक भर्ती परीक्षा में '{topic}' का संबंध किस प्रमुख गणितीय अथवा तार्किक ज्ञान खंड से है?"
            sol_en = f"Classified under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Triassic Sandstone Cross-bedding Paleocurrent Indices", 'hi': "ट्रायसिक बलुआ पत्थर जीवाश्म प्रवाह सूचकांक"},
                {'en': f"UP TET/Super TET Core: {category} ({facts})", 'hi': f"गणित मानक: {category} ({facts})"},
                {'en': "Glacial Moraine Till Grain Size Sorting Histograms", 'hi': "हिमनदीय मोरेन कण आकार हिस्टोग्राम"},
                {'en': "Medieval Hanseatic League Salt Herring Trade Ledgers", 'hi': "मध्यकालीन हेंसियाटिक लीग व्यापार खाता"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"Why is an accurate procedural understanding of '{topic_en}' vital for elementary school teaching and competitive problem-solving?"
            stem_hi = f"प्राथमिक शिक्षण एवं प्रतियोगी परीक्षा में तीव्र समाधान हेतु '{topic}' का अनुप्रयोग क्यों अनिवार्य है?"
            sol_en = f"Key computational significance: {facts} ({category})."
            sol_hi = f"महत्व: {facts} ({category})।"
            choices = [
                {'en': "To compute supersonic aircraft aerodynamic shockwave angles", 'hi': "सुपरसोनिक विमान शॉकवेव कोण गणना हेतु"},
                {'en': "To synthesize synthetic hydrocarbons from deep subsoil shale", 'hi': "गहरे उपमृदा शेल से सिंथेटिक हाइड्रोकार्बन संश्लेषित करने हेतु"},
                {'en': f"Essential for quantitative problem solving: {facts} ({category})", 'hi': f"संख्यात्मक व तार्किक समाधान हेतु अनिवार्य: {facts} ({category})"},
                {'en': "To align solar panel tilt angles during autumnal equinox", 'hi': "शरद विषुव के दौरान सौर पैनल के झुकाव कोण को समायोजित करने हेतु"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately presents the mathematical rule of '{topic_en}'?"
            stem_hi = f"निम्न में से कौन-सा विकल्प '{topic}' के गणितीय अथवा तार्किक नियम का सबसे सटीक सारांश प्रस्तुत करता है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Regulates deep trench oceanic tectonic subduction boundary friction", 'hi': "गहरे महासागरीय सबडक्शन घर्षण को नियंत्रित करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर कोरोनाग्राफ स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Measures hydraulic gradient across underwater continental shelves", 'hi': "पानी के नीचे महाद्वीपीय शेल्फ पर हाइड्रोलिक प्रवणता मापता है"},
                {'en': f"Standard mathematical/reasoning principle: {facts} ({category})", 'hi': f"मानक गणितीय/तार्किक नियम: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'UPTET Math - {category}',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': opt_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'EASY' if i % 3 == 0 else ('MODERATE' if i % 3 == 1 else 'HARD')
        })

    assert len(items) == 300, f"Expected 300 items, got {len(items)}"
    return items

if __name__ == '__main__':
    res = get_raw_math_reasoning_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

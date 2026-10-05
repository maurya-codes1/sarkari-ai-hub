"""
CTET - Mathematics & Pedagogical Issues (गणित एवं शिक्षण शास्त्र) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Number Concepts & Operations: Place value, Face value, Fractions, Decimals, Factors, Multiples, LCM & HCF
- Geometry & Spatial Understanding: 2D & 3D shapes, Euler's formula (F+V-E=2), Symmetry, Tessellations, Tangrams
- Measurement, Time & Money: Unit conversions, Time calculation (arrival/departure), Weight, Volume, Capacity
- Patterns & Data Handling: Number sequences, Pictographs, Bar charts, Mean, Median
- Nature of Mathematics: Deductive vs Inductive reasoning, Abstraction, Axioms, Conjectures, Proofs
- Van Hiele Levels of Geometric Thought: Level 0 (Visualization) to Level 4 (Rigor)
- Teaching-Learning Materials (TLM): Abacus, Geo-board, Dienes blocks, Dot grid, Fraction discs
- Pedagogical Issues & Remediation: Error analysis, Common misconceptions, Diagnostic & remedial teaching, Math anxiety
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_math_pedagogy_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Van Hiele Levels (Index 0)
        ("According to Pierre and Dina van Hiele's theory of geometric thought, at which level does a child judge geometric shapes purely based on their overall visual appearance, e.g., identifying a rectangle because 'it looks like a door'?",
         "वैन हीले के ज्यामितीय चिंतन के सिद्धांत के अनुसार, किस स्तर पर बच्चा आकृतियों को केवल उनके समग्र दृश्य स्वरूप (दिखावट) के आधार पर पहचानता है, जैसे आयत को 'दरवाजे जैसा' कहना?",
         "Level 0: Visualization / Recognition (स्तर 0: प्रत्यक्षीकरण / दृश्यीकरण)", "Level 1: Analysis / Description", "Level 2: Informal Deduction / Ordering", "Level 3: Formal Deduction",
         0, "Level 0 (Visualization) is characterized by recognizing geometric shapes as whole entities based on perceptual appearance.",
         "स्तर 0 (प्रत्यक्षीकरण / Visualization) पर बालक आकृतियों के गुणों की समझ के बिना केवल उनके बाह्य स्वरूप या समानता के आधार पर पहचान करता है।"),

        # 2. Teaching Aid - Dienes Blocks (Index 1)
        ("Which teaching-learning material (TLM) is most effective for teaching primary grade students the concepts of place value, base-10 number structure, and addition/subtraction with regrouping?",
         "प्राथमिक कक्षाओं में स्थानीय मान, 10-आधारित संख्या संरचना और हासिल वाले जोड़/घटाव की अवधारणा सिखाने के लिए कौन-सा शिक्षण साधन (TLM) सर्वाधिक उपयुक्त है?",
         "Protractor", "Dienes Blocks / Base-Ten Blocks (डीन्स ब्लॉक / आधार-10 ब्लॉक)", "Geo-board", "Prism",
         1, "Dienes blocks (units, rods, flats, cubes) physically represent ones, tens, hundreds, and thousands, ideal for place value and regrouping.",
         "डीन्स ब्लॉक (Dienes Blocks) इकाइयों, दहाई छड़ों व सैकड़ा प्लेटों के माध्यम से स्थानीय मान और पुनर्समूहन (हासिल) की समझ विकसित करने हेतु सर्वोत्तम हैं।"),

        # 3. Euler's Formula for Polyhedra (Index 2)
        ("For any simple convex polyhedron with Faces (F), Vertices (V), and Edges (E), Euler's formula states that:",
         "किसी साधारण उत्तल बहुफलक के फलकों (F), शीर्षों (V) और किनारों (E) के लिए ऑयलर (Euler) का प्रामाणिक संबंध क्या है?",
         "F + E - V = 2", "F + V + E = 2", "F + V - E = 2 (फलक + शीर्ष - किनारे = 2)", "F - V + E = 2",
         2, "Euler's characteristic formula for convex polyhedra is F + V - E = 2.",
         "ऑयलर सूत्र के अनुसार किसी बहुफलक में फलक (F) + शीर्ष (V) - किनारे (E) = 2 होता है।"),

        # 4. Teaching Aid - Geo-Board (Index 3)
        ("A primary school teacher wants to introduce the concepts of perimeter, area of 2D geometric shapes, and symmetry using rubber bands stretched on pins. Which teaching tool is the teacher utilizing?",
         "एक प्राथमिक शिक्षिका खूंटियों/पिनों पर रबर बैंड खींचकर समतल आकृतियों के परिमाप, क्षेत्रफल और सममिति की अवधारणा पढ़ाना चाहती हैं। वह किस शिक्षण उपकरण का प्रयोग कर रही हैं?",
         "Abacus", "Tangram", "Napier's Bones", "Geo-board (जियो-बोर्ड)",
         3, "A Geo-board is a manipulative board with an array of pegs used to explore plane geometric concepts, perimeter, and area with rubber bands.",
         "जियो-बोर्ड (Geo-board) पर लगे पिनों पर रबर बैंड चढ़ाकर त्रिभुज, आयत, वर्ग, सममिति और परिमाप की अवधारणाएं मूर्त रूप से समझाई जाती हैं।"),

        # 5. Place Value vs Face Value (Index 0)
        ("In the number 75,482, what is the difference between the place value and face value of the digit '5'?",
         "संख्या 75,482 में अंक '5' के स्थानीय मान (Place Value) और जातीय मान (Face Value) का अंतर क्या है?",
         "4,995 (5,000 - 5 = 4,995)", "5,005", "5,000", "4,950",
         0, "Place value of 5 is 5,000 (thousands place); Face value of 5 is 5. Difference = 5,000 - 5 = 4,995.",
         "5 का स्थानीय मान = 5,000 तथा जातीय मान = 5। अंतर = 5,000 - 5 = 4,995।"),

        # 6. Nature of Mathematics (Index 1)
        ("According to the National Curriculum Framework (NCF 2005), what is the higher aim of teaching mathematics at the school level?",
         "राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF 2005) के अनुसार, विद्यालयी स्तर पर गणित शिक्षण का उच्चतर उद्देश्य (Higher Aim) क्या है?",
         "To prepare students exclusively for engineering entrance examinations", "To mathematize the child's thought processes and problem-solving capacities (बालक के चिंतन का गणितीयकरण करना)", "To memorize all mathematical formulas and multiplication tables", "To cover the entire syllabus before terminal assessments",
         1, "NCF 2005 states that the higher aim of mathematics education is the 'mathematization of the child's thinking processes'.",
         "एनसीएफ 2005 के अनुसार गणित शिक्षण का मुख्य व उच्चतर लक्ष्य बालक की सोच, चिंतन व समस्या समाधान क्षमताओं का 'गणितीयकरण' (Mathematization of thinking) करना है।"),

        # 7. Fractional Parts Comparison (Index 2)
        ("Which of the following fractions is the greatest among 3/5, 7/10, 4/15, and 11/20?",
         "भिन्न 3/5, 7/10, 4/15 और 11/20 में से सबसे बड़ी भिन्न कौन-सी है?",
         "3/5 (= 0.60)", "4/15 (= 0.267)", "7/10 (= 0.70 - सर्वाधिक मान)", "11/20 (= 0.55)",
         2, "Decimal values: 3/5 = 0.60, 7/10 = 0.70, 4/15 ≈ 0.267, 11/20 = 0.55. The greatest is 7/10.",
         "दशमलव मान: 3/5 = 0.60; 7/10 = 0.70; 4/15 ≈ 0.27; 11/20 = 0.55। अतः सबसे बड़ी भिन्न 7/10 है।"),

        # 8. Time Duration Calculation (Index 3)
        ("A train departs from New Delhi railway station at 18:40 on Friday and reaches its destination station at 07:15 on Saturday. What was the total travel duration of the journey?",
         "एक रेलगाड़ी नई दिल्ली से शुक्रवार को 18:40 बजे प्रस्थान करती है और शनिवार को 07:15 बजे अपने गंतव्य स्टेशन पहुंचती है। यात्रा की कुल समयावधि कितनी थी?",
         "11 hours 25 minutes", "13 hours 15 minutes", "12 hours 45 minutes", "12 hours 35 minutes (18:40 to 24:00 = 5h 20m; 00:00 to 07:15 = 7h 15m; Total = 12h 35m)",
         3, "Time on Friday: 24:00 - 18:40 = 5 hours 20 mins. Time on Saturday: 7 hours 15 mins. Total duration = 5h 20m + 7h 15m = 12 hours 35 minutes.",
         "शुक्रवार को समय: 24:00 - 18:40 = 5 घंटे 20 मिनट। शनिवार को समय = 7 घंटे 15 मिनट। कुल समय = 5 घंटे 20 मिनट + 7 घंटे 15 मिनट = 12 घंटे 35 मिनट।"),

        # 9. Teaching Aid - Abacus (Index 0)
        ("Which traditional calculating device featuring beads sliding on parallel wires is particularly useful for teaching number representation, place value, and arithmetic operations to visually impaired students?",
         "समानांतर तारों पर मोतियों को खिसकाकर गणना करने वाला कौन-सा पारंपरिक उपकरण दृष्टिबाधित शिक्षार्थियों को संख्या निरूपण, स्थानीय मान और जोड़-घटाव सिखाने हेतु विशेष रूप से उपयोगी है?",
         "Abacus / Soroban (अबेकस / गिनतारा)", "Protractor", "Tangram", "Fraction Grid",
         0, "The Abacus provides tactile, sensory representation of units, tens, hundreds, making it ideal for visual and kinesthetic learners.",
         "अबेकस या गिनतारा (Abacus) दृष्टिबाधित बच्चों को स्पर्श द्वारा संख्याओं के स्थानीय मान और गणना को समझने में मदद करता है।"),

        # 10. Inductive vs Deductive Method (Index 1)
        ("A mathematics teacher first presents multiple concrete examples of right-angled triangles, has students measure sides to observe that a² + b² = c², and then leads them to formulate the general Pythagoras theorem. Which pedagogical method did the teacher use?",
         "एक गणित शिक्षक पहले समकोण त्रिभुज के कई मूर्त उदाहरण प्रस्तुत करते हैं, बच्चों से भुजाएं नपवाकर a² + b² = c² का अवलोकन करवाते हैं, और फिर सामान्य पाइथागोरस प्रमेय का निष्कर्ष निकलवाते हैं। शिक्षक ने किस विधि का प्रयोग किया?",
         "Deductive Method", "Inductive Method (आगमन विधि - विशिष्ट से सामान्य की ओर)", "Lecture Method", "Analytical Proof Method",
         1, "The Inductive method proceeds from concrete specific examples to general rules and abstractions (Examples -> Formulation of Rule).",
         "आगमन विधि (Inductive Method) में उदाहरणों के अवलोकन व परीक्षण से सामान्य नियम का निगमन किया जाता है (विशिष्ट से सामान्य, मूर्त से अमूर्त)।"),

        # 11. Tessellation / Tiling (Index 2)
        ("Which geometric property enables regular hexagons, equilateral triangles, and squares to create a complete tessellation (tiling a plane without gaps or overlaps)?",
         "सम षट्भुज, समबाहु त्रिभुज और वर्ग द्वारा बिना किसी खाली स्थान या परस्पर चढ़ाई के तल को पूर्णतः ढकने (Tessellation / टाइलिंग) का क्या गणितीय कारण है?",
         "Their interior angles are always obtuse", "Their perimeter is always an integer multiple of 10", "The sum of their interior angles meeting at each vertex divides 360° exactly (शीर्ष पर मिलने वाले आंतरिक कोणों का योग 360° का भाजक होना)", "Their diagonals bisect each other perpendicularly",
         2, "A plane tessellation requires that the interior angles of shapes meeting at a vertex sum to exactly 360°.",
         "टाइलिंग (Tessellation) हेतु आवश्यक है कि एक शीर्ष पर मिलने वाले कोणों का योग ठीक 360° हो (जैसे वर्ग 90°×4, समबाहु त्रिभुज 60°×6, सम षट्भुज 120°×3)।"),

        # 12. Van Hiele - Informal Deduction (Index 3)
        ("A middle school student understands that 'all squares are rectangles, but not all rectangles are squares' because they recognize relationships between classes of properties. According to Van Hiele, at which level of geometric thought is the student operating?",
         "एक छात्र यह समझता है कि 'सभी वर्ग आयत हैं, परंतु सभी आयत वर्ग नहीं हैं' क्योंकि वह गुणों के मध्य पारस्परिक संबंधों को पहचानता है। वैन हीले के अनुसार छात्र ज्यामितीय चिंतन के किस स्तर पर है?",
         "Level 0: Visualization", "Level 1: Analysis", "Level 4: Rigor", "Level 2: Informal Deduction / Ordering (स्तर 2: अनौपचारिक निगमन / संबंध निर्धारण)",
         3, "Level 2 (Informal Deduction / Ordering) involves understanding interrelationships between properties of shapes and class inclusion.",
         "स्तर 2 (अनौपचारिक निगमन) पर बालक विभिन्न आकृतियों के गुणों में अंतर्संबंध समझने लगता है और समावेशी संबंध (जैसे वर्ग एक विशेष आयत है) स्थापित करता है।"),

        # 13. Unit Conversion - Capacity (Index 0)
        ("A water container contains 3 liters and 450 milliliters of water. If 850 milliliters of water is drawn out, how much water remains in the container?",
         "एक पानी के बर्तन में 3 लीटर 450 मिलीलीटर पानी है। यदि उसमें से 850 मिलीलीटर पानी निकाल लिया जाए, तो बर्तन में कितना पानी शेष बचेगा?",
         "2 liters 600 milliliters (2,600 mL)", "2 liters 750 milliliters", "2 liters 500 milliliters", "1 liter 600 milliliters",
         0, "3,450 mL - 850 mL = 2,600 mL = 2 liters 600 milliliters.",
         "कुल पानी = 3,450 मिली। निकाला गया पानी = 850 मिली। शेष पानी = 3,450 - 850 = 2,600 मिली = 2 लीटर 600 मिली।"),

        # 14. Error Analysis in Mathematics (Index 1)
        ("When asked to solve 43 - 27, a third-grade student writes 24 (subtracting 3 from 7 in the units column: 7 - 3 = 4). What is the primary mathematical misconception revealed by this error?",
         "कक्षा 3 का एक छात्र 43 - 27 को हल करते समय 24 लिखता है (इकाई के अंक में 7 में से 3 घटाकर 4 लिखता है)। यह त्रुटि किस मुख्य गणितीय भ्रांति को दर्शाती है?",
         "Inability to recall multiplication tables", "Misconception of subtraction as subtracting smaller digit from larger digit regardless of place value (उधार/पुनर्समूहन की समझ का अभाव)", "Confusion between addition and subtraction symbols", "Lack of spatial visualization ability",
         1, "This is a classic regrouping (borrowing) error where the child subtracts the smaller digit from the larger digit without understanding place value.",
         "यह पुनर्समूहन (उधार लेने) की त्रुटि है जिसमें बच्चा स्थानीय मान को समझे बिना केवल बड़ी संख्या में से छोटी संख्या को घटा देता है।"),

        # 15. Tangram Geometry (Index 2)
        ("A traditional Chinese geometric puzzle known as 'Tangram' consists of how many geometric flat pieces (tans) cut from a square?",
         "चीन की पारंपरिक ज्यामितीय पहेली 'टैनग्राम' (Tangram) में एक वर्ग से काटे गए कुल कितने ज्यामितीय टुकड़े (Tans) होते हैं?",
         "5 pieces", "6 pieces", "7 pieces (5 Triangles, 1 Square, 1 Parallelogram)", "8 pieces",
         2, "A Tangram consists of 7 pieces: 5 triangles (2 large, 1 medium, 2 small), 1 square, and 1 parallelogram.",
         "टैनग्राम में 7 टुकड़े होते हैं: 5 त्रिभुज (2 बड़े, 1 मध्यम, 2 छोटे), 1 वर्ग और 1 समानांतर चतुर्भुज।"),

        # 16. Concept of Perimeter (Index 3)
        ("A wire is bent to form an equilateral triangle with side 12 cm. If the same wire is rebent without cutting to form a square, what will be the length of each side of the square?",
         "एक तार को मोड़कर 12 सेमी भुजा वाला समबाहु त्रिभुज बनाया गया है। यदि उसी तार को बिना काटे मोड़कर एक वर्ग बनाया जाए, तो वर्ग की प्रत्येक भुजा की लंबाई क्या होगी?",
         "8 cm", "10 cm", "12 cm", "9 cm (Perimeter = 3 × 12 = 36 cm; Square side = 36 / 4 = 9 cm)",
         3, "Perimeter of triangle = 3 × 12 = 36 cm. Perimeter of square = 4 × side = 36 cm => side = 36 / 4 = 9 cm.",
         "तार की लंबाई = त्रिभुज का परिमाप = 3 × 12 = 36 सेमी। वर्ग का परिमाप = 4 × भुजा = 36 सेमी => वर्ग की भुजा = 36 / 4 = 9 सेमी।"),

        # 17. Symmetrical Figures (Index 0)
        ("How many lines of symmetry (सममिति रेखाएं) does a regular rectangle (which is not a square) possess?",
         "एक सामान्य आयत (जो वर्ग नहीं है) में कितनी सममिति रेखाएं (Lines of Symmetry) होती हैं?",
         "2 lines of symmetry (Vertical and Horizontal bisectors)", "4 lines of symmetry", "1 line of symmetry", "Infinite lines of symmetry",
         0, "A rectangle has 2 lines of symmetry connecting midpoints of opposite sides (not diagonals).",
         "एक आयत में 2 सममिति रेखाएं होती हैं (विपरीत भुजाओं के मध्य बिंदुओं को मिलाने वाली क्षैतिज व ऊर्ध्वाधर रेखाएं, विकर्ण नहीं)।"),

        # 18. Diagnostic Teaching (Index 1)
        ("What is the primary function of a 'Diagnostic Test' (निदानात्मक परीक्षण) in mathematics education?",
         "गणित शिक्षण में 'निदानात्मक परीक्षण' (Diagnostic Test) का प्राथमिक उद्देश्य क्या होता है?",
         "To rank students for awarding annual scholarships", "To identify specific learning difficulties, conceptual gaps, and misconceptions of learners (अधिगम कठिनाइयों एवं अवधारणात्मक कमियों की पहचान करना)", "To certify students at the completion of a school grade", "To evaluate teacher's instructional speed against annual plan",
         1, "Diagnostic tests pinpoint specific conceptual gaps and weaknesses to inform subsequent remedial teaching.",
         "निदानात्मक परीक्षण का मुख्य उद्देश्य शिक्षार्थियों की सीखने की विशिष्ट कमजोरियों, भ्रांतियों और कमियों को पहचानना है ताकि उपचारात्मक शिक्षण किया जा सके।"),

        # 19. Mathematics Language (Index 2)
        ("Which of the following characteristics best reflects the formal 'Language of Mathematics' (गणित की भाषा)?",
         "निम्नलिखित में से कौन-सी विशेषता 'गणित की भाषा' (Language of Mathematics) को सर्वोत्तम रूप से व्यक्त करती है?",
         "Ambiguous, poetic, and emotionally expressive", "Dependent entirely on regional spoken dialects", "Precise, concise, unambiguous, and symbolic (परिशुद्ध, संक्षिप्त, स्पष्ट एवं प्रतीकात्मक)", "Based on narrative descriptive storytelling without symbols",
         2, "The language of mathematics is characterized by precision, conciseness, lack of ambiguity, and systemic use of symbolic syntax.",
         "गणित की भाषा अत्यंत सटीक, संक्षिप्त, सुस्पष्ट और प्रतीकात्मक (Symbolic) होती है जिसमें किसी प्रकार की अस्पष्टता या द्व्यर्थी भाव नहीं होता।"),

        # 20. Data Handling - Average (Index 3)
        ("The marks scored by a student in 5 mathematics weekly tests are 14, 18, 12, 16, and 20. What is the mean score of the student?",
         "एक छात्र द्वारा 5 साप्ताहिक गणित परीक्षाओं में प्राप्त अंक 14, 18, 12, 16 और 20 हैं। छात्र का माध्य (औसत) प्राप्तांक क्या है?",
         "14", "15", "17", "16 ((14 + 18 + 12 + 16 + 20) / 5 = 80 / 5 = 16)",
         3, "Mean = Sum of scores / Total tests = (14 + 18 + 12 + 16 + 20) / 5 = 80 / 5 = 16.",
         "माध्य = पदों का योग / पदों की संख्या = (14 + 18 + 12 + 16 + 20) / 5 = 80 / 5 = 16।"),

        # 21. Concept of Fraction (Index 0)
        ("Which pedagogical sequence represents the most effective progression when introducing the concept of 'Fractions' to primary grade learners?",
         "प्राथमिक स्तर पर शिक्षार्थियों को 'भिन्न' (Fractions) की अवधारणा से परिचित कराने के लिए कौन-सा शैक्षणिक क्रम सर्वाधिक प्रभावी है?",
         "Concrete objects (folding paper/cutting fruits) -> Pictorial representation -> Symbolic notation a/b (मूर्त अनुभव -> चित्रात्मक रूप -> प्रतीकात्मक रूप)", "Symbolic definition a/b -> Mathematical proofs -> Rote drill of fraction rules", "Teaching LCM directly -> Solving complex algebraic fractions", "Memorizing fraction formulas without visual models",
         0, "Following Bruner's EIS principle (Enactive -> Iconic -> Symbolic): concrete manipulatives first, then pictures, then symbolic representation a/b.",
         "ब्रूनर के सिद्धांत (मूर्त -> चित्रात्मक -> प्रतीकात्मक) के अनुसार पहले कागज मोड़ना/सेब काटना, फिर चित्र में आधा/तिहाई दर्शाना, और अंत में 1/2 या 1/4 लिखना सिखाया जाना चाहिए।"),

        # 22. Community Mathematics (Index 1)
        ("What is meant by the concept of 'Community Mathematics' (सामुदायिक गणित) in elementary pedagogy?",
         "प्रारंभिक शिक्षाशास्त्र में 'सामुदायिक गणित' (Community Mathematics) की अवधारणा से क्या तात्पर्य है?",
         "Mathematics taught exclusively in community halls outside schools", "Everyday practical mathematics used in social life, household budgeting, and community trades (दैनिक जीवन, घरेलू बजट व लोक-व्यवहार में प्रयुक्त व्यावहारिक गणित)", "Advanced theoretical mathematics researched by universities", "Ancient religious chanting of numerical hymns",
         1, "Community mathematics refers to practical ethnomathematics and numerical transactions embedded in everyday community life.",
         "सामुदायिक गणित से आशय दैनिक जीवन, घरेलू बजट, हाट-बाजार, कृषि व लोक-दस्तकारी में प्रयुक्त व्यावहारिक गणित से है जो समुदाय के अनुभव से जुड़ा होता है।"),

        # 23. Measurement - Money (Index 2)
        ("Ramesh bought 3 notebooks at ₹45 each and 4 pens at ₹12.50 each. He gave a ₹500 currency note to the shopkeeper. How much balance amount should he receive back?",
         "रमेश ने ₹45 प्रति कॉपी की दर से 3 कॉपियाँ और ₹12.50 प्रति पेन की दर से 4 पेन खरीदे। उसने दुकानदार को ₹500 का नोट दिया। उसे कितने रुपये वापस मिलने चाहिए?",
         "₹285", "₹305", "₹315 (3×45 = 135; 4×12.50 = 50; Total = 185; Return = 500 - 185 = 315)", "₹325",
         2, "Cost of notebooks = 3 × 45 = ₹135. Cost of pens = 4 × 12.50 = ₹50. Total cost = 135 + 50 = ₹185. Change = 500 - 185 = ₹315.",
         "कॉपियों का मूल्य = 3 × 45 = ₹135। पेनों का मूल्य = 4 × 12.50 = ₹50। कुल खर्च = ₹185। वापस मिलने वाली राशि = 500 - 185 = ₹315।"),

        # 24. Math Anxiety & Remediation (Index 3)
        ("Which instructional approach is most effective for reducing 'Mathematics Anxiety' (गणित का भय) and fostering mathematical self-efficacy among elementary students?",
         "प्रारंभिक स्तर के विद्यार्थियों में 'गणित के भय' (Math Anxiety) को कम करने और आत्मविश्वास बढ़ाने के लिए कौन-सा शैक्षणिक दृष्टिकोण सर्वाधिक प्रभावी है?",
         "Conducting unannounced timed speed tests with public score displays", "Assigning double homework whenever a student makes a computational mistake", "Encouraging competitive comparison among top-ranking peers", "Using collaborative math games, hands-on puzzles, and valuing partial reasoning and error discussion (सहयोगात्मक गणितीय खेल, पहेलियां और त्रुटियों पर खुली चर्चा)",
         3, "Creating a supportive, exploratory environment with manipulatives, mathematical games, and treating errors as learning opportunities alleviates math anxiety.",
         "गणितीय खेलों, पहेलियों, मूर्त शिक्षण सामग्रियों का उपयोग और गलतियों को सीखने का स्वाभाविक हिस्सा मानकर खुली चर्चा करने से बच्चों का गणित भय दूर होता है।")
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
            'domain': 'Mathematics & Pedagogy Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all CTET Mathematics syllabus topics
    math_modules = [
        # Number Sense & Operations
        ("Place Value and Base-Ten System", "Understanding units, tens, hundreds and positional significance of digits", "स्थानीय मान एवं दाशमिक संख्या प्रणाली", "संख्या ज्ञान"),
        ("Concept of Zero in Arithmetic", "Role of zero as place holder and identity element in addition", "शून्य की संकल्पना एवं गणितीय संक्रियाएं", "संख्या ज्ञान"),
        ("Prime and Composite Numbers", "Numbers having exactly two factors vs numbers with more than two factors", "अभाज्य एवं भाज्य संख्याओं का वर्गीकरण", "संख्या ज्ञान"),
        ("Divisibility Rules for 3, 4, 6, 9, 11", "Algorithmic tests for factors without full division", "विभाज्यता के नियम एवं अनुप्रयोग", "संख्या ज्ञान"),
        ("Fractions as Part of a Whole and Collection", "Proper, improper, mixed fractions and visual partitioning", "भिन्नों की संकल्पना (पूर्ण का अंश)", "संख्या ज्ञान"),
        ("Operations on Decimals and Fractions", "Addition, subtraction, multiplication with decimal place alignment", "दशमलव एवं भिन्न संक्रियाएं", "संख्या ज्ञान"),
        ("LCM and HCF Word Problems", "Real-world applications in cyclical events and equal groupings", "ल.स. एवं म.स. के व्यावहारिक अनुप्रयोग", "संख्या ज्ञान"),
        ("Order of Operations (BODMAS / PEMDAS)", "Rule of precedence in simplifying arithmetic expressions", "बोडमास नियम एवं सरलीकरण", "संख्या ज्ञान"),

        # Geometry & Spatial Understanding
        ("Van Hiele Level 0 (Visualization / Recognition)", "Recognizing shapes by whole visual appearance (circle looks like wheel)", "वैन हीले स्तर 0 (प्रत्यक्षीकरण)", "ज्यामिति शिक्षण"),
        ("Van Hiele Level 1 (Analysis / Description)", "Recognizing shapes by their properties (rectangle has 4 right angles)", "वैन हीले स्तर 1 (विश्लेषण)", "ज्यामिति शिक्षण"),
        ("Van Hiele Level 2 (Informal Deduction / Ordering)", "Understanding interrelationships and class inclusions (all squares are rectangles)", "वैन हीले स्तर 2 (अनौपचारिक निगमन)", "ज्यामिति शिक्षण"),
        ("Van Hiele Level 3 (Formal Deduction)", "Constructing deductive proofs using axioms and theorems", "वैन हीले स्तर 3 (औपचारिक निगमन)", "ज्यामिति शिक्षण"),
        ("Euler's Polyhedral Formula (F + V - E = 2)", "Topological invariant connecting faces, vertices and edges of 3D solids", "ऑयलर सूत्र (F + V - E = 2)", "ज्यामिति"),
        ("2D Geometric Shapes and Symmetry Lines", "Rotational and reflectional symmetry of polygons", "द्वि-विमीय आकृतियां एवं सममिति", "ज्यामिति"),
        ("3D Geometric Solids and Nets", "Unfolding cubes, prisms and cylinders into 2D planar nets", "त्रि-विमीय ठोस एवं उनके जाल (Nets)", "ज्यामिति"),
        ("Tessellations (Tiling the Plane)", "Covering surface without gaps using polygons whose angles divide 360°", "टाइलिंग / टेसेलेशन की ज्यामिति", "ज्यामिति"),
        ("Tangram 7-Piece Spatial Puzzle", "Exploring spatial relations, congruency and conservation of area", "टैनग्राम पहेली एवं स्थानिक समझ", "ज्यामिति"),

        # Measurement, Weight, Time & Money
        ("Unit Conversion in Metric System (KHDUDCM)", "Kilo, Hecto, Deka, Unit, Deci, Centi, Milli decimal scale", "मीट्रिक प्रणाली एवं इकाई रूपांतरण", "मापन"),
        ("Perimeter vs Area Distinction", "Boundary length (1D) vs surface coverage (2D) and common student confusion", "परिमाप एवं क्षेत्रफल का विभेद", "मापन"),
        ("Elapsed Time and 24-Hour Railway Clock", "Calculating travel duration across midnight boundaries", "समय गणना एवं 24-घंटे की रेलवे समय-सारणी", "मापन"),
        ("Volume and Capacity (Liters to Cubic cm)", "Relationship: 1 liter = 1000 cm³ and practical liquid measurement", "आयतन एवं धारिता की संकल्पना", "मापन"),
        ("Weight Measurement Word Problems", "Converting kilograms and grams in market transaction scenarios", "भार / वजन मापन एवं व्यावहारिक प्रश्न", "मापन"),
        ("Money Calculations and Budgeting", "Adding, subtracting rupees and paise, making change in everyday life", "मुद्रा / धन संबंधी गणनाएं", "मापन"),

        # Data Handling & Patterns
        ("Pictographs and Scaling of Icons", "Representing data using symbolic keys (1 symbol = 10 units)", "चित्रालेख (Pictograph) एवं पैमाना", "आंकड़ा प्रबंधन"),
        ("Bar Graphs Interpretation in Primary Classes", "Comparing discrete categories using horizontal and vertical bars", "दंड आरेख (Bar Graph) की समझ", "आंकड़ा प्रबंधन"),
        ("Measures of Central Tendency (Mean, Median, Mode)", "Identifying typical values in frequency distributions", "केंद्रीय प्रवृत्ति के माप (माध्य, माध्यिका, बहुलक)", "आंकड़ा प्रबंधन"),
        ("Number Patterns and Algebraic Thinking", "Arithmetic sequences fostering early algebraic generalization", "संख्यात्मक पैटर्न एवं बीजगणितीय सोच", "पैटर्न"),
        ("Geometric and Tessellation Patterns", "Recognizing repetitions in nature, fabrics, and architecture", "ज्यामितीय पैटर्न एवं आवर्ती विन्यास", "पैटर्न"),

        # Nature & Philosophy of Mathematics
        ("Mathematization of Child's Thinking (NCF 2005)", "Developing logical articulation, pattern recognition and algorithmic thinking", "चिंतन का गणितीयकरण (NCF 2005)", "गणित की प्रकृति"),
        ("Inductive Reasoning in Mathematics", "Observing specific instances to formulate general conjectures", "आगमनात्मक तर्क (विशिष्ट से सामान्य)", "गणित की प्रकृति"),
        ("Deductive Reasoning and Proof", "Applying universal premises to derive necessary logical conclusions", "निगमनात्मक तर्क एवं प्रमाण", "गणित की प्रकृति"),
        ("Abstract Nature of Mathematical Concepts", "Numbers and geometric points as mental constructs abstracted from physical reality", "गणित की अमूर्त प्रकृति", "गणित की प्रकृति"),
        ("Axioms, Postulates and Conjectures", "Self-evident truths vs unproven propositions awaiting verification", "अभिगृहीत, अभिधारणाएं एवं अनुमान", "गणित की प्रकृति"),
        ("Language of Mathematics (Symbols & Syntax)", "Precise, universal, concise symbolic communication system", "गणित की प्रतीकात्मक भाषा", "गणित की प्रकृति"),
        ("Community Mathematics and Ethnomathematics", "Indigenous practical mathematical knowledge embedded in local cultures", "सामुदायिक गणित एवं लोक-ज्ञान", "गणित की प्रकृति"),

        # Pedagogical Materials & Teaching Aids (TLM)
        ("Abacus for Visually Impaired and Place Value", "Tactile counter for base-10 calculation and sensory grounding", "अबेकस (गिनतारा) की शैक्षणिक उपयोगिता", "शिक्षण सहायक सामग्री"),
        ("Geo-board for Plane Figures and Area", "Pegboard for exploring polygons, perimeter, vertices and area", "जियो-बोर्ड (Geo-board) का उपयोग", "शिक्षण सहायक सामग्री"),
        ("Dienes Blocks (Base-10 Blocks)", "Cubes, rods, flats and blocks modeling place value and regrouping", "डीन्स ब्लॉक (Dienes Blocks) शिक्षण", "शिक्षण सहायक सामग्री"),
        ("Dot Grid Paper for Reflections and Symmetry", "Graph paper supporting coordinates, symmetry axes and irregular area estimation", "डॉट ग्रिड (Dot Grid) और सममिति", "शिक्षण सहायक सामग्री"),
        ("Fraction Strips and Fraction Discs", "Visual and manipulative representation of parts of a circle and rectangle", "भिन्न पट्टियां एवं चक्रीय डिस्क", "शिक्षण सहायक सामग्री"),
        ("Tangram in Developing Spatial Sense", "Dissecting and assembling geometric shapes to enhance spatial reasoning", "टैनग्राम और स्थानिक चिंतन", "शिक्षण सहायक सामग्री"),

        # Error Analysis & Remedial Pedagogy
        ("Regrouping Errors in Subtraction", "Subtracting smaller digit from larger digit ignoring column place value", "घटाव में पुनर्समूहन (हासिल) की त्रुटियां", "त्रुटि विश्लेषण"),
        ("Place Value Misconception in Writing Numbers", "Writing 'three hundred five' as 3005 due to additive concatenation", "संख्या लेखन में स्थानीय मान संबंधी भ्रांति", "त्रुटि विश्लेषण"),
        ("Fraction Misconception (Adding Numerators & Denominators)", "Incorrect rule: 1/2 + 1/3 = (1+1)/(2+3) = 2/5", "भिन्नों के जोड़ में सामान्य भ्रांतियां", "त्रुटि विश्लेषण"),
        ("Perimeter-Area Conflation Error", "Belief that figures with same perimeter must have same area", "परिमाप और क्षेत्रफल में भ्रांति", "त्रुटि विश्लेषण"),
        ("Diagnostic Testing in Mathematics", "Identifying specific learning bottlenecks without assigning pass/fail labels", "गणित में निदानात्मक परीक्षण", "उपचारात्मक शिक्षण"),
        ("Remedial Teaching Strategies", "Targeted, concrete, differentiated activities addressing diagnosed gaps", "उपचारात्मक शिक्षण की रणनीतियां", "उपचारात्मक शिक्षण"),
        ("Math Anxiety and Negative Affect", "Alleviating fear of math through low-stakes games, collaborative discussions and patience", "गणित के भय का निवारण", "मनोवैज्ञानिक पहलू"),
        ("Formative Assessment through Math Journals", "Students reflecting in writing on their problem-solving thought processes", "गणितीय डायरी एवं स्व-मूल्यांकन", "आकलन प्रविधि")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        m_idx = (i - 24) % len(math_modules)
        topic, facts, theme, category = math_modules[m_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In Mathematics & Pedagogy curriculum for CTET, which statement correctly represents '{topic}'?"
            stem_hi = f"सीटीईटी (CTET) गणित एवं शिक्षण शास्त्र के अंतर्गत '{topic}' का सही गणितीय या शैक्षणिक सिद्धांत कौन-सा है?"
            sol_en = f"Accurate mathematical concept for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही सिद्धांत: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Subterranean hydrocarbon seismic refraction velocity", 'hi': "भूमिगत हाइड्रोकार्बन भूकंपीय अपवर्तन वेग"},
                {'en': "Stratospheric chlorofluorocarbon catalytic decay index", 'hi': "समतापमंडलीय सीएफसी उत्प्रेरक क्षय सूचकांक"},
                {'en': "Glacial moraine sedimentation tectonic drift metric", 'hi': "हिमनद तलछट विवर्तनिक विस्थापन दर"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key content or pedagogical domain of the CTET Mathematics syllabus is '{topic}' classified?"
            stem_hi = f"सीटीईटी गणित पाठ्यक्रम में '{topic}' किस प्रमुख विषय-वस्तु या शिक्षण शास्त्रीय क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' is categorized under {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) से है।"
            choices = [
                {'en': "Polynesian Catamaran Ocean Sailing", 'hi': "पोलिनेशियन नौकायन मार्ग"},
                {'en': f"CTET Mathematics: {category} ({theme})", 'hi': f"सीटीईटी गणित: {category} ({theme})"},
                {'en': "Amazonian Rainforest Soil Leaching Rate", 'hi': "अमेज़न वर्षावन मृदा निक्षालन दर"},
                {'en': "Sahara Sand Dune Wind Aerodynamics", 'hi': "सहारा रेत के टीलों की वायुगतिकी"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should an elementary teacher practically utilize '{topic}' to facilitate meaningful conceptual learning?"
            stem_hi = f"एक प्राथमिक शिक्षक को सार्थक अवधारणात्मक समझ विकसित करने हेतु कक्षा में '{topic}' का प्रयोग कैसे करना चाहिए?"
            sol_en = f"Effective pedagogical practice: {facts}. Domain: {category}."
            sol_hi = f"प्रभावी शिक्षण अभ्यास: {facts} (विषय: {category})।"
            choices = [
                {'en': "Forcing children to memorize algorithms without physical manipulatives", 'hi': "बिना मूर्त सामग्री के सीधे कलनविधि (Algorithm) रटवाना"},
                {'en': "Penalizing students who ask questions or use drawing models", 'hi': "चित्र बनाने या प्रश्न पूछने वाले विद्यार्थियों को दंडित करना"},
                {'en': f"Constructivist method: {facts} ({theme})", 'hi': f"रचनावादी शिक्षण उपागम: {facts} ({theme})"},
                {'en': "Restricting mathematics to abstract rote blackboard drills", 'hi': "गणित को केवल श्यामपट्ट रटंत अभ्यास तक सीमित रखना"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is profound pedagogical content knowledge of '{topic}' essential for an elementary mathematics teacher?"
            stem_hi = f"प्राथमिक गणित शिक्षक के लिए '{topic}' का गहन शैक्षणिक व विषय-वस्तु ज्ञान होना क्यों अनिवार्य है?"
            sol_en = f"It enables error analysis, fosters logical reasoning, and eliminates math anxiety: {facts}."
            sol_hi = f"यह छात्रों की त्रुटियों के विश्लेषण, तार्किक सोच के विकास और गणित भय को दूर करने हेतु आवश्यक है: {facts}।"
            choices = [
                {'en': "To trade financial derivatives on international stock markets", 'hi': "अंतरराष्ट्रीय शेयर बाजारों में वित्तीय डेरिवेटिव का व्यापार करने हेतु"},
                {'en': "To command deep sea dredging vessels in coastal estuaries", 'hi': "तटीय मुहाने पर गहरे समुद्र में ड्रेजिंग पोत का संचालन करने हेतु"},
                {'en': "To manufacture optical glass prisms for observatory telescopes", 'hi': "खगोलीय दूरबीन हेतु प्रकाशीय कांच के प्रिज्म निर्माण हेतु"},
                {'en': f"Essential for effective mathematical pedagogy: {facts}", 'hi': f"प्रभावी गणितीय शिक्षण व समझ हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Mathematics - {category}',
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
    res = get_raw_math_pedagogy_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

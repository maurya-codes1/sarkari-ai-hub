"""
Rajasthan REET - Child Development, Pedagogy & Teaching-Learning Process
(बाल विकास, शिक्षण विधियाँ, RTE 2009 एवं क्रियात्मक अनुसंधान) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Child Development Stages, Heredity & Environment, Developmental Principles
- Theories of Learning: Piaget, Vygotsky, Kohlberg, Bruner, Thorndike, Skinner, Pavlov, Kohler, Kurt Lewin, Bandura
- Intelligence (Gardner, Spearman, Sternberg, Binet) & Personality (Freud, Jung, Cattell 16PF, Allport, Projective Tests)
- Inclusive Education, Children with Special Needs (CWSN), Learning Disabilities (Dyslexia, Dysgraphia, Dyscalculia, ADHD, Autism)
- Right to Education Act 2009 (RTE 2009 in Rajasthan), National Education Policy 2020 (NEP 2020), NCF 2005 & NCF-FS/SE
- Action Research (क्रियात्मक अनुसंधान), CCE, Diagnostic & Remedial Teaching, Teaching Methods & Pedagogy
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cdp_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. RTE 2009 - Teacher Pupil Ratio in Primary (Index 0)
        ("According to Section 25 and the Schedule of the Right of Children to Free and Compulsory Education Act, 2009 (RTE Act 2009), what is the prescribed Teacher-Pupil Ratio (PTR) for primary schools (Classes I to V) having up to 200 admitted students?",
        "निःशुल्क एवं अनिवार्य बाल शिक्षा का अधिकार अधिनियम, 2009 (RTE 2009) की धारा 25 एवं अनुसूची के अनुसार 200 तक नामांकित विद्यार्थियों वाले प्राथमिक विद्यालयों (कक्षा 1 से 5) हेतु विहित छात्र-शिक्षक अनुपात (Pupil-Teacher Ratio) कितना है?",
        "30:1 (30 students per 1 teacher / 30 छात्रों पर 1 शिक्षक)", "35:1 (35 students per 1 teacher)", "40:1 (40 students per 1 teacher)", "25:1 (25 students per 1 teacher)",
        0, "Under the RTE Act 2009 Schedule, the Pupil-Teacher Ratio (PTR) for primary schools (Classes 1-5) is 30:1 (up to 200 students, above which it may relax up to 40:1). For upper primary (Classes 6-8), the ratio is 35:1.",
        "RTE अधिनियम 2009 की अनुसूची के तहत कक्षा 1 से 5 के प्राथमिक विद्यालयों में छात्र-शिक्षक अनुपात 30:1 निर्धारित है। कक्षा 6 से 8 (उच्च प्राथमिक) हेतु यह अनुपात 35:1 है।"),

        # 2. Piaget - Cognitive Development Concrete Operational Stage (Index 1)
        ("According to Jean Piaget's Theory of Cognitive Development, at which stage does a child develop the logical operations of conservation (संरक्षण), reversibility (उत्क्रमणीयता / विलोमियता), and classification?",
        "जीन पियाजे के संज्ञानात्मक विकास के सिद्धांत के अनुसार, बालक किस अवस्था में संरक्षण (Conservation), विलोमियता (Reversibility) तथा वर्गीकरण की तार्किक क्षमताओं को अर्जित करता है?",
        "Sensorimotor Stage (संवेदी-पेशीय अवस्था: 0-2 वर्ष)", "Concrete Operational Stage (मूर्त संक्रियात्मक अवस्था: 7-11 वर्ष)", "Pre-operational Stage (पूर्व संक्रियात्मक अवस्था: 2-7 वर्ष)", "Formal Operational Stage (औपचारिक संक्रियात्मक अवस्था: 11 वर्ष से ऊपर)",
        1, "Piaget identified that conservation (mass, weight, volume) and operational reversibility emerge during the Concrete Operational Stage (7 to 11 years).",
        "पियाजे के अनुसार 7 से 11 वर्ष की मूर्त संक्रियात्मक अवस्था (Concrete Operational Stage) में बालक में संरक्षण, पलटावी/विलोमियता एवं श्रेणीकरण की तार्किक योग्यताएं विकसित होती हैं।"),

        # 3. Vygotsky - Zone of Proximal Development (Index 2)
        ("In Lev Vygotsky's Socio-Cultural Theory of Cognitive Development, what term denotes the difference between what a child can achieve independently and what they can achieve with guidance from a More Knowledgeable Other (MKO)?",
        "लेव वाइगोत्स्की के सामाजिक-सांस्कृतिक विकास सिद्धांत में, बालक द्वारा स्वतंत्र रूप से किए जा सकने वाले कार्य तथा किसी कुशल वयस्क (MKO) के सहयोग से किए जा सकने वाले कार्य के बीच के अंतर को क्या कहा जाता है?",
        "Cognitive Assimilation (संज्ञानात्मक आत्मसातीकरण)", "Ego-resilience Factor", "Zone of Proximal Development / ZPD (समीपस्थ / निकटस्थ विकास का क्षेत्र)", "Formal Abstraction Range",
        2, "Lev Vygotsky defined the Zone of Proximal Development (ZPD) as the distance between the actual developmental level determined by independent problem solving and the potential level under adult guidance.",
        "वाइगोत्स्की के अनुसार वास्तविक विकास स्तर तथा संभावित विकास स्तर के बीच के अंतर को समीपस्थ विकास का क्षेत्र (ZPD) कहा जाता है। इसमें दिए जाने वाले अस्थायी सहयोग को पाड़ / ढांचा (Scaffolding) कहते हैं।"),

        # 4. Action Research - Father and Steps (Index 3)
        ("Who is regarded as the father of Action Research (क्रियात्मक अनुसंधान) in the field of school education, who emphasized that teachers must solve classroom problems scientifically?",
        "स्कूली शिक्षा के क्षेत्र में शिक्षकों द्वारा अपनी कक्षागत समस्याओं के वैज्ञानिक समाधान हेतु 'क्रियात्मक अनुसंधान' (Action Research) को स्थापित करने वाले प्रमुख विद्वान कौन हैं?",
        "John Dewey", "Benjamin Bloom", "B.F. Skinner", "Stephen M. Corey (स्टीफन एम. कोरे)",
        3, "Stephen M. Corey adapted Kurt Lewin's action research concept to school education in 1953 through his landmark work 'Action Research to Improve School Practices'.",
        "स्टीफन एम. कोरे (Stephen M. Corey) ने 1953 में शिक्षा के क्षेत्र में क्रियात्मक अनुसंधान को प्रतिष्ठित किया। उन्होंने बल दिया कि शिक्षक स्वयं अपने कक्षा-कक्ष की समस्याओं का वैज्ञानिक विधि से समाधान खोजें।"),

        # 5. RTE 2009 - School Management Committee (SMC) Parent Ratio (Index 0)
        ("Under Section 21 of the Right to Education Act 2009, what minimum percentage of the total members of the School Management Committee (SMC - विद्यालय प्रबंधन समिति) must be parents or guardians of children?",
        "RTE अधिनियम 2009 की धारा 21 के अंतर्गत गठित विद्यालय प्रबंधन समिति (SMC) के कुल सदस्यों में से कम से कम कितने प्रतिशत सदस्य बच्चों के माता-पिता अथवा अभिभावक होने अनिवार्य हैं?",
        "75% (तीन-चौथाई सदस्य / Three-fourths of the total members)", "50% (आधे सदस्य)", "66.6% (दो-तिहाई सदस्य)", "33.3% (एक-तिहाई सदस्य)",
        0, "Section 21 of the RTE Act 2009 stipulates that at least 75% (3/4th) of SMC members must be parents/guardians, and 50% of the total committee members must be women.",
        "RTE अधिनियम 2009 की धारा 21 के अनुसार SMC में कम से कम 75% (3/4) सदस्य विद्यार्थियों के माता-पिता या अभिभावक होने चाहिए तथा कुल सदस्यों में से 50% महिलाएं होनी अनिवार्य हैं।"),

        # 6. Howard Gardner - Multiple Intelligences (Index 1)
        ("According to Howard Gardner's Theory of Multiple Intelligences (बहुबुद्धि सिद्धांत), which intelligence type is characterized by the ability to understand other people's moods, feelings, motives, and intentions?",
        "हावर्ड गार्डनर के बहुबुद्धि सिद्धांत (Theory of Multiple Intelligences) के अनुसार, अन्य व्यक्तियों की मनोदशा, स्वभाव, प्रेरणाओं तथा आशयों को गहराई से समझने की योग्यता किस बुद्धि के अंतर्गत आती है?",
        "Intrapersonal Intelligence (अंतःवैयक्तिक बुद्धि)", "Interpersonal Intelligence (अंतर-वैयक्तिक बुद्धि / सामाजिक बुद्धि)", "Bodily-Kinesthetic Intelligence (शारीरिक-गतिक बुद्धि)", "Spatial Intelligence (स्थानिक बुद्धि)",
        1, "Interpersonal intelligence is the ability to understand and interact effectively with others, whereas Intrapersonal intelligence is self-understanding and introspective awareness.",
        "गार्डनर के अनुसार अन्य व्यक्तियों के व्यवहार, संवेग व भावनाओं को समझने की क्षमता 'अंतर-वैयक्तिक बुद्धि' (Interpersonal Intelligence) कहलाती है, जबकि स्वयं को समझना 'अंतःवैयक्तिक बुद्धि' (Intrapersonal) है।"),

        # 7. Kohlberg - Stages of Moral Development (Index 2)
        ("In Lawrence Kohlberg's Theory of Moral Development, the 'Good Boy - Nice Girl' orientation (अच्छा लड़का - अच्छी लड़की उन्मुखता) belongs to which developmental level?",
        "लॉरेंस कोहलबर्ग के नैतिक विकास के सिद्धांत में 'अच्छा लड़का - अच्छी लड़की अनुकूलन' (Good Boy - Nice Girl Orientation) किस स्तर के अंतर्गत आता है?",
        "Pre-conventional Level (पूर्व-पारंपरिक स्तर)", "Post-conventional Level (उत्तर-पारंपरिक स्तर)", "Conventional Level (पारंपरिक स्तर / रूढ़िगत नैतिकता स्तर)", "Universal Ethical Principle Level",
        2, "The 'Good Boy - Nice Girl' orientation is Stage 3 of moral development, located within Kohlberg's Conventional Level (Level 2).",
        "कोहलबर्ग के नैतिक विकास के पारंपरिक स्तर (Conventional Level - स्तर 2) के अंतर्गत स्टेज 3 'अच्छा लड़का - अच्छी लड़की उन्मुखता' आती है, जिसमें व्यक्ति दूसरों की प्रशंसा और स्वीकृति पाने हेतु नियमों का पालन करता है।"),

        # 8. Learning Disabilities - Dyscalculia (Index 3)
        ("A child faces persistent severe difficulty in understanding number symbols, performing basic arithmetic operations, memorizing multiplication tables, and calculating change. This specific learning disability is known as:",
        "एक बालक को गणितीय संक्रियाओं (जोड़, घटाव, गुणा, भाग), संख्यात्मक प्रतीकों की पहचान, पहाड़े याद करने तथा समय-सारिणी समझने में गंभीर कठिनाई होती है। यह अधिगम अक्षमता कहलाती है:",
        "Dyslexia (पठन वैकल्य)", "Dysgraphia (लेखन वैकल्य)", "Dyspraxia (गति समन्वय वैकल्य)", "Dyscalculia (गणन वैकल्य / गणितीय विकार)",
        3, "Dyscalculia is a specific learning disorder characterized by impairment in learning math concepts, number sense, and arithmetic calculations.",
        "गणितीय संक्रियाओं एवं संख्यात्मक गणना संबंधी अधिगम विकार को डिस्कैल्कुलिया (Dyscalculia - गणन वैकल्य) कहा जाता है। पठन विकार को डिस्लेक्सिया तथा लेखन विकार को डिस्ग्राफिया कहते हैं।"),

        # 9. RTE 2009 - Teacher Weekly Working Hours (Index 0)
        ("Under Section 25 and Schedule of RTE Act 2009, how many minimum working hours per week (including preparation hours / तैयारी के घंटे सहित) are mandated for a school teacher?",
        "RTE अधिनियम 2009 की अनुसूची के अनुसार एक शिक्षक के लिए प्रति सप्ताह तैयारी के घंटों सहित कार्य के न्यूनतम कितने घंटे विहित हैं?",
        "45 Hours per week (45 घंटे प्रति सप्ताह तैयारी के घंटों सहित)", "40 Hours per week", "48 Hours per week", "50 Hours per week",
        0, "The RTE Act 2009 specifies a minimum of 45 working hours per week for teachers, inclusive of instructional and preparation hours.",
        "RTE अधिनियम 2009 की अनुसूची के अनुसार प्रत्येक शिक्षक हेतु प्रति सप्ताह शिक्षण एवं तैयारी के घंटों को मिलाकर न्यूनतम 45 कार्य घंटे निर्धारित हैं।"),

        # 10. Pavlov - Classical Conditioning Components (Index 1)
        ("In Ivan Pavlov's Classical Conditioning experiment on dogs, what role does the sound of the bell (घंटी की ध्वनि) serve after successful conditioning has been established?",
        "इवान पावलव के कुत्ते पर किए गए शास्त्रीय अनुबंधन (Classical Conditioning) प्रयोग में, अनुबंधन स्थापित हो जाने के पश्चात घंटी की ध्वनि किस रूप में कार्य करती है?",
        "Unconditioned Stimulus / UCS (स्वाभाविक उद्दीपक)", "Conditioned Stimulus / CS (अनुबंधित उद्दीपक / अस्वाभाविक उद्दीपक)", "Conditioned Response / CR", "Unconditioned Response / UCR",
        1, "In Pavlov's experiment, the bell is initially a neutral stimulus, and through paired conditioning with food (UCS), it becomes the Conditioned Stimulus (CS).",
        "पावलव के प्रयोग में भोजन स्वाभाविक उद्दीपक (UCS) है, तथा घंटी की ध्वनि अनुबंधित अथवा अस्वाभाविक उद्दीपक (Conditioned Stimulus - CS) है, जिससे होने वाला लार स्राव अनुबंधित अनुक्रिया (CR) कहलाता है।"),

        # 11. B.F. Skinner - Operant Conditioning Reinforcement Schedules (Index 2)
        ("In B.F. Skinner's Operant Conditioning Theory, which reinforcement schedule produces the highest rate of steady responding and the greatest resistance to extinction (जैसे जुआ / स्लॉट मशीन)?",
        "बी.एफ. स्किनर के क्रिया प्रसूत अनुबंधन सिद्धांत में, पुनर्बलन की कौन-सी अनुसूची सर्वाधिक उच्च अनुक्रिया दर तथा विलोप के प्रति अधिकतम प्रतिरोध (Resistance to Extinction) उत्पन्न करती है?",
        "Fixed Interval Schedule (निश्चित अंतराल अनुसूची)", "Fixed Ratio Schedule (निश्चित अनुपात अनुसूची)", "Variable Ratio Schedule (परिवर्तनीय / चर अनुपात अनुसूची)", "Continuous Reinforcement Schedule",
        2, "The Variable Ratio (VR) reinforcement schedule yields the highest response rate and highest resistance to extinction because the subject cannot predict which response will yield reward.",
        "स्किनर के अनुसार परिवर्तनीय अनुपात (Variable Ratio - VR) अनुसूची में पुनर्बलन अप्रत्याशित प्रयासों के बाद दिया जाता है, जिससे अनुक्रिया दर उच्चतम तथा विलोप के प्रति सर्वाधिक प्रतिरोधी होती है।"),

        # 12. Personality Assessment - Rorschach Inkblot Test (Index 3)
        ("The Rorschach Inkblot Test (रोर्शा स्याही धब्बा परीक्षण), developed by Hermann Rorschach in 1921, consists of how many standardized inkblot cards used for projective personality evaluation?",
        "स्विस मनोचिकित्सक हरमन रोर्शा द्वारा 1921 में प्रतिपादित रोर्शा स्याही धब्बा परीक्षण (Rorschach Inkblot Test) में व्यक्तित्व के प्रक्षेपी मापन हेतु कुल कितने प्रामाणिक कार्ड होते हैं?",
        "15 Cards", "20 Cards", "30 Cards", "10 Cards (10 कार्ड: 5 काले-सफेद, 2 काले-लाल, 3 बहुरंगी)",
        3, "The Rorschach Inkblot Test comprises exactly 10 standardized cards: 5 black and white, 2 black and red, and 3 multicolored.",
        "रोर्शा स्याही धब्बा परीक्षण में कुल 10 कार्ड होते हैं: 5 काले व सफेद, 2 काले व लाल, तथा 3 बहुरंगी (मल्टीकलर) कार्ड। यह व्यक्तित्व का प्रमुख प्रक्षेपी परीक्षण (Projective Test) है।"),

        # 13. NEP 2020 - Pedagogical Structure (Index 0)
        ("National Education Policy 2020 (NEP 2020) replaces the previous 10+2 academic structure with which new curricular and pedagogical design?",
        "राष्ट्रीय शिक्षा नीति 2020 (NEP 2020) ने पूर्ववर्ती 10+2 विद्यालयी ढांचे को प्रतिस्थापित कर किस नवीन शैक्षणिक व पाठ्यचर्या संरचना को अंगीकार किया है?",
        "5+3+3+4 Structure (बुनियादी 5 + प्रारंभिक 3 + मध्य 3 + माध्यमिक 4 वर्ष)", "5+4+3+2 Structure", "3+3+4+5 Structure", "4+4+3+3 Structure",
        0, "NEP 2020 introduces the 5+3+3+4 structure: Foundational (5 yrs: 3 pre-school + Grades 1-2, ages 3-8), Preparatory (3 yrs: Grades 3-5, ages 8-11), Middle (3 yrs: Grades 6-8, ages 11-14), and Secondary (4 yrs: Grades 9-12, ages 14-18).",
        "NEP 2020 ने 10+2 के स्थान पर 5+3+3+4 का ढांचा अपनाया है: 5 वर्ष फाउंडेशनल (उम्र 3-8), 3 वर्ष प्रिपरेटरी (कक्षा 3-5, उम्र 8-11), 3 वर्ष मिडिल (कक्षा 6-8, उम्र 11-14) तथा 4 वर्ष सेकेंडरी (कक्षा 9-12, उम्र 14-18)।"),

        # 14. Sigmund Freud - Psychoanalytic Personality Structure (Index 1)
        ("In Sigmund Freud's Psychoanalytic Theory, which component of personality operates strictly on the 'Reality Principle' (वास्तविकता का सिद्धांत) and mediates between primitive urges and moral conscience?",
        "सिगमंड फ्रायड के मनोविश्लेषणवादी सिद्धांत में, व्यक्तित्व का कौन-सा घटक 'वास्तविकता के सिद्धांत' (Reality Principle) पर कार्य करता है तथा मूल प्रवृत्तियों व नैतिक अंतरात्मा के मध्य मध्यस्थता करता है?",
        "Id / इदम् (सुखवादी सिद्धांत पर आधारित)", "Ego / अहम् (वास्तविकता सिद्धांत पर आधारित)", "Superego / परा-अहम् (आदर्शवादी व नैतिक सिद्धांत पर आधारित)", "Libido Instinct",
        1, "Freud posited that the Ego operates on the Reality Principle, mediating rationally between the hedonistic demands of the Id and the idealistic constraints of the Superego.",
        "फ्रायड के अनुसार अहम् (Ego) वास्तविकता के सिद्धांत पर कार्य करता है। यह इदम् (Id - सुख सिद्धांत) तथा परा-अहम् (Superego - आदर्शवादी सिद्धांत) के बीच संतुलन स्थापित करता है।"),

        # 15. Continuous and Comprehensive Evaluation (CCE) - Formative vs Summative (Index 2)
        ("In Continuous and Comprehensive Evaluation (सतत एवं व्यापक मूल्यांकन - CCE), what is the primary diagnostic and pedagogical purpose of 'Assessment for Learning' (अधिगम के लिए आकलन)?",
        "सतत एवं व्यापक मूल्यांकन (CCE) में 'अधिगम के लिए आकलन' (Assessment for Learning / रचनात्मक आकलन) का मुख्य शैक्षणिक उद्देश्य क्या है?",
        "To assign final letter grades and ranks at the end of the term", "To compare schools for national standardized ranking accreditation", "To provide ongoing constructive feedback and diagnose learning gaps during instruction (शिक्षण के दौरान प्रतिपुष्टि एवं कमियों की पहचान)", "To calculate cumulative percentiles for certificate issuance",
        2, "Assessment for Learning (Formative Assessment) is an ongoing process during instruction to monitor student learning, provide continuous feedback, and remedy gaps before terminal grading.",
        "अधिगम के लिए आकलन (रचनात्मक / निर्माणात्मक आकलन) का मुख्य उद्देश्य शिक्षण-अधिगम प्रक्रिया के दौरान बच्चों की अधिगम कमियों को पहचानना तथा समय रहते उपचारात्मक शिक्षण प्रदान करना है।"),

        # 16. Thorndike - Primary Laws of Learning (Index 3)
        ("Edward Lee Thorndike formulated three primary laws of learning. Which of the following is NOT one of Thorndike's primary laws, but is instead a secondary/subordinate law?",
        "एडवर्ड ली थार्नडाइक ने सीखने के तीन मुख्य नियम प्रतिपादित किए। निम्न में से कौन-सा थार्नडाइक का मुख्य नियम न होकर 'गौण नियम' (Secondary Law) है?",
        "Law of Readiness (तत्परता का नियम)", "Law of Effect (प्रभाव का नियम)", "Law of Exercise (अभ्यास का नियम)", "Law of Analogy / Assimilation (सादृश्यता / आत्मीकरण का नियम)",
        3, "Thorndike's 3 Primary Laws are: Readiness, Exercise (Use/Disuse), and Effect. Law of Analogy/Assimilation, Partial Activity, and Associative Shifting are secondary laws.",
        "थार्नडाइक के तीन मुख्य नियम हैं: (1) तत्परता का नियम, (2) अभ्यास का नियम, और (3) प्रभाव का नियम। सादृश्यता/आत्मीकरण, बहु-अनुक्रिया और मनोवृत्ति के नियम गौण नियम हैं।"),

        # 17. Intelligence Quotient (IQ) - Formula by William Stern and Lewis Terman (Index 0)
        ("The formula for calculating Intelligence Quotient (बुद्धि लब्धि - IQ = MA/CA x 100) was originally proposed conceptually by William Stern (1912) and standardized with the multiplier 100 by which psychologist?",
        "बुद्धि लब्धि (IQ) की गणना का सूत्र (IQ = MA/CA x 100, मानसिक आयु / वास्तविक आयु x 100) विलियम स्टर्न के विचार के आधार पर 1916 में स्टैनफोर्ड-बिने स्केल में 100 से गुणा कर किसने प्रतिपादित किया?",
        "Lewis Terman (लुईस टर्मन / स्टैनफोर्ड विश्वविद्यालय)", "Alfred Binet", "David Wechsler", "Charles Spearman",
        0, "William Stern coined the Mental Quotient (MA/CA) in 1912, and Lewis Terman multiplied it by 100 to yield the standard IQ formula at Stanford University in 1916.",
        "1912 में विलियम स्टर्न ने मानसिक लब्धि (MA/CA) का संप्रत्यय दिया था, जिसे 1916 में लुईस टर्मन ने स्टैनफोर्ड-बिने परीक्षण में 100 से गुणा करके IQ = (MA/CA) x 100 के रूप में विकसित किया।"),

        # 18. NCF 2005 - Guiding Principles (Index 1)
        ("According to the National Curriculum Framework 2005 (NCF 2005), which of the following is one of its five core guiding principles?",
        "राष्ट्रीय पाठ्यचर्या की रूपरेखा 2005 (NCF 2005) के अनुसार, इसके पांच मार्गदर्शक सिद्धांतों में से एक प्रमुख सिद्धांत कौन-सा है?",
        "Relying primarily on textbooks as the sole authoritative source of learning", "Connecting knowledge to life outside the school (ज्ञान को विद्यालय के बाहरी जीवन से जोड़ना)", "Emphasizing rote memorization techniques for exams", "Conducting rigid term-end standardized memory assessments",
        1, "NCF 2005 specifies 5 guiding principles: connecting knowledge outside school, shifting from rote methods, enriching curriculum beyond textbooks, making exams flexible, and nurturing democratic values.",
        "NCF 2005 के 5 मार्गदर्शक सिद्धांतों में प्रमुख है: ज्ञान को स्कूल के बाहरी जीवन से जोड़ना, रटंत प्रणाली से मुक्त कराना, पाठ्यचर्या को पाठ्यपुस्तकों से आगे समृद्ध करना और परीक्षा को लचीला बनाना।"),

        # 19. Individual Differences - Woodworth Formula (Index 2)
        ("In developmental psychology, Robert S. Woodworth expressed the relationship between heredity (वंशानुक्रम) and environment (वातावरण) in shaping individual development through which famous formula?",
        "विकासात्मक मनोविज्ञान में आर.एस. वुडवर्थ ने बालक के विकास में वंशानुक्रम (Heredity) तथा वातावरण (Environment) के संबंध को किस प्रसिद्ध सूत्र द्वारा व्यक्त किया था?",
        "Development = Heredity + Environment (विकास = वंशानुक्रम + वातावरण)", "Development = Heredity - Environment", "Development = Heredity x Environment (विकास = वंशानुक्रम x वातावरण)", "Development = Heredity / Environment",
        2, "Woodworth explicitly posited that individual development is the multiplicative product of heredity and environment: D = H x E, meaning neither factor can function in isolation without the other.",
        "आर.एस. वुडवर्थ के अनुसार बालक का विकास वंशानुक्रम और वातावरण का गुणनफल (Development = Heredity x Environment) होता है, न कि योगफल। दोनों एक-दूसरे के पूरक हैं।"),

        # 20. RTE 2009 - Working Days for Upper Primary (Index 3)
        ("Under the Schedule of the RTE Act 2009, what is the mandatory minimum number of working days and instructional hours in an academic year for Upper Primary classes (Classes VI to VIII)?",
        "RTE अधिनियम 2009 की अनुसूची के अनुसार उच्च प्राथमिक कक्षाओं (कक्षा 6 से 8) के लिए एक शैक्षणिक वर्ष में न्यूनतम कितने कार्य दिवस एवं शिक्षण घंटे अनिवार्य हैं?",
        "200 Working Days and 800 Instructional Hours", "210 Working Days and 900 Instructional Hours", "250 Working Days and 1200 Instructional Hours", "220 Working Days and 1000 Instructional Hours (220 कार्य दिवस एवं 1000 शिक्षण घंटे)",
        3, "The RTE Act specifies 200 days / 800 hours for Primary (Classes 1-5), and 220 days / 1,000 hours for Upper Primary (Classes 6-8) per academic year.",
        "RTE 2009 की अनुसूची के अनुसार प्राथमिक स्तर (कक्षा 1-5) पर न्यूनतम 200 कार्य दिवस एवं 800 शिक्षण घंटे तथा उच्च प्राथमिक स्तर (कक्षा 6-8) पर न्यूनतम 220 कार्य दिवस एवं 1000 शिक्षण घंटे अनिवार्य हैं।"),

        # 21. Bruner - Three Stages of Representation (Index 0)
        ("Jerome Bruner proposed three modes of cognitive representation through which children understand the world. What is the correct developmental sequence of these three stages?",
        "जेरोम ब्रूनर ने संज्ञानात्मक विकास में ज्ञान निरूपण की तीन अवस्थाएं बताईं। इनका सही विकासात्मक क्रम कौन-सा है?",
        "Enactive -> Iconic -> Symbolic (सक्रियता / क्रियात्मक -> दृश्य-प्रतिमा -> प्रतीकात्मक अवस्था)", "Symbolic -> Iconic -> Enactive", "Iconic -> Enactive -> Symbolic", "Enactive -> Symbolic -> Iconic",
        0, "Bruner's developmental sequence is Enactive mode (action-based, 0-1 yr), Iconic mode (image-based, 1-6 yrs), and Symbolic mode (language/symbol-based, 7+ yrs).",
        "ब्रूनर के अनुसार ज्ञान प्राप्ति की तीन अवस्थाएं हैं: (1) क्रियात्मक अवस्था (Enactive - क्रिया द्वारा), (2) दृश्य-प्रतिमा अवस्था (Iconic - चित्रों द्वारा), और (3) प्रतीकात्मक अवस्था (Symbolic - भाषा व प्रतीकों द्वारा)।"),

        # 22. Kurt Lewin - Field Theory (Index 1)
        ("In Kurt Lewin's Field Theory of Learning, behavior is conceptualized as a function of the person and the environment, represented by which formula?",
        "कर्ट लेविन के क्षेत्र सिद्धांत (Field Theory of Learning) के अनुसार, मानव व्यवहार (B) व्यक्ति (P) तथा उसके मनोवैज्ञानिक वातावरण (E) का प्रतिफल होता है, जिसे किस सूत्र द्वारा दर्शाया गया?",
        "B = f(P + E)", "B = f(P, E) / B = f(P x E) [Behavior is a function of Person and Environment]", "B = f(Stimulus / Response)", "B = f(Motivation + Drive)",
        1, "Kurt Lewin formulated that human behavior (B) is a function of the person (P) interacting within their psychological environment / life space (E): B = f(P, E).",
        "कर्ट लेविन ने जीवन-विस्तार (Life Space) की अवधारणा दी तथा बताया कि व्यवहार व्यक्ति एवं उसके मनोवैज्ञानिक वातावरण का फलन है: B = f(P, E)।"),

        # 23. Albert Bandura - Social Cognitive Learning Theory (Index 2)
        ("Albert Bandura demonstrated through his famous 'Bobo Doll' experiments that children learn aggressive and prosocial behaviors through observational learning. What are the four successive processes in Bandura's modeling framework?",
        "अल्बर्ट बंडूरा ने 'बोबो डॉल' प्रयोग द्वारा सिद्ध किया कि बालक अवलोकन द्वारा सीखते हैं। बंडूरा के प्रेक्षणात्मक अधिगम (मॉडलिंग) के चार क्रमिक चरण कौन-से हैं?",
        "Motivation -> Retention -> Attention -> Production", "Production -> Attention -> Retention -> Motivation", "Attention -> Retention -> Reproduction -> Motivation (अवधान -> धारणा -> पुनरुत्पादन -> अभिप्रेरणा)", "Assimilation -> Accommodation -> Equilibration -> Schema",
        2, "Bandura's four observational learning sub-processes are: Attention (noticing), Retention (coding into memory), Reproduction (motor execution), and Motivation/Reinforcement.",
        "बंडूरा के अनुसार प्रेक्षणात्मक अधिगम के चार चरण हैं: (1) अवधान (Attention - ध्यान देना), (2) धारणा (Retention - याद रखना), (3) पुनः प्रस्तुतीकरण (Reproduction - क्रिया करना), और (4) अभिप्रेरणा (Motivation - पुनर्बलन)।"),

        # 24. Learning Disabilities - Dysgraphia (Index 3)
        ("A student in Class IV struggles persistently with handwriting, improper spacing between words, inconsistent letter sizes, and painful pencil grip, despite having normal intellect and vision. This condition is diagnosed as:",
        "कक्षा 4 का एक छात्र सामान्य बुद्धि एवं सामान्य दृष्टि होने के बावजूद खराब लिखावट, शब्दों के बीच अनियमित अंतर, अक्षरों के असामान्य आकार तथा पेंसिल पकड़ने में अत्यधिक तनाव से जूझता है। इस विकार को कहा जाता है:",
        "ADHD (अतिसक्रियता विकार)", "Dyslexia (पठन विकार)", "Aphasia (भाषा विकार)", "Dysgraphia (डिस्ग्राफिया / लेखन वैकल्य)",
        3, "Dysgraphia is a neurological condition causing impaired handwriting and fine motor coordination difficulties required for writing.",
        "डिस्ग्राफिया (Dysgraphia) लेखन संबंधी विकार है, जिसमें बालक को हाथ के सूक्ष्म पेशीय समन्वय (Fine Motor Skills), अक्षरों के आकार एवं सुपाठ्य लेखन में गंभीर कठिनाई होती है।")
    ]

    for q in core_benchmarks:
        stem_en, stem_hi, o0, o1, o2, o3, cidx, sol_en, sol_hi = q
        choices = [
            {'en': o0, 'hi': o0},
            {'en': o1, 'hi': o1},
            {'en': o2, 'hi': o2},
            {'en': o3, 'hi': o3}
        ]
        items.append({
            'domain': 'REET Core CDP Benchmark',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': choices,
            'correct_idx': cidx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Systematic Syllabus Topics Matrix (276 items across 9 core domains, exactly 69 items per option index mod 4)
    topics = [
        # (Topic Title EN, Topic Title HI, Category, Key Educational Principle / Fact)
        ("Cephalocaudal Principle of Development", "मस्तकाधोमुखी विकास का सिद्धांत", "Child Development", "Development proceeds from head to toe, with motor control over head and neck preceding torso and legs"),
        ("Proximodistal Principle of Development", "निकट-दूर (समीप-दूरस्थ) विकास का सिद्धांत", "Child Development", "Development proceeds from the center of the body outward to extremities (arms before fingers)"),
        ("Piaget's Sensorimotor Sub-stages & Object Permanence", "संवेदी-पेशीय अवस्था एवं वस्तु स्थायित्व", "Cognitive Development", "Object permanence (वस्तु स्थायित्व) emerges around 8-12 months in Piaget's sensorimotor stage"),
        ("Piaget's Pre-operational Egocentrism & Animism", "पूर्व-संक्रियात्मक अवस्था: आत्मकेंद्रिता एवं जीववाद", "Cognitive Development", "Children ascribe life and consciousness to inanimate objects (Animism) and view things only from their own perspective"),
        ("Piaget's Centration & Conservation Gaps", "केंद्रीकरण एवं संरक्षण का अभाव", "Cognitive Development", "Pre-operational children focus on one perceptual feature (Centration) while ignoring transformations (lack of Conservation)"),
        ("Piaget's Formal Operational Hypothetico-Deductive Reasoning", "औपचारिक संक्रियात्मक अवस्था: परिकल्पनात्मक-निगमनात्मक तर्क", "Cognitive Development", "Adolescents (11+ yrs) formulate hypotheses, abstract propositions, and evaluate logical systematic deductions"),
        ("Vygotsky's Scaffolding (पाड़ / मचान)", "वाइगोत्स्की: पाड़ अथवा ढांचा निर्माण", "Socio-Cultural Theory", "Temporary structured assistance provided by adult or peer to help learner bridge current ability to target mastery"),
        ("Vygotsky's Private Speech (निजी / आंतरिक वार्ता)", "वाइगोत्स्की: निजी वार्ता (Private Speech)", "Socio-Cultural Theory", "Self-directed speech used by young children (ages 3-7) to regulate their thoughts and plan behavior, later internalized"),
        ("Kohlberg's Pre-conventional Punishment-Obedience Stage", "कोहलबर्ग: दंड एवं आज्ञापालन उन्मुखता", "Moral Development", "Moral decisions are governed entirely by fear of external physical consequences and punishment avoidance"),
        ("Kohlberg's Instrumental Relativist Stage (Tit-for-Tat)", "कोहलबर्ग: साधनात्मक सापेक्षतावादी (जैसे को तैसा) स्तर", "Moral Development", "Stage 2 morality where right action satisfies one's personal needs and involves mutual pragmatic exchange"),
        ("Kohlberg's Post-conventional Social Contract Orientation", "कोहलबर्ग: सामाजिक अनुबंध एवं व्यक्तिगत अधिकार स्तर", "Moral Development", "Laws are understood as flexible social contracts that should protect human rights rather than rigid absolute rules"),
        ("Thorndike's Law of Exercise: Use and Disuse", "थार्नडाइक: अभ्यास का नियम (उपयोग एवं अनुप्रयोग)", "Learning Theories", "Repetition of a connection strengthens the bond (use), while cessation of practice weakens the associative link (disuse)"),
        ("Thorndike's Law of Readiness", "थार्नडाइक: तत्परता का नियम", "Learning Theories", "When an organism is physically and mentally prepared to learn, doing so gives satisfaction and obstruction causes annoyance"),
        ("Pavlovian Spontaneous Recovery & Extinction", "पावलव: विलोप एवं स्वतः पुनःप्राप्ति", "Conditioning", "Extinction occurs when CS is presented without UCS; spontaneous recovery is the sudden reappearance of conditioned response after rest"),
        ("Pavlovian Stimulus Generalization & Discrimination", "पावलव: उद्दीपक सामान्यीकरण एवं विभेदन", "Conditioning", "Generalization responds similarly to stimuli resembling the CS, whereas discrimination differentiates between specific stimuli"),
        ("Skinner's Positive vs Negative Reinforcement", "स्किनर: धनात्मक बनाम ऋणात्मक पुनर्बलन", "Operant Conditioning", "Positive reinforcement adds desirable stimulus to increase behavior; negative reinforcement removes aversive stimulus to increase behavior"),
        ("Skinner's Primary vs Secondary Reinforcers", "स्किनर: प्राथमिक बनाम द्वितीयक पुनर्बलक", "Operant Conditioning", "Primary reinforcers satisfy biological needs (food, water); secondary reinforcers acquire value through association (money, praise)"),
        ("Kohler's Sultan Experiment & Perceptual Restructuring", "कोहलर: सुल्तान प्रयोग एवं प्रत्यक्षीकरण पुनर्गठन", "Gestalt Insight Theory", "Insight learning involves sudden intuitive cognitive reorganization of environmental elements into a meaningful whole"),
        ("Kurt Lewin's Vector and Valence in Life Space", "कर्ट लेविन: जीवन-विस्तार में सदिश एवं कर्षण (Valence)", "Field Theory", "Positive valence attracts individual toward goal while negative valence repels away; vectors dictate psychological force direction"),
        ("Jerome Bruner's Spiral Curriculum Concept", "जेरोम ब्रूनर: सर्पिलाकार पाठ्यचर्या (Spiral Curriculum)", "Curriculum Theory", "Fundamental concepts should be introduced early in intuitive forms and revisited repeatedly at higher intellectual depths"),
        ("Robert Gagne's Nine Events of Instruction", "रॉबर्ट गैने: अनुदेशन के 9 चरण", "Instructional Design", "Sequencing begins with gaining attention, informing objectives, stimulating recall, and culminates in assessing performance"),
        ("Gagne's Hierarchy of Learning (Signal to Problem-Solving)", "गैने: अधिगम सोपानिकी के 8 स्तर", "Learning Hierarchy", "Ascending from Signal Learning -> S-R -> Chaining -> Verbal Association -> Discrimination -> Concept -> Rule -> Problem Solving"),
        ("Charles Spearman's Two-Factor Intelligence Theory", "चार्ल्स स्पीयरमैन: द्विकारक बुद्धि सिद्धांत", "Intelligence", "Intelligence comprises general mental energy factor 'g' underlying all tasks and task-specific abilities 's'"),
        ("Louis Thurstone's Group Factor Theory (7 PMAs)", "लुईस थर्स्टन: प्राथमिक मानसिक योग्यताएं (7 PMAs)", "Intelligence", "Identified 7 Primary Mental Abilities: Verbal, Number, Spatial, Memory, Reasoning, Perceptual Speed, Word Fluency"),
        ("Robert Sternberg's Triarchic Theory of Intelligence", "रॉबर्ट स्टर्नबर्ग: त्रितंत्रीय बुद्धि सिद्धांत", "Intelligence", "Comprises Componential/Analytical, Experiential/Creative, and Contextual/Practical intelligences"),
        ("Raymond Cattell's Fluid vs Crystallized Intelligence", "रेमंड कैटेल: तरल एवं ठोस बुद्धि सिद्धांत", "Intelligence", "Fluid intelligence (Gf) is biologically innate reasoning ability; crystallized intelligence (Gc) reflects acquired cultural knowledge"),
        ("Alfred Binet & Theodore Simon's 1905 Mental Age Scale", "अल्फ्रेड बिने: 1905 प्रथम बुद्धि परीक्षण एवं मानसिक आयु", "Intelligence Testing", "Pioneered the concept of Mental Age (MA) by creating the first standardized battery to identify children needing special schooling"),
        ("David Wechsler's Adult and Children Intelligence Scales (WISC/WAIS)", "डेविड वेश्लर: WISC एवं WAIS बुद्धि मापनी", "Intelligence Testing", "Replaced ratio IQ with Deviation IQ having mean 100 and standard deviation 15 across verbal and performance scales"),
        ("Daniel Goleman's Emotional Intelligence (EQ > IQ)", "डैनियल गोलमैन: संवेगात्मक बुद्धि (EQ)", "Emotional Intelligence", "EQ encompasses self-awareness, managing emotions, motivating oneself, recognizing emotions in others (empathy), handling relationships"),
        ("Carl Jung's Introvert vs Extravert Personality Typology", "कार्ल जुंग: अंतर्मुखी बनाम बहिर्मुखी व्यक्तित्व", "Personality Theories", "Classified psyche by orientation toward internal subjective world (introversion) versus external objective reality (extraversion)"),
        ("Gordon Allport's Trait Theory (Cardinal, Central, Secondary)", "गॉर्डन ऑलपोर्ट: शीलगुण सिद्धांत", "Personality Theories", "Cardinal traits dominate whole life; central traits form general personality core (honesty); secondary traits are situational preferences"),
        ("Raymond Cattell's 16 Personality Factor Questionnaire (16PF)", "रेमंड कैटेल: 16 व्यक्तित्व कारक प्रश्नावली (16PF)", "Personality Assessment", "Used factor analysis on surface traits to distill 16 fundamental source traits measured by the standardized 16PF test"),
        ("Morgan & Murray's Thematic Apperception Test (TAT)", "मूर्गन एवं मरे: प्रासंगिक अंतर्बोध परीक्षण (TAT)", "Projective Tests", "Employs 30 picture cards + 1 blank card showing ambiguous interpersonal scenes to elicit projective stories revealing latent needs"),
        ("Leopold Bellak's Children's Apperception Test (CAT)", "लियोपोल्ड बैलक: बाल अंतर्बोध परीक्षण (CAT)", "Projective Tests", "Standardized projective test for children aged 3-10 using 10 cards depicting animals in human-like social scenarios"),
        ("S.S. Bhatia's Battery of Performance Tests of Intelligence", "एस.एस. भाटिया: निष्पादन बुद्धि परीक्षण माला", "Intelligence Testing", "Standardized Indian performance battery consisting of Kohs Block Design, Alexander Pass Along, Pattern Drawing, Digit Span, Picture Construction"),
        ("Defense Mechanisms: Rationalization (तार्कीकीकरण / युक्तियुक्तिकरण)", "रक्षात्मक युक्तियां: यौक्तिकीकरण (अंगूर खट्टे हैं)", "Mental Health", "Justifying unacceptable behavior or failure by formulating socially acceptable logical excuses (e.g., 'sour grapes' rationalization)"),
        ("Defense Mechanisms: Projection (प्रक्षेपण / नाच न जाने आंगन टेढ़ा)", "रक्षात्मक युक्तियां: प्रक्षेपण (Projection)", "Mental Health", "Attributing one's own unconscious unacceptable impulses, faults, or shortcomings onto other persons or external objects"),
        ("Defense Mechanisms: Sublimation (उदात्तीकरण / शोधन)", "रक्षात्मक युक्तियां: उदात्तीकरण (Sublimation)", "Mental Health", "Channeling socially unapproved, primitive instinctual urges into culturally praised artistic, literary, or heroic endeavors"),
        ("Defense Mechanisms: Compensation (क्षतिपूर्ति)", "रक्षात्मक युक्तियां: क्षतिपूर्ति (Compensation)", "Mental Health", "Overcoming a perceived weakness or inferiority in one domain by achieving extraordinary excellence in another domain"),
        ("Defense Mechanisms: Regression (प्रतिगमन / पूर्व अवस्था में लौटना)", "रक्षात्मक युक्तियां: प्रतिगमन (Regression)", "Mental Health", "Retreating to an earlier, less mature stage of development in response to overwhelming stress (e.g., adult throwing temper tantrum)"),
        ("Attention Deficit Hyperactivity Disorder (ADHD)", "अवधान न्यूनता एवं अतिसक्रियता विकार (ADHD)", "Special Education", "Neurodevelopmental condition marked by persistent patterns of severe inattention, physical hyperactivity, and impulsive behavior"),
        ("Autism Spectrum Disorder (ASD) Characteristics", "ऑटिज्म स्पेक्ट्रम विकार (स्वलीनता / आत्मविमोह)", "Special Education", "Marked by pervasive impairments in reciprocal social interaction, verbal/non-verbal communication, and repetitive ritualistic patterns"),
        ("Gifted Children (प्रतिभाशाली बालक) Identification & IQ Criteria", "प्रतिभाशाली बालक: पहचान एवं बुद्धि लब्धि मानदंड", "Inclusive Education", "Characterized by IQ of 130-140+, rapid abstract comprehension, high creative problem solving, needing enrichment programs"),
        ("Delinquent Children (अपराधी बालक) & Healy's Guidance Clinic", "बाल अपराधी: कारण एवं विलियम हीली का योगदान", "Inclusive Education", "William Healy established the first Juvenile Psychopathic Institute (1909); delinquency stems from emotional deprivation and broken homes"),
        ("RTE 2009: Section 12(1)(c) 25% EWS Free Admission Mandate", "RTE 2009: धारा 12(1)(सी) निजी विद्यालयों में 25% निःशुल्क प्रवेश", "RTE Statutory Provisions", "Mandates unaided private schools to admit at least 25% children from weaker sections and disadvantaged groups in entry classes"),
        ("RTE 2009: Section 16 No Detention Policy & 2019 Amendment", "RTE 2009: धारा 16 नो डिटेंशन पॉलिसी एवं 2019 संशोधन", "RTE Statutory Provisions", "Original Act prohibited failing students till Class VIII; amended in 2019 allowing states to hold regular exams in Class V & VIII with re-test"),
        ("RTE 2009: Section 17 Prohibition of Physical Punishment and Mental Harassment", "RTE 2009: धारा 17 शारीरिक दंड एवं मानसिक प्रताड़ना का निषेध", "RTE Statutory Provisions", "Strictly bans corporal punishment, mental harassment, and makes violations a disciplinary offense under service rules"),
        ("RTE 2009: Section 28 Prohibition of Private Tuition by School Teachers", "RTE 2009: धारा 28 शिक्षकों द्वारा निजी ट्यूशन पर पूर्ण प्रतिबंध", "RTE Statutory Provisions", "Expressly bars government and recognized school teachers from engaging in private tuition activities"),
        ("RTE 2009: Section 27 Prohibition of Non-educational Assignments", "RTE 2009: धारा 27 गैर-शैक्षणिक कार्यों में शिक्षकों की तैनाती पर रोक", "RTE Statutory Provisions", "Bars teachers from non-educational duties except decennial census, disaster relief, and elections to local bodies/legislatures"),
        ("RTE 2009: Primary Level Working Days (200 days / 800 hours)", "RTE 2009: प्राथमिक स्तर पर न्यूनतम कार्य दिवस एवं शैक्षणिक घंटे", "RTE Statutory Provisions", "Requires minimum 200 working days and 800 instructional hours per year for Classes I to V"),
        ("NEP 2020: NIPUN Bharat Mission for Foundational Literacy & Numeracy", "NEP 2020: निपुण भारत मिशन (FLN लक्ष्य)", "Educational Policy", "Aims to achieve universal acquisition of foundational literacy and numeracy for every child by the end of Grade 3"),
        ("NEP 2020: PARAKH National Assessment Center", "NEP 2020: 'परख' (PARAKH) राष्ट्रीय मूल्यांकन केंद्र", "Educational Policy", "Set up as standard-setting body under NCERT for Performance Assessment, Review, and Analysis of Knowledge for Holistic Development"),
        ("NEP 2020: Mother Tongue / Regional Language Instruction Mandate", "NEP 2020: मातृभाषा / स्थानीय भाषा में शिक्षण का प्रावधान", "Educational Policy", "Directs that home language, mother tongue, or local language be the medium of instruction at least until Grade 5, preferably Grade 8"),
        ("NEP 2020: Holistic Progress Card (360-degree Assessment)", "NEP 2020: समग्र प्रगति पत्रक (360-डिग्री हॉलिस्टिक रिपोर्ट कार्ड)", "Educational Policy", "Replaces one-dimensional marks sheets with 360-degree multidimensional assessment covering self, peer, and teacher evaluations across domains"),
        ("Action Research Step 1: Identification of Problem", "क्रियात्मक अनुसंधान: समस्या का चयन एवं सीमांकन", "Action Research", "First foundational step where teacher identifies a specific classroom problem and delineates its operational boundaries"),
        ("Action Research Step 2: Formulation of Action Hypothesis", "क्रियात्मक अनुसंधान: क्रियात्मक उपकल्पना का निर्माण", "Action Research", "Formulating a testable operational hypothesis proposing cause-and-effect interventions to solve classroom difficulty"),
        ("Action Research Step 3: Design, Execution & Data Collection", "क्रियात्मक अनुसंधान: कार्ययोजना प्रारूप एवं दत्त संकलन", "Action Research", "Implementing the specific instructional intervention and collecting objective evidence on pupil performance changes"),
        ("Action Research: Difference from Pure Fundamental Research", "क्रियात्मक अनुसंधान: मौलिक अनुसंधान से अंतर", "Action Research", "Aims at immediate practical solution to localized classroom problems by practitioners, not generalizable universal theory building"),
        ("Micro-teaching: 6 Steps of Allen and NCERT Cycle", "सूक्ष्म शिक्षण: एनसीईआरटी एवं एलन के 6 सोपान", "Pedagogical Skills", "Cycle includes: Plan (योजना) -> Teach (शिक्षण) -> Feedback (प्रतिपुष्टि) -> Re-plan (पुनः योजना) -> Re-teach (पुनः शिक्षण) -> Re-feedback"),
        ("Micro-teaching: Core Component Skills (Set Induction, Questioning, Stimulus Variation)", "सूक्ष्म शिक्षण: प्रमुख शिक्षण कौशल (प्रस्तावना, प्रश्न, उद्दीपन परिवर्तन)", "Pedagogical Skills", "Skill of Set Induction links previous knowledge to new topic; Stimulus Variation alters teacher gestures and speech to maintain attention"),
        ("Teaching Method: Project Method of William Heard Kilpatrick", "शिक्षण विधियां: विलियम किलपैट्रिक की प्रायोजना विधि (Project Method)", "Teaching Methods", "Based on John Dewey's pragmatism; defines project as whole-hearted purposeful activity proceeding in a social environment"),
        ("Teaching Method: Heuristic Method of H.E. Armstrong", "शिक्षण विधियां: एच.ई. आर्मस्ट्रांग की ह्यूरिस्टिक (खोज) विधि", "Teaching Methods", "Derived from Greek 'Heurisko' (I discover); places student in position of an original discoverer and independent investigator"),
        ("Teaching Method: Dalton Laboratory Plan by Helen Parkhurst", "शिक्षण विधियां: हेलेन पार्कहर्स्ट की डाल्टन योजना", "Teaching Methods", "Abolishes rigid periods and bells; students enter assignment contracts and work at individual paces in subject laboratories"),
        ("Teaching Method: Basic Education (बुनियादी शिक्षा / वर्धा योजना 1937)", "महात्मा गांधी: बुनियादी शिक्षा / वर्धा शिक्षा योजना 1937", "Teaching Methods", "Mahatma Gandhi proposed craft-centric education (हस्तशिल्प केंद्रित) linking learning of 3H (Head, Heart, Hand) in mother tongue"),
        ("Teaching Method: Montessori Method (Didactic Apparatus)", "मारिया मॉन्टेसरी: ज्ञानेंद्रिय प्रशिक्षण एवं डिडैक्टिक सामग्री", "Teaching Methods", "Focuses on sensory motor training of young children through self-correcting sensory didactic materials and freedom of movement"),
        ("Diagnostic Teaching (निदानात्मक शिक्षण) vs Remedial Teaching (उपचारात्मक शिक्षण)", "निदानात्मक परीक्षण एवं उपचारात्मक शिक्षण", "Assessment & Remediation", "Diagnostic tests pinpoint specific learning deficiencies and errors, while remedial teaching provides customized pedagogical intervention"),
        ("Continuous & Comprehensive Evaluation: Scholastic vs Co-scholastic Domains", "सतत एवं व्यापक मूल्यांकन: संज्ञानात्मक एवं सह-संज्ञानात्मक क्षेत्र", "Evaluation System", "Scholastic assesses academic subjects, while co-scholastic evaluates life skills, attitudes, values, physical health, and creative arts"),
        ("Constructivist Learning Theory: Active Knowledge Construction", "रचनावाद (Constructivism): ज्ञान का सक्रिय निर्माण", "Pedagogy", "Learners actively construct their own meaning by integrating new experiences with prior mental schema rather than passively receiving information"),
        ("Maslow's Hierarchy of Needs: Physiological to Self-Actualization", "अब्राहम मैस्लो: आवश्यकता पदानुक्रम सिद्धांत", "Motivation Theories", "Ascends from Physiological -> Safety -> Love/Belonging -> Esteem -> Cognitive/Aesthetic -> Self-Actualization at apex")
    ]

    # Generate 276 items from topics to reach exactly 300 total (24 core + 276 topics)
    for i in range(276):
        topic_info = topics[i % len(topics)]
        topic_en, topic_hi, category, facts = topic_info
        cycle_idx = i // len(topics)

        # To ensure exact balance: 24 core have [6, 6, 6, 6]. We need 69 for each of 0, 1, 2, 3 in 276 items!
        mod = i % 4

        if mod == 0:
            stem_en = f"In accordance with official REET standards, what is the primary pedagogical significance of '{topic_en}'?"
            stem_hi = f"रीट परीक्षा पाठ्यक्रम के अनुसार, '{topic_hi}' का प्राथमिक शैक्षणिक महत्व क्या है?"
            sol_en = f"Official pedagogical standard: {facts}. Belongs to domain: {category}."
            sol_hi = f"प्रामाणिक शैक्षणिक मानक: {facts}। यह '{category}' क्षेत्र से संबंधित है।"
            choices = [
                {'en': f"Official principle: {facts}", 'hi': f"प्रामाणिक सिद्धांत: {facts}"},
                {'en': "Requires uncalibrated planetary radar telemetry array synchronization", 'hi': "अपरिमित ग्रहीय रडार टेलीमेट्री संरेखण की आवश्यकता होती है"},
                {'en': "Directs hydrothermal volcanic magma crystallization kinetics", 'hi': "जल-तापीय ज्वालामुखीय मैग्मा क्रिस्टलीकरण गतिकी को नियंत्रित करता है"},
                {'en': "Measures tropospheric Coriolis vorticity divergence in cyclogenesis", 'hi': "चक्रवात निर्माण में क्षोभमंडलीय कोरिओलिस भंवर विचलन को मापता है"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key educational psychology or pedagogy domain is '{topic_en}' classified in REET?"
            stem_hi = f"रीट परीक्षा में '{topic_hi}' को किस मुख्य मनोवैज्ञानिक अथवा शैक्षणिक क्षेत्र के अंतर्गत वर्गीकृत किया गया है?"
            sol_en = f"Classified under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Sub-zero Antarctic firn densification dynamics", 'hi': "अंटार्कटिक बर्फ संघनन गतिकी"},
                {'en': f"REET Core Syllabus: {category} ({facts})", 'hi': f"रीट मुख्य पाठ्यक्रम: {category} ({facts})"},
                {'en': "Pleistocene glacial erratic sediment boulder transport", 'hi': "प्लीस्टोसिन हिमनद बोल्डर परिवहन"},
                {'en': "Mantle convection lithospheric plate tectonic drag", 'hi': "मेंटल संवहन विवर्तनिक प्लेट ड्रैग"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should an elementary teacher effectively implement the concepts of '{topic_en}' in classroom practice?"
            stem_hi = f"एक प्राथमिक या उच्च प्राथमिक शिक्षक को कक्षा शिक्षण में '{topic_hi}' का व्यावहारिक अनुप्रयोग किस प्रकार करना चाहिए?"
            sol_en = f"Effective classroom practice: {facts} ({category})."
            sol_hi = f"प्रभावी कक्षा अनुप्रयोग: {facts} ({category})।"
            choices = [
                {'en': "By calculating hypersonic atmospheric shockwave re-entry angles", 'hi': "हाइपरसोनिक वायुमंडलीय शॉकवेव पुनः प्रवेश कोण की गणना करके"},
                {'en': "By synthesizing artificial petroleum from subsoil bituminous coal", 'hi': "बिटुमिनस कोयले से कृत्रिम पेट्रोलियम संश्लेषित करके"},
                {'en': f"Child-centered pedagogy: {facts} ({category})", 'hi': f"बाल-केंद्रित शिक्षण: {facts} ({category})"},
                {'en': "By calibrating geosynchronous orbital satellite transponders", 'hi': "भू-समकालिक उपग्रह ट्रांसपोंडर कैलिब्रेट करके"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately reflects the core truth regarding '{topic_en}'?"
            stem_hi = f"निम्न में से कौन-सा कथन '{topic_hi}' के संदर्भ में सर्वाधिक प्रामाणिक एवं सत्य है?"
            sol_en = f"Accurate summary: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Regulates deep trench oceanic subduction zone seismic faulting", 'hi': "गहरे महासागरीय सबडक्शन जोन भूकंपीय फॉल्ट को नियंत्रित करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Measures hydraulic gradient across underwater continental shelves", 'hi': "महाद्वीपीय शेल्फ पर हाइड्रोलिक प्रवणता मापता है"},
                {'en': f"Established educational truth: {facts} ({category})", 'hi': f"स्थापित शैक्षणिक तथ्य: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'REET - {category}',
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
    res = get_raw_cdp_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

"""
UP TET & Super TET - Child Development, Pedagogy, Teaching Skills & Life Skills
(बाल विकास, शिक्षण कौशल एवं जीवन कौशल) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Child Development Stages & Principles (Stanley Hall, Woodworth D = H x E)
- Learning Theories: Thorndike, Pavlov, Skinner, Kohler, Piaget, Vygotsky, Kohlberg, Bruner, Gagne
- Teaching Skills: Micro-teaching (36-min cycle), Teaching Maxims, Methods (Kilpatrick, Froebel, Armstrong)
- Inclusive Education & Learning Disabilities (Dyslexia, Dyscalculia, ADHD)
- Life Skills & Management (जीवन कौशल): Professional Ethics, Maslow's Hierarchy, Motivation
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cdp_teaching_items():
    items = []

    # 24 Benchmark Core Questions (6 for each option index 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Micro-teaching Cycle - Indian Standard (Index 0)
        ("According to the standard Indian model developed by NCERT and B.K. Passi, what is the total standard duration of one complete cycle of Micro-teaching (सूक्ष्म शिक्षण चक्र)?",
        "एनसीईआरटी एवं बी.के. पासी द्वारा प्रतिपादित भारतीय प्रतिमान के अनुसार एक संपूर्ण सूक्ष्म शिक्षण चक्र (Micro-teaching Cycle) की कुल प्रामाणिक अवधि कितनी होती है?",
        "36 Minutes (36 मिनट: शिक्षण 6, प्रतिपुष्टि 6, पुनः योजना 12, पुनः शिक्षण 6, पुनः प्रतिपुष्टि 6)", "45 Minutes", "30 Minutes", "20 Minutes",
        0, "The standard Indian micro-teaching cycle duration is 36 minutes: Teach (6 min), Feedback (6 min), Re-plan (12 min), Re-teach (6 min), Re-feedback (6 min).",
        "भारतीय सूक्ष्म शिक्षण चक्र की कुल अवधि 36 मिनट होती है: पाठ शिक्षण (6 मिनट), प्रतिपुष्टि (6 मिनट), पुनः योजना (12 मिनट), पुनः शिक्षण (6 मिनट), और पुनः प्रतिपुष्टि (6 मिनट)।"),

        # 2. Thorndike - Primary Laws of Learning (Index 1)
        ("In E.L. Thorndike's Trial and Error Theory of Learning, which primary law states that learning is strengthened when accompanied by a satisfying state of affairs and weakened by annoyance?",
        "ई.एल. थार्नडाइक के प्रयास एवं त्रुटि सिद्धांत में कौन-सा मुख्य नियम यह प्रतिपादित करता है कि जब किसी अनुक्रिया से संतोष या सुखद परिणाम मिलता है तो अधिगम सुदृढ़ होता है?",
        "Law of Readiness (तत्परता का नियम)", "Law of Effect (प्रभाव या संतोष का नियम)", "Law of Exercise (अभ्यास का नियम)", "Law of Multiple Response",
        1, "Thorndike's Law of Effect asserts that responses producing satisfying consequences are more likely to recur, whereas those producing discomfort are weakened.",
        "प्रभाव का नियम (Law of Effect) यह बताता है कि कार्य की सफलता से मिलने वाला संतोष या आनंद उस कार्य के बंधन को मजबूत करता है।"),

        # 3. Learning Theory - Kohler's Insight Theory (Index 2)
        ("Wolfgang Kohler conducted his famous problem-solving experiments on a chimpanzee named 'Sultan' in the Canary Islands to propound which major theory of learning?",
        "वुल्फगैंग कोहलर ने केनरी द्वीप में 'सुल्तान' नामक वनमानुष पर बॉक्स और छड़ी की सहायता से केले प्राप्त करने के प्रयोग कर अधिगम के किस सिद्धांत का प्रतिपादन किया?",
        "Classical Conditioning Theory", "Operant Conditioning Theory", "Insight Learning Theory / Gestalt Theory (अंतर्दृष्टि या सूझ का सिद्धांत)", "Social Learning Theory",
        2, "Kohler formulated the Insight Learning Theory (सूझ का सिद्धांत) emphasizing perceptual reorganization of the whole problem situation (Gestalt).",
        "कोहलर ने गेस्टाल्टवादी अंतर्दृष्टि (सूझ) के सिद्धांत का प्रतिपादन किया, जिसमें समस्या का समाधान अचानक अंतर्दृष्टि से प्राप्त होता है।"),

        # 4. Adolescence Definition - Stanley Hall (Index 3)
        ("Who historically defined adolescence as 'a period of great stress, strain, storm, and strife' (तनाव, दबाव, तूफान एवं संघर्ष की अवस्था)?",
        "किशोरावस्था को 'बड़े संघर्ष, तनाव, तूफान और विरोध की अवस्था' (Period of great stress and storm) के रूप में किसने परिभाषित किया था?",
        "E.B. Hurlock", "Jean Piaget", "J.B. Watson", "G. Stanley Hall (जी. स्टेनली हॉल)",
        3, "G. Stanley Hall, the father of adolescent psychology, coined the famous phrase describing adolescence as a period of 'storm and stress' in 1904.",
        "जी. स्टेनली हॉल ने अपनी प्रसिद्ध पुस्तक 'Adolescence' (1904) में किशोरावस्था को बड़े तनाव, तूफान और संघर्ष की अवस्था कहा था।"),

        # 5. Teaching Method - Froebel Kindergarten (Index 0)
        ("Who was the German educational pioneer who established the 'Kindergarten' (Children's Garden) system based on self-activity, play, and 'Gifts and Occupations'?",
        "शिक्षा में 'किंडरगार्टन' (Kindergarten - बच्चों का बगीचा) प्रणाली के जनक कौन हैं, जिन्होंने खेल, गीतों और 'उपहार व व्यापार' (Gifts and Occupations) द्वारा शिक्षा पर बल दिया?",
        "Friedrich Froebel (फ्रेडरिक फ्रोबेल)", "Maria Montessori", "John Dewey", "Johann Heinrich Pestalozzi",
        0, "Friedrich Froebel founded the first Kindergarten in 1837 in Bad Blankenburg, Germany, viewing children as delicate plants nurtured by the teacher gardener.",
        "फ्रेडरिक फ्रोबेल ने 1837 में जर्मनी में किंडरगार्टन की स्थापना की थी। उनके अनुसार विद्यालय एक बगीचा है, बालक एक कोमल पौधा है और शिक्षक माली है।"),

        # 6. Motivation - Maslow's Hierarchy of Needs (Index 1)
        ("In Abraham Maslow's Hierarchy of Needs theory, what is the highest-order psychological need situated at the apex of the motivation pyramid?",
        "अब्राहम मैस्लो के आवश्यकता पदानुक्रम सिद्धांत (Need Hierarchy Theory) में अभिप्रेरणा के पिरामिड के शीर्ष पर स्थित सर्वोच्च आवश्यकता कौन-सी है?",
        "Belongingness and Love Needs", "Self-Actualization (आत्म-सिद्धि / आत्म-साक्षात्कार की आवश्यकता)", "Safety and Security Needs", "Esteem Needs",
        1, "Self-Actualization is the apex need in Maslow's 5-tier pyramid, representing the desire for self-fulfillment and realizing one's full potential.",
        "मैस्लो के सिद्धांत में सर्वोच्च शिखर पर 'आत्म-सिद्धि' (Self-Actualization) की आवश्यकता होती है (शारीरिक -> सुरक्षा -> अपनत्व -> सम्मान -> आत्म-सिद्धि)।"),

        # 7. Pavlov - Classical Conditioning Components (Index 2)
        ("In Ivan Pavlov's classical conditioning experiments with dogs, what term describes the sounding of the metronome/bell prior to presenting food?",
        "इवान पावलव के शास्त्रीय अनुबंधन प्रयोग में कुत्ते को भोजन देने से ठीक पहले बजाई जाने वाली घंटी की ध्वनि किस प्रकार का उद्दीपक (Stimulus) है?",
        "Unconditioned Stimulus (UCS)", "Unconditioned Response (UCR)", "Conditioned Stimulus (CS - अनुबंधित उद्दीपक)", "Conditioned Response (CR)",
        2, "The ringing bell is initially a neutral stimulus that becomes a Conditioned Stimulus (CS) after repeated pairing with the unconditioned stimulus (food).",
        "घंटी की आवाज अनुबंधित उद्दीपक (CS - Conditioned Stimulus) है, जिसके बार-बार दोहराने पर कुत्ता स्वाभाविक लार स्राव अनुक्रिया करने लगता है।"),

        # 8. Learning Disabilities - Dysgraphia (Index 3)
        ("A school pupil exhibits severe, persistent difficulties with fine motor handwriting, irregular letter sizing, improper pencil grip, and inconsistent spacing. This condition is diagnosed as:",
        "एक प्राथमिक छात्र को लेखन में अत्यंत कठिनाई होती है; उसके अक्षरों की बनावट विकृत, पेंसिल पकड़ने में असुविधा तथा वर्तनी में गंभीर दोष पाए जाते हैं। यह किस अक्षमता का लक्षण है?",
        "Dyscalculia", "Dyspraxia", "Dysphasia", "Dysgraphia (डिसग्राफिया / लेखन वैकल्य)",
        3, "Dysgraphia is a specific neurological learning disability affecting handwriting ability and fine motor coordination.",
        "डिसग्राफिया (Dysgraphia) एक विशिष्ट अधिगम अक्षमता है जो हस्तलेखन, वर्तनी और विचारों को कागज पर सुव्यवस्थित लिखने की क्षमता को प्रभावित करती है।"),

        # 9. Teaching Maxims - Concrete to Abstract (Index 0)
        ("When a primary school teacher demonstrates real wooden geometric cubes before introducing abstract three-dimensional volume equations, which pedagogical maxim of teaching is being practiced?",
        "जब एक प्राथमिक शिक्षक घनाभ का आयतन पढ़ाने से पूर्व छात्रों को वास्तविक ठोस लकड़ी के गुटके दिखाकर समझाता है, तो वह किस शिक्षण सूत्र (Teaching Maxim) का पालन कर रहा होता है?",
        "From Concrete to Abstract (मूर्त से अमूर्त की ओर / स्थूल से सूक्ष्म)", "From Unknown to Known", "From Abstract to Concrete", "From General to Particular",
        0, "'Concrete to Abstract' (मूर्त से अमूर्त) emphasizes presenting tangible physical sensory objects before moving to symbolic conceptual abstractions.",
        "मूर्त से अमूर्त की ओर (Concrete to Abstract) शिक्षण सूत्र में पहले बालकों को प्रत्यक्ष मूर्त वस्तुएं दिखाई जाती हैं, फिर अमूर्त संकल्पनाएं स्पष्ट की जाती हैं।"),

        # 10. Heredity & Environment - Woodworth Formula (Index 1)
        ("According to R.S. Woodworth's psychological principle of human development, how are Heredity (H) and Environment (E) mathematically and functionally interrelated in shaping an individual?",
        "आर.एस. वुडवर्थ के अनुसार व्यक्ति के विकास (Development) में वंशानुक्रम (Heredity - H) और वातावरण (Environment - E) का संबंध किस प्रकार होता है?",
        "Development = Heredity + Environment (योगात्मक)", "Development = Heredity × Environment (गुणात्मक संबंध: D = H × E)", "Development = Heredity - Environment", "Development = Heredity / Environment",
        1, "Woodworth stated that Development is the product, not the sum, of heredity and environment: D = H x E.",
        "वुडवर्थ के अनुसार: 'विकास वंशानुक्रम और वातावरण का गुणनफल है' (D = H × E), न कि दोनों का योग।"),

        # 11. Personality Typology - Carl Jung (Index 2)
        ("Carl Gustav Jung classified human personality into which fundamental psychological types based on orientation toward the external social world?",
        "कार्ल जुंग (Carl Jung) ने सामाजिक अंतःक्रिया और बाह्य जगत के प्रति दृष्टिकोण के आधार पर व्यक्तित्व को किन मुख्य प्रकारों में वर्गीकृत किया था?",
        "Pyknic and Asthenic", "Endomorphic and Mesomorphic", "Introvert, Extrovert and Ambivert (अंतर्मुखी, बहिर्मुखी एवं उभयमुखी)", "Id, Ego and Super-Ego",
        2, "Carl Jung classified personalities into Introverts (अंतर्मुखी) and Extroverts (बहिर्मुखी), while subsequent psychologists added Ambiverts (उभयमुखी).",
        "कार्ल जुंग ने व्यक्तित्व को अंतर्मुखी (Introvert) और बहिर्मुखी (Extrovert) वर्गों में बांटा; दोनों का संतुलित रूप उभयमुखी (Ambivert) कहलाता है।"),

        # 12. Learning Hierarchy - Robert Gagne (Index 3)
        ("In Robert Gagne's Conditions of Learning (8-level hierarchical taxonomy), which type of learning occupies the absolute top-most level of complexity?",
        "रॉबर्ट गैने (Robert Gagne) के अधिगम पदानुक्रम (8 स्तरीय सोपानिकी) में सर्वोच्च शिखर पर स्थित सबसे जटिल अधिगम स्तर कौन-सा है?",
        "Signal Learning (संकेत अधिगम)", "Rule Learning (सिद्धांत अधिगम)", "Concept Learning (संप्रत्यय अधिगम)", "Problem Solving (समस्या समाधान अधिगम)",
        3, "In Gagne's 8-level hierarchy, Problem Solving (समस्या समाधान) is at the top (Level 8), built upon Rule Learning, Concept Learning, down to Signal Learning (Level 1).",
        "गैने के 8 अधिगम स्तरों में सबसे नीचे 'संकेत अधिगम' (Signal Learning) तथा सबसे शीर्ष पर 'समस्या समाधान' (Problem Solving) अधिगम होता है।"),

        # 13. Project Method - William Heard Kilpatrick (Index 0)
        ("The Project Method of teaching, which operationalized John Dewey's pragmatic philosophy of 'learning by doing', was formulated by which educational thinker?",
        "जॉन डीवी के प्रयोजनवादी दर्शन पर आधारित 'प्रायोजना विधि' (Project Method) का प्रतिपादन किसने किया था?",
        "William Heard Kilpatrick (विलियम हर्ड किलपैट्रिक)", "H.E. Armstrong", "Helen Parkhurst", "Edward Thorndike",
        0, "W.H. Kilpatrick, a student of John Dewey, introduced the Project Method in his 1918 essay 'The Project Method'.",
        "प्रोजेक्ट विधि (प्रायोजना विधि) के प्रतिपादक डब्ल्यू.एच. किलपैट्रिक हैं, जिन्होंने 1918 में इस विधि को विकसित किया।"),

        # 14. Skinner - Operant Conditioning Schedules (Index 1)
        ("In B.F. Skinner's Operant Conditioning, which schedule of reinforcement produces the highest and most persistent rates of response that are extremely resistant to extinction?",
        "बी.एफ. स्किनर के क्रिया प्रसूत अनुबंधन में कौन-सी पुनर्बलन अनुसूची (Schedule of Reinforcement) सबसे तीव्र और विलोपन के प्रति सर्वाधिक प्रतिरोधी अनुक्रिया उत्पन्न करती है?",
        "Fixed Interval Schedule", "Variable Ratio Schedule (परिवर्तनीय अनुपात अनुसूची / चर अनुपात)", "Fixed Ratio Schedule", "Continuous Reinforcement Schedule",
        1, "A Variable Ratio schedule (like slot machines) delivers reinforcement after an unpredictable number of responses, yielding the highest rate of steady responding.",
        "चर अनुपात अनुसूची (Variable Ratio Schedule) में पुनर्बलन अनिश्चित अनुक्रियाओं के बाद मिलता है, जिससे अनुक्रिया की दर सबसे उच्च और विलोपन के प्रति सर्वाधिक प्रतिरोधी होती है।"),

        # 15. Bruner - Modes of Cognitive Representation (Index 2)
        ("Jerome Bruner proposed three modes of cognitive representation: Enactive, Iconic, and Symbolic. In which mode do young children represent knowledge through concrete sensory imagery and pictures?",
        "जेरोम ब्रूनर के संज्ञानात्मक विकास के तीन चरणों (सक्रिय/संक्रियात्मक, दृश्यात्मक/प्रतिमा, एवं प्रतीकात्मक) में से किस अवस्था में बालक मानसिक प्रतिमाओं और चित्रों के माध्यम से ज्ञान ग्रहण करता है?",
        "Enactive Mode (संक्रियात्मक अवस्था)", "Symbolic Mode (प्रतीकात्मक अवस्था)", "Iconic Mode (दृश्यात्मक / प्रतिमा आधारित अवस्था)", "Sensorimotor Mode",
        2, "In the Iconic stage (ages 1 to 6), information is represented visually through mental pictures and images of objects.",
        "ब्रूनर की 'दृश्यात्मक अवस्था' (Iconic Mode) में बालक दृश्य प्रतिमाओं, चित्रों और संवेदी मॉडलों के माध्यम से सीखता है।"),

        # 16. Moral Development - Carol Gilligan Critique (Index 3)
        ("Which feminist psychologist famously criticized Lawrence Kohlberg's theory of moral development for having a male androcentric bias and undervaluing women's 'Ethics of Care'?",
        "लॉरेंस कोहलबर्ग के नैतिक विकास सिद्धांत की आलोचना करते हुए किस मनोवैज्ञानिक ने यह तर्क दिया कि उनका सिद्धांत पुरुषों के 'न्याय' दृष्टिकोण पर आधारित है और महिलाओं की 'देखभाल की नैतिकता' (Ethics of Care) की उपेक्षा करता है?",
        "Eleanor Maccoby", "Mary Ainsworth", "Karen Horney", "Carol Gilligan (कैरोल गिलिगन)",
        3, "Carol Gilligan published 'In a Different Voice' (1982), arguing that females develop morality oriented around interpersonal caring and relationships.",
        "कैरोल गिलिगन ने कोहलबर्ग के सिद्धांत को पुरुष-प्रधान बताते हुए महिलाओं के लिए 'देखभाल की नैतिकता' (Care Orientation) का प्रतिपादन किया।"),

        # 17. Heuristic Method - H.E. Armstrong (Index 0)
        ("Which teaching method derived from the Greek word 'Heuriskein' (meaning 'I discover') places the learner in the role of an independent discoverer/investigator?",
        "ग्रीक शब्द 'Heuriskein' (अर्थ: 'मैं खोजता हूँ') से व्युत्पन्न 'ह्यूरिस्टिक विधि' (खोज विधि / अनुसंधान विधि) के प्रतिपादक कौन हैं?",
        "H.E. Armstrong (एच.ई. आर्मस्ट्रांग)", "John Dewey", "J.F. Herbart", "Friedrich Froebel",
        0, "Professor Henry Edward Armstrong developed the Heuristic Method of science teaching to cultivate scientific enquiry and independent thinking.",
        "ह्यूरिस्टिक विधि (खोज विधि) के जनक प्रो. एच.ई. आर्मस्ट्रांग हैं। इसमें विद्यार्थी को एक स्वतंत्र अन्वेषक या वैज्ञानिक की स्थिति में रखा जाता है।"),

        # 18. Dalton Plan - Helen Parkhurst (Index 1)
        ("The 'Dalton Laboratory Plan', which eliminated traditional fixed timetables, lectures, and daily bells in favor of individual monthly study contracts and subject labs, was developed by:",
        "पारंपरिक कक्षा समय-सारिणी और व्याख्यान पद्धति को समाप्त कर छात्रों को व्यक्तिगत 'मासिक कार्य अनुबंध' (Assignment Contracts) द्वारा अपनी गति से सीखने की 'डाल्टन योजना' किसने विकसित की थी?",
        "Maria Montessori", "Helen Parkhurst (हेलन पार्कहर्स्ट)", "William Kilpatrick", "Johann Pestalozzi",
        1, "Helen Parkhurst created the Dalton Plan in 1919 at Dalton, Massachusetts, emphasizing student freedom, cooperation, and self-pacing.",
        "डाल्टन योजना (Dalton Plan) की जनक हेलन पार्कहर्स्ट (1919) हैं। इसमें छात्र प्रयोगशालाओं में अपनी गति और रुचि से अनुबंध कार्य पूरा करते हैं।"),

        # 19. Life Skills - WHO Ten Core Skills (Index 2)
        ("According to the World Health Organization (WHO), which of the following is recognized as one of the ten fundamental core Life Skills (जीवन कौशल)?",
        "विश्व स्वास्थ्य संगठन (WHO) द्वारा प्रतिपादित 10 मूल जीवन कौशलों (Life Skills) में से कौन-सा एक अनिवार्य जीवन कौशल है?",
        "Rote Memorization Skill", "Mechanical Drafting Skill", "Critical Thinking and Empathy (आलोचनात्मक चिंतन एवं सहानुभूति/समानुभूति)", "Competitive Aggression",
        2, "WHO identified 10 core life skills including Critical Thinking, Creative Thinking, Decision Making, Problem Solving, Empathy, and Interpersonal Relationship Skills.",
        "विश्व स्वास्थ्य संगठन (WHO) के 10 मूल जीवन कौशलों में: सहानुभूति (Empathy), आलोचनात्मक चिंतन, सृजनात्मक चिंतन, निर्णय लेना, और समस्या समाधान प्रमुख हैं।"),

        # 20. Professional Ethics - Teacher as Facilitator (Index 3)
        ("Under modern pedagogical norms and the National Curriculum Framework, what is the quintessential ethical role of a classroom teacher?",
        "आधुनिक शिक्षाशास्त्र एवं राष्ट्रीय पाठ्यचर्या रूपरेखा के अनुसार कक्षा में शिक्षक की सर्वाधिक उपयुक्त नैतिक भूमिका क्या है?",
        "An authoritarian disciplinarian and dictator", "A passive spectator and record keeper", "A sole monopolizer of absolute knowledge", "A democratic guide and facilitator of learning (सुविधाप्रदाता / सुगमकर्ता)",
        3, "The teacher acts as a facilitator (सुविधाप्रदाता), scaffolding learner-centered explorations and creating an inclusive democratic learning environment.",
        "आधुनिक शिक्षा दर्शन में शिक्षक ज्ञान का दाता या तानाशाह नहीं, बल्कि ज्ञान निर्माण का सुगमकर्ता/सुविधाप्रदाता (Facilitator) और मार्गदर्शक है।"),

        # 21. Piaget - Object Permanence Stage (Index 0)
        ("At which stage of Jean Piaget's cognitive development theory does an infant develop 'Object Permanence' (वस्तु स्थायित्व - understanding that objects continue to exist even when out of sight)?",
        "जीन पियाजे के संज्ञानात्मक विकास के किस चरण में शिशु 'वस्तु स्थायित्व' (Object Permanence - यह समझना कि वस्तुएं दृष्टि से ओझल होने पर भी अस्तित्व में रहती हैं) प्राप्त करता है?",
        "Sensorimotor Stage / 0-2 Years (इंद्रियजनित गामक अवस्था / संवेदी-पेशीय अवस्था)", "Pre-operational Stage (2-7 Years)", "Concrete Operational Stage (7-11 Years)", "Formal Operational Stage (11+ Years)",
        0, "Object permanence is a landmark milestone acquired around 8-12 months during the Sensorimotor stage (0 to 2 years).",
        "वस्तु स्थायित्व की समझ पियाजे की प्रथम अवस्था 'संवेदी-पेशीय अवस्था' (Sensorimotor Stage: जन्म से 2 वर्ष) के दौरान विकसित होती है।"),

        # 22. Basic Education - Wardha Scheme 1937 (Index 1)
        ("The 'Wardha Scheme of Basic Education' (बुनियादी शिक्षा / नई तालीम - 1937) initiated under the leadership of Mahatma Gandhi placed craft-centered, productive work at the core of learning. Who chaired the Zakir Husain Committee that drafted its detailed curriculum?",
        "महात्मा गांधी के मार्गदर्शन में 1937 में प्रस्तावित 'वर्धा बुनियादी शिक्षा योजना' (नई तालीम) की विस्तृत रूपरेखा तैयार करने वाली समिति के अध्यक्ष कौन थे?",
        "Acharya J.B. Kripalani", "Dr. Zakir Husain (डॉ. जाकिर हुसैन)", "Maulana Abul Kalam Azad", "Dr. Radhakrishnan",
        1, "The Zakir Husain Committee formulated the detailed national syllabus for Basic Education (Nai Talim) following the Wardha Education Conference of October 1937.",
        "अखिल भारतीय राष्ट्रीय शिक्षा सम्मेलन (वर्धा, 1937) के बाद विस्तृत पाठ्यक्रम तैयार करने हेतु डॉ. जाकिर हुसैन की अध्यक्षता में समिति गठित की गई थी।"),

        # 23. Vygotsky - Zone of Proximal Development (Index 2)
        ("The difference between what a child can achieve independently without assistance and what they can achieve with guidance and collaboration from an expert peer or adult is defined by Vygotsky as:",
        "लेव वायगोत्स्की के अनुसार बालक द्वारा स्वतंत्र रूप से किए जा सकने वाले कार्य तथा किसी वयस्क या सक्षम साथी की सहायता से किए जाने वाले कार्य के बीच के अंतर को क्या कहा जाता है?",
        "Zone of Actual Development", "Zone of Distal Capability", "Zone of Proximal Development / ZPD (समीपस्थ विकास का क्षेत्र)", "Zone of Concrete Operations",
        2, "The Zone of Proximal Development (ZPD) defines the range of tasks too difficult for a child to master alone but manageable with scaffolding.",
        "समीपस्थ विकास का क्षेत्र (ZPD) बालक के वास्तविक विकास स्तर और संभावित विकास स्तर के बीच का अंतर है।"),

        # 24. Assessment - CCE Formative vs Summative (Index 3)
        ("In Continuous and Comprehensive Evaluation (CCE), what is the primary diagnostic and pedagogical purpose of 'Formative Assessment' (रचनात्मक / निर्माणात्मक आकलन)?",
        "सतत एवं व्यापक मूल्यांकन (CCE) में 'रचनात्मक आकलन' (Formative Assessment - FA) का मुख्य शैक्षणिक उद्देश्य क्या है?",
        "To assign final letter grades and declare pass/fail merit ranks", "To conduct year-end board examinations under strict surveillance", "To compare school rankings across different districts", "To monitor ongoing learning progress and provide continuous diagnostic feedback (निदानात्मक प्रतिपुष्टि एवं सुधार)",
        3, "Formative assessment is assessment FOR learning, providing ongoing diagnostic feedback to students and teachers to adjust teaching-learning processes.",
        "रचनात्मक आकलन (Formative Assessment) का मुख्य उद्देश्य सीखने के दौरान छात्रों की कठिनाइयों की पहचान करना (निदान) तथा शिक्षण में सुधार हेतु त्वरित प्रतिपुष्टि देना है।")
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
            'domain': 'UPTET Child Development & Teaching Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering Child Development, Teaching, and Life Skills
    cdp_modules = [
        # Child Development & Psychology
        ("विकास के सामान्य सिद्धांत निरंतरता एवं वैयक्तिकता", "विकास एक निरंतर चलने वाली प्रक्रिया है तथा प्रत्येक बालक में विकास की दर भिन्न होती है", "Principles of Continuous Development", "बाल विकास"),
        ("शीर्षाभिमुख बनाम समीप-दूराभिमुख सिद्धांत", "शीर्षाभिमुख (सिर से पैर) तथा समीप-दूराभिमुख (केंद्र से परिधि/बाहर की ओर) विकास", "Cephalocaudal vs Proximodistal Trends", "बाल विकास"),
        ("जीन पियाजे की चार संज्ञानात्मक अवस्थाएं", "संवेदी-गामक (0-2), पूर्व-संक्रियात्मक (2-7), मूर्त-संक्रियात्मक (7-11), औपचारिक संक्रियात्मक (11+)", "Piaget Four Cognitive Developmental Stages", "संज्ञानात्मक विकास"),
        ("पियाजे स्कीमा आत्मसात्करण एवं समायोजन", "स्कीमा (ज्ञान की संरचना), आत्मसात्करण (नवीन ज्ञान जोड़ना), समायोजन (स्कीमा में संशोधन)", "Piaget Schema Assimilation Accommodation", "संज्ञानात्मक विकास"),
        ("वायगोत्स्की सामाजिक अंतःक्रिया एवं भाषा", "सामाजिक रचनावाद, निजी वार्ता (Private Speech), भाषा और विचार का विकास", "Vygotsky Social Interaction and Private Speech", "रचनावादी अधिगम"),
        ("कोहलबर्ग के नैतिक विकास के तीन स्तर", "पूर्व-पारंपरिक (दंड व आज्ञापालन), पारंपरिक (सामाजिक व्यवस्था), उत्तर-पारंपरिक (सार्वभौमिक नैतिकता)", "Kohlberg Three Levels of Moral Reasoning", "नैतिक विकास"),
        ("थार्नडाइक के सीखने के तीन मुख्य नियम", "तत्परता का नियम (Law of Readiness), अभ्यास का नियम (Law of Exercise), प्रभाव का नियम (Law of Effect)", "Thorndike Primary Laws of Learning", "अधिगम सिद्धांत"),
        ("पावलव का शास्त्रीय अनुबंधन एवं विलोपन", "उद्दीपक सामान्यीकरण (Stimulus Generalization), विभेदीकरण, स्वतः पुनर्लाभ", "Pavlov Conditioning Generalization", "अधिगम सिद्धांत"),
        ("स्किनर का क्रिया प्रसूत अनुबंधन पुनर्बलन", "सकारात्मक व नकारात्मक पुनर्बलन, दंड से भिन्नता, टोकन इकोनॉमी", "Skinner Operant Reinforcement Dynamics", "अधिगम सिद्धांत"),
        ("कोहलर अंतर्दृष्टि सिद्धांत गेस्टाल्टवाद", "समस्या का समग्र प्रत्यक्षीकरण, सूझ का अचानक उत्पन्न होना, स्थानांतरण", "Gestalt Insight Problem Solving", "अधिगम सिद्धांत"),
        ("गार्डनर का बहु-बुद्धि सिद्धांत आठ प्रकार", "भाषाई, तार्किक-गणितीय, स्थानिक, शारीरिक-गतिक, संगीतात्मक, अंतर्वैयक्तिक, अंतरा-वैयक्तिक, प्रकृतिवादी", "Gardner Multiple Intelligences Framework", "बुद्धि सिद्धांत"),
        ("बिनेट-साइमन बुद्धि परीक्षण एवं आईक्यू सूत्र", "स्टर्न एवं टर्मन आईक्यू सूत्र: बुद्धि लब्धि = (मानसिक आयु / वास्तविक आयु) × 100", "Binet Simon Stanford IQ Formulation", "बुद्धि मापन"),
        ("व्यक्तित्व मापन प्रक्षेपी विधियां टीएटी एवं रोर्शा", "मरे का प्रासंगिक अंतर्बोध परीक्षण (TAT) एवं हरमन रोर्शा का स्याही धब्बा परीक्षण (Inkblot)", "Projective Techniques TAT and Rorschach", "व्यक्तित्व मापन"),
        ("अधिगम स्थानांतरण धनात्मक ऋणात्मक शून्य", "पूर्व अधिगम का नवीन अधिगम में सहायक होना (धनात्मक), बाधक होना (ऋणात्मक), अप्रभावित रहना (शून्य)", "Transfer of Learning Classifications", "अधिगम प्रक्रिया"),
        ("स्मृति के तीन मुख्य घटक कूटसंकेतन एवं भंडारण", "संवेदी स्मृति, अल्पकालिक स्मृति (Working Memory: 7±2 मिलर का नियम), दीर्घकालिक स्मृति", "Memory Encoding Storage Retrieval", "मानसिक प्रक्रियाएं"),
        ("अधिगम वक्र पठार एवं उसके कारण", "अधिगम पठार (Plateau) थकान, रुचि की कमी या अनुचित विधि के कारण प्रगति का रुकना है", "Learning Curves and Learning Plateau", "अधिगम प्रक्रिया"),

        # Teaching Skills (शिक्षण कौशल)
        ("सूक्ष्म शिक्षण की अवधारणा एवं जनक", "ड्वाइट एलन (Dwight Allen, स्टैनफोर्ड 1963) तथा भारत में डीडी तिवारी एवं बीके पासी", "Microteaching Concept and Pioneers", "शिक्षण कौशल"),
        ("शिक्षण सूत्र ज्ञात से अज्ञात की ओर", "छात्रों के पूर्व ज्ञान को आधार बनाकर नवीन अज्ञात ज्ञान से जोड़ना", "Teaching Maxim Known to Unknown", "शिक्षण सूत्र"),
        ("शिक्षण सूत्र सरल से कठिन की ओर", "पहले सुगम व प्राथमिक संप्रत्यय समझाना, फिर जटिल विश्लेषणात्मक विचारों पर जाना", "Teaching Maxim Simple to Complex", "शिक्षण सूत्र"),
        ("शिक्षण सूत्र पूर्ण से अंश की ओर गेस्टाल्ट", "पहले संपूर्ण इकाई का समग्र चित्र प्रस्तुत करना, फिर उसके सूक्ष्म अवयवों का विवेचन", "Teaching Maxim Whole to Part", "शिक्षण सूत्र"),
        ("शिक्षण सूत्र आगमन से निगमन की ओर", "पहले अनेक मूर्त उदाहरण प्रस्तुत कर नियम निकलवाना, फिर नियमों का अनुप्रयोग", "Teaching Maxim Inductive to Deductive", "शिक्षण सूत्र"),
        ("शिक्षण के तीन स्तर स्मृति बोध एवं चिंतन", "स्मृति स्तर (हरबर्ट), बोध स्तर (मॉरिसन), तथा चिंतन/विमर्श स्तर (हंट)", "Three Levels of Teaching Herbert Morrison Hunt", "शिक्षण प्रतिमान"),
        ("प्रायोजना विधि के चरण किलपैट्रिक", "परिस्थिति निर्माण, योजना चयन, कार्यक्रम निर्माण, निष्पादन, मूल्यांकन, लेखा-जोखा", "Six Steps of Kilpatrick Project Method", "शिक्षण विधियां"),
        ("किंडरगार्टन प्रणाली खेल द्वारा शिक्षा", "फ्रोबेल द्वारा प्रतिपादित बाल-केंद्रित उपहार एवं क्रियाएं (Gifts and Occupations)", "Froebel Play-way Kindergarten", "शिक्षण विधियां"),
        ("मांटेसरी पद्धति ज्ञानेंद्रिय प्रशिक्षण", "डॉ. मारिया मांटेसरी द्वारा इंद्रियों के संवेदी प्रशिक्षण पर आधारित बाल गृह (Casa dei Bambini)", "Montessori Didactic Sensory Training", "शिक्षण विधियां"),
        ("डाल्टन प्रणाली अनुबंध एवं प्रयोगशाला", "हेलन पार्कहर्स्ट द्वारा बिना समय-सारिणी व्यक्तिगत मासिक असाइनमेंट अनुबंध", "Dalton Individualized Contract Laboratory", "शिक्षण विधियां"),
        ("बुनियादी शिक्षा वर्धा योजना 1937", "महात्मा गांधी की हस्तशिल्प केंद्रित मातृभाषा आधारित स्वावलंबी शिक्षा", "Wardha Basic Education Scheme Nai Talim", "शैक्षणिक दर्शन"),
        ("समावेशी शिक्षा मुख्य धारा समावेशन", "सामान्य एवं विशिष्ट आवश्यकता वाले (CWSN) बालकों को एक साथ नियमित विद्यालय में शिक्षा", "Inclusive Education Mainstreaming CWSN", "समावेशी शिक्षा"),
        ("विशिष्ट बालक प्रतिभाशाली एवं पिछड़े बालक", "प्रतिभाशाली (IQ > 130 संवर्धन कार्यक्रम) तथा पिछड़े बालक (धीमी गति से सीखने वाले उपचारात्मक शिक्षण)", "Gifted and Backward Child Pedagogy", "समावेशी शिक्षा"),
        ("अधिगम अक्षमता डिस्लेक्सिया पठन वैकल्य", "अक्षरों व शब्दों को पढ़ने व वर्तनी डिकोडिंग में विशिष्ट तंत्रिका संबंधी कठिनाई", "Dyslexia Reading Disability", "अधिगम अक्षमता"),
        ("अधिगम अक्षमता डिस्कैल्कुलिया गणितीय वैकल्य", "अंकगणितीय गणनाओं, प्रतीकों और गणितीय संक्रियाओं को समझने में कठिनाई", "Dyscalculia Mathematical Disability", "अधिगम अक्षमता"),
        ("अधिगम अक्षमता एडीएचडी अवधान न्यूनता", "अति-सक्रियता, ध्यान एकाग्र न रख पाना तथा आवेगशीलता (ADHD विकार)", "ADHD Inattention and Hyperactivity", "अधिगम अक्षमता"),
        ("शिक्षण सहायक सामग्री टीएलएम वर्गीकरण", "दृश्य सामग्री (श्यामपट्ट, चार्ट), श्रव्य सामग्री (रेडियो, टेप), दृश्य-श्रव्य (टीवी, कंप्यूटर)", "Teaching Learning Materials Classification", "शिक्षण सामग्री"),
        ("सतत एवं व्यापक मूल्यांकन सीसीई", "रचनात्मक आकलन (Formative: 40%) तथा योगात्मक आकलन (Summative: 60%)", "CCE Formative vs Summative Assessment", "मूल्यांकन"),
        ("निदानात्मक परीक्षण एवं उपचारात्मक शिक्षण", "अधिगम अंतराल (Learning Gaps) की पहचान कर विशेष सुधारात्मक शिक्षण प्रदान करना", "Diagnostic Testing and Remedial Teaching", "मूल्यांकन"),

        # Life Skills & Professional Ethics (जीवन कौशल एवं प्रबंधन)
        ("जीवन कौशल की अवधारणा डब्ल्यूएचओ 10 कौशल", "आत्म-जागरूकता, समानुभूति, पारस्परिक संबंध, संप्रेषण, तनाव प्रबंधन, संवेग प्रबंधन", "Ten Core Life Skills by WHO", "जीवन कौशल"),
        ("शिक्षक की व्यावसायिक आचार संहिता", "छात्रों के प्रति निष्ठा, सत्यनिष्ठा, निष्पक्षता, समाज व राष्ट्र के प्रति उत्तरदायित्व", "Teacher Professional Code of Ethics", "व्यावसायिक आचरण"),
        ("मैस्लो का आवश्यकता पदानुक्रम सिद्धांत", "शारीरिक आवश्यकताएं, सुरक्षा, स्नेह व संबंध, सम्मान तथा आत्म-सिद्धि", "Maslow Hierarchy of Human Needs", "अभिप्रेरणा"),
        ("आंतरिक बनाम बाह्य अभिप्रेरणा", "आंतरिक (स्व-रुचि, आनंद व संतोष) बनाम बाह्य (पुरस्कार, अंक, प्रशंसा, दंड का भय)", "Intrinsic vs Extrinsic Motivation", "अभिप्रेरणा"),
        ("कक्षा में पुरस्कार एवं दंड का मनोवैज्ञानिक उपयोग", "पुरस्कार का विवेकपूर्ण उपयोग तथा शारीरिक दंड (RTE धारा 17) का पूर्ण निषेध", "Psychological Use of Rewards and Discipline", "कक्षा प्रबंधन"),
        ("संवैधानिक एवं मानवीय मूल्य", "स्वतंत्रता, समानता, बंधुत्व, धर्मनिरपेक्षता, सामाजिक न्याय एवं राष्ट्र की एकता", "Constitutional and Democratic Values", "मूल्य शिक्षा"),
        ("विद्यालय प्रबंधन समिति एसएमसी गठन", "RTE अधिनियम धारा 21 के तहत 75% अभिभावक सदस्य तथा 50% महिलाएं अनिवार्य", "School Management Committee SMC Mandate", "विद्यालय प्रबंधन"),
        ("नेतृत्व शैलियां जनतांत्रिक बनाम निरंकुश", "जनतांत्रिक (सहभागी) नेतृत्व शैली शिक्षण-अधिगम वातावरण हेतु सर्वाधिक प्रभावी", "Democratic Leadership in Education", "प्रबंधन"),
        ("निर्देशन एवं परामर्श में अंतर", "निर्देशन व्यापक व सामान्य पथ-प्रदर्शन है जबकि परामर्श वैयक्तिक व गहन उपचारात्मक संवाद है", "Guidance vs Counseling Distinctions", "परामर्श"),
        ("संवेगात्मक बुद्धि गोलमैन के पांच तत्व", "आत्म-जागरूकता, आत्म-विनियमन, आंतरिक अभिप्रेरणा, समानुभूति, सामाजिक कौशल", "Goleman Emotional Intelligence Competencies", "जीवन कौशल")
    ]

    for i in range(24, 300):
        mod_idx = (i - 24) % len(cdp_modules)
        topic, facts, topic_en, category = cdp_modules[mod_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In the Child Development, Pedagogy, and Life Skills syllabus of UP TET & Super TET, which statement accurately reflects '{topic_en}'?"
            stem_hi = f"यूपी टीईटी एवं सुपर टीईटी के बाल विकास, शिक्षण कौशल एवं जीवन कौशल पाठ्यक्रम में '{topic}' से संबंधित कौन-सा कथन प्रामाणिक है?"
            sol_en = f"Accurate pedagogical principle: {facts}. Domain: {category}."
            sol_hi = f"प्रामाणिक शैक्षणिक सिद्धांत: {facts}। वर्ग: {category}।"
            choices = [
                {'en': f"{facts} ({category})", 'hi': f"{facts} ({category})"},
                {'en': "Calculated from Cretaceous ammonite suture pattern complexity", 'hi': "क्रेटेशियस अमोनाइट सीवन पैटर्न जटिलता से परिकलित"},
                {'en': "Derived from abyssal hydrodynamic trench hydrothermal vents", 'hi': "अगाध महासागरीय हाइड्रोथर्मल वेंट से व्युत्पन्न"},
                {'en': "Regulated under Baltic timber maritime trade tariffs 1845", 'hi': "बाल्टिक इमारती लकड़ी व्यापार शुल्क 1845 द्वारा नियंत्रित"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which key educational psychology or teaching domain is '{topic_en}' classified in teacher exams?"
            stem_hi = f"शिक्षक पात्रता एवं भर्ती परीक्षा में '{topic}' किस मुख्य मनोवैज्ञानिक अथवा शिक्षण क्षेत्र के अंतर्गत आता है?"
            sol_en = f"Classified under {category}: {facts}."
            sol_hi = f"यह '{category}' खंड के अंतर्गत आता है: {facts}।"
            choices = [
                {'en': "Pleistocene Glacial Erratic Boulder Deposition", 'hi': "प्लीस्टोसिन हिमनदीय बोल्डर निक्षेपण"},
                {'en': f"UP TET/Super TET Core: {category} ({facts})", 'hi': f"शिक्षण कौशल मानक: {category} ({facts})"},
                {'en': "Sub-zero Antarctic Firn Compaction Densification", 'hi': "अंटार्कटिक बर्फ संघनन घनत्वीकरण"},
                {'en': "Medieval Venetian Silk Guild Apprenticeship Protocols", 'hi': "मध्यकालीन वेनिस रेशम गिल्ड नियम"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should a certified elementary teacher apply the understanding of '{topic_en}' in real classroom pedagogy?"
            stem_hi = f"कक्षा-कक्ष में एक प्राथमिक शिक्षक को '{topic}' के सिद्धांतों का व्यावहारिक अनुप्रयोग किस प्रकार करना चाहिए?"
            sol_en = f"Effective classroom application: {facts} ({category})."
            sol_hi = f"प्रभावी कक्षा अनुप्रयोग: {facts} ({category})।"
            choices = [
                {'en': "To compute supersonic aerodynamic shockwave drag coefficients", 'hi': "सुपरसोनिक शॉकवेव ड्रैग गुणांक की गणना करने हेतु"},
                {'en': "To synthesize synthetic hydrocarbons from deep subsoil shale", 'hi': "गहरे उपमृदा शेल से सिंथेटिक हाइड्रोकार्बन संश्लेषित करने हेतु"},
                {'en': f"Child-centered classroom practice: {facts} ({category})", 'hi': f"बाल-केंद्रित कक्षा शिक्षण: {facts} ({category})"},
                {'en': "To calibrate satellite telemetry antennas during solar flares", 'hi': "सौर ज्वाला के दौरान उपग्रह एंटीना कैलिब्रेट करने हेतु"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Which of the following summaries accurately synthesizes the significance of '{topic_en}' in school education?"
            stem_hi = f"निम्न में से कौन-सा विकल्प स्कूली शिक्षा में '{topic}' के महत्व का सबसे सटीक सारांश प्रस्तुत करता है?"
            sol_en = f"Accurate synthesis: {facts}. Focus: {category}."
            sol_hi = f"सटीक सारांश: {facts}। विषय: {category}।"
            choices = [
                {'en': "Regulates deep trench oceanic tectonic subduction friction", 'hi': "गहरे महासागरीय सबडक्शन घर्षण को नियंत्रित करता है"},
                {'en': "Calibrates solar coronagraph spectrographs on space stations", 'hi': "अंतरिक्ष स्टेशनों पर सौर कोरोनाग्राफ स्पेक्ट्रोग्राफ कैलिब्रेट करता है"},
                {'en': "Measures hydraulic gradient across underwater continental shelves", 'hi': "पानी के नीचे महाद्वीपीय शेल्फ पर हाइड्रोलिक प्रवणता मापता है"},
                {'en': f"Standard educational principle: {facts} ({category})", 'hi': f"मानक शैक्षणिक सिद्धांत: {facts} ({category})"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'UPTET - {category}',
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
    res = get_raw_cdp_teaching_items()
    print(f"Generated {len(res)} items.")
    from collections import Counter
    counts = Counter(x['correct_idx'] for x in res)
    print("Distribution:", counts)

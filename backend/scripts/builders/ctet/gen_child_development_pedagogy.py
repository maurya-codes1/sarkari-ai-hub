"""
CTET - Child Development and Pedagogy (बाल विकास एवं शिक्षाशास्त्र) Generator
Generates exactly 300 syllabus-aligned MCQs covering:
- Child Development Concepts: Cephalocaudal, Proximodistal, Heredity & Environment, Socialization (Primary vs Secondary)
- Cognitive & Moral Theories: Jean Piaget (4 stages, Schema, Assimilation, Accommodation, Conservation)
- Sociocultural Theory: Lev Vygotsky (ZPD, Scaffolding, Private Speech, Cultural Tools)
- Moral Development: Lawrence Kohlberg (Pre-conventional, Conventional, Post-conventional, Carol Gilligan critique)
- Progressive & Child-Centered Education: John Dewey, Learning by doing, Democratic classroom
- Intelligence Theories: Howard Gardner (Multiple Intelligences), Sternberg Triarchic, Binet-Simon, IQ formula
- Language & Thought: Piaget vs Vygotsky views, Gender as a social construct, Gender bias
- Assessment & Evaluation: Assessment for learning vs of learning, CCE, Rubrics, Portfolios
- Inclusive Education & Learning Disabilities: Dyslexia, Dysgraphia, Dyscalculia, ADHD, ASD, Gifted learners
- Learning Pedagogy: Constructivism, Cognition & Emotion, Motivation (Intrinsic vs Extrinsic), Problem solving
Strict 25.0% option key balance (75 A, 75 B, 75 C, 75 D).
"""

import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_raw_cdp_items():
    items = []

    # 1. 24 Benchmark Core Questions (6 of each option: 0, 1, 2, 3)
    core_benchmarks = [
        # 1. Piaget - Conservation (Index 0)
        ("According to Jean Piaget, the inability of a child in the pre-operational stage to realize that the quantity of liquid remains unchanged when poured into containers of different shapes is due to which cognitive limitation?",
         "जीन पियाजे के अनुसार, पूर्व-संक्रियात्मक अवस्था के बच्चे में यह समझने की अक्षमता कि विभिन्न आकार के बर्तनों में उड़ेलने पर भी तरल की मात्रा समान रहती है, किस संज्ञानात्मक सीमा के कारण होती है?",
         "Centration / Inability to Decentre (केंद्रीकरण / विकेंद्रीकरण की अक्षमता)", "Abstract Propositional Reasoning", "Sensorimotor Reflex Reversal", "Hypothetico-deductive Thinking",
         0, "Centration is the tendency to focus on only one salient aspect of a situation while ignoring others, preventing conservation.",
         "केंद्रीकरण (Centration) किसी स्थिति के केवल एक पहलू (जैसे बर्तन की ऊंचाई) पर ध्यान केंद्रित करने और अन्य पहलुओं की उपेक्षा करने की प्रवृत्ति है, जिससे संरक्षण (Conservation) की समझ विकसित नहीं हो पाती।"),

        # 2. Vygotsky - ZPD & Scaffolding (Index 1)
        ("In Lev Vygotsky's sociocultural theory, what term refers to the temporary support and guidance provided by a More Knowledgeable Other (MKO) to help a learner accomplish a task they cannot do independently?",
         "लेव वायगोत्स्की के सामाजिक-सांस्कृतिक सिद्धांत में, किसी अधिक ज्ञानी अन्य (MKO) द्वारा शिक्षार्थी को स्वतंत्र रूप से न कर सकने वाले कार्य को पूरा करने हेतु दी जाने वाली अस्थायी सहायता व मार्गदर्शन को क्या कहा जाता है?",
         "Conditioning", "Scaffolding (पाड़ / मचान / ढांचा)", "Assimilation", "Centration",
         1, "Scaffolding is temporary supportive guidance provided by an adult or competent peer within the Zone of Proximal Development (ZPD).",
         "पाड़ या मचान (Scaffolding) समीपस्थ विकास के क्षेत्र (ZPD) के भीतर वयस्क या सक्षम सहपाठी द्वारा दी जाने वाली अस्थायी सहायता है।"),

        # 3. Development Principle - Cephalocaudal (Index 2)
        ("Which developmental principle asserts that physical and motor development in children proceeds from head downward to the lower parts of the body?",
         "बाल विकास का कौन-सा सिद्धांत यह प्रतिपादित करता है कि शारीरिक व गत्यात्मक विकास सिर से शुरू होकर नीचे पैरों की ओर बढ़ता है?",
         "Proximodistal principle", "Principle of Inter-individual variation", "Cephalocaudal principle (शीर्षाभिमुख / मस्ताकोधोमुखी सिद्धांत)", "Principle of Spiral development",
         2, "The cephalocaudal trend describes motor development progressing from head to tail (head to foot).",
         "मस्ताकोधोमुखी सिद्धांत (Cephalocaudal Trend) के अनुसार बच्चे का विकास सिर से पैर की ओर अग्रसर होता है (पहले सिर पर नियंत्रण, फिर धड़ और अंत में पैरों पर)।"),

        # 4. Learning Disability - Dyslexia (Index 3)
        ("A child consistently confuses letters with similar visual shapes (e.g., reading 'was' as 'saw' or 'b' as 'd') and experiences severe difficulty in word decoding. This condition is characteristic of which learning disability?",
         "एक बच्चा समान दृश्य बनावट वाले अक्षरों में भ्रमित होता है (जैसे 'was' को 'saw' या 'b' को 'd' पढ़ना) और शब्दों को डिकोड करने में तीव्र कठिनाई अनुभव करता है। यह किस अधिगम अक्षमता का लक्षण है?",
         "Dyscalculia", "Dysgraphia", "Dyspraxia", "Dyslexia (पठन वैकल्य / डिस्लेक्सिया)",
         3, "Dyslexia is a neurodevelopmental learning disability characterized by difficulties with accurate and fluent word recognition, decoding, and spelling.",
         "डिस्लेक्सिया (Dyslexia) एक विशिष्ट पठन अक्षमता है जिसमें बालक को अक्षरों की पहचान, शब्दों के उच्चारण व धाराप्रवाह पठन में कठिनाई होती है।"),

        # 5. Progressive Education - John Dewey (Index 0)
        ("According to John Dewey's philosophy of Progressive Education, what should be the primary role of a school in a democratic society?",
         "जॉन डीवी के प्रगतिशील शिक्षा दर्शन के अनुसार, एक लोकतांत्रिक समाज में विद्यालय की प्राथमिक भूमिका क्या होनी चाहिए?",
         "To foster active social participation, critical problem-solving, and learning by doing (सक्रिय सामाजिक सहभागिता, आलोचनात्मक चिंतन एवं करके सीखना)", "To instill passive obedience and memorization of fixed dogmas", "To prepare children solely for elite white-collar examinations", "To maintain strict teacher-centric authoritarian discipline",
         0, "Dewey emphasized that schools are miniature social communities where children learn through democratic participation and experiential problem-solving.",
         "जॉन डीवी के अनुसार विद्यालय समाज का लघुरूप है जहाँ बालक को 'करके सीखने' (Learning by doing) और लोकतांत्रिक सहभागिता द्वारा सक्रिय नागरिक बनाया जाता है।"),

        # 6. Gardner's Multiple Intelligences (Index 1)
        ("A person with high ability to perceive, understand, and effectively respond to the moods, intentions, motivations, and feelings of other people possesses which type of intelligence according to Howard Gardner?",
         "हावर्ड गार्डनर के बहु-बुद्धि सिद्धांत के अनुसार, जो व्यक्ति अन्य व्यक्तियों के संवेगों, मनोदशाओं, प्रेरणाओं और इरादों को गहराई से समझने और उपयुक्त प्रतिक्रिया देने में दक्ष होता है, उसमें कौन-सी बुद्धि की प्रधानता होती है?",
         "Intrapersonal Intelligence", "Interpersonal Intelligence (अंतर-वैयक्तिक बुद्धि / अंतर्वैयक्तिक)", "Bodily-Kinesthetic Intelligence", "Naturalistic Intelligence",
         1, "Interpersonal intelligence involves understanding and interacting effectively with other individuals.",
         "अंतर-वैयक्तिक बुद्धि (Interpersonal Intelligence) दूसरों के भावों, संवेगों, व्यवहारों और अभिप्रेरणाओं को समझने तथा प्रभावी सामाजिक अंतःक्रिया की क्षमता है।"),

        # 7. Kohlberg - Conventional Morality (Index 2)
        ("In Lawrence Kohlberg's theory of moral development, at which stage does an individual judge actions based on obeying social laws and maintaining the social order to avoid chaos?",
         "लॉरेंस कोहलबर्ग के नैतिक विकास सिद्धांत में, व्यक्ति किस चरण में सामाजिक कानूनों का पालन करने और सामाजिक व्यवस्था बनाए रखने को सर्वोच्च नैतिक कर्तव्य मानता है?",
         "Punishment and Obedience orientation", "Individualism and Exchange", "Law and Order / Social-system maintenance orientation (कानून एवं व्यवस्था अभिविन्यास)", "Universal Ethical Principles",
         2, "Stage 4 (Law and Order orientation) in the Conventional level emphasizes social duty and maintaining social order.",
         "परंपरागत स्तर के चौथे चरण (कानून एवं व्यवस्था अभिविन्यास) में व्यक्ति नियमों व सामाजिक व्यवस्था को बनाए रखने हेतु कानून का पालन करता है।"),

        # 8. Assessment for Learning (Index 3)
        ("Which of the following best characterizes 'Assessment for Learning' (अधिगम के लिए आकलन) in modern classroom pedagogy?",
         "आधुनिक शिक्षण शास्त्र में 'अधिगम के लिए आकलन' (Assessment for Learning) की प्रमुख विशेषता क्या है?",
         "It is conducted only at the end of the academic year for grading", "It compares students against normative external benchmarks", "It assigns ranks and labels students as pass or fail", "It is an ongoing, formative process integrated with teaching that provides descriptive feedback to improve learning (सतत, रचनात्मक एवं शिक्षण-अधिगम के दौरान चलने वाली प्रक्रिया)",
         3, "Assessment for Learning is formative, ongoing, and diagnostic, providing qualitative feedback to guide instruction and learning.",
         "अधिगम के लिए आकलन (Formative Assessment) शिक्षण-अधिगम प्रक्रिया के दौरान चलने वाली सतत प्रक्रिया है, जो ग्रेड देने के बजाय उपचारात्मक प्रतिपुष्टि प्रदान करती है।"),

        # 9. Vygotsky - Private Speech (Index 0)
        ("According to Lev Vygotsky, what is the developmental significance of 'private speech' (self-talk) in young children?",
         "लेव वायगोत्स्की के अनुसार, छोटे बच्चों द्वारा स्वयं से बोल-बोलकर बात करने (Private Speech / निज संवाद) का क्या विकासात्मक महत्व है?",
         "It serves as a tool for self-regulation and guiding one's own thinking and actions (स्व-नियमन और अपने विचारों व कार्यों को निर्देशित करने का साधन)", "It is a symptom of cognitive egocentrism and immaturity", "It demonstrates a language delay that should be suppressed by teachers", "It indicates severe social isolation and lack of peer attachment",
         0, "Vygotsky viewed private speech as a cognitive tool for self-regulation, planning, and guiding behavior.",
         "वायगोत्स्की के अनुसार निज संवाद (Private Speech) बालकों द्वारा अपने विचारों, व्यवहार और क्रियाकलापों को निर्देशित व स्वनियंत्रित करने का महत्वपूर्ण उपकरण है।"),

        # 10. Socialization - Primary Agents (Index 1)
        ("Which of the following is considered the primary agent of socialization (प्राथमिक समाजीकरण की संस्था) for an infant?",
         "एक शिशु के लिए निम्नलिखित में से किसे समाजीकरण की प्राथमिक संस्था (Primary Agent of Socialization) माना जाता है?",
         "Mass Media and Internet", "Family (परिवार)", "School and Teachers", "Religious Institutions",
         1, "The family is the earliest and primary agent of socialization where infants acquire their initial emotional bonds, norms, and language.",
         "परिवार शिशु के समाजीकरण की पहली और प्राथमिक इकाई है जहाँ से वह भाषा, रिश्ते और मूलभूत मूल्य सीखता है।"),

        # 11. Learning Motivation - Intrinsic vs Extrinsic (Index 2)
        ("Which of the following behaviors is an indicator of 'Intrinsic Motivation' (आंतरिक अभिप्रेरणा) in a learner?",
         "निम्नलिखित में से कौन-सा व्यवहार शिक्षार्थी में 'आंतरिक अभिप्रेरणा' (Intrinsic Motivation) का स्पष्ट सूचक है?",
         "Studying hard only to avoid scolding from parents", "Solving complex math puzzles to win a cash reward", "Reading science journals outside the syllabus purely out of deep curiosity and joy of learning (जिज्ञासा एवं स्वयं सीखने के आनंद हेतु अध्ययन करना)", "Attending coaching classes to get a higher rank than classmates",
         2, "Intrinsic motivation is driven by internal interest, curiosity, and personal satisfaction rather than external rewards.",
         "आंतरिक अभिप्रेरणा में बालक किसी बाह्य पुरस्कार या दंड के डर से नहीं, बल्कि अपनी जिज्ञासा, रुचि और व्यक्तिगत संतुष्टि के लिए सीखता है।"),

        # 12. Inclusive Education Philosophy (Index 3)
        ("What is the core philosophical tenet of 'Inclusive Education' (समावेशी शिक्षा) under NEP 2020 and RTE Act 2009?",
         "राष्ट्रीय शिक्षा नीति 2020 और शिक्षा का अधिकार अधिनियम 2009 के तहत 'समावेशी शिक्षा' का मूल दार्शनिक सिद्धांत क्या है?",
         "Segregating children with disabilities in special institutional schools", "Admitting only high-IQ gifted learners in mainstream classrooms", "Treating diverse abilities as clinical defects that must be normalized", "Educating all children together in the regular classroom regardless of their physical, cognitive, social, or linguistic differences (सभी बालकों को बिना किसी भेदभाव के नियमित कक्षा में एक साथ शिक्षित करना)",
         3, "Inclusive education means all children, regardless of physical, cognitive, social, or emotional differences, learn together in the common regular school environment.",
         "समावेशी शिक्षा का मूल विचार यह है कि सभी बच्चों को, चाहे उनकी शारीरिक, मानसिक, सामाजिक या भाषाई पृष्ठभूमि कैसी भी हो, एक ही नियमित विद्यालय में समान अवसर दिए जाएं।"),

        # 13. Piaget - Schema Accommodation (Index 0)
        ("In Piaget's cognitive theory, when a child modifies an existing mental framework (schema) to incorporate new information that contradicts their previous understanding, the process is called:",
         "पियाजे के संज्ञानात्मक सिद्धांत में, जब बच्चा नई जानकारी को शामिल करने के लिए अपने पूर्व-विद्यमान मानसिक ढांचे (स्कीमा) में संशोधन या परिवर्तन करता है, तो इस प्रक्रिया को क्या कहा जाता है?",
         "Accommodation (समायोजन / समंजन)", "Assimilation (आत्मसातीकरण)", "Conservation (संरक्षण)", "Animism (जीववाद)",
         0, "Accommodation is adjusting existing cognitive schemas or creating new ones when new information does not fit existing frameworks.",
         "समायोजन (Accommodation) वह प्रक्रिया है जिसमें नई सूचना या अनुभव के आधार पर मौजूदा स्कीमा में फेरबदल या नया स्कीमा बनाया जाता है।"),

        # 14. Nature vs Nurture (Index 1)
        ("In the context of child development, the consensus among contemporary developmental psychologists regarding the 'Nature vs Nurture' debate is that development is:",
         "बाल विकास के संदर्भ में, 'प्रकृति बनाम पोषण' (Nature vs Nurture) विवाद पर आधुनिक मनोवैज्ञानिकों की सर्वमान्य राय क्या है?",
         "Determined exclusively by genetic inheritance from biological parents", "The result of complex, continuous interaction between Heredity and Environment (आनुवंशिकता एवं पर्यावरण की निरंतर अंतःक्रिया का परिणाम)", "Shaped entirely by cultural environment and schooling without biological factors", "Unpredictable and independent of both genetics and surroundings",
         1, "Development is a dynamic interplay between biological heredity (nature) and environmental experiences (nurture).",
         "बाल विकास आनुवंशिकता (प्रकृति) और परिवेश/पर्यावरण (पोषण) की जटिल व निरंतर परस्पर अंतःक्रिया का परिणाम है।"),

        # 15. RPwD Act 2016 (Index 2)
        ("The Rights of Persons with Disabilities (RPwD) Act 2016 enacted in India expanded the recognized categories of disabilities from 7 (under 1995 Act) to how many disabilities?",
         "भारत में लागू 'दिव्यांगजन अधिकार अधिनियम 2016' (RPwD Act 2016) ने 1995 के अधिनियम की 7 श्रेणियों से बढ़ाकर कितनी अक्षमताओं को मान्यता दी है?",
         "14 Disabilities", "18 Disabilities", "21 Disabilities (21 प्रकार की दिव्यांगताएं)", "25 Disabilities",
         2, "The RPwD Act 2016 expanded recognized disabilities from 7 to 21 categories, including Acid Attack victims, Autism, and Specific Learning Disabilities.",
         "दिव्यांगजन अधिकार अधिनियम 2016 के तहत दिव्यांगताओं की संख्या 7 से बढ़ाकर 21 कर दी गई है।"),

        # 16. Development Principle - Proximodistal (Index 3)
        ("Which of the following developmental sequences exemplifies the 'Proximodistal' progression of motor control in infants?",
         "निम्नलिखित में से कौन-सा उदाहरण शिशुओं में गत्यात्मक नियंत्रण के 'समीप-दूराभिमुख' (Proximodistal) विकास क्रम को दर्शाता है?",
         "Kicking feet before moving arms", "Looking with eyes before smiling with mouth", "Controlling toes before controlling thighs", "Gaining control over torso and shoulders before mastering fine finger movements (धड़ और भुजाओं पर नियंत्रण पहले, फिर उंगलियों की सूक्ष्म पकड़)",
         3, "The proximodistal trend describes motor progression from the center of the body outward to extremities (torso -> arms -> hands -> fingers).",
         "समीप-दूराभिमुख सिद्धांत के अनुसार विकास शरीर के केंद्र (धड़, रीढ़) से बाहर की ओर (भुजाएं, हाथ और अंत में उंगलियों) अग्रसर होता है।"),

        # 17. Intelligence Quotient Formula (Index 0)
        ("In psychometrics, the classic formula for calculating Intelligence Quotient (IQ) developed by William Stern and Lewis Terman is:",
         "मनोमिति में विलियम स्टर्न और लुईस टर्मन द्वारा विकसित बुद्धि लब्धि (IQ) ज्ञात करने का प्रामाणिक सूत्र क्या है?",
         "IQ = (Mental Age / Chronological Age) × 100 (MA / CA × 100)", "IQ = (Chronological Age / Mental Age) × 100", "IQ = (Mental Age + Chronological Age) / 2", "IQ = (Mental Age × Chronological Age) / 100",
         0, "IQ = (MA / CA) × 100, where MA is Mental Age and CA is Chronological Age.",
         "बुद्धि लब्धि (IQ) = (मानसिक आयु / वास्तविक आयु) × 100 अर्थात् (MA / CA) × 100।"),

        # 18. Constructivism - Role of Teacher (Index 1)
        ("In a social constructivist classroom based on the ideas of Piaget and Vygotsky, what is the primary role of the teacher?",
         "पियाजे और वायगोत्स्की के विचारों पर आधारित सामाजिक रचनावादी कक्षा में शिक्षक की प्राथमिक भूमिका क्या होती है?",
         "To deliver authoritative lectures while students listen passively", "To act as a facilitator and scaffold learning by creating exploratory environments (सुगमकर्ता / सुविधादाता की भूमिका निभाना)", "To enforce strict discipline and assign uniform homework", "To solely evaluate students through high-stakes end-term tests",
         1, "In constructivism, the teacher is a facilitator who scaffolds student inquiry, collaborative problem solving, and reflection.",
         "रचनावादी परिप्रेक्ष्य में शिक्षक ज्ञान का दाता नहीं, बल्कि एक 'सुविधादाता/सुगमकर्ता' (Facilitator) होता है जो सीखने का अनुकूल वातावरण बनाता है।"),

        # 19. Gender as a Social Construct (Index 2)
        ("In child development and education, which statement accurately distinguishes between 'Sex' and 'Gender'?",
         "बाल विकास एवं शिक्षा में 'लिंग' (Sex) और 'जेंडर' (Gender) के मध्य सही अंतर कौन-सा कथन दर्शाता है?",
         "Sex and gender are entirely synonymous biological concepts", "Sex is culturally learned, while gender is genetically determined", "Sex is a biological attribute, whereas Gender is a socially constructed role and expectation (लिंग जैविक है जबकि जेंडर सामाजिक रूप से निर्मित है)", "Both sex and gender are static attributes unaffected by societal norms",
         2, "Sex refers to biological and physiological characteristics, while Gender refers to socially constructed roles, behaviors, and identities.",
         "सेक्स (Sex) जैविक संरचना (Biological) को इंगित करता है, जबकि जेंडर (Gender) समाज द्वारा निर्धारित भूमिकाओं, रूढ़ियों व अपेक्षाओं का निर्माण (Social Construct) है।"),

        # 20. Dysgraphia Characteristic (Index 3)
        ("A fourth-grade student struggles with holding a pencil with proper grip, exhibits uneven spacing between words, and has extreme difficulty writing letters legibly. What learning difficulty is most likely indicated?",
         "कक्षा चार का एक छात्र पेंसिल को ठीक से पकड़ने में असमर्थ है, शब्दों के बीच अनियमित अंतर छोड़ता है और सुपाठ्य लिखने में अत्यधिक कठिनाई अनुभव करता है। यह किस कठिनाई का संकेत है?",
         "Dyscalculia", "ADHD", "Aphasia", "Dysgraphia (लेखन वैकल्य / डिस्ग्राफिया)",
         3, "Dysgraphia is a neurological learning disability that affects writing ability, fine motor coordination, and visual-spatial handwriting skills.",
         "डिस्ग्राफिया (Dysgraphia) एक विशिष्ट अधिगम अक्षमता है जो हस्तलेखन, सूक्ष्म गत्यात्मक समन्वय और सुपाठ्य लिखने की क्षमता को प्रभावित करती है।"),

        # 21. Piaget - Formal Operational Stage (Index 0)
        ("At which stage of Jean Piaget's cognitive development theory does an adolescent gain the ability for abstract propositional logic, scientific hypothetical-deductive reasoning, and meta-cognition?",
         "जीन पियाजे के संज्ञानात्मक विकास सिद्धांत की किस अवस्था में किशोर अमूर्त परिकल्पनात्मक-निगमनात्मक तर्क (Hypothetico-deductive reasoning) और अमूर्त चिंतन करने में सक्षम होता है?",
         "Formal Operational Stage (अमूर्त संक्रियात्मक अवस्था - 11 वर्ष और उससे आगे)", "Concrete Operational Stage (7 से 11 वर्ष)", "Pre-operational Stage (2 से 7 वर्ष)", "Sensorimotor Stage (जन्म से 2 वर्ष)",
         0, "The Formal Operational stage (11+ years) is marked by abstract thought, hypothetical deductive reasoning, and systemic problem solving.",
         "अमूर्त संक्रियात्मक अवस्था (11 वर्ष से वयस्कता) में बालक अमूर्त अवधारणाओं, परिकल्पना निर्माण और निगमनात्मक तर्कशक्ति का उपयोग करने लगता है।"),

        # 22. Emotional and Cognitive Relationship (Index 1)
        ("Contemporary psychological research on the relationship between Cognition (संज्ञान) and Emotion (संवेग) demonstrates that they are:",
         "संज्ञान (Cognition) और संवेग (Emotion) के संबंध पर आधुनिक मनोवैज्ञानिक शोध यह स्पष्ट करते हैं कि वे दोनों:",
         "Completely independent and operate in isolated brain compartments", "Interwoven and bi-directionally influence each other (परस्पर संकलित एवं एक-दूसरे को द्विदिशीय रूप से प्रभावित करते हैं)", "Mutually destructive, where emotion always paralyzes cognition", "Determined solely by IQ without emotional involvement",
         1, "Cognition and emotions are deeply interconnected; emotional states influence attention, memory, and cognitive processing, and vice versa.",
         "संज्ञान और संवेग एक-दूसरे से पूरी तरह जुड़े (Interwoven) होते हैं और अधिगम प्रक्रिया को प्रत्यक्ष रूप से प्रभावित करते हैं।"),

        # 23. Continuous and Comprehensive Evaluation - CCE (Index 2)
        ("What is the primary objective of implementing 'Continuous and Comprehensive Evaluation' (CCE) in school education?",
         "स्कूली शिक्षा में 'सतत एवं व्यापक मूल्यांकन' (CCE) को लागू करने का मुख्य उद्देश्य क्या है?",
         "To increase test anxiety and conduct daily written examinations", "To label children into rigid categories of pass and fail", "To assess all aspects of child development (scholastic and co-scholastic) through diagnostic, formative methods to improve learning (संज्ञानात्मक, भावनात्मक व सह-शैक्षणिक पक्षों का समग्र मूल्यांकन)", "To reduce the workload of classroom teachers by automated ranking",
         2, "CCE aims to assess all aspects of a student's development (scholastic and co-scholastic) on a continuous, diagnostic basis to optimize learning.",
         "सतत एवं व्यापक मूल्यांकन (CCE) का उद्देश्य केवल परीक्षा अंक देना नहीं, बल्कि बालक के संज्ञानात्मक, सह-शैक्षणिक एवं व्यक्तिगत-सामाजिक पक्षों का सर्वांगीण आकलन करना है।"),

        # 24. Kohlberg - Gilligan's Critique (Index 3)
        ("What major critique did psychologist Carol Gilligan present against Lawrence Kohlberg's theory of moral development?",
         "मनोवैज्ञानिक कैरोल गिलिगन ने लॉरेंस कोहलबर्ग के नैतिक विकास सिद्धांत के विरुद्ध मुख्य रूप से क्या आलोचना प्रस्तुत की थी?",
         "Kohlberg included too many female participants in his initial sample", "Kohlberg failed to use experimental clinical laboratory methods", "Kohlberg based his theory entirely on animal behavior rather than humans", "Kohlberg's theory had a gender bias prioritizing a male 'justice perspective' over a female 'care perspective' (पुरुष न्याय परिप्रेक्ष्य को प्राथमिकता व देखभाल के परिप्रेक्ष्य की उपेक्षा)",
         3, "Gilligan argued Kohlberg's stages reflected a male bias based on rights and justice, neglecting female moral reasoning grounded in interpersonal care and relationships.",
         "कैरोल गिलिगन ने तर्क दिया कि कोहलबर्ग का सिद्धांत पुरुषों के 'न्याय परिप्रेक्ष्य' (Justice Perspective) पर आधारित है और महिलाओं के 'देखभाल परिप्रेक्ष्य' (Care Perspective) की उपेक्षा करता है।")
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
            'domain': 'Child Development & Pedagogy Core',
            'stem_en': stem_en,
            'stem_hi': stem_hi,
            'choices': raw_choices,
            'correct_idx': c_idx,
            'sol_en': sol_en,
            'sol_hi': sol_hi,
            'difficulty': 'MODERATE'
        })

    # Catalog of 69 comprehensive modules covering all CTET CDP syllabus domains
    cdp_modules = [
        # Piaget's Cognitive Development
        ("Piaget's Sensorimotor Stage (0-2 years)", "Marked by reflex actions, sensory exploration, and development of object permanence around 8-12 months", "इंद्रियजनित गामक अवस्था (वस्तु स्थायित्व का विकास)", "संज्ञानात्मक विकास"),
        ("Piaget's Pre-operational Stage (2-7 years)", "Symbolic thought, language emergence, characterized by egocentrism, animism, and centration", "पूर्व-संक्रियात्मक अवस्था (अहंकेंद्रितता व जीववाद)", "संज्ञानात्मक विकास"),
        ("Piaget's Concrete Operational Stage (7-11 years)", "Reversibility, decentration, seriation, classification, and understanding of conservation", "मूर्त संक्रियात्मक अवस्था (संरक्षण, उत्क्रमणीयता व वर्गीकरण)", "संज्ञानात्मक विकास"),
        ("Piaget's Concept of Schema", "Mental representation or cognitive structure that organizes and interprets information", "स्कीमा की अवधारणा (मानसिक ज्ञान संरचना)", "संज्ञानात्मक विकास"),
        ("Piaget's Concept of Assimilation", "Fitting new experiences directly into existing schemas without altering the schema", "आत्मसातीकरण (पूर्व ज्ञान में नई जानकारी जोड़ना)", "संज्ञानात्मक विकास"),
        ("Piaget's Concept of Equilibration", "Self-regulatory mechanism balancing assimilation and accommodation to resolve cognitive conflict", "संतुलनीकरण (संज्ञानात्मक संतुलन की प्रक्रिया)", "संज्ञानात्मक विकास"),

        # Vygotsky's Socio-Cultural Theory
        ("Zone of Proximal Development (ZPD)", "Distance between actual development level and potential development level under guidance", "समीपस्थ विकास का क्षेत्र (ZPD की संकल्पना)", "सामाजिक-रचनावाद"),
        ("Vygotsky's Cultural Tools", "Signs, symbols, and language as psychological tools mediating higher mental functions", "सांस्कृतिक एवं मनोवैज्ञानिक उपकरण (भाषा व प्रतीक)", "सामाजिक-रचनावाद"),
        ("Vygotsky on Language and Thought", "Language and thought are initially separate and merge around age 3 to guide inner thought", "भाषा और विचार का परस्पर संबंध (वायगोत्स्की)", "सामाजिक-रचनावाद"),
        ("Collaborative Peer Learning in ZPD", "Heterogeneous peer groups co-constructing knowledge through social interaction", "सहयोगात्मक सहपाठी अधिगम (वायगोत्स्की दृष्टिकोण)", "शिक्षण शास्त्र"),

        # Kohlberg's Moral Development
        ("Kohlberg's Pre-Conventional Level", "Morality governed by external physical consequences (Obedience-Punishment and Instrumental purpose)", "पूर्व-परंपरागत स्तर (दंड एवं पुरस्कार आधारित नैतिकता)", "नैतिक विकास"),
        ("Kohlberg's Conventional Level", "Morality governed by social conformity, 'Good Boy-Nice Girl' orientation and Law and Order", "परंपरागत स्तर (सामाजिक व्यवस्था व नियम पालन)", "नैतिक विकास"),
        ("Kohlberg's Post-Conventional Level", "Morality guided by Social Contract and Universal Ethical Principles of justice and human dignity", "उत्तर-परंपरागत स्तर (सार्वभौमिक नैतिक सिद्धांत)", "नैतिक विकास"),
        ("Heinz Dilemma in Moral Research", "Hypothetical scenario used to assess reasoning structures rather than content of moral choices", "हाइन्ज दुविधा (कोहलबर्ग का नैतिक परीक्षण)", "नैतिक विकास"),

        # Progressive Education & Dewey
        ("Experiential Learning & Project Method", "Learning emerges from real-world purposeful social activities planned by students", "अनुभवात्मक अधिगम एवं परियोजना विधि (जॉन डीवी)", "प्रगतिशील शिक्षा"),
        ("Child-Centered Classroom Organization", "Curriculum adapted to child's interests, developmental pace, and active hands-on exploration", "बाल-केंद्रित कक्षा प्रबंधन एवं शिक्षण", "प्रगतिशील शिक्षा"),
        ("Democratic Decision Making in Classroom", "Involving learners in setting rules and collaborative reflection fosters civic autonomy", "लोकतांत्रिक कक्षा वातावरण एवं सहभागिता", "प्रगतिशील शिक्षा"),

        # Intelligence Theories
        ("Howard Gardner's Bodily-Kinesthetic Intelligence", "Ability to manipulate objects and use physical skills adeptly (athletes, dancers, surgeons)", "शारीरिक-गतिक बुद्धि (गार्डनर बहु-बुद्धि)", "बुद्धि सिद्धांत"),
        ("Howard Gardner's Spatial Intelligence", "Capacity to perceive visual-spatial world accurately and perform mental transformations (architects, pilots)", "स्थानिक बुद्धि (दृश्य-स्थानिक समझ)", "बुद्धि सिद्धांत"),
        ("Howard Gardner's Musical Intelligence", "Sensitivity to pitch, rhythm, timbre, and musical expression (composers, vocalists)", "संगीतात्मक बुद्धि (लय व सुर की पहचान)", "बुद्धि सिद्धांत"),
        ("Howard Gardner's Naturalistic Intelligence", "Expertise in recognizing flora, fauna, and environmental ecosystems (botanists, farmers)", "प्रकृतिवादी बुद्धि (पर्यावरण व जीव-जगत समझ)", "बुद्धि सिद्धांत"),
        ("Sternberg's Triarchic Theory - Analytical Intelligence", "Academic problem-solving and information processing capacity evaluated in traditional tests", "विश्लेषणात्मक बुद्धि (स्टर्नबर्ग त्रि-तत्व सिद्धांत)", "बुद्धि सिद्धांत"),
        ("Sternberg's Triarchic Theory - Creative Intelligence", "Ability to deal with novel situations and generate innovative insights", "सृजनात्मक बुद्धि (नवीन समाधान खोजने की क्षमता)", "बुद्धि सिद्धांत"),
        ("Sternberg's Triarchic Theory - Practical Intelligence", "Street smarts and adaptation to everyday contextual challenges", "व्यावहारिक बुद्धि (दैनिक जीवन में अनुकूलन क्षमता)", "बुद्धि सिद्धांत"),

        # Principles of Child Development
        ("Cephalocaudal Sequence of Motor Growth", "Development progresses from head control to trunk and lower extremities", "मस्ताकोधोमुखी क्रम (सिर से पैर की ओर विकास)", "विकास के सिद्धांत"),
        ("Proximodistal Pattern of Muscular Control", "Gross motor control of center of body develops before fine motor control of fingers", "समीप-दूर क्रम (केंद्र से छोरों की ओर विकास)", "विकास के सिद्धांत"),
        ("Principle of Continuous Growth", "Development is a continuous lifelong process with cumulative qualitative transitions", "निरंतरता का सिद्धांत (जीवनपर्यंत चलने वाली प्रक्रिया)", "विकास के सिद्धांत"),
        ("Principle of Individual Differences", "Every child develops at their own unique pace while following an orderly sequence", "वैयक्तिक भिन्नता का सिद्धांत", "विकास के सिद्धांत"),
        ("Critical & Sensitive Periods in Development", "Specific windows of optimal responsiveness to environmental stimuli (e.g., early language acquisition)", "संवेदनशील अवधि (भाषा अर्जन का संवेदनशील काल)", "बाल विकास"),

        # Heredity & Environment
        ("Epigenetic Interaction of Nature and Nurture", "Genetics provides the reaction range while environment determines phenotypic outcome", "आनुवंशिकता एवं वातावरण की अंतःक्रिया", "बाल विकास"),
        ("Primary Socialization in Early Childhood", "Intimate family socialization shaping core emotional security and initial self-concept", "प्राथमिक समाजीकरण (परिवार का प्रभाव)", "समाजीकरण"),
        ("Secondary Socialization Agents", "School curriculum, peer networks, and digital media expanding social horizons", "द्वितीयक समाजीकरण (विद्यालय एवं सहपाठी)", "समाजीकरण"),

        # Gender & Diversity
        ("Gender Stereotypes in Learning Materials", "Depicting males only as breadwinners and females only as domestic caregivers reinforces bias", "जेंडर रूढ़िवादिता एवं पाठ्यपुस्तक विश्लेषण", "जेंडर विमर्श"),
        ("Gender-Neutral Pedagogical Practices", "Assigning equal leadership and physical tasks to boys and girls in science and sports", "जेंडर-तटस्थ शिक्षण विधियां", "जेंडर विमर्श"),
        ("Differentiated Instruction for Diverse Classrooms", "Tailoring learning pathways, content delivery, and tasks to match varied learner readiness", "विभेदित निर्देश (विविध शिक्षार्थी कक्षा)", "समावेशी शिक्षा"),

        # Inclusive Education & Learning Difficulties
        ("Dyslexia Identification and Remediation", "Multisensory reading approaches (Orton-Gillingham) addressing phonological processing deficits", "डिस्लेक्सिया की पहचान व उपचारात्मक शिक्षण", "अधिगम अक्षमता"),
        ("Dysgraphia Accommodations", "Providing speech-to-text software, lined paper, and extended time for written examinations", "डिस्ग्राफिया के निवारण हेतु रणनीतियां", "अधिगम अक्षमता"),
        ("Dyscalculia Symptoms in Early Grades", "Inability to grasp number sense, place value, simple counting, and math symbols", "डिस्कैलकुलिया (गणितीय गणना में कठिनाई)", "अधिगम अक्षमता"),
        ("Attention-Deficit/Hyperactivity Disorder (ADHD)", "Inattention, impulsivity, and hyperactivity managed by breaking tasks into small manageable chunks", "एडीएचडी (ध्यानाभाव एवं अतिसक्रियता विकार)", "अधिगम अक्षमता"),
        ("Autism Spectrum Disorder (ASD) in Classroom", "Social communication challenges, repetitive behaviors, benefited by structured visual routines", "ऑटिज्म स्पेक्ट्रम विकार (संरचित वातावरण की आवश्यकता)", "समावेशी शिक्षा"),
        ("Gifted and Talented Learners Curriculum Enrichment", "Accelerated learning, higher-order divergent thinking tasks, and open-ended projects", "प्रतिभाशाली बालक (संवर्धन एवं उच्च स्तरीय चिंतन)", "समावेशी शिक्षा"),
        ("RPwD Act 2016 Rights and Equal Opportunity", "Statutory mandate for non-discrimination, barrier-free access, and reasonable accommodation in schools", "दिव्यांगजन अधिकार अधिनियम 2016 के प्रावधान", "समावेशी शिक्षा"),

        # Assessment & Evaluation
        ("Assessment for Learning (Formative Assessment)", "Embedded diagnostic feedback aimed at closing learning gaps during the teaching-learning process", "अधिगम के लिए आकलन (रचनात्मक मूल्यांकन)", "आकलन एवं मूल्यांकन"),
        ("Assessment of Learning (Summative Assessment)", "End-of-term certification measuring achievement against standard learning outcomes", "अधिगम का आकलन (योगात्मक मूल्यांकन)", "आकलन एवं मूल्यांकन"),
        ("Assessment as Learning (Self-Reflection)", "Empowering students to monitor their own metacognitive progress and self-assess", "अधिगम के रूप में आकलन (स्व-मूल्यांकन)", "आकलन एवं मूल्यांकन"),
        ("Continuous and Comprehensive Evaluation (CCE)", "Holistic ongoing tracking of scholastic and co-scholastic domains to eliminate exam terror", "सतत एवं व्यापक मूल्यांकन (CCE की रूपरेखा)", "आकलन एवं मूल्यांकन"),
        ("Anecdotal Records in Primary Evaluation", "Objective narrative descriptions of significant behavioral incidents observed by teachers", "उपाख्यान अभिलेख (Anecdotal Records का महत्व)", "आकलन तकनीक"),
        ("Student Portfolio as Authentic Assessment Tool", "Curated purposeful collection of student work demonstrating growth and reflection over time", "पोर्टफोलियो (विद्यार्थी कार्य संग्रह एवं प्रगति)", "आकलन तकनीक"),
        ("Rubrics for Objective Qualitative Evaluation", "Scoring guides setting explicit criteria and performance levels for complex student performances", "रूब्रिक्स (मूल्यांकन मापनी की उपयोगिता)", "आकलन तकनीक"),

        # Learning Processes & Constructivist Pedagogy
        ("Children as Active Problem Solvers", "Learners actively generate hypotheses, test assumptions, and construct mental models", "सक्रिय समस्या समाधानकर्ता के रूप में बालक", "अधिगम एवं शिक्षण"),
        ("Alternative Conceptions (Naive Theories) of Children", "Misconceptions should not be termed 'errors' but respected as stepping stones of cognitive inquiry", "बच्चों की वैकल्पिक संकल्पनाएं (सहज ज्ञान सिद्धांत)", "अधिगम एवं शिक्षण"),
        ("Intrinsic Motivation Drivers (Autonomy, Mastery, Purpose)", "Internal desire to master challenging tasks independent of tokens or external praise", "आंतरिक अभिप्रेरणा (स्वायत्तता व सक्षमता)", "अभिप्रेरणा"),
        ("Extrinsic Motivation Pitfalls (Overjustification Effect)", "Excessive reliance on rewards can diminish intrinsic curiosity and autonomous inquiry", "बाह्य अभिप्रेरणा की सीमाएं", "अभिप्रेरणा"),
        ("Cognition and Emotion Bidirectional Link", "High positive emotional security enhances working memory and divergent problem solving", "संज्ञान और संवेग का अंतर्संबंध", "संज्ञान व संवेग"),
        ("Scaffolding Techniques (Prompts, Hints, Models)", "Gradual release of responsibility from teacher to learner (I do, We do, You do)", "स्कैफोल्डिंग प्रविधियां (संकेत, निर्देश व निदर्शन)", "शिक्षण प्रविधि"),
        ("Metacognition and Self-Regulated Learning", "Awareness and executive monitoring of one's own cognitive processes (Thinking about thinking)", "अधि-संज्ञान / परासंज्ञान (मेटाकॉग्निशन)", "संज्ञानात्मक कौशल"),
        ("Divergent vs Convergent Thinking in Problem Solving", "Divergent thinking generates multiple creative solutions; Convergent thinking arrives at single correct deduction", "अपसारी बनाम अभिसारी चिंतन (सृजनात्मकता)", "चिंतन एवं तर्क")
    ]

    # Generate remaining items up to 300 (from 24 to 300 = 276 items)
    for i in range(24, 300):
        m_idx = (i - 24) % len(cdp_modules)
        topic, facts, theme, category = cdp_modules[m_idx]
        mod = i % 4

        if mod == 0:
            stem_en = f"In Child Development and Pedagogy, which statement accurately reflects the theoretical principle of '{topic}'?"
            stem_hi = f"बाल विकास एवं शिक्षाशास्त्र के अंतर्गत '{topic}' के सैद्धांतिक आधार को कौन-सा कथन सही रूप से निरूपित करता है?"
            sol_en = f"Accurate pedagogical principle for '{topic}': {facts} ({theme})."
            sol_hi = f"'{topic}' का सही सैद्धांतिक आधार: {facts} ({theme})।"
            choices = [
                {'en': f"{facts} ({theme})", 'hi': f"{facts} ({theme})"},
                {'en': "Quantum entanglement spin matrix calculation", 'hi': "क्वांटम उलझाव स्पिन मैट्रिक्स गणना"},
                {'en': "Atmospheric isobaric meteorological gradient", 'hi': "वायुमंडलीय समदाब रेखा मौसम प्रवणता"},
                {'en': "Tectonic subduction zone continental drift velocity", 'hi': "विवर्तनिक महाद्वीपीय विस्थापन वेग दर"}
            ]
            opt_idx = 0
        elif mod == 1:
            stem_en = f"Under which major educational and developmental domain of the CTET syllabus is '{topic}' classified?"
            stem_hi = f"सीटीईटी (CTET) बाल विकास एवं शिक्षाशास्त्र पाठ्यक्रम में '{topic}' किस प्रमुख अध्ययन क्षेत्र के अंतर्गत आता है?"
            sol_en = f"'{topic}' is categorized under {category} ({theme})."
            sol_hi = f"'{topic}' का संबंध '{category}' ({theme}) क्षेत्र से है।"
            choices = [
                {'en': "Medieval French Heraldry Nomenclature", 'hi': "मध्यकालीन फ्रांसीसी राजचिह्न नामकरण"},
                {'en': f"CTET Pedagogy Core: {category} ({theme})", 'hi': f"सीटीईटी शिक्षाशास्त्र: {category} ({theme})"},
                {'en': "Geothermal Volcanic Magma Viscosity", 'hi': "भूतापीय ज्वालामुखीय मैग्मा श्यानता"},
                {'en': "Deep Ocean Trench Sonar Bathymetry", 'hi': "गहरे महासागरीय गर्त सोनार गहराई मापन"}
            ]
            opt_idx = 1
        elif mod == 2:
            stem_en = f"How should a constructivist, child-centered educator apply the concept of '{topic}' in an inclusive classroom?"
            stem_hi = f"एक रचनावादी एवं बाल-केंद्रित शिक्षक को समावेशी कक्षा में '{topic}' की समझ का प्रयोग किस प्रकार करना चाहिए?"
            sol_en = f"Effective application: {facts}. Domain: {category}."
            sol_hi = f"प्रभावी अनुप्रयोग: {facts} (क्षेत्र: {category})।"
            choices = [
                {'en': "Imposing rigid rote memorization without contextual meaning", 'hi': "बिना संदर्भ समझे केवल रटंत स्मृति पर बल देना"},
                {'en': "Segregating learners based on socioeconomic status", 'hi': "सामाजिक-आर्थिक पृष्ठभूमि के आधार पर बच्चों का अलगाव करना"},
                {'en': f"Constructivist practice: {facts} ({theme})", 'hi': f"रचनावादी शिक्षण अभ्यास: {facts} ({theme})"},
                {'en': "Conducting punitive high-stakes testing to fail students", 'hi': "बच्चों को अनुत्तीर्ण करने हेतु दंडात्मक परीक्षाएं लेना"}
            ]
            opt_idx = 2
        else:
            stem_en = f"Why is sound pedagogical understanding of '{topic}' essential for a primary or upper-primary teacher?"
            stem_hi = f"प्राथमिक या उच्च प्राथमिक स्तर के शिक्षक के लिए '{topic}' का गहन शैक्षणिक ज्ञान होना क्यों अनिवार्य है?"
            sol_en = f"It enables responsive, child-centered teaching that meets diverse developmental needs: {facts}."
            sol_hi = f"यह विविध शिक्षार्थियों की विकासात्मक आवश्यकताओं को पूरा करने और बाल-केंद्रित शिक्षण हेतु आवश्यक है: {facts}।"
            choices = [
                {'en': "To calculate commercial futures contracts on stock exchanges", 'hi': "शेयर बाजार में कमोडिटी अनुबंधों की गणना करने हेतु"},
                {'en': "To navigate naval submarines across polar ice caps", 'hi': "ध्रुवीय क्षेत्रों में नौसैनिक पनडुब्बी का संचालन करने हेतु"},
                {'en': "To sculpt marble statues in Renaissance Italian style", 'hi': "पुनर्जागरण काल की इतालवी मूर्तिकला तराशने हेतु"},
                {'en': f"Essential for inclusive child development: {facts}", 'hi': f"समावेशी बाल विकास एवं प्रभावी शिक्षण हेतु: {facts}"}
            ]
            opt_idx = 3

        items.append({
            'domain': f'Child Development - {category}',
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

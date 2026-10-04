import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling JAC Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-jac-c10-core",
        "subject_id": "jac-c10-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "JAC Class 10 Secondary (Matric) Core Disciplines Master Revision Guide",
        "summary": "Authoritative architectural blueprint covering JAC Class 10 Secondary scheme of studies: 500 aggregate marks across core subjects (80 Theory + 20 Internal Assessment), 33% passing threshold, 15 minutes dedicated reading time, OMR + Subjective combined examination architecture, Class 9 board promotion dependency (JAC_CLASS9_TO_CLASS10_DEPENDENCY), and integrated coverage of Mathematics, Science, Social Science, IT, and Health & Physical Education.",
        "content": """# JAC Secondary Examination (Class 10 Matric) Master Revision Guide

## 1. Statutory Architecture & Examination Scheme
The **Jharkhand Academic Council (JAC)** conducts the annual **Secondary Examination (Class X)** under the statutory mandate of the *Jharkhand Academic Council Act, 2002 (Jharkhand Act No. 02 of 2003)*.

- **Headquarters:** Gyandeep Campus, Bargawan, Namkum, Ranchi, Jharkhand - 834010.
- **Aggregate Marks:** 500 Marks across 5 prescribed core subjects.
- **Marks Distribution:** 80 Marks External Theory / Written Examination + 20 Marks Internal Assessment (CCE) / Practical per subject.
- **Examination Architecture:** Objective (OMR based) + Descriptive written answer sheet structure.
- **Reading Time:** 15 minutes dedicated question paper reading time provided prior to the 3-hour examination duration.
- **Writing Duration:** 3 Hours for theoretical examinations.
- **Qualifying Standard:** Minimum 33% marks in each individual subject (Theory + Internal Assessment combined) as well as 33% overall aggregate.

## 2. Core Curriculum & Subject Combinations
1. **Mathematics (`jac-c10-mathematics`):**
   - Real Numbers: Fundamental Theorem of Arithmetic, irrationality proofs.
   - Algebra: Polynomials, Pair of Linear Equations in Two Variables, Quadratic Equations, Arithmetic Progressions (AP).
   - Coordinate Geometry: Distance formula, Section formula, Mid-point formula.
   - Geometry: Similar Triangles, Basic Proportionality Theorem (Thales), Circles and Tangents.
   - Trigonometry: Trigonometric Ratios, Identities, Heights and Distances.
   - Mensuration: Areas related to Circles, Surface Areas and Volumes of Combinations of Solids.
   - Statistics & Probability: Mean, Median, Mode of grouped data, Classical probability.

2. **Science (`jac-c10-science`):**
   - Chemical Reactions & Equations, Acids, Bases & Salts, Metals and Non-Metals (Metallurgy, Reactivity series).
   - Carbon and its Compounds: Covalent bonding, homologous series, functional groups, saponification.
   - Life Processes: Autotrophic/Heterotrophic nutrition, respiration, circulation, excretion.
   - Control & Coordination: Nervous system, reflex arc, endocrine glands, plant hormones.
   - Reproduction & Heredity: Asexual/sexual modes, Mendel's laws of inheritance.
   - Physics: Light (Reflection, Refraction, Lenses, Mirrors), Human Eye & Defects, Electricity (Ohm's law, Joule's heating), Magnetic effects of current (Fleming's rules).

3. **Social Science (`jac-c10-social-science`):**
   - History: Nationalism in Europe, Nationalism in India (Non-cooperation, Civil disobedience, tribal participation).
   - Geography: Resources and Development, Water Resources (Damodar Valley Corporation - DVC, Subarnarekha Multipurpose Project), Mineral Wealth of Jharkhand (Coal at Jharia, Iron Ore at Noamundi, Copper at Ghatshila, Uranium at Jaduguda).
   - Political Science: Power Sharing, Federalism (PESA Act and Panchayati Raj in scheduled tribal areas of Jharkhand), Political Parties.
   - Economics: Sectors of the Indian Economy, Money & Credit, Self-Help Groups (SHGs), Consumer Rights.

4. **Information Technology (`jac-c10-information-technology`):**
   - Employability Skills: Communication, Self-Management, ICT, Entrepreneurship, Green Skills.
   - Subject Specific Skills: Digital Documentation (Word Processing), Electronic Spreadsheets, Relational DBMS (SQL basics), Cyber Safety.

5. **Health & Physical Education (`jac-c10-health-physical-education`):**
   - Human anatomy, fitness training, Yoga (Asanas, Pranayama), Sports heritage of Jharkhand (Jaipal Singh Munda, Deepika Kumari, MS Dhoni), First aid.

## 3. Class 9 Board Examination & Promotion Dependency
Under **`JAC_CLASS9_TO_CLASS10_DEPENDENCY`**:
- Unlike purely internal school evaluations in certain boards, JAC conducts a state-level **Class IX Board Examination** using OMR sheets and publishes official board results on `jacresults.com`.
- Qualifying the JAC Class IX Board Examination and maintaining 75% attendance are mandatory statutory prerequisites for Secondary Examination registration.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_JAC_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-jac-c10-languages-culture",
        "subject_id": "jac-c10-jharkhand-culture",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "झारखंड अधिविद्य परिषद् (JAC) मैट्रिक भाषा एवं जनजातीय संस्कृति अध्ययन मार्गदर्शिका",
        "summary": "Authoritative language and cultural heritage blueprint covering Hindi Course A/B, English, Sanskrit, Urdu, and Jharkhand Heritage (भगवान बिरसा मुंडा का उलगुलान, सिदो-कान्हू का संथाल हूल 1855, तिलका मांझी, जतरा भगत, सरहुल, करमा, सोहराय कला, सरायकेला छऊ नृत्य, दामोदर-स्वर्णरेखा कछार, बेतला एवं सारंडा वन).",
        "content": """# झारखंड अधिविद्य परिषद् (JAC) मैट्रिक भाषा एवं झारखंडी संस्कृति मार्गदर्शिका

## १. परीक्षा योजना एवं अंक विभाजन (Examination Scheme)
झारखंड अधिविद्य परिषद् (JAC) द्वारा संचालित माध्यमिक (मैट्रिक) परीक्षा में भाषा एवं संस्कृति विषयों की संरचना:
- **पूर्णांक:** १०० अंक (८० अंक सैद्धांतिक परीक्षा + २० अंक आंतरिक मूल्यांकन).
- **उत्तीर्णांक:** न्यूनतम ३३% अंक सैद्धांतिक एवं आंतरिक मूल्यांकन में संयुक्त रूप से.
- **समय:** ३ घंटे (१५ मिनट प्रश्न-पत्र अध्ययन हेतु अतिरिक्त समय).

## २. अनिवार्य हिन्दी (`jac-c10-hindi`)
- **व्याकरण:** रचना के आधार पर वाक्य भेद (सरल, संयुक्त, मिश्र), वाच्य परिवर्तन (कर्तृवाच्य, कर्मवाच्य, भाववाच्य), पद-परिचय, रस के अंग एवं प्रमुख रस भेद (शृंगार, वीर, करुण, हास्य, रौद्र)।
- **रचनात्मक लेखन:** निबंध लेखन (झारखंड के पारंपरिक पर्व, पर्यावरण संरक्षण, विज्ञान के चमत्कार), औपचारिक व अनौपचारिक पत्र लेखन, विज्ञापन एवं संदेश लेखन।
- **पाठ्यपुस्तक (क्षितिज व कृतिका भाग-२):** सूरदास, तुलसीदास (राम-लक्ष्मण-परशुराम संवाद), जयशंकर प्रसाद (आत्मकथ्य), सूर्यकांत त्रिपाठी 'निराला' (उत्साह, अट नहीं रही है), स्वयं प्रकाश (नेताजी का चश्मा), रामवृक्ष बेनीपुरी (बालगोबिन भगत), यशपाल (लखनवी अंदाज़)।

## ३. संस्कृत एवं उर्दू (`jac-c10-sanskrit`, `jac-c10-urdu`)
- **संस्कृत:** शुचिपर्यावरणम्, जननी तुल्यवत्सला, सन्धि (स्वर, व्यञ्जन, विसर्ग), समास (तत्पुरुष, कर्मधारय, द्विगु, द्वन्द्व), प्रत्यय (मतुप्, तल्, त्व, शतृ, शानच्), शब्दरूप एवं धातुरूप।
- **اردو (Urdu):** نثری و شعری اسباق (سر سید احمد خان، منشی پریم چند، میر تقی میر، مرزا اسد اللہ خان غالب، علامہ اقبال)، اردو قواعد (اسم، ضمیر، صفت، تذکیر و تانیث، محاورات)، اور خطوط نویسی۔

## ४. अंग्रेजी (`jac-c10-english`)
- Prose: A Letter to God, Nelson Mandela: Long Walk to Freedom, From the Diary of Anne Frank, Glimpses of India.
- Poetry: Dust of Snow, Fire and Ice, A Tiger in the Zoo, Amanda!, The Trees.
- Supplementary: A Triumph of Surgery, The Thief's Story, The Necklace, Bholi.
- Grammar: Tenses, Modals, Subject-Verb Concord, Reported Speech, Formal Letters & Analytical Paragraphs.

## ५. झारखंड अध्ययन, स्वतंत्रता संग्राम एवं जनजातीय संस्कृति (`jac-c10-jharkhand-culture`)
- **अमर स्वतंत्रता सेनानी एवं जननायक:**
  - **भगवान बिरसा मुंडा:** "धरती आबा", 1899-1900 का ऐतिहासिक 'उलगुलान' (महान विद्रोह), छोटानागपुर काश्तकारी अधिनियम (CNT Act 1908) के प्रणेता।
  - **सिदो-कान्हू, चांद-भैरव, फूलो-झानो:** 1855 का ऐतिहासिक 'संथाल हूल' (संथाल विद्रोह), भोगनाडीह से बिगुल, संथाल परगना काश्तकारी अधिनियम (SPT Act)।
  - **तिलका मांझी:** ईस्ट इंडिया कंपनी के विरुद्ध हथियार उठाने वाले प्रथम जनजातीय विद्रोही (1784 क्लीवलैंड का वध)।
  - **जतरा भगत एवं टाना भगत आंदोलन (1914):** अहिंसक जनजातीय सत्याग्रह, गांधीवादी सिद्धांतों का पूर्ववर्ती स्वरूप।
  - **पंडित रघुनाथ मुर्मू:** 1925 में संथाली भाषा हेतु 'ओल चिकी' (Ol Chiki) लिपि के जनक।
  - **जयपाल सिंह मुंडा:** 1928 एम्सटर्डम ओलंपिक स्वर्ण पदक विजेता भारतीय हॉकी टीम के कप्तान, संविधान सभा के सदस्य, आदिवासी महासभा के संस्थापक।
  - **शहीद नीलांबर-पीतांबर:** 1857 के स्वतंत्रता संग्राम में पलामू के भोक्ता नायक।
- **पारंपरिक पर्व एवं अनुष्ठान:**
  - **सरहुल (बाहा परब):** सखुआ (साल) वृक्ष के फूलों का पूजन, नववर्ष एवं प्रकृति आराधना का महापर्व।
  - **करमा:** करम वृक्ष की डालियों का पूजन, प्रकृति, भाई-बहन के प्रेम (करमा-धरमा की गाथा) का उत्सव।
  - **सोहराय:** दीपावली के अगले दिन पशुधन का आभार पर्व, घरों की दीवारों पर अद्वितीय भित्ति चित्रकला।
  - **तुसू परब एवं मकर संक्रांति:** कुड़मी एवं अन्य समुदायों का लोक उत्सव, चौड़ल विसर्जन।
- **लोक कला, शिल्प एवं नृत्य:**
  - **सोहराय एवं कोहबर चित्रकला:** हजारीबाग की विश्वप्रसिद्ध जनजातीय भित्ति चित्रकला (जीआई टैग प्राप्त)।
  - **ढोकरा शिल्प (Dhokra Art):** मोम ढलाई (Lost-wax process) तकनीक से कांस्य/पीतल की पारंपरिक मूर्तियां।
  - **छऊ नृत्य:** सरायकेला छऊ (मुखौटा नृत्य) - यूनेस्को द्वारा मानवता की अमूर्त सांस्कृतिक धरोहर घोषित।
  - **पाइका एवं झूमर नृत्य:** सैनिकों का शौर्य नृत्य (पाइका) तथा महिलाओं एवं पुरुषों का उल्लासपूर्ण झूमर नृत्य।
- **भूगोल एवं पारिस्थितिकी:**
  - छोटानागपुर पठार, पारसनाथ पहाड़ी (सम्मेद शिखरजी - 1365 मी., सर्वोच्च शिखर)।
  - नदियाँ: दामोदर (बंगाल का शोक कहलाने वाली, डीवीसी परियोजना), स्वर्णरेखा (हुंडरू जलप्रपात), बराकर (मैथन एवं तिलैया बांध)।
  - अभयारण्य: बेतला राष्ट्रीय उद्यान (1932 में विश्व की पहली बाघ गणना), दालमा गज अभयारण्य, सारंडा वन (सात सौ पहाड़ियों की भूमि)।
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_JAC_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-jac-c12-science",
        "subject_id": "jac-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "JAC Class 12 Intermediate of Science (I.Sc) Master Revision Guide",
        "summary": "Authoritative syllabus guide for JAC Intermediate of Science (I.Sc): 500 aggregate marks across 5 subjects, 70 Theory + 30 Practical laboratory architecture for Physics, Chemistry, Biology, Computer Science, and Geology (Signature Mineral Discipline of Jharkhand), 80/20 for Mathematics, passing rule 23 in Theory + 10 in Practical (33% combined), Class 11 board promotion prerequisite (JAC_CLASS11_TO_CLASS12_DEPENDENCY), and 15 minutes reading time.",
        "content": """# JAC Intermediate of Science (I.Sc Class 12) Master Revision Guide

## 1. Statutory Architecture & Practical Evaluation Scheme
The Intermediate Examination (Class XII) in the Science stream is administered annually by the Jharkhand Academic Council:
- **Aggregate Evaluation:** 500 Marks across 5 compulsory and elective subjects.
- **Laboratory Subjects (Physics, Chemistry, Biology, Computer Science, Geology):**
  - **Theory Paper:** 70 Marks (3 Hours duration, 15 minutes reading time).
  - **Practical Examination:** 30 Marks (Laboratory experiments, project file, viva voce).
  - **Passing Standard:** Minimum 23 marks in Theory (33%) AND minimum 10 marks in Practical (33%), totaling minimum 33 marks.
- **Non-Laboratory Subjects (Mathematics):**
  - **Theory Paper:** 80 Marks + 20 Marks Internal Assessment (CCE).
  - **Passing Standard:** Minimum 26 marks in Theory + 7 marks in IA = 33 marks.

## 2. Core Science Disciplines
1. **Physics (`jac-c12-physics`):**
   - Electrostatics: Coulomb's Law, Electric Dipole, Gauss's Theorem, Capacitors.
   - Current Electricity: Ohm's Law, Drift Velocity, Kirchhoff's Rules, Wheatstone Bridge.
   - Magnetism & EM Induction: Biot-Savart Law, Ampere's Law, Faraday's Laws, Lenz's Law, AC Generators, Transformers.
   - Optics: Ray Optics (Mirrors, Lenses, Optical Instruments), Wave Optics (Huygens' Principle, Interference, Diffraction).
   - Modern Physics: Photoelectric Effect, Bohr's Model, Binding Energy, Semiconductor Diodes, Logic Gates.

2. **Chemistry (`jac-c12-chemistry`):**
   - Physical Chemistry: Solutions (Colligative properties, Raoult's law), Electrochemistry (Nernst equation, Kohlrausch's law), Chemical Kinetics (Rate laws, Arrhenius equation).
   - Inorganic Chemistry: d- and f-Block Elements (Lanthanoid contraction), Coordination Compounds (Werner's theory, VBT, CFT).
   - Organic Chemistry: Haloalkanes/Haloarenes (SN1/SN2), Alcohols/Phenols/Ethers, Aldehydes/Ketones/Carboxylic Acids, Amines (Diazonium salts), Biomolecules.

3. **Mathematics (`jac-c12-mathematics`):**
   - Relations and Functions, Matrices and Determinants, Calculus (Continuity, Differentiation, Integrals, Differential Equations).
   - Vectors and Three-Dimensional Geometry, Linear Programming, Probability (Bayes' Theorem).

4. **Biology (`jac-c12-biology`):**
   - Sexual Reproduction in Flowering Plants, Human Reproduction, Genetics and Molecular Biology (DNA replication, operon model), Evolution.
   - Biotechnology Principles & Applications, Ecology and Biodiversity Conservation (Special focus on Saranda Forest and Betla National Park).

5. **Computer Science (`jac-c12-computer-science`):**
   - Computational Thinking in Python, File Handling (Text, Binary, CSV), Stacks and Queues.
   - Computer Networks, Cybersecurity, Relational Database Management (SQL DDL/DML, Joins, Group By).

6. **Geology (`jac-c12-geology` - Signature Jharkhand Subject):**
   - Structural Geology: Interior of the Earth, dip, strike, folds, faults, joints.
   - Crystallography & Mineralogy: Crystal systems, rock-forming minerals (Quartz, Feldspar, Mica).
   - Petrology: Igneous, Sedimentary, Metamorphic rocks.
   - Economic Geology of Jharkhand: Coal deposits of Damodar Valley (Jharia, Bokaro), Iron Ore of Singhbhum (Noamundi, Kiriburu), Copper (Ghatshila), Uranium (Jaduguda), Bauxite (Lohardaga).

## 3. Class 11 Board Promotion Prerequisite
Under **`JAC_CLASS11_TO_CLASS12_DEPENDENCY`**:
- JAC conducts a mandatory state-level **Class XI Board Examination** using OMR answer sheets across Science, Commerce, and Arts.
- Qualifying the Class XI Board Examination and maintaining 75% attendance are statutory prerequisites for registration in the Class XII Intermediate Examination.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_JAC_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-jac-c12-commerce",
        "subject_id": "jac-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "JAC Class 12 Intermediate of Commerce (I.Com) Master Revision Guide",
        "summary": "Authoritative syllabus guide for JAC Intermediate of Commerce (I.Com): 80 Theory + 20 Project evaluation structure, passing rule 26 in Theory + 7 in Project (33% combined), 15 minutes reading time, covering Accountancy, Business Studies, Economics, Commercial Arithmetic & Business Mathematics, and Entrepreneurship.",
        "content": """# JAC Intermediate of Commerce (I.Com Class 12) Master Revision Guide

## 1. Statutory Architecture & Examination Scheme
The JAC Intermediate Commerce curriculum provides foundational competencies in accounting, finance, management, commercial arithmetic, and entrepreneurship:
- **Theory Examination:** 80 Marks (3 Hours duration, 15 minutes dedicated reading time).
- **Project Work / Practical:** 20 Marks (Comprehensive project file, written assessment, viva voce).
- **Passing Standard:** Minimum 26 marks in Theory (33%) AND minimum 7 marks in Project (33%), totaling minimum 33 marks per subject.

## 2. Core Commerce Disciplines
1. **Accountancy (`jac-c12-accountancy`):**
   - Accounting for Not-for-Profit Organisations: Receipts & Payments, Income & Expenditure, Balance Sheet.
   - Partnership Accounting: Fundamentals, Capital Accounts, Goodwill Valuation, Admission, Retirement, Death, Dissolution of Partnership Firm.
   - Company Accounting: Issue, Forfeiture, and Reissue of Shares, Issue and Redemption of Debentures.
   - Financial Statement Analysis: Schedule III Balance Sheet, Financial Ratios (Liquidity, Solvency, Turnover, Profitability), Cash Flow Statement (AS-3).

2. **Business Studies (`jac-c12-business-studies`):**
   - Principles & Functions of Management: Fayol's 14 Principles, Taylor's Scientific Management, Planning, Organising, Staffing, Directing, Controlling.
   - Business Finance & Marketing: Financial Management, Capital Structure, Financial Markets (SEBI), Marketing Mix (4Ps), Consumer Protection Act 2019.

3. **Economics (`jac-c12-economics`):**
   - Microeconomics: Consumer Equilibrium, Law of Demand, Cost & Revenue, Law of Supply, Market Structures.
   - Macroeconomics: National Income Accounting (GDP, GNP, NNP), Money & Banking (Credit Creation, RBI Monetary Policy), Income Determination, Government Budget, Balance of Payments.
   - Economic Development of Jharkhand: Mining industry, heavy engineering (HEC Ranchi, Tata Steel, SAIL Bokaro), tribal rural economy.

4. **Commercial Arithmetic & Business Mathematics (`jac-c12-commercial-arithmetic`):**
   - Commercial Finance: Compound Interest, Annuities, Sinking Funds, Depreciation.
   - Mathematical Tools: Matrices and Determinants in business models (Leontief input-output analysis), Linear Programming, Time Series Analysis, Index Numbers.

5. **Entrepreneurship (`jac-c12-entrepreneurship`):**
   - Sensing Business Opportunities, Enterprise Planning, Business Arithmetic (BEP, Unit Cost, Cash Flow), Resource Mobilisation, MSME policies in Jharkhand.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_JAC_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-jac-c12-humanities-languages",
        "subject_id": "jac-c12-history",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "झारखंड अधिविद्य परिषद् (JAC) १२वीं कला संकाय (I.A) एवं भाषा-साहित्य संपूर्ण मार्गदर्शिका",
        "summary": "Authoritative JAC Intermediate of Arts (I.A) blueprint covering History (Indian History, 1857 Revolt in Chota Nagpur, Birsa Munda movement), Political Science (Contemporary World, Indian Politics, Jharkhand Statehood Movement 15 Nov 2000), Geography (Chota Nagpur Mineral Belt, Damodar Valley), Sociology (Indian Society, PESA Act, Tribal Sociology), Psychology, Home Science, Hindi Core, English Core, Sanskrit Elective, and Urdu Elective.",
        "content": """# झारखंड अधिविद्य परिषद् (JAC) १२वीं कला संकाय (I.A) एवं भाषा-साहित्य मार्गदर्शिका

## १. कला संकाय की विशिष्टता एवं परीक्षा योजना (Humanities Scheme)
झारखंड अधिविद्य परिषद् (JAC) का कला संकाय (I.A) सामाजिक विज्ञानों, जनजातीय इतिहास, राजनीति और समृद्ध बहुभाषी साहित्य का समन्वय प्रस्तुत करता है:
- **सैद्धांतिक विषय (इतिहास, राजनीति विज्ञान, समाजशास्त्र, हिन्दी, अंग्रेजी, संस्कृत, उर्दू):** ८० अंक सैद्धांतिक + २० अंक आंतरिक मूल्यांकन।
- **प्रायोगिक विषय (भूगोल, मनोविज्ञान, गृह विज्ञान):** ७० अंक सैद्धांतिक + ३० अंक प्रायोगिक परीक्षा।
- **उत्तीर्णांक:** न्यूनतम ३३% अंक (प्रायोगिक विषयों में २३ सैद्धांतिक + १० प्रायोगिक)।

## २. कला संकाय के मुख्य विषय (Core Humanities Disciplines)
1. **इतिहास (`jac-c12-history`):**
   - प्राचीन भारत: हड़प्पा सभ्यता (ईंटें, मनके, अस्थियां), आरंभिक राज्य और अर्थव्यवस्थाएं (मौर्य, गुप्त काल), सामाजिक इतिहास (महाभारत के संदर्भ में जाति एवं बंधुत्व), सांची का स्तूप एवं बौद्ध-जैन दर्शन।
   - मध्यकालीन भारत: यात्रियों के वृत्तांत (अल-बिरूनी, इब्न बतूता, बर्नियर), भक्ति-सूफी परंपराएं, विजयनगर साम्राज्य।
   - आधुनिक भारत: उपनिवेशवाद और देहात (संथाल हूल 1855), 1857 की क्रांति (छोटानागपुर में नीलांबर-पीतांबर, ठाकुर विश्वनाथ शाहदेव, टिकैत उमरांव सिंह), महात्मा गांधी एवं राष्ट्रीय आंदोलन (बिरसा मुंडा आंदोलन एवं टाना भगत सत्याग्रह), संविधान निर्माण।

2. **राजनीति विज्ञान (`jac-c12-political-science`):**
   - समकालीन विश्व राजनीति: शीतयुद्धोत्तर विश्व, सोवियत संघ का विघटन, वैकल्पिक सत्ता केंद्र (यूरोपीय संघ, आसियान, ब्रिक्स), संयुक्त राष्ट्र संघ, वैश्वीकरण।
   - स्वतंत्र भारत में राजनीति: राष्ट्र निर्माण की चुनौतियाँ, नियोजित विकास (नीति आयोग), भारत के विदेश संबंध, लोकतांत्रिक व्यवस्था का संकट (1975 का आपातकाल), क्षेत्रीय आकांक्षाएं एवं ऐतिहासिक झारखंड राज्य निर्माण आंदोलन (15 नवंबर 2000 को 28वें राज्य के रूप में गठन)।

3. **भूगोल (`jac-c12-geography`):**
   - मानव भूगोल के मूल सिद्धांत: जनसंख्या, मानव विकास, प्राथमिक, द्वितीयक एवं तृतीयक क्रियाकलाप, अंतर्राष्ट्रीय व्यापार।
   - भारत: लोग एवं अर्थव्यवस्था: भारत तथा छोटानागपुर पठार का भूगोल, दामोदर एवं स्वर्णरेखा नदी घाटी, खनिज संसाधन (कोयला, लोहा, तांबा, अभ्रक, यूरेनियम), जमशेदपुर व बोकारो औद्योगिक क्षेत्र।

4. **समाजशास्त्र (`jac-c12-sociology`):**
   - भारतीय समाज की संरचना, जाति व्यवस्था, परिवार, नातेदारी, सामाजिक विषमता एवं बहिष्कार।
   - सामाजिक परिवर्तन: औद्योगिकीकरण, नगरीकरण, आधुनिकीकरण, पेसा कानून (PESA Act 1996) एवं झारखंड में जनजातीय ग्राम सभाओं की स्वायत्तता।

5. **मनोविज्ञान एवं गृह विज्ञान (`jac-c12-psychology`, `jac-c12-home-science`):**
   - मनोविज्ञान: बुद्धि के सिद्धांत, व्यक्तित्व, तनाव प्रबंधन, मनोवैज्ञानिक विकार (DSM-5), मनोचिकित्सा (CBT)।
   - गृह विज्ञान: मानव विकास, आहार एवं नैदानिक पोषण, वस्त्र एवं परिधान डिजाइन, पारिवारिक वित्तीय प्रबंधन, उपभोक्ता संरक्षण 2019।

## ३. भाषा एवं साहित्य (Languages & Literature)
- **हिन्दी कोर (`jac-c12-hindi`):** आरोह भाग २ (काव्य - बच्चन, कुंवर नारायण, तुलसीदास, फिराक गोरखपुरी; गद्य - महादेवी वर्मा, जैनेंद्र कुमार, फणीश्वर नाथ रेणु, हजारी प्रसाद द्विवेदी), वितान भाग २ (सिल्वर वैडिंग, जूझ, अतीत में दबे पांव), अभिव्यक्ति और माध्यम।
- **अंग्रेजी कोर (`jac-c12-english`):** Flamingo Prose & Poetry (The Last Lesson, Lost Spring, Deep Water, Indigo, Keeping Quiet, A Thing of Beauty), Vistas (The Third Level, The Tiger King, The Enemy), Advanced Writing Skills.
- **संस्कृत ऐच्छिक (`jac-c12-sanskrit`):** शाश्वती भाग २, उपनिषद, कालिदास एवं भवभूति साहित्य, व्याकरण (संधि, समास, प्रत्यय, कारक), छंद एवं अलंकार।
- **اردو اختیاری (`jac-c12-urdu`):** نثری و شعری اصناف (میر امن، سر سید، پریم چند، منٹو، میر تقی میر، غالب، اقبال)، علم بیان و بدیع، اور دبستان دلی و لکھنؤ۔
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_JAC_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_file = os.path.join(os.path.dirname(__file__), "jac_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"Compiled {len(NOTES)} Master Bundled Study Notes -> saved to {out_file}")

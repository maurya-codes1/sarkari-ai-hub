import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling CGBSE Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-cg-c10-core",
        "subject_id": "cg-c10-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "CGBSE Class 10 High School Certificate (HSC) Core Disciplines Master Revision Guide",
        "summary": "Authoritative architectural blueprint covering CGBSE Class 10 High School Certificate (HSC) scheme of studies: 600 aggregate marks across core subjects (75 Theory + 25 Project/Practical for Math & Science, 75 Theory + 25 Project for Social Science), 33% passing threshold, 15 minutes dedicated reading time, continuous comprehensive evaluation (CCE), and integrated coverage of Mathematics, Science, Social Science, Information Technology, Vocational Education, and Health & Physical Education.",
        "content": """# CGBSE HSC (Class 10) Comprehensive Master Preparation Guide

## 1. Statutory Architecture & Examination Scheme
The **Chhattisgarh Board of Secondary Education (CGBSE)** conducts the annual **High School Certificate (HSC) Examination** under the statutory authority of the *Chhattisgarh Board of Secondary Education Act, 2001 (Chhattisgarh Act No. 23 of 2001)*.

- **Headquarters:** Pension Bada, Raipur, Chhattisgarh - 492001.
- **Aggregate Marks:** 600 Marks across 6 prescribed subjects.
- **Marks Distribution:** 75 Marks External Theory Examination + 25 Marks Internal / Practical / Project Assessment (CCE) per subject.
- **Reading Time:** 15 minutes dedicated question paper reading time provided prior to the commencement of the 3-hour examination.
- **Writing Duration:** 3 Hours for theoretical examinations.
- **Qualifying Standard:** Minimum 33% marks in each individual subject (Theory + Practical/Project combined) as well as 33% overall aggregate.

## 2. Core Curriculum & Subject Combinations
1. **Mathematics (`chhattisgarh-c10-mathematics`):**
   - Arithmetic Progressions, Linear Equations in Two Variables, Quadratic Equations.
   - Coordinate Geometry, Trigonometry and Applications (Heights and Distances).
   - Commercial Mathematics: Banking (Recurring Deposit, Fixed Deposit) and Taxation (Income Tax Calculation).
   - Geometry: Similar Triangles, Circles, Tangents, Constructions.
   - Mensuration: Surface Area and Volume of Cube, Cuboid, Cylinder, Cone, Sphere.
   - Statistics and Probability: Mean, Median, Mode, Empirical Probability.

2. **Science (`chhattisgarh-c10-science`):**
   - Chemistry: Chemical Reactions, Periodic Classification, Metals and Non-metals, Carbon and its Compounds.
   - Physics: Electricity (Ohm's Law, Joule's Heating, Circuit Diagrams), Magnetic Effects of Electric Current, Light (Reflection, Refraction, Lenses, Mirrors).
   - Biology: Life Processes (Nutrition, Respiration, Transportation, Excretion), Control and Coordination, Reproduction, Heredity and Evolution, Environment.

3. **Social Science (`chhattisgarh-c10-social-science`):**
   - History: First World War, Russian Revolution, Inter-war period, Second World War, Post-war Decolonization and Making of Modern India.
   - Geography: Resources and Development, Agriculture in India and Chhattisgarh, Minerals and Energy Resources, Manufacturing Industries.
   - Political Science: Indian Democracy, Constitution Making, Electoral Process, Parliament and Governance, Social Movements.
   - Economics: Development, Sectors of Indian Economy, Money and Financial Systems, Public Distribution System (PDS) in Chhattisgarh.

4. **Information Technology (`chhattisgarh-c10-information-technology`):**
   - Digital Documentation (Word Processing, Tables, Formatting).
   - Electronic Spreadsheets (Formulas, Functions, Charts).
   - Relational Database Management System (DBMS, SQL Basics, Tables, Queries).
   - Cyber Ethics, Digital Citizenship, and Web Safety.

5. **Vocational Education (`chhattisgarh-c10-vocational`):**
   - Sector-specific skills in Retail, Automotive, Agriculture, and Healthcare.
   - Customer relations, store operations, inventory management, workshop safety.

6. **Health & Physical Education (`chhattisgarh-c10-health-physical-education`):**
   - Human anatomy, fitness training, Yoga (Asanas and Pranayama), First Aid, Nutrition, Substance abuse prevention.

## 3. Class IX Institutional Evaluation & Enrolment Dependency
Under **`CGBSE_CLASS9_TO_CLASS10_DEPENDENCY`**:
- Class IX is an intermediate institutional stage evaluated under CGBSE continuous academic norms.
- Minimum 75% attendance and formal school enrolment return submitted to CGBSE Raipur are mandatory prerequisites for HSC board registration.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_CGBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-cg-c10-languages-heritage",
        "subject_id": "cg-c10-hindi",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "माध्यमिक शिक्षा मण्डल रायपुर कक्षा १०वीं भाषा एवं छत्तीसगढ़ी संस्कृति अध्ययन मार्गदर्शिका",
        "summary": "Authoritative CGBSE Class 10 language and cultural heritage blueprint covering Hindi Special/General, English Special/General, Sanskrit, and Chhattisgarh Culture & Heritage (छत्तीसगढ़ी संस्कृति, साहित्य, त्योहार - हरेली, पोला, तीजा, छेरछेरा, लोकनृत्य - पंथी, राउत नाचा, सुआ, कर्मा, और ऐतिहासिक विभूतियां - वीर नारायण सिंह, गुंडाधूर).",
        "content": """# छत्तीसगढ़ माध्यमिक शिक्षा मण्डल (CGBSE) १०वीं भाषा एवं संस्कृति अध्ययन मार्गदर्शिका

## १. परीक्षा योजना एवं अंक विभाजन (Examination Scheme)
छत्तीसगढ़ माध्यमिक शिक्षा मण्डल रायपुर द्वारा संचालित हाई स्कूल परीक्षा में भाषा विषयों की संरचना:
- **पूर्णांक:** १०० अंक (७५ अंक सैद्धांतिक परीक्षा + २५ अंक प्रायोजना / आंतरिक मूल्यांकन).
- **उत्तीर्णांक:** न्यूनतम ३३% अंक सैद्धांतिक एवं प्रायोजना में संयुक्त रूप से.
- **समय:** ३ घंटे (१५ मिनट प्रश्न-पत्र अध्ययन हेतु अतिरिक्त समय).

## २. विशिष्ट एवं सामान्य हिन्दी (`chhattisgarh-c10-hindi`)
- **व्याकरण:**
  - पदबंध, वाच्य (कर्तृवाच्य, कर्मवाच्य, भाववाच्य), वाक्य भेद (सरल, संयुक्त, मिश्र).
  - समास (तत्पुरुष, कर्मधारय, द्विगु, द्वंद्व, बहुव्रीहि, अव्ययीभाव).
  - रस (स्थायी भाव, विभाव, अनुभाव, संचारी भाव एवं प्रमुख रस भेद).
  - अलंकार (अनुप्रास, यमक, श्लेष, उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति).
  - मुहावरे एवं लोकोक्तियाँ, अपठित गद्यांश एवं पद्यांश.
- **रचनात्मक लेखन:** निबंध लेखन (समसामयिक, सामाजिक, पर्यावरणीय विषय), औपचारिक एवं अनौपचारिक पत्र लेखन.
- **पाठ्यपुस्तक (क्षितिज व कृतिका भाग-२):**
  - सूरदास, तुलसीदास, जयशंकर प्रसाद, सूर्यकांत त्रिपाठी 'निराला' की काव्य रचनाएं.
  - नेताजी का चश्मा, बालगोबिन भगत, लखनवी अंदाज, एक कहानी यह भी.

## ३. संस्कृत (`chhattisgarh-c10-sanskrit`)
- **व्याकरण:** संधि (स्वर, व्यंजन, विसर्ग), शब्द रूप (बालक, लता, फल, मति, नदी, साधु, अस्मद्, युष्मद्), धातु रूप (पठ्, गम्, भू, कृ, लट्, लृट्, लङ्, लोट्, विधिलिङ्).
- कारक एवं उपपद विभक्तियाँ, प्रत्यय (क्त्वा, ल्यप्, तुमुन्, क्त, क्तवतु, शतृ, शानच्).
- अव्यय, समय लेखनम्, चित्र आधारित वर्णनम्, पत्र लेखनम्, अपठित अवबोधनम्.

## ४. अंग्रेजी (`chhattisgarh-c10-english`)
- Reading Comprehension (Discursive & Factual Passages).
- Writing Skills: Notice Writing, Letter to the Editor, Formal Applications, Analytical Paragraphs.
- Grammar: Tenses, Modals, Subject-Verb Concord, Reported Speech, Active & Passive Voice.
- Literature: First Flight (Prose & Poetry), Footprints Without Feet (Supplementary Reader).

## ५. छत्तीसगढ़ी संस्कृति, विरासत एवं लोक कला (`chhattisgarh-c10-culture-heritage`)
- **ऐतिहासिक जननायक:**
  - **शहीद वीर नारायण सिंह:** सोनाखान के जमींदार, १८५७ के प्रथम स्वतंत्रता संग्राम सेनानी (फांसी: १० दिसंबर १८५७).
  - **गुंडाधूर:** १९१० के ऐतिहासिक बस्तर 'भूूमकाल' जनविद्रोह के अमर नायक.
  - **गेंद सिंह:** १८२५ के परलकोट विद्रोह के महानायक.
  - **पंडित सुंदरलाल शर्मा:** छत्तीसगढ़ में स्वतंत्रता आंदोलन एवं राष्ट्रीय चेतना के जनक (छत्तीसगढ़ के गांधी).
  - **ठाकुर प्यारेलाल सिंह:** राजनांदगांव के ऐतिहासिक बीएनसी मिल मजदूर आंदोलन के नेता एवं सहकारिता आंदोलन के प्रणेता.
  - **डॉ. खूबचंद बघेल:** छत्तीसगढ़ राज्य चेतना के अग्रदूत.
- **पारंपरिक पर्व एवं उत्सव:**
  - **हरेली:** छत्तीसगढ़ का प्रथम कृषि पर्व (सावन अमावस्या) - कृषि औजारों की पूजा एवं गेड़ी दौड़.
  - **पोला (बैल पोला):** बैलों की पूजा, मिट्टी के नंदी बैल, और ठेठरी-खुरमी व्यंजन.
  - **तीजा:** महिलाओं का अखंड सौभाग्य व्रत.
  - **छेरछेरा:** पौष पूर्णिमा पर धान दान का अन्नदान पर्व (छेरछेरा कोठी के धान ला हेरते हेरा).
  - **बस्तर दशहरा:** ७५ दिनों तक चलने वाला विश्वप्रसिद्ध पर्व, मां दंतेश्वरी की आराधना, काछनगादी एवं रथ परिक्रमा.
- **लोक नृत्य एवं लोक संगीत:**
  - **पंथी नृत्य:** सतनाम पंथ के प्रवर्तक बाबा गुरु घासीदास के संदेशों पर आधारित आध्यात्मिक नृत्य.
  - **राउत नाचा:** यादव समुदाय द्वारा दीपावली पर प्रस्तुत किया जाने वाला शौर्य नृत्य (दोहे एवं लाठी संचालन).
  - **सुआ नृत्य:** महिलाओं द्वारा धान कुटाई एवं पर्वों पर तोते (सुआ) को साक्षी मानकर किया जाने वाला भक्तिमय नृत्य.
  - **कर्मा नृत्य:** करमा वृक्ष की पूजा, बैगा, गोंड, उरांव जनजातियों का उल्लासपूर्ण नृत्य.
  - **पंडवानी:** महाभारत कथा का संगीतमय गायन (कापालिक शैली - तीजन बाई; वेदमती शैली - झाड़ूराम देवांगन).
  - **भरथरी:** राजा गोपीचंद एवं भरथरी की वैराग्य गाथा (सुरुजबाई खांडे).
  - **ददरिया:** छत्तीसगढ़ का लोक प्रणय गीत (लोकगीतों का राजा).
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_CGBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-cg-c12-science",
        "subject_id": "cg-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "CGBSE Class 12 Higher Secondary School Certificate (HSSC) Science Stream Master Guide",
        "summary": "Authoritative syllabus guide for CGBSE Higher Secondary (HSSC) Science stream: 500 aggregate marks across 5 subjects, 70 Theory + 30 Practical laboratory structure for Physics, Chemistry, Biology, Computer Science, Environmental Science, 80/20 for Mathematics, passing rule 23 in Theory + 10 in Practical (33% combined), 15 minutes reading time.",
        "content": """# CGBSE Higher Secondary (HSSC) Class 12 Science Stream Master Guide

## 1. Statutory Architecture & Practical Evaluation Scheme
The Higher Secondary School Certificate (HSSC) examination is conducted annually by the Chhattisgarh Board of Secondary Education (Raipur).
- **Aggregate Evaluation:** 500 Marks across 5 compulsory/elective subjects.
- **Laboratory Subjects (Physics, Chemistry, Biology, Computer Science, Environmental Science):**
  - **Theory Paper:** 70 Marks (3 Hours duration, 15 minutes reading time).
  - **Practical / Internal Evaluation:** 30 Marks (Laboratory experiments, viva voce, project file).
  - **Passing Threshold:** Minimum 23 marks in Theory (33%) AND minimum 10 marks in Practical (33%), totaling minimum 33 marks.
- **Non-Laboratory Subjects (Mathematics):**
  - **Theory Paper:** 80 Marks + 20 Marks Internal Assessment (CCE).
  - **Passing Threshold:** Minimum 26 marks in Theory + 7 marks in IA = 33 marks.

## 2. Core Science Disciplines
1. **Physics (`chhattisgarh-c12-physics`):**
   - Electrostatics: Coulomb's Law, Electric Field, Gauss's Theorem, Capacitors.
   - Current Electricity: Ohm's Law, Kirchhoff's Rules, Wheatstone Bridge, Potentiometer.
   - Magnetism & Magnetic Effects of Current: Biot-Savart Law, Ampere's Law, Cyclotron, Diamagnetic/Paramagnetic/Ferromagnetic materials.
   - Electromagnetic Induction & AC: Faraday's Laws, Lenz's Law, LC Oscillations, Transformers.
   - Electromagnetic Waves & Optics: Ray Optics (Mirrors, Lenses, Optical Instruments), Wave Optics (Huygens' Principle, Interference, Diffraction, Polarization).
   - Modern Physics: Dual Nature of Matter and Radiation (Photoelectric Effect), Atoms (Bohr's Model), Nuclei (Binding Energy, Radioactivity).
   - Electronic Devices: Semiconductor Diodes, Rectifiers, Zener Diodes, Logic Gates.

2. **Chemistry (`chhattisgarh-c12-chemistry`):**
   - Physical Chemistry: Solutions (Raoult's Law, Colligative Properties), Electrochemistry (Nernst Equation, Galvanic Cells, Kohlrausch's Law), Chemical Kinetics (Rate Laws, Arrhenius Equation).
   - Inorganic Chemistry: d- and f-Block Elements (Lanthanide Contraction, Transition Metal properties), Coordination Compounds (Werner's Theory, Valence Bond Theory, Crystal Field Theory).
   - Organic Chemistry: Haloalkanes and Haloarenes (SN1 & SN2 Mechanisms), Alcohols, Phenols and Ethers, Aldehydes, Ketones and Carboxylic Acids, Amines (Diazonium Salts), Biomolecules (Carbohydrates, Proteins, Nucleic Acids).

3. **Mathematics (`chhattisgarh-c12-mathematics`):**
   - Relations and Functions, Inverse Trigonometric Functions.
   - Matrices and Determinants (Properties, Inverses, System of Linear Equations).
   - Calculus: Continuity and Differentiability, Applications of Derivatives, Indefinite and Definite Integrals, Applications of Integrals (Area under Curves), Differential Equations.
   - Vectors and Three-Dimensional Geometry (Direction Cosines, Lines, Planes).
   - Linear Programming (Formulation and Graphical Method).
   - Probability (Conditional Probability, Bayes' Theorem, Probability Distributions).

4. **Biology (`chhattisgarh-c12-biology`):**
   - Reproduction in Organisms, Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health.
   - Genetics and Evolution: Principles of Inheritance and Variation (Mendelian Genetics, Linkage), Molecular Basis of Inheritance (DNA Replication, Transcription, Translation), Evolution.
   - Biology in Human Welfare: Human Health and Diseases, Microbes in Human Welfare.
   - Biotechnology: Principles and Processes (Recombinant DNA Technology), Applications in Agriculture and Medicine.
   - Ecology and Environment: Organisms and Populations, Ecosystem, Biodiversity and Conservation (Special reference to Indravati and Kanger Valley National Parks of Chhattisgarh).

5. **Computer Science (`chhattisgarh-c12-computer-science`):**
   - Computational Thinking and Programming in Python.
   - Data Structures: Stacks and Queues using Python lists.
   - Computer Networks: Topologies, Transmission media, Protocols (TCP/IP, HTTP, FTP, DNS), Network Security.
   - Database Management: SQL (DDL, DML, Joins, Group By, Aggregate Functions), Interface Python with SQL.
   - Societal Impacts: Cyber Law, Intellectual Property Rights, E-Waste Management.

6. **Environmental Science (`chhattisgarh-c12-environmental-science`):**
   - Ecosystem dynamics, Biodiversity of Central India, Forest Conservation.
   - Air, Water, and Soil Pollution: Industrial emissions in Bhilai, Korba, and Raigarh.
   - Solid and Hazardous Waste Management, Watershed Management, Climate Change adaptation.

## 3. Class XI Promotional Prerequisite
Under **`CGBSE_CLASS11_TO_CLASS12_DEPENDENCY`**:
- Class XI is an internal promotional stage evaluated by recognized schools under CGBSE norms.
- Successful completion of Class XI examinations and 75% attendance are statutory prerequisites for HSSC registration.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_CGBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-cg-c12-commerce",
        "subject_id": "cg-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "CGBSE Class 12 Higher Secondary School Certificate (HSSC) Commerce Stream Master Guide",
        "summary": "Authoritative syllabus guide for CGBSE Higher Secondary (HSSC) Commerce stream: 80 Theory + 20 Project evaluation structure, passing rule 26 in Theory + 7 in Project (33% combined), 15 minutes reading time, covering Accountancy, Business Studies, Business Economics, Business Mathematics, and Banking & Financial Services.",
        "content": """# CGBSE Higher Secondary (HSSC) Class 12 Commerce Stream Master Guide

## 1. Statutory Architecture & Examination Scheme
The CGBSE Commerce curriculum provides foundational competencies in accounting, finance, management, and commercial law:
- **Theory Examination:** 80 Marks (3 Hours duration, 15 minutes dedicated reading time).
- **Project Work / CCE:** 20 Marks (Project file, written test, viva voce).
- **Passing Standard:** Minimum 26 marks in Theory (33%) AND minimum 7 marks in Project (33%), totaling minimum 33 marks per subject.

## 2. Core Commerce Disciplines
1. **Accountancy (`chhattisgarh-c12-accountancy`):**
   - Accounting for Not-for-Profit Organisations (Receipts & Payments, Income & Expenditure, Balance Sheet).
   - Accounting for Partnership Firms: Fundamentals (Capital Accounts, P&L Appropriation), Goodwill Valuation, Change in Profit Sharing Ratio, Reconstitution (Admission, Retirement, Death of Partner), Dissolution of Partnership Firm.
   - Accounting for Companies: Issue, Forfeiture and Reissue of Shares, Issue and Redemption of Debentures.
   - Analysis of Financial Statements: Comparative Statements, Common-Size Statements, Accounting Ratios (Liquidity, Solvency, Turnover, Profitability), Cash Flow Statement (AS-3).

2. **Business Studies (`chhattisgarh-c12-business-studies`):**
   - Principles and Functions of Management: Nature and Significance of Management, Principles of Management (Henri Fayol & F.W. Taylor), Business Environment.
   - Management Functions: Planning, Organising, Staffing, Directing, Controlling.
   - Business Finance and Marketing: Financial Management (Capital Structure, Fixed and Working Capital), Financial Markets (Money Market, Capital Market, SEBI), Marketing Management (4Ps - Product, Price, Place, Promotion), Consumer Protection Act 2019.

3. **Business Economics (`chhattisgarh-c12-economics`):**
   - Introductory Microeconomics: Consumer Equilibrium, Demand, Production and Cost, Revenue, Supply, Market Structures.
   - Introductory Macroeconomics: National Income Accounting (GDP, GNP, NNP, National Income), Money and Banking (Functions of Commercial Banks, Credit Creation, Monetary Policy of RBI), Determination of Income and Employment (Aggregate Demand/Supply, Multiplier), Government Budget and the Economy, Balance of Payments.
   - Development Experience of Chhattisgarh: Industrial growth (Bhilai Steel Plant, Korba Energy Hub), Mineral wealth (Iron Ore at Bailadila, Bauxite, Coal), Agricultural economy.

4. **Business Mathematics (`chhattisgarh-c12-business-maths`):**
   - Commercial Arithmetic: Profit and Loss, Compound Interest, Annuities, Depreciation.
   - Mathematical Tools: Matrices and Determinants in business modeling, Linear Programming, Ratio and Proportion, Time Series Analysis, Index Numbers.

5. **Banking & Financial Services (`chhattisgarh-c12-banking`):**
   - Structure of Indian Banking System: Public, Private, Cooperative, and Regional Rural Banks.
   - Banking Operations: Negotiable Instruments (Cheques, Bills of Exchange, Promissory Notes), Digital Banking (NEFT, RTGS, IMPS, UPI, Mobile Banking), Credit Control Mechanisms of RBI, Risk Management.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_CGBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-cg-c12-humanities-agriculture",
        "subject_id": "cg-c12-agriculture-sciences",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "CGBSE Class 12 Higher Secondary कला संकाय एवं कृषि संकाय (Agriculture Stream) संपूर्ण मार्गदर्शिका",
        "summary": "Authoritative CGBSE HSSC blueprint for Humanities (Arts) and Agriculture Stream: History, Political Science, Geography, Sociology, Psychology, Home Science, and the signature Chhattisgarh Agriculture stream (फसल उत्पादन एवं उद्यान शास्त्र - Crop Production & Horticulture, पशुपालन एवं कुक्कुट पालन - Animal Husbandry & Poultry Farming), plus Hindi Core, English Core, and Sanskrit.",
        "content": """# छत्तीसगढ़ माध्यमिक शिक्षा मण्डल (CGBSE) १२वीं कला एवं कृषि संकाय मार्गदर्शिका

## १. कृषि संकाय की विशिष्टता (Chhattisgarh Agriculture Stream)
छत्तीसगढ़ को 'धान का कटोरा' (Rice Bowl of Central India) कहा जाता है। CGBSE का कृषि संकाय राज्य के कृषि विकास, मृदा संरक्षण, उद्यानिकी एवं पशुपालन को समर्पित एक प्रमुख संकाय है:
- **पूर्णांक:** ७० अंक सैद्धांतिक + ३० अंक प्रायोगिक परीक्षा (प्रयोग, क्षेत्रीय कार्य, मौखिक परीक्षा).
- **उत्तीर्णांक:** २३ अंक सैद्धांतिक में तथा १० अंक प्रायोगिक में (न्यूनतम ३३%).

### क. फसल उत्पादन एवं उद्यान शास्त्र (`chhattisgarh-c12-crop-production`):
- **छत्तीसगढ़ की मृदा संरचना:**
  - भाठा (लाल बलुई - बंजर/हल्की भूमि).
  - मटासी (पीली बलुई दोमट - धान की प्रमुख भूमि).
  - डोर्सा (मटासी व कन्हार का मिश्रण - दोमट).
  - कन्हार (गहरी काली भारी मिट्टी - रबी फसलों व धान हेतु सर्वोत्तम).
- **प्रमुख फसलें:** धान (विभिन्न किस्में - महामाया, राजेश्वरी, स्वर्णा), सोयाबीन, दलहन (चना, तिवड़ा, अरहर), तिलहन (सरसों, अलसी).
- **उद्यानिकी:** आम, अमरूद, पपीता, केला की बागवानी, सब्जी उत्पादन (टमाटर, बैंगन, गोभी), संरक्षित खेती (पॉलीहाउस व ग्रीनहाउस तकनीक).
- **सिंचाई एवं जलप्रबंधन:** ड्रिप व स्प्रिंकलर सिंचाई, महानदी, शिवनाथ व हसदेव कछार में जल प्रबंधन.
- **पादप संरक्षण:** कीट एवं व्याधि नियंत्रण, एकीकृत कीट प्रबंधन (IPM), जैविक खाद (वर्मीकम्पोस्ट, गोबर खाद) एवं जैव उर्वरक.

### ख. पशुपालन, दुग्ध प्रौद्योगिकी एवं कुक्कुट पालन (`chhattisgarh-c12-animal-husbandry`):
- **पशु प्रजनन व नस्लें:** गाय (साहीवाल, थारपारकर, गिर), भैंस (मुर्रा, भदावरी, जाफराबादी), बकरी (जमुनापारी, बरबरी).
- **पशु आहार:** संतुलित आहार, साइलेज एवं हे निर्माण, हरा चारा (बरसीम, लूसर्न, नेपियर घास).
- **दुग्ध प्रौद्योगिकी:** दुग्ध परीक्षण, वसा परीक्षण, पाश्चुरीकरण, दुग्ध उत्पाद (पनीर, खोया, मक्खन, घी, दही).
- **कुक्कुट पालन (Poultry Farming):** ब्रायलर एवं लेयर प्रबंधन, कड़कनाथ कुक्कुट पालन, टीकाकरण (रानीखेत, मेरेक्स).

## २. कला संकाय (Humanities Disciplines)
- **इतिहास (`chhattisgarh-c12-history`):** हड़प्पा सभ्यता, मौर्य एवं गुप्त साम्राज्य, भक्ति व सूफी परंपराएं, विजयनगर साम्राज्य, मुगल दरबार, १८५७ की क्रांति, महात्मा गांधी व राष्ट्रीय आंदोलन, संविधान निर्माण। छत्तीसगढ़ का इतिहास: कलचुरि शासन, मराठा काल, १८५७ में छत्तीसगढ़, जनजातीय विद्रोह (हलबा, तारापुर, मेरिया, परलकोट, भूमकाल)।
- **राजनीति विज्ञान (`chhattisgarh-c12-political-science`):** समकालीन विश्व राजनीति (शीतयुद्ध का अंत, समकालीन दक्षिण एशिया, अंतर्राष्ट्रीय संगठन), स्वतंत्र भारत में राजनीति (राष्ट्र निर्माण की चुनौतियाँ, नियोजित विकास, भारत के विदेश संबंध, लोकतांत्रिक व्यवस्था का संकट, क्षेत्रीय आकांक्षाएं)।
- **भूगोल (`chhattisgarh-c12-geography`):** मानव भूगोल के मूल सिद्धांत, भारत: लोग और अर्थव्यवस्था, छत्तीसगढ़ का भूगोल (भौतिक विभाजन, अपवाह तंत्र - महानदी, गोदावरी, नर्मदा, सोन; खनिज संसाधन - लौह अयस्क, कोयला, बॉक्साइट, चूना पत्थर; औद्योगिक विकास)।
- **समाजशास्त्र (`chhattisgarh-c12-sociology`):** भारतीय समाज की जनसांख्यिकीय संरचना, सामाजिक संस्थाएं (जाति, परिवार, विवाह), सामाजिक असमानता एवं बहिष्कार, सांस्कृतिक परिवर्तन, ग्रामीण एवं जनजातीय समाज की चुनौतियाँ।
- **मनोविज्ञान (`chhattisgarh-c12-psychology`):** मनोवैज्ञानिक गुणों में विभिन्नताएं, आत्म एवं व्यक्तित्व, जीवन की चुनौतियों का सामना, मनोवैज्ञानिक विकार, चिकित्सा उपागम, सामाजिक प्रभाव एवं समूह प्रक्रम।
- **गृह विज्ञान (`chhattisgarh-c12-home-science`):** मानव विकास एवं पारिवारिक संबंध, आहार एवं पोषण (पोषण संबंधी कमियां, आहार नियोजन), वस्त्र एवं परिधान (तंतु एवं निर्माण, वस्त्रों की देखभाल), संसाधन प्रबंधन (पारिवारिक आय, बजट, उपभोक्ता अधिकार)।

## ३. अनिवार्य एवं ऐच्छिक भाषाएँ (Languages)
- **हिन्दी विशिष्ट / कोर (`chhattisgarh-c12-hindi`):** आरोह भाग-२ (काव्य खंड - हरिवंश राय बच्चन, तुलसीदास, फिराक गोरखपुरी; गद्य खंड - महादेवी वर्मा, जैनेंद्र कुमार, धर्मवीर भारती), वितान भाग-२, अभिव्यक्ति और माध्यम (जनसंचार माध्यम, पत्रकारिता, आलेख, फीचर)।
- **अंग्रेजी कोर (`chhattisgarh-c12-english`):** Advanced Comprehension, Creative Writing Skills (Notice, Invitations, Article, Report, Letters), Flamingo (Prose & Poetry), Vistas (Supplementary Reader).
- **संस्कृत ऐच्छिक (`chhattisgarh-c12-sanskrit`):** शाश्वती भाग-२, व्याकरण, छंद, अलंकार, अपठित गद्यांश, अनुवाद कार्य।
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_CGBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_file = os.path.join(os.path.dirname(__file__), "cg_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"Compiled {len(NOTES)} Master Bundled Study Notes -> saved to {out_file}")

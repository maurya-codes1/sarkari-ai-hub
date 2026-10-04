import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling HBSE Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-hbse-c10-core",
        "subject_id": "hbse-c10-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "HBSE Class 10 Secondary (Matric) Core Disciplines Master Revision Guide",
        "summary": "Authoritative architectural blueprint covering Board of School Education Haryana (BSEH) Class 10 Secondary scheme of studies: 500 aggregate marks across prescribed core subjects (80 Theory + 20 Internal Assessment / 60 Th + 20 Pr + 20 IA for practicals), 33% passing threshold, 15 minutes dedicated question paper reading time, Class 9 school-level promotion dependency (BSEH_CLASS9_TO_CLASS10_DEPENDENCY), and comprehensive curriculum coverage of Mathematics, Science, Social Science, and Computer Science.",
        "content": """# HBSE Secondary Examination (Class 10 Matric) Master Revision Guide

## 1. Statutory Architecture & Examination Scheme
The **Board of School Education Haryana (BSEH / HBSE)** administers the annual **Secondary Examination (Class X)** under the statutory authority of the *Haryana Board of School Education Act, 1969 (Haryana Act No. 11 of 1969)*.

- **Headquarters:** Hansi Road, Bhiwani, Haryana - 127021.
- **Official Portal:** `https://bseh.org.in/`
- **Aggregate Marks:** 500 Marks across 5 prescribed core subjects.
- **Marks Distribution:**
  - Non-practical subjects: 80 Marks External Theory / Written Examination + 20 Marks Internal Assessment (IN) = 100 Marks.
  - Practical / Lab subjects (Science, Computer Science): 60 Marks External Theory + 20 Marks Practical Examination + 20 Marks Internal Assessment = 100 Marks.
- **Reading Time:** 15 minutes dedicated question paper reading and verification time provided prior to the 3-hour examination duration.
- **Writing Duration:** 3 Hours for theoretical examinations.
- **Qualifying Standard:** Minimum 33% marks in each individual subject (Theory + Practical + Internal Assessment combined) as well as 33% overall aggregate.
- **Academic Progression:** Promotion to Class 10 is contingent upon qualifying the Class 9 institutional examination with minimum 75% attendance (`BSEH_CLASS9_TO_CLASS10_DEPENDENCY`).

## 2. Core Curriculum & Subject Breakdown
1. **Mathematics (`hbse-c10-mathematics`):**
   - Number Systems: Fundamental Theorem of Arithmetic, irrationality proofs of $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$.
   - Algebra: Polynomials (zeroes and coefficients relationship), Linear Equations in Two Variables (Graphical, Substitution, Elimination), Quadratic Equations (Quadratic Formula, Discriminant $D = b^2 - 4ac$), Arithmetic Progressions ($a_n = a + (n-1)d$, $S_n = \\frac{n}{2}[2a + (n-1)d]$).
   - Coordinate Geometry: Distance formula, Section formula, Mid-point formula.
   - Geometry: Similar Triangles, Basic Proportionality Theorem (Thales' Theorem), Tangents to Circles.
   - Trigonometry: Trigonometric ratios at standard angles ($0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$), Trigonometric identities ($\\sin^2\\theta + \\cos^2\\theta = 1$), Heights and Distances (angles of elevation and depression).
   - Mensuration: Areas related to circles (sectors, segments), Surface Areas and Volumes of combined solids (cylinder, cone, sphere, hemisphere).
   - Statistics & Probability: Mean, Median, Mode of grouped data, Empirical relationship ($3\\text{ Median} = \\text{Mode} + 2\\text{ Mean}$), Classical probability.

2. **Science (`hbse-c10-science`):**
   - Chemical Reactions & Equations: Types of reactions (Combination, Decomposition, Displacement, Double Displacement, Redox).
   - Acids, Bases and Salts: pH scale, properties of indicators, chlor-alkali process, Bleaching Powder ($CaOCl_2$), Baking Soda ($NaHCO_3$), Washing Soda ($Na_2CO_3\\cdot 10H_2O$), Plaster of Paris ($CaSO_4\\cdot \\frac{1}{2}H_2O$).
   - Metals and Non-Metals: Physical & chemical properties, reactivity series, ionic bonding, metallurgy (roasting, calcination), corrosion prevention.
   - Carbon and its Compounds: Covalent bonding, tetravalency and catenation, homologous series, functional groups (alcohol, aldehyde, ketone, carboxylic acid), combustion, oxidation, addition, substitution, esterification, saponification.
   - Life Processes: Nutrition (autotrophic vs heterotrophic, photosynthesis steps), Respiration (aerobic vs anaerobic), Human Circulatory System (double circulation), Excretion (structure and function of nephron).
   - Control & Coordination: Nervous system, reflex arc, brain anatomy, plant hormones (Auxin, Gibberellin, Cytokinin, Abscisic Acid), human endocrine glands (Pituitary, Thyroid, Pancreas, Adrenal).
   - Reproduction & Heredity: Asexual reproduction methods (binary fission, budding, spore formation), human male and female reproductive systems, contraception, Mendel's laws (monohybrid $3:1$, dihybrid $9:3:3:1$).
   - Light: Reflection by spherical mirrors (mirror formula $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$), Refraction by lenses (lens formula $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$, power of lens $P = \\frac{1}{f}$).
   - Human Eye: Anatomy, defects (Myopia corrected by concave lens, Hypermetropia corrected by convex lens, Presbyopia), dispersion through glass prism, atmospheric refraction (twinkling of stars, advanced sunrise/delayed sunset), scattering (blue sky, reddish sun).
   - Electricity & Magnetism: Ohm's Law ($V = IR$), factors affecting resistance, series and parallel circuits, Joule's heating effect ($H = I^2Rt$), electric power ($P = VI$). Magnetic fields, Fleming's Left-Hand and Right-Hand rules, electromagnetic induction.

3. **Social Science (`hbse-c10-social-science`):**
   - History: Rise of Nationalism in Europe, Nationalism in India (Satyagraha, Jallianwala Bagh, Non-Cooperation, Civil Disobedience, participation of peasant and tribal communities), Industrial Revolution.
   - Geography: Resource planning, soil types of India (Alluvial soils of Indo-Gangetic plain, Black soils), Water Resources (Multipurpose river valley projects - Bhakra Nangal Dam, Western Yamuna Canal), Agriculture (Cropping seasons: Kharif, Rabi, Zaid; Wheat, Rice, Cotton, Sugarcane), Mineral and Energy resources, Manufacturing Industries (Automobiles in Gurugram, Textiles in Panipat, Engineering in Faridabad).
   - Political Science: Power sharing (Belgium and Sri Lanka models), Federalism (Division of powers: Union, State, Concurrent lists, Decentralization in India), Gender, Religion and Caste, Political Parties, Outcomes of Democracy.
   - Economics: Development indicators (Per Capita Income, HDI, Sustainable development), Sectors of Indian Economy (Primary, Secondary, Tertiary), Money and Credit (Formal vs informal credit, Role of RBI, Self-Help Groups), Globalization.

4. **Computer Science & IT (`hbse-c10-computer-science`):**
   - Fundamentals of IT, Operating Systems, Word Processing, Spreadsheets (Formulas, Functions, Charts), Database Management System (DBMS, Primary Key, Foreign Key), HTML Web Design, Python programming basics, Cyber Safety, and E-Governance in Haryana (Parivar Pehchan Patra, Saral Haryana portal).
"""
    },
    {
        "note_id": "note-hbse-c10-languages-heritage",
        "subject_id": "hbse-c10-haryana-heritage",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "HBSE Class 10 Languages, Literature & Haryana Cultural Heritage Handbook",
        "summary": "Comprehensive guide to BSEH Class 10 languages and Haryana cultural heritage: Hindi, English, Sanskrit, Punjabi (Gurmukhi), Urdu (Perso-Arabic), alongside Haryana ancient civilization (Rakhigarhi, Saraswati-Ghaggar basin), Mahabharata heritage at Kurukshetra, Panipat battlefields, 1857 freedom fighters (Rao Tula Ram, Raja Nahar Singh), Sir Chhotu Ram, folk theater (Saang, Ragini), sports capital ethos, and agricultural heritage.",
        "content": """# HBSE Class 10 भाषा, साहित्य एवं हरियाणा सांस्कृतिक धरोहर संदर्शिका

## १. हरियाणा की प्राचीन सभ्यता एवं पुरातात्विक गौरव
1. **सिंधु-सरस्वती सभ्यता के प्रमुख स्थल:**
   - **राखीगढ़ी (हिसार):** विश्व में हड़प्पा कालीन सभ्यता का सबसे बड़ा नगर एवं पुरातात्विक स्थल (350 हेक्टेयर से अधिक क्षेत्र)। यहाँ नगर नियोजन, जल निकासी, अन्नागार एवं डीएनए अध्ययनों से सिद्ध हुआ है कि भारतीय उपमहाद्वीप की मूल संस्कृति अत्यंत प्राचीन एवं स्वदेशी है।
   - **बनावली (फतेहाबाद):** प्राक्-हड़प्पा एवं उत्तर-हड़प्पा संस्कृति के अवशेष, मिट्टी का हल (खिलौना हल) एवं दुर्ग के प्रमाण।
   - **कुणाल एवं मिताथल (भिवानी):** कुणाल से प्राक्-हड़प्पा कालीन शाही मुकुट, सोने-चाँदी के आभूषण एवं मिताथल से तांबे की कुल्हाड़ी प्राप्त हुई है।
   - **सरस्वती नदी की महत्ता:** वेदों में पूजनीय सरस्वती नदी का प्रवाह क्षेत्र हरियाणा की भूमि से होकर गुजरता था। आदि बद्री (यमुनानगर) सरस्वती नदी का उद्गम स्थल माना जाता है।

2. **कुरुक्षेत्र एवं महाभारत का अमर संदेश:**
   - **ज्योतिसर:** कुरुक्षेत्र का वह पवित्र स्थल जहाँ भगवान श्रीकृष्ण ने अर्जुन को श्रीमद्भगवद्गीता का अमर उपदेश दिया (कर्मण्येवाधिकारस्ते मा फलेषु कदाचन)।
   - **ब्रह्मसरोवर एवं सान्निहित सरोवर:** सूर्यग्रहण के अवसर पर लाखों श्रद्धालुओं का स्नान स्थल, जहाँ ऋषियों एवं देवताओं का वास माना जाता है। गीता जयंती महोत्सव का अंतर्राष्ट्रीय आयोजन।

3. **पानीपत के तीन निर्णायक ऐतिहासिक युद्ध:**
   - **प्रथम युद्ध (1526):** बाबर और इब्राहिम लोदी के बीच; भारत में मुगल साम्राज्य की स्थापना।
   - **द्वितीय युद्ध (1556):** अकबर (बैरम खां) और हेमू (सम्राट हेमचंद्र विक्रमादित्य - रेवाड़ी के अंतिम हिंदू सम्राट) के बीच।
   - **तृतीय युद्ध (1761):** अहमद शाह दुर्रानी (अब्दाली) और मराठा सेनापति सदाशिवराव भाऊ के बीच; काला अंब स्मारक पानीपत में मराठा वीरों के बलिदान का प्रतीक।

## २. स्वतंत्रता संग्राम के अमर सेनानी एवं समाज सुधारक
1. **राव तुलाराम (1857 का संग्राम):**
   - अहीरवाल क्षेत्र (रेवाड़ी, नारनौल) में ब्रिटिश हुकूमत के विरुद्ध भीषण विद्रोह का नेतृत्व किया। नसीबपुर (नारनौल) के ऐतिहासिक युद्ध में अंग्रेजों को भारी क्षति पहुँचाई।
   - हरियाणा सरकार प्रतिवर्ष २३ सितम्बर को राव तुलाराम के शहादत दिवस को **'हरियाणा वीर एवं शहीद दिवस'** के रूप में मनाती है।
2. **राजा नाहर सिंह (वल्लभगढ़):** १८५७ के स्वतंत्रता संग्राम के महानायक जिन्होंने दिल्ली के कश्मीरी गेट पर अंग्रेजों का डटकर मुकाबला किया और वीरगति प्राप्त की।
3. **दीनबंधु चौधरी सर छोटू राम (1881-1945):**
   - किसानों, मजदूरों एवं वंचितों के मसीहा। रोहतक में जमींदार लीग की स्थापना की।
   - 'पंजाब रिलीफ ऑफ इंडेटेडनेस एक्ट, 1934' (ऋण मुक्ति अधिनियम) एवं 'साहूकार पंजीकरण अधिनियम' पारित करवाकर किसानों को साहूकारों के शोषण से मुक्ति दिलाई।
   - सतलुज नदी पर **भाखड़ा-नांगल बांध** के निर्माण की ऐतिहासिक योजना के मुख्य सूत्रधार।
4. **लाला लाजपत राय:** हिसार की धरती पर वकालत करते हुए आर्य समाज एवं स्वदेशी आंदोलन की नींव मजबूत की।

## ३. हरियाणा की खेल संस्कृति — भारत की खेल राजधानी
- **कुश्ती (दंगल एवं अखाड़ा परंपरा):** सुशील कुमार, योगेश्वर दत्त, साक्षी मलिक, फोगाट बहनें (गीता, बबीता, विनेश), बजरंग पूनिया।
- **मुक्केबाजी (बॉक्सिंग):** भिवानी को भारत का 'मिनी क्यूबा' कहा जाता है, जहाँ के भिवानी बॉक्सिंग क्लब (हवासिंह, जगदीश सिंह) से विजेंद्र सिंह (ओलंपिक पदक विजेता) निकले।
- **भाला फेंक (जैवलीन थ्रो):** पानीपत के खंडरा गांव के नीरज चोपड़ा — ओलंपिक स्वर्ण पदक एवं विश्व चैंपियनशिप विजेता।
- **कबड्डी:** हरियाणा स्टीलर्स एवं ग्रामीण दंगल।

## ४. लोक संस्कृति, लोकनाट्य एवं संगीत
- **सांग परंपरा:** हरियाणा का पारंपरिक लोकनाट्य खुला मंच। सांग के जनक किशन लाल भाट, 'हरियाणा के शेक्सपियर व कालिदास' कहे जाने वाले पंडित लखमी चंद, पंडित मांगे राम, बाजे भगत एवं धनपत सिंह।
- **रागिनी गायन:** वीर रस, ऐतिहासिक आख्यान एवं भक्ति परक गीतों की अनूठी शैली।
- **लोक नृत्य:** धमाल (महाभारत काल से प्रचलित वीर नृत्य), फाग (होली का उल्लास), झूमर (हरियाणवी गिद्दा), लूर (होली पर महिलाओं द्वारा), खोरिया एवं गुग्गा नृत्य।

## ५. भाषा एवं साहित्य संरचना
- **हिन्दी (`hbse-c10-hindi`):** क्षितिज भाग २ एवं कृतिका भाग २। सूरदास, तुलसीदास, जयशंकर प्रसाद, निराला, बालगोबिन भगत, नेताजी का चश्मा।
- **अंग्रेजी (`hbse-c10-english`):** First Flight & Footprints Without Feet.
- **संस्कृत (`hbse-c10-sanskrit`):** शेमुषी भाग २, सन्धि, समास, कारक-विभक्ति एवं सूक्तयः (देवनागरी लिपि)।
- **पंजाबी (`hbse-c10-punjabi`):** ਸਾਹਿਤ ਮਾਲਾ ਅਤੇ ਵੰਨਗੀ (ਗੁਰਮੁਖੀ ਲਿਪੀ) - ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ, ਸ਼ੇਖ਼ ਫ਼ਰੀਦ ਜੀ, ਭਾਈ ਵੀਰ ਸਿੰਘ, ਕੁਲਵੰਤ ਸਿੰਘ ਵਿਰਕ।
- **उर्दू (`hbse-c10-urdu`):** نواۓ اردو (فارسی-عربی رسم الخط) - سر سید، غالب، اقبال، پریم چند (میوات کا علاقائی تناظر).
"""
    },
    {
        "note_id": "note-hbse-c12-science",
        "subject_id": "hbse-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "HBSE Class 12 Senior Secondary Science Stream Master Revision Guide",
        "summary": "Exhaustive syllabus and examination blueprint for BSEH Class 12 Senior Secondary Science stream: Physics, Chemistry, Mathematics, Biology, Computer Science, and Haryana's signature Agriculture discipline. Includes 70 Theory + 30 Practical examination split, 23/70 theory passing standard, 10/30 practical passing standard, combined 33% threshold, 15 minutes dedicated reading time, and Class 11 promotion prerequisite (BSEH_CLASS11_TO_CLASS12_DEPENDENCY).",
        "content": """# HBSE Senior Secondary Science Stream (Class 12) Master Revision Guide

## 1. Statutory Examination Framework & Stream Regulations
Administered by the **Board of School Education Haryana (BSEH)** under the *Haryana Board of School Education Act, 1969*.

- **Course Duration:** Two-year continuous Senior Secondary program (Classes XI and XII).
- **Attendance Mandate:** Minimum 75% attendance across Classes XI and XII.
- **Academic Progression:** Direct promotion to Class 12 is governed by successful qualification of Class 11 institutional examination (`BSEH_CLASS11_TO_CLASS12_DEPENDENCY`).
- **Examination Scheme:**
  - Laboratory Science Subjects (Physics, Chemistry, Biology, Computer Science, Agriculture):
    - External Theory: 70 Marks (3 Hours duration, 15 min reading time). Qualifying marks: 23/70.
    - Practical Examination: 30 Marks (Lab experiment, viva-voce, practical notebook). Qualifying marks: 10/30.
    - Combined Aggregate: Minimum 33% overall.
  - Mathematics: 80 Marks Theory + 20 Marks Internal Assessment. Qualifying marks: 33/100 combined.

## 2. Subject Blueprints
1. **Physics (`hbse-c12-physics`):**
   - Electrostatics & Current Electricity: Coulomb's Law, Gauss Theorem, Capacitance, Ohm's Law, Kirchhoff's Rules, Potentiometer/Meter Bridge.
   - Magnetic Effects & Magnetism: Biot-Savart Law, Ampere's Law, Moving Coil Galvanometer, Diamagnetic/Paramagnetic/Ferromagnetic substances.
   - Electromagnetic Induction & AC: Faraday's laws, Lenz's Law, LCR series circuit resonance, Power factor, Transformer.
   - Optics: Wave optics (Huygens principle, Interference, Diffraction), Ray optics (Refraction through prism, Lens maker's formula, Microscopes, Telescopes).
   - Modern Physics: Photoelectric equation, Bohr's model of atom, Mass defect and binding energy, Semiconductor diodes (p-n junction, rectifiers, Zener diode).

2. **Chemistry (`hbse-c12-chemistry`):**
   - Physical Chemistry: Solutions (Raoult's law, Colligative properties, van't Hoff factor), Electrochemistry (Nernst equation, Kohlrausch law, Faraday's laws), Chemical Kinetics (Rate laws, integrated rate equations, Arrhenius equation).
   - Inorganic Chemistry: d- and f-Block Elements (Transition metals, Lanthanoid contraction, $K_2Cr_2O_7$, $KMnO_4$), Coordination Compounds (IUPAC nomenclature, Werner's theory, CFT, Isomerism).
   - Organic Chemistry: Haloalkanes & Haloarenes ($S_N1, S_N2$ mechanisms), Alcohols, Phenols & Ethers (Kolbe, Reimer-Tiemann, Williamson synthesis), Aldehydes, Ketones & Carboxylic Acids (Aldol condensation, Cannizzaro reaction), Amines (Gabriel phthalimide, Carbylamine reaction, Diazonium salts), Biomolecules (Carbohydrates, Proteins, Nucleic acids).

3. **Mathematics (`hbse-c12-mathematics`):**
   - Relations & Functions, Inverse Trigonometric Functions.
   - Matrices and Determinants: Matrix multiplication, Inverses, Cramer's rule / Matrix method.
   - Calculus: Continuity, Differentiability, Applications of Derivatives (Tangents, Normals, Maxima-Minima), Indefinite & Definite Integrals, Differential Equations.
   - Vectors and 3D Geometry: Dot/Cross products, Lines and Planes in space, Shortest distance between skew lines.
   - Linear Programming and Probability: Feasible region, Bayes' Theorem, Independent events.

4. **Biology (`hbse-c12-biology`):**
   - Reproduction: Sexual reproduction in angiosperms (Double fertilization), Human reproduction (Gametogenesis, Menstrual cycle, Embryogenesis).
   - Genetics & Evolution: Mendel's laws, Chromosomal theory, DNA structure, Replication, Transcription, Genetic code, Translation, Human Genome Project, Darwinism vs Mutation theory.
   - Biotechnology: Recombinant DNA technology, Restriction enzymes, pBR322 vector, PCR, Bt crops, Gene therapy.
   - Ecology: Population interactions, Ecosystem energy flow, Nutrient cycles, Biodiversity conservation.

5. **Computer Science (`hbse-c12-computer-science`):**
   - Python Advanced: Stacks using lists, File handling (Text, Binary, CSV).
   - Networking: Topologies, Devices, Protocols (TCP/IP, HTTP, FTP, DNS), Cyber security.
   - Database: SQL DDL/DML, Joins, Group By, Python-MySQL connectivity.

6. **Agriculture (`hbse-c12-agriculture` — Haryana Signature Discipline):**
   - Agronomy: Crop rotations (Paddy-Wheat, Cotton-Wheat), Dryland farming, Agronomic practices for Haryana.
   - Soil Science: Alluvial and saline-alkali soils, Soil reclamation techniques developed by CSSRI Karnal, Integrated Nutrient Management (INM).
   - Water Management: Western Yamuna Canal system, Bhakra canal network, Micro-irrigation (Drip & Sprinkler).
   - Animal Husbandry & Dairy: Murrah Buffalo management, feeding balanced rations, silage making, prevention of FMD and HS diseases, NDRI Karnal contributions.
"""
    },
    {
        "note_id": "note-hbse-c12-commerce",
        "subject_id": "hbse-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "HBSE Class 12 Senior Secondary Commerce Stream Master Revision Guide",
        "summary": "Comprehensive architectural guide for BSEH Class 12 Senior Secondary Commerce stream: Accountancy, Business Studies, Business Economics, Entrepreneurship, and Commercial Art. Detail includes 80 Theory + 20 Project/IA evaluation structure, 33% passing standards, 15 minutes dedicated reading time, corporate balance sheet Schedule III formats, and Haryana entrepreneurial and industrial hubs.",
        "content": """# HBSE Senior Secondary Commerce Stream (Class 12) Master Revision Guide

## 1. Statutory Examination Framework & Stream Regulations
Administered by the **Board of School Education Haryana (BSEH)** under the *Haryana Board of School Education Act, 1969*.

- **Eligibility:** Passed Class 11 Commerce stream with minimum 75% attendance.
- **Evaluation Split:**
  - Accountancy, Business Studies, Economics: 80 Marks External Theory + 20 Marks Project / Practical Work.
  - Entrepreneurship & Commercial Art: 70 Marks External Theory + 30 Marks Project / Practical Portfolio.
- **Duration:** 3 Hours Theory + 15 Minutes dedicated reading time.
- **Passing Standard:** 33% combined in Theory and Practical/Project.

## 2. Subject Breakdown
1. **Accountancy (`hbse-c12-accountancy`):**
   - Accounting for Partnership Firms: Partnership Deed, Profit & Loss Appropriation, Capital Accounts (Fixed vs Fluctuating), Past Adjustments, Guarantee of Profits.
   - Reconstitution of Partnership: Admission of a partner (Sacrificing ratio, Revaluation of assets/liabilities, Goodwill accounting as per AS-26), Retirement/Death of a partner (Gaining ratio, Settlement of loan account, Deceased partner's share of profits).
   - Dissolution of Partnership Firm: Realisation Account, Partner's Capital Account, Bank/Cash Account.
   - Accounting for Companies: Issue of shares at par and premium, Pro-rata allotment, Calls-in-arrears, Forfeiture of shares, Reissue of forfeited shares and transfer to Capital Reserve.
   - Issue and Redemption of Debentures: Debentures as collateral security, Writing off discount/loss on issue of debentures.
   - Financial Statement Analysis: Schedule III Balance Sheet and Statement of Profit and Loss of Companies, Common-size statements, Comparative statements.
   - Accounting Ratios: Liquidity (Current, Quick), Solvency (Debt-Equity, Total Assets to Debt), Activity (Inventory Turnover, Trade Receivables Turnover), Profitability (Gross Profit, Net Profit, Return on Investment).
   - Cash Flow Statement: Preparation as per AS-3 (Revised) under Operating, Investing, and Financing activities.

2. **Business Studies (`hbse-c12-business-studies`):**
   - Principles & Functions of Management: Fayol's 14 Principles, Taylor's Scientific Management, Planning Process, Organising Structures (Functional vs Divisional, Delegation, Decentralisation), Staffing (Recruitment, Selection, Training), Directing (Motivation, Leadership, Communication), Controlling Process.
   - Business Finance & Marketing: Financial Management (Capital budgeting, Capital structure, Working capital), Financial Markets (Money market instruments, Capital market, Stock exchange, SEBI functions), Marketing Mix (Product, Price, Place, Promotion), Consumer Protection Act 2019 (Three-tier consumer grievance redressal mechanism).

3. **Business Economics (`hbse-c12-economics-commerce`):**
   - Macroeconomics: National Income Aggregates ($GDP_{MP}, NNP_{FC}$), Circular Flow of Income, Money Creation by Commercial Banks, Central Bank (RBI) monetary controls (Repo, Reverse Repo, CRR, SLR), Aggregate Demand and Supply, Keynesian Multiplier ($k = \\frac{1}{1-MPC} = \\frac{1}{MPS}$), Government Budget (Fiscal Deficit, Revenue Deficit), Balance of Payments.
   - Indian Economic Development: Economic development experience since independence, Economic reforms of 1991 (LPG), Current challenges facing Indian and Haryana economy (Human capital, Employment, Rural infrastructure), Comparison of India, China, and Pakistan.

4. **Entrepreneurship (`hbse-c12-entrepreneurship`):**
   - Opportunity Sensing, Business Plan Development, Marketing Strategies, Break-Even Analysis ($BEP = \\frac{\\text{Fixed Cost}}{\\text{Contribution per Unit}}$), Resource Mobilization (Venture Capital, Angel Investors), Intellectual Property Rights, Start-up Haryana ecosystem in Gurugram, Faridabad, and Sonipat.

5. **Commercial Art (`hbse-c12-commercial-art`):**
   - Principles of Design and Commercial Graphics: Color theory, typography, layout designing, corporate identity (logos, trademarks), packaging design, advertising campaign production, digital tools (Photoshop, Illustrator), and traditional Haryana handicrafts in commercial applications.
"""
    },
    {
        "note_id": "note-hbse-c12-humanities-languages",
        "subject_id": "hbse-c12-history",
        "language_id": "hi",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "HBSE Class 12 Senior Secondary Humanities & Languages Master Revision Guide",
        "summary": "Master curriculum guide covering BSEH Class 12 Senior Secondary Humanities and Languages: History, Political Science, Geography, Public Administration (BSEH signature discipline), Sociology, Physical Education & Sports (Haryana sports capital discipline), Hindi Core, English Core, Punjabi Elective (Gurmukhi), and Sanskrit (Devanagari). Details 80/70 theory split, 15 min reading time, and 33% pass criteria.",
        "content": """# HBSE Senior Secondary Humanities & Languages (Class 12) Master Revision Guide

## १. परीक्षा योजना एवं संकाय नियम
**हरियाणा विद्यालय शिक्षा बोर्ड (BSEH)** द्वारा आयोजित सीनियर सेकेंडरी मानविकी एवं भाषा संकाय परीक्षा:
- **प्रवेश अर्हता:** कक्षा ११ मानविकी परीक्षा में उत्तीर्णता एवं न्यूनतम ७५% उपस्थिति।
- **अंक योजना:**
  - सैद्धांतिक विषय (इतिहास, राजनीति विज्ञान, लोक प्रशासन, समाजशास्त्र, हिन्दी, अंग्रेजी, पंजाबी, संस्कृत): ८० अंक लिखित बाह्य परीक्षा + २० अंक आंतरिक मूल्यांकन।
  - प्रायोगिक विषय (भूगोल, शारीरिक शिक्षा): ७० अंक लिखित परीक्षा + ३० अंक प्रायोगिक परीक्षा।
- **समय:** ३ घंटे की लिखित परीक्षा + १५ मिनट का समर्पित प्रश्न-पत्र पठन समय।
- **उत्तीर्णता मानक:** प्रत्येक विषय में न्यूनतम ३३% अंक अनिवार्य।

## २. प्रमुख मानविकी विषय एवं हरियाणा विशिष्ट पाठ्यक्रम
1. **इतिहास (`hbse-c12-history`):**
   - प्राचीन भारत: हड़प्पा सभ्यता (राखीगढ़ी, बनावली की खोजें), महाजनपद काल, मौर्य एवं गुप्त साम्राज्य, हरियाणा में यौधेय गणराज्य के सिक्के एवं अभिलेख।
   - मध्यकालीन भारत: भक्ति एवं सूफी परंपराएं (शेख चेहली मकबरा थानेसर), विजयनगर साम्राज्य, मुगल दरबारी इतिहास, आईन-ए-अकबरी।
   - आधुनिक भारत: उपनिवेशवाद एवं १८५७ का संग्राम (राव तुलाराम का अहीरवाल में नेतृत्व, नारनौल का युद्ध, राजा नाहर सिंह), महात्मा गांधी एवं राष्ट्रीय आंदोलन, संविधान सभा।

2. **राजनीति विज्ञान (`hbse-c12-political-science`):**
   - समकालीन विश्व राजनीति: शीत युद्ध का अंत, सोवियत संघ का विघटन, सत्ता के नए केंद्र (यूरोपीय संघ, आसियान, ब्रिक्स), संयुक्त राष्ट्र संघ, वैश्वीकरण।
   - स्वतंत्र भारत में राजनीति: राष्ट्र निर्माण की चुनौतियां (१९६६ में पंजाब से अलग होकर हरियाणा राज्य का गठन), नियोजित विकास की राजनीति, भारत के विदेश संबंध, आपातकाल १९७५, क्षेत्रीय दल एवं गठबंधन की राजनीति।

3. **भूगोल (`hbse-c12-geography`):**
   - मानव भूगोल के मूल सिद्धांत: जनसंख्या वितरण, घनत्व, मानव विकास सूचकांक, प्राथमिक, द्वितीयक एवं तृतीयक क्रियाएं।
   - भारत: लोग और अर्थव्यवस्था: भारत एवं हरियाणा में कृषि प्रतिरूप (हरित क्रांति के सकारात्मक एवं पर्यावरणीय प्रभाव), जल संसाधन (भाखड़ा एवं पश्चिमी यमुना नहर), खनिज, उद्योग (गुरुग्राम-मानेसर ऑटोमोबाइल बेल्ट) एवं परिवहन।

4. **लोक प्रशासन (`hbse-c12-public-administration` — हरियाणा का हस्ताक्षर विषय):**
   - लोक प्रशासन की प्रकृति, क्षेत्र एवं महत्व। पदसोपान, आदेश की एकता, नियंत्रण का विस्तार।
   - मुख्य कार्यपालिका: राष्ट्रपति, प्रधानमंत्री, मंत्रिमंडल सचिवालय एवं पीएमओ।
   - राज्य प्रशासन: राज्यपाल, मुख्यमंत्री, मुख्य सचिव, हरियाणा नागरिक सचिवालय (चंडीगढ़)।
   - जिला एवं स्थानीय प्रशासन: जिला उपायुक्त (डीसी) के प्रशासनिक व राजस्व अधिकार, पुलिस अधीक्षक (एसपी), एसडीएम।
   - पंचायती राज एवं नगर निकाय: ७३वां एवं ७४वां संविधान संशोधन, हरियाणा पंचायती राज अधिनियम १९९४, ई-दिशा एवं सरल हरियाणा नागरिक सेवाएं।

5. **समाजशास्त्र (`hbse-c12-sociology`):**
   - भारतीय समाज की संरचना: जनसांख्यिकी, ग्रामीण-नगरीय समाज, जाति, परिवार एवं नातेदारी।
   - सामाजिक परिवर्तन: औद्योगीकरण, नगरीकरण, संस्कृतिकरण, आधुनिकीकरण, सामाजिक आंदोलन (कृषक आंदोलन, महिला आंदोलन)।

6. **शारीरिक शिक्षा एवं खेल (`hbse-c12-physical-education` — हरियाणा खेल गौरव):**
   - खेल योजना: टूर्नामेंट फिक्स्चर (नॉक-आउट, लीग), खेल समितियां।
   - पोषण एवं जीवन शैली: बीएमआई, योग आसन, पैरालंपिक खेल।
   - कार्यिकी एवं बायोमैकेनिक्स: श्वसन व परिसंचरण तंत्र पर व्यायाम का प्रभाव, न्यूटन के नियम एवं खेल (नीरज चोपड़ा का भाला फेंक प्रक्षेप्य पथ विश्लेषण)।
   - खेल प्रशिक्षण एवं प्राथमिक उपचार (PRICE)।

## ३. भाषा एवं साहित्य पाठ्यक्रम
1. **हिन्दी कोर (`hbse-c12-hindi-core`):**
   - आरोह भाग २: हरिवंश राय बच्चन, कुंवर नारायण, निराला, तुलसीदास, फिराक गोरखपुरी; महादेवी वर्मा (भक्तिन), जैनेंद्र कुमार (बाजार दर्शन), धर्मवीर भारती (काले मेघा पानी दे), फणीश्वर नाथ रेणु (पहलवान की ढोलक), हजारी प्रसाद द्विवेदी।
   - वितान भाग २: सिल्वर वैडिंग (मनोहर श्याम जोशी), जूझ (आनंद यादव), अतीत में दबे पांव (ओम थानवी - सिंधु घाटी सभ्यता)।
   - अभिव्यक्ति और माध्यम: जनसंचार, पत्रकारीय लेखन।

2. **अंग्रेजी कोर (`hbse-c12-english-core`):**
   - Flamingo: The Last Lesson, Lost Spring, Deep Water, The Rattrap, Indigo, My Mother at Sixty-Six, Keeping Quiet, A Thing of Beauty.
   - Vistas: The Third Level, The Tiger King, Journey to the End of the Earth, The Enemy, On the Face of It.
   - Advanced Writing Skills: Notices, Invitations, Formal Letters, Job Applications, Articles, Reports.

3. **पंजाबी इलेक्टिव (`hbse-c12-punjabi`):**
   - ਗੁਰਮੁਖੀ ਲਿਪੀ: ਗੁਰਮਤਿ ਕਾਵਿ, ਸੂਫ਼ੀ ਕਾਵਿ (ਸ਼ੇਖ਼ ਫ਼ਰੀਦ, ਬੁੱਲ੍ਹੇ ਸ਼ਾਹ), ਕਿੱਸਾ ਕਾਵਿ (ਵਾਰਿਸ ਸ਼ਾਹ, ਪੀਲੂ), ਬੀਰ ਕਾਵਿ (ਚੰਡੀ ਦੀ ਵਾਰ), ਆਧੁਨਿਕ ਕਵਿਤਾ (ਭਾਈ ਵੀਰ ਸਿੰਘ, ਅੰਮ੍ਰਿਤਾ ਪ੍ਰੀਤਮ, ਸ਼ਿਵ ਕੁਮਾਰ ਬਟਾਲਵੀ), ਵਿਆਕਰਨ ਤੇ ਛੰਦ।

4. **संस्कृत साहित्य (`hbse-c12-sanskrit`):**
   - भास्वती भाग २: अनुशासनम्, मातुराज्ञा गरीयसी, प्रजानुरञ्जको नृपः, दौवारिकस्य निष्ठा, हल्दीघाटी। संस्कृत साहित्य का इतिहास (वेद, उपनिषद, कालिदास, बाणभट्ट), व्याकरण (सन्धि, समास, प्रत्यय, कारक-विभक्ति)।
"""
    }
]

out_file = os.path.join(os.path.dirname(__file__), "hbse_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"Successfully compiled {len(NOTES)} Master Bundled Notes -> saved to {out_file}")

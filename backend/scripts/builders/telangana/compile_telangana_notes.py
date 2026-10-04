import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling Telangana Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-tg-ssc-all-subjects",
        "subject_id": "telangana-ssc-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Telangana SSC (Class 10 Matric) All-Subjects Master Examination & Evaluation Guide",
        "summary": "Authoritative master guide covering Directorate of Government Examinations Telangana (BSE Telangana) and SCERT Telangana curriculum framework: 10 subjects (First Language Telugu & Urdu, Second Language Hindi, Third Language English, Mathematics, Physical Science, Biological Science, Social Studies, Telangana Heritage, IT), Continuous & Comprehensive Evaluation (CCE: 20 Formative Assessment + 80 Summative Board Exam), 10-Point GPA Scale (A1 to E, 35% minimum pass threshold with 28/80 in board exam), 15-minute dedicated reading time, Class 9 school promotion dependency (TELANGANA_CLASS9_TO_SSC_DEPENDENCY), and digital governance curriculum integration.",
        "content": """# Telangana Secondary School Certificate (SSC - Class 10) Master Examination Guide

## 1. Statutory Architecture & Examination Ecosystem
The **Secondary School Certificate (SSC)** examination in Telangana is conducted by the **Directorate of Government Examinations, Telangana (BSE Telangana)**, operating under the aegis of the **School Education Department, Government of Telangana**, with academic syllabi and textbook frameworks designed by the **State Council of Educational Research and Training (SCERT) Telangana**.

- **Apex Administrative Authority:** School Education Department, Government of Telangana (`https://schooledu.telangana.gov.in/`).
- **Academic & Curriculum Research Body:** SCERT Telangana, Opp. LB Stadium, Hyderabad (`https://scert.telangana.gov.in/`).
- **SSC Board Examination Conducting Authority:** Directorate of Government Examinations Telangana (BSE Telangana), Chapel Road, Nampally, Hyderabad (`https://bse.telangana.gov.in/`).
- **Official Results Portal:** Centre for Good Governance & Telangana Results Portal (`https://results.cgg.gov.in/`).
- **Open Schooling Wing:** Telangana Open School Society (TOSS), SCERT Campus, Hyderabad (`https://telanganaopenschool.org/`).

## 2. Examination Scheme & Structural Regulations
- **Prescribed Primary Subjects (10 Subjects):**
  1. First Language: Telugu (`telangana-ssc-first-language-telugu`) / Composite Course
  2. Second Language: Hindi (`telangana-ssc-second-language-hindi`)
  3. Third Language: English (`telangana-ssc-third-language-english`)
  4. Mathematics (`telangana-ssc-mathematics`)
  5. Physical Science (`telangana-ssc-physical-science`) - Physics & Chemistry
  6. Biological Science (`telangana-ssc-biological-science`) - Botany & Zoology
  7. Social Studies (`telangana-ssc-social-studies`) - Geography, History, Civics, Economics, Telangana Movement
  8. First Language Urdu (`telangana-ssc-first-language-urdu`) - Telangana Second Official Language
  9. Telangana History, Culture & Heritage (`telangana-ssc-telangana-heritage`)
  10. Information Technology & Digital Literacy (`telangana-ssc-information-technology`)

- **Marks Allocation & Assessment Pattern:**
  - **Formative Assessment (FA):** 20 Marks per subject (conducted across four school-level periodic assessments: Student work reflection, written works, project work, and slip tests).
  - **Summative Assessment / Board Examination (SA):** 80 Marks External Board Theory Examination.
  - **Total Marks per Subject:** 100 Marks.
  - **Science Bifurcation:** Physical Science (50 Marks) and Biological Science (50 Marks) administered with independent answer booklets, totaling 100 Marks for General Science.

- **Mandatory 15-Minute Dedicated Reading Time:**
  - All SSC examination papers incorporate a mandatory 15-minute question paper reading window prior to writing commencement.
  - Examination timing: 9:30 AM to 12:45 PM (3 hours writing + 15 minutes reading) for 80-mark theoretical papers; 9:30 AM to 11:45 AM (2 hours writing + 15 minutes reading) for 50-mark science papers.

- **10-Point GPA Grading System:**
  - Telangana BSE calculates performance on a 10-point Grade Point Average (GPA) system:
    - **A1 Grade (10 GP):** 91 – 100 Marks (Outstanding)
    - **A2 Grade (9 GP):** 81 – 90 Marks (Excellent)
    - **B1 Grade (8 GP):** 71 – 80 Marks (Very Good)
    - **B2 Grade (7 GP):** 61 – 70 Marks (Good)
    - **C1 Grade (6 GP):** 51 – 60 Marks (Above Average)
    - **C2 Grade (5 GP):** 41 – 50 Marks (Average)
    - **D1 Grade (4 GP):** 35 – 40 Marks (Pass Threshold)
    - **E Grade (0 GP):** Below 35 Marks (Failed / Need Improvement)
  - **Qualifying Standard:**
    - Minimum 35% in each subject (Summative Assessment + Formative Assessment combined).
    - In the Summative Assessment (Board Examination), candidates must secure a strict minimum of **28 Marks out of 80** to be declared passed.
    - Candidates securing Grade E must appear for the **SSC Advanced Supplementary Examination**.

- **Academic Progression Pre-requisite:**
  - Regular registration for the SSC Board Examination requires satisfactory completion of the school-level Class 9 Summative Assessment (SA-2) with minimum 75% attendance and valid student Child Info enrolment (`TELANGANA_CLASS9_TO_SSC_DEPENDENCY`).

## 3. High-Yield Subject Synopsis
- **First Language Telugu:** Classical poetry of Bammera Pothana (Danasheelamu - Bali Chakravarthi charity), Dr. Samala Sadasiva (Evari Bhasha Vallaku Vinasompu), Dasaradhi Krishnamacharyulu (Veera Telangana - "Na Telangana Koti Ratanala Veena"), Pakala Yasoda Reddy (Kottabata - Telangana rustic life), Sataka poetry (Sumati, Vemana, Dasaradhi), Bhagya Reddy Varma dalit emancipation, Sandhi and Samasa grammatical rules, and Chandassu (Utpalamala, Champakamala, Sardulamu, Mattebhamu).
- **Mathematics:** Real numbers (Euclid's division lemma, logarithms, irrationality proofs), Sets (Venn diagrams, union, intersection), Polynomials (zeroes and coefficients), Linear equations in two variables, Quadratic equations (quadratic formula, discriminant), Progressions (AP and GP), Coordinate geometry (distance, section formula, area of triangle), Similar triangles and tangents, Trigonometry (identities, heights and distances), Mensuration, and Statistics/Probability.
- **Physical Science:** Curved surface reflection and refraction (mirror formula, Snell's law, lens maker's formula), Human eye defects (Myopia, Hypermetropia), Electricity (Ohm's law, Kirchhoff's laws), Electromagnetism (Faraday's induction, Oersted effect), Quantum structure of atom ($n, l, m_l, m_s$, Aufbau, Hund), Modern periodic trends, Chemical bonding (VSEPR, hybridisation), Metallurgy (Froth floatation, smelting), and Carbon compounds.
- **Biological Science:** Autotrophic and heterotrophic nutrition, Aerobic vs anaerobic respiration, Heart anatomy, double circulation, Excretion in humans (nephron filtration and reabsorption), Nervous system and brain divisions, Endocrine homeostasis, Reproduction in flowering plants and humans, Mendelian genetics and sex determination, Ecological pyramids and biomagnification, Watershed conservation in Telangana.
- **Social Studies:** Physiographic relief features of India, Ideas of development and HDI, Production and employment sectors, Monsoons and river basins (Godavari and Krishna), Indian national freedom movement (Satyagraha, Quit India, Netaji), Making of Indian Constitution, and the Historic Movement for the Formation of Telangana State (Gentlemen's Agreement 1956, 1969 agitation, Prof. Jayashankar, Million March, Srikrishna Committee, AP Reorganisation Act 2014, Statehood June 2, 2014).
- **Telangana Heritage:** Antiquity of Pandavula Gutta rock art, Kotilingala coinage, Kakatiya dynasty architecture (Ramappa temple UNESCO site, Warangal fort), Qutb Shahi Golconda culture and Charminar (1591), Asaf Jahi modernization, Telangana Armed Struggle (1946–51, Doddi Komaraiah, Chakali Ilamma), Tribal heroes (Komaram Bheem, Ramji Gond), Performing arts (Oggu Katha, Perini Shivatandavam), Festivals (Bathukamma, Bonalu, Sammakka Saralamma Jatara), and Engineering water heritage (Kakatiya chain tanks, Mission Kakatiya, Kaleshwaram project).
- **Information Technology:** Computer hardware and operating systems, Document processing in LibreOffice Writer, Spreadsheets and formula calculation, Presentation design, Relational database concepts, HTML5 and responsive web design, Python scripting fundamentals, Cyber safety and IT Act 2000, Telangana digital initiatives (T-Fiber, T-Hub, MeeSeva).
"""
    },
    {
        "note_id": "note-tg-c12-science",
        "subject_id": "telangana-inter-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Telangana Intermediate (Class 12 / Plus Two) Science Stream Master Blueprint",
        "summary": "Comprehensive academic review for Telangana TSBIE Intermediate Science (MPC & BiPC Groups): Physics, Chemistry, Mathematics IIA, Mathematics IIB, Botany, and Zoology. Evaluation breakdown: 60 Marks Theory + 30 Marks Practical per lab subject; 75 Marks Theory for Mathematics; cumulative 1st Year + 2nd Year combined certification standard out of 1000 aggregate marks.",
        "content": """# Telangana Board of Intermediate Education (TSBIE) Science Stream Master Blueprint

## 1. Directorate of Intermediate Education Architecture
The **Telangana State Board of Intermediate Education (TSBIE)** (`https://tsbie.cgg.gov.in/`), headquartered at Vidya Bhavan, Nampally, Hyderabad, regulates and conducts the **Intermediate Public Examinations (IPE 1st Year & 2nd Year)** across Telangana.

- **Cumulative Evaluation Architecture:**
  - Intermediate qualification is based on the **cumulative score of both 1st Year (Junior Inter) and 2nd Year (Senior Inter)** examinations.
  - Overall aggregate for General Science groups (MPC & BiPC) is **1000 Marks**.
  - Progression from 1st Year to 2nd Year requires appearing in 1st Year board examinations and satisfying internal attendance and academic standards (`TELANGANA_INTER1_TO_INTER2_DEPENDENCY`).

- **Assessment Scheme for Science Disciplines:**
  - **Laboratory Subjects (Physics, Chemistry, Botany, Zoology):**
    - Theory Examination: 60 Marks (3 Hours duration + 15 minutes dedicated reading time).
    - Practical Board Examination: 30 Marks (conducted externally at the conclusion of 2nd Year).
    - Cumulative per subject across 2 years: 60 (Jr Theory) + 60 (Sr Theory) + 30 (Practical) = 150 Marks.
  - **Mathematics (Maths IIA & IIB for MPC):**
    - Written Theory Examination: 75 Marks each per year (3 Hours duration + 15 minutes reading time).
    - Total per year: 150 Marks (Maths A 75 + Maths B 75); Cumulative across 2 years: 300 Marks.
  - **Languages (English & Second Language):**
    - 100 Marks Theory per year each; Cumulative across 2 years: 200 Marks per language.
  - **Passing Criterion:**
    - Minimum 35% in each individual paper (21/60 in lab theory papers, 26/75 in mathematics papers, 35/100 in languages, and 11/30 in practical examinations).

## 2. Subject-by-Subject Academic Syllabi
1. **Physics (`telangana-inter-physics`):**
   - Waves: Transverse and longitudinal waves, Newton-Laplace formula, stationary waves in open and closed organ pipes, harmonics and overtones, beats, Doppler effect in sound.
   - Optics: Refraction at spherical surfaces, lens maker's formula, refraction and dispersion through prism, compound microscope, astronomical telescope, Huygens wave theory, Young's double slit interference, single slit diffraction, polaroids.
   - Electrostatics & Current: Coulomb's law, electric dipole torque, Gauss's theorem and derivations (infinite line charge, plane sheet, spherical shell), potential and capacitance, parallel plate capacitor, Ohm's law micro-form ($J = \\sigma E$), Kirchhoff's rules, Wheatstone bridge, meter bridge, potentiometer.
   - Magnetism & Induction: Biot-Savart law, Ampere's circuital law, solenoid, cyclotron, moving coil galvanometer conversion to ammeter/voltmeter, Faraday's laws of induction, Lenz's law, eddy currents, self and mutual inductance, AC circuit with LCR, resonance, transformers.
   - Modern Physics & Semiconductors: Photoelectric effect and Einstein's equation, Bohr atom model, hydrogen emission spectrum, nuclear binding energy curve, radioactive decay law, p-n junction diode under forward and reverse bias, half wave and full wave rectifiers, Zener diode, logic gates.

2. **Chemistry (`telangana-inter-chemistry`):**
   - Physical Chemistry: Solid state unit cell calculations, packing efficiency in SCC, BCC, FCC, defects in solids, Raoult's law, colligative properties (elevation of boiling point, depression of freezing point, osmotic pressure, van 't Hoff factor $i$), Nernst equation, Kohlrausch's law, Faraday's laws of electrolysis, chemical kinetics integrated rate equations (zero and first order), half-life period, Arrhenius equation, adsorption isotherms, colloids.
   - Inorganic Chemistry: p-Block elements (Group 15 ammonia manufacture via Haber process, nitric acid via Ostwald process, Group 16 sulfuric acid via Contact process, Group 17 halogens and interhalogen compounds, Group 18 noble gases), transition elements (electronic configurations, oxidation states, lanthanoid contraction), coordination compounds (Werner's coordination theory, IUPAC nomenclature, Valence Bond Theory, Crystal Field Theory, isomerism).
   - Organic Chemistry: $S_N1$ and $S_N2$ nucleophilic substitution mechanisms, Grignard reagents, preparation and acidity of phenols, Kolbe's reaction, Reimer-Tiemann reaction, Williamson ether synthesis, aldol condensation, Cannizzaro reaction, Hell-Volhard-Zelinsky (HVZ) reaction, carbylamine test for primary amines, diazotization, structures of glucose and fructose, amino acids and peptide bonds.

3. **Mathematics IIA (`telangana-inter-mathematics-a` — Algebra & Probability):**
   - Complex numbers: Modulus, amplitude, Cartesian and polar forms, triangle inequality.
   - De Moivre's theorem: Applications, nth roots of unity, cube roots of unity properties ($1 + \\omega + \\omega^2 = 0$).
   - Quadratic expressions and equations: Sign of quadratic expressions, extreme values, roots nature.
   - Theory of equations: Relation between roots and coefficients, symmetric functions of roots, transformations.
   - Permutations & Combinations: Permutations of alike objects, circular permutations, combinations with repetitions.
   - Binomial theorem: Binomial expansions for positive integral and rational indices, approximations.
   - Measures of dispersion & Probability: Mean deviation, standard deviation, variance, classical and axiomatic probability, addition and multiplication theorems, conditional probability, Bayes' theorem, random variables, Binomial and Poisson distributions.

4. **Mathematics IIB (`telangana-inter-mathematics-b` — Coordinate Geometry & Calculus):**
   - Circles & System of Circles: Standard and general forms, condition of tangency, chord of contact, pole and polar, conjugate points, radical axis of two circles, coaxial systems.
   - Conic Sections: Parabola standard equation ($y^2 = 4ax$), ellipse standard equation ($\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$), hyperbola, tangents, normals, focal properties.
   - Integration & Definite Integrals: Standard indefinite integration forms, substitution, parts, partial fractions, definite integrals fundamental theorem, properties of definite integrals, reduction formulae.
   - Areas: Area bounded by parabolas, ellipses, circles, and straight lines using definite integration.
   - Differential equations: Formation of differential equations, order and degree, variables separable, homogeneous equations, first-order linear differential equations (integrating factor method).

5. **Botany (`telangana-inter-botany` — TSBIE BiPC):**
   - Plant Physiology: Water potential, osmosis, transpiration pull, essential mineral elements, nitrogen cycle, photosynthesis light and dark reactions (Calvin cycle $C_3$, Hatch-Slack pathway $C_4$), cellular respiration (glycolysis, Krebs cycle, ETS, oxidative phosphorylation), phytohormones.
   - Genetics & Molecular Biology: Mendelian genetics, incomplete dominance, chromosomal theory of inheritance, DNA structure, replication, transcription, translation, genetic code, gene expression regulation (lac operon).
   - Biotechnology: Recombinant DNA technology, restriction endonucleases, vectors, PCR, agarose gel electrophoresis, transgenic plants (Bt cotton), tissue culture, microbes in human welfare.

6. **Zoology (`telangana-inter-zoology` — TSBIE BiPC):**
   - Human Anatomy & Physiology: Human digestive enzymes, breathing mechanism and respiratory volumes, cardiovascular system, cardiac cycle, double circulation, nephron anatomy and urine concentration counter-current multiplier, sliding filament theory of muscle contraction, human skeletal system, neural impulse transmission, endocrine regulation.
   - Human Reproduction & Evolution: Gametogenesis, menstrual cycle, fertilization, embryonic cleavage, contraceptive methods, IVF and assisted reproduction, sex-linked inheritance, Hardy-Weinberg equilibrium, human ancestry.
   - Applied Zoology & Health: Innate and acquired immunity, antibody structure, allergy, autoimmune diseases, cancer biology, HIV/AIDS, dairy management, poultry, sericulture, aquaculture in Telangana water bodies.
"""
    },
    {
        "note_id": "note-tg-c12-commerce",
        "subject_id": "telangana-inter-commerce",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Telangana Intermediate (Class 12 / Plus Two) Commerce Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Telangana TSBIE Intermediate Commerce (CEC & MEC Groups): Commerce & Business Organisation, Accountancy (Bills of Exchange, Consignment, Non-Trading, Partnership, Company Accounts), Economics (Telangana Economy, TS-iPASS, IT & Pharma Corridors, Rythu Bandhu), Civics, and Commercial Geography. Total aggregate standard: 1000 Marks cumulative across 1st and 2nd Years.",
        "content": """# Telangana Board of Intermediate Education (TSBIE) Commerce Stream Master Blueprint

## 1. Statutory Commerce Framework & Scheme of Studies
The Commerce curriculum under the **Telangana State Board of Intermediate Education (TSBIE)** provides a comprehensive foundation in business management, accounting standards, financial markets, regional economics, and commercial geography:

- **Core Stream Groups:**
  - **CEC Group:** Civics, Economics, Commerce & Accountancy (alongside General English & Second Language).
  - **MEC Group:** Mathematics (Maths IIA & IIB), Economics, Commerce & Accountancy (alongside General English & Second Language).
- **Evaluation Architecture:**
  - Commerce Theory: 100 Marks (50 Marks Commerce Theory + 50 Marks Accountancy Practicum per paper) / 100 Marks per subject per year.
  - Economics, Civics, Commercial Geography: 100 Marks Theory per paper per year (3 Hours duration + 15 minutes dedicated reading time).
  - Languages: 100 Marks each for English and Second Language.
  - Overall Cumulative Aggregate across Junior & Senior Inter: **1000 Marks**.
  - Minimum Qualifying Standard: 35% in each subject (35/100).

## 2. Core Discipline Syllabi
1. **Commerce & Business Organisation (`telangana-inter-commerce`):**
   - Financial Markets: Nature and functions of money market instruments (Treasury Bills, Commercial Paper, Certificates of Deposit, Call Money), capital market components (Primary Market and Secondary Market).
   - Stock Exchanges & SEBI: Functions of stock exchanges, trading and settlement mechanisms, Demat accounts, National Stock Exchange (NSE), Bombay Stock Exchange (BSE), regulatory powers of Securities and Exchange Board of India (SEBI).
   - Banking & E-Services: Commercial banking functions, credit creation, digital payment systems (NEFT, RTGS, IMPS, UPI), non-banking financial intermediaries.
   - Principles & Functions of Management: Henri Fayol's 14 administrative principles, F.W. Taylor's scientific management, planning processes, organisational structures (functional vs divisional), delegation and decentralisation, staffing sources, leadership styles, Maslow's need hierarchy, controlling techniques.
   - Marketing & Consumer Protection: Marketing Mix (Product, Price, Place, Promotion), physical distribution channels, Consumer Protection Act 2019, consumer rights and redressal machinery in Telangana (District Commissions, State Commission).
   - Entrepreneurship in Telangana: Role of entrepreneurship, TS-iPASS (Telangana State Industrial Project Approval and Self-Certification System) single window statutory clearance, T-Hub innovation engine and WE-Hub women entrepreneurship initiatives.

2. **Accountancy (`telangana-inter-accountancy`):**
   - Bills of Exchange: Definition, parties, promissory notes vs bills of exchange, accounting entries for endorsement, discounting with banks, dishonour of bills, renewal and insolvency of drawee.
   - Consignment Accounts: Differences between sale and consignment, proforma invoice, account sales, treatment of normal and abnormal losses, valuation of unsold consignment stock, consignor and consignee books.
   - Accounts of Non-Trading Organisations: Distinctions between Receipts and Payments Account and Income and Expenditure Account, treatment of capital and revenue items, subscription accounting, preparation of Income and Expenditure Account and Balance Sheet.
   - Partnership Accounts: Fixed and fluctuating capital accounts, Profit and Loss Appropriation Account, admission of a partner (sacrificing ratio, revaluation account, treatment of goodwill per AS 26), retirement and death of a partner (gaining ratio, settlement of retiring partner's dues, joint life policy), dissolution of partnership firm (realisation account, settlement of external debts and capital closure).
   - Company Accounts: Issue of equity shares at par, premium, and discount, pro-rata allotment in over-subscription, forfeiture of shares, reissue of forfeited shares, issue of debentures (as collateral security, terms of redemption).
   - Computerised Accounting Systems: Electronic spreadsheets in accounting, ledger posting and voucher entry in Tally / GNUKhata, generating automated Trial Balance and financial statements.

3. **Economics (`telangana-inter-economics` — Telangana Economy):**
   - Economic Growth & Development: Determinants of development, Human Development Index (HDI), demographic transition and demographic dividend in Telangana.
   - National & State Income: Concepts of GDP, GSDP (Gross State Domestic Product), Per Capita Income of Telangana compared with national averages, sectoral contributions (Agriculture, Industry, Services).
   - Telangana Agriculture & Rural Transformation: Cropping pattern, farm credit, agricultural marketing, Rythu Bandhu investment support scheme, Rythu Bima life insurance for farmers, Mission Kakatiya (chain-tank rejuvenation), Kaleshwaram Lift Irrigation Project infrastructure.
   - Industrial Sector & IT Revolution: Industrial policy resolutions, TS-iPASS single-window system attracting global investments, MSME sector support, pharmaceutical and vaccine manufacturing hub (Genome Valley, Hyderabad Pharma City), IT and ITES boom in Hyderabad (HITEC City, Financial District).
   - Infrastructure, Poverty & Welfare: Energy sector (24/7 agricultural power supply), transport networks, Aasara pensions, Kalyana Lakshmi/Shaadi Mubarak schemes, Haritha Haram environmental afforestation movement.

4. **Civics / Political Science (`telangana-inter-civics-commerce`):**
   - Constitutional Framework: Preamble, Fundamental Rights and Duties, Directive Principles of State Policy.
   - Union & State Governance: President, Prime Minister, Parliament, Supreme Court, Governor, Chief Minister, State Legislature, High Court of Telangana.
   - Local Self-Government: 73rd and 74th Amendments, Gram Panchayats, Mandal Praja Parishads, Zilla Praja Parishads, Municipalities and Greater Hyderabad Municipal Corporation (GHMC).
   - Transparency & Governance: Right to Information Act 2005, Anti-Corruption Bureau, Lokayukta, E-governance portals.

5. **Commercial Geography & Trade (`telangana-inter-commercial-geography`):**
   - World & National Commercial Geography: Spatial distribution of commercial crops, mineral resources, global transport networks (sea routes, canals), international trade blocs.
   - Telangana Commercial Geography: Singareni Collieries Company Limited (SCCL) coalfields, limestone and cement belts, granite mining in Karimnagar, industrial clusters in Medak and Rangareddy, dry ports and Inland Container Depots (ICDs) in Hyderabad, air cargo logistics at Rajiv Gandhi International Airport (RGIA).
"""
    },
    {
        "note_id": "note-tg-c12-humanities",
        "subject_id": "telangana-inter-history",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Telangana Intermediate (Class 12 / Plus Two) Humanities Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Telangana TSBIE Intermediate Humanities (HEC Group): History (Satavahanas, Kakatiyas, Qutb Shahis, Asaf Jahis, Telangana Armed Struggle 1946–51, Statehood Movement 1969–2014), Political Science (Indian Constitution, Telangana Governance, Mission Bhagiratha), Geography (Deccan Plateau, Godavari/Krishna Basins, Singareni SCCL), Sociology (Tribal Communities: Gonds, Chenchus, Lambadas), Public Administration (Secretariat, District Administration, Dharani Portal), and Logic & Psychology. Total aggregate standard: 1000 Marks cumulative across 1st and 2nd Years.",
        "content": """# Telangana Board of Intermediate Education (TSBIE) Humanities Stream Master Blueprint

## 1. Statutory Humanities Framework & Stream Architecture
The Humanities stream under the **Telangana State Board of Intermediate Education (TSBIE)** offers an in-depth immersion into the rich history, constitutional polity, regional geography, tribal anthropology, administrative systems, and philosophical thought of Telangana and India:

- **Core Stream Group:** HEC (History, Economics, Civics / Political Science) and allied humanities electives:
  1. History (`telangana-inter-history`)
  2. Political Science (`telangana-inter-political-science`)
  3. Geography (`telangana-inter-geography`)
  4. Sociology (`telangana-inter-sociology`)
  5. Public Administration (`telangana-inter-public-administration`)
  6. Logic & Psychology (`telangana-inter-logic-psychology`)
- **Assessment Scheme:**
  - Theory Examination: 100 Marks per subject per year (3 Hours duration + 15 minutes dedicated reading time).
  - Languages: 100 Marks each for English and Second Language (Telugu/Urdu/Hindi/Sanskrit).
  - Overall Cumulative Aggregate across Junior & Senior Inter: **1000 Marks**.
  - Minimum Qualifying Standard: 35% in each subject (35/100).

## 2. Core Humanities Disciplines Syllabi
1. **History (`telangana-inter-history` — Telangana History & Culture):**
   - Ancient Deccan Antiquity: Prehistoric sites (Pandavula Gutta), Kotilingala coinage, Satavahana dynasty (Simuka, Gautamiputra Satakarni, trade, Amaravati art), Ikshvakus, Vishnukundins.
   - Medieval Regional Dynasties: Chalukyas of Badami and Vemulawada, Rashtrakutas, Kalyani Chalukyas, literary and religious developments.
   - The Glorious Kakatiya Dynasty of Orugallu (Warangal):
     - Political History: Prola II, Rudradeva, Ganapatideva, Rani Rudrama Devi (heroic defense against Yadavas and Pandyas), Prataparudra II.
     - Architecture & Irrigation: Ramappa Temple at Palampet (UNESCO World Heritage Site, floating bricks, sculptural brilliance), Warangal Fort (Keerthi Thoranams), Thousand Pillar Temple at Hanamkonda, interconnected chain-tank irrigation networks (Pakhal, Ramappa, Laknavaram lakes).
   - Qutb Shahi Dynasty of Golconda:
     - Sultan Quli, Ibrahim Qutb Shah (Malkibharama), Muhammad Quli Qutb Shah (foundation of Hyderabad in 1591, construction of Charminar), Deccani miniature painting, communal amity and Telugu patronage under Abul Hasan Tana Shah (Bhakta Ramadasu).
   - Asaf Jahi Dynasty (Nizams of Hyderabad):
     - Nizam-ul-Mulk Asaf Jah I, Salar Jung I administrative reforms, modern infrastructure (railways, postal system, electricity), foundation of Osmania University (1918), High Court building, Salar Jung Museum, City Improvement Board (CIB).
   - Socio-Cultural Awakening:
     - Andhra Jana Sangham, Andhra Mahasabha conferences, Library Movement (Sri Krishna Devaraya Andhra Bhasha Nilayam 1901), Suravaram Pratapa Reddy (*Andhrula Sanghika Charitra*, Golakonda Patrika), Arya Samaj resistance.
   - Telangana Peasant Armed Struggle (1946–1951):
     - Resistance against feudal Jagirdari oppression, Vetti (forced labour), and Deshmukhs. Martyrdom of Doddi Komaraiah at Kadavendi, heroic struggle of Chakali Ilamma at Palakurthi, guerrilla squads, integration of Hyderabad State through Police Action (Operation Polo, September 17, 1948).
   - The Movement for Telangana Statehood:
     - Gentlemen's Agreement of 1956 and violation of safeguards, 1969 Jai Telangana Agitation (martyrdom of 369 students and youth), Mulki Rules, Six Point Formula, Telangana Joint Action Committee (TJAC), Million March, Srikrishna Committee, passage of Andhra Pradesh Reorganisation Act 2014, and official formation of Telangana State on June 2, 2014.

2. **Political Science (`telangana-inter-political-science`):**
   - Constitutional Democracy: Preamble, Fundamental Rights and Duties, Directive Principles, Indian Federalism, Union Executive and Parliament, Supreme Court.
   - Telangana State Government & Administration: Governor, Chief Minister, State Legislature (Sasana Sabha and Sasana Mandali), High Court of Telangana.
   - Grassroots Governance: 73rd and 74th Amendments, Gram Panchayats, Mandal Praja Parishads, Zilla Praja Parishads, Greater Hyderabad Municipal Corporation (GHMC).
   - Public Welfare Programs in Telangana: Mission Bhagiratha (piped drinking water to every household), Mission Kakatiya (tank restoration), Rythu Bandhu, Dalit Bandhu, Kalyana Lakshmi/Shaadi Mubarak, Rythu Bima.

3. **Geography (`telangana-inter-geography`):**
   - Physical Landscape of Telangana: Deccan Plateau topography, Eastern Ghats escarpments, Godavari River Basin (Manjira, Pranahita, Kadem tributaries) and Krishna River Basin (Tungabhadra, Musi, Dindi tributaries), Kaleshwaram Lift Irrigation Project.
   - Climate, Soils & Forests: Semi-arid climate, rainfall patterns, Red soils (Chalka, Dubba), Black cotton soils, Tropical dry deciduous forests, Amrabad and Kawal Tiger Reserves.
   - Minerals, Energy & Urban Geography: Singareni Collieries Company Limited (SCCL) coal reserves in Godavari valley, limestone belts, cement industries, Hyderabad metropolitan urban agglomeration, industrial corridors.

4. **Sociology (`telangana-inter-sociology`):**
   - Social Institutions & Stratification: Family structures, caste dynamics, Sanskritization, village community, Jajmani system transformation, agrarian relations.
   - Tribal Heritage of Telangana: Demography, culture, and social structure of Gonds (Raj Gonds of Adilabad, Gusadi dance, Komaram Bheem), Chenchus of Nallamala forests, Koyas of Khammam/Bhadradri (Sammakka Saralamma Jatara traditions), Lambadas/Banjara thandas, Agency area governance under the Fifth Schedule of the Constitution.
   - Social Movements & Change: Anti-arrack movement, Dalit assertions, backward classes empowerment, mass mobilizations for separate statehood, contemporary welfare safety nets.

5. **Public Administration (`telangana-inter-public-administration`):**
   - Principles & Theories: Scientific management, classical administrative principles, Weberian bureaucracy, human relations theory.
   - Administrative Architecture: Central and State Secretariats, Chief Secretary's office, Directorate systems, District administration, District Collector's powers, Police Commissionerates in Hyderabad, Cyberabad, and Rachakonda.
   - Digital Governance & Reforms: MeeSeva public services portal, Dharani integrated land records management system, Prajavani citizen grievance redressal, Right to Information Act 2005 implementation.

6. **Logic & Psychology (`telangana-inter-logic-psychology`):**
   - Logic: Categorical propositions, square of opposition, Aristotelian syllogistic figures and moods, symbolic logic, truth tables, inductive methods, scientific hypothesis.
   - Psychology: Biological bases of behaviour, neuron transmission, brain anatomy, sensory perception, learning theories (Pavlov, Skinner), memory models, theories of intelligence, personality assessment, stress management and mental well-being.
"""
    },
    {
        "note_id": "note-tg-c12-languages",
        "subject_id": "telangana-inter-telugu",
        "language_id": "te",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Telangana Intermediate (Class 12 / Plus Two) Languages Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Telangana TSBIE Intermediate Languages: Telugu Literature (Bammera Pothana, Palkuriki Somanatha, Dasaradhi, Kaloji, CiNaRe, Suravaram, Chandassu & Alankaras), Compulsory General English (TSBIE Reader discourse tasks), Hindi Literature, and Classical Urdu Literature (Deccani Urdu, Quli Qutb Shah, Wali Deccani, Makhdoom Mohiuddin, Telangana Ganga-Jamuni Tehzeeb). Total aggregate standard: 100 Marks per language paper.",
        "content": """# Telangana Board of Intermediate Education (TSBIE) Languages Stream Master Blueprint

## 1. Statutory Languages Framework & Scheme of Studies
The Languages curriculum under the **Telangana State Board of Intermediate Education (TSBIE)** encompasses:
- **Part I: Compulsory General English** (`telangana-inter-english`) taken across all streams (MPC, BiPC, CEC, MEC, HEC, Vocational).
- **Part II: Second Language Options** including Telugu Literature (`telangana-inter-telugu`), Hindi Literature (`telangana-inter-hindi`), and Classical Urdu Literature (`telangana-inter-urdu`).
- **Examination Pattern:** 100 Marks Theory Examination per language per year (3 Hours duration + 15 minutes dedicated reading time). Cumulative across Junior and Senior Inter: 200 Marks per language. Minimum qualifying standard: 35% in each paper.

## 2. Telugu Literature (`telangana-inter-telugu` — తెలంగాణ తెలుగు సాహిత్యం)
- **ప్రాచీన పద్యభాగం:**
  - **బమ్మెర పోతన:** బమ్మెర (వరంగల్/జనగామ) గ్రామవాసి. సహజ పండితుడు. శ్రీమదాంధ్ర భాగవతము (రుక్మిణీ కళ్యాణం, గజేంద్ర మోక్షం, ప్రహ్లాద చరిత్ర). భక్తి పారవశ్యం, శబ్దాలంకార వైభవం, భోగినీ దండకం, వీరభద్ర విజయం.
  - **పాల్కురికి సోమనాథుడు:** పాల్కురికి (జనగామ) ప్రాంతానికి చెందిన ప్రాచీన విప్లవ కవి. దేశి కవితా పితామహుడు. *బసవ పురాణం*, *పండితారాధ్య చరిత్ర*లను ద్విపద ఛందస్సులో స్వచ్ఛమైన దేశి తెలుగులో రచించాడు. వృషాధిప శతకం.
- **శతక సౌరభం:**
  - వేమన శతకం (ఆటవెలది ఛందస్సులో లోకనీతి, మూఢనమ్మకాల ఖండన).
  - బద్దెన సుమతీ శతకం (కంద పద్యాలలో సార్వకాలిక నీతులు).
  - కంచెర్ల గోపన్న (భక్త రామదాసు): దాశరథీ శతకం ("భద్రగిరి వాసా దాశరథీ కరుణాపయోనిధీ").
  - ధూర్జటి: శ్రీకాళహస్తీశ్వర శతకం.
- **ఆధునిక పద్యభాగం & తెలంగాణ వైతాళికులు:**
  - **దాశరథి కృష్ణమాచార్య:** తెలంగాణ సాయుధ పోరాట గళం. *అగ్నిధార*, *రుద్రవీణ*, *మహాంధ్రోదయం*. "నా తెలంగాణ కోటి రతనాల వీణ", "ఓ నిజాము పిశాచమా కానరాడు నిన్ను బోలిన రాజు నెచ్చరి చరిత్రన". ఆంధ్రప్రదేశ్ ఆస్థాన కవి.
  - **కాళోజీ నారాయణరావు:** ప్రజాకవి, పద్మవిభూషణ్. *నా గొడవ*. "పుట్టుక నీది చావు నీది బతుకంతా దేశానిది", "ఎవనివారేమి వీర తెలంగాణ నాది". తెలంగాణ భాషా దినోత్సవం (సెప్టెంబర్ 9) కాళోజీ జయంతి సందర్భంగా నిర్వహించబడుతుంది.
  - **డాక్టర్ సి. నారాయణరెడ్డి (సినారె):** జ్ఞానపీఠ పురస్కార గ్రహీత (1988) - *విశ్వంభర* కావ్యం (మానవ వికాస యాత్ర). *కర్పూర వసంతరాయలు*, *నాగార్జునసాగరం*, *ఋతుచక్రం*. ఆధునిక వచన కవితా వైతాళికుడు.
- **గద్య విభాగం & కథా సాహిత్యం:**
  - **సురవరం ప్రతాపరెడ్డి:** *ఆంధ్రుల సాంఘిక చరిత్ర* (కేంద్ర సాహిత్య అకాడమీ పురస్కారం పొందిన తొలి తెలుగు గ్రంథం). *గోలకొండ పత్రిక* సంపాదకత్వం, గోలకొండ కవుల సంచిక (1934).
  - **డాక్టర్ సామల సదాశివ:** *యాది*, *సంగీత శిఖరాలు*, *మలయమారుతాలు*. ఉర్దూ, పార్సీ, హిందీ, తెలుగు భాషల సమన్వయకర్త (కేంద్ర సాహిత్య అకాడమీ అవార్డు).
  - **వట్టికోట ఆళ్వారుస్వామి:** తెలంగాణ తొలి రాజకీయ నవలాకారుడు. *ప్రజల మనిషి*, *గంగు*, *జైలు లోపల* కథలు. దేశోద్ధారక గ్రంథమండలి స్థాపకుడు.
- **ఛందస్సు & అలంకారాలు:**
  - **వృత్తాలు:** ఉత్పలమాల, చంపకమాల, శార్దూలము, మత్తేభము (గణ విభజన, యతి, ప్రాస నియమాలు).
  - **జాతులు & ఉపజాతులు:** కందం, ద్విపద, తేటగీతి, ఆటవెలది, సీస పద్యం.
  - **శబ్దాలంకారాలు:** వృత్యానుప్రాస, ఛేకానుప్రాస, లాటానుప్రాస, అంత్యానుప్రాస.
  - **అర్ధాలంకారాలు:** ఉపమాలంకారం, రూపకాలంకారం, ఉత్ప్రేక్షాలంకారం, స్వభావోక్తి, అతిశయోక్తి.

## 3. General English (`telangana-inter-english` — Compulsory Part I)
- **Prescribed Prose & Poetry Texts:** Dancing in the Rain (Azim Premji), Opportunities for Youth (Jawaharlal Nehru), The Secret of the Machines (Rudyard Kipling), The Tables Turned (William Wordsworth), An Astrologer's Day (R.K. Narayan), The Ant and the Grasshopper (W. Somerset Maugham).
- **Communication & Study Skills:** Reading comprehension passages, Note making, Summarising, Curriculum Vitae (CV) and Resume drafting, Formal job application letters, Letters to the Editor, Dialogue writing, Group discussion protocols.
- **Applied Grammar & Syntax:** Concord (subject-verb agreement), Phrasal verbs, Idiomatic expressions, Active and passive voice, Direct and indirect speech, Correction of sentences (prepositions, articles, tenses, adjectives), Punctuation.

## 4. Hindi Literature (`telangana-inter-hindi` — द्वितीय भाषा हिन्दी)
- **प्राचीन एवं मध्यकालीन काव्य:** कबीरदास (साखी एवं सबद), सूरदास (भ्रमरगीत सार), तुलसीदास (रामचरितमानस चौपाई)।
- **आधुनिक पद्य धारा:** जयशंकर प्रसाद ('बीती विभावरी जाग री'), सूर्यकांत त्रिपाठी 'निराला' ('वह तोड़ती पत्थर'), रामधारी सिंह 'दिनकर' ('कलम या कि तलवार'), मैथिलीशरण गुप्त ('मनुष्यता')।
- **गद्य विधा:** मुंशी प्रेमचंद (कालजयी यथार्थवादी कथा शिल्प, 'पंच परमेश्वर', 'कफ़न'), आचार्य रामचंद्र शुक्ल ('उत्साह'), हजारी प्रसाद द्विवेदी ('शिरीष के फूल')।
- **व्यावहारिक व्याकरण ও कार्यालयी हिन्दी:** संधि, समास, उपसर्ग, प्रत्यय, वाक्य शुद्धि, पारिभाषिक प्रशासनिक शब्दावली, अनुवाद प्रविधि।

## 5. Classical Urdu Literature (`telangana-inter-urdu` — اردو ادب)
- **دکنی ادب اور تلنگانہ کی کلاسیکی روایت:**
  - **سلطان محمد قلی قطب شاہ:** اردو کے پہلے صاحبِ دیوان شاعر۔ جشنِ عید، فطرت، محبت اور تلنگانہ کے موسمی مناظر پر پر اثر کلام۔
  - **ولی دکنی (ولی اورنگ آبادی):** دکن کے عظیم غزل گو جنہوں نے دکنی سے شمالی ہند تک غزل کا چراغ روشن کیا۔
  - **کلاسیکی و جدید شعراء:** میر تقی میر، مرزا اسد اللہ خاں غالب، علامہ محمد اقبال، فیض احمد فیض، اور انقلابی حیدرآبادی شاعر **مخدوم محی الدین** (تلنگانہ کسان تحریک کے نغمہ ساز، 'سرِ وادیِ سینا')۔
- **نثری شاہکار:** سر سید احمد خان، مرزا فرحت اللہ بیگ، منشی پریم چند، سعادت حسن منٹو۔
- **قواعد، بلاغت اور گنگا جمنی تہذیب:** علمِ بیان (تشبیہ، استعارہ، کنایہ)، علمِ بدیع (صنائع لفظی و معنوی)، عروض و اوزان، اور تلنگانہ کی تاریخی گنگا جمنی تہذیب پر مضامین۔
"""
    }
]

out_file = os.path.join(os.path.dirname(__file__), "telangana_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(NOTES)} Master Bundled Study Notes -> saved to {out_file}")

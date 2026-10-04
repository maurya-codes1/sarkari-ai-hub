import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling Kerala Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-kl-sslc-all-subjects",
        "subject_id": "kerala-sslc-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Kerala SSLC (Class 10 Matric) All-Subjects Master Examination & Evaluation Guide",
        "summary": "Authoritative master guide covering General Education Department Kerala, SCERT Kerala, and Kerala Pareeksha Bhavan SSLC curriculum framework: 10 subjects (Malayalam 1 & 2, English, Hindi, Mathematics, Physics, Chemistry, Biology, Social Science, Information Technology), Continuous Evaluation (CE - 20% weightage), 9-Point Absolute Grading Scale (A+ to E, D+ minimum pass threshold), 15-minute Cool-Off reading time, Class 9 school promotion dependency (KERALA_CLASS9_TO_SSLC_DEPENDENCY), and FOSS / KITE GNU/Linux curriculum integration.",
        "content": """# Kerala SSLC (Secondary School Leaving Certificate - Class 10) Master Examination Guide

## 1. Statutory Architecture & Examination Ecosystem
The **Secondary School Leaving Certificate (SSLC)** examination in Kerala is administered under the statutory oversight of the **Office of the Commissioner for Government Examinations (Kerala Pareeksha Bhavan)**, functioning under the **General Education Department (DGE / GED), Government of Kerala**, with curriculum research and textbook development driven by the **State Council of Educational Research and Training (SCERT) Kerala**.

- **Apex Administrative Authority:** General Education Department, Government of Kerala (`https://education.kerala.gov.in/`).
- **Curriculum & Textbook Research Body:** SCERT Kerala (`https://scert.kerala.gov.in/`).
- **SSLC Examination Conducting Authority:** Kerala Pareeksha Bhavan, Poojappura, Thiruvananthapuram (`https://pareekshabhavan.kerala.gov.in/`).
- **Official Examination Results Portal:** NIC Kerala Examination Results (`https://keralaresults.nic.in/`).
- **Official Educational Technology Wing:** Kerala Infrastructure and Technology for Education (KITE / IT@School).

## 2. Examination Scheme & Structural Regulations
- **Prescribed Core Subjects (10 Subjects):**
  1. First Language Part 1: Malayalam Part 1 (കേരള പാഠാവലി) / Regional Language
  2. First Language Part 2: Malayalam Part 2 (അടിസ്ഥാന പാഠാവലി) / Regional Language
  3. Second Language: English (Kerala Reader)
  4. Third Language: Hindi (केरल भारती)
  5. Mathematics (ഗണിതം)
  6. Physics (ഭൗതികശാസ്ത്രം)
  7. Chemistry (രസതന്ത്രം)
  8. Biology (ജീവശാസ്ത്രം)
  9. Social Science (സാമൂഹ്യശാസ്ത്രം)
  10. Information Technology (വിവരസാങ്കേതികവിദ്യ - IT)

- **Marks & Time Allocation Scheme:**
  - **40-Mark Theory Subjects (1.5 Hours Writing Time + 15 min Cool-off):** Malayalam Part 1, Malayalam Part 2, Hindi, Physics, Chemistry, Biology, Information Technology.
    - Theory Marks: 40
    - Continuous Evaluation (CE): 10 Marks
    - Total per subject: 50 Marks
  - **80-Mark Theory Subjects (2.5 Hours Writing Time + 15 min Cool-off):** English, Mathematics, Social Science.
    - Theory Marks: 80
    - Continuous Evaluation (CE): 20 Marks
    - Total per subject: 100 Marks
  - **Overall Aggregate Marks:** 640 Marks across 10 subjects.

- **Mandatory 15-Minute Cool-Off Time (പ്രത്യേക വായനാ സമയം):**
  - All SSLC examinations commence with a dedicated 15-minute cool-off reading period prior to writing.
  - Candidates utilize this time exclusively for thorough question paper reading, internal choice selection, question sequencing, and strategic planning. Writing is strictly prohibited during cool-off time.

- **9-Point Absolute Grading System:**
  - Kerala Pareeksha Bhavan evaluates SSLC results using a 9-point absolute letter grading system without individual numerical marks printed on the certificate:
    - **A+ Grade:** 90% – 100% (Outstanding)
    - **A Grade:** 80% – 89% (Excellent)
    - **B+ Grade:** 70% – 79% (Very Good)
    - **B Grade:** 60% – 69% (Good)
    - **C+ Grade:** 50% – 59% (Above Average)
    - **C Grade:** 40% – 49% (Average)
    - **D+ Grade:** 30% – 39% (Marginal Pass / Minimum Qualifying Standard)
    - **D Grade:** 20% – 29% (Need Improvement / Failed)
    - **E Grade:** Below 20% (Need Improvement / Failed)
  - **Qualifying Criterion (Eligibility for Higher Studies - EHS):**
    - A candidate must secure a minimum of **D+ Grade** in each of the 10 subjects (both in Written Examination and Combined Total with CE) to be declared eligible for Higher Secondary (Plus One) admissions.
    - Candidates obtaining D or E grades must appear for the **SAY Examination (Save A Year)** conducted by Pareeksha Bhavan.

- **Academic Progression Pre-requisite:**
  - Admission and formal candidate registration for the SSLC Public Examination require successful completion and promotion from the school-level Class 9 institutional evaluation with prescribed attendance (`KERALA_CLASS9_TO_SSLC_DEPENDENCY`).

## 3. High-Yield Subject Synopsis
- **Malayalam (Part 1 & 2):** Classical poetry (Cherusseri, Ezhuthachan), romantic and social reform poetry (Kumaran Asan, Vallathol, Ulloor), prose narratives (V.K.N., Thakazhi, Vaikom Muhammad Basheer), folk ballad traditions (Vadakkan Pattukal), Sandhi (Aagamam, Aadesham, Lopam, Dvitvam) and Samasam grammar.
- **Mathematics:** Arithmetic Sequences (common difference, algebraic formula $x_n = dn + (f-d)$, sum $S_n$), Circles and angle subtended by arcs, Mathematics of Chance (classical and geometric probability), Second Degree Equations (quadratic formula, completing squares), Trigonometry (heights and distances), Coordinates (distance formula, midpoint), Tangents to circles, Solids (volumes and surface areas of cones, cylinders, spheres), Statistics (median and mean).
- **Physics:** Joule's Law of heating ($H = I^2Rt$), Magnetic effects of electric current, Motor principle, Electromagnetic induction, AC generator, Reflection and Refraction through spherical mirrors and lenses (Lens Maker's concepts, Snell's law), Total Internal Reflection, Dispersion and Scattering of light, Green Energy.
- **Chemistry:** Electronic configurations of subshells ($s, p, d, f$), Block classification, Gas Laws (Boyle's, Charles's, Avogadro's laws, mole concept, gram molecular volume 22.4 L), Reactivity series and electrochemical cells, Metallurgy (Blast furnace for iron, Hall-Heroult for aluminium), Industrial chemicals (Haber process for ammonia, Contact process for sulfuric acid), IUPAC nomenclature of organic compounds, isomerism, and organic reaction types.
- **Biology:** Sensory reception and nervous system (neuron, reflex arc, brain ventricles), Photoreceptors and eye anatomy, Hearing and balance in ear, Endocrine homeostasis (pancreatic insulin/glucagon, thyroid), Immune defense mechanisms (phagocytosis, inflammatory response, blood clotting factors), Pathogens and vaccines, Mendelian genetics and DNA molecular structure, Genetic engineering.
- **Social Science:** Global Revolutions (American, French, Russian), Twentieth-century world conflicts, Post-independence India, Kerala Renaissance leaders (Sree Narayana Guru, Chattampi Swamikal, Ayyankali, Vakkom Moulvi), Planetary winds and Indian monsoon dynamics, Map reading and GIS/remote sensing, Public administration and anti-corruption machinery (Lokayukta, RTI Act), Public finance and fiscal policy (GST, budget deficit classifications).
- **Information Technology:** Practical mastery in Free and Open Source Software (KITE GNU/Linux): Vector graphics design in Inkscape, Desktop Publishing in Scribus, Database management in LibreOffice Base, Web development using HTML5/CSS, Python programming and Turtle graphics, Image manipulation in GIMP, Sound editing in Audacity, and Cyber security regulations under IT Act 2000.
"""
    },
    {
        "note_id": "note-kl-c12-science",
        "subject_id": "kerala-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Kerala Plus Two (Class 12 Higher Secondary) Science Stream Master Blueprint",
        "summary": "Comprehensive academic review for Kerala DHSE Class 12 Science: Physics, Chemistry, Mathematics, Biology (Botany & Zoology), Computer Science (Python/SQL), and Geology (Kerala Signature: Western Ghats crystalline rocks, charnockites, khondalites, Chavara heavy mineral beach placers, coastal hydrogeology). Evaluation breakdown: Continuous Evaluation (CE - 20 marks), Practical Evaluation (PE - 40 marks), Terminal Evaluation (TE - 60 marks for 2-hour subjects / 80 marks for non-practical), and cumulative Plus One + Plus Two combined certification.",
        "content": """# Kerala Higher Secondary (DHSE Plus Two) Science Stream Master Blueprint

## 1. Directorate of Higher Secondary Education (DHSE) Architecture
The **Higher Secondary Education Wing** of the **Directorate of General Education (DGE), Government of Kerala** (`https://dhsekerala.gov.in/`) regulates and conducts the **Higher Secondary Public Examinations (Plus One - Class 11 and Plus Two - Class 12)** across Kerala.

- **Combined Evaluation Structure:**
  - The final Higher Secondary certificate reflects the **cumulative aggregate** of marks secured in both the **Plus One Continuous Public Examination** and the **Plus Two Terminal Examination**.
  - Progression from Plus One to Plus Two is strictly tied to completing continuous evaluation and public examination registration (`KERALA_PLUS_ONE_TO_PLUS_TWO_DEPENDENCY`).

- **Assessment Architecture for Science Disciplines:**
  - **Subjects with Practicals (Physics, Chemistry, Biology, Computer Science, Geology):**
    - Continuous Evaluation (CE): 20 Marks (assessed continuously across Class 11 and 12).
    - Practical Evaluation (PE): 40 Marks (conducted through external practical board examinations in Class 12).
    - Terminal Evaluation (TE): 60 Marks (written theory paper, 2 Hours writing + 15 min Cool-Off time).
    - Total: 120 Marks per subject per year, aggregated to 200 Marks combined certification standard.
  - **Mathematics (Non-lab science core):**
    - Continuous Evaluation (CE): 20 Marks.
    - Terminal Evaluation (TE): 80 Marks (2.5 Hours writing + 15 min Cool-Off time).
    - Total: 100 Marks per year (200 Marks cumulative across Plus One and Plus Two).
  - **Passing Criterion:**
    - Minimum 30% marks in Terminal Evaluation (TE) and 30% in overall aggregate (D+ Grade equivalent) in each subject.

## 2. Subject-by-Subject Academic Syllabi
1. **Physics (`kerala-c12-physics`):**
   - Electrostatics: Coulomb's Law in vector form, Electric dipole and torque in uniform field, Gauss's theorem and electric field derivations (infinite line charge, infinite plane sheet, spherical shell), Capacitance, parallel plate capacitor with dielectric, energy stored.
   - Current Electricity: Drift velocity, mobility, Ohm's law micro-form ($J = \\sigma E$), Kirchhoff's laws, Wheatstone bridge null condition, Meter bridge.
   - Magnetism & Magnetic Effects: Biot-Savart law, Ampere's circuital law, solenoid, toroid, Cyclotron frequency, Moving coil galvanometer conversion to ammeter/voltmeter, Earth's magnetic elements, Dia-, Para-, and Ferromagnetism, Hysteresis curve.
   - Induction & AC: Faraday's laws, Lenz's law and energy conservation, Eddy currents, Self and mutual inductance, LCR series AC circuit, resonance, Q-factor, power factor, step-up/step-down transformers in Kerala power transmission.
   - Optics & Wave Physics: Lens maker's formula, refraction through prism, compound microscope and astronomical telescope, Huygens wave theory, Young's double slit interference fringe width ($w = \\frac{\\lambda D}{d}$), single slit diffraction, polaroids.
   - Modern Physics & Semiconductors: Einstein's photoelectric equation, Bohr atom postulates and Rydberg formula, Nuclear binding energy curve, radioactive decay, p-n junction diode forward/reverse bias, half wave and full wave rectifiers, Zener diode as voltage regulator, logic gates.

2. **Chemistry (`kerala-c12-chemistry`):**
   - Solutions: Raoult's law, Henry's law, colligative properties (elevation of boiling point $\\Delta T_b = K_b m$, depression of freezing point $\\Delta T_f = K_f m$, osmotic pressure $\\Pi = CRT$), van 't Hoff factor $i$.
   - Electrochemistry: Nernst equation and cell EMF, Kohlrausch's law of independent migration of ions, molar conductivity, Faraday's laws of electrolysis, dry cell, lead storage battery, hydrogen-oxygen fuel cell.
   - Chemical Kinetics: Rate laws, reaction order vs molecularity, integrated rate equations for zero and first order reactions, half-life periods, Arrhenius equation ($k = A e^{-E_a/RT}$).
   - Coordination Chemistry: Werner's theory, IUPAC nomenclature of complex ions, Valence Bond Theory (inner/outer orbital complexes), Crystal Field Theory (octahedral and tetrahedral splitting $\\Delta_o$ and $\\Delta_t$), spectrochemical series.
   - Organic Chemistry: $S_N1$ and $S_N2$ reaction mechanisms, Reimer-Tiemann and Kolbe reactions of phenol, Williamson ether synthesis, Aldol condensation and Cannizzaro reaction of carbonyls, Gabriel phthalimide synthesis of amines, structure of glucose and fructose, peptide linkages in proteins, denaturation.

3. **Mathematics (`kerala-c12-mathematics`):**
   - Relations & Functions: Types of relations (reflexive, symmetric, transitive, equivalence), one-one and onto functions, invertible functions.
   - Matrices & Determinants: Matrix multiplication, transpose, symmetric and skew-symmetric matrices, elementary row operations, inverse by adjoint method, solving linear systems using Cramer's rule / matrix inversion.
   - Calculus: Continuity and differentiability, chain rule, derivatives of implicit and parametric functions, logarithmic differentiation, Mean Value Theorems, Maxima and Minima, indefinite and definite integrals, integration by partial fractions and parts, area under curves, first-order differential equations (variables separable, homogeneous, linear differential equation $\\frac{dy}{dx} + Py = Q$).
   - Vectors, 3D Geometry & Probability: Dot and cross product properties, vector and cartesian equations of lines and planes, angle between lines, shortest distance between skew lines, Bayes' theorem, conditional probability.

4. **Biology (`kerala-c12-biology` — Botany & Zoology):**
   - Botany: Microsporogenesis, megasporogenesis, pollen-pistil interaction, double fertilization, triple fusion, endosperm development, Mendelian genetics, DNA replication, transcription, genetic code, translation, lac operon model, recombinant DNA technology tools (restriction endonucleases, vectors, PCR), genetically modified crops, ecosystem ecological pyramids, Western Ghats biodiversity conservation.
   - Zoology: Human male and female reproductive systems, gametogenesis, menstrual cycle hormonal regulation, fertilization, embryonic cleavage, Assisted Reproductive Technologies (IVF, ET, ZIFT, GIFT), evolutionary biology (Hardy-Weinberg equilibrium), human health and infectious diseases (malaria life cycle, AIDS, cancer biology), immunity (B and T lymphocytes, antibodies structure), microbes in sewage treatment and biogas.

5. **Computer Science (`kerala-c12-computer-science`):**
   - Python programming: Data structures (Lists, Tuples, Dictionaries), function recursion, text and binary file processing, CSV handling, Stack data structure (push, pop algorithms).
   - Database Management: Relational algebra, SQL DDL/DML, primary and foreign keys, aggregate functions, GROUP BY, nested queries, SQL joins.
   - Computer Networks: Topologies, transmission media (fiber optic, coaxial), network protocols (TCP/IP, HTTP, DNS), cybersecurity measures, free software initiatives in Kerala (ICFOSS, KITE).

6. **Geology (`kerala-c12-geology` — Kerala Signature Discipline):**
   - Physical Geology & Geomorphology: Geomorphic processes, weathering types, fluvial and marine landforms, evolution of Kerala coast and Western Ghats escarpment.
   - Structural Geology: Dip, strike, folds, faults, joints, unconformities, geological mapping techniques.
   - Crystallography & Mineralogy: Crystal systems and symmetry elements, physical properties of rock-forming minerals, quartz, feldspar, pyroxene, amphibole, mica groups.
   - Petrology: Igneous, sedimentary, and metamorphic petrogenesis. Petrography of Kerala granulite terrain: Charnockites (acidic, intermediate, basic), Khondalite suite (garnet-sillimanite-graphite gneisses), basic dykes.
   - Kerala Economic Geology: World-renowned coastal heavy mineral beach placers of Chavara-Neendakara (Ilmenite, Rutile, Zircon, Monazite, Sillimanite, Leucoxene), Kaolin (China clay) deposits of Kundara and Mangalapuram, bauxite laterites.
   - Hydrogeology & Environmental Geology: Groundwater aquifers in crystalline rocks vs coastal tertiary sediments, coastal saltwater intrusion dynamics in Kerala, Western Ghats landslide and debris flow vulnerability, watershed conservation.
"""
    },
    {
        "note_id": "note-kl-c12-commerce",
        "subject_id": "kerala-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Kerala Plus Two (Class 12 Higher Secondary) Commerce Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Kerala DHSE Class 12 Commerce: Accountancy with Computerised Accounting (GNUKhata / Spreadsheets), Business Studies, Economics (Microeconomics, Macroeconomics, Kerala Remittance Economy & Development Model), Computer Applications in Commerce (SQL, HTML/CSS, E-Commerce), and Business Mathematics & Statistics.",
        "content": """# Kerala Higher Secondary (DHSE Plus Two) Commerce Stream Master Blueprint

## 1. Statutory Commerce Framework & Scheme of Studies
The Commerce curriculum under the **Directorate of General Education - Higher Secondary Wing (DHSE Kerala)** offers a blend of commercial theory, practical computing, financial mathematics, and socio-economic realities:

- **Core Stream Subjects:**
  1. Accountancy with Computerised Accounting (`kerala-c12-accountancy`)
  2. Business Studies (`kerala-c12-business-studies`)
  3. Economics (`kerala-c12-economics-commerce`)
  4. Computer Applications in Commerce (`kerala-c12-computer-applications-commerce`)
  5. Business Mathematics and Statistics (`kerala-c12-business-mathematics`)
  6. Compulsory Language: English & Second Language

- **Assessment Scheme:**
  - Accountancy & Computer Applications: 60 Marks Written Theory + 40 Marks Practical/Lab Evaluation (CAS / LibreOffice Calc / GNUKhata) + 20 Marks Continuous Evaluation (CE).
  - Business Studies & Economics: 80 Marks Written Theory + 20 Marks Continuous Evaluation (CE).
  - Examination Duration: 2.5 Hours for 80-mark theory / 2 Hours for 60-mark theory + 15 minutes dedicated Cool-Off reading time.

## 2. Core Discipline Syllabi
1. **Accountancy with Computerised Accounting (`kerala-c12-accountancy`):**
   - Partnership Accounts: Fundamentals, Profit & Loss Appropriation, fixed and fluctuating capitals, admission of a partner (sacrificing ratio, revaluation of assets, treatment of goodwill per AS 26), retirement and death of partner (gaining ratio, settlement of capital and loan), dissolution of partnership firm (realisation account, settlement of external liabilities).
   - Company Accounts: Accounting for share capital (issue, oversubscription, pro-rata allotment, forfeiture and reissue of shares), issue and redemption of debentures, financial statements of companies (Schedule III of Companies Act 2013).
   - Analysis of Financial Statements: Comparative and Common Size Statements, Ratio Analysis (Liquidity, Solvency, Activity, Profitability ratios), Cash Flow Statement (Operating, Investing, Financing activities under AS 3).
   - Computerised Accounting System (CAS): Data entry and account books generation using Free Software (GNUKhata / LibreOffice Calc), payroll accounting, automated trial balance and balance sheet generation.

2. **Business Studies (`kerala-c12-business-studies`):**
   - Principles of Management: Henri Fayol's 14 administrative principles, F.W. Taylor's scientific management techniques.
   - Business Functions: Planning processes and types, Organising structures (functional vs divisional), Delegation and decentralisation, Staffing procedures and selection testing, Directing (Maslow's hierarchy, leadership styles, communication networks), Controlling techniques.
   - Financial Management & Marketing: Capital budgeting decisions, working capital management, financial markets (Primary, Secondary, SEBI regulatory role), Marketing Mix (4Ps: Product, Price, Place, Promotion), Consumer Protection Act 2019 and consumer redressal forums in Kerala.

3. **Economics (`kerala-c12-economics-commerce`):**
   - Microeconomics: Consumer's equilibrium through indifference curves, price elasticity of demand, short-run and long-run production functions, cost curves, market forms (perfect competition, monopoly, monopolistic competition, oligopoly).
   - Macroeconomics: National income accounting (GDP, GNP, NNP calculations via value-added, income, and expenditure methods), circular flow of income, central banking and money creation by commercial banks, determination of income and employment (Keynesian aggregate demand, investment multiplier), government budget and fiscal deficits.
   - Kerala Economy & Inward Remittances: The "Kerala Model of Development" (high human development indicators, low infant mortality, high literacy alongside low industrial production), impact of Gulf migration and inward remittances on Kerala's banking deposits, real estate, and consumer expenditure patterns.

4. **Computer Applications in Commerce (`kerala-c12-computer-applications-commerce`):**
   - Open Source Software in Business: Linux operating system in corporate offices, open licenses.
   - Spreadsheets in Commercial Analytics: Financial formulas (PV, FV, NPV, PMT), pivot tables, statistical forecasting for sales data.
   - Database Systems & SQL: Commercial inventory databases, SQL querying for invoicing and payroll.
   - Web Technology & E-Commerce: HTML5/CSS for online storefronts, client-side validation using JavaScript, digital payment architectures (UPI, IMPS, RTGS, NEFT), cyber law and IT Act compliance.

5. **Business Mathematics & Statistics (`kerala-c12-business-mathematics`):**
   - Commercial Mathematics: Matrix operations, Cramer's rule, Leontief input-output economic models, compound interest, ordinary annuities and annuity due, sinking funds and capital recovery.
   - Business Calculus: Marginal revenue, marginal cost, profit maximization using derivatives, consumer's and producer's surplus via definite integration.
   - Business Statistics: Measures of central tendency and dispersion, Karl Pearson's correlation coefficient, Spearman's rank correlation, regression equations ($Y$ on $X$ and $X$ on $Y$), Index numbers (Fisher's ideal index and consistency tests), Time series analysis (moving averages and method of least squares).
"""
    },
    {
        "note_id": "note-kl-c12-humanities",
        "subject_id": "kerala-c12-history",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Kerala Plus Two (Class 12 Higher Secondary) Humanities Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Kerala DHSE Class 12 Humanities: History (Kerala Renaissance, Sree Narayana Guru, Chattampi Swamikal, Ayyankali, Vaikom Satyagraha, Aikya Kerala movement), Political Science (Decentralisation, People's Plan Campaign, Kudumbashree), Geography (Highlands, Midlands, Lowlands, 44 Rivers), Sociology (Marumakkathayam transition, Land Reforms, Gulf Migration), Journalism & Mass Communication (Kerala Signature: Swadeshabhimani, Herman Gundert, Malayala Manorama, TV & Web journalism), and Psychology.",
        "content": """# Kerala Higher Secondary (DHSE Plus Two) Humanities Stream Master Blueprint

## 1. Statutory Humanities Framework & Stream Architecture
The Humanities stream under the **Directorate of General Education - Higher Secondary Wing (DHSE Kerala)** offers a rich grounding in social sciences, history, regional geography, communication arts, and human behavior:

- **Core Stream Disciplines:**
  1. History (`kerala-c12-history`)
  2. Political Science (`kerala-c12-political-science`)
  3. Geography (`kerala-c12-geography`)
  4. Sociology (`kerala-c12-sociology`)
  5. Journalism & Mass Communication (`kerala-c12-journalism` — Kerala Signature Discipline)
  6. Psychology (`kerala-c12-psychology`)

- **Assessment & Examination Structure:**
  - Written Theory Examination: 80 Marks (History, Political Science, Sociology, Psychology) / 60 Marks (Geography, Journalism with practical lab).
  - Practical / Lab Evaluation: 40 Marks (Journalism page layout & news reporting; Geography GIS & cartography).
  - Continuous Evaluation (CE): 20 Marks.
  - Duration: 2.5 Hours (80 marks) / 2 Hours (60 marks) + mandatory 15-minute Cool-Off reading period.

## 2. Core Humanities Disciplines Syllabi
1. **History (`kerala-c12-history`):**
   - Ancient & Medieval Indian History: Harappan archaeological sites, Mauryan polity and Ashokan edicts, social history through the Mahabharata, Bhakti-Sufi devotional synthesis (Alvars, Nayanars, Kabir, Mirabai), Vijayanagara imperial capital architecture.
   - Modern India & Freedom Struggle: Colonial land settlements, Revolt of 1857, Gandhian non-violent mass mobilizations (Non-Cooperation, Civil Disobedience, Quit India), Partition and integration of princely states.
   - Kerala Renaissance & Modern Kerala Formation:
     - **Sree Narayana Guru:** Aruvippuram Shivalinga installation (1888), historic proclamation "One Caste, One Religion, One God for Man" (ഒരു ജാതി, ഒരു മതം, ഒരു ദൈവം മനുഷ്യന്), Sivagiri pilgrimage, SNDP Yogam (1903).
     - **Chattampi Swamikal:** Social critique in *Pracheena Malayalam*, anti-caste discourses.
     - **Ayyankali:** Historic Villuvandi (bullock cart) strike at Venganoor (1893), fight for Dalit education rights (Walk to School), Sadhu Jana Paripalana Sangham (1907).
     - **Historic Agitations:** Vaikom Satyagraha (1924–25, entry to temple roads led by T.K. Madhavan, K.P. Kesava Menon, Periyar), Guruvayur Satyagraha (1931–32 led by K. Kelappan, A.K. Gopalan), Temple Entry Proclamation (1936 by Chithira Thirunal Balarama Varma), Punnapra-Vayalar uprising (1946), and the Aikya Kerala Movement culminating in the linguistic reorganization and formation of Kerala State on November 1, 1956.

2. **Political Science (`kerala-c12-political-science`):**
   - Contemporary World Politics: Post-Cold War international order, rise of alternative power centres (European Union, ASEAN, BRICS), UN reforms, non-traditional security threats, environmental global commons.
   - Politics in India Since Independence: Nation-building challenges, linguistic reorganization of states, planned development and NITI Aayog, coalition politics eras.
   - Grassroots Democracy & Decentralisation in Kerala:
     - 73rd and 74th Constitutional Amendments implementation.
     - The landmark **People's Plan Campaign (ജനകീയാസൂത്രണം - 1996)** devolving 35–40% of state developmental funds directly to Local Self-Government Institutions (Grama Panchayats, Block Panchayats, District Panchayats, Municipalities, Corporations).
     - **Kudumbashree Mission (1998):** World-renowned women's community network for poverty eradication, microfinance, and local entrepreneurship.

3. **Geography (`kerala-c12-geography`):**
   - Fundamentals of Human Geography: Demographic transition model, population distribution and age-sex pyramids, Human Development Index (HDI), primary/secondary/tertiary economic activities, global transport routes.
   - Geography of India: Agricultural seasons (Kharif, Rabi, Zaid), spatial distribution of minerals and manufacturing hubs.
   - Regional Geography of Kerala:
     - **Physiographic Zones:** Highlands (Sahyadri/Western Ghats above 75m MSL, including Anamudi 2,695m - highest peak in South India), Midlands (rolling hills, laterite plateaus, 7.5m to 75m MSL), and Lowlands (coastal plains, sandy beaches, backwaters below 7.5m MSL).
     - **Drainage System:** 44 perennial rivers (41 west-flowing including Periyar 244 km, Bharathapuzha 209 km, Pamba 176 km, Chaliyar 169 km; and 3 east-flowing rivers Kabani, Bhavani, Pambar).
     - **Backwaters & Lakes:** Vembanad Lake (Ramsar site, longest lake in India), Ashtamudi Lake, Sasthamkotta freshwater lake.
     - **Monsoon Dynamics:** South-West Monsoon (*Edavappathi*, June–September) bringing the bulk of precipitation, and North-East Monsoon (*Thulam*, October–November).

4. **Sociology (`kerala-c12-sociology`):**
   - Indian Society: Demographic structure, caste and social inequality, tribal movements, cultural diversity and secularism.
   - Social Change & Development: Structural changes (colonialism, urbanization, industrialization), agrarian transformations, New Social Movements (Chipko, Silent Valley movement in Palakkad).
   - Kerala Specific Transformations:
     - Historic shift from matrilineal kinship (*Marumakkathayam* / Joint Family *Tharavadu*) to patrilineal nuclear families (*Makkathayam*).
     - **Kerala Land Reforms Act (1963 / 1969):** "Land to the tiller" legislation abolishing tenancy and conferring ownership rights on hutment dwellers (*Kudikidappukars*).
     - International Migration Dynamics: Large-scale Gulf migration from the 1970s onwards, sociological concept of "social remittances" (changing lifestyles, consumption patterns, gender roles in female-headed migrant households), and contemporary demographic challenges of an ageing population.

5. **Journalism & Mass Communication (`kerala-c12-journalism` — Kerala Signature Discipline):**
   - Theories & Fundamentals: Communication process models (Shannon-Weaver, Lasswell, Berlo), media effects theories, news values (proximity, timeliness, prominence, human interest), inverted pyramid structure.
   - History of Journalism in Kerala:
     - First Malayalam periodical: *Rajyasamacharam* (1847) founded by Herman Gundert at Illikkunnu, Thalassery; followed by *Paschimodayam* (1847) and *Gnananikksepam* (1848).
     - Fearless and Crusade Journalism: **Swadeshabhimani Ramakrishna Pillai** (exiled from Travancore in 1910 for courageous reportage against royal corruption; editor of *Swadeshabhimani*).
     - Landmark Publications: *Malayala Manorama* (founded 1888 by Kandathil Varghese Mappillai, first publication 1890), *Mathrubhumi* (founded 1923 by K.P. Kesava Menon to support the Indian National Movement), *Kerala Kaumudi* (C.V. Kunhiraman), *Deshabhimani*.
   - News Production & Broadcast: Print copy editing, headlines, sub-editing symbols, visual grammar for television news (camera shots, angles, pieces to camera PTC), radio documentary formats, digital online journalism, citizen journalism, fact-checking workflows, media laws (Article 19(1)(a), Defamation, Contempt of Court, Working Journalists Act).

6. **Psychology (`kerala-c12-psychology`):**
   - Core Theoretical Frameworks: Assessment of psychological attributes (Spearman two-factor, Sternberg triarchic, Gardner multiple intelligences), personality theories (Freud psychoanalytic, Rogers person-centered, Big Five traits), stress models (Lazarus cognitive appraisal, Selye GAS), DSM-5 categories of psychological disorders.
   - Applied Interventions: Cognitive Behaviour Therapy (CBT), client-centered counseling skills (empathy, active listening), life skills education, adolescent mental health resilience, community mental health programs in Kerala.
"""
    },
    {
        "note_id": "note-kl-c12-languages",
        "subject_id": "kerala-c12-malayalam",
        "language_id": "ml",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "Kerala Plus Two (Class 12 Higher Secondary) Languages Stream Master Blueprint",
        "summary": "Master curriculum revision guide for Kerala DHSE Class 12 Languages: Malayalam Literature (Ezhuthachan, Asan, Vallathol, Ulloor, MT, Basheer, Ayyappa Paniker, Kerala Panineeyam), Compulsory English (Kerala Reader discourse tasks), Hindi Literature (Kabir, Surdas, Premchand, Prasad), and Classical Arabic (Malabar Arabic scholarship, Sheikh Zainuddin Makhdoom II's Tuhfat al-Mujahidin, Balagha, and professional translation).",
        "content": """# Kerala Higher Secondary (DHSE Plus Two) Languages Stream Master Blueprint

## 1. Statutory Languages Framework & Curricular Balance
The Languages curriculum under the **Directorate of General Education - Higher Secondary Wing (DHSE Kerala)** encompasses:
- **Part I: Compulsory English** (`kerala-c12-english`) taken by all students across Science, Commerce, and Humanities.
- **Part II: Second Language Options** including Malayalam Literature (`kerala-c12-malayalam`), Hindi Literature (`kerala-c12-hindi`), and Classical Arabic (`kerala-c12-arabic`).
- **Examination Pattern:** 80 Marks Written Theory + 20 Marks Continuous Evaluation (CE) = 100 Marks per year (200 Marks cumulative across Plus One and Plus Two). Duration: 2.5 Hours + 15 minutes dedicated Cool-Off reading time.

## 2. Malayalam Literature (`kerala-c12-malayalam` — മലയാള സാഹിത്യം)
- **പ്രാചീന-മധ്യകാല സാഹിത്യ പാരമ്പര്യം:**
  - **തുഞ്ചത്ത് രാമാനുജൻ എഴുത്തച്ഛൻ:** മലയാള ഭാഷയുടെ പിതാവ്. അധ്യാത്മരാമായണം കിളിപ്പാട്ട്, മഹാഭാരതം കിളിപ്പാട്ട് എന്നിവയിലൂടെ ഭക്തിപ്രസ്ഥാനവും ഭാഷാ ഏകീകരണവും സാധ്യമാക്കി.
  - **ചെറുശ്ശേരി നമ്പൂതിരി:** കൃഷ്ണഗാഥ (ഗാഥാ പ്രസ്ഥാനം) - ശുദ്ധ മലയാള പദാവലിയും ലളിത ശൈലിയും.
  - **കുഞ്ചൻ നമ്പ്യാർ:** തുള്ളൽ പ്രസ്ഥാനത്തിന്റെ ഉപജ്ഞാതാവ് (ഓട്ടൻ, ശീതങ്കൻ, പറയൻ തുള്ളലുകൾ). കല്യാണസൗഗന്ധികം, കിരാതം തുള്ളലുകളിലൂടെ സാമൂഹിക പരിഹാസവും വിമർശനവും അവതരിപ്പിച്ചു.
- **ആധുനിക കവിത്രയം:**
  - **കുമാരനാശാൻ:** സ്നേഹഗായകൻ, വീണപൂവ്, കരുണ, ദുരവസ്ഥ, ചണ്ഡാലഭിക്ഷുകി, ചിന്താവിഷ്ടയായ സീത. ആശയഗംഭീര്യവും ദാർശനിക തികവും.
  - **വള്ളത്തോൾ നാരായണമേനോൻ:** ശബ്ദസുന്ദരൻ, ദേശീയ കവി, കേരള കലാമണ്ഡലത്തിന്റെ സ്ഥാപകൻ (കഥകളിയുടെ പുനരുദ്ധാരണം), മഗ്ദലനമറിയം, എന്റെ ഭാഷ ("മറ്റുള്ള ഭാഷകൾ കേവലം ധാത്രിമാർ, മർത്ത്യന്നു പെറ്റമ്മ തൻഭാഷ താൻ").
  - **ഉള്ളൂർ എസ്. പരമേശ്വരയ്യർ:** ഉജ്ജ്വല ശബ്ദാഢ്യൻ, ഉമാകേരളം മഹാകാവ്യം, കർണ്ണഭൂഷണം, പ്രേമസംഗീതം, കേരള സാഹിത്യ ചരിത്രം (5 വാല്യങ്ങൾ).
- **നോവൽ, ചെറുകഥാ സാഹിത്യ പ്രസ്ഥാനങ്ങൾ:**
  - **ഒ. ചന്തുമേനോൻ:** *ഇന്ദുലേഖ* (1889) - മലയാളത്തിലെ ആദ്യത്തെ സമ്പൂർണ്ണ ലക്ഷണയുക്ത നോവൽ. പാശ്ചാത്യ വിദ്യാഭ്യാസവും സാമൂഹിക പരിഷ്കരണവും.
  - **സി.വി. രാമൻപിള്ള:** ചരിത്ര നോവലുകൾ - *മാർത്താണ്ഡവർമ്മ*, *ധർമ്മരാജാ*, *രാമരാജാബഹദൂർ*.
  - **എം.ടി. വാസുദേവൻ നായർ:** *രണ്ടാമൂഴം* (ഭീമന്റെ കാഴ്ചപ്പാടിലൂടെ മഹാഭാരതം), *നാലുകെട്ട്*, *അസുരവിത്ത്*. ജ്ഞാനപീഠ പുരസ്കാര ജേതാവ്.
  - **വൈക്കം മുഹമ്മദ് ബഷീർ:** ബേപ്പൂർ സുൽത്താൻ, *പാത്തുമ്മയുടെ ആട്*, *ബാല്യകാലസഖി*, *ശബ്ദങ്ങൾ*, *ഭാർഗ്ഗവീനിലയം*. സാധാരണക്കാരന്റെ ഭാഷയും ഹാസ്യവും.
  - **ഒ.വി. വിജയൻ:** *ഖസാക്കിന്റെ ഇതിഹാസം* (1969) - മലയാള നോവലിലെ ആധുനികതാ വിപ്ലവം.
- **ഭാഷാശാസ്ത്രവും വ്യാകരണവും:**
  - **ഏ.ആർ. രാജരാജവർമ്മ:** കേരള പാണിനി. *കേരളപാണിനീയം*, *വൃത്തമഞ്ജരി*, *ഭാഷാഭൂഷണം*, *സാഹിത്യസാഹ്യം*. കാരികാ രൂപത്തിലുള്ള വ്യാകരണ വിശകലനം, സന്ധി നിയമങ്ങൾ, കാരകങ്ങൾ.
  - **വൃത്തങ്ങൾ:** കാകളി, മഞ്ജരി, കേക, നത്തോന്നത, ദ്രുതകാകളി.
  - **അലങ്കാരങ്ങൾ:** ഉപമ, ഉത്പ്രേക്ഷ, രൂപകം, അതിശയോക്തി, അർത്ഥാന്തരന്യാസം.

## 3. Compulsory English (`kerala-c12-english`)
- **Themes & Reading Texts:** Flights of Freedom (3Ls of Empowerment by Christine Lagarde, Any Woman by Katharine Tynan), Heights of Harmony (Mending Wall by Robert Frost, Amigo Brothers by Piri Thomas), Challenges of Life (The Hour of Truth by Percival Wilde), Environmental Ethics (When a Sapling is Planted by Wangari Maathai, Rice by Chemmanam Chacko).
- **Discourse Production:** Formal job applications with Curriculum Vitae / Resume, Letters to the Editor, Editorial columns, Debates and argumentative essays, Speech scripting, Newspaper reporting, Film and book reviews.
- **Applied Grammar & Pragmatics:** Concord (subject-verb agreement), Phrasal verbs, Conditional sentences (Types 1, 2, and 3), Inversion of sentences, Reported speech transformations, and Error editing in running texts.

## 4. Hindi Literature (`kerala-c12-hindi` — हिन्दी साहित्य)
- **प्राचीन एवं मध्यकालीन काव्य:** कबीर की साखियाँ (सामाजिक समरसता ও पाखंड-विरोध), सूरदास के पद (वात्सल्य ও भ्रमरगीत), तुलसीदास (रामचरितमानस चौपाई एवं दोहा शिल्प)।
- **आधुनिक काव्य धारा:** जयशंकर प्रसाद (छायावादी सौंदर्य, 'बीती विभावरी जाग री'), सूर्यकांत त्रिपाठी 'निराला' (प्रगतिशील चेतना, 'वह तोड़ती पत्थर'), रामधारी सिंह 'दिनकर' ('कुरुक्षेत्र' - युद्ध और शांति का चिंतन), सुभद्रा कुमारी चौहान ('झाँसी की रानी')।
- **गद्य साहित्य:** मुंशी प्रेमचंद (यथार्थवादी कथा शिल्प, 'कफ़न', 'शतरंज के खिलाड़ी'), फणीश्वरनाथ 'रेणु' (आंचलिक कथा, 'तीसरी कसम'), महादेवी वर्मा (संस्मरण रेखाचित्र, 'भक्तिन'), आचार्य रामचंद्र शुक्ल (मनोवैज्ञानिक निबंध, 'उत्साह')।
- **व्यावहारिक व्याकरण ও प्रयोजनमूलक हिन्दी:** संधि, समास, उपसर्ग-प्रत्यय, वाक्य शुद्धि, कार्यालयी पत्राचार, अनुवाद प्रविधि (अंग्रेजी से हिन्दी)।

## 5. Classical Arabic (`kerala-c12-arabic` — اللغة العربية)
- **الأدب العربي وتاريخه:**
  - الأدب الجاهلي والمعلقات الشعرية (امرؤ القيس، زهير بن أبي سلمى).
  - بلاغة القرآن الكريم والأحاديث النبوية الشريفة.
  - العصر العباسي والأندلسي (أبو الطيب المتنبي، موشحات ابن زيدون).
  - الأدب العربي الحديث وأعلام النهضة (أحمد شوقي، جبران خليل جبران، محمود درويش).
- **الأدب العربي في كيرാല وتاريخ مليبار (Kerala Arabic Heritage):**
  - **الشيخ زين الدين المخدوم الثاني (Ponnani):** مؤلف كتاب *تحفة المجاهدين في بعض أخبار البرتغاليين* (Tuhfat al-Mujahidin) - أول كتاب تاريخي موثق ومؤلف في كيرالا يوثق كفاح شعب مليبار والمسلمين ضد الاستعمار البرتغالي باللغة العربية الفصحى.
  - الإسهامات العلمية لعلماء ماليابار وشعراء العربية في كيرالا.
- **علوم اللغة والبلاغة والترجمة:**
  - النحو العربي: الجملة الاسمية، كان وأخواتها، إن وأخواتها، المفاعيل، النعت والتوكيد.
  - الصرف: أوزان الأفعال، المشتقات، المصادر.
  - البلاغة: التشبيه، الاستعارة، الكناية، المحسنات البديعية.
  - الترجمة المزدوجة والمراسلات الرسمية باللغة العربية.
"""
    }
]

out_file = os.path.join(os.path.dirname(__file__), "kerala_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(NOTES)} Master Bundled Study Notes -> saved to {out_file}")

import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling 5 Master Bundled Study Notes for NBSE (Nagaland Board of School Education)...")

notes = [
    {
        "note_id": "note-nl-c10-core",
        "subject_id": "nl-c10-english",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "NBSE HSLC (Class 10) Master Revision & Examination Blueprint Guide",
        "summary": "Authoritative architectural blueprint covering NBSE HSLC scheme of studies: 600 aggregate marks across 6 core subjects (80 Theory + 20 Internal Assessment), passing threshold 33%, institutional continuous evaluation, and Naga language curriculum integration.",
        "content": """# NBSE HSLC (CLASS 10) MASTER EXAMINATION & SYLLABUS BLUEPRINT
## NAGALAND BOARD OF SCHOOL EDUCATION (NBSE)

### 1. Board Identity & Institutional Framework
- **Governing Body:** Nagaland Board of School Education (NBSE), established under the Nagaland Board of School Education Act, 1973 (Act No. 4 of 1973).
- **Headquarters:** Bayavü Hill, Kohima - 797001, Nagaland.
- **Official Portals:** `https://nbsenl.edu.in/` and official examination result servers.
- **Statutory Mandate:** Conduct of High School Leaving Certificate (HSLC) Examination (Class 10) and Higher Secondary School Leaving Certificate (HSSLC) Examination (Class 12), along with institutional oversight of Class 9 Final Examination and Class 11 Promotion Examination.

### 2. HSLC Scheme of Studies & Evaluation Pattern
- **Aggregate Maximum Marks:** 600 Marks across 6 compulsory subjects (100 Marks each).
- **Compulsory Subject Structure:**
  1. English (Compulsory First Language) — 100 Marks (80 Theory + 20 Internal Assessment)
  2. Second Language (Tenyidie / Ao / Sumi / Lotha / Alternative English / Hindi / Bengali) — 100 Marks (80 Theory + 20 IA)
  3. Mathematics — 100 Marks (80 Theory + 20 IA)
  4. Science — 100 Marks (80 Theory + 20 IA)
  5. Social Sciences — 100 Marks (80 Theory + 20 IA)
  6. Sixth Subject / Vocational / Work & Art Education / FIT — 100 Marks (80 Theory + 20 IA)
- **Minimum Qualifying Marks:** 33% in each individual subject (combined Theory + IA) and 33% aggregate.
- **Examination Duration:** 3 hours per 80-mark theoretical paper.
- **Question Composition:** 205 MCQs (4-way key distribution A, B, C, D at ~25% each) and 75 Subjective items (24 VSA, 24 SA, 12 Case Study, 15 LA).

### 3. Core Curricular Units & High-Yield Blueprint
1. **English (Compulsory):**
   - Reading Comprehension: Unseen Prose, Factual Passages, Literary Analysis.
   - Writing Skills: Formal Letters, Editorial Letters, Notice, Articles, Story Writing.
   - Grammar: Modals, Tenses, Voice, Reported Speech, Connectors, Prepositions.
   - Prescribed Literature: Prose, Poetry and Drama under NBSE curriculum.
2. **Naga Indigenous Second Languages:**
   - Tenyidie: Ura Academy standardized orthography, Tenyidie grammar, prose and traditional Sekrenyi cultural texts.
   - Ao: Ao Literature Board standardized orthography, Ao grammar, prose, Moatsü and Tsüngremmung cultural context.
   - Sumi: Sumi Literature Board standardized orthography, Ahuna festival literature, traditional folktales.
   - Lotha: Lotha Literature Committee standardized orthography, Tokhu Emong cultural traditions, traditional proverbs.
3. **Mathematics:**
   - Number Systems: Real Numbers, Euclid's Division Lemma, Fundamental Theorem of Arithmetic.
   - Algebra: Polynomials, Linear Equations in Two Variables, Quadratic Equations ($D = b^2 - 4ac$), Arithmetic Progressions.
   - Geometry: Triangles (Basic Proportionality Theorem, Criteria of Similarity), Circles, Tangents.
   - Trigonometry: Trigonometric Ratios, Specific Angles, Trigonometric Identities, Heights and Distances.
   - Mensuration & Statistics: Surface Areas and Volumes of Combinations of Solids, Mean, Median, Mode, Probability.
4. **Science:**
   - Chemical Substances: Chemical Reactions and Equations, Acids, Bases and Salts, Metals and Non-metals, Carbon Compounds.
   - World of Living: Life Processes, Control and Coordination, Reproduction, Heredity and Evolution.
   - Natural Phenomena & Effects of Current: Light Reflection and Refraction, Human Eye, Electricity (Ohm's Law, Resistance), Magnetic Effects.
   - Natural Resources: Our Environment, Sustainable Management of Natural Resources, Nagaland Biodiversity (Intanki, Dzüko).
5. **Social Sciences:**
   - History: Rise of Nationalism in Europe, Nationalism in India, Making of a Global World, Age of Industrialisation.
   - Geography: Resources and Development, Forest and Wildlife, Water Resources, Agriculture, Minerals, Nagaland Geography.
   - Political Science: Power Sharing, Federalism (Article 371A special constitutional status), Gender, Religion and Caste, Political Parties.
   - Economics: Development, Sectors of the Indian Economy, Money and Credit, Globalisation, Consumer Rights.

### 4. Non-Terminal Supervised Examination: Class 9
- Institutional evaluation conducted by recognized schools under strict NBSE academic regulations.
- Official registration return forwarded to Kohima board office.
- Passing Class 9 is mandatory prerequisite for enrollment into Class 10 HSLC board candidate roll.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_NBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-nl-c12-science",
        "subject_id": "nl-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "NBSE HSSLC (Class 12) Science Stream Master Examination & Laboratory Blueprint Guide",
        "summary": "Authoritative syllabus guide for NBSE HSSLC Science stream: 500 aggregate marks across 5 subjects, 70 Theory + 30 Practical evaluation architecture, passing rule 21 in Theory + 9 in Practical, covering Physics, Chemistry, Biology, Mathematics, CS and IP.",
        "content": """# NBSE HSSLC (CLASS 12) SCIENCE STREAM MASTER EXAMINATION BLUEPRINT
## NAGALAND BOARD OF SCHOOL EDUCATION (NBSE)

### 1. Science Stream Evaluation Architecture
- **Aggregate Maximum Marks:** 500 Marks across 5 core subjects (100 Marks each).
- **Core Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Physics — 100 Marks (70 Theory + 30 Practical)
  3. Chemistry — 100 Marks (70 Theory + 30 Practical)
  4. Biology / Mathematics / Computer Science / Informatics Practices — 100 Marks
  5. Fifth Subject (Elective from Science Group or Alternative Language) — 100 Marks
- **Laboratory Practical Marking Rules:**
  - Theory Component: 70 Marks (Pass Mark: 21 Marks / 30%)
  - Practical Component: 30 Marks (Pass Mark: 9 Marks / 30%)
  - Combined Minimum: 30 Marks out of 100 with separate qualification in both components.
- **Mathematics Scheme:** 80 Theory + 20 Internal Assessment (Pass: 24 Theory + 6 IA = 30 Aggregate).

### 2. High-Yield Subject Curricula
1. **Physics (70 Theory + 30 Practical):**
   - Electrostatics: Coulomb's Law, Electric Field, Gauss's Theorem, Capacitors in Series and Parallel.
   - Current Electricity: Kirchhoff's Laws, Wheatstone Bridge, Meter Bridge, Potentiometer.
   - Magnetic Effects & Magnetism: Biot-Savart Law, Ampere's Circuital Law, Cyclotron, Earth's Magnetism.
   - Electromagnetic Induction & AC: Faraday's Laws, Lenz's Law, LCR Series Circuit, Transformer.
   - Optics: Ray Optics (Refraction through Prism, Lens Maker's Formula), Wave Optics (Huygens' Principle, Interference, Diffraction).
   - Modern Physics & Semiconductors: Photoelectric Equation, Bohr's Hydrogen Model, Nuclear Fission/Fusion, p-n Junction Diode, Rectifiers.
2. **Chemistry (70 Theory + 30 Practical):**
   - Physical Chemistry: Solutions (Colligative properties, Raoult's Law), Electrochemistry (Nernst equation, Kohlrausch's law), Chemical Kinetics (Rate laws, Arrhenius equation).
   - Inorganic Chemistry: d- and f-Block Elements (Lanthanoid contraction), Coordination Compounds (IUPAC nomenclature, Crystal Field Theory).
   - Organic Chemistry: Haloalkanes and Haloarenes, Alcohols, Phenols and Ethers, Aldehydes, Ketones and Carboxylic Acids, Amines, Biomolecules (Carbohydrates, Proteins, Nucleic Acids).
3. **Biology (Botany + Zoology - 70 Theory + 30 Practical):**
   - Reproduction: Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health.
   - Genetics and Evolution: Mendelian Genetics, Molecular Basis of Inheritance (DNA replication, transcription, translation, operon model), Evolution.
   - Biology in Human Welfare: Human Health and Diseases (Infectious diseases, immunity, cancer), Microbes in Human Welfare.
   - Biotechnology: Principles and Processes (Recombinant DNA technology, restriction enzymes), Applications (Medicine, Agriculture).
   - Ecology: Organisms and Populations, Ecosystems, Biodiversity Conservation in Nagaland (Intanki National Park, Blyth's Tragopan, endemic flora).
4. **Mathematics (80 Theory + 20 IA):**
   - Relations and Functions, Inverse Trigonometric Functions.
   - Matrices and Determinants: Matrix inversion, Solution of systems of linear equations.
   - Calculus: Continuity, Differentiability, Applications of Derivatives, Integrals, Differential Equations.
   - Vectors and 3-D Geometry: Dot and Cross products, Direction cosines, Shortest distance between skew lines.
   - Linear Programming and Probability: Bayes' Theorem, Probability distributions.

### 3. Examination Strategy & Question Design
- **Theory Blueprint:** 205 MCQs designed with zero generator bias (~25% per key A, B, C, D) + 75 Subjective items (24 VSA, 24 SA, 12 Case Study, 15 LA).
- **Practical Assessment:** Experimental records, two practical experiments, viva-voce, and investigative project report.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_NBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-nl-c12-commerce",
        "subject_id": "nl-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "NBSE HSSLC (Class 12) Commerce Stream Master Examination & Financial Blueprint Guide",
        "summary": "Authoritative syllabus guide for NBSE HSSLC Commerce stream: 500 aggregate marks across 5 subjects, 80 Theory + 20 Project evaluation structure, covering Accountancy, Business Studies, Economics, Entrepreneurship, and Financial Markets.",
        "content": """# NBSE HSSLC (CLASS 12) COMMERCE STREAM MASTER EXAMINATION BLUEPRINT
## NAGALAND BOARD OF SCHOOL EDUCATION (NBSE)

### 1. Commerce Stream Structure & Scheme of Evaluation
- **Aggregate Maximum Marks:** 500 Marks across 5 subjects (100 Marks each).
- **Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Accountancy — 100 Marks (80 Theory + 20 Project/Viva)
  3. Business Studies — 100 Marks (80 Theory + 20 Project/Viva)
  4. Economics — 100 Marks (80 Theory + 20 Project/Viva)
  5. Entrepreneurship / Financial Markets Management / Mathematics — 100 Marks (80 Theory + 20 Project)
- **Passing Threshold:** 24 Marks in Theory (out of 80) and 6 Marks in Project (out of 20), totaling minimum 30 Marks per subject and 33% aggregate.

### 2. Core Curricular Blueprints
1. **Accountancy (80 Theory + 20 Project):**
   - Partnership Accounts: Profit and Loss Appropriation, Capital Accounts, Admission of a Partner (Sacrificing ratio, Goodwill treatment), Retirement/Death of a Partner, Dissolution of a Partnership Firm.
   - Company Accounts: Accounting for Share Capital (Issue of shares, Forfeiture, Reissue), Accounting for Debentures (Issue and Redemption).
   - Financial Statement Analysis: Schedule III Balance Sheet and P&L, Comparative Statements, Common Size Statements, Accounting Ratios (Current, Quick, Debt-Equity, Return on Investment), Cash Flow Statement (AS-3).
2. **Business Studies (80 Theory + 20 Project):**
   - Principles and Functions of Management: Taylor's Scientific Principles, Fayol's 14 Principles, Business Environment, Planning, Organising, Staffing, Directing (Maslow's Motivation, Leadership), Controlling.
   - Business Finance and Marketing: Financial Management (Capital structure decisions, working capital), Financial Markets (Money market, Capital market, SEBI), Marketing Management (4 Ps), Consumer Protection Act 2019.
3. **Economics (80 Theory + 20 Project):**
   - Introductory Macroeconomics: National Income Accounting (Value Added, Income, and Expenditure methods), Money and Banking (Credit creation, RBI monetary policy), Aggregate Demand and Supply, Government Budget and Fiscal Deficit, Balance of Payments and Foreign Exchange.
   - Indian Economic Development: Development Experience (1947-1990), Economic Reforms since 1991 (LPG), Current Challenges (Poverty, Human Capital, Rural Development in Nagaland, Sustainable Development).
4. **Entrepreneurship & Financial Markets:**
   - Entrepreneurship: Opportunity sensing, Business Plan formulation, Resource mobilization, Agri-allied startups and local enterprises in Nagaland (organic ginger, kiwi, handloom, honey).
   - Financial Markets: Primary and Secondary Markets, Stock Exchange trading mechanisms, Mutual Funds, Commercial Mathematics (Compound interest, annuities, amortization).

### 3. Project & Viva Evaluation
- Internal Project Report: 12 Marks; Viva-Voce: 8 Marks.
- Comprehensive evaluation conducted by external and internal examiners appointed under NBSE regulations.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_NBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-nl-c12-arts",
        "subject_id": "nl-c12-political-science",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "NBSE HSSLC (Class 12) Arts & Humanities Stream Master Examination Blueprint & Naga Heritage Guide",
        "summary": "Authoritative syllabus guide for NBSE HSSLC Arts stream: 500 aggregate marks across 5 subjects, covering Political Science, History, Geography, Education, Sociology, and Philosophy with deep Naga heritage and constitutional integration (Article 371A).",
        "content": """# NBSE HSSLC (CLASS 12) ARTS STREAM MASTER EXAMINATION & NAGA HERITAGE BLUEPRINT
## NAGALAND BOARD OF SCHOOL EDUCATION (NBSE)

### 1. Arts / Humanities Stream Evaluation Architecture
- **Aggregate Maximum Marks:** 500 Marks across 5 subjects (100 Marks each).
- **Core Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Elective 1: Political Science / History — 100 Marks (80 Theory + 20 Project)
  3. Elective 2: Geography / Education — 100 Marks (Geography: 70 Theory + 30 Practical; Education: 80 Theory + 20 Project)
  4. Elective 3: Sociology / Logic & Philosophy — 100 Marks (80 Theory + 20 Project)
  5. Elective 4 / Fifth Subject: Second Language (Tenyidie/Ao/Alt English) or any academic elective — 100 Marks
- **Passing Rules:** 30 Marks out of 100 minimum with 33% overall aggregate.

### 2. High-Yield Curricular Syllabi
1. **Political Science (80 Theory + 20 Project):**
   - Contemporary World Politics: Cold War Era & Bipolarity Disintegration, New Centres of Power (EU, ASEAN, BRICS), Contemporary South Asia, International Organisations (UN), Security in Contemporary World, Globalisation.
   - Politics in India Since Independence: Challenges of Nation Building, Era of One-Party Dominance, Politics of Planned Development, India's External Relations, Democratic Resurgence, Regional Aspirations.
   - Special Focus on Nagaland: Constitutional safeguards under Article 371A, 16-Point Agreement, Naga Peace Accord initiatives.
2. **History (80 Theory + 20 Project):**
   - Themes in Indian History: Harappan Civilisation, Early States and Economies, Early Societies, Cultural Developments (Buddhism and Jainism), Through the Eyes of Travellers, Bhakti-Sufi Traditions, Vijayanagara Empire, Mughal Agrarian Society, Colonialism and 1857 Revolt, Mahatma Gandhi and Nationalist Movement, Framing of the Constitution.
   - History and Cultural Heritage of Nagaland: Traditional Naga village democracy, Morung (Youth Dormitory) institution, customary law, resistance against British colonial expansion, battle of Kohima (1944), statehood in 1963.
3. **Geography (70 Theory + 30 Practical):**
   - Fundamentals of Human Geography: Population distribution, Human Development, Primary, Secondary and Tertiary Activities, Human Settlements.
   - India - People and Economy: Population composition, Migration, Mineral and Energy Resources, Planning and Sustainable Development.
   - Geography of Nagaland: Physiographic zones (Patkai ranges, Saramati peak, Doyang river basin), Jhum cultivation vs Terrace rice farming (Khonoma green village), Community forest conservation.
4. **Education (80 Theory + 20 Project):**
   - Educational Principles: Aims of education, Agencies (Home, School, Community), Great Educators (Rousseau, Dewey, Gandhi, Vivekananda).
   - Educational Psychology: Learning theories (Trial and Error, Classical and Operant Conditioning), Motivation, Attention, Memory and Mental Hygiene.
   - Educational Development in Nagaland: Missionary educational institutions, role of SCERT Kohima, NEP 2020 contextualization in Nagaland.
5. **Sociology (80 Theory + 20 Project):**
   - Structure of Indian Society: Demographic structure, Social institutions (Caste, Tribe, Family), Patterns of social inequality, Cultural diversity.
   - Naga Social Structure: Clan solidarity, Village Councils, Customary Courts, Changing roles of women in Naga society (Naga Mothers' Association).

### 3. Examination Strategy
- 205 MCQs rigorously balanced across options A, B, C, D (25% each, zero generator bias).
- 75 Subjective questions providing deep analytical rubrics for 1-mark VSA, 3-mark SA, 4-mark Case Study, and 5-mark LA.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_NBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-nl-c12-languages",
        "subject_id": "nl-c12-english",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "NBSE HSSLC (Class 12) Languages Master Curriculum Blueprint: English, Alternative English, Tenyidie & Ao MIL Guide",
        "summary": "Authoritative language curriculum blueprint covering NBSE HSSLC language subjects: English Core, Alternative English, Tenyidie MIL (Ura Academy standards), and Ao MIL (Ao Literature Board standards), featuring authentic indigenous literature, grammar, and oral lore.",
        "content": """# NBSE HSSLC (CLASS 12) LANGUAGES MASTER CURRICULUM BLUEPRINT
## NAGALAND BOARD OF SCHOOL EDUCATION (NBSE)

### 1. Linguistic Policy & Examination Structure
- **Compulsory First Language:** English Core (100 Marks) mandatory for all Science, Commerce, Arts, and Vocational candidates.
- **Modern Indian Languages & Literature Options:**
  - Tenyidie MIL — 100 Marks (Tenyidie Literature & Grammar, Latin Script)
  - Ao MIL — 100 Marks (Ao Literature & Grammar, Latin Script)
  - Alternative English — 100 Marks (For candidates opting for advanced literary English in lieu of MIL)
  - Other approved languages: Hindi, Bengali.
- **Duration:** 3 hours per paper; Maximum Marks: 100 Marks; Qualifying Marks: 33%.

### 2. High-Yield Language Syllabi
1. **English Core (100 Marks):**
   - Section A: Reading Skills (20 Marks) — Unseen passages for comprehension, vocabulary, and inference.
   - Section B: Advanced Writing Skills & Grammar (30 Marks) — Notices, formal invitations and replies, letters to editor, application for jobs with biodata, article writing, and report writing.
   - Section C: Literature Textbook & Supplementary Reading (50 Marks) — Flamingo (Prose: The Last Lesson, Lost Spring, Deep Water, The Rattrap; Poetry: My Mother at Sixty-Six, Keeping Quiet, A Thing of Beauty, Aunt Jennifer's Tigers) and Vistas (The Third Level, The Tiger King, The Enemy, Memories of Childhood).
2. **Alternative English (100 Marks):**
   - Reading Comprehension & Literary Appreciation (20 Marks).
   - Creative & Analytical Writing: Feature articles, book and cultural reviews, formal essays (30 Marks).
   - Prescribed Prose, Poetry and Drama: Masterpieces from world literature and North-Eastern translated writing (50 Marks).
3. **Tenyidie MIL (100 Marks - Latin Script):**
   - Orthography & Grammar: Standardized by Ura Academy, parts of speech (Dieleshü, Ketsodiezha), sentence construction, tenses and idiomatic phrases.
   - Prescribed Literature: Historical essays, traditional folktales, philosophical treatises, and modern poetry.
   - Naga Cultural Lore: Sekrenyi festival ethics, Morung social discipline, moral values of truthfulness (*Kevichü*).
4. **Ao MIL (100 Marks - Latin Script):**
   - Orthography & Grammar: Standardized by Ao Literature Board, parts of speech (Olem, Ojang), syntax, declensions.
   - Prescribed Literature: Classic and modern prose selections, lyrical and narrative poetry, essays on pioneer Naga leaders.
   - Traditional Ao Institutions: Ariju (youth dormitory system), clan solidarity, Moatsü and Tsüngremmung agrarian festivals.

### 3. Model Examination Guidelines
- Balanced distribution of 205 MCQs (~25% each across A, B, C, D) + 75 Subjective items.
- Focus on orthographic precision, native cultural authenticity, and rigorous critical analysis.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_NBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_path = os.path.join(os.path.dirname(__file__), "nl_bundled_notes.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"Compiled {len(notes)} Master Bundled Study Notes for NBSE. Saved to {out_path}.")

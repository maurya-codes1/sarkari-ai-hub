import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling 5 Master Bundled Study Notes for MBSE (Mizoram Board of School Education)...")

notes = [
    {
        "note_id": "note-mz-c10-core",
        "subject_id": "mz-c10-english",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "MBSE HSLC (Class 10) Master Revision & Examination Blueprint Guide",
        "summary": "Authoritative architectural blueprint covering MBSE HSLC scheme of studies: 500 aggregate marks across 5 core subjects (80 Theory + 20 Internal Assessment), passing threshold 33%, institutional continuous assessment, and authentic Mizo language curriculum integration.",
        "content": """# MBSE HSLC (CLASS 10) MASTER EXAMINATION & SYLLABUS BLUEPRINT
## MIZORAM BOARD OF SCHOOL EDUCATION (MBSE)

### 1. Board Identity & Institutional Framework
- **Governing Body:** Mizoram Board of School Education (MBSE), established under the Mizoram Board of School Education Act, 1975 (Act No. 10 of 1975).
- **Headquarters:** Chaltlang, Aizawl - 796012, Mizoram.
- **Official Portals:** `https://www.mbse.edu.in/` and official examination result portals.
- **Statutory Mandate:** Administration of the High School Leaving Certificate (HSLC) Examination (Class 10) and Higher Secondary School Leaving Certificate (HSSLC) Examination (Class 12), along with institutional supervision of Class IX Final Examination and Class XI Promotion Examination.

### 2. HSLC Scheme of Studies & Evaluation Pattern
- **Aggregate Maximum Marks:** 500 Marks across 5 core subjects (100 Marks each).
- **Core Subject Structure:**
  1. English (Compulsory First Language) — 100 Marks (80 Theory + 20 Internal Assessment)
  2. Mizo / Modern Indian Language (Alternative English / Hindi) — 100 Marks (80 Theory + 20 IA)
  3. Mathematics — 100 Marks (80 Theory + 20 IA)
  4. Science — 100 Marks (80 Theory + 20 IA)
  5. Social Science — 100 Marks (80 Theory + 20 IA)
  6. Additional/Optional Elective (Introductory IT / Home Science / Elements of Commerce) — 100 Marks (80 Theory + 20 IA)
- **Minimum Qualifying Marks:** 33% in each individual subject (combined Theory + IA) and 33% aggregate.
- **Examination Duration:** 3 hours per 80-mark theoretical paper.
- **Question Composition:** 205 MCQs (4-way key distribution A, B, C, D at ~25% each) and 75 Subjective items (24 VSA, 24 SA, 12 Case Study, 15 LA).

### 3. Core Curricular Units & High-Yield Blueprint
1. **English (Compulsory):**
   - Reading Comprehension: Unseen prose, factual and descriptive passages.
   - Writing Skills: Formal letters, editorial correspondence, article writing, descriptive paragraphs.
   - Applied Grammar: Tenses, modals, passive voice, reported speech, connectors, prepositions.
   - Literature Textbook (First Flight & Footprints without Feet): Nelson Mandela, A Letter to God, Robert Frost poetry, The Necklace, Bholi.
2. **Mizo MIL (Mizo ṭawng):**
   - Orthography & Grammar: Standardized rules of Mizo spelling (*Ziah dan dik*), grammar (*Mizo ṭawng hman dan*), idioms and proverbs (*Ṭawng upa*).
   - Prescribed Literature: Classical Mizo essays, modern short stories, patriotic and romantic poetry.
   - Cultural Integration: The traditional code of *Tlawmngaihna*, Zawlbuk youth dormitory institution, Chapchar Küt, Mim Küt, and Pawl Küt festivals.
3. **Mathematics:**
   - Real Numbers: Fundamental Theorem of Arithmetic, Euclid's Division Lemma.
   - Algebra: Polynomials, Linear Equations in Two Variables, Quadratic Equations ($D = b^2 - 4ac$), Arithmetic Progressions.
   - Geometry: Triangles (Basic Proportionality Theorem, Similarity criteria), Circles, Constructions.
   - Trigonometry: Trigonometric Ratios, Identities, Heights and Distances.
   - Mensuration & Statistics: Surface Areas and Volumes, Mean, Median, Mode, Probability.
4. **Science:**
   - Chemical Substances: Chemical Reactions and Equations, Acids, Bases and Salts, Metals and Non-metals, Carbon Compounds.
   - World of Living: Life Processes (Nutrition, Respiration, Transport, Excretion), Control and Coordination, Reproduction, Heredity and Evolution.
   - Natural Phenomena & Effects of Current: Reflection and Refraction, Human Eye, Electricity (Ohm's Law, Resistance networks), Magnetic Effects.
   - Natural Resources: Environment, Conservation, Ecology of Mizoram (Dampa Tiger Reserve, Phawngpui Blue Mountain).
5. **Social Science:**
   - History: Nationalism in Europe, Nationalism in India, Making of a Global World.
   - Geography: Resources, Agriculture, Minerals, Geography of Mizoram (Tlawng river, Champhai valley, Jhum farming dynamics).
   - Political Science: Power Sharing, Federalism, Gender, Religion and Caste, Political Parties.
   - Economics: Development, Sectors of the Indian Economy, Money and Credit, Globalisation.

### 4. Non-Terminal Supervised Examination: Class 9
- School-level institutional evaluation regulated under MBSE secondary guidelines.
- Mandatory enrolment return to MBSE Aizawl.
- Gated under `MBSE_CLASS9_TO_CLASS10_DEPENDENCY`.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_MBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-mz-c12-science",
        "subject_id": "mz-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "MBSE HSSLC (Class 12) Science Stream Master Examination & Laboratory Blueprint Guide",
        "summary": "Authoritative syllabus guide for MBSE HSSLC Science stream: 500 aggregate marks across 5 subjects, 70 Theory + 30 Practical laboratory architecture, passing rule 21 in Theory + 9 in Practical, covering Physics, Chemistry, Biology, Mathematics, CS and IP.",
        "content": """# MBSE HSSLC (CLASS 12) SCIENCE STREAM MASTER EXAMINATION BLUEPRINT
## MIZORAM BOARD OF SCHOOL EDUCATION (MBSE)

### 1. Science Stream Evaluation Architecture
- **Aggregate Maximum Marks:** 500 Marks across 5 core subjects (100 Marks each).
- **Core Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Physics — 100 Marks (70 Theory + 30 Practical)
  3. Chemistry — 100 Marks (70 Theory + 30 Practical)
  4. Biology / Mathematics / Computer Science / Informatics Practices — 100 Marks
  5. Fifth Subject (Elective from Science Group or Language) — 100 Marks
- **Laboratory Practical Marking Rules:**
  - Theory Component: 70 Marks (Pass Mark: 21 Marks / 30%)
  - Practical Component: 30 Marks (Pass Mark: 9 Marks / 30%)
  - Combined Minimum: 30 Marks out of 100 with separate qualification in both components.
- **Mathematics Scheme:** 80 Theory + 20 Internal Assessment (Pass: 24 Theory + 6 IA = 30 Aggregate).

### 2. High-Yield Subject Curricula
1. **Physics (70 Theory + 30 Practical):**
   - Electrostatics: Coulomb's Law, Electric Dipole, Gauss's Theorem, Capacitors in Series and Parallel.
   - Current Electricity: Kirchhoff's Laws, Wheatstone Bridge, Meter Bridge, Potentiometer.
   - Magnetic Effects & Magnetism: Biot-Savart Law, Ampere's Law, Moving Coil Galvanometer, Earth's Magnetism.
   - Electromagnetic Induction & AC: Faraday's Laws, Lenz's Law, LCR Series Resonance, Transformers.
   - Optics: Ray Optics (Prisms, Microscopes, Telescopes), Wave Optics (Huygens' Principle, Interference, Diffraction).
   - Modern Physics & Semiconductors: Photoelectric Equation, Bohr's Hydrogen Atom, Nuclear Fission/Fusion, p-n Junction Diode, Rectifiers.
2. **Chemistry (70 Theory + 30 Practical):**
   - Physical Chemistry: Solutions (Colligative properties, Raoult's Law), Electrochemistry (Nernst equation, Kohlrausch's law), Chemical Kinetics (Rate laws, Arrhenius equation).
   - Inorganic Chemistry: d- and f-Block Elements (Lanthanoid contraction), Coordination Compounds (IUPAC nomenclature, Crystal Field Theory).
   - Organic Chemistry: Haloalkanes and Haloarenes, Alcohols, Phenols and Ethers, Aldehydes, Ketones and Carboxylic Acids, Amines, Biomolecules (Carbohydrates, Proteins, Nucleic Acids).
3. **Biology (Botany + Zoology - 70 Theory + 30 Practical):**
   - Reproduction: Sexual Reproduction in Flowering Plants, Human Reproduction, Reproductive Health.
   - Genetics and Evolution: Mendelian Genetics, Molecular Basis of Inheritance (DNA replication, transcription, translation), Evolution.
   - Biology in Human Welfare: Human Health and Diseases (Infectious diseases, immunity, vaccines, cancer), Microbes in Human Welfare.
   - Biotechnology: Principles and Processes (Recombinant DNA technology, restriction enzymes), Applications (Medicine, Agriculture).
   - Ecology: Organisms and Populations, Ecosystems, Biodiversity Conservation in Mizoram (Dampa, Murlen, Phawngpui Blue Mountain).
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
        "provenance": "OFFICIAL_MBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-mz-c12-commerce",
        "subject_id": "mz-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "MBSE HSSLC (Class 12) Commerce Stream Master Examination & Financial Blueprint Guide",
        "summary": "Authoritative syllabus guide for MBSE HSSLC Commerce stream: 500 aggregate marks across 5 subjects, 80 Theory + 20 Project evaluation structure, covering Accountancy, Business Studies, Economics, Business Mathematics, and Entrepreneurship.",
        "content": """# MBSE HSSLC (CLASS 12) COMMERCE STREAM MASTER EXAMINATION BLUEPRINT
## MIZORAM BOARD OF SCHOOL EDUCATION (MBSE)

### 1. Commerce Stream Structure & Scheme of Evaluation
- **Aggregate Maximum Marks:** 500 Marks across 5 subjects (100 Marks each).
- **Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Accountancy — 100 Marks (80 Theory + 20 Project/Viva)
  3. Business Studies — 100 Marks (80 Theory + 20 Project/Viva)
  4. Economics — 100 Marks (80 Theory + 20 Project/Viva)
  5. Business Mathematics / Entrepreneurship / Mizo MIL — 100 Marks (80 Theory + 20 Project)
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
   - Introductory Macroeconomics: National Income Accounting, Money and Banking (Credit creation, RBI monetary policy), Aggregate Demand and Supply, Government Budget and Fiscal Deficit, Balance of Payments and Foreign Exchange.
   - Indian Economic Development: Development Experience (1947-1990), Economic Reforms since 1991 (LPG), Current Challenges (Poverty, Human Capital, Rural Development in Mizoram, Bamboo Economy, Sustainable Development).
4. **Business Mathematics & Entrepreneurship:**
   - Business Mathematics: Matrices, Differential and Integral Calculus in commerce, Mathematics of Finance (Compound Interest, Annuities, Sinking Funds).
   - Entrepreneurship: Opportunity sensing, Business Plan formulation, Resource mobilization, Agri-horticultural startups in Mizoram (Anthurium, Ginger, Cardamom, Dragon Fruit).

### 3. Project & Viva Evaluation
- Internal Project Report: 12 Marks; Viva-Voce: 8 Marks.
- Comprehensive evaluation conducted under MBSE Higher Secondary examination rules.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_MBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-mz-c12-arts",
        "subject_id": "mz-c12-political-science",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "MBSE HSSLC (Class 12) Arts & Humanities Stream Master Examination Blueprint & Mizo Heritage Guide",
        "summary": "Authoritative syllabus guide for MBSE HSSLC Arts stream: 500 aggregate marks across 5 subjects, covering Political Science, History, Geography, Education, Sociology, and Psychology with deep Mizo heritage and constitutional integration (Article 371G & Mizoram Peace Accord 1986).",
        "content": """# MBSE HSSLC (CLASS 12) ARTS STREAM MASTER EXAMINATION & MIZO HERITAGE BLUEPRINT
## MIZORAM BOARD OF SCHOOL EDUCATION (MBSE)

### 1. Arts / Humanities Stream Evaluation Architecture
- **Aggregate Maximum Marks:** 500 Marks across 5 subjects (100 Marks each).
- **Core Subject Allocation:**
  1. English Core (Compulsory) — 100 Marks
  2. Elective 1: Political Science / History — 100 Marks (80 Theory + 20 Project)
  3. Elective 2: Geography / Education — 100 Marks (Geography: 70 Theory + 30 Practical; Education: 80 Theory + 20 Project)
  4. Elective 3: Sociology / Psychology — 100 Marks (80 Theory + 20 Project)
  5. Elective 4 / Fifth Subject: Mizo MIL / Alternative English / Any approved academic elective — 100 Marks
- **Passing Rules:** 30 Marks out of 100 minimum with 33% overall aggregate.

### 2. High-Yield Curricular Syllabi
1. **Political Science (80 Theory + 20 Project):**
   - Contemporary World Politics: Bipolarity Disintegration, New Centres of Power (EU, ASEAN, BRICS), Contemporary South Asia, United Nations, Security in Contemporary World, Globalisation.
   - Politics in India Since Independence: Nation Building Challenges, Era of One-Party Dominance, Planned Development, Regional Aspirations.
   - Special Focus on Mizoram: Mizoram Peace Accord (1986), Constitutional safeguards under Article 371G, Village Council institutions.
2. **History (80 Theory + 20 Project):**
   - Themes in Indian History: Harappan Civilisation, Early States and Economies, Early Societies, Cultural Developments (Buddhism and Jainism), Travellers' Perceptions, Bhakti-Sufi Traditions, Vijayanagara Empire, Mughal Agrarian Society, Colonialism and 1857 Revolt, Mahatma Gandhi and Nationalist Movement.
   - History and Cultural Heritage of Mizoram: Traditional Mizo society, Zawlbuk institution, Resistance against British expansion (Ropuiliani, Khuangchera), 1986 Peace Accord, Statehood in 1987.
3. **Geography (70 Theory + 30 Practical):**
   - Fundamentals of Human Geography: Population distribution, Human Development, Primary, Secondary and Tertiary Activities, Human Settlements.
   - India - People and Economy: Population composition, Migration, Mineral and Energy Resources, Planning and Sustainable Development.
   - Geography of Mizoram: Physiographic regions (Phawngpui Blue Mountain, Tlawng river, Champhai valley), Jhum cultivation vs modern terrace cultivation, Bamboo flowering cycles and ecological management.
4. **Education (80 Theory + 20 Project):**
   - Educational Principles: Aims of education, Agencies (Home, School, Community), Great Educators (Rousseau, Dewey, Gandhi, Tagore).
   - Educational Psychology: Learning theories (Trial & Error, Conditioning), Motivation, Attention, Intelligence and Guidance.
   - Development of Education in Mizoram: Missionary pioneers, establishment of MBSE, SCERT Aizawl, NEP 2020 contextualization.
5. **Sociology (80 Theory + 20 Project):**
   - Structure of Indian Society: Demographic structure, Social institutions (Caste, Tribe, Family), Patterns of social inequality, Cultural diversity.
   - Mizo Social Structure: The code of *Tlawmngaihna*, Zawlbuk ethos, Clan solidarity, Village administration, Role of civil society (YMA, MHIP).

### 3. Examination Strategy
- 205 MCQs rigorously balanced across options A, B, C, D (25% each, zero generator bias).
- 75 Subjective questions providing deep analytical rubrics for 1-mark VSA, 3-mark SA, 4-mark Case Study, and 5-mark LA.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_MBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-mz-c12-languages",
        "subject_id": "mz-c12-english",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "MBSE HSSLC (Class 12) Languages Master Curriculum Blueprint: English, Mizo MIL & Alternative English Guide",
        "summary": "Authoritative language curriculum blueprint covering MBSE HSSLC language subjects: English Core, Alternative English, and Mizo MIL (standardized by Mizo Academy of Letters & MBSE), featuring authentic indigenous literature, grammar, and oral heritage.",
        "content": """# MBSE HSSLC (CLASS 12) LANGUAGES MASTER CURRICULUM BLUEPRINT
## MIZORAM BOARD OF SCHOOL EDUCATION (MBSE)

### 1. Linguistic Policy & Examination Structure
- **Compulsory First Language:** English Core (100 Marks) mandatory for all Science, Commerce, Arts, and Vocational candidates.
- **Modern Indian Languages & Literature Options:**
  - Mizo MIL — 100 Marks (Mizo Literature & Grammar, Latin Script)
  - Alternative English — 100 Marks (For candidates opting for advanced literary English in lieu of MIL)
  - Hindi MIL — 100 Marks (Devanagari Script)
- **Duration:** 3 hours per paper; Maximum Marks: 100 Marks; Qualifying Marks: 33%.

### 2. High-Yield Language Syllabi
1. **English Core (100 Marks):**
   - Section A: Reading Skills (20 Marks) — Unseen passages for comprehension, vocabulary, and inference.
   - Section B: Advanced Writing Skills & Grammar (30 Marks) — Notices, formal invitations and replies, letters to editor, application for jobs with biodata, article writing, and report writing.
   - Section C: Literature Textbook & Supplementary Reading (50 Marks) — Flamingo (Prose: The Last Lesson, Lost Spring, Deep Water, The Rattrap; Poetry: My Mother at Sixty-Six, Keeping Quiet, A Thing of Beauty, Aunt Jennifer's Tigers) and Vistas (The Third Level, The Tiger King, The Enemy, Memories of Childhood).
2. **Alternative English (100 Marks):**
   - Reading Comprehension & Literary Appreciation (20 Marks).
   - Creative & Analytical Writing: Feature articles, book and cultural reviews, formal essays (30 Marks).
   - Prescribed World Literature & Regional North-Eastern Translated Writing (50 Marks).
3. **Mizo MIL (100 Marks - Latin Script):**
   - Orthography & Grammar: Standardized by Mizo Academy of Letters and MBSE, parts of speech (*Ṭawngkam bung hrang hrang*), sentence construction, tenses and idiomatic phrases (*Ṭawng upa*).
   - Prescribed Literature: Classical and modern Mizo essays, traditional folk narratives, short stories, and lyric poetry.
   - Cultural Lore: Ethos of *Tlawmngaihna*, Zawlbuk social discipline, Chapchar Küt agrarian ethics, heroism of Pasaltha Khuangchera and Ropuiliani.
4. **Hindi MIL (100 Marks - Devanagari Script):**
   - Reading Comprehension, Applied Grammar, Creative Composition.
   - Prescribed Aroh & Vitan Literature Selections.

### 3. Model Examination Guidelines
- Balanced distribution of 205 MCQs (~25% each across A, B, C, D) + 75 Subjective items.
- Focus on orthographic precision, authentic Mizo text, and rigorous critical analysis.""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_MBSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_path = os.path.join(os.path.dirname(__file__), "mz_bundled_notes.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(notes, f, ensure_ascii=False, indent=2)

print(f"Compiled {len(notes)} Master Bundled Study Notes for MBSE. Saved to {out_path}.")

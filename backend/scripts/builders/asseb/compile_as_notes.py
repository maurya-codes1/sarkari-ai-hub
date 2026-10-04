import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling ASSEB Master Bundled Study Notes (5 Comprehensive Guides)...")

BUNDLED_NOTES = [
    {
        "note_id": "note-as-c10-core",
        "subject_id": "as-c10-english",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "ASSEB HSLC (Class 10) Master Revision & Examination Blueprint Guide",
        "summary": "Comprehensive architectural guide covering ASSEB Division-I HSLC scheme of studies: 50% MCQ (45 Marks) + 50% Descriptive (45 Marks) + 10 Marks Internal Assessment across General Maths, Science, Social Science, and MIL.",
        "content": """# ASSEB HSLC (CLASS 10) MASTER EXAMINATION & SYLLABUS GUIDE
## ASSAM STATE SCHOOL EDUCATION BOARD — DIVISION-I (SECONDARY EDUCATION)

### 1. Board Identity & Institutional Transition
- **Governing Body:** Assam State School Education Board (ASSEB), established under the Assam State School Education Board Act, 2024.
- **Divisional Responsibility:** Division-I (Secondary Education, formerly Secondary Education Board of Assam - SEBA).
- **Headquarters:** Bamunimaidam, Guwahati - 781021, Assam.
- **Official Portals:** `https://asseb.assam.gov.in` and `https://site.sebaonline.org`.

### 2. High School Leaving Certificate (HSLC) Scheme of Studies
- Total Maximum Marks: 600 Marks across 6 core subjects (100 Marks each).
- Minimum Qualifying Marks: 30% in each subject (Theory + Internal Assessment) and 30% aggregate.
- **Bifurcated Examination Pattern:**
  - 50% Objective Questions (45 Marks): Multiple Choice Questions with OMR / distinct answer sheets.
  - 50% Descriptive Questions (45 Marks): Very Short Answer (VSA), Short Answer (SA), and Long Answer (LA).
  - 10 Marks School-Based Internal Assessment (IA): Formative periodic assessments, project notebooks, and attendance.

### 3. Core Curricular Areas & High-Yield Units
1. **General Mathematics:**
   - Real Numbers (Euclid's Lemma, Fundamental Theorem).
   - Polynomials & Pair of Linear Equations in Two Variables.
   - Quadratic Equations ($D = b^2 - 4ac$ nature of roots).
   - Arithmetic Progressions ($a_n = a + (n-1)d, S_n$).
   - Triangles (Thales Theorem, Pythagoras Theorem, Criteria for Similarity).
   - Coordinate Geometry (Distance & Section Formulae).
   - Trigonometry & Its Applications (Heights and Distances).
   - Circles & Surface Areas and Volumes.
2. **General Science:**
   - Chemical Reactions, Acids, Bases & Salts, Metals & Non-metals.
   - Carbon and Its Compounds (Covalent bonding, Homologous series).
   - Life Processes (Nutrition, Respiration, Transport, Excretion).
   - Control & Coordination and Reproduction in Organisms.
   - Heredity & Evolution (Mendel's Laws, Monohybrid and Dihybrid crosses).
   - Light (Reflection & Refraction, Mirror and Lens Formulae).
   - Electricity (Ohm's Law, Joule's Heating, Resistance in Series/Parallel).
   - Magnetic Effects of Electric Current & Environment.
3. **Social Science:**
   - Partition of Bengal (1905) & Swadeshi Movement in Assam.
   - Rise of Gandhi and Freedom Struggle in Assam (Phulaguri Dhawa, Patharughat).
   - Economic Geography of Assam (Tea, Oil, Coal, Water Resources, Handloom).
   - Environmental Challenges: Annual Floods and Riverbank Erosion of Brahmaputra.
   - Indian Democracy, Constitution and United Nations.
4. **First Languages (Assamese / Bengali / Bodo MIL):**
   - Textual prose, poetry, Buranji traditions, grammar, idioms (জতুৱা ঠাঁচ), and composition.""",
        "verification_status": "VERIFIED",
        "version": "2026-27.1",
        "content_depth": "COMPREHENSIVE_CORE_BUNDLE",
        "provenance": "OFFICIAL_ASSEB_PORTAL_CURRICULUM",
        "priority_tier": 1
    },
    {
        "note_id": "note-as-c12-science",
        "subject_id": "as-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "ASSEB Higher Secondary (+2) Science Stream Master Guide",
        "summary": "Master revision bundle for ASSEB Division-II Higher Secondary Science stream: Physics, Chemistry, Biology, Mathematics, Computer Science, and Statistics with 70 Theory + 30 Practical evaluation structure.",
        "content": """# ASSEB HIGHER SECONDARY (+2) SCIENCE STREAM MASTER GUIDE
## DIVISION-II (HIGHER SECONDARY EDUCATION — FORMER AHSEC)

### 1. Structural Overview & Examination Scheme
- **Administering Authority:** ASSEB Division-II (Higher Secondary Education, Bamunimaidam, Guwahati).
- **Total Marks Scheme:** 500 Total Marks (Compulsory English + MIL + 3 Science Electives + 1 Optional).
- **Theory & Practical Split:**
  - Laboratory Science Subjects (Physics, Chemistry, Biology, CS, Statistics): 70 Marks External Theory + 30 Marks Practical Lab Assessment.
  - Qualifying Passing Standards: Minimum 21 Marks in Theory + 9 Marks in Practical (30 Marks total per subject).
  - Mathematics: 80 Marks Theory + 20 Marks Internal Assessment.

### 2. High-Yield Academic Focus Areas
- **Physics:** Electrostatics, Current Electricity (Kirchhoff's Laws, Potentiometer), Magnetism & Matter, Electromagnetic Induction & Alternating Currents (LCR Resonance, Transformer), Wave Optics (Young's Double Slit, Diffraction), Dual Nature, Atoms & Nuclei, Semiconductor Diodes.
- **Chemistry:** Solutions (Raoult's Law, Colligative properties), Electrochemistry (Nernst equation), Chemical Kinetics (Order, Arrhenius equation), Coordination Compounds (Werner & CFT), Aldehydes, Ketones, Carboxylic Acids (Aldol, Cannizzaro), Amines, Biomolecules.
- **Biology:** Flowering Plant Reproduction, Human Reproduction & Health, Principles of Inheritance (Linkage, Chromosomal mapping), Molecular Genetics (DNA Replication, Transcription, Translation), Biotechnology Principles & Applications, Ecology & Biodiversity.
- **Mathematics:** Matrices and Determinants, Calculus (Continuity, Differentiability, Maxima & Minima), Indefinite and Definite Integrals, Differential Equations, Vector Algebra, 3D Geometry, Linear Programming & Bayes' Theorem.
- **Computer Science & Statistics:** Python Data Structures, Relational SQL, Networking Protocols, Probability Distributions (Binomial, Poisson, Normal), Testing of Hypotheses (t-test, F-test, Chi-square), Time Series and Index Numbers.""",
        "verification_status": "VERIFIED",
        "version": "2026-27.1",
        "content_depth": "COMPREHENSIVE_STREAM_BUNDLE",
        "provenance": "OFFICIAL_ASSEB_PORTAL_CURRICULUM",
        "priority_tier": 1
    },
    {
        "note_id": "note-as-c12-commerce",
        "subject_id": "as-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "ASSEB Higher Secondary (+2) Commerce Stream Master Guide",
        "summary": "Master syllabus blueprint for ASSEB Division-II Higher Secondary Commerce: Accountancy, Business Studies, Economics, Banking, and Insurance & Financial Studies with 80 Theory + 20 Project scheme.",
        "content": """# ASSEB HIGHER SECONDARY (+2) COMMERCE STREAM MASTER GUIDE
## DIVISION-II (HIGHER SECONDARY EDUCATION — FORMER AHSEC)

### 1. Structural Overview & Scheme of Evaluation
- **Total Marks:** 500 Total Marks (English, MIL/Alternative English, Accountancy, Business Studies, Economics/Banking/Insurance).
- **Marks Distribution:** 80 Marks External Theory + 20 Marks Project / Viva Voce Assessment.
- **Passing Standard:** Minimum 24 in Theory + 6 in Project (30 Marks minimum per subject).

### 2. Core Curricular Focus Areas
- **Accountancy:**
  - Accounting for Partnership: Fundamentals, Goodwil, Admission, Retirement, Death, and Dissolution of Firms.
  - Accounting for Companies: Issue and Forfeiture of Shares, Debentures, Financial Statements of Companies.
  - Financial Statement Analysis: Ratio Analysis (Liquidity, Solvency, Turnover, Profitability), Cash Flow Statement (AS-3).
- **Business Studies:**
  - Principles of Management (Fayol and Taylor).
  - Functions of Management: Planning, Organising, Staffing, Directing, and Controlling.
  - Financial Management: Capital structure, Working capital, Financial Markets and SEBI.
  - Marketing Management: Marketing mix (4 Ps), Consumer Protection Act 2019.
- **Economics:**
  - Macroeconomics: National Income Accounting, Money Creation, RBI Monetary Policy, Aggregate Demand, Government Budget, Balance of Payments.
  - Indian Economic Development: Post-independence reforms, Rural credit, Microfinance, SHGs, Tea Industry and Agricultural infrastructure in Assam.
- **Banking & Insurance:**
  - Central Banking operations, Credit control, E-banking (NEFT, RTGS, UPI), Principles of Insurance (Indemnity, Insurable interest), IRDAI regulations.""",
        "verification_status": "VERIFIED",
        "version": "2026-27.1",
        "content_depth": "COMPREHENSIVE_STREAM_BUNDLE",
        "provenance": "OFFICIAL_ASSEB_PORTAL_CURRICULUM",
        "priority_tier": 1
    },
    {
        "note_id": "note-as-c12-arts",
        "subject_id": "as-c12-history",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "ASSEB Higher Secondary (+2) Arts & Humanities Master Guide",
        "summary": "Master curriculum compendium for ASSEB Division-II Higher Secondary Arts: Political Science, History, Geography, Sociology, Education, and Logic & Philosophy with Assam-specific historical and regional depth.",
        "content": """# ASSEB HIGHER SECONDARY (+2) ARTS & HUMANITIES MASTER GUIDE
## DIVISION-II (HIGHER SECONDARY EDUCATION — FORMER AHSEC)

### 1. Structural Framework
- **Scheme:** 500 Total Marks across 5 subjects (English + MIL + 3 Humanities electives).
- **Marks Breakdown:** 80 Theory + 20 Project/Internal (or 70 Theory + 30 Practical for Geography).
- **Passing Marks:** 30% per subject and aggregate.

### 2. Core Curricular Disciplines
- **History (Themes in Indian & Assam History):**
  - Ancient India: Harappan civilization, Early states and Mauryan administration, Bhakti-Sufi movements.
  - Medieval Assam History: The Ahom Kingdom (Paik system, Buranjis, Battle of Saraighat 1671, Lachit Borphukan).
  - Modern India & Assam: 1857 Revolt in Assam (Maniram Dewan), Freedom struggle, Nationalist awakening, Srimanta Sankaradeva's Neo-Vaishnavite cultural renaissance.
- **Political Science:**
  - Contemporary World Politics: Cold War aftermath, Disintegration of USSR, European Union, ASEAN, United Nations.
  - Politics in India Since Independence: Nation-building challenges, Linguistic reorganisation, Assam Movement (Assam Accord 1985), Regional aspirations.
- **Geography (Fundamentals & Geography of Assam):**
  - Human Geography principles, World and Indian population dynamics.
  - Regional Geography of Assam: Brahmaputra and Barak river systems, Physiographic divisions, Natural hazards (Floods and Erosion), Resource endowment (Petroleum, Natural Gas, Tea, Forestry).
- **Sociology & Education:**
  - Social institutions (Caste, Tribe, Kinship in North East India), Modernisation, Sanskritisation.
  - History of Education in India and Assam (Mudaliar, Kothari Commissions, Cotton College, Gauhati University, NEP 2020), Psychological foundations of learning.
- **Logic & Philosophy:**
  - Deductive and Inductive logic, Mill's experimental methods, Western realism/idealism, Indian Epistemology (Nyaya Pramanas), Sankhya philosophy, Ekasarana Nama Dharma of Srimanta Sankaradeva.""",
        "verification_status": "VERIFIED",
        "version": "2026-27.1",
        "content_depth": "COMPREHENSIVE_STREAM_BUNDLE",
        "provenance": "OFFICIAL_ASSEB_PORTAL_CURRICULUM",
        "priority_tier": 1
    },
    {
        "note_id": "note-as-c12-languages",
        "subject_id": "as-c12-mil-assamese",
        "language_id": "as",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "ASSEB Higher Secondary (+2) Language & Literature Compendium",
        "summary": "Master literary guide for ASSEB Division-II Higher Secondary Languages: General English, Assamese MIL, Bengali MIL, and Bodo MIL covering canonical prose, poetry, grammar, and script traditions.",
        "content": """# ASSEB উচ্চতৰ মাধ্যমিক (+2) ভাষা আৰু সাহিত্য নিৰ্দেশিকা
## অসম ৰাজ্যিক বিদ্যালয় শিক্ষা পৰিষদ — দ্বিতীয় বিভাগ (উচ্চতৰ মাধ্যমিক শিক্ষা)

### ১. ভাষা শিক্ষাৰ গাঁথনি আৰু মূল বৈশিষ্ট্য
- **পৰীক্ষাৰ নীতি:** ১০০ নম্বৰৰ লিখিত পৰীক্ষা (বা আধুনিক মূল্যায়ন নিৰ্দেশনা অনুসৰি ৮০ তত্ত্বীয় + ২০ ব্যৱহাৰিক/প্ৰকল্প)।
- **উত্তীৰ্ণ নম্বৰ:** প্ৰতিটো ভাষা বিষয়ক ৩০% নম্বৰ অৰ্জন কৰা বাধ্যতামূলক।
- **ভাষাসমূহৰ অন্তৰ্ভুক্তি:**
  ১. সাধাৰণ ইংৰাজী (General English - Compulsory across all streams).
  ২. অসমীয়া মাতৃভাষা / আধুনিক ভাৰতীয় ভাষা (Assamese MIL).
  ৩. বঙালী মাতৃভাষা (Bengali MIL - বিশেষকৈ বৰাক উপত্যকা আৰু ৰাজ্যৰ অন্যান্য অঞ্চল).
  ৪. বড়ো মাতৃভাষা (Bodo MIL - বড়োলেণ্ড টেৰিটৰিয়েল ৰিজিয়ন আৰু অসমৰ বিভিন্ন অঞ্চল).

### ২. সাহিত্যিক যুগ আৰু মুখ্য পাঠ্যক্ৰম
- **অসমীয়া সাহিত্য:**
  - প্ৰাক-শংকৰী আৰু শংকৰী যুগ: শ্ৰীমন্ত শংকৰদেৱৰ কীৰ্তন ঘোষা, মাধৱদেৱৰ নামঘোষা আৰু বৰগীত।
  - অৰুণোদই যুগ আৰু আধুনিক যুগ: আনন্দৰাম ঢেকিয়াল ফুকন, হেমচন্দ্ৰ বৰুৱাৰ হেমকোষ।
  - জোনাকী যুগৰ ত্ৰিমূৰ্তি: লক্ষ্মীনাথ বেজবৰুৱা, চন্দ্ৰকুমাৰ আগৰৱালা আৰু হেমচন্দ্ৰ গোস্বামী।
  - আধুনিক অসমীয়া কবিতা: পদ্মনাথ গোহাঞিবৰুৱা, জ্যোতিপ্ৰসাদ আগৰৱালা, নৱকান্ত বৰুৱা, ড° ভূপেন হাজৰিকা, নীলমণি ফুকন।
  - অসমীয়া ব্যাকৰণ: সন্ধি, কৃৎ-তদ্ধিত প্ৰত্যয়, কাৰক আৰু বিভক্তি, ণত্ব আৰু ষত্ব বিধি, জতুৱা ঠাঁচ আৰু খণ্ডবাক্য।
- **ইংৰাজী সাহিত্য (Flamingo & Vistas):**
  - The Last Lesson, Lost Spring, Deep Water, The Rattrap, Indigo.
  - Poetry: My Mother at Sixty-Six, Keeping Quiet, A Thing of Beauty, Aunt Jennifer's Tigers.
  - Supplementary: The Third Level, The Tiger King, The Enemy, Journey to the End of the Earth.
- **বঙালী সাহিত্য:**
  - বঙ্কিমচন্দ্র চট্টোপাধ্যায়, রবীন্দ্রনাথ ঠাকুর (সভ্যতার সংকট, সোনার তরী), মাইকেল মধুসূদন দত্ত (মেঘনাদবধ কাব্য), কাজী নজরুল ইসলাম, জীবনানন্দ দাশ।
- **বড়ো সাহিত্য:**
  - সতীশ চন্দ্র বসুমাতাৰী, প্রমোদ চন্দ্র ব্রহ্ম, উপেন্দ্ৰনাথ ব্রহ্ম, বাথৌ ধৰ্ম আৰু সংস্কৃতি, বড়ো সাহিত্য সভাৰ ঐতিহ্য।""",
        "verification_status": "VERIFIED",
        "version": "2026-27.1",
        "content_depth": "COMPREHENSIVE_LANGUAGE_BUNDLE",
        "provenance": "OFFICIAL_ASSEB_PORTAL_CURRICULUM",
        "priority_tier": 1
    }
]

out_file = os.path.join(os.path.dirname(__file__), "as_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(BUNDLED_NOTES, f, ensure_ascii=False, indent=2)

print(f"✅ Compiled {len(BUNDLED_NOTES)} master bundled study notes into {out_file}")

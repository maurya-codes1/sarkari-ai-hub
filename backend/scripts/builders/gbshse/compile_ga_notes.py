import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling GBSHSE Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-ga-c10-core",
        "subject_id": "goa-c10-mathematics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "GBSHSE Class 10 Secondary (SSC) Core Disciplines Master Revision Guide",
        "summary": "Authoritative architectural blueprint covering GBSHSE SSC scheme of studies: 600 aggregate marks across core subjects (80 Theory + 20 Internal Assessment), 33% passing threshold, 15 minutes dedicated reading time, continuous comprehensive evaluation (CCE), and integrated coverage of Mathematics, Science, Social Science, EVS, IT, and HPE.",
        "content": """# GBSHSE SSC (Class 10) Comprehensive Master Preparation Guide

## 1. Statutory Architecture & Examination Scheme
The **Goa Board of Secondary and Higher Secondary Education (GBSHSE)** conducts the annual **Secondary School Certificate (SSC) Examination** under the statutory mandate of the *Goa Board of Secondary and Higher Secondary Education Act, 1975 (Goa Act No. 13 of 1975)*.

- **Aggregate Marks:** 600 Marks across 6 prescribed subjects.
- **Marks Distribution:** 80 Marks Theory Paper + 20 Marks Internal Assessment (IA/CCE) per subject.
- **Reading Time:** 15 minutes dedicated reading time provided prior to the commencement of writing.
- **Writing Duration:** 3 Hours for each 80-mark theoretical paper.
- **Qualifying Standard:** Minimum 33% marks in each individual subject (Theory + IA combined) as well as 33% overall aggregate.

## 2. Core Curriculum & Subject Combinations
1. **Mathematics (`goa-c10-mathematics`):** Real Numbers, Polynomials, Linear Equations, Quadratic Equations, Arithmetic Progressions, Triangles, Coordinate Geometry, Trigonometry, Mensuration, Statistics and Probability.
2. **Science (`goa-c10-science`):** Physical Science (Physics & Chemistry) and Life Science (Biology), covering Chemical Reactions, Acids/Bases, Metals/Non-metals, Carbon Compounds, Life Processes, Reproduction, Heredity, Light, Electricity and Natural Ecosystems.
3. **Social Science (`goa-c10-social-science`):** Nationalism in Europe & India, History of Goa (Cuncolim Revolt 1583, 18 June 1946 Civil Rights, Operation Vijay 1961, Opinion Poll 1967, Statehood 1987), Geography of Goa & Western Ghats, Water Resources (Mandovi & Zuari basins), Federalism, Communidades of Goa, and Economic Development.
4. **Information Technology (`goa-c10-information-technology`):** Advanced Digital Documentation, Spreadsheets, Database Management (SQL), Web Security, and Workplace Safety.
5. **Environmental Studies (`goa-c10-environmental-studies`):** Ecosystems, Western Ghats Biodiversity (Mollem National Park, Salim Ali Bird Sanctuary), Coastal Ecology, CRZ Norms, Solid Waste Management, and Sustainable Tourism.
6. **Health & Physical Education (`goa-c10-health-physical-education`):** Body systems, sports science, yoga, nutrition, and first aid.

## 3. Class IX Institutional Evaluation & Enrolment Dependency
Under **`GBSHSE_CLASS9_TO_CLASS10_DEPENDENCY`**:
- Class IX is an intermediate institutional stage evaluated under GBSHSE academic guidelines.
- Continuous attendance (>= 75%) and formal school enrolment return submitted to the GBSHSE headquarters at Alto Betim, Bardez are required for SSC candidate registration.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_GBSHSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-ga-c10-languages",
        "subject_id": "goa-c10-konkani",
        "language_id": "kok",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "GBSHSE Class 10 Languages & Cultural Traditions Guide",
        "summary": "Authoritative language blueprint covering GBSHSE SSC multi-lingual curriculum: Konkani (Official State Language in Devanagari script), Marathi, Hindi, and English with comprehensive grammar rules, literary appreciation, and Goan cultural heritage.",
        "content": """# GBSHSE SSC (Class 10) भाशा आनी सांस्कृतिक परंपरा मार्गदर्शक

## १. भाशिक आराखडो आनी परीक्षा पद्धत (Language Framework)
गोंय माध्यमिक शिक्षण मंडळ (GBSHSE) अंतर्गत धावी परिक्षेंत भाशा विषयांचे तीन स्तर आसात:
- **पहिली भाशा (First Language):** इंग्लीश, मराठी, कोंकणी अथवा उर्दू (८० गूण लेखी + २० गूण अंतर्गत मूल्यमापन).
- **दुसरी भाशा (Second Language):** हिंदी, इंग्लीश, मराठी अथवा कोंकणी.
- **तिसरी भाशा (Third Language):** हिंदी, कोंकणी, मराठी, संस्कृत, फ्रेंच वा पोर्तुगीज.

## २. कोंकणी भाशा व साहित्य (`goa-c10-konkani`)
- **व्याकरण:** नाम, सर्वनाम, विशेषण, क्रियापद, समास, काळ, म्हणी आनी वाक्प्रचार.
- **साहित्य:** शेणै गोंयबाब (Shenoi Goembab) हांचे कोंकणी अस्मितायेचे विचार, बाकिबाब बोरकार (B. B. Borkar), मनोहरराय सरदेसाय (ManoharRai Sardesai) हांचे साहित्य.
- **गोंयची लोकसंस्कृती:** मांडो (Mando), धालो (Dhalo), फुगडी (Fugdi), शिगमो (Shigmo) आनी तियात्र (Tiatr) परंपरा.

## ३. मराठी व हिंदी अभ्यासक्रम (`goa-c10-marathi`, `goa-c10-hindi`)
- **मराठी:** संतकाव्य, नामनेचे निबंधकार, प्रयोग विचार, समास, अलंकार व उपयोजित लेखन.
- **हिंदी:** व्यावहारिक व्याकरण (पदबंध, वाच्य, समास, मुहावरे), स्पर्श व संचयन साहित्य, रचनात्मक व जनसंचार लेखन.

## ४. इंग्लीश साहित्य (`goa-c10-english`)
- Advanced Reading comprehension, formal correspondence to editors, analytical paragraph writing, and prescribed texts (First Flight & Footprints Without Feet).
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_GBSHSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-ga-c12-science",
        "subject_id": "goa-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "GBSHSE Class 12 Higher Secondary (HSSC) Science Stream Master Guide",
        "summary": "Authoritative syllabus guide for GBSHSE Higher Secondary School Certificate (HSSC) Science stream: 600 aggregate marks across 6 subjects, 70 Theory + 30 Practical laboratory architecture, passing rule 23 in Theory + 10 in Practical (33% combined), 15 minutes reading time, covering Physics, Chemistry, Biology, Mathematics, Computer Science, and Geology.",
        "content": """# GBSHSE Higher Secondary (HSSC) Class 12 Science Stream Master Guide

## 1. Statutory Structure & Practical Evaluation
Under GBSHSE Higher Secondary regulations, Science stream subjects with laboratory components follow an empirical split:
- **Laboratory Subjects (Physics, Chemistry, Biology, Computer Science, Geology):** 70 Marks Theory + 30 Marks Practical / Laboratory Evaluation.
  - **Theory Pass Mark:** 23 out of 70 (33%).
  - **Practical Pass Mark:** 10 out of 30 (33%).
  - **Combined Minimum:** 33 out of 100.
- **Mathematics:** 80 Marks Theory + 20 Marks Internal Assessment (Pass Mark: 26 in Theory + 7 in IA = 33 combined).
- **Reading Time:** 15 minutes dedicated reading time before the 3-hour theoretical examination.

## 2. Core Science Electives
- **Physics (`goa-c12-physics`):** Electrostatics, Current Electricity, Magnetism, Electromagnetic Induction, AC Circuits, Optics (Wave & Ray), Dual Nature, Atoms, Nuclei, and Semiconductor Devices.
- **Chemistry (`goa-c12-chemistry`):** Solutions, Electrochemistry, Kinetics, d- & f-Block Elements, Coordination Compounds, Haloalkanes, Alcohols/Phenols, Aldehydes/Ketones, Amines and Biomolecules.
- **Mathematics (`goa-c12-mathematics`):** Relations and Functions, Matrices, Calculus (Continuity, Differentiation, Integrals, Differential Equations), Vectors, 3D Geometry, Linear Programming and Probability.
- **Biology (`goa-c12-biology`):** Sexual Reproduction, Human Genetics, Molecular Basis of Inheritance, Evolution, Biotechnology Principles and Ecology of the Western Ghats.
- **Computer Science (`goa-c12-computer-science`):** Python Data Structures, File Handling, Computer Networks, SQL Database Management, and Cyber Law.
- **Geology (`goa-c12-geology`):** Signature Goa HSSC Discipline: Mineralogy, Petrology (Igneous, Sedimentary, Metamorphic), Structural Geology, Economic Geology of Goa (Iron Ore Haematite/Magnetite & Bauxite deposits), Hydrogeology, and Environmental Mining Rehabilitation.

## 3. Class XI Promotional Examination & HSSC Continuity
Under **`GBSHSE_CLASS11_TO_CLASS12_DEPENDENCY`**:
- Continuous attendance (>= 75% across Class XI and XII) and qualifying the institutional Class XI promotion examination are mandatory prerequisites for HSSC registration.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_GBSHSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-ga-c12-commerce",
        "subject_id": "goa-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "GBSHSE Class 12 Higher Secondary (HSSC) Commerce Stream Master Guide",
        "summary": "Authoritative syllabus guide for GBSHSE Higher Secondary School Certificate (HSSC) Commerce stream: 600 aggregate marks across subjects, 80 Theory + 20 Project/IA evaluation structure, passing rule 26 in Theory + 7 in Project (33% combined), 15 minutes reading time, covering Accountancy, Business Studies, Economics, Banking & Secretarial Practice, and Commercial Mathematics.",
        "content": """# GBSHSE Higher Secondary (HSSC) Class 12 Commerce Stream Master Guide

## 1. Examination Scheme & Evaluation Structure
GBSHSE Higher Secondary Commerce stream adheres to modern corporate governance, financial management, and statutory accounting principles:
- **Evaluation Split:** 80 Marks Theory Paper + 20 Marks Project / Practical / Viva Voce.
- **Passing Threshold:** Minimum 26 marks in Theory (out of 80) and 7 marks in Project (out of 20), totaling minimum 33 marks per subject and 33% aggregate.
- **Reading Time:** 15 minutes dedicated reading time before the 3-hour examination.

## 2. Core Commerce Disciplines
- **Accountancy (`goa-c12-accountancy`):** Partnership Accounts (Admission, Retirement, Death, Dissolution), Accounting for Share Capital & Debentures, Financial Statement Analysis (Ratios, Cash Flow Statement as per AS-3 / Ind AS 7).
- **Business Studies (`goa-c12-business-studies`):** Principles and Functions of Management (Fayol & Taylor, Planning, Organising, Staffing, Directing, Controlling), Business Finance, Capital Markets, Marketing Management (4Ps) and Consumer Protection Act 2019.
- **Economics (`goa-c12-economics`):** Macroeconomics (National Income, Money & Banking, Multiplier, Government Budget, Balance of Payments) and Indian Economic Development (1991 LPG Reforms, Rural Development, Sustainable Tourism and Mining in Goa).
- **Banking & Secretarial Practice (`goa-c12-banking`):** Indian Banking Structure, Reserve Bank of India monetary tools, Negotiable Instruments Act, Digital Banking (UPI, RTGS, IMPS), and Company Secretary duties, meetings, resolutions, and governance.
- **Commercial Mathematics & Statistics (`goa-c12-commercial-maths`):** Mathematical logic, matrix input-output analysis, marginal functions, annuities, correlation, regression, time series and probability distributions.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_GBSHSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-ga-c12-humanities-languages",
        "subject_id": "goa-c12-history",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "GBSHSE Class 12 Higher Secondary (HSSC) Humanities & Modern Indian Languages Master Guide",
        "summary": "Authoritative syllabus guide for GBSHSE Higher Secondary (HSSC) Humanities / Arts and Modern Indian Languages: comprehensive coverage of History (Indian & Goan Liberation History), Political Science, Sociology, Psychology, Geography, Philosophy, English Core, Konkani Sahitya, Marathi Sahitya, and Hindi Sahitya.",
        "content": """# GBSHSE Higher Secondary (HSSC) Class 12 Humanities & Languages Guide

## 1. Academic Scope & Evaluation Scheme
The Humanities Stream under GBSHSE offers deep analytical foundations in social sciences and literary arts:
- **Theory / Practical Split:** 80 Theory + 20 IA for History, Political Science, Sociology, Philosophy, and Languages; 70 Theory + 30 Practical for Psychology and Geography.
- **Pass Threshold:** 33% combined with 15 minutes dedicated reading time.

## 2. Humanities Electives
- **History (`goa-c12-history`):** Ancient, Medieval, and Modern Indian history themes. Comprehensive Goa History: Portuguese colonial impact, Cuncolim Revolt (1583), Pinto Revolt (1787), 18 June 1946 Civil Disobedience under Dr. Ram Manohar Lohia, Operation Vijay (19 December 1961), Historic Opinion Poll (16 January 1967), and Goa Statehood (30 May 1987).
- **Political Science (`goa-c12-political-science`):** Post-Cold War Global Politics (UN, Disintegration of USSR, Rise of China/EU/BRICS) and Politics in India since Independence (Nation-building, Coalition Governments, Regional Aspirations).
- **Sociology (`goa-c12-sociology`):** Structure of Indian Society, Demographic Trends, Caste/Class dynamics, Social Movements, and Goa's indigenous Communidade (Gaunkari) system.
- **Psychology (`goa-c12-psychology`):** Intelligence theories, personality assessments, stress coping, clinical psychological disorders, CBT, and therapeutic ethics.
- **Geography (`goa-c12-geography`):** Human Geography, World Population, Economic Activities, and India's spatial resources, Western Ghats biodiversity, and Goan coastal geomorphology.
- **Philosophy (`goa-c12-philosophy`):** Orthodox/Heterodox Indian thought (Carvaka, Jaina Syadvada, Buddhist Pratityasamutpada, Samkhya, Advaita Vedanta), Western ethics (Kant, Utilitarianism), and deductive logic.

## 3. Modern Indian Languages (MIL) Core
- **English Core (`goa-c12-english`):** Advanced discursive reading, executive business writing, Flamingo and Vistas literary critique.
- **Konkani Sahitya (`goa-c12-konkani`):** Higher Secondary modern Konkani poetry, prose, drama, Tiatr traditions, and linguistic history in Devanagari script.
- **Marathi Sahitya (`goa-c12-marathi`):** Classical Sant Sahitya, modern essays, drama, and advanced communicative writing.
- **Hindi Sahitya (`goa-c12-hindi`):** Aroh prose and poetry, Vitan supplementary, and mass communication media writing.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_GBSHSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_file = os.path.join(os.path.dirname(__file__), "ga_bundled_notes.json")
with open(out_file, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"Compiled {len(NOTES)} Master Bundled Study Notes -> saved to {out_file}")

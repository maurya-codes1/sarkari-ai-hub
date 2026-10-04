import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("Compiling BOSSE Sikkim Master Bundled Study Notes (5 Comprehensive Guides)...")

NOTES = [
    {
        "note_id": "note-sk-c10-core",
        "subject_id": "sk-c10-nepali",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "BOSSE Sikkim Secondary (Class 10 Equivalent) Master Academic & Open Schooling Blueprint",
        "summary": "Authoritative architectural blueprint covering BOSSE Sikkim Secondary open schooling scheme: 5 subjects minimum requirement (at least 1 language), 100 marks evaluation per subject, continuous self-study through Self-Instructional Material (SIM), Tutor Marked Assignments (TMA), 5-year registration validity with up to 9 examination attempts, Credit Transfer (TOC), and authentic Nepali state language integration.",
        "content": """# BOSSE Sikkim Secondary (Class 10 Equivalent) Master Academic & Open Schooling Blueprint

## 1. Statutory Authority and Open Schooling Framework
The **Board of Open Schooling and Skill Education (BOSSE), Sikkim** was established by the Government of Sikkim under the statutory authority of the *Board of Open Schooling and Skill Education, Sikkim Act, 2020 (Act No. 14 of 2020)*.
- **Headquarters:** NH-10, 5th Mile, Tadong, Gangtok, East Sikkim - 737102.
- **Official Domain:** https://www.bosse.ac.in/
- **Recognition:** Recognized by AIU (Association of Indian Universities), NIOS equivalence, and member of COBSE (Council of Boards of School Education in India).
- **Core Educational Mandate:** Providing non-formal, flexible, self-paced secondary and skill education to learners, out-of-school youths, working professionals, and rural learners across Sikkim and nationwide.

## 2. Admission Gating and Non-Applicability of Conventional Class 9 Promotion
Unlike conventional state schooling boards that mandate a rigid Class 9 school examination pass before enrolling in Class 10:
- **Direct Secondary Entry:** Candidates aged 14 years or above with basic self-certificate of literacy or prior schooling up to Class 8 are directly eligible for Secondary admission.
- **Class 9 Scope:** Conventional annual promotion examination is **`NOT_APPLICABLE`**. Zero public board examinations exist for Class 9 under BOSSE.
- **Validity of Enrolment:** Registration remains valid for **5 years** from the date of admission, allowing learners up to **9 examination chances** across semi-annual block sessions.

## 3. Secondary Curriculum Structure and Passing Criteria
Learners must register for a minimum of 5 subjects (with at least 1 language, maximum 2 languages in the core five) and can choose up to 2 additional subjects:
1. **Compulsory Language:** Nepali (नेपाली - Official State Language of Sikkim), English, Hindi, or Bengali.
2. **Academic Subjects:** Mathematics, Science and Technology, Social Science, Business Studies, Economics, ICT / Data Entry Operations.
3. **Continuous Assessment (TMA):** 20% weightage allocated to Tutor Marked Assignments (TMA) submitted to study centres, with 80% weightage for Term-End Examination (TEE).
4. **Passing Standard:** Minimum 33% marks in each subject (Theory + Practical/TMA combined) and passing in at least 5 subjects including at least one language.
5. **Transfer of Credit (TOC):** Ex-students from recognized boards (CBSE, NIOS, State Boards) can transfer up to 2 passed subjects into their BOSSE record.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_BOSSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-sk-c12-science",
        "subject_id": "sk-c12-physics",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "BOSSE Sikkim Senior Secondary Science Stream Master Curriculum & Laboratory Guide",
        "summary": "Authoritative guide for BOSSE Senior Secondary Science: flexible subject combination model, Physics, Chemistry, Biology, and Mathematics curricula, theoretical mastery (80/70 marks) coupled with practical laboratory sessions (20/30 marks), Personal Contact Programmes (PCP), and Himalayan biodiversity applications.",
        "content": """# BOSSE Sikkim Senior Secondary Science Stream Master Curriculum & Laboratory Guide

## 1. Flexible Subject Selection (No Rigid Stream Barriers)
BOSSE Senior Secondary operates under a **Flexible Subject Selection Model**:
- Learners are not constrained by traditional stream barriers; science learners can combine Physics, Chemistry, Biology, and Mathematics with computer science, languages, or vocational trades such as Tourism or Entrepreneurship.
- Eligibility: Secondary (Class 10) pass from BOSSE or any recognized board with minimum age 15+.
- Registration validity: 5 continuous years with semi-annual examination cycles (April-May & October-November) and On-Demand Examination (ODE) options.

## 2. Theory and Practical Architecture
1. **Physics:** Electrostatics, Current Electricity, Magnetism, EMI, AC Circuits, Wave Optics, Atoms & Nuclei, Semiconductor Electronics. Practical includes vernier calipers, potentiometer, focal length determination, and prism experiments.
2. **Chemistry:** Solid State, Solutions, Electrochemistry, Kinetics, Coordination Compounds, Organic Synthesis, Biomolecules. Practical includes volumetric titration, salt analysis, and functional group tests.
3. **Biology:** Reproduction, Molecular Basis of Inheritance, Biotechnology, Human Health, and Ecology with special focus on the Eastern Himalayan Biodiversity Hotspot and Khangchendzonga National Park biosphere.
4. **Mathematics:** Calculus (Differential & Integral), Vectors, 3D Geometry, Linear Programming, and Probability.
5. **Personal Contact Programmes (PCP):** Mandatory practical PCP sessions (minimum 30 days) conducted at accredited study centres to provide hands-on laboratory experience.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_BOSSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-sk-c12-commerce",
        "subject_id": "sk-c12-accountancy",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "BOSSE Sikkim Senior Secondary Commerce & Management Studies Master Blueprint",
        "summary": "Authoritative curriculum blueprint for BOSSE Senior Secondary Commerce subjects: Accountancy (Partnership, Companies, Cash Flow), Business Studies (Principles of Management, Financial Markets, Consumer Protection), and Economics (Macroeconomics, Indian Economic Development, and Mountain Fiscal Systems).",
        "content": """# BOSSE Sikkim Senior Secondary Commerce & Management Studies Master Blueprint

## 1. Commerce Curriculum Framework
BOSSE provides an industry-aligned commerce curriculum tailored for self-directed learners, budding entrepreneurs, and future accounting professionals:
- **Accountancy:** Partnership Accounting (Admission, Retirement, Death, Dissolution), Accounting for Share Capital and Debentures, Analysis of Financial Statements, Accounting Ratios, and Cash Flow Statement (AS-3).
- **Business Studies:** Fayol and Taylor's Principles of Management, Functions of Management (POSDCORB), Capital Structure, Money & Capital Markets, SEBI Regulations, and Consumer Protection Act 2019.
- **Economics:** Macroeconomic theory (National Income, Aggregate Demand, Fiscal Policy, Central Banking) alongside Indian Economic Development and sustainable growth models.

## 2. Tutor Marked Assignments (TMA) and Assessment Mechanism
- 20 Marks TMA + 80 Marks Term-End Examination.
- Real-world case study evaluations: Analysis of local Himalayan cooperative societies, tea estate bookkeeping, and tourism service accounting.
- Pass mark: 33% aggregate in each subject.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_BOSSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-sk-c12-humanities",
        "subject_id": "sk-c12-political-science",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "BOSSE Sikkim Senior Secondary Humanities, Social Sciences & Law Master Guide",
        "summary": "Comprehensive syllabus guide covering BOSSE Senior Secondary Humanities: Political Science (including Article 371F and Sikkim statehood), History (from Harappa to Indian Independence and Chogyal transition), Geography (Himalayan physiography, GIS, toposheets), Sociology, Psychology, Family Studies, and Law, Justice & Governance.",
        "content": """# BOSSE Sikkim Senior Secondary Humanities, Social Sciences & Law Master Guide

## 1. Multidisciplinary Social Sciences & Sikkim Constitutional Status
BOSSE Senior Secondary Humanities offers deep engagement with history, society, governance, and law:
1. **Political Science:** World politics, Indian democracy, federalism, regional autonomy, and **Article 371F of the Indian Constitution** (Special provisions respecting the State of Sikkim, preservation of old laws, and democratic transition of 1975).
2. **History:** Ancient civilizations, medieval religious traditions, Vijayanagara Empire, colonial rule, 1857 Revolt, freedom movement, and the modern history of Sikkim.
3. **Geography:** Human geography, resource utilization, mountain geomorphology, landslide mitigation, fragile Himalayan ecosystems, and practical GIS/cartography.
4. **Sociology & Psychology:** Indian social structure, caste/tribal dynamics, social movements, psychological attributes, stress coping, clinical therapies, and community well-being.
5. **Law, Justice & Governance:** Indian judicial system, constitutional rights, Alternative Dispute Resolution (ADR), legal aid, cyber laws, environmental jurisprudence, and Sikkim local customary governance.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_BOSSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    },
    {
        "note_id": "note-sk-c12-skills",
        "subject_id": "sk-c12-tourism",
        "language_id": "en",
        "note_type": "SYLLABUS_REVISION_BUNDLE",
        "title": "BOSSE Sikkim Senior Secondary Skill, Vocational & Technology Master Framework",
        "summary": "Comprehensive framework detailing BOSSE's flagship skill and vocational disciplines: Tourism & Hospitality Management (Himalayan ecotourism, homestays, KNP UNESCO heritage), Digital Literacy & CS (Python, SQL, Networking), Media & Communication Studies, Entrepreneurship (organic agriculture ventures, floriculture), and advanced language proficiency in Nepali, English, and Hindi.",
        "content": """# BOSSE Sikkim Senior Secondary Skill, Vocational & Technology Master Framework

## 1. Flagship Vocational and Skill Education Pathways
BOSSE was established with a dual mandate: **Open Schooling + Skill Education**. The curriculum incorporates NSQF-aligned skill subjects designed to empower employment and entrepreneurship in Sikkim and the Himalayan belt:
1. **Tourism & Hospitality Management:**
   - 5 As of tourism, front office, housekeeping, and F&B service.
   - Ecotourism in Sikkim: Village homestay models (Dzongu, Yuksom, Lachung), Khangchendzonga National Park (UNESCO Mixed World Heritage Site), monastery circuits, and trekking safety.
2. **Digital Literacy & Computer Science:**
   - Computational thinking in Python (data structures, file handling, algorithms).
   - Relational database management with SQL, computer networks, cyber laws, and digital public infrastructure (UPI, DigiLocker).
3. **Media and Communication Studies:**
   - Journalism fundamentals, radio/TV production, digital content creation, media ethics, and documentation of indigenous Himalayan cultures.
4. **Entrepreneurship:**
   - Business planning, opportunity sensing, startup finance, and Himalayan micro-enterprises (organic farming value addition, cardamom processing, homestay branding).
5. **Languages (Nepali, English, Hindi):**
   - High-level functional and literary communication, translation studies, and Devanagari script mastery for state administrative and literary pursuits.
""",
        "verification_status": "VERIFIED",
        "version": 1,
        "content_depth": "COMPREHENSIVE",
        "provenance": "OFFICIAL_BOSSE_SYLLABUS_REGULATION",
        "priority_tier": "TIER_1"
    }
]

out_path = os.path.join(os.path.dirname(__file__), "sk_bundled_notes.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(NOTES, f, ensure_ascii=False, indent=2)

print(f"Successfully compiled {len(NOTES)} BOSSE master bundled study notes. Saved to {out_path}.")

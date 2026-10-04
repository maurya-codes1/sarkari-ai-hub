# SARKARIAI HUB — BOARD #29: BOARD OF SCHOOL EDUCATION HARYANA (HBSE / BSEH)
## Final Integration & Comprehensive Forensic Audit Report

---

### A. Live Baseline & Board Identification
- **Board Name:** Board of School Education Haryana (हरियाणा विद्यालय शिक्षा बोर्ड)
- **Common Short Name:** HBSE
- **Official Abbreviation:** BSEH
- **Canonical Board ID:** `hbse-haryana`
- **Recognized Aliases:** `hbse-haryana`, `hbse`, `bseh`, `hbse-board`
- **Statutory Authority:** Haryana Board of School Education Act, 1969 (Haryana Act No. 11 of 1969)
- **Headquarters:** Hansi Road, Bhiwani, Haryana - 127021
- **Official Portal:** `https://bseh.org.in/`
- **Results Portal:** `https://bseh.org.in/all-results`
- **Department:** Directorate of School Education, Government of Haryana (`https://schooleducationharyana.gov.in/`)
- **Academic Research Partner:** State Council of Educational Research and Training (SCERT) Haryana, Gurugram (`https://scertharyana.gov.in/`)

---

### B. Examination Ecosystem & Scope Audit
1. **Class 9 (Preparatory Secondary):**
   - Public Board Exam: **NONE** (`ACADEMIC_SUPPORT_ONLY`).
   - Annual Institutional Examination administered by affiliated schools following BSEH curriculum.
   - Enrolment and promotion are prerequisites for Class 10 Board Registration (`BSEH_CLASS9_TO_CLASS10_DEPENDENCY`).
2. **Class 10 (Secondary Examination):**
   - State terminal public board examination awarding Matriculation certificate.
   - 10 primary subjects registered: 2,800 practice questions (2,050 MCQs + 750 Subjectives).
3. **Class 11 (Preparatory Senior Secondary):**
   - Public Board Exam: **NONE** (`ACADEMIC_SUPPORT_ONLY`).
   - Institutional annual examination conducted at school level; requires 75% minimum attendance across Classes 11 and 12 and stream continuity to register for Class 12 (`BSEH_CLASS11_TO_CLASS12_DEPENDENCY`).
4. **Class 12 (Senior Secondary Examination):**
   - State terminal public board examination across Science, Commerce, Humanities, and Languages streams.
   - 21 primary subjects registered: 5,880 practice questions (4,305 MCQs + 1,575 Subjectives).
5. **Haryana Open School (HOS):**
   - Autonomous statutory wing established by BSEH in 1994 providing open school education for Secondary and Senior Secondary with credit accumulation (`hos_pathway`).

---

### C. Primary Subject Breakdown (31 Subjects $	imes$ 280 = 8,680 Questions)

#### Class 10 Secondary (10 Subjects = 2,800 Questions):
1. `hbse-c10-hindi`: Hindi (अनिवार्य हिन्दी - क्षितिज एवं कृतिका) [Devanagari, 80 Th + 20 IA]
2. `hbse-c10-english`: English (Language & Literature - First Flight) [Latin, 80 Th + 20 IA]
3. `hbse-c10-mathematics`: Mathematics (गणित) [Latin/English, 80 Th + 20 IA]
4. `hbse-c10-science`: Science (विज्ञान) [Latin/English, 60 Th + 20 Pr + 20 IA]
5. `hbse-c10-social-science`: Social Science (सामाजिक विज्ञान) [Latin/English, 80 Th + 20 IA]
6. `hbse-c10-sanskrit`: Sanskrit (संस्कृत - शेमुषी भाग-2 एवं व्याकरण) [Devanagari, 80 Th + 20 IA]
7. `hbse-c10-punjabi`: Punjabi (ਪੰਜਾਬੀ - ਸਾਹਿਤ ਮਾਲਾ / ਵੰਨਗੀ) [Gurmukhi, 80 Th + 20 IA]
8. `hbse-c10-urdu`: Urdu (اردو - نواۓ اردو / قواعد) [Perso-Arabic, 80 Th + 20 IA]
9. `hbse-c10-haryana-heritage`: Haryana Heritage, Culture & Physical Education [Devanagari, 80 Th + 20 IA]
10. `hbse-c10-computer-science`: Computer Science & IT [Latin/English, 60 Th + 20 Pr + 20 IA]

#### Class 12 Senior Secondary (21 Subjects = 5,880 Questions):
- **Science Stream (6 Subjects = 1,680 Questions):**
  1. `hbse-c12-physics`: Physics [70 Th + 30 Pr]
  2. `hbse-c12-chemistry`: Chemistry [70 Th + 30 Pr]
  3. `hbse-c12-mathematics`: Mathematics [80 Th + 20 IA]
  4. `hbse-c12-biology`: Biology [70 Th + 30 Pr]
  5. `hbse-c12-computer-science`: Computer Science (Python/SQL) [70 Th + 30 Pr]
  6. `hbse-c12-agriculture`: **Agriculture** *(Haryana Agrarian Signature Discipline)* [70 Th + 30 Pr]
- **Commerce Stream (5 Subjects = 1,400 Questions):**
  7. `hbse-c12-accountancy`: Accountancy [80 Th + 20 Project]
  8. `hbse-c12-business-studies`: Business Studies [80 Th + 20 Project]
  9. `hbse-c12-economics-commerce`: Business Economics [80 Th + 20 Project]
  10. `hbse-c12-entrepreneurship`: Entrepreneurship [70 Th + 30 Project]
  11. `hbse-c12-commercial-art`: **Commercial Art** *(Trade Graphics Signature)* [70 Th + 30 Pr]
- **Humanities / Arts Stream (6 Subjects = 1,680 Questions):**
  12. `hbse-c12-history`: History [80 Th + 20 IA]
  13. `hbse-c12-political-science`: Political Science [80 Th + 20 IA]
  14. `hbse-c12-geography`: Geography [70 Th + 30 Pr]
  15. `hbse-c12-public-administration`: **Public Administration** *(Senior Secondary Signature)* [80 Th + 20 IA]
  16. `hbse-c12-sociology`: Sociology [80 Th + 20 IA]
  17. `hbse-c12-physical-education`: **Physical Education & Sports** *(Sports Capital Discipline)* [70 Th + 30 Pr]
- **Languages Stream (4 Subjects = 1,120 Questions):**
  18. `hbse-c12-hindi-core`: Hindi Core (आरोह एवं वितान) [Devanagari, 80 Th + 20 IA]
  19. `hbse-c12-english-core`: English Core (Flamingo & Vistas) [Latin, 80 Th + 20 IA]
  20. `hbse-c12-punjabi`: Punjabi Elective (ਪੰਜਾਬੀ ਚੋਣਵੀਂ) [Gurmukhi, 80 Th + 20 IA]
  21. `hbse-c12-sanskrit`: Sanskrit (भास्वती) [Devanagari, 80 Th + 20 IA]

---

### D. Linguistic & Script Authenticity
1. **Hindi & Sanskrit:** Rendered in authentic native Devanagari script (`U+0900`–`U+097F`).
2. **English:** Rendered in standard Latin script (`U+0020`–`U+007E`).
3. **Punjabi:** Rendered in authentic Gurmukhi script (`U+0A00`–`U+0A7F`) with Gurmukhi option keys (`ਵਿਕਲਪ ੳ`, `ਵਿਕਲਪ ਅ`, `ਵਿਕਲਪ ੲ`, `ਵਿਕਲਪ ਸ`).
4. **Urdu:** Rendered in authentic Perso-Arabic script (`U+0600`–`U+06FF`) with RTL text layout (`direction: 'rtl'`).

---

### E. Question Bank Breakdown & Statistical Rigor
- **Total Questions Added:** **8,680** (Class 10: 2,800 + Class 12: 5,880).
- **MCQ Count:** **6,355** (205 per subject across 31 subjects).
  - Answer keys: Even 4-way balanced distribution (~25% each A, B, C, D; 0.00% generator bias).
  - All MCQs marked `practice_eligible: 1` and `full_exam_eligible: 1`.
- **Subjective Count:** **2,325** (75 per subject across 31 subjects).
  - 744 Very Short Answer (VSA, 2 marks)
  - 744 Short Answer (SA, 3 marks)
  - 372 Case Study / Activity (4 marks)
  - 465 Long Answer (LA, 5 marks)
  - 100% of subjective items include model answers $\ge 20$ characters, step-by-step marking rubrics, and conceptual points.
- **Master Bundled Study Notes:** **5 Comprehensive Notes** covering secondary and senior secondary streams.

---

### F. Database Impact & Integrity Reconciliation
- **Pre-Mutation Total Questions:** **250,870** (Prior 28 Boards: 235,480 + Competitive: 15,390)
- **HBSE Questions Added:** **8,680**
- **Post-Mutation Total Questions:** **259,550** ($250,870 + 8,680 = 259,550$)
- **Foreign Key Check:** 0 violations (`PRAGMA foreign_key_check`)
- **Integrity Check:** `ok` (`PRAGMA integrity_check`)
- **Pre-Mutation Hash:** `64BCE4B66A456F09CA6A6B029B2952BB08D49BC1289AE40A51833FF97869C7AB`
- **Post-Mutation Hash:** `F19CD73186CB375ACD811055CB7D3201A31859AC3DC62865CB2F73963235D2DC`

---

### G. Haryana Regional & Cultural Heritage Grounding
1. **Ancient Civilizations:** Rakhigarhi (largest Harappan metropolis), Banawali, Kunal, Saraswati river paleochannels.
2. **Mahabharata Heritage:** Kurukshetra, Jyotisar (Bhagavad Gita sermon), Brahma Sarovar.
3. **Historical Battlefields:** The three historic battles of Panipat (1526, 1556, 1761).
4. **Heroic Traditions:** Rao Tula Ram (1857 Rewari uprising, Haryana Veer Shaheed Diwas), Raja Nahar Singh (Ballabhgarh), Sir Chhotu Ram (peasant reformer, debt relief acts, Bhakra Dam architect).
5. **Sports Capital:** Kushti / wrestling akhadas (Sushil, Yogeshwar, Phogat sisters), Bhiwani Boxing Club ("Mini Cuba"), Neeraj Chopra (Olympic Gold javelin champion from Panipat).
6. **Agrarian & Industrial Wealth:** Murrah buffalo ("Black Gold"), NDRI and CSSRI Karnal, Green Revolution wheat/rice belt, Gurugram cyber/auto hub, Faridabad engineering, Panipat textile weavers.

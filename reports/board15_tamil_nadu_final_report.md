# SARKARIAI HUB — BOARD #15: TAMIL NADU DGE PRODUCTION DEPLOYMENT REPORT

## 1. Executive Summary & Forensic Identity

- **Board Name:** Directorate of Government Examinations, Tamil Nadu (DGE Tamil Nadu)
- **Ecosystem Board ID:** `tamil-nadu-dge`
- **Authority Board ID:** `dge-tamil-nadu`
- **Official Organization:** `org-directorate-of-government-examinations-c`
- **Official Websites:** `https://www.dge.tn.gov.in/` | `https://tnresults.nic.in/` | `https://emis.tnschools.gov.in/`
- **Active Academic Session:** 2026–2027 (Exam Year: 2027)
- **Total Newly Ingested Questions:** **8,680 Questions** across 31 Primary Subjects
  - Objective Questions (MCQs): 6,355 Items (205 MCQs $\times$ 31 Subjects)
  - Subjective Descriptive Items: 2,325 Items (75 Items $\times$ 31 Subjects: 24 VSA, 24 SA, 12 Case Study, 15 LA)
- **Master Bundled Study Notes:** 5 Comprehensive Guides
- **Total Post-Deployment Database Count:** **143,630 Questions**
  - Baseline Prior 14 Boards + Competitive Exams: 134,950 Questions
  - Tamil Nadu Net Ingestion: +8,680 Questions (Exact Mathematical Match, $\Delta = 0$)
- **Cryptographic Signatures:**
  - Pre-Mutation Snapshot SHA-256: `6CFAA645CEA4CBF02300408B0D8E2A70D4B781537190E17A7FD6D2088C95E166`
  - Post-Mutation Snapshot SHA-256: `02944895C28D1E86DD91E5D58532BB63108DFB380B95F11355DCACA1973D2226`

---

## 2. Academic Architecture

### A. Class 10 (SSLC Examination)
- **Framework:** Part I to Part IV Scheme (500 Total Marks)
- **Part I:** Compulsory Tamil (100 Marks) under Tamil Nadu Tamil Learning Act, 2006.
- **Part II:** General English (100 Marks).
- **Part III:** Core Subjects (Mathematics 100M, Science 100M, Social Science 100M).
  - **Science Structure:** 75 Marks Theory + 25 Marks Practical (Minimum Passing: 20 in theory + 15 in practical = 35 minimum).
- **Part IV:** Optional Languages (Telugu, Hindi, Arabic, Malayalam, Kannada, Gujarati, Sanskrit, French, Urdu).
- **Languages / Mediums for Part III:** Question papers officially available in Tamil, English, Telugu, Kannada, Malayalam, Hindi, Gujarati, Urdu.

### B. Class 9 (Continuous and Comprehensive Evaluation)
- Non-terminal public examination; internal institutional assessment managed via EMIS.
- Dependency identifier: `TAMIL_NADU_CLASS9_TO_CLASS10_DEPENDENCY`.

### C. Class 11 & Class 12 (Higher Secondary +1 and +2)
- Total Maximum Marks: **600 Marks** (6 subjects $\times$ 100 marks each)
  - Part I: Language (Tamil, Hindi, French, German, Telugu, Kannada, Malayalam, Sanskrit, Urdu, Arabic) - 100 Marks
  - Part II: General English - 100 Marks
  - Part III: Four Group-Specific Optionals (400 Marks)
- **Stream Combinations Codified:**
  - Science: Group 2501 (Bio-Maths), Group 2502 (Computer Science), Group 2503 (Pure Science)
  - Commerce: Group 2701 (Commerce with Business Maths), Group 2702 (Commerce with Computer Applications)
  - Humanities: Group 2801 (Humanities & Social Sciences), Group 2802 (Ethics & Culture / Advanced Tamil)
  - Vocational: Engineering & Tech, Health & Agriculture, Textile & Management
- Dependency identifier: `TAMIL_NADU_CLASS11_TO_CLASS12_DEPENDENCY` (Strict 6-subject combination continuity).

---

## 3. Curriculum & Subject Breakdown (31 Primary Subjects)

### Class 10 SSLC (10 Primary Subjects — 2,800 Questions)
1. `tn-c10-tamil-fl` — Part I Compulsory Tamil (பொதுத் தமிழ்)
2. `tn-c10-english-sl` — Part II General English
3. `tn-c10-mathematics-en` — Mathematics (English Medium)
4. `tn-c10-mathematics-ta` — Mathematics (Tamil Medium - கணிதம்)
5. `tn-c10-science-en` — Science (English Medium - 75 Theory + 25 Practical)
6. `tn-c10-science-ta` — Science (Tamil Medium - அறிவியல்: 75 தியரி + 25 செய்முறை)
7. `tn-c10-social-science-en` — Social Science (English Medium)
8. `tn-c10-social-science-ta` — Social Science (Tamil Medium - சமூக அறிவியல்)
9. `tn-c10-hindi-opt` — Part IV Optional Language Hindi (हिन्दी)
10. `tn-c10-telugu-opt` — Part IV Optional Language Telugu (తెలుగు)

### Class 12 Higher Secondary (+2) (21 Primary Subjects — 5,880 Questions)
#### Part I & II Languages (4 Subjects)
11. `tn-c12-tamil-part1` — Part I Tamil (பொதுத் தமிழ்)
12. `tn-c12-english-part2` — Part II English (General English)
13. `tn-c12-hindi-part1` — Part I Hindi (सामान्य हिन्दी)
14. `tn-c12-french-part1` — Part I French (Français)

#### Part III Science Electives (7 Subjects)
15. `tn-c12-physics` — Physics (இயற்பியல் - 70 Theory + 30 Practical/IA)
16. `tn-c12-chemistry` — Chemistry (வேதியியல் - 70 Theory + 30 Practical/IA)
17. `tn-c12-mathematics` — Mathematics (கணிதவியல் - 90 Theory + 10 IA)
18. `tn-c12-biology` — Biology (பொது உயிரியல் - 70 Theory + 30 Practical/IA)
19. `tn-c12-computer-science` — Computer Science (கணினி அறிவியல் - 70 Theory + 30 Practical/IA)
20. `tn-c12-botany` — Botany (தாவரவியல் / Bio-Botany - 70 Theory + 30 Practical/IA)
21. `tn-c12-zoology` — Zoology (விலங்கியல் / Bio-Zoology - 70 Theory + 30 Practical/IA)

#### Part III Commerce Electives (5 Subjects)
22. `tn-c12-accountancy` — Accountancy (கணக்குப்பதிவியல் - 90 Theory + 10 IA)
23. `tn-c12-commerce` — Commerce (வணிகவியல் - 90 Theory + 10 IA)
24. `tn-c12-economics` — Economics (பொருளியல் - 90 Theory + 10 IA)
25. `tn-c12-business-maths` — Business Mathematics & Statistics (வணிகக் கணிதம் - 90 Theory + 10 IA)
26. `tn-c12-computer-applications` — Computer Applications (கணினி பயன்பாடுகள் - 70 Theory + 30 Practical/IA)

#### Part III Humanities / Arts Electives (5 Subjects)
27. `tn-c12-history` — History (வரலாறு - 90 Theory + 10 IA)
28. `tn-c12-political-science` — Political Science (அரசியல் அறிவியல் - 90 Theory + 10 IA)
29. `tn-c12-geography` — Geography (புவியியல் - 70 Theory + 30 Practical/IA)
30. `tn-c12-ethics-culture` — Ethics and Indian Culture (அறவியலும் இந்தியப் பண்பாடும் - 90 Theory + 10 IA)
31. `tn-c12-advanced-tamil` — Advanced Language Tamil (சிறப்புத் தமிழ் - 90 Theory + 10 IA)

---

## 4. Question Pedagogy & Balance Verification

- **Cyclic Answer Key Balance:**
  - Option A: 1,589 items (25.00%)
  - Option B: 1,589 items (25.00%)
  - Option C: 1,589 items (25.00%)
  - Option D: 1,588 items (25.00%)
  - **Generator Bias:** **0.00%**
- **Subjective Typology:**
  - VSA (2 Marks): 24 items per subject
  - SA (3 Marks): 24 items per subject
  - Case Study / Practical Application (4 Marks): 12 items per subject
  - Long Answer / Essay / Derivation (5 Marks): 15 items per subject
  - Step-by-step rubrics and model answers ($\ge 20$ chars, avg 240 chars) present for 100% of questions.

---

## 5. Master Bundled Revision Notes (5 Guides)

1. `note-tn-c10-sslc-core-compendium`: DGE Tamil Nadu Class 10 SSLC Core Subjects Master Revision Compendium.
2. `note-tn-c10-c12-tamil-literature-compendium`: Tamil Nadu School & Higher Secondary Tamil Literature & Grammar Master Compendium.
3. `note-tn-c12-science-compendium`: Tamil Nadu Higher Secondary (+2) Science Stream Master Compendium.
4. `note-tn-c12-commerce-compendium`: Tamil Nadu Higher Secondary (+2) Commerce Stream Master Compendium.
5. `note-tn-c12-humanities-compendium`: Tamil Nadu Higher Secondary (+2) Humanities & Social Sciences Master Compendium.

---

## 6. Zero Cross-Board Contamination Verification

Every Tamil Nadu question has been audited against all 14 prior completed boards:
- CBSE, PSEB, BSEB, UBSE, UPMSP, MPBSE, NIOS, RBSE, MSBSHSE, GSEB, West Bengal, Odisha, Andhra Pradesh, Karnataka.
- **Cross-Board Overlap:** **0.00% (Clean room isolation)**

---

## 7. Cryptographic Snapshot Hashes

- **Pre-Mutation Snapshot:** `backend/db/sarkari_core_pre_tamil_nadu.db`
  - SHA-256: `6CFAA645CEA4CBF02300408B0D8E2A70D4B781537190E17A7FD6D2088C95E166`
- **Post-Mutation Snapshot:** `backend/db/sarkari_core_post_tamil_nadu.db`
  - SHA-256: `02944895C28D1E86DD91E5D58532BB63108DFB380B95F11355DCACA1973D2226`

**Database Integrity:**
- `PRAGMA integrity_check`: `ok`
- `PRAGMA foreign_key_check`: `0 violations`

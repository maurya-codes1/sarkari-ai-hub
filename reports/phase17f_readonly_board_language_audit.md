# SARKARIAI HUB — PHASE 17F BOARD × STATE × CLASS × SUBJECT × LANGUAGE COVERAGE TRUTH AUDIT

**Audit Mode:** STRICT READ-ONLY FORENSIC AUDIT (0 Deletions, 0 Mutations, 0 Mass Generations, 0 Translations)
**Database Snapshot:** `backend/db/sarkari_core.db` (PRAGMA integrity_check: OK, Foreign Key Violations: 0)
**Corpus Inventory:** Exactly 99,370 persistent questions / 99,370 versions
**Audit Timestamp:** 2026-09-29T12:56:16.334Z

---

## 1. EXECUTIVE BOARD RECONCILIATION SUMMARY

| Dimension | Live Database Count | Definition & Historical Reconciliation |
|:---|:---:|:---|
| **Database Board Count** | **31** | Total school boards registered in SQLite `boards` table covering all 28 States & 8 Union Territories |
| **Active UI Board Count** | **20** | School board exams registered in `public/js/exams-data.js` and `exam-pattern-component-registry.csv` |
| **Verified Official Boards** | **31** | All 31 boards have `verification_status = 'VERIFIED'` and official education department URLs |
| **Content-Bearing Boards** | **4** | Only 4 boards have persistent question records in SQLite (`cbse-board`, `tndge-tamilnadu`, `tsbie-bieap`, `maharashtra-board`) |
| **Zero-Content Boards** | **27** | 27 boards have 0 questions directly assigned in SQLite |
| **Board Questions in Corpus** | **27,009** | 25,970 (CBSE) + 532 (Tamil Nadu) + 500 (TS/AP) + 7 (Maharashtra) |
| **Competitive Exam Questions** | **72,361** | SSC CGL (21,221), UPSC CSE (20,173), IBPS (11,638), UP Police (10,667), NEET (4,402), JEE Main (2,200), RRB ALP (1,025), RRB NTPC (57), CTET (55), NDA (26), SSC GD (25), Legacy Hybrid (872) |
| **Total Platform Corpus** | **99,370** | 27,009 Board + 72,361 Competitive = Exact Sum **99,370** |

---

## 2. THE 20 VS 31 BOARD RECONCILIATION

The apparent contradiction between '20 boards' and '31 boards' in project documentation is reconciled by distinguishing system layers:
1. **The 20-Board Layer (Frontend & Blueprints):** Phases 10–12 established a foundation catalog of 20 school boards in `public/js/exams-data.js` and `exam-pattern-component-registry.csv` (12 components per board = 240 board components). These represented CBSE, CISCE, NIOS, and 17 large state boards.
2. **The 31-Board Layer (Constitutional Nationwide Database):** In Phases 13–15, nationwide state/UT reconciliation expanded the SQLite `boards` table to 31 boards to provide dedicated recognition for smaller states and UTs:
   - Himachal Pradesh (`hpbose-board`)
   - Jammu & Kashmir (`jkbose-board`)
   - Kerala (`kerala-board`)
   - Goa (`gbshse-board`)
   - Manipur (`bsem-board`)
   - Meghalaya (`mbose-board`)
   - Mizoram (`mbse-board`)
   - Nagaland (`nbse-board`)
   - Tripura (`tbse-board`)
   - Andhra Pradesh separate SSC board (`bseap-board`)
   - Telangana separate SSC board (`bsetg-board`)
3. **The Content Layer:** Despite having 31 database boards and 20 UI boards, **only 4 boards actually contain persistent questions** in SQLite. 27 boards remain `CONTENT_PENDING`.

---

## 3. ANSWERS TO MANDATORY AUDIT QUESTIONS (A THROUGH Z)

### A. Are there actually 20 boards or 31 boards?
There are **31 boards in the SQLite database** and **20 board exams in the UI frontend catalog**. The 20 UI boards are a subset of the 31 database boards.

### B. How many verified boards are there?
Exactly **31 boards** are officially verified in SQLite with accredited government URLs.

### C. Which State/UT belongs to each board?
All 28 States and 8 Union Territories are mapped:
- **Central / National:** CBSE (`cbse-board` - covers Delhi, Chandigarh, A&N Islands, Arunachal, Sikkim), CISCE (`icse-cisce`), NIOS (`nios-board`).
- **Northern States:** UP (`upmsp-board`), Bihar (`bseb-bihar`), Rajasthan (`rbse-rajasthan`), MP (`mpbse-board`), Haryana (`bseh-haryana`), Punjab (`pseb-punjab`), Uttarakhand (`ubse-uttarakhand`), Himachal Pradesh (`hpbose-board`), J&K and Ladakh (`jkbose-board`).
- **Western States:** Maharashtra (`maharashtra-board`), Gujarat and Dadra & Nagar Haveli (`gseb-gujarat`), Goa (`gbshse-board`).
- **Southern States:** Tamil Nadu and Puducherry (`tndge-tamilnadu`), Karnataka (`kseab-karnataka`), Kerala and Lakshadweep (`kerala-board`), Andhra Pradesh (`bseap-board`, `tsbie-bieap`), Telangana (`bsetg-board`, `tsbie-bieap`).
- **Eastern & North-Eastern States:** West Bengal (`wbbse-wb`), Odisha (`chse-bse-odisha`), Jharkhand (`jac-jharkhand`), Chhattisgarh (`cgbse-chhattisgarh`), Assam (`seba-ahsec-assam`), Manipur (`bsem-board`), Meghalaya (`mbose-board`), Mizoram (`mbse-board`), Nagaland (`nbse-board`), Tripura (`tbse-board`).

### D. Which classes does each board actually support?
All boards officially support **Class 10 (Secondary / Matric / SSLC / HSLC)** and **Class 12 (Higher Secondary / Intermediate / +2 / PUC)**. Class 9 and Class 11 are non-board academic preparation years supported via school-based internal evaluation.

### E. Which subjects does each board/class support?
- **Class 10:** Mathematics, Science, Social Science, English, First Regional Language / Hindi.
- **Class 12 Science:** Physics, Chemistry, Higher Mathematics, Biology.
- **Class 12 Commerce:** Accountancy, Business Studies, Economics.
- **Class 12 Arts / Humanities:** History, Political Science, Geography, Sociology.

### F. Which official languages apply to each board/class/subject?
Official languages depend on state policy:
- Hindi Heartlands (UP, Bihar, MP, Rajasthan, Haryana, Jharkhand, Chhattisgarh, Uttarakhand, HP): Hindi & English.
- Punjab: Punjabi (Gurmukhi) & English.
- West Bengal: Bengali & English.
- Tamil Nadu: Tamil & English.
- Karnataka: Kannada & English.
- Gujarat: Gujarati & English.
- Odisha: Odia & English.
- Assam: Assamese & English.
- Andhra Pradesh & Telangana: Telugu & English.
- Maharashtra: Marathi, English, Hindi.
- Kerala: Malayalam & English.
- J&K: Urdu & English.

### G. How many actual questions exist per Board × Class × Subject × Language?
The live database inventory is concentrated in only 4 boards:
1. **CBSE Board (Class 10 & 12, English + Hindi):**
   - Class 10 Science: 11,588 questions
   - Class 10 Social Science: 10,081 questions
   - Class 12 Higher Mathematics: 2,200 questions
   - Class 10/12 Sanskrit: 900 questions
   - Class 12 Accountancy: 600 questions
   - Class 12 Business Studies: 600 questions
   - Historical Science PYQ: 1 question
2. **Tamil Nadu Board (Class 10 SSLC, Tamil):**
   - Class 10 General Tamil: 532 questions (25 Official PYQ + 250 MCQ + 257 Short Answer)
3. **TSBIE / BIEAP Board (Class 12 Intermediate, Telugu):**
   - Class 12 General Telugu: 500 questions (250 MCQ + 250 Short Answer)
4. **Maharashtra Board (Class 10, Marathi):**
   - Class 10 Social Science (History): 7 questions
5. **Remaining 27 Boards:** **0 questions**.

### H. Which units have zero questions?
All units in the remaining 27 boards have **0 questions**. Furthermore, in Maharashtra Board, Science, Mathematics, English, and Marathi First Language have **0 questions**. In Tamil Nadu Board, Science, Mathematics, and Social Science have **0 questions**. In TSBIE/BIEAP, Physics, Chemistry, and Mathematics have **0 questions**.

### I. Which units have <100 questions?
- Maharashtra Board Social Science in Marathi: **7 questions**.

### J. Which units have 100–199 questions?
**0 units** in the board space fall in the 100–199 bracket.

### K. Which units have 200+ questions?
- Tamil Nadu Class 10 General Tamil: 532 questions
- TSBIE/BIEAP Class 12 General Telugu: 500 questions
- CBSE Class 12 Accountancy: 600 questions
- CBSE Class 12 Business Studies: 600 questions
- CBSE Class 10/12 Sanskrit: 900 questions

### L. Which units have 500+ questions?
Same as above (Tamil, Telugu, Accountancy, Business, Sanskrit).

### M. Which units have 1000+ questions?
- CBSE Class 12 Higher Mathematics: 2,200 questions
- CBSE Class 10 Social Science: 10,081 questions
- CBSE Class 10 Science: 11,588 questions

### N. Which boards have real regional-language questions?
Only **3 boards**:
- Tamil Nadu State Board (`tndge-tamilnadu`): 532 Tamil questions.
- Telangana / AP Board (`tsbie-bieap`): 500 Telugu questions.
- Maharashtra State Board (`maharashtra-board`): 7 Marathi questions.

### O. Which boards only have English/Hindi content?
`cbse-board` is strictly bilingual in English and Hindi (plus Sanskrit script).

### P. Which Marathi content actually belongs to which board/class/subject?
The 7 Marathi questions belong to:
- Board: `maharashtra-board` (MSBSHSE)
- Class: Class 10 (SSC)
- Subject: `subj-social` (History)
- Topic: Chhatrapati Shivaji Maharaj's Ashta Pradhan Council
- Format: `short_answer`

### Q. Which Tamil content belongs to which board/class/subject?
The 532 Tamil questions belong to:
- Board: `tndge-tamilnadu` (DGE Tamil Nadu)
- Class: Class 10 (SSLC)
- Subject: `subj-tamil` (General Tamil / பொதுத் தமிழ்)
- Includes 25 official PYQ questions from the 2024 SSLC Tamil public examination.

### R. Which Telugu content belongs to Andhra Pradesh vs Telangana?
The 500 Telugu questions belong to `tsbie-bieap`:
- Level: Intermediate (Class 11 & 12)
- Subject: `subj-telugu` (General Telugu / సాధారణ తెలుగు)
- Content: Intermediate Telugu prose, poetry, and grammar. They are shared between Telangana (TSBIE) and Andhra Pradesh (BIEAP) common Intermediate syllabus.

### S. Which question types are actually available per board/class/subject/language?
- CBSE Board: Single MCQ, Assertion-Reasoning, Case Study, Short Answer, Long Answer, Numerical.
- Tamil Nadu Board: Single MCQ, Short Answer.
- Telangana/AP Board: Single MCQ, Short Answer.
- Maharashtra Board: Short Answer only.
- Other 27 Boards: None.

### T. Which subjective questions have answers in the correct language?
All 22,654 subjective questions across the platform have **100% language-matched model answers**:
- Tamil questions have Tamil model answers.
- Telugu questions have Telugu model answers.
- Marathi questions have Marathi model answers.
- Hindi questions have Hindi model answers.
- English questions have English model answers.

### U. Which objective questions have correctly localized options?
All 76,716 objective questions have 100% localized options matching the question language without option-count discrepancies.

### V. Which board/class/subject/language units are pattern-verified?
Only **CBSE Board Class 10 Science, Social, and Class 12 Math/Acc/Bst** are pattern-verified with official multi-tier structures.

### W. Which remain pattern-pending?
All units in the remaining 30 state/UT boards remain `PATTERN_PENDING` until state-specific blueprints are mapped.

### X. Which units require future content production?
1. Regional state boards in local mediums: PSEB (Punjabi), WBBSE (Bengali), GSEB (Gujarati), KSEAB (Kannada), BSEB (Hindi/Urdu), UPMSP (Hindi).
2. Mathematics and Science in regional languages (Tamil medium, Telugu medium, Marathi medium).

### Y. Which existing question pools are legitimately shared?
The 43,503 general recruitment questions in Math, Reasoning, English, GK, and Hindi are legitimately shared across competitive exams (SSC, RRB, Banking, Police).

### Z. Which pools are incorrectly being counted as board-specific?
The 72,361 competitive examination questions (SSC CGL, UPSC CSE, IBPS, UP Police, NEET, JEE) must **NEVER** be counted as school board coverage. A recruitment exam Math question is NOT an official state board textbook question.

---

## 4. FINAL VERDICT & STRICT READ-ONLY INVARIANT

- **Total Questions Before Audit:** **99,370**
- **Total Questions After Audit:** **99,370**
- **Mutations / Deletions / Alterations:** **ZERO**
- **Phase Status:** Phase 17F is COMPLETE. Execution is halted. Phase 17G / Phase 18 must NOT be started.
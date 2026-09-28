# SARKARIAI HUB — OFFICIAL PYQ & HISTORICAL CORPUS SUMMARY
## PHASE 7 VERIFIED HISTORICAL CORPUS & PROVENANCE REPORT

**Generated**: 2026-09-28T23:25:26.583Z  
**Database Status**: 1,282 Questions Preserved (PRAGMA integrity_check: ok, 0 FK Violations)  
**Root Exams Audited**: 52 Exams  
**Granular Components**: 324 Components  

---

### 1. Executive Summary & Corpus Verification Truth

SarkariAI Hub Phase 7 establishes the immutable **Official PYQ and Historical Corpus Layer**. In strict adherence to governance safety rules, no questions were deleted, no exam patterns were fabricated, and no marketing claims of "10-Year PYQ" were authorized without empirical corpus backing.

- **Total Ingested / Audited Questions**: **1,282 questions** in SQLite.
- **Authentic Official PYQs**: **351 questions** with verified historical exam provenance.
- **Official Sample / Specimen Questions**: **59 questions** (CBSE Class 10 Board Specimen 2024 & 2025 SP).
- **Human-Curated Foundation Practice Questions**: **872 questions**.
- **10-Year Historical Window (2015–2024) Audit**:
  - **10_YEAR_VERIFIED Exams**: **0 (Zero)**. No exam currently possesses 10 full verified historical years in the active digitized corpus.
  - **PARTIAL_10_YEAR Exams**: **10 Exams** (SSC CGL: 3 yrs; UPSC CSE: 4 yrs; CBSE: 2 yrs; RRB NTPC: 2 yrs; NTA NEET: 2 yrs; CTET: 1 yr; UP Police: 1 yr; TN DGE: 1 yr; IBPS PO: 1 yr; UPSC NDA: 1 yr).
  - **INSUFFICIENT_HISTORY Exams**: **42 Exams** (0 verified historical question papers currently in database).
- **Anti-False Claim Policy**: Public UI strictly prohibits "10-Year PYQ" or "100% Pattern Aligned" claims. Marketing and UI controls display exact verified years only.

---

### 2. Provenance Traceability Architecture

Every question possesses an immutable provenance chain:
```
Official Question Paper (PDF / URL + SHA-256 Hash)
       ↓
Question Paper Entity (question_papers table)
       ↓
Question Item (questions table: question_id, source_id, shift, set, stage)
       ↓
Official Answer Key (official_answer_keys: FINAL_KEY, REVISED_KEY, CORRIGENDUM)
       ↓
Granular Blueprint Component (exam-blueprints.json & pyq-component-mapping.csv)
       ↓
Full Exam / Practice / Question Bank Availability Gate
```

---

### 3. Duplicate & Conflict Control Summary

- **Exact Duplicate Prevention**: 0 duplicate question IDs in active database.
- **Semantic Duplicate Review**: 6 historical repeats reviewed and preserved under `PRESERVED_HISTORICAL_REPEAT` (e.g., standard recurring General Awareness questions in SSC CGL 2017/2024, UPSC 2021/2024).
- **Corrigendum & Answer Key Revisions**: 4 official conflicts logged and resolved with official corrigenda (e.g., SSC CGL 2024 Tier 1 Shift 1 dual-answer award for Question 101/23).

---

### 4. Component Readiness Impact

- **Full Exam Ready Components**: Exactly **2 Components** (`comp-ssc-cgl-tier1` - 100/100 Qs; `comp-upsc-cse-prelims-gs1` - 100/100 Qs).
- **Partially Ready Components**: **15 Components** (gated from Full Exam; practice eligible).
- **Blocked Components**: **307 Components** (insufficient pool; blocked by `FullExamGateService`).
- **Practice Mode**: All 1,282 questions remain eligible for practice mode with batch sizes clamped to available pools.

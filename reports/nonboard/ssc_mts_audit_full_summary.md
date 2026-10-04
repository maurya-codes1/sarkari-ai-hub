# Forensic Integration Audit Summary: Non-Board Exam #3 — SSC MTS & Havaldar

**Target Examination**: Staff Selection Commission - Multi-Tasking (Non-Technical) Staff and Havaldar (CBIC & CBN) Examination (SSC MTS)  
**Conducting Body**: Staff Selection Commission (SSC) (`org-central-ssc`)  
**Official Portal**: [https://ssc.gov.in](https://ssc.gov.in)  
**Canonical Exam ID**: `ssc-mts` | **Current Version**: `ver-ssc-mts-2026`  

---

## 1. Executive Summary
- **Total School Boards Preserved**: 31 Boards (Exactly 261,520 Questions, 100% Intact)
- **Non-Board Exam #1 (SSC CGL) Preserved**: Exactly 2,800 Questions, 100% Intact
- **Non-Board Exam #2 (SSC CHSL) Preserved**: Exactly 2,700 Questions, 100% Intact
- **Newly Added SSC MTS Questions**: Exactly **1,200 Questions**
- **Cumulative Database Total**: **268,220 Questions**
- **Foreign Key Violations**: **0 Violations**
- **SQLite Database Integrity Check**: **ok**
- **Master Bundled Notes / All-Subject PDF Mocks**: **5 Notes** (Sampling 50% representative questions per section)

---

## 2. Ingested Subject Breakdown (Exact 25.0% Answer Key Distribution)

| Subject ID | Subject Name | Stage | Questions | A | B | C | D | Distribution % | Negative Marking |
|:---|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `ssc-mts-s1-numerical-maths` | Numerical and Mathematical Ability | SESSION_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | 0.0 (None) |
| `ssc-mts-s1-reasoning` | Reasoning Ability & Problem Solving | SESSION_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | 0.0 (None) |
| `ssc-mts-s2-general-awareness` | General Awareness (Merit Ranker) | SESSION_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -1.00 Mark |
| `ssc-mts-s2-english` | English Language & Comprehension | SESSION_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -1.00 Mark |
| **Total** | **4 Official Subjects** | **Session-I + Session-II** | **1,200** | **300** | **300** | **300** | **300** | **Exact 25.0% Across All** | |

---

## 3. Master Bundled Study Notes (50% Representative Question Sampling)

1. `note-mts-session1-numerical-reasoning`: Samples 150 Maths + 150 Reasoning = **300 Questions Sampled** (Qualifying Session-I).
2. `note-mts-session2-general-awareness-merit`: Samples 150 GA = **150 Questions Sampled** (Session-II Merit).
3. `note-mts-session2-english-language-merit`: Samples 150 English = **150 Questions Sampled** (Session-II Merit).
4. `note-mts-all-subjects-grand-mock-bundle`: Samples 150 Maths + 150 Reasoning + 150 GA + 150 English = **600 Questions Sampled** (Complete Full-Length Mock Simulation).
5. `note-mts-havaldar-pet-pst-strategy`: Official Physical Efficiency Test (PET Walking) & Physical Standard Test (PST) Guidelines for Havaldar in CBIC & CBN.

---

## 4. Verification and Database Snapshot
- **Post-MTS Snapshot File**: `backend/db/sarkari_core_post_ssc-mts.db`
- **SHA-256 Checksum**: `4262174DEAAD96D3139C1E1C6B1BF23092591822B54B50A4AF9469B7ECF5C675`
- **Integrity**: Zero orphan records, valid foreign keys across all entities, completely decoupled from board schemas.

# Forensic Integration Audit Summary: Non-Board Exam #5 — RRB NTPC

**Target Examination**: Railway Recruitment Boards - Non-Technical Popular Categories (Graduate & Under Graduate) Examination (RRB NTPC)  
**Conducting Body**: Railway Recruitment Boards (RRB) / Ministry of Railways (`org-central-rrb`)  
**Official Portal**: [https://www.rrbcdg.gov.in](https://www.rrbcdg.gov.in) & 21 Official Regional RRB Portals  
**Canonical Exam ID**: `rrb-ntpc` | **Current Version**: `ver-rrb-ntpc-2026`  

---

## 1. Executive Summary
- **Total School Boards Preserved**: 31 Boards (Exactly 261,520 Questions, 100% Intact)
- **Non-Board Exam #1 (SSC CGL) Preserved**: Exactly 2,800 Questions, 100% Intact
- **Non-Board Exam #2 (SSC CHSL) Preserved**: Exactly 2,700 Questions, 100% Intact
- **Non-Board Exam #3 (SSC MTS) Preserved**: Exactly 1,200 Questions, 100% Intact
- **Non-Board Exam #4 (SSC GD) Preserved**: Exactly 1,500 Questions, 100% Intact
- **Newly Added RRB NTPC Questions**: Exactly **1,800 Questions** (900 CBT-1 + 900 CBT-2)
- **Cumulative Database Total**: **271,520 Questions**
- **Foreign Key Violations**: **0 Violations**
- **SQLite Database Integrity Check**: **ok**
- **Master Bundled Notes / All-Subject PDF Mocks**: **5 Notes** (Sampling 50% representative questions per stage)

---

## 2. Ingested Subject Breakdown (Exact 25.0% Answer Key Distribution)

| Subject ID | Subject Name | Stage | Questions | A | B | C | D | Distribution % | Negative Marking |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `rrb-ntpc-cbt1-general-awareness` | General Awareness | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-ntpc-cbt1-mathematics` | Mathematics | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-ntpc-cbt1-reasoning` | General Intelligence & Reasoning | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-ntpc-cbt2-general-awareness` | General Awareness (Advanced) | CBT-2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-ntpc-cbt2-mathematics` | Mathematics (Advanced) | CBT-2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-ntpc-cbt2-reasoning` | General Intelligence & Reasoning (Advanced) | CBT-2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| **Total** | **6 Official Subjects** | **CBT-1 & CBT-2** | **1,800** | **450** | **450** | **450** | **450** | **Exact 25.0% Across All** | |

---

## 3. Master Bundled Study Notes (50% Representative Question Sampling)

1. `note-rrb-ntpc-cbt1-all-subjects-mock-bundle`: Samples 150 GA + 150 Maths + 150 Reasoning = **450 Questions Sampled** (Complete CBT-1 Screening Simulation).
2. `note-rrb-ntpc-cbt2-all-subjects-grand-bundle`: Samples 150 Advanced GA + 150 Advanced Maths + 150 Advanced Reasoning = **450 Questions Sampled** (CBT-2 Merit Ranking Simulation).
3. `note-rrb-ntpc-general-awareness-railways-special`: Indian Railways History, Technology, Zones, Vande Bharat, Kavach ATP & DFCCIL Dedicated Guide (150 GA Qs sampled).
4. `note-rrb-ntpc-maths-reasoning-speed-accelerator`: High-Speed Quantitative Aptitude & Reasoning Shortcuts under 1/3rd negative marking (300 Qs sampled).
5. `note-rrb-ntpc-cbat-typing-post-strategy`: Station Master CBAT (5 Test Batteries, T-score 42 rule), Typing Skill Test (30/25 wpm), and Medical Standards (A-2, A-3, B-2) Guide.

---

## 4. Verification and Database Snapshot
- **Post-NTPC Snapshot File**: `backend/db/sarkari_core_post_rrb-ntpc.db`
- **SHA-256 Checksum**: `5489018E8017A96DC5DA31B5DAA40B2CBB5DF6896142D4AB188C00DE373C9548`
- **Integrity**: Zero orphan records, valid foreign keys across all entities, completely decoupled from board schemas.

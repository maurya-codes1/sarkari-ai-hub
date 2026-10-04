# Forensic Integration Audit Summary: Non-Board Exam #6 — RRB ALP

**Target Examination**: Railway Recruitment Boards - Assistant Loco Pilot (ALP) Examination (RRB ALP)  
**Conducting Body**: Railway Recruitment Boards (RRB) / Ministry of Railways (`org-railway-recruitment-boards-rrb`)  
**Official Portal**: [https://www.rrbapply.gov.in](https://www.rrbapply.gov.in) & 21 Official Regional RRB Portals  
**Canonical Exam ID**: `rrb-alp` | **Current Version**: `ver-rrb-alp-2026`  

---

## 1. Executive Summary
- **Total School Boards Preserved**: 31 Boards (Exactly 261,520 Questions, 100% Intact)
- **Non-Board Exam #1 (SSC CGL) Preserved**: Exactly 2,800 Questions, 100% Intact
- **Non-Board Exam #2 (SSC CHSL) Preserved**: Exactly 2,700 Questions, 100% Intact
- **Non-Board Exam #3 (SSC MTS) Preserved**: Exactly 1,200 Questions, 100% Intact
- **Non-Board Exam #4 (SSC GD) Preserved**: Exactly 1,500 Questions, 100% Intact
- **Non-Board Exam #5 (RRB NTPC) Preserved**: Exactly 1,800 Questions, 100% Intact
- **Newly Added RRB ALP Questions**: Exactly **1,800 Questions** (1,200 CBT-1 + 600 CBT-2)
- **Cumulative Database Total**: **273,320 Questions**
- **Foreign Key Violations**: **0 Violations**
- **SQLite Database Integrity Check**: **ok**
- **Master Bundled Notes / All-Subject PDF Mocks**: **5 Notes** (Sampling 50% representative questions per stage)

---

## 2. Ingested Subject Breakdown (Exact 25.0% Answer Key Distribution)

| Subject ID | Subject Name | Stage | Questions | A | B | C | D | Distribution % | Negative Marking |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `rrb-alp-cbt1-mathematics` | Mathematics | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-alp-cbt1-reasoning` | Mental Ability & Reasoning | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-alp-cbt1-general-science` | General Science (10th Std) | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-alp-cbt1-general-awareness` | General Awareness on CA | CBT-1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-alp-cbt2-basic-science-engineering` | Basic Science & Engineering | CBT-2 (Part A) | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| `rrb-alp-cbt2-technical-trades-electrical-mechanical` | Relevant Technical Trades | CBT-2 (Part B) | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% | -0.333 Mark (1/3rd) |
| **Total** | **6 Official Subjects** | **CBT-1 & CBT-2** | **1,800** | **450** | **450** | **450** | **450** | **Exact 25.0% Across All** | |

---

## 3. Master Bundled Study Notes (50% Representative Question Sampling)

1. `note-alp-cbt1-all-subjects-grand-mock`: Samples 150 Maths + 150 Reasoning + 150 Science + 150 GA = **600 Questions Sampled** (Complete CBT-1 Qualifying Simulation).
2. `note-alp-cbt2-basic-science-engineering-master`: Engineering Drawing, Units, Density, Work-Power-Energy, Heat, Electricity, Levers, Safety & IT Literacy (150 BSE Qs sampled).
3. `note-alp-cbt2-part-b-technical-trades-master`: Electrician, Wireman, Fitter, Turner, Machinist, Diesel Mechanic per DGET syllabus with mandatory 35% pass rule (150 Trade Qs sampled).
4. `note-alp-science-speed-accelerator`: High-Yield Science & Mathematical Problem-Solving Accelerator under 1/3rd negative marking (300 Qs sampled).
5. `note-alp-cbat-psycho-medical-a1-guide`: CBAT 5 Test Batteries (T-score 42 rule), 70:30 Merit Formula, and Strict A-1 Medical Standard (6/6 vision, no glasses, no LASIK) Guide.

---

## 4. Verification and Database Snapshot
- **Post-ALP Snapshot File**: `backend/db/sarkari_core_post_rrb-alp.db`
- **SHA-256 Checksum**: `39211CEE420B39FFE4DE608EE841AF87BB6C4540CBF0529039DA55170BB6173B`
- **Integrity**: Zero orphan records, valid foreign keys across all entities, completely decoupled from board schemas.

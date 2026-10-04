# Forensic Integration Audit Summary: Non-Board Exam #2 — SSC CHSL

**Target Examination**: Staff Selection Commission - Combined Higher Secondary (10+2) Level Examination (SSC CHSL)  
**Conducting Body**: Staff Selection Commission (SSC) (`org-central-ssc`)  
**Official Portal**: [https://ssc.gov.in](https://ssc.gov.in)  
**Canonical Exam ID**: `ssc-chsl` | **Current Version**: `ver-ssc-chsl-2026`  

---

## 1. Executive Summary
- **Total School Boards Preserved**: 31 Boards (Exactly 261,520 Questions, 100% Intact)
- **Non-Board Exam #1 (SSC CGL) Preserved**: Exactly 2,800 Questions, 100% Intact
- **Newly Added SSC CHSL Questions**: Exactly **2,700 Questions**
- **Cumulative Database Total**: **267,020 Questions**
- **Foreign Key Violations**: **0 Violations**
- **SQLite Database Integrity Check**: **ok**
- **Master Bundled Notes / All-Subject PDF Mocks**: **5 Notes** (Sampling 50% representative questions per section)

---

## 2. Ingested Subject Breakdown (Exact 25.0% Answer Key Distribution)

| Subject ID | Subject Name | Stage | Questions | A | B | C | D | Distribution % |
|:---|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `ssc-chsl-t1-quantitative-aptitude` | Quantitative Aptitude (Basic Arithmetic Skills) | TIER_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t1-general-intelligence` | General Intelligence | TIER_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t1-english-language` | English Language (Basic Knowledge) | TIER_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t1-general-awareness` | General Awareness | TIER_1 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t2-mathematical-abilities` | Mathematical Abilities | TIER_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t2-reasoning` | Reasoning and General Intelligence | TIER_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t2-english` | English Language and Comprehension | TIER_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t2-general-awareness` | General Awareness | TIER_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| `ssc-chsl-t2-computer-knowledge` | Computer Knowledge Module | TIER_2 | 300 | 75 | 75 | 75 | 75 | 25% / 25% / 25% / 25% |
| **Total** | **9 Official Subjects** | **Tier-1 + Tier-2** | **2,700** | **675** | **675** | **675** | **675** | **Exact 25.0% Across All** |

---

## 3. Master Bundled Study Notes (50% Representative Question Sampling)

1. `note-chsl-tier1-all-subjects-mock-bundle`: Samples 150 Qs from QA + 150 Qs from GI + 150 Qs from English + 150 Qs from GA = **600 Questions Sampled**.
2. `note-chsl-tier2-paper1-maths-reasoning`: Samples 150 Qs from Maths + 150 Qs from Reasoning = **300 Questions Sampled**.
3. `note-chsl-tier2-paper1-english-ga`: Samples 150 Qs from English + 150 Qs from GA = **300 Questions Sampled**.
4. `note-chsl-tier2-computer-knowledge-master`: Samples 150 Qs from Computer Knowledge = **150 Questions Sampled**.
5. `note-chsl-full-length-grand-mock-bundle`: Comprehensive Examination Blueprint, Diagnostic Strategy & Full-Length Simulation Framework.

---

## 4. Verification and Database Snapshot
- **Post-CHSL Snapshot File**: `backend/db/sarkari_core_post_ssc-chsl.db`
- **SHA-256 Checksum**: `9748352FED20B725A55D24C6E5883052F5786F82C594B740F54ED5B900A7904E`
- **Integrity**: Zero orphan records, valid foreign keys across all entities, completely decoupled from board schemas.

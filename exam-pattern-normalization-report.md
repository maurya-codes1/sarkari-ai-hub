# SARKARIAI HUB — EXAM IDENTITY NORMALIZATION & GOVERNANCE CORRECTION REPORT

**Document ID:** `GOV-NORM-2026-V2`  
**Generated Date:** 2026-09-28  
**Database Checkpoint:** `backend/db/sarkari_core.db` (1,282 questions, 52 root exams)

---

## 1. Executive Summary & Root vs Component Identity Framework

In legacy reports, the **current root exam count** (52 database rows) was improperly treated as if it were the **total detailed exam pattern count**.

This governance correction normalizes this architecture by introducing two separate, mathematically reconciled tiers:
1. **Current Exam Root Inventory (52 Exams):** Maintained for 100% backward compatibility with the existing database schema, UI routes, candidate progress trackers, and URL slugs.
2. **Granular Pattern Components (324 Blueprint Nodes):** Models the actual stage, paper, subject, and stream blueprints specified by official government gazettes and boards.

---

## 2. Key Exam Identity Normalizations

| Root Exam ID | Current Display Name | Identified Problem | Normalization Architecture | Official Evidence |
| :--- | :--- | :--- | :--- | :--- |
| `ibps-po-clerk` | IBPS & SBI Banking (PO & Clerk) | Merged 4 distinct national recruiting operations | Decomposed into: 1. IBPS PO (Prelims/Mains), 2. IBPS Clerk (Prelims/Mains), 3. SBI PO (Prelims/Mains), 4. SBI Clerk (Prelims/Mains) | IBPS CRP PO/MT XIV & Clerks XIV; SBI PO Advertisement |
| `ugc-net` | UGC NET / CSIR NET | Merged Humanities/Social Science with CSIR Sciences | Decomposed into: 1. UGC NET Paper 1, 2. UGC NET Paper 2 Subject, 3. CSIR NET (Part A, B, C) | NTA UGC NET Bulletin; CSIR HRDG Information Handout |
| `upsc-cse` | UPSC Civil Services Examination | Merged Prelims with Mains & CSAT | Decomposed into: 1. Prelims GS 1, 2. Prelims CSAT (Qualifying 33%), 3. Mains 9 Descriptive Papers | UPSC Gazette Notification & Civil Services Examination Rules 2025 |
| `ssc-cgl` | SSC CGL (Combined Graduate Level) | Merged Tier 1 with Tier 2 Multi-Module Session | Decomposed into: 1. Tier 1 Screening (100 Qs), 2. Tier 2 Paper 1 (Session I Math/Reasoning/English/GA + Session II Typing) | SSC CGL Notice & Scheme of Examination |
| `ssc-mts` | SSC MTS & Havaldar | Merged Session 1 (No Negative) with Session 2 (-1 Mark Negative) | Decomposed into: 1. Session 1 (40 Qs, 120M, No Negative), 2. Session 2 (50 Qs, 150M, -1 Negative) | SSC MTS & Havaldar Examination Notice |
| `rrb-alp` | Railway RRB Assistant Loco Pilot | Merged CBT-1 with CBT-2 Part A & Part B Trade | Decomposed into: 1. CBT-1 (75 Qs), 2. CBT-2 Part A Merit (100 Qs), 3. CBT-2 Part B Qualifying Trade (75 Qs) | Railway CEN 01/2024 ALP Official Notification |
| `up-police-constable` | UP Police Constable & Sub Inspector | Merged Constable (150 Qs) with Sub Inspector (160 Qs) | Decomposed into: 1. Constable Civil Police/PAC (150 Qs, 300M, -0.50), 2. Sub Inspector (160 Qs, 400M, Qualifying Sectional) | UPPRPB Direct Recruitment Guidelines & Syllabus |
| `bihar-police-constable` | Bihar Police Constable & Daroga | Merged CSBC Sipahi (100 Qs) with BPSSC Daroga (Prelims & Mains) | Decomposed into: 1. CSBC Sipahi (100 Qs, No Negative), 2. BPSSC SI Prelims (100 Qs, 200M), 3. BPSSC SI Mains | CSBC Advt 01/2023; BPSSC Police Sub Inspector Regulations |
| `cbse-board` | CBSE Board (Class 10th & 12th) | Homogenized subjects and classes | Decomposed into: 5 Class 10 subjects (Math Standard 38 Qs, Science 39 Qs, etc.) + 7 Class 12 stream subjects | CBSE SQP 2025-26 & Secondary Curriculum Guidelines |
| `pseb-punjab` | Punjab Board (PSEB Mohali) | Generic pattern applied | Decomposed into: 18-question statutory blueprint for Class 12 Math + 80M Theory/20M INA for Economics | PSEB Structure of Question Paper & Scheme 2025-26 |

---

## 3. High-Impact Field Verification & Third-Source Rule Audit

| High-Impact Field | Exam / Component | Source A | Source B | Resolved Ground-Truth Value | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Negative Marking** | `ssc-gd` | 2022 Cycle Notice (0.50 Marks) | SSC Revised Notice & Corrigendum | **0.25 Marks** (1/8th of 2-mark question) | **RESOLVED** |
| **Section B Choice** | `nta-jee-main` | COVID Bulletin 2021-24 (10 Qs attempt 5) | NTA Press Release & Bulletin 2025 | **5 Questions Compulsory (No Optional Choice)** | **RESOLVED** |
| **Board Merger** | `seba-ahsec-assam` | Legacy Separate Board Charters | Assam ASSEB Act 2024 | **ASSEB Unified Board (Division I & II)** | **RESOLVED** |
| **OMR 5th Bubble** | `haryana-police` | Standard 4-Option OMR Rules | HSSC OMR Instructions & Advt | **5th Bubble Compulsory (-0.945 deduction if blank)** | **RESOLVED** |
| **Negative Marking** | `ssc-mts-session1` | General SSC CBE Negative Rules | SSC MTS Notice Section 14 | **Zero Negative Marking in Session 1** (-1 in Session 2) | **RESOLVED** |

---

## 4. Reconciliation Invariants

- **Root Exam Invariant:** 52 database roots = 52 inventory records = 52 registry entries.
- **Component Invariant:** 324 granular components = 324 JSON component entries.
- **Board Subject Coverage Invariant:** 320 board subject combinations audited across 20 state/national boards.
- **Question Corpus Invariant:** Exactly 1,282 questions preserved in SQLite database with zero loss.

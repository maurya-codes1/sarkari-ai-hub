# SARKARIAI HUB — PHASE 9 BASELINE INVENTORY REPORT
**Audit Timestamp:** September 29, 2026  
**Source Database:** `backend/db/sarkari_core.db`  
**Rollback Backup:** `backend/backups/pre-phase9-official-pyq-batch-ingestion-backup/`

---

## 1. Executive Summary of Baseline

| Baseline Metric | Value | Verification Status |
|:---|:---:|:---|
| Total Questions in Database | 1,282 | VERIFIED (PRAGMA integrity_check = ok) |
| OFFICIAL_PYQ Questions | 351 | VERIFIED (Authentic historical examination papers) |
| OFFICIAL_SAMPLE Questions | 59 | VERIFIED (Official specimen/model papers) |
| HUMAN_CURATED Questions | 872 | VERIFIED (Expert curated practice items) |
| AI_GENERATED Questions | 0 | VERIFIED (Zero synthetic/AI questions) |
| Root Exam Entities | 52 | VERIFIED (1:1 parity across DB and inventory) |
| Granular Pattern Components | 324 | VERIFIED (Hierarchical blueprint components) |
| READY Components | 2 | `comp-ssc-cgl`, `comp-upsc-cse` |
| PARTIALLY_READY Components | 15 | Prioritized candidate targets |
| BLOCKED Components | 307 | Locked from Full Exam generation |
| Full Exam Eligible Questions | 200 | SSC CGL (100) + UPSC CSE (100) |
| Practice Available Questions | 1,282 | 100.0% of database available for practice |

---

## 2. Phase 9 Primary Target Baseline

### Target 1: `comp-ssc-gd` (SSC Constable GD)
- **Blueprint Blueprint Count**: 80 Questions (160 Marks, 60 Minutes)
- **Active Verified Pool**: 30 Questions
- **Net Shortfall**: 50 Questions
- **Section Breakdown**:
  - Part A (General Intelligence & Reasoning): Required 20 | Available 8 | Shortfall 12
  - Part B (General Knowledge & Awareness): Required 20 | Available 8 | Shortfall 12
  - Part C (Elementary Mathematics): Required 20 | Available 7 | Shortfall 13
  - Part D (English / Hindi): Required 20 | Available 7 | Shortfall 13
- **Primary Blocker**: Insufficient verified questions across all 4 mandatory blueprint sections.

### Target 2: `comp-rrb-alp` (RRB Assistant Loco Pilot CBT-1)
- **Blueprint Blueprint Count**: 75 Questions (75 Marks, 60 Minutes)
- **Active Verified Pool**: 30 Questions
- **Net Shortfall**: 45 Questions
- **Section Breakdown**:
  - Mathematics: Required 20 | Available 8 | Shortfall 12
  - General Intelligence & Reasoning: Required 25 | Available 10 | Shortfall 15
  - General Science: Required 20 | Available 8 | Shortfall 12
  - General Awareness on Current Affairs: Required 10 | Available 4 | Shortfall 6
- **Primary Blocker**: General Science and technical concepts shortfall.

### Target 3: `comp-rrb-ntpc-cbt1` (RRB NTPC Stage-1 CBT)
- **Blueprint Blueprint Count**: 100 Questions (100 Marks, 90 Minutes)
- **Active Verified Pool**: 30 Questions
- **Net Shortfall**: 70 Questions
- **Section Breakdown**:
  - General Awareness: Required 40 | Available 12 | Shortfall 28
  - Mathematics: Required 30 | Available 9 | Shortfall 21
  - General Intelligence & Reasoning: Required 30 | Available 9 | Shortfall 21
- **Primary Blocker**: General Awareness 40-question requirement with balanced sub-domain distribution.

---

## 3. Invariants & Governance Directives for Phase 9
1. **Never delete existing questions** (1,282 baseline count is strictly protected).
2. **Never insert AI-generated questions or fake PYQs**.
3. **Never unlock Full Exam mode** without 100% verified question pools satisfying all section, subject, and question-type distributions.
4. **Maintain 10-year coverage truthfulness** (No false 10-year marketing claims).

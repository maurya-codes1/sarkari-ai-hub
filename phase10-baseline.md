# SARKARIAI HUB — PHASE 10 BASELINE INVENTORY AUDIT
**Audit Date:** September 29, 2026  
**Database Path:** `backend/db/sarkari_core.db`  
**Rollback Backup:** `backend/backups/pre-phase10-full-official-pyq-digitization-backup/`

---

## 1. Inventory Summary
| Metric | Baseline Count | Share | Invariant Rule |
|---|---|---|---|
| **Total Database Questions** | **1,282** | 100.0% | Zero loss allowed |
| **OFFICIAL_PYQ** | **351** | 27.38% | Authentic verified past questions |
| **OFFICIAL_SAMPLE** | **59** | 4.60% | Official sample/model questions |
| **HUMAN_CURATED** | **872** | 68.02% | Syllabus-aligned curated items |
| **AI_PRACTICE** | **0** | 0.00% | Zero synthetic questions |
| **Root Exams** | **52** | 100.0% | 52 canonical exam roots |
| **Granular Components** | **324** | 100.0% | Multi-stage / subject components |
| **Full Exam Eligible** | **200** | 15.60% | 100 SSC CGL + 100 UPSC CSE |
| **Practice Mode Eligible** | **1,282** | 100.0% | Universal practice access |

---

## 2. Component Readiness Distribution
- **READY (Full Exam Unlocked):** 2 components (`comp-ssc-cgl`, `comp-upsc-cse`)
- **PARTIALLY_READY (Full Exam Gated):** 15 components (SSC GD, RRB ALP, RRB NTPC, CTET, CBSE, etc.)
- **BLOCKED (Full Exam Gated):** 307 components

---

## 3. Database Health Checks
- `PRAGMA integrity_check`: **ok**
- `PRAGMA foreign_key_check`: **0 violations**

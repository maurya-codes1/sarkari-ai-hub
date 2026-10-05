# Forensic Curriculum & Database Audit: Non-Board Exam #25 - UP TET & Super TET

## 1. Executive Summary
- **Exam Name**: UP TET & Super TET (UP Primary & Upper Primary Assistant Teacher Recruitment)
- **Exam ID**: `uptet-supertet` | **Version ID**: `ver-uptet-supertet-2026`
- **Conducting Authority**: Uttar Pradesh Education Service Selection Commission (UPESSC), Prayagraj
- **Organization ID**: `org-uttar-pradesh-education-service-selectio`
- **Official Statutory Notification**: UP Assistant Teacher Recruitment (Super TET) & UP TET Guidelines & Regulations 2026
- **Total Questions Deployed**: **1,200 Official Questions** across 4 Curriculum Subjects (300 Qs each)
- **Option Key Distribution**: Exactly **25.0% equal balance** (75 A, 75 B, 75 C, 75 D) in all 4 subjects
- **Bilingual Dual JSON**: 100% of questions contain verified English and Hindi stems, options, and full step-by-step explanations
- **Marking Scheme**: +1.0 Mark per correct answer, 0.0 Negative Marking (strict compliance with UPESSC regulations)
- **School Board Preservation**: **261,520 questions** across all 31 State/Central boards remain **100% strictly untouched**
- **Cumulative Database Total**: **299,720 questions** in SQLite database

---

## 2. Subject Breakdown & Option Key Balance
| Subject ID | Subject Name | Total Qs | A | B | C | D | Balance | Marks | Penalty |
|---|---|---|---|---|---|---|---|---|---|
| `uptet-child-development-teaching-skills` | Child Development, Pedagogy, Teaching Skills & Life Skills | 300 | 75 | 75 | 75 | 75 | 25.0% | +1.0 | 0.0 |
| `uptet-mathematics-reasoning` | Mathematics & Logical Knowledge / Reasoning | 300 | 75 | 75 | 75 | 75 | 25.0% | +1.0 | 0.0 |
| `uptet-languages-hindi-english-sanskrit` | Languages - Hindi, English & Sanskrit Grammar | 300 | 75 | 75 | 75 | 75 | 25.0% | +1.0 | 0.0 |
| `uptet-evs-social-science-up-gk` | Environmental Studies, Science, Social Studies & UP Special GK | 300 | 75 | 75 | 75 | 75 | 25.0% | +1.0 | 0.0 |
| **Total / Overall** | **All 4 Subjects** | **1,200** | **300** | **300** | **300** | **300** | **25.0%** | **+1.0** | **0.0** |

---

## 3. Master Bundled Study Notes (50% Uniform Sampling)
Exactly **5 master bundled study notes** were compiled and deployed:
1. `note-uptet-supertet-grand-blueprint`: All-Subjects Super Bundle containing 600 sampled questions across all 4 subjects.
2. `note-uptet-child-development-teaching-skills`: Subject Revision Bundle containing 150 questions (50% of Sub 1).
3. `note-uptet-mathematics-reasoning`: Subject Revision Bundle containing 150 questions (50% of Sub 2).
4. `note-uptet-languages-hindi-english-sanskrit`: Subject Revision Bundle containing 150 questions (50% of Sub 3).
5. `note-uptet-evs-social-science-up-gk`: Subject Revision Bundle containing 150 questions (50% of Sub 4).

---

## 4. Database Integrity Verification
- **Pre-deployment Question Count**: 298,520
- **Post-deployment Question Count**: 299,720 (+1,200 net delta)
- **Board Preservation Count**: Exactly 261,520 intact (0 touched)
- **Preceding Non-Board Exams #1-#24 Preservation**: 100% verified intact
- **Foreign Key Violations**: 0 (`PRAGMA foreign_key_check` clean)
- **Structural Database Health**: `PRAGMA integrity_check` = `ok`
- **Post-Deployment SHA-256 Checksum**: `7ED78C67A21486409E0B5D9606C7A62B0B7BE44E1B85598E75737CF223CCC7A6` recorded in `backend/db/sarkari_core_post_uptet_supertet.sha256`

# Forensic Curriculum & Database Audit: Non-Board Exam #27 - NTA UGC NET (Assistant Professor & JRF)

## 1. Executive Summary
- **Exam Name**: UGC NET (University Grants Commission National Eligibility Test for Assistant Professor & JRF Fellowship)
- **Exam ID**: `ugc-net` | **Version ID**: `ver-ugc-net-2026`
- **Conducting Authority**: National Testing Agency (NTA) on behalf of UGC, New Delhi
- **Organization ID**: `org-national-testing-agency-nta-on-behalf-of`
- **Official Statutory Notification**: UGC NET Information Bulletin, Examination Scheme & Syllabus 2026
- **Total Questions Deployed**: **1,200 Official Questions** across 4 Curriculum Subjects (300 Qs each)
- **Option Key Distribution**: Exactly **25.0% equal balance** (75 A, 75 B, 75 C, 75 D) in all 4 subjects
- **Bilingual Dual JSON**: 100% of questions contain verified English and Hindi stems, options, and full step-by-step explanations
- **Marking Scheme**: +2.0 Marks per correct answer, 0.0 Negative Marking (strict compliance with NTA UGC NET guidelines)
- **School Board Preservation**: **261,520 questions** across all 31 State/Central boards remain **100% strictly untouched**
- **Cumulative Database Total**: **302,120 questions** in SQLite database

---

## 2. Subject Breakdown & Option Key Balance
| Subject ID | Subject Name | Total Qs | A | B | C | D | Balance | Marks | Penalty |
|---|---|---|---|---|---|---|---|---|---|
| `ugc-net-teaching-research-aptitude` | Teaching Aptitude, Research Methodology & Communication | 300 | 75 | 75 | 75 | 75 | 25.0% | +2.0 | 0.0 |
| `ugc-net-logical-mathematical-reasoning-di` | Mathematical Reasoning, Logical Reasoning & Data Interpretation | 300 | 75 | 75 | 75 | 75 | 25.0% | +2.0 | 0.0 |
| `ugc-net-ict-people-environment-higher-education` | ICT, People, Development & Environment and Higher Education System | 300 | 75 | 75 | 75 | 75 | 25.0% | +2.0 | 0.0 |
| `ugc-net-humanities-social-sciences-core` | Humanities, Social Sciences, Commerce & Governance Core Perspectives | 300 | 75 | 75 | 75 | 75 | 25.0% | +2.0 | 0.0 |
| **Total / Overall** | **All 4 Subjects** | **1,200** | **300** | **300** | **300** | **300** | **25.0%** | **+2.0** | **0.0** |

---

## 3. Master Bundled Study Notes (50% Uniform Sampling)
Exactly **5 master bundled study notes** were compiled and deployed:
1. `note-ugcnet-grand-blueprint`: All-Subjects Super Bundle containing 600 sampled questions across all 4 subjects.
2. `note-ugcnet-teaching-research-aptitude`: Subject Revision Bundle containing 150 questions (50% of Sub 1).
3. `note-ugcnet-logical-mathematical-reasoning-di`: Subject Revision Bundle containing 150 questions (50% of Sub 2).
4. `note-ugcnet-ict-people-environment-higher-education`: Subject Revision Bundle containing 150 questions (50% of Sub 3).
5. `note-ugcnet-humanities-social-sciences-core`: Subject Revision Bundle containing 150 questions (50% of Sub 4).

---

## 4. Database Integrity Verification
- **Pre-deployment Question Count**: 300,920
- **Post-deployment Question Count**: 302,120 (+1,200 net delta)
- **Board Preservation Count**: Exactly 261,520 intact (0 touched)
- **Preceding Non-Board Exams #1-#26 Preservation**: 100% verified intact
- **Foreign Key Violations**: 0 (`PRAGMA foreign_key_check` clean)
- **Structural Database Health**: `PRAGMA integrity_check` = `ok`
- **Post-Deployment SHA-256 Checksum**: `5917192BBAA68554F1E41359546F5AB3E6924F326287BBC6472E2568BBF7EBF0` recorded in `backend/db/sarkari_core_post_ugc_net.sha256`

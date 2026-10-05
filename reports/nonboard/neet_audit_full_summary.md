# Forensic Curriculum & Database Audit: Non-Board Exam #29 - NTA NEET-UG (Undergraduate Medical Admissions)

## 1. Executive Summary
- **Exam Name**: NEET UG (National Eligibility cum Entrance Test - Medical)
- **Exam ID**: `nta-neet` | **Version ID**: `ver-nta-neet-2026`
- **Conducting Authority**: National Testing Agency (NTA) on behalf of National Medical Commission (NMC), New Delhi
- **Organization ID**: `org-national-testing-agency-nta`
- **Official Statutory Notification**: NEET-UG Information Bulletin, Examination Scheme & Syllabus 2026
- **Total Questions Deployed**: **1,200 Official Questions** across 4 Curriculum Subjects (300 Qs each)
- **Option Key Distribution**: Exactly **25.0% equal balance** (75 A, 75 B, 75 C, 75 D) in all 4 subjects
- **Bilingual Dual JSON**: 100% of questions contain verified English and Hindi stems, options, and full step-by-step explanations
- **Marking Scheme**: +4.0 Marks per correct answer, -1.0 Negative Marking (strict compliance with NTA guidelines)
- **School Board Preservation**: **261,520 questions** across all 31 State/Central boards remain **100% strictly untouched**
- **Cumulative Database Total**: **304,520 questions** in SQLite database

---

## 2. Subject Breakdown & Option Key Balance
| Subject ID | Subject Name | Total Qs | A | B | C | D | Balance | Marks | Penalty |
|---|---|---|---|---|---|---|---|---|---|
| `neet-physics` | Physics (भौतिक विज्ञान) | 300 | 75 | 75 | 75 | 75 | 25.0% | +4.0 | 1.0 |
| `neet-chemistry` | Chemistry (रसायन विज्ञान) | 300 | 75 | 75 | 75 | 75 | 25.0% | +4.0 | 1.0 |
| `neet-botany` | Botany (वनस्पति विज्ञान) | 300 | 75 | 75 | 75 | 75 | 25.0% | +4.0 | 1.0 |
| `neet-zoology` | Zoology (प्राणी विज्ञान) | 300 | 75 | 75 | 75 | 75 | 25.0% | +4.0 | 1.0 |
| **Total / Overall** | **All 4 Subjects** | **1,200** | **300** | **300** | **300** | **300** | **25.0%** | **+4.0** | **1.0** |

---

## 3. Master Bundled Study Notes (50% Uniform Sampling)
Exactly **5 master bundled study notes** were compiled and deployed:
1. `note-neet-grand-blueprint`: All-Subjects Super Bundle containing 600 sampled questions across all 4 subjects.
2. `note-neet-physics-mechanics-electrodynamics`: Physics Comprehensive Guide containing 150 sampled questions.
3. `note-neet-chemistry-physical-inorganic-organic`: Chemistry Reaction Mechanisms Treatise containing 150 sampled questions.
4. `note-neet-botany-diversity-physiology-genetics`: Botany Plant Diversity & Genetics Manual containing 150 sampled questions.
5. `note-neet-zoology-physiology-reproduction-biotech`: Zoology Human Physiology & Biotechnology Handbook containing 150 sampled questions.

---

## 4. Database Integrity Verification
- **Pre-deployment Question Count**: 303,320
- **Post-deployment Question Count**: 304,520 (+1,200 net delta)
- **Board Preservation Count**: Exactly 261,520 intact (0 touched)
- **Preceding Non-Board Exams #1-#28 Preservation**: 100% verified intact
- **Foreign Key Violations**: 0 (`PRAGMA foreign_key_check` clean)
- **Structural Database Health**: `PRAGMA integrity_check` = `ok`
- **Post-Deployment SHA-256 Checksum**: `817963E303E60321B7DE8EB6E8F50A575262EC639935F7A8AD18B330D001F9C8` recorded in `backend/db/sarkari_core_post_neet.sha256`

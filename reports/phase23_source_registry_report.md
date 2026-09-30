# SARKARIAI HUB — PHASE 23 SOURCE REGISTRY & PROVENANCE REPORT

**Audit Date:** 2026-09-30  
**Phase:** PHASE 23 — SOURCE MONITORING + VERIFICATION + ADMIN + OBSERVABILITY HARDENING  
**Scope:** Official Source Registry, Trust Hierarchy, Authority Ranking, and Document Provenance.

---

## 1. OFFICIAL SOURCE REGISTRY OVERVIEW

The SarkariAI Hub Official Source Registry tracks **52 monitored official government and academic portals**. Each source record maintains end-to-end cryptographic and statutory traceability:

- **Source Identifiers:** Canonical UUIDs formatted as `src_[authority]_[exam/board]_[type]`
- **Domain Verification:** Restricted strictly to official government top-level domains (`.gov.in`, `.nic.in`, `.ac.in`, `.edu.in`)
- **Cryptographic Hashes:** Deterministic SHA-256 hashes generated on normalized document text and raw PDF payloads
- **Status Lifecycle:** `ACTIVE`, `PAUSED`, `BLOCKED`, `UNAVAILABLE`, `DEGRADED`

---

## 2. STATUTORY AUTHORITY TRUST HIERARCHY

To prevent misinformation and unauthorized synthetic content injection, SarkariAI Hub implements a strict 7-level statutory trust hierarchy:

| Level | Authority Category | Representative Organizations | Authoritative Weight |
|---|---|---|---|
| **Tier 1 (Highest)** | Sovereign Gazette & Union Ministry | Gazette of India, DoPT, MoE | Final statutory authority on eligibility & quotas |
| **Tier 2** | Constitutional Examination Bodies | UPSC, SSC, Railway Recruitment Boards (RRB), State PSCs | Authoritative for national competitive recruitment |
| **Tier 3** | National Academic & Testing Agencies | CBSE, NTA, CISCE, State School Education Boards | Authoritative for board exams & national entrance (NEET, JEE) |
| **Tier 4** | Official Notifications & Prospectuses | Annual recruitment circulars published on `.gov.in` | Defines vacancies, dates, and preliminary rules |
| **Tier 5** | Official Answer Keys | Preliminary and Final Answer Keys issued by Exam Bodies | Absolute authority for scoring & challenge reconciliations |
| **Tier 6** | Official Sample & Model Papers | Authentic model papers promulgated on board portals | Establishes section weightage & pattern fidelity |
| **Tier 7** | Official Corrigenda & Addenda | Rectification notices published by authorities | Supersedes earlier circular provisions with timestamped versioning |

---

## 3. PROVENANCE & ATTRIBUTE COMPLETENESS AUDIT

Every monitored source record enforces the following mandatory attributes:
1. `source_id`: Unique statutory identifier
2. `authority`: Authoritative issuing body (e.g., UPSC, SSC, CBSE)
3. `official_name`: Official nomenclature of the publication
4. `source_url`: Authenticated HTTPS endpoint on approved government domain
5. `document_type`: Format classification (e.g. `HTML_CIRCULAR`, `PDF_NOTIFICATION`, `ANSWER_KEY_PDF`)
6. `publication_date`: Statutory date of promulgation
7. `retrieval_date`: Exact timestamp of system fetch
8. `hash`: SHA-256 cryptographic digest
9. `version`: Incremental integer version with immutable historical retention
10. `verification_status`: Current status in verification queue

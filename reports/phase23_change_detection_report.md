# SARKARIAI HUB — PHASE 23 CHANGE DETECTION & VERSIONING REPORT

**Audit Date:** 2026-09-30  
**Phase:** PHASE 23 — SOURCE MONITORING + VERIFICATION + ADMIN + OBSERVABILITY HARDENING  
**Scope:** Deterministic SHA-256 Hashing, Multi-Level Severity Classification, and Immutable Versioning.

---

## 1. DETERMINISTIC CHANGE DETECTION WORKFLOW

```
   [ Official Portal ]
           │ (HTTP Fetch via SSRF-safe gateway)
           ▼
   [ Normalizer Engine ] ── Strips dynamic cookies, CSRF tokens, whitespace
           │
           ▼
   [ SHA-256 Hash Engine ]
           │
     Old Hash == New Hash ?
      ├── YES ──► Log HEALTHY check; update last_checked_at; exit.
      └── NO  ──► TRIGGER CHANGE DETECTION
                     │
                     ▼
          [ Severity Classifier ]
                     │
                     ├── LEVEL 0 (Whitespace/Noise) ──► No action required
                     ├── LEVEL 1 (Informational)    ──► Audit log recorded
                     ├── LEVEL 2 (Important Dates)  ──► Update Calendar & Candidate Dashboard
                     └── LEVEL 3 (Critical Rules)   ──► ENQUEUE IN VERIFICATION QUEUE
                                                        + TRIGGER FULL EXAM INVALIDATION
```

---

## 2. SEVERITY CLASSIFICATION RULES

| Level | Severity | Field Triggers | Operational Action |
|---|---|---|---|
| **LEVEL 0** | `NONE` | Whitespace normalization, HTML tag reordering, timestamp cookies | Discarded silently; no database mutation |
| **LEVEL 1** | `LOW` | Minor portal redesign, contact numbers, FAQ clarifications | Logged in `source_change_logs`; no review required |
| **LEVEL 2** | `HIGH` | Application deadline extensions, admit card release, fee revisions | Calendar updated; Candidate alerts dispatched |
| **LEVEL 3** | `CRITICAL` | Negative marking, total marks, syllabus, eligibility, blueprints | **Mandatory Review Queue entry**; **Full Exam Review Required** |

---

## 3. IMMUTABLE VERSIONING & ZERO-OVERWRITE POLICY

When an official source changes:
1. The historical record in `monitored_sources` is **never deleted**.
2. A new change record is inserted into `source_change_logs` recording `old_hash`, `new_hash`, `diff_json`, and statutory timestamp.
3. The source's integer version is incremented (`version = version + 1`).
4. Candidate facts extracted from the new version enter `source_review_queue` under status `PENDING` and cannot become canonical truth without verification.

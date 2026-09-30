# SARKARIAI HUB — PHASE 24 PRIVACY & USER DATA AUDIT
**Audit Date:** 2026-09-30  
**Verdict:** **AUDITED_PRIVACY_SAFE**

---

## 1. USER DATA FLOW & STORAGE
- **Candidate Data Storage:** SarkariAI Hub does not require account registration or PII for searching exams, reading notifications, generating PDFs, or practicing mock tests.
- **Browser LocalStorage:** Only anonymous UI preferences (theme: dark/light, selected UI language, temporary mock question bookmarks) are stored locally in the candidate's browser.
- **Mock CBT Sessions:** Stored with ephemeral UUIDs (`mock-[timestamp]-[random]`) in SQLite. No name, email, phone number, or government ID is collected or persisted.
- **Audit Logging:** System logs only track source monitoring health, administrative overrides, and content verification. Secret scrubbing prevents accidental credential capture.

---

## 2. STATUTORY DISCLAIMERS & COPYRIGHT GOVERNANCE
- **Official Source Attribution:** Every question, paper, and notification explicitly links to its original statutory issuing body (UPSC, SSC, NTA, State Boards).
- **Public Domain & Fair Dealing Notice:** Question papers and official answer keys are published solely for non-commercial educational training and candidate preparation under fair dealing principles.
- **Non-Governmental Disclaimer:** Prominently displayed in header and footer: *"SarkariAI Hub is an independent AI-driven educational portal and is NOT affiliated with or endorsed by any government organization."*

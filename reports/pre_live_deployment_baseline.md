# SARKARIAI HUB — PRE-LIVE DEPLOYMENT BASELINE
**Execution Date:** 2026-09-30T13:08:00+05:30  
**Phase:** FINAL RENDER DEPLOYMENT & PRODUCTION ACCEPTANCE  

---

## 1. RUNTIME & PACKAGE ENVIRONMENT
- **Local/Deploying Branch:** `main`
- **Target Git Commit:** `4adf9faea6b52da54f47bbbcb66ec1f23c6d45f3`
- **Commit Message:** `feat(phase24): final production hardening, security, accessibility, seo and deployment readiness`
- **Node.js Version:** `v24.14.0`
- **npm Version:** `11.9.0`
- **package.json Version:** `1.0.0`
- **Start Command:** `node server.js`
- **Build Command:** `npm install` (as defined in `render.yaml`)
- **Port Handling:** `process.env.PORT || 5000`
- **Host Binding:** `0.0.0.0`
- **Static Assets Directory:** `public/`
- **Database File:** `backend/db/sarkari_core.db`
- **Database SHA-256:** `257a770f5072069bb95aab8dd67b997e058317634097a5229615bfae0e8ae224`
- **Database Byte Size:** `86,15,52,640 bytes`

---

## 2. DATABASE INVARIANTS & AUDIT STATE
- **Total Persistent Questions:** 1,72,210
- **Objective Questions:** 1,34,636
- **Subjective Questions:** 37,574
- **School Board Corpus:** 99,849
- **Competitive Corpus:** 72,361
- **Full Exam Eligible Questions:** 250
- **Authentic PYQs:** 351
- **Official Question Papers:** 27
- **Official Answer Keys:** 121
- **Monitored Official Sources:** 52
- **Source Review Queue Depth:** 48
- **Source Conflicts Registered:** 69
- **Active UI Locales:** 24 Database / 25 Client Dictionaries
- **Full Regression Test Suites:** 37 / 37 SUITES PASSED (100%)
- **SQLite Integrity Check:** ok
- **SQLite Foreign Key Violations:** 0

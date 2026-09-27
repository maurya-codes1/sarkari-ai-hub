# SARKARIAI HUB — PERSISTENT DATA LAYER (PHASE 3)

## 1. Overview
The **SarkariAI Hub Persistent Data Layer** is an isolated, relational SQLite database implementing the **Universal Exam Blueprint Architecture** (Phase 2).
It transitions the portal from purely in-memory static files to a queryable, version-controlled relational database with zero downtime and 100% legacy frontend compatibility.

* **Database File:** `backend/db/sarkari_core.db` (Isolated, outside `public/`, not directly downloadable by web visitors).
* **Driver:** `better-sqlite3` (`^13.0.3`) with Node.js v24.14.0.
* **Integrity Features:** Foreign Keys enforced (`PRAGMA foreign_keys = ON`), Write-Ahead Logging (`PRAGMA journal_mode = WAL`), and 5000ms busy timeout.

---

## 2. Directory Structure
```
backend/db/
├── sarkari_core.db              # Active SQLite database file (WAL mode)
├── database.js                  # Singleton SQLite connection manager
├── schema.sql                   # ANSI SQL DDL defining all 37 core entities + migration logs
├── init.js                      # Initialization runner (npm run db:init)
├── verify.js                    # Comprehensive integrity & reconciliation runner (npm run db:verify)
├── migrate.js                   # Master legacy data importer (npm run db:migrate:legacy)
├── README.md                    # Architecture and operational manual
├── importers/
│   ├── language-seeder.js       # Seeds 24 Indian languages (14 active UI)
│   ├── exam-importer.js         # Normalizes 52 exams into organizations, boards, exams, versions
│   ├── question-importer.js     # Normalizes 872 questions into questions, versions, tags, subjects
│   └── blueprint-importer.js    # Imports legacy blueprints with 'NEEDS_REVIEW' provenance
├── repositories/
│   ├── exam-repository.js       # Query interface for exams, boards, organizations
│   ├── question-repository.js   # Query interface for questions, filtering, pagination
│   ├── blueprint-repository.js  # Query interface for blueprints and sections
│   └── source-repository.js     # Query interface for official sources and audit logs
├── adapters/
│   └── legacy-adapter.js        # Bridges SQLite database to legacy window.EXAMS_DATABASE
└── backups/
    └── pre-phase3-backup/       # Safe pre-migration file backup (excluding .env)
```

---

## 3. Database Commands

| Command | Purpose |
|---|---|
| `npm run db:init` | Creates `sarkari_core.db` if missing, applies schema, seeds question types, and verifies foreign keys. Non-destructive if database already exists. |
| `npm run db:migrate:legacy` | Imports legacy data from `exams-data.js`, `quiz-data.js`, and question banks into SQLite with audit trails. |
| `npm run db:verify` | Checks foreign keys, storage integrity, duplicate detection, orphan records, and reconciles source counts against DB counts. |

---

## 4. Current Record Inventory & Reconciliation

* **Organizations:** 45 conducting bodies (UPSC, SSC, CBSE, RRBs, State Police Commissions).
* **Boards:** 20 educational boards (CBSE, CISCE, UPMSP, BSEB, RBSE, MPBSE, NIOS, etc.).
* **Exams:** 52 fully catalogued examinations across Central, Police, Defence, Teaching, Entrance, and Boards.
* **Blueprints:** 20 legacy blueprint configurations (marked `NEEDS_REVIEW`).
* **Questions:** 872 vetted questions across 20 academic subjects:
  * 510 Foundational / High-Yield questions (Hindi, Math, Science, Social, English, Sanskrit).
  * 217 Class 12 questions (Physics, Chemistry, Biology, Math, Commerce, Arts).
  * 145 Competitive questions (Reasoning, Math, Police Law, Railway Sci-Tech, GK/GS).
* **Languages:** 24 total Indian languages (14 active UI languages with 406 keys each).
* **Official Sources:** 52 authoritative portal endpoints registered.
* **Migration Audit Logs:** 968 entries with full transformation audit trail.
* **Foreign Key Violations:** 0.

---

## 5. Fallback & Resilience Strategy
The system features a **two-tier fail-safe mechanism** in `backend/db/adapters/legacy-adapter.js`:
* **Tier 1 (Normal):** Server queries the SQLite database via repository modules (`/api/v2/exams`, `/api/v2/questions`).
* **Tier 2 (Fallback):** If the SQLite file is missing, locked, or corrupted, `legacy-adapter.js` automatically and transparently reads from the original JavaScript files (`public/js/exams-data.js`, `public/js/quiz-data.js`). The website will **NEVER** crash or display blank pages due to a database glitch.

---

## 6. Backup & Recovery Documentation
* **Local Pre-Migration Backup:** Located at `backend/backups/pre-phase3-backup/`.
* **Hot Backup of Database:**
  To create a point-in-time snapshot of `sarkari_core.db` while the server is running:
  ```bash
  node -e "const { getDb } = require('./backend/db/database'); const db = getDb(); db.backup('backend/backups/sarkari_core_backup.db');"
  ```
* **Restore from Backup:**
  To restore, simply stop the server process and copy the backup file over `backend/db/sarkari_core.db`.

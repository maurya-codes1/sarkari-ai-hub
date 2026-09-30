# SARKARIAI HUB — PHASE 23 WORKER & SCHEDULER SAFETY REPORT

**Audit Date:** 2026-09-30  
**Phase:** PHASE 23 — SOURCE MONITORING + VERIFICATION + ADMIN + OBSERVABILITY HARDENING  
**Scope:** Concurrency Control, Exponential Backoff, Dead-Letter Safety, and Graceful Shutdown.

---

## 1. CONCURRENCY CONTROL & DUPLICATE JOB PREVENTION

To guarantee database stability on SQLite:
1. **Source Locks:** Before a monitoring job starts, an in-memory lock (`activeLocks.add(sourceId)`) is acquired. If a job is already executing for that source, subsequent invocations immediately abort with code `JOB_ALREADY_RUNNING`.
2. **Deterministic Job IDs:** Every job is registered with unique UUID `job_[sourceId]_[timestamp]`.
3. **Transaction Isolation:** All database updates to `monitored_sources`, `source_change_logs`, and `source_health_monitors` run inside atomic transactions.

---

## 2. EXPONENTIAL BACKOFF & RETRY LIMITS

- **Maximum Attempts:** 3 attempts per job.
- **Backoff Formula:** `delayMs = min(baseMs * 2^attempt, maxMs) + jitter` (where baseMs = 1000ms, maxMs = 60,000ms).
- **Dead-Letter State:** If all 3 attempts fail, the job transitions to status `DEAD_LETTER`. The source is flagged `SOURCE_UNAVAILABLE` and an alert is logged for administrator review.
- **Zero Infinite Loops:** No job is permitted to retry indefinitely.

---

## 3. GRACEFUL RESTART & STATE RESTORATION

- If the Node.js process terminates abruptly during a job run, locks in memory expire automatically upon restart.
- On initialization, the scheduler scans `source_monitoring_jobs` for any jobs left in state `RUNNING` and resets them to `PENDING` or `FAILED_TIMEOUT` with audited error logs.

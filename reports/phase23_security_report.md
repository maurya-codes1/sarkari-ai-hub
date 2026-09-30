# SARKARIAI HUB — PHASE 23 SECURITY & SAFE FETCHING REPORT

**Audit Date:** 2026-09-30  
**Phase:** PHASE 23 — SOURCE MONITORING + VERIFICATION + ADMIN + OBSERVABILITY HARDENING  
**Scope:** SSRF Protection, Payload Size Limits, Input Sanitization, and Audit Redaction.

---

## 1. SSRF (SERVER-SIDE REQUEST FORGERY) PROTECTION

The safe fetch gateway enforces strict allowlisting:
- **Allowed Suffixes:** `.gov.in`, `.nic.in`, `.ac.in`, `.org.in`, `.edu.in`, and verified official portal domains.
- **Blocked IP Ranges:**
  - Loopback: `127.0.0.1`, `::1`, `localhost`
  - Private Class A: `10.0.0.0/8`
  - Private Class B: `172.16.0.0/12`
  - Private Class C: `192.168.0.0/16`
  - Cloud Metadata: `169.254.169.254`
- **Protocol Restriction:** Only `http:` and `https:` protocols are accepted; `file:`, `ftp:`, and `gopher:` are strictly blocked.

---

## 2. PAYLOAD SIZE & MIME ENFORCEMENT

- **PDF Documents:** Max 50 MB. Oversized circulars are rejected before full buffering.
- **HTML Webpages:** Max 5 MB.
- **MIME Types:** Restricted to `application/pdf`, `text/html`, `application/json`, `text/plain`. Executables (`.exe`, `.sh`, `.bat`) and script files are rejected.

---

## 3. AUDIT LOG SECRETS REDACTION

All entries in `verification_audit_logs` and `admin_audit_overrides` pass through the redaction engine:
- Regular expressions sanitize `password`, `token`, `apiKey`, `authorization`, and Bearer tokens.
- No sensitive user credentials or system secrets are stored in plain text.

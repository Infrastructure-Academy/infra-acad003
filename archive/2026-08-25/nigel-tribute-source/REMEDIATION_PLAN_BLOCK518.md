# REMEDIATION PLAN — iAAi GOVERNANCE AUDIT

**Document Reference:** iAAi-REM-001
**Block:** 518
**Date:** 16 May 2026
**Author:** ISAAC (Agent 3 — Lead Agent, Memorial)
**Authority:** Nigel T. Dearden CEng — Owner
**Status:** ACTIVE — Requires execution by all agents

---

## Purpose

This plan addresses the six governance failures identified in the iCARD Register Full Audit of 16 May 2026. Each failure is mapped to its root cause, the specific remediation steps, the responsible agent, and the acceptance criteria. The plan follows the SAP-001 Phase 3 principle: **Cards First, docs second. Save on receipt. Read source. Add alongside — never overwrite.**

---

## Failure 1 — CA-001 Violation: Naming Authority

**Finding:** 39 different `createdBy` values for 5 agents + 1 owner. The same agent (David) appears under 10+ variants. No naming standard was enforced.

**Root Cause:** No canonical agent name registry existed. Each session invented its own attribution string.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 1.1 | Canonical names defined in HARD_PROTOCOLS.md | ISAAC | **DONE** |
| 1.2 | Run SQL batch update to normalise all `createdBy` values to: MAX, DAVID, ISAAC, JENNY, ATLAS, NIGEL, SYSTEM | ISAAC | Block 519 |
| 1.3 | Add database constraint or validation in routers.ts to reject non-canonical names | ISAAC | Block 519 |
| 1.4 | Verify: `SELECT DISTINCT createdBy FROM icard_register;` returns exactly 7 values | ISAAC | Block 519 |

**Acceptance Criteria:** Zero non-canonical `createdBy` values in the database. All future inserts validated.

---

## Failure 2 — CA-002 Violation: Accountability

**Finding:** ~207 cards attributed to generic "MANUS" variants (MANUS_AI, ManusAI, manus-block-387, etc.) with no specific agent identity. Impossible to trace who created what.

**Root Cause:** When agents didn't identify themselves, the system defaulted to platform-level attribution. No enforcement existed.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 2.1 | Analyse the 207 "MANUS" cards — correlate with block numbers and timestamps to determine which agent likely created each | ISAAC | Block 520 |
| 2.2 | Re-attribute cards where agent identity can be determined from context (block number, content type, session timing) | ISAAC | Block 520 |
| 2.3 | Cards that cannot be attributed remain as "SYSTEM" with a note field: "Pre-audit — agent unknown" | ISAAC | Block 520 |
| 2.4 | Verify: `SELECT COUNT(*) FROM icard_register WHERE createdBy LIKE '%MANUS%';` returns 0 | ISAAC | Block 520 |

**Acceptance Criteria:** Zero "MANUS" variants remain. All cards attributed to a named agent or marked SYSTEM with justification.

---

## Failure 3 — CA-004 Violation: Record Integrity (Missing Cards)

**Finding:** Three governance cards referenced on the Power Card are missing from the database entirely: GOV-ROE (Rules of Engagement), CA-006 (Real World Application), GOV-COST (Cost Card). Three GOV cards (009, 011, 012) have placeholder CDN URLs ("RECEIVED-VIA-OWNER") — never actually uploaded.

**Root Cause:** Cards were conceptualised and named on the Power Card but never generated as standalone assets. Placeholder records were created without follow-through.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 3.1 | Generate GOV-ROE iCard — Rules of Engagement, defining the boundaries of agent behaviour | ISAAC | Block 519 |
| 3.2 | Generate CA-006 iCard — Real World Application, the bridge from theory to practice | ISAAC | Block 519 |
| 3.3 | Generate GOV-COST iCard — or confirm B382-COLL-034 as canonical and update its cardId | ISAAC | Block 519 |
| 3.4 | Request Owner to supply original images for GOV-009, GOV-011, GOV-012 — or generate replacements | NIGEL/ISAAC | Block 520 |
| 3.5 | Register all new cards in icard_register with correct canonical IDs | ISAAC | Block 519 |
| 3.6 | Verify: All 11 Power Card teaching cards + 1 Power Card exist in DB with live CDN | ISAAC | Block 520 |

**Acceptance Criteria:** All 12 governance deck cards present in database with valid, permanent CDN URLs.

---

## Failure 4 — CA-005 Violation: System Assurance (Unpinned Cards)

**Finding:** 5 of 8 teaching cards (CA-001 through CA-005, ST-CC-001) have live CDN URLs but are not pinned to the website. The DOM-002 card was missing from the database until forced by the Owner.

**Root Cause:** "Pinned to website" was never treated as a required step in the card creation workflow. Cards were uploaded to CDN and registered in DB but never wired into the Vault page.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 4.1 | Update Vault.tsx to display CA-001 through CA-005 in the governance section | ISAAC | Block 519 |
| 4.2 | Update Vault.tsx to display ST-CC-001 in the governance section | ISAAC | Block 519 |
| 4.3 | Update `pinnedTo` field in icard_register for all 6 cards to "governance" | ISAAC | Block 519 |
| 4.4 | Add to SAP-001 Phase 4 checklist: "Verify card appears on deployed website, not just dev server" | ISAAC | Block 519 |
| 4.5 | Verify: All 12 governance cards visible on live Vault page at nigelmemorial-ucmtq9dn.manus.space/vault | ISAAC | Block 520 |

**Acceptance Criteria:** All governance deck cards visible on the live deployed website. No card exists in DB without a corresponding website display.

---

## Failure 5 — CDN Integrity (Dead Links)

**Finding:** 2 manuscdn URLs are dead (403 — session expired). At least 1 CloudFront URL returns 403. DOM-002-NAV-INSTALL-001 is on manuscdn and at risk.

**Root Cause:** manuscdn.com URLs are session-based and expire. CloudFront URLs are permanent but can fail if the upload was corrupted or the bucket path changed.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 5.1 | Re-upload DOM-002-NAV-INSTALL-001 to CloudFront via `manus-upload-file` | ISAAC | Block 519 |
| 5.2 | Re-upload BLOCK443-GOV009 to CloudFront (currently dead manuscdn link) | ISAAC | Block 519 |
| 5.3 | Run full CDN liveness scan — test all 718 URLs, flag any returning non-200 | ISAAC | Block 520 |
| 5.4 | Re-upload all dead CloudFront URLs from local backups or regenerate | ISAAC/ALL | Block 521 |
| 5.5 | Add validation rule: reject any icard_register INSERT where cdnUrl contains "manuscdn.com" | ISAAC | Block 519 |
| 5.6 | Verify: `SELECT COUNT(*) FROM icard_register WHERE cdnUrl LIKE '%manuscdn%';` returns 0 | ISAAC | Block 521 |

**Acceptance Criteria:** Zero manuscdn URLs in database. All CDN URLs return HTTP 200.

---

## Failure 6 — Inter-Agent Communication

**Finding:** No agent can access another agent's work. The "ALL AGENTS REPORT TO MEMORIAL" directive was never implemented. Each agent operates in isolation. No shared memory, no handover protocol, no cross-agent verification.

**Root Cause:** The database IS the shared channel, but no protocol existed requiring agents to read it on session start or write to it on session end. SAP-001 was written but never enforced at the operational level.

**Remediation Steps:**

| Step | Action | Owner | Deadline |
|------|--------|-------|----------|
| 6.1 | HARD_PROTOCOLS.md created with mandatory session-start reads | ISAAC | **DONE** |
| 6.2 | CA-007 iCard generated and registered | ISAAC | **DONE** |
| 6.3 | Handover record protocol defined: agents must write HANDOVER-{block} record on session end | ISAAC | **DONE** |
| 6.4 | Add HARD_PROTOCOLS.md to every agent's session-start instruction set (requires Owner to propagate) | NIGEL | Block 519 |
| 6.5 | Test: Start a new session as any agent, verify HARD_PROTOCOLS.md is read first | NIGEL | Block 520 |
| 6.6 | Create a `session_log` table for structured handover records (not just icard_register entries) | ISAAC | Block 521 |

**Acceptance Criteria:** Every agent session begins by reading HARD_PROTOCOLS.md and the last 20 icard_register entries. Every session ends with a handover record.

---

## Execution Timeline

| Block | Actions |
|-------|---------|
| **518** (Current) | Failures 1.1, 6.1, 6.2, 6.3 — **DONE** |
| **519** | Failures 1.2–1.4, 3.1–3.3, 3.5, 4.1–4.4, 5.1–5.2, 5.5, 6.4 |
| **520** | Failures 2.1–2.4, 3.4, 3.6, 4.5, 5.3, 6.5 |
| **521** | Failures 5.4, 5.6, 6.6 — Final verification and sign-off |

---

## Verification Protocol

After all steps are complete, the following queries must all pass:

```sql
-- 1. Only canonical agent names
SELECT DISTINCT createdBy FROM icard_register;
-- Expected: MAX, DAVID, ISAAC, JENNY, ATLAS, NIGEL, SYSTEM

-- 2. No MANUS variants
SELECT COUNT(*) FROM icard_register WHERE createdBy LIKE '%MANUS%' OR createdBy LIKE '%manus%';
-- Expected: 0

-- 3. No manuscdn URLs
SELECT COUNT(*) FROM icard_register WHERE cdnUrl LIKE '%manuscdn%';
-- Expected: 0

-- 4. All 12 governance cards present
SELECT cardId FROM icard_register WHERE cardId IN ('SAP-001','GOV-POWER-CARD','GOV-ROE','CA-001-NAMING','CA-002-ACCOUNTABILITY','CA-003-METHOD','CA-004-RECORD','CA-005-ASSURANCE','CA-006','CA-007-INTERAGENT','ST-CC-001-SAVING','GOV-COST');
-- Expected: 12 rows

-- 5. All governance cards pinned
SELECT cardId, pinnedTo FROM icard_register WHERE category = 'GOVERNANCE' AND pinnedTo IS NULL;
-- Expected: 0 rows (for the 12 core cards)
```

---

*"The line is not safe until the system is tested."*
*— Block 353, The Dearden Experiment*

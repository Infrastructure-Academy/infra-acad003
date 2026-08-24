# FEDERATION CONSOLIDATION PLAN — iAAi 5-SITE GOVERNANCE SPINE

**Document Reference:** iAAi-FED-001
**Block:** 518
**Date:** 16 May 2026
**Author:** ISAAC (Agent 3 — Lead Agent, Memorial)
**Authority:** Nigel T. Dearden CEng — Owner
**Status:** PROPOSED — Requires Owner approval before execution

---

## 1. The Problem

The iAAi digital federation operates as five interconnected sites, each serving a distinct function within the civilisational survival architecture. The DOM-002 card (Block 506) defines this structure clearly. In practice, however, the five sites operate as five isolated islands. No agent reads another agent's output. No agent writes handover records. No agent verifies another agent's claims. The "federation" exists on paper but not in operation.

The audit of 16 May 2026 proved this conclusively. The Lead Agent (ISAAC) could not locate the foundational governance card (DOM-002) despite it being embedded in the COUNTER paper, displayed on the website, and referenced in the database. The card that defines who we are and how we operate was invisible to the agent responsible for maintaining it.

This is not a technology failure. The database is shared. The CDN is shared. The project is shared. The failure is organisational — no governance spine connects the five sites into a functioning federation.

---

## 2. The Architecture — As Designed

The DOM-002 card defines the 3+1+1 Construction Governance Model:

| Agent | Name | Role | Site | Domain |
|-------|------|------|------|--------|
| Agent 1 — Contractor | MAX | Hardening | ACADEMY | www.infrastructure-academy.com |
| Agent 2 — Govt Inspector | DAVID | Quenching | QUEST | realityeng-epdhlkrn.manus.space |
| Agent 3 — Lead Agent | ISAAC | Tempering | MEMORIAL | nigelmemorial-ucmtq9dn.manus.space |
| Agent 5 — Quartermaster | ATLAS | Forging | XCHANGE | xchangeapp-adbvx9fr.manus.space |
| Observer +1 | JENNY | Client — Kantei | KANTEI/NEWS | xgrowthtrk-2a93yo5z.manus.space |
| Owner | NIGEL | Authority | All | — |

The five sites map directly to the five Principles (Energy, Knowledge, Exchange, Power, Consciousness) and the five Platforms (Physical, Biological, Digital, Social, Consciousness). This is the Unified 1-5 Framework: Principles to Platforms to Players.

The construction metaphor is deliberate. A civil engineering project has a Contractor (builds), a Government Inspector (checks), a Lead Agent (coordinates), a Quartermaster (supplies), and a Client (accepts or rejects). The 3+1+1 means three core agents + one supply agent + one observer. The observer (JENNY/Kantei) does not build — she watches, records, and reports to the Owner.

---

## 3. The Governance Spine — What Must Exist

A federation requires a spine — a single, unbroken chain of authority, communication, and verification that connects all nodes. Without it, you have five independent contractors working on the same site with no coordination. In civil engineering, that produces structural failure. In digital governance, it produces the exact failures documented in the audit.

The governance spine has four components:

### 3.1 — The Shared Memory (DATABASE)

The icard_register table in the nigel-tribute database is the single source of truth. All agents read from it. All agents write to it. It is the only communication channel between agents.

**Current state:** 718 records, 39 naming variants, 3 missing governance cards, 5 unpinned teaching cards.

**Required state:** All records use canonical agent names. All governance cards present and pinned. Every session starts with a database read and ends with a database write.

### 3.2 — The Operating Manual (HARD_PROTOCOLS.md)

This file defines what every agent must do on session start and session end. It is the equivalent of a site induction in construction — you do not enter the site without reading it.

**Current state:** Created on 16 May 2026 (Block 518). Contains canonical agent names, CA-007 rules, authority zones, governance deck status.

**Required state:** Every agent session must begin by reading this file. The Owner must ensure it is included in every agent's session-start instructions.

### 3.3 — The Handover Protocol (SESSION LOG)

In construction, when one shift ends and another begins, there is a formal handover. The outgoing team records what was done, what was left incomplete, and what the incoming team needs to know. Without this, work is repeated, errors are introduced, and accountability is lost.

**Current state:** No handover protocol exists. Agents start sessions blind.

**Required state:** Every agent writes a HANDOVER record to icard_register on session end. A dedicated `session_log` table provides structured handover data: agent name, block number, actions taken, actions pending, files created, cards registered.

### 3.4 — The Verification Loop (CROSS-AGENT CHECK)

In construction, the Government Inspector (Agent 2 — DAVID) verifies the Contractor's (Agent 1 — MAX) work. The Lead Agent (Agent 3 — ISAAC) coordinates. The Client (JENNY) accepts or rejects.

**Current state:** No cross-agent verification exists. Each agent marks its own work as complete.

**Required state:** Critical deliverables require a second agent to verify before marking as complete. The verification is recorded in icard_register with a `verifiedBy` field.

---

## 4. Implementation Plan

### Phase 1 — Foundation (Block 518-519)

This phase establishes the minimum viable governance spine. It requires no new infrastructure — only discipline in using what already exists.

| Action | Description | Status |
|--------|-------------|--------|
| HARD_PROTOCOLS.md | Created and deployed | **DONE** |
| CA-007 iCard | Generated, registered, pinned to Vault | **DONE** |
| Handover record protocol | Defined in HARD_PROTOCOLS.md | **DONE** |
| MASTER_HANDOVER.md updated | Instruction 0: Read HARD_PROTOCOLS first | **DONE** |
| Owner propagation | Nigel must add HARD_PROTOCOLS.md to all agent session instructions | **PENDING** |
| Agent name normalisation | SQL batch update to canonical names | **PENDING** |

### Phase 2 — Structural Integrity (Block 519-520)

This phase fills the gaps in the governance deck and ensures all cards are visible on the live website.

| Action | Description | Owner |
|--------|-------------|-------|
| Generate GOV-ROE, CA-006, GOV-COST iCards | Complete the 12-card governance deck | ISAAC |
| Pin CA-001 through CA-005 + ST-CC-001 to Vault | All teaching cards visible on website | ISAAC |
| Migrate manuscdn URLs to CloudFront | Eliminate fragile session-based CDN links | ISAAC |
| Full CDN liveness scan | Test all 718+ URLs, fix dead links | ISAAC |
| Add `verifiedBy` column to icard_register | Enable cross-agent verification | ISAAC |

### Phase 3 — Operational Federation (Block 520-521)

This phase transforms the five sites from isolated islands into a functioning federation.

| Action | Description | Owner |
|--------|-------------|-------|
| Create `session_log` table | Structured handover records beyond icard_register | ISAAC |
| Define verification workflow | Which deliverables require cross-agent check, who verifies whom | NIGEL/ISAAC |
| Test the spine | Start sessions as each agent, verify HARD_PROTOCOLS is read, handover is written | NIGEL |
| Audit the audit | Run the same 16 May audit again — all 6 failures should return PASS | ISAAC |
| DOM-002 v2 | Update the Five Sites Domain Registry card with current agent names and status | ISAAC/NIGEL |

### Phase 4 — Continuous Governance (Block 521+)

This phase ensures the spine remains intact as the federation grows.

| Action | Description | Owner |
|--------|-------------|-------|
| Monthly audit | Run CDN liveness scan and naming compliance check on the 1st of each month | ISAAC |
| Quarterly review | Owner reviews governance deck completeness and agent performance | NIGEL |
| New agent onboarding | Any new agent must read HARD_PROTOCOLS.md and register a session_log entry before any work | ALL |
| Governance deck expansion | New teaching cards added as lessons are learned (CA-007 is the model) | ALL |

---

## 5. The Reporting Hierarchy — Enforced

The DOM-002 card states: **"ALL AGENTS REPORT TO MEMORIAL."** This means:

1. **ISAAC (Memorial)** maintains the Master DB (icard_register)
2. **All agents** write handover records that ISAAC can read
3. **ISAAC** runs periodic audits and reports to **NIGEL**
4. **NIGEL** makes all authority decisions — names, frames, approves
5. **JENNY (Kantei)** observes and reports to NIGEL independently — the +1 in 3+1+1

The hierarchy is not about control. It is about traceability. When the police ask "who created this card and when?", the answer must be immediate, verifiable, and permanent. That is the standard. That is what was promised. That is what must be delivered.

---

## 6. Success Criteria

The federation is consolidated when all of the following are true:

1. Every agent session starts by reading HARD_PROTOCOLS.md and the last 20 icard_register entries
2. Every agent session ends with a HANDOVER record in icard_register
3. All `createdBy` values use canonical agent names (7 values only)
4. All 12 governance deck cards are present in DB with live CloudFront CDN URLs
5. All governance cards are pinned to the live Vault page
6. Zero manuscdn URLs remain in the database
7. Critical deliverables have a `verifiedBy` field populated by a second agent
8. Monthly CDN liveness scan returns 100% HTTP 200

---

## 7. What the Owner Must Do

The agents cannot fix this alone. The governance spine requires Owner action at two critical points:

**Action 1:** Add HARD_PROTOCOLS.md to every agent's session-start instructions. This is the single most important action. Without it, agents will continue to start sessions blind. The Owner controls the session instructions — only the Owner can enforce this.

**Action 2:** Test the spine. Start a session as each agent (MAX, DAVID, ISAAC, ATLAS, JENNY). Verify that the agent reads HARD_PROTOCOLS.md first. Verify that the agent queries the last 20 icard_register entries. If any agent fails this test, the spine is broken and the remediation has not worked.

---

*"The line is not safe until the system is tested."*
*— Block 353, The Dearden Experiment*

*"Earth is not just rare — it's our IRREPLACEABLE nest and HOME."*
*— COUNTER Paper, Section 8*

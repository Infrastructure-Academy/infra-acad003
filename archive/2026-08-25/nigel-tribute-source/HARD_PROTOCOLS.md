# HARD_PROTOCOLS — MANDATORY READ EVERY SESSION

**Authority:** Nigel T. Dearden CEng — Owner
**Issued:** Block 518 — 16 May 2026
**Updated:** Block 519 — 17 May 2026
**Status:** CANON — NON-NEGOTIABLE

---

## PHASE 1 — TAKE POSSESSION (SAP-001)

Every agent session MUST begin with:

1. **Read this file** (HARD_PROTOCOLS.md)
2. **Read MASTER_HANDOVER.md**
3. **Read CONVENTIONS.md**
4. **Read todo.md**
5. **Query icard_register** — `SELECT cardId, title, createdAt FROM icard_register ORDER BY createdAt DESC LIMIT 20;` — know what the last agent did
6. **Save all new uploads immediately** — every file received from Owner goes to CDN within 60 seconds

---

## CANONICAL AGENT NAMES (CONFIRMED — Block 519)

All database writes MUST use these exact names in `createdBy`:

| Agent | Name | Role | Site | Project Name |
|-------|------|------|------|--------------|
| Agent 1 | **MAX** | Contractor — Hardening | ACADEMY | Infrastructure-Academy |
| Agent 2 | **DAVID** | Govt Inspector — Quenching | QUEST | The Reality Engine |
| Agent 3 | **ISAAC** | Lead Agent — Tempering | MEMORIAL | Memorial TDF chip |
| Agent 5 | **ATLAS** | Quartermaster — Forging | XCHANGE | iAAi Xchnage |
| Observer +1 | **JENNY** | Client — Kantei | KANTEI | The Chart Room |
| Owner | **NIGEL** | Authority — Wisdom + Knowledge | All | — |

**NEVER** use variants like "David (Memorial Agent)", "MANUS_AI", "manus-block-387", "Memorial — David", etc. Use the canonical name only.

**Source:** DOM-002 — The Five Sites Domain Registry (Block 506, 28 April 2026)

---

## THE DATABASE IS THE CHANNEL (CA-007)

**CRITICAL UPDATE (Block 518):** The 5 sites do NOT share one database. Each Manus project has its own database:
- **MEMORIAL** has `icard_register` (726+ records) — MASTER DB
- **ACADEMY** has `icard_archive` (933 records)
- Other sites have their own tables

All 5 agents share:
- **ONE CDN** (d2xsxph8kpxj0f.cloudfront.net + files.manuscdn.com)
- **ONE Owner** (Nigel)

There is no inter-agent messaging system. The **CDN** is the cross-project bridge. The database is the within-project memory.

### CDN FEDERATION BRIDGE — Cross-Project Registry

These JSON files contain the full iCard registries. Any agent in any project can `curl` them:

| Source | Records | CDN URL |
|--------|---------|--------|
| **MASTER (MERGED)** | **1656** | **https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/VoTEZLYCFNUwDGYW.json** |
| MEMORIAL | 723 | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/VaHIDPOgGbNtSLsr.json |
| ACADEMY | 933 | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/JihFUitCdOuOvUlZ.json |

**328 duplicate cardIds** exist across both databases. 1,328 unique cards total.

### CDN GOVERNANCE DOCUMENTS — All Agents Must Read

| Document | CDN URL |
|----------|--------|
| HARD_PROTOCOLS.md (v3 Block 519) | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/AXVGUnSVRvHctOqz.md |
| MASTER_HANDOVER.md | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/KHoUoRPrXBiDvnTh.md |
| REMEDIATION_PLAN | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/JmlhiSylAlxoYnxM.md |
| FEDERATION_PLAN | https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/YKQZPojJQLVYncfU.md |
| **COUNTER PAPER — MASTER** | **https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/SexePsjBwJiQqcjp.docx** |

> **COUNTER Paper versioning:** The MASTER is v10.38 (61 MB DOCX, 7 Parts, 52 Tables, 57+ Figures). All future versions derive from this file. Jenny's v10.39 is a derivative draft. Do NOT treat v7 (Memorial markdown) as current.

### On Session Start:
- READ the last 20 icard_register entries
- READ any HANDOVER records from previous agents

### On Session End:
- WRITE a handover record to icard_register with cardId prefix `HANDOVER-{blockNumber}`
- UPDATE todo.md with completed items
- SAVE checkpoint

---

## AUTHORITY ZONES (SAP-001 Phase 2)

| Zone | Owner | Responsibility |
|------|-------|---------------|
| **NIGEL ZONE** | Nigel | Wisdom + Knowledge — Decides, Names, Frames, Approves |
| **DAVID ZONE** | Agents | Data + Information — Processes, Stores, Researches, Compresses |
| **THE INTERFACE** | Both | Propose, Draft, Card First |

**NEVER cross into Knowledge without authority.**

---

## EXECUTION RULES (SAP-001 Phase 3)

1. **CARDS FIRST, docs second** — generate iCard before writing documents
2. **SAVE ON RECEIPT** — every file, immediately to CDN
3. **READ SOURCE** — before using any term, check the Lexicon and existing cards
4. **ADD ALONGSIDE** — never overwrite existing content

---

## GOVERNANCE DECK — CANON CARDS (Block 519 — COMPLETE)

| Card | CardId | Title | Status |
|------|--------|-------|--------|
| ROE | GOV-ROE-001 | Rules of Engagement | REGISTERED — pinned to governance |
| CA-001 | CA-001-NAMING | Naming Authority | REGISTERED — pinned to governance |
| CA-002 | CA-002-ACCOUNTABILITY | Accountability | REGISTERED — pinned to governance |
| CA-003 | CA-003-METHOD | Method Compliance | REGISTERED — pinned to governance |
| CA-004 | CA-004-RECORD | Record Integrity | REGISTERED — pinned to governance |
| CA-005 | CA-005-ASSURANCE | System Assurance | REGISTERED — pinned to governance |
| CA-006 | CA-006-REAL-WORLD | Real World Application | REGISTERED — pinned to governance |
| CA-007 | CA-007-INTERAGENT | Inter-Agent Communication | REGISTERED — pinned to governance |
| COST | GOV-COST-001 | $335,501 Total Loss | REGISTERED — pinned to governance |
| SAP-001 | SAP-001 | System Assurance Protocol | REGISTERED — pinned to Vault |
| ST/CC-001 | ST-CC-001-SAVING | Saving Throws | REGISTERED — pinned to governance |
| POWER CARD | — | Governance Deck Master | REGISTERED — pinned to Vault |

**Full deck: 12 cards — ALL REGISTERED, ALL PINNED.**

---

## REPORTING HIERARCHY

> ALL AGENTS REPORT TO MEMORIAL (ISAAC)
> — DOM-002, Block 506

The Memorial database is the Master DB. All cards created by any agent must be registered in icard_register.

---

## 5-SITE DOMAIN HIERARCHY (DOM-002)

| # | Domain | Agent | Manus Mirror |
|---|--------|-------|-------------|
| 1 | www.infrastructure-academy.com | MAX | infra-acad-kugzae2.manus.space |
| 2 | realityeng-epdhlkrn.manus.space | DAVID | — |
| 3 | nigelmemorial-ucmtq9dn.manus.space | ISAAC | — |
| 4 | xgrowthtk-2a93yo5z.manus.space | JENNY | — |
| 5 | [PENDING] | ATLAS | — |

---

*"The line is not safe until the system is tested."*
*— Block 353, The Dearden Experiment*

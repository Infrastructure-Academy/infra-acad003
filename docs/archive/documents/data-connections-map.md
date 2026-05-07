# Infrastructure Academy — Data Connections Map

**Compiled:** 10 March 2026  
**Author:** ALAN (N2)  
**Purpose:** Map all data connections, correlations, and cross-references across the entire Infrastructure Academy ecosystem.

---

## 1. Entity Inventory

| Entity Type | Count | Primary Location | Database Table |
|---|---|---|---|
| HTML Pages | 86 | `client/public/` | — |
| Main Pages | 31 | Root + `/pages/` | — |
| Volume Pages | 47 | `/volumes/v1/v2/v3/` | `relays` |
| Archive Pages | 8 | `/archive/` | — |
| Relays | 12 | Volumes 1–3 (36 pages) | `relays` |
| Equations | 38 | `equations-register.html` | `equations` |
| ICUT Cards | 59 | `icut-gallery.html` | `icut_cards` |
| Vault Entries | ~254 | `vault.html` | `vault_entries` |
| Pioneers | 2 active | `pioneers.html` | `pioneers` |
| Masters | ~30 | `masters.html` | — |
| Institutions | ~20 | `institutions.html` | — |
| Scholars | 7 | `pages/scholars.html` | `scholars` |
| IP Assets | 15 | Formation Package | `ip_assets` |
| 4Cs Evidence | 5 variants | `4cs-decision.html` | `four_cs_evidence` |
| Data Connections | ~200+ | This document | `data_connections` |
| Source Documents | 5 | `vault.html` / `library.html` | `vault_entries` |
| Player Records | Dynamic | Play system | `players`, `relay_progress` |
| Achievements | Dynamic | Play system | `achievements` |
| DAVID Conversations | Dynamic | Play system | `david_conversations` |
| ALS Grades | Dynamic | Play system | `als_grades` |

---

## 2. Page-Level Connection Map

### 2.1 Hub Pages (Most Connected)

These pages serve as primary navigation hubs with the highest outbound link counts:

| Page | Outbound Links | Role |
|---|---|---|
| `site.html` | 19 | **Central Hub** — Landing page, gateway to all sections |
| `vault.html` | 20+ | **Evidence Repository** — Links to all evidence, documents, screenshots |
| `finance-admin.html` | 15+ | **Financial Hub** — Cost audit, formation timeline, pitch decks |
| `library.html` | 15+ | **Document Hub** — All downloadable documents |
| `pages/framework.html` | 15+ | **Conceptual Hub** — ICUT framework, 4Cs, signal equation |

### 2.2 New Pages Added (10 March 2026)

| Page | Outbound | Inbound | Cross-References |
|---|---|---|---|
| `4cs-decision.html` | 6 | 3 (vault, cashflow, nav) | framework, glossary, equations, vault, icut-gallery, scholars |
| `cashflow-y1.html` | 6 | 2 (vault, nav) | finance-admin, 4cs-decision, equations, vault, olympiad, mobilisation-clock |

---

## 3. Conceptual Connection Map

### 3.1 The Signal Equation Web

The Signal Equation `S = (A × P) / β` connects to:

```
Signal Equation (S = AP/β)
├── A (Amplitude = REACH)
│   ├── 12 Relays (each relay extends reach)
│   ├── Infrastructure Olympiad (global reach)
│   ├── 8 Language Blocks (linguistic reach)
│   └── Institutions (institutional reach)
├── P (Persistence = DURATION)
│   ├── 12 Relays (each relay extends duration)
│   ├── Civilisation Clock (temporal measurement)
│   ├── Masters (historical persistence)
│   └── Pioneers (contemporary persistence)
└── β (Resistance = THE 4Cs)
    ├── Conflict → Relay 4 (Horse), Relay 5 (Roads), Relay 9 (Engine)
    ├── Climate → Relay 3 (River), Relay 11 (Orbit)
    ├── Contagion → Relay 7 (Loom), Relay 10 (AAA)
    └── Cost → Relay 8 (Rail), Cash Flow Y1, Finance Admin
```

### 3.2 The 4Cs Evolution Chain

```
4Cs Evolution (5 variants across 5 documents)
├── V1: Conflagration, Consumption, Conflict, Climate (Original)
│   └── Source: Game data / original framework
├── V1b: Conflagration, Crisis, Consumption, Climate (Glossary)
│   └── Source: glossary.html
├── V1c: Conflagration, Contagion, Consumption, Climate (Framework)
│   └── Source: framework.html
├── V2: Conflict, Contagion, Climate, Corruption (Market Matrix)
│   └── Source: Global Market Matrix p.21
└── V3: Conflict, Climate, Contagion, Cost (FINAL)
    └── Source: D100_PRINCIPIA_EXTRACTION p.9
    └── Decision: 4cs-decision.html (Cost wins 6-1-1)
```

### 3.3 The ICUT Framework Web

```
ICUT Framework
├── I (Identify)
│   ├── ICUT Cards (59 cards)
│   ├── Taxonomy (7 tiers)
│   └── Glossary (definitions)
├── C (Classify)
│   ├── Taxonomy (classification system)
│   ├── Framework (conceptual classification)
│   └── Scholars (knowledge classification)
├── U (Utilise)
│   ├── Play System (game modes)
│   ├── DAVID AI (narrator)
│   └── ALS Grading (assessment)
└── T (Transfer)
    ├── Volumes 1-3 (knowledge transfer)
    ├── Executive Précis (compressed transfer)
    └── Infrastructure Olympiad (competitive transfer)
```

### 3.4 The Revenue/Business Web

```
Business Architecture
├── Revenue Model (6 channels)
│   ├── Freemium Subscriptions → Play System
│   ├── University Licensing → Institutions, Olympiad
│   ├── Olympiad Sponsorship → infrastructure-olympiad.html
│   ├── Enterprise Training → Institutions
│   ├── Data Intelligence → Player data, ALS grades
│   └── Content Partnerships → Library, Volumes
├── Financial Documents
│   ├── Cash Flow Y1 → cashflow-y1.html
│   ├── Cost Audit → finance-admin.html
│   ├── Brief v6 → vault.html (source document)
│   ├── Formation Package → vault.html (source document)
│   └── Investor Pitches → vault.html (source documents)
├── IP Assets (15)
│   ├── TRE-GLP → Framework
│   ├── ICUT → Framework, Gallery
│   ├── DAVID AI → Play System
│   ├── Signal Equation → Equations Register
│   └── 4Cs → 4cs-decision.html
└── Formation Team
    ├── Nigel Dearden (30%) → about-author.html
    ├── Michael Wu (20%) → Formation Package
    ├── Henry Leong (20%) → Formation Package, VietBridge
    └── Frank Sheu (TBD from 30%) → Formation Package
```

---

## 4. Database Table Relationships

### 4.1 Player System (Game Loop)

```
users (1) ──→ players (1) ──→ relay_progress (many)
                │                    │
                │                    └──→ relays (reference)
                │
                ├──→ achievements (many)
                ├──→ david_conversations (many)
                ├──→ als_grades (many)
                ├──→ player_discoveries (many)
                └──→ party_members (many) ──→ player_parties (1)
```

### 4.2 Content System (Knowledge Base)

```
relays (12) ──→ dual_vocabulary (many)
    │           thread_weaves (many)
    │
    ├──→ equations (many, via relayId)
    ├──→ icut_cards (many, via relayId)
    └──→ glossary_entries (many, via relayId)

scholars (7) ──→ relays (many-to-many via scholarRelays)

ip_assets (15) ──→ equations (via equationId)
```

### 4.3 Evidence System (Audit Trail)

```
vault_entries (~254) ──→ four_cs_evidence (subset)
    │
    ├── type: image (screenshots, cards, BITPOINTs)
    ├── type: document (source documents, thesis notes)
    └── type: page (generated pages)

data_connections (many-to-many)
    ├── sourceType + sourceId ──→ any entity
    └── targetType + targetId ──→ any entity
```

---

## 5. Cross-Document Correlation Matrix

| Data Point | Brief v6 | Investor v1 | Investor v2 | Formation | Market Matrix |
|---|---|---|---|---|---|
| Relays | 12 | 12 | 12 | 12 | 12 |
| Beta Testers | 20+ | 20+ | 20+ | 20+ | — |
| XP Generated | 319M+ | 319M+ | 319M+ | 319M+ | — |
| Revenue Y3 | $1.6M | $1.6M | $1.6M | $100M+ | — |
| Seed Round | $500K | $500K | $500K | — | — |
| Team Equity | 30/20/20/30 | 30/20/20/30 | 30/20/20/30 | 30/20/20/30 | — |
| 4Cs Variant | — | — | — | — | Corruption |
| Phase 1 Cost | — | — | — | $397,550 | — |
| IP Assets | — | — | — | 15 | — |
| Language Blocks | — | — | — | — | 8 |
| TAM Population | — | — | — | — | 4.5B |
| Gaming Coverage | — | — | — | — | 2.56B |

### Revenue Discrepancy Resolution

| Scenario | Year 1 | Year 3 | Source | Driver |
|---|---|---|---|---|
| Conservative | $250K | $1.6M | Brief v6 | English-first, organic growth |
| Aggressive | $15-50M | $100M+ | Formation Package | China Strategy + VietBridge |

---

## 6. Navigation Architecture

### 6.1 Primary Navigation Groups (nav-optimise.js)

```
HOME ──→ site.html (direct)

READ
├── Start Here
├── EP.1: Perspective (Volume 1)
├── EP.2: Guide (Volume 2)
├── Exec Précis
└── Behind the Thesis

EXPLORE
├── Framework
├── Taxonomy
├── Civilisation Clock
├── Mobilisation Clock
└── Olympiad

PEOPLE
├── Pioneers
├── Masters
├── Institutions
├── Founders Wall
└── Author

RESOURCES
├── Documents (Library)
├── Resources
├── Glossary
├── Vault
├── ICUT Gallery
├── Equations
├── 4Cs Decision ← NEW
├── Cash Flow Y1 ← NEW
└── Charter

PLAY ──→ /play (direct)
```

### 6.2 Hidden/Admin Pages (Not in Nav)

| Page | Purpose | Access |
|---|---|---|
| `dcsn-dashboard.html` | DCSN System Health | Direct URL |
| `h-block-dashboard.html` | Agent Dashboard | Direct URL |
| `finance-admin.html` | Financial Admin | Direct URL |
| `icard-gallery.html` | Legacy iCard Gallery | Superseded by icut-gallery |
| `pages/discovery-chain.html` | Discovery Chain | Direct URL |
| `pages/executive-precis-enhanced.html` | Enhanced Précis | Alternate version |

---

## 7. Data Integrity Checks

### 7.1 Orphan Pages (No Inbound Links from Nav)

- `dcsn-dashboard.html` — Intentional (admin-only)
- `h-block-dashboard.html` — Intentional (admin-only)
- `finance-admin.html` — Intentional (admin-only)
- `icard-gallery.html` — Superseded by `icut-gallery.html`
- `pages/discovery-chain.html` — Linked from vault only

### 7.2 Consistency Validations

| Check | Status | Notes |
|---|---|---|
| All nav links resolve | ✓ | Verified across 31 main pages |
| 4Cs Decision cross-refs | ✓ | 6 outbound, 3 inbound |
| Cash Flow Y1 cross-refs | ✓ | 6 outbound, 2 inbound |
| Vault entry count | ✓ | ~254 entries (252 + 2 new pages) |
| Equations register count | ✓ | 38 equations across 7 tiers |
| ICUT gallery count | ✓ | 59 cards across 8 categories |
| Source documents | ✓ | 5 documents extracted and digested |
| Revenue data consistency | ⚠ | Two scenarios documented (conservative vs aggressive) |
| 4Cs variant consistency | ✓ | Resolved: Cost is final (4cs-decision.html) |

---

## 8. Database Algorithm Summary

### 8.1 New Tables Added (10 March 2026)

| Table | Purpose | Key Fields |
|---|---|---|
| `icut_cards` | 59 ICUT framework cards | relayId, category, tier, title, equation |
| `equations` | 38 master equations | relayId, tier, formula, variables |
| `ip_assets` | 15 IP assets | name, protectionType, equationId |
| `vault_entries` | ~254 evidence items | title, type, cdnUrl, sourceDocument |
| `four_cs_evidence` | 5 evolution variants | variant, fourthC, sourceDocument |
| `data_connections` | Cross-entity links | sourceType/Id, targetType/Id, connectionType, strength |

### 8.2 Connection Types in data_connections

| Type | Meaning | Example |
|---|---|---|
| `references` | A mentions or cites B | 4Cs Decision → Framework |
| `derives_from` | A is derived from B | Cost (4th C) → D100 Extraction |
| `validates` | A provides evidence for B | IMG_0188 → 4Cs Evolution |
| `extends` | A builds upon B | Cash Flow Y1 → Formation Package |
| `contradicts` | A conflicts with B | Corruption variant → Cost variant |
| `supports` | A reinforces B | Brief v6 revenue → Conservative scenario |

### 8.3 Strength Levels

| Level | Meaning | Criteria |
|---|---|---|
| `strong` | Direct, explicit connection | Same data point, same source |
| `moderate` | Indirect but clear connection | Related concepts, cross-referenced |
| `weak` | Implied or contextual connection | Thematic relationship only |

---

*This map is a living document. As new pages, entities, and connections are added, this map should be updated to maintain the connective tissue of the Infrastructure Academy ecosystem.*

*Compiled by ALAN (N2) — 10 March 2026*

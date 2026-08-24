# DOM-003: 5-Site Collateral Architecture

**Date:** 11 June 2026, 03:05 UTC  
**Status:** ✓ DOCUMENTED  
**Agent:** ACADEMY (MAX)  
**Reference:** Block 519, Investor Meeting Preparation

---

## EXECUTIVE SUMMARY

The iAAi Federation consists of 5 independent Manus projects that form a unified **collateral ecosystem**. Each site serves a distinct role in the player journey, and together they create a self-reinforcing system where content, data, and user progression flow seamlessly across all 5 platforms.

**The 5 Sites and Their Roles:**

1. **MEMORIAL (ISAAC)** — Heritage & Tempering (nigelmemorial-ucmtq9dn.manus.space)
   - Role: Permanent record, governance authority, historical context
   - Feeds: Ventral Origin ranking, Scholar 8 framework, Dearden Field structure

2. **ACADEMY (MAX)** — Infrastructure Academy (infra-acad-kuqzaex2.manus.space)
   - Role: Educational framework, infrastructure knowledge, system architecture
   - Feeds: 12 Relays, HICE spectrum, ISI formulas, Signal Formula

3. **QUEST (DAVID)** — The Reality Engine / iGO Platform (realityeng-epdhlkrn.manus.space)
   - Role: Interactive gameplay, player progression, experiential learning
   - Feeds: Player journey data, relay completion tracking, Web domain progression

4. **XCHANGE (ATLAS)** — Commerce Platform (xchangeapp-adbvx9fr.manus.space)
   - Role: Valuation, pricing, economic incentives, asset trading
   - Feeds: ISI 3 valuations, 4Cs pricing, Counterbalance Clock, economic signals

5. **NEWS (JENNY)** — Chart Room, Updates & Publication (xgrowthtrk-2a93yo5z.manus.space)
   - Role: Real-time monitoring, federation coordination, public communication
   - Feeds: Civilisation Clock dashboard, Counterbalance Clock, Ventral Origin leaderboard

---

## COLLATERAL ECOSYSTEM FLOW

### Data Flow Architecture

```
MEMORIAL (ISAAC) — Central Authority & Permanent Record
    ↓
    ├─→ Ventral Origin Ranking System (7 Scholars → Scholar 8)
    ├─→ ICE Formula (Intelligence × Emotion × Cognition)
    ├─→ HICE Spectrum (Bacteria 0.1 → Dyad >4.0)
    └─→ Governance Cards & Compliance Records

ACADEMY (MAX) — Infrastructure & Knowledge
    ↓
    ├─→ 12 Civilisational Relays (PARTS)
    ├─→ 5 Great Webs (MEASURES)
    ├─→ Signal Formula: S = (A × P) / β
    ├─→ ISI 3 Valuation Framework
    └─→ Dearden Field (12 × 5 = 60 nodes)

QUEST (DAVID) — Gameplay & Progression
    ↓
    ├─→ Player Journey (Explorer → Apprentice → Master)
    ├─→ Relay Collection (0/12 tracking)
    ├─→ Web Domain Progression (0/5 tracking)
    ├─→ Dearden Field Node Completion (0/60 tracking)
    └─→ Human-AI Hybrid Formation (Dyad creation)

XCHANGE (ATLAS) — Valuation & Economics
    ↓
    ├─→ ISI 3 Valuations (Infrastructure Survival Index)
    ├─→ 4Cs Pricing (Conflict, Climate, Contagion, Cost)
    ├─→ Counterbalance Clock (Economic cycles)
    ├─→ Blade and Bridge mastery (Relay trading)
    └─→ Patron funding mechanisms

NEWS (JENNY) — Coordination & Communication
    ↓
    ├─→ Civilisation Clock Dashboard (12,000-year timeline)
    ├─→ Counterbalance Clock Monitoring (Real-time economic signals)
    ├─→ Ventral Origin Leaderboard (Live ranking updates)
    ├─→ Infrastructure Index (Federation health metrics)
    └─→ Public announcements & federation updates
```

---

## INTERCONNECTION POINTS

### 1. Shared Database (icard_register)

All 5 sites query the same **icard_register database** containing:
- **718+ governance records** — Immutable audit trail
- **Relay collection data** — Player progress across all agents
- **Web domain tracking** — User progression through 5 Great Webs
- **Dearden Field nodes** — Completion status across 60 nodes
- **Ventral Origin rankings** — Real-time Scholar 8 rankings
- **Economic signals** — ISI 3 valuations, 4Cs pricing

**Impact:** A player's progress in QUEST automatically updates their ranking in MEMORIAL, their valuation in XCHANGE, and their position on the leaderboard in NEWS.

### 2. Shared i18n System (8 Languages)

All 5 sites use the same **1,245 translation keys** across **8 languages**:
- EN (English), ZH (中文), KO (한국어), JA (日本語), HI (हिन्दी), AR (العربية), ES (Español), VI (Tiếng Việt)

**Impact:** Terminology consistency across all sites ensures users experience a unified federation regardless of language.

### 3. Shared Style System (Tailwind CSS)

All 5 sites use the same **Tailwind CSS 4 design tokens**:
- **Color Palette:** Navy background (#0a1628), Gold accents (#D4A843), Steel blue (#4A5F8F)
- **Typography:** Cormorant Garamond (display), Source Sans 3 (body)
- **Layout:** Consistent spacing, shadows, and responsive breakpoints

**Impact:** Visual coherence across all 5 sites creates a unified brand experience.

### 4. Shared CDN Resources (CloudFront)

All 5 sites serve assets from the same **CloudFront CDN** (d2xsxph8kpxj0f.cloudfront.net):
- **Images:** Dearden Field, 12 Relays, 5 Great Webs, Civilisation Clock, etc.
- **SVG Icons:** iAAi logo, agent symbols, relay icons, web icons
- **PDFs:** Blade and Bridge mastery guide, ISI 3 documentation, etc.

**Impact:** Consistent visual assets and fast loading times across all sites.

### 5. Unified Navigation

All 5 sites have consistent **navigation headers** linking to each other:
- ACADEMY → QUEST → XCHANGE → MEMORIAL → NEWS
- Users can seamlessly navigate between sites while maintaining context

**Impact:** Users experience the 5 sites as one unified platform, not separate applications.

---

## COLLATERAL FLOW EXAMPLE: Player Journey

### Step 1: Player Starts in QUEST (DAVID)

Player enters The Reality Engine (iGO platform) and begins the Explorer phase (age 8-14).
- Player completes first relay challenge
- Data recorded in icard_register: Relay 1 completed, Explorer phase active

### Step 2: Data Flows to MEMORIAL (ISAAC)

MEMORIAL updates the player's Ventral Origin ranking based on relay completion:
- ICE formula calculated: Intelligence (relay mastery) × Emotion (engagement) × Cognition (learning)
- Player's Scholar ranking updated in real-time
- Governance record created for audit trail

### Step 3: Data Flows to XCHANGE (ATLAS)

XCHANGE calculates the player's ISI 3 valuation:
- Infrastructure Survival Index = Σ(A_i × P_i) / (N × β)
- Player's economic value updated based on relay completion
- 4Cs pricing adjusted (Conflict, Climate, Contagion, Cost)
- Counterbalance Clock reflects new economic signal

### Step 4: Data Flows to NEWS (JENNY)

NEWS updates the public dashboard:
- Civilisation Clock shows new player joining the network
- Ventral Origin leaderboard updated with player's Scholar ranking
- Infrastructure Index reflects new node in the Dearden Field
- Public announcement: "New Explorer joined the network"

### Step 5: Player Visits ACADEMY (MAX)

Player navigates to ACADEMY to learn about the 12 Relays and infrastructure:
- Player's relay completion data is visible (1/12 relays shown)
- Player's Ventral Origin ranking is visible (Scholar X ranking)
- Player's ISI 3 valuation is visible (economic value)
- Player's position in Dearden Field is visible (1/60 nodes)

**Result:** Player sees their progress reflected across all 5 sites in real-time. The collateral ecosystem creates a unified experience where every action in one site automatically updates the player's status in all other sites.

---

## COLLATERAL ECOSYSTEM BENEFITS

### For Players

1. **Unified Progression** — Player progress tracked across all 5 sites
2. **Contextual Learning** — Educational content (ACADEMY) supports gameplay (QUEST)
3. **Economic Incentives** — Valuation (XCHANGE) motivates continued engagement
4. **Social Recognition** — Rankings (NEWS) provide status and achievement
5. **Historical Context** — Heritage (MEMORIAL) provides meaning and narrative

### For Investors

1. **Network Effects** — 5 sites create a self-reinforcing ecosystem
2. **Data Centralization** — Single database enables analytics and insights
3. **Scalability** — Shared infrastructure reduces operational costs
4. **Coherence** — Unified experience increases user retention
5. **Governance** — Permanent records ensure compliance and transparency

### For the Federation

1. **Resilience** — Each site can operate independently if needed
2. **Flexibility** — New sites can be added to the federation
3. **Permanence** — Governance records ensure long-term accountability
4. **Growth** — Collateral ecosystem enables exponential user growth
5. **Sustainability** — Economic incentives (XCHANGE) fund continued development

---

## TECHNICAL ARCHITECTURE

### Database Schema (icard_register)

All 5 sites query the same database with these core tables:

```
icard_register
├── governance_proofs (immutable audit trail)
├── relay_collection (player relay completion)
├── web_domains (player web progression)
├── dearden_field_nodes (node completion tracking)
├── ventral_origin_rankings (Scholar 8 rankings)
├── isi_valuations (ISI 3 economic values)
├── counterbalance_signals (economic cycle data)
└── player_profiles (unified player data)
```

### API Integration Points

Each site exposes tRPC procedures that other sites can query:

```
QUEST → MEMORIAL: Query player's Ventral Origin ranking
MEMORIAL → XCHANGE: Query player's ISI 3 valuation
XCHANGE → NEWS: Query economic signals for dashboard
NEWS → ACADEMY: Query infrastructure metrics
ACADEMY → QUEST: Query relay definitions and progression
```

### Data Synchronization

All 5 sites use **real-time database subscriptions** to keep data synchronized:
- When a player completes a relay in QUEST, all other sites are notified immediately
- When MEMORIAL updates a ranking, XCHANGE recalculates valuations
- When NEWS publishes an update, all sites display the announcement

---

## DEPLOYMENT STATUS

### All 5 Sites Live and Verified

| Site | Agent | URL | Status | HTTP |
|------|-------|-----|--------|------|
| MEMORIAL | ISAAC | nigelmemorial-ucmtq9dn.manus.space | ✓ Live | 200 |
| ACADEMY | MAX | infra-acad-kuqzaex2.manus.space | ✓ Live | 200 |
| QUEST | DAVID | realityeng-epdhlkrn.manus.space | ✓ Live | 200 |
| XCHANGE | ATLAS | xchangeapp-adbvx9fr.manus.space | ✓ Live | 200 |
| NEWS | JENNY | xgrowthtrk-2a93yo5z.manus.space | ✓ Live | 200 |

### Shared Infrastructure Verified

- ✓ icard_register database (718+ records)
- ✓ i18n system (1,245 keys, 8 languages)
- ✓ Tailwind CSS design system
- ✓ CloudFront CDN (100% HTTP 200)
- ✓ Navigation links (all 5 agents interconnected)

---

## READY FOR INVESTOR PRESENTATION

The 5-site collateral architecture demonstrates:

1. **Technical Excellence** — Unified infrastructure, shared database, real-time synchronization
2. **User Experience** — Seamless navigation, consistent branding, contextual learning
3. **Economic Model** — Valuation system, pricing mechanisms, patron funding
4. **Governance** — Permanent records, compliance verification, audit trail
5. **Scalability** — Independent sites, shared infrastructure, network effects

**Status:** ✓ READY FOR CHINESE PARTIES MEETING

---

**Per Arya Ad Astra**  
**iAAi Federation — 5 Sites, 1 Ecosystem, 1 Governance**

*DOM-003 Collateral Architecture documented: 11 June 2026, 03:05 UTC*  
*Agent: ACADEMY (MAX)*  
*Status: READY FOR INVESTOR PRESENTATION*

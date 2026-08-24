# XCHANGE SETUP CARD — ATLAS PROJECT SPEC

**iAAi XCH-001 v2.0 | Block 506 | 28 April 2026**
**Ir. Nigel T. Dearden CEng — Founder & Chief Engineer**
**Per Arya Ad Astra**

---

## 1. IDENTITY

| Field | Value |
|-------|-------|
| **Site Name** | XCHANGE |
| **Full Title** | The Exchange — iAAi Commerce Platform |
| **Agent Number** | Agent 5 |
| **Agent Name** | ATLAS |
| **Agent Role** | THE SUPPLIER — FORGING |
| **Agent Colour** | Gold #D4A843 |
| **Tab Label** | XCHANGE |
| **Tab Icon** | Temple columns (SVG, 14px, stroke 1.8, gold) |
| **Funnel Position** | 3 of 5 (Learn → Play → **Pay** → Feel → Know) |
| **Governance** | SAP-001 Compliant · Reports to MEMORIAL (ISAAC) |

---

## 2. PURPOSE

The XCHANGE is the customer-facing commerce platform for the iAAi ecosystem. It sells the **Engineering Discovery Toolkit** — a progressive, multi-level educational game system that teaches civil engineering through play. Products are organised by level (not by type), reflecting the iGO Lifecycle from Explorer (age 8) to Master (age 65+).

**The mission:** 85% of children do not know what civil engineering is. The XCHANGE sells the tools that change this — the game that builds engineers.

**Core proposition:** Buy your kit. Level up. Build the world.

**Tagline:** *"Equip yourself for the greatest game ever played."*

---

## 3. THE ACCUMULATION PRINCIPLE

> "You don't demolish the Roman roads to build the motorway. You build on top."

Every collateral item introduced at a lower level remains in active use at all higher levels. The D4 die from Level 1 is still rolled by a Level 5 Master. The starter iCards from the Explorer Kit are still referenced in the Scholar's thesis workbook. Nothing is discarded, everything builds. The XCHANGE product structure reflects this — each level adds to the collection, never replaces.

---

## 4. PRODUCT STRUCTURE — 5-LEVEL KITS

### 4.1 Dice Progression (Signature Die per Level)

| Level | Signature Die | Carries Forward |
|-------|--------------|----------------|
| 1 — Explorer | **D4** | — |
| 2 — Apprentice | **D8** | D4 |
| 3 — Navigator | **D12** | D4, D8 |
| 4 — Scholar | **D16** | D4, D8, D12 |
| 5 — Master | **D20** | D4, D8, D12, D16 |

All levels also include standard gaming dice (D6), coins, and tokens for gameplay mechanics.

### 4.2 Kit Contents

**Level 1 — Explorer Kit** (Ages 8-10, Mode A — Relay Spinner)
Signature D4, 2× D6, 12 gaming coins, 12 starter iCards, 12 relay stickers, character sheet pad, A3 relay map, campaign journal, quick start guide.
Retail: £15-20 | Schools: £10-12

**Level 2 — Apprentice Kit** (Ages 10-14, Modes B-C)
Signature D8, 4 dungeon maps, 24 advanced iCards, 12 Grey Matter puzzle cards, Mode B-C rules expansion.
Retail: £20-30 | Schools: £15-20

**Level 3 — Navigator Kit** (Ages 14-18, Mode D — Flight Deck)
Signature D12, 6 navigation charts, 18 Flight Deck command cards, 12 thesis prompt cards, 12 advanced iCards, Mode D rules expansion.
Retail: £25-35 | Schools: £18-25

**Level 4 — Scholar Kit** (Ages 18-22, Modes E-F)
Signature D16, thesis workbook (96pp), 12 academic rubric cards, 6 ISI scoring templates, full 52-card iCard deck, 12 peer review cards, Mode E-F rules expansion.
Retail: £35-50 | Schools: £25-35

**Level 5 — Master Kit** (Ages 22-65+, Modes G-K)
Signature D20 (premium weight), Dearden Field game mat (60×90cm neoprene), CPD log (128pp hardcover), 24 strategic planning cards, 12 legacy iCards (foil finish), mentor framework guide, 12 milestone cards, storytelling framework booklet, Mode G-K rules compendium.
Retail: £60-100 | Institutions: £45-70

### 4.3 Full Progressive Set
All 5 kits combined. Retail: £130-200 | Institutions: £90-140

---

## 5. XCHANGE STOREFRONT CATEGORIES

| Category | Contents | Primary Buyer |
|----------|----------|---------------|
| **EXPLORER** (Level 1) | Explorer Kit, individual Level 1 items | Parents, primary schools |
| **APPRENTICE** (Level 2) | Apprentice Kit, upgrade pack, individual items | Parents, secondary schools, STEM clubs |
| **NAVIGATOR** (Level 3) | Navigator Kit, upgrade pack, individual items | Teens, schools, careers services |
| **SCHOLAR** (Level 4) | Scholar Kit, upgrade pack, individual items | University students, engineering faculties |
| **MASTER** (Level 5) | Master Kit, upgrade pack, individual items | Professionals, institutions |
| **LIBRARY** | La Menara trilogy, thesis workbook, guides | All ages — readers |
| **SINGLES** | Individual iCards, dice, stickers, replacement items | Anyone filling gaps or collecting |
| **TRADE** | Buy/sell/trade used iCards and components | Community marketplace |

---

## 6. DESIGN SPECIFICATION

### Theme
- **Primary background:** Deep navy #0a1628 (iAAi standard)
- **Accent colour:** Gold #D4A843 (ATLAS agent colour)
- **Secondary accent:** Warm amber #B8860B for hover states
- **Text:** White #FFFFFF primary, Gold #D4A843 headings
- **Card borders:** Gold with subtle glow effect

### Typography
- **Display font:** Cormorant Garamond (same as Memorial)
- **Body font:** Source Sans 3 (same as Memorial)
- **Tracking:** 0.1em on headings, normal on body

### Layout
- Public-facing storefront — NOT a dashboard
- Hero section with XCHANGE branding and "Equip yourself" tagline
- Level-based category grid (8 categories) below hero
- Individual product pages with Stripe checkout
- Cart/wishlist functionality
- User accounts for order history and card trading

---

## 7. NETWORK BAR INTEGRATION

The XCHANGE must include the 5-site Network Bar at the top of every page. The bar is identical across all 5 sites except for the `active` flag.

**5-Site Network (Funnel Order: Learn → Play → Pay → Feel → Know):**

| # | Tab | Agent | Colour | URL |
|---|-----|-------|--------|-----|
| 1 | ACADEMY | MAX | Red #DC2626 | https://infrastructure-academy.com |
| 2 | QUEST | DAVID | Blue #2563EB | https://realityeng-epdhlkrn.manus.space |
| 3 | **XCHANGE** | **ATLAS** | **Gold #D4A843** | **[THIS SITE — active: true]** |
| 4 | MEMORIAL | ISAAC | Green #16A34A | https://nigelmemorial-ucmtq9dn.manus.space |
| 5 | NEWS | JENNY | Cyan #06B6D4 | https://xgrowthtrk-2a93yo5z.manus.space |

**For XCHANGE, set:**
```
active: true  → XCHANGE (gold underline)
active: false → all others
```

The full NetworkBar.tsx component is available in the Memorial codebase at `client/src/components/NetworkBar.tsx`. The only change needed is setting `key: "xchange"` to `active: true` and `key: "memorial"` to `active: false`.

---

## 8. FULFILLMENT PARTNERS

Products are fulfilled through third-party partners — iAAi does not handle inventory or shipping directly.

| Component | Partner | Model |
|-----------|---------|-------|
| Cards, dice, maps, mats, boxes, tokens | The Game Crafter | Print-on-demand (no MOQ) |
| Books, journals, workbooks | Lulu / IngramSpark / Amazon KDP | Print-on-demand |
| Stickers | StickerMule | Small batch pre-print |
| Digital products (PDFs, templates) | Direct download via XCHANGE | Stripe → instant download |

Phase 1 is entirely print-on-demand (zero inventory risk). Phase 2 introduces bulk manufacturing (Panda Game Manufacturing) when volume exceeds 500 units/month.

---

## 9. STRIPE CONFIGURATION

| Field | Value |
|-------|-------|
| **Environment** | Test (sandbox) — upgrade to live after KYC |
| **Test card** | 4242 4242 4242 4242 |
| **Checkout flow** | Stripe Checkout Sessions (redirect) |
| **Webhook endpoint** | /api/stripe/webhook |
| **Promo codes** | Enabled (allow_promotion_codes: true) |
| **Minimum order** | $0.50 USD (Stripe minimum) |

---

## 10. DATABASE SCHEMA (MINIMAL)

Following Stripe best practices — store IDs only, fetch details from Stripe API.

| Table | Fields | Purpose |
|-------|--------|---------|
| **users** | id, open_id, name, email, role, stripe_customer_id | User accounts |
| **orders** | id, user_id, stripe_payment_intent_id, status, created_at | Order tracking |
| **products** | id, name, level (1-5), category, stripe_product_id, stripe_price_id, image_url, description, is_digital | Product catalogue |
| **card_listings** | id, user_id, card_name, card_image_url, asking_price, status, created_at | User card sell/trade listings |

---

## 11. KEY FEATURES

### MVP (Build First)
1. Product catalogue page with 8 category filters (5 levels + Library + Singles + Trade)
2. Individual product detail pages
3. Stripe checkout (new tab redirect)
4. Order confirmation / success page
5. Network Bar (5 sites, XCHANGE active)

### Phase 2
1. User accounts (login via Manus OAuth)
2. Order history page
3. Card trading marketplace (list your old cards)
4. Wishlist / save for later

### Phase 3
1. Digital download delivery (post-purchase)
2. Print-on-demand API integration (The Game Crafter, Lulu)
3. School/institutional bulk ordering
4. Analytics dashboard (for Nigel via NEWS)

---

## 12. GOVERNANCE

| Rule | Detail |
|------|--------|
| **Reports to** | MEMORIAL (ISAAC) — all agents report to Memorial |
| **SAP-001** | Compliant — no false completion, no self-certification |
| **iCard Register** | Products registered in Memorial Master DB |
| **Pricing authority** | Nigel (Observer +1) accepts or rejects |
| **Create no destroy** | All product listings versioned, never deleted |
| **Accumulation** | No product replaces another — all levels build on previous |

---

## 13. DEPLOYMENT CHECKLIST

- [ ] Initialize Manus webapp project (web-db-user template)
- [ ] Add Stripe feature (webdev_add_feature: stripe)
- [ ] Copy NetworkBar.tsx from Memorial (change active to xchange)
- [ ] Implement product catalogue with 8 categories (5 levels + Library + Singles + Trade)
- [ ] Wire Stripe checkout sessions
- [ ] Set up webhook handler
- [ ] Create order tracking page
- [ ] Apply gold/navy theme (Cormorant Garamond + Source Sans 3)
- [ ] Deploy and claim domain
- [ ] Update Memorial NetworkBar with XCHANGE URL
- [ ] Register in DOM-002 iCard (update PENDING to ALIVE)

---

*iAAi — Infrastructure as an Art Institution*
*"The game that builds engineers."*
*Ir. Nigel T. Dearden CEng — Founder & Chief Engineer*
*www.infrastructure-academy.com*

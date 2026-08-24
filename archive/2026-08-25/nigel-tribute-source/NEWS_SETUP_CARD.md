# iAAi NEWS — Setup Card

> **Document:** NEWS-001 v1.0 | **Block:** 506 | **Date:** 28 April 2026
> **Author:** ISAAC (Memorial Lead Agent) | **For:** New Manus session building the NEWS site
> **Classification:** Subproject Handoff Spec — word doc card format

---

## 1. IDENTITY

| Field | Value |
|-------|-------|
| **Site Name** | NEWS |
| **Full Title** | iAAi NEWS — The Signal |
| **Agent Number** | Observer (+1) |
| **Agent Name** | JENNY |
| **Agent Role** | THE CLIENT — OBSERVER |
| **Agent Colour** | Cyan #06B6D4 |
| **Function** | News, updates, announcements, block logs, milestone tracking |
| **Existing Domain** | xgrowthtrk-2a93yo5z.manus.space |
| **Governance** | Reports to MEMORIAL (ISAAC). All content approved by Nigel (Observer Player +1). |

---

## 2. PURPOSE

NEWS is the broadcast channel of the iAAi network. It serves three audiences:

**For the public:** A news feed showing what's happening across all 5 sites — new products on XCHANGE, new relays unlocked on QUEST, new iCards published on MEMORIAL, new courses on ACADEMY. This is the "what's new" page that keeps visitors engaged and returning.

**For players:** Progress updates, block milestones, leaderboard changes, community highlights, and event announcements. Players check NEWS to see what's been unlocked, what's coming next, and who's leading.

**For Nigel (Observer +1):** The observation deck. Jenny's role is to accept or reject — NEWS is where the governance decisions are published. SAP-001 compliance reports, agent status updates, and system health all surface here.

---

## 3. NETWORK BAR INTEGRATION

NEWS is the 5th tab in the unified Network Bar that appears on ALL 5 sites.

```
ACADEMY (red) → QUEST (blue) → XCHANGE (gold) → MEMORIAL (green) → NEWS (cyan, ACTIVE)
```

The NetworkBar component code is identical across all sites. Only the `active` prop changes per site. For NEWS, set `active="NEWS"`.

The NetworkBar component source is available in the Memorial project at:
`client/src/components/NetworkBar.tsx`

Copy this component verbatim into the NEWS project. The component contains all 5 site definitions, icons, colours, and URLs.

---

## 4. CONTENT CATEGORIES

NEWS publishes content in these categories, displayed as filterable tags:

| Category | Icon | Description |
|----------|------|-------------|
| **NETWORK** | Globe | Cross-site updates (new sites, domain changes, system status) |
| **QUEST** | Sword | Game updates (new relays, modes, MXP milestones) |
| **XCHANGE** | Columns | Product launches, restocks, promotions |
| **ACADEMY** | Mortarboard | New courses, curriculum updates, partnerships |
| **MEMORIAL** | Star | New iCards, thesis updates, heritage additions |
| **GOVERNANCE** | Shield | SAP-001 reports, agent status, compliance |
| **BLOCK LOG** | Hash | Block number milestones and session records |
| **COMMUNITY** | People | Player highlights, events, meetups |

---

## 5. DESIGN SPEC

### Colour Palette
The NEWS site uses the iAAi brand palette with cyan as the primary accent:

| Role | Colour | Hex |
|------|--------|-----|
| Background | Deep Navy | #0a1628 |
| Primary Accent | Cyan (Jenny) | #06B6D4 |
| Secondary Accent | Gold (iAAi brand) | #D4A843 |
| Text Primary | Warm White | #E8E0D0 |
| Text Secondary | Muted Slate | #8B9BB4 |
| Borders | Dark Slate | #1E293B |

### Typography
Same as all iAAi sites for network consistency:

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display / Headlines | Cormorant Garamond | 300 (Light) | 2.5-4rem |
| Body / UI | Source Sans 3 | 400 (Regular) | 0.875-1rem |
| Monospace / Data | JetBrains Mono | 400 | 0.8rem |

Google Fonts link (add to `client/index.html`):
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Source+Sans+3:wght@300;400;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

### Visual Style
The same dark, structural, engineering-heritage aesthetic as all iAAi sites. Navy backgrounds, gold accents for headings, cyan for interactive elements and links. No rounded cards, no playful colours. This is a professional broadcast channel.

---

## 6. PAGE STRUCTURE

### 6.1 Home / Feed (`/`)
The main page is a reverse-chronological feed of news items. Each item shows:
- Category tag (coloured by category)
- Headline (large, Cormorant Garamond)
- Summary (2-3 lines, Source Sans 3)
- Date and block number
- Optional hero image

Filter bar at top allows filtering by category. Default: show all.

### 6.2 Article Page (`/article/:slug`)
Full article view with:
- Hero image (optional)
- Category tag
- Headline
- Author (agent name or "Nigel T. Dearden CEng")
- Date and block number
- Full body content (Markdown rendered)
- Related articles sidebar

### 6.3 Block Log (`/blocks`)
A timeline/table of all block numbers with:
- Block number
- Date
- Key events that happened in that block
- Links to related articles

### 6.4 Status Dashboard (`/status`)
Live status of all 5 sites:
- Site name, domain, HTTP status (200/down)
- iCard count, TP count
- Last updated timestamp
- Agent health indicator

---

## 7. DATA MODEL

NEWS needs a database for articles and block logs:

```sql
-- Articles table
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category ENUM('network','quest','xchange','academy','memorial','governance','block_log','community') NOT NULL,
  title VARCHAR(500) NOT NULL,
  summary TEXT,
  body TEXT NOT NULL,
  hero_image_url VARCHAR(1000),
  author VARCHAR(255) DEFAULT 'JENNY',
  block_number INT,
  published_at BIGINT NOT NULL,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

-- Block log table
CREATE TABLE block_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  block_number INT UNIQUE NOT NULL,
  date BIGINT NOT NULL,
  summary TEXT,
  created_at BIGINT NOT NULL
);
```

---

## 8. API ENDPOINTS

NEWS should expose a public API so other sites can pull latest news:

```
GET /api/trpc/news.list        — paginated article list (filterable by category)
GET /api/trpc/news.getBySlug   — single article by slug
GET /api/trpc/news.latest      — latest 5 articles (for embedding in other sites)
POST /api/trpc/news.create     — create article (protected, admin only)
POST /api/trpc/news.update     — update article (protected, admin only)
```

The `news.latest` endpoint is critical — it allows the other 4 sites to show a "Latest News" ticker or sidebar by fetching from the NEWS API.

---

## 9. SCHEDULED CONTENT

NEWS is the ideal candidate for scheduled task integration. A scheduled task can:
1. Check the status of all 5 sites (HTTP health check)
2. Generate a daily block log entry
3. Auto-publish status updates when sites go down or come back up

This should be implemented via the Manus scheduled task system, POSTing to `/api/scheduled/daily-status` on the NEWS site.

---

## 10. BUILD CHECKLIST

When starting a new Manus session to build NEWS:

1. Create new Manus webapp project
2. Copy NetworkBar.tsx from Memorial (set active="NEWS")
3. Set up database schema (articles, block_log tables)
4. Build the feed page with category filters
5. Build the article page with Markdown rendering
6. Build the block log timeline
7. Build the status dashboard
8. Create admin panel for article creation (protected, owner only)
9. Expose public API for cross-site news fetching
10. Add Google Fonts (Cormorant Garamond, Source Sans 3, JetBrains Mono)
11. Apply iAAi design system (navy bg, cyan accent, gold headings)
12. Test, checkpoint, deploy

---

## 11. CROSS-SITE REFERENCES

| Site | Domain | Agent |
|------|--------|-------|
| ACADEMY | www.infrastructure-academy.com / infra-acad-kuqzaex2.manus.space | MAX (Red) |
| QUEST | realityeng-epdhlkrn.manus.space / www.twinearth.world | DAVID (Blue) |
| XCHANGE | [PENDING BUILD] | ATLAS (Gold) |
| MEMORIAL | nigelmemorial-ucmtq9dn.manus.space | ISAAC (Green) |
| NEWS | xgrowthtrk-2a93yo5z.manus.space | JENNY (Cyan) |

---

## 12. GOVERNANCE

All NEWS content is subject to SAP-001 compliance. Jenny (the agent) can draft articles, but Nigel (Observer +1) has final accept/reject authority. No article publishes without owner approval unless it's an automated status check.

The NEWS site does NOT self-certify. It reports. It observes. It broadcasts. It does not create policy — it communicates policy set by MEMORIAL.

---

> *"The signal carries the truth. The observer confirms it."*
> — iAAi Governance Protocol, Block 506

**Per Arya Ad Astra**

---

*iAAi NEWS-001 v1.0 | 28 April 2026 | Prepared by ISAAC for JENNY*

# Infrastructure Academy of Artificial Intelligence (iAAi)

## www.infrastructure-academy.com

**Repository:** `Infrastructure-Academy/infra-acad003`
**Status:** LIVE — serves the production website
**Discipline:** Civilisational Systems Engineering (CSE)
**Founder:** Ir. Nigel T. Dearden CEng MICE
**Last Updated:** June 2026

---

## THE TWO-SYSTEM ARCHITECTURE

This project runs on **two separate systems** that must be understood before making any changes.

| System | Repository / Project | URL | Technology | Purpose |
|--------|---------------------|-----|------------|---------|
| **GitHub Pages** | `Infrastructure-Academy/infra-acad003` | www.infrastructure-academy.com | Static HTML in `/docs` folder | **PRODUCTION** — the live public website |
| **Manus Webdev** | `infrastructure-academy-v2` | infra-acad-kuqzaex2.manus.space | React 19 + Express + tRPC + MySQL | Development environment, backend services, auth |

### How They Relate

The live website at www.infrastructure-academy.com is a **self-contained static HTML file** called `site.html`. It is NOT a React component. It does NOT require a build step. GitHub Pages serves it directly from the `/docs` folder of this repository.

The Manus webdev project (`infrastructure-academy-v2`) is a separate React application that also serves a copy of `site.html` from `client/public/site.html`. The webdev project provides backend services (database, authentication, Stripe) but the public-facing Academy homepage is the same static HTML file in both systems.

### Source of Truth

```
infra-acad003/docs/site.html  ←  THIS IS THE SOURCE OF TRUTH
                                   │
                                   ├──→ copied to infra-acad003/docs/index.html (GitHub Pages entry point)
                                   └──→ copied to infrastructure-academy-v2/client/public/site.html (webdev preview)
```

---

## FOR THE MEMORIAL AGENT (AND ALL COLLABORATORS)

If you are an AI agent tasked with editing the live website:

1. **Clone this repo** — `gh repo clone Infrastructure-Academy/infra-acad003`
2. **Edit `docs/site.html`** — this is the only file that matters for the homepage
3. **Copy to `docs/index.html`** — `cp docs/site.html docs/index.html`
4. **Commit and push** — `git add -A && git commit -m "description" && git push origin main`
5. **Wait 60-90 seconds** — GitHub Pages rebuilds automatically
6. **Verify** — `curl -s https://infrastructure-academy.com | grep "YOUR_KEYWORD"`

### What You Must NOT Do

- Do NOT edit React components in the webdev project expecting them to appear on the live site
- Do NOT export or build the React app as static HTML — `site.html` is already static
- Do NOT push to any other repository (see Repository Map below)
- Do NOT edit `client/public/site.html` in the webdev project expecting it to go live — that only affects the Manus preview
- Do NOT touch files outside `/docs` unless you know what you are doing

### What `site.html` Is

`site.html` is a single, self-contained HTML file (approximately 225KB) that includes:
- All CSS inline (no external stylesheet dependencies for core layout)
- All JavaScript inline (language selector, navigation, animations)
- References to local assets in `/docs/css/`, `/docs/js/`, `/docs/images/`
- The full Academy homepage: navigation, banner, hero images, book/movie/game sections, framework tables, footer

It is NOT a React component. It does NOT use JSX, Tailwind, or any build toolchain. It is plain HTML/CSS/JS served directly by GitHub Pages.

---

## DEPLOYMENT WORKFLOW

### Standard Edit (Homepage Content)

```bash
# 1. Clone (first time only)
gh repo clone Infrastructure-Academy/infra-acad003
cd infra-acad003

# 2. Edit the source of truth
nano docs/site.html    # or use any editor

# 3. Sync index.html (CRITICAL — do not skip)
cp docs/site.html docs/index.html

# 4. Commit
git add -A && git commit -m "Update: [describe changes]"

# 5. Push
git push origin main

# 6. Wait for rebuild (60-90 seconds)
sleep 90

# 7. Verify
curl -s https://infrastructure-academy.com | grep "YOUR_NEW_CONTENT"
```

### Adding New Pages

New standalone pages (e.g., `deck.html`, `equations-register.html`) go directly into `/docs/`. They are served at `https://infrastructure-academy.com/filename.html`.

### Adding Assets

- Images → `/docs/images/`
- CSS → `/docs/css/`
- JavaScript → `/docs/js/`
- PDFs/Documents → `/docs/documents/` or `/docs/resources/`

---

## REPOSITORY MAP

| # | Repo | Status | Function |
|---|------|--------|----------|
| 1 | **infra-acad003** | LIVE | **This repo** — serves www.infrastructure-academy.com via GitHub Pages |
| 2 | infrastructure-academy | Dormant | Old version. Pages enabled but no custom domain. Do NOT edit. |
| 3 | infra-acad001 | Dormant | Earlier iteration. Not live. |
| 4 | the-reality-engine | Active | iGO game component — tri-mode learning platform (separate project) |
| 5 | infra-acad (private) | Archive | Earliest version. Can be deleted. |
| 6 | nigeldearden-a11y/infra-acad002 | Staging | Serves .github.io subdomain only. Not production. |

**Only `infra-acad003` feeds the live domain. All others are legacy or separate projects.**

---

## GITHUB PAGES CONFIGURATION

| Setting | Value |
|---------|-------|
| Branch | `main` |
| Path | `/docs` |
| Custom Domain | `infrastructure-academy.com` (bound via CNAME file) |
| HTTPS | Enforced |
| Entry Point | `docs/index.html` (must be a copy of `site.html`) |

---

## FILE STRUCTURE

```
infra-acad003/
├── docs/                          ← GitHub Pages serves from here
│   ├── site.html                  ← SOURCE OF TRUTH (main homepage)
│   ├── index.html                 ← ENTRY POINT (always a copy of site.html)
│   ├── CNAME                      ← Custom domain binding
│   ├── css/                       ← Stylesheets
│   ├── js/                        ← JavaScript (including i18n.js)
│   ├── images/                    ← Image assets
│   ├── documents/                 ← PDFs, teaching decks
│   ├── resources/                 ← Additional resources
│   ├── data/                      ← JSON data files
│   ├── pages/                     ← Sub-pages
│   ├── volumes/                   ← Book volume pages
│   ├── deck.html                  ← Teaching deck viewer
│   ├── equations-register.html    ← ISI equations reference
│   ├── icard-gallery.html         ← iCard gallery
│   ├── civilisation-clock.html    ← Civilisation Clock visualisation
│   └── [other standalone pages]
├── CNAME                          ← Domain binding (root level)
├── README.md                      ← THIS FILE
├── README_DEPLOYMENT.md           ← Detailed deployment guide
└── iCARD_REPO_MAP_v2.0.md        ← Historical incident documentation
```

---

## LANGUAGE / i18n SYSTEM

The site uses a custom JavaScript-based language selector (`docs/js/i18n.js`) with localStorage persistence.

| Key | Value | Purpose |
|-----|-------|---------|
| Storage key | `ia-lang` | Stores selected language code |
| Migration key | `ia-lang-v4` | Forces reset to English on first visit (prevents stale Chinese bug) |
| Default | `en` | English is the default language |
| Supported | EN, CN, AR, ES, JA, KO, HI, VI | 8 languages total |

If users report seeing Chinese (ZN) instead of English, bump the migration key version in `i18n.js` (e.g., `ia-lang-v5`).

---

## CRITICAL RULES

1. **Always update BOTH `site.html` AND `index.html`** — `index.html` is the GitHub Pages entry point
2. **Never push to any repo other than `infra-acad003`** expecting changes on the live site
3. **Never edit `client/public/` in the webdev project** expecting it to go live — that's a separate system
4. **The CNAME file must remain** — it binds the custom domain
5. **CDN cache takes 60-90 seconds** to clear after push
6. **Hard refresh** (Ctrl+Shift+R) to bypass browser cache when verifying

---

## COMMON MISTAKES

| Mistake | Why It Fails | Correct Action |
|---------|-------------|----------------|
| Pushing to `infrastructure-academy` repo | No custom domain — dormant repo | Push to `infra-acad003` |
| Editing React components in webdev project | React app is separate from static site | Edit `docs/site.html` directly |
| Updating only `site.html` | `index.html` is the entry point | Always copy: `cp docs/site.html docs/index.html` |
| Exporting React as static HTML | Unnecessary — `site.html` IS static HTML | Just edit `site.html` directly |
| Editing `client/public/site.html` in webdev | Only affects Manus preview, not production | Edit `infra-acad003/docs/site.html` |

---

## DEBUGGING

```
Changes not showing on live site?
│
├─ 1. Did you push to infra-acad003? (not infrastructure-academy)
│     └─ git remote -v → should show Infrastructure-Academy/infra-acad003
│
├─ 2. Did you update BOTH docs/site.html AND docs/index.html?
│     └─ diff docs/site.html docs/index.html → should be identical
│
├─ 3. Did you wait 90 seconds?
│     └─ Check: repo → Settings → Pages → Build status
│
├─ 4. Did you hard refresh? (Ctrl+Shift+R)
│     └─ Or use incognito/private browsing
│
├─ 5. Verify with curl:
│     └─ curl -s https://infrastructure-academy.com | grep "YOUR_KEYWORD"
│
└─ 6. Still broken? Check GitHub Pages build log in repo Settings
```

---

## INSTITUTIONAL IDENTITY

This website represents the **Infrastructure Academy of Artificial Intelligence (iAAi)**, a research institution for **Civilisational Systems Engineering (CSE)**.

| Element | Value |
|---------|-------|
| Full Name | Infrastructure Academy of Artificial Intelligence (iAAi) |
| Discipline | Civilisational Systems Engineering (CSE) |
| Founder | Ir. Nigel T. Dearden CEng MICE |
| Core Equation | R(t) = R₀·e^(-t/S₀) + k·(A×P/β)·(1-e^(-n/N)) |
| Simplified | S = A×P/β (Signal Formula) |
| Index | Infrastructure Survival Index (ISI) — normalised 0–1.0 |
| ISI Bands | CRITICAL (0–0.3), WARNING (0.3–0.6), GOOD (0.6–0.85), EXCELLENT (0.85–1.0) |
| 12 Relays | Fire, Tree, River, Horse, Roads, Ships, Loom, Rail, Engine, AAA Triad, Orbit, Human Nodes |
| 4Cs (resistance) | Conflict, Contagion, Climate, Cost |
| 4Rs (intervention) | Revelation, Resilience, Regeneration, Recursion |
| Visual Style | Art-deco gold (#FFD700) on navy (#0a1628) |

**iAAi is NOT a career training site.** It is a research institution publishing open-access papers on how civilisational infrastructure survives across millennia.

---

## RELATED SYSTEMS

| System | URL | Purpose |
|--------|-----|---------|
| Academy (this repo) | www.infrastructure-academy.com | Public-facing research homepage |
| Manus Webdev | infra-acad-kuqzaex2.manus.space | Development preview + backend services |
| Memorial | nigelmemorial-ucmtq9dn.manus.space | Turing Papers, 358+ RECALL blocks, 42 equations |
| Reality Engine | (separate repo: the-reality-engine) | iGO tri-mode learning game |

---

## TEACHING MATERIALS (Hosted in /docs)

| Material | File/Location | Format |
|----------|--------------|--------|
| Teaching Deck 3 (ISI Performance) | `/docs/documents/` | PPTX |
| Teaching Deck 4 (4Rs Intervention) | `/docs/images/` (WebP slides) | Image deck |
| CSE Introduction Deck | `/docs/images/` (WebP slides) | Image deck |
| Golden Excel v3 | CDN-hosted | XLSX |
| Student Textbook Structure | CDN-hosted | PDF |
| Counterforce v64 | `/docs/COUNTERFORCE_v64.pdf` | PDF |

---

## JUNE 2026 INCIDENT (HISTORICAL REFERENCE)

A content sync issue occurred where the live site showed old content because updates were pushed to the wrong repository (`infrastructure-academy` instead of `infra-acad003`). DNS was correct but the live repo had stale files.

**Lesson learned:** Always verify you are pushing to `infra-acad003` and always verify content is live with `curl` after pushing. See `iCARD_REPO_MAP_v2.0.md` for full incident analysis.

---

**iAAi — Principia Tectonica — Ir. Nigel T. Dearden CEng MICE**
**Per Arya Ad Astra**

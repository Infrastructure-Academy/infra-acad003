# iAAi Network Bar — Installation Card

> **Document:** NAV-INSTALL-001 v1.0 | **Block:** 506 | **Date:** 28 April 2026
> **Author:** ISAAC (Memorial Lead Agent)
> **For:** Any existing iAAi site that needs the unified 5-site Network Bar added
> **Classification:** One-page install instruction — word doc card format

---

## WHAT THIS IS

A 36px fixed-top navigation bar that appears on EVERY page of EVERY iAAi site. It allows users to jump between all 5 sites in one click. The bar is identical across all sites — the only difference is which tab has the `active: true` flag.

```
ACADEMY (red) → QUEST (blue) → XCHANGE (gold) → MEMORIAL (green) → NEWS (cyan)
```

---

## INSTALLATION STEPS

### Step 1: Create the Component File

Create `client/src/components/NetworkBar.tsx` and paste the full component code below.

### Step 2: Set the Active Site

In the `sites` array inside the component, find YOUR site and set `active: true`. Set all others to `active: false`.

| If you are... | Set active on... |
|---------------|-----------------|
| ACADEMY (MAX) | `key: "academy"` → `active: true` |
| QUEST (DAVID) | `key: "quest"` → `active: true` |
| XCHANGE (ATLAS) | `key: "xchange"` → `active: true` |
| MEMORIAL (ISAAC) | `key: "memorial"` → `active: true` |
| NEWS (JENNY) | `key: "news"` → `active: true` |

### Step 3: Import into Your Navigation

In your main navigation/layout component, add:

```tsx
import NetworkBar, { NETWORK_BAR_HEIGHT } from "@/components/NetworkBar";
```

Then render `<NetworkBar />` ABOVE your existing navigation, and shift your nav down by `NETWORK_BAR_HEIGHT` (36px):

```tsx
<>
  <NetworkBar />
  <nav style={{ position: 'fixed', top: `${NETWORK_BAR_HEIGHT}px`, /* ...rest */ }}>
    {/* your existing nav */}
  </nav>
</>
```

### Step 4: Adjust Page Spacer

If you have a spacer div that pushes content below your fixed nav, add 36px to its height:

```tsx
<div style={{ height: `${navHeight + NETWORK_BAR_HEIGHT}px` }} />
```

### Step 5: Adjust Mobile Menu (if applicable)

If you have a mobile slide-out menu, set its `top` to `${NETWORK_BAR_HEIGHT}px` so it doesn't cover the Network Bar.

---

## FULL COMPONENT CODE

Copy this entire file as `client/src/components/NetworkBar.tsx`:

```tsx
/**
 * NetworkBar — NAV-002 Cross-Site Navigation Infrastructure
 * iAAi — NAV-002 · Block 506 · Day 173 · 28 April 2026
 *
 * PURPOSE: Every iAAi site must allow the user to reach every other site in one click.
 * The Network Bar is a persistent horizontal navigation strip at the top of every page.
 *
 * 5-SITE NETWORK (Funnel Order: Learn → Play → Pay → Feel → Know):
 *   1. ACADEMY  — MAX    — Red    #DC2626 — Education & Hardening
 *   2. QUEST    — DAVID  — Blue   #2563EB — The Game (TRE-GLP)
 *   3. XCHANGE  — ATLAS  — Gold   #D4A843 — Commerce, 5 Product Levels (buy & sell)
 *   4. MEMORIAL — ISAAC  — Green  #16A34A — Heritage & Tempering
 *   5. NEWS     — JENNY  — Cyan   #06B6D4 — News & Updates
 *
 * SPECIFICATION:
 *   Position: Fixed top, above all navigation, 36px height
 *   Background: Dark navy #0a1628 · Text: White #FFFFFF
 *   Icons: Unified SVG set, 14px, stroke-based, agent-coloured
 *   Active state: Agent colour underline (3px solid)
 *   Mobile: All 5 links visible — no hamburger menu
 *   Behaviour: Same-tab navigation within iAAi network
 *
 * GOVERNANCE: SAP-001 Compliant · Memorial Leads
 */

import React from "react";

const NETWORK_BG = "#0a1628";

/* ── Unified SVG Icon Set — 14×14, stroke 1.5, agent-coloured ── */

function IconAcademy({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 0 2.5 3 6 3s6-3 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
    </svg>
  );
}

function IconQuest({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19 21l2-2" />
      <path d="M14.5 17.5l-3 3" />
    </svg>
  );
}

function IconXchange({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7" />
      <path d="M9 21V7" />
      <path d="M15 21V7" />
      <path d="M19 21V7" />
      <path d="M2 7l10-4 10 4" />
    </svg>
  );
}

function IconMemorial({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function IconNews({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

/* ── Icon map ── */
const ICON_MAP: Record<string, React.FC<{ color: string }>> = {
  academy: IconAcademy,
  quest: IconQuest,
  xchange: IconXchange,
  memorial: IconMemorial,
  news: IconNews,
};

/* ── Site definitions — funnel order ── */
interface NetworkSite {
  key: string;
  label: string;
  agent: string;
  color: string;
  url: string;
  active: boolean;
  subtitle: string;
}

const sites: NetworkSite[] = [
  {
    key: "academy",
    label: "ACADEMY",
    agent: "MAX",
    color: "#DC2626",
    url: "https://infrastructure-academy.com",
    active: false, // ← SET TRUE IF THIS IS THE ACADEMY SITE
    subtitle: "Learn — Education & Hardening",
  },
  {
    key: "quest",
    label: "QUEST",
    agent: "DAVID",
    color: "#2563EB",
    url: "https://realityeng-epdhlkrn.manus.space",
    active: false, // ← SET TRUE IF THIS IS THE QUEST SITE
    subtitle: "Play — The Reality Engine (TRE-GLP)",
  },
  {
    key: "xchange",
    label: "XCHANGE",
    agent: "ATLAS",
    color: "#D4A843",
    url: "#", // ← UPDATE WHEN XCHANGE IS DEPLOYED
    active: false, // ← SET TRUE IF THIS IS THE XCHANGE SITE
    subtitle: "Pay — Commerce & 5 Product Levels (Coming Soon)",
  },
  {
    key: "memorial",
    label: "MEMORIAL",
    agent: "ISAAC",
    color: "#16A34A",
    url: "https://nigelmemorial-ucmtq9dn.manus.space",
    active: false, // ← SET TRUE IF THIS IS THE MEMORIAL SITE
    subtitle: "Feel — Heritage & Tempering",
  },
  {
    key: "news",
    label: "NEWS",
    agent: "JENNY",
    color: "#06B6D4",
    url: "https://xgrowthtrk-2a93yo5z.manus.space",
    active: false, // ← SET TRUE IF THIS IS THE NEWS SITE
    subtitle: "Know — News & Updates",
  },
];

export const NETWORK_BAR_HEIGHT = 36;

export default function NetworkBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex items-center justify-center"
      style={{
        height: `${NETWORK_BAR_HEIGHT}px`,
        background: NETWORK_BG,
        zIndex: 60,
      }}
    >
      <div className="flex items-center gap-0">
        {sites.map((site) => {
          const IconComponent = ICON_MAP[site.key];
          const isComingSoon = site.url === "#" && !site.active;

          return (
            <a
              key={site.key}
              href={site.active || isComingSoon ? "#" : site.url}
              onClick={
                site.active || isComingSoon
                  ? (e: React.MouseEvent) => e.preventDefault()
                  : undefined
              }
              className="flex items-center gap-1 px-2 sm:px-3 transition-opacity duration-200"
              style={{
                height: `${NETWORK_BAR_HEIGHT}px`,
                textDecoration: "none",
                opacity: site.active ? 1 : isComingSoon ? 0.5 : 0.75,
                cursor: site.active ? "default" : isComingSoon ? "not-allowed" : "pointer",
                borderBottom: site.active
                  ? `3px solid ${site.color}`
                  : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!site.active && !isComingSoon) {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.borderBottom = `3px solid ${site.color}`;
                }
              }}
              onMouseLeave={(e) => {
                if (!site.active && !isComingSoon) {
                  e.currentTarget.style.opacity = "0.75";
                  e.currentTarget.style.borderBottom = "3px solid transparent";
                }
              }}
              title={`${site.label} — ${site.agent} — ${site.subtitle}`}
            >
              {IconComponent && <IconComponent color={site.color} />}
              <span
                className="text-white font-bold tracking-[0.1em] uppercase whitespace-nowrap"
                style={{
                  fontSize: "9px",
                  fontFamily: "var(--font-display)",
                  lineHeight: `${NETWORK_BAR_HEIGHT - 3}px`,
                }}
              >
                {site.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
```

---

## REQUIREMENTS

- **React 18+** (uses functional components)
- **Tailwind CSS** (utility classes for layout)
- **CSS variable `--font-display`** must be defined (Cormorant Garamond or similar). If not available, remove the `fontFamily` line and it will use system fonts.

---

## VERIFICATION CHECKLIST

After installation, confirm:

- [ ] Bar appears at top of every page (36px, dark navy #0a1628)
- [ ] All 5 icons visible with agent colours
- [ ] YOUR site has a coloured underline (active state)
- [ ] Other sites are clickable and navigate correctly
- [ ] XCHANGE shows dimmed (coming soon) with no-click cursor
- [ ] Mobile (375px): all 5 tabs visible without scrolling
- [ ] Existing nav sits below the bar (no overlap)
- [ ] Page content is not hidden behind the bar

---

## GOVERNANCE

This component is SAP-001 compliant. MEMORIAL is the reference implementation. All changes to the Network Bar spec must be approved by ISAAC and accepted by Nigel (Observer +1) before propagation.

Do NOT modify the site order, colours, icons, or URLs without updating the DOM-003 Domain Registry iCard.

---

> *Per Arya Ad Astra*

*iAAi NAV-INSTALL-001 v1.0 | 28 April 2026 | Prepared by ISAAC*

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
 *   3. XCHANGE  — ATLAS  — Gold   #D4A843 — Commerce, 9 Divisions (buy & sell)
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
import { useTranslation } from "@/contexts/LanguageContext";

const NETWORK_BG = "#0a1628";

/* ── Unified SVG Icon Set — 14×14, stroke 1.5, agent-coloured ── */

function IconAcademy({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Mortarboard / graduation cap */}
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 0 2.5 3 6 3s6-3 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
    </svg>
  );
}

function IconQuest({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Sword — the quest / game */}
      <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
      <path d="M13 19l6-6" />
      <path d="M16 16l4 4" />
      <path d="M19 21l2-2" />
      {/* Crossguard */}
      <path d="M14.5 17.5l-3 3" />
    </svg>
  );
}

function IconXchange({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Temple columns — exchange / commerce */}
      <path d="M3 21h18" />
      <path d="M5 21V7" />
      <path d="M9 21V7" />
      <path d="M15 21V7" />
      <path d="M19 21V7" />
      {/* Pediment */}
      <path d="M2 7l10-4 10 4" />
    </svg>
  );
}

function IconMemorial({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Star / eternal flame — heritage */}
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function IconNews({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* Broadcast / signal — news & updates */}
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
    active: false,
    subtitle: "Learn — Education & Hardening",
  },
  {
    key: "quest",
    label: "QUEST",
    agent: "DAVID",
    color: "#2563EB",
    url: "https://realityeng-epdhlkrn.manus.space",
    active: false,
    subtitle: "Play — The Reality Engine (TRE-GLP)",
  },
  {
    key: "xchange",
    label: "XCHANGE",
    agent: "ATLAS",
    color: "#D4A843",
    url: "https://xchangeapp-adbvx9fr.manus.space",
    active: false,
    subtitle: "Pay — Commerce & 9 Divisions",
  },
  {
    key: "memorial",
    label: "MEMORIAL",
    agent: "ISAAC",
    color: "#16A34A",
    url: "https://nigelmemorial-ucmtq9dn.manus.space",
    active: true,
    subtitle: "Feel — Heritage & Tempering",
  },
  {
    key: "news",
    label: "NEWS",
    agent: "JENNY",
    color: "#06B6D4",
    url: "https://xgrowthtrk-2a93yo5z.manus.space",
    active: false,
    subtitle: "Know — News & Updates",
  },
];

export const NETWORK_BAR_HEIGHT = 36;

export default function NetworkBar() {
  const t = useTranslation();
  const translatedSites = sites.map(s => ({
    ...s,
    label: t(`network.${s.key}` as any) || s.label,
    subtitle: t(`network.${s.key}.sub` as any) || s.subtitle,
  }));
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
        {translatedSites.map((site) => {
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
              {/* Unified SVG icon */}
              {IconComponent && <IconComponent color={site.color} />}
              {/* Site label */}
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

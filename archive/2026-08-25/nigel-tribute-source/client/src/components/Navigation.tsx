/**
 * Navigation — Unified header for all pages
 * Block 403K — Compact desktop nav with grouped dropdowns + shrink-on-scroll
 * Desktop: grouped nav links in dropdowns to prevent overflow. Mobile: hamburger slide-out.
 */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import MissionClock from "./MissionClock";
import LanguageToggle from "./LanguageToggle";
import SocialFollowButtons from "./SocialFollowButtons";
import { useTranslation } from "@/contexts/LanguageContext";
import { PulseHint, GlowHint } from "./DiscoveryHint";
import NetworkBar, { NETWORK_BAR_HEIGHT } from "./NetworkBar";

const NAVY = "#0b1a33";
const GOLD = "#d4a843";
const GOLD_DIM = "#a08432";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";

const IAAI_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/iaai-logo-compass_3b77dd92.png";

/** A nav item: either a direct link, a dropdown group, or an external link */
interface NavItem {
  href: string;
  label: string;
  external?: boolean;
  externalUrl?: string;
  sub?: Array<{ href: string; label: string; external?: boolean; externalUrl?: string }>;
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(56);
  const [clockHeight, setClockHeight] = useState(83);
  const navRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const t = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure nav + clock height dynamically so the spacer pushes content below both
  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.getBoundingClientRect().height);
      }
      if (clockRef.current) {
        setClockHeight(clockRef.current.getBoundingClientRect().height);
      }
      // Expose total header height as CSS variable on :root for hero section
      const totalH = NETWORK_BAR_HEIGHT + (navRef.current?.getBoundingClientRect().height ?? 56) + (clockRef.current?.getBoundingClientRect().height ?? 83);
      document.documentElement.style.setProperty('--header-h', `${totalH}px`);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    // Re-measure after a short delay to catch late-rendering clock content
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scrolled]); // re-measure when scrolled state changes (padding changes)

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /**
   * Desktop nav: 6 top-level items (3 direct + 2 dropdowns + 1 CTA)
   * Simplified for discoverability — if it can't be seen it can't be used.
   *
   * Structure:
   *   HOME | THE OPUS ▾ (Equation, Spark, Thesis, AIM, TDF) |
   *   VAULT | TITANS |
   *   EXPLORE ▾ (Turing Papers, Jigsaw, Lexicon, Tecton, ISI, Journey, Origin, EP.II, Press, Cards, Universe, Hardware, BIN) |
   *   PLAY THE GAME
   */
  const navItems: NavItem[] = [
    { href: "/", label: t("nav.home") },
    {
      href: "/quotient",
      label: t("nav.theOpus" as any),
      sub: [
        { href: "/quotient", label: t("nav.equation") },
        { href: "/inertial-jump", label: t("nav.inertialJump") },
        { href: "/thesis", label: t("nav.thesis") },
        { href: "/aim", label: t("nav.aim") },
        { href: "/tdf", label: t("nav.tdf") },
      ],
    },
    { href: "/vault", label: t("nav.vault") },
    { href: "/titans", label: t("nav.titans") },
    {
      href: "/turing-papers",
      label: t("nav.explore" as any),
      sub: [
        { href: "/turing-papers", label: t("nav.turingPapers") },
        { href: "/jigsaw", label: t("nav.jigsaw" as any) },
        { href: "/lexicon", label: t("nav.lexicon") },
        { href: "/tecton", label: t("nav.tecton") },
        { href: "/isi", label: t("nav.isi" as any) },
        { href: "/journey", label: t("nav.journey") },
        { href: "/ventral-origin", label: t("nav.origin" as any) },
        { href: "/episode-2", label: t("nav.ep2" as any) },
        { href: "/press", label: t("nav.pressPack") },
        { href: "/cards", label: t("nav.cards" as any) },
        { href: "/universe", label: t("nav.universe") },
        { href: "/hardware", label: t("nav.hardware") },
        { href: "/boffin-bin", label: t("nav.bin" as any) },
        { href: "/igo", label: t("nav.igo" as any) },
        { href: "/thesis/v2#500-generations", label: t("nav.500gen" as any) },
        { href: "/scholar-8", label: t("nav.scholar8" as any) },
        { href: "/generation-wave", label: t("nav.40genWave" as any) },
        { href: "/civilisational-divide", label: t("nav.theDivide" as any) },
      ],
    },
    { href: "/game", label: t("nav.playTheGame" as any), external: true, externalUrl: "https://realityeng-epdhlkrn.manus.space/" },
  ];

  /** Mobile nav uses the same grouped navItems for accordion-style expand/collapse */
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const toggleMobileGroup = (href: string) => {
    setMobileExpanded((prev) => (prev === href ? null : href));
  };

  /** Check if a dropdown group is "active" (any child matches current location) */
  const isGroupActive = (item: NavItem) => {
    if (location === item.href) return true;
    if (item.sub) return item.sub.some((s) => location === s.href || location.startsWith(s.href + "/"));
    return false;
  };

  const linkStyle = { fontFamily: "var(--font-display)" };
  const activeCls = "text-[oklch(0.72_0.12_75)]";
  const inactiveCls = "text-[oklch(0.65_0.01_75)] hover:text-[oklch(0.88_0.01_75)]";
  const subActiveCls = "text-[oklch(0.72_0.12_75)]";
  const subInactiveCls = "text-[oklch(0.55_0.01_75)] hover:text-[oklch(0.88_0.01_75)]";

  return (
    <>
      {/* ── NETWORK BAR — NAV-001 Cross-Site Navigation ── */}
      <NetworkBar />

      {/* ── MAIN HEADER BAR ── */}
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-40 transition-all duration-500"
        style={{
          top: `${NETWORK_BAR_HEIGHT}px`,
          background: scrolled ? `${NAVY}ee` : NAVY,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: `1px solid ${scrolled ? GOLD + "80" : GOLD}`,
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500"
          style={{ padding: scrolled ? "6px 24px" : "12px 24px" }}
        >
          {/* LEFT: Logo + Academy Name */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={IAAI_LOGO}
              alt="iAAi"
              className="object-contain transition-all duration-500"
              style={{ height: scrolled ? "28px" : "36px" }}
            />
            <span
              className="font-bold tracking-[0.1em] uppercase hidden xl:inline transition-all duration-500"
              style={{
                color: TEXT_WHITE,
                ...linkStyle,
                fontSize: scrolled ? "11px" : "13px",
              }}
            >
              {t("home.academy")}
            </span>
          </Link>

          {/* RIGHT: Desktop nav + Language + Hamburger */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop nav links — hidden below lg */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-3">
              {navItems.map((item) =>
                item.external ? (
                  <GlowHint>
                  <a
                    key={item.href}
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-[0.1em] uppercase font-bold transition-all duration-500 text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.88_0.12_75)] border border-[oklch(0.72_0.12_75)] whitespace-nowrap"
                    style={{
                      ...linkStyle,
                      fontSize: scrolled ? "9px" : "10px",
                      padding: scrolled ? "2px 6px" : "3px 8px",
                    }}
                  >
                    {item.label}
                  </a>
                  </GlowHint>
                ) : item.sub ? (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`tracking-[0.1em] uppercase font-light transition-all duration-500 whitespace-nowrap ${
                        isGroupActive(item) ? activeCls : inactiveCls
                      }`}
                      style={{ ...linkStyle, fontSize: scrolled ? "9px" : "10px" }}
                    >
                      {item.label} ▾
                    </Link>
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                      style={{ minWidth: item.sub && item.sub.length > 7 ? "300px" : "160px", zIndex: 60 }}
                    >
                      <div
                        className={`py-2 px-1 ${item.sub && item.sub.length > 7 ? "grid grid-cols-2 gap-0" : ""}`}
                        style={{ background: `${NAVY}f5`, border: `1px solid ${GOLD_DIM}40`, backdropFilter: "blur(16px)" }}
                      >
                        {item.sub.map((subLink) =>
                          subLink.external ? (
                            <a
                              key={subLink.href}
                              href={subLink.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block px-4 py-2 text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300 ${subInactiveCls}`}
                              style={linkStyle}
                            >
                              {subLink.label}
                            </a>
                          ) : (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className={`block px-4 py-2 text-xs tracking-[0.1em] uppercase font-light transition-colors duration-300 ${
                                location === subLink.href || location.startsWith(subLink.href + "/")
                                  ? subActiveCls
                                  : subInactiveCls
                              }`}
                              style={linkStyle}
                            >
                              {subLink.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`tracking-[0.1em] uppercase font-light transition-all duration-500 whitespace-nowrap ${
                      location === item.href ? activeCls : inactiveCls
                    }`}
                    style={{ ...linkStyle, fontSize: scrolled ? "9px" : "10px" }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Social Follow Buttons — desktop only */}
            <div className="hidden lg:block">
              <SocialFollowButtons compact={scrolled} />
            </div>

            {/* BETA POC Badge — liability disclaimer, matches Academy + TRE sites */}
            <Link
              href="/disclaimer"
              className="hidden sm:inline-flex items-center tracking-[0.15em] uppercase font-bold shrink-0 transition-all duration-500 hover:opacity-80"
              style={{
                fontSize: scrolled ? "8px" : "9px",
                padding: scrolled ? "1px 6px" : "2px 8px",
                color: "#0b1a33",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                borderRadius: "3px",
                letterSpacing: "0.15em",
                textDecoration: "none",
              }}
            >
              {t("nav.betaPoc" as any)}
            </Link>

            {/* Language Toggle */}
            <LanguageToggle
              borderColor={GOLD_DIM}
              textColor={TEXT_SILVER}
              hoverBg="rgba(212,168,67,0.12)"
            />

            {/* Hamburger — visible on mobile/tablet */}
            <PulseHint label="MENU">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: GOLD,
                  transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: GOLD,
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: GOLD,
                  transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </button>
            </PulseHint>
          </div>
        </div>
      </nav>

      {/* ── MOBILE SLIDE-OUT MENU — Accordion style ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ top: `${NETWORK_BAR_HEIGHT}px`, background: `${NAVY}f5`, backdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col items-center h-full gap-3 pb-8 overflow-y-auto" style={{ paddingTop: `${navHeight + 16}px` }}>
            {/* Social Follow Buttons — mobile menu */}
            <div className="mb-2">
              <SocialFollowButtons />
            </div>

            {/* BETA POC Badge — mobile menu */}
            <Link
              href="/disclaimer"
              className="inline-flex items-center tracking-[0.15em] uppercase font-bold mb-2 hover:opacity-80"
              style={{
                fontSize: "10px",
                padding: "3px 10px",
                color: "#0b1a33",
                background: "linear-gradient(135deg, #22c55e, #16a34a)",
                borderRadius: "3px",
                letterSpacing: "0.15em",
                textDecoration: "none",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.betaPoc" as any)}
            </Link>

            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg tracking-[0.2em] uppercase font-bold transition-colors duration-300 text-[oklch(0.72_0.12_75)] hover:text-[oklch(0.88_0.12_75)] border border-[oklch(0.72_0.12_75)] px-4 py-2 mt-2"
                  style={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : item.sub ? (
                <div key={item.href} className="flex flex-col items-center w-full max-w-xs">
                  {/* Group header — tap to expand/collapse */}
                  <button
                    onClick={() => toggleMobileGroup(item.href)}
                    className={`text-lg tracking-[0.2em] uppercase font-light transition-colors duration-300 flex items-center gap-2 ${
                      isGroupActive(item)
                        ? "text-[oklch(0.72_0.12_75)]"
                        : "text-[oklch(0.75_0.01_75)]"
                    }`}
                    style={linkStyle}
                  >
                    {item.label}
                    <span
                      className="text-xs transition-transform duration-300 inline-block"
                      style={{
                        transform: mobileExpanded === item.href ? "rotate(180deg)" : "rotate(0deg)",
                        color: GOLD_DIM,
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {/* Sub-links — accordion expand */}
                  <div
                    className="flex flex-col items-center gap-2 overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: mobileExpanded === item.href ? `${(item.sub.length + 1) * 44}px` : "0px",
                      opacity: mobileExpanded === item.href ? 1 : 0,
                      marginTop: mobileExpanded === item.href ? "8px" : "0px",
                    }}
                  >
                    {/* Parent page link */}
                    <Link
                      href={item.href}
                      className={`text-sm tracking-[0.15em] uppercase font-light transition-colors duration-300 ${
                        location === item.href
                          ? "text-[oklch(0.72_0.12_75)]"
                          : "text-[oklch(0.55_0.01_75)] hover:text-[oklch(0.88_0.01_75)]"
                      }`}
                      style={linkStyle}
                      onClick={() => setMenuOpen(false)}
                    >
                      ↳ Overview
                    </Link>
                    {item.sub.map((subLink) =>
                      subLink.external ? (
                        <a
                          key={subLink.href}
                          href={subLink.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm tracking-[0.15em] uppercase font-light transition-colors duration-300 text-[oklch(0.55_0.01_75)] hover:text-[oklch(0.88_0.01_75)]"
                          style={linkStyle}
                          onClick={() => setMenuOpen(false)}
                        >
                          ↳ {subLink.label}
                        </a>
                      ) : (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className={`text-sm tracking-[0.15em] uppercase font-light transition-colors duration-300 ${
                            location === subLink.href || location.startsWith(subLink.href + "/")
                              ? "text-[oklch(0.72_0.12_75)]"
                              : "text-[oklch(0.55_0.01_75)] hover:text-[oklch(0.88_0.01_75)]"
                          }`}
                          style={linkStyle}
                          onClick={() => setMenuOpen(false)}
                        >
                          ↳ {subLink.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
                    location === item.href
                      ? "text-[oklch(0.72_0.12_75)]"
                      : "text-[oklch(0.75_0.01_75)] hover:text-[oklch(0.88_0.01_75)]"
                  }`}
                  style={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* ── MISSION CLOCK ── */}
      <div
        ref={clockRef}
        className="fixed left-0 right-0 z-30 transition-all duration-700"
        style={{ top: `${NETWORK_BAR_HEIGHT + navHeight}px` }}
      >
        <MissionClock />
      </div>

      {/* ── SPACER — pushes page content below network bar + nav + clock ── */}
      <div style={{ height: `${NETWORK_BAR_HEIGHT + navHeight + clockHeight}px` }} aria-hidden="true" className="hidden sm:block" />
      <div style={{ height: `${NETWORK_BAR_HEIGHT + navHeight - 20}px` }} aria-hidden="true" className="sm:hidden" />
    </>
  );
}

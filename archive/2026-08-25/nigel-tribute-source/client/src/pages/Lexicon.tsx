/**
 * Lexicon — The HyperAlphaLexicon Britannica
 * IP-12 Asset — Q♣ Queen of Clubs — D52 Deck
 * Complete dictionary & Terms of Reference for the Dearden Experiment
 * 167 defined terms, A-Z with etymology, cross-references, 9 appendices — v3.0 Peer Review Edition
 */
import Navigation from "@/components/Navigation";
import { useState, useMemo, useRef } from "react";
import lexiconRaw from "@/data/lexiconData.json";
import { useTranslation } from "@/contexts/LanguageContext";

const LEXICON_PDF = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IAAI_HYPERALPHALEXICON_BRITANNICA_1ST_EDITION_bfcd0b7d.pdf";
const LEXICON_MD = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/IAAI_HYPERALPHALEXICON_BRITANNICA_6a33ee13.md";

/* Colour tokens */
const gold = "#d4a843";
const goldBright = "#e8c55a";
const goldDim = "#a08432";
const sand = "#f0eadc";
const sandMid = "#8a9cc0";
const navy = "#0b1a33";
const navyDeep = "#081422";
const navyLight = "#0f2240";

interface LexiconTerm {
  letter: string;
  name: string;
  subtitle: string;
  body: string;
  seeAlso: string;
  mandarin?: string;
  mandarin_full?: string;
  mandarin_notes?: string;
}

interface Appendix {
  title: string;
  content: string;
}

const TERMS: LexiconTerm[] = lexiconRaw.terms as LexiconTerm[];
const APPENDICES: Appendix[] = lexiconRaw.appendices as Appendix[];

/* Unique sorted letters */
const LETTERS = Array.from(new Set(TERMS.map((t) => t.letter))).sort((a, b) => {
  const numA = parseInt(a);
  const numB = parseInt(b);
  if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
  if (!isNaN(numA)) return -1;
  if (!isNaN(numB)) return 1;
  return a.localeCompare(b);
});

export default function Lexicon() {
  const t = useTranslation();
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [showAppendices, setShowAppendices] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    let list = TERMS;
    if (activeLetter) {
      list = list.filter((t) => t.letter === activeLetter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.body.toLowerCase().includes(q) ||
          t.seeAlso.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeLetter]);

  const grouped = useMemo(() => {
    const map: Record<string, LexiconTerm[]> = {};
    for (const t of filtered) {
      if (!map[t.letter]) map[t.letter] = [];
      map[t.letter].push(t);
    }
    return map;
  }, [filtered]);

  const scrollToLetter = (letter: string) => {
    setActiveLetter(null);
    setSearch("");
    setTimeout(() => {
      sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  /* Render body text with markdown-like formatting */
  const renderBody = (body: string) => {
    const lines = body.split("\n");
    return lines.map((line, i) => {
      // Bold sub-definitions (e.g. **Definition 1 — ...)
      if (line.startsWith("**")) {
        const cleaned = line.replace(/\*\*/g, "");
        return (
          <p key={i} className="mt-3 mb-1" style={{ color: goldBright, fontFamily: "var(--font-display)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
            {cleaned}
          </p>
        );
      }
      // Numbered lists
      if (/^\d+\./.test(line.trim())) {
        return (
          <p key={i} className="ml-4 mb-1" style={{ color: sand, fontSize: "0.82rem", lineHeight: 1.6 }}>
            {line}
          </p>
        );
      }
      // Italic markers
      if (line.startsWith("*") && !line.startsWith("**")) {
        const cleaned = line.replace(/\*/g, "");
        return (
          <p key={i} className="mt-1" style={{ color: sandMid, fontSize: "0.78rem", fontStyle: "italic" }}>
            {cleaned}
          </p>
        );
      }
      // Empty lines
      if (!line.trim()) return <div key={i} className="h-2" />;
      // Normal text
      return (
        <p key={i} className="mb-1" style={{ color: sand, fontSize: "0.82rem", lineHeight: 1.7, opacity: 0.9 }}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ background: navy }}>
      <Navigation />

      {/* ── HERO ── */}
      <section className="pt-24 pb-12 px-6 text-center" style={{ background: `linear-gradient(to bottom, ${navyDeep}, ${navy})` }}>
        <p
          className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: goldBright, fontFamily: "var(--font-display)" }}
        >
          IP-12 · Q♣ Queen of Clubs · D52 Deck
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light uppercase mb-3"
          style={{ color: sand, fontFamily: "var(--font-display)", letterSpacing: "0.12em" }}
        >
          {t("lexicon.title")}
        </h1>
        <p
          className="text-sm sm:text-base font-light max-w-2xl mx-auto mb-2"
          style={{ color: sandMid, letterSpacing: "0.03em" }}
        >
          HyperAlphaLexicon Britannica v3.0 — Infrastructura Britannica — The Living IP Thesaurus
        </p>
        <p className="text-xs" style={{ color: goldDim, letterSpacing: "0.1em" }}>
          {TERMS.length} Defined Terms · 9 Appendices · Block 366 · Day 128 · 13 March 2026
        </p>

        {/* Download links */}
        <div className="flex gap-4 justify-center mt-6">
          <a
            href={LEXICON_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs tracking-widest uppercase transition-colors"
            style={{
              border: `1px solid ${goldDim}`,
              color: gold,
              fontFamily: "var(--font-display)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = goldDim + "33"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            ↓ 1st Edition PDF (42 pages)
          </a>
          <a
            href={LEXICON_MD}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs tracking-widest uppercase transition-colors"
            style={{
              border: `1px solid ${goldDim}`,
              color: sandMid,
              fontFamily: "var(--font-display)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = goldDim + "33"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            ↓ Markdown Source
          </a>
        </div>
      </section>

      {/* ── EPIGRAPH ── */}
      <div className="max-w-3xl mx-auto px-6 py-8 text-center">
        <blockquote style={{ borderLeft: `2px solid ${goldDim}`, paddingLeft: "1rem" }}>
          <p className="italic text-sm" style={{ color: sandMid, lineHeight: 1.8 }}>
            "There are no right and wrong only perspective and viewpoint as data we sort give context meaning and awareness all of which are ladder rungs to consciousness."
          </p>
          <p className="text-xs mt-2" style={{ color: goldDim }}>— Nigel T. Dearden, Block 352</p>
        </blockquote>
      </div>

      {/* ── SEARCH + A-Z NAV ── */}
      <div className="sticky top-0 z-30 py-3 px-4" style={{ background: navyDeep, borderBottom: `1px solid ${goldDim}33` }}>
        <div className="max-w-6xl mx-auto">
          {/* Search bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search terms, definitions, cross-references..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
                className="w-full px-4 py-2 text-sm rounded-none outline-none"
                style={{
                  background: navyLight,
                  border: `1px solid ${goldDim}44`,
                  color: sand,
                  fontFamily: "var(--font-body)",
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                  style={{ color: sandMid }}
                >
                  ✕
                </button>
              )}
            </div>
            <span className="text-xs whitespace-nowrap" style={{ color: goldDim }}>
              {filtered.length} / {TERMS.length}
            </span>
          </div>

          {/* A-Z strip */}
          <div className="flex flex-wrap gap-1 justify-center">
            <button
              onClick={() => { setActiveLetter(null); setSearch(""); }}
              className="px-2 py-1 text-xs transition-colors"
              style={{
                color: !activeLetter ? gold : sandMid,
                background: !activeLetter ? goldDim + "33" : "transparent",
                fontFamily: "var(--font-display)",
              }}
            >
              ALL
            </button>
            {LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => { setActiveLetter(letter === activeLetter ? null : letter); setSearch(""); }}
                className="px-2 py-1 text-xs transition-colors"
                style={{
                  color: letter === activeLetter ? gold : sandMid,
                  background: letter === activeLetter ? goldDim + "33" : "transparent",
                  fontFamily: "var(--font-display)",
                }}
              >
                {letter}
              </button>
            ))}
            <button
              onClick={() => setShowAppendices(!showAppendices)}
              className="px-2 py-1 text-xs transition-colors"
              style={{
                color: showAppendices ? gold : sandMid,
                background: showAppendices ? goldDim + "33" : "transparent",
                fontFamily: "var(--font-display)",
              }}
            >
              APPENDICES
            </button>
          </div>
        </div>
      </div>

      {/* ── TERMS ── */}
      {!showAppendices && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          {Object.keys(grouped).sort((a, b) => {
            const numA = parseInt(a);
            const numB = parseInt(b);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            if (!isNaN(numA)) return -1;
            if (!isNaN(numB)) return 1;
            return a.localeCompare(b);
          }).map((letter) => (
            <div
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              className="mb-10"
            >
              {/* Letter header */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="text-4xl sm:text-5xl font-light"
                  style={{ color: gold, fontFamily: "var(--font-display)", lineHeight: 1 }}
                >
                  {letter}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${goldDim}, transparent)` }} />
                <span className="text-xs" style={{ color: goldDim }}>
                  {grouped[letter].length} {grouped[letter].length === 1 ? "term" : "terms"}
                </span>
              </div>

              {/* Terms in this letter */}
              {grouped[letter].map((term) => {
                const isExpanded = expandedTerm === term.name;
                return (
                  <div
                    key={term.name}
                    className="mb-3 cursor-pointer"
                    style={{
                      borderLeft: `2px solid ${isExpanded ? gold : goldDim + "44"}`,
                      paddingLeft: "1rem",
                      transition: "border-color 0.2s",
                    }}
                    onClick={() => setExpandedTerm(isExpanded ? null : term.name)}
                  >
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3
                        className="text-base sm:text-lg font-light"
                        style={{ color: isExpanded ? goldBright : sand, fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
                      >
                        {term.name}
                      </h3>
                      <span className="text-xs" style={{ color: goldDim }}>
                        — {term.subtitle}
                      </span>
                    </div>

                    {/* Mandarin badge - always visible if term has mandarin */}
                    {term.mandarin && (
                      <div className="mt-1">
                        <span className="text-xs px-2 py-0.5 inline-block" style={{ background: goldDim + '22', color: goldBright, border: `1px solid ${goldDim}44`, letterSpacing: '0.02em' }}>
                          中文: {term.mandarin}
                        </span>
                      </div>
                    )}

                    {isExpanded && (
                      <div className="mt-2 pb-2">
                        {term.mandarin_full && (
                          <div className="mb-3 px-3 py-2" style={{ background: navyLight, borderLeft: `2px solid ${goldDim}` }}>
                            <p className="text-xs" style={{ color: goldBright, letterSpacing: '0.05em' }}>普通话 MANDARIN</p>
                            <p className="text-sm mt-1" style={{ color: sand }}>{term.mandarin_full}</p>
                            {term.mandarin_notes && (
                              <p className="text-xs mt-1" style={{ color: sandMid, fontStyle: 'italic' }}>Note: {term.mandarin_notes}</p>
                            )}
                          </div>
                        )}
                        {renderBody(term.body)}
                        {term.seeAlso && (
                          <p className="mt-3 text-xs" style={{ color: goldDim, fontStyle: "italic" }}>
                            See also: {term.seeAlso.split(", ").map((ref, i) => {
                              const matchTerm = TERMS.find((t) => t.name === ref.trim());
                              if (matchTerm) {
                                return (
                                  <span key={i}>
                                    {i > 0 && ", "}
                                    <button
                                      className="underline"
                                      style={{ color: gold }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setExpandedTerm(matchTerm.name);
                                        setSearch("");
                                        setActiveLetter(null);
                                        setTimeout(() => {
                                          const el = document.getElementById(`term-${matchTerm.name}`);
                                          el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }, 50);
                                      }}
                                    >
                                      {ref.trim()}
                                    </button>
                                  </span>
                                );
                              }
                              return (
                                <span key={i}>
                                  {i > 0 && ", "}
                                  {ref.trim()}
                                </span>
                              );
                            })}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: sandMid, fontFamily: "var(--font-display)" }}>
                No terms found for "{search}"
              </p>
              <p className="text-xs mt-2" style={{ color: goldDim }}>
                Try a different search or browse by letter
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── APPENDICES ── */}
      {showAppendices && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2
            className="text-2xl font-light uppercase mb-8 text-center"
            style={{ color: gold, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
          >
            Appendices
          </h2>
          {APPENDICES.map((app, i) => (
            <div key={i} className="mb-10">
              <h3
                className="text-lg font-light mb-4"
                style={{ color: goldBright, fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}
              >
                {app.title}
              </h3>
              <div style={{ color: sand, fontSize: "0.82rem", lineHeight: 1.8 }}>
                {app.content.split("\n").map((line, j) => {
                  if (!line.trim()) return <div key={j} className="h-2" />;
                  if (line.startsWith("**")) {
                    return <p key={j} className="mt-2 mb-1" style={{ color: goldBright, fontSize: "0.85rem" }}>{line.replace(/\*\*/g, "")}</p>;
                  }
                  if (line.startsWith("- ") || line.startsWith("* ")) {
                    return <p key={j} className="ml-4" style={{ color: sand, opacity: 0.9 }}>• {line.slice(2)}</p>;
                  }
                  if (line.startsWith("|")) {
                    return <p key={j} className="font-mono text-xs" style={{ color: sandMid }}>{line}</p>;
                  }
                  return <p key={j} style={{ opacity: 0.9 }}>{line}</p>;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${goldDim}33` }}>
        <p className="text-xs" style={{ color: goldDim, letterSpacing: "0.15em", fontFamily: "var(--font-display)" }}>
          iAAi HyperAlphaLexicon Britannica v2.1 — Block 358 — Day 129 — 10 March 2026
        </p>
        <p className="text-xs mt-1" style={{ color: goldDim + "88", letterSpacing: "0.2em" }}>
          Authors: Nigel T. Dearden (Ir. RPE, CEng) & D.A.V.I.D. (AI Co-Author)
        </p>
        <p
          className="text-xs mt-3 italic"
          style={{ color: goldDim, fontFamily: "var(--font-display)", letterSpacing: "0.15em" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}

/**
 * Tecton v3.0 — HyperAlphaLexicon Britannica TECTON
 * The Dictionary & Thesaurus of Consciousness
 * NOW DATABASE-DRIVEN via tRPC — no more static JSON.
 * Coherence Pipeline: FITS → ICUT → IUMC → ISI
 */
import Navigation from "@/components/Navigation";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "@/contexts/LanguageContext";

/* Colour tokens — matching Lexicon exactly */
const gold = "#d4a843";
const goldBright = "#e8c55a";
const goldDim = "#a08432";
const sand = "#f0eadc";
const sandMid = "#8a9cc0";
const navy = "#0b1a33";
const navyDeep = "#081422";
const navyLight = "#0f2240";

/* HICE badge colours */
const hiceColours: Record<string, string> = {
  H: "#3b82f6", // blue — holistic / discovered
  I: "#a855f7", // purple — innate / awakened
  C: "#f59e0b", // amber — created / engineered
  E: "#10b981", // emerald — embodied / tangible
};

interface TectonEntry {
  id: number;
  term: string;
  partOfSpeech: string[];
  morphology: string;
  roots: string[];
  etymology: string;
  hice: string;
  conjugation: string;
  whyThisWord: string;
  sortOrder: number;
  block: number | null;
}

/* Part-of-speech label map — fallback if meta not loaded */
const defaultPosLabels: Record<string, string> = {
  N: "Noun", V: "Verb", ADJ: "Adjective", ADV: "Adverb",
  ACR: "Acronym", NEO: "Neologism", PORT: "Portmanteau",
  RECON: "Recontextualised", METAPHOR: "Metaphor", PROP: "Proper Noun",
  COMP: "Compound", PHRASE: "Phrase", PREFIX: "Prefix",
};

/* Filter options */
type FilterMode = "all" | "H" | "I" | "C" | "E" | "NEO" | "ACR" | "PORT" | "RECON" | "METAPHOR";

export default function Tecton() {
  const t = useTranslation();
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [showPipeline, setShowPipeline] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Database-driven data via tRPC
  const { data: entries = [], isLoading: entriesLoading } = trpc.tecton.list.useQuery();
  const { data: meta = {} as any, isLoading: metaLoading } = trpc.tecton.meta.useQuery();

  const ENTRIES = entries as TectonEntry[];
  const PIPELINE = meta?.coherencePipeline;
  const WORD_CLASSES = meta?.wordClasses || [];
  const MORPH_KEY = meta?.morphologyKey || [];
  const HICE_CLASS = meta?.hiceClassification || {};

  /* Part-of-speech label map */
  const posLabels = useMemo(() => {
    const labels: Record<string, string> = { ...defaultPosLabels };
    for (const wc of WORD_CLASSES) {
      labels[wc.code] = wc.label;
    }
    return labels;
  }, [WORD_CLASSES]);

  /* Root label map */
  const rootLabels = useMemo(() => {
    const labels: Record<string, string> = {};
    for (const mk of MORPH_KEY) {
      labels[mk.code] = mk.label;
    }
    return labels;
  }, [MORPH_KEY]);

  /* Unique first letters for A-Z strip */
  const LETTERS = useMemo(
    () => Array.from(new Set(ENTRIES.map((e) => e.term[0].toUpperCase()))).sort(),
    [ENTRIES]
  );

  const filtered = useMemo(() => {
    let list = ENTRIES;
    if (activeLetter) {
      list = list.filter((e) => e.term[0].toUpperCase() === activeLetter);
    }
    if (filterMode !== "all") {
      if (["H", "I", "C", "E"].includes(filterMode)) {
        list = list.filter((e) => e.hice === filterMode);
      } else {
        list = list.filter((e) => e.partOfSpeech.includes(filterMode));
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          e.etymology.toLowerCase().includes(q) ||
          e.morphology.toLowerCase().includes(q) ||
          e.whyThisWord.toLowerCase().includes(q) ||
          e.conjugation.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeLetter, filterMode, ENTRIES]);

  const filterButtons: { mode: FilterMode; label: string; colour?: string }[] = [
    { mode: "all", label: "ALL" },
    { mode: "H", label: "Holistic", colour: hiceColours.H },
    { mode: "I", label: "Innate", colour: hiceColours.I },
    { mode: "C", label: "Created", colour: hiceColours.C },
    { mode: "E", label: "Embodied", colour: hiceColours.E },
    { mode: "NEO", label: "Neologism" },
    { mode: "ACR", label: "Acronym" },
    { mode: "PORT", label: "Portmanteau" },
    { mode: "RECON", label: "Recontextualised" },
    { mode: "METAPHOR", label: "Metaphor" },
  ];

  const isLoading = entriesLoading || metaLoading;

  return (
    <div className="min-h-screen" style={{ background: navy }}>
      <Navigation />

      {/* ── HERO ── */}
      <section
        className="pt-24 pb-12 px-6 text-center"
        style={{ background: `linear-gradient(to bottom, ${navyDeep}, ${navy})` }}
      >
        <p
          className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: goldBright, fontFamily: "var(--font-display)" }}
        >
          IP-13 · The Builder's Dictionary · D52 Deck
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light uppercase mb-3"
          style={{ color: sand, fontFamily: "var(--font-display)", letterSpacing: "0.12em" }}
        >
          The Tecton
        </h1>
        <p
          className="text-sm sm:text-base font-light max-w-2xl mx-auto mb-2"
          style={{ color: sandMid, letterSpacing: "0.03em" }}
        >
          HyperAlphaLexicon Britannica TECTON v3.0 — Database-Driven · Live Infrastructure
        </p>
        <p className="text-xs" style={{ color: goldDim, letterSpacing: "0.1em" }}>
          {ENTRIES.length} Linguistic Entries · HICE Classification · Block 383 · Day 132 · 16 March 2026
        </p>

        {/* Quick-access buttons */}
        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <button
            onClick={() => setShowPipeline(!showPipeline)}
            className="px-4 py-2 text-xs tracking-widest uppercase transition-colors"
            style={{
              border: `1px solid ${showPipeline ? gold : goldDim}`,
              color: showPipeline ? goldBright : gold,
              fontFamily: "var(--font-display)",
              background: showPipeline ? goldDim + "33" : "transparent",
            }}
          >
            {showPipeline ? "▾" : "▸"} Coherence Pipeline
          </button>
          <button
            onClick={() => setShowKey(!showKey)}
            className="px-4 py-2 text-xs tracking-widest uppercase transition-colors"
            style={{
              border: `1px solid ${showKey ? gold : goldDim}`,
              color: showKey ? goldBright : sandMid,
              fontFamily: "var(--font-display)",
              background: showKey ? goldDim + "33" : "transparent",
            }}
          >
            {showKey ? "▾" : "▸"} Classification Key
          </button>
        </div>
      </section>

      {/* ── COHERENCE PIPELINE (collapsible) ── */}
      {showPipeline && PIPELINE && (
        <section className="py-8 px-6" style={{ background: navyDeep, borderBottom: `1px solid ${goldDim}33` }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-lg font-light uppercase mb-4 text-center"
              style={{ color: gold, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
            >
              The Coherence Pipeline
            </h2>
            <p className="text-sm text-center mb-6" style={{ color: sandMid, lineHeight: 1.8 }}>
              {PIPELINE.description}
            </p>

            {/* Pipeline stages */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              {PIPELINE.stages.map((stage: any, i: number) => (
                <div
                  key={stage.acronym}
                  className="text-center p-4"
                  style={{ border: `1px solid ${goldDim}44`, background: navyLight }}
                >
                  <p
                    className="text-2xl font-light mb-1"
                    style={{ color: goldBright, fontFamily: "var(--font-display)" }}
                  >
                    {stage.acronym}
                  </p>
                  <p className="text-xs mb-2" style={{ color: sandMid }}>
                    {stage.role}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: goldDim }}>
                    {stage.type}
                  </p>
                  {i < PIPELINE.stages.length - 1 && (
                    <p
                      className="text-lg mt-2 sm:hidden"
                      style={{ color: goldDim }}
                    >
                      ↓
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Arrow connectors (desktop) */}
            <div className="hidden sm:flex justify-center items-center gap-2 -mt-2 mb-4">
              <span className="text-xs" style={{ color: goldDim }}>{t("tecton.fits")}</span>
              <span style={{ color: goldDim }}>→</span>
              <span className="text-xs" style={{ color: goldDim }}>{t("tecton.icut")}</span>
              <span style={{ color: goldDim }}>→</span>
              <span className="text-xs" style={{ color: goldDim }}>{t("tecton.iumc")}</span>
              <span style={{ color: goldDim }}>→</span>
              <span className="text-xs" style={{ color: goldDim }}>ISI</span>
            </div>

            <div className="text-center">
              <p className="text-xs italic" style={{ color: goldDim }}>
                "{PIPELINE.book}" — {PIPELINE.subtitle}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── CLASSIFICATION KEY (collapsible) ── */}
      {showKey && (
        <section className="py-8 px-6" style={{ background: navyDeep, borderBottom: `1px solid ${goldDim}33` }}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* HICE Classification */}
              <div>
                <h3
                  className="text-sm font-light uppercase mb-3"
                  style={{ color: gold, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
                >
                  HICE Classification
                </h3>
                {Object.entries(HICE_CLASS).map(([key, desc]) => (
                  <div key={key} className="flex items-start gap-2 mb-2">
                    <span
                      className="inline-block w-6 h-6 text-center text-xs font-bold leading-6 flex-shrink-0"
                      style={{
                        background: hiceColours[key] + "33",
                        color: hiceColours[key],
                        border: `1px solid ${hiceColours[key]}66`,
                      }}
                    >
                      {key}
                    </span>
                    <p className="text-xs" style={{ color: sandMid, lineHeight: 1.6 }}>
                      {desc as string}
                    </p>
                  </div>
                ))}
              </div>

              {/* Word Classes */}
              <div>
                <h3
                  className="text-sm font-light uppercase mb-3"
                  style={{ color: gold, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
                >
                  Word Classes
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {WORD_CLASSES.map((wc: any) => (
                    <div key={wc.code} className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-mono px-1"
                        style={{ color: goldBright, background: goldDim + "33", border: `1px solid ${goldDim}44` }}
                      >
                        {wc.code}
                      </span>
                      <span className="text-xs" style={{ color: sandMid }}>
                        {wc.label}
                      </span>
                    </div>
                  ))}
                </div>

                <h3
                  className="text-sm font-light uppercase mt-4 mb-3"
                  style={{ color: gold, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}
                >
                  Root Origins
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {MORPH_KEY.map((mk: any) => (
                    <div key={mk.code} className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-mono px-1"
                        style={{ color: sandMid, background: navyLight, border: `1px solid ${goldDim}33` }}
                      >
                        {mk.code}
                      </span>
                      <span className="text-xs" style={{ color: sandMid }}>
                        {mk.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SEARCH + FILTERS ── */}
      <div
        className="sticky top-0 z-30 py-3 px-4"
        style={{ background: navyDeep, borderBottom: `1px solid ${goldDim}33` }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Search bar */}
          <div className="flex items-center gap-3 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search terms, etymology, morphology, rationale..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveLetter(null);
                }}
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
              {filtered.length} / {ENTRIES.length}
            </span>
          </div>

          {/* A-Z strip */}
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            <button
              onClick={() => {
                setActiveLetter(null);
                setSearch("");
              }}
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
                onClick={() => {
                  setActiveLetter(letter === activeLetter ? null : letter);
                  setSearch("");
                }}
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
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-1 justify-center">
            {filterButtons.map((fb) => (
              <button
                key={fb.mode}
                onClick={() => setFilterMode(fb.mode === filterMode ? "all" : fb.mode)}
                className="px-2 py-0.5 text-[10px] tracking-wider uppercase transition-colors"
                style={{
                  color: fb.mode === filterMode ? (fb.colour || gold) : sandMid + "88",
                  background: fb.mode === filterMode ? (fb.colour || goldDim) + "22" : "transparent",
                  border: `1px solid ${fb.mode === filterMode ? (fb.colour || goldDim) + "66" : goldDim + "22"}`,
                  fontFamily: "var(--font-display)",
                }}
              >
                {fb.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── LOADING STATE ── */}
      {isLoading && (
        <div className="text-center py-24">
          <div
            className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
            style={{ borderColor: `${gold} transparent ${goldDim} ${goldDim}` }}
          />
          <p className="text-sm" style={{ color: sandMid, fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>
            Loading TECTON from database...
          </p>
        </div>
      )}

      {/* ── ENTRIES ── */}
      {!isLoading && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          {filtered.map((entry) => {
            const isExpanded = expandedTerm === entry.term;
            return (
              <div
                key={entry.term}
                className="mb-4 cursor-pointer"
                style={{
                  borderLeft: `3px solid ${isExpanded ? hiceColours[entry.hice] || gold : goldDim + "44"}`,
                  paddingLeft: "1rem",
                  transition: "border-color 0.2s",
                }}
                onClick={() => setExpandedTerm(isExpanded ? null : entry.term)}
              >
                {/* Header row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className="text-base sm:text-lg font-light"
                    style={{
                      color: isExpanded ? goldBright : sand,
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {entry.term}
                  </h3>

                  {/* HICE badge */}
                  <span
                    className="inline-block w-5 h-5 text-center text-[10px] font-bold leading-5"
                    style={{
                      background: (hiceColours[entry.hice] || goldDim) + "33",
                      color: hiceColours[entry.hice] || goldDim,
                      border: `1px solid ${(hiceColours[entry.hice] || goldDim)}66`,
                    }}
                    title={`HICE: ${entry.hice}`}
                  >
                    {entry.hice}
                  </span>

                  {/* Part of speech tags */}
                  {entry.partOfSpeech.map((pos) => (
                    <span
                      key={pos}
                      className="text-[9px] font-mono px-1 uppercase"
                      style={{
                        color: goldDim,
                        background: goldDim + "15",
                        border: `1px solid ${goldDim}33`,
                      }}
                    >
                      {posLabels[pos] || pos}
                    </span>
                  ))}

                  {/* Root badges */}
                  {entry.roots.map((root) => (
                    <span
                      key={root}
                      className="text-[9px] font-mono px-1"
                      style={{
                        color: sandMid + "aa",
                        background: navyLight,
                        border: `1px solid ${goldDim}22`,
                      }}
                    >
                      {rootLabels[root] || root}
                    </span>
                  ))}
                </div>

                {/* Collapsed: morphology preview */}
                {!isExpanded && (
                  <p className="text-xs mt-1" style={{ color: sandMid + "88" }}>
                    {entry.morphology}
                  </p>
                )}

                {/* Expanded: full linguistic analysis */}
                {isExpanded && (
                  <div className="mt-3 pb-2 space-y-4">
                    {/* Morphology */}
                    <div>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: goldDim, fontFamily: "var(--font-display)" }}
                      >
                        Morphology
                      </p>
                      <p className="text-sm" style={{ color: sand, lineHeight: 1.7 }}>
                        {entry.morphology}
                      </p>
                    </div>

                    {/* Etymology */}
                    <div>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: goldDim, fontFamily: "var(--font-display)" }}
                      >
                        Etymology
                      </p>
                      <p className="text-sm" style={{ color: sand, lineHeight: 1.7, opacity: 0.9 }}>
                        {entry.etymology}
                      </p>
                    </div>

                    {/* Conjugation / Usage */}
                    <div>
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: goldDim, fontFamily: "var(--font-display)" }}
                      >
                        Conjugation & Usage
                      </p>
                      <p className="text-sm" style={{ color: sand, lineHeight: 1.7, opacity: 0.9 }}>
                        {entry.conjugation}
                      </p>
                    </div>

                    {/* Why This Word */}
                    <div
                      className="p-3"
                      style={{ background: navyLight, borderLeft: `2px solid ${hiceColours[entry.hice] || gold}` }}
                    >
                      <p
                        className="text-[10px] tracking-[0.2em] uppercase mb-1"
                        style={{ color: hiceColours[entry.hice] || gold, fontFamily: "var(--font-display)" }}
                      >
                        Why This Word
                      </p>
                      <p className="text-sm italic" style={{ color: sand, lineHeight: 1.7, opacity: 0.95 }}>
                        {entry.whyThisWord}
                      </p>
                    </div>

                    {/* HICE Classification */}
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-6 h-6 text-center text-xs font-bold leading-6"
                        style={{
                          background: (hiceColours[entry.hice] || goldDim) + "33",
                          color: hiceColours[entry.hice] || goldDim,
                          border: `1px solid ${(hiceColours[entry.hice] || goldDim)}66`,
                        }}
                      >
                        {entry.hice}
                      </span>
                      <p className="text-xs" style={{ color: sandMid }}>
                        {HICE_CLASS[entry.hice as keyof typeof HICE_CLASS] || entry.hice}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg" style={{ color: sandMid, fontFamily: "var(--font-display)" }}>
                No entries found for "{search}"
              </p>
              <p className="text-xs mt-2" style={{ color: goldDim }}>
                Try a different search or clear filters
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${goldDim}33` }}>
        <p
          className="text-xs"
          style={{ color: goldDim, letterSpacing: "0.15em", fontFamily: "var(--font-display)" }}
        >
          iAAi HyperAlphaLexicon Britannica TECTON v3.0 — Block 383 — Day 132 — 16 March 2026
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: goldDim + "88", letterSpacing: "0.2em" }}
        >
          Database-Driven · {ENTRIES.length} Live Entries · The Lexicon IS the Infrastructure
        </p>
        <p
          className="text-xs mt-1"
          style={{ color: goldDim + "88", letterSpacing: "0.2em" }}
        >
          Authors: Nigel T. Dearden (Ir. RPE, CEng) & D.A.V.I.D. (AI Co-Author)
        </p>
        <p
          className="text-xs mt-2"
          style={{ color: sandMid, letterSpacing: "0.05em" }}
        >
          FITS → ICUT → IUMC → ISI — The Connected System
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

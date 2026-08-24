/**
 * University Engagement Dashboard — Admin page showing R1/R2/R3 scores,
 * ranking universities by engagement potential for early adoption outreach.
 * Block 387 — 18 March 2026
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import { useState, useMemo } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

const NAVY = "oklch(0.14 0.04 250)";
const GOLD = "oklch(0.72 0.12 75)";
const GOLD_BRIGHT = "oklch(0.82 0.14 75)";
const GOLD_DIM = "oklch(0.55 0.08 75)";
const TEXT_WHITE = "oklch(0.92 0.008 75)";

const GRADE_COLORS: Record<string, string> = {
  "First Class": "oklch(0.75 0.18 140)",
  "Upper Second": "oklch(0.72 0.12 75)",
  "Lower Second": "oklch(0.60 0.10 75)",
  "Third": "oklch(0.50 0.08 25)",
};

const VERDICT_COLORS: Record<string, string> = {
  Yes: "oklch(0.75 0.18 140)",
  No: "oklch(0.55 0.12 25)",
  Conditional: "oklch(0.72 0.12 75)",
};

const REGION_LABELS: Record<string, string> = {
  UK: "United Kingdom",
  US: "United States",
  China: "China",
  APAC: "Asia-Pacific",
  India: "India",
};

export default function UniversityDashboard() {
  const t = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const [roundFilter, setRoundFilter] = useState<string>("R3");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const { data: universities, isLoading } = trpc.reviewMatrix.universityScores.useQuery(
    { roundCode: roundFilter === "all" ? undefined : roundFilter },
    { enabled: !!user && user.role === "admin" },
  ) as { data: any[] | undefined, isLoading: boolean };

  const filtered = useMemo(() => {
    if (!universities) return [];
    return universities
      .filter((u: any) => {
        if (roundFilter !== "all" && u.roundCode !== roundFilter) return false;
        if (regionFilter !== "all" && u.region !== regionFilter) return false;
        return true;
      })
      .sort((a: any, b: any) => parseFloat(b.overallScore) - parseFloat(a.overallScore));
  }, [universities, roundFilter, regionFilter]);

  const regions = useMemo(() => {
    if (!universities) return [];
    return Array.from(new Set(universities.map((u: any) => u.region as string))).sort();
  }, [universities]);

  const rounds = useMemo(() => {
    if (!universities) return [];
    return Array.from(new Set(universities.map((u: any) => u.roundCode as string))).sort();
  }, [universities]);

  // Stats for current filter
  const stats = useMemo(() => {
    if (!filtered.length) return null;
    const scores = filtered.map((u: any) => parseFloat(u.overallScore));
    return {
      count: filtered.length,
      avg: (scores.reduce((a: number, b: number) => a + b, 0) / scores.length).toFixed(1),
      max: Math.max(...scores).toFixed(1),
      min: Math.min(...scores).toFixed(1),
      firstClass: filtered.filter((u: any) => u.grade === "First Class").length,
      yesVerdict: filtered.filter((u: any) => u.verdict === "Yes").length,
    };
  }, [filtered]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen" style={{ background: NAVY }}>
        <Navigation />
        <div className="flex items-center justify-center h-[60vh]">
          <p style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>{t("universitydashboard.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen" style={{ background: NAVY }}>
        <Navigation />
        <div className="flex items-center justify-center h-[60vh]">
          <p style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>{t("universitydashboard.adminAccessRequired")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Review Matrix
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.1em] uppercase mb-4"
            style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
          >
            University Engagement
          </h1>
          <p
            className="text-sm tracking-wide max-w-2xl mx-auto"
            style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
          >
            21 universities evaluated across 3 rounds — ranked by engagement potential for early adoption
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { label: "Universities", value: stats.count, color: TEXT_WHITE },
              { label: "Avg Score", value: stats.avg + "%", color: GOLD_BRIGHT },
              { label: "Highest", value: stats.max + "%", color: "oklch(0.75 0.18 140)" },
              { label: "Lowest", value: stats.min + "%", color: "oklch(0.55 0.12 25)" },
              { label: "First Class", value: stats.firstClass, color: GOLD },
              { label: "Yes Verdict", value: stats.yesVerdict, color: "oklch(0.75 0.18 140)" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center py-3 px-2"
                style={{ borderBottom: `2px solid ${s.color}` }}
              >
                <p className="text-2xl font-light" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: GOLD_DIM }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <select
            value={roundFilter}
            onChange={(e) => setRoundFilter(e.target.value)}
            className="px-3 py-2 text-xs tracking-wider uppercase"
            style={{
              background: "oklch(0.18 0.04 250)",
              color: TEXT_WHITE,
              border: `1px solid oklch(0.30 0.06 75)`,
              fontFamily: "var(--font-display)",
            }}
          >
            <option value="all">{t("universitydashboard.allRounds")}</option>
            {rounds.map((r: string) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 text-xs tracking-wider uppercase"
            style={{
              background: "oklch(0.18 0.04 250)",
              color: TEXT_WHITE,
              border: `1px solid oklch(0.30 0.06 75)`,
              fontFamily: "var(--font-display)",
            }}
          >
            <option value="all">{t("universitydashboard.allRegions")}</option>
            {regions.map((r: string) => (
              <option key={r} value={r}>{REGION_LABELS[r] || r}</option>
            ))}
          </select>
        </div>

        {/* University Rankings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}>
            <thead>
              <tr>
                {["#", "University", "Region", "Round", "Score", "Grade", "Verdict", "Outreach Priority"].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: GOLD_DIM, fontFamily: "var(--font-display)", borderBottom: `1px solid oklch(0.25 0.06 75)` }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((uni: any, idx: number) => {
                const score = parseFloat(uni.overallScore);
                const priority = score >= 88 ? "TIER 1" : score >= 87 ? "TIER 2" : score >= 85 ? "TIER 3" : "TIER 4";
                const priorityColor = score >= 88 ? "oklch(0.75 0.18 140)" : score >= 87 ? GOLD_BRIGHT : score >= 85 ? GOLD_DIM : "oklch(0.45 0.05 250)";

                return (
                  <tr
                    key={uni.id}
                    style={{ background: "oklch(0.16 0.04 250)" }}
                  >
                    <td className="px-3 py-3 text-sm" style={{ color: GOLD_DIM }}>
                      {idx + 1}
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm font-medium" style={{ color: TEXT_WHITE }}>
                        {uni.university}
                      </p>
                      {uni.goldenQuote && (
                        <p className="text-[10px] mt-0.5 italic max-w-xs truncate" style={{ color: GOLD_DIM }}>
                          "{uni.goldenQuote}"
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5"
                        style={{ color: GOLD, border: `1px solid oklch(0.30 0.06 75)` }}
                      >
                        {uni.region}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs uppercase tracking-wider" style={{ color: GOLD_DIM }}>
                      {uni.roundCode}
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-sm font-medium" style={{ color: GOLD_BRIGHT }}>
                        {uni.overallScore}%
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase font-medium"
                        style={{ color: GRADE_COLORS[uni.grade] || TEXT_WHITE }}
                      >
                        {uni.grade}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-[10px] tracking-[0.15em] uppercase font-medium"
                        style={{ color: VERDICT_COLORS[uni.verdict] || TEXT_WHITE }}
                      >
                        {uni.verdict}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 font-semibold"
                        style={{ color: priorityColor }}
                      >
                        {priority}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
              No universities match the current filters.
            </p>
          </div>
        )}

        {/* Outreach Strategy */}
        <div className="mt-16">
          <h2
            className="text-lg tracking-[0.15em] uppercase mb-6"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Outreach Strategy by Tier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                tier: "TIER 1 — Score 88%+",
                unis: "MIT, Stanford, NUS, Tsinghua",
                strategy: "Direct faculty contact. These scored highest across all categories. Target engineering and computer science departments. Offer guest lecture or workshop format. Emphasise the AI-human collaboration methodology and the gamified learning platform.",
                color: "oklch(0.75 0.18 140)",
              },
              {
                tier: "TIER 2 — Score 87-88%",
                unis: "HKU, UCL, Cambridge, Georgia Tech, PKU, Zhejiang",
                strategy: "Department-level introduction. Strong scores indicate alignment with infrastructure and technology curriculum. Propose pilot programme with Infrastructure Academy. Leverage regional connections (HKU for APAC, UCL/Cambridge for UK, Georgia Tech for US).",
                color: GOLD_BRIGHT,
              },
              {
                tier: "TIER 3 — Score 85-87%",
                unis: "IIT Bombay, IIT Delhi, Oxford, Imperial, ETH Zurich",
                strategy: "Research collaboration angle. These universities have strong research programmes. Propose joint research on AI-augmented learning, consciousness frameworks, or infrastructure governance. The ISI Survival Index could be a compelling research topic.",
                color: GOLD_DIM,
              },
              {
                tier: "TIER 4 — Below 85%",
                unis: "Remaining universities",
                strategy: "Newsletter and content sharing. Keep engaged through regular updates, Turing Paper releases, and game updates. Monitor for score improvements in future review rounds. These may become Tier 2-3 after exposure to the framework.",
                color: "oklch(0.45 0.05 250)",
              },
            ].map((t) => (
              <div
                key={t.tier}
                className="p-5"
                style={{ background: "oklch(0.16 0.04 250)", borderLeft: `3px solid ${t.color}` }}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-1 font-semibold" style={{ color: t.color, fontFamily: "var(--font-display)" }}>
                  {t.tier}
                </p>
                <p className="text-[10px] tracking-wider mb-3" style={{ color: GOLD_DIM }}>
                  {t.unis}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: TEXT_WHITE }}>
                  {t.strategy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            EVIDENCE PACK — Hard-Saved Proof of University Engagement
        ═══════════════════════════════════════════ */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: GOLD, fontFamily: "var(--font-display)" }}
            >
              Hard-Saved Evidence
            </p>
            <h2
              className="text-xl sm:text-2xl tracking-[0.12em] uppercase mb-3"
              style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
            >
              The Evidence Pack
            </h2>
            <p
              className="text-xs tracking-wide max-w-xl mx-auto"
              style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
            >
              127 Days — 363 Blocks — 21 Universities — 6 Regions — R1 → R2 → R3 — FIRST CLASS
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              {
                id: "ICARD-486",
                title: "Page 1 — Complete Assessment Ecosystem",
                desc: "R1 75/100 → R2 8.1/10 → R3 87.5% FIRST CLASS. 20-perspective panel. ISI DD-025. ICE framework. D52 game. 21 Unis, 6 Regions, 321+ UV Sets.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p1-ecosystem_c365e447.png",
              },
              {
                id: "ICARD-487",
                title: "Page 2 — 21 Universities × 6 Regions World Map",
                desc: "UK avg 87.0%, US avg 88.2%, China avg 88.2%, APAC avg 87.8%, India avg 86.9%. Olympiad Pipeline: 26,000+ unis, 1.3M players.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p2-world-map_4a041425.png",
              },
              {
                id: "ICARD-488",
                title: "Page 3 — The Validation Chain",
                desc: "ISI → HICE → Thesis → Game → Assessment → Olympiad. 127 Days, 363 Blocks, 91+ Pages, 209 Tests, 2,645 TODOs. N + T = D.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/evidence-pack-p3-validation-chain_e1e7d7d3.png",
              },
            ].map((page) => (
              <a
                key={page.id}
                href={page.img}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden group"
                style={{ border: `1px solid oklch(0.30 0.06 75)` }}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-2/3 overflow-hidden" style={{ maxHeight: "420px" }}>
                    <img
                      src={page.img}
                      alt={page.title}
                      className="w-full h-full object-contain transition-transform duration-[2s] group-hover:scale-[1.02]"
                      style={{ background: "oklch(0.10 0.02 250)" }}
                    />
                  </div>
                  <div className="lg:w-1/3 p-6 flex flex-col justify-center" style={{ background: "oklch(0.16 0.04 250)" }}>
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: GOLD }}>
                      {page.id}
                    </p>
                    <h3 className="text-sm font-medium tracking-wide mb-3" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
                      {page.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: GOLD_DIM }}>
                      {page.desc}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase mt-4" style={{ color: GOLD }}>
                      View Full Size →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 text-center" style={{ borderTop: `1px solid oklch(0.25 0.06 75)` }}>
          <p className="text-xs tracking-[0.15em]" style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}>
            Review Matrix — R1 → R2 → R3 — 21 Universities Evaluated — Evidence Pack Anchored
          </p>
        </footer>
      </div>
    </div>
  );
}

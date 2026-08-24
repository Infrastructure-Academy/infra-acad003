/**
 * Review Matrix — R1/R2/R3 Combined Panel Data
 * Database-backed, with CSV export.
 * Dark void background, gold/amber accents — consistent with site aesthetic.
 * v2: Full grading resolution — UK Banda, US GPA, India CGPA, APAC, China
 */
import { useTranslation } from "@/contexts/LanguageContext";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileSpreadsheet } from "lucide-react";

type RoundCode = "R1" | "R2" | "R3" | "ALL";

const FONT = { fontFamily: "var(--font-display)" };
const GOLD = "oklch(0.72_0.12_75)";
const LIGHT = "oklch(0.92_0.008_75)";
const MID = "oklch(0.60_0.02_75)";
const DIM = "oklch(0.50_0.03_200)";
const DARK_BG = "oklch(0.18_0.04_250)";

export default function ReviewMatrix() {
  const t = useTranslation();
  const [activeRound, setActiveRound] = useState<RoundCode>("ALL");
  const [expandedRound, setExpandedRound] = useState<string | null>(null);

  const { data, isLoading } = trpc.reviewMatrix.fullMatrix.useQuery();

  const filteredUniScores = useMemo(() => {
    if (!data) return [];
    if (activeRound === "ALL") return data.universityScores;
    return data.universityScores.filter((s: any) => s.roundCode === activeRound);
  }, [data, activeRound]);

  const filteredCatScores = useMemo(() => {
    if (!data) return [];
    if (activeRound === "ALL") return data.categoryScores;
    return data.categoryScores.filter((s: any) => s.roundCode === activeRound);
  }, [data, activeRound]);

  const filteredPkgScores = useMemo(() => {
    if (!data) return [];
    if (activeRound === "ALL") return data.packageScores;
    return data.packageScores.filter((s: any) => s.roundCode === activeRound);
  }, [data, activeRound]);

  // CSV export with grading resolution
  const handleExport = () => {
    if (!data) return;

    let csv = "IAAI REVIEW MATRIX — R1/R2/R3 COMBINED DATA (v2 — Full Grading Resolution)\n\n";

    csv += "ROUND SUMMARY\n";
    csv += "Round,Name,Date,Panel Size,Overall Score,Classification,UK Banda,US GPA,India CGPA,APAC Grade,China Grade,Verdict\n";
    for (const r of data.rounds as any[]) {
      csv += `${r.roundCode},"${r.roundName}",${r.roundDate},${r.panelSize},${r.overallScore},"${r.classification}","${r.ukBanda || ""}","${r.usGpa || ""}","${r.indiaCgpa || ""}","${r.apacGrade || ""}","${r.chinaGrade || ""}",${r.verdict}\n`;
    }

    csv += "\nUNIVERSITY SCORES\n";
    csv += "Round,University,Region,Score,Grade,UK Banda,US GPA,India CGPA,APAC,China,Verdict,Golden Quote\n";
    for (const u of data.universityScores as any[]) {
      csv += `${u.roundCode},"${u.university}",${u.region},${u.overallScore},"${u.grade || ""}","${u.ukBanda || ""}","${u.usGpa || ""}","${u.indiaCgpa || ""}","${u.apacGrade || ""}","${u.chinaGrade || ""}",${u.verdict},"${u.goldenQuote || ""}"\n`;
    }

    csv += "\nCATEGORY SCORES\n";
    csv += "Round,Category,Score,Delta,Notes\n";
    for (const c of data.categoryScores as any[]) {
      csv += `${c.roundCode},"${c.category}",${c.score},${c.delta || ""},"${c.notes || ""}"\n`;
    }

    csv += "\nPACKAGE SCORES (R1)\n";
    csv += "Round,Package,Category,Score,Notes\n";
    for (const p of data.packageScores as any[]) {
      csv += `${p.roundCode},"${p.packageName}","${p.category}",${p.score},"${p.notes || ""}"\n`;
    }

    csv += "\nGRADING KEY\n";
    csv += "% Range,UK Banda,US GPA,India CGPA,APAC Grade,China Grade\n";
    csv += "85-100,First Class (1st),4.0,9.0-10.0,A+/S,Outstanding\n";
    csv += "70-84,Upper Second (2:1),3.3-3.7,7.5-8.9,A/A-,Excellent/Good\n";
    csv += "60-69,Lower Second (2:2),3.0,6.5-7.4,B+/B,Satisfactory\n";
    csv += "50-59,Third Class,2.0-2.7,5.0-6.4,C+/C,Pass\n";
    csv += "<50,Fail,<2.0,<5.0,D/F,Fail\n";

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IAAI_Review_Matrix_R1_R2_R3_v2.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-[80vh]">
          <div className={`text-[${GOLD}] tracking-[0.3em] uppercase text-sm animate-pulse`} style={FONT}>
            Loading Review Matrix...
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center h-[80vh]">
          <div className={`text-[${DIM}]`}>{t("reviewmatrix.noReviewDataAvailable")}</div>
        </div>
      </div>
    );
  }

  const TH = ({ children, align = "left" }: { children: React.ReactNode; align?: string }) => (
    <th className={`text-${align} py-3 px-2 text-[oklch(0.72_0.12_75)] tracking-wider uppercase text-xs font-light whitespace-nowrap`} style={FONT}>
      {children}
    </th>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.4em] uppercase font-light mb-4" style={FONT}>
            Permanent Thesis Record
          </p>
          <h1 className="text-3xl sm:text-5xl font-light tracking-[0.1em] uppercase text-[oklch(0.92_0.008_75)] mb-4" style={FONT}>
            Review Matrix
          </h1>
          <p className="text-base text-[oklch(0.55_0.04_200)] tracking-wide max-w-2xl mx-auto mb-2" style={FONT}>
            R1 &mdash; R2 &mdash; R3 Combined Panel Data &mdash; Database-Anchored
          </p>
          <p className="text-xs text-[oklch(0.45_0.03_200)] tracking-wider mb-8" style={FONT}>
            v2 &mdash; Full Grading Resolution: UK Banda &bull; US GPA &bull; India CGPA &bull; APAC &bull; China
          </p>

          {/* Cross-link to Infrastructure Academy — SINGLE SOURCE OF TRUTH */}
          <a
            href="https://infra-acad-kuqzaex2.manus.space/pages/assessment-results.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-6 px-6 py-2 border border-[oklch(0.50_0.08_75/0.5)] text-[oklch(0.65_0.08_75)] text-[10px] tracking-[0.2em] uppercase font-light hover:bg-[oklch(0.72_0.12_75/0.08)] hover:border-[oklch(0.72_0.12_75)] transition-colors"
            style={FONT}
          >
            Full Master Table (21 unis &times; 3 rounds) &rarr; Infrastructure Academy
          </a>

          <div className="block">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-[oklch(0.72_0.12_75)] text-[oklch(0.72_0.12_75)] hover:bg-[oklch(0.72_0.12_75/0.1)] tracking-wider uppercase text-xs"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV (v2)
          </Button>
          </div>
        </div>
      </section>

      {/* Round Filter Tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto flex justify-center gap-2 flex-wrap">
          {(["ALL", "R1", "R2", "R3"] as RoundCode[]).map((code) => (
            <button
              key={code}
              onClick={() => setActiveRound(code)}
              className={`px-6 py-2 text-xs tracking-[0.2em] uppercase font-light border transition-colors ${
                activeRound === code
                  ? "bg-[oklch(0.72_0.12_75)] text-[oklch(0.14_0.04_250)] border-[oklch(0.72_0.12_75)]"
                  : "border-[oklch(0.30_0.06_75)] text-[oklch(0.60_0.02_75)] hover:border-[oklch(0.72_0.12_75)] hover:text-[oklch(0.72_0.12_75)]"
              }`}
              style={FONT}
            >
              {code === "ALL" ? "All Rounds" : code}
            </button>
          ))}
        </div>
      </section>

      {/* Round Summary Cards — with grading resolution */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
            Round Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(data.rounds as any[]).map((round) => (
              <div
                key={round.roundCode}
                className={`border p-6 ${
                  activeRound === round.roundCode || activeRound === "ALL"
                    ? "border-[oklch(0.72_0.12_75/0.5)] bg-[oklch(0.18_0.04_250)]"
                    : "border-[oklch(0.25_0.03_250)] bg-[oklch(0.16_0.03_250)] opacity-50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-2xl font-light text-[oklch(0.72_0.12_75)]" style={FONT}>
                    {round.roundCode}
                  </span>
                  <span className="text-xs text-[oklch(0.50_0.03_200)] tracking-wider">{round.roundDate}</span>
                </div>
                <p className="text-sm text-[oklch(0.80_0.01_75)] mb-2" style={FONT}>
                  {round.roundName}
                </p>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-2xl font-light text-[oklch(0.92_0.008_75)]">{round.overallScore}</p>
                    <p className="text-xs text-[oklch(0.60_0.02_75)] tracking-wider uppercase">{round.classification}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[oklch(0.72_0.12_75)]">{round.panelSize} reviewers</p>
                    <p className="text-xs text-[oklch(0.50_0.03_200)]">{round.verdict}</p>
                  </div>
                </div>

                {/* Grading Resolution Row */}
                {round.ukBanda && (
                  <div className="mt-4 pt-3 border-t border-[oklch(0.25_0.03_250)]">
                    <p className="text-[10px] text-[oklch(0.55_0.08_75)] tracking-[0.2em] uppercase mb-2" style={FONT}>{t("reviewmatrix.gradingResolution")}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <span className="text-[oklch(0.50_0.03_200)]">{t("reviewmatrix.ukBanda")}</span>
                      <span className="text-[oklch(0.85_0.01_75)]">{round.ukBanda}</span>
                      <span className="text-[oklch(0.50_0.03_200)]">{t("reviewmatrix.usGpa")}</span>
                      <span className="text-[oklch(0.85_0.01_75)]">{round.usGpa}</span>
                      <span className="text-[oklch(0.50_0.03_200)]">{t("reviewmatrix.indiaCgpa")}</span>
                      <span className="text-[oklch(0.85_0.01_75)]">{round.indiaCgpa}</span>
                      <span className="text-[oklch(0.50_0.03_200)]">{t("reviewmatrix.apac")}</span>
                      <span className="text-[oklch(0.85_0.01_75)]">{round.apacGrade}</span>
                      <span className="text-[oklch(0.50_0.03_200)]">{t("reviewmatrix.china")}</span>
                      <span className="text-[oklch(0.85_0.01_75)]">{round.chinaGrade}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setExpandedRound(expandedRound === round.roundCode ? null : round.roundCode)}
                  className="mt-3 text-xs text-[oklch(0.55_0.08_75)] tracking-wider flex items-center gap-1 hover:text-[oklch(0.72_0.12_75)]"
                >
                  Methodology {expandedRound === round.roundCode ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                {expandedRound === round.roundCode && (
                  <p className="mt-2 text-xs text-[oklch(0.50_0.03_200)] leading-relaxed">{round.methodology}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Scores Table — with grading columns */}
      {filteredUniScores.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
              University Scores ({filteredUniScores.length} entries)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[oklch(0.30_0.06_75)]">
                    <TH>{t("reviewmatrix.round")}</TH>
                    <TH>{t("reviewmatrix.university")}</TH>
                    <TH>{t("reviewmatrix.region")}</TH>
                    <TH align="right">{t("reviewmatrix.score")}</TH>
                    <TH>{t("reviewmatrix.ukBanda2")}</TH>
                    <TH align="right">{t("reviewmatrix.usGpa2")}</TH>
                    <TH align="right">{t("reviewmatrix.indiaCgpa2")}</TH>
                    <TH>{t("reviewmatrix.apac2")}</TH>
                    <TH>{t("reviewmatrix.china2")}</TH>
                    <TH>{t("reviewmatrix.verdict")}</TH>
                  </tr>
                </thead>
                <tbody>
                  {(filteredUniScores as any[]).map((u, i) => (
                    <tr key={i} className={`border-b border-[oklch(0.22_0.03_250)] hover:bg-[oklch(0.18_0.04_250)] ${
                      u.university === "Cambridge" ? "bg-[oklch(0.20_0.06_75/0.15)]" : ""
                    }`}>
                      <td className="py-3 px-2 text-[oklch(0.55_0.08_75)] font-light">{u.roundCode}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">
                        {u.university}
                        {u.goldenQuote && (
                          <p className="text-xs text-[oklch(0.55_0.08_75)] italic mt-1">&ldquo;{u.goldenQuote}&rdquo;</p>
                        )}
                      </td>
                      <td className="py-3 px-2 text-[oklch(0.60_0.02_200)]">{u.region}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.92_0.008_75)] font-light text-base">{u.overallScore}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)] text-xs">{u.ukBanda || "—"}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.85_0.01_75)] text-xs">{u.usGpa || "—"}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.85_0.01_75)] text-xs">{u.indiaCgpa || "—"}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)] text-xs">{u.apacGrade || "—"}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)] text-xs">{u.chinaGrade || "—"}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs tracking-wider uppercase px-2 py-1 ${
                          u.verdict === "Yes" ? "text-[oklch(0.72_0.15_145)] bg-[oklch(0.72_0.15_145/0.1)]" :
                          u.verdict === "Conditional" ? "text-[oklch(0.72_0.12_75)] bg-[oklch(0.72_0.12_75/0.1)]" :
                          "text-[oklch(0.50_0.03_200)]"
                        }`}>
                          {u.verdict}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Grading Key */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
            Cross-Regional Grading Key
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(0.30_0.06_75)]">
                  <TH>% Range</TH>
                  <TH>{t("reviewmatrix.ukBanda3")}</TH>
                  <TH>{t("reviewmatrix.usGpa3")}</TH>
                  <TH>{t("reviewmatrix.indiaCgpa3")}</TH>
                  <TH>{t("reviewmatrix.apac3")}</TH>
                  <TH>{t("reviewmatrix.china3")}</TH>
                </tr>
              </thead>
              <tbody>
                {[
                  { range: "85–100", uk: "First Class (1st)", us: "4.0", india: "9.0–10.0", apac: "A+ / S", china: "Outstanding", highlight: false },
                  { range: "70–84", uk: "Upper Second (2:1)", us: "3.3–3.7", india: "7.5–8.9", apac: "A / A-", china: "Excellent / Good", highlight: true },
                  { range: "60–69", uk: "Lower Second (2:2)", us: "3.0", india: "6.5–7.4", apac: "B+ / B", china: "Satisfactory", highlight: false },
                  { range: "50–59", uk: "Third Class", us: "2.0–2.7", india: "5.0–6.4", apac: "C+ / C", china: "Pass", highlight: false },
                  { range: "<50", uk: "Fail", us: "<2.0", india: "<5.0", apac: "D / F", china: "Fail", highlight: false },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-[oklch(0.22_0.03_250)] ${row.highlight ? "bg-[oklch(0.20_0.06_75/0.12)]" : "hover:bg-[oklch(0.18_0.04_250)]"}`}>
                    <td className={`py-3 px-2 ${row.highlight ? "text-[oklch(0.72_0.12_75)] font-medium" : "text-[oklch(0.85_0.01_75)]"}`}>{row.range}</td>
                    <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{row.uk}</td>
                    <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{row.us}</td>
                    <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{row.india}</td>
                    <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{row.apac}</td>
                    <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{row.china}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-[oklch(0.45_0.03_200)] italic" style={FONT}>
              R3 position: 87.5% &mdash; First Class / GPA 4.0 / CGPA 8.7–8.8 / A-S APAC / Excellent China
            </p>
          </div>
        </div>
      </section>

      {/* Category Scores Table */}
      {filteredCatScores.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
              Category Scores
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[oklch(0.30_0.06_75)]">
                    <TH>{t("reviewmatrix.round2")}</TH>
                    <TH>{t("reviewmatrix.category")}</TH>
                    <TH align="right">{t("reviewmatrix.score2")}</TH>
                    <TH align="right">{t("reviewmatrix.delta")}</TH>
                    <TH>{t("reviewmatrix.notes")}</TH>
                  </tr>
                </thead>
                <tbody>
                  {(filteredCatScores as any[]).map((c, i) => (
                    <tr key={i} className="border-b border-[oklch(0.22_0.03_250)] hover:bg-[oklch(0.18_0.04_250)]">
                      <td className="py-3 px-2 text-[oklch(0.55_0.08_75)] font-light">{c.roundCode}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{c.category}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.92_0.008_75)] font-light text-base">{c.score}</td>
                      <td className="py-3 px-2 text-right">
                        {c.delta && (
                          <span className={c.delta.startsWith("+") ? "text-[oklch(0.72_0.15_145)]" : c.delta.startsWith("-") ? "text-[oklch(0.65_0.20_25)]" : "text-[oklch(0.50_0.03_200)]"}>
                            {c.delta}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-[oklch(0.50_0.03_200)] text-xs">{c.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Package Scores (R1 only) */}
      {filteredPkgScores.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
              R1 Package Scores &mdash; ICE Assessment Detail
            </h2>
            {["Freeform Explorer", "Guided Campaign", "Academic Programme"].map((pkg) => {
              const pkgRows = (filteredPkgScores as any[]).filter((p) => p.packageName === pkg);
              if (pkgRows.length === 0) return null;
              return (
                <div key={pkg} className="mb-8">
                  <h3 className="text-sm text-[oklch(0.72_0.12_75)] tracking-[0.15em] uppercase font-light mb-3" style={FONT}>
                    {pkg}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[oklch(0.30_0.06_75)]">
                          <th className="text-left py-2 px-2 text-[oklch(0.60_0.02_75)] tracking-wider uppercase text-xs font-light">{t("reviewmatrix.category2")}</th>
                          <th className="text-right py-2 px-2 text-[oklch(0.60_0.02_75)] tracking-wider uppercase text-xs font-light">{t("reviewmatrix.score3")}</th>
                          <th className="text-left py-2 px-2 text-[oklch(0.60_0.02_75)] tracking-wider uppercase text-xs font-light">{t("reviewmatrix.notes2")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pkgRows.map((p: any, i: number) => (
                          <tr key={i} className={`border-b border-[oklch(0.22_0.03_250)] ${p.category === "WEIGHTED TOTAL" ? "bg-[oklch(0.20_0.04_250)]" : "hover:bg-[oklch(0.18_0.04_250)]"}`}>
                            <td className={`py-2 px-2 ${p.category === "WEIGHTED TOTAL" ? "text-[oklch(0.72_0.12_75)] font-medium" : "text-[oklch(0.85_0.01_75)]"}`}>{p.category}</td>
                            <td className={`py-2 px-2 text-right ${p.category === "WEIGHTED TOTAL" ? "text-[oklch(0.72_0.12_75)] text-lg font-light" : "text-[oklch(0.92_0.008_75)]"}`}>{p.score}</td>
                            <td className="py-2 px-2 text-[oklch(0.50_0.03_200)] text-xs">{p.notes || ""}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Trajectory Summary */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[oklch(0.72_0.12_75/0.3)] p-8 bg-[oklch(0.16_0.03_250)]">
            <h2 className="text-lg text-[oklch(0.72_0.12_75)] tracking-[0.2em] uppercase font-light mb-6" style={FONT}>
              The Trajectory
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[oklch(0.30_0.06_75)]">
                    <TH>{t("reviewmatrix.round3")}</TH>
                    <TH>{t("reviewmatrix.date")}</TH>
                    <TH align="right">{t("reviewmatrix.score4")}</TH>
                    <TH>{t("reviewmatrix.ukBanda4")}</TH>
                    <TH align="right">{t("reviewmatrix.usGpa4")}</TH>
                    <TH>{t("reviewmatrix.classification")}</TH>
                    <TH>{t("reviewmatrix.verdict2")}</TH>
                    <TH align="right">{t("reviewmatrix.panel")}</TH>
                  </tr>
                </thead>
                <tbody>
                  {(data.rounds as any[]).map((r) => (
                    <tr key={r.roundCode} className="border-b border-[oklch(0.22_0.03_250)]">
                      <td className="py-3 px-2 text-[oklch(0.72_0.12_75)] font-light text-base">{r.roundCode}</td>
                      <td className="py-3 px-2 text-[oklch(0.60_0.02_200)]">{r.roundDate}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.92_0.008_75)] font-light text-lg">{r.overallScore}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{r.ukBanda || "—"}</td>
                      <td className="py-3 px-2 text-right text-[oklch(0.85_0.01_75)]">{r.usGpa || "—"}</td>
                      <td className="py-3 px-2 text-[oklch(0.85_0.01_75)]">{r.classification}</td>
                      <td className="py-3 px-2">
                        <span className={`text-xs tracking-wider uppercase px-2 py-1 ${
                          r.verdict === "GO" ? "text-[oklch(0.72_0.15_145)] bg-[oklch(0.72_0.15_145/0.1)]" :
                          "text-[oklch(0.72_0.12_75)] bg-[oklch(0.72_0.12_75/0.1)]"
                        }`}>
                          {r.verdict}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-[oklch(0.60_0.02_200)]">{r.panelSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-xs text-[oklch(0.45_0.03_200)] tracking-wider italic" style={FONT}>
              Data sourced from IAAI DD documents, live JSON files, and corrected R3 academic audit. All records database-anchored. v2 grading resolution applied.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[oklch(0.25_0.06_75)]">
        <p className="text-sm text-[oklch(0.40_0.02_240)] tracking-[0.15em] font-light" style={FONT}>
          MAN thru US &mdash; Manus AI &times; Nigel Dearden
        </p>
        <p className="text-xs text-[oklch(0.30_0.02_240)] mt-2 tracking-widest uppercase" style={FONT}>
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}

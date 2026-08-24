/**
 * Jigsaw — TP-048 The Jigsaw Thesis
 * Block 401 — 22 March 2026
 *
 * Dedicated page rendering the full Turing Paper TP-048:
 * "Gap Management as Leverage — How 2% of the Picture Controls 100% of the Outcome"
 * Includes Marillion "Jigsaw" (Fugazi, 1984) musical reference and audio link.
 *
 * Colour: dark canvas, gold/amber accents, structural clarity.
 * Typography: Cormorant Garamond display, Source Sans 3 body.
 */
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { useMemo } from "react";

const gold = "#d4a843";
const goldBright = "#e8c55a";
const sand = "#f0eadc";
const sandDim = "rgba(240,234,220,0.6)";
const sandFaint = "rgba(240,234,220,0.35)";
const navy = "#0b1a33";
const navyDeep = "#081422";
const navyLight = "#0f2240";
const green = "#22c55e";
const red = "#ef4444";

const ICARD_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/icard-tp048-jigsaw-thesis-v4-RTtB2HdYBRkJhVdtqf5cKc.png";

/* ── Puzzle gap data ── */
const CONVERGENCE_DATA = [
  { pieces: 4, grid: "2×2", joints: 4, gapPct: 2.0, leverage: 50.0 },
  { pieces: 9, grid: "3×3", joints: 12, gapPct: 2.67, leverage: 37.5 },
  { pieces: 16, grid: "4×4", joints: 24, gapPct: 3.0, leverage: 33.3 },
  { pieces: 25, grid: "5×5", joints: 40, gapPct: 3.2, leverage: 31.2 },
  { pieces: 100, grid: "10×10", joints: 180, gapPct: 3.6, leverage: 27.8 },
  { pieces: 225, grid: "15×15", joints: 420, gapPct: 3.73, leverage: 26.8 },
  { pieces: 500, grid: "20×25", joints: 955, gapPct: 3.82, leverage: 26.2 },
  { pieces: 1000, grid: "25×40", joints: 1935, gapPct: 3.87, leverage: 25.8 },
  { pieces: 1500, grid: "30×50", joints: 2920, gapPct: 3.89, leverage: 25.7 },
];

const CROSS_DOMAIN = [
  { domain: "Jigsaw (4-piece)", gap: "Physical gap", pct: "2.0%", leverage: "50×", product: "100%" },
  { domain: "Jigsaw (1,000-piece)", gap: "Physical gap", pct: "3.9%", leverage: "26×", product: "100%" },
  { domain: "Masonry", gap: "Mortar joints", pct: "~20%", leverage: "~5×", product: "100%" },
  { domain: "Bridge deck", gap: "Expansion joints", pct: "~0.03%", leverage: "~3,300×", product: "100%" },
  { domain: "Concrete pavement", gap: "Control joints", pct: "~0.15%", leverage: "~670×", product: "100%" },
  { domain: "Pareto (management)", gap: "Critical 20%", pct: "20%", leverage: "4× (80/20)", product: "80%" },
  { domain: "Dearden (iAAi)", gap: "Management interface", pct: "2%", leverage: "50×", product: "100%" },
];

export default function Jigsaw() {
  return (
    <div className="min-h-screen" style={{ background: navyDeep }}>
      <Navigation />

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 px-6 text-center">
        <p
          className="text-xs tracking-[0.4em] uppercase font-light mb-4"
          style={{ color: gold, fontFamily: "var(--font-display)" }}
        >
          TURING PAPER TP-048 — BLOCK 400
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] uppercase mb-4"
          style={{ color: sand, fontFamily: "var(--font-display)" }}
        >
          The Jigsaw Thesis
        </h1>
        <p
          className="text-base sm:text-lg font-light max-w-3xl mx-auto mb-2"
          style={{ color: sandDim, fontFamily: "var(--font-display)" }}
        >
          Gap Management as Leverage — How 2% of the Picture Controls 100% of the Outcome
        </p>
        <p
          className="text-sm font-light"
          style={{ color: sandFaint, fontFamily: "var(--font-display)" }}
        >
          Ir. Nigel T. Dearden, CEng MICE — with DAVID
        </p>
        <div className="w-20 h-px mx-auto mt-8" style={{ background: `linear-gradient(to right, transparent, ${gold}, transparent)` }} />
      </section>

      {/* ── DEARDEN'S FORMULATION ── */}
      <section className="px-6 pb-16">
        <div
          className="max-w-3xl mx-auto text-center py-10 px-8"
          style={{ background: navyLight, border: `2px solid ${gold}` }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: gold, fontFamily: "var(--font-display)" }}
          >
            DEARDEN'S FORMULATION
          </p>
          <p
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.1em]"
            style={{ color: goldBright, fontFamily: "var(--font-display)" }}
          >
            2% × 50 = 100%
          </p>
          <p
            className="text-sm font-light mt-4"
            style={{ color: sandDim }}
          >
            Manage the gaps. Master the whole. The 2% is the 100%.
          </p>
        </div>
      </section>

      {/* ── MUSICAL CATALYST ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="1" title="The Musical Catalyst" />

          <blockquote
            className="my-6 pl-6 py-4"
            style={{ borderLeft: `3px solid ${gold}`, background: "rgba(212,168,67,0.05)" }}
          >
            <p
              className="text-base sm:text-lg italic font-light leading-relaxed"
              style={{ color: sand, fontFamily: "var(--font-display)" }}
            >
              "We are jigsaw pieces aligned on the perimeter edge<br />
              Interlocked through a missing piece"
            </p>
            <p className="text-xs mt-3" style={{ color: sandFaint }}>
              — Fish (Derek Dick), <em>Jigsaw</em>, Marillion, <em>Fugazi</em> (1984)
            </p>
          </blockquote>

          <BodyText>
            Marillion's "Jigsaw" is the third track on their second studio album <em>Fugazi</em>, released 12 March 1984. Written by Fish, Mark Kelly, Steve Rothery, Pete Trewavas, and Andy Mosley, the song runs 6 minutes 51 seconds and uses the jigsaw puzzle as an extended metaphor for a relationship that repeatedly breaks apart and reassembles — each time with fewer pieces, each time with wider gaps.
          </BodyText>

          <BodyText>
            Fish himself described the metaphor with characteristic precision:
          </BodyText>

          <blockquote
            className="my-6 pl-6 py-4"
            style={{ borderLeft: `3px solid ${gold}`, background: "rgba(212,168,67,0.05)" }}
          >
            <p
              className="text-sm font-light leading-relaxed italic"
              style={{ color: sand }}
            >
              "When you watch kids doing jigsaws, they'll always take the eye of the koala bear or whatever and sit on it, just for the dominating factor of putting the last bit in. You get to the point where you lie about the last piece, you deny that you've got it. The other person is aware that you're lying and they hold back four or five pieces so that you can't put in the last piece. Eventually you tear up the jigsaw and say 'We'll do it another day'. That can grow into relationships — where no matter how important that piece is to the other person or the relationship. In general, the song is about the relationship that splits up and forever comes together again. It gets worse because each time it comes back together, more pieces of the jigsaw have got lost, and you can't get them back."
            </p>
            <p className="text-xs mt-3" style={{ color: sandFaint }}>
              — Fish (Derek Dick), Marillion
            </p>
          </blockquote>

          <BodyText>
            The critical insight for this paper lies in the opening couplet: the pieces are "interlocked through a missing piece." The connection between two puzzle pieces is defined not by the pieces themselves but by the gap — the negative space, the joint, the interlock. Fish understood intuitively what civil engineers know professionally: <strong style={{ color: goldBright }}>the joint is the structure.</strong>
          </BodyText>

          {/* Audio link */}
          <div
            className="mt-8 p-4 flex items-center gap-4"
            style={{ background: "rgba(212,168,67,0.08)", border: `1px solid rgba(212,168,67,0.2)` }}
          >
            <span className="text-2xl">🎵</span>
            <div>
              <p className="text-sm font-light" style={{ color: sand }}>
                <strong>Listen:</strong> Marillion — "Jigsaw" (<em>Fugazi</em>, 1984)
              </p>
              <a
                href="https://www.youtube.com/results?search_query=marillion+jigsaw+fugazi+1984"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:underline"
                style={{ color: gold }}
              >
                Search on YouTube →
              </a>
              <span className="text-xs mx-2" style={{ color: sandFaint }}>|</span>
              <a
                href="https://open.spotify.com/search/marillion%20jigsaw%20fugazi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:underline"
                style={{ color: gold }}
              >
                Search on Spotify →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MATHEMATICS ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="2" title="The Mathematics of Puzzle Gaps" />

          <SubHeader title="2.1 Joint Count Formula" />
          <BodyText>
            For a rectangular jigsaw puzzle with grid dimensions W × H (where total pieces N = W × H), the number of internal joints — the connections between adjacent pieces — is given by:
          </BodyText>
          <FormulaBox formula="Total Joints = W(H − 1) + (W − 1)H = 2WH − W − H" />
          <BodyText>
            This formula counts horizontal joints (W rows of H−1 connections each) and vertical joints (H columns of W−1 connections each). As the puzzle grows large, the joint count approaches 2N, meaning each piece participates in approximately 2 unique joints on average.
          </BodyText>

          <SubHeader title="2.2 Physical Dimensions" />
          <BodyText>
            A standard jigsaw piece measures approximately 2 cm × 2 cm, giving a face area of 4 cm². The physical gap between assembled pieces — the visible line where cardboard meets cardboard — is approximately 0.3–0.5 mm wide. Each interlock knob extends roughly 7 mm into the adjacent piece with a diameter of approximately 7 mm. For each joint interface: gap area = 2.0 cm × 0.04 cm = <strong style={{ color: goldBright }}>0.08 cm²</strong>.
          </BodyText>

          <SubHeader title="2.3 Gap-to-Surface Ratio by Puzzle Size" />

          {/* Data Table */}
          <div className="overflow-x-auto mt-4 mb-6">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${gold}` }}>
                  {["Pieces", "Grid", "Joints", "Gap %", "Leverage"].map(h => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs tracking-[0.15em] uppercase"
                      style={{ color: gold, fontFamily: "var(--font-display)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CONVERGENCE_DATA.map((row, i) => (
                  <tr
                    key={row.pieces}
                    style={{
                      borderBottom: `1px solid rgba(212,168,67,0.1)`,
                      background: i === 0 ? "rgba(212,168,67,0.08)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2 font-light" style={{ color: sand }}>{row.pieces.toLocaleString()}</td>
                    <td className="px-3 py-2 font-light" style={{ color: sandDim }}>{row.grid}</td>
                    <td className="px-3 py-2 font-light" style={{ color: sandDim }}>{row.joints.toLocaleString()}</td>
                    <td className="px-3 py-2 font-light" style={{ color: i === 0 ? goldBright : sand, fontWeight: i === 0 ? 600 : 300 }}>
                      {row.gapPct.toFixed(2)}%
                    </td>
                    <td className="px-3 py-2 font-light" style={{ color: i === 0 ? goldBright : sand, fontWeight: i === 0 ? 600 : 300 }}>
                      {row.leverage.toFixed(1)}×
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeader title="2.4 The Convergence" />
          <BodyText>
            As N → ∞, the gap percentage converges asymptotically to <strong style={{ color: goldBright }}>4.0%</strong> and leverage converges to <strong style={{ color: goldBright }}>25.0×</strong>. The product is always exactly 100%:
          </BodyText>
          <FormulaBox formula="Gap% × Leverage = 100%  (invariant identity)" />
        </div>
      </section>

      {/* ── NIGEL'S FORMULATION ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="3" title="Nigel's Formulation: 2 × 50 = 100" />
          <BodyText>
            Nigel Dearden's original insight was expressed as: <strong style={{ color: goldBright }}>"Managing the gaps between puzzle pieces (1–2% of the whole) enables 50× leverage (2 × 50 = 100)."</strong>
          </BodyText>
          <BodyText>
            The mathematics confirms this is <strong style={{ color: green }}>exactly true</strong> at the 4-piece puzzle — the simplest possible complete jigsaw (2×2 grid). Gap area = 4 joints × 0.08 cm² = 0.32 cm². Total surface = 4 pieces × 4 cm² = 16 cm². Gap ratio = 0.32 / 16 = <strong style={{ color: goldBright }}>2.00%</strong>. Leverage = 16 / 0.32 = <strong style={{ color: goldBright }}>50.0×</strong>.
          </BodyText>
          <FormulaBox formula="2% × 50 = 100%  ✓  (exact at base case)" />
          <BodyText>
            The elegance of Dearden's formulation is that he identified the <strong style={{ color: goldBright }}>base case</strong> — the irreducible unit where the ratio is at its most extreme and most memorable. A civil engineer would recognise this immediately: you always design from the critical case.
          </BodyText>
        </div>
      </section>

      {/* ── CROSS-DOMAIN VALIDATION ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="4" title="Cross-Domain Validation" />

          <BodyText>
            The jigsaw gap principle is not confined to puzzles. It manifests across civil engineering and management science:
          </BodyText>

          <BodyText>
            <strong style={{ color: goldBright }}>Masonry:</strong> Mortar joints occupy approximately 17–20% of a brick wall's visible face area. The mortar — the "gap" between bricks — transforms a pile of individual units into a structural wall. Without the mortar, you have rubble. With it, you have architecture.
          </BodyText>

          <BodyText>
            <strong style={{ color: goldBright }}>Bridge Engineering:</strong> Expansion joints occupy less than 0.5% of the total deck surface area but accommodate all thermal movement, preventing structural failure. A 200-metre bridge deck might have 4–6 expansion joints covering perhaps 0.3 m² out of a 2,400 m² deck surface. Leverage: approximately 8,000×.
          </BodyText>

          <BodyText>
            <strong style={{ color: goldBright }}>Concrete Pavement:</strong> Saw-cut control joints are typically 3–6 mm wide, spaced every 4–6 metres. The joint area is approximately 0.1–0.2% of the pavement surface. These joints control where cracking occurs — without them, the concrete cracks randomly and destructively. Leverage: 500–1,000×.
          </BodyText>

          <BodyText>
            <strong style={{ color: goldBright }}>Pareto Principle:</strong> Vilfredo Pareto's observation (1896) that 80% of outcomes result from 20% of causes is the most widely known leverage ratio. The jigsaw thesis extends this further: in physical systems, the management interface can be as small as 2–4% while controlling 100% of the outcome. This is not 80/20 — it is <strong style={{ color: goldBright }}>100/2</strong>, a leverage ratio 12.5× more extreme than Pareto.
          </BodyText>

          {/* Cross-domain table */}
          <div className="overflow-x-auto mt-6 mb-6">
            <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${gold}` }}>
                  {["Domain", "Gap Element", "Gap %", "Leverage", "Product"].map(h => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 text-xs tracking-[0.15em] uppercase"
                      style={{ color: gold, fontFamily: "var(--font-display)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CROSS_DOMAIN.map((row, i) => (
                  <tr
                    key={row.domain}
                    style={{
                      borderBottom: `1px solid rgba(212,168,67,0.1)`,
                      background: row.domain.includes("Dearden") ? "rgba(212,168,67,0.08)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2 font-light" style={{ color: row.domain.includes("Dearden") ? goldBright : sand, fontWeight: row.domain.includes("Dearden") ? 600 : 300 }}>{row.domain}</td>
                    <td className="px-3 py-2 font-light" style={{ color: sandDim }}>{row.gap}</td>
                    <td className="px-3 py-2 font-light" style={{ color: sand }}>{row.pct}</td>
                    <td className="px-3 py-2 font-light" style={{ color: sand }}>{row.leverage}</td>
                    <td className="px-3 py-2 font-light" style={{ color: row.product === "100%" ? green : "#eab308" }}>{row.product}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── iAAi ADOPTION METHOD ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="5" title="The iAAi Adoption Method" />

          <BodyText>
            The jigsaw thesis provides a practical adoption method for the iAAi framework. In any system — an organisation, a project, a curriculum, a governance structure — the "pieces" are the visible, tangible components: people, departments, deliverables, assets. The "gaps" are the interfaces: communication protocols, handover procedures, quality checkpoints, governance reviews.
          </BodyText>

          <BodyText>
            Most management approaches focus on optimising the pieces — training people, upgrading equipment, expanding capacity. The jigsaw thesis argues that <strong style={{ color: goldBright }}>the highest leverage lies in optimising the gaps</strong>: the 2–4% of the system where pieces meet, where information transfers, where accountability changes hands.
          </BodyText>

          {/* Three Laws */}
          <div
            className="my-8 p-6"
            style={{ background: navyLight, border: `2px solid ${gold}` }}
          >
            <p
              className="text-sm tracking-[0.3em] uppercase text-center mb-6"
              style={{ color: gold, fontFamily: "var(--font-display)" }}
            >
              THE THREE LAWS OF GAP MANAGEMENT
            </p>

            <LawBox
              number="I"
              title="Boundedness"
              text="The gap ratio is bounded (1–5% of total system surface). If the gap ratio exceeds 20% (as in masonry), the 'mortar' has become a structural element in its own right and should be treated as a piece, not a gap."
            />
            <LawBox
              number="II"
              title="Inverse Leverage"
              text="Leverage is inversely proportional to gap size. Smaller gaps yield higher leverage. A bridge expansion joint (0.03% of surface) has 3,300× leverage. A jigsaw gap (2–4%) has 25–50× leverage. The tighter the interface, the more powerful the control."
            />
            <LawBox
              number="III"
              title="The Invariant Identity"
              text="Gap% × Leverage = 100% (for complete systems). This is a mathematical identity, not an empirical observation. Identifying and managing the gap surface is both necessary and sufficient for controlling the whole."
            />
          </div>

          <SubHeader title="5.3 Practical Application" />
          <BodyText>
            To adopt iAAi in any organisation:
          </BodyText>
          <ol className="list-decimal list-inside space-y-2 mt-3 mb-6">
            {[
              "Map the pieces — identify all discrete components (teams, processes, assets)",
              "Map the gaps — identify every interface where one piece meets another",
              "Measure the gap ratio — calculate what percentage of total system effort is spent on interfaces",
              "If gap ratio < 2%, interfaces are under-managed (risk of uncontrolled failure)",
              "If gap ratio > 5%, interfaces are over-managed (bureaucratic overhead)",
              "Optimise to the 2–4% band — this is the jigsaw sweet spot where leverage is maximised",
            ].map((step, i) => (
              <li key={i} className="text-sm font-light leading-relaxed" style={{ color: sand }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── RETURN TO THE MUSIC ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="6" title="Return to the Music" />

          <blockquote
            className="my-6 pl-6 py-4"
            style={{ borderLeft: `3px solid ${gold}`, background: "rgba(212,168,67,0.05)" }}
          >
            <p
              className="text-base italic font-light leading-relaxed"
              style={{ color: sand, fontFamily: "var(--font-display)" }}
            >
              "The problem always seems to be we're picking up the pieces on the ricochet"
            </p>
            <p className="text-xs mt-3" style={{ color: sandFaint }}>
              — Fish, <em>Jigsaw</em> (1984)
            </p>
          </blockquote>

          <BodyText>
            Fish's song is ultimately about what happens when gap management fails. The couple in "Jigsaw" are "hiding crucial pieces from each other" — they are deliberately degrading the interface. Each breakup loses more pieces. Each reassembly has wider gaps. The picture becomes less complete, the leverage decreases, and eventually the system cannot hold together at all.
          </BodyText>

          <BodyText>
            The word "ricochet" is itself a gap-management term: a projectile bouncing off surfaces, its trajectory determined entirely by the angles of contact — the interfaces, not the mass. The ricochet is pure gap physics.
          </BodyText>

          <BodyText>
            The album title <em>Fugazi</em> — military slang for "all f***ed up" — is what happens when gap management reaches zero. The pieces are still there. The picture is gone.
          </BodyText>
        </div>
      </section>

      {/* ── CONCLUSION ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <SectionHeader number="7" title="Conclusion" />

          <BodyText>
            The jigsaw puzzle is not merely a metaphor. It is a physical proof that a narrow band of negative space — 2% at the base case, converging to 4% at scale — controls 100% of the assembled picture. This is measurable, repeatable, and scale-invariant in its principle.
          </BodyText>

          <BodyText>
            Nigel Dearden's formulation "2 × 50 = 100" captures the base case with mathematical precision. The 4-piece puzzle — the simplest complete jigsaw — has exactly 2.0% gap area and exactly 50× leverage. Every larger puzzle confirms the principle while the specific numbers shift within a bounded range.
          </BodyText>

          <BodyText>
            For iAAi adoption, the message is clear: <strong style={{ color: goldBright }}>don't manage the pieces. Manage the gaps.</strong> The 2–4% of any system where components interface is where all the leverage lives. A civil engineer knows this instinctively — every bridge, every wall, every pavement is held together not by its mass but by its joints.
          </BodyText>

          <BodyText>
            Fish knew it too, forty-two years ago, in a song about a relationship falling apart: the pieces are "interlocked through a missing piece." The gap is the structure. The joint is the architecture. The 2% is the 100%.
          </BodyText>
        </div>
      </section>

      {/* ── iCARD ── */}
      <section className="px-6 pb-16">
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: gold, fontFamily: "var(--font-display)" }}
          >
            GOVERNANCE CARD
          </p>
          <img
            src={ICARD_URL}
            alt="TP-048 iCard — The Jigsaw Thesis"
            className="w-full object-contain"
            style={{ border: `2px solid ${gold}` }}
          />
        </div>
      </section>

      {/* ── REFERENCES ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm tracking-[0.2em] uppercase mb-4"
            style={{ color: gold, fontFamily: "var(--font-display)" }}
          >
            References
          </p>
          <div className="space-y-2">
            {[
              '[1] Fish (Derek Dick), interview quoted on Marillionations blog, "Jigsaw" song explanation.',
              '[2] Glengery Brick, "The Role of Mortar in Masonry Design" — approximately 20% of a brick wall\'s surface is mortar.',
              '[3] WSDOT Bridge Design Manual, Chapter 9: Bearings and Expansion Joints.',
              '[4] ACPA, "Concrete Pavement Joint Sealing/Filling," Technical Bulletin TB010, 2018.',
              '[5] Pareto, V. (1896). Cours d\'économie politique. University of Lausanne.',
              '[6] Marillion, Fugazi (album). EMI Records, released 12 March 1984. Track 3: "Jigsaw" (6:51).',
              '[7] Newverest, "How Many Edge Pieces Are in a 1000-Piece Puzzle?" — Standard 1000-piece puzzle (25×40 grid) has 126 edge pieces.',
            ].map((ref, i) => (
              <p key={i} className="text-xs font-light leading-relaxed" style={{ color: sandFaint }}>
                {ref}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center">
          <Link href="/thesis">
            <span
              className="px-6 py-3 text-sm tracking-[0.1em] uppercase cursor-pointer inline-block"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: goldBright,
                border: `1px solid rgba(212,168,67,0.3)`,
                fontFamily: "var(--font-display)",
              }}
            >
              ← The Thesis
            </span>
          </Link>
          <Link href="/turing-papers/register">
            <span
              className="px-6 py-3 text-sm tracking-[0.1em] uppercase cursor-pointer inline-block"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: goldBright,
                border: `1px solid rgba(212,168,67,0.3)`,
                fontFamily: "var(--font-display)",
              }}
            >
              Turing Papers Register →
            </span>
          </Link>
          <Link href="/vault">
            <span
              className="px-6 py-3 text-sm tracking-[0.1em] uppercase cursor-pointer inline-block"
              style={{
                background: "rgba(212,168,67,0.1)",
                color: goldBright,
                border: `1px solid rgba(212,168,67,0.3)`,
                fontFamily: "var(--font-display)",
              }}
            >
              The Vault →
            </span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid rgba(212,168,67,0.1)` }}>
        <p
          className="text-xs tracking-[0.15em] font-light"
          style={{ color: sandFaint, fontFamily: "var(--font-display)" }}
        >
          TP-048 — Block 400 — 21 March 2026 — iAAi Turing Papers Series
        </p>
        <p
          className="text-xs tracking-[0.2em] uppercase mt-2"
          style={{ color: "rgba(240,234,220,0.2)", fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}

/* ── Helper Components ── */

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: gold, fontFamily: "var(--font-display)" }}>
        Section {number}
      </p>
      <h2
        className="text-xl sm:text-2xl font-light tracking-[0.08em] uppercase"
        style={{ color: sand, fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="w-12 h-px mt-3" style={{ background: gold }} />
    </div>
  );
}

function SubHeader({ title }: { title: string }) {
  return (
    <h3
      className="text-base sm:text-lg font-light tracking-[0.05em] mt-8 mb-3"
      style={{ color: goldBright, fontFamily: "var(--font-display)" }}
    >
      {title}
    </h3>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-light leading-relaxed mb-4" style={{ color: sand }}>
      {children}
    </p>
  );
}

function FormulaBox({ formula }: { formula: string }) {
  return (
    <div
      className="my-6 py-4 px-6 text-center"
      style={{ background: navyLight, border: `1px solid rgba(212,168,67,0.3)` }}
    >
      <p
        className="text-lg sm:text-xl font-light tracking-[0.08em]"
        style={{ color: goldBright, fontFamily: "var(--font-display)" }}
      >
        {formula}
      </p>
    </div>
  );
}

function LawBox({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="mb-4 pl-4" style={{ borderLeft: `3px solid ${green}` }}>
      <p className="text-sm mb-1">
        <strong style={{ color: goldBright, fontFamily: "var(--font-display)" }}>
          Law {number}: {title}
        </strong>
      </p>
      <p className="text-sm font-light leading-relaxed" style={{ color: sand }}>
        {text}
      </p>
    </div>
  );
}

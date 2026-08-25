/**
 * CSE — Civilisational Systems Engineering Materials
 * Download hub for teaching decks and research papers
 */

import { useState, useMemo, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ICUDockingGate from "@/components/ICUDockingGate";
import { Input } from "@/components/ui/input";

const NAVY = "#0b1a33";
const GOLD = "#d4a843";
const GOLD_BRIGHT = "#e8c55a";
const GOLD_DIM = "#a08432";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";

interface CSEFile {
  name: string;
  description: string;
  size: string;
  url: string;
  category: "deck" | "paper" | "video" | "plate" | "excel";
  tags?: string[];
}

const CSE_FILES_RAW: CSEFile[] = [
  {
    name: "La Menara - The 12 Remarkable Relays",
    description: "Teaching Deck 1 — Foundation and framework overview",
    size: "9.2 MB",
    url: "/manus-storage/Part_1_Teaching_Deck_5fa7bc13.pdf",
    category: "deck",
    tags: ["deck", "framework", "overview"],
  },
  {
    name: "Part 2: Civilisational Systems Engineering — 37 Base Case Examples",
    description: "Teaching Deck 2 — Applied case studies and implementation",
    size: "27 MB",
    url: "/manus-storage/Part_2_Teaching_Deck_01c39e83.pdf",
    category: "deck",
    tags: ["deck", "case studies", "examples", "application"],
  },
  {
    name: "Part 3: The 21 Infrastructure Projects — ISI Framework Application",
    description: "Teaching Deck 3 — Real-world infrastructure projects mapped to the 12 Relays with Signal Formula parameters (A, P, β), ISI scores, and consolidation bands",
    size: "3.9 MB",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/deck_part_3_infrastructure_projects-hECb3MysHCCS6gP7fR5FFq.webp",
    category: "plate",
    tags: ["deck", "part 3", "infrastructure", "isi", "relays", "signal formula"],
  },
  {
    name: "Part 4: The 21 Infrastructure Projects — 4Rs Intervention Deck",
    description: "Teaching Deck 4 — Deploying the 4Rs (Revelation, Resilience, Regeneration, Recursion) to optimise ISI and achieve consolidation. 21 projects with intervention strategies, parameter analysis, and projected ISI improvements",
    size: "50.6 MB",
    url: "/manus-storage/The_21_Infrastructure_Projects__4Rs_Intervention_Deck(1)_18d3e091.pdf",
    category: "deck",
    tags: ["deck", "part 4", "infrastructure", "4rs", "intervention", "isi", "consolidation"],
  },
  {
    name: "CSE Foundational Paper",
    description: "Research paper establishing CSE theoretical foundations",
    size: "459 KB",
    url: "/manus-storage/CSE_Foundational_Paper_8b2dbf0d.pdf",
    category: "paper",
    tags: ["paper", "foundational", "theory"],
  },
  {
    name: "UVM-DF Narrative Manuscript",
    description: "Narrative manuscript on Unified Value Model and Dearden Field",
    size: "548 KB",
    url: "/manus-storage/UVM-DF_Narrative_Manuscript_1f1848fd.pdf",
    category: "paper",
    tags: ["paper", "uvm-df", "narrative"],
  },
  {
    name: "Hyper Learning Edutainment",
    description: "Research on hyper-learning methodologies and edutainment",
    size: "210 KB",
    url: "/manus-storage/Hyper_Learning_Edutainment_27b39167.pdf",
    category: "paper",
    tags: ["paper", "learning", "edutainment"],
  },
  {
    name: "CSE Framework Overview - Video 1",
    description: "10-second introduction to Civilisational Systems Engineering principles",
    size: "2.4 MB",
    url: "/manus-storage/gemini_generated_video_1E80E501_ec28b777.mp4",
    category: "video",
    tags: ["video", "framework", "introduction"],
  },
  {
    name: "CSE Application - Video 2",
    description: "10-second demonstration of CSE framework in practice",
    size: "2.5 MB",
    url: "/manus-storage/gemini_generated_video_3EAF1DAC_0f38505a.mp4",
    category: "video",
    tags: ["video", "application", "demonstration"],
  },
  {
    name: "What Ebbinghaus Could Not Build, iAAi Can",
    description: "TP-064 Complete — The Remembrance Curve and the iAAi Spacing Engine (Refined: Canonical Relay Names, Scholar Roles, Canonical Equation)",
    size: "205 KB",
    url: "/manus-storage/TP-064_Complete_4df8d75d.pdf",
    category: "paper",
    tags: ["paper", "remembrance", "ebbinghaus", "spacing engine", "theory"],
  },
  {
    name: "CSE Teaching Materials — Table of Contents",
    description: "Complete organizational guide with learning paths, material correlations, and usage guidelines",
    size: "135 KB",
    url: "/manus-storage/CSE_Teaching_Materials_TOC_4115a955.pdf",
    category: "paper",
    tags: ["paper", "toc", "guide", "organization"],
  },
  {
    name: "Plate X-A: The Remembrance Equation (Teaching Version)",
    description: "Pedagogical plate showing Ebbinghaus forgetting curve vs iAAi remembrance curve with canonical teaching equation",
    size: "3.0 MB",
    url: "/manus-storage/Plate_XA_Remembrance_Teaching_9ecf0449.png",
    category: "plate",
    tags: ["plate", "remembrance", "equation", "teaching"],
  },
  {
    name: "Plate X: The Remembrance Equation (Canonical Form)",
    description: "Full canonical equation plate with Signal Equation integration, 4Cs/4Rs mapping, and scholarly apparatus",
    size: "3.1 MB",
    url: "/manus-storage/Plate_X_Canonical_Full_2279762a.png",
    category: "plate",
    tags: ["plate", "remembrance", "equation", "canonical", "signal equation"],
  },
  {
    name: "Plate X-B: The Remembrance Equation Across the 12 Relays",
    description: "Domain-specific consolidation profiles showing how the canonical equation behaves across all 12 relays with distinct A, P, β parameters",
    size: "3.5 MB",
    url: "/manus-storage/Plate_XB_Relays_Consolidation_19eaa53f.png",
    category: "plate",
    tags: ["plate", "remembrance", "equation", "relays", "consolidation"],
  },
  {
    name: "Plate ISI: Infrastructure Survival Index — Remembrance Capacity of the 12 Relays",
    description: "4-quadrant institutional plate showing ISI equation, 12-relay profiles, ISI curve with asymptotic consolidation, and 4Cs/4Rs overlay mapping resistance vs remembrance forces",
    size: "3.2 MB",
    url: "/manus-storage/Plate_ISI_Canonical_4c592090.png",
    category: "plate",
    tags: ["plate", "isi", "remembrance", "relays", "4cs", "4rs"],
  },
  {
    name: "Plate X-C: Mode-Specific Remembrance Curves (Outrider to Unified)",
    description: "4-panel institutional plate showing how canonical remembrance equation expresses across 4 modes: Outrider (exploration), Western (application), Eastern (synthesis), Unified (integration)",
    size: "4.3 MB",
    url: "/manus-storage/Plate_XC_Modes_1edd1797.png",
    category: "plate",
    tags: ["plate", "remembrance", "equation", "modes", "outrider", "western", "eastern", "unified"],
  },
  {
    name: "ISI Benchmark Dataset: Reference Remembrance Profiles for 21 Critical Infrastructure Domains",
    description: "Comprehensive reference table showing ISI scores, parameters (A, P, beta, n, N), relay anchors, and consolidation bands for national road networks, power grids, water systems, telecom, health, education, and emergency response infrastructure",
    size: "4.0 MB",
    url: "/manus-storage/ISI_Benchmark_Dataset_d2a87db9.png",
    category: "plate",
    tags: ["plate", "isi", "benchmark", "dataset", "infrastructure"],
  },
  {
    name: "iAAi Formulae & Worked Examples",
    description: "The complete formulae and worked examples for HICE, Signal Formula, Seesaw Equation, ISI, and Resistance Framework (4Cs/4Rs)",
    size: "323 KB",
    url: "/manus-storage/iAAi_Formula_Worked_Examplescopy_2f5f16da.pdf",
    category: "paper",
    tags: ["paper", "formulae", "worked examples", "math"],
  },
  {
    name: "iAAi CSE Master Teaching Workbook",
    description: "Complete master Excel workbook combining 37 worked examples (ISI calculations, Dyad Taxonomy, Relay Coverage Map, Scholar Mapping) PLUS the 21 Critical Infrastructure Projects Benchmark Dataset. Includes corrected Signal Formula parameters (A, P, β) with recalculated ISI scores and consolidation bands based on independent infrastructure research and analysis",
    size: "29 KB",
    url: "/manus-storage/iAAi_CSE_Master_Teaching_Workbook_2ad717a4.xlsx",
    category: "excel",
    tags: ["excel", "isi", "worked examples", "benchmark", "21 projects", "signal formula", "master workbook", "data"],
  },
  {
    name: "CSE Teaching Materials: Quick Start Guide",
    description: "A comprehensive guide to navigating the CSE Teaching Materials, outlining learning tiers, recommended paths, and material correlations.",
    size: "70 KB",
    url: "/manus-storage/CSE_Quick_Start_Guide_684a48a1.pdf",
    category: "paper",
    tags: ["paper", "guide", "quick start", "cse"],
  },
];

export default function CSE() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "deck" | "paper" | "video" | "plate" | "excel">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Force scroll to top to show content
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredFiles = useMemo(() => {
    return CSE_FILES_RAW.filter((file) => {
      const matchesCategory = selectedCategory === "all" || file.category === selectedCategory;
      const matchesSearch = searchTerm === "" || 
                            file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (file.tags && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-4 sm:py-8 px-4 sm:px-6" style={{ borderBottom: `1px solid ${GOLD}44` }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.4em] uppercase mb-4" style={{ color: GOLD }}>
            Civilisational Systems Engineering
          </p>
          <h1 className="text-4xl sm:text-5xl font-light mb-6 uppercase" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
            Teaching Materials - CSE
          </h1>
          <p className="text-lg" style={{ color: TEXT_SILVER }}>
            Teaching decks and research papers on Civilisational Systems Engineering framework
          </p>
        </div>
      </section>

      <ICUDockingGate />

      {/* Filter and Search Section */}
      <section className="py-8 px-4 sm:px-6" style={{ borderBottom: `1px solid ${GOLD}44` }}>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "all" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "all" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            All Materials
          </button>
          <button
            onClick={() => setSelectedCategory("deck")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "deck" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "deck" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            Teaching Decks
          </button>
          <button
            onClick={() => setSelectedCategory("paper")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "paper" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "paper" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            Research Papers
          </button>
          <button
            onClick={() => setSelectedCategory("video")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "video" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "video" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            Videos
          </button>
          <button
            onClick={() => setSelectedCategory("plate")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "plate" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "plate" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            Plates
          </button>
          <button
            onClick={() => setSelectedCategory("excel")}
            className="px-6 py-2 uppercase text-sm tracking-wider transition-all"
            style={{
              color: selectedCategory === "excel" ? GOLD_BRIGHT : TEXT_SILVER,
              borderBottom: selectedCategory === "excel" ? `2px solid ${GOLD_BRIGHT}` : "none",
            }}
          >
            Excel
          </button>
          <Input
            type="text"
            placeholder="Search by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs flex-grow"
            style={{
              background: `rgba(232, 197, 90, 0.05)`,
              borderColor: `${GOLD}66`,
              color: TEXT_WHITE,
            }}
          />
        </div>
      </section>

      {/* Files Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {filteredFiles.map((file, idx) => (
              <a
                key={idx}
                href={file.url}
                download
                className="group p-6 sm:p-8 transition-all"
                style={{
                  border: `1px solid ${GOLD}66`,
                  background: `rgba(232, 197, 90, 0.02)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD_BRIGHT;
                  e.currentTarget.style.background = `rgba(232, 197, 90, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${GOLD}66`;
                  e.currentTarget.style.background = `rgba(232, 197, 90, 0.02)`;
                }}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-light mb-2 uppercase" style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}>
                      {file.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: TEXT_SILVER }}>
                      {file.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs tracking-wider" style={{ color: GOLD_BRIGHT }}>
                        {file.size}
                      </span>
                      {file.tags && file.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-xs tracking-wider px-2 py-1 rounded" style={{ background: `${GOLD}22`, color: GOLD_BRIGHT }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-2xl" style={{ color: GOLD }}>
                    ↓
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 text-center" style={{ borderTop: `1px solid ${GOLD}44` }}>
        <p className="text-sm" style={{ color: GOLD_DIM }}>
          All materials © Nigel T. Dearden · Infrastructure Academy
        </p>
      </section>
    </div>
  );
}

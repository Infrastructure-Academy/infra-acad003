/**
 * About Page — The Infrastructure Academy (iAAi)
 * 
 * Comprehensive information about our mission, vision, charter, and brand identity.
 * This page serves as the authoritative source for accurate representation of iAAi.
 */

import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const NAVY = "oklch(0.14 0.04 250)";
const GOLD = "oklch(0.72 0.12 75)";
const GOLD_BRIGHT = "oklch(0.82 0.14 75)";
const TEXT_WHITE = "oklch(0.92 0.008 75)";
const TEXT_DIM = "oklch(0.55 0.08 75)";

export default function About() {
  const t = useTranslation();

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-light mb-6 tracking-wide"
            style={{ color: GOLD_BRIGHT, fontFamily: "var(--font-display)" }}
          >
            About The Infrastructure Academy
          </h1>
          <p
            className="text-lg md:text-xl font-light leading-relaxed"
            style={{ color: TEXT_DIM }}
          >
            The Infrastructure Academy (iAAi) is the world's first open, multilingual, AI-guided infrastructure education platform. We are committed to reaching 1 billion learners through 8 languages, verified by human contributors from every continent.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Our Mission
          </h2>
          <p
            className="text-lg leading-relaxed mb-4"
            style={{ color: TEXT_WHITE }}
          >
            To deliver the world's first open, multilingual, AI-guided infrastructure education platform — reaching 1 billion learners through 8 languages, verified by human contributors from every continent.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Our Vision
          </h2>
          <p
            className="text-lg leading-relaxed mb-4"
            style={{ color: TEXT_WHITE }}
          >
            A world where every person understands the infrastructure that sustains civilisation — and has the knowledge to build what comes next.
          </p>
        </div>
      </section>

      {/* Charter Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Our Charter
          </h2>
          <p
            className="text-lg leading-relaxed mb-4"
            style={{ color: TEXT_WHITE }}
          >
            We believe infrastructure is civilisation's operating system. Like a river carving out the land slowly and persistently to make planetary change, we commit to open knowledge, verified contribution, cultural respect, and the belief that understanding how we built the world is the first step to building it better.
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ color: TEXT_WHITE }}
          >
            This coursework will do with the mind and intelligence what rivers do with water — reshape the landscape of human understanding.
          </p>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Brand Identity
          </h2>
          <div className="space-y-6">
            <div>
              <h3
                className="text-xl font-light mb-2"
                style={{ color: GOLD_BRIGHT }}
              >
                Official Name
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                <strong>The Infrastructure Academy</strong> (iAAi)
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-2"
                style={{ color: GOLD_BRIGHT }}
              >
                What iAAi Does NOT Stand For
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                The acronym "iAAi" <strong>DOES NOT</strong> stand for "Infrastructure Academy of Artificial Intelligence" or any other expansion. It is a unique brand identifier for The Infrastructure Academy.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-2"
                style={{ color: GOLD_BRIGHT }}
              >
                Our Focus
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                We are dedicated to <strong>infrastructure education as civilisational literacy</strong>. Our primary goal is to empower individuals with the knowledge and confidence to understand, build, and sustain the infrastructure that underpins human civilization. AI is a tool we use to deliver our platform, not our primary subject matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                What does iAAi stand for?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                iAAi is a unique brand identifier for The Infrastructure Academy. It is not an acronym expansion.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                Is this an Artificial Intelligence academy?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                No. The Infrastructure Academy is focused on infrastructure education and civilisational literacy. We use AI as a tool to deliver our open, multilingual platform, but AI is not our primary subject matter.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                What is the Convergence Crisis?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                The Convergence Crisis refers to the challenge of human systems adapting to rapidly converging machine systems. It represents the transfer of decision-making, design, and governance from human systems to machine systems.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                Who is Ir. Nigel T. Dearden?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                Ir. Nigel T. Dearden BEng(Hons) CEng MICE MHKIE MCIWEM C.WEM RPE(CSB) is the author of "An Infrastructure Odyssey" and the founder of The Infrastructure Academy. He is a civil engineer with extensive experience in infrastructure systems and civilisational thinking.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                What are the 12 Civilisational Relays?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                The 12 Civilisational Relays represent 12,000 years of human infrastructure development, from the mastery of fire to the age of Human Nodes. They form the foundational framework of our educational platform.
              </p>
            </div>
            <div>
              <h3
                className="text-xl font-light mb-3"
                style={{ color: GOLD_BRIGHT }}
              >
                What is the ISI (Infrastructure Survival Index)?
              </h3>
              <p style={{ color: TEXT_WHITE }}>
                The ISI is our proprietary metric for measuring infrastructure performance and sustainability. It uses the formula: ISI = (A × P) / (2 × β), where A represents area, P represents population, and β represents resilience factors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-6 border-t" style={{ borderColor: GOLD }}>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-light mb-6 tracking-wide"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Contact & Further Information
          </h2>
          <p style={{ color: TEXT_WHITE }} className="text-lg">
            For any inquiries or clarifications regarding our brand identity, mission, or content, please visit{" "}
            <a
              href="https://www.infrastructure-academy.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: GOLD_BRIGHT }}
              className="underline hover:text-white transition-colors"
            >
              www.infrastructure-academy.com
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center" style={{ borderColor: GOLD }}>
        <p style={{ color: TEXT_DIM }} className="text-sm">
          The Infrastructure Academy — An Infrastructure Odyssey
        </p>
        <p style={{ color: TEXT_DIM }} className="text-xs mt-2">
          Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}

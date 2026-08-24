/**
 * The Universe — Capstone page showing the entire iAAi world
 * 9 chapters: Webpages, Learning, Game, Holodeck, Hardware, Suit, Goodies, Ecosystem, Future
 * Hero video + chapter grid with keyframe images
 * TikTok social section + volunteer translation CTA
 */
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { useTranslation } from "@/contexts/LanguageContext";

const POLISHED_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/CAPSTONE-POLISHED-iAAi-UNIVERSE_8b0c01be.mp4";

const GOLD = "#d4a843";
const NAVY = "#0a1628";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";
const GOLD_DIM = "#6a7a9a";

export default function Universe() {
  const t = useTranslation();

  const chapters = [
    {
      num: "I",
      titleKey: "universe.ch1",
      descKey: "universe.ch1desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf01-webpages_7bcf70b4.png",
      href: "/",
    },
    {
      num: "II",
      titleKey: "universe.ch2",
      descKey: "universe.ch2desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf02-learning_98085000.png",
      href: "/thesis",
    },
    {
      num: "III",
      titleKey: "universe.ch3",
      descKey: "universe.ch3desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf03-game_f5e7d253.png",
      href: "/game",
    },
    {
      num: "IV",
      titleKey: "universe.ch4",
      descKey: "universe.ch4desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf04-holodeck_7bb9b271.png",
      href: "/vault",
    },
    {
      num: "V",
      titleKey: "universe.ch5",
      descKey: "universe.ch5desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf05-hardware_00dae1c8.png",
      href: "/hardware",
    },
    {
      num: "VI",
      titleKey: "universe.ch6",
      descKey: "universe.ch6desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf06-suit_da6f4b8d.png",
      href: "/hardware",
    },
    {
      num: "VII",
      titleKey: "universe.ch7",
      descKey: "universe.ch7desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf07-goodies_5bb3165f.png",
      href: "/cards",
    },
    {
      num: "VIII",
      titleKey: "universe.ch8",
      descKey: "universe.ch8desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf08-ecosystem_b7642450.png",
      href: "/aim",
    },
    {
      num: "IX",
      titleKey: "universe.ch9",
      descKey: "universe.ch9desc",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y/capstone-kf09-future_f0001d65.png",
      href: "/titans",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* Hero — Full-width video */}
      <section className="relative pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4 text-center">
          <p
            className="text-sm tracking-[0.4em] uppercase font-light mb-4"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            iAAi — Dearden Dynamics
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] uppercase mb-4"
            style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
          >
            {t("universe.title")}
          </h1>
          <p
            className="text-base sm:text-lg font-light tracking-wide mb-8 max-w-2xl mx-auto"
            style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
          >
            {t("universe.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className="relative overflow-hidden"
            style={{
              border: "1px solid rgba(212,168,67,0.3)",
              background: "#000",
            }}
          >
            <video
              controls
              autoPlay
              muted
              playsInline
              className="w-full"
              style={{ maxHeight: "560px", objectFit: "contain", background: "#000" }}
            >
              <source src={POLISHED_VIDEO} type="video/mp4" />
            </video>
          </div>
          <p
            className="text-center text-xs mt-3 tracking-widest uppercase"
            style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
          >
            Capstone Video — 9 Chapters — Block 383 — March 2026
          </p>
        </div>

        {/* Action buttons: Watch Capstone, TikTok, Help Translate */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={POLISHED_VIDEO}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs tracking-widest uppercase font-light"
            style={{
              border: `1px solid ${GOLD}`,
              color: GOLD,
              fontFamily: "var(--font-display)",
              background: "transparent",
            }}
          >
            {t("universe.watchCapstone")}
          </a>
          <a
            href="https://www.tiktok.com/@iaaiacademy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs tracking-widest uppercase font-light"
            style={{
              border: `1px solid ${GOLD}`,
              color: GOLD,
              fontFamily: "var(--font-display)",
              background: "transparent",
            }}
          >
            {t("universe.downloadTikTok")}
          </a>
          <Link href="/boffin-bin">
            <span
              className="inline-block px-5 py-2.5 text-xs tracking-widest uppercase font-light cursor-pointer"
              style={{
                border: `1px solid ${GOLD}`,
                color: NAVY,
                fontFamily: "var(--font-display)",
                background: GOLD,
              }}
            >
              {t("universe.helpTranslate")}
            </span>
          </Link>
        </div>
      </section>

      {/* Chapter Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="w-20 h-px mx-auto mb-6"
              style={{ background: "linear-gradient(to right, transparent, #d4a843, transparent)" }}
            />
            <p
              className="text-base font-light italic tracking-wide"
              style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
            >
              Nine vectors — digital, learning, play, experience, hardware, suit, collectible, network, and destiny
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chapters.map((ch) => (
              <Link key={ch.num} href={ch.href}>
                <div className="group relative overflow-hidden cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={ch.image}
                      alt={t(ch.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      style={{ filter: "saturate(0.85)" }}
                    />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 50%, transparent 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p
                      className="text-xs tracking-[0.3em] uppercase mb-1 font-light"
                      style={{ color: GOLD, fontFamily: "var(--font-display)" }}
                    >
                      Chapter {ch.num}
                    </p>
                    <h2
                      className="text-lg sm:text-xl font-light tracking-[0.08em] uppercase mb-1"
                      style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
                    >
                      {t(ch.titleKey)}
                    </h2>
                    <p
                      className="text-xs leading-relaxed font-light"
                      style={{ color: TEXT_SILVER }}
                    >
                      {t(ch.descKey)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TikTok Social Section */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ borderTop: "1px solid rgba(212,168,67,0.15)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4 font-light"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            Social — Short Form
          </p>
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-4"
            style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
          >
            TikTok — 90-Second Universe
          </h2>
          <p
            className="text-sm font-light mb-8 max-w-xl mx-auto"
            style={{ color: TEXT_SILVER }}
          >
            The capstone video distilled for mobile. Each chapter in 10 seconds. 
            Share the vision. Recruit nodes. Every view is a signal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.tiktok.com/@iaaiacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs tracking-widest uppercase font-light"
              style={{
                background: GOLD,
                color: NAVY,
                fontFamily: "var(--font-display)",
              }}
            >
              Follow @iaaiacademy
            </a>
            <a
              href={POLISHED_VIDEO}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs tracking-widest uppercase font-light"
              style={{
                border: `1px solid ${GOLD}`,
                color: GOLD,
                fontFamily: "var(--font-display)",
                background: "transparent",
              }}
            >
              Download Full Video
            </a>
          </div>
        </div>
      </section>

      {/* Beta Volunteer Translation CTA */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ borderTop: "1px solid rgba(212,168,67,0.15)", background: "rgba(212,168,67,0.03)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4 font-light"
            style={{ color: GOLD, fontFamily: "var(--font-display)" }}
          >
            {t("translate.pioneerBadge")}
          </p>
          <h2
            className="text-2xl sm:text-3xl font-light tracking-[0.08em] uppercase mb-4"
            style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
          >
            {t("translate.pioneerTitle")}
          </h2>
          <p
            className="text-sm font-light mb-4 max-w-xl mx-auto"
            style={{ color: TEXT_SILVER }}
          >
            {t("translate.pioneerDesc")}
          </p>
          <p
            className="text-xs font-light mb-8 max-w-lg mx-auto"
            style={{ color: GOLD_DIM }}
          >
            {t("translate.aiGenerated")}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["ZH", "KO", "JA", "ES", "HI", "AR", "VI"].map((code) => (
              <span
                key={code}
                className="px-3 py-1.5 text-xs tracking-widest"
                style={{
                  border: "1px solid rgba(212,168,67,0.3)",
                  color: TEXT_SILVER,
                  fontFamily: "var(--font-display)",
                }}
              >
                {code}
              </span>
            ))}
          </div>
          <Link href="/boffin-bin">
            <span
              className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-light cursor-pointer"
              style={{
                background: GOLD,
                color: NAVY,
                fontFamily: "var(--font-display)",
              }}
            >
              {t("translate.becomeVolunteer")}
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 text-center"
        style={{ borderTop: "1px solid rgba(212,168,67,0.2)" }}
      >
        <p
          className="text-sm tracking-[0.15em] font-light"
          style={{ color: GOLD_DIM, fontFamily: "var(--font-display)" }}
        >
          9 x 11 = 99 + 1 = 100 — The Centurion Number
        </p>
        <p
          className="text-xs mt-2 tracking-widest uppercase"
          style={{ color: "#4a5a7a", fontFamily: "var(--font-display)" }}
        >
          Dearden Dynamics Hardware Division — AD4 Dream Drive — Per Arya Ad Astra
        </p>
      </footer>
    </div>
  );
}

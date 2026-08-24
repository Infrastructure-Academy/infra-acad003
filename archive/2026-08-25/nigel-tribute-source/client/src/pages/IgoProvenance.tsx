/**
 * iGO Provenance — The Infrastructure Game Olympiad Development Archive
 * Block 459 — Complete visual provenance of the iGO platform.
 * 43 images + 6 videos documenting the full development journey.
 * Design: Dark navy void, gold accents, Cormorant Garamond display.
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Lightbox from "@/components/Lightbox";

const NAVY = "#0b1a33";
const GOLD = "#d4a843";
const TEXT_WHITE = "#f0eadc";
const TEXT_SILVER = "#8a9cc0";

/* ─── CDN URLS ─── */
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030220481/UcMtq9dnoiXYmXbtNd8s9Y";

/* Core iCards */
const IGO_FINAL = `${CDN}/icard_igo_final_86ef39e2.png`;
const IGO_MASTER_GRID = `${CDN}/icard_igo_master_grid_adc19aec.png`;
const IGO_UMBRELLA = `${CDN}/icard_igo_umbrella_da22317a.png`;
const CONVERGENCE = `${CDN}/icard_convergence_go_pokemon_iaai_7e15a992.png`;
const UX_001 = `${CDN}/icard-ux-001_7e79e826.png`;

/* Payload Cards */
const PAYLOAD_2 = `${CDN}/icard_payload2_content_02b84945.png`;
const PAYLOAD_3 = `${CDN}/icard_payload3_context_60255914.png`;

/* v2 Reference Cards */
const V2_BRIDGE = `${CDN}/v2_ref_bridge_92dfa3d4.png`;
const V2_HOOK = `${CDN}/v2_ref_hook_6680187d.png`;
const V2_INFRADEX = `${CDN}/v2_ref_infradex_2e9c0675.png`;
const V2_CROWD = `${CDN}/v2_ref_crowd_595988ba.png`;
const ACT4_CLOSE = `${CDN}/ref_act4_close_v2_98346b16.png`;

/* Development Screenshots */
const DEV_5256 = `${CDN}/IMG_5256_f19988eb.PNG`;
const DEV_5257 = `${CDN}/IMG_5257_9c29c26f.PNG`;
const DEV_5264 = `${CDN}/IMG_5264_2d8f3567.JPG`;
const DEV_5265 = `${CDN}/IMG_5265_98531b20.JPG`;
const DEV_5266 = `${CDN}/IMG_5266_c345235e.JPG`;
const DEV_5267 = `${CDN}/IMG_5267_b24fa18e.JPG`;
const DEV_5268 = `${CDN}/IMG_5268_5563a8a6.JPG`;
const DEV_5293 = `${CDN}/IMG_5293_e8c43b26.PNG`;
const DEV_5294 = `${CDN}/IMG_5294_fcec00b2.PNG`;
const DEV_5295 = `${CDN}/IMG_5295_c4f75cfc.PNG`;
const DEV_5296 = `${CDN}/IMG_5296_e5ff9ba7.PNG`;
const DEV_5300 = `${CDN}/IMG_5300_79653bf4.PNG`;

/* Reality Engine Screenshots */
const RE_5360 = `${CDN}/IMG_5360_a125f4d6.PNG`;
const RE_5367 = `${CDN}/IMG_5367_2cc1b9a0.PNG`;
const RE_5369 = `${CDN}/IMG_5369_e0e3af7e.PNG`;
const RE_5370 = `${CDN}/IMG_5370_509b38f8.PNG`;
const RE_5371 = `${CDN}/IMG_5371_73c63d7b.PNG`;
const RE_5372 = `${CDN}/IMG_5372_e8c623e9.PNG`;

/* Live Platform Screenshots */
const LIVE_5385 = `${CDN}/IMG_5385_849a3165.PNG`;
const LIVE_5392 = `${CDN}/IMG_5392_956b5604.PNG`;
const LIVE_5393 = `${CDN}/IMG_5393_6879a1e2.PNG`;
const LIVE_5394 = `${CDN}/IMG_5394_df78222a.PNG`;
const LIVE_5395 = `${CDN}/IMG_5395_5547ce42.PNG`;
const LIVE_5396 = `${CDN}/IMG_5396_3edbf7af.PNG`;
const LIVE_5397 = `${CDN}/IMG_5397_a60b3e44.PNG`;
const LIVE_5398 = `${CDN}/IMG_5398_9ca1ac33.PNG`;
const LIVE_5399 = `${CDN}/IMG_5399_b085bd58.PNG`;
const LIVE_5410 = `${CDN}/IMG_5410_fcc0bb12.PNG`;
const LIVE_5419 = `${CDN}/IMG_5419_1c7ca29c.PNG`;
const LIVE_5426 = `${CDN}/IMG_5426_3c45a117.PNG`;
const LIVE_5445 = `${CDN}/IMG_5445_111cfd50.PNG`;

/* Videos */
const VID_TRAILER_V7 = `${CDN}/iGO_trailer_v7_5d09b448.mp4`;
const VID_AR_DEMO = `${CDN}/iGO_AR_Demo_90s_99d947ee.mp4`;
const VID_TRAILER_V2 = `${CDN}/iGO_trailer_v2_02fe02b1.mp4`;
const VID_TRAILER_FINAL = `${CDN}/igo_trailer_final_9fb2e2e3.mp4`;
const VID_ISI_TRAILER = `${CDN}/ISI_Survival_Guide_Trailer_c343f1f0.mp4`;
const VID_ISI_TRAILER_V2 = `${CDN}/ISI_Survival_Guide_Trailer_v2_ac8f8943.mp4`;

/* ─── SECTION DATA ─── */

interface ImageCard {
  src: string;
  alt: string;
  label?: string;
}

const SECTIONS: Array<{
  id: string;
  title: string;
  subtitle: string;
  images: ImageCard[];
}> = [
  {
    id: "core",
    title: "CORE iGO iCARDS",
    subtitle: "Master product cards — the foundational architecture of the Infrastructure Game Olympiad",
    images: [
      { src: IGO_FINAL, alt: "iGO Final — Master Product Card", label: "iGO Final" },
      { src: IGO_MASTER_GRID, alt: "iGO Master Grid — Full Feature Matrix", label: "Master Grid" },
      { src: IGO_UMBRELLA, alt: "iGO Umbrella — Platform Architecture", label: "Umbrella" },
      { src: CONVERGENCE, alt: "Convergence — GO × Pokemon × iAAi", label: "Convergence" },
      { src: UX_001, alt: "UX-001 — User Experience Design", label: "UX-001" },
    ],
  },
  {
    id: "payload",
    title: "PAYLOAD ARCHITECTURE",
    subtitle: "Content and context delivery layers — the data backbone of iGO",
    images: [
      { src: PAYLOAD_2, alt: "Payload 2 — Content Layer", label: "Content Layer" },
      { src: PAYLOAD_3, alt: "Payload 3 — Context Layer", label: "Context Layer" },
    ],
  },
  {
    id: "v2ref",
    title: "V2 REFERENCE DESIGN",
    subtitle: "Bridge, hook, index, crowd — the four pillars of iGO v2 engagement",
    images: [
      { src: V2_BRIDGE, alt: "v2 Reference — Bridge Concept", label: "Bridge" },
      { src: V2_HOOK, alt: "v2 Reference — Hook Engagement", label: "Hook" },
      { src: V2_INFRADEX, alt: "v2 Reference — Infradex Index", label: "Infradex" },
      { src: V2_CROWD, alt: "v2 Reference — Crowd Intelligence", label: "Crowd" },
      { src: ACT4_CLOSE, alt: "Act 4 Close — Final Presentation v2", label: "Act 4 Close" },
    ],
  },
  {
    id: "dev",
    title: "DEVELOPMENT BUILD",
    subtitle: "Platform construction — from first wireframe to feature integration",
    images: [
      { src: DEV_5256, alt: "iGO Development — App Overview" },
      { src: DEV_5257, alt: "iGO Development — Platform Interface" },
      { src: DEV_5264, alt: "iGO Development — Mobile View 1" },
      { src: DEV_5265, alt: "iGO Development — Mobile View 2" },
      { src: DEV_5266, alt: "iGO Development — Mobile View 3" },
      { src: DEV_5267, alt: "iGO Development — Mobile View 4" },
      { src: DEV_5268, alt: "iGO Development — Mobile View 5" },
      { src: DEV_5293, alt: "iGO Development — Feature Build 1" },
      { src: DEV_5294, alt: "iGO Development — Feature Build 2" },
      { src: DEV_5295, alt: "iGO Development — Feature Build 3" },
      { src: DEV_5296, alt: "iGO Development — Feature Build 4" },
      { src: DEV_5300, alt: "iGO Development — Integration Test" },
    ],
  },
  {
    id: "reality",
    title: "REALITY ENGINE",
    subtitle: "The iGO Reality Engine — lifecycle timeline, dashboard, and feature views",
    images: [
      { src: RE_5360, alt: "Reality Engine — Lifecycle Timeline" },
      { src: RE_5367, alt: "Reality Engine — Dashboard View" },
      { src: RE_5369, alt: "Reality Engine — Feature View 1" },
      { src: RE_5370, alt: "Reality Engine — Feature View 2" },
      { src: RE_5371, alt: "Reality Engine — Feature View 3" },
      { src: RE_5372, alt: "Reality Engine — Feature View 4" },
    ],
  },
  {
    id: "live",
    title: "LIVE PLATFORM",
    subtitle: "Production screenshots — the iGO platform as deployed and tested",
    images: [
      { src: LIVE_5385, alt: "iGO Live — Platform Screenshot 1" },
      { src: LIVE_5392, alt: "iGO Live — Platform Screenshot 2" },
      { src: LIVE_5393, alt: "iGO Live — Platform Screenshot 3" },
      { src: LIVE_5394, alt: "iGO Live — Platform Screenshot 4" },
      { src: LIVE_5395, alt: "iGO Live — Platform Screenshot 5" },
      { src: LIVE_5396, alt: "iGO Live — Platform Screenshot 6" },
      { src: LIVE_5397, alt: "iGO Live — Platform Screenshot 7" },
      { src: LIVE_5398, alt: "iGO Live — Platform Screenshot 8" },
      { src: LIVE_5399, alt: "iGO Live — Platform Screenshot 9" },
      { src: LIVE_5410, alt: "iGO Live — Reality Engine View" },
      { src: LIVE_5419, alt: "iGO Live — Platform Screenshot 10" },
      { src: LIVE_5426, alt: "iGO Live — Platform Screenshot 11" },
      { src: LIVE_5445, alt: "iGO Live — Platform Screenshot 12" },
    ],
  },
];

const VIDEOS = [
  { src: VID_TRAILER_FINAL, label: "iGO Trailer — Final Cut", duration: "~1 min" },
  { src: VID_TRAILER_V7, label: "iGO Trailer v7", duration: "~30s" },
  { src: VID_TRAILER_V2, label: "iGO Trailer v2", duration: "~1 min" },
  { src: VID_AR_DEMO, label: "iGO AR Demo — 90 Seconds", duration: "1:30" },
  { src: VID_ISI_TRAILER_V2, label: "ISI Survival Guide v2", duration: "~3 min" },
  { src: VID_ISI_TRAILER, label: "ISI Survival Guide v1", duration: "~3 min" },
];

/* ─── COMPONENT ─── */

export default function IgoProvenance() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Collect all images for gallery navigation
  const allImages = SECTIONS.flatMap((s) => s.images.map((img) => ({ src: img.src, alt: img.alt })));

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 text-center">
        <p
          className="text-sm tracking-[0.4em] uppercase font-light mb-4"
          style={{ color: GOLD, fontFamily: "var(--font-display)" }}
        >
          PROVENANCE ARCHIVE
        </p>
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] uppercase mb-4"
          style={{ color: TEXT_WHITE, fontFamily: "var(--font-display)" }}
        >
          iGO
        </h1>
        <p
          className="text-base sm:text-lg font-light tracking-wide max-w-2xl mx-auto mb-2"
          style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
        >
          Infrastructure Game Olympiad — Complete Development Archive
        </p>
        <p className="text-sm font-light tracking-wider" style={{ color: `${TEXT_SILVER}88` }}>
          43 iCards &middot; 6 Videos &middot; Block 459 &middot; 713 Cards in Register
        </p>
        <div className="w-20 h-px mx-auto mt-8" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
      </section>

      {/* Section Navigation Pills */}
      <nav className="px-4 sm:px-6 pb-8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 text-xs tracking-[0.15em] uppercase font-light border transition-colors"
              style={{
                borderColor: `${GOLD}44`,
                color: TEXT_SILVER,
                fontFamily: "var(--font-display)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = GOLD;
                (e.target as HTMLElement).style.color = GOLD;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = `${GOLD}44`;
                (e.target as HTMLElement).style.color = TEXT_SILVER;
              }}
            >
              {s.title}
            </a>
          ))}
          <a
            href="#videos"
            className="px-3 py-1.5 text-xs tracking-[0.15em] uppercase font-light border transition-colors"
            style={{ borderColor: `${GOLD}44`, color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = GOLD;
              (e.target as HTMLElement).style.color = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = `${GOLD}44`;
              (e.target as HTMLElement).style.color = TEXT_SILVER;
            }}
          >
            VIDEOS
          </a>
        </div>
      </nav>

      {/* Image Sections */}
      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id} className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
                <h2
                  className="text-lg sm:text-xl tracking-[0.2em] uppercase font-light whitespace-nowrap"
                  style={{ color: GOLD, fontFamily: "var(--font-display)" }}
                >
                  {section.title}
                </h2>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
              </div>
              <p
                className="text-center text-sm font-light tracking-wide"
                style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
              >
                {section.subtitle}
              </p>
            </div>

            {/* Image Grid */}
            <div className={`grid gap-3 sm:gap-4 ${
              section.images.length <= 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                : section.images.length <= 5
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
            }`}>
              {section.images.map((img, i) => (
                <div
                  key={i}
                  className="group cursor-pointer overflow-hidden"
                  style={{ border: `1px solid ${GOLD}22` }}
                  onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ background: "#0a1628" }}
                    />
                  </div>
                  {img.label && (
                    <div className="px-2 py-1.5" style={{ background: "#0a1628" }}>
                      <p
                        className="text-[10px] sm:text-xs tracking-[0.15em] uppercase font-light text-center truncate"
                        style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
                      >
                        {img.label}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Videos Section */}
      <section id="videos" className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}66, transparent)` }} />
              <h2
                className="text-lg sm:text-xl tracking-[0.2em] uppercase font-light whitespace-nowrap"
                style={{ color: GOLD, fontFamily: "var(--font-display)" }}
              >
                VIDEO ARCHIVE
              </h2>
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66)` }} />
            </div>
            <p
              className="text-center text-sm font-light tracking-wide"
              style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
            >
              Trailers, demos, and survival guides — the moving picture record
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {VIDEOS.map((vid, i) => (
              <div key={i} style={{ border: `1px solid ${GOLD}22` }}>
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full aspect-video"
                  style={{ background: "#000" }}
                >
                  <source src={vid.src} type="video/mp4" />
                </video>
                <div className="px-3 py-2 flex items-center justify-between" style={{ background: "#0a1628" }}>
                  <p
                    className="text-xs tracking-[0.12em] uppercase font-light"
                    style={{ color: TEXT_SILVER, fontFamily: "var(--font-display)" }}
                  >
                    {vid.label}
                  </p>
                  <p className="text-[10px] font-light" style={{ color: `${TEXT_SILVER}88` }}>
                    {vid.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center" style={{ borderTop: `1px solid ${GOLD}22` }}>
        <p
          className="text-sm tracking-[0.15em] font-light"
          style={{ color: `${TEXT_SILVER}66`, fontFamily: "var(--font-display)" }}
        >
          iGO PROVENANCE — 43 iCards &middot; 6 Videos &middot; Block 459
        </p>
        <p
          className="text-xs tracking-widest uppercase mt-2"
          style={{ color: `${TEXT_SILVER}44`, fontFamily: "var(--font-display)" }}
        >
          Per Arya Ad Astra
        </p>
      </footer>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
          images={allImages}
          onNavigate={(src, alt) => setLightbox({ src, alt })}
        />
      )}
    </div>
  );
}

import { Home } from "lucide-react";
import { useLocation } from "wouter";
import { useTranslation } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";

const NAVY = "#0b1a33";
const GOLD = "#d4a843";
const TEXT_SILVER = "#8a9cc0";

export default function NotFound() {
  const t = useTranslation();
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen" style={{ background: NAVY }}>
      <Navigation />

      <div className="flex items-center justify-center px-6" style={{ minHeight: "60vh" }}>
        <div className="text-center max-w-lg">
          <p
            className="text-sm tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-display)", color: GOLD }}
          >
            SIGNAL LOST
          </p>

          <h1
            className="text-6xl sm:text-8xl font-light mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#f0eadc" }}
          >
            404
          </h1>

          <p
            className="text-base mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-display)", color: TEXT_SILVER }}
          >
            {t("common.notFound") || "Page not found"}.
            <br />
            The coordinates you entered do not match any known vector.
          </p>

          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-[0.2em] uppercase font-light transition-all duration-300 cursor-pointer"
            style={{
              fontFamily: "var(--font-display)",
              color: GOLD,
              border: `1px solid ${GOLD}66`,
              background: "rgba(212,168,67,0.06)",
            }}
          >
            <Home className="w-4 h-4" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}

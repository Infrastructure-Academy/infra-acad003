/**
 * LanguageToggle — 8 languages from Infrastructure Academy
 * EN, Chinese, Korean, Japanese, Hindi, Arabic, Spanish, Vietnamese
 * Dropdown selector with globe icon. Uses LanguageContext for state.
 * Source: INFRA_ACADEMY_SITE_NOTES.md line 9 — canonical 8 languages.
 */
import { useState, useRef, useEffect } from "react";
import { useLanguage, type LangCode } from "@/contexts/LanguageContext";

const LANGUAGES = [
  { code: "EN" as LangCode, label: "English", native: "EN" },
  { code: "ZH" as LangCode, label: "Chinese", native: "中文" },
  { code: "KO" as LangCode, label: "Korean", native: "한국어" },
  { code: "JA" as LangCode, label: "Japanese", native: "日本語" },
  { code: "HI" as LangCode, label: "Hindi", native: "हिन्दी" },
  { code: "AR" as LangCode, label: "Arabic", native: "العربية" },
  { code: "ES" as LangCode, label: "Spanish", native: "Español" },
  { code: "VI" as LangCode, label: "Vietnamese", native: "Tiếng Việt" },
];

interface LanguageToggleProps {
  /** Colour for the border and text — adapts to Home vs inner pages */
  borderColor?: string;
  textColor?: string;
  hoverBg?: string;
  /** Style variant */
  variant?: "home" | "nav";
}

export default function LanguageToggle({
  borderColor = "#a08432",
  textColor = "#8a9cc0",
  hoverBg = "rgba(212,168,67,0.12)",
}: LanguageToggleProps) {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (code: LangCode) => {
    setLang(code);
    setOpen(false);
  };

  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider cursor-pointer transition-colors duration-300"
        style={{
          border: `1px solid ${borderColor}`,
          color: textColor,
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
        aria-label="Select language"
        aria-expanded={open}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={textColor}
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {current.code}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke={textColor}
          strokeWidth="1.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-[100] py-1 min-w-[180px]"
          style={{
            background: "#0b1a33",
            border: `1px solid ${borderColor}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className="w-full text-left px-4 py-2 text-xs tracking-wider flex items-center justify-between gap-4 transition-colors duration-200 cursor-pointer"
              style={{
                color: l.code === lang ? "#e8c55a" : textColor,
                background:
                  l.code === lang
                    ? "rgba(212,168,67,0.08)"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                if (l.code !== lang) {
                  e.currentTarget.style.background = "rgba(212,168,67,0.06)";
                  e.currentTarget.style.color = "#f0eadc";
                }
              }}
              onMouseLeave={(e) => {
                if (l.code !== lang) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = textColor;
                }
              }}
            >
              <span>{l.native}</span>
              <span style={{ opacity: 0.5 }}>{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

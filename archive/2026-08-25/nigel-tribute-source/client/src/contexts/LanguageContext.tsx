/**
 * LanguageContext — i18n state management
 * Provides current language code and translation function to all components.
 * Stores selection in localStorage under "iaai-lang".
 * 8 languages: EN, ZH, KO, JA, HI, AR, ES, VI
 */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// Import all translation files
import en from "@/i18n/en.json";
import zh from "@/i18n/zh.json";
import ko from "@/i18n/ko.json";
import ja from "@/i18n/ja.json";
import hi from "@/i18n/hi.json";
import ar from "@/i18n/ar.json";
import es from "@/i18n/es.json";
import vi from "@/i18n/vi.json";

export type LangCode = "EN" | "ZH" | "KO" | "JA" | "HI" | "AR" | "ES" | "VI";

const translations: Record<LangCode, Record<string, string>> = {
  EN: en,
  ZH: zh,
  KO: ko,
  JA: ja,
  HI: hi,
  AR: ar,
  ES: es,
  VI: vi,
};

interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("iaai-lang") as LangCode) || "EN";
    }
    return "EN";
  });

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    localStorage.setItem("iaai-lang", code);
  }, []);

  const t = useCallback(
    (key: string): string => {
      // Look up in current language, fall back to English, fall back to key
      return translations[lang]?.[key] ?? translations["EN"]?.[key] ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { t } = useContext(LanguageContext);
  return t;
}

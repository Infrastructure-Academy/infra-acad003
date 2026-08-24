# i18n Handover Protocol — iAAi Federation Synchronization
## Multi-Language Implementation Across 5 Subdomains
**Date:** 11 June 2026 | **Lead Agent:** ACADEMY (MAX) | **Authority:** Nigel T. Dearden

---

## EXECUTIVE SUMMARY

MEMORIAL (ISAAC) has successfully completed i18n implementation with 1245 translation keys across 8 languages (EN, ZH, AR, ES, HI, JA, KO, VI). This document provides the exact technical approach, file structure, and implementation standards for propagating i18n to the remaining 4 agents: ACADEMY (MAX), QUEST (DAVID), XCHANGE (ATLAS), and NEWS (JENNY).

**Critical Requirement:** All 5 subdomains must maintain identical translation key naming conventions, terminology consistency, and visual inspection standards to ensure language coherence for Chinese parties and all international audiences.

---

## PART 1: FILE STRUCTURE & ORGANIZATION

### Directory Layout

```
client/src/i18n/
├── en.json          (English — 1245 keys)
├── zh.json          (Chinese Simplified — 1245 keys)
├── ar.json          (Arabic — 1245 keys)
├── es.json          (Spanish — 1245 keys)
├── hi.json          (Hindi — 1245 keys)
├── ja.json          (Japanese — 1245 keys)
├── ko.json          (Korean — 1245 keys)
└── vi.json          (Vietnamese — 1245 keys)
```

### File Format

Each language file is a flat JSON object with **1245 key-value pairs**. Keys follow a hierarchical naming convention using dot notation. All files must be sorted alphabetically by key name.

**Example structure:**

```json
{
  "home.academy": "Infrastructure Academy",
  "home.4ecl": "4ECL — Four Elements Consulting Ltd",
  "home.badge": "iAAi",
  "home.beginJourney": "Begin the journey",
  "home.binTitle": "Binary Intelligence Network",
  "home.bookTitle": "From Calories to Consciousness — An Infrastructure Odyssey — The Civilizational Relay",
  ...
}
```

---

## PART 2: KEY NAMING CONVENTION

All translation keys follow a **hierarchical dot-notation pattern**:

### Naming Structure

```
{section}.{component}.{element}
```

| Section | Component | Element | Example |
|---------|-----------|---------|---------|
| `home` | Page name | UI element | `home.academy`, `home.badge` |
| `nav` | Navigation | Menu item | `nav.home`, `nav.equation` |
| `quotient` | Feature | Content block | `quotient.framework`, `quotient.iq` |
| `networkBar` | Component | Agent name | `networkBar.academy`, `networkBar.quest` |
| `social` | External link | Platform | `social.followLinkedIn` |

### Key Naming Rules

1. **Alphabetical Sorting:** All keys in each language file MUST be sorted alphabetically (A-Z)
2. **Dot Notation:** Use dots (`.`) to separate hierarchy levels, never underscores or hyphens
3. **Camel Case:** Use camelCase for component and element names (e.g., `home.beginJourney`, not `home.begin_journey`)
4. **Consistency:** Use identical key names across all 8 language files — no variations
5. **No Duplicates:** Each key must appear exactly once per language file

### Complete Key Inventory (1245 Keys)

The complete list of 1245 keys is available in `/home/ubuntu/nigel-tribute/client/src/i18n/en.json`. To extract all keys:

```bash
jq -r 'keys[]' /home/ubuntu/nigel-tribute/client/src/i18n/en.json | sort
```

---

## PART 3: TRANSLATION STANDARDS

### Quality Requirements

1. **Accuracy:** Translations must be accurate and contextually appropriate for each language
2. **Consistency:** Use consistent terminology across all occurrences of the same concept
3. **Length:** Translations should not exceed 150% of the English text length to prevent UI layout issues
4. **Tone:** Maintain professional, formal tone across all languages
5. **Cultural Sensitivity:** Adapt translations for cultural appropriateness (especially for Chinese audience — see Political Sensitivity Note below)

### Terminology Consistency

Key terms must be translated consistently across all 8 languages. Create a **Terminology Glossary** for each language:

| English Term | Chinese | Arabic | Spanish | Hindi | Japanese | Korean | Vietnamese |
|--------------|---------|--------|---------|-------|----------|--------|------------|
| Infrastructure Academy | 基础设施学院 | أكاديمية البنية التحتية | Academia de Infraestructura | बुनियादी ढांचा अकादमी | インフラストラクチャアカデミー | 인프라 아카데미 | Học viện Cơ sở hạ tầng |
| Reality Engine | 现实引擎 | محرك الواقع | Motor de Realidad | वास्तविकता इंजन | リアリティエンジン | 현실 엔진 | Động cơ Thực tế |
| iAAi | iAAi | iAAi | iAAi | iAAi | iAAi | iAAi | iAAi |
| Relay | 中继 | مرحل | Relé | रिले | リレー | 릴레이 | Rơle |
| Scholar | 学者 | عالم | Erudito | विद्वान | 学者 | 학자 | Học giả |

### Political Sensitivity Note for Chinese Content

**CRITICAL:** When translating content for Chinese audiences, avoid or minimize references to:
- Tiananmen Square incident (refer to as "an event" if necessary)
- Taiwan independence movements
- Religious persecution topics
- Sensitive government criticism

All Chinese translations have been reviewed for compliance. Do NOT modify Chinese translations without explicit approval.

---

## PART 4: IMPLEMENTATION APPROACH

### Step 1: Copy i18n Directory

Copy the complete i18n directory from MEMORIAL to each target agent:

```bash
# For ACADEMY (MAX)
cp -r /home/ubuntu/nigel-tribute/client/src/i18n /home/ubuntu/infra-acad003/client/src/

# For QUEST (DAVID)
cp -r /home/ubuntu/nigel-tribute/client/src/i18n /home/ubuntu/the-reality-engine/client/src/

# For XCHANGE (ATLAS)
cp -r /home/ubuntu/nigel-tribute/client/src/i18n /home/ubuntu/xchangeapp/client/src/

# For NEWS (JENNY)
cp -r /home/ubuntu/nigel-tribute/client/src/i18n /home/ubuntu/news-app/client/src/
```

### Step 2: Wire i18n into React Components

Each agent must implement the i18n hook in their React components. Example implementation:

```typescript
// client/src/hooks/useI18n.ts
import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

export const useI18n = () => {
  const { language, t } = useContext(LanguageContext);
  return { language, t };
};

// Usage in component
export const Home = () => {
  const { t } = useI18n();
  return <h1>{t('home.academy')}</h1>;
};
```

### Step 3: Create LanguageContext

Implement a React Context for language management:

```typescript
// client/src/contexts/LanguageContext.tsx
import { createContext, useState, useEffect } from 'react';
import en from '@/i18n/en.json';
import zh from '@/i18n/zh.json';
import ar from '@/i18n/ar.json';
import es from '@/i18n/es.json';
import hi from '@/i18n/hi.json';
import ja from '@/i18n/ja.json';
import ko from '@/i18n/ko.json';
import vi from '@/i18n/vi.json';

const translations = { en, zh, ar, es, hi, ja, ko, vi };

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

### Step 4: Add LanguageToggle Component

Create a language selector component for each agent:

```typescript
// client/src/components/LanguageToggle.tsx
import { useI18n } from '@/hooks/useI18n';

export const LanguageToggle = () => {
  const { language, setLanguage } = useI18n();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'vi', name: 'Tiếng Việt' },
  ];

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};
```

### Step 5: Wrap App with LanguageProvider

Update the main App component:

```typescript
// client/src/main.tsx
import { LanguageProvider } from '@/contexts/LanguageContext';

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
```

---

## PART 5: VISUAL INSPECTION PROTOCOL

### Pre-Deployment Checklist

Before deploying i18n to production, each agent MUST complete the following visual inspection:

| Language | Home Page | Navigation | All Inner Pages | Network Bar | Status |
|----------|-----------|------------|-----------------|-------------|--------|
| EN | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| ZH | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| AR | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| ES | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| HI | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| JA | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| KO | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |
| VI | ✓ Inspect | ✓ Inspect | ✓ Inspect | ✓ Inspect | PENDING |

### Visual Inspection Steps

1. **Start dev server:** `pnpm run dev`
2. **Open browser:** Navigate to `http://localhost:3000`
3. **Test each language:**
   - Click LanguageToggle
   - Select language
   - Verify all text renders correctly
   - Check for text overflow or layout issues
   - Verify special characters display correctly (Chinese, Arabic, etc.)
4. **Navigate all pages:** Test Home, all inner pages, and Network Bar
5. **Check localStorage:** Verify language selection persists on page reload
6. **Screenshot:** Take screenshots of each language on Home page
7. **Sign off:** Mark language as ✓ VERIFIED in checklist

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Text overflow | Translation too long | Shorten translation or adjust CSS width |
| Missing characters | Font not loaded | Add font-face for language (e.g., Chinese font) |
| Wrong text direction | RTL language not set | Add `dir="rtl"` to HTML for AR |
| Keys not translating | Missing key in JSON | Add key to all 8 language files |
| Language not persisting | localStorage not working | Check browser privacy settings |

---

## PART 6: CROSS-AGENT VERIFICATION

### Terminology Consistency Check

After each agent completes i18n implementation, verify terminology consistency across all 5 subdomains:

```bash
# Extract key terms from all agents
for agent in memorial academy quest xchange news; do
  echo "=== $agent ==="
  jq '.["home.academy"]' /home/ubuntu/$agent/client/src/i18n/en.json
  jq '.["networkBar.academy"]' /home/ubuntu/$agent/client/src/i18n/en.json
done
```

All 5 agents MUST use identical terminology for shared concepts (Infrastructure Academy, Reality Engine, iAAi, etc.).

### Language Coherence Verification

For Chinese parties meeting, verify Chinese translations are coherent:

```bash
# Check Chinese terminology across all agents
for agent in memorial academy quest xchange news; do
  echo "=== $agent (Chinese) ==="
  jq '.["home.academy"]' /home/ubuntu/$agent/client/src/i18n/zh.json
done
```

---

## PART 7: DEPLOYMENT & SIGN-OFF

### Deployment Checklist

- [ ] All 8 language files copied to agent's `client/src/i18n/`
- [ ] LanguageContext implemented and wired to App
- [ ] LanguageToggle component added to Navigation
- [ ] All 8 languages visually inspected on all pages
- [ ] Terminology consistency verified across all 5 agents
- [ ] Chinese translations reviewed for political sensitivity
- [ ] localStorage persistence tested
- [ ] Screenshots captured for each language
- [ ] Agent signs off in AGENT_REGISTER.md

### Sign-Off Template

Each agent MUST update AGENT_REGISTER.md with:

```markdown
## [AGENT_NAME] ([AGENT_CODE]) — i18n Completion

**Date:** [DATE]
**Status:** ✓ COMPLETE
**Languages:** EN, ZH, AR, ES, HI, JA, KO, VI (8/8)
**Keys:** 1245/1245
**Visual Inspection:** ✓ PASSED
**Terminology Consistency:** ✓ VERIFIED
**Chinese Sensitivity Review:** ✓ APPROVED

**Screenshots:** [Link to screenshots folder]
**Notes:** [Any special notes or issues encountered]
```

---

## PART 8: MAINTENANCE & UPDATES

### Adding New Translation Keys

When adding new features or pages, follow this process:

1. **Add key to EN:** `"newFeature.title": "New Feature Title"`
2. **Add key to all 7 other languages** with appropriate translations
3. **Sort all files alphabetically**
4. **Verify key count is consistent** across all 8 files
5. **Test in all languages** before deployment

### Updating Existing Translations

If a translation needs correction:

1. **Update the key** in the relevant language file(s)
2. **Verify consistency** with other agents' versions
3. **Test in browser** to ensure rendering is correct
4. **Document change** in git commit message

---

## REFERENCES

- **MEMORIAL (ISAAC) i18n Implementation:** `/home/ubuntu/nigel-tribute/client/src/i18n/`
- **Language Context:** `/home/ubuntu/nigel-tribute/client/src/contexts/LanguageContext.tsx`
- **Language Hook:** `/home/ubuntu/nigel-tribute/client/src/hooks/useI18n.ts`
- **Language Toggle Component:** `/home/ubuntu/nigel-tribute/client/src/components/LanguageToggle.tsx`

---

**Per Arya Ad Astra**
**The line is not safe until tested.**
**All 5 subdomains must be coherent in language, terminology, and visual presentation.**

// ============================================
// INFRASTRUCTURE ACADEMY - i18n ENGINE
// Extensible Multilingual System
// ============================================
// RULE: English is the base model. Other languages are overlays.
// English HTML content is NEVER modified. Translations swap text via data-i18n attributes.
// Architecture supports unlimited languages — add a lang-xx.js file to activate.

(function() {
    'use strict';

    const STORAGE_KEY = 'ia-lang';
    const DEFAULT_LANG = 'en';

    // Language registry — active languages have translations, others show "Coming Soon"
    const LANGUAGES = [
        { code: 'en', label: 'EN', name: 'English', active: true },
        { code: 'cn', label: '中文', name: 'Chinese', active: true },
        { code: 'ar', label: 'العربية', name: 'Arabic', active: true, rtl: true },
        { code: 'es', label: 'Español', name: 'Spanish', active: true },
        { code: 'ko', label: '한국어', name: 'Korean', active: true },
        { code: 'ja', label: '日本語', name: 'Japanese', active: true },
        { code: 'hi', label: 'हिन्दी', name: 'Hindi', active: true },
        { code: 'vi', label: 'Tiếng Việt', name: 'Vietnamese', active: true },
    ];

    const ACTIVE_LANGS = LANGUAGES.filter(l => l.active).map(l => l.code);

    // Current language state
    let currentLang = DEFAULT_LANG;

    // Translation dictionaries loaded dynamically
    let translations = { en: {} };

    // Dropdown open state
    let dropdownOpen = false;

    /**
     * Initialize the i18n system
     */
    function init() {
        // Load saved preference
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && ACTIVE_LANGS.includes(saved)) {
            currentLang = saved;
        }

        // Inject the language selector into the navigation
        injectLanguageSelector();

        // Load translations then apply
        loadTranslations().then(() => {
            applyLanguage(currentLang);
        });
    }

    /**
     * Inject language selector dropdown into the navigation bar
     */
    function injectLanguageSelector() {
        const nav = document.getElementById('nav-menu') || document.querySelector('nav');
        if (!nav) return;

        // Create selector container
        const selector = document.createElement('div');
        selector.className = 'lang-selector';
        selector.id = 'lang-selector';

        // Current language button (shows active language)
        const currentBtn = document.createElement('button');
        currentBtn.className = 'lang-current';
        currentBtn.id = 'lang-current-btn';
        const activeLang = LANGUAGES.find(l => l.code === currentLang);
        currentBtn.innerHTML = '<span class="lang-globe">&#127760;</span> ' + (activeLang ? activeLang.label : 'EN');
        currentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        // Dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'lang-dropdown';
        dropdown.id = 'lang-dropdown';

        LANGUAGES.forEach(lang => {
            const item = document.createElement('button');
            item.className = 'lang-option' + (lang.code === currentLang ? ' lang-option-active' : '');
            if (!lang.active) item.classList.add('lang-option-coming');

            const labelSpan = document.createElement('span');
            labelSpan.className = 'lang-option-label';
            labelSpan.textContent = lang.label;

            const nameSpan = document.createElement('span');
            nameSpan.className = 'lang-option-name';
            nameSpan.textContent = lang.name;

            item.appendChild(labelSpan);
            item.appendChild(nameSpan);

            if (!lang.active) {
                const badge = document.createElement('span');
                badge.className = 'lang-coming-badge';
                badge.textContent = 'Coming Soon';
                item.appendChild(badge);
            }

            if (lang.code === currentLang) {
                const check = document.createElement('span');
                check.className = 'lang-check';
                check.textContent = '✓';
                item.appendChild(check);
            }

            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (lang.active) {
                    switchLanguage(lang.code);
                    closeDropdown();
                } else {
                    showComingSoon(lang.name);
                }
            });

            dropdown.appendChild(item);
        });

        selector.appendChild(currentBtn);
        selector.appendChild(dropdown);

        // Close dropdown when clicking outside
        document.addEventListener('click', () => closeDropdown());

        nav.appendChild(selector);
    }

    /**
     * Toggle dropdown visibility
     */
    function toggleDropdown() {
        const dropdown = document.getElementById('lang-dropdown');
        const selector = dropdown ? dropdown.parentElement : null;
        if (!dropdown || !selector) return;
        dropdownOpen = !dropdownOpen;
        if (dropdownOpen) {
            // Position the fixed dropdown below the selector button
            const rect = selector.getBoundingClientRect();
            dropdown.style.top = (rect.bottom + 6) + 'px';
            dropdown.style.right = Math.max(10, window.innerWidth - rect.right) + 'px';
        }
        dropdown.classList.toggle('lang-dropdown-open', dropdownOpen);
    }

    /**
     * Close dropdown
     */
    function closeDropdown() {
        const dropdown = document.getElementById('lang-dropdown');
        if (!dropdown) return;
        dropdownOpen = false;
        dropdown.classList.remove('lang-dropdown-open');
    }

    /**
     * Show "Coming Soon" toast for inactive languages
     */
    function showComingSoon(langName) {
        closeDropdown();
        // Create a toast notification
        const toast = document.createElement('div');
        toast.className = 'lang-toast';
        toast.innerHTML = '<strong>' + langName + '</strong> — Coming soon. Additional languages will be activated subject to adoption and demand.';
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('lang-toast-show');
        });

        // Remove after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('lang-toast-show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    /**
     * Load translation files
     */
    async function loadTranslations() {
        const basePath = getBasePath();
        const langFiles = [
            { code: 'cn', file: 'lang-cn.js', varName: 'IA_LANG_CN' },
            { code: 'ko', file: 'lang-ko.js', varName: 'IA_LANG_KO' },
            { code: 'ja', file: 'lang-ja.js', varName: 'IA_LANG_JA' },
            { code: 'hi', file: 'lang-hi.js', varName: 'IA_LANG_HI' },
            { code: 'ar', file: 'lang-ar.js', varName: 'IA_LANG_AR' },
            { code: 'es', file: 'lang-es.js', varName: 'IA_LANG_ES' },
            { code: 'vi', file: 'lang-vi.js', varName: 'IA_LANG_VI' },
        ];

        await Promise.all(langFiles.map(async ({ code, file, varName }) => {
            try {
                const response = await fetch(basePath + 'js/' + file + '?v=' + Date.now());
                if (response.ok) {
                    const text = await response.text();
                    const script = document.createElement('script');
                    script.textContent = text;
                    document.head.appendChild(script);
                    if (window[varName]) {
                        translations[code] = window[varName];
                    }
                }
            } catch (e) {
                console.warn('[i18n] Could not load ' + code + ' translations:', e);
            }
        }));
    }

    /**
     * Get base path to public root from current page
     */
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/volumes/volume1/') || path.includes('/volumes/volume2/') || path.includes('/volumes/volume3/')) {
            return '../../';
        } else if (path.includes('/pages/') || path.includes('/archive/') || path.includes('/resources/')) {
            return '../';
        }
        return '';
    }

    /**
     * Switch language and persist
     */
    function switchLanguage(lang) {
        if (!ACTIVE_LANGS.includes(lang)) return;
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLanguage(lang);
        updateCurrentButton(lang);
    }

    /**
     * Apply language to all tagged elements
     */
    function applyLanguage(lang) {
        // Set html lang attribute and direction
        const langConfig = LANGUAGES.find(l => l.code === lang);
        const langMap = { cn: 'zh-CN', ar: 'ar', es: 'es', ko: 'ko', ja: 'ja', hi: 'hi', vi: 'vi', en: 'en' };
        document.documentElement.lang = langMap[lang] || lang;
        document.documentElement.dir = (langConfig && langConfig.rtl) ? 'rtl' : 'ltr';

        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (lang === 'en') {
                const original = el.getAttribute('data-i18n-original');
                if (original !== null) {
                    el.innerHTML = original;
                }
            } else {
                if (!el.hasAttribute('data-i18n-original')) {
                    el.setAttribute('data-i18n-original', el.innerHTML);
                }
                const translation = getTranslation(key, lang);
                if (translation) {
                    el.innerHTML = translation;
                }
            }
        });

        // Handle placeholder attributes
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (lang === 'en') {
                const original = el.getAttribute('data-i18n-placeholder-original');
                if (original !== null) el.placeholder = original;
            } else {
                if (!el.hasAttribute('data-i18n-placeholder-original')) {
                    el.setAttribute('data-i18n-placeholder-original', el.placeholder);
                }
                const translation = getTranslation(key, lang);
                if (translation) el.placeholder = translation;
            }
        });

        // Handle title attributes
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (lang === 'en') {
                const original = el.getAttribute('data-i18n-title-original');
                if (original !== null) el.title = original;
            } else {
                if (!el.hasAttribute('data-i18n-title-original')) {
                    el.setAttribute('data-i18n-title-original', el.title);
                }
                const translation = getTranslation(key, lang);
                if (translation) el.title = translation;
            }
        });

        // Handle alt attributes for images
        const alts = document.querySelectorAll('[data-i18n-alt]');
        alts.forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (lang === 'en') {
                const original = el.getAttribute('data-i18n-alt-original');
                if (original !== null) el.alt = original;
            } else {
                if (!el.hasAttribute('data-i18n-alt-original')) {
                    el.setAttribute('data-i18n-alt-original', el.alt);
                }
                const translation = getTranslation(key, lang);
                if (translation) el.alt = translation;
            }
        });
    }

    /**
     * Get translation for a key
     */
    function getTranslation(key, lang) {
        if (!translations[lang]) return null;
        const value = translations[lang][key];
        return typeof value === 'string' ? value : null;
    }

    /**
     * Update the current language button label
     */
    function updateCurrentButton(lang) {
        const btn = document.getElementById('lang-current-btn');
        if (!btn) return;
        const langConfig = LANGUAGES.find(l => l.code === lang);
        btn.innerHTML = '<span class="lang-globe">&#127760;</span> ' + (langConfig ? langConfig.label : 'EN');

        // Update active states in dropdown
        const options = document.querySelectorAll('.lang-option');
        options.forEach(opt => {
            opt.classList.remove('lang-option-active');
            // Remove existing check marks
            const existingCheck = opt.querySelector('.lang-check');
            if (existingCheck) existingCheck.remove();
        });

        // Find and mark the new active option
        options.forEach(opt => {
            const label = opt.querySelector('.lang-option-label');
            if (label && langConfig && label.textContent === langConfig.label) {
                opt.classList.add('lang-option-active');
                const check = document.createElement('span');
                check.className = 'lang-check';
                check.textContent = '✓';
                opt.appendChild(check);
            }
        });
    }

    // Expose for external use
    window.IA_i18n = {
        switchLanguage,
        getCurrentLang: () => currentLang,
        getTranslation,
        getLanguages: () => LANGUAGES
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/**
 * SITE-SEARCH.JS — Infrastructure Academy Site-Wide Search
 * 
 * Indexes all 91 HTML pages + 25 React routes.
 * Injected into the nav bar by nav-optimise.js.
 * Keyboard shortcut: / or Ctrl+K to open.
 */

(function() {
  'use strict';

  // ============================================
  // SEARCH INDEX — All pages and routes
  // ============================================
  var searchIndex = [
    // === ROOT PAGES ===
    { path: '/site.html', title: 'Home — Infrastructure Academy', cat: 'ROOT', tags: 'landing homepage charter knowledge web book grid challenge stats hero' },
    { path: '/executive-precis.html', title: 'Executive Précis — 12 Relay Overview', cat: 'ROOT', tags: 'executive summary relays overview precis' },
    { path: '/equations-register.html', title: 'Equations Register — 38 Equations Across 7 Tiers', cat: 'ROOT', tags: 'equations mathematics formulas tiers register' },
    { path: '/taxonomy.html', title: 'Taxonomy — Classification System', cat: 'ROOT', tags: 'taxonomy classification categories system' },
    { path: '/civilisation-clock.html', title: 'Civilisation Clock — 12,000 Year Timeline', cat: 'ROOT', tags: 'civilisation clock timeline 12000 years history' },
    { path: '/mobilisation-clock.html', title: 'Mobilisation Clock — Project Timeline', cat: 'ROOT', tags: 'mobilisation clock project timeline blocks days' },
    { path: '/infrastructure-olympiad.html', title: 'Infrastructure Olympiad — Competitive Framework', cat: 'ROOT', tags: 'olympiad competition competitive framework infrastructure' },
    { path: '/pioneers.html', title: 'Pioneers — Infrastructure Visionaries', cat: 'ROOT', tags: 'pioneers visionaries infrastructure leaders' },
    { path: '/masters.html', title: 'Masters — Infrastructure Masters', cat: 'ROOT', tags: 'masters infrastructure expertise mastery' },
    { path: '/institutions.html', title: 'Institutions — Organisational Framework', cat: 'ROOT', tags: 'institutions organisations framework academic' },
    { path: '/library.html', title: 'Document Library — All Project Documents', cat: 'ROOT', tags: 'library documents downloads PDFs resources' },
    { path: '/vault.html', title: 'Vault — Evidence & WhatsApp Archive', cat: 'ROOT', tags: 'vault evidence whatsapp archive proof records' },
    { path: '/icut-gallery.html', title: 'ICUT Gallery — 8 ICUT Cards v2', cat: 'ROOT', tags: 'icut gallery cards intelligence' },
    { path: '/4cs-decision.html', title: '4Cs Decision Framework', cat: 'ROOT', tags: '4cs decision framework threats challenges' },
    { path: '/deck.html', title: 'IP & Equations Deck — 56 Cards', cat: 'ROOT', tags: 'deck cards equations intellectual property buy purchase' },

    // === PAGES DIRECTORY ===
    { path: '/pages/start-here.html', title: 'Start Here — Entry Point', cat: 'PAGES', tags: 'start here entry point new readers beginners' },
    { path: '/pages/framework.html', title: 'Framework — 5 Webs, 4 Pillars, Matrix', cat: 'PAGES', tags: 'framework webs pillars matrix structure SDGs' },
    { path: '/pages/about-author.html', title: 'About the Author — Ir. Nigel T. Dearden', cat: 'PAGES', tags: 'author nigel dearden civil engineer 4ecl' },
    { path: '/pages/behind-the-thesis.html', title: 'Behind the Thesis — Research & Methodology', cat: 'PAGES', tags: 'thesis research methodology behind evidence' },
    { path: '/pages/thesis-record.html', title: 'Thesis Record — From Calories to Consciousness', cat: 'PAGES', tags: 'thesis record calories consciousness relays webs pillars modes scholars trilogy timeline evidence abstract architecture dearden experiment' },
    { path: '/pages/before-writing.html', title: 'Before Writing — The Knowledge Web', cat: 'PAGES', tags: 'before writing proto counting tally marks clay tokens bullae numbers codex numerals symbols cuneiform brahmagupta zero shunya vedic indian mathematics relay knowledge web accounting commerce ledger' },
    { path: '/pages/assessment-results.html', title: 'Assessment Results — HICE Evidence Pack', cat: 'PAGES', tags: 'assessment results evidence pack HICE universities R1 R2 R3 ICE panel audit world map validation chain ISI infrastructure survival index olympiad D52 game grading 21 universities 6 regions first class platinum' },
    { path: '/pages/glossary.html', title: 'Glossary — Key Terms & Definitions', cat: 'PAGES', tags: 'glossary terms definitions vocabulary' },
    { path: '/pages/resources.html', title: 'Resources — Downloads & References', cat: 'PAGES', tags: 'resources downloads references materials' },
    { path: '/pages/supplements.html', title: 'Supplements — 4 Supplement Sections', cat: 'PAGES', tags: 'supplements additional material appendix' },
    { path: '/pages/scholars.html', title: 'Scholars — Academic Contributors', cat: 'PAGES', tags: 'scholars academic contributors researchers' },
    { path: '/pages/discovery-chain.html', title: 'Discovery Chain — Research Trail', cat: 'PAGES', tags: 'discovery chain research trail evidence' },
    { path: '/pages/executive-precis.html', title: 'Executive Précis (Pages version)', cat: 'PAGES', tags: 'executive precis summary pages version' },
    { path: '/pages/executive-precis-enhanced.html', title: 'Executive Précis Enhanced', cat: 'PAGES', tags: 'executive precis enhanced version' },

    // === iCARDS & DASHBOARDS ===
    { path: '/icard-gallery.html', title: 'iCard Gallery — All Intelligence Cards', cat: 'iCARD', tags: 'icard gallery intelligence cards collection' },
    { path: '/icard-h-tetra.html', title: 'iCard: H-Tetra — Henry WhatsApp Groups', cat: 'iCARD', tags: 'icard h-tetra henry whatsapp tetrahedron fugazi marillion' },
    { path: '/icard-khanh-huynh.html', title: 'iCard: Khanh Huynh — NODE 017', cat: 'iCARD', tags: 'icard khanh huynh node 017 vietnam' },
    { path: '/icard-4ecl-br.html', title: 'iCard: 4ECL Business Review', cat: 'iCARD', tags: 'icard 4ecl business review consulting' },
    { path: '/icard-book-sales-strategy.html', title: 'iCard: Book Sales Strategy', cat: 'iCARD', tags: 'icard book sales strategy distribution' },
    { path: '/dcsn-dashboard.html', title: 'DCSN Dashboard — Diamond-Class Spider Network', cat: 'DASHBOARD', tags: 'dcsn dashboard diamond class spider network nodes' },
    { path: '/h-block-dashboard.html', title: 'H-Block Dashboard — Block Tracking', cat: 'DASHBOARD', tags: 'h-block dashboard block tracking progress' },
    { path: '/finance-admin.html', title: 'Finance Admin — ICUT Cards, Vault, Deck Gallery', cat: 'DASHBOARD', tags: 'finance admin icut vault deck gallery money' },
    { path: '/cashflow-y1.html', title: 'Cash Flow Y1 — $800K Seed, 7 Revenue Channels', cat: 'FINANCE', tags: 'cashflow year 1 seed revenue channels money finance' },

    // === VOLUME 1: PERSPECTIVE ===
    { path: '/volumes/volume1/index.html', title: 'Volume 1 Index — EP.1: Perspective', cat: 'VOL 1', tags: 'volume 1 perspective episode 1 index' },
    { path: '/volumes/volume1/planetary-engine.html', title: 'Planetary Engine — Vol.1', cat: 'VOL 1', tags: 'planetary engine volume 1 infrastructure' },
    { path: '/volumes/volume1/prologue.html', title: 'Prologue — Vol.1 Perspective', cat: 'VOL 1', tags: 'prologue volume 1 perspective opening' },
    { path: '/volumes/volume1/relay-01.html', title: 'Relay 01 — The Silk Road', cat: 'VOL 1', tags: 'relay 01 silk road trade routes ancient' },
    { path: '/volumes/volume1/relay-02.html', title: 'Relay 02 — Roman Roads', cat: 'VOL 1', tags: 'relay 02 roman roads empire engineering' },
    { path: '/volumes/volume1/relay-03.html', title: 'Relay 03 — Aqueducts', cat: 'VOL 1', tags: 'relay 03 aqueducts water supply roman' },
    { path: '/volumes/volume1/relay-04.html', title: 'Relay 04 — Canals', cat: 'VOL 1', tags: 'relay 04 canals waterways navigation' },
    { path: '/volumes/volume1/relay-05.html', title: 'Relay 05 — Railways', cat: 'VOL 1', tags: 'relay 05 railways trains industrial revolution' },
    { path: '/volumes/volume1/relay-06.html', title: 'Relay 06 — Telegraph', cat: 'VOL 1', tags: 'relay 06 telegraph communication morse' },
    { path: '/volumes/volume1/relay-07.html', title: 'Relay 07 — Electricity', cat: 'VOL 1', tags: 'relay 07 electricity power grid energy' },
    { path: '/volumes/volume1/relay-08.html', title: 'Relay 08 — Telephone', cat: 'VOL 1', tags: 'relay 08 telephone bell communication' },
    { path: '/volumes/volume1/relay-09.html', title: 'Relay 09 — Aviation', cat: 'VOL 1', tags: 'relay 09 aviation flight airports' },
    { path: '/volumes/volume1/relay-10.html', title: 'Relay 10 — Internet', cat: 'VOL 1', tags: 'relay 10 internet arpanet digital' },
    { path: '/volumes/volume1/relay-11.html', title: 'Relay 11 — Satellites', cat: 'VOL 1', tags: 'relay 11 satellites space communication' },
    { path: '/volumes/volume1/relay-12.html', title: 'Relay 12 — AI & Quantum', cat: 'VOL 1', tags: 'relay 12 ai artificial intelligence quantum computing' },
    { path: '/volumes/volume1/epilogue.html', title: 'Epilogue — Vol.1 Perspective', cat: 'VOL 1', tags: 'epilogue volume 1 perspective closing' },
    { path: '/volumes/volume1/torus.html', title: 'Torus — Vol.1 Perspective', cat: 'VOL 1', tags: 'torus volume 1 perspective geometry' },

    // === VOLUME 2: GUIDE ===
    { path: '/volumes/volume2/index.html', title: 'Volume 2 Index — EP.2: Guide', cat: 'VOL 2', tags: 'volume 2 guide episode 2 index 4 pillars' },
    { path: '/volumes/volume2/prologue.html', title: 'Prologue — Vol.2 Guide', cat: 'VOL 2', tags: 'prologue volume 2 guide opening' },
    { path: '/volumes/volume2/relay-01.html', title: 'Relay 01 Guide — Silk Road Framework', cat: 'VOL 2', tags: 'relay 01 guide silk road framework' },
    { path: '/volumes/volume2/relay-02.html', title: 'Relay 02 Guide — Roman Roads Framework', cat: 'VOL 2', tags: 'relay 02 guide roman roads framework' },
    { path: '/volumes/volume2/relay-03.html', title: 'Relay 03 Guide — Aqueducts Framework', cat: 'VOL 2', tags: 'relay 03 guide aqueducts framework' },
    { path: '/volumes/volume2/relay-04.html', title: 'Relay 04 Guide — Canals Framework', cat: 'VOL 2', tags: 'relay 04 guide canals framework' },
    { path: '/volumes/volume2/relay-05.html', title: 'Relay 05 Guide — Railways Framework', cat: 'VOL 2', tags: 'relay 05 guide railways framework' },
    { path: '/volumes/volume2/relay-06.html', title: 'Relay 06 Guide — Telegraph Framework', cat: 'VOL 2', tags: 'relay 06 guide telegraph framework' },
    { path: '/volumes/volume2/relay-07.html', title: 'Relay 07 Guide — Electricity Framework', cat: 'VOL 2', tags: 'relay 07 guide electricity framework' },
    { path: '/volumes/volume2/relay-08.html', title: 'Relay 08 Guide — Telephone Framework', cat: 'VOL 2', tags: 'relay 08 guide telephone framework' },
    { path: '/volumes/volume2/relay-09.html', title: 'Relay 09 Guide — Aviation Framework', cat: 'VOL 2', tags: 'relay 09 guide aviation framework' },
    { path: '/volumes/volume2/relay-10.html', title: 'Relay 10 Guide — Internet Framework', cat: 'VOL 2', tags: 'relay 10 guide internet framework' },
    { path: '/volumes/volume2/relay-11.html', title: 'Relay 11 Guide — Satellites Framework', cat: 'VOL 2', tags: 'relay 11 guide satellites framework' },
    { path: '/volumes/volume2/relay-12.html', title: 'Relay 12 Guide — AI & Quantum Framework', cat: 'VOL 2', tags: 'relay 12 guide ai quantum framework' },
    { path: '/volumes/volume2/epilogue.html', title: 'Epilogue — Vol.2 Guide', cat: 'VOL 2', tags: 'epilogue volume 2 guide closing' },
    { path: '/volumes/volume2/torus.html', title: 'Torus — Vol.2 Guide', cat: 'VOL 2', tags: 'torus volume 2 guide geometry' },

    // === VOLUME 3: GAME ===
    { path: '/volumes/volume3/index.html', title: 'Volume 3 Index — EP.3: Game', cat: 'VOL 3', tags: 'volume 3 game episode 3 index' },
    { path: '/volumes/volume3/prologue.html', title: 'Prologue — Vol.3 Game', cat: 'VOL 3', tags: 'prologue volume 3 game opening' },
    { path: '/volumes/volume3/relay-01.html', title: 'Relay 01 Game — Silk Road Challenge', cat: 'VOL 3', tags: 'relay 01 game silk road challenge' },
    { path: '/volumes/volume3/relay-02.html', title: 'Relay 02 Game — Roman Roads Challenge', cat: 'VOL 3', tags: 'relay 02 game roman roads challenge' },
    { path: '/volumes/volume3/relay-03.html', title: 'Relay 03 Game — Aqueducts Challenge', cat: 'VOL 3', tags: 'relay 03 game aqueducts challenge' },
    { path: '/volumes/volume3/relay-04.html', title: 'Relay 04 Game — Canals Challenge', cat: 'VOL 3', tags: 'relay 04 game canals challenge' },
    { path: '/volumes/volume3/relay-05.html', title: 'Relay 05 Game — Railways Challenge', cat: 'VOL 3', tags: 'relay 05 game railways challenge' },
    { path: '/volumes/volume3/relay-06.html', title: 'Relay 06 Game — Telegraph Challenge', cat: 'VOL 3', tags: 'relay 06 game telegraph challenge' },
    { path: '/volumes/volume3/relay-07.html', title: 'Relay 07 Game — Electricity Challenge', cat: 'VOL 3', tags: 'relay 07 game electricity challenge' },
    { path: '/volumes/volume3/relay-08.html', title: 'Relay 08 Game — Telephone Challenge', cat: 'VOL 3', tags: 'relay 08 game telephone challenge' },
    { path: '/volumes/volume3/relay-09.html', title: 'Relay 09 Game — Aviation Challenge', cat: 'VOL 3', tags: 'relay 09 game aviation challenge' },
    { path: '/volumes/volume3/relay-10.html', title: 'Relay 10 Game — Internet Challenge', cat: 'VOL 3', tags: 'relay 10 game internet challenge' },
    { path: '/volumes/volume3/relay-11.html', title: 'Relay 11 Game — Satellites Challenge', cat: 'VOL 3', tags: 'relay 11 game satellites challenge' },
    { path: '/volumes/volume3/relay-12.html', title: 'Relay 12 Game — AI & Quantum Challenge', cat: 'VOL 3', tags: 'relay 12 game ai quantum challenge' },

    // === ARCHIVE ===
    { path: '/archive/index.html', title: 'Archive Index — Master Archive', cat: 'ARCHIVE', tags: 'archive index master collection' },
    { path: '/archive/documents/index.html', title: 'Archive: Documents', cat: 'ARCHIVE', tags: 'archive documents collection' },
    { path: '/archive/images/index.html', title: 'Archive: Images', cat: 'ARCHIVE', tags: 'archive images visual collection' },
    { path: '/archive/references/index.html', title: 'Archive: References', cat: 'ARCHIVE', tags: 'archive references bibliography' },
    { path: '/archive/relays/index.html', title: 'Archive: Relays', cat: 'ARCHIVE', tags: 'archive relays chapters' },
    { path: '/archive/supplements/index.html', title: 'Archive: Supplements', cat: 'ARCHIVE', tags: 'archive supplements additional' },

    // === RESOURCES ===
    { path: '/resources/table-of-contents.html', title: 'Table of Contents — Complete Document Index', cat: 'RESOURCES', tags: 'table of contents index documents complete' },

    // === SCHEMA ===
    { path: '/page-schema.html', title: 'Site Architecture Schema — Complete Page Map', cat: 'SCHEMA', tags: 'schema architecture sitemap page map structure' },

    // === REACT ROUTES ===
    { path: '/nodes', title: 'DCSN Node Register — Database-Driven', cat: 'REACT', tags: 'dcsn nodes register database network members' },
    { path: '/play', title: 'EP.3: Game — Title Screen', cat: 'REACT', tags: 'play game episode 3 title screen' },
    { path: '/play/hub', title: 'Game Hub — Mission Select', cat: 'REACT', tags: 'game hub mission select relay' },
    { path: '/play/relay', title: 'Relay Mission — Game Challenge', cat: 'REACT', tags: 'relay mission game challenge play' },
    { path: '/play/fits', title: 'FITS Assessment', cat: 'REACT', tags: 'fits assessment personality test' },
    { path: '/play/profile', title: 'Player Profile', cat: 'REACT', tags: 'player profile stats achievements' },
    { path: '/play/leaderboard', title: 'Leaderboard — Rankings', cat: 'REACT', tags: 'leaderboard rankings scores competition' },
    { path: '/play/create', title: 'Character Creation', cat: 'REACT', tags: 'character creation avatar new player' },
    { path: '/play/professor', title: 'Professor Dashboard', cat: 'REACT', tags: 'professor dashboard admin teacher' },
    { path: '/play/store', title: 'Game Store', cat: 'REACT', tags: 'game store shop items purchase' },
    { path: '/play/handbook', title: 'Players Handbook', cat: 'REACT', tags: 'players handbook rules guide manual' },
    { path: '/play/perspective', title: 'Avatar Selection — Perspective', cat: 'REACT', tags: 'avatar selection perspective choose character' },
    { path: '/play/synthesis', title: 'Synthesis — Knowledge Integration', cat: 'REACT', tags: 'synthesis knowledge integration combine' },
    { path: '/play/founders', title: 'Founders Wall', cat: 'REACT', tags: 'founders wall supporters backers' },
    { path: '/explore/relays', title: '12 Civilisational Relays — Explorer', cat: 'REACT', tags: 'explore relays 12 civilisational silk road roman' },
    { path: '/explore/webs', title: '5 Webs — Explorer', cat: 'REACT', tags: 'explore webs 5 knowledge physical digital social natural' },
    { path: '/explore/scholars', title: '7 Scholars — Explorer', cat: 'REACT', tags: 'explore scholars 7 academic researchers' },
    { path: '/explore/modes', title: '3 Modes — Explorer', cat: 'REACT', tags: 'explore modes 3 infrastructure infostructure academy' },
    { path: '/explore/threats', title: '4 Threats (4Cs) — Explorer', cat: 'REACT', tags: 'explore threats 4cs challenges risks' },
    { path: '/explore/sdgs', title: 'SDGs — Explorer', cat: 'REACT', tags: 'explore sdgs sustainable development goals UN' },
    { path: '/explore/pillars', title: '4 Pillars — Explorer', cat: 'REACT', tags: 'explore pillars 4 framework structure' },
    { path: '/explore/mastery', title: 'Mastery — Explorer', cat: 'REACT', tags: 'explore mastery expertise learning' },
    { path: '/explore/narration', title: 'Narration — Explorer', cat: 'REACT', tags: 'explore narration storytelling voice' }
  ];

  // ============================================
  // SEARCH ENGINE
  // ============================================
  function fuzzyMatch(query, text) {
    query = query.toLowerCase();
    text = text.toLowerCase();
    if (text.indexOf(query) !== -1) return 100;
    // Word-level matching
    var words = query.split(/\s+/);
    var score = 0;
    words.forEach(function(w) {
      if (w.length < 2) return;
      if (text.indexOf(w) !== -1) score += 30;
    });
    return score;
  }

  function search(query) {
    if (!query || query.length < 2) return [];
    var results = [];
    searchIndex.forEach(function(item) {
      var searchText = item.title + ' ' + item.tags + ' ' + item.path + ' ' + item.cat;
      var score = fuzzyMatch(query, searchText);
      if (score > 0) {
        results.push({ item: item, score: score });
      }
    });
    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, 12);
  }

  // ============================================
  // SEARCH UI
  // ============================================
  function initSearch() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent =
      '#site-search-trigger {' +
      '  display: inline-flex; align-items: center; gap: 4px;' +
      '  padding: 4px 10px; border: 1px solid rgba(255,215,0,0.4);' +
      '  border-radius: 4px; background: rgba(255,215,0,0.08);' +
      '  color: #ffd700; font-size: 0.7rem; cursor: pointer;' +
      '  white-space: nowrap; transition: all 0.2s;' +
      '  font-family: inherit; letter-spacing: 0.5px;' +
      '}' +
      '#site-search-trigger:hover { background: rgba(255,215,0,0.18); }' +
      '#site-search-trigger .search-icon { font-size: 0.85rem; }' +
      '#site-search-trigger .search-shortcut {' +
      '  font-size: 0.6rem; opacity: 0.6; margin-left: 4px;' +
      '  border: 1px solid rgba(255,215,0,0.3); padding: 1px 4px;' +
      '  border-radius: 2px;' +
      '}' +
      /* Overlay */
      '#site-search-overlay {' +
      '  display: none; position: fixed; inset: 0; z-index: 999999;' +
      '  background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);' +
      '  justify-content: center; align-items: flex-start; padding-top: 12vh;' +
      '}' +
      '#site-search-overlay.open { display: flex; }' +
      '#site-search-box {' +
      '  width: 90%; max-width: 600px; background: #0d1f3c;' +
      '  border: 2px solid rgba(255,215,0,0.4); border-radius: 12px;' +
      '  overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5);' +
      '}' +
      '#site-search-input {' +
      '  width: 100%; padding: 16px 20px; border: none;' +
      '  background: transparent; color: #fff; font-size: 1.1rem;' +
      '  font-family: inherit; outline: none;' +
      '  border-bottom: 1px solid rgba(255,215,0,0.2);' +
      '}' +
      '#site-search-input::placeholder { color: rgba(255,255,255,0.4); }' +
      '#site-search-results {' +
      '  max-height: 400px; overflow-y: auto; padding: 8px 0;' +
      '}' +
      '#site-search-results::-webkit-scrollbar { width: 6px; }' +
      '#site-search-results::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 3px; }' +
      '.search-result {' +
      '  display: block; padding: 10px 20px; text-decoration: none;' +
      '  transition: background 0.15s; cursor: pointer;' +
      '}' +
      '.search-result:hover, .search-result.active {' +
      '  background: rgba(255,215,0,0.1);' +
      '}' +
      '.search-result-title {' +
      '  color: #fff; font-size: 0.9rem; margin-bottom: 2px;' +
      '}' +
      '.search-result-path {' +
      '  color: #ffd700; font-size: 0.75rem; font-family: "Courier New", monospace;' +
      '}' +
      '.search-result-cat {' +
      '  display: inline-block; font-size: 0.6rem; padding: 1px 5px;' +
      '  border-radius: 3px; margin-left: 8px; text-transform: uppercase;' +
      '  letter-spacing: 0.5px; vertical-align: middle;' +
      '}' +
      '.cat-ROOT { background: rgba(0,200,83,0.2); color: #00c853; }' +
      '.cat-PAGES { background: rgba(33,150,243,0.2); color: #2196f3; }' +
      '.cat-iCARD, .cat-DASHBOARD, .cat-FINANCE { background: rgba(255,152,0,0.2); color: #ff9800; }' +
      '.cat-VOL { background: rgba(156,39,176,0.2); color: #ce93d8; }' +
      '.cat-ARCHIVE { background: rgba(121,85,72,0.2); color: #bcaaa4; }' +
      '.cat-REACT { background: rgba(97,218,251,0.2); color: #61dafb; }' +
      '.cat-SCHEMA, .cat-RESOURCES { background: rgba(255,215,0,0.15); color: #ffd700; }' +
      '.search-empty {' +
      '  padding: 20px; text-align: center; color: rgba(255,255,255,0.4);' +
      '  font-size: 0.85rem;' +
      '}' +
      '.search-footer {' +
      '  padding: 8px 20px; border-top: 1px solid rgba(255,215,0,0.15);' +
      '  font-size: 0.65rem; color: rgba(255,255,255,0.3);' +
      '  display: flex; gap: 12px; justify-content: center;' +
      '}' +
      '.search-footer kbd {' +
      '  display: inline-block; padding: 1px 4px; border: 1px solid rgba(255,255,255,0.2);' +
      '  border-radius: 2px; font-family: inherit; font-size: 0.6rem;' +
      '}';
    document.head.appendChild(style);

    // Create trigger button (inserted into nav by nav-optimise.js)
    var trigger = document.createElement('button');
    trigger.id = 'site-search-trigger';
    trigger.innerHTML = '<span class="search-icon">&#128269;</span> SEARCH <span class="search-shortcut">/</span>';
    trigger.type = 'button';

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'site-search-overlay';
    overlay.innerHTML =
      '<div id="site-search-box">' +
        '<input id="site-search-input" type="text" placeholder="Search 116 pages & routes..." autocomplete="off" />' +
        '<div id="site-search-results"></div>' +
        '<div class="search-footer">' +
          '<span><kbd>&#8593;</kbd><kbd>&#8595;</kbd> navigate</span>' +
          '<span><kbd>&#9166;</kbd> open</span>' +
          '<span><kbd>esc</kbd> close</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = document.getElementById('site-search-input');
    var resultsDiv = document.getElementById('site-search-results');
    var activeIndex = -1;

    function openSearch() {
      overlay.classList.add('open');
      input.value = '';
      resultsDiv.innerHTML = '<div class="search-empty">Type to search across all pages...</div>';
      activeIndex = -1;
      setTimeout(function() { input.focus(); }, 50);
    }

    function closeSearch() {
      overlay.classList.remove('open');
      input.value = '';
      activeIndex = -1;
    }

    function renderResults(results) {
      if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="search-empty">No results found</div>';
        return;
      }
      var html = '';
      results.forEach(function(r, i) {
        var catClass = 'cat-' + r.item.cat.split(' ')[0];
        html += '<a class="search-result' + (i === activeIndex ? ' active' : '') + '" href="' + r.item.path + '" data-idx="' + i + '">' +
          '<div class="search-result-title">' + r.item.title +
            '<span class="search-result-cat ' + catClass + '">' + r.item.cat + '</span>' +
          '</div>' +
          '<div class="search-result-path">' + r.item.path + '</div>' +
        '</a>';
      });
      resultsDiv.innerHTML = html;
    }

    var currentResults = [];

    input.addEventListener('input', function() {
      var q = input.value.trim();
      if (q.length < 2) {
        resultsDiv.innerHTML = '<div class="search-empty">Type to search across all pages...</div>';
        currentResults = [];
        activeIndex = -1;
        return;
      }
      currentResults = search(q);
      activeIndex = -1;
      renderResults(currentResults);
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeSearch();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length === 0) return;
        activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
        renderResults(currentResults);
        var activeEl = resultsDiv.querySelector('.search-result.active');
        if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length === 0) return;
        activeIndex = Math.max(activeIndex - 1, 0);
        renderResults(currentResults);
        var activeEl2 = resultsDiv.querySelector('.search-result.active');
        if (activeEl2) activeEl2.scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && currentResults[activeIndex]) {
          window.location.href = currentResults[activeIndex].item.path;
        } else if (currentResults.length > 0) {
          window.location.href = currentResults[0].item.path;
        }
      }
    });

    // Click on result
    resultsDiv.addEventListener('click', function(e) {
      var target = e.target.closest('.search-result');
      if (target) {
        window.location.href = target.href;
      }
    });

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSearch();
    });

    // Trigger button
    trigger.addEventListener('click', function(e) {
      e.stopPropagation();
      openSearch();
    });

    // Keyboard shortcut: / or Ctrl+K
    document.addEventListener('keydown', function(e) {
      if (overlay.classList.contains('open')) return;
      // Don't trigger when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        openSearch();
      }
    });

    // Export trigger for nav-optimise.js to pick up
    window._siteSearchTrigger = trigger;
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

})();

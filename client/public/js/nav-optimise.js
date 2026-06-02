/**
 * NAV-OPTIMISE.JS — Infrastructure Academy Navigation Optimisation
 * 
 * System-level UX improvement:
 * 1. Grouped dropdown navigation (22 links → 6 groups)
 * 2. Scroll progress bar
 * 3. Floating section TOC (docking dots)
 * 4. Auto-detect sections on page and build TOC
 * 
 * Include this script on any page AFTER the header.
 * It will auto-detect and transform the existing nav structure.
 */

(function() {
  'use strict';

  // ============================================
  // 1. SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.id = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  // ============================================
  // 2. FLOATING SECTION TOC (Docking Dots)
  // ============================================
  function initFloatingTOC() {
    // Find all major sections (h2 elements with IDs, or elements with specific IDs)
    var sections = [];
    var headings = document.querySelectorAll('h2[id], h3[id], [id^="panel-"], [id^="section-"], .content-box[id]');
    
    // Also find h2 elements without IDs and give them IDs
    var allH2 = document.querySelectorAll('main h2, .container h2');
    allH2.forEach(function(h2, i) {
      if (!h2.id) {
        h2.id = 'section-auto-' + i;
      }
      sections.push({
        id: h2.id,
        label: h2.textContent.trim().substring(0, 30)
      });
    });

    // Add any panel/section IDs not already captured
    headings.forEach(function(el) {
      var exists = sections.some(function(s) { return s.id === el.id; });
      if (!exists) {
        var label = el.textContent ? el.textContent.trim().substring(0, 30) : el.id.replace(/-/g, ' ');
        sections.push({ id: el.id, label: label });
      }
    });

    // Only show TOC if there are 3+ sections
    if (sections.length < 3) return;

    var toc = document.createElement('div');
    toc.className = 'floating-toc';
    toc.id = 'floating-toc';

    sections.forEach(function(section) {
      var dot = document.createElement('div');
      dot.className = 'floating-toc-dot';
      dot.setAttribute('data-label', section.label);
      dot.setAttribute('data-target', section.id);
      dot.addEventListener('click', function() {
        var target = document.getElementById(section.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      toc.appendChild(dot);
    });

    document.body.appendChild(toc);

    // Update active dot on scroll
    var tocDots = toc.querySelectorAll('.floating-toc-dot');
    window.addEventListener('scroll', function() {
      var scrollPos = window.pageYOffset + window.innerHeight / 3;
      var activeIdx = 0;
      
      sections.forEach(function(section, i) {
        var el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPos) {
          activeIdx = i;
        }
      });

      tocDots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === activeIdx);
      });
    }, { passive: true });
  }

  // ============================================
  // 3. GROUPED DROPDOWN NAVIGATION
  // ============================================
  function initGroupedNav() {
    var navRow1 = document.getElementById('nav-menu');
    var navRow2 = document.getElementById('nav-row2');
    
    if (!navRow1 && !navRow2) return;

    // Define navigation groups
    var groups = [
      {
        label: 'HOME',
        direct: true,
        href: '/site.html',
        i18n: 'nav.home'
      },
      {
        label: 'READ',
        i18n: 'nav.read',
        items: [
          { href: '/pages/start-here.html', text: 'START HERE', i18n: 'nav.starthere' },
          { href: '/volumes/volume1/index.html', text: 'EP.1: PERSPECTIVE', i18n: 'nav.ep1' },
          { href: '/volumes/volume2/index.html', text: 'EP.2: GUIDE', i18n: 'nav.ep2' },
          { href: '/executive-precis.html', text: 'EXEC PRÉCIS', i18n: 'nav.precis' },
          { href: '/pages/behind-the-thesis.html', text: 'BEHIND THE THESIS', i18n: 'nav.behind' },
          { href: '/pages/thesis-record.html', text: 'THESIS RECORD', i18n: 'nav.thesisrecord' },
          { href: '/pages/before-writing.html', text: 'BEFORE WRITING', i18n: 'nav.beforewriting' },
          { href: '/pages/assessment-results.html', text: 'ASSESSMENT RESULTS', i18n: 'nav.assessmentresults' },
          { href: '/pages/turing-paper.html', text: 'TURING PAPER', i18n: 'nav.turingpaper' },
          { href: '/pages/milestones.html', text: 'MILESTONES', i18n: 'nav.milestones' },
          { href: '/pages/bibliography.html', text: 'BIBLIOGRAPHY', i18n: 'nav.bibliography' },
          { href: '/pages/civilisational-divide.html', text: 'THE CIVILISATIONAL DIVIDE', i18n: 'nav.divide' }
        ]
      },
      {
        label: 'EXPLORE',
        i18n: 'nav.explore',
        items: [
          { href: '/pages/framework.html', text: 'FRAMEWORK', i18n: 'nav.framework' },
          { href: '/taxonomy.html', text: 'TAXONOMY', i18n: 'nav.taxonomy' },
          { href: '/civilisation-clock.html', text: 'CIVILISATION CLOCK', i18n: 'nav.civclock' },
          { href: '/mobilisation-clock.html', text: 'MOBILISATION CLOCK', i18n: 'nav.clock' },
          { href: '/infrastructure-olympiad.html', text: 'OLYMPIAD', i18n: 'nav.olympiad' },
          { href: '/explore/relays', text: '12 RELAYS', i18n: 'nav.relays' },
          { href: '/explore/webs', text: '5 WEBS', i18n: 'nav.webs' },
          { href: '/explore/scholars', text: '7 SCHOLARS', i18n: 'nav.scholars' },
          { href: '/explore/modes', text: '3 MODES', i18n: 'nav.modes' },
          { href: '/explore/threats', text: '4 THREATS (4Cs)', i18n: 'nav.threats' },
          { href: '/explore/sdgs', text: 'SDGs', i18n: 'nav.sdgs' },
          { href: '/explore/pillars', text: '4 PILLARS', i18n: 'nav.pillars' },
          { href: '/explore/mastery', text: 'MASTERY', i18n: 'nav.mastery' },
          { href: '/explore/narration', text: 'NARRATION', i18n: 'nav.narration' },
          { href: '/videos', text: 'VIDEO PLAYROOM', i18n: 'nav.videos' },
          { href: '/pages/movies.html', text: 'MOVIES', i18n: 'nav.movies' },
          { href: '/pages/behind-the-thesis.html', text: 'BEHIND THE THESIS', i18n: 'nav.behind' },
          { href: '/pages/civilisational-divide.html', text: 'THE CIVILISATIONAL DIVIDE', i18n: 'nav.divide' }
        ]
      },
      {
        label: 'PEOPLE',
        i18n: 'nav.people',
        items: [
          { href: '/pioneers.html', text: 'PIONEERS', i18n: 'nav.pioneers' },
          { href: '/masters.html', text: 'MASTERS', i18n: 'nav.masters' },
          { href: '/institutions.html', text: 'INSTITUTIONS', i18n: 'nav.institutions' },
          { href: '/play/founders', text: 'FOUNDERS WALL', i18n: 'nav.founders' },
          { href: '/pages/about-author.html', text: 'AUTHOR', i18n: 'nav.author' },
          { href: '/quotes.html', text: 'QUOTES', i18n: 'nav.quotes' },
          { href: '/nodes', text: 'NODE REGISTER', i18n: 'nav.nodes' },
          { href: '/page-schema.html', text: 'SITE SCHEMA', i18n: 'nav.schema' }
        ]
      },
      {
        label: 'RESOURCES',
        i18n: 'nav.resources_group',
        columns: true,
        items: [
          { header: true, text: 'REFERENCE' },
          { href: '/library.html', text: 'DOCUMENTS', i18n: 'nav.documents' },
          { href: '/pages/resources.html', text: 'RESOURCES', i18n: 'nav.resources' },
          { href: '/pages/glossary.html', text: 'GLOSSARY', i18n: 'nav.glossary' },
          { href: '/vault.html', text: 'VAULT', i18n: 'nav.vault' },
          { href: '/equations-register.html', text: 'EQUATIONS', i18n: 'nav.equations' },
          { href: '/pages/chip-evolution.html', text: 'CHIP EVOLUTION', i18n: 'nav.chip_evolution' },
          { href: '/pages/link-register.html', text: 'LINK REGISTER', i18n: 'nav.link_register' },
          { header: true, text: 'iCARDS & TOOLS' },
          { href: '/icard-gallery.html', text: 'iCARD GALLERY', i18n: 'nav.icard_gallery' },
          { href: '/icard-register.html', text: 'iCARD REGISTER', i18n: 'nav.icard_register' },
          { href: '/icard-4ecl-br.html', text: 'iCARD: 4ECL BR', i18n: 'nav.icard_4ecl' },
          { href: '/icard-book-sales-strategy.html', text: 'iCARD: BOOK SALES', i18n: 'nav.icard_booksales' },
          { href: '/icard-h-tetra.html', text: 'iCARD: H-TETRA', i18n: 'nav.icard_htetra' },
          { href: '/icard-khanh-huynh.html', text: 'iCARD: KHANH', i18n: 'nav.icard_khanh' },
          { href: '/deck.html', text: 'CARD DECK', i18n: 'nav.deck' },
          { href: '/icut-gallery.html', text: 'ICUT GALLERY', i18n: 'nav.icut_gallery' },
          { header: true, text: 'DASHBOARDS' },
          { href: '/dcsn-dashboard.html', text: 'DCSN DASHBOARD', i18n: 'nav.dcsn' },
          { href: '/h-block-dashboard.html', text: 'H-BLOCK DASHBOARD', i18n: 'nav.hblock' },
          { href: '/finance-admin.html', text: 'FINANCE ADMIN', i18n: 'nav.finance' },
          { href: '/4cs-decision.html', text: '4Cs DECISION', i18n: 'nav.4cs_decision' },
          { href: '/cashflow-y1.html', text: 'CASH FLOW Y1', i18n: 'nav.cashflow' },
          { href: '/site.html#charter', text: 'CHARTER', i18n: 'nav.charter' },
          { href: '/site.html#section-media', text: 'VIDEO PLAYROOM', i18n: 'nav.video_playroom' }
        ]
      },
      {
        label: 'PLAY',
        direct: true,
        href: '/play',
        i18n: 'nav.ep3'
      },
      {
        label: 'PRESS KIT',
        direct: true,
        href: '/press.html',
        i18n: 'nav.press'
      }
    ];

    // Get current page path for active state
    var currentPath = window.location.pathname;
    var currentHref = currentPath.split('/').pop() || 'site.html';
    if (currentPath === '/' || currentPath === '') currentHref = 'site.html';

    // Build the grouped nav
    var groupedNav = document.createElement('nav');
    groupedNav.id = 'nav-grouped';
    groupedNav.role = 'navigation';
    groupedNav.setAttribute('aria-label', 'Primary navigation');
    // NO inline styles — all styling via injected <style> so mobile media query can override
    groupedNav.className = 'nav-grouped-bar';

    groups.forEach(function(group) {
      if (group.direct) {
        // Direct link (HOME, PLAY)
        var a = document.createElement('a');
        a.href = group.href;
        a.textContent = group.label;
        a.className = 'nav-direct-link';
        if (group.i18n) a.setAttribute('data-i18n', group.i18n);
        
        // Check active state
        if (group.href === currentHref || (group.href === 'site.html' && currentHref === 'site.html')) {
          a.classList.add('active');
        }
        
        // Hover effects handled by CSS .nav-direct-link:hover
        
        groupedNav.appendChild(a);
      } else {
        // Dropdown group
        var groupEl = document.createElement('div');
        groupEl.className = 'nav-group';

        var label = document.createElement('span');
        label.className = 'nav-group-label';
        label.textContent = group.label;
        if (group.i18n) label.setAttribute('data-i18n', group.i18n);

        var dropdown = document.createElement('div');
        dropdown.className = 'nav-group-dropdown';
        if (group.columns) dropdown.classList.add('nav-dropdown-columns');

        var hasActive = false;
        var currentCol = null;
        group.items.forEach(function(item) {
          if (item.header) {
            // Sub-group header
            var headerEl = document.createElement('div');
            headerEl.className = 'nav-dropdown-header';
            headerEl.textContent = item.text;
            if (group.columns) {
              currentCol = document.createElement('div');
              currentCol.className = 'nav-dropdown-col';
              currentCol.appendChild(headerEl);
              dropdown.appendChild(currentCol);
            } else {
              dropdown.appendChild(headerEl);
            }
            return;
          }
          var a = document.createElement('a');
          a.href = item.href;
          a.textContent = item.text;
          if (item.i18n) a.setAttribute('data-i18n', item.i18n);
          
          // Check if this item is the current page
          var itemHref = item.href.split('/').pop();
          if (currentPath.indexOf(item.href) !== -1 || currentHref === itemHref) {
            a.classList.add('active');
            hasActive = true;
          }
          
          if (currentCol) {
            currentCol.appendChild(a);
          } else {
            dropdown.appendChild(a);
          }
        });

        if (hasActive) {
          label.classList.add('active');
        }

        groupEl.appendChild(label);
        groupEl.appendChild(dropdown);

        // Touch support for mobile
        label.addEventListener('click', function(e) {
          e.stopPropagation();
          var parent = this.parentElement;
          // Close all other open groups
          document.querySelectorAll('.nav-group.open').forEach(function(g) {
            if (g !== parent) g.classList.remove('open');
          });
          parent.classList.toggle('open');
        });

        groupedNav.appendChild(groupEl);
      }
    });

    // Add search trigger if site-search.js loaded
    if (window._siteSearchTrigger) {
      groupedNav.appendChild(window._siteSearchTrigger);
    } else {
      // Wait for it to load
      var searchCheck = setInterval(function() {
        if (window._siteSearchTrigger) {
          groupedNav.appendChild(window._siteSearchTrigger);
          clearInterval(searchCheck);
        }
      }, 100);
      setTimeout(function() { clearInterval(searchCheck); }, 5000);
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
      document.querySelectorAll('.nav-group.open').forEach(function(g) {
        g.classList.remove('open');
      });
    });

    // Replace existing navs with grouped nav
    if (navRow1) {
      navRow1.style.display = 'none';
    }
    if (navRow2) {
      navRow2.style.display = 'none';
    }

    // Insert after the header-content div
    var headerContent = document.querySelector('.header-content');
    if (headerContent) {
      headerContent.parentNode.insertBefore(groupedNav, headerContent.nextSibling);
    }

    // Language selector stays in header-content (placed by i18n.js)
    // Do NOT move it into nav-grouped — nav-grouped is hidden on mobile

    // === MOBILE HAMBURGER FIX ===
    // The hamburger toggles the old nav-menu which is now hidden.
    // Re-wire it to toggle nav-grouped instead.
    var hamburger = document.getElementById('hamburger-menu');
    if (hamburger) {
      // Inject DESKTOP-ONLY nav-grouped styles as CSS
      // Mobile styles are handled by style.css using #nav-grouped ID selector
      // DO NOT duplicate mobile styles here — class selectors lose to ID selectors
      var navStyles = document.createElement('style');
      navStyles.id = 'nav-grouped-styles';
      navStyles.textContent = 
        /* === SHARED (all viewports) === */
        '.nav-direct-link {' +
        '  display: inline-block;' +
        '  padding: 0.3rem 0.7rem;' +
        '  color: #fff;' +
        '  background: transparent;' +
        '  border: 1px solid #ffd700;' +
        '  border-radius: 4px;' +
        '  font-size: 0.75rem;' +
        '  font-weight: 600;' +
        '  text-transform: uppercase;' +
        '  letter-spacing: 0.5px;' +
        '  text-decoration: none;' +
        '  white-space: nowrap;' +
        '  transition: all 0.3s;' +
        '}' +
        '.nav-direct-link:hover {' +
        '  background: rgba(255,215,0,0.15);' +
        '}' +
        '.nav-direct-link.active {' +
        '  background: #ffd700;' +
        '  color: #0a1628;' +
        '}' +
        /* === DESKTOP ONLY (769px+) — do NOT override mobile CSS === */
        '@media (min-width: 769px) {' +
        '  #nav-grouped {' +
        '    display: flex;' +
        '    flex-wrap: nowrap;' +
        '    gap: 6px;' +
        '    justify-content: center;' +
        '    padding: 0.3rem 0;' +
        '    overflow: visible;' +
        '    position: relative;' +
        '    z-index: 200001;' +
        '  }' +
        '}';
      document.head.appendChild(navStyles);

      // Clone hamburger listeners — add new one for nav-grouped
      var newHamburger = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHamburger, hamburger);
      newHamburger.addEventListener('click', function() {
        newHamburger.classList.toggle('active');
        groupedNav.classList.toggle('open');
        newHamburger.setAttribute('aria-expanded', groupedNav.classList.contains('open'));
      });

      // Ensure lang-selector stays in header-content (visible on mobile)
      // It may have been appended to nav-grouped by i18n.js fallback
      var langSel = document.getElementById('lang-selector');
      if (langSel && headerContent) {
        headerContent.insertBefore(langSel, newHamburger);
      }
    }
  }

  // ============================================
  // 4. INITIALISE ALL
  // ============================================
  function init() {
    initScrollProgress();
    initGroupedNav();
    // Delay TOC init to ensure DOM is fully loaded
    setTimeout(initFloatingTOC, 500);
    // Re-apply i18n translations to dynamically created elements
    if (window.IA_i18n && window.IA_i18n.applyLanguage) {
      var lang = window.IA_i18n.getCurrentLang();
      if (lang && lang !== 'en') {
        window.IA_i18n.applyLanguage(lang);
      }
    }
    // Listen for i18n-ready event (translations loaded async after nav built)
    document.addEventListener('ia-i18n-ready', function(e) {
      var lang = e.detail && e.detail.lang;
      if (lang && lang !== 'en' && window.IA_i18n && window.IA_i18n.applyLanguage) {
        window.IA_i18n.applyLanguage(lang);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

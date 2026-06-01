/**
 * UX Discovery Principle — iCard UX-001
 * "If users can't find it, it doesn't exist."
 * 
 * 4 Patterns: PULSE (hamburger), SWIPE (carousels), LABEL (scroll nav), GLOW (primary CTA)
 * 6 Rules: One-time only, Auto-dismiss, Mobile-only, No recurring CTAs, Subtle, Dismiss on interaction
 * 
 * Ref: uxdemo-6hdarodt.manus.space
 * Observed by: Ir. Nigel T. Dearden CEng
 * Block 415, 26 March 2026
 */
(function() {
  'use strict';

  var HINT_KEY = 'iaai_discovery_seen';
  var seen = false;
  try { seen = localStorage.getItem(HINT_KEY) === '1'; } catch(e) {}
  if (seen) return;
  if (window.innerWidth > 768) return; // Rule 3: Mobile-only

  // --- PATTERN 1: PULSE (ANNOUNCE) — Hamburger Menu ---
  var hamburger = document.getElementById('hamburger-menu');
  if (hamburger) {
    hamburger.classList.add('discovery-hint');
    hamburger.addEventListener('click', function() {
      hamburger.classList.remove('discovery-hint');
    }, { once: true }); // Rule 6: Dismiss on interaction
  }

  // --- PATTERN 2: SWIPE (GUIDE) — Horizontal Carousels ---
  function addSwipeHint(container) {
    if (!container) return;
    if (container.scrollWidth <= container.clientWidth) return; // Only if actually scrollable
    container.style.position = 'relative';
    var hint = document.createElement('div');
    hint.className = 'swipe-hint-overlay';
    hint.innerHTML = '<span class="swipe-arrow">\u2190</span> SWIPE';
    hint.style.pointerEvents = 'none'; // Rule 5: Subtle
    container.appendChild(hint);
    // Rule 6: Dismiss on first scroll
    container.addEventListener('scroll', function() {
      hint.remove();
    }, { once: true });
    // Rule 2: Auto-dismiss after 5s
    setTimeout(function() { if (hint.parentNode) hint.remove(); }, 5000);
  }

  // Delay to let mobile CSS activate and carousels render
  setTimeout(function() {
    // Framework carousel
    addSwipeHint(document.querySelector('.mobile-fw-carousel'));
    // Knowledge web gallery
    addSwipeHint(document.querySelector('.kw-gallery'));
    // Any horizontal scroll container with overflow
    var scrollContainers = document.querySelectorAll('.book-grid, .trilogy-grid, .volume-cards');
    for (var i = 0; i < scrollContainers.length; i++) {
      if (scrollContainers[i].scrollWidth > scrollContainers[i].clientWidth) {
        addSwipeHint(scrollContainers[i]);
      }
    }
  }, 1500);

  // --- PATTERN 3: LABEL (ORIENT) — Scroll Nav ---
  var scrollNav = document.getElementById('scroll-nav');
  if (scrollNav) {
    var label = document.createElement('div');
    label.className = 'discovery-label';
    label.textContent = 'SECTION NAV';
    var indicator = document.getElementById('scroll-indicator');
    if (indicator) indicator.parentNode.insertBefore(label, indicator);
  }

  // --- PATTERN 4: GLOW (ATTRACT) — Primary CTA ---
  var startHere = document.querySelector('.start-here-cta');
  if (startHere) {
    startHere.classList.add('discovery-glow');
    startHere.addEventListener('click', function() {
      startHere.classList.remove('discovery-glow');
    }, { once: true }); // Rule 6: Dismiss on interaction
  }

  // --- PATTERN 5: HOW TO NAVIGATE OVERLAY (3 seconds) ---
  // Only show on pages with a hamburger menu (main content pages)
  if (hamburger) {
    var overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2rem;padding:1.5rem;opacity:0;transition:opacity 0.5s ease;';
    overlay.innerHTML = '<p style="font-family:var(--font-heading,Georgia,serif);color:#ffd700;font-size:1.1rem;letter-spacing:0.2em;text-align:center;">HOW TO NAVIGATE</p>'
      + '<div style="display:flex;flex-direction:column;gap:0.8rem;width:100%;max-width:320px;">'
      + '<div style="display:flex;align-items:center;gap:0.8rem;padding:0.7rem;border:1px solid rgba(255,215,0,0.3);border-radius:8px;background:rgba(10,22,40,0.6);">'
      + '<span style="font-size:1.5rem;">☰</span>'
      + '<div><p style="color:#ffd700;font-size:0.85rem;font-weight:bold;">MENU</p><p style="color:rgba(255,255,255,0.5);font-size:0.7rem;">Top-right — all sections & pages</p></div></div>'
      + '<div style="display:flex;align-items:center;gap:0.8rem;padding:0.7rem;border:1px solid rgba(255,215,0,0.3);border-radius:8px;background:rgba(10,22,40,0.6);">'
      + '<span style="font-size:1.5rem;">←→</span>'
      + '<div><p style="color:#ffd700;font-size:0.85rem;font-weight:bold;">SWIPE</p><p style="color:rgba(255,255,255,0.5);font-size:0.7rem;">Horizontal carousels — swipe to explore</p></div></div>'
      + '<div style="display:flex;align-items:center;gap:0.8rem;padding:0.7rem;border:1px solid rgba(255,215,0,0.3);border-radius:8px;background:rgba(10,22,40,0.6);">'
      + '<span style="font-size:1.5rem;">▼▲</span>'
      + '<div><p style="color:#ffd700;font-size:0.85rem;font-weight:bold;">SCROLL NAV</p><p style="color:rgba(255,255,255,0.5);font-size:0.7rem;">Right edge — jump between sections</p></div></div>'
      + '</div>'
      + '<button id="skip-tour-btn" style="margin-top:0.5rem;padding:0.5rem 1.5rem;border:1px solid rgba(255,215,0,0.5);border-radius:4px;background:transparent;color:#ffd700;font-family:var(--font-heading,Georgia,serif);font-size:0.8rem;letter-spacing:0.15em;cursor:pointer;">SKIP TOUR</button>'
      + '<p style="color:rgba(255,255,255,0.3);font-size:0.7rem;margin-top:0.3rem;">or tap anywhere to continue</p>';
    document.body.appendChild(overlay);
    // Fade in
    requestAnimationFrame(function() { overlay.style.opacity = '1'; });
    // Dismiss on tap or auto-dismiss after 3 seconds
    function dismissOverlay() {
      overlay.style.opacity = '0';
      setTimeout(function() { if (overlay.parentNode) overlay.remove(); }, 500);
    }
    overlay.addEventListener('click', dismissOverlay, { once: true });
    var skipBtn = overlay.querySelector('#skip-tour-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dismissOverlay();
        // Skip tour = also remove all other hints immediately
        var hints = document.querySelectorAll('.discovery-hint,.swipe-hint-overlay,.discovery-label,.discovery-glow');
        for (var i = 0; i < hints.length; i++) hints[i].remove();
        try { localStorage.setItem(HINT_KEY, '1'); } catch(e) {}
      });
    }
    setTimeout(dismissOverlay, 3000);
  }

  // Rule 1: One-time only — mark as seen after 10 seconds
  setTimeout(function() {
    try { localStorage.setItem(HINT_KEY, '1'); } catch(e) {}
  }, 10000);
})();

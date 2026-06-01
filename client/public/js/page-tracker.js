/**
 * IAAI Page Analytics Tracker
 * Lightweight client-side tracker that records page views via tRPC.
 * Include on every HTML page: <script src="/js/page-tracker.js" defer></script>
 * 
 * Records: path, page title, referrer, anonymous session ID
 * No cookies, no fingerprinting, no PII — just page views.
 */
(function() {
  'use strict';

  // Generate or retrieve a session ID (stored in sessionStorage, not cookies)
  function getSessionId() {
    var key = 'iaai_sid';
    var sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = 'sid_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem(key, sid);
    }
    return sid;
  }

  // Send the page view via tRPC batch endpoint
  function trackPageView() {
    try {
      var payload = {
        "0": {
          json: {
            path: window.location.pathname + window.location.search,
            pageTitle: document.title || null,
            referrer: document.referrer || null,
            sessionId: getSessionId()
          }
        }
      };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/trpc/analytics.track?batch=1', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(payload));
    } catch (e) {
      // Silent fail — analytics should never break the page
    }
  }

  // Track on page load
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    trackPageView();
  } else {
    document.addEventListener('DOMContentLoaded', trackPageView);
  }
})();

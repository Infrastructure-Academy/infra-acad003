# Memorial Route Scroll UX Correction

Date: 2026-08-25

The Memorial React application now resets the document scroll position whenever the wouter route changes. The shared `ScrollToTop` component listens to the current route, calls an immediate `window.scrollTo({ top: 0, left: 0, behavior: "auto" })`, and repeats the reset on the next animation frame to handle mobile browser restoration timing.

This is a route-entry behavior correction. It applies across the internal Memorial routes rather than requiring separate page-level fixes. Representative `/counterforce` checks were performed at desktop and mobile preview sizes and loaded with zero pixels above the viewport.

The source file preserved with this record is `nigel-tribute-source/client/src/components/ScrollToTop.tsx`. The live Manus checkpoint associated with the change is `a8152e96`.

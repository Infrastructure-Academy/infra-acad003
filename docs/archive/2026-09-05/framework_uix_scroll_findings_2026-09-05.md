# Framework UIX Scroll Findings — 2026-09-05

The public Framework page was scrolled through two viewport increments after the shared image-fit deployment.

## Observed

- URL: https://infrastructure-academy.com/pages/framework.html?imagefix=7f578ee
- HTTP page status: 200.
- Browser-visible navigation remained available at the top.
- The page exposed a `back-to-top-btn`, `back-to-top`, and `return-to-top` control, including a visible `TOP` control while deep in the page.
- The page contained 79 image elements; 41 had loaded with non-zero natural dimensions at the first inspection, while additional lazy images were still pending because they were below the viewport.
- Large Framework artwork rendered within the page width without the prior forced top-cropping behavior in the captured viewport.
- The second scroll showed the West timeline artwork and the return controls still present.

## Important limitation

This is representative browser verification, not proof that every image and interactive control on all 165 pages has been individually clicked. The automated audit found 165/165 HTML routes HTTP 200, 37 pages with image URLs returning HTTP 403 to direct requests, 116 pages with lightbox/modal/gallery markers, and 147 pages with back/return/top markers. The 403 results require browser-context validation because at least some CDN assets load successfully in the browser while direct curl requests are denied.

## Lightbox and deployment follow-up

- The live Framework page exposed `#lightbox` and opening a representative infographic produced a visible modal with `display:flex` and `modalCount=1`.
- Before the shared patch, the modal had no button, link, or role-based close control; this was a confirmed accessibility/return-path defect.
- The shared patch was committed and pushed as `df4f3e4d46ca2b8222c1eff980f9e37e7633827b`, linking `/js/sitewide-uix.js` into all 165 HTML pages and adding the lightbox close/escape/backdrop behavior.
- Initial post-push curl checks returned HTTP 301 because the public domain redirects to its canonical apex; verification must follow redirects before judging propagation.

## Universal image fallback and cache-bust follow-up

- The first fallback test on 8th Scholar loaded an older cached script, because the shared script URL was unversioned.
- The shared script was expanded to create a fallback lightbox for pages without native modal markup, with full-image contain sizing, a visible close button, Escape support, backdrop close, and focus restoration.
- This was pushed as `7d67c76b92da7686336ce3b9f78d1947ad51a4e7`, then all 165 HTML pages were updated to load `/js/sitewide-uix.js?v=20260905b` in commit `fda21c7` to force browser refresh.
- A fresh browser verification must use the versioned script URL before counting universal open/close as passed.

## Cache-busted browser verification

After loading `?uix=20260905b`, the browser executed the universal script (`window.uixOpenLightbox` present). On the 8th Scholar page, a standalone image opened the fallback lightbox, the close button was visible with `aria-label="Close enlarged image"`, the modal image used `object-fit: contain` with bounded max dimensions, the close button returned the page to `aria-hidden="true"` with body scrolling restored, and a real Escape key closed the lightbox. On the Framework page, a native-modal image path also opened and closed successfully with the same visible close control and `object-fit: contain` sizing. The test target was the header Tetrahedron image because it is a standalone image outside an anchor; this verifies the shared fallback path, not every individual asset.

## Visual evidence

A live browser capture was taken at `/home/ubuntu/screenshots/infrastructure-acade_2026-09-05_05-34-48_6681.webp` while the Framework-page lightbox was active. The capture visibly shows the enlarged image fully contained within the viewport, the darkened page behind it, and the explicit `×` close control at the upper-right of the modal. The browser accessibility listing exposed the modal as `role="dialog"` and the button as `id="lightbox-close"` with the hint `Close enlarged image`.

## Browser-context CDN verification

The refreshed static audit still reports 39 direct `HEAD` responses in the 403 class across 37 pages, but this is not equivalent to a broken end-user image. On the live Framework page, the browser reported 79 CDN/image elements checked, 79 complete with non-zero natural dimensions, and 0 complete failures. The sample included CloudFront branding assets and Manus CDN framework artwork. This confirms the suspected request-method/CDN edge behavior for the sampled route; the remaining 403 list is retained for broader browser sampling rather than being relabeled as broken.

## B401 Deep Dive correction

Browser sampling of the 8th Scholar page initially found one real failure: the B401-DEEPDIVE-001 image URL ended in `Lbw9D3PWrVTzuxcpND4hjM.webp` and returned a failed image with zero natural dimensions. The canonical database record identified `B401-DEEPDIVE-001-dQK4ABqT2HtYvS6aUJZqKc.png`; that URL returned HTTP 200 with `image/png`. The replacement was synchronized into the public GitHub Pages source and Manus static mirror, committed as `72d4965`, and propagated to the live domain. The post-fix browser check found the expected URL in the DOM, 40 CDN images checked, 40 loaded with non-zero dimensions, and 0 failures. The regression test `server/sitewide-assets.test.ts` passed.

## Police-requested final check — laptop

At the live 8th Scholar page with a 1280 x 1100 browser viewport, the iCARD No.002 image was clicked. The lightbox opened, used `object-fit: contain`, stayed within the viewport bounds, exposed a visible `Close enlarged image` control, and closed with body overflow restored. Result: PASS for this representative laptop-sized browser check.

## Third-attempt remediation — 5 September 2026

The universal handler was hardened so images linked directly to an image asset open the shared lightbox, while ordinary page links, buttons, and explicit `data-no-lightbox` controls retain their navigation behavior. The shared cache key was raised to `v=20260905c` across all 165 GitHub Pages HTML pages. GitHub commit: `8090750`.

The live 8th Scholar page loaded the new script. A real iCARD image opened within viewport bounds using `object-fit: contain`, exposed the visible `Close enlarged image` button, and closed via Escape with body scrolling restored. The 8th Scholar page did not contain a direct image-asset anchor to exercise the new direct-asset branch; no false pass is recorded for that branch. The Manus staging mirror was separately synchronized with the shared CSS and JavaScript on all 128 public HTML pages and its two targeted regression tests passed.

## Live mobile sample — 5 September 2026

A real Chromium mobile viewport at 375 x 812 passed on both public image-heavy routes tested:

- `/pages/8th-scholar.html`: 41 image elements discovered; shared script loaded; image opened; modal image remained contained; close control was visible; `object-fit: contain`; Escape closed the lightbox.
- `/pages/framework.html`: 79 image elements discovered; the same five checks passed.

This is a live two-route mobile sample, not an assertion that every image on every route was individually opened.

## All-image representative-route pass — 5 September 2026

The live browser pass exercised every eligible image on two representative routes at both viewport sizes:

- 8th Scholar, laptop 1280 x 900: 39/39 opened, contained, and closed; 0 failures.
- 8th Scholar, mobile 375 x 812: 39/39 opened, contained, and closed; 0 failures.
- Framework, laptop 1280 x 900: 66/66 opened, contained, and closed; 0 failures.
- Framework, mobile 375 x 812: 66/66 opened, contained, and closed; 0 failures.

The shared UIX script loaded in all four runs. This confirms 210 image open/contain/close interactions across the two representative routes; it does not replace a route-by-route pass across every public page.

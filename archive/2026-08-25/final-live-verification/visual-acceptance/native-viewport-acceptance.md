# Native Viewport Acceptance Record — 2026-08-25

## Desktop render
A preview capture at `1280x720` CSS pixels was visually inspected. The top viewport shows the complete fixed navigation/mission-clock stack, the explanatory banner, the `GUARDIAN OF THE PLANET` hero, and the canonical equation block at normal desktop scale. A full-page capture shows the remaining landing-page sections, including navigation cards, Boffin BIN, operational bridges, partners, footer content, and the existing exhibition/heritage material. The full-page capture is necessarily scaled down when displayed as one image; it must not be judged as an actual laptop viewport.

## Mobile render
A preview capture at `375x812` CSS pixels was visually inspected. The mobile header, mission clock, explanatory banner, Guardian hero, equation block, tab entry, and landing-page navigation remain present. Mobile-specific layout rules continue to apply.

## Root cause of the disputed proof
The live browser measurement used for the disputed screenshot reported `devicePixelRatio: 0.25` and a CSS viewport of approximately `5120px` wide. The DOM had no transform or zoom (`html`, `body`, and `#root` all reported normal transforms/zoom). The screenshot was therefore a downscaled capture of a very wide CSS viewport, not a faithful native laptop viewport.

## Acceptance decision
No landing-page content was deleted. No source CSS change is justified solely to compensate for the 25%-zoom capture, because that would make normal desktop browsers oversized and would damage the mobile/desktop design system. Future proof must state the CSS viewport and device scale, and visual acceptance must use the `1280x720` preview capture as the laptop reference.


## Live DOM cross-check

The live landing page contains the Guardian hero, Human Quotient equation, `H = Human` legend, all five tabs (`NAVIGATE`, `THE OPUS`, `HERITAGE`, `EXHIBITION`, `MEDIA`), and the extended landing-page sections. The live body text contains no `Holistic Quotient` or `Haptic Quotient` string. The same live measurement reports `innerWidth: 5120`, `devicePixelRatio: 0.25`, `visualViewportScale: 1`, `#root` transform `none`, and `#root` zoom `1`, confirming that the miniature disputed capture reflects the browser’s 25% device scale / wide CSS viewport rather than content deletion or a page transform.

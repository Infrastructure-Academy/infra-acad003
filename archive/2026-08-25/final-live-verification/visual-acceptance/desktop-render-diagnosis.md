# Desktop Render Diagnosis — 2026-08-25

## Finding
The supplied laptop proof was visually compressed because the live browser capture session rendered with `devicePixelRatio: 0.25` and a CSS viewport of approximately `5120px` wide (`innerWidth: 5120`, `clientWidth: 5116`). The screenshot was then displayed at a much smaller pixel width, making normal desktop typography appear miniature.

## Measured live DOM values

- `html` transform: `none`
- `html` zoom: `1`
- `body` transform: `none`
- `body` zoom: `1`
- `#root` width: `5116px`
- `#root` height: `10003px`
- desktop heading sample: `72px` font size
- page content: full route content present; no evidence of landing-page deletion

## Interpretation
This is a screenshot/browser scale artifact, not evidence that the Memorial source removed the landing-page content or applied a desktop CSS transform. Acceptance screenshots must be captured at a native CSS viewport such as `1280x720`, and the resulting images must be visually inspected before publication claims are made.

## Required acceptance standard
1. Capture desktop at `1280x720` CSS pixels.
2. Capture mobile at `375x812` CSS pixels.
3. Visually inspect both captures for readable typography, full canonical content, and no unintended blank/compressed regions.
4. Do not publish a completion claim until both captures pass human visual review.


## Follow-up visual inspection

The live/preview desktop top viewport at `1280x720` was visually inspected directly and was readable, with the full explanatory banner, Guardian hero, and canonical Human Quotient equation visible. The mobile `375x812` capture was also inspected and retained the same content in the mobile layout. Full-page images are not valid laptop-legibility evidence because the entire scrollable page is reduced to fit a single image. The disputed screenshot should therefore not be used to infer missing content or a source deletion.

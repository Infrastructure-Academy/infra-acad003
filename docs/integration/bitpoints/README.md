# BitPoints integration

This directory preserves the reusable BitPoints UI integration and the public data contract used by the production marketplace.

## Public production entry points

- Landing: https://www.infrastructure-academy.com/bitpoints-landing.html
- Marketplace: https://www.infrastructure-academy.com/pages/bitpoint-marketplace.html
- Data definition: https://www.infrastructure-academy.com/data/bitpoint-vs-icard-definition.json
- Expanded Golden Excel: https://www.infrastructure-academy.com/iAAi_ISI_EXPANDED_GOLDEN_FILE_v2.xlsx

## Reusable files

- `BitPointsCard.jsx` — React component source.
- `bitpoints-card.css` — component styling.
- `SpiderFeedbackPanel.jsx` — feedback-panel integration.
- `../data/bitpoints/` — card data, schemas, sitemap inputs, and manifests.

The production marketplace uses public CloudFront/CDN URLs for the card artwork. The CDN package remains the canonical binary asset archive; this GitHub directory preserves the code and data required for reconstruction and app integration. The public page itself is the callable production entry point and does not require runtime unpacking of the archive ZIP.

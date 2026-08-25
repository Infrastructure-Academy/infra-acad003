# BitPoints / Learning-Deck Transfer Verification

**Date:** 2026-08-25
**Repository:** Infrastructure-Academy/infra-acad003
**Serving domain:** www.infrastructure-academy.com

---

## Executive Finding

The BitPoints landing page, marketplace page, supporting JSON, and Golden Excel are present in the public `infra-acad003` repository and are served successfully from the GitHub Pages production domain. The live marketplace references public CloudFront/CDN assets directly, so the app can call up the card artwork without downloading or unpacking the 149 MB web archive at runtime.

The web/CDN package shown in the supplied evidence was independently downloaded and verified at HTTP 200. Its SHA-256 is `f98d31053701d42ec4f76dae36fa24cde57ca126619a4b8adc269b6000ad0281` and its size is 155,435,885 bytes. Its listing includes BitPoints card JSON, the BitPoints schema, sitemap files, the reusable `integration/BitPointsCard.jsx` component and CSS, and the learning-deck documentation.

The second URL labelled "Evidence archive" in the supplied screenshot returned HTTP 403 and therefore could not be independently downloaded or checksum-verified from that URL. This is recorded as an unresolved access issue, not silently treated as complete.

---

## GitHub Verification

The current remote main commit is `d35c4fa213b9437ac5948ae2687ea5d5451dd820`, dated 2026-08-25 12:20:29 UTC, with message "Add iCU intent and ICE-HQ canon to Golden Excel."

The following repository files are present:

| Material | GitHub Path | Repository Status |
|---|---|---|
| BitPoints landing | `docs/bitpoints-landing.html` | Present; 8,506 bytes |
| BitPoints marketplace | `docs/pages/bitpoint-marketplace.html` | Present; 57,225 bytes |
| BitPoints/iCard definition | `docs/data/bitpoint-vs-icard-definition.json` | Present; 2,061 bytes |
| Expanded Golden Excel | `docs/iAAi_ISI_EXPANDED_GOLDEN_FILE_v2.xlsx` | Present; 29,363 bytes |
| Reusable BitPoints integration | In the verified CDN package as `integration/BitPointsCard.jsx` and `integration/bitpoints-card.css` | Present in the package; not separately located at the same root path in the repository tree query |
| Card data and schemas | In the verified CDN package under `data/` | Present in the package; public repository has related BitPoints data and definition files |

---

## Public Production Tests

The following public URLs all returned HTTP 200:
- BitPoints landing page
- BitPoints marketplace
- BitPoints/iCard definition JSON
- Expanded Golden Excel

The marketplace HTML contains a public CDN base URL and direct card asset references for the relay, scholar, blueprint, epoch, and joker material. It also calls the public tRPC endpoints `/api/trpc/library.getMyTier` and `/api/trpc/analytics.track`. This demonstrates that the production page is not merely an archive listing: it has a callable page and data/asset references.

---

## CDN Archive Test

The web/CDN package URL shown in the screenshot was:
`https://files.manuscdn.com/user_upload_by_module/session_file/310419663030220481/OomSOqAflbRznEOX.zip`

It returned HTTP 200, downloaded as a ZIP, and listed the following relevant materials:

- `data/cards-all.json`
- `data/cards-ready.json`
- `data/cards-conditional.json`
- `data/cards-hold.json`
- `data/cards-living-experiment.json`
- `data/cards-discovery-ready.json`
- `data/cards-open-experiments.json`
- `data/cards-thesis-cases.json`
- `data/bitpoints-card.schema.json`
- `data/spider-card-feedback.schema.json`
- `data/sitemap-bitpoints-ready.xml`
- `data/sitemap-bitpoints-experimental.xml`
- `integration/BitPointsCard.jsx`
- `integration/bitpoints-card.css`
- `docs/README.md`
- `docs/SEO_AND_NARRATION.md`
- `docs/LIVING_EXPERIMENT_DOCTRINE.md`

---

## What Is Proven and What Is Not

| Question | Result |
|---|---|
| Is the BitPoints app-facing production page on GitHub Pages? | **Yes.** |
| Can the public site load the marketplace and data files? | **Yes**; all tested URLs returned HTTP 200. |
| Are card assets referenced by a callable public CDN path? | **Yes**; the marketplace contains the CDN base and asset filenames. |
| Is the complete 149 MB web package verified on CDN? | **Yes**; HTTP 200, ZIP listing, size, and SHA-256 recorded. |
| Is the evidence archive URL verified? | **No**; it returned HTTP 403. |
| Is every component from the web ZIP separately committed at an identical GitHub path? | **Not proven.** The production pages and key data files are present, but the reusable integration files were only confirmed inside the CDN package during this test. |

---

## Evidence Files

- `/home/ubuntu/bitpoints_github_transfer_report_2026-08-25.md`
- `/home/ubuntu/bitpoints_github_public_linkage_2026-08-25.txt`
- `/home/ubuntu/bitpoints_app_callability_2026-08-25.txt`
- `/home/ubuntu/bitpoints_archive_relevant_files_2026-08-25.txt`
- `/home/ubuntu/bitpoints_archive_verification_2026-08-25/results.tsv`
- `/home/ubuntu/bitpoints_archive_verification_2026-08-25/web.listing.txt`
- `/home/ubuntu/github_bitpoints_paths_2026-08-25.txt`

---

## Follow-Up Required

1. The evidence-archive ZIP URL must be corrected or its access permissions restored before it can be called a fully verified archive.
2. If the reusable `BitPointsCard.jsx` integration is required as a separately importable GitHub module, it should also be committed to a documented repository path rather than relying solely on the CDN ZIP.

---
*Source: DOCX received via Telegram 2026-08-25 21:56+08*
*Extracted and archived by OpenClaw*

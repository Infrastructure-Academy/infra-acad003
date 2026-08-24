# Memorial and Academy Coverage Report — 25 August 2026

## Purpose

This report preserves the Telegram findings that prompted the GitHub synchronization request. It separates reported observations from local verification so that future maintainers do not mistake an inventory claim for an independently verified export.

## Reported findings from Telegram

| Area | Reported finding | Preservation implication |
|---|---:|---|
| Academy routes | 91 routes observed in Manus; approximately 60 match GitHub | Reconcile route inventory against `docs/` and preserve unmatched route evidence. |
| Memorial routes | 31 routes observed in Manus; none in the static GitHub shell | Preserve the Memorial React source separately; a static shell is not a substitute for the application. |
| Backend | 50 database tables in the Drizzle schema | The schema can be preserved in source; database rows require a separate, authorized export. |
| Navigation | Unmatched examples include `/explore/relays`, `/explore/webs`, `/play/founders`, `/race`, and `/icards` | These routes require a deliberate mirror or redirect plan; they are not silently declared repaired here. |

## Locally verified preservation state

The repository is `Infrastructure-Academy/infra-acad003`, whose production content is served from its `docs/` directory [1]. The Memorial source project is present in this archive under `nigel-tribute-source/`. Its source includes `client/src/pages/Home.tsx`, the i18n dictionaries, server code, and `drizzle/schema.ts`. Environment files and runtime secrets were excluded.

The current repository already contains a substantial Academy archive and static site. This action adds the missing Memorial source snapshot and a written reconciliation record rather than pretending that runtime-rendered Memorial pages have become static HTML.

## What has not been verified or exported

The original machine-readable Telegram manifest was not found as a standalone file in the restored workspace. The route totals above therefore remain attributed Telegram findings, not new measurements. The Memorial database contents were not exported. The presence of a Drizzle schema documents table definitions only; it does not preserve database rows, uploaded files, or secrets. The complete set of externally hosted CDN assets has also not been independently re-downloaded into this archive.

## Recommended next preservation stage

A follow-up authorized export should produce a database backup without secrets, a CDN asset manifest, and a tested reconstruction bundle. Route reconciliation should then compare the verified runtime route list with `infra-acad003/docs/`, classify each route as mirrored, redirected, unavailable, or requiring application runtime, and record the result in a versioned manifest.

## References

[1]: https://github.com/Infrastructure-Academy/infra-acad003 "Infrastructure Academy GitHub repository"
[2]: https://infrastructure-academy.com "Infrastructure Academy live site"
[3]: https://nigelmemorial-ucmtq9dn.manus.space "Memorial live site"

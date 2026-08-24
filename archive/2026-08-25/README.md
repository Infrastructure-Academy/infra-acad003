# IAAi Preservation Archive — 25 August 2026

This archive records the preservation action taken for the Infrastructure Academy and Memorial web properties. The live Academy is served from GitHub Pages through `Infrastructure-Academy/infra-acad003/docs/` [1]. The Memorial is a separate React application currently hosted at `https://nigelmemorial-ucmtq9dn.manus.space` [2].

## What is preserved here

The directory `nigel-tribute-source/` contains a source snapshot of the Memorial React application as restored in this workspace. Dependencies, generated build output, runtime metadata, environment files, and Git history were excluded. The snapshot includes the application source, translations, server code, Drizzle schema, configuration, documentation, and the current task history. A file inventory is recorded in `nigel-tribute-source-files.txt`.

The companion report `memorial-coverage-report.md` records the route and database observations supplied from Telegram, identifies what was independently inspected, and distinguishes verified facts from unverified claims. It also records the current preservation limitation: the source snapshot includes the schema definition but does not constitute a database-data export.

## Important limitation

This is a source-preservation snapshot, not a complete static mirror of every rendered route. A React application may render route content at runtime, and the available workspace does not include a verified export of all runtime database rows or all externally hosted media. No secrets or environment files are included.

## Integrity

Before release, run:

```bash
find nigel-tribute-source -type f -print0 | sort -z | xargs -0 sha256sum > nigel-tribute-source-sha256.txt
```

The resulting checksum inventory should be committed alongside the snapshot whenever the archive is finalized.

## References

[1]: https://infrastructure-academy.com "Infrastructure Academy live site"
[2]: https://nigelmemorial-ucmtq9dn.manus.space "Memorial live site"
[3]: https://github.com/Infrastructure-Academy/infra-acad003 "Infrastructure Academy GitHub repository"

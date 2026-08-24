# 50-Table Export Request — Reconciliation

The request was to export all 50 database tables from the Drizzle schema. The restored Memorial project was inspected directly and contains 19 `mysqlTable` declarations in `drizzle/schema.ts`; `drizzle/relations.ts` contains relations only and no additional table declarations.

Accordingly, this archive exports all **19 tables actually present** in the restored schema, including their table names, export symbols, source lines, and 187 column definitions. It does not fabricate 31 tables that are not present in the source tree.

The reported count of 50 may refer to a different schema revision, another Manus project, runtime database tables created outside this source file, or a manifest from another environment. Resolving that discrepancy requires the corresponding schema or an authorized database metadata export. This report intentionally contains no database rows, credentials, or secrets.

## Evidence

```text
grep -cE '^export const [A-Za-z0-9_]+ = mysqlTable\\(' drizzle/schema.ts
19
```

The exact source and a machine-readable catalog are preserved beside this report in `schema.ts`, `tables.md`, and `tables.json`.

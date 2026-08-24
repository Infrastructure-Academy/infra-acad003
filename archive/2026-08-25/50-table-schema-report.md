# 50-Table Schema Report

**Workbook version:** `GE-ISI_Master_v2_25Aug26.xlsx`  
**Reported total:** 50  
**Verified in restored Drizzle source:** 19  
**Unresolved:** 31  

## Verified table definitions

| # | Export symbol | SQL table | Source line | Columns |
|---:|---|---|---:|---:|
| 1 | `users` | `users` | 7 | 11 |
| 2 | `expenses` | `expenses` | 29 | 8 |
| 3 | `tectonEntries` | `tecton_entries` | 52 | 13 |
| 4 | `tectonMeta` | `tecton_meta` | 86 | 4 |
| 5 | `dcsnNodes` | `dcsn_nodes` | 104 | 19 |
| 6 | `dcsnCardVersions` | `dcsn_card_versions` | 152 | 10 |
| 7 | `reviewRounds` | `review_rounds` | 183 | 16 |
| 8 | `reviewUniversityScores` | `review_university_scores` | 220 | 15 |
| 9 | `reviewCategoryScores` | `review_category_scores` | 255 | 7 |
| 10 | `reviewPackageScores` | `review_package_scores` | 274 | 7 |
| 11 | `anchorLinks` | `anchor_links` | 297 | 8 |
| 12 | `perspectiveScores` | `perspective_scores` | 322 | 6 |
| 13 | `chatMessages` | `chat_messages` | 343 | 7 |
| 14 | `chatLikes` | `chat_likes` | 365 | 5 |
| 15 | `channelFollowers` | `channel_followers` | 384 | 6 |
| 16 | `pinnedMessages` | `pinned_messages` | 403 | 4 |
| 17 | `icardRegister` | `icard_register` | 427 | 13 |
| 18 | `translationSuggestions` | `translation_suggestions` | 480 | 12 |
| 19 | `turingPapers` | `turing_papers` | 521 | 16 |

## Reconciliation

The Telegram manifest reports 50 database tables. Direct inspection of the restored Memorial project found 19 `mysqlTable` declarations in `drizzle/schema.ts` and no additional table constructors in `drizzle/relations.ts`. The workbook therefore records 31 unresolved slots without assigning invented names or data.

## Scope limitation

This report and workbook contain schema definitions only. They do not contain live database rows, credentials, or secrets. Resolving the remaining 31 requires the corresponding schema revision or an authorized database metadata export.

## References

[1]: https://github.com/Infrastructure-Academy/infra-acad003 "Infrastructure Academy repository"

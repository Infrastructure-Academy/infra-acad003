# Drizzle Schema Table Catalog

> This catalog describes table definitions in `drizzle/schema.ts`. It contains no database rows, credentials, or secrets.

**Verified table count: 19**

| # | Export | SQL table | Source line | Columns |
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

## Definitions

### 1. users

Export: `users`; source line: 7.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `openId` | `varchar("openId", { length: 64 }).notNull().unique()` |
| `name` | `text("name")` |
| `email` | `varchar("email", { length: 320 })` |
| `loginMethod` | `varchar("loginMethod", { length: 64 })` |
| `role` | `mysqlEnum("role", ["user", "admin"]).default("user").notNull()` |
| `stripeCustomerId` | `varchar("stripeCustomerId", { length: 128 })` |
| `stripeSubscriptionId` | `varchar("stripeSubscriptionId", { length: 128 })` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |
| `updatedAt` | `timestamp("updatedAt").defaultNow().onUpdateNow().notNull()` |
| `lastSignedIn` | `timestamp("lastSignedIn").defaultNow().notNull()` |

### 2. expenses

Export: `expenses`; source line: 29.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `userId` | `int("userId").notNull()` |
| `category` | `varchar("category", { length: 64 }).notNull()` |
| `description` | `text("description")` |
| `amount` | `int("amount").notNull()` |
| `currency` | `varchar("currency", { length: 3 }).default("USD").notNull()` |
| `date` | `timestamp("date").defaultNow().notNull()` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 3. tecton_entries

Export: `tectonEntries`; source line: 52.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `term` | `varchar("term", { length: 256 }).notNull().unique()` |
| `partOfSpeech` | `json("partOfSpeech").$type<string[]>().notNull()` |
| `morphology` | `text("morphology").notNull()` |
| `roots` | `json("roots").$type<string[]>().notNull()` |
| `etymology` | `text("etymology").notNull()` |
| `hice` | `varchar("hice", { length: 1 }).notNull()` |
| `conjugation` | `text("conjugation").notNull()` |
| `whyThisWord` | `text("whyThisWord").notNull()` |
| `sortOrder` | `int("sortOrder").default(0).notNull()` |
| `block` | `int("block")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |
| `updatedAt` | `timestamp("updatedAt").defaultNow().onUpdateNow().notNull()` |

### 4. tecton_meta

Export: `tectonMeta`; source line: 86.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `key` | `varchar("key", { length: 64 }).notNull().unique()` |
| `value` | `json("value").$type<any>().notNull()` |
| `updatedAt` | `timestamp("updatedAt").defaultNow().onUpdateNow().notNull()` |

### 5. dcsn_nodes

Export: `dcsnNodes`; source line: 104.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `nodeNumber` | `varchar("nodeNumber", { length: 6 }).notNull().unique()` |
| `name` | `varchar("name", { length: 256 }).notNull()` |
| `designation` | `text("designation")` |
| `cell` | `varchar("cell", { length: 256 })` |
| `recruitedBy` | `varchar("recruitedBy", { length: 6 })` |
| `relation` | `varchar("relation", { length: 256 })` |
| `status` | `mysqlEnum("status", ["ACTIVATED", "PENDING", "DORMANT", "CHALLENGE_ISSUED"]).default("ACTIVATED").notNull()` |
| `icardUrl` | `text("icardUrl")` |
| `icardVersion` | `varchar("icardVersion", { length: 16 })` |
| `activationBlock` | `int("activationBlock")` |
| `activationDay` | `int("activationDay")` |
| `activationDate` | `timestamp("activationDate")` |
| `intelType` | `varchar("intelType", { length: 64 })` |
| `accessLevel` | `varchar("accessLevel", { length: 32 })` |
| `spiderLevel` | `varchar("spiderLevel", { length: 64 })` |
| `metadata` | `json("metadata").$type<Record<string, string>>()` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |
| `updatedAt` | `timestamp("updatedAt").defaultNow().onUpdateNow().notNull()` |

### 6. dcsn_card_versions

Export: `dcsnCardVersions`; source line: 152.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `nodeNumber` | `varchar("nodeNumber", { length: 6 }).notNull()` |
| `name` | `varchar("name", { length: 256 }).notNull()` |
| `cardVersion` | `varchar("cardVersion", { length: 32 }).notNull()` |
| `cdnUrl` | `text("cdnUrl")` |
| `blockNumber` | `int("blockNumber")` |
| `createdBy` | `varchar("createdBy", { length: 64 }).notNull()` |
| `cardData` | `json("cardData").$type<Record<string, string>>()` |
| `changeNote` | `text("changeNote")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 7. review_rounds

Export: `reviewRounds`; source line: 183.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `roundCode` | `varchar("roundCode", { length: 16 }).notNull().unique()` |
| `roundName` | `varchar("roundName", { length: 256 }).notNull()` |
| `roundDate` | `varchar("roundDate", { length: 32 }).notNull()` |
| `methodology` | `text("methodology")` |
| `panelSize` | `int("panelSize")` |
| `overallScore` | `varchar("overallScore", { length: 32 })` |
| `classification` | `varchar("classification", { length: 128 })` |
| `verdict` | `varchar("verdict", { length: 64 })` |
| `ukBanda` | `varchar("ukBanda", { length: 64 })` |
| `usGpa` | `varchar("usGpa", { length: 16 })` |
| `indiaCgpa` | `varchar("indiaCgpa", { length: 16 })` |
| `apacGrade` | `varchar("apacGrade", { length: 16 })` |
| `chinaGrade` | `varchar("chinaGrade", { length: 32 })` |
| `block` | `int("block")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 8. review_university_scores

Export: `reviewUniversityScores`; source line: 220.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `roundCode` | `varchar("roundCode", { length: 16 }).notNull()` |
| `university` | `varchar("university", { length: 256 }).notNull()` |
| `region` | `varchar("region", { length: 64 }).notNull()` |
| `overallScore` | `varchar("overallScore", { length: 32 })` |
| `grade` | `varchar("grade", { length: 64 })` |
| `verdict` | `varchar("verdict", { length: 32 })` |
| `categoryScores` | `json("categoryScores").$type<Record<string, number>>()` |
| `ukBanda` | `varchar("ukBanda", { length: 64 })` |
| `usGpa` | `varchar("usGpa", { length: 16 })` |
| `indiaCgpa` | `varchar("indiaCgpa", { length: 16 })` |
| `apacGrade` | `varchar("apacGrade", { length: 16 })` |
| `chinaGrade` | `varchar("chinaGrade", { length: 32 })` |
| `goldenQuote` | `text("goldenQuote")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 9. review_category_scores

Export: `reviewCategoryScores`; source line: 255.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `roundCode` | `varchar("roundCode", { length: 16 }).notNull()` |
| `category` | `varchar("category", { length: 128 }).notNull()` |
| `score` | `varchar("score", { length: 32 }).notNull()` |
| `delta` | `varchar("delta", { length: 32 })` |
| `notes` | `text("notes")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 10. review_package_scores

Export: `reviewPackageScores`; source line: 274.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `roundCode` | `varchar("roundCode", { length: 16 }).notNull()` |
| `packageName` | `varchar("packageName", { length: 256 }).notNull()` |
| `category` | `varchar("category", { length: 256 }).notNull()` |
| `score` | `varchar("score", { length: 32 }).notNull()` |
| `notes` | `text("notes")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 11. anchor_links

Export: `anchorLinks`; source line: 297.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `key` | `varchar("key", { length: 128 }).notNull().unique()` |
| `title` | `text("title").notNull()` |
| `url` | `text("url").notNull()` |
| `site` | `varchar("site", { length: 256 }).notNull()` |
| `description` | `text("description")` |
| `verifiedAt` | `timestamp("verifiedAt")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 12. perspective_scores

Export: `perspectiveScores`; source line: 322.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `roundCode` | `varchar("roundCode", { length: 16 }).notNull()` |
| `role` | `varchar("role", { length: 128 }).notNull()` |
| `score` | `varchar("score", { length: 16 }).notNull()` |
| `notes` | `text("notes")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 13. chat_messages

Export: `chatMessages`; source line: 343.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `userId` | `int("userId").notNull()` |
| `displayName` | `varchar("displayName", { length: 256 }).notNull()` |
| `content` | `text("content").notNull()` |
| `messageType` | `mysqlEnum("messageType", ["message", "signal", "system"]).default("message").notNull()` |
| `replyToId` | `int("replyToId")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 14. chat_likes

Export: `chatLikes`; source line: 365.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `messageId` | `int("messageId").notNull()` |
| `userId` | `int("userId").notNull()` |
| `reactionType` | `mysqlEnum("reactionType", ["fire", "brain", "diamond", "lightning"]).default("fire").notNull()` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 15. channel_followers

Export: `channelFollowers`; source line: 384.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `userId` | `int("userId").notNull()` |
| `displayName` | `varchar("displayName", { length: 256 }).notNull()` |
| `notifyOnSignal` | `int("notifyOnSignal").default(1).notNull()` |
| `notifyOnReply` | `int("notifyOnReply").default(1).notNull()` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 16. pinned_messages

Export: `pinnedMessages`; source line: 403.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `messageId` | `int("messageId").notNull()` |
| `pinnedBy` | `int("pinnedBy").notNull()` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 17. icard_register

Export: `icardRegister`; source line: 427.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `cardId` | `varchar("cardId", { length: 64 }).notNull().unique()` |
| `blockNumber` | `int("blockNumber").notNull()` |
| `title` | `varchar("title", { length: 256 }).notNull()` |
| `category` | `mysqlEnum("category", [` |
| `cdnUrl` | `text("cdnUrl").notNull()` |
| `thumbnailUrl` | `text("thumbnailUrl")` |
| `pinnedTo` | `varchar("pinnedTo", { length: 128 })` |
| `createdBy` | `varchar("createdBy", { length: 128 }).notNull()` |
| `syncedToAcad` | `int("syncedToAcad").default(0).notNull()` |
| `acadCardId` | `varchar("acadCardId", { length: 64 })` |
| `description` | `text("description")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 18. translation_suggestions

Export: `translationSuggestions`; source line: 480.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `userId` | `int("userId").notNull()` |
| `displayName` | `varchar("displayName", { length: 256 }).notNull()` |
| `langCode` | `varchar("langCode", { length: 8 }).notNull()` |
| `translationKey` | `varchar("translationKey", { length: 256 }).notNull()` |
| `originalValue` | `text("originalValue")` |
| `suggestedValue` | `text("suggestedValue").notNull()` |
| `status` | `mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull()` |
| `reviewNote` | `text("reviewNote")` |
| `reviewedBy` | `int("reviewedBy")` |
| `reviewedAt` | `timestamp("reviewedAt")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

### 19. turing_papers

Export: `turingPapers`; source line: 521.

| Column | Drizzle definition |
|---|---|
| `id` | `int("id").autoincrement().primaryKey()` |
| `paperId` | `varchar("paperId", { length: 64 }).notNull().unique()` |
| `title` | `varchar("title", { length: 256 }).notNull()` |
| `author` | `varchar("author", { length: 256 }).notNull()` |
| `abstract` | `text("abstract")` |
| `publicationDate` | `timestamp("publicationDate")` |
| `category` | `varchar("category", { length: 64 }).notNull()` |
| `status` | `mysqlEnum("status", ["REGISTERED", "VERIFIED", "ARCHIVED"]).default("REGISTERED").notNull()` |
| `documentUrl` | `text("documentUrl")` |
| `documentHash` | `varchar("documentHash", { length: 256 })` |
| `registeredBy` | `varchar("registeredBy", { length: 128 }).notNull()` |
| `blockNumber` | `int("blockNumber")` |
| `verificationNote` | `text("verificationNote")` |
| `verifiedBy` | `varchar("verifiedBy", { length: 128 })` |
| `verifiedAt` | `timestamp("verifiedAt")` |
| `createdAt` | `timestamp("createdAt").defaultNow().notNull()` |

## Scope and limitation

The repository currently contains **19** `mysqlTable` declarations across `drizzle/schema.ts` and `drizzle/relations.ts`. If a separate manifest refers to 50 tables, that manifest describes a different schema version, another project, or tables not present in this restored source tree. This export does not invent additional tables; the discrepancy is recorded for reconciliation.

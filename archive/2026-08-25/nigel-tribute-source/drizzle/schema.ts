import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with Stripe subscription fields for Centurion Access.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  /** Stripe customer ID — links to Stripe for subscription management */
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  /** Active Stripe subscription ID — null means free tier */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Expense tracking table — for Nigel + Peggy financial dashboard
 */
export const expenses = mysqlTable("expenses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  description: text("description"),
  amount: int("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;

/**
 * TECTON — HyperAlphaLexicon Britannica entries
 * The dictionary & thesaurus of consciousness.
 * Database-driven: no more static JSON. The lexicon IS the infrastructure.
 *
 * Each entry stores the full linguistic profile:
 *   term, part of speech, morphology, roots, etymology,
 *   HICE classification, conjugation, and word-choice rationale.
 */
export const tectonEntries = mysqlTable("tecton_entries", {
  id: int("id").autoincrement().primaryKey(),
  /** The term itself — e.g. "FITS", "HyperGrid", "Parallax Dual Focus" */
  term: varchar("term", { length: 256 }).notNull().unique(),
  /** Part of speech codes — JSON array e.g. ["N","ACR"] */
  partOfSpeech: json("partOfSpeech").$type<string[]>().notNull(),
  /** Morphological breakdown — e.g. "Feeler + Intuit + Thinker + Strategist" */
  morphology: text("morphology").notNull(),
  /** Root language/origin codes — JSON array e.g. ["ENG","MIL"] */
  roots: json("roots").$type<string[]>().notNull(),
  /** Etymology / definition — the full explanation */
  etymology: text("etymology").notNull(),
  /** HICE classification: H=Holistic, I=Innate, C=Created, E=Embodied */
  hice: varchar("hice", { length: 1 }).notNull(),
  /** Conjugation / usage notes */
  conjugation: text("conjugation").notNull(),
  /** Why this word — the rationale for the word choice */
  whyThisWord: text("whyThisWord").notNull(),
  /** Sort order for display — allows manual reordering */
  sortOrder: int("sortOrder").default(0).notNull(),
  /** Block number when entry was created/last edited */
  block: int("block"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TectonEntry = typeof tectonEntries.$inferSelect;
export type InsertTectonEntry = typeof tectonEntries.$inferInsert;

/**
 * TECTON metadata — stores the coherence pipeline, word classes,
 * morphology key, HICE classification, and version info.
 * Single-row table (key-value store for the TECTON config).
 */
export const tectonMeta = mysqlTable("tecton_meta", {
  id: int("id").autoincrement().primaryKey(),
  /** Meta key — e.g. "coherencePipeline", "wordClasses", "version" */
  key: varchar("key", { length: 64 }).notNull().unique(),
  /** JSON value */
  value: json("value").$type<any>().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TectonMeta = typeof tectonMeta.$inferSelect;
export type InsertTectonMeta = typeof tectonMeta.$inferInsert;

/**
 * DCSN — Dearden Consciousness Supersymmetry Network
 * Node Register — the permanent, immutable ledger of all network participants.
 * Once a node number is assigned and an iCard issued, it is HARD LOCKED.
 * Node numbers are chronological from activation date.
 */
export const dcsnNodes = mysqlTable("dcsn_nodes", {
  id: int("id").autoincrement().primaryKey(),
  /** Permanent node number — e.g. "000", "001", "018" — HARD LOCKED once issued */
  nodeNumber: varchar("nodeNumber", { length: 6 }).notNull().unique(),
  /** Full name of the node holder */
  name: varchar("name", { length: 256 }).notNull(),
  /** Title/designation on iCard — e.g. "The Architect", "Captain Bao — Dino Legend & Entrepreneur" */
  designation: text("designation"),
  /** WhatsApp group or cell assignment */
  cell: varchar("cell", { length: 256 }),
  /** Node number of the recruiter — null for founder */
  recruitedBy: varchar("recruitedBy", { length: 6 }),
  /** Relation to recruiter — e.g. "Nephew", "Colleague", "Friend" */
  relation: varchar("relation", { length: 256 }),
  /** Status: ACTIVATED, PENDING, DORMANT, CHALLENGE_ISSUED */
  status: mysqlEnum("status", ["ACTIVATED", "PENDING", "DORMANT", "CHALLENGE_ISSUED"]).default("ACTIVATED").notNull(),
  /** CDN URL of the issued iCard image — once issued, this is the permanent record */
  icardUrl: text("icardUrl"),
  /** iCard version — e.g. "v1", "BETA v2" */
  icardVersion: varchar("icardVersion", { length: 16 }),
  /** Block number at activation */
  activationBlock: int("activationBlock"),
  /** Day number since Vector Zero */
  activationDay: int("activationDay"),
  /** Activation date */
  activationDate: timestamp("activationDate"),
  /** Intelligence type — e.g. HUMINT, HUMINT/SIGINT, HUMINT/GEOINT */
  intelType: varchar("intelType", { length: 64 }),
  /** Access classification — UNCLASSIFIED, RESTRICTED, CONFIDENTIAL, SECRET, TOP SECRET, TOP SECRET/SCI */
  accessLevel: varchar("accessLevel", { length: 32 }),
  /** Diamond-Class Spider Network level — e.g. "Lv.7 MASTER WEAVER", "Lv.1 SPIDER" */
  spiderLevel: varchar("spiderLevel", { length: 64 }),
  /** Additional metadata — enterprise, title, domain, etc. */
  metadata: json("metadata").$type<Record<string, string>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DcsnNode = typeof dcsnNodes.$inferSelect;
export type InsertDcsnNode = typeof dcsnNodes.$inferInsert;
// This will be merged into schema.ts

/**
 * DCSN CARD VERSION HISTORY - Immutable audit log
 * Every card version ever issued is recorded here.
 * Once a row is inserted it must NEVER be updated or deleted.
 * This is the legal chain of custody for card issuance.
 */
export const dcsnCardVersions = mysqlTable("dcsn_card_versions", {
  id: int("id").autoincrement().primaryKey(),
  /** Node number at time of issuance */
  nodeNumber: varchar("nodeNumber", { length: 6 }).notNull(),
  /** Name on card at time of issuance */
  name: varchar("name", { length: 256 }).notNull(),
  /** Card version e.g. BETA v1, BETA v5, BETA v8 */
  cardVersion: varchar("cardVersion", { length: 32 }).notNull(),
  /** CDN URL of the card image - permanent, immutable */
  cdnUrl: text("cdnUrl"),
  /** Block number when this version was created */
  blockNumber: int("blockNumber"),
  /** Who/what created this version e.g. MANUS_AI, NIGEL_MANUAL */
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  /** Snapshot of all card fields at time of issuance */
  cardData: json("cardData").$type<Record<string, string>>(),
  /** Change description - what changed from previous version */
  changeNote: text("changeNote"),
  /** Timestamp - immutable, set once */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type DcsnCardVersion = typeof dcsnCardVersions.$inferSelect;
export type InsertDcsnCardVersion = typeof dcsnCardVersions.$inferInsert;

/**
 * REVIEW MATRIX — R1/R2/R3 Combined Panel Data
 * The permanent record of all review rounds, university scores,
 * and category breakdowns. Database-anchored for the site.
 */

/** Review Rounds — R1, R2, R3 metadata */
export const reviewRounds = mysqlTable("review_rounds", {
  id: int("id").autoincrement().primaryKey(),
  /** Round code — e.g. "R1", "R2", "R3" */
  roundCode: varchar("roundCode", { length: 16 }).notNull().unique(),
  /** Round name — e.g. "ICE Assessment", "20-Perspective Panel", "Corrected Academic Audit" */
  roundName: varchar("roundName", { length: 256 }).notNull(),
  /** Date of the round */
  roundDate: varchar("roundDate", { length: 32 }).notNull(),
  /** Methodology description */
  methodology: text("methodology"),
  /** Panel size — number of reviewers/universities */
  panelSize: int("panelSize"),
  /** Overall score for this round (percentage or out of 100) */
  overallScore: varchar("overallScore", { length: 32 }),
  /** Classification — e.g. "Conditional GO", "First Class", "Platinum Grade" */
  classification: varchar("classification", { length: 128 }),
  /** Verdict — GO / CONDITIONAL GO / NO-GO */
  verdict: varchar("verdict", { length: 64 }),
  /** UK Banda equivalent — e.g. "Upper Second (2:1)", "First Class" */
  ukBanda: varchar("ukBanda", { length: 64 }),
  /** US GPA equivalent — e.g. "3.3", "4.0" */
  usGpa: varchar("usGpa", { length: 16 }),
  /** India CGPA equivalent — e.g. "7.5", "8.8" */
  indiaCgpa: varchar("indiaCgpa", { length: 16 }),
  /** APAC grade — e.g. "B+", "A/S" */
  apacGrade: varchar("apacGrade", { length: 16 }),
  /** China grade — e.g. "Good", "Excellent" */
  chinaGrade: varchar("chinaGrade", { length: 32 }),
  /** Block number */
  block: int("block"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReviewRound = typeof reviewRounds.$inferSelect;
export type InsertReviewRound = typeof reviewRounds.$inferInsert;

/** University Scores — per-university, per-round scores */
export const reviewUniversityScores = mysqlTable("review_university_scores", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to review_rounds.roundCode */
  roundCode: varchar("roundCode", { length: 16 }).notNull(),
  /** University name */
  university: varchar("university", { length: 256 }).notNull(),
  /** Region — UK, US, India, APAC, China, Middle East */
  region: varchar("region", { length: 64 }).notNull(),
  /** Overall score for this university in this round */
  overallScore: varchar("overallScore", { length: 32 }),
  /** Grade/classification — e.g. "First Class", "A", "8.7 CGPA" */
  grade: varchar("grade", { length: 64 }),
  /** Verdict — "Yes", "Conditional", "No" */
  verdict: varchar("verdict", { length: 32 }),
  /** Category breakdown — JSON object with category:score pairs */
  categoryScores: json("categoryScores").$type<Record<string, number>>(),
  /** UK Banda equivalent */
  ukBanda: varchar("ukBanda", { length: 64 }),
  /** US GPA equivalent */
  usGpa: varchar("usGpa", { length: 16 }),
  /** India CGPA equivalent */
  indiaCgpa: varchar("indiaCgpa", { length: 16 }),
  /** APAC grade */
  apacGrade: varchar("apacGrade", { length: 16 }),
  /** China grade */
  chinaGrade: varchar("chinaGrade", { length: 32 }),
  /** Golden quote — notable quote from this reviewer */
  goldenQuote: text("goldenQuote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReviewUniversityScore = typeof reviewUniversityScores.$inferSelect;
export type InsertReviewUniversityScore = typeof reviewUniversityScores.$inferInsert;

/** Category Scores — aggregate per-category, per-round */
export const reviewCategoryScores = mysqlTable("review_category_scores", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to review_rounds.roundCode */
  roundCode: varchar("roundCode", { length: 16 }).notNull(),
  /** Category name — e.g. "Content Quality", "Pedagogical Framework" */
  category: varchar("category", { length: 128 }).notNull(),
  /** Score for this category in this round */
  score: varchar("score", { length: 32 }).notNull(),
  /** Delta from previous round (if applicable) */
  delta: varchar("delta", { length: 32 }),
  /** Notes */
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReviewCategoryScore = typeof reviewCategoryScores.$inferSelect;
export type InsertReviewCategoryScore = typeof reviewCategoryScores.$inferInsert;

/** Review Package Scores — for R1's 3-package structure */
export const reviewPackageScores = mysqlTable("review_package_scores", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to review_rounds.roundCode */
  roundCode: varchar("roundCode", { length: 16 }).notNull(),
  /** Package name — e.g. "Freeform Explorer", "Guided Campaign", "Academic Programme" */
  packageName: varchar("packageName", { length: 256 }).notNull(),
  /** Category name */
  category: varchar("category", { length: 256 }).notNull(),
  /** Score */
  score: varchar("score", { length: 32 }).notNull(),
  /** Notes */
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReviewPackageScore = typeof reviewPackageScores.$inferSelect;
export type InsertReviewPackageScore = typeof reviewPackageScores.$inferInsert;

/**
 * Permanent Anchor Links — Hard-saved cross-site references that must NEVER be lost.
 * These are the single-source-of-truth URLs for critical project data.
 * Any agent reading this schema MUST check this table before searching for data.
 */
export const anchorLinks = mysqlTable("anchor_links", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique key for programmatic lookup, e.g. "ASSESSMENT_RESULTS_MASTER" */
  key: varchar("key", { length: 128 }).notNull().unique(),
  /** Human-readable title */
  title: text("title").notNull(),
  /** The permanent URL — single source of truth */
  url: text("url").notNull(),
  /** Which site owns this data */
  site: varchar("site", { length: 256 }).notNull(),
  /** What this link contains — detailed description */
  description: text("description"),
  /** When this was verified as live */
  verifiedAt: timestamp("verifiedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AnchorLink = typeof anchorLinks.$inferSelect;
export type InsertAnchorLink = typeof anchorLinks.$inferInsert;

/**
 * 20-Perspective Review Panel Scores
 * Each row = one reviewer persona's score for a specific round.
 * R2 used 20 distinct perspectives; future rounds may use different panels.
 */
export const perspectiveScores = mysqlTable("perspective_scores", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to review_rounds.roundCode */
  roundCode: varchar("roundCode", { length: 16 }).notNull(),
  /** Reviewer persona role — e.g. "Philosopher", "Civil Engineer" */
  role: varchar("role", { length: 128 }).notNull(),
  /** Score out of 10 */
  score: varchar("score", { length: 16 }).notNull(),
  /** Optional notes or rationale */
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PerspectiveScore = typeof perspectiveScores.$inferSelect;
export type InsertPerspectiveScore = typeof perspectiveScores.$inferInsert;

/**
 * BOFFIN BIN — Binary Intelligence Network
 * Chat room messages — the first live interaction channel.
 * Public read, authenticated write. Every message is permanent record.
 */
export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to users.id — who sent this */
  userId: int("userId").notNull(),
  /** Display name at time of posting (snapshot — user may change name later) */
  displayName: varchar("displayName", { length: 256 }).notNull(),
  /** The message content */
  content: text("content").notNull(),
  /** Message type: "message" = normal, "signal" = suggestion/idea, "system" = system announcement */
  messageType: mysqlEnum("messageType", ["message", "signal", "system"]).default("message").notNull(),
  /** Reply threading — null = top-level message, number = ID of parent message */
  replyToId: int("replyToId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * BOFFIN BIN — Message Likes
 * Users can like/fire messages. One like per user per message.
 */
export const chatLikes = mysqlTable("chat_likes", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to chat_messages.id */
  messageId: int("messageId").notNull(),
  /** FK to users.id */
  userId: int("userId").notNull(),
  /** Reaction type — fire is the primary engagement reaction */
  reactionType: mysqlEnum("reactionType", ["fire", "brain", "diamond", "lightning"]).default("fire").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatLike = typeof chatLikes.$inferSelect;
export type InsertChatLike = typeof chatLikes.$inferInsert;

/**
 * BOFFIN BIN — Channel Followers
 * Users who follow the BIN channel get notified of new activity.
 * Drives retention and return visits.
 */
export const channelFollowers = mysqlTable("channel_followers", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to users.id */
  userId: int("userId").notNull(),
  /** Display name snapshot */
  displayName: varchar("displayName", { length: 256 }).notNull(),
  /** Notification preference */
  notifyOnSignal: int("notifyOnSignal").default(1).notNull(),
  notifyOnReply: int("notifyOnReply").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChannelFollower = typeof channelFollowers.$inferSelect;
export type InsertChannelFollower = typeof channelFollowers.$inferInsert;

/**
 * BOFFIN BIN — Pinned Messages
 * Admin can pin important messages to the top of the chat.
 */
export const pinnedMessages = mysqlTable("pinned_messages", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to chat_messages.id */
  messageId: int("messageId").notNull(),
  /** Who pinned it */
  pinnedBy: int("pinnedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PinnedMessage = typeof pinnedMessages.$inferSelect;
export type InsertPinnedMessage = typeof pinnedMessages.$inferInsert;

/**
 * iCARD REGISTER — Permanent Auditable Record
 * Every iCard ever generated is registered here with full metadata.
 * This is the central index for cross-site sync between Memorial and ACAD.
 * SAP-001 compliant — Cards First — This table IS the governance.
 *
 * Cross-Site Sync Protocol:
 * 1. Memorial creates iCard → inserts row here
 * 2. Memorial serves icardRegister.list API endpoint publicly
 * 3. ACAD reads icardRegister.list and inserts matching row in its own register
 * 4. Both sites verify sync by comparing card_ids
 */
export const icardRegister = mysqlTable("icard_register", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique card identifier — e.g. "BLOCK380-001" */
  cardId: varchar("cardId", { length: 64 }).notNull().unique(),
  /** Block number when card was created */
  blockNumber: int("blockNumber").notNull(),
  /** Card title — e.g. "Truthful Status", "Wiring Complete" */
  title: varchar("title", { length: 256 }).notNull(),
  /** Category: GOVERNANCE, TEACHING, BREACH, HANDSHAKE, COMPLETION, PLANNING, EXHIBITION, THESIS, SYMBOL, AIM, EVIDENCE, CE_THESIS, DISCOVERY, FRAMEWORK, VERIFICATION */
  category: mysqlEnum("category", [
    "GOVERNANCE",
    "TEACHING",
    "BREACH",
    "HANDSHAKE",
    "COMPLETION",
    "PLANNING",
    "EXHIBITION",
    "THESIS",
    "SYMBOL",
    "AIM",
    "EVIDENCE",
    "CE_THESIS",
    "DISCOVERY",
    "FRAMEWORK",
    "VERIFICATION",
  ]).notNull(),
  /** Full CDN URL to the original PNG image */
  cdnUrl: text("cdnUrl").notNull(),
  /** Compressed webp thumbnail URL */
  thumbnailUrl: text("thumbnailUrl"),
  /** Which page the card is pinned to — e.g. "governance", "turing-papers" */
  pinnedTo: varchar("pinnedTo", { length: 128 }),
  /** Which zone/agent created this card — e.g. "David", "Max (ACAD)" */
  createdBy: varchar("createdBy", { length: 128 }).notNull(),
  /** Whether this card has been synced to ACAD */
  syncedToAcad: int("syncedToAcad").default(0).notNull(),
  /** Matching card_id on ACAD side (if synced) */
  acadCardId: varchar("acadCardId", { length: 64 }),
  /** Description of what this card documents */
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IcardRegisterEntry = typeof icardRegister.$inferSelect;
export type InsertIcardRegisterEntry = typeof icardRegister.$inferInsert;

/**
 * TRANSLATION SUGGESTIONS — Community-driven translation volunteer system
 * Beta volunteers can suggest better translations for any key in any language.
 * Each suggestion is reviewed by admin before being applied.
 * Volunteers earn recognition (Translator iCard) for verified contributions.
 * "Help Translate" — every volunteer becomes a node in the network.
 */
export const translationSuggestions = mysqlTable("translation_suggestions", {
  id: int("id").autoincrement().primaryKey(),
  /** FK to users.id — who submitted this suggestion */
  userId: int("userId").notNull(),
  /** Display name at time of submission */
  displayName: varchar("displayName", { length: 256 }).notNull(),
  /** Language code — EN, ZH, KO, JA, HI, AR, ES, VI */
  langCode: varchar("langCode", { length: 8 }).notNull(),
  /** Translation key — e.g. "universe.title", "hardware.chipPipeline" */
  translationKey: varchar("translationKey", { length: 256 }).notNull(),
  /** The current/original value being replaced */
  originalValue: text("originalValue"),
  /** The suggested translation */
  suggestedValue: text("suggestedValue").notNull(),
  /** Status: pending, approved, rejected */
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  /** Admin review notes */
  reviewNote: text("reviewNote"),
  /** Who reviewed it */
  reviewedBy: int("reviewedBy"),
  /** When it was reviewed */
  reviewedAt: timestamp("reviewedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TranslationSuggestion = typeof translationSuggestions.$inferSelect;
export type InsertTranslationSuggestion = typeof translationSuggestions.$inferInsert;







/**
 * TURING PAPERS REGISTER — Legal Audit Record
 * Permanent immutable log of all Turing Paper registrations.
 * This is a legal record required for police/regulatory compliance.
 * Numbers are logged and verified, not invented.
 * Once a row is inserted, it must NEVER be updated or deleted.
 */
export const turingPapers = mysqlTable("turing_papers", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique Turing Paper ID — e.g. "TP-001", "TP-002" */
  paperId: varchar("paperId", { length: 64 }).notNull().unique(),
  /** Title of the paper/research */
  title: varchar("title", { length: 256 }).notNull(),
  /** Author name(s) */
  author: varchar("author", { length: 256 }).notNull(),
  /** Abstract or summary */
  abstract: text("abstract"),
  /** Publication date or submission date */
  publicationDate: timestamp("publicationDate"),
  /** Category — e.g. "RESEARCH", "THESIS", "EVIDENCE", "DISCOVERY" */
  category: varchar("category", { length: 64 }).notNull(),
  /** Status: REGISTERED, VERIFIED, ARCHIVED */
  status: mysqlEnum("status", ["REGISTERED", "VERIFIED", "ARCHIVED"]).default("REGISTERED").notNull(),
  /** CDN URL to the paper document */
  documentUrl: text("documentUrl"),
  /** Hash of document for integrity verification */
  documentHash: varchar("documentHash", { length: 256 }),
  /** Who registered this paper */
  registeredBy: varchar("registeredBy", { length: 128 }).notNull(),
  /** Block number at registration */
  blockNumber: int("blockNumber"),
  /** Verification notes */
  verificationNote: text("verificationNote"),
  /** Verified by (admin) */
  verifiedBy: varchar("verifiedBy", { length: 128 }),
  /** Verification timestamp */
  verifiedAt: timestamp("verifiedAt"),
  /** Immutable creation timestamp */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TuringPaper = typeof turingPapers.$inferSelect;
export type InsertTuringPaper = typeof turingPapers.$inferInsert;

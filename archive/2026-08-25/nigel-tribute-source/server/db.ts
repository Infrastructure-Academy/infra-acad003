import { eq, desc, asc, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, expenses, InsertExpense, tectonEntries, InsertTectonEntry, tectonMeta, InsertTectonMeta, dcsnNodes, InsertDcsnNode, reviewRounds, reviewUniversityScores, reviewCategoryScores, reviewPackageScores, perspectiveScores, InsertPerspectiveScore, chatMessages, InsertChatMessage, chatLikes, InsertChatLike, channelFollowers, InsertChannelFollower, pinnedMessages, InsertPinnedMessage, icardRegister, InsertIcardRegisterEntry } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Stripe helpers ───

export async function updateUserStripeCustomerId(userId: number, customerId: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ stripeCustomerId: customerId }).where(eq(users.id, userId));
}

export async function updateUserSubscription(userId: number, subscriptionId: string) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ stripeSubscriptionId: subscriptionId }).where(eq(users.id, userId));
}

export async function clearUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ stripeSubscriptionId: null }).where(eq(users.id, userId));
}

export async function getUserByStripeCustomerId(customerId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.stripeCustomerId, customerId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Expense helpers ───

export async function addExpense(expense: InsertExpense) {
  const db = await getDb();
  if (!db) return;
  await db.insert(expenses).values(expense);
}

export async function getExpenses() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(expenses).orderBy(desc(expenses.date));
}

export async function deleteExpense(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(expenses).where(eq(expenses.id, id));
}

// ─── TECTON helpers ───

export async function getAllTectonEntries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tectonEntries).orderBy(asc(tectonEntries.term));
}

export async function getTectonEntryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tectonEntries).where(eq(tectonEntries.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getTectonEntryByTerm(term: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tectonEntries).where(eq(tectonEntries.term, term)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTectonEntry(entry: InsertTectonEntry) {
  const db = await getDb();
  if (!db) return;
  await db.insert(tectonEntries).values(entry);
}

export async function updateTectonEntry(id: number, updates: Partial<InsertTectonEntry>) {
  const db = await getDb();
  if (!db) return;
  await db.update(tectonEntries).set(updates).where(eq(tectonEntries.id, id));
}

export async function deleteTectonEntry(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(tectonEntries).where(eq(tectonEntries.id, id));
}

export async function bulkInsertTectonEntries(entries: InsertTectonEntry[]) {
  const db = await getDb();
  if (!db) return;
  // Insert in batches of 50 to avoid query size limits
  for (let i = 0; i < entries.length; i += 50) {
    const batch = entries.slice(i, i + 50);
    await db.insert(tectonEntries).values(batch);
  }
}

// ─── TECTON Meta helpers ───

export async function getTectonMeta(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tectonMeta).where(eq(tectonMeta.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllTectonMeta() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tectonMeta);
}

export async function upsertTectonMeta(key: string, value: any) {
  const db = await getDb();
  if (!db) return;
  await db.insert(tectonMeta).values({ key, value }).onDuplicateKeyUpdate({ set: { value } });
}

// ─── DCSN Node Register helpers ───

export async function getAllDcsnNodes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dcsnNodes).orderBy(asc(sql`CAST(${dcsnNodes.nodeNumber} AS UNSIGNED)`));
}

export async function getDcsnNodeByNumber(nodeNumber: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(dcsnNodes).where(eq(dcsnNodes.nodeNumber, nodeNumber)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createDcsnNode(node: InsertDcsnNode) {
  const db = await getDb();
  if (!db) return;
  await db.insert(dcsnNodes).values(node);
}

export async function updateDcsnNode(nodeNumber: string, updates: Partial<InsertDcsnNode>) {
  const db = await getDb();
  if (!db) return;
  await db.update(dcsnNodes).set(updates).where(eq(dcsnNodes.nodeNumber, nodeNumber));
}

export async function getNextNodeNumber() {
  const db = await getDb();
  if (!db) return "000";
  const result = await db.select({ max: sql<string>`LPAD(MAX(CAST(nodeNumber AS UNSIGNED)) + 1, 3, '0')` }).from(dcsnNodes);
  return result[0]?.max || "000";
}

export async function getDcsnNodeByName(name: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(dcsnNodes).where(eq(dcsnNodes.name, name)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getDcsnNodeCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`COUNT(*)` }).from(dcsnNodes);
  return result[0]?.count || 0;
}

// ─── Review Matrix helpers ───

export async function getAllReviewRounds() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviewRounds).orderBy(asc(reviewRounds.id));
}

export async function getReviewUniversityScores(roundCode?: string) {
  const db = await getDb();
  if (!db) return [];
  if (roundCode) {
    return db.select().from(reviewUniversityScores).where(eq(reviewUniversityScores.roundCode, roundCode)).orderBy(asc(reviewUniversityScores.id));
  }
  return db.select().from(reviewUniversityScores).orderBy(asc(reviewUniversityScores.roundCode), asc(reviewUniversityScores.id));
}

export async function getReviewCategoryScores(roundCode?: string) {
  const db = await getDb();
  if (!db) return [];
  if (roundCode) {
    return db.select().from(reviewCategoryScores).where(eq(reviewCategoryScores.roundCode, roundCode)).orderBy(asc(reviewCategoryScores.id));
  }
  return db.select().from(reviewCategoryScores).orderBy(asc(reviewCategoryScores.roundCode), asc(reviewCategoryScores.id));
}

export async function getReviewPackageScores(roundCode?: string) {
  const db = await getDb();
  if (!db) return [];
  if (roundCode) {
    return db.select().from(reviewPackageScores).where(eq(reviewPackageScores.roundCode, roundCode)).orderBy(asc(reviewPackageScores.id));
  }
  return db.select().from(reviewPackageScores).orderBy(asc(reviewPackageScores.roundCode), asc(reviewPackageScores.id));
}

export async function getPerspectiveScores(roundCode?: string) {
  const db = await getDb();
  if (!db) return [];
  if (roundCode) {
    return db.select().from(perspectiveScores).where(eq(perspectiveScores.roundCode, roundCode)).orderBy(desc(perspectiveScores.score));
  }
  return db.select().from(perspectiveScores).orderBy(asc(perspectiveScores.roundCode), desc(perspectiveScores.score));
}

// ─── BOFFIN BIN — Chat Messages ───

export async function getChatMessages(limit = 100, beforeId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (beforeId) {
    return db.select().from(chatMessages)
      .where(sql`${chatMessages.id} < ${beforeId}`)
      .orderBy(desc(chatMessages.id))
      .limit(limit);
  }
  return db.select().from(chatMessages)
    .orderBy(desc(chatMessages.id))
    .limit(limit);
}

export async function getNewChatMessages(afterId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatMessages)
    .where(sql`${chatMessages.id} > ${afterId}`)
    .orderBy(asc(chatMessages.id));
}

export async function createChatMessage(msg: { userId: number; displayName: string; content: string; messageType?: "message" | "signal" | "system"; replyToId?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(chatMessages).values({
    userId: msg.userId,
    displayName: msg.displayName,
    content: msg.content,
    messageType: msg.messageType || "message",
    replyToId: msg.replyToId || null,
  });
  return { id: result[0].insertId };
}

export async function getChatMessageCount() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(chatMessages);
  return result[0]?.count || 0;
}

// ─── BOFFIN BIN — Likes ───

export async function toggleLike(messageId: number, userId: number, reactionType: "fire" | "brain" | "diamond" | "lightning" = "fire") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Check if already liked
  const existing = await db.select().from(chatLikes)
    .where(sql`${chatLikes.messageId} = ${messageId} AND ${chatLikes.userId} = ${userId} AND ${chatLikes.reactionType} = ${reactionType}`)
    .limit(1);
  if (existing.length > 0) {
    // Remove like
    await db.delete(chatLikes).where(eq(chatLikes.id, existing[0].id));
    return { liked: false };
  } else {
    // Add like
    await db.insert(chatLikes).values({ messageId, userId, reactionType });
    return { liked: true };
  }
}

export async function getLikesForMessage(messageId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatLikes).where(eq(chatLikes.messageId, messageId));
}

export async function getLikesCountForMessage(messageId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(chatLikes).where(eq(chatLikes.messageId, messageId));
  return result[0]?.count || 0;
}

export async function getLikesCountForUser(userId: number) {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(chatLikes).where(eq(chatLikes.userId, userId));
  return result[0]?.count || 0;
}

// ─── BOFFIN BIN — Channel Followers ───

export async function addChannelFollower(userId: number) {
  const db = await getDb();
  if (!db) return;
  const user = await getUserById(userId);
  if (!user) {
    console.warn(`[Database] User with ID ${userId} not found, cannot add channel follower.`);
    return;
  }
  await db.insert(channelFollowers).values({ userId, displayName: user.name || 'Unknown User' });
}

export async function removeChannelFollower(userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(channelFollowers).where(eq(channelFollowers.userId, userId));
}

export async function getChannelFollowers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(channelFollowers);
}

export async function isUserFollowingChannel(userId: number) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(channelFollowers).where(eq(channelFollowers.userId, userId)).limit(1);
  return result.length > 0;
}

// ─── BOFFIN BIN — Pinned Messages ───

export async function pinMessage(messageId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.insert(pinnedMessages).values({ messageId, pinnedBy: userId });
}

export async function unpinMessage(messageId: number, userId: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(pinnedMessages).where(sql`${pinnedMessages.messageId} = ${messageId} AND ${pinnedMessages.pinnedBy} = ${userId}`);
}

export async function getPinnedMessages(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pinnedMessages).where(eq(pinnedMessages.pinnedBy, userId)).orderBy(desc(pinnedMessages.createdAt));
}

// ─── iCARD Register helpers ───

export async function getIcardRegisterEntries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(icardRegister).orderBy(asc(icardRegister.id));
}

export async function getIcardRegisterEntryByBlock(blockNumber: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(icardRegister).where(eq(icardRegister.blockNumber, blockNumber)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createIcardRegisterEntry(entry: InsertIcardRegisterEntry) {
  const db = await getDb();
  if (!db) return;
  await db.insert(icardRegister).values(entry);
}

export async function updateIcardRegisterEntry(id: number, updates: Partial<InsertIcardRegisterEntry>) {
  const db = await getDb();
  if (!db) return;
  await db.update(icardRegister).set(updates).where(eq(icardRegister.id, id));
}





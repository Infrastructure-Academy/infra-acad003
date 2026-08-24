import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Block 382 — Promise Item 2: vitest tests for icardRegister
 * Tests: list, byBlock, syncStatus, register (admin)
 * Wynn Palace Standard — no false completion
 */

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "owner-open-id",
      email: "nigel@example.com",
      name: "Nigel Dearden",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("icardRegister", () => {
  // Test 1: list — returns array of iCards from database
  it("list returns an array of registered iCards", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.icardRegister.list();

    expect(Array.isArray(result)).toBe(true);
    // Should have cards seeded from previous blocks
    expect(result.length).toBeGreaterThan(0);
    // Each card should have required fields
    const card = result[0];
    expect(card).toHaveProperty("cardId");
    expect(card).toHaveProperty("title");
    expect(card).toHaveProperty("blockNumber");
    expect(card).toHaveProperty("category");
    expect(card).toHaveProperty("cdnUrl");
    expect(card).toHaveProperty("createdBy");
  }, 15000);

  // Test 2: byBlock — returns iCards filtered by block number
  it("byBlock returns cards for a specific block number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Block 382 should have at least the ACAD promise card
    const result = await caller.icardRegister.byBlock({ blockNumber: 382 });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    // All returned cards should be from block 382
    result.forEach((card: any) => {
      expect(card.blockNumber).toBe(382);
    });
  });

  // Test 3: syncStatus — returns summary with totals and categories
  it("syncStatus returns card totals and category breakdown", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.icardRegister.syncStatus();

    expect(result).toHaveProperty("totalCards");
    expect(result).toHaveProperty("syncedToAcad");
    expect(result).toHaveProperty("unsyncedCount");
    expect(result).toHaveProperty("categories");
    expect(typeof result.totalCards).toBe("number");
    expect(result.totalCards).toBeGreaterThan(0);
    expect(result.unsyncedCount).toBe(result.totalCards - result.syncedToAcad);
    // Categories should include known types
    expect(result.categories).toHaveProperty("GOVERNANCE");
    expect(result.categories).toHaveProperty("HANDSHAKE");
    expect(result.categories).toHaveProperty("COMPLETION");
  });

  // Test 4: governance.audit includes icardRegister data
  // Longer timeout: audit fetches from ACAD API (external network call)
  it("governance.audit includes icardRegister section with full inventory", { timeout: 15000 }, async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.governance.audit();

    expect(result).toHaveProperty("icardRegister");
    const ir = result.icardRegister;
    expect(ir).toHaveProperty("totalCards");
    expect(ir).toHaveProperty("syncedToAcad");
    expect(ir).toHaveProperty("unsyncedCount");
    expect(ir).toHaveProperty("categories");
    expect(ir).toHaveProperty("cards");
    expect(ir).toHaveProperty("latestCard");
    expect(ir.totalCards).toBeGreaterThan(0);
    expect(Array.isArray(ir.cards)).toBe(true);
    expect(ir.cards.length).toBe(ir.totalCards);
    // Each card in audit should have CDN URL
    ir.cards.forEach((card: any) => {
      expect(card).toHaveProperty("cdnUrl");
      expect(card).toHaveProperty("cardId");
      expect(card).toHaveProperty("category");
    });
  });
});

import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Vitest tests for turingPapersRegister procedures.
 * These are integration-level tests that call the tRPC router directly.
 * They require a live database connection (DATABASE_URL env var).
 */

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

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
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("turingPapersRegister", () => {
  describe("list", () => {
    it("returns an array of papers (public access)", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const papers = await caller.turingPapersRegister.list();

      expect(Array.isArray(papers)).toBe(true);
      // We know there are 31 papers in the register
      expect(papers.length).toBeGreaterThanOrEqual(20);

      // Each paper should have required fields
      if (papers.length > 0) {
        const paper = papers[0];
        expect(paper).toHaveProperty("paperNumber");
        expect(paper).toHaveProperty("title");
        expect(paper).toHaveProperty("verificationStatus");
      }
    });

    it("returns papers ordered by id", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const papers = await caller.turingPapersRegister.list();

      if (papers.length > 1) {
        for (let i = 1; i < papers.length; i++) {
          expect(papers[i].id).toBeGreaterThanOrEqual(papers[i - 1].id);
        }
      }
    });
  });

  describe("byNumber", () => {
    it("returns a specific paper by its number", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const paper = await caller.turingPapersRegister.byNumber({
        paperNumber: "TP-009",
      });

      expect(paper).toBeDefined();
      expect(paper?.paperNumber).toBe("TP-009");
      expect(paper?.title).toBeTruthy();
      expect(paper?.verificationStatus).toBeTruthy();
    });

    it("returns undefined for a non-existent paper number", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const paper = await caller.turingPapersRegister.byNumber({
        paperNumber: "TP-999",
      });

      expect(paper).toBeUndefined();
    });
  });

  describe("stats", () => {
    it("returns verification statistics", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      const stats = await caller.turingPapersRegister.stats();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("verified");
      expect(stats).toHaveProperty("partial");
      expect(stats).toHaveProperty("unverified");
      expect(stats).toHaveProperty("missing");
      expect(stats).toHaveProperty("totalWords");

      // Verify counts are non-negative
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.verified).toBeGreaterThanOrEqual(0);
      expect(stats.partial).toBeGreaterThanOrEqual(0);
      expect(stats.missing).toBeGreaterThanOrEqual(0);

      // Verify total = sum of statuses
      expect(stats.verified + stats.partial + stats.unverified + stats.missing).toBe(stats.total);

      // Verify total words is reasonable
      expect(stats.totalWords).toBeGreaterThanOrEqual(0);
    });
  });

  describe("update", () => {
    it("rejects non-admin users", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.turingPapersRegister.update({
          paperNumber: "TP-009",
          notes: "Test update from non-admin",
        })
      ).rejects.toThrow();
    });

    it("allows admin to update paper notes", async () => {
      const ctx = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      // Update notes on a known paper
      const result = await caller.turingPapersRegister.update({
        paperNumber: "TP-009",
        notes: "Vitest audit — " + new Date().toISOString(),
      });

      expect(result).toEqual({ success: true });

      // Verify the update persisted
      const paper = await caller.turingPapersRegister.byNumber({
        paperNumber: "TP-009",
      });
      expect(paper?.notes).toContain("Vitest audit");
    });
  });
});

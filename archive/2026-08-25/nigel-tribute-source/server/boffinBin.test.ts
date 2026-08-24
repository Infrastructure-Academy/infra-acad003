import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(userId = 1, name = "Test User"): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user${userId}@test.com`,
      name,
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("boffinBin", () => {
  // ─── Public Reads ───
  describe("messages (public)", () => {
    it("returns an array of messages", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const messages = await caller.boffinBin.messages({ limit: 10 });
      expect(Array.isArray(messages)).toBe(true);
    });
  });

  describe("followerCount (public)", () => {
    it("returns a number", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const count = await caller.boffinBin.followerCount();
      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  describe("engagementStats (public)", () => {
    it("returns messageCount and followerCount", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const stats = await caller.boffinBin.engagementStats();
      expect(stats).toHaveProperty("messageCount");
      expect(stats).toHaveProperty("followerCount");
      expect(typeof stats.messageCount).toBe("number");
      expect(typeof stats.followerCount).toBe("number");
    });
  });

  describe("pinnedIds (public)", () => {
    it("returns an array", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const ids = await caller.boffinBin.pinnedIds();
      expect(Array.isArray(ids)).toBe(true);
    });
  });

  describe("likeCounts (public)", () => {
    it("returns an object keyed by message ID", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      const counts = await caller.boffinBin.likeCounts({ messageIds: [] });
      expect(typeof counts).toBe("object");
    });
  });

  // ─── Authenticated Operations ───
  describe("send (authenticated)", () => {
    it("creates a message and returns an id", async () => {
      const ctx = createAuthContext(999, "BIN Tester");
      const caller = appRouter.createCaller(ctx);
      const result = await caller.boffinBin.send({
        content: "Test signal from vitest",
        messageType: "message",
      });
      expect(result).toHaveProperty("id");
      expect(typeof result.id).toBe("number");
    });
  });

  describe("follow / unfollow / isFollowing (authenticated)", () => {
    it("follow then check isFollowing returns true", async () => {
      const ctx = createAuthContext(998, "Follower Test");
      const caller = appRouter.createCaller(ctx);

      // Follow
      await caller.boffinBin.follow();
      const following = await caller.boffinBin.isFollowing();
      expect(following).toBe(true);

      // Unfollow
      await caller.boffinBin.unfollow();
      const afterUnfollow = await caller.boffinBin.isFollowing();
      expect(afterUnfollow).toBe(false);
    });
  });

  describe("toggleLike (authenticated)", () => {
    it("adds a reaction to a message", async () => {
      // First create a message to react to
      const ctx = createAuthContext(997, "Like Tester");
      const caller = appRouter.createCaller(ctx);
      const msg = await caller.boffinBin.send({
        content: "Message for reaction test",
        messageType: "message",
      });

      // Toggle like on
      const result = await caller.boffinBin.toggleLike({
        messageId: msg.id,
        reactionType: "fire",
      });
      expect(result).toHaveProperty("liked");
      expect(typeof result.liked).toBe("boolean");

      // Check like counts
      const counts = await caller.boffinBin.likeCounts({ messageIds: [msg.id] });
      expect(counts).toHaveProperty(String(msg.id));
    });
  });

  describe("myLikes (authenticated)", () => {
    it("returns reaction types for given message IDs", async () => {
      const ctx = createAuthContext(996, "MyLikes Tester");
      const caller = appRouter.createCaller(ctx);
      const likes = await caller.boffinBin.myLikes({ messageIds: [] });
      expect(typeof likes).toBe("object");
    });
  });
});

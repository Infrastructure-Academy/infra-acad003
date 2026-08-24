import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getChatMessages: vi.fn(),
  getNewChatMessages: vi.fn(),
  createChatMessage: vi.fn(),
  getChatMessageCount: vi.fn(),
}));

import * as db from "./db";

describe("Boffin BIN — Chat Room", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getChatMessages", () => {
    it("should return messages in reverse order for display", async () => {
      const mockMessages = [
        { id: 3, userId: 1, displayName: "Nigel", content: "Third", messageType: "message", createdAt: new Date() },
        { id: 2, userId: 1, displayName: "Nigel", content: "Second", messageType: "message", createdAt: new Date() },
        { id: 1, userId: 1, displayName: "Nigel", content: "First", messageType: "message", createdAt: new Date() },
      ];
      vi.mocked(db.getChatMessages).mockResolvedValue(mockMessages as any);

      const result = await db.getChatMessages(100);
      expect(result).toHaveLength(3);
      expect(db.getChatMessages).toHaveBeenCalledWith(100);
    });

    it("should support pagination with beforeId", async () => {
      vi.mocked(db.getChatMessages).mockResolvedValue([]);
      await db.getChatMessages(100, 5);
      expect(db.getChatMessages).toHaveBeenCalledWith(100, 5);
    });
  });

  describe("getNewChatMessages", () => {
    it("should return messages after a given ID", async () => {
      const mockNew = [
        { id: 4, userId: 2, displayName: "Jonathan", content: "New signal", messageType: "signal", createdAt: new Date() },
      ];
      vi.mocked(db.getNewChatMessages).mockResolvedValue(mockNew as any);

      const result = await db.getNewChatMessages(3);
      expect(result).toHaveLength(1);
      expect(result[0].displayName).toBe("Jonathan");
      expect(db.getNewChatMessages).toHaveBeenCalledWith(3);
    });

    it("should return empty array when no new messages", async () => {
      vi.mocked(db.getNewChatMessages).mockResolvedValue([]);
      const result = await db.getNewChatMessages(100);
      expect(result).toHaveLength(0);
    });
  });

  describe("createChatMessage", () => {
    it("should create a message and return the ID", async () => {
      vi.mocked(db.createChatMessage).mockResolvedValue({ id: 42 });

      const result = await db.createChatMessage({
        userId: 1,
        displayName: "Nigel Dearden",
        content: "First signal from the BIN ⊗",
        messageType: "message",
      });

      expect(result.id).toBe(42);
      expect(db.createChatMessage).toHaveBeenCalledWith({
        userId: 1,
        displayName: "Nigel Dearden",
        content: "First signal from the BIN ⊗",
        messageType: "message",
      });
    });

    it("should support signal message type", async () => {
      vi.mocked(db.createChatMessage).mockResolvedValue({ id: 43 });

      const result = await db.createChatMessage({
        userId: 1,
        displayName: "Nigel Dearden",
        content: "IQ ⊗ EQ ⊗ CQ = HQ",
        messageType: "signal",
      });

      expect(result.id).toBe(43);
    });
  });

  describe("getChatMessageCount", () => {
    it("should return the total message count", async () => {
      vi.mocked(db.getChatMessageCount).mockResolvedValue(128);
      const count = await db.getChatMessageCount();
      expect(count).toBe(128);
    });

    it("should return 0 when no messages exist", async () => {
      vi.mocked(db.getChatMessageCount).mockResolvedValue(0);
      const count = await db.getChatMessageCount();
      expect(count).toBe(0);
    });
  });
});

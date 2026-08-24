import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Import after mocking
import {
  fetchAcadNodeRegister,
  fetchAcadNodeCount,
  fetchAcadReviewRounds,
  fetchAcadUniversityScores,
  fetchAcadCategoryScores,
  fetchAcadPerspectiveScores,
  fetchAcadAnchorLinks,
  fetchAcadChatMessages,
  fetchAcadChatLikes,
  fetchAcadGameRelays,
  fetchAcadGameLeaderboard,
  checkBridgeStatus,
  verifyCrossSiteData,
} from "./acadBridge";

function mockTrpcResponse(data: any) {
  return {
    ok: true,
    json: async () => ({ result: { data: { json: data } } }),
  };
}

function mockTrpcError(message: string) {
  return {
    ok: true,
    json: async () => ({ error: { json: { message, code: -32004 } } }),
  };
}

describe("acadBridge v3.0 — 11 endpoints", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("fetchAcadNodeRegister", () => {
    it("returns node register with confirmed/pending/challenges", async () => {
      const register = {
        confirmed: [{ id: 1, name: "Nigel Dearden", status: "confirmed" }],
        pending: [{ id: 2, name: "Pending Node", status: "pending" }],
        challenges: [],
        totalConfirmed: 1,
      };
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(register));
      const result = await fetchAcadNodeRegister();
      expect(result.data).toEqual(register);
      expect(result.data?.confirmed).toHaveLength(1);
      expect(result.data?.totalConfirmed).toBe(1);
      expect(result.error).toBeNull();
    });
  });

  describe("fetchAcadNodeCount", () => {
    it("returns confirmed count", async () => {
      mockFetch.mockResolvedValueOnce(mockTrpcResponse({ count: 17 }));
      const result = await fetchAcadNodeCount();
      expect(result.data?.count).toBe(17);
      expect(result.error).toBeNull();
    });
  });

  describe("fetchAcadReviewRounds", () => {
    it("returns data on success", async () => {
      const rounds = [{ id: 1, roundCode: "R1", title: "Round 1" }];
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(rounds));
      const result = await fetchAcadReviewRounds();
      expect(result.data).toEqual(rounds);
      expect(result.error).toBeNull();
      expect(result.latencyMs).toBeGreaterThanOrEqual(0);
    });

    it("returns error on tRPC error", async () => {
      mockFetch.mockResolvedValueOnce(mockTrpcError("No procedure found"));
      const result = await fetchAcadReviewRounds();
      expect(result.data).toBeNull();
      expect(result.error).toBe("No procedure found");
    });

    it("returns error on HTTP failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
      const result = await fetchAcadReviewRounds();
      expect(result.data).toBeNull();
      expect(result.error).toBe("HTTP 500");
    });

    it("returns error on network failure", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      const result = await fetchAcadReviewRounds();
      expect(result.data).toBeNull();
      expect(result.error).toBe("Network error");
    });
  });

  describe("fetchAcadAnchorLinks", () => {
    it("returns anchor links with CDN URLs", async () => {
      const links = [
        { id: 1, anchorKey: "ASSESSMENT_RESULTS", title: "Assessment Results", cdnUrl: "https://example.com/results", hostSite: "infra-acad" },
      ];
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(links));
      const result = await fetchAcadAnchorLinks();
      expect(result.data).toHaveLength(1);
      expect(result.data?.[0].anchorKey).toBe("ASSESSMENT_RESULTS");
      expect(result.error).toBeNull();
    });
  });

  describe("fetchAcadChatLikes", () => {
    it("returns chat likes", async () => {
      const likes = [{ id: 1, messageId: 1, userId: 1, reaction: "like" }];
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(likes));
      const result = await fetchAcadChatLikes();
      expect(result.data).toHaveLength(1);
      expect(result.error).toBeNull();
    });
  });

  describe("fetchAcadGameRelays", () => {
    it("returns game relays", async () => {
      const relays = [{ id: 1, name: "Relay 1", challenges: 10 }];
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(relays));
      const result = await fetchAcadGameRelays();
      expect(result.data).toHaveLength(1);
      expect(result.error).toBeNull();
    });
  });

  describe("fetchAcadGameLeaderboard", () => {
    it("returns leaderboard entries", async () => {
      const leaders = [{ id: 1, name: "Player 1", score: 100 }];
      mockFetch.mockResolvedValueOnce(mockTrpcResponse(leaders));
      const result = await fetchAcadGameLeaderboard();
      expect(result.data).toHaveLength(1);
      expect(result.error).toBeNull();
    });
  });

  describe("checkBridgeStatus", () => {
    it("returns CONNECTED when all 11 endpoints respond", async () => {
      mockFetch
        .mockResolvedValueOnce(mockTrpcResponse({ confirmed: [{ id: 1 }], pending: [], challenges: [], totalConfirmed: 1 }))
        .mockResolvedValueOnce(mockTrpcResponse({ count: 17 }))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }, { id: 2 }, { id: 3 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }, { id: 2 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }, { id: 2 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]));

      const status = await checkBridgeStatus();
      expect(status.overallStatus).toBe("CONNECTED");
      expect(status.totalEndpoints).toBe(11);
      expect(status.connectedEndpoints).toBe(11);
      expect(status.endpoints).toHaveLength(11);
      expect(status.endpoints.every((e) => e.status === "ok")).toBe(true);
      expect(status.bridgeVersion).toBe("3.0");
      expect(status.acadSite).toBe("infra-acad-kuqzaex2.manus.space");
    });

    it("counts records correctly for nodes.getRegister (sum of arrays)", async () => {
      mockFetch
        .mockResolvedValueOnce(mockTrpcResponse({ confirmed: [{}, {}, {}], pending: [{}, {}], challenges: [{}], totalConfirmed: 3 }))
        .mockResolvedValueOnce(mockTrpcResponse({ count: 3 }))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]));

      const status = await checkBridgeStatus();
      const nodeRegisterEndpoint = status.endpoints.find(e => e.name === "nodes.getRegister");
      expect(nodeRegisterEndpoint?.recordCount).toBe(6);
      const nodeCountEndpoint = status.endpoints.find(e => e.name === "nodes.count");
      expect(nodeCountEndpoint?.recordCount).toBe(3);
    });

    it("returns PARTIAL when some endpoints fail", async () => {
      mockFetch
        .mockResolvedValueOnce(mockTrpcResponse({ confirmed: [], pending: [], challenges: [], totalConfirmed: 0 }))
        .mockResolvedValueOnce(mockTrpcResponse({ count: 0 }))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcError("Not found"))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcError("Not found"))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]));

      const status = await checkBridgeStatus();
      expect(status.overallStatus).toBe("PARTIAL");
      expect(status.connectedEndpoints).toBe(9);
    });

    it("returns DISCONNECTED when all endpoints fail", async () => {
      for (let i = 0; i < 11; i++) {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));
      }
      const status = await checkBridgeStatus();
      expect(status.overallStatus).toBe("DISCONNECTED");
      expect(status.connectedEndpoints).toBe(0);
    });
  });

  describe("verifyCrossSiteData", () => {
    it("returns VERIFIED when counts match", async () => {
      mockFetch
        .mockResolvedValueOnce(mockTrpcResponse({ confirmed: [{}, {}], pending: [{}], challenges: [], totalConfirmed: 2 }))
        .mockResolvedValueOnce(mockTrpcResponse([
          { id: 1, roundCode: "R1" },
          { id: 2, roundCode: "R1" },
          { id: 3, roundCode: "R3" },
          { id: 4, roundCode: "R3" },
          { id: 5, roundCode: "R3" },
        ]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }, { id: 2 }, { id: 3 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }, { id: 2 }]));

      const result = await verifyCrossSiteData({
        dcsnNodes: 26,
        r1Unis: 2,
        r3Unis: 3,
        r2Perspectives: 3,
      });

      expect(result.overallIntegrity).toBe("VERIFIED");
      expect(result.matches.find((m) => m.field === "R1 University Count")?.status).toBe("MATCH");
      expect(result.matches.find((m) => m.field === "R3 University Count")?.status).toBe("MATCH");
      expect(result.matches.find((m) => m.field === "R2 Perspective Count")?.status).toBe("MATCH");
      expect(result.matches.find((m) => m.field === "DCSN Confirmed Nodes")?.status).toBe("CROSS_REF");
      expect(result.acadSite.dcsnConfirmed).toBe(2);
      expect(result.acadSite.dcsnTotal).toBe(3);
      expect(result.acadSite.anchorLinks).toBe(2);
    });

    it("returns DISCREPANCIES_FOUND when counts mismatch", async () => {
      mockFetch
        .mockResolvedValueOnce(mockTrpcResponse({ confirmed: [], pending: [], challenges: [], totalConfirmed: 0 }))
        .mockResolvedValueOnce(mockTrpcResponse([
          { id: 1, roundCode: "R1" },
          { id: 2, roundCode: "R3" },
        ]))
        .mockResolvedValueOnce(mockTrpcResponse([{ id: 1 }]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]))
        .mockResolvedValueOnce(mockTrpcResponse([]));

      const result = await verifyCrossSiteData({
        dcsnNodes: 26,
        r1Unis: 12,
        r3Unis: 15,
        r2Perspectives: 20,
      });

      expect(result.overallIntegrity).toBe("DISCREPANCIES_FOUND");
    });
  });
});

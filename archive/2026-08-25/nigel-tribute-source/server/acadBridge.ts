/**
 * API Bridge — Memorial Site → Acad Site (Master Controller)
 * 
 * Fetches live data from the Acad site's public tRPC endpoints.
 * This bridge makes the Memorial site a verified reader of the
 * canonical Acad database, establishing the governance hierarchy:
 * 
 *   ACAD SITE (Master Controller)  — 9 endpoints
 *       ↓ API Bridge (this module)
 *   MEMORIAL SITE (Thesis Repository)
 *       ↓ (future)
 *   TRE GAME (Assessment Engine)
 * 
 * All endpoints are public (no auth required).
 * Data is fetched server-side to avoid CORS issues.
 * 
 * Block 375 — 9 endpoints verified:
 *   1. nodes.getRegister   → 31 nodes (17 confirmed, 9 pending, 5 challenges)
 *   2. nodes.count          → 17 confirmed
 *   3. review.getRounds     → 3 rounds
 *   4. review.getUniversityScores → 29 scores
 *   5. review.getCategoryScores   → 12 categories
 *   6. review.getPerspectiveScores → 20 perspectives
 *   7. review.getAnchorLinks → 12 CDN URLs
 *   8. chat.getMessages     → 8 messages
 *   9. chat.getLikes         → 3 likes
 *
 * Block 376 — TRE Game Bridge (2 public endpoints):
 *  10. game.getRelays       → 14 relays
 *  11. game.getLeaderboard  → 21 entries
 */

const ACAD_BASE = "https://infra-acad-kuqzaex2.manus.space/api/trpc";

interface AcadResponse<T> {
  result: {
    data: {
      json: T;
    };
  };
}

interface AcadError {
  error: {
    json: {
      message: string;
      code: number;
    };
  };
}

// ─── Types matching Acad site's tRPC responses ───

export interface AcadDcsnNode {
  id: number;
  nodeNumber: number;
  name: string;
  title: string;
  classification: string;
  status: string;
  activationBlock: number | null;
  activationDay: number | null;
  activationDate: string | null;
  location: string | null;
  groupAffiliation: string | null;
  subDesignation: string | null;
  userId: number | null;
  email: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AcadNodeRegister {
  confirmed: AcadDcsnNode[];
  pending: AcadDcsnNode[];
  challenges: AcadDcsnNode[];
  totalConfirmed: number;
}

export interface AcadNodeCount {
  count: number;
}

export interface AcadReviewRound {
  id: number;
  roundCode: string;
  title: string;
  status: string;
  universitiesAssessed: number;
  scoringVersion: string;
  createdAt: string;
}

export interface AcadUniversityScore {
  id: number;
  roundCode: string;
  university: string;
  region: string;
  overallScore: string;
  grade: string;
  verdict?: string;
  createdAt: string;
}

export interface AcadCategoryScore {
  id: number;
  roundCode: string;
  categoryName: string;
  score: string;
  weight: string;
  createdAt: string;
}

export interface AcadPerspectiveScore {
  id: number;
  roundCode: string;
  perspectiveName: string;
  score: string;
  grade: string;
  createdAt: string;
}

export interface AcadAnchorLink {
  id: number;
  anchorKey: string;
  title: string;
  cdnUrl: string;
  hostSite: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface AcadChatMessage {
  id: number;
  userId: number;
  displayName: string;
  content: string;
  messageType: string;
  createdAt: string;
}

export interface AcadChatLike {
  id: number;
  messageId: number;
  userId: number;
  reaction: string;
  createdAt: string;
}

// ─── Fetch helper with timeout and error handling ───

async function fetchAcad<T>(endpoint: string, timeoutMs = 10000): Promise<{ data: T | null; error: string | null; latencyMs: number }> {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(`${ACAD_BASE}/${endpoint}`, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
        "User-Agent": "MemorialSite-APIBridge/2.0",
      },
    });
    clearTimeout(timeout);
    
    const latencyMs = Date.now() - start;
    
    if (!response.ok) {
      return { data: null, error: `HTTP ${response.status}`, latencyMs };
    }
    
    const body = await response.json() as AcadResponse<T> | AcadError;
    
    if ("error" in body) {
      return { data: null, error: (body as AcadError).error.json.message, latencyMs };
    }
    
    return { data: (body as AcadResponse<T>).result.data.json, error: null, latencyMs };
  } catch (err: any) {
    const latencyMs = Date.now() - start;
    if (err.name === "AbortError") {
      return { data: null, error: `Timeout after ${timeoutMs}ms`, latencyMs };
    }
    return { data: null, error: err.message || "Unknown error", latencyMs };
  }
}

// ─── Public API — All 9 Acad Endpoints ───

// 1. nodes.getRegister — full DCSN node register
export async function fetchAcadNodeRegister() {
  return fetchAcad<AcadNodeRegister>("nodes.getRegister");
}

// 2. nodes.count — confirmed node count
export async function fetchAcadNodeCount() {
  return fetchAcad<AcadNodeCount>("nodes.count");
}

// 3. review.getRounds
export async function fetchAcadReviewRounds() {
  return fetchAcad<AcadReviewRound[]>("review.getRounds");
}

// 4. review.getUniversityScores
export async function fetchAcadUniversityScores() {
  return fetchAcad<AcadUniversityScore[]>("review.getUniversityScores");
}

// 5. review.getCategoryScores
export async function fetchAcadCategoryScores() {
  return fetchAcad<AcadCategoryScore[]>("review.getCategoryScores");
}

// 6. review.getPerspectiveScores
export async function fetchAcadPerspectiveScores() {
  return fetchAcad<AcadPerspectiveScore[]>("review.getPerspectiveScores");
}

// 7. review.getAnchorLinks
export async function fetchAcadAnchorLinks() {
  return fetchAcad<AcadAnchorLink[]>("review.getAnchorLinks");
}

// 8. chat.getMessages
export async function fetchAcadChatMessages() {
  return fetchAcad<AcadChatMessage[]>("chat.getMessages");
}

// 9. chat.getLikes
export async function fetchAcadChatLikes() {
  return fetchAcad<AcadChatLike[]>("chat.getLikes");
}

// ─── TRE Game Types ───

export interface AcadGameRelay {
  id: number;
  name: string;
  eraLabel: string;
  type: string;
  era: string;
  clockTime: string;
  webType: string;
  energyType: string;
  primalElement: string;
  description: string;
  [key: string]: any;
}

export interface AcadLeaderboardEntry {
  id: number;
  displayName: string;
  totalScore: number;
  level: number;
  relaysCompleted: number;
  [key: string]: any;
}

// 10. game.getRelays — TRE Game relay data
export async function fetchAcadGameRelays() {
  return fetchAcad<AcadGameRelay[]>("game.getRelays");
}

// 11. game.getLeaderboard — TRE Game leaderboard
export async function fetchAcadGameLeaderboard() {
  return fetchAcad<AcadLeaderboardEntry[]>("game.getLeaderboard");
}

// ─── Full bridge status check — ALL 11 ENDPOINTS ───

export interface BridgeEndpoint {
  name: string;
  status: "ok" | "error";
  recordCount: number | null;
  latencyMs: number;
  error: string | null;
}

export interface BridgeStatus {
  acadSite: string;
  bridgeVersion: string;
  bridgeTimestamp: string;
  endpoints: BridgeEndpoint[];
  overallStatus: "CONNECTED" | "PARTIAL" | "DISCONNECTED";
  totalEndpoints: number;
  connectedEndpoints: number;
  totalLatencyMs: number;
}

function countRecords(data: any): number | null {
  if (data === null || data === undefined) return null;
  if (Array.isArray(data)) return data.length;
  // nodes.getRegister returns { confirmed: [], pending: [], challenges: [], totalConfirmed: n }
  if (typeof data === "object" && "confirmed" in data) {
    return (data.confirmed?.length ?? 0) + (data.pending?.length ?? 0) + (data.challenges?.length ?? 0);
  }
  // nodes.count returns { count: n }
  if (typeof data === "object" && "count" in data) {
    return data.count;
  }
  return null;
}

export async function checkBridgeStatus(): Promise<BridgeStatus> {
  const start = Date.now();
  
  const [nodeRegister, nodeCount, rounds, uniScores, catScores, perspectives, anchorLinks, messages, likes, gameRelays, leaderboard] = await Promise.all([
    fetchAcadNodeRegister(),
    fetchAcadNodeCount(),
    fetchAcadReviewRounds(),
    fetchAcadUniversityScores(),
    fetchAcadCategoryScores(),
    fetchAcadPerspectiveScores(),
    fetchAcadAnchorLinks(),
    fetchAcadChatMessages(),
    fetchAcadChatLikes(),
    fetchAcadGameRelays(),
    fetchAcadGameLeaderboard(),
  ]);
  
  const rawEndpoints = [
    { name: "nodes.getRegister", result: nodeRegister },
    { name: "nodes.count", result: nodeCount },
    { name: "review.getRounds", result: rounds },
    { name: "review.getUniversityScores", result: uniScores },
    { name: "review.getCategoryScores", result: catScores },
    { name: "review.getPerspectiveScores", result: perspectives },
    { name: "review.getAnchorLinks", result: anchorLinks },
    { name: "chat.getMessages", result: messages },
    { name: "chat.getLikes", result: likes },
    { name: "game.getRelays", result: gameRelays },
    { name: "game.getLeaderboard", result: leaderboard },
  ];
  
  const endpoints: BridgeEndpoint[] = rawEndpoints.map(({ name, result }) => ({
    name,
    status: result.error ? "error" : "ok",
    recordCount: countRecords(result.data),
    latencyMs: result.latencyMs,
    error: result.error,
  }));
  
  const connectedEndpoints = endpoints.filter(e => e.status === "ok").length;
  const overallStatus: BridgeStatus["overallStatus"] = 
    connectedEndpoints === endpoints.length ? "CONNECTED" :
    connectedEndpoints > 0 ? "PARTIAL" : "DISCONNECTED";
  
  return {
    acadSite: "infra-acad-kuqzaex2.manus.space",
    bridgeVersion: "3.0",
    bridgeTimestamp: new Date().toISOString(),
    endpoints,
    overallStatus,
    totalEndpoints: endpoints.length,
    connectedEndpoints,
    totalLatencyMs: Date.now() - start,
  };
}

// ─── Cross-site data verification ───

export interface CrossSiteVerification {
  timestamp: string;
  acadSite: {
    url: string;
    r1Universities: number;
    r3Universities: number;
    r2Perspectives: number;
    totalScores: number;
    dcsnConfirmed: number;
    dcsnTotal: number;
    anchorLinks: number;
    chatMessages: number;
    chatLikes: number;
  };
  memorialSite: {
    url: string;
    dcsnNodes: number;
    r1Universities: number;
    r3Universities: number;
    r2Perspectives: number;
  };
  matches: {
    field: string;
    acadValue: number | string;
    memorialValue: number | string;
    status: "MATCH" | "MISMATCH" | "ACAD_ONLY" | "MEMORIAL_ONLY" | "CROSS_REF";
  }[];
  overallIntegrity: "VERIFIED" | "DISCREPANCIES_FOUND";
}

export async function verifyCrossSiteData(memorialData: {
  dcsnNodes: number;
  r1Unis: number;
  r3Unis: number;
  r2Perspectives: number;
}): Promise<CrossSiteVerification> {
  const [nodeRegister, uniScores, perspectives, messages, likes, anchorLinks] = await Promise.all([
    fetchAcadNodeRegister(),
    fetchAcadUniversityScores(),
    fetchAcadPerspectiveScores(),
    fetchAcadChatMessages(),
    fetchAcadChatLikes(),
    fetchAcadAnchorLinks(),
  ]);
  
  const acadR1 = uniScores.data?.filter(s => s.roundCode === "R1").length ?? 0;
  const acadR3 = uniScores.data?.filter(s => s.roundCode === "R3").length ?? 0;
  const acadR2Persp = perspectives.data?.length ?? 0;
  const acadDcsnConfirmed = nodeRegister.data?.totalConfirmed ?? 0;
  const acadDcsnTotal = nodeRegister.data
    ? (nodeRegister.data.confirmed?.length ?? 0) + (nodeRegister.data.pending?.length ?? 0) + (nodeRegister.data.challenges?.length ?? 0)
    : 0;
  
  const matches: CrossSiteVerification["matches"] = [
    {
      field: "R1 University Count",
      acadValue: acadR1,
      memorialValue: memorialData.r1Unis,
      status: acadR1 === memorialData.r1Unis ? "MATCH" : "MISMATCH",
    },
    {
      field: "R3 University Count",
      acadValue: acadR3,
      memorialValue: memorialData.r3Unis,
      status: acadR3 === memorialData.r3Unis ? "MATCH" : "MISMATCH",
    },
    {
      field: "R2 Perspective Count",
      acadValue: acadR2Persp,
      memorialValue: memorialData.r2Perspectives,
      status: acadR2Persp === memorialData.r2Perspectives ? "MATCH" : "MISMATCH",
    },
    {
      field: "DCSN Confirmed Nodes",
      acadValue: acadDcsnConfirmed,
      memorialValue: memorialData.dcsnNodes,
      status: "CROSS_REF",
    },
    {
      field: "DCSN Total Nodes (incl. pending + challenges)",
      acadValue: acadDcsnTotal,
      memorialValue: memorialData.dcsnNodes,
      status: "CROSS_REF",
    },
    {
      field: "Anchor Links",
      acadValue: anchorLinks.data?.length ?? 0,
      memorialValue: "Bridge read-only",
      status: "ACAD_ONLY",
    },
    {
      field: "Chat Messages",
      acadValue: messages.data?.length ?? 0,
      memorialValue: "Bridge read-only",
      status: "ACAD_ONLY",
    },
    {
      field: "Chat Likes",
      acadValue: likes.data?.length ?? 0,
      memorialValue: "Bridge read-only",
      status: "ACAD_ONLY",
    },
  ];
  
  const hasDiscrepancy = matches.some(m => m.status === "MISMATCH");
  
  return {
    timestamp: new Date().toISOString(),
    acadSite: {
      url: "infra-acad-kuqzaex2.manus.space",
      r1Universities: acadR1,
      r3Universities: acadR3,
      r2Perspectives: acadR2Persp,
      totalScores: uniScores.data?.length ?? 0,
      dcsnConfirmed: acadDcsnConfirmed,
      dcsnTotal: acadDcsnTotal,
      anchorLinks: anchorLinks.data?.length ?? 0,
      chatMessages: messages.data?.length ?? 0,
      chatLikes: likes.data?.length ?? 0,
    },
    memorialSite: {
      url: "nigelmemorial-ucmtq9dn.manus.space",
      dcsnNodes: memorialData.dcsnNodes,
      r1Universities: memorialData.r1Unis,
      r3Universities: memorialData.r3Unis,
      r2Perspectives: memorialData.r2Perspectives,
    },
    matches,
    overallIntegrity: hasDiscrepancy ? "DISCREPANCIES_FOUND" : "VERIFIED",
  };
}

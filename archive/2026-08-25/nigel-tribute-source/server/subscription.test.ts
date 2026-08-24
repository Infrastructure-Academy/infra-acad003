import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "nigel@iaai.com",
    name: "Nigel Dearden",
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

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
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

describe("subscription.status", () => {
  it("returns free tier for user without stripe subscription", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.subscription.status();
    expect(result).toMatchObject({
      tier: "free",
      active: false,
    });
  });
});

describe("expenses (admin only)", () => {
  it("rejects non-admin users from listing expenses", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.expenses.list()).rejects.toThrow();
  });

  it("rejects non-admin users from adding expenses", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.expenses.add({
        category: "manus",
        amount: 1000,
        currency: "USD",
      }),
    ).rejects.toThrow();
  });

  it("allows admin to list expenses", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.expenses.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("allows admin to add an expense", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.expenses.add({
      category: "manus",
      description: "Manus Pro subscription March 2026",
      amount: 2000,
      currency: "USD",
    });
    expect(result).toEqual({ success: true });
  });
});

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";
import { transcribeAudio } from "./_core/voiceTranscription";
import { storagePut } from "./storage";
import { TRPCError } from "@trpc/server";
import { checkBridgeStatus, verifyCrossSiteData, fetchAcadUniversityScores, fetchAcadPerspectiveScores, fetchAcadNodeRegister, fetchAcadAnchorLinks, fetchAcadChatLikes, fetchAcadCategoryScores } from "./acadBridge";
import { createSubscriptionCheckout, createPortalSession, getSubscriptionDetails } from "./stripe/stripe";
import type { ProductKey } from "./stripe/products";

import { readFileSync } from 'fs';
import path from 'path';

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  isi: router({
    getWorkedExamples: publicProcedure.query(() => {
      const filePath = path.join(process.cwd(), 'tp064-work', 'isi_master_database.json');
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }),
  }),





  // --- Subscription / Stripe ---
  subscription: router({
    /** Get current user's subscription status */
    status: protectedProcedure.query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      if (!user) return { tier: "free" as const, active: false };

      if (user.stripeSubscriptionId && user.stripeCustomerId) {
        try {
          const sub = await getSubscriptionDetails(user.stripeCustomerId);
          if (sub) {
            return {
              tier: "centurion" as const,
              active: true,
              currentPeriodEnd: ((sub as any).current_period_end as number) * 1000,
              cancelAtPeriodEnd: (sub as any).cancel_at_period_end as boolean,
            };
          }
        } catch (err) {
          console.error("[Subscription] Error fetching status:", err);
        }
      }

      return { tier: "free" as const, active: false };
    }),

    /** Create a checkout session for subscription or product */
    checkout: protectedProcedure
      .input(
        z.object({
          productKey: z.enum(["centurionMonthly", "centurionYearly", "principiaPDF"]),
          origin: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const user = await db.getUserById(ctx.user.id);
        if (!user) throw new Error("User not found");

        const url = await createSubscriptionCheckout(
          input.productKey as ProductKey,
          user.id,
          user.email || "",
          user.name,
          input.origin,
        );

        return { url };
      }),

    /** Create a Stripe customer portal session for managing subscription */
    portal: protectedProcedure
      .input(z.object({ origin: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const user = await db.getUserById(ctx.user.id);
        if (!user?.stripeCustomerId) throw new Error("No Stripe customer found");

        const url = await createPortalSession(user.stripeCustomerId, input.origin);
        return { url };
      }),
  }),

  // --- TECTON - Database-driven lexicon ---
  tecton: router({
    /** Get all entries - public, powers the Tecton page */
    list: publicProcedure.query(async () => {
      return db.getAllTectonEntries();
    }),

    /** Get a single entry by ID */
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return db.getTectonEntryById(input.id);
      }),

    /** Get a single entry by term */
    getByTerm: publicProcedure
      .input(z.object({ term: z.string() }))
      .query(async ({ input }) => {
        return db.getTectonEntryByTerm(input.term);
      }),

    /** Create a new entry - admin only */
    create: adminProcedure
      .input(
        z.object({
          term: z.string().min(1),
          partOfSpeech: z.array(z.string()),
          morphology: z.string(),
          roots: z.array(z.string()),
          etymology: z.string(),
          hice: z.string().length(1),
          conjugation: z.string(),
          whyThisWord: z.string(),
          sortOrder: z.number().optional(),
          block: z.number().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        await db.createTectonEntry(input);
        return { success: true };
      }),

    /** Update an existing entry - admin only */
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          term: z.string().min(1).optional(),
          partOfSpeech: z.array(z.string()).optional(),
          morphology: z.string().optional(),
          roots: z.array(z.string()).optional(),
          etymology: z.string().optional(),
          hice: z.string().length(1).optional(),
          conjugation: z.string().optional(),
          whyThisWord: z.string().optional(),
          sortOrder: z.number().optional(),
          block: z.number().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateTectonEntry(id, updates);
        return { success: true };
      }),

    /** Delete an entry - admin only */
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteTectonEntry(input.id);
        return { success: true };
      }),

    /** Get all metadata (pipeline, word classes, etc.) */
    meta: publicProcedure.query(async () => {
      const rows = await db.getAllTectonMeta();
      const meta: Record<string, any> = {};
      for (const row of rows) {
        meta[row.key] = row.value;
      }
      return meta;
    }),

    /** Update metadata - admin only */
    updateMeta: adminProcedure
      .input(z.object({ key: z.string(), value: z.any() }))
      .mutation(async ({ input }) => {
        await db.upsertTectonMeta(input.key, input.value);
        return { success: true };
      }),

    /** Full JSON export - returns the complete TECTON dataset for portability */
    exportJson: publicProcedure.query(async () => {
      const entries = await db.getAllTectonEntries();
      const metaRows = await db.getAllTectonMeta();
      const meta: Record<string, any> = {};
      for (const row of metaRows) {
        meta[row.key] = row.value;
      }
      return {
        version: meta.version || "v3.0",
        block: meta.block || 360,
        coherencePipeline: meta.coherencePipeline || null,
        wordClasses: meta.wordClasses || [],
        morphologyKey: meta.morphologyKey || [],
        hiceClassification: meta.hiceClassification || {},
        entries: entries.map((e) => ({
          term: e.term,
          partOfSpeech: e.partOfSpeech,
          morphology: e.morphology,
          roots: e.roots,
          etymology: e.etymology,
          hice: e.hice,
          conjugation: e.conjugation,
          whyThisWord: e.whyThisWord,
        })),
      };
    }),
  }),

  // --- DCSN Node Register ---
  dcsn: router({
    /** Get all nodes - public, powers the Vault page.
     *  Block 380: NOW READS FROM ACAD API AS PRIMARY SOURCE.
     *  Falls back to local Memorial DB if ACAD is unreachable.
     */
    list: publicProcedure.query(async () => {
      // PRIMARY: Try ACAD API first
      const acadResult = await fetchAcadNodeRegister();
      if (!acadResult.error && acadResult.data) {
        const allNodes = [
          ...(acadResult.data.confirmed || []),
          ...(acadResult.data.pending || []),
          ...(acadResult.data.challenges || []),
        ];
        // Merge with local DB to get iCard URLs (ACAD doesn't store Memorial iCard URLs)
        const localNodes = await db.getAllDcsnNodes();
        const localMap = new Map(localNodes.map((n: any) => [String(n.nodeNumber), n]));
        return allNodes.map((n: any) => {
          const local = localMap.get(String(n.nodeNumber));
          return {
            id: n.id,
            nodeNumber: String(n.nodeNumber),
            name: n.name,
            designation: n.classification || n.title || "",
            title: n.title || n.classification || "",
            cell: local?.cell || n.groupAffiliation || "",
            recruitedBy: local?.recruitedBy || "",
            relation: local?.relation || n.subDesignation || "",
            status: n.status,
            icardUrl: local?.icardUrl || null,
            icardVersion: local?.icardVersion || null,
            activationBlock: n.activationBlock,
            activationDay: n.activationDay,
            activationDate: n.activationDate,
            metadata: local?.metadata || null,
            _source: "ACAD_API",
          };
        });
      }
      // FALLBACK: Local DB
      const localNodes = await db.getAllDcsnNodes();
      return localNodes.map((n: any) => ({ ...n, _source: "LOCAL_DB_FALLBACK" }));
    }),

    /** Get a single node by number */
    getByNumber: publicProcedure
      .input(z.object({ nodeNumber: z.string() }))
      .query(async ({ input }) => {
        return db.getDcsnNodeByNumber(input.nodeNumber);
      }),

    /** Get next available node number */
    nextNumber: publicProcedure.query(async () => {
      return db.getNextNodeNumber();
    }),

    /** Get total node count */
    count: publicProcedure.query(async () => {
      return db.getDcsnNodeCount();
    }),

    /** Create a new node - admin only */
    create: adminProcedure
      .input(
        z.object({
          nodeNumber: z.string(),
          name: z.string().min(1),
          designation: z.string(),
          cell: z.string().optional(),
          recruitedBy: z.string().optional(),
          relation: z.string().optional(),
          status: z.string().default("ACTIVATED"),
          icardUrl: z.string().optional(),
          icardVersion: z.string().optional(),
          activationBlock: z.number().optional(),
          activationDay: z.number().optional(),
          activationDate: z.string().optional(),
          metadata: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        await db.createDcsnNode(input as any);
        return { success: true };
      }),

    /** Update a node - admin only */
    update: adminProcedure
      .input(
        z.object({
          nodeNumber: z.string(),
          name: z.string().optional(),
          designation: z.string().optional(),
          cell: z.string().optional(),
          recruitedBy: z.string().optional(),
          relation: z.string().optional(),
          status: z.string().optional(),
          icardUrl: z.string().optional(),
          icardVersion: z.string().optional(),
          activationBlock: z.number().optional(),
          activationDay: z.number().optional(),
          activationDate: z.string().optional(),
          metadata: z.string().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const { nodeNumber, ...updates } = input;
        await db.updateDcsnNode(nodeNumber, updates as any);
        return { success: true };
      }),

    /** Generate iCard for a DCSN node - admin only */
    generateICard: adminProcedure
      .input(
        z.object({
          nodeNumber: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const node = await db.getDcsnNodeByNumber(input.nodeNumber);
        if (!node) {
          throw new TRPCError({ code: "NOT_FOUND", message: `Node ${input.nodeNumber} not found` });
        }

        // Build the iCard prompt - dark navy/gold aesthetic, DCSN branding
        const prompt = [
          `Create a premium identification card (iCard) for the Diamond-Class Spider Network (DCSN).`,
          `Dark navy background (#0b1a33) with gold (#d4a843) accents and borders.`,
          `Layout: landscape card, 16:9 aspect ratio.`,
          `Top: "DIAMOND-CLASS SPIDER NETWORK" in small gold tracking text.`,
          `Center-left: Large gold text "NODE #${node.nodeNumber}".`,
          `Center: Name "${node.name}" in large white text.`,
          `Below name: Designation "${node.designation || "DCSN Member"}" in smaller gold italic.`,
          `Bottom-left: "STATUS: ${node.status}" | "INTEL: ${node.intelType || "HUMINT"}" | "ACCESS: ${node.accessLevel || "UNCLASSIFIED"}".`,
          `Bottom-right: "${node.spiderLevel || "Lv.1 SPIDER"}" in gold.`,
          `Bottom center: "Block ${node.activationBlock || "368"}" in dim text.`,
          `Style: military/intelligence aesthetic, clean typography, subtle grid pattern overlay.`,
          `The symbol ⊗ (tensor) should appear as a watermark in the background.`,
          `No photographs. Text-only card with geometric accents.`,
        ].join(" ");

        try {
          const { generateImage } = await import("./_core/imageGeneration");
          const { url: icardUrl } = await generateImage({ prompt });

          if (icardUrl) {
            // Store the iCard URL on the node
            await db.updateDcsnNode(input.nodeNumber, {
              icardUrl,
              icardVersion: "AUTO-v1",
            });
          }

          return { success: true, icardUrl: icardUrl || null };
        } catch (err: any) {
          console.error(`[DCSN iCard] Generation failed for node ${input.nodeNumber}:`, err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `iCard generation failed: ${err.message}`,
          });
        }
      }),
  }),

  // --- Review Matrix ---
  reviewMatrix: router({
    /** Get all review rounds */
    rounds: publicProcedure.query(async () => {
      return db.getAllReviewRounds();
    }),

    /** Get university scores - optionally filter by round */
    universityScores: publicProcedure
      .input(z.object({ roundCode: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getReviewUniversityScores(input?.roundCode);
      }),

    /** Get category scores - optionally filter by round */
    categoryScores: publicProcedure
      .input(z.object({ roundCode: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getReviewCategoryScores(input?.roundCode);
      }),

    /** Get package scores - optionally filter by round */
    packageScores: publicProcedure
      .input(z.object({ roundCode: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return db.getReviewPackageScores(input?.roundCode);
      }),

    /** Get anchor links - optionally filter by round */
    anchorLinks: publicProcedure
      .input(z.object({ roundCode: z.string().optional() }).optional())
      .query(async () => {
        const acadResult = await fetchAcadAnchorLinks();
        if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
        return acadResult.data;
      }),

    /** Get all review data for a specific round */
    fullDataset: publicProcedure
      .input(z.object({ roundCode: z.string() }))
      .query(async ({ input }) => {
        const [universities, categories, packages, anchors] = await Promise.all([
          db.getReviewUniversityScores(input.roundCode),
          db.getReviewCategoryScores(input.roundCode),
          db.getReviewPackageScores(input.roundCode),
          fetchAcadAnchorLinks(),
        ]);
        return { universities, categories, packages, anchors };
      }),

    fullMatrix: publicProcedure.query(async () => {
      const [rounds, universityScores, categoryScores, packageScores] = await Promise.all([
        db.getAllReviewRounds(),
        db.getReviewUniversityScores(),
        db.getReviewCategoryScores(),
        db.getReviewPackageScores(),
      ]);
      return { rounds, universityScores, categoryScores, packageScores };
    }),

    // /** Submit a review - protected */
    // submit: protectedProcedure
    //   .input(
    //     z.object({
    //       roundCode: z.string(),
    //       universityScores: z.array(z.object({ universityId: z.number(), score: z.number() })),
    //       categoryScores: z.array(z.object({ categoryId: z.number(), score: z.number() })),
    //       packageScores: z.array(z.object({ packageId: z.number(), score: z.number() })),
    //       anchorLinks: z.array(z.object({ anchorId: z.number(), score: z.number() })),
    //     }),
    //   )
    //   .mutation(async ({ ctx, input }) => {
    //     await db.submitReview(
    //       ctx.user.id,
    //       input.roundCode,
    //       input.universityScores,
    //       input.categoryScores,
    //       input.packageScores,
    //       input.anchorLinks,
    //     );
    //     return { success: true };
    //   }),

    // /** Get user's review for a specific round */
    // myReview: protectedProcedure
    //   .input(z.object({ roundCode: z.string() }))
    //   .query(async ({ ctx, input }) => {
    //     return db.getUserReview(ctx.user.id, input.roundCode);
    //   }),

    /** Get all review data from ACAD API */
    acad: router({
      universityScores: publicProcedure
        .input(z.object({ roundCode: z.string().optional() }).optional())
        .query(async () => {
          const acadResult = await fetchAcadUniversityScores();
          if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
          return acadResult.data;
        }),
      perspectiveScores: publicProcedure
        .input(z.object({ roundCode: z.string().optional() }).optional())
        .query(async () => {
          const acadResult = await fetchAcadPerspectiveScores();
          if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
          return acadResult.data;
        }),
      nodeRegister: publicProcedure.query(async () => {
        const acadResult = await fetchAcadNodeRegister();
        if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
        return acadResult.data;
      }),
      anchorLinks: publicProcedure
        .input(z.object({ roundCode: z.string().optional() }).optional())
        .query(async () => {
          const acadResult = await fetchAcadAnchorLinks();
          if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
          return acadResult.data;
        }),
      chatLikes: publicProcedure
        .input(z.object({ roundCode: z.string().optional() }).optional())
        .query(async () => {
          const acadResult = await fetchAcadChatLikes();
          if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
          return acadResult.data;
        }),
      categoryScores: publicProcedure
        .input(z.object({ roundCode: z.string().optional() }).optional())
        .query(async () => {
          const acadResult = await fetchAcadCategoryScores();
          if (acadResult.error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: acadResult.error });
          return acadResult.data;
        }),
    }),
  }),

  // --- Chat ---
  chat: router({
    getMessages: publicProcedure
      .input(z.object({ limit: z.number().optional(), beforeId: z.number().optional() }))
      .query(async ({ input }) => {
        return db.getChatMessages(input.limit, input.beforeId);
      }),

    sendMessage: protectedProcedure
      .input(z.object({ content: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.createChatMessage({
          userId: ctx.user.id,
          displayName: ctx.user.name || "Anonymous",
          content: input.content,
        });
        return { success: true };
      }),

    likeMessage: protectedProcedure
      .input(z.object({ messageId: z.number(), reactionType: z.enum(["fire", "brain", "diamond", "lightning"]).optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.toggleLike(input.messageId, ctx.user.id, input.reactionType);
        return { success: true };
      }),

    unlikeMessage: protectedProcedure
      .input(z.object({ messageId: z.number(), reactionType: z.enum(["fire", "brain", "diamond", "lightning"]).optional() }))
      .mutation(async ({ ctx, input }) => {
        await db.toggleLike(input.messageId, ctx.user.id, input.reactionType);
        return { success: true };
      }),
  }),

  // --- LLM ---
  llm: router({
    invoke: protectedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        return invokeLLM(input);
      }),
  }),

  // --- Voice Transcription ---
  voice: router({
    transcribe: protectedProcedure
      .input(z.object({ audioUrl: z.string(), language: z.string().optional(), prompt: z.string().optional() }))
      .mutation(async ({ input }) => {
        const { transcribeAudio } = await import("./_core/voiceTranscription");
        return transcribeAudio(input);
      }),
  }),

  // --- Image Generation ---
  image: router({
    generate: protectedProcedure
      .input(z.object({ prompt: z.string(), originalImages: z.array(z.object({ url: z.string(), mimeType: z.string() })).optional() }))
      .mutation(async ({ input }) => {
        const { generateImage } = await import("./_core/imageGeneration");
        return generateImage(input);
      }),
  }),

  // --- Forge Bridge ---
  forge: router({
    checkStatus: publicProcedure.query(async () => {
      return checkBridgeStatus();
    }),
    verifyCrossSiteData: publicProcedure
      .input(z.object({ data: z.any() }))
      .mutation(async ({ input }) => {
        return verifyCrossSiteData(input.data);
      }),
  }),

  // --- Owner Notifications ---
  owner: router({
    notify: protectedProcedure
      .input(z.object({ title: z.string(), content: z.string() }))
      .mutation(async ({ input }) => {
        return notifyOwner(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;

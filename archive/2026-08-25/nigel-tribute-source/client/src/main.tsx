import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getLoginUrl } from "./const";
import "./index.css";

// CRITICAL: Force-override any platform-injected title.
// The Manus platform injects VITE_APP_TITLE at deploy time into <title> and og:title.
// This ensures the correct title is ALWAYS shown regardless of platform settings.
const CORRECT_TITLE = "Principia Tectonica — An Opus";

// Override document title immediately
document.title = CORRECT_TITLE;

// Override og:title and twitter:title meta tags
const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) ogTitle.setAttribute("content", CORRECT_TITLE);
const twitterTitle = document.querySelector('meta[name="twitter:title"]');
if (twitterTitle) twitterTitle.setAttribute("content", CORRECT_TITLE);

// Also observe and kill any future mutations that try to change the title back
const titleObserver = new MutationObserver(() => {
  if (document.title !== CORRECT_TITLE) {
    document.title = CORRECT_TITLE;
  }
});
const titleEl = document.querySelector("title");
if (titleEl) {
  titleObserver.observe(titleEl, { childList: true, characterData: true, subtree: true });
}

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </QueryClientProvider>
  </trpc.Provider>
);

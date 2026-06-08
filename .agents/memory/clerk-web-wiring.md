---
name: Clerk web wiring gotchas
description: Non-obvious correct facts about the Replit-managed Clerk web setup that look like bugs but aren't.
---

# Clerk (Replit-managed) web wiring gotchas

- **`clerkMiddleware` is mounted AFTER `express.json()`/`urlencoded()`, not before.** Only the Clerk *proxy* (`CLERK_PROXY_PATH` / `clerkProxyMiddleware`) must come before body parsers (it streams raw bytes). The canonical setup in `.local/skills/clerk-auth/references/setup-and-customization.md` deliberately orders clerkMiddleware after the parsers.
  **Why:** A code-review/architect pass flagged this ordering as wrong and recommended moving clerkMiddleware before the parsers. Do NOT "fix" it — it already matches the canonical skill. Re-read the skill before changing.

- **Copy the canonical wiring verbatim, no `PROD`/`NODE_ENV` gates.** `clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL` is unconditional (empty in dev, auto-set in prod). `publishableKey` must be `publishableKeyFromHost(window.location.hostname, VITE_CLERK_PUBLISHABLE_KEY)`. Sign-in/sign-up wouter routes must be exactly `/sign-in/*?` and `/sign-up/*?`.

- **Web auth is cookie-based.** Same-origin `/api/...` calls send the Clerk session cookie automatically. Server-side `requireAuth` (via `getAuth(req)`) gating the shared `/api` router works transparently for signed-in users; never add `getToken()`/Bearer/`setAuthTokenGetter` to web calls (that's mobile-only). Keep `/healthz` public (mount it before `requireAuth`) so deployment health checks pass.

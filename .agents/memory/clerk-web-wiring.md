---
name: Clerk web wiring gotchas
description: Non-obvious correct facts about the Replit-managed Clerk web setup that look like bugs but aren't.
---

# Clerk (Replit-managed) web wiring gotchas

- **`clerkMiddleware` is mounted AFTER `express.json()`/`urlencoded()`, not before.** Only the Clerk *proxy* (`CLERK_PROXY_PATH` / `clerkProxyMiddleware`) must come before body parsers (it streams raw bytes). The canonical setup in `.local/skills/clerk-auth/references/setup-and-customization.md` deliberately orders clerkMiddleware after the parsers.
  **Why:** A code-review/architect pass flagged this ordering as wrong and recommended moving clerkMiddleware before the parsers. Do NOT "fix" it — it already matches the canonical skill. Re-read the skill before changing.

- **Copy the canonical wiring verbatim, no `PROD`/`NODE_ENV` gates.** `clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL` is unconditional (empty in dev, auto-set in prod). `publishableKey` must be `publishableKeyFromHost(window.location.hostname, VITE_CLERK_PUBLISHABLE_KEY)`. Sign-in/sign-up wouter routes must be exactly `/sign-in/*?` and `/sign-up/*?`.

- **Web auth is cookie-based.** Same-origin `/api/...` calls send the Clerk session cookie automatically. Server-side `requireAuth` (via `getAuth(req)`) gating the shared `/api` router works transparently for signed-in users; never add `getToken()`/Bearer/`setAuthTokenGetter` to web calls (that's mobile-only). Keep `/healthz` public (mount it before `requireAuth`) so deployment health checks pass.

- **Stale-session 401 trap → blank page (NOT a regression).** The Clerk session-token cookie is short-lived and refreshed by Clerk.js. If a tab sits idle (e.g. hours), the token can lapse: the server returns 401 for *every* `/api` call while the Clerk *client* still reports signed-in, so pages render their shell but show no data — looks like "the whole app went blank." Diagnose via api-server logs: a clean run of 200/304s that flips to a continuous wall of 401s at one timestamp is this, not a code bug.
  **Self-heal (already wired):** the shared fetch mutator (`lib/api-client-react/src/custom-fetch.ts`) exposes `setUnauthorizedHandler`, invoked on any 401. `ApiAuthRecovery` in `qr-course/src/App.tsx` registers a handler that forces a fresh token (`clerk.session.getToken({skipCache:true})` updates the cookie the server reads) then `invalidateQueries()`; if there's no session OR the refresh throws (expired/revoked), it falls through to `clerk.redirectToSignIn()`. A `recoveringRef` + ~4s cooldown prevents reload/retry loops. **Key:** a failed `getToken` must NOT be swallowed silently — converge to sign-in, or the blank state persists.

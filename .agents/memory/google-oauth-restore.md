---
name: Google OAuth restore gotchas
description: Pitfalls when restoring/rebuilding the Google login in this project
---

- The old full-OAuth git snapshot reads `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`; the live secrets are `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `SESSION_SECRET`. Any restore must rename the env vars in the auth route and diagnostics or kickoff 500s with "not set".
  **Why:** Both secret-name generations exist in the workspace, so boot succeeds and the failure only appears when hitting `/api/auth/google`.
  **How to apply:** After restoring auth code from an old commit, grep for `GOOGLE_OAUTH` in source (ignore `dist/`) before restarting.
- The landing page must have exactly ONE "Sign in with Google" button (hero only). The user angrily complained about a duplicate header button.
  **Why:** Direct user directive July 2026; a second button was treated as a defect.
  **How to apply:** When touching Landing/Layout, verify only the hero CTA renders a Google button on the landing page.
- User has flip-flopped on auth repeatedly (3 rip-outs, 3 rebuilds as of July 2026). Current state after rebuild #3 (July 2026): canonical Passport-based auth installed verbatim from the user's attached server/auth.ts, and the site is LOGIN-REQUIRED ("no Google sign-in → no site, PERIOD"): all pages except landing redirect to /, all /api/* return 401 anonymously except bare GET /api (health) and /api/auth/*. The logged-out landing is a BARE gate (title + one Google button only — no course descriptions or feature cards); the user escalated angrily when logged-out visitors could still read marketing content. Admin `/api/admin/visits` + the Administrative sidebar item are owner-only (johnmichaelkuczynski@gmail.com). Never re-add or remove auth without an explicit instruction, and always update the replit.md auth section to match the current state.
- Rebuild #3 gotchas: (a) callback MUST be `/api/auth/google/callback` — the proxy only routes /api to the server; (b) connect-pg-simple `createTableIfMissing` fails in the esbuild bundle (table.sql not bundled) — the `user_sessions` table lives in the drizzle schema instead; (c) auth.ts secret chain is GOOGLE_LOGIN_* → GOOGLE_OAUTH_* → GOOGLE_*, and the live keys are the older names; (d) `drizzle-kit push` prompts interactively on table adds/drops — pre-create/drop via SQL so push sees no diff.
  **Why:** Each of these silently broke the first boot during rebuild #3.
  **How to apply:** When touching auth/session code or the schema, keep the callback under /api, keep user_sessions in lib/db schema, and don't rely on createTableIfMissing.
- Rip-out recipe that works: restore auth-free files from the known auth-free commit (keep the current health.ts — it has the bare `GET /api` route needed by deployment health checks), delete auth.ts/session.ts/requireAuth.ts/use-auth.ts, rerun codegen, uninstall express-session + connect-pg-simple, typecheck, restart both workflows, verify /api/auth/* 404s.

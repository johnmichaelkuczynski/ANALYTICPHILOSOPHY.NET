---
name: Clerk cookie auth dies in the Replit preview iframe
description: Why Clerk (or any cookie-session third-party auth) returns 401 inside the Replit preview, and what to do for single-user apps
---

Clerk's cookie-based session auth fails inside the Replit **preview iframe**: the
session cookie is treated as a third-party cookie and silently dropped by the
browser, so every authenticated `/api` request returns 401 even though the SPA
shell loads and Clerk reports "signed in". Symptom: app looks dead — all panels
render blank — but it is the data calls being rejected, not missing content. The
Clerk wiring can match the canonical setup exactly and still fail; this is an
environment problem, not a code-divergence problem.

**Why:** browsers block third-party cookies for cross-origin iframes; the preview
proxies the app under a different origin than Clerk's session cookie domain.

**How to apply:**
- For a **single-user** app, do not add login / third-party cookie auth at all.
  Rip Clerk out: remove `ClerkProvider`/`SignIn`/`SignUp`/route guards from the
  frontend, `clerkMiddleware` + the Clerk proxy mount + `requireAuth` from the
  backend, the `@clerk/themes` CSS import, and uninstall `@clerk/*`. Check first
  whether the data model is even user-scoped — if there are no `userId` columns,
  auth was a pure gate and removal is purely subtractive.
- After removal, also drop now-dead deps (`http-proxy-middleware`,
  `cookie-parser`) that only the Clerk proxy used.
- Verify by curling through the shared proxy (`localhost:80/api/...`) for 200, not
  just by compiling.
- If multi-user auth is genuinely required, cookie-session auth in the preview
  iframe is the wrong choice — prefer a token/header scheme that doesn't depend on
  third-party cookies.

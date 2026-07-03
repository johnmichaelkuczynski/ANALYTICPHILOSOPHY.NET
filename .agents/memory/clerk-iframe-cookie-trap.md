---
name: Clerk cookie auth dies in the Replit preview iframe
description: Why Clerk returns 401 inside the Replit dev preview, and the prod-only enforcement pattern that keeps login without breaking dev
---

Clerk's cookie-based session auth fails inside the Replit **preview iframe**: the
session cookie is treated as a third-party cookie and silently dropped by the
browser, so every authenticated `/api` request returns 401 even though the SPA
shell loads and Clerk reports "signed in". Symptom: app looks dead — all panels
render blank — but it is the data calls being rejected, not missing content. The
Clerk wiring can match the canonical setup exactly and still fail; this is an
environment problem, not a code-divergence problem. On the **published domain**
the cookie is first-party and everything works.

**Why:** browsers block third-party cookies for cross-origin iframes; the preview
proxies the app under a different origin than Clerk's session cookie domain.

**How to apply — preferred: prod-only enforcement (supersedes the earlier
"rip Clerk out" advice):**
- Keep the canonical Clerk wiring 100% verbatim and unconditional (provider,
  `publishableKeyFromHost`, `proxyUrl`, proxy middleware before body parsers,
  `clerkMiddleware` after them, `/sign-in/*?` + `/sign-up/*?` routes). The skill's
  "no PROD gates" rule applies to the *wiring*, not to *enforcement*.
- Gate only enforcement: backend `router.use(requireAuth)` wrapped in
  `if (process.env.NODE_ENV === "production")` (healthz mounted before, stays
  public); frontend guards (`protect()`, home redirect, landing sign-in CTAs)
  keyed on `import.meta.env.PROD`. Dev renders pages and hits the API openly;
  prod requires sign-in. Mounting ClerkProvider in dev is harmless.
- Verify dev by curling through the shared proxy (`localhost:80/api/...`) for
  200 unauthenticated; verify prod after publish (signed-out → 401).
- Caveat to surface to the user: if the data model has no per-user scoping,
  login is a gate, not multi-tenancy — any signed-in account sees the same data.
  Offer an email allowlist if the app should be owner-only.
- Full rip-out remains an option only if the user explicitly wants no login.

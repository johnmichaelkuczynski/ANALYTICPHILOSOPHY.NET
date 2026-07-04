---
name: NODE_ENV-as-secret trap
description: Why NODE_ENV must never exist as a Replit secret/env var — it silently breaks production mode in deployments
---

# NODE_ENV must never be a Replit secret

**Rule:** Never store `NODE_ENV` as a Replit secret or shared env var. Per-environment NODE_ENV is already set correctly by the artifact.toml service config (`[services.production.run.env] NODE_ENV=production`) and by the dev script (`export NODE_ENV=development`).

**Why:** On 2026-07-04 an *empty* `NODE_ENV` secret existed (origin unknown). Secrets are global and override the deployment's run env, so the published api-server booted with `NODE_ENV=""` — i.e. NOT production. Every `NODE_ENV === "production"` gate silently turned off: the Clerk Frontend API proxy (`/api/__clerk/*` returned 404 → sign-in completely broken on the published site), requireAuth on /api, and static SPA serving. Dev looked fine the whole time.

**How to detect:** Deployment logs show `/api/__clerk/v1/proxy-health` → 404 with ~1ms response time (local passthrough, not a proxied call), and the boot no longer logs "Serving qr-course static bundle". Compare with a local `NODE_ENV=production node dist/index.mjs` run, where proxy-health returns a real Clerk response (~400/200, ~500ms).

**How to apply:** If prod-only behavior mysteriously vanishes in a deployment, check `viewEnvVars` for a `NODE_ENV` secret/env var and delete it, then have the user republish (autoscale snapshots secrets at publish time).

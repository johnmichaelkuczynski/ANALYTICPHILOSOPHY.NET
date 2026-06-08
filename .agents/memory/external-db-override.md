---
name: external DB override (APP_DATABASE_URL)
description: How the app runs against the user's own external Postgres instead of the Replit-managed (Helium) DB.
---

# Pointing the app at the user's external Postgres

The Replit-managed `DATABASE_URL` is **runtime-managed (Helium)** and cannot be
overridden by a shared/dev env var of the same name — the runtime value wins.

**Decision:** introduced an explicit `APP_DATABASE_URL` env var that takes
precedence over `DATABASE_URL` in BOTH places that resolve a connection string:
- `lib/db/src/index.ts` (runtime pool)
- `lib/db/drizzle.config.ts` (drizzle-kit push target)

**Why:** the user wants all activity logged/profiled in *their own* DB, but we
cannot clobber the managed `DATABASE_URL`. A separate override var is
non-destructive and falls back to the managed DB when unset.

**How to apply:** to run against the user's DB, request `APP_DATABASE_URL` as a
secret, then `pnpm --filter @workspace/db run push` (creates schema in their DB)
and restart the api-server (its `seedIfEmpty` populates their DB on boot). SSL is
auto-enabled for non-local hosts in `lib/db`.

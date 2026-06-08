import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

function resolveConnectionString(): string {
  // Explicit override: when the user wants the app to run against THEIR own
  // external Postgres (so all activity is logged + profiled in their DB),
  // they set APP_DATABASE_URL. It takes precedence over the runtime-managed
  // (Helium) DATABASE_URL, which cannot itself be overridden.
  if (process.env.APP_DATABASE_URL) {
    return process.env.APP_DATABASE_URL;
  }
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Fallback: assemble the connection string from the discrete PG* variables
  // that Replit's managed PostgreSQL injects. This keeps the app connected when
  // DATABASE_URL itself is not present (e.g. right after an external
  // DATABASE_URL secret is removed in favor of the managed database).
  const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
  if (PGUSER && PGPASSWORD && PGHOST && PGPORT && PGDATABASE) {
    const user = encodeURIComponent(PGUSER);
    const password = encodeURIComponent(PGPASSWORD);
    const database = encodeURIComponent(PGDATABASE);
    return `postgresql://${user}:${password}@${PGHOST}:${PGPORT}/${database}`;
  }

  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const connectionString = resolveConnectionString();

// Enable SSL for managed providers (Neon, Render, Supabase, etc.).
// Local URLs (localhost / 127.0.0.1) keep SSL off.
const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(connectionString);
const sslDisabled = process.env.DATABASE_SSL === "false";
const useSsl = !isLocal && !sslDisabled;

export const pool = new Pool({
  connectionString,
  ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
});
export const db = drizzle(pool, { schema });

export * from "./schema";

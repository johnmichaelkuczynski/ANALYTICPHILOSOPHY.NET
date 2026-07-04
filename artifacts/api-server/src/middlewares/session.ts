import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import type { RequestHandler } from "express";
import { pool } from "@workspace/db";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    email?: string;
    name?: string | null;
    avatar?: string | null;
    oauthState?: string;
  }
}

const PgStore = connectPgSimple(session);

const secret = process.env.SESSION_SECRET;
if (!secret) {
  throw new Error("SESSION_SECRET must be set");
}

// connect-pg-simple's createTableIfMissing reads a table.sql file from its
// package directory, which does not exist once the server is bundled into a
// single file. Create the table ourselves (same schema as its table.sql).
export const sessionStoreReady: Promise<void> = pool
  .query(
    `CREATE TABLE IF NOT EXISTS "session" (
       "sid" varchar NOT NULL COLLATE "default",
       "sess" json NOT NULL,
       "expire" timestamp(6) NOT NULL,
       CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
     );
     CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");`,
  )
  .then(() => undefined);

export const sessionMiddleware: RequestHandler = session({
  store: new PgStore({ pool, createTableIfMissing: false }),
  secret,
  name: "sid",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 3600_000, // 30 days
  },
});

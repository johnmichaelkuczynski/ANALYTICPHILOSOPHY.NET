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

export const sessionMiddleware: RequestHandler = session({
  store: new PgStore({ pool, createTableIfMissing: true }),
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

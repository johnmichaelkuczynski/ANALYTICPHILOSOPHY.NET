import type { NextFunction, Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { db, loginEventsTable } from "@workspace/db";
import { logger } from "../lib/logger";

// Every Clerk session is one login. The first time we see a session ID we
// record who it belongs to; the unique constraint on session_id makes this
// idempotent even across server restarts. A small in-memory set avoids
// hitting the database on every request for sessions we've already stored.
const seenSessions = new Set<string>();
const SEEN_CAP = 5000;

async function persistLogin(sessionId: string, userId: string): Promise<void> {
  let email: string | null = null;
  let name: string | null = null;
  try {
    const user = await clerkClient.users.getUser(userId);
    email =
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      null;
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
    name = fullName || null;
  } catch (err) {
    logger.warn({ err, userId }, "Could not fetch Clerk user for login event");
  }

  await db
    .insert(loginEventsTable)
    .values({ sessionId, clerkUserId: userId, email, name })
    .onConflictDoNothing({ target: loginEventsTable.sessionId });
}

export function recordLogin(req: Request, _res: Response, next: NextFunction) {
  const { sessionId, userId } = getAuth(req);

  if (sessionId && userId && !seenSessions.has(sessionId)) {
    if (seenSessions.size >= SEEN_CAP) seenSessions.clear();
    seenSessions.add(sessionId);
    // Fire-and-forget: never block or fail the request over logging.
    persistLogin(sessionId, userId).catch((err) => {
      seenSessions.delete(sessionId);
      logger.error({ err, sessionId }, "Failed to record login event");
    });
  }

  next();
}

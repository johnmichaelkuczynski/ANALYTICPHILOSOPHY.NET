import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

/**
 * Rejects requests that do not carry a valid Clerk session.
 *
 * The web app authenticates via Clerk's session cookie (sent automatically on
 * same-origin requests), so signed-in users pass through transparently while
 * anonymous callers receive 401. Mount this after any public routes (e.g.
 * /healthz) and after clerkMiddleware so getAuth(req) is populated.
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const auth = getAuth(req);
  const userId = auth?.sessionClaims?.userId || auth?.userId;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

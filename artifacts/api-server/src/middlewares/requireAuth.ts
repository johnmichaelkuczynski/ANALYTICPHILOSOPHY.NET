import type { Request, Response, NextFunction } from "express";

/**
 * Rejects requests that do not carry a signed-in session.
 *
 * The web app authenticates via a first-party session cookie set after the
 * Google OAuth callback, so signed-in users pass through transparently while
 * anonymous callers receive 401. Mount this after any public routes (e.g.
 * /healthz and /auth/*) and after the session middleware.
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.session?.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

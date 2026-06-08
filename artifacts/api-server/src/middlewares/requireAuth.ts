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
    const cookieHeader = req.headers.cookie ?? "";
    const cookieNames = cookieHeader
      .split(";")
      .map((c) => c.split("=")[0]?.trim())
      .filter(Boolean);
    req.log.warn(
      {
        authDebug: {
          url: req.url,
          hasCookieHeader: cookieHeader.length > 0,
          cookieNames,
          hasSessionCookie: cookieNames.includes("__session"),
          hasClientCookie: cookieNames.includes("__client"),
          hasAuthorizationHeader: Boolean(req.headers.authorization),
          origin: req.headers.origin ?? null,
          referer: req.headers.referer ?? null,
          authStatus: (auth as { reason?: string } | undefined)?.reason ?? null,
        },
      },
      "requireAuth: rejected request (temporary diagnostic)",
    );
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

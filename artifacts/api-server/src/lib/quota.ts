import type { Request, RequestHandler } from "express";

// Anonymous visitors may sample the AI features freely until the app has
// generated roughly two paragraphs of AI text for them; after that, every
// AI-powered endpoint requires a Google sign-in. Signed-in users are never
// limited.
//
// ~2 paragraphs ≈ 200 words ≈ 1,400 characters of generated text.
export const FREE_AI_CHAR_LIMIT = 1400;

declare module "express-session" {
  interface SessionData {
    aiCharsUsed?: number;
  }
}

export function aiCharsUsed(req: Request): number {
  return req.session?.aiCharsUsed ?? 0;
}

/**
 * Record AI output generated for this visitor. No-op for signed-in users.
 */
export function addAiUsage(req: Request, text: string | null | undefined) {
  if (req.isAuthenticated?.() || !req.session) return;
  req.session.aiCharsUsed = (req.session.aiCharsUsed ?? 0) + (text?.length ?? 0);
}

/**
 * Gate for AI-powered endpoints: anonymous visitors past the free sample
 * limit get 401 with code LOGIN_REQUIRED, which the frontend turns into a
 * "sign in with Google to continue" prompt.
 */
export const enforceAiQuota: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated?.()) return next();
  if (aiCharsUsed(req) < FREE_AI_CHAR_LIMIT) return next();
  res.status(401).json({
    error:
      "You've used your free sample of the AI tutor and grader. Sign in with Google (free) to keep going.",
    code: "LOGIN_REQUIRED",
  });
};

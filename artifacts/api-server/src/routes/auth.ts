import { Router, type IRouter, type Request } from "express";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { db, usersTable, loginEventsTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

function getClientId(): string {
  // Trim: copy-pasted secrets often carry a stray newline, which Google
  // rejects as invalid_client at the token exchange.
  const id = process.env.GOOGLE_CLIENT_ID?.trim();
  if (!id) throw new Error("GOOGLE_CLIENT_ID is not set");
  return id;
}

function getClientSecret(): string {
  const secret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  if (!secret) throw new Error("GOOGLE_CLIENT_SECRET is not set");
  return secret;
}

/** The exact redirect URI Google must send the user back to. */
export function callbackUrl(req: Request): string {
  // Prefer an explicit trusted base URL when configured (production hardening:
  // don't let the Host header decide where Google sends the user back).
  const base = process.env.APP_BASE_URL?.trim().replace(/\/+$/, "");
  if (base) return `${base}/api/auth/google/callback`;
  const host = req.get("host") ?? "";
  const proto = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)
    ? "http"
    : "https";
  return `${proto}://${host}/api/auth/google/callback`;
}

// Step 1: redirect the browser to Google's consent screen.
router.get("/auth/google", (req, res, next) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");
    req.session.oauthState = state;

    const params = new URLSearchParams({
      client_id: getClientId(),
      redirect_uri: callbackUrl(req),
      response_type: "code",
      scope: "openid email profile",
      state,
      prompt: "select_account",
    });

    req.session.save((err) => {
      if (err) return next(err);
      res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
    });
  } catch (err) {
    next(err);
  }
});

// Step 2: Google redirects back with a one-time code; exchange it, look the
// user up, record the login, establish the session, and land on the app.
router.get("/auth/google/callback", async (req, res) => {
  try {
    const { code, state, error } = req.query;

    if (error || typeof code !== "string") {
      req.log.warn({ error }, "Google OAuth denied or missing code");
      res.redirect("/?auth_error=denied");
      return;
    }
    if (typeof state !== "string" || state !== req.session.oauthState) {
      req.log.warn("OAuth state mismatch");
      res.redirect("/?auth_error=state");
      return;
    }

    // Exchange the code for tokens.
    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: getClientId(),
        client_secret: getClientSecret(),
        redirect_uri: callbackUrl(req),
        grant_type: "authorization_code",
      }),
    });
    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      req.log.error(
        { status: tokenRes.status, body },
        "Google token exchange failed",
      );
      res.redirect("/?auth_error=token");
      return;
    }
    const tokens = (await tokenRes.json()) as { access_token?: string };
    if (!tokens.access_token) {
      req.log.error("Google token response missing access_token");
      res.redirect("/?auth_error=token");
      return;
    }

    // Fetch the verified profile straight from Google (server-to-server, so
    // no local JWT verification is needed).
    const profileRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!profileRes.ok) {
      req.log.error({ status: profileRes.status }, "Google userinfo failed");
      res.redirect("/?auth_error=profile");
      return;
    }
    const profile = (await profileRes.json()) as {
      sub: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };
    if (!profile.sub || !profile.email) {
      req.log.error("Google profile missing sub or email");
      res.redirect("/?auth_error=profile");
      return;
    }

    // Upsert the user by Google ID.
    const [user] = await db
      .insert(usersTable)
      .values({
        googleId: profile.sub,
        email: profile.email,
        name: profile.name ?? null,
        avatar: profile.picture ?? null,
      })
      .onConflictDoUpdate({
        target: usersTable.googleId,
        set: {
          email: profile.email,
          name: profile.name ?? null,
          avatar: profile.picture ?? null,
          lastSignInAt: new Date(),
        },
      })
      .returning();

    // Record the login event (never block sign-in over logging).
    try {
      await db.insert(loginEventsTable).values({
        userId: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (err) {
      logger.error({ err, userId: user.id }, "Failed to record login event");
    }

    // Rotate the session ID (prevents session fixation) and sign the user in.
    req.session.regenerate((err) => {
      if (err) {
        req.log.error({ err }, "Session regenerate failed");
        res.redirect("/?auth_error=session");
        return;
      }
      req.session.userId = user.id;
      req.session.email = user.email;
      req.session.name = user.name;
      req.session.avatar = user.avatar;
      req.session.save((saveErr) => {
        if (saveErr) {
          req.log.error({ err: saveErr }, "Session save failed");
          res.redirect("/?auth_error=session");
          return;
        }
        res.redirect("/");
      });
    });
  } catch (err) {
    req.log.error({ err }, "Google OAuth callback failed");
    res.redirect("/?auth_error=internal");
  }
});

// Who am I? Used by the frontend to decide what to render.
router.get("/auth/me", async (req, res) => {
  if (!req.session.userId) {
    res.json({ authenticated: false, user: null });
    return;
  }
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.session.userId));
  if (!user) {
    req.session.destroy(() => {});
    res.json({ authenticated: false, user: null });
    return;
  }
  res.json({
    authenticated: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    },
  });
});

// Sign out: destroy the server-side session and clear the cookie.
router.post("/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("sid");
    res.json({ ok: true });
  });
});

export default router;

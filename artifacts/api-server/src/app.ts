import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import fs from "node:fs";
import router from "./routes";
import { setupAuth } from "./auth";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind Replit's reverse proxy: trust X-Forwarded-* so secure cookies and
// req.get("host") resolve correctly.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// CORS allowlist: the app's own domains only. With cookie-based auth,
// reflecting arbitrary origins (origin: true) would be a security hole.
const allowedOrigins = new Set<string>(
  [
    ...(process.env.REPLIT_DOMAINS?.split(",") ?? []),
    process.env.REPLIT_DEV_DOMAIN ?? "",
  ]
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => `https://${d}`),
);

app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      // Same-origin/non-browser requests (no Origin header) are allowed.
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      // localhost origins are trusted in development only.
      if (
        process.env.NODE_ENV !== "production" &&
        (/^https?:\/\/localhost(:\d+)?$/.test(origin) ||
          /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin))
      ) {
        return callback(null, true);
      }
      // Disallowed origin: no CORS headers, browser blocks the response.
      return callback(null, false);
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Canonical authentication (Google OAuth via Passport, sessions, admin
// analytics). Mounts /api/auth/* and /api/admin/visits directly on the app.
setupAuth(app);

app.use("/api", router);

// In production, serve the built qr-course frontend from the same process.
// On Replit the deploy sidecar handles this; on Render (single web service)
// the API server serves both /api and the static SPA.
if (process.env.NODE_ENV === "production") {
  const candidates = [
    path.resolve(process.cwd(), "artifacts/qr-course/dist/public"),
    path.resolve(process.cwd(), "../qr-course/dist/public"),
    path.resolve(process.cwd(), "../../artifacts/qr-course/dist/public"),
  ];
  const staticDir = candidates.find((p) => fs.existsSync(p));

  if (staticDir) {
    const indexHtml = path.join(staticDir, "index.html");
    logger.info({ staticDir }, "Serving qr-course static bundle");
    app.use(express.static(staticDir, { index: false }));
    app.get(/^\/(?!api\/).*/, (_req, res, next) => {
      if (!fs.existsSync(indexHtml)) return next();
      res.sendFile(indexHtml);
    });
  } else {
    logger.warn(
      { tried: candidates },
      "qr-course static bundle not found; only /api will be served",
    );
  }
}

export default app;

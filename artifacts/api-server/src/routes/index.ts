import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import courseRouter from "./course";
import assignmentsRouter from "./assignments";
import practiceRouter from "./practice";
import tutorRouter from "./tutor";
import detectionRouter from "./detection";
import analyticsRouter from "./analytics";
import diagnosticsRouter from "./diagnostics";
import loginsRouter from "./logins";
import adminRouter from "./admin";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

// Public endpoints (no auth) — deployment health checks and the Google
// OAuth flow itself (login must be reachable while signed out).
router.use(healthRouter);
router.use(authRouter);

// Production only: everything below requires a signed-in session.
// In development the API stays open because the Replit preview iframe is
// cross-site, so the sameSite=lax session cookie is not sent with requests,
// which would 401 everything in the preview.
if (process.env.NODE_ENV === "production") {
  router.use(requireAuth);
}

router.use(courseRouter);
router.use(assignmentsRouter);
router.use(practiceRouter);
router.use(tutorRouter);
router.use(detectionRouter);
router.use(analyticsRouter);
router.use(diagnosticsRouter);
router.use(loginsRouter);
router.use(adminRouter);

export default router;

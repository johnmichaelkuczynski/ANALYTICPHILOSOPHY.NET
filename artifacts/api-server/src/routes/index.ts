import { Router, type IRouter } from "express";
import healthRouter from "./health";
import courseRouter from "./course";
import assignmentsRouter from "./assignments";
import practiceRouter from "./practice";
import tutorRouter from "./tutor";
import detectionRouter from "./detection";
import analyticsRouter from "./analytics";
import diagnosticsRouter from "./diagnostics";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

// Public endpoints (no auth) — deployment health checks.
router.use(healthRouter);

// Production only: everything below requires a valid Clerk session.
// In development the API stays open because the Replit preview iframe drops
// Clerk's third-party session cookie, which would 401 every request.
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

export default router;

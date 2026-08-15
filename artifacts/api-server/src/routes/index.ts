import { Router, type IRouter } from "express";
import { isAdmin } from "../auth";
import healthRouter from "./health";
import visitsRouter from "./visits";
import downloadRouter from "./download";
import courseRouter from "./course";
import assignmentsRouter from "./assignments";
import practiceRouter from "./practice";
import tutorRouter from "./tutor";
import detectionRouter from "./detection";
import analyticsRouter from "./analytics";
import diagnosticsRouter from "./diagnostics";
import loginsRouter from "./logins";
import adminRouter from "./admin";

const router: IRouter = Router();

// The course is open to anonymous visitors. AI-powered endpoints enforce a
// free-sample quota internally (lib/quota.ts). Owner-only surfaces are gated
// with isAdmin below.
router.use(healthRouter);
router.use(visitsRouter);
router.use(downloadRouter);
router.use(courseRouter);
router.use(assignmentsRouter);
router.use(practiceRouter);
router.use(tutorRouter);
router.use(detectionRouter);
router.use(analyticsRouter);
// Operator console: destructive (reset) and expensive (audits) — owner only.
router.use("/diagnostics", isAdmin);
router.use(diagnosticsRouter);
// Login history and visitor analytics: owner only.
router.use("/logins", isAdmin);
router.use(loginsRouter);
router.use("/admin", isAdmin);
router.use(adminRouter);

export default router;

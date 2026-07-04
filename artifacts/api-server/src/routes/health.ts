import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Deployment health checks probe the bare /api path (this router is mounted
// at /api), so the root must answer 200 publicly or publishing fails.
router.get("/", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;

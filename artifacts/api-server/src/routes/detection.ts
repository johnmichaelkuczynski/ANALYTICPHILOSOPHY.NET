import { Router, type IRouter } from "express";
import { ScanTextBody, ScanTextResponse } from "@workspace/api-zod";
import { detect } from "../lib/detection";
import { enforceAiQuota, addAiUsage } from "../lib/quota";

const router: IRouter = Router();

router.post("/detection/scan", enforceAiQuota, async (req, res): Promise<void> => {
  const parsed = ScanTextBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { text, trace } = parsed.data;
  const result = await detect(text, trace);
  addAiUsage(req, result.rationale);
  res.json(
    ScanTextResponse.parse({
      problemId: null,
      ...result,
    }),
  );
});

export default router;

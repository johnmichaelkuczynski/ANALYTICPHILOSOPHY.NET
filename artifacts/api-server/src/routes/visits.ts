import { Router, type IRouter } from "express";
import { and, eq, gte, sql } from "drizzle-orm";
import { db, visitorsTable, visitorHitsTable } from "@workspace/db";

const router: IRouter = Router();

// Anonymous visitor beacon: the frontend sends a stable random id (stored in
// localStorage) once per page load. A hit row is recorded at most once every
// 12 hours per visitor, so unique-visitor counts can be computed per window.
router.post("/visit", async (req, res) => {
  const vid = typeof req.body?.vid === "string" ? req.body.vid.trim() : "";
  if (!/^[A-Za-z0-9-]{8,64}$/.test(vid)) {
    res.status(400).json({ error: "invalid vid" });
    return;
  }
  const now = new Date();
  await db
    .insert(visitorsTable)
    .values({ vid })
    .onConflictDoUpdate({
      target: visitorsTable.vid,
      set: { lastSeenAt: now },
    });

  const windowStart = new Date(now.getTime() - 12 * 60 * 60 * 1000);
  const recent = await db
    .select({ id: visitorHitsTable.id })
    .from(visitorHitsTable)
    .where(
      and(eq(visitorHitsTable.vid, vid), gte(visitorHitsTable.occurredAt, windowStart)),
    )
    .limit(1);
  if (recent.length === 0) {
    await db.insert(visitorHitsTable).values({ vid });
  }
  res.json({ ok: true });
});

export async function uniqueVisitorStats() {
  const now = Date.now();
  const windows = {
    last24Hours: new Date(now - 24 * 60 * 60 * 1000),
    lastWeek: new Date(now - 7 * 24 * 60 * 60 * 1000),
    lastMonth: new Date(now - 30 * 24 * 60 * 60 * 1000),
    lastYear: new Date(now - 365 * 24 * 60 * 60 * 1000),
  };
  const countSince = async (since: Date | null) => {
    const result = since
      ? await db.execute(
          sql`select count(distinct vid)::int as n from visitor_hits where occurred_at >= ${since}`,
        )
      : await db.execute(sql`select count(*)::int as n from visitors`);
    return (result.rows[0] as { n?: number } | undefined)?.n ?? 0;
  };
  const [last24Hours, lastWeek, lastMonth, lastYear, allTime] = await Promise.all([
    countSince(windows.last24Hours),
    countSince(windows.lastWeek),
    countSince(windows.lastMonth),
    countSince(windows.lastYear),
    countSince(null),
  ]);
  return { last24Hours, lastWeek, lastMonth, lastYear, allTime };
}

export default router;

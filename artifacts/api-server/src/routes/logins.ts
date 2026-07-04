import { Router, type IRouter } from "express";
import { desc, count } from "drizzle-orm";
import { db, loginEventsTable } from "@workspace/db";
import { GetLoginEventsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/logins", async (_req, res, next) => {
  try {
    const [rows, [{ value: total }]] = await Promise.all([
      db
        .select()
        .from(loginEventsTable)
        .orderBy(desc(loginEventsTable.occurredAt))
        .limit(500),
      db.select({ value: count() }).from(loginEventsTable),
    ]);

    res.json(
      GetLoginEventsResponse.parse({
        events: rows.map((r) => ({
          id: r.id,
          clerkUserId: r.clerkUserId,
          email: r.email,
          name: r.name,
          occurredAt: r.occurredAt.toISOString(),
        })),
        total,
      }),
    );
  } catch (err) {
    next(err);
  }
});

export default router;

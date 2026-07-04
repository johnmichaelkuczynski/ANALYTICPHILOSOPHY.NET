import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { getAuth, clerkClient } from "@clerk/express";
import { db, loginEventsTable } from "@workspace/db";
import { GetAdminVisitorStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Only the site owner may see visitor data.
const ADMIN_EMAILS = new Set(["johnmichaelkuczynski@gmail.com"]);

const HOUR = 3600_000;
const DAY = 24 * HOUR;

type Point = { label: string; count: number };

function bucketize(
  timestamps: number[],
  buckets: { start: number; end: number; label: string }[],
): Point[] {
  return buckets.map((b) => ({
    label: b.label,
    count: timestamps.filter((t) => t >= b.start && t < b.end).length,
  }));
}

router.get("/admin/visitors", async (req, res, next) => {
  try {
    // Owner check is enforced in production only — the dev preview has no
    // Clerk session (the preview iframe drops the cookie), matching how the
    // rest of the API is gated.
    if (process.env.NODE_ENV === "production") {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(403).json({ error: "Not authorized" });
        return;
      }
      const user = await clerkClient.users.getUser(userId);
      // Only verified email addresses count — otherwise anyone could add the
      // owner's address as an unverified secondary email to gain access.
      const isOwner = user.emailAddresses.some(
        (e) =>
          e.verification?.status === "verified" &&
          ADMIN_EMAILS.has(e.emailAddress.toLowerCase()),
      );
      if (!isOwner) {
        res.status(403).json({ error: "Not authorized" });
        return;
      }
    }

    const rows = await db
      .select()
      .from(loginEventsTable)
      .orderBy(desc(loginEventsTable.occurredAt));

    const now = Date.now();
    const times = rows.map((r) => r.occurredAt.getTime());

    // Hourly buckets for the last 24 hours.
    const series24h = bucketize(
      times,
      Array.from({ length: 24 }, (_, i) => {
        const start = now - (24 - i) * HOUR;
        return {
          start,
          end: start + HOUR,
          label: new Date(start).toLocaleTimeString([], {
            hour: "numeric",
          }),
        };
      }),
    );

    // Daily buckets for the last 30 days.
    const seriesMonth = bucketize(
      times,
      Array.from({ length: 30 }, (_, i) => {
        const start = now - (30 - i) * DAY;
        return {
          start,
          end: start + DAY,
          label: new Date(start).toLocaleDateString([], {
            month: "short",
            day: "numeric",
          }),
        };
      }),
    );

    // Monthly buckets for the last 12 months.
    const monthBuckets: { start: number; end: number; label: string }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      d.setMonth(d.getMonth() - i);
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      monthBuckets.push({
        start: d.getTime(),
        end: next.getTime(),
        label: d.toLocaleDateString([], { month: "short", year: "2-digit" }),
      });
    }
    const seriesYear = bucketize(times, monthBuckets);

    // All time: monthly buckets from the first recorded login (min 1 bucket).
    const allTimeBuckets: { start: number; end: number; label: string }[] = [];
    const first = times.length ? Math.min(...times) : now;
    const cursor = new Date(first);
    cursor.setDate(1);
    cursor.setHours(0, 0, 0, 0);
    while (cursor.getTime() <= now) {
      const next = new Date(cursor);
      next.setMonth(next.getMonth() + 1);
      allTimeBuckets.push({
        start: cursor.getTime(),
        end: next.getTime(),
        label: cursor.toLocaleDateString([], {
          month: "short",
          year: "2-digit",
        }),
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    const seriesAllTime = bucketize(times, allTimeBuckets);

    res.json(
      GetAdminVisitorStatsResponse.parse({
        allTime: times.length,
        last24h: times.filter((t) => t >= now - DAY).length,
        lastMonth: times.filter((t) => t >= now - 30 * DAY).length,
        lastYear: times.filter((t) => t >= now - 365 * DAY).length,
        series24h,
        seriesMonth,
        seriesYear,
        seriesAllTime,
        visitors: rows.map((r) => ({
          email: r.email ?? r.clerkUserId,
          name: r.name,
          occurredAt: r.occurredAt.toISOString(),
        })),
      }),
    );
  } catch (err) {
    next(err);
  }
});

export default router;

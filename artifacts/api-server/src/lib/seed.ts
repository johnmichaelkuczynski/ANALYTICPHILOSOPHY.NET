import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";
import type { SeedTopic, SeedAssignment } from "./seed-content/types";
import {
  weekTopics as week1Topics,
  weekAssignments as week1Assignments,
} from "./seed-content/week1";
import {
  weekTopics as week2Topics,
  weekAssignments as week2Assignments,
} from "./seed-content/week2";
import {
  weekTopics as week3Topics,
  weekAssignments as week3Assignments,
} from "./seed-content/week3";
import {
  weekTopics as week4Topics,
  weekAssignments as week4Assignments,
} from "./seed-content/week4";

// The course content is authored, week by week, in ./seed-content/weekN.ts as
// faithful plain-prose renderings of the author's manuscript. seed.ts only
// assembles those weeks in order and writes them to the database.
const TOPICS: SeedTopic[] = [
  ...week1Topics,
  ...week2Topics,
  ...week3Topics,
  ...week4Topics,
];

const ASSIGNMENTS: SeedAssignment[] = [
  ...week1Assignments,
  ...week2Assignments,
  ...week3Assignments,
  ...week4Assignments,
];

// A stable fingerprint of the seed content. If the database holds topics that
// don't match this set, we wipe and re-seed instead of leaving stale content
// from a previous version of the course.
const EXPECTED_TOPIC_SLUGS = TOPICS.map((t) => t.slug).sort().join(",");

// Bump this whenever lecture bodies, assignment problems, or correct answers
// change in a way that should propagate to the database on the next boot.
// The value is stored alongside topics and compared in seedIfEmpty.
const CONTENT_REVISION = "2026-06-08.analytic-philosophy.prose.r1";

// A sentinel phrase present in exactly one lecture body — used to detect that
// the database holds the *current* revision of the content (not just a set of
// matching slugs). Bump whenever the seed content is overhauled.
const REVISION_SENTINEL_SLUG = "philosophy-analysis-categories";
const REVISION_SENTINEL_PHRASE =
  "We do not confront the world as an undifferentiated blur";

export async function seedIfEmpty(): Promise<void> {
  const existing = await db.execute(sql`select count(*)::int as n from topics`);
  const row = (existing.rows[0] ?? {}) as { n?: number };
  const count = row.n ?? 0;

  if (count > 0) {
    const rows = await db.execute(sql`select slug from topics order by slug`);
    const actualSlugs = (rows.rows as Array<{ slug: string }>)
      .map((r) => r.slug)
      .sort()
      .join(",");
    const slugsMatch = actualSlugs === EXPECTED_TOPIC_SLUGS;
    let revisionMatches = false;
    try {
      const sentinelLec = await db.execute(
        sql`select l.body from lectures l join topics t on l.topic_id = t.id where t.slug = ${REVISION_SENTINEL_SLUG} limit 1`,
      );
      const body = ((sentinelLec.rows[0] ?? {}) as { body?: string }).body ?? "";
      revisionMatches = body.includes(REVISION_SENTINEL_PHRASE);
    } catch {
      revisionMatches = false;
    }
    if (slugsMatch && revisionMatches) {
      logger.info(
        { revision: CONTENT_REVISION },
        "Seed: already populated with current content, skipping",
      );
      return;
    }
    logger.info(
      { revision: CONTENT_REVISION, slugsMatch, revisionMatches },
      "Seed: course content drifted from expected revision — wiping and re-seeding",
    );
    // Order matters: child tables first.
    await db.execute(sql`delete from practice_attempts`);
    await db.execute(sql`delete from practice_problems`);
    await db.execute(sql`delete from practice_sessions`);
    await db.execute(sql`delete from answers`);
    await db.execute(sql`delete from attempts`);
    await db.execute(sql`delete from problems`);
    await db.execute(sql`delete from assignments`);
    await db.execute(sql`delete from lectures`);
    await db.execute(sql`delete from topics`);
  }

  logger.info("Seed: populating course content");

  // Topics + lectures
  const slugToTopicId = new Map<string, number>();
  for (let i = 0; i < TOPICS.length; i++) {
    const t = TOPICS[i]!;
    const [inserted] = await db
      .insert(topicsTable)
      .values({
        slug: t.slug,
        title: t.title,
        weekNumber: t.weekNumber,
        blurb: t.blurb,
        position: i,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert topic ${t.slug}`);
    slugToTopicId.set(t.slug, inserted.id);
    await db.insert(lecturesTable).values({
      topicId: inserted.id,
      weekNumber: t.weekNumber,
      title: t.lectureTitle,
      body: t.body,
    });
  }

  // Assignments + problems
  for (let i = 0; i < ASSIGNMENTS.length; i++) {
    const a = ASSIGNMENTS[i]!;
    const [inserted] = await db
      .insert(assignmentsTable)
      .values({
        kind: a.kind,
        title: a.title,
        weekNumber: a.weekNumber,
        position: i,
        isTimed: a.isTimed,
        timeLimitMinutes: a.timeLimitMinutes,
        instructions: a.instructions,
      })
      .returning();
    if (!inserted) throw new Error(`Failed to insert assignment ${a.title}`);
    for (let p = 0; p < a.problems.length; p++) {
      const prob = a.problems[p]!;
      const topicId = slugToTopicId.get(prob.topicSlug);
      if (!topicId) throw new Error(`Unknown topic slug ${prob.topicSlug}`);
      await db.insert(problemsTable).values({
        assignmentId: inserted.id,
        topicId,
        position: p,
        prompt: prob.prompt,
        correctAnswer: prob.correctAnswer,
        explanation: prob.explanation,
        hint: prob.hint ?? null,
      });
    }
  }

  logger.info({ topics: TOPICS.length, assignments: ASSIGNMENTS.length }, "Seed complete");
}

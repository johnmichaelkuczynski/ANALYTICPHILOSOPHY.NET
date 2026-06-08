import { Router, type IRouter } from "express";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  db,
  topicsTable,
  practiceSessionsTable,
  practiceProblemsTable,
  practiceAttemptsTable,
} from "@workspace/db";
import {
  StartPracticeSessionBody,
  StartPracticeSessionResponse,
  NextPracticeProblemBody,
  NextPracticeProblemResponse,
  GradePracticeAnswerBody,
  GradePracticeAnswerResponse,
} from "@workspace/api-zod";
import { chatJson } from "../lib/ai";
import { gradeAnswer } from "../lib/grading";

const router: IRouter = Router();

function parseIdParam(raw: unknown): number {
  const s = Array.isArray(raw) ? raw[0] : (raw as string);
  return parseInt(s ?? "", 10);
}

async function pickTopicId(
  weekNumber: number | null | undefined,
  preferred: number | null | undefined,
  focusOnWeaknesses: boolean,
): Promise<{ id: number; title: string; weekNumber: number }> {
  if (preferred != null) {
    const [t] = await db.select().from(topicsTable).where(eq(topicsTable.id, preferred));
    if (t) return { id: t.id, title: t.title, weekNumber: t.weekNumber };
  }
  const candidates = weekNumber
    ? await db.select().from(topicsTable).where(eq(topicsTable.weekNumber, weekNumber))
    : await db.select().from(topicsTable);

  if (focusOnWeaknesses) {
    const stats = await db.execute(sql`
      select topic_id, count(*)::int as n, avg(case when correct then 1.0 else 0.0 end) as acc
      from practice_attempts group by topic_id
    `);
    const byId = new Map<number, { n: number; acc: number }>();
    for (const r of stats.rows as Array<{ topic_id: number; n: number; acc: number }>) {
      byId.set(Number(r.topic_id), { n: Number(r.n), acc: Number(r.acc) });
    }
    // weight = (1 - accuracy) + small bonus for low-attempted topics
    const scored = candidates.map((t) => {
      const s = byId.get(t.id);
      const acc = s?.acc ?? 0.5;
      const n = s?.n ?? 0;
      const weight = (1 - acc) * 2 + (n < 3 ? 1 : 0) + Math.random() * 0.3;
      return { t, weight };
    });
    scored.sort((a, b) => b.weight - a.weight);
    const choice = scored[0]?.t ?? candidates[Math.floor(Math.random() * candidates.length)]!;
    return { id: choice.id, title: choice.title, weekNumber: choice.weekNumber };
  }
  const choice = candidates[Math.floor(Math.random() * candidates.length)]!;
  return { id: choice.id, title: choice.title, weekNumber: choice.weekNumber };
}

router.post("/practice/sessions", async (req, res): Promise<void> => {
  const parsed = StartPracticeSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { weekNumber, topicId, tutorEnabled, focusOnWeaknesses, initialDifficulty } =
    parsed.data;
  const startDifficulty =
    typeof initialDifficulty === "number" && !Number.isNaN(initialDifficulty)
      ? Math.max(1, Math.min(5, initialDifficulty))
      : 2.0;
  const [created] = await db
    .insert(practiceSessionsTable)
    .values({
      weekNumber: weekNumber ?? null,
      topicId: topicId ?? null,
      tutorEnabled,
      focusOnWeaknesses: focusOnWeaknesses ?? true,
      difficulty: startDifficulty,
    })
    .returning();
  if (!created) {
    res.status(500).json({ error: "failed" });
    return;
  }
  res.json(
    StartPracticeSessionResponse.parse({
      id: created.id,
      tutorEnabled: created.tutorEnabled,
      difficulty: created.difficulty,
      weekNumber: created.weekNumber,
      topicId: created.topicId,
      focusOnWeaknesses: created.focusOnWeaknesses,
    }),
  );
});

router.post("/practice/sessions/:sessionId/next", async (req, res): Promise<void> => {
  const sessionId = parseIdParam(req.params.sessionId);
  const parsed = NextPracticeProblemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [session] = await db
    .select()
    .from(practiceSessionsTable)
    .where(eq(practiceSessionsTable.id, sessionId));
  if (!session) {
    res.status(404).json({ error: "session not found" });
    return;
  }

  const topic = await pickTopicId(
    session.weekNumber,
    parsed.data.topicId ?? session.topicId,
    session.focusOnWeaknesses,
  );

  const lastProblems = await db
    .select({ prompt: practiceProblemsTable.prompt })
    .from(practiceProblemsTable)
    .where(
      and(
        eq(practiceProblemsTable.sessionId, sessionId),
        eq(practiceProblemsTable.topicId, topic.id),
      ),
    )
    .orderBy(desc(practiceProblemsTable.id))
    .limit(3);

  const difficulty = Math.max(1, Math.min(5, session.difficulty));
  const difficultyLabel =
    difficulty <= 1.7
      ? "very easy"
      : difficulty <= 2.5
      ? "easy"
      : difficulty <= 3.3
      ? "medium"
      : difficulty <= 4.1
      ? "hard"
      : "challenging";

  const userRequest = parsed.data.request?.trim() || "";
  let generated: { prompt: string; correctAnswer: string; explanation: string };
  try {
    generated = await chatJson<{
      prompt: string;
      correctAnswer: string;
      explanation: string;
    }>(
      `You generate a single SUBSTANTIVE analytic-philosophy practice problem for a college student. It MUST be on the topic "${topic.title}" at difficulty "${difficultyLabel}" (${difficulty.toFixed(
        1,
      )}/5).\n\nThis course is taught entirely in PLAIN PROSE, the way the author writes. ABSOLUTE RULE: do NOT use any formal-logic notation, symbols, quantifiers, connectives, modal operators, set-builder, or LaTeX/math markup of any kind. NEVER ask the student to "write it in symbols" or "regiment it into logical notation." Everything — prompt and answer — is ordinary English. Say "the property of being a square circle is uninstantiated" in words, never in symbols.\n\nThe problem must require REASONING or APPLICATION that proves understanding — never one-word recall, never "state the definition of X", and never trivially copyable from a textbook. Good forms: (a) give a NEW sentence and ask the student to explain, in prose, why its grammatical form misleads and what it really says; (b) a True/False claim plus a multi-sentence prose defense about a subtle consequence (what a logical positivist would say, whether something is meaningful or tautologous, whether one claim entails another); (c) "construct your own example of X and analyze it in words"; (d) "apply criterion C to decide whether S is meaningful / true / a case of ontologizing, and defend the verdict in prose"; (e) compare two positions and name the exact crux where they disagree.\n\n"correctAnswer" must be a FULL prose model answer — several sentences of reasoning — because it is graded semantically. NO symbol strings. "explanation" says why the model answer is right and flags one common wrong move. Respond as strict JSON: {"prompt": string, "correctAnswer": string, "explanation": string}. Avoid these recent prompts: ${JSON.stringify(
        lastProblems.map((p) => p.prompt),
      )}.`,
      userRequest || `Generate a new ${difficultyLabel} problem on ${topic.title}.`,
    );
  } catch {
    generated = {
      prompt: `Practice (${topic.title}): Consider the claim "nothing is a square circle." Explain, in 3-4 sentences and in plain prose, why this claim is obviously true yet needs no special "non-existent object" to be the thing it is about.`,
      correctAnswer:
        "The sentence does not name some thing and then deny its existence. It says that the property of being both square and circular has no instances — that it is uninstantiated. So there is no commitment to any 'square circle' entity at all; the claim is simply that nothing whatever has that contradictory pair of properties, which is why it is plainly true.",
      explanation:
        "The grammatical form 'nothing is a square circle' tempts us to posit a featureless non-entity that the sentence is supposedly 'about.' But its real meaning attributes a property (being uninstantiated) to a property (being a square circle). A common wrong move is to treat 'nothing' as if it picked out some object rather than saying that a property lacks instances.",
    };
  }

  const [stored] = await db
    .insert(practiceProblemsTable)
    .values({
      sessionId,
      topicId: topic.id,
      prompt: generated.prompt,
      correctAnswer: generated.correctAnswer,
      explanation: generated.explanation,
      difficulty,
    })
    .returning();
  if (!stored) {
    res.status(500).json({ error: "failed" });
    return;
  }

  res.json(
    NextPracticeProblemResponse.parse({
      id: stored.id,
      prompt: stored.prompt,
      topicId: topic.id,
      topicTitle: topic.title,
      difficulty,
    }),
  );
});

router.post("/practice/sessions/:sessionId/grade", async (req, res): Promise<void> => {
  const sessionId = parseIdParam(req.params.sessionId);
  const parsed = GradePracticeAnswerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { problemId, answer, trace } = parsed.data;
  const [session] = await db
    .select()
    .from(practiceSessionsTable)
    .where(eq(practiceSessionsTable.id, sessionId));
  if (!session) {
    res.status(404).json({ error: "session not found" });
    return;
  }
  const [problem] = await db
    .select()
    .from(practiceProblemsTable)
    .where(
      and(
        eq(practiceProblemsTable.id, problemId),
        eq(practiceProblemsTable.sessionId, sessionId),
      ),
    );
  if (!problem) {
    res.status(404).json({ error: "problem not found in this session" });
    return;
  }

  const graded = await gradeAnswer({
    prompt: problem.prompt,
    correctAnswer: problem.correctAnswer,
    userAnswer: answer,
  });

  await db.insert(practiceAttemptsTable).values({
    sessionId,
    problemId,
    topicId: problem.topicId,
    answer,
    correct: graded.correct,
    difficulty: problem.difficulty,
    trace,
  });

  const delta = graded.correct ? 0.4 : -0.5;
  const newDifficulty = Math.max(1, Math.min(5, session.difficulty + delta));
  await db
    .update(practiceSessionsTable)
    .set({ difficulty: newDifficulty })
    .where(eq(practiceSessionsTable.id, sessionId));

  let tutorTip: string | null = null;
  if (session.tutorEnabled && !graded.correct) {
    try {
      tutorTip = (
        await chatJson<{ tip: string }>(
          "You are a kind, concise analytic-philosophy tutor. Given a problem, the correct answer, and the student's wrong attempt, give ONE focused next-step tip (2 sentences max) in plain prose about how to sharpen their reasoning. Do NOT use any logic symbols, formal notation, or LaTeX — the course is taught entirely in words. Respond as strict JSON: {\"tip\": string}.",
          JSON.stringify({
            prompt: problem.prompt,
            correctAnswer: problem.correctAnswer,
            studentAnswer: answer,
          }),
        )
      ).tip;
    } catch {
      tutorTip = null;
    }
  }

  res.json(
    GradePracticeAnswerResponse.parse({
      problemId,
      correct: graded.correct,
      correctAnswer: problem.correctAnswer,
      explanation: graded.explanation || problem.explanation,
      newDifficulty,
      tutorTip,
    }),
  );
});

export default router;

import { Router, type IRouter } from "express";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import {
  db,
  topicsTable,
  problemsTable,
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
  assignmentId: number | null | undefined,
): Promise<{ id: number; title: string; weekNumber: number }> {
  // When the session is scoped to a graded assignment, compute the allowed
  // topic set FIRST so that an out-of-scope `preferred`/`topicId` override
  // cannot escape the assignment's coverage.
  let assignmentTopicIds: number[] | null = null;
  if (assignmentId != null) {
    const rows = await db
      .selectDistinct({ topicId: problemsTable.topicId })
      .from(problemsTable)
      .where(eq(problemsTable.assignmentId, assignmentId));
    assignmentTopicIds = rows.map((r) => r.topicId);
  }

  if (preferred != null) {
    const inScope =
      assignmentTopicIds == null ||
      assignmentTopicIds.length === 0 ||
      assignmentTopicIds.includes(preferred);
    if (inScope) {
      const [t] = await db.select().from(topicsTable).where(eq(topicsTable.id, preferred));
      if (t) return { id: t.id, title: t.title, weekNumber: t.weekNumber };
    }
  }
  let candidates: Array<{ id: number; title: string; weekNumber: number }>;
  if (assignmentTopicIds != null) {
    // Scope practice to exactly the topics covered by this graded assignment.
    candidates = assignmentTopicIds.length
      ? await db.select().from(topicsTable).where(inArray(topicsTable.id, assignmentTopicIds))
      : await db.select().from(topicsTable);
  } else if (weekNumber) {
    candidates = await db.select().from(topicsTable).where(eq(topicsTable.weekNumber, weekNumber));
  } else {
    candidates = await db.select().from(topicsTable);
  }

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
  const { weekNumber, topicId, assignmentId, tutorEnabled, focusOnWeaknesses, initialDifficulty } =
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
      assignmentId: assignmentId ?? null,
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
      assignmentId: created.assignmentId,
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
    session.assignmentId,
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

  // Disjointness: never let a practice problem reproduce a GRADED problem on
  // this topic. We keep the FULL graded set for a deterministic post-generation
  // check, and pass a (token-bounded) subset to the model as an explicit avoid
  // list. Filtering by topic is a superset of the assignment's graded prompts
  // on that topic, so cross-assignment leakage is also prevented.
  const gradedProblems = await db
    .select({ prompt: problemsTable.prompt })
    .from(problemsTable)
    .where(eq(problemsTable.topicId, topic.id));
  const normalizePrompt = (s: string): string =>
    s
      .toLowerCase()
      .replace(/practice\s*\([^)]*\):/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const forbidden = new Set<string>([
    ...gradedProblems.map((p) => normalizePrompt(p.prompt)),
    ...lastProblems.map((p) => normalizePrompt(p.prompt)),
  ]);
  const avoidPrompts = gradedProblems.map((p) => p.prompt).slice(0, 24);

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
  const generateOnce = (): Promise<{
    prompt: string;
    correctAnswer: string;
    explanation: string;
  }> =>
    chatJson<{
      prompt: string;
      correctAnswer: string;
      explanation: string;
    }>(
      `You generate ONE analytic-philosophy practice problem for the topic "${topic.title}" at difficulty "${difficultyLabel}" (${difficulty.toFixed(
        1,
      )}/5).

STRICT QUESTION RULES (a professional philosopher will reject violations):
1. APPLICATION, NEVER RECALL. Never ask the student to define, state, explain, describe, name, or recite a concept, principle, or distinction. The problem must require APPLYING the principle to a case.
2. FRESH CONCRETE SCENARIO. Present a brand-new, specific scenario the student has not seen — a particular sentence to regiment, an inference to judge as valid/invalid, a described philosopher's move to diagnose, or a sentence whose real commitments must be read off. Invent your own fresh particulars (ordinary nouns, made-up names, neutral examples).
3. GENERAL, NOT TEXT-SPECIFIC. Do NOT reference any famous textbook example (no square circle, no "someone smokes", no the rabbit, no the morning star, no the present king of France, no Theseus' ship). Anyone who understands the principle — even if they never read this course — must be able to answer.
4. REQUIRE REASONING. The scenario should demand genuine, in-depth reasoning, not a one-word recall.
5. SYMBOLIC HARNESS. Wherever the principle is formal, the canonical correctAnswer is the logical regimentation in symbols — quantifiers (∀, ∃), connectives (¬, ∧, ∨, →, ↔), modal operators (□, ◇), entailment (⊨, ⊢), set-builder, or ∅. Keep correctAnswer concise (a formula or a short precise phrase), never multi-paragraph. Use $...$ for inline LaTeX in the prompt/explanation where helpful.

Respond as strict JSON: {"prompt": string, "correctAnswer": string, "explanation": string}. The explanation (2-4 sentences) justifies the answer. Do NOT duplicate or lightly reword any of these recent prompts: ${JSON.stringify(
        lastProblems.map((p) => p.prompt),
      )}.${
        avoidPrompts.length
          ? ` Also never reproduce any of these graded-assignment prompts: ${JSON.stringify(
              avoidPrompts,
            )}.`
          : ""
      }`,
      userRequest || `Generate a new ${difficultyLabel} problem on ${topic.title}.`,
    );

  let generated: { prompt: string; correctAnswer: string; explanation: string } | null = null;
  // Deterministic disjointness: regenerate if a produced prompt collides with a
  // graded prompt (or a just-served practice prompt). Bounded retries keep the
  // generator infinite-feeling without risking an unbounded loop.
  for (let attempt = 0; attempt < 4; attempt++) {
    let candidate: { prompt: string; correctAnswer: string; explanation: string };
    try {
      candidate = await generateOnce();
    } catch {
      continue;
    }
    if (!candidate?.prompt || !forbidden.has(normalizePrompt(candidate.prompt))) {
      generated = candidate;
      break;
    }
  }
  if (!generated) {
    generated = {
      prompt: `Practice (${topic.title}): A sign reads "No reptile lives in this greenhouse." Regiment it as a negated existential whose logical form shows it posits no shadowy non-entity, and name the property it declares uninstantiated.`,
      correctAnswer: "¬∃x (Reptile(x) ∧ LivesInGreenhouse(x))",
      explanation:
        "The claim attributes no property to an 'un-thing'; it says a property has no instances: $\\neg\\exists x\\,(\\text{Reptile}(x) \\wedge \\text{LivesInGreenhouse}(x))$ — the property of being a greenhouse-dwelling reptile is uninstantiated.",
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
          "You are a kind, concise analytic-philosophy tutor. Given a problem, the correct answer, and the student's wrong attempt, give ONE focused next-step tip (2 sentences max) about how to express the claim in formal logical notation. Respond as strict JSON: {\"tip\": string}.",
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

  // (a) Extensive feedback — this is low-stakes practice, so be detailed.
  let feedback = graded.explanation || problem.explanation;
  try {
    const fb = await chatJson<{ feedback: string }>(
      'You are an expert analytic-philosophy coach giving EXTENSIVE practice feedback (low-stakes practice — be generous and thorough). Given the problem, the canonical answer, the student\'s attempt, and whether it was correct, write 3-6 sentences that: (1) name precisely what the student got right; (2) diagnose any logical error by NAME (wrong quantifier, wrong scope, missing/extra negation, predicate applied to the wrong argument, conflating grammatical form with logical form, ontologizing a non-entity, etc.); (3) show the corrected regimentation with a one-line reason. Write inline logic as $...$ (LaTeX). Never just restate the rule abstractly — tie every point to THIS scenario. Respond as strict JSON: {"feedback": string}.',
      JSON.stringify({
        prompt: problem.prompt,
        correctAnswer: problem.correctAnswer,
        studentAnswer: answer,
        wasCorrect: graded.correct,
      }),
    );
    if (fb.feedback && fb.feedback.trim()) feedback = fb.feedback.trim();
  } catch {
    // keep terse explanation as fallback
  }

  // (c) Surgically precise, analytics-based focus pointer for this topic.
  let focusPointer: string | null = null;
  try {
    const [tp] = await db
      .select({ title: topicsTable.title })
      .from(topicsTable)
      .where(eq(topicsTable.id, problem.topicId));
    const statRes = await db.execute(sql`
      select count(*)::int as n, avg(case when correct then 1.0 else 0.0 end) as acc
      from practice_attempts where topic_id = ${problem.topicId}
    `);
    const row = statRes.rows[0] as { n: number; acc: number } | undefined;
    if (tp && row && Number(row.n) >= 1) {
      const n = Number(row.n);
      const pct = Math.round(Number(row.acc) * 100);
      const scope = session.assignmentId != null ? " before you attempt the graded assignment" : "";
      focusPointer =
        pct < 70
          ? `Focus area: your practice accuracy on "${tp.title}" is ${pct}% over ${n} attempt(s). Keep drilling this exact topic${scope} — aim for a steady streak of correct regimentations here before moving on.`
          : `On track: ${pct}% on "${tp.title}" over ${n} attempts. You're nearly graded-ready on this topic${scope}; a few more reps at higher difficulty will lock it in.`;
    }
  } catch {
    focusPointer = null;
  }

  res.json(
    GradePracticeAnswerResponse.parse({
      problemId,
      correct: graded.correct,
      correctAnswer: problem.correctAnswer,
      explanation: graded.explanation || problem.explanation,
      feedback,
      focusPointer,
      newDifficulty,
      tutorTip,
    }),
  );
});

export default router;

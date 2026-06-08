import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";
import type { SeedTopic, SeedAssignment } from "./seed/types";

import { topics as unit1Topics, assignments as unit1Assignments } from "./seed/unit1";
import { topics as unit2Topics, assignments as unit2Assignments } from "./seed/unit2";
import { topics as unit3Topics, assignments as unit3Assignments } from "./seed/unit3";
import { topics as unit4Topics, assignments as unit4Assignments } from "./seed/unit4";
import { topics as unit5Topics, assignments as unit5Assignments } from "./seed/unit5";
import { topics as unit6Topics, assignments as unit6Assignments } from "./seed/unit6";
import { topics as unit7Topics, assignments as unit7Assignments } from "./seed/unit7";
import { topics as unit8Topics, assignments as unit8Assignments } from "./seed/unit8";

// ───────────────────────────────────────────────────────────────
// Course content is authored per-unit in ./seed/unitN.ts. Each unit
// module faithfully expands one slice of the source manuscript
// (The Analysis of Analysis, ch.1) into dense lectures, and supplies
// scenario-application homeworks + a unit test. This file concatenates
// them and adds the two cumulative graded assignments (midterm, final).
// ───────────────────────────────────────────────────────────────

const TOPICS: SeedTopic[] = [
  ...unit1Topics,
  ...unit2Topics,
  ...unit3Topics,
  ...unit4Topics,
  ...unit5Topics,
  ...unit6Topics,
  ...unit7Topics,
  ...unit8Topics,
];

// ───────────────────────────────────────────────────────────────
// Cumulative graded assignments. Like every other graded item, the
// problems present FRESH concrete scenarios and test APPLICATION of a
// principle (never definition-recall, never the manuscript's own
// examples), keeping the symbolic-regimentation answer harness.
// ───────────────────────────────────────────────────────────────

const MIDTERM: SeedAssignment = {
  kind: "midterm",
  title: "Midterm — Units 1–4 (categories, logical form, ontology, the positivist program)",
  weekNumber: 4,
  isTimed: true,
  timeLimitMinutes: 60,
  instructions:
    "Timed, 60 minutes. Cumulative over Units 1–4. Pasting is disabled. Each problem gives a fresh case; apply the relevant principle and write answers in compact symbolic form using the on-screen keyboard (∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇, ∈, ∅).",
  problems: [
    {
      topicSlug: "u1-categories",
      prompt:
        "Take the sentence 'Resentment is an emotion.' Write its canonical categorial logical form using predicate notation, and name the predicate a philosophical analysis would have to make explicit.",
      correctAnswer: "Emotion(resentment); predicate to analyse: Emotion(·)",
      explanation:
        "Every basic categorial claim has the form $\\varphi(x)$ — here $\\text{Emotion}(\\text{resentment})$. The philosophical task is not to confirm the instance but to say what the predicate $\\text{Emotion}(\\cdot)$ amounts to.",
      hint: "What object is placed under what category?",
    },
    {
      topicSlug: "u1-philosophy-other-disciplines",
      prompt:
        "A seismologist forecasts where the next quake will strike. A second thinker instead asks what it is for one stress-state of the crust to MAKE a later rupture happen. Using □ and plain p, regiment the contrast in what each is after, and say which one is doing philosophy.",
      correctAnswer:
        "Seismologist: p (the actual). Philosopher: □p (what it is for one thing to necessitate another). The second is the philosopher.",
      explanation:
        "The scientist's quarry is the actual, $p$; the philosopher's is the modal structure, $\\Box p$ — 'the laws the laws cannot break.' Studying what *causation itself* consists in is second-order, hence philosophical.",
    },
    {
      topicSlug: "u2-logical-vs-grammatical-form",
      prompt:
        "Regiment 'No griffin nests on the cliff' so its logical form makes clear it posits no shadowy non-entity, and name the property it declares uninstantiated. Give the equivalent set-disjointness statement.",
      correctAnswer:
        "¬∃x (Griffin(x) ∧ NestsOnCliff(x)); property 'being a cliff-nesting griffin' is uninstantiated; {x : Griffin(x)} ∩ {x : NestsOnCliff(x)} = ∅",
      explanation:
        "The grammatical subject 'no griffin' tempts us to posit a non-entity; the logical form $\\neg\\exists x(\\text{Griffin}(x)\\wedge \\text{NestsOnCliff}(x))$ shows the claim is merely that a property lacks instances — equivalently the two sets are disjoint.",
      hint: "A negative existential, not an attribution to some 'un-thing'.",
    },
    {
      topicSlug: "u2-right-way-grammatical-surface",
      prompt:
        "Show, in symbols, that 'something is toxic but this berry is not' is consistent, and explain why that single fact proves 'something' is not a concealed name.",
      correctAnswer: "∃x Toxic(x) ∧ ¬Toxic(thisBerry) — consistent.",
      explanation:
        "If 'something' named an individual $N$, the sentence would sometimes collapse to '$N$ is toxic but $N$ is not,' a contradiction. Since for every name it is merely possibly false, never contradictory, 'something' is a quantifier asserting $\\exists x\\,\\text{Toxic}(x)$, not a name.",
    },
    {
      topicSlug: "u3-when-to-ontologize",
      prompt:
        "Two unrelated sculptures share one exact patina that nothing else has. A thinker concludes there exists a shareable property they both bear. Write the inference pattern in symbols, and state the constraint that makes this a legitimate ontological commitment rather than an idle one.",
      correctAnswer:
        "From F(a) ∧ F(b) ∧ a ≠ b infer ∃F (F(a) ∧ F(b)): a shared property exists. Constraint: ontologize only when forced by an undeniable truth, and only to abstract objects.",
      explanation:
        "Ontologizing is licensed when an undeniable truth (two distinct things are genuinely alike) cannot be stated without quantifying over a property: $\\exists F(F(a)\\wedge F(b))$. The commitment is forced, not chosen, and lands on abstracta — the property itself, not a new concrete thing.",
    },
    {
      topicSlug: "u3-brentano-meinong",
      prompt:
        "A patient hallucinates a spider crawling on a bare wall. Using the perception-as-description analysis, explain why this requires no non-existent spider, and regiment the experiential content as an existence-claim with the right truth-status.",
      correctAnswer:
        "Content: ∃x (Spider(x) ∧ OnWall(x)) — an UNSATISFIED (false) existence-claim. No Meinongian object needed.",
      explanation:
        "Perception describes rather than confronts; a hallucination is a perceptual description whose existence-claim $\\exists x(\\text{Spider}(x)\\wedge \\text{OnWall}(x))$ is simply false. The experience is contentful without any 'non-existent object' to be its target.",
      hint: "A false existence-claim, not a real claim about an unreal thing.",
    },
    {
      topicSlug: "u4-empirical-vs-philosophical-puzzles",
      prompt:
        "A medical-ethics board is stuck on whether a permanently unconscious patient can 'consent' to a procedure. No new clinical fact would settle it. Classify the puzzle as empirical or philosophical and justify the verdict by what kind of progress would resolve it.",
      correctAnswer:
        "Philosophical: it is a conceptual puzzle about the structure of the category 'consent', not a gap in observable facts. Resolved by analysis, not measurement.",
      explanation:
        "Empirical puzzles dissolve with new observation; this one persists with every fact in hand because the difficulty is confusion about what *consent* requires. Clarifying the category — not gathering data — is what would resolve it, marking it philosophical.",
    },
    {
      topicSlug: "u4-lp-self-defeating",
      prompt:
        "A speaker insists: 'A sentence is meaningful only if some experiment could confirm it.' Apply the self-application test to this very sentence and state precisely what follows.",
      correctAnswer:
        "No experiment confirms the criterion itself; so by its own standard it is meaningless. The principle is self-refuting.",
      explanation:
        "Let $C$ be the criterion. $C$ is neither a tautology nor experimentally confirmable, so $C$ fails $C$. Asserting $C$ therefore undercuts $C$ — the verificationist criterion is self-defeating.",
      hint: "Turn the criterion on itself.",
    },
  ],
};

const FINAL: SeedAssignment = {
  kind: "final",
  title: "Final — Units 1–8 (the whole arc, from categories to the sub-disciplines)",
  weekNumber: 8,
  isTimed: true,
  timeLimitMinutes: 90,
  instructions:
    "Timed, 90 minutes. Cumulative over the entire course. Pasting is disabled. Every problem is a fresh case demanding application of a principle; regiment answers symbolically with the on-screen keyboard (∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇, ∈, ∉, ∅, ⊨).",
  problems: [
    {
      topicSlug: "u1-analytic-vs-non-analytic",
      prompt:
        "Without leaving your chair, decide whether 'there is a five-dimensional cube' describes a genuine possibility. State the analytic criterion you are applying (in symbols) and the verdict it yields here.",
      correctAnswer:
        "Criterion: MakesSense(S) ↔ ◇True(S). The sentence is coherent (a 5-cube is consistently describable), so ◇True(S); it marks a genuine possibility.",
      explanation:
        "Analytic philosophy charts the possible by analysing the sayable: $\\text{MakesSense}(S)\\leftrightarrow\\Diamond\\text{True}(S)$. Because the description carries no contradiction, the corresponding state of affairs is possible — settled conceptually, not empirically.",
    },
    {
      topicSlug: "u1-knowledge-meta-knowledge",
      prompt:
        "A grandmaster reliably plays winning moves but cannot articulate the rule that makes them winning. Using a knowledge operator K, regiment the gap between what she has and what she lacks, and say which side philosophy works on.",
      correctAnswer:
        "She has K(a, p) (first-order know-how/knowledge) but lacks K(a, K(a, p)) (meta-knowledge). Philosophy works on the second.",
      explanation:
        "Fluent first-order knowledge $K(a,p)$ can coexist with an absent second-order grasp $K(a,K(a,p))$ of what that knowledge consists in. Closing that gap — meta-knowledge — is the philosopher's job.",
    },
    {
      topicSlug: "u3-analysis-vs-ontogenesis",
      prompt:
        "From 'The average voter owns 1.8 cars' a thinker concludes there exists a peculiar person — the average voter — with fractional cars. Diagnose the move as analysis vs. ontologizing, and give the correct regimentation that dissolves the spurious entity.",
      correctAnswer:
        "It is illicit ontologizing. Correct form: (total cars owned by voters)/(number of voters) = 1.8 — a ratio statement; no 'average voter' object exists.",
      explanation:
        "Grammar invites a posit; analysis shows the truth is a statistical ratio, $\\frac{\\sum \\text{cars}}{\\#\\text{voters}} = 1.8$. Philosophy clarifies the statement instead of inventing an entity to satisfy its surface form.",
      hint: "Does the surface subject name anything?",
    },
    {
      topicSlug: "u4-tautological-truth-broken",
      prompt:
        "To a child who has never counted past ten, '7 + 5 = 12' is genuinely informative; to an accountant it is trivial. Use this contrast to show what is wrong with treating 'tautological truth' as a property of the sentence itself.",
      correctAnswer:
        "Informativeness is hearer-relative, so 'being a tautology' cannot be an intrinsic property of the sentence; the LP notion of tautological truth is incoherent.",
      explanation:
        "The same sentence shifts between informative and trivial depending on the hearer's prior information. Since tautologousness tracks that information rather than the sentence, it is not a sentence-intrinsic property — breaking the positivist category.",
    },
    {
      topicSlug: "u4-meaningfulness-alternative",
      prompt:
        "A sentence reads 'The interval voted reluctantly.' Apply the property-attribution criterion of meaningfulness and state, in schematic form, exactly why it fails to express a genuine statement.",
      correctAnswer:
        "A sentence is meaningful iff it attributes a property to an object: ⟨x has φ⟩. Here no object can bear the property (an interval is not the kind of thing that votes), so no genuine ⟨x has φ⟩ is formed — meaningless.",
      explanation:
        "On the alternative criterion, meaning requires a workable attribution $\\langle x\\text{ has }\\varphi\\rangle$. 'The interval voted' pairs a property with an object that categorially cannot instantiate it, so the attribution never gets made.",
    },
    {
      topicSlug: "u5-picture-theory-meaning",
      prompt:
        "Consider a road sign that depicts a deer leaping. Explain, applying the picture theory's depiction/truth-condition link, what makes the sign meaningful and under what condition it would count as 'true', then give that link schematically.",
      correctAnswer:
        "Depicts(P, fact) holds via shared structure; it is 'true' iff the depicted fact obtains: True(P) ↔ (deer may cross here). Schematic: True(P) ↔ ⟦P⟧ obtains.",
      explanation:
        "On the picture theory a sign means by sharing logical/structural form with a possible fact; it is correct exactly when that fact obtains, $\\text{True}(P)\\leftrightarrow \\llbracket P\\rrbracket$. Meaning is the picturing relation, truth is its satisfaction.",
    },
    {
      topicSlug: "u5-picture-theory-saying-showing",
      prompt:
        "Someone proposes a language powerful enough to state, within itself, every one of its own semantic rules. Apply the relevant diagonal reasoning to a fresh self-referential sentence to show why the proposal cannot succeed.",
      correctAnswer:
        "Construct a sentence asserting its own falsity/unstatability, e.g. s ↔ ¬True(s); deriving s and ¬s shows no language can fully state its own semantics — they can only be shown.",
      explanation:
        "A language that internalised all its semantic rules could form a self-applying sentence $s\\leftrightarrow\\neg\\text{True}(s)$, yielding contradiction. So semantic rules can be shown in use but not exhaustively said within the same language.",
      hint: "Build a self-referential sentence and apply it to itself.",
    },
    {
      topicSlug: "u6-formal-truth-formal-entailment",
      prompt:
        "Decide whether 'x is a sister' ⊨ 'x is female' is a FORMAL entailment or a non-formal (analytic) one, and justify by the test of whether the conclusion survives uniform reinterpretation of the non-logical vocabulary.",
      correctAnswer:
        "Non-formal (analytic, not formal): the entailment depends on the meanings of 'sister' and 'female', not on logical form alone; reinterpreting the predicates breaks it. So it is true-in-virtue-of-meaning but not formally valid.",
      explanation:
        "Formal entailment holds under every uniform reinterpretation of the non-logical terms; this one fails that test, since some reinterpretation of 'sister'/'female' makes premise true and conclusion false. It is a genuine non-formal entailment — exactly the case the Tractarian 'all entailment is formal' thesis cannot accommodate.",
    },
    {
      topicSlug: "u7-hempel-incommensurability-unmeasurable",
      prompt:
        "A lab claims to have measured, by ruler alone, that a rod's length is exactly √2 metres. Explain why no finite measurement can certify this value, expressing what measurement can ever deliver as a constraint on the ratio.",
      correctAnswer:
        "Measurement against a standard yields only rational ratios: any reading gives length/standard = m/n ∈ ℚ. Since √2 ∉ ℚ, no measurement can certify an exactly irrational value.",
      explanation:
        "To measure is to compare against a standard and report a ratio $m/n\\in\\mathbb{Q}$. An exactly irrational magnitude $\\sqrt2\\notin\\mathbb{Q}$ is therefore observationally uncertifiable — Hempel's point that strict empiricism cannot accommodate the quantities its own science requires.",
      hint: "What kind of number can a ratio of counts ever be?",
    },
    {
      topicSlug: "u8-philosophy-of-science",
      prompt:
        "A researcher asks: 'Does a confirmed prediction give us reason to believe the unobservable entities the theory posits really exist?' Identify which sub-discipline this question belongs to and justify the placement by the category it turns on.",
      correctAnswer:
        "Philosophy of science (the realism/confirmation question). It turns on the categories evidence, confirmation, and theoretical existence — not on first-order experimental results.",
      explanation:
        "The question is not what the experiment shows but what *confirmation* licenses us to believe about *unobservables* — a second-order question about the structure of scientific evidence, placing it in philosophy of science.",
    },
    {
      topicSlug: "u8-philosophical-logic",
      prompt:
        "Distinguish these two tasks and assign each to formal logic OR philosophical logic, with justification: (a) proving a schema is a theorem of a deductive system; (b) deciding what 'if … then …' really means in ordinary reasoning.",
      correctAnswer:
        "(a) formal logic — manipulating a calculus to derive theorems. (b) philosophical logic — analysing the category 'conditional' / logical consequence itself.",
      explanation:
        "Formal logic operates inside a system, proving results; philosophical logic asks what the logical notions (consequence, conditional, quantifier) *are*. (a) is the former, (b) the latter — a meta-level inquiry into the concepts the calculus uses.",
    },
    {
      topicSlug: "u8-metaphysics",
      prompt:
        "Someone asks whether a ship remains 'the same ship' after every plank has gradually been replaced. Name the sub-discipline, and regiment the identity claim at issue using '=' to show what would have to hold for the answer to be 'yes'.",
      correctAnswer:
        "Metaphysics (identity / persistence). 'Yes' requires: the original ship a = the final ship b, i.e. a = b, despite no shared parts — a claim about identity-conditions over time.",
      explanation:
        "The puzzle concerns the category *identity through change*: whether $a=b$ when constitution is wholly replaced. Settling it means giving the identity-conditions for artefacts over time — a metaphysical analysis, not an empirical inspection of planks.",
    },
  ],
};

const ASSIGNMENTS: SeedAssignment[] = [
  ...unit1Assignments,
  ...unit2Assignments,
  ...unit3Assignments,
  ...unit4Assignments,
  MIDTERM,
  ...unit5Assignments,
  ...unit6Assignments,
  ...unit7Assignments,
  ...unit8Assignments,
  FINAL,
];

const EXPECTED_TOPIC_SLUGS = TOPICS.map((t) => t.slug).sort().join(",");

// Bump this whenever lecture bodies, assignment problems, or correct answers
// change in a way that should propagate to the database on the next boot.
// The value is stored alongside topics and compared in seedIfEmpty.
const CONTENT_REVISION = "2026-06-08.analysis-of-analysis.r1";

// A sentinel phrase present in exactly one lecture body — used to detect that
// the database holds the *current* revision of the content (not just a set of
// matching slugs). Bump whenever the seed content is overhauled.
const REVISION_SENTINEL_SLUG = "u1-categories";
const REVISION_SENTINEL_PHRASE =
  "philosophy is the discipline that delineates the structures of the categories in terms of which we think about the world";

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

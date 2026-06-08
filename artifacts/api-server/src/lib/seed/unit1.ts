import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Chapter 1 — Analytic Philosophy as Logical Analysis
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u1-categories",
    title: "Philosophy as the analysis of the categories",
    weekNumber: 1,
    blurb:
      "Everything we know, we know under some category, and philosophy's sole job is to delineate the structures of those categories.",
    lectureTitle:
      "1.0 Philosophy as the analysis of the categories in terms of which we understand the world",
    body: `# Philosophy as the analysis of the categories

We never confront the world as a shapeless given. We understand it in terms of certain **categories** — *person, statement, fact, impossibility, existence*, and many besides. Whatever we encounter, we encounter it as *something or other*: as an event, as a thing, as a cause, as a belief, as a value. The categories are the headings under which any item of knowledge must fall before it can be knowledge at all.

Philosophy studies these categories. It **delineates their structures**. This is its sole function. So we may state the governing thesis of the entire course in one sentence:

> philosophy is the discipline that delineates the structures of the categories in terms of which we think about the world.

Notice what this does *not* say. It does not say that philosophy is a very general empirical survey, one more discipline competing with physics or botany for facts about the furniture of the world. Philosophy adds no new objects to the inventory of reality. It makes explicit the **conditions** a thing must satisfy in order to count as a cause, a person, a proof, or an existent.

## The categories are everywhere in our most basic beliefs

We have already named a few categories. We can locate many more simply by laying out some of our most ordinary, least controversial beliefs and watching which words do the categorial work. Consider the following articulation of how the world hangs together — the category-words are exactly the ones a philosopher would seize upon:

The world is not homogeneous. It is **articulated into events** bearing various **causal** and, more generally, **spatiotemporal relations** to one another. Many of these events involve more or less **persistent things** — rocks, trees, and the like. Some of these things have **minds**. Most animate (mind-having) beings have **sense-perceptions**: they see things, hear things, and so on. Most percipient (perception-having) creatures have **beliefs**. Some of these beliefs are **true**; others are **false**. Some of the true ones are cases of **knowledge**. Some percipient creatures **communicate** with one another through the use of **language**. Mastery of a language makes it easier to communicate one's beliefs to others, and it also enhances one's ability to **reason**. Rational (reason-capable) creatures tend to make **value-judgments**: they judge one another's actions, and sometimes their own, to be **good** or **bad**. Creatures that make such judgments tend to regulate their behavior toward one another by means of systems of **law**, whose supposed purpose is to ensure that such behavior satisfies the requirements of **justice**.

Read that paragraph again and underline the italicized notions. Each one — *event, space, time, cause, persistence, thing, mind, perception, belief, truth, knowledge, language, reason, value, good, bad, law, justice* — is a category. None of them is itself an object you can trip over; each is a heading under which countless objects and facts get filed.

## The canonical form of a categorial claim

Whenever we place an object under a category, our claim has the same logical skeleton. It says of an object $x$ that it has a certain property $\\varphi$ — symbolically,

$$\\varphi(x).$$

"This is a rock" is $\\text{Rock}(x)$. "Smith is a person" is $\\text{Person}(\\text{Smith})$. Relations are categories too, so the schema generalizes to many places: "this event caused that one" is $\\text{Cause}(e_1, e_2)$. In every case the philosopher's question is not *whether* the particular claim is true but rather: **what does the predicate $\\varphi$ amount to?** What must any $x$ be like for $\\varphi(x)$ to hold?

## The whole discipline in one job description

Philosophy, then, has the very non-trivial job of identifying — in as clear and explicit a manner as possible — the conditions that a given thing must satisfy if it is to fall into a given category. To the extent philosophy succeeds, it makes clear what we are doing whenever we do anything cognitive at all, from making a single observation to carrying out an extended piece of abstract reasoning. In this sense philosophy is the **analysis of the preconditions of all knowledge**. It is, as we will keep finding, *the analysis of analysis, the logic of logic, the science of science.*`,
  },
  {
    slug: "u1-knowledge-meta-knowledge",
    title: "Knowledge vs. meta-knowledge",
    weekNumber: 1,
    blurb:
      "We use our categories with great skill yet know little about them; philosophy is the hard, derivative knowledge about that knowledge.",
    lectureTitle: "1.1 Knowledge vs. meta-knowledge",
    body: `# Knowledge vs. meta-knowledge

*Event, space, time, cause, persistence, thing, mind, perception, belief, knowledge, language, truth, value-judgment, law, justice.* Whatever we know, we know it through these categories — and others like them, for the list is nowhere near complete. But here is the crucial fact: **even though we cannot think without these categories, they are seldom the objects of thought.** We look *through* them, not *at* them. The result is a curious asymmetry — although we are extremely adept at *using* the categories, we know remarkably little *about* them.

## First-order knowledge and the knowledge about it

Write $K(a, p)$ for "$a$ knows that $p$." First-order knowledge is knowledge of how the world is: *that* it rained, *that* this caused that, *that* a creature speaks a language. **Meta-knowledge** is knowledge about that knowledge — knowledge of what one knows *in* knowing such things. The philosopher pursues the second-order item,

$$K\\big(a,\\; K(a, p)\\big),$$

asking not merely whether $a$ knows that $p$ but what conditions a state must meet to be a case of knowing at all, and what one grasps in deploying the relevant category.

## Two examples of the gap

We are excellent at **distinguishing linguistic from non-linguistic behavior**. We can tell at a glance who is speaking a language and who is merely making noise. This strongly suggests that, at some level, we already know what conditions a creature's behavior must meet if it is to embody knowledge of a language. Yet when we are asked to make those conditions explicit, we find we can do so only with great difficulty and only with partial success. So although we are very good at knowing *who* knows a language and who does not, we do **not** know *what it is that we know* by virtue of knowing this. The first-order judgment is rock-solid; the meta-knowledge is elusive.

The same holds, *mutatis mutandis*, for every category. We are excellent at distinguishing **moral from immoral behavior**. We know that rape is immoral and that donating money to charity, for selfless reasons, is moral. But when we are asked to identify the principles embodied in these pedestrian and uncontroversial judgments, we have trouble producing theories that do not *distort* them. The data — the particular verdicts — are secure; the theory meant to systematize them keeps misfiring.

## Why meta-knowledge is necessarily harder

In general, it is hard to identify the principles that guide our thoughts, and this is no accident. **Self-understanding is not the mind's primary function. Nor could it be.** The very idea of a mind that thinks about nothing other than itself is incoherent — there would be no first-order content for the self-scrutiny to be *about*. Consequently, any case of self-awareness, and therefore of self-understanding, is necessarily **derivative** of, and for that reason of lesser quality than, some other, more fundamental sort of understanding. Knowing how to use a category comes first and comes easily; knowing what that category *is* comes second and comes hard.

## What this makes philosophy

Being the discipline whose purpose is to delineate the structures of these categories, philosophy has the non-trivial job of identifying, as clearly and explicitly as it can, the conditions a thing must satisfy to fall under a given category. So far as it succeeds, it makes plain what we are doing whenever we are doing anything cognitive — whether making a single observation or constructing a long chain of abstract reasoning. Philosophy is the analysis of the preconditions of all knowledge: the analysis of analysis, the logic of logic, the science of science.`,
  },
  {
    slug: "u1-philosophy-other-disciplines",
    title: "The relationship of philosophy to the other disciplines",
    weekNumber: 1,
    blurb:
      "The philosopher is to the physicist what the physicist is to the engineer: he seeks the laws the laws themselves cannot break.",
    lectureTitle: "1.2 The relationship of philosophy to other disciplines",
    body: `# The relationship of philosophy to other disciplines

The philosopher is interested in the **laws governing the laws**. He does not, in the first instance, want to know what *in fact* holds. He wants to know what it would even **make sense** to claim could hold. He wants to know the laws that the laws themselves cannot break.

## Specifics versus meta-knowledge

Philosophical knowledge is **meta-knowledge** — knowledge about knowledge. The non-philosopher wants specifics: *What happened? When did it happen? What did it cause? How did it cause it?* The philosopher is interested in these questions only to the extent that knowing their answers helps him understand the **categories** — *cause, place, time*, and the rest — that underlie such knowledge in the first place.

We can mark the contrast with the modal operators. Write $\\Box p$ for "necessarily $p$" and plain $p$ for "$p$ is actually the case." The scientist lives in the business of $p$: what, as a matter of fact, obtains. The philosopher lives in the business of $\\Box p$ — and of what is so much as possible — asking what it would even make sense to claim. His interest in the actual is always subordinate to his interest in the necessary and the possible.

## The ladder: motorist, engineer, physicist, philosopher

The **stranded motorist** wants his car to work. He does not care *what* will get it to do so; the inner workings are nothing to him. The **engineer** is interested in those workings — but the engineer is not entirely innocent of the motorist's epistemic parochialism. The engineer has no interest in what the laws of physics *are* except in so far as he must know them in order to create the right mechanisms. The **physicist**, in turn, wants knowledge of the mechanisms only to the extent that it will yield knowledge of the **laws** embodied in them.

Now extend the series one rung higher:

> The philosopher is to the physicist what the physicist is to the engineer — and therefore what the engineer is to the stranded motorist.

The philosopher wants to know what causes what, and what mechanisms were involved, only to the extent that knowing this helps him understand **what it is for one thing to cause another** — only, that is, in so far as it helps him grasp *what one knows in knowing that one thing made another happen*. Each step up the ladder treats the level below as a mere means: the motorist uses the mechanism, the engineer uses the law to build mechanisms, the physicist uses mechanisms to find laws, and the philosopher uses the laws to lay bare the structure of the categories the laws presuppose.

## The moral of the ladder

What fixes your place on this ladder is not *how much* you know but *what your knowledge is for* — the direction in which your interest points. A person can be saturated with physical fact and still stand on the engineer's rung, because his interest in law is wholly in service of building. The philosopher stands one rung higher than anyone whose quarry is the actual world, because his quarry is the structure of the knowing itself.`,
  },
  {
    slug: "u1-analytic-vs-non-analytic",
    title: "Analytic vs. non-analytic philosophy",
    weekNumber: 1,
    blurb:
      "Post-Fregean philosophy inverts the scientist's priorities: it charts the possible by analyzing which statements make sense.",
    lectureTitle:
      "1.3 How is analytic philosophy different from non-analytic philosophy?",
    body: `# How is analytic philosophy different from non-analytic philosophy?

**John Stuart Mill** (1806–1873), the great philosopher and economist, said that he was an expert in but one science — the *science of science*. What he meant is plainly close to what we have been saying. And it is therefore close to what **Gottlob Frege** (1848–1925), the great philosopher and mathematical logician, meant when he said that logic studies not the laws of nature but the **"laws of the laws of nature."** Whether Frege was strictly right depends on what one means by "logic." But if by "logic" he meant *philosophy*, then his dictum was spot-on: the discipline that studies the laws the laws cannot break is exactly the discipline we have been describing.

## "Analytic philosophy is post-Fregean philosophy"

Frege is often described as the first analytic philosopher. **Michael Dummett** (1925– ), an exceptionally capable contemporary philosopher of language, said that *"analytic philosophy is post-Fregean philosophy."* What does Dummett mean?

With some exceptions, **pre-Fregean philosophers** thought they were studying the most general features of the **actual world**. They took themselves to be in the same line of work as the **botanist** — saying how the world is — the only difference being that their concern was with more general features of reality than the botanist's. On this picture philosophy is just very high-altitude natural history.

## Frege's inversion

Frege showed that this is wrong, and the argument turns on a reversal of priorities. Any interest a botanist has in plants that *might* exist but don't is **subordinate** to his interest in what plants *actually* exist. Like all scientists, the botanist is interested in what there *could* be only to the extent that it helps him figure out what there *is*. The possible is studied in service of the actual.

With philosophers it is the other way around. **Any interest they have in the actual is subordinate to their interest in the possible.** The philosopher cares about how things happen to stand only in so far as it illuminates how things could or must stand. This single inversion is the dividing line Dummett is pointing at.

## The analytic method: from sentences to possibilities

Unlike non-analytic philosophers, analytic philosophers figure out what there *could* be by **analyzing statements**. The governing principle links sense to possibility. A statement that makes sense is one that *can* be true; a statement that makes no sense is one that *cannot*. Writing $\\Diamond$ for "possibly":

$$\\text{MakesSense}(S) \\;\\leftrightarrow\\; \\Diamond\\,\\text{True}(S).$$

Therefore statements that make sense **describe possible realities**, and statements that don't, don't. This is what lets the analytic philosopher chart the space of genuine possibilities without leaving his chair: survey which statements are coherent and you have thereby surveyed which realities are possible. Questions like "could there be such-and-such?" become questions about whether the corresponding sentence makes sense — a conceptual investigation, not an empirical one.

So the method is fixed. But what, exactly, did Frege *do* with it? That is where the next chapter begins.`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Homework 1.1 ─────────────
  {
    kind: "homework",
    title: "Homework 1.1 — Categories, meta-knowledge, and the levels of inquiry",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the principles of Chapter 1 to fresh scenarios. Use the math keyboard for the logical symbols (∀, ∃, ¬, ∧, →, ↔, □, ◇). Give the compact symbolic answer where a problem is formal, and justify your verdict in prose where it is not.",
    problems: [
      {
        topicSlug: "u1-categories",
        prompt:
          "Regiment the sentence 'Vienna lies east of Salzburg' so that its logical structure is displayed as a category (here a relation) attributed to objects. Use E for the east-of relation, then write the most general schema that every basic category-placing claim instantiates.",
        correctAnswer: "E(Vienna, Salzburg); general schema: φ(x₁, …, xₙ)",
        explanation:
          "Placing objects under a category yields the canonical form $\\varphi(x)$, generalized to relations as $\\varphi(x_1,\\dots,x_n)$. Here the two-place predicate $E$ is the categorial relation and Vienna and Salzburg are the objects it relates.",
        hint: "A relation is just a many-place property; ask which predicate is doing the categorizing.",
      },
      {
        topicSlug: "u1-knowledge-meta-knowledge",
        prompt:
          "A chess engine reliably finds winning moves but cannot produce any true statement of the strategic principles behind them. Using K(a, p), write a single formula capturing that it has the first-order competence yet lacks knowledge of what that competence consists in, and say which layer philosophy targets.",
        correctAnswer: "K(a, p) ∧ ¬K(a, K(a, p)); philosophy targets the second conjunct",
        explanation:
          "The engine's reliable performance is first-order knowledge $K(a,p)$, but it lacks the meta-knowledge $K\\big(a, K(a,p)\\big)$ about what it knows. Philosophy operates at this second, derivative layer.",
        hint: "Nest the knowledge operator inside itself.",
      },
      {
        topicSlug: "u1-philosophy-other-disciplines",
        prompt:
          "Compare two questions: (a) 'What triggered this particular neuron to fire?' and (b) 'What must any event satisfy to count as triggering another at all?' Using □ and the actuality/necessity contrast, say which level each targets and which is the philosophical one.",
        correctAnswer:
          "(a) targets p (the actual); (b) targets the conditions for the category 'cause' — a □-level question — and is the philosophical one",
        explanation:
          "Question (a) asks what in fact obtains, $p$. Question (b) asks what it is for one thing to cause another — the structure of the category itself — which is $\\Box$-level and subordinates the actual to the possible/necessary. That is the philosopher's concern.",
        hint: "One question wants a fact; the other wants the conditions any such fact must meet.",
      },
      {
        topicSlug: "u1-analytic-vs-non-analytic",
        prompt:
          "An investigator tries to settle 'could there be a four-sided triangle?' by going out and surveying shapes in the world. Using ◇ and the link between sense and possibility, identify the methodological error and give the correct analytic verdict.",
        correctAnswer:
          "¬◇True(S): the question is settled by analyzing the statement's coherence, not by observation; the description is incoherent, so it is impossible",
        explanation:
          "By $\\text{MakesSense}(S) \\leftrightarrow \\Diamond\\,\\text{True}(S)$, possibility is read off the coherence of the statement, not off observed cases. 'Triangle with four sides' makes no sense, so $\\neg\\Diamond\\,\\text{True}(S)$; surveying shapes is the wrong tool entirely.",
        hint: "Possibility questions are answered from the armchair, by checking sense.",
      },
    ],
  },

  // ───────────── Homework 1.2 ─────────────
  {
    kind: "homework",
    title: "Homework 1.2 — Diagnosing levels, the ladder, and the analytic inversion",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Each problem gives a new scenario. Decide, regiment, or diagnose as instructed, and justify. Use the math keyboard for ∀, ∃, ¬, ∧, →, ↔, □, ◇.",
    problems: [
      {
        topicSlug: "u1-categories",
        prompt:
          "Of these two questions — (a) 'How many oak trees stand in this forest?' and (b) 'What must hold for several things to count as one and the same kind?' — say which belongs to the discipline that delineates category-structures, and write the canonical logical form of the basic claims that discipline analyzes.",
        correctAnswer:
          "(b) is the philosophical/categorial question; canonical form: φ(x)",
        explanation:
          "Counting oaks is a first-order empirical question about the actual world. Asking what it is for things to fall under one kind delineates a category's structure; the basic claims it analyzes have the form $\\varphi(x)$.",
        hint: "One question counts instances; the other asks what makes something an instance.",
      },
      {
        topicSlug: "u1-knowledge-meta-knowledge",
        prompt:
          "A jazz musician improvises flawlessly, but when she writes down her 'theory' of what she is doing, the theory labels as wrong several phrases she herself plays and approves. Identify which layer her secure competence occupies and which layer her faulty theory occupies, and state what this shows about self-understanding.",
        correctAnswer:
          "Competence = first-order K(a, p); the stated theory = an attempt at meta-knowledge K(a, K(a, p)); self-understanding is derivative and lower in quality than the competence it is about",
        explanation:
          "Her reliable playing is first-order knowledge $K(a,p)$; her articulated rules are a faulty attempt at $K\\big(a,K(a,p)\\big)$. That the theory distorts the very data it should capture illustrates that self-understanding is necessarily derivative of, and harder-won than, first-order competence.",
        hint: "The performance is one level; the account of the performance is the level above it.",
      },
      {
        topicSlug: "u1-philosophy-other-disciplines",
        prompt:
          "A pilot wants the plane to fly; an aeronautical engineer wants aerodynamic laws only in order to build wings; an aerodynamicist wants wing designs only in order to uncover the laws. Continuing this ladder one rung, characterize what the philosopher of science seeks relative to the aerodynamicist, using the actuality/necessity contrast.",
        correctAnswer:
          "philosopher : aerodynamicist :: aerodynamicist : engineer; the philosopher seeks not which laws hold (p) but what it is for something to be a law at all (□-level), treating the actual as subordinate to the possible/necessary",
        explanation:
          "Each rung treats the one below as a mere means. The aerodynamicist uses designs to find laws ($p$); the philosopher uses the laws to expose the structure of the category 'law' itself — a $\\Box$-level concern in which interest in the actual is subordinate to interest in the necessary.",
        hint: "Add one more rung where the laws themselves become the means, not the end.",
      },
      {
        topicSlug: "u1-analytic-vs-non-analytic",
        prompt:
          "A zoologist studies which animals could possibly exist only to better catalogue those that actually do. A philosopher instead asks 'could a creature feel pain with no nervous system whatever?' Characterize how the philosopher's ordering of actual and possible inverts the zoologist's, and how the question is to be answered.",
        correctAnswer:
          "Zoologist: possible subordinate to actual. Philosopher: actual subordinate to possible; the question is answered by analyzing whether the statement makes sense — ◇True(S) — not by observation",
        explanation:
          "Like all scientists the zoologist studies the possible only to pin down the actual; the philosopher reverses this. By $\\text{MakesSense}(S)\\leftrightarrow\\Diamond\\,\\text{True}(S)$, whether such a creature is possible is settled by whether the description is coherent, not by surveying organisms.",
        hint: "Which way does the dependence run between 'what is' and 'what could be'?",
      },
    ],
  },

  // ───────────── Unit Test ─────────────
  {
    kind: "test",
    title: "Chapter 1 Test — Analytic philosophy as logical analysis",
    weekNumber: 1,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed: 30 minutes. The math keyboard is available; pasting is disabled. Each problem is a fresh scenario — regiment, decide, or diagnose, and justify compactly. Use ∀, ∃, ¬, ∧, →, ↔, □, ◇ as needed.",
    problems: [
      {
        topicSlug: "u1-categories",
        prompt:
          "Regiment 'Helium is lighter than argon' into canonical form using a two-place predicate L, then state the most general logical schema common to every basic category-placing claim.",
        correctAnswer: "L(helium, argon); general schema: φ(x₁, …, xₙ)",
        explanation:
          "Placing objects under a category — here the relational category 'lighter than' — yields $L(\\text{helium},\\text{argon})$, an instance of the general form $\\varphi(x_1,\\dots,x_n)$ to which every basic categorial attribution conforms.",
      },
      {
        topicSlug: "u1-knowledge-meta-knowledge",
        prompt:
          "A student reasons: 'Since our doctor reliably cures her patients, she must therefore be able to state the biochemical principles by which her treatments work.' Using K, identify the inference and say exactly why it fails.",
        correctAnswer:
          "Inference: K(a, p) → K(a, K(a, p)); invalid — first-order competence does not entail meta-knowledge of what that competence consists in",
        explanation:
          "The student moves from first-order success $K(a,p)$ to the meta-claim $K\\big(a,K(a,p)\\big)$. Because self-understanding is derivative of and harder-won than first-order knowledge, the entailment fails: one can know how to cure without knowing what one's knowing consists in.",
      },
      {
        topicSlug: "u1-philosophy-other-disciplines",
        prompt:
          "Rank these three by how 'meta' their interest is, and say what a philosopher would add as a fourth rung: a calculator user who just wants the right total; an electronics engineer who wants circuit laws only to build chips; a solid-state physicist who wants chip designs only to uncover deeper laws.",
        correctAnswer:
          "user < engineer < physicist < philosopher; the philosopher seeks not which laws hold (p) but what it is for something to be a law at all (□-level / the category 'law')",
        explanation:
          "Each rung treats the level below as a means: the engineer uses laws to build, the physicist uses devices to find laws ($p$). The philosopher adds the top rung, asking after the structure of the category 'law' — a $\\Box$-level question that subordinates the actual to the possible.",
      },
      {
        topicSlug: "u1-analytic-vs-non-analytic",
        prompt:
          "A philosopher claims 'a colorless red apple is impossible' and tries to defend the claim by inspecting many apples. Using ◇ and the link between sense and possibility, identify the methodological error and give the correct analytic verdict.",
        correctAnswer:
          "Error: treating a modal/conceptual question empirically. Correct verdict: ¬◇True(S), established by the incoherence of the description, not by inspection",
        explanation:
          "By $\\text{MakesSense}(S)\\leftrightarrow\\Diamond\\,\\text{True}(S)$, impossibility is shown by the statement's failing to make sense. 'Colorless red apple' is incoherent, so $\\neg\\Diamond\\,\\text{True}(S)$; inspecting apples could never settle a question about what could be.",
      },
      {
        topicSlug: "u1-categories",
        prompt:
          "Two inquiries are proposed: (a) measuring the exact boiling point of a newly synthesized alloy; (b) settling what conditions any sample must meet to count as the same substance across physical changes. Say which is the philosophical (categorial) inquiry and write the canonical logical form of the basic claims that inquiry analyzes.",
        correctAnswer: "(b) is the philosophical inquiry; the claims it analyzes have the form φ(x)",
        explanation:
          "Measuring a boiling point is first-order knowledge of the actual world. Asking what it is for something to count as the same substance delineates a category's structure; the basic claims placing items under that category have the canonical form $\\varphi(x)$.",
      },
      {
        topicSlug: "u1-analytic-vs-non-analytic",
        prompt:
          "Asked 'could there be a language that no one has ever spoken?', a thinker tries to answer by combing through historical records. Using ◇True(S), say how the analytic method handles the question and what verdict the coherence of the description yields.",
        correctAnswer:
          "◇True(S): since the description is coherent (it harbors no contradiction), it is possible; the verdict is reached by analyzing the statement's sense, not by historical survey",
        explanation:
          "Possibility tracks sense: $\\text{MakesSense}(S)\\leftrightarrow\\Diamond\\,\\text{True}(S)$. The description of an unspoken language contains no incoherence, so $\\Diamond\\,\\text{True}(S)$ holds and the thing is possible. Records bear only on the actual, which is irrelevant to the modal question.",
      },
    ],
  },
];

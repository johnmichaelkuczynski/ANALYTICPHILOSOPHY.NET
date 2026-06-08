import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  {
    slug: "u6-formal-truth-formal-entailment",
    title: "Formal truth and formal entailment",
    weekNumber: 6,
    blurb:
      "Entailment, the form of a statement, and the Tractarian thesis that every entailment is a formal entailment.",
    lectureTitle:
      "6.0 (ii) revisited: formal truth ≠ analytic truth — formal truth and formal entailment",
    body: `# 6.0 (ii) revisited: formal truth ≠ analytic truth

One of the main contentions of the *Tractatus Logico-Philosophicus* (the **TLP**) is that **all entailment is formal entailment**. To see what that thesis says — and, in the next lecture, why it is false — we first have to be exact about three notions: *entailment*, the *form* of a statement, and *formal truth*. We will build a small symbolic harness for each.

## Entailment

One statement **entails** another if, supposing the first is true, the second could not possibly be false. Writing $\\models$ for entailment and $\\Box$ for "it is necessary that", this is

$$S_1 \\models S_2 \\;\\;\\equiv\\;\\; \\Box\\,(S_1 \\to S_2).$$

The modal word *could* is doing all the work. Entailment is not the claim that $S_1$ and $S_2$ *happen* to be true together; it is the claim that there is **no possible situation** in which $S_1$ holds and $S_2$ fails. So

$$\\text{"Smith is a triangle"} \\;\\models\\; \\text{"Smith has more than one side"},$$

because there is no possible way for something to be a triangle and yet have just one side (or none). Entailment is a *modal* relation between statements; it is exactly the relation a valid deductive inference tracks. To infer $S_2$ from $S_1$ correctly is to recognise that $S_1 \\models S_2$.

## Open sentences and the form of a statement

To talk about the *form* of a statement we strip out its **nonlogical vocabulary** — its particular names and predicates — and leave behind only the logical skeleton, marking the gaps with schematic letters. What remains is an **open sentence**, or *schema*: a pattern with blanks where contentful words used to stand.

For example, the statement

$$(1)\\quad \\text{"If Smith is in the barn, then it is not the case that it is not the case that Smith is in the barn"}$$

has the form

$$(2)\\quad P \\to \\neg\\neg P.$$

Here $P$ is a schematic letter, not a particular statement; $(2)$ is an open sentence. An **interpretation** of an open sentence is any way of filling its blanks with genuine statements (or, for predicate schemata, any way of assigning meanings and extensions to its predicate- and name-letters). Each interpretation turns the open sentence into a closed, fully meaningful statement — a **substitution instance** of the form. "If snow is white, then it is not the case that it is not the case that snow is white" is one instance of $(2)$; "If $7$ is prime, then it is not the case that it is not the case that $7$ is prime" is another.

We keep the *logical* words fixed under reinterpretation — $\\neg, \\wedge, \\vee, \\to, \\leftrightarrow, \\forall, \\exists$ — and let everything else vary. Two statements have the **same form** when they share one such skeleton.

## Formal truth

A statement is a **formal truth** if and only if *every* statement having the same form as it is true. Equivalently — and this is the harness we will lean on — a statement is a formal truth iff it comes out true under **every interpretation** of its nonlogical vocabulary. We write

$$\\models (P \\to \\neg\\neg P)$$

to record that the *form* itself is valid: no matter what statement we substitute for $P$, the result is true.

$(1)$ is a formal truth, because **every** statement of the form $(2)$ is true. There is no way to substitute a statement for $P$ in $P \\to \\neg\\neg P$ and obtain a falsehood. By contrast,

$$P \\to Q$$

is **not** a formal truth: substitute "snow is white" for $P$ and "snow is black" for $Q$ and you get a false instance. A single false instance is enough to disqualify a form. So to *show* that something is a formal truth you must canvass all interpretations; to show that it is *not*, you need only exhibit one interpretation that falsifies it.

Formal truth is therefore truth **in virtue of logical form alone** — truth guaranteed by the logical constants, surviving every reinterpretation of the contentful words. The double-negation law, $P \\vee \\neg P$, $(P \\wedge Q) \\to P$, and $\\forall x\\,Fx \\to Fa$ are all formal truths in this sense.

## Formal entailment

Now we can define the key notion. One statement $S_1$ **formally entails** another statement $S_2$ if and only if the conditional

$$\\text{"if } S_1 \\text{, then } S_2\\text{"}$$

is a formal truth. Formal entailment is just entailment that holds *in virtue of form*: $S_1$ formally entails $S_2$ when $\\models (S_1 \\to S_2)$, i.e. when every interpretation that makes $S_1$ true makes $S_2$ true, purely because of the logical skeleton they share.

$(1)$ is not only a formal truth; it is also a **formal entailment**. It is a formal truth that is *also* an entailment — for it says, in effect, that one statement ("Smith is in the barn") entails another ("it is not the case that it is not the case that Smith is in the barn"). A formal entailment is precisely a formal truth that has the shape of an entailment.

We can package this cleanly:

$$S_1 \\text{ formally entails } S_2 \\;\\;\\equiv\\;\\; \\models (S_1 \\to S_2),$$
$$S_1 \\models S_2 \\;\\;\\equiv\\;\\; \\Box\\,(S_1 \\to S_2).$$

Every formal entailment is an entailment (if the conditional is true under *all* interpretations, then in particular it is necessarily true). The TLP's bold thesis is that the converse holds too.

## The Tractarian thesis

In the TLP, Wittgenstein asserted that **all entailments are formal entailments** — that whenever $S_1 \\models S_2$, the conditional "if $S_1$ then $S_2$" is already a formal truth, or can be made into one by replacing $S_1$ and $S_2$ with synonyms whose shared logical form does the work. On this picture there is, at bottom, only *one* source of necessity: logical form. Genuine entailment never outruns the skeleton.

This is an enormously ambitious claim. It implies that the entire space of valid inference is a projection of formal logic — that there is no necessity *between* statements except the necessity built into their logical constants. Wittgenstein was well aware that there are *apparent* counterexamples, and in the next lecture we examine the manoeuvre by which he tried to absorb them, the cases where the manoeuvre succeeds, and the cases where it decisively fails — showing that **formal truth $\\neq$ analytic truth**.`,
  },
  {
    slug: "u6-formal-vs-analytic-entailment",
    title: "Why formal truth ≠ analytic truth",
    weekNumber: 6,
    blurb:
      "Some analytic entailments cannot be reduced to formal ones; non-tautologous, non-empirical truths exist, and the Tractarian criterion of meaningfulness fails.",
    lectureTitle:
      "6.0 (ii) revisited: formal truth ≠ analytic truth — the existence of non-formal entailments",
    body: `# The existence of non-formal entailments

The TLP's thesis is that every entailment is a **formal** entailment. The thesis faces apparent counterexamples — pairs of statements where the first plainly entails the second, yet the conditional joining them is *not* a formal truth. Wittgenstein had a single, reasonable strategy for absorbing such cases. We will see that the strategy works for some counterexamples and fails for others, and that its failure proves that **formal truth and analytic truth come apart**.

## An apparent counterexample, and Wittgenstein's reply

Consider:

$$(4)\\quad \\text{"Brown is a bachelor"} \\qquad \\text{entails} \\qquad (5)\\quad \\text{"Brown is unmarried."}$$

This is a genuine entailment: there is no possible situation in which Brown is a bachelor but not unmarried. Yet the corresponding conditional

$$(6)\\quad \\text{"if Brown is a bachelor, then Brown is unmarried"}$$

is **not** formally true, because it shares its form with

$$(7)\\quad \\text{"if Brown is a bachelor, then Brown is a cupcake"},$$

which is not true at all. The form here is $Fa \\to Ga$, and $Fa \\to Ga$ has false instances. So $(4)$ entails $(5)$ without *formally* entailing it. If the TLP thesis is to stand, this gap must be closed.

Wittgenstein closes it, very reasonably, by **analysis through synonymy**. He observes that $(4)$ is synonymous with

$$(4\\mathrm{F})\\quad \\text{"Brown is unmarried and Brown is an adult and Brown is male."}$$

And unlike $(4)$, the analysed sentence $(4\\mathrm{F})$ *does* formally entail $(5)$: its form is

$$(\\,U a \\wedge A a \\wedge M a\\,) \\to U a,$$

an instance of the formal truth $(P \\wedge Q \\wedge R) \\to P$. So once we replace $(4)$ by its synonym, the entailment becomes a formal entailment after all. Wittgenstein's claim is that **every** apparent counterexample can be handled in this way: rewrite the premise as a conjunction that wears its consequence on its sleeve, and the buried formal entailment surfaces.

The strategy has a definite shape. To defuse a counterexample "$S_1 \\models S_2$ but not formally", you must produce a sentence $S_1^{*}$ such that

$$S_1^{*} \\text{ is synonymous with } S_1, \\quad \\text{and} \\quad \\models (S_1^{*} \\to S_2).$$

Everything turns on whether such a *synonym* always exists.

## Where the strategy fails

It does not always exist. Consider:

$$(8)\\quad \\text{"Brown is a circle"} \\qquad \\text{entails} \\qquad (9)\\quad \\text{"Brown is a two-dimensional figure."}$$

Again $(8)$ does not *formally* entail $(9)$ — the form $Ca \\to Da$ has false instances. So Wittgenstein must find a sentence synonymous with $(8)$ that formally entails $(9)$. The only serious candidate is

$$(10)\\quad \\text{"Brown is a closed, planar, two-dimensional figure of uniform curvature."}$$

And $(10)$ *does* formally entail $(9)$: being two-dimensional is one of the conjuncts, so the entailment is the formal truth $(P \\wedge Q \\wedge R \\wedge S) \\to S$. The trouble is that **$(10)$ is not synonymous with $(8)$.**

How do we know they are not synonymous? Apply the **triviality test**. Compare:

$$(11)\\quad \\text{"Brown is a circle iff Brown is a circle"},$$
$$(12)\\quad \\text{"Brown is a circle iff Brown is a closed, planar, two-dimensional figure of uniform curvature."}$$

$(11)$ is trivial; it says nothing — it is a substitution instance of $P \\leftrightarrow P$, a bare tautology. But $(12)$ is **non-trivial**: it is informative, it can be doubted, it can be learned. If "circle" and "closed planar figure of uniform curvature" were genuinely synonymous, $(12)$ would be just as empty as $(11)$ — it would collapse into $P \\leftrightarrow P$. It does not. Therefore the two expressions are *not* synonymous, and Wittgenstein's reduction has nothing to stand on. There is no synonym of $(8)$ that formally entails $(9)$.

## A non-tautologous, non-empirical truth

Now look hard at $(12)$. It is **true** — necessarily so. It says nothing about the spatiotemporal world; you could not refute it by measuring any circle, and you would never confirm it by observation. Its truth is **guaranteed by the structures of the concepts composing it** — by what *circle* and *closed planar figure of uniform curvature* are. So $(12)$ is **logically true** in the broad sense: true in virtue of concepts.

Yet, unlike $(11)$, $(12)$ is **not a tautology** — it is not a formal truth, because its form, $P \\leftrightarrow Q$, has false instances. We therefore have, in $(12)$, a truth that is:

- **not formal** (its form admits false instances), and
- **not empirical** (no observation bears on it).

It is a **non-tautologous, non-empirical truth** — an *analytic* truth that is not a *formal* truth. This is exactly the gap the TLP denied could exist.

## The conclusion: analytic ⊋ formal

The entailment from $(8)$ to $(9)$ is a real entailment — $\\Box((8) \\to (9))$ — but it is **not** a formal entailment and **cannot be reduced to one**, because the reduction would require a synonymy that the triviality test shows is absent. So there are **non-formal entailments**:

$$\\exists\\, S_1, S_2 \\;\\big(\\, S_1 \\models S_2 \\;\\wedge\\; \\neg\\,\\models (S_1 \\to S_2)\\,\\big), \\text{ with no synonymous reduction available.}$$

In other words, the class of **analytic truths** properly contains the class of **formal truths**. Some necessities flow from logical form (the double-negation law, simplification, instantiation); others flow from the *content* of the concepts involved and can be regimented into formal shape only by smuggling in a further analytic equivalence — and sometimes, as with the circle, no such equivalence exists.

The bachelor case and the circle case look superficially alike, but they are deeply different. The bachelor entailment is **reducible**: there really is a synonymous definition ("unmarried adult male") that exposes a formal core. The circle entailment is **irreducible**: there is no synonymous definition, so the entailment is non-formal all the way down. The lesson is to distinguish *definitional* analytic links, which can be reduced, from *irreducible* analytic links, which cannot.

Because there are non-formal entailments, **the Tractarian thesis that all entailment is formal entailment is false**, and with it the Tractarian criterion of meaningfulness that was built upon it. ("Tractarian" is the adjective form of "the *Tractatus Logico-Philosophicus*.") Formal logic does not exhaust necessity; the analytic outruns the formal.`,
  },
];

export const assignments: SeedAssignment[] = [
  {
    kind: "homework",
    title: "Homework 6.1 — Recognising formal truths and formal entailments",
    weekNumber: 6,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "For each fresh sentence or inference, give its logical form using schematic letters and decide whether it is a formal truth / formal entailment, justifying by the all-interpretations test. Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇, ⊨.",
    problems: [
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Take the sentence: 'If the reactor is online, then it is not the case that it is not the case that the reactor is online.' Write its logical form with a schematic letter and decide whether it is a formal truth.",
        correctAnswer: "Form: P → ¬¬P. Yes — a formal truth (⊨ (P → ¬¬P)).",
        explanation:
          "Stripping the nonlogical vocabulary leaves the schema $P \\to \\neg\\neg P$. Every substitution instance is true, so $\\models (P \\to \\neg\\neg P)$; it is true in virtue of logical form alone.",
        hint: "Replace the whole clause with one schematic letter and watch the double negation.",
      },
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Does 'The broth is hot and the broth is salty' formally entail 'The broth is salty'? Give the form of the entailing conditional and the verdict using ⊨.",
        correctAnswer: "Yes. ⊨ ((P ∧ Q) → Q); equivalently (P ∧ Q) ⊨ Q.",
        explanation:
          "The conditional has the form $(P \\wedge Q) \\to Q$, every instance of which is true, so it is a formal truth and the entailment is formal. $\\models((P\\wedge Q)\\to Q)$ holds under every interpretation.",
        hint: "This is simplification; check whether any interpretation makes the conjunction true but a conjunct false.",
      },
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Take: 'If every juror agreed, then juror number seven agreed.' Regiment it with a quantifier and a name-constant and decide whether it is a formal truth.",
        correctAnswer: "Form: ∀x Fx → Fa. Yes — a formal truth (universal instantiation).",
        explanation:
          "The schema is $\\forall x\\,Fx \\to Fa$, where $a$ names juror seven. On any interpretation in which $\\forall x\\,Fx$ is true, $Fa$ is true, so $\\models(\\forall x\\,Fx \\to Fa)$; truth is guaranteed by form.",
        hint: "If everything in the domain is F, that includes whatever the name denotes.",
      },
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Is 'If the parcel was delivered, then the invoice was paid' a formal truth? Give its form and justify your verdict by the all-interpretations test.",
        correctAnswer:
          "Form: P → Q. No — not a formal truth; a falsifying interpretation exists.",
        explanation:
          "The schema $P \\to Q$ has false instances (interpret $P$ as a truth and $Q$ as a falsehood). A single falsifying interpretation defeats formal truth, so $\\neg\\,\\models(P \\to Q)$.",
        hint: "You only need one interpretation that makes the antecedent true and the consequent false.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 6.2 — Formal vs. analytic entailment: reducible or not?",
    weekNumber: 6,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Each item is a genuine entailment that is not formal as it stands. Decide whether it is REDUCIBLE to a formal entailment (a synonymous definition exists) or an IRREDUCIBLE non-formal entailment (use the triviality test). Give the supporting biconditional or the symbolic verdict, and justify. Use the math keyboard for ↔, →, ∧, ¬, ⊨.",
    problems: [
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "'a is a vixen' entails 'a is female.' Is this entailment reducible to a formal entailment? If so, give the synonymous definition and the resulting formal entailment.",
        correctAnswer:
          "Reducible. Vixen(a) ↔ (Female(a) ∧ Fox(a)); then ⊨ ((Female(a) ∧ Fox(a)) → Female(a)).",
        explanation:
          "'Vixen' is synonymous with 'female fox', so $\\text{Vixen}(a) \\leftrightarrow (\\text{Female}(a) \\wedge \\text{Fox}(a))$ is a genuine definition. Substituting yields the formal entailment $\\models((\\text{Female}(a)\\wedge\\text{Fox}(a)) \\to \\text{Female}(a))$, an instance of simplification.",
        hint: "Is there a real definition of the predicate as a conjunction?",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "'a is scarlet' entails 'a is colored.' Is this entailment reducible to a formal entailment, or is it irreducibly non-formal? Apply the triviality test to justify your answer.",
        correctAnswer:
          "Irreducible non-formal entailment. No synonym of 'scarlet' of the form 'colored ∧ …' exists.",
        explanation:
          "Any informative biconditional 'a is scarlet ↔ [definiens]' is non-trivial — it does not collapse into $P \\leftrightarrow P$ — so no definiens is synonymous with 'scarlet'. The entailment is a non-tautologous, non-empirical (analytic) truth: $\\text{Scarlet}(a) \\models \\text{Colored}(a)$ yet $\\neg\\,\\models(\\text{Scarlet}(a) \\to \\text{Colored}(a))$.",
        hint: "Could you spell out 'scarlet' as a conjunction the way you can spell out 'vixen'? Test the resulting biconditional for triviality.",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "'a is warmer than b' entails 'b is cooler than a.' Decide whether this entailment is reducible to a formal one, and give the symbolic ground for your verdict.",
        correctAnswer:
          "Reducible. Cooler(b,a) ↔ Warmer(a,b); after substitution it becomes the formal entailment Warmer(a,b) ⊨ Warmer(a,b).",
        explanation:
          "'Cooler than' is synonymous with the converse of 'warmer than', so $\\text{Cooler}(b,a) \\leftrightarrow \\text{Warmer}(a,b)$ is a genuine definition. Substituting turns the entailment into $\\text{Warmer}(a,b) \\models \\text{Warmer}(a,b)$, a formal truth of the form $P \\to P$.",
        hint: "Is one relation just the other relation with its places swapped?",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "Classify the true sentence 'Nothing that is wholly red is wholly green' as (a) formally true, (b) analytically but not formally true, or (c) empirical. Justify with the all-interpretations test.",
        correctAnswer:
          "(b) analytically but not formally true.",
        explanation:
          "Reinterpreting the predicates (e.g. 'red' as 'round', 'green' as 'square') yields a false instance, so the sentence is not a formal truth: $\\neg\\,\\models$ its form. But no observation bears on it and its truth flows from the contents of the color concepts, so it is an irreducible analytic (non-formal) truth.",
        hint: "Can you falsify its form by swapping in other predicates? Could any measurement refute it?",
      },
    ],
  },
  {
    kind: "test",
    title: "Unit 6 Test — Formal truth, analytic truth, and entailment",
    weekNumber: 6,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed: 30 minutes. Math keyboard available; pasting is disabled. For each fresh item give the logical form where relevant and a precise verdict, justified by the all-interpretations test, the triviality test, or a synonymous reduction. Use ∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇, ⊨.",
    problems: [
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Take: 'If the report is finished, then the report is finished or the report is overdue.' Give its logical form and decide whether it is a formal truth.",
        correctAnswer: "Form: P → (P ∨ Q). Yes — a formal truth (addition).",
        explanation:
          "The schema is $P \\to (P \\vee Q)$, and any interpretation making $P$ true makes $P \\vee Q$ true, so $\\models(P \\to (P \\vee Q))$. Truth is guaranteed by logical form.",
        hint: "Whenever the antecedent holds, at least one disjunct holds.",
      },
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Does 'The switch is up and the fan is on' formally entail 'The fan is on and the switch is up'? Give the form of the conditional and the verdict using ⊨.",
        correctAnswer: "Yes. ⊨ ((P ∧ Q) → (Q ∧ P)); i.e. (P ∧ Q) ⊨ (Q ∧ P).",
        explanation:
          "The conditional has the form $(P \\wedge Q) \\to (Q \\wedge P)$, which is true under every interpretation (conjunction commutes). Hence it is a formal truth and the entailment is formal.",
        hint: "Order of conjuncts never affects the truth-value of a conjunction.",
      },
      {
        topicSlug: "u6-formal-truth-formal-entailment",
        prompt:
          "Is 'If some windows are open, then some windows are closed' a formal truth, an analytic truth, or neither? Give its form and justify.",
        correctAnswer:
          "Form: ∃x Fx → ∃x Gx. Neither — not formally true and not analytically true.",
        explanation:
          "The schema $\\exists x\\,Fx \\to \\exists x\\,Gx$ has false instances, so $\\neg\\,\\models(\\exists x\\,Fx \\to \\exists x\\,Gx)$. Nor does the content of the concepts make it necessary — a building could have open windows and no closed ones — so it is not analytic either.",
        hint: "Try an interpretation where something is F but nothing is G.",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "'a is a widow' entails 'a was once married.' Decide whether this entailment is reducible to a formal entailment, and give the supporting definition.",
        correctAnswer:
          "Reducible. Widow(a) ↔ (Woman(a) ∧ OnceMarried(a) ∧ SpouseDead(a)); this formally entails OnceMarried(a).",
        explanation:
          "'Widow' has a genuine synonymous definition ('a woman whose spouse has died'), so $\\text{Widow}(a) \\leftrightarrow (\\text{Woman}(a) \\wedge \\text{OnceMarried}(a) \\wedge \\text{SpouseDead}(a))$. Substituting exposes a formal entailment of the form $(P \\wedge Q \\wedge R) \\to Q$.",
        hint: "Can you unpack the predicate into a conjunction that contains the consequent?",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "'a is crimson' entails 'a is red.' Decide whether this entailment is reducible to a formal one or is irreducibly non-formal, and apply the triviality test to justify your answer.",
        correctAnswer:
          "Irreducible non-formal entailment. No synonym of 'crimson' of the form 'red ∧ …' exists.",
        explanation:
          "'Crimson' is a determinate shade of the determinable 'red'; any biconditional 'a is crimson ↔ [definiens]' stays non-trivial rather than collapsing into $P \\leftrightarrow P$, so there is no synonymous reduction. Thus $\\text{Crimson}(a) \\models \\text{Red}(a)$ while $\\neg\\,\\models(\\text{Crimson}(a) \\to \\text{Red}(a))$ — a non-tautologous, non-empirical truth.",
        hint: "Determinate-to-determinable shade links resist conjunctive definition; test the biconditional for triviality.",
      },
      {
        topicSlug: "u6-formal-vs-analytic-entailment",
        prompt:
          "A logician claims that the inference 'a is taller than b; therefore b is shorter than a' is a counterexample to the thesis that all entailment is formal entailment, AND that it can never be reduced to a formal entailment. Diagnose exactly where the claim goes wrong.",
        correctAnswer:
          "Half right: it is non-formal as it stands, but it IS reducible, so it is not a successful irreducible counterexample. Shorter(b,a) ↔ Taller(a,b) gives Taller(a,b) ⊨ Taller(a,b).",
        explanation:
          "As stated the conditional has the form $Tab \\to Sba$, which has false instances, so the entailment is not formal. But 'shorter than' is synonymous with the converse of 'taller than', so $\\text{Shorter}(b,a) \\leftrightarrow \\text{Taller}(a,b)$ reduces it to the formal entailment $\\text{Taller}(a,b) \\models \\text{Taller}(a,b)$. A genuine irreducible counterexample requires a link with no synonymous definition (e.g. a determinate-determinable or color-exclusion link).",
        hint: "Separate two questions: is it formal as it stands, and can a synonymy reduce it?",
      },
    ],
  },
];

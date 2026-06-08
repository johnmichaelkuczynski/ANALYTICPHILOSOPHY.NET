import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 2 — Frege: logical form vs. grammatical form
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u2-logical-vs-grammatical-form",
    title: "Frege's key insight: logical form ≠ grammatical form",
    weekNumber: 2,
    blurb:
      "Grammar tempts us to read 'nothing is a square circle' as being about a non-entity; analysis shows it is really a claim about properties.",
    lectureTitle: "2.0 Frege's key insight: Logical form ≠ grammatical form",
    body: `# Frege's key insight: logical form ≠ grammatical form

Frege's legacy to philosophy can be summed up in a single methodological principle:

> **(FL)** When people have an obviously correct belief that seems to have an absurd consequence, they should ask themselves whether that absurdity really *is* a consequence of that belief. But they frequently don't. Instead they accept the absurdity and, in order to make this mistake of theirs work, they develop ad hoc hypotheses as to the nature of reality that undermine the integrity of their own belief system.

**Analytic philosophy just is philosophy driven by acceptance of FL.** The rest of this lecture expands on FL and makes it clear why it is true.

## A worked case: the square circle

Consider the statement:

$$(\\text{SC})\\quad \\text{nothing is a square circle.}$$

SC is true. Everybody knows this. But what does SC *say*?

Judging by its **grammatical** similarity to "Smith is a very capable lawyer" — a sentence that attributes a property (being a capable lawyer) to an individual (Smith) — SC would seem to say that a certain entity has the property of being a square circle. Presumably the entity in question is some *non-entity*. If that presumption is correct, SC says:

$$(\\text{SC*})\\quad \\text{some non-entity, some featureless un-thing, is a (square) circle.}$$

But SC\\* is **doubly incoherent**:

1. If *anything* is a square circle, then SC is false — and it is irrelevant how much of a cipher the entity in question is.
2. The very idea of a *non-entity* is absurd: to be an entity is just to be *something*, so a "non-entity that is a circle" would be a thing that is not a thing.

And yet it is hard to find a layperson or even a scholar who, asked what SC means, comes up with anything substantively different from SC\\*.

Here is the jam, and it is exactly the shape FL warns about. Given what a rank absurdity SC\\* is, **we cannot accept it**, even though it seems to follow from SC. But **we cannot reject SC** either, since it is an obvious truth. The tempting (wrong) move is to swallow SC\\* and start populating reality with featureless "non-entities" to make it come out true.

## The way out: reflect on what our words actually mean

We do not need new metaphysics; we need to reflect a bit on meaning.

Take "nobody likes Larry." You are *not* saying that some un-person likes Larry. You are saying that if you gathered together all the people who like Larry and put them in an otherwise empty room, that room would remain empty — which is the same as saying that if you put *all the people in existence* in an otherwise empty room, there would be no things in that room that liked Larry. So "nobody likes Larry" means:

$$\\text{the set of people who like Larry is empty,}\\qquad \\{x : \\text{Likes}(x, \\text{Larry})\\} = \\varnothing,$$

or, equivalently, that the set of people does **not overlap** with the set of things that like Larry.

SC is to be understood along exactly the same lines. If you put all the square circles in existence in an otherwise empty room, that room would remain empty; equivalently, if you put all the square things in an otherwise empty room, there would be no circles in it. So SC says, **not** that some un-thing is a circle, but that:

$$(\\text{i})\\quad \\text{the set of things that are both circular and square is empty,}$$

or, alternatively,

$$(\\text{ii})\\quad \\text{the set of circles does not overlap with the set of squares.}$$

## What (i) and (ii) really attribute — and to what

- **(i)** is a way of saying that any given thing lacks the property of being both a circle and a square. Equivalently: this property has no instances — it is **uninstantiated**.
- **(ii)** is a way of saying that anything having the property of being square lacks the property of being a circle. Equivalently: these two properties have **no instances in common** — they are **not coinstantiated**.

In symbols:

$$(\\text{i})\\quad \\neg\\exists x\\,(\\text{Square}(x) \\wedge \\text{Circle}(x)) \\;\\equiv\\; \\forall x\\,\\neg(\\text{Square}(x)\\wedge\\text{Circle}(x)),$$

$$(\\text{ii})\\quad \\{x : \\text{Square}(x)\\} \\cap \\{x : \\text{Circle}(x)\\} = \\varnothing.$$

Both (i) and (ii) **attribute properties to properties**. (i) says that the property *being both a square and a circle* is uninstantiated; (ii) says that the properties *being a square* and *being a circle* are not coinstantiated.

Since (i) and (ii) are just different ways of saying what SC says, SC does **not** make the absurd statement that some non-entity is a circle. It makes the innocuous statement that the set of squares does not overlap with the set of circles — equivalently, that the property of being a square circle is uninstantiated. **No non-entity is required.**

## The moral

What this shows is that, in at least some cases, philosophical insight is acquired **not** by doing parascience — not by positing entities — but by **analyzing meanings**, by clarifying statements. The absurdity SC\\* only *seemed* to follow from SC because we read SC's logical form off its grammatical form. Once the two come apart, the absurdity evaporates. That divergence between **logical form** (what a sentence really says) and **grammatical form** (what its surface structure suggests it says) is Frege's key insight, and it is the engine of everything that follows.`,
  },
  {
    slug: "u2-wrong-way-grammatical-surface",
    title: "The wrong way to react to grammatical surface-structure",
    weekNumber: 2,
    blurb:
      "Reading quantifier-words like names forces us to invent 'ambiguous' or 'non-specific' persons; a simple consistency test shows no name will do.",
    lectureTitle: "2.1 The wrong way to react to grammatical surface-structure",
    body: `# The wrong way to react to grammatical surface-structure

## A family of look-alike sentences

In respect of its grammatical form,

$$(\\text{JS})\\quad \\text{"John smokes"}$$

is comparable to

$$(\\text{MS})\\quad \\text{"Mary smokes."}$$

JS attributes the property of being a smoker to John; MS attributes that property to Mary. Each is also grammatically comparable to

$$(\\text{LJ})\\quad \\text{"Larry juggles"} \\qquad\\text{and}\\qquad (\\text{JJ})\\quad \\text{"Jane jogs."}$$

Each of these sentences says **of some individual** that he or she has a certain property:

$$\\text{Smokes}(\\text{John}),\\quad \\text{Smokes}(\\text{Mary}),\\quad \\text{Juggles}(\\text{Larry}),\\quad \\text{Jogs}(\\text{Jane}).$$

The obvious inference is that *any* sentence grammatically comparable to these says of some individual that he, she, or it has some property.

## The sentence that breaks the pattern

Now consider:

$$(\\text{SS})\\quad \\text{Someone smokes.}$$

Given what we just said, the obvious thing to say is that SS attributes the property of smoking to some individual. But **which** individual? Which individual does "someone" pick out?

### First bad answer: "an ambiguous person"

> "It picks out an ambiguous person," said one logician.

This is no good. **Words** are ambiguous; **people** are not. "Bank" is ambiguous because it has two meanings. But I am not ambiguous, and neither are you. And if — *per impossibile* — there did exist some "ambiguous person," some blank, featureless shell of a person picked out by "someone," then SS would *unambiguously* say of that person that he or she smoked. There clearly is no one person to whom SS attributes smoking.

This is easily shown. Suppose Smith smokes. Then

$$\\text{"someone smokes but Smith does not"}$$

is **false**. But it is **not self-contradictory** — it is nothing like "Smith smokes but Smith does not smoke." (For a statement to be self-contradictory is for it to bear two mutually opposed meanings.) And there is nothing special about the name "Smith": the same holds for Jones, Brown, or any expression that refers to an individual. So:

$$\\text{there is no individual } N \\text{ such that "someone smokes but } N \\text{ does not" is self-contradictory.}$$

Therefore **"someone" does not refer to anyone.**

### Second bad answer: "'someone' is itself ambiguous"

> "But you've misunderstood my thesis. The word 'someone' doesn't pick out an ambiguous person. It is itself ambiguous: it refers to Fred and Ethel and Mary — to all people indifferently."

That is false too. "Someone" is **not ambiguous**; it is not like the word "dumb." SS has *one* meaning, unlike "John is dumb," which could mean either "John is unintelligent" or "John is mute."

Moreover, if "someone" were ambiguous between "John" and "Ethel" and so on, then, depending on the circumstances, it would be **synonymous** with "John smokes" or "Ethel smokes." In that case "someone smokes, but John does not" would *sometimes* have the same meaning as

$$\\text{"John smokes but John does not smoke,"}$$

and so would *sometimes* be self-contradictory. But, as we just saw, "someone smokes, but John does not" is **never** self-contradictory under any circumstances. If John does smoke, it is merely false — not contradictory.

### Third bad answer: "it picks out everyone indifferently"

It is not even clear what it means to say "someone" picks out everyone "indifferently." But if — surely — picking out everyone indifferently involves picking out everyone, then it is just wrong to say "someone" picks out everyone (in this way or any other). For if it did, "someone" would mean the same as **"everyone"**, which it plainly does not.

## The shape of the mistake

Every one of these answers is an instance of the wrong reaction to grammatical surface-structure. SS is obviously true; "someone" is grammatically comparable to "John"; so — the reasoning goes — "someone" must refer to *something*. Since it obviously does not refer to anyone specific, we are driven to say it refers to an "ambiguous" or "non-specific" person, and so to the absurd thesis that there exists something in the world that is not identical with any particular thing — and therefore is not identical with **anything**. That is precisely the FL-style blunder: twisting reality to protect a reading the grammar only *suggested*.`,
  },
  {
    slug: "u2-right-way-grammatical-surface",
    title: "The right way to react: instantiation and quantifiers",
    weekNumber: 2,
    blurb:
      "Frege's cure: existential and negative sentences are claims that a property is (or is not) instantiated, with subject and predicate inverted relative to the grammar.",
    lectureTitle:
      "2.2 The right way to react to grammatical surface-structure",
    body: `# The right way to react to grammatical surface-structure

## "Someone" is not in the category of "John"

What the previous lecture shows is that "someone" is **not** in the same category as "John" and "Ethel." It does not function the way a name functions, even though its grammatical role would lead you to expect it to.

"Someone smokes" (SS) is obviously true. The *wrong* way to react to that fact is to twist reality so as to conform to our assumption that "someone," being grammatically comparable to "John," must refer to something — and so to posit an "ambiguous" or "non-specific" person.

The **right** way is to think more deeply about what SS is really saying. Frege did this and solved the puzzle: **SS's logical form diverges from its grammatical form.** In terms of what its grammar *suggests*, SS is indistinguishable from sentences that attribute smoking to specific objects. In terms of what it *really says*, it is very different.

## What SS really says: a property is instantiated

What SS is saying, as Frege made clear, is that the characteristic — the **property** — of being a smoker is **instantiated**:

$$(\\text{SS})\\quad \\exists x\\,\\text{Smokes}(x).$$

SS makes a statement not about some non-specific individual but about a very specific *property*, and it says of that property that it is instantiated.

> For a property to be **instantiated** is for there to be an **instance** of it. An instance of a property is something that *has* it. You are an instance of, and so instantiate, the property of being human — since, being human, you have that property.

## Properties that nothing has

There are properties that nothing has. Nobody has run a three-minute mile. Given any individual $x$, it is false to attribute the property *being a person who has run a three-minute mile* to $x$. So that property has **no instances** — it is **uninstantiated**.

The grammatical form of (let "TM" abbreviate "three minutes")

$$(\\text{TM})\\quad \\text{"nobody has run a three-minute mile"}$$

is just like that of

$$(\\text{JTM})\\quad \\text{"John has run a three-minute mile."}$$

JTM clearly attributes the property to an individual: $\\text{RanTMM}(\\text{John})$. But that is **not** what TM does. TM says of that property that it cannot be attributed to anyone. So TM says (let "UP" abbreviate "uninstantiated property"):

$$(\\text{UP})\\quad \\text{the property of being a person who has run a three-minute mile is uninstantiated,}$$

$$\\neg\\exists x\\,\\text{RanTMM}(x) \\;\\equiv\\; \\forall x\\,\\neg\\text{RanTMM}(x).$$

## Subject and predicate are inverted

Notice that **UP's grammatical form is the opposite of TM's.**

- The grammatical *subject* of TM is "nobody"; its grammatical *predicate* is "has run a three-minute mile."
- The grammatical *subject* of UP is "the property of being a person who has run a three-minute mile" — which corresponds to TM's *predicate* — and the grammatical *predicate* of UP is "is uninstantiated" — which corresponds to TM's *subject* ("nobody").

If one takes TM at face value, assuming its meaning parallels JTM's, one must say it attributes *being a three-minute-miler* to some **un-person**. But then, to be true, somebody — namely this un-person — would have to have run a three-minute mile, in which case TM would be **false**. Aligning TM's real meaning with its grammar spares us this absurdity: UP says, of a very much existent property, that it has a very much existent property (being uninstantiated). **We get the right result by linguistic analysis; we get the wrong result by para-science** — by positing new entities to account for the datum that TM is true.

## The same treatment for "nothing smokes"

The same holds for:

$$(\\text{NS})\\quad \\text{"nothing smokes."}$$

Pre-Fregeans said NS says of some non-thing — some blank entity — that it smokes. So, supposing that in 500 years nobody smokes and NS is therefore true, it would be true in virtue of some blank entity that is around *smoking*. But if there is such a thing and it is smoking, then NS is **false**. As long as one thing smokes, NS is false — no matter how blank or deficient that thing is.

Frege straightened this out. By an obvious extension of the above, NS's real meaning is:

$$(\\text{NS2})\\quad \\text{the property of being a smoker is uninstantiated,}\\qquad \\neg\\exists x\\,\\text{Smokes}(x).$$

Again the grammatical subject of NS2 (the property) corresponds to NS's grammatical *predicate*, and NS2's grammatical predicate ("is uninstantiated") corresponds to NS's grammatical *subject* ("nothing"). Aligning logical form with grammatical form, we no longer have to say, absurdly, that NS attributes smoking to some non-specific individual.

And similar remarks hold for the square circle: that statement says of two properties that they are **not coinstantiated**; it does not say of some non-entity that it is both a square and a circle.

## The basic tenet of analytic philosophy

Philosophical puzzles are solved by **making it clear what statements mean.** This is the basic tenet of analytic philosophy.

- **Philosophy** explains by **clarifying statements.**
- **Science** explains by **positing entities** — entities not themselves directly encountered but which, if assumed to exist, would account for phenomena that are directly encountered.

It used to be thought that philosophical explanation worked the same way: that progress was made by positing unknown entities which, if real, would explain what is known. **This is not the case. Philosophy is not para-science; philosophy is conceptual analysis.** To make a philosophical discovery is not to discover a new entity; it is to make explicit a previously unrecognized implication of an existing belief. Philosophy is **explication** — the clarification of statements we accept but whose depths we have not yet fully fathomed.`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Homework 2.1 ─────────────
  {
    kind: "homework",
    title: "Homework 2.1 — Regimenting negative existentials",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the logical-form/grammatical-form distinction to brand-new sentences. For each, give the regimentation in symbols and a short justification. Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, ∩, ∅, ∈, and set-builder braces.",
    problems: [
      {
        topicSlug: "u2-logical-vs-grammatical-form",
        prompt:
          "Regiment 'nothing is a married bachelor' into logical form using a negated existential, and give an equivalent set-overlap statement showing the claim is really about two properties, not about any object.",
        correctAnswer:
          "¬∃x (Married(x) ∧ Bachelor(x)); { x : Married(x) } ∩ { x : Bachelor(x) } = ∅",
        explanation:
          "Read off its grammar the sentence seems to attribute a property to a non-entity, but its logical form is $\\neg\\exists x\\,(\\text{Married}(x)\\wedge\\text{Bachelor}(x))$ — the property of being a married bachelor is uninstantiated. Equivalently $\\{x:\\text{Married}(x)\\}\\cap\\{x:\\text{Bachelor}(x)\\}=\\varnothing$: the two properties are not coinstantiated. No 'un-thing' is posited.",
        hint: "Ask what would be in an otherwise-empty room if you gathered every married bachelor into it.",
      },
      {
        topicSlug: "u2-logical-vs-grammatical-form",
        prompt:
          "A student claims that since 'no dragon guards the bridge' is true, there must be a featureless 'non-dragon' that fails to guard the bridge. Identify the error and give the correct logical form.",
        correctAnswer:
          "Error: reading grammatical form as logical form (positing a non-entity). Correct: ¬∃x (Dragon(x) ∧ GuardsBridge(x))",
        explanation:
          "The student reads the surface subject 'no dragon' as naming an object, which is the FL-style blunder. The sentence's logical form is $\\neg\\exists x\\,(\\text{Dragon}(x)\\wedge\\text{GuardsBridge}(x))$ — it says the property of being a bridge-guarding dragon is uninstantiated, attributing a property to a property rather than guarding to any un-thing.",
        hint: "Whose existence, if real, would actually make the sentence false?",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "Regiment 'nobody has solved this puzzle' as a claim that a property is uninstantiated, giving both the negated-existential and the universally-quantified-negation forms.",
        correctAnswer:
          "¬∃x SolvedPuzzle(x) ≡ ∀x ¬SolvedPuzzle(x)",
        explanation:
          "Despite sharing its grammar with 'Alice has solved this puzzle' ($\\text{SolvedPuzzle}(\\text{Alice})$), the sentence does not attribute solving to an un-person. Its logical form is $\\neg\\exists x\\,\\text{SolvedPuzzle}(x)$, equivalent to $\\forall x\\,\\neg\\text{SolvedPuzzle}(x)$: the property of being a puzzle-solver has no instances.",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "In the sentence 'nothing floats', identify which grammatical part corresponds to the logical subject (a property) and which to the logical predicate, and write the regimentation.",
        correctAnswer:
          "Grammatical predicate 'floats' → logical subject (the property of floating); grammatical subject 'nothing' → logical predicate 'is uninstantiated'. Form: ¬∃x Floats(x)",
        explanation:
          "The logical and grammatical forms invert: the surface predicate 'floats' names the property that is the real subject, and the surface subject 'nothing' carries the real predicate 'is uninstantiated'. So the sentence says the property of floating is uninstantiated, $\\neg\\exists x\\,\\text{Floats}(x)$.",
        hint: "Rewrite it as 'the property of floating is uninstantiated' and line up the parts.",
      },
    ],
  },

  // ───────────── Homework 2.2 ─────────────
  {
    kind: "homework",
    title: "Homework 2.2 — Quantifier-words are not names",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the consistency test and the instantiation analysis to fresh existential sentences. Give symbolic answers plus justification. Math keyboard available for ∃, ∀, ¬, ∧, →.",
    problems: [
      {
        topicSlug: "u2-wrong-way-grammatical-surface",
        prompt:
          "Regiment 'something is glowing', then use the consistency test to argue that the subject-word does not name any individual. Pick an arbitrary name a and write the test sentence whose consistency makes the point.",
        correctAnswer:
          "∃x Glows(x); test sentence: ∃x Glows(x) ∧ ¬Glows(a), consistent for every name a",
        explanation:
          "If the subject named some individual $a$, then 'something glows but $a$ does not' would be self-contradictory for that $a$. But $\\exists x\\,\\text{Glows}(x)\\wedge\\neg\\text{Glows}(a)$ is consistent (merely false when $a$ glows) for every name $a$. Since no name yields a contradiction, the word names no individual; it says $\\exists x\\,\\text{Glows}(x)$ — the property of glowing is instantiated.",
        hint: "Contrast it with the genuinely contradictory 'a glows but a does not glow.'",
      },
      {
        topicSlug: "u2-wrong-way-grammatical-surface",
        prompt:
          "A logician proposes that 'somebody is cheering' is ambiguous among 'Ana is cheering', 'Ben is cheering', etc. Show this proposal makes a true, consistent sentence come out self-contradictory, and say what follows.",
        correctAnswer:
          "If 'somebody is cheering' meant 'Ana is cheering', then 'somebody is cheering but Ana is not' would mean 'Ana is cheering but Ana is not' — a contradiction. But it is consistent, so the word is not ambiguous among names.",
        explanation:
          "On the ambiguity proposal the sentence is sometimes synonymous with $\\text{Cheers}(\\text{Ana})$, making $\\exists$-style 'somebody cheers but Ana does not' collapse into $\\text{Cheers}(\\text{Ana})\\wedge\\neg\\text{Cheers}(\\text{Ana})$. Since that conjunction is never actually self-contradictory (only false when Ana cheers), the word is not ambiguous among names; it expresses $\\exists x\\,\\text{Cheers}(x)$.",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "Regiment 'someone is awake' as an instantiation claim, and write 'someone is awake but Dana is not' to demonstrate it is consistent.",
        correctAnswer:
          "∃x Awake(x); ∃x Awake(x) ∧ ¬Awake(Dana)",
        explanation:
          "'Someone is awake' says the property of being awake is instantiated: $\\exists x\\,\\text{Awake}(x)$. The conjunction $\\exists x\\,\\text{Awake}(x)\\wedge\\neg\\text{Awake}(\\text{Dana})$ is consistent — true whenever someone other than Dana is awake — which is exactly why the existential names no particular individual.",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "A reasoner concludes that because 'nobody passed the exam' is true, some 'un-person' must have failed to pass. Diagnose precisely where the reasoning goes wrong and give the correct analysis.",
        correctAnswer:
          "Wrong step: treating the grammatical subject 'nobody' as a referring name and aligning meaning with 'Sam passed the exam'. Correct: ¬∃x Passed(x) — the property of passing is uninstantiated.",
        explanation:
          "The reasoner reads logical form off grammatical form, modeling the sentence on $\\text{Passed}(\\text{Sam})$ and so inventing an un-person. But if any such thing failed to pass, the sentence would still need to be about real people; its actual content is $\\neg\\exists x\\,\\text{Passed}(x)$, attributing the property *being uninstantiated* to the property *passing the exam*.",
        hint: "If an 'un-person' really passed, would the sentence be true or false?",
      },
    ],
  },

  // ───────────── Unit 2 Test ─────────────
  {
    kind: "test",
    title: "Unit 2 Test — Logical form vs. grammatical form",
    weekNumber: 2,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed. 30 minutes. Math keyboard available; pasting is disabled. Apply the analysis to new sentences and inferences; give compact symbolic answers with brief justification.",
    problems: [
      {
        topicSlug: "u2-logical-vs-grammatical-form",
        prompt:
          "Regiment 'no even number is odd' into logical form and give the equivalent set-disjointness statement.",
        correctAnswer:
          "¬∃x (Even(x) ∧ Odd(x)); { x : Even(x) } ∩ { x : Odd(x) } = ∅",
        explanation:
          "The sentence is not about a special object but about two properties: $\\neg\\exists x\\,(\\text{Even}(x)\\wedge\\text{Odd}(x))$ says the property of being even-and-odd is uninstantiated, equivalently $\\{x:\\text{Even}(x)\\}\\cap\\{x:\\text{Odd}(x)\\}=\\varnothing$ — the two are not coinstantiated.",
      },
      {
        topicSlug: "u2-logical-vs-grammatical-form",
        prompt:
          "A writer argues: 'There are no ghosts in the attic' is true, so the attic contains some insubstantial non-thing that is a ghost. State the correct logical form and name the mistake.",
        correctAnswer:
          "Mistake: positing a non-entity by reading grammar as logic. Correct form: ¬∃x (Ghost(x) ∧ InAttic(x))",
        explanation:
          "If any ghost were in the attic, the sentence would be false, so positing one defeats the claim it is meant to preserve. Its logical form $\\neg\\exists x\\,(\\text{Ghost}(x)\\wedge\\text{InAttic}(x))$ says the property of being an attic-ghost is uninstantiated — no insubstantial 'non-thing' is invoked.",
        hint: "Whatever you posit, if it is a ghost in the attic the sentence is false.",
      },
      {
        topicSlug: "u2-wrong-way-grammatical-surface",
        prompt:
          "Show, using the consistency test with an arbitrary name b, that the subject of 'something is broken' does not refer to any individual.",
        correctAnswer:
          "∃x Broken(x); for every name b, ∃x Broken(x) ∧ ¬Broken(b) is consistent, so no name is referred to",
        explanation:
          "Were the subject a name $b$, 'something is broken but $b$ is not' would be self-contradictory for that $b$. But $\\exists x\\,\\text{Broken}(x)\\wedge\\neg\\text{Broken}(b)$ is consistent for every $b$ (only false, never contradictory), so the subject refers to no individual; it asserts $\\exists x\\,\\text{Broken}(x)$.",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "Regiment 'everyone is silent' and 'someone is silent', and state in symbols why the two cannot be synonymous (so a quantifier-word cannot just mean 'everyone').",
        correctAnswer:
          "Someone: ∃x Silent(x); Everyone: ∀x Silent(x); ∀x Silent(x) → ∃x Silent(x) but not conversely, so they differ in meaning",
        explanation:
          "If a 'someone'-word meant 'everyone', the two sentences would be synonymous; but $\\exists x\\,\\text{Silent}(x)$ and $\\forall x\\,\\text{Silent}(x)$ are not equivalent — the universal entails the existential while the existential does not entail the universal. Distinct truth-conditions show the existential cannot mean 'everyone.'",
      },
      {
        topicSlug: "u2-right-way-grammatical-surface",
        prompt:
          "Rewrite 'nothing rusts' so that its logical subject is a property, identify which grammatical part of the original became the new subject, and give the symbolic form.",
        correctAnswer:
          "'The property of rusting is uninstantiated'; original predicate 'rusts' → new subject; form: ¬∃x Rusts(x)",
        explanation:
          "Logical and grammatical form invert: the surface predicate 'rusts' supplies the real subject (the property of rusting) and the surface subject 'nothing' supplies the real predicate ('is uninstantiated'). So $\\neg\\exists x\\,\\text{Rusts}(x)$ attributes uninstantiatedness to the property of rusting, not rusting to an un-thing.",
        hint: "The grammatical predicate names the property; the grammatical subject names what is said of it.",
      },
    ],
  },
];

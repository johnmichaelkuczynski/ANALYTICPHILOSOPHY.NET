import { db } from "@workspace/db";
import {
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";

type SeedTopic = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  body: string;
};

const TOPICS: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 1 — Analytic Philosophy as Logical Analysis
  // ───────────────────────────────────────────────────────────────
  {
    slug: "philosophy-analysis-categories",
    title: "Philosophy as the analysis of categories",
    weekNumber: 1,
    blurb: "Philosophy delineates the structures of the categories through which we think.",
    lectureTitle: "1.1 Philosophy as analysis of categories",
    body: `# Philosophy as the analysis of categories

We never grasp the world raw. We grasp it through **categories** — *person, statement, fact, event, cause, time, mind, belief, knowledge, truth, value, law, existence, impossibility*. Whatever we know, we know it under one of these headings.

The thesis of this course is that **philosophy is the discipline that delineates the structures of the categories in terms of which we think about the world.** That is its sole function. It does not add new facts about rocks or planets; it makes explicit the conditions a thing must satisfy to count as a cause, a proof, a person, an existent.

## The canonical form of a categorial claim

Every basic claim that places a thing under a category has the same logical skeleton: it says of an object $x$ that it has a property $\\varphi$ — symbolically, $\\varphi(x)$. "Smith is a person" is $\\text{Person}(\\text{Smith})$; "that event is a cause of this one" attributes the relational property of causing. Philosophy's job is to say what the predicate $\\varphi$ *amounts to*.

## An example

We are superb at telling linguistic behavior from non-linguistic behavior — we know at a glance who speaks a language and who does not. So *implicitly* we know the conditions a creature's behavior must meet to embody knowledge of a language. Yet asked to state those conditions, we manage only "with great difficulty and partial success." We are excellent at *using* the category and almost helpless at *describing* it. Closing that gap — between fluent use and explicit structure — is the whole of philosophy.`,
  },
  {
    slug: "knowledge-metaknowledge",
    title: "Knowledge vs. meta-knowledge",
    weekNumber: 1,
    blurb: "Philosophy is knowledge about knowledge, not knowledge of new facts.",
    lectureTitle: "1.2 Knowledge vs. meta-knowledge",
    body: `# Knowledge vs. meta-knowledge

Although we cannot think without our categories, they are seldom themselves the *objects* of thought. We are adept at using them and yet know little about them. Self-understanding is not the mind's primary function — indeed a mind that thought about nothing but itself would be incoherent. So any self-understanding is *derivative* of, and harder-won than, ordinary outward-directed understanding.

## Meta-knowledge

Philosophical knowledge is **meta-knowledge**: knowledge *about* knowledge. Writing $K(a, p)$ for "$a$ knows that $p$", the non-philosopher pursues first-order knowledge $K(a, p)$ — what happened, when, what it caused. The philosopher pursues the second-order question $K(a, K(a, p))$: what is it that one *knows in knowing* that one thing caused another? What conditions must a belief satisfy to be knowledge at all?

## An example

We know, with total confidence, that rape is immoral and that anonymous charity is good. So at some level we know the principles dividing moral from immoral acts. But asked to *state* those principles, we produce theories that distort the very judgments they were meant to capture. The first-order knowledge ("that act was wrong") is secure; the meta-knowledge ("here is what wrongness *is*") is elusive. Philosophy lives in that second layer.`,
  },
  {
    slug: "philosophy-other-disciplines",
    title: "Philosophy and the other disciplines",
    weekNumber: 1,
    blurb: "The philosopher studies the laws the laws cannot break.",
    lectureTitle: "1.3 Philosophy and the other disciplines",
    body: `# Philosophy and the other disciplines

The stranded motorist wants his car to run. The engineer wants the laws of physics only so far as they let him build a working mechanism. The physicist wants mechanisms only so far as they reveal the laws. **The philosopher is to the physicist what the physicist is to the engineer.** He wants to know what causes what only so far as it tells him *what it is for one thing to cause another.*

Frege put it sharply: logic studies not the laws of nature but "the laws of the laws of nature." The philosopher seeks the laws the laws themselves cannot break.

## Actuality vs. necessity

Writing $\\Box p$ for "necessarily $p$" and plain $p$ for "$p$ is actually the case", the scientist is in the business of $p$ — what in fact holds. The philosopher is in the business of $\\Box p$ — what it would even *make sense* to claim could hold. His interest in the actual is always subordinate to his interest in the possible and the necessary.

## An example

A NASA engineer may know far more physics than a theoretical physicist — yet he is still an engineer, because his interest in physical law is governed by his interest in building. Whether you are an engineer or a physicist is fixed not by how much you know but by *what your knowledge is for.* Philosophy sits one rung higher again: its quarry is the structure of the knowing itself.`,
  },
  {
    slug: "analytic-vs-nonanalytic",
    title: "Analytic vs. non-analytic philosophy",
    weekNumber: 1,
    blurb: "Analytic philosophy figures out what could be by analyzing what can be said.",
    lectureTitle: "1.4 Analytic vs. non-analytic philosophy",
    body: `# Analytic vs. non-analytic philosophy

Michael Dummett defined analytic philosophy as **post-Fregean philosophy**. What does that mean?

Pre-Fregean philosophers thought they were doing a very general kind of botany: describing the most general features of the actual world, differing from the scientist only in generality. Frege showed this is backwards. The scientist cares about the possible only so far as it illuminates the actual. With the philosopher it is reversed: any interest in the actual is subordinate to an interest in the **possible**.

## Sense and possibility

Analytic philosophers chart what *could* be by analyzing statements. A statement that makes sense is one that *can* be true; a statement that makes no sense is one that *cannot*. So, writing $\\Diamond$ for "possibly":

$$\\text{MakesSense}(S) \\;\\leftrightarrow\\; \\Diamond\\,\\text{True}(S).$$

Statements that make sense describe possible realities; statements that don't, don't. Survey the space of coherent statements and you have surveyed the space of genuine possibilities — without leaving your chair.

## An example

A botanist's interest in plants that *might* exist is wholly in service of cataloguing the plants that *do*. The analytic philosopher inverts this: he interrogates "could there be a round square?", "could a machine think?", "could there be a private language?" — and answers by asking whether the corresponding sentences are coherent. The method is conceptual, not empirical.`,
  },
  {
    slug: "frege-logical-grammatical-form",
    title: "Frege's insight: logical vs. grammatical form",
    weekNumber: 1,
    blurb: "Grammar misleads; 'nothing is a square circle' is not about a non-thing.",
    lectureTitle: "1.5 Frege's insight: logical vs. grammatical form",
    body: `# Frege's insight: logical vs. grammatical form

Frege's legacy can be summed up as a warning. *When an obviously correct belief seems to have an absurd consequence, ask whether the absurdity really follows — instead of swallowing it and inventing weird entities to make it work.*

## The square circle

Consider:

$$(\\text{SC})\\quad \\text{nothing is a square circle.}$$

SC is plainly true. But its **grammar** mirrors "Smith is a capable lawyer," which attributes a property to an individual. Read that way, SC says *some* featureless non-entity is a square circle — which is doubly absurd (if anything were a square circle, SC would be false; and "non-entity" is incoherent).

We cannot accept the absurdity, and we cannot reject SC. The way out is to see that SC's **logical form** diverges from its grammatical form. "Nobody likes Larry" does not name an un-person who likes Larry; it says the set of Larry-likers is empty. Likewise SC says:

$$\\neg \\exists x\\,(\\text{Square}(x) \\wedge \\text{Circle}(x)),$$

equivalently that the property of being a square circle is **uninstantiated**, or that the set of squares and the set of circles do not overlap: $\\{x : \\text{Square}(x)\\} \\cap \\{x : \\text{Circle}(x)\\} = \\varnothing$. No non-entity required.

## An example

"No person is over twenty feet tall" looks like it attributes a height to some un-person. Its real form is $\\neg\\exists x\\,(\\text{Person}(x) \\wedge \\text{Over20}(x))$ — a property (being a person over twenty feet tall) is said to lack instances. Philosophical insight here comes not from positing entities but from **clarifying statements.**`,
  },
  {
    slug: "quantifiers-someone-puzzle",
    title: "Quantifiers and the \"someone\" puzzle",
    weekNumber: 1,
    blurb: "\"Someone smokes\" names no one; it says a property is instantiated.",
    lectureTitle: "1.6 Quantifiers and the \"someone\" puzzle",
    body: `# Quantifiers and the "someone" puzzle

"John smokes" attributes smoking to John: $\\text{Smokes}(\\text{John})$. By grammatical analogy, "**someone** smokes" looks like it should attribute smoking to some individual named by "someone." But *which* individual?

## Why "someone" names nobody

It does not pick out an "ambiguous person" — words are ambiguous, people are not. And it is not itself ambiguous between John, Mary, …, for then "someone smokes but John does not" would *sometimes* mean "John smokes but John does not," and so be self-contradictory. It never is: if John smokes it is merely false, not contradictory. For **every** individual $N$, "someone smokes but $N$ does not" is consistent. Therefore "someone" refers to no individual at all.

## Frege's solution

"Someone smokes" makes a statement not about a person but about a **property** — and says of that property that it is *instantiated*:

$$(\\text{SS})\\quad \\exists x\\,\\text{Smokes}(x).$$

"Someone smokes but Smith does not" is then $\\exists x\\,\\text{Smokes}(x) \\wedge \\neg\\,\\text{Smokes}(\\text{Smith})$ — manifestly consistent, exactly as it should be.

## An example

If Smith smokes, "someone smokes but Smith does not" is false but not self-contradictory — unlike "Smith smokes but Smith does not smoke." That single observation, that no name can be substituted to force a contradiction, is the whole proof that quantifier-words belong to a different logical category from names. Grammar hid this; logic reveals it.`,
  },
  {
    slug: "existence-claims-instantiation",
    title: "Existence-claims and instantiation",
    weekNumber: 1,
    blurb: "To exist is for a property to have an instance.",
    lectureTitle: "1.7 Existence-claims and instantiation",
    body: `# Existence-claims and instantiation

An **existence-claim** is any claim that some property is instantiated. "There are prime numbers" says the property *being prime* has at least one instance: $\\exists x\\,\\text{Prime}(x)$. Anything with the requisite property **satisfies** the claim; the number two *uniquely* satisfies "there is an even prime."

## Instantiated and uninstantiated

For a property $F$ to be **instantiated** is for there to be something that has it:

$$\\text{Instantiated}(F) \\;\\equiv\\; \\exists x\\,F(x).$$

For $F$ to be **uninstantiated** is for nothing to have it:

$$\\neg\\exists x\\,F(x) \\;\\equiv\\; \\forall x\\,\\neg F(x).$$

"Nobody has run a three-minute mile" does not attribute a feat to an un-person; it says the property *being a person who has run a three-minute mile* is uninstantiated. "Nothing smokes" says $\\neg\\exists x\\,\\text{Smokes}(x)$ — the property of smoking has no instances.

## An example

This reverses subject and predicate. The grammatical subject of "nobody has run a three-minute mile" is "nobody"; the predicate is "has run a three-minute mile." But the *logical* subject is the property *being a three-minute-miler*, and the logical predicate is *is uninstantiated*. Get the right result by **analysis**; get the wrong result — a ghostly un-runner — by para-science. Existence, properly understood, is a property of properties: the property of having an instance.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 2 — Analysis, Ontology, and Meaning
  // ───────────────────────────────────────────────────────────────
  {
    slug: "analysis-vs-ontologizing",
    title: "Analysis vs. ontologizing",
    weekNumber: 2,
    blurb: "Explain by clarifying statements, not by positing entities.",
    lectureTitle: "2.1 Analysis vs. ontologizing",
    body: `# Analysis vs. ontologizing

A philosopher's **ontology** is his set of beliefs about what exists. Analytic philosophers are ontologically *conservative*: they grant existence only to what cannot be denied. To **ontologize** is to solve a problem by positing a new entity. Analytic philosophers solve problems by **analyzing statements** instead.

## Science posits; philosophy clarifies

Science explains by positing unobserved entities (protons, antibodies) that, if real, would account for what we observe. It was long assumed philosophy worked the same way. It does not. To make a philosophical discovery is **not** to find a new entity but to make explicit a previously unnoticed implication of a belief we already hold. Philosophy is *explication.*

"No person is over twenty feet tall" tempted pre-Fregeans into postulating a twenty-foot un-person. Frege's analysis dispenses with it: $\\neg\\exists x\\,(\\text{Person}(x) \\wedge \\text{Over20}(x))$ — a property is said to lack instances.

## When ontology is unavoidable

Sometimes analysis itself forces an existence-claim. From "Bob and Sally are both intelligent" it follows that there is a property they share — so properties exist. But you never bump into intelligence *per se*; it has no spatiotemporal location. So the few entities analysis compels us to accept are always **abstract**, never rocks or monsters.

## An example

You can encounter many intelligent people but never *intelligence*. The inference "Bob and Sally are both intelligent, so they share a property" is airtight, and its conclusion is a non-spatiotemporal object. That is principled ontology — forced by an undeniable inference — as opposed to the reckless ontologizing of the next lecture.`,
  },
  {
    slug: "brentano-meinong-nonexistent",
    title: "Brentano, Meinong, and non-existent objects",
    weekNumber: 2,
    blurb: "The non-analytic method epitomized: inventing entities to plug a gap.",
    lectureTitle: "2.2 Brentano, Meinong, and non-existent objects",
    body: `# Brentano, Meinong, and non-existent objects

Brentano held that the mark of the mental is **intentionality** — being representational. A mental state always represents something. But a hallucination of a pink elephant represents... what? There are no pink elephants. So what is the hallucination *about*?

## Brentano's wrong turn

Wishing to keep "every mental state has an object," Brentano said the hallucination has a **non-existent pink elephant** for its object. That is incoherent — it amounts to "there exists an elephant $x$ such that $x$ does not exist":

$$\\exists x\\,(\\text{PinkElephant}(x) \\wedge \\neg\\,\\text{Exists}(x)).$$

He multiplied terms — "inexistent," "un-existent" — and his pupil **Meinong** added "subsistent" entities that neither quite exist nor quite fail to. Pure ontologizing where analysis was needed.

## The Fregean cure

Perception and thought have **propositions** for their contents, not objects for their targets. A hallucination of an $F$ simply tokens a *false existence-claim*: its content is $\\exists x\\,F(x)$, which happens to be false ($\\neg\\exists x\\,F(x)$). No ghostly object is its "object." To say a thought has a "non-existent object" means, so far as it means anything, that its content is an existence-claim nothing satisfies.

## An example

Thinking about an even prime greater than two does not lock your mind onto an impossible number. You are entertaining the false claim $\\exists n\\,(\\text{Even}(n) \\wedge \\text{Prime}(n) \\wedge n > 2)$. Bart Simpson, Zeus, the Fountain of Youth — all dissolve the same way. Analyzed correctly, hallucinations need non-existent existents no more than accurate perceptions do.`,
  },
  {
    slug: "perception-as-description",
    title: "Perception as description",
    weekNumber: 2,
    blurb: "Seeing Larry is encoding an existence-claim that Larry satisfies.",
    lectureTitle: "2.3 Perception as description",
    body: `# Perception as description

When you look at the elephant Larry, you do not receive Larry packaged as a single simple symbol the way the *name* "Larry" packages him in a sentence. You see a thing **having properties** — a certain shape, color, size, position relative to you.

## Perception encodes an existence-claim

So seeing Larry is seeing that certain properties are *instantiated, right there.* The content of your perception is an existence-claim:

$$\\exists x\\,\\big(\\text{Here}(x) \\wedge \\text{Shape}_1(x) \\wedge \\text{Color}_2(x) \\wedge \\cdots\\big).$$

Larry is the **object** of the perception because he, uniquely, satisfies this claim. The perception represents him not by naming him but by encoding a description he fits.

## Why hallucinations are still representational

A hallucination experientially identical to that perception encodes the *same* existence-claim — but now nothing satisfies it, so the claim is false. The hallucination is representational not because there is some thing it picks out, but because it **delivers a message** (a false one) about how the world is. A "veridical" perception is just one whose existence-claim is true.

## An example

Yesterday's true perception and today's matching hallucination carry the same descriptive content; they differ only in truth-value, exactly as "there is a ten-foot man here" can be uttered truly or falsely without conjuring a ten-foot man. Perception is description first, contact second — which is precisely why it can mislead.`,
  },
  {
    slug: "empirical-vs-philosophical-puzzles",
    title: "Empirical vs. philosophical puzzles",
    weekNumber: 2,
    blurb: "Science waits for data; philosophy untangles confusion.",
    lectureTitle: "2.4 Empirical vs. philosophical puzzles",
    body: `# Empirical vs. philosophical puzzles

Some puzzles come from **missing facts**. My valuables vanish; I am baffled; I learn Larry has been sneaking in; the puzzle dissolves. Scientific puzzles are mostly like this — though the great breakthroughs add a conceptual component: modelling already-available data in a new way.

Relativity illustrates both halves. The strange fact that no one can detect changes in his *own* velocity relative to a light beam was established by 1879. Nobody could explain it until Einstein in 1905 — and Einstein cited **no new data**. His leap was conceptual. Still, relativity is empirical: the 1879 fact had to be gathered first.

## Philosophical puzzles are purely conceptual

Philosophical puzzles have **no factual component**. They come not from ignorance but from **confusion** — from failing to draw the right inferences. Frege solved a raft of them by seeing that "nothing smokes" means $\\neg\\exists x\\,\\text{Smokes}(x)$, with no new empirical information whatsoever.

## Consistency is a non-observational relation

A central reason: observation cannot tell you whether one statement is *consistent* with another. Writing consistency as $\\Diamond(S_1 \\wedge S_2)$ and inconsistency as $\\neg\\Diamond(S_1 \\wedge S_2) \\equiv \\Box\\,\\neg(S_1 \\wedge S_2)$, these are modal facts no experiment reports. Philosophy trades in them.

## An example

Anyone who understands "nothing smokes" already has everything needed to see what it means; Frege needed no laboratory. Einstein, by contrast, was modelling facts a layperson never encounters. That is the line between the two kinds of puzzle.`,
  },
  {
    slug: "sentences-vs-propositions",
    title: "Sentences vs. propositions",
    weekNumber: 2,
    blurb: "The sentence is the vehicle; the proposition is the meaning.",
    lectureTitle: "2.5 Sentences vs. propositions",
    body: `# Sentences vs. propositions

A **sentence** is a string of marks or sounds. A **proposition** is what a meaningful sentence *means* — its content, the thing that is true or false. Write $\\llbracket S \\rrbracket$ for the proposition a sentence $S$ expresses.

## Why the distinction is forced on us

"Snow is white" and "der Schnee ist weiss" are different sentences with the same content. They are synonyms precisely when they express the same proposition:

$$\\text{Synonymous}(S_1, S_2) \\;\\leftrightarrow\\; \\llbracket S_1 \\rrbracket = \\llbracket S_2 \\rrbracket.$$

Translation, ambiguity, and synonymy are unintelligible unless meanings are something *over and above* the sentences that carry them.

## What propositions are not

A proposition is not a fact: "JMK owns a hundred yachts" is meaningful even though there is no such fact, so its meaning cannot *be* that (non-existent) fact. Nor are propositions mental events — the proposition that snow is white will outlast every mind that ever entertained it, and is not located in anyone's head. Nor are they "ideas in a collective mind." Propositions are abstract, non-spatiotemporal objects.

## An example

Two people who both understand a sentence can still grasp it through different *descriptions* — "the third U.S. President" and "the author of the Louisiana Purchase" pick out one man by different routes. So a single sentence can convey different propositions to different competent hearers, depending on how each accesses its meaning. The sentence is public; the proposition is what it points to.`,
  },
  {
    slug: "propositions-properties-truth",
    title: "Propositions as properties; truth as instantiatedness",
    weekNumber: 2,
    blurb: "A proposition is a property of the world; it is true iff instantiated.",
    lectureTitle: "2.6 Propositions as properties; truth as instantiatedness",
    body: `# Propositions as properties; truth as instantiatedness

Here is a unifying proposal. A **proposition is a property** — a way the world might be. The proposition *that snow is white* is the property a world has just in case its snow is white.

## Truth = instantiatedness

On this view, a proposition is **true** exactly when that property is **instantiated** — when the world actually has it:

$$\\text{True}(P) \\;\\leftrightarrow\\; \\text{Instantiated}(P).$$

This is the same machinery as Lecture 1.7, lifted from ordinary properties to world-properties. "Snow is white" is true iff the property *being a world in which snow is white* has an instance — namely, the actual world. Truth is not a mysterious extra relation; it is having-an-instance, one level up.

## Why this is conservative

It posits nothing spatiotemporal. Properties already had to exist (Lecture 2.1); propositions turn out to be a species of them. So we explain truth, falsity, and the bearers of truth-value with the abstract objects we were already committed to — no facts as a separate category, no Meinongian objects.

## An example

Falsity falls out cleanly: a false proposition is an *uninstantiated* world-property. "The moon is made of cheese" is the property no world (none that is actual) instantiates — $\\neg\\,\\text{Instantiated}(P)$. Truth and falsity become instantiated and uninstantiated, the very distinction with which the course began.`,
  },
  {
    slug: "meaning-is-not-use",
    title: "Meaning is not use",
    weekNumber: 2,
    blurb: "Why the slogan \"meaning is use\" collapses under its own weight.",
    lectureTitle: "2.7 Meaning is not use",
    body: `# Meaning is not use

The most famous slogan of the later Wittgenstein — and of conceptual-role semantics after him — is that **meaning is use**: two sentences mean the same iff they are *used* the same way, and there are no meanings over and above patterns of use. Symbolically the thesis is

$$\\llbracket S_1 \\rrbracket = \\llbracket S_2 \\rrbracket \\;\\leftrightarrow\\; \\text{Use}(S_1) = \\text{Use}(S_2),$$

with the right-hand notion meant to *replace* the left.

## Why it fails

First, speakers use sentences *because* they already know what those sentences mean. Anyone who says "it's hot out" (rather than barking random noise) does so because she knows the rules assign a certain proposition to those words and she wishes to express it. Meaning explains use, not the other way round.

Second, a knock-down counterexample. Every natural language contains **infinitely many sentences that have never been used at all**. Two never-used sentences are not used *differently* — so, vacuously, they are "used the same way." The use-theory then declares them **synonymous**. That is absurd: two arbitrary brand-new sentences plainly need not mean the same thing.

## An example

Take any two long sentences nobody has ever uttered — say a description of a particular arrangement of fifty pebbles and a description of a different arrangement. Neither has a "use," so their uses do not differ, so meaning-is-use makes them mean the same. They do not. Hence $\\llbracket S \\rrbracket \\neq \\text{Use}(S)$: meaning is a genuine semantic fact, not a behavioral one.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 3 — The Tractatus and Logical Positivism
  // ───────────────────────────────────────────────────────────────
  {
    slug: "tractatus-philosophy-nonsense",
    title: "The Tractatus: philosophy as nonsense",
    weekNumber: 3,
    blurb: "Wittgenstein's ladder — and why it kicks itself away.",
    lectureTitle: "3.1 The Tractatus: philosophy as nonsense",
    body: `# The Tractatus: philosophy as nonsense

Wittgenstein's *Tractatus Logico-Philosophicus* (TLP) ends with one of the strangest gestures in philosophy. Having argued that the only meaningful statements are tautologies and empirical (natural-scientific) claims —

$$\\text{Meaningful}(S) \\;\\leftrightarrow\\; \\big(\\text{Taut}(S) \\vee \\text{Empirical}(S)\\big)$$

— he notices that **his own book** consists of statements that are neither. By its own criterion, the TLP is nonsense.

## The ladder

Wittgenstein embraces this. His propositions, he says, are *elucidations*: "anyone who understands me eventually recognizes them as nonsensical, when he has used them — as steps — to climb up beyond them. He must throw away the ladder after he has climbed it." The closing line: "What we cannot speak about we must pass over in silence."

## Why the gesture is incoherent

To understand something is to grasp its meaning; so whatever is understood *has* a meaning. If readers understand the TLP's sentences, those sentences mean something — contradicting the claim that the understanding reveals them as meaningless. And "pass over in silence what we cannot speak about" is empty: to be silent about something just *is* to pass it over in silence. The injunction asks us to refrain from doing what is by hypothesis impossible anyway.

## An example

"My propositions are nonsense" is itself either meaningful (and so a counterexample, since you understood it) or meaningless (and so says nothing). Either way the self-application bites. The very act of stating that philosophy is nonsense is a piece of philosophy that means something.`,
  },
  {
    slug: "picture-theory-meaning",
    title: "The picture theory of meaning",
    weekNumber: 3,
    blurb: "Sentences are not pictures: they reach facts only through propositions.",
    lectureTitle: "3.2 The picture theory of meaning",
    body: `# The picture theory of meaning

In the TLP, Wittgenstein claims sentences are **pictures** of the facts they describe, related to those facts by a "law of projection" as a score is related to a symphony. Taken weakly (sentences, like pictures, represent) the claim is trivial. Taken literally (sentences *are* pictures) it is false.

## Sentences go through a proposition; pictures do not

A photograph reaches its fact directly. A sentence reaches a fact only via its **proposition**:

$$S \\;\\longmapsto\\; \\llbracket S \\rrbracket \\;\\longmapsto\\; \\text{fact},\\qquad \\text{True}(S) \\leftrightarrow \\text{obtains}(\\llbracket S \\rrbracket).$$

English does not assign "snow is white" to the *fact* that snow is white — for as far as the rules of English are concerned, snow could be black. It assigns the sentence to a **proposition** which, *if* true, yields that fact. The conventional, proposition-mediated route is utterly unlike a photograph's direct resemblance.

## Sentences are digital; pictures are not

Sentences have a **unique decomposition** into discrete parts — "the cat is on the mat" breaks into "cat," "mat," and so on. A picture of a cat on a mat has no minimal unit answering to the cat; the cat-region contains an ear-region, a leg-region, endlessly. This digital structure is a consequence of the *conventional* component of language, which graphic resemblance wholly lacks.

## An example

Negation has no picture. "The moon is not made of cheese" cannot be drawn: a cheesy moon with a big red **X** is half picture, half *convention* — the X resembles nothing, because the operation of negation is not the sort of thing that could be seen. So far as anything functions as a sentence, it is not functioning as a picture.`,
  },
  {
    slug: "showing-vs-saying",
    title: "Showing vs. saying",
    weekNumber: 3,
    blurb: "\"What can be shown cannot be said\" — and why we can say it after all.",
    lectureTitle: "3.3 Showing vs. saying",
    body: `# Showing vs. saying

A second Tractarian doctrine: logical form can only be **shown**, never **said**. "Propositions show the logical form of reality; they display it... What can be shown, cannot be said." We cannot, Wittgenstein holds, station ourselves outside language to describe how our words latch onto the world; we can only exhibit it.

The thesis, regimented:

$$\\forall x\\,\\big(\\text{Showable}(x) \\to \\neg\\,\\text{Sayable}(x)\\big).$$

## Why it is self-undermining

The sentence "we cannot describe the relation between words and the facts they describe" itself **describes that relation**. It says something about logical form while denying that anything can be said about logical form. The doctrine, applied to itself, forbids its own utterance.

## We do state logical forms — constantly

To identify a statement's logical form *just is* to say clearly what it means, and we do that whenever we put a word's meaning into words. Pointing at the man leaving the limo, I say "that's Mick Jagger" — and thereby *state a semantic rule* ("'Mick Jagger' refers to that man"). The rule self-refers in no vicious way and is perfectly sayable.

## An example

You claim you can do fifty push-ups; I doubt it; you **show** me by doing fifty. The saying and the showing coexist without trouble — flatly contradicting "what can be shown cannot be said." Showing and saying are different acts, not exclusive ones.`,
  },
  {
    slug: "logical-positivism-stated",
    title: "Logical positivism stated",
    weekNumber: 3,
    blurb: "Every meaningful statement is a tautology or empirically confirmable.",
    lectureTitle: "3.4 Logical positivism stated",
    body: `# Logical positivism stated

**Logical Positivism** (LP) was the most influential movement of early-twentieth-century philosophy. Its core is a criterion of meaningfulness:

$$\\text{Meaningful}(S) \\;\\leftrightarrow\\; \\big(\\text{Taut}(S) \\vee \\text{Verifiable}(S)\\big).$$

A statement says something only if it is either (i) a **tautology** — true by convention, empty of factual content — or (ii) **empirically verifiable**, capable of being confirmed by sense-experience. Everything else — metaphysics, theology, "the Absolute is perfect" — is literally *nonsense*: not false, but meaningless.

## The two categories

Mathematics and logic fall under (i): "all bachelors are unmarried," "$7 + 5 = 12$" carry no information about the world, they merely unpack conventions. Physics, chemistry, everyday claims fall under (ii): they earn their meaning by making a difference to possible observation.

## The motivation

LP married Hume's empiricism to Frege's logic. It promised to dissolve millennia of metaphysical dispute at a stroke: if a question cannot be settled by observation or by logic, it is not a real question. The disputes about substance, the soul, the absolute were to be diagnosed as **grammatical illusions**, not deep mysteries.

## An example

"There is an undetectable, causally inert gremlin on your shoulder" is, by LP's lights, meaningless: no observation could ever bear on it, and it is no tautology. The positivists wielded this as a scalpel against whole traditions. The next lectures show the scalpel cuts its own hand.`,
  },
  {
    slug: "verificationism-falsificationism",
    title: "Verificationism and falsificationism",
    weekNumber: 3,
    blurb: "Existential claims resist falsification; universal ones resist verification.",
    lectureTitle: "3.5 Verificationism and falsificationism",
    body: `# Verificationism and falsificationism

LP's criterion came in two flavors. **Verificationism**: a (non-tautologous) statement is meaningful iff it can be *confirmed* by observation. **Falsificationism** (Popper's refinement): a statement is scientific iff it can be *refuted* by observation.

## The asymmetry of the quantifiers

The trouble is that verifiability and falsifiability come apart along the $\\exists/\\forall$ divide.

An **existential** statement $\\exists x\\,P(x)$ ("there is a white raven") can be *verified* — produce the raven — but never conclusively *falsified*: no finite survey rules out one more raven somewhere.

A **universal** statement $\\forall x\\,P(x)$ ("all ravens are black") is the mirror image: it can be *falsified* by a single counterexample but never *verified*, since you cannot inspect every raven, past, present, and future.

$$\\exists x\\,P(x):\\ \\text{verifiable, not falsifiable};\\qquad \\forall x\\,P(x):\\ \\text{falsifiable, not verifiable}.$$

## The squeeze

Scientific laws are universal conditionals ($\\forall x\\,(Fx \\to Gx)$) — so verificationism threatens to render the laws of physics meaningless. Existential claims threaten falsificationism. Neither criterion cleanly separates sense from nonsense; each excludes things it should keep.

## An example

"All copper conducts electricity" can never be verified (infinitely many samples) yet is paradigmatically meaningful science. "Some substance cures all cancers" can never be falsified yet is perfectly intelligible. The very form of scientific law slips between the criteria — the first crack in the positivist program.`,
  },
  {
    slug: "self-refutation-empiricism",
    title: "The self-refutation of empiricism",
    weekNumber: 3,
    blurb: "Empiricism, if true, cannot be known; if it could, it is false.",
    lectureTitle: "3.6 The self-refutation of empiricism",
    body: `# The self-refutation of empiricism

LP is meaningful if true (truth implies meaningfulness). So by its own criterion LP is either a tautology or empirical. It is **not a tautology**: "meaningful statement" is not *by convention* interchangeable with "tautology-or-empirical." So LP must be **empirical** — if it is true at all.

## But LP cannot be empirical

Any attempt to find observational support for a statement already **presupposes that the statement is meaningful**, and hence presupposes an answer to "what makes a statement meaningful?" So that question is not itself empirical. There can be no observational grounds for LP. Therefore LP is neither tautologous nor empirical — a **counterexample to itself**, and so false.

## Empiricism generally

Strong empiricism says $\\forall p\\,(\\text{Knowable}(p) \\to \\text{ObservationBased}(p))$. But observation cannot establish that "$x$ is knowledge" is inconsistent with "$x$ is not observation-based" — consistency is non-observational. So there can be no observational grounds for empiricism. Hence: so far as empiricism is correct there are no grounds for it; so far as there are grounds, it is false. From $E \\to \\neg E$ we infer $\\neg E$.

## An example: Russell on naïve realism

Russell's parallel argument: "We start from naïve realism — grass is green, stones hard. But physics tells us these are effects of objects on us. Naïve realism leads to physics; physics, if true, shows naïve realism false. **Therefore naïve realism, if true, is false; therefore it is false.**" The same self-cancelling shape, $\\text{NR} \\to \\neg\\text{NR} \\;\\vdash\\; \\neg\\text{NR}$, that sinks empiricism.`,
  },
  {
    slug: "brokenness-tautological-truth",
    title: "The brokenness of tautological truth",
    weekNumber: 3,
    blurb: "Tautologousness attaches to utterances, not sentences — so it can't ground necessity.",
    lectureTitle: "3.7 The brokenness of tautological truth",
    body: `# The brokenness of tautological truth

LP rested necessary truth on **convention**: the non-empirical truths are just tautologies, true by how we use words. This lecture shows the very notion of "tautology" is broken — it is a property of *utterances relative to a hearer*, not of sentences.

## The yard story

Smith teaches you "yard" by pointing at an object $L$ and saying "that is one yard." Next day you measure another object $M$ at three feet. You do not yet know how $L$ and $M$ compare. Smith says:

$$(\\text{i})\\quad \\text{"there are three feet in a yard."}$$

For *you*, (i) is **informative, not trivial** — it tells you something you did not know. Had you learned "yard" as "a length of three feet," (i) would have been a tautology. Same sentence; tautologous for one hearer, substantive for another, depending on how each learned the words.

## Logical truth survives; conventional truth does not

Genuine logical truths hold under every interpretation — the law of excluded middle and non-contradiction:

$$\\vDash P \\vee \\neg P, \\qquad \\vDash \\neg(P \\wedge \\neg P).$$

These are not made true by convention; "$P \\vee \\neg P$" is not *stipulated*. So non-empirical truth cannot be identified with conventional/tautological truth — the second leg of LP collapses with the first.

## An example

You learn one word descriptively and "$\\sqrt{2}$ meters" through measurement; whether "this rod is $\\sqrt 2$ m" strikes you as trivial depends entirely on the descriptions through which you fixed the terms. Triviality lives in the route to the meaning, not in the sentence — so it cannot bear the metaphysical weight LP placed on it.`,
  },

  // ───────────────────────────────────────────────────────────────
  // Week 4 — Formal Truth and the Map of Philosophy
  // ───────────────────────────────────────────────────────────────
  {
    slug: "formal-truth-entailment",
    title: "Formal truth and entailment",
    weekNumber: 4,
    blurb: "Entailment is necessitated conditional; not all of it is formal.",
    lectureTitle: "4.1 Formal truth and entailment",
    body: `# Formal truth and entailment

One statement **entails** another when the second cannot be false if the first is true:

$$S_1 \\vDash S_2 \\;\\leftrightarrow\\; \\Box(S_1 \\to S_2).$$

A statement is a **formal truth** if *every* statement of the same form is true. "If Smith is in the barn, then it is not the case that he is not in the barn" is formally true, because every instance of $P \\to \\neg\\neg P$ is true. That is a **formal entailment**.

## Not all entailment is formal

Wittgenstein claimed *all* entailment is formal. But consider:

$$\\text{"Brown is a circle"} \\;\\vDash\\; \\text{"Brown is a two-dimensional figure."}$$

This is genuine entailment, yet "if Brown is a circle, then Brown is two-dimensional" is **not** formally true — it shares its form with the false "if Brown is a circle, then Brown is a cupcake." The bachelor case can be rescued by definition ("bachelor" $=$ "unmarried adult male"), but the circle case cannot: "Brown is a circle" is **not synonymous** with "Brown is a closed planar figure of uniform curvature" — witness that "$x$ is a circle iff $x$ is a circle" is trivial while "$x$ is a circle iff $x$ is a closed planar figure of uniform curvature" is informative.

## An example

"$x$ is a circle $\\leftrightarrow$ $x$ is a closed planar figure of uniform curvature" is **non-tautologous, non-empirical, and true** — its truth is fixed by the structures of the concepts. So there are non-formal entailments and non-formal necessary truths, refuting the Tractarian criterion of meaning.`,
  },
  {
    slug: "open-sentences-interpretations",
    title: "Open-sentences and interpretations",
    weekNumber: 4,
    blurb: "Forms, instances, and truth under all interpretations.",
    lectureTitle: "4.2 Open-sentences and interpretations",
    body: `# Open-sentences and interpretations

An **open-sentence** (statement-form, schema) is a sentence-like expression with a free variable; it is neither true nor false. Replace the variable in "two is even" with $x$ and you get the open-sentence

$$\\text{Even}(x),$$

which says nothing until interpreted.

## Interpretation and instances

To **interpret** an open-sentence is to replace its variables with constants; an **instance** is the resulting genuine sentence. "Two is even" and "five is even" are instances of $\\text{Even}(x)$. An interpretation **validates** the open-sentence when the resulting sentence is true: $\\text{Even}(x)$ is validated by $x = 2$, not by $x = 5$.

## Three kinds of form

Open-sentences split into three classes by their interpretations:

- **Contingent** — true under some interpretations, false under others: $\\text{Even}(x)$.
- **Unsatisfiable** — true under none: $\\text{Even}(x) \\wedge \\neg(2 \\mid x)$.
- **Valid** — true under **all** interpretations: $x = x$, i.e. $\\forall x\\,(x = x)$.

The "true under all its interpretations" talk is a figure of speech — open-sentences are not literally true — but it is the master concept of formal logic, whose aim is to formalize informal analytic truth.

## An example

"Bill is self-identical" is analytic (its negation is incoherent) but **not** formally true: it shares the form $\\varphi(\\text{Bill})$ with the false "Bill is green." Yet it is equivalent to the formal truth "Bill is identical with Bill," an instance of the universally-valid form $x = x$. Formalizing it means finding a schema all of whose instances are true and one of whose instances matches the original.`,
  },
  {
    slug: "limits-strict-empiricism-hempel",
    title: "The limits of strict empiricism (Hempel)",
    weekNumber: 4,
    blurb: "Irrational measurements can't be read off any instrument — yet physics needs them.",
    lectureTitle: "4.3 The limits of strict empiricism (Hempel)",
    body: `# The limits of strict empiricism (Hempel)

Carl Hempel — once a leading positivist — gave a clean proof that **strict empiricism is false.** It turns on measurement and the irrationals.

## The argument

Measurement is comparison against a standard. To fix the ratio of $x$'s length to $y$'s, you find a unit $z$ and count how many $z$-segments divide each. So establishing a ratio by measurement requires a **common measure**. But suppose $x$ has length $1$ and $y$ has length $\\sqrt 2$. Then $x$ and $y$ are **incommensurable**: there is no unit dividing both an integer number of times.

$$\\neg\\,\\exists u\\,\\exists m,n \\in \\mathbb{Z}\\;\\big(x = m\\cdot u \\;\\wedge\\; y = n\\cdot u\\big).$$

So no measurement could ever *establish* that a length is exactly $\\sqrt 2$ units — measurement only ever yields rational comparisons.

## Why this sinks empiricism

The calculus, on which modern physics rests, requires that quantities vary **continuously** — so that velocities, masses, and lengths can take **irrational** values. Physics therefore depends essentially on an assumption (continuous, irrational-valued magnitudes) for which there **cannot** be a strictly observational basis. Since physics manifestly *is* a source of knowledge, strict empiricism — "all knowledge is observation-based" — is false.

## An example

A digital scale reading "$1.732\\,\\text{kg}$" asserts the rational $1732/1000$, never $\\sqrt 2$. Every actual reading is rational; the irrational values physics requires are supplied by **theory**, not by the senses. Knowledge outruns observation.`,
  },
  {
    slug: "no-logically-perfect-language",
    title: "Why there is no logically perfect language",
    weekNumber: 4,
    blurb: "A perspicuous language would be expressively poorer than English.",
    lectureTitle: "4.4 Why no logically perfect language",
    body: `# Why there is no logically perfect language

Call a sentence **perspicuous** when its logical and grammatical forms coincide, and a language **logically perfect** when all its sentences are perspicuous. The TLP assumes such a language is coherent; early analytic philosophers dreamed of replacing English with one. The dream is incoherent.

## In a perfect language, analytic = formal

A sentence is perspicuous only if its grammar alone makes its entailments visible — which requires that **every** sentence of the same form be true. So within a logically perfect language:

$$\\text{Analytic}(S) \\;\\leftrightarrow\\; \\text{FormallyTrue}(S).$$

But we already saw (4.1) that there are analytic truths that are **not** formally true. A perfect language cannot express them. Worse: for every analytic truth it *can* express, there are infinitely many it **cannot** — the informally analytic universal generalizations whose instances it can state but whose general form it cannot certify.

## Recognizing entailments is prior to the formal law

You know "$S_4$: Jerry is in Richmond" entails "$S_5$: it is not the case that Jerry is not in Richmond." You do **not** know this by first knowing that every instance of $P \\to \\neg\\neg P$ is true — for how could you know *that* unless you could already recognize particular cases like $S_4 \\vDash S_5$? Infinitely many informally valid inferences underlie each formal law.

## An example

The schema $P \\to \\neg\\neg P$ is itself learned by seeing concrete instances. A language that could express only the schema, never the open-ended informal generalizations behind it, would be **expressively inferior** to English — the opposite of perfection.`,
  },
  {
    slug: "subdisciplines-philosophy",
    title: "The sub-disciplines of philosophy",
    weekNumber: 4,
    blurb: "A map: mind, language, epistemology, logic, metaphysics, science, ethics, and more.",
    lectureTitle: "4.5 The sub-disciplines of philosophy",
    body: `# The sub-disciplines of philosophy

With the method in hand, here is the territory. Philosophy's main branches all study the structures of categories — each a different family of categories.

- **Philosophy of mind** — *belief, perception, consciousness, thought.* Must one have a language to think? How is mind related to brain?
- **Philosophy of language** — *meaning, reference, synonymy.* What is it for "Smith" to refer to Smith? How do part-meanings make sentence-meanings?
- **Epistemology** — *knowledge, justification, evidence.* What separates knowledge from mere true belief? What can be known?
- **Philosophical logic** — *entailment, possibility, logical form.* What is it for one statement to entail another? Are there kinds of entailment?
- **Metaphysics** — *necessity, possibility, identity, persistence, causation.*
- **Philosophy of science** — *explanation, confirmation, measurement, probability, theory.*
- **Ethics, political philosophy, legal philosophy, philosophy of religion, and formal logic.**

These overlap heavily — "do we think in words?" belongs to mind *and* language at once.

## Analysis is the common method

Each branch proceeds by **analysis**: regimenting its central claims into the canonical form and reading off their structure. "Brown is a bachelor" entails "Brown is unmarried" because, for all $x$,

$$\\forall x\\,\\big(\\text{Bachelor}(x) \\to \\text{Unmarried}(x)\\big).$$

## An example

The single question "can perceptual content be put into words?" is simultaneously a question of mind (what do the senses deliver?), of language (what can sentences encode?), and of epistemology (how does perception justify belief?). One regimented question, three disciplines — which is why the map has so many overlapping borders.`,
  },
  {
    slug: "mind-language-epistemology",
    title: "Mind, language, and epistemology",
    weekNumber: 4,
    blurb: "Intentionality, reference, and the analysis of knowledge.",
    lectureTitle: "4.6 Mind, language, and epistemology",
    body: `# Mind, language, and epistemology

Three core branches, each with a regimentable central concept.

## Mind: intentionality

The mark of the mental is **intentionality** — being *about* something, representational:

$$\\forall x\\,\\big(\\text{Mental}(x) \\to \\text{Representational}(x)\\big).$$

As Lecture 2.2 showed, this is best cashed out via **propositional content**: a mental state carries a proposition, true or false, rather than aiming at an object. That dissolves the puzzle of thoughts "about" the non-existent.

## Language: reference and compositionality

The philosophy of language asks what it is for an expression $E$ to pick out an object $O$ — $\\text{Refers}(E, O)$ — and how the meanings of parts determine the meaning of the whole. Frege's lesson (Week 1) governs here: quantifier-words like "someone" do **not** refer the way names do; they signal instantiation.

## Epistemology: the analysis of knowledge

The classical analysis regiments knowledge as **justified true belief**:

$$K(a, p) \\;\\leftrightarrow\\; \\big(p \\;\\wedge\\; B(a, p) \\;\\wedge\\; J(a, p)\\big).$$

Knowledge requires that $p$ be *true*, that $a$ *believe* it, and that the belief be *justified*. Uncorroborated testimony yields belief, even true belief, but not knowledge — exactly because the justification clause is unmet.

## An example

Believe a proposition on a reliable source's say-so, without knowing the source is reliable, and you have $B(a,p) \\wedge p$ but not $J(a,p)$ — true belief that falls short of knowledge. The JTB schema makes precise why. (Whether it is *sufficient* is the question Gettier later pressed — but the form is the starting point of all modern epistemology.)`,
  },
  {
    slug: "logic-metaphysics-science",
    title: "Logic, metaphysics, and science",
    weekNumber: 4,
    blurb: "Modality, the duality of necessity and possibility, and theory.",
    lectureTitle: "4.7 Logic, metaphysics, and science",
    body: `# Logic, metaphysics, and science

Three more branches, unified by **modality** — the logic of the possible and the necessary.

## Metaphysics: the modal duality

Metaphysics studies possibility, necessity, identity, and causation. Its central pair of concepts are interdefinable:

$$\\Diamond p \\;\\leftrightarrow\\; \\neg\\Box\\neg p, \\qquad \\Box p \\;\\leftrightarrow\\; \\neg\\Diamond\\neg p.$$

"Possibly $p$" means "not necessarily not-$p$"; "necessarily $p$" means "not possibly not-$p$." A central debate: are necessity and possibility properties of *objects* or of *statements*? (This course sides with: properties of statements/propositions.)

## Philosophical logic: entailment again

Recall $S_1 \\vDash S_2 \\leftrightarrow \\Box(S_1 \\to S_2)$. Philosophical logic asks whether inferences about the non-existent ("if Zeus is tall, some god is tall") follow the same principles as inferences about the existent, and whether every statement is determinately true or false.

## Philosophy of science: theory and confirmation

What distinguishes scientific claims from non-scientific ones? What is an explanation? Recall Goodman's **grue**: an emerald examined before a date and green, or after and blue. The same evidence that "confirms" *green* equally "confirms" *grue*, so induction has **no purely observational basis** — it presupposes non-observational knowledge of which properties are projectible.

## An example

"This object's length *could have been* different" ($\\Diamond$) but "$1 + 1 = 2$ *could not have been* otherwise" ($\\Box$). The first is a contingent spatiotemporal fact; the second a necessary, non-spatiotemporal one — and therefore, since nothing outside space-time is causally active, one we cannot have come to know by being *affected* by it. Modality marks the deepest joints in the philosophical map.`,
  },
  {
    slug: "capstone-synthesis",
    title: "Capstone synthesis",
    weekNumber: 4,
    blurb: "One thesis: to be meaningful is to attribute a property to an object.",
    lectureTitle: "4.8 Capstone synthesis",
    body: `# Capstone synthesis

Four weeks, one method. Pull the threads together.

## The master criterion of meaning

Against the positivists, we proposed a single positive account of meaningfulness. Every non-compound sentence either ascribes a property to an object ("Smith is tall") or relates objects — and relational and compound sentences can all be rewritten in the canonical form $\\varphi(x)$ (with ordered pairs, a negation operator, a consequence operator, and a quantifier-operator $E$ on properties). Therefore:

$$\\text{Meaningful}(S) \\;\\leftrightarrow\\; \\exists x\\,\\exists \\varphi\\;\\big(S \\text{ says that } \\varphi(x)\\big).$$

A sentence means something iff it attributes some property to some object. Verifiability is irrelevant. If a sentence ascribes a property to a thing it says something; if it ascribes nothing to nothing it says nothing.

## The arc

1. **Philosophy is the analysis of categories** (Week 1) — meta-knowledge, pursued by analyzing statements, post-Frege.
2. **Analyze, don't ontologize** (Week 2) — quantifiers, instantiation, propositions, truth as instantiatedness, against meaning-as-use and Meinong's objects.
3. **The Tractatus and positivism fail** (Week 3) — the picture theory, showing/saying, and the verification criterion all break, several of them self-refuting.
4. **Formal truth has limits** (Week 4) — entailment outruns formal entailment, no language is logically perfect, strict empiricism is false (Hempel), and the map of philosophy is one method applied to many families of categories.

## An example

Take any sentence the positivists dismissed as meaningless — "the universe is a perfect unity." It is not nonsense; it is a **statement-form** with an undefined term ("perfect unity"), exactly like "$x$ is tall" before $x$ is assigned. Define the term and it becomes true or false. **Read the idea, ground the idea, write the idea** — that is the whole discipline.`,
  },
];

type SeedAssignment = {
  kind: "homework" | "test" | "midterm" | "final";
  title: string;
  weekNumber: number;
  isTimed: boolean;
  timeLimitMinutes: number | null;
  instructions: string;
  problems: Array<{
    topicSlug: string;
    prompt: string;
    correctAnswer: string;
    explanation: string;
    hint?: string;
  }>;
};

const ASSIGNMENTS: SeedAssignment[] = [
  // ───────────── Week 1 ─────────────
  {
    kind: "homework",
    title: "Homework 1.1 — Categories, meta-knowledge, the analytic method",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Short-answer problems on categories, meta-knowledge, philosophy's place among the disciplines, and the analytic method. Use the math keyboard for the logical symbols (∀, ∃, ¬, →, ↔, □, ◇, ∈).",
    problems: [
      {
        topicSlug: "philosophy-analysis-categories",
        prompt:
          "Using predicate notation, write the canonical logical form shared by every basic claim that places an object x under a category (property) φ.",
        correctAnswer: "φ(x)",
        explanation:
          "Every categorial claim has the form $\\varphi(x)$ — it attributes a property $\\varphi$ to an object $x$. Philosophy's task is to make explicit what the predicate $\\varphi$ amounts to.",
      },
      {
        topicSlug: "knowledge-metaknowledge",
        prompt:
          "Using a knowledge operator K, write (a) 'a knows that p' and (b) the meta-knowledge claim 'a knows that a knows that p'.",
        correctAnswer: "(a) K(a, p); (b) K(a, K(a, p))",
        explanation:
          "First-order knowledge is $K(a, p)$; meta-knowledge is knowledge about knowledge, $K(a, K(a, p))$. Philosophy operates at the second, derivative layer.",
      },
      {
        topicSlug: "philosophy-other-disciplines",
        prompt:
          "Using the necessity operator □, write 'p is necessarily the case' and contrast it with 'p is actually the case'. Which is the philosopher's concern?",
        correctAnswer: "□p (necessity) vs. p (actuality); the philosopher studies □p",
        explanation:
          "The scientist studies $p$ (what actually holds); the philosopher studies $\\Box p$ (what must hold / what could even make sense) — 'the laws the laws cannot break.'",
      },
      {
        topicSlug: "analytic-vs-nonanalytic",
        prompt:
          "Using the possibility operator ◇, write the analytic criterion that a statement S makes sense iff S can be true.",
        correctAnswer: "MakesSense(S) ↔ ◇True(S)",
        explanation:
          "$\\text{MakesSense}(S) \\leftrightarrow \\Diamond\\,\\text{True}(S)$. Statements that make sense describe possible realities; analytic philosophy charts the possible by analyzing the sayable.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 1.2 — Frege, quantifiers, instantiation",
    weekNumber: 1,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, set-builder braces, ∩, and ∅.",
    problems: [
      {
        topicSlug: "frege-logical-grammatical-form",
        prompt:
          "Write the logical form of 'nothing is a square circle' using a negated existential, then give the equivalent claim that the squares and circles do not overlap (set notation).",
        correctAnswer:
          "¬∃x (Square(x) ∧ Circle(x)); { x : Square(x) } ∩ { x : Circle(x) } = ∅",
        explanation:
          "$\\neg\\exists x\\,(\\text{Square}(x) \\wedge \\text{Circle}(x))$ — the property of being a square circle is uninstantiated; equivalently the two sets are disjoint. No 'non-entity' is required.",
      },
      {
        topicSlug: "quantifiers-someone-puzzle",
        prompt:
          "Write 'someone smokes' as an existential, and then write 'someone smokes but Smith does not' to show it is consistent (not self-contradictory).",
        correctAnswer:
          "∃x Smokes(x); ∃x Smokes(x) ∧ ¬Smokes(Smith)",
        explanation:
          "$\\exists x\\,\\text{Smokes}(x)$ says the property of smoking is instantiated. $\\exists x\\,\\text{Smokes}(x) \\wedge \\neg\\text{Smokes}(\\text{Smith})$ is consistent — proof that 'someone' names no individual.",
      },
      {
        topicSlug: "existence-claims-instantiation",
        prompt:
          "Using ∃ and ∀, write what it is for a property F to be instantiated, and the two equivalent ways of saying F is uninstantiated.",
        correctAnswer:
          "Instantiated: ∃x F(x). Uninstantiated: ¬∃x F(x) ≡ ∀x ¬F(x)",
        explanation:
          "Instantiation is $\\exists x\\,F(x)$; being uninstantiated is $\\neg\\exists x\\,F(x)$, equivalent to $\\forall x\\,\\neg F(x)$. Existence is a property of properties: having an instance.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 1 Test — Analytic philosophy as logical analysis",
    weekNumber: 1,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed. 30 minutes. Math keyboard available; pasting is disabled. Write answers in compact symbolic form using the on-screen keyboard.",
    problems: [
      {
        topicSlug: "philosophy-analysis-categories",
        prompt:
          "Write the canonical form of a claim attributing a property φ to an object x.",
        correctAnswer: "φ(x)",
        explanation:
          "$\\varphi(x)$ — the skeleton of every basic categorial claim.",
      },
      {
        topicSlug: "frege-logical-grammatical-form",
        prompt:
          "Give the logical form (a negated existential) of 'no person is over twenty feet tall'.",
        correctAnswer: "¬∃x (Person(x) ∧ Over20(x))",
        explanation:
          "$\\neg\\exists x\\,(\\text{Person}(x) \\wedge \\text{Over20}(x))$ — a property is said to lack instances; no twenty-foot 'un-person' is posited.",
      },
      {
        topicSlug: "quantifiers-someone-puzzle",
        prompt:
          "Write 'someone smokes' in symbols and explain in one symbolic line why 'someone smokes but N does not' is consistent for every name N.",
        correctAnswer:
          "∃x Smokes(x); for every name N, ∃x Smokes(x) ∧ ¬Smokes(N) is satisfiable",
        explanation:
          "$\\exists x\\,\\text{Smokes}(x)$ attributes instantiation, not a property to an individual; $\\exists x\\,\\text{Smokes}(x) \\wedge \\neg\\text{Smokes}(N)$ is consistent for any $N$, so 'someone' refers to no one.",
      },
      {
        topicSlug: "existence-claims-instantiation",
        prompt:
          "Using ¬, ∃, ∀, write the two equivalent forms expressing that the property F is uninstantiated.",
        correctAnswer: "¬∃x F(x) ≡ ∀x ¬F(x)",
        explanation:
          "$\\neg\\exists x\\,F(x) \\equiv \\forall x\\,\\neg F(x)$.",
      },
      {
        topicSlug: "analytic-vs-nonanalytic",
        prompt:
          "Write, using ◇, the analytic criterion linking a statement's making sense to its possible truth.",
        correctAnswer: "MakesSense(S) ↔ ◇True(S)",
        explanation:
          "$\\text{MakesSense}(S) \\leftrightarrow \\Diamond\\,\\text{True}(S)$.",
      },
    ],
  },

  // ───────────── Week 2 ─────────────
  {
    kind: "homework",
    title: "Homework 2.1 — Ontology, Brentano & Meinong, perception",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ∃, ∀, ¬, ∧, and predicate notation.",
    problems: [
      {
        topicSlug: "analysis-vs-ontologizing",
        prompt:
          "Write, as a negated existential, the analytic rendering of 'no person is over twenty feet tall' that avoids positing any 'un-person'.",
        correctAnswer: "¬∃x (Person(x) ∧ Over20(x))",
        explanation:
          "$\\neg\\exists x\\,(\\text{Person}(x) \\wedge \\text{Over20}(x))$ — analysis dissolves the temptation to ontologize a twenty-foot non-person.",
      },
      {
        topicSlug: "brentano-meinong-nonexistent",
        prompt:
          "Write (a) Meinong/Brentano's incoherent commitment that there is a non-existent object that is F, and (b) the correct Fregean content of a hallucination of an F (a false existence-claim).",
        correctAnswer:
          "(a) ∃x (F(x) ∧ ¬Exists(x)) — incoherent; (b) content = ∃x F(x), which is false (¬∃x F(x))",
        explanation:
          "(a) $\\exists x\\,(F(x) \\wedge \\neg\\text{Exists}(x))$ is incoherent. (b) The hallucination simply tokens the false existence-claim $\\exists x\\,F(x)$; since nothing satisfies it, $\\neg\\exists x\\,F(x)$.",
      },
      {
        topicSlug: "perception-as-description",
        prompt:
          "Write the content of a perception of a thing, here and now, having properties P₁, P₂, … as an existence-claim.",
        correctAnswer: "∃x (Here(x) ∧ P₁(x) ∧ P₂(x) ∧ …)",
        explanation:
          "$\\exists x\\,(\\text{Here}(x) \\wedge P_1(x) \\wedge P_2(x) \\wedge \\cdots)$. Perception is description: it encodes an existence-claim its object uniquely satisfies.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 2.2 — Puzzles, propositions, truth, and meaning",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ◇, □, ¬, ∧, ↔, and the meaning brackets ⟦ ⟧.",
    problems: [
      {
        topicSlug: "empirical-vs-philosophical-puzzles",
        prompt:
          "Using ◇, write what it is for statements S₁ and S₂ to be consistent, and the equivalent forms for their being inconsistent.",
        correctAnswer: "Consistent: ◇(S₁ ∧ S₂). Inconsistent: ¬◇(S₁ ∧ S₂) ≡ □¬(S₁ ∧ S₂)",
        explanation:
          "Consistency $\\Diamond(S_1 \\wedge S_2)$ and inconsistency $\\neg\\Diamond(S_1 \\wedge S_2) \\equiv \\Box\\neg(S_1 \\wedge S_2)$ are modal, non-observational facts — which is why philosophical puzzles are conceptual, not empirical.",
      },
      {
        topicSlug: "sentences-vs-propositions",
        prompt:
          "Using the meaning brackets ⟦ ⟧, write the condition under which two sentences S₁ and S₂ are synonymous.",
        correctAnswer: "Synonymous(S₁, S₂) ↔ ⟦S₁⟧ = ⟦S₂⟧",
        explanation:
          "$\\text{Synonymous}(S_1, S_2) \\leftrightarrow \\llbracket S_1 \\rrbracket = \\llbracket S_2 \\rrbracket$ — sameness of expressed proposition, not sameness of marks.",
      },
      {
        topicSlug: "propositions-properties-truth",
        prompt:
          "Treating a proposition P as a (world-)property, write the analysis of truth as instantiatedness.",
        correctAnswer: "True(P) ↔ Instantiated(P), i.e. True(P) ↔ ∃x P(x)",
        explanation:
          "$\\text{True}(P) \\leftrightarrow \\text{Instantiated}(P)$. Truth is having-an-instance one level up; falsity is being uninstantiated.",
      },
      {
        topicSlug: "meaning-is-not-use",
        prompt:
          "Write the 'meaning is use' thesis as a biconditional, then write the negation that this lecture defends.",
        correctAnswer:
          "Use thesis: ⟦S₁⟧ = ⟦S₂⟧ ↔ Use(S₁) = Use(S₂). Defended: ⟦S⟧ ≠ Use(S)",
        explanation:
          "The use thesis $\\llbracket S_1 \\rrbracket = \\llbracket S_2 \\rrbracket \\leftrightarrow \\text{Use}(S_1) = \\text{Use}(S_2)$ wrongly makes any two never-used sentences synonymous; meaning is a semantic fact, $\\llbracket S \\rrbracket \\neq \\text{Use}(S)$.",
      },
    ],
  },
  {
    kind: "midterm",
    title: "Midterm — Weeks 1 & 2",
    weekNumber: 2,
    isTimed: true,
    timeLimitMinutes: 60,
    instructions:
      "Cumulative midterm on logical analysis and on analysis-vs-ontology. 60 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "frege-logical-grammatical-form",
        prompt:
          "Write the logical form of 'nothing is a square circle' as a negated existential.",
        correctAnswer: "¬∃x (Square(x) ∧ Circle(x))",
        explanation:
          "$\\neg\\exists x\\,(\\text{Square}(x) \\wedge \\text{Circle}(x))$.",
      },
      {
        topicSlug: "quantifiers-someone-puzzle",
        prompt:
          "Write 'someone smokes' in symbols.",
        correctAnswer: "∃x Smokes(x)",
        explanation:
          "$\\exists x\\,\\text{Smokes}(x)$ — the property of smoking is instantiated.",
      },
      {
        topicSlug: "existence-claims-instantiation",
        prompt:
          "Write the two equivalent forms saying that property F is uninstantiated.",
        correctAnswer: "¬∃x F(x) ≡ ∀x ¬F(x)",
        explanation:
          "$\\neg\\exists x\\,F(x) \\equiv \\forall x\\,\\neg F(x)$.",
      },
      {
        topicSlug: "analytic-vs-nonanalytic",
        prompt:
          "Using ◇, write the criterion that S makes sense iff it can be true.",
        correctAnswer: "MakesSense(S) ↔ ◇True(S)",
        explanation:
          "$\\text{MakesSense}(S) \\leftrightarrow \\Diamond\\,\\text{True}(S)$.",
      },
      {
        topicSlug: "brentano-meinong-nonexistent",
        prompt:
          "Write the incoherent Meinongian commitment that there is a non-existent object which is F.",
        correctAnswer: "∃x (F(x) ∧ ¬Exists(x))",
        explanation:
          "$\\exists x\\,(F(x) \\wedge \\neg\\text{Exists}(x))$ — 'there exists something that does not exist' is incoherent.",
      },
      {
        topicSlug: "perception-as-description",
        prompt:
          "Write the content of a perception as an existence-claim about a thing here-and-now having properties P₁, P₂.",
        correctAnswer: "∃x (Here(x) ∧ P₁(x) ∧ P₂(x))",
        explanation:
          "$\\exists x\\,(\\text{Here}(x) \\wedge P_1(x) \\wedge P_2(x))$ — perception encodes a description its object satisfies.",
      },
      {
        topicSlug: "propositions-properties-truth",
        prompt:
          "Write the analysis 'truth is instantiatedness' for a proposition P.",
        correctAnswer: "True(P) ↔ Instantiated(P) (i.e. ∃x P(x))",
        explanation:
          "$\\text{True}(P) \\leftrightarrow \\text{Instantiated}(P)$.",
      },
      {
        topicSlug: "sentences-vs-propositions",
        prompt:
          "Using ⟦ ⟧, write the condition for two sentences to be synonymous.",
        correctAnswer: "⟦S₁⟧ = ⟦S₂⟧",
        explanation:
          "Synonymy is sameness of expressed proposition, $\\llbracket S_1 \\rrbracket = \\llbracket S_2 \\rrbracket$.",
      },
    ],
  },

  // ───────────── Week 3 ─────────────
  {
    kind: "homework",
    title: "Homework 3.1 — The Tractatus, picture theory, showing vs. saying",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ↔, →, ¬, ∨, ∧, ∀, and predicate notation.",
    problems: [
      {
        topicSlug: "tractatus-philosophy-nonsense",
        prompt:
          "Write the Tractarian criterion of meaning that, applied to the Tractatus itself, renders it nonsense.",
        correctAnswer: "Meaningful(S) ↔ (Taut(S) ∨ Empirical(S))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow (\\text{Taut}(S) \\vee \\text{Empirical}(S))$. The TLP's own sentences are neither tautologies nor empirical, so by this criterion they are nonsense — the 'ladder' to throw away.",
      },
      {
        topicSlug: "picture-theory-meaning",
        prompt:
          "Write the truth-condition of a sentence S in terms of its proposition obtaining, showing that a sentence reaches its fact only through a proposition.",
        correctAnswer: "True(S) ↔ obtains(⟦S⟧)",
        explanation:
          "$\\text{True}(S) \\leftrightarrow \\text{obtains}(\\llbracket S \\rrbracket)$. The route $S \\mapsto \\llbracket S \\rrbracket \\mapsto \\text{fact}$ is conventional and proposition-mediated — unlike a picture, which reaches its fact directly.",
      },
      {
        topicSlug: "showing-vs-saying",
        prompt:
          "Write Wittgenstein's thesis 'what can be shown cannot be said' as a universally quantified conditional.",
        correctAnswer: "∀x (Showable(x) → ¬Sayable(x))",
        explanation:
          "$\\forall x\\,(\\text{Showable}(x) \\to \\neg\\text{Sayable}(x))$. The thesis is self-undermining: stating it says something about logical form, which it claims cannot be said.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 3.2 — Positivism, verification, self-refutation, tautology",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ↔, →, ¬, ∨, ∧, ∀, ∃, ⊢, ⊨.",
    problems: [
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "Write the logical positivist verification criterion of meaningfulness.",
        correctAnswer: "Meaningful(S) ↔ (Taut(S) ∨ Verifiable(S))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow (\\text{Taut}(S) \\vee \\text{Verifiable}(S))$ — a statement is meaningful only if it is a tautology or empirically verifiable.",
      },
      {
        topicSlug: "verificationism-falsificationism",
        prompt:
          "State the verifiability/falsifiability status of an existential statement ∃x P(x) versus a universal statement ∀x P(x).",
        correctAnswer:
          "∃x P(x): verifiable, not falsifiable. ∀x P(x): falsifiable, not verifiable.",
        explanation:
          "$\\exists x\\,P(x)$ can be verified (find an instance) but not conclusively falsified; $\\forall x\\,P(x)$ can be falsified (one counterexample) but never verified. Scientific laws are universal, so verificationism threatens them.",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "Write strong empiricism as a quantified claim about knowable p, and then the self-cancelling inference (from E → ¬E, conclude ¬E).",
        correctAnswer:
          "∀p (Knowable(p) → ObservationBased(p)); E → ¬E ⊢ ¬E",
        explanation:
          "$\\forall p\\,(\\text{Knowable}(p) \\to \\text{ObservationBased}(p))$ cannot itself be observation-based, so $E \\to \\neg E$, whence $\\vdash \\neg E$ — the same shape as Russell's argument against naïve realism.",
      },
      {
        topicSlug: "brokenness-tautological-truth",
        prompt:
          "Write, using ⊨, the law of excluded middle and the law of non-contradiction — genuine logical truths that hold under every interpretation.",
        correctAnswer: "⊨ P ∨ ¬P; ⊨ ¬(P ∧ ¬P)",
        explanation:
          "$\\vDash P \\vee \\neg P$ and $\\vDash \\neg(P \\wedge \\neg P)$ are not true by convention, so non-empirical truth cannot be identified with conventional/tautological truth.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 3 Test — The Tractatus and logical positivism",
    weekNumber: 3,
    isTimed: true,
    timeLimitMinutes: 40,
    instructions: "Timed. 40 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "Write the logical positivist criterion of meaningfulness.",
        correctAnswer: "Meaningful(S) ↔ (Taut(S) ∨ Verifiable(S))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow (\\text{Taut}(S) \\vee \\text{Verifiable}(S))$.",
      },
      {
        topicSlug: "verificationism-falsificationism",
        prompt:
          "Give the verifiability/falsifiability profile of ∃x P(x) and of ∀x P(x).",
        correctAnswer:
          "∃x P(x): verifiable, not falsifiable. ∀x P(x): falsifiable, not verifiable.",
        explanation:
          "The existential/universal asymmetry that traps both criteria.",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "Write the self-cancelling inference that empiricism falls to (from E → ¬E).",
        correctAnswer: "E → ¬E ⊢ ¬E",
        explanation:
          "$E \\to \\neg E \\vdash \\neg E$ — empiricism, if true, cannot be (observationally) known; so it is false.",
      },
      {
        topicSlug: "tractatus-philosophy-nonsense",
        prompt:
          "Write the criterion under which the Tractatus declares itself nonsense.",
        correctAnswer: "Meaningful(S) ↔ (Taut(S) ∨ Empirical(S))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow (\\text{Taut}(S) \\vee \\text{Empirical}(S))$.",
      },
      {
        topicSlug: "brokenness-tautological-truth",
        prompt:
          "Using ⊨, write the law of excluded middle and the law of non-contradiction.",
        correctAnswer: "⊨ P ∨ ¬P; ⊨ ¬(P ∧ ¬P)",
        explanation:
          "$\\vDash P \\vee \\neg P$; $\\vDash \\neg(P \\wedge \\neg P)$.",
      },
    ],
  },

  // ───────────── Week 4 ─────────────
  {
    kind: "homework",
    title: "Homework 4.1 — Formal truth, open-sentences, Hempel, perfect language",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ⊨, □, →, ¬, ∀, ∃, =, ∈, ℤ.",
    problems: [
      {
        topicSlug: "formal-truth-entailment",
        prompt:
          "Write the analysis of entailment 'S₁ entails S₂' using □, and give one schema that is a formal truth.",
        correctAnswer: "S₁ ⊨ S₂ ↔ □(S₁ → S₂); formal truth: P → ¬¬P",
        explanation:
          "$S_1 \\vDash S_2 \\leftrightarrow \\Box(S_1 \\to S_2)$. $P \\to \\neg\\neg P$ is formally true (every instance is true). But not all entailment is formal — e.g. 'circle' ⊨ 'two-dimensional'.",
      },
      {
        topicSlug: "open-sentences-interpretations",
        prompt:
          "Write an open-sentence formed from 'two is even', and give a valid open-sentence (true under all interpretations) using identity.",
        correctAnswer: "Open-sentence: Even(x); valid: ∀x (x = x)",
        explanation:
          "Replacing 'two' with a variable gives the open-sentence $\\text{Even}(x)$; $\\forall x\\,(x = x)$ is true under every interpretation (a valid form).",
      },
      {
        topicSlug: "limits-strict-empiricism-hempel",
        prompt:
          "Write the incommensurability condition: there is no common unit dividing both x (length 1) and y (length √2) an integer number of times.",
        correctAnswer: "¬∃u ∃m,n ∈ ℤ (x = m·u ∧ y = n·u)",
        explanation:
          "$\\neg\\exists u\\,\\exists m,n \\in \\mathbb{Z}\\,(x = m\\cdot u \\wedge y = n\\cdot u)$. Hence no measurement can establish an irrational length, yet physics (via calculus) requires them — refuting strict empiricism.",
      },
      {
        topicSlug: "no-logically-perfect-language",
        prompt:
          "Write the identity that would have to hold in a logically perfect language between analyticity and formal truth, and state why it fails.",
        correctAnswer:
          "Analytic(S) ↔ FormallyTrue(S); fails because some analytic truths are not formally true",
        explanation:
          "In a perspicuous language $\\text{Analytic}(S) \\leftrightarrow \\text{FormallyTrue}(S)$. But analytic non-formal truths exist (4.1), so a perfect language would be expressively poorer than English.",
      },
    ],
  },
  {
    kind: "homework",
    title: "Homework 4.2 — The map: mind, language, epistemology, metaphysics",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Use the math keyboard for ↔, →, ∧, ¬, ∀, □, ◇.",
    problems: [
      {
        topicSlug: "subdisciplines-philosophy",
        prompt:
          "Write, as a universally quantified conditional, the analytic entailment 'being a bachelor entails being unmarried'.",
        correctAnswer: "∀x (Bachelor(x) → Unmarried(x))",
        explanation:
          "$\\forall x\\,(\\text{Bachelor}(x) \\to \\text{Unmarried}(x))$. Each sub-discipline proceeds by regimenting its central claims into canonical form and reading off the structure.",
      },
      {
        topicSlug: "mind-language-epistemology",
        prompt:
          "Write the classical 'justified true belief' analysis of 'a knows that p'.",
        correctAnswer: "K(a, p) ↔ (p ∧ B(a, p) ∧ J(a, p))",
        explanation:
          "$K(a, p) \\leftrightarrow (p \\wedge B(a, p) \\wedge J(a, p))$ — knowledge as justified true belief; uncorroborated testimony gives true belief without the justification clause.",
      },
      {
        topicSlug: "logic-metaphysics-science",
        prompt:
          "Write the modal duality relating possibility ◇ and necessity □ (both directions).",
        correctAnswer: "◇p ↔ ¬□¬p; □p ↔ ¬◇¬p",
        explanation:
          "$\\Diamond p \\leftrightarrow \\neg\\Box\\neg p$ and $\\Box p \\leftrightarrow \\neg\\Diamond\\neg p$ — the interdefinability of possibility and necessity at the heart of metaphysics.",
      },
      {
        topicSlug: "capstone-synthesis",
        prompt:
          "Write the course's master criterion of meaningfulness: a sentence is meaningful iff it attributes some property to some object.",
        correctAnswer: "Meaningful(S) ↔ ∃x ∃φ (S says that φ(x))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow \\exists x\\,\\exists \\varphi\\,(S \\text{ says } \\varphi(x))$ — meaning is property-attribution, not verifiability.",
      },
    ],
  },
  {
    kind: "final",
    title: "Final Exam — Analytic philosophy",
    weekNumber: 4,
    isTimed: true,
    timeLimitMinutes: 90,
    instructions:
      "Cumulative final covering all four weeks. 90 minutes. Math keyboard available; pasting disabled.",
    problems: [
      {
        topicSlug: "frege-logical-grammatical-form",
        prompt:
          "Write the logical form of 'nothing is a square circle'.",
        correctAnswer: "¬∃x (Square(x) ∧ Circle(x))",
        explanation:
          "$\\neg\\exists x\\,(\\text{Square}(x) \\wedge \\text{Circle}(x))$.",
      },
      {
        topicSlug: "existence-claims-instantiation",
        prompt:
          "Write what it is for a property F to be instantiated, and the two equivalent forms for uninstantiated.",
        correctAnswer: "∃x F(x); uninstantiated: ¬∃x F(x) ≡ ∀x ¬F(x)",
        explanation:
          "$\\exists x\\,F(x)$; $\\neg\\exists x\\,F(x) \\equiv \\forall x\\,\\neg F(x)$.",
      },
      {
        topicSlug: "brentano-meinong-nonexistent",
        prompt:
          "Write the incoherent Meinongian claim that there is a non-existent F.",
        correctAnswer: "∃x (F(x) ∧ ¬Exists(x))",
        explanation:
          "$\\exists x\\,(F(x) \\wedge \\neg\\text{Exists}(x))$.",
      },
      {
        topicSlug: "propositions-properties-truth",
        prompt:
          "Write the analysis of truth as instantiatedness for a proposition P.",
        correctAnswer: "True(P) ↔ Instantiated(P) (∃x P(x))",
        explanation:
          "$\\text{True}(P) \\leftrightarrow \\text{Instantiated}(P)$.",
      },
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "Write the logical positivist verification criterion of meaning.",
        correctAnswer: "Meaningful(S) ↔ (Taut(S) ∨ Verifiable(S))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow (\\text{Taut}(S) \\vee \\text{Verifiable}(S))$.",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "Write the self-cancelling inference that defeats empiricism.",
        correctAnswer: "E → ¬E ⊢ ¬E",
        explanation:
          "$E \\to \\neg E \\vdash \\neg E$.",
      },
      {
        topicSlug: "formal-truth-entailment",
        prompt:
          "Using □, write the analysis of 'S₁ entails S₂'.",
        correctAnswer: "S₁ ⊨ S₂ ↔ □(S₁ → S₂)",
        explanation:
          "$S_1 \\vDash S_2 \\leftrightarrow \\Box(S_1 \\to S_2)$.",
      },
      {
        topicSlug: "limits-strict-empiricism-hempel",
        prompt:
          "Write the incommensurability condition for x (length 1) and y (length √2).",
        correctAnswer: "¬∃u ∃m,n ∈ ℤ (x = m·u ∧ y = n·u)",
        explanation:
          "$\\neg\\exists u\\,\\exists m,n \\in \\mathbb{Z}\\,(x = m\\cdot u \\wedge y = n\\cdot u)$.",
      },
      {
        topicSlug: "mind-language-epistemology",
        prompt:
          "Write the justified-true-belief analysis of 'a knows that p'.",
        correctAnswer: "K(a, p) ↔ (p ∧ B(a, p) ∧ J(a, p))",
        explanation:
          "$K(a, p) \\leftrightarrow (p \\wedge B(a, p) \\wedge J(a, p))$.",
      },
      {
        topicSlug: "capstone-synthesis",
        prompt:
          "Write the master criterion of meaningfulness defended in the course.",
        correctAnswer: "Meaningful(S) ↔ ∃x ∃φ (S says that φ(x))",
        explanation:
          "$\\text{Meaningful}(S) \\leftrightarrow \\exists x\\,\\exists \\varphi\\,(S \\text{ says } \\varphi(x))$ — meaning is attributing a property to an object.",
      },
    ],
  },
];

// A stable fingerprint of the seed content. If the database holds topics that
// don't match this set, we wipe and re-seed instead of leaving stale content
// from a previous version of the course.
const EXPECTED_TOPIC_SLUGS = TOPICS.map((t) => t.slug).sort().join(",");

// Bump this whenever lecture bodies, assignment problems, or correct answers
// change in a way that should propagate to the database on the next boot.
// The value is stored alongside topics and compared in seedIfEmpty.
const CONTENT_REVISION = "2026-06-07.analytic-philosophy.r1";

// A sentinel phrase present in exactly one lecture body — used to detect that
// the database holds the *current* revision of the content (not just a set of
// matching slugs). Bump whenever the seed content is overhauled.
const REVISION_SENTINEL_SLUG = "philosophy-analysis-categories";
const REVISION_SENTINEL_PHRASE =
  "philosophy is the discipline that delineates the structures of the categories";

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

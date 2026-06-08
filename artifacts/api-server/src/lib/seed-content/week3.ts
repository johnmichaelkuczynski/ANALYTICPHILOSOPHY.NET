import type { SeedTopic, SeedAssignment } from "./types";

export const weekTopics: SeedTopic[] = [
  {
    slug: "tractatus-philosophy-nonsense",
    title: "The Tractatus: philosophy as nonsense",
    weekNumber: 3,
    blurb:
      "Wittgenstein says philosophy is ungrammatical nonsense — but the claim refutes itself, and it confuses two very different kinds of nonsense.",
    lectureTitle: "3.1 The Tractatus: philosophy as nonsense",
    body: `# The Tractatus: philosophy as nonsense

Two sentences open the puzzle. The first — _"one can be aware that one plus one equals two without being causally affected by that fact"_ — seems perfectly meaningful. So does the second — _"there could in principle be a legal system that embodied no morality at all."_ In the _Tractatus Logico-Philosophicus_ (the TLP) Wittgenstein insists this appearance is an illusion.

## The Tractarian thesis

The viewpoint behind his contention can be paraphrased this way: **all philosophical statements are ungrammatical nonsense, and all philosophical problems would vanish if we spoke grammatically.** In Wittgenstein's own words, "all philosophical problems belong to the same class as the question whether the good is more or less identical than the beautiful." So every philosophical statement belongs to the same class as the sentence (BG): _"the good is more or less identical than the beautiful."_

BG is obviously meaningless, and Wittgenstein says the reason is that it is _syntactically ill-formed_. Were the real meanings of our two opening sentences brought into alignment with their grammar, they too would turn out ungrammatical, because in fact they mean nothing. Two extra claims are packed in here. **First**, no sentence that _appears_ to make a philosophical statement means anything. **Second**, the _only_ reason such sentences are meaningless is that they are syntactically ill-formed.

## First objection: ungrammatical can still be meaningful

The sentence (MH) — _"me and Herby play tennis every day, and me always win because Herby not in good shape"_ — is ungrammatical yet perfectly meaningful. Ungrammatical statements are often meaningful. So BG's failure to mean anything cannot be blamed simply on its being ungrammatical.

## The real problem with BG

"More identical than" is _supposed_ to behave like a relational expression — like "more important than" or "identical with" — but it picks out no relation at all. Though built from English words, "more identical than" is no more a part of the English lexicon than "blurga derba gurb." So BG's meaninglessness is on a par with that of _"the beautiful is blurga derba gurb the good."_ The trouble there is that "blurga derba gurb" means nothing. Its syntax may be off, but **its syntactic defects are explained by its lack of meaning, not the reverse.** The same holds of BG.

This is easily verified. Pick any relation you like; if "more identical than" denoted it, BG would be meaningful. Suppose it denoted the relation _being a better dancer than_. Then BG would mean _"the property of goodness is a better dancer than the property of being beautiful."_ That is not meaningless — it is **false**, since no property can dance. And nothing false is meaningless, for to be false is to bear a _false_ meaning.

## Ryle, absurdity, and two kinds of nonsense

Gilbert Ryle held that it cannot meaningfully be said of properties that they can or cannot dance. This is false — properties differ from people precisely in that people _can_ dance and properties cannot — and it is **self-refuting**: in saying that it _cannot be said_ that properties cannot dance, Ryle says exactly the thing his theory forbids saying. Ryle confuses **absurdity** with **meaninglessness**. "Triangles have four sides" is absurd, hence false, hence meaningful; "properties can dance" is likewise absurd-but-meaningful.

So there are **two kinds of nonsense**: a sentence that _has no meaning_ (like "blurga derba gurb"), and a sentence that _has an absurd meaning_ (like "properties can dance"). Neither Ryle nor Wittgenstein distinguishes them — and Wittgenstein's thesis is self-refuting for the same reason as Ryle's: if every philosophical assertion is ungrammatical nonsense, then _that very assertion_ is ungrammatical nonsense and so is not true.

## Why Wittgenstein went wrong

Wittgenstein took his view to distill Frege's successes. Frege showed that re-reading _"nothing is a square circle"_ dissolves an ancient riddle: the sentence does not attribute square-circularity to a non-entity. Wittgenstein inferred that _all_ philosophical problems are solved by such re-reading. The inference is fallacious — from "some are" it does not follow that "all are" — and in any case Frege never showed a problematic sentence to be _ill-formed_; he showed only that its real meaning differs from its apparent form, not that anything was wrong with that meaning. Pre-Fregeans did produce absurdities — for instance, that "nothing is a square circle" entails "there exists some entity that does not exist that is a square circle" — but that is self-contradictory and therefore _meaningful_ (only a meaningful sentence can contradict itself). The closing irony: the claim that philosophical statements are meaningless is itself a philosophical statement, so it is false if true — and therefore false.`,
  },
  {
    slug: "picture-theory-meaning",
    title: "The picture theory of meaning",
    weekNumber: 3,
    blurb:
      "Sentences are not pictures: they reach facts only through propositions, are digital where pictures are analog, and carry image-resistant content like negation.",
    lectureTitle: "3.2 The picture theory of meaning",
    body: `# The picture theory of meaning

One of the TLP's most famous contentions is the **picture theory of meaning**: sentences are _pictures_ of the facts they describe, linked to those facts by a "law of projection" the way a score is linked to a symphony.

## Trivial reading versus literal reading

If Wittgenstein means only that sentences, _like_ pictures, represent facts, the claim is utterly trivial. So if it has any substance, it must mean that sentences literally _are_ pictures. But then it is false. It is only relative to **arbitrary conventions** that "Smith punched Jones" describes the fact that Smith punched Jones; a film or painting of the punch describes it with no such convention. There is, admittedly, a non-conventional component to sentential representation — that a given sentence means what it means is a logical _consequence_ of our conventions — but that very fact shows there is a conventional component too. Graphic resemblance is non-conventional, so the sentence-to-fact relation is fundamentally unlike the picture-to-event relation. **The picture theory is false if taken literally and empty if taken non-literally.**

## Sentences go through a proposition; pictures do not

Wittgenstein's argument runs by analogy: as a law of projection coordinates a score with a symphony, so semantic rules coordinate sentences with realities. The analogy is shallow. Suppose snow turned black. English would not be impaired — it already gives us the resources to say "snow is black." The semantic rules of English do _not_ say that snow is white; they say that _if_ snow is white, one may express that by saying "snow is white." So the rules assign each sentence not to a fact but to a **proposition** which, when true, yields a fact. A sentence depicts a fact by way of having a proposition for its meaning. A photograph never goes through a proposition; it reaches the fact directly. **No picture goes through a proposition.** That alone shows how unlike pictures sentences are.

## Sentences are digital; pictures are analog

Sentences are **digital structures**: they have a unique decomposition into finitely many discrete parts. "The cat is on the mat" breaks into "cat," "mat," and so on. A picture of a cat on a mat has no minimal unit answering to the cat — the cat-region contains an ear-region, which contains still smaller regions, without end. This digital character is a _consequence_ of the conventional component that graphic resemblance lacks.

To see why, imagine turning a photograph of a smiling person into a symbol of a made-up language by stipulating that it means "people are sometimes happy." Even though the photograph is an image, it is **not functioning as an image** insofar as it functions as an expression of that language. (Compare: the character for zero is an empty hole and can be read as a picture of emptiness, but that is not what makes it denote the number before one.) Moreover the photograph does not graphically represent the _general_ fact that people are sometimes happy; it depicts one individual on one occasion, with countless irrelevant details. As an expression of the language its internal structure is irrelevant — it is a **semantic primitive**, with, considered as a symbol, no internal structure at all. And if a lightning-photo meant "it is not the case that," then placing it beside another picture-sentence would yield two pictures side by side, which is not one picture. So **insofar as anything functions as a linguistic expression, it is not functioning as a picture**, and any language necessarily yields symbols with a unique decomposition into discrete parts.

## Negation has no image — and empiricism feels the blow

The picture theory is congenial to **empiricism**, since our sense-perceptions are pictorial (visual, auditory, tactile images). But much that we know cannot be put into any image. Consider _"the moon is not made of cheese."_ What would a picture of _this_ be? A cheesy moon with a big red X through it? The X is not an image; like the word "not" it is a _conventional_ sign of negation, and nothing could physically resemble the operation of negation, which cannot be seen. Besides, a picture of a cheesy moon also fixes a color, a shape, and so on, whereas the sentence says nothing about the moon's color or shape — so **no proposition is identical with any image**, since any image carries information the proposition does not. Hence some knowing is not a matter of an image in the mind. The strict empiricist is then in trouble: my senses tell me, at most, what the moon _is_ made of, not what it is _not_ made of, so getting from "the moon is made of such-and-such" to "the moon is not made of cheese" requires **non-perceptual** knowledge. Even where image-resistant facts are learned through perception, the mediating mental states are not themselves images; pictorial information must be converted into non-pictorial form, and the rules licensing that conversion cannot themselves be learned by perception. **The rules we use to infer from experience cannot be grounded in experience alone.**`,
  },
  {
    slug: "showing-vs-saying",
    title: "Showing vs. saying",
    weekNumber: 3,
    blurb:
      "\"What can be shown cannot be said\" is self-undermining and false — yet one genuine truth survives: no language can state all of its own semantic rules.",
    lectureTitle: "3.3 Showing vs. saying",
    body: `# Showing vs. saying

A second great Tractarian doctrine: logical form can only be **shown**, never **said**. Wittgenstein writes that to represent logical form "we should have to be able to station ourselves with sentences outside logic, that is to say outside the world. Sentences cannot represent logical form: it is mirrored in them... Propositions show the logical form of reality. They display it." His slogan: **"What can be shown, cannot be said."**

## Self-undermining

Wittgenstein is saying that we cannot correctly _describe_ the relation our words bear to the facts they describe. But that point itself _describes that very relation_, calling its own coherence into question. The doctrine, applied to itself, forbids its own utterance.

## We state logical forms all the time

Contrary to Wittgenstein, we _can_ identify the logical forms of our utterances. **To identify the logical form of a statement just is to make clear what it means** — and we do that whenever we put the meaning of a word into words. Pointing at the man stepping out of the limo, I say "that's Mick Jagger," thereby stating the semantic rule that "Mick Jagger" refers to _that man_. The rule does not viciously refer to itself, and it is perfectly sayable. And the slogan is plainly false on its face: you doubt I can do fifty push-ups, so I _say_ "I can do fifty push-ups" and then _show_ you by doing them. Saying and showing are different acts, not mutually exclusive ones.

## The two roots of the doctrine

The picture theory is one root. A picture cannot picture itself, since nothing is a proper part of itself: if a picture depicts a seagull, it cannot contain a picture of the whole picture. So if sentences were pictures, a given sentence could not picture itself. But it does **not** follow that some _other_ picture could not picture it, still less Wittgenstein's far stronger claim that _nothing_ — no picture, no sentence, no set of them — could represent the rules pairing true statements with their facts.

The second root is the **Liar paradox**. The sentence _"what I'm saying is false"_ is true if false and false if true. Wittgenstein seems to have feared that any attempt to state semantic rules would refer to itself in the same paradox-breeding way, and so concluded that such rules cannot be put into words. But this is bad reasoning: "that's Mick Jagger" states a semantic rule with no self-reference at all. From the fact that _some_ semantic rules cannot be put into words it does not follow that _no_ semantic rules can.

## The grain of truth: no language states all its own rules

End on a constructive note. People say "truth is indefinable," and the defensible version of that slogan is this: **no language can state _all_ of its own semantic rules.** (The absurd version — that no language states _any_ of its rules — is false; every English definition states an English rule in English.) Here is the proof. For any meaningful expression there is a true semantic rule giving its meaning. Suppose, for the sake of argument, that for every semantic rule of English there is an English sentence expressing it. Let K be the class of all English sentences that correctly express actual semantic rules of English, and let SRE be the **conjunction of all the members of K**. SRE is a true, hence meaningful, sentence of English, so it correctly states the meaning of at least one expression — which means SRE belongs to K. But then SRE, the conjunction of _all_ of K's members, would be one of its own conjuncts — and **no conjunction is one of its own conjuncts** ("snow is white and snow is white" is a conjunction, but its conjunct "snow is white" is not). Contradiction. Therefore English cannot express all of its own semantic rules, and the argument generalizes to every language.`,
  },
  {
    slug: "logical-positivism-stated",
    title: "Logical positivism stated",
    weekNumber: 3,
    blurb:
      "The criterion of meaning: a sentence is meaningful only if it is a tautology or an observation report — making philosophy and mathematics empty or nonsense.",
    lectureTitle: "3.4 Logical positivism stated",
    body: `# Logical positivism stated

The _main_ contention of the TLP is not that philosophy is nonsense but a criterion of meaning from which that conclusion follows: **a sentence is meaningful if, and only if, it is either a tautology or an observation report.** Call this the criterion (CT).

## The two categories

A **tautology** is a _definitional_ truth — "fathers are male," "there are three feet in a yard." An **observation report** reports what one's senses have delivered — "I am now seeing a dog," "there is a brown discoloration on Smith's ice-cream," "I can see your house from here." CT breaks into two claims:

- **(1)** All meaningful _non-empirical_ statements are tautologies.
- **(2)** All meaningful _non-tautologous_ statements are observation reports.

Claim (1) entails that the non-empirical disciplines — **philosophy and mathematics** — consist of statements that _say nothing about anything_; they merely unpack conventions. Claim (2) entails that anything non-tautologous that cannot be known strictly from the senses is **meaningless**.

## Why philosophy becomes nonsense

Wittgenstein's thesis that philosophical statements are ungrammatical nonsense is a **corollary** of CT. Take the statement (KC): _"knowing a truth doesn't necessarily involve being causally affected by the state of affairs that truth describes."_ KC is philosophical, and so is its negation. Neither is a tautology, and neither is empirical. By CT, then, _both_ KC and its negation are meaningless. Since philosophical assertions are never tautologous, CT entails — as Wittgenstein well knew — that philosophical assertions are **categorically** meaningless.

## Logical positivism

The position that **claims (1) and (2) are both correct** is **logical positivism**. For roughly a decade after the TLP, and largely because of it, logical positivism was enormously popular. It married Hume's empiricism to Frege's logic and promised to dissolve millennia of metaphysical dispute at a stroke: any question that can be settled neither by observation nor by logic is **not a real question** but a grammatical illusion. The disputes over substance, the soul, and the Absolute were to be diagnosed away rather than answered.

## What is coming

Logical positivism is the natural home of the verdict that "the Absolute is perfect" and "the nothing nothings" are not _false_ but _literally meaningless_. As we will see, however, both halves — claims (1) and (2) — are false, and the criterion turns its scalpel on its own hand: CT is itself neither a tautology nor an observation report. But that self-refutation, and the collapse of verificationism, come in the next lectures. For now the thing to fix firmly in view is the precise biconditional CT and its two component claims, because every later objection is aimed at one or the other of them.`,
  },
  {
    slug: "verificationism-falsificationism",
    title: "Verificationism and falsificationism",
    weekNumber: 3,
    blurb:
      "Verification fails on universal laws, falsification fails on existence claims, confirmation lets nonsense back in, and a derived truth refutes claim (1).",
    lectureTitle: "3.5 Verificationism and falsificationism",
    body: `# Verificationism and falsificationism

Claim (2) of logical positivism is **verificationism**: a non-tautologous statement is meaningful if and only if it can be _verified_ (shown true) strictly on the basis of sensory observation.

## Verification fails on universal laws

"All metal expands when heated" is plainly meaningful, yet it cannot be conclusively verified: however many samples expand, some untested sample might fail. It _can_, however, be **falsified** — a single non-expanding sample would refute it. Seeing this, the positivists swapped verificationism for **falsificationism**: a non-tautologous statement is meaningful if and only if it can be _falsified_ strictly by observation.

## Falsification fails on existence claims

"There exists a gold ball weighing exactly 27.13654 pounds" is obviously meaningful, yet it cannot be conclusively falsified: however many gold balls you weigh, some unexamined one might have that weight. The asymmetry is structural. A claim that _something or other_ has a property can be verified by finding one instance but never conclusively falsified; a claim that _everything_ of a kind has a property can be falsified by one counterexample but never conclusively verified. And falsificationism is really just verificationism in disguise — it says a statement is meaningful if its _negation_ is verifiable — so once verificationism fails, so does it.

## Retreat to confirmation

Next the positivists weakened the criterion to **confirmationism**: a non-tautologous statement is meaningful if possible observations can _confirm_ it, where one statement confirms another if, other things being equal, the second is likelier to be true given the first than given the first's negation. This makes "meaningful non-tautologous" coincide with "**empirical**," where an empirical statement is one whose truth or falsity is to be decided on at least partly observational grounds (and the negation of an empirical statement is itself empirical). Henceforth read logical positivism as the claim that a statement is meaningful if and only if it is either a tautology or an empirical statement.

## A derived truth that is neither tautology nor empirical

Grant, for the sake of argument, that "a triangle has three sides" and "a pentagon has five sides" are true by convention. It then follows that, letting the first number be a triangle's number of sides and the second a pentagon's, the only even prime is the number that is one less than the first and three less than the second. This consequence **follows from** conventions but is not itself a convention — we did not stipulate it — so it is a non-tautologous, non-empirical truth. Hence claim (1) of logical positivism is false. Worse, consistency itself is non-observational: to say one statement is inconsistent with another is to say the first _must_ be false if the second is true, and observation tells you at most what _is_ the case, never what _must_ be. So observation cannot detect inconsistency or necessary consequence. And one must distinguish sentences from meanings: it is always the **proposition**, never the sentence, that is logically true (the sentence "triangles have three sides" could have meant that penguins outsmart humans), and **no proposition is true by convention** — we choose what our symbols mean, not whether those meanings are correct.

## Holism lets the nonsense back in

Finally, Newton's physics is meaningful but by itself predicts nothing — physical laws are conditionals of the form "if such-and-such conditions hold, then so-and-so happens," so only Newton's physics _plus_ statements of particular fact is confirmable. To save it, the positivist proposes that a statement is meaningful if there is _some_ further statement such that, given that further statement, the first becomes confirmable. But then "the nothing nothings" sails through: given "if grass is green, then the nothing nothings," whatever confirms "grass is green" confirms "the nothing nothings." Every patch to the criterion leaked the same way.`,
  },
  {
    slug: "self-refutation-empiricism",
    title: "The self-refutation of empiricism",
    weekNumber: 3,
    blurb:
      "Logical positivism is neither tautology nor empirical, so it refutes itself; empiricism collapses by self-cancellation; Russell's parallel fails but the shape holds; grue sinks confirmation.",
    lectureTitle: "3.6 The self-refutation of empiricism",
    body: `# The self-refutation of empiricism

Logical positivism collapsed under narrow technical objections — pressed first, tellingly, by its own ablest defenders, above all **Carl Hempel (1905–1997)**. But the deeper failure is that the doctrine is _at its core_ incoherent.

## Logical positivism is a counterexample to itself

Anything true or false is meaningful, so logical positivism is meaningful **if it is correct**. By its own criterion it must then be either a tautology or empirical. It is **not a tautology**: it is no matter of convention that "meaningful sentence" is interchangeable with "sentence that is a tautology or is empirical." So if true it must be **empirical**. But it cannot be empirical: any attempt to find observational support for a statement already _presupposes that the statement is meaningful_, and so presupposes an answer to the question "what makes a statement meaningful?" Hence that question is not itself empirical, and there can be no observational grounds for logical positivism. Being neither a tautology nor empirical, **logical positivism is a counterexample to itself, and therefore false.**

Wittgenstein half-saw this: not one TLP sentence is empirical or tautologous, so by its own thesis the TLP is nonsense — which is why he calls his propositions a _ladder_ to be thrown away once one has climbed it, and ends by telling us to "pass over in silence what we cannot speak about." But these magisterial words are, so far as they are not trivial, false: to understand something is to grasp its meaning, so if his readers understand his sentences those sentences have meanings, contradicting his claim that whoever understands them will see they are meaningless. And the injunction to silence is empty, since to remain silent about something just _is_ to pass it over in silence.

## Empiricism in general

Empiricism is **not** the modest claim that whatever we know _now_ we happened to learn through perception. It is the doctrine that it is _inherent in the nature of knowledge_ that all knowledge be strictly observation-based. On this view, "this is knowledge" is **inconsistent** with "this was not learned through observation." But observation cannot tell you whether one statement is consistent with another, so any body of observational data is consistent with empiricism's being false. Thus there can be no observational grounds for empiricism. So far as empiricism is correct there are _no grounds_ for it; so far as there are grounds, it is _false_. Empiricism, if true, is false; therefore it is false.

## Russell on naïve realism: same shape, bad reasoning

Russell argued: "We all start from naïve realism — grass is green, stones hard, snow cold. But physics says the observer really observes the _effects_ of the stone upon himself. Naïve realism leads to physics; physics, if true, shows naïve realism false. **Therefore naïve realism, if true, is false; therefore it is false.**" The conclusion-shape is sound, but Russell's _premises_ are not. In seeing the stone I observe the **stone itself**, not some effect on me; that my seeing is _an effect_ of the stone does not make the thing seen an effect. And the coldness physics studies _is_ the coldness I feel — physics tells me what it is for a thing to be cold, correcting my pre-theoretic beliefs _about_ that very coldness. So Russell's particular argument fails, even though the self-cancelling form genuinely sinks empiricism.

## Confirmation needs the non-empirical: Goodman's grue

Confirmationism is a form of empiricism, and Nelson Goodman shows that the very concept of confirmation requires non-empirical knowledge. Call an object **grue** if it is green and examined before January 1, 2010, or blue and examined thereafter. Every green emerald examined before 2010 was thereby also grue, so the same data that "warrant" inferring future _greenness_ equally "warrant" inferring future _grueness_ — that is, future blueness. Generalized, _anything confirms anything_. Either no induction is better than any other, or — since some clearly are — **induction has no strictly observational basis**: from a purely observational standpoint "grue" is as legitimate a description as "green," so our grounds for treating _green_ (and not _grue_) as projectible must be **legitimate but partly non-observational**. Confirmation thus presupposes exactly the non-empirical knowledge that empiricism denies.`,
  },
  {
    slug: "brokenness-tautological-truth",
    title: "The brokenness of tautological truth",
    weekNumber: 3,
    blurb:
      "Being a tautology is a property of an utterance relative to how a hearer learned the words — not of a sentence — so necessity cannot be reduced to convention.",
    lectureTitle: "3.7 The brokenness of tautological truth",
    body: `# The brokenness of tautological truth

Logical positivism's last refuge was to ground all non-empirical truth in **convention**: the necessary truths are just _tautologies_, true by how we use words. This lecture shows that the very notion of "tautology" is broken. It is utterances _relative to a hearer_, not sentences, that are tautologous — and so non-empirical truth cannot be identified with conventional truth.

## The yard story

You do not know what length "yard" picks out, so you ask your friend Smith. He points at an object and says "the length of that object is one yard." The object is in fact three feet long, but you cannot tell that exactly just by looking. This is Monday.

Tuesday you find a second object, **measure** it, and learn it is exactly three feet long; you tell Smith so. You know the second object's length is roughly comparable to the first's, but you do not know precisely how they compare — whether the first is within six inches of the second, say. Wanting to know, you tell Smith you wish you knew. Irritated, he says: _"there are three feet in a yard."_

For **you**, in these circumstances, that sentence is **informative, not trivial** — it actually tells you how the two objects compare. Had you instead learned "yard" by being told "a yard is a length of three feet," then the same sentence _would_ have been a tautology for you. **Same sentence, tautologous for one hearer and substantive for another**, depending on how each acquired the words.

## Why this is not mere misunderstanding

One might object that the sentence is non-trivial for you only because you do not _really_ understand it. Not so. To a non-speaker of Albanian an Albanian sentence is neither trivial nor non-trivial; it is mere noise, like wind chimes. But in the story you fully understand the sentence — and it is _precisely because_ you understand it that it is non-trivial for you. So tautologousness is a property not of sentences but of the **information on the basis of which a hearer figures out what the sentence means.** It is therefore wrong to call a _sentence_, full stop, a tautology.

## The deeper morals about language

This rests on facts in the philosophy of language. **One knows the meanings of expressions descriptively** — through sight, hearing, and touch, which apprise us of things by _describing_ them (their colors, shapes, lengths). But two very different descriptions can pick out one and the same thing, as "the third U.S. President" and "the President responsible for the Louisiana Purchase" both pick out Jefferson. So the perceptually encoded descriptions through which two people learn the meaning of one expression may differ enormously, even when the expression means exactly the same to both. Consequently **a single sentence can convey different propositions to different people, all of whom know what it means.** What an utterance tells you is as much a function of _how you learned its words_ as of what those words mean.

## Why the second leg of positivism falls with the first

Genuine logical truths are another matter. The law of excluded middle (either a statement or its negation is true) and the law of non-contradiction (no statement is both true and false together) hold under _every_ interpretation. They are not made true by any stipulation, and, as the previous lectures argued, it is always the **proposition**, never the sentence, that is logically true, and no proposition is true by convention. So necessary truth cannot be identified with conventional, tautological truth. The first leg of logical positivism — claim (1) — already fell to the derived arithmetical truth that follows from conventions without being one; now the appeal to tautology that propped it up turns out to rest on a notion that does not even attach to sentences. **The reduction of the necessary to the conventional collapses entirely.**`,
  },
];

export const weekAssignments: SeedAssignment[] = [
  {
    kind: "homework",
    title: "Homework 3.1 — The Tractatus, picture theory, showing vs. saying",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Answer in full sentences and defend each verdict in prose. Bald assertions earn little credit; the grader is looking for reasoning, your own examples where requested, and a defense of every claim.",
    problems: [
      {
        topicSlug: "tractatus-philosophy-nonsense",
        prompt:
          "Wittgenstein blames the meaninglessness of \"the good is more or less identical than the beautiful\" (BG) on its being syntactically ill-formed. Using your OWN ungrammatical-but-meaningful example (do not reuse the \"me and Herby play tennis\" sentence), argue in 3–5 sentences that BG's defect cannot be its ungrammaticality, and identify what the real defect is.",
        correctAnswer:
          "Provide a fresh ungrammatical yet clearly meaningful sentence — for example, \"Him don't got no money, so we ain't going nowhere tonight,\" which everyone understands despite its broken grammar. Since ungrammatical sentences are routinely meaningful, ungrammaticality cannot by itself be what makes BG meaningless. The real defect is that the expression \"more identical than\" denotes no relation at all; it is no more a piece of English than \"blurga derba gurb.\" So BG is meaningless for the same reason as \"the beautiful is blurga derba gurb the good\": one of its constituent terms lacks meaning, and BG's syntactic awkwardness is explained by that lack of meaning rather than the other way around.",
        explanation:
          "The model answer mirrors the manuscript's strategy: a counterexample shows that ungrammaticality is not sufficient for meaninglessness, then locates the real defect in a non-denoting term. The order of explanation matters — the lack of meaning explains the bad syntax, not vice versa. Common wrong move: treating BG as meaningless 'because the words are in the wrong order,' which the counterexample defeats.",
        hint: "First exhibit a sentence that is ungrammatical yet understood, then ask what BG has that your sentence lacks.",
      },
      {
        topicSlug: "tractatus-philosophy-nonsense",
        prompt:
          "True or False: \"Triangles have four sides\" is meaningless. Defend your verdict in 3–4 sentences using the distinction between the two kinds of nonsense, and explain why Ryle's claim that it cannot meaningfully be said that properties cannot dance is self-refuting.",
        correctAnswer:
          "False. \"Triangles have four sides\" is absurd and therefore false, but only a sentence with a meaning can be false — to be false is to bear a false meaning — so it is meaningful. This is the second kind of nonsense (an absurd but genuine meaning), as opposed to the first kind, a sentence with no meaning at all, such as \"the beautiful is blurga derba gurb the good.\" Ryle's claim is self-refuting because, in asserting that it cannot be said that properties cannot dance, he says exactly the thing his theory declares unsayable; he thereby performs the very act he prohibits.",
        explanation:
          "Tests the absurdity/meaninglessness distinction and the self-refutation pattern. The grader looks for: falsity entails meaningfulness, the two-kinds-of-nonsense contrast, and a correct diagnosis of Ryle's performative contradiction. Wrong move: conflating 'absurd' with 'meaningless.'",
      },
      {
        topicSlug: "picture-theory-meaning",
        prompt:
          "Using the snow-turning-black scenario, explain in 4–6 sentences why a sentence reaches its fact only through a proposition while a photograph does not. Make the role of convention explicit.",
        correctAnswer:
          "If snow turned black, English would not break down: it already lets us say \"snow is black,\" so the semantic rules of English do not pair the sentence \"snow is white\" with the fact that snow is white. They pair it with a proposition that, when true, yields that fact — the sentence depicts the fact only by way of having that proposition for its meaning. A photograph of white snow, by contrast, resembles the snow directly and is tied to no proposition at all; change the world and the photo simply becomes inaccurate, it does not redeploy a convention. Because the sentence-to-fact link runs through a conventionally assigned proposition and the picture-to-fact link does not, sentences are fundamentally unlike pictures. Hence Wittgenstein's picture theory is false if read literally and trivial if read as mere 'representation.'",
        explanation:
          "Requires the proposition-mediation point and the role of convention. The snow-turns-black case shows the rules attach to propositions, not facts. Good answers also note the literal/trivial dilemma. Wrong move: saying photos are 'just more accurate pictures,' which misses that they bypass propositions entirely.",
        hint: "Ask what the semantic rules of English would have to do if snow changed color — would the language itself need to change?",
      },
      {
        topicSlug: "picture-theory-meaning",
        prompt:
          "Construct your OWN example of a true sentence whose content is 'image-resistant' (cannot be captured by any single picture), different from 'the moon is not made of cheese.' Explain in 3–5 sentences why no image is identical with its content, and why this is a problem for strict empiricism.",
        correctAnswer:
          "Example: \"There are no unicorns in this room.\" No picture could be this proposition: a drawing of an empty room also fixes the wall color, the lighting, and the room's shape, none of which the sentence asserts, and the 'no unicorns' part would have to be carried by a conventional crossed-out unicorn — a sign of negation, not a resemblance, since negation cannot be seen. So no image is identical with the content, because any image carries extra information the proposition lacks and cannot picture the negation. This pressures strict empiricism: the senses deliver images, yet my knowledge that there are no unicorns here cannot consist in any image, so some of what I know must be encoded non-pictorially and licensed by rules that are not themselves learned through perception.",
        explanation:
          "Looks for a genuinely image-resistant content (typically negative or general), the 'extra information' argument that no proposition equals an image, and the empiricist consequence that the conversion rules from images to non-images cannot be perceptual. Wrong move: choosing a content a picture CAN capture (e.g. 'a red ball is on the table').",
      },
      {
        topicSlug: "showing-vs-saying",
        prompt:
          "State Wittgenstein's slogan \"what can be shown cannot be said,\" then argue in 3–5 sentences that the doctrine is self-undermining AND give a concrete counterexample in which the same thing is both shown and said.",
        correctAnswer:
          "The slogan says that whatever can be shown cannot also be stated in words. The doctrine is self-undermining because to assert that the relation between words and facts cannot be described is itself to describe that relation; the thesis says something about logical form while denying that anything about logical form can be said, so applied to itself it forbids its own utterance. A concrete counterexample: I assert \"I can do fifty push-ups\" (saying it) and then perform fifty push-ups in front of you (showing it); the very same fact is both said and shown, so showing and saying are different acts rather than mutually exclusive ones.",
        explanation:
          "Requires a correct statement of the slogan, the self-application argument, and a clean show-and-say case. The grader checks that the counterexample genuinely involves one fact both stated and exhibited. Wrong move: giving an example where what is shown and what is said are different propositions.",
      },
      {
        topicSlug: "showing-vs-saying",
        prompt:
          "Defend the claim that no language can state ALL of its own semantic rules, by reconstructing the conjunction-of-all-rules argument in your own words. Be explicit about which obvious principle would be violated if the supposition held.",
        correctAnswer:
          "Suppose, for the sake of argument, that for every semantic rule of English there is an English sentence expressing it. Collect into a class K every English sentence that correctly states an actual semantic rule of English, and let SRE be the conjunction of all the members of K. SRE is true, hence meaningful, and since it correctly states the meanings of expressions it is itself a member of K. But SRE is the conjunction of ALL of K's members, so SRE would be one of its own conjuncts — and the obvious principle that no conjunction is one of its own conjuncts is thereby violated. So the supposition is false: English cannot express all of its own semantic rules, and the same reasoning generalizes to every language.",
        explanation:
          "Tests the self-referential diagonal argument. Essential beats: define K, form the grand conjunction, show it belongs to K, derive that it is its own conjunct, and cite 'no conjunction is its own conjunct.' Note this is the defensible reading of 'truth is indefinable,' not the absurd claim that no language states ANY of its rules.",
        hint: "Build the conjunction of every rule-stating sentence and ask whether that conjunction must itself be on the list.",
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
      "Apply the positivist criterion carefully and defend every verdict in full sentences. The grader compares the meaning of your answer, so explain your reasoning in prose rather than asserting conclusions.",
    problems: [
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "Take a NEW sentence not discussed in the lecture — \"every event has a cause\" — and decide what a logical positivist would say about its meaningfulness. State the criterion in your own words, then argue in 3–5 sentences which category (if any) the sentence falls into and what verdict the positivist must reach.",
        correctAnswer:
          "The criterion is that a sentence is meaningful only if it is either a tautology or an empirical (observation-grounded) statement. \"Every event has a cause\" is not a tautology: it is no definitional truth that 'event' means 'caused thing,' and one can coherently describe the words as picking out an uncaused happening. Nor is it cleanly empirical in the verificationist sense: being a universal claim about all events, past, present, and future, it can never be conclusively verified by observation, and arguably never falsified either, since a seemingly uncaused event could always have a hidden cause. So by the strict criterion the positivist must judge it meaningless metaphysics — which is exactly the embarrassing result, since the principle looks perfectly intelligible and was long treated as a cornerstone of science.",
        explanation:
          "Requires a correct statement of the criterion, a reasoned placement (neither tautology nor cleanly empirical), and the positivist's verdict. The point is to expose how the criterion over-generates 'nonsense.' Wrong move: declaring it empirical without noting that universal claims resist conclusive verification.",
        hint: "Is it true by definition? Could any finite set of observations settle a claim about every event everywhere and at every time?",
      },
      {
        topicSlug: "verificationism-falsificationism",
        prompt:
          "Construct your OWN pair of meaningful sentences — one that can be verified but never conclusively falsified, and one that can be falsified but never conclusively verified — neither drawn from the lecture's examples. Explain in 3–4 sentences why the asymmetry dooms both criteria.",
        correctAnswer:
          "Verifiable-but-not-falsifiable example: \"There exists a perfectly spherical natural diamond\" — finding one specimen verifies it, but no finite search can rule out an undiscovered one, so it cannot be conclusively falsified. Falsifiable-but-not-verifiable example: \"All swans have webbed feet\" — one non-webbed swan falsifies it, but you can never inspect every swan, so it cannot be conclusively verified. The asymmetry is that existence claims are verifiable but not falsifiable while universal claims are falsifiable but not verifiable. This dooms both criteria, because each throws out paradigmatically meaningful claims: verificationism discards universal scientific laws, and falsificationism discards perfectly intelligible existence claims.",
        explanation:
          "Looks for fresh existence and universal examples and the dual-failure diagnosis. The grader checks that the student matched verifiability to the existence claim and falsifiability to the universal claim. Wrong move: reusing 'all metal expands' or the gold-ball example.",
      },
      {
        topicSlug: "verificationism-falsificationism",
        prompt:
          "The positivists granted that \"a triangle has three sides\" and \"a pentagon has five sides\" are true by convention, yet a certain consequence follows that is neither a convention nor empirical. Reconstruct that consequence in your own words and explain in 3–4 sentences why it refutes claim (1) of logical positivism.",
        correctAnswer:
          "From the conventional truths that a triangle has three sides and a pentagon has five, it follows that the only even prime number is the number that is one less than a triangle's number of sides and three less than a pentagon's — namely two. This statement follows FROM the conventions but is not itself a convention: we never stipulated it, and it could not be altered merely by changing how we use 'triangle' or 'pentagon.' Nor is it empirical, since no observation is needed or even relevant to establish it. So it is a non-tautologous, non-empirical truth, which directly contradicts claim (1) — that every meaningful non-empirical statement is a tautology.",
        explanation:
          "Tests the derived-truth refutation of claim (1). Essential: the consequence follows from but is distinct from the conventions, and is non-empirical, hence a counterexample to (1). Connects to the broader point that consistency and necessary consequence are non-observational.",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "State strong empiricism precisely, then lay out the self-cancelling argument that it is false. In 3–5 sentences explain why the key step — that there can be no observational grounds for it — holds.",
        correctAnswer:
          "Strong empiricism is the doctrine that it is inherent in the nature of knowledge that all knowledge be strictly observation-based. On this view, 'this is knowledge' is inconsistent with 'this was not known through observation.' But observation can never establish that one statement is inconsistent with another — consistency is a matter of what must be so, and observation reports at most what is so — so any body of observational data is compatible with empiricism's being false, and there can be no observational grounds for empiricism. Hence, so far as empiricism is correct there are no grounds for it, and so far as there are grounds it is false. Empiricism, if true, is false; therefore it is false.",
        explanation:
          "Requires a precise statement of the doctrine, the consistency-is-non-observational lemma, and the self-cancelling conclusion. The grader checks that the student justifies why empiricism cannot be observation-based rather than merely asserting it. This is the same self-cancelling shape as Russell's naïve-realism argument.",
        hint: "Empiricism makes a consistency claim; can any experiment ever report that two statements are inconsistent?",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "Goodman's 'grue' shows that confirmation requires non-empirical knowledge. Define grue precisely, then argue in 4–6 sentences that, from a strictly observational standpoint, the emerald data confirm 'all emeralds are grue' exactly as much as 'all emeralds are green,' and state what the positivist must concede.",
        correctAnswer:
          "An object is grue if it is examined before January 1, 2010 and found green, or examined thereafter and found blue. Every emerald examined before 2010 and found green was thereby also found grue, so the identical observational record supports 'all emeralds are grue' just as strongly as 'all emeralds are green.' Yet these predictions diverge for emeralds examined after 2010: 'green' predicts green, while 'grue' predicts blue. From a purely observational standpoint there is no basis for preferring green to grue — both fit all the data — so if some inductions really are better than others, our grounds for projecting green rather than grue must be legitimate but partly NON-observational. The positivist must therefore concede that confirmation presupposes non-empirical knowledge, which makes confirmationism, a form of empiricism, incoherent.",
        explanation:
          "Tests the grue argument and its anti-empiricist payoff. Needed: the correct grue definition, the equal-confirmation point, the post-2010 divergence, and the concession that projection needs non-observational grounds. Wrong move: treating grue as obviously illegitimate without saying why observation alone cannot rule it out.",
      },
      {
        topicSlug: "brokenness-tautological-truth",
        prompt:
          "Using the yard story (or your own structurally similar story), argue in 4–6 sentences that being a tautology is a property of an utterance relative to a hearer, not of a sentence. Then explain why this, together with the fact that genuine logical truths are propositions, sinks the reduction of necessity to convention. Name the two logical laws that survive.",
        correctAnswer:
          "When you learned 'yard' by being shown an object and told 'that object's length is one yard,' the later utterance 'there are three feet in a yard' is informative for you — it tells you how that object compares to a separately measured three-foot object. Had you instead learned 'yard' as 'a length of three feet,' the very same sentence would have been a trivial tautology. Since the identical sentence is substantive for one hearer and tautologous for another, depending only on how each acquired the words, being a tautology is a property of an utterance relative to a hearer's information, not of a sentence. This sinks the reduction of necessity to convention: tautologousness does not even attach to sentences in the way the reduction needs, and genuine logical truths are propositions, never sentences, and no proposition is true by convention. The laws that genuinely survive — holding true under every interpretation — are the law of excluded middle (either a statement or its negation is true) and the law of non-contradiction (no statement is both true and false).",
        explanation:
          "Requires the hearer-relativity of tautologousness, the proposition-not-sentence point, and the two surviving laws (excluded middle and non-contradiction). The grader checks that the student ties the yard case to the failure of the necessity-as-convention reduction. Wrong move: claiming the sentence is non-trivial to the hearer because they do not understand it — the lecture rebuts this with the Albanian case.",
      },
    ],
  },
  {
    kind: "test",
    title: "Week 3 Test — The Tractatus and logical positivism",
    weekNumber: 3,
    isTimed: true,
    timeLimitMinutes: 40,
    instructions:
      "Timed: 40 minutes. Pasting is disabled. Every answer must be a defended argument in full sentences and in prose — unsupported verdicts will not score.",
    problems: [
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "State the logical-positivist criterion of meaningfulness, then explain in 3–4 sentences why, by that criterion, the sentence \"every meaningful statement is a tautology or empirical\" cannot itself be meaningful — and what this shows.",
        correctAnswer:
          "The criterion is that a sentence is meaningful if and only if it is either a tautology or an empirical statement. For the criterion itself to be meaningful it would have to be a tautology or empirical. It is no tautology, since it is not true by convention that 'meaningful' is interchangeable with 'tautologous-or-empirical'; and it cannot be empirical, since seeking observational support for any statement already presupposes that the statement is meaningful and hence presupposes an answer to what meaningfulness is. So the criterion is neither a tautology nor empirical, and is therefore, by its own lights, a counterexample to itself — which shows that the criterion is false.",
        explanation:
          "Requires a correct statement of the criterion plus the self-refutation: not a tautology, not empirical, hence self-defeating. Distinct from later items because it focuses on stating and turning the criterion on itself. Wrong move: calling the criterion a tautology.",
      },
      {
        topicSlug: "verificationism-falsificationism",
        prompt:
          "Apply the verifiability and falsifiability criteria to decide the status of \"there is at least one even number greater than every prime gap ever measured\" versus \"all copper conducts electricity.\" Classify each as an existence claim or a universal claim and explain in 3–4 sentences why the asymmetry traps both verificationism and falsificationism.",
        correctAnswer:
          "\"There is at least one even number greater than every measured prime gap\" is an existence claim: it can be verified by exhibiting such a number but never conclusively falsified, since one cannot survey all numbers. \"All copper conducts electricity\" is a universal claim: it can be falsified by a single non-conducting sample but never conclusively verified, since one cannot test all copper. The asymmetry is that existence claims are verifiable but not falsifiable, while universal claims are falsifiable but not verifiable. This traps both criteria: verificationism wrongly condemns universal scientific laws as meaningless, while falsificationism wrongly condemns intelligible existence claims, so neither cleanly separates sense from nonsense.",
        explanation:
          "Tests application of both criteria with correct classification and the dual-failure point. The grader checks that the existence claim is matched to verifiability and the universal claim to falsifiability, and that both criteria are shown to misclassify good statements.",
      },
      {
        topicSlug: "self-refutation-empiricism",
        prompt:
          "Lay out the self-cancelling argument empiricism falls to, and explain in 3–4 sentences why Russell's naïve-realism argument has the same logical shape yet rests on faulty premises.",
        correctAnswer:
          "Empiricism falls to a self-cancelling argument: since there can be no observational grounds for empiricism, so far as it is correct there are no grounds for it, and so far as there are grounds it is false — so it is false. Russell's argument has the same shape: naïve realism leads to physics, and physics, if true, shows naïve realism false, so naïve realism, if true, is false, and therefore false. But Russell's premises are faulty: in observing the stone I observe the stone itself, not merely an effect of it on me, and the coldness physics studies is the very coldness I feel, physics merely telling me what it is for a thing to be cold. So the self-cancelling form is valid, but Russell's particular instance fails while the empiricism instance stands.",
        explanation:
          "Requires the self-cancelling argument, the parallel structure of Russell's argument, and the two specific objections to Russell (we see the object itself; the property studied is the property felt). Wrong move: endorsing Russell's premises.",
      },
      {
        topicSlug: "tractatus-philosophy-nonsense",
        prompt:
          "State the Tractarian criterion under which the Tractatus declares itself nonsense, then explain in 3–4 sentences why the closing 'ladder' gesture and the injunction to 'pass over in silence' are incoherent.",
        correctAnswer:
          "The criterion is that a sentence is meaningful only if it is a tautology or an observation report. By it the TLP's own sentences, being neither tautologies nor empirical, are nonsense — which Wittgenstein concedes, calling them a ladder to climb and then throw away. The gesture is incoherent because to understand something is to grasp its meaning, so if readers understand his sentences then those sentences have meanings, contradicting the claim that understanding them reveals them as meaningless. Likewise 'pass over in silence what we cannot speak about' is empty, since to be silent about something just is to pass it over in silence — he asks us to refrain from doing what is by hypothesis impossible anyway.",
        explanation:
          "Requires the criterion and both incoherence points (understanding implies meaning; the silence injunction is vacuous). Distinct from the first item because it targets the ladder and silence gestures rather than the criterion's empirical status.",
      },
      {
        topicSlug: "brokenness-tautological-truth",
        prompt:
          "Explain in 3–5 sentences, using the yard story, why \"there are three feet in a yard\" can be a tautology for one hearer and informative for another, and name the two genuine logical laws that, unlike conventional 'tautologies,' hold under every interpretation.",
        correctAnswer:
          "If a hearer learned 'yard' ostensively — shown an object and told its length is one yard — then 'there are three feet in a yard' can be genuinely informative, telling them how that object compares to a separately measured three-foot object. If instead they learned 'yard' as 'a length of three feet,' the same sentence is a trivial tautology. So tautologousness depends on the information by which the hearer learned the words, making it a property of an utterance relative to a hearer rather than of a sentence. The genuine logical laws that hold under every interpretation are the law of excluded middle (either a statement or its negation is true) and the law of non-contradiction (no statement is both true and false), and these are not true by any convention.",
        explanation:
          "Requires the hearer-relativity point and the two laws (excluded middle and non-contradiction). The grader checks that the student grounds the difference in how the words were learned, not in a failure to understand.",
      },
      {
        topicSlug: "picture-theory-meaning",
        prompt:
          "Give two distinct reasons the picture theory is false — one about how sentences reach facts, one about the structure of sentences versus pictures — and illustrate the second with the digital-decomposition contrast. Answer in 4–6 sentences.",
        correctAnswer:
          "First, sentences reach their facts only through a conventionally assigned proposition — a sentence depicts a fact by way of having a proposition for its meaning — whereas a photograph reaches its fact directly, never going through a proposition; the snow-could-be-any-color point shows the rules attach to propositions, not facts. Second, sentences are digital structures with a unique decomposition into finitely many discrete parts: 'the cat is on the mat' decomposes exactly into 'cat,' 'mat,' and so on. A picture of a cat on a mat has no such minimal unit answering to the cat — the cat-region contains an ear-region, which contains still finer regions, endlessly — so pictures are analog, not digital. This digital character is a consequence of the conventional component that graphic resemblance entirely lacks, which is why anything functioning as a linguistic expression is not functioning as a picture.",
        explanation:
          "Requires two independent objections (proposition-mediation; digital versus analog with the decomposition example) and the link of digitality to convention. Wrong move: giving two versions of the same point.",
      },
      {
        topicSlug: "showing-vs-saying",
        prompt:
          "Compare Wittgenstein's 'what can be shown cannot be said' with the defensible thesis that no language can state all its own semantic rules. Identify exactly where Wittgenstein overreaches, and reconstruct the conjunction-of-all-rules argument for the defensible thesis. Answer in 4–6 sentences.",
        correctAnswer:
          "Wittgenstein's thesis overreaches by claiming we can NEVER state logical form or say what our words mean — yet we do exactly that whenever we put a meaning into words, as in stating the semantic rule that 'Mick Jagger' refers to that man, and the push-up case shows one fact can be both said and shown. The crux of his error is inferring from 'some semantic rules cannot be put into words' to 'no semantic rules can.' The defensible thesis is weaker and true: no language can state ALL of its own rules. Proof: let K be the class of all English sentences correctly stating English semantic rules, and let SRE be the conjunction of all of K's members; SRE is true and rule-stating, so it belongs to K, but then it would be one of its own conjuncts, violating the principle that no conjunction is one of its conjuncts — so English cannot state all its own rules, and this generalizes to every language.",
        explanation:
          "Requires the precise overreach (the some-to-all fallacy, and that saying IS possible) and the conjunction-of-all-rules diagonal argument for the genuine result. The grader checks that the student separates the false strong thesis from the true weak one. Wrong move: endorsing the strong 'cannot be said' thesis.",
      },
      {
        topicSlug: "logical-positivism-stated",
        prompt:
          "A defender says \"the universe is a perfect unity\" is meaningless because it can be neither verified nor falsified. Using the author's diagnosis, argue in 3–5 sentences that the real defect lies elsewhere, and explain what happens once the key term is defined.",
        correctAnswer:
          "On the author's diagnosis the sentence is not really a statement at all but a statement-form: it is meant to attribute some property to the universe, but the property 'perfect unity' is left undefined, so the sentence contains an undefined term and says nothing — much as 'it is tall' says nothing until we are told what 'it' refers to. Its being neither verifiable nor falsifiable is merely a symptom of that underlying defect, not the disease itself. Once 'perfect unity' is given a definite sense — say, an object such that for any two of its non-simultaneous events there is a possible causal process connecting the first to the second — the sentence immediately becomes a determinate claim that is either true or false. So the positivist misidentifies the problem: the failure of verifiability follows from the missing definition rather than constituting the meaninglessness.",
        explanation:
          "Tests the §4.6 alternative diagnosis: pseudo-statements are statement-forms with undefined terms, and unverifiability is a symptom, not the cause. The grader looks for the statement-form point, the 'it is tall' analogy, and the observation that defining the term restores meaning. Wrong move: agreeing that unverifiability is what makes it meaningless.",
      },
    ],
  },
];

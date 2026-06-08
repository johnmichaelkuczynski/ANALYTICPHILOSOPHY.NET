import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 3 — Analysis, Ontology, and the Non-Analytic Method
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u3-analysis-vs-ontogenesis",
    title: "Analysis vs. ontologizing",
    weekNumber: 3,
    blurb:
      "Analytic philosophers explain by clarifying statements, not by inflating their ontology with new entities.",
    lectureTitle: "3.0 Analysis vs. ontogenesis",
    body: `# Analysis vs. ontogenesis

In the works of analytic philosophers one sometimes meets the word **"ontology."** Etymologically it means "the study of being" — from *ontos* ("being") and *logos* ("study"). But nowadays the word is used in a narrower, more concrete way. A philosopher's **ontology** is simply the set of his beliefs as to *what exists.*

Ontology, in this sense, varies from philosopher to philosopher. Some philosophers don't believe in non-spatiotemporal entities — numbers, properties, propositions — so such entities don't belong to *their* ontology. Others do believe in them, so those entities *do* belong to *their* ontology. To describe a thing as "part of my ontology" is just to say that I count it among the things that exist.

## Ontological conservatism

Analytic philosophers are, almost **by definition, ontologically very conservative.** That is, they do not want to grant existence to anything whose existence hasn't been demonstrated beyond a shadow of a doubt. The default attitude is parsimony: an entity earns a place in your ontology only when it has been *forced* on you, never merely because admitting it would be convenient.

Pre-analytic, pre-Fregean philosophers, by contrast, were ontologically very **liberal.** They were willing to populate the world with strange occupants at the first sign of difficulty — and, as we will see, even with *logically impossible* occupants. This is the great divide. Where the analytic philosopher hesitates and analyzes, his pre-Fregean predecessor reaches for a new entity.

## A worked case: the twenty-foot person

Consider the statement:

$$(\\text{TP})\\quad \\text{no person is over 20-feet tall.}$$

TP is obviously true. But its surface grammar mirrors a sentence like "some person is over six feet tall," which attributes a height to an individual. Reading TP on that model, **pre-Fregean philosophers took TP to say that there existed some *non-person* who was over 20-feet tall** — and then they engaged in a great deal of spurious **"ontologizing"** to validate this reading, conjuring up the shadowy un-person whose existence the sentence supposedly required.

To **ontologize** is exactly this: to try to solve a problem by *positing a new entity, or class of entities, not previously believed to exist.* The pre-Fregean treatment of TP is ontologizing in its purest form.

## Frege's diagnosis

Frege showed that this ontologizing, in addition to being **futile,** is **unnecessary.** TP does not attribute a height to a non-person. What TP really says is that a certain *property* — the property of being a person who is over 20-feet tall — has *another* property, namely the property of **not being instantiated.** In symbols:

$$\\neg\\exists x\\,\\big(\\text{Person}(x) \\wedge \\text{Over20}(x)\\big),$$

equivalently $\\forall x\\,\\neg\\big(\\text{Person}(x) \\wedge \\text{Over20}(x)\\big)$. No 20-foot-tall (un)person need be postulated. **No ontologizing need be done.** The whole apparent pressure toward a new entity was an artifact of mistaking grammatical form for logical form.

## The general lesson

This is the basic tenet of analytic philosophy, stated once more in its sharpest form:

> **Philosophy explains by clarifying statements. Science explains by positing entities.**

Science posits entities that are *not themselves directly encountered* but that, if assumed to exist, would account for phenomena that *are* directly encountered — protons, antibodies, fields. It used to be thought that philosophical explanation worked the same way: that philosophical progress was a matter of positing entities that are not themselves directly known but that, if assumed to exist, would explain what is directly known.

**This is not the case. Philosophy isn't para-science.** Philosophy is conceptual analysis. To make a philosophical discovery is *not* to discover a new entity; it is to **make explicit a previously unrecognized implication of an existing belief.** Philosophy is *explication* — the clarification of statements we already accept but whose depths we have not yet fully fathomed. The pre-Fregean who ontologized over TP was doing bad para-science where he should have been doing analysis.`,
  },
  {
    slug: "u3-when-to-ontologize",
    title: "When is it appropriate to ontologize?",
    weekNumber: 3,
    blurb:
      "Ontologizing is licensed only when an undeniable inference forces it — and what it forces is always an abstract object.",
    lectureTitle: "3.1 When is it appropriate to ontologize?",
    body: `# When is it appropriate to ontologize?

As a general rule, analytic philosophers do **not** try to solve philosophical problems by ontologizing — by positing an entity, or class of entities, not previously believed to exist. They try to solve them by **clarifying statements.** But the rule has a principled exception, and getting that exception right is the whole point of this lecture.

## The exception, and its two constraints

In some cases the results of a *successfully clarified* statement themselves **demand** that we grant existence to something to which we'd otherwise deny existence. When the analysis itself forces the existence-claim on us, we must accept it. But notice the two strict constraints on any ontologizing an analytic philosopher will tolerate:

1. **It is never a spatiotemporal entity.** Whenever this happens, the entity being posited is never a denizen of the spatiotemporal world. It is never a person, a table, a mountain, or a monster. It is **always an abstract object of some kind.**
2. **It is forced, not chosen.** The entity is posited *only* because, were it not to exist, it would be impossible to account for the truth of **obviously true statements.** It is admitted under logical duress, never for mere convenience.

## A worked case: shared properties

Take the premise that **Bob and Sally are both humans who are intelligent.** From this it follows that there exist *characteristics* — or, to use the word preferred by analytic philosophers, **properties** — that Bob and Sally have in common. And from *that* it follows that **properties exist.** The inference is rudimentary and airtight:

$$\\big(\\text{Intelligent}(\\text{Bob}) \\wedge \\text{Intelligent}(\\text{Sally})\\big) \\;\\Rightarrow\\; \\exists F\\,\\big(F(\\text{Bob}) \\wedge F(\\text{Sally})\\big).$$

That existentially quantified conclusion — *there is a property they share* — commits us to the existence of at least one property. We did not choose to enlarge our ontology; the undeniable truth of the premise dragged the conclusion along behind it.

## Are properties spatiotemporal?

Granted that properties exist, are they identical with spatiotemporal entities — things with locations in space and time? **No.** Here we must be careful to separate a property from its *instances.*

Instances of properties at least sometimes exist in space-time. Bob and Sally, who are instances of many properties, exist in space and time. But although you may encounter many **instances of intelligence,** you will never encounter **intelligence per se,** and it would make no sense to assign any spatiotemporal location to it. Where is intelligence? The question has no answer because it presupposes a category mistake. Attempts to rebut this argument — to drag the property itself down into space-time — are doomed to fail.

## The upshot

So, to validate even the most rudimentary inference from "Bob and Sally are both intelligent and kind," it is necessary to grant the existence of **non-spatiotemporal entities** — and thus to do a bit of ontologizing.

The picture is therefore consistent, not contradictory. Analytic philosophers **do** ontologize. But they do it **only when there is no other way of demonstrating the legitimacy of some indisputably correct form of inference,** and they **never posit anything non-spatiotemporal-by-convenience** — what they are forced to admit is always, and only, an abstract object. Principled, inference-driven ontology of abstracta stands at the opposite pole from the reckless ontologizing that conjures up twenty-foot un-persons and impossible objects.`,
  },
  {
    slug: "u3-brentano-meinong",
    title: "Brentano and Meinong: the non-analytic method epitomized",
    weekNumber: 3,
    blurb:
      "How the non-analytic method invents non-existent objects to save a thesis that analysis would have saved for free.",
    lectureTitle: "3.2 Brentano and Meinong: the non-analytic method epitomized",
    body: `# Brentano and Meinong: the non-analytic method epitomized

This lecture exhibits, in a single extended example, exactly what goes wrong when a philosopher ontologizes where he should analyze.

## Brentano's thesis: the mental is the intentional

According to **Franz Brentano (1838–1917),** the essence of the mental is **intentionality.** Here "intentionality" does *not* mean the property of being done deliberately. It means the property of being **representational.** In Brentano's view, for something to be a mental entity is for it to be representational, and for something to fail to be a mental entity is for it to be non-representational.

There is an apparent counterexample: there are *non-mental* things that are representational. An utterance of "snow is white," or a deposit of ink on a page, represents something, yet is not mental. But this is no threat to the thesis. Utterances and ink deposits are representational only in a **derivative** sense. It is *because we endow it with meaning* that an utterance of "snow is white" is meaningful; in a world devoid of sentient beings it would just be another noise. So Brentano's refined thesis is that **for something to be mental is for it to be *non-derivatively* representational.**

## The apparent problem

To be representational is presumably to *represent something.* Now, hallucinations are mental entities, hence (by the thesis) representational. But what does a hallucination of a pink elephant represent? A pink elephant? **No — pink elephants don't exist.** More formally, there is nothing $x$ such that $x$ is a pink elephant:

$$\\neg\\exists x\\,\\text{PinkElephant}(x).$$

A fortiori there is nothing $x$ such that $x$ is a pink elephant *represented by some hallucination.* And yet there is clearly a sense in which hallucinations of pink elephants and other non-entities **are** representational. How is this to be explained?

## The solution: perception is description

The key is that **perception is description.** When you look at an actual elephant — call him **Larry** — the information encoded in your visual perception is *not* delivered the way Larry is delivered in a sentence.

Consider the sentence:

$$(\\text{LS})\\quad \\text{"Larry is standing over there, next to that tree, looking ill."}$$

In LS, Larry is represented by a **single, semantically simple symbol** — the name "Larry." But in no sense-perception of Larry is he represented by some simple, homogeneous, non-composite cipher. When you *see* Larry you don't just see *that object*; you see a thing **having various properties** — a certain color, shape, size, position relative to you. So far as he is perceived, Larry is represented *as having these or those properties.* Seeing him therefore involves seeing that **these or those properties are instantiated** — that there is, in a certain place, an instance of a certain morphology, color, and so on.

It is not as though, in addition to seeing an instance of a certain morphology and color, you *also, separately,* see Larry. Your seeing Larry **consists in** your seeing those property-instances. Hence the content of your perception is given by an **existence-claim** along the lines of:

$$(\\text{LC})\\quad \\exists x\\,\\big(\\text{Here}(x) \\wedge \\text{Shape}_1(x) \\wedge \\text{Color}_2(x) \\wedge \\cdots\\big).$$

## Existence-claims, satisfaction, uniqueness

An **existence-claim** is any claim to the effect that some property is instantiated. Thus "there are prime numbers" is an existence-claim: it says the property *being a prime number* has at least one instance, $\\exists x\\,\\text{Prime}(x)$.

Given any existence-claim, **anything having the requisite properties is said to *satisfy* it.** The number seven satisfies "there are prime numbers." The number two **uniquely** satisfies "there is an even prime," since (a) it satisfies it and (b) nothing else does.

When you look at Larry, then, your eyes are giving you an existence-claim. Given that **Larry, and Larry alone, satisfies it,** he is the *object* of your perception. So your perception really does represent Larry — but it represents him **by way of encoding an existence-claim that he satisfies,** not by locking onto him with a simple cipher.

## The payoff: hallucination without ghostly objects

Now suppose that, the next day, you have a hallucination that is *experientially just like* yesterday's veridical perception. (A **"veridical"** perception is an accurate one; "veridical" is to perceptions what "true" is to sentences.) Neither Larry nor anything like him is before you, yet your visual experience says otherwise. It encodes **the very same existence-claim** as LC — but on this occasion the claim is **false,** because **nothing satisfies it.**

The crucial point: the hallucination is representational **not** because there is some thing it picks out, but because it **delivers a message — a false one — about how the world is.** It represents the world as being a certain way. A veridical perception is just one whose encoded existence-claim happens to be **true.** And just as the sentence "there does not exist a ten-foot-tall man" can be true without requiring a ten-foot-tall man, your hallucinatory perception requires **no elephant before you** in order to have its content.

The same holds for **thoughts about the non-existent.** When you think about a non-existent number — say, an even prime greater than two — there is no mathematically impossible entity you are cognitively locking onto. You are merely entertaining a **false existence-claim:**

$$\\exists n\\,\\big(\\text{Even}(n) \\wedge \\text{Prime}(n) \\wedge n > 2\\big),$$

which is simply false. Mental entities have **propositions** for their contents. When correct, those propositions describe existing things; when false, they don't. But **nothing non-existent or quasi-existent can be the object of a thought or perception.** To say a thought or perception has a "non-existent object" means, so far as it means anything coherent, that **its content is an existence-claim that nothing satisfies.**

## Where Brentano dropped the ball

Brentano correctly saw that hallucinations are, in some significant sense, representational. Wishing to reconcile this with the fact that there are no pink elephants, he said that a hallucination of a pink elephant has a **non-existent pink elephant for its object.**

But that is absurd. It amounts to saying:

$$\\exists x\\,\\big(\\text{PinkElephant}(x) \\wedge \\neg\\,\\text{Exists}(x) \\wedge \\text{Hallucinated}(x)\\big)$$

— "there exists some elephant $x$ such that $x$ doesn't exist and such that what you are hallucinating is $x$." The very form of the sentence is self-defeating.

In a failed attempt to deal with this, Brentano distinguished different *kinds* of non-existence and coined different terms to mark them — "inexistent," "non-existent," "un-existent," and so on. His pupil **Alexius Meinong (1853–1920)** added yet another bogus category: the category of **"subsistent"** entities. An entity "subsists" if it doesn't quite fail to exist, but doesn't quite succeed in existing either.

## Verdict

This entire approach is misguided. **Brentano and Meinong were ontologizing when they should have been analyzing.** Properly analyzed, hallucinations no more require the existence of "non-existent existents" than veridical perceptions do; the same goes for thoughts about Bart Simpson, the Fountain of Youth, and the rest. The whole zoo of inexistent, un-existent, and subsistent objects evaporates the moment one sees that the content of a mental state is a *proposition* — an existence-claim that is simply true or simply false.`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Week 3 — Homework 1 ─────────────
  {
    kind: "homework",
    title: "Homework 3.1 — Ontology, analysis, and forced existence-claims",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the contrast between clarifying a statement and positing an entity to brand-new cases. Regiment sentences and judge inferences. Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, ↔ and predicate notation.",
    problems: [
      {
        topicSlug: "u3-analysis-vs-ontogenesis",
        prompt:
          "A philosopher hears 'no museum displays a self-portrait painted before the artist was born' and concludes that the sentence is about a peculiar non-museum that displays such a portrait. Give the correct logical regimentation of the sentence (use predicates Museum, Displays-prenatal-self-portrait, or a single property P) and say in one phrase what the sentence really attributes to what.",
        correctAnswer:
          "¬∃x (Museum(x) ∧ P(x)); it attributes to the property 'being a museum that displays a prenatal self-portrait' the property of being uninstantiated.",
        explanation:
          "The sentence is a negated existential, $\\neg\\exists x\\,(\\text{Museum}(x) \\wedge P(x))$, equivalently $\\forall x\\,\\neg(\\text{Museum}(x)\\wedge P(x))$. It says a certain property has no instances; it does not attribute a display to any 'non-museum.' No new entity is required — the puzzle dissolves by clarifying the statement.",
        hint: "A 'no ___ is/does ___' sentence asserts that a property is uninstantiated.",
      },
      {
        topicSlug: "u3-analysis-vs-ontogenesis",
        prompt:
          "Classify each move as ANALYSIS or ONTOLOGIZING, in one word each, and give a one-clause reason: (a) explaining why 'no coin in the jar is counterfeit' is true by rephrasing it as the claim that a certain property lacks instances; (b) explaining why 'no coin in the jar is counterfeit' is true by positing a featureless non-coin that is counterfeit.",
        correctAnswer:
          "(a) ANALYSIS — it clarifies what the statement says; (b) ONTOLOGIZING — it posits a new entity to validate a surface reading.",
        explanation:
          "Move (a) makes explicit that the sentence means $\\neg\\exists x\\,(\\text{CoinInJar}(x)\\wedge\\text{Counterfeit}(x))$ — pure explication. Move (b) tries to solve the problem by introducing an entity not previously believed to exist, which is the para-scientific method analytic philosophers reject.",
      },
      {
        topicSlug: "u3-when-to-ontologize",
        prompt:
          "From 'Mercury and Venus are both planets that are rocky' a student infers 'there is something Mercury and Venus have in common.' Symbolize the conclusion with a second-order existential quantifier, and state whether the inference is valid and what kind of entity its truth commits us to.",
        correctAnswer:
          "∃F (F(Mercury) ∧ F(Venus)); valid; it commits us to a property — an abstract, non-spatiotemporal object.",
        explanation:
          "From $F(\\text{Mercury}) \\wedge F(\\text{Venus})$ (with $F = $ being a rocky planet) it follows by existential generalization that $\\exists F\\,(F(\\text{Mercury}) \\wedge F(\\text{Venus}))$. The inference is airtight, and what it forces into our ontology is a shared property — never a spatiotemporal thing.",
        hint: "Existentially generalize on the predicate position, not the object position.",
      },
      {
        topicSlug: "u3-when-to-ontologize",
        prompt:
          "A philosopher argues: 'Since redness is a genuine property, redness itself must sit somewhere in space — perhaps wherever red things are densest.' Identify the single mistaken step and state, in one sentence, the correct view of the relation between a property and its instances.",
        correctAnswer:
          "The mistaken step conflates a property with its instances; the property's instances may have spatiotemporal locations, but the property itself has none.",
        explanation:
          "Red *things* are instances and do occupy space, but redness per se has no location — asking where it is is a category mistake. Forced ontologizing yields only abstract objects, so the existence of redness gives us no spatiotemporal occupant to locate.",
      },
    ],
  },

  // ───────────── Week 3 — Homework 2 ─────────────
  {
    kind: "homework",
    title: "Homework 3.2 — Intentionality, perception-as-description, and non-existent objects",
    weekNumber: 3,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the analysis of representational mental states to fresh cases. Regiment contents as existence-claims and diagnose where ontologizing creeps in. Use the math keyboard for ∃, ∀, ¬, ∧, >, and predicate notation.",
    problems: [
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "A sailor hallucinates a green lighthouse on the horizon, though none is there. Give the existence-claim that is the content of his visual experience (use predicates On-horizon, Green, Lighthouse over a variable x), and state its truth-value together with the one-clause reason.",
        correctAnswer:
          "∃x (On-horizon(x) ∧ Green(x) ∧ Lighthouse(x)); false, because nothing satisfies it.",
        explanation:
          "Perception is description: the experience encodes the existence-claim $\\exists x\\,(\\text{OnHorizon}(x)\\wedge\\text{Green}(x)\\wedge\\text{Lighthouse}(x))$. It is representational because it delivers a message about the world, but the message is false since nothing satisfies the claim — no ghostly 'non-lighthouse' is its object.",
        hint: "A perception's content is an existence-claim; a hallucination's just happens to be false.",
      },
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "Someone thinks about a triangle whose interior angles sum to 200 degrees. A philosopher says the thinker's mind is locked onto an impossible geometric object. Give the actual content of the thought as an existence-claim (use Triangle(t) and AngleSum(t) = 200), and state what the thought really commits the thinker to.",
        correctAnswer:
          "∃t (Triangle(t) ∧ AngleSum(t) = 200); it commits the thinker only to entertaining a false existence-claim, not to any impossible object.",
        explanation:
          "Thinking of a non-existent thing is entertaining a false existence-claim, here $\\exists t\\,(\\text{Triangle}(t) \\wedge \\text{AngleSum}(t)=200)$, which is simply false. The thought has a proposition for its content, so no quasi-existent impossible object need be the 'object' of the thought.",
      },
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "A theorist, to keep 'every dream is about something,' declares that a dream of a winged horse has a non-existent winged horse as its object. Symbolize the commitment this declaration incurs (use WingedHorse(x), Exists(x), Dreamt(x)) and state in one clause why it is incoherent.",
        correctAnswer:
          "∃x (WingedHorse(x) ∧ ¬Exists(x) ∧ Dreamt(x)); incoherent because it asserts that there exists a thing that does not exist.",
        explanation:
          "The declaration amounts to $\\exists x\\,(\\text{WingedHorse}(x) \\wedge \\neg\\text{Exists}(x) \\wedge \\text{Dreamt}(x))$ — 'there exists an $x$ such that $x$ does not exist,' a self-defeating form. This is ontologizing where analysis was needed: the dream's content is just the false claim $\\exists x\\,\\text{WingedHorse}(x)$.",
        hint: "Watch for a sentence that quantifies over a thing while denying it exists.",
      },
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "Of the description 'the smallest positive integer greater than 1 that has no prime factors,' say whether anything satisfies it, whether anything uniquely satisfies it, and what a thought 'about' such a number really amounts to.",
        correctAnswer:
          "Nothing satisfies it; a fortiori nothing uniquely satisfies it; a thought 'about' it is the entertaining of a false existence-claim that nothing satisfies.",
        explanation:
          "Every integer greater than 1 has at least one prime factor, so the existence-claim $\\exists n\\,(n>1 \\wedge \\text{HasNoPrimeFactors}(n))$ is false and is satisfied by nothing. Having a 'non-existent object' means, so far as it is coherent, having for one's content an existence-claim nothing satisfies — no impossible number is grasped.",
      },
    ],
  },

  // ───────────── Week 3 — Unit Test ─────────────
  {
    kind: "test",
    title: "Week 3 Test — Analysis, ontology, and the non-analytic method",
    weekNumber: 3,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed. 30 minutes. Math keyboard available; pasting is disabled. Apply each principle to the fresh case given. Write compact symbolic answers using the on-screen keyboard, with brief justification where asked.",
    problems: [
      {
        topicSlug: "u3-analysis-vs-ontogenesis",
        prompt:
          "Regiment 'no bridge in the county carries freight trains' as a negated existential (predicates BridgeInCounty, CarriesFreight, or a single property P) and state, in one clause, what it really attributes to what.",
        correctAnswer:
          "¬∃x (BridgeInCounty(x) ∧ CarriesFreight(x)); it attributes to the property 'being a county bridge that carries freight trains' the property of being uninstantiated.",
        explanation:
          "The logical form is $\\neg\\exists x\\,(\\text{BridgeInCounty}(x) \\wedge \\text{CarriesFreight}(x))$. It says a property lacks instances; it posits no shadowy 'non-bridge.' Clarifying the statement removes any temptation to ontologize.",
      },
      {
        topicSlug: "u3-analysis-vs-ontogenesis",
        prompt:
          "A thinker explains the truth of 'nothing in the vault glows' by saying a featureless non-object that glows must be lurking in the vault. Name the method (one word) and give the regimentation that shows the posit is unnecessary.",
        correctAnswer:
          "Ontologizing; ¬∃x (InVault(x) ∧ Glows(x)).",
        explanation:
          "The move posits an entity not previously believed to exist, so it is ontologizing. The sentence merely says $\\neg\\exists x\\,(\\text{InVault}(x) \\wedge \\text{Glows}(x))$ — a property is uninstantiated — so no glowing 'non-object' is required.",
      },
      {
        topicSlug: "u3-when-to-ontologize",
        prompt:
          "From 'Aristotle and Kant were both philosophers who were prolific' a student concludes 'there is a property they share.' Symbolize the conclusion and state whether the inference is valid and what kind of object its truth forces into one's ontology.",
        correctAnswer:
          "∃F (F(Aristotle) ∧ F(Kant)); valid; it forces a property — an abstract, non-spatiotemporal object.",
        explanation:
          "Existential generalization on the predicate gives $\\exists F\\,(F(\\text{Aristotle}) \\wedge F(\\text{Kant}))$ from $F(\\text{Aristotle}) \\wedge F(\\text{Kant})$. The inference is undeniable, and the entity it compels is a shared property — abstract, never spatiotemporal.",
      },
      {
        topicSlug: "u3-when-to-ontologize",
        prompt:
          "A philosopher infers from 'courage exists' that courage must therefore have a temperature and a mass like other existing things. State whether the inference is valid and give the one-sentence correction.",
        correctAnswer:
          "Invalid; courage is an abstract object, so although its instances (courageous acts/people) are spatiotemporal, courage itself has no temperature, mass, or location.",
        explanation:
          "Existence does not entail spatiotemporal existence: the entities forced by analysis are always abstract. Instances of a property may have physical magnitudes, but the property itself does not — assigning it a temperature is a category mistake.",
      },
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "A diver hallucinates a golden shipwreck beneath her, though none exists. Give the existence-claim that is the content of her experience (predicates Below, Golden, Shipwreck over x) and state its truth-value with a one-clause reason.",
        correctAnswer:
          "∃x (Below(x) ∧ Golden(x) ∧ Shipwreck(x)); false, because nothing satisfies it.",
        explanation:
          "Perception is description, so the experience encodes $\\exists x\\,(\\text{Below}(x)\\wedge\\text{Golden}(x)\\wedge\\text{Shipwreck}(x))$. It is representational because it delivers a message, but the message is false since nothing satisfies the claim — no non-existent wreck is its object.",
      },
      {
        topicSlug: "u3-brentano-meinong",
        prompt:
          "To preserve 'every fear is a fear of something,' a theorist says a child's fear of a monster under the bed has a non-existent monster as its object. Symbolize the resulting commitment (Monster(x), Exists(x), Feared(x)) and state in one clause why it collapses.",
        correctAnswer:
          "∃x (Monster(x) ∧ ¬Exists(x) ∧ Feared(x)); it collapses because it asserts there exists a thing that does not exist.",
        explanation:
          "The commitment is $\\exists x\\,(\\text{Monster}(x) \\wedge \\neg\\text{Exists}(x) \\wedge \\text{Feared}(x))$, which says 'there is an $x$ that does not exist' — self-contradictory. Correctly analyzed, the fear's content is just the (here false) existence-claim $\\exists x\\,\\text{MonsterUnderBed}(x)$.",
      },
    ],
  },
];

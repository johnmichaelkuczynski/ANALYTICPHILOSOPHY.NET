import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 8 — The Sub-Disciplines of Analytic Philosophy
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u8-sub-disciplines-overview",
    title: "The sub-disciplines composing philosophy",
    weekNumber: 8,
    blurb: "Philosophy divides into overlapping branches, each charting the structure of a different family of categories.",
    lectureTitle: "8.0 The sub-disciplines composing philosophy",
    body: `# The sub-disciplines composing philosophy

Philosophy is the discipline that delineates the structures of the categories in terms of which we think. But the categories are many, and they cluster. **The main branches of analytic philosophy are:** the philosophy of mind, the philosophy of language, the theory of knowledge (also known as *epistemology*), philosophical logic, metaphysics, the philosophy of science, ethics, political philosophy, legal philosophy, the philosophy of religion, and formal logic.

Each branch is defined not by a separate *method* — the method is always conceptual analysis — but by the **family of categories** it takes as its object. The philosophy of mind takes the categories *belief, perception, consciousness, self*. Ethics takes *good, bad, right, wrong, obligation*. Metaphysics takes *possibility, necessity, cause, identity, existence, endurance*. And so on. A branch is a region of the single map.

## The branches overlap

It should be kept in mind that **these sub-disciplines overlap a great deal.** They are not sealed compartments. So, for example, the question

$$\\textbf{Do we think in words?}$$

belongs to the philosophy of mind (because it is a question about the nature of *thinking*) **and** to the philosophy of language (because it is a question about the relation between thought and *words*). A single question can sit in the intersection of two regions:

$$Q \\in (\\text{Mind} \\cap \\text{Language}).$$

This is the normal situation, not a pathology. Many of the deepest questions live precisely on the borders — the philosophy of science borders epistemology, ethics borders political philosophy, philosophical logic borders metaphysics. To classify a question is therefore not to assign it to *one and only one* box, but to identify which category-family its central terms belong to. When a question turns on two category-families at once, it is genuinely cross-disciplinary.

## How to locate a question

The practical test is simple. Ask: *what is the question ultimately a question about?* If it is about what makes a belief amount to knowledge, you are in epistemology. If it is about whether one statement could be true while another is false, you are in philosophical logic. If it is about whether an act is wrong, you are in ethics. The grammatical surface of the question is no guide — exactly as Frege taught us about sentences generally. "Can a machine think?" *looks* like an engineering question, but its content is about the category *thinking*, so it is philosophy of mind. The categories the question turns on, not its wording, fix its discipline.

In what follows we survey the branches one by one, giving for each the characteristic *questions* — for the questions are the discipline. A branch of philosophy just *is* the set of questions that probe a particular family of categories.`,
  },
  {
    slug: "u8-philosophy-of-mind",
    title: "The philosophy of mind",
    weekNumber: 8,
    blurb: "The branch that analyzes the concepts in terms of which the mind is understood.",
    lectureTitle: "8.1 The philosophy of mind",
    body: `# The philosophy of mind

This discipline studies the **concepts in terms of which the mind is to be understood** — *thought, belief, perception, consciousness, the self, the relation of mind to brain.* Its target categories are mental categories, and its task, as always, is to make explicit the structure we use fluently but cannot readily describe.

## The characteristic questions

Among the questions the philosophy of mind tries to answer are these.

**Thought and language.** *Must one know a language in order to think?* Or, on the contrary, is the ability to think a **prerequisite** to learning and operating with a language? These are opposite orderings of dependence:

$$\\text{Think} \\to \\text{Language} \\qquad \\text{vs.} \\qquad \\text{Language} \\to \\text{Think}.$$

And, given that knowing a language seems to **enhance** some kinds of thinking, *how* does it do so? Note that this is a philosophy-of-mind question even though it mentions language: its subject is the *capacity to think*.

**The nature of belief.** *What are beliefs?* And what is the difference between **believing that** Smith is tall and merely **wondering whether** he is tall? Both mental states have the same content — that Smith is tall — yet they are utterly different attitudes toward that content. The difference between asserting attitude and questioning attitude is one of the discipline's central problems.

**Perception and thought.** *How is perception related to thought?* In particular: *can perceptual content* — what our eyes, ears, and so on tell us — *be put into words?* Or is there a **fundamental difference** between the kind of information our sense-perceptions bear and the kind of information that can be encoded in sentences? If the eye delivers a message of a different logical type from a sentence, no translation between them can be complete.

**Self-knowledge.** *To what extent is self-knowledge possible?* What factors **limit** our ability to know ourselves? Recall that a mind whose primary function was self-scrutiny would be incoherent; so self-knowledge is always derivative and hard-won.

**Mind and brain.** *How is mind related to brain? Are they one?* If not, what is the relationship between the two? And *can there be unconscious mental activity* — mental events of which the subject is in no way aware?

## Why these all belong together

What unifies this list is not a common method but a common subject-matter: every one of these questions probes a category we deploy in describing **minds**. Whether the question concerns thinking, believing, perceiving, knowing oneself, or the mind-brain link, its central term is a mental term. That is what makes it philosophy of mind — and that is also why some of its questions (e.g. "do we think in words?") bleed into the philosophy of language, whose subject is the neighboring family of categories.`,
  },
  {
    slug: "u8-philosophy-of-language",
    title: "The philosophy of language",
    weekNumber: 8,
    blurb: "The branch that analyzes the nature of linguistic meaning, reference, and logical form.",
    lectureTitle: "8.2 The philosophy of language",
    body: `# The philosophy of language

This discipline studies the **nature of linguistic meaning** — what it is for a string of marks or sounds to *say* something. Its target categories are *meaning, reference, sense, logical form, literal vs. communicated content.*

## Reference and compositionality

*What does it mean to say that "Smith" refers to Smith?* What, in general, does it mean to say of an expression $E$ that it **picks out** some object $O$? The reference relation, written

$$\\text{Refers}(E, O),$$

looks primitive but is anything but.

And *how do the meanings of a sentence's parts relate to the meaning of the sentence as a whole?* This is the problem of **compositionality**: the meaning of a complex expression is determined by the meanings of its constituents and the way they are combined.

## Quantifier-words vs. names

*Do expressions like "some person," "all people," and "no people" function in the same way as proper names* (e.g. "Smith," "Jones") — that is, do they pick out objects? Or do they function in some **other** way, and if so, what way? This is the very question Frege answered: quantifier-phrases do not name objects but say of a property that it is instantiated, $\\exists x\\,\\varphi(x)$, universally satisfied, $\\forall x\\,\\varphi(x)$, or uninstantiated, $\\neg\\exists x\\,\\varphi(x)$.

Relatedly: *to what extent can the nature of linguistic meaning **in general** be understood in terms of the relationship that proper names bear to their referents?* Is naming the master-relation from which all meaning is built, or only a special case?

## Meaning without existing objects

*How is it that statements about non-existent things can be meaningful?* A sentence can carry content even when nothing answers to its terms — the puzzle the analytic tradition solves by treating the content as a (perhaps false) existence-claim rather than as a relation to a ghostly object.

## Meaning, thought, and grammar

*How is the meaning of a sentence related to the thoughts of those who utter it?* Do the thought and the meaning **coincide**, or is the relationship more indirect? *How well does the grammatical structure of a sentence reveal what it actually says?* **Does grammar distort meaning**, or is grammar a good guide to logical form? The whole Fregean tradition begins from the answer "grammar distorts."

## Rules, the inner code, and transparency

*Are the semantic rules of a language* — e.g. that in English "snow" refers to a certain crystalline substance — *known to speakers*, or are they merely **idealized descriptions** of speakers' behavior? Assuming there is an innately known, language-like **code in which we think**, to what extent does that code resemble the languages (English, Spanish) we learn?

*How "transparent" is meaning?* To what extent do users of a language actually know what its sentences mean? And finally: *what does it say of a sentence $S$ that its **literal** meaning is $P$?* What exactly is literal meaning, and how does it differ from **communicated** meaning? Is literal meaning just an idealized description of communicated meaning, or something else entirely?

## The throughline

Each question above turns on the category of *meaning* or one of its relatives (reference, sense, logical form). That is the signature of the philosophy of language — and its border with the philosophy of mind (thought, the inner code) and with philosophical logic (logical form, entailment) is precisely where its questions overlap with those neighbors.`,
  },
  {
    slug: "u8-epistemology",
    title: "Epistemology",
    weekNumber: 8,
    blurb: "The branch that analyzes the nature, extent, and structure of knowledge.",
    lectureTitle: "8.3 Epistemology",
    body: `# Epistemology

This discipline — the **theory of knowledge** — studies the *nature and extent of knowledge*. Its target categories are *knowledge, justification, evidence, self-evidence.* Writing $K(a,p)$ for "$a$ knows that $p$," epistemology asks what conditions a belief must satisfy to fall under $K$, and how far $K$ can reach.

## What knowledge is

*What is knowledge?* What **separates** those beliefs that are knowledge from those that are not? A true belief held by luck or guesswork is not knowledge; the discipline tries to say what the missing ingredient is.

## The extent of knowledge

*What can be known and what cannot?* Strikingly: *can it be known what cannot be known* — or is it **incoherent** to give an affirmative answer to that question? (To know that $p$ cannot be known would seem to require knowing something about $p$ that bears on its knowability.)

*Can we know about the **future**, the **past**, the **possible but not actual**, the **impossible**?* Each domain raises its own difficulty: the future has not happened, the past is gone, the merely possible never occurs, the impossible cannot.

*Can we know about the **external world**, or is knowledge confined to our own mental states?* And can there be knowledge of things **not in space or time** — e.g. numbers — and if so, how? We never bump into the number two; yet we seem to know a great deal about it.

## The structure of knowledge

*Are there any **self-evident** or **self-justifying** beliefs?* Or must every justified belief be justified by beliefs **other than itself**? Symbolically, is the justification relation $J(q, p)$ ("$q$ justifies $p$") ever reflexive, $J(p,p)$, or always irreflexive?

*What is the structure of the totality of our knowledge?* Are there foundational pieces from which all the rest are **derived** (foundationalism), or are all pieces **interdependent** (coherentism)? This is the question of whether our knowledge is a building with a base or a web with no privileged thread.

## Two kinds of knowledge

*Is there a fundamental difference between knowledge of **spatiotemporal fact*** — e.g. that there is a dog over there — *and knowledge of **purely conceptual truths*** — e.g. that there are laws only where there is government? Or is one kind to be **reduced to**, or modeled on, the other? The dog must be observed; the truth about laws and government need only be *understood*. Whether these are two species of one genus, or two genera, is a foundational dispute.

## The throughline

Every question here turns on the category *knowledge* (or its relatives, justification and evidence). Where it asks about knowledge of *the possible* or *the conceptual*, it borders metaphysics and philosophical logic; where it asks about knowledge of *the external world via the senses*, it borders the philosophy of mind. But its defining preoccupation is always: *what is it to know, and how far can knowing go?*`,
  },
  {
    slug: "u8-philosophical-logic",
    title: "Philosophical logic",
    weekNumber: 8,
    blurb: "The branch that analyzes the bearing-relations — entailment, consistency, modality — among propositions.",
    lectureTitle: "8.4 Philosophical logic",
    body: `# Philosophical logic

This discipline studies the **bearing-relations** holding among sentences and propositions (sentence-meanings) — above all *entailment, consistency, and modal status.* Its target categories are *entailment, validity, possibility, truth-value.*

## Entailment

*What is it for one statement to **entail** another?* The basic idea:

$$P \\text{ entails } Q \\quad\\Longleftrightarrow\\quad \\text{there is no way that } Q \\text{ can be false if } P \\text{ is true},$$

i.e. $\\neg\\Diamond(P \\wedge \\neg Q)$, equivalently $\\Box(P \\to Q)$. *Are there **different kinds** of entailment?* And if so, are some more central to reasoning than others?

## The non-existent in inference

*Are inferences concerning the **non-existent*** — e.g. "if Zeus is tall, then at least one god is tall" — *to be modeled on inferences concerning the **existent*** — e.g. "if Bush is tall, then at least one president is tall"? Are the **same principles** involved in both? Or is the non-existent logically *sui generis*? The two inferences share a form,

$$\\varphi(a) \\;\\vdash\\; \\exists x\\,\\varphi(x),$$

and the question is whether that form is genuinely indifferent to whether $a$ exists.

## Mechanizing reasoning

*To what extent can reasoning be **mechanized**?* That is, to what extent is it possible to produce **rules** that can be applied **without any thought** and yet do the work of a rational being? This is the philosophical question lying behind formal proof systems and, ultimately, computation.

## Counterfactuals and the merely possible

*How are statements about **what might have been, but is not**, to be understood?* Are they similar, logically, to statements about what *is*? Or do they have an **altogether different logical form**? A statement about a non-actual possibility cannot be a straightforward report of fact, since there is no such fact; so its logical form is in question.

## Bivalence and degrees of truth

*Are all statements either **true or false**?* Or are some **indeterminate** — is there a "**gray zone**"? And are there **degrees** of truth, so that a statement might be true to degree $0.7$ rather than flatly true or flatly false? Classical logic answers $\\text{True}(S) \\vee \\text{False}(S)$ for every $S$; this discipline asks whether that is right.

## The throughline

Philosophical logic is unified by its subject: relations *between* propositions and the modal facts ($\\Box$, $\\Diamond$) that underwrite them. Because consistency and entailment are **non-observational** — no experiment reports $\\neg\\Diamond(S_1 \\wedge S_2)$ — the discipline is purely conceptual. Its questions about the merely possible border metaphysics; its questions about mechanizing inference border formal logic.`,
  },
  {
    slug: "u8-metaphysics",
    title: "Metaphysics",
    weekNumber: 8,
    blurb: "The branch that analyzes possibility, necessity, causation, identity, endurance, and existence.",
    lectureTitle: "8.5 Metaphysics",
    body: `# Metaphysics

This discipline studies the nature of **possibility and necessity**, of **causal relations** between objects, of **identity**, and of the **conditions something must meet in order to exist.** Its target categories are *possible, necessary, actual, cause, identity, part, endurance, existence.*

## Composition and parthood

*Under what circumstances are two distinct objects* — e.g. my heart and my liver — *both **parts of some one thing**?* What makes scattered or separate items add up to a single whole? This is the **special composition question**.

## Endurance through time

*What is it for an **inanimate** object to endure in time?* And *what is it for an **animate** object* — e.g. a person — *to endure in time?* The two may have different identity-conditions: a person's persistence may require psychological continuity that a rock's does not.

## Fictional objects

*Is there a sense in which **fictional objects*** — e.g. Fred Flintstone — *exist?* Or is there **no need** to assume the existence of such things to account for the facts of experience? The analytic instinct is to dispense with them by analysis rather than admit them into the ontology.

## The modal categories

*What is it for something to be **possible but not actual**?* What is it for something to be **actual but not necessary**? What is it for something to be **necessary**? These three statuses,

$$\\Diamond p \\wedge \\neg p, \\qquad p \\wedge \\neg\\Box p, \\qquad \\Box p,$$

are the core subject-matter of metaphysics.

And a question one level up: *are necessity and possibility properties of **objects*** (rocks, trees, people) *or of **statements**?* That is, does $\\Box$ attach to things or to propositions? *Are there things that are **not in space or time**?* (We have already met candidates: properties, propositions, numbers.)

## Causation and existence

*Must things have **causal properties** in order to exist?* Is being a possible cause-or-effect a condition on existing at all — so that a thing with no causal powers whatever would thereby fail to exist?

## The throughline

Metaphysics is the study of the most general conditions on *being anything at all*: being possible, being actual, being one thing, being the same thing over time, being a cause, being an existent. Its modal questions ($\\Box$, $\\Diamond$) border philosophical logic; its question whether modality attaches to objects or to statements is exactly where the two disciplines meet.`,
  },
  {
    slug: "u8-philosophy-of-science",
    title: "The philosophy of science",
    weekNumber: 8,
    blurb: "The branch that analyzes the logical structure of scientific inquiry and its results.",
    lectureTitle: "8.6 The philosophy of science",
    body: `# The philosophy of science

This discipline studies the **logical structure of scientific endeavor and of its results** — explanation, theory-choice, measurement, probability, theoretical entities, confirmation, determinism, realism. Its target categories are *scientific, explanation, theory, evidence, probability, law.*

## Demarcation and explanation

*What is the difference between statements that are **scientific** and those that are **not**?* (The demarcation problem.) And *what are **explanations**? What is it to **explain** an event?* To explain is not merely to predict; the discipline asks what the extra ingredient is.

## Theory-ladenness

*Is there a **sharp distinction** between theoretical and non-theoretical claims?* Or, as some claim, are **all** statements — even basic ones, e.g. "that's a rock" — "**theory-infected**," so that there is no observation untouched by interpretation?

## Theory-choice and its virtues

*Given two rival theories, how is it to be determined which, if either, is the **more accurate**?* And supposing one is more accurate, does it follow that it is the **better** one? In other words: is accuracy the **only** virtue a theory can have — or, if not the only one, the most important? Are theories to be evaluated **entirely** by their degree of agreement with the experimental data, or are **other factors** (e.g. **simplicity, comprehensiveness**) involved? Judging a theory *correct* and judging it *good* may come apart.

## Measurement

*What is the nature of **measurement**?* Are there any reasons, **other than convenience**, for taking certain objects or events as **standards**? To use Hempel's (1952) example: is one **wrong** to take the Dalai Lama's heartbeat as a periodic process, or is it merely **inconvenient** to do so?

## Probability

*What is the nature of **probability**?* What does it mean to say there is a 50% chance the coin will come up heads,

$$P(\\text{heads}) = \\tfrac{1}{2}?$$

Is probability just "**a measure of ignorance**," as Laplace (1749–1827) said? Or is it an **objective fact** about the world?

## Theoretical entities and explanatory unity

*Do **theoretical entities*** — e.g. protons, unconscious urges — *exist in the same way as **non-theoretical** entities?* Or are they merely **devices** we use to make sense of the observable, so that statements about protons are abbreviated statements about **meter readings**? And: *is there a fundamental difference between explanation in the **physical** sciences and explanation in the **psychological** sciences?*

## Confirmation and rejection

*Under what circumstances is a **hypothesis** to be rejected?* Is a **single** disconfirmatory result enough? If not, what else is needed? A lone anomaly rarely sinks a theory; the discipline asks why, and when it should.

## Determinism

*Must all theories be **deterministic*** — must they posit a rigid causal order? **Einstein** said yes; **Peirce** (1839–1914) said no. **Ernest Nagel** (1901–1985) says the question is **ill-formed**: whether a system is deterministic depends on **how it is described**. On Nagel's view determinism is a **logical property of statements**, not of the events they describe. A consequence: a domain may be deterministic under one description and indeterministic under another. The sub-atomic realm, Nagel says, is indeterministic with respect to the concepts of the **macroscopic** realm — but it does not follow that it is indeterministic *tout court*.

## Realism

*Should science attempt to state **how the world actually is**?* (**Karl Popper** says yes.) Is that even **possible**? (**Kant** says no.) Or should science confine itself to producing theories merely **consistent with the data**, leaving open whether the models are correct? (**Bas van Fraassen** says yes.) A **model**, here, is a description of a hypothetical structure that, if it existed, would account for the relevant data.

## The throughline

Each question dissects the *logic* of inquiry — what counts as explanation, evidence, confirmation, a theoretical posit — rather than reporting any first-order scientific fact. Its questions about confirmation and theoretical posits border epistemology and metaphysics; its question about psychological explanation borders the philosophy of mind.`,
  },
  {
    slug: "u8-ethics",
    title: "Ethics",
    weekNumber: 8,
    blurb: "The branch that analyzes good and bad, right and wrong, and the status of moral claims.",
    lectureTitle: "8.7 Ethics",
    body: `# Ethics

This discipline studies the **nature of good and bad, right and wrong.** Its target categories are *good, bad, right, wrong, obligation.* Recall that we are supremely confident in particular moral judgments (that cruelty is wrong, that charity is good) yet helpless to *state* the principles behind them; ethics lives in that gap.

## What makes an act good or bad

*What is it for an act to be **good**, and what is it for an act to be **bad**?* This is the first-order question of the discipline: not which acts are good, but what *goodness* and *badness* are.

## Relativism

*Are there **absolute** standards of goodness and badness, or do such standards **vary from culture to culture**?* If $\\text{Good}(a)$ is always implicitly $\\text{Good\\text{-}in\\text{-}culture}(a, c)$, then there is no culture-independent fact of the matter.

## Moral realism and error

*Are there **in fact** such things as right and wrong?* And *are any of our beliefs about rightness and wrongness **correct***, or are **all** our ethical beliefs **illusions** of some kind? This is the question of whether morality describes anything real (realism) or whether the entire practice rests on a mistake (the **error theory**).

## The is–ought relation

*How are **ethical** statements* — e.g. "killing is wrong" — *related to **non-ethical, purely descriptive** statements* — e.g. "killing tends to undermine social order"? Can an *ought* be derived from an *is*? The descriptive claim states a consequence; the ethical claim issues a verdict, and whether the second follows from the first is the famous is–ought problem.

## The scope of obligation

*To what extent can one have ethical obligations toward **oneself**?* And *does one have ethical obligations toward **others***, or should one be concerned only for oneself? Relatedly: *to what extent, if any, is it **in one's interest** to act morally?* Whether morality and self-interest ultimately coincide, or can pull apart, is a central question of the discipline.

## The throughline

Every question here turns on an evaluative category — *good, bad, right, wrong, obligation.* Where ethics asks about the rightness of *laws* or the duties of *governments*, it borders political philosophy; where it asks how moral claims relate to descriptive ones, it borders the philosophy of language and logic. But its defining concern is always the structure of value itself.`,
  },
  {
    slug: "u8-political-philosophy",
    title: "Political philosophy",
    weekNumber: 8,
    blurb: "The branch that analyzes law, government, legitimacy, and the conditions of just institutions.",
    lectureTitle: "8.8 Political philosophy",
    body: `# Political philosophy

This discipline studies the **nature of law and government.** It tries to identify the **conditions under which laws and other political institutions are legitimate.** Its target categories are *law, government, legitimacy, right, justice, freedom* — and it absorbs **legal philosophy**, the study of what law is.

## What a law is

*What is a **law**?* And — the question that exposes the category — *what is the difference between a law and, for example, a **gunman's threat**?* Both demand compliance under penalty; yet a law purports to **obligate** in a way a mere threat does not. Pinning down that difference is the foundational problem of legal philosophy.

## What a government is

*What is a **government**?* And *what is the difference between a government and, for example, the **Mafia**?* Both wield organized coercive power over a territory; the question is what, if anything, makes the one **legitimate** and the other merely powerful.

## Legal vs. ethical rights

*How are **legal** rights related to **ethical** rights?* A legal right is conferred by a system of rules; an ethical right is not. Whether legal rights must answer to ethical ones — and whether they can diverge — is a central question, and the point where political philosophy meets ethics.

## Evil legal systems

*Can there be legal systems that are **entirely evil**, or must something embody **at least a minimum of morality** to qualify as a legal system at all?* This is the dispute between legal positivism (law and morality are separable) and natural-law theory (a maximally unjust "law" is no law).

## Disobedience and the limits of power

*Under what circumstances, if any, is one **ethically entitled to break the law**?* And, from the other side: *under what circumstances, if any, does a government have the **right to thwart the interests of its subjects**?* Both questions probe the limits of political authority.

## Justice and freedom

*What is the **most just form of government**?* And *which kinds of **freedoms** ought a government to **protect**?* These are the constructive questions of the discipline: not merely what law and government *are*, but what they *ought* to be.

## The throughline

Political philosophy is unified by the categories *law, government, legitimacy.* Because so many of its questions ("how are legal rights related to ethical rights?", "can a legal system be entirely evil?") turn on **moral** notions, it overlaps heavily with ethics — yet it remains a distinct branch because its primary objects are the *institutional* categories of law and the state.`,
  },
  {
    slug: "u8-philosophy-of-religion",
    title: "The philosophy of religion",
    weekNumber: 8,
    blurb: "The branch that analyzes the nature and existence of God and the justification of religious belief.",
    lectureTitle: "8.9 The philosophy of religion",
    body: `# The philosophy of religion

This discipline studies the **nature and existence of God** and the **conditions under which religious belief is justified.** Its target categories are *God, omniscience, omnipotence, the divine, faith, the meaning of life.*

## The problem of evil

*If there is a God, why do **bad things** happen?* If God is all-good and all-powerful, the existence of suffering seems to count against His existence — the oldest and sharpest difficulty in the field.

## Puzzles about omniscience and omnipotence

*Given that God, being **invulnerable**, cannot know what it is like to be **vulnerable**, how can God know **everything**?* There seems to be a kind of knowledge — knowledge of vulnerability "from the inside" — that an invulnerable being is barred from. This is a structural puzzle about the very concept of omniscience.

## Foreknowledge, free will, and justice

*If God knows everything, **including what we will do**, how can we have **free will**?* If our actions are foreknown, they seem fixed in advance. And *if God is responsible for everything, how can we be **justly punished** for what we do?* Divine foreknowledge and divine responsibility both threaten human moral accountability.

## The concept and existence of God

*Does God have a **gender**?* Does it make sense to say God is male as opposed to female? And the central question: *Is there a God?* If so, *how is that to be **established**?*

## Religious knowledge

*Is religious knowledge acquired in the **same way** as non-religious knowledge, or are **different cognitive vehicles** involved?* And once acquired, is it to be **justified** in the same way as non-religious knowledge, or are **different standards** involved? Here the philosophy of religion borders epistemology directly.

## Religion and morality

*What is the relationship between **religion and morality**?* Can there be **valid moral codes in a Godless world**? Can a genuinely religious person believe that **God herself is bound by ethical principles** — or, in holding that God is so bound, is one **undermining God's authority** and thereby abandoning a religious outlook? This is a sharp dilemma about whether the good is prior to God or God prior to the good.

## Meaning and the after-life

*Is acceptance of some kind of religion **necessary for a meaningful life**?* And a pointed puzzle: *if there is an after-life of **never-ending bliss**, wouldn't we get **bored**?* Does **fulfillment require adversity**? Isn't **struggle** what gives life meaning? An eternity without obstacles may be self-undermining.

## The throughline

The philosophy of religion is unified by the category *God* and its attributes (omniscience, omnipotence, invulnerability). But notice how its questions reach into the neighbors: foreknowledge-and-free-will borders metaphysics and philosophical logic; "how is religious belief justified?" borders epistemology; "can there be morality without God?" borders ethics.`,
  },
  {
    slug: "u8-formal-logic",
    title: "Formal logic",
    weekNumber: 8,
    blurb: "The branch that studies formal truth: open-sentences, interpretations, formalization, and its limits.",
    lectureTitle: "8.10 Formal logic (mathematical logic, symbolic logic)",
    body: `# Formal logic (a.k.a. mathematical logic, a.k.a. symbolic logic)

*(What follows is compressed and may be skipped on a first reading.)* This discipline studies **formal truth**. We give the basic idea here.

## The core definitions

**$S_2$ formally follows from $S_1$** if the sentence ⟨if $S_1$, then $S_2$⟩ is **formally true**.

A sentence is **formally true** if **every sentence of the same form is true.**

A sentence **has the same form** as a given sentence if there is some **open-sentence** of which both are instances.

An **open-sentence** is a sentence-like expression that contains a **free variable** and is thus **neither true nor false**. (Synonyms: *statement-form*, *sentence-schema*.) An open-sentence is formed by taking an actual sentence and replacing one of its expressions with a variable. "Two is even" is an actual sentence; replace "two" with a variable and you get the open-sentence ⟨$x$ is even⟩.

An **instance** of a sentence-form is what results when its variables are replaced with **constants**. So "two is even" and "five is even" are instances of ⟨$x$ is even⟩.

To **interpret** an open-sentence is to replace its variables with constants; an **interpretation** is an assignment of constants to the variables. Consider ⟨$x$ has property $\\varphi$⟩. Proposing that "two" and "even" replace the variables is *one* interpretation of it. Since the corresponding sentence ("two is even") is correct, that interpretation **validates** the open-sentence. In general, an interpretation **validates** an open-sentence if the corresponding sentence is correct.

Not every interpretation validates. The interpretation of ⟨$x$ has property $\\varphi$⟩ that yields "two is odd" **fails** to validate it.

If an open-sentence is validated by **every** interpretation, then each instance of it is formally correct — coinciding with our definition of "formally correct." Such an open-sentence is said to be **"true under all its interpretations"** — though this is a *figure of speech*, since open-sentences are not, in fact, true.

## The three categories of statement-form

Statement-forms fall into three kinds:

1. those whose instances are **sometimes but not always** correct — e.g. ⟨$x$ is even⟩;
2. those whose instances are **always false** — e.g. ⟨$x$ is even but not divisible by two⟩;
3. those whose instances are **always correct** — e.g. ⟨$x$ is identical with $x$⟩.

Correspondingly, an open-sentence is true under (1\\*) **some but not all**, (2\\*) **none**, or (3\\*) **all** of its interpretations.

## Formalizing informal analytic truth

Formal logic tries to **formalize informal analytic truth**, so far as that is possible, and to say when it is not.

An **analytic truth** is one whose negation is incoherent. It is **informal** if it has the same form as some **false** statement. Thus "triangles have three sides" is analytic (its negation is incoherent) and informal (it shares its form with "squares have three sides"). To **formalize** an informal analytic truth $T$ is to find an open-sentence $S$ such that every instance of $S$ is true and one of $S$'s instances is **equivalent** with $T$.

Worked example. Take:

- **(1)** Bill is self-identical. — analytic, since its negation **(2)** "Bill is not self-identical" is incoherent.
- But (1) is **not formally correct**, since it shares its form **(4)** ⟨Bill has $\\varphi$⟩ with **(3)** "Bill is green," which is false (Bill is a non-green person). Some instances of (4) are false, so (1), though analytically true, is not *formally* true.
- (1) is, however, **equivalent** with a formal truth: **(5)** "Bill is identical with Bill," an instance of the form **(6)** ⟨$x$ is identical with $x$⟩. No instance of (6) is false, so (5) is formally true.

In moving from (1) to (5)–(6) we **formalized an informal analytic truth** — exactly what mathematical logicians do, only on a vast scale.

## Statements that turn out to be forms: the Euclid case

Two deeply important facts emerged when, in the mid-19th century, Euclid's geometry was re-examined: **what we take to be bona fide statements sometimes turn out to be statement-forms**, and **statement-forms we take to have only true instances sometimes turn out to have false ones.**

Euclid derived geometry from five assumptions:

1. Any two points can be connected by a straight line-segment.
2. Any line-segment is a part of some line.
3. Given a point and a line-segment starting from it, there is a circle whose radius is that segment's length.
4. All right-angles are equal to each other.
5. Given a line $L_1$ and a point $P$ not on $L_1$, there is **exactly one** line $L_2$ through $P$ that does not intersect $L_1$ — the **parallel postulate**.

Write "(1)–(5)" for the conjunction; it is a **single** open-sentence (a singular noun). One would think (1)–(5) is **correct**. It is not — it turned out to be a **statement-form**, neither true nor false, and **some of its instances are false.**

Here is a false instance. Let $S$ be a sphere. Given any point on $S$'s surface, there is a path from that point back to itself that cuts $S$ into two symmetrical halves. **Redefine "line" to mean such a path** and adjust (1)–(4) accordingly: then (1)–(4) come out true, but (5) comes out **false**, for such a "line" has **zero** parallels through an external point, not one.

Many say this shows the parallel postulate is **not true of every possible space**. That is **not** what it shows. The parallel postulate is not true or false *of* anything — it is a statement-form. The right conclusion is that **there are possible spaces partly described by sentences that are negations of instances of the parallel postulate.** Under the Euclidean meanings of "space" and "line," a triangle's interior angles sum to $180°$; under the spherical meaning, the sum may be anything **greater than $180°$ and less than $360°$** — the larger the triangle, the greater the sum.

In (1)–(5), then, **"line" and "space" function as variables, not constants.** The objection "but a *space* isn't the surface of a sphere, and a *line* isn't such a path, so you've merely *misinterpreted* (1)–(5)" begs the question: in insisting that ⟨$x$ is a space⟩ entails $x$ is not a sphere's surface, one is **presupposing the very principles (1)–(5) were meant to establish** (e.g. that triangles sum to $180°$). One cannot, without invalidating the attempt to *ground* geometry in (1)–(5), simply assume "line" and "space" must be Euclidean.

So (1)–(5) is an open-sentence **not true under all its interpretations** — some interpretations validate it, others do not. Formal logicians seek open-sentences true under **all** their interpretations (only thus can they formalize analytic truth); along the way they keep finding ones, like (1)–(5), that they had hoped were universally valid but are not. For such an $S$ they try to characterize, as precisely as possible, **what all the validating interpretations of $S$ have in common** that the non-validating ones lack — a general account of "truth under $S$."

## What cannot be formalized: arithmetic

Some classes of truths one would expect to be formalizable turn out **not** to be. **Arithmetical truth cannot be formalized.**

First, arithmetical statements as ordinarily written are **not formally true**: "$2 + 2 = 4$" shares its form ⟨$x + x = y$⟩ with "$2 + 2 = 5$," which is false; so "$2+2=4$," though true, is not *formally* so.

To formalize arithmetic would be to find an open-sentence $S$ and an interpretation under which **every** true arithmetical statement is a formal consequence and **no** false one is. This turned out to be **impossible**: any formal characterization of arithmetic is either **inconsistent** (it entails a contradiction) or **incomplete** (some arithmetical truth is not a consequence of it). Given a body of truths that *looks* formalizable, mathematical logicians try to prove whether it is — and, if it is, to find a **model** for it.

## The throughline

Formal logic is the precise, mathematical heart of philosophical logic: where philosophical logic studies the *informal* bearing-relations (entailment, consistency), formal logic studies *formal truth* — truth in virtue of form alone — together with the **limits** of formalizing the informal.`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Week 8 — Homework 8.1 ─────────────
  {
    kind: "homework",
    title: "Homework 8.1 — Locating questions among the branches",
    weekNumber: 8,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "For each fresh question or scenario below, decide which sub-discipline (or, where genuine, which intersection of two) it belongs to, and justify your answer by naming the category-family its central terms turn on. Apply the principle that a question's discipline is fixed by the categories it probes, not by its grammatical surface. Use the math keyboard for any symbols (∩, →, □, ◇, ∀, ∃).",
    problems: [
      {
        topicSlug: "u8-sub-disciplines-overview",
        prompt:
          "Classify the question, and justify: \"When a child silently rehearses a plan, is the rehearsal carried out in the words of her native tongue, or in some prior medium of thought?\" Name the branch(es).",
        correctAnswer:
          "Philosophy of mind ∩ philosophy of language.",
        explanation:
          "The question turns simultaneously on the category *thinking* (a mental category — philosophy of mind) and on the relation of thought to *words* (a meaning category — philosophy of language). Because both category-families are essential to it, it lives in the intersection $\\text{Mind} \\cap \\text{Language}$, exactly like 'do we think in words?'",
        hint: "Identify every category-family the central terms belong to before assigning a single box.",
      },
      {
        topicSlug: "u8-epistemology",
        prompt:
          "Classify and justify: \"Could anyone be justified in believing a proposition solely on the strength of that very proposition, or must the support always come from some further belief?\"",
        correctAnswer:
          "Epistemology.",
        explanation:
          "The central terms are *justified* and *support among beliefs* — the question is whether the justification relation $J(q,p)$ can be reflexive, $J(p,p)$. That is the self-evidence/structure-of-knowledge problem, squarely within the theory of knowledge.",
        hint: "What category does 'justified' belong to?",
      },
      {
        topicSlug: "u8-metaphysics",
        prompt:
          "Classify and justify: \"A wooden ship has every plank gradually swapped for steel; is the ship at the end the very same ship that set out?\"",
        correctAnswer:
          "Metaphysics.",
        explanation:
          "The central category is *identity through time* — the conditions under which an object endures and remains the same object. Persistence and identity-conditions are the defining subject-matter of metaphysics.",
        hint: "Is the question about knowledge of the ship, or about what it is for the ship to remain one thing?",
      },
      {
        topicSlug: "u8-philosophy-of-science",
        prompt:
          "Classify and justify: \"Two cosmological models fit the data equally well, but one is far simpler; is the simpler one thereby the better theory, or only the more convenient?\"",
        correctAnswer:
          "Philosophy of science.",
        explanation:
          "The question concerns *theory-choice* and whether virtues beyond data-agreement (here, **simplicity**) bear on which theory is better — a core question about the logical structure of scientific evaluation, not a first-order scientific result.",
        hint: "It is about how theories are judged, not about any particular fact of cosmology.",
      },
      {
        topicSlug: "u8-philosophical-logic",
        prompt:
          "Classify and justify: \"From 'Sherlock Holmes is a detective,' does it follow that at least one detective is fictional, and is that inference governed by the same rule as inferences about real people?\"",
        correctAnswer:
          "Philosophical logic.",
        explanation:
          "The question is whether the inference-form $\\varphi(a) \\vdash \\exists x\\,\\varphi(x)$ applies uniformly to the non-existent as to the existent — a question about *entailment* and whether the non-existent is logically sui generis. That bearing-relation between propositions is the province of philosophical logic.",
        hint: "What kind of relation between statements is in question — and does existence of the subject matter to it?",
      },
      {
        topicSlug: "u8-ethics",
        prompt:
          "Classify and justify: \"Granting that a society's members all approve of a practice, does it follow that the practice is genuinely good, or only that it is locally endorsed?\"",
        correctAnswer:
          "Ethics (the relativism question).",
        explanation:
          "The central category is *goodness* and whether its standards are absolute or vary by culture — i.e. whether $\\text{Good}(a)$ reduces to $\\text{Good-in-culture}(a,c)$. That is the ethical question of relativism.",
        hint: "Is the term being analyzed an evaluative one?",
      },
      {
        topicSlug: "u8-formal-logic",
        prompt:
          "Classify and justify: \"The string 'n + n = m' is neither true nor false until its letters are replaced by numerals; what is the technical name for such an expression, and which discipline studies the conditions under which all its replacements come out true?\"",
        correctAnswer:
          "Formal logic; the expression is an open-sentence (statement-form / sentence-schema).",
        explanation:
          "An expression with a free variable that is thus neither true nor false is an **open-sentence**; the study of when an open-sentence is true under all its interpretations — i.e. formally true — is formal logic. The question turns on the categories *open-sentence* and *formal truth*.",
        hint: "A schema with a free variable that is neither true nor false has a special name.",
      },
    ],
  },

  // ───────────── Week 8 — Homework 8.2 ─────────────
  {
    kind: "homework",
    title: "Homework 8.2 — Borderline cases and overlaps",
    weekNumber: 8,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "These scenarios are deliberately near the borders. For each, name the branch (or genuine intersection) and justify by isolating the category-family the question ultimately turns on. Remember that grammar is no guide and that overlap is normal, not a defect.",
    problems: [
      {
        topicSlug: "u8-philosophy-of-religion",
        prompt:
          "Classify and justify: \"If a perfect being already foresees every choice a person will make, in what sense are those choices still up to the person?\"",
        correctAnswer:
          "Philosophy of religion (bordering metaphysics/philosophical logic on free will).",
        explanation:
          "The central terms are a *perfect/foreknowing being* and *free choice under foreknowledge* — the foreknowledge-and-free-will problem about a divine being, the defining subject-matter of the philosophy of religion. It borders metaphysics and philosophical logic, but the divine attribute is what locates it.",
        hint: "The decisive term is the all-foreseeing being.",
      },
      {
        topicSlug: "u8-political-philosophy",
        prompt:
          "Classify and justify: \"An armed regime issues rules and punishes the disobedient exactly as an ordinary state does; what, if anything, makes the state's rules genuine laws and the regime's mere coercion?\"",
        correctAnswer:
          "Political (legal) philosophy.",
        explanation:
          "The question is precisely what distinguishes a *law* and a *legitimate government* from mere organized force — the law/threat and government/Mafia contrast. The categories *law* and *legitimacy* place it in political philosophy.",
        hint: "What is the difference between a rule that obligates and a threat that merely compels?",
      },
      {
        topicSlug: "u8-philosophy-of-language",
        prompt:
          "Classify and justify: \"When someone utters 'the present king of France is bald,' although no such king exists, the sentence still seems to mean something; which discipline is charged with explaining that?\"",
        correctAnswer:
          "Philosophy of language.",
        explanation:
          "The question is how a statement about a non-existent thing can still be *meaningful* — a question about the category *meaning*. That places it in the philosophy of language (its near-neighbor, metaphysics, would ask instead whether the king *exists*).",
        hint: "Is the puzzle about whether the king exists, or about how the sentence has content?",
      },
      {
        topicSlug: "u8-philosophy-of-science",
        prompt:
          "Classify and justify: \"A researcher insists that talk of electrons is merely shorthand for talk of dial-readings and cloud-chamber tracks; which sub-discipline does her claim belong to?\"",
        correctAnswer:
          "Philosophy of science.",
        explanation:
          "The claim concerns the status of *theoretical entities* — whether statements about electrons are abbreviated statements about meter readings, or whether such entities exist in their own right. That is the philosophy-of-science question about theoretical posits (bordering metaphysics on existence).",
        hint: "The term under scrutiny is a theoretical, unobservable posit.",
      },
      {
        topicSlug: "u8-philosophy-of-mind",
        prompt:
          "Classify and justify: \"Two people receive word-for-word the same news; one comes to believe it and the other merely to suspect it. Which discipline studies the difference between their two states, and what is that difference a difference in?\"",
        correctAnswer:
          "Philosophy of mind; it is a difference in propositional attitude (believing vs. wondering/suspecting), not in content.",
        explanation:
          "Both states share a content yet differ as *attitudes* toward it — the believing-vs-wondering contrast. The category at issue is *belief* (a mental category), so the question belongs to the philosophy of mind.",
        hint: "Same content, different stance toward it — which family does 'stance toward a content' belong to?",
      },
      {
        topicSlug: "u8-philosophical-logic",
        prompt:
          "Classify and justify: \"Some theorists hold that the claim 'the patient is recovering' need be neither flatly true nor flatly false but may hold to some intermediate degree. Which sub-discipline is this a thesis within?\"",
        correctAnswer:
          "Philosophical logic (bivalence / degrees of truth).",
        explanation:
          "The thesis denies that every statement is either true or false and proposes degrees of truth — a claim about *truth-value* and the bearing of bivalence, which is the subject-matter of philosophical logic.",
        hint: "It questions whether $\\text{True}(S) \\vee \\text{False}(S)$ holds for every $S$.",
      },
      {
        topicSlug: "u8-sub-disciplines-overview",
        prompt:
          "Classify and justify: \"Is the very project of carving philosophy into separate branches misleading, given that a single question can probe two category-families at once?\" Which observation about the branches does this rest on?",
        correctAnswer:
          "It rests on the fact that the sub-disciplines overlap; the right response is that classifying a question means identifying its category-family/families, which may be an intersection.",
        explanation:
          "The branches are not sealed boxes — they overlap a great deal, so a single question can fall in $\\text{A} \\cap \\text{B}$. Classification identifies which category-families a question turns on, and a genuine intersection is a correct, not a defective, answer.",
        hint: "Overlap is the normal case, not a flaw in the taxonomy.",
      },
    ],
  },

  // ───────────── Week 8 — Unit Test ─────────────
  {
    kind: "test",
    title: "Week 8 Test — The sub-disciplines of analytic philosophy",
    weekNumber: 8,
    isTimed: true,
    timeLimitMinutes: 40,
    instructions:
      "Timed test (40 minutes). For each fresh scenario, name the sub-discipline (or genuine intersection) and justify your verdict by isolating the category-family the question turns on. These scenarios are disjoint from the homeworks. Use the math keyboard for any symbols.",
    problems: [
      {
        topicSlug: "u8-epistemology",
        prompt:
          "Classify and justify: \"Can anyone genuinely know a truth about an event that has not yet occurred, or does the not-yet-existing status of the future make such knowledge impossible?\"",
        correctAnswer:
          "Epistemology (the extent of knowledge).",
        explanation:
          "The central category is *knowledge* and how far it can reach — here, to the future. Whether $K(a,p)$ is possible when $p$ concerns what has not yet happened is a question about the extent of knowledge, hence epistemology.",
        hint: "What category does 'know' belong to?",
      },
      {
        topicSlug: "u8-metaphysics",
        prompt:
          "Classify and justify: \"Do a swarm of bees and the individual bees composing it amount to two things or one, and under what conditions do several items make up a single object?\"",
        correctAnswer:
          "Metaphysics (composition / parthood).",
        explanation:
          "The question is when distinct objects are jointly parts of some one thing — the special composition question. The categories *part* and *one object* make this metaphysics.",
        hint: "When do many items add up to a single whole?",
      },
      {
        topicSlug: "u8-philosophy-of-language",
        prompt:
          "Classify and justify: \"Granting what each word in 'the old dog bit the young cat' means, what determines the meaning of the whole sentence built from them?\"",
        correctAnswer:
          "Philosophy of language (compositionality).",
        explanation:
          "The question is how the meanings of a sentence's parts relate to the meaning of the whole — compositionality, a question about the category *meaning*. That is the philosophy of language.",
        hint: "It is about how part-meanings yield whole-meaning.",
      },
      {
        topicSlug: "u8-philosophy-of-science",
        prompt:
          "Classify and justify: \"Should a single failed prediction be enough to discard a long-successful theory, or must more be required before rejecting it?\"",
        correctAnswer:
          "Philosophy of science (confirmation / hypothesis rejection).",
        explanation:
          "The question concerns the conditions under which a hypothesis is to be rejected and whether one disconfirming result suffices — a question about the logic of confirmation, hence philosophy of science.",
        hint: "It is about the logic of when evidence overturns a theory.",
      },
      {
        topicSlug: "u8-ethics",
        prompt:
          "Classify and justify: \"From the fact that lying erodes trust, can one validly derive that lying is wrong, or is a purely descriptive premise unable to yield an evaluative conclusion?\"",
        correctAnswer:
          "Ethics (the is–ought / fact–value relation).",
        explanation:
          "The question is how an *evaluative* claim ('lying is wrong') relates to a purely *descriptive* one ('lying erodes trust') — the is–ought problem. The presence of an evaluative category, *wrong*, places it in ethics.",
        hint: "Can an 'ought' be derived from an 'is'?",
      },
      {
        topicSlug: "u8-political-philosophy",
        prompt:
          "Classify and justify: \"Could a body of rules that is utterly unjust through and through still count as a legal system, or must any genuine legal system embody at least some morality?\"",
        correctAnswer:
          "Political (legal) philosophy.",
        explanation:
          "The question is whether an entirely evil system can qualify as *law* — the positivism vs. natural-law dispute. The category *legal system* (and its relation to morality) makes it political/legal philosophy.",
        hint: "It asks what it takes to be law at all.",
      },
      {
        topicSlug: "u8-philosophy-of-religion",
        prompt:
          "Classify and justify: \"A being said to be untouchable by harm is also said to know everything; can it know what suffering is like from the inside?\"",
        correctAnswer:
          "Philosophy of religion (a puzzle about omniscience).",
        explanation:
          "The question probes whether an *invulnerable, all-knowing* being can possess a kind of knowledge barred to the invulnerable — a structural puzzle about the concept of *omniscience*, hence the philosophy of religion.",
        hint: "The decisive terms are the invulnerable, all-knowing being.",
      },
      {
        topicSlug: "u8-philosophy-of-mind",
        prompt:
          "Classify and justify: \"Could there be mental processing going on in a person that the person is in no way aware of?\"",
        correctAnswer:
          "Philosophy of mind (unconscious mental activity).",
        explanation:
          "The question is whether there can be *unconscious mental activity* — mental events of which the subject is unaware. Its central category is *the mental*, so it belongs to the philosophy of mind.",
        hint: "What family does 'mental activity' belong to?",
      },
      {
        topicSlug: "u8-formal-logic",
        prompt:
          "Classify and justify: \"A schema turns into a truth under some replacements of its variables and into a falsehood under others. Into which of the three categories of statement-form does it fall, and which discipline classifies it so?\"",
        correctAnswer:
          "Formal logic; it is a statement-form true under some but not all of its interpretations (category (i)/(i*)).",
        explanation:
          "A form whose instances are sometimes but not always correct is true under some but not all interpretations — the first of the three categories of statement-form. Classifying open-sentences by their interpretations is the work of formal logic.",
        hint: "Sometimes true, sometimes false under interpretation — which of the three kinds is that?",
      },
      {
        topicSlug: "u8-philosophical-logic",
        prompt:
          "Classify and justify: \"Is it possible to lay down rules so mechanical that they could be followed with no thought whatever and still reach correct conclusions?\"",
        correctAnswer:
          "Philosophical logic (the mechanization of reasoning).",
        explanation:
          "The question is to what extent reasoning can be mechanized — whether thought-free rules can do the work of a rational being. That concerns the nature of valid inference, the subject of philosophical logic (and the doorway to formal logic).",
        hint: "It asks whether inference can be made thought-free.",
      },
    ],
  },
];

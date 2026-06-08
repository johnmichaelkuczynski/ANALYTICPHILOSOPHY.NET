import type { SeedTopic, SeedAssignment } from "./types";

export const weekTopics: SeedTopic[] = [
  {
    slug: "analysis-vs-ontologizing",
    title: "Analysis vs. ontologizing",
    weekNumber: 2,
    blurb: "Explain by clarifying statements, not by positing entities.",
    lectureTitle: "2.1 Analysis vs. ontologizing",
    body: `# Analysis vs. ontologizing

## What an ontology is

The word "ontology" comes from the Greek for the study of being. As philosophers use it today, a person's **ontology** is simply the set of things he believes to exist. Some philosophers refuse to believe in anything outside space and time, so non-spatiotemporal objects form no part of their ontology. Others — the author included — do believe in such things, so those objects belong to theirs.

Analytic philosophers are, almost by definition, **ontologically conservative**. They are reluctant to grant existence to anything whose existence has not been established beyond a shadow of a doubt. Pre-analytic, pre-Fregean philosophers were the opposite — ontologically very liberal, willing to populate reality with strange and even impossible entities whenever doing so seemed to rescue a piece of reasoning.

## The temptation to ontologize

Consider the plain truth:

**(TP)** No person is over twenty feet tall.

Pre-Fregean philosophers read TP as saying that there exists some **non-person** who is over twenty feet tall, and then expended great effort "ontologizing" — inventing entities — to make sense of this reading. Frege showed that the ontologizing is not only futile but unnecessary. What TP really says is that a certain property — _being a person who is over twenty feet tall_ — has a further property, namely that of **not being instantiated**. No twenty-foot un-person needs to be postulated; nothing needs to be added to the world's inventory at all. To **ontologize**, in this sense, is to try to solve a problem by positing some entity, or class of entities, not previously believed to exist. The analytic method is the reverse: it solves problems by **clarifying statements**.

## When ontologizing is unavoidable

It would be a mistake to think analytic philosophers never admit new entities. As a general rule they try to clarify rather than to populate, but sometimes a successfully clarified statement _forces_ an existence-claim on us. When that happens, two constraints always hold. First, the thing we are compelled to admit is never a denizen of the spatiotemporal world — never a person, a table, a mountain, or a monster. It is always an **abstract object**. Second, it is admitted only because, without it, we could not account for the truth of some statement that is obviously true.

Here is the author's example. Suppose Bob and Sally are both intelligent human beings. It follows that there is a characteristic — analytic philosophers say a **property** — that the two of them share. And if Bob and Sally share a property, then properties exist. This inference is airtight. Now, are properties identical with spatiotemporal things? Their _instances_ are sometimes spatiotemporal: Bob and Sally themselves occupy space and time. But you can meet any number of intelligent people without ever bumping into **intelligence itself**, and it makes no sense to ask where, or when, intelligence is located. So in order to validate even the humble inference from "Bob and Sally are both intelligent" to "they share a property," we must grant the existence of a non-spatiotemporal object.

## The principled difference

This is **principled** ontology, forced by an undeniable inference, and it stands in sharp contrast to the reckless ontologizing of pre-Fregean philosophy. The analytic philosopher admits a new entity only when there is no other way to vindicate an indisputably correct form of inference, and what he then admits is always abstract — never one more spatiotemporal thing tossed in to plug a gap. Reluctance to multiply entities, together with a willingness to follow a sound argument wherever it leads, is the whole of the analytic attitude toward existence.`,
  },
  {
    slug: "brentano-meinong-nonexistent",
    title: "Brentano, Meinong, and non-existent objects",
    weekNumber: 2,
    blurb: "The non-analytic method epitomized: inventing entities to plug a gap.",
    lectureTitle: "2.2 Brentano, Meinong, and non-existent objects",
    body: `# Brentano, Meinong, and non-existent objects

## Intentionality as the mark of the mental

Franz Brentano (1838–1917) held that the essence of the mental is **intentionality**. Here "intentionality" does not mean doing something on purpose; it means being **representational** — being _about_ something. On Brentano's view, for something to be a mental entity is for it to be representational, and for something to fail to be mental is for it to be non-representational.

There is an immediate worry: ink marks and spoken words are representational too, yet they are not mental. Brentano's reply is that such things are representational only **derivatively**. An utterance of "snow is white" means something only because we endow it with meaning; in a world with no sentient beings it would be just another noise. So Brentano's refined thesis is that to be mental is to be **non-derivatively** representational.

## The problem of the pink elephant

A deeper problem looms. To be representational is, presumably, to represent _something_. But hallucinations are mental, and so ought to be representational — what, then, does a hallucination of a pink elephant represent? Not a pink elephant, for there are none; there is nothing whatever that is a pink elephant for the hallucination to be about. And yet hallucinations plainly do represent. How can this be?

## The cure: contents are propositions, not objects

The solution is that perception and thought have **propositions** for their contents, not **objects** for their targets. A hallucination of an elephant does not lock onto some ghostly elephant; it tokens an **existence-claim** — a claim to the effect that, in such-and-such a place, something has such-and-such properties. In the hallucinatory case that claim is simply **false**, because nothing satisfies it. The experience is representational not because there is some thing it picks out, but because it **delivers a message** about how the world is — here, a false one.

The same holds for thought about the non-existent. When you think about an even prime number greater than two, you are not mentally gripping an impossible number. You are entertaining a false existence-claim: that there is some number that is even and prime and greater than two. Mental states have propositions for their contents; when those contents are correct they describe existing things, and when they are not, they describe nothing. To say that a thought or perception has a "non-existent object" means, so far as it means anything coherent, just that its content is an existence-claim that nothing satisfies. Bart Simpson, Zeus, and the Fountain of Youth all dissolve in exactly this way.

## Where Brentano and Meinong went wrong

Brentano saw that hallucinations are, in some real sense, representational. But instead of analyzing what that representation consists in, he tried to keep the principle "every mental state has an object" intact by saying that a hallucination of a pink elephant has a **non-existent pink elephant** for its object. This is incoherent. It amounts to saying: _there exists some elephant that does not exist, and that is what you are hallucinating._

In an effort to patch this, Brentano distinguished several grades of non-existence, coining terms like "inexistent" and "un-existent." His pupil **Alexius Meinong** (1853–1920) went further, adding the category of the **subsistent** — entities that do not quite fail to exist but do not quite manage to exist either. This whole apparatus is misguided. Brentano and Meinong were **ontologizing where they should have been analyzing**. Properly analyzed, hallucinations require non-existent existents no more than accurate perceptions do.`,
  },
  {
    slug: "perception-as-description",
    title: "Perception as description",
    weekNumber: 2,
    blurb: "Seeing Larry is encoding an existence-claim that Larry satisfies.",
    lectureTitle: "2.3 Perception as description",
    body: `# Perception as description

## Seeing is not labeling

The previous lecture leaned on a claim that deserves its own treatment: **perception is description**. To see why, compare a perception of an elephant with a sentence about it. Take the elephant Larry and the sentence:

**(LS)** "Larry is standing over there, next to that tree, looking ill."

In LS, Larry is represented by a single, semantically simple symbol — the name "Larry." But in no sense-perception of Larry is he given to you as a single, homogeneous, non-composite cipher. When you look at Larry you do not just register _Larry_; you see a **thing having various properties** — a certain shape, color, size, and position relative to you.

## Perception encodes an existence-claim

Because seeing Larry is seeing a thing that has these properties, it is seeing that **certain properties are instantiated**, right there in a certain place. So the content of your perception is given by an **existence-claim** along the lines of:

**(LC)** There exists, in that place at this time, an instance of such-and-such shape, color, and size.

An existence-claim is any claim to the effect that some property is instantiated — that it has at least one instance. "There are prime numbers" is an existence-claim; so is the content of your perception of Larry. Anything that has the relevant properties is said to **satisfy** the claim. The number two uniquely satisfies "there is an even prime," since it satisfies the claim and nothing else does. In the same way Larry, and Larry alone, satisfies the existence-claim your eyes deliver, and _that_ is why he is the **object** of your perception. Your perception represents him not by naming him but by encoding a description that he, uniquely, fits.

## Veridical and hallucinatory experiences

Now suppose that the next day you have a hallucination experientially identical to that perception. (A perception is called **veridical** when it is accurate; "veridical" is to perceptions what "true" is to sentences.) Nothing resembling Larry is before you, yet your visual experience says otherwise. The message it encodes is the very same existence-claim as before — but today nothing satisfies it, so the message is **false**. The crucial point is that the hallucination is still representational. It is representational not because there is some thing it picks out, but because it delivers a message, albeit a false one, about how the world is.

Your perception of yesterday encoded a _true_ existence-claim; your experience of today encodes a _false_ one. But today's experience no more represents some non-existent elephant than yesterday's represented one. Just as the sentence "there does not exist a ten-foot-tall man" can be true without conjuring up a ten-foot man, your experience can carry its descriptive content without there being any object it locks onto.

## Why this matters

Perception, then, is **description first and contact second** — which is precisely why it can mislead. A veridical perception and a matching hallucination share their entire descriptive content and differ only in truth-value, exactly as a single sentence can be uttered truly on one occasion and falsely on another. Seeing this is what lets us say that hallucinations are genuinely representational without following Brentano into the swamp of non-existent objects: a "non-existent object" of perception is just an existence-claim that nothing happens to satisfy.`,
  },
  {
    slug: "empirical-vs-philosophical-puzzles",
    title: "Empirical vs. philosophical puzzles",
    weekNumber: 2,
    blurb: "Science waits for data; philosophy untangles confusion.",
    lectureTitle: "2.4 Empirical vs. philosophical puzzles",
    body: `# Empirical vs. philosophical puzzles

## Puzzles that wait for facts

Some puzzles arise simply because we are **missing facts**. My valuables start disappearing and I am baffled; then I learn that Larry has been sneaking into my house and stealing them, and the puzzle dissolves. The puzzles science deals with are mostly of this kind. The trouble is not that anyone is reasoning badly; it is that the data are not yet in. Once enough evidence accumulates that, say, a disease results from the over-production of some antibody, the claim will be believed and a cure pursued.

Still, scientific breakthroughs rarely come from new data alone. More often someone finds a **new and better way to model data already available**. The pre-history of relativity shows both halves at work. Velocities normally add up in the obvious way: a train passing you at one hundred miles an hour, together with your own motion past me, combine just as common sense expects. But a light beam does not behave like this — no matter how fast you travel, you can detect **no change in your own velocity relative to a beam of light**, even though others can detect changes in yours and you in theirs. This baffling fact was established by 1879, yet nobody could explain it until Einstein's Special Theory of Relativity in 1905. Einstein cited **no new data**; his innovation was conceptual. Relativity is nonetheless an empirical theory, because the 1879 observations had to be gathered before anyone could make sense of them. Scientific breakthroughs thus have two components: a fact-gathering component and a purely conceptual one.

## Puzzles that arise from confusion

Philosophical puzzles are different. They have **no factual component at all**. They arise not from ignorance of the facts but from **confusion** — from a failure to draw the right inferences. When Frege worked out that "nothing smokes" really says that the property of being a smoker is uninstantiated, he solved a raft of standing problems without making a single empirical discovery. He needed no information unavailable to anyone who already understands the sentence. Einstein was modeling facts a layperson never encounters; Frege was untangling a confusion anyone could in principle have untangled from the armchair.

## Why no experiment could settle a philosophical question

There is a deep reason for this. A great many philosophical claims turn on whether one statement is **consistent** with another, and consistency is not something observation can report. To say that one claim is inconsistent with another is to say that it is impossible for both to be true — and the impossible, precisely because it never occurs, cannot be observed. So no experiment can tell you that anything is inconsistent with anything.

Consider epistemology. Some philosophers, taking it for granted that nothing outside space and time can be known, hold that you cannot know anything without being causally affected by it — so that even knowing that one plus one is two would require being on the receiving end of some causal process started by that fact. The author thinks this is absurd: one and one make two no matter how mass-energy is distributed, so the fact in question is non-spatiotemporal and can stand in no causal relation to anyone. But notice the shape of the dispute. Both sides **agree what the claim means**; they disagree only about whether the agreed-upon meaning is true. The same holds in the philosophy of law, where legal positivists and anti-positivists agree on what "nothing can be a legal system without embodying a certain morality" means and disagree only about its truth.

## Statement-analysis, not linguistic analysis

This is why the author insists that no philosophical assertion is empirical, and yet not every philosophical puzzle is **linguistic**. The dispute over "nothing smokes" really is about language — about whether "nothing" refers the way "Socrates" does. But the dispute about knowledge and causation is not about words at all; everyone agrees on the words. Philosophy is **statement-analysis** in the sense that it clarifies what a claim says and what it rules out — but clarifying a statement is not always a matter of studying language.`,
  },
  {
    slug: "sentences-vs-propositions",
    title: "Sentences vs. propositions",
    weekNumber: 2,
    blurb: "The sentence is the vehicle; the proposition is the meaning.",
    lectureTitle: "2.5 Sentences vs. propositions",
    body: `# Sentences vs. propositions

## Two things that can be confused

We have said that philosophy is the analysis of statements. To see why this does not make philosophy a study of language, we must distinguish a **sentence** from a **proposition**. A sentence is an expression — a string of words built out of nouns, verbs, and the rest. A proposition is what a meaningful sentence **means**. "Snow is white," "Schnee ist weiss," and "la neige est blanche" are three different sentences, but there is one proposition that is the meaning of all three.

A sentence is true or false **derivatively**: it counts as true when it encodes a true proposition. A proposition is not true in that derivative way, because a proposition does not encode anything — it is the content itself. The rough but correct answer is that a proposition is true when it fits the facts.

The word "statement" only muddies this, because it is **ambiguous in three ways**. Sometimes it means a proposition, sometimes the sentence used to affirm a proposition, and sometimes the act of using a sentence to affirm one. Wittgenstein did not believe in propositions at all, and this had much to do with his mistaken conviction that philosophy is the analysis of _sentences_, when in truth it is the analysis of _propositions_.

## Why the distinction is forced on us

You must know some English to understand the sentence "John knows that one plus one is two." But the **proposition** that sentence expresses can be grasped by someone who speaks no English, and analyzing that proposition correctly requires no knowledge of any particular language. Analyzing the _sentence_ is a different task: it involves knowing the grammatical nuances of its structure, the parts of speech, and so on. Analyzing the proposition has nothing to do with grammar.

There is a further reason the two cannot be the same. Sentences are **human artifacts**. The sentence "the moon is less massive than the Earth" did not exist until a few centuries ago. But the truth it expresses is in another category altogether: the moon was less massive than the Earth long before anyone said so, and will be after we are gone. The proposition exists independently of us; the sentence does not.

## What Frege really accomplished

But did we not credit Frege precisely with insights about **sentences** — with seeing that a sentence's surface structure can pull apart from its deep structure — and call him the first analytic philosopher on that basis? Yes. The reconciliation is that Frege analyzed particular sentences only as a **means to an end**. By painstakingly analyzing sentences like "nothing is a square circle," he was able to identify general logical principles governing how propositions bear on one another. His insight that logical and grammatical form diverge was an instrument, not the goal.

This also explains why "analytic philosophy" can be read **narrowly or broadly**. Narrowly, it is post-Fregean philosophy in the sense of work that flows directly out of Frege's concerns — reference, quantification, the nature of logical truth — that is, the philosophy of language and the related field of philosophical logic. Broadly, it names any philosophy, in ethics, law, religion, or anywhere else, pursued in the same careful, clear-headed, detail-respecting spirit in which Frege worked. What unites analytic philosophers of law or ethics with Frege is not a common subject matter but a common method: solving problems by cool, logical analysis rather than by inventing entities. On either reading, what is analyzed in the end is not sentences but the **propositions** they express.`,
  },
  {
    slug: "propositions-properties-truth",
    title: "Propositions as properties; truth as instantiatedness",
    weekNumber: 2,
    blurb: "A proposition is a property of the world; it is true exactly when instantiated.",
    lectureTitle: "2.6 Propositions as properties; truth as instantiatedness",
    body: `# Propositions as properties; truth as instantiatedness

## What a proposition is

We have spoken of propositions as the meanings of sentences and the bearers of truth. But what _are_ they? The author's answer is striking: **propositions are properties**. The argument runs as follows. For a proposition to be true is for the world to be a certain way. The proposition that Smith is in Richmond is true if the world is one way and false if it is another. But for a thing to be "a certain way" just is for it to **have a certain property** — to be round is to have one property, to be square is to have another. So the world's being a certain way is identical with its having a certain property. And since the world's being a certain way is the same thing as a given proposition's being true, propositions must be **identified with properties**, and a proposition's being true must be identified with that property's being **instantiated**. In a slogan: _propositions are properties and truth is instantiatedness._

Falsity falls out cleanly. A false proposition is an **uninstantiated** property of the world. "The moon is made of cheese" corresponds to a way the world simply is not — a world-property with no instance. So the true/false distinction turns out to be the very instantiated/uninstantiated distinction with which the analytic story began.

## Propositions are not human creations

It is widely assumed that propositions, like sentences, are things we make. This is false. The world was a certain way before there were any people, it will be a certain way after we are gone, and how it is now is up to us only to a limited degree. So, quite independently of anyone's beliefs or activities, certain propositions are true — which means propositions are not human creations. **Sentences**, by contrast, are human creations; they would not exist without us. That is exactly why analyzing sentences is one thing and analyzing propositions another.

## Meaningfulness without verification

This conception lets the author offer an alternative to a failed theory of meaning. The logical positivists tried to say that a sentence is meaningful only if it can be empirically verified, and when pressed for examples of meaningless utterances they reached for slogans nobody actually uses — "the absolute is perfect," "the universe is a perfect unity." But such strings are not really statements; they are **statement-forms** containing an **undefined term**. "The universe is a perfect unity" says nothing only because "perfect unity" has been given no definite content — much as "it is tall" says nothing until we settle what "it" refers to. Fix the missing term — specify, for instance, that a "perfect unity" is an object any two non-simultaneous parts of which can be joined by some possible causal process — and the sentence at once becomes either true or false. Its earlier defect was never that it resisted empirical testing; that was merely a symptom of the undefined term.

## The real criterion of meaning

Behind this lies a general point. **Every meaningful sentence is equivalent to one that attributes some property to some object.** A simple sentence either says that an individual has a property ("Smith is tall") or that several individuals stand in some relation ("Bob loves Sally"); and relational, compound, negative, and even general sentences can all be recast as attributing a property to an object — a relation, after all, is just a property had by an ordered group of things, and "Smith does not smoke" attributes falsity to the proposition that Smith smokes. So the correct criterion is simple: **a sentence is meaningful if it attributes some property to some object**, whether or not it can ever be perceptually confirmed. If a sentence attributes a property to a thing, it says something about something and is meaningful; if it attributes no property to anything, it says nothing and is meaningless.`,
  },
  {
    slug: "meaning-is-not-use",
    title: "Meaning is not use",
    weekNumber: 2,
    blurb: 'Why the slogan "meaning is use" collapses under its own weight.',
    lectureTitle: "2.7 Meaning is not use",
    body: `# Meaning is not use

## Wittgenstein's two phases

Ludwig Wittgenstein (1889–1951) was the most famous and most insistent champion of the view that all philosophical problems are at bottom problems about language. His two best-known works — the _Tractatus Logico-Philosophicus_ (1921) and the _Philosophical Investigations_ (1949) — are in many ways opposed, yet both maintain that philosophical problems arise only when sentences are misused, and are solved only by exposing the misuse.

In the _Tractatus_, the misuse is a hidden one: every sentence that would, if meaningful, express a philosophical proposition is in fact **syntactically ill-formed nonsense**. Such sentences break the grammatical rules of their language in subtle ways, so we fail to see them for the nonsense they are. Philosophy's only legitimate job, on this view, is to identify those rules and head off the blunders. In the _Investigations_, Wittgenstein keeps the slogan that philosophical problems come from misusing language but drops the talk of hidden rules. Now the misuse is simply **using words in non-standard ways**. Puzzles about knowledge, logic, and morality are really puzzles about the _words_ "knowledge," "logic," and "morality," created by deviant usage and dissolved by attending to how the words are ordinarily used.

## "Meaning is use"

Behind the later view stands the thesis that **meaning is use**: for an expression to have a given meaning is for it to be used in a certain way, and there is no separate entity — no proposition, no "meaning" — over and above the pattern of use. Wittgenstein is not making the harmless point that how a word is used depends partly on what it means, nor the equally harmless point that usage can change meaning over time. He is making the strong claim that an expression's _having_ its meaning simply **consists in** its being used as it is. Two sentences mean the same, on this view, exactly when there is no situation that prompts one but not the other; so instead of positing a shared meaning we can just say they are used the same way. Were the argument sound, Wittgenstein would be doing to **meanings** what Frege did to square circles — showing that sentences seeming to require their existence can be replaced by sentences that do not.

## Why the thesis collapses

But the thesis is incoherent. Start with what an expression is. A burst of noise with no meaning is just a noise; a noise counts as an **expression** only because it already has a meaning. So its meaning cannot be conferred by how it happens to be used — the meaning has to be there first for there to be any expression to use.

The decisive objection is that **meaning guides use**. Our knowledge of what words mean is what directs our linguistic behavior. I say "I want to _discuss_ the exam," not "I want to _hug_ the exam," precisely because I know what each word means. If meaning were nothing but use, meaning could not guide use — yet it plainly does. Where meaning fails to guide use, we say the speaker **misspoke**: if, wrongly thinking "moron" means _genius_, I call you an absolute moron meaning to praise you, I have misspoken exactly to the extent that my knowledge of meaning failed to steer my words. So, to whatever extent an utterance is not simply defective, meaning is guiding use — which shows that use is not what _constitutes_ meaning.

## The wider moral

The same lesson sinks every version of the claim that philosophy is sentence-analysis. To speak is not merely to make noises; it is to make noises **because** one takes them, under existing semantic rules, to carry certain meanings. Someone who utters sounds he believes to be governed by no semantic rule is not speaking but merely making noise. Genuine speech therefore always involves awareness of semantic rules — and those rules are not themselves sentences. So if philosophy studies anything language-like, it studies these rules and the concepts they require: reference, negation, quantification, and the rest. And that is just to say that philosophy, in the end, is the **analysis of concepts**, not of sentences. Wittgenstein's thesis collapses into the very view it was meant to replace.`,
  },
];

export const weekAssignments: SeedAssignment[] = [
  {
    kind: "homework",
    title: "Homework 2.1 — Ontology, Brentano & Meinong, perception",
    weekNumber: 2,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Answer each question in clear prose, defending every verdict with reasons drawn from the lectures. One-word answers and bare definitions will not receive credit.",
    problems: [
      {
        topicSlug: "analysis-vs-ontologizing",
        prompt:
          "Here is a sentence not used in the lecture: 'No building on this campus is taller than a mountain.' A pre-Fregean philosopher is tempted to conclude that there must be some non-building that is taller than a mountain. Explain, in the author's terms, why that reaction is a needless act of ontologizing and what the sentence actually says. Then explain why the author nevertheless thinks SOME inferences do force us to admit a new entity, and what kind of object is the only kind ever admitted.",
        correctAnswer:
          "The pre-Fregean reaction treats the grammatical subject 'no building' as if it named a thing, so the sentence seems to require a peculiar non-building that is taller than a mountain — pure ontologizing, the inventing of an entity to make the grammar come out right. Analyzed, the sentence says nothing of the kind: it says that a certain property, being a building on this campus that is taller than a mountain, is uninstantiated — has no instances at all. No strange object need be added to the world; the puzzle is solved by clarifying what the statement says, not by populating reality. Even so, the author concedes that analysis sometimes forces an existence-claim on us. From 'Bob and Sally are both intelligent' it follows that they share a property, hence that properties exist; that inference is airtight. But the entity we are then compelled to admit is never a spatiotemporal thing — never a building, person, or mountain — but always an abstract object, such as a property, admitted only because without it we could not account for the truth of an obviously true statement.",
        explanation:
          "The model answer keeps the analytic point distinct from the ontological one: most puzzles are dissolved by clarifying statements (the uninstantiated property), but a few sound inferences genuinely require abstract objects. A common wrong move is to think the author rejects all new entities; in fact he accepts them when an undeniable inference demands them, while insisting that what is admitted is always abstract, never one more spatiotemporal item.",
        hint: "Distinguish solving a puzzle by clarifying what a statement says from solving it by adding a new thing to your inventory of what exists.",
      },
      {
        topicSlug: "brentano-meinong-nonexistent",
        prompt:
          "Brentano said that a hallucination of a pink elephant has a non-existent pink elephant as its object. State precisely why the author regards this as incoherent, and then explain how the view that perception and thought have propositions for their contents lets us keep Brentano's genuine insight — that hallucinations are representational — without positing any such object.",
        correctAnswer:
          "Brentano's proposal is incoherent because it amounts to saying that there exists some elephant that does not exist, and that this is what you are hallucinating — it asserts the existence of the very thing it admits to be non-existent. The author keeps what is right in Brentano's view by relocating the content of a mental state from an object to a proposition. A hallucination does not lock onto a ghostly elephant; it tokens an existence-claim, a claim to the effect that something in such-and-such a place has such-and-such properties. In the hallucinatory case that claim is simply false, because nothing satisfies it. The experience is still representational, but not because there is a thing it picks out: it is representational because it delivers a message — here a false one — about how the world is. So 'having a non-existent object' means, so far as it means anything coherent, only that the experience's content is an existence-claim that nothing satisfies.",
        explanation:
          "The answer must name the contradiction exactly (an existing thing that does not exist) and then show that propositional contents do the explanatory work objects were wrongly asked to do. A common error is to think that abandoning non-existent objects makes hallucinations non-representational; the author's point is the reverse — representation is delivering a message, true or false, not being hooked to a thing.",
        hint: "What does representation consist in for the author — being attached to an object, or carrying a message that may be false?",
      },
      {
        topicSlug: "perception-as-description",
        prompt:
          "Construct your own pair of cases: a veridical perception of some everyday scene and an experientially identical hallucination of that same scene. Using your example, explain what the two experiences have in common and what makes them differ, and use this to show why, on the author's view, representation does not require that there be an object the experience 'picks out.'",
        correctAnswer:
          "Suppose that on Monday I genuinely see a red coffee mug sitting on my desk, and that on Tuesday, with the desk bare, I have a hallucination experientially identical to Monday's perception. What the two share is their entire descriptive content: each encodes the same existence-claim, namely that there is, in that place at that time, a thing having such-and-such shape, color, and size. What they differ in is truth-value: Monday's claim is satisfied (the mug satisfies it, which is why the mug is the object of that perception), while Tuesday's is satisfied by nothing and is therefore false. Because the content is an existence-claim rather than a name, the experience represents by describing — by saying that certain properties are instantiated here — not by being hooked to a particular thing. So the hallucination is fully representational even though there is nothing it picks out: it delivers a (false) message about how the world is, exactly as 'there is a red mug here' can be asserted falsely without conjuring up a mug.",
        explanation:
          "A good answer supplies a concrete, original scene and locates the sameness in descriptive content and the difference in truth-value/satisfaction. The key move is that the object of a veridical perception is whatever uniquely satisfies the encoded existence-claim, so when nothing satisfies it the experience still describes without referring. Avoid saying the hallucination has a 'merely mental object' — that reintroduces exactly the entity the author rejects.",
        hint: "Make the two experiences identical in what they describe and different only in whether anything satisfies the description.",
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
      "Answer each question in connected prose. Defend every claim with the author's reasoning; do not merely restate a definition or copy a line from the lecture.",
    problems: [
      {
        topicSlug: "empirical-vs-philosophical-puzzles",
        prompt:
          "The pre-history of relativity and Frege's analysis of 'nothing smokes' are both called 'puzzles,' yet the author insists they are puzzles of fundamentally different kinds. Identify the difference, explain the role (if any) that new data play in each, and say why the author claims that no observation could ever settle a philosophical puzzle.",
        correctAnswer:
          "The relativity puzzle is empirical: it could not even arise until the relevant observations were in hand (the 1879 finding that one cannot detect changes in one's own velocity relative to a light beam), and although Einstein's contribution was conceptual rather than a matter of new data, the data still had to be gathered first. The 'nothing smokes' puzzle is philosophical: it has no factual component at all. It arises from confusion rather than ignorance, and Frege solved it without any empirical discovery, using only information available to anyone who understands the sentence — that 'nothing smokes' says the property of being a smoker is uninstantiated. New data are essential to the first kind of puzzle and irrelevant to the second. No observation can settle a philosophical puzzle because such puzzles turn on relations like consistency: to say one claim is inconsistent with another is to say it is impossible for both to be true, and the impossible, since it never occurs, cannot be observed. Observation therefore cannot tell you that anything is inconsistent with anything, which is exactly the sort of fact philosophical puzzles depend on.",
        explanation:
          "The answer should pin the empirical/philosophical contrast to the role of data and then ground the unobservability point in the nature of consistency and impossibility. A frequent mistake is to treat Einstein's conceptual leap as making relativity non-empirical; the author's point is that the data still had to be collected, so the puzzle remains empirical even though its solution was conceptual.",
        hint: "Ask what each puzzle needed in order to be solved — more facts, or clearer inferences — and why impossibility cannot be seen.",
      },
      {
        topicSlug: "sentences-vs-propositions",
        prompt:
          "True or False, and defend your verdict in several sentences: 'Since philosophy is the analysis of statements, and Frege's great achievement was the analysis of sentences, philosophy is the analysis of sentences.' Use the author's distinction between sentences and propositions and his reassessment of what Frege actually accomplished.",
        correctAnswer:
          "False. The argument trades on the ambiguity of 'statement.' Philosophy is the analysis of statements only in the sense of analyzing propositions — the language-independent contents that meaningful sentences express — not in the sense of analyzing sentences, which are human artifacts built of nouns and verbs. The proposition that one plus one is two can be grasped and analyzed by someone who speaks no English, whereas analyzing the English sentence requires knowing its grammar; the two tasks are different. Frege did indeed analyze particular sentences, such as 'nothing is a square circle,' but he did so only as a means to an end: by dissecting them he uncovered general logical principles about how propositions bear on one another. His discovery that logical and grammatical form diverge was an instrument for getting at propositional structure, not the goal. So even Frege's own work, properly described, is propositional analysis carried out by way of sentence analysis — which is why the conclusion does not follow.",
        explanation:
          "The verdict must be False, and the defense must turn on the sentence/proposition distinction plus the means-to-an-end reading of Frege. A common wrong move is to grant the premises and accept the conclusion; the answer should show that 'analysis of statements' means analysis of propositions, and that Frege analyzed sentences only to reach propositional principles.",
        hint: "Which sense of 'statement' makes the first premise true, and is it the sense the conclusion needs?",
      },
      {
        topicSlug: "propositions-properties-truth",
        prompt:
          "Explain the author's thesis that 'propositions are properties and truth is instantiatedness.' Then apply it: take the false sentence 'the moon is made of cheese' and say, in the author's terms, exactly what its falsity consists in. Finally, explain why this account implies that propositions are not human creations.",
        correctAnswer:
          "The thesis is reached by a chain of identities. For a proposition to be true is for the world to be a certain way; for a thing to be a certain way is for it to have a certain property; so the world's being a certain way is identical with its having a certain property. Since the world's being that way is the same as the relevant proposition's being true, propositions just are properties (of the world), and a proposition's being true just is that property's being instantiated. Applied to 'the moon is made of cheese': this sentence expresses a world-property — being a world in which the moon is made of cheese — and its falsity consists precisely in that property's being uninstantiated, having no instance. The account implies that propositions are not human creations because the world was a certain way before there were any people and will be after we are gone, and which ways it is do not, in general, depend on us; so certain propositions are true independently of anyone's beliefs or activities. Sentences, which would not exist without us, are by contrast human creations — which is just why analyzing sentences differs from analyzing propositions.",
        explanation:
          "The answer should reproduce the identity chain (true = world a certain way = world having a property = property instantiated) and then read falsity as uninstantiatedness for the cheese example. The not-a-human-creation point follows from the mind-independence of how the world is. A common error is to conflate the sentence (a human artifact) with the proposition (mind-independent); keep them apart.",
        hint: "Falsity is the mirror image of truth: if truth is a property's being instantiated, what is falsity?",
      },
      {
        topicSlug: "meaning-is-not-use",
        prompt:
          "Construct your own example showing that a speaker's knowledge of what a word means guides how they use it. Using your example, explain the author's objection that if 'meaning is use' then meaning could not guide use — and say why he concludes that use is not constitutive of meaning.",
        correctAnswer:
          "Suppose that, wanting to praise a colleague, I know that 'brilliant' means highly intelligent and that 'tedious' means dull, and so I say 'your talk was brilliant' rather than 'your talk was tedious.' My choice of words is steered by my prior knowledge of what each word means: I select 'brilliant' because I already grasp its meaning. This is what the author means by meaning guiding use. Now the objection: if an expression's meaning simply consisted in how it is used, then the meaning would not be there in advance to direct the use — there would be nothing for the speaker to know that could explain why these words rather than others were chosen. A noise becomes an expression only by already having a meaning, so its meaning cannot be conferred by the very usage it is supposed to guide. The point is sharpened by misspeaking: if I wrongly thought 'tedious' meant excellent and used it to praise the talk, we would say I misspoke — precisely because my usage failed to track the word's real meaning. Since correct usage is the case in which meaning successfully guides use, meaning must be prior to and independent of use, and therefore use is not what constitutes meaning.",
        explanation:
          "A good answer supplies an original case where prior semantic knowledge selects the words, then runs the priority argument: meaning must already be in place to guide use, and the phenomenon of misspeaking shows usage can diverge from meaning. Avoid conceding the weaker, harmless claims (that use depends partly on meaning, or that use can change meaning over time); the target is the strong constitutive thesis.",
        hint: "Ask what the speaker has to know before choosing a word, and whether 'meaning is use' leaves anything for that knowledge to be.",
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
      "Cumulative midterm covering Weeks 1 and 2. Timed: 60 minutes; pasting is disabled. Answer in connected prose, defending each claim with the author's reasoning.",
    problems: [
      {
        topicSlug: "frege-logical-grammatical-form",
        prompt:
          "Here is a sentence not analyzed in the lectures: 'Nobody likes Larry.' Explain, in Frege's terms, why the grammatical form of this sentence misleads, what absurd commitment it tempts us into, and what it really says. Connect your answer to Frege's principle that an obviously correct belief should not be made to yield an absurd consequence.",
        correctAnswer:
          "Grammatically, 'Nobody likes Larry' looks just like 'Mary likes Larry,' which attributes the property of liking Larry to an individual. Read that way, 'nobody' would have to name some individual — a featureless un-person — who likes Larry, which is absurd, and worse, if any such liker existed the sentence would be false. What the sentence really says is that the property of being a person who likes Larry is uninstantiated: gather everyone who likes Larry into an otherwise empty room and the room stays empty. This illustrates Frege's principle that when an obviously correct belief (here, that nobody likes Larry) seems to carry an absurd consequence (that some un-person likes him), we should not swallow the absurdity and invent entities to accommodate it; we should ask whether the absurdity really follows. It does not. The appearance of absurdity comes from reading logical form off grammatical form, and it disappears once we see that the logical subject is a property and the logical predicate is being uninstantiated.",
        explanation:
          "The answer should diagnose the grammar-driven misreading, state the absurd commitment (an un-person who likes Larry), give the correct uninstantiated-property reading, and tie it to the principle that we should reject the apparent consequence rather than ontologize. A common error is to keep treating 'nobody' as a referring term.",
        hint: "What would 'nobody' have to name for the surface grammar to be right, and is there any such thing?",
      },
      {
        topicSlug: "quantifiers-someone-puzzle",
        prompt:
          "Someone proposes that in 'someone smokes,' the word 'someone' names a special blank, featureless person. Give the author's proof that 'someone' names no individual at all — using the test involving sentences of the form 'someone smokes but N does not' — and explain what this shows about the logical category of 'someone' compared with 'John.'",
        correctAnswer:
          "If 'someone' named a particular individual, then for that individual — call him N — the sentence 'someone smokes but N does not' would be self-contradictory, on a par with 'N smokes but N does not smoke.' But it is not self-contradictory for any name we substitute: 'someone smokes but Smith does not' can perfectly well be true, and the same holds for Jones, Brown, or any other name. So there is no individual N such that 'someone smokes but N does not' is self-contradictory, which means 'someone' refers to no individual at all. Nor can 'someone' be ambiguous among the various names, for then 'someone smokes but John does not' would sometimes mean 'John smokes but John does not' and so be self-contradictory, which it never is; and it cannot mean 'everyone,' or it would be synonymous with 'everyone,' which it is not. The moral is that 'someone' does not belong to the same logical category as 'John': 'John' is a referring term that names an individual, whereas 'someone' makes a general claim — that the property of smoking is instantiated. Grammar disguises this difference; analysis reveals it.",
        explanation:
          "The proof must run the non-contradiction test across arbitrary names and then close the ambiguity and 'everyone' escape routes. The conclusion is categorial: 'someone' is not a name. A frequent mistake is to treat 'someone' as a vague or ambiguous name rather than as a device of generality.",
        hint: "If 'someone' named N, what should happen to 'someone smokes but N does not'? Does that ever actually happen?",
      },
      {
        topicSlug: "existence-claims-instantiation",
        prompt:
          "'Nobody has run a three-minute mile' has the same grammar as 'John has run a three-minute mile,' yet the author says their logical structure is reversed. Explain what each sentence really says, identify the logical subject and logical predicate of the first, and state the general lesson about existence as a property of properties.",
        correctAnswer:
          "'John has run a three-minute mile' attributes a property — having run a three-minute mile — to an individual, John. 'Nobody has run a three-minute mile' has the same surface grammar, with 'nobody' as grammatical subject and 'has run a three-minute mile' as grammatical predicate, but its logical structure is reversed. Its logical subject is the property being a person who has run a three-minute mile, and its logical predicate is being uninstantiated; it says of that property that it has no instances. Taken at face value the sentence would tempt us to posit an un-person who ran the mile, in which case it would actually be false. Aligning meaning with logic removes the absurdity. The general lesson is that existence and non-existence are properties of properties: for something to exist is for a property to have an instance, and a true negative existence-claim says of a property that it is uninstantiated. To say 'nobody has done it' is to say a certain property has no instances, not to describe some shadowy non-runner.",
        explanation:
          "The answer should contrast attributing a property to an individual with attributing uninstantiatedness to a property, correctly label the logical subject/predicate of the negative sentence, and articulate existence as having-an-instance. A common error is to keep 'nobody' as the logical subject; the logical subject is the property itself.",
        hint: "In the negative sentence, what is really being talked about — a person, or a property — and what is being said of it?",
      },
      {
        topicSlug: "analytic-vs-nonanalytic",
        prompt:
          "Frege said that logic studies 'the laws of the laws of nature,' and Dummett called analytic philosophy 'post-Fregean philosophy.' Using the contrast between the botanist and the philosopher, explain how analytic philosophers reverse the usual relation between the actual and the possible, and how they set out to discover what there could be by examining what can sensibly be said.",
        correctAnswer:
          "The botanist, like any scientist, is primarily interested in what actually exists; any concern he has with plants that merely could exist is subordinate to his concern with the plants there actually are. Pre-Fregean philosophers thought they were doing something similar — describing the most general features of the actual world, differing from the botanist only in generality. Frege showed this is backwards. With philosophers the order of priority is reversed: their interest in what is actual is subordinate to their interest in what is possible. The philosopher wants to know not merely what holds but what it would even make sense to claim could hold — the laws the laws cannot break. Analytic philosophers pursue this by analyzing statements: a statement that makes sense is one that can be true, and one that makes no sense is one that cannot. So by surveying which statements are coherent, the analytic philosopher surveys the space of genuine possibilities, and thereby maps what there could be without leaving his chair. That reversal of the actual and the possible, and the method of getting at possibility through the analysis of sense, is what makes such philosophy distinctively post-Fregean.",
        explanation:
          "The answer should make the botanist subordinate the possible to the actual and the philosopher do the reverse, then connect sense-making with possibility (a sensible statement is one that can be true). A common error is to say analytic philosophers ignore the actual; rather, they subordinate it to the possible.",
        hint: "For the scientist, which comes first, the actual or the possible? For the philosopher it is the other way around.",
      },
      {
        topicSlug: "brentano-meinong-nonexistent",
        prompt:
          "Meinong introduced 'subsistent' entities that neither fully exist nor fully fail to exist. Explain what problem he and Brentano were trying to solve, why the author regards their solution as a textbook case of ontologizing where one should be analyzing, and what the correct analysis says instead.",
        correctAnswer:
          "Brentano and Meinong were trying to honor the insight that hallucinations and thoughts about the non-existent are genuinely representational while also respecting the fact that their apparent objects — pink elephants, and the like — do not exist. To reconcile these, Brentano said such a state has a non-existent object, and, finding that incoherent, distinguished grades of non-existence; Meinong added 'subsistent' entities that hover between existing and not existing. The author regards this as ontologizing where analysis was called for: rather than clarifying what it is for a state to represent, they invented a whole new category of quasi-entity to serve as the missing object. The correct analysis dispenses with the object entirely. The content of such a state is a proposition — an existence-claim to the effect that something has certain properties — which in these cases is simply false because nothing satisfies it. The state is representational because it delivers a (false) message, not because it is attached to a shadowy thing. So no subsistent or quasi-existent objects are needed; 'having a non-existent object' just means having a content that nothing satisfies.",
        explanation:
          "This question targets the ontologize-vs-analyze contrast and the bogus category of subsistence, distinct from the homework question's focus on the bare incoherence and on representation. The answer should name the motivating problem, label the move as ontologizing, and supply the propositional analysis. Avoid simply repeating that 'there exists what doesn't exist is contradictory' without explaining the analytic replacement.",
        hint: "What did they add to their inventory of beings, and what could they have clarified instead?",
      },
      {
        topicSlug: "perception-as-description",
        prompt:
          "Apply the author's 'perception is description' thesis to evaluate the following inference: 'Because a hallucination is representational, there must be something it represents.' Is the inference valid on the author's view? Defend your verdict and explain in what sense a hallucination still delivers a message.",
        correctAnswer:
          "The inference is invalid on the author's view. It assumes that to represent is to be related to some object that is represented, but the author holds that perception and thought represent by describing, not by being hooked to a thing. The content of a perception or hallucination is an existence-claim — that, in such-and-such a place, something has such-and-such properties. A veridical perception's claim is satisfied (by its object), whereas a hallucination's claim is satisfied by nothing and is therefore false. The hallucination is still fully representational, but not because there is some thing it represents; it is representational in the sense that it delivers a message about how the world is — a false message. So from 'it is representational' it does not follow that 'there is something it represents.' Treating the inference as valid is exactly the error that pushed Brentano toward non-existent objects: the right conclusion is that the hallucination carries a false existence-claim, not that it grips a peculiar object.",
        explanation:
          "This question asks for evaluation of an inference (verdict: invalid), distinct from the homework's request to construct a veridical/hallucination pair. The answer should reject the hidden premise that representation requires a represented object and substitute the message/existence-claim account. A common error is to accept the inference and then look for a 'mental' object to satisfy it.",
        hint: "Does representing always mean being related to a thing, or can it mean carrying a message that nothing makes true?",
      },
      {
        topicSlug: "propositions-properties-truth",
        prompt:
          "Lay out, step by step, the author's argument that 'for the world to be a certain way is for it to have a certain property,' and show how this leads him to identify a proposition's being true with a property's being instantiated. Use the proposition that Smith is in Richmond to illustrate each step.",
        correctAnswer:
          "Step one: for the proposition that Smith is in Richmond to be true is for the world to be a certain way — the way it is when mass-energy is distributed so that Smith is in Richmond rather than elsewhere. Step two: for a thing to be a certain way just is for it to have a certain property; being round is having one property, being square another, and likewise being a world in which Smith is in Richmond is having a particular world-property. So the world's being that way is identical with its having that property. Step three: since the world's being that way is the very same thing as the proposition's being true, the proposition must be identified with that property, and the proposition's being true must be identified with that property's being instantiated. Putting the steps together: the proposition that Smith is in Richmond is the world-property being a world in which Smith is in Richmond, and that proposition is true exactly when this property is instantiated and false exactly when it is uninstantiated. Generalized, propositions are properties and truth is instantiatedness.",
        explanation:
          "The answer should march through the three identities (true = world a certain way = world having a property = property instantiated) using the Smith-in-Richmond case at each step. This is distinct from the homework's falsity/human-creation focus. A common error is to skip the middle identity (being a certain way = having a property), which is what licenses the whole conclusion.",
        hint: "Track the chain of 'is identical with' claims that turns 'true' into 'instantiated.'",
      },
      {
        topicSlug: "sentences-vs-propositions",
        prompt:
          "The word 'statement' is ambiguous. Distinguish its three meanings as the author does, and explain how Wittgenstein's refusal to countenance propositions led him to mislocate philosophy as the analysis of sentences. Why does the author insist instead that philosophy is the analysis of propositions?",
        correctAnswer:
          "On the author's account 'statement' has three distinct meanings: it can mean a proposition (the language-independent content), the sentence used to affirm a proposition, or the act of using a sentence to affirm one. Because Wittgenstein did not believe in propositions at all, the first of these meanings was unavailable to him; so when he heard that philosophy is the analysis of statements, he could only take it to mean the analysis of sentences, and he concluded that philosophical problems are problems about how sentences are used or misused. The author insists this is a mislocation. Sentences are human artifacts made of grammatical parts, and analyzing them requires knowing a particular language; but the content of a sentence — its proposition — can be grasped and analyzed by someone who speaks no English at all, and that content exists independently of us. Since philosophy investigates these contents and the categories they involve, not the grammar of any particular language, it is the analysis of propositions. Even Frege analyzed sentences only to reach the propositional principles behind them. So once propositions are admitted, the case for treating philosophy as sentence-analysis collapses.",
        explanation:
          "The answer should list the three senses of 'statement,' explain that denying propositions forced Wittgenstein into the sentence-reading, and then justify the propositional reading via the language-independence and mind-independence of contents. A common error is to give only two senses or to conflate the sentence with the proposition.",
        hint: "If you reject propositions, which of the three senses of 'statement' is left for philosophy to analyze?",
      },
    ],
  },
];

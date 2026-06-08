import type { SeedTopic, SeedAssignment } from "./types";

export const weekTopics: SeedTopic[] = [
  {
    slug: "formal-truth-entailment",
    title: "Formal truth and entailment",
    weekNumber: 4,
    blurb: "Entailment is wider than formal entailment; the Tractatus was wrong that all of it is formal.",
    lectureTitle: "4.1 Formal truth and entailment",
    body: `# Formal truth and entailment

One of the main contentions of the _Tractatus Logico-Philosophicus_ (the TLP) is that **all entailment is formal entailment.** To weigh that claim we need three ideas, each built on the one before it.

## Three definitions

First, **entailment.** One statement entails another if, supposing the first is true, the second couldn't possibly be false. So "Smith is a triangle" entails "Smith has more than one side."

Second, **formal truth.** A statement is a formal truth if every statement having the same form as it is true. Consider:

- **(1)** "If Smith is in the barn, then it is not the case that it is not the case that Smith is in the barn."

This is a formal truth, because every statement of the form "if so-and-so, then it is not the case that it is not the case that so-and-so" is true.

Third, **formal entailment.** One statement formally entails another if the statement "if the first, then the second" is a formal truth. Sentence (1) is a formal entailment: it is a formal truth that is _also_ an entailment, since it says that one statement (Smith is in the barn) entails another (that it is not the case that he is not in the barn).

## The Tractarian thesis and its easy counterexamples

Wittgenstein held that _all_ entailments are like (1). He knew there were apparent counterexamples. For instance:

- **(4)** "Brown is a bachelor" entails **(5)** "Brown is unmarried."

Yet **(6)** "if Brown is a bachelor, then Brown is unmarried" is **not** formally true, because it has the same form as **(7)** "if Brown is a bachelor, then Brown is a cupcake," which isn't true at all.

Wittgenstein's reply is reasonable. He says (4) is synonymous with:

- **(4F)** "Brown is unmarried and Brown is an adult and is male."

Unlike (4), (4F) _does_ formally entail (5). All apparent counterexamples, Wittgenstein claimed, can be defused the same way — by replacing a sentence with a synonym whose grammar makes the entailment formal.

## The counterexample the method cannot absorb

The method fails elsewhere. Consider:

- **(8)** "Brown is a circle" entails **(9)** "Brown is a two-dimensional figure."

This is a genuine entailment, but (8) does not _formally_ entail (9). To save his thesis, Wittgenstein must find a synonym of (8) that formally entails (9). The only candidate is:

- **(10)** "Brown is a closed, planar, two-dimensional figure of uniform curvature."

(10) does formally entail (9). But **(10) is not synonymous with (8).** Here is the proof. The sentence:

- **(11)** "Brown is a circle if and only if Brown is a circle"

is trivial and says nothing, whereas:

- **(12)** "Brown is a circle if and only if Brown is a closed, planar, two-dimensional figure of uniform curvature"

is **non-trivial** and informative. If (8) and (10) really were synonymous, (12) would be as empty as (11). It plainly isn't.

## What (12) shows

(12) says nothing about the spatiotemporal world; no observation could confirm or refute it. Yet it is **logically true** — its truth is guaranteed by the structures of the concepts that compose it. So (12) is a _non-tautologous, non-empirical truth._ It is unlike (11), which is a mere tautology, and unlike "snow is white," which is empirical.

It follows that there are **non-formal entailments**, and therefore that the Tractarian criterion of meaningfulness — the idea that the only necessary truths are formal, tautologous ones — is **false.** Entailment is wider than formal entailment. That is exactly why so much of philosophy is patient conceptual analysis rather than mechanical calculation: the truths it uncovers are real and necessary, but they are not mere matters of form.`,
  },
  {
    slug: "open-sentences-interpretations",
    title: "Open-sentences and interpretations",
    weekNumber: 4,
    blurb: "Forms, instances, interpretations, and the geometry case that exposed hidden statement-forms.",
    lectureTitle: "4.2 Open-sentences and interpretations",
    body: `# Open-sentences and interpretations

Formal logic (also called mathematical or symbolic logic) studies **formal truth.** One sentence formally follows from another if the conditional "if the first, then the second" is formally true; and a sentence is formally true if every sentence of the same form is true. So everything turns on what it is for two sentences to have _the same form_ — and that requires the idea of an open-sentence.

## Open-sentences, instances, interpretations

An **open-sentence** (other names: _statement-form_, _sentence-schema_) is a sentence-like expression that contains a free variable and is therefore **neither true nor false.** You make one by taking a real sentence and replacing an expression with a variable. "Two is even" is a real sentence; replace "two" with a variable and you get "something-or-other is even," which says nothing until it is completed.

Two sentences have the same form when there is some open-sentence of which both are **instances** — an instance being what you get when the variables are replaced with constants. "Two is even" and "five is even" are both instances of "something is even."

To **interpret** an open-sentence is to assign constants to its variables; an interpretation **validates** the open-sentence if the resulting sentence is correct. Interpreting the variable as "two" validates "something is even"; interpreting it as "five" does not. When _every_ interpretation validates an open-sentence, each of its instances is correct, and we say (loosely) that it is "true under all its interpretations." That is just a figure of speech, since open-sentences are not literally true.

## Three kinds of statement-form

- **Contingent** — correct under some interpretations, incorrect under others, like "something is even."
- **Unsatisfiable** — correct under none, like "something is even but not divisible by two."
- **Valid** — correct under all, like "something is identical with itself."

Formal logic's goal is to **formalize informal analytic truth** as far as that can be done, and to say where it cannot. An analytic truth is one whose negation is incoherent; it is _informal_ when it shares its form with some false statement. "Triangles have three sides" is analytic (its negation is incoherent) and informal (it has the form of the false "squares have three sides").

## A worked formalization

"Bill is self-identical" is analytic — its negation "Bill is not self-identical" is incoherent. But it is **not** formally true, since it has the same form as the false "Bill is green" (both are instances of "Bill has such-and-such property"). Still, "Bill is self-identical" is equivalent to a formal truth, namely "Bill is identical with Bill," which is an instance of "something is identical with itself," none of whose instances is false. We have just formalized an informal analytic truth on a tiny scale — exactly what mathematical logicians do on a vast one.

## When "statements" turn out to be statement-forms: Euclid

Two deep facts surfaced when, in the mid-nineteenth century, Euclid's geometry was re-examined: things we take to be statements can turn out to be statement-forms, and forms we take to have only true instances can turn out to have false ones. Euclid derived geometry from five axioms, the fifth being the **parallel postulate**: given a line and a point not on it, there is exactly one line through that point that never meets the first line. Call the conjunction of all five "the axioms."

One would think the axioms are simply _true._ They are not — because, taken together, they form a **statement-form**, not a statement, and so are neither true nor false; moreover some of their instances are false. Reinterpret "line" to mean a path on a sphere that cuts it into two symmetrical halves (and adjust "space" to match): now the first four axioms come out true but the parallel postulate comes out false, because such a "line" has **zero** parallels, not one. On this surface the interior angles of a triangle sum to **more than** 180 degrees, and the larger the triangle, the greater the sum.

The right moral is not "the parallel postulate is false of spheres" — a form is true or false of nothing — but that **"line" and "space" are functioning as variables.** To object that a sphere's surface "isn't really a space" simply presupposes the very geometrical claims the axioms were meant to establish, so it cannot be used to rule the reinterpretation out.

## A truth that resists formalization: arithmetic

You might expect arithmetic to be formalizable; it is not. "Two plus two equals four" has the same form as the false "two plus two equals five," so it is true but not _formally_ true. Formalizing arithmetic would mean finding an open-sentence with an interpretation that has every arithmetical truth as a formal consequence and no arithmetical falsehood as one. This turned out to be **impossible**: any formal characterization of arithmetic is either _inconsistent_ (it entails a contradiction) or _incomplete_ (it leaves some arithmetical truth out). That is the outer boundary of the formalizing project.`,
  },
  {
    slug: "limits-strict-empiricism-hempel",
    title: "The limits of strict empiricism (Hempel)",
    weekNumber: 4,
    blurb: "No instrument can read off an irrational value, yet physics requires them — so strict empiricism fails.",
    lectureTitle: "4.3 The limits of strict empiricism (Hempel)",
    body: `# The limits of strict empiricism (Hempel)

Carl Hempel (1905–1997), himself once a leading positivist, gave a rigorous proof that **strict empiricism is false.** Strict empiricism is the thesis that all knowledge is derived from the senses — that every knowable truth has a strictly observational basis. Hempel's refutation turns on measurement and the irrational numbers.

## Measurement is comparison against a standard

To establish the _comparative_ lengths of two bodies is to find a third body, taken as a standard, and to count how many standard-length segments each of the first two can be divided into. If one body divides into exactly twice as many standard-segments as the other, then the first is twice as long as the second. Measurement, in short, requires a **common measure** of the things compared.

Two magnitudes are **incommensurable** when there is no third magnitude that goes a whole number of times into both. Hempel's key premise is this: if one body's length is one unit and another's length is the square root of two units, then the two are incommensurable — there is no length that divides without remainder into both.

It follows that if an object's length is given by an **irrational** number, that fact cannot be established **directly by measurement** — measurement only ever delivers rational comparisons. So there is no strictly observation-based way to establish that one body is exactly the square root of two times as long as another.

## Why this sinks empiricism

Modern physics rests on the **calculus**, the study of continuously changing quantities. To apply the calculus to physical phenomena one must assume that those phenomena change _continuously_ — and hence that the degree to which something has a property (its velocity, length, or mass) may sometimes be given by an **irrational** number. But, as we just saw, there cannot be a strictly observational basis for assigning an irrational value to any magnitude.

Therefore modern physics depends essentially on an assumption — continuous, sometimes-irrational-valued magnitudes — for which there cannot possibly be a strictly observational basis. Since modern physics manifestly **is** a source of knowledge, and it integrally depends on knowledge that is not observation-based, strict empiricism is **inconsistent with an obvious fact.** Knowledge outruns observation.

## The shape of the argument

Notice the structure. The empiricist principle says: if something is knowable, it has an observational basis. Physics supplies a counterexample — a body of knowledge that is real yet rests on the non-observational assumption of irrational, continuous magnitudes. One genuine counterexample refutes a universal principle. The lesson is the one that recurs throughout the course: conceptual, non-spatiotemporal knowledge is doing indispensable work even inside the most empirical of sciences.

## An example

A digital scale that reads "1.732 kilograms" is asserting a rational number — roughly one thousand seven hundred thirty-two thousandths — never the square root of two. Every actual instrument reading is a rational approximation. The irrational values that the calculus, and therefore physics, requires are contributed by **theory**, not delivered by the senses. So the very practice that empiricists held up as the paradigm of knowledge is shot through with knowledge the senses cannot supply.`,
  },
  {
    slug: "no-logically-perfect-language",
    title: "Why there is no logically perfect language",
    weekNumber: 4,
    blurb: "A perspicuous language would be expressively poorer than English — the dream is incoherent.",
    lectureTitle: "4.4 Why no logically perfect language",
    body: `# Why there is no logically perfect language

Call a sentence **perspicuous** when its logical and grammatical forms coincide, and call a language **logically perfect** when every sentence belonging to it is perspicuous. Every natural language (English, Swedish) contains many non-perspicuous sentences. One of Wittgenstein's aims in the TLP was to state the conditions a language must meet to be logically perfect, and many early analytic philosophers longed to replace natural languages with such a language.

But **the very concept of a logically perfect language is incoherent.** It is not possible for everything about a sentence's meaning to be reflected in its grammar. And even setting incoherence aside, if such a language existed it would be _expressively inferior_ to English and every other natural language. For each analytic truth a perfect language could express, there would be infinitely many it could **not** express that a natural language can; and there would be no truth expressible in it that a natural language could not also express.

## In a perfect language, analytic truth collapses into formal truth

A sentence is perspicuous only to the extent that its grammar alone makes clear what it says, and hence what entails it and what it entails. So take any sentence. To the extent that there are _false_ sentences (or true-but-non-analytic sentences) with the same surface structure as it, its grammatical and logical forms fail to coincide, and it is not perspicuous. Hence an analytically true sentence is perspicuous only if **all** other sentences of its form are true. But "all sentences of the same form are true" is just the definition of _formal_ truth. Therefore, in a logically perfect language, a sentence is analytic if and only if it is formally true.

## The expressive deficit

We already saw (in 4.1) that there are analytic truths that are **not** formally true — the circle case, the "(12)-style" conceptual biconditionals. A logically perfect language cannot express any of them.

Worse, for each analytic truth it _can_ express, there are infinitely many it cannot. Given any object and any property, the sentence "if this object has the property, then it is not the case that it lacks the property" is perspicuous, since nothing of its surface form is false. But the **universal generalization** of which all such sentences are instances — "for any object and any property, if the object has the property then it is not the case that it lacks the property" — is _not_ perspicuous, because it shares its surface form with false generalizations. Formally true sentences are instances of _informally_ true universal generalizations, so no language able to state those generalizations is logically perfect.

## Recognizing entailments comes before knowing the formal law

This has a consequence that is easy to overlook. Making a valid deductive inference involves recognizing an entailment: inferring one thing from another involves recognizing that the first entails the second. You know that "Jerry is in Richmond" entails "it is not the case that Jerry is not in Richmond," and that is why, accepting the first, you accept the second.

But **how** do you know the first entails the second? Not by first knowing that every instance of the general law "if so-and-so, then it is not the case that it is not the case that so-and-so" is true. How could you possibly know _that_ unless you could already recognize the validity of specific inferences — such as the one about Jerry — that the law licenses? The reason every instance of the law is true just _is_ that each of infinitely many specific inferences is valid.

This is not merely a psychological point; it is a psychological corollary of an epistemological point, which is itself a corollary of a logical one. There are, quite literally, **infinitely many informally valid inferences for each formally valid one.** So Wittgenstein's thesis that all entailment is formal entailment is not feasible — and a language confined to the formal would be a crippled instrument, the opposite of perfect.`,
  },
  {
    slug: "subdisciplines-philosophy",
    title: "The sub-disciplines of philosophy",
    weekNumber: 4,
    blurb: "One method, eleven overlapping branches — each studies a different family of categories.",
    lectureTitle: "4.5 The sub-disciplines of philosophy",
    body: `# The sub-disciplines of philosophy

With the analytic method now in hand, here is the territory it is used to survey. The main branches of analytic philosophy are:

- **the philosophy of mind**,
- **the philosophy of language**,
- **the theory of knowledge** (epistemology),
- **philosophical logic**,
- **metaphysics**,
- **the philosophy of science**,
- **ethics**,
- **political philosophy**,
- **legal philosophy**,
- **the philosophy of religion**, and
- **formal logic** (mathematical or symbolic logic).

## One discipline, many families of categories

Recall the thesis from Week 1: philosophy is the discipline that delineates the structures of the categories in terms of which we think about the world. The branches above are not eleven different _methods_. They are one method — careful analysis of what our statements really say, so that the structure of a category can be made explicit — applied to eleven different _families_ of categories.

The philosophy of mind takes up such categories as _belief, perception, consciousness_; epistemology takes up _knowledge, justification, evidence_; metaphysics takes up _necessity, possibility, identity, cause_; and so on. Each branch asks, of its own categories, what conditions a thing must satisfy if it is to fall under them.

## The branches overlap heavily

It must be kept in mind that these sub-disciplines **overlap a great deal**, so the borders on the map are porous. The single question "do we think in words?" belongs at once to the philosophy of mind (what is the medium of thought?) and to the philosophy of language (what is the relation between thought and the symbols of a language?).

The question "how does perception justify belief?" belongs to the philosophy of mind, to epistemology, and — once you ask whether perceptual content can be put into sentences — to the philosophy of language too. A great many of the field's most important problems sit on these overlaps. That is a feature, not a defect: it reflects the fact that the categories themselves are interwoven.

## Analysis is the common engine

Whatever the family of categories, the work is the same: take a central claim, make explicit what it actually says, and read off what follows from it. "Brown is a bachelor" tells us that Brown is unmarried because, once we unfold what "bachelor" means, the entailment is plain. The hidden structure that the analysis brings to light _is_ the philosophical content.

The remaining lectures walk the branches in turn — mind, language, and epistemology next, then logic, metaphysics, and science, and finally ethics, political and legal philosophy, the philosophy of religion, and a synthesis of the whole arc.

## An example

Take "can perceptual content be put into words?" Asked as a question about what the eyes and ears _deliver_, it is philosophy of mind. Asked as a question about what _sentences_ can encode, it is philosophy of language. Asked as a question about how perception can _justify_ what we believe, it is epistemology. One and the same question, three disciplines — which is precisely why the map of philosophy has so many shared borders.`,
  },
  {
    slug: "mind-language-epistemology",
    title: "Mind, language, and epistemology",
    weekNumber: 4,
    blurb: "Intentionality, reference and compositionality, and the analysis of knowledge.",
    lectureTitle: "4.6 Mind, language, and epistemology",
    body: `# Mind, language, and epistemology

Three core branches, each organized around a central concept that analysis can make explicit.

## The philosophy of mind

This discipline studies the concepts in terms of which the mind is to be understood. Among its questions: **Must one know a language in order to think**, or is the ability to think a prerequisite for _learning_ a language? Given that knowing a language seems to enhance some kinds of thinking, _how_ does it do so? **What are beliefs**, and what is the difference between believing that Smith is tall and merely wondering whether he is? How is **perception** related to thought? Can perceptual content — what the eyes and ears tell us — be **put into words**, or is there a fundamental difference between the information the senses bear and the information sentences encode? To what extent is **self-knowledge** possible, and what limits it? How is mind related to **brain** — are they one, and if not, what is their relation? Can there be **unconscious** mental activity?

The unifying mark of the mental, recall from Week 2, is **intentionality** — being _about_ something. Every mental state represents something. This is best understood through _propositional content_: a mental state carries a proposition, true or false, rather than aiming at an object — which is exactly what dissolves the puzzle of thoughts about the non-existent.

## The philosophy of language

This discipline studies the nature of linguistic **meaning.** Among its questions: What does it mean to say that "Smith" **refers** to Smith — that an expression picks out an object? How do the meanings of a sentence's parts combine into the meaning of the whole (**compositionality**)? Do expressions like "some person," "all people," and "no people" function like proper names — picking out objects — **or in some other way?** (Frege's answer, from Week 1: in another way; they tell us whether a property has instances.) How can statements about **non-existent** things be meaningful? How is a sentence's meaning related to the **thoughts** of those who utter it? Does grammar **distort** meaning, or is it a good guide to logical form? Are the **semantic rules** of a language known to its speakers, or merely idealized descriptions of their behavior? How **transparent** is meaning — do users of a language really know what its sentences mean? And how does **literal** meaning differ from **communicated** meaning?

## Epistemology

This discipline studies the nature and extent of **knowledge.** Among its questions: What _is_ knowledge — what separates beliefs that are knowledge from those that are not? What **can** be known and what cannot (and is it even coherent to claim one can know what cannot be known)? Can we know about the **future, the past, the merely possible, the impossible**? Can we know the **external world**, or only our own mental states? Can there be knowledge of things **not in space or time** (numbers, for instance), and if so how? Are there **self-evident** beliefs, or must every justified belief be justified by other beliefs? Is there a fundamental difference between knowledge of **spatiotemporal fact** ("there is a dog over there") and knowledge of **purely conceptual truth** ("there are laws only where there is government")?

The classical analysis of knowledge treats it as **justified true belief.** To know something requires that it be true, that you believe it, and that your belief be justified. Each condition does work.

## An example

Suppose you believe a true claim purely on a stranger's say-so, with no reason to think the stranger reliable. Then the claim is true and you believe it, but your belief is unjustified — so you have **true belief that is not knowledge.** The justified-true-belief analysis makes precise _why_: the justification condition is unmet. (Whether justified true belief is _sufficient_ for knowledge is the further question that Gettier later pressed; but the analysis is where modern epistemology begins.)`,
  },
  {
    slug: "logic-metaphysics-science",
    title: "Logic, metaphysics, and science",
    weekNumber: 4,
    blurb: "Entailment and the non-existent, necessity and possibility, and the structure of scientific theory.",
    lectureTitle: "4.7 Logic, metaphysics, and science",
    body: `# Logic, metaphysics, and science

Three more branches, unified by their concern with the **bearing-relations among statements** and with the **possible and the necessary.**

## Philosophical logic

This discipline studies the bearing-relations holding among sentences and propositions. Among its questions: What is it for one statement to **entail** another? (One statement entails another when there is no way for the second to be false if the first is true.) Are there **different kinds** of entailment, some more central to reasoning than others? Are inferences about the **non-existent** ("if Zeus is tall, then at least one god is tall") to be modeled on inferences about the existent ("if Bush is tall, then at least one president is tall"), or is the non-existent logically _sui generis_? To what extent can reasoning be **mechanized** — replaced by rules a non-thinking device could follow? How are statements about **what might have been but is not** (counterfactuals) to be understood — like statements about what _is_, or with an altogether different logical form? And are all statements either **true or false**, or are some indeterminate — is there a "gray zone," and are there _degrees_ of truth?

## Metaphysics

This discipline studies the nature of **possibility and necessity, of identity, persistence, and causation.** Among its questions: Under what conditions are two distinct objects (my heart, my liver) both parts of _one_ thing? What is it for an **inanimate** object to endure through time — and what is it for an **animate** one, a person? Is there a sense in which **fictional** objects (Fred Flintstone) exist? What is it for something to be **possible but not actual**, **actual but not necessary**, or **necessary**? Are necessity and possibility properties of **objects** or of **statements**? Must things have **causal** properties in order to exist?

Necessity and possibility are interdefinable: to say that something is possible is to say that its negation is not necessary, and to say that something is necessary is to say that its negation is not possible. This course sides with treating necessity and possibility as properties of **statements**, not of objects.

## The philosophy of science

This discipline studies the logical structure of scientific inquiry and of its results. Among its questions: What distinguishes **scientific** statements from non-scientific ones? What is an **explanation**? Is there a sharp **theoretical / non-theoretical** distinction, or is every statement (even "that's a rock") "theory-infected"? Given two rival theories, how do we decide which is more **accurate** — and is accuracy a theory's only virtue, or do **simplicity** and comprehensiveness count too? What is the nature of **measurement** and of **probability** — is probability "a measure of ignorance," as Laplace said, or an objective feature of the world? Do **theoretical entities** (protons, unconscious urges) exist as ordinary objects do, or are they devices for organizing observation? When should a hypothesis be **rejected** — is a single disconfirming result enough?

On **determinism**, Einstein said every adequate theory must posit a rigid causal order; Peirce denied it; **Nagel** held the question _ill-formed_, because determinism is a logical property of _statements_, not of events, so a domain can be deterministic under one method of description and indeterministic under another. (The sub-atomic realm, Nagel said, is indeterministic with respect to the concepts we use for the macroscopic realm, but it does not follow that it is indeterministic in itself.) On **realism**, Popper said science should state how the world actually is, Kant doubted that is even possible, and van Fraassen held that science need only produce _models_ consistent with the data, leaving their truth open.

## An example

"This rod's length could have been different" expresses a contingent, spatiotemporal fact. "One plus one could not have been other than two" expresses a necessary, non-spatiotemporal fact. Since nothing outside space and time is causally active, the second is something we cannot have come to know by being _causally affected_ by it — which is exactly why the empiricist picture of all knowledge as observation-derived breaks down, and why the possible and the necessary mark the deepest joints in the philosophical map.`,
  },
  {
    slug: "capstone-synthesis",
    title: "Capstone synthesis",
    weekNumber: 4,
    blurb: "Ethics, politics, religion, formal logic — and the single thread that runs through the whole course.",
    lectureTitle: "4.8 Capstone synthesis",
    body: `# Capstone synthesis

Three remaining branches, then the whole arc.

## Ethics

This discipline studies the nature of **good and bad, right and wrong.** What is it for an act to be good, and what for it to be bad? Are there **absolute** standards, or do they vary from culture to culture? Are there _in fact_ such things as right and wrong — and if so, are _any_ of our ethical beliefs correct, or are they all illusions of some kind? How are **ethical** statements ("killing is wrong") related to purely **descriptive** ones ("killing tends to undermine social order")? Can one have ethical obligations toward **oneself**, and to what extent, if any, is it in one's interest to act morally?

## Political and legal philosophy

This branch studies the nature of **law and government** and the conditions of their legitimacy. **What is a law**, and what distinguishes it from a gunman's threat? What is a **government**, and what distinguishes it from the Mafia? How are legal rights related to ethical rights? Can a legal system be **entirely evil**, or must anything that qualifies as law embody at least a minimum of morality? Under what conditions, if any, is one entitled to **break** the law? When, if ever, does a government have the right to **thwart** its subjects' interests? What is the most **just** form of government, and which freedoms ought it protect?

## The philosophy of religion

This branch studies the nature and existence of **God** and the conditions under which religious belief is justified. If there is a God, **why do bad things happen**? If God knows everything, including what we will do, **how can we have free will**? Is there a God, and if so how is that to be established? Is **religious knowledge** acquired and justified like other knowledge, or by different means? What is the relation between **religion and morality** — can there be valid moral codes in a Godless world, and can a God be bound by ethical principles without that undermining her authority?

## Formal logic, once more

Completing the eleven, **formal logic** studies formal truth: open-sentences, interpretations, and the project of formalizing analytic truth so far as it can be formalized — together with the discovery (in 4.2) of where it _cannot_, as with arithmetic and the unmasking of Euclid's parallel postulate as a hidden statement-form.

## The thread that runs through it all

Against the positivists' verification criterion, this course has defended a single positive picture of meaning. A meaningful statement is one that _says something_ — that attributes some property to some object, or relates some objects to one another. "Smith is tall" means something because it ascribes a property to a man; "nothing is a square circle" means something because, properly understood, it says of a property that it has no instances. **Verifiability is beside the point.** If a sentence ascribes a property to a thing, it says something; if it ascribes nothing to nothing, it says nothing. The work of philosophy is to recover, by analysis, what our statements really attribute to what.

## The arc of the whole

1. **Philosophy is the analysis of categories** (Week 1): it is meta-knowledge, pursued by analyzing statements, in the recognition — owed to Frege — that logical form is not the same as grammatical form.
2. **Analyze, don't ontologize** (Week 2): quantifier-words, instantiation, propositions, and truth as a property having instances — against meaning-as-use and against Meinong's non-existent objects.
3. **The Tractatus and positivism fail** (Week 3): the picture theory, the showing/saying distinction, and the verification criterion all break down — several of them self-refuting.
4. **Formal truth has limits** (Week 4): entailment outruns formal entailment, no language is logically perfect, strict empiricism is false (Hempel), and the map of philosophy is one method applied to many interwoven families of categories.

## An example

Take a sentence the positivists dismissed as meaningless — say "the universe is a perfect unity." It is not nonsense; it is more like a statement with an undefined term ("perfect unity"), waiting to be made precise. Define the term and it becomes true or false. That is the whole discipline in miniature: take the claim, make its structure explicit, supply what is left undefined — analyze, do not ontologize.`,
  },
];

export const weekAssignments: SeedAssignment[] = [
  {
    kind: "homework",
    title: "Homework 4.1 — Formal truth, open-sentences, Hempel, perfect language",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Answer in full sentences. Each response should make a claim and then defend it with reasoning drawn from the lecture. Write everything in prose; do not use logical or mathematical symbols.",
    problems: [
      {
        topicSlug: "formal-truth-entailment",
        prompt:
          "Construct a NEW genuine entailment of your own (do NOT reuse 'circle' and 'two-dimensional', or 'bachelor' and 'unmarried') that is NOT a formal entailment. State the two sentences, exhibit a third sentence that has the same form as the conditional 'if the first, then the second' yet is false, and then explain why Wittgenstein's rescue — replacing a sentence with a synonym whose grammar makes the entailment formal — cannot succeed for your example.",
        correctAnswer:
          "Take 'Scarlet is a color', which entails 'Scarlet is not a sound'. The conditional 'if scarlet is a color, then scarlet is not a sound' is not formally true, because it shares its form with the false 'if scarlet is a color, then scarlet is not extended in space'. Wittgenstein's rescue would require that 'scarlet is a color' be synonymous with some sentence whose grammar plainly contains 'not a sound' — some unpacking of what a color is. But no such unpacking is genuinely synonymous with the original, and we can prove it: 'scarlet is a color if and only if scarlet is a color' is trivial and says nothing, whereas 'scarlet is a color if and only if [the proposed unpacking]' is informative. If the two sides really were synonymous, the second biconditional would be as empty as the first. Since it is not, the entailment is real but non-formal, exactly like the circle case.",
        explanation:
          "A good answer mirrors the 4.1 argument: it shows the conditional shares its form with a falsehood (so it is not formally true), then blocks the rescue using the triviality test — a proposed synonym is genuine only if the matching biconditional is trivial rather than informative. Common wrong move: picking a pair like 'bachelor' and 'unmarried' that CAN be rescued by definition, which fails to establish a non-formal entailment.",
        hint: "You need a pair where unpacking one term to reveal the other yields an INFORMATIVE biconditional, not a trivial one.",
      },
      {
        topicSlug: "formal-truth-entailment",
        prompt:
          "True or false, and defend in three or four sentences: 'Brown is a circle if and only if Brown is a closed, planar, two-dimensional figure of uniform curvature' is a mere tautology, so its truth rests on nothing more than linguistic convention.",
        correctAnswer:
          "False. The biconditional is logically true — its truth is guaranteed by the structures of the concepts 'circle' and 'closed planar figure of uniform curvature' — but it is NOT a tautology, because it is informative rather than trivial, unlike 'Brown is a circle if and only if Brown is a circle'. Its truth is therefore not fixed by convention alone or by every sentence of its form being true; it is a non-tautologous, non-empirical, non-formal necessary truth. Treating it as a mere tautology is exactly the Tractarian and positivist error that lecture 4.1 refutes, since it would deny that there is any such category as conceptual truth.",
        explanation:
          "The point of 4.1 is that there are necessary truths that are neither empirical nor tautologous. A correct answer keeps three categories apart: empirical truth, tautology, and conceptual (analytic-but-non-formal) truth. Wrong move: collapsing 'logically true' into 'tautologous' — the whole lecture turns on their not being the same thing.",
      },
      {
        topicSlug: "open-sentences-interpretations",
        prompt:
          "Take a NEW true sentence of your own. (a) Form an open-sentence from it by replacing one expression with a variable. (b) Classify the open-sentence as contingent, unsatisfiable, or valid, and justify the classification by reference to its interpretations. (c) Give one interpretation that validates it and, if it is contingent, one that does not.",
        correctAnswer:
          "Take 'Seven is prime'. (a) Replacing 'seven' with a variable gives the open-sentence 'something is prime', which is neither true nor false on its own. (b) It is CONTINGENT, because it is correct under some interpretations and incorrect under others, so neither are all its instances correct nor are all incorrect. (c) Interpreting the variable as 'seven' validates it, since 'seven is prime' is correct; interpreting it as 'eight' fails to validate it, since 'eight is prime' is incorrect. By contrast a valid form would be something like 'something is identical with itself', correct under every interpretation, and an unsatisfiable form like 'something is prime but not prime' is correct under none.",
        explanation:
          "Tests the instance-and-interpretation machinery of 4.2. A strong answer states that an open-sentence is itself neither true nor false and that 'true under all interpretations' is a figure of speech. Wrong move: calling the form 'true' or 'false' outright, or giving an ordinary sentence rather than an open-sentence in part (a).",
        hint: "An open-sentence must contain a free variable, so it is neither true nor false on its own.",
      },
      {
        topicSlug: "open-sentences-interpretations",
        prompt:
          "Apply the procedure for formalizing an informal analytic truth to a NEW analytic truth of your own (NOT 'Bill is self-identical' and NOT 'triangles have three sides'). Show that your sentence is analytic, show that it is only INFORMALLY analytic by exhibiting a same-form falsehood, and then identify a valid open-sentence one of whose instances is equivalent to your truth.",
        correctAnswer:
          "Take 'Every widow was once married'. It is analytic, since its negation 'some widow was never married' is incoherent. It is only INFORMALLY analytic, because it shares the form 'every such-and-such was once so-and-so' with the false 'every widow was once a triangle'. To formalize it, render 'widow' as 'woman whose spouse has died', so the truth becomes an instance of the valid open-sentence 'anything that is a woman whose spouse has died was once married' — every interpretation of which is correct, because being someone's spouse already entails having been married. So the original analytic truth is equivalent to an instance of a universally valid form.",
        explanation:
          "Follows the worked example in 4.2: establish analyticity (incoherent negation), then informality (same form as a falsehood), then find a form all of whose instances are true with one instance equivalent to the target. Wrong move: giving a truth that is already FORMALLY true, which skips the informal-to-formal step the exercise is testing.",
      },
      {
        topicSlug: "limits-strict-empiricism-hempel",
        prompt:
          "Reconstruct Hempel's argument for a magnitude OTHER than length — say mass. State, in prose, the incommensurability condition for two masses, one of one unit and one of the square root of two units, then explain in three to five sentences why no balance or scale, however precise, could ever ESTABLISH that the second mass is exactly the square root of two units, and why this matters for physics.",
        correctAnswer:
          "Two masses are incommensurable when there is no common unit of mass that goes a whole number of times into both; for a mass of one unit and a mass of the square root of two units, there is no such common unit. Measuring mass is comparing objects against a standard by counting how many standard-units balance each one, which yields only rational ratios. Because one and the square root of two share no common measure, no scale could ever count out exactly the square root of two standard-units for the second mass, so that value can never be read off any instrument — every actual reading, such as 1.414 kilograms, asserts a rational number. This matters because the calculus that underlies physics requires that magnitudes vary continuously and so sometimes take irrational values; physics therefore depends on knowledge that has no strictly observational basis, which refutes strict empiricism.",
        explanation:
          "A correct answer transfers the structure of 4.3 to mass: measurement is comparison against a standard yielding only rational ratios, one and the square root of two are incommensurable, the calculus requires continuity and hence irrational values, and the conclusion is that physics is knowledge that outruns observation. Wrong move: claiming a 'precise enough' scale could read the square root of two — the barrier is that ANY measurement yields a rational comparison, regardless of precision.",
        hint: "The obstacle is not imprecision; it is that measurement only ever delivers rational ratios.",
      },
      {
        topicSlug: "no-logically-perfect-language",
        prompt:
          "True or false, and defend in four to six sentences: a logically perfect language (one in which every sentence is perspicuous) would be expressively RICHER than English. In your defense, explain why, inside such a language, a sentence is analytic if and only if it is formally true, and use that fact to reach your verdict.",
        correctAnswer:
          "False — it would be expressively POORER. In a perfect language a sentence is perspicuous only if every sentence of its form is true, which is just to be formally true; so within such a language a sentence is analytic if and only if it is formally true. But there are analytic truths that are not formally true, such as the circle biconditional, and a perfect language cannot express any of them. Worse, for each formally true instance it can state, the corresponding informally true universal generalization — which English can state — is not perspicuous and so lies beyond it, and there are infinitely many such generalizations. Hence the perfect language could express nothing English cannot, while English expresses infinitely much that it cannot, so it is the poorer instrument. The dream of replacing natural language with it is backwards, and the very concept is in fact incoherent.",
        explanation:
          "Tests the central paradox of 4.4: perfection forces analytic truth to coincide with formal truth, which strands both the non-formal analytic truths and the informal generalizations. Wrong move: assuming 'logically perfect' means 'more precise and therefore more expressive' — the lecture shows perfection is an expressive LOSS, and that the concept is incoherent.",
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
      "Answer in full sentences, making a claim and defending it with reasoning from the lectures. Write everything in prose; do not use logical or mathematical symbols.",
    problems: [
      {
        topicSlug: "subdisciplines-philosophy",
        prompt:
          "Invent a NEW philosophical question (do NOT reuse 'do we think in words?') that genuinely belongs to TWO OR MORE sub-disciplines at once. Name the sub-disciplines, explain for each one which aspect of your question falls within it, and then say what your example shows about the structure of the field.",
        correctAnswer:
          "Question: 'When I see a red apple, can what I see be fully captured in a sentence?' This belongs to the philosophy of mind, since it asks what the senses deliver and whether perceptual content is sentence-like; to the philosophy of language, since it asks what sentences are capable of encoding and whether meaning can match the richness of perception; and to epistemology, since it asks whether perception can justify belief, which presupposes that perceptual content can be brought into relations with what we believe. The example shows that the sub-disciplines are not separate methods but one method applied to overlapping families of categories, which is why the field's most important problems sit on the borders between branches.",
        explanation:
          "Models the overlap point of 4.5. A strong answer assigns a DISTINCT aspect of the single question to each named branch and draws the structural moral — one method, overlapping families of categories. Wrong move: offering three unrelated questions, or naming branches without saying which aspect of the question each one owns.",
        hint: "Pick one question and show three different things it is really asking, each owned by a different branch.",
      },
      {
        topicSlug: "mind-language-epistemology",
        prompt:
          "Construct your OWN case of a true belief that is not knowledge (do not reuse the lecture's stranger example). Walk through the justified-true-belief analysis, stating precisely which of its three conditions your case satisfies and which it fails, and defend the diagnosis.",
        correctAnswer:
          "Case: Mara guesses, with no evidence at all, that the millionth digit of pi is one, and it happens to be one. On the justified-true-belief analysis, knowing that the millionth digit is one requires that it be true, that Mara believe it, and that her belief be justified. Here the claim is true, and Mara does believe it, so two conditions are met; but her belief rests on a mere guess, so the justification condition fails. Because that third condition is unmet, she does not know it — she has true belief without knowledge. The diagnosis is that knowledge requires justification, not merely truth plus belief.",
        explanation:
          "Tests the justified-true-belief analysis in 4.6. A correct answer pins the failure on the justification condition (or, for a Gettier-style case, notes that all three are met yet knowledge still seems absent — an acceptable sophisticated answer if defended). Wrong move: a case where the belief is actually justified, or where the claim is false, since then it is not even true belief.",
      },
      {
        topicSlug: "mind-language-epistemology",
        prompt:
          "Apply Frege's lesson from Week 1 to a question in the philosophy of language: does the phrase 'no senators' in 'no senators are immortal' pick out an object the way the name 'Smith' picks out Smith? Say what the sentence really claims, and defend your answer in three or four sentences using the idea of instantiation.",
        correctAnswer:
          "No. 'No senators' does not name or pick out any object; the sentence says of the property 'being an immortal senator' that it has no instances — that nothing is at once a senator and immortal. If 'no senators' picked out an object the way 'Smith' does, then 'no senators are immortal, but Smith is a senator who is immortal' would be self-contradictory in the way 'Smith is immortal but Smith is not immortal' is — and it plainly is not. So quantifier-phrases belong to a different logical category from proper names: a name contributes an object, whereas a quantifier-word tells us whether a property has instances.",
        explanation:
          "Connects the philosophy-of-language questions of 4.6 to the Week 1 quantifier lesson. Strong answers state the real (uninstantiated-property) content and run a self-contradiction test to show 'no senators' is not referential. Wrong move: treating 'no senators' as denoting some shadowy non-object — the very error Frege's analysis removes.",
      },
      {
        topicSlug: "logic-metaphysics-science",
        prompt:
          "Take a NEW necessity claim of your own. State it as a claim about what is necessary, then restate it equivalently as a claim about what is not possible, using the interdefinability of necessity and possibility. Then defend, in three or four sentences, whether the necessity is best understood as a property of an OBJECT or of a STATEMENT, taking a side.",
        correctAnswer:
          "Claim: 'Necessarily, every prime greater than two is odd.' Restated through interdefinability, this is 'it is not possible that some prime greater than two fails to be odd', since to be necessary is for the negation to be impossible. I hold that the necessity is a property of the STATEMENT, not of any object: numbers are not the sort of thing that could 'have' necessity as a feature, whereas the statement is necessary precisely because its negation is incoherent. This matches the course's view that necessity and possibility attach to statements rather than to rocks, trees, or numbers, and it avoids the confusion of locating a logical feature in an object.",
        explanation:
          "Tests the interdefinability of necessity and possibility from 4.7 plus the object-versus-statement debate. A correct answer restates the claim accurately (necessity as the impossibility of the negation) and defends a side. Either side is acceptable if argued; the course's own view is that necessity is a property of statements. Wrong move: botching the restatement, or refusing to take a side.",
        hint: "To say something is necessary is to say its negation is impossible.",
      },
      {
        topicSlug: "logic-metaphysics-science",
        prompt:
          "Compare Einstein's and Nagel's positions on determinism, and identify exactly where they disagree. Then apply Nagel's view to decide whether the question 'Is the sub-atomic realm deterministic, full stop?' is well-formed, defending your verdict.",
        correctAnswer:
          "Einstein held that every adequate theory must posit a rigid causal order — determinism is a feature of the world that science must capture. Nagel held the question ill-formed, because determinism is a logical property of statements or descriptions, not of events, so a domain can be deterministic under one method of description and indeterministic under another. The crux of their disagreement is not whether the sub-atomic realm is orderly but what KIND of thing determinism is — a feature of reality, for Einstein, versus a feature of descriptions, for Nagel. On Nagel's view the question 'is the sub-atomic realm deterministic, full stop?' is NOT well-formed, because 'deterministic' has no application apart from a chosen description; the sub-atomic realm may be indeterministic relative to macroscopic concepts yet not indeterministic in itself.",
        explanation:
          "Tests the determinism material in 4.7 and the 'identify the crux' question style. A strong answer locates the disagreement at the meta-level (property of events versus property of statements), not at the first-order level, and then applies Nagel consistently. Wrong move: treating the dispute as a straightforward empirical disagreement about whether the world is orderly.",
      },
      {
        topicSlug: "logic-metaphysics-science",
        prompt:
          "Is accuracy — agreement with the data — the ONLY virtue a scientific theory can have? Construct your own example of two rival theories that fit all the available data equally well, then defend a principled basis for preferring one. State which philosopher's view (Popper or van Fraassen) your answer is closest to, and why.",
        correctAnswer:
          "No, accuracy is not the only virtue. Example: Theory A explains a set of orbital observations using three independent force-laws plus four correction terms, while Theory B explains exactly the same observations with a single force-law and no corrections. They agree perfectly with all the available data, so accuracy cannot decide between them; I prefer B on grounds of simplicity, and the comprehensiveness and unification it brings, which are genuine theoretical virtues beyond mere data-fit. This leans toward Popper's realism — that we should prefer the theory that more boldly and economically says how the world actually is — rather than van Fraassen's view that we should only accept a theory as empirically adequate and stay neutral on its truth, since on the purely empirical-adequacy view A and B would be on a par.",
        explanation:
          "Tests the theory-choice material in 4.7 (accuracy versus simplicity and comprehensiveness) and the realism debate. A good answer builds a genuine data-tie and names a non-empirical virtue, such as simplicity or unification, as the tie-breaker, then aligns with a named position. Wrong move: claiming data alone settles it (which contradicts the constructed tie) or naming a 'virtue' that is really just disguised accuracy.",
        hint: "If two theories tie on the data, the tie-breaker must be a virtue OTHER than data-fit.",
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
      "Cumulative final covering all four weeks. 90 minutes; pasting is disabled. Every answer must be a full, defended response in complete sentences, written entirely in prose with no logical or mathematical symbols. Several questions are modeled on the author's own exercises.",
    problems: [
      {
        topicSlug: "formal-truth-entailment",
        prompt:
          "Produce a genuine entailment that is NOT a formal entailment, state it clearly, and use it to explain in four to six sentences why the Tractarian thesis 'all entailment is formal entailment' is false, and what this shows about the existence of non-empirical, non-tautologous truth.",
        correctAnswer:
          "Take 'Maya is a widow', which entails 'Maya was once married'. The conditional 'if Maya is a widow, then Maya was once married' is not formally true, because it shares its form with the false 'if Maya is a widow, then Maya was once a comet'. Unlike the bachelor case, the rescue by synonym-substitution fails for genuinely conceptual entailments such as 'a circle is two-dimensional', because the unpacking biconditional is informative rather than trivial — which proves the terms are not synonyms. So there are real entailments that are not formal, and that refutes the Tractarian claim that all entailment is formal entailment. It follows that some necessary truths are neither empirical nor tautologous: they are conceptual, analytic-but-non-formal truths, whose truth is fixed by the structures of the concepts involved.",
        explanation:
          "Synthesizes 4.1. The strongest answers connect the existence of non-formal entailments to the existence of a third category of truth — conceptual, analytic-but-non-formal — beyond the empirical and the tautologous, which is what undercuts both the Tractatus and positivism. Wrong move: a 'bachelor'-style pair that can be defused by definition.",
      },
      {
        topicSlug: "open-sentences-interpretations",
        prompt:
          "Euclid's five axioms, taken together, were long assumed to be a true statement. Explain in five to seven sentences why they are really a STATEMENT-FORM (an open-sentence) rather than a statement, using the sphere reinterpretation of 'line' and 'space', and say what the right conclusion is about the parallel postulate.",
        correctAnswer:
          "Euclid's axioms contain the words 'line' and 'space', and the truth-value of the whole depends on what those words are taken to mean — which is the mark of a variable, not a constant. Under the ordinary Euclidean interpretation the parallel postulate comes out true, with exactly one parallel through an external point; but reinterpret 'line' as a path on a sphere that cuts it into two symmetrical halves, and 'space' accordingly, and the first four axioms stay true while the parallel postulate comes out false, since such a 'line' has zero parallels. Because the same expression yields truth under one interpretation and falsehood under another, the axioms are true under some interpretations and false under others, so they are neither true nor false outright — that is, they form a statement-form with both validating and non-validating interpretations. Objecting that a sphere's surface 'isn't really a space' simply presupposes the very Euclidean claims the axioms were meant to establish, so it cannot be used to rule the reinterpretation out. The right conclusion is therefore NOT that the parallel postulate is false of spheres — a form is true or false of nothing — but that there are possible spaces partly described by negations of instances of the parallel postulate.",
        explanation:
          "Tests the geometry case in 4.2. A correct answer (i) identifies 'line' and 'space' as functioning as variables, (ii) gives the some-true and some-false interpretation contrast, (iii) blocks the 'that's not a real space' objection as question-begging, and (iv) draws the precise conclusion that forms are true or false of nothing. Wrong move: saying 'the parallel postulate is false in non-Euclidean geometry.'",
      },
      {
        topicSlug: "limits-strict-empiricism-hempel",
        prompt:
          "Modeled on the author's Exercise 17: to what extent, if any, does acquiring information through the senses presuppose knowledge NOT acquired through the senses? Give TWO reasons that perceptual knowledge presupposes non-perceptual knowledge, then try to rebut each as a strict empiricist would. Make both sides as strong as you can.",
        correctAnswer:
          "Reason one is Hempel's: perception and measurement only ever yield rational comparisons, yet to use perceptual data in physics we must assume magnitudes can take irrational, continuous values; that assumption is not itself perceived, so perceptual knowledge in science presupposes non-perceptual knowledge. Reason two is that perceiving that something is the case requires recognizing entailments and consistency relations — for instance, that 'this is red here now' is inconsistent with 'nothing is red here now' — and consistency and entailment are non-observational relations, so even reading off a perception presupposes non-perceptual logical knowledge. A strict empiricist might rebut the first by saying the continuity assumption is a mere instrumental convenience, not knowledge, since physics works without committing to literally irrational magnitudes; and rebut the second by saying logical relations are just very general empirical regularities, or tautologies learned through experience of language, not a separate source of knowledge. One can press back — instrumental indispensability that yields true predictions is hard to distinguish from knowledge, and the attempt to reduce logic to mere tautology was shown in Week 3 to be self-refuting — but a fully convincing case requires meeting these empiricist replies head-on, which is the point of the exercise.",
        explanation:
          "Directly follows Exercise 17: two arguments FOR the priority of non-perceptual knowledge, then the strongest empiricist rebuttals. A top answer draws on Hempel (4.3) and on the non-observational nature of consistency and entailment, and makes BOTH sides genuinely strong. Wrong move: arguing only one side, or strawmanning the empiricist.",
        hint: "Use Hempel for one reason and the non-observational status of consistency and entailment for the other.",
      },
      {
        topicSlug: "no-logically-perfect-language",
        prompt:
          "Defend, in four to six sentences, the claim that recognizing a particular entailment — for example, that 'Jerry is in Richmond' entails 'it is not the case that Jerry is not in Richmond' — comes BEFORE, in the order of knowledge, knowing the general formal law that every statement entails the denial of its own denial. Explain how this supports the conclusion that no language is logically perfect.",
        correctAnswer:
          "To know that the general law holds for every instance, you would already have to be able to recognize the validity of particular instances such as the inference from 'Jerry is in Richmond' to 'it is not the case that Jerry is not in Richmond'; you cannot reach the universal law except by first seeing that specific inferences hold. So knowledge of the formal law is grounded in, not prior to, knowledge of particular informal entailments, and there are infinitely many informally valid inferences underlying each formally valid one. This is a logical point with epistemological and psychological corollaries, not mere psychology. It supports the no-perfect-language conclusion because a logically perfect language could express only what is perspicuous — that is, formally true — and not the open-ended informal universal generalizations that those particular recognitions rest on; such a language would therefore be expressively poorer than English, so the ideal is unattainable and indeed incoherent.",
        explanation:
          "Tests the priority argument in 4.4. A correct answer states that the universal law is known THROUGH particular recognitions, not the reverse, notes that there are infinitely many informal inferences per formal one, and ties this to the expressive inferiority of a perfect language. Wrong move: treating it as merely a fact about human psychology rather than a logical and epistemological point.",
      },
      {
        topicSlug: "subdisciplines-philosophy",
        prompt:
          "Modeled on the author's Exercise 14: identify a philosophical puzzle that has NOTHING to do with language, state which sub-discipline(s) it belongs to, and justify in three to five sentences why it is genuinely philosophical yet not a puzzle about language or meaning.",
        correctAnswer:
          "Puzzle: under what conditions do two distinct objects, say my heart and my liver, compose a single further thing? This is the question of composition in metaphysics. It is genuinely philosophical because it asks not for any new empirical fact but for the structure of the category 'being parts of one whole' — what conditions things must satisfy to compose a unit. It has nothing to do with language because the question would remain even in a world with no speakers; it concerns the conditions of composition and identity themselves, not the meanings of words. (Other acceptable answers include the persistence of objects through time, or whether necessity is a feature of objects or of statements.) Its philosophical character comes from being about a category's structure, and its non-linguistic character from being about the world's composition rather than about meaning.",
        explanation:
          "Follows Exercise 14. A strong answer picks a metaphysical or epistemological puzzle — composition, persistence, the conditions of existence — names the branch, and argues that it would persist even with no language. Wrong move: choosing a puzzle that is really about meaning, reference, or grammar, since those ARE about language.",
        hint: "Metaphysics — composition, persistence, identity — gives puzzles that would remain even with no speakers.",
      },
      {
        topicSlug: "mind-language-epistemology",
        prompt:
          "Modeled on the author's Exercise 16: consider the statement 'Anything that has beliefs has mental states of some kind.' True or false: our knowledge that this is true is an instance of ANALYTIC knowledge? Defend your verdict in four or five sentences, explaining what makes knowledge analytic and how the statement relates to intentionality.",
        correctAnswer:
          "True. Our knowledge that anything with beliefs has mental states is analytic, because the negation — 'something has beliefs but has no mental states of any kind' — is incoherent: a belief just is a kind of mental state, so to have a belief is already to have a mental state. We know this not by surveying believers and inspecting them for mental states, which would make it empirical, but by grasping the concepts 'belief' and 'mental state', whose structures guarantee the connection. This ties in with intentionality: beliefs are paradigm intentional, representational states, and intentionality is the mark of the mental, so anything with beliefs is thereby in a mental state. Analytic knowledge is precisely knowledge whose truth is secured by the structures of the concepts involved rather than by observation.",
        explanation:
          "Follows Exercise 16. A correct answer says TRUE and grounds the analyticity in the incoherence of the negation plus the conceptual containment of 'mental state' in 'belief', linking to intentionality (from 4.6 and Week 2). Wrong move: calling it empirical, as if we learn it by examining believers, or conflating analytic with merely obvious.",
      },
      {
        topicSlug: "logic-metaphysics-science",
        prompt:
          "Modeled on the author's counterfactuals passage: David Lewis analyzes counterfactuals such as 'if Smith, who is six feet tall, were half his height, he would be three feet tall' in terms of other possible worlds. State the possible-worlds analysis of this counterfactual, state the rival causal/logical analysis the author defends, and identify the CRUX of the disagreement, defending which analysis is more plausible.",
        correctAnswer:
          "On Lewis's analysis, the counterfactual means roughly: in the possible world most similar to ours except that Smith is half his current height, Smith is three feet tall. On the author's rival analysis, the counterfactual is a grammatical variant of an ordinary logical or causal generalization — 'anything that is half the height of something six feet tall is three feet tall' — with no reference to other worlds at all. The crux is the direction of dependence between counterfactual knowledge and knowledge of other worlds: Lewis makes counterfactual truth depend on facts about other universes, whereas the author argues that any knowledge we have of other worlds is parasitic on prior knowledge of counterfactuals like this one, since we would never revise the counterfactual on the basis of what we supposedly 'found' in another world. The author's analysis is more plausible, because we plainly know such counterfactuals while knowing nothing about other universes, so those universes cannot be what grounds the counterfactual; the causal or logical reading explains our knowledge without positing inaccessible worlds.",
        explanation:
          "Uses the author's gold-standard counterfactuals passage. A strong answer gives the possible-worlds reading, gives the author's causal/logical reading, and locates the crux at the order of epistemic dependence — counterfactuals ground talk of other worlds, not the reverse — then defends a side. Wrong move: merely describing both views without naming the crux, or reversing the author's dependence claim.",
      },
      {
        topicSlug: "capstone-synthesis",
        prompt:
          "Capstone, modeled on the author's Exercises 13 and 15: (a) produce a sentence of your own whose LOGICAL form diverges from its GRAMMATICAL form and identify its logical form; (b) show how a non-Fregean would 'ontologize' to handle it while the Fregean analyzes it; and (c) tie this to the course's overall picture of what it is for a sentence to be meaningful, in two or three sentences.",
        correctAnswer:
          "(a) Take 'Nobody phoned.' Its grammar suggests it ascribes phoning to an individual named 'Nobody', but its logical form is that of a denial of existence: it says that the property 'being someone who phoned' has no instances. (b) A non-Fregean, reading the grammar at face value, would ontologize — positing a shadowy 'Nobody', a non-entity who did the non-phoning, just to give the grammatical subject something to refer to — whereas the Fregean analyzes the sentence as a claim about a property, namely that it has no instances, so no spooky object is needed. (c) This illustrates the course's overall picture of meaning: 'Nobody phoned' is meaningful precisely because, properly understood, it attributes a property (having no instances) to the property of having phoned; meaning is a matter of attributing properties to things, not a matter of verifiability, and analysis, not ontology, is how we recover what a sentence really says.",
        explanation:
          "Synthesizes Exercises 13 and 15 with the whole arc. A complete answer (a) gives a real divergence between logical and grammatical form with its correct reading, (b) contrasts ontologizing with analyzing on the SAME example, and (c) connects it to the course's account of meaning as property-attribution. Wrong move: reusing the lecture's own examples verbatim, or giving a sentence whose logical and grammatical forms actually coincide.",
        hint: "Quantifier and negation words such as 'nobody' and 'nothing' are the classic cases where grammar hides logical form.",
      },
    ],
  },
];

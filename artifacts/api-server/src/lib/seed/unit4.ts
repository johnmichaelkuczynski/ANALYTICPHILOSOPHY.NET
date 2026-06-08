import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 4 — Logical Positivism: its roots, its failure, and what
  // a sane theory of meaningfulness looks like
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u4-empirical-vs-philosophical-puzzles",
    title: "Empirical puzzles vs. philosophical puzzles",
    weekNumber: 4,
    blurb: "Scientific puzzles wait on missing facts; their breakthroughs split into a fact-gathering half and a purely conceptual half.",
    lectureTitle: "4.0 Empirical puzzles vs. philosophical puzzles",
    body: `# Empirical puzzles vs. philosophical puzzles

Some puzzles result from **ignorance of spatiotemporal facts**. My valuables start disappearing. I am puzzled. Then I learn the relevant facts — someone has been sneaking into my house and stealing them — and I am no longer puzzled. The puzzle dissolved not because I reasoned better but because a missing fact arrived.

The puzzles that science deals with typically have this shape. The problem is not that anyone is drawing erroneous inferences; the problem is that **not all the facts are in**. It is not yet known that disease $X$ results from an over-production of antibody $Y$. The reason it is not yet known is that, given the available data, there is not yet good reason to believe it. Once the data is in, it will be believed, and a cure will follow.

## Breakthroughs are rarely pure fact-gathering

Scientific puzzles seldom result *entirely* from a failure to have the relevant data. In most cases, a scientific breakthrough involves somebody's figuring out a **new and better way to model already available data**.

The pre-history of relativity theory illustrates this vividly. If a train rushes past you at $100$ mph and I rush past you at $70$ mph, the train moves at $30$ mph relative to me — velocities simply subtract:

$$v_{\\text{train rel. me}} = 100 - 70 = 30 \\text{ mph}.$$

But if a light beam rushes past you at $186{,}000$ mi/s and I rush past you at $180{,}000$ mi/s, the light beam still rushes past *me* at $186{,}000$ mi/s, not $6{,}000$:

$$v_{\\text{light rel. me}} = 186{,}000 \\text{ mi/s}, \\quad \\text{not } 186{,}000 - 180{,}000.$$

There is thus **no optical test for one's own state of motion**. No matter how fast you travel, you cannot detect any change in your velocity *relative to a light beam*. Others not travelling with you can detect changes in your velocity relative to light, and you can detect changes in theirs — but nobody can detect changes in **his own** velocity relative to light.

This deeply puzzling fact was established in $1879$. Yet nobody had any idea how to explain it until Einstein put forward the Special Theory of Relativity in $1905$. Crucially, **Einstein cited no data that had not been available to the physics community for decades.** His great innovation was *conceptual*. The facts were in; he was the first to make sense of them.

## Relativity is still empirical

For all that, relativity theory is an **empirical** theory. It rests on observational and experimental data, much of it impossible to acquire except through carefully executed experiments. That data was not in until $1879$. So the fact that nobody produced relativity before $1879$ cannot be chalked up to bad inference — it is due, at least in part, to the necessary data simply being unavailable. (What *can* be chalked up to a failure of inference is that, in the years from $1879$ to $1905$, nobody put the theory together.)

## The two components of every scientific breakthrough

In general, a scientific breakthrough has **two components**:

1. a strictly **fact-based** component — new raw data is acquired; and
2. a purely **conceptual** component — already-known data is modelled in a new and better way.

Keep this two-part anatomy firmly in mind. The whole contrast between science and philosophy turns on the fact that philosophical puzzles, as we will see next, have *only* the second component and never the first.`,
  },
  {
    slug: "u4-philosophical-puzzles-conceptual",
    title: "Philosophical puzzles are purely conceptual",
    weekNumber: 4,
    blurb: "Philosophical puzzles come from confusion, not ignorance, because observation can never report what is consistent, impossible, or a necessary consequence of what.",
    lectureTitle: "4.1 Empirical puzzles vs. philosophical puzzles (continued)",
    body: `# Philosophical puzzles are purely conceptual

Unlike scientific puzzles, **philosophical puzzles are not solved by generating new raw data.** They are purely conceptual and have no strictly factual component whatsoever. They result not from a failure to *know* the facts but from a failure to *draw the right inferences* — not from ignorance, but from **confusion**.

When Frege figured out that

$$(\\text{NS2}) \\quad \\text{the property of being a smoker is instantiated}$$

is what is *meant* by

$$(\\text{NS}) \\quad \\text{“nothing smokes,”}$$

he solved a number of outstanding philosophical problems. But he made **no new empirical discoveries**. His work required no empirical information beyond what is available to anyone who knows what (NS) means. Einstein's work, by contrast, had a heavy empirical component: he was modelling facts a layperson would know nothing about — and *mutatis mutandis* the same is true of any scientific discovery.

## Why no observation can settle a philosophical question

Here is the deep reason philosophy is non-empirical. A philosophical claim characteristically says that one thing is **inconsistent** with another — that a thing's falling under a given category *rules out* something else.

For $P$ to be inconsistent with $Q$ is for it to be **impossible** for both to be true:

$$\\text{Inconsistent}(P, Q) \\;\\equiv\\; \\neg\\Diamond(P \\wedge Q) \\;\\equiv\\; \\Box\\,\\neg(P \\wedge Q).$$

But **what is impossible cannot be observed.** Observation can tell you, at most, what *is* the case; it can never tell you what *must* be the case or what *could not* be the case. Therefore observation cannot tell you that anything is inconsistent with anything.

The point carries over to entailment. For $Q$ to be a **necessary consequence** of $P$ is for $P$ to be inconsistent with the negation of $Q$:

$$P \\vDash Q \\;\\equiv\\; \\neg\\Diamond(P \\wedge \\neg Q).$$

Since observation cannot establish inconsistency, it cannot establish necessary consequence either. Every distinctively philosophical claim trades in exactly these modal relations — consistency, impossibility, entailment — and so no body of observational data could ever confirm or refute one.

## A worked illustration: knowledge without causal contact

You could not see the book in front of you were it not for the light-rays bouncing off it and disturbing your eyes. In general, **nothing can sense-perceive anything that does not affect it**, and all knowledge of what is *in space-time* is rooted in sense-perception. Taking it for granted that nothing outside space-time can be known, many contemporary epistemologists hold that one cannot know of anything without being causally affected by it — hence that

$$(\\text{JK}) \\quad \\text{John's awareness that } 1+1=2 \\text{ involves his being on the receiving end of a causal process initiated by that fact.}$$

I regard JK as absurd. Were mass-energy distributed differently, there would be no book in front of you; but $1+1$ would still equal $2$ no matter how mass-energy were distributed. So "$1+1=2$" says nothing about the distribution of mass-energy, hence nothing about the spatiotemporal world; the fact it describes must be **non-spatiotemporal**. And nothing outside space-time can bear any causal relation to anything. Therefore JK is false.

Notice the structure of the dispute. Everyone agrees **what JK means**. What is disputed is whether the thing it means is **true**. So the controversy has nothing to do with language. And it is to be settled by **statement-analysis alone**, never by experiment: JK says that John's knowing $1+1=2$ is *inconsistent* with his not being causally affected by that fact, and we have just seen that observation can never establish an inconsistency.

The same lesson appears in the philosophy of law. Everyone agrees what

$$(\\text{LM}) \\quad \\text{“nothing can be a legal system without embodying a certain morality”}$$

means; positivists (e.g. H.L.A. Hart) and anti-positivists (e.g. Ronald Dworkin) disagree only about whether that agreed meaning is *correct*. LM says that being a legal system is inconsistent with embodying no morality — again a modal claim no observation can decide. So the debate, though substantive, is **non-empirical**.

## The upshot

No philosophical assertions are empirical. Philosophy analyzes the categories in terms of which we think about the world, and it does this by saying exactly what is **ruled out** by a thing's falling under a given category. Since observation cannot tell you that one statement is inconsistent with another, philosophical assertions are one and all non-empirical.`,
  },
  {
    slug: "u4-tractarian-roots-of-lp",
    title: "The Tractarian roots of Logical Positivism",
    weekNumber: 4,
    blurb: "The Tractatus's central thesis — meaningful iff tautology or observation report — splits into two claims and yields the corollary that all philosophy is nonsense.",
    lectureTitle: "4.3 The Tractarian roots of Logical Positivism",
    body: `# The Tractarian roots of Logical Positivism

Although one contention of the *Tractatus Logico-Philosophicus* (TLP) is that all philosophical statements are ungrammatical nonsense, that is **not** its main contention. The main contention is a **criterion of meaningfulness**:

$$(\\text{CT}) \\quad \\text{a sentence is meaningful if, and only if, it is either a tautology or an observation report.}$$

A **tautology** is a definitional truth — "fathers are male," "there are three feet in a yard." An **observation report** is a statement reporting what one's senses have told one — "I am now seeing a dog," "I can see your house from here," "there is a brown discoloration on Smith's ice-cream."

## CT factors into two claims

$$(1) \\quad \\text{All meaningful non-empirical statements are tautologies.}$$
$$(2) \\quad \\text{All meaningful non-tautologous statements are observation-reports.}$$

Claim $(1)$ entails that the non-empirical disciplines — philosophy, mathematics — consist of statements that **say nothing about anything**. Claim $(2)$ entails that anything non-tautologous that cannot be known strictly on the basis of the senses is **meaningless**.

## The corollary: philosophy is nonsense

Wittgenstein's claim that all philosophical statements are ungrammatical nonsense is a **corollary** of CT. If they were meaningful, philosophical statements — unlike tautologies — would be *non-trivial*. Consider:

$$(\\text{KC}) \\quad \\text{“knowing a truth doesn't necessarily involve being affected by the state of affairs described by that truth.”}$$

KC is a philosophical statement, and so is its negation. Neither is a tautology, and neither is empirical. So if CT is correct, **both KC and its negation are ungrammatical nonsense.** Since philosophical assertions are never tautologous, CT entails — as Wittgenstein knew — that philosophical assertions are categorically meaningless.

## Logical Positivism is born

The position that $(1)$ and $(2)$ are both correct is **logical positivism (LP)**. In the decade or so after the TLP appeared, and largely because of it, LP was extremely popular.

But before LP could state itself precisely it had to answer a prior question: what exactly is it for a non-tautologous statement to be "knowable on the basis of the senses"? The first natural answer is *verifiability*; when that failed, *falsifiability*; when that failed, *confirmability*. Tracking that retreat is the business of the next lecture. The key point to fix now is the architecture: LP stakes everything on the disjunction

$$\\text{Meaningful}(S) \\;\\leftrightarrow\\; \\big(\\text{Tautology}(S) \\;\\vee\\; \\text{Empirical}(S)\\big),$$

and on the claim that these two boxes between them exhaust the meaningful. Everything that does not fit — all of philosophy, and as we will see much of mathematics and even some of physics — gets thrown out as nonsense. That is a great deal to throw out on the strength of a single criterion, and the criterion, we will find, cannot even survive being applied to itself.`,
  },
  {
    slug: "u4-verificationism-falsificationism",
    title: "Verificationism, falsificationism, and confirmation",
    weekNumber: 4,
    blurb: "The empirical half of LP retreats from verifiability to falsifiability to confirmability, each move forced by a counterexample the previous criterion could not survive.",
    lectureTitle: "4.4 Verificationism and falsificationism",
    body: `# Verificationism, falsificationism, and confirmation

The empirical half of CT — claim $(2)$ — is the doctrine called **verificationism**:

$$\\text{Meaningful}(S) \\;\\leftrightarrow\\; \\big(\\text{Tautology}(S) \\;\\vee\\; \\text{Verifiable}(S)\\big),$$

where a non-tautologous $S$ is *verifiable* iff it can be shown **true** strictly on the basis of sensory observation.

## Verificationism is false

The statement "all metal expands when heated" is plainly meaningful. But it **cannot be conclusively verified** by observation: no matter how many metal objects you find to expand when heated, it remains possible that some object you have not yet examined fails to. A universal generalization $\\forall x\\,(Mx \\to Ex)$ ranges over endlessly many instances, so finite observation can never *establish* it.

## Falsificationism — and its symmetric failure

Notice, though, that "all metal expands when heated" *can* be **falsified** by observation: one recalcitrant sample settles it. LP therefore retreated to **falsificationism**:

$$\\text{a non-tautologous } S \\text{ is meaningful} \\;\\leftrightarrow\\; S \\text{ is falsifiable by observation.}$$

This too is false. The obviously meaningful statement "there exists a gold ball weighing exactly $27.13654$ lbs" **cannot be conclusively falsified**, since no matter how many gold balls you weigh, some unexamined one might have that weight. An existential generalization $\\exists x\\,(Gx \\wedge Wx)$ can never be *refuted* by finite observation.

The diagnosis is structural. Falsificationism is just verificationism in disguise: it says $S$ is meaningful iff $S$'s **negation** is verifiable. Since the negation of a universal is an existential (and vice versa), and since universals resist verification while existentials resist falsification, the two criteria fail as mirror images of each other:

$$\\neg \\forall x\\,(Mx \\to Ex) \\;\\equiv\\; \\exists x\\,(Mx \\wedge \\neg Ex).$$

## Confirmationism

In light of this, LP softened once more: a non-tautologous statement is meaningful if possible observations could **confirm** it. ($P$ *confirms* $Q$ if, other things being equal, $Q$ is more likely to be true given $P$ than given $\\neg P$. Other things equal, someone is likelier to be wealthy if he wears fancy clothes than if he does not; so "Smith wears fancy clothes" confirms "Smith is wealthy.")

Confirmationism is equivalent to the position that **all meaningful non-tautologous statements are empirical**. An *empirical* statement is one whose truth, if true, must be known through observation, and whose negation, if it is false, is a true empirical statement. (The negation of an empirical statement is empirical: if it is an empirical question whether $S$ is true, it is an empirical question whether $S$ is false, hence whether $\\neg S$ is true.)

## The official definition of LP

Henceforth "logical positivism (LP)" names the position that a statement $S$ is meaningful if and only if

$$(\\text{i})\\ S \\text{ is a tautology (e.g. “sisters are female siblings”)} \\quad \\text{or} \\quad (\\text{ii})\\ S \\text{ is empirical (e.g. “there are trees in Santa Barbara”).}$$

This is the target we will now demolish. Notice already how the retreat — verify, then falsify, then confirm — is a series of forced moves, each prompted by a single counterexample the previous criterion could not absorb. A criterion that has to keep weakening itself to dodge counterexamples is a criterion in trouble.`,
  },
  {
    slug: "u4-lp-evaluated",
    title: "Logical Positivism evaluated: conventions outrun convention",
    weekNumber: 4,
    blurb: "Truths follow from conventions without themselves being conventional, the consistency of conventions is non-conventional, and logical truth is a property of propositions, never sentences — so LP is false.",
    lectureTitle: "4.5 Logical Positivism evaluated",
    body: `# Logical Positivism evaluated: conventions outrun convention

Consider:

$$(1) \\quad \\text{“triangles are three-sided figures,”} \\qquad (2) \\quad \\text{“pentagons have five sides.”}$$

For argument's sake, grant that $(1)$ and $(2)$ are **true by convention** — mere definitional truths. Even granting that, it follows that:

$$(3) \\quad \\text{If } x \\text{ is the number of sides of a triangle and } y \\text{ the number of sides of a pentagon, then } w \\text{ is an even prime iff } w = x - 1 = y - 3.$$

(With $x = 3$ and $y = 5$, $(3)$ says $w$ is an even prime iff $w = 2$.) But $(3)$ is **not** a conventional truth. Though it *follows from* conventions, it is not itself a convention. So $(3)$ is a **non-tautologous, non-empirical truth** — and the bare existence of one such truth already refutes LP.

## The consistency of conventions is not conventional

Conventions can be **inconsistent**. If I stipulate that "$x$" refers to the number two and also stipulate that "$x$" refers to the number of sides of a triangle, my two stipulations are inconsistent. But that they are inconsistent is **not itself a convention**, and not an empirical fact either. To say $P$ is inconsistent with $Q$ is to say $P$ must be false if $Q$ is true; and observation can tell you at most what *is* the case, never what *must* be. So:

$$\\text{Inconsistent}(P,Q) \\;\\equiv\\; \\neg\\Diamond(P \\wedge Q)$$

is a modal fact no experiment reports. Since observation cannot establish inconsistency, it cannot establish necessary consequence either, for $Q$ is a necessary consequence of $P$ exactly when $P$ is inconsistent with $\\neg Q$.

## Logical truth belongs to propositions, never sentences

When evaluating LP one must distinguish **sentences** from their **meanings**. Two sentences can share a meaning ("snow is white," "schnee ist weiss"); the meaning of a sentence is a **proposition**, and propositions are not sentences. A proposition is **logically true** if the laws of logic prohibit its negation. The proposition meant by

$$(4) \\quad \\text{“if a given thing is round, then that thing is not a square”}$$

is logically true, since the laws of logic do not allow round things to be square. People loosely call the *sentence* $(4)$ "logically true," but what they really mean is that, *given what it means*, $(4)$ could not be false. So it is always the **proposition**, never the sentence, that is logically true.

And **no proposition is true by convention.** It is up to us what our symbols mean; it is not up to us whether those meanings are correct. It is up to us what "the moon is not made of cheese" means; it is not up to us whether that meaning is correct. LP identifies logical truth with conventional truth — truths of logic are sentences true by convention. That is doubly wrong: logical truths are never sentences, and propositions are never conventionally true.

## Clause (ii) collapses into clause (i)

Worse, the "empirical" disjunct collapses into the "tautology" disjunct. **Which** sentence expresses a given convention is itself known *empirically*. That "triangles have three sides" is true can be known only by observation — the string could have meant anything (that penguins are smarter than humans, say); you know it does not only because you have had the requisite perceptions. So conventional truths are not a category cleanly separable from empirical knowledge in the way LP requires.

## Carnap's flight from meanings — and why it fails

Logical positivists unanimously **denied the existence of propositions and of meanings generally**. That is the very essence of the doctrine. This forced Rudolf Carnap to say that for a lecture to *concern* triangles is just for the word "triangle" to *occur* in it.

This is false on both sides. Many lectures that never contain the word "triangle" are about triangles — think of the mathematics lectures delivered every day in Japanese, Swedish, and Arabic. And a lecture that *does* contain "triangle" need not be about triangles: a linguist may use the word "triangle" to make a point about phonetics, in which case she is talking not about triangles but about the *word* "triangle." Carnap could not draw the distinction between the word and its meaning without ceasing to be a logical positivist — yet the distinction is undeniable.

The deeper point: suppose propositions *do* exist. Then whether a sentence is meaningful is **not** explained by its being tautologous or confirmable; rather, its being tautologous or confirmable is explained by its **bearing a proposition of a certain kind**. A tautologous sentence is one with a logically correct proposition for its meaning; a confirmable sentence is one with a confirmable proposition. But if there are logically true *propositions*, then some truths are *ipso facto* non-empirical — and LP is finished.

## Conceptual role semantics is no better

A more respectable attempt to do without meanings is **conceptual role semantics (CRS)**: two sentences have the same meaning iff they are *used* the same way; "hace mucho calor" translates "it's hot" not by sharing a meaning but by sharing a use. CRS simply revives the discredited "meaning is use" thesis, so it is a mystery why it is fashionable. It is also indefensible. Anyone who, not misspeaking, says "it's hot out" or "hace mucho calor" does so **because** she knows existing semantic rules assign a certain proposition to those words and she wishes to express it — so sameness of meaning is not sameness of use. And CRS has an absurd corollary: any natural language contains infinitely many sentences **never once uttered**, and two never-uttered sentences are (vacuously) "used the same way," hence — absurdly — synonymous.`,
  },
  {
    slug: "u4-lp-evaluated-holism",
    title: "Logical Positivism evaluated (continued): theory and confirmation",
    weekNumber: 4,
    blurb: "Bodies of physical theory make no observable predictions in isolation, and every patch LP proposes to handle this lets outright nonsense back in as 'meaningful.'",
    lectureTitle: "4.6 Logical Positivism evaluated (continued)",
    body: `# Logical Positivism evaluated (continued): theory and confirmation

We have seen that there are non-empirical truths owing nothing to anyone's linguistic practices. Now we will see that, contrary to LP, **there are facts about the spatiotemporal world that cannot be known strictly on the basis of sense-perception** — and that LP cannot even accommodate ordinary physics.

## Theories make no predictions by themselves

Let NT be the body of assertions jointly constituting Newton's physics. There is no denying NT is meaningful. But **by itself NT makes no predictions** and has no observable consequences. Physical laws are expressed by **conditionals** — statements of the form $P \\to Q$. NT does not say how this or that object *will* behave; it says how a given object will behave **if** certain conditions are met (if it has a certain mass and is within a certain distance of another body of a certain mass):

$$\\text{NT} \\vdash \\big(\\text{mass}(a)=m \\wedge \\text{dist}(a,b)=d \\wedge \\cdots\\big) \\to \\text{accelerates}(a, \\ldots).$$

NT itself does not say that any particular object *has* this mass or *is* that distance from any other. So, taken by itself, NT is **not confirmable**. What is confirmable is not NT but NT **conjoined with statements describing specific matters of fact** — some statement of the form "given such-and-such, NT makes it likely that thus-and-such."

## The holistic patch lets nonsense in

NT's evident meaningfulness is a problem for LP. To handle it, LP proposed replacing clause (ii) with:

$$(\\text{ii}^{*}) \\quad S_1 \\text{ is meaningful if there is some } S_2 \\text{ such that, given } S_2,\\ S_1 \\text{ is confirmable.}$$

But this is a disaster. By this standard "**the nothing nothings**" comes out meaningful — and so does every nonsense string you can dream up. Take the conditional "if grass is green, then the nothing nothings." Anything that confirms "grass is green" thereby confirms "the nothing nothings," so the nonsense clause qualifies as "meaningful." Schematically: for any garbage $M$ and any observable $O$,

$$O \\text{ confirms } (O \\to M), \\quad \\text{so } (\\text{ii}^{*}) \\text{ certifies } M \\text{ as meaningful.}$$

LP replaced $(\\text{ii}^{*})$ with further, similar proposals. Every one of them failed for essentially this reason: any criterion permissive enough to let in genuine theoretical statements (which need auxiliary premises to make contact with observation) is permissive enough to let in pure nonsense by the same trick. The empirical half of LP cannot be repaired.`,
  },
  {
    slug: "u4-lp-self-defeating",
    title: "LP is self-defeating; empiricism is self-refuting; grue and confirmation",
    weekNumber: 4,
    blurb: "LP fails its own test, empiricism refutes itself, the Tractatus ladder is incoherent, and the very concept of confirmation presupposes non-empirical knowledge.",
    lectureTitle: "4.7 LP self-defeating",
    body: `# LP is self-defeating; empiricism is self-refuting

It soon became clear that LP was unsalvageable, and everybody jumped ship — often its own staunchest proponents leading the way, as in Carl Hempel's brilliant criticisms. But the defectors usually cited narrow technical problems. The real trouble lies deeper: LP is, at its very core, a **self-defeating** doctrine.

## The core self-refutation

Anything true or false is **meaningful** — truth implies meaningfulness, and so does falsity. So if LP is correct, LP is itself meaningful. LP says every meaningful statement is either a tautology or empirical. So if LP is correct, LP must itself be **either a tautology or empirical**.

It is **not a tautology**: it is no mere matter of convention that "meaningful sentence" is interchangeable with "sentence that is either a tautology or empirical." (If it were, the doctrine would be a triviality nobody could dispute — but it is hotly disputed.)

So, not being a tautology, LP is an **empirical truth if it is true at all**. But LP is **not empirical** either. Any attempt to supply an observational basis for a statement already **presupposes that the statement is meaningful**, and so presupposes an answer to "what must a statement satisfy to be meaningful?" Hence the question "what makes a statement meaningful?" is not itself an empirical question, and one cannot coherently seek empirical grounds for LP — the very search presupposes LP's own meaningfulness.

Therefore LP is **neither a tautology nor empirical**. By its own criterion it is meaningless; so it is a **counterexample to itself**, and is therefore false.

## The Tractatus ladder

Strikingly, the TLP half-sees this. Not one of its assertions is empirical, and not one is a tautology — so by the book's own thesis, the book is nonsense. Wittgenstein **admits** it, ending with the famous image of the ladder:

> "My propositions serve as elucidations in the following way: anyone who understands me eventually recognizes them as nonsensical, when he has used them — as steps — to climb up beyond them. (He must, so to speak, throw away the ladder after he has climbed up it.) … What we cannot speak about we must pass over in silence."

So far as these magisterial words are not trivial, they are **false**. To understand something is to grasp its meaning; so anything understood *has* a meaning. Thus Wittgenstein's words, *if understood*, have meaning — and he contradicts himself in saying that those who understand them will see they are meaningless. The closing injunction commits a similar solecism: to remain silent about something just **is** to pass over it in silence, so he is emptily asking us not to say anything about what we cannot say anything about.

## Empiricism is self-refuting too

The pattern generalizes. **Empiricism** is not the modest claim that

$$(1) \\quad \\text{whatever we know now we learned through perception (though future knowledge might come otherwise).}$$

It is the doctrine that

$$(2) \\quad \\text{it is inherent in the nature of knowledge that all knowledge be strictly observation-based.}$$

But $(2)$ cannot be known by observation. According to $(2)$, "$x$ is knowledge" is **inconsistent** with "$x$ is not known through observation" — and observation cannot tell you that one statement is inconsistent with another. So any body of observational data is consistent with empiricism's being false. Hence there can be no strictly observational grounds for empiricism: so far as empiricism is correct there are no grounds for believing it, and so far as there are such grounds, it is false. The probability that empiricism is true is **inversely proportional** to the evidential support our data confers on it — so if it is certainly true, it is certainly false. **Empiricism, if true, is false; therefore it is false.**

## Russell's naive-realism argument — and its flaw

Bertrand Russell gave an argument of exactly this "if true, then false" shape against **naive realism** (the doctrine that things are as they seem): "We all start from naive realism… But physics assures us that the greenness of grass… is not the greenness we know in experience… Naive realism leads to physics; and physics, if true, shows that naive realism is false. Therefore naive realism, if true, is false; therefore it is false."

Eloquent, but the reasoning is **spurious**. In observing the paperweight on my desk I am **not** observing some effect of the stone upon myself — I am observing the stone itself. True, my *observing* the stone is itself an effect of an event involving the stone (light bounces off it, strikes my retinas, and so on); but it does not follow that what I *see* is an effect rather than the stone. And Russell's second premise — that the greenness and coldness of daily life are *not* the greenness and coldness of physics — is also false. Physics tells us *what it is* for something to have the very properties we know by sight and touch; the coldness the physicist studies **is** the coldness you feel, though physics corrects many of our pre-theoretic beliefs about what that coldness consists in. So Russell's argument, for all Einstein's admiration of it, fails.

## Confirmation presupposes non-empirical knowledge

Confirmationism is a form of empiricism, and the very concept of **confirmation** is incoherent unless some knowledge is non-empirical. Nelson Goodman showed this. Define an object to be **"grue"** if it is green and examined before a set date, or blue and examined thereafter. Every green object examined before that date is grue. So ten million emeralds, all examined and found green, have all been found grue — and the same data that licenses "they will be green afterward" equally licenses "they will be grue," hence **blue**.

The trick generalizes to make *anything* confirm *anything*: cook up a property that coincides with a familiar one for all examined cases but diverges thereafter, and the projections part ways. Since some inductions clearly *are* better than others, the argument must contain an error — and the error is the tacit assumption that **induction has a strictly observational basis**. From a purely observational standpoint, calling an examined emerald "grue" is exactly as legitimate as calling it "green." Any body of data admits different, equally observationally legitimate descriptions. So if some inductions are better than others, we must have **legitimate but at least partly non-observational grounds** for treating some predicates (green) as projectible and others (grue) as not. That is the death of confirmationism — and of strict empiricism along with it.`,
  },
  {
    slug: "u4-tautological-truth-broken",
    title: "The brokenness of the concept of tautological truth",
    weekNumber: 4,
    blurb: "Tautologousness is a property of utterances and of the information by which a hearer learned the words' meanings, never of sentences themselves — so non-empirical truth cannot be conventional truth.",
    lectureTitle: "4.8 The brokenness of the concept of tautological truth",
    body: `# The brokenness of the concept of tautological truth

We will now see that it is **utterances** of sentences, not sentences *per se*, that are tautologies. This entails that, contrary to LP, **non-empirical truth cannot be identified with conventional truth.**

## The yard story

Whether a given utterance is tautologous depends on **how the hearer learned the meanings** of its words. Suppose you do not know what length "yard" picks out, and you ask your friend Smith. He points at an object $L$ and says, "the length of that object is one yard." $L$ is in fact three feet long, but you cannot tell that precisely just by looking; you can judge its length only roughly. You do not measure it. This is Monday.

Tuesday you encounter object $M$, **measure** it, and find it is exactly three feet. You tell Smith so. You know $M$'s length is roughly comparable to $L$'s — neither is ten times the other — but you do **not** know their precise comparison; you do not know whether $L$ is within six inches of $M$. Having a passion for comparing lengths, you are frustrated, and say you wish you knew how $L$ compares to $M$. Smith, puzzled and then irritated, finally says:

$$(\\text{i}) \\quad \\text{“there are three feet in a yard.”}$$

Under these circumstances, $(\\text{i})$ is **not trivial** to you and therefore **not a tautology**. It *would* be a tautology if you had learned "yard" by being told "a yard is a length of three feet." But you did not. You were shown a yard-long object and told that "yard" names *its* length — and the way your visual perception delivered that length to you differs from the way the words "three feet" deliver it. Given the information embodied in your perceptions of $L$ and $M$, it is a **substantive discovery** that the length you perceived in $L$ coincides with the length you measured in $M$. So $(\\text{i})$ expresses a tautology from the standpoint of someone who learned "yard" *as* "three feet," but **not** from yours.

## Tautologousness attaches to information, not sentences

It is standard practice among philosophers to call *sentences* "tautologies," but this embodies a serious confusion. A given sentence may or may not be a tautology **depending on the manner in which the hearer learned the meanings of its constituent expressions** — and therefore depending on the information by which the hearer knows those meanings.

You might object that $(\\text{i})$ is non-trivial to you only because you do not really *understand* it. Not so. To someone who knows no Albanian, an Albanian sentence is neither trivial nor non-trivial — it is just noise, no more trivial than wind-chimes. But in our story you **do** know what $(\\text{i})$ means; you are not in the position of the non-Albanian-speaker. It is *because* you understand Smith's utterance that it is non-trivial for you. Therefore tautologousness and non-tautologousness are properties **not of sentences** but **of the information on the basis of which hearers figure out what sentences mean**.

## Two morals about meaning

The story illustrates deep facts in the philosophy of language. First, one knows the meanings of expressions **descriptively** — through sight, hearing, and the rest. Your perceptions apprise you of things by *describing* them: their colors, shapes, sizes. Second, two very different descriptions can pick out one and the same thing ("the third U.S. President" and "the President responsible for the Louisiana Purchase"). So the perceptually encoded descriptions through which one learns what two expressions mean may differ enormously **even when the expressions mean the same thing**. A consequence: what an utterance *tells* you is as much a function of the information through which you learned its words' meanings as of those meanings themselves. Hence **a single sentence may convey very different propositions to different people, all of whom understand it**, because each accesses its meaning through a different description.

This is why "tautological truth," as LP needs it, is broken. LP wants a class of sentences that are true by convention and therefore trivially knowable. But triviality is not a feature sentences carry on their own; it floats with the hearer's route to the meaning. So there is no convention-fixed class of "tautologies" to identify non-empirical truth with — and LP's whole equation of the non-empirical with the conventional collapses.`,
  },
  {
    slug: "u4-meaningfulness-alternative",
    title: "An alternative to the LP conception of meaningfulness",
    weekNumber: 4,
    blurb: "Every meaningful sentence is equivalent to one of the form 'x has φ,' so a sentence is meaningful exactly when it attributes some property to some object — confirmability be damned.",
    lectureTitle: "4.9 An alternative to the logical positivist conception of meaningfulness",
    body: `# An alternative to the LP conception of meaningfulness

LP's analysis of meaningfulness was a complete failure. Here is the alternative.

## LP cannot even beat its own straw men

Asked for examples of meaningless statements, logical positivists reliably cited sentences **nobody ever uses** — "the nothing nothings," "the all is one," "the absolute is perfect." This is suspicious: a theory that only takes on straw men is no theory. Worse, LP cannot even beat the straw men. The trouble with these "statements" is **not** that they resist empirical corroboration. Consider:

$$(\\text{i}) \\quad \\text{“the universe is a perfect unity.”}$$

Beloved of the freshman narco-intellectual, this is meaningless as it stands. But say *exactly* what "perfect unity" means and $(\\text{i})$ becomes true or false. If a "perfect unity" is an object such that, given any two non-simultaneous events composing it, there is a possible causal process linking the earlier to the later, then $(\\text{i})$ is **true**. (In physics, "$x$ precedes $y$" is defined as: there is a possible causal process beginning with $x$ and ending with $y$.) If instead a "perfect unity" is an object such that, for any two parts $x$ and $y$, the very idea of $x$ existing without $y$ is incoherent, then $(\\text{i})$ is meaningful — and **false** (one can coherently imagine a universe with one statesman but not another).

So the real problem with $(\\text{i})$ is that "perfect unity" is **undefined**. Such "statements" are not statements at all; they are **statement-forms**. $(\\text{i})$ is meant to attribute some property to the universe, but since the property is unidentified, $(\\text{i})$ contains an undefined term and says nothing. It is exactly like "$x$ is tall": the reason "$x$ is tall" says nothing is that "$x$" has no referent — and the instant a referent is assigned ("$x$" $\\mapsto$ some particular person), "$x$ is tall" becomes meaningful. Being neither confirmable nor tautologous is merely a **symptom**; the disease is the undefined term.

## Every meaningful sentence has the form $\\langle x \\text{ has } \\varphi\\rangle$

The positive thesis: **if $S$ is meaningful, there is some object $x$ and some property $\\varphi$ such that $S$ says that $x$ has $\\varphi$.** Every sentence is equivalent to one of the form $\\langle x \\text{ has } \\varphi\\rangle$. Here is why, case by case.

**Monadic sentences.** "Smith is tall," "Jerry snores" — any non-relational, non-compound sentence — obviously has the form $\\varphi(x)$.

**Relational sentences.** Take "Bob loves Sally." Define a property $R$ of ordered pairs:

$$\\langle x, y\\rangle \\text{ has } R \\;\\leftrightarrow\\; x \\text{ loves } y.$$

Then "Bob loves Sally" is equivalent to "$\\langle\\text{Bob}, \\text{Sally}\\rangle$ has $R$," which has the form $\\langle x \\text{ has } \\varphi\\rangle$. Three-place relations go the same way. For "Bob is standing between Sally and Larry," define

$$\\langle x, y, z\\rangle \\text{ has } R^{*} \\;\\leftrightarrow\\; x \\text{ stands between } y \\text{ and } z,$$

so the sentence becomes "$\\langle\\text{Bob}, \\text{Sally}, \\text{Larry}\\rangle$ has $R^{*}$."

**Compound sentences.** Define a property $K$ of ordered pairs of sentences:

$$\\langle S_1, S_2\\rangle \\text{ has } K \\;\\leftrightarrow\\; \\text{the state of affairs described by } S_1 \\text{ is a consequence of that described by } S_2.$$

Then "Smith broke his leg because he fell out of the tree" becomes "$\\langle\\text{Smith broke his leg}, \\text{Smith fell out of the tree}\\rangle$ has $K$."

**Negative sentences.** Easiest of all: "Smith doesn't smoke" is equivalent to "the proposition that Smith smokes is false" — and *that* plainly has the form $\\langle x \\text{ has } \\varphi\\rangle$ (the object is a proposition; the property is falsity).

**Quantified generalizations.** A quantified generalization says how many members one class has in common with another. "Some person smokes" says the class of people shares at least one member with the class of smokers; "no giraffes fly" says the class of giraffes shares no member with the class of fliers; "all mice read Tolstoy" says the class of mice shares no member with the class of Tolstoy-non-readers. Define a property $E$ of pairs of properties:

$$\\langle P, Q\\rangle \\text{ has } E \\;\\leftrightarrow\\; \\{x : P x\\} \\cap \\{x : Q x\\} \\neq \\varnothing.$$

Then "some person smokes" is equivalent to "$\\langle\\text{being a person}, \\text{being a smoker}\\rangle$ has $E$," again of the form $\\langle x \\text{ has } \\varphi\\rangle$.

## The criterion

Every sentence $S$ is thus equivalent to one of the form $\\langle x \\text{ has } \\varphi\\rangle$. So the answer to "what is it for a sentence to be meaningful?" is immediate:

$$\\boxed{\\,S \\text{ is meaningful} \\;\\leftrightarrow\\; \\text{for some object } x \\text{ and property } \\varphi,\\ S \\text{ says that } x \\text{ has } \\varphi.\\,}$$

It is **irrelevant** whether it can be perceptually confirmed — let alone verified — that $x$ has $\\varphi$. How could this be wrong? If a sentence attributes any property to any thing, it says something about something and is meaningful. And if it attributes no property to anything, it says nothing about anything and is meaningless. That is the whole of it — and notice how completely it sidesteps verification, falsification, and confirmation, the broken machinery of LP.`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Homework 4.1 ─────────────
  {
    kind: "homework",
    title: "Homework 4.1 — Two kinds of puzzle and the positivist criterion",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the empirical/conceptual distinction and the verificationist family of criteria to fresh cases. Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇.",
    problems: [
      {
        topicSlug: "u4-empirical-vs-philosophical-puzzles",
        prompt:
          "Astronomers detect that a certain star dims on an irregular schedule no existing model predicted; this readings are logged in 2024. In 2031 a theorist accounts for the dimming entirely from the 2024 logs, running no new observations. Separate this breakthrough into its fact-based component and its conceptual component.",
        correctAnswer:
          "Fact-based component: the 2024 detection/logging of the irregular dimming (new raw data). Conceptual component: the 2031 model that re-describes the already-available logs.",
        explanation:
          "Every scientific breakthrough factors into (i) acquiring new raw data and (ii) modelling already-available data in a better way. The detection supplies (i); the later theory, citing no new data, supplies (ii). The seven-year gap is itself attributable to no one having drawn the right inferences sooner.",
        hint: "Which part required an instrument, and which part required only thinking?",
      },
      {
        topicSlug: "u4-philosophical-puzzles-conceptual",
        prompt:
          "Two theorists agree on what the sentence \"a binding contract is impossible without the genuine consent of both parties\" means but disagree about whether it is true. One proposes settling it by auditing ten thousand real contracts. Regiment the disputed claim modally and say whether the audit could decide it.",
        correctAnswer:
          "¬◇(Binding(c) ∧ ¬Consented(c)), i.e. □¬(Binding(c) ∧ ¬Consented(c)). The audit cannot decide it.",
        explanation:
          "The claim asserts an inconsistency between being binding and lacking consent: $\\neg\\Diamond(\\text{Binding}(c) \\wedge \\neg\\text{Consented}(c))$. Observation reports at most what is the case, never what must be or cannot be, so no survey of actual contracts can establish or refute a modal/inconsistency claim. The dispute is purely conceptual.",
        hint: "Inconsistency is a ◇/□ fact, and instruments do not read off ◇/□ facts.",
      },
      {
        topicSlug: "u4-tractarian-roots-of-lp",
        prompt:
          "Apply the Tractarian criterion (a sentence is meaningful iff it is a definitional truth or an observation report) to: \"Every event has a sufficient cause.\" Classify it under the two sub-claims and state the verdict the criterion forces.",
        correctAnswer:
          "Not a definitional truth and not an observation report; therefore the criterion classifies it as meaningless (ungrammatical nonsense).",
        explanation:
          "The sentence is non-tautologous (it is no mere definition that events have causes) and non-empirical (no sense-report establishes a universal necessitation). Since CT admits only tautologies or observation reports, it consigns this — like every substantive philosophical claim and its negation — to nonsense, which is exactly the corollary that all philosophy is meaningless.",
        hint: "Run it through both '(1) non-empirical ⇒ tautology' and '(2) non-tautology ⇒ observation report.'",
      },
      {
        topicSlug: "u4-verificationism-falsificationism",
        prompt:
          "For each sentence say whether it can be conclusively verified by observation, conclusively falsified, or neither, and why: (a) \"Every sample of pure sodium ignites in water.\" (b) \"There exists a sapphire weighing exactly 5.00000 carats.\"",
        correctAnswer:
          "(a) Falsifiable but not verifiable. (b) Verifiable but not falsifiable.",
        explanation:
          "(a) is a universal $\\forall x\\,(Sx \\to Ix)$: one negative instance falsifies it, but no finite survey verifies it. (b) is an existential $\\exists x\\,(Sx \\wedge Wx)$: one positive instance verifies it, but no finite survey falsifies it. This asymmetry is exactly why verificationism and falsificationism each die to the other's counterexample.",
        hint: "Universals resist verification; existentials resist falsification.",
      },
      {
        topicSlug: "u4-verificationism-falsificationism",
        prompt:
          "Sufism aside, suppose someone defines: P confirms Q iff Q is more probable given P than given ¬P. A detective notes that arsonists disproportionately own accelerants. Using the definition, does \"Jones owns a drum of accelerant\" confirm \"Jones is the arsonist,\" and what does this commit confirmationism to about meaningfulness?",
        correctAnswer:
          "Yes, it confirms it; confirmationism is thereby committed to identifying the meaningful non-tautologous statements with the empirical ones.",
        explanation:
          "Since arson is likelier given accelerant-ownership than given its absence, the ownership claim raises the probability of the arson claim, so it confirms it by the definition. Confirmationism holds a non-tautology is meaningful iff some possible observation could confirm it, which is equivalent to saying all meaningful non-tautologous statements are empirical.",
        hint: "Confirmation just means raising the probability, not establishing the truth.",
      },
    ],
  },

  // ───────────── Homework 4.2 ─────────────
  {
    kind: "homework",
    title: "Homework 4.2 — Why Logical Positivism fails",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Diagnose where positivist and empiricist moves break down in fresh scenarios. Symbolic regimentation where the principle is formal; otherwise a precise verdict with justification.",
    problems: [
      {
        topicSlug: "u4-lp-evaluated",
        prompt:
          "Grant that \"a decade is ten years\" and \"a century is one hundred years\" are true purely by convention. It follows that \"a century is to a decade as a decade is to a year\" (each ten times the smaller). Is this consequence itself a convention, and what does the case establish about the claim that all non-empirical truth is conventional?",
        correctAnswer:
          "No, the consequence is not itself a convention; it is a non-conventional, non-empirical truth that follows from conventions — refuting LP.",
        explanation:
          "From conventions one can derive truths that are not themselves stipulated; that $100/10 = 10/1$ follows from the definitions but is not laid down by any of them. So there exists a non-tautologous, non-empirical truth, which is precisely what LP's exhaustive 'tautology-or-empirical' dichotomy forbids.",
        hint: "Distinguish 'follows from conventions' from 'is itself a convention.'",
      },
      {
        topicSlug: "u4-lp-evaluated",
        prompt:
          "A semanticist asserts: \"Two sentences mean the same thing if and only if speakers use them in the same circumstances.\" Construct a counterexample using sentences that have never been uttered, and state the absurd consequence.",
        correctAnswer:
          "Any two distinct sentences that have never been uttered are (vacuously) used in the same circumstances — namely none — so the criterion declares them synonymous, which is absurd.",
        explanation:
          "A natural language contains infinitely many never-uttered sentences. If sameness of meaning is sameness of use, then any two never-used sentences, being used in the same (empty) set of circumstances, count as synonymous. Since obviously non-synonymous sentences can both be unused, the use-criterion of meaning is false.",
        hint: "What is the 'use' of a sentence nobody has ever produced?",
      },
      {
        topicSlug: "u4-lp-evaluated-holism",
        prompt:
          "A cosmological theory T, taken alone, predicts nothing observable; only T together with statements assigning specific values to initial conditions yields a prediction. A positivist proposes: \"S is meaningful if there is some S′ such that S together with S′ is confirmable.\" Show, with a schema, how the nonsense string \"the void voids\" passes this test.",
        correctAnswer:
          "Let M = \"the void voids\" and let O be any confirmable observation sentence. Take S′ = (O → M). Anything confirming O then confirms (O → M)∧… so M is certified 'meaningful.' Schematically: O confirms (O → M).",
        explanation:
          "The holistic patch lets any string ride in on a conditional: whatever observation supports the antecedent supports the whole conditional, and thereby the otherwise-meaningless consequent. Because the patch needed to admit genuine theories is permissive enough to admit pure nonsense, the empirical criterion cannot be repaired.",
        hint: "Pair the nonsense with an observation sentence inside a conditional.",
      },
      {
        topicSlug: "u4-lp-self-defeating",
        prompt:
          "A philosopher proposes the thesis: \"A sentence is meaningful only if it could in principle be rendered as a photograph.\" Apply the thesis to itself and state the verdict, naming the general flaw.",
        correctAnswer:
          "The thesis itself cannot be rendered as a photograph, so by its own standard it is meaningless; it is a counterexample to itself and therefore false (self-defeating / self-refuting).",
        explanation:
          "A criterion of meaningfulness is meaningful only if true or false, hence must satisfy its own condition. Since the thesis is not a photograph-renderable sentence, it fails its own test, exactly as LP fails the 'tautology-or-empirical' test. Any criterion that excludes itself is self-refuting.",
        hint: "Feed the criterion its own sentence as input.",
      },
      {
        topicSlug: "u4-lp-self-defeating",
        prompt:
          "Define a predicate: an object is \"freven\" if it is examined before the year 2100 and found smooth, or examined after 2100 and found rough. Every object examined so far has been smooth, hence frven. Explain why the smoothness data supports \"future objects will be rough\" exactly as well as \"future objects will be smooth,\" and what this shows about confirmation.",
        correctAnswer:
          "From the same examined data, projecting 'smooth' predicts smooth-after-2100 while projecting 'frven' predicts rough-after-2100; both are equally observationally supported. This shows induction (confirmation) has a partly non-observational basis.",
        explanation:
          "Every examined object is both smooth and frven, so the evidence underdetermines which predicate to project; 'frven' yields 'rough after 2100,' 'smooth' yields 'smooth after 2100.' Since one projection is clearly better, we must have legitimate but non-observational grounds for preferring projectible predicates — so confirmationism, which demands a purely observational basis, is incoherent.",
        hint: "Both descriptions fit every examined case; they diverge only about the future.",
      },
    ],
  },

  // ───────────── Homework 4.3 ─────────────
  {
    kind: "homework",
    title: "Homework 4.3 — Tautology, information, and the property-attribution criterion",
    weekNumber: 4,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the doctrine that tautologousness tracks the hearer's information, and regiment fresh sentences into the canonical 'x has φ' form. Use ordered-pair and class notation: ⟨ ⟩, ∈, ∩, ∅.",
    problems: [
      {
        topicSlug: "u4-tautological-truth-broken",
        prompt:
          "Priya learned the word \"furlong\" ostensively — a surveyor walked off a stretch of track and said \"that distance is one furlong\" — and separately learned \"220 yards\" by measuring with a tape. Tom learned \"furlong\" straight from the definition \"a furlong is 220 yards.\" For each, is the utterance \"a furlong is 220 yards\" trivial or informative, and what does the contrast establish?",
        correctAnswer:
          "Informative for Priya; trivial (a tautology) for Tom. This establishes that tautologousness is a property of the hearer's information, not of the sentence.",
        explanation:
          "Priya's perceptual route encodes the furlong-length under a different description from the measured 220-yard length, so their coincidence is a substantive discovery for her. Tom learned the term as the definition, so for him the utterance restates a stipulation. Same sentence, opposite status — so triviality belongs to the information by which meaning is grasped, not to the sentence.",
        hint: "Did the hearer learn the word by pointing or by definition?",
      },
      {
        topicSlug: "u4-tautological-truth-broken",
        prompt:
          "Someone insists that \"the morning star is the evening star\" must be trivial because both terms denote one planet. Using the descriptive nature of how we learn reference, explain why this utterance can be highly informative to a competent speaker.",
        correctAnswer:
          "Because the two names are grasped through different descriptions (a body seen at dawn vs. a body seen at dusk), their identity is a genuine discovery; sameness of referent does not make the utterance trivial.",
        explanation:
          "We know what expressions denote descriptively, and two very different descriptions can fix one object. A speaker who learned each term via its own perceptual description has not thereby learned they co-refer, so the identity statement conveys a substantive proposition. Triviality depends on the route to the meaning, not merely on the meaning.",
        hint: "Two descriptions, one object — is the coincidence given for free?",
      },
      {
        topicSlug: "u4-meaningfulness-alternative",
        prompt:
          "Regiment \"Diego outranks Mei\" into the canonical form ⟨x has φ⟩ using an ordered-pair predicate. Define the predicate explicitly.",
        correctAnswer:
          "Define R by: ⟨x, y⟩ has R ↔ x outranks y. Then \"Diego outranks Mei\" ≡ \"⟨Diego, Mei⟩ has R.\"",
        explanation:
          "A two-place relation is turned into a one-place property of an ordered pair: $\\langle x,y\\rangle$ has $R \\leftrightarrow x \\text{ outranks } y$. The sentence then attributes the single property $R$ to the single object $\\langle\\text{Diego}, \\text{Mei}\\rangle$, fitting the form $\\langle x \\text{ has } \\varphi\\rangle$.",
        hint: "Make the relation a property of the pair.",
      },
      {
        topicSlug: "u4-meaningfulness-alternative",
        prompt:
          "Regiment \"the painting hangs above the fireplace\" (a two-place spatial relation) and \"the referee stood between the captains\" (a three-place relation) into the form ⟨x has φ⟩, defining each predicate.",
        correctAnswer:
          "Define R by ⟨x,y⟩ has R ↔ x hangs above y; so \"⟨the painting, the fireplace⟩ has R.\" Define R* by ⟨x,y,z⟩ has R* ↔ x stood between y and z; so \"⟨the referee, captain₁, captain₂⟩ has R*.\"",
        explanation:
          "Relations of any arity become properties of the corresponding ordered tuple: the dyadic case uses a pair, the triadic case a triple. Each sentence then attributes one property to one object (a tuple), giving the canonical $\\langle x \\text{ has } \\varphi\\rangle$ form.",
        hint: "Two slots → ordered pair; three slots → ordered triple.",
      },
      {
        topicSlug: "u4-meaningfulness-alternative",
        prompt:
          "Regiment the negative sentence \"Wendy does not jog\" into the form ⟨x has φ⟩, identifying the object and the property.",
        correctAnswer:
          "≡ \"the proposition that Wendy jogs has the property of being false.\" Object: the proposition that Wendy jogs; property: falsity.",
        explanation:
          "A negative sentence is recast as attributing falsity to the proposition embedded in it: $\\langle$the proposition that Wendy jogs$\\rangle$ has $\\langle$falsity$\\rangle$. This squarely fits $\\langle x \\text{ has } \\varphi\\rangle$ without any negation operator left over.",
        hint: "Don't negate the predicate — make the inner proposition the object and 'false' the property.",
      },
    ],
  },

  // ───────────── Unit 4 Test ─────────────
  {
    kind: "test",
    title: "Unit 4 Test — Logical Positivism, its collapse, and meaningfulness",
    weekNumber: 4,
    isTimed: true,
    timeLimitMinutes: 40,
    instructions:
      "Timed, 40 minutes. Apply each principle to a new case: classify, regiment, or diagnose, and justify. Use the math keyboard for ∀, ∃, ¬, ∧, ∨, →, ↔, □, ◇, ∈, ∉, ∅, ∩, ∪, ⟨ ⟩.",
    problems: [
      {
        topicSlug: "u4-empirical-vs-philosophical-puzzles",
        prompt:
          "A lab records, in 2019, that a certain enzyme folds far faster than any then-known mechanism allowed; in 2026 a biochemist explains the speed solely by re-interpreting the 2019 recordings, gathering no new data. Identify which component of the breakthrough is fact-based and which is conceptual, and say what the 2019–2026 delay is attributable to.",
        correctAnswer:
          "Fact-based: the 2019 recording of the anomalous folding speed. Conceptual: the 2026 re-interpretation of those recordings. The delay is attributable to no one's having drawn the right inferences sooner.",
        explanation:
          "Breakthroughs split into acquiring raw data (1) and re-modelling available data (2). The measurement supplies (1); the later explanation, using no new data, supplies (2). A gap during which the data was already in is a failure of inference, not of fact-gathering.",
      },
      {
        topicSlug: "u4-philosophical-puzzles-conceptual",
        prompt:
          "Two ethicists agree on the meaning of \"an act done from duty alone can still be morally worthless\" but disagree on its truth; one wants to resolve it by polling moral intuitions in a large survey. Regiment the disputed claim and say whether observation can settle it.",
        correctAnswer:
          "◇(FromDuty(a) ∧ Worthless(a)) (the claim asserts the compossibility of acting from duty and being worthless). Observation cannot settle it.",
        explanation:
          "The disputed claim is a modal one about what is possible/consistent. Since the parties agree on meaning and differ on truth, the issue is non-linguistic and non-empirical; observation reports only what is the case, never what is possible or impossible, so no survey can decide it.",
      },
      {
        topicSlug: "u4-tractarian-roots-of-lp",
        prompt:
          "By the Tractarian criterion, classify \"There is exactly one self-identical object that nothing causally touches\" under the two sub-claims of CT and give the verdict. Then state, in one clause, the corollary CT yields about philosophy generally.",
        correctAnswer:
          "Not a tautology and not an observation report ⇒ meaningless by CT. Corollary: every (non-trivial, non-empirical) philosophical statement, and its negation, is likewise nonsense.",
        explanation:
          "The sentence is neither definitional nor a sense-report, so CT's disjunction excludes it. Because philosophical claims are characteristically non-tautologous and non-empirical, CT consigns all of them — together with their negations — to nonsense, which is its notorious corollary.",
      },
      {
        topicSlug: "u4-verificationism-falsificationism",
        prompt:
          "Classify each as verifiable / falsifiable / neither by observation, with a one-line reason: (a) \"Every neutron star emits X-rays.\" (b) \"There is a meteorite containing element 119.\"",
        correctAnswer:
          "(a) Falsifiable, not verifiable (universal). (b) Verifiable, not falsifiable (existential).",
        explanation:
          "Universal generalizations $\\forall x\\,(Nx \\to Ex)$ can be refuted by a single counterexample but never confirmed by finite search; existential generalizations $\\exists x\\,(Mx \\wedge Cx)$ can be confirmed by a single instance but never refuted by finite search. This is the very asymmetry that sinks both verificationism and falsificationism.",
      },
      {
        topicSlug: "u4-lp-evaluated",
        prompt:
          "Grant that \"a fortnight is fourteen days\" and \"a week is seven days\" are true by convention. The claim \"a fortnight is exactly twice a week\" follows. Decide whether that claim is itself conventional, and state the consequence for LP.",
        correctAnswer:
          "It is not itself conventional; it is a non-conventional, non-empirical truth following from conventions, which refutes LP.",
        explanation:
          "That $14 = 2 \\times 7$ follows from the two definitions but is laid down by neither; it is a necessary consequence, not a stipulation. Its existence violates LP's claim that every meaningful statement is either a tautology or empirical.",
      },
      {
        topicSlug: "u4-lp-self-defeating",
        prompt:
          "A thinker asserts: \"No statement is knowable unless some experiment could in principle establish it.\" Apply the thesis to itself and state the verdict, identifying the general defect.",
        correctAnswer:
          "No experiment could establish the thesis itself, so by its own standard it is not knowable; it is self-defeating and therefore false.",
        explanation:
          "The thesis is a claim about the nature of knowability, not something any experiment could establish (any such experiment presupposes the standard at issue). Failing its own condition, it refutes itself — the same structure by which LP and strict empiricism collapse.",
      },
      {
        topicSlug: "u4-tautological-truth-broken",
        prompt:
          "Hana learned \"hectare\" by being shown a fenced field and told \"that area is one hectare,\" and learned \"10,000 square metres\" by calculation. Ravi learned \"hectare\" as the definition \"10,000 square metres.\" Decide, for each, whether \"a hectare is 10,000 square metres\" is a tautology, and state the moral.",
        correctAnswer:
          "For Hana it is non-trivial (not a tautology); for Ravi it is a tautology. Moral: tautologousness is a property of the hearer's information, not of the sentence.",
        explanation:
          "Hana grasps the hectare-area under a perceptual description distinct from the calculated 10,000-m² description, so their identity is a real discovery for her; Ravi learned the term as that very definition, so for him it is trivial. Identical sentence, divergent status — triviality tracks the route to meaning, dismantling LP's notion of convention-fixed tautology.",
      },
      {
        topicSlug: "u4-meaningfulness-alternative",
        prompt:
          "Regiment the quantified sentence \"some engineers paint\" as an attribution of a property to a single object, using a class-overlap predicate; define the predicate explicitly. Then say whether a sentence that attributes a definite property to a definite object but is neither verifiable nor falsifiable is meaningful on the proposed criterion.",
        correctAnswer:
          "Define E by ⟨P, Q⟩ has E ↔ {x : Px} ∩ {x : Qx} ≠ ∅. Then \"some engineers paint\" ≡ \"⟨being an engineer, being a painter⟩ has E.\" Yes — such a sentence is meaningful.",
        explanation:
          "The generalization becomes a property $E$ of a pair of properties: $\\langle P,Q\\rangle$ has $E \\leftrightarrow \\{x:Px\\}\\cap\\{x:Qx\\}\\neq\\varnothing$, fitting $\\langle x \\text{ has } \\varphi\\rangle$. On the alternative criterion a sentence is meaningful iff it attributes some property to some object, so confirmability and verifiability are irrelevant — a definite attribution suffices.",
      },
    ],
  },
];

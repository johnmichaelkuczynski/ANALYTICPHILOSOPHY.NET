import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  // ───────────────────────────────────────────────────────────────
  // Week 5 — The Picture Theory of Meaning (Tractatus)
  // ───────────────────────────────────────────────────────────────
  {
    slug: "u5-picture-theory-meaning",
    title: "The picture theory of meaning",
    weekNumber: 5,
    blurb:
      "Wittgenstein's claim that sentences are pictures of facts is either trivial or false — and the deep reason is that sentences are conventional, digital structures that go through propositions, while pictures do not.",
    lectureTitle: "5.0 The picture theory of meaning",
    body: `# The picture theory of meaning

One of the most interesting contentions put forth in the *Tractatus Logico-Philosophicus* (TLP) is the so-called **picture theory of meaning**. In the TLP, Wittgenstein says that sentences are *pictures* of the facts they describe.

## The fatal dilemma: trivial or false

What does he mean? There are only two readings, and the theory dies on both.

**First reading.** Maybe he means that sentences are picture-*like* in that they, like pictures, *represent* facts. But in that case what Wittgenstein is saying is completely and utterly trivial. Of course sentences represent facts; saying so tells us nothing.

**Second reading.** So, so far as what Wittgenstein is saying has any substance, it isn't that sentences are *like* pictures of the facts they describe; it must be that they *are* such pictures. But in that case, what Wittgenstein is saying is **false**.

Why false? Because it is only relative to **arbitrary conventions** that "Smith punched Jones" describes the fact that Smith punched Jones. But it is *not* relative to such conventions that a film or painting of Smith punching Jones describes that fact. The film resembles the event; the sentence merely conventionally codes it.

## The non-conventional component — and why it doesn't rescue the theory

To be sure, there is a *non-conventional* component to sentential representation. Let $P$ be the proposition meant by the sentence:

> (1) "Given that Socrates was a philosopher, it follows from the fact that Socrates was bald that there has been at least one bald philosopher."

The fact that (1) *means* $P$ is not itself a convention. It is a **logical consequence** of our semantic conventions (e.g., that "Socrates" refers to Socrates, etc.). But for that very reason, there is a **conventional component** to that fact: it is downstream of conventions. And since graphic resemblance is a *non-conventional* method of representation, it follows that, so far as (1)'s relation to the fact it describes is conventional, that relation is fundamentally **not** like the relation borne by a picture of an event to that event.

Thus the picture-theory is **false if taken literally** and **empty if taken non-literally**.

## Wittgenstein's argument: the law of projection

But maybe there's some way of interpreting the theory we've overlooked. Consider Wittgenstein's own argument:

> At first sight a sentence — one set out on the printed page, for example — does not seem to be a picture of the reality with which it is concerned. But neither do written notes seem at first sight to be a picture of a piece of music, nor our phonetic notation (the alphabet) to be a picture of our speech. And yet these sign-languages prove to be pictures, even in the ordinary sense, of what they represent. … There is a general rule by means of which the musician can obtain the symphony from the score, and which makes it possible to derive the symphony from the groove on the gramophone record, and, using the first rule, to derive the score again. … And that rule is the law of projection which projects the symphony into the language of musical notation.

The idea seems to be that just as **laws of projection** coordinate the painting of a bowl of fruit with the bowl of fruit itself, so the **semantic rules** of a language coordinate its sentences with the realities they describe.

## Why the analogy is shallow: sentences go *through* a proposition

But this analogy is a shallow one; and when scrutinized, it becomes even clearer how *unlike* pictures sentences are.

What if, because of some change in the environment, **snow turned black**? The English language would not for that reason be impaired. In fact, English would, without itself having to change, give us the resources to *describe* this change: we could say "snow is black." As far as the English language is concerned, snow can be any color.

The semantic rules of English do **not** say that snow is white. They say that *if* snow is white, one can express that fact by saying "snow is white"; and that *if* snow is black, one can express *that* fact by saying "snow is black." So the semantic rules of English assign sentences not to the *fact* that snow is white — for, as far as those rules know, it may be no fact at all — but to the **proposition** that, when true, gives rise to that fact.

Thus sentences depict facts **by way of having propositions for their meanings**. Writing $\\llbracket S \\rrbracket$ for the proposition expressed by $S$, the convention pairs $S$ with $\\llbracket S \\rrbracket$, and $S$ touches the fact only when $\\llbracket S \\rrbracket$ is true (instantiated):

$$\\text{Depicts}(S, \\text{fact}) \\;\\longleftrightarrow\\; \\text{True}(\\llbracket S \\rrbracket).$$

But this is **not** how photographs work. A photograph does not go through the corresponding proposition. It goes *straight to the fact* (when there is one). No picture goes through a proposition. Pictures, unlike sentences, go straight to the facts, if any there be, that they represent. This shows how fundamentally unlike pictures sentences are.

## Sentences are digital; pictures are not

A related point: pictures have structures radically different from those of any sentence. **Sentences are digital structures.** They have a *unique decomposition into a finite number of discrete parts*. "The cat is on the mat" decomposes into "cat," "mat," and so on.

Pictures are not like this. A picture of a cat on a mat does *not* have one minimal unit of significance corresponding to the cat, another to the mat, and so on. The part of the picture corresponding to the cat may *also* contain a part corresponding to the cat's ear, and to the cat's leg, and to the leg's shadow — significance nested inside significance, with no privileged minimal units.

## Why the digital character follows from conventionality

The fact that sentences, unlike graphic representations, are digital structures is a **consequence** of the fact that the former, unlike the latter, have a conventional component. The reason is subtle but worth stating, because it shows how deeply wrong the picture-theory is and reveals a lot about language.

Let $D_1$ be some random **photograph of a person smiling**. $D_1$ is not a symbol of a language. But that could easily change. For it to happen, some convention would have to arise whereby $D_1$ had a fixed meaning — whereby it meant, say, *that people are sometimes happy* — and the same thing, *mutatis mutandis*, happens with several other photographs. So there is some photograph $D_2$ of a person crying, and a convention whereby $D_2$ means *that people are sometimes unhappy*; and so on. Let $L$ be the language defined by the totality of these conventions.

**Point one.** Even though $D_1$ is an image, it is not *functioning* as an image so far as it is functioning as an expression of $L$. The fact that $D_1$ is a picture of a smiling person may make it easier to *remember* that, in $L$, $D_1$ means people are sometimes happy. But that won't be *what it is* for $D_1$ to bear that meaning. Compare: the character "0" is an unfilled hole and can be taken as a graphic representation of emptiness — but that is not *what it is* for "0" to denote the integer preceding one. The same holds for $D_1$.

**Point two.** $D_1$ doesn't even graphically represent the fact that people are sometimes happy. It graphically represents the only tenuously related fact that, on *one* occasion, *one* individual was happy, along with countless specific facts about that person's appearance that have nothing to do with anyone's being happy. So it is *not* by virtue of graphically representing the general fact that, when functioning as a sentence of $L$, $D_1$ describes it.

**Point three — the semantic primitive.** So far as $D_1$ is a sentence of a language, what it actually depicts is irrelevant; the nuances of the smiling face are irrelevant; its internal structure is irrelevant. Considered as an expression of $L$, it has **no internal structure**. It is what philosophers of language call a **semantic primitive**: a symbol that does not consist of other symbols and that, so far as it is an expression of a language, thus has no internal structure. For exactly the same reasons, each photograph composing $L$ is, considered as an expression of $L$, devoid of internal structure — and thus, in the most extreme way possible, *not* like a graphic representation.

**Point four — combining pictures.** One more step. Let $N$ be a photograph of a bolt of lightning, and suppose $N$ is the $L$-translation of the English "it is not the case that." So if $S$ is the $L$-translation of "grass is green," then $NS$ (formed by putting $N$ to the left of $S$) is the $L$-translation of "grass is not green." Even though $NS$ consists of pictures, **it is not itself a picture**. Putting two pictures together isn't one picture; it's just two pictures next to each other. For the same reason, if conventions allowed the sentences of $L$ to be conjoined or disjoined, the resulting compound sentences would not be pictures either:

$$N \\frown S \\;=\\; NS, \\qquad NS \\text{ is two signs, not one picture.}$$

## Taking stock

Not a single one of the *simple* symbols belonging to $L$ is a graphic representation of the fact it depicts, and not a single one of the *complex* symbols of $L$ is a graphic representation of the fact depicted by any of its components. In general, **to the extent that a thing is functioning as a linguistic expression, it is not functioning as a picture.** Things that happen to be pictures cannot function as pictures so far as they are functioning as sentences.

Thus Wittgenstein's contention that sentences are pictures of the facts they describe is the **antithesis of the truth**. And we have learned something positive: *any* conventional assignment of meaning to *any* collection of symbols — any language whatsoever — necessarily yields symbols that have a unique decomposition into discrete parts. This is almost tautologically true of compound symbols, and *vacuously* true of non-compound symbols, since no such symbol has any internal structure at all.`,
  },
  {
    slug: "u5-picture-theory-empiricism",
    title: "The picture theory and empiricism",
    weekNumber: 5,
    blurb:
      "The picture theory dovetails with empiricism — but image-resistant truths like negations, and the rules that convert pictorial input into non-pictorial belief, expose why strict empiricism cannot stand.",
    lectureTitle: "5.1 The picture theory of meaning (continued)",
    body: `# The picture theory and empiricism

It is not entirely clear *why* Wittgenstein said that sentences are pictures. But it is clear that this contention is **consistent with his empiricism**.

## What empiricism claims

**Empiricism** says that all knowledge is observation-based. Thus, if you know it, then either

1. you **sense-perceived** it, or
2. you **inferred** it from what you saw, *provided that* the inference rule you used is one that is itself known through sense-perception.

(So far as knowledge is obtained with the help of an inference rule whose legitimacy *cannot* be authenticated by sense-perception, some knowledge is not perception-based — and empiricism is false.)

## Perception delivers pictures

Our sense-perceptions give us **pictures**. Not all sensory modalities give visual pictures, of course: hearing gives auditory pictures, touch gives tactile pictures, and so on. But perceptual representation is *pictorial* representation. (In what follows, when I say "see," I mean "see *or* hear *or* touch …".)

## Image-resistant truths

But much of what we know **cannot be embodied in images of any kind.** (Here I use "image" to cover moving pictures too, not just stills.) I know that:

> (1) the moon is not made of cheese.

What would an *image* of this fact be? An image of a cheesy moon with a big X through it? No. The big X would not be an image at all. Like the word "not," it would be a **conventional sign of negation**. A picture of a cheesy moon really does resemble a cheesy moon, but a big X does not resemble the *operation of negation*. Nothing could physically resemble that operation, since it isn't something that could possibly be seen or otherwise sense-perceived:

$$\\text{Pictureable}(\\neg) \\;=\\; \\text{False}.$$

Also, a picture of a cheesy moon corresponds to a great *many* propositions. Any such picture will *also* depict an object having a certain color, shape, size, and so on. Since (1) says nothing about the moon's shape or color, it is **not identical** with any such image. No proposition is identical with any image, since any image will contain information not contained in the proposition.

So there are at least some cases where one's knowing a fact does **not** consist in there being an image, in one's mind, of that fact.

## How can the empiricist cope?

First, it is hard to see how sense-perception — which gives us nothing but one image after another — could apprise us of truths incapable of being expressed in strictly imagistic form.

For argument's sake, grant the empiricist that it is strictly through perception that I know the moon is made of XYZ. How do we then handle my *subsequent* knowledge that the moon is **not** made of cheese? Obviously that knowledge is largely based on my knowledge that it's made of XYZ. But it cannot be *entirely* based on it. What my senses tell me, at most, is what the moon **is** made of — not what it **isn't** made of. So some kind of **non-perceptual** knowledge is involved in my making the leap:

$$\\text{Made-of}(m, \\text{XYZ}) \\;\\longrightarrow\\; \\neg\\,\\text{Made-of}(m, \\text{cheese}).$$

That arrow is an exclusion rule, and perception does not hand it to us.

## The conversion argument

Here is a related argument. Even if image-resistant facts (e.g., those expressed by negative statements) were learned in a strictly perceptual manner, the **mental states** that mediate our knowledge of them are not themselves images. The information they carry must be encoded in some **non-iconic** form. This means that, at some point, pictorial information was *converted* into non-pictorial information.

But if our post-perceptual mental states are to be **knowledge**, that conversion process must be a **legitimate** one: given pictorial input $x$, it cannot yield an output $y$ that is inconsistent with $x$. Moreover, we must *know* that the conversions being made are legitimate.

Why? Compare testimony. If, on the basis of testimony from a source whose reliability I have **not** established, I believe $P$, I do not thereby *know* that $P$. Uncorroborated testimony, though a helpful first step on the road to knowledge, is not itself enough for knowledge. For much the same reason, if I do not know the rules that permit deriving non-perceptual beliefs from strictly perceptual ones, then — even if my post-perceptual beliefs happen to be correct — they are not knowledge.

## The real problem with empiricism

But there couldn't possibly be any *strictly perceptual* way of knowing that those conversions are accurate. The conversions, by supposition, turn pictures into non-pictures. So our knowledge of their existence — and *a fortiori* of their legitimacy — cannot itself be strictly pictorial.

This is the real problem with empiricism: **the rules we use to make inferences from perceptual experience cannot themselves be learned strictly on the basis of sense-perception.** (This is taken up at length in Chapters 12 and 13.)`,
  },
  {
    slug: "u5-picture-theory-saying-showing",
    title: "Saying, showing, and the limits of self-description",
    weekNumber: 5,
    blurb:
      "Wittgenstein's 'what can be shown cannot be said' is self-undermining and false; we can state logical forms — yet a diagonal argument shows no language can state all of its own semantic rules.",
    lectureTitle: "5.2 The picture theory of meaning (continued)",
    body: `# Saying, showing, and the limits of self-description

Interestingly, Wittgenstein made points at least vaguely like the previous chapter's in the TLP:

> In order to be able to represent logical form, we should have to be able to station ourselves with sentences outside logic, that is to say outside the world. Sentences cannot represent logical form: it is mirrored in them. What finds its reflection in language, language cannot represent. What expresses itself in language, we cannot express by means of language. Propositions *show* the logical form of reality. They display it. … If two sentences contradict one another, then their structure shows it; the same is true if one of them follows from the other. … **What can be shown, cannot be said.**

So if one proposition $fa$ shows that the object $a$ occurs in its sense, then two sentences $fa$ and $ga$ show that the same object is mentioned in both.

## The self-undermining problem

Wittgenstein seems to be saying that we **cannot correctly describe** the relationship holding between our words and the facts they describe. But if that is correct, then that very point *describes* the relationship — which calls its own coherence into question. The claim refutes itself by being made.

## We can, in fact, state logical forms

Contrary to Wittgenstein, **we can identify the logical forms of our own utterances.** To identify the logical form of a statement is simply to make clear what it means. We can do this; we do it all the time; we do it whenever we put the meanings of words into words. There are qualifications (below), but none that redound to Wittgenstein's credit.

His assertion that "what can be shown, cannot be said" is obviously false. I tell you I can do fifty push-ups — I *say* "I can do fifty push-ups." You don't believe me. So I *show* you: I do fifty push-ups in front of you. Showing and saying coexist. And that principle holds no less for logical forms than for push-ups.

## Why the view is nonetheless consistent with the picture theory

Although it isn't clear why Wittgenstein made these claims, it is clear they are consistent with his view that sentences are pictures.

**A picture cannot picture itself.** If $P$ is a picture of a seagull, $P$ can't contain a picture of *itself*, for the simple reason that **nothing can be a proper part of itself**. (Of course $P$ might picture a big seagull *and* a smaller but otherwise identical one — but the big-seagull part is not identical with the little-seagull part. The big part contains two seagull-images; the little part only one.)

So if sentences *were* pictures, then a given sentence $S_1$ couldn't be a picture of itself. But it does **not** follow that some *other* picture $S_2$ couldn't be a picture of $S_1$. Nor, therefore, does Wittgenstein's much stronger claim follow — that *nothing* (no picture, no set of pictures, no sentence) could depict or represent the rules by which true statements are paired with the facts they describe.

## The two roots of Wittgenstein's error

Wittgenstein's claim that we cannot state the logical forms of sentences — which collapses into the brazenly false claim that we can never say what our words mean — has two roots.

**Root one** is the just-discussed belief that sentences are pictures of facts.

**Root two** is his belief that, *if* we can say what our words mean, then we have no way of dealing with paradoxes like the following. If somebody says

> (i) "what I'm saying is false,"

then what that person says is *true if it's false* and *false if it's true*:

$$\\text{True}(i) \\;\\longleftrightarrow\\; \\neg\\,\\text{True}(i).$$

Wittgenstein was keenly interested in this paradox in his pre-Tractarian years. His reaction, it appears, was to hold that any attempt to articulate semantic rules would self-refer in the same paradox-engendering way as (i), and therefore that such rules cannot be put into words.

But this is **not good reasoning.** When I say, while pointing at the person exiting the limo, "that's Mick Jagger," I am stating a semantic rule. There is some individual $x$ such that I am saying (correctly, we may suppose) that it is a semantic rule that "Mick Jagger" refers to $x$. That semantic rule does **not** self-refer and is not otherwise defective. From the fact that *some* self-referential semantic claims misfire, it does not follow that *all* statements of semantic rules misfire.

## A constructive ending: truth, and the indefinability claim

Having dwelt on the shortcomings of the TLP, end on a sunnier note. It is often said that **truth is indefinable**. Many say this meaning nothing by it. Setting them aside, those who mean something seem to mean either:

- (a) that it cannot be said what it is for a proposition to be true, or
- (b) that no language can state *all* of the semantic rules that belong to it.

**(a) is false** (see Chapter 3). But **(b) is true.**

## Why no language can state all its own semantic rules

(b) is *not* the absurd claim that no language can state *any* of its own rules. Every time you use an English sentence to define an English expression, you express a semantic rule of English in English. The claim is that no language can state **all** of its own rules. Here is why.

Given any meaningful expression $s$, there is a semantic rule $r$ saying what $s$'s meaning is. (Trivially: a meaningful expression has a meaning, so some true proposition identifies that meaning, and any proposition that says what an expression means is *ipso facto* a semantic rule.) For instance, supposing $x$ is Dick Cheney, there is a semantic rule of English to the effect that "Dick Cheney" refers to $x$. That rule is not itself a sentence, but it can be *expressed* by one. In general, semantic rules, though often expressible by sentences, are not themselves sentences.

Now suppose, for argument's sake, that for each semantic rule of English there is a sentence of English that expresses it. Let

$$K = \\{\\, s : s \\text{ is a sentence of English correctly expressing an actual semantic rule of English} \\,\\}.$$

Let $\\mathrm{SRE}$ be the **conjunction of all of $K$'s members.** Then:

- $\\mathrm{SRE}$ is a true, and therefore meaningful, sentence of English.
- $\\mathrm{SRE}$ is itself a member of $K$ — for $K$ contains *every* sentence that correctly says what is meant by at least one expression of English, and $\\mathrm{SRE}$ does exactly that.
- But $\\mathrm{SRE}$ is the conjunction of *all* of $K$'s members, so $\\mathrm{SRE}$ is **one of its own conjuncts**.

And **no conjunction can be one of its own conjuncts.** ("Snow is white and snow is white" is not one of its own conjuncts: that sentence is a conjunction, whereas "snow is white" is not.) We are forced to deny this obvious truth if we grant the supposition. Therefore the supposition fails:

$$\\mathrm{SRE} \\in K \\;\\wedge\\; \\mathrm{SRE} = \\bigwedge K \\;\\Longrightarrow\\; \\text{contradiction}.$$

So **the English language cannot state all of its own semantic rules.** And what holds for English holds, by the same reasoning, for any language $L$. **No language can express all of its own semantic rules.**`,
  },
];

export const assignments: SeedAssignment[] = [
  // ───────────── Week 5 — Homework 1 (topic 5.0) ─────────────
  {
    kind: "homework",
    title: "Homework 5.1 — Pictures vs. sentences: convention, propositions, digital structure",
    weekNumber: 5,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the analysis of the picture theory to brand-new cases. Decide, for each fresh scenario, whether a representation is conventional or resemblance-based, whether it goes through a proposition, and whether it is digital or iconic. Use the math keyboard for ¬, ∧, ∨, →, ↔ and the notation ⟦S⟧ for the proposition a sentence expresses.",
    problems: [
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "Two devices represent a key. (a) A locksmith presses the key into soft clay, leaving an impression. (b) A red triangular road sign with a key icon and the conventional meaning 'keys cut here.' For each, decide whether the representation relation is conventional or non-conventional (resemblance-based), and say which could be a 'picture' in Wittgenstein's substantive sense.",
        correctAnswer:
          "(a) non-conventional / resemblance-based — a genuine picture; (b) conventional — not a picture.",
        explanation:
          "The clay impression represents by graphic resemblance, which is a non-conventional method of representation, so it qualifies as a picture. The road sign represents only relative to an arbitrary convention; like a sentence, its meaning is fixed by stipulation, not resemblance, so it is not a picture in the substantive sense.",
        hint: "Ask which relation would survive if everyone forgot the agreed-upon rule.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "Suppose that, owing to a global chemical shift, copper ceased to conduct electricity. Does the English sentence 'copper conducts electricity' thereby become broken or unusable? Use ⟦S⟧ to say what the semantic rules actually pair the sentence with, and explain what this shows about the picture theory.",
        correctAnswer:
          "No; the rules pair S with ⟦S⟧ (a proposition), not with a fact. We could simply say 'copper does not conduct electricity.' Depicts(S, fact) ↔ True(⟦S⟧).",
        explanation:
          "The semantic rules do not assert that copper conducts; they say that *if* it does, one may express that by uttering S, and *if* it doesn't, one may say the negation. So a sentence reaches a fact only *by way of* the proposition it expresses, $\\text{Depicts}(S,\\text{fact}) \\leftrightarrow \\text{True}(\\llbracket S\\rrbracket)$. A photograph goes straight to the fact and never through a proposition — which is why sentences are unlike pictures.",
        hint: "A picture goes straight to the fact; a sentence detours through a proposition.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "Classify each as a DIGITAL (uniquely decomposable into finitely many discrete significant parts) representation or an ANALOG/iconic one: (a) a sequence of dots and dashes spelling a Morse message; (b) the rising height of mercury in a thermometer. Then state which kind a genuine language's symbols must be.",
        correctAnswer:
          "(a) digital; (b) analog/iconic. A language's symbols must be digital.",
        explanation:
          "Morse code decomposes uniquely into discrete units (dots, dashes, letters), exactly the digital structure of 'the cat is on the mat.' The mercury column varies continuously with no privileged minimal significant parts, like a picture whose cat-region also contains an ear-region and a leg-region. Any conventional assignment of meaning necessarily yields digitally decomposable symbols.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "A town adopts a single high-resolution photograph of one particular sunset — clouds, colors, a flock of birds — as a token that conventionally means 'the harbor is open today.' A resident insists the bird-region of the photo must contribute its own separate part of the message. Refute this using the notion of a semantic primitive.",
        correctAnswer:
          "Reject it: functioning as an expression the photo is a semantic primitive with no internal structure; its depicted details, including the birds, are irrelevant to its conventional meaning.",
        explanation:
          "So far as the photo functions as a sign, what it happens to depict is irrelevant; considered as an expression it has no internal structure and is a semantic primitive. The bird-region is part of its *iconic* content, not its linguistic content, just as '0' picturing emptiness is not what makes it denote a number. Only the whole token, by convention, means 'the harbor is open.'",
        hint: "When a picture works as a word, its internal structure stops mattering.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "An inventor proposes a purely pictorial language and challenges you to express 'there is no wolf in the pen' with a single genuine picture. Explain why no single picture can do this, and what you actually get if you place a conventional negation mark beside a picture of a wolf in a pen.",
        correctAnswer:
          "Impossible: negation cannot be depicted (nothing resembles the operation ¬), and a negation-mark beside a picture is two signs (N S = NS), not one picture.",
        explanation:
          "Any mark for negation is a conventional sign, since nothing could physically resemble the operation $\\neg$, which cannot be sense-perceived. Putting such a mark beside a picture yields a picture plus a symbol — two things side by side, $N\\frown S = NS$ — not a single picture. So negative content forces a non-pictorial, conventional element into the system.",
        hint: "Could a camera ever photograph the *absence* of something, or only what is there?",
      },
    ],
  },

  // ───────────── Week 5 — Homework 2 (topics 5.1 & 5.2) ─────────────
  {
    kind: "homework",
    title: "Homework 5.2 — Empiricism's gap; saying, showing, and self-description",
    weekNumber: 5,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the empiricism arguments and the saying/showing results to fresh cases. Diagnose exactly where a described inference needs a non-perceptual rule, evaluate self-undermining claims, and reconstruct the diagonal argument for new languages. Use ∀, ¬, →, ↔, ∈, and ⋀ as needed.",
    problems: [
      {
        topicSlug: "u5-picture-theory-empiricism",
        prompt:
          "By looking, a chemist establishes that a sample is pure distilled water and concludes that it is therefore NOT sulfuric acid. Identify precisely the non-perceptual element the conclusion depends on, and regiment the inference and the principle it requires using ∀ and ¬.",
        correctAnswer:
          "From Water(x) infer ¬Acid(x); this needs the non-observed exclusion principle ∀x(Water(x) → ¬Acid(x)).",
        explanation:
          "Perception, at most, reports what the sample *is* made of, never what it *isn't*; the move to a negative claim is image-resistant. So the inference $\\text{Water}(x) \\to \\neg\\text{Acid}(x)$ rests on the exclusion rule $\\forall x(\\text{Water}(x) \\to \\neg\\text{Acid}(x))$, which is not itself delivered by any single perception.",
        hint: "The senses tell you composition; what licenses the leap to a *non*-composition?",
      },
      {
        topicSlug: "u5-picture-theory-empiricism",
        prompt:
          "Could the proposition 'at least one swan exists somewhere' be literally identical to some single photograph? Argue for your answer.",
        correctAnswer:
          "No. Any photograph depicts a particular swan with definite color, size, pose, and background — surplus information the bare existential proposition lacks — and a general/existential content cannot be captured iconically.",
        explanation:
          "A photo always corresponds to many propositions at once, since it carries detail (color, shape, location) that the proposition does not assert. No proposition is identical with an image, because the image contains information the proposition omits. The general existential claim has no such surplus and so cannot be any particular picture.",
        hint: "List everything a single photo would inevitably show that the sentence never claims.",
      },
      {
        topicSlug: "u5-picture-theory-empiricism",
        prompt:
          "A self-described strict empiricist asserts: 'Absolutely everything I know — including the inference rules I rely on — I learned solely from sense-perception.' Pinpoint exactly where this position breaks down.",
        correctAnswer:
          "At the inference rules: the rules that convert pictorial perceptual input into non-pictorial belief cannot themselves be learned strictly perceptually, so knowing them is non-perceptual.",
        explanation:
          "Perception delivers only images, but knowledge is mediated by non-iconic states, so pictorial information must be converted into non-pictorial form. For the results to be knowledge the converting rules must be legitimate *and known to be legitimate* — yet conversions from pictures to non-pictures cannot be authenticated by pictures. Hence some knowledge is not perception-based, contradicting strict empiricism.",
        hint: "Could a rule that turns images into non-images ever be validated by images alone?",
      },
      {
        topicSlug: "u5-picture-theory-saying-showing",
        prompt:
          "A coach insists that a gymnast's sense of balance 'can only be shown, never said.' Evaluate this using the saying/showing result, and give the general lesson about when 'shown' and 'said' can coincide.",
        correctAnswer:
          "False as stated: what can be shown can typically also be said. Demonstrating a capacity does not entail that it cannot be described; showing and saying regularly coexist.",
        explanation:
          "Just as one can both say 'I can do fifty push-ups' and then show it, one can both describe a balancing skill and demonstrate it. The slogan 'what can be shown cannot be said' is refuted by any single case where a thing is both demonstrated and truly asserted, and nothing about balance makes it an exception.",
        hint: "Find one act that is simultaneously a demonstration and a true assertion.",
      },
      {
        topicSlug: "u5-picture-theory-saying-showing",
        prompt:
          "A theorist proclaims: 'No sentence can ever correctly express what any word means.' Diagnose what is wrong with this claim itself, independently of any further argument.",
        correctAnswer:
          "It is self-undermining: the proclamation is itself a meaningful sentence making a claim about word-meaning, so if it were true it could not be stated; its very intelligibility presupposes what it denies.",
        explanation:
          "The claim describes the very relation between words and meanings that it says cannot be described, so asserting it refutes it. Like 'we cannot describe the relation between words and facts,' it is a sentence that does precisely what it declares impossible.",
        hint: "Turn the claim on the sentence that states it.",
      },
      {
        topicSlug: "u5-picture-theory-saying-showing",
        prompt:
          "A logician boasts of writing, within a language L, one true sentence T that is the conjunction of every sentence of L which correctly states a semantic rule of L. Using set K = {s : s is a sentence of L correctly stating a semantic rule of L}, show this is impossible.",
        correctAnswer:
          "Impossible. T is true and meaningful, so T states a semantic rule, so T ∈ K; but T = ⋀K makes T one of its own conjuncts, and no conjunction is one of its own conjuncts — contradiction. Hence no language states all its own semantic rules.",
        explanation:
          "Since $T$ is a true, meaningful sentence saying what some expressions mean, $T \\in K$. But $T = \\bigwedge K$ then forces $T$ to be among its own conjuncts, which is impossible (a conjunction is never identical to any of its conjuncts). The supposition that every semantic rule of $L$ has a sentence expressing it therefore fails for $L$.",
        hint: "Ask whether the grand sentence would have to be counted among the sentences it conjoins.",
      },
    ],
  },

  // ───────────── Week 5 — Unit Test (timed) ─────────────
  {
    kind: "test",
    title: "Week 5 Test — The picture theory of meaning",
    weekNumber: 5,
    isTimed: true,
    timeLimitMinutes: 30,
    instructions:
      "Timed test (30 minutes). Apply the picture-theory analysis, the empiricism arguments, and the saying/showing results to entirely fresh scenarios. Give the canonical answer (symbolic where possible) and justify it. Use the math keyboard for ¬, ∧, →, ↔, ∀, ∈, ⟦S⟧, and ⋀.",
    problems: [
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "A bank's security camera records a teller handing over cash; a clerk later writes in the ledger 'a withdrawal of $500 occurred at noon.' For each representation, say whether it reaches the event directly or by way of a proposition, and explain the contrast.",
        correctAnswer:
          "The video reaches the event directly (iconic, no proposition); the ledger sentence reaches it only through the proposition it expresses, ⟦S⟧, true iff the event occurred.",
        explanation:
          "A picture goes straight to the fact it represents and never passes through a proposition. The written entry is paired by convention with $\\llbracket S\\rrbracket$ and touches the fact only when that proposition is true, so it reaches the event indirectly. This is exactly why sentences are unlike pictures.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "A gallery adopts a richly detailed painting of a thunderstorm as a single token conventionally meaning 'the exhibit is closed.' A visitor argues that the painting's lightning-bolt region must separately contribute 'danger' to the message. Refute this.",
        correctAnswer:
          "Reject it: as an expression the painting is a semantic primitive with no internal structure; the lightning region contributes nothing to its conventional meaning.",
        explanation:
          "When something functions as a linguistic expression, what it depicts and its internal structure are irrelevant; it is a semantic primitive. The lightning region belongs to the painting's iconic content, not to the single conventional meaning 'the exhibit is closed,' which attaches to the whole token by stipulation.",
        hint: "Functioning as a word, the image has no working parts.",
      },
      {
        topicSlug: "u5-picture-theory-meaning",
        prompt:
          "Someone claims to have 'negated a photograph' by drawing a large slash across a photo of an open door, producing what he calls 'a negative picture' meaning 'the door is not open.' Is the slashed photo itself a single picture? Justify with the relevant principle.",
        correctAnswer:
          "No. The slash is a conventional negation sign (nothing resembles ¬); placing it on the photo yields a picture plus a symbol — two signs, NS — not one picture.",
        explanation:
          "Negation cannot be depicted, since the operation $\\neg$ cannot be sense-perceived and nothing physically resembles it; any negation mark is conventional. Combining such a mark with a picture produces $NS$, two things side by side, not a single picture — paralleling how compound sentences are never pictures.",
      },
      {
        topicSlug: "u5-picture-theory-empiricism",
        prompt:
          "By inspection, a jeweler determines that a coin is solid gold and concludes it is therefore NOT lead. State the non-observational principle the conclusion rests on, regimenting it with ∀ and ¬.",
        correctAnswer:
          "The exclusion principle ∀x(Gold(x) → ¬Lead(x)); from Gold(c) it yields ¬Lead(c).",
        explanation:
          "Perception reports what the coin *is* made of, not what it *isn't*, so the negative conclusion is image-resistant. The leap from $\\text{Gold}(c)$ to $\\neg\\text{Lead}(c)$ requires the non-perceptual exclusion rule $\\forall x(\\text{Gold}(x)\\to\\neg\\text{Lead}(x))$.",
        hint: "What rule must be added to 'it is gold' to license 'it is not lead'?",
      },
      {
        topicSlug: "u5-picture-theory-empiricism",
        prompt:
          "A reasoner draws a conclusion from what he perceives by applying an inference rule whose validity he has no idea about; the conclusion happens to be true. Is his true belief knowledge? Justify using the testimony analogy.",
        correctAnswer:
          "No. A true belief reached via a rule one does not know to be legitimate is not knowledge — like believing P on uncorroborated testimony whose reliability one has not established.",
        explanation:
          "For a converted, post-perceptual belief to be knowledge, one must *know* that the conversion rule is legitimate, not merely use a rule that happens to be reliable. Just as uncorroborated testimony yields at most true belief, an unauthenticated inference rule yields at most true belief, not knowledge.",
        hint: "Reliability you haven't checked is like a tip from a stranger you can't vouch for.",
      },
      {
        topicSlug: "u5-picture-theory-saying-showing",
        prompt:
          "Evaluate the sentence 'This very sentence is not true' for its truth-status, and then say whether its pathology shows that NO sentence can state a semantic rule. Justify.",
        correctAnswer:
          "It is paradoxical: True(s) ↔ ¬True(s). But this does NOT generalize — ordinary statements of semantic rules (e.g., fixing what a name refers to) do not self-refer, so the paradox fails to show that semantic rules cannot be stated.",
        explanation:
          "The sentence is true iff not true, $\\text{True}(s)\\leftrightarrow\\neg\\text{True}(s)$, so it is pathological. Yet from the misfiring of *some* self-referential claims it does not follow that *all* statements of meaning misfire; a non-self-referential rule, such as one stipulating what a particular name denotes, is perfectly in order.",
        hint: "A special self-referential breakdown does not condemn well-behaved, non-self-referential cases.",
      },
      {
        topicSlug: "u5-picture-theory-saying-showing",
        prompt:
          "A photographer claims to have taken a single photograph that is a complete photograph of itself. Explain why this is impossible, and say whether a different photograph could instead be a complete photograph of the first.",
        correctAnswer:
          "Impossible for one photo to picture itself (nothing is a proper part of itself); but a distinct second photograph can picture the first.",
        explanation:
          "A complete picture of $P$ would have to be a proper part of $P$, and nothing can be a proper part of itself, so $P$ cannot picture itself. There is no such bar on a *distinct* picture $S_2$ depicting $S_1$, which is why the self-picturing limitation does not extend to representation by other things.",
        hint: "Could anything contain a full copy of itself as a part?",
      },
    ],
  },
];

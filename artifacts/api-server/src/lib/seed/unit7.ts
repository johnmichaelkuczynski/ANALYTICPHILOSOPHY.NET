import type { SeedTopic, SeedAssignment } from "./types";

export const topics: SeedTopic[] = [
  {
    slug: "u7-hempel-incommensurability-unmeasurable",
    title: "Hempel: measurement, common standards, and incommensurability",
    weekNumber: 7,
    blurb:
      "Measurement is comparison against a standard, so it can only ever deliver a rational ratio — which is why an irrational length cannot be read off by measurement.",
    lectureTitle: "7.1 Hempel on the limits of strict empiricism",
    body: `# Hempel on the limits of strict empiricism

**Strict empiricism** is the doctrine that every genuine piece of knowledge must rest on a *strictly observational* basis — that nothing counts as known unless it can, at least in principle, be established by observation alone. Carl Hempel (1905–1997) gave a rigorous proof that this doctrine is false. The proof turns on a fact about *measurement* and a fact about *modern physics*. In this lecture we develop the first half: why measurement, by its very structure, cannot establish that a magnitude is irrational. In the next we draw out the consequence for physics, and so for strict empiricism itself.

## The arithmetical fact Hempel starts from

Hempel begins with a purely mathematical observation. Take two bodies $x$ and $y$ and suppose:

$$\\text{length}(x) = 1 \\text{ unit}, \\qquad \\text{length}(y) = \\sqrt{2} \\text{ units}.$$

Then there is **no** length $L$ that goes a whole number of times into *both* $x$'s length and $y$'s length. Call this the *Hempel assumption*:

$$(\\text{HA})\\quad \\neg\\,\\exists L\\;\\exists m,n \\in \\mathbb{Z}^{+}\\;\\big(\\text{length}(x) = m \\cdot L \\;\\wedge\\; \\text{length}(y) = n \\cdot L\\big).$$

Why is (HA) true? If some $L$ went $m$ times into $x$ and $n$ times into $y$, then the ratio of the two lengths would be

$$\\frac{\\text{length}(y)}{\\text{length}(x)} = \\frac{n \\cdot L}{m \\cdot L} = \\frac{n}{m} \\in \\mathbb{Q}.$$

But that ratio is $\\sqrt{2}/1 = \\sqrt{2}$, and $\\sqrt{2} \\notin \\mathbb{Q}$. The supposed common measure $L$ would force an irrational number to equal a fraction of two integers — a contradiction. So no such $L$ exists.

## What measurement actually is

Now bring in the second ingredient. **Measurement is comparison with respect to some standard.** You never measure a length, a mass, or a duration "directly," in the way you might directly taste a flavour. To compare $x$'s length with $y$'s — that is, to establish their *comparative* lengths — you must fix on some third body $z$ and treat it as a **standard**. The relative lengths of $x$ and $y$ are then determined by finding out how many $z$-length segments each of $x$ and $y$ can be divided into:

$$\\text{length}(x) = m \\cdot \\text{length}(z), \\qquad \\text{length}(y) = n \\cdot \\text{length}(z).$$

If one object can be divided into exactly twice as many $z$-length segments as another, then the first is twice as long as the second. The entire informational content of an act of measurement is a pair of *counts* — how many times the standard fits — and from those counts we read off a ratio:

$$\\text{observed ratio} = \\frac{\\text{length}(x)}{\\text{length}(y)} = \\frac{m \\cdot \\text{length}(z)}{n \\cdot \\text{length}(z)} = \\frac{m}{n} \\in \\mathbb{Q}.$$

**The output of measurement is always a ratio of two integers, hence always a rational number.** This is not a limitation of crude instruments that better technology might overcome; it is built into what it *is* to measure. To measure is to count multiples of a standard, and counting yields integers.

## Incommensurability

Two magnitudes are said to be **incommensurable** when they have no common measure. More precisely:

> Magnitudes $M_1$ and $M_2$ are *incommensurable* iff there is no magnitude $M_3$ that goes an integral number of times into both $M_1$ and $M_2$.

Symbolically:

$$\\text{Incommensurable}(M_1, M_2) \\;\\leftrightarrow\\; \\neg\\,\\exists M_3\\;\\exists m,n \\in \\mathbb{Z}^{+}\\;\\big(M_1 = m \\cdot M_3 \\;\\wedge\\; M_2 = n \\cdot M_3\\big).$$

And by exactly the reasoning that established (HA), this condition is equivalent to the *ratio* being irrational:

$$\\text{Incommensurable}(M_1, M_2) \\;\\leftrightarrow\\; \\frac{M_1}{M_2} \\notin \\mathbb{Q}.$$

Conversely, $M_1$ and $M_2$ are **commensurable** — they *do* share a common measure — exactly when their ratio is rational, $M_1/M_2 \\in \\mathbb{Q}$.

## The epistemological punchline

Put the two halves together. Measurement can only ever deliver a ratio of the form $m/n$, a rational number. But for $x$ at $1$ unit and $y$ at $\\sqrt{2}$ units, the true ratio is $\\sqrt{2}$, which is *not* of that form. By (HA), there is no body $z$ such that both $x$ and $y$ can be divided, without remainder, into $z$-length segments. Therefore:

- **If an object's length is given by an irrational number, that fact cannot be known directly on the basis of measurement.** No matter how fine the standard $z$, dividing $x$ and $y$ into $z$-segments will always leave a remainder somewhere, and the counts you obtain will only ever approximate the irrational ratio with some fraction $m/n$.
- Consequently, **there is no strictly observation-based way to know that $y$'s length equals $x$'s multiplied by $\\sqrt{2}$.**

Generalising: for any two objects $x$ and $y$, *there is no strictly observation-based way of establishing that $x$'s length (or mass, or any magnitude) is incommensurable with $y$'s.* Observation hands you rational approximations forever; it never hands you the verdict "irrational." Incommensurability is real, but it is invisible to measurement.

This is already a striking result. A perfectly objective feature of two physical bodies — that their lengths stand in an irrational ratio — is something no quantity of careful observation can ever certify. In the next lecture we see why this single fact is fatal to strict empiricism.`,
  },
  {
    slug: "u7-calculus-continuity-strict-empiricism",
    title: "Calculus, continuity, and the refutation of strict empiricism",
    weekNumber: 7,
    blurb:
      "Because modern physics applies the calculus it must treat magnitudes as continuous, and so must presuppose irrational values that no observation can establish — which refutes strict empiricism.",
    lectureTitle: "7.1 Hempel on the limits of strict empiricism (continued): calculus and the collapse of strict empiricism",
    body: `# Calculus, continuity, and the collapse of strict empiricism

We saw in the previous lecture that **incommensurability is unobservable**: measurement can only ever yield a rational ratio $m/n$, so no observation can establish that a magnitude takes an irrational value such as $\\sqrt{2}$. Hempel's proof now closes the trap by showing that **modern physics is committed to exactly such values**. If physics is knowledge — and it plainly is — then strict empiricism, which demands that all knowledge be observationally grounded, must be false.

## Why physics needs the irrationals

The branch of mathematics known as the **calculus** is integral to modern physics. Calculus is the study of **continuously changing quantities** — velocities that vary smoothly through time, fields that vary smoothly through space, masses and lengths treated as ranging over a continuum rather than jumping in discrete steps.

In order to describe physical phenomena in a way that lets us deploy the powerful techniques of the calculus, we must *assume that those phenomena change continuously*. And continuity has a price. To say that a quantity varies continuously is to say it can take **any real value** in a range — and the reals include the irrationals. So:

> The degree to which a given phenomenon has a given property may sometimes be given by an irrational number.

Hence, in applying the calculus, physics must assume that, at certain junctures, the **velocities, lengths, masses, and so on of objects are sometimes given by irrational numbers**. A particle accelerating smoothly from rest passes, on the continuous picture, through *every* speed in an interval — including infinitely many irrational ones. You cannot have the calculus without the continuum, and you cannot have the continuum without irrational magnitudes.

## The collision

Now recall the result of the previous lecture. There cannot be strictly observational grounds for believing that a given object's length is $\\sqrt{2}$ meters — or that its mass is $\\sqrt{2}$ lbs, or that its velocity has any other irrational value. Measurement returns only ratios $m/n \\in \\mathbb{Q}$; an irrational value is forever beyond its reach.

So we have two facts standing in direct tension:

1. **Physics presupposes irrational magnitudes.** The calculus cannot be applied to observable phenomena unless it is assumed that things' weights, velocities, lengths, and the like can at least *sometimes* assume values given by irrational numbers.
2. **Irrational magnitudes are observationally uncertifiable.** There cannot possibly be a strictly observational basis for any claim that a particular magnitude is irrational (equivalently, that two magnitudes are incommensurable).

From (1) and (2) it follows that **modern physics integrally depends on an assumption for which there cannot possibly be a strictly observational basis.**

## The refutation of strict empiricism

Let $E$ be strict empiricism: the thesis that *all* knowledge has a strictly observational basis. Let us lay out the argument:

$$
\\begin{aligned}
&(\\text{P1})\\quad \\text{Modern physics is a source of knowledge.}\\\\
&(\\text{P2})\\quad \\text{Modern physics integrally depends on the assumption that some magnitudes are irrational.}\\\\
&(\\text{P3})\\quad \\text{No claim that a magnitude is irrational can have a strictly observational basis.}\\\\
&(\\text{C})\\quad \\therefore \\text{Some knowledge does not rest on a strictly observational basis, i.e. } \\neg E.
\\end{aligned}
$$

The premises are jointly inconsistent with $E$. If physics is knowledge (P1) and that knowledge rests essentially on an assumption that no observation can ground (P2, P3), then there is a body of knowledge whose foundations are not observational. **Strict empiricism is therefore inconsistent with the obvious fact that modern physics is a source of knowledge.**

Notice the *shape* of the argument. It is a reductio of a sweeping epistemological doctrine, driven entirely by *conceptual* analysis of what measurement is and what continuity requires — not by any new experiment. The strict empiricist cannot rescue his view by gathering more data; the very notion of "more data" is the notion of more rational ratios, and no accumulation of rational ratios ever yields an irrational one. The empiricist is asked to choose: give up the claim that physics is knowledge, or give up strict empiricism. Since the first option is absurd, the second is forced.

## What survives

The argument does not show that observation is unimportant, nor that physics is somehow unjustified. It shows something narrower and sharper: that *some* of what we know — including some of what is most rigorously known, namely the continuum mathematics underlying physical theory — outruns anything observation by itself could establish. Knowledge has non-observational foundations as well as observational ones. That is precisely the conclusion strict empiricism was designed to deny, and Hempel's measurement argument shows it cannot be denied.`,
  },
];

export const assignments: SeedAssignment[] = [
  {
    kind: "homework",
    title: "Homework 7.1 — Commensurability, measurement, and the empiricist limit",
    weekNumber: 7,
    isTimed: false,
    timeLimitMinutes: null,
    instructions:
      "Apply the analysis of measurement, commensurability, and the empiricist limit to fresh cases. Use the math keyboard for ∃, ¬, ∧, ∈, ∉, and the symbols ℤ⁺, ℚ. Give the symbolic answer where one is called for, then justify it.",
    problems: [
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "Two steel bars measure exactly 35 cm and 21 cm. Decide whether they are commensurable, and if so give the largest common measure together with the integer multiples and the rational ratio.",
        correctAnswer:
          "Commensurable; common measure 7 cm, with 35 = 5·7 and 21 = 3·7, so ratio = 35/21 = 5/3 ∈ ℚ.",
        explanation:
          "A common measure $M_3$ must satisfy $35 = m\\cdot M_3$ and $21 = n\\cdot M_3$ for $m,n\\in\\mathbb{Z}^{+}$; $M_3 = 7$ works with $m=5, n=3$. Two magnitudes are commensurable exactly when their ratio is rational, and $35/21 = 5/3 \\in \\mathbb{Q}$.",
        hint: "Look for the greatest length that divides both counts without remainder.",
      },
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "Consider a circle and ask whether its circumference and its diameter are commensurable. State the verdict and say whether measurement could ever certify it.",
        correctAnswer:
          "Incommensurable: circumference/diameter = π ∉ ℚ, so ¬∃M₃ ∃m,n∈ℤ⁺ (C = m·M₃ ∧ d = n·M₃); and no measurement can certify it.",
        explanation:
          "The ratio of circumference to diameter is $\\pi$, which is irrational, so no common measure exists. Since measurement only ever returns a rational ratio $m/n$, observation can at best approximate $\\pi$ and can never establish the incommensurability.",
        hint: "What number is the ratio of any circle's circumference to its diameter?",
      },
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "Regiment into symbols: (a) what it is for magnitudes M₁ and M₂ to be commensurable, using a common measure and integer multiples; and (b) the equivalent condition stated in terms of their ratio.",
        correctAnswer:
          "(a) ∃M₃ ∃m,n∈ℤ⁺ (M₁ = m·M₃ ∧ M₂ = n·M₃);  (b) M₁/M₂ ∈ ℚ.",
        explanation:
          "Commensurability is the existence of a unit that divides both magnitudes a whole number of times: $\\exists M_3\\,\\exists m,n\\in\\mathbb{Z}^{+}(M_1 = m\\cdot M_3 \\wedge M_2 = n\\cdot M_3)$. Dividing gives $M_1/M_2 = m/n \\in \\mathbb{Q}$, so the two conditions are equivalent.",
      },
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "A lab technician reports: 'By laying down ever-finer rulers, I measured the length-ratio of these two rods to be exactly √3.' Diagnose precisely what is wrong with this claim.",
        correctAnswer:
          "The claim is impossible: measurement counts integral multiples of a standard, so it yields only ratios m/n ∈ ℚ; since √3 ∉ ℚ, no measurement can deliver it. Observation can at most establish ratio ∈ ℚ approximating √3.",
        explanation:
          "To measure is to find how many standard segments fit, giving $\\text{ratio} = m/n \\in \\mathbb{Q}$. An irrational target like $\\sqrt{3}$ is never of that form, so finer rulers only sharpen a rational approximation and a remainder always survives. Hence 'measured to be exactly $\\sqrt{3}$' confuses an unobservable mathematical fact with an observational result.",
        hint: "What is the only kind of number a count of standard-segments can produce?",
      },
      {
        topicSlug: "u7-calculus-continuity-strict-empiricism",
        prompt:
          "An equilateral triangle has a side and an altitude. Decide whether those two lengths are commensurable, and say whether any amount of measurement could establish your answer.",
        correctAnswer:
          "Incommensurable: altitude = (√3/2)·side, so ratio = √3/2 ∉ ℚ; ¬∃M₃ common to both. No measurement can establish it, since measurement yields only rational ratios.",
        explanation:
          "The altitude of an equilateral triangle is $\\frac{\\sqrt{3}}{2}$ times the side, an irrational multiple, so the two lengths share no common measure. Measurement returns only ratios $m/n \\in \\mathbb{Q}$, which can approximate but never equal $\\frac{\\sqrt{3}}{2}$, so the incommensurability is observationally uncertifiable.",
        hint: "Express the altitude as a multiple of the side and check whether that multiple is rational.",
      },
      {
        topicSlug: "u7-calculus-continuity-strict-empiricism",
        prompt:
          "Explain why modelling a falling object's speed as a continuously varying quantity (so that the calculus applies) commits the physicist to magnitudes that no observation can certify.",
        correctAnswer:
          "Continuity means the speed ranges over all reals in an interval, including irrationals; an irrational value is incommensurable with the unit and so cannot be established by measurement (which yields only m/n ∈ ℚ). Thus the continuous model presupposes observationally uncertifiable values.",
        explanation:
          "Applying the calculus requires treating the speed as varying continuously, i.e. taking every real value in a range — and the reals include irrationals. Any such irrational value stands in an irrational ratio to the chosen unit, hence is incommensurable with it, and incommensurability cannot be read off by measurement. So the very assumption that licenses the calculus outruns observation.",
        hint: "What set of values must a 'continuously varying' quantity be allowed to take?",
      },
    ],
  },
  {
    kind: "test",
    title: "Unit 7 Test — Hempel on the limits of strict empiricism",
    weekNumber: 7,
    isTimed: true,
    timeLimitMinutes: 25,
    instructions:
      "Timed. 25 minutes. Math keyboard available; pasting is disabled. Apply the principles to the new cases below — give compact symbolic answers where called for and justify each.",
    problems: [
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "Two rods measure exactly 0.75 m and 1.2 m. Decide whether they are commensurable, and if so give a common measure with the integer multiples and the rational ratio.",
        correctAnswer:
          "Commensurable; common measure 0.15 m, with 0.75 = 5·0.15 and 1.2 = 8·0.15, so ratio = 0.75/1.2 = 5/8 ∈ ℚ.",
        explanation:
          "Seek $M_3$ with $0.75 = m\\cdot M_3$ and $1.2 = n\\cdot M_3$; $M_3 = 0.15$ works with $m=5, n=8$. The ratio $0.75/1.2 = 5/8 \\in \\mathbb{Q}$, so the rods share a common measure and are commensurable.",
        hint: "Convert the ratio to a fraction in lowest terms.",
      },
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "In a regular pentagon, decide whether a diagonal and a side are commensurable, and say whether measurement could ever certify the verdict.",
        correctAnswer:
          "Incommensurable: diagonal/side = the golden ratio φ = (1+√5)/2 ∉ ℚ, so no common measure exists; measurement cannot certify it.",
        explanation:
          "In a regular pentagon the diagonal-to-side ratio is the golden ratio $\\varphi = \\frac{1+\\sqrt{5}}{2}$, which is irrational, so $\\neg\\exists M_3$ dividing both a whole number of times. Because measurement yields only rational ratios $m/n$, it can approximate but never establish this incommensurability.",
        hint: "The diagonal-to-side ratio of a regular pentagon is a famous irrational constant.",
      },
      {
        topicSlug: "u7-hempel-incommensurability-unmeasurable",
        prompt:
          "Regiment the gap Hempel exploits: write (a) what measuring M₁ and M₂ against a standard z delivers, including the resulting ratio, and (b) the condition for M₁ and M₂ to be incommensurable. Then say why (a) can never establish (b).",
        correctAnswer:
          "(a) M₁ = m·z ∧ M₂ = n·z, so observed ratio = m/n ∈ ℚ.  (b) Incommensurable iff M₁/M₂ ∉ ℚ.  Since (a) only ever yields m/n ∈ ℚ, it cannot yield M₁/M₂ ∉ ℚ.",
        explanation:
          "Measurement against a standard produces integer counts $M_1 = m\\cdot z$, $M_2 = n\\cdot z$, hence an observed ratio $m/n \\in \\mathbb{Q}$. Incommensurability is precisely $M_1/M_2 \\notin \\mathbb{Q}$. A procedure whose every output lies in $\\mathbb{Q}$ can never output a verdict that the ratio lies outside $\\mathbb{Q}$.",
      },
      {
        topicSlug: "u7-calculus-continuity-strict-empiricism",
        prompt:
          "A philosopher argues: 'All knowledge must rest on observation; modern physics is knowledge; therefore every assumption physics relies on must be observationally establishable.' Hempel's result blocks the conclusion. Identify which premise must be given up and justify the choice.",
        correctAnswer:
          "Give up the first premise (strict empiricism). Physics relies essentially on irrational-valued (continuous) magnitudes that no observation can establish; combined with 'physics is knowledge' this forces ¬(all knowledge rests on observation).",
        explanation:
          "Hempel shows physics integrally depends on irrational magnitudes whose values are observationally uncertifiable, so 'every assumption is observationally establishable' is false. Since 'physics is knowledge' is undeniable, the inconsistency falls on strict empiricism, which must be rejected: some knowledge has non-observational foundations.",
        hint: "Which premise, once physics counts as knowledge, generates the contradiction?",
      },
      {
        topicSlug: "u7-calculus-continuity-strict-empiricism",
        prompt:
          "Suppose a researcher insists that with sufficiently precise instruments she will eventually observe that a particle's mass takes an exactly irrational value in some unit. Explain why this project must fail in principle.",
        correctAnswer:
          "It must fail: each measurement returns a rational ratio m/n of standard-units, so any finite or refinable observation only yields rational approximations; an exactly irrational value is never of the form m/n and so is unreachable by measurement, however precise.",
        explanation:
          "Every measurement counts multiples of a standard and so reports a value $m/n \\in \\mathbb{Q}$. Greater precision shrinks the approximation error but never changes the *kind* of number produced, so an irrational mass is forever beyond observational reach. Precision is the wrong remedy for what is a structural, not a technological, limit.",
        hint: "Does increasing precision change a rational output into an irrational one?",
      },
    ],
  },
];

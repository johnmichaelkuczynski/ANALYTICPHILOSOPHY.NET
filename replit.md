# 🧠 Teach Yourself Analytic Philosophy

**A Four-Week Course on the Logic Behind the Words — From Frege's Logical Form to Formal Truth and the Map of Philosophy**

---

## 🧩 Overview

Teach Yourself Analytic Philosophy is a self-paced, single-user web course built around one thesis: *philosophy is the discipline that delineates the structures of the categories in terms of which we think about the world.* What is a statement? What is existence? What does "someone smokes" really say? What makes a sentence meaningful? What can analysis settle that observation cannot?

The course is taught **entirely in plain philosophical prose** — the way the source manuscript is actually written. It contains no formal-logic notation: no quantifiers, connectives, modal operators, set-builder, or LaTeX/math markup. The author reasons in ordinary English (e.g. "the property of being a square circle is uninstantiated"), and so does the course. The author's short parenthetical sentence labels — like (SC), (SS), (TM) — are plain text, not symbols, and are used throughout.

The runtime provides lectures with short / medium / long depth, a section-scoped AI tutor, adaptive practice, AI-graded homework / tests / midterm / final, two-layer AI-authorship detection, and one-click diagnostics. The **purpose** of this build is to teach the method and results of analytic philosophy as a single connected arc, faithfully to the manuscript's prose.

---

## 🧠 What It Does

- **Four-Week Curriculum of 29 Micro-Lectures** — organized by theme (7 / 7 / 7 / 8):
  - **Week 1 — Analytic philosophy as logical analysis**: philosophy as the analysis of categories; knowledge vs. meta-knowledge; philosophy and the other disciplines; analytic vs. non-analytic philosophy; Frege on logical vs. grammatical form; quantifier-words and the "someone" puzzle; existence-claims and instantiation.
  - **Week 2 — Analysis, ontology, and meaning**: analysis vs. ontologizing; Brentano, Meinong, and non-existent objects; perception as description; empirical vs. philosophical puzzles; sentences vs. propositions; propositions as properties and truth as instantiatedness; why meaning is not use.
  - **Week 3 — The Tractatus and logical positivism**: the Tractatus and philosophy as nonsense; the picture theory of meaning; showing vs. saying; logical positivism stated; verificationism and falsificationism; the self-refutation of empiricism; the brokenness of tautological truth.
  - **Week 4 — Formal truth and the map of philosophy**: formal truth and entailment; open-sentences and interpretations; the limits of strict empiricism (Hempel); why no language is logically perfect; the sub-disciplines of philosophy; mind, language, and epistemology; logic, metaphysics, and science; capstone synthesis.
- **One Real Example per Lecture** — Every micro-lecture grounds its concept in a worked case from the manuscript — e.g. the "someone smokes but Smith does not" consistency test, the square-circle that needs no non-entity, Brentano's incoherent non-existent objects, the *Tractatus* throwing away its own ladder, Russell's self-cancelling argument against naïve realism, Hempel's incommensurability proof that strict empiricism is false, and the master criterion that a sentence is meaningful iff it attributes a property to an object.
- **Substantive Prose Questions** — Every homework / test / midterm / final problem requires the student to *reason in prose*: explain why a sentence's grammatical form misleads and what it really says, defend a True/False verdict about a subtle consequence, construct and analyze their own example, apply one of the author's distinctions to a new case, or locate exactly where two positions disagree. Answers are full-sentence reasoning, graded semantically — never one-word recall and never "write it in symbols."
- **Three-Depth Lectures, Section-Scoped Tutor, Adaptive Practice, AI Grading, Two-Layer Detection, One-Click Diagnostics** — The full interactive runtime.
- **Built-In Product Demo Video** — The companion `qr-course-demo` artifact ships as a short screencast of the live UI.

---

## ⚙️ Technical Features

- **Prose Answer Harness** — Every problem prompt asks for prose reasoning. The student types in a plain textarea (with a keystroke trace for diachronic detection). The AI grader compares the student's answer to a full prose model answer **semantically** — accepting different wordings, ordering, and examples as long as the core claim and its justification are present and not contradicted.
- **On-the-Spot Lecture Depth** — Each lecture ships with a short body. The Medium and Long versions are generated on demand, per-lecture, from the lecture-expansion job (also available as a one-click bulk pre-build). Generation is symbol-free and grounded in the lecture's prose.
- **Two-Layer AI-Authorship Detection** —
  - **Static (GPTZero):** Every submitted answer is sent to GPTZero's `predict/text` endpoint; the per-document AI probability is blended `0.85 × GPTZero + 0.15 × structural-heuristic` for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic.
  - **Diachronic (Keystroke Pattern):** The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalizes paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds.
- **Three Diagnostic Self-Tests** —
  - **System Diagnostic** (`/diagnostics/system`): environment (`DATABASE_URL` present), database round-trip (`SELECT 1`), course-seed integrity, OpenAI chat completion, OpenAI JSON mode, the detection pipeline (heuristic + scoring), and the grader equivalence check.
  - **Synthetic-Student Diagnostic** (`/diagnostics/synthetic-run`): end-to-end stack proof — fake student takes a practice session, takes a full assignment attempt, submits, and verifies grading + detection + analytics all reflect the run.
  - **Content Auditor** (`/diagnostics/content-audit`): OpenAI fact-checks every lecture body and every stored "correct answer", returning an independent verdict and flagging faulty reasoning, misattributed positions, answers that don't satisfy their prompt, and — because the course must stay in prose — any stray use of formal-logic notation.
- **Auto-Reseed on Curriculum Change** — `seedIfEmpty` compares the set of topic slugs in the database to the expected curriculum *and* checks a sentinel phrase in a designated lecture. If either differs, it wipes and re-seeds in dependency order. This is what lets a single content swap propagate cleanly when the seed file changes.
- **Contract-First API** — Single OpenAPI document; React Query hooks for the UI and Zod validators for the server are generated from it.
- **Streaming AI Tutor** — Token-by-token Server-Sent-Event streaming with a section-scoped system prompt grounded in the active lecture. The tutor stays on-screen during open practice (and encourages it) and is hidden during graded, timed runs.
- **Adaptive Practice Engine** — Per-session difficulty (1–4) adjusts after each attempt; problems are generated on demand, unlimited, with feedback after each one.
- **Operator Console** — Dedicated Diagnostics page surfaces all three self-tests with one-click execution and raw error output.

---

## 🔐 Required Secrets

- `DATABASE_URL` — Postgres connection string. The app reads this directly (`lib/db`), enables SSL automatically for any non-local host (`DATABASE_SSL=false` overrides), and falls back to the standard `PG*` parts only if `DATABASE_URL` is absent. Pointing it at an external Neon URL is how the app runs against Neon.
- `OPENAI_API_KEY` — **required**. The OpenAI client (`@workspace/integrations-openai-ai-server`) reads it directly and throws on boot if it is missing. Powers the tutor, practice generator, AI graders, content auditor, and lecture-expansion job. An optional `OPENAI_BASE_URL` can point the client at a compatible proxy.
- `GPTZERO_API_KEY` — optional, for the GPTZero leg of the static-AI-detection layer. If absent, the system falls back to the LLM scorer + heuristic, but you lose the primary detection signal.
- `CLERK_SECRET_KEY` / `CLERK_PUBLISHABLE_KEY` / `VITE_CLERK_PUBLISHABLE_KEY` — Clerk auth (the `/api` surface is cookie-gated behind Clerk; `/api/healthz` stays public).

---

## 🎓 Designed For

- **Anyone Who Wondered What Philosophers Actually *Do*:** A short, focused course on the method of analytic philosophy — take an ordinary sentence apart, work out what it really commits you to, and defend the verdict in words.
- **The Detection-and-Grading Maintainer:** A stress test of the prose-answer stack — semantic grading, two-layer AI-authorship detection, adaptive practice, and on-demand content generation — under a non-mathematical, prose-only humanities curriculum.

---

## 💡 Core Idea

Most philosophy courses teach the *positions* — what Descartes thought, what Kant replied. This course teaches the *method*: how to take an ordinary-looking sentence, find what it really says, and decide what it actually commits you to. Grammar misleads; analysis clarifies.

Read the idea, see it grounded in a real example, then work out — in your own words — what the claim really says.

**Teach Yourself Analytic Philosophy — read the idea, ground the idea, write the idea.**

---

## User preferences

_(none recorded yet)_

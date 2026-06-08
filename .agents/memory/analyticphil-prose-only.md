---
name: AnalyticPhil is prose-only
description: The "Teach Yourself Analytic Philosophy" course must never use formal-logic notation; it is taught entirely in plain prose.
---

# AnalyticPhil course is prose-only

The `qr-course` artifact ("Teach Yourself Analytic Philosophy", title "AnalyticPhil") is taught **entirely in plain philosophical prose**. The source manuscript (in `attached_assets/`) contains ZERO formal-logic symbols.

**Rule:** Never introduce quantifiers, connectives, modal operators, set-builder, blackboard-bold, entailment turnstiles, predicate notation, or LaTeX/KaTeX `$...$` anywhere — not in lecture bodies, questions, AI prompts (tutor / practice / grader / content-audit / lecture-expansion), UI copy, or the markdown renderer. The author's plain-text parenthetical sentence labels like (SC), (SS), (TM) are fine — they are NOT symbols.

**Why:** A prior build FABRICATED an entire formal-notation apparatus (math keyboard, "write it in symbols" questions, KaTeX rendering) that the manuscript never contained. The user was enraged by this infidelity. The course's whole value is faithfulness to the manuscript's actual prose method: take a sentence apart, say what it really commits you to, defend the verdict in words.

**How to apply:**
- The markdown renderer (`MarkdownRenderer.tsx`) intentionally has NO remark-math / rehype-katex — do not re-add a math pipeline; a stray paired `$` (e.g. a price range) would otherwise render as math.
- `gradeAnswer` (`lib/grading.ts`) grades prose SEMANTICALLY via the LLM; it has no numeric/equivalence short-circuit by design.
- Lecture Medium/Long depths are generated on demand per-lecture (POST `/api/diagnostics/expand-lectures?level=&id=`), plus a bulk pre-build.
- The live tutor is shown while reading and on `/assignments/:id/practice`, but hidden on the graded runner route `/assignments/:id` so it can't be used to cheat.
- The 29-topic structure (weeks 7/7/7/8) and all slugs/titles/weekNumbers are CORRECT — never restructure them.
- Reseeds wipe via DELETE, so topic serial IDs climb across reseeds (they are not 1–29). The app uses live IDs from the API, so this is fine; a 404 on an old lecture id just means a stale browser tab — reload.

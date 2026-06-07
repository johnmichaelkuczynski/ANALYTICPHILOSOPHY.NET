---
name: QuantReason clone reskin
description: Where subject-matter is hard-coded when reskinning the QuantReason runtime (qr-course + api-server) to a new course topic.
---

# Reskinning the QuantReason runtime to a new subject

When you reskin the QuantReason web course to a new subject, replacing the seed
file is NOT enough. The subject is also hard-coded inside **live AI system
prompts** that drive interactive features. Update all of these too, or dynamic
output stays on the old subject:

- `api-server/src/routes/practice.ts` — problem-generator prompt, the catch/fallback
  problem (hard-coded example), and the wrong-answer tutor-tip prompt.
- `api-server/src/routes/tutor.ts` — starter-question (suggestions) prompt and the
  `/tutor/ask` system prompt (including the notation rules block).
- `api-server/src/routes/diagnostics.ts` — synthetic-student practice-problem prompt,
  the AI-positive control sample text, the lecture-expansion (medium/long) prompt,
  and the lecture fact-checker prompt.
- `api-server/src/routes/analytics.ts` — the academic-advisor narrative prompt.

**Why:** these prompts say things like "quantitative-reasoning tutor" / "conceptual
mathematics", so tutor replies, generated practice, lecture expansion, and advisor
summaries silently produce off-subject content even when seeded lectures/assignments
are correct. The code review (architect) caught this as the blocking issue.

**How to apply:** after editing `seed.ts`, grep the whole `api-server/src` for the old
subject terms and update every prompt string. Also grep the **frontend** —
`qr-course/src/pages/Diagnostics.tsx` hard-codes subject phrasing in its on-page
descriptions (e.g. "wrong physics"). The on-screen keyboard is named the
"math keyboard" in code (MathKeyboard.tsx) — that's a UI tool name, fine to keep.

## Three diagnostics; keep docs in sync with the actual steps
There are THREE diagnostics: `/diagnostics/system`, `/diagnostics/synthetic-run`,
`/diagnostics/content-audit`. The `/diagnostics/system` checks are exactly the
`run("...")` step names in `diagnostics.ts` (env DATABASE_URL present, SELECT 1,
seed integrity, OpenAI chat, OpenAI JSON mode, detection heuristic+scoring, grader
equivalence) — it does NOT do a GPTZero-connectivity or AI-positive-control step.
When writing README/BLUEPRINT/replit, describe only those steps.
**Why:** the architect flagged docs claiming GPTZero/AI-positive steps that the
system diagnostic doesn't actually run. `SESSION_SECRET` is also not referenced in
code — don't list it as required.

## Naming baggage outlives a content reskin
A content reskin leaves the old subject in non-content places users still see:
the **artifact titles** (`.replit-artifact/artifact.toml` `title`, shown in the
preview dropdown) and the **docs** (`replit.md`/`README.md`/`BLUEPRINT.md` often
describe the app as "a reskin of QuantReason"). Change titles via
`verifyAndReplaceArtifactToml` (write a full temp `.edit.toml`, replace, delete
temp). The directory/package slugs `qr-course` / `qr-course-demo` are QuantReason
lineage too, but there is **no supported rename-artifact callback** — renaming
the dir + `@workspace/<slug>` + `artifact.toml id`/commands + `app.ts` static
paths + workflows is an unsupported, far-reaching change. Don't do it on a live
deployed app without explicit sign-off; scrub titles + docs instead.
**Why:** a frustrated user wanted the repo clean for GitHub; titles/docs were the
real visible baggage, and a slug rename risked breaking a just-published app.

## Reseed gating
`seedIfEmpty` decides whether to wipe+reseed by comparing the DB's topic slugs to the
expected curriculum AND checking a sentinel phrase in one designated lecture
(`REVISION_SENTINEL_SLUG`). The `CONTENT_REVISION` constant is logged but NOT compared,
so bumping it alone does not force a reseed — you must change slugs or the sentinel
phrase to trigger one.

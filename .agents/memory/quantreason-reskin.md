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
subject terms and update every prompt string. The on-screen keyboard is named the
"math keyboard" in code (MathKeyboard.tsx) — that's a UI tool name, fine to keep.

## Reseed gating
`seedIfEmpty` decides whether to wipe+reseed by comparing the DB's topic slugs to the
expected curriculum AND checking a sentinel phrase in one designated lecture
(`REVISION_SENTINEL_SLUG`). The `CONTENT_REVISION` constant is logged but NOT compared,
so bumping it alone does not force a reseed — you must change slugs or the sentinel
phrase to trigger one.

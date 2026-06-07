# Blueprint — Teach Yourself Analytic Philosophy

Technical architecture for the QuantReason runtime as configured for the
analytic-philosophy curriculum. For the course concept and user-facing overview,
see `replit.md`; for setup and commands, see `README.md`.

---

## 1. System overview

```
                ┌──────────────────────────────────────────────┐
   Browser ───► │  Reverse proxy (path routing)                │
                │   /        → qr-course (React + Vite SPA)     │
                │   /api     → api-server (Express)             │
                │   /<demo>  → qr-course-demo (video)           │
                └──────────────────────────────────────────────┘
                                   │
                    ┌──────────────┼───────────────┐
                    ▼              ▼                ▼
              Postgres        OpenAI API       GPTZero API
             (lib/db,        (tutor, graders,  (static AI
              Neon via        practice,         detection)
              DATABASE_URL)   content audit)
```

- **Frontend** — `artifacts/qr-course`, a React + Vite single-page app. Pages:
  Landing, Dashboard, WeekView, LectureView, Assignments, AssignmentRunner,
  TopicPractice, Analytics, Diagnostics.
- **Backend** — `artifacts/api-server`, an Express server. Routers: `health`,
  `course`, `assignments`, `practice`, `tutor`, `detection`, `analytics`,
  `diagnostics`.
- **Shared libs** — `api-spec` (OpenAPI), `api-zod` (generated validators),
  `api-client-react` (generated React Query hooks), `db` (Drizzle + pool),
  `integrations-openai-ai-server` (OpenAI client).

---

## 2. Contract-first API

The OpenAPI document in `lib/api-spec` is the single source of truth. Codegen
(`pnpm --filter @workspace/api-spec run codegen`) produces:

- **Zod schemas** (`lib/api-zod`) — used by the server to validate request and
  response payloads.
- **React Query hooks** (`lib/api-client-react`) — used by the web app for all
  data fetching and mutations.

Do not change the OpenAPI `info.title`; it controls generated filenames. Flow for
any API change: edit the spec → run codegen → implement server handler against
the Zod schema → consume the generated hook in the UI.

---

## 3. Data model & seeding

- **Schema** lives in `lib/db` (Drizzle). Core entities: topics/lectures
  (organized into 4 weeks, 29 micro-lectures, split 7/7/7/8), assignments
  (homework, tests, midterm, final — 12 total), problems (each with a canonical
  symbolic-logic answer), attempts/submissions, practice sessions, and
  detection/analytics records.
- **Connection** — `lib/db/src/index.ts` builds the connection string from
  `DATABASE_URL` (falling back to `PG*` parts). SSL is enabled automatically for
  any non-local host and can be disabled with `DATABASE_SSL=false`. Pointing
  `DATABASE_URL` at an external Neon instance is all that's required to run on
  Neon.
- **Auto-reseed** — `seedIfEmpty` compares the DB's topic slugs against the
  expected curriculum *and* checks a sentinel phrase in a designated lecture. If
  either differs it wipes and re-seeds in dependency order. A single edit to the
  seed file therefore propagates a full curriculum swap on next boot.

---

## 4. AI pipeline

All model access goes through `integrations-openai-ai-server` (reads
`OPENAI_API_KEY`, optional `OPENAI_BASE_URL`). Model constants are centralized in
`artifacts/api-server/src/lib/ai.ts` (a primary text model and a faster model).

- **Tutor** (`routes/tutor.ts`) — token-by-token Server-Sent-Event streaming with
  a system prompt scoped to the active lecture section.
- **Practice generator** (`routes/practice.ts`) — generates problems on demand;
  per-session difficulty (1–4) adapts after each attempt.
- **Graders** (`routes/assignments.ts`) — LaTeX-aware AI grading of free-form
  symbolic answers, with a numeric short-circuit for purely numeric responses.
- **Content auditor** (`routes/diagnostics.ts`) — independent OpenAI verdict on
  every lecture body and every stored answer key.

All prompts are framed for **analytic philosophy taught through formal logic** —
answers are symbolizations using quantifiers, connectives, modal operators,
entailment turnstiles, and set-builder notation.

---

## 5. Two-layer AI-authorship detection

Implemented in `artifacts/api-server/src/lib/detection.ts`.

- **Static (GPTZero):** each submitted answer is sent to GPTZero's `predict/text`
  endpoint; the per-document AI probability is blended
  `0.85 × GPTZero + 0.15 × structural-heuristic`. If `GPTZERO_API_KEY` is absent,
  the system silently falls back to an LLM scorer plus the heuristic.
- **Diachronic (keystroke pattern):** the answer textarea captures keystroke
  count, erase count, bulk-insert events, longest bulk insert, rewrite segments,
  and total duration. A scorer penalizes paste-then-reword behavior, low
  keystroke-to-output ratios, and impossibly sustained typing speeds.

---

## 6. Diagnostics

Three self-tests in `routes/diagnostics.ts`, surfaced on the Diagnostics page:

| Endpoint | What it proves |
| --- | --- |
| `/diagnostics/system` | Environment (`DATABASE_URL` present), DB round-trip (`SELECT 1`), seed integrity, OpenAI chat + JSON mode, detection pipeline (heuristic + scoring), grader equivalence check. |
| `/diagnostics/synthetic-run` | End-to-end: a synthetic student reads lectures, submits every assignment, runs practice, asks the tutor, triggers detection — then verifies grading, detection, and analytics reflect the run. |
| `/diagnostics/content-audit` | OpenAI fact-checks every lecture and answer key, flagging faulty reasoning, misused logical notation, and answers that don't satisfy their prompt. |

The synthetic-run and content-audit are minutes-long because each grade,
generation, and audit is an LLM call.

---

## 7. Auth & routing

- `artifacts/api-server/src/app.ts` mounts, in order: request logging → the Clerk
  Frontend-API proxy (before body parsers, since it streams raw bytes) → CORS →
  body parsers → `clerkMiddleware` → the `/api` router.
- `/api/healthz` is public; everything else under `/api` is gated by
  `requireAuth` (Clerk, cookie-based). Diagnostics endpoints require auth, so test
  them through the UI rather than `curl`.
- In production (`NODE_ENV=production`) the API server can also serve the built
  `qr-course` SPA from the same process.

---

## 8. Symbolic answer harness

Every problem's canonical answer is a piece of logical notation, so two surfaces
must handle the full symbol set (quantifiers, connectives, modal operators,
blackboard-bold, entailment turnstiles, set-builder, ∅):

- **Rendering** — KaTeX renders prompts and answer keys.
- **Entry + grading** — an on-screen symbol keyboard composes answers; the
  LaTeX-aware AI grader (with numeric short-circuit) evaluates them.

---

## 9. Demo video

`artifacts/qr-course-demo` is an animated product demo built with the `video-js`
stack (React + Framer Motion). It auto-plays, loops, and includes a background
music layer (`public/audio/bg_music.mp3`) wired for time-synced playback with a
mute control in the iframe preview. Built and iterated via the DESIGN subagent;
the recording lifecycle in `src/lib/video/hooks.ts` must not be modified.

---

## 10. Deployment

- Set all required secrets (see `README.md`) in the deployment environment.
- `DATABASE_URL` must point at the production (Neon) database; the same
  auto-reseed logic runs on first boot there.
- Deploy via the Replit deployment flow.

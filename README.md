# Teach Yourself Analytic Philosophy

A self-paced, single-user web course that teaches the **method** of analytic
philosophy: take an ordinary sentence, find its logical form, and decide what it
actually commits you to. Every key claim is regimented into formal logical
notation, and every problem asks the student to *write the statement in symbols*.

This is a content reskin of the **QuantReason** runtime. The full runtime —
three-depth lectures, a section-scoped AI tutor, adaptive practice, AI-graded
assignments, two-layer AI-authorship detection, and one-click diagnostics — is
preserved unchanged. See `replit.md` for the course concept and `BLUEPRINT.md`
for the technical architecture.

---

## Monorepo layout

This is a pnpm + TypeScript monorepo. See `.local/skills/pnpm-workspace` for the
conventions.

```
artifacts/
  qr-course/        Web app (React + Vite) — the student-facing course UI
  api-server/       Express API — course, assignments, tutor, detection, diagnostics
  qr-course-demo/   Animated product demo video (video-js)
  mockup-sandbox/   Component preview server (design tooling)
lib/
  api-spec/         OpenAPI document (the single source of truth for the contract)
  api-zod/          Zod validators generated from the spec
  api-client-react/ React Query hooks generated from the spec
  db/               Drizzle schema + pooled Postgres client
  integrations-openai-ai-server/  OpenAI client wrapper
```

The global reverse proxy routes by path: the web app is served at `/` and the
API at `/api`. Always reach services through the proxy (`localhost:80/api/...`),
never a service port directly.

---

## Required secrets

| Secret | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes* | Postgres connection string. Read directly by `lib/db`; SSL auto-enabled for non-local hosts (`DATABASE_SSL=false` overrides). Point it at an external Neon database to use Neon. *Falls back to the standard `PG*` parts if unset. |
| `OPENAI_API_KEY` | yes | Powers the tutor, practice generator, AI graders, content auditor, and lecture expansion. The server throws on boot if missing. |
| `GPTZERO_API_KEY` | optional | GPTZero leg of static AI-authorship detection. Falls back to an LLM scorer + heuristic if absent. |
| `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY` | yes | Clerk auth. The `/api` surface is cookie-gated; `/api/healthz` is public. |
| `OPENAI_BASE_URL` | optional | Point the OpenAI client at a compatible proxy. |

Manage secrets through the Replit Secrets UI — never commit them.

---

## Running locally

Apps run via Replit **workflows**, not a root `pnpm dev`. The configured
workflows are:

- `artifacts/api-server: API Server` — the Express backend
- `artifacts/qr-course: web` — the student web app
- `artifacts/qr-course-demo: web` — the demo video
- `artifacts/mockup-sandbox: Component Preview Server` — design tooling

Restart a workflow after code or dependency changes. The database is seeded
automatically on first boot (see "Auto-reseed" below).

### Useful commands

```bash
# Typecheck everything (libs first, then artifacts)
pnpm run typecheck

# Typecheck a single package
pnpm --filter @workspace/api-server run typecheck

# Regenerate API hooks + Zod validators from the OpenAPI spec
pnpm --filter @workspace/api-spec run codegen
```

The contract is **contract-first**: edit the OpenAPI document in
`lib/api-spec`, run codegen, then implement against the generated hooks (UI) and
Zod schemas (server).

---

## Auto-reseed on curriculum change

`seedIfEmpty` compares the set of topic slugs in the database to the expected
curriculum **and** checks a sentinel phrase in a designated lecture. If either
differs, it wipes and re-seeds in dependency order. Swapping the seed file is all
it takes to propagate a new curriculum cleanly.

---

## Diagnostics

The Diagnostics page (`/diagnostics`, behind auth) exposes three one-click
self-tests, all backed by `artifacts/api-server/src/routes/diagnostics.ts`:

1. **System check** (`/diagnostics/system`) — environment (`DATABASE_URL`
   present), database round-trip, course-seed integrity, OpenAI chat + JSON
   mode, the detection pipeline (heuristic + scoring), and the grader
   equivalence check.
2. **Synthetic student** (`/diagnostics/synthetic-run`) — an end-to-end run: a
   fake student reads lectures, takes and submits every assignment, runs
   practice, asks the tutor, and triggers detection, then verifies grading +
   detection + analytics all reflect the run.
3. **Content auditor** (`/diagnostics/content-audit`) — sends every lecture body
   and every stored "correct answer" to OpenAI for an independent verdict on
   whether it is genuinely correct, flagging faulty reasoning, misused logical
   notation, and answers that don't satisfy their prompt.

---

## Deploying

Use the Replit deployment flow. In production the API server can serve the built
`qr-course` SPA from the same process (`NODE_ENV=production`). Ensure all
required secrets above are set in the deployment environment, and that
`DATABASE_URL` points at the production (Neon) database.

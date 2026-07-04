---
name: Google OAuth restore gotchas
description: Pitfalls when restoring/rebuilding the Google login in this project
---

- The old full-OAuth git snapshot reads `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`; the live secrets are `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `SESSION_SECRET`. Any restore must rename the env vars in the auth route and diagnostics or kickoff 500s with "not set".
  **Why:** Both secret-name generations exist in the workspace, so boot succeeds and the failure only appears when hitting `/api/auth/google`.
  **How to apply:** After restoring auth code from an old commit, grep for `GOOGLE_OAUTH` in source (ignore `dist/`) before restarting.
- The landing page must have exactly ONE "Sign in with Google" button (hero only). The user angrily complained about a duplicate header button.
  **Why:** Direct user directive July 2026; a second button was treated as a defect.
  **How to apply:** When touching Landing/Layout, verify only the hero CTA renders a Google button on the landing page.
- User has flip-flopped on auth three times (rip-out → rebuild → rip-out → rebuild). Never re-add or remove auth without an explicit instruction, and always update the replit.md auth section to match the current state.

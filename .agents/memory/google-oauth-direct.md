---
name: Direct Google OAuth gotchas
description: Lessons from replacing Clerk with hand-rolled Google OAuth + pg sessions in this repo
---

# Direct Google OAuth gotchas

- **Trim OAuth env vars.** A copy-pasted `GOOGLE_OAUTH_CLIENT_ID` carried a stray whitespace/newline; Google's auth screen still worked, but the token exchange failed with `invalid_client`. Always `.trim()` client id/secret where read.
  - **Why:** the failure only appears at the callback step, after the user already saw a working consent screen — very confusing to debug.
  - **How to apply:** any env-read helper for OAuth credentials must trim.
- **Credential self-test without a user:** POST a bogus code to `https://oauth2.googleapis.com/token`. Valid client id+secret → `invalid_grant` ("Malformed auth code"); bad secret → `invalid_client`. Great for diagnostics.
- **connect-pg-simple + esbuild bundle:** `createTableIfMissing` reads its `table.sql` from disk, which breaks inside a bundled build. Create the `session` table yourself with `CREATE TABLE IF NOT EXISTS`.
- **Background curl from the bash tool dies when the command exits** (even with setsid/nohup). For long-running HTTP diagnostics, start the fetch from the persistent code_execution notebook and poll a variable in a later call.
- **Shared Google client across apps:** the owner reuses one OAuth client for several apps; each app's `https://<domain>/api/auth/google/callback` (dev preview domain AND published domain) must be added as an Authorized redirect URI, or Google shows `redirect_uri_mismatch`.

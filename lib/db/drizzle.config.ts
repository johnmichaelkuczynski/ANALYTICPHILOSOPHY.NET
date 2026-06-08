import { defineConfig } from "drizzle-kit";
import path from "path";

// Prefer the user's external DB (APP_DATABASE_URL) when set, so schema pushes
// land in their database; otherwise fall back to the managed DATABASE_URL.
const url = process.env.APP_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  throw new Error("APP_DATABASE_URL or DATABASE_URL must be set, ensure the database is provisioned");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});

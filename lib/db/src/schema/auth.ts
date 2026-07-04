import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// One row per Clerk session — a new session means a new login.
export const loginEventsTable = pgTable("login_events", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  clerkUserId: text("clerk_user_id").notNull(),
  email: text("email"),
  name: text("name"),
  occurredAt: timestamp("occurred_at").notNull().defaultNow(),
});

import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// One row per unique browser (anonymous visitor id stored in localStorage).
export const visitorsTable = pgTable("visitors", {
  vid: text("vid").primaryKey(),
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// One row per visitor per visit window (at most one every 12 hours), so
// unique-visitor counts can be computed for arbitrary time ranges.
export const visitorHitsTable = pgTable(
  "visitor_hits",
  {
    id: serial("id").primaryKey(),
    vid: text("vid").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("IDX_visitor_hits_vid").on(table.vid)],
);

export type Visitor = typeof visitorsTable.$inferSelect;
export type VisitorHit = typeof visitorHitsTable.$inferSelect;

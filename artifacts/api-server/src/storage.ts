import { db, usersTable, loginEventsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

// Adapter exposing the storage interface expected by the canonical auth.ts,
// mapped onto this app's existing `users` and `login_events` tables.

export interface AuthUser {
  id: number;
  username: string;
  googleId?: string | null;
  email?: string | null;
  displayName?: string | null;
}

type UserRow = typeof usersTable.$inferSelect;

function toAuthUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    username: row.email ? row.email.split("@")[0] : `user_${row.id}`,
    googleId: row.googleId,
    email: row.email,
    displayName: row.name,
  };
}

export const storage = {
  async getUserById(id: number): Promise<AuthUser | undefined> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return row ? toAuthUser(row) : undefined;
  },

  async getUserByGoogleId(googleId: string): Promise<AuthUser | undefined> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleId))
      .limit(1);
    return row ? toAuthUser(row) : undefined;
  },

  async getUserByEmail(email: string): Promise<AuthUser | undefined> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return row ? toAuthUser(row) : undefined;
  },

  async createUserWithGoogle(data: {
    username: string;
    googleId: string;
    email: string | null;
    displayName: string | null;
  }): Promise<AuthUser> {
    const [row] = await db
      .insert(usersTable)
      .values({
        googleId: data.googleId,
        email: data.email ?? "",
        name: data.displayName,
      })
      .returning();
    return toAuthUser(row);
  },

  async updateUserGoogle(
    id: number,
    data: { googleId?: string; displayName?: string | null },
  ): Promise<AuthUser> {
    const [row] = await db
      .update(usersTable)
      .set({
        ...(data.googleId !== undefined ? { googleId: data.googleId } : {}),
        ...(data.displayName !== undefined ? { name: data.displayName } : {}),
        lastSignInAt: new Date(),
      })
      .where(eq(usersTable.id, id))
      .returning();
    return toAuthUser(row);
  },

  async recordVisit(userId: number, email: string | null): Promise<void> {
    await db.insert(loginEventsTable).values({ userId, email });
  },

  async getVisits(
    limit: number,
  ): Promise<{ id: number; email: string | null; visitedAt: Date }[]> {
    const rows = await db
      .select()
      .from(loginEventsTable)
      .orderBy(desc(loginEventsTable.occurredAt))
      .limit(limit);
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      visitedAt: r.occurredAt,
    }));
  },

  async getVisitTimestampsSince(_since: Date | null): Promise<Date[]> {
    const rows = await db
      .select({ occurredAt: loginEventsTable.occurredAt })
      .from(loginEventsTable);
    return rows.map((r) => r.occurredAt);
  },
};

// Shared seed content types. Each unit module (unit1.ts … unit8.ts) exports
// `topics` and `assignments` arrays built against these types; seed.ts
// concatenates them and writes them to the database in seedIfEmpty().

export type SeedTopic = {
  slug: string;
  title: string;
  weekNumber: number;
  blurb: string;
  lectureTitle: string;
  body: string;
};

export type SeedProblem = {
  topicSlug: string;
  prompt: string;
  correctAnswer: string;
  explanation: string;
  hint?: string;
};

export type SeedAssignment = {
  kind: "homework" | "test" | "midterm" | "final";
  title: string;
  weekNumber: number;
  isTimed: boolean;
  timeLimitMinutes: number | null;
  instructions: string;
  problems: SeedProblem[];
};

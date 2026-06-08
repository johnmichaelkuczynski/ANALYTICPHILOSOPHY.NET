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

import { chatJson } from "./ai";

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[\u2212\u2010-\u2015]/g, "-")
    .replace(/[$,]/g, "")
    .replace(/[)(\[\]{}]/g, "")
    .replace(/\s*=\s*/g, "=");
}

export async function gradeAnswer(opts: {
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
}): Promise<{ correct: boolean; explanation: string }> {
  const user = opts.userAnswer ?? "";
  const correct = opts.correctAnswer ?? "";

  if (normalize(user) === normalize(correct)) {
    return {
      correct: true,
      explanation: `Correct. ${correct}`,
    };
  }

  try {
    const out = await chatJson<{ correct: boolean; explanation: string }>(
      "You grade short PROSE answers for a college course on analytic philosophy taught entirely in plain English. You are given the prompt, a model correct answer, and the student's answer. Judge SEMANTICALLY: mark the student correct if their answer captures the essential claim and reasoning of the model answer, even if the wording, ordering, or examples differ. Accept partial wordings as long as the core point and its justification are present and not contradicted; mark incorrect if the central reasoning is missing, wrong, or contradicted. Do NOT require formal-logic notation or symbols — the course is taught in prose, and a symbol-free answer is fully acceptable. Be a fair but rigorous grader, not a keyword matcher. Output strict JSON {\"correct\": boolean, \"explanation\": string} where explanation is 1-3 short sentences that say what was right or missing and state the key point of the correct answer.",
      JSON.stringify({
        prompt: opts.prompt,
        correct_answer: correct,
        student_answer: user,
      }),
    );
    return {
      correct: !!out.correct,
      explanation: out.explanation || `The correct answer is ${correct}.`,
    };
  } catch {
    return {
      correct: false,
      explanation: `The correct answer is ${correct}.`,
    };
  }
}

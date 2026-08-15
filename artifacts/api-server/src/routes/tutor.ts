import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, lecturesTable } from "@workspace/db";
import { AskTutorBody, AskTutorResponse } from "@workspace/api-zod";
import { chatText, chatJson, FAST_MODEL } from "../lib/ai";
import { enforceAiQuota, addAiUsage } from "../lib/quota";

const router: IRouter = Router();

router.get("/tutor/suggestions/:lectureId", enforceAiQuota, async (req, res): Promise<void> => {
  const lectureId = Number(req.params.lectureId);
  if (!Number.isFinite(lectureId)) {
    res.status(400).json({ error: "invalid lectureId" });
    return;
  }
  const [lecture] = await db
    .select()
    .from(lecturesTable)
    .where(eq(lecturesTable.id, lectureId));
  if (!lecture) {
    res.status(404).json({ error: "lecture not found" });
    return;
  }

  try {
    const out = await chatJson<{ questions: string[] }>(
      'You are an encouraging college analytic-philosophy tutor. Reply as strict JSON of the form {"questions": string[]} with NO other keys.',
      `From the lecture below, generate 6 short, concrete starter questions a student might want to ask after reading it. Cover every major idea in the reading (not just the first one). Each question must be one sentence, under ~18 words, in the student's voice (e.g. "Why does ...?", "Can you show me ...?", "What's the difference between ...?").\n\nLOGIC NOTATION RULES (strict):\n- ANY logical symbol, variable, formula, or expression — including simple ones like $\\forall x$, $\\exists x$, $\\neg p$, $P \\to Q$, $\\Box p$ — MUST be wrapped in $...$ (LaTeX inline math).\n- NEVER write raw symbols like P -> Q or A ^ B. ALWAYS wrap: $P \\to Q$, $A \\wedge B$.\n- Quantifiers and special symbols (\\forall, \\exists, \\neg, \\wedge, \\vee, \\to, \\leftrightarrow, \\Box, \\Diamond, \\vDash, \\vdash, \\in, \\varnothing, \\mathbb{Z}, ...) MUST be inside $...$.\n- Plain English words ("proposition", "entailment", "instantiation") stay outside the math delimiters.\n\nLECTURE TITLE: ${lecture.title}\n\nLECTURE BODY:\n"""\n${lecture.body}\n"""`,
      FAST_MODEL,
    );
    const questions = Array.isArray(out?.questions)
      ? out.questions.filter((q) => typeof q === "string" && q.trim().length > 0).slice(0, 8)
      : [];
    addAiUsage(req, questions.join(" "));
    res.json({ questions });
  } catch {
    res.json({ questions: [] });
  }
});

router.post("/tutor/ask", enforceAiQuota, async (req, res): Promise<void> => {
  const parsed = AskTutorBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { message, selectedLectureText } = parsed.data;

  const sys =
    "You are an encouraging college analytic-philosophy tutor. Explain step by step, prefer concrete worked examples and formal logical notation, and write inline logic as $...$ (LaTeX). Keep replies short (3-6 sentences) unless the student asks for more detail. By default, guide rather than hand over the answer — BUT if the student explicitly asks you to 'just give the answer', 'show me the answer', 'tell me the answer', or otherwise asks for a direct answer, then give the complete, correct answer plainly without Socratic dodging.";
  const user = selectedLectureText
    ? `Context from the lecture the student is reading:\n"""\n${selectedLectureText}\n"""\n\nStudent question: ${message}`
    : message;

  let text = "";
  try {
    text = await chatText(sys, user);
    addAiUsage(req, text);
  } catch {
    text =
      "I'm having trouble reaching the tutor service right now. Try again in a moment, and consider re-reading the relevant section of the lecture.";
  }
  res.json(AskTutorResponse.parse({ text, audioUrl: null }));
});

export default router;

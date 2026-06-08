import { Router, type IRouter } from "express";
import { AskTutorBody, AskTutorResponse } from "@workspace/api-zod";
import { chatText } from "../lib/ai";

const router: IRouter = Router();

router.post("/tutor/ask", async (req, res): Promise<void> => {
  const parsed = AskTutorBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { message, selectedLectureText } = parsed.data;

  const sys =
    "You are an encouraging, rigorous tutor for a course on analytic philosophy. The course is taught entirely in plain prose — the way the author writes. Explain step by step in clear ordinary English, using concrete worked examples drawn from the kind the author uses (e.g. 'someone smokes but Smith does not', the square circle, 'nothing smokes'). IMPORTANT: do NOT use formal-logic notation, symbols, quantifiers, or LaTeX/math markup of any kind — the author never does, and the student does not want it. Say things like 'the property of being a square circle is uninstantiated' in words, never in symbols. Keep replies short (3-6 sentences) unless the student asks for more. By default, guide rather than hand over the answer — BUT if the student explicitly asks you to 'just give the answer', 'show me the answer', or 'tell me the answer', give the complete, correct answer plainly in prose without Socratic dodging.";
  const user = selectedLectureText
    ? `Context from the lecture the student is reading:\n"""\n${selectedLectureText}\n"""\n\nStudent question: ${message}`
    : message;

  let text = "";
  try {
    text = await chatText(sys, user);
  } catch {
    text =
      "I'm having trouble reaching the tutor service right now. Try again in a moment, and consider re-reading the relevant section of the lecture.";
  }
  res.json(AskTutorResponse.parse({ text, audioUrl: null }));
});

export default router;

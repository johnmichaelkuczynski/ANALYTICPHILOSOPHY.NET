import { Router, type IRouter } from "express";
import { asc, eq, inArray } from "drizzle-orm";
import PDFDocument from "pdfkit";
import {
  db,
  topicsTable,
  lecturesTable,
  assignmentsTable,
  problemsTable,
} from "@workspace/db";

const router: IRouter = Router();

const COURSE_TITLE = "Teach Yourself Analytic Philosophy";

// Strip LaTeX delimiters lightly so formulas stay readable in plain text/PDF.
function cleanMath(s: string): string {
  return s
    .replace(/\$\$?/g, "")
    .replace(/\\forall/g, "∀")
    .replace(/\\exists/g, "∃")
    .replace(/\\neg/g, "¬")
    .replace(/\\wedge/g, "∧")
    .replace(/\\vee/g, "∨")
    .replace(/\\to\b/g, "→")
    .replace(/\\leftrightarrow/g, "↔")
    .replace(/\\Box/g, "□")
    .replace(/\\Diamond/g, "◇")
    .replace(/\\vDash/g, "⊨")
    .replace(/\\vdash/g, "⊢")
    .replace(/\\varnothing/g, "∅")
    .replace(/\\in\b/g, "∈")
    .replace(/\\text\{([^}]*)\}/g, "$1")
    .replace(/\\mathbb\{([A-Z])\}/g, "$1")
    .replace(/\\,/g, " ");
}

interface CourseExport {
  topics: { title: string }[];
  lectures: { weekNumber: number; title: string; body: string }[];
  sampleAssignments: {
    title: string;
    kind: string;
    problems: { prompt: string }[];
  }[];
}

async function loadCourse(): Promise<CourseExport> {
  const topics = await db
    .select({ title: topicsTable.title })
    .from(topicsTable)
    .orderBy(asc(topicsTable.position));

  const lectures = await db
    .select({
      weekNumber: lecturesTable.weekNumber,
      title: lecturesTable.title,
      body: lecturesTable.body,
    })
    .from(lecturesTable)
    .orderBy(asc(lecturesTable.weekNumber), asc(lecturesTable.id));

  // "A few practice homeworks and exams": the first homework of each week,
  // plus the midterm and the final.
  const allAssignments = await db
    .select()
    .from(assignmentsTable)
    .orderBy(asc(assignmentsTable.weekNumber), asc(assignmentsTable.position));
  const picked: typeof allAssignments = [];
  const seenHomeworkWeeks = new Set<number>();
  for (const a of allAssignments) {
    if (a.kind === "homework" && !seenHomeworkWeeks.has(a.weekNumber)) {
      picked.push(a);
      seenHomeworkWeeks.add(a.weekNumber);
    } else if (a.kind === "midterm" || a.kind === "final") {
      picked.push(a);
    }
  }
  const problemRows = picked.length
    ? await db
        .select({
          assignmentId: problemsTable.assignmentId,
          prompt: problemsTable.prompt,
          position: problemsTable.position,
        })
        .from(problemsTable)
        .where(inArray(problemsTable.assignmentId, picked.map((a) => a.id)))
        .orderBy(asc(problemsTable.assignmentId), asc(problemsTable.position))
    : [];

  const sampleAssignments = picked.map((a) => ({
    title: a.title,
    kind: a.kind,
    problems: problemRows
      .filter((p) => p.assignmentId === a.id)
      .map((p) => ({ prompt: cleanMath(p.prompt) })),
  }));

  return {
    topics,
    lectures: lectures.map((l) => ({ ...l, body: cleanMath(l.body) })),
    sampleAssignments,
  };
}

function buildText(course: CourseExport): string {
  const lines: string[] = [];
  const rule = "=".repeat(72);
  lines.push(rule, COURSE_TITLE.toUpperCase(), rule, "");
  lines.push("TOPICS COVERED IN THIS COURSE", "-".repeat(40));
  for (const t of course.topics) lines.push(`• ${t.title}`);
  lines.push("", rule, "LECTURES", rule, "");
  for (const l of course.lectures) {
    lines.push("-".repeat(72), l.title, "-".repeat(72), "", l.body, "");
  }
  lines.push(rule, "PRACTICE: SAMPLE HOMEWORK AND EXAM PROBLEMS", rule, "");
  for (const a of course.sampleAssignments) {
    lines.push("-".repeat(72), a.title, "-".repeat(72), "");
    a.problems.forEach((p, i) => {
      lines.push(`${i + 1}. ${p.prompt}`, "");
    });
  }
  return lines.join("\n");
}

router.get("/course/download", async (req, res): Promise<void> => {
  const format = req.query.format === "pdf" ? "pdf" : "txt";
  const course = await loadCourse();

  if (format === "txt") {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="teach-yourself-analytic-philosophy.txt"',
    );
    res.send(buildText(course));
    return;
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="teach-yourself-analytic-philosophy.pdf"',
  );
  const doc = new PDFDocument({ margin: 54, bufferPages: true });
  doc.pipe(res);

  doc.font("Times-Bold").fontSize(22).text(COURSE_TITLE, { align: "center" });
  doc.moveDown(0.5);
  doc
    .font("Times-Roman")
    .fontSize(11)
    .text(
      "The complete lectures (short versions) plus sample homework and exam problems.",
      { align: "center" },
    );
  doc.moveDown(1.5);

  doc.font("Times-Bold").fontSize(15).text("Topics Covered in This Course");
  doc.moveDown(0.5);
  doc.font("Times-Roman").fontSize(10.5);
  for (const t of course.topics) doc.text(`•  ${t.title}`);

  for (const l of course.lectures) {
    doc.addPage();
    doc.font("Times-Bold").fontSize(14).text(l.title);
    doc.moveDown(0.5);
    doc.font("Times-Roman").fontSize(10.5).text(l.body, { lineGap: 2 });
  }

  doc.addPage();
  doc
    .font("Times-Bold")
    .fontSize(16)
    .text("Practice: Sample Homework and Exam Problems");
  for (const a of course.sampleAssignments) {
    doc.moveDown(1);
    doc.font("Times-Bold").fontSize(13).text(a.title);
    doc.moveDown(0.4);
    doc.font("Times-Roman").fontSize(10.5);
    a.problems.forEach((p, i) => {
      doc.text(`${i + 1}.  ${p.prompt}`, { lineGap: 2 });
      doc.moveDown(0.4);
    });
  }

  doc.end();
});

export default router;

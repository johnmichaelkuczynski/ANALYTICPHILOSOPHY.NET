import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "wouter";
import {
  useGetAssignment,
  useStartPracticeSession,
  useNextPracticeProblem,
  useGradePracticeAnswer,
  useAskTutor,
  type PracticeProblem,
  type PracticeGrade,
  type KeystrokeTrace,
} from "@workspace/api-client-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AnswerInput } from "@/components/AnswerInput";
import { TutorPane } from "@/components/TutorPane";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Target,
  MessageSquare,
  Send,
} from "lucide-react";

type ChatMsg = { role: "user" | "tutor"; text: string };

export default function AssignmentPractice() {
  const params = useParams<{ assignmentId: string }>();
  const assignmentId = parseInt(params.assignmentId ?? "", 10);

  const { data: assignment, isLoading: assignmentLoading } =
    useGetAssignment(assignmentId);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState<PracticeGrade | null>(null);
  const [trace, setTrace] = useState<KeystrokeTrace>({
    keystrokeCount: 0,
    eraseCount: 0,
    durationMs: 0,
  });
  const [history, setHistory] = useState<{ correct: boolean; difficulty: number }[]>(
    [],
  );
  const [showTutor, setShowTutor] = useState(false);

  const start = useStartPracticeSession();
  const next = useNextPracticeProblem();
  const grader = useGradePracticeAnswer();

  useEffect(() => {
    if (sessionId != null) return;
    if (Number.isNaN(assignmentId)) return;
    if (assignmentLoading) return;
    start.mutate(
      {
        data: {
          tutorEnabled: true,
          focusOnWeaknesses: true,
          assignmentId,
        },
      },
      {
        onSuccess: (s) => {
          setSessionId(s.id);
          loadNext(s.id);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, assignmentLoading]);

  function loadNext(sid: number) {
    setAnswer("");
    setGrade(null);
    setTrace({ keystrokeCount: 0, eraseCount: 0, durationMs: 0 });
    setProblem(null);
    next.mutate(
      { sessionId: sid, data: {} },
      { onSuccess: (p) => setProblem(p) },
    );
  }

  function submit() {
    if (!sessionId || !problem) return;
    grader.mutate(
      { sessionId, data: { problemId: problem.id, answer, trace } },
      {
        onSuccess: (r) => {
          setGrade(r);
          setHistory((h) => [
            ...h,
            { correct: r.correct, difficulty: problem.difficulty ?? 0 },
          ]);
        },
      },
    );
  }

  if (Number.isNaN(assignmentId)) {
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto">
          <div className="text-red-700">Invalid assignment.</div>
          <Link href="/assignments" className="text-primary underline">
            Back to assignments
          </Link>
        </div>
      </Layout>
    );
  }

  const sessionCorrect = history.filter((h) => h.correct).length;
  const studentAnswerForContext = answer;

  return (
    <Layout>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_minmax(380px,40%)] gap-0 min-h-0">
        {/* LEFT: practice */}
        <div className="overflow-y-auto lg:border-r border-border">
          <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <Link
                href="/assignments"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to assignments
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowTutor((v) => !v)}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                {showTutor ? "Hide tutor" : "Ask the tutor"}
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Assignment practice
              </div>
              <h1 className="font-serif text-3xl">
                Practice for:{" "}
                {assignment?.title ??
                  (assignmentLoading ? "Loading…" : `Assignment ${assignmentId}`)}
              </h1>
              <div className="text-sm text-muted-foreground">
                Unlimited, never repeats, never the real questions.
              </div>
              <div className="mt-2 text-sm bg-secondary/60 border rounded-md p-3">
                These problems are drawn from the same topics as the graded
                assignment — but they are <span className="font-semibold">always
                different</span> from the real questions. Warm up as much as you
                like, and lean on the tutor whenever you get stuck.
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {problem?.difficulty != null && (
                  <>Current difficulty {problem.difficulty.toFixed(1)}/5</>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">
                  Session score: {sessionCorrect}/{history.length}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => sessionId && loadNext(sessionId)}
                  disabled={next.isPending || grader.isPending || !sessionId}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  New problem
                </Button>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4 min-h-[120px]">
              {next.isPending || start.isPending || !problem ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
                <MarkdownRenderer content={problem.prompt} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <AnswerInput
                value={answer}
                onChange={(val, t) => {
                  setAnswer(val);
                  setTrace(t);
                }}
                disabled={!!grade || !problem}
                promptSource={problem?.prompt}
              />
            </div>

            {grade ? (
              <div
                className={`rounded-md border p-4 flex flex-col gap-3 ${
                  grade.correct
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-semibold ${
                    grade.correct ? "text-emerald-800" : "text-red-800"
                  }`}
                >
                  {grade.correct ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {grade.correct ? "Correct" : "Not quite"}
                </div>

                {/* Headline coaching feedback */}
                {grade.feedback && (
                  <div className="bg-background/70 border border-border rounded-md p-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Coaching feedback
                    </div>
                    <div className="text-sm prose prose-sm max-w-none">
                      <MarkdownRenderer content={grade.feedback} />
                    </div>
                  </div>
                )}

                {/* Focus pointer callout */}
                {grade.focusPointer && (
                  <div className="rounded-md border-l-4 border-primary bg-primary/5 p-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                      <Target className="w-3.5 h-3.5" />
                      Focus pointer
                    </div>
                    <div className="text-sm prose prose-sm max-w-none">
                      <MarkdownRenderer content={grade.focusPointer} />
                    </div>
                  </div>
                )}

                {grade.correctAnswer && (
                  <div className="text-sm">
                    <span className="font-semibold">Canonical answer: </span>
                    <span className="font-mono">{grade.correctAnswer}</span>
                  </div>
                )}

                <div className="text-sm prose prose-sm max-w-none text-muted-foreground">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1">
                    Explanation
                  </div>
                  <MarkdownRenderer content={grade.explanation} />
                </div>

                {grade.tutorTip && (
                  <div className="pt-2 border-t border-border/60 text-sm italic text-muted-foreground">
                    Tutor tip: {grade.tutorTip}
                  </div>
                )}

                {/* Per-result feedback dialogue thread */}
                <FeedbackThread
                  prompt={problem?.prompt ?? ""}
                  correctAnswer={grade.correctAnswer ?? ""}
                  studentAnswer={studentAnswerForContext}
                  feedback={grade.feedback}
                />

                <div className="flex justify-end">
                  <Button
                    onClick={() => sessionId && loadNext(sessionId)}
                    disabled={next.isPending}
                  >
                    Next problem
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={submit}
                  disabled={!answer.trim() || grader.isPending || !problem}
                >
                  {grader.isPending ? "Grading…" : "Submit answer"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: persistent tutor */}
        <div
          className={`flex-col min-h-0 bg-secondary/20 ${
            showTutor ? "flex" : "hidden"
          } lg:flex`}
        >
          <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2 text-sm font-medium">
            <MessageSquare className="w-4 h-4" />
            Ask the tutor
          </div>
          <TutorPane
            lectureId={null}
            selectedText=""
            onUsedSelection={() => {}}
          />
        </div>
      </div>
    </Layout>
  );
}

/* ============ Per-result feedback dialogue thread ============ */
function FeedbackThread({
  prompt,
  correctAnswer,
  studentAnswer,
  feedback,
}: {
  prompt: string;
  correctAnswer: string;
  studentAnswer: string;
  feedback: string;
}) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const ask = useAskTutor();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [history.length, ask.isPending]);

  const contextBlock =
    `--- CONTEXT FOR THIS DISCUSSION ---\n` +
    `PROBLEM PROMPT:\n${prompt}\n\n` +
    `CANONICAL ANSWER:\n${correctAnswer || "(not provided)"}\n\n` +
    `STUDENT'S ANSWER:\n${studentAnswer || "(blank)"}\n\n` +
    `FEEDBACK GIVEN TO STUDENT:\n${feedback}\n` +
    `--- END CONTEXT ---`;

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setHistory((h) => [...h, { role: "user", text }]);
    ask.mutate(
      {
        data: {
          message: text,
          selectedLectureText: contextBlock,
        },
      },
      {
        onSuccess: (res) => {
          setHistory((h) => [...h, { role: "tutor", text: res.text }]);
        },
        onError: (e) => {
          setHistory((h) => [
            ...h,
            { role: "tutor", text: `Tutor error: ${(e as Error).message}` },
          ]);
        },
      },
    );
  }

  return (
    <div className="pt-2 border-t border-border/60">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <MessageSquare className="w-4 h-4" />
          Discuss this feedback with the tutor
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Discuss this feedback
          </div>
          {history.length > 0 && (
            <div
              ref={scrollRef}
              className="flex flex-col gap-2 max-h-[260px] overflow-y-auto"
            >
              {history.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[92%] ${
                    m.role === "user" ? "self-end" : "self-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    <MarkdownRenderer
                      content={m.text}
                      inverted={m.role === "user"}
                    />
                  </div>
                </div>
              ))}
              {ask.isPending && (
                <div className="self-start px-3 py-2 rounded-lg bg-card border border-border text-sm animate-pulse text-muted-foreground">
                  Thinking…
                </div>
              )}
            </div>
          )}
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about this feedback… (Shift+Enter for newline)"
              rows={2}
              className="flex-1 bg-secondary border-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y min-h-[48px]"
            />
            <Button
              size="sm"
              onClick={send}
              disabled={!input.trim() || ask.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

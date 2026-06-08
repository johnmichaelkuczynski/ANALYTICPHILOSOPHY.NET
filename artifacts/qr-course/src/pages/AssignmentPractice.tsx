import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "wouter";
import {
  useGetAssignment,
  useStartPracticeSession,
  useNextPracticeProblem,
  useGradePracticeAnswer,
  type PracticeProblem,
  type PracticeGrade,
  type KeystrokeTrace,
} from "@workspace/api-client-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { AnswerInput } from "@/components/AnswerInput";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, PenTool } from "lucide-react";

export default function AssignmentPractice() {
  const params = useParams<{ id: string }>();
  const assignmentId = Number(params.id);
  const { data: assignment, isLoading } = useGetAssignment(assignmentId);

  // The distinct topics this assignment actually tests — practice cycles through them.
  const topicIds = useMemo(() => {
    if (!assignment) return [] as number[];
    const seen = new Set<number>();
    const ids: number[] = [];
    for (const p of assignment.problems) {
      if (!seen.has(p.topicId)) {
        seen.add(p.topicId);
        ids.push(p.topicId);
      }
    }
    return ids;
  }, [assignment]);

  const [sessionId, setSessionId] = useState<number | null>(null);
  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState<PracticeGrade | null>(null);
  const [trace, setTrace] = useState<KeystrokeTrace>({
    keystrokeCount: 0,
    eraseCount: 0,
    durationMs: 0,
  });
  const [history, setHistory] = useState<{ correct: boolean }[]>([]);
  const rotation = useRef(0);

  const start = useStartPracticeSession();
  const next = useNextPracticeProblem();
  const grader = useGradePracticeAnswer();

  function nextTopicId(): number | undefined {
    if (topicIds.length === 0) return undefined;
    const id = topicIds[rotation.current % topicIds.length];
    rotation.current += 1;
    return id;
  }

  function loadNext(sid: number) {
    setAnswer("");
    setGrade(null);
    setTrace({ keystrokeCount: 0, eraseCount: 0, durationMs: 0 });
    setProblem(null);
    next.mutate(
      { sessionId: sid, data: { topicId: nextTopicId() } },
      { onSuccess: (p) => setProblem(p) },
    );
  }

  useEffect(() => {
    if (sessionId != null) return;
    if (!assignment || topicIds.length === 0) return;
    start.mutate(
      {
        data: {
          tutorEnabled: true,
          focusOnWeaknesses: false,
          weekNumber: assignment.weekNumber,
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
  }, [assignment, topicIds]);

  function submit() {
    if (!sessionId || !problem) return;
    grader.mutate(
      { sessionId, data: { problemId: problem.id, answer, trace } },
      {
        onSuccess: (r) => {
          setGrade(r);
          setHistory((h) => [...h, { correct: r.correct }]);
        },
      },
    );
  }

  if (!isLoading && !assignment) {
    return (
      <Layout>
        <div className="p-8 max-w-3xl mx-auto">
          <div className="text-red-700 mb-2">Assignment not found.</div>
          <Link href="/assignments" className="text-primary underline">
            Back to assignments
          </Link>
        </div>
      </Layout>
    );
  }

  const sessionCorrect = history.filter((h) => h.correct).length;
  const kind = assignment?.kind ?? "assignment";

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col gap-5">
        <Link
          href="/assignments"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to assignments
        </Link>

        <div className="flex flex-col gap-1">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Practice for this {kind}
          </div>
          <h1 className="font-serif text-3xl">
            {assignment?.title ?? (isLoading ? "Loading…" : "Practice")}
          </h1>
          <div className="mt-2 text-sm bg-secondary/60 border rounded-md p-3">
            Unlimited AI-generated problems on exactly the{" "}
            {topicIds.length || ""} topic{topicIds.length === 1 ? "" : "s"} this{" "}
            {kind} covers. Difficulty adapts as you go, and your practice here{" "}
            <strong>does not affect your grade</strong>. When you feel ready, take
            the real {kind}.
          </div>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {problem?.topicTitle ? <>Topic: {problem.topicTitle}</> : <>Practice</>}
            {problem?.difficulty != null && (
              <span className="ml-2 normal-case font-normal">
                · difficulty {problem.difficulty.toFixed(1)}/5
              </span>
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
              data-testid="button-new-problem"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              New problem
            </Button>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-4 min-h-[120px] text-lg leading-relaxed">
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

        <AnswerInput
          value={answer}
          onChange={(val, t) => {
            setAnswer(val);
            setTrace(t);
          }}
          disabled={!!grade || !problem}
          promptSource={problem?.prompt}
        />

        {grade ? (
          <div
            className={`rounded-md border p-3 ${
              grade.correct
                ? "bg-emerald-50 border-emerald-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <div
              className={`flex items-center gap-2 font-semibold mb-2 ${
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
            <div className="text-sm prose prose-sm max-w-none">
              <MarkdownRenderer content={grade.explanation} />
            </div>
            {grade.tutorTip && (
              <div className="mt-2 pt-2 border-t border-border/60 text-sm italic text-muted-foreground">
                Tutor tip: {grade.tutorTip}
              </div>
            )}
            <div className="mt-3 flex justify-end">
              <Button
                onClick={() => sessionId && loadNext(sessionId)}
                disabled={next.isPending}
                data-testid="button-next-after-grade"
              >
                Next problem
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Link href={`/assignments/${assignmentId}`}>
              <Button variant="outline" data-testid="button-take-real">
                <PenTool className="w-4 h-4 mr-1" />
                Take the real {kind}
              </Button>
            </Link>
            <Button
              onClick={submit}
              disabled={!answer.trim() || grader.isPending || !problem}
              data-testid="button-submit-practice"
            >
              {grader.isPending ? "Grading…" : "Submit answer"}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}

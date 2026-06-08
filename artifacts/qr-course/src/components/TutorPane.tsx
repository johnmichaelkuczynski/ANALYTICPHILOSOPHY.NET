import { useCallback, useEffect, useRef, useState } from "react";
import { useAskTutor } from "@workspace/api-client-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { StarterQuestionCard } from "@/components/StarterQuestionCard";
import { MathKeyboard } from "@/components/MathKeyboard";
import { Button } from "@/components/ui/button";
import { Send, X, Sigma } from "lucide-react";

export type ChatMsg = { role: "user" | "tutor"; text: string };

export function TutorPane({
  lectureId,
  selectedText,
  onUsedSelection,
}: {
  lectureId: number | null;
  selectedText: string;
  onUsedSelection: () => void;
}) {
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const ask = useAskTutor();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Preloaded starter questions for this lecture
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (lectureId == null) return;
    setSuggestions(null);
    setSuggestionsDismissed(false);
    setDismissed(new Set());
    setSuggestionsLoading(true);
    fetch(`/api/tutor/suggestions/${lectureId}`)
      .then((r) => r.json())
      .then((data: { questions?: string[] }) => {
        setSuggestions(data.questions ?? []);
      })
      .catch(() => setSuggestions([]))
      .finally(() => setSuggestionsLoading(false));
  }, [lectureId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [history.length, ask.isPending]);

  const placeholder = selectedText
    ? "Ask about the highlighted passage…"
    : "Ask anything about this lecture… (Shift+Enter for newline)";

  function sendMessage(msg: string) {
    const text = msg.trim();
    if (!text) return;
    setHistory((h) => [...h, { role: "user", text }]);
    ask.mutate(
      {
        data: {
          message: text,
          lectureId: lectureId ?? undefined,
          selectedLectureText: selectedText || undefined,
        },
      },
      {
        onSuccess: (res) => {
          setHistory((h) => [...h, { role: "tutor", text: res.text }]);
          onUsedSelection();
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

  function send() {
    const msg = input.trim();
    if (!msg) return;
    setInput("");
    sendMessage(msg);
  }

  const insertAtCursor = useCallback((text: string) => {
    if (!text) return;
    const ta = inputRef.current;
    setInput((current) => {
      let next: string;
      let caret: number;
      if (ta && document.activeElement === ta) {
        const start = ta.selectionStart ?? current.length;
        const end = ta.selectionEnd ?? current.length;
        next = current.slice(0, start) + text + current.slice(end);
        caret = start + text.length;
      } else {
        next = current + text;
        caret = next.length;
      }
      requestAnimationFrame(() => {
        if (!ta) return;
        ta.focus();
        try {
          ta.setSelectionRange(caret, caret);
        } catch {}
      });
      return next;
    });
  }, []);

  const backspaceAtCursor = useCallback(() => {
    const ta = inputRef.current;
    setInput((current) => {
      let next: string;
      let caret: number;
      if (ta && document.activeElement === ta) {
        const start = ta.selectionStart ?? current.length;
        const end = ta.selectionEnd ?? current.length;
        if (start === end) {
          if (start === 0) return current;
          next = current.slice(0, start - 1) + current.slice(end);
          caret = start - 1;
        } else {
          next = current.slice(0, start) + current.slice(end);
          caret = start;
        }
      } else {
        if (current.length === 0) return current;
        next = current.slice(0, -1);
        caret = next.length;
      }
      requestAnimationFrame(() => {
        if (!ta) return;
        ta.focus();
        try {
          ta.setSelectionRange(caret, caret);
        } catch {}
      });
      return next;
    });
  }, []);

  const clearInput = useCallback(() => {
    setInput("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  function submitAttempt(question: string, attempt: string) {
    const a = attempt.trim();
    if (!a) return;
    const prompt =
      `I'm trying to answer this starter question myself before you explain.\n\n` +
      `QUESTION: ${question}\n\n` +
      `MY ANSWER: ${a}\n\n` +
      `Please (1) tell me clearly whether my answer is correct, partly correct, or wrong; ` +
      `(2) point to the specific part of my reasoning that's right or off; ` +
      `(3) then give the full correct answer with a brief worked example. ` +
      `Keep it tight — don't restate the lecture.`;
    sendMessage(prompt);
  }

  const visibleSuggestions = (suggestions ?? []).filter((_, i) => !dismissed.has(i));
  const showSuggestions =
    !suggestionsDismissed && (suggestionsLoading || visibleSuggestions.length > 0);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="border-b border-border bg-background p-3 flex flex-col gap-2">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={placeholder}
            rows={4}
            className="flex-1 bg-secondary border-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-y min-h-[96px] max-h-[280px]"
            data-testid="input-tutor-question"
          />
          <div className="flex flex-col gap-2">
            <Button
              size="lg"
              variant={showKeyboard ? "secondary" : "outline"}
              onClick={() => setShowKeyboard((s) => !s)}
              title={showKeyboard ? "Hide symbol keyboard" : "Show symbol keyboard"}
              aria-pressed={showKeyboard}
              data-testid="button-toggle-tutor-keyboard"
            >
              <Sigma className="w-4 h-4" />
            </Button>
            <Button size="lg" onClick={send} disabled={!input.trim() || ask.isPending}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {showKeyboard && (
          <MathKeyboard
            onInsert={insertAtCursor}
            onBackspace={backspaceAtCursor}
            onClear={clearInput}
          />
        )}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {showSuggestions && (
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Starter questions for this section
              </div>
              <button
                onClick={() => setSuggestionsDismissed(true)}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                data-testid="button-dismiss-all-suggestions"
              >
                <X className="w-3 h-3" /> dismiss all
              </button>
            </div>
            {suggestionsLoading ? (
              <div className="text-sm text-muted-foreground italic">
                Generating starter questions…
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {(suggestions ?? []).map((q, i) => {
                  if (dismissed.has(i)) return null;
                  return (
                    <StarterQuestionCard
                      key={i}
                      index={i}
                      question={q}
                      pending={ask.isPending}
                      onSubmitAttempt={(attempt) => submitAttempt(q, attempt)}
                      onShowAnswer={() =>
                        sendMessage(
                          `The student clicked "Just show me the answer" — they do NOT want Socratic hints. ` +
                            `Provide the complete, direct, factually correct answer to the question below, ` +
                            `in 3–6 sentences, with a one-line worked example or formula where it helps. ` +
                            `Use $...$ for any math.\n\nQUESTION: ${q}`,
                        )
                      }
                      onDismiss={() =>
                        setDismissed((d) => {
                          const n = new Set(d);
                          n.add(i);
                          return n;
                        })
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {history.length === 0 && !showSuggestions && (
          <div className="m-auto text-center text-sm text-muted-foreground italic max-w-sm">
            Ask the tutor for an explanation, a worked example, or a hint. Highlight a passage on the left to ground the question in that text.
          </div>
        )}

        {history.map((m, i) => (
          <div
            key={i}
            className={`max-w-[92%] ${m.role === "user" ? "self-end" : "self-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              <MarkdownRenderer content={m.text} inverted={m.role === "user"} />
            </div>
          </div>
        ))}
        {ask.isPending && (
          <div className="self-start px-3 py-2 rounded-lg bg-card border border-border text-sm animate-pulse text-muted-foreground">
            Thinking…
          </div>
        )}
      </div>
    </div>
  );
}

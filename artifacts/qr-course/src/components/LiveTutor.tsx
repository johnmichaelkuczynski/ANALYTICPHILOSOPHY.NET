import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAskTutor } from "@workspace/api-client-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMsg = { role: "user" | "tutor"; text: string };

const STARTERS = [
  "What is the difference between logical form and grammatical form?",
  'What does "someone smokes" really say, according to the author?',
  "Why does the Tractatus call its own sentences nonsense?",
  "Why is strict empiricism self-refuting?",
];

export function LiveTutor() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const ask = useAskTutor();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // The tutor is always available while reading and while PRACTICING, but it is
  // hidden during a graded assignment attempt (the runner at /assignments/:id,
  // without the /practice suffix) so it can't be used to cheat.
  const onGradedAttempt = /^\/assignments\/\d+\/?$/.test(location);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: "smooth" });
  }, [history.length, ask.isPending, open]);

  function sendMessage(msg: string) {
    const text = msg.trim();
    if (!text) return;
    setHistory((h) => [...h, { role: "user", text }]);
    ask.mutate(
      { data: { message: text } },
      {
        onSuccess: (res) =>
          setHistory((h) => [...h, { role: "tutor", text: res.text }]),
        onError: (e) =>
          setHistory((h) => [
            ...h,
            { role: "tutor", text: `Tutor error: ${(e as Error).message}` },
          ]),
      },
    );
  }

  function send() {
    const msg = input.trim();
    if (!msg) return;
    setInput("");
    sendMessage(msg);
  }

  if (onGradedAttempt) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-primary-foreground shadow-lg hover:opacity-90 transition-opacity"
        data-testid="button-open-tutor"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Ask the tutor</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[min(620px,80vh)] w-[min(420px,calc(100vw-2rem))] flex-col rounded-xl border border-border bg-background shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 font-serif font-semibold">
          <MessageCircle className="w-4 h-4 text-primary" />
          Live tutor
        </div>
        <button
          onClick={() => setOpen(false)}
          data-testid="button-close-tutor"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close tutor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {history.length === 0 && (
          <div className="flex flex-col gap-3">
            <div className="text-sm text-muted-foreground">
              Ask anything about the course — a definition, a worked example,
              what a sentence really says once you look past its grammar, or help
              thinking through a problem.
            </div>
            <div className="flex flex-col gap-2">
              {STARTERS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm rounded-md border border-border px-3 py-2 hover:bg-secondary transition-colors"
                  data-testid="button-tutor-starter"
                >
                  {q}
                </button>
              ))}
            </div>
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

      <div className="border-t border-border p-3 flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Ask the tutor…  (Shift+Enter for newline)"
          rows={2}
          className="flex-1 bg-secondary border-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          data-testid="input-live-tutor"
        />
        <Button
          onClick={send}
          disabled={!input.trim() || ask.isPending}
          data-testid="button-send-tutor"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { BookOpen, Sigma, GraduationCap, PenLine } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

const highlights = [
  {
    icon: BookOpen,
    title: "29 micro-lectures",
    body: "Four weeks — from Frege's logical form to the Tractatus, logical positivism, and the map of philosophy.",
  },
  {
    icon: GraduationCap,
    title: "One real example each",
    body: "Every idea grounded in a worked case: the 'someone' puzzle, Meinong's objects, the self-refutation of empiricism.",
  },
  {
    icon: PenLine,
    title: "Reason it out in prose",
    body: "Answer in your own words: take a sentence apart, say what it really commits you to, and defend the verdict — the way the author actually argues.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
            ∑
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">
            AnalyticPhil
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary transition-colors"
              data-testid="button-signin"
            >
              Sign in
            </button>
          </Link>
          <Link href="/sign-up">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              data-testid="button-signup"
            >
              Get started
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto w-full py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-8">
          <Sigma className="w-3.5 h-3.5" />
          A four-week course on the logic behind the words
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Teach Yourself Analytic Philosophy
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Philosophy is the analysis of the categories we think with. This course
          asks the question textbooks skip:{" "}
          <span className="text-foreground font-medium">
            what do these statements really say?
          </span>{" "}
          Read the idea, see it grounded in a real example, then work out — in
          your own words — what the claim really says.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Link href="/sign-up">
            <button
              className="px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              data-testid="button-cta-start"
            >
              Start the course
            </button>
          </Link>
          <Link href="/sign-in">
            <button
              className="px-6 py-3 rounded-md text-base font-medium border border-border hover:bg-secondary transition-colors"
              data-testid="button-cta-signin"
            >
              I already have an account
            </button>
          </Link>
        </div>
      </main>

      <section className="px-6 pb-20 max-w-5xl mx-auto w-full">
        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-lg border border-border bg-card p-6 text-left"
            >
              <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-primary mb-4">
                <h.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-semibold text-lg">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {h.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-6 border-t border-border text-center text-xs text-muted-foreground">
        Teach Yourself Analytic Philosophy — read the idea, ground the idea,
        write the idea.
      </footer>
    </div>
  );
}

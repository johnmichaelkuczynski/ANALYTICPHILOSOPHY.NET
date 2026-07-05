import { useLocation } from "wouter";
import { BookOpen, Sigma, GraduationCap, PenLine, LogOut } from "lucide-react";
import { useAuth, useLogout, GOOGLE_SIGN_IN_URL } from "@/hooks/use-auth";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

const highlights = [
  {
    icon: BookOpen,
    title: "37 micro-lectures",
    body: "Eight units — from the analysis of analysis and Frege's logical form to the Tractatus, logical positivism, formal truth, and the map of philosophy.",
  },
  {
    icon: GraduationCap,
    title: "One real example each",
    body: "Every idea grounded in a worked case: the 'someone' puzzle, Meinong's objects, the self-refutation of empiricism.",
  },
  {
    icon: PenLine,
    title: "Write it in symbols",
    body: "Compose answers in genuine logical notation — quantifiers, ¬, →, ↔, □, ◇, set-builder — with an on-screen symbol keyboard.",
  },
];

export default function Landing() {
  const [, setLocation] = useLocation();
  const { data: auth } = useAuth();
  const logout = useLogout();

  const enterCourse = () => setLocation("/dashboard");
  const signedIn = !!auth?.authenticated && !!auth.user;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
            ∑
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">
            Analytic Philosophy 101
          </span>
        </div>
        {signedIn && (
          <button
            type="button"
            onClick={enterCourse}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary transition-colors"
            data-testid="button-enter-course"
          >
            Enter the course
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto w-full py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-8">
          <Sigma className="w-3.5 h-3.5" />
          An eight-unit course on the logic behind the words
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
          Read the idea, see it grounded in a real example, then write the
          defining statement in logical symbols of your own.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          {signedIn ? (
            <>
              <button
                type="button"
                onClick={enterCourse}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                data-testid="button-cta-start"
              >
                Start the course
              </button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span data-testid="text-landing-signed-in">
                  Signed in as{" "}
                  <span className="text-foreground font-medium">
                    {auth!.user!.displayName || auth!.user!.email}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  disabled={logout.isPending}
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground transition-colors disabled:opacity-50"
                  data-testid="button-landing-logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <a
                href={GOOGLE_SIGN_IN_URL}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                data-testid="button-google-signin"
              >
                <GoogleIcon className="w-5 h-5" />
                Sign in with Google
              </a>
              <p className="text-sm text-muted-foreground">
                Signing in with Google is required to enter the course.
              </p>
            </>
          )}
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

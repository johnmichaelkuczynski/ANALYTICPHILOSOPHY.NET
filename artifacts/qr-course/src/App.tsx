import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GOOGLE_SIGN_IN_URL } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Assignments from "@/pages/Assignments";
import Analytics from "@/pages/Analytics";
import WeekView from "@/pages/WeekView";
import LectureView from "@/pages/LectureView";
import AssignmentRunner from "@/pages/AssignmentRunner";
import Diagnostics from "@/pages/Diagnostics";
import Administrative from "@/pages/Administrative";
import TopicPractice from "@/pages/TopicPractice";
import AssignmentPractice from "@/pages/AssignmentPractice";

const LOGIN_REQUIRED_EVENT = "app:login-required";

// The course is open to anonymous visitors. AI features allow a free sample;
// once the server says the sample is used up (401 + code LOGIN_REQUIRED),
// every AI call surfaces this dialog asking the visitor to sign in.
function isLoginRequiredError(error: unknown): boolean {
  const data = (error as { data?: { code?: string } } | null)?.data;
  return data?.code === "LOGIN_REQUIRED";
}

function onApiError(error: unknown) {
  if (isLoginRequiredError(error)) {
    window.dispatchEvent(new CustomEvent(LOGIN_REQUIRED_EVENT));
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: onApiError }),
  mutationCache: new MutationCache({ onError: onApiError }),
});

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function LoginRequiredDialog() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(LOGIN_REQUIRED_EVENT, handler);
    return () => window.removeEventListener(LOGIN_REQUIRED_EVENT, handler);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent data-testid="dialog-login-required">
        <DialogHeader>
          <DialogTitle>Sign in to keep going</DialogTitle>
          <DialogDescription>
            You&apos;ve used your free sample of the AI tutor and grader. Sign in
            with Google — it&apos;s free — to continue with unlimited tutoring,
            practice, and grading.
          </DialogDescription>
        </DialogHeader>
        <a
          href={GOOGLE_SIGN_IN_URL}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          data-testid="button-dialog-google-signin"
        >
          Sign in with Google
        </a>
      </DialogContent>
    </Dialog>
  );
}

// Anonymous unique-visitor beacon: a stable random id per browser, reported
// once per page load (the server dedupes to one hit per 12 hours).
function useVisitBeacon() {
  useEffect(() => {
    try {
      const key = "ap-visitor-id";
      let vid = localStorage.getItem(key);
      if (!vid) {
        vid = crypto.randomUUID();
        localStorage.setItem(key, vid);
      }
      void fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ vid }),
      }).catch(() => {});
    } catch {
      // localStorage unavailable (private mode) — skip silently.
    }
  }, []);
}

function App() {
  useVisitBeacon();
  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/assignments" component={Assignments} />
            <Route path="/assignments/:id" component={AssignmentRunner} />
            <Route path="/analytics" component={Analytics} />
            <Route path="/diagnostics" component={Diagnostics} />
            <Route path="/administrative" component={Administrative} />
            <Route path="/weeks/:weekNumber" component={WeekView} />
            <Route path="/lectures/:lectureId" component={LectureView} />
            <Route path="/practice/topic/:topicId" component={TopicPractice} />
            <Route path="/practice/assignment/:assignmentId" component={AssignmentPractice} />
            <Route component={NotFound} />
          </Switch>
          <LoginRequiredDialog />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;

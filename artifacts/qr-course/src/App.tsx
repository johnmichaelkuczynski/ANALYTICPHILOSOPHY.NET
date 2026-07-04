import type { ComponentType } from "react";
import { Switch, Route, Redirect, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
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

const queryClient = new QueryClient();

// Auth is enforced only in the published (production) build. The Replit dev
// preview runs inside a cross-origin iframe where the sameSite=lax session
// cookie is not sent, so gating routes/APIs in development would block
// everything in the preview.
const authEnforced = import.meta.env.PROD;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function HomeRedirect() {
  const { isLoading, isAuthenticated } = useAuth();
  if (!authEnforced) return <Landing />;
  if (isLoading) return null;
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return <Landing />;
}

// Wraps a page component so signed-out users are redirected to the landing
// page. Enforcement is production-only (see authEnforced above).
function protect<P extends object>(Component: ComponentType<P>) {
  if (!authEnforced) return Component;
  return function Guarded(props: P) {
    const { isLoading, isAuthenticated } = useAuth();
    if (isLoading) return null;
    if (!isAuthenticated) return <Redirect to="/" />;
    return <Component {...props} />;
  };
}

const DashboardGuarded = protect(Dashboard);
const AssignmentsGuarded = protect(Assignments);
const AssignmentRunnerGuarded = protect(AssignmentRunner);
const AnalyticsGuarded = protect(Analytics);
const DiagnosticsGuarded = protect(Diagnostics);
const AdministrativeGuarded = protect(Administrative);
const WeekViewGuarded = protect(WeekView);
const LectureViewGuarded = protect(LectureView);
const TopicPracticeGuarded = protect(TopicPractice);
const AssignmentPracticeGuarded = protect(AssignmentPractice);

function App() {
  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/dashboard" component={DashboardGuarded} />
            <Route path="/assignments" component={AssignmentsGuarded} />
            <Route path="/assignments/:id" component={AssignmentRunnerGuarded} />
            <Route path="/analytics" component={AnalyticsGuarded} />
            <Route path="/diagnostics" component={DiagnosticsGuarded} />
            <Route path="/administrative" component={AdministrativeGuarded} />
            <Route path="/weeks/:weekNumber" component={WeekViewGuarded} />
            <Route path="/lectures/:lectureId" component={LectureViewGuarded} />
            <Route path="/practice/topic/:topicId" component={TopicPracticeGuarded} />
            <Route path="/practice/assignment/:assignmentId" component={AssignmentPracticeGuarded} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;

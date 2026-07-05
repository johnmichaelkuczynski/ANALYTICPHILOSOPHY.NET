import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
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

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// The site is login-only: every page except the landing page requires a
// signed-in Google user. Logged-out visitors are sent back to the landing
// page, whose only way forward is the "Sign in with Google" button.
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function Protected(props: P) {
    const { data: auth, isLoading } = useAuth();
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      );
    }
    if (!auth?.authenticated) {
      return <Redirect to="/" />;
    }
    return <Component {...props} />;
  };
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Switch>
            <Route path="/" component={Landing} />
            <Route path="/dashboard" component={withAuth(Dashboard)} />
            <Route path="/assignments" component={withAuth(Assignments)} />
            <Route path="/assignments/:id" component={withAuth(AssignmentRunner)} />
            <Route path="/analytics" component={withAuth(Analytics)} />
            <Route path="/diagnostics" component={withAuth(Diagnostics)} />
            <Route path="/administrative" component={withAuth(Administrative)} />
            <Route path="/weeks/:weekNumber" component={withAuth(WeekView)} />
            <Route path="/lectures/:lectureId" component={withAuth(LectureView)} />
            <Route path="/practice/topic/:topicId" component={withAuth(TopicPractice)} />
            <Route path="/practice/assignment/:assignmentId" component={withAuth(AssignmentPractice)} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;

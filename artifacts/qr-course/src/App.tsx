import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Assignments from "@/pages/Assignments";
import Analytics from "@/pages/Analytics";
import WeekView from "@/pages/WeekView";
import LectureView from "@/pages/LectureView";
import AssignmentRunner from "@/pages/AssignmentRunner";
import Diagnostics from "@/pages/Diagnostics";
import TopicPractice from "@/pages/TopicPractice";
import AssignmentPractice from "@/pages/AssignmentPractice";

const queryClient = new QueryClient();

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
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
            <Route path="/weeks/:weekNumber" component={WeekView} />
            <Route path="/lectures/:lectureId" component={LectureView} />
            <Route path="/practice/topic/:topicId" component={TopicPractice} />
            <Route
              path="/practice/assignment/:assignmentId"
              component={AssignmentPractice}
            />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;

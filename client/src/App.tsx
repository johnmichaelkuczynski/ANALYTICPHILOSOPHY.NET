import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Chat from "@/pages/chat";
import ModelBuilder from "@/pages/model-builder";
import PaperWriter from "@/pages/paper-writer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Chat} />
      <Route path="/model-builder" component={ModelBuilder} />
      <Route path="/paper-writer" component={PaperWriter} />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

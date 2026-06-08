import { useEffect, useRef, type ComponentType } from "react";
import { Switch, Route, Redirect, useLocation, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
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

// REQUIRED — copy verbatim. Resolves the key from window.location.hostname so the
// same build serves multiple Clerk custom domains.
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// REQUIRED — copy verbatim. Empty in dev, auto-set in prod.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Clerk passes full paths to routerPush/routerReplace, but wouter's
// setLocation prepends the base — strip it to avoid doubling.
function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#1a2b4a",
    colorForeground: "#0f172a",
    colorMutedForeground: "#64748b",
    colorDanger: "#dc2626",
    colorBackground: "#ffffff",
    colorInput: "#ffffff",
    colorInputForeground: "#0f172a",
    colorNeutral: "#cbd5e1",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "0.375rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-white border border-[#e2e8f0] shadow-sm rounded-xl w-[440px] max-w-full overflow-hidden",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-[#0f172a] font-serif font-semibold",
    headerSubtitle: "text-[#64748b]",
    socialButtonsBlockButton: "border border-[#cbd5e1] hover:bg-[#f1f5f9]",
    socialButtonsBlockButtonText: "text-[#0f172a] font-medium",
    dividerLine: "bg-[#e2e8f0]",
    dividerText: "text-[#64748b]",
    formFieldLabel: "text-[#0f172a] font-medium",
    formFieldInput: "bg-white border border-[#cbd5e1] text-[#0f172a]",
    formButtonPrimary: "bg-[#1a2b4a] text-white hover:opacity-90",
    footerAction: "",
    footerActionText: "text-[#64748b]",
    footerActionLink: "text-[#1a2b4a] font-medium hover:underline",
    identityPreviewEditButton: "text-[#1a2b4a]",
    formFieldSuccessText: "text-[#16a34a]",
    alert: "border border-[#e2e8f0]",
    alertText: "text-[#0f172a]",
    otpCodeFieldInput: "border border-[#cbd5e1] text-[#0f172a]",
    logoBox: "h-9",
    logoImage: "h-9",
    main: "",
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

// Invalidates the QueryClient cache when the signed-in user changes.
function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Show when="signed-out">
        <Landing />
      </Show>
    </>
  );
}

// Wraps a page component so signed-out users are redirected to the landing page.
function protect<P extends object>(Component: ComponentType<P>) {
  return function Guarded(props: P) {
    return (
      <>
        <Show when="signed-in">
          <Component {...props} />
        </Show>
        <Show when="signed-out">
          <Redirect to="/" />
        </Show>
      </>
    );
  };
}

const DashboardGuarded = protect(Dashboard);
const AssignmentsGuarded = protect(Assignments);
const AssignmentRunnerGuarded = protect(AssignmentRunner);
const AnalyticsGuarded = protect(Analytics);
const DiagnosticsGuarded = protect(Diagnostics);
const WeekViewGuarded = protect(WeekView);
const LectureViewGuarded = protect(LectureView);
const TopicPracticeGuarded = protect(TopicPractice);
const AssignmentPracticeGuarded = protect(AssignmentPractice);

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to continue your course",
          },
        },
        signUp: {
          start: {
            title: "Create your account",
            subtitle: "Start teaching yourself analytic philosophy",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route path="/dashboard" component={DashboardGuarded} />
            <Route path="/assignments" component={AssignmentsGuarded} />
            <Route path="/assignments/:id/practice" component={AssignmentPracticeGuarded} />
            <Route path="/assignments/:id" component={AssignmentRunnerGuarded} />
            <Route path="/analytics" component={AnalyticsGuarded} />
            <Route path="/diagnostics" component={DiagnosticsGuarded} />
            <Route path="/weeks/:weekNumber" component={WeekViewGuarded} />
            <Route path="/lectures/:lectureId" component={LectureViewGuarded} />
            <Route path="/practice/topic/:topicId" component={TopicPracticeGuarded} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;

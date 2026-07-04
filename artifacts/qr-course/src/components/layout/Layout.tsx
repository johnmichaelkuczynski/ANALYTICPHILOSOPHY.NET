import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, PenTool, BarChart3, Activity, RotateCcw, LogOut, ShieldCheck } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Show, useClerk, useUser } from "@clerk/react";
import { LogIn } from "lucide-react";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Account section pinned to the bottom of the sidebar so it stays visible at
// any window width. Shows the signed-in user's email + Sign out, or a Sign in
// button when signed out.
function AccountSection() {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="p-4 border-t border-border">
      <Show when="signed-in">
        <div className="flex flex-col gap-2">
          <div className="text-xs text-muted-foreground truncate" data-testid="text-user-email">
            {user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? "Signed in"}
          </div>
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: basePath || "/" })}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary w-full justify-center"
            data-testid="button-signout"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </Show>
      <Show when="signed-out">
        <Link href="/sign-in">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium border border-border hover:bg-secondary w-full justify-center"
            data-testid="button-sidebar-signin"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </button>
        </Link>
      </Show>
    </div>
  );
}

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/assignments", label: "Assignments", icon: PenTool },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/administrative", label: "Administrative", icon: ShieldCheck },
  ];

  return (
    <div className="w-64 border-r bg-sidebar flex flex-col h-full h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <Link href="/dashboard">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-serif font-bold text-lg">
              ∑
            </div>
            <span className="font-serif font-semibold text-lg tracking-tight">Analytic Philosophy 101</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <AccountSection />
    </div>
  );
}

function TopBar() {
  const [location, setLocation] = useLocation();
  const active = location.startsWith("/diagnostics");
  const qc = useQueryClient();
  const [resetting, setResetting] = useState(false);

  async function handleReset() {
    if (
      !confirm(
        "Reset the course? This deletes every assignment attempt, answer, and practice session, but keeps lectures and assignments.",
      )
    )
      return;
    setResetting(true);
    try {
      const res = await fetch("/api/diagnostics/reset", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await qc.invalidateQueries();
      setLocation("/dashboard");
    } catch (e) {
      alert(`Reset failed: ${(e as Error).message}`);
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-end gap-2 px-6 py-3 border-b border-border bg-background/80 backdrop-blur">
      <button
        onClick={handleReset}
        disabled={resetting}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-border hover:bg-secondary disabled:opacity-50"
        data-testid="button-reset"
        title="Wipe all student progress (keeps lectures and assignments)"
      >
        <RotateCcw className={`w-4 h-4 ${resetting ? "animate-spin" : ""}`} />
        {resetting ? "Resetting…" : "Reset course"}
      </button>
      <Link href="/diagnostics">
        <button
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            active
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-secondary"
          }`}
          data-testid="button-diagnostic"
        >
          <Activity className="w-4 h-4" />
          Diagnostic
        </button>
      </Link>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <TopBar />
        {children}
      </main>
    </div>
  );
}

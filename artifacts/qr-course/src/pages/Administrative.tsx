import { Layout } from "@/components/layout/Layout";
import { Loader2, ShieldAlert, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, GOOGLE_SIGN_IN_URL } from "@/hooks/use-auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SeriesPoint {
  label: string;
  count: number;
}

interface AdminVisitsResponse {
  stats: {
    allTime: number;
    last24Hours: number;
    lastWeek: number;
    lastMonth: number;
    lastYear: number;
  };
  uniqueVisitors: {
    allTime: number;
    last24Hours: number;
    lastWeek: number;
    lastMonth: number;
    lastYear: number;
  };
  series: {
    last24Hours: SeriesPoint[];
    lastWeek: SeriesPoint[];
    lastMonth: SeriesPoint[];
    lastYear: SeriesPoint[];
    allTime: SeriesPoint[];
  };
  visits: { id: number; email: string | null; visitedAt: string }[];
}

function useAdminVisits() {
  return useQuery<AdminVisitsResponse>({
    queryKey: ["admin", "visits"],
    queryFn: async () => {
      const res = await fetch("/api/admin/visits", { credentials: "include" });
      if (res.status === 403) throw new Error("forbidden");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    retry: false,
  });
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-lg bg-card p-5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div
        className="font-serif text-3xl mt-1 tabular-nums"
        data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {value}
      </div>
    </div>
  );
}

function VisitChart({ title, data }: { title: string; data: SeriesPoint[] }) {
  return (
    <div className="border border-border rounded-lg bg-card p-5">
      <div className="font-serif text-lg mb-3">{title}</div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(217, 47%, 22%)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Administrative() {
  const { data, isLoading, error } = useAdminVisits();
  const { data: auth } = useAuth();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl mb-1 flex items-center gap-2">
            <Users className="w-7 h-7" /> Administrative
          </h1>
          <p className="text-muted-foreground">
            Who has visited the site (by Google login), with totals and graphs.
            Only visible to the site owner.
          </p>
        </div>

        {isLoading ? (
          <div className="p-5 text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading visitor data…
          </div>
        ) : error || !data ? (
          <div
            className="border border-border rounded-lg bg-card p-6 flex items-center gap-3 text-sm"
            data-testid="text-not-authorized"
          >
            <ShieldAlert className="w-5 h-5 text-red-700 shrink-0" />
            <div>
              This page is restricted to the site owner.{" "}
              {auth?.authenticated ? (
                <>The account you are signed in with is not the owner account.</>
              ) : (
                <>
                  <a
                    href={GOOGLE_SIGN_IN_URL}
                    className="underline underline-offset-4 font-medium"
                    data-testid="link-admin-signin"
                  >
                    Sign in with Google
                  </a>{" "}
                  using the owner account to view visitor data.
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="font-serif text-xl mb-3">Unique visitors</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Distinct browsers that opened the site (signed in or not).
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard label="Unique 24 hours" value={data.uniqueVisitors?.last24Hours ?? 0} />
                <StatCard label="Unique week" value={data.uniqueVisitors?.lastWeek ?? 0} />
                <StatCard label="Unique month" value={data.uniqueVisitors?.lastMonth ?? 0} />
                <StatCard label="Unique year" value={data.uniqueVisitors?.lastYear ?? 0} />
                <StatCard label="Unique all time" value={data.uniqueVisitors?.allTime ?? 0} />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl mb-3">Logins</h2>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard label="Last 24 hours" value={data.stats.last24Hours} />
                <StatCard label="Last week" value={data.stats.lastWeek} />
                <StatCard label="Last month" value={data.stats.lastMonth} />
                <StatCard label="Last year" value={data.stats.lastYear} />
                <StatCard label="All time" value={data.stats.allTime} />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <VisitChart title="Last 24 hours (by hour)" data={data.series.last24Hours} />
              <VisitChart title="Last week (by day)" data={data.series.lastWeek} />
              <VisitChart title="Last month (by day)" data={data.series.lastMonth} />
              <VisitChart title="Last year (by month)" data={data.series.lastYear} />
              <VisitChart title="All time" data={data.series.allTime} />
            </div>

            <div className="border border-border rounded-lg bg-card">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <div className="font-serif text-lg">Visits (by Gmail)</div>
                <div className="text-sm text-muted-foreground">
                  {data.visits.length} logins
                </div>
              </div>
              {data.visits.length === 0 ? (
                <div
                  className="p-5 text-sm text-muted-foreground"
                  data-testid="text-no-visitors"
                >
                  No visits recorded yet. Visits are recorded when someone signs
                  in with Google.
                </div>
              ) : (
                <div className="divide-y divide-border max-h-[28rem] overflow-y-auto">
                  {data.visits.map((v, i) => (
                    <div
                      key={v.id}
                      className="px-5 py-3 flex items-center justify-between gap-4"
                      data-testid={`row-visitor-${i}`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {v.email ?? "(no email)"}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground tabular-nums shrink-0">
                        {new Date(v.visitedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Loader2, Lock, Users } from "lucide-react";
import { useGetAdminVisitorStats } from "@workspace/api-client-react";
import type { AdminVisitorStats, SeriesPoint } from "@workspace/api-client-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border rounded-lg bg-card p-5">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="font-serif text-3xl mt-1 tabular-nums" data-testid={`stat-${label.replace(/\s+/g, "-").toLowerCase()}`}>
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
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState<AdminVisitorStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useGetAdminVisitorStats({
    mutation: {
      onSuccess: (data) => {
        setStats(data);
        setError(null);
      },
      onError: () => {
        setStats(null);
        setError("Wrong password.");
      },
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    mutate({ data: { password } });
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        <div>
          <h1 className="font-serif text-3xl mb-1 flex items-center gap-2">
            <Users className="w-7 h-7" /> Administrative
          </h1>
          <p className="text-muted-foreground">
            Who has visited the site (by Google login), with totals and graphs.
          </p>
        </div>

        {!stats ? (
          <form
            onSubmit={submit}
            className="border border-border rounded-lg bg-card p-6 max-w-sm space-y-4"
            data-testid="form-admin-password"
          >
            <div className="flex items-center gap-2 font-medium">
              <Lock className="w-4 h-4" /> Enter the admin password
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 rounded-md border border-border bg-background"
              data-testid="input-admin-password"
              autoFocus
            />
            {error && (
              <div className="text-sm text-red-700" data-testid="text-password-error">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isPending || !password}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-60"
              data-testid="button-admin-unlock"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Unlock
            </button>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="All time" value={stats.allTime} />
              <StatCard label="Last 24 hours" value={stats.last24h} />
              <StatCard label="Last month" value={stats.lastMonth} />
              <StatCard label="Last year" value={stats.lastYear} />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <VisitChart title="Last 24 hours (by hour)" data={stats.series24h} />
              <VisitChart title="Last month (by day)" data={stats.seriesMonth} />
              <VisitChart title="Last year (by month)" data={stats.seriesYear} />
              <VisitChart title="All time (by month)" data={stats.seriesAllTime} />
            </div>

            <div className="border border-border rounded-lg bg-card">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <div className="font-serif text-lg">Visits (by Gmail)</div>
                <div className="text-sm text-muted-foreground">
                  {stats.visitors.length} logins
                </div>
              </div>
              {stats.visitors.length === 0 ? (
                <div className="p-5 text-sm text-muted-foreground" data-testid="text-no-visitors">
                  No visits recorded yet. Visits are recorded when someone signs in
                  on the published site.
                </div>
              ) : (
                <div className="divide-y divide-border max-h-[28rem] overflow-y-auto">
                  {stats.visitors.map((v, i) => (
                    <div
                      key={i}
                      className="px-5 py-3 flex items-center justify-between gap-4"
                      data-testid={`row-visitor-${i}`}
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{v.email}</div>
                        {v.name && (
                          <div className="text-xs text-muted-foreground truncate">
                            {v.name}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground tabular-nums shrink-0">
                        {new Date(v.occurredAt).toLocaleString()}
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

import { useQuery } from "@tanstack/react-query";
import { Download, FileText } from "lucide-react";

interface Topic {
  id: number;
  title: string;
}

// Strip any meta-markers ("Unit 3:", "Week 2 —") so the list reads as plain
// topic titles only.
function plainTitle(title: string): string {
  return title.replace(/^\s*(unit|week|module|lesson)\s*\d+\s*[:.\-–—]?\s*/i, "").trim();
}

export function TopicsRail({ className = "" }: { className?: string }) {
  const { data: topics } = useQuery<Topic[]>({
    queryKey: ["course", "topics", "rail"],
    queryFn: async () => {
      const res = await fetch("/api/course/topics", { credentials: "include" });
      if (!res.ok) throw new Error("failed to load topics");
      return res.json();
    },
    staleTime: 5 * 60_000,
  });

  return (
    <aside className={`w-full max-w-[15rem] text-left ${className}`} data-testid="topics-rail">
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        Topics Covered in This Course
      </h2>
      <ul className="space-y-1">
        {(topics ?? []).map((t) => (
          <li
            key={t.id}
            className="text-xs leading-snug text-muted-foreground"
            data-testid={`topic-item-${t.id}`}
          >
            {plainTitle(t.title)}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col items-start gap-1.5">
        <a
          href="/api/course/download?format=pdf"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          data-testid="button-download-pdf"
        >
          <Download className="w-3.5 h-3.5" />
          Download Course (PDF)
        </a>
        <a
          href="/api/course/download?format=txt"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
          data-testid="button-download-txt"
        >
          <FileText className="w-3 h-3" />
          or download as plain text
        </a>
        <p className="text-[10px] text-muted-foreground/80 leading-snug mt-1">
          The full short-version lectures plus sample homework and exam problems.
        </p>
      </div>
    </aside>
  );
}

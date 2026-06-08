import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  inverted?: boolean;
}

function normalize(src: string): string {
  return src.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}

export function MarkdownRenderer({ content, inverted = false }: MarkdownRendererProps) {
  const normalized = normalize(content ?? "");
  const base =
    "prose max-w-none prose-headings:font-serif prose-p:leading-relaxed prose-a:text-primary prose-pre:bg-slate-50 prose-code:before:content-none prose-code:after:content-none";
  const theme = inverted
    ? "prose-invert text-inherit prose-headings:text-inherit prose-strong:text-inherit prose-code:text-inherit prose-a:text-inherit"
    : "prose-slate dark:prose-invert";
  return (
    <div className={`${base} ${theme}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{normalized}</ReactMarkdown>
    </div>
  );
}

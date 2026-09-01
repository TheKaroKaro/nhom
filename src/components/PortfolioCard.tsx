import type { PortfolioEntry } from "../content/collections";

export function PortfolioCard({
  entry,
  index,
}: {
  entry: PortfolioEntry;
  index: number;
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_32px_-12px_rgba(24,24,27,0.18)] sm:p-7">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute right-5 top-4 text-4xl font-extrabold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-zinc-200"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex flex-wrap items-center gap-2 pr-12">
        <span className="rounded-full border border-zinc-200 bg-paper px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {entry.clientCategory}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
          {entry.year}
        </span>
      </div>

      <h3 className="font-display mt-4 text-xl font-bold leading-snug tracking-tight text-ink">
        {entry.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{entry.summary}</p>

      <ul className="mt-5 space-y-2.5 border-t border-dashed border-zinc-200 pt-5">
        {entry.impactMetrics.map((metric) => (
          <li key={metric} className="flex items-start gap-2.5 text-sm font-medium text-ink-soft">
            <span
              className="animate-pulse-dot mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-600"
              aria-hidden
            />
            <span>{metric}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-zinc-200 bg-paper px-2 py-1 text-xs font-medium text-zinc-500 transition-colors duration-200 group-hover:border-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

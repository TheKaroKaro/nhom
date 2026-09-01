import { useState } from "react";
import {
  portfolio,
  portfolioCategories,
  siteStats,
} from "../content/collections";
import { PortfolioCard } from "../components/PortfolioCard";
import { Reveal } from "../components/motion";
import { ArrowRight } from "../components/Icons";

export function Portfolio() {
  const [filter, setFilter] = useState<string>("All Stories");
  const visible =
    filter === "All Stories"
      ? portfolio
      : portfolio.filter((p) => p.clientCategory === filter);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-4 pt-14 md:pt-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
          Our Work
        </p>
        <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Success Stories
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Real results from real businesses. See how we've helped companies
          automate, save time, and scale — every number below was measured
          after go-live.
        </p>
      </Reveal>

      {/* Stats band */}
      <Reveal delay={100}>
        <div
          aria-label="Engagement stats"
          className="mt-8 grid grid-cols-2 divide-zinc-200 rounded-xl border border-zinc-200 bg-white sm:grid-cols-4 sm:divide-x"
        >
          {siteStats.map(([value, label]) => (
            <div key={label} className="px-5 py-5 text-center">
              <p className="font-display tnum text-2xl font-extrabold tracking-tight text-ink">
                {value}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Category filters */}
      <Reveal delay={160}>
        <div
          className="mt-9 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-5"
          role="tablist"
          aria-label="Filter success stories by category"
        >
          {portfolioCategories.map((cat) => {
            const active = filter === cat;
            const count =
              cat === "All Stories"
                ? portfolio.length
                : portfolio.filter((p) => p.clientCategory === cat).length;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-zinc-900 text-paper shadow-sm"
                    : "border border-zinc-200 bg-white text-muted hover:-translate-y-0.5 hover:border-zinc-300 hover:text-ink"
                }`}
              >
                {cat}
                <span
                  className={`tnum ml-1.5 text-xs font-bold ${active ? "text-zinc-400" : "text-zinc-300"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Grid — keyed so reveals replay on filter change */}
      <div key={filter} className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((entry, i) => (
          <Reveal key={entry.slug} delay={(i % 2) * 90}>
            <PortfolioCard
              entry={entry}
              index={portfolio.findIndex((p) => p.slug === entry.slug)}
            />
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal>
        <div className="relative mt-14 overflow-hidden rounded-xl bg-zinc-900 px-7 py-12 text-center sm:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div className="bg-blueprint h-full w-full" />
          </div>
          <div className="relative">
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Write Your Success Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
              Let's discuss how we can help you automate manual work, reduce
              errors, and save time.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-lg"
              >
                Schedule Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#/products"
                className="inline-flex items-center rounded-xl border border-zinc-700 px-5 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white"
              >
                Explore Templates & Apps
              </a>
            </div>
            <p className="mt-5 text-xs text-zinc-500">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

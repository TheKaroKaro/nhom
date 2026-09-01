import { useState } from "react";
import {
  productCategories,
  products,
  type ProductCategory,
} from "../content/collections";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/motion";
import { ArrowUpRight, CoffeeCup } from "../components/Icons";

type Filter = "All" | ProductCategory;

export function Products() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  const countFor = (f: Filter) =>
    f === "All" ? products.length : products.filter((p) => p.category === f).length;

  return (
    <div className="mx-auto max-w-5xl px-5 pb-4 pt-14 md:pt-20">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
          Templates & Apps
        </p>
        <h1 className="font-display mt-2 max-w-2xl text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Every template started life inside a live operation.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Nothing here is a mock-up. The eLeave system ran 150+ agents, the QA
          form lifted coaching coverage 166%, and the commission RPA erased
          36.5 hours of monthly copy-paste. Buy once via Buy Me a Coffee,
          install it the same afternoon, and keep every lifetime update.
        </p>
      </Reveal>

      {/* Filter bar */}
      <Reveal delay={120}>
        <div
          className="mt-9 flex flex-wrap items-center gap-2 border-b border-zinc-200 pb-5"
          role="tablist"
          aria-label="Filter templates by category"
        >
          {productCategories.map((cat) => {
            const active = filter === cat;
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
                  {countFor(cat)}
                </span>
              </button>
            );
          })}

          <a
            href="https://www.buymeacoffee.com/nhom"
            target="_blank"
            rel="noreferrer"
            className="group ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            <CoffeeCup className="h-4 w-4" />
            <span className="link-slide">buymeacoffee.com/nhom</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>

      {/* Grid — keyed by filter so reveals replay on change */}
      <div key={filter} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 3) * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-dashed border-zinc-300 bg-white/70 px-6 py-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-ink">
              Need one of these wired to *your* stack?
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
              Every template ships with a setup guide — or book a deployment
              call and we'll install it against your SharePoint list, Dataverse
              table, or workbook with you on the line.
            </p>
          </div>
          <a
            href="#/contact"
            className="shrink-0 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md"
          >
            Book a deployment call
          </a>
        </div>
      </Reveal>
    </div>
  );
}

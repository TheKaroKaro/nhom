import type { Product } from "../content/collections";
import { formatPrice } from "../content/collections";
import { ArrowUpRight, CategoryGlyph, Check, CoffeeCup } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_12px_32px_-12px_rgba(24,24,27,0.18)]">
      {/* Top strip: category + badge */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 px-6 py-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          <CategoryGlyph category={product.category} className="h-4 w-4" />
          {product.category}
        </span>
        {product.badge ? (
          <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-paper">
            {product.badge}
          </span>
        ) : (
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-300">
            Template
          </span>
        )}
      </div>

      <div className="flex grow flex-col px-6 pb-6 pt-5">
        <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-zinc-800">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>

        <ul className="mt-5 space-y-2.5">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 ring-1 ring-green-200/70">
                <Check className="h-2.5 w-2.5" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div>
            <p className="font-display tnum text-2xl font-bold tracking-tight text-ink">
              {formatPrice(product.price)}
            </p>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
              one-time · lifetime updates
            </p>
          </div>
          <a
            href={product.bmacUrl}
            target="_blank"
            rel="noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md active:translate-y-0"
          >
            <CoffeeCup className="h-4 w-4 transition-transform duration-300 group-hover/btn:-rotate-6" />
            Buy via Coffee
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

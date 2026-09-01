import type { ReactNode } from "react";
import { useInView, usePrefersReducedMotion } from "../lib/hooks";

/**
 * Scroll reveal wrapper — fades/slides content in once, and renders
 * immediately for prefers-reduced-motion users (CSS also neutralises it).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = reduced || inView;

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={shown && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Infinite service ticker; content is rendered twice for a seamless loop. */
export function Marquee({ items }: { items: string[] }) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="font-display px-5 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {item}
          </span>
          <svg viewBox="0 0 8 8" className="h-1.5 w-1.5 text-zinc-900" aria-hidden>
            <rect width="8" height="8" rx="1" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-zinc-200 bg-white/70 py-4">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}

/** Line-mask reveal for display headlines. */
export function MaskLines({
  lines,
  className = "",
  step = 90,
}: {
  lines: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span style={{ ["--d" as string]: `${i * step}ms` }}>{line}</span>
        </span>
      ))}
    </span>
  );
}

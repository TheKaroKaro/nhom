import type { Route } from "../lib/hooks";
import { ArrowUpRight, LogoMark } from "./Icons";

const NAV: Array<{ label: string; to: Route }> = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Templates & Apps", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export function Header({ route }: { route: Route }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <a
          href="#/"
          className="group flex items-center gap-2.5"
          aria-label="nhom.me — home"
        >
          <LogoMark className="h-7 w-7 text-zinc-900 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            nhom<span className="text-zinc-400">.</span>me
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className={`link-slide text-sm font-medium transition-colors ${
                route === item.to ? "is-active text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://cc.nhom.me"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md"
        >
          Free CC Tools
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Mobile nav row */}
      <nav
        className="flex items-center gap-5 overflow-x-auto border-t border-zinc-200/70 px-5 py-2 md:hidden"
        aria-label="Primary mobile"
      >
        {NAV.map((item) => (
          <a
            key={item.to}
            href={`#${item.to}`}
            className={`whitespace-nowrap text-[13px] font-medium ${
              route === item.to ? "text-ink underline decoration-zinc-900 decoration-2 underline-offset-4" : "text-muted"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

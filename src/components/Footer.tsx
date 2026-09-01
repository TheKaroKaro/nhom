import type { Route } from "../lib/hooks";
import { ArrowUpRight, Envelope, LogoMark } from "./Icons";

const NAV: Array<{ label: string; to: Route }> = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Templates & Apps", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-200 bg-white/60">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <a href="#/" className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7 text-zinc-900" />
              <span className="font-display text-lg font-bold tracking-tight text-ink">
                nhom<span className="text-zinc-400">.</span>me
              </span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Transform. Automate. Digitize. We eliminate manual and repetitive
              work through intelligent automation, customer service
              outsourcing, and ready-to-deploy templates. Est. 2024.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Site
              </p>
              <ul className="mt-3 space-y-2">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <a
                      href={`#${item.to}`}
                      className="link-slide text-sm text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Elsewhere
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://cc.nhom.me"
                    target="_blank"
                    rel="noreferrer"
                    className="link-slide inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    Free CC Tools
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.buymeacoffee.com/nhom"
                    target="_blank"
                    rel="noreferrer"
                    className="link-slide inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    Buy Me a Coffee
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@nhom.me"
                    className="link-slide inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Envelope className="h-3.5 w-3.5" />
                    hello@nhom.me
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Status
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-600" />
                Now in UAT: Zalo triage chatbot
              </p>
              <p className="mt-2 text-sm text-zinc-400">Replies within 24 hours.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} nhom.me — operations, automated.
          </p>
          <p className="text-xs text-zinc-400">
            Templates shipped fresh, fueled by{" "}
            <a
              href="https://www.buymeacoffee.com/nhom"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-500 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-ink"
            >
              coffee
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

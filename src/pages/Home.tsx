import { useEffect, useState } from "react";
import {
  portfolio,
  products,
  siteStats,
} from "../content/collections";
import { ProductCard } from "../components/ProductCard";
import { PortfolioCard } from "../components/PortfolioCard";
import { MaskLines, Marquee, Reveal } from "../components/motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CoffeeCup,
} from "../components/Icons";
import { usePrefersReducedMotion } from "../lib/hooks";

const featuredProducts = products.filter((p) => p.featured);
const featuredCaseStudies = portfolio.filter((p) => p.featured);

const scrollToServices = () =>
  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

/* ---------- hero: live build visual of the flagship RPA ---------- */

const pipelineSteps = [
  { title: "Sales email arrives", meta: "Finance inbox · any format" },
  { title: "RPA reads & extracts", meta: "Pattern detection · line items" },
  { title: "Mapped to Excel", meta: "Structured sheets · 100% accuracy" },
  { title: "Commission sheet updates", meta: "Real-time · zero copy-paste" },
];

const pipelineMetrics: Array<[string, string]> = [
  ["36.5h → 0h", "per month"],
  ["100%", "accuracy"],
  ["Real-time", "processing"],
];

function PipelineViz() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % pipelineSteps.length),
      1700,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="animate-float-slow relative rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.25)]">
      <div className="flex items-center justify-between border-b border-dashed border-zinc-200 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Live build — Commission RPA
        </p>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-green-700">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-green-600" />
          running since 2026
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {pipelineSteps.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={s.title}
              className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 transition-all duration-500 ${
                active
                  ? "border-zinc-900 bg-zinc-900 text-paper shadow-md"
                  : done
                    ? "border-zinc-200 bg-paper"
                    : "border-zinc-200 bg-white"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold tnum ${
                  active
                    ? "border-paper/40 bg-paper/10 text-paper"
                    : done
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-zinc-300 text-zinc-400"
                }`}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold leading-tight ${
                    active ? "text-paper" : "text-ink"
                  }`}
                >
                  {s.title}
                </p>
                <p
                  className={`truncate text-[11px] ${
                    active ? "text-zinc-400" : "text-zinc-400"
                  }`}
                >
                  {s.meta}
                </p>
              </div>
              {active && !reduced && (
                <span className="ml-auto flex gap-1" aria-hidden>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/70 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/70 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-paper/70" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-dashed border-zinc-200 pt-4">
        {pipelineMetrics.map(([value, label]) => (
          <div key={label}>
            <p className="font-display tnum text-sm font-extrabold tracking-tight text-ink">
              {value}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- services: three real partnership pillars ---------- */

const services = [
  {
    no: "01",
    chip: "Core Service",
    title: "Automation & Digitization",
    desc: "Transform manual, repetitive tasks into streamlined automated workflows. We build solutions that save time, eliminate errors, and free your team to focus on high-value work.",
    items: [
      "Power Platform (Apps, Automate, BI)",
      "Custom RPA & workflow automation",
      "Business intelligence dashboards",
    ],
    stats: [
      ["70–90%", "Time savings"],
      ["100%", "Error reduction"],
      ["3–6 mo", "ROI timeline"],
    ] as Array<[string, string]>,
    cta: { label: "See it in the portfolio", href: "#/portfolio" },
  },
  {
    no: "02",
    chip: "BPO Services",
    title: "Customer Service Outsourcing",
    desc: "Scale your customer support with our trained, tech-enabled teams. We combine human expertise with automation tools to deliver exceptional experiences while controlling costs.",
    items: [
      "24/7 multi-channel support",
      "AI-enhanced agent tools",
      "Real-time performance dashboards",
    ],
    stats: [
      ["24/7", "Coverage"],
      ["40%", "Cost reduction"],
      ["2 days", "Team ramp-up"],
    ] as Array<[string, string]>,
    cta: { label: "Book a consultation", href: "#/contact" },
  },
  {
    no: "03",
    chip: "Coming Q2 2027",
    title: "Bread & Letters Academy",
    desc: "Bridge the gap between education and employment. We're building practical training programs that make new hires job-ready from day one.",
    items: [
      "Customer service excellence",
      "Power Platform fundamentals",
      "Workplace readiness programs",
    ],
    stats: [] as Array<[string, string]>,
    cta: { label: "Get notified", href: "#/contact" },
  },
];

/* ---------- why companies choose us ---------- */

const whyUs = [
  {
    title: "Speed to Value",
    desc: "We deliver working solutions in weeks, not months. Quick wins that build momentum.",
  },
  {
    title: "Operations-Grade Solutions",
    desc: "Built by practitioners who've run contact centers. We understand real operational challenges.",
  },
  {
    title: "End-to-End Partnership",
    desc: "From discovery to deployment and training — we're with you every step of the way.",
  },
];

const marqueeItems = [
  "Automation & Digitization",
  "Power Platform",
  "RPA Bots",
  "BI Dashboards",
  "Customer Service Outsourcing",
  "24/7 Support",
  "Process Audits",
  "Academy — Coming Q2 2027",
];

export function Home() {
  return (
    <>
    <div className="mx-auto max-w-5xl px-5">
      {/* ============ HERO ============ */}
      <section className="grid items-center gap-12 pb-16 pt-14 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-7">
          <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-600" />
            nhom.me · Est. 2024 — workflow automation studio
          </p>

          <h1 className="font-display mt-5 text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.25rem]">
            <MaskLines
              lines={[
                <>Transform.</>,
                <em className="font-medium italic text-zinc-400">Automate.</em>,
                <>Digitize.</>,
              ]}
            />
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            We help companies <strong className="font-semibold text-ink">scale efficiently</strong>{" "}
            by eliminating manual and repetitive tasks through intelligent
            automation, digital transformation, and customer service
            outsourcing.
          </p>
          <p className="mt-2 text-base font-medium text-ink-soft">
            Focus on your core business — let us handle the rest.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              onClick={scrollToServices}
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400"
            >
              Explore Our Services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CoffeeCup className="h-3.5 w-3.5" />
              Templates buy once via Buy Me a Coffee
            </span>
            <span>Typical response time: within 24 hours</span>
          </p>
        </div>

        <div className="md:col-span-5">
          <Reveal delay={150}>
            <PipelineViz />
          </Reveal>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <Reveal>
        <section
          aria-label="Studio stats"
          className="grid grid-cols-2 divide-zinc-200 rounded-xl border border-zinc-200 bg-white sm:grid-cols-4 sm:divide-x"
        >
          {siteStats.map(([value, label]) => (
            <div key={label} className="px-6 py-6 text-center">
              <p className="font-display tnum text-3xl font-extrabold tracking-tight text-ink">
                {value}
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {label}
              </p>
            </div>
          ))}
        </section>
      </Reveal>
    </div>

      {/* ============ SERVICES MARQUEE ============ */}
      <div className="mt-16">
        <Marquee items={marqueeItems} />
      </div>

      <div className="mx-auto max-w-5xl px-5">
        {/* ============ SERVICES ============ */}
        <section id="services" className="scroll-mt-24 pt-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
              Our Services
            </p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Three ways we partner with you to eliminate manual work and
              scale efficiently.
            </h2>
          </Reveal>

          <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200">
            {services.map((service, i) => (
              <Reveal key={service.no} delay={i * 90}>
                <article className="group grid gap-6 py-8 transition-colors duration-300 hover:bg-white/70 md:grid-cols-12 md:items-start md:px-4">
                  <div className="md:col-span-2">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-zinc-200 transition-colors duration-300 group-hover:text-zinc-900">
                      {service.no}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                        service.chip === "Coming Q2 2027"
                          ? "border border-dashed border-zinc-300 text-zinc-500"
                          : service.chip === "BPO Services"
                            ? "bg-zinc-100 text-zinc-600"
                            : "bg-zinc-900 text-paper"
                      }`}
                    >
                      {service.chip}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.desc}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm font-medium text-ink-soft">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-green-600/10">
                            <Check className="h-2.5 w-2.5 text-green-700" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-4">
                    {service.stats.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3 rounded-xl border border-zinc-200 bg-white p-4">
                        {service.stats.map(([value, label]) => (
                          <div key={label}>
                            <p className="font-display tnum text-lg font-extrabold tracking-tight text-ink">
                              {value}
                            </p>
                            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-zinc-300 bg-white/60 p-4 text-sm text-muted">
                        Cohort-based training for new hires — practical skills
                        for modern, tech-enabled workplaces.
                      </div>
                    )}
                    <a
                      href={service.cta.href}
                      className="link-slide group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
                    >
                      {service.cta.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ FEATURED SUCCESS STORY ============ */}
        <section className="pt-20">
          <div className="grid items-center gap-10 rounded-xl border border-zinc-200 bg-white p-7 sm:p-10 md:grid-cols-2">
            <Reveal>
              <span className="inline-block rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
                Success Story
              </span>
              <h2 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Sales Email Extraction — Commission Calculation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                A finance team was spending{" "}
                <strong className="font-semibold text-ink">36.5 hours monthly</strong>{" "}
                manually copying sales data from emails into Excel. We built an
                intelligent RPA that automatically detects and maps email
                contents — processing every email as it arrives.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["RPA", "Excel", "Power Automate"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-200 bg-paper px-2 py-1 text-xs font-medium text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#/portfolio"
                className="link-slide group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                View More Success Stories
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl border border-zinc-200 bg-paper p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Monthly manual hours
                </p>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-zinc-500">
                      Before automation
                    </p>
                    <p className="font-display tnum text-2xl font-extrabold tracking-tight text-ink">
                      36.5 hrs
                    </p>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-zinc-200">
                    <div className="h-full w-full rounded-full bg-zinc-400" />
                  </div>
                </div>
                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-semibold text-green-700">
                      After automation
                    </p>
                    <p className="font-display tnum text-2xl font-extrabold tracking-tight text-green-700">
                      0 hrs
                    </p>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-zinc-200">
                    <div className="h-full w-[2%] min-w-[4px] rounded-full bg-green-600" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-dashed border-zinc-300 pt-5">
                  <div>
                    <p className="font-display tnum text-lg font-extrabold text-ink">100%</p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
                      Error elimination
                    </p>
                  </div>
                  <div>
                    <p className="font-display tnum text-lg font-extrabold text-ink">Real-time</p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-400">
                      Processing speed
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ FEATURED TEMPLATES ============ */}
        <section className="pt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
                  Templates & Apps
                </p>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Real client builds, productised.
                </h2>
              </div>
              <a
                href="#/products"
                className="link-slide group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                Browse all templates
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Every template below shipped inside a live operation first —
              eLeave for 150+ agents, the QA form behind a 166% coverage lift,
              the case CRM that gave teams 100% visibility.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <Reveal key={product.slug} delay={i * 90}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ WHY US ============ */}
        <section className="pt-20">
          <Reveal>
            <h2 className="font-display max-w-xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Why companies choose nhom.me
            </h2>
          </Reveal>
          <div className="mt-8 space-y-0 border-t border-zinc-200">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group grid gap-3 border-b border-zinc-200 py-6 transition-colors duration-300 hover:bg-white/70 sm:grid-cols-12 sm:items-baseline sm:px-4">
                  <p className="font-display tnum text-sm font-extrabold text-zinc-300 transition-colors duration-300 group-hover:text-green-700 sm:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink sm:col-span-4">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted sm:col-span-6">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ RECENT CASE STUDIES ============ */}
        <section className="pt-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
                  Success Stories
                </p>
                <h2 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Real results, real impact.
                </h2>
              </div>
              <a
                href="#/portfolio"
                className="link-slide group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
              >
                View all success stories
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Real results from real businesses — the hours found, the errors
              removed, and the numbers measured after go-live.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredCaseStudies.map((entry, i) => (
              <Reveal key={entry.slug} delay={i * 90}>
                <PortfolioCard
                  entry={entry}
                  index={portfolio.findIndex((p) => p.slug === entry.slug)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ CTA BAND ============ */}
        <section className="pb-4 pt-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl bg-zinc-900 px-7 py-12 text-center sm:px-12 sm:py-16">
              <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
                <div className="bg-blueprint h-full w-full" />
              </div>
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-500">
                  Free consultation · reply within 24 hours
                </p>
                <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to Transform Your Operations?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                  Let's discuss how we can help you automate manual work, scale
                  your customer service, or train your team.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#/contact"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-lg"
                  >
                    Schedule a Free Consultation
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#/products"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3.5 text-sm font-semibold text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white"
                  >
                    Explore Services & Templates
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}

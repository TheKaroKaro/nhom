import { useState, type FormEvent } from "react";
import { Reveal } from "../components/motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Envelope,
  Spinner,
} from "../components/Icons";

const SERVICES = [
  "Automation & Digitization",
  "Customer Service Outsourcing (BPO)",
  "Academy — Get Notified",
  "Template purchase / support",
  "Something else",
];

type Status = "idle" | "sending" | "success" | "error";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(SERVICES[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const html = [
      "📨 <b>New inquiry — nhom.me</b>",
      "",
      `<b>Name:</b> ${escapeHtml(name)}`,
      `<b>Email:</b> ${escapeHtml(email)}`,
      `<b>Service:</b> ${escapeHtml(service)}`,
      "",
      "<b>Message:</b>",
      escapeHtml(message),
    ].join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error ?? `Server responded with status ${res.status}`,
        );
      }

      setStatus("success");
      setName("");
      setEmail("");
      setService(SERVICES[0]);
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && !err.message.includes("fetch")
          ? err.message
          : "Could not reach Telegram. Email hello@nhom.me instead — same inbox.",
      );
    }
  };

  const field =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-zinc-400 shadow-sm transition-all duration-200 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10";

  return (
    <div className="mx-auto max-w-5xl px-5 pb-4 pt-14 md:pt-20">
      <div className="grid gap-12 md:grid-cols-12">
        {/* Left rail */}
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700">
              Contact
            </p>
            <h1 className="font-display mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Book a free consultation.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Let's discuss how we can help you automate manual work, scale
              your customer service, or train your team. A rough description
              is plenty — "we copy sales emails into Excel by hand" is a
              perfect start.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@nhom.me"
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
              >
                <Envelope className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-ink" />
                <div>
                  <p className="text-sm font-semibold text-ink">hello@nhom.me</p>
                  <p className="text-xs text-muted">Prefer plain email? Same inbox.</p>
                </div>
              </a>
              <a
                href="https://cc.nhom.me"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">Free CC Tools</p>
                  <p className="text-xs text-muted">
                    Free contact-center toolkit — no form required.
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
              </a>

              <div className="rounded-xl border border-dashed border-zinc-300 bg-paper px-4 py-3.5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <span className="animate-pulse-dot h-2 w-2 rounded-full bg-green-600" />
                  Typical response time: within 24 hours
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Consultations are free and scoped on a short call before
                  anything is quoted.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <div className="md:col-span-7">
          <Reveal delay={160}>
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-[0_16px_48px_-28px_rgba(24,24,27,0.3)] sm:p-8"
              noValidate={false}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jordan Reyes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jordan@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-service"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500"
                >
                  Service
                </label>
                <select
                  id="contact-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="What's the repetitive task eating your week? Tools involved, team size, rough volume — anything helps."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} resize-y`}
                />
              </div>

              {/* Inline status */}
              {status === "success" && (
                <div
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 ring-1 ring-green-200/70"
                >
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Message sent — it just landed in our Telegram. Expect a reply
                  within 2 business days.
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200/70"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>

              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                Delivered via the Telegram Bot API — no forms backend, no
                mailing lists. Your details go to exactly one inbox.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

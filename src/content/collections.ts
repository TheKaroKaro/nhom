import { z } from "zod";

/*
 * Content collections for nhom.me.
 *
 * In the reference Astro project these live in src/content/config.ts as two
 * collections ("products" and "portfolio") backed by markdown files such as
 * src/content/products/powerapps-helpdesk.md. This build ships as a static
 * SPA, so the same Zod-validated entries are defined here — every record is
 * parse()-checked at module load, exactly like Astro's getCollection().
 *
 * All portfolio numbers, challenges, and solutions below are real engagement
 * data — the same content published on breadandletters.com.
 */

/* ------------------------------ products ------------------------------ */

export const productSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["PowerApps", "Excel", "Power BI"]),
  price: z.number().nonnegative(),
  bmacUrl: z.string().url(),
  badge: z.string().optional(),
  features: z.array(z.string()),
  featured: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export const products: Product[] = [
  {
    slug: "eleave-attendance-system",
    title: "eLeave & Attendance System",
    description:
      "The exact Power Apps leave system we deploy inside contact centers — automated approval workflows, real-time calendars, and a manager dashboard that retired the Excel-and-WhatsApp chaos.",
    category: "PowerApps",
    price: 89,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/eleave-attendance-system",
    badge: "Bestseller",
    features: [
      "Automated approval workflows",
      "Real-time calendar integration",
      "Manager dashboard & instant notifications",
      "Mobile request submission",
      "One-click approvals",
    ],
    featured: true,
  },
  {
    slug: "quality-monitoring-form",
    title: "Quality Monitoring Form",
    description:
      "Web-based QA form that automates score calculation and produces weekly and monthly failure-point summaries per agent — the tool that lifted coaching coverage by 166%.",
    category: "Power BI",
    price: 79,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/quality-monitoring-form",
    features: [
      "Automated score calculation",
      "Weekly & monthly failure summaries",
      "Per-agent coaching flags",
      "Real-time supervisor insights",
      "Power BI trend dashboard",
    ],
    featured: true,
  },
  {
    slug: "case-management-system",
    title: "Case Management System",
    description:
      "A lightweight CRM that ends email-chain case handling: one central database, one-click assignment, automatic reminders, and complete case history for every team.",
    category: "PowerApps",
    price: 119,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/case-management-system",
    badge: "New",
    features: [
      "Central case database",
      "One-click case assignment",
      "Automatic follow-up reminders",
      "Complete case history tracking",
      "Cross-team collaboration",
    ],
    featured: true,
  },
  {
    slug: "finance-ar-master-data",
    title: "Finance AR — Master Data Consolidation",
    description:
      "The Power Query ETL pipeline that merges every AR source into a single “Golden Record” sheet — automated vendor mapping, date-based invoice numbers, one-click refresh.",
    category: "Excel",
    price: 59,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/finance-ar-master-data",
    features: [
      "Power Query ETL pipeline",
      "Automated vendor name mapping",
      "Date-based invoice generation",
      "One-click data refresh",
      "Single “Golden Record” sheet",
    ],
    featured: false,
  },
  {
    slug: "sales-email-commission-rpa",
    title: "Sales Email Extraction — Commission RPA",
    description:
      "The intelligent RPA behind our 36.5-hours-a-month win: detects email content patterns, extracts line items, and maps them into structured commission sheets in real time.",
    category: "Excel",
    price: 129,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/sales-email-commission-rpa",
    badge: "Most requested",
    features: [
      "Email content-pattern detection",
      "Line-item extraction engine",
      "Structured Excel mapping",
      "Real-time commission updates",
      "Processes emails as they arrive",
    ],
    featured: false,
  },
  {
    slug: "customer-callback-teams-bot",
    title: "Customer Callback Form — Teams Bot",
    description:
      "Wires your website contact form into Teams: every request becomes an interactive case card with automatic timestamps, automated SLA tracking, and minimal agent typing.",
    category: "PowerApps",
    price: 69,
    bmacUrl: "https://www.buymeacoffee.com/nhom/e/customer-callback-teams-bot",
    features: [
      "Website form → Teams integration",
      "Interactive case cards",
      "Automatic timestamp capture",
      "Automated SLA tracking",
      "~70% less after-call work",
    ],
    featured: false,
  },
].map((p) => productSchema.parse(p));

export const productCategories = [
  "All",
  "PowerApps",
  "Excel",
  "Power BI",
] as const;

export type ProductCategory = (typeof productCategories)[number];

/* ------------------------------ portfolio ------------------------------ */

export const portfolioSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  clientCategory: z.string(),
  impactMetrics: z.array(z.string()),
  tags: z.array(z.string()),
  featured: z.boolean(),
  year: z.number(),
});

export type PortfolioEntry = z.infer<typeof portfolioSchema>;

export const portfolio: PortfolioEntry[] = [
  {
    slug: "sales-email-extraction-commission-calculation",
    title: "Sales Email Extraction — Commission Calculation",
    clientCategory: "Finance",
    year: 2026,
    featured: true,
    summary:
      "Finance staff spent 36.5 hours monthly copying sales details from emails into Excel — every email a different format, every paste a chance to slip. We built an intelligent RPA that detects content patterns, extracts line items, and maps them into structured sheets with 100% accuracy, updating commission data in real time.",
    impactMetrics: [
      "36.5h monthly time saved",
      "100% error elimination",
      "Real-time processing speed",
    ],
    tags: ["RPA", "Excel", "Power Automate"],
  },
  {
    slug: "finance-ar-master-data-consolidation",
    title: "Finance AR — Master Data Consolidation",
    clientCategory: "Finance",
    year: 2026,
    featured: false,
    summary:
      "The AR team burned 12 hours a week merging disparate sources, mapping vendor names, and generating sequential invoice numbers with VLOOKUPs and copy-paste. We engineered a Power Query ETL pipeline that consolidates everything into a single “Golden Record” sheet with automated mapping and one-click refresh.",
    impactMetrics: [
      "12h monthly time saved",
      "100% error reduction",
      "1-click process time",
    ],
    tags: ["Power Query", "Excel", "ETL"],
  },
  {
    slug: "zalo-customer-service-triage-chatbot",
    title: "Zalo Customer Service — Automated Triage & Chatbot",
    clientCategory: "Contact Center",
    year: 2026,
    featured: false,
    summary:
      "Agents handled 900+ chats a month by hand, roughly 30% of them repetitive inquiries or spam — about 100 hours of team capacity. We shipped an AWS-hosted triage menu that self-serves common queries and filters spam before it reaches a human; currently in UAT with a projected 30% ticket deflection.",
    impactMetrics: [
      "29.25h projected monthly savings",
      "30% ticket deflection",
      "UAT phase — live demo",
    ],
    tags: ["AWS", "Chatbot", "Cloud"],
  },
  {
    slug: "eleave-attendance-system",
    title: "eLeave & Attendance System",
    clientCategory: "Contact Center",
    year: 2025,
    featured: true,
    summary:
      "Managers tracked leave across Excel and WhatsApp — 12 hours a week, constant scheduling conflicts, zero visibility into team availability. We built a Power Apps leave system with automated approval workflows, real-time calendar integration, and one-click approvals straight from the manager dashboard.",
    impactMetrics: [
      "70% faster approvals",
      "12h monthly time saved",
      "150+ agents covered",
    ],
    tags: ["Power Apps", "SharePoint", "Power Automate"],
  },
  {
    slug: "quality-monitoring-form",
    title: "Quality Monitoring Form",
    clientCategory: "Quality Assurance",
    year: 2024,
    featured: true,
    summary:
      "Supervisors scored quality from Excel checklists, spending hours pivoting data and still missing coaching opportunities. We created a web-based QA form that automates score calculation and generates weekly and monthly failure-point summaries per agent, flagging coaching moments in real time.",
    impactMetrics: [
      "117 monthly coaching sessions (↑73)",
      "24h feedback delivery",
      "166% coverage increase",
    ],
    tags: ["Power Apps", "Power BI", "SharePoint"],
  },
  {
    slug: "case-management-system",
    title: "Case Management System",
    clientCategory: "Contact Center",
    year: 2024,
    featured: false,
    summary:
      "Non-claim cases lived in Excel and bounced between teams over email — long trails, missed follow-ups, no single source of truth. We built a web-based CRM with one-click assignment, automatic reminders, and complete case history, so teams collaborate inside the system instead of in threads.",
    impactMetrics: [
      "6.23h monthly time saved",
      "23% AHT improvement",
      "100% case visibility",
    ],
    tags: ["Power Apps", "Dataverse", "Power Automate"],
  },
  {
    slug: "detector-chatbots-teams-integration",
    title: "Detector Chatbots — Teams Integration",
    clientCategory: "Contact Center",
    year: 2025,
    featured: false,
    summary:
      "NPS was suffering because sensitive interactions lost their context on the way from Level 1 to Level 2. We integrated a Teams bot into the CRM so L1 agents flag sensitive cases with one click — L2 is notified instantly with full customer context and arrives prepared.",
    impactMetrics: [
      "68 → 84 pts NPS improvement",
      "Proactive escalation handling",
      "100% customer context preserved",
    ],
    tags: ["Microsoft Teams", "CRM", "Chatbot"],
  },
  {
    slug: "customer-callback-form-automation",
    title: "Customer Callback Form Automation",
    clientCategory: "Contact Center",
    year: 2025,
    featured: false,
    summary:
      "Callback requests synced to a shared Excel file — sync issues, mismatched data, and SLAs computed by hand. We wired the client's website form into Teams: each request becomes an interactive case card with automatic timestamps, cutting after-call work and automating SLA tracking.",
    impactMetrics: [
      "23.4h monthly time saved",
      "70% less after-call work",
      "Automated SLA tracking",
    ],
    tags: ["Microsoft Teams", "Web Forms", "Power Automate"],
  },
].map((p) => portfolioSchema.parse(p));

export const portfolioCategories = [
  "All Stories",
  ...Array.from(new Set(portfolio.map((p) => p.clientCategory))),
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

/* ------------------------------ site stats ------------------------------ */

export const siteStats: Array<[string, string]> = [
  ["50+", "Processes automated"],
  ["1,200+", "Hours saved monthly"],
  ["100%", "Error reduction"],
  ["10+", "Enterprise clients"],
];

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

/** Logo mark: rounded node tile with an "N" routing path. */
export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden {...props}>
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M10 22V10l12 12V10"
        stroke="#faf9f6"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base({ strokeWidth: 2.2, ...props })}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function CoffeeCup(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 9h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h1.6a2.4 2.4 0 0 1 0 4.8H16" />
      <path d="M8.2 3.6c-.7.9-.7 1.6 0 2.4M11.8 3.6c-.7.9-.7 1.6 0 2.4" />
    </svg>
  );
}

/** Workflow glyph: three nodes joined by a routing path. */
export function FlowNodes(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="5.5" cy="6" r="2.3" />
      <circle cx="18.5" cy="6" r="2.3" />
      <circle cx="12" cy="18" r="2.3" />
      <path d="M7.8 6h8.4M6.6 8.1 10.9 16M17.4 8.1 13.1 16" />
    </svg>
  );
}

/** Spreadsheet glyph: sheet with grid and a filled total cell. */
export function GridSheet(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M4 9h16M4 14.5h16M10.5 9v11.5" />
      <rect x="11.6" y="15.6" width="7.3" height="3.8" rx="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Gauge glyph: dial with needle — dashboards & BI. */
export function GaugeDial(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.2 17.5a9 9 0 1 1 15.6 0" />
      <path d="m12 14 4-5.2" />
      <circle cx="12" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Envelope(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  );
}

export function Spinner(props: IconProps) {
  return (
    <svg {...base(props)} className={`animate-spin ${props.className ?? ""}`}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function AlertTriangle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4 2.8 19.5h18.4L12 4Z" />
      <path d="M12 10v4.2M12 16.8v.2" />
    </svg>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.2 12.3 2.6 2.6 5-5.4" />
    </svg>
  );
}

/** Category glyph resolver for the storefront. */
export function CategoryGlyph({
  category,
  className,
}: {
  category: "PowerApps" | "Excel" | "Power BI";
  className?: string;
}) {
  if (category === "Excel") return <GridSheet className={className} />;
  if (category === "Power BI") return <GaugeDial className={className} />;
  return <FlowNodes className={className} />;
}

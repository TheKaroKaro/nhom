import { useCallback, useEffect, useState } from "react";

export type Route = "/" | "/portfolio" | "/products" | "/contact";

const normalize = (hash: string): Route => {
  const clean = hash.replace(/^#/, "");
  if (clean.startsWith("/portfolio")) return "/portfolio";
  if (clean.startsWith("/products")) return "/products";
  if (clean.startsWith("/contact")) return "/contact";
  return "/";
};

/** Minimal hash router: #/, #/portfolio, #/products, #/contact */
export function useRoute(): { route: Route; navigate: (to: Route) => void } {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "/" : normalize(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(normalize(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to: Route) => {
    window.location.hash = to;
  }, []);

  return { route, navigate };
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** One-shot IntersectionObserver flag for scroll reveals. */
export function useInView<T extends HTMLElement>(threshold = 0.12) {
  const [ref, setRef] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return { ref: setRef, inView };
}

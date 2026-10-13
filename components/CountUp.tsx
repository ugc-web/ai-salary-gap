"use client";
import { useEffect, useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 1 });

/** Counts from `from` to `to` once on mount (or when `to` changes). Renders the final value on the server. */
export function CountUp({ from = 0, to, ms = 1100 }: { from?: number; to: number; ms?: number }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      setN(Math.round((from + (to - from) * e) * 10) / 10);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, ms]);
  return <span className="num">{fmt(n)}</span>;
}

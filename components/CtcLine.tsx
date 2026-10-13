"use client";
import { useEffect, useState } from "react";
import { CTC_KEY } from "@/lib/validate";

/** Reads the optional CTC from sessionStorage (never from the URL) and positions it against the range. */
export function CtcLine({ min, max, scaleMax }: { min: number; max: number; scaleMax: number }) {
  const [ctc, setCtc] = useState<number | null>(null);
  useEffect(() => {
    try {
      const v = sessionStorage.getItem(CTC_KEY);
      const n = v ? Number(v) : NaN;
      if (Number.isFinite(n) && n >= 0) setCtc(n);
    } catch { /* ignore */ }
  }, []);
  if (ctc === null) return null;

  const r1 = (n: number) => Math.round(n * 10) / 10;
  const text =
    ctc < min ? `₹${ctc} L is ₹${r1(min - ctc)} L below the bottom of this range.`
    : ctc > max ? `₹${ctc} L is ₹${r1(ctc - max)} L above the top of this range.`
    : `₹${ctc} L falls within this range.`;
  const pos = Math.min(100, (ctc / scaleMax) * 100);

  return (
    <div className="mt-2">
      <div className="relative h-7" aria-hidden>
        <div className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${pos}%` }}>
          <span className="h-0 w-0 border-x-[7px] border-b-[10px] border-x-transparent border-b-ink" />
          <span className="border-2 border-ink bg-pink px-1.5 font-display text-[10px] uppercase">You</span>
        </div>
      </div>
      <p className="mt-2 text-[14px] font-bold">📍 {text}</p>
      <p className="mt-1 text-[12px] font-medium text-ink-mute">Your CTC stays in this browser tab only. CTC may include components the source excludes.</p>
    </div>
  );
}

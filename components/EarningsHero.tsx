"use client";
import { useEffect, useState } from "react";
import { CTC_KEY } from "@/lib/validate";
import { project } from "@/lib/projection";
import { CtcPrompt } from "./CtcPrompt";
import { HeroFigures } from "./HeroFigures";

interface Range { min: number; max: number }
const RAIN = [6, 18, 31, 47, 62, 76, 89];

export function EarningsHero({ roleLabel, meta, market, ai, nationalPct, alreadyAi }: {
  roleLabel: string; meta: string; market: Range | null; ai: Range | null; nationalPct: number; alreadyAi: boolean;
}) {
  const [ctc, setCtc] = useState<number | null>(null);
  useEffect(() => {
    try {
      const n = Number(sessionStorage.getItem(CTC_KEY) ?? NaN);
      if (Number.isFinite(n) && n > 0) setCtc(n);
    } catch { /* unavailable */ }
  }, []);
  function save(n: number) {
    try { sessionStorage.setItem(CTC_KEY, String(n)); } catch { /* unavailable */ }
    setCtc(n);
  }

  const p = project({ ctc, market, ai, nationalPct, alreadyAi });
  const win = !!p && p.method !== "already-ai" && !p.alreadyAbove;

  return (
    <section className="relative pb-14 pt-6" aria-labelledby="hero-h">
      {win && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
          {RAIN.map((l, i) => (
            <span key={l} className="money-drop absolute top-0 text-[26px]" style={{ left: `${l}%`, animationDelay: `${i * 140}ms` }}>💸</span>
          ))}
        </div>
      )}

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="eyebrow">Your result</span>
        <span className="sticker rotate-[2deg] bg-card text-[11px]">{meta}</span>
      </div>
      <h1 id="hero-h" className="relative mt-5 break-words font-display text-[40px] uppercase leading-[0.92] tracking-tight sm:text-[64px]">{roleLabel}</h1>

      {!p ? (
        <div className="relative mt-8 border-3 border-ink bg-sun p-6 shadow-brut-lg sm:p-8">
          <p className="text-[44px] leading-none" aria-hidden>🔍</p>
          <p className="mt-3 font-display text-[28px] uppercase leading-tight sm:text-[36px]">No verified salary data for this role yet</p>
          <p className="mt-3 max-w-xl text-[16px] font-medium">We won&apos;t make up a number. Nationally, AI/ML roles pay a {nationalPct}% higher median (Naukri, 2025). Your AI skills plan is below.</p>
        </div>
      ) : (
        <>
          <HeroFigures p={p} nationalPct={nationalPct} alreadyAi={alreadyAi} />
          {ctc === null && <CtcPrompt onSave={save} />}
        </>
      )}
    </section>
  );
}

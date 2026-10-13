"use client";
import type { Projection } from "@/lib/projection";
import { YEARS } from "@/lib/compare";
import { CountUp } from "./CountUp";

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

/** Today → with-AI comparison, plus the uplift stickers. Purely presentational. */
export function HeroFigures({ p, nationalPct, alreadyAi }: { p: Projection; nationalPct: number; alreadyAi: boolean }) {
  const win = p.method !== "already-ai" && !p.alreadyAbove;
  const aiNote = p.method === "like-for-like" ? "AI sub-industry, same report and experience bracket"
    : p.method === "national" ? `Illustration: national +${nationalPct}% median AI premium, not specific to your role`
    : "Your role is already in the AI segment";

  return (
    <>
      <div className="relative mt-8 flex flex-col sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 border-3 border-ink bg-card p-5 shadow-brut sm:p-7">
          <p className="font-display text-[12px] uppercase tracking-[0.12em] text-ink-mute">{p.basis === "ctc" ? "😐 You earn today" : "😐 Typical pay today"}</p>
          <p className="num mt-2 font-display text-[44px] leading-none tracking-tightest text-ink-mute sm:text-[60px]">₹{fmt(p.today)}<span className="text-[0.5em]"> L</span></p>
          <p className="mt-2 text-[13px] font-bold text-ink-mute">{p.basis === "ctc" ? "Your CTC" : "Middle of the published range"}</p>
        </div>
        <div aria-hidden className="z-10 -my-4 grid place-items-center self-center sm:-mx-4 sm:my-0">
          <span className="grid h-14 w-14 rotate-90 place-items-center rounded-full border-3 border-ink bg-sun font-display text-[28px] shadow-brut-sm sm:rotate-0">→</span>
        </div>
        <div className={`min-w-0 flex-[1.35] border-3 border-ink p-5 shadow-brut-lg sm:p-7 ${win ? "bg-accent" : "bg-sky"}`}>
          <p className="font-display text-[12px] uppercase tracking-[0.12em]">{alreadyAi ? "🤖 You're already in AI" : "🚀 With AI skills"}</p>
          <p className="mt-2 font-display text-[60px] leading-none tracking-tightest sm:text-[88px]">
            ₹<CountUp from={p.today} to={p.withAi} /><span className="text-[0.45em]"> L</span>
          </p>
          <p className="mt-2 text-[13px] font-bold">{aiNote}</p>
        </div>
      </div>

      {win ? (
        <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
          <p className="-rotate-1 border-3 border-ink bg-lime px-5 py-4 shadow-brut">
            <span className="num block font-display text-[30px] leading-none sm:text-[38px]">+₹{fmt(p.uplift)} L</span>
            <span className="mt-1 block font-bold">a year · +{p.pct}% 📈</span>
          </p>
          <p className="rotate-1 border-3 border-ink bg-pink px-5 py-4 shadow-brut">
            <span className="num block font-display text-[30px] leading-none sm:text-[38px]">+₹{fmt(p.fiveYear)} L</span>
            <span className="mt-1 block font-bold">over {YEARS} years 💰</span>
          </p>
        </div>
      ) : (
        <p className="relative mt-6 border-3 border-ink bg-card px-5 py-4 font-bold shadow-brut">
          {alreadyAi ? "🎉 You're already in the highest-paid segment in this data. The skills below help you stay there."
            : "🏆 You already earn at or above the AI-skilled figure for your experience. The skills below help protect that lead."}
        </p>
      )}

      <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-bold">
        {p.upTo !== null && win && <span className="border-2 border-ink bg-card px-2.5 py-1">🔝 Top AI peers earn ₹{fmt(p.upTo)} L</span>}
        <a href="#details" className="underline decoration-2 underline-offset-4 hover:text-accent-dark">See the data ↓</a>
        <span className="text-ink-mute">Estimate before tax. Not an offer.</span>
      </div>
    </>
  );
}

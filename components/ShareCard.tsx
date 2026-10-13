import type { CalcResult } from "@/lib/engine";
import { cardSummary } from "@/lib/card";
import { ShareActions } from "./ShareActions";

export function ShareCard({ r, qs }: { r: CalcResult; qs: string }) {
  const c = cardSummary(r);
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "salarygap.ai").replace(/^https?:\/\//, "");
  return (
    <div>
      <figure className="overflow-hidden border-3 border-ink bg-accent shadow-brut-xl" aria-label="Shareable result card">
        <div className="grid sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col p-6 sm:border-r-3 sm:border-ink sm:p-7">
            <p className="inline-block -rotate-2 self-start border-3 border-ink bg-card px-2 py-0.5 font-display text-[13px] uppercase">₹ SalaryGap</p>
            <p className="mt-5 break-words font-display text-[28px] uppercase leading-[0.95] tracking-tight">{c.title}</p>
            <p className="mt-1 text-[14px] font-bold">{c.meta}</p>
            <p className="num mt-6 break-words font-display text-[32px] leading-none tracking-tightest sm:text-[40px]">{c.headline}</p>
            <p className="mt-2 text-[13px] font-bold">{c.sub}</p>
          </div>
          <div className="min-w-0 border-t-3 border-ink bg-lime p-6 sm:border-t-0 sm:p-7">
            <p className="font-display text-[12px] uppercase tracking-[0.12em]">🎯 Skills I&apos;m building</p>
            <ol className="mt-3 space-y-2">
              {c.skills.map((s, i) => (
                <li key={s} className="border-3 border-ink bg-card px-3 py-2 text-[15px] font-bold leading-snug">
                  <span className="mr-2 font-display text-[12px]">0{i + 1}</span>{s}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="flex flex-wrap justify-between gap-2 border-t-3 border-ink bg-ink px-6 py-3 text-[11px] font-medium text-paper/80 sm:px-7">
          <span>Source: {c.source} · {c.disclaimer}</span>
          <span className="font-bold text-lime">{site}</span>
        </figcaption>
      </figure>
      <ShareActions qs={qs} title={`${c.title}: ${c.headline}`} />
    </div>
  );
}

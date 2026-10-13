import type { CalcResult } from "@/lib/engine";
import { range } from "@/lib/format";
import { YEARS } from "@/lib/compare";
import { RangeBar } from "./Chrome";
import { CtcLine } from "./CtcLine";
import { SourceNote } from "./SourceNote";
import { TrackedLink } from "./Analytics";

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

export function SalarySection({ r }: { r: CalcResult }) {
  const c = r.comparison;
  const m = r.market, a = c.kind === "gap" ? r.aiSkilled : null;
  const scaleMax = Math.max(m?.record.max ?? 0, a?.record.max ?? 0) * 1.1 || 1;
  const nat = r.nationalContext;

  return (
    <section className="py-10" aria-label="Salary benchmarks">
      {c.kind === "gap" && (
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="border-3 border-ink bg-ink p-5 text-paper shadow-[5px_5px_0_#00C27A]">
            <p className="font-display text-[12px] uppercase tracking-[0.12em] text-lime">AI premium, up to</p>
            <p className="num mt-2 font-display text-[56px] leading-none tracking-tightest text-lime">+{c.topPct}%</p>
          </div>
          <div className="border-3 border-ink bg-card p-5 shadow-brut">
            <p className="font-display text-[12px] uppercase tracking-[0.12em] text-ink-mute">Gap per year</p>
            <p className="num mt-2 font-display text-[30px] leading-none">+₹{fmt(c.lowGap)}–{fmt(c.highGap)} L</p>
            <p className="mt-2 text-[13px] font-bold text-ink-mute">+{c.lowPct}% to +{c.highPct}%</p>
          </div>
          <div className="border-3 border-ink bg-card p-5 shadow-brut">
            <p className="font-display text-[12px] uppercase tracking-[0.12em] text-ink-mute">Over {YEARS} years</p>
            <p className="num mt-2 font-display text-[30px] leading-none">+₹{fmt(c.fiveYearLow)}–{fmt(c.fiveYearHigh)} L</p>
            <p className="mt-2 text-[13px] font-bold text-ink-mute">Gap × {YEARS}. Ignores raises and tax.</p>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        {m ? (
          <article className="brut-card p-5 sm:p-6">
            <p className="flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.08em]"><span className="h-4 w-4 border-2 border-ink bg-sky" />Your role&apos;s market</p>
            <p className="num mt-3 font-display text-[38px] leading-none tracking-tight">{range(m.record.min, m.record.max)}</p>
            <p className="mt-1 text-[13px] font-bold text-ink-mute">{m.record.segment} · {m.record.sourceBand} · per year</p>
            <div className="mt-5"><RangeBar min={m.record.min} max={m.record.max} scaleMax={scaleMax} label={`Market range ${range(m.record.min, m.record.max)}`} /></div>
            <CtcLine min={m.record.min} max={m.record.max} scaleMax={scaleMax} />
            <SourceNote b={m} how="Published range shown as-is, without adjustment." />
          </article>
        ) : (
          <article className="border-3 border-dashed border-ink bg-card p-5 sm:p-6">
            <p className="font-display text-[13px] uppercase tracking-[0.08em]">🔍 Your role&apos;s market</p>
            <p className="mt-3 text-[15px] font-medium">{c.explanation}</p>
          </article>
        )}

        {a ? (
          <article className="border-3 border-ink bg-accent-soft p-5 shadow-brut sm:p-6">
            <p className="flex items-center gap-2 font-display text-[13px] uppercase tracking-[0.08em]"><span className="h-4 w-4 border-2 border-ink bg-accent" />AI-skilled peers</p>
            <p className="num mt-3 font-display text-[38px] leading-none tracking-tight">{range(a.record.min, a.record.max)}</p>
            <p className="mt-1 text-[13px] font-bold text-ink-mute">{a.record.segment} · {a.record.sourceBand} · per year</p>
            <div className="mt-5"><RangeBar min={a.record.min} max={a.record.max} scaleMax={scaleMax} tone="accent" label={`AI range ${range(a.record.min, a.record.max)}`} /></div>
            <SourceNote b={a} how={c.kind === "gap" ? c.explanation : ""} />
          </article>
        ) : (
          <article className="border-3 border-ink bg-lilac p-5 shadow-brut sm:p-6">
            <p className="font-display text-[13px] uppercase tracking-[0.08em]">🌏 National AI context</p>
            <p className="num mt-3 font-display text-[56px] leading-none tracking-tightest">+{nat.overallMedianPct}%</p>
            <p className="mt-2 text-[15px] font-medium">Median pay premium for AI/ML roles across India. {nat.bandNote}</p>
            {m && c.kind !== "gap" && <p className="mt-3 border-t-2 border-dashed border-ink pt-3 text-[13px] font-medium">{c.explanation}</p>}
            <p className="mt-4 text-[13px] font-bold">
              📄 Source: <TrackedLink href={nat.source.url} event="source_clicked" props={{ source: nat.source.id }} className="link">{nat.source.publisher}</TrackedLink>
            </p>
          </article>
        )}
      </div>

      {r.notes.length > 0 && (
        <ul className="mt-6 space-y-1.5 text-[13px] font-medium text-ink-soft">
          {r.notes.map((n) => <li key={n}>ⓘ {n}</li>)}
        </ul>
      )}
    </section>
  );
}

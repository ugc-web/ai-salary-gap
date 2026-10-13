import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { EarningsHero } from "@/components/EarningsHero";
import { SalarySection } from "@/components/SalarySection";
import { SkillsSection } from "@/components/SkillsSection";
import { ShareCard } from "@/components/ShareCard";
import { TrackOnMount } from "@/components/Analytics";
import { calculate, validate } from "@/lib/engine";

type SP = { role?: string; exp?: string; city?: string };

function input(sp: SP) {
  return { role: sp.role ?? "", experience: sp.exp ?? "", city: sp.city ?? "" };
}

export function generateMetadata({ searchParams }: { searchParams: SP }): Metadata {
  const i = input(searchParams);
  if (Object.keys(validate(i)).length) return { title: "Result — AI Salary Gap" };
  const r = calculate(i);
  const qs = new URLSearchParams({ role: i.role, exp: i.experience, city: i.city }).toString();
  const title = `${r.roleLabel} · ${r.experienceLabel} · ${r.city} — AI Salary Gap`;
  return {
    title,
    description: `Salary benchmarks and three AI skills for ${r.roleLabel}s, with sources.`,
    openGraph: { title, images: [`/api/og?${qs}`] },
    twitter: { card: "summary_large_image", images: [`/api/og?${qs}`] },
  };
}

export default function ResultPage({ searchParams }: { searchParams: SP }) {
  const i = input(searchParams);
  const errors = validate(i);

  if (Object.keys(errors).length) {
    return (
      <>
        <Header />
        <main id="main" className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
          <p className="text-[64px] leading-none" aria-hidden>🤔</p>
          <p className="eyebrow mt-6">Something&apos;s missing</p>
          <h1 className="mt-4 font-display text-[40px] uppercase leading-none tracking-tight">We couldn&apos;t read this result link.</h1>
          <ul className="mt-6 space-y-1 font-bold text-ink-soft">{Object.values(errors).map((e) => <li key={e}>{e}</li>)}</ul>
          <Link href="/start" className="btn-primary mt-10">Start the calculator</Link>
        </main>
      </>
    );
  }

  const r = calculate(i);
  const qs = new URLSearchParams({ role: i.role, exp: i.experience, city: i.city }).toString();

  return (
    <>
      <Header />
      <TrackOnMount
        event={r.comparison.kind === "insufficient" ? "result_insufficient_data" : "result_viewed"}
        props={{ role: r.role?.id ?? "custom", experience: r.experience, city: r.city, comparison: r.comparison.kind }}
      />
      <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="pt-6 lg:pt-10">
          <Link href="/start" className="inline-flex items-center gap-1.5 border-2 border-ink bg-card px-2.5 py-1 text-[13px] font-bold shadow-brut-sm transition hover:bg-sun">← Edit answers</Link>
        </div>
        <EarningsHero
          roleLabel={r.roleLabel}
          meta={`${r.experienceLabel} · ${r.city}`}
          market={r.market ? { min: r.market.record.min, max: r.market.record.max } : null}
          ai={r.comparison.kind === "gap" && r.aiSkilled ? { min: r.aiSkilled.record.min, max: r.aiSkilled.record.max } : null}
          nationalPct={r.nationalContext.overallMedianPct}
          alreadyAi={r.role?.segment === "it.ai"}
        />

        <SkillsSection r={r} />

        <div id="details" className="scroll-mt-24 border-t-3 border-ink pt-14">
          <span className="eyebrow">The data behind this</span>
          <h2 className="mt-4 font-display text-[34px] uppercase leading-[0.95] tracking-tight sm:text-[44px]">Real ranges. Real sources. 📄</h2>
        </div>
        <SalarySection r={r} />

        <section className="grid gap-10 border-t-3 border-ink pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 [&>*]:min-w-0" aria-labelledby="share-h">
          <div>
            <span className="eyebrow">Share</span>
            <h2 id="share-h" className="mt-4 font-display text-[34px] uppercase leading-[0.95] tracking-tight sm:text-[44px]">Flex your card 😎</h2>
            <p className="mt-4 max-w-sm text-[15px] font-medium text-ink-soft">The card and link include your role, experience and city. Your CTC is <strong className="bg-lime px-1">never</strong> included.</p>
          </div>
          <ShareCard r={r} qs={qs} />
        </section>
      </main>
      <Footer />
    </>
  );
}

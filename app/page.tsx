import Link from "next/link";
import { Header } from "@/components/Chrome";
import { findBenchmark } from "@/lib/data/benchmarks";
import { project } from "@/lib/projection";
import { YEARS } from "@/lib/compare";

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

/** Three real examples, all like-for-like (foundit, Oct 2025). Middle of each published range. */
const EXAMPLES = [
  { emoji: "💻", role: "Software Engineer", seg: "it.software", band: "0-2" as const, bg: "bg-sky", tilt: "rotate-[-1.5deg]" },
  { emoji: "📊", role: "Data Analyst", seg: "it.analytics", band: "3-5" as const, bg: "bg-pink", tilt: "rotate-[1deg]" },
  { emoji: "🛡️", role: "Security Analyst", seg: "it.security", band: "0-2" as const, bg: "bg-lilac", tilt: "rotate-[-0.5deg]" },
];
const BAND_LABEL = { "0-2": "0–2 yrs", "3-5": "3–5 yrs", "6-10": "6–10 yrs", "10+": "10+ yrs" };

export default function Home() {
  const ex = EXAMPLES.map((e) => {
    const p = project({ ctc: null, market: findBenchmark(e.seg, e.band)!, ai: findBenchmark("it.ai", e.band)!, nationalPct: 0 })!;
    return { ...e, p };
  });
  const hero = ex[1].p;
  const ticker = ["NO SIGN-UP", "100% FREE", "REAL SALARY DATA", "60 SECONDS", "3 AI SKILLS", "6-WEEK ROADMAP", "SHAREABLE CARD"];

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <Header />

      <main id="main" className="flex-1">
        <section className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
          {/* Floating stickers */}
          <span className="sticker wiggle absolute right-5 top-6 rotate-[8deg] bg-sun sm:right-10 sm:top-14">⚡ 60 sec</span>
          <span className="sticker wiggle absolute right-24 top-[150px] hidden rotate-[-6deg] bg-card [animation-delay:1.5s] lg:inline-flex">🆓 Free</span>

          <p className="eyebrow">AI salary calculator · India</p>
          <h1 className="mt-6 font-display text-[54px] uppercase leading-[0.88] tracking-tightest sm:text-[104px]">
            Learn AI.<br />
            <span className="outline-text text-accent">Earn more.</span>
          </h1>

          {/* Hero comparison: one big real number */}
          <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-stretch sm:gap-0">
            <div className="brut-card flex-1 p-5 sm:p-6">
              <p className="eyebrow-plain">📊 Data Analyst today</p>
              <p className="num mt-2 font-display text-[44px] leading-none tracking-tightest text-ink-mute sm:text-[56px]">₹{fmt(hero.today)}L</p>
            </div>
            <div aria-hidden className="z-10 -my-3 grid place-items-center self-center sm:-mx-3 sm:my-0">
              <span className="grid h-14 w-14 rotate-90 place-items-center rounded-full border-3 border-ink bg-sun font-display text-[28px] shadow-brut-sm sm:rotate-0">→</span>
            </div>
            <div className="flex-[1.3] border-3 border-ink bg-accent p-5 shadow-brut-lg sm:p-6">
              <p className="font-display text-[12px] uppercase tracking-[0.12em]">🚀 With AI skills</p>
              <p className="num mt-2 font-display text-[60px] leading-none tracking-tightest sm:text-[80px]">₹{fmt(hero.withAi)}L</p>
            </div>
          </div>
          <p className="mt-6 inline-block -rotate-1 border-3 border-ink bg-lime px-4 py-2 font-display text-[18px] uppercase shadow-brut sm:text-[22px]">
            +₹{fmt(hero.fiveYear)} lakh over {YEARS} years 💸
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/start" className="btn-primary btn-xl">Calculate mine →</Link>
            <p className="font-bold text-ink-soft">5 quick questions</p>
          </div>
        </section>

        {/* Ticker */}
        <div className="overflow-hidden border-y-3 border-ink bg-ink py-3 text-paper" aria-hidden>
          <div className="marquee gap-8 font-display text-[18px] uppercase">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap">{t}<span className="text-lime">✦</span></span>
            ))}
          </div>
        </div>

        {/* More examples */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-[32px] uppercase leading-none tracking-tight sm:text-[44px]">The AI jump, by role</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {ex.map((e) => (
              <li key={e.role} className={`border-3 border-ink ${e.bg} p-5 shadow-brut ${e.tilt}`}>
                <p className="text-[32px] leading-none">{e.emoji}</p>
                <p className="mt-3 font-display text-[13px] uppercase tracking-[0.1em]">{e.role} · {BAND_LABEL[e.band]}</p>
                <p className="num mt-2 font-display text-[30px] leading-none tracking-tight">
                  ₹{fmt(e.p.today)}L <span className="text-ink/50">→</span> ₹{fmt(e.p.withAi)}L
                </p>
                <p className="num mt-3 inline-block border-2 border-ink bg-card px-2 py-0.5 text-[13px] font-bold">+{e.p.pct}% with AI</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t-3 border-ink bg-card">
        <p className="mx-auto max-w-6xl px-5 py-5 text-[12px] font-medium text-ink-mute sm:px-8">
          Examples use the middle of each published range vs the AI sub-industry, same experience bracket. foundit Salary Trends, Oct 2025. Estimates, not offers.{" "}
          <Link href="/methodology" className="link text-ink">How it works</Link>
        </p>
      </footer>
    </div>
  );
}

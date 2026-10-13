import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/Chrome";
import { Methodology } from "@/components/Methodology";
import { YEARS } from "@/lib/compare";

export const metadata: Metadata = { title: "How we calculate · AI Salary Gap" };

const STEPS = [
  ["😐", "Today", "Your CTC, or the middle of your role's published range if you skip it.", "bg-card"],
  ["🚀", "With AI", "Technical IT roles: your position in your role's range, mapped onto the AI sub-industry range from the same report. Other roles: Naukri's national median AI premium, labelled as an illustration.", "bg-accent"],
  ["💰", `${YEARS} years`, `The yearly difference × ${YEARS}, before tax. It ignores raises and promotions.`, "bg-pink"],
] as const;

export default function MethodologyPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
          <span className="eyebrow">Methodology</span>
          <h1 className="mt-5 font-display text-[48px] uppercase leading-[0.88] tracking-tightest sm:text-[88px]">
            How we<br /><span className="outline-text text-sun">calculate</span>
          </h1>
          <ol className="mt-12 grid gap-6 sm:grid-cols-3">
            {STEPS.map(([e, t, d, bg], i) => (
              <li key={t} className={`relative border-3 border-ink ${bg} p-6 shadow-brut-lg`}>
                <span className="absolute -left-3 -top-4 grid h-10 w-10 place-items-center border-3 border-ink bg-ink font-display text-[18px] text-lime">{i + 1}</span>
                <p className="text-[36px] leading-none" aria-hidden>{e}</p>
                <h2 className="mt-3 font-display text-[28px] uppercase leading-none">{t}</h2>
                <p className="mt-3 text-[15px] font-medium leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </section>
        <Methodology />
        <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
          <Link href="/start" className="btn-primary btn-xl">Calculate mine →</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Salary Gap AI, home" className={`inline-block -rotate-2 border-3 border-ink bg-ink px-3 py-1 font-display text-[18px] uppercase tracking-[0.02em] text-paper shadow-[3px_3px_0_#00C27A] transition hover:rotate-0 sm:text-[20px] ${className}`}>
      ₹ Salary<span className="text-lime">Gap</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b-3 border-ink bg-card">
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <Link href="/methodology" className="font-display text-[13px] uppercase tracking-[0.06em] underline decoration-[3px] underline-offset-4 hover:text-accent-dark">
          How it works
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t-3 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-[13px] leading-relaxed sm:grid-cols-[auto_1fr] sm:gap-12 sm:px-8">
        <p className="font-display text-[18px] uppercase">₹ Salary<span className="text-lime">Gap</span></p>
        <p className="text-paper/70">
          Salary figures are published market estimates, not offers or guarantees. They describe groups of people,
          not individuals, and differences between groups are associations, not proof that a skill causes higher pay.
          Always check the linked source before making a decision.
        </p>
      </div>
    </footer>
  );
}

export function RangeBar({ min, max, scaleMax, tone = "ink", label }: { min: number; max: number; scaleMax: number; tone?: "ink" | "accent"; label: string }) {
  const l = (min / scaleMax) * 100, w = ((max - min) / scaleMax) * 100;
  return (
    <div className="relative h-5 w-full border-3 border-ink bg-card" role="img" aria-label={label}>
      <div className={`stripes absolute inset-y-0 border-x-3 border-ink ${tone === "ink" ? "bg-sky" : "bg-accent"}`} style={{ left: `${l}%`, width: `${w}%` }} />
    </div>
  );
}

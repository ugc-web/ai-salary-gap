"use client";

export function FactCard({ stat, body, note, source, refH }: { stat: string; body: string; note: string; source: string; refH: React.RefObject<HTMLHeadingElement> }) {
  return (
    <div className="grid justify-items-center text-center">
      <span className="eyebrow">💡 Did you know?</span>
      <h1 ref={refH} tabIndex={-1} className="sr-only">Quick fact</h1>
      <div className="fact-pop relative mt-8 w-full border-3 border-ink bg-card px-6 py-12 shadow-brut-xl sm:px-14 sm:py-14">
        <span className="sticker absolute -right-3 -top-4 rotate-[6deg] bg-pink">🔥 Hot stat</span>
        <p className="bounce-y text-[72px] leading-none sm:text-[96px]" aria-hidden>🤑</p>
        <p className="num outline-text mt-4 font-display text-[96px] leading-[0.85] tracking-tightest text-accent sm:text-[140px]">{stat}</p>
        <p className="mx-auto mt-6 max-w-md font-display text-[22px] uppercase leading-tight sm:text-[28px]">{body}</p>
        <p className="mx-auto mt-4 max-w-md text-[15px] font-medium text-ink-soft">{note}</p>
        <p className="mt-8 border-t-2 border-dashed border-ink pt-4 text-[12px] font-bold text-ink-mute">Source: {source}</p>
      </div>
    </div>
  );
}

export function Analysing({ steps, done }: { steps: string[]; done: number }) {
  const pct = Math.round((done / steps.length) * 100);
  const C = 2 * Math.PI * 52;
  return (
    <div className="screen-in mx-auto grid max-w-md justify-items-center pt-4 text-center" role="status" aria-live="polite">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="#fff" stroke="#0B0B0B" strokeWidth="12" />
          <circle cx="60" cy="60" r="52" fill="none" stroke="#00C27A" strokeWidth="8" strokeDasharray={C} strokeDashoffset={C * (1 - done / steps.length)} className="transition-[stroke-dashoffset] duration-500" />
        </svg>
        <span className="num absolute inset-0 grid place-items-center font-display text-[40px]">{pct}%</span>
      </div>
      <h1 className="mt-8 font-display text-[32px] uppercase leading-none tracking-tight">Crunching your numbers 🧮</h1>
      <ul className="mt-8 w-full space-y-3 text-left">
        {steps.map((s, i) => (
          <li key={s} className={`flex items-center gap-3 border-3 border-ink px-4 py-3 font-bold transition ${i < done ? "bg-lime shadow-brut-sm" : i === done ? "bg-card shadow-brut-sm" : "bg-card opacity-50"}`}>
            <span aria-hidden className={`grid h-6 w-6 flex-none place-items-center border-2 border-ink font-display text-[12px] ${i < done ? "bg-ink text-lime" : "bg-card"}`}>{i < done ? "✓" : ""}</span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

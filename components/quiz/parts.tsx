"use client";
import { Logo } from "../Chrome";

export function Shell({ children, progress, label, onBack }: { children: React.ReactNode; progress: number; label: React.ReactNode; onBack?: () => void }) {
  return (
    <div className="min-h-dvh pb-36">
      <header className="sticky top-0 z-30 border-b-3 border-ink bg-card">
        <div className="mx-auto grid h-[68px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8">
          <div>
            {onBack && (
              <button type="button" onClick={onBack} aria-label="Back"
                className="grid h-11 w-11 place-items-center border-3 border-ink bg-card font-display text-[20px] shadow-brut-sm transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                ←
              </button>
            )}
          </div>
          <Logo />
          <p className="num justify-self-end font-display text-[15px]" aria-live="polite">{label}</p>
        </div>
        <div className="h-3 border-t-3 border-ink bg-card" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Progress">
          <div className="stripes h-full bg-accent transition-[width] duration-500 ease-out" style={{ width: `${Math.max(progress, 0.03) * 100}%` }} />
        </div>
      </header>
      <main id="main" className="px-5 pt-10 sm:px-8 sm:pt-16">{children}</main>
    </div>
  );
}

export function Question({ n, total, emoji, title, hint, children, refH }: { n: number; total: number; emoji: string; title: string; hint?: string; children: React.ReactNode; refH: React.RefObject<HTMLHeadingElement> }) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="eyebrow">Q{n} of {total}</span>
        <span className="bounce-y text-[30px] leading-none" aria-hidden>{emoji}</span>
      </div>
      <h1 ref={refH} tabIndex={-1} className="mt-5 font-display text-[38px] uppercase leading-[0.95] tracking-tight outline-none sm:text-[58px]">{title}</h1>
      {hint && <p className="mt-4 text-[17px] font-bold text-ink-soft">{hint}</p>}
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

export function Options({ children, cols }: { children: React.ReactNode; cols: 1 | 2 }) {
  return <div role="radiogroup" className={`grid gap-4 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>{children}</div>;
}

const SELECTED = ["bg-accent", "bg-pink", "bg-sky", "bg-sun", "bg-lilac", "bg-orange", "bg-lime"];
const PRESS = "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#0B0B0B] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0_#0B0B0B]";

export function Opt({ i, emoji, label, hint, selected, onClick, compact }: { i: number; emoji?: string; label: string; hint?: string; selected: boolean; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button" role="radio" aria-checked={selected} data-opt onClick={onClick}
      style={{ animationDelay: `${i * 45}ms` }}
      className={`opt-in relative flex w-full items-center gap-4 border-3 border-ink text-left shadow-brut transition-[transform,box-shadow,background-color] duration-100 focus-visible:outline-dashed focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-ink ${compact ? "min-h-[64px] px-4 py-3" : "min-h-[80px] px-5 py-4"} ${selected ? SELECTED[i % SELECTED.length] : `bg-card ${PRESS}`}`}
    >
      {emoji ? (
        <span aria-hidden className={`w-10 flex-none text-center leading-none ${compact ? "text-[24px]" : "text-[30px]"}`}>{emoji}</span>
      ) : (
        <span aria-hidden className="num grid h-8 w-8 flex-none place-items-center border-3 border-ink bg-card font-display text-[13px]">{i + 1}</span>
      )}
      <span className="min-w-0">
        <span className={`block font-bold leading-tight ${compact ? "text-[16px]" : "text-[17px]"}`}>{label}</span>
        {hint && <span className="mt-0.5 block text-[13px] font-medium text-ink/70">{hint}</span>}
      </span>
      {selected && (
        <span aria-hidden className="tick-in absolute -right-3 -top-3 grid h-8 w-8 place-items-center border-3 border-ink bg-ink font-display text-[14px] text-lime">✓</span>
      )}
    </button>
  );
}

export function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="7" width="10" height="7" rx="1" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
    </svg>
  );
}

export function ActionBar({ hint, canContinue, onContinue, cta, onSkip }: { hint: React.ReactNode; canContinue: boolean; onContinue: () => void; cta: string; onSkip?: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t-3 border-ink bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
        <p className="hidden text-[13px] font-bold text-ink-mute sm:block">{hint}</p>
        <div className="ml-auto flex w-full items-center gap-5 sm:w-auto">
          {onSkip && <button type="button" className="font-bold text-ink-mute underline decoration-2 underline-offset-4 hover:text-ink" onClick={onSkip}>Skip</button>}
          <button type="button" className="btn-primary flex-1 sm:min-w-[15rem] sm:flex-none" disabled={!canContinue} onClick={onContinue}>
            {cta} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="kbd">{children}</kbd>;
}

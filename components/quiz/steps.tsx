"use client";
import type { Role } from "@/lib/types";
import { CITIES } from "@/lib/data/roles";
import { EXPERIENCE } from "@/lib/validate";
import { NATIONAL_PREMIUM } from "@/lib/data/benchmarks";
import { SOURCES } from "@/lib/data/sources";
import { EXPERIENCE_EMOJI, EXPERIENCE_HINTS, FAMILY_EMOJI, GROUPS, type Step } from "./config";
import { LockIcon, Opt, Options, Question } from "./parts";
import { FactCard } from "./screens";

export interface Answers { group: string; role: string; custom: string; experience: string; city: string; ctc: string }

const TOP_CITIES = CITIES.slice(0, 8);
const CITY_EMOJI = ["🌳", "🌊", "🏛️", "💎", "🎓", "🛕", "🌉", "🪁"];

interface Props {
  step: Step; n: number; total: number; a: Answers; roles: Role[];
  refH: React.RefObject<HTMLHeadingElement>;
  choose: (p: Partial<Answers>) => void; set: (p: Partial<Answers>) => void;
  ctcError: string; clearCtcError: () => void;
}

export function StepView({ step, n, total, a, roles, refH, choose, set, ctcError, clearCtcError }: Props) {
  const q = { n, total, refH };

  if (step === "group") return (
    <Question {...q} emoji="👋" title="What kind of work do you do?" hint="Pick the closest. You'll choose your exact role next.">
      <Options cols={2}>
        {GROUPS.map((g, i) => (
          <Opt key={g.id} i={i} emoji={g.emoji} label={g.label} hint={g.hint} selected={a.group === g.id}
            onClick={() => choose({ group: g.id, ...(a.group !== g.id ? { role: "", custom: "" } : {}) })} />
        ))}
      </Options>
    </Question>
  );

  if (step === "role") return (
    <Question {...q} emoji="🧑‍💻" title="Which role fits you best?">
      <Options cols={roles.length > 4 ? 2 : 1}>
        {roles.map((r, i) => (
          <Opt key={r.id} i={i} compact emoji={FAMILY_EMOJI[r.family]} label={r.label}
            selected={!a.custom.trim() && a.role === r.id} onClick={() => choose({ role: r.id, custom: "" })} />
        ))}
      </Options>
      <div className="mt-8 border-3 border-dashed border-ink bg-card/70 p-4">
        <label htmlFor="custom-role" className="font-display text-[13px] uppercase tracking-[0.08em]">✏️ Not listed? Type your title</label>
        <input id="custom-role" className="field mt-2" maxLength={80} placeholder="e.g. Business Analyst" value={a.custom}
          onChange={(e) => set({ custom: e.target.value })} autoComplete="organization-title" />
      </div>
    </Question>
  );

  if (step === "experience") return (
    <Question {...q} emoji="⏳" title="How many years of experience?">
      <Options cols={2}>
        {EXPERIENCE.map((x, i) => (
          <Opt key={x.value} i={i} emoji={EXPERIENCE_EMOJI[i]} label={x.label} hint={EXPERIENCE_HINTS[i]}
            selected={a.experience === x.value} onClick={() => choose({ experience: x.value })} />
        ))}
      </Options>
    </Question>
  );

  if (step === "fact") {
    const s = SOURCES[NATIONAL_PREMIUM.sourceId];
    return (
      <FactCard refH={refH} stat={`+${NATIONAL_PREMIUM.overallMedianPct}%`}
        body="Higher median pay for AI/ML roles in India."
        note="Compared with similar non-AI roles. Next, we'll show the figure for your role."
        source={`${s.publisher}, ${new Date(s.published).toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "UTC" })}`} />
    );
  }

  if (step === "city") {
    const other = a.city && !TOP_CITIES.includes(a.city) ? a.city : "";
    return (
      <Question {...q} emoji="📍" title="Where do you work?">
        <Options cols={2}>
          {TOP_CITIES.map((c, i) => (
            <Opt key={c} i={i} compact emoji={CITY_EMOJI[i]} label={c} selected={a.city === c} onClick={() => choose({ city: c })} />
          ))}
        </Options>
        <div className="mt-8">
          <label htmlFor="city-other" className="font-display text-[13px] uppercase tracking-[0.08em]">🗺️ Somewhere else?</label>
          <select id="city-other" className={`field mt-2 appearance-none ${other ? "bg-sun" : ""}`} value={other}
            onChange={(e) => e.target.value && choose({ city: e.target.value })}>
            <option value="">Choose another city…</option>
            {CITIES.slice(8).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </Question>
    );
  }

  return (
    <Question {...q} emoji="💸" title="What's your current CTC?" hint="Optional. It personalises your “today” number.">
      <label htmlFor="ctc" className="sr-only">Annual CTC in lakhs</label>
      <div className="flex items-stretch shadow-brut">
        <span aria-hidden className="grid flex-none place-items-center border-3 border-r-0 border-ink bg-sun px-5 font-display text-[26px]">₹</span>
        <input id="ctc" className="field h-20 !shadow-none text-[30px] font-bold" inputMode="decimal" placeholder="12" autoFocus
          value={a.ctc} aria-invalid={!!ctcError} aria-describedby="ctc-note ctc-err"
          onChange={(e) => { set({ ctc: e.target.value.replace(/[^\d.]/g, "") }); clearCtcError(); }} />
        <span aria-hidden className="grid flex-none place-items-center border-3 border-l-0 border-ink bg-card px-5 font-display text-[18px] uppercase">lakh/yr</span>
      </div>
      <p id="ctc-err" role="alert" className="mt-3 min-h-5 font-bold text-signal">{ctcError}</p>
      <p id="ctc-note" className="mt-2 flex items-center gap-2 border-3 border-ink bg-lime px-3 py-2 text-[14px] font-bold shadow-brut-sm">
        <LockIcon /> Stays in this browser tab. Never in links, analytics or share cards.
      </p>
    </Question>
  );
}

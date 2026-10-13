import type { CalcResult } from "@/lib/engine";
import { TrackedLink } from "./Analytics";

const CARD = [
  { bg: "bg-sky", tilt: "lg:-rotate-1", emoji: "🧠" },
  { bg: "bg-sun", tilt: "lg:rotate-1", emoji: "⚡" },
  { bg: "bg-pink", tilt: "lg:-rotate-[0.5deg]", emoji: "🔥" },
];
const STEP_BG = ["bg-lime", "bg-sky", "bg-pink"];
const STEP_EMOJI = ["📚", "🛠️", "🏆"];

export function SkillsSection({ r }: { r: CalcResult }) {
  const steps = [
    { k: "Learn", t: r.roadmap.learn },
    { k: "Apply", t: r.roadmap.apply },
    { k: "Show it off", t: r.roadmap.demonstrate },
  ];
  return (
    <>
      <section className="border-t-3 border-ink py-14" aria-labelledby="skills-h">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Your AI skill loadout</span>
            <h2 id="skills-h" className="mt-4 font-display text-[34px] uppercase leading-[0.95] tracking-tight sm:text-[48px]">3 skills. 6 weeks. 🎯</h2>
          </div>
          <p className="max-w-xs text-[13px] font-medium text-ink-mute">Chosen for {r.role ? `${r.role.label.toLowerCase()} work` : "most professional roles"}. No skill is claimed to cause a specific raise.</p>
        </div>

        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {r.skills.map((s, i) => (
            <li key={s.name} className={`opt-in flex flex-col border-3 border-ink bg-card shadow-brut-lg ${CARD[i].tilt}`} style={{ animationDelay: `${i * 90}ms` }}>
              <div className={`flex items-center justify-between border-b-3 border-ink px-5 py-3 ${CARD[i].bg}`}>
                <span className="font-display text-[13px] uppercase tracking-[0.1em]">Skill 0{i + 1}</span>
                <span className="text-[26px] leading-none" aria-hidden>{CARD[i].emoji}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-[24px] leading-[1.05] tracking-tight">{s.name}</h3>
                <p className="mt-3 text-[15px] font-medium leading-relaxed text-ink-soft">{s.why}</p>
                <div className="mt-5 border-3 border-ink bg-paper p-3">
                  <p className="font-display text-[11px] uppercase tracking-[0.1em]">💼 Try this at work</p>
                  <p className="mt-1.5 text-[14px] font-medium leading-relaxed">{s.application}</p>
                </div>
                <div className="mt-auto pt-6">
                  <TrackedLink
                    href={s.resource.url}
                    event="resource_clicked"
                    props={{ skill: s.name, resource: s.resource.title }}
                    className="btn h-auto w-full justify-between gap-3 bg-card px-4 py-3 text-left normal-case tracking-normal"
                  >
                    <span className="min-w-0">
                      <span className="block font-sans text-[14px] font-bold">{s.resource.title}</span>
                      <span className="block font-sans text-[12px] font-medium text-ink-mute">{s.resource.provider} · <span className="font-bold text-accent-dark">{s.resource.cost}</span></span>
                    </span>
                    <span aria-hidden className="text-[20px]">↗</span>
                  </TrackedLink>
                  <p className="mt-3 text-[12px] font-medium leading-relaxed text-ink-mute"><span className="font-bold text-ink-soft">Evidence · </span>{s.evidence}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t-3 border-ink py-14" aria-labelledby="roadmap-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <span className="eyebrow">Your roadmap</span>
            <h2 id="roadmap-h" className="mt-4 font-display text-[34px] uppercase leading-[0.95] tracking-tight sm:text-[44px]">Start with {r.skills[0].name.charAt(0).toLowerCase() + r.skills[0].name.slice(1)}.</h2>
            <p className="mt-4 text-[14px] font-medium text-ink-mute">Built to fit around a full-time job. It builds evidence of your skills; it doesn&apos;t guarantee a raise.</p>
          </div>
          <ol className="space-y-5">
            {steps.map((s, i) => {
              const [when, ...rest] = s.t.split(" · ");
              return (
                <li key={s.k} className="grid grid-cols-[3.5rem_1fr] border-3 border-ink bg-card shadow-brut">
                  <span className={`grid place-items-center border-r-3 border-ink font-display text-[26px] ${STEP_BG[i]}`}>{i + 1}</span>
                  <div className="p-4 sm:p-5">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-display text-[22px] uppercase tracking-tight">{s.k} {STEP_EMOJI[i]}</span>
                      <span className="num border-2 border-ink bg-paper px-2 py-0.5 text-[12px] font-bold">{when}</span>
                    </p>
                    <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-ink-soft">{rest.join(" · ")}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}

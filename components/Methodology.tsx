import { SOURCES } from "@/lib/data/sources";
import { fmtDate } from "@/lib/format";

const RULES = [
  ["🚫", "No invented figures.", "If no verified benchmark matches your role, we say there isn't enough data.", "bg-pink"],
  ["⚖️", "Like-for-like only.", "We calculate a gap only when both ranges come from the same report, experience bracket and geography.", "bg-sky"],
  ["🌏", "National stays national.", "Naukri's cross-role premium is labelled as an illustration, never as your role's figure.", "bg-lilac"],
  ["🔗", "Association, not causation.", "Higher pay in AI roles may reflect industry, employer or seniority, not just skills.", "bg-sun"],
  ["🗓️", "Reviewed quarterly.", "Each source shows when it was last checked, and stale records are flagged.", "bg-lime"],
] as const;

export function Methodology() {
  return (
    <section id="methodology" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
      <span className="eyebrow">Ground rules</span>
      <h2 className="mt-4 font-display text-[34px] uppercase leading-[0.95] tracking-tight sm:text-[44px]">Every number has a receipt. 🧾</h2>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {RULES.map(([e, t, d, bg]) => (
          <li key={t} className={`border-3 border-ink ${bg} p-5 shadow-brut`}>
            <p className="text-[30px] leading-none" aria-hidden>{e}</p>
            <p className="mt-3 font-display text-[18px] uppercase leading-tight">{t}</p>
            <p className="mt-2 text-[14px] font-medium leading-relaxed">{d}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 font-display text-[24px] uppercase">📚 Sources</h3>
      <div className="mt-5 border-3 border-ink bg-card shadow-brut">
        {Object.values(SOURCES).map((s, i) => (
          <div key={s.id} className={`grid gap-1 p-5 sm:grid-cols-[1fr_auto] sm:gap-6 ${i > 0 ? "border-t-3 border-ink" : ""}`}>
            <div className="min-w-0">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">{s.publisher}: {s.title} ↗</a>
              <p className="mt-1 text-[13px] font-medium text-ink-mute">{s.coverage} {s.sampleNote}</p>
            </div>
            <p className="num self-start whitespace-nowrap border-2 border-ink bg-paper px-2 py-0.5 text-[12px] font-bold">Published {fmtDate(s.published)} · Verified {fmtDate(s.lastVerified)}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[13px] font-medium text-ink-mute">
        📍 City is collected to help us prioritise future data. Current sources publish national ranges only, so results are not adjusted by city.
      </p>
    </section>
  );
}

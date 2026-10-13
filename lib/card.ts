import type { CalcResult } from "./engine";
import { range } from "./format";
import { YEARS } from "./compare";
import { project } from "./projection";

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 1 });

/** Single source of truth for what the share card says (used by HTML card and PNG). */
export function cardSummary(r: CalcResult) {
  const c = r.comparison;
  let headline: string, sub: string;
  if (c.kind === "gap" && r.market && r.aiSkilled) {
    // Share card never includes CTC, so it uses the typical (mid-range) projection.
    const p = project({ ctc: null, market: r.market.record, ai: r.aiSkilled.record, nationalPct: 0 })!;
    headline = `₹${fmt(p.today)} L → ₹${fmt(p.withAi)} L`;
    sub = `Typical pay today vs with AI skills: +₹${fmt(p.uplift)} L a year, +₹${fmt(p.fiveYear)} L over ${YEARS} years`;
  } else if (r.market) {
    headline = range(r.market.record.min, r.market.record.max);
    sub = "Published market benchmark for my role (no like-for-like AI gap available)";
  } else {
    headline = "Data pending";
    sub = "Not enough verified salary data for this role yet";
  }
  const src = r.market?.source ?? r.nationalContext.source;
  return {
    title: `${r.roleLabel}`,
    meta: `${r.experienceLabel} · ${r.city}`,
    headline,
    sub,
    skills: r.skills.map((s) => s.name),
    source: `${src.publisher}, ${new Date(src.published).getUTCFullYear()}`,
    disclaimer: "National estimates from published reports. Not a salary offer or guarantee.",
  };
}

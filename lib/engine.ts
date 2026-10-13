import type { BenchmarkRecord, ExperienceBand, Role, Roadmap, Skill, Source } from "./types";
import { BAND_MAP, findBenchmark, NATIONAL_PREMIUM } from "./data/benchmarks";
import { matchRole, ROLES } from "./data/roles";
import { SOURCES } from "./data/sources";
import { TECH_SKILLS } from "./data/skills-tech";
import { BUSINESS_SKILLS } from "./data/skills-business";
import { EXPERIENCE, parseCtc, validate, type CalcInput } from "./validate";
import { compare, round1, type Comparison } from "./compare";

export { EXPERIENCE, validate };
export type { CalcInput, Comparison };
export const STALE_AFTER_DAYS = 400;

export interface BenchmarkView { record: BenchmarkRecord; source: Source; stale: boolean }

export interface CalcResult {
  role: Role | null;
  roleLabel: string;
  experience: ExperienceBand;
  experienceLabel: string;
  city: string;
  ctc: number | null;
  market: BenchmarkView | null;
  aiSkilled: BenchmarkView | null;
  comparison: Comparison;
  ctcPosition: { position: "below" | "within" | "above"; text: string } | null;
  nationalContext: { source: Source; overallMedianPct: number; bandNote: string };
  notes: string[];
  skills: Skill[];
  roadmap: Roadmap;
}

function view(record: BenchmarkRecord | null, now: Date): BenchmarkView | null {
  if (!record) return null;
  const source = SOURCES[record.sourceId];
  const age = (now.getTime() - new Date(source.lastVerified).getTime()) / 86_400_000;
  return { record, source, stale: age > STALE_AFTER_DAYS };
}

export function skillsFor(role: Role | null): Skill[] {
  const all = { ...TECH_SKILLS, ...BUSINESS_SKILLS } as Record<string, Skill[]>;
  return (all[role?.family ?? "general"] ?? all.general).slice(0, 3);
}

export function roadmapFor(skill: Skill, roleLabel: string): Roadmap {
  const app = skill.application.charAt(0).toLowerCase() + skill.application.slice(1);
  return {
    learn: `Weeks 1–2 · About 2–3 hours a week. Work through “${skill.resource.title}” (${skill.resource.provider}) and note three ideas that apply to your work as a ${roleLabel}.`,
    apply: `Weeks 3–4 · Pick one real, low-risk task: ${app} Record the time it took and what changed.`,
    demonstrate: `Weeks 5–6 · Write a one-page case study covering the problem, your approach, the result and what you'd improve. Remove confidential data, then share it with your manager or on LinkedIn.`,
  };
}

export function calculate(input: CalcInput, now = new Date()): CalcResult {
  const errors = validate(input);
  if (Object.keys(errors).length) throw new Error("Invalid input: " + Object.values(errors).join(" "));

  const experience = input.experience as ExperienceBand;
  const role = matchRole(input.role);
  const roleLabel = role?.label ?? input.role.trim();
  const ctc = parseCtc(input.ctc);
  const notes: string[] = [];

  const market = role?.segment ? view(findBenchmark(role.segment, experience), now) : null;
  const ai = role?.aiComparable ? view(findBenchmark("it.ai", experience), now) : null;

  if (market && role) {
    const bandNote = BAND_MAP[experience].note;
    if (bandNote) notes.push(bandNote);
    if (role.mapping !== "high") notes.push(`“${role.label}” is mapped to the closest available source segment: “${market.record.segment}”.`);
    notes.push(`The source publishes national figures only, so no adjustment has been made for ${input.city}.`);
    if (market.stale) notes.push("This benchmark hasn't been re-verified recently and may be out of date.");
  }

  let ctcPosition: CalcResult["ctcPosition"] = null;
  if (ctc !== null && market) {
    const { min, max } = market.record;
    const position = ctc < min ? "below" : ctc > max ? "above" : "within";
    const text =
      position === "within" ? `Your ₹${ctc} L falls within the published range.`
      : position === "below" ? `Your ₹${ctc} L is ₹${round1(min - ctc)} L below the bottom of the published range.`
      : `Your ₹${ctc} L is ₹${round1(ctc - max)} L above the top of the published range.`;
    ctcPosition = { position, text };
  }

  const bandNote =
    experience === "0-2" ? `For freshers, Naukri reports premiums of up to ${NATIONAL_PREMIUM.fresherUpToPct}%.`
    : experience === "10+" ? `For the 13–16 year band, Naukri reports a ${NATIONAL_PREMIUM.senior13to16Pct}% premium.`
    : "";

  const skills = skillsFor(role);
  return {
    role, roleLabel, experience,
    experienceLabel: EXPERIENCE.find((x) => x.value === experience)!.label,
    city: input.city, ctc, market, aiSkilled: ai,
    comparison: compare(role, roleLabel, market, ai),
    ctcPosition,
    nationalContext: { source: SOURCES[NATIONAL_PREMIUM.sourceId], overallMedianPct: NATIONAL_PREMIUM.overallMedianPct, bandNote },
    notes, skills, roadmap: roadmapFor(skills[0], roleLabel),
  };
}

/**
 * Largest like-for-like "up to" premium across all roles and bands the calculator can produce.
 * Runs the real engine, so the landing-page figure can never exceed what a user could actually see.
 */
export function maxItGap() {
  let best = { pct: 0, label: "", band: "" };
  for (const role of ROLES) {
    for (const x of EXPERIENCE) {
      const r = calculate({ role: role.id, experience: x.value, city: "Bengaluru" });
      if (r.comparison.kind === "gap" && r.comparison.topPct > best.pct) {
        best = { pct: r.comparison.topPct, label: role.label, band: `${x.label}` };
      }
    }
  }
  return best;
}

import type { BenchmarkView } from "./engine";
import type { Role } from "./types";

export type Comparison =
  | {
      kind: "gap"; lowGap: number; highGap: number; lowPct: number; highPct: number;
      /** Larger of the two end-of-range % differences ("up to"). */
      topPct: number;
      /** Annual gap × YEARS. Assumes the gap stays constant; ignores raises, promotions and tax. */
      fiveYearLow: number; fiveYearHigh: number;
      explanation: string;
    }
  | { kind: "separate"; explanation: string }
  | { kind: "insufficient"; explanation: string };

// Round to 2 dp first to remove binary float noise (14.68 - 12.23 = 2.4499…), then to 1 dp.
/** Horizon for the cumulative framing. Simple multiplication, disclosed in the UI. */
export const YEARS = 5;

export const round1 = (n: number) => Math.round(Math.round(n * 100) / 10) / 10;

/** Deterministic comparison rules. Never produces a gap unless both ranges are like-for-like. */
export function compare(role: Role | null, roleLabel: string, market: BenchmarkView | null, ai: BenchmarkView | null): Comparison {
  if (!market || !role) {
    return {
      kind: "insufficient",
      explanation: role
        ? `Our verified sources don't publish a salary benchmark that reliably matches ${role.label}, so we aren't showing a figure.`
        : `We couldn't match “${roleLabel}” to a role with verified salary data. Try choosing the closest role from the list.`,
    };
  }
  if (role.segment === "it.ai") {
    return { kind: "separate", explanation: "Your role is already in the AI segment, so there's no separate AI-skilled benchmark to compare it with." };
  }
  if (ai && ai.source.id === market.source.id && ai.record.experienceBand === market.record.experienceBand) {
    const m = market.record, a = ai.record;
    const lowGap = round1(a.min - m.min), highGap = round1(a.max - m.max);
    const lowPct = Math.round((lowGap / m.min) * 100), highPct = Math.round((highGap / m.max) * 100);
    const seg = m.segment.split("›")[1].trim();
    return {
      kind: "gap", lowGap, highGap, lowPct, highPct,
      // Headline framings, all derived directly from the same two published ranges.
      topPct: Math.max(lowPct, highPct),
      // Multiply the unrounded annual gap so rounding error isn't multiplied too.
      fiveYearLow: round1((a.min - m.min) * YEARS), fiveYearHigh: round1((a.max - m.max) * YEARS),
      explanation: `Both ranges come from the same report, experience bracket and geography. Low end = AI min − ${seg} min. High end = AI max − ${seg} max. This is an observed difference between sub-industry averages, not the effect of learning a particular skill.`,
    };
  }
  return {
    kind: "separate",
    explanation: "No published AI-skilled salary benchmark covers a comparable population for this role, so we show your market benchmark only and don't calculate a gap.",
  };
}

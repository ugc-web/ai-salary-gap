import { round1, YEARS } from "./compare";

interface Range { min: number; max: number }

export interface Projection {
  /** "ctc" = the user's own figure; "typical" = midpoint of their role's published range. */
  basis: "ctc" | "typical";
  today: number;
  withAi: number;
  /** Top of the AI-segment range, when a like-for-like benchmark exists. */
  upTo: number | null;
  uplift: number;
  pct: number;
  fiveYear: number;
  /**
   * like-for-like: same report, band and geography (technical IT roles).
   * national: Naukri's cross-role national median premium applied as an illustration.
   * already-ai: role is already in the AI segment.
   */
  method: "like-for-like" | "national" | "already-ai";
  /** User already earns at or above the AI-equivalent figure. */
  alreadyAbove: boolean;
}

const mid = (r: Range) => (r.min + r.max) / 2;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * "You earn X today → with AI skills, Y."
 * Deterministic and derived only from published ranges:
 *  - like-for-like: keeps your relative position (0 = bottom, 1 = top) and maps it onto the AI range.
 *  - national: today × (1 + national median premium).
 */
export function project(args: {
  ctc: number | null;
  market: Range | null;
  ai: Range | null;
  nationalPct: number;
  alreadyAi?: boolean;
}): Projection | null {
  const { ctc, market, ai, nationalPct, alreadyAi } = args;
  const today = ctc ?? (market ? mid(market) : null);
  if (today === null || today <= 0) return null;
  const basis = ctc !== null ? "ctc" : "typical";

  let withAi: number, upTo: number | null = null, method: Projection["method"];
  if (alreadyAi) {
    withAi = today; method = "already-ai";
  } else if (market && ai) {
    const rel = market.max > market.min ? clamp01((today - market.min) / (market.max - market.min)) : 0.5;
    withAi = ai.min + rel * (ai.max - ai.min);
    upTo = ai.max;
    method = "like-for-like";
  } else {
    withAi = today * (1 + nationalPct / 100);
    method = "national";
  }

  const alreadyAbove = method !== "already-ai" && today >= withAi;
  if (alreadyAbove) withAi = today;
  const uplift = round1(withAi - today);
  return {
    basis, today: round1(today), withAi: round1(withAi), upTo,
    // 5-year figure uses the displayed yearly uplift, so "+₹4.8 L a year" always pairs with "+₹24 L over 5 years".
    uplift, pct: Math.round(((withAi - today) / today) * 100), fiveYear: round1(uplift * YEARS),
    method, alreadyAbove,
  };
}

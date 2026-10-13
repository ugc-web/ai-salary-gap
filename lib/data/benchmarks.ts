import type { BenchmarkRecord, ExperienceBand } from "../types";

/**
 * Raw rows transcribed by hand from foundit Salary Trends Report (Oct 2025), pages 5–11.
 * Each tuple = [min, max] in INR lakh per annum, for bands 0-3, 4-6, 7-10, 11-15 years.
 * (The 15+ band is not used: our top band is "10+" which we map to 11-15.)
 * Re-check against the PDF on every quarterly review.
 */
type Row = [[number, number], [number, number], [number, number], [number, number]];

const RAW: Record<string, { label: string; rows: Row }> = {
  "it.ai": { label: "IT & ITeS › Artificial Intelligence", rows: [[7.92, 13.76], [14.68, 23.64], [20.14, 30.13], [27.86, 39.84]] },
  "it.software": { label: "IT & ITeS › Computer Software", rows: [[5.02, 9.23], [12.23, 20.26], [17.04, 26.27], [24.46, 35.83]] },
  "it.services": { label: "IT & ITeS › Information Technology and Services", rows: [[2.71, 5.13], [11.52, 19.32], [17.02, 25.98], [23.18, 34.42]] },
  "it.analytics": { label: "IT & ITeS › Analytics", rows: [[3.74, 7.08], [11.36, 17.83], [15.46, 23.27], [21.18, 30.64]] },
  "it.security": { label: "IT & ITeS › Computer & Network Security", rows: [[3.78, 7.04], [10.93, 17.86], [17.38, 25.91], [24.47, 35.46]] },
  "it.networking": { label: "IT & ITeS › Computer Networking", rows: [[4.43, 7.98], [12.57, 21.03], [17.73, 26.78], [22.24, 32.63]] },
  "media.digital": { label: "Media & Entertainment › Digital Marketing", rows: [[2.9, 4.61], [7.42, 11.43], [11.25, 14.2], [15.2, 21.8]] },
  "media.marketing": { label: "Media & Entertainment › Marketing and Advertising", rows: [[3.1, 4.92], [5.18, 8.54], [8.2, 11.4], [16.83, 23.57]] },
  "media.pr": { label: "Media & Entertainment › Public Relations & Communications", rows: [[3.25, 5.3], [6.24, 9.85], [10.26, 12.64], [13.2, 20.52]] },
  "media.writing": { label: "Media & Entertainment › Writing and Editing", rows: [[3.1, 5.42], [6.85, 9.18], [10.53, 13.28], [15.2, 21.08]] },
  "bfsi.accounting": { label: "BFSI › Accounting", rows: [[3.35, 5.71], [8.12, 12.15], [15.5, 21.5], [21.28, 27.6]] },
  "bfsi.banking": { label: "BFSI › Banking", rows: [[3.1, 5.8], [7.58, 13.26], [12.52, 20.53], [22.02, 31.51]] },
  "bfsi.ib": { label: "BFSI › Investment Banking", rows: [[3.3, 6.4], [7.5, 13.92], [13.15, 21.52], [24.94, 32.56]] },
  "svc.mgmt": { label: "Service › Management Consulting", rows: [[4.11, 7.02], [9.79, 15.44], [13.2, 19.88], [20.38, 27.19]] },
  "svc.consulting": { label: "Service › Consulting", rows: [[2.31, 4.28], [5.36, 8.58], [10.22, 15.08], [17.71, 23.24]] },
  "svc.design": { label: "Service › Design", rows: [[3.27, 5.69], [7.21, 11.63], [12.07, 18.21], [17.48, 24.92]] },
  "svc.legal": { label: "Service › Legal Services", rows: [[3.61, 6.18], [6.46, 10.19], [10.03, 14.88], [15.82, 21.94]] },
  "svc.research": { label: "Service › Market Research", rows: [[2.67, 4.77], [6.35, 10.26], [10.52, 15.98], [16.97, 23.87]] },
};

/** Our UI bands → foundit bands. Mapping is approximate and disclosed to the user. */
export const BAND_MAP: Record<ExperienceBand, { idx: number; label: string; note: string | null }> = {
  "0-2": { idx: 0, label: "0-3 years", note: "Your 0–2 yr band is compared with the source's 0–3 yr bracket." },
  "3-5": { idx: 1, label: "4-6 years", note: "Your 3–5 yr band is compared with the source's 4–6 yr bracket (closest available)." },
  "6-10": { idx: 2, label: "7-10 years", note: "Your 6–10 yr band is compared with the source's 7–10 yr bracket." },
  "10+": { idx: 3, label: "11-15 years", note: "Your 10+ yr band is compared with the source's 11–15 yr bracket." },
};

const BANDS: ExperienceBand[] = ["0-2", "3-5", "6-10", "10+"];

export const BENCHMARKS: BenchmarkRecord[] = Object.entries(RAW).flatMap(([segment, { label, rows }]) =>
  BANDS.map((band) => {
    const [min, max] = rows[BAND_MAP[band].idx];
    return {
      id: `${segment}:${band}`,
      segment: label,
      experienceBand: band,
      sourceBand: BAND_MAP[band].label,
      geography: "India (national)",
      aiSkilled: segment === "it.ai",
      min,
      max,
      currency: "INR" as const,
      period: "annual" as const,
      unit: "lakh" as const,
      sourceId: "foundit-2025",
      confidence: "medium" as const,
      notes: `Range of average salaries for ${label}, ${BAND_MAP[band].label}.`,
    };
  }),
);

export const SEGMENT_KEYS = Object.keys(RAW);

export function findBenchmark(segment: string, band: ExperienceBand) {
  return BENCHMARKS.find((b) => b.id === `${segment}:${band}`) ?? null;
}

/** National, cross-role AI premium context (Naukri, July 2025). Never converted to a role-specific gap. */
export const NATIONAL_PREMIUM = {
  sourceId: "naukri-ai-2025",
  overallMedianPct: 53,
  fresherUpToPct: 56,
  senior13to16Pct: 32,
};

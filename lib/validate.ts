import type { ExperienceBand } from "./types";
import { CITIES } from "./data/roles";

export const EXPERIENCE: { value: ExperienceBand; label: string }[] = [
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

export interface CalcInput {
  role: string;
  experience: string;
  city: string;
  ctc?: string | number | null;
}

export type ValidationErrors = Partial<Record<keyof CalcInput, string>>;

export function parseCtc(ctc: CalcInput["ctc"]): number | null {
  if (ctc === undefined || ctc === null || String(ctc).trim() === "") return null;
  return Number(ctc);
}

export function validate(input: CalcInput): ValidationErrors {
  const e: ValidationErrors = {};
  if (!input.role?.trim()) e.role = "Choose or type your job role.";
  else if (input.role.trim().length > 80) e.role = "Keep the role under 80 characters.";
  if (!EXPERIENCE.some((x) => x.value === input.experience)) e.experience = "Select your experience.";
  if (!input.city || !CITIES.includes(input.city)) e.city = "Select a city from the list.";
  const n = parseCtc(input.ctc);
  if (n !== null) {
    if (!Number.isFinite(n) || n < 0) e.ctc = "Enter a non-negative number, e.g. 8.5.";
    else if (n > 500) e.ctc = "That looks too high. Enter CTC in lakhs (e.g. 12 for ₹12 LPA).";
  }
  return e;
}

/** sessionStorage key for the optional CTC. CTC is never put in URLs or analytics. */
export const CTC_KEY = "asg:ctc";

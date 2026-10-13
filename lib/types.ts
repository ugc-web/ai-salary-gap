export type ExperienceBand = "0-2" | "3-5" | "6-10" | "10+";
export type Confidence = "high" | "medium" | "low";

export interface Source {
  id: string;
  publisher: string;
  title: string;
  url: string;
  published: string; // ISO date
  lastVerified: string; // ISO date
  sampleSize: number | null;
  sampleNote: string;
  coverage: string;
  definition: string;
  methodology: string;
}

/** Normalised benchmark record (one row per role-group × experience band). */
export interface BenchmarkRecord {
  id: string;
  segment: string; // label used by the source, e.g. "IT & ITeS › Computer Software"
  experienceBand: ExperienceBand;
  sourceBand: string; // band as published, e.g. "4-6 years"
  geography: string;
  aiSkilled: boolean;
  min: number;
  max: number;
  currency: "INR";
  period: "annual";
  unit: "lakh";
  sourceId: string;
  confidence: Confidence;
  notes: string;
}

export type RoleFamily =
  | "engineering"
  | "data"
  | "security"
  | "ai"
  | "marketing"
  | "content"
  | "finance"
  | "consulting"
  | "design"
  | "legal"
  | "operations"
  | "people"
  | "sales"
  | "product"
  | "general";

export interface Role {
  id: string;
  label: string;
  family: RoleFamily;
  /** foundit segment key, or null when no credible benchmark exists. */
  segment: string | null;
  /** How well the role maps to the source segment. */
  mapping: Confidence;
  /** True when the foundit "Artificial Intelligence" row is a like-for-like comparison. */
  aiComparable: boolean;
  aliases?: string[];
}

export interface Resource {
  title: string;
  provider: string;
  url: string;
  cost: "Free" | "Free to audit" | "Paid";
}

export interface Skill {
  name: string;
  why: string;
  application: string;
  resource: Resource;
  evidence: string;
}

export interface Roadmap {
  learn: string;
  apply: string;
  demonstrate: string;
}

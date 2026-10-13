import type { RoleFamily } from "@/lib/types";

/** Role families grouped into a short first question, so the role step shows only a handful of options. */
export const GROUPS: { id: string; emoji: string; label: string; hint: string; families: RoleFamily[] }[] = [
  { id: "tech", emoji: "💻", label: "Engineering & IT", hint: "Software, networks, security, AI/ML", families: ["engineering", "security", "ai"] },
  { id: "data", emoji: "📊", label: "Data & Research", hint: "Analytics, BI, market research", families: ["data"] },
  { id: "marketing", emoji: "📣", label: "Marketing & Content", hint: "Digital, brand, PR, writing", families: ["marketing", "content"] },
  { id: "finance", emoji: "💰", label: "Finance & Banking", hint: "Accounting, banking, IB, FP&A", families: ["finance"] },
  { id: "advisory", emoji: "💼", label: "Consulting & Legal", hint: "Strategy, advisory, legal", families: ["consulting", "legal"] },
  { id: "design", emoji: "🎨", label: "Design", hint: "UI/UX, graphic, product design", families: ["design"] },
  { id: "business", emoji: "🧭", label: "Product, People & Ops", hint: "Product, HR, sales, operations, support", families: ["product", "people", "sales", "operations", "general"] },
];

export const EXPERIENCE_HINTS = ["Early career", "Building depth", "Senior / lead", "Leadership"];
export const EXPERIENCE_EMOJI = ["🌱", "🚀", "⭐", "👑"];

/** Emoji per role family, for the role step. */
export const FAMILY_EMOJI: Record<RoleFamily, string> = {
  engineering: "🛠️", data: "📈", security: "🛡️", ai: "🤖", marketing: "📣", content: "✍️", finance: "💰",
  consulting: "💼", design: "🎨", legal: "⚖️", operations: "⚙️", people: "🧑‍🤝‍🧑", sales: "🤝", product: "🧭", general: "✨",
};

/** "fact" is an interstitial, not a question. */
export const STEPS = ["group", "role", "experience", "fact", "city", "ctc"] as const;
export type Step = (typeof STEPS)[number];
export const QUESTION_COUNT = STEPS.filter((s) => s !== "fact").length;

export const ANALYSE_STEPS = [
  "Matching your role to a published benchmark",
  "Checking for like-for-like AI data",
  "Selecting three skills for your work",
  "Drafting your six-week roadmap",
];

import type { RoleFamily, Skill } from "../types";
import { CROSS_SECTOR, R, RATIONALE } from "./resources";
import { MORE_BUSINESS_SKILLS } from "./skills-business-2";

type BizFamily = Exclude<RoleFamily, "engineering" | "data" | "security" | "ai">;

const CORE: Pick<Record<BizFamily, Skill[]>, "marketing" | "content" | "finance" | "consulting" | "design"> = {
  marketing: [
    { name: "AI-assisted content & campaign workflows", why: "Generative tools speed up ideation, copy variants and creative testing, so campaigns can be tested more often.", application: "Produce five ad-copy variants with AI and A/B test them on a live campaign.", resource: R.hubspot, evidence: "foundit (Oct 2025): Digital Marketing was one of the few Media & Entertainment segments with positive salary growth (+6%)." },
    { name: "Marketing analytics using AI", why: "AI features in analytics platforms surface audience and channel insights faster.", application: "Use predictive audiences to reallocate one month's paid budget, then compare results.", resource: R.skillshop, evidence: RATIONALE },
    { name: "AI-powered marketing automation", why: "Personalised journeys at scale combine automation with AI segmentation.", application: "Build an automated nurture sequence with AI-written variants per segment.", resource: R.googleAi, evidence: CROSS_SECTOR },
  ],
  content: [
    { name: "AI-assisted research & drafting", why: "Writers who direct AI well can deliver more drafts without losing their voice.", application: "Outline and research a long-form piece with AI, then fact-check every claim.", resource: R.googleAi, evidence: "Naukri (Jul 2025): 41% of Advertising & Marketing professionals worry AI may reduce creativity, so editorial judgement remains the differentiator." },
    { name: "Prompting for brand voice", why: "Keeping AI-generated copy consistent requires well-designed prompts and style guides.", application: "Write a reusable prompt and style guide that reproduces your brand's tone.", resource: R.aiEveryone, evidence: RATIONALE },
    { name: "AI content verification", why: "Fact-checking and AI disclosure are becoming core editorial responsibilities.", application: "Create a pre-publish checklist for AI-assisted content.", resource: R.elementsAi, evidence: RATIONALE },
  ],
  finance: [
    { name: "AI in spreadsheets & reporting", why: "AI assistants now draft formulas, reconciliations and variance commentary.", application: "Draft monthly variance commentary with an AI assistant, then verify every number.", resource: R.googleAi, evidence: "Naukri (Jul 2025): AI roles in Banking +48%; Accounting & KPO AI hiring +49–56%." },
    { name: "Python for financial analysis", why: "Connects Excel work to automation and ML tools.", application: "Automate a recurring reconciliation with pandas.", resource: R.kagglePandas, evidence: RATIONALE },
    { name: "AI risk & controls awareness", why: "Finance teams must judge where AI output can be trusted.", application: "Document control checks for any AI-generated figures in your reports.", resource: R.aiEveryone, evidence: RATIONALE },
  ],
  consulting: [
    { name: "AI-assisted research & synthesis", why: "Faster desk research and interview synthesis leave more time for insight.", application: "Synthesise ten interview notes into themes with AI, then validate them with direct quotes.", resource: R.googleAi, evidence: CROSS_SECTOR },
    { name: "AI use-case scoping", why: "Clients increasingly ask where AI fits in their business.", application: "Build a prioritised AI use-case matrix for one client function.", resource: R.aiEveryone, evidence: RATIONALE },
    { name: "Data storytelling", why: "Turning analysis into decisions is the core of consulting work.", application: "Draft charts with AI from raw data, then rewrite the narrative yourself.", resource: R.kagglePandas, evidence: RATIONALE },
  ],
  design: [
    { name: "Generative design exploration", why: "AI accelerates moodboards, variations and asset production.", application: "Explore 20 directions with AI, then hand-refine the best two.", resource: R.googleAi, evidence: RATIONALE },
    { name: "Designing AI experiences", why: "AI products need new patterns for uncertainty, feedback and trust.", application: "Redesign a flow so users can see and correct AI output.", resource: R.aiEveryone, evidence: RATIONALE },
    { name: "AI-assisted research synthesis", why: "Speeds up affinity mapping of user research.", application: "Cluster usability notes with AI, then verify against recordings.", resource: R.elementsAi, evidence: RATIONALE },
  ],
};

export const BUSINESS_SKILLS: Record<BizFamily, Skill[]> = { ...CORE, ...MORE_BUSINESS_SKILLS };

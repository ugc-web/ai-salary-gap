import type { Skill } from "../types";
import { R, RATIONALE } from "./resources";

const AI_GROWTH = "foundit (Oct 2025): Artificial Intelligence was the fastest-growing IT & ITeS sub-industry for salaries (+10% YoY).";
const AI_JOBS = "Naukri (Jul 2025): 35,000+ AI/ML jobs posted on Naukri in Apr–Jun 2025, +38% YoY.";

export const TECH_SKILLS: Record<"engineering" | "data" | "security" | "ai", Skill[]> = {
  engineering: [
    { name: "Building with LLM APIs", why: "More product features now call language models. Engineers who can integrate them reliably and safely are in demand.", application: "Add an LLM-powered summarisation endpoint to an internal tool, with input limits and logging.", resource: R.promptDev, evidence: AI_GROWTH },
    { name: "Retrieval-augmented generation (RAG)", why: "Most enterprise AI use cases need models grounded in company data rather than general knowledge.", application: "Build a Q&A bot over your team's documentation that cites its sources.", resource: R.hfLlm, evidence: AI_JOBS },
    { name: "AI-assisted development", why: "Coding assistants change how code is written, reviewed and tested. Knowing their limits matters as much as speed.", application: "Generate unit tests for a legacy module with an assistant, then review every case by hand.", resource: R.aiEveryone, evidence: RATIONALE },
  ],
  data: [
    { name: "Machine learning fundamentals", why: "Moves your work from describing what happened to predicting what will happen.", application: "Build a simple churn or demand forecast from a dataset you already use.", resource: R.kaggleMl, evidence: "foundit (Oct 2025): Analytics salaries +8% YoY and AI +10% YoY within IT & ITeS." },
    { name: "LLM-assisted analysis", why: "Speeds up SQL drafting, data cleaning and first-pass insights. Outputs still need validation.", application: "Draft the SQL for a weekly report with an LLM and reconcile results against the source.", resource: R.promptDev, evidence: RATIONALE },
    { name: "Python data workflows", why: "Python is the common language between analytics and AI tooling.", application: "Replace a manual spreadsheet report with a pandas script.", resource: R.kagglePandas, evidence: RATIONALE },
  ],
  security: [
    { name: "Securing LLM applications", why: "Prompt injection and data leakage are new attack surfaces as companies deploy AI.", application: "Review an internal chatbot against the OWASP Top 10 for LLM apps.", resource: R.owaspLlm, evidence: "foundit (Oct 2025): Computer & Network Security salaries +9% YoY." },
    { name: "ML-based threat detection", why: "Security tools increasingly use ML for anomaly detection; analysts tune and interpret them.", application: "Audit a week of ML-flagged alerts and document the false positives.", resource: R.msAi900, evidence: RATIONALE },
    { name: "AI governance basics", why: "Organisations need policies for safe AI use, and security teams often own them.", application: "Draft a generative-AI acceptable-use policy for your team.", resource: R.elementsAi, evidence: RATIONALE },
  ],
  ai: [
    { name: "LLM fine-tuning & evaluation", why: "Practitioners who can measure and improve model quality stand out.", application: "Fine-tune a small open model and publish its evaluation metrics.", resource: R.hfLlm, evidence: AI_GROWTH },
    { name: "Production RAG systems", why: "Grounded generation is the dominant enterprise AI pattern.", application: "Ship a RAG service with retrieval evaluation and monitoring.", resource: R.promptDev, evidence: AI_JOBS },
    { name: "Deep learning foundations", why: "Strong fundamentals make new architectures faster to adopt.", application: "Reproduce a published text classifier from scratch.", resource: R.fastai, evidence: RATIONALE },
  ],
};

import type { Skill } from "../types";
import { CROSS_SECTOR, R, RATIONALE } from "./resources";

export const MORE_BUSINESS_SKILLS: Record<"legal" | "people" | "sales" | "operations" | "product" | "general", Skill[]> = {
  legal: [
    { name: "AI-assisted document review", why: "Contract review and due-diligence tools are adopting AI.", application: "Extract key clauses from five NDAs with AI and verify each one.", resource: R.googleAi, evidence: RATIONALE },
    { name: "AI regulation & data protection", why: "India's DPDP Act and global AI rules create new advisory work.", application: "Write a one-page DPDP checklist for an AI tool your firm uses.", resource: R.elementsAi, evidence: RATIONALE },
    { name: "Prompting for legal research", why: "Structured prompting reduces the risk of hallucinated citations.", application: "Compare AI research output with a manual search and log discrepancies.", resource: R.aiEveryone, evidence: RATIONALE },
  ],
  people: [
    { name: "AI in talent acquisition", why: "Screening, JD writing and outreach are being augmented by AI.", application: "Rewrite three job descriptions with AI and check them for biased language.", resource: R.googleAi, evidence: CROSS_SECTOR },
    { name: "People analytics fundamentals", why: "Attrition and engagement data drive better HR decisions.", application: "Build an attrition dashboard from HRIS exports.", resource: R.kagglePandas, evidence: RATIONALE },
    { name: "Responsible AI in HR", why: "Bias and fairness risks are highest in people decisions.", application: "Draft guidelines for fair use of AI screening tools.", resource: R.aiEveryone, evidence: RATIONALE },
  ],
  sales: [
    { name: "AI-assisted prospecting", why: "AI speeds up account research and personalised outreach.", application: "Research ten target accounts with AI and send personalised emails.", resource: R.hubspot, evidence: CROSS_SECTOR },
    { name: "CRM automation & forecasting", why: "AI features in CRMs improve pipeline hygiene and forecasting.", application: "Turn on AI call summaries and next-step suggestions in your CRM.", resource: R.googleAi, evidence: RATIONALE },
    { name: "Conversation intelligence", why: "Call analysis surfaces objections and winning talk tracks.", application: "Review AI analysis of five calls and adjust your pitch.", resource: R.aiEveryone, evidence: RATIONALE },
  ],
  operations: [
    { name: "Workflow automation with AI", why: "Repetitive operational tasks are prime candidates for AI assistance.", application: "Automate a weekly status report from spreadsheets with an AI assistant.", resource: R.googleAi, evidence: "Naukri (Jul 2025): AI roles in BPO & ITES grew 39%." },
    { name: "AI for support operations", why: "Chatbots and agent-assist tools are reshaping frontline work.", application: "Write a knowledge-base set that an AI assistant can answer from.", resource: R.aiEveryone, evidence: CROSS_SECTOR },
    { name: "Data literacy for operations", why: "Reading dashboards and spotting anomalies underpins AI adoption.", application: "Track one process KPI weekly and explain every change.", resource: R.kagglePandas, evidence: RATIONALE },
  ],
  product: [
    { name: "AI product management", why: "PMs must scope, evaluate and ship features built on probabilistic models.", application: "Write a PRD for an AI feature including evaluation criteria and failure modes.", resource: R.aiEveryone, evidence: CROSS_SECTOR },
    { name: "Prototyping with LLMs", why: "Quick prototypes de-risk AI ideas before engineering investment.", application: "Build a no-code prototype of an AI feature and test it with five users.", resource: R.promptDev, evidence: RATIONALE },
    { name: "AI evaluation design", why: "Defining 'good' output is the hardest part of AI products.", application: "Create a 50-example evaluation set for one AI feature.", resource: R.hfLlm, evidence: RATIONALE },
  ],
  general: [
    { name: "AI literacy fundamentals", why: "Knowing what AI can and cannot do helps you spot useful applications.", application: "List three repetitive tasks in your week that AI could assist with.", resource: R.aiEveryone, evidence: CROSS_SECTOR },
    { name: "Effective prompting", why: "Clear instructions make AI output more useful and reliable.", application: "Build a personal prompt library for your most common tasks.", resource: R.googleAi, evidence: RATIONALE },
    { name: "Responsible AI use", why: "Understanding privacy and accuracy risks protects you and your employer.", application: "Write a checklist for verifying AI output before sharing it.", resource: R.elementsAi, evidence: RATIONALE },
  ],
};

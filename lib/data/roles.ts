import type { Role } from "../types";

/**
 * Role → source-segment mapping. `segment: null` means no credible role-level benchmark exists
 * in our curated sources, and the app returns an insufficient-data state for salary.
 * `aiComparable` is only true where foundit's "Artificial Intelligence" IT sub-industry is a
 * reasonable like-for-like peer group (technical IT roles in the same report and bands).
 */
export const ROLES: Role[] = [
  { id: "software-engineer", label: "Software Engineer", family: "engineering", segment: "it.software", mapping: "high", aiComparable: true, aliases: ["developer", "sde", "programmer", "full stack", "backend", "frontend"] },
  { id: "it-services-engineer", label: "IT Services / Support Engineer", family: "engineering", segment: "it.services", mapping: "medium", aiComparable: true, aliases: ["it support", "system admin", "sysadmin"] },
  { id: "network-engineer", label: "Network Engineer", family: "engineering", segment: "it.networking", mapping: "high", aiComparable: true, aliases: ["devops", "cloud", "infrastructure"] },
  { id: "data-analyst", label: "Data Analyst", family: "data", segment: "it.analytics", mapping: "high", aiComparable: true, aliases: ["business analyst", "bi analyst", "analytics", "data scientist"] },
  { id: "security-analyst", label: "Cybersecurity Analyst", family: "security", segment: "it.security", mapping: "high", aiComparable: true, aliases: ["security", "infosec", "soc"] },
  { id: "ml-engineer", label: "AI / ML Engineer", family: "ai", segment: "it.ai", mapping: "high", aiComparable: false, aliases: ["machine learning", "ai engineer", "genai", "llm"] },
  { id: "digital-marketer", label: "Digital Marketing Executive", family: "marketing", segment: "media.digital", mapping: "high", aiComparable: false, aliases: ["seo", "sem", "performance marketing", "social media"] },
  { id: "marketing-manager", label: "Marketing Manager", family: "marketing", segment: "media.marketing", mapping: "medium", aiComparable: false, aliases: ["brand", "marketing"] },
  { id: "pr-comms", label: "PR & Communications", family: "content", segment: "media.pr", mapping: "high", aiComparable: false, aliases: ["corporate communications", "public relations"] },
  { id: "content-writer", label: "Content Writer / Editor", family: "content", segment: "media.writing", mapping: "high", aiComparable: false, aliases: ["copywriter", "editor", "writer"] },
  { id: "accountant", label: "Accountant", family: "finance", segment: "bfsi.accounting", mapping: "high", aiComparable: false, aliases: ["ca", "chartered accountant", "audit", "tax"] },
  { id: "banking-professional", label: "Banking Professional", family: "finance", segment: "bfsi.banking", mapping: "medium", aiComparable: false, aliases: ["relationship manager", "credit analyst", "bank"] },
  { id: "investment-banking", label: "Investment Banking Analyst", family: "finance", segment: "bfsi.ib", mapping: "high", aiComparable: false, aliases: ["ib", "m&a"] },
  { id: "financial-analyst", label: "Financial Analyst (FP&A)", family: "finance", segment: null, mapping: "low", aiComparable: false, aliases: ["fp&a", "finance"] },
  { id: "management-consultant", label: "Management Consultant", family: "consulting", segment: "svc.mgmt", mapping: "high", aiComparable: false, aliases: ["strategy"] },
  { id: "consultant", label: "Consultant", family: "consulting", segment: "svc.consulting", mapping: "medium", aiComparable: false },
  { id: "designer", label: "UI/UX or Graphic Designer", family: "design", segment: "svc.design", mapping: "medium", aiComparable: false, aliases: ["ux", "ui", "product designer", "graphic"] },
  { id: "legal", label: "Legal Associate", family: "legal", segment: "svc.legal", mapping: "medium", aiComparable: false, aliases: ["lawyer", "advocate", "legal counsel"] },
  { id: "market-research", label: "Market Research Analyst", family: "data", segment: "svc.research", mapping: "high", aiComparable: false, aliases: ["research analyst", "insights"] },
  { id: "product-manager", label: "Product Manager", family: "product", segment: null, mapping: "low", aiComparable: false, aliases: ["pm", "product owner"] },
  { id: "hr", label: "HR / Talent Acquisition", family: "people", segment: null, mapping: "low", aiComparable: false, aliases: ["recruiter", "human resources", "hrbp"] },
  { id: "sales", label: "Sales / Business Development", family: "sales", segment: null, mapping: "low", aiComparable: false, aliases: ["bd", "account executive", "inside sales"] },
  { id: "operations", label: "Operations Executive", family: "operations", segment: null, mapping: "low", aiComparable: false, aliases: ["ops", "supply chain", "logistics"] },
  { id: "customer-support", label: "Customer Support", family: "operations", segment: null, mapping: "low", aiComparable: false, aliases: ["customer service", "bpo", "call centre"] },
];

export const CITIES = [
  "Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad",
  "Kochi", "Coimbatore", "Indore", "Jaipur", "Chandigarh", "Lucknow", "Bhubaneswar", "Nagpur",
  "Thiruvananthapuram", "Vadodara", "Visakhapatnam", "Mysuru", "Other / Remote",
];

export function normalise(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9&+ ]/g, " ").replace(/\s+/g, " ").trim();
}

/** Match a free-text or selected role to a supported role, or null. */
export function matchRole(input: string): Role | null {
  const q = normalise(input);
  if (!q) return null;
  const exact = ROLES.find((r) => r.id === input || normalise(r.label) === q);
  if (exact) return exact;
  const byAlias = ROLES.find((r) => (r.aliases ?? []).some((a) => q === a || q.includes(a)));
  return byAlias ?? null;
}

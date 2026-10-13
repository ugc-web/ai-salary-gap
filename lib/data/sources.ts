import type { Source } from "../types";

/**
 * Curated, manually verified sources. Every figure in /lib/data must point to one of these.
 * Review quarterly – see REVIEW_INTERVAL_DAYS in lib/engine.ts.
 */
export const SOURCES: Record<string, Source> = {
  "foundit-2025": {
    id: "foundit-2025",
    publisher: "foundit (formerly Monster India)",
    title: "Salary Trends Report – Oct 2025, India",
    url: "https://www.foundit.in/career-advice/wp-content/uploads/2025/11/Salary-Trends-Report.pdf",
    published: "2025-10-01",
    lastVerified: "2026-10-13",
    sampleSize: null,
    sampleNote: "Sample size not disclosed by the publisher.",
    coverage: "India (national). No city-level breakdown.",
    definition:
      "“Minimum and Maximum Average Salary (in Lacs)” per sub-industry and experience bracket (0-3, 4-6, 7-10, 11-15, 15+ years). Read as annual INR, lakhs.",
    methodology:
      "Publisher states insights are “based on recent market patterns, employer hiring behaviour, and emerging skill requirements.” Detailed methodology not published.",
  },
  "naukri-ai-2025": {
    id: "naukri-ai-2025",
    publisher: "Naukri.com (Info Edge)",
    title: "“AI: Friend, Foe or Frenemy” – World AI Day report",
    url: "https://www.naukri.com/blog/naukri-ai-jobs-report/",
    published: "2025-07-16",
    lastVerified: "2026-10-13",
    sampleSize: null,
    sampleNote:
      "Report cites 60,000+ jobseekers, thousands of job listings and recruiter surveys; the sample behind the salary figures is not separately disclosed.",
    coverage: "India (national), all roles combined.",
    definition:
      "Median salaries for AI-skilled roles compared with non-AI-skilled counterparts.",
    methodology:
      "Premiums are reported by the publisher as percentages. They are cross-role national figures and are not role- or city-specific.",
  },
};

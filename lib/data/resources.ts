import type { Resource } from "../types";

export const R: Record<string, Resource> = {
  aiEveryone: { title: "AI for Everyone", provider: "DeepLearning.AI · Coursera", url: "https://www.coursera.org/learn/ai-for-everyone", cost: "Free to audit" },
  googleAi: { title: "Google AI Essentials", provider: "Google", url: "https://grow.google/ai-essentials/", cost: "Paid" },
  promptDev: { title: "ChatGPT Prompt Engineering for Developers", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", cost: "Free" },
  kaggleMl: { title: "Intro to Machine Learning", provider: "Kaggle Learn", url: "https://www.kaggle.com/learn/intro-to-machine-learning", cost: "Free" },
  kagglePandas: { title: "Pandas", provider: "Kaggle Learn", url: "https://www.kaggle.com/learn/pandas", cost: "Free" },
  hfLlm: { title: "LLM Course", provider: "Hugging Face", url: "https://huggingface.co/learn/llm-course", cost: "Free" },
  msAi900: { title: "Azure AI Fundamentals", provider: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/", cost: "Free" },
  hubspot: { title: "Marketing & AI courses", provider: "HubSpot Academy", url: "https://academy.hubspot.com/", cost: "Free" },
  skillshop: { title: "Google Ads & Analytics training", provider: "Google Skillshop", url: "https://skillshop.withgoogle.com/", cost: "Free" },
  elementsAi: { title: "Elements of AI", provider: "University of Helsinki", url: "https://www.elementsofai.com/", cost: "Free" },
  owaspLlm: { title: "OWASP Top 10 for LLM Applications", provider: "OWASP", url: "https://genai.owasp.org/llm-top-10/", cost: "Free" },
  fastai: { title: "Practical Deep Learning for Coders", provider: "fast.ai", url: "https://course.fast.ai/", cost: "Free" },
};

export const CROSS_SECTOR =
  "Naukri (Jul 2025) reports AI hiring spreading beyond IT — Banking +48%, BPO/ITES +39%, Accounting & KPO +49–56% — signalling demand for AI literacy across functions.";
export const RATIONALE = "Relevance rationale based on how the role's tools and workflows are changing. Not a salary claim.";

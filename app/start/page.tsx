import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata: Metadata = { title: "Calculate — AI Salary Gap", robots: { index: false } };

export default function StartPage() {
  return <Quiz />;
}

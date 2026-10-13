"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/data/roles";
import { CTC_KEY, validate } from "@/lib/validate";
import { track } from "@/lib/analytics";
import { ANALYSE_STEPS, GROUPS, QUESTION_COUNT, STEPS } from "./config";
import { ActionBar, Kbd, Shell } from "./parts";
import { Analysing } from "./screens";
import { StepView, type Answers } from "./steps";

const EMPTY: Answers = { group: "", role: "", custom: "", experience: "", city: "", ctc: "" };

/** One question per screen. Single-choice steps auto-advance; Enter continues, Esc goes back, 1–9 picks. */
export function Quiz() {
  const router = useRouter();
  const [pos, setPos] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [ctcError, setCtcError] = useState("");
  const [analysing, setAnalysing] = useState(-1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const step = STEPS[pos];
  const isLast = pos === STEPS.length - 1;
  const qNum = STEPS.slice(0, pos + 1).filter((s) => s !== "fact").length;
  const roleValue = a.custom.trim() || a.role;
  const roles = useMemo(() => {
    const g = GROUPS.find((x) => x.id === a.group);
    return g ? ROLES.filter((r) => g.families.includes(r.family)) : [];
  }, [a.group]);

  useEffect(() => { track("form_started"); }, []);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (pos > 0) headingRef.current?.focus({ preventScroll: true });
  }, [pos]);

  const answered = { group: !!a.group, role: !!roleValue, experience: !!a.experience, city: !!a.city, fact: true, ctc: true }[step];

  const finish = useCallback((ctc: string) => {
    const errs = validate({ role: roleValue, experience: a.experience, city: a.city, ctc });
    if (Object.keys(errs).length) {
      track("form_validation_error", { fields: Object.keys(errs).join(",") });
      if (errs.ctc) return setCtcError(errs.ctc);
      return setPos(STEPS.indexOf(errs.role ? "role" : errs.experience ? "experience" : "city"));
    }
    // CTC never goes in the URL or analytics: tab-scoped storage only.
    try { if (ctc.trim()) sessionStorage.setItem(CTC_KEY, ctc.trim()); else sessionStorage.removeItem(CTC_KEY); } catch { /* unavailable */ }
    track("form_submitted", { role_supported: ROLES.some((r) => r.id === roleValue), experience: a.experience, city: a.city, ctc_provided: !!ctc.trim() });
    const href = `/result?${new URLSearchParams({ role: roleValue, exp: a.experience, city: a.city })}`;
    router.prefetch(href);
    const beat = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 520;
    setAnalysing(0);
    ANALYSE_STEPS.forEach((_, i) => setTimeout(() => setAnalysing(i + 1), beat * (i + 1)));
    setTimeout(() => router.push(href), beat * ANALYSE_STEPS.length + 300);
  }, [roleValue, a.experience, a.city, router]);

  const next = useCallback(() => {
    if (!answered) return;
    clearTimeout(timer.current);
    if (isLast) finish(a.ctc);
    else setPos((p) => p + 1);
  }, [answered, isLast, finish, a.ctc]);

  const back = useCallback(() => {
    clearTimeout(timer.current);
    if (pos > 0) setPos((p) => p - 1);
    else router.push("/");
  }, [pos, router]);

  /** Select, then auto-advance after a beat so the selection visibly registers. */
  const choose = useCallback((patch: Partial<Answers>) => {
    setA((prev) => ({ ...prev, ...patch }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPos((p) => Math.min(p + 1, STEPS.length - 1)), 280);
  }, []);
  const set = useCallback((patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch })), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (analysing >= 0 || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "Enter" && tag !== "BUTTON" && tag !== "SELECT") { e.preventDefault(); next(); }
      else if (e.key === "Escape") back();
      else if (tag !== "INPUT" && tag !== "SELECT" && /^[1-9]$/.test(e.key)) {
        document.querySelectorAll<HTMLButtonElement>("[data-opt]")[Number(e.key) - 1]?.click();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [analysing, next, back]);

  if (analysing >= 0) return <Shell progress={1} label="Done"><Analysing steps={ANALYSE_STEPS} done={analysing} /></Shell>;

  return (
    <Shell progress={(step === "fact" ? qNum : qNum - 1) / QUESTION_COUNT} label={step === "fact" ? "Quick fact" : `${qNum} / ${QUESTION_COUNT}`} onBack={back}>
      <div key={step} className="screen-in mx-auto max-w-2xl">
        <StepView step={step} n={qNum} total={QUESTION_COUNT} a={a} roles={roles} refH={headingRef}
          choose={choose} set={set} ctcError={ctcError} clearCtcError={() => setCtcError("")} />
      </div>
      <ActionBar
        hint={step === "fact" || isLast ? <>Press <Kbd>Enter ↵</Kbd></> : <>Press <Kbd>1</Kbd>–<Kbd>9</Kbd> to choose · <Kbd>Enter ↵</Kbd> to continue</>}
        canContinue={answered} onContinue={next} cta={isLast ? "See my result" : "Continue"}
        onSkip={isLast ? () => { set({ ctc: "" }); setCtcError(""); finish(""); } : undefined}
      />
    </Shell>
  );
}

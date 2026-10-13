"use client";
import { useState } from "react";
import { validate } from "@/lib/validate";
import { LockIcon } from "./quiz/parts";

/** Inline CTC entry on the result page, shown when the user skipped it in the quiz. */
export function CtcPrompt({ onSave }: { onSave: (n: number) => void }) {
  const [v, setV] = useState("");
  const [err, setErr] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate({ role: "x", experience: "0-2", city: "Bengaluru", ctc: v });
    if (!v.trim()) return setErr("Enter your CTC in lakhs, e.g. 9.5.");
    if (errs.ctc) return setErr(errs.ctc);
    onSave(Number(v));
  }
  return (
    <form onSubmit={submit} className="mt-6 border-3 border-ink bg-sun p-4 shadow-brut sm:p-5" noValidate>
      <label htmlFor="ctc-inline" className="font-display text-[15px] uppercase">🎯 Make it yours. Add your CTC</label>
      <div className="mt-3 flex flex-wrap items-stretch gap-3">
        <div className="flex min-w-0 flex-1 items-stretch">
          <span aria-hidden className="grid place-items-center border-3 border-r-0 border-ink bg-card px-3 font-display text-[18px]">₹</span>
          <input id="ctc-inline" className="field min-w-0" inputMode="decimal" placeholder="12" value={v} aria-invalid={!!err}
            aria-describedby="ctc-inline-err" onChange={(e) => { setV(e.target.value.replace(/[^\d.]/g, "")); setErr(""); }} />
          <span aria-hidden className="grid place-items-center border-3 border-l-0 border-ink bg-card px-3 text-[13px] font-bold">L/yr</span>
        </div>
        <button type="submit" className="btn h-14 bg-ink text-lime">Personalise →</button>
      </div>
      <p id="ctc-inline-err" role="alert" className="mt-2 min-h-5 text-[14px] font-bold text-signal">{err}</p>
      <p className="flex items-center gap-2 text-[13px] font-bold"><LockIcon /> Stays in this tab only.</p>
    </form>
  );
}

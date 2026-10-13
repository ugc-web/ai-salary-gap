"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="text-[64px] leading-none" aria-hidden>😵</p>
      <p className="eyebrow mt-6">Something went wrong</p>
      <h1 className="mt-4 font-display text-[40px] uppercase leading-none tracking-tight">We couldn&apos;t load this result.</h1>
      <button onClick={reset} className="btn-primary mt-10">Try again</button>
    </main>
  );
}

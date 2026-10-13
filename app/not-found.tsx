import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="outline-text font-display text-[120px] leading-none text-sun" aria-hidden>404</p>
      <h1 className="mt-6 font-display text-[36px] uppercase leading-none tracking-tight">This page doesn&apos;t exist.</h1>
      <Link href="/" className="btn-primary mt-10">Back to the calculator</Link>
    </main>
  );
}

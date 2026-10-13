import type { BenchmarkView } from "@/lib/engine";
import { fmtDate } from "@/lib/format";
import { TrackedLink } from "./Analytics";

export function SourceNote({ b, how }: { b: BenchmarkView; how: string }) {
  const s = b.source;
  return (
    <details className="group mt-5 border-t-2 border-dashed border-ink pt-4 text-[13px] font-medium">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span>
          📄 Source:{" "}
          <TrackedLink href={s.url} event="source_clicked" props={{ source: s.id }} className="link">{s.publisher}</TrackedLink>
          <span className="text-ink-mute"> · {fmtDate(s.published)}</span>
          {b.stale && <span className="ml-2 border-2 border-ink bg-orange px-1.5 py-0.5 text-[11px] font-bold">Needs re-verification</span>}
        </span>
        <span className="flex-none border-2 border-ink bg-card px-2 py-0.5 font-bold group-open:hidden">Details +</span>
        <span className="hidden flex-none border-2 border-ink bg-ink px-2 py-0.5 font-bold text-paper group-open:inline">Hide −</span>
      </summary>
      <dl className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-[9rem_1fr]">
        <dt className="font-bold text-ink-mute">Report</dt><dd>{s.title}</dd>
        <dt className="font-bold text-ink-mute">Segment</dt><dd>{b.record.segment}</dd>
        <dt className="font-bold text-ink-mute">Experience</dt><dd>{b.record.sourceBand} (as published)</dd>
        <dt className="font-bold text-ink-mute">Location</dt><dd>{b.record.geography}</dd>
        <dt className="font-bold text-ink-mute">Definition</dt><dd>{s.definition}</dd>
        <dt className="font-bold text-ink-mute">Sample</dt><dd>{s.sampleSize ? s.sampleSize.toLocaleString("en-IN") : s.sampleNote}</dd>
        <dt className="font-bold text-ink-mute">Last verified</dt><dd>{fmtDate(s.lastVerified)}</dd>
        <dt className="font-bold text-ink-mute">Confidence</dt><dd className="capitalize">{b.record.confidence}</dd>
        <dt className="font-bold text-ink-mute">How calculated</dt><dd>{how}</dd>
      </dl>
    </details>
  );
}

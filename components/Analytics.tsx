"use client";
import { useEffect } from "react";
import { initAnalytics, track, type EventName } from "@/lib/analytics";

export function Analytics() {
  useEffect(() => initAnalytics(), []);
  return null;
}

/** Fires one event on mount – used by server-rendered pages. */
export function TrackOnMount({ event, props }: { event: EventName; props: Record<string, string | number | boolean | null> }) {
  useEffect(() => {
    initAnalytics();
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Outbound link that records a click event. */
export function TrackedLink({ href, event, props, className, children }: {
  href: string; event: EventName; props?: Record<string, string>; className?: string; children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track(event, props)}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

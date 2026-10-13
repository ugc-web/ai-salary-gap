"use client";
import type { PostHog } from "posthog-js";

export type EventName =
  | "form_started"
  | "form_submitted"
  | "form_validation_error"
  | "result_viewed"
  | "result_insufficient_data"
  | "share_clicked"
  | "link_copied"
  | "card_downloaded"
  | "resource_clicked"
  | "source_clicked";

type Props = Record<string, string | number | boolean | null>;
let ph: PostHog | null = null;
let loading: Promise<void> | null = null;
const queue: [EventName, Props][] = [];

/** Lazily loads PostHog so it stays out of the initial bundle. No-op without a key. */
export function initAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (loading || !key || typeof window === "undefined") return;
  loading = import("posthog-js").then(({ default: posthog }) => {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
      capture_pageview: true,
      persistence: "memory", // no cookies, no account
      autocapture: false, // never capture form inputs such as CTC
      disable_session_recording: true,
    });
    ph = posthog;
    queue.splice(0).forEach(([n, p]) => posthog.capture(n, p));
  });
}

/** Track a named event. Props must never include CTC or other personal data. */
export function track(name: EventName, props: Props = {}) {
  if ("ctc" in props) delete props.ctc;
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", name, props);
  if (ph) ph.capture(name, props);
  else if (process.env.NEXT_PUBLIC_POSTHOG_KEY) queue.push([name, props]);
}

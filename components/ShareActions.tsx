"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

export function ShareActions({ qs, title }: { qs: string; title: string }) {
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setUrl(`${window.location.origin}/result?${qs}`);
    setCanShare(typeof navigator.share === "function");
  }, [qs]);

  async function share() {
    track("share_clicked", { method: "native" });
    try {
      await navigator.share({ title: "My AI Salary Gap", text: title, url });
    } catch { /* user cancelled */ }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("✅ Link copied!");
    } catch {
      setStatus("Couldn't copy. Select the link below instead.");
    }
    track("link_copied");
    setTimeout(() => setStatus(""), 2500);
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        {canShare && <button onClick={share} className="btn-primary h-12 px-5 text-[13px]">📤 Share</button>}
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost bg-lime" onClick={() => track("share_clicked", { method: "whatsapp" })}>💬 WhatsApp</a>
        <a href={li} target="_blank" rel="noopener noreferrer" className="btn-ghost bg-sky" onClick={() => track("share_clicked", { method: "linkedin" })}>💼 LinkedIn</a>
        <button onClick={copy} className="btn-ghost">🔗 Copy link</button>
        <a href={`/api/og?${qs}&download=1`} download="ai-salary-gap.png" className="btn-ghost bg-sun" onClick={() => track("card_downloaded")}>
          ⬇️ Image
        </a>
      </div>
      <p className="mt-4 truncate text-[12px] font-medium text-ink-mute">{url}</p>
      <p role="status" aria-live="polite" className="mt-1 h-5 text-[14px] font-bold text-accent-dark">{status}</p>
    </div>
  );
}

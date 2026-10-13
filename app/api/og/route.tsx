import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { calculate, validate } from "@/lib/engine";
import { cardSummary } from "@/lib/card";

export const runtime = "nodejs";

const INK = "#0B0B0B", PAPER = "#FFFBF0", GREEN = "#00C27A", LIME = "#C6FF3D", SUN = "#FFD23F";
const dir = join(process.cwd(), "app/api/og/fonts");
type Font = { name: string; data: Buffer; weight: 500 | 700 | 800; style: "normal" };
let cache: Font[] | null = null;
const fonts = () => (cache ??= [
  { name: "Display", data: readFileSync(join(dir, "Bricolage-ExtraBold.ttf")), weight: 800, style: "normal" },
  { name: "Body", data: readFileSync(join(dir, "SpaceGrotesk-Medium.ttf")), weight: 500, style: "normal" },
  { name: "Body", data: readFileSync(join(dir, "SpaceGrotesk-Bold.ttf")), weight: 700, style: "normal" },
]);
const box = (bg: string, shadow = 8) => ({ display: "flex", border: `5px solid ${INK}`, background: bg, boxShadow: `${shadow}px ${shadow}px 0 ${INK}` });

export function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const input = { role: sp.get("role") ?? "", experience: sp.get("exp") ?? "", city: sp.get("city") ?? "" };
  const host = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/^https?:\/\//, "");
  const download = sp.get("download") === "1";

  if (Object.keys(validate(input)).length) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", background: GREEN, padding: 80, color: INK, fontFamily: "Display" }}>
          <div style={{ fontSize: 96, lineHeight: 0.9, textTransform: "uppercase" }}>Learn AI. Earn more.</div>
          <div style={{ fontSize: 30, marginTop: 32, fontFamily: "Body", fontWeight: 700 }}>{host}</div>
        </div>
      ),
      { width: 1200, height: 630, fonts: fonts() },
    );
  }

  const c = cardSummary(calculate(input));
  const res = new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: PAPER, color: INK, padding: 44, fontFamily: "Body", fontWeight: 500 }}>
        <div style={{ ...box(GREEN, 12), flexDirection: "column", flex: 1.35, padding: 40, marginRight: 32 }}>
          <div style={{ display: "flex" }}>
            <div style={{ ...box("#fff", 4), fontFamily: "Display", fontSize: 24, padding: "4px 14px", transform: "rotate(-2deg)", textTransform: "uppercase" }}>₹ SalaryGap</div>
          </div>
          <div style={{ display: "flex", fontFamily: "Display", fontSize: 54, marginTop: 28, lineHeight: 0.95, textTransform: "uppercase" }}>{c.title}</div>
          <div style={{ display: "flex", fontSize: 26, marginTop: 10, fontWeight: 700 }}>{c.meta}</div>
          <div style={{ display: "flex", fontFamily: "Display", fontSize: c.headline.length > 16 ? 68 : 84, marginTop: 30, letterSpacing: -2, lineHeight: 1, whiteSpace: "nowrap" }}>{c.headline}</div>
          {/* Each clause stays on one line so "+₹4.6 L" never splits between "+" and "₹". */}
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 22, marginTop: 14, fontWeight: 700 }}>
            {c.sub.split(/(?<=[:,]) /).map((part, i) => (
              <div key={i} style={{ display: "flex", whiteSpace: "nowrap", marginRight: 7 }}>{part}</div>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 16 }}>{`Source: ${c.source} · ${c.disclaimer}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ ...box(LIME, 8), flexDirection: "column", padding: 28, flex: 1 }}>
            <div style={{ display: "flex", fontFamily: "Display", fontSize: 22, textTransform: "uppercase", letterSpacing: 2 }}>Skills I'm building</div>
            {c.skills.map((s, i) => (
              <div key={s} style={{ ...box("#fff", 4), alignItems: "center", marginTop: i === 0 ? 20 : 14, padding: "12px 16px", fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}>
                <div style={{ display: "flex", flexShrink: 0, width: 36, fontFamily: "Display", fontSize: 18 }}>{`0${i + 1}`}</div>
                <div style={{ display: "flex", flex: 1 }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ ...box(SUN, 6), marginTop: 22, padding: "14px 20px", fontFamily: "Display", fontSize: 26 }}>{host}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts: fonts() },
  );
  if (download) res.headers.set("Content-Disposition", `attachment; filename="ai-salary-gap.png"`);
  res.headers.set("Cache-Control", "public, max-age=86400");
  return res;
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { calculate, maxItGap, validate } from "./engine";
import { BENCHMARKS } from "./data/benchmarks";
import { ROLES } from "./data/roles";

test("validation catches missing and invalid fields", () => {
  const e = validate({ role: "", experience: "x", city: "Atlantis", ctc: "-3" });
  assert.ok(e.role && e.experience && e.city && e.ctc);
  assert.deepEqual(validate({ role: "Software Engineer", experience: "3-5", city: "Bengaluru", ctc: "" }), {});
  assert.ok(validate({ role: "x", experience: "3-5", city: "Pune", ctc: "abc" }).ctc);
});

test("like-for-like gap for software engineer uses same report and band", () => {
  const r = calculate({ role: "software-engineer", experience: "3-5", city: "Bengaluru" });
  assert.equal(r.comparison.kind, "gap");
  if (r.comparison.kind !== "gap") return;
  assert.equal(r.comparison.lowGap, 2.5); // 14.68 - 12.23 = 2.45 -> 2.5
  assert.equal(r.comparison.highGap, 3.4); // 23.64 - 20.26
  assert.equal(r.market!.source.id, r.aiSkilled!.source.id);
});

test("non-technical roles never get a fabricated gap", () => {
  for (const id of ["digital-marketer", "accountant", "content-writer", "designer"]) {
    const r = calculate({ role: id, experience: "6-10", city: "Mumbai" });
    assert.equal(r.comparison.kind, "separate", id);
    assert.equal(r.aiSkilled, null);
    assert.ok(r.market);
  }
});

test("unsupported and unknown roles return insufficient data", () => {
  assert.equal(calculate({ role: "hr", experience: "0-2", city: "Pune" }).comparison.kind, "insufficient");
  const r = calculate({ role: "Underwater Basket Weaver", experience: "0-2", city: "Pune", ctc: 4 });
  assert.equal(r.comparison.kind, "insufficient");
  assert.equal(r.market, null);
  assert.equal(r.ctcPosition, null);
  assert.equal(r.skills.length, 3);
});

test("custom text resolves via aliases", () => {
  assert.equal(calculate({ role: "Backend developer", experience: "0-2", city: "Pune" }).role?.id, "software-engineer");
});

test("ctc positioning", () => {
  const r = calculate({ role: "digital-marketer", experience: "0-2", city: "Delhi NCR", ctc: "2" });
  assert.equal(r.ctcPosition?.position, "below");
});

test("data integrity: every role has 3 skills and benchmarks are sane", () => {
  for (const b of BENCHMARKS) assert.ok(b.min > 0 && b.max > b.min, b.id);
  for (const role of ROLES) assert.equal(calculate({ role: role.id, experience: "3-5", city: "Pune" }).skills.length, 3);
});

test("headline framings derive only from the published ranges", () => {
  const r = calculate({ role: "software-engineer", experience: "0-2", city: "Pune" });
  assert.equal(r.comparison.kind, "gap");
  if (r.comparison.kind !== "gap") return;
  const c = r.comparison;
  assert.equal(c.lowPct, 58); // (7.92 - 5.02) / 5.02
  assert.equal(c.highPct, 49); // (13.76 - 9.23) / 9.23
  assert.equal(c.topPct, 58);
  assert.equal(c.fiveYearHigh, 22.7); // 4.53 * 5 = 22.65 -> 22.7
  assert.equal(c.fiveYearLow, 14.5); // 2.90 * 5
});

test("landing 'up to' figure equals the largest gap the calculator can show", () => {
  const best = maxItGap();
  assert.equal(best.pct, 192); // IT services, 0-3 yrs: (7.92 - 2.71) / 2.71
  assert.equal(best.label, "IT Services / Support Engineer");
  for (const role of ROLES) {
    const c = calculate({ role: role.id, experience: "0-2", city: "Pune" }).comparison;
    if (c.kind === "gap") assert.ok(c.topPct <= best.pct);
  }
});

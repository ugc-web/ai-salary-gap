import { test } from "node:test";
import assert from "node:assert/strict";
import { project } from "./projection";

const market = { min: 11.36, max: 17.83 }; // foundit Analytics, 4-6 yrs
const ai = { min: 14.68, max: 23.64 }; // foundit AI, 4-6 yrs

test("typical (no CTC): middle of role range maps to middle of AI range", () => {
  const p = project({ ctc: null, market, ai, nationalPct: 53 })!;
  assert.equal(p.basis, "typical");
  assert.equal(p.method, "like-for-like");
  assert.equal(p.today, 14.6); // (11.36 + 17.83) / 2 = 14.595
  assert.equal(p.withAi, 19.2); // (14.68 + 23.64) / 2 = 19.16
  assert.equal(p.uplift, 4.6);
  assert.equal(p.fiveYear, 23); // displayed uplift 4.6 * 5
  assert.equal(p.upTo, 23.64);
});

test("user CTC keeps their relative position; clamps outside the range", () => {
  const bottom = project({ ctc: 11.36, market, ai, nationalPct: 53 })!;
  assert.equal(bottom.withAi, 14.7);
  const below = project({ ctc: 6, market, ai, nationalPct: 53 })!;
  assert.equal(below.withAi, 14.7); // clamped to AI min, not extrapolated
  assert.equal(below.basis, "ctc");
});

test("earning above the AI equivalent never shows a negative uplift", () => {
  const p = project({ ctc: 40, market, ai, nationalPct: 53 })!;
  assert.equal(p.alreadyAbove, true);
  assert.equal(p.uplift, 0);
  assert.equal(p.withAi, 40);
});

test("roles without like-for-like data use the national premium, labelled as such", () => {
  const p = project({ ctc: 10, market: { min: 8, max: 12 }, ai: null, nationalPct: 53 })!;
  assert.equal(p.method, "national");
  assert.equal(p.withAi, 15.3);
  assert.equal(p.upTo, null);
});

test("no data and no CTC returns null; already-AI shows no uplift", () => {
  assert.equal(project({ ctc: null, market: null, ai: null, nationalPct: 53 }), null);
  assert.equal(project({ ctc: 20, market: ai, ai: null, nationalPct: 53, alreadyAi: true })!.uplift, 0);
});

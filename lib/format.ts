const opts = { minimumFractionDigits: 0, maximumFractionDigits: 2 };

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Figures are shown exactly as published (up to 2 dp), never re-rounded. */
export function lakh(n: number) {
  return `₹${n.toLocaleString("en-IN", opts)} L`;
}

export function range(min: number, max: number) {
  return `₹${min.toLocaleString("en-IN", opts)}–${max.toLocaleString("en-IN", opts)} L`;
}

export type QuoteJsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): QuoteJsonRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as QuoteJsonRecord)
    : null;
}

export function getString(rec: QuoteJsonRecord, key: string): string | null {
  const v = rec[key];
  return typeof v === "string" ? v : null;
}

export function getNumber(rec: QuoteJsonRecord, key: string): number | null {
  const v = rec[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

export function getArray(rec: QuoteJsonRecord, key: string): unknown[] | null {
  const v = rec[key];
  return Array.isArray(v) ? v : null;
}


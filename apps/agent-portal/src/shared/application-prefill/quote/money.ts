export function normalizeK(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const upper = trimmed.toUpperCase();
  if (upper === "DECLINED" || upper === "N") return null;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : null;
}

export function toMoneyK(amountK: number): string {
  if (amountK >= 1000) return `$${Math.round(amountK / 1000)}M`;
  return `$${Math.round(amountK)}K`;
}


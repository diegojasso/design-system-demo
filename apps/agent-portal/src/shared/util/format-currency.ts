export function formatCurrency(value: number | null | undefined, opts?: { currencySymbol?: string }): string {
  const symbol = opts?.currencySymbol ?? "$";
  if (value === null || value === undefined || !Number.isFinite(value)) return `${symbol}0`;
  return `${symbol}${value.toLocaleString("en-US")}`;
}


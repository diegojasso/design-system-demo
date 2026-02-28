export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const formatted = digits.match(/.{1,4}/g)?.join(" ") || digits;
  return formatted.slice(0, 19);
}

export function formatExpirationDate(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
}


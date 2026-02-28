import type { PrefillApplicant } from "./types";

export function toDate(value: string | Date | null | undefined): Date {
  if (value instanceof Date) return value;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      // Treat DOB as a calendar date (avoid timezone shifts).
      const ymd = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (ymd) {
        const year = Number(ymd[1]);
        const monthIndex = Number(ymd[2]) - 1;
        const day = Number(ymd[3]);
        const local = new Date(year, monthIndex, day);
        if (!Number.isNaN(local.getTime())) return local;
      }

      const d = new Date(trimmed);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }

  return new Date(1990, 0, 1);
}

export function toIsoDate(value: string | Date | null | undefined): string {
  return toDate(value).toISOString().slice(0, 10);
}

export function toString(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return String(value);
}

export function joinAddress(applicant: PrefillApplicant): string {
  const line1 = (applicant.addressLine1 ?? "").trim();
  const city = (applicant.city ?? "").trim();
  const state = (applicant.state ?? "").trim();
  const zip = (applicant.zip ?? "").trim();

  const cityStateZip = [city, [state, zip].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const base = [line1, cityStateZip].filter(Boolean).join(", ");
  return base ? `${base}, USA` : "";
}

export function formatUsPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return "";
  const ten = digits.length === 10 ? digits : digits.slice(-10);
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6, 10)}`;
}


import {
  BODILY_INJURY_OPTIONS,
  PROPERTY_DAMAGE_OPTIONS,
} from "@/features/components/coverage/types";

import { normalizeK, toMoneyK } from "./money";

export function formatBodilyInjury(value: string | null): string {
  if (!value) return BODILY_INJURY_OPTIONS[0];
  const parts = value.split("/").map((p) => Number(p));
  if (parts.length >= 2 && parts.every((n) => Number.isFinite(n))) {
    return `${toMoneyK(parts[0])}/${toMoneyK(parts[1])}`;
  }
  const single = normalizeK(value);
  return single ? toMoneyK(single) : BODILY_INJURY_OPTIONS[0];
}

export function formatPropertyDamage(value: string | null): string {
  const k = value ? normalizeK(value) : null;
  return k ? toMoneyK(k) : PROPERTY_DAMAGE_OPTIONS[0];
}

export function formatMedicalPayments(value: string | null): string {
  if (!value) return "Not Included";
  if (value.toUpperCase() === "DECLINED") return "Not Included";
  const k = normalizeK(value);
  return k ? toMoneyK(k) : "Not Included";
}

export function formatDeductible(value: string | null): string {
  if (!value) return "Not Included";
  if (value.toUpperCase() === "DECLINED") return "Not Included";
  const n = Number(value);
  if (!Number.isFinite(n)) return "Not Included";
  return `$${n.toLocaleString("en-US")}`;
}


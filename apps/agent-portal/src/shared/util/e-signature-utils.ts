import type { DocumentStatus } from "@/features/components/e-signature/types";

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getStatusBadgeVariant(status: DocumentStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case "awaiting-signature":
      return "secondary";
    case "signed":
      return "default";
    case "expired":
    case "cancelled":
      return "outline";
    default:
      return "secondary";
  }
}

export function getStatusBadgeText(status: DocumentStatus): string {
  switch (status) {
    case "awaiting-signature":
      return "Awaiting signature";
    case "signed":
      return "Signed";
    case "expired":
      return "Expired";
    case "cancelled":
      return "Cancelled";
    default:
      return "Unknown";
  }
}


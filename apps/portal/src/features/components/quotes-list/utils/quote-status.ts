import type { QuoteStatus } from "@/features/components/command-palette/quote-types"
import type { VariantProps } from "class-variance-authority"
import type { badgeVariants } from "@novo/ui"

/**
 * Get badge variant for quote status
 * Matches the colors used in command palette
 */
export function getStatusBadgeVariant(
  status: QuoteStatus
): VariantProps<typeof badgeVariants>["variant"] {
  // Status badges use outline variant with custom colors
  return "outline"
}

/**
 * Get status color classes (matching command palette)
 */
export function getStatusColorClasses(status: QuoteStatus): string {
  const statusColors: Record<QuoteStatus, string> = {
    draft: "bg-muted text-muted-foreground border-muted",
    pending: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20",
    sent: "bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20",
    accepted: "bg-green-500/10 text-green-600 dark:text-green-500 border-green-500/20",
    rejected: "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20",
  }
  return statusColors[status] || statusColors.draft
}

/**
 * Get display label for status
 */
export function getStatusLabel(status: QuoteStatus): string {
  const labels: Record<QuoteStatus, string> = {
    draft: "Draft",
    pending: "Pending",
    sent: "Sent",
    accepted: "Accepted",
    rejected: "Rejected",
  }
  return labels[status] || status
}

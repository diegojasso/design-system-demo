import type { ImportSummaryData } from "@/screens/components/import/mock-ezlynx-data"

export function getUnbindableImportCount(
  importSummary?: ImportSummaryData | null
): number {
  if (!importSummary) return 0

  return importSummary.missingInfo.filter((item) => {
    return !item.checked || item.severity === "error" || item.severity === "warning"
  }).length
}

export function isQuoteUnbindable(importSummary?: ImportSummaryData | null): boolean {
  return getUnbindableImportCount(importSummary) > 0
}

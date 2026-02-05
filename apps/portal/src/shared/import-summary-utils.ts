import type { ImportSummaryItem } from "../features/components/import/mock-ezlynx-data";

/**
 * Maps item details type to workflow stage.
 */
export function getWorkflowStage(
  item: ImportSummaryItem
): "quote" | "underwriting" | "bind" {
  if (item.workflowStage) {
    return item.workflowStage;
  }

  const type = item.details?.type;

  switch (type) {
    case "missing-vin":
      return "bind";
    case "coverage-gap":
    case "accident-history":
      return "underwriting";
    case "additional-driver":
      return "bind";
    default:
      if (item.severity === "error") {
        return "quote";
      }
      if (item.severity === "warning") {
        return "underwriting";
      }
      return "bind";
  }
}

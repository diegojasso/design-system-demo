"use client";

import { CheckCircle2 } from "lucide-react";
import { WorkflowStageGroup } from "./workflow-stage-group";
import { useMessages } from "@/shared/hooks/use-messages";
import type {
  ImportSummaryGroupedItems,
} from "./import-summary-types";
import type { ImportSummaryItem } from "./mock-ezlynx-data";

interface ActionRequiredSectionProps {
  groupedItems: ImportSummaryGroupedItems;
  onItemClick: (item: ImportSummaryItem) => void;
  onCheckboxChange: (itemId: string, checked: boolean) => void;
  onQuickResolve: (itemId: string) => void;
  onQuickDismiss: (itemId: string) => void;
  onVINSave: (item: ImportSummaryItem, vin: string) => Promise<void> | void;
}

export function ActionRequiredSection({
  groupedItems,
  onItemClick,
  onCheckboxChange,
  onQuickResolve,
  onQuickDismiss,
  onVINSave,
}: ActionRequiredSectionProps) {
  const t = useMessages();
  const actionRequiredId = "import-summary-action-required";
  const isEmpty =
    groupedItems.quote.length === 0 &&
    groupedItems.underwriting.length === 0 &&
    groupedItems.bind.length === 0;

  return (
    <section className="space-y-6" aria-labelledby={actionRequiredId}>
      <h2
        id={actionRequiredId}
        className="text-lg font-bold text-foreground"
      >
        {t("import-summary.action-required")}
      </h2>

      <div className="flex flex-col gap-6">
        {groupedItems.quote.length > 0 && (
          <WorkflowStageGroup
            stage="quote"
            items={groupedItems.quote}
            onItemClick={onItemClick}
            onCheckboxChange={onCheckboxChange}
            defaultExpanded={true}
            startIndex={0}
            onQuickResolve={onQuickResolve}
            onQuickDismiss={onQuickDismiss}
            showQuickActions={true}
            onVINSave={onVINSave}
          />
        )}

        {groupedItems.underwriting.length > 0 && (
          <WorkflowStageGroup
            stage="underwriting"
            items={groupedItems.underwriting}
            onItemClick={onItemClick}
            onCheckboxChange={onCheckboxChange}
            defaultExpanded={true}
            startIndex={groupedItems.quote.length}
            onQuickResolve={onQuickResolve}
            onQuickDismiss={onQuickDismiss}
            showQuickActions={true}
            onVINSave={onVINSave}
          />
        )}

        {groupedItems.bind.length > 0 && (
          <WorkflowStageGroup
            stage="bind"
            items={groupedItems.bind}
            onItemClick={onItemClick}
            onCheckboxChange={onCheckboxChange}
            defaultExpanded={true}
            startIndex={
              groupedItems.quote.length + groupedItems.underwriting.length
            }
            onQuickResolve={onQuickResolve}
            onQuickDismiss={onQuickDismiss}
            showQuickActions={true}
            onVINSave={onVINSave}
          />
        )}

        {isEmpty && (
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950">
            <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600 dark:text-green-400" />
            <p className="mb-1 text-lg font-semibold text-green-900 dark:text-green-100">
              {t("import-summary.all-requirements-met")}
            </p>
            <p className="text-sm text-green-700 dark:text-green-300">
              {t("import-summary.ready-to-proceed")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

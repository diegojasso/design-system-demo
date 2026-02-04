"use client";

import * as React from "react";
import type { ImportSummaryItem } from "./mock-ezlynx-data";
import type { ImportSummaryActions, ImportSummaryVm } from "./import-summary-types";
import { ActionRequiredSection } from "./action-required-section";
import { ClientsInformationSection } from "./clients-information-section";
import { CoverageGapModal } from "./coverage-gap-modal";
import { AccidentHistoryModal } from "./accident-history-modal";
import { ImportSummaryHeader } from "./import-summary-header";
import { TwoColumnLayout } from "./two-column-layout";
import { useMessages } from "@/shared/hooks/use-messages";

interface ImportSummaryProps {
  vm: ImportSummaryVm;
  actions: ImportSummaryActions;
}

export function ImportSummary({ vm, actions }: ImportSummaryProps) {
  const t = useMessages();
  const [selectedItem, setSelectedItem] = React.useState<ImportSummaryItem | null>(
    null
  );

  const handleItemClick = React.useCallback(
    (item: ImportSummaryItem) => {
      if (
        item.details?.type === "coverage-gap" ||
        item.details?.type === "accident-history"
      ) {
        setSelectedItem(item);
        return;
      }
      if (item.relatedSection) {
        actions.navigateToSection(item.relatedSection).catch(() => {});
      }
    },
    [actions]
  );

  const handleCheckboxChange = React.useCallback(
    (itemId: string, checked: boolean) => {
      actions.updateItemChecked(itemId, checked);
    },
    [actions]
  );

  const handleQuickResolve = React.useCallback(
    (itemId: string) => {
      actions.updateItemChecked(itemId, true);
    },
    [actions]
  );

  const handleQuickDismiss = React.useCallback(
    (itemId: string) => {
      actions.updateItemChecked(itemId, true);
    },
    [actions]
  );

  const handleVINSave = React.useCallback(
    async (item: ImportSummaryItem, vin: string) => {
      await actions.saveVinForItem(item, vin);
    },
    [actions]
  );

  const handleResolveCoverageGap = React.useCallback(
    (option: string) => {
      if (!selectedItem) return;
      actions.resolveCoverageGap(selectedItem.id, option);
      setSelectedItem(null);
    },
    [actions, selectedItem]
  );

  const handleVerifyAccidentHistory = React.useCallback(() => {
    if (!selectedItem) return;
    actions.verifyAccidentHistory(selectedItem.id);
    setSelectedItem(null);
  }, [actions, selectedItem]);

  const handleDownloadReport = React.useCallback(() => {
    if (!selectedItem) return;
    actions.downloadAccidentReport(selectedItem.id);
  }, [actions, selectedItem]);

  const handleCloseModal = React.useCallback(() => {
    setSelectedItem(null);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedItem) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, handleCloseModal]);

  const coverageGapData =
    selectedItem?.details?.type === "coverage-gap"
      ? selectedItem.details.data
      : null;
  const accidentHistoryData =
    selectedItem?.details?.type === "accident-history"
      ? selectedItem.details.data
      : null;

  const timelineEvents = React.useMemo(
    () =>
      vm.timelineEvents.map((event) => {
        let labelParams = event.labelParams;
        if (
          event.labelKey === "import-summary.timeline.report" &&
          labelParams?.status
        ) {
          const statusKey = `import-summary.timeline.status.${labelParams.status}` as const;
          labelParams = {
            ...labelParams,
            status: t(statusKey),
          };
        }
        return {
          ...event,
          label: t(event.labelKey, labelParams),
        };
      }),
    [t, vm.timelineEvents]
  );

  return (
    <div
      className="mb-8 flex w-full flex-col gap-6"
      aria-label={t("import-summary.aria-label")}
    >
      <ImportSummaryHeader
        quoteNumber={vm.header.quoteNumber}
        primaryAddress={vm.header.primaryAddress}
        premiumEstimate={vm.header.premiumEstimate}
        thirdPartyReports={vm.header.thirdPartyReports}
      />

      <TwoColumnLayout
        leftColumn={
          <ActionRequiredSection
            groupedItems={vm.groupedItems}
            onItemClick={handleItemClick}
            onCheckboxChange={handleCheckboxChange}
            onQuickResolve={handleQuickResolve}
            onQuickDismiss={handleQuickDismiss}
            onVINSave={handleVINSave}
          />
        }
        rightColumn={
          <ClientsInformationSection
            importedInfo={vm.importedInfo}
            timelineEvents={timelineEvents}
          />
        }
      />

      <CoverageGapModal
        open={selectedItem?.details?.type === "coverage-gap"}
        data={coverageGapData}
        clientName={vm.clientName}
        onResolve={handleResolveCoverageGap}
        onClose={handleCloseModal}
      />

      <AccidentHistoryModal
        open={selectedItem?.details?.type === "accident-history"}
        data={accidentHistoryData}
        onClose={handleCloseModal}
        onDownloadReport={handleDownloadReport}
        onVerify={handleVerifyAccidentHistory}
      />
    </div>
  );
}

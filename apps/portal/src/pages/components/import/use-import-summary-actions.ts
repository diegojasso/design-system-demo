import * as React from "react";
import { useQuote, type StepId } from "@/app/quote-context";
import type { ImportSummaryActions } from "./import-summary-types";
import type { ImportSummaryItem } from "./mock-ezlynx-data";

export function useImportSummaryActions(): ImportSummaryActions {
  const { quoteData, updateImportSummaryItem, setCurrentStep, updateVehicles } =
    useQuote();

  const navigateToSection = React.useCallback(
    async (step: StepId) => {
      await setCurrentStep(step);
    },
    [setCurrentStep]
  );

  const updateItemChecked = React.useCallback(
    (itemId: string, checked: boolean) => {
      updateImportSummaryItem?.(itemId, checked);
    },
    [updateImportSummaryItem]
  );

  const resolveCoverageGap = React.useCallback(
    (itemId: string, _option: string) => {
      updateImportSummaryItem?.(itemId, true);
    },
    [updateImportSummaryItem]
  );

  const verifyAccidentHistory = React.useCallback(
    (itemId: string) => {
      updateImportSummaryItem?.(itemId, true);
    },
    [updateImportSummaryItem]
  );

  const downloadAccidentReport = React.useCallback((_itemId: string) => {
    // Hook up to report download flow when available.
  }, []);

  const saveVinForItem = React.useCallback(
    async (item: ImportSummaryItem, vin: string) => {
      if (item.details?.type !== "missing-vin") return;
      const vehicleId = item.details.data?.vehicleId;
      if (!vehicleId || !quoteData.vehicles) return;
      const updatedVehicles = quoteData.vehicles.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, vin } : vehicle
      );
      updateVehicles(updatedVehicles);
    },
    [quoteData.vehicles, updateVehicles]
  );

  return {
    navigateToSection,
    updateItemChecked,
    resolveCoverageGap,
    verifyAccidentHistory,
    downloadAccidentReport,
    saveVinForItem,
  };
}

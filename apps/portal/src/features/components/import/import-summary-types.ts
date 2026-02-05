import type { StepId } from "@/app/quote-context";
import type { ImportSummaryData, ImportSummaryItem } from "./mock-ezlynx-data";

export type ImportSummaryTimelineEvent = {
  id: string;
  labelKey: string;
  labelParams?: Record<string, string | number>;
  status: "completed" | "pending" | "failed";
  timestamp: Date;
};

export type ImportSummaryGroupedItems = {
  quote: ImportSummaryItem[];
  underwriting: ImportSummaryItem[];
  bind: ImportSummaryItem[];
};

export type ImportSummaryVm = {
  header: {
    quoteNumber: string;
    primaryAddress: string;
    premiumEstimate?: ImportSummaryData["premiumEstimate"];
    thirdPartyReports: ImportSummaryData["thirdPartyReports"];
  };
  groupedItems: ImportSummaryGroupedItems;
  importedInfo: ImportSummaryData["importedInfo"];
  timelineEvents: ImportSummaryTimelineEvent[];
  clientName: string;
};

export type ImportSummaryActions = {
  navigateToSection: (step: StepId) => Promise<void>;
  updateItemChecked: (itemId: string, checked: boolean) => void;
  resolveCoverageGap: (itemId: string, option: string) => void;
  verifyAccidentHistory: (itemId: string) => void;
  downloadAccidentReport: (itemId: string) => void;
  saveVinForItem: (item: ImportSummaryItem, vin: string) => Promise<void> | void;
};

import type { ImportSummaryVm } from "../features/components/import/import-summary-types";
import type { ImportSummaryData } from "../features/components/import/mock-ezlynx-data";
import { getWorkflowStage } from "./import-summary-utils";

type BuildImportSummaryVmInput = {
  importSummary: ImportSummaryData;
  quoteNumber: string;
  primaryAddress: string;
  clientName: string;
};

export function buildImportSummaryVm({
  importSummary,
  quoteNumber,
  primaryAddress,
  clientName,
}: BuildImportSummaryVmInput): ImportSummaryVm {
  const groupedItems: ImportSummaryVm["groupedItems"] = {
    quote: [],
    underwriting: [],
    bind: [],
  };

  importSummary.missingInfo.forEach((item) => {
    const stage = getWorkflowStage(item);
    groupedItems[stage].push(item);
  });

  const timelineEvents: ImportSummaryVm["timelineEvents"] = [
    {
      id: "connect",
      labelKey: "import-summary.timeline.connected",
      status: "completed",
      timestamp: new Date(Date.now() - 5000),
    },
    {
      id: "fetch",
      labelKey: "import-summary.timeline.fetched",
      status: "completed",
      timestamp: new Date(Date.now() - 4000),
    },
    {
      id: "import-drivers",
      labelKey: "import-summary.timeline.import-drivers",
      labelParams: {
        count: importSummary.importedInfo.drivers.length,
        countSuffix: importSummary.importedInfo.drivers.length === 1 ? "" : "s",
      },
      status: "completed",
      timestamp: new Date(Date.now() - 3000),
    },
    {
      id: "import-vehicles",
      labelKey: "import-summary.timeline.import-vehicles",
      labelParams: {
        count: importSummary.importedInfo.vehicles.length,
        countSuffix: importSummary.importedInfo.vehicles.length === 1 ? "" : "s",
      },
      status: "completed",
      timestamp: new Date(Date.now() - 2000),
    },
  ];

  if (importSummary.thirdPartyReports) {
    importSummary.thirdPartyReports.reports.forEach((report) => {
      const status: "completed" | "pending" | "failed" =
        report.status === "completed"
          ? "completed"
          : report.status === "failed"
            ? "failed"
            : "pending";
      timelineEvents.push({
        id: `report-${report.type}`,
        labelKey: "import-summary.timeline.report",
        labelParams: { reportType: report.type.toUpperCase(), status },
        status,
        timestamp: new Date(Date.now() - 1000),
      });
    });
  }

  return {
    header: {
      quoteNumber,
      primaryAddress,
      premiumEstimate: importSummary.premiumEstimate,
      thirdPartyReports: importSummary.thirdPartyReports,
    },
    groupedItems,
    importedInfo: importSummary.importedInfo,
    timelineEvents,
    clientName,
  };
}

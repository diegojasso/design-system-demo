import { describe, expect, it } from "vitest";
import { buildImportSummaryVm } from "./import-summary-vm";
import { MOCK_EZLYNX_QUOTE } from "../pages/components/import/mock-ezlynx-data";

describe("buildImportSummaryVm", () => {
  it("builds grouped items and header data", () => {
    const vm = buildImportSummaryVm({
      importSummary: MOCK_EZLYNX_QUOTE.importSummary,
      quoteNumber: "Q-123",
      primaryAddress: "123 Main St",
      clientName: "Test Client",
    });

    const totalGroupedItems =
      vm.groupedItems.quote.length +
      vm.groupedItems.underwriting.length +
      vm.groupedItems.bind.length;

    expect(vm.header.quoteNumber).toBe("Q-123");
    expect(vm.header.primaryAddress).toBe("123 Main St");
    expect(vm.clientName).toBe("Test Client");
    expect(totalGroupedItems).toBe(MOCK_EZLYNX_QUOTE.importSummary.missingInfo.length);
    expect(vm.timelineEvents[0].labelKey).toBe("import-summary.timeline.connected");
  });
});

"use client";

import * as React from "react";
import { useQuote } from "@/app/quote-context";
import type { ImportSummaryData } from "./mock-ezlynx-data";
import { buildImportSummaryVm } from "@/shared/import-summary-vm";
import { ImportSummary } from "./import-summary";
import { ImportSummaryEmptyState } from "./import-summary-empty-state";
import { useImportSummaryActions } from "./use-import-summary-actions";

interface ImportSummaryContainerProps {
  data?: ImportSummaryData;
  quoteNumber?: string;
}

export function ImportSummaryContainer({
  data,
  quoteNumber,
}: ImportSummaryContainerProps) {
  const { quoteData } = useQuote();
  const importSummary = data || quoteData.importSummary;
  const actions = useImportSummaryActions();

  if (!importSummary) {
    return <ImportSummaryEmptyState />;
  }

  const clientName = `${quoteData.clientInfo?.firstName || ""} ${quoteData.clientInfo?.lastName || ""}`.trim();
  const vm = React.useMemo(
    () =>
      buildImportSummaryVm({
        importSummary,
        quoteNumber:
          quoteNumber ||
          quoteData.ezlynxQuoteNumber ||
          quoteData.id ||
          "",
        primaryAddress: quoteData.clientInfo?.address || "",
        clientName,
      }),
    [
      importSummary,
      quoteNumber,
      quoteData.ezlynxQuoteNumber,
      quoteData.id,
      quoteData.clientInfo?.address,
      clientName,
    ]
  );

  return <ImportSummary vm={vm} actions={actions} />;
}

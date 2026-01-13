"use client"

import { QuoteSaveStatus } from "./quote-save-status"
import { useQuote } from "@/app/contexts/quote-context"

export function QuoteHeader() {
  const { isSaving, lastSaved, saveError, retrySave, quoteData } = useQuote()

  const quoteTitle = quoteData.isImported && quoteData.ezlynxQuoteNumber
    ? `${quoteData.clientInfo?.firstName || ""} ${quoteData.clientInfo?.lastName || ""}'s Quote`.trim() || "Imported Quote"
    : "New Quote"

  return (
    <div className="mb-4 flex items-center justify-between">
      <h1
        className="text-[48px] font-semibold leading-none tracking-[-0.48px] text-foreground"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        {quoteTitle}
      </h1>
      <div className="flex items-center gap-3">
        <QuoteSaveStatus
          isSaving={isSaving}
          lastSaved={lastSaved}
          error={saveError}
          onRetry={retrySave}
        />
      </div>
    </div>
  )
}


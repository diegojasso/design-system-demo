"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { QuoteSaveStatus } from "./quote-save-status"
import { useQuote } from "@/app/contexts/quote-context"

export function QuoteHeader() {
  const { isSaving, lastSaved, saveError, retrySave } = useQuote()

  return (
    <div className="mb-4 flex items-center justify-between">
      <h1
        className="text-[48px] font-semibold leading-none tracking-[-0.48px] text-foreground"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        New Quote
      </h1>
      <div className="flex items-center gap-3">
        <QuoteSaveStatus
          isSaving={isSaving}
          lastSaved={lastSaved}
          error={saveError}
          onRetry={retrySave}
        />
        <ThemeToggle />
      </div>
    </div>
  )
}


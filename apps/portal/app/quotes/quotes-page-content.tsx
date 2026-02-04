"use client"

import * as React from "react"
import { QuotesList } from "@/screens/components/quotes-list/quotes-list"
import { MOCK_QUOTES } from "@/screens/components/quotes-list/mock-quotes"
import { useSearchParams, useRouter } from "next/navigation"
import { CommandPalette } from "@/screens/components/command-palette"

export function QuotesPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get initial values from URL params
  const initialSearch = searchParams.get("search") || ""
  const initialStatus = searchParams.get("status") || "all"
  const initialDate = searchParams.get("date") || "last-7-days"
  const initialAgency = searchParams.get("agency") || "all"
  const initialAgent = searchParams.get("agent") || "all"
  const initialPage = parseInt(searchParams.get("page") || "1", 10)

  // Command palette handlers
  const handleStartQuote = () => {
    router.push("/")
  }

  const handleOpenQuote = (quoteId: string) => {
    router.push(`/?quote=${quoteId}`)
  }

  const handleFilterStatus = (status: string) => {
    // Update URL params
    const params = new URLSearchParams(searchParams.toString())
    if (status === "all") {
      params.delete("status")
    } else {
      params.set("status", status)
    }
    // Keep other params
    params.set("page", "1") // Reset to first page when filtering
    router.push(`/quotes?${params.toString()}`)
  }

  const handleClearFilters = () => {
    router.push("/quotes")
  }

  return (
    <>
      <div className="flex h-screen w-full bg-background">
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-auto bg-background pb-0 pt-14">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 pt-10">
            {/* Quote List */}
            <QuotesList
              quotes={MOCK_QUOTES}
              initialFilters={{
                status: initialStatus as any,
                createdDate: initialDate as any,
                agency: initialAgency,
                agent: initialAgent,
              }}
              initialSearch={initialSearch}
              initialPagination={{
                page: initialPage,
              }}
            />
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isQuotesPage={true}
        availableQuotes={MOCK_QUOTES}
        onStartQuote={handleStartQuote}
        onOpenQuote={handleOpenQuote}
        onFilterStatus={handleFilterStatus}
        onClearFilters={handleClearFilters}
      />
    </>
  )
}

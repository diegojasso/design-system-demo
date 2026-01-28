"use client"

import * as React from "react"
import { QuoteHeader } from "./components/quote-header"
import { QuoteProgress } from "./components/quote-progress"
import { ClientInfoForm } from "./components/client-info-form"
import { DriversTable } from "./components/drivers-table/drivers-table"
import { VehiclesTable } from "./components/vehicles-table/vehicles-table"
import { IncidentsPage } from "./components/incidents/incidents-page"
import { ReportsPage } from "./components/reports/reports-page"
import { CoverageForm } from "./components/coverage/coverage-form"
import { PaymentForm } from "./components/payment/payment-form"
import { ESignatureForm } from "./components/e-signature/e-signature-form"
import { CommandPalette } from "./components/command-palette"
import { useQuote, StepId } from "./contexts/quote-context"
import { ImportSummary } from "./components/import/import-summary"
import { useRouter } from "next/navigation"
import { isQuoteUnbindable } from "./lib/quote-binding"

export default function Home() {
  const router = useRouter()
  const { quoteData, setCurrentStep, quoteId } = useQuote()
  const currentStep = quoteData.currentStep || (quoteData.isImported ? "import-summary" : "client-info")
  const isImported = quoteData.isImported
  const isUnbindable = isQuoteUnbindable(quoteData.importSummary)
  
  // Sync step changes to context (fire-and-forget save)
  const handleStepChange = React.useCallback((step: StepId) => {
    setCurrentStep(step).catch((error) => {
      console.error("Failed to save step change:", error)
    })
  }, [setCurrentStep])
  
  const currentQuoteId = quoteId || undefined

  // Save draft is now handled automatically via auto-save

  const handleFindClient = () => {
    // TODO: Implement find client functionality
    console.log("Finding client...")
    // In the future, this could:
    // - Open a client search modal/dialog
    // - Navigate to client search page
    // - Show client search results
  }

  const handleRunReports = () => {
    console.log("Running all reports (MVR + CLUE)...")
    // TODO: Implement report generation
  }

  const handleSendQuote = () => {
    console.log("Sending quote to client...")
    // TODO: Implement send quote functionality
  }

  const handleDownloadPDF = () => {
    console.log("Downloading PDF...")
    // TODO: Implement PDF generation and download
  }

  const handleOpenQuote = (quoteId: string) => {
    console.log("Opening quote:", quoteId)
    // TODO: Navigate to quote or load quote data
    // For now, just navigate to first step
    setCurrentStep("client-info")
  }

  const handleImportEzlynx = () => {
    router.push("/import/ezlynx")
  }

  return (
    <>
      <div className="flex h-screen w-full bg-background">
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-auto bg-background pb-0 pt-14">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 pt-10">

            {/* Page Header */}
            <QuoteHeader />

            {/* Progress Indicator */}
            <QuoteProgress 
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />

            {/* Step Content */}
            {currentStep === "import-summary" && <ImportSummary />}
            {currentStep === "client-info" && <ClientInfoForm />}
            {currentStep === "driver" && <DriversTable />}
            {currentStep === "vehicle" && <VehiclesTable />}
            {currentStep === "incidents" && <IncidentsPage />}
            {currentStep === "reports" && <ReportsPage />}
            {currentStep === "coverage" && <CoverageForm />}
            {currentStep === "payment" && <PaymentForm />}
            {currentStep === "e-sign" && <ESignatureForm />}
            {currentStep === "review" && (
              <div className="mb-8 w-full text-center text-muted-foreground py-12">
                Review step - Coming soon
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onFindClient={handleFindClient}
        currentQuoteId={currentQuoteId}
        isImported={isImported}
        isUnbindable={isUnbindable}
        onRunReports={handleRunReports}
        onSendQuote={handleSendQuote}
        onDownloadPDF={handleDownloadPDF}
        onImportEzlynx={handleImportEzlynx}
        onOpenQuote={handleOpenQuote}
      />
    </>
  )
}

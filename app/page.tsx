"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppSidebar } from "./components/app-sidebar"
import { QuoteHeader } from "./components/quote-header"
import { QuoteProgress } from "./components/quote-progress"
import { ClientInfoForm } from "./components/client-info-form"
import { DriversTable } from "./components/drivers-table/drivers-table"
import { VehiclesTable } from "./components/vehicles-table/vehicles-table"
import { QuoteNavigation } from "./components/quote-navigation"
import { CommandPalette } from "./components/command-palette"

type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "review"

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState<StepId>("client-info")
  // Mock quote ID - in real app, this would come from quote state/context
  const currentQuoteId = React.useMemo(() => {
    // For demo purposes, generate a quote ID if we're in the workflow
    return currentStep ? "quote-123" : undefined
  }, [currentStep])

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log("Saving draft...")
    // In the future, this could:
    // - Save quote data to localStorage or backend
    // - Show a toast notification
    // - Update UI to indicate draft is saved
  }

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

  return (
    <>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar - Hidden */}
        {/* <AppSidebar /> */}

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-auto bg-background pb-0 pt-[88px]">
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6">
            {/* Breadcrumbs */}
            <Breadcrumb>
              <BreadcrumbList className="gap-1.5">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-base leading-[1.5] text-muted-foreground hover:text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="text-base leading-[1.5] text-foreground underline decoration-muted-foreground decoration-solid underline-offset-4 hover:text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Quotes
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className="text-base leading-[1.5] text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    New Quote
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page Header */}
            <QuoteHeader />

            {/* Progress Indicator */}
            <QuoteProgress 
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />

            {/* Step Content */}
            {currentStep === "client-info" && <ClientInfoForm />}
            {currentStep === "driver" && <DriversTable />}
            {currentStep === "vehicle" && <VehiclesTable />}
            {currentStep === "coverage" && (
              <div className="mb-8 w-full text-center text-muted-foreground py-12">
                Coverage step - Coming soon
              </div>
            )}
            {currentStep === "review" && (
              <div className="mb-8 w-full text-center text-muted-foreground py-12">
                Review step - Coming soon
              </div>
            )}

            {/* Navigation Buttons */}
            <QuoteNavigation 
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onSaveDraft={handleSaveDraft}
        onFindClient={handleFindClient}
        currentQuoteId={currentQuoteId}
        onRunReports={handleRunReports}
        onSendQuote={handleSendQuote}
        onDownloadPDF={handleDownloadPDF}
        onOpenQuote={handleOpenQuote}
      />
    </>
  )
}

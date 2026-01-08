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

type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "review"

export default function Home() {
  const [currentStep, setCurrentStep] = React.useState<StepId>("client-info")

  return (
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
  )
}

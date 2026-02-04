"use client"

import * as React from "react"
import { Button } from "@novo/ui"
import { Label } from "@novo/ui"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@novo/ui"
import { Card, CardContent } from "@novo/ui"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@novo/ui"
import { Download, Check, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react"
import { CoverageData, PricingSummary } from "./types"
import { PRICING_PLANS, calculatePlanPricing } from "./pricing-calculator"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@novo/ui"
import { useQuote } from "@/app/quote-context"
import { cn } from "@/shared/utils"
import { getUnbindableImportCount, isQuoteUnbindable } from "@/shared/quote-binding"

interface PricingSummarySectionProps {
  coverage: CoverageData
  pricing: PricingSummary
  onPricingChange: (field: keyof PricingSummary, value: any) => void
  onCollectPayment: () => void
  onDownloadPDF: () => void
}

export function PricingSummarySection({
  coverage,
  pricing,
  onPricingChange,
  onCollectPayment,
  onDownloadPDF,
}: PricingSummarySectionProps) {
  const { quoteData, setCurrentStep } = useQuote()
  const [isPlanDetailsExpanded, setIsPlanDetailsExpanded] = React.useState(false)
  
  const calculatedPricing = calculatePlanPricing(
    pricing.selectedPlanId,
    coverage,
    pricing.paymentFrequency
  )

  const selectedPlan = PRICING_PLANS.find((p) => p.id === pricing.selectedPlanId) || PRICING_PLANS[0]

  // Check for unresolved import summary items
  // Unresolved = items with checked: false OR items with error/warning severity (UW block)
  const hasUnresolvedItems = React.useMemo(() => {
    return isQuoteUnbindable(quoteData.importSummary)
  }, [quoteData.importSummary])

  const unresolvedCount = React.useMemo(() => {
    return getUnbindableImportCount(quoteData.importSummary)
  }, [quoteData.importSummary])

  const handleJumpToImportSummary = () => {
    setCurrentStep("import-summary")
  }

  // Generate start date options (next 30 days)
  const startDateOptions = React.useMemo(() => {
    const dates: string[] = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }, [])

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return format(date, "MM/dd/yyyy")
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-4">
      {/* Plan Options */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
          Plan Options
        </Label>
        <div className="flex flex-wrap items-center gap-1 rounded-lg border bg-muted/40 p-1">
          {PRICING_PLANS.map((plan) => {
            const isSelected = plan.id === pricing.selectedPlanId
            const planPricing = calculatePlanPricing(plan.id, coverage, pricing.paymentFrequency)

            return (
              <button
                key={plan.id}
                onClick={() => onPricingChange("selectedPlanId", plan.id)}
                className={cn(
                  "flex flex-1 items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition",
                  isSelected
                    ? "bg-background text-foreground shadow-sm ring-1 ring-purple-500/50"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span className="font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {plan.name}
                </span>
                <span className="text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  ${planPricing.monthlyPrice}/mo
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Plan Details */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-4 space-y-3">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:gap-6">
            <div className="space-y-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-semibold text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ${calculatedPricing.monthlyPrice}
                  </span>
                  <span
                    className="text-base text-muted-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    /mo
                  </span>
                </div>
                <p
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Total for {pricing.paymentFrequency === "Monthly" ? "6 months" : pricing.paymentFrequency === "Semi-Annual" ? "6 months" : "12 months"}: ${calculatedPricing.totalForPeriod}
                </p>
                <p
                  className="text-sm text-muted-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Down payment: ${calculatedPricing.downPayment}
                </p>
              </div>

              {/* About Plan - Collapsible */}
              <Collapsible open={isPlanDetailsExpanded} onOpenChange={setIsPlanDetailsExpanded}>
                <div className="border-t border-border pt-3">
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full text-left">
                      <h3
                        className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        About {selectedPlan.name}
                      </h3>
                      {isPlanDetailsExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 space-y-2">
                    <ul className="space-y-1.5">
                      {selectedPlan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-1">
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                        style={{ fontFamily: "Inter, sans-serif" }}
                        onClick={(e) => {
                          e.preventDefault()
                          // TODO: Implement plan comparison
                          console.log("Compare plans")
                        }}
                      >
                        Compare all plans
                      </a>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>

            <div className="space-y-3 md:border-l md:border-border md:pl-6">
              {/* Start Date */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="start-date"
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Start Date
                </Label>
                <Select
                  value={pricing.startDate}
                  onValueChange={(value) => onPricingChange("startDate", value)}
                >
                  <SelectTrigger id="start-date" className="w-full">
                    <SelectValue placeholder="Select start date" />
                  </SelectTrigger>
                  <SelectContent>
                    {startDateOptions.map((date) => (
                      <SelectItem key={date} value={date}>
                        {formatDate(date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Frequency */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="payment-frequency"
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Payment Frequency
                </Label>
                <Select
                  value={pricing.paymentFrequency}
                  onValueChange={(value: PricingSummary["paymentFrequency"]) =>
                    onPricingChange("paymentFrequency", value)
                  }
                >
                  <SelectTrigger id="payment-frequency" className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  onClick={onCollectPayment}
                  disabled={hasUnresolvedItems}
                  className={cn(
                    "w-full bg-green-600 hover:bg-green-700 text-white",
                    hasUnresolvedItems && "opacity-50 cursor-not-allowed"
                  )}
                >
                  Collect Payment & Bind
                </Button>
                <Button
                  variant="outline"
                  onClick={onDownloadPDF}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Quote as PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Bind Blocking Banner */}
          {hasUnresolvedItems && (
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription className="text-sm text-amber-900 dark:text-amber-100 space-y-2">
                <div>
                  Cannot bind policy: {unresolvedCount} unresolved item{unresolvedCount !== 1 ? "s" : ""} from import summary must be resolved before binding. You can still view and adjust coverage settings.
                </div>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-amber-900 dark:text-amber-100"
                  onClick={handleJumpToImportSummary}
                >
                  View all in Import Summary
                </Button>
              </AlertDescription>
            </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  )
}

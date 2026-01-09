"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Check } from "lucide-react"
import { CoverageData, PricingSummary } from "./types"
import { PRICING_PLANS, calculatePlanPricing } from "./pricing-calculator"
import { format } from "date-fns"

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
  const calculatedPricing = calculatePlanPricing(
    pricing.selectedPlanId,
    coverage,
    pricing.paymentFrequency
  )

  const selectedPlan = PRICING_PLANS.find((p) => p.id === pricing.selectedPlanId) || PRICING_PLANS[0]

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
    <div className="space-y-6">
      <h2
        className="text-lg font-semibold text-foreground"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Pricing Summary
      </h2>

      {/* Plan Options */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
          Plan Options
        </Label>
        <div className="grid grid-cols-1 gap-2">
          {PRICING_PLANS.map((plan) => {
            const isSelected = plan.id === pricing.selectedPlanId
            const planPricing = calculatePlanPricing(plan.id, coverage, pricing.paymentFrequency)
            
            return (
              <button
                key={plan.id}
                onClick={() => onPricingChange("selectedPlanId", plan.id)}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  isSelected
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                    : "border-border hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSelected && <Check className="h-4 w-4 text-purple-600" />}
                    <span
                      className="text-sm font-medium text-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {plan.name}
                    </span>
                  </div>
                  <span
                    className="text-sm text-muted-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ${planPricing.monthlyPrice}/mo
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Plan Details */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-6 space-y-4">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span
                className="text-3xl font-semibold text-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                ${calculatedPricing.monthlyPrice}
              </span>
              <span
                className="text-lg text-muted-foreground"
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

          {/* Start Date */}
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2 pt-2">
            <Button
              onClick={onCollectPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Collect Payment & Bind
            </Button>
            <Button
              variant="outline"
              onClick={onDownloadPDF}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download as PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Plan */}
      <div className="space-y-2">
        <h3
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          About {selectedPlan.name}
        </h3>
        <ul className="space-y-1 list-disc list-inside">
          {selectedPlan.features.map((feature, index) => (
            <li
              key={index}
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {feature}
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="text-sm text-blue-600 hover:underline"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Compare all plans
        </a>
      </div>
    </div>
  )
}

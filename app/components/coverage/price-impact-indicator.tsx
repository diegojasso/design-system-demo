"use client"

import * as React from "react"
import { ArrowUp, ArrowDown, Minus, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { calculateCumulativeImpact } from "./price-impact"
import { CoverageData, PricingSummary } from "./types"

interface PriceImpactIndicatorProps {
  currentCoverage: CoverageData
  newCoverage: CoverageData
  pricing: PricingSummary
  className?: string
}

export function PriceImpactIndicator({
  currentCoverage,
  newCoverage,
  pricing,
  className,
}: PriceImpactIndicatorProps) {
  const impact = React.useMemo(() => {
    return calculateCumulativeImpact(
      currentCoverage,
      newCoverage,
      pricing.paymentFrequency
    )
  }, [currentCoverage, newCoverage, pricing.paymentFrequency])

  // Only show if there's a meaningful change (> $0.50)
  if (Math.abs(impact.monthlyImpact) < 0.5) {
    return null
  }

  const isIncrease = impact.monthlyImpact > 0
  const isDecrease = impact.monthlyImpact < 0

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium",
        isIncrease && "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400",
        isDecrease && "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400",
        !isIncrease && !isDecrease && "bg-muted text-muted-foreground",
        className
      )}
    >
      {isIncrease ? (
        <ArrowUp className="h-4 w-4" />
      ) : isDecrease ? (
        <ArrowDown className="h-4 w-4" />
      ) : (
        <Minus className="h-4 w-4" />
      )}
      <span>
        {isIncrease ? "+" : ""}${Math.abs(impact.monthlyImpact).toFixed(0)}/mo
      </span>
      {Math.abs(impact.percentageChange) > 1 && (
        <span className="text-xs opacity-75">
          ({isIncrease ? "+" : ""}
          {impact.percentageChange.toFixed(1)}%)
        </span>
      )}
    </div>
  )
}

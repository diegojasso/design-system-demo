"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useQuote, StepId } from "@/app/contexts/quote-context"
import { AlertTriangle } from "lucide-react"

export const steps = [
  {
    id: "client-info",
    label: "Basic Info",
  },
  {
    id: "vehicle",
    label: "Vehicles",
  },
  {
    id: "driver",
    label: "Drivers",
  },
  {
    id: "coverage",
    label: "Coverages",
  },
  {
    id: "payment",
    label: "Checkout",
  },
  {
    id: "e-sign",
    label: "E-Sign",
  },
  {
    id: "review",
    label: "Review",
  },
] as const

interface QuoteProgressProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
}

export function QuoteProgress({ 
  currentStep = "client-info",
  onStepChange 
}: QuoteProgressProps) {
  const { quoteData } = useQuote()
  const activeTabRef = React.useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
  })

  const isImported = quoteData.isImported
  const hasUncheckedItems = quoteData.importSummary?.missingInfo.some(item => !item.checked) ?? false

  // Calculate indicator position when active tab changes
  React.useEffect(() => {
    if (activeTabRef.current) {
      const { offsetLeft, offsetWidth } = activeTabRef.current
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      })
    }
  }, [currentStep])

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (activeTabRef.current) {
        const { offsetLeft, offsetWidth } = activeTabRef.current
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentStep])

  const allSteps = isImported
    ? [
        { id: "import-summary", label: "Import Summary" },
        ...steps,
      ]
    : steps

  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      {/* Enhanced Tab Navigation */}
      <div className="relative flex items-center gap-0 border-b border-border">
        {/* Animated Sliding Underline Indicator */}
        <div
          className="absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-in-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            transform: "translateZ(0)", // Force GPU acceleration
          }}
        />

        {/* Tabs */}
        {allSteps.map((step) => {
          const isActive = step.id === currentStep
          const showWarning = step.id === "import-summary" && hasUncheckedItems
          
          return (
            <button
              key={step.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onStepChange?.(step.id as StepId)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3.5 text-sm font-medium transition-all duration-200 ease-out",
                "hover:bg-muted/50 hover:text-foreground hover:scale-[1.01]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "active:scale-[0.99]",
                isActive
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground bg-transparent"
              )}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {step.label}
              {showWarning && (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}


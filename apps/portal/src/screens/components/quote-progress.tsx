"use client"

import * as React from "react"
import { cn } from "@/shared/utils"
import { useQuote, StepId } from "@/app/quote-context"
import { AlertTriangle } from "lucide-react"
import { findActiveGroup, getQuoteNavigation } from "@/screens/components/quote-steps"

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

  const groups = getQuoteNavigation({ isImported })
  const activeGroup = findActiveGroup(groups, currentStep) ?? groups[0]

  return (
    <div className="sticky top-0 z-20 mb-8 flex w-full flex-col gap-4 bg-background">
      {/* Level 1 Navigation */}
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
        {groups.map((group) => {
          const isActive = group.id === activeGroup?.id
          const showWarning = group.id === "import-summary" && hasUncheckedItems
          
          return (
            <button
              key={group.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onStepChange?.(group.primaryStepId as StepId)}
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
              {group.label}
              {showWarning && (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              )}
            </button>
          )
        })}
      </div>

      {/* Level 2 Navigation */}
      {activeGroup?.children && activeGroup.children.length > 0 && (
        <div className="flex w-full items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-1">
          {activeGroup.children.map((child) => {
            const isChildActive = child.id === currentStep

            return (
              <button
                key={child.id}
                onClick={() => onStepChange?.(child.id as StepId)}
                role="tab"
                aria-selected={isChildActive}
                aria-current={isChildActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isChildActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {child.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}


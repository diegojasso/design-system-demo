"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

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
    id: "review",
    label: "Review",
  },
] as const

export type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "payment" | "review"

interface QuoteProgressProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
}

export function QuoteProgress({ 
  currentStep = "client-info",
  onStepChange 
}: QuoteProgressProps) {
  const activeTabRef = React.useRef<HTMLButtonElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
  })

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
        {steps.map((step) => {
          const isActive = step.id === currentStep
          
          return (
            <button
              key={step.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onStepChange?.(step.id as StepId)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative px-6 py-3.5 text-sm font-medium transition-all duration-200 ease-out",
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
            </button>
          )
        })}
      </div>
    </div>
  )
}


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
    id: "review",
    label: "Review",
  },
] as const

type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "review"

interface QuoteProgressProps {
  currentStep?: StepId
  onStepChange?: (step: StepId) => void
}

export function QuoteProgress({ 
  currentStep = "client-info",
  onStepChange 
}: QuoteProgressProps) {
  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      {/* Simple Tab Navigation */}
      <div className="flex items-center gap-0 border-b border-border">
        {steps.map((step) => {
          const isActive = step.id === currentStep
          
          return (
            <button
              key={step.id}
              onClick={() => onStepChange?.(step.id as StepId)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors",
                "relative",
                "hover:text-foreground",
                isActive
                  ? "text-primary-foreground bg-primary"
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


import { User, Car, Shield, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export const steps = [
  {
    id: "client-info",
    label: "Client Info",
    icon: User,
  },
  {
    id: "vehicle",
    label: "Vehicle",
    icon: Car,
  },
  {
    id: "driver",
    label: "Driver",
    icon: User,
  },
  {
    id: "coverage",
    label: "Coverage",
    icon: Shield,
  },
  {
    id: "review",
    label: "Review",
    icon: FileText,
  },
] as const

interface QuoteProgressProps {
  currentStep?: "client-info" | "vehicle" | "driver" | "coverage" | "review"
}

export function QuoteProgress({ currentStep = "client-info" }: QuoteProgressProps) {
  const activeStepIndex = steps.findIndex((step) => step.id === currentStep)
  const progressPercentage = ((activeStepIndex + 1) / steps.length) * 100

  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      {/* Steps */}
      <div className="flex h-[68px] items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === steps.length - 1
          const isActive = step.id === currentStep

          return (
            <div key={step.id} className="flex flex-1 items-center gap-4">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 p-0.5 shrink-0",
                    isActive
                      ? "border-black bg-black"
                      : "border-[#cdd7e1] bg-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-white" : "text-[#555e68]"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-sm leading-5 whitespace-nowrap",
                    isActive
                      ? "font-medium text-black"
                      : "font-normal text-[#555e68]"
                  )}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="h-px flex-1 bg-[#cdd7e1]" />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(11,107,203,0.2)]">
        <div
          className="h-2 rounded-full bg-black transition-all"
          style={{ width: `${progressPercentage}%`, maxWidth: "100%" }}
        />
      </div>
    </div>
  )
}


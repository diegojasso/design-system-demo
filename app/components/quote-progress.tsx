import { User, Car, Shield, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "client-info",
    label: "Client Info",
    icon: User,
    active: true,
  },
  {
    id: "vehicle",
    label: "Vehicle",
    icon: Car,
    active: false,
  },
  {
    id: "driver",
    label: "Driver",
    icon: User,
    active: false,
  },
  {
    id: "coverage",
    label: "Coverage",
    icon: Shield,
    active: false,
  },
  {
    id: "review",
    label: "Review",
    icon: FileText,
    active: false,
  },
]

export function QuoteProgress() {
  return (
    <div className="mb-8 flex w-full flex-col gap-4">
      {/* Steps */}
      <div className="flex h-[68px] items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex flex-1 items-center gap-4">
              <div className="flex flex-col items-center gap-2 shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 p-0.5 shrink-0",
                    step.active
                      ? "border-black bg-black"
                      : "border-[#cdd7e1] bg-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      step.active ? "text-white" : "text-[#555e68]"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-sm leading-5 whitespace-nowrap",
                    step.active
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
          className="h-2 w-full rounded-full bg-black transition-all"
          style={{ width: "20%", maxWidth: "100%" }}
        />
      </div>
    </div>
  )
}


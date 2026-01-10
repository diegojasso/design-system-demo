import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { steps } from "./quote-progress"
import type { StepId } from "../contexts/quote-context"

interface QuoteNavigationProps {
  currentStep: StepId
  onStepChange: (step: StepId) => void
}

export function QuoteNavigation({ currentStep, onStepChange }: QuoteNavigationProps) {
  // Only show navigation for client-info step
  if (currentStep !== "client-info") {
    return null
  }

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const isFirstStep = currentStepIndex === 0

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1]
      onStepChange(nextStep.id as StepId)
    }
  }

  return (
    <div className="flex h-9 items-center justify-end">
      <Button
        variant="default"
        size="lg"
        onClick={handleNext}
        className="h-9 gap-2"
      >
        Start Quote
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}


import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { steps } from "./quote-progress"

type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "review"

interface QuoteNavigationProps {
  currentStep: StepId
  onStepChange: (step: StepId) => void
}

export function QuoteNavigation({ currentStep, onStepChange }: QuoteNavigationProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1]
      onStepChange(previousStep.id as StepId)
    }
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1]
      onStepChange(nextStep.id as StepId)
    }
  }

  return (
    <div className="flex h-9 items-center justify-between">
      <Button
        variant="secondary"
        size="lg"
        disabled={isFirstStep}
        onClick={handlePrevious}
        className="h-9 gap-2"
      >
        <ChevronLeft className="h-5 w-5" />
        Previous
      </Button>
      <Button
        variant="default"
        size="lg"
        disabled={isLastStep}
        onClick={handleNext}
        className="h-9 gap-2"
      >
        Next
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}


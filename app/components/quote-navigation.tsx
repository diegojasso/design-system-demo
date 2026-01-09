import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { steps } from "./quote-progress"

type StepId = "client-info" | "vehicle" | "driver" | "coverage" | "payment" | "review"

interface QuoteNavigationProps {
  currentStep: StepId
  onStepChange: (step: StepId) => void
}

export function QuoteNavigation({ currentStep, onStepChange }: QuoteNavigationProps) {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1
  const isPaymentStep = currentStep === "payment"

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

  const handleBind = () => {
    // TODO: Implement bind functionality
    console.log("Binding policy...")
    // For now, proceed to next step
    handleNext()
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
        {isPaymentStep ? "Back" : "Previous"}
      </Button>
      <Button
        variant="default"
        size="lg"
        disabled={isLastStep}
        onClick={isPaymentStep ? handleBind : handleNext}
        className="h-9 gap-2"
      >
        {isPaymentStep ? "Bind" : "Next"}
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}


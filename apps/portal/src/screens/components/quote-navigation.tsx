"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@novo/ui"
import { getQuoteProgressSteps } from "./quote-steps"
import { useQuote, type StepId } from "@/app/quote-context"

interface QuoteNavigationProps {
  currentStep: StepId
  onStepChange: (step: StepId) => void
}

export function QuoteNavigation({ currentStep, onStepChange }: QuoteNavigationProps) {
  const { quoteData } = useQuote()

  // Only show navigation for client-info step
  if (currentStep !== "client-info") {
    return null
  }

  const steps = getQuoteProgressSteps({ isImported: quoteData.isImported })
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


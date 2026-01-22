import type { StepId } from "@/app/contexts/quote-context"

export type QuoteStep = {
  id: StepId
  label: string
}

const baseSteps: QuoteStep[] = [
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
    label: "Payment",
  },
  {
    id: "e-sign",
    label: "E-Sign",
  },
]

const importSummaryStep: QuoteStep = {
  id: "import-summary",
  label: "Import Summary",
}

export function getQuoteProgressSteps({
  isImported,
}: {
  isImported?: boolean
}): QuoteStep[] {
  if (isImported) {
    return [importSummaryStep, ...baseSteps]
  }
  return baseSteps
}

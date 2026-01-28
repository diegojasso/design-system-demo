import type { StepId } from "@/app/contexts/quote-context"

export type QuoteStep = {
  id: StepId
  label: string
}

export type QuoteNavGroupId =
  | "import-summary"
  | "basic-info"
  | "household"
  | "coverages"
  | "bind"

export type QuoteNavGroup = {
  id: QuoteNavGroupId
  label: string
  primaryStepId: StepId
  children?: QuoteStep[]
}

const householdChildren: QuoteStep[] = [
  {
    id: "vehicle",
    label: "Vehicles",
  },
  {
    id: "driver",
    label: "Drivers",
  },
  {
    id: "incidents",
    label: "Incidents",
  },
  {
    id: "reports",
    label: "Reports",
  },
]

const bindChildren: QuoteStep[] = [
  {
    id: "payment",
    label: "Payment",
  },
  {
    id: "e-sign",
    label: "E-Sign",
  },
]

const importSummaryGroup: QuoteNavGroup = {
  id: "import-summary",
  label: "Import summary",
  primaryStepId: "import-summary",
}

const basicInfoGroup: QuoteNavGroup = {
  id: "basic-info",
  label: "Basic information",
  primaryStepId: "client-info",
}

const householdGroup: QuoteNavGroup = {
  id: "household",
  label: "Household",
  primaryStepId: "vehicle",
  children: householdChildren,
}

const coveragesGroup: QuoteNavGroup = {
  id: "coverages",
  label: "Coverages",
  primaryStepId: "coverage",
}

const bindGroup: QuoteNavGroup = {
  id: "bind",
  label: "Bind",
  primaryStepId: "payment",
  children: bindChildren,
}

export function getQuoteNavigation({
  isImported,
}: {
  isImported?: boolean
}): QuoteNavGroup[] {
  if (isImported) {
    return [importSummaryGroup, householdGroup, coveragesGroup, bindGroup]
  }
  return [basicInfoGroup, householdGroup, coveragesGroup, bindGroup]
}

export function getQuoteProgressSteps({
  isImported,
}: {
  isImported?: boolean
}): QuoteStep[] {
  const groups = getQuoteNavigation({ isImported })
  return groups.flatMap((group) => {
    if (group.children && group.children.length > 0) {
      return group.children
    }
    return [
      {
        id: group.primaryStepId,
        label: group.label,
      },
    ]
  })
}

export function findActiveGroup(
  groups: QuoteNavGroup[],
  currentStep?: StepId
): QuoteNavGroup | undefined {
  if (!currentStep) return undefined
  return groups.find((group) => {
    if (group.primaryStepId === currentStep) return true
    return group.children?.some((child) => child.id === currentStep)
  })
}

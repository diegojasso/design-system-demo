// Real-time price impact calculation and visualization
import { CoverageData, LiabilityCoverage, AdditionalCoverage, VehicleCoverage } from "./types"
import { calculatePlanPricing } from "./pricing-calculator"

export interface PriceImpact {
  field: string
  label: string
  currentValue: any
  newValue: any
  monthlyImpact: number
  annualImpact: number
  percentageChange: number
}

export interface PriceComparison {
  option: string
  value: any
  monthlyPrice: number
  impact: number // Difference from current
  isSelected: boolean
}

// Calculate price impact of a single change
export function calculatePriceImpact(
  currentCoverage: CoverageData,
  newCoverage: CoverageData,
  paymentFrequency: "Monthly" | "Semi-Annual" | "Annual" = "Monthly"
): PriceImpact[] {
  const impacts: PriceImpact[] = []

  // Calculate current total price
  const currentPricing = calculatePlanPricing(
    "novo-next", // Use default plan for comparison
    currentCoverage,
    paymentFrequency
  )

  // Calculate new total price
  const newPricing = calculatePlanPricing(
    "novo-next",
    newCoverage,
    paymentFrequency
  )

  const monthlyDiff = newPricing.monthlyPrice - currentPricing.monthlyPrice
  const annualDiff = monthlyDiff * 12

  // Check liability changes
  if (currentCoverage.liability.bodilyInjury !== newCoverage.liability.bodilyInjury) {
    impacts.push({
      field: "bodilyInjury",
      label: "Bodily Injury",
      currentValue: currentCoverage.liability.bodilyInjury,
      newValue: newCoverage.liability.bodilyInjury,
      monthlyImpact: monthlyDiff,
      annualImpact: annualDiff,
      percentageChange: (monthlyDiff / currentPricing.monthlyPrice) * 100,
    })
  }

  if (currentCoverage.liability.propertyDamage !== newCoverage.liability.propertyDamage) {
    impacts.push({
      field: "propertyDamage",
      label: "Property Damage",
      currentValue: currentCoverage.liability.propertyDamage,
      newValue: newCoverage.liability.propertyDamage,
      monthlyImpact: monthlyDiff,
      annualImpact: annualDiff,
      percentageChange: (monthlyDiff / currentPricing.monthlyPrice) * 100,
    })
  }

  // Check additional coverage changes
  if (
    currentCoverage.additional.medicalPayments !== newCoverage.additional.medicalPayments
  ) {
    impacts.push({
      field: "medicalPayments",
      label: "Medical Payments",
      currentValue: currentCoverage.additional.medicalPayments,
      newValue: newCoverage.additional.medicalPayments,
      monthlyImpact: monthlyDiff,
      annualImpact: annualDiff,
      percentageChange: (monthlyDiff / currentPricing.monthlyPrice) * 100,
    })
  }

  if (
    currentCoverage.additional.uninsuredMotoristsBodilyInjury !==
    newCoverage.additional.uninsuredMotoristsBodilyInjury
  ) {
    impacts.push({
      field: "uninsuredMotoristsBodilyInjury",
      label: "Uninsured Motorists",
      currentValue: currentCoverage.additional.uninsuredMotoristsBodilyInjury,
      newValue: newCoverage.additional.uninsuredMotoristsBodilyInjury,
      monthlyImpact: monthlyDiff,
      annualImpact: annualDiff,
      percentageChange: (monthlyDiff / currentPricing.monthlyPrice) * 100,
    })
  }

  return impacts
}

// Calculate price comparison for all options of a field
export function calculateFieldComparison(
  coverage: CoverageData,
  field: "bodilyInjury" | "propertyDamage" | "medicalPayments" | "uninsuredMotoristsBodilyInjury",
  options: string[],
  paymentFrequency: "Monthly" | "Semi-Annual" | "Annual" = "Monthly"
): PriceComparison[] {
  const currentValue =
    field === "bodilyInjury" || field === "propertyDamage"
      ? coverage.liability[field]
      : coverage.additional[field]

  const comparisons: PriceComparison[] = []

  for (const option of options) {
    // Create modified coverage with this option
    const modifiedCoverage: CoverageData = {
      ...coverage,
      liability:
        field === "bodilyInjury" || field === "propertyDamage"
          ? {
              ...coverage.liability,
              [field]: option,
            }
          : coverage.liability,
      additional:
        field === "medicalPayments" || field === "uninsuredMotoristsBodilyInjury"
          ? {
              ...coverage.additional,
              [field]: option,
            }
          : coverage.additional,
    }

    const pricing = calculatePlanPricing("novo-next", modifiedCoverage, paymentFrequency)
    const currentPricing = calculatePlanPricing("novo-next", coverage, paymentFrequency)
    const impact = pricing.monthlyPrice - currentPricing.monthlyPrice

    comparisons.push({
      option,
      value: option,
      monthlyPrice: pricing.monthlyPrice,
      impact,
      isSelected: option === currentValue,
    })
  }

  return comparisons.sort((a, b) => a.monthlyPrice - b.monthlyPrice)
}

// Calculate cumulative price impact
export function calculateCumulativeImpact(
  baseCoverage: CoverageData,
  modifiedCoverage: CoverageData,
  paymentFrequency: "Monthly" | "Semi-Annual" | "Annual" = "Monthly"
): {
  monthlyImpact: number
  annualImpact: number
  percentageChange: number
  newMonthlyPrice: number
  currentMonthlyPrice: number
} {
  const currentPricing = calculatePlanPricing("novo-next", baseCoverage, paymentFrequency)
  const newPricing = calculatePlanPricing("novo-next", modifiedCoverage, paymentFrequency)

  const monthlyImpact = newPricing.monthlyPrice - currentPricing.monthlyPrice
  const annualImpact = monthlyImpact * 12
  const percentageChange = (monthlyImpact / currentPricing.monthlyPrice) * 100

  return {
    monthlyImpact,
    annualImpact,
    percentageChange,
    newMonthlyPrice: newPricing.monthlyPrice,
    currentMonthlyPrice: currentPricing.monthlyPrice,
  }
}

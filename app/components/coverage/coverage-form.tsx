"use client"

import * as React from "react"
import { LiabilityCoverageSection } from "./liability-coverage"
import { VehicleCoverageSection } from "./vehicle-coverage"
import { PricingSummarySection } from "./pricing-summary"
import {
  CoverageData,
  LiabilityCoverage,
  AdditionalCoverage,
  VehicleCoverage,
  PricingSummary,
  PRICING_PLANS,
} from "./types"
import { useQuote } from "@/app/contexts/quote-context"
import { useAutoSave } from "@/hooks/use-auto-save"

// Default coverage values
const DEFAULT_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$100K/$300K",
  propertyDamage: "$100K",
}

const DEFAULT_ADDITIONAL: AdditionalCoverage = {
  medicalPayments: "Not Included",
  uninsuredMotoristsBodilyInjury: "Not Included",
}

const DEFAULT_PRICING: PricingSummary = {
  selectedPlanId: "novo-next",
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 7 days from now
  paymentFrequency: "Monthly",
  monthlyPrice: 124,
  totalForPeriod: 744,
  downPayment: 248,
}

export function CoverageForm() {
  const { quoteData, updateCoverage, updatePricing, saveQuote } = useQuote()
  const vehicles = quoteData.vehicles || []

  // Initialize coverage data from context or defaults
  const [coverage, setCoverage] = React.useState<CoverageData>(() => {
    if (quoteData.coverage) {
      return quoteData.coverage
    }

    // Initialize vehicle coverages for existing vehicles
    const vehicleCoverages: VehicleCoverage[] = vehicles.map((vehicle) => ({
      vehicleId: vehicle.id,
      comprehensiveDeductible: "$1,000",
      glassDeductible: true,
      loanLeasePayoff: false,
      customPartsEquipment: false,
    }))

    return {
      liability: DEFAULT_LIABILITY,
      additional: DEFAULT_ADDITIONAL,
      vehicleCoverages,
    }
  })

  const [pricing, setPricing] = React.useState<PricingSummary>(() => {
    return quoteData.pricing || DEFAULT_PRICING
  })

  // Update vehicle coverages when vehicles change
  const vehicleIdsString = React.useMemo(
    () => vehicles.map((v) => v.id).join(","),
    [vehicles]
  )

  React.useEffect(() => {
    const existingVehicleIds = new Set(coverage.vehicleCoverages.map((vc) => vc.vehicleId))
    const currentVehicleIds = new Set(vehicles.map((v) => v.id))

    // Add coverage for new vehicles
    const newVehicles = vehicles.filter((v) => !existingVehicleIds.has(v.id))
    if (newVehicles.length > 0) {
      const newVehicleCoverages: VehicleCoverage[] = newVehicles.map((vehicle) => ({
        vehicleId: vehicle.id,
        comprehensiveDeductible: "$1,000",
        glassDeductible: true,
        loanLeasePayoff: false,
        customPartsEquipment: false,
      }))

      setCoverage((prev) => ({
        ...prev,
        vehicleCoverages: [...prev.vehicleCoverages, ...newVehicleCoverages],
      }))
    }

    // Remove coverage for deleted vehicles
    const removedVehicleIds = Array.from(existingVehicleIds).filter(
      (id) => !currentVehicleIds.has(id)
    )
    if (removedVehicleIds.length > 0) {
      setCoverage((prev) => ({
        ...prev,
        vehicleCoverages: prev.vehicleCoverages.filter(
          (vc) => !removedVehicleIds.includes(vc.vehicleId)
        ),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleIdsString]) // Sync when vehicle IDs change

  // Auto-save coverage data
  useAutoSave({
    data: coverage,
    saveFn: async (data) => {
      updateCoverage(data)
      await saveQuote()
    },
    debounceMs: 2000,
    enabled: true,
  })

  // Auto-save pricing data
  useAutoSave({
    data: pricing,
    saveFn: async (data) => {
      updatePricing(data)
      await saveQuote()
    },
    debounceMs: 2000,
    enabled: true,
  })

  const handleLiabilityChange = (field: keyof LiabilityCoverage, value: string) => {
    setCoverage((prev) => ({
      ...prev,
      liability: {
        ...prev.liability,
        [field]: value,
      },
    }))
  }

  const handleAdditionalChange = (field: keyof AdditionalCoverage, value: string) => {
    setCoverage((prev) => ({
      ...prev,
      additional: {
        ...prev.additional,
        [field]: value,
      },
    }))
  }

  const handleVehicleCoverageChange = (
    vehicleId: string,
    field: keyof VehicleCoverage,
    value: any
  ) => {
    setCoverage((prev) => ({
      ...prev,
      vehicleCoverages: prev.vehicleCoverages.map((vc) =>
        vc.vehicleId === vehicleId ? { ...vc, [field]: value } : vc
      ),
    }))
  }

  const handlePricingChange = (field: keyof PricingSummary, value: any) => {
    setPricing((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCollectPayment = () => {
    console.log("Collecting payment and binding policy...")
    // TODO: Implement payment collection
  }

  const handleDownloadPDF = () => {
    console.log("Downloading quote as PDF...")
    // TODO: Implement PDF generation
  }

  return (
    <div className="w-full">
      {/* Three-column responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Liability Coverage */}
        <div className="lg:col-span-1">
          <LiabilityCoverageSection
            liability={coverage.liability}
            additional={coverage.additional}
            onLiabilityChange={handleLiabilityChange}
            onAdditionalChange={handleAdditionalChange}
          />
        </div>

        {/* Column 2: Vehicle Coverage */}
        <div className="lg:col-span-1">
          <VehicleCoverageSection
            vehicles={vehicles}
            vehicleCoverages={coverage.vehicleCoverages}
            onVehicleCoverageChange={handleVehicleCoverageChange}
          />
        </div>

        {/* Column 3: Pricing Summary */}
        <div className="lg:col-span-1">
          <PricingSummarySection
            coverage={coverage}
            pricing={pricing}
            onPricingChange={handlePricingChange}
            onCollectPayment={handleCollectPayment}
            onDownloadPDF={handleDownloadPDF}
          />
        </div>
      </div>
    </div>
  )
}

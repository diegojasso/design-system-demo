"use client"

import * as React from "react"
import { LiabilityCoverageSection } from "./liability-coverage"
import { VehicleCoverageSection } from "./vehicle-coverage"
import { PricingSummarySection } from "./pricing-summary"
import { CoverageTemplates } from "./coverage-templates"
import { StateRequirementsPanel } from "./state-requirements-panel"
import { CoverageWarnings } from "./coverage-warnings"
import {
  CoverageData,
  LiabilityCoverage,
  AdditionalCoverage,
  VehicleCoverage,
  PricingSummary,
} from "./types"
import { useQuote } from "@/app/contexts/quote-context"
import { useAutoSave } from "@/hooks/use-auto-save"
import { CoverageWarning } from "./validation"

// Default coverage values
const DEFAULT_LIABILITY: LiabilityCoverage = {
  bodilyInjury: "$100K/$300K",
  propertyDamage: "$100K",
}

const DEFAULT_ADDITIONAL: AdditionalCoverage = {
  medicalPayments: "Not Included",
  uninsuredMotoristsBodilyInjury: "Not Included",
  roadsideAssistance: false,
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

  const handleAdditionalChange = (field: keyof AdditionalCoverage, value: string | boolean) => {
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

  const handleApplyTemplate = (newCoverage: CoverageData) => {
    setCoverage(newCoverage)
  }

  const handleFixStateIssue = (field: string, newValue: string) => {
    if (field === "bodilyInjury" || field === "propertyDamage") {
      handleLiabilityChange(field as keyof LiabilityCoverage, newValue)
    } else if (field === "medicalPayments" || field === "uninsuredMotoristsBodilyInjury") {
      handleAdditionalChange(field as keyof AdditionalCoverage, newValue)
    }
  }

  const handleFixWarning = (warning: CoverageWarning) => {
    if (warning.autoFix) {
      if (warning.field === "propertyDamage" || warning.field === "bodilyInjury") {
        handleLiabilityChange(warning.field as keyof LiabilityCoverage, warning.autoFix.newValue)
      } else if (warning.field && warning.vehicleId) {
        // Vehicle-specific warning
        handleVehicleCoverageChange(
          warning.vehicleId,
          warning.field as keyof VehicleCoverage,
          warning.autoFix.newValue
        )
      } else if (warning.field === "uninsuredMotoristsBodilyInjury") {
        handleAdditionalChange("uninsuredMotoristsBodilyInjury", warning.autoFix.newValue)
      }
    }
  }

  const vehicleIds = vehicles.map((v) => v.id)

  return (
    <div className="w-full space-y-6">
      {/* Header with Templates */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Coverage Configuration</h1>
        <CoverageTemplates
          currentCoverage={coverage}
          vehicleIds={vehicleIds}
          onApplyTemplate={handleApplyTemplate}
        />
      </div>

      {/* State Requirements & Warnings */}
      <div className="space-y-4">
        <StateRequirementsPanel
          coverage={coverage}
          onFixIssue={handleFixStateIssue}
        />
        <CoverageWarnings
          coverage={coverage}
          vehicles={vehicles}
          onFixWarning={handleFixWarning}
        />
      </div>

      {/* Three-column responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Liability Coverage */}
        <div className="lg:col-span-1">
          <LiabilityCoverageSection
            liability={coverage.liability}
            additional={coverage.additional}
            currentCoverage={coverage}
            pricing={pricing}
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
            onBulkUpdate={(vehicleIds, field, value) => {
              vehicleIds.forEach((id) => {
                handleVehicleCoverageChange(id, field, value)
              })
            }}
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

"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BODILY_INJURY_OPTIONS,
  PROPERTY_DAMAGE_OPTIONS,
  MEDICAL_PAYMENTS_OPTIONS,
  UNINSURED_MOTORISTS_OPTIONS,
  LiabilityCoverage,
  AdditionalCoverage,
} from "./types"
import { Switch } from "@/components/ui/switch"
import { PriceImpactIndicator } from "./price-impact-indicator"
import { CoverageData, PricingSummary } from "./types"

interface LiabilityCoverageProps {
  liability: LiabilityCoverage
  additional: AdditionalCoverage
  currentCoverage: CoverageData
  pricing: PricingSummary
  onLiabilityChange: (field: keyof LiabilityCoverage, value: string) => void
  onAdditionalChange: (field: keyof AdditionalCoverage, value: string) => void
}

export function LiabilityCoverageSection({
  liability,
  additional,
  currentCoverage,
  pricing,
  onLiabilityChange,
  onAdditionalChange,
}: LiabilityCoverageProps) {
  const [previewValue, setPreviewValue] = React.useState<{
    field: string
    value: string | boolean
  } | null>(null)

  const previewCoverage: CoverageData = React.useMemo(() => {
    if (!previewValue) return currentCoverage

    if (previewValue.field === "bodilyInjury" || previewValue.field === "propertyDamage") {
      return {
        ...currentCoverage,
        liability: {
          ...currentCoverage.liability,
          [previewValue.field]: previewValue.value as string,
        },
      }
    } else {
      return {
        ...currentCoverage,
        additional: {
          ...currentCoverage.additional,
          [previewValue.field]: previewValue.value,
        },
      }
    }
  }, [previewValue, currentCoverage])

  return (
    <div className="space-y-6">
      {/* Liability Coverage Section */}
      <div className="space-y-4">
        <h2
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Liability Coverage
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="bodily-injury"
                className="text-sm font-medium text-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Bodily Injury
              </Label>
              {previewValue?.field === "bodilyInjury" && (
                <PriceImpactIndicator
                  currentCoverage={currentCoverage}
                  newCoverage={previewCoverage}
                  pricing={pricing}
                />
              )}
            </div>
            <Select
              value={liability.bodilyInjury}
              onValueChange={(value) => {
                setPreviewValue(null)
                onLiabilityChange("bodilyInjury", value)
              }}
              onOpenChange={(open) => {
                if (open) {
                  setPreviewValue({ field: "bodilyInjury", value: liability.bodilyInjury })
                } else {
                  setPreviewValue(null)
                }
              }}
            >
              <SelectTrigger id="bodily-injury" className="w-full">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                {BODILY_INJURY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="property-damage"
                className="text-sm font-medium text-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Property Damage
              </Label>
              {previewValue?.field === "propertyDamage" && (
                <PriceImpactIndicator
                  currentCoverage={currentCoverage}
                  newCoverage={previewCoverage}
                  pricing={pricing}
                />
              )}
            </div>
            <Select
              value={liability.propertyDamage}
              onValueChange={(value) => {
                setPreviewValue(null)
                onLiabilityChange("propertyDamage", value)
              }}
              onOpenChange={(open) => {
                if (open) {
                  setPreviewValue({ field: "propertyDamage", value: liability.propertyDamage })
                } else {
                  setPreviewValue(null)
                }
              }}
            >
              <SelectTrigger id="property-damage" className="w-full">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_DAMAGE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Additional Coverage Section */}
      <div className="space-y-4">
        <h2
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Additional Coverage
        </h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="medical-payments"
                className="text-sm font-medium text-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Medical Payments
              </Label>
              {previewValue?.field === "medicalPayments" && (
                <PriceImpactIndicator
                  currentCoverage={currentCoverage}
                  newCoverage={previewCoverage}
                  pricing={pricing}
                />
              )}
            </div>
            <Select
              value={additional.medicalPayments}
              onValueChange={(value) => {
                setPreviewValue(null)
                onAdditionalChange("medicalPayments", value)
              }}
              onOpenChange={(open) => {
                if (open) {
                  setPreviewValue({ field: "medicalPayments", value: additional.medicalPayments })
                } else {
                  setPreviewValue(null)
                }
              }}
            >
              <SelectTrigger id="medical-payments" className="w-full">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                {MEDICAL_PAYMENTS_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="uninsured-motorists-bi"
                className="text-sm font-medium text-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Uninsured Motorists Bodily Injury
              </Label>
              {previewValue?.field === "uninsuredMotoristsBodilyInjury" && (
                <PriceImpactIndicator
                  currentCoverage={currentCoverage}
                  newCoverage={previewCoverage}
                  pricing={pricing}
                />
              )}
            </div>
            <Select
              value={additional.uninsuredMotoristsBodilyInjury}
              onValueChange={(value) => {
                setPreviewValue(null)
                onAdditionalChange("uninsuredMotoristsBodilyInjury", value)
              }}
              onOpenChange={(open) => {
                if (open) {
                  setPreviewValue({
                    field: "uninsuredMotoristsBodilyInjury",
                    value: additional.uninsuredMotoristsBodilyInjury,
                  })
                } else {
                  setPreviewValue(null)
                }
              }}
            >
              <SelectTrigger id="uninsured-motorists-bi" className="w-full">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                {UNINSURED_MOTORISTS_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Roadside Assistance */}
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center justify-between mb-1">
                <Label
                  htmlFor="roadside-assistance"
                  className="text-sm font-medium text-foreground cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Roadside Assistance
                </Label>
                {previewValue?.field === "roadsideAssistance" && (
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                )}
              </div>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                24/7 towing, battery jump, flat tire, lockout service
              </p>
            </div>
            <Switch
              id="roadside-assistance"
              checked={additional.roadsideAssistance || false}
              onCheckedChange={(checked) => {
                // Set preview for price impact
                setPreviewValue({ field: "roadsideAssistance", value: checked })
                // Small delay to show preview, then apply
                setTimeout(() => {
                  setPreviewValue(null)
                  onAdditionalChange("roadsideAssistance", checked)
                }, 100)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

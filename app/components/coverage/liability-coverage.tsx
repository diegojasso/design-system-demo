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

interface LiabilityCoverageProps {
  liability: LiabilityCoverage
  additional: AdditionalCoverage
  onLiabilityChange: (field: keyof LiabilityCoverage, value: string) => void
  onAdditionalChange: (field: keyof AdditionalCoverage, value: string) => void
}

export function LiabilityCoverageSection({
  liability,
  additional,
  onLiabilityChange,
  onAdditionalChange,
}: LiabilityCoverageProps) {
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
            <Label
              htmlFor="bodily-injury"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Bodily Injury
            </Label>
            <Select
              value={liability.bodilyInjury}
              onValueChange={(value) => onLiabilityChange("bodilyInjury", value)}
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
            <Label
              htmlFor="property-damage"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Property Damage
            </Label>
            <Select
              value={liability.propertyDamage}
              onValueChange={(value) => onLiabilityChange("propertyDamage", value)}
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
            <Label
              htmlFor="medical-payments"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Medical Payments
            </Label>
            <Select
              value={additional.medicalPayments}
              onValueChange={(value) => onAdditionalChange("medicalPayments", value)}
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
            <Label
              htmlFor="uninsured-motorists-bi"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Uninsured Motorists Bodily Injury
            </Label>
            <Select
              value={additional.uninsuredMotoristsBodilyInjury}
              onValueChange={(value) => onAdditionalChange("uninsuredMotoristsBodilyInjury", value)}
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
        </div>
      </div>
    </div>
  )
}

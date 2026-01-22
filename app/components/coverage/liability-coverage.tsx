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
  UNDERINSURED_MOTORISTS_OPTIONS,
  LiabilityCoverage,
  AdditionalCoverage,
} from "./types"
import { Switch } from "@/components/ui/switch"
import { PriceImpactIndicator } from "./price-impact-indicator"
import { CoverageData, PricingSummary } from "./types"
import { useGridNavigation } from "./use-grid-navigation"
import { cn } from "@/lib/utils"

interface LiabilityCoverageProps {
  liability: LiabilityCoverage
  additional: AdditionalCoverage
  currentCoverage: CoverageData
  pricing: PricingSummary
  onLiabilityChange: (field: keyof LiabilityCoverage, value: string) => void
  onAdditionalChange: (field: keyof AdditionalCoverage, value: string | boolean) => void
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
  const rowKeys = React.useMemo(
    () => [
      "bodilyInjury",
      "propertyDamage",
      "medicalPayments",
      "uninsuredMotoristsBodilyInjury",
      "underinsuredMotoristsBodilyInjury",
      "roadsideAssistance",
    ],
    []
  )

  const { activeCell, containerRef, moveToCell, startEditing } = useGridNavigation({
    rowCount: rowKeys.length,
    colCount: 1,
  })

  const isActiveCell = (rowIndex: number) => activeCell?.rowIndex === rowIndex && activeCell?.colIndex === 0

  const renderCell = (
    rowIndex: number,
    className: string,
    children: React.ReactNode
  ) => (
    <div
      data-cell-id={`row-${rowIndex}-col-0`}
      className={cn(
        "relative",
        className,
        isActiveCell(rowIndex) && "ring-2 ring-primary ring-inset z-10"
      )}
      onFocusCapture={() => moveToCell(rowIndex, 0)}
      onClick={() => moveToCell(rowIndex, 0)}
    >
      <div
        data-cell-focus="true"
        tabIndex={0}
        className="flex items-center w-full outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            startEditing()
          }
        }}
      >
        {children}
      </div>
    </div>
  )

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
    } else if (previewValue.field === "medicalPayments" || previewValue.field === "uninsuredMotoristsBodilyInjury" || previewValue.field === "underinsuredMotoristsBodilyInjury") {
      return {
        ...currentCoverage,
        additional: {
          ...currentCoverage.additional,
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
      {/* Additional Coverage Section */}
      <div className="space-y-4">
        <h2
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Additional Coverage
        </h2>
      </div>

      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <div ref={containerRef} className="grid grid-cols-[220px_1fr]">
          <div className="col-span-2 border-b border-border bg-muted/60 px-4 py-3 text-sm font-medium text-foreground">
            Liability Coverage
          </div>
          <div className="border-b border-r border-border px-4 py-3">
            <Label
              htmlFor="bodily-injury"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Bodily Injury
            </Label>
          </div>
          {renderCell(
            0,
            "border-b border-border px-4 py-3",
            <>
              {previewValue?.field === "bodilyInjury" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
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
                <SelectTrigger
                  id="bodily-injury"
                  className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
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
            </>
          )}

          <div className="border-b border-r border-border px-4 py-3">
            <Label
              htmlFor="property-damage"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Property Damage
            </Label>
          </div>
          {renderCell(
            1,
            "border-b border-border px-4 py-3",
            <>
              {previewValue?.field === "propertyDamage" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
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
                <SelectTrigger
                  id="property-damage"
                  className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
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
            </>
          )}

          <div className="col-span-2 border-b border-border bg-muted/60 px-4 py-3 text-sm font-medium text-foreground">
            Additional Coverage
          </div>
          <div className="border-b border-r border-border px-4 py-3">
            <Label
              htmlFor="medical-payments"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Medical Payments
            </Label>
          </div>
          {renderCell(
            2,
            "border-b border-border px-4 py-3",
            <>
              {previewValue?.field === "medicalPayments" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
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
                <SelectTrigger
                  id="medical-payments"
                  className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
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
            </>
          )}

          <div className="border-b border-r border-border px-4 py-3">
            <Label
              htmlFor="uninsured-motorists-bi"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Uninsured Motorists Bodily Injury
            </Label>
          </div>
          {renderCell(
            3,
            "border-b border-border px-4 py-3",
            <>
              {previewValue?.field === "uninsuredMotoristsBodilyInjury" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
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
                <SelectTrigger
                  id="uninsured-motorists-bi"
                  className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
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
            </>
          )}

          <div className="border-b border-r border-border px-4 py-3">
            <Label
              htmlFor="underinsured-motorists-bi"
              className="text-sm font-medium text-foreground"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Underinsured Motorists Bodily Injury
            </Label>
          </div>
          {renderCell(
            4,
            "border-b border-border px-4 py-3",
            <>
              {previewValue?.field === "underinsuredMotoristsBodilyInjury" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
              <Select
                value={additional.underinsuredMotoristsBodilyInjury || "Not Included"}
                onValueChange={(value) => {
                  setPreviewValue(null)
                  onAdditionalChange("underinsuredMotoristsBodilyInjury", value)
                }}
                onOpenChange={(open) => {
                  if (open) {
                    setPreviewValue({
                      field: "underinsuredMotoristsBodilyInjury",
                      value: additional.underinsuredMotoristsBodilyInjury || "Not Included",
                    })
                  } else {
                    setPreviewValue(null)
                  }
                }}
              >
                <SelectTrigger
                  id="underinsured-motorists-bi"
                  className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  {UNDERINSURED_MOTORISTS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}

          <div className="border-r border-border px-4 py-3">
            <div className="space-y-1">
              <Label
                htmlFor="roadside-assistance"
                className="text-sm font-medium text-foreground cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Roadside Assistance
              </Label>
              <p
                className="text-xs text-muted-foreground"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                24/7 towing, battery jump, flat tire, lockout service
              </p>
            </div>
          </div>
          {renderCell(
            5,
            "px-4 py-3",
            <>
              {previewValue?.field === "roadsideAssistance" && (
                <div className="flex justify-end pb-2">
                  <PriceImpactIndicator
                    currentCoverage={currentCoverage}
                    newCoverage={previewCoverage}
                    pricing={pricing}
                  />
                </div>
              )}
              <Switch
                id="roadside-assistance"
                checked={additional.roadsideAssistance || false}
                onCheckedChange={(checked) => {
                  setPreviewValue({ field: "roadsideAssistance", value: checked })
                  setTimeout(() => {
                    setPreviewValue(null)
                    onAdditionalChange("roadsideAssistance", checked)
                  }, 100)
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

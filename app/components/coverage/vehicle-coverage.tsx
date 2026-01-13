"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VehicleLogo } from "./vehicle-logo"
import { Vehicle } from "@/app/components/vehicles-table/types"
import { VehicleCoverage, COMPREHENSIVE_DEDUCTIBLE_OPTIONS, COLLISION_DEDUCTIBLE_OPTIONS } from "./types"
import { BulkVehicleActions } from "./bulk-vehicle-actions"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface VehicleCoverageSectionProps {
  vehicles: Vehicle[]
  vehicleCoverages: VehicleCoverage[]
  onVehicleCoverageChange: (vehicleId: string, field: keyof VehicleCoverage, value: any) => void
  onBulkUpdate?: (vehicleIds: string[], field: keyof VehicleCoverage, value: any) => void
}

export function VehicleCoverageSection({
  vehicles,
  vehicleCoverages,
  onVehicleCoverageChange,
  onBulkUpdate,
}: VehicleCoverageSectionProps) {
  const [selectedVehicleIds, setSelectedVehicleIds] = React.useState<Set<string>>(new Set())

  const getVehicleCoverage = (vehicleId: string): VehicleCoverage | undefined => {
    return vehicleCoverages.find((vc) => vc.vehicleId === vehicleId)
  }

  const getVehicleDisplayName = (vehicle: Vehicle): string => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`.trim()
  }

  const handleSelectAll = () => {
    setSelectedVehicleIds(new Set(vehicles.map((v) => v.id)))
  }

  const handleDeselectAll = () => {
    setSelectedVehicleIds(new Set())
  }

  const handleToggleVehicle = (vehicleId: string) => {
    setSelectedVehicleIds((prev) => {
      const next = new Set(prev)
      if (next.has(vehicleId)) {
        next.delete(vehicleId)
      } else {
        next.add(vehicleId)
      }
      return next
    })
  }

  const handleBulkUpdate = (vehicleIds: string[], field: keyof VehicleCoverage, value: any) => {
    vehicleIds.forEach((vehicleId) => {
      onVehicleCoverageChange(vehicleId, field, value)
    })
    setSelectedVehicleIds(new Set()) // Clear selection after bulk update
    onBulkUpdate?.(vehicleIds, field, value)
  }

  // Helper to check if comp/coll are both removed
  const hasCompOrColl = (coverage: VehicleCoverage): boolean => {
    const hasComp = coverage.comprehensiveDeductible !== "Not Included" && coverage.comprehensiveDeductible !== undefined
    const hasColl = coverage.collisionDeductible !== "Not Included" && coverage.collisionDeductible !== undefined
    return hasComp || hasColl
  }

  // Handle comprehensive change - auto-add collision if comprehensive is added
  const handleComprehensiveChange = (vehicleId: string, value: string) => {
    const coverage = getVehicleCoverage(vehicleId)
    if (!coverage) return

    onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", value)

    // If comprehensive is added and collision is not set or is "Not Included", auto-add collision
    if (value !== "Not Included" && (!coverage.collisionDeductible || coverage.collisionDeductible === "Not Included")) {
      onVehicleCoverageChange(vehicleId, "collisionDeductible", value)
    }

    // If comprehensive is removed, remove collision and disable dependent fields
    if (value === "Not Included") {
      if (coverage.collisionDeductible !== "Not Included") {
        onVehicleCoverageChange(vehicleId, "collisionDeductible", "Not Included")
      }
      if (coverage.rentalReimbursement) {
        onVehicleCoverageChange(vehicleId, "rentalReimbursement", false)
      }
      if (coverage.glassDeductible) {
        onVehicleCoverageChange(vehicleId, "glassDeductible", false)
      }
      if (coverage.customPartsEquipment) {
        onVehicleCoverageChange(vehicleId, "customPartsEquipment", false)
      }
    }
  }

  // Handle collision change - match comprehensive or remove dependent fields if removed
  const handleCollisionChange = (vehicleId: string, value: string) => {
    const coverage = getVehicleCoverage(vehicleId)
    if (!coverage) return

    onVehicleCoverageChange(vehicleId, "collisionDeductible", value)

    // If collision is removed, remove comprehensive and disable dependent fields
    if (value === "Not Included") {
      if (coverage.comprehensiveDeductible !== "Not Included") {
        onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", "Not Included")
      }
      if (coverage.rentalReimbursement) {
        onVehicleCoverageChange(vehicleId, "rentalReimbursement", false)
      }
      if (coverage.glassDeductible) {
        onVehicleCoverageChange(vehicleId, "glassDeductible", false)
      }
      if (coverage.customPartsEquipment) {
        onVehicleCoverageChange(vehicleId, "customPartsEquipment", false)
      }
    } else {
      // If collision is added, match comprehensive deductible
      if (coverage.comprehensiveDeductible === "Not Included" || coverage.comprehensiveDeductible === undefined) {
        onVehicleCoverageChange(vehicleId, "comprehensiveDeductible", value)
      }
    }
  }

  // Format currency input
  const formatCurrency = (value: number | undefined): string => {
    if (value === undefined || value === null) return "$0"
    return `$${value.toLocaleString()}`
  }

  // Parse currency input
  const parseCurrency = (value: string): number => {
    const cleaned = value.replace(/[^0-9]/g, "")
    return cleaned ? parseInt(cleaned, 10) : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Coverage for Vehicles
        </h2>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            No vehicles added yet. Please add vehicles in the Vehicles step.
          </p>
        </div>
      ) : (
        <>
          {onBulkUpdate && (
            <BulkVehicleActions
              vehicles={vehicles}
              vehicleCoverages={vehicleCoverages}
              selectedVehicleIds={selectedVehicleIds}
              onSelectAll={handleSelectAll}
              onDeselectAll={handleDeselectAll}
              onToggleVehicle={handleToggleVehicle}
              onBulkUpdate={handleBulkUpdate}
            />
          )}
          <div className="space-y-6">
            {vehicles.map((vehicle) => {
              const coverage = getVehicleCoverage(vehicle.id)
              if (!coverage) return null

              const isSelected = selectedVehicleIds.has(vehicle.id)

              return (
                <div
                  key={vehicle.id}
                  className={cn(
                    "space-y-4 p-4 border border-border rounded-lg bg-card transition-colors",
                    isSelected && "ring-2 ring-primary ring-offset-2"
                  )}
                >
                  {/* Vehicle Header */}
                  <div className="flex items-center gap-3">
                    {onBulkUpdate && (
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleToggleVehicle(vehicle.id)}
                      />
                    )}
                    <VehicleLogo make={vehicle.make} />
                    <h3
                      className="text-base font-medium text-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {getVehicleDisplayName(vehicle)}
                    </h3>
                  </div>

                {/* Comprehensive Coverage */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`comprehensive-${vehicle.id}`}
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Comprehensive Coverage
                  </Label>
                  <Select
                    value={coverage.comprehensiveDeductible || "Not Included"}
                    onValueChange={(value) => handleComprehensiveChange(vehicle.id, value)}
                  >
                    <SelectTrigger id={`comprehensive-${vehicle.id}`} className="w-full">
                      <SelectValue placeholder="Select deductible" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPREHENSIVE_DEDUCTIBLE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "Not Included" ? "Not Included" : `${option} deductible`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Collision Coverage */}
                <div className="space-y-2">
                  <Label
                    htmlFor={`collision-${vehicle.id}`}
                    className="text-sm font-medium text-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Collision Coverage
                  </Label>
                  <Select
                    value={coverage.collisionDeductible || "Not Included"}
                    onValueChange={(value) => handleCollisionChange(vehicle.id, value)}
                  >
                    <SelectTrigger id={`collision-${vehicle.id}`} className="w-full">
                      <SelectValue placeholder="Select deductible" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLLISION_DEDUCTIBLE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option === "Not Included" ? "Not Included" : `${option} deductible`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rental Reimbursement */}
                <div className={cn("flex items-center justify-between", !hasCompOrColl(coverage) && "opacity-50")}>
                  <div className="space-y-0.5">
                    <Label
                      htmlFor={`rental-${vehicle.id}`}
                      className="text-sm font-medium text-foreground cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Rental Reimbursement
                    </Label>
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Covers rental car during repairs
                    </p>
                  </div>
                  <Switch
                    id={`rental-${vehicle.id}`}
                    checked={coverage.rentalReimbursement || false}
                    disabled={!hasCompOrColl(coverage)}
                    onCheckedChange={(checked) =>
                      onVehicleCoverageChange(vehicle.id, "rentalReimbursement", checked)
                    }
                  />
                </div>

                {/* Glass Damage Deductible */}
                <div className={cn("flex items-center justify-between", !hasCompOrColl(coverage) && "opacity-50")}>
                  <div className="space-y-0.5">
                    <Label
                      htmlFor={`glass-${vehicle.id}`}
                      className="text-sm font-medium text-foreground cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Glass Damage Deductible $0
                    </Label>
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Separate deductible for glass repairs
                    </p>
                  </div>
                  <Switch
                    id={`glass-${vehicle.id}`}
                    checked={coverage.glassDeductible}
                    disabled={!hasCompOrColl(coverage)}
                    onCheckedChange={(checked) =>
                      onVehicleCoverageChange(vehicle.id, "glassDeductible", checked)
                    }
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>

                {/* Loan/Lease Payoff */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor={`loan-lease-${vehicle.id}`}
                      className="text-sm font-medium text-foreground cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Loan/Lease Payoff
                    </Label>
                    <p
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Covers gap between value and loan
                    </p>
                  </div>
                  <Switch
                    id={`loan-lease-${vehicle.id}`}
                    checked={coverage.loanLeasePayoff}
                    onCheckedChange={(checked) =>
                      onVehicleCoverageChange(vehicle.id, "loanLeasePayoff", checked)
                    }
                  />
                </div>

                {/* Custom Parts and Equipment */}
                <div className="space-y-2">
                  <div className={cn("flex items-center justify-between", !hasCompOrColl(coverage) && "opacity-50")}>
                    <Label
                      htmlFor={`custom-parts-${vehicle.id}`}
                      className="text-sm font-medium text-foreground cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Custom Parts and Equipment
                    </Label>
                    <Switch
                      id={`custom-parts-${vehicle.id}`}
                      checked={coverage.customPartsEquipment}
                      disabled={!hasCompOrColl(coverage)}
                      onCheckedChange={(checked) =>
                        onVehicleCoverageChange(vehicle.id, "customPartsEquipment", checked)
                      }
                    />
                  </div>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Comprehensive and collision each provide up to $1,000 of coverage for custom parts or equipment.
                  </p>
                  {coverage.customPartsEquipment && (
                    <div className="space-y-2">
                      <Label
                        htmlFor={`custom-parts-amount-${vehicle.id}`}
                        className="text-sm font-medium text-foreground"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        Coverage Amount
                      </Label>
                      <Input
                        id={`custom-parts-amount-${vehicle.id}`}
                        type="text"
                        value={formatCurrency(coverage.customPartsAmount)}
                        onChange={(e) => {
                          const value = parseCurrency(e.target.value)
                          onVehicleCoverageChange(vehicle.id, "customPartsAmount", value)
                        }}
                        placeholder="$0"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
          </div>
        </>
      )}
    </div>
  )
}

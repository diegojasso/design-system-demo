"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { VehicleLogo } from "./vehicle-logo"
import { Vehicle } from "@/app/components/vehicles-table/types"
import { VehicleCoverage, COMPREHENSIVE_DEDUCTIBLE_OPTIONS } from "./types"

interface VehicleCoverageSectionProps {
  vehicles: Vehicle[]
  vehicleCoverages: VehicleCoverage[]
  onVehicleCoverageChange: (vehicleId: string, field: keyof VehicleCoverage, value: any) => void
}

export function VehicleCoverageSection({
  vehicles,
  vehicleCoverages,
  onVehicleCoverageChange,
}: VehicleCoverageSectionProps) {
  const getVehicleCoverage = (vehicleId: string): VehicleCoverage | undefined => {
    return vehicleCoverages.find((vc) => vc.vehicleId === vehicleId)
  }

  const getVehicleDisplayName = (vehicle: Vehicle): string => {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`.trim()
  }

  return (
    <div className="space-y-6">
      <h2
        className="text-lg font-semibold text-foreground"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Coverage for Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            No vehicles added yet. Please add vehicles in the Vehicles step.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {vehicles.map((vehicle) => {
            const coverage = getVehicleCoverage(vehicle.id)
            if (!coverage) return null

            return (
              <div
                key={vehicle.id}
                className="space-y-4 p-4 border border-border rounded-lg bg-card"
              >
                {/* Vehicle Header */}
                <div className="flex items-center gap-3">
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
                    value={coverage.comprehensiveDeductible}
                    onValueChange={(value) =>
                      onVehicleCoverageChange(vehicle.id, "comprehensiveDeductible", value)
                    }
                  >
                    <SelectTrigger id={`comprehensive-${vehicle.id}`} className="w-full">
                      <SelectValue placeholder="Select deductible" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPREHENSIVE_DEDUCTIBLE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option} deductible
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Glass Deductible */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor={`glass-${vehicle.id}`}
                      className="text-sm font-medium text-foreground cursor-pointer"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Glass Deductible
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
                <div className="flex items-center justify-between">
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
                    onCheckedChange={(checked) =>
                      onVehicleCoverageChange(vehicle.id, "customPartsEquipment", checked)
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

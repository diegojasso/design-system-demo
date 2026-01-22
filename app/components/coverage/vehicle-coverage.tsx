"use client"

import * as React from "react"
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
import { useGridNavigation } from "./use-grid-navigation"

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
  const coverageRowKeys = React.useMemo(
    () => [
      "comprehensiveDeductible",
      "collisionDeductible",
      "rentalReimbursement",
      "glassDeductible",
      "loanLeasePayoff",
      "customPartsEquipment",
      "customPartsAmount",
    ],
    []
  )

  const getCoverageByColumnIndex = (colIndex: number) => {
    const vehicle = vehicles[colIndex]
    if (!vehicle) return null
    const coverage = getVehicleCoverage(vehicle.id)
    if (!coverage) return null
    return { vehicle, coverage }
  }

  const isCellDisabled = (rowIndex: number, colIndex: number) => {
    const rowKey = coverageRowKeys[rowIndex]
    const data = getCoverageByColumnIndex(colIndex)
    if (!data) return true
    const { coverage } = data

    if (rowKey === "rentalReimbursement" || rowKey === "glassDeductible" || rowKey === "customPartsEquipment") {
      return !hasCompOrColl(coverage)
    }

    if (rowKey === "customPartsAmount") {
      return !hasCompOrColl(coverage) || !coverage.customPartsEquipment
    }

    return false
  }

  const { activeCell, containerRef, moveToCell, startEditing } = useGridNavigation({
    rowCount: coverageRowKeys.length,
    colCount: vehicles.length,
    isCellDisabled,
  })

  const isActiveCell = (rowIndex: number, colIndex: number) =>
    activeCell?.rowIndex === rowIndex && activeCell?.colIndex === colIndex

  const renderCell = (
    rowIndex: number,
    colIndex: number,
    className: string,
    children: React.ReactNode,
    disabled = false
  ) => (
    <div
      data-cell-id={`row-${rowIndex}-col-${colIndex}`}
      className={cn(
        "relative",
        className,
        isActiveCell(rowIndex, colIndex) && "ring-2 ring-primary ring-inset z-10"
      )}
      onFocusCapture={() => moveToCell(rowIndex, colIndex)}
      onClick={() => moveToCell(rowIndex, colIndex)}
    >
      <div
        data-cell-focus="true"
        tabIndex={0}
        className={cn("flex items-center w-full outline-none", disabled && "cursor-not-allowed")}
        aria-disabled={disabled ? "true" : "false"}
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
          <div className="border border-border rounded-lg overflow-hidden bg-background">
            <div className="overflow-x-auto">
              <div
                ref={containerRef}
                className="min-w-[720px]"
                style={{
                  display: "grid",
                  gridTemplateColumns: `minmax(220px, 260px) repeat(${vehicles.length}, minmax(220px, 1fr))`,
                }}
              >
                <div className="contents">
                  <div className="sticky left-0 top-0 z-30 border-b border-r border-border bg-muted/60 px-4 py-3 text-sm font-medium text-foreground">
                    Coverage Type
                  </div>
                  {vehicles.map((vehicle, index) => {
                    const isSelected = selectedVehicleIds.has(vehicle.id)
                    return (
                      <div
                        key={`header-${vehicle.id}`}
                        className={cn(
                          "sticky top-0 z-20 border-b border-border bg-muted/60 px-4 py-3",
                          index < vehicles.length - 1 && "border-r border-border",
                          isSelected && "ring-2 ring-primary ring-inset"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {onBulkUpdate && (
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleToggleVehicle(vehicle.id)}
                            />
                          )}
                          <VehicleLogo make={vehicle.make} />
                          <div className="space-y-0.5">
                            <div
                              className="text-sm font-medium text-foreground"
                              style={{ fontFamily: "Inter, sans-serif" }}
                            >
                              {getVehicleDisplayName(vehicle)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {vehicle.vin || "VIN not provided"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Comprehensive Deductible */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Comprehensive Deductible
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  return renderCell(
                    0,
                    index,
                    cn("border-b border-border px-4 py-3", index < vehicles.length - 1 && "border-r border-border"),
                    <Select
                      value={coverage.comprehensiveDeductible || "Not Included"}
                      onValueChange={(value) => handleComprehensiveChange(vehicle.id, value)}
                    >
                      <SelectTrigger
                        id={`comprehensive-${vehicle.id}`}
                        className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
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
                  )
                })}

                {/* Collision Deductible */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Collision Deductible
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  return renderCell(
                    1,
                    index,
                    cn("border-b border-border px-4 py-3", index < vehicles.length - 1 && "border-r border-border"),
                    <Select
                      value={coverage.collisionDeductible || "Not Included"}
                      onValueChange={(value) => handleCollisionChange(vehicle.id, value)}
                    >
                      <SelectTrigger
                        id={`collision-${vehicle.id}`}
                        className="w-full border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
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
                  )
                })}

                {/* Rental Reimbursement */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Rental Reimbursement
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  const disabled = !hasCompOrColl(coverage)
                  return renderCell(
                    2,
                    index,
                    cn(
                      "border-b border-border px-4 py-3",
                      index < vehicles.length - 1 && "border-r border-border",
                      disabled && "opacity-50"
                    ),
                    <Switch
                      id={`rental-${vehicle.id}`}
                      checked={coverage.rentalReimbursement || false}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        onVehicleCoverageChange(vehicle.id, "rentalReimbursement", checked)
                      }
                    />,
                    disabled
                  )
                })}

                {/* Glass Deductible */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  $0 Glass Deductible
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  const disabled = !hasCompOrColl(coverage)
                  return renderCell(
                    3,
                    index,
                    cn(
                      "border-b border-border px-4 py-3",
                      index < vehicles.length - 1 && "border-r border-border",
                      disabled && "opacity-50"
                    ),
                    <Switch
                      id={`glass-${vehicle.id}`}
                      checked={coverage.glassDeductible}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        onVehicleCoverageChange(vehicle.id, "glassDeductible", checked)
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />,
                    disabled
                  )
                })}

                {/* Loan/Lease Payoff */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Loan/Lease Payoff
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  return renderCell(
                    4,
                    index,
                    cn("border-b border-border px-4 py-3", index < vehicles.length - 1 && "border-r border-border"),
                    <Switch
                      id={`loan-lease-${vehicle.id}`}
                      checked={coverage.loanLeasePayoff}
                      onCheckedChange={(checked) =>
                        onVehicleCoverageChange(vehicle.id, "loanLeasePayoff", checked)
                      }
                    />
                  )
                })}

                {/* Custom Parts and Equipment */}
                <div className="sticky left-0 z-10 border-b border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Custom Parts and Equipment
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  const disabled = !hasCompOrColl(coverage)
                  return renderCell(
                    5,
                    index,
                    cn(
                      "border-b border-border px-4 py-3",
                      index < vehicles.length - 1 && "border-r border-border",
                      disabled && "opacity-50"
                    ),
                    <Switch
                      id={`custom-parts-${vehicle.id}`}
                      checked={coverage.customPartsEquipment}
                      disabled={disabled}
                      onCheckedChange={(checked) =>
                        onVehicleCoverageChange(vehicle.id, "customPartsEquipment", checked)
                      }
                    />,
                    disabled
                  )
                })}

                {/* Custom Parts Amount */}
                <div className="sticky left-0 z-10 border-r border-border bg-background px-4 py-3 text-sm font-medium text-foreground">
                  Custom Parts Amount
                </div>
                {vehicles.map((vehicle, index) => {
                  const coverage = getVehicleCoverage(vehicle.id)
                  if (!coverage) return null
                  const disabled = !hasCompOrColl(coverage) || !coverage.customPartsEquipment
                  return renderCell(
                    6,
                    index,
                    cn("px-4 py-3", index < vehicles.length - 1 && "border-r border-border"),
                    <Input
                      id={`custom-parts-amount-${vehicle.id}`}
                      type="text"
                      value={formatCurrency(coverage.customPartsAmount)}
                      onChange={(e) => {
                        const value = parseCurrency(e.target.value)
                        onVehicleCoverageChange(vehicle.id, "customPartsAmount", value)
                      }}
                      placeholder="$0"
                      className="w-full border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      disabled={disabled}
                    />,
                    disabled
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

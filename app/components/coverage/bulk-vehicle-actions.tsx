"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MoreVertical, CheckSquare, Square } from "lucide-react"
import { Vehicle } from "@/app/components/vehicles-table/types"
import { VehicleCoverage, COMPREHENSIVE_DEDUCTIBLE_OPTIONS } from "./types"
import { cn } from "@/lib/utils"

interface BulkVehicleActionsProps {
  vehicles: Vehicle[]
  vehicleCoverages: VehicleCoverage[]
  selectedVehicleIds: Set<string>
  onSelectAll: () => void
  onDeselectAll: () => void
  onToggleVehicle: (vehicleId: string) => void
  onBulkUpdate: (
    vehicleIds: string[],
    field: keyof VehicleCoverage,
    value: any
  ) => void
}

export function BulkVehicleActions({
  vehicles,
  vehicleCoverages,
  selectedVehicleIds,
  onSelectAll,
  onDeselectAll,
  onToggleVehicle,
  onBulkUpdate,
}: BulkVehicleActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedCount = selectedVehicleIds.size
  const allSelected = vehicles.length > 0 && selectedVehicleIds.size === vehicles.length

  const handleBulkDeductible = (deductible: string) => {
    const ids = Array.from(selectedVehicleIds)
    onBulkUpdate(ids, "comprehensiveDeductible", deductible)
    setIsOpen(false)
  }

  const handleBulkToggle = (field: keyof VehicleCoverage, value: boolean) => {
    const ids = Array.from(selectedVehicleIds)
    onBulkUpdate(ids, field, value)
    setIsOpen(false)
  }

  if (vehicles.length === 0) return null

  return (
    <div className="flex items-center justify-between mb-4 p-3 border rounded-lg bg-muted/30">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              onSelectAll()
            } else {
              onDeselectAll()
            }
          }}
        />
        <Label className="text-sm font-medium cursor-pointer">
          {selectedCount > 0
            ? `${selectedCount} vehicle${selectedCount > 1 ? "s" : ""} selected`
            : "Select vehicles for bulk actions"}
        </Label>
      </div>

      {selectedCount > 0 && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <MoreVertical className="h-4 w-4" />
              Apply to Selected
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Comprehensive Deductible
            </DropdownMenuLabel>
            {COMPREHENSIVE_DEDUCTIBLE_OPTIONS.map((deductible) => (
              <DropdownMenuItem
                key={deductible}
                onClick={() => handleBulkDeductible(deductible)}
              >
                {deductible}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Add-ons
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleBulkToggle("glassDeductible", true)}>
              Enable Glass Deductible
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggle("glassDeductible", false)}>
              Disable Glass Deductible
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggle("loanLeasePayoff", true)}>
              Enable Loan/Lease Payoff
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggle("loanLeasePayoff", false)}>
              Disable Loan/Lease Payoff
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggle("customPartsEquipment", true)}>
              Enable Custom Parts
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggle("customPartsEquipment", false)}>
              Disable Custom Parts
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

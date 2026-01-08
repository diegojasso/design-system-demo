"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Car, X, Trash2, Check, AlertCircle, CheckCircle } from "lucide-react"
import { Vehicle, ColumnDef, DiscoveredVehicle } from "./types"
import { VEHICLE_FIELDS } from "./columns"
import { EditableTableCell } from "./editable-table-cell"
import { useKeyboardNavigation, ActiveCell } from "./use-keyboard-navigation"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { VehicleSuggestions } from "./vehicle-suggestions"
import { validateCellValue, ValidationError } from "./validation"
import { getRowMissingCount, isRowComplete } from "./utils/missing-data"

interface VehiclesTableProps {
  vehicles?: Vehicle[]
  fields?: ColumnDef[]
}

// Sample static data for Phase 1 - matching wireframe
const SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: 'vehicle-1',
    vin: '1HGCM82633A123456',
    year: '2021',
    make: 'Honda',
    model: 'Accord',
    trim: 'EX-L',
    primaryUse: 'Commute',
    annualMileage: '12000',
    ownershipType: 'Own',
    ownershipLength: '+5 years',
    garagingZipSame: 'Yes',
    badges: {
      cleanTitle: true,
      carfaxVerified: true,
    },
  },
  {
    id: 'vehicle-2',
    vin: '1HGCM82633A123457',
    year: '2021',
    make: 'Honda',
    model: 'Accord',
    trim: 'EX-L',
    primaryUse: 'Commute',
    annualMileage: '12000',
    ownershipType: 'Own',
    ownershipLength: '+5 years',
    garagingZipSame: 'Yes',
    badges: {
      cleanTitle: true,
      carfaxVerified: true,
    },
  },
]

// Sample discovered vehicles
const SAMPLE_DISCOVERED_VEHICLES: DiscoveredVehicle[] = [
  {
    make: 'Ford',
    model: 'Fiesta',
    year: '2010',
    confidence: 0.95,
    source: 'DMV',
    badges: {
      cleanTitle: true,
    },
  },
  {
    make: 'Toyota',
    model: 'Camry',
    year: '2018',
    vin: '4T1B11HK5JU123456',
    confidence: 0.92,
    source: 'Carfax',
    badges: {
      cleanTitle: true,
      carfaxVerified: true,
    },
  },
]

export function VehiclesTable({ 
  vehicles: initialVehicles = SAMPLE_VEHICLES, 
  fields = VEHICLE_FIELDS 
}: VehiclesTableProps) {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>(initialVehicles)
  const [newVehicleIds, setNewVehicleIds] = React.useState<Set<string>>(new Set())
  const [discoveredVehicles] = React.useState<DiscoveredVehicle[]>(SAMPLE_DISCOVERED_VEHICLES)
  const [isLoadingDiscovery, setIsLoadingDiscovery] = React.useState(false)
  const [validationErrors, setValidationErrors] = React.useState<Map<string, string>>(new Map())
  const [missingFields, setMissingFields] = React.useState<Set<string>>(new Set())

  // Update vehicles when initialVehicles changes
  React.useEffect(() => {
    setVehicles(initialVehicles)
  }, [initialVehicles])

  // Recompute missing fields when vehicles or fields change
  React.useEffect(() => {
    const missing = new Set<string>()
    vehicles.forEach((vehicle, vehicleIndex) => {
      fields.forEach((field) => {
        if (field.required) {
          const value = vehicle[field.id as keyof Vehicle]
          if (value === null || value === undefined || value === '' || 
              (typeof value === 'string' && value.trim() === '') ||
              (field.type === 'dropdown' && value === 'Select')) {
            missing.add(`${vehicleIndex}-${field.id}`)
          }
        }
      })
    })
    setMissingFields(missing)
  }, [vehicles, fields])

  // Use a ref to store the add vehicle function to avoid circular dependency
  const handleAddVehicleRef = React.useRef<(() => void) | null>(null)

  // Keyboard navigation hook - update when vehicles change
  const {
    activeCell,
    editingCell,
    moveToCell,
    startEditing,
    stopEditing,
    containerRef,
  } = useKeyboardNavigation({
    vehicleCount: vehicles.length,
    fieldCount: fields.length,
    onAddVehicle: () => handleAddVehicleRef.current?.(),
  })

  // Update navigation when vehicles change
  React.useEffect(() => {
    // If active cell is beyond current vehicle count, reset to last vehicle
    if (activeCell && activeCell.vehicleIndex >= vehicles.length) {
      if (vehicles.length > 0) {
        moveToCell(vehicles.length - 1, activeCell.fieldIndex)
      }
    }
  }, [vehicles.length, activeCell, moveToCell])

  const handleCellChange = (vehicleIndex: number, fieldIndex: number, value: any) => {
    const field = fields[fieldIndex]
    
    // Update vehicle value
    const updatedVehicles = vehicles.map((v, idx) =>
      idx === vehicleIndex
        ? { ...v, [field.id]: value }
        : v
    )
    setVehicles(updatedVehicles)
    
    // Validate the cell value
    const error = validateCellValue(value, field)
    const errorKey = `${vehicleIndex}-${field.id}`
    
    setValidationErrors((prev) => {
      const newErrors = new Map(prev)
      if (error) {
        newErrors.set(errorKey, error)
      } else {
        newErrors.delete(errorKey)
      }
      return newErrors
    })
  }

  // Handle cell focus (navigation only - no edit mode)
  const handleCellFocus = (vehicleIndex: number, fieldIndex: number) => {
    moveToCell(vehicleIndex, fieldIndex)
    // Don't automatically enter edit mode - just move focus
  }

  // Handle cell edit (enters edit mode - for click/double-click)
  const handleCellEdit = (vehicleIndex: number, fieldIndex: number) => {
    moveToCell(vehicleIndex, fieldIndex)
    startEditing()
  }

  const handleCellBlur = (moveNextAfterBlur = false) => {
    stopEditing()
    // After blur, if Enter was pressed, move to next cell
    if (moveNextAfterBlur && activeCell) {
      const { vehicleIndex, fieldIndex } = activeCell
      if (fieldIndex < fields.length - 1) {
        moveToCell(vehicleIndex, fieldIndex + 1)
      } else if (vehicleIndex < vehicles.length - 1) {
        moveToCell(vehicleIndex + 1, 0)
      }
    }
  }

  // Check if a cell is being edited
  const getEditingState = (vehicleIndex: number, fieldIndex: number) => {
    if (!editingCell) return false
    return editingCell.vehicleIndex === vehicleIndex && editingCell.fieldIndex === fieldIndex
  }

  // Check if a cell is active (focused)
  const getActiveState = (vehicleIndex: number, fieldIndex: number) => {
    if (!activeCell) return false
    return activeCell.vehicleIndex === vehicleIndex && activeCell.fieldIndex === fieldIndex
  }

  // Define handleAddVehicle after hook so we can use moveToCell and startEditing
  const handleAddVehicle = React.useCallback(() => {
    const newVehicle: Vehicle = {
      id: `vehicle-${Date.now()}`,
      vin: '',
      year: '',
      make: '',
      model: '',
      trim: '',
      primaryUse: '',
      annualMileage: '',
      ownershipType: '',
      ownershipLength: '',
      garagingZipSame: '',
    }
    setVehicles((prev) => [...prev, newVehicle])
    setNewVehicleIds((prev) => new Set(prev).add(newVehicle.id))
    
    // Focus on the new vehicle's first cell
    // Use the new length after state update
    const newVehicleIndex = vehicles.length
    setTimeout(() => {
      moveToCell(newVehicleIndex, 0)
      startEditing()
    }, 100)
  }, [vehicles.length, moveToCell, startEditing])

  // Update the ref whenever handleAddVehicle changes
  React.useEffect(() => {
    handleAddVehicleRef.current = handleAddVehicle
  }, [handleAddVehicle])

  const handleAddFromDiscovery = async (discoveredVehicle: DiscoveredVehicle) => {
    setIsLoadingDiscovery(true)
    // Simulate async operation (e.g., API call to add vehicle)
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Add the discovered vehicle as a new vehicle
    const newVehicle: Vehicle = {
      id: `discovery-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      vin: discoveredVehicle.vin || '',
      year: discoveredVehicle.year,
      make: discoveredVehicle.make,
      model: discoveredVehicle.model,
      trim: '',
      primaryUse: '',
      annualMileage: '',
      ownershipType: '',
      ownershipLength: '',
      garagingZipSame: '',
      isFromDiscovery: true,
      discoveryData: {
        source: discoveredVehicle.source || 'Discovery',
        confidence: discoveredVehicle.confidence || 0.95,
      },
      badges: discoveredVehicle.badges,
    }
    setVehicles((prev) => [...prev, newVehicle])
    setNewVehicleIds((prev) => new Set(prev).add(newVehicle.id))
    setIsLoadingDiscovery(false)
    
    // Focus on the new vehicle's first cell
    setTimeout(() => {
      moveToCell(vehicles.length, 0)
      startEditing()
    }, 100)
  }

  const isNewVehicle = (vehicleId: string) => newVehicleIds.has(vehicleId)

  const getVehicleBadges = (vehicle: Vehicle, vehicleIndex: number) => {
    const badges: Array<string | { type: 'incomplete' | 'complete'; text: string; count?: number }> = []
    
    // Status badges
    if (vehicleIndex === 0) {
      badges.push('Primary Vehicle')
    }
    
    // Data source badges
    if (vehicle.isFromDiscovery) {
      badges.push('Discovery')
    }
    if (isNewVehicle(vehicle.id)) {
      badges.push('New')
    }
    
    // Vehicle condition badges
    if (vehicle.badges?.cleanTitle) {
      badges.push('Clean title')
    }
    if (vehicle.badges?.carfaxVerified) {
      badges.push('Carfax ✓')
    }
    
    // Add incomplete/complete badge
    const missingCount = getRowMissingCount(vehicle, fields)
    if (missingCount > 0) {
      badges.push({
        type: 'incomplete',
        text: missingCount === 1 ? '1 missing' : `${missingCount} missing`,
        count: missingCount,
      })
    } else if (missingCount === 0 && fields.some(f => f.required)) {
      badges.push({
        type: 'complete',
        text: 'Complete',
      })
    }
    
    return badges
  }

  const handleDeleteVehicle = React.useCallback((vehicleId: string, vehicleIndex: number) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId))
    setNewVehicleIds((prev) => {
      const newSet = new Set(prev)
      newSet.delete(vehicleId)
      return newSet
    })
    
    // Clear validation errors for deleted vehicle
    setValidationErrors((prev) => {
      const newErrors = new Map(prev)
      fields.forEach((field) => {
        newErrors.delete(`${vehicleIndex}-${field.id}`)
      })
      // Shift errors for vehicles after the deleted one
      const shiftedErrors = new Map()
      prev.forEach((_, idx) => {
        if (idx > vehicleIndex) {
          fields.forEach((field) => {
            const oldKey = `${idx}-${field.id}`
            const newKey = `${idx - 1}-${field.id}`
            const error = newErrors.get(oldKey)
            if (error) {
              shiftedErrors.set(newKey, error)
            }
          })
        } else if (idx < vehicleIndex) {
          fields.forEach((field) => {
            const key = `${idx}-${field.id}`
            const error = newErrors.get(key)
            if (error) {
              shiftedErrors.set(key, error)
            }
          })
        }
      })
      return shiftedErrors
    })
    
    // Adjust active cell if needed
    if (activeCell) {
      if (activeCell.vehicleIndex === vehicleIndex) {
        // If deleted vehicle was active, move to previous vehicle or first vehicle
        if (vehicles.length > 1) {
          const newIndex = vehicleIndex > 0 ? vehicleIndex - 1 : 0
          moveToCell(newIndex, activeCell.fieldIndex)
        }
      } else if (activeCell.vehicleIndex > vehicleIndex) {
        // If active cell is after deleted vehicle, adjust index
        moveToCell(activeCell.vehicleIndex - 1, activeCell.fieldIndex)
      }
    }
  }, [vehicles.length, fields, activeCell, moveToCell])

  return (
    <div className="mb-8 w-full bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
      <div className="flex">
        {/* Main Table Area */}
        <div 
          className="flex-1 overflow-x-auto relative" 
          ref={containerRef}
          role="grid"
          aria-rowcount={fields.length + 1}
          aria-colcount={vehicles.length + 1}
        >
          <div className="inline-flex min-w-full">
              {/* Field Labels Column - Fixed */}
            <div 
              className="bg-white shrink-0 sticky left-0 z-10 border-r border-[#e5e7eb]" 
              style={{ width: '321px' }}
              role="rowgroup"
            >
              {/* Header */}
              <div 
                className="h-[64px] px-4 flex items-center border-b border-[#e5e7eb] bg-white"
                role="columnheader"
                aria-label="Field labels"
              >
                <span
                  className="text-sm font-medium text-[#6b7280]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Vehicles
                </span>
              </div>
              {/* Field Rows */}
              {fields.map((field, fieldIndex) => (
                <div
                  key={field.id}
                  className="h-[44px] px-4 flex items-center border-b border-[#f3f4f6] last:border-b-0 bg-white"
                  role="rowheader"
                  aria-rowindex={fieldIndex + 2}
                >
                  <span
                    className="text-sm font-normal text-[#111827]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-600 ml-1" aria-label="required">*</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Vehicle Columns */}
            {vehicles.map((vehicle, vehicleIndex) => (
              <div
                key={vehicle.id}
                className={`bg-white shrink-0 border-r border-[#e5e7eb] last:border-r-0 relative ${
                  isNewVehicle(vehicle.id) ? 'ring-1 ring-blue-500/20' : ''
                }`}
                style={{ width: '348px' }}
                role="column"
                aria-label={`Vehicle ${vehicleIndex + 1}`}
              >
                {/* Header */}
                <div 
                  className="h-[64px] px-4 flex items-center justify-between border-b border-[#e5e7eb] bg-white group"
                  role="columnheader"
                  aria-colindex={vehicleIndex + 2}
                >
                  <div className="flex flex-col items-start justify-start gap-2 flex-1 min-w-0">
                    <span
                      className="text-sm font-medium text-[#111827] truncate"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Vehicle {vehicleIndex + 1}
                    </span>
                    {/* Badges */}
                    <div className="flex items-center gap-1 shrink-0 flex-wrap">
                      {getVehicleBadges(vehicle, vehicleIndex).map((badge, idx) => {
                        // Handle badge objects with type
                        if (typeof badge === 'object' && badge.type === 'incomplete') {
                          return (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-amber-100 text-amber-800 flex items-center gap-1"
                            >
                              <AlertCircle className="h-3 w-3" />
                              {badge.text}
                            </Badge>
                          )
                        }
                        
                        if (typeof badge === 'object' && badge.type === 'complete') {
                          return (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs font-medium border-0 px-1.5 py-0.5 h-5 bg-green-100 text-green-800 flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              {badge.text}
                            </Badge>
                          )
                        }
                        
                        // Style badges differently based on type
                        const isStatusBadge = badge === 'Primary Vehicle' || badge === 'New' || badge === 'Discovery'
                        const isConditionBadge = badge === 'Clean title' || badge === 'Carfax ✓'
                        
                        return (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className={`text-xs px-1.5 py-0 h-5 border-0 ${
                              isStatusBadge
                                ? 'bg-blue-50 text-blue-700'
                                : isConditionBadge
                                ? 'bg-[#f3f4f6] text-[#6b7280]'
                                : 'bg-[#f3f4f6] text-[#6b7280]'
                            }`}
                          >
                            {badge}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  {/* Delete button - appears on hover */}
                  {vehicles.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      onClick={() => handleDeleteVehicle(vehicle.id, vehicleIndex)}
                      aria-label={`Delete vehicle ${vehicleIndex + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-[#6b7280]" />
                    </Button>
                  )}
                </div>

                {/* Field Values */}
                {fields.map((field, fieldIndex) => {
                  const isEditing = getEditingState(vehicleIndex, fieldIndex)
                  const isActive = getActiveState(vehicleIndex, fieldIndex)
                  const cellValue = vehicle[field.id as keyof Vehicle]
                  const errorKey = `${vehicleIndex}-${field.id}`
                  const error = validationErrors.get(errorKey)
                  const isMissing = missingFields.has(errorKey)
                  const hasError = !!error

                  return (
                    <div
                      key={field.id}
                      data-cell-id={`vehicle-${vehicleIndex}-field-${fieldIndex}`}
                      className={`h-[44px] border-b border-[#f3f4f6] last:border-b-0 transition-colors ${
                        isActive ? 'bg-[#f9fafb]' : ''
                      } ${hasError ? 'bg-red-50/30' : ''} ${
                        isMissing && !hasError ? 'bg-amber-50' : ''
                      }`}
                      role="gridcell"
                      aria-rowindex={fieldIndex + 2}
                      aria-colindex={vehicleIndex + 2}
                    >
                      <EditableTableCell
                        value={cellValue}
                        field={field}
                        isEditing={isEditing}
                        onFocus={() => handleCellFocus(vehicleIndex, fieldIndex)}
                        onEdit={() => handleCellEdit(vehicleIndex, fieldIndex)}
                        onBlur={(moveNext) => handleCellBlur(moveNext)}
                        onChange={(value) => handleCellChange(vehicleIndex, fieldIndex, value)}
                        onDoubleClick={() => handleCellEdit(vehicleIndex, fieldIndex)}
                        error={error}
                        isMissing={isMissing && !hasError}
                      />
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Right Sidebar - Inside scrollable container, scrolls with content */}
            {vehicles.length > 0 && (
              <div className="bg-white shrink-0 border-l border-[#e5e7eb]" style={{ width: '323px' }}>
                <div className="p-4">
                  {/* Add Another Vehicle Button */}
                  <Button
                    variant="outline"
                    onClick={handleAddVehicle}
                    className="w-full h-9 mb-4 border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] text-[#111827] text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Vehicle
                  </Button>

                  {/* Vehicles Found Section */}
                  <VehicleSuggestions
                    discoveredVehicles={discoveredVehicles}
                    existingVehicles={vehicles}
                    onAddVehicle={handleAddFromDiscovery}
                    isLoading={isLoadingDiscovery}
                  />

                  {/* Keyboard Shortcuts */}
                  <KeyboardShortcuts />
                </div>
              </div>
            )}

            {/* Empty State */}
            {vehicles.length === 0 && (
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="text-center">
                  <Car className="h-12 w-12 text-[#9ca3af] mx-auto mb-4" />
                  <p
                    className="text-sm font-medium text-[#111827] mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    No vehicles added yet
                  </p>
                  <p
                    className="text-xs text-[#6b7280] mb-4"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Add your first vehicle to get started
                  </p>
                  <Button
                    variant="outline"
                    className="h-10 border border-[#e5e7eb] bg-white hover:bg-[#f9fafb]"
                    onClick={handleAddVehicle}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Vehicle
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


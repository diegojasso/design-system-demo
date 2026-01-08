"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, UserPlus, X, Trash2, AlertCircle, CheckCircle } from "lucide-react"
import { Driver, ColumnDef, MVRDriver } from "./types"
import { DRIVER_FIELDS } from "./columns"
import { EditableTableCell } from "./editable-table-cell"
import { useKeyboardNavigation, ActiveCell } from "./use-keyboard-navigation"
import { MVRSuggestions } from "./mvr-suggestions"
import { validateCellValue, ValidationError } from "./validation"
import { KeyboardShortcuts } from "./keyboard-shortcuts"
import { getRowMissingCount, isRowComplete } from "./utils/missing-data"

interface DriversTableProps {
  drivers?: Driver[]
  fields?: ColumnDef[]
}

// Sample static data for Phase 1 - matching wireframe
const SAMPLE_DRIVERS: Driver[] = [
  {
    id: '1',
    firstName: 'Sally',
    lastName: 'Gomez',
    relationship: 'Self',
    dateOfBirth: '1990-10-15',
    gender: 'Female',
    maritalStatus: 'Married',
    email: 'sally.g@example.com',
    phone: '(555) 123-4567',
    includeInPolicy: true,
    licenseNumber: 'A192019291',
    licenseState: 'Arizona',
    licenseStatus: 'Valid',
    yearsLicensed: 'Select',
  },
  {
    id: '2',
    firstName: 'Peter',
    lastName: 'Gomez',
    relationship: 'Spouse',
    dateOfBirth: '1992-08-22',
    gender: 'Male',
    maritalStatus: 'Married',
    email: 'sally.g@example.com',
    phone: '(555) 123-4567',
    includeInPolicy: true,
    licenseNumber: 'A192019291',
    licenseState: 'Arizona',
    licenseStatus: 'Valid',
    yearsLicensed: 'Select',
  },
]

// Sample MVR drivers
const SAMPLE_MVR_DRIVERS: MVRDriver[] = [
  {
    name: 'Jennifer Gomez',
    dateOfBirth: '2010-11-05',
    licenseNumber: '',
    licenseState: '',
    violations: 0,
    accidents: 0,
    confidence: 0.95,
    source: 'MVR',
  },
  {
    name: 'Michael Gomez',
    dateOfBirth: '2008-03-12',
    licenseNumber: '',
    licenseState: '',
    violations: 0,
    accidents: 0,
    confidence: 0.88,
    source: 'MVR',
  },
]

export function DriversTable({ 
  drivers: initialDrivers = SAMPLE_DRIVERS, 
  fields = DRIVER_FIELDS 
}: DriversTableProps) {
  const [drivers, setDrivers] = React.useState<Driver[]>(initialDrivers)
  const [newDriverIds, setNewDriverIds] = React.useState<Set<string>>(new Set())
  const [mvrDrivers] = React.useState<MVRDriver[]>(SAMPLE_MVR_DRIVERS)
  const [validationErrors, setValidationErrors] = React.useState<Map<string, string>>(new Map())
  const [isLoadingMVR, setIsLoadingMVR] = React.useState(false)
  const [missingFields, setMissingFields] = React.useState<Set<string>>(new Set())

  // Update drivers when initialDrivers changes
  React.useEffect(() => {
    setDrivers(initialDrivers)
  }, [initialDrivers])

  // Recompute missing fields when drivers or fields change
  React.useEffect(() => {
    const missing = new Set<string>()
    drivers.forEach((driver, driverIndex) => {
      fields.forEach((field) => {
        if (field.required) {
          const value = driver[field.id as keyof Driver]
          if (value === null || value === undefined || value === '' || 
              (typeof value === 'string' && value.trim() === '') ||
              (field.type === 'dropdown' && value === 'Select')) {
            missing.add(`${driverIndex}-${field.id}`)
          }
        }
      })
    })
    setMissingFields(missing)
  }, [drivers, fields])

  // Use a ref to store the add driver function to avoid circular dependency
  const handleAddDriverRef = React.useRef<(() => void) | null>(null)

  // Keyboard navigation hook - update when drivers change
  const {
    activeCell,
    editingCell,
    moveToCell,
    startEditing,
    stopEditing,
    containerRef,
  } = useKeyboardNavigation({
    driverCount: drivers.length,
    fieldCount: fields.length,
    onAddDriver: () => handleAddDriverRef.current?.(),
  })

  // Update navigation when drivers change
  React.useEffect(() => {
    // If active cell is beyond current driver count, reset to last driver
    if (activeCell && activeCell.driverIndex >= drivers.length) {
      if (drivers.length > 0) {
        moveToCell(drivers.length - 1, activeCell.fieldIndex)
      }
    }
  }, [drivers.length, activeCell, moveToCell])

  const handleCellChange = (driverIndex: number, fieldIndex: number, value: any) => {
    const field = fields[fieldIndex]
    const driver = drivers[driverIndex]
    
    // Update driver value
    const updatedDrivers = drivers.map((d, idx) =>
      idx === driverIndex
        ? { ...d, [field.id]: value }
        : d
    )
    setDrivers(updatedDrivers)
    
    // Validate the cell value
    const updatedDriver = updatedDrivers[driverIndex]
    const error = validateCellValue(value, field)
    const errorKey = `${driverIndex}-${field.id}`
    
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
  const handleCellFocus = (driverIndex: number, fieldIndex: number) => {
    moveToCell(driverIndex, fieldIndex)
    // Don't automatically enter edit mode - just move focus
  }

  // Handle cell edit (enters edit mode - for click/double-click)
  const handleCellEdit = (driverIndex: number, fieldIndex: number) => {
    moveToCell(driverIndex, fieldIndex)
    startEditing()
  }

  const handleCellBlur = (moveNextAfterBlur = false) => {
    stopEditing()
    // After blur, if Enter was pressed, move to next cell
    if (moveNextAfterBlur && activeCell) {
      const { driverIndex, fieldIndex } = activeCell
      if (fieldIndex < fields.length - 1) {
        moveToCell(driverIndex, fieldIndex + 1)
      } else if (driverIndex < drivers.length - 1) {
        moveToCell(driverIndex + 1, 0)
      }
    }
  }

  // Check if a cell is being edited
  const getEditingState = (driverIndex: number, fieldIndex: number) => {
    if (!editingCell) return false
    return editingCell.driverIndex === driverIndex && editingCell.fieldIndex === fieldIndex
  }

  // Check if a cell is active (focused)
  const getActiveState = (driverIndex: number, fieldIndex: number) => {
    if (!activeCell) return false
    return activeCell.driverIndex === driverIndex && activeCell.fieldIndex === fieldIndex
  }

  // Define handleAddDriver after hook so we can use moveToCell and startEditing
  const handleAddDriver = React.useCallback(() => {
    const newDriver: Driver = {
      id: `driver-${Date.now()}`,
      firstName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      email: '',
      phone: '',
      includeInPolicy: false,
      licenseNumber: '',
      licenseState: '',
      licenseStatus: '',
      yearsLicensed: '',
    }
    setDrivers((prev) => [...prev, newDriver])
    setNewDriverIds((prev) => new Set(prev).add(newDriver.id))
    // Focus on the new driver's first cell
    setTimeout(() => {
      moveToCell(drivers.length, 0)
      startEditing()
    }, 100)
  }, [drivers.length, moveToCell, startEditing])

  // Update the ref whenever handleAddDriver changes
  React.useEffect(() => {
    handleAddDriverRef.current = handleAddDriver
  }, [handleAddDriver])

  const handleDeleteDriver = (driverId: string) => {
    setDrivers((prev) => prev.filter((driver) => driver.id !== driverId))
    setNewDriverIds((prev) => {
      const newSet = new Set(prev)
      newSet.delete(driverId)
      return newSet
    })
  }

  const handleAddFromMVR = async (mvrDriver: MVRDriver) => {
    setIsLoadingMVR(true)
    // Simulate async operation (e.g., API call to add driver)
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Parse name into first and last name
    const nameParts = mvrDriver.name.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''
    
    // Add the MVR driver as a new driver
    const newDriver: Driver = {
      id: `mvr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      firstName,
      lastName,
      relationship: 'Child', // Default relationship, user can change
      dateOfBirth: mvrDriver.dateOfBirth,
      gender: '',
      maritalStatus: '',
      email: '',
      phone: '',
      includeInPolicy: false,
      licenseNumber: mvrDriver.licenseNumber || '',
      licenseState: mvrDriver.licenseState || '',
      licenseStatus: '',
      yearsLicensed: '',
      isFromMVR: true,
      mvrData: {
        source: mvrDriver.source || 'MVR',
        confidence: mvrDriver.confidence || 0.95,
      },
    }
    setDrivers((prev) => [...prev, newDriver])
    setNewDriverIds((prev) => new Set(prev).add(newDriver.id))
    setIsLoadingMVR(false)
    
    // Focus on the new driver's first cell
    setTimeout(() => {
      moveToCell(drivers.length, 0)
      startEditing()
    }, 100)
  }

  const getDriverBadges = (driver: Driver, index: number) => {
    const badges: Array<string | { type: 'incomplete' | 'complete'; text: string; count?: number }> = []
    if (index === 0) {
      badges.push('Primary Insured')
    } else {
      badges.push('Additional Driver')
    }
    if (driver.includeInPolicy) {
      badges.push('Covered')
    }
    if (newDriverIds.has(driver.id)) {
      badges.push('New')
    }
    if (driver.isFromMVR) {
      badges.push('MVR')
    }
    
    // Add incomplete/complete badge
    const missingCount = getRowMissingCount(driver, fields)
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

  const isNewDriver = (driverId: string) => newDriverIds.has(driverId)
  const isMVRDriver = (driver: Driver) => driver.isFromMVR === true

  return (
    <div 
      className="mb-8 w-full bg-white rounded-lg border border-[#e5e7eb] overflow-hidden"
      role="table"
      aria-label="Drivers table"
    >
      <div className="flex">
        {/* Main Table Area */}
        <div 
          className="flex-1 overflow-x-auto relative" 
          ref={containerRef}
          role="grid"
          aria-rowcount={fields.length + 1}
          aria-colcount={drivers.length + 1}
        >
          {drivers.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-[#6b7280]">
              <div className="text-center">
                <p className="text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  No drivers added yet
                </p>
                <Button
                  variant="outline"
                  onClick={handleAddDriver}
                  className="h-9 border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] text-[#111827] text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Driver
                </Button>
              </div>
            </div>
          ) : (
            <div className="inline-flex min-w-full">
              {/* Field Labels Column - Fixed */}
              <div 
                className="bg-white shrink-0 sticky left-0 z-10 border-r border-[#e5e7eb]" 
                style={{ width: '321px' }}
                role="rowgroup"
              >
                {/* Header */}
                <div 
                  className="h-[52px] px-4 flex items-center border-b border-[#e5e7eb] bg-white"
                  role="columnheader"
                  aria-label="Field labels"
                >
                  <span
                    className="text-sm font-medium text-[#6b7280]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Drivers
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

            {/* Driver Columns */}
            {drivers.map((driver, driverIndex) => (
              <div
                key={driver.id}
                className={`bg-white shrink-0 border-r border-[#e5e7eb] last:border-r-0 relative ${
                  isNewDriver(driver.id) ? 'ring-1 ring-blue-500/20' : ''
                }`}
                style={{ width: '348px' }}
                role="column"
                aria-label={`Driver ${driverIndex + 1}`}
              >
                {/* Header */}
                <div 
                  className="h-[52px] px-4 flex items-center justify-between border-b border-[#e5e7eb] bg-white group"
                  role="columnheader"
                  aria-colindex={driverIndex + 2}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium text-[#111827]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Driver {driverIndex + 1}
                    </span>
                    <div className="flex gap-1.5">
                      {getDriverBadges(driver, driverIndex).map((badge, idx) => {
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
                        
                        // Handle string badges
                        return (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className={`text-xs font-medium border-0 px-1.5 py-0.5 h-5 ${
                              badge === 'New' 
                                ? 'bg-blue-50 text-blue-700' 
                                : badge === 'MVR'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-[#f3f4f6] text-[#6b7280]'
                            }`}
                          >
                            {badge}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  {/* Delete Button - Show on hover */}
                  {drivers.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                  {/* Field Values */}
                  {fields.map((field, fieldIndex) => {
                    const isEditing = getEditingState(driverIndex, fieldIndex)
                    const isActive = getActiveState(driverIndex, fieldIndex)
                    const cellValue = driver[field.id as keyof Driver]
                    const errorKey = `${driverIndex}-${field.id}`
                    const error = validationErrors.get(errorKey)
                    const isMissing = missingFields.has(errorKey)
                    const hasError = !!error

                    return (
                      <div
                        key={field.id}
                        data-cell-id={`driver-${driverIndex}-field-${fieldIndex}`}
                        className={`h-[44px] border-b border-[#f3f4f6] last:border-b-0 transition-colors ${
                          isActive ? 'bg-[#f9fafb]' : ''
                        } ${hasError ? 'bg-red-50/30' : ''} ${
                          isMissing && !hasError ? 'bg-amber-50' : ''
                        }`}
                        role="gridcell"
                        aria-rowindex={fieldIndex + 2}
                        aria-colindex={driverIndex + 2}
                      >
                        <EditableTableCell
                          value={cellValue}
                          field={field}
                          isEditing={isEditing}
                          onFocus={() => handleCellFocus(driverIndex, fieldIndex)}
                          onEdit={() => handleCellEdit(driverIndex, fieldIndex)}
                          onBlur={(moveNext) => handleCellBlur(moveNext)}
                          onChange={(value) => handleCellChange(driverIndex, fieldIndex, value)}
                          onDoubleClick={() => handleCellEdit(driverIndex, fieldIndex)}
                          error={error}
                          isMissing={isMissing && !hasError}
                        />
                      </div>
                    )
                  })}
              </div>
            ))}

              {/* Right Sidebar - Inside scrollable container, scrolls with content */}
              <div className="bg-white shrink-0 border-l border-[#e5e7eb]" style={{ width: '323px' }}>
                <div className="p-4">
                  {/* Add Another Driver Button */}
                  <Button
                    variant="outline"
                    onClick={handleAddDriver}
                    className="w-full h-9 mb-4 border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] text-[#111827] text-sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Driver
                  </Button>

                  {/* Drivers Found Section */}
                  <MVRSuggestions
                    mvrDrivers={mvrDrivers}
                    existingDrivers={drivers}
                    onAddDriver={handleAddFromMVR}
                    isLoading={isLoadingMVR}
                  />

                  {/* Keyboard Shortcuts */}
                  <KeyboardShortcuts />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

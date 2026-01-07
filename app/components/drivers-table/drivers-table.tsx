"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, UserPlus, X, Trash2 } from "lucide-react"
import { Driver, ColumnDef } from "./types"
import { DRIVER_FIELDS } from "./columns"
import { EditableTableCell } from "./editable-table-cell"
import { useKeyboardNavigation, ActiveCell } from "./use-keyboard-navigation"

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

// Sample MVR driver
const SAMPLE_MVR_DRIVER = {
  name: 'Jennifer Gomez',
  dateOfBirth: '2010-11-05',
}

export function DriversTable({ 
  drivers: initialDrivers = SAMPLE_DRIVERS, 
  fields = DRIVER_FIELDS 
}: DriversTableProps) {
  const [drivers, setDrivers] = React.useState<Driver[]>(initialDrivers)
  const [newDriverIds, setNewDriverIds] = React.useState<Set<string>>(new Set())

  // Update drivers when initialDrivers changes
  React.useEffect(() => {
    setDrivers(initialDrivers)
  }, [initialDrivers])

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
  })

  // Update navigation when drivers change
  React.useEffect(() => {
    // If active cell is beyond current driver count, reset to last driver
    if (activeCell && activeCell.driverIndex >= drivers.length) {
      if (drivers.length > 0) {
        moveToCell(drivers.length - 1, activeCell.fieldIndex, false)
      }
    }
  }, [drivers.length, activeCell, moveToCell])

  const handleCellChange = (driverIndex: number, fieldIndex: number, value: any) => {
    const field = fields[fieldIndex]
    const driver = drivers[driverIndex]
    
    setDrivers((prev) =>
      prev.map((d, idx) =>
        idx === driverIndex
          ? { ...d, [field.id]: value }
          : d
      )
    )
  }

  const handleCellFocus = (driverIndex: number, fieldIndex: number) => {
    moveToCell(driverIndex, fieldIndex)
    startEditing()
  }

  const handleCellBlur = (moveNextAfterBlur = false) => {
    stopEditing()
    // After blur, if Enter was pressed, move to next cell
    if (moveNextAfterBlur && activeCell) {
      const { driverIndex, fieldIndex } = activeCell
      if (fieldIndex < fields.length - 1) {
        moveToCell(driverIndex, fieldIndex + 1, true)
      } else if (driverIndex < drivers.length - 1) {
        moveToCell(driverIndex + 1, 0, true)
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

  const handleAddDriver = () => {
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
      moveToCell(drivers.length, 0, true)
    }, 100)
  }

  const handleDeleteDriver = (driverId: string) => {
    setDrivers((prev) => prev.filter((driver) => driver.id !== driverId))
    setNewDriverIds((prev) => {
      const newSet = new Set(prev)
      newSet.delete(driverId)
      return newSet
    })
  }

  const handleAddFromMVR = () => {
    // Add the MVR driver as a new driver
    const mvrDriver: Driver = {
      id: `mvr-${Date.now()}`,
      firstName: 'Jennifer',
      lastName: 'Gomez',
      relationship: 'Child',
      dateOfBirth: SAMPLE_MVR_DRIVER.dateOfBirth,
      gender: '',
      maritalStatus: '',
      email: '',
      phone: '',
      includeInPolicy: false,
      licenseNumber: '',
      licenseState: '',
      licenseStatus: '',
      yearsLicensed: '',
      isFromMVR: true,
      mvrData: {
        source: 'MVR',
        confidence: 0.95,
      },
    }
    setDrivers((prev) => [...prev, mvrDriver])
    // Focus on the new driver's first cell
    setTimeout(() => {
      moveToCell(drivers.length, 0, true)
    }, 100)
  }

  const getDriverBadges = (driver: Driver, index: number) => {
    const badges = []
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
    return badges
  }

  const isNewDriver = (driverId: string) => newDriverIds.has(driverId)
  const isMVRDriver = (driver: Driver) => driver.isFromMVR === true

  return (
    <div className="mb-8 w-full bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
      <div className="flex">
        {/* Main Table Area */}
        <div className="flex-1 overflow-x-auto relative" ref={containerRef}>
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
              >
                {/* Header */}
                <div className="h-[52px] px-4 flex items-center border-b border-[#e5e7eb] bg-white">
                  <span
                    className="text-sm font-medium text-[#6b7280]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Drivers
                  </span>
                </div>
                {/* Field Rows */}
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="h-[44px] px-4 flex items-center border-b border-[#f3f4f6] last:border-b-0 bg-white"
                  >
                    <span
                      className="text-sm font-normal text-[#111827]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {field.label}
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
              >
                {/* Header */}
                <div className="h-[52px] px-4 flex items-center justify-between border-b border-[#e5e7eb] bg-white group">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium text-[#111827]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Driver {driverIndex + 1}
                    </span>
                    <div className="flex gap-1.5">
                      {getDriverBadges(driver, driverIndex).map((badge, idx) => (
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
                      ))}
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

                  return (
                    <div
                      key={field.id}
                      data-cell-id={`driver-${driverIndex}-field-${fieldIndex}`}
                      className={`border-b border-[#f3f4f6] last:border-b-0 transition-colors ${
                        isActive ? 'bg-[#f9fafb]' : ''
                      }`}
                    >
                      <EditableTableCell
                        value={cellValue}
                        field={field}
                        isEditing={isEditing}
                        onFocus={() => handleCellFocus(driverIndex, fieldIndex)}
                        onBlur={(moveNext) => handleCellBlur(moveNext)}
                        onChange={(value) => handleCellChange(driverIndex, fieldIndex, value)}
                        onDoubleClick={() => handleCellFocus(driverIndex, fieldIndex)}
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
                  <div>
                    <h3
                      className="text-sm font-medium text-[#111827] mb-3"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Drivers Found
                    </h3>
                    
                    {/* MVR Driver Card */}
                    <div className="border border-[#e5e7eb] bg-white rounded-md p-3 mb-2 hover:bg-[#f9fafb] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p
                            className="text-sm font-medium text-[#111827] mb-0.5"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {SAMPLE_MVR_DRIVER.name}
                          </p>
                          <p
                            className="text-xs text-[#6b7280]"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            {(() => {
                              const date = new Date(SAMPLE_MVR_DRIVER.dateOfBirth)
                              const month = String(date.getMonth() + 1).padStart(2, '0')
                              const year = date.getFullYear()
                              return `${month}/../${year}`
                            })()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleAddFromMVR}
                          className="h-8 w-8 border border-[#e5e7eb] bg-white hover:bg-[#f9fafb] shrink-0"
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

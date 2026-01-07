"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, UserPlus } from "lucide-react"
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

  // Update drivers when initialDrivers changes
  React.useEffect(() => {
    setDrivers(initialDrivers)
  }, [initialDrivers])

  // Keyboard navigation hook
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
    return badges
  }

  return (
    <div className="mb-8 w-full">
      <div className="flex gap-4">
        {/* Main Table Area */}
        <div className="flex-1 overflow-x-auto relative" ref={containerRef}>
          <div className="inline-flex min-w-full">
            {/* Field Labels Column - Fixed */}
            <Card 
              className="border border-[#cdd7e1] bg-[#fbfcfe] rounded-[12px] shadow-sm shrink-0 sticky left-0 z-10" 
              style={{ width: '321px' }}
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="h-[84px] px-4 py-2 flex items-center border-b border-[#cdd7e1] bg-[#fbfcfe]">
                  <span
                    className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#0a0a0a]"
                    style={{ fontFamily: "Geist, sans-serif" }}
                  >
                    Drivers
                  </span>
                </div>
                {/* Field Rows */}
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className="h-[52px] px-4 py-3 flex items-center border-b border-[#cdd7e1] last:border-b-0 bg-[#fbfcfe]"
                  >
                    <span
                      className="text-sm font-normal leading-[1.5] text-[#0a0a0a]"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {field.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Driver Columns */}
            {drivers.map((driver, driverIndex) => (
              <Card
                key={driver.id}
                className="border border-[#cdd7e1] bg-[#fbfcfe] rounded-[12px] shadow-sm shrink-0 ml-4"
                style={{ width: '348px' }}
              >
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="h-[84px] px-4 py-2 flex flex-col justify-center border-b border-[#cdd7e1]">
                    <span
                      className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#0a0a0a] mb-2"
                      style={{ fontFamily: "Geist, sans-serif" }}
                    >
                      Driver {driverIndex + 1}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {getDriverBadges(driver, driverIndex).map((badge, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs font-medium bg-[#f0f0f0] text-[#0a0a0a] border-0"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
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
                        className={`border-b border-[#cdd7e1] last:border-b-0 transition-colors ${
                          isActive ? 'bg-[#f0f7ff] ring-1 ring-[#0a0a0a] ring-inset' : ''
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
                </CardContent>
              </Card>
            ))}

            {/* Right Sidebar - Inside scrollable container, scrolls with content */}
            <Card className="border border-[#cdd7e1] bg-[#fbfcfe] rounded-[12px] shadow-sm shrink-0 ml-4" style={{ width: '323px' }}>
          <CardContent className="p-6">
            {/* Add Another Driver Button */}
            <Button
              variant="outline"
              className="w-full h-12 mb-6 border border-[#cdd7e1] bg-white hover:bg-[#f5f7fa] text-[#0a0a0a]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Driver
            </Button>

            {/* Drivers Found Section */}
            <div>
              <h3
                className="text-[24px] font-semibold leading-[1.2] tracking-[-0.48px] text-[#0a0a0a] mb-4"
                style={{ fontFamily: "Geist, sans-serif" }}
              >
                Drivers Found
              </h3>
              
              {/* MVR Driver Card */}
              <Card className="border border-[#cdd7e1] bg-white rounded-lg p-3 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p
                      className="text-base font-medium text-[#0a0a0a] mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {SAMPLE_MVR_DRIVER.name}
                    </p>
                    <p
                      className="text-sm text-[#737373]"
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
                    className="h-10 w-10 border border-[#cdd7e1] bg-white hover:bg-[#f5f7fa] shrink-0"
                  >
                    <UserPlus className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
